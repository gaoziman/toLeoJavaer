---
title: 宝塔部署前后端分离项目
icon: circle-info
order: 3
category:
  - 项目部署▶️
tag:
  - 项目部署▶️
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---


## 安装宝塔面板

1. 执行以下命令进行安装：

CentOS7/8:

```bash
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install-ubuntu.sh && sh install.sh
```

Ubuntu18.04/20.04:

```bash
wget -O install.sh http://download.bt.cn/install/install_6.0.sh && bash install.sh
```

2. 安装过程中会提示输入数据库密码等信息，根据提示输入即可。
3. 安装完成后，在浏览器中输入服务器 IP 地址并访问，即可看到宝塔面板的登录界面。

## 宝塔安装软件

安装MySQL，傻瓜式安装，直接点点点
安装之后使用远程软件连接服务器MySQL会报错
:::info

> 1130-host ‘..‘ is not allowed to connect to this MySql 



### 在服务器命令行中登录MySQL

```bash
mysql -u root -p 

use mysql;
```

### 查看用户表user数据

```bash
select Host, User,Password from user;      #其中Password为数据库进入密码
```

### 修改用户表user的host

```bash
update user set Host='%' where User='root';
flush privileges;
```

这样即可成功！！！

:::info
还需安装其他软件 
Java项目管理器(下载之后随便安装一个Tomcat即可获得Java环境) 
Redis 安装完毕之后配置 所有都可访问 0.0.0.0 以及配置Redis密码(必需)
Nginx 首先安装完毕 具体配置后面进一步概述
:::

## 运行jar部署后端

打包后端代码jar包
熟练java项目开发的，可以直接通过InteliJ IDEA或者eclipse软件打jar包。不熟悉的有第二种方法，是若依提供的。进入下载的项目文件夹中的bin目录下，直接双击执行package.bat，它会直接在项目中生成target文件夹，里面包含以及打包好的jar包。我们要使用的是ruoyi-admin文件夹下的target里的jar包。运行package.bat需要marven环境>=3.0，操作顺序如下图：
然后通过下面命令进行运行jar包
:::info
我这里是/home目录下面
:::

```java
nohup java -jar xxxxx   &
```

运行完毕之后，可以在当前运行jar的目录，通过下面命令来看运行的控制台输出。

```java
tail -f nohup.out
```

![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112127512.png)

:::info
这里我们的后端就部署成功了
:::

## 填写NGINX配置部署前端

打开dos窗口，进入ruoyi-ui文件夹，并对前端代码进行打包,生成一个dist文件夹，这就是前端代码打包后的文件 

```bash
npm install --unsafe-perm --registry=https://registry.npm.taobao.org
npm run build:prod
```

也可以进入ruoyi-ui -> bin目录中 双击鼠标运行build.bat文件
打包后，会生成一个dist文件夹，如图所示：
![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112127008.png)
我们需要通过Xftp将dist文件夹拷贝到我们购买云服务器的一个目录，我这里将其dist文件夹拷贝到home目录门，如下：
![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112127629.png)

**到这里我们去宝塔面板配置Linux面板的NGINX配置。**

找到NGINX配置修改处，如图：
![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112127477.png)

**填入下面的配置，前端就算是配置完毕：**

```java
user  www;

worker_processes auto;

error_log  /www/wwwlogs/nginx_error.log  crit;

pid        /www/server/nginx/logs/nginx.pid;

worker_rlimit_nofile 51200;



events

    {
        use epoll;
        worker_connections 51200;
        multi_accept on;
    }

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    client_max_body_size 100m;


    #用于tomcat反向代理,解决nginx 504错误

    proxy_connect_timeout 7200; #单位秒

    proxy_send_timeout 7200; #单位秒

    proxy_read_timeout 7200; #单位秒

    proxy_buffer_size 16k;

    proxy_buffers 4 64k;

    proxy_busy_buffers_size 128k;

    proxy_temp_file_write_size 128k;

    # ps:以timeout结尾配置项时间要配置大点


    server {
        listen       80;
        server_name  110.42.253.238;
charset utf-8;


location / {
            root   /home/dist;
			try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }

location /prod-api/ {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://110.42.253.238:8765/;

}

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }
}
```

