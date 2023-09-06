---
title: Git图文使用教程详解(一)
icon: circle-info
order: 1
category:
  - 工具
tag:
  - 工具
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---


## ✍、Git图文使用教程说明

- Git 版本： 2.31.0.windows.1
- IDEA版本：2021.1
- 主要记录 git 的常用命令、IDEA 集成 git、git与GitHub、IDEA 集成 GitHub、Gitee等(详细图文步骤记录)
- 配套视频参考：[【尚硅谷】5h打通Git全套教程](https://www.bilibili.com/video/BV1vy4y1s7k6?from=search&seid=12466209700058370854&spm_id_from=333.337.0.0)

## 🤠一、Git

### 😋1.1、概述

- Git是一个免费的、开源的分布式版本控制系统 ，可以快速高效地处理从小型到大型的各种项目
- Git易于学习，占地面积小，性能 极快 。 它具有廉价的本地 库 ，方便的暂存区域和多个工作
  流分支等特性。 其性能优于 Subversion、 CVS、 Perforce和 ClearCase等 版本控制 工具。
- 官网地址：http://git-scm.com/
  

### 🤗1.2、版本控制

- 版本控制是一种记录文件内容变化，以便来查阅特定版本修订情况的系统。
- 版本控制其实最重要的就是记录文件修改的历史记录，从而让用户能够查看历史版本，方便版本的切换。

#### 💬1.2.1、 为什么需要版本控制

>  个人开发过渡到团队协作。

### 🙈1.3、1.3、版本控制工具
- 集中式版本控制工具
  - CVS、SVN、VSS
  - 集中化的版本控制系统诸如 CVS、SVN 等，都有一个单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。多年以来，这已成为版本控制系统的标准做法。
  - 这种做法带来了许多好处，每个人都可以在一定程度上看到项目中的其他人正在做些什么。而管理员也可以轻松掌控每个开发者的权限，并且管理一个集中化的版本控制系统，要远比在各个客户端上维护本地数据库来得轻松容易。
  - 事分两面，有好有坏。这么做显而易见的缺点是中央服务器的单点故障。如果服务器宕机一小时，那么在这一小时内，谁都无法提交更新，也就无法协同工作。
    



- [分布式](https://so.csdn.net/so/search?q=分布式&spm=1001.2101.3001.7020)版本控制工具

  - Git、Mercurial、Bazaar、Darcs…… 

  - 像Git这种分布式版本控制工具 ，客户端提取的不 最新版本的文件快照，而是把代码仓库完整地镜像下

    来 (本地库) 。这 样 任何一处协同工作用的文件发生故障，事后都可以用其他客户端的本地仓库进行 恢

    复。因为每个客户端的每一次文件提取操作，实际上都是一次对整个文件仓库的完整备份 。

- 分布式的版本控制系统出现之后 ，解决了集中版本控制的的缺陷：

  - 服务器断网的情况下也是可以进行本地开发 ，因为版本的控制是在本地进行的。
  - 每个客户端保存的都是整个完整的项目，包含历史记录，更加安全。

![image-20220710213958534](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710213958534.png)

### 💯1.4、Git简史

![image-20220710214006840](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214006840.png)



### 💜1.5、Git工作机制

![image-20220710214014724](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214014724.png)



### 🌐1.6 Git和代码托管中心

> 代码托管中心是基于网络服务器的远程代码仓库，一般我们简单称为`远程库`。 



![image-20220710214026514](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214026514.png)

## 🍭二、Git安装

- [Git官网](http://git-scm.com/)

![image-20220710214037457](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214037457.png)



- 查看GNU协议，可以直接点击下一步。 

![image-20220710214054965](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214054965.png)



- 选择Git安装位置，要求是非中文并且没有空格的目录，然后下一步。 

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214100408.png" alt="image-20220710214100408" style="zoom:67%;" />



- Git选项配置，推荐默认设置，然后下一步。 

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214108013.png" alt="image-20220710214108013" style="zoom:67%;" />



- Git安装目录名，不用修改，直接点击下一步。

![image-20220710214138263](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214138263.png)



- Git的默认编辑器，建议使用默认的Vim编辑器，然后点击下一步。

![image-20220710214147301](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214147301.png)



- 默认分支名设置，选择让Git决定，分支名默认为master，下一步。 

![image-20220710214152677](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214152677.png)



- 修改Git的环境变量，选第一个，不修改环境变量，只在Git Bash里使用Git。

  ![image-20220710223659129](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710223659129.png)



- 选择后台客户端连接协议，选默认值OpenSSL，然后下一步。 

![image-20220710214158758](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214158758.png)



- 配置Git文件的行末换行符，Windows使用CRLF，Linux使用LF，选择第一个自动转换，然后继续下一步。 

![image-20220710214214294](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214214294.png)

- 选择Git终端类型，选择默认的Git Bash终端，然后继续下一步。 

![image-20220710214224086](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214224086.png)



- 选择Git pull合并的模式，选择默认，然后下一步。 

![image-20220710223728744](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710223728744.png)



- 选择Git的凭据管理器，选择默认的跨平台的凭据管理器，然后下一步。 

![image-20220710214232039](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214232039.png)



- 其他配置，选择默认设置，然后下一步。 

![image-20220710223812071](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710223812071.png)



- 实验室功能，技术还不成熟，有已知的bug，不要勾选，然后点击右下角的Install按钮，开始安装Git。 

![image-20220710214237990](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214237990.png)



- 点击Finsh按钮，Git安装成功！ 

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214246725.png" alt="image-20220710214246725" style="zoom:67%;" />



- 在Git Bash终端里输入git --version查看git版本，如图所示，说明Git安装成功。 

  ![image-20220710214254005](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214254005.png)



## 🌈三、Git常用命令

| **命令名称**                         | **作用**           |
| ------------------------------------ | ------------------ |
| git config --global user.name 用户名 | 设置用户签名       |
| git config --global user.eamil 邮箱  | 设置用户邮箱       |
| **git init**                         | **初始化本地库**   |
| **git status**                       | **查看本地库状态** |
| **git add 文件名**                   | **添加到暂存区**   |
| **git commit m " 日志信息 " 文件名** | **提交到本地库**   |
| **git reflog**                       | **查看历史记录**   |
| **git reset hard 版本号**            | **版本穿梭**       |

### 🚥3.1、设置用户签名

> 基本语法

````bash
git config --global user.name 用户名
git config --global user.email 邮箱
````

![image-20220710214312670](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214312670.png)



并且在自己 `C:\Users\manman` 下有个 `.gitconfig` 文件，打开里面就是我们设置的用户签名

**说明**：

签名的作用是区分不同操作者身份。用户的签名信息在每一个版本的提交信息中能够看到，以此确认本次提交是谁做的。**Git首次安装必须设置一下用户签名，否则无法提交代码**。

> 注意：这里设置用户签名和将来登录 GitHub（或其他代码托管中心）的账号没有任何关系。

### 🏅3.2、初始化本地库

基本语法：`git init`

![image-20220710214321189](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214321189.png)



### 🎹3.3、查看本地库状态

**基本语法**：`git status`

- 首次查看，工作区没有任何文件

![image-20220710221621358](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710221621358.png)

#### 📚3.3.1、新增文件

**语法**：`vim hello.txt` ,然后按 i 键进入 INSERT，要想复制粘贴 ，需要先按 esc 键，之后 `yy` 复制，`p` 粘贴

![image-20220710214330436](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214330436.png)



> 文件内容输入完毕，需要先按`:`,输入`wq`，然后才算完成新增文件，再次查看

![image-20220710214339664](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214339664.png)



### 🎁3.4、添加暂存区

#### 🍠3.4.1、将工作区的文件添加到暂存区

![image-20220710214352405](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214352405.png)



### 🚀3.5、提交本地库

### 🛸3.5.1、将工作区的文件提交到本地库

**基本语法**：`git commit -m "日志信息" 文件名`

![image-20220514113202750](https://cdn.jsdelivr.net/gh/gaoziman/bed/img/image-20220514113202750.png)



### ⚡3.6、修改文件

**语法**：`vim 文件名`

![image-20220710214400001](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214400001.png)



![image-20220710221711666](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710221711666.png)



### 🪁3.7、历史版本

#### 🎉3.7.1、查看历史版本

基本语法：

- `git reflog` 查看版本信息
- `git log` 查看版本详细信息

![image-20220710214408876](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214408876.png)



![image-20220710214419756](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214419756.png)



**但是我们工作区的 hello.txt 始终只有一个文件存在**

![image-20220710214429733](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214429733.png)



### 🦀3.7.2、版本穿梭

语法：`git reset --hard 版本号`

![image-20220710214437222](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214437222.png)



### ⏰ 3.8、切换版本原理

Git 切换版本，底层其实是移动的HEAD 指针，具体原理如下图所示

**HEAD 指针指向 master 分支，master分支指向 first 版本，**

![image-20220710214446181](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214446181.png)



**之后有了 second 版本，master 指针指向 second 版本**

![image-20220710214453766](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214453766.png)



**之后有了third 版本，master 指针指向 third 版本**

![image-20220710214502382](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214502382.png)



**如果我们想穿越回去，只需要让 master 指针指向 first 版本或者 second 版本**