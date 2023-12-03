---
title: Docker部署MySQL
icon: circle-info
order: 3
tag:
- "Docker🛥️"
category:
- "Docker🛥️"
pageview: false
date: 2023-12-03 19:25:25
comment: false
breadcrumb: false
---


# Docker | Docker部署MySQL



## 1.前言

大家好，我是Leo哥🫣🫣🫣，前面我们学习了Docker的安装以及Docker的基本命令。这节我们来学习在Docker中如何安装MySQL环境。好了，话不多说让我们开始吧😎😎😎。



## 2.拉取镜像

我们利用Docker来安装一个MySQL软件，大家可以对比一下之前传统的安装方式，看看哪个效率更高一些。

如果是利用传统方式部署MySQL，大概的步骤有：

- 搜索并下载MySQL安装包
- 上传至Linux环境
- 编译和配置环境
- 安装

而使用Docker安装，仅仅需要两步即可，在命令行输入下面的命令：

首先我们需要去拉取镜像。执行以下命令进行镜像拉取。

```bash
docker pull mysql
```

![image-20231127191937255](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311271919323.png)



## 3.安装

通过以下命令进行安装

```bash
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=root \
  mysql
```

![image-20231127192009870](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311271920911.png)

通过以下命令查看我们的容器是否运行成功

```bash
docker ps -a
```

![image-20231127192132498](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311271921549.png)



可以看出来我们MySQL已经成功运行在Docker上面，大功告成!!!



## 4.连接MySQL

下面我们通过数据库管理软件进行测试连接。这里笔者使用的是Navicat 16。如何有需要的读者朋友，可以关注微信公众号**程序员Leo**，后台回复Navicat即可获取。

我们打开我们的Navicat，点击连接。

![image-20231127192451959](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311271924990.png)

然后填好服务器基本信息之后，点击测试连接。

![image-20231127192535604](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311271925656.png)

然后发现我们的数据库，可以看到初始的四个数据库，说明本次安装成功！

![image-20231127192603642](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311271926664.png)



## 5.文章参考

- https://docs.docker.com/engine/install/centos/#install-from-a-package
- https://docs.docker.com/engine/reference/commandline/cli/



## 6.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注微信公众号-程序员Leo，后面文章会首先同步至公众号。	

![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311271909655.png)