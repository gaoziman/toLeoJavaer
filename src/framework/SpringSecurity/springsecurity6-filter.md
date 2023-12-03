---
title: 回顾过滤器
icon: circle-info
order: 3
category:
  - SpringSecurity
tag:
  - SpringSecurity
pageview: false
date: 2023-11-05 23:40:03
comment: false
breadcrumb: false
---

# SpringSecurity6 | 回顾Filter


![image-20231030235443828](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310302354916.png)

## 1.前言

大家好，我是Leo哥🫣🫣🫣，上一节我们通过一个HelloWorld案例，以代码的方式实现了我们项目添加登录鉴权功能，只是通过一个就轻松实现了这个功能。那么他其中的原理是什么呢，带着疑问，我们后面几节课主要学习一下如何实现这些的原理。好了，话不多说让我们开始吧😎😎😎。



## 2.遗留问题

1. 在引入SpringSecurity依赖后，为什么所有请求就需要先做登录认证了呢?
2. 登录页面是怎么产生的?
3. 登录页面可以自定义吗? 

**后面几篇文章，我们会带着这些问题去研究SpringSecurity，并找出问题的答案。**



## 3.请求流程

一个请求发出之后的基本流程是怎么样的呢，我们的请求是如何被拦截的呢，下面我们简单的来看一下流程图。



![image-20231105221856734](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311052218806.png)

**流程详解：**

1. 客户端通过浏览器或其他方式向服务器发送请求，**SpringSecurity**会拦截该请求，并将其交给安全过滤器链进行处理。
2. 安全过滤器链是**SpringSecurity**的核心组件，由多个**过滤器(Filter)**组成。每个过滤器都有特定的功能，例如身份验证、授权、会话管理等。在处理请求时，安全过滤器链会按照预定义的顺序依次调用各个过滤器，直到最后一个过滤器完成处理。
3. 身份验证是SpringSecurity中的一个重要功能，它能够验证请求的发起者是否具有访问受保护资源的权限，通常是通过用户名和密码来验证身份。在安全过滤器链中，如果存在身份验证相关的过滤器，则会自动进行身份验证操作，例如**UsernamePasswordAuthenticationFilter**。
4. 如果请求通过了身份验证和授权操作，**SpringSecurity**会将请求转发给受保护资源，并返回相应的响应；否则，会返回相应的错误信息或者直接跳转登录页面。

**SpringSecurity对于Servlet的支持是基于Servlet Filter的。也就是说SpringSecurity的实现技术手段也是Filter。**



## 4.回顾Filter

### 4.1过滤器回顾

SpringSecurity 的 Servlet 支持是基于 Servlet Filter 的，因此首先大致了解一下 **Filter** 的作用是有帮助的。下图显示了单个 **HTTP请求**的处理程序的典型分层。

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311052223465.png" alt="image-20231105222301402" style="zoom:25%;" />



客户端向应用程序发送请求，容器创建一个 `FilterChain` ，其中包含 `Filter` 实例和应处理 `HttpServletRequest` 是 `DispatcherServlet` 的实例。最多一个 `Servlet` 可以处理单个 `HttpServletRequest` 和 `HttpServletResponse` 。然而，多个 `Filter` 可用于：

- Prevent downstream `Filter` instances or the `Servlet` from being invoked. In this case, the `Filter` typically writes the `HttpServletResponse`.
  防止调用下游 `Filter` 实例或 `Servlet` 。在这种情况下， `Filter` 通常写入 `HttpServletResponse` 。
- Modify the `HttpServletRequest` or `HttpServletResponse` used by the downstream `Filter` instances and the `Servlet`.
  修改下游 `Filter` 实例和 `Servlet` 使用的 `HttpServletRequest` 或 `HttpServletResponse` 。



### 4.2过滤器核心

```java
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
	// do something before the rest of the application
    chain.doFilter(request, response); // invoke the rest of the application
    // do something after the rest of the application
}
```

由于 `Filter` 仅影响下游 `Filter` 实例和 `Servlet` ，因此调用每个 `Filter` 的顺序非常重要。



## 5.过滤器分类

1. **SecurityContextPersistenceFilter：** 该过滤器用来确保在整个请求过程中**SecurityContext(安全上下文)**得以保留和传递。SecurityContext主要是用来存储当前用户的身份信息、角色、权限等。
2. **LogoutFilter：** 该过滤器用来处理用户注销请求，通常会清除当前用户的身份信息。
3. **UsernamePasswordAuthenticationFilter：** 该过滤器用来处理基于用户名和密码的身份认证请求。
4. **RequestCacheAwareFilter：** 该过滤器用来缓存请求，以便后续重定向请求时可以正确地恢复请求状态。
5. **ExceptionTranslationFilter：** 该过滤器用来处理由AccessDeniedHandler和AuthenticationEntryPoint抛出的异常，将它们转化为合适的HTTP响应。
6. **FilterSecurityInterceptor：** 该过滤器用来进行授权操作，决定是否允许用户访问受保护资源。



## 6.参考文献

- https://docs.spring.io/spring-security/reference/servlet/architecture.html



## 7.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。


![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311301345907.png)