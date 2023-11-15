---
title: Docker部署SpringBoot项目
icon: circle-info
order: 5
category:
  - 项目部署▶️
tag:
  - 项目部署▶️
pageview: false
date: 2023-10-09 15:46:30
comment: false
breadcrumb: false
---




## 1. 前言

笔者开发环境： 华为云服务器 + IDEA2023 + JDK1.8 + Maven3.8。

​

## 2. 实战步骤

### 2.1 编写测试接口

打开我们的IDEA创建一个简单的SpringBoot项目，编写TestController，编写一个简单的测试接口。

```java
package com.leo.demo02.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-10-17 14:15
 * @description : 测试
 */
@RestController
public class TestController {

    @RequestMapping("/test")
    public String test(){
        
        return "这是用来测试SpringBoot接口部署到服务器的接口测试!";
    }
}
```



### 2.2 使用Maven打jar包

#### 1.使用package命令打包

![image-20231017142102923](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171421024.png)



#### 2. 打包成功

看到下面BUIDL SUCCES 就说明打包成功了

![image-20231017142404696](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171424843.png)



#### 3. 查看jar包

可以在target目录看到我们的jar包

![image-20231017142457929](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171424983.png)



#### 4.启动jar包进行测试

```
java -jar jar包名称（填写你自己的jar包名称）
```

![image-20231017142739915](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171427007.png)

启动成功，浏览器访问ip + 端口号 + 访问路径即可访问。

​	![image-20231017142855477](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171428521.png)

**访问成功!**



### 2.3 编写Dockerfile文件内容

这里笔者使用的是JDK11

```bash
FROM openjdk:11 # FROM: 基础镜像，基于jdk8镜像开始

COPY *.jar /app.jar  # COPY: 将应用的配置文件也拷贝到镜像中。

CMD ["--server.port=8400"]

EXPOSE 8400  # EXPOSE：声明端口
 
ENTRYPOINT ["java","-jar","/app.jar"]  
# ENTRYPOINT：docker启动时，运行的命令，这里容器启动时直接运行jar服务。
```



### 2.4 把jar包以及Dockerfile上传到Linux服务器

**上传jar包和dockerfile文件**到Linux服务器上去。

这里笔者选择的是Finalshell + 华为云服务器，大家可以自行选择。

在software目录里面创建一个test目录

```bash
cd /opt/software/
mkdir test
```

**注意： software这个目录是笔者平时存放软件的地方，大家没有的话可以自行创建。**

把jar包和dockerfile文件上传到test目录

![image-20231017143614515](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171436569.png)



### 2.4 生成镜像

目录切换到test目录并查看

![image-20231017143654734](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171436793.png)

文件已上传完毕，可以进行生产镜像了。

**注意： 必须这两个东西都在一个文件下，才可以。**

- docker bulid 是打包命令
- `-t` − 给镜像加一个Tag
- 后面跟的 test 就是为这个镜像取的名字
- `.` 小数点表示当前目录，即Dockerfile所在目录

```bash
docker build -t test .  
```

看到下面说明镜像已经生成完毕。

![image-20231017143832087](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171438171.png)



### 2.5 后台启动容器

使用命令查看我们生成的镜像

```bash
docker images
```

![image-20231017143952774](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171439842.png)

确认没问题之后我们开始后台启动容器。

```bash
docker run -d -p 8400:8400 --name test test
```

- -d 是后台运行
- -p 8400:8400是端口映射
- --name 取名字
- 最后跟的 test 是我打包好的镜像名称。

![image-20231017144513816](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171445868.png)

到这里说明我们的容器已经正常运行了。



### 2.6 测试

浏览器访问ip + 端口号 + 访问路径即可访问。

![image-20231017144552622](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310171445670.png)

大功告成!

​

## 3. 总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。



![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)