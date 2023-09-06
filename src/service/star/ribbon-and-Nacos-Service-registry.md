---
title: Ribbon和Nacos服务注册中心
icon: circle-info
order: 3
category:
  - 微服务
tag:
  - 微服务
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---


上一节我们学习了[SpringCloud的核心组件Eureka](https://blog.csdn.net/qq_58608526/article/details/131131244?spm=1001.2014.3001.5501) ，但是它逐渐被Nacos替代

了，在此之前我们先了解一下Ribbon负载均衡。

## 1. Ribbon负载均衡

### 1.1 关于负载均衡

​		负载均衡一般分为**服务器端负载均衡**和**客户端负载均衡**	

​		所谓**服务器端负载均衡**，比如`Nginx`、`F5`这些，请求到达服务器之后由这些负载均衡器根据一定的算法将请求路由到目标服务器处理。

​		所谓**客户端负载均衡**，比如我们要说的`Ribbon`，服务消费者客户端会有一个服务器地址列表，调用方在请求前通过一定的负载均衡算法选择一个服务器进行访问，负载均衡算法的执行是在请求客户端进行。

​		**Ribbon**是`Netflix`发布的负载均衡器。Eureka一般配合Ribbon进行使用，`Ribbon`利用从`Eureka`中读取到服务信息，在调用服务提供者提供的服务时，会根据一定的算法进行负载。

![image-20230611110926294](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111109373.png)

**觉得还是有点没理解，话不多说，直接上实战**

> 我们如果没有任何配置的情况下，只需要加上`@LoadBalanced`这个注解 ，他的默认策略就是轮询策略，简单来说 ，就我们哥俩(这里指的是用户微服务集群)轮着来，一人一次

我们这里做一个测试，我们同时发起四次不同请求，使用订单微服务，远程调用用户微服务

![image-20230611111835974](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111119554.png)

![image-20230611111844826](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111118913.png)

`我们会发现这四次请求，分别调用了四次用户微服务，而这四次是分发在用户微服务1和用户微服务2`，而且正好是我们刚所说的轮询策略，一人两次。

**下面我们更改Ribbon的策略，再来看看**

首先在OrderApplication中加入我们更改的策略，这里我们更改的是`随机策略`

~~~java
@Bean
    public IRule randomRule() {
        return new RandomRule();
    }
~~~

`重新启动订单微服务进行测试`

![image-20230611112340967](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111123098.png)

![image-20230611112348747](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111123901.png)

**此时我们发现，用户微服务1没有一个命中，而用户微服务2全部命中**，这就是随机策略，能不能命中全靠`随机`。

### 1.2 负载均衡原理

我们添加了`@LoadBalanced`注解，即可实现负载均衡功能，这是什么原理呢

SpringCloud底层其实是利用了一个名为`Ribbon`的组件，来实现负载均衡功能的。

那么我们发出的请求明明是http://userservice/user/1，怎么变成了http://localhost:9001的呢？

### 1.3 源码跟踪

为什么我们只输入了service名称就可以访问了呢？之前还要获取ip和端口。

显然有人帮我们根据service名称，获取到了服务实例的ip和端口。它就是`LoadBalancerInterceptor`，这个类会在对`RestTemplate`的请求进行拦截，然后从Eureka根据服务id获取服务列表，随后利用负载均衡算法得到真实的服务地址信息，替换服务id。

我们进行源码跟踪：

#### 1）LoadBalancerIntercepor

![image-20230611114812088](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111148233.png)

可以看到这里的intercept方法，拦截了用户的HttpRequest请求，然后做了几件事：

- `request.getURI()`：获取请求uri，本例中就是 http://user-service/user/8
- `originalUri.getHost()`：获取uri路径的主机名，其实就是服务id，`user-service`
- `this.loadBalancer.execute()`：处理服务id，和用户请求。

这里的`this.loadBalancer ` 是 `LoadBalancerClient`类型，我们继续跟入。



#### 2）LoadBalancerClient

继续跟入execute方法：

![image-20230611120426001](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111204133.png)

代码是这样的：

- **getLoadBalancer(serviceId)**：根据服务id获取ILoadBalancer，而`LoadBalancer`会拿着服务`id`去eureka中获取服务列表并保存起来。
- **getServer(loadBalancer)**：利用内置的负载均衡算法，从服务列表中选择一个。本例中，可以看到获取了9003端口的服务



放行后，再次访问并跟踪，发现获取的是9001：

 ![image-20230611121227508](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111212592.png)

果然实现了负载均衡。

### 1.4 负载均衡策略IRule

在刚才的代码中，可以看到获取服务使通过一个`getServer`方法来做负载均衡:

 ![image-20230611121227508](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111212055.png)

我们继续跟入：

![1544361421671](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111131885.png)

继续跟踪源码chooseServer方法，发现这么一段代码：

 ![image-20230611121327066](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111213164.png)

我们看看这个rule是谁：

 ![1525622699666](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111131890.png)

这里的rule默认值是一个`RoundRobinRule`，看类的介绍：

 ![1525622754316](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111131896.png)

这不就是轮询的意思嘛。

到这里，整个负载均衡的流程我们就清楚了。



#### 总结

`SpringCloudRibbon`的底层采用了一个拦截器，拦截了RestTemplate发出的请求，对地址做了修改。用一幅图来总结一下：

![image-20230611140029080](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111400169.png)



基本流程如下：

- 拦截我们的RestTemplate请求http://userservice/user/1
- RibbonLoadBalancerClient会从请求url中获取服务名称，也就是user-service
- DynamicServerListLoadBalancer根据user-service到eureka拉取服务列表
- eureka返回列表，localhost:9001、localhost:9002
- IRule利用内置负载均衡规则，从列表中选择一个，例如localhost:9001
- RibbonLoadBalancerClient修改请求地址，用localhost:8081替代userservice，得到http://localhost:9001/user/1，发起真实请求



### 1.5 负载均衡策略

负载均衡的规则都定义在IRule接口中，而IRule有很多不同的实现类：

![image-20210713225653000](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111402972.png)

不同规则的含义如下：

| 负载均衡策略                               | 描述                                                         |
| ------------------------------------------ | ------------------------------------------------------------ |
| RoundRobinRule：轮询策略                   | 简单轮询服务列表来选择服务器。它是Ribbon默认的负载均衡规则。默认超过10次获取到的server都不可用，会返回一个空的server |
| RandomRule：随机策略                       | 如果随机到的server为null或者不可用的话，会while不停的循环选取 |
| AvailabilityFilteringRule:最小连接数策略   |（1）在默认情况下，这台服务器如果3次连接失败，这台服务器就会被设置为“短路”状态。短路状态将持续30秒，如果再次连接失败，短路的持续时间就会几何级地增加。  （2）并发数过高的服务器。如果一个服务器的并发连接数过高，配置了AvailabilityFilteringRule规则的客户端也会将其忽略。并发连接数的上限，可以由客户端的属性进行配置。 |
| WeightedResponseTimeRule：加权响应时间规则 | 为每一个服务器赋予一个权重值。服务器响应时间越长，这个服务器的权重就越小。这个规则会随机选择服务器，这个权重值会影响服务器的选择。 |
| ZoneAvoidanceRule:区域权衡策略（默认策略） | 扩展了轮询策略，继承了2个过滤器：ZoneAvoidancePredicate和AvailabilityPredicate，除了过滤超时和链接数过多的server，还会过滤掉不符合要求的zone区域里面的所有节点， 在一个区域/机房内的服务实例中轮询。**先过滤再轮询** |
| BestAvailableRule：最佳可用规则            | 忽略那些短路的服务器，并选择并发数较低的服务器。             |
| RandomRule:随机策略                        | 随机选择一个可用的服务器。如果随机到的server为null或者不可用的话，会while不停的循环选取 |
| RetryRule：重试策略                        | 一定时限内循环重试。默认继承RoundRobinRule，也支持自定义注入，RetryRule会在每次选取之后，对选举的server进行判断，是否为null，是否alive，并且在500ms内会不停的选取判断。而RoundRobinRule失效的策略是超过10次，RandomRule是没有失效时间的概念，只要serverList没都挂。 |

默认的实现就是`ZoneAvoidanceRule`，是一种轮询方案

#### 1.5.1 自定义负载均衡策略

通过定义IRule实现可以修改负载均衡规则，有两种方式：

1. 代码方式：在order-service中的OrderApplication类中，定义一个新的IRule：

```java
@Bean
public IRule randomRule(){
    return new RandomRule();
}
```



2. 配置文件方式：在order-service的application.yml文件中，添加新的配置也可以修改规则：

```yaml
userservice: # 给某个微服务配置负载均衡规则，这里是userservice服务
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule # 负载均衡规则 
```

> **注意**，一般用默认的负载均衡规则，不做修改。



### 1.6 饥饿加载

Ribbon默认是采用懒加载，即第一次访问时才会去创建LoadBalanceClient，请求时间会很长。

而饥饿加载则会在项目启动时创建，降低第一次访问的耗时，通过下面配置开启饥饿加载：

```yaml
ribbon:
  eager-load:
    enabled: true
    clients: userservice
```



## 2.Nacos注册中心

国内公司一般都推崇阿里巴巴的技术，比如注册中心，`SpringCloudAlibaba`也推出了一个名为Nacos的注册中心。

### 2.1认识和安装Nacos

[Nacos](https://nacos.io/)是阿里巴巴的产品，现在是[SpringCloud](https://spring.io/projects/spring-cloud)中的一个组件。相比[Eureka](https://github.com/Netflix/eureka)功能更加丰富，在国内受欢迎程度较高。

![image-20210713230444308](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111423015.png)

#### 2.1.1 下载安装包

在Nacos的GitHub页面，提供有下载链接，可以下载编译好的Nacos服务端或者源代码：

GitHub主页：https://github.com/alibaba/nacos

GitHub的Release下载页：https://github.com/alibaba/nacos/releases

如图：

![image-20210402161102887](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111424546.png)



windows版本使用`nacos-server-1.4.1.zip`包即可。



#### 2.1.2 解压

将这个包解压到任意非中文目录下，如图：

![image-20210402161843337](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111424554.png)

目录说明：

- bin：启动脚本
- conf：配置文件



#### 2.1.3 端口配置

Nacos的默认端口是8848，如果你电脑上的其它进程占用了8848端口，请先尝试关闭该进程。

**如果无法关闭占用8848端口的进程**，也可以进入nacos的conf目录，修改配置文件中的端口：

![image-20210402162008280](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111424556.png)

修改其中的内容：

![image-20210402162251093](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111424562.png)



#### 2.1.4 启动

启动非常简单，进入bin目录，结构如下：

![image-20210402162350977](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111424568.png)

然后执行命令即可：

- windows命令：

  ```bash
  startup.cmd -m standalone
  ```


执行后的效果如图：

![image-20210402162526774](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111424990.png)



#### 2.1.5 访问

在浏览器输入地址：http://127.0.0.1:8848/nacos即可：

![image-20210402162630427](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111424015.png)

默认的账号和密码都是nacos，进入后：

![image-20230611144820834](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111448939.png)

### 2.2 微服务注册到Nacos

#### 2.2.1 引入依赖

1. 在cloud-demo父工程的pom文件中的`<dependencyManagement>`中引入SpringCloudAlibaba的依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
    <version>2.2.6.RELEASE</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

2. 然后在user-service和order-service中的pom文件中引入nacos-discovery依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

> **注意**：不要忘了注释掉eureka的依赖。



#### 2.2.2 配置nacos地址

在user-service和order-service的application.yml中添加nacos地址：

```yml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
```

> **注意**：不要忘了注释掉eureka的依赖。

#### 2.2.3 重启

![image-20230611150748584](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111507669.png)



保护阈值：可以设置为`0-1之间的浮点数`，它其实是一个比例值（当前服务健康实例数/当前服务总实例数）

​		**场景：**

> ​        一般流程下，nacos是服务注册中心，服务消费者要从nacos获取某一个服务的可用实例信息，对于服务实例有健康/不健康状态之分，nacos在返回给消费者实例信息的时候，会返回健康实例。这个时候在一些高并发、大流量场景下会存在一定的问题
>
> ​		如果服务A有100个实例，98个实例都不健康了，只有2个实例是健康的，如果nacos只返回这两个健康实例的信息的话，那么后续消费者的请求将全部被分配到这两个实例，流量洪峰到来，2个健康的实例也扛不住了，整个服务A 就扛不住，上游的微服务也会导致崩溃，产生雪崩效应。
>

​		**保护阈值的意义在于**

> ​		当服务A健康实例数/总实例数   < 保护阈值 的时候，说明健康实例真的不多了，这个时候保护阈值会被触发（状态true）
>
> ​		nacos将会把该服务所有的实例信息（健康的+不健康的）全部提供给消费者，消费者可能访问到不健康的实例，请求失败，但这样也比造成雪崩要好，牺牲了一些请求，保证了整个系统的一个可用。
>
> ​		注意：阿里内部在使用nacos的时候，也经常调整这个保护阈值参数。

### 2.3 服务分级存储模型

一个**服务**可以有多个**实例**，例如我们的user-service，可以有:

- 127.0.0.1:9001
- 127.0.0.1:9002
- 127.0.0.1:9003
- 127.0.0.1:9004

假如这些实例分布于全国各地的不同机房，例如：

- 127.0.0.1:9001，在上海机房
- 127.0.0.1:9002，在上海机房
- 127.0.0.1:9003，在杭州机房
- 127.0.0.1:9004，在杭州机房

Nacos就将同一机房内的实例 划分为一个**集群**。

也就是说，user-service是服务，一个服务可以包含多个集群，如杭州、上海，每个集群下可以有多个实例，形成分级模型，如图：

![image-20210713232522531](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111510697.png)



微服务互相访问时，应该尽可能访问同集群实例，因为本地访问速度更快。当本集群内不可用时，才访问其它集群。例如：

![image-20210713232658928](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111510705.png)

杭州机房内的order-service应该优先访问同机房的user-service。

### 2.4 给user-service配置集群

修改user-service的application.yml文件，添加集群配置：

~~~yml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ # 集群名称
~~~

重启两个user-service实例后，我们可以在nacos控制台看到下面结果：

![image-20230611151445726](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111514803.png)

我们再次复制一个user-service启动配置，添加属性：

```sh
-Dserver.port=8083 -Dspring.cloud.nacos.discovery.cluster-name=SH
```



配置如图所示：

![image-20230611151326677](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111513757.png)

启动UserApplication3后再次查看nacos控制台：

![image-20230611151453318](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111514382.png)

### 2.5 同集群优先的负载均衡

默认的`ZoneAvoidanceRule`并不能实现根据同集群优先来实现负载均衡。

因此Nacos中提供了一个`NacosRule`的实现，可以优先从同集群中挑选实例。

1）给order-service配置集群信息

修改order-service的application.yml文件，添加集群配置：

```sh
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ # 集群名称
```



2）修改负载均衡规则

修改order-service的application.yml文件，修改负载均衡规则：

```yaml
userservice:
  ribbon:
    NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule # 负载均衡规则 
```



### 2.6 权重配置

实际部署中会出现这样的场景：

服务器设备性能有差异，部分实例所在机器性能较好，另一些较差，我们希望性能好的机器承担更多的用户请求。

但默认情况下`NacosRule`是同集群内随机挑选，不会考虑机器的性能问题。

因此，`Nacos`提供了权重配置来控制访问频率，权重越大则访问频率越高。

在`nacos`控制台，找到`user-service`的实例列表，点击编辑，即可修改权重：

![image-20230617144541231](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306171445355.png)

在弹出的编辑窗口，修改权重：

![image-20230617144601159](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306171446235.png)



> **注意**：如果权重修改为0，则该实例永远不会被访问

### 2.7 环境隔离

Nacos提供了namespace来实现环境隔离功能。

- nacos中可以有多个namespace

- namespace下可以有group、service等

- 不同namespace之间相互隔离，例如不同namespace的服务互相不可见

  

![image-20200923112940575](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111522495.png)

**Namespace**：命名空间，对不同的环境进行隔离，比如隔离开发环境、测试环境和生产环境

Group：分组，将若干个服务或者若干个配置集归为一组，通常习惯一个系统归为一个组（拉勾招聘、拉勾猎头、拉勾教育）

**Service**：某一个服务，比如商品微服务

**DataId**：配置集或者可以认为是一个配置文件

**Namespace + Group + Service   如同 Maven 中的GAV坐标，GAV坐标是为了锁定Jar，而这里是为了锁定服务**

**Namespace + Group + DataId   如同 Maven 中的GAV坐标，GAV坐标是为了锁定Jar，而这里是为了锁定配置文件**

**最佳实践**

​		**Nacos**抽象出了`Namespace`、`Group`、`Service`、`DataId`等概念，具体代表什么取决于怎么用（非常灵活），推荐用法如下

| 概念      | 描述                                              |
| --------- | ------------------------------------------------- |
| Namespace | 代表不同的环境，如开发dev、测试test、生产环境prod |
| Group     | 代表某项目，比如拉勾云项目                        |
| Service   | 某个项目中具体xxx服务                             |
| DataId    | 某个项目中具体的xxx配置文件                       |

#### 2.7.1 创建namespace

默认情况下，所有service、data、group都在同一个namespace，名为public：

![image-20210714000414781](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111516244.png)

我们可以点击页面新增按钮，添加一个namespace：

![image-20210714000440143](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111517835.png)

然后，填写表单：

![image-20210714000505928](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111517885.png)

就能在页面看到一个新的namespace：

![image-20230611151747711](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111517775.png)

#### 2.7.2 给微服务配置namespace

给微服务配置namespace只能通过修改配置来实现。

例如，修改order-service的application.yml

文件：

```yml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ
        namespace: 6f91682a-dae8-4236-8974-48595037e16c # 命名空间，填ID
```

重启order-service后，访问控制台，可以看到下面的结果：

![image-20230611152008076](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111520150.png)

![image-20230611152018237](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111520313.png)

此时访问order-service，因为namespace不同，会导致找不到userservice，控制台会报错：

![image-20210714000941256](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306111520384.png)

### 2.8 Nacos与Eureka的区别

Nacos的服务实例分为两种l类型：

- 临时实例：如果实例宕机超过一定时间，会从服务列表剔除，默认的类型。

- 非临时实例：如果实例宕机，不会从服务列表剔除，也可以叫永久实例。



配置一个服务实例为永久实例：

```yaml
spring:
  cloud:
    nacos:
      discovery:
        ephemeral: false # 设置为非临时实例
```



Nacos和Eureka整体结构类似，服务注册、服务拉取、心跳等待，但是也存在一些差异：

![image-20230617145509807](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306171455907.png)



- Nacos与eureka的共同点
  - 都支持服务注册和服务拉取
  - 都支持服务提供者心跳方式做健康检测

- Nacos与Eureka的区别
  - Nacos支持服务端主动检测提供者状态：临时实例采用心跳模式，非临时实例采用主动检测模式
  - 临时实例心跳不正常会被剔除，非临时实例则不会被剔除
  - Nacos支持服务列表变更的消息推送模式，服务列表更新更及时
  - Nacos集群默认采用AP方式，当集群中存在非临时实例时，采用CP模式；Eureka采用AP方式



