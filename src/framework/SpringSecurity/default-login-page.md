---
title: 默认登录页
icon: circle-info
order: 8
category:
  - SpringSecurity
tag:
  - SpringSecurity
pageview: false
date: 2023-11-19 23:42:03
comment: false
breadcrumb: false
---


# SpringSecurity6 | 默认登录页



## 1.前言

大家好，我是Leo哥🫣🫣🫣，前面我们学习了有关SpringSecurity在SpringBoot项目中是如何给我进行自动的添加鉴权功能，简单复习了一下SpirngBoot的自动配置。接下来我们就接着学习SpringSecurity相关知识点。这一节我们将要学习SpringSecurity中默认的登录页面是如何实现的。好了，话不多说让我们开始吧😎😎😎。



## 2.涉及过滤器

在在[SpringSecurity6核心过滤器](https://gaoziman.blog.csdn.net/article/details/134282404?spm=1001.2014.3001.5502)中，我们有介绍到当SpringBoot项目启动后，SpringSecurity一共有15个过滤器默认自启动。那么我们请求发出到渲染出默认登录页面这个过程又设计到几个过滤器呢，接下来我们简单介绍一下。

- 首先是`UsernamePasswordAuthenticationFilter`，他主要根据用户名和密码进行认证的。

- 然后就是`DefaultLoginPageGeneratingFilter`，它主要负责默认登录页面的生成。
- `ExceptionTranslationFilter`，他主要负责SpringSecurity处理认证过程中发生的异常。
- 最后就是`AuthorizationFilter`，主要是处理用户的访问认证处理，只有当访问认证通过了，该请求才会被通过。



## 3.登录页面渲染流程

我们要想知道一个请求是如何被SpringSecurity中一步一步拦截，并生成默认的登录页面的话，我们就必须知道当我们的请求经过SpringSecurity中如何被过滤器拦截，就要知道他的细节。下面我通过一张图来带大家了解，一个请求发出后，在SpringSecurity内部是如何运作的。

![image-20231119220128982](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192201055.png)

**页面渲染力流程：**

1. 访问地址 http://localhost:8500/hello,会经过过个过滤器进行过滤拦截。
2. 当请求到达AuthorizationFilter时，系统会检查是否该请求是否进行了认证，如何未认证，则会将该请求拦截下来，并抛出`AccessDenieException`异常。
3. 抛出的`AccessDenieException`异常会被ExceptionTranslationFilter破获并启动身份验证，在这个Filter中会调用LoginUrlAuthenticationEntrypoint的commence()方法，并要求重定向到/login页面中去。
4. 重定向到/login页面，也就是客户端发送的/loginq请求。
5. /login请求会被过滤器`DefaultLoginPageGeneratingFilter`进行拦截，并在过滤器中返回默认的登录页面。



## 4.重定向登录页

那么上面流程是这么说的，流程图是这么画的，如何验证我们的猜想呢，下面就跟着Leo哥视角，去写一个测试，通过源码追踪的方式去验证我们的猜想。

首先添加一个访问测试接口：

```java
@GetMapping("/test")
public String test() {
    return "Hello SpringSecurity6";
}
```

未登录时访问接口，会 **重定向到登录页**，流程图如下说示：

![image-20231119222738018](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192227103.png)

流程图说明：

1. 一个用户向其未被授权的资源（`/test`）发出一个未经认证的请求。
2. 请求进入`SecurityFilterChain`开始执行过滤器，在`AuthorizationFilter`中校验不通过，抛出一个`AccessDeniedException`。
3. `ExceptionTranslationFilter `捕获到异常，调用`LoginUrlAuthenticationEntryPoint `重定向到`/login`。
4. 重定向的`/login`发起请求进入过滤器
5. `/login`会被`DefaultLoginPageGeneratingFilter`处理，直接响应写出默认登录页。



### 4.1 抛出 AccessDeniedException

访问上述接口地址，在[SpringSecurity6核心过滤器](https://gaoziman.blog.csdn.net/article/details/134282404?spm=1001.2014.3001.5502)中，有介绍请求最开始是到达`FilterChainProxy`，由它来调用`SecurityFilterChain`中的过滤器，`/test`是没有经过认证的，依次通过下述所有过滤器。

![image-20231119222914647](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192229694.png)



在通过最后一个过滤器`AuthorizationFilter`中，对当前请求做最后的权限校验，如果没有权限，则会抛出`AccessDeniedException`：

![image-20231119222957823](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192229882.png)

首先`AuthorizationFilter`会取出当前用户认证信息，因为当前请求未认证，用户为`AnonymousAuthenticationFilter`创建的**匿名用户**：

![image-20231119223120045](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192231149.png)

接着使用`AuthorizationManager`授权管理器对当前认证信息检查，因为是**匿名用户**，所以判定当前请求无权访问，抛出`AccessDeniedException`：

![image-20231119223320474](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192233539.png)



### 4.2 异常处理

抛出的`AccessDeniedException`异常会被`ExceptionTranslationFilter`捕获：

![image-20231119223453928](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192234057.png)

`ExceptionTranslationFilter`根据异常类型进行相应处理：

![image-20231119223543539](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192235571.png)

接着调用`handleAccessDeniedException`：

![image-20231119223648856](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192236930.png)

接着调用`sendStartAuthentication`缓存请求，并调用`AuthenticationEntryPoint`生成认证入口：

![image-20231119223625130](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192236173.png)



### 4.3 重定向

接着调用到`LoginUrlAuthenticationEntryPoint`的commence进行**重定向**或者**转发**：

![image-20231119223801209](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192238245.png)



### 4.4 生成默认登录页面

在经过`DefaultLoginPageGeneratingFilter`时，进行**默认登录页**处理，在该过滤器中，维护了很多参数：

```java
	// 登录页地址，默认/login
    private String loginPageUrl;
    // 登出成功页地址，默认/login?logout
    private String logoutSuccessUrl;
    // 登录错误页地址，默认/login?error
    private String failureUrl;
    // 是否开启表单登录
    private boolean formLoginEnabled;
    // 是否开启oauth2登录
    private boolean oauth2LoginEnabled;
    // 是否开启saml2登录
    private boolean saml2LoginEnabled;
    // 认证请求地址，默认/login
    private String authenticationUrl;
    // 用户名参数，默认username
    private String usernameParameter;
    // 密码参数，默认password
    private String passwordParameter;
```

重定向的`GET /login`请求则会进入**生成登录页**逻辑，调用`response`直接输出一个页面，并`return`不再执行后续操作：

![image-20231119223919693](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192239728.png)

那么这个LoginPageHtml是啥呢，其实大家到这里已经可以猜到了，没错就是我们的默认登录页面的HTML，被拼接成了String字符串，最后通过response写出。

我们可以点进去generateLoginPageHtml()这个方法中去查看。

![image-20231119224144289](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192241389.png)

没错，就是我们熟悉的HTML，然后通过StringBuilder拼接然后返回。

最后，我们默认的登录页面就在前端浏览器进行了展示。

![image-20231119224305949](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192243976.png)



## 5.参考文献

- https://springdoc.cn/spring-security/servlet/architecture.html
- http://springboot.fun/



## 6.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。



![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192151479.png)
