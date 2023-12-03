---
title: Redis7安装配置
icon: circle-info
order: 2
category:
  - Redis7
tag:
  - Redis7
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---






##  1. Redis安装

### 1.自行购买云服务器

自己购买`阿里云`、`腾讯云`或 `华为云服务器`，自带`CentoOS` 或者 `Ubuntu` 环境，直接开干。如果使用想更快捷安装Redis的话，即可使用Docker容器进行安装，可以参考我这一篇博客 [Doker部署前后端分离项目](https://manamn.space/posts/1b327a2c.html#22-docker%E5%AE%89%E8%A3%85redis)



### 2.VMware本地虚拟机

通过命令 `getconf LONG_BIT` 查看，它返回结果是多少就是多少位



### 3.Redis7的安装

#### 1. window版安装：

下载地址：https://github.com/zkteco-home/redis-windows

> 这里个人建议使用使用linux版进行安装使用



####  2. linux版安装：

> Linux安装Redis必须有gcc环境

##### 	1. 什么是gcc?

> gcc是linux下的一个编译程序，是C程序的编译工具。
> GCC(GNU Compiler Collection)是 GNU(GNU's Not Unix) 计划提供的编译器家族，它能够支持 C,C++, Objective-C, Fortran, Java 和Ada 等等程序设计语言前端，同时能路运在 X86，X86-64，IA-64，PowerPC，SPARC和Alpha 等等几乎目前所有的硬件平台上。鉴于这些特征，以及 GCC 编译代码的高效性，使得 GCC 成为绝大多数自由软件开发编译的首选工具。虽然对于程序员们来说，编译器只是一个工具，除了开发和维护人员，很少有人关注编译器的发展，但是 GCC 的影响力是如此之大，它的性能提升甚至有望改善所有的自由软件的运行效率，同时它的内部结构的变化也体现出现代编译器发展的新特征。

##### 	2. 查看gcc版本

```
gcc -v
```

##### 	3. 安装

​		安装redis之前需要具备c++库环境

```bash
yum -y install gcc-c++
```



##### 4. 命令案例

![image-20230906202642404](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062026478.png)



##### 5. 版本选择

```
查看自己redis版本的命令：redis -server -v
安全Bug按照官网提示，升级成为6.0.8及以上
目前建议都需要升级到6.0.8版本以上
本次使用redis7.2
```



## 2. Redis安装步骤

这里是Redis7.2.0 版本 下载地址：https://redis.io/download/

### 2. 1 具体步骤

这里以Linux下载：

#### 1. 首先判断我们的centos 7是多少位的，使用64位切记

```bah
getconf LONG_BIT            返回是多少就是几位
```

#### 2. Linux安装Redis必须先具备gcc编译环境

```bash
gcc -v                  查看版本
yum -y install gcc-c++          安装c++库环境
```

![image-20230906202547826](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062025090.png)



![image-20230906202642404](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062026478.png)

我们可以通过 `gcc-v` 来查看，**注意 ：** 这里版本一定大于4.8.5

#### 3. 下载Redis7.2.0.tar.gz后放入`Linux目录` opt

```bash
tar -zxvf redis7.2.0.tar.gz      /opt目录下解压
cd redis7.2.0.tar.gz              进入目录
make && make install              在redis7.0.9目录下执行
cd /usr/local/bin                 默认安装的位置查看
```

#### 4. 安装完后回到 /opt/redis7.2.0/

```bash
mkdir /myredis                在根目录下创建myredis
cp redis.conf /myredis/redis7.conf     将默认的复制过去
```

#### 5. 修改/myredis目录下redis7.conf配置文件做初始化设置

```bash
vim /myredis/redis7.conf            
```

redis.conf 配置文件，改完后确保生效，记得重启，记得重启

-   默认`daemonize no` 改为 `daemonize yes`
-   默认`protected-mode` yes 改为 `protected-mode no`
-   默认bind 改为 直接注释掉 (默认bind 127.0.0.1只能本机访问)或改成本机IP地址，否则影响远程IP连接
    
-   添加redis密码 改为 `requirepass` 你自己设置的密码

#### 6. 在/usr/local/bin目录下运行redis-server，启用/myredis目录下的 redis7.conf

```linux
redis-server /myredis/redis7.conf
```

#### 7. 连接服务

```bash
redis-cli -a 设置的密码 -p 6379 
测试  ping  pong
```



### 备注说明

![image-20230906204500448](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062045502.png)

Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.

这段警告看着不舒服怎么办?

warning 这串输出并不是普通输出，shell的标准输出包含两种：

1（标准输出）

2（标准错误）我们的命令，即包含1也包含2，2即是我们想要除去的提示

解决办法将标准错误去除即可，追加2>/dev/null，将标准错误丢弃即可，就没有烦人的警告了。

![image-20230906205302804](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062053861.png)



#### 1.Redis端口为什么是6379？

> Redis的默认端口是6379，是由手机键盘字母MERZ的位置决定的。MERZ在Antirez的朋友圈语言中是"愚蠢和傻B"的代名词，源于意大利广告女郎Alessia Merz在电视节目上说了一堆愚蠢的话，Redis之父对她有"特殊"印象，就给它弄成端口号了
>



#### 2.关闭Redis服务器

单实例关闭：在Redis服务器外面关闭命令：

```bash
redis-cli -a 123456 shutdown
```

如果在`Redis`服务器里面可以直接使用`shutdown`命令

多实例关闭，指定端口关闭：

```bash
redis-cli -p 6379 shutdown
```



## 3. Redis卸载步骤

#卸载Redis步骤

1.停止redis-server服务

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309061435943.png)

2.删除/usr/local/bin目录下与redis相关的文件

```bash
ls -l /usr/local/bin/redis-*

rm -rf /usr/local/bin/redis-*
```

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309061435951.png)








![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)
























