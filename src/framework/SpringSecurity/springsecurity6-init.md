---
title: 初始SpringSecurity
icon: circle-info
order: 1
category:
  - SpringSecurity
tag:
  - SpringSecurity
pageview: false
date: 2023-11-05 23:40:03
comment: false
breadcrumb: false
---


# 初始SpringSecurity



![image-20231030235443828](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310302354916.png)

## 1.前言

大家好，我是Leo哥🫣🫣🫣，今天这个专栏我们一起来学习**SpringSecurity**的系列知识。此次从零开始学习SpringSecurity的概念的和新的写法。带大家SpringSecurity从基础到精通。

好了，话不多说让我们开始吧😎😎😎。



## 2.什么是SpringSecurity

**官网：** [https://spring.io/projects/spring-security](https://spring.io/projects/spring-security)

![1696851995695](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310302325616.png)

**SpringSecurity** 是一个基于 Spring 框架的安全框架，用于在 Java 应用程序中实现身份认证和授权控制。它提供了一套全面的安全服务，可以用于保护 Web 应用程序、RESTful 服务和方法级别的安全性。

Spring Security 的主要功能包括：

1. **身份认证(Authentication)：** 验证用户的身份，并确定用户是否具有访问系统资源的权限。Spring Security 提供了多种身份认证的方式，例如基于表单登录、HTTP 基本认证、OpenID、LDAP、OAuth 等。
2. **授权控制(Authorization)：** 决定用户对系统资源的访问权限。通过配置访问规则和角色权限，Spring Security 可以确保只有具有合法权限的用户能够访问受保护的资源。
3. **攻击防护(Attack Protection)：** Spring Security 针对常见的安全威胁，如跨站点请求伪造（CSRF）、会话固定攻击、点击劫持等，提供了相应的防护机制，帮助开发者减少安全漏洞。
4. **记住我(Remember Me)：** 支持记住用户身份的功能，使用户在下次访问时无需重新登录。
5. **单点登录(Single Sign-On)：** 与其他身份认证和授权系统集成，实现跨系统的单点登录功能。

**SpringSecurity**的核心理念是基于 Filter Chain（过滤器链），通过一系列的过滤器来对请求进行安全处理。开发者可以通过配置和自定义这些过滤器，实现灵活、细粒度的安全控制。

使用 SpringSecurity 可以简化开发过程中的安全性需求，提供了可靠的身份认证和授权机制，帮助开发者构建安全可靠的应用程序。它与 Spring 框架紧密集成，使得安全配置和业务逻辑可以更好地结合在一起。

> 简单来说**SpringSecurity**是Spring家族中的一个 功能强大、可进行`身份验证（认证）`和`访问控制（授权）`的框架，用于实现系统中的`权限管理`。



## 3.什么是登录鉴权

### 3.1什么是鉴权

维基百科是这样说的：

**身份验证**（英语：Authentication）又称“认证”、“鉴权”，是指通过一定的手段，完成对用户[身份 ](https://zh.wikipedia.org/wiki/身份)的确认。

身份验证的目的是确认当前所声称为某种身份的用户，确实是所声称的用户。在日常生活中，身份验证并不罕见；比如，通过检查对方的[证件](https://zh.wikipedia.org/wiki/證件)，我们一般可以确信对方的身份。虽然日常生活中的这种确认对方身份的做法也属于广义的“身份验证”，但“身份验证”一词更多地被用在 [计算机](https://zh.wikipedia.org/wiki/电子计算机)、[通信 ](https://zh.wikipedia.org/wiki/通信)等领域。

### 3.2什么是SpringSecurity的登录鉴权

Spring Security 的登录鉴权是指在用户进行身份认证过程中，验证用户的身份信息，并决定是否允许用户登录系统。

登录鉴权的过程通常包括以下几个步骤：

1. 用户提交登录表单：用户在前端页面输入用户名和密码，并通过表单提交到后端服务器。
2. 身份认证过程开始：Spring Security 会拦截用户的登录请求，并调用相应的身份认证过程。
3. 用户身份验证：Spring Security 根据用户提交的用户名和密码，使用事先配置的 AuthenticationProvider 进行用户身份验证。AuthenticationProvider 是一个接口，可以由开发者自定义实现。
   - 如果用户身份验证成功，即用户名和密码与存储在系统中的用户信息匹配成功，Spring Security 会生成一个表示用户身份的 Authentication 对象。
   - 如果用户身份验证失败，Spring Security 将抛出异常或返回错误信息，提示用户身份验证失败。
4. 登录成功处理：当用户身份认证成功后，Spring Security 会调用配置的登录成功处理器（SuccessHandler），执行登录成功后的操作，比如生成登录凭证、记录登录日志等。
5. 生成登录凭证：登录成功后，Spring Security 会在服务器端生成一个登录凭证（通常是一个加密的令牌），并将该凭证返回给客户端。
6. 建立用户会话：客户端接收到登录凭证后，通常会将该凭证保存在 Cookie、Session 或其他方式中，以便后续的请求能够携带该凭证，标识用户身份。
7. 请求鉴权：在用户登录成功后，用户访问受限资源时，Spring Security 会拦截请求，并进行权限验证（授权）。根据用户的角色和权限信息，决定是否允许用户访问资源。

登录鉴权是保障系统安全性的重要环节，Spring Security 提供了灵活且可配置的身份认证和授权机制，可以根据业务需求进行定制和扩展。通过合理配置和使用 Spring Security 的登录鉴权功能，开发者可以实现安全可靠的用户身份认证和访问控制。



## 4.什么是权限管理

百度百科中的定义：

权限管理，一般指根据系统设置的     `安全规则`或者`安全策略`，用户可以访问而且`只能访问自己被授权的资源`，不多不少。权限管理几乎出现在任何系统里面，只要有用户名和密码的系统。

权限管理包括 `用户认证`和`用户授权` 两部分，简称认证授权。

一般来说，Web应用的安全性包括 `用户认证`和`用户授权`两个部分，这两点也是**SpringSecurity**的主要核心内容。

**SpringSecurity** 的权限管理是指在用户身份认证通过后，对用户进行授权控制，决定用户是否有权访问系统资源、执行某些操作等。

**SpringSecurity** 提供了多种授权的方式，包括基于角色**(Role-based)**、基于权限**(Permission-based)**、基于表达式**(Expression-based)**等，开发者可以根据实际业务需要进行选择和配置。

基于角色的授权**(Role-based Authorization)**是 SpringSecurity 中最常用的一种授权方式。它将用户分配到不同的角色，并将角色与资源进行关联，通过判断用户所属角色来判断用户是否有权限访问资源。比如，一个管理员可以访问所有资源，而一个普通用户只能访问自己的资源。

基于权限的授权**(Permission-based Authorization)**是基于细粒度的操作权限进行授权的一种方式，它将权限与资源进行关联，通过判断用户是否拥有相应的权限来判断用户是否有权限访问资源。

基于表达式的授权**(Expression-based Authorization)**是一种更为灵活的授权方式，它通过表达式的方式对用户的操作进行授权，比如对某个资源的访问需要满足一定的条件才能被授权。

SpringSecurity还支持许多其他的授权方式，例如基于ACL 的授权**(ACL-based Authorization)**、基于 OAuth 的授权**(OAuth-based Authorization)**等，可以满足不同场景下的授权需求。

SpringSecurity的权限管理机制可以与身份认证机制无缝集成，通过简单的配置和编码，就可以实现灵活、细粒度的授权控制。它提供了标准的接口和实现，使开发者能够快速集成和扩展，大大提高了开发效率和系统安全性。

* 用户认证Authentication

  ```markdown
  用户认证，就是验证一个用户是否是合法身份，能否访问该系统的过程。最简单的用户认证方式就是 要求用户输入的用户名和密码，系统通过用户名和密码 来校验用户身份是否合法。常见的认证方式还有 基于生物学特征的身份验证，需要录入指纹、人脸识别等；还有要求通过硬件Key等刷卡的系统，需要刷卡。
  ```

* 用户授权Authorization

  ```markdown
  用户授权，就是控制一个合法用户有权限执行哪些操作，也就是访问控制，控制谁能访问哪些资源。用户在身份认证后，需要分配权限方可访问系统的资源，对于没有权限的资源 用户是不能访问的。如，购物网站 买家登录系统能查询、加购物车、下订单，卖家登录后可以添加商品、修改价格、发货，卖家能做的操作买家是不能操作的，这就是不同的人有不同的权限，做不同的事情。
  ```



> 简单来说：
>
> * 用户认证，就是检查用户能否进入系统。
> * 用户授权，就是用户进入系统后 能操作哪些功能。



## 5.与其他安全框架的对比

在 Java EE 企业级开发中，安全管理框架目前比较常见的有：

* 开发者自定义
  - 即自己开发权限管理。但是一个系统的安全，不仅仅是登录和权限控制这么简单，我们还要考虑种各样可能存在的网络政击以及防彻策略，从这个角度来说，开发者白己实现安全管理也并非是一件容易的事情，只有大公司才有足够的人力物力去支持这件事情。
* Shiro
  * 优点：轻量级安全管理框架(Apache提供)、简单(主张把复杂的事情变简单)、易于集成、可以在JavaSE环境中使用等。
  * 缺点：在微服务时代，Shiro 就显得力不从心了，在微服务面前和扩展方面，无法充分展示自己的优势。
* SpringSecurity
  * 优点：作为spring 家族中的一员，和 Spring家族可以实现无缝整合。同时对 OAuth2 有着良好的支持，再加上Spring Cloud对 Spring Security的不断加持（如推出 Spring Cloud Security )，让 Spring Securiy 不知不觉中成为微服务项目的首选安全管理方案。
  * 缺点：重量级
* Sa-Token
  * 轻量级的Java权限认证框架，主要解决**登录认证**、**权限认证**、**单点登录**、**OAuth2.0**、**分布式Session会话**、**微服务网关鉴权**等一系列权限相关问题。**Sa-Token**使用简单，功能强大，只需一行代码就可以完成会话登录或校验登录状态。Sa-Token更适合于前后台分离架构，支持多种模式和场景的token生成和验证。Sa-Token是一个相对较新的框架，但已经获得了不少关注和好评。

**SpringSecurity**是**Spring**家族中的一个安全管理框架，实际上 在**SpringBoot**出现之后，**SpringSecurity**才真正一飞冲天。SpringBoot对SpringSecurity提供了自动化配置方案，可以使用更少的配置来使用**SpringSecurity**。



## 6.SpringSecurity的历史

Spring Security（原名 Acegi Security）是一个针对基于 Java 的企业应用程序的安全框架。它提供了一套全面的身份认证和授权机制，用于保护应用程序的资源免受未经授权的访问。

- 2003 年，Acegi Security 被创建：Acegi Security 是 Spring Security 的前身，由 Ben Alex 创建。它最初是作为独立的项目开发的，旨在为 Spring 框架提供强大的安全性功能。
- 2004 年，Acegi Security 整合到 Spring 框架：由于 Acegi Security 提供了丰富的安全特性和与 Spring 框架的天然集成能力，因此开发者们决定将 Acegi Security 正式整合到 Spring 框架中，作为官方的安全扩展模块。
- 2006 年，Acegi Security 更名为 Spring Security：为了与 Spring 框架更好地融合并强调其作为 Spring 官方安全模块的身份，Acegi Security 在版本2.0发布之前更名为 Spring Security。
- 2008 年，Spring Security 2.0 发布：Spring Security 2.0 版本引入了一些重要的功能和改进，包括对基于表达式的访问控制、OpenID 支持以及与其他安全框架集成的能力。
- 2010 年，Spring Security 3.0 发布：Spring Security 3.0 版本引入了一系列重大的变化和改进。它支持了多种认证提供者、多种认证方式（如基于用户名密码、LDAP、OpenID 等）、注解驱动的安全配置等。
- 2013 年，Spring Security 3.2 发布：Spring Security 3.2 版本进一步增强了对 OAuth 和 RESTful Web Service 的支持。它还引入了一些新的特性，如跨站点请求伪造（CSRF）防护、HTTP 基本认证支持等。
- 2015 年，Spring Security 4.0 发布：Spring Security 4.0 版本带来了对 Java 8 的全面支持，并引入了新的配置方式和 API。此外，它还改进了对 CSRF 防护、OAuth2、WebSockets 等方面的支持。
- 2020 年，Spring Security 5.0 发布：Spring Security 5.0 版本提供了对 JDK 9、Java EE 8、Spring Framework 5.x 的支持。它还引入了许多新功能，例如对 OAuth 2.0 的改进、JWT（JSON Web Token）支持、WebFlux 支持等。
- 迄今为止，Spring Security 持续发展并不断更新迭代。它成为了 Java 生态系统中最流行和广泛使用的安全框架之一，被众多企业和开发者所信赖和采用。

**SpringSecurity** 作为一个成熟且功能强大的安全框架，在Java企业应用程序中广泛应用，为应用程序提供了可靠的安全保护。



## 7.参考文献

- https://zh.wikipedia.org/wiki/%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81
- https://baike.baidu.com/item/%E9%89%B4%E6%9D%83/10857773
- https://www.hyhblog.cn/2018/04/25/user_login_auth_terms/



## 8.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。
