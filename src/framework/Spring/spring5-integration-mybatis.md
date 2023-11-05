---
title: Spring整合MyBatis
icon: circle-info
order: 5
tags:
   - Spring🍃
categories:
   - Spring专栏🍃
pageview: false
date: 2023-10-22 16:51:56
comment: false
---



学习参考 ：

- 讲师：**孙帅老师**
- 课程：[孙哥说Spring5](https://www.bilibili.com/video/BV185411477k?p=188&spm_id_from=pageDriver&vd_source=cea816a08805c218ac4390ae9b61ae31)

## 1.前言

在我们之前的系列文章中，我们已经深入探讨了[Spring5](https://so.csdn.net/so/search?q=Spring5&spm=1001.2101.3001.7020)的两大核心组件：[IOC](https://gaoziman.blog.csdn.net/article/details/131940061) 和 [AOP](https://gaoziman.blog.csdn.net/article/details/132355403)，它们是Spring框架的基石。下面我们接着讨论开始讨论Spring5对于持久层框架MyBatis的整合，让我们一起开启新的的篇章吧。



## 2.准备工作

在开始之前，确保您已经安装了以下软件：

- JDK 1.8或更高版本
- Maven3.8+
- Eclipse或IntelliJ IDEA（或您最喜欢的Java IDE）
- MySQL8.0
- MyBatis3.5



## 3.为什么要整合持久层？

Spring整合持久层的主要目的是为了简化和提高应用程序的开发和维护效率，以及提供更好的可扩展性和可测试性。以下是一些Spring整合持久层的好处：

1. **降低开发复杂性**：持久层是应用程序中一个重要的组成部分，负责数据的存储和访问。通过Spring整合持久层，可以使用Spring提供的一致的编程模型和API，简化数据库操作和事务管理的代码，减少开发人员的工作量和复杂性。
2. **提供事务管理：** 持久层通常需要处理事务，确保数据的一致性和完整性。Spring提供了强大的事务管理功能，可以通过声明式事务管理或编程式事务管理来管理事务。整合持久层后，可以轻松地配置和管理事务，而无需手动编写繁琐的事务管理代码。
3. **支持多种持久化技术：** Spring整合持久层提供了对多种持久化技术的支持，如关系型数据库（如MySQL、Oracle）、NoSQL数据库（如MongoDB、Redis）、对象关系映射（ORM）框架（如Hibernate、MyBatis）等。这使得开发人员可以根据项目需求选择合适的持久化技术，并无缝地集成到应用程序中。
4. **提供数据访问抽象层：** Spring提供了一套数据访问抽象层，即Spring Data，它简化了对数据的访问和操作。通过Spring Data，可以使用简洁的API进行常见的数据访问操作，如查询、插入、更新和删除等。Spring Data还提供了对分页、排序、缓存等功能的支持，进一步提高了开发效率。
5. **支持依赖注入和面向切面编程：** Spring的核心特性之一是依赖注入（DI）和面向切面编程（AOP）。通过整合持久层，可以将持久层组件作为Spring的bean进行管理，并通过依赖注入将其注入到其他组件中。同时，可以使用AOP功能来实现横切关注点，如日志记录、性能监控等。
6. **企业级应用的需求**：在JavaEE的开发中，数据存储和管理是不可或缺的部分，尤其当涉及到大量的用户信息、交易记录、商品数据等。为了确保数据的一致性、安全性和高效性，我们需要一种可靠的方法来访问和操作数据库，这就是持久层的职责。

综上所述，Spring整合持久层可以简化开发工作，提供事务管理、多种持久化技术的支持，提供数据访问抽象层，并支持依赖注入和面向切面编程。这些优势使得应用程序更易于开发、维护和扩展，提高了开发效率和代码质量。



## 4.Spring能与哪些持久层技术整合？

Spring可以与多种持久层技术进行整合，包括但不限于以下几种：

1. **JDBC：** Spring提供了JdbcTemplate等工具类来简化JDBC的使用。它提供了一种更简单、更安全、更可靠的方式来执行SQL语句并处理结果集。
2. **ORM框架：** Spring与多个ORM框架（对象关系映射）提供商进行了整合，包括Hibernate、MyBatis、JPA等。通过Spring的整合，可以使用ORM框架来简化数据库操作，提供对象级别的持久化。
3. **JPA(Java Persistence API)：** Spring提供了对JPA的支持，可以通过配置和注解的方式来定义实体类与数据库表之间的映射关系，使用JPA进行对象的持久化操作。
4. **NoSQL数据库：** Spring还可以与各种NoSQL数据库进行整合，如MongoDB、Redis、Cassandra等。通过Spring Data模块，可以使用统一的API和命名约定来进行数据访问和操作。
5. **Spring Data JPA：** Spring Data JPA是Spring对JPA的扩展，提供了更高级的功能和更简化的API。它结合了Spring和JPA的特性，使得使用JPA更加便捷。
6. **Spring Data JDBC：** Spring Data JDBC是Spring对JDBC的扩展，提供了一种更简单的方式来进行JDBC操作。它通过注解和命名约定来进行数据库表和实体类之间的映射，简化了JDBC的使用。
7. **Hibernate (JPA)：** Hibernate是一个流行的ORM（对象关系映射）框架，而JPA（Java持久化API）是Java平台上的一个规范，Hibernate是JPA的一种实现。Spring为Hibernate提供了HibernateTemplate工具，它可以简化许多常见的Hibernate操作，并且为我们处理事务、会话等常见问题。使用Spring与Hibernate的整合，开发者可以轻松地将数据库记录映射到Java对象，并执行持久化操作。
8. **MyBatis：** MyBatis是另一个流行的持久层框架，它允许开发者直接编写SQL，同时提供了灵活的结果映射功能。Spring为MyBatis提供了一系列工具，如SqlSessionFactoryBean和MapperScannerConfigurer，这些工具旨在简化MyBatis配置和使用过程。通过整合，开发者可以在Spring应用中方便地使用MyBatis的特性，同时享受Spring提供的事务管理、依赖注入等功能。

总之，Spring可以与多种持久层技术进行整合，通过提供统一的API和工具类，简化了数据访问和持久化操作的开发工作。无论是关系型数据库还是NoSQL数据库，都可以方便地与Spring整合使用。



## 5.Spring与MyBatis整合步骤

### 5.1 MyBatis步骤回顾

MyBatis原生的开发一共有如下几个步骤

```markdown
1.实体
2.实体别名
3.数据表
4.创建DAO接口
5.实现Mapper文件
6.注册Mapper文件
7.MyBatisAPI的调用
```



### 5.2 整合步骤

#### 1.创建Maven项目

首先，我们需要创建一个Maven项目。打开IDEA，选择自己的工作目录，点击确定即可：

![image-20231019211823353](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310192118524.png)

创建一个名为`Leo-spring-mybatis`的新Maven项目。



#### 2.添加依赖项

打开`pom.xml`文件，并添加以下依赖项：

```xml
<dependencies>
   <!-- Spring dependencies -->
   <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>5.3.9</version>
   </dependency>
   <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>5.3.9</version>
   </dependency>
   <!-- MyBatis dependencies -->
   <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.7</version>
   </dependency>
   <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>2.0.7</version>
   </dependency>
   <!-- Database driver -->
   <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.26</version>
   </dependency>
</dependencies>
```

这些依赖项将添加所需的Spring和MyBatis库以及MySQL数据库驱动程序。

#### 3.配置配置文件

在`src/main/resources`目录下创建一个名为`mybatis-config.xml`的新文件，并添加以下内容：

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
                <property name="url" value="jdbc:mysql://localhost:3306/teach-spring5?useSSL=false"/>
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

在这个文件中，我们配置了一个`dataSource` bean，它使用MySQL数据库的连接信息。然后，我们配置了一个`sqlSessionFactory` bean，它使用`dataSource` bean并指定了MyBatis映射文件的位置。最后，我们配置了一个`sqlSession` bean，它使用`sqlSessionFactory` bean。

#### 4.创建数据库表以及实体类

`SQL语句`

```sql
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1003 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

在`src/main/java/com/integration`目录下创建一个名为`User.java`的新Java类，并添加以下内容：

```java
package org.javatop.integration;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-10-19 21:37
 * @description : User实体类
 */
public class User {
    private Integer id;
    private String name;
    private String email;

    public User() {
    }
    public User(Integer id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
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
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
```

这是一个简单的User类，它包含id、name和email字段，并提供了相应的getter和setter方法以及toString方法。

#### 5.创建数据访问对象(mapper)

在`src/main/java/com/integration`目录下创建一个名为`UserDao.java`的新Java接口，并添加以下内容：

```java
package org.javatop.integration.mappper;
import org.javatop.integration.pojo.User;
import java.util.List;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-10-19 21:43
 * @description : UserMapper
 */
public interface UserMapper {
    /**
     * 通过用户ID查询用户
     * @param id 用户ID
     * @return 用户信息
     */
    User getUserById(int id);
    /**
     * 查询所有用户
     * @return 全部用户信息
     */
    List<User> getAllUsers();
    /**
     * 添加用户
     * @param user 用户
     */
    void insertUser(User user);
    /**
     * 更新用户
     * @param user 用户
     */
    void updateUser(User user);
    /**
     * 删除用户
     * @param id 用户id
     */
    void deleteUser(int id);
}

```

这个接口定义了一些用于操作User对象的方法。

#### 6.创建MyBatis映射文件

在`src/main/resources/org/javatop/integration/mapper`目录下创建一个名为`UserMapper.xml`的新文件，并添加以下内容：

```xml
<mapper namespace="com.integration.mappers.UserMapper">
   <select id="getUserById" resultType="com.integration.User">
      SELECT * FROM users WHERE id = #{id}
   </select>

   <select id="getAllUsers" resultType="com.integration.User">
      SELECT * FROM users
   </select>

   <insert id="insertUser" parameterType="com.integration.User">
      INSERT INTO users (name, email) VALUES (#{name}, #{email})
   </insert>

   <update id="updateUser" parameterType="com.integration.User">
      UPDATE users SET name = #{name}, email = #{email} WHERE id = #{id}
   </update>

   <delete id="deleteUser" parameterType="int">
      DELETE FROM users WHERE id = #{id}
   </delete>
</mapper>
```

这个文件定义了一些SQL语句，用于查询、插入、更新和删除用户数据。



#### 7.测试应用程序

在`test/org/javatop/`目录下创建TestMyBatis测试类编写测试方法

```java
/**
    * 用于测试: 查询所有用户
    */
    @Test
    public void test01() throws IOException {
        InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        List<User> userList = userMapper.getAllUsers();

        for (User user : userList) {
            System.out.println("user = " + user);
        }
    }
```

控制台打印结果：

![image-20231019221207683](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310192212859.png)

### 5.3 结论

我们详细介绍了如何使用Spring 5整合MyBatis框架来构建一个完整的Java应用程序。我们学习了如何配置Spring和MyBatis，创建数据模型，实现数据访问对象和服务层，以及创建控制器来处理HTTP请求。最后，我们测试了应用程序的不同功能。希望这篇博客对您有所帮助！



### 5.4 原生MyBatis存在的问题配置繁琐：

1. **实体别名注册：** 在MyBatis中，为每个实体类定义别名可以使XML映射文件中的代码更加简洁。但当有大量实体类时，手动为每一个实体类设置别名会非常繁琐。
2. M**apper文件注册：** 在配置MyBatis时，我们需要为每个Mapper XML文件进行注册，这使得配置文件变得冗长，难以管理。
   包扫描：虽然现代版本的MyBatis提供了package属性来自动扫描别名，但在之前的版本中这是不支持的，增加了使用的复杂性。
   代码冗余：
3. **API调用：** 在使用MyBatis API进行数据库操作时，我们往往需要执行多个步骤，包括获取SqlSession、执行操作、处理异常和关闭SqlSession等。这些操作在每次数据库访问时都需要重复，导致代码冗余。
4. **资源管理：** 虽然MyBatis为我们提供了资源的自动管理，但在某些情况下，开发者仍需要手动管理数据库连接、会话等资源，这增加了开发的复杂性。
5. **异常处理：** 在使用MyBatis进行数据库操作时，可能会抛出多种异常。处理这些异常需要额外的代码，使得主逻辑变得不那么清晰。



## 6.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。

