---
title: YAMLException异常
icon: circle-info
order: 6
category:
  - 报错及Bug
tag:
  - 报错及Bug
pageview: false
date: 2023-12-03 19:40:36
comment: false
---
# 记录一次YAMLException异常



## 1.前言

大家好，我是Leo哥🫣🫣🫣，最近在学习SpringBoot3以及写一个关于SpringBoot3整合短信登录的案例，当我项目创建之后，做好配置文件管理并启动项目之后，控制台给了我重重一击。具体是啥呢，咱们接着往下聊。好了，话不多说让我们开始吧😎😎😎。

## 2.报错引出

没错，当我启动项目的时候，控制台给我报了一个这么的错误。

> → : java.nio.charset.MalformedInputException: Input length = 1



![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311292227217.png)

咱就是说，咱也没见过，不过问题不大，我们先看看他是什么意思，打开我们的百度翻译。

![image-20231129223618244](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311292236322.png)



## 3.报错解决

这一看，好像也看不出来什么问题啊，于是咱还是妥协，直接问度娘，经过俺的一番查找，最终将问题定位在是由于IDEA配置文件的**编码格式**导致的问题。

一看到这，那不就好办了，这编码格式还不简单嘛，只需要调节为UTF-8即可，于是说干就干。

![image-20231129223911354](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311292239407.png)



就这样 完工。

然后我们再次启动我们的项目。

![image-20231129224046431](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311292240476.png)



好了，大功告成，项目可以正常启动了。今天的分享就到这里哈，关于SpringBoot整合手机短信，我会单独出一期发出来，敬请期待!!!



## 4.其他问题

如果以上我的解决方式没办法解决还是报同样的错，那么在pom中加入如下配置

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
    <java.version>17</java.version>
</properties>

```

#### 重新配置yml文件

有两个解决思路:

1. 将yml配置文件中的中文注释全部删除
   但是本来是需要注释才能对各类配置做特定解释,所以不建议
2. 新建一个配置文件为UTF-8的文件,将原有配置使用txt文件夹打开,再重新复制到新的yml配置文件中
3. 如果团队的就复制其他小伙伴的，或者是以前正常运行项目的文件

## 5.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。

![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311292232918.png)