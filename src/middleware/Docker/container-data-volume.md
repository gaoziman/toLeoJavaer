---
title: 容器数据卷
icon: circle-info
order: 6
tag:
- "Docker🛥️"
category:
- "Docker🛥️"
pageview: false
date: 2023-12-03 19:25:04
comment: false
breadcrumb: false
---

# Docker | 容器数据卷




## 1.前言

大家好，我是Leo哥🫣🫣🫣，前面我们学习了Docker的安装以及Docker的基本命令。本篇文章我们学习数据卷有关知识点好了，话不多说让我们开始吧😎😎😎。



## 2.数据卷相关概念

从docker的理念说起，docker将应用和环境打包成一个镜像，运行镜像（生成容器）就可以访问服务了。

- 如果数据都存在容器中，那么删除容器，数据就会丢失！需求：数据可以持久化
- MySQL容器删了，就相当于删库了。需求：MySQL数据可以本地存储

容器之间可以有一个**数据共享**的技术，docker容器产生的数据同步到本地或者别的地方。

这就是数据卷技术，就是**目录挂载**，将容器内的目录，挂载到虚拟机上或者Linux上

**目的：** 实现容器数据的持久化和同步操作。容器间也可以数据共享	

### 2.1 什么是数据卷

**数据卷（volume）**是一个虚拟目录，是**容器内目录**与**宿主机****目录**之间映射的桥梁。

以Nginx为例，我们知道Nginx中有两个关键的目录：

- `html`：放置一些静态资源
- `conf`：放置配置文件

如果我们要让Nginx代理我们的静态资源，最好是放到`html`目录；如果我们要修改Nginx的配置，最好是找到`conf`下的`nginx.conf`文件。

但遗憾的是，容器运行的Nginx所有的文件都在容器内部。所以我们必须利用数据卷将两个目录与宿主机目录关联，方便我们操作。如图：

暂时无法在飞书文档外展示此内容

在上图中：

- 我们创建了两个数据卷：`conf`、`html`
- Nginx容器内部的`conf`目录和`html`目录分别与两个数据卷关联。
- 而数据卷conf和html分别指向了宿主机的`/var/lib/docker/volumes/conf/_data`目录和`/var/lib/docker/volumes/html/_data`目录

这样以来，容器内的`conf`和`html`目录就 与宿主机的`conf`和`html`目录关联起来，我们称为**挂载**。此时，我们操作宿主机的`/var/lib/docker/volumes/html/_data`就是在操作容器内的`/usr/share/nginx/html/_data`目录。只要我们将静态资源放入宿主机对应目录，就可以被Nginx代理了。

**小提示**：

`/var/lib/docker/volumes`这个目录就是默认的存放所有容器数据卷的目录，其下再根据数据卷名称创建新目录，格式为`/数据卷名/_data`。

**为什么不让容器目录直接指向 **宿主机目录呢？

- 因为直接指向宿主机目录就与宿主机强耦合了，如果切换了环境，宿主机目录就可能发生改变了。由于容器一旦创建，目录挂载就无法修改，这样容器就无法正常工作了。
- 但是容器指向数据卷，一个逻辑名称，而数据卷再指向宿主机目录，就不存在强耦合。如果宿主机目录发生改变，只要改变数据卷与宿主机目录之间的映射关系即可。

不过，我们通过由于数据卷目录比较深，不好寻找，通常我们也**允许让容器直接与**宿主机目录挂载而不使用数据卷，

### 2.2 数据卷命令

数据卷的相关命令有：

| **命令**              | **说明**             | **文档地址**                                                 |
| :-------------------- | :------------------- | :----------------------------------------------------------- |
| docker volume create  | 创建数据卷           | [docker volume create](https://docs.docker.com/engine/reference/commandline/volume_create/) |
| docker volume ls      | 查看所有数据卷       | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/volume_ls/) |
| docker volume rm      | 删除指定数据卷       | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/volume_prune/) |
| docker volume inspect | 查看某个数据卷的详情 | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/volume_inspect/) |
| docker volume prune   | 清除数据卷           | [docker volume prune](https://docs.docker.com/engine/reference/commandline/volume_prune/) |

注意：容器与数据卷的挂载要在创建容器时配置，对于创建好的容器，是不能设置数据卷的。而且**创建容器的过程中，数据卷会自动创建**。

**演示**：演示一下nginx的html目录挂载

```PowerShell
# 1.首先创建容器并指定数据卷，注意通过 -v 参数来指定数据卷
docker run -d --name nginx -p 80:80 -v html:/usr/share/nginx/html nginx

# 2.然后查看数据卷
docker volume ls
# 结果
DRIVER    VOLUME NAME
local     29524ff09715d3688eae3f99803a2796558dbd00ca584a25a4bbc193ca82459f
local     html

# 3.查看数据卷详情
docker volume inspect html
# 结果
[
    {
        "CreatedAt": "2024-05-17T19:57:08+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/html/_data",
        "Name": "html",
        "Options": null,
        "Scope": "local"
    }
]

# 4.查看/var/lib/docker/volumes/html/_data目录
ll /var/lib/docker/volumes/html/_data
# 可以看到与nginx的html目录内容一样，结果如下：
总用量 8
-rw-r--r--. 1 root root 497 12月 28 2021 50x.html
-rw-r--r--. 1 root root 615 12月 28 2021 index.html

# 5.进入该目录，并随意修改index.html内容
cd /var/lib/docker/volumes/html/_data
vi index.html

# 6.打开页面，查看效果

# 7.进入容器内部，查看/usr/share/nginx/html目录内的文件是否变化
docker exec -it nginx bash
```



## 3.演示

我们这里演示有关MySQL的匿名数据卷

使用以下命令查看MySQL容器详细信息

```bash
docker inspect mysql
```

**关注其中.Config.Volumes部分和.Mounts部分**

```bash
[
    {
        "Id": "d0d4d9d10bc4471978f112f9959f544d6d890aa79c62306e12afea71cab44138",
        "Created": "2023-11-23T12:02:13.163685727Z",
        "Path": "docker-entrypoint.sh",
        "Args": [
            "mysqld"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 1878,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2023-11-29T14:56:59.686680187Z",
            "FinishedAt": "2023-11-28T03:39:42.898753348Z"
        },
        "Image": "sha256:3218b38490cec8d31976a40b92e09d61377359eab878db49f025e5d464367f3b",
        "ResolvConfPath": "/var/lib/docker/containers/d0d4d9d10bc4471978f112f9959f544d6d890aa79c62306e12afea71cab44138/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/d0d4d9d10bc4471978f112f9959f544d6d890aa79c62306e12afea71cab44138/hostname",
        "HostsPath": "/var/lib/docker/containers/d0d4d9d10bc4471978f112f9959f544d6d890aa79c62306e12afea71cab44138/hosts",
        "LogPath": "/var/lib/docker/containers/d0d4d9d10bc4471978f112f9959f544d6d890aa79c62306e12afea71cab44138/d0d4d9d10bc4471978f112f9959f544d6d890aa79c62306e12afea71cab44138-json.log",
        "Name": "/mysql",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": [
                "/opt/software/mysql/init:/docker-entrypoint-initdb.d",
                "/opt/software/mysql/data:/var/lib/mysql",
                "/opt/software/mysql/conf:/etc/mysql/conf.d"
            ],
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "hm-net",
            "PortBindings": {
                "3306/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "3306"
                    }
                ]
            },
            "RestartPolicy": {
                "Name": "always",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "ConsoleSize": [
                45,
                166
            ],
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "host",
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": [],
            "BlkioDeviceWriteBps": [],
            "BlkioDeviceReadIOps": [],
            "BlkioDeviceWriteIOps": [],
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware",
                "/sys/devices/virtual/powercap"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/33969b53cbc6aa929b5ece9d7f539a50e6f4910dddccefb93730bc73e679aa34-init/diff:/var/lib/docker/overlay2/796094bf771fc2db7de20a989d844dfc083d90e93fd163a865beb85d51e1dfd4/diff:/var/lib/docker/overlay2/3a30a84a6a761ef6494fb0f3b8b759cd8076037f813ed08e6e8236198ce07a00/diff:/var/lib/docker/overlay2/11bc12dcb49921b9ed6bff3d1f607b12a40fd68563c75e8b45fba5a7e9f7aa7a/diff:/var/lib/docker/overlay2/8cf0bb6362975eefa87ff11c4a984731b731ea0a7080701c90181119f912bace/diff:/var/lib/docker/overlay2/e05d3a55973ac4a9cfb37a00f990d60251ef500eaac717c0aaf06be00452309d/diff:/var/lib/docker/overlay2/4adff3373cdf065f04fbc4a549ee735155cbc29194bfbaa59a1582cde8021385/diff:/var/lib/docker/overlay2/91366e24401077be41ca6b5d32634237526eccbe323b981a54a18d14562efcb9/diff:/var/lib/docker/overlay2/d10f2cb83b38a30431883ddbdecdf210c7830bc95929074811909e1c896f7855/diff:/var/lib/docker/overlay2/fddec04d2325b33e6ff3e7281da688fa1e99d8eac5cf5454fc1ce6191bca8a43/diff:/var/lib/docker/overlay2/61fb5283a6e516ff4c86442f93ccf949a76f883f38b434a1f45c4dcf09abe0e3/diff:/var/lib/docker/overlay2/c54900dad65b52035a7ef480ecb2d2f395fa69ce4bedab3dab97a6a81aea9763/diff:/var/lib/docker/overlay2/42a427c699c7a4ad2166f1ac3345edf0a8964bc0d98ac5c8602f3d2bbb37db23/diff",
                "MergedDir": "/var/lib/docker/overlay2/33969b53cbc6aa929b5ece9d7f539a50e6f4910dddccefb93730bc73e679aa34/merged",
                "UpperDir": "/var/lib/docker/overlay2/33969b53cbc6aa929b5ece9d7f539a50e6f4910dddccefb93730bc73e679aa34/diff",
                "WorkDir": "/var/lib/docker/overlay2/33969b53cbc6aa929b5ece9d7f539a50e6f4910dddccefb93730bc73e679aa34/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [
            {
                "Type": "bind",
                "Source": "/opt/software/mysql/init",
                "Destination": "/docker-entrypoint-initdb.d",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            },
            {
                "Type": "bind",
                "Source": "/opt/software/mysql/conf",
                "Destination": "/etc/mysql/conf.d",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            },
            {
                "Type": "bind",
                "Source": "/opt/software/mysql/data",
                "Destination": "/var/lib/mysql",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            }
        ],
        "Config": {
            "Hostname": "d0d4d9d10bc4",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "3306/tcp": {},
                "33060/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "TZ=Asia/Shanghai",
                "MYSQL_ROOT_PASSWORD=root",
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "GOSU_VERSION=1.12",
                "MYSQL_MAJOR=8.0",
                "MYSQL_VERSION=8.0.27-1debian10"
            ],
            "Cmd": [
                "mysqld"
            ],
            "Image": "mysql",
            "Volumes": {
                "/var/lib/mysql": {}
            },
            "WorkingDir": "",
            "Entrypoint": [
                "docker-entrypoint.sh"
            ],
            "OnBuild": null,
            "Labels": {}
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "97ac9dbc6afc47ff855645c5e24711093253432258681b1b153c72f83e2d081e",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "3306/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "3306"
                    },
                    {
                        "HostIp": "::",
                        "HostPort": "3306"
                    }
                ],
                "33060/tcp": null
            },
            "SandboxKey": "/var/run/docker/netns/97ac9dbc6afc",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "",
            "Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "",
            "IPPrefixLen": 0,
            "IPv6Gateway": "",
            "MacAddress": "",
            "Networks": {
                "hm-net": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": [
                        "d0d4d9d10bc4"
                    ],
                    "NetworkID": "63b937d578ce5b6aa4213fd0c93fd7a9f45d1b8c1a2ed70f5b15c9788abbb1fa",
                    "EndpointID": "e870f6d02fb755f42c553b2c55322a997eb0f81ec445a720c4815ffd482b9d6c",
                    "Gateway": "172.18.0.1",
                    "IPAddress": "172.18.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:12:00:02",
                    "DriverOpts": null
                }
            }
        }
    }
]
```



可以发现这个容器声明了一个本地目录，需要挂载数据卷，但是**数据卷未定义**。这就是匿名卷。

然后，我们再看结果中的`.Mounts`部分：

```bash
"Mounts": [
            {
                "Type": "bind",
                "Source": "/opt/software/mysql/init",
                "Destination": "/docker-entrypoint-initdb.d",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            },
            {
                "Type": "bind",
                "Source": "/opt/software/mysql/conf",
                "Destination": "/etc/mysql/conf.d",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            },
            {
                "Type": "bind",	
                "Source": "/opt/software/mysql/data",
                "Destination": "/var/lib/mysql",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            }
        ],
```

可以发现，其中有几个关键属性：

- Name：数据卷名称。由于定义容器未设置容器名，这里的就是匿名卷自动生成的名字，一串hash值。
- Source：宿主机目录
- Destination : 容器内的目录

上述配置是将容器内的`/var/lib/mysql`这个目录，与数据卷`29524ff09715d3688eae3f99803a2796558dbd00ca584a25a4bbc193ca82459f`挂载。于是在宿主机中就有了`/var/lib/docker/volumes/29524ff09715d3688eae3f99803a2796558dbd00ca584a25a4bbc193ca82459f/_data`这个目录。这就是匿名数据卷对应的目录，其使用方式与普通数据卷没有差别。

接下来，可以查看该目录下的MySQL的data文件：

```Bash
ls -l /var/lib/docker/volumes/29524ff09715d3688eae3f99803a2796558dbd00ca584a25a4bbc193ca82459f/_data
```



注意：每一个不同的镜像，将来创建容器后内部有哪些目录可以挂载，可以参考DockerHub对应的页面



## 4.挂载本地目录

### 4.1 概述

可以发现，数据卷的目录结构较深，如果我们去操作数据卷目录会不太方便。在很多情况下，我们会直接将容器目录与宿主机指定目录挂载。挂载语法与数据卷类似：

```Bash
# 挂载本地目录
-v 本地目录:容器内目录
# 挂载本地文件
-v 本地文件:容器内文件
```

**注意**：本地目录或文件必须以 `/` 或 `./`开头，如果直接以名字开头，会被识别为数据卷名而非本地目录名。

例如：

```Bash
-v mysql:/var/lib/mysql # 会被识别为一个数据卷叫mysql，运行时会自动创建这个数据卷
-v ./mysql:/var/lib/mysql # 会被识别为当前目录下的mysql目录，运行时如果不存在会创建目录
```

删除并重新创建mysql容器，并完成本地目录挂载：

- 挂载`/opt/software/mysql/data`到容器内的`/var/lib/mysql`目录
- 挂载`/opt/software/mysql/init`到容器内的`/docker-entrypoint-initdb.d`目录（初始化的SQL脚本目录）
- 挂载`/opt/software/mysql/conf`到容器内的`/etc/mysql/conf.d`目录（这个是MySQL配置文件目录）

这里我们把mysql创建在/opt/software下面，我一般的习惯是软件目录都会在这下面，大家可以随意选择即可。

然后在我们创建好的目录init 和 conf目录下面分别传入conf文件和SQL文件，这样在进行docker挂载之后，会为我们创建MySQL数据。



### 4.2 开始挂载

创建并运行新mysql容器，挂载本地目录

```bash
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=root \
  -v /opt/software/mysql/data:/var/lib/mysql \
  -v /opt/software/mysql/conf:/etc/mysql/conf.d \
  -v /opt/software/mysql/init:/docker-entrypoint-initdb.d \
  mysql
```



![image-20231130103221822](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311301032887.png)可以看出来，我们的本地挂载已经成功，为了进一步验证，我们打开我们创建的data目录进行查看。

![image-20231130103345052](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311301033154.png)

这不就是我们MySQL存储数据的一些文件嘛，说明我们的本地挂载没有问题。



### 4.3 核验

我们进入到MySQL容器中，查看他的编码情况

![image-20231130103940618](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311301039664.png)

发现正是我们预期上传的conf文件，大功告成!!!



## 5.挂载的三种方式

```markdown
# 1
-v 容器内路径            # 匿名挂载

# 2
-v 卷名:容器内路径       # 具名挂载

# 3
-v 宿主机路径:容器内路径 # 指定路径挂载
```



## 6.文章参考

- https://docs.docker.com/engine/install/centos/#install-from-a-package
- https://docs.docker.com/engine/reference/commandline/cli/



## 7.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注微信公众号-程序员Leo，后面文章会首先同步至公众号。	

![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311290934126.png)