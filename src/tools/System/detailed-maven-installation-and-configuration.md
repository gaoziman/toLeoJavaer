---
title: 最详细的Maven安装及配置
icon: circle-info
order: 9
category:
  - 工具
tag:
  - 工具
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---





## 为什么学习Maven



相信读到这篇文章的许多人有过或多或少的项目经历，说到项目，在纯是原生态代码无框架的时候，我们最痛苦的一件事就是导入各种各样的jar包，jar包太多以至于我们很难管理，项目功能稍多，就会出现好多好多的包，你要考虑在哪找这个包，还有它的包的依赖，让人很痛苦！这个时候，我们的救世主maven出现，轻松帮你解决这些问题。

> maven优点：
>
> 1、原来的项目中需要的jar包必须手动“复制”、”粘贴” 到WEB-INF/lib 项目下，而借Maven，可以将jar包仅仅保存在“仓库”中，有需要使用的工程只需要“引用”这个文件，并不需要重复复制到工程中。
>
> 2、原来的项目中所需要的jar包都是提前下载好的，而Maven在联网状态下会自动下载所需要的jar包。首先在本地仓库中找，找不到就在远程仓库进行下载。
>
> 3、原来的项目中一个jar包所依赖的其他jar包必须手动导进来，而Maven会自动将被依赖的jar包导进来。
>
> 4、原来的项目一个项目就是一个工程，而借助Maven可以将一个项目拆分成多个工程。

## Maven简介

Maven 是 Apache 软件基金会的一个开源项目,是一个优秀的项目构建工具,它用来帮助开发者管理项目中的 jar,以及 jar 之间的依赖关系、完成项目的编译、测试、打包和发布等工作。



## Maven的安装

前提是安装JDK（Maven 工作时需要通过网络下载各种插件以完成任务，因此应保证网络的通畅）

### 1、 去Maven官网下载Maven服务器

[Maven官网](https://maven.apache.org/)

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315095724118.png" alt="image-20230315095724118" style="zoom:80%;" />

`点击Download下载`

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315095808363.png" alt="image-20230315095808363" style="zoom:80%;" />

`找到Files这个标题`

![image-20230315095951119](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315095951119.png)



### 2、安装配置Maven

`把刚刚下载完成的zip包解压到本地文件夹，理论上是任意一个文件夹都可以，但是这边建议还是不要出现在中文的文件夹下面，以免出现各种问题！`

![image-20230315100240991](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315100240991.png)

以上便是我们解压后的Maven目录结构，我们接下来开始配置。

- 点开高级系统设置，在系统环境中配置环境变量，点击新建

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315100716035.png" alt="image-20230315100716035" style="zoom: 80%;" />

- 新建一个MAVEN_HOME的名称，路径就是你Maven安装的bin路径

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315100840630.png" alt="image-20230315100840630"  />

![image-20230315100913932](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315100913932.png)

- 这里Maven环境变量已经配置好了，但是为了全局使用maven命令，我们还需要在path目录进行配置，接下来点击path进行添加

  ![image-20230315101118197](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315101118197.png)

- 以上全部配置完成，点击一直点击确实，并且关闭窗口

`配置成功打开cmd后输入命令mvn -version`

![image-20230315101235021](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315101235021.png)

到这里的小伙伴说明你的Maven就已经配置成功了!!!

### 3、配置maven本地仓库

如何将下载的 jar 文件存储到我们指定的仓库中呢?需要在 maven 的服务器解压的文件中找到 conf 文件夹下的 settings.xml 文件进行修改，如下图所示:

![image-20230315101519526](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315101519526.png)

 `为了提高下载速度，可在如图所示位置配置阿里云仓库`

~~~xml
 		<mirror>   <!-- 配置阿里云镜像仓库 -->
           <id>alimaven</id>
           <name>aliyun maven</name>
           <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
           <mirrorOf>central</mirrorOf>
		</mirror
~~~

![image-20230315101624306](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315101624306.png)

将以上的代码块复制粘贴下来就好啦

### 4、在IDEA中配置Maven

打开settings ，选择Build ，Execution这个选项的Maven选项即可

![image-20230315101750757](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315101750757.png)



### 5、Maven工程pom.xml配置

maven 仓库官网(http://mvnrepository.com/)如下图所示:

![image-20230315102012097](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315102012097.png)

在官网里就可以下载自己所需开发 jar 包，继续点击链接打开如下:

![image-20230315101956659](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315101956659.png)

在 Pom.xml 文件配置 jar 包信息（坐标），使用 maven 自动下载 jar 包

如

![image-20230315102031118](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315102031118.png)

 配置好坐标后，在你的右上角找下图所示按钮刷新，点击之后文件会自动下载到你本地仓库中

![image-20230315102049602](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315102049602.png)



## Maven POM

POM（Project Object Model，项目对象模型）是 Maven 的基本组件，它是以 xml 文件的形式存放在项目的根目录下，名称为 pom.xml。

POM 中定义了项目的基本信息，用于描述项目如何构建、声明项目依赖等等。

当 Maven 执行一个任务时，它会先查找当前项目的 POM 文件，读取所需的配置信息，然后执行任务。在 POM 中可以设置如下配置：

- 项目依赖
- 插件
- 目标
- 构建时的配置文件
- 版本 
- 开发者
- 邮件列表

在创建 POM 之前，首先要确定工程组（groupId），及其名称（artifactId）和版本，在仓库中这些属性是项目的唯一标识。一旦在 pom.xml 文件中配置了所依赖的 jar，Maven 会自动从构件仓库中下载相应的构件。

## Maven 坐标

Maven 坐标一套规则，它规定：世界上任何一个构件都可以使用 Maven 坐标并作为其唯一标识，Maven 坐标包括 groupId、artifactId、version、packaging 等元素，只要用户提供了正确的坐标元素，Maven 就能找到对应的构件。 

任何一个构件都必须明确定义自己的坐标，这是 Maven 的强制要求，任何构件都不能例外。我们在开发 Maven 项目时，也需要为其定义合适的坐标，只有定义了坐标，其他项目才能引用该项目生成的构件。

Maven 坐标主要由以下元素组成：

- groupId： 项目组 ID，定义当前 Maven 项目隶属的组织或公司，通常是唯一的。它的取值一般是项目所属公司或组织的网址或 URL 的反写，例如 net.biancheng.www。
- artifactId： 项目 ID，通常是项目的名称。
- version：版本。
- packaging：项目的打包方式，默认值为 jar。

`以上 4 个元素中 groupId、artifactId 和 version 是必须定义的，packaging 是可选的。`

### Maven仓库

Maven 仓库可以分为 2 个大类：

- 本地仓库
- 远程仓库

**当 Maven 根据坐标寻找构件时，它会首先查看本地仓库，若本地仓库存在此构件，则直接使用；若本地仓库不存在此构件，Maven 就会去远程仓库查找，若发现所需的构件后，则下载到本地仓库使用。如果本地仓库和远程仓库都没有所需的构件，则 Maven 就会报错。**

![image-20230315102239555](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/blog/image-20230315102239555.png)