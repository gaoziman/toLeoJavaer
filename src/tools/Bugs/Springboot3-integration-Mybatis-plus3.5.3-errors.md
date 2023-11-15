---
title: Springboot整合MP报错
icon: circle-info
order: 5
category:
  - 报错及Bug
tag:
  - 报错及Bug
pageview: false
date: 2023-11-05 23:36:13
comment: false
breadcrumb: false
---


# Springboot3整合Mybatis-plus3.5.3报错

## 1.前言背景

大家好，我是Leo哥🫣🫣🫣，最近在学习SpringBoot3相关的的代码，开发过程中遇到了一些小坑，不过很快都解决了。然后就用 SpringBoot3 版本写了几个小 demo，比如 Web 开发、连接 [数据库](https://cloud.tencent.com/solution/database?from_column=20065&from=20065)、使用 JdbcTemplate 操作数据库，编码和测试都非常顺利，虽然是从 SpringBoot 2.x 版本升级到SpringBoot3，但是没有感觉到太多差别。

不过，在使用 SpringBoot3 整合 MyBatisplus 时出现了一些问题，花了不少时间处理。



## 2.开发环境

因为这边想学习一下关于SprigBoot3的一些特性，我这里是从原来的SpringBoot2.3.6升级到了SpringBoot3.0。

使用的版本如下所示。

- Spring Boot 版本配置

```xml
<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.0.3</version>
</parent>
```

- MyBatis 版本配置

```xml
<!--mybatis-plus-->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.3</version>
</dependency>
```





## 3.问题出现

当一切都配置完成之后，启动项目之后，直接报错，这里直接把报错相关的贴出来。

![image-20231104001612745](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311040016267.png)

当然，异常信息挺多，比如无法创建 Bean 的异常等等，不过上面的几个异常并不是问题主因。这里我直接定位到最后的异常上，异常信息是：

```java
Property 'sqlSessionFactory' or 'sqlSessionTemplate' are required
```

于是我们跟入代码发生异常的地方。

问题原因也很明显，sqlSessionTemplate 对象是空的，所以这边就直接报错了。



## 4.问题排查

当然，由于把 SpringBoot 版本升级到 3 了，所以会觉得有很大的可能是版本升级导致了问题。

不过还是想自己查查问题，就依次检查了代码、数据库配置、MyBatisPlus 配置，都没有发现哪里写错了，接着就没头绪了。之后就通过源码Debug了一下，顺着启动流程走了一下，在**SqlSessionFactoryBean**这里发现了问题，**NestedIOException**这个类爆红了，正常情况下肯定是不会报错的。

![image-20231104002829604](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311040028768.png)

说明肯定是因为我们**dataSource**数据源的问题，于是我又重新检查了一下代码。最终在启动类发现了问题。

下面我贴出截图

![image-20231104003243998](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311040032157.png)

在SpringBoot应用程序启动类上加上(exclude = {DataSourceAutoConfiguration.class})会排除数据源的自动配置，这意味着我们需要手动配置数据源和事务管理器等依赖项。

如果使用MyBatis等持久层框架进行数据库操作，通常需要进行以下两个步骤：

1. 配置数据源：在配置文件中设置数据库连接信息，例如连接URL、用户名、密码等。
2. 配置SqlSessionFactory和SqlSessionTemplate：这两个对象是MyBatis框架中用于操作数据库的核心组件。SqlSessionFactory用于创建SqlSession实例，SqlSessionTemplate是对SqlSession的一种封装，提供了更加简单易用的API接口。

**如果SqlSessionTemplate对象为空，可能有以下几种原因：**

1. 没有正确配置数据源：如果我们没有正确配置数据源，SqlSessionFactory和SqlSessionTemplate就无法正常创建。需要确保配置文件中的数据库连接信息正确，并且已经将数据源和事务管理器纳入到Spring容器中。
2. 没有正确配置SqlSessionFactory和SqlSessionTemplate：即使我们已经正确配置了数据源和事务管理器，但是如果没有正确配置SqlSessionFactory和SqlSessionTemplate，也会导致SqlSessionTemplate对象为空。需要检查一下SqlSessionFactory是否已经成功创建，并且使用了正确的MyBatis配置文件。
3. 没有将SqlSessionTemplate纳入到Spring容器中：在Spring Boot应用程序中，我们需要将SqlSessionTemplate对象纳入到Spring容器中，这样才能在其他组件中自动注入SqlSessionTemplate对象。需要确保已经在配置文件中正确配置了MyBatis相关的Bean，并且使用了正确的注解或XML配置方式来将SqlSessionTemplate纳入到Spring容器中。

需要注意的是，这里所说的原因并不全面，具体问题需要根据实际情况来进行排查分析。

我这里把这个注释掉之后，项目就正常启动了，大家可以参考一下。



## 5.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。


![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)