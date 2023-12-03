---
title: 什么是JWT
icon: circle-info
order: 2
category:
  - Knowledge
tag:
  - Knowledge
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---


## 1. 什么是JWT 



JWT （JSON Web Token） 是目前最流行的跨域认证解决方案，是一种基于 Token 的认证授权机制。 从 JWT 的全称可以看出，JWT 本身也是 Token，一种规范化之后的 JSON 结构的 Token。

Token 自身包含了身份验证所需要的所有信息，因此，我们的服务器不需要存储 Session 信息。这显然增加了系统的可用性和伸缩性，大大减轻了服务端的压力。

可以看出，**JWT 更符合设计 RESTful API 时的「Stateless（无状态）」原则** 。

并且， 使用 Token 认证可以有效避免 CSRF 攻击，因为 Token 一般是存在在 localStorage 中，使用 JWT 进行身份验证的过程中是不会涉及到 Cookie 的。

下面是 FC 7519 对 JWT 做的较为正式的定义。

> JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted. ——JSON Web Token (JWT)

> JSON Web Token (JWT) 是一种紧凑、URL 安全的方式，用于表示要在两方之间传输的声明。 JWT 中的声明被编码为 JSON 对象，该对象用作 JSON Web 签名 (JWS) 结构的有效负载或 JSON Web 加密 (JWE) 结构的明文，从而使声明能够进行数字签名或完整性保护使用消息验证代码 (MAC) 和/或加密。 ——JSON网络令牌（JWT）



## 2. JWT由哪些部分组成 

JWT 本质上就是一组字串，通过（.）切分成三个为 Base64 编码的部分：

- **Header** : 描述 JWT 的元数据，定义了生成签名的算法以及 Token 的类型。
- **Payload** : 用来存放实际需要传递的数据
- **Signature（签名）** ：服务器通过 Payload、Header 和一个密钥(Secret)使用 Header 里面指定的签名算法（默认是 HMAC SHA256）生成。

JWT 通常是这样的：aaaa.bbbb.cccc。

![img](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308072037189.png)



你可以在 [jwt.io](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308072039099.png) 这个网站上对其 JWT 进行解码，解码之后得到的就是 Header、Payload、Signature 这三部分。

![image-20230807203955978](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308072039099.png)

Header 和 Payload 都是 JSON 格式的数据，Signature 由 Payload、Header 和 Secret(密钥)通过特定的计算公式和加密算法得到。

接下来，具体看一下每一部分

Header header典型的由两部分组成：token的类型（“JWT”）和算法名称（比如：HMAC SHA256或者RSA等等）。

```json
{
    'alg': "HS256",
    'typ': "JWT"
}
```

然后，用Base64对这个JSON编码就得到JWT的第一部分

- Payload JWT的第二部分是payload，它包含声明（要求）。声明是关于实体(通常是用户)和其他数据的声明。声明有三种类型: registered, public 和 private。

- - Registered claims : 这里有一组预定义的声明，它们不是强制的，但是推荐。比如：iss (issuer), exp (expiration time), sub (subject), aud (audience)等。
  - Public claims : 可以随意定义。
  - Private claims : 用于在同意使用它们的各方之间共享信息，并且不是注册的或公开的声明。 下面是一个例子：

~~~json
{
    "sub": '1234567890',
    "name": 'Leo',
    "admin":true
}
~~~

对**payload**进行**Base64**编码就得到JWT的第二部分

注意，不要在JWT的payload或header中放置敏感信息，除非它们是加密的。

**Signature**

> 为了得到签名部分，你必须有编码过的header、编码过的payload、一个秘钥，签名算法是header中指定的那个，然对它们签名即可。

> HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)

签名是用于验证消息在传递过程中有没有被更改，并且，对于使用私钥签名的token，它还可以验证JWT的发送方是否为它所称的发送方。

看一张官网的图就明白了：

![image-20230807204120279](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308072041358.png)



## 3. JSON Web Tokens是如何工作的

在认证的时候，当用户用他们的凭证成功登录以后，一个JSON Web Token将会被返回。此后，token就是用户凭证了，你必须非常小心以防止出现安全问题。一般而言，你保存令牌的时候不应该超过你所需要它的时间。

无论何时用户想要访问受保护的路由或者资源的时候，用户代理（通常是浏览器）都应该带上JWT，典型的，通常放在Authorization header中，用Bearer schema。

header应该看起来是这样的：

> `Authorization: Bearer`

服务器上的受保护的路由将会检查Authorization header中的JWT是否有效，如果有效，则用户可以访问受保护的资源。如果JWT包含足够多的必需的数据，那么就可以减少对某些操作的数据库查询的需要，尽管可能并不总是如此。

如果`token`是在授权头（**Authorization header**）中发送的，那么跨源资源共享(CORS)将不会成为问题，因为它不使用cookie。



## 4. 如何基于 JWT 进行身份验证

> 在基于 Token 进行身份验证的的应用程序中，服务器通过 Payload、Header 和 Secret(密钥)创建Token（令牌）并将 Token 发送给客户端。客户端接收到 Token 之后，会将其保存在 Cookie 或者 localStorage 里面，以后客户端发出的所有请求都会携带这个令牌。

![image-20230807204534879](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308072045950.png)



简化后的步骤如下：

1. 用户向服务器发送用户名、密码以及验证码用于登陆系统。
2. 如果用户用户名、密码以及验证码校验正确的话，服务端会返回已经签名的 Token。
3. 用户以后每次向后端发请求都在 Header 中带上这个 Token。
4. 服务端检查 Token 并从中获取用户相关信息。

两点建议：

1. 建议将 Token 存放在 localStorage 中，放在 Cookie 中会有 CSRF 风险。
2. 请求服务端并携带 Token 的常见做法是将 Token 放在 HTTP Header 的 Authorization 字段中（Authorization: Bearer Token）。



## 5. 如何防止 JWT 被篡改的

> 有了签名之后，即使 Token 被泄露或者解惑，黑客也没办法同时篡改 Signature 、Header 、Payload。

这是为什么呢？因为服务端拿到 Token 之后，会解析出其中包含的 **Header**、**Payload** 以及 **Signature** 。服务端会根据 Header、Payload、密钥再次生成一个 Signature。拿新生成的 **Signature** 和 **Token** 中的 **Signature** 作对比，如果一样就说明 Header 和 Payload 没有被修改。

不过，如果服务端的秘钥也被泄露的话，黑客就可以同时篡改 Signature 、Header 、Payload 了。黑客直接修改了 Header 和 Payload 之后，再重新生成一个 Signature 就可以了。

**密钥一定保管好，一定不要泄露出去。JWT 安全的核心在于签名，签名安全的核心在密钥。**


![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)