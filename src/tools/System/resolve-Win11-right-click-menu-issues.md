---
title: 解决Win11右键菜单问题
icon: circle-info
order: 11
category:
  - 工具
tag:
  - 工具
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---

## 1. 现象



> Win11的右键菜单绝对是反人类的设计，但这个问题解决起来就是半分钟、一句命令的事情。

![image-20230803191915935](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308031919086.png)

首先 Win + X ~~打开 Windows powershell（管理员）~~ PS：现在貌似叫Windows 终端（管理员）



## 2. 解决方案



### 2.1 切换回经典右键菜单

```bash
reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
```

![image-20230803195211789](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308031952842.png)

运行完成后，需要刷新一下注册表

![image-20230803195236076](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308031952124.png)



### 2.2 恢复到新版右键菜单

```bash
reg delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f
```

![image-20230803195344942](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308031953004.png)



## 3. 解决操作系统多个问题

Tips:首先 `Win + R` 打开运行窗口，输入 `msconfig`

![image-20230803195441046](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308031954100.png)