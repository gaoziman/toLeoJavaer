---
title: Java连接SqlServer错误
icon: circle-info
order: 1
category:
  - 报错及Bug
tag:
  - 报错及Bug
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---



> 最近公司换了新项目，这边也是进入了新一轮的开发，当项目经理把需求发给我之后我开始了需求的分析和coding。不一会我便开始拉去代码在本地开始跑程序。

## 问题发现

**这次使用的是SqlServer数据库，之前并没有使用过，但是问题不大，我按照需求文档的步骤连接好SqlServer之后，启动SpringBoot项目，发现了一个报错，如下：**

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/default.jpg)

刚开始我以为是SqlServer连接问题呢，于是便去查看数据库，发现数据库一切正常，我首先第一时间问了我的同事，他们是否有这样的问题，发现他们并没有，于是我便开始了我最拿手的环节，面向百度编程。

## 开始解决

具体报错信息是这样，于是我便开始了百度

~~~java
报错：ERROR c.a.d.p.DruidDataSource$CreateConnectionThread [Druid-ConnectionPool-Create-1218864105] create connection SQLException, url:jdbc:sqlserver://47.114.91.217:1433;DatabaseName=PileTestingSystem, errorCode 0, state 08S01
~~~

`首先我进行了中文翻译`

> 中文翻译错误：c.a.d.p.DruidDataSource$CreateConnectionThread[Druid-ConnectionPool-Create-1218864105]创建连接SQLException，url:jdbc:sqlserver://47.114.91.217:1433;DatabaseName=PileTestingSystem，错误代码0，状态08S01
> com.microsoft.sqlserver.jdbc.SQLServerException:驱动程序无法使用安全套接字层（SSL）加密建立到SQL Server的安全连接。错误：“客户端首选项[TLS12]不接受服务器选择的协议版本TLS10”。客户连接ID:c8434f3c-5f82-4cf2-b111-099e140f33d0
> 在com.microsoft.sqlserver.jdbc.SQLServerConnection.terminate（SQLServerConnection.java:2670）~[mssql-jdbc-6.4.0.jre8.jar:？]

**这个错误主要就是驱动程序无法使用安全套（SSL）加密建立到SQL Server的安全连接**

## 解决方法

**最终在我的查询下，找到了两种解决方法，现在提供给大家**

### 方法一

如果使用的是jdk1.8的话，先要找到自己安装JDK目录下的**java.security**文件并进行修改，
本人目录如下：**D:\jdk\jre\lib\security**下就会有这个**java.security**文件
具体的修改情况如下 ：

打开文件后，注释掉这三行代码（也就是在这三行代码之前加 # ）：

~~~java
jdk.tls.disabledAlgorithms=SSLv3, TLSv1, TLSv1.1, RC4, DES, MD5withRSA,
DH keySize < 1024, EC keySize < 224, 3DES_EDE_CBC，anon, NULL,
include jdk.disabled.namedCurves
~~~

然后重新启动项目，建立SQL Server的安全套连接就没有问题了。
**图片如下：**
**没修改之前的java.security文件：**

![image-20230330104645835](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230330104645835.png)

**修改之后的java.security文件：**

![image-20230330104728125](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230330104728125.png)

### 方法二

打开文件后，找到这三行代码：

~~~java
jdk.tls.disabledAlgorithms=SSLv3, TLSv1, TLSv1.1, RC4, DES, MD5withRSA,
DH keySize < 1024, EC keySize < 224, 3DES_EDE_CBC，anon, NULL,
include jdk.disabled.namedCurves
~~~

然后去掉：其中的3DES_EDE_CBC,字符。（图片如下）
然后重新启动项目，建立SQL Server的安全套连接就没有问题了。
**没修改之前的java.security文件：**

![image-20230330104807347](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230330104807347.png)

**修改之后的java.security文件：**

![image-20230330104824800](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230330104824800.png)

**到这里问题就解决了，这里想告诉大家，遇到之前没有碰到过的新问题，不要慌，先追溯本源，看看到底是哪里出错了，思路一定要清晰，实在没有头绪的话可以百度，利用好搜索引擎，你一定可以的!!!**


![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)