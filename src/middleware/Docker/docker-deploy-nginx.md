---
title: Docker部署Nginx
icon: circle-info
order: 4
tag:
- "Docker🛥️"
category:
- "Docker🛥️"
pageview: false
date: 2023-12-03 19:25:21
comment: false
breadcrumb: false
---


# Docker | Docker部署Nginx


## 1.前言

大家好，我是Leo哥🫣🫣🫣，前面我们学习了Docker的安装以及Docker的基本命令。这节我们来学习在Docker中如何安装Nginx。好了，话不多说让我们开始吧😎😎😎。



## 2.拉取镜像

有了上一篇安装MySQL的经验，我们安装Nginx同样也是需要几步命令即可。：

首先我们需要去拉取镜像。执行以下命令进行镜像拉取。

```bash
docker pull nginx
```

![image-20231128154615895](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311281546939.png)

然后通过以下命令查看我们拉取的镜像

```bash
docker images
```

![image-20231128154822190](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311281548263.png)

注意我这里使用的是我写的模版命令 ： dis

如果还太了解原理的同学，可以[参考我这篇文章](https://blog.csdn.net/qq_58608526/article/details/134635027?spm=1001.2014.3001.5501)，进行配置。

## 3.安装

通过以下命令进行安装

```bash
docker run -d --name nginx -p 80:80 nginx
```

![image-20231128155017480](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311281550514.png)



## 4.测试

然后我们通过我们的IP+端口号访问我们的nginx服务。

浏览器打开http://192.168.74.102:80 ，进行访问，这里80是可以省略的，默认访问的就是80端口。

![image-20231128155222635](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311281552686.png)

可以看到，我们Nginx的默认欢迎页，大功告成！



## 5.文章参考

- https://docs.docker.com/engine/install/centos/#install-from-a-package
- https://docs.docker.com/engine/reference/commandline/cli/



## 6.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注微信公众号-程序员Leo，后面文章会首先同步至公众号。	

![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311281552707.png)