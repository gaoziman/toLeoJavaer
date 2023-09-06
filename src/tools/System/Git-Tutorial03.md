---
title: Git图文使用教程详解(三)
icon: circle-info
order: 3
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

## 🐬一、IntelliJ IDEA 中集成并使用 Git

### 🥕1.1、配置Git忽略文件

我们的[Eclipse](https://so.csdn.net/so/search?q=Eclipse&spm=1001.2101.3001.7020) 、IDEA都会生成一些无关文件，如图

**1）Eclipse特定文件** 

![image-20230531142204646](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311422811.png)

**2）IDEA特定文件 **

![image-20230531142223968](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311422035.png)



> 问题1:为什么要忽略他们？

 `答`：**与项目的实际功能无关，不参与服务器上部署运行。把它们忽略掉能够屏蔽IDE工具之间的差异。** 

> 问题2：怎么忽略？ 

`1）`**创建忽略规则文件 `xxxx.ignore`（前缀名随便起，建议是git.ignore） 这个文件的存放位置原则上在哪里都**

**可以，为了便于让~/.gitconfig文件引用，建议也放在用户家目录下 git.ignore文件模版内容如下：** 

```ignore
# Compiled class file
 *.class
# Log file 
*.log  
# BlueJ files 
*.ctxt  
# Mobile Tools for Java (J2ME)
 .mtj.tmp/ 
# Package Files # 
*.jar 
*.war 
*.nar 
*.ear 
*.zip 
*.tar.gz 
*.rar  
# virtual machine crash logs, see 
http://www.java.com/en/download/help/error_hotspot.xml 
hs_err_pid* 

.classpath 
.project 
.settings 
target 
.idea 
*.iml 
```

`2）`**在.gitconfig文件中引用忽略配置文件（此文件在Windows的家目录中）** 

```config
[user]  
	name = gaoziman  
	email = gaoziman@qq.com 
[core]  
	excludesfile = C:/Users/shark-Gao/git.ignore 
注意：这里要使用“正斜线（/）”，不要使用“反斜线（\）” 
```

![image-20230531142413377](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311424448.png)

`3)` **在**IDEA中定位并配置

接下来就来说说，当我们安装好 Git 后的事。安装好 Git 之后，打开 IDEA 的设置界面，依次进入 File -> Settings -> Version Control -> Git（也可以通过快捷键 Ctrl + Alt + S 进入设置），然后将 Path to Git executable 设置为你安装的 Git 所在路径即可，比如我的是 `D:\software\Git\bin\git.exe`。


![image-20230531142727782](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311427918.png)

设置完成之后，点击右方的 `Test`，如果 Git 安装成功且路径正确，就会弹出如下的提示信息，说明我们的配置也就成功了

![image-20230531142900390](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311429444.png)



### 🌶️1.2、IDEA初始化本地库

![image-20230531143228201](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311432273.png)



**默认创建的 git 仓库就是我们打开的项目所在的目录，我们添加了 git 仓库之后**

![image-20230531143548602](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311435770.png)



![image-20230531143706378](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311437778.png)



**添加到暂存区就变为了绿色，我们可以写些代码，然后将 project 添加到暂存区**

![image-20230531143845050](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311438372.png)



**我们添加到暂存区，再接着进行提交到本地库**

![image-20230531143851987](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311438135.png)

### 🍬1.3、切换版本

**我们修改 Java2023 中的代码，再次提交到本地库**

![image-20230531144216604](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311442875.png)

**在IDEA的左下角，点击 Git，然后点击 Log查看版本，右键选择要切换的版本，然后在菜单里点击 Checkout Revision**

![image-20230531144716771](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311447949.png)



### 👀1.4、创建分支

![image-20230531144746919](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311447017.png)

**在弹出的Git Branches框里 点击 New Branch按钮。**

![image-20220710215859688](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710215859688.png)

**填写分支名称**

![image-20230531144821449](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311448495.png)

**然后再 IDEA的右下角看到 cisyam-fix，说明分支创建成功，并且当前已经切换成 hot-fix分**
**支**

![image-20230531144907683](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311449760.png)



### 👁️1.5、切换分支

**在IDEA窗口的右下角，切换到 master分支 。**

![image-20230531144942480](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311449621.png)



### 🥖1.6、合并分支

**在IDEA窗口的右下角，将 cisyam-fix分支合并到当前 master分支。**

![image-20230531145059806](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311450884.png)

如果代码没有冲突，分支直接合并成功，分支合并成功以后，代码自动提交，无需手动提交本地库

### 🐸1.7、合并分支冲突

**如图所示，如果master分支和 hot-fix分支都修改了代码，在合并分支的时候就会发生冲突。**

![image-20230531145346445](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311453587.png)

![image-20230531145429308](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311454443.png)

**我们现在站在master分支上合并 cisyam-fix分支，就会发生代码冲突。**

**点击 Conflicts框里的 Merge按钮，进行手动合并代码。**

![image-20220710220126009](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710220126009.png)

**手动合并完代码以后，点击右下角的 Apply按钮。代码冲突解决，自动提交本地库。**

## 🐬二、IDEA集成Github

![image-20230531153638013](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311536121.png)

**Token在哪呢？我们在 Github 点击 Settings -> Develop Settings**

![image-20230531153843500](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311538588.png)



![image-20230531154053225](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311540298.png)



![image-20230531154058743](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311540811.png)

![image-20230531154208342](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311542407.png)



### 🍷2.1、分享项目到Github

![image-20230531154359482](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311543614.png)

**这其实就是创建远程库，名字，是否私有，描述等**

![image-20230531154422123](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311544172.png)



### ☕2.2、push推送本地库到远程库

**此时就可以看到github库里面已经有这个项目了**

![image-20230531154545737](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311545825.png)



### 🐞2.3、pull拉取远程库到本地库

> 注意：push是将本地库代码推送到远程库，如果本地库代码跟远程库代码版本不一致，push的操作是会
>
> 被拒绝的。也就是说， 要想 push成功，一定要保证本地 库的版本要比远程库的版本高！ 因此一个成熟的
>
> 程序员在动手改本地代码之前，一定会先检查下远程库跟本地代码的区别！如果本地的代码版本已经落
>
> 后，切记要先 pull拉取一下远程库的代码，将本地代码更新到最新以后，然后再修改，提交，推送！

**右键点击项目，可以将远程仓库的内容pull到本地仓库 。**

![image-20220710220259246](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710220259246.png)



**注意：pull是拉取远端仓库代码到本地，如果远程库代码和本地库代码不一致，会自动合并，如果自动合并**

**失败，还会涉及到手动解决冲突的问题。**



## 🍦三、IDEA集成Gitee

### 🌂3.1、IDEA安装码云插件

**Idea 默认不带码云插件，我们第一步要安装 Gitee插件。**

![image-20230531154719176](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311547253.png)



**安装完成重启 IDEA 即可**

**Idea连接码云和连接 GitHub几乎一样，首先在 Idea里面创建一个工程，初始化 git工程，然后将代码添加到暂存区，提交到本地库。**

![image-20220710221125857](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710221125857.png)



### 🧿3.2、分享项目到Gitee

![image-20230531154913462](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311549580.png)

### 🌀3.2、push推送到码云远程库

**当然我们也可以自己在码云Gitee上创建远程库，然后获取到远程库的 HTTPS/SSH 链接，将我们的代码 push 即可**

**自定义远程库链接： Define remote，给远程库链接定义个 name，然后再 URL里面填入码云远程库的 HTTPS链接即可，码云服务器在国内，用 HTTPS 链接即可，没必要用 SSH 免密链接**

![image-20220710221113303](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710221113303.png)

### ⛱️3.3、pull拉取远程库到本地库

**我们在远程库修改代码，然后使用本地库 pull 拉取远程库的代码**

![image-20220710221108436](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710221108436.png)

![image-20220710221049648](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710221049648.png)





### 🔭3.4、clone克隆远程库到本地库



![image-20230531155005893](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311550966.png)

## 🪒四、码云复制Github项目

码云提供了直接复制 GitHub 项目的功能，方便我们做项目的迁移和下载 。

![image-20220710220947280](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710220947280.png)

**如果GitHub项目更新了以后，在码云项目端可以手动重新同步，进行更新！**



![image-20230531155107002](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305311551101.png)



**Git的教程就到这里完结啦！！！撒花撒花撒花！！！！**

