---
title: Docker部署前后端分离项目
icon: circle-info
order: 1
category:
    - 项目部署
tag:
    - 项目部署
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---


## 1. Docker环境安装

### 1.1 Centos安装Docker

### 1.2  卸载（可选）

如果之前安装过旧版本的Docker，可以使用下面命令卸载：

```java
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine \
                  docker-ce
```

### 1.3 安装Docker

1. 如果使用的是虚拟机，首先需要[虚拟机联网](https://so.csdn.net/so/search?q=%E8%99%9A%E6%8B%9F%E6%9C%BA%E8%81%94%E7%BD%91&spm=1001.2101.3001.7020) 安装yum工具

```bash
yum install -y yum-utils \
           device-mapper-persistent-data \
           lvm2 --skip-broken
```

2. 更新本地镜像源并设置Docker镜像源

```bash
# 设置docker镜像源
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

yum makecache fast
```

3. 输入命令，安装Docker

```java
yum install -y docker-ce
```

**docker-ce为社区免费版本。稍等片刻，docker即可安装成功。 **

### 1.4 启动Docker

1. **启动docker前，一定要关闭防火墙 (这里如果使用的是云服务器可以不用设置)**

```java
# 关闭
systemctl stop firewalld

# 禁止开机启动防火墙
systemctl disable firewalld

#查看是否关闭防火墙
systemctl status firewalld

```

2. 通过命令启动docker

```java
# 启动docker服务
systemctl start docker

# 停止docker服务
systemctl stop docker 

# 重启docker服务
systemctl restart docker  
```

## 2. 其他服务安装

:::info
部署若依前后端分离版 需要安装MySQL、Redis、Nginx
:::

### 2.1 Dcoker安装MySQL

#### 1. 拉取镜像

```java
docker pull mysql:8.0
```

#### 2. 查看是否拉取成功

```java
docker images
```

如下便是拉取成功
![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112125493.png)

#### 3. 创建文件夹(配置、数据等)

```java
mkdir -p /work/docker/mysql/conf
mkdir -p /work/docker/mysql/data
mkdir -p /work/docker/mysql/log
```


创建配置文件

```java
创建文件：/work/docker/mysql/conf/my.cnf
命令： touch /work/docker/mysql/conf/my.cnf
```

内容如下：

```java
[client]
default-character-set=utf8mb4
 
[mysql]
default-character-set=utf8mb4
 
[mysqld]
#服务端口号 默认3306
port=3306
 
datadir = /work/docker/mysql/data
 
init_connect='SET NAMES utf8mb4'
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
 
# 最大连接数
max_connections=200
 
# 连接失败的最大次数。防止有人从该主机试图攻击数据库系统
max_connect_errors=20
 
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

#### 
启动容器

```java
docker run -p 3306:3306  \
--name mysql8 \
--privileged=true \
-v /work/docker/mysql/log:/var/log/mysql \
-v /work/docker/mysql/data:/var/lib/mysql \
-v /work/docker/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:8.0
```

:::info
–privileged=true
设置MySQL 的root用户权限, 否则外部不能使用root用户登陆。
-e MYSQL_ROOT_PASSWORD=123456
设置MySQL数据库root用户的密码
:::

#### 4. 查看启动后的容器

```java
docker ps
```

![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112125839.png)

#### 5. 设置密码等

:::info
 实际原来的root仍然有效，只不过只能localhost机器能用（在MySQL服务器上的mysql命令直连时可以使用）Navicat不能用。
:::

##### **1.进入容器内部**

```java
docker exec -it mysql8 /bin/bash
```

##### **2.连接mysql**

```java
mysql -u root -p
```

![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112125864.png)
输入前边设置的密码：root，然后回车。

##### **3.修改访问主机以及密码**

设置为所有主机可访问

```java
ALTER USER 'root'@'%' IDENTIFIED BY '新密码';
```

[Mysql8](https://so.csdn.net/so/search?q=Mysql8&spm=1001.2101.3001.7020).0 默认采用 caching-sha2-password 加密，有可能旧的客户端不支持，可改为 mysql_native_password; 

```java
CREATE USER 'root'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY '222333';
```

##### **4.刷新权限**

```java
FLUSH PRIVILEGES;
```

**完工！！！**

### 2.2 Docker安装Redis

```java
1. 拉取redis镜像
# 不指定版本号，默认拉取最新版的redis 
docker pull redis
# 指定的版本号 docker pull redis:5.0.14
# 查看镜像是否拉取成功docker images

2. 运行redis
# 带密码认证的redis，登录时需要输入验证码  appendonly（redis是否持久化）
docker run --name redis -p 6379:6379 -d --restart=always redis redis-server --appendonly yes --requirepass cisyam

# 不带密码认证的redis
docker run --name redis -p 6379:6379 -d --restart=always redis redis-server --appendonly yes
```


### 2.3 Docker安装Nginx

```java
# 拉取nginx
docker pull nginx:1.18

# 挂载文件 本地路径
mkdir	-p /home/nginx/conf
mkdir	-p /home/nginx/log
mkdir	-p /home/nginx/html
# 挂载
# 生成容器
docker run --name nginx -p 80:80 -d nginx:1.18
docker run --name nginx -p 100:80 -d nginx:1.18

# 将容器nginx.conf文件复制到宿主机
# 将容器conf.d文件夹下内容复制到宿主机
# 将容器中的html文件夹复制到宿主机

docker cp nginx:/etc/nginx/nginx.conf /home/nginx/conf/nginx.conf
docker cp nginx:/etc/nginx/conf.d /home/nginx/conf/conf.d
docker cp nginx:/usr/share/nginx/html /home/nginx/
#卸载
docker rm -f nginx
#真实安装
docker run \
-p 80:80 \
--name nginx \
-v /home/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /home/nginx/log:/var/log/nginx \
-v /home/nginx/html:/usr/share/nginx/html \
-d nginx:1.18
——————————————————————————————
docker run \
-p 100:80 \
--name nginx \
-v /home/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /home/nginx/log:/var/log/nginx \
-v /home/nginx/html:/usr/share/nginx/html \
-d nginx:1.18
```

## 3. 部署若依

### 3.1 下载若依源码

若依前后端项目地址：[https://gitee.com/y_project/RuoYi](https://gitee.com/y_project/RuoYi)
将项目下载或者git clone到本地并解压 
**ruoyi-ui文件夹是前端项目，其余为后端项目**

### 3.2 远程连接服务器

这里我使用的是FinalShell，具体连接操作步骤 这里不做叙述

### 3.3 若依前端部署

打开dos窗口，进入ruoyi-ui文件夹，并对前端代码进行打包,生成一个dist文件夹，这就是前端代码打包后的文件 

```bash
npm install --unsafe-perm --registry=https://registry.npm.taobao.org
npm run build:prod
```

也可以进入ruoyi-ui -> bin目录中 双击鼠标运行build.bat文件
将dist文件夹通过FinalShell上传到/home/nginx/html中
进入/home/nginx/conf/conf.d目录中，新建cisyam-ui.conf，添加以下内容
![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112125771.png)

```bash
server {
    listen       80;
    listen  [::]:80;
    server_name  110.42.223.238;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root    /usr/share/nginx/html/dist; 
        index  index.html index.htm;
				try_files $uri $uri/ /index.html;
    }

  location /prod-api/{
	    proxy_set_header Host $http_host;
	    proxy_set_header X-Real-IP $remote_addr;
	    proxy_set_header REMOTE-HOST $remote_addr;
	    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	    proxy_pass http://110.42.253.238:8686/;
	 }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}

```

打开谷歌浏览器，输入ip地址访问
![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112125280.png)


### 3.4  若依后端部署

1. 导入若依数据库 

2. 修改项目中ruoyi-admin中的application.yml，application-druid.yml两个文件
   （1）在application.yml中，修改redis的信息，分别为host地址（你的服务器ip），port端口号（你的redis开放的端口号，一般为6379），password密码（你的redis的密码）。
   （2） 在application-druid.yml中，修改mysql的信息，url的中间填写访问mysql的 ip:端口号，例如：114.115.164.15:3306；username填你的mysql用户名；password填你的mysql密码。 

3. 尝试运行后端项目可以通过InteliJ IDEA或者eclipse软件来运行这个java后端项目，前提是你运行的本机上应该也具备一定的环境，jdk至少是1.8，以及本地8080端口（用于后端）已开启且未被占用。其他的例如mysql，redis可以直接通过服务器ip+端口号远程访问，不需要在本机上配置。
   出现下方图片所示LOGO表示启动成功，可以开始打包后端代码。如果未成功，检查报错，查看是否关于mysql，redis的（如果是，则可能是这两个没有在你的服务器上配置好或者刚才修改的信息出错了，例如账号，密码不对，或者远程连接未成功，导致本机无法远程访问等等），如果是关于8080端口，可能是由于你本机有程序以及占用了8080端口，这个基本上就不是什么问题，部署到服务器后只要服务器8080端口可用就行。接下来可以直接打包代码。
   
4. 打包后端代码jar包
   熟练java项目开发的，可以直接通过InteliJ IDEA或者eclipse软件打jar包。不熟悉的有第二种方法，是若依提供的。进入下载的项目文件夹中的bin目录下，直接双击执行package.bat，它会直接在项目中生成target文件夹，里面包含以及打包好的jar包。我们要使用的是ruoyi-admin文件夹下的target里的jar包。运行package.bat需要marven环境>=3.0，操作顺序如下图：

   ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112124302.png)
    ![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112124258.png)

5. 将打包好的jar包通过FinalShell上传至/opt/project 目录（project目录需要自己手动创建） 

6. 编写DockerFile 文件 

```bash
vim Dockerfile
```

**DockerFile文件和jar包放在同一目录下** 

7.  将项目挂载到docker镜像中 后面有个点. 千万不要忘记复制 

```bash
docker build -t cisyam-admin.jar .
```


8.  运行docker镜像 

```bash
docker run -d -p 8686:8686 --name cisyam-admin.jar cisyam-admin.jar
```


9.  成功部署效果图
     ![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112124780.png)