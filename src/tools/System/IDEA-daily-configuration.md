---
title: IDEA日常配置和操作小结
icon: circle-info
order: 4
category:
   - 工具
tag:
   - 工具
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---


## 简介

本文系统的介绍了开发工具IDEA的常用操作，从开发过程中的编码，到运行调试，循序渐进;结合实际项目开发，从常用配置、快捷键使用、编码技巧及调试技巧、常用插件等角度，系统介绍如何高效的使用IDEA开发项目。

![image-20230519153340069](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202306301040548.png)



## IDEA通用基础配置

### 进入设置页面

键入这CTRL+alt+s键即可直接弹出设置窗口

![image-20230519153604394](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519153604394.png)

### 取消打开最后打开的项目

![image-20230519153644088](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519153644088.png)

### 鼠标滚轮放大缩小文字

勾选下方选项，使用鼠标即可放大或者缩小文字

![image-20230519153850096](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519153850096.png)

### 设置IDEA统一使用UTF8编码格式

进入设置后搜索encode将所有可以看见的设置通通改为UTF8即可

![image-20230519154023164](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519154023164.png)



## 编码常见设置

### 设置自动导包

进入设置后搜索Auto Import，勾选下图选项，IDEA就自动导入相应类的包。

![image-20230519154323133](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519154323133.png)



### 设置显示TAB栏文件数量

进入设置搜索edit tab，如下图，在这里你可以选择你tab栏目的数量，超过这个数量后IDEA就会将这个tab栏销毁。

![image-20230519154415171](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519154415171.png)



### 过长或自适应屏幕的换行

![image-20230519154509389](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519154509389.png)



### IDEA自动跟随文件

我们希望查看哪个类代码，左边导航栏就能跟随显示这个文件所在位置，如下图，勾选这个选项即可

![image-20230519154728474](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519154728474.png)

**注意 ：** 我这个是IDEA2022的版本，之前的版本位置可能不太一样。

可以看到我们选择了`HelloController`后，左边导航栏也跟随导航栏移动了

![image-20230519154831141](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519154831141.png)



### 日志插件增加日志可读性

如下图，安装grep console即可实现不同等级日志显示不同颜色，增加可读性，这边我已经下载过了

![image-20230519154907749](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519154907749.png)



### 时序图插件

![image-20230519155016498](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519155016498.png)

安装完成后，即可通过右键生成时序图，便于我们阅读源码

![image-20230519155140587](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519155140587.png)

### 翻译插件

打开插件市场选择`translation`，完成后对着单词按`ctrl+shift+y` 即可翻译成中文。这里建议读者使用百度的翻译，步骤很简单，点击下方申请一个，登录一下即可获取，然后复制粘贴到应用id和密钥中就行了。

![image-20230519155103839](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519155103839.png)



## 开发常见快捷键

### 批量set变量

有时候我们在开发中会遇到一个对象需要set多个值，我们就可以安装这个插件解决问题

![image-20230519155229869](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519155229869.png)

安装完成并重启IDEA后，对着需要进行set的对象键入alt+enter即可根据需要完成set，以笔者为例，我们要设置默认值，所以我们就选择with default value选项

![image-20230519155253894](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519155253894.png)



他就会帮我们自动生成相应的set

![image-20230519155303939](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519155303939.png)



### 复制类名

如果我们想复制某个类的类名，在IDEA中我们可以直接对着类名`Ctrl+C`,即可将类名粘贴到我们的代码中

![image-20230519155758607](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519155758607.png)

### 粘贴复制历史

在开发过程中你可能会复制无数个代码，或者在其他应用中复制过各种数据，如果你希望粘贴曾经复制过的数据，你可能会再次到达被复制的要用中复制在粘贴到当前文件中。 在IDEA强大的支持下，我们完全可以通过Ctrl+shift+V，找到自己的复制历史，如下图所示，例如我们想复制修改配置这个文本，只需键盘键入1即可

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519155855204.png" alt="image-20230519155855204" style="zoom:80%;" />



### 格式化代码

有时候因为格式原因接受的代码出现代码格式很混乱，这时候我们就可以键入`CTRL+ALT+L`，将代码格式的整整齐齐，这个操作大部分开发都知道就不多赘述了。

### 偷懒删除

`Ctrl+x`为剪切，这里我们可以在指定行任意位置使用快捷键作为删除使用

### 复制当前行到下一行

当你编码的时候常遇到setname，setage等情况，我们可以`CTRL+D`第一个set语句复制多句进行修改，它的复制位置将会出现在所复制的行的下方

![image-20230519160101257](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519160101257.png)

### 选定多行

shift+方向键选定需要的代码行 (注:选中结果如下图也没事，粘贴结果照样为整行)

![image-20230519160209490](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519160209490.png)

### 行首行尾跳转

使用键盘的`home`或者`end`键即可在当前代码首位来回跳转

![image-20230519160249057](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519160249057.png)

### 单词间跳转

有时候我们希望在每个单词之间来回跳转，使用`Ctrl+左右`即可实现

### 选中当行指定数量单词

ctrl+shift+左/右即可实现选定当前行中指定数量的单词，如下图，我们希望选定指定行到达Executors之前的单词

![image-20230519160333285](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519160333285.png)

我们可以键入`Ctrl+shift+右`，如下图

![image-20230519160349777](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519160349777.png)



### 万能的Alt+Enter键

#### 解决报错问题

![image-20230519163703219](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519163703219.png)

#### 导入指定包

有时候有多个包，会包含相同类名的类，使用`Alt+enter`就可以手动选择需要的包了。

#### 指定泛型

![image-20230519163735652](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519163735652.png)

#### 生成构造方法或者get set方法

生成构造方法

![image-20230519163810518](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519163810518.png)



### 多行删除

按住`alt +鼠标左键`，再使用del或者back按钮即可

![image-20230519163901631](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519163901631.png)



### 多行复制

1. 光标点击复制的起始位置

   ![image-20230519163959963](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519163959963.png)

2. `shift+左右上下`选择行

   ![image-20230519164005754](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519164005754.png)

3. 找到需要的位置`Ctrl+V`即可

![image-20230519164011918](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519164011918.png)



### 移动多行

有时我们希望将多行代码进行移动，我们可以使用shift+方向键选定行

### 后缀补全

#### for循环

![image-20230519164153440](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519164153440.png)



#### 判空或者非空判断

![image-20230519164224730](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519164224730.png)



#### 布尔值判断

输入`.if`,如果要使用`!flag`的话，我们可以首先`.not`一下生成`!flag`，再`.if`代码就会生成`if(!flag){}`

![image-20230519164307434](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519164307434.png)

#### 格式化字符串

![image-20230519164349572](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519164349572.png)



#### 将变量设置为同步锁

在变量后面输入`.sync`就可以看到了

![image-20230519164611730](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519164611730.png)

于是就会生成这样的代码

![image-20230519164626027](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519164626027.png)



#### 异常捕获

在对应代码后面`.try`即可

![image-20230519164730747](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519164730747.png)

#### 强制转换

输入`.cast`或者`.castvar`即可实现强制转换

![image-20230519164814514](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519164814514.png)

可以看到代码最终生成这样

![image-20230519164925662](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519164925662.png)

### 查看todo代办事项窗口

如下图点击todo一栏即可看到代码中出现todo字样的代码

![image-20230519164950149](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230519164950149.png)



### 查看当前类的方法列表等

我们在查看源码的时候需要查看某些函数，但是忘记忘记函数名是什么，这时候我们就可以使用structure界面来查看java文件的函数列表

在对应java文件下，使用快捷键 `Alt+7` 

![image-20230522205134590](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230522205134590.png)



### 在曾经停留过的地方来回跳转

先`Ctrl+B`查看函数具体实现

`ctrl+alt+左` 回到刚刚查看方法调用处的位置

![image-20230522205317706](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230522205317706.png)

`ctrl+alt+右` 再次跳转回去查看方法的具体实现

![image-20230522205344601](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230522205344601.png)

## 导航相关

### 切换tabs工作栏代码

`alt+左/右`即可实现IDEA上方的tab栏来回切换

### 定位最近访问文件列表

当你写在`业务层`和`控制层`来回切换时，可以使用`ctrl+e` 配合回车实现来回切换

![image-20230522232249344](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230522232249344.png)

### 查找文件

这是笔者最常用的快简介，连续按两下shift输入关键字即可查找需要的文件，如下所示

![image-20230522232319299](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230522232319299.png)



## 集成GIT

### 展示版本控制历史

如下图，找到`version control`即可

![image-20230523174544241](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230523174544241.png)

### 将项目交给git管理

![image-20230523174601380](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230523174601380.png)



### 查看版本变化

对着版本控制中现实变化的文件`Ctrl+D`即可

![image-20230523174622677](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230523174622677.png)



这时候就会有个弹窗出来现实我们本次修改对之前版本做了那些修改

![image-20230523174652910](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230523174652910.png)

### 与远程仓库关联

github上远程创建仓库不要创建readme和ignore会给与远程仓库关联的命令

![image-20230523174710490](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230523174710490.png)

### 追加提交

有时候我们上次提交会遗漏一些东西，我们可以勾选图中的选项，提交代码即可对上次提交做追加 (注：这个操作仅对未push到远程仓库的提交有效)

![image-20230523174948496](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230523174948496.png)

### Code review

用点一个版本按住shift键再点击一个版本就可以查看这两个版本之间项目的变化

![image-20230523175046944](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230523175046944.png)

## live template

### 概述

如下图所示，打出勾选的字母就会弹出白色框中的代码段，所以如果我们有希望可以快捷输出的代码也可以自己制作一个代码模板。

![image-20230523175755452](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230523175755452.png)

### 自制代码模板

1. 创建代码模板组

   ![image-20230523175900904](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230523175900904.png)

2. 编写下方代码段，需要注意的是可变的表达式要放在$$符号中

   ![image-20230523180450575](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230523180450575.png)

3. 设置代码类型为java代码

   ![image-20230523180450575](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230523180450575.png)

4. 是设置可变变量值对应的变量，这里CLASSNAME为当前类文件的类名

   ![image-20230523180544245](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230523180544245.png)

5. 测试

![image-20230523180740103](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230523180740103.png)

## IDEA推荐插件推荐

1. 日志颜色高亮插件:Grep console
2. resultful接口辅助工具:RestfulToolkit
3. lombok






## 快捷键大全简易版（Windows）



### Ctrl

| 快捷键           | 介绍                                                         |
| :--------------- | :----------------------------------------------------------- |
| Ctrl + F         | 在当前文件进行文本查找 `（必备）`                            |
| Ctrl + R         | 在当前文件进行文本替换 `（必备）`                            |
| Ctrl + Z         | 撤销 `（必备）`                                              |
| Ctrl + Y         | 删除光标所在行 或 删除选中的行 `（必备）`                    |
| Ctrl + X         | 剪切光标所在行 或 剪切选择内容                               |
| Ctrl + C         | 复制光标所在行 或 复制选择内容                               |
| Ctrl + D         | 复制光标所在行 或 复制选择内容，并把复制内容插入光标位置下面 `（必备）` |
| Ctrl + W         | 递进式选择代码块。可选中光标所在的单词或段落，连续按会在原有选中的基础上再扩展选中范围 `（必备）` |
| Ctrl + E         | 显示最近打开的文件记录列表                                   |
| Ctrl + N         | 根据输入的 **类名** 查找类文件                               |
| Ctrl + G         | 在当前文件跳转到指定行处                                     |
| Ctrl + J         | 插入自定义动态代码模板                                       |
| Ctrl + P         | 方法参数提示显示                                             |
| Ctrl + Q         | 光标所在的变量 / 类名 / 方法名等上面（也可以在提示补充的时候按），显示文档内容 |
| Ctrl + U         | 前往当前光标所在的方法的父类的方法 / 接口定义                |
| Ctrl + B         | 进入光标所在的方法/变量的接口或是定义出，等效于 `Ctrl + 左键单击` |
| Ctrl + K         | 版本控制提交项目，需要此项目有加入到版本控制才可用           |
| Ctrl + T         | 版本控制更新项目，需要此项目有加入到版本控制才可用           |
| Ctrl + H         | 显示当前类的层次结构                                         |
| Ctrl + O         | 选择可重写的方法                                             |
| Ctrl + I         | 选择可继承的方法                                             |
| Ctrl + +         | 展开代码                                                     |
| Ctrl + -         | 折叠代码                                                     |
| Ctrl + /         | 注释光标所在行代码，会根据当前不同文件类型使用不同的注释符号 `（必备）` |
| Ctrl + [         | 移动光标到当前所在代码的花括号开始位置                       |
| Ctrl + ]         | 移动光标到当前所在代码的花括号结束位置                       |
| Ctrl + F1        | 在光标所在的错误代码出显示错误信息                           |
| Ctrl + F3        | 调转到所选中的词的下一个引用位置                             |
| Ctrl + F4        | 关闭当前编辑文件                                             |
| Ctrl + F8        | 在 Debug 模式下，设置光标当前行为断点，如果当前已经是断点则去掉断点 |
| Ctrl + F9        | 执行 Make Project 操作                                       |
| Ctrl + F11       | 选中文件 / 文件夹，使用助记符设定 / 取消书签                 |
| Ctrl + F12       | 弹出当前文件结构层，可以在弹出的层上直接输入，进行筛选       |
| Ctrl + Tab       | 编辑窗口切换，如果在切换的过程又加按上delete，则是关闭对应选中的窗口 |
| Ctrl + Enter     | 智能分隔行                                                   |
| Ctrl + End       | 跳到文件尾                                                   |
| Ctrl + Home      | 跳到文件头                                                   |
| Ctrl + Space     | 基础代码补全，默认在 Windows 系统上被输入法占用，需要进行修改，建议修改为 `Ctrl + 逗号` `（必备）` |
| Ctrl + Delete    | 删除光标后面的单词或是中文句                                 |
| Ctrl + BackSpace | 删除光标前面的单词或是中文句                                 |
| Ctrl + 1,2,3...9 | 定位到对应数值的书签位置                                     |
| Ctrl + 左键单击  | 在打开的文件标题上，弹出该文件路径                           |
| Ctrl + 光标定位  | 按 Ctrl 不要松开，会显示光标所在的类信息摘要                 |
| Ctrl + 左方向键  | 光标跳转到当前单词 / 中文句的左侧开头位置                    |
| Ctrl + 右方向键  | 光标跳转到当前单词 / 中文句的右侧开头位置                    |
| Ctrl + 前方向键  | 等效于鼠标滚轮向前效果                                       |
| Ctrl + 后方向键  | 等效于鼠标滚轮向后效果                                       |

### Alt

| 快捷键          | 介绍                                                         |
| :-------------- | :----------------------------------------------------------- |
| Alt + `         | 显示版本控制常用操作菜单弹出层                               |
| Alt + Q         | 弹出一个提示，显示当前类的声明 / 上下文信息                  |
| Alt + F1        | 显示当前文件选择目标弹出层，弹出层中有很多目标可以进行选择   |
| Alt + F2        | 对于前面页面，显示各类浏览器打开目标选择弹出层               |
| Alt + F3        | 选中文本，逐个往下查找相同文本，并高亮显示                   |
| Alt + F7        | 查找光标所在的方法 / 变量 / 类被调用的地方                   |
| Alt + F8        | 在 Debug 的状态下，选中对象，弹出可输入计算表达式调试框，查看该输入内容的调试结果 |
| Alt + Home      | 定位 / 显示到当前文件的 `Navigation Bar`                     |
| Alt + Enter     | IntelliJ IDEA 根据光标所在问题，提供快速修复选择，光标放在的位置不同提示的结果也不同 `（必备）` |
| Alt + Insert    | 代码自动生成，如生成对象的 set / get 方法，构造函数，toString() 等 |
| Alt + 左方向键  | 按左方向切换当前已打开的文件视图                             |
| Alt + 右方向键  | 按右方向切换当前已打开的文件视图                             |
| Alt + 前方向键  | 当前光标跳转到当前文件的前一个方法名位置                     |
| Alt + 后方向键  | 当前光标跳转到当前文件的后一个方法名位置                     |
| Alt + 1,2,3...9 | 显示对应数值的选项卡，其中 1 是 Project 用得最多             |

### Shift

| 快捷键               | 介绍                                                         |
| :------------------- | :----------------------------------------------------------- |
| Shift + F1           | 如果有外部文档可以连接外部文档                               |
| Shift + F2           | 跳转到上一个高亮错误 或 警告位置                             |
| Shift + F3           | 在查找模式下，查找匹配上一个                                 |
| Shift + F4           | 对当前打开的文件，使用新Windows窗口打开，旧窗口保留          |
| Shift + F6           | 对文件 / 文件夹 重命名                                       |
| Shift + F7           | 在 Debug 模式下，智能步入。断点所在行上有多个方法调用，会弹出进入哪个方法 |
| Shift + F8           | 在 Debug 模式下，跳出，表现出来的效果跟 `F9` 一样            |
| Shift + F9           | 等效于点击工具栏的 `Debug` 按钮                              |
| Shift + F10          | 等效于点击工具栏的 `Run` 按钮                                |
| Shift + F11          | 弹出书签显示层                                               |
| Shift + Tab          | 取消缩进                                                     |
| Shift + ESC          | 隐藏当前 或 最后一个激活的工具窗口                           |
| Shift + End          | 选中光标到当前行尾位置                                       |
| Shift + Home         | 选中光标到当前行头位置                                       |
| Shift + Enter        | 开始新一行。光标所在行下空出一行，光标定位到新行位置         |
| Shift + 左键单击     | 在打开的文件名上按此快捷键，可以关闭当前打开文件             |
| Shift + 滚轮前后滚动 | 当前文件的横向滚动轴滚动                                     |

### Ctrl + Alt

| 快捷键                | 介绍                                                         |
| :-------------------- | :----------------------------------------------------------- |
| Ctrl + Alt + L        | 格式化代码，可以对当前文件和整个包目录使用 `（必备）`        |
| Ctrl + Alt + O        | 优化导入的类，可以对当前文件和整个包目录使用 `（必备）`      |
| Ctrl + Alt + I        | 光标所在行 或 选中部分进行自动代码缩进，有点类似格式化       |
| Ctrl + Alt + T        | 对选中的代码弹出环绕选项弹出层                               |
| Ctrl + Alt + J        | 弹出模板选择窗口，讲选定的代码加入动态模板中                 |
| Ctrl + Alt + H        | 调用层次                                                     |
| Ctrl + Alt + B        | 在某个调用的方法名上使用会跳到具体的实现处，可以跳过接口     |
| Ctrl + Alt + V        | 快速引进变量                                                 |
| Ctrl + Alt + Y        | 同步、刷新                                                   |
| Ctrl + Alt + S        | 打开 IntelliJ IDEA 系统设置                                  |
| Ctrl + Alt + F7       | 显示使用的地方。寻找被该类或是变量被调用的地方，用弹出框的方式找出来 |
| Ctrl + Alt + F11      | 切换全屏模式                                                 |
| Ctrl + Alt + Enter    | 光标所在行上空出一行，光标定位到新行                         |
| Ctrl + Alt + Home     | 弹出跟当前文件有关联的文件弹出层                             |
| Ctrl + Alt + Space    | 类名自动完成                                                 |
| Ctrl + Alt + 左方向键 | 退回到上一个操作的地方 `（必备）**（注意与其他软件快捷键冲突）**` |
| Ctrl + Alt + 右方向键 | 前进到上一个操作的地方 `（必备）**（注意与其他软件快捷键冲突）**` |
| Ctrl + Alt + 前方向键 | 在查找模式下，跳到上个查找的文件                             |
| Ctrl + Alt + 后方向键 | 在查找模式下，跳到下个查找的文件                             |

### Ctrl + Shift

| 快捷键                   | 介绍                                                         |
| :----------------------- | :----------------------------------------------------------- |
| Ctrl + Shift + F         | 根据输入内容查找整个项目 或 指定目录内文件 `（必备）`        |
| Ctrl + Shift + R         | 根据输入内容替换对应内容，范围为整个项目 或 指定目录内文件 `（必备）` |
| Ctrl + Shift + J         | 自动将下一行合并到当前行末尾 `（必备）`                      |
| Ctrl + Shift + Z         | 取消撤销 `（必备）`                                          |
| Ctrl + Shift + W         | 递进式取消选择代码块。可选中光标所在的单词或段落，连续按会在原有选中的基础上再扩展取消选中范围 `（必备）` |
| Ctrl + Shift + N         | 通过文件名定位 / 打开文件 / 目录，打开目录需要在输入的内容后面多加一个正斜杠 `（必备）` |
| Ctrl + Shift + U         | 对选中的代码进行大 / 小写轮流转换 `（必备）`                 |
| Ctrl + Shift + T         | 对当前类生成单元测试类，如果已经存在的单元测试类则可以进行选择 |
| Ctrl + Shift + C         | 复制当前文件磁盘路径到剪贴板                                 |
| Ctrl + Shift + V         | 弹出缓存的最近拷贝的内容管理器弹出层                         |
| Ctrl + Shift + E         | 显示最近修改的文件列表的弹出层                               |
| Ctrl + Shift + H         | 显示方法层次结构                                             |
| Ctrl + Shift + B         | 跳转到类型声明处                                             |
| Ctrl + Shift + I         | 快速查看光标所在的方法 或 类的定义                           |
| Ctrl + Shift + A         | 查找动作 / 设置                                              |
| Ctrl + Shift + /         | 代码块注释 `（必备）`                                        |
| Ctrl + Shift + [         | 选中从光标所在位置到它的顶部中括号位置                       |
| Ctrl + Shift + ]         | 选中从光标所在位置到它的底部中括号位置                       |
| Ctrl + Shift + +         | 展开所有代码                                                 |
| Ctrl + Shift + -         | 折叠所有代码                                                 |
| Ctrl + Shift + F7        | 高亮显示所有该选中文本，按Esc高亮消失                        |
| Ctrl + Shift + F8        | 在 Debug 模式下，指定断点进入条件                            |
| Ctrl + Shift + F9        | 编译选中的文件 / 包 / Module                                 |
| Ctrl + Shift + F12       | 编辑器最大化                                                 |
| Ctrl + Shift + Space     | 智能代码提示                                                 |
| Ctrl + Shift + Enter     | 自动结束代码，行末自动添加分号 `（必备）`                    |
| Ctrl + Shift + Backspace | 退回到上次修改的地方                                         |
| Ctrl + Shift + 1,2,3...9 | 快速添加指定数值的书签                                       |
| Ctrl + Shift + 左方向键  | 在代码文件上，光标跳转到当前单词 / 中文句的左侧开头位置，同时选中该单词 / 中文句 |
| Ctrl + Shift + 右方向键  | 在代码文件上，光标跳转到当前单词 / 中文句的右侧开头位置，同时选中该单词 / 中文句 |
| Ctrl + Shift + 左方向键  | 在光标焦点是在工具选项卡上，缩小选项卡区域                   |
| Ctrl + Shift + 右方向键  | 在光标焦点是在工具选项卡上，扩大选项卡区域                   |
| Ctrl + Shift + 前方向键  | 光标放在方法名上，将方法移动到上一个方法前面，调整方法排序   |
| Ctrl + Shift + 后方向键  | 光标放在方法名上，将方法移动到下一个方法前面，调整方法排序   |

### Alt + Shift

| 快捷键                 | 介绍                                                         |
| :--------------------- | :----------------------------------------------------------- |
| Alt + Shift + N        | 选择 / 添加 task                                             |
| Alt + Shift + F        | 显示添加到收藏夹弹出层                                       |
| Alt + Shift + C        | 查看最近操作项目的变化情况列表                               |
| Alt + Shift + F        | 添加到收藏夹                                                 |
| Alt + Shift + I        | 查看项目当前文件                                             |
| Alt + Shift + F7       | 在 Debug 模式下，下一步，进入当前方法体内，如果方法体还有方法，则会进入该内嵌的方法中，依此循环进入 |
| Alt + Shift + F9       | 弹出 `Debug` 的可选择菜单                                    |
| Alt + Shift + F10      | 弹出 `Run` 的可选择菜单                                      |
| Alt + Shift + 左键双击 | 选择被双击的单词 / 中文句，按住不放，可以同时选择其他单词 / 中文句 |
| Alt + Shift + 前方向键 | 移动光标所在行向上移动                                       |
| Alt + Shift + 后方向键 | 移动光标所在行向下移动                                       |

### Ctrl + Shift + Alt

| 快捷键                 | 介绍                  |
| :--------------------- | :-------------------- |
| Ctrl + Shift + Alt + V | 无格式黏贴            |
| Ctrl + Shift + Alt + N | 前往指定的变量 / 方法 |
| Ctrl + Shift + Alt + S | 打开当前项目设置      |
| Ctrl + Shift + Alt + C | 复制参考信息          |

### 其他

| 快捷键        | 介绍                                                         |
| :------------ | :----------------------------------------------------------- |
| F2            | 跳转到下一个高亮错误 或 警告位置 `（必备）`                  |
| F3            | 在查找模式下，定位到下一个匹配处                             |
| F4            | 编辑源                                                       |
| F7            | 在 Debug 模式下，进入下一步，如果当前行断点是一个方法，则进入当前方法体内，如果该方法体还有方法，则不会进入该内嵌的方法中 |
| F8            | 在 Debug 模式下，进入下一步，如果当前行断点是一个方法，则不进入当前方法体内 |
| F9            | 在 Debug 模式下，恢复程序运行，但是如果该断点下面代码还有断点则停在下一个断点上 |
| F11           | 添加书签                                                     |
| F12           | 回到前一个工具窗口                                           |
| Tab           | 缩进                                                         |
| ESC           | 从工具窗口进入代码文件窗口                                   |
| 连按两次Shift | 弹出 `Search Everywhere` 弹出层                              |





![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)