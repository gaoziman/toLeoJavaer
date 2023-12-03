---
title: Java基础篇 环境搭建
icon: circle-info
order: 1
category:
  - Java☕
tag:
  - Java☕
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---


## 前言

> Java以前自学过一写，现在工作了，时间太久有一些知识都遗忘了，今天开始就更新Java了，想着把之前的Java基础知识捡起来；从最基础的开始，打好Java基础，便于以后复习。也欢迎大家跟我一起复习。



**话不多说，先看一张图**

![JavaSE](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305301544817.png)

## 计算机概述（了解）

计算机是一种现代化的电子设备，它能够接受、存储、处理和输出数据。计算机由**硬件**和**软件**两部分组成，硬件包括**中央处理器（CPU）、内存、硬盘、显示器、键盘、鼠标**等部件，软件则包括**系统软件**和**应用软件**。计算机可以进行各种操作，如文字处理、图形设计、音视频播放、游戏等，并且可以通过网络连接进行通信和数据交换。计算机技术的发展对人类社会的影响非常深远，它已经成为现代化社会中不可或缺的一部分。

### 硬件

硬件是计算机系统的物理部分，主要包括以下组件：

1.  中央处理器（CPU）：负责处理计算机的指令和数据，是计算机的核心部件。 （比如：1+2=3，1,2,3数据存储在内存中，3这个结果是CPU算出来的。）

![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292233902.png)

2.  内存：用于存储计算机正在运行的程序和数据，是计算机的临时存储器。

![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292233528.png)

3.  硬盘：用于存储计算机的操作系统、程序和数据，是计算机的永久存储器。

![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292233971.png)

4.  显示器：用于显示计算机处理的图像和文字。
5.  键盘和鼠标：用于输入指令和数据。
6.  主板：连接计算机各个硬件组件的中心部件。

![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292233310.png)

7.  电源：提供电能给计算机各个部件。

还有其他硬件组件，如声卡、网卡、显卡、光驱、散热器等。这些硬件组件共同工作，使计算机能够完成各种任务。

计算机性能主要由以下几个部件决定：

1.  中央处理器（CPU）：CPU 是计算机的核心部件，它决定着计算机的计算能力。CPU 的主要指标包括频率、核心数、缓存大小等。它负责执行计算机的指令和处理数据。CPU 从内存中读取指令和数据，并通过其内部的逻辑电路进行计算和处理，最终将结果再存储回内存。
2.  内存：内存是计算机的临时存储器，越大的内存能够存储更多的程序和数据，从而提高计算机的运行速度。
3.  硬盘：硬盘是计算机的永久存储器，它能够存储大量的数据和程序。硬盘的读写速度和容量大小都会影响计算机的性能。
4.  显卡：显卡是计算机的图形处理器，它能够加速计算机的图形处理和显示速度。
5.  主板：主板是计算机各个硬件组件的中心部件，它能够影响计算机的稳定性和性能。
6.  散热器：散热器是计算机的散热部件，它能够保证计算机在高负载运行时不会过热而导致性能下降或者损坏。

这些部件共同工作，决定着计算机的性能和稳定性。



## 1.1 计算机语言概述

`Java是一种计算机编程语言。`

### 1.计算机语言是什么

所谓计算机编程语言，就是人们可以使用编程语言对计算机下达命令，让计算机完成人们需要的功能。

### 2.计算机语言发展

* 第一代：机器语言
    * 1946年2月14日，世界上第一台计算机ENAC诞生，使用的是最原始的穿孔卡片。这种卡片上使用的语言是只有专家才能理解的语言，它是用二进制代码表示的语言，与人类语言差别极大，这种语言就称为机器语言。机器语言是第一代计算机语言。这种语言本质上是计算机能识别的唯一语言，人类很难理解。以后的语言就是在这个的基础上简化而来。虽然后来发展的语言能让人类直接理解但最终送入计算机的还是这种机器语言。
* 第二代：汇编语言
    * 计算机语言发展到第二代，出现了汇编语言。汇编语言用助记符代替了操作码，用地址符号或标号代替地址码。这样就用符号代替了机器语言的二进制码。汇编语言也称为符号语言。汇编语言是面向机器的，能直接与存储器、接口电路打交道，也能申请中断，因此汇编语言程序能直接管理和控制硬件设备。程序设计人员必须对计算机有相当深入的了解，才能使用汇编语言编制程序。汇编语言缺乏通用性，程序不易移植。不同计算机的汇编语言之间是不能通用的，因为它们各自都有适合于自己机型特点的汇编语言。但是，掌握了一种计算机的汇编语言，有助于学习其他计算机的汇编语言。比起机器语言，汇编大大进步了。尽管还是复杂，用起来容易出错，但在计算机语言发展史上是机器语言向更高级的语言进化的桥梁。
* 第三代：高级语言
    * 当计算机语言发展到第三代时，就进入了“面向人类”的高级语言。高级语言是一种接近于人们使用习惯的程序设计语言。它允许用英文写计算程序，程序中的符号和算式也与日常用的数学式子差不多。高级语言发展于20世纪50年代中叶到70年代，流行的高级语言已经开始固化在计算机内存里了，比如 Basic语言。现在，计算机语言仍然在不断的发展，种类也相当多，比如 FORTRAN语言， COBOL语言，C语言，C++，C#， PASCAL，Java，Python等等。高级语言接近于自然语言和数学语言，容易为人们掌握；独立于机器，有一定的通用性；计算机不能直接识别和执行用高级语言编写的程序，需要使用编译器或者解释器，转换为机器语言才能被识别和执行；用高级语言编写的程序大大提高了编写效率。

![image-20211218092630678](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292139600.png)

![image-20211218092541075](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292139618.png)

### 3.计算机语言分类

![image-20211218091234964](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292139609.png)

### 4.计算机语言排行榜

TIOBE排行榜是根据互联网上有经验的程序员、课程和第三方厂商的数量，并使用搜索引擎（如Google、Bing、Yahoo!）以及Wikipedia、Amazon、YouTube和Baidu等统计出的排名数据。

![image-20211216101948388](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292139622.png)

`计算机语言走势`

![image-20211218142330176](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292139634.png)



## 1.2 Java语言概述

### 1.Java语言发展历史

Java诞生于SUN（Stanford University Network），09年SUN被Oracle（甲骨文）收购。

Java之父是詹姆斯.高斯林(James Gosling)。

![image-20210727085728848](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292142628.png)

1996年发布JDK1.0版。

目前最新的版本是Java17。我们学习的Java8。

将Java取名的是Sun公司的马克 奥颇门（Mark Opperman）。马克 奥颇门是在一家咖啡店与同事品尝咖啡时得到灵感的。Java是印度尼西亚爪哇岛的英文名称，因盛产咖啡而闻名。国外的许多咖啡店用Java来命名或宣传，以彰显其咖啡的品质。Java语言中的许多库类名称，多与咖啡有关，如JavaBeans（咖啡豆）、NetBeans（网络豆）以及ObjectBeans （对象豆）等等。Java使Sun市值大升，一度超过2千亿美元。所有的网络巨头公司为之一振，IBM、HP、微软为Java配置了专门的开发团队，全球几百万软件工程师眷顾于Java，着迷于Java。1982年 Sun公司成立。1986年 Sun公司上市。1995年 Sun公司推出著名的Java编程语言。Sun公司的位置非常像微机争霸战中的苹果公司。它有自己成套的硬件和操作系统，但是它缺乏应用软件。2001年 “9.11”以前，Sun公司市值超过1000亿美元；此后，互联网泡沫破裂，硬件需求大幅减少，它的市值在一个月之内跌幅超过90%。SUN公司的成长用了20年，而衰落只用了1年！

|   发行版本    |  发行时间  |                             备注                             |
| :-----------: | :--------: | :----------------------------------------------------------: |
|     Java      | 1995.05.23 |     Sun公司在Sun world会议上正式发布Java和HotJava浏览器      |
|   Java 1.0    | 1996.01.23 |             Sun公司发布了Java的第一个开发工具包              |
|   Java 1.1    | 1997.02.19 |                                                              |
|   Java 1.2    | 1998.12.08 |    拆分成：J2SE（标准版）、J2EE（企业版）、J2ME（小型版）    |
|   Java 1.3    | 2000.05.08 |                                                              |
|    Java1.4    | 2004.02.06 |                                                              |
| **Java 5.0**  | 2004.09.30 | ①版本号从1.4直接更新至5.0；②平台更名为JavaSE、JavaEE、JavaME |
|   Java 6.0    | 2006.12.11 |               2009.04.20 Oracle宣布收购SUN公司               |
|   Java 7.0    | 2011.07.02 |                                                              |
| **Java 8.0**  | 2014.03.18 |                                                              |
|   Java 9.0    | 2017.09.22 |    ①每半年更新一次；②Java 9.0开始不再支持windows 32位系统    |
|   Java 10.0   | 2018.03.21 |                                                              |
| **Java 11.0** | 2018.09.25 |           JDK安装包取消独立JRE安装包，长期支持版本           |
|   Java 12.0   | 2019.03.19 |                                                              |
|   Java 13.0   | 2019.9.18  |                                                              |
|   Java 14.0   | 2020.3.17  |                                                              |
|   Java 15.0   |   2020.9   |                                                              |
|   Java16.0    |   2021.3   |                                                              |
| **Java17.0**  |   2021.9   |                      最新的长期支持版本                      |



### 2.Java是最好的语言吗？

![image-20211217093810302](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292142620.png)

不是，因为在每个领域都有更合适的编程语言。

- C 语言无疑是现代计算机软件编程语言的王者，几乎所有的操作系统都是 C 语言写成的。C语言是面向过程的编程语言。
- C++ 是面向对象的 C 语言，一直在不断的改进。为了与C兼容，C++被迫做出了很多重大的设计妥协，结果导致语言过分华丽，过分复杂。为了与C兼容，C++并没有采用自动内存管理的策略，从而丧失了修正C最严重问题的机会。另外C++的OO设计耦合度过高，导致组件之间出现很厚的粘合层，并且带来了严重的可维护性问题。C++的应用主要集中在GUI（图形化界面）、游戏和多媒体工具包方面，其他地方很少用到。
- C#是.NET开发平台的主语言。.NET开发平台包括虚拟机CLR、公共类库以及编译工具等开发环境，它是Java语言强有力的竞争对手。但是.NET环境只有Windows有。
- Visual Basic主要用于图形化界面程序的设计，目前也是基于.NET平台。


- JavaScript 是能运行在浏览器中的语言，丰富的前端界面离不开 Javascript 的功劳。近年来的 Node.js 又在后端占有一席之地。
- Python 用于系统管理，并通过高性能预编译的库，提供 API 来进行科学计算，文本处理等，是 Linux 必选的解释性语言。Python的应用方向主要是数据分析、人工智能和机器学习、网络爬虫、自动化测试、web开发、科学计算和统计等。Python的优势是语法简洁清晰，也具有丰富和强大的类库。但是Python更像是胶水语言，它通常用于将其他语言（尤其是C/C++）制作的各种模块轻松的联结在一起。而且Python的运行效率非常低。
- PHP是一种通用开源脚本语言。PHP是在服务器端执行的脚本语言。PHP独特的语法混合了C、Java、Perl以及 PHP 自创的语法。利于学习，使用广泛，主要适用于Web开发领域。LAMP（Linux+Apache+MySQL+PHP）免费套装让很多创业公司可以实现快速低成本的搭建公司网站。虽然 PHP语言使用简单，但是一直有安全漏洞问题要解决。多线程支持不好，性能低下，代码不规范等问题。行业领跑者们从着眼未来考虑，在大数据、物联网、人工智能等方面的广泛应用前景下，对待PHP的重视程度就逐渐下降了。
- Ruby 强于 DSL（领域特定语言），程序员可以定义丰富的语义来充分表达自己的思想。
- Erlang 就是为分布式计算设计的，能保证在大规模并发访问的情况下，保持强壮和稳定性。
- Go 语言内置了并发能力，可以编译成本地代码。当前新的网络相关项目，很大比例是由 Go 语言编写的，如 Docker、Kubernetes 等。
- 函数式编程有 Lisp，编写 iOS 程序有 Swift/Objective-C。
- R的思想是：它可以提供一些集成的统计工具，但更大量的是它提供各种数学计算、统计计算的函数，从而使使用者能灵活机动的进行数据分析，甚至创造出符合需要的新的统计计算方法
- SQL 是用于访问和处理关系型数据库的标准语言， 这类数据库包括：MySQL，Oracle, SQL Server, DB2, PostgreSQL，Sybase, Access 等等

一句话概括，**能留在排行榜之上的语言，都是好的语言，在其所在的领域能做到最好。**



### 3.Java语言的特点

（1）**优点**

- **简单性**
    - 在Java语言当中真正操作内存的是：JVM（Java虚拟机）；所有的java程序都是运行在Java虚拟机当中的；而Java虚拟机执行过程中再去操作内存。
    - 对于C或者C++来说程序员都是可以直接通过指针操作内存的。C或者C++更灵活，可以直接程序员操作内存。
    - Java语言屏蔽了指针概念，程序员不能直接操作指针，或者说程序员不能直接操作内存。
    - Java语言底层是C++，所以JVM是用C++语言写好的一个虚拟的电脑。
    -

* **面向对象:** Java语言支持封装、继承、多态，面向对象编程，让程序更好达到`高内聚`，`低耦合`的标准。
* **支持分布式:** Java语言支持Internet应用的开发，在基本的Java应用编程接口中有一个网络应用编程接口（java net），它提供了用于网络应用编程的类库，包括URL、URLConnection、Socket、ServerSocket等。Java的RMI（远程方法激活）机制也是开发分布式应用的重要手段。
* **健壮型:** Java的强类型机制、异常处理、垃圾的自动收集等是Java程序健壮性的重要保证。对指针的丢弃是Java的明智选择。
    * 主要是因为Java中有一种机制：**自动垃圾回收机制（GC机制）**
    * Java语言是健壮的，相对于C语言来说。
    * Java不容易导致内存的泄漏；C++或者C语言使用不当时很容易导致内存泄漏。JVM负责调度GC机制，程序员不需要干涉。
* **安全性高：** Java通常被用在网络环境中，为此，Java提供了一个安全机制以防恶意代码的攻击。如：安全防范机制（类ClassLoader），如分配不同的名字空间以防替代本地的同名类、字节代码检查。
* **跨平台性：** Java程序（后缀为java的文件）在Java平台上被编译为体系结构中立的字节码格式（后缀为class的文件），然后可以在实现这个Java平台的任何系统中运行。
    *  Java语言只要编写/编译一次，可以做到到处运行。 一次编写，到处运行（平台改变了，程序不需要改）
    *  同一份程序通过java虚拟机(JVM)就可以和不同的操作系统进行交互
    *  JVM相当于屏蔽了操作系统之间的差距；JVM是在安装JDK的时候自带JVM，所以JDK也有不同版本：windows版的JDK，Linux版本的JDK

（2）**缺点**

- 语法过于复杂，严谨，对程序员的约束比较多，与python和php等相比入门相对较难。但是一旦学会了，就业岗位需求量大，而且薪资待遇节节攀升。
- 一般适用于大型网站开发，整个架构会比较重，对于初创公司开发和维护人员的成本比较高（即薪资高），选择用Java语言开发网站或应用系统的需要一定的经济实力。



### 4.Java生态圈

根据2020年IDC（Internet Data Center互联网数据中心）的最新报告《Java迎来25岁》，超过900万的开发人员代表全球69%的全职开发人员使用Java——比其他任何语言都多。

**Java是目前应用最为广泛的软件开发平台之一。** 随着Java以及Java社区的不断壮大，Java 也早已不再是简简单单的一门计算机语言了，它更是一个平台、一种文化、一个社区。

**作为一个平台，** Java虚拟机扮演着举足轻重的作用。除了 Java语言，任何一种能够被编译成字节码的计算机语言都属于Java这个平台。Groovy、Scala、 JRuby、Kotlin等都是Java平台的一部分，它们依赖于Java虚拟机，同时，Java平台也因为它们变得更加丰富多彩。

**作为一种文化，** Java几乎成为了 “开源”的代名词。在Java程序中，有着数不清的开源软件和框架。如Tomcat、Struts, Hibernate, Spring,MyBatis等。就连JDK和JVM自身也有不少开源的实现，如OpenJDK、Apache Harmony。可以说，“共享”的精神在Java世界里体现得淋漓尽致。

**作为一个社区，** Java拥有全世界最多的技术拥护者和开源社区支持，有数不清的论坛和资料。从桌面应用软件、嵌入式开发到企业级应用、后台服务器、中间件，都可以看到Java的身影。其应用形式之复杂、参与人数之众多也令人咋舌。可以说，Java社区已经俨然成为了一个良好而庞大的生态系统。**其实这才是Java最大的优势和财富。**



### 5.Java技术体系平台

* JavaSE（Java Platform, Standard Edition标准版）：允许您在桌面和服务器上开发和部署Java应用程序。Java提供了丰富的用户界面、性能、多功能性、可移植性和当今应用程序所需的安全性。
* JavaEE（Java Platform, Enterprise Edition企业版）：是为开发企业环境下的应用程序提供的一套解决方案，主要针对于Web应用程序开发。
* JavaME（Java Platform, Micro Edition 小型版）：为互联网上的嵌入式和移动设备上运行的应用提供了一个健壮、灵活的环境：微控制器、传感器、网关、移动电话、个人数字助理（PDA）、电视机顶盒、打印机等等。JavaME包括灵活的用户界面、健壮的安全性、内置的网络协议，以及支持动态下载的网络和离线应用程序。基于JavaME的应用程序在许多设备上都是可移植的，但是利用了每个设备的本机功能。
    *  Java Embedded: 用于解锁物联网的智能设备的价值：
       通过远程市场更新和刷新功能延长产品生命周期和价值；
       利用Java的可伸缩性、健壮性、可移植性和全套功能，提高生产效率，降低成本，缩短上市时间；
       在边缘启用快速数据功能；
    *  Java Card：使安全元件（如智能卡和其他防篡改安全芯片）能够承载采用Java技术的应用程序。Java card提供了一个安全的、可互操作的执行平台，它可以在一个资源受限的设备上存储和更新多个应用程序，同时保持最高的认证级别和与标准的兼容性。
    *  Java TV：是一种基于JavaME的技术，它为开发在tv和机顶盒设备上运行的java应用程序提供了一个性能良好、安全且易于实现的解决方案。使用Java TV运行时，开发人员可以轻松创建应用程序，例如电子节目指南（EPG）、视频点播（VOD）客户端、游戏和教育应用程序、用于访问Internet数据的应用程序（例如天气、新闻播报器、社交网络）以及大多数蓝光光盘标题上的用户界面和奖金内容。

![image-20211217114313652](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292142639.png)

![image-20230529214333941](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292143997.png)

## 1.3 Java语言跨平台原理（理解）

### 1.Java语言跨平台原理

很多时候，我们写的程序可能要在多个操作系统运行，这个时候就要求我们的程序需要在尽可能不改动的情况下完实现这个目标。不同的语言实现跨平台的方式不同。Java语言实现跨平台是建立在“虚拟机”基础之上的。

在Java出现之前，最为流行的编程语言是C和C++。如果我们想要在一台使用x86_64指令集的CPU的机器（如个人PC）上运行一个C语言程序，就需要编写一个将C语言翻译成x86_64汇编语言的编译器。如果想要在一台使用arm指令集的CPU的机器（如苹果手机）上，运行一个C语言程序，同样需要编写一个将C语言翻译成arm汇编语言的编译器。这样严重影响了C程序的跨平台性，因为针对特定的指令集开发编译器是一个难度非常大的工作。

![image-20210625083023734](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292144771.png)

那么Java是如何解决这个问题的呢？Java设计了一套简洁的虚拟指令集，也就是字节码。如果我们想要在一台机器上运行Java程序，只需要将Java程序编译成字节码就可以了。编写一个将Java程序翻译成Java字节码的编译器，比起编写一个将Java程序翻译成x86_64指令集的编译器来说，要简单得多。可是这里产生了一个问题，难道我们的机器可以直接执行字节码这样的虚拟指令集吗？当然是不能的。我们需要针对不同的指令集，开发对应的字节码解释器。这个工作同样比较简单。

![image-20210625083051577](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292144785.png)

Java虚拟机（JVM，Java Virtual Machine）是由软件技术模拟出计算机运行的一个虚拟的计算机，它负责解释执行字节码指令集。也就是说，只要一台机器可以运行Java的虚拟机，那么就能运行Java语言编写的程序。而不同的平台，需要安装不同的Java虚拟机程序。那么我们编写完Java程序之后，需要先将.java的源文件编译为.class的字节码文件，然后在Java虚拟机中来执行这些字节码文件。

![image-20210625083140531](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292144782.png)

Java虚拟机的设计不仅仅解决了Java程序跨平台的问题，同时解决了很多语言的跨平台问题。

![image-20210625083156633](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292144792.png)

- .NET（C#，VB等语言）也有虚拟机，也能实现跨平台，但是只能在Windows操作系统下安装.NET环境。
- C++不受虚拟机的限制，但是需要用不同平台的编译器重新编译一次。需要编写n个版本的编译器。
- Java虚拟机可以配置在MacOS，Windows（PC操作系统）,Linux等上，但是不能配置在WP（Windows Phone），IOS（移动操作系统）上，只能配置在android（移动操作系统）。Java程序可以实现一次编译处处运行。

![image-20211217111217831](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292144798.png)

### 2.JVM、JRE、JDK的关系

- **JVM**（Java Virtual Machine ）：Java虚拟机，是运行所有Java程序的假想计算机，是Java程序的运行环境之一，也是Java 最具吸引力的特性之一。我们编写的Java代码，都运行在**JVM** 之上。
- **JRE **  (Java Runtime Environment) ：是Java程序的运行时环境，包含`JVM` 和运行时所需要的`核心类库`。
- **JDK**   (Java Development's Kit)：是Java程序开发工具包，包含`JRE` 和开发人员使用的工具。

我们想要运行一个已有的Java程序，那么只需安装`JRE` 即可。

我们想要开发一个全新的Java程序，那么必须安装`JDK` ，其内部包含`JRE`。

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292144805.jpg)

![1561383524152](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292144143.png)

## 1.4 常用dos命令总结

> 对于dos命令，它不像Linux命令那样被我们频繁的使用，这就造成我们很容易遗忘；其实很多的dos命令和Linux命令是相通的；今天就先带大家重拾常用的dos命令；面对零基础的同学进行详解！

> 1、怎么打开DOS命令窗口
>      ⭐️win键 + r （组合键）：可以打开“运行”窗口
>      ⭐️在运行窗口文本框中输入: cmd，然后回车
>
> 2、什么是DOS命令呢？
>      ⭐️在DOS命令窗口中才可以输入并执行DOS命令。
>      ⭐️在最初的windows计算机中没有图形界面的，只有DOS命令窗口。也就是说通过执行DOS命令窗口可以完全完成文件的新建、编辑、保存、删除等一系列操作。
>
> 3、默认情况下DOS命令窗口打开之后，定位的位置是哪里？
>      ⭐️C:\Users\shark-gao>这是我电脑默认的当前路径
>
> 4、切换盘符？
>      ⭐️直接输入盘符就行：
>          c: 回车
>          d: 回车
>      ⭐️当切换到D盘根下了，那么当前路径就是：D:\>，当前路径是当前所在的位置。
>
> 5、mkdir(md) abc（创建文件夹）创建一个目录，起名abc；和Linux是一样的
>
> 6、创建文本文件：echo 123 > 111.txt；就可以把123内容追加到111.txt中，并会创建这个文本文件；Linux特有echo追加内容的功能
>
> 7、删除目录：用rmdir(rd)，例如rmdir abc就会删除abc目录
>
> ​	  ⭐️对于rmdir建议大家记全称，不然容易和Linux的删除目录rmdir(rm)搞混
>
> 8、del命令，删除一个或者多个文本文件
>       ⭐️删除test.c文件：del test.c
>       ⭐️删除所有.c结尾的文本文件，支持模糊匹配:del *.c
>
> 9、dir 查看当前目录下的文件和目录
>        ⭐️比如：dir/b > list.xls就可以把当前目录下的文件名字追加到excel表格当中10、切换目录？（非常重要，必须掌握）
>      ⭐️使用cd命令来完成目录的切换：cd是什么含义？change directory（改变目录）
>      ⭐️cd命令怎么用，语法格式是什么？ cd 路径
>      ⭐️路径在windows系统上包括：相对路径和绝对路径。
>      ⭐️什么是相对路径呢？
>          一定要注意，从路径形式上来看，相对路径是一定不会以盘符开始的。
>          相对路径：相对路径一定是相对于当前所在“位置”而言的。
>          相对路径是相对于当前而言，从当前所在的位置作为起点。
>          死记：相对路径一定是从当前位置作为起点开始找。
>      ⭐️什么是绝对路径呢？
>          在windows操作系统中凡是路径起点是盘符的都是绝对路径，
>          例如：C:\Users\shark-gao>
>      ⭐️注意：
>          cd .. 回到上级路径。
>          cd \ 直接回到根路径。
>          . 一个点，代表当前路径。
>
> 11、cls 清屏
>
> 12、exit 退出DOS命令窗口。
>
> 13、怎么查看本机的IP地址？
>        ⭐️什么是IP地址？有什么用呢？
>        ⭐️A计算机在网络当中要想定位到（连接到）B计算机，那么必须要先知道B计算机的IP地址，IP地址也可以看做计算机在同一个网络当中的身份证号（唯一标识）。IP地址就相当于电话号码是一个意思。
>        ⭐️ipconfig（ip地址的配置信息）注意Linux下的是ifconfig。
>        ⭐️ipconfig /all 该命令后面添加一个/all参数可以查看更详细的网络信息
>             这个详细信息中包括网卡 的物理地址(Mac地址)，例如：70-8B-CD-A7-BA-25
>
> 14、怎么查看两台计算机是否可以正常通信？ ping命令
>        ⭐️语法格式：ping IP地址或者ping 域名
>        ⭐️例如：ping 61.135.169.121或者ping www.baidu.com，一般默认ping四次终止。
>        Linux不加参数会一直ping下去，ctrl+c终止。                   
>        ⭐️在一个DOS命令窗口中如果有一个命令一直在执行，想强行终止怎么办？
>        ⭐️例如：ping www.baidu.com -t，加上-t参数，就会一直ping下去，一直ping的目的可以查看网络是否稳定。
>          http://www.baidu.com 可以打开百度（这种方式比较方便，域名更容易记忆）
>          http://61.135.169.121 也可以打开百度
>          域名底层最终还是会被解析成IP地址的形式。还是ctrl+c终止！

## 1.5 开发环境搭建（掌握）

### 1.JDK的下载

* 下载网址：www.oracle.com

* 下载步骤：

    * 登录Oracle公司官网，www.oracle.com，如图所示：在底部选择Developers开发者

      ![1572254490435](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151028.png)

    * 在**Developers**页面中间的技术分类部分，选择`Java`，单击进入，如图所示：

      ![image-20211019110551338](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151034.png)

      展示的是最新Java版本，例如Java17。单击Download Java，然后选择具体的版本下载。

      ![image-20211019110843394](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151038.png)

    * 选择Download Java按钮后

![image-20211019111110242](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151042.png)



![image-20211019111150970](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151048.png)

![image-20211019111209831](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151061.png)

选择**Accept License Agreement**，

![image-20211019111252989](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151570.png)

注册或登录后下载

![image-20211019111922387](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151589.png)



### 2.JDK的安装

* 安装步骤：

    * 双击`jdk-8u202-windows-x64.exe`文件，并单击`下一步`，如图所示：

      ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151620.jpg)

    * 取消独立JRE的安装，单击`公共JRE前的下拉列表`，选择`此功能将不可用`如图所示：

      ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151642.jpg)

    * 修改安装路径，单击更改，如图所示：

      ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151666.jpg)

    * 将安装路径修改为`D:\develop\Java\jdk1.8.0_202\`，并单击确定，如图所示：

      ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151691.jpg)

    * 单击下一步，如图所示：

      ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151069.jpg)

    * 稍后几秒，安装完成，如图所示：

      ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292151086.jpg)

    * 目录结构，如图所示：

      ![image-20230529215458318](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292154381.png)

### 3.配置环境变量

为什么配置path？

希望在命令行使用javac.exe等工具时，任意目录下都可以找到这个工具所在的目录。

例如：我们在C:\Users\shark-gao目录下使用java命令，结果如下：

![image-20230529215711755](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292157800.png)

我们在JDK的安装目录的bin目录下使用java命令，结果如下：

![image-20230529215736225](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292157283.png)

我们不可能每次使用 `java.exe`，`javac.exe`等工具的时候都进入到`JDK`的安装目录下，太麻烦了。我们希望在任意目录下都可以使用JDK的bin目录的开发工具，因此我们需要告诉操作系统去哪里找这些开发工具，这就需要配置path环境变量。

#### 方案：配置环境变量

* 步骤：

    * 找到桌面上的此电脑(笔者是Win11系统)，单击鼠标`右键`，选择`属性`，如图所示：

      ![image-20230529220005798](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292200915.png)

    * 在`高级`选项卡，单击`环境变量`，如图所示：

      ![image-20230529220134604](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292201656.png)

    * 点击新建 `JAVA_HOME`这个环境变量

      ![image-20230529220239527](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292202577.png)

    * 在`系统变量`中，选中`Path` 环境变量，`双击`或者`点击编辑` ,如图所示：

      ![image-20230529220356289](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292203342.png)

    - 首先点击新建一个，输入 `%JAVA_HOME%\bin`，将变量引入全局

      ![image-20230529220437327](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292204382.png)

    * 环境变量配置完成，**重新开启**DOS命令行，在任意目录下输入`javac` 命令，运行成功。

      ![image-20230529220631237](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292206320.png)

## 1.6 入门程序HelloWorld（掌握）

### 1.6.1 HelloWorld案例

#### 1.程序开发步骤说明

JDK安装完毕，可以开发我们第一个Java程序了。

Java程序开发三步骤：**编写**、**编译**、**运行**。

![开发步骤](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292213143.jpg)



#### 2.编写Java源程序保存.java源文件

1. 在`E:\exer_code\Java2023\chapter01_JavaGrammar\src\main\java` 目录下新建文本文件，完整的文件名修改为`HelloWorld.java`，其中文件名为`HelloWorld`，后缀名必须为`.java`。
2. 用记事本等文本编辑器打开（笔者这里使用记事本是为了让大家熟悉一个Java程序从编译到运行的过程，后面会使用IDEA进行开发）

3. 在文件中输入如下代码，并且`保存`：

```java
public class HelloWorld {
  	public static void main(String[] args) {
    	System.out.println("Hello world!");
  	}
}
```

> 友情提示：
>
> 每个字母和符号必须与示例代码一模一样。

第一个`HelloWord` 源程序就编写完成了，但是这个文件是程序员编写的，JVM是看不懂的，也就不能运行，因此我们必须将编写好的`Java源文件` 编译成JVM可以看懂的`字节码文件` ，也就是`.class`文件。



#### 3.编译Java源文件生成.class字节码文件

在DOS命令行中，**进入**`E:\exer_code\Java2023\chapter01_JavaGrammar\src\main\java`**目录**，使用`javac` 命令进行编译。

方式一：使用文件资源管理器打开`E:\exer_code\Java2023\chapter01_JavaGrammar\src\main\java`**目录**，然后在地址栏输入cmd。

![image-20230529221802557](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292218623.png)

命令：

```java
javac Java源文件名.后缀名
```

举例：

```java
javac HelloWorld.java
```

![image-20230529221919778](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292219852.png)

编译成功后，命令行没有任何提示。打开`E:\exer_code\Java2023\chapter01_JavaGrammar`目录，发现产生了一个新的文件 `HelloWorld.class`，该文件就是编译后的文件，是Java的可运行文件，称为**字节码文件**，有了字节码文件，就可以运行程序了。

> Java源文件的编译工具`javac.exe`



#### 4.运行Java程序

在DOS命令行中，在字节码文件目录下，使用`java` 命令进行运行。

命令：

```java
java 主类名字
```

主类是指包含main方法的类，main方法是Java程序的入口：

```java
public static void main(String[] args){
    
}
```

举例：

```
java HelloWorld
```

> 友情提示：
>
> java HelloWord  不要写 不要写 不要写 .class
>
> `如果有包名的话一定加上包名`，否则会显示找不到主类

![image-20230529222543061](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292225123.png)

> Java字节码文件的运行工具：java.exe

### 1.6.2 HelloWorld案例常见错误

* 	单词拼写问题
* 正确：class		错误：Class
* 正确：String              错误：string
* 正确：System            错误：system
* 正确：main		错误：mian
* 	Java语言是一门严格区分大小写的语言
* 	标点符号使用问题
* 不能用中文符号，英文半角的标点符号（正确）
* 括号问题，成对出现

### 1.6.3 Java程序的结构与格式

结构：

```markdown
类{
    方法{
        语句;
    }
}
```

格式：

（1）每一级缩进一个Tab键

（2）{} 的左半部分在行尾，右半部分单独一行，与和它成对的"{"的行首对齐

### 1.6.4 public class与class的区别（掌握）

1. 一个java源文件中可以定义多个class
2. 一个class会编译生成一个class文件
3. public的类可以没有，有的话，只能有一个，并且public的类名要和源文件名保持一致
4. 任何一个class中都可以有main方法，但对于一个软件来说，一般入口只有一个

### 1.6.5 编写Java程序时应该注意的问题

#### 1.字符编码问题

当cmd命令行窗口的字符编码与.java源文件的字符编码不一致，如何解决？

![image-20230529222753386](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292227438.png)

解决方案：

	在使用javac命令式，可以指定源文件的字符编码

```cmd
javac -encoding utf-8 HelloWorld.java
```



#### 2.大小写问题

（1）源文件名：

```Markdown
在Windows操作系统中.java的源文件名不区分大小写，我们建议大家养成区分大小写的习惯。
```

（2）字节码文件名与类名

```Markdown
严格区分大小写
```

（3）代码中

```Markdown
严格区分大小写
```



#### 3.源文件名与类名一致问题？

（1）源文件名是否必须与类名一致？`public`呢？

```Markdown
如果这个类不是public，那么源文件名可以和类名不一致。但是不便于代码维护。

如果这个类是public，那么要求源文件名必须与类名一致。否则编译报错。

我们建议大家，不管是否是public，都与源文件名保持一致，而且一个源文件尽量只写一个类，目的是为了好维护。
```

（2）一个源文件中是否可以有多个类？`public`呢？

```Markdown
一个源文件中可以有多个类，编译后会生成多个.class字节码文件。

但是一个源文件只能有一个public的类。
```

（3）main方法必须在`public`的类中吗？

```Markdown
不是。

但是后面写代码时，基本上main方法（主方法）习惯上都在public类中。
```

## 1.7 本章练习题

### 打印你的个人信息

包括：姓名，年龄，性别，家庭住址，联系电话等

![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292231284.png)

```java
public class PersonalInfo {
    public static void main(String[] args) {
        System.out.println("姓名：张三");
        System.out.println("年龄：25");
        System.out.println("性别：男");
        System.out.println("家庭住址：北京市海淀区");
        System.out.println("联系电话：13888888888");
    }
}
```

### 打印一个菱形

![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292231288.png)

```java
public class Diamond {
    public static void main(String[] args) {
        System.out.println("    *    ");
        System.out.println("   ***   ");
        System.out.println("  *****  ");
        System.out.println(" ******* ");
        System.out.println("*********");
        System.out.println(" ******* ");
        System.out.println("  *****  ");
        System.out.println("   ***   ");
        System.out.println("    *    ");
    }
}
```

### 打印商品列表

![image.png](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305292231317.png)

```java
public class ProductList {
    public static void main(String[] args) {
        System.out.println("Product\t\tPrice\tStock");
        System.out.println("Apple\t\t3.5\t10");
        System.out.println("Banana\t\t2.5\t20");
        System.out.println("Orange\t\t4.0\t15");
        System.out.println("Watermelon\t5.0\t5");
        System.out.println("Grape\t\t6.0\t8");
    }
}
```



## 1.8 本章面试题

### 你认为Java是解释型语言还是编译型语言？

Java既不是纯解释型语言，也不是纯编译型语言，而是一种混合型语言。Java源代码首先会被编译成字节码文件，字节码文件不是针对特定的硬件和操作系统而编译的，而是针对Java虚拟机（JVM）而编译的。字节码文件在运行时由JVM解释执行，JVM会将字节码文件转换为机器码并执行，这样就可以实现跨平台性，使得Java程序可以在任何安装了JVM的计算机上运行。因此，Java是一种混合型语言，它既具备编译型语言的高效性，又具备解释型语言的跨平台性。

### Java是如何做到跨平台的，请说出你的理解？

Java是一种基于虚拟机的编程语言，它的跨平台性是通过Java虚拟机（JVM）实现的。Java程序在编译时会被编译成字节码，而不是直接编译成机器语言。这些字节码可以在任何支持Java虚拟机的平台上运行，包括Windows、Mac、Linux等操作系统。
Java虚拟机是一个抽象的计算机，它提供了一个独立于硬件平台的运行环境。当Java程序在不同的操作系统上运行时，JVM会将字节码解释成机器码，从而实现跨平台运行。这种机制保证了Java程序在不同平台上的一致性和可移植性。
总的来说，Java的跨平台性是通过将程序编译成字节码，再由Java虚拟机解释执行实现的。这种机制使得Java程序可以在不同平台上运行，无需重新编译。

### 请解释一下Java中的类路径是什么？

Java中的类路径（Classpath）是指JVM在搜索类文件（.class文件）时所使用的路径。在Java中，当需要加载一个类时，JVM会按照一定的顺序在类路径中查找该类的字节码文件。如果找到了该文件，则会加载该类并创建相应的对象。
类路径可以由多个路径组成，路径之间用分号（Windows系统）或者冒号（Unix/Linux系统）分隔。在Java中，类路径可以分为系统类路径和用户类路径。
系统类路径是JVM默认的类路径，它包含了Java运行环境中的核心类库和扩展类库。系统类路径可以通过系统属性"java.class.path"来获得。
用户类路径是用户自定义的类路径，它包含了用户自己编写的类文件和第三方库文件。用户类路径可以通过"-classpath"或"-cp"选项指定，也可以通过设置系统环境变量CLASSPATH来指定。
通常情况下，Java程序的类文件都位于用户类路径中，而核心类库和扩展类库位于系统类路径中。在编写Java程序时，需要根据实际情况配置类路径，以确保程序能够正常运行。

### Java字节码是机器码吗？

Java字节码不是机器码。Java源代码在编译时会被编译成Java字节码（.class文件），而不是直接编译成机器码。Java字节码是一种中间代码，它是一种平台无关的二进制代码，可以在任何支持Java虚拟机（JVM）的平台上运行。
Java字节码是由Java编译器生成的一种二进制文件，它包含了Java源代码编译后的中间代码，而不是机器码。Java字节码可以被JVM解释执行，JVM会将字节码解释成机器码，从而实现跨平台运行。
Java字节码的优点是可以在不同平台上运行，而不需要重新编译。这种机制使得Java程序具有很强的可移植性和跨平台性。但是，由于Java字节码需要被JVM解释执行，因此Java程序的执行速度相对较慢。

## 1.9 本章总结

1. 计算机的核心硬件是什么？各自有什么用？
2. 软件分为哪两类？
3. 你知道哪些系统软件？
4. 你知道哪些应用软件？
5. 计算机语言发展的大体趋势是怎样的？
6. Java之父的名字是？logo是？
7. Java中被长期支持的稳定版本是？
8. Java语言的三大分支？
9. Java中非常重要的两个特性是？
10. 能够简单的描述出Java的加载与执行的过程。
11. 能够独立的编写第一个Java程序，从安装JDK，到配置环境变量，到编写，到编译，到最终的运行。
12. 能够完全理解PATH环境变量
13. 能够完全理解CLASSPATH环境变量
14. Java注释的三种写法？
15. 了解javadoc命令
16. 一个文件中可以定义多个class，一个class会生成一个class文件
17. public的类可以没有，但如果有，只能有一个，并且和源文件名一致
18. 任何一个class中都可以有main方法，但对于一个软件来说，一般入口只有一个


![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)


![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)