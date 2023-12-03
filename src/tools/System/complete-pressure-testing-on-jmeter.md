---
title: 基于jmeter完成压测
icon: circle-info
order: 7
category:
  - 工具
tag:
  - 工具
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---



## 前言

`jmeter`算是我们日常比较常用的压测工具，这篇文章笔者就介绍一下基于`win10`完成`jmeter`的安装及使用。

## 安装

### 下载

首先我们必须到达官网下载对应的安装包。

[https://archive.apache.org/dist/jmeter/binaries/(opens new window)](https://archive.apache.org/dist/jmeter/binaries/)

注意下载的时候必须下载`Binaries`类型而非源码类型，否则启动时可能会抛出`Unable to access jarfile ApacheJMeter`，如下图所示，笔者本次下载的就是`5.1`版本。

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053945.png)

### 配置环境变量

完成下载后，我们可以将`jmeter`存放到自己喜欢的目录然后设置环境变量。首先添加一个环境变量`JMETER_HOME`，值为`jmeter`的存放路径

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053630.png)

然后在环境变量`path`添加一条`%JMETER_HOME%\bin`

### 启动测试

配置完成环境变量后，我们就可以启动测试可用性了，我们打开`cmd`控制台输入`jmeter`，如下所示，如果输出这样一段文字并且启动的`jmeter`的图形界面则说明安装成功了。

```java
C:\Users\shark-Gao>jmeter
================================================================================
Don't use GUI mode for load testing !, only for Test creation and Test debugging.
For load testing, use CLI Mode (was NON GUI):
   jmeter -n -t [jmx file] -l [results file] -e -o [Path to web report folder]
& increase Java Heap to meet your test requirements:
   Modify current env variable HEAP="-Xms1g -Xmx1g -XX:MaxMetaspaceSize=256m" in the jmeter batch file
Check : https://jmeter.apache.org/usermanual/best-practices.html
================================================================================
```

### 调整为中文

我们进入`apache-jmeter-5.1\bin`找到文件`jmeter.properties`，如下图，找到`language`改为`zh_CN`，下次启动直接生效。

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053666.png)

## 压测

### 创建线程组

要进行压测，我们首先需要创建一个线程组。如下图所示:

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053723.png)

创建线程组之后，我们就可以设置线程组名称，压测参数。

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053695.png)

### 创建压测地址

如下图，右键创建`HTTP`请求。

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053967.png)

输入请求的协议类型，地址、端口号、映射路径、参数等。

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053934.png)

### 添加结果树和聚合报告

然后我们就可以进行压测了，但是笔者希望看到压测结果和聚合报告，这时候我们就可以右键刚刚创建的`HTTP`请求，添加结果树和聚合报告

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053070.png)

### 点击启动进行压测

如下图，我们点击这个绿色按钮即可开始压测。

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053616.png)

点击结果树就能看到请求结果

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053556.png)

点击聚合报告就能看到性能测试报告

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053589.png)

## 基于Jmeter测试POST请求

了解了jmeter整体的操作之后，我们再来补充一下日常用的最多的json传参的post请求，由于jmeter界面发起POST稍微有些麻烦，所以笔者就在这里补充一下post请求的配置步骤：

1. 首先自然是填写`HTTP`请求的常规信息，如下图，设置请求方式、映射地址、请求参数、端口号等信息:

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053231.png)

1. 重点来了，我们必须手动创建`HTTP`信息头管理器，配置文本类型告知`Jmeter`我们当前发起的请求是参数为`JSON`格式的`POST`请求，如下图所示点击对应选项创建`HTTP`信息头管理器。

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053228.png)

如下图，`key`和`value`分别配置`Content-Type`和`application/json;charset=UTF-8`，完成信息头的配置之后，我们就可以发起`POST`请求开始着手压测了。

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202304021053290.png)

## 参考文献

[win10 jmeter 5.1.1安装教程(opens new window)](https://blog.csdn.net/Jenny_He/article/details/88926605)

[jmeter 启动Error: Unable to access jarfile ApacheJMeter.jar错误(opens new window)](https://blog.csdn.net/wlwxww/article/details/87890886)

[使用Jmeter查看聚合报告(opens new window)](https://blog.csdn.net/weixin_45412176/article/details/106790525)

[一文搞定Jmeter发送Get与Post请求(HTTP)](https://blog.csdn.net/lht3347/article/details/110186172)



![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)