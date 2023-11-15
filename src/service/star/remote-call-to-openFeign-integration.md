---
title: 远程调用openFeign整合
icon: circle-info
order: 4
category:
   - 微服务
tag:
   - 微服务
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---


在上一节 [Ribbon和 Nacos服务注册中心](https://blog.csdn.net/qq_58608526/article/details/131235361?spm=1001.2014.3001.5501)， 我们学习了使用nacos进行服务注册和服务发现以及Ribbon负载均衡以及他的简单原理剖析。这一节我们来继续认识`SpringCloud`的一些核心组件`openFeign`。

## 1. 问题分析

先来看我们以前利用RestTemplate发起远程调用的代码：

![image-20210714174814204](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306171459436.png)

**存在的问题：**

1. 在服务消费者中，我们把`url`地址硬编码到代码中，不方便后期维护。
2. 在服务消费者中，不清楚服务提供者的状态。
3. 服务消费者调用服务提供者时候，如果出现故障能否及时发现不向用户抛出异常页面？
4. RestTemplate这种请求调用方式是否还有优化空间？能不能类似于Dubbo那样玩？

## 2. 了解Feign

`Feign`是一个声明式的http客户端，官方地址：https://github.com/OpenFeign/feign

其作用就是帮助我们优雅的实现http请求的发送，解决上面提到的问题。

![image-20210714174918088](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306171501881.png)



## 3. 项目整合Feign

Fegin的使用步骤如下：

### 3.1 引入依赖

我们在order-service服务的pom文件中引入feign的依赖：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

### 3.2 添加注解

在`order-service`的启动类添加注解开启`Feign`的功能：

![image-20230617150337918](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306171503080.png)



### 3.3 编写Feign客户端

```java
package com.cisyam.order.client;

import com.cisyam.pojo.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author gaoziman
 */
@FeignClient("userservice")
public interface UserClient {

    /**
     * 通过用户后编号去获取用户对象
     * @param id
     * @return
     */
    @GetMapping("/user/{id}")
    User findById(@PathVariable("id") Long id);
}
```



这个客户端主要是基于SpringMVC的注解来声明远程调用的信息，比如：

- 服务名称：`userservice`
- 请求方式：`GET`
- 请求路径：`/user/{id}`
- 请求参数：`Long id`
- 返回值类型：`User`

这样，`Feign`就可以帮助我们发送`http`请求，无需自己使用RestTemplate来发送了。



### 3.4 测试

修改order-service中的`OrderService`类中的`queryOrderById`方法，使用Feign客户端代替RestTemplate：

![image-20230617150609816](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306171506911.png)

### 3.5 总结

使用Feign的步骤：

① 引入依赖

② 添加@EnableFeignClients注解

③ 编写FeignClient接口

④ 使用FeignClient中定义的方法代替RestTemplate



## 4. 自定义配置

Feign可以支持很多的自定义配置，如下表所示：

| 类型                   | 作用             | 说明                                                   |
| ---------------------- | ---------------- | ------------------------------------------------------ |
| **feign.Logger.Level** | 修改日志级别     | 包含四种不同的级别：NONE、BASIC、HEADERS、FULL         |
| feign.codec.Decoder    | 响应结果的解析器 | http远程调用的结果做解析，例如解析json字符串为java对象 |
| feign.codec.Encoder    | 请求参数编码     | 将请求参数编码，便于通过http请求发送                   |
| feign. Contract        | 支持的注解格式   | 默认是SpringMVC的注解                                  |
| feign. Retryer         | 失败重试机制     | 请求失败的重试机制，默认是没有，不过会使用Ribbon的重试 |

一般情况下，默认值就能满足我们使用，如果要自定义时，只需要创建自定义的@Bean覆盖默认Bean即可。

**下面以日志为例来演示如何自定义配置。**



### 4.1 配置文件方式

基于配置文件修改feign的日志级别可以针对单个服务：

```yml
feign:  
  client:
    config: 
      userservice: # 针对某个微服务的配置
        loggerLevel: FULL #  日志级别 
```

也可以针对所有服务：

```yml
feign:  
  client:
    config: 
      default: # 这里用default就是全局配置，如果是写服务名称，则是针对某个微服务的配置
        loggerLevel: FULL #  日志级别 
```

而日志的级别分为四种：

- **NONE**：不记录任何日志信息，这是默认值。
- **BASIC**：仅记录请求的方法，URL以及响应状态码和执行时间
- HEADERS：在BASIC的基础上，额外记录了请求和响应的头信息
- **FULL**：记录所有请求和响应的明细，包括头信息、请求体、元数据。

### 4.2 Java代码方式

也可以基于Java代码来修改日志级别，先声明一个类，然后声明一个Logger.Level的对象：

```java
public class DefaultFeignConfiguration  {
    @Bean
    public Logger.Level feignLogLevel(){
        return Logger.Level.BASIC; // 日志级别为BASIC
    }
}
```

如果要**全局生效**，将其放到启动类的@EnableFeignClients这个注解中：

```java
@EnableFeignClients(defaultConfiguration = DefaultFeignConfiguration .class) 
```

如果是**局部生效**，则把它放到对应的@FeignClient这个注解中：

```java
@FeignClient(value = "userservice", configuration = DefaultFeignConfiguration .class) 
```



## 5. Feign使用优化

Feign底层发起http请求，依赖于其它的框架。其底层客户端实现包括：

1. **URLConnection**：默认实现，不支持连接池
2. **Apache HttpClient** ：支持连接池
3. **OKHttp**：支持连接池

因此提高Feign的性能主要手段就是使用**连接池**代替默认的URLConnection。

**这里我们用Apache的HttpClient来演示。**

### 5.1 引入依赖

在order-service的pom文件中引入Apache的HttpClient依赖：

```xml
<!--httpClient的依赖 -->
<dependency>
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-httpclient</artifactId>
</dependency>
```

### 5.2 配置连接池

在order-service的application.yml中添加配置：

```yml
feign:
  client:
    config:
      default: # default全局的配置
        loggerLevel: BASIC # 日志级别，BASIC就是基本的请求和响应信息
  httpclient:
    enabled: true # 开启feign对HttpClient的支持
    max-connections: 200 # 最大的连接数
    max-connections-per-route: 50 # 每个路径的最大连接数
```



接下来，在`FeignClientFactoryBean`中的`loadBalance`方法中打断点：

![image-20210714185925910](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306171510856.png)

Debug方式启动order-service服务，可以看到这里的client，底层就是`Apache HttpClient`：

![image-20210714190041542](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306171510864.png)



总结，**Feign**的优化：

1. 日志级别尽量用basic
2. 使用`HttpClient`或`OKHttp`代替`URLConnection`
   1. 引入`feign-httpClient`依赖
   2. 配置文件开启`httpClient`功能，设置连接池参数



## 6. Feign最佳实践

所谓 **最佳时间**，就是使用过程中总结的经验，最好的一种使用方式。

仔细的同学可以观察可以发现，`Feign`的客户端与服务提供者的**controller**代码非常相似：

**feign客户端**：

![image-20230617151323086](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306171513197.png)

**UserController：**

![image-20230617151431032](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306171514141.png)

有没有一种办法简化这种重复的代码编写呢 ？大家想到的结局方式是什么呢 ？

`这里提供两种解决方式，看看你有没有想到呢`

### 6.1 继承方式

一样的代码可以通过继承来共享：

1. 定义一个API接口，利用定义方法，并基于SpringMVC注解做声明。
2. Feign客户端和Controller都集成改接口



![image-20210714190640857](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306171516629.png)



**优点：**

- 简单
- 实现了代码共享

**缺点：**

- 服务提供方、服务消费方紧耦合

- 参数列表中的注解映射并不会继承，因此Controller中必须再次声明方法、参数列表、注解



### 6.2 抽取方式

将`Feign`的`Client`抽取为独立模块，并且把接口有关的POJO、默认的Feign配置都放到这个模块中，提供给所有消费者使用。

例如，将`UserClient、User、Feign`的默认配置都抽取到一个feign-api包中，所有微服务引用该依赖包，即可直接使用。

![image-20210714214041796](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306171516303.png)

今天就到这里了，下一节我们继续学习分享SpringCloud的相关组件----`GateWay网关组件`，欢迎大家评论区留言讨论！




![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)