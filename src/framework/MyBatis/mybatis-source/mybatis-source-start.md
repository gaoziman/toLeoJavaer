---
title: MyBatis源码初始
icon: circle-info
order: 1
tags:
   - MyBatis🐦️
categories:
   - MyBatis🐦️
pageview: false
date: 2023-10-22 16:48:30
comment: false
---



学习参考 ：

- 讲师：**孙帅老师**
- 课程：[Mybatis3源码完全解读：从零到精通](https://www.bilibili.com/video/BV1iX4y1B7rh/?spm_id_from=333.337.search-card.all.click&vd_source=cea816a08805c218ac4390ae9b61ae31)

> 大家好，我是Leo🫣🫣🫣，从今天开始跟着孙帅老师一起学习MyBatis3的源码学习，这个系列记录着MyBatis3源码学习的笔记和思考，
>
> 让我们开始吧😎😎😎。



## 1. MyBatis回顾

### 1.1 关于开发环境

下面是笔者本次学习**MyBatis**源码的开发环境，大家可以进行参考。

```markdown
1. JDK8
2. IDEA2023.2
3. Maven3.8
4. MySQL 8.0.32 --> MySQL 8 即可
5. Mybatis 3.4.6
```



### 1.2 Mybatis开发的简单回顾



#### 1. 什么是Mybatis

**MyBatis**本是**apache**的一个开源项目**iBatis**, 2010年这个项目由 **apache software foundation** 迁移到了google code，并且改名为MyBatis。**MyBatis**是一个基于Java的持久层框架Mybatis是一个ORM类型框架，解决的数据库访问和操作的问题，对现有JDBC技术的封装。



#### 2. 为什么使用MyBatis？

我们以前在没有ORM框架的情况下，如果你要开发一个Web应用程序的话，你就必须要使用传统的JDBC代码来操作数据库，我们除了需要自己提供 SQL 外，还必须操作 Connection、Statment、ResultSet等，不仅如此，为了访问不同的表，不同字段的数据，我们需要些很多雷同模板化的代码，而这些代码写起来往往是重复的，写起来又繁琐又枯燥。



### 1.3 搭建MyBatis开发环境

#### 1.导入依赖

```xml
 <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.4.6</version>
     </dependency>
     <dependency>
       <groupId>mysql</groupId>
       <artifactId>mysql-connector-java</artifactId>
       <version>8.0.32</version>
</dependency>
```



#### 2.创建表以及编写实体类

**表SQL**

```sql
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1003 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

**编写实体类**

```java
package org.javatop.pojo;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-10-17 21:22
 * @description : 用户实体类
 */
public class User {
   private Integer id;
   
   private String name;


    public User() {
    }

    public User(Integer id, String name) {
        this.id = id;
        this.name = name;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
```



#### 3.编写mapper文件以及mapper映射文件

**mapper文件**

```java
package org.javatop.mapper;

import org.javatop.pojo.User;

import java.util.List;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-10-17 21:27
 * @description : mapper文件
 */

public interface UserMapper {


    /**
     * 查询所有用户信息
     * @return
     */
     List<User> selectUserList();
}

```



**mapper映射文件**

```xml
<select id="selectUserList" resultType="User">
        select id,name,password from user
</select>
```



#### 4.准备配置文件

编写mybatis-config.xml配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <typeAliases>
        <typeAlias type="org.javatop.pojo.User" alias="User"/>
    </typeAliases>


    <environments default="default">
        <environment id="default">
            <transactionManager type="JDBC" />
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver" />
                <property name="url" value="jdbc:mysql://localhost:3306/suns?useSSL=false"/>
                <property name="username" value="root"/>
                <property name="password" value="root"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <!--<package name=""-->
        <mapper resource="UserMapper.xml"/>
    </mappers>

</configuration>
```



#### 5.编写测试类

编写测试类TestMyBatis

```java
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.javatop.mapper.UserMapper;
import org.javatop.pojo.User;
import org.junit.Test;

import org.apache.ibatis.io.Resources;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-10-17 9:55
 * @description : MyBatis基本开发测试
 */
public class TestMyBatis {

    /**
    * 用于测试: MyBatis基本开发的第一种
    */
    @Test
    public void test01() throws IOException {
        InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();

        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);

        List<User> userList = userMapper.selectUserList();

        for (User user : userList) {
            System.out.println("user = " + user);
        }
    }
}

```

**运行结果：**

![image-20231017215356172](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310172153387.png)









#### 5.总结MyBatis开发步骤

思考：除了这种方式，是否还有其它方式呢？

其实对于大家来说，很多是没有见过这种方式开发方式的，往远的说，其实就是MyBtis的前身了，**ibatis** ，笔者公司的老项目用的正是ibatis，话不多说，直接上代码。

```java
/**
    * 用于测试:MyBatis 基本开发的第二种方式
    */
    @Test
    public void test02() throws IOException {
        InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        List<User> userList =  sqlSession.selectList("org.javatop.mapper.UserMapper.selectUserList");
        userList.forEach(System.out::println);
    }
```

这种方式是通过每个mapper文件中的 **namespace + 接口名称** 来确定我们的mapper接口。虽然也能实现我们查询所有用户的功能，但是这样看起来可读性是不是太差了。其实两种方式功能等价 ，实现效果也是一样的。

**区别：**

第一种方式好 表达概念更清晰
第一种开发，本质上就是对第二种开发的封装。

```markdown
1. 编写实体类entity
2. 类型别名
3. 创建表table 
4. mapper接口
5. Mapper文件
6. Mapper文件的注册
7. JavaAPI编程 
```



## 2. MyBatis的核心对象

### 2.1 MyBatis的核心对象

#### 1. 前言知识补充

Mybatis是对JDBC的封装，将JDBC封装成了一个核心的SQLSession对象。
JDBC当中的核心对象：Connection、Statement、ResultSet。

- Statement：普通的Statement
- PeparedStatement：[预编译](https://so.csdn.net/so/search?q=预编译&spm=1001.2101.3001.7020) Statement
- CallableStatement：适用于[存储过程](https://so.csdn.net/so/search?q=存储过程&spm=1001.2101.3001.7020)Statement

注意：Mybatis中使用的是**PeparedStatement**预编译。

> 通过这些Statement与我们的数据库进行交互，然后由我们的结果集对象ResultSet对象进行封装。
>
> SqlSession是对以上内容进行了封装。
>
> 相对于以上来讲，SQLSession是对JDBC的封装，SQLSessionFactory是创建SQLSession对象的工厂，我们还基于mybatis-config.xml配置
>
> Mybatis，并且在Mapper.xml当中配置SQL，了解到这里我们对于Mybatis的认知就比较权限
>
> 在Java中，或者说在JVM当中对Mybatis相关的配置信息进行封装。这里边设计到很多的配置文件，我们不可能说用点就读一次文件，这样会有极大的
>
> IO，IO是操作系统层面的资源，他的创建绝不是虚拟机单独完成的，是很耗时的，少操作或者能复用最好。 对于这种东西，我们都是在程序启动时一次性
>
> 读取，存储在Java对象当中
>
> MyBatis当中的配置信息一共有两种：mybatis-config.xml和userMapper.xml。
>
> 其中mybatis-config.xml封装成了org.apache.ibatis.session.Configuration对象，DAOMapper.xml封装成了MapperdStatement部分数
>
> 据是在Configuration当中进行保存的。
>
>

**基于以上，我们可以知道在Mybatis当中有两类对象：数据储存类对象 + 操作类对象。**



#### 2. 数据存储类对象

##### 1.1 初始Configuration

概念：在Java中（JVM)对Mybatis相关的配置信息进行封装。

Configuration是数据存储类对象，是将Mybatis当中的**mybatis-config.xml**封装成Configuration对象，Mapper.xml封装成了**MappedStatement**对象，当然**MappedStatement**这样表述不是特别完整。

**简单来讲Configuration的作用：**

1. 封装了mybatis-config.xml。
    1. 封装了mapper文件MappedStatement。
2. 创建Mybatis其他相关的对象。



##### 1.2 初始MapperSatement

对应的就是Mapper文件中的一个一个的配置标签

```xml
  <select id. -----> MappedStatement
  <insert id. -----> MappedStatement  
  注定 一个Mybatis应用中 N个MappedStament 对象 
  MappedStatment ---> Configuration 
```


##### 1.3 mybatis-config.xml与Configuration属性的映射关系

我们打开Configuration的源码可以得知，在Configuration中定义了大量的mybatis-config.xml中的标签，比如： **environments**，**settings**，**typeAliases**，**Mappers** 等标签。

![image-20201228204347155](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310180952553.png)

**分析：**

caches，parameterMaps，resultMaps，MapperdStatement,keyGenerators 这些是把Mapper.xml文件中的内容进行了封装。
resultMaps：所有的Mapper.xml文件中resultMap标签。
parameterMaps：是对sql标签上的parameterMap是属性做了处理。

上边这些属性都加了S都代表了是复数，也就是他的数量不只一个。这玩意存储的不是公共的，而是所有的。里边存储了对于所有的Mapper.xml文件中的这些属性都封装到这里边了。

这些不仅仅要存还要用，所以是将他们存入到了一个Map中，他是有key的，他的key就是namespace.id。所以你就发现这一组。这些对象封装到Configuration对象中之后都是采用的Map<String,xxx>这样的形式，key是namespace.id 的形式。



##### 1.4 Configuration对象的作用

**作用1：** 封装Mybatis-Config.xml先关的内容。
environments属性，封装的environments标签
typeAliases标签（实体全限定类型和简称的映射）这个也在Configuration当中也有封装
Mappers标签，我们在Configuration当中也是有对象进行对应的。其中对应的是 Set loadResources
到这，Mybatis-config.xml所有的标签，我们在configuration对象当中就都可以找到了。

**作用二：** Configuration将xxxMapper.xml封装成了MapperStatment对象组放到了Configurantion对象中进行引用。
Configuration中的属性是Map<String,MappedStatement> mappedStatements 其中的String还是nameSpace.id
Configuration对象还包括：还有其他的结果集，参数，使用返回参数key（caches，parameterMaps，resultMaps，MapperdStatement,keyGenerators ）等等。

**作用三：** 他的第三个核心作用就是帮我们创建：Mybatis其他涉及到的核心对象也创建出来，所以我们认为他是Mybatis当中最为核心的对象。
在这里可以认为Configuration实现是这些对象的执行对象的工厂对象。

**作用4：** SQL映射配置管理：Configurationi对象负责管理应用程序的SQL映射配置信息。它可以读取和解析Mapper接口或XML文件，将SQL语句与数据库操作进行映射关联。Configuration对象维护了一个用于存储$QL映射配置的集合，其中包含了每个SQL语句的信息，如语句类型(INSERT、SELECT、UPDATE、DELETE)、参数映射、结果映射等。

**总的来说，Configuration对象在MyBatis框架中承担着配置管理和资源管理的职责，负责管理数据源、SQL映射配置、对象工厂、对象包装器和插件等重要组件，以保证MyBatis的正常运行和提供灵活的配置和扩展能力。**



##### 1.5 MappedStatement对象

我们可以打开Configuration的源码中可以找到MapperStatement

![image-20231018100247991](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310181002137.png)

通过ctrl + B 点进去查看

![image-20231018100336038](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310181003235.png)

可以发现 MappedStatement对象，也是一个存储了对象，存储的是Mapper文件中的Statement也就是我们定义的SQL标签，其中封装的是我们Mapper文件中的一个个标签，举例来讲 其中一个标签就会被封装成**MappedStatement**对象

我们的标签当中肯定会有id的属性，在我们的MappedStatement当中也会有id的属性。id属性完全唯一，他存储的是namespace.id所以，也是唯一，注定了在一个Mabatis当中会有N个MapperStatement对象。

这里边的statementType是什么意思，指的就是普通，预编译，存储过程。默认使用的就是preparedStatement，所以在我们的SQL标签上也肯定有这个属性，这个属性默认一定是prepared。

**注意：MappedStatement当中可以找到Configuration对象，Configurantion对象可以找到MapperdStatement对象，他俩互相引用，双向关联，可以互相找到。**



## 3.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。


![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)