---
title: Linux自用笔记    
icon: circle-info
order: 1
tags:
  - "Linux\U0001F964"
categories:
  - "Linux\U0001F964"
pageview: false
date: 2023-10-09 15:46:30
comment: false
breadcrumb: false
---

## 1.命令终端字段含义介绍

- [root@localhost ~]#

- 解释：

    - root：当前登录系统用户名(root超级管理员)
    - localhost ：当前主机名
    - ~：当前用户所在目录（~ 为家目录） ，root超级管理员家目录：/root
    - #： 当前用户身份是超级管理员

- [student@localhost ~]$

    - $：当前用户身份为普通用户，普通用户的家目录：/home/用户名同名




## 3.Linux系统基本概念

- 多用户的系统：允许同时有很多个用户登录系统，使用系统里的资源
- 多任务的系统：允许同时执行多个任务
- 严格区分大小写：命令，选项，参数，文件名，目录名都严格区分大小写
- 一切皆文件：硬件设备（内存、CPU、网卡、显示器、硬盘等等）都是以文件的形式存在的
- 不管是文件还是目录都是以倒挂的树形结构，存在于系统的“/”根目录下，根目录是Linux系统的起点
- 对于Linux系统而言，目录/文件没有扩展名一说，扩展名如：.sh（脚本文件)   .conf（配置文件） .log（日志文件）   .rpm（软件包）.tar（压缩包）是易于用户方便识别
- 没有提示就是最好的提示（成功了）
- Linux系统没有回收站

## 4.显示行号

第一步，打开[vim](https://so.csdn.net/so/search?q=vim&spm=1001.2101.3001.7020)

```shell
vim ~/.vimrc
```

第二步，在该文件中加入一行，命令如下：

```shell
set nu                       # 显示行号
set nonu                     # 不显示行号    
```



## 5.命令行编辑技巧

键盘上下键调出历史命令

> Ctrl + c：废弃当前命令行中的命令，取消当前执行的命令，例如ping
>
> Ctrl + l,clear：清屏
>
> tab建自动补齐：可补齐命令、参数、文件路径、软件名
>
> esc + . ：将上一条命令参数变成当前命令的执行对象
>
> Ctrl + a：将当前光标移动至行首
>
> Ctrl + e：将当前光标移动至行尾
>
> Ctrl + u 清空至行首
>
> Ctrl + w 删除一个单词
>
> exit，logout：退出系统



## 6.命令行一般命令格式

- 命令字 [-选项...] [参数...]
    - 命令字：命令本身（功能）
    - 选项：调整命令功能的
        - 短选项：-l  -a  -d  -h（单个字符），短选项可以合并使用：-lad   -lh
        - 长选项：--help（单词），长选项通常是不能合并使用的
    - 参数：命令的执行对象，文件/目录/程序等
    - []：可选的
    - ...：可以同时有多个选项或参数



## 7.Linux系统辨别目录与文件的方法

> 蓝色表示目录（windows系统里的文件夹）
>
> 白色表示文件
>
> 浅蓝色表示链接文件（类似于windows系统的快捷方式）
>
> 绿色表示可执行文件（如脚本，命令程序文件）
>
> 红色表示压缩文件
>
> 黄色表示设备文件（硬盘、键盘、鼠标、网卡、CPU硬件设备都是以文件的形式存在的）
>
> 红色闪动文件——>表示链接文件不可用



## 8.ls 查看目录/文件命令

- ls命令（英文全拼：list）：用于查看目录下内容及目录和文件详细属性信息

- 命令格式：ls [-选项...] [参数...]

- 常用选项：
    - -a 显示目录下所有内容，包含隐藏的内容
    - -l 以长格式显示目录下的内容及详细属性
    - -h 人性化显示目录下内容大小（kB、MB、GB）
    - -d 仅显示目录本身而不显示目录下的内容
    - -i 查看inode号（系统任何的文件或目录都有一个唯一的编号）
    - -R：递归查看目录下所有内容（从头到尾）
- 注意（附加）：递归是指将所有的目录从头到尾全部呈现出来。



## 9.Linux系统文件类型

> \- 文件：
>
> d 目录：
>
> l 链接文件
>
> b 跨设备文件
>
> c 字符设备文件
>
> p 管道设备文件
>
> s 套接字



## 10.Linux系统下的归属关系

- 在**Linux**系统下，文件给用户分成了三类

    -  所有者：文件或目录的拥有者，拥有者的权限通常是最大的
    -  所属组：文件或目录属于哪一个组，所属组的权限略微比所有者小

    -  其他人：既不是文件或目录的所有者，也不属于文件或目录组内的成员，其他人的权限通常最小的权限

- ls命令示例：

```shell
#显示当前所在目录下的所有内容
[root@localhost ~]# ls		

#查看根目录下所有内容
[root@localhost ~]# ls   /
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

#查看/etc目录下所有内容
[root@localhost ~]# ls /etc

#查看/bin目录下所有内容
[root@localhost ~]# ls /bin

#查看/dev目录下所有内容
[root@localhost ~]# ls /dev

#查看目录下所有目录和文件，包括隐藏的内容
[root@localhost ~]# ls -a

#以长格式显示目录下所有内容，包括详细的属性信息
[root@localhost ~]# ls -l
-rw-r--r--. 1 root root 0 10月 24 15:16 hello

#解释
-：文件类型
1：代表文件的引用次数
root：文件的所有者
root：文件的所属组
0：文件的大小，默认以字节为单位显示大小
10月 24 15:16：文件最近一次的修改时间
hello：文件名

#以长格式显示目录所有内容，以人性化的方式显示详细的属性信息
[root@localhost ~]# ls -l -h

#短选项合并使用
[root@localhost ~]# ls -lh

#以长格式显示目录所有内容，以人性化的方式显示详细的属性信息，包括隐藏的内容
[root@localhost ~]# ls -lha


#以长格式显示根目录下所有内容，包括详细的属性信息
[root@localhost ~]# ls -l /
lrwxrwxrwx.   1 root root    7 3月  13 17:15 bin -> usr/bin

#创建hello.txt文件
[root@localhost ~]# touch hello.txt

#查看文件的元数据信息
[root@localhost ~]# stat hello.txt
  文件："hello.txt"
  大小：0         	块：0          IO 块：4096   普通空文件
设备：fd00h/64768d	Inode：33575020    硬链接：1
权限：(0644/-rw-r--r--)  Uid：(    0/    root)   Gid：(    0/    root)
环境：unconfined_u:object_r:admin_home_t:s0
最近访问：2021-03-14 16:38:14.349861770 +0800
最近更改：2021-03-14 16:38:14.349861770 +0800
最近改动：2021-03-14 16:38:14.349861770 +0800
创建时间：-

```



## 11.Linux基本权限的类别

- r 读取  w 写入  x 执行  - 没有权限

- 权限顺序：rwx  rwx  rwx

```shell
[root@localhost ~]# ls -l
-rw-r--r--. 1 root root 1831 3月  13 17:45 initial-setup-ks.cfg
# 解释
-：文件类型
rw- r-- r--：所有者u、所属组g、其他人o的权限
u   g   o

r 读取权限，w写入权限，x执行权限，-没有任何权限

1：代表文件的引用次数，只针对与做了硬连接的文件才有效
root：文件的所有者
root：文件的所属组
1831：文件的大小，默认以字节为单位显示大小
3月  13 17:45：文件最近一次的修改时间
initial-setup-ks.cfg：文件名

#查看/root目录本身详细属性信息
[root@localhost ~]# ls -ld /root
dr-xr-x---. 14 root root 4096 3月  14 16:38 /root

#查看当前目录下所有内容的inode号
[root@localhost ~]# ls -i
33574979 anaconda-ks.cfg  33574984 initial-setup-ks.cfg  33575035 模板  33575036 图片  17470701 下载            17470702 音乐
33575020 hello.txt        51909391 公共                  51909392 视频   3204374 文档  33575017 新建文件夹.zip   3204373 桌面

#查看hello.txt文件的inode号
[root@localhost ~]# ls -i hello.txt
33575020 hello.txt

#查看/etc/目录本身的inode号
[root@localhost ~]# ls -id /etc
16777281 /etc
```



## 12.绝对路径与相对路径

- 绝对路径：以 **/（根）** 为起点，到达你想去的目标目录称为绝对路径
- 相对路径：以当前路径为起点，到达你想去的目标目录

- 常用快捷操作：

    - ~ 表示为家目录
    - . 表示为当前目录
    - .. 表示上一级目录
- -可在两路径之间来回切换



## 13.pwd 打印当前所在目录

- pwd（英文全拼：print work directory）打印当前所在的工作目录，执行pwd命令后，可显示当前所在的工作目录的绝对路径名称

- 命令格式：pwd [-选项]

```bash
[root@localhost ~]# cd /opt/a/b/c/d

#打印当前所在目录绝对路径
[root@localhost d]# pwd
/opt/a/b/c/d

#切换到用户家目录
[root@localhost d]# cd ~
[root@localhost ~]# pwd
/root
[root@localhost ~]# cd /opt/a/b/c/d
[root@localhost d]# pwd
/opt/a/b/c/d
[root@localhost d]# cd
[root@localhost ~]# pwd
/root

[root@localhost ~]# cd /bin
[root@localhost bin]# pwd
/bin

[root@localhost bin]# cd /boot
[root@localhost boot]# pwd
/boot
[root@localhost boot]# ls

[root@localhost boot]# cd /dev
[root@localhost dev]# pwd
/dev
[root@localhost dev]# ls

[root@localhost dev]# cd /etc
[root@localhost etc]# pwd
/etc
[root@localhost etc]# ls

[root@localhost etc]# ls /
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

#“.”表示当前所在目录，对于cd命令而言作用不大
[root@localhost etc]# cd .

[root@localhost etc]# cd /opt/a/b/c/d
[root@localhost d]# pwd
/opt/a/b/c/d

#“..”切换到当前目录的上一级目录
[root@localhost d]# cd ..
[root@localhost c]# pwd
/opt/a/b/c

[root@localhost c]# cd ..
[root@localhost b]# pwd
/opt/a/b

[root@localhost b]# cd ..
[root@localhost a]# cd ..
[root@localhost opt]# pwd
/opt

[root@localhost opt]# cd ..
[root@localhost /]# cd ..
[root@localhost /]# cd
[root@localhost ~]# ls

[root@localhost ~]# cd /opt/a/b/c/d
[root@localhost d]# pwd
/opt/a/b/c/d

#"-"可在两个路径之间来回切换
[root@localhost d]# cd /etc/yum
[root@localhost yum]# cd -
/opt/a/b/c/d

[root@localhost d]# pwd
/opt/a/b/c/d

[root@localhost d]# cd -
/etc/ym

[root@localhost yum]# cd -
/opt/a/b/c/d

[root@localhost d]# cd -
/etc/yum
```



## 14.rmdir 删除空目录命令

- rmdir（英文全拼：remove directory）删除空目录

- 命令格式：rmdir [-选项] 目录名

```shell
#rmdir只能删除空目录，如果目录下存在数据无法删除
[root@localhost ~]# rmdir /opt/a
rmdir: 删除 "/opt/a" 失败: 目录非空
[root@localhost ~]# ls -R /opt/a
/opt/a:
b

/opt/a/b:
c

/opt/a/b/c:
d

/opt/a/b/c/d:

[root@localhost ~]# rmdir /opt/a/b/c/d
[root@localhost ~]# ls -R /opt/a
/opt/a:
b

/opt/a/b:
c

/opt/a/b/c:

[root@localhost ~]# rmdir /opt/a/b/c
[root@localhost ~]# ls -R /opt/a/b
/opt/a/b:

[root@localhost ~]# rmdir /opt/a/b
[root@localhost ~]# ls -R /opt/a
/opt/a:

[root@localhost ~]# rmdir /opt/a
[root@localhost ~]# ls /opt
rh  student  xx

[root@localhost ~]# rmdir /opt/
rmdir: 删除 "/opt/" 失败: 目录非空
```



## 15.touch 创建文件命令

- touch 命令用于创建新的空白文件

- 命令格式：touch [-选项] 文件名

```shell
#在当前路径创建空文件
[root@localhost ~]# touch hello
[root@localhost ~]# ls

#在当前路径同时创建多个文件
[root@localhost ~]# touch t1 t2 t3 t4
[root@localhost ~]# ls

#在指定路径同时创建多个文件
[root@localhost ~]# touch /opt/test1 /opt/test2 /opt/test3
[root@localhost ~]# ls /opt
rh  student  test1  test2  test3  xx

#如果存在同名目录时，无法创建
[root@localhost ~]# mkdir test
mkdir: 无法创建目录"test": 文件已存在

#如果存在同名文件时，touch命令没有提示，但原有文件不会被覆盖
[root@localhost ~]# touch t1

#对于目录而言，只有单个目录的时候，“/”可有可无
[root@localhost ~]# ls /opt/
rh  student  test1  test2  test3  xx
[root@localhost ~]# ls /opt
rh  student  test1  test2  test3  xx

#对于目录而言，查看目录下的内容时，必须要有“/”
[root@localhost ~]# ls /opt/xx
oo

#对于文件而言，后边绝对不能有“/”
[root@localhost ~]# ls /opt/test1
/opt/test1
[root@localhost ~]# ls /opt/test1/
ls: 无法访问/opt/test1/: 不是目录
```



## 16.cp 复制命令

- cp（英文全拼：copy file）用于复制文件或目录，cp命令在复制时也可修改目录或文件名字

- 命令格式：cp [-选项] 源文件或目录 目标目录

- 常用选项：
    - -p 保留源文件属性不变（如：修改时间、归属关系、权限）
    - -r 复制目录（包含该目录下所有的子目录和文件）

```shell
#复制当前目录文件到/opt目录（相对路径方式复制）
[root@localhost ~]# cp t1 /opt/
[root@localhost ~]# ls /opt
rh  student  t1  test1  test2  test3  xx

#复制文件到/opt目录（绝对路径方式复制）
[root@localhost ~]# cp /root/t2 /opt
[root@localhost ~]# ls /opt
rh  student  t1  t2  test1  test2  test3  xx

#同时复制多个文件
[root@localhost ~]# cp t3 t4 /opt/
[root@localhost ~]# ls /opt

#创建目录
[root@localhost ~]# mkdir abc

#使用-r对目录执行复制
[root@localhost ~]# cp -r abc /opt
[root@localhost ~]# ls /opt

#同时复制多个目录
[root@localhost ~]# mkdir abc1 abc2 abc3
[root@localhost ~]# cp -r abc1 abc2 abc3 /opt
[root@localhost ~]# ls /opt

#复制hello文件到/opt并改名为hello.txt
[root@localhost ~]# cp hello /opt/hello.txt
[root@localhost ~]# ls /opt

#复制xxxx目录到/opt并改名xxoo
[root@localhost ~]# mkdir xxxx
[root@localhost ~]# cp -r xxxx /opt/xxoo
[root@localhost ~]# ls /opt

#使用“.”配合cp命令执行复制
[root@localhost ~]# cd /etc/sysconfig/network-scripts/
[root@localhost network-scripts]# pwd
/etc/sysconfig/network-scripts

[root@localhost network-scripts]# cp /root/t1 .
[root@localhost network-scripts]# ls

#操持属性不变复制文件
[root@localhost ~]# cp -p anaconda-ks.cfg /opt
cp：是否覆盖"/opt/anaconda-ks.cfg"？ y                         
[root@localhost ~]# ls -l /opt/anaconda-ks.cfg 
-rw-------. 1 root root 1800 3月  13 17:34 /opt/anaconda-ks.cfg

#对比以上两个文件的详细属性信息（最后一次修改时间）
[root@localhost ~]# ls -l anaconda-ks.cfg 
-rw-------. 1 root root 1800 3月  13 17:34 anaconda-ks.cfg

#这两个操作代表什么意思？
[root@localhost ~]# cp -r xxxx /mnt/oooo  #拷贝并改名
[root@localhost ~]# cp -r xxxx /mnt/oooo  #拷贝
```



## 17.mv 移动命令

- mv（英文全拼：move file）用于移动文件或目录到其他位置，也可用于修改目录或文件名

- 命令格式：mv [-选项] 源文件... 目标路径

```shell
#移动当前路径hello文件到/mnt目录
[root@localhost ~]# mv hello /mnt
[root@localhost ~]# ls /mnt
hello  home  oooo  test

#同时移动多个文件
[root@localhost ~]# mv t1 t2 t3 t4 /mnt
[root@localhost ~]# ls /mnt
hello  home  oooo  student1  t1  t2  t3  t4  test

#移动/opt目录下文件到/mnt
root@localhost ~]# mv /opt/test1 /opt/test2 /opt/test3 /mnt/
[root@localhost ~]# ls /mnt
hello  home  oooo  student1  t1  t2  t3  t4  test  test1  test2  test3

#移动目录
[root@localhost ~]# mv student1 /mnt
[root@localhost ~]# ls /mnt
hello  home  oooo  student1  test

#移动文件并改名
[root@localhost ~]# mv hello.txt /media/hello
[root@localhost ~]# ls /media/
hello

#移动目录并改名
[root@localhost ~]# mv test /media/testxx
[root@localhost ~]# ls /media/
hello  testxx
```



## 18.cat 查看文件内容命令

- cat （英文全拼：concatenate）命令用于查看文本文件内容

- 命令格式：cat [选项] 文件名

- 常用选项
    -  -n #查看文件时以行号的形式显示文件内容

```shell
#查看文件内容
[root@localhost ~]# cat anaconda-ks.cfg 
[root@localhost ~]# cat initial-setup-ks.cfg 
[root@localhost ~]# cat /etc/hosts

#查看网卡文件内容，网卡配置文件
[root@localhost ~]# cat /etc/sysconfig/network-scripts/ifcfg-ens32 
...
NAME="ens32"   //网卡名
UUID="16085f4c-f690-4058-b29e-d55c73387026"
DEVICE="ens32"
ONBOOT="yes"
IPADDR="192.168.0.50"     //网卡IP地址
PREFIX="24"			      //子网掩码
GATEWAY="192.168.0.254"   //网关
DNS1="114.114.114.114"    //DNS

#查看当前系统用户基本信息文件内容
[root@localhost ~]# cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin

#查看当前系统主机名配置文件内容
[root@localhost ~]# cat /etc/hostname
localhost.localdomain

#查看当前系统版本信息文件内容
[root@localhost ~]# cat /etc/redhat-release 
CentOS Linux release 7.6.1810 (Core) 

#查看当前系统开机自动挂载配置文件内容
[root@localhost ~]# cat /etc/fstab

#查看系统组基本信息文件内容
[root@localhost ~]# cat /etc/group

#使用“-n”以行号形式显示文件内容
[root@localhost ~]# cat -n /etc/passwd
[root@localhost ~]# cat -n /etc/hostname
[root@localhost ~]# cat -n /etc/fstab
[root@localhost ~]# cat -n /etc/group
[root@localhost ~]# cat -n /etc/services 

```



## 19.less命令

- less工具是对文件的输出进行分页显示的工具，常用于查看内容量较大的文件

- 命令格式：less [-选项] 文件

- 常用选项：
    - -N #以行号形式显示文件内容

- 使用技巧：

    - 键盘上下键逐行查看
    - pgdn ：向下翻一页（Fn + 下键）
    - pgup ：向上翻一页（Fn + 上键）
- /字符串 ：搜索指定字符串（n从上向下搜索，N从下向上搜索）
    - G：直接跳转到文件最后一行
    - gg：直接跳转到文件行首
    - ：1000   #精准的定位到某一行
    - q ：退出

```shell
[root@localhost ~]# less -N /etc/services
```



## 20.head与tail命令

- head命令：用来显示文件开头部分内容，默认显示文件开头10行内容

- 命令格式：head [选项] 参数

- 常用选项：
    - -n<行数> 指定显示的行数

 ```shell
[root@localhost ~]# head /etc/passwd
[root@localhost ~]# head /etc/fstab
[root@localhost ~]# head /etc/group
[root@localhost ~]# head /etc/hostname
[root@localhost ~]# head /etc/hosts
[root@localhost ~]# head /etc/sysconfig/network-scripts/ifcfg-ens32 

#查看存放DNS配置文件信息
[root@localhost ~]# head /etc/resolv.conf 

#使用-n指定显示文件前多少行内容
[root@localhost ~]# head -n 5 /etc/passwd
[root@localhost ~]# head -n 6 /etc/passwd
[root@localhost ~]# head -n 15 /etc/passwd
[root@localhost ~]# head -n 20 /etc/passwd
 ```



- tail命令：用来显示文件末尾部分内容，默认显示文件末尾10行内容

- 命令格式：tail [选项] 参数

- 常用选项：-n<行数> 指定显示的行数  -f 动态显示

```shell
[root@localhost ~]# tail /etc/passwd

#使用“-n”指定显示文件末尾多少行内容
[root@localhost ~]# tail -n 5 /etc/passwd
[root@localhost ~]# tail -n 5 /etc/sysconfig/network-scripts/ifcfg-ens32 
IPADDR="192.168.0.50"
PREFIX="24"
GATEWAY="192.168.0.254"
DNS1="114.114.114.114"
IPV6_PRIVACY="no"

#动态查看文件内容
[root@localhost ~]# touch t1
root@localhost ~]# tail -f t1

#另开一个终端向文件写入内容
[root@localhost ~]# echo 123 > t1
```



## 21.rm 删除命令

- rm（英文全拼：remove）命令用于删除文件或者目录。

- 命令格式：rm [-选项…] 目录或文件…

- 常用选项
    -  -f 强制删除
    -  -r 删除目录
    -  ***** 特殊字符：系统常用符号，用来代表任意所有字符

```shell
[root@localhost ~]# ls /opt
abc  abc1  abc2  abc3  anaconda-ks.cfg  hello.txt  home  rh  student  t1  t2  t3  t4  xx  xxoo

[root@localhost ~]# ls /mnt
hello  home  oooo  student1  t1  t2  t3  t4  test  test1  test2  test3

#删除指定目录下文件
[root@localhost ~]# rm /opt/anaconda-ks.cfg 
rm：是否删除普通文件 "/opt/anaconda-ks.cfg"？y  #默认需要确认（y|n）

#查看文件是否被成功删除
[root@localhost ~]# ls /opt
abc  abc1  abc2  abc3  hello.txt  home  rh  student  t1  t2  t3  t4  xx  xxoo

[root@localhost ~]# rm /opt/hello.txt 
rm：是否删除普通空文件 "/opt/hello.txt"？y

#同时删除目录下指定文件
[root@localhost ~]# rm /opt/t1 /opt/t2 /opt/t3 /opt/t4
rm：是否删除普通空文件 "/opt/t1"？y
rm：是否删除普通空文件 "/opt/t2"？y
rm：是否删除普通空文件 "/opt/t3"？y
rm：是否删除普通空文件 "/opt/t4"？y

#查看文件是否被成功删除
[root@localhost ~]# ls /opt
abc  abc1  abc2  abc3  home  rh  student  xx  xxoo

#使用“-f”强制删除文件（无需确认，直接删除）
[root@localhost ~]# rm -f /mnt/hello
[root@localhost ~]# ls /mnt
home  oooo  student1  t1  t2  t3  t4  test  test1  test2  test3

#同时强制删除多个文件
[root@localhost ~]# rm -f /mnt/t1 /mnt/t2 /mnt/t3 /mnt/t4
[root@localhost ~]# ls /mnt

#删除目录
[root@localhost ~]# rm  -r /opt/abc
rm：是否删除目录 "/opt/abc"？y

[root@localhost ~]# ls /opt
abc1  abc2  abc3  home  rh  student  xx  xxoo

#同时删除多个目录
[root@localhost ~]# rm -r /opt/abc1 /opt/abc2 /opt/abc3
rm：是否删除目录 "/opt/abc1"？y
rm：是否删除目录 "/opt/abc2"？y
rm：是否删除目录 "/opt/abc3"？y

[root@localhost ~]# ls /opt
home  rh  student  xx  xxoo

#同时强制删除多个目录
[root@localhost ~]# rm -rf /opt/home /opt/student /opt/xx /opt/xxoo
[root@localhost ~]# ls /opt
rh

#创建目录与文件
[root@localhost ~]# touch /opt/t1
[root@localhost ~]# mkdir /opt/test
[root@localhost ~]# ls /opt
rh  t1  test

#rm命令在删除目录时，包含改目录及目录下所有数据全部删除
[root@localhost ~]# rm -rf /opt/
[root@localhost ~]# ls /

[root@localhost ~]# ls /mnt
home  oooo  student1  test  test1  test2  test3

#使用“*”通配任意所有字符，删除/mnt目录下所有数据
[root@localhost ~]# rm -rf /mnt/*
[root@localhost ~]# ls /mnt
```



## 22.软连接与硬连接

- Linux中的链接文件类似于windows中的快捷方式
- 软连接特点：软连接可以跨分区，可以对目录进行链接，源文件删除后，链接文件不可用
- 软连接命令格式：ln -s 源文件路径  目标路径
- 注意：创建链接时一定要写目录或文件的绝对路径，哪怕是在当前路径下，也要写绝对路径·

```shell
[root@localhost ~]# touch hello.soft
[root@localhost ~]# ls

#创建软连接（必须要绝对路径创建）
[root@localhost ~]# ln -s /root/hello.soft /opt
[root@localhost ~]# ls /opt

#查看连接文件详细属性
[root@localhost ~]# ls -l /opt/hello.soft 

lrwxrwxrwx. 1 root root 16 3月  21 14:28 /opt/hello.soft -> /root/hello.soft

#提示：链接文件的权限最终取决于源文件的权限

#普通用户验证

[lisi@localhost ~]$ ls /opt
hello.soft
[lisi@localhost ~]$ ls -l /opt/hello.soft 
lrwxrwxrwx. 1 root root 16 3月  21 14:28 /opt/hello.soft -> /root/hello.soft
[lisi@localhost ~]$ cat /opt/hello.soft 

cat: /opt/hello.soft: 权限不够
#提示：由于源文件存放于/root目录下，而普通用户对/root目录没有任何权限，所以普通用户无法查看

#删除源文件
[root@localhost ~]# rm -f /root/hello.soft 
[root@localhost ~]# ls

#删除源文件后，软链接文件不可用
[root@localhost ~]# ls -l /opt/hello.soft 
lrwxrwxrwx. 1 root root 16 3月  21 14:28 /opt/hello.soft -> /root/hello.soft

#创建文件并创建软连接
[root@localhost ~]# touch hello.soft
[root@localhost ~]# ln -s /root/hello.soft /opt

[root@localhost ~]# ls -l /opt/hello.soft 
lrwxrwxrwx. 1 root root 16 3月  21 14:39 /opt/hello.soft -> /root/hello.soft

#删除链接文件后，源文件仍然可用
[root@localhost ~]# rm -f /opt/hello.soft 
[root@localhost ~]# ls
[root@localhost ~]# cat hello.soft 

#对目录创建软连接
[root@localhost ~]# ln -s /root/test1 /opt/

[root@localhost ~]# ls -ld /opt/test1
lrwxrwxrwx. 1 root root 11 3月  21 14:44 /opt/test1 -> /root/test1

3创建链接时一定要写目录或文件的绝对路径，哪怕是在当前路径下，也要写绝对路径
[root@localhost ~]# ln -s hello.soft /opt
[root@localhost ~]# ls /opt
hello.soft  test1

[root@localhost ~]# ls -l /opt/hello.soft 
lrwxrwxrwx. 1 root root 10 3月  21 14:47 /opt/hello.soft -> hello.soft
```



- 硬链接特点：硬连接不可以跨分区，不可以对目录进行链接，源文件删除后，链接文件仍然可用

- 硬连接命令格式：ln  源文件路径  目标路径

```shell
#创建文件，并创建硬连接
[root@localhost ~]# touch hello.hard
[root@localhost ~]# ln /root/hello.hard /opt/
[root@localhost ~]# ls /opt
hello.hard  hello.soft  test1

#向硬连接的源文件写入内容
root@localhost ~]# echo 123 > /root/hello.hard 

#查看源文件内容
[root@localhost ~]# cat /root/hello.hard 
123

#查看链接文件内容，以同步更新
[root@localhost ~]# cat /opt/hello.hard 
123

#向链接文件写入内容，查看源文件以同步更新
[root@localhost ~]# echo xx >> /opt/hello.hard 

#擦看源文件，以同步更新
[root@localhost ~]# cat /root/hello.hard 
123
xx

#硬连接文件的特点可以保持文件属性不发生改变
[root@localhost ~]# ls -l /root/hello.hard 
-rw-r--r--. 2 root root 7 3月  21 14:55 /root/hello.hard
[root@localhost ~]# ls -l /opt/hello.hard 
-rw-r--r--. 2 root root 7 3月  21 14:55 /opt/hello.hard

#并且硬连接文件的i节点号相同
[root@localhost ~]# ls -i /root/hello.hard 
33711090 /root/hello.hard
[root@localhost ~]# ls -i /opt/hello.hard 
33711090 /opt/hello.hard

#硬连接不允许对目录进行连接
root@localhost ~]# ln /root/test1 /opt
ln: "/root/test1": 不允许将硬链接指向目录

#硬连接源文件删除后，链接文件仍然可用
[root@localhost ~]# rm -f /root/hello.hard 
[root@localhost ~]# cat /opt/hello.hard 
123
xx

#向硬连接文件写入内容
[root@localhost ~]# echo  abc >> /opt/hello.hard 
[root@localhost ~]# cat /opt/hello.hard 
123
xx
abc

#硬连接不允许跨分区
[root@localhost ~]# lsblk
NAME            MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda               8:0    0   20G  0 disk 
├─sda1            8:1    0    1G  0 part /boot
└─sda2            8:2    0   19G  0 part 
  ├─centos-root 253:0    0   17G  0 lvm  /
  └─centos-swap 253:1    0    2G  0 lvm  [SWAP]
sr0              11:0    1  4.3G  0 rom  
[root@localhost ~]# ln /root/hello.soft /boot
ln: 无法创建硬链接"/boot/hello.soft" => "/root/hello.soft": 无效的跨设备连接
```



## 23.Linux命令的分类

- 内部命令：bash程序自带的基本管理命令
- 外部命令：有独立的外部可执行程序文件命令

- type 用于区别内部命令与外部命令

- which 用于查找可以执行程序文件位置

```shell
[root@localhost opt]# type ls

[root@localhost opt]# type cat

[root@localhost opt]# type hash

[root@localhost ~]# echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin

[root@localhost ~]# hash
命中	命令
   1	/usr/bin/cat
   1	/usr/bin/ls


[root@localhost opt]# hash -r
[root@localhost opt]# 
[root@localhost opt]# hash
hash: 哈希表为空

[root@localhost opt]# ls
hello.hard  hello.soft  t1  test1  test.txt
[root@localhost opt]# hash
命中	命令
   1	/usr/sbin/ls
```

- 总结：
    -  shell程序是用户和系统之间的接口，用于解释用户的命令
    -  查找命令对应的程序文件所在位置：which 命令
    -  shell程序大多数存放在/etc/shells文件中
    -  系统默认使用的shell为/bin/bash
    -  查看当前使用的shell：echo $SHELL
    -  区别内部命令与外部命令的方式：typt 命令
    -  shell程序查找可执行程序文件路径定义在$PATH环境变量中
    -  shell查找的外部命令路径结果会记录到缓存的hash表中



## 24.help 命令帮助手册

- help命令用于查看shell内部命令的帮助信息，包括使用方法、选项等…

- 命令格式：help [选项] 命令

```shell
#获取内部命令帮助信息
[root@localhost etc]# help cd

#help无法获取外部命令的帮助信息
root@localhost etc]# help ls
bash: help: 没有与 `ls' 匹配的帮助主题。尝试 `help help' 或者 `man -k ls' 或者 `info ls'。

[root@localhost etc]# type help
help 是 shell 内嵌

#获取help命令本身的帮助信息
[root@localhost etc]# help help

[root@localhost etc]# type cat
cat 是 /usr/bin/cat

[root@localhost etc]# help cat
bash: help: 没有与 `cat' 匹配的帮助主题。尝试 `help help' 或者 `man -k cat' 或者 `info cat'。

#查看命令帮助手册（命令自带）
[root@localhost etc]# cat --help
[root@localhost etc]# ls --help
```



## 25.man 获取命令帮助手册

- man 命令用于查看系统命令的帮助信息，包括使用方法、选项、使用例子等…，对比--help ，man 输出的信息更加详细

- 命令格式：man [-选项]   命令

- 常用快捷操作
    - 向下键向下移一行

    - 向上键向上移一行
    - [Page Down] 向下翻一页
    - [Page Up] 向上翻一页
    - /关键字   #搜索关键字，配合n（向下查询）、N（向上查询）
    - q 退出

```shell
[root@localhost etc]# man ls
[root@localhost etc]# man cat
[root@localhost etc]# man touch
[root@localhost etc]# man mkdir
```

```shell
[root@localhost etc]# info ls
```



## 26.Linux系统的运行级别