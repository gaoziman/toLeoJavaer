---
title: 腾讯云服务器部署Hexo博客
icon: circle-info
order: 4
category:
  - 项目部署
tag:
  - 项目部署
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---




> 本文用来记录将`hexo`部署再轻量服务器上的过程，不论是已经有自己的主题准备迁移或者新建一个准备部署在轻量服务器，本教程都是适用的，博主并不是做相关方面的，因此本教程尽量简单实用，对于大佬可能帮助有限~其次这里并非一定要使用腾讯云服务器，其他家操作基本上都是一致的。
> 至于博客部署的历程参考 [这里](https://gaoziman.blog.csdn.net/article/details/124652412?spm=1001.2014.3001.5502)，记录了笔者从GitHub Page到自己服务器的选择与图床部署方案，可以进行参考。



## 环境准备



### 安装Git

打开服务器控制面板，**修改root密码**一定需要修改！，选择登录。

笔者这里选择的是使用`FinalShell`远程连接。

![image-20230711184431144](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307121008619.png)

**输入命令**

```bash
sudo su root
```

**然后安装Git**

```bash
yum install git
```

![image-20230711184601508](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307121008977.png)



### 创建git账户

```bash
adduser git
chmod 740 /etc/sudoers
vim /etc/sudoers
```

![image-20230711184728461](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307121008887.png)

添加`git ALL=(ALL) ALL`改回权限

~~~bash
chmod 400 /etc/sudoers
~~~



### 设置Git账户

~~~bash
sudo passwd git
~~~

设置的密码看不到，你直接输入就可以了。这里我设置的密码太简单了会有这样的提示。不用关心直接输入，看到成功提示即可。

![image-20230711184827812](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307121008481.png)

切换至 `git` 用户，创建 `~/.ssh` 文件夹和 `~/.ssh/authorized_keys` 文件，并赋予相应的权限

~~~bash
su git
mkdir ~/.ssh
vim ~/.ssh/authorized_keys
~~~

按”i” 进入编辑模式，将我们在 win11 中生成的 `id_rsa.pub` 文件中的公钥复制到 `authorized_keys` 中，按”`esc`”，然后按”:wq”，保存退出。

![image-20230711185023624](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307121008951.png)



接着，输入一下命令，**赋予权限**

~~~bash
chmod 600 /home/git/.ssh/authorized_keys
chmod 700 /home/git/.ssh
~~~

在本地 Git 终端中测试是否能免密登录 git，其中 SERVER 为填写自己的云主机 IP，执行输入 yes 后输入你之前配置的 git 密码，无报错就说明好了。

在电脑本地桌面，右键”Git Bash Here”，输入一下命令，其中 SERVER 填写自己的云主机 ip，执行输入 yes 后不用密码说明配置成功了。

~~~bash
ssh -v git@SERVER
~~~

![image-20230711185225978](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307121008268.png)

**说明已经连接成功了**

### 配置仓库与相关配置

返回服务端命令行切换到 `root` 账户

~~~bash
sudo su root
~~~

然后输入,赋予权限

~~~bash
mkdir /var/repo
chmod -R 755 /var/repo
chown -R git:git /var/repo/
~~~

创建一个新的库：

~~~bash
cd /var/repo
git init --bare hexo.git
~~~

创建一个新的 Git 钩子，用于自动部署。在 /var/repo/hexo.git 下，有一个自动生成的 [hooks](https://so.csdn.net/so/search?q=hooks&spm=1001.2101.3001.7020) 文件夹。我们需要在里边新建一个新的钩子文件 post-receive。

```bash
vim /var/repo/hexo.git/hooks/post-receive
```

进入编辑模式，然后将下面那两行代码粘贴进去，保存退出。

~~~bash
#!/bin/bash
git --work-tree=/www/wwwroot/hexo --git-dir=/var/repo/hexo.git checkout -f
~~~

新建一个文件用做网站的根目录，记得给权限。

~~~bash
mkdir /www/wwwroot/hexo
chmod -R 755 /www/wwwroot/hexo
chown -R git:git /www/wwwroot/hexo
~~~



## Nginx

我们使用宝塔面板来一键部署 Nginx关键是简单

~~~bash
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && bash install.sh
~~~

如果是腾讯云，个别会自带宝塔面板

![image-20230711185538503](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307121008566.png)

记得去服务器打开`8888`端口

复制上述地址即可。用户名与密码也有在用户面板中。
打开软件商店输入`Nginx`。选择免费的安装。等待安装结束。

![image-20230711185720875](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307121008798.png)

部署完成之后，点击网站，添加站点，填写你的域名（加上3w)，没有的话写你的服务器 ip 地址。根目录选我们之前建立的`/www/wwwroot/hexo`

![image-20230711185807954](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307121008889.png)

回到服务器终端，重启宝塔服务

~~~bash
service bt restart
~~~



## 部署

接下来需要将本地的生成好的/public推送到服务器。进入本地电脑 hexo 博客的根目录，编辑站点配置文件 _config.yml，找到 deploy，修改成以下

~~~yml
deploy:
  type: git
  #repo改为repo: git@域名:/var/repo/hexo.git
  repo: git@ip:/var/repo/hexo.git
  branch: master
~~~

然后使用

~~~bash
npm i  hexo-deployer-git  -- save
hexo clean
hexo generate
hexo deploy
~~~

要输入密码的时候就输入即可，然后打开IP查看

![image-20230711190024284](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307121008486.png)

`域名备案之后，可以直接绑定域名`