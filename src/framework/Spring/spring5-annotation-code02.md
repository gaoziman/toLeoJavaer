---
title: Spring高级注解
icon: circle-info
order: 7
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

上一篇博客我们详细介绍了一下有关Spring的基础系列注解，并通过一些案例来讨论使用这些基础注解来简化我们的开发。这篇文章我们将继续讨论Spring高级注解开发，更深入地了解这些强大的工具如何加速开发过程并提高代码质量，好了，话不多说，让我们开始吧😎😎😎。



## 2.配置Bean

```java
Spring在3.x提供的新的注解，用于替换XML配置文件。
  
  @Configuration
public class AppConfig{
  
}
```

**开发步骤：**

> 1. **创建配置类**：首先，创建一个Java类，并在其上标记 @Configuration 注解，将其变为一个配置Bean。
> 2. **编写配置代码**：在配置类中，编写Spring配置代码，包括Bean定义、依赖注入等。
> 3. **进行测试**：编写测试代码来验证配置类中的配置是否按预期工作。

### 1.讨论Bean

配置Bean在应用的过程中，替换了XML具体什么内容呢？

![image-20200703100033265](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291504739.png)



### 2.注解工厂

**AnnotationConfigApplicationContext**

```markdown
使用配置Bean之后创建工厂的两种方式：
   1. 指定配置bean的Class
       ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
   2. 指定配置bean所在的路径 
       ApplicationContext ctx = new AnnotationConfigApplicationContext("org.javatop");
```



### 3.使用配置Bean的注意事项：

使用配置Bean之后无法再集成log4j日志框架，而应该集成新的日志框架logback

logback集成开发步骤：

#### 3.1 引入相关jar

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.25</version>
</dependency>

<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>jcl-over-slf4j</artifactId>
    <version>1.7.25</version>
</dependency>

<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
</dependency>

<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-core</artifactId>
    <version>1.2.3</version>
</dependency>

<dependency>
    <groupId>org.logback-extensions</groupId>
    <artifactId>logback-ext-spring</artifactId>
    <version>0.1.4</version>
</dependency>
```

#### 3.2 引入logback配置文件

在Resource目录下面创建logback.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- 控制台输出 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="DEBUG">
        <appender-ref ref="STDOUT" />
    </root>

</configuration>
```

- @Configuration注解的本质

  在传统的Spring开发中，我们通常使用XML文件来配置应用程序的组件、依赖关系和其他配置信息。但是，随着应用程序的复杂性增加，XML配置文件变得冗长、繁琐，并且容易出错。为了简化配置，Spring引入了基于Java的配置方式，即通过编写Java类来提供配置信息，这就是配置类。

  `@Configuration`注解标记的类被称为配置类，它充当了传统XML配置文件的替代品，提供了一种更加直观、类型安全和可维护的配置方式。配置类可以包含一些特殊的注解和方法，用于声明和定义Spring Bean以及其他配置元素。

  那么，`@Configuration`注解的本质是什么呢？简单来说，`@Configuration`注解告诉Spring容器，被注解的类是一个配置类，它包含了一些用于配置应用程序的Bean定义和其他配置元素。

  具体来说，当Spring容器扫描到被`@Configuration`注解标记的类时，它会解析该类，并根据其中的配置信息创建相应的Bean定义。这些配置信息可以包括`@Bean`注解标记的方法，用于定义Bean的创建和初始化逻辑。同时，配置类还可以使用其他注解，如`@ComponentScan`、`@Import`等，来进一步定义和引入其他的Bean定义和配置。

  配置类的优势在于它提供了更加灵活、可读性高的配置方式。我们可以在配置类中使用Java语言的特性，如条件判断、循环等，来动态创建和配置Bean。同时，配置类的类型安全性更高，编译器可以帮助我们检测配置错误和类型不匹配的问题。

  总结起来，`@Configuration`注解的本质是告诉Spring容器，被注解的类是一个配置类，它包含了用于配置应用程序的Bean定义和其他配置元素。通过配置类，我们可以以Java类的形式来定义和管理Spring应用程序的配置信息，提供了更加直观、类型安全和可维护的配置方式。

  **也是@Component注解的衍生注解，可以应用<context:component-scan进行扫描。**



## 2. @Bean注解

**@Bean**注解在配置bean中进行使用，等同于XML配置文件中的<bean标签

### 2.1 @Bean注解的基本使用

#### 1.什么是简单对象什么是复杂对象呢

在Spring中，简单对象和复杂对象是相对的概念，用于描述对象的结构和复杂程度。

**简单对象(Simple Object)** 通常指的是简单的数据类型或简单的**POJO(Plain Old Java Object)**。简单数据类型包括基本数据类型**(如整数、浮点数、布尔值等)**以及它们的包装类型(**如Integer、Float、Boolean等)**。简单POJO是指没有复杂业务逻辑和依赖关系的普通Java对象，通常只包含一些简单的属性和对应的**getter**和**setter**方法。

复杂对象（Complex Object）通常指的是具有复杂结构和关联关系的对象。这些对象可能包含嵌套的对象、集合或其他复杂类型的属性。复杂对象可能涉及到多层级的关系，需要进行依赖注入、关联关系的管理和业务逻辑的处理。

在Spring中，对于简单对象，通常可以直接使用基本的依赖注入方式，如通过`@Autowired`注解注入简单的依赖对象。而对于复杂对象，通常需要进行更复杂的配置和管理，如通过XML配置文件或注解配置相关的依赖关系、使用`@Qualifier`注解解决依赖对象的歧义性、使用`@Autowired`注解注入集合类型的属性等。

需要注意的是，简单对象和复杂对象并没有严格的定义和界限，它们的划分主要是为了描述对象的复杂程度和处理方式。在实际开发中，根据具体的业务需求和对象的结构，可以灵活地选择适合的依赖注入方式和配置方式。

简单来说：**简单对象就是直接能够通过new方式创建的对象，比如new User()。复杂对象就是不能通过new的方式直接创建的对象。比如 Connection SqlSessionFactory等等**

#### 2.简单对象的创建

![image-20231022144250397](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310221442630.png)



#### 3.复杂对象的创建

```java
  //@Bean 创建复杂对象
  //一般用于遗留系统整合 
  @Bean
  public Connection conn1() {
    Connection conn = null;
    try {
      ConnectionFactoryBean factoryBean = new ConnectionFactoryBean();
      conn = factoryBean.getObject();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return conn;
  }
```

#### 4.自定义id值

```java
@Bean("id")
```

#### 5.控制对象创建次数

```java
@Bean
@Scope("singleton|prototype") 默认值 singleton
```

当我们使用@Scope注解的时候，value值为sinleton时或者不填写@Socope注解时，Spring只会为我们创建一个对象。当我们value值为prototype，此时Spring会为我们创建多个对象。

![image-20231022145500394](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310221455574.png)



### 2.2 @Bean注解的注入

#### 1. 用户自定义类型

```java
//待注入对象
@Bean
public UserDAO userDAO() {
  return new UserDAOImpl();
}
```

```java
  //方式一：待注入对象作为参数：
  @Bean
  public UserService userService(UserDAO userDAO) {
    UserServiceImpl userService = new UserServiceImpl();
    userService.setUserDAO(userDAO);
    return userService;
  }
```

  ```java
//方式二（简化）：直接调用该方法：
  @Bean
  public UserService userService() {
    UserServiceImpl userService = new UserServiceImpl();
    userService.setUserDAO(userDAO());
    return userService;
  }
  ```



#### 2. JDK类型的注入

```java
@Bean
public Customer customer() {
  Customer customer = new Customer();
  customer.setId(1);
  customer.setName("xiaohei");

  return customer;
}
```

JDK类型注入细节分析：如果直接在代码中进行set方法的调用，会存在耦合的问题，怎么解决？

```java
  @Configuration
  @PropertySource("classpath:/init.properties")
  public class AppConfig1 {
  
      @Value("${id}")
      private Integer id;
      @Value("${name}")
      private String name;
   
      @Bean
      public Customer customer() {
          Customer customer = new Customer();
          customer.setId(id);
          customer.setName(name);
  
          return customer;
      }
  }
```



## 3. @ComponentScan注解

`@Configuration`注解是Spring框架中的一个重要注解，用于标记一个类为配置类。配置类提供了Spring应用程序的配置信息，替代了传统的XML配置文件。在详细解释`@Configuration`注解的本质之前，我们先了解一下它的背景和作用。

在传统的Spring开发中，我们通常使用XML文件来配置应用程序的组件、依赖关系和其他配置信息。但是，随着应用程序的复杂性增加，XML配置文件变得冗长、繁琐，并且容易出错。为了简化配置，Spring引入了基于Java的配置方式，即通过编写Java类来提供配置信息，这就是配置类。

`@Configuration`注解标记的类被称为配置类，它充当了传统XML配置文件的替代品，提供了一种更加直观、类型安全和可维护的配置方式。配置类可以包含一些特殊的注解和方法，用于声明和定义Spring Bean以及其他配置元素。

那么，`@Configuration`注解的本质是什么呢？简单来说，`@Configuration`注解告诉Spring容器，被注解的类是一个配置类，它包含了一些用于配置应用程序的Bean定义和其他配置元素。

具体来说，当Spring容器扫描到被`@Configuration`注解标记的类时，它会解析该类，并根据其中的配置信息创建相应的Bean定义。这些配置信息可以包括`@Bean`注解标记的方法，用于定义Bean的创建和初始化逻辑。同时，配置类还可以使用其他注解，如`@ComponentScan`、`@Import`等，来进一步定义和引入其他的Bean定义和配置。

配置类的优势在于它提供了更加灵活、可读性高的配置方式。我们可以在配置类中使用Java语言的特性，如条件判断、循环等，来动态创建和配置Bean。同时，配置类的类型安全性更高，编译器可以帮助我们检测配置错误和类型不匹配的问题。

总结起来，`@Configuration`注解的本质是告诉Spring容器，被注解的类是一个配置类，它包含了用于配置应用程序的Bean定义和其他配置元素。通过配置类，我们可以以Java类的形式来定义和管理Spring应用程序的配置信息，提供了更加直观、类型安全和可维护的配置方式。等同于XML配置文件中的`<context:component-scan`标签



### 3.1 基本使用：

```java
//加载配置Bean上：
@Configuration
@ComponentScan(basePackages = "org.javatop.scan")
public class AppConfig2 {

}

<context:component-scan base-package=""/
```

### 3.2 排除、包含的使用：

#### 1.排除过滤：

```xml
<context:component-scan base-package="org.javatop">
  <context:exclude-filter type="assignable" expression="org.javatop.bean.User"/>
</context:component-scan>
```

替换为：

```java
  @ComponentScan(basePackages = "org.javatop.scan",
                 excludeFilters = {@ComponentScan.Filter(type= FilterType.ANNOTATION,value={Service.class}),
                                   @ComponentScan.Filter(type= FilterType.ASPECTJ,pattern = "*..User1")})
  /*
  type = FilterType.ANNOTATION          value
                   .ASSIGNABLE_TYPE     value
                   .ASPECTJ             pattern   
                   .REGEX               pattern
                   .CUSTOM              value        */
```

#### 2.包含过滤：

```xml
<context:component-scan base-package="org.javatop" use-default-filters="false">
   <context:include-filter type="" expression=""/>
</context:component-scan>
```

替换为：

```java
  @ComponentScan(basePackages = "org.javatop.scan",
                 useDefaultFilters = false,
                 includeFilters = {@ComponentScan.Filter(type= FilterType.ANNOTATION,value={Service.class})})
  /*
  type = FilterType.ANNOTATION          value
                   .ASSIGNABLE_TYPE     value
                   .ASPECTJ             pattern   
                   .REGEX               pattern
                   .CUSTOM              value               */
```

## 4. Spring工厂创建对象的方式分析

### 1. 多种配置方式的应用场景

![image-20200706174301418](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291505590.png)

### 2. 配置优先级

```markdown
@Component及其衍生注解 < @Bean < 配置文件bean标签
优先级高的配置会覆盖优先级低配置 

@Component
public class User{

}

@Bean
public User user(){
  return new User();
}

<bean id="user" class="xxx.User"/>

配置覆盖条件：id值 保持一致
```

### 3. 解决基于注解进行配置的耦合问题

```xml
<!-- applicationContext.xml 配置文件中进行覆盖 -->
<bean id="userDAO" class="org.javatop.injection.UserDAOImplNew"/>
12
@Configuration
//@ImportResource("applicationContext.xml")
public class AppConfig4 {

    @Bean
    public UserDAO userDAO() {
        return new UserDAOImpl();
    }
}

@Configuration
@ImportResource("applicationContext.xml")
public class AppConfig5{
  
}
```



## 5. 整合多个配置信息

为什么会有多个配置信息

```markdown
拆分多个配置bean的开发，是一种模块化开发的形式，也体现了面向对象各司其职的设计思想
```

多配置信息整合的方式

```markdown
- 多个配置Bean的整合
- 配置Bean与@Component相关注解的整合
- 配置Bean与SpringXML配置文件的整合
```

整合多种配置需要关注那些要点

```markdown
- 如何使多配置的信息 汇总成一个整体
- 如何实现跨配置的注入
```

### 5.1 多个配置Bean的整合

#### 1.base-package进行多个配置Bean的整合

![image-20200707170421669](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291505554.png)

通过 @Import(xxx.class)

把AppConfig1当作主配置Bean，在AppConfig1上添加@Import(Appconfig2.class)，完成整合



![image-20200707170745814](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291505739.png)

在工厂创建时，指定多个配置Bean的Class对象 【了解】

```java
ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig1.class,AppConfig2.class);
```

一个问题：如何跨配置进行注入？

```java
@Configuration
@Import(AppConfig2.class)
public class AppConfig1 {

    //把要跨配置注入的对象作为本配置Bean的属性
    @Autowired
    private UserDAO userDAO;

    @Bean
    public UserService userService() {
        UserServiceImpl userService = new UserServiceImpl();
        userService.setUserDAO(userDAO);
        return userService;
    }
}

@Configuration
public class AppConfig2 {

    @Bean
    public UserDAO userDAO() {
        return new UserDAOImpl();
    }
}
```



### 5.2 配置Bean与@Component相关注解的整合

通过 @ComponentScan(basePackages = " ") 注解整合：

```java
@Component(@Repository)
public class UserDAOImpl implements UserDAO{
  
}

@Configuration
@ComponentScan("")
public class AppConfig3 {
   
    @Autowired
    private UserDAO userDAO;

    @Bean
    public UserService userService() {
        UserServiceImpl userService = new UserServiceImpl();
        userService.setUserDAO(userDAO);
        return userService;
    }
}

ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig3.class);
```



### 5.3 配置Bean与配置文件整合

使用 @ImportResource(“applicationContext.xml”) 注解整合：

```java
//1. 遗留系统的整合 2. 配置覆盖
  
public class UserDAOImpl implements UserDAO{
  
}
<bean id="userDAO" class="org.javatop.injection.UserDAOImpl"/>

@Configuration
@ImportResource("applicationContext.xml")
public class AppConfig4 {
  
    @Autowired
    private UserDAO userDAO;

    @Bean
    public UserService userService() {
        UserServiceImpl userService = new UserServiceImpl();
        userService.setUserDAO(userDAO);
        return userService;
    }
}

ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig4.class);
```



## 6. 配置Bean底层实现原理

Spring在配置Bean中加入了@Configuration注解后，底层就会通过Cglib的代理方式，来进行对象相关的配置、处理

![image-20200709114200371](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291505319.png)



在Spring框架中，配置Bean的底层实现原理主要涉及到两个核心概念：Bean定义和Bean工厂。

1. **Bean定义(Bean Definition)：** Bean定义是描述Bean的元数据，它包含了Bean的类名、属性值、构造函数参数、生命周期回调等信息。在Spring中，每一个被管理的Bean都需要有一个对应的Bean定义。

   在配置Bean时，可以使用不同的方式来定义Bean。以下是一些常见的配置方式：

    - XML配置文件：使用`<bean>`标签来定义Bean，可以指定Bean的类名、属性值、构造函数参数等。
    - Java注解：使用注解如`@Component`、`@Service`、`@Repository`、`@Controller`等来标记Bean类，Spring会自动扫描并解析这些注解，将其转化为Bean定义。
    - Java配置类：使用`@Configuration`注解的类来定义Bean，使用`@Bean`注解来标记方法，方法的返回值将作为Bean的实例。

   无论是使用XML配置文件、注解还是Java配置类，最终都会将配置信息解析成Bean定义对象。

2. **Bean工厂(Bean Factory)：** Bean工厂是Spring框架的核心容器，负责管理和创建Bean的实例。它是一个工厂模式的实现，在应用程序启动时，根据Bean定义创建和管理Bean实例。

   在Spring中，使用`ApplicationContext`接口来表示Bean工厂。`ApplicationContext`接口是Bean工厂的一个具体实现。它提供了丰富的方法来获取和管理Bean。

   当应用程序启动时，Spring容器会读取配置文件或扫描注解，解析Bean定义并创建对应的Bean实例。在创建Bean实例时，Bean工厂会根据Bean定义中的信息进行以下操作：

    - 实例化Bean：根据Bean定义中指定的类名，使用Java反射机制创建Bean的实例。
    - 属性注入：根据Bean定义中指定的属性值，将对应的值注入到Bean实例中。
    - 依赖注入：根据Bean定义中指定的依赖关系，将依赖的Bean注入到当前Bean实例中。
    - 生命周期管理：根据Bean定义中指定的生命周期回调方法，调用相应的方法来初始化和销毁Bean实例。

   **Bean工厂通过使用Bean定义和反射机制，实现了Bean的动态创建和管理。**

配置Bean的底层实现原理主要涉及Bean定义和Bean工厂。Bean定义描述了Bean的元数据，包括类名、属性值等信息。Bean工厂负责管理和创建Bean的实例，根据Bean定义动态创建Bean，并进行属性注入、依赖注入和生命周期管理。这种基于Bean定义和工厂模式的实现方式，使得Spring框架具有了灵活性、可扩展性和可维护性。



## 7. 四维一体的开发思想

### 7.1 什么是四维一体

四维一体"是指Spring框架的四个核心维度，它们是：依赖注入（Dependency Injection）、面向切面编程（Aspect-Oriented Programming）、控制反转（Inversion of Control）、和自动化模块化（Component-Based Development）。

1. 依赖注入（Dependency Injection）：依赖注入是Spring框架的核心特性之一。它通过将对象之间的依赖关系的创建和管理交给框架来实现解耦和灵活性。在Spring中，我们将依赖关系声明在配置文件中，或者使用注解来自动注入依赖对象。
2. 面向切面编程（Aspect-Oriented Programming）：面向切面编程是一种通过将横切关注点（例如日志记录、事务管理、安全性等）与核心业务逻辑分离的编程方式。Spring框架通过AOP模块提供了对面向切面编程的支持，使开发人员能够更容易地实现横切关注点的功能。
3. 控制反转（Inversion of Control）：控制反转是指将对象的创建和管理交给框架来处理，而不是由开发人员手动实例化对象。在Spring中，控制反转通过IoC容器来实现，它负责管理和创建应用程序中的对象，并在需要时将这些对象注入到其他对象中。
4. 自动化模块化（Component-Based Development）：自动化模块化是指将应用程序划分为独立的、可重用的组件，每个组件都有明确定义的职责和接口。Spring框架鼓励使用组件化的方式进行开发，通过注解、配置文件等方式将这些组件进行管理和组装。

这四个维度相互关联，共同构成了Spring框架的核心理念和功能。它们帮助开发人员实现代码的松耦合、可维护性和可扩展性，提高开发效率和代码质量。

```markdown
Spring开发一个功能的4种形式，虽然开发方式不同，但是最终效果是一样的。
1. 基于schema
2. 基于特定功能注解
3. 基于原始<bean
4. 基于@Bean注解
```

### 7.2 四维一体的开发案例

1. 依赖注入（Dependency Injection）：

```java
public interface UserService {
    void addUser(User user);
}

@Service
public class UserServiceImpl implements UserService {
    @Override
    public void addUser(User user) {
        // 添加用户逻辑
    }
}

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public String createUser(User user) {
        userService.addUser(user);
        return "redirect:/users";
    }
}
```

在上述代码中，我们定义了一个`UserService`接口和它的实现类`UserServiceImpl`，同时在`UserController`中使用`@Autowired`注解将`UserService`自动注入。

2.面向切面编程（Aspect-Oriented Programming）：

```java
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.example.controller.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Before method: " + joinPoint.getSignature().getName());
    }

    @After("execution(* com.example.controller.*.*(..))")
    public void logAfter(JoinPoint joinPoint) {
        System.out.println("After method: " + joinPoint.getSignature().getName());
    }
}
```

在上述代码中，我们创建了一个切面类`LoggingAspect`，使用`@Before`和`@After`注解定义了在方法执行前后打印日志的逻辑。

3.控制反转（Inversion of Control）：

在Spring的配置文件中，我们可以定义Bean的实例化和配置信息。例如，`application-context.xml`文件：

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="userService" class="com.example.service.UserServiceImpl" />
    <bean id="userController" class="org.javatop.controller.UserController">
        <property name="userService" ref="userService" />
    </bean>
</beans>
```

在上述配置文件中，我们定义了`userService`和`userController`的实例化和依赖关系。

4.自动化模块化（Component-Based Development）：

```java
@Repository
public class UserRepository {
    public void saveUser(User user) {
        // 保存用户到数据库
    }
}
```

在上述代码中，我们定义了一个`UserRepository`类并使用`@Repository`注解将其标记为仓库组件。

```markdown
1. <context:property-placehoder
2. @PropertySource  【推荐】
3. <bean id="" class="PropertySourcePlaceholderConfigure"/>
4. @Bean            【推荐】
```



## 8.纯注解编程

### 1. 纯注解版AOP编程

#### 1. 搭建环境

```markdown
1. 创建配置Bean 
2. 开启注解扫描 @ComponentScan()
```

#### 2. 开发步骤

```java
1. 原始对象
   @Service(@Component)
   public class UserServiceImpl implements UserService{
     
   }
2. 创建切面类 （额外功能 切入点 组装切面）
    @Aspect
    @Component
    public class MyAspect {

        @Around("execution(* login(..))")
        public Object arround(ProceedingJoinPoint joinPoint) throws Throwable {

            System.out.println("----aspect log ------");

            Object ret = joinPoint.proceed();


            return ret;
        }
    }
3. Spring的配置文件中
   <aop:aspectj-autoproxy />   替换为：
   @EnableAspectjAutoProxy ---> 加在配置Bean上 
```

#### 3. 注解AOP细节分析

```markdown
1. 代理创建方式的切换 JDK Cglib 
   <aop:aspectj-autoproxy proxy-target-class=true|false />
   @EnableAspectjAutoProxy(proxyTargetClass)
2. 注意：SpringBoot默认把@EnableAspectjAutoProxy设置好了，以后使用SpringBoot，进行AOP开发时，不需要额外设置。 
    Spring AOP 代理默认实现 JDK  SpringBOOT AOP 代理默认实现 Cglib 
```

### 2. 纯注解版Spring+MyBatis整合

#### 2.1 基础配置 （配置Bean）

```xml
1. 连接池
  <!--连接池-->
  <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
    <property name="url" value="jdbc:mysql://localhost:3306/Leo?useSSL=false"></property>
    <property name="username" value="root"></property>
    <property name="password" value="root"></property>
  </bean>
   
   @Bean
   public DataSource dataSource(){
      DruidDataSource dataSource = new DruidDataSource();
      dataSource.setDriverClassName("");
      dataSource.setUrl();
      ...
      return dataSource;
   }

2. SqlSessionFactoryBean
    <!--创建SqlSessionFactory SqlSessionFactoryBean-->
    <bean id="sqlSessionFactoryBean" class="org.mybatis.spring.SqlSessionFactoryBean">
      <property name="dataSource" ref="dataSource"></property>
      <property name="typeAliasesPackage" value="org.javatop.entity"></property>
      <property name="mapperLocations">
        <list>
          <value>classpath:org.javatop.mapper/*Mapper.xml</value>
        </list>
      </property>
    </bean>

    @Bean
    public SqlSessionFactoryBean sqlSessionFactoryBean(DataSource dataSource){
         SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
         sqlSessionFactoryBean.setDataSource(dataSource);
         sqlSessionFactoryBean.setTypeAliasesPackage("");
         ...
         return sqlSessionFactoryBean;
    }

3. MapperScannerConfigure 
   <!--创建DAO对象 MapperScannerConfigure-->
  <bean id="scanner" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="sqlSessionFactoryBeanName" value="sqlSessionFactoryBean"></property>
    <property name="basePackage" value="org.javatop.dao"></property>
  </bean>
  
  @MapperScan(basePackages={"org.javatop.dao"}) ---> 配置bean完成
```

#### 2.2 编码

```markdown
1. 实体
2. 表
3. DAO接口
4. Mapper文件 
```

#### 2.3 细节分析：

MapperLocations编码时通配的写法

```java
//设置Mapper文件的路径 这种方式只能设置一个文件
sqlSessionFactoryBean.setMapperLocations(Resource..);
Resource resouce = new ClassPathResouce("UserDAOMapper.xml")
  
sqlSessionFactoryBean.setMapperLocations(new ClassPathResource("UserDAOMapper.xml"));
```

xml设置一组Mapper文件：

```xml
  <property name="mapperLocations">
     <list>
       <value>classpath:org.javatop.mapper/*Mapper.xml</value>
     </list>
  </property>
```

java代码设置一组Mapper文件：

  ```java
ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
  Resource[] resources = resolver.getResources("org.javatop.mapper/*Mapper.xml");
  sqlSessionFactoryBean.setMapperLocations(resources)
  ```

#### 2.4 配置Bean数据耦合的问题

提取properties文件：

```properties
mybatis.driverClassName = com.mysql.cj.jdbc.Driver
mybatis.url = jdbc:mysql://localhost:3306/Leo?useSSL=false
mybatis.username = root
mybatis.password = root
mybatis.typeAliasesPackages = org.javatop.mybatis
mybatis.mapperLocations = org.javatop.mapper/*Mapper.xml
```

java代码中获取：

```java
  @Component
  @PropertySource("classpath:mybatis.properties")
  public class MybatisProperties {
      @Value("${mybatis.driverClassName}")
      private String driverClassName;
      @Value("${mybatis.url}")
      private String url;
      @Value("${mybatis.username}")
      private String username;
      @Value("${mybatis.password}")
      private String password;
      @Value("${mybatis.typeAliasesPackages}")
      private String typeAliasesPackages;
      @Value("${mybatis.mapperLocations}")
      private String mapperLocations;
  }
  
  public class MyBatisAutoConfiguration {
  
      @Autowired
      private MybatisProperties mybatisProperties;
  
      @Bean
      public DataSource dataSource() {
          DruidDataSource dataSource = new DruidDataSource();
          dataSource.setDriverClassName(mybatisProperties.getDriverClassName());
          dataSource.setUrl(mybatisProperties.getUrl());
          dataSource.setUsername(mybatisProperties.getUsername());
          dataSource.setPassword(mybatisProperties.getPassword());
          return dataSource;
      }
  
      @Bean
      public SqlSessionFactoryBean sqlSessionFactoryBean(DataSource dataSource) {
          SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
          sqlSessionFactoryBean.setDataSource(dataSource);
          sqlSessionFactoryBean.setTypeAliasesPackage(mybatisProperties.getTypeAliasesPackages());
          //sqlSessionFactoryBean.setMapperLocations(new ClassPathResource("UserDAOMapper.xml"));
  
          try {
              ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
              Resource[] resources = resolver.getResources(mybatisProperties.getMapperLocations());
              sqlSessionFactoryBean.setMapperLocations(resources);
          } catch (IOException e) {
              e.printStackTrace();
          }
  
          return sqlSessionFactoryBean;
      }
  }
```

### 3. 纯注解版事务编程：

```xml
1. 原始对象 XXXService
   <bean id="userService" class="org.javatop.service.UserServiceImpl">
     <property name="userDAO" ref="userDAO"/>
   </bean>

   @Service
   public class UserServiceImpl implements UserService{
         @Autowired
         private UserDAO userDAO;
   }

2. 额外功能
   <!--DataSourceTransactionManager-->
    <bean id="dataSourceTransactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
      <property name="dataSource" ref="dataSource"/>
    </bean>
    
    @Bean
    public DataSourceTransactionManager dataSourceTransactionManager(DataSource dataSource){
          DataSourceTransactionManager dstm = new DataSourceTransactionManager();
          dstm.setDataSource(dataSource);
          return dstm 
    }

3. 事务属性
    @Transactional
    @Service
    public class UserServiceImpl implements UserService {
        @Autowired
        private UserDAO userDAO;

4. 基于Schema的事务配置 
   <tx:annotation-driven transaction-manager="dataSourceTransactionManager"/>
   @EnableTransactionManager ---> 配置Bean
```



## 9.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。



![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)