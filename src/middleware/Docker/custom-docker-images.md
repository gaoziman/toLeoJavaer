---
title: 自定义Docker镜像
icon: circle-info
order: 5
tags:
- "Docker🛥️"
categories:
- "Docker🛥️"
pageview: false
date: 2023-12-03 19:25:14
comment: false
breadcrumb: false
---

# Docker | 自定义Docker镜像


## 1.前言

大家好，我是Leo哥🫣🫣🫣，前面我们学习了Docker的安装以及Docker的基本命令。学会了如何去通过Docker进行服务的安装，比如MySQL，Nginx等。那么大家可以思考一个问题，在之前，我们都是通过使用DockerHub官方提供的镜像，那么我们是否可以自定义镜像，对镜像diy呢，答案是当然可以，这篇文章我们就来学习一些前置知识以及自定义我们的镜像。好了，话不多说让我们开始吧😎😎😎。



## 2.什么是镜像

[镜像 ](https://www.huaweicloud.com/product/ims.html)（Mirroring）是一种文件存储形式，是冗余的一种类型，一个磁盘上的数据在另一个磁盘上存在一个完全相同的副本即为镜像。可以把许多文件做成一个镜像文件，与GHOST等程序放在一个盘里用GHOST等软件打开后，又恢复成许多文件，RAID 1和RAID 10使用的就是镜像。常见的镜像文件格式有ISO、BIN、IMG、TAO、DAO、CIF、FCD。

所谓镜像文件其实和ZIP压缩包类似，它将特定的一系列文件按照一定的格式制作成单一的文件，以方便用户下载和使用，例如一个测试版的操作系统、游戏等。镜像文件不仅具有ZIP压缩包的“合成”功能，它最重要的特点是可以被特定的软件识别并可直接刻录到光盘上。其实通常意义上的镜像文件可以再扩展一下，在镜像文件中可以包含更多的信息。比如说系统文件、引导文件、分区表信息等，这样镜像文件就可以包含一个分区甚至是一块硬盘的所有信息。使用这类镜像文件的经典软件就是Ghost，它同样具备刻录功能，不过它的刻录仅仅是将镜像文件本身保存在光盘上，而通常意义上的刻录软件都可以直接将支持的镜像文件所包含的内容刻录到光盘上。

简单来说，在Docker中镜像就是一个轻量的、独立的软件包。用来打包运行环境和基于运行环境开发的软件。它包含软件运行所需的所有内容（包括代码、运行时、库、环境变量、配置文件）

所有的应用，打包docker镜像，就可以跑起来。



## 3.Docker镜像加载原理

Docker 镜像是构建 Docker 容器的基础，它是一个轻量级、可执行的独立软件包，包括运行应用所需要的所有内容——代码、运行时、库、环境变量和配置文件。接下来，我将详细介绍 Docker 镜像的加载原理。

### 3.1 Docker 镜像的分层

Docker 镜像采用了层叠的文件系统，这意味着镜像由一系列只读的层组成。这样做的好处是重用和共享，若干个镜像可以共享相同的层，节省磁盘空间和加速镜像下载。

- **基础层**: 所有镜像的第一层，通常是一个最小化的操作系统环境，如 Ubuntu 或 Alpine。
- **依赖层**: 包含应用程序运行所需的依赖、库文件等。
- **应用层**: 包括应用程序的代码和资源文件。

当你构建一个镜像时，每个指令（如 `RUN`, `COPY`, `ADD` 等）都会在现有镜像层之上创建一个新的层。

### 3.2 镜像加载过程

实际加载和运行 Docker 镜像的过程包含以下几个关键步骤：

1. **拉取镜像**: 当你使用 `docker run` 命令运行一个容器时，如果本地没有指定的镜像，Docker 将从 Docker Hub 或其他配置的镜像仓库拉取镜像。
2. **镜像解压与加载**: Docker 会将拉取的镜像文件解压到磁盘上，并按照镜像层的顺序将它们组合起来。
3. **Union File System**:  Docker 使用 UnionFS 把各层联合成一个统一的文件系统。多个只读层被叠加在一起，最顶部通常是一个可以写入的层，即容器层。
4. **运行容器**: 加载镜像后，Docker 可以在这个统一文件系统的基础上创建并启动一个新容器。
5. **容器层动态写入**: 容器运行后，对文件系统的所有更改都会发生在容器层。这些更改与下面的只读镜像层隔离开来，从而不会影响到基础镜像本身。
6. **存储和缓存**: 镜像层被拉取到本地之后，会被存储在本地的 Docker 宿主机上。当再次运行同样的镜像时，Docker 会使用这些已经存在的层来加速容器的运行。

### 3.3 优化读取速度和资源利用

Docker 的设计允许多个容器共享同一个基础镜像，这使得部署多个容器更加高效。例如，如果10个容器都基于同一个操作系统镜像，那么在磁盘上只需要有一个该操作系统镜像的副本，各个容器只需创建自己特有的容器层即可。

另外，Union File System 是增量的，这意味着只有当文件层发生改变时才需要额外存储空间。未被修改的部分仍然共享相同的物理存储空间。结合容器层的设计，这提供了高效的文件操作性能，同时确保了容器之间的文件系统隔离。

总体来说，Docker 使用一种分层的方式来管理和加载镜像，这种方法带给了 Docker 镜像和容器之间的高效能力和灵活性。通过缓存，共享层和增量更新。



## 4. Docker中的分层

下面我们就以 CentOS 发行版的 `overlay2` 文件系统进行介绍，其实不管是什么发行版，其远离都如出一辙。

overlayer2 官方介绍： https://docs.docker.com/storage/storagedriver/overlayfs-driver/

先来看张图：

![image-20231128162209929](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311281622980.png)

从上图中的右边可以看到 OverlayFS 中有三个层级结构：`lowerdir`、`upperdir`、`merged` 层。

对应的，使用 `docker inspect [container-id]` 就可以看到这几个层所在的位置：

```java
"GraphDriver": {
    "Name": "overlay2",
    "Data": {
        "LowerDir": "/var/lib/docker/overlay2/45abab78c6fd022d9ce132a0fb995f9e91bc0a807ccc73e2461fce6c9b68b250/root",
        "MergedDir": "/var/lib/docker/overlay2/dc838cbc7d903a4bfd6bd0280a6910c063f2d1f03439e917ebc773fccc377402/merged",
        "UpperDir": "/var/lib/docker/overlay2/dc838cbc7d903a4bfd6bd0280a6910c063f2d1f03439e917ebc773fccc377402/upper",
        "WorkDir": "/var/lib/docker/overlay2/dc838cbc7d903a4bfd6bd0280a6910c063f2d1f03439e917ebc773fccc377402/work"
    }
},
```

docker镜像都是只读的，当容器启动时，一个新的可写层被加到镜像的顶部。

这一层就是我们通常说的**容器层**，容器之下的都叫**镜像层**。



## 5.自定义镜像

### 5.1 准备

首先本地准备一个服务jar包，Redis或者MySQL都可以。

### 5.2 通过容器转镜像

使用以下命令进行转换

```
docker commit  容器ID 镜像名称：版本号
```

```
docker save -o 压缩文件名称  镜像名称：版本号
```

最后通过以下命令加载一下即可。

```
docker load -i 压缩文件名称
```

这样就大功告成了！

其实这样方式我们使用的并不大，我们今天这里只是简单了解一下，后面我们会详细讲解另一种方式**dockfile**。

## 6.文章参考

- https://docs.docker.com/engine/install/centos/#install-from-a-package
- https://docs.docker.com/engine/reference/commandline/cli/



## 7.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注微信公众号-程序员Leo，后面文章会首先同步至公众号。	

![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311281615389.png)