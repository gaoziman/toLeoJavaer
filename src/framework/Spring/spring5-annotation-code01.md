---
title: Spring基础注解
icon: circle-info
order: 6
tags:
  - Spring🍃
categories:
  - Spring专栏🍃
pageview: false
date: 2023-10-22 16:51:56
comment: false
---


# Spring5学习笔记—基础注解

- 学习参考 ：

    - 讲师：**孙帅老师**
    - 课程：[孙哥说Spring5](https://www.bilibili.com/video/BV185411477k?p=188&spm_id_from=pageDriver&vd_source=cea816a08805c218ac4390ae9b61ae31)

## 1.前言

前面文章我们学习了关于Spring的IOC与AOP相关知识点，在此之前，我们主要学习Spring的一些核心概念，**IOC**和**AOP**等等。从这篇博客开始，我们将转向跟我简洁的**注解开发**。我们能更加直观和简洁地定义和配置Spring组件，极大地提高开发效率。本篇主要内容介绍为Spring基础注解部分。好了，话不多说，让我们开始吧😎😎😎。



## 2.注解的基本概念

### 2.1 什么是注解编程

注解编程指的是使用 **注解(Annotation)** 来进行编程的一种方式。注解是Java语言的一种特殊语法元素，可以在代码中添加**元数据(metadata)**来提供额外的信息，用于给编译器、解释器、工具或其他框架做指示。

使用注解可以给代码添加更多的语义信息，以便于编译器、工具或框架进行基于注解的处理。它可以用于描述类、方法、字段等的特性、行为或约束。通过注解，可以实现一些在运行时对代码进行自动化处理的功能，如代码生成、配置加载、依赖注入等。

**注解编程的主要特点包括：**

1. **简化配置：** 使用注解可以将一些配置信息和逻辑直接嵌入到代码中，避免了繁琐的XML配置或属性文件配置。
2. **提升开发效率：** 通过使用注解，可以自动化完成一些重复性工作，减少编码工作量和错误的可能性。
3. **增强可读性和可维护性：** 注解可以为代码添加更多的语义信息，使代码更加易于理解和维护。
4. **扩展性和灵活性：** 注解可以根据需要进行扩展和定制，满足不同的业务需求。

在Java中，注解是通过`@`符号来使用的，例如`@Override`、`@Autowired`等。Java提供了一些常用的注解，如`@Override`、`@Deprecated`、`@SuppressWarnings`等。此外，开发人员还可以自定义注解来实现特定的功能和逻辑。

注解编程在很多框架和库中被广泛应用，比如Spring框架中的依赖注入、MyBatis框架中的SQL映射、JUnit测试框架中的测试标记等。通过使用注解，可以使代码更加简洁、易读和易于扩展。

### 2.2 为什么要学习注解编程

1. **简化配置：** 使用注解可以大大简化Spring配置文件（如XML文件）的编写。相比于繁琐的XML配置，注解配置更加简洁、直观，减少了样板代码的编写，提高了开发效率。
2. **提高可读性：** 通过使用注解，可以将配置信息直接附加在代码元素上，使得代码更加清晰、易于理解。注解可以提供更直观的描述，使得代码的意图更加明确，减少了对繁琐文档的依赖。
3. **实现依赖注入：** Spring框架的核心特性之一是依赖注入（Dependency Injection，DI）。通过使用注解，可以方便地标识和注入依赖对象，减少了手动编写繁琐的依赖关系配置代码。
4. **实现面向切面编程：** Spring框架还提供了面向切面编程（Aspect-Oriented Programming，AOP）的支持。通过使用注解，可以方便地定义切面和切点，实现横切关注点的模块化和复用，提高了代码的可维护性和可扩展性。
5. **整合第三方库和框架：** 许多第三方库和框架都提供了与Spring集成的注解，通过学习Spring注解编程，可以更好地与这些库和框架进行整合开发，提高开发效率。
6. **跟上行业趋势：** 在现代Java开发中，使用注解已经成为一种主流的编程方式。很多流行的开源框架和库都广泛使用注解，学习Spring注解编程可以帮助你更好地理解和使用这些框架，跟上行业的发展趋势。

学习Spring注解编程可以使你更加高效地使用Spring框架，简化配置，提高代码的可读性和可维护性，实现依赖注入和面向切面编程等重要特性。

### 2.3 注解的作用

Spring框架提供了丰富的注解，这些注解在开发中起到了很多重要的作用。以下是几个常见的Spring注解及其作用：

1. `@Component`：用于标记一个类作为Spring的组件，让Spring自动进行扫描和注册。一般与`@Autowired`配合使用，实现依赖注入。
2. `@Autowired`：用于自动注入依赖关系，即通过类型匹配或名称匹配自动将依赖对象注入到相应的属性、构造方法或Setter方法中。
3. `@Service`：用于标记一个类作为服务层组件，通常用于定义业务逻辑，与`@Component`功能类似。
4. `@Repository`：用于标记一个类作为数据访问层（DAO）的组件，通常用于数据库操作，与`@Component`功能类似。
5. `@Controller`：用于标记一个类作为控制器组件，通常用于处理用户请求，与`@Component`功能类似。
6. `@RequestMapping`：用于映射请求URL和处理方法，指定URL路径和HTTP方法，定义请求与处理方法的映射关系。
7. `@Value`：用于注入配置文件中的值或表达式，将属性值从配置文件中获取并注入到相应的属性中。
8. `@Configuration`：用于标记一个类为配置类，提供配置信息，替代XML配置文件。
9. `@Bean`：用于将方法返回的对象注册为Spring容器中的Bean。
10. `@Qualifier`：用于指定注入的Bean的名称，用于解决自动注入时多个Bean的冲突问题。
11. `@Scope`：用于指定Bean的作用域，包括单例（Singleton）、原型（Prototype）等。
12. `@Transactional`：用于标记一个方法或类需要进行事务管理，确保方法的执行在事务的上下文环境中。

![image-20231020223109264](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310202231380.png)

**主要还是来替换XML这种配置形式，简化配置**

这些注解使得我们Java程序员可以通过简单的注解配置来实现各种功能，如**依赖注入**、**AOP切面**、**事务管理**，**日志管理**等。注解的使用能够简化配置，提高开发效率，并且使代码更加清晰、易读和易于维护。同时，注解也是Spring框架实现各种功能的基础，对于深入理解和灵活应用Spring框架非常重要。

### 2.4 使用Spring注解开发第一个问题

```markdown
Spring基于注解进行配置后，还能否解耦合呢？

在Spring框架应用注解时，如果对注解配置的内容不满意，可以通过Spring配置文件进行覆盖的。
```

我们接着往下看，开始学习我们Spring基础注解来揭晓答案。



## 3.Spring基础注解

本篇文章基础注解都是基于Spring2.x提供的注解

⚠️注意：这个阶段的注解，仅仅是简化XML的配置，并不能够完全替代XML配置文件

### 3.1 对象创建相关注解

**搭建开发环境**

创建一个新的配置文件，开启扫描包

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
<!-- 告知Spring扫描指定包及其子包对应的注解 -->
<context:component-scan base-package="org.javatop.basic.annotation"/>
</beans>
```



**对象创建相关注解**

@Component

作用：替换原有spring配置文件中的bean标签

1. class属性:
   传统的XML配置中，我们使用class属性来告诉Spring需要创建哪个类的实例。
   当使用@Component注解时，Spring通过扫描指定的包来找到所有带有此注解的类。在找到这些类后，Spring通过反射来创建它们的实例。
   **因此，注解的class属性实际上是通过Spring的自动扫描和Java的反射机制隐式得到的。**
2. id属性:
   在XML配置中，我们通常使用id属性为bean指定一个唯一的名称。
   使用@Component注解时，如果没有明确指定bean的名称，Spring会使用一个默认的命名策略：将类名的首字母变为小写。例如，**UserDao类的默认bean名称就是userDao。**

![image-20231020225800040](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310211855340.png)



**细节分析：**

如何显示指定工厂创建对象的id值

```java
@Component("u")
```



**Spring配置文件覆盖注解配置内容**

```java
applicationContext.xml

<bean id="u" class="org.javatop.bean.User"/>

id值 class的值 要和 注解中的设置保持一值 
```

**自定义Bean ID：** **@Component注解 **允许通过其属性值来自定义Bean的ID。在上述例子中，我们使用@Component(“u”)来设置Bean的ID为"u"。
**XML配置优先：** 如果在Spring的XML配置文件中有一个与注解Bean ID相同的Bean定义，XML中的定义会覆盖注解中的定义。这提供了一个方法，使开发者可以在必要时覆盖基于注解的配置，给予了更大的灵活性。

```java
package org.javatop.basic.annotation.pojo;

import org.springframework.stereotype.Component;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-10-20 22:46
 * @description : User实体类
 */
@Component
public class User {
    private Integer id;
    private String name;
    private String email;

    public User() {
        System.out.println("User对象被创建了.....");
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



```java
import lombok.extern.slf4j.Slf4j;
import org.javatop.basic.annotation.pojo.User;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-10-20 22:49
 * @description : 用于测试 @Component注解
 */
@Slf4j
public class TestAnnotation {
    /**
     * 用于测试 @Component注解
     */
    @Test
    public void test1() {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        User user = ctx.getBean("user", User.class);
        log.info("{}", user);
    }
}

```

当我们执行测试类之后，我们打开控制台发现：

![image-20231020230536010](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310202305140.png)



我们在User对象的无参构造方法打印执行了，说明了此时User对象已经被Spring创建了，此时的**@Component**已经生效了。



**@Component的衍生注解**

注意：本质上这些衍生注解就是@Component
作用 <bean  
细节 @Service("s")

目的：增加可读性

注意：Spring整合Mybatis开发过程中 不使用@Repository @Component 因为dao实现类是框架生成的

```markdown
@Repository  --->  XXXDAO
@Service
@Controller 
```



**@Scope注解**

作用：控制简单对象创建次数
注意：不添加@Scope Spring提供默认值 singleton

```xml
<bean id="" class="" scope="singleton|prototype"/>
```



**@Lazy注解**

作用：延迟创建单实例对象
注意：一旦使用了@Lazy注解后，Spring会在获取这个对象时候，才进行创建

```xml
<bean id="" class="" lazy="false"/>
```



生命周期方法相关注解

> 1. 初始化相关方法 @PostConstruct  **构造后处理**
     >    InitializingBean
     >    <bean init-method=""/>
> 2. 销毁方法 @PreDestroy    **销毁前处理**
     >    DisposableBean
     >    <bean destory-method=""/>
     >    注意：1. 上述的2个注解并不是Spring提供的，JSR(JavaEE规范)520
     >        2. 再一次的验证，通过注解实现了接口的契约性



### 3.2 注入相关注解



用户自定义类型 **@Autowired**

![image-20200601114751016](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291504099.png)


**@Autowired细节**

1. Autowired注解基于类型进行注入 [推荐]
   基于类型的注入：注入对象的类型，必须与目标成员变量类型相同或者是其子类（实现类）

2. Autowired Qualifier 基于名字进行注入 [了解]
   基于名字的注入：注入对象的id值，必须与Qualifier注解中设置的名字相同

3. Autowired注解放置位置
   a) 放置在对应成员变量的set方法上
   b) 放置在成员变量之上，Spring通过反射直接对成员变量进行注入（赋值）[推荐]

4. JavaEE规范中类似功能的注解
   JSR250 @Resouce(name="userDAOImpl") 基于名字进行注入
   @Autowired()
   @Qualifier("userDAOImpl")
   注意：如果在应用Resource注解时，名字没有配对成功，那么他会继续按照类型进行注入。
   JSR330 @Inject 作用 @Autowired完全一致 基于类型进行注入 ---》 EJB3.0

   ```xml
   <dependency>
           <groupId>javax.inject</groupId>
           <artifactId>javax.inject</artifactId>
           <version>1</version>
   </dependency>
   ```

JDK类型

@Value注解完成步骤：

```markdown
1. 设置xxx.properties 
   id = 10
   name = suns
2. 告知Spring的工厂读取这个xxx.properties配置文件：
   	 方式一：applicationContext.xml文件中加：
   			<context:property-placeholder location=""/>
   	 方式二：类上加 @PropertySource("") 注解，指明配置文件路径
3. 代码中获取：
   属性上加 @Value("${key}") 注解
```

**@Value注解使用细节**

**@Value注解不能应用在静态成员变量上**

```markdown
  如果应用，赋值（注入）失败
```

**@Value注解+Properties这种方式，不能注入集合类型**

```markdown
Spring提供新的配置形式 YAML YML (SpringBoot)
```



### 3.3 注解扫描详解

```xml
<!-- 当前包 及其 子包  -->
<context:component-scan base-package="org.javatop"/>
```

#### 1. 排除过滤

```xml
<context:component-scan base-package="org.javatop">
   <context:exclude-filter type="" expression=""/>
   type: assignable:排除特定的类型 不进行扫描
         annotation:排除特定的注解 不进行扫描
         aspectj:切入点表达式（指定的包/类 不进行扫描）
                 包切入点： com.javatop.bean..*
                 类切入点： *..User
         regex:正则表达式 
         custom：自定义排除策略框(架底层开发才会使用)
</context:component-scan>

排除策略可以叠加使用 
<context:component-scan base-package="org.javatop">
  <context:exclude-filter type="assignable" expression="org.javatop.bean.User"/>

  <context:exclude-filter type="aspectj" expression="org.javatop.injection..*"/>
</context:component-scan>
```

#### 2. 包含过滤

```xml
<context:component-scan base-package="org.javatop" use-default-filters="false">
   <context:include-filter type="" expression=""/>
</context:component-scan>

1. use-default-filters="false"
   作用：让Spring默认的注解扫描方式 失效。
2. <context:include-filter type="" expression=""/>
   作用：指定要扫描的注解 
   type:assignable:只扫描指定的类型
        annotation:只扫描指定的注解
        aspectj:切入点表达式（只扫描指定的包/类）
                包切入点： com.javatop.bean..*
                类切入点： *..User
        regex:正则表达式 
        custom：自定义排除策略框架底层开发

包含的方式也支持叠加
<context:component-scan base-package="org.javatop" use-default-filters="false">
    <context:include-filter type="annotation" expression="org.springframework.stereotype.Repository"/>
    <context:include-filter type="annotation" expression="org.springframework.stereotype.Service"/>
</context:component-scan>
```

### 3.4 对于注解开发的思考

配置互通

含义：Spring注解配置和配置文件的配置，互通

```java
@Repository
public class UserDAOImpl{

}

public class UserServiceImpl{
   private UserDAO userDAO;
   set get
}
```

```xml
  <bean id="userService" class="org.javatop.service.UserServiceImpl">
      <!-- 可以使用在java代码中使用 @Repository 注解配置的实例 -->
     <property name="userDAO" ref="userDAOImpl"/>
  </bean>
```

什么情况下使用注解？什么情况下使用配置文件？

**@Component 替换 bean标签**

基础注解（@Component @Autowired @Value) 程序员开发类型的配置

1. 在程序员开发的类型上 可以加入对应注解 进行对象的创建
   User  UserService  UserDAO  UserAction

2. 应用其他非程序员开发的类型时，还是需要使用<bean 进行配置的
   SqlSessionFactoryBean  MapperScannerConfigure



### 3.5 SSM整合开发半(注解开发)

搭建开发环境

- 引入相关jar 【SSM POM】
- 引入相关配置文件
    - applicationContext.xml
    - struts.xml
    - log4.properties
    - XXXMapper.xml
- 初始化配置
    - Web.xml Spring (ContextLoaderListener)
    - Web.xml Struts Filter

**编码**

```xml
<!-- 开启工厂的注解扫描 -->
<context:component-scan base-package=""/>
```

DAO (Spring+Mybatis)

>   1. 配置文件的配置
       >      1. DataSource
>      2. SqlSessionFactory ----> SqlSessionFactoryBean
          >         1. dataSource
>         2. typeAliasesPackage
>         3. mapperLocations
>      3. MapperScannerConfigur ---> DAO接口实现类
>   2. 编码
       >      1. entity
>      2. table
>      3. DAO接口
>      4. 实现Mapper文件



## 4.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。



![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)