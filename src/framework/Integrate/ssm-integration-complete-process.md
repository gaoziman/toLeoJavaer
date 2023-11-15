---
title: SSM整合完整流程
icon: circle-info
order: 1
category:
  - SSM
tag:
  - SSM
pageview: false
date: 2023-09-09
comment: false
---




## 一、SSM整合说明

> 自从学了SpringBoot之后，已经很久没接触到SSM以及SSM项目相关的内容，这不最近新入职了一家公司，整合使用的是SSM相关技术，有很多知识点跟步骤都有些遗忘了，这里特别重复把他捡起来，特此记录一下，分享出来，大家共勉！

### 1、各个框架担任的角色

- SpringMVC：表述层框架，处理浏览器发送给服务器的请求，将一些数据响应到浏览器。
- MyBatis：持久层框架，连接数据库，访问数据库，操作数据库
- Spring：整合型框架，通过 IOC管理对象，比如MyBatis中操作数据库的SqlSession对象，MyBatis操作数据库时需要事务功能，也可以使用Spring中Aop的重要应用，声明式事务实现。

Spring 和 SpringMVC 本身就是同源的，作为 Spring 家族的一个框架，整合不整合都行，我们所说的不整合是指 Spring 和 SpringMVC 创建同一个 IOC 容器，整合是指 Spring 和 SpringMVC 各自创建自己的 IOC 容器，管理各自的组件。（建议整合）

**既然是两个IOC容器，他们如何关联呢？**

SpringMVC是子容器，Spring是父容器，子容器可以访问父容器的bean，父容器访问不了子容器。（具体在源码中体现，这里不再赘述）

### 2、IOC容器的创建顺序

SpringMVC 管理的是控制层组件，其他的组件交给 Spring 管理，控制层依赖于Service组件，又自动装配是在获取 IOC 容器时完成的，即 **Controller 装配 Service组件就是在获取 SpringMVC 的 IOC 容器时完成的**，那么`Spring创建IOC容器要先与SpringMVC的创建时间 ,才能完成自动装配`。


#### ①SpringMVC中IOC容器的创建时间

> SpringMVC的IOC容器是在 DispatcherServlet 初始化的过程中创建的，又 DispatcherServlet 注册的时候加入了 loadonstartup 标签，DispatcherServlet 初始化就提前到了服务器启动的时候。

#### ②Spring中IOC容器的创建时间

服务器启动时三大组件执行顺序：监听器，过滤器，Servlet

`SpringMVC 的 IOC 容器是在 Servlet 的初始化方法中执行的`，那我们把获取 Spring 的 IOC 容器的代码放在过滤器或者监听器的初始化方法中执行，就可以保证在获取 SpringMVC 的 IOC 容器时， Spring 的 IOC 容器是提前创建好的，完成 Controller 中对 Service 自动装配。

但是，过滤器并不适合，过滤器是用来过滤当前的请求和响应，如果我们在过滤器的初始化方法中写了创建 Spring 的 IOC 容器的代码，那在执行过滤的方法中什么都不写，直接放行的话，那创建过滤器的意义就没有了。

创建过滤器的初始化方法，销毁方法我们完全可以不写，最主要的就是dofilter方法，但是现在我们的过滤器就执行了一个初始化方法，之后执行过滤的时候 dofilter 没有写任何代码，我们不能为了实现一个目的而忽视了组件的最初目的。

**所以创建Spring的IOC容器只能交给监听器了。**

#### ③Spring提供的监听器ContextLoaderListener

监听器常见的分为三种：ServletContextListener，HttpSesionListener，HttpSessionAttributeListener，后两个是监听HttpSession的，只能使用第一种。

ServletContextListener里面有两个抽象方法ServletContext初始化方法，ServletContext销毁方法。

~~~java
public interface ServletContextListener extends EventListener {
    void contextInitialized(ServletContextEvent var1);
 
    void contextDestroyed(ServletContextEvent var1);
}
~~~

Spring提供了监听器ContextLoaderListener，实现ServletContextListener接口，可监听
ServletContext的状态，在web服务器的启动，读取Spring的配置文件，创建Spring的IOC容器。

~~~java
public class ContextLoaderListener extends ContextLoader implements ServletContextListener {
    public ContextLoaderListener() {
    }
 
    public ContextLoaderListener(WebApplicationContext context) {
        super(context);
    }
 
    public void contextInitialized(ServletContextEvent event) {
        this.initWebApplicationContext(event.getServletContext());
    }
 
    public void contextDestroyed(ServletContextEvent event) {
        this.closeWebApplicationContext(event.getServletContext());
        ContextCleanupListener.cleanupAttributes(event.getServletContext());
    }
}
~~~

**web 应用中必须在web.xml中配置**

~~~java
    <!--
        配置Spring的监听器，在服务器启动的时候加载Spring的配置文件
        Spring配置文件默认位置和名称：/WEB-INF/applicationContext.xml
        可通过上下文参数自定义Spring配置文件的位置和名称
    -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
 
    <!--设置spring配置文件自定义的位置和名称-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:spring.xml</param-value>
    </context-param>
~~~



## 二、SSM整合步骤

### 1、准备工作

#### ①导入依赖

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
 
    <groupId>com.trs</groupId>
    <artifactId>SSMIntegration</artifactId>
    <version>1.0-SNAPSHOT</version>
 
    <packaging>war</packaging>
 
    <properties>
        <spring.version>5.3.1</spring.version>
    </properties>
 
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <!--springmvc-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <!--这里主要使用是里面的事务管理器，连接池用的时下面的Druid-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aspects</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <!-- Mybatis核心    -->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.7</version>
        </dependency>
        <!--mybatis和spring的整合包-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>2.0.6</version>
        </dependency>
        <!-- 连接池    -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.0.9</version>
        </dependency>
        <!-- junit测试    -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
        <!-- MySQL驱动    -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.16</version>
        </dependency>
        <!-- log4j日志    -->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
        <!-- ServletAPI -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>
        <!-- 日志    -->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
        </dependency>
        <!--springmvc中处理json的依赖-->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.12.1</version>
        </dependency>
        <!--只是文件上传，文件下载不需要这个依赖-->
        <dependency>
            <groupId>commons-fileupload</groupId>
            <artifactId>commons-fileupload</artifactId>
            <version>1.3.1</version>
        </dependency>
        <!-- Spring5和Thymeleaf整合包  -->
        <dependency>
            <groupId>org.thymeleaf</groupId>
            <artifactId>thymeleaf-spring5</artifactId>
            <version>3.0.12.RELEASE</version>
        </dependency>
        <!-- 分页插件 -->
        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper</artifactId>
            <version>5.2.0</version>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
~~~

#### ②创建表

~~~mysql
CREATE TABLE `t_emp` (
`emp_id` int(11) NOT NULL AUTO_INCREMENT, 
`emp_name` varchar(20) DEFAULT NULL,
`age` int(11) DEFAULT NULL,
`sex` char(1) DEFAULT NULL,
`email` varchar(50) DEFAULT NULL, 
PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
~~~

#### ③包结构

<img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230422202042499.png" alt="image-20230422202042499" style="zoom: 80%;" />

### 2、配置xml

相比单独的SpringMVC，整合时多配置了***\*ContextLoaderListener\****，主要作用是Spring的监听器，在服务器启动的时候加载Spring的配置文件。

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
 
    <!--配置Spring的编码过滤器-->
    <filter>
        <filter-name>CharacterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <!--只设置这个只会处理请求的编码，两个都设置请求响应都会处理-->
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>CharacterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
 
    <!-- 配置处理请求方式PUT和DELETE的过滤器-->
    <filter>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
 
    <!-- 配置SpringMVC的前端控制器 -->
    <servlet>
        <servlet-name>DispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!-- 设置SpringMVC的配置文件的位置和名称 -->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc.xml</param-value>
        </init-param>
        <!-- 将DispatcherServlet的初始化时间提前到服务器启动时-->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>DispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
 
    <!--配置Spring的监听器，在服务器启动的时候加载Spring的配置文件 -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
 
    <!--设置spring配置文件自定义的位置和名称-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:spring.xml</param-value>
    </context-param>
</web-app>
~~~

### 3、创建SpringMVC的配置文件并配置

需要什么组件在里面注册即可。

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--扫描控制层组件-->
    <context:component-scan base-package="com.trs.controller"/>

    <!-- 配置Thymeleaf视图解析器 -->
    <bean id="viewResolver"
          class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
        <property name="order" value="1"/>
        <property name="characterEncoding" value="UTF-8"/>
        <property name="templateEngine">
            <bean class="org.thymeleaf.spring5.SpringTemplateEngine">
                <property name="templateResolver">
                    <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
                        <!-- 视图前缀 -->
                        <property name="prefix" value="/WEB-INF/templates/"/>
                        <!-- 视图后缀 -->
                        <property name="suffix" value=".html"/>
                        <property name="templateMode" value="HTML5"/>
                        <property name="characterEncoding" value="UTF-8" />
                    </bean>
                </property>
            </bean>
        </property>
    </bean>

    <!-- 配置默认的servlet处理静态资源 -->
    <mvc:default-servlet-handler/>

    <!-- 开启MVC的注解驱动  -->
    <mvc:annotation-driven/>

    <!--配置视图控制器-->
    <mvc:view-controller path="/" view-name="index"/>

    <!-- 配置文件上传解析器 -->
    <bean class="org.springframework.web.multipart.commons.CommonsMultipartResolver"/>

    <!-- 配置异常解析器 -->
    <bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver"/>
</beans>
~~~

这里解释一下以下三者的关系，顺便复习一下前面的知识

~~~xml
    <!-- 配置默认的servlet处理静态资源 -->
    <mvc:default-servlet-handler/>
 
    <!-- 开启MVC的注解驱动  -->
    <mvc:annotation-driven/>
 
    <!--配置视图控制器-->
    <mvc:view-controller path="/" view-name="index"/>
~~~

配置 `<mvc:default-servlet-handler/>`  原因：SpringMVC 将接收到的所有请求都看作是一个普通的请求，包括对于静态资源的请求。这样以来，所有对于静态资源的请求都会被看作是一个普通的后台控制器请求，导致请求找不到而报 404 异常错误。

对于这个问题 Spring MVC 在全局配置文件中提供了一个 `<mvc:default-servlet-handler/>` 标签。在 WEB 容器启动的时候会在上下文中定义一个 DefaultServletHttpRequestHandler，它会对DispatcherServlet的请求进行处理，如果该请求已经作了映射，那么会接着交给后台对应的处理程序，如果没有作映射，就交给 WEB 应用服务器默认的 Servlet 处理，从而找到对应的静态资源，只有再找不到资源时才会报错。

只配置 `<mvc:default-servlet-handler/>`  表示浏览器发送的请求都由默认的servlet处理，控制层所写的请求映射就处理不了了。

只配置 <mvc:view-controller path="/" view-name="index"/> ，只有视图控制器所配置的路径才会被解析，控制层以及静态资源所写的请求映射就处理不了了。

配置 `<mvc:annotation-driven/>` ，让控制层所写的请求映射被处理。

### 4、搭建MyBatis环境

#### ①创建属性文件jdbc.properties

~~~properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/ssm?serverTimezone=UTC&characterEncoding=utf-8
jdbc.username=root
jdbc.password=root
~~~

#### ②创建MyBatis的核心配置文件mybatis-config.xml

其余的配置都在Spring配置文件中，这里面的所有内容都可以在Spring配置文件中配置，我配置了一部分

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <settings>
        <!--将表中字段的下划线自动转换为驼峰-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>

</configuration>
~~~

#### ③创建Mapper接口和映射文件

~~~java
public interface EmpMapper {
    List<Emp> getAllEmp();
}
~~~

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.trs.mapper.EmpMapper">
    <select id="getAllEmp" resultType="emp">
        select * from t_emp
    </select>
</mapper>
~~~

#### ④创建日志文件log4j.xml

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
 
<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">
     
      <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
        <param name="Encoding" value="UTF-8" />
        <layout class="org.apache.log4j.PatternLayout">
          <param name="ConversionPattern" value="%-5p %d{MM-dd HH:mm:ss,SSS}%m (%F:%L) \n" />
        </layout>
      </appender>
      <logger name="java.sql">
        <level value="debug" />
      </logger>
      <logger name="org.apache.ibatis">
        <level value="info" />
      </logger>
      <root>
        <level value="debug" />
        <appender-ref ref="STDOUT" />
      </root>
</log4j:configuration>
~~~

#### ⑤创建Spring的配置文件并配置

SpringMVC扫描的是controller包，Spring就要把其他的包扫描了

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

    <!--扫描组件（除控制层）-->
    <context:component-scan base-package="com.trs">
        <!-- 按照注解进行排除，标注了指定注解的组件不要扫描 -->
<!--        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>-->
        <!-- 指定排除某个具体的类，按照类排除  -->
        <context:exclude-filter type="assignable" expression="com.trs.controller.EmpController"/>
    </context:component-scan>

    <!--引入jdbc.properties-->
    <context:property-placeholder location="classpath:jdbc.properties"/>

    <!-- 配置数据源-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <!-- 配置事务管理器 -->
    <bean id="transactionManager"
          class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!--
         开启事务的注解驱动，
         将使用注解 @Transactional 标识的方法或类中所有的方法进行事务关联
    -->
    <tx:annotation-driven transaction-manager="transactionManager"/>

    <!-- 配置SqlSessionFactoryBean，可以直接在Spring的IOC中获取SqlSessionFactory-->
    <bean class="org.mybatis.spring.SqlSessionFactoryBean">
        <!-- 设置MyBatis的核心配置文件的路径 -->
        <property name="configLocation" value="classpath:mybatis-config.xml"/>
        <!-- 设置数据源 -->
        <property name="dataSource" ref="dataSource"/>
        <!-- 设置类型别名，默认为类名 -->
        <property name="typeAliasesPackage" value="com.trs.pojo"/>
        <!-- 设置映射文件所在的包，只有在映射文件的包和mapper接口的包不一致时需要设置 -->
<!--        <property name="mapperLocations" value="classpath:mapper/*.xml"/>-->
        <!--引入分页插件-->
        <property name="plugins">
            <array>
                <bean class="com.github.pagehelper.PageInterceptor"/>
            </array>
        </property>
    </bean>

    <!--
          配置mapper接口的扫描配置，由mybatis-spring提供，可以将指定包下所有的mapper接口创建动态代理，
          并将这些动态代理作为IOC容器的bean管理，可以直接在Spring的IOC中获取Mapper接口了。
    -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.trs.mapper"/>
    </bean>
</beans>
~~~

#### ⑥测试功能

##### 1、创建组件

~~~java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Emp {
    private  Integer empId;
    private String empName;
    private Integer age;
    private Integer sex;
    private String email;
}
~~~

##### 2、创建控制层组件EmpController

~~~java
@Controller
public class EmpController {
 
    @Autowired
    private EmpService empService;
 
    @RequestMapping(value = "/emps",method = RequestMethod.GET)
    public String getAllEmp(Model model){
        List<Emp> emps = empService.getAllEmp();
        model.addAttribute("emps",emps);
        return "emp_list";
    }
}
~~~

##### 3、创建接口EmpService及其实现类

~~~java
public interface EmpService {
    List<Emp> getAllEmp();
}
~~~

~~~java
@Service
@Transactional //事务注解
public class EmpServiceImpl implements EmpService {
 
    @Autowired
    private EmpMapper empMapper;
 
    @Override
    public List<Emp> getAllEmp() {
        List<Emp> emps = empMapper.getAllEmp();
        return emps;
    }
}
~~~

##### 4、创建页面

index.html

~~~html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
</head>
<body>
<h1>首页</h1>
</body>
</html>
~~~

emp_list.html

~~~html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>员工列表</title>
</head>
<body>
<table>
    <tr>
        <th colspan="6">员工列表</th>
    </tr>
    <tr>
        <th>流水号</th>
        <th>员工姓名</th>
        <th>年龄</th>
        <th>姓别</th>
        <th>邮箱</th>
        <th>操作</th>
    </tr>
    <tr th:each="employee : ${emps}">
        <td th:text="${employee.empId}"></td>
        <td th:text="${employee.empName}"></td>
        <td th:text="${employee.age}"></td>
        <td th:text="${employee.sex}"></td>
        <td th:text="${employee.email}"></td>
        <td>
            <a href="">删除</a>
            <a href="">修改</a>
        </td>
    </tr>
</table>
</body>
</html>
~~~

##### 5、访问测试功能

![image-20230422201951528](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230422201951528.png)



## 三、总结

SSM整合核心有以下几点：

1. Spring的IOC容器创建先于SpringMVC的IOC容器
2. SpringMVC扫描的是controller包，Spring要把其他的包扫描了，两个框架管理各自的组件
3. 了解 ContextLoaderListener 监听器的作用，在服务器启动的时候加载Spring的配置文件。Spring配置文件代替原来的 mybatis-config.xml

**其余的配置与单独使用时基本一致。** 


![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)