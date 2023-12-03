---
title: 了解Cookie和Session
icon: circle-info
order: 11
category:
  - Knowledge
tag:
  - Knowledge
pageview: false
date: 2023-11-15 21:44:15
comment: false
breadcrumb: false
---

# SpringBoot常见注解


## 1. @SpringBootApplication

![image-20231119150635401](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192311241.png)

定义在main方法入口类处，用于启动sping boot应用项目



## 2. @SpringBootConfiguration

`@SpringBootConfiguration`注解是`@Configuration`注解的派生注解，用于标识一个类是Spring Boot应用的配置类。它通常用于定义配置信息、Bean的定义以及其他与应用配置相关的内容。

1. **派生自`@Configuration`：** `@SpringBootConfiguration`注解是`@Configuration`注解的派生注解。这意味着使用`@SpringBootConfiguration`标注的类将被Spring容器识别为配置类，可以用来定义bean、配置属性等。
2. **用于组织配置类：** 在一个典型的Spring Boot应用中，你可能有多个配置类来组织不同部分的配置。使用`@SpringBootConfiguration`可以更清晰地表示这是一个SpringBoot的配置类。
3. **自动扫描：** Spring Boot应用通常使用`@SpringBootApplication`注解来启动应用程序，并该注解本身包含`@SpringBootConfiguration`。因此，`@SpringBootConfiguration`标注的配置类会被自动扫描并加载到Spring容器中。
4. **与`@Configuration`的区别：** 尽管`@SpringBootConfiguration`与`@Configuration`功能相似，但`@SpringBootConfiguration`通常更适用于Spring Boot应用，而`@Configuration`则是通用的Spring注解。使用`@SpringBootConfiguration`可以更好地表达应用是一个Spring Boot应用。

下面是一个简单的例子，演示了`@SpringBootConfiguration`的使用：

![image-20231119150826025](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192311248.png)

在这个例子中，`MyConfiguration`被标记为`@SpringBootConfiguration`，并定义了一个名为`myBean`的bean。这个配置类将被Spring Boot自动扫描，并将`MyBean`注入到应用上下文中。



## 3. @EnableAutoConfiguration

`@EnableAutoConfiguration`用于启用自动配置机制。在SpringBoot应用中，许多常见的配置任务都可以通过自动配置来完成，而不需要显式地进行手动配置。`@EnableAutoConfiguration`注解就是用来启用这种自动配置的。

让SpringBoot根据类路径中的jar包依赖当前项目进行自动配置

1. **自动配置：** Spring Boot的自动配置通过在类路径上查找特定的条件类来实现。`@EnableAutoConfiguration`注解告诉Spring Boot去自动配置项目的类路径上所需的beans。
2. **条件化配置：** 自动配置是条件化的，它只会在满足特定条件时才会应用。条件类（`@Conditional`注解的类）定义了这些条件。这使得自动配置可以根据项目的实际情况进行动态调整。
3. **元注解：** `@EnableAutoConfiguration`是一个元注解，它本身包含了`@AutoConfigurationPackage`、`@Import(AutoConfigurationImportSelector.class)`等注解，用于导入自动配置的相关信息。
4. **自动配置导入选择器：** `AutoConfigurationImportSelector`是一个重要的类，它根据项目的依赖关系和条件类的情况，确定应该导入哪些自动配置类。这个类实现了`ImportSelector`接口。
5. **禁用默认自动配置：** 如果你想禁用某个特定的自动配置类，你可以使用`exclude`属性，例如：`@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})`，这里禁用了数据源的自动配置。

在src/main/resources的META-INF/spring.factories

![image-20231119150139206](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192311245.png)

**简单例子：**

![image-20231119151158821](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192311268.png)

上面这个例子中，`@EnableAutoConfiguration`启用了SpringBoot的自动配置机制，而`@ComponentScan`用于扫描`com.example`包下的组件。SpringBoot将根据自动配置规则，自动配置项目所需的beans。

3.4 @ComponentScan

`@ComponentScan`告诉Spring在指定的包或类路径下查找并注册标有`@Component`及其派生注解（如`@Service`、`@Repository`、`@Controller`等）的类作为Spring容器的bean。

**基本用法：** `@ComponentScan`通常与`@Configuration`注解一起使用，以便在配置类中指定要扫描的基础包。例如：

![image-20231119151900537](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192311222.png)

在上面的例子中，`@ComponentScan`指定了要扫描的基础包为`com.example`。

**指定多个包：** 你可以通过`basePackages`属性指定多个包，也可以使用`basePackageClasses`属性指定一组类，Spring将扫描这些包或类路径下的组件。

![image-20231119151934606](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192311299.png)

**包含和排除过滤：** 通过`includeFilters`和`excludeFilters`属性，你可以进一步定义包含或排除特定条件的组件。例如，只包含带有`@MyAnnotation`注解的类：

![image-20231119152014735](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192311650.png)

**扫描默认规则：** 如果不指定`basePackages`，`@ComponentScan`将默认扫描被注解类所在的包及其子包。这通常足以满足大多数应用的需求。

![image-20231119152038106](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192311734.png)

**总结@ComponentScan的常用方式如下：**

- 自定扫描路径下边带有@Controller，@Service，@Repository，@Component注解加入spring容器
- 通过includeFilters加入扫描路径下没有以上注解的类加入spring容器
- 通过excludeFilters过滤出不用加入spring容器的类
- 自定义增加了@Component注解的注解方式



## 4. @RequestMapping简化注解

- @GetMapping 等同于 @RequestMapping(method = RequestMethod.GET)
- @PostMapping 等同于 @RequestMapping(method = RequestMethod.POST)
- @PutMapping 等同于 @RequestMapping(method = RequestMethod.PUT)
- @DeleteMapping 等同于 @RequestMapping(method = RequestMethod.DELETE)
- @PatchMapping 等同于 @RequestMapping(method = RequestMethod.PATCH)





## 5. @Profiles

`@Profiles`是Spring框架中用于定义和激活配置文件**(profiles)**的注解。Profiles允许在不同的环境中使用不同的配置，这在开发、测试和生产等不同阶段非常有用。

以下是关于`@Profiles`注解的详细解释：

1.**定义Profiles：** 使用`@Profiles`注解可以将一个bean或者一个配置类限制在特定的环境中。你可以为`@Profiles`注解指定一个或多个环境（profile）的名称。

```java
@Component
@Profile("development")
public class DevelopmentDataSource implements DataSource {
    // Development environment specific configuration
}
```

在上面的例子中，`DevelopmentDataSource` bean 只会在激活了名为"development"的profile时被注册到Spring容器中。

2.**激活Profiles：** 有几种方式可以激活特定的profiles：

在`application.properties`或`application.yml`文件中使用`spring.profiles.active`属性：

```yml
spring.profiles.active=development
```

在启动应用程序时通过命令行参数：

```java
java -jar your-application.jar --spring.profiles.active=development
```

在代码中通过`ConfigurableEnvironment`接口：

```java
ConfigurableEnvironment environment = applicationContext.getEnvironment();
environment.setActiveProfiles("development");
```

3.**默认Profiles：** 你可以使用`default`关键字定义默认的profile。如果没有激活任何profile，那么默认profile中的bean将被注册到容器中。

```java
@Component
@Profile("default")
public class DefaultDataSource implements DataSource {
    // Default configuration
}
```

4.**组合Profiles：** 通过使用逻辑运算符，你可以组合多个profiles。例如，要在同时激活"development"和"test"时注册一个bean：

```java
@Component
@Profile({"development", "test"})
public class CombinedDataSource implements DataSource {
    // Combined configuration
}
```

`@Profiles`注解允许你在不同的环境中使用不同的配置，提高了应用程序的灵活性和可移植性。

## 6.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。



![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)