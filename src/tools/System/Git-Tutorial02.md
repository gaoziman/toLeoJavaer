---
title: Git图文使用教程详解(二)
icon: circle-info
order: 2
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

## 💻一、Git分支

### 🎯1.1、什么是分支

- 在版本控制过程中， 同时推进多个任务， 为每个任务， 我们就可以创建每个任务的单独分支。
- 使用分支意味着程序员可以为自己的工作从开发主线上分离开来， 开发字迹分支的时候 ， 不会影响主线分支的运行。
- 对于初学者而言，分支可以理解为副本，一个分支就是一个简单的副本。

### 🪀1.2、分支的好处

- 同时并行推进多个分支的开发，提高开发效率。
- 各个分支在开发的过程中，如果一个分支开发失败，不会对其他分支造成任何影响。失败的分支删除重新开始就可以了。

### 🎾1.3、分支的操作

|    **命令名称**     |           **作用**           |
| :-----------------: | :--------------------------: |
|  git branch 分支名  |           创建分支           |
|    git branch -v    |           查看分支           |
| git checkout 分支名 |           切换分支           |
|  git merge 分支名   | 把指定的分支合并到当前分支上 |



#### 📌1.3.1、查看分支

**基本语法**：`git branch -v`



![image-20220710214519755](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214519755.png)



#### 📍1.3.2、创建分支

**基本语法**：`git branch 分支名`

![image-20220710214528919](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214528919.png)



#### ✂️1.3.3、切换分支

**基本语法**:`git checkout 分支名`

![image-20220710214542747](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214542747.png)



#### 🧲1.3.4、修改分支

![image-20220710214551030](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214551030.png)



#### 📍1.3.5、合并分支

**基本语法**：`git merge 分支名`

##### ①正常合并不冲突

![image-20220514150726818](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214557869.png)

![image-20220514150726818](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214605189.png)

##### ②合并产生冲突

**冲突产生的原因**：

- 合并分支时，两个分支在同一个文件的同一个位置有两套完全不同的修改。
- 有两套完全不同的修改。 Git无法替我们决定使用哪一个。必须 人为决定新代码内容。

例如，我们首先在 master 分支的倒数第二行进行修改，并将其添加到暂存区，再提交到本地库




![image-20220710214617367](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214617367.png)

**接着，我们去 hot-fix 分支的倒数第一行进行修改，并将其添加到暂存区，再提交到本地库**

![image-20220710214717527](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214717527.png)

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214625198.png)

**之后我们在 master 分支上合并 hot-fix 分支，发现产生冲突**

![image-20220710214730236](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214730236.png)

> 解决冲突

1. 编辑有冲突的文件，删除特殊符号，决定要使用的内容

   特殊符号：`<<<<<< HEAD` 当前分支的代码 `=======` 合并过来的代码 `>>>>>>>hot-fix`

![image-20220710214738708](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214738708.png)



<img src="https://cdn.jsdelivr.net/gh/gaoziman/bed/img/image-20220514152453845.png" alt="image-20220514152453845" style="zoom:67%;" />

**删除完成之后保存，再次添加到暂存区，并再次提交到本地库**(`注意：此时使用 git commit 命令时候不能带文件名)`

![image-20220710214744846](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214744846.png)

![image-20220710214753959](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214753959.png)



## 🔍二、Git团队协作机

### 🏓2.1、团队内协作

![image-20220710214800695](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214800695.png)



**举个例子**：

岳不群首先用 git 初始化自己的本地库，写了一套华山剑法，

利用push 命令将自己的本地库推送到代码托管中心(Github、Gitee)，

大弟子令狐冲通过 clone 克隆命令完整的复制到自己的本地库，

令狐冲修改两招之后将自己的本地库再次 push 到代码托管中心，

这样岳不群就可以通过 pull 命令拉取令狐冲修改的代码 来更新自己的本地库。

### 💗2.2、跨团队协作

![image-20220710214806720](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214806720.png)



令狐冲请东方不败改代码，东方不败通过 fork 命令从岳不群的的远程库中拿取代码，

再通过 clone 克隆命令到自己的本地库，修改完成后使用 push 推送到在自己的远程库，

使用 Pull request 拉取请求给岳不群，岳不群审核完成后使用 merge 命令合并对方的代码到自己的远程

中，再通过 pull 命令到自己的本地库中，这样修改过后的华山剑法岳不群和令狐冲就都可以使用了。

## ☔三、Github

### 🌼3.1、创建远程仓库

#### 🗡️3.1.1、Github远程仓库

![image-20220710214815624](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214815624.png)



#### 🪒3.1.2、Gitee远程仓库



![image-20220710214821940](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214821940.png)



![image-20220710214830911](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214830911.png)



### 🌈3.2、远程仓库操作

|              **命令名称**              |                           **作用**                           |
| :------------------------------------: | :----------------------------------------------------------: |
|             git remote -v              |                   查看当前所有远程地址别名                   |
|      git remote add 别名 远程地址      |                            起别名                            |
|         **git push 别名 分支**         |              **推送本地分支上的内容克隆到本地**              |
|         **git clone 远程地址**         |                **将远程仓库的内容克隆到本地**                |
| **git pull 远程库地址别名 远程分支名** | **将远程仓库对于分支最新内容拉下来后与当前本地分支直接合并** |

#### 💐3.2.1、创建远程仓库别名

##### ①、Gihub

基本语法：

- `git remote -v` 查看当前所有远程地址别名
- `git remote add 别名 远程地址` 起别名

![image-20220710214838782](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214838782.png)

![image-20220710214848568](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214848568.png)

`注意：起的别名最好和本地库的名称一致`

##### ②、Gitee

![image-20220710214858961](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214858961.png)

#### 🧲3.2.2、推送本地分支到远程仓库

**基本语法**：`git push 别名 分支`

![image-20220710214910606](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214910606.png)

**我们在 gitee 上查看我们的 git-demo 仓库，发现有我们推送的hello.txt 文件**

![image-20220710214919877](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214919877.png)



#### 🧨3.2.3、拉取远程库分支到本地库

**语法**：`git pull 别名 分支`

我们在远程库进行 hello.txt 的文件修改

![image-20220710214925823](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214925823.png)



**然后在本地库将远程库的代码 拉取**

![image-20220710214933590](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214933590.png)

![image-20220710214941345](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214941345.png)

#### 🔖3.2.3、克隆远程仓库到本地

**基本语法**：`git clone 远程地址`

我们另一台用户需要克隆我们的远程仓库到他的本地库，由于是使用一台电脑模拟，所以在克隆之前需要在 

凭据管理器下删除我们之前的 gitee 凭据

![image-20220710214949446](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214949446.png)



**我们新建一个文件夹 git-clone，然后在此文件夹下右键 git bash here，之后进行克隆**

![image-20220710214955496](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710214955496.png)

![image-20220710215003084](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215003084.png)

​		

![image-20220710215010517](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215010517.png)



### 🤔3.3、邀请加入团队

#### 😃3.3.1、Gitee

我们在 git-clone(假设这是大弟子令狐冲) 文件夹里面进行代码修改，修改完后添加到暂存区，再提交到本地库，之后 push 到我们的远程库

![image-20220710215020021](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215020021.png)



![image-20220710215028405](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215028405.png)

![image-20220710215038767](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215038767.png)



令狐成成为仓库开发者被拉入团队后，我们再次在令狐冲文件夹使用进行 push

![image-20220710215044276](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215044276.png)

push 到远程库成功，我们在远程库查看

![image-20220710215049318](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215049318.png)

#### 🥮3.3.2、Github

![image-20220710215113032](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215113032.png)

**复制地址并发给该用户**

![image-20220710215134503](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215134503.png)

在 atguigulinghuchong这个账号 中的 地址 栏 复制 收到邀请 的 链接 ，点击接受邀请。

![image-20220710215140222](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215140222.png)

### 🧹3.4、跨团队协作

#### 🛶3.4.1、Gitee

将远程仓库的地址复制发给邀请跨团队协作的人，比如东方不败。

![image-20220710215146485](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215146485.png)

在东方不败的 Gitee账号里的地址栏复制收到的链接，然后点击 Fork将项目叉到自己的本地仓库

![image-20220710215152541](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215152541.png)

<img src="https://cdn.jsdelivr.net/gh/gaoziman/bed/img/image-20220515121357503.png" alt="image-20220515121357503" style="zoom:67%;" />

**接下来点击上方的 Pull Requests 请求，并创建一个新的请求** 

![image-20220710215208932](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215208932.png)



**合并之后我们在岳不群的 git-demo 下就可以看到东方不败的代码**

![image-20220710215219923](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215219923.png)