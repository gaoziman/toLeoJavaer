---
title: SpringIOC编程
icon: circle-info
order: 1
category:
  - Spring
tag:
  - Spring
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202307261030278.png)

## 1. 初始Spring

### 1.1 EJB存在的问题

> **EJB (Enterprise Java Beans)** 是基于分布式事务处理的企业级应用程序的组件。Sun公司发布的文档中对EJB的定义是：EJB是用于开发和部署多层结构的、分布式的、面向对象的Java应用系统的跨平台的构件体系结构。

EJB是一个**重量级**[框架 (opens new window)](https://so.csdn.net/so/search?q=框架&spm=1001.2101.3001.7020)：

- 运行环境苛刻
- 代码移植性差



### 1.2 什么是Spring

- 轻量级体现在哪里？

  1. 对运行环境没有额外要求
  2. 代码移植性高，不需要实现额外接口。

- JavaEE解决方案：

  ![image-20200927003815440](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291500721.png)



- Spring整合的设计模式：

  ```markdown
  1. 工厂模式
  2. 代理模式
  3. 模板模式
  4. 策略模式
  ```



### 1.4 什么是设计模式

```markdown
1.广义概念：
	面向对象设计中，解决特定问题的经典代码。
2.狭义概念：
	GOF4人帮定义的23种设计模式：
		工厂模式、抽象工厂模式、单例模式、建造者模式、原型模式、设配器模式、桥接模式、过滤器模式、组合模式、装饰者模式、外观模式、享元模式、代理模式、责任链模式、命令模式、解释器模式、迭代器模式、中介者模式、备忘录模式、观察者模式、状态模式、空对象模式、策略模式、模板模式、访问者模式
```



### 1.5 工厂设计模式

#### 1.5.1 什么是工厂设计模式

```markdown
1. 概念：创建对象交给工厂，而不是自己new
2. 优势：解耦合
	耦合：指代码间的强关联关系，一方的改变会影响另一方。
	问题：不利于代码的维护。
		User user = new User();
```



#### 1.5.2 简单工厂的设计

```java
package com.leo.basic;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class BeanFactory {

    private static Properties env = new Properties();
    static{
        try {
            //第一步 获得IO输入流
            InputStream inputStream = BeanFactory.class.getResourceAsStream("applicationContext.properties");
            //第二步 文件内容 封装 Properties集合中 key = userService value = com.leo.UserServiceImpl
            env.load(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    /*
	   对象的创建方式：
	       1. 直接调用构造方法 创建对象  UserService userService = new UserServiceImpl();
	       2. 通过反射的形式 创建对象 解耦合
	       Class clazz = Class.forName("com.leo.basic.UserServiceImpl");
	       UserService userService = (UserService)clazz.newInstance();
     */

    public static UserService getUserService(){
        UserService userService = null;
        try {
            //                          com.leo.basic.UserServiceImpl
            Class clazz = Class.forName(env.getProperty("userService"));
            userService = (UserService) clazz.newInstance();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return userService;
    }

    public static UserDao getUserDao(){
        UserDao userDao = null;
        try {
            Class clazz = Class.forName(env.getProperty("userDao"));
            userDao = (UserDao) clazz.newInstance();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return userDao;
    }
}
```



#### 1.5.3 通用的工厂设计

**代码**

```Java
package com.leo.basic;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class BeanFactory {

    private static Properties env = new Properties();
    static{
        try {
            //第一步 获得IO输入流
            InputStream inputStream = BeanFactory.class.getResourceAsStream("applicationContext.properties");
            //第二步 文件内容 封装 Properties集合中 key = userService value = com.leo.UserServiceImpl
            env.load(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    //通用工厂
    public static Object getBean(String key){
        Object res = null;
        try {
            Class clazz = Class.forName(env.getProperty(key));
            res = clazz.newInstance();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return res;
    }
}
```

- 通用工厂的使用方式：

```markdown
1. 定义类型 (类)
2. 通过配置文件的配置告知工厂(applicationContext.properties)
   key = value
3. 通过工厂获得类的对象
   Object ret = BeanFactory.getBean("key")
```

#### 1.5.4 总结

**Spring本质：**工厂 ApplicationContext (applicationContext.xml)



### 1.6 Spring 框架概念

​	Spring 是众多开源java项目中的一员，基于分层的javaEE应用一站式轻量级开源框架，主要核心是 IOC（控制反转/依赖注入）与 AOP（面向切面）两大技术，实现项目在开发过程中的轻松解耦，提高项目的开发效率。

​	在项目中引入 Spring 立即可以带来下面的好处 降低组件之间的耦合度,实现软件各层之间的解耦。可以使用容器提供的众多服务，如：事务管理服务、消息服务等等。当我们使用容器管理事务时，开发人员就不再需要手工控制事务.也不需处理复杂的事务传播。 容器提供单例模式支持，开发人员不再需要自己编写实现代码。 容器提供了AOP技术，利用它很容易实现如权限拦截、运行期监控等功能。

![Spring-01](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202307261157312.png)

### 1.7 Spring 源码架构

​	Spring 总共大约有20个模块，由1300多个不同的文件构成。而这些组件被分别整合在核心容器（Core Container）、Aop（Aspect Oriented Programming）和设备支持（Instrmentation）、数据访问及集成（Data Access/Integeration）、Web、报文发送（Messaging）、测试6个模块集合中。

1. `核心容器`：Spring-beans 和 Spring-core 模块是 Spring 框架的核心模块，包含控制反转（Inversion of Control, IoC）和依赖注入（Dependency Injection, DI）,核心容器提供 Spring 框架的基本功能。核心容器的主要组件是 BeanFactory，工厂模式的实现。BeanFactory 使用控制反转（IOC） 思想将应用程序的配置和依赖性规范与实际的应用程序代码分开。

   Spring 上下文Spring Context：Spring 上下文是一个配置文件，向 Spring 框架提供上下文信息。Spring 上下文包括企业服务，例如 JNDI、EJB、电子邮件、国际化、校验和调度功能。

   Spring-Expression 模块是统一表达式语言（unified EL）的扩展模块，可以查询、管理运行中的对象，同时也方便的可以调用对象方法、操作数组、集合等。它的语法类似于传统EL，但提供了额外的功能，最出色的要数函数调用和简单字符串的模板函数。

2. `Spring-AOP`：Spring-aop是Spring的另一个核心模块, 在Spring中，他是以JVM的动态代理技术为基础，然后设计出了一系列的Aop横切实现，比如前置通知、返回通知、异常通知等。通过其配置管理特性，Spring AOP 模块直接将面向切面的编程功能集成到了 Spring 框架中。所以，可以很容易地使 Spring 框架管理的任何对象支持 AOP。

3. `Spring Data Access(数据访问)`：由Spring-jdbc、Spring-tx、Spring-orm、Spring-jms和Spring-oxm 5个模块组成 Spring-jdbc 模块是 Spring 提供的JDBC抽象框架的主要实现模块，用于简化 Spring JDBC。

   Spring-tx 模块是SpringJDBC事务控制实现模块。使用Spring框架，它对事务做了很好的封装，通过它的Aop配置，可以灵活的配置在任何一层。

   Spring-Orm 模块是ORM框架支持模块，主要集成 hibernate, Java Persistence API (JPA) 和 Java Data Objects (JDO) 用于资源管理、数据访问对象(DAO)的实现和事务策略。

   Spring-Jms 模块（Java Messaging Service）能够发送和接受信息。

   Spring-Oxm 模块主要提供一个抽象层以支撑OXM（OXM 是 Object-to-XML-Mapping 的缩写，它是一个O/M-mapper，将java对象映射成 XML 数据，或者将 XML 数据映射成 java 对象），例如：JAXB, Castor, XMLBeans, JiBX 和 XStream 等。

4. `Web 模块`：由Spring-web、Spring-webmvc、Spring-websocket和Spring-webmvc-portlet 4个模块组成，Web 上下文模块建立在应用程序上下文模块之上，为基于 Web 的应用程序提供了上下文。Web 模块还简化了处理多部分请求以及将请求参数绑定到域对象的工作。

5. `报文发送`：即Spring-messaging模块。

   Spring-messaging是Spring4 新加入的一个模块，主要职责是为Spring 框架集成一些基础的报文传送应用。

6. `单元测试`：即Spring-test模块。Spring-test模块主要为测试提供支持 

   

### 1.8 第一个Spring程序

#### 1.  软件版本

```markdown
1. JDK1.8+
2. Maven3.5+
3. IDEA2018+
4. SpringFramework 5.1.4 
   官方网站 www.spring.io
```



#### 2. 环境搭建



![image-20230726134045986](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202307261340094.png)

- Spring的jar包（在pom.xml中加入依赖）

```xml
<!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-context</artifactId>
  <version>5.1.4.RELEASE</version>
</dependency>
```

- Spring的配置文件

```markdown
1. 配置文件的放置位置：任意位置，没有硬性要求
2. 配置文件的命名：没有硬性要求，但建议：applicationContext.xml

思考：日后应用Spring框架时，需要进行配置文件路径的设置。
```



#### 3.  Spring的核心API

**ApplicationContext**

> 作用：Spring提供的ApplicationContext这个工厂，用于对象的创建
> 好处：解耦合

- 特点：

> ApplicationContext是接口类型，屏蔽了实现的差异。
> 非web环境 ： ClassPathXmlApplicationContext (main junit)
> web环境  ：  XmlWebApplicationContext

![image-20200927121905306](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291500205.png)

- 重量级资源

> ApplicationContext工厂的对象占用大量内存。
> 不会频繁的创建对象 ： 一个应用只会创建一个工厂对象。
> ApplicationContext工厂：一定是线程安全的(多线程并发访问)



#### 4. 程序开发

> 1. 创建类型
> 2. 配置文件的配置 applicationContext.xml
>    <bean id="person" class="com.leo.demo01.pojo.Person"/>
> 3. 通过工厂类，获得对象
>    ApplicationContext
>           |- ClassPathXmlApplicationContext 
>    ApplicationContext ctx = new ClassPathXmlApplicationContext("/applicationContext.xml");
>    Person person = (Person)ctx.getBean("person");



#### 5.  细节分析

- 名词解释

> Spring工厂创建的对象，叫做bean或者组件(component)

- Spring工厂相关的方法

```java
//这种方式获取对象，不需要强制类型转换
Person person = ctx.getBean("person", Person.class);
System.out.println("person = " + person);

//当前Spring的配置文件中 只能有一个<bean class是Person类型
Person person1 = ctx.getBean(Person.class);
System.out.println("person1 = " + person1);

//获取配置文件中所有bean标签的id值  person person1
String[] beanDefinitionNames = ctx.getBeanDefinitionNames();
for (String beanDefinitionName : beanDefinitionNames) {
System.out.println("beanDefinitionName = " + beanDefinitionName);
}

//根据类型获取配置文件中对应bean标签的id值
String[] beanNamesForType = ctx.getBeanNamesForType(Person.class);
for (String id : beanNamesForType) {
System.out.println("id = " + id);
}

//用于判断是否存在指定id值的bean，不能判断name值
System.out.println(ctx.containsBeanDefinition("a"));

//用于判断是否存在指定id值的bean，可以判断name值
System.out.println(ctx.containsBean("person"));
```

- 配置文件中需要注意的细节

  只配置class属性

```xml
<bean  class="com.leo.demo01.pojo.Person"/>
```

- 上述这种配置，没有指定id，Spring会自动生成一个 id，`com.leo.demo01.pojo.Person#0`，可以使用 `getBeanNamesForType()` 等方法验证。
- 应用场景：

如果这个bean只需要使用一次，那么就可以省略id值 如果这个bean会使用多次，或者被其他bean引用则需要设置id值

name属性

- 作用：用于在Spring的配置文件中，为bean对象定义别名(小名)
- name与id的相同点：
  1. `ctx.getBean("id")` 或 `ctx.getBean("name")` 都可以创建对象；
  2. `<bean id="person" class="Person"/>` 与 `<bean name="person" class="Person"/>` 等效；
- `name`与 `id` 的不同点：
  1. 别名可以定义多个,但是 id 属性只能有⼀个值；
  2. XML 的 id 属性的值，命名要求：必须以字⺟开头，可以包含 字⺟、数字、下划线、连字符；不能以特殊字符开头 `/person`；
  3. XML 的 name 属性的值，命名没有要求，`/person` 可以。 但其实 XML 发展到了今天：ID属性的限制已经不存在，`/person`也可以。

#### 6. Spring工厂的底层实现原理(简易版)

![image-20200415113032782](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291500767.png)



## 2. Spring5与日志框架的整合



### 2.1 为什么要整合日志框架？

Spring与日志框架进行整合，日志框架就可以在控制台中，输出Spring框架运行过程中的一些重要的信息。 好处：便于了解Spring框架的运行过程，利于程序的调试

> 默认日志框架 Spring 1.x、2.x、3.x 早期都是基于`commonslogging.jar` Spring 5.x 默认整合的⽇志框架 logback、log4j2

### 2.2 Spring如何整合日志框架？

以Spring5整合`log4j` 为例

1. `pom.xml`文件添加`log4j`依赖：**相当于导入了log4j.jar包**

```xml
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-log4j12</artifactId>
  <version>1.7.25</version>
</dependency>
<dependency>
  <groupId>log4j</groupId>
  <artifactId>log4j</artifactId>
  <version>1.2.17</version>
</dependency>
```

2. 引⼊ `log4.properties` 配置⽂件：

```properties
# resources文件夹根目录下
### 配置根
log4j.rootLogger = debug,console

### 日志输出到控制台显示
log4j.appender.console=org.apache.log4j.ConsoleAppender
log4j.appender.console.Target=System.out
log4j.appender.console.layout=org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
```



## 3. Spring IOC 容器 Bean 对象实例化

思路:

1. 定义Bean 工厂接口，提供获取bean方法

2. 定义Bean工厂接口实现类，解析配置文件，实例化Bean对象

3. 实现获取Bean方法 

### 3.1 定义 Bean 属性对象

```java
package com.leo.demo01.pojo;

/**
 * bean对象
 * 用来接收配置文件中bean标签的id与class属性值
 * @author gaoziman
 */
public class MyBean {

    // bean对象的id属性值
    
    private String id; 
    
    // bean对象的类路径
    
    private String clazz; 

    public MyBean() {
    }

    public MyBean(String id, String clazz) {
        this.id = id;
        this.clazz = clazz;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClazz() {
        return clazz;
    }

    public void setClazz(String clazz) {
        this.clazz = clazz;
    }
}
```

### 3.2 添加 dom4j 坐标依赖

```xml
<!-- dom4j -->
<dependency>
    <groupId>dom4j</groupId>
    <artifactId>dom4j</artifactId>
    <version>1.6.1</version>
</dependency>
<!-- XPath -->
<dependency>
    <groupId>jaxen</groupId>
    <artifactId>jaxen</artifactId>
    <version>1.1.6</version>
</dependency>
```



### 3.3 准备自定义配置文件

```xml
<?xml version="1.0" encoding="utf-8" ?>
<beans>
    <bean id="userService" class="com.leo.service.UserService"></bean>
    <bean id="accountService" class="com.leo.service.AccountService"></bean>
</beans>
```



### 3.4 定义 Bean 工厂接口

```java
package com.leo.spring;

/**
 * Bean 工厂接口定义
 */
public interface MyFactory {
    // 通过id值获取对象
    public Object getBean(String id);
}
```



### 3.5 定义 Bean 接口的实现类

```java
package com.leo.spring;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.XPath;
import org.dom4j.io.SAXReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 模拟Spring的实现
 *  1、通过构造器得到相关配置文件
 *  2、通过dom4j解析xml文件，得到List   存放id和class
 *  3、通过反射实例化得到对象   Class.forName(类的全路径).newInstance(); 通过Map<id,Class>存储
 *  4、得到指定的实例化对象
 */
public class MyClassPathXmlApplicationContext implements BeanFactory {

    private Map beans = new HashMap(); // 实例化后的对象放入map
    private List<MyBean> myBeans; // 存放已读取bean 配置信息

    /* 1、通过构造器得到相关配置文件 */
    public MyClassPathXmlApplicationContext(String fileName) {

        /* 2、通过dom4j解析xml文件，得到List （存放id和class） */
        this.parseXml(fileName);

        /* 3、通过反射实例化得到对象Class.forName(类路径).newInstance();  通过Map存储 */
        this.instanceBean();

    }

    /**
     * 通过dom4j解析xml文件，得到List   存放id和class
     *  1、获取解析器
     *  2、得到配置文件的URL
     *  3、通过解析器解析xml文件（spring.xml）
     *  4、通过xpath语法，获取beans标签下的所有bean标签
     *  5、通过指定语法解析文档对象，返回集合
     *  6、判断集合是否为空，遍历集合
     *  7、获取标签元素中的属性
     *  8、得到Bean对象，将Bean对象设置到集合中
     * @param fileName
     */
    private void parseXml(String fileName) {
        // 1、获取解析器
        SAXReader reader = new SAXReader();
        // 2、得到配置文件的URL
        URL url = this.getClass().getClassLoader().getResource(fileName);
        try {
            // 3、通过解析器解析xml文件（spring.xml）
            Document document = reader.read(url);
            // 4、通过xpath语法，获取beans标签下的所有bean标签
            XPath xPath = document.createXPath("beans/bean");
            // 通过指定语法解析文档对象，返回集合
            List<Element> list = xPath.selectNodes(document);
            // 判断集合是否为空，遍历集合
            if (list != null && list.size() > 0) {
                myBeans = new ArrayList<>();
                for(Element el : list) {
                    // 获取标签元素中的属性
                    String id = el.attributeValue("id"); // id 属性值
                    String clazz = el.attributeValue("class"); // class 属性值
                    System.out.println(el.attributeValue("id"));
                    System.out.println(el.attributeValue("class"));
                    // 得到Bean对象
                    MyBean bean = new MyBean(id, clazz);
                    // 将Bean对象设置到集合中
                    myBeans.add(bean);
                }
            }
        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }

    /**
     * 通过反射实例化得到对象  
     * 	Class.forName(类的全路径).newInstance();  
     *	通过Map<id,Class>存储
     */
    private void instanceBean() {
        // 判断bean集合是否为空，不为空遍历得到对应Bean对象
        if (myBeans != null && myBeans.size() > 0) {
            for (MyBean bean : myBeans){                                      
                try {
                    // 通过类的全路径实例化对象
                    Object object = Class.forName(bean.getClazz()).newInstance();
                    // 将id与实例化对象设置到map对象中
                    beans.put(bean.getId(), object);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * 通过key获取map中的指定value
     * @param id
     * @return
     */
    @Override
    public Object getBean(String id) {
        Object object = beans.get(id);
        return object;
    }
}
```



### 3.6 测试自定义 IOC 容器

1. 创建与配置文件中对应的Bean对象

   UserService.java

   ```java
   package com.leo.service;
    
   public class UserService {
    
       public void test(){
           System.out.println("UserService Test...");
       }
   }
   ```

   AccountService.java

   ```java
   package com.leo.service;
   
   public class AccountService {
   
       public void test(){
           System.out.println("AccountService Test...");
       }
   }
   ```

2. 测试是否可以获取实例化的Bean对象

   ```java
   package com.leo;
   
   import com.leo.spring.MyFactory;
   import com.leo.spring.MyClassPathXmlApplicationContext;
   import com.leo.service.AccountService;
   import com.leo.service.UserService;
   
   public class App {
       
       public static void main(String[] args) {
           MyFactory factory = new MyClassPathXmlApplicationContext("spring.xml");
           // 得到实例化对象
           UserService userService = (UserService) factory.getBean("userService");
           userService.test();
   
           UserService userService2 = (UserService) factory.getBean("userService");
           System.out.println(userService+"=====" + userService2);
   
   
           AccountService accountService = 
           (AccountService)factory.getBean("accountService");
           accountService.test();
   
       }
   }
   ```

   

## 4. Spring IOC 配置文件加载

### 4.1 Spring  配置文件加载

spring.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
    
    <bean id="userService" class="com.xxxx.service.UserService"></bean>
</beans>
```



### 4.2 根据相对路径加载资源

```java
ApplicationContext ac  = new ClassPathXmlApplicationContext("spring.xml");
```



### 4.3 根据绝对路径加载资源

```java
ApplicationContext ac = new FileSystemXmlApplicationContext("E:\code-myself\spring-demo\spring-demo01\src\main\resources\spring.xml");   
```



## 5. 注入



### 5.1 什么是注入

> 通过Spring工厂及配置文件，为所创建对象的成员变量赋值



### 5.2 为什么要注入

- 通过编码的方式，为成员变量进行赋值，存在耦合
- 注入的好处： **解耦合**

```java
public void test03(){
	ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring.xml");
	Person person = (Person) ctx.getBean("person");
	 //通过代码为变量赋值, 存在耦合, 如果以后想修改变量的值, 需要修改代码, 重新编译
	person.setName("Leo");
	person.setAge(16);
	System.out.println("person = " + person);
}
```



### 5.3 如何注入

- 前提：类的成员变量提供**set get方法**
- 配置Spring配置文件

```xml
 <bean name="person" class="com.leo.demo01.pojo.Person" >
        <property name="name" value="Leo" />
        <property name="age" value="20" />
</bean>
```



### 5.4 Spring注入的原理分析

**Spring通过底层调用对象属性对应的set方法，完成成员变量的赋值，这种方式我们也称之为set注入**

![image-20200415191157364](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291500451.png)



## 6. Set注入详解

针对于不同类型的成员变量，需要在`<property>`标签中嵌套其他标签：

```xml
<property>
	xxxxx
</property>】
```

![image-20200416090518713](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291500473.png)

### 6.1 JDK内置类型



#### 1. String+8中基本类型

```xml
 <bean name="person" class="com.leo.demo01.pojo.Person" >
        <property name="name" value="Leo" />
        <property name="age" value="20" />
</bean>
```



#### 2. 数组

```xml
<!-- list标签 -->
<property name="emails">
    <list>
        <value>1234@qq.com</value>
        <value>yangGuo@qq.com</value>
        <value>baiXiaoSheng@qq.com</value>
        <value>Trump@qq.com</value>
    </list>
</property>
```



#### 3. Set集合

```xml
<!-- set标签 -->
<property name="tels">
    <set>
        <value>131********</value>
        <value>159********</value>
        <value>176********</value>
    </set>
</property>
<!-- Set集合中有非基本类型时： -->
<set>
   <ref bean
   <set 
</set>
```



#### 4. List集合

```xml
<!-- list标签 -->
<property name="address">
    <list>
        <value>花果山水帘洞</value>
        <value>铁岭</value>
        <value>东土大唐</value>
    </list>
</property>
<!-- List集合中有非基本类型时： -->
<list>
   <ref bean
   <set 
</list>
```



#### 5. Map集合

```xml
<!-- 需要用到map entry key三个标签 -->
<property name="qqs">
    <map>
        <entry>
            <key><value>周芷若</value></key>
            <value>备胎</value>
        </entry>
        <entry>
            <key><value>赵敏</value></key>
            <value>爱人</value>
        </entry>
    </map>
</property>
<!-- Map集合中有非基本类型时： -->
<entry>
	<key><value>chenyn</value></key>
	<ref bean
</entry>
```



#### 6. Properties

```xml
<!-- props和prop标签 -->
<property name="p">
    <props>
        <prop key="唐僧">白骨精</prop>
        <prop key="Tom">Jerry</prop>
    </props>
</property>
```



#### 7. 复杂的JDK类型（比如Date）

> 需要自定义类型转换器处理

### 6.2 用户自定义类型

#### 1 方式一

- 为成员变量提供get set方法
- 配置文件中赋值（注入）

![image-20200927175058105](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501615.png)



#### 2 方式二

> 方式一存在的问题：
>
> 1. 配置文件代码冗余。
> 2. 被注入的对象(UserDAO),多次创建，浪费（JVM)内存资源。

- 为成员变量提供set get方法
- 配置文件中进行配置

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501706.png)



**注意：** Spring4.x 废除了 `<ref local=""/>` 基本等效 `<ref bean=""/>`；



#### 3. 基于p命名空间的简化

- JDK类型：

  ```java
  <!-- 简化前：-->
  <bean id="person3" class="com.leo.basic.Person">
      <property name="name">
          <value>沙和尚</value>
      </property>
  </bean>
  
  <!-- 简化后：-->
  <bean id="person3" class="com.leo.basic.Person" p:name="沙和尚"/>
  ```

- 用户自定义类型：

  ```xml
  <!-- 简化前：-->
  <bean id="userDao" class="com.leo.basic.UserDaoImpl"/>
  <bean id="userService" class="com.leo.basic.UserServiceImpl">
      <property name="userDao">
          <ref bean="userDao"/>
      </property>
  </bean>
  
  <!-- 简化后：-->
  <bean id="userService1" class="com.leo.basic.UserServiceImpl" p:userDao-ref="userDao"/>
  ```

  

## 7. 构造器注入

> **构造注入**：Spring解析配置文件，调用构造方法，为成员变量赋值。



### 7.1 开发步骤

- 提供带参数构造方法

  ```java
  public class Customer implements Serializable {
      private String name;
      private int age;
  	//带参构造方法：
      public Customer(String name, int age) {
          this.name = name;
          this.age = age;
      }
  }
  ```

- Spring配置文件中赋值(`注入`)

  ```xml
  <bean id="customer" class="com.leo.basic.constructor.Customer">
      <constructor-arg>
          <value>武松</value>
      </constructor-arg>
      <constructor-arg>
          <value>6666</value>
      </constructor-arg>
  </bean>
  ```



### 7.2 构造方法重载



#### 参数个数不同时

```markdown
通过控制<constructor-arg>标签的数量进行区分
```



#### 参数个数相同时

```markdown
通过在标签引入 type属性 进行类型的区分 <constructor-arg type="">
```



### 7.3 注入总结

实战中，应用set注入还是构造注入？

答案：set注入更多，原因如下：

1. 构造注入麻烦 (重载)。
2. Spring框架底层大量应用了 set注入

![image-20200416155620897](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501415.png)





## 8. 控制反转 与 依赖注入



### 8.1 控制反转

> ​	IOC全称 **IOC Inverse of Control**

- 含义：**把对于成员变量赋值的控制权，从代码中反转(转移)到Spring工厂和配置文件中完成。**
- 好处：解耦合
- 底层实现：工厂设计模式

![image-20200416161127972](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501615.png)



### 8.2 依赖注入

> DI 全称 **DI Dependency Injection**

- 含义：**当一个类需要另一个类时，就意味着依赖，这时可以把另一个类作为本类的成员变量，最终通过Spring配置文件进行注入(赋值)。**
- 好处：解耦合。

![image-20200416162615816](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501227.png)

## 9. Spring工厂创建复杂对象



### 9.1 什么是复杂对象

- 含义：指的就是不能直接通过new构造方法创建的对象。

- 举例：Connection

  SqlSessionFactory



### 9.2 Spring工厂创建复杂对象的3种方式

#### 1.  FactoryBean接口

- 开发步骤

  1. 实现FactoryBean接口

     ![img](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501988.png)

  2. Spring配置文件中注册

     ```xml
     <bean id="conn" class="com.heo.factorybean.ConnectionFactoryBean"/>
     ```

注意：

- 如果class类型是FactoryBean接口的实现类，那么通过id值获得的是这个类`getObject()`方法所返回的对象。比如 Connection SqlSessionFactory

- 由于我们此时想获取的是Connection对象，所以需要在pom.xml文件中加入相关的依赖

  ```xml
       <!-- MySql连接 -->
       <dependency>
           <groupId>mysql</groupId>
           <artifactId>mysql-connector-java</artifactId>
           <version>8.0.2</version>
       </dependency>
  ```

- 细节分析

  1. 如果就想获得FactoryBean类型的对象，在id前加上&符号，`ctx.getBean("&conn")`，此时获得的就是ConnectionFactoryBean对象本身。

  2. `isSingleton()`方法，返回 true 只会创建一个复杂对象，返回 false 每一次都会创建新的对象

     问题：根据这个对象的特点 ，决定是返回true (SqlSessionFactory) 还是 false (Connection)。

  3. mysql高版本连接创建时，需要制定SSL证书，解决问题的方式。

     ```markdown
     url = "jdbc:mysql://localhost:3306/suns?useSSL=false"
     ```

1. 体会依赖注入(DI)

   可以把ConnectionFactoryBean中依赖的4个字符串信息 ，在配置文件中进行注入 ，解耦合。

   ```xml
     <bean id="conn" class="com.yuziyan.factorybean.ConnectionFactoryBean">
         <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
         <property name="url" value="jdbc:mysql://localhost:3306/test?useSSL=false"/>
         <property name="username" value="root"/>
         <property name="password" value="root"/>
     </bean>
   ```

- FactoryBean的实现原理[简易版]

  Spring内部运行流程：

  1. 通过`conn`获得ConnectionFactoryBean类的对象。
  2. 进而通过instanceof 判断是否是FactoryBean接口的实现类。
  3. 如果是，Spring按照规定调用`getObject()`方法返回Connection类的对象。体现了接口回调的特点。

  ![image-20200417114723005](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501696.png)

- FactoryBean总结

  Spring中用于创建复杂对象的一种方式，也是Spring原生提供的，后续讲解Spring整合其他框架，大量应用FactoryBean



#### 2.  实例工厂

- 实例工厂的作用：

  1. 避免Spring框架的侵入
  2. 整合遗留系统

- 开发步骤：

  1. 定义实例工厂类：

     ```java
     public class ConnectionFactory {
         public Connection getConnection(){
             //xxxx
             return conn;
         }
     }
     ```

1. Spring配置文件中注册：

   ```xml
     <bean id="connFactory" class="com.yuziyan.factorybean.ConnectionFactory"/>
     
     <bean id="conn" factory-bean="connFactory" factory-method="getConnection"/>
   ```



#### 3. 静态工厂

- 静态工厂的作用（同实例工厂）：

  1. 避免Spring框架的侵入
  2. 整合遗留系统

- 开发步骤：

  1. 定义静态工厂类：

     ```java
     public class StaticConnectionFactory {
         public static Connection getConnection(){
             //xxxx
             return conn;
         }
     }
     ```

1. Spring配置文件中注册：

   ```xml
     <bean id="conn1" class="xxx.StaticConnectionFactory" factory-method="getConnection"/>
   ```



### 9.3 Spring工厂创建对象总结

![image-20200417152030222](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501078.png)



## 10. 控制Spring工厂创建对象的次数



### 1. 为什么要控制对象的创建次数？

- 为了减少不必要的内存浪费。

- 什么样的对象只创建一次？

  ```markdown
  1. SqlSessionFactory
  2. DAO
  3. Service
  ...
  ```

- 什么样的对象 每一次都要创建新的？

  ```markdown
  1. Connection
  2. SqlSession | Session
  3. Struts2 Action
  ...
  ```

### 2. 如何控制简单对象的创建次数

```xml
<bean id="account" scope="singleton|prototype" class="xxxx.Account"/>
```

`singleton`:只会创建一次简单对象 默认值 `prototype`:每一次都会创建新的对象



### 3. 如何控制复杂对象的创建次数

```java
FactoryBean{
   isSingleton(){
      return true;//只会创建一次
      return false;//每一次都会创建新的
   }

}
//如没有isSingleton方法，还是通过scope属性，进行控制。
```



