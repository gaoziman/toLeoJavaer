---
title: 在IDEA中配置Git的Push键
icon: circle-info
order: 6
category:
  - 工具
tag:
  - 工具
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---


## 前言

笔者在重新安装IDEA过程中需要重新绑定了Git，发现提交代码过程中push键消失了，所以笔者就以这篇文章记录一下Git配置push键的详细过程。

注意笔者当前IDEA版本为2022，可能和读者有所区别，但是操作思路是差不多的。

## 操作步骤

找到File点击Setting键，或者快捷键Ctrl + Alt + S，进入设置页面

![image-20230525163716803](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525163716803.png)



到Appearance & Behavior 找到 Menus and Toolbars这个选项

![image-20230525163819504](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525163819504.png)



选择Navigation Bar Toolbar下的NavBarVcsGroup下的VcsNavBarToobarActions

![image-20230525163918185](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525163918185.png)

点击Rollback，到上方选择Add Action

![image-20230525163938063](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525163938063.png)



这时候会弹出一个小窗口，选择Version Control下的Git，找到Repository下的Push，点击OK键确定即可。

![image-20230525163953837](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525163953837.png)

这时候Idea的导航栏就会出现push键了，我们就可以点击将代码提交到远程仓库了

![image-20230525164036702](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525164036702.png)



![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)