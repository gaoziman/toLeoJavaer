---
title: 线上Docker中Redis时报错
icon: circle-info
order: 2
category:
  - 报错及Bug
tag:
  - 报错及Bug
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---


**原因：** `docker部署redis`，项目使用redis时，报错nested exception is io.lettuce.core.RedisCommandExecutionException: READONLY （`当前redis为只读`）

## 1. 思路

最开始我的思路是，可能当时是因为Docker部署的Redis，没有什么配置文件相关的配置，导致当前Redis只能读不能写入。



## 2. 解决方式

### 2.1 进入容器

```bash
docker exec -it redis /bin/bash 
```



### 2.2 进入Redis客户端

```bash
redis-cli 
```



### 2.3 查看Redis属性信息

![image-20230716154232437](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307161542566.png)

备注：`可看到redis为slave`，为从节点，默认为只读



### 2.4 设置redis只读属性为no

![image-20230716154315510](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307161543580.png)

**重启Redis容器之后,发现问题解决了。**

## 3. 后续

> 但是第二天发现仍出现了昨天同样的问题，于是觉得这种方式行不通，通过查询资料得知，在服务器安装Redis则必须对外访问`ip`设置为0.0.0.0，并且Redis必须设置密码

于是删除`Docker`中的`Reids`镜像，重新安装Reis，并设置密码访问。

```java
1. 拉取redis镜像
# 不指定版本号，默认拉取最新版的redis 
docker pull redis
# 指定的版本号 docker pull redis:5.0.14
# 查看镜像是否拉取成功docker images

2. 运行redis
# 带密码认证的redis，登录时需要输入验证码  appendonly（redis是否持久化）
docker run --name redis -p 6379:6379 -d --restart=always redis redis-server --appendonly yes --requirepass 123456

# 不带密码认证的redis
docker run --name redis -p 6379:6379 -d --restart=always redis redis-server --appendonly yes
```

**这里一定要选择第一种，Redis持久化，设置密码**

## 4. 总结

OK，到这里问题才完全解决！



![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)