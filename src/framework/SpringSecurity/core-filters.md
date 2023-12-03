---
title: 核心过滤器
icon: circle-info
order: 5
category:
  - SpringSecurity
tag:
  - SpringSecurity
pageview: false
date: 2023-11-15 23:44:03
comment: false
breadcrumb: false
---


![image-20231030235443828](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310302354916.png)

## 1.前言

大家好，我是Leo哥🫣🫣🫣，上一节我们通过源码剖析以及图文分析，了解了关于`委派筛选器代理`和`过滤器链代理`的原理和作用。这节课我们接着学习SpringSecurity的过滤器，了解SpringSecurity中都有哪些核心过滤器。好了，话不多说让我们开始吧😎😎😎。


## 2.前提知识

上一节中我们详细的剖析了委派筛选器代理--->**DelegatingFilterProxy**,它的作用就是：实现把Servlet容器中的 Filter 同 Spring 容器中的 bean 关联起来，`DelegatingFilterProxy`实现了Filter接口，Servlet容器启动就会加载好这个类。借助他可以实现普通的Filter拦截到的Http请求交由FilterChainProxy。 

`FilterChainProxy` 是**顶层管理者**，统一管理 SecurityFilter和 SecurityFllterChain过滤器链

当请求到达 FilterChainProxy 时，会根据当前请求匹配SecurityFilterChain，然后将请求依次转发给 SecurityFilterChain 中的 SecurityFilter中。

回到我们上一张分析图。

![image-20231107204747766](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311072047866.png)



大家可以再次梳理一下当一个Http请求发出直到获取Web资源的整个过程。





## 3.核心过滤器

接下来我们主要介绍`Spring Security`中默认的`15`个过滤器相关作用。

这个时候有人问啦，Leo哥，你怎么知道SpringSecurity默认是15个核心过滤器呢，为啥不是14个。

哈哈哈，这个问题问得好，既然我敢这么说，那一定是有把握啦，下面我们启动IDEA看看。

打开IDEA，搜索**WebSecurityConfiguration**这个总配置类

![image-20231107235513951](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311072355165.png)

并在这里打一个断点，之后重启IDEA，记得以DEBUG方式运行。

![image-20231107235650717](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311072356914.png)



我们鼠标放在这一行进行查看，确实是项目已启动就加载了这个15个过滤器。嘿嘿。



### 3.1DisableEncodeUrlFilter

该过滤器用于禁用对URL进行编码的功能。它的作用是阻止Spring Security对URL进行自动编码，从而使得URL可以保持原始状态。

在某些情况下，用户可能希望禁用Spring Security对URL的编码，例如在特定的代理服务器或反向代理服务器上，因为这些代理服务器可能会自己处理URL的编码。此时就可以使用 `DisableEncodeUrlFilter` 来禁用Spring Security对URL的编码。

当你在Spring Security配置中加入 `DisableEncodeUrlFilter` 时，它将会在过滤器链中起作用，禁止Spring Security对URL进行编码。具体来说，它会覆盖默认的 `DefaultSecurityFilterChain` 配置，以确保 URL 编码被禁用。

**在XML配置中如下所示:**

```xml
<beans:bean id="disableUrlEncodingFilter" class="org.springframework.security.web.servletapi.DisableEncodeUrlFilter"/>
<http>
    <intercept-url pattern="/somepattern" access="permitAll" />
    <custom-filter ref="disableUrlEncodingFilter" before="SECURITY_CONTEXT_FILTER" />
</http>
```

**在Java配置中，如下所示:**

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
            .authorizeRequests()
                .antMatchers("/somepattern").permitAll()
                // 添加 DisableEncodeUrlFilter 到过滤器链中
                .and()
                .addFilterBefore(new DisableEncodeUrlFilter(), SecurityContextPersistenceFilter.class);
}
```

这个过滤器有什么用？ 首先实现`Session`会话，可以通过以下两种方式

- **Cookie**：浏览器设置，每次请求自动携带给服务端
- **URL重写**：`Cookie`被禁用时，后端响应将`sessionId`拼接在`URL`后进行重写，传递给页面

`DisableEncodeUrlFilter`禁用`HttpServletResponse`对`URL`进行编码重写，以防止将`sessionId`在`HTTP`访问日志等内容中泄露。

`DisableEncodeUrlResponseWrapper`，我们来简单来一下他的源码：

```java
    private static final class DisableEncodeUrlResponseWrapper extends HttpServletResponseWrapper {
        private DisableEncodeUrlResponseWrapper(HttpServletResponse response) {
            super(response);
        }
		// 直接返回，不重写
        public String encodeRedirectURL(String url) {
            return url;
        }
		// 直接返回，不重写
        public String encodeURL(String url) {
            return url;
        }
    }
```

需要注意的是，虽然禁用URL编码可能在特定的情况下很有用，但这也可能会导致一些安全性问题，因为URL编码通常是为了**防止跨站脚本（XSS）攻击**等安全问题。因此，禁用URL编码应该慎重考虑，并且需要在充分了解其潜在风险的情况下使用。



### 3.2WebAsyncManagerIntegrationFilter	

`WebAsyncManagerIntegrationFilter`用于集成**Web异步管理器(WebAsyncManager)**。它在处理异步请求时起着重要的作用，并确保在异步处理过程中正确地管理安全上下文。

`WebAsyncManagerIntegrationFilter`是第二个执行的过滤器，从名字上可以知道和异常请求有关。

具体来说，`WebAsyncManagerIntegrationFilter`负责在异步处理过程中同步安全上下文，以确保安全上下文能够正确传播到异步执行的线程中。这对于处理异步请求非常重要，因为在异步处理中，线程可能会发生切换，而安全上下文的正确传递对于安全操作至关重要。

在实际应用中，`WebAsyncManagerIntegrationFilter`通常与Spring MVC的异步请求处理机制一起使用，确保在使用`Callable`或`DeferredResult`等异步处理方式时，安全上下文能够正确传播。

默认情况下，`Spring Security `经过认证后，认证信息会存储在当前线程`ThreadLocal`（不是`InheritableThreadLocal`）中，如果是异步，主线程已经执行完毕，子线程执行过程中则无法获取当前认证信息。

在`Spring `中的异步通过`WebAsyncManager`管理异步请求，异步请求交由`TaskExecutor`线程池去处理，`WebAsyncManager`提供了一个拦截器机制，可以用拦截器将主线程中的数据传递到子线程中。

下面是一个简单的示例，演示了如何在SpringSecurity配置中使用WebAsyncManagerIntegrationFilter：

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
             // ...其他配置
            .addFilter(new WebAsyncManagerIntegrationFilter()) // 添加WebAsyncManagerIntegrationFilter到过滤器链中
            // ...其他配置
}

```

需要注意的是，WebAsyncManagerIntegrationFilter通常不需要显式地在配置中添加，因为它通常会由Spring Security自动添加到过滤器链中。但是，如果你有特殊的需求或者定制化的异步处理方式，你可能需要显式地添加WebAsyncManagerIntegrationFilter。

总之，WebAsyncManagerIntegrationFilter在SpringSecurity中扮演着确保安全上下文正确传播到异步处理过程中的重要角色，它是保证异步请求处理安全性的关键组成部分。



### 3.3HeaderWriterFilter

`HeaderWriterFilter`字面理解为请求头写入过滤器，他的作用是将某些头信息添加到响应中，添加某些启用浏览器保护的头信息非常有用，如`X-Frame-Options`、`X-XSS-Protection`、`X-Content-Type-Options`等，增加一些安全性。

逻辑也比较简单，就是添加头部信息：

```java
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    	// shouldWriteHeadersEagerly 直接添加
        if (this.shouldWriteHeadersEagerly) {
            this.doHeadersBefore(request, response, filterChain);
        } else {
            this.doHeadersAfter(request, response, filterChain);
        }

    }
```

具体来说，`SecurityContextHolderFilter` 通过 `SecurityContextHolder` 来管理安全上下文。`SecurityContextHolder` 是 Spring Security 提供的一个持有安全上下文的地方，它使用 `ThreadLocal` 来确保在同一线程内安全上下文的传递。

在请求到达后端应用程序时，`SecurityContextHolderFilter` 将当前的安全上下文信息从 HTTP 请求中获取，并存储在 `SecurityContextHolder` 中。这样，在请求的任何地方，都可以通过 `SecurityContextHolder` 来获取当前用户的身份、权限等安全信息。

在 **SpringSecurity** 配置中，通常会自动包含 `SecurityContextHolderFilter`，因此在大多数情况下不需要显式地配置该过滤器。例如，在基于 Java 的配置中，你通常只需要通过 `@EnableWebSecurity` 注解启用 Spring Security，并进行相应的配置即可。

下面是一个简单的示例，演示了如何在 Spring Security 中进行基本的配置：

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
            // ...其他配置
            .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .and()
            .httpBasic();
}
```

在这个配置中，虽然没有显式地添加 `SecurityContextHolderFilter`，但它会被自动包含在 Spring Security 的过滤器链中。

总之，`SecurityContextHolderFilter` 在 Spring Security 中扮演着确保安全上下文正确传播和管理的重要角色，它是整个安全框架中的关键组成部分。



### 3.4CsrfFilter

`CsrfFilter` 是SpringSecurity 中用于防止 **CSRF(跨站请求伪造)**攻击的过滤器。CSRF 攻击是一种利用用户在其他网站上已经登录的身份信息，来发起对目标网站的恶意请求的攻击方式。为了防止这种攻击，SpringSecurity 提供了 `CsrfFilter` 来加强应用程序的安全性。

`CsrfFilter` 的主要作用是验证每个非安全 HTTP 请求（例如 POST、PUT、DELETE 等）中是否包含有效的 CSRF 令牌。如果请求中缺少有效的 CSRF 令牌，`CsrfFilter` 将拒绝该请求，并返回相应的错误信息。

在 Spring Security 中，默认情况下，`CsrfFilter` 是自动启用的，它会在请求中自动添加 CSRF 令牌，并验证每个非安全请求中的令牌是否有效。同时，Spring Security 还提供了一些配置选项，以便开发人员可以根据应用程序的需求进行定制化的 CSRF 防护策略。

下面是一个简单的示例，演示了如何在 SpringSecurity 中进行基本的 **CSRF** 配置：

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
             // ...其他配置
            .csrf().disable(); // 禁用 CSRF 防护
}
```

在这个配置中，通过禁用**CSRF**防护，`CsrfFilter` 将不再生效，从而允许非安全请求不携带 CSRF 令牌。

总之，`CsrfFilter` 在 SpringSecurity 中扮演着加强应用程序安全性的重要角色，它是保护应用程序免受 CSRF 攻击的关键组成部分。通过合理地配置和使用 `CsrfFilter`，可以有效地提高应用程序的安全性。



### 3.5SecurityContextHolderFilter

`SecurityContextHolderFilter`是第五个过滤器，直接继承自`GenericFilterBean`，声明了两个成员属性：

```java
	// 请求之间持久化	 SecurityContext
	private final SecurityContextRepository securityContextRepository;
	// 一种针对线程存储 SecurityContext 策略。
	private SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder
			.getContextHolderStrategy();
```

不难看出，该过滤器的作用就是将持久化的`SecurityContext`设置到当前线程中，比如登录成功后，在`HttpSession`中保存了`SecurityContext`，那么该过滤器可以直接将`SecurityContext`设置到请求线程中。

```java
	private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		// 1. 获取属性 SecurityContextHolderFilter.class.getName() + ".APPLIED"
		// 存在说明当前请求已执行该过滤器
		if (request.getAttribute(FILTER_APPLIED) != null) {
			chain.doFilter(request, response);
			return;
		}
		// 2. 设置属性
		request.setAttribute(FILTER_APPLIED, Boolean.TRUE);
		// 3. 存储中加载 SecurityContext
		Supplier<SecurityContext> deferredContext = this.securityContextRepository.loadDeferredContext(request);
		try {
			// 4. 将SecurityContext 设置到ContextHolder中
			this.securityContextHolderStrategy.setDeferredContext(deferredContext);
			chain.doFilter(request, response);
		}
		finally {
			// 完成后，清理上下文，移除属性
			this.securityContextHolderStrategy.clearContext();
			request.removeAttribute(FILTER_APPLIED);
		}
	}

```

`SecurityContextHolderFilter` 负责在请求处理过程中管理安全上下文。安全上下文是指存储了当前用户的认证信息（如身份、权限等）的对象，在整个请求处理过程中需要被使用。

具体来说，`SecurityContextHolderFilter` 主要完成以下几个任务：

1. 从请求中获取安全上下文：当请求到达后端应用程序时，`SecurityContextHolderFilter` 会尝试从请求中提取安全相关的信息，例如认证凭证、权限信息等。
2. 将安全上下文与当前线程绑定：获取到安全上下文后，`SecurityContextHolderFilter` 会将其绑定到当前线程中。Spring Security 使用 `ThreadLocal` 来实现线程本地变量存储，确保在同一线程内安全上下文的传递。
3. 允许在请求处理过程中访问安全上下文：一旦安全上下文与当前线程绑定成功，整个请求处理过程中的代码均可通过 `SecurityContextHolder` 来获取当前用户的安全信息，而无需显式地传递安全上下文。

在典型的SpringSecurity 配置中，`SecurityContextHolderFilter` 通常作为过滤器链中的第一个过滤器，以确保在请求进入应用程序时，安全上下文已经准备就绪。

以下是一个简单的示例，展示了如何在**SpringSecurity** 中进行基本的配置，并演示了 `SecurityContextHolderFilter` 的使用：

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
             // ...其他配置
            .addFilterBefore(new SecurityContextHolderFilter(), UsernamePasswordAuthenticationFilter.class)
            .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .formLogin();
}
```

在这个配置中，我们通过 `addFilterBefore` 方法将自定义的 `SecurityContextHolderFilter` 添加到了过滤器链中，以确保在请求进入应用程序时能够正确处理安全上下文。

总之，`SecurityContextHolderFilter` 在 Spring Security 中扮演着确保安全上下文正确传播和管理的重要角色，它是整个安全框架中的关键组成部分。通过合理地配置和使用 `SecurityContextHolderFilter`，可以确保安全上下文在请求处理过程中得到正确管理和传递，从而实现应用程序的安全防护。



### 3.6LogoutFilter

`LogoutFilter` 是 SpringSecurity 框架中的一个关键过滤器，用于处理用户注销（logout）操作。用户注销是指用户主动终止当前会话并退出登录状态的操作，而 `LogoutFilter` 负责在用户发起注销请求时执行相应的处理逻辑。

具体来说，`LogoutFilter` 主要完成以下几个任务：

1. 监听注销请求：当用户发起注销请求时，`LogoutFilter` 会拦截该请求，并进行相应的处理。通常情况下，注销请求会使用 HTTP 的 GET 或 POST 方法，并以特定的 URL 地址表示。
2. 执行注销逻辑：一旦捕获到注销请求，`LogoutFilter` 将执行相应的注销逻辑，包括清除用户的认证信息、使当前会话失效、清空安全上下文等操作。
3. 重定向或返回响应：在执行完注销逻辑后，`LogoutFilter` 可能会将用户重定向到指定的页面，或者直接返回注销成功的响应。

在典型的 Spring Security 配置中，`LogoutFilter` 通常作为过滤器链中的最后一个过滤器，以确保在请求处理结束后能够正确处理用户的注销请求。

```java
	private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// 1. 查看当前请求路径是否登出，默认登出路径为/logout
		if (requiresLogout(request, response)) {
			// 2. 获取线程中的认证信息
			Authentication auth = this.securityContextHolderStrategy.getContext().getAuthentication();
			if (this.logger.isDebugEnabled()) {
				this.logger.debug(LogMessage.format("Logging out [%s]", auth));
			}
			// 3. 调用登出处理器处理
			this.handler.logout(request, response, auth);
			// 4. 登出成功处理器，跳转到指定页面
			this.logoutSuccessHandler.onLogoutSuccess(request, response, auth);
			return;
		}
		chain.doFilter(request, response);
	}

```

以下是一个简单的示例，展示了如何在 Spring Security 中进行基本的注销配置，并演示了 `LogoutFilter` 的使用：

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
            // ...其他配置
            .logout()
                .logoutUrl("/custom-logout") // 自定义注销 URL
                .logoutSuccessUrl("/logout-success") // 注销成功后的跳转页面
                .addLogoutHandler(new CustomLogoutHandler()) // 添加自定义的注销处理器
                .invalidateHttpSession(true) // 使当前会话失效
                .deleteCookies("JSESSIONID") // 删除指定的 Cookie
                .permitAll()
                .and()
            // ...其他配置
}
```

在这个配置中，我们通过 `.logout()` 方法配置了注销相关的信息，包括注销 URL、注销成功后的跳转页面、自定义的注销处理器、是否使当前会话失效以及需要删除的 Cookie 等。

`LogoutFilter` 在 **SpringSecurity** 中扮演着处理用户注销请求的重要角色，它是实现用户注销功能的关键组成部分。通过合理地配置和使用 `LogoutFilter`，可以确保用户的注销操作得到正确处理，从而提升应用程序的用户体验和安全性。



### 3.7UsernamePasswordAuthenticationFilter

`UsernamePasswordAuthenticationFilter` 是 SpringSecurity 框架中的一个核心过滤器，用于处理基于用户名密码的身份认证请求。它是实现用户登录验证的关键组件之一，负责从用户提交的用户名密码信息进行认证，并在认证成功后生成相应的认证信息。

具体来说，`UsernamePasswordAuthenticationFilter` 主要完成以下几个任务：

1. 监听认证请求：当用户提交用户名密码等认证信息时，`UsernamePasswordAuthenticationFilter` 会拦截该请求，并进行身份认证处理。
2. 提取认证信息：从用户提交的请求中提取用户名密码等身份认证信息。
3. 执行认证逻辑：使用提取到的用户名密码信息进行实际的身份认证过程，通常包括验证用户名密码的正确性、获取用户的权限信息等操作。
4. 认证成功：如果认证成功，`UsernamePasswordAuthenticationFilter` 将生成相应的认证信息，包括用户的主体（Principal）、权限信息等，并将其存储到安全上下文中。
5. 认证失败：如果认证失败，`UsernamePasswordAuthenticationFilter` 可能会返回相应的认证失败信息，并阻止用户继续访问受保护的资源。

```java
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		// 1. 校验请求方式
		if (this.postOnly && !request.getMethod().equals("POST")) {
			throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
		}
		// 2. 获取请求参数中的用户名、密码
		String username = obtainUsername(request);
		username = (username != null) ? username.trim() : "";
		String password = obtainPassword(request);
		password = (password != null) ? password : "";
		// 3. 创建认证令牌
		UsernamePasswordAuthenticationToken authRequest = UsernamePasswordAuthenticationToken.unauthenticated(username,
				password);
		// Allow subclasses to set the "details" property
		setDetails(request, authRequest);
		// 4. 认证管理器进行认证
		return this.getAuthenticationManager().authenticate(authRequest);
	}

```

在**SpringSecurity** 配置中，`UsernamePasswordAuthenticationFilter` 被默认配置为过滤器链中的第一个过滤器，以确保在用户登录请求到达后端应用程序时能够正确处理身份认证逻辑。

以下是一个简单的示例，展示了如何在**SpringSecurity** 中进行基本的身份认证配置，并演示了 `UsernamePasswordAuthenticationFilter` 的使用：

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
             .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login") // 自定义登录页面
                .permitAll()
                .and()
            .addFilterBefore(new UsernamePasswordAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
}
```

在这个配置中，我们通过 `.formLogin()` 方法配置了登录相关的信息，包括自定义的登录页面和允许所有用户访问登录页面。同时，我们通过 `addFilterBefore` 方法将自定义的 `UsernamePasswordAuthenticationFilter` 添加到了过滤器链中，以确保在请求进入应用程序时能够正确处理身份认证逻辑。

`UsernamePasswordAuthenticationFilter` 在 Spring Security 中扮演着处理用户身份认证请求的重要角色，它是确保用户身份得到正确验证并生成相应认证信息的关键组件。通过合理地配置和使用 `UsernamePasswordAuthenticationFilter`，可以实现应用程序的安全认证功能，保护系统不受未经授权的访问。



### 3.8DefaultLoginPageGeneratingFilter

`DefaultLoginPageGeneratingFilter` 是 Spring Security框架中的一个过滤器，用于生成默认的登录页面。当应用程序需要用户登录但未配置自定义的登录页面时，`DefaultLoginPageGeneratingFilter` 将负责生成一个简单的默认登录页面，并在用户访问未授权资源时引导用户进行登录。

具体来说，`DefaultLoginPageGeneratingFilter` 主要完成以下几个任务：

1. 监听未授权请求：当用户尝试访问受保护的资源但未进行登录认证时，`DefaultLoginPageGeneratingFilter` 会拦截该请求，并进行处理。
2. 生成默认登录页面：如果应用程序未配置自定义的登录页面，`DefaultLoginPageGeneratingFilter` 将生成一个简单的默认登录页面，包括用户名密码输入框、登录按钮等基本元素。
3. 引导用户进行登录：将生成的默认登录页面返回给用户，以引导用户进行身份认证操作。

```java
	private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		boolean loginError = isErrorPage(request); // 是否登录错误 /login?error
		boolean logoutSuccess = isLogoutSuccess(request); // 是否登录成功 /login?logout
		if (isLoginUrlRequest(request) || loginError || logoutSuccess) {
			//1.  /login?error、/login?logout、/login 三种请求URL中的任意一种会进入该方法
			//2. 生成登录页
			String loginPageHtml = generateLoginPageHtml(request, loginError, logoutSuccess);
			response.setContentType("text/html;charset=UTF-8");
			response.setContentLength(loginPageHtml.getBytes(StandardCharsets.UTF_8).length);
			//3. 直接写出，并结束
			response.getWriter().write(loginPageHtml);
			return;
		}
		chain.doFilter(request, response);
	}

```

在典型的 SpringSecurity 配置中，`DefaultLoginPageGeneratingFilter` 通常作为过滤器链中的其中一个过滤器存在，以便在用户访问受保护资源但未进行登录认证时，能够正确生成默认的登录页面并引导用户进行登录操作。

![image-20231107232222152](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311072322540.png)

在`generateLoginPageHtml`方法中，我们可以看到直接使用字符串拼接了一个`HTML`登录页面，也就是我们最开始引入SpringSecurity依赖之后的那个默认登录页面。

下面通过一个示例，展示了如何在SpringSecurity 中进行基本的身份认证配置，并演示了 `DefaultLoginPageGeneratingFilter` 的使用：

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
              .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .and()
            .addFilterBefore(new DefaultLoginPageGeneratingFilter(), UsernamePasswordAuthenticationFilter.class);
}
```

在这个配置中，我们通过 `.formLogin()` 方法配置了登录相关的信息，但未指定自定义的登录页面，因此 `DefaultLoginPageGeneratingFilter` 将会被触发以生成默认的登录页面。同时，我们通过 `addFilterBefore` 方法将 `DefaultLoginPageGeneratingFilter` 添加到了过滤器链中。

`DefaultLoginPageGeneratingFilter` 在 Spring Security 中起着生成默认登录页面，引导用户进行登录的重要作用。当应用程序需要一个简单的登录页面来引导用户进行身份认证时，可以借助 `DefaultLoginPageGeneratingFilter` 来快速实现这一功能，从而提升系统的用户友好性和安全性。



### 3.9DefaultLogoutPageGeneratingFilter

`DefaultLogoutPageGeneratingFilter`和上面一样，如果请求`URL`是`/logout`，直接生成一个确认退出页面。

![image-20231107232600856](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311072326953.png)





### 3.10BasicAuthenticationFilter

`BasicAuthenticationFilter`处理`BASIC`认证（请求头中携带`BASIC` +特殊格式用户名密码），除表单登录的另一种登录方式，但是目前用的很少，和表单登录逻辑类似：

```java
@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		try {
			UsernamePasswordAuthenticationToken authRequest = this.authenticationConverter.convert(request);
			if (authRequest == null) {
				this.logger.trace("Did not process authentication request since failed to find "
						+ "username and password in Basic Authorization header");
				chain.doFilter(request, response);
				return;
			}
			String username = authRequest.getName();
			this.logger.trace(LogMessage.format("Found username '%s' in Basic Authorization header", username));
			if (authenticationIsRequired(username)) {
				Authentication authResult = this.authenticationManager.authenticate(authRequest);
				SecurityContext context = this.securityContextHolderStrategy.createEmptyContext();
				context.setAuthentication(authResult);
				this.securityContextHolderStrategy.setContext(context);
				if (this.logger.isDebugEnabled()) {
					this.logger.debug(LogMessage.format("Set SecurityContextHolder to %s", authResult));
				}
				this.rememberMeServices.loginSuccess(request, response, authResult);
				this.securityContextRepository.saveContext(context, request, response);
				onSuccessfulAuthentication(request, response, authResult);
			}
		}
		catch (AuthenticationException ex) {
			this.securityContextHolderStrategy.clearContext();
			this.logger.debug("Failed to process authentication request", ex);
			this.rememberMeServices.loginFail(request, response);
			onUnsuccessfulAuthentication(request, response, ex);
			if (this.ignoreFailure) {
				chain.doFilter(request, response);
			}
			else {
				this.authenticationEntryPoint.commence(request, response, ex);
			}
			return;
		}

		chain.doFilter(request, response);
	}
```

具体来说，`BasicAuthenticationFilter` 主要完成以下几个任务：

1. 提取认证信息：在每个请求处理之前，`BasicAuthenticationFilter` 会从请求头中提取 Base64 编码的用户名和密码信息，用于后续的身份验证。
2. 执行身份验证：`BasicAuthenticationFilter` 会将提取到的用户名和密码信息传递给认证管理器（AuthenticationManager），由认证管理器来进行实际的身份验证操作。
3. 处理身份验证结果：根据身份验证的结果，`BasicAuthenticationFilter` 会在安全上下文中设置相应的认证信息，并根据认证结果决定是否允许请求继续处理。
4. 错误处理：当身份验证失败时，`BasicAuthenticationFilter` 负责返回适当的身份验证失败响应，要求客户端重新发起身份验证。

通过合理配置 `BasicAuthenticationFilter`，可以实现对基本认证的请求进行身份验证，并根据验证结果决定是否允许请求继续处理。

以下是一个简单的示例，展示了如何在 **SpringSecurity** 中配置 `BasicAuthenticationFilter`：

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
             // ... 其他配置
            .addFilterBefore(new RequestCacheAwareFilter(), UsernamePasswordAuthenticationFilter.class);
}
```

在这个配置中，我们通过 `.addFilterBefore(new BasicAuthenticationFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class)` 将 `BasicAuthenticationFilter` 添加到了过滤器链中，并传入了认证管理器以进行实际的身份验证操作。

`BasicAuthenticationFilter` 在 Spring Security 中扮演着处理基本认证相关逻辑的重要角色，通过它的配置可以实现对基本认证的请求进行身份验证，提高系统的安全性和访问控制能力。



### 3.11RequestCacheAwareFilter

`RequestCacheAwareFilter`缓存被登录打断的请求，例如访问某个`URL`，会调转到登录页面，登录成功后，会从当前缓存中获取之前访问的`URL`，直接跳转到原来的请求：

```java
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// 1. 获取缓存请求
		HttpServletRequest wrappedSavedRequest = this.requestCache.getMatchingRequest((HttpServletRequest) request,
				(HttpServletResponse) response);
		// 2. 存在则传递之前缓存的请求对象
		chain.doFilter((wrappedSavedRequest != null) ? wrappedSavedRequest : request, response);
	}
```

具体来说，`RequestCacheAwareFilter` 主要完成以下几个任务：

1. 请求缓存：在用户完成身份验证前，`RequestCacheAwareFilter` 会将原始的请求信息保存到请求缓存中，这样用户完成身份验证后就可以获取到这些原始请求信息。
2. 请求信息的恢复：当用户完成身份验证后，`RequestCacheAwareFilter` 会根据请求缓存中的信息，将用户原始的请求信息（如请求 URL、请求参数等）恢复，从而让用户能够继续之前被中断的请求处理流程。
3. 与其他安全组件的协作：`RequestCacheAwareFilter` 通常与其他安全组件（如身份验证过滤器、访问控制过滤器等）协同工作，确保在用户完成身份验证后能够正确地恢复原始的请求信息。

通过合理配置 `RequestCacheAwareFilter`，可以实现用户完成身份验证后能够无缝地继续之前的请求处理流程，提高系统的用户体验和功能完整性。

以下是一个简单的示例，展示了如何在 **SpringSecurity** 中配置 `RequestCacheAwareFilter`：

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
             // ... 其他配置
            .addFilterBefore(new RequestCacheAwareFilter(), UsernamePasswordAuthenticationFilter.class);
}
```

在这个配置中，我们通过 `.addFilterBefore(new RequestCacheAwareFilter(), UsernamePasswordAuthenticationFilter.class)` 将 `RequestCacheAwareFilter` 添加到了过滤器链中。

`RequestCacheAwareFilter` 在 Spring Security 中扮演着保存和恢复用户原始请求信息的重要角色，通过它的配置可以实现用户完成身份验证后能够无缝地继续之前的请求处理流程，提高系统的用户体验和功能完整性。



### 3.12SecurityContextHolderAwareRequestFilter

`SecurityContextHolderAwareRequestFilter` 将请求包装为`Servlet3SecurityContextHolderAwareRequestWrapper`：

具体来说，`SecurityContextHolderAwareRequestFilter` 主要完成以下几个任务：

1. 将安全上下文信息与请求关联：在每个请求处理之前，`SecurityContextHolderAwareRequestFilter` 会将当前的安全上下文信息绑定到当前的 HTTP 请求上下文中，这样在请求处理过程中可以方便地获取和操作安全上下文信息。
2. 提供方便的安全上下文访问方式：通过 `SecurityContextHolderAwareRequestFilter`，可以在请求处理过程中以一种方便的方式获取当前的认证信息、权限信息等安全上下文相关的信息，而不需要显式地从 `SecurityContextHolder` 中获取。
3. 与其他安全组件的协作：`SecurityContextHolderAwareRequestFilter` 通常与其他安全组件（如身份验证过滤器、访问控制过滤器等）协同工作，确保安全上下文信息能够在整个请求处理过程中得到正确的传递和使用。

通过合理配置 `SecurityContextHolderAwareRequestFilter`，可以实现安全上下文信息与 HTTP 请求的有效关联，提高系统对安全信息的处理效率和便利性。

以下是一个简单的示例，展示了如何在 **SpringSecurity** 中配置 `SecurityContextHolderAwareRequestFilter`：

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
               // ... 其他配置
            .addFilterBefore(new SecurityContextHolderAwareRequestFilter(), UsernamePasswordAuthenticationFilter.class);
}
```

在这个配置中，我们通过 `.addFilterBefore(new SecurityContextHolderAwareRequestFilter(), UsernamePasswordAuthenticationFilter.class)` 将 `SecurityContextHolderAwareRequestFilter` 添加到了过滤器链中。

总之，`SecurityContextHolderAwareRequestFilter` 在 Spring Security 中扮演着将安全上下文信息与 HTTP 请求关联的重要角色，通过它的配置可以实现在请求处理过程中方便地获取和操作安全上下文信息，提高系统的安全性和开发效率。





### 3.13AnonymousAuthenticationFilter

`Anonymous`是匿名用户的意思，当之前的过滤器没有发现认证的用户信息时，会在`AnonymousAuthenticationFilter`过滤器中创建一个匿名用户：

```java
	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		Supplier<SecurityContext> deferredContext = this.securityContextHolderStrategy.getDeferredContext();
		this.securityContextHolderStrateg.setDeferredContext(defaultWithAnonymous((HttpServletRequest) req, deferredContext));
		chain.doFilter(req, res);
	}
```

这个匿名身份信息允许匿名用户在系统中进行一定程度的操作，比如访问公开的资源或进行有限制的操作。

具体来说，`AnonymousAuthenticationFilter` 主要完成以下几个任务：

1. 匿名身份的创建：当用户尚未进行认证时，`AnonymousAuthenticationFilter` 负责创建一个匿名的身份信息，并将其绑定到当前的安全上下文中。
2. 安全上下文的维护：`AnonymousAuthenticationFilter` 将负责维护当前请求的安全上下文，确保匿名用户在系统中能够得到适当的处理和权限控制。
3. 与其他身份验证过滤器的协作：`AnonymousAuthenticationFilter` 通常与其他身份验证过滤器（比如表单登录过滤器、基本认证过滤器等）协同工作，确保在用户未进行认证时能够创建并使用匿名身份信息。

通过合理配置 `AnonymousAuthenticationFilter`，可以实现对匿名用户的安全管理，确保他们在系统中的合法操作不影响系统的安全性。

以下是一个简单的示例，展示了如何在 Spring Security 中配置 `AnonymousAuthenticationFilter`：

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
             .authorizeRequests()
                .antMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .and()
            .addFilterBefore(new AnonymousAuthenticationFilter("anonymousUser"), UsernamePasswordAuthenticationFilter.class);
}
```

在这个配置中，我们通过 `.antMatchers("/public/**").permitAll()` 配置了对 `/public/**` 路径下的资源的公开访问权限，并通过 `AnonymousAuthenticationFilter` 创建了一个名为 `anonymousUser` 的匿名身份信息，并将其添加到了过滤器链中。

`AnonymousAuthenticationFilter` 在 Spring Security 中扮演着为匿名用户创建身份信息的重要角色，通过它的配置可以有效管理匿名用户在系统中的操作和权限，从而提高系统的安全性和用户体验。



### 3.14ExceptionTranslationFilter

`ExceptionTranslationFilter`是比较重要的一个过滤器，对异常进行转换处理，处理过滤器中的抛出`AccessDeniedException`、`AuthenticationException`，提供了`Java`异常和`HTTP`响应之间的桥梁。

具体来说，`ExceptionTranslationFilter` 主要完成以下几个任务：

1. 异常转换：当发生安全相关的异常，比如用户未认证、无权限访问等情况时，`ExceptionTranslationFilter` 将负责将这些异常转换为特定的响应，比如跳转到登录页面、返回拒绝访问的错误信息等。
2. 异常处理：针对不同的安全异常，`ExceptionTranslationFilter` 可以配置相应的异常处理策略，比如跳转到特定页面、返回特定的错误码等。
3. 与其他过滤器的协作：`ExceptionTranslationFilter` 通常与其他安全过滤器（比如身份验证过滤器、访问控制过滤器等）协同工作，确保在安全相关的异常发生时能够得到正确处理。

通过合理配置 `ExceptionTranslationFilter`，可以实现对安全异常的统一处理，提高系统的安全性和用户体验。

```java
	private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		try {
			chain.doFilter(request, response);
		}
		catch (IOException ex) {
			throw ex;
		}
		catch (Exception ex) {
			// 1. 尝试从堆栈中提取 SpringSecurity异常
			// Try to extract a SpringSecurityException from the stacktrace
			Throwable[] causeChain = this.throwableAnalyzer.determineCauseChain(ex);
			// 2. 分析异常是否 AuthenticationException
			RuntimeException securityException = (AuthenticationException) this.throwableAnalyzer
					.getFirstThrowableOfType(AuthenticationException.class, causeChain);
			// 3. 没有AuthenticationException,则获取AccessDeniedException
			if (securityException == null) {
				securityException = (AccessDeniedException) this.throwableAnalyzer
						.getFirstThrowableOfType(AccessDeniedException.class, causeChain);
			}
			// 4. 不是AuthenticationException、AccessDeniedException直接抛出
			if (securityException == null) {
				rethrow(ex);
			}
			if (response.isCommitted()) {
				throw new ServletException("Unable to handle the Spring Security Exception "
						+ "because the response is already committed.", ex);
			}
			// 5. 处理异常
			handleSpringSecurityException(request, response, chain, securityException);
		}
	}
```

以下是一个简单的示例，展示了如何在 **SpringSecurity** 中配置 `ExceptionTranslationFilter`：

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
             .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .and()
            .exceptionHandling()
                .accessDeniedPage("/403") // 配置访问拒绝时的页面
                .and()
            .addFilterBefore(new ExceptionTranslationFilter(), FilterSecurityInterceptor.class);
}
```

在这个配置中，我们通过 `.exceptionHandling()` 方法配置了访问拒绝时的处理策略，并将 `ExceptionTranslationFilter` 添加到了过滤器链中。

`ExceptionTranslationFilter` 在 Spring Security 中扮演着统一处理安全异常的重要角色，通过它的配置可以实现对各种安全异常的统一处理和响应定制，从而提升系统的安全性和用户体验。



### 3.15AuthorizationFilter

**AuthorizationFilter**是我们介绍的最后一个过滤器，`Authorization`是授权的意思，就是用来检验我们当前的请求是否具有相应的权限。

`AuthorizationFilter` 并不是一个内置的类或过滤器。也许您在问的是 `AuthorizationFilter` 的概念或者类似的功能。一般来说，在 Spring Security 中实现权限控制的过滤器是 `FilterSecurityInterceptor`。

`FilterSecurityInterceptor` 是 Spring Security 中负责进行访问控制的过滤器之一，它主要用于对请求进行权限验证和访问控制。当用户发送请求时，`FilterSecurityInterceptor`会拦截该请求，并执行以下任务：

1. 权限验证：根据请求的路径和用户的权限信息，判断用户是否具有访问该资源的权限。
2. 访问控制决策：根据配置的权限控制规则，决定是否允许用户访问请求的资源。
3. 异常处理：在权限验证失败或访问被拒绝时，`FilterSecurityInterceptor` 负责抛出相应的异常或执行其他定义的异常处理逻辑。

通过合理配置 `FilterSecurityInterceptor`，可以实现对系统中各种资源的权限控制，确保只有具有相应权限的用户才能访问特定的功能或数据。

```java
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        HttpServletResponse response = (HttpServletResponse)servletResponse;
        // 1. 如果设置了监控每一次请求，并且当前过滤器已经执行，则直接跳过
        if (this.observeOncePerRequest && this.isApplied(request)) {
            chain.doFilter(request, response);
        } else if (this.skipDispatch(request)) {
        	// 2. 如果是访问错误页面，则直接跳过
            chain.doFilter(request, response);
        } else {
			// 3. 设置已执行当前过滤器 
			// org.springframework.security.web.access.intercept.AuthorizationFilter@5707f613.APPLIED
            String alreadyFilteredAttributeName = this.getAlreadyFilteredAttributeName();
            request.setAttribute(alreadyFilteredAttributeName, Boolean.TRUE);

            try {
            	// 4. 调用AuthorizationManager 检查当前是否有权限
                AuthorizationDecision decision = this.authorizationManager.check(this::getAuthentication, request);
                // 5. 发布授权事件
                this.eventPublisher.publishAuthorizationEvent(this::getAuthentication, request, decision);
                // 6. 如果未被授权，抛出 AccessDeniedException
                if (decision != null && !decision.isGranted()) {
                    throw new AccessDeniedException("Access Denied");
                }
                chain.doFilter(request, response);
            } finally {
                request.removeAttribute(alreadyFilteredAttributeName);
            }

        }
    }
```



## 4.流程分析

上面我们介绍了这么多的过滤器以及进行了简单的分析，但是还有一个问题我们需要注意，既然项目启动初始化后会初识化这些过滤器，那么是谁来进行执行调度他们呢？

之前我们了解过`FilterChainProxy `是 `SpringSecurity `使用的核心，用于代理`SpringSecurity`中所有的`SecurityFilterChain `，本质上是一个特殊的过滤器，通过`DelegatingFilterProxy `进行代理。

`FilterChainProxy`继承自`GenericFilterBean`类。

```java
 public FilterChainProxy(List<SecurityFilterChain> filterChains) {
	 // 上下文持有者（当前认证主体一些信息）策略，默认：ThreadLocal
	 this.securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
	 // 过滤器链校验
 	this.filterChainValidator = new NullFilterChainValidator();
	 // Http防火墙
	 this.firewall = new StrictHttpFirewall();
	 // 请求被拒绝处理程序
	 this.requestRejectedHandler = new HttpStatusRequestRejectedHandler();
	 // 异常解析器
	 this.throwableAnalyzer = new ThrowableAnalyzer();
	 // 虚拟的过滤器链装饰器
	 this.filterChainDecorator = new VirtualFilterChainDecorator();
	 // Security 过滤器链集合，默认只有一个DefaultSecurityFilterChain
	 this.filterChains = filterChains;
 }
```

那么他们的整个的**执行流程**是怎么样的呢，我们来简单分析一下。

![image-20231108095916877](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311080959111.png)

在`doFilterInternal`方法中`Spring Security `防火墙会进行第一步请求校验：

```java
	private void doFilterInternal(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// 1. 防火墙校验，将请求和响应进行包装
		// 1.1 请求方式是否被允许
		// 1.2 URL 是否规范
		// 1.3 远程IP是否黑名单
		// 1.4 拒绝字段名称中的不可打印Ascii字符
		// 1.5 请求对象是否规范
		FirewalledRequest firewallRequest = this.firewall.getFirewalledRequest((HttpServletRequest) request);
		HttpServletResponse firewallResponse = this.firewall.getFirewalledResponse((HttpServletResponse) response);
		// 取出所有过滤器链中的所有过滤器
		List<Filter> filters = getFilters(firewallRequest);
		FilterChain reset = (req, res) -> {
			if (logger.isDebugEnabled()) {
				logger.debug(LogMessage.of(() -> "Secured " + requestLine(firewallRequest)));
			}
			// Deactivate path stripping as we exit the security filter chain
			firewallRequest.reset();
			chain.doFilter(req, res);
		};
		// 对过滤器链进行装饰，并调用装饰类的doFilter 方法
		this.filterChainDecorator.decorate(reset, filters).doFilter(firewallRequest, firewallResponse);
	}
```

在装饰过滤器链`VirtualFilterChain`中，开始正式调用`Spring Security `中的过滤器：

```java
		public void doFilter(ServletRequest request, ServletResponse response) throws IOException, ServletException {
			// 1. 当前被调用过滤器的位置（初始值为0）是否等于过滤器数量（默认15）
			if (this.currentPosition == this.size) {
				// 位置变为过滤器数量大小时，说明全部执行完毕，调用过滤器链执行过滤器（不再是Spring Security 中的过滤器了）
				this.originalChain.doFilter(request, response);
				return;
			}
			// 2. 位置加1
			this.currentPosition++;
			// 3. 获取当前过滤器
			Filter nextFilter = this.additionalFilters.get(this.currentPosition - 1);
			if (logger.isTraceEnabled()) {
				String name = nextFilter.getClass().getSimpleName();
				logger.trace(LogMessage.format("Invoking %s (%d/%d)", name, this.currentPosition, this.size));
			}
			// 4. 执行过滤器
			nextFilter.doFilter(request, response, this);
		}
```

可以看到，`SpringSecurity `中的过滤器执行，是严格按照顺序被调用的。每个过滤器有序执行，完成各自的功能，所有的过滤器都通过后，进入`Servlet`，控制层接收到请求进行业务逻辑处理，最终响应对象又经过每一个过滤器，返回给客户端。



## 5.参考文献

- https://learn.lianglianglee.com/%E4%B8%93%E6%A0%8F/Spring%20Security%20%E8%AF%A6%E8%A7%A3%E4%B8%8E%E5%AE%9E%E6%93%8D/08%20%20%E7%AE%A1%E9%81%93%E8%BF%87%E6%BB%A4%EF%BC%9A%E5%A6%82%E4%BD%95%E5%9F%BA%E4%BA%8E%20Spring%20Security%20%E8%BF%87%E6%BB%A4%E5%99%A8%E6%89%A9%E5%B1%95%E5%AE%89%E5%85%A8%E6%80%A7%EF%BC%9F.md
- https://www.processon.com/diagraming/6547a0f554338f0b199d353c
- https://springdoc.cn/spring-security/servlet/architecture.html





## 6.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。



![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311301345907.png)