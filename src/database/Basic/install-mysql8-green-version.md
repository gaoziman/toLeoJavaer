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


> 今天记录一下MySQL 8.0 绿色版安装过程，简单粗暴。

## 一、下载MySQL

1. 进入官网找到自己所需的安装包：[MySQL :: Developer Zone](https://dev.mysql.com/)，

2. 软件路径：DOWNLOAD–>MYSQL Community Downloads–>MYSQL on Windows 

   

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230308152917146.png" alt="image-20230308152917146" style="zoom:80%;" />

## 二、解压



**解压zip压缩包至想要安装的目录，比如解压到 D:\mysql-8.0.32-winx64**

![image-20230308153548884](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230308153548884.png)



## 三、配置my.ini文件

**在解压目录**D:\mysql-8.0.29-winx64中创建[MySQL配置文件](https://so.csdn.net/so/search?q=MySQL配置文件&spm=1001.2101.3001.7020)**my.ini**

![image-20230308153653898](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230308153653898.png)

配置文件**my.ini**内容如下

~~~sql
[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=D:\Program Files\DataBase\MySql\mysql8.0  
# 设置mysql数据库的数据的存放目录
datadir=D:\Program Files\DataBase\MySql\mysql8.0\Data  
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

## 四、运行准备

**以管理员身份打开命令行，切换到安装MySQL的目录下，再切换到bin目录下**

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230308154130024.png" alt="image-20230308154130024" style="zoom:80%;" />

**然后切换到mysql的bin目录下**

![image-20230308163450092](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230308163450092.png)





## 五、安装

**执行MySQL初始化命令 mysqld --initialize --console**

![image-20230308163623315](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230308163623315.png)

**初始化完成后生成的用户名和密码（红框所示位置即为密码），即root用户和生成的密码，后续我们可以更改。**



**安装MySQL的服务mysqld，同样在bin目录下，执行MySQL服务安装命令 mysqld --install 服务名(不写的话默认服务名是mysql)**

![image-20230308163714601](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230308163714601.png)

`因为我这里先前已经安装了，这里只是展示一下`。

启动MySQL服务，命令为：net start mysql80。其中(停止服务：net stop mysql80 ，卸载服务：sc delete 服务名)

![image-20230308163746873](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230308163746873.png)

## 六、登录MySQL

**输入命令：mysql -u root -p ，（其中-u root表示用户名为root，-p表示登录密码）登录，然后提示输入密码，密位为先前初始化红框所示。**

![image-20230308163817166](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230308163817166.png)

**由于自动生成的密码比较复杂，我们可以更改密码，更改密码命令为：alter user root@’localhost’ identified by ‘xsq!@123’; 其中单引号内为更改后的密码。**

![image-20230308163834647](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230308163834647.png)

**然后输入exit;命令退出mysql，重新登录mysql检验一下密码是否修改成功，**

![image-20230308164103186](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230308164103186.png)