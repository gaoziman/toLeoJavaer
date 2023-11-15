---
title: MySQL8绿色版安装
icon: circle-info
order: 1
category:
  - 数据库
tag:
  - 数据库
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---


# MySQL8 绿色版安装

## 1.前言

大家好，我是Leo哥🫣🫣🫣，这不是这两天因为公司项目需求，我的原来的笔记本以及跟不上了，于是上周抽空组了一个台式，前几天一直没水博客(不是)，一直在安装各种环境。正好安装到MySQL环境的时候，想着把他简单记录一下，发一下博客，带给大家。好了，话不多说让我们开始吧😎😎😎。

> 注意：这里简单粗暴，我是考虑到后面可能搭建集群，不想太麻烦，这里就考虑的是MySQL绿色版。

## 2.下载MySQL

1. 进入官网找到自己所需的安装包：[MySQL :: Developer Zone](https://dev.mysql.com/downloads/mysql/)，

2. 软件路径：DOWNLOAD–>MYSQL Community Downloads–>MYSQL on Windows

   ![image-20231114210613753](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142106816.png)



## 3.进行解压

可以看到这个就是我们刚下载的MySQL8.2压缩包

![image-20231114210820335](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142108365.png)

**解压zip压缩包至想要安装的目录，比如解压到 D:\mysql-8.2.0-winx64**

![image-20231114210908548](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142109588.png)



## 4.配置my.ini文件

**在解压目录**mysql-8.2.0-winx64中创建[MySQL配置文件](https://so.csdn.net/so/search?q=MySQL配置文件&spm=1001.2101.3001.7020)**my.ini**

![image-20231114211021710](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142110759.png)

配置文件**my.ini**内容如下

~~~sql
[mysqld]
# 设置3307端口
port=3307
# 设置mysql的安装目录
basedir=D:\\software\mysql-8.2.0-winx64
# 设置mysql数据库的数据的存放目录
datadir=D:\\software\MySQLData\mysql81\Data
# 允许最大连接数
max_connections=200
# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10
# 服务端使用的字符集默认为UTF8
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8

~~~

![image-20231114211304330](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142113395.png)

## 5.安装前准备

**以管理员身份打开命令行，切换到安装MySQL的目录下，再切换到bin目录下**

![image-20231114211353712](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142113850.png)

**然后切换到mysql的bin目录下**

## 6.开始安装

**执行MySQL初始化命令，如下：**

```sql
mysqld --initialize --console
```

![image-20231114211921649](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142119749.png)

**初始化完成后生成的用户名和密码（红框所示位置即为密码），即root用户和生成的密码，后续我们可以更改。**

**安装MySQL的服务mysqld，同样在bin目录下，执行MySQL服务安装命令 mysqld --install 服务名(不写的话默认服务名是mysql)**

```
mysql --install 你的服务名 (笔者这里设置为mysql81)
```

![image-20231114212101301](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142121328.png)

看到以下 `successfully`就表示已经成功了。

![image-20231114212134811](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142121834.png)

启动MySQL服务，命令为：net start mysql81。其中(停止服务：net stop mysql81 ，卸载服务：sc delete 服务名)

![image-20231114212230841](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142122873.png)

## 7.登录MySQL

**输入命令：mysql -u root -p ，（其中-u root表示用户名为root，-p表示登录密码）登录，然后提示输入密码，密位为先前初始化红框所示。**

![image-20231114212313845](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142123872.png)

密码填上刚才给我生成的密码。

![image-20231114213326123](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142133154.png)

可以看到，我们成功登录到系统中。

**由于自动生成的密码比较复杂，我们可以更改密码，更改密码命令为：**

```sql
ALTER USER root@localhost IDENTIFIED BY 'root';
```

**其中单引号内为更改后的密码**

![image-20231114213724064](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142137099.png)

**然后输入exit;命令退出mysql，重新登录mysql检验一下密码是否修改成功，**

![image-20231114213750818](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142137850.png)



## 8.远程测试

本地工作基本已经完成了，但是我们日常工作中是不会使用这个黑框框的。我们都会使用远程来数据库管理软件来操作我们的数据库。

笔者这里使用的是Navicat，大家自行选择即可，如果需要Navicat最新版可私信博主获取下载链接。

我们打开Navicat。

这里建立一个MySQL连接，然后填写密码和端口号。

![image-20231114214044324](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142140409.png)

首先点一下测试连接，看看是否正常。

![image-20231114214155185](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142141223.png)

可以看出来完全没有问题。![image-20231114214217888](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311142142924.png)

然后就进去了这个界面，发现我们的MySQL8安装已经完工啦！



## 9.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。

![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)