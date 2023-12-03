---
title: Docker常用命令
icon: circle-info
order: 2
tag:
- "Docker🛥️"
category:
- "Docker🛥️"
pageview: false
date: 2023-12-03 19:25:30
comment: false
breadcrumb: false
---


# Docker | Docker常用命令


## 1.前言

大家好，我是Leo哥🫣🫣🫣，众所周知，docker 排查问题相较而言是困难的。因此，熟知一些常用命令对我们快速的排查定位问题是非常有帮助的。

好了，话不多说让我们开始吧😎😎😎。



## 2.常见命令介绍

下面是一些docker常见的命令

| **命令**       | **说明**                       |                         **文档地址**                         |
| :------------- | :----------------------------- | :----------------------------------------------------------: |
| docker pull    | 拉取镜像                       | [docker pull](https://docs.docker.com/engine/reference/commandline/pull/) |
| docker push    | 推送镜像到DockerRegistry       | [docker push](https://docs.docker.com/engine/reference/commandline/push/) |
| docker images  | 查看本地镜像                   | [docker images](https://docs.docker.com/engine/reference/commandline/images/) |
| docker rmi     | 删除本地镜像                   | [docker rmi](https://docs.docker.com/engine/reference/commandline/rmi/) |
| docker run     | 创建并运行容器（不能重复创建） | [docker run](https://docs.docker.com/engine/reference/commandline/run/) |
| docker stop    | 停止指定容器                   | [docker stop](https://docs.docker.com/engine/reference/commandline/stop/) |
| docker start   | 启动指定容器                   | [docker start](https://docs.docker.com/engine/reference/commandline/start/) |
| docker restart | 重新启动容器                   | [docker restart](https://docs.docker.com/engine/reference/commandline/restart/) |
| docker rm      | 删除指定容器                   | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/rm/) |
| docker ps      | 查看容器                       | [docker ps](https://docs.docker.com/engine/reference/commandline/ps/) |
| docker logs    | 查看容器运行日志               | [docker logs](https://docs.docker.com/engine/reference/commandline/logs/) |
| docker exec    | 进入容器                       | [docker exec](https://docs.docker.com/engine/reference/commandline/exec/) |
| docker save    | 保存镜像到本地压缩文件         | [docker save](https://docs.docker.com/engine/reference/commandline/save/) |
| docker load    | 加载本地压缩文件到镜像         | [docker load](https://docs.docker.com/engine/reference/commandline/load/) |
| docker inspect | 查看容器详细信息               | [docker inspect](https://docs.docker.com/engine/reference/commandline/inspect/) |

用一副图来表示这些命令的关系：

![image-20231126221438991](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311262214021.png)



注意：

**默认情况下，每次重启虚拟机我们都需要手动启动Docker和Docker中的容器。通过命令可以实现开机自启：**

```PowerShell
# Docker开机自启
systemctl enable docker

# Docker容器开机自启
docker update --restart=always [容器名/容器id]
```



## 3.详细命令演示

### 3.1 显示docker的系统信息

```bash
docker info
```

![image-20231126221708214](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311262217262.png)



### 3.2 拉取镜像

我们这里通过以拉取Redis为例来进行演示

```bash
docker pull redis
```

首先会检查是否有此进行，如何有则进行加载，如果没有，则去仓库中拉取最新镜像

![image-20231126222638206](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311262226267.png)



### 3.3 查看镜像

我们通过拉取成功之后，我们可以通过以下命令查看我们的镜像

```
docker images 
```

![image-20231126222739088](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311262227134.png)



### 3.4 创建容器

```
docker run --name redis -p 6379:6379 -d --restart=always redis redis-server --appendonly yes --requirepass xxxx
```



### 3.5 查看运行中容器

我们可以通过以下命令进行查看正在运行中容器

```
docker ps
```

![image-20231126223056943](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311262230993.png)

可以加格式化方式访问，格式会更加清爽

```bash
docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}\t{{.Names}}"
```





### 3.6 查看容器详细信息

我们可以使用以下命令来查看容器的具体信息

```
docker inspect redis
```

![image-20231126223328987](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311262233069.png)



### 3.7 进入容器内部

我们可以通过一下命令进入到Redis容器内部

```bash
docker exec -it redis bash
```

![image-20231126224258607](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311262242657.png)



### 3.8 删除容器

当我们不想要这个容器的时候，我们可以通过删除命令进行删除，但是注意：正在运行的容器不可以删除。

![image-20231126224556637](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311262245695.png)

我们需要先对这个容器进行停止然后再进行删除。

![image-20231126224650182](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311262246237.png)

可以看出来，此时我们的Redis容器就被删除了。

小技巧：当我们删除容器的时候，可以通过容器ID的前三位进行删除，停止容器也可以。

但其实，如果我们的情况比较进行，我们还是可以通过命令来强制删除容器的，但是一般不建议这么使用。

```bash
docker rm redis -f
```



## 4.命令别名

给常用Docker命令起别名，方便我们访问：

```PowerShell
# 修改/root/.bashrc文件
vim /root/.bashrc
内容如下：
# .bashrc

# User specific aliases and functions

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
alias dps='docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}\t{{.Names}}"'
alias dis='docker images'

# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi
```

然后，执行命令使别名生效

```PowerShell
source /root/.bashrc
```

然后我们可以使用一下我们的新命令来查看我的镜像。

![image-20231126225027409](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311262250442.png)





## 5.文章参考

- https://docs.docker.com/engine/install/centos/#install-from-a-package
- https://docs.docker.com/engine/reference/commandline/cli/



## 6.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注微信公众号-程序员Leo，后面文章会首先同步至公众号。	

![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311262202601.png)