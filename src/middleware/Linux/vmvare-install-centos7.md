---
title: VMware虚拟机安装    
icon: circle-info
order: 2
tag:
  - "Linux\U0001F964"
category:
  - "Linux\U0001F964"
pageview: false
date: 2023-10-09 15:46:30
comment: false
breadcrumb: false
---




>大家好，我是Leo🫣🫣🫣，最近有朋友问我能不能出一期关于Linux虚拟机安装的教程，于是我打算中午抽时间来淦一下。
>
>好了，话不多说让我们开始吧😎😎😎。

## 1.VMware虚拟机的安装

### 1.1 前言：

虚拟机可以在我们自己的电脑上安装一个独立的系统，在测试软件或者想要使用其他系统的场景下还是挺方便的。

**注意：** 笔者在写文章时所用版本为VMware16，大家可以自行选择。



### 1.2 下载

进入官网的 [VMware Workstation Pro 页面](https://www.vmware.com/cn/products/workstation-pro.html)，浏览功能特性、应用场景、系统要求等。下滑页面点击 `试用 Workstation 17Pro` 下方的下载链接，跳转至[下载页面](https://www.vmware.com/products/workstation-pro/workstation-pro-evaluation.html)。

![image-20231017112413188](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171124394.png)



在下载页面中下滑，根据操作系统选择合适的产品，在这里以 Windows10 系统为例，选择 `Workstation 17 Pro for Windows`，开始下载安装文件。

![image-20231017112708205](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171127287.png)



### 1.3 VMware安装步骤

#### 1.3.1 步骤1

在我们下载好的文件夹中找到安装文件，双击，等待安装程序运行。

![image-20231017113215986](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171132033.png)





#### 1.3.2 步骤2

点击**下一步**——> 选中**接受许可后**——>点击 **下一步**。

![image-20231017113735870](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171137930.png)

![image-20231017113727383](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171137451.png)



#### 1.3.3 步骤3

更改安装路径：把**√**去掉——>点击右上角的“更改”，修改安装路径，默认本地C盘（这个路径看自己情况决定，最好文件名是纯英文 ）——>点击**确定**——>点击“下一步”。

![image-20231017113348079](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171133166.png)

![image-20231017113359689](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171133790.png)

![image-20231017113410187](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171134251.png)







#### 1.3.4 步骤4

默认，点击**下一步**——>点击**安装**，开始安装。

建议把两个“√”都取消，启动自检要是开了的话，每次一打开VW就会内存爆满，客户计划就是垃圾根本没用

![image-20231017113435418](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171134527.png)



#### 1.3.5 步骤5

按照步骤，点击右下角许可证密钥，输入密钥——>点击 **输入**——>点击“完成”退出安装向导。

建议输入许可证密钥，可以永久使用VMware，否则就是试用版本一个月。



### 1.4 秘钥

**永久密钥获取方式**：网上搜索关键词VMware16密钥，因为我的版本是16，所以关键词版本是16 ，找到后随便复制一个顺眼的输入即可。这个是不是很赞，哈哈哈。

下面是网上搜集到的可用密钥，根据自己虚拟机版本选择密钥。**拿去不谢，亲测有效~~**

VMware Workstation16 密钥：

- ZF3R0-FHED2-M80TY-8QYGC-NPKYF
- YF390-0HF8P-M81RQ-2DXQE-M2UT6
- ZF71R-DMX85-08DQY-8YMNC-PPHV8

VMware Workstation Pro 15 激活许可证：

- UY758-0RXEQ-M81WP-8ZM7Z-Y3HDA
- VF750-4MX5Q-488DQ-9WZE9-ZY2D6
- UU54R-FVD91-488PP-7NNGC-ZFAX6
- YC74H-FGF92-081VZ-R5QNG-P6RY4
- YC34H-6WWDK-085MQ-JYPNX-NZRA2



## 2.安装centos7的安装

### 2.1 准备工作

笔者是在阿里云镜像站进行下载的，大家可以参考。

[centos-7-isos-x86_64安装包下载_开源镜像站-阿里云 (aliyun.com)](https://mirrors.aliyun.com/centos/7/isos/x86_64/)

1.软件：VMware Workstation 虚拟机

2.镜像文件：CentOS-7-x86 64-DVD-2009.iso

![image-20231017114222836](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171142912.png)



### 2.2 创建虚拟机

#### 2.2.1 步骤1

打开VMware虚拟机，**文件 → 新建虚拟机 → 自定义 → 下一步**。

![image-20231017114420560](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171144632.png)



#### 2.2.2 步骤2

**硬盘兼容性**选择默认就可以，继续**下一步**。

![image-20231017114443012](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171144072.png)





#### 2.2.3 步骤3

进入 **客户机操作系统** 选择 **稍后安装操作系统** （因为tfwf要在虚拟机安装完成之后，把不需要的硬件删除，所以选择稍后安装操作系统）。

![image-20231017114532888](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171145936.png)



#### 2.2.4 步骤4

选择客户端操作系统：**客户机操作系统 → Linux**→ 版本选 **CentOS 7 64位** → **下一步**，注意：版本一定要对应镜像文件版本。

![image-20231017114559489](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171145556.png)



#### 2.2.5 步骤5

命名虚拟机，位置（G:\Document\Leo-test），这样可以在 **VM-Mmirrors**，文件夹放多个操作系统。

![image-20231017114816774](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171148839.png)

![image-20231017114855634](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171148679.png)





#### 2.2.6 步骤6

**处理器配置**，可以根据您的系统选择。这里大家可以打开自己的任务管理器查看自己的电脑的配置。

![image-20231017115020067](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171150135.png)

这里以笔者的电脑为例，8核16个处理器，这里虚拟机的**处理器的数量和每个处理器的核数** 相乘不可以超过自己电脑的逻辑处理器数。

![image-20231017115246821](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171152886.png)



#### 2.2.7 步骤7

笔者这里设置为4096也就是4个G，大家测试学习的话，其实两个G就够了。

![image-20231017115429339](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171154400.png)





#### 2.2.8 步骤8

网络类型 → NAT模式（可以使虚拟机与主机使用同一网络）

![image-20231017115508467](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171155537.png)



#### 2.2.9 步骤9

这里默认即可

![image-20231017115545189](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171155258.png)



![image-20231017115555470](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171155530.png)

![image-20231017115601752](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171156825.png)



#### 2.2.10 步骤10

磁盘容量一般20G就够了，因为笔者后面需要装的东西比较多，这里给了50G，大家适量给就可以了。

![image-20231017115704869](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171157931.png)



#### 2.2.11 步骤11

指定磁盘文件（.vmdk）文件

![image-20231017115833316](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171158378.png)



#### 2.2.12 步骤12

这样虚拟机差不多就准备好了，接下来删除一些不需要的硬件。

![image-20231017115901732](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171159785.png)



#### 2.2.13 步骤13

自定义硬件 → 移除 **USB控制器、声卡、打印机**（这样可以让虚拟器启动的快一点）。

![image-20231017115942923](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171159987.png)



至此，虚拟机中的硬件已经搭建完成。



### 2.3 镜像安装



#### 2.3.1 步骤1

点击 **CD/DVD（IDE）**

![image-20231017131911763](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171319899.png)



#### 2.3.2 步骤2

在连接处选择 **使用ISO映像文件 **选择CentOS 7 iso文件，确定。
![image-20231017132011082](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171320175.png)



#### 2.3.3 步骤3

**开始安装虚拟机**，进入CentOS安装界面。

![image-20231017132041814](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171320891.png)



#### 2.3.4 步骤4

按方向键选择第一项 Install CentOS 7，按回车Enter键

![image-20231017132101073](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171321150.png)



#### 2.3.5 步骤5

CentOS欢迎界面，WELCOME TO CENTOS 7. 设置语言为中文简体。

![image-20231017132318819](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171323916.png)



#### 2.3.6 步骤6

设置时区–DATE & TIME

![image-20231017132357777](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171323872.png)





#### 2.3.7 步骤7

**软件选择最小安装即可**

![image-20231017132435912](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171324997.png)

如果有需要也可以选择**GNOME桌面**，这里会有一个UI界面。



#### 2.3.8 步骤8

安装位置即进行系统分区

选中我们在创建虚拟机时候的50G虚拟硬盘，点击我要配置分区

![image-20231017132629522](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171326628.png)

以下是笔者分区的配置，可以参考一下。

![image-20231017132735338](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171327432.png)



#### 2.3.9 步骤9

打开网络配置以及修改主机名。

![image-20231017132833592](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171328669.png)

**到这里就可以点击开始安装了**

![image-20231017132925576](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171329687.png)



#### 2.3.10 步骤10

配置系统用户

![image-20231017133041076](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171330176.png)



#### 2.3.11 步骤11

部署完成后，点击重启 重启虚拟机。

![image-20231017133810387](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171338494.png)



### 2.4 使用CentOS遇到的问题

#### 1. ifconfig 命令不起效果，出现 **command not found** 的情况。

![image-20231017133911155](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171339219.png)

原因：CentOS7 已经不适用**ifconfig**命令了，已经用**ip addr**命令代替。

解决办法：检入命令**ip addr**。



#### 2. vim命令找不到

![image-20231017133957372](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171339433.png)

这个版本默认没有安装vim，只有自带的vi，需要vim 自行安装即可

```bash
yum install vim -y
```



## 3.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。



![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)