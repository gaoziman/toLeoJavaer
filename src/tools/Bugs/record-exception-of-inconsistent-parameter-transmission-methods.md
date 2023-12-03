---
title: 前后端传参方式
icon: circle-info
order: 7
category:
  - 报错及Bug
tag:
  - 报错及Bug
pageview: false
date: 2023-12-03 19:40:36
comment: false
---
# 记录一次前后端传参方式不一致异常


## 1.前言

大家好，我是Leo哥🫣🫣🫣，最近在写一个前后端分离案例的demo的时候，一个接口中前端向后端传递的参数方式和后端接收的方式不太一致，出现了问题。具体是啥呢，咱们接着往下聊。好了，话不多说让我们开始吧😎😎😎。



## 2.问题引出

具体是这样的，听我慢慢道来。

首先我是先开发完了后端接口，通过Apifox测试之后，再去进行前台Vue脚手架的开发。因为Apifox是接口测试，当时并没有发现什么问题。

首先看一下我的后台注册接口，这里因为前台注册只需要传入用户名和密码，所以是通过param这种方式进行接收，而不是通过@RequestBody + User对象把其JSON对象转换为Java对象的方式。

![image-20231130132952846](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311301329905.png)



反观前端，下面给出我前台user.js中的注册接口，可能我们正常像后端数据，都是按照我这种方式进行传递JSON数据的。

```js
export const registerService = (registerData) => {
    return request.post('/user/register', registerData)
}
```

可以看出来下图，这里其实这个请求并不会发出，而是在前端直接拦截住了

![image-20231130133426032](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311301334068.png)

就是后台是用param来接参数，而你前台则传递的是JSON数据，所以这里是不给通过的。

但是有的朋友的就问：Leo哥，我记得前台可以通过param传递参数啊。

没错是可以的，但那个是get请求，我这里后台注册接口是post请求，所以不太行哈。



## 3.解决方案

没错，其实就是我们今天要介绍的主角-----`URLSearchParams` 。

在Vue的渲染函数中给固定的URL添加参数，你可以使用JavaScript中的URLSearchParams对象来构建查询参数，并将其附加到URL上。

话不多说，直接开干。

![image-20231130134256329](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311301342363.png)

只需要new一个`URLSearchParams`对象，然后把registerData的数据循环添加到参数上，最后传给后台即可。



现在我们再次验证一下我们的接口，进行注册。

![image-20231130134452748](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311301344779.png)

可以看出，我们成功进行了注册。



## 4.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。

![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311301345907.png)