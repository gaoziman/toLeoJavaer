---
title: MyBatisPlus一文通关
icon: circle-info
order: 1
category:
  - MyBatis
tag:
  - MyBatis
pageview: false
date: 2023-09-09
comment: false
---

> 大家好，我是Leo😀，之前自学那会有简单了解过MyBatisPlus相关文档，但是随着时间长不用，一些api以及配置都忘了，想翻笔记发现当时的自己只是囫囵吞枣的学习了，任何学习记录都没有留下来，😅😅😅，所以大家可千万不要学我哈！ 这不最近打算重新学习一下MyBatisPlus（下文简称MP），这里也是写篇博客来整理一下相关知识点，与君共勉🫡🫡🫡！



话不多说，我们先来看一张简单的思维导图，了解一下MP的主要核心功能，脑图在手，思路我有，开干🤔！

![image-20230831113008757](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311130935.png)

## 1. 快速开始

### 1.1 介绍

在快速开始我们入门Demo之前，我来首先简单介绍一下 **MP**

官网： https://baomidou.com/
简介：`MyBatis-Plus` (opens new window)（简称 MP）是一个 MyBatis (opens new window)的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

> 愿景：
> 我们的愿景是成为 MyBatis 最好的搭档，就像 魂斗罗 中的 1P、2P，基友搭配，效率翻倍。

![image-20230831113906219](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311139334.png)

**特性：**

1. 无侵入：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑

2. 损耗小：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作

3. 强大的 CRUD 操作：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分

   CRUD 操作，更有强大的条件构造器，满足各类使用需求

4. 支持 Lambda 形式调用：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错

5. 支持主键自动生成：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题

6. 支持 ActiveRecord 模式：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作

7. 支持自定义全局通用操作：支持全局通用方法注入（ Write once, use anywhere ）

8. 内置代码生成器：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用

9. 内置分页插件：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询

10. 分页插件支持多种数据库：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库

11. 内置性能分析插件：可输出 Sql 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询

12. 内置全局拦截插件：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操



### 1.2 框架设计

![image-20230831114321021](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311143114.png)



### 1.3 快速入门MP

**我们将通过一个简单的 Demo 来阐述 MyBatis-Plus 的强大功能，在此之前，你需要学会：**

- Java 开发环境以及相应 IDE
- 熟悉 Spring Boot
- 熟悉 Maven



#### 1. 创建表结构

现有一张 `User` 表，其表结构如下：

|  id  |   name   | age  |      emial      | address  |
| :--: | :------: | :--: | :-------------: | :------: |
|  1   |  admin   |  20  |  admin@qq.com   | 湖北武汉 |
|  3   |   test   |  20  |   test@qq.com   | 安徽合肥 |
|  4   | zhangsan |  17  | zhangsan@qq.com | 北京海淀 |

其对应的数据库 Schema 脚本如下：

```sql
DROP TABLE IF EXISTS user;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

对应的数据库 Data 脚本如下：

```sql
DELETE FROM user;

INSERT INTO user (id, name, age, email，address) VALUES
(1, 'admin', 18, 'test1@admin.com'，'湖北武汉'),
(3, 'test', 20, 'test2@test.com'，'湖北武汉'),
(4, 'zhangsan', 21, 'test4@zhangsan.com'，'湖北武汉'),
```



#### 2. 创建SpringBoot工程

本次教程会以`Maven`工程创建修改为`SpringBoot`工程。

我这里是在父工程下面创建许多子模块，这样就不需要每一个新的demo都需要去创建一个新的工程了，也方便Demo项目统一管理。

![image-20230831115942637](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311159740.png)





#### 3. 添加依赖

引入 SpringBoot Starter 父工程：

```xml
  <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.6.RELEASE</version>
    </parent>
```

引入 `spring-boot-starter`、`spring-boot-starter-test`、`mybatis-plus-boot-starter`、MySQL依赖：

```xml
<dependencies>
        <!--spring-boot-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--SpringBootTest-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!--lombok-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <!--mysql 驱动-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.26</version>
        </dependency>
        <!--mybatis-plus-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.5.2</version>
        </dependency>
    </dependencies>
```



#### 4. 配置

在 `application.yml` 配置文件中添加 MySQL数据库的相关配置：

```yaml
server:
  port: 8800
spring:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
  datasource:
    type: com.zaxxer.hikari.HikariDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/test?serverTimezone=GMT%2B8&useSSL=false&characterEncoding=utf-8&allowPublicKeyRetrieval=true
    username: root
    password: root
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl # 查看日志
  mapper-locations: classpath:mapper/*.xml
```



在 Spring Boot 启动类中添加 `@MapperScan` 注解，扫描 Mapper 文件夹：

```java
package com.Leo.mp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/31 13:26
 * @description : 启动类
 */
@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
@MapperScan("com.Leo.mp.mapper")
public class Application
{
    public static void main(String[] args)
    {
        ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
        Environment environment = context.getBean(Environment.class);
        System.out.println("访问链接：http://localhost:" + environment.getProperty("server.port"));
        System.out.println("(♥◠‿◠)ﾉﾞ  项目启动成功   ლ(´ڡ`ლ)ﾞ  \n" +
                " .-------.       ____     __        \n" +
                " |  _ _   \\      \\   \\   /  /    \n" +
                " | ( ' )  |       \\  _. /  '       \n" +
                " |(_ o _) /        _( )_ .'         \n" +
                " | (_,_).' __  ___(_ o _)'          \n" +
                " |  |\\ \\  |  ||   |(_,_)'         \n" +
                " |  | \\ `'   /|   `-'  /           \n" +
                " |  |  \\    /  \\      /           \n" +
                " ''-'   `'-'    `-..-'              ");
    }
}

```



#### 5. 编码

编写实体类 `User.java`（此处使用了 [Lombok (opens new window)](https://www.projectlombok.org/)简化代码）

```java
package com.Leo.mp.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/31 13:32
 * @description : User实体类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
    private String address;
}
```



编写 Mapper 包下的 `UserMapper`接口

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/31 13:33
 * @description :
 */
public interface UserMapper extends BaseMapper<User> {

}
```



#### 6. 测试

以上工作都做完就可以开始进行**功能测试**了

```JAVA
package com.Leo.mp.controller;

import com.Leo.mp.mapper.UserMapper;
import com.Leo.mp.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/31 13:43
 * @description :
 */
@RestController
public class UserController
{

    @Autowired
    private UserMapper userMapper;

    @GetMapping("/list")
    public List<User> userList()
    {
        return userMapper.selectList(null);
    }

}
```

> 提示
>
> UserMapper 中的 `selectList()` 方法的参数为 MP 内置的条件封装器 `Wrapper`，所以不填写就是无任何条件

启动项目，打开浏览器

![image-20230831134539746](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311345854.png)



#### 7. 小结

通过以上几个简单的步骤，我们就实现了 User 表的 `查询` 功能，甚至连 XML 文件都不用编写！

从以上步骤中，我们可以看到集成`MyBatis-Plus`非常的简单，只需要引入 starter 工程，并配置 mapper 扫描路径即可。

但 `MP` 的强大远不止这些功能，想要详细了解 那就继续往下看吧！



## 2. 常见注解

本文将介绍 `MybatisPlus` 注解包相关类详解（更多详细描述可点击查看源码注释）



### 2.1 @TableName

- 描述：表名注解，标识实体类对应的表, 通俗来说就是让**数据库表名和实体类一一对应**
- 使用位置：`实体类`

```JAVA
@TableName("user")
public class User {
    private Long id;
    private String  name;
    private Integer age;
    private String  email;
    private String  address;
}
```

![image-20230831134901251](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311349329.png)

**关于 `autoResultMap` 的说明：**

MP 会自动构建一个 `resultMap` 并注入到 MyBatis 里（一般用不上），请注意以下内容：

因为 MP 底层是 MyBatis，所以 MP 只是帮您注入了常用 CRUD 到 MyBatis 里，注入之前是动态的（根据您的 `实体类字段`以及注解变化而变化），但是注入之后是静态的（等于 `XML` 配置中的内容）。



### 2.2 @TableId

```JAVA
public class User {
    @TableId
    private Long id;
    private String  name;
    private Integer age;
    private String  email;
    private String  address;
}
```

![image-20230831141456740](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311414821.png)

**IdType**

![image-20230831135246510](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311352575.png)



### 2.3 @TableField

- 描述：**字段注解**（非主键）

```JAVA
public class User {
    private Long id;
    @TableField("username")
    private String  name;
    private Integer age;
    private String  email;
    private String  address;
}
```

我们可以通过**Ctrl + 鼠标左键**点进去看看

![image-20230831140046119](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311400413.png)

![image-20230831135918882](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311359990.png)

### 2.4 FieldFill

![image-20230831140158881](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311401931.png)



### 2.5 乐观锁

> 描述：乐观锁注解、标记 `@Version` 在字段



### 2.6 @TableLogic

> 描述：表字段逻辑处理注解（逻辑删除）

![image-20230831140301725](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311403776.png)



### 2.7 @OrderBy

> 描述：内置 SQL 默认指定排序，优先级低于 wrapper 条件查询

![image-20230831140357839](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311403898.png)

## 3. 核心功能

### 3.1 主键策略

`MP`默认实现5种主键生成策略，分别是：

- **AUTO** ：  配合数据库设置自增主键，可以实现主键的自动增长，类型为 `nmber`。
- **INPUT** ： 由用户输入。
- **NONE** ： 不设置，等同于`INPUT` 。
- **ASSIGN_ID** ：只有当用户未输入时，采用雪花算法生成一个适用于分布式环境的全局唯一主键，类型可以是`String`和`number`。
- **ASSIGN_UUID** ：只有当用户未输入时，生成一个String类型的主键，但不保证全局唯一。

`IdType`默认的全局设置为IdType.ASSIGN_ID,即由mybatis-plus主动分配主键，默认情况下由默认主键生成器实现类DefaultIdentifierGenerator采用雪花算法填充主键。

```java
public DbConfig() {
    this.idType = IdType.ASSIGN_ID;
    this.tableUnderline = true;
    this.capitalMode = false;
    this.logicDeleteValue = "1";
    this.logicNotDeleteValue = "0";
    this.insertStrategy = FieldStrategy.NOT_NULL;
    this.updateStrategy = FieldStrategy.NOT_NULL;
    this.whereStrategy = FieldStrategy.NOT_NULL;
}
```

在`SpringBoot`中，可以通过如下配置更改全局配置。

```yml
mybatis-plus:
  global-config:
    db-config:
      id-type: assign_id
```



### 3.2 条件构造器

> 说明:
>
> - 以下出现的第一个入参`boolean condition`表示该条件**是否**加入最后生成的sql中，例如：query.like(StringUtils.isNotBlank(name), Entity::getName, name) .eq(age!=null && age >= 0, Entity::getAge, age)
> - 以下代码块内的多个方法均为从上往下补全个别`boolean`类型的入参,默认为`true`
> - 以下出现的泛型`Param`均为`Wrapper`的子类实例(均具有`AbstractWrapper`的所有方法)
> - 以下方法在入参中出现的`R`为泛型,在普通wrapper中是`String`,在`LambdaWrapper`中是 函数 (例:`Entity::getId`,`Entity`为实体类,`getId`为字段`id`的 getter Method )
> - 以下方法入参中的`R column`均表示数据库字段,当`R`具体类型为`String`时则为数据库字段名( 字段名是数据库关键字的自己用转义符包裹 )!而不是实体类数据字段名!!!,另当`R`具体类型为`SFunction`时项目runtime不支持eclipse自家的编译器!!!

下面看一图来简单了解一下`Wrapper`的结构

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311432734.png)

#### 1. Wrapper

条件构造抽象类，最顶端父类，抽象类中提供3个方法以及其他方法

![image-20230831143422871](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311434983.png)



#### 2. AbstractWrapper

> 用于查询条件封装，生成 sql 的 where 条件,QueryWrapper(LambdaQueryWrapper) 和UpdateWrapper(LambdaUpdateWrapper) 的父类用于生成 sql 的 where 条件, entity 属性也用于生成 sql 的 where条件

![image-20230831143514543](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311435680.png)

这里列举一下他的重要方法

![image-20230831143553299](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311435421.png)



#### 3. AbstractLambdaWrapper

> Lambda 语法使用 Wrapper统一处理解析 lambda 获取 column。



#### 4. LambdaQueryWrapper

> 用于Lambda语法使用的查询Wrapper



#### 5. LambdaUpdateWrapper

> Lambda 更新封装Wrapper



#### 6. QueryWrapper

> 实体类 对象封装操作类，不是用lambda语法,自身的内部属性 实体类 也用于生成 where 条件

![image-20230831143717067](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311437171.png)



#### 7. UpdateWrapper

> 说明:
>
> 继承自 `AbstractWrapper` ,自身的内部属性 `entity` 也用于生成 where 条件
> 及 `LambdaUpdateWrapper`, 可以通过 `new UpdateWrapper().lambda()` 方法获取!

##### set

```java
set(String column, Object val)
set(boolean condition, String column, Object val)
```

- SQL SET 字段
- 例: `set("name", "Leo")`
- 例: `set("name", "")`--->数据库字段值变为**空字符串**
- 例: `set("name", null)`--->数据库字段值变为`null`

##### setSql

```java
setSql(String sql)
```

- 设置 SET 部分 SQL
- 例: `setSql("name = 'Leo'")`

##### lambda

- 获取 `LambdaWrapper`
  在`QueryWrapper`中是获取`LambdaQueryWrapper`
  在`UpdateWrapper`中是获取`LambdaUpdateWrapper`



### 3.3 CRUD接口

#### 1. 带条件查询

```JAVA
// 根据 entity 条件，查询一条记录
T selectOne(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 根据 entity 条件，查询全部记录
List<T> selectList(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询全部记录
List<Map<String, Object>> selectMaps(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询全部记录。注意： 只返回第一个字段的值
List<Object> selectObjs(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 根据 entity 条件，查询全部记录
IPage<T> selectPage(IPage<T> page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询全部记录
IPage<Map<String, Object>> selectMapsPage(IPage<T> page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询总记录数
Integer selectCount(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
```



#### 2. 带条件更新

```JAVA
	UpdateWrapper<Student> updateWrapper = new UpdateWrapper<Student>();
	updateWrapper.eq("name", "Leo").eq("age", 18).set("id", 100);
	empolyeeMapper.update(student, updateWrapper);
```



#### 3. 带条件删除

```JAVA
// 根据 entity 条件，删除记录
int delete(@Param(Constants.WRAPPER) Wrapper<T> wrapper);
// 根据 columnMap 条件，删除记录
int deleteByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);
```



#### 4. 实战案例

```JAVA
package com.Leo.mp;

import com.Leo.mp.mapper.UserMapper;
import com.Leo.mp.pojo.User;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/31 13:36
 * @description :
 */
@SpringBootTest
public class MpTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testSelect() {
        List<User> userList = userMapper.selectList(null);
        userList.forEach(System.out::println);
    }

    @Test
    void test1() {
        // 查询name不为空的用户，并且邮箱不为空的用户，年龄大于等于17
        QueryWrapper<User> wrapper = new QueryWrapper<User>()
                .isNotNull("name")
                .ge("age",17);
        userMapper.selectList(wrapper).forEach(System.out::println);
    }

    @Test
    void test2(){
        // 查询名字admin
        QueryWrapper<User> wrapper = new QueryWrapper<User>()
                .eq("name","admin");
        User user = userMapper.selectOne(wrapper); // 查询一个数据，出现多个结果使用List 或者 Map
        System.out.println(user);
    }

    @Test
    void test3(){
        // 查询年龄在 20 ~ 30 岁之间的用户
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.between("age",20,30); // 区间
        Long count = userMapper.selectCount(wrapper);// 查询结果数
        System.out.println(count);
    }

    // 模糊查询
    @Test
    void test4(){
        QueryWrapper<User> wrapper = new QueryWrapper<User>()
        // 左和右  t%
                .notLike("name","ad")
                .likeRight("email","@qq.com");
        List<Map<String, Object>> maps = userMapper.selectMaps(wrapper);
        maps.forEach(System.out::println);
    }

    // 模糊查询
    @Test
    void test5(){

        QueryWrapper<User> wrapper = new QueryWrapper<>();
        // id 在子查询中查出来
        wrapper.inSql("id","select id from student where id<3");

        List<Object> objects = userMapper.selectObjs(wrapper);
        objects.forEach(System.out::println);
    }

    //测试六
    @Test
    void test6(){
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        // 通过id进行排序
        wrapper.orderByAsc("id");
        List<User> users = userMapper.selectList(wrapper);
        users.forEach(System.out::println);
    }
}
```



### 3.4 代码生成器

对于单表的操作，虽然MP大大简化了操作，但是每次都需要我们重新创建文件，从mapper到controller，那将会带来太大的工作量。

于是我们选择使用MP为我们带来的新版生成器，一劳永逸🥳

> 注意
>
> 适用版本：mybatis-plus-generator 3.5.1 及其以上版本，对历史版本不兼容！

目前支持两套生成的方式,一套使用SQL查询的方式是兼容旧的代码生成器核心逻辑使用,另一套使用驱动规范来读取元数据的方式,默认的使用元数据查询方式来生成代码



#### 快速入门

**导入依赖**

```xml
<!--mybatis-plus-generator 生成器-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-generator</artifactId>
            <version>3.5.2</version>
        </dependency>
        <!--velocity-->
        <dependency>
            <groupId>org.apache.velocity</groupId>
            <artifactId>velocity-engine-core</artifactId>
            <version>2.3</version>
        </dependency>
        <!--以下两个引擎模板保留一个即可，看个人爱好选择-->
        <!--freemarker引擎模板-->
        <dependency>
            <groupId>org.freemarker</groupId>
            <artifactId>freemarker</artifactId>
            <version>2.3.31</version>
        </dependency>
        <!--beetl引擎模板-->
        <dependency>
            <groupId>com.ibeetl</groupId>
            <artifactId>beetl</artifactId>
            <version>3.8.1.RELEASE</version>
        </dependency>
```

**快速生成**

> 这里我已经根据官网配置生成好了一个通用的MP工具类，大家可以直接拿来用，所见即所得。

```java
package com.cisyam.code.util;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.config.rules.DateType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;
import com.baomidou.mybatisplus.generator.engine.VelocityTemplateEngine;
import com.baomidou.mybatisplus.generator.fill.Column;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @author : gaoziman
 * @description : MP 代码生成器
 * @date 2023/7/19 20:01
 */
public class CodeUtil {
    public static void main(String[] args) {

        //这里按着给的注解修改参数即可

        //手动配置数据源

        //注意修改数据库名
        String url = "jdbc:mysql://localhost:3306/test?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8";
        String name = "root";
        String password = "root";

        //数据库表的设置

        //设置需要自动代码生成的表名

        List<String> listTable = Arrays.asList("employee", "user");

        //设置 过滤 表的后缀

        List<String> listTableSuffix = Collections.singletonList("_b");

        //设置 过滤 表的后缀

        List<String> listTablePrefix = Arrays.asList("t_", "c_");


        //基本信息
        String author = "gaoziman";
        //作者
        String parent = "com.cisyam";
        //父包名
        String module = "code";
        //模块包名


        //已封装好，无需更改。可按照需求进行注释

        //1、配置数据源
        FastAutoGenerator.create(url, name, password)
                //2、全局配置
                .globalConfig(builder -> {
                    builder.author(author) // 设置作者名
                            .outputDir(System.getProperty("user.dir") + "/src/main/java")   //设置输出路径：项目的 java 目录下【System.getProperty("user.dir")意思是获取到项目所在的绝对路径】
                            .commentDate("yyyy-MM-dd hh:mm:ss")   //注释日期
                            .dateType(DateType.ONLY_DATE)   //定义生成的实体类中日期的类型 TIME_PACK=LocalDateTime;ONLY_DATE=Date;
                            .fileOverride()   //覆盖之前的文件
                            .enableSwagger()   //开启 swagger 模式
                            .disableOpenDir();   //禁止打开输出目录，默认打开
                })
                //3、包配置
                .packageConfig(builder -> {
                    builder.parent(parent) // 设置父包名
                            .moduleName(module)   //设置模块包名
                            .entity("pojo")   //pojo 实体类包名
                            .service("service") //Service 包名
                            .serviceImpl("service.impl") // ***ServiceImpl 包名
                            .mapper("mapper")   //Mapper 包名
                            .xml("mapper.xml")  //Mapper XML 包名
                            .controller("controller") //Controller 包名
                            .other("config")    //自定义包名(一般不在这里生成，而是后面编写的时候自己建包）
                            .pathInfo(Collections.singletonMap(OutputFile .xml, System.getProperty("user.dir") + "/src/main/resources/mapper"));    //配置 mapper.xml 路径信息：项目的 resources 目录下
                })
                //4、策略配置
                .strategyConfig(builder -> {
                    builder
                            .enableCapitalMode()    //开启大写命名
                            .enableSkipView()   //创建实体类的时候跳过视图
                            .addInclude(listTable) // 设置需要生成的数据表名
                            .addTableSuffix(listTableSuffix) //设置 过滤 表的后缀
                            .addTablePrefix(listTablePrefix) // 设置 过滤 表的前缀

                            //4.1、实体类策略配置
                            .entityBuilder()
                            .enableChainModel() //开启链式模型
                            //.disableSerialVersionUID()  //默认是开启实体类序列化，可以手动disable使它不序列化。由于项目中需要使用序列化就按照默认开启了
                            .enableTableFieldAnnotation()       // 开启生成实体时生成字段注解
                            .enableLombok() //开启 Lombok
                            .versionColumnName("version")   //乐观锁字段名(数据库)
                            .versionPropertyName("version") //乐观锁属性名(实体)
                            .logicDeleteColumnName("deleted")   //逻辑删除字段名(数据库)
                            .logicDeletePropertyName("deleteFlag")  //逻辑删除属性名(实体)
                            .naming(NamingStrategy.underline_to_camel)  //数据库表映射到实体的命名策略：默认是下划线转驼峰命。这里可以不设置
                            .columnNaming(NamingStrategy.underline_to_camel)    //数据库表字段映射到实体的命名策略：下划线转驼峰命。（默认是和naming一致，所以也可以不设置）
                            .addTableFills(
                                    new Column("create_time", FieldFill.INSERT),
                                    new Column("modify_time", FieldFill.INSERT_UPDATE)
                            )   //添加表字段填充，"create_time"字段自动填充为插入时间，"modify_time"字段自动填充为插入修改时间
                            .idType(IdType.AUTO)    //设置主键自增

                            //4.2、Controller策略配置
                            .controllerBuilder()
                            .enableHyphenStyle()    //开启驼峰连转字符
                            .formatFileName("%sController") //格式化 Controller 类文件名称，%s进行匹配表名，如 UserController
                            .enableRestStyle()  //开启生成 @RestController 控制器

                            //4.3、service 策略配置
                            .serviceBuilder()
                            .formatServiceFileName("%sService") //格式化 service 接口文件名称，%s进行匹配表名，如 UserService
                            .formatServiceImplFileName("%sServiceImpl") //格式化 service 实现类文件名称，%s进行匹配表名，如 UserServiceImpl

                            //4.4、Mapper策略配置
                            .mapperBuilder()
                            .superClass(BaseMapper.class)   //设置父类
                            .enableBaseResultMap()  //启用 BaseResultMap 生成
                            .enableBaseColumnList() //启用 BaseColumnList
                            .formatMapperFileName("%sMapper")   //格式化 mapper 文件名称
                            .enableMapperAnnotation()       //开启 @Mapper 注解
                            .formatXmlFileName("%sMapper") //格式化Xml文件名称
                            .formatMapperFileName("%sMapper");   //格式化Mapper文件名称

                })
                //5、模板
                .templateEngine(new VelocityTemplateEngine())
                /*
                    模板引擎配置，默认 Velocity 可选模板引擎 Beetl 或 Freemarker(以下两个引擎用哪个就保留哪个)
                   .templateEngine(new BeetlTemplateEngine())
                   .templateEngine(new FreemarkerTemplateEngine())
                 */
                .templateEngine(new FreemarkerTemplateEngine())
                //本人选择了Freemarker
                //6、执行
                .execute();
    }
}
```



## 4. 拓展

### 4.1 全局ID生成策略

> 配置了之后就不需要在实体类主键上配置了

```yml
mybatis-plus:
  global‐config:
    db‐config:
      id‐type: auto
```



### 4.2 逻辑删除

**物理删除**： 在删除的时候直接将数据从数据库干掉DELTE
**逻辑删除**： 从逻辑层面控制删除，通常会在表里添加一个逻辑删除的字段比如 enabled 、is_deleted ，数据默认是有效的（值为1），当用户删除时将数据修改UPDATE 0， 在查询的时候就只查  where is_deleted =1.

> 在阿里开发规范中，当我们设计数据库字段表示有 ” 是 否“ 相关概念是，应该是设置为is_xxxx 类型。

需要添加逻辑删除的字段
局部单表逻辑删除，需要在对应的`pojo`类加入对应的逻辑删除标识字段

```java
@TableLogic // 代表逻辑删除（单个字段的）
private Integer is_deleted;
```

开启全局逻辑删除配置，如果进行了全局逻辑删除配置并且指定了，就可以不用在每个实体类中配置了`@TableLogic`

```yml
mybatis-plus:
  global‐config:
    db-config:
      id‐type: auto
      logic-delete-field: is_deletd # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```

当执行删除， 将会把逻辑删除字段进行修改，执行的sql语句为

```sql
update user set is_deletd = 0 where id= ? 
```

当执行查询时。会自动查询有效数据 where flag=1

```sql
select id,name,age,email,address from user where is_deleted=1
```



### 4.3 分页插件

#### 1. PaginationInnerInterceptor

##### 支持的数据库

- mysql，oracle，db2，h2，hsql，sqlite，postgresql，sqlserver，Phoenix，Gauss ，clickhouse，Sybase，OceanBase，Firebird，cubrid，goldilocks，csiidb，informix，TDengine，redshift
- 达梦数据库，虚谷数据库，人大金仓数据库，南大通用(华库)数据库，南大通用数据库，神通数据库，瀚高数据库，优炫数据库，星瑞格数据库



##### 属性介绍

![image-20230831153549029](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311535119.png)



#### 2. Page

该类继承了 `IPage` 类，实现了 `简单分页模型` 如果你要实现自己的分页模型可以继承 `Page` 类或者实现 `IPage` 类

![image-20230831153516852](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311535033.png)



#### 3. 配置类

> 要使用MP的分页插件，必须配置一个全局配置类，才可以全局生效。下面我就直接放代码，大家可以直接拿来用。

```JAVA
package com.manman.common.config;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.autoconfigure.ConfigurationCustomizer;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author Loe
 */
@Configuration
@MapperScan("com.Leo.mp.mapper")
public class MybatisPlusConfig {

    /**
     * 新的分页插件,一缓和二缓遵循mybatis的规则,需要设置 MybatisConfiguration#useDeprecatedExecutor = false 避免缓存出现问题(该属性会在旧插件移除后一同移除)
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }

    @Bean
    public ConfigurationCustomizer configurationCustomizer() {
        return configuration -> configuration.setUseDeprecatedExecutor(false);
    }
}
```



### 4.4 乐观锁插件

#### 1. 介绍

> 悲观锁：
>
> 悲观锁，正如其名，具有强烈的独占和排他特性。它指的是对数据被外界(包括本系统当前的其他事务，以及来自外部系统的事务处理)修改持保守态度。因此，在整个数据处理过程中，将数据处于锁定状态。
> 假设功能并发量非常大，就需要使用 synchronized 来处理高并发下产生线程不安全问题， 会使其他线程进行挂起等待从而影响系统吞吐量

> 乐观锁：
>
> 乐观锁是相对悲观锁而言的，乐观锁假设数据一般情况下不会造成冲突，所以在数据进行提交更新的时候，才会正式对数据的冲突与否进行检测，如果发现冲突了，则返回给用户错误的信息，让用户决定如何去做。乐观锁适用于读多写少的场景，这样可以提高程序的吞吐量。
> 假设功能产生并发几率极少，采用乐观锁版本机制对比， 如果有冲突 返回给用户错误的信息



#### 2. 为什么需要锁

> 在多用户环境中，在同一时间可能会有多个用户更新相同的记录，这会产生冲突。这就是著名的并发性问题

**丢失更新**：一个事务的更新覆盖了其它事务的更新结果，就是所谓的更新丢失。例如：用户1把值从500改为8000，用户B把值从500改为200，则多人同时提交同一条记录，后提交的把之前的提交数据覆盖。
脏读：当一个事务读取其它完成一半事务的记录时，就会发生脏读。例如：用户A,B看到的值都是500，用户B把值改为200，用户A读到的值仍为500。

针对一种问题的解决方案，为解决问题而生的。解决什么问题呢？主要是解决丢失更新问题如下图理解

![image-20230831152857083](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311528221.png)

为了解决这些并发带来的问题。 我们需要引入**并发控制机制**。



#### 3. 编码实现

![image-20230831153117810](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311531912.png)



1. 在对应的实体类中加version字段，并设置成下面这样

   ```java
   @Version //这就是控制版本的
   @TableField(fill = FieldFill.INSERT) //这个方便在添加的时候设置版本初始为1
   private Integer version; //版本的字段
   ```

    2. 创建一个新的类，实现`MetaObjectHandler`自动填充，像创建时间，更新时间也可以在这操作。

   ```java
   @Component
   public class MybatisPlusMetaObjectHandler implements MetaObjectHandler {
   	@Override
   	public void insertFill(MetaObject metaObject) {
   	//这里的“version”就是指定的字段，设置初始值为1，之后每修改一次+1 
   		this.setFieldValByName("version",1,metaObject);
   	}
   	@Override
   	public void updateFill(MetaObject metaObject) {
   	}
   }
   ```



2. 在创建一个配置类，开启一个乐观锁插件

   ```java
   @Configuration
   @MapperScan("com.zhz.mapper")//这里就是你的mapper文件的包
   public class MyBatisConfig {
   	//乐观锁插件
   	@Bean
   	public OptimisticLockerInterceptor optimisticLockerInterceptor(){
   		return new OptimisticLockerInterceptor();
   	}
   }
   ```

> 接下来在做增加数据的时候，调用 insert 添加方法就可以了。修改的时候呢，我们需要先查人后再做修改，因为我们为了防止问题的发生，需要先去查询版本号比对才进行后续操作！！



## 5. 总结

以上便是关于MP相关的内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是`Leo`，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于`Leo`，可以关注下面这个公众号，后面文章会首先同步至公众号。

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308311543516.png" alt="扫码_搜索联合传播样式-标准色版" style="zoom: 50%;" />



参考资料：

[MP官网](https://baomidou.com/)