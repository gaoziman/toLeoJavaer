---
title: 微服务整合Gateway网关
icon: circle-info
order: 5
category:
   - 微服务
tag:
   - 微服务
pageview: false
date: 2023-09-23
comment: false
breadcrumb: false
---


> 大家好，我是Leo🫣🫣🫣，之前微服务专题我也断更了一段时间，因为忙着做其他事情，这不最近没有那么忙了，打算在今年之前把这个专栏更新完毕，也会一直记录我的微服务学习的相关博客，今天我们主要学习一下微服务整合Gateway网关， 话不多说，让我们开始吧😎😎😎。



## 1.  什么是SpringCloud Gateway

关作为流量的入口，常用的功能包括路由转发，权限校验，限流等。
SpringCloud Gateway 是 Spring Cloud 官方推出的第二代网关框架，定位于取代 Netlix Zuul。相比 Zuul 来说，Spring Cloud Gateway 提供更优秀的性能，更强大的有功能。
Spring Cloud Gateway 由 WebFlux + Netty + Reactor 实现的响应式的 API 网关。它不能在传统的servlet 容器中工作，也不能构建成 war 包。
Spring Cloud Gateway 旨在为微服务架构提供一种简单且有效的 API 路由的管理方式，并基于 Filter 的方式提供网关的基本功能，例如说安全认证、监控、限流等等。

其它网关组件：
在 SpringCloud 微服务体系中，有个很重要的组件就是网关，在 1.x 版本中都是采用的 Zuul 网关；但在 2.x 版本中，zuul 的升级一直跳票，SpringCloud 最后自 己研发了一个网关替代 Zuul，那就是 SpringCloud Gateway
网上很多地方都说 Zuul 是阻塞的，Gateway 是非阻塞的，这么说是不严谨的，准确的讲 zuul 1.x 是阻塞的，而在 2.x 的版本中，Zuul 也是基于 Netty，也是非阻塞的，如果一定要说性能，其实没多大差距。

SpringCloud Gateway 功能特征

1. 基于 Spring Framework 5，Project Reactor 和 Spring Boot 2.0 进行构建。
2. 动态路由：能够匹配任何请求属性。
3. 支持路径重写。
4. 集成 Spring Cloud 服务发现功能 (Nacos、 Eruka)。
5. 可集成流控降级功能 (Sentinel、 Hystrix)。
6. 可以对路由指定易于编写的 Predicate (断言) 和 Filter (过滤器)。



## 2. 为什么需要SpringCloud Gateway

大家都都知道在微服务架构中，一个系统会被拆分为很多个微服务。那么作为客户端要如何去调用这么多的微服务呢？如果没有网关的存在，我们只能在客户端记录每个微服务的地址，然后分别去用。

**这样架构会存在很多问题：**

1. 每个业务都会需要`鉴权`、`限流`、`权限校验`、`跨域` 等逻辑，如果每个业务都各自为战，自己造轮子实现一遍，会很蛋疼，完全可以抽出来，放到一个统一的地方去做。
2. 如果业务量比较简单的话， 这种方式前期不会有什么问题，但随着业务越来越复杂，比如淘宝、亚马逊，打开一个页面可能会涉及到数百个微服务协同工作，如果每一个微服务都分配一个域名的话，一方面客户端代码会很难维护，涉及到数百个域名，另一方面是连接数的瓶颈，想象一 下你打开一个 APP，通过抓包发现涉及到了数百个远程调用，这在移动端下会显得非常低效。
3. 后期如果需要对微服务进行重构的话， 也会变的非常麻烦，需要客户端配合你一起进行改造，比如商品服务，随着业务变的越来越复杂，后期需要进行拆分成多个微服务，这个时候对外提供的服务也需要拆分成多个，同时需要客户端配合你进行改造，非常难受。

其实上面的问题都可以通过网关来解决。

**网关的核心功能特性：**

注重稳定性:

- 全局性流控
- 日志统计
- 防止 SQL 注入
- 防止 Web 攻击
- 屏蔽工具扫描
- 黑白 IP 名单
- 证书 / 加解密处理
- 提供更好的服务

服务级别流控

- 服务降级与熔断
- 路由与负载均衡、灰度策略
- 服务过滤、聚合与发现
- 权限验证与用户等级策略
- 业务规则与参数校验
- 多级缓存策略

**架构图**

![image-20230917224934628](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309172249766.png)

**权限控制**：网关作为微服务入口，需要校验用户是是否有请求资格，如果没有则进行拦截。

**路由和负载均衡**：一切请求都必须先经过gateway，但网关不处理业务，而是根据某种规则，把请求转发到某个微服务，这个过程叫做路由。当然路由的目标服务有多个时，还需要做负载均衡。

**限流**：当请求流量过高时，在网关中按照下流的微服务能够接受的速度来放行请求，避免服务压力过大。



## 3. SpringCloud Gateway快速开始

下面，我们就演示下网关的基本路由功能。基本步骤如下：

**当然这些都是基于我们之前所搭建的用户订单服务器进行搭建与测试**

1. 创建SpringBoot工程 **Gateway**，引入网关依赖
2. 编写启动类
3. 编写基础配置和路由规则
4. 启动网关服务进行测试



### 3.1 创建gateway微服务

**创建微服务**

![image-20230917213202981](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309172132278.png)



**引入依赖**

```xml
<!--网关-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<!--nacos服务发现依赖-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```



### 3.2 编写启动类

```JAVA
package com.cisyam.gateway;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.web.client.RestTemplate;

/**
 * @author gaoizman
 */
@SpringBootApplication
public class GateWayApplication {

    public static void main(String[] args)
    {
        ConfigurableApplicationContext context = SpringApplication.run(GateWayApplication.class, args);
        Environment environment = context.getBean(Environment.class);

        System.out.println("访问链接：http://localhost:" + environment.getProperty("server.port"));
        System.out.println("(♥◠‿◠)ﾉﾞ  项目启动成功   ლ(´ڡ`ლ)ﾞ  \n" +
                " .-------.       ____     __        \n" +
                " |  _ _   \\      \\   \\   /  /    \n" +
                " | ( ' )  |       \\  _. /  '       \n" +
                " |(_ o _) /        _( )_ .'         \n" +
                " | (_,_).' __  ___(_ o _)'          \n" +
                " |  |\\ \\  |  ||   |(_,_)'         \n" +
                " |  | \\ `'   /|   `-'  /           \n" +
                " |  |  \\    /  \\      /           \n" +
                " ''-'   `'-'    `-..-'              ");
    }
}
```



### 3.3 编写基础配置类以及路由规则

```yml
server:
  port: 10010 # 网关端口
spring:
  application:
    name: gateway # 服务名称
  cloud:
    nacos:
      server-addr: localhost:8848 # nacos地址
    gateway:
      routes: # 网关路由配置
        - id: userservice # 路由id，自定义，只要唯一即可
          # uri: http://127.0.0.1:8081 # 路由的目标地址 http就是固定地址
          uri: lb://userservice # 路由的目标地址 lb就是负载均衡，后面跟服务名称
          predicates: # 路由断言，也就是判断请求是否符合路由规则的条件
            - Path=/user/** # 这个是按照路径匹配，只要以/user/开头就符合要求
          filters: # 过滤器
            - AddRequestHeader=Truth, Leo is freaking awesome! # 添加请求头
        - id: orderservice # 路由id，自定义，只要唯一即可
          uri: lb://orderservice # 路由的目标地址 lb就是负载均衡，后面跟服务名称
          predicates: # 路由断言，也就是判断请求是否符合路由规则的条件
            - Path=/order/** # 这个是按照路径匹配，只要以/user/开头就符合要求
```

我们将符合 `Path` 规则的一切请求，都代理到 `uri`参数指定的地址。

本例中，我们将 `/user/**`开头的请求，代理到`lb://userservice`，lb是负载均衡，根据服务名拉取服务列表，实现负载均衡。



### 3.4 测试Gateway

我们重启网关，访问 http://localhost:10010/user/1 时，符合 `/user/**` 规则，请求转发到uri：http://userservice/user/1，得到了结果：

![image-20210714211908341](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309172135665.png)



### 3.5 关于网关路由流程图



![image-20230917220739241](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309172207368.png)



**总结：**

网关搭建步骤：

1. 创建项目，引入nacos服务发现和gateway依赖

2. 配置application.yml，包括服务基本信息、nacos地址、路由

路由配置包括：

1. **路由id：**路由的唯一标示

2. **路由目标（uri）：** 路由的目标地址，http代表固定地址，lb代表根据服务名负载均衡

3. **路由断言（predicates）： **判断路由的规则，

4. **路由过滤器（filters）：** 对请求或响应做处理



## 4. SpringCloud Gateway进阶

### 4.1 断言工厂

我们在配置文件中写的断言规则只是字符串，这些字符串会被Predicate Factory读取并处理，转变为路由判断的条件

例如Path=/user/**是按照路径匹配，这个规则是由

`org.springframework.cloud.gateway.handler.predicate.PathRoutePredicateFactory`类来

处理的，像这样的断言工厂在SpringCloudGateway还有十几个:

| **名称**   | **说明**                       | **示例**                                                     |
| ---------- | ------------------------------ | ------------------------------------------------------------ |
| After      | 是某个时间点后的请求           | -  After=2037-01-20T17:42:47.789-07:00[America/Denver]       |
| Before     | 是某个时间点之前的请求         | -  Before=2031-04-13T15:14:47.433+08:00[Asia/Shanghai]       |
| Between    | 是某两个时间点之前的请求       | -  Between=2037-01-20T17:42:47.789-07:00[America/Denver],  2037-01-21T17:42:47.789-07:00[America/Denver] |
| Cookie     | 请求必须包含某些cookie         | - Cookie=chocolate, ch.p                                     |
| Header     | 请求必须包含某些header         | - Header=X-Request-Id, \d+                                   |
| Host       | 请求必须是访问某个host（域名） | -  Host=**.somehost.org,**.anotherhost.org                   |
| Method     | 请求方式必须是指定方式         | - Method=GET,POST                                            |
| Path       | 请求路径必须符合指定规则       | - Path=/red/{segment},/blue/**                               |
| Query      | 请求参数必须包含指定参数       | - Query=name, Jack或者-  Query=name                          |
| RemoteAddr | 请求者的ip必须是指定范围       | - RemoteAddr=192.168.1.1/24                                  |
| Weight     | 权重处理                       |                                                              |

我们只需要掌握**Path**这种路由工程就可以了。



### 4.2 过虑器工厂

过滤器 有 20 多个 实现 类， 包括 头部 过滤器、 路径 类 过滤器、 Hystrix 过滤器 和 变更 请求 URL 的 过滤器， 还有 参数 和 状态 码 等 其他 类型 的 过滤器。

内置的过滤器工厂有22个实现类，包括 头部过滤器、路径过滤器、Hystrix 过滤器 、请求URL 变更过滤器，还有参数和状态码等其他类型的过滤器。根据过滤器工厂的用途来划分，可以分为以下几种：Header、Parameter、Path、Body、Status、Session、Redirect、Retry、RateLimiter和Hystrix

![img](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309172230801.png)

GatewayFilter是网关中提供的一种过滤器，可以对进入网关的请求和微服务返回的响应做处理：

![image-20230917225932875](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309172259998.png)

#### 1. 路由过滤器的种类

Spring提供了37种不同的路由过滤器工厂。例如：

| **名称**             | **说明**                     |
| -------------------- | ---------------------------- |
| AddRequestHeader     | 给当前请求添加一个请求头     |
| RemoveRequestHeader  | 移除请求中的一个请求头       |
| AddResponseHeader    | 给响应结果中添加一个响应头   |
| RemoveResponseHeader | 从响应结果中移除有一个响应头 |
| RequestRateLimiter   | 限制请求的流量               |

![image-20230917223234870](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309172232940.png)



#### 2. 请求头过滤器

下面我们以AddRequestHeader 为例来讲解。

> 给所有进入userservice的请求添加一个请求头：Truth=给请求头加过滤器测试！

只需要修改**gateway** 服务的 application.yml文件，添加路由过滤即可：

![image-20230917221240645](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309172212843.png)



```yml
    gateway:
      routes: # 网关路由配置
        - id: userservice # 路由id，自定义，只要唯一即可
          # uri: http://127.0.0.1:8081 # 路由的目标地址 http就是固定地址
          uri: lb://userservice # 路由的目标地址 lb就是负载均衡，后面跟服务名称
          predicates: # 路由断言，也就是判断请求是否符合路由规则的条件
            - Path=/user/** # 这个是按照路径匹配，只要以/user/开头就符合要求
          filters: # 过滤器
            - AddRequestHeader=Truth, 给请求头加过滤器测试！ # 添加请求头
        - id: orderservice # 路由id，自定义，只要唯一即可
          uri: lb://orderservice # 路由的目标地址 lb就是负载均衡，后面跟服务名称
          predicates: # 路由断言，也就是判断请求是否符合路由规则的条件
            - Path=/order/** # 这个是按照路径匹配，只要以/user/开头就符合要求
```

**当前过滤器写在userservice路由下，因此仅仅对访问 userservice的请求有效。**



#### 3. 默认过滤器

如果要对所有的路由都生效，则可以将过滤器工厂写到**default**下。格式如下：

```yml
spring:
  cloud:
    gateway:
      routes:
      - id: userservice 
        uri: lb://userservice 
        predicates: 
        - Path=/user/**
      default-filters: # 默认过滤项
      - AddRequestHeader=Truth, 给请求头加过滤器测试！ # 添加请求头
```



#### 4. 总结

过滤器的作用是什么？

1. 对路由的请求或响应做加工处理，比如**添加请求头**。
2. 配置在路由下的过滤器只对当前路由的**请求生效**。



### 4.4 全局过滤器

![image-20230917223234870](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309172232940.png)

上一节学习的过滤器，网关提供了37种，但每一种过滤器的作用都是固定的。如果我们希望拦截请求，做自己的业务逻辑则没办法实现。



#### 1. 全局过滤器作用

全局过滤器的作用也是处理一切进入网关的请求和微服务响应，与 `GatewayFilter` 的作用一样。区别在于 `GatewayFilter` 通过配置定义，处理逻辑是固定的；而GlobalFilter的逻辑需要自己写代码实现。

定义方式是实现GlobalFilter接口。

```java
public interface GlobalFilter {
    /**
     *  处理当前请求，有必要的话通过{@link GatewayFilterChain}将请求交给下一个过滤器处理
     *
     * @param exchange 请求上下文，里面可以获取Request、Response等信息
     * @param chain 用来把请求委托给下一个过滤器 
     * @return {@code Mono<Void>} 返回标示当前过滤器业务结束
     */
    Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain);
}
```

在**filter**中编写自定义逻辑，可以实现下列功能：

- 登录状态判断
- 权限校验
- 请求限流等



#### 过滤器执行顺序

请求进入网关会碰到三类过滤器：当前路由的过`滤器`、`DefaultFilter`、`GlobalFilter` 。

请求路由后，会将当前路由过滤器和 `DefaultFilter`、`GlobalFilter`，合并到一个过滤器链（集合）中，排序后依次执行每个过滤器：

![image-20230917225932875](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309172259998.png)



排序的规则是什么呢？

- 每一个过滤器都必须指定一个int类型的order值，**order值越小，优先级越高，执行顺序越靠前**。
- GlobalFilter通过实现Ordered接口，或者添加@Order注解来指定order值，由我们自己指定
- 路由过滤器和defaultFilter的order由Spring指定，默认是按照声明顺序从1递增。
- 当过滤器的order值一样时，会按照 defaultFilter > 路由过滤器 > GlobalFilter的顺序执行。

详细内容，可以查看源码：

`org.springframework.cloud.gateway.route.RouteDefinitionRouteLocator#getFilters()` 方法是先加载`defaultFilters`，然后再加载某个route的filters，然后合并后根据order排序，组织过滤器链



### 4.5 跨域问题

#### 1. 什么是跨域请求

跨域请求指的就是：当前发起请求的域与该请求指向的资源所在的域不同时的请求。这种不同主要涵盖了协议、域名、端口号的差异。

而当跨域请求发生时，假如我们没有对其进行处理，浏览器将依据同源策略的规定拒绝该请求，禁止加载来自不同源的资源或执行相关操作。



#### 2. 整的跨域请求流程

通常情况下，在跨域请求当中，涉及到两个请求过程，第一次是预检请求（`OPTIONS请求`），用于验证服务器是否允许跨域请求，服务器会在响应中携带头部信息给浏览器，浏览器再发送第二次实际的跨域请求，然后服务器接收请求后再进行处理，并在响应中包含必要的头部信息。



**注意**：在一些特殊情况下，如果服务器已经配置允许来自所有源的请求（使用通配符 *），或者服务器与客户端位于同一源（同源请求），那么只会发送一次实际请求而不需要预检请求。但这通常不是最佳的安全做法，因为它可能会导致安全漏洞。



#### 3. 同源策略

上述对跨域请求的介绍当中出现了一个名词：**同源策略**，那么什么是同源策略呢？

同源策略（`Same-Origin Policy`）是浏览器的一种安全机制，它限制了脚本在不同源之间进行自由的数据交互，

同源策略的**主要目的**是保护用户的隐私和安全，防止恶意网站通过脚本获取用户的敏感信息或执行恶意操作。如果没有同源策略的限制，恶意网站就可以通过脚本来读取用户在其他网站上的数据，或者在用户不知情的情况下执行一些危险的操作。

同源指的就是 **协议**（如HTTP或HTTPS）、**域名**（包括子域名）和 **端口号**完全相同的两个URL。



#### 4. SpringBoot中如何解决跨域问题

##### 1. Spring提供的简化跨域配置的机制

Spring框架提供了一些简化跨域配置的方法，主要是通过Spring Web模块（通常与Spring Boot结合使用）来实现的。

1. 使用 **@CrossOrigin** 注解：在 `Controller` 层，你可以为特定的处理方法或整个控制器类添加**@CrossOrigin** 注解，以声明允许的跨域请求。

2. 使用全局配置：如果要在整个应用程序中配置跨域规则，可以使用全局配置。通过CorsRegistry来配置全局跨域规则.

   ```java
   @Configuration
   public class WebConfig implements WebMvcConfigurer {
   
       @Override
       public void addCorsMappings(CorsRegistry registry) {
           registry.addMapping("**") // 设置路径匹配模式
                   .allowedOrigins("http://localhost:9000") // 允许的来源
                   .allowedMethods("GET", "POST", "PUT", "DELETE") // 允许的HTTP方法
                   .allowedHeaders("Origin", "Content-Type", "Accept") // 允许的HTTP头
                   .allowCredentials(true) // 支持用户凭证
                   .maxAge(3600); // 缓存时长
       }
   }
   ```

在上面的示例中，我们创建了一个名为`WebConfig`的配置类，使用**addCorsMappings**方法定义了CORS规则，允许来自`https://localhost:9000`的跨域请求，并指定了允许的HTTP方法、请求头和缓存时间。



##### 2. 微服务中通过在网关配置

在**gateway**服务的application.yml文件中，添加下面的配置：

```yml
globalcors: # 全局的跨域处理
        add-to-simple-url-handler-mapping: true # 解决options请求被拦截问题
        corsConfigurations:
          '[/**]':
            allowedOrigins: # 允许哪些网站的跨域请求 
              - "http://localhost:9000"
            allowedMethods: # 允许的跨域ajax的请求方式
              - "GET"
              - "POST"
              - "DELETE"
              - "PUT"
              - "OPTIONS"
            allowedHeaders: "*" # 允许在请求中携带的头信息
            allowCredentials: true # 是否允许携带cookie
            maxAge: 360000 # 这次跨域检测的有效期
```



##### 3. 通过Nginx反向代理来解决跨域问题

我们可以在配置文件当中进行配置 :

```bash
# 设置 HTTP 服务器
server {
    listen 80;
    server_name localhost;

    # 配置反向代理，将 localhost:8080 的请求转发到 localhost:8081
    location / {
        proxy_pass http://localhost:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;

        # 添加跨域头信息
        add_header 'Access-Control-Allow-Origin' 'http://localhost:8080';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        
        # 处理 OPTIONS 请求的头信息
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
            return 204;
        }
    }
}
```



#### 4. 总结

- 跨域的必要性和重要性：跨域的必要性和重要性在于保护用户数据和隐私、维护互联网生态系统的安全和稳定。
- 合适的跨域解决方案：**根据具体的需求和环境**，选择合适的解决方案来确保跨域请求的安全性、兼容性、功能性、性能和维护性。
- 分布式系统当中的跨域：跨域在分布式系统当中尤为常见，分布式系统通常由多个独立部署的服务或模块组成，这些服务可能运行在不同的 **域名、主机**或**端口**上。当一个服务需要与另一个服务或模块进行通信时，就会涉及到跨域请求。



![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)