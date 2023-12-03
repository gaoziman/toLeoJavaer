---
title: 筛选器代理和过滤器链代理
icon: circle-info
order: 4
category:
  - SpringSecurity
tag:
  - SpringSecurity
pageview: false
date: 2023-11-15 23:40:03
comment: false
breadcrumb: false
---


## 1.前言

大家好，我是Leo哥🫣🫣🫣，上一节我们简单回顾了一下关于Servlet原生过滤器以及简单认识了SpringSecurity中的一些过滤器。但是底层SpringSecurity是如何维护这些过滤器，并通过这些过滤器是如果拦截我们的客户端请求的，我们都还只是停留在表层，今天就让我们去深入了解一下我们今天得主角---**委派筛选器代理 DelegatingFilterProxy**。好了，话不多说让我们开始吧😎😎😎。



## 2.剖析DelegatingFilterProxy

### 2.1DelegatingFilterProxy概述

Spring 提供了一个名为 [`DelegatingFilterProxy`](https://docs.spring.io/spring-framework/docs/6.1.0-M2/javadoc-api/org/springframework/web/filter/DelegatingFilterProxy.html) 的 `Filter` 实现，允许在 Servlet 容器的生命周期和 Spring 的 `ApplicationContext` 之间建立桥梁。Servlet容器允许通过使用自己的标准来注册 `Filter` 实例，但它不知道 Spring 定义的 Bean。你可以通过标准的Servlet容器机制来注册 `DelegatingFilterProxy`，但将所有工作委托给实现 `Filter` 的**SpringBean**。

![image-20231107195435608](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311071954680.png)



简单来说，**DelegatingFilterProxy**就是一个对于`servlet filter`的代理，用这个类的好处主要是通过Spring容器来管理servlet filter的生命周期，

- 还有就是如果filter中需要一些Spring容器的实例，可以通过spring直接注入，
- 另外读取一些配置文件这些便利的操作都可以通过Spring来配置实现。

> 本质上来说DelegatingFilterProxy就是一个Filter，其间接实现了Filter接口，但是 **在doFilter中其实调用的从Spring 容器中获取到的代理Filter的实现类delegate。**



### 2.类的结构

先看下 `DelegatingFilterProxy` 类的继承链

![image-20231107200106838](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311072001930.png)



通过类图，可以看到 `DelegatingFilterProxy` 继承了 `Filter` 接口，最终生成了一个过滤器。





### 3.类的属性

我们通过IDEA打开我们之前的项目，双击**Shift键**，去查找他的源码，我们来简单看一下他的源码。

![image-20231107200323099](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311072003308.png)



根据上面代码，看到了熟悉的 `targetBeanName` 和 `targetFilterLifecycle` 参数。看到这些参数，不知道大家有没有想到之前我们最开始学习`JavaWeb`的时候，最初始配置的过滤器，就是在一个web.xml文件中进行双标签配置，为了让大家更清楚的明白，我们下面写一个简单的xml配置。

```xml
    <filter>
        <filter-name>springSecurityFilterChain</filter-name>
        <filter-class>
            org.springframework.web.filter.DelegatingFilterProxy
        </filter-class>
        <init-param>
            <param-name>targetBeanName</param-name>
            <param-value>springSecurityFilterChain</param-value>
        </init-param>
        <init-param>
            <param-name>targetFilterLifecycle</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>

```

简单讲下这些参数的作用：

- **targetBeanName: 字符串**

`targetBeanName` 参数是在 `DelegatingFilterProxy` 的构造函数中使用的一个字符串参数。它用于指定要代理的目标过滤器的 bean 名称。

当 `DelegatingFilterProxy` 接收到请求时，它将查找 Spring 容器中与 `targetBeanName` 参数匹配的目标过滤器的 bean。然后，`DelegatingFilterProxy` 将委托实际的过滤工作给找到的目标过滤器实例。

通过使用 `targetBeanName` 参数，你可以指定要使用的目标过滤器的 bean 名称，而不需要直接引用目标过滤器的类或实例。

在`示例二`中，我们将 `DelegatingFilterProxy` 配置为过滤器，并通过 `<init-param>` 元素指定了 `targetBeanName` 参数的值为 `springSecurityFilterChain`。这意味着 `DelegatingFilterProxy` 将在 Spring 容器中查找名为 `springSecurityFilterChain` 的目标过滤器的 bean，并将实际的过滤工作委托给它。

请注意，`springSecurityFilterChain` 应该替换为实际的目标过滤器的 bean 名称。该名称必须与 Spring 容器中定义的目标过滤器的 bean 名称匹配。

- **targetFilterLifecycle: 布尔**

`targetFilterLifecycle` 参数是在 `DelegatingFilterProxy` 的构造函数中使用的一个布尔值参数。它用于指定是否由 `DelegatingFilterProxy` 负责管理目标过滤器的生命周期。

如果将 `targetFilterLifecycle` 参数设置为 `true`，则 `DelegatingFilterProxy` 将负责调用目标过滤器的 `init()` 和 `destroy()` 方法。这意味着 `DelegatingFilterProxy` 将在容器启动时自动调用目标过滤器的 `init()` 方法，并在容器关闭时调用目标过滤器的 `destroy()` 方法。

如果将 `targetFilterLifecycle` 参数设置为 `false`，则 `DelegatingFilterProxy` 将不会管理目标过滤器的生命周期。这意味着你需要手动调用目标过滤器的 `init()` 和 `destroy()` 方法，确保它们在适当的时候被调用。

默认情况下，`targetFilterLifecycle` 参数被设置为 `false`，即 `DelegatingFilterProxy` 不会管理目标过滤器的生命周期。如果你希望 `DelegatingFilterProxy` 管理目标过滤器的生命周期，你可以将 `targetFilterLifecycle` 参数设置为 `true`。

在上面的代码示例中，通过配置将 `targetFilterLifecycle` 设置为 `true`，以便让 `DelegatingFilterProxy` 管理目标过滤器的生命周期。





## 3.DelegatingFilterProxy原理

**DelegatingFilterProxy** 作为一个过滤器，过滤器的基本声明周期当然不会少。标准过滤器函数三大件：`init`, `doFilter`, `destroy`，这三个函数也是我们最关心的函数，至于 `DelegatingFilterProxy` 的奥秘也是通过这几个函数体现出来，当然最重要的还是 `init`, `doFilter`。下面我们就通过源码的方式一一去查看**DelegatingFilterProxy**他的生命周期。

### 3.1init

`init` 函数定义在 `DelegatingFilterProxy` 所继承的抽象类 `GenericFilterBean` 中。

```java
@Override
public final void init(FilterConfig filterConfig) throws ServletException {
        Assert.notNull(filterConfig, "FilterConfig must not be null");

        this.filterConfig = filterConfig;

        // Set bean properties from init parameters.
        PropertyValues pvs = new FilterConfigPropertyValues(filterConfig, this.requiredProperties);
        if (!pvs.isEmpty()) {
                try {
                        BeanWrapper bw = PropertyAccessorFactory.forBeanPropertyAccess(this);
                        ResourceLoader resourceLoader = new ServletContextResourceLoader(filterConfig.getServletContext());
                        Environment env = this.environment;
                        if (env == null) {
                                env = new StandardServletEnvironment();
                        }
                        bw.registerCustomEditor(Resource.class, new ResourceEditor(resourceLoader, env));
                        initBeanWrapper(bw);
                        bw.setPropertyValues(pvs, true);
                }
                catch (BeansException ex) {
                        String msg = "Failed to set bean properties on filter '" +
                                        filterConfig.getFilterName() + "': " + ex.getMessage();
                        logger.error(msg, ex);
                        throw new ServletException(msg, ex);
                }
        }

        // Let subclasses do whatever initialization they like.
        // 重点关注：🔥🔥🔥🔥🔥🔥
        initFilterBean();

        if (logger.isDebugEnabled()) {
                logger.debug("Filter '" + filterConfig.getFilterName() + "' configured for use");
        }
}

```

![image-20231107202119949](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311072021210.png)



接着看下 `initFilterBean` 的实现，此函数实现定义为 `DelegatingFilterProxy` 中。

![image-20231107202444609](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311072024737.png)



可以看到在`DelegatingFilterProxy`我们找到了关于initFilterBean的实现，我们来简单解读一下。

1. `synchronized (this.delegateMonitor)`：使用`synchronized`关键字对`delegateMonitor`进行同步，以确保在多线程环境下只有一个线程可以进入临界区。这样做是为了避免多个线程同时执行初始化操作而导致的竞态条件和数据不一致问题。
2. `if (this.delegate == null)`：检查`delegate`对象是否已经被初始化，如果没有，则继续执行初始化操作。
3. `if (this.targetBeanName == null)`：如果没有指定目标bean的名称，就使用过滤器的名称作为目标bean的名称。
4. `this.targetBeanName = getFilterName()`：通过`getFilterName()`方法获取过滤器的名称，并将其作为目标bean的名称。
5. `WebApplicationContext wac = findWebApplicationContext()`：调用`findWebApplicationContext()`方法来查找并获取Spring根应用程序上下文。这个上下文是用来获取bean实例的，因此在初始化`delegate`之前需要先获取它。
6. `if (wac != null) { this.delegate = initDelegate(wac); }`：如果找到了Spring根应用程序上下文，则调用`initDelegate`方法对`delegate`进行初始化。这个`initDelegate`方法可能会根据具体需求做一些初始化工作，比如创建并配置`delegate`对象。

总的来说，这段代码的作用是在过滤器初始化时，尽早地初始化`delegate`对象。通过同步机制和延迟初始化策略，确保在多线程环境下安全地进行初始化操作，并尽可能地提前准备好`delegate`对象以供后续使用。

那么如何尽早的初始化delegate对象呢，这个`initDelegate`方法又做了什么呢，我们接着往下解读。

![image-20231107202928322](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311072029421.png)

1. `String targetBeanName = getTargetBeanName();`：通过`getTargetBeanName`方法获取目标bean的名称，这个名称在之前的初始化过程中已经确定。
2. `Assert.state(targetBeanName != null, "No target bean name set");`：使用断言确保目标bean的名称不为空，如果为空则抛出异常。这样可以在代码中明确地表达出对目标bean名称的依赖性，以避免潜在的空指针异常。
3. `Filter delegate = wac.getBean(targetBeanName, Filter.class);`：通过Spring的应用程序上下文（`wac`）根据目标bean的名称获取对应的`Filter`实例。这里利用了Spring的IoC容器来管理和获取`Filter`实例。
4. `if (isTargetFilterLifecycle()) { delegate.init(getFilterConfig()); }`：如果目标`Filter`需要进行生命周期初始化（例如调用`init`方法），则调用`delegate`的`init`方法并传入过滤器的配置信息。这是为了确保目标`Filter`在需要时能够正确地进行初始化工作。
5. `return delegate;`：返回初始化后的`delegate`对象，该对象已经准备好被使用了。

总的来说，这个`initDelegate`方法的主要作用是根据目标bean的名称从Spring的应用程序上下文中获取对应的`Filter`实例，并根据需要进行生命周期的初始化工作。这样就能够在`initFilterBean`方法中及时地准备好`delegate`对象，以供后续的过滤器处理流程使用。

**这一下就非常清晰了。**



### 3.2dofilter

`doFilter` 函数实现定义为 `DelegatingFilterProxy` 中，我们直接看源码。

![image-20231107203046568](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311072030745.png)

**我们进行解读：**

1. `Filter delegateToUse = this.delegate;`：首先将当前已初始化的`delegate`对象赋给`delegateToUse`，这里使用了委托模式，即通过`delegateToUse`来执行具体的过滤器操作。
2. `if (delegateToUse == null) { ... }`：检查`delegateToUse`是否为null，如果为null则表示`delegate`对象尚未初始化，需要进行延迟初始化。
3. `synchronized (this.delegateMonitor) { ... }`：使用`synchronized`关键字对`delegateMonitor`进行同步，以确保在多线程环境下只有一个线程可以进入临界区。这样做是为了避免多个线程同时执行初始化操作而导致的竞态条件和数据不一致问题。
4. `delegateToUse = this.delegate;`：再次将当前已初始化的`delegate`对象赋给`delegateToUse`，因为在同步块外部可能已经有其他线程初始化了`delegate`对象。
5. `if (delegateToUse == null) { ... }`：再次检查`delegateToUse`是否为null，因为在同步块外部可能已经有其他线程初始化了`delegate`对象。
6. `WebApplicationContext wac = findWebApplicationContext();`：查找并获取Spring根应用程序上下文。如果没有找到上下文，则抛出异常，这是为了确保能够获取到必要的上下文信息用于后续的初始化操作。
7. `delegateToUse = initDelegate(wac);`：调用`initDelegate`方法对`delegateToUse`进行初始化。这里利用了之前定义的`initDelegate`方法来完成初始化工作。
8. `this.delegate = delegateToUse;`：将初始化后的`delegateToUse`对象赋给`delegate`，以便在以后的处理中可以直接使用已经初始化好的`delegate`对象。
9. `invokeDelegate(delegateToUse, request, response, filterChain);`：调用`invokeDelegate`方法，让已经准备好的`delegateToUse`对象执行实际的过滤操作。这样就实现了通过代理对象来执行具体过滤器的功能。



### 3.3destroy

`destroy` 函数实现定义为 `DelegatingFilterProxy` 中。

![image-20231107203459005](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311072034107.png)



**这里就没什么好说的了**，`DelegatingFilterProxy`在这里就像一个甩锅的大爷，根本不需要他去干活，他直接就把其交给委托过滤器来做了。



## 4.DelegatingFilterProxy作用

上面我们已经了解了关于DelegatingFilterProxy流程，以及简单看了一下他的源码。这里我们来简单总结一下。

**作用：** 实现把`Servlet`容器中的`Filter` 同Spring 容器中的 bean 关联起。是Servlet容器和Spring 的 `ApplicationContext` 之间的桥梁。

1. **委托管理**：DelegatingFilterProxy允许将对Servlet规范中的`Filter`接口的调用委托给Spring应用程序上下文中的一个或多个过滤器Bean。这些过滤器Bean可以由Spring的IoC容器进行管理，并且可以利用Spring的依赖注入等特性来进行配置和定制。
2. **集成Spring特性**：通过DelegatingFilterProxy，可以将Spring的AOP、事务管理等特性集成到Servlet规范的过滤器中。这样能够更好地利用Spring框架的各种功能来处理Web应用程序中的过滤逻辑。
3. **延迟初始化**：DelegatingFilterProxy支持延迟初始化和懒加载，它可以在需要时动态地将请求委托给具体的过滤器Bean，而不需要预先在web.xml中配置具体的过滤器类。这样可以避免在应用启动时立即创建所有过滤器实例，从而提高了系统的性能和资源利用率。
4. **安全性**：DelegatingFilterProxy可以被配置为要求认证的请求使用安全通道，从而提供一定程度的安全保障。

原生的Filter运行在Servlet容器里边也就是Tomcat服务器当中，而Spring的所书写的过滤器属于Spring工厂。Spring工厂中的过滤器是没有办法拦截Http请求并进行干预的，但是原生Filter就可以做到直接拦截Http请求并进行干预，就比如DelegatingFilterProxy，所以借助它，Spring当中的Filter就可以过滤和干预Http请求了。



## 5.FilterChainProxy

### 5.1FilterChainProxy概述

在上面的源码环节中，我们已经简单的认识到了`FilterChainProxy`就是一个过滤器链代理。那具体什么是FilterChainProxy呢？

1. **统一的安全过滤器链管理**：
   - FilterChainProxy负责统一管理多个SecurityFilterChain，每个SecurityFilterChain都代表一组安全过滤器，用于处理特定模式的请求。这样可以在一个应用中同时支持多个安全策略，或者针对不同的URL模式使用不同的安全过滤器链。
2. **根据请求匹配合适的安全过滤器链**：
   - 当收到一个HTTP请求时，FilterChainProxy会根据请求的URL和其他条件来选择合适的SecurityFilterChain，然后按照SecurityFilterChain中定义的顺序执行其中的安全过滤器。这样可以确保请求能够得到正确的安全处理。
3. **灵活的安全策略配置**：
   - FilterChainProxy允许开发人员通过配置来定义多个SecurityFilterChain，以适应不同的安全需求。这种灵活性使得可以针对不同的URL模式或特定的安全需求定制化安全过滤器链。
4. **核心的安全过滤器调度器**：
   - 在Spring Security框架中，FilterChainProxy可以看作是核心的安全过滤器调度器，它负责将请求交给正确的安全过滤器链进行处理，从而实现认证、授权、会话管理等安全操作。

下面给出Spring官方给出的解释：

> Spring Security 的 Servlet 支持包含在 `FilterChainProxy` 中。`FilterChainProxy` 是 SpringSecurity 提供的一个特殊的 `Filter`，允许通过 [`SecurityFilterChain`](https://springdoc.cn/spring-security/servlet/architecture.html#servlet-securityfilterchain) 委托给许多 `Filter` 实例。由于 `FilterChainProxy` 是一个Bean，它通常被包裹在 [DelegatingFilterProxy](https://springdoc.cn/spring-security/servlet/architecture.html#servlet-delegatingfilterproxy) 中。

我们通过一张图来更清晰地认识他吧。

![image-20231107204747766](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311072047866.png)





### 5.2FilterChainProxy的作用

`SecurityFilterChain` 中的 [Security Filter](https://springdoc.cn/spring-security/servlet/architecture.html#servlet-security-filters) 通常是Bean，但它们是用 `FilterChainProxy` 而不是 [DelegatingFilterProxy](https://springdoc.cn/spring-security/servlet/architecture.html#servlet-delegatingfilterproxy) 注册的。与直接向Servlet容器或 [DelegatingFilterProxy](https://springdoc.cn/spring-security/servlet/architecture.html#servlet-delegatingfilterproxy) 注册相比，`FilterChainProxy` 有很多优势。首先，它为 Spring Security 的所有 Servlet 支持提供了一个起点。由于这个原因，如果你试图对 Spring Security 的 Servlet 支持进行故障诊断，在 `FilterChainProxy` 中添加一个调试点是一个很好的开始。

其次，由于 `FilterChainProxy` 是 Spring Security 使用的核心，它可以执行一些不被视为可有可无的任务。 例如，它清除了 `SecurityContext` 以避免内存泄漏。它还应用Spring Security的 [`HttpFirewall`](https://springdoc.cn/spring-security/servlet/exploits/firewall.html#servlet-httpfirewall) 来保护应用程序免受某些类型的攻击。

此外，它在确定何时应该调用 `SecurityFilterChain` 方面提供了更大的灵活性。在Servlet容器中，`Filter` 实例仅基于URL被调用。 然而，`FilterChainProxy` 可以通过使用 `RequestMatcher` 接口，根据 `HttpServletRequest` 中的任何内容确定调用。

最主要的就是把请求传递给一个或者多个SecurityFilterChain示例进行认证或授权，并且能够需要时进行重定向和返回错误信息。

我们基于上面的图，来分析一下，一个客户端请求到Servlet中，其中到底是如何经过层层过滤器的。

首先客户端发起一个Http请求，这个请求会经过原生过滤器`Filter-1`，此时我们的`FilterChain`会通过**doFilter()**方法进行放心。之后这个请求会通过`Filter-1`传递到第二个原生过滤器，也就是我们的`DelegatingFilterProxy`。此时会搭建一个前往Spring工厂中的桥梁，但是我们并不能直接去通过这个桥梁访问我们的`SecurityFilterChain`，而是还需要通过桥梁中的另一个过滤器，也就是我们的过滤器链代理`FilterChainProxy`，他会将我们的请求重定向到SecurityFilterChain中。然后回基于匹配的规则，一个一个去执行Filter。执行完之后，会进行返回，原路返回到我们的FilterChainProxy这个过滤器链代理中。于是由原生过滤器接着向下面过滤器继续请求，如果下面没有过滤器了，则直接到Web资源了。



## 6.SecurityFilterChain概述 

 SecurityFilter 并不是直接放在 Web 项目的原生 `FilterChain` 中，而是通过一个`FlterChainProxy`来统管理

 `FilterChainProxy`把 `SecurityFilterChain` 嵌入到 Web项目的原生过滤器链中DelegatingFilterProxy 把 `FilterChainProxy` 整合到原生的过滤器链中

 `FilterChainProxy` 是**顶层管理者**，统一管理 SecurityFilter和 `SecurityFllterChain`过涉器链。

当请求到达 `FilterChainProxy` 时，会根据当前请求匹配`SecurityFilterChain`，然后将请求依次转发给 `SecurityFilterChain` 中的 SecurityFilter中。



## 6.参考文献

- https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/filter/DelegatingFilterProxy.html
- https://springdoc.cn/spring-security/servlet/architecture.html



## 7.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。


![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311301345907.png)