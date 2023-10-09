---
title: 华为云部署前后端分离项目
icon: circle-info
order: 1
category:
    - 项目部署
tag:
    - 项目部署
pageview: false
date: 2023-09-23
comment: false
breadcrumb: false
---





大家好，我是Leo🫣🫣🫣，上一篇我们 **从0了解到云服务器** 的一些基本概念和基本命令，没看的小伙伴可以先去看一下这一篇，[带你从0认识云服务器](https://blog.csdn.net/qq_58608526/article/details/132912154?spm=1001.2014.3001.5501) ，但是最近有粉丝朋友私信我说， “ Leo哥，我是一名Java后端程序员，在我看来，这个云服务器在手里也不能停留在只是一些基本概念和基本命令这个层面，能不能讲一讲如果把一个前后端分离项目部署到云服务器上面啊，好让我拿**去装装13** 😜😜😜”。这位朋友有这个想法确实不错，我们学习一个新东西，确实应该把他运用到我们实际的开发中，话不多说，让我们开始吧😎😎😎。



## 1. 服务器其他注意事项

> 在我们开始之前，我们还需要了解我们云服务器的一些其他知识点，那就是关于安全组，那到底是什么安全组呢，让我们一步一步来了解😎😎😎。



### 1.1 什么是安全组

**安全组是一个逻辑上的分组**，为具有相同安全保护需求并相互信任的云服务器、云容器、云数据库等实例提供访问策略。安全组创建后，用户可以在安全组中定义各种访问规则，当实例加入该安全组后，即受到这些访问规则的保护。

您可以在安全组中添加入方向规则和出方向规则，用来控制安全组内实例入方向和出方向的网络流量。一个实例可以关联多个安全组，多个安全组按照优先级顺序依次匹配。安全组序号越小，表示优先级越高。

如果您未创建任何安全组，那么在首次创建需要使用安全组的实例时（比如弹性云服务器），系统会自动为您创建一个默认安全组并关联至该实例。

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309152343193.jpg)

简单来说就是

**安全组是一种虚拟防火墙**，具备有状态的数据包过滤功能，用于设置云服务器、负载均衡、云数据库等实例的网络访问控制，控制实例级别的出入流量，是重要的网络安全隔离手段。 您可以通过配置安全组规则，允许或禁止安全组内的实例的出流量和入流量。



### 1.2 安全组的特点

- 安全组是一个逻辑上的分组，可以将同一节点或同一VPC网络内具有相同网络安全隔离需求的云服务器加到同一个安全组内。
- 同一安全组内的云服务器之间默认内网网络互通。
- 在没有设置允许访问的安全组规则的情况下，不同安全组内的云服务器默认内网不通。
- 安全组是有状态的，对于您已允许的入站流量，都将自动允许其流出，反之亦然。



### 1.3 安全组有什么作用

通过部署云服务器安全组，可以在同一地域的不同服务器之间实现内网互通与资源拷贝；当服务器被黑客操控，也可以通过修改远程端口以限制登录IP；另外，安全组还支持通过公网远程连接和管理服务器，用户可以通过HTTP、HTTPS服务访问到您的网站。



### 1.4 安全组的规则

了更好地管理安全组的入出方向，我们可以设置安全组规则，去控制云服务器的出入向流量。通过配置适当的规则，控制和保护加入安全组的弹性云服务器的访问。

- 安全组规则可分为入向规则和出向规则。入向规则用于控制流入服务器实例的流量，出向规则用于控制从服务器实例流出的流量。默认安全组会自带一些默认规则，您也可以自定义添加安全组规则。
- 安全组规则主要遵循白名单机制，具体说明如下：
    1. 入方向规则：入方向指外部访问安全组内的云服务器的指定端口。当外部请求匹配上安全组中入方向规则的源地址，并且授权策略为“允许”时，允许该请求进入，其他请求一律拦截。通常情况下，您一般不用在入方向配置授权策略为“拒绝”的规则，因为不匹配“允许”规则的请求均会被拦截。
    2. 出方向规则：出方向指安全组内的云服务器访问外部的指定端口。在出方向中放通全部协议和端口，配置全零IP地址，并且策略为“允许”时，允许所有的内部请求出去。0.0.0.0/0表示所有IPv4地址，::/0表示所有IPv6地址。

可以参考下面这张图

![image-20230915234753742](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309152347805.png)

**默认安全组规则如下：**

![image-20230915234835212](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309152348362.png)

在我们的云耀服务器详情页面可以找到安全组配置

![image-20230915235309594](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309152353693.png)



### 1.5 关于安全组的一些建议

以下是一些关于安全组的建议和实践经验，帮助确保您的云环境的安全性，可以根据具体需求和环境来制定适合的安全组策略：

- 原则上，安全组规则取最小权限原则，通过设置所需的端口和协议，限制对必要IP地址的访问。只允许最少必要的流量进出您的资源实例。
- 定期更新安全组规则，以适应您的业务需求的变化。不再需要的规则应被删除，根据业务变化添加新的安全组规则。
- 根据资源的安全需求，将资源实例划分为不同的安全组。通过多层级的安全组可以实现细粒度的安全控制，确保安全性与灵活性之间的平衡。
- 通过有规范的命名等方式有意识地规划和管理安全组规则，易于查找。
- 安全组应与其他安全措施如网络ACL、防火墙等结合使用，以提供更全面的安全保护。
- 建议您不要直接修改线上环境使用的安全组，修改后的安全组会自动应用在安全组内的所有云服务器上，因此您可以先克隆一个安全组，在测试环境中进行调试，确保修改后云服务器之间的通讯正常，再将修改后的安全组同步到线上环境。



## 2. 项目选择

由于时间关系我们这里就以**Github**优秀的开源项目为例作为我们本次测评的项目。于是Leo也是淦了一夜，在Github上面找到了一个非常适合咱们Java程序员的前后端分离项目，非常的好上手，即使你对这个项目还不了解，但是没关系，只需要跟着我的步骤，一步一步也能实现把项目部署到云服务器，让大家可以去访问，话不多说，现在就进入我们今天的正题，年度最热前后端分离项目 。



### 2.1 基本介绍

那就是 **Ruoyi-Vue**，相信对开源有了解的朋友们一定对他有所了解，一个基于**SpringBoot**的权限管理系统，完全的响应式布局。



![image-20230916083644637](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309160836763.png)



### 2.2 丰富的生态系统

并且使用了主流的**完善生态系统以及**完善**生态系统** ，比如`Bootstrap多模块版本`，`前后端分离版本`，`微服务版本`，`uniap版本`，本文选择的是**前后端分离版本**。

![image-20230916083748242](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309160837374.png)



### 1.3 丰富的拓展组件

![image-20230916084154088](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309160841177.png)



### 1.4 详细的文档

这里提供了详细的文档，一些项目中的组件介绍，环境部署都有详细的说明，甚至还有一些**插件集成**，感兴趣的小伙伴们动手去看看，这对你上手一个开源项目是非常重要的一点。

![image-20230916084224427](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309160842551.png)



## 3. 部署过程

### 3.1 拉取项目

我们首先去**Github** 把项目拉下来，这里我把地址贴出来，方便小伙伴们直达哈

[前台Vue3](https://github.com/yangzongzhuan/RuoYi-Vue3)

[后台Maven聚合](https://github.com/yangzongzhuan/RuoYi-Vue/tree/master)

这里我们前端使用的是Vue3版本，目前Vue3已逐渐普及在企业中，我觉得非常有必要学习一下Vue3，有Vue2基础的同学基本看看api文档就可以很快入手了。有需要的小伙伴可以通过我这一篇博客进行学习 [Vue3](https://blog.csdn.net/qq_58608526/article/details/131800454?spm=1001.2014.3001.5501)



### 3.2 开始配置环境

我们把项目拉取到本地之后，后端项目使用**IDEA**开发工具打开，前段Vue3项目我是通过 **Webstrom** 进行打开，当然使用 **Vscode** 也是一样，工具嘛，适合自己就是最好的，记住一句话，工具永远是来服务你的，而是为了一个学习工具让你成为它的奴隶。



#### 1. 前端安装依赖

前端在根目录使用 npm install 命令进行安装依赖

进入项目

```bash
cd RuoYi-Vue3
```

```bash
 npm install
```

![image-20230916105447073](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161054528.png)

然后就可以启动我们前端的服务了

```bash
npm run dev
```

浏览器打开 http://localhost:80 即可看到前端登录页面

![image-20230916112430729](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161124709.png)



#### 2. 后端配置Maven依赖

后端进入之后首先进入设置界面 ，对我们本地Maven进行配置，如果本地没有安装Maven的同学也可以使用IDEA自带的Maven3，当时有需要安装配置Maven的可以通过我这一篇博客进行学习，[最详细的Maven安装及配置](https://blog.csdn.net/qq_58608526/article/details/129547081?spm=1001.2014.3001.5501)

![image-20230916105719048](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161057254.png)



#### 3. 导入数据库

![image-20230916105932523](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161059900.png)

![image-20230916110028977](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161100317.png)

我们可以再sql文件中找到 `ry_20230706.sql`文件，并且在 `ruoyi-admin` 这一模块中的 **application-durid.yml** 的配置文件中找到数据库中的配置。

于是我们启动我们的`Navicat` 中新建一个ry-vue的数据库，记住这里一定要和配置文件中的数据库名称一一对应，不然项目启动的时候会找不到数据库名称报错。

![image-20230916110326010](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161103084.png)

然后把我们的 `ry_20230706.sql` 导入数据库中即可。

![image-20230916110502086](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161105133.png)

这样就大功告成了！

后端启动RuyiApplication启动类即可。

![image-20230916112626297](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161126433.png)

![image-20230916112732564](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161127693.png)

即可进行登录到我们的页面。



### 3.3 服务器部署

以上我们演示了关于本地进行部署前后端分离项目，但是我们今天的主题是把它部署到我们的华为云服务器上，公网上让大家都可以进行访问。



#### 1. Docker环境安装

##### 1.1 Centos安装Docker

##### 1.2  卸载（可选）

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



##### 1.3 安装Docker

1. 如果使用的是虚拟机，首先需要[虚拟机联网](https://so.csdn.net/so/search?q=%E8%99%9A%E6%8B%9F%E6%9C%BA%E8%81%94%E7%BD%91&spm=1001.2101.3001.7020) 安装yum工具

```bash
yum install -y yum-utils \
           device-mapper-persistent-data \
           lvm2 --skip-broken
```

2. 安装Docker的依赖库。

```powershell
yum install -y yum-utils device-mapper-persistent-data lvm2
```

3. 添加Docker CE的软件源信息。

```powershell
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

4. 安装Docker CE。

```powershell
yum makecache fast
yum -y install docker-ce
```



**docker-ce为社区免费版本。稍等片刻，docker即可安装成功。**



##### 1.4 启动Docker

1. **启动docker前，一定要关闭防火墙 (这里如果使用的是云服务器可以不用设置)**

```bash
# 关闭
systemctl stop firewalld

# 禁止开机启动防火墙
systemctl disable firewalld

#查看是否关闭防火墙
systemctl status firewalld

```

2. 通过命令启动docker

```bash
# 启动docker服务
systemctl start docker

# 停止docker服务
systemctl stop docker 

# 重启docker服务
systemctl restart docker  
```

3. 查看我们docker的版本

```bash
docker --version	
```

![image-20230916115232525](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161152589.png)

到这里，Docker安装完毕。



#### 2. 其他服务安装

> 部署若依前后端分离版 需要安装MySQL、Redis、Nginx



##### 2.1 Dcoker安装MySQL

###### 1. 拉取镜像

```java
docker pull mysql:8.0
```



###### 2. 查看是否拉取成功

```java
docker images
```

如下便是拉取成功
![image-20230916120037301](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161200371.png)



###### 3. 创建文件夹(配置、数据等)

```java
mkdir -p /work/docker/mysql/conf
mkdir -p /work/docker/mysql/data
mkdir -p /work/docker/mysql/log
```

**创建配置文件**

```java
创建文件：/work/docker/mysql/conf/my.cnf
命令： touch /work/docker/mysql/conf/my.cnf
```

**内容如下：**

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

**启动容器**

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

> –privileged=true
> 设置MySQL 的root用户权限, 否则外部不能使用root用户登陆。
> -e MYSQL_ROOT_PASSWORD=123456
> 设置MySQL数据库root用户的密码



###### 4. 查看启动后的容器

```java
docker ps
```

![image-20230916120452989](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161204054.png)



###### 5. 设置密码等

>  实际原来的root仍然有效，只不过只能localhost机器能用（在MySQL服务器上的mysql命令直连时可以使用）Navicat不能用。



**1.进入容器内部**

```java
docker exec -it mysql8 /bin/bash
```



**2.连接mysql**

```java
mysql -u root -p
```

![image-20230916120533405](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161205469.png)
输入前边设置的密码：root，然后回车。



**3.修改访问主机以及密码**

设置为所有主机可访问

```java
ALTER USER 'root'@'%' IDENTIFIED BY '新密码';
```

[Mysql8](https://so.csdn.net/so/search?q=Mysql8&spm=1001.2101.3001.7020).0 默认采用 caching-sha2-password 加密，有可能旧的客户端不支持，可改为 mysql_native_password;

```java
CREATE USER 'root'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY '222333';
```



**4.刷新权限**

```java
FLUSH PRIVILEGES;
```

**完工！！！**



**5. 我们可以Navicat 远程连接**

![image-20230916120809646](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161208775.png)

![image-20230916120820351](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161208423.png)



##### 2.2 Docker安装Redis

```java
1. 拉取redis镜像
# 不指定版本号，默认拉取最新版的redis 
docker pull redis
# 指定的版本号 docker pull redis:5.0.14
# 查看镜像是否拉取成功docker images

2. 运行redis
# 带密码认证的redis，登录时需要输入验证码  appendonly（redis是否持久化）
docker run --name redis -p 6379:6379 -d --restart=always redis redis-server --appendonly yes --requirepass Leo666

# 不带密码认证的redis
docker run --name redis -p 6379:6379 -d --restart=always redis redis-server --appendonly yes
```



##### 2.3 Docker安装Nginx

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



#### 3. 部署若依项目

##### 3.1 连接远程服务器

这里我使用的是MobalXterm，具体连接操作步骤就不多叙述了。



##### 3.2 若依前端部署

打开dos窗口，进入 Ruoyi-Vue3文件夹，并对前端代码进行打包,生成一个dist文件夹，这就是前端代码打包后的文件

```bash
npm run build:prod
```

![image-20230916114203235](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161142353.png)

将打包好的 **dist文件夹** 通过 `MobalXterm`上传到 /**home/nginx/html** 中

![image-20230916130527657](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161305748.png)

进入**/home/nginx/conf/conf.d** 目录中，新建 **ruoyi-vue3.conf**，添加以下内容

```bash
cd  /home/nginx/conf/conf.d
touch ruoyi-vue3.conf
```

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
}

```

注意： 这里有几个地方需要更改，这非常重要

我们进入到我们的 **ruoyi-vue3.conf** 的配置文件

![image-20230916155714955](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161557092.png)



打开谷歌浏览器，输入ip 地址访问

![image-20230916130949765](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161309689.png)

到这一步，我们服务器部署前端部分就完成了。



##### 3.3 若依后端部署

下面我需要改造一下我们后端代码，在此之前我们的数据库以及我们的Redis都是运行在我们本地，现在我们所有的服务器都是云服务器上面，所以我们需要对我们的 **application.yml** 配置文件进行更改。

**修改数据库配置**

![image-20230916131333914](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161313022.png)

**修改Redis配置**

![image-20230916131531220](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161315383.png)



**打包后端代码 jar包**

熟练Java项目开发的，可以直接通过InteliJ IDEA或者eclipse软件打jar包。不熟悉的有第二种方法，是若依提供的。进入下载的项目文件夹中的bin目录下，直接双击执行 **package.bat**，它会直接在项目中生成target文件夹，里面包含以及打包好的jar包。我们要使用的是ruoyi-admin文件夹下的target里的jar包。运行 package.bat 需要Maven环境>=3.0，操作顺序如下图：

![image-20230916131712497](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161317594.png)

打包之后我们可以再ruoyi-admin包下面的的 target目录找到 这个jar包 ，把他上传到服务器即可。

![image-20230916131816985](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161318079.png)



再上传到服务器之前，我们还有一个很重要的事情需要做，那就是我们的 **安全组**，我们需要开放对MySQL 3306端口，Redis 6379端口以及我们若依后台项目的端口8080。下面我进入华为云详情页面的安全组管理，并添加规则。

![image-20230916132540947](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161325063.png)

![image-20230916132624469](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161326544.png)



1. 将打包好的jar包通过MobalXterm上传至/opt/project 目录（project目录需要自己手动创建）

```bash
mkdir /opt/project
```

2. 编写DockerFile 文件

```bash
vim Dockerfile
```

```java
FROM openjdk:8
ADD ruoyi-admin.jar ruoyi-admin.jar
EXPOSE 8035
ENTRYPOINT ["java","-jar","ruoyi-admin.jar"]
```

将上面这些复制到Dockerfile即可

`注意` ： **DockerFile文件和jar包放在同一目录下**

3. 将项目挂载到docker镜像中 后面有个点. 千万不要忘记复制

```bash
docker build -t ruoyi-admin.jar .
```

4. 运行docker镜像

```bash
docker run -d -p 8080:8080 --name ruoyi-admin.jar ruoyi-admin.jar
```

5. 成功部署效果图

![image-20230916155801093](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309161558255.png)



## 4. 总结

以上便是本次教程的全部内容，可以看出来我们使用Docker容器化部署，让我们部署项目更加快捷，小伙伴还在犹豫什么，赶紧行动起来！部署方面有什么问题欢迎跟我评论区留言😎😎😎！
