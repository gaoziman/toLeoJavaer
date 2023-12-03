---
title: SpringBoot自动配置原理
icon: circle-info
order: 5
category:
  - Knowledge
tag:
  - Knowledge
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---


**首先看下一下自动配置的整个流程图**

![%E8%87%AA%E5%8A%A8%E9%85%8D%E7%BD%AE.jpg](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/template/%E8%87%AA%E5%8A%A8%E9%85%8D%E7%BD%AE.jpg)

自从有了 SpringBoot 之后，咋们就起飞了！各种零配置开箱即用，而我们之所以开发起来能够这么爽，**自动配置**的功劳少不了，今天我们就一起来讨论一下 SpringBoot 自动配置原理。

> Spring Boot的自动配置是通过@EnableAutoConfiguration注解实现的。当该注解被标记在一个类上时，Spring Boot就会根据应用程序中所引入的依赖，自动配置应用程序所需的Bean、服务和其他组件。



## 1. Spring Boot自动配置的概念

> Spring Boot自动配置是指，在Spring Boot中，通过一些规则来自动配置应用程序所需的Bean、服务和其他组件。这种自动配置的方式可以大大减少开发人员的工作量，因为他们不需要手动配置每个组件，而只需要在应用程序中引入所需的模块即可。





## 2. 逐步分析



### 2.1 @SpringBootApplication

一切的来自起源SpringBoot的启动类，我们发现main方法上面有个注解：`@SpringBootApplication`

~~~java
package com.leo.demo02;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

/**
 * @author : Leo
 * @description : 启动类
 * @date 2023/8/10 11:22
 */
@SpringBootApplication
@MapperScan("com.leo.demo02.mapper")
public class Application
{

    public static void main(String[] args)
    {
        ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
    }
}

~~~



`@SpringBootApplication` 标注在某个类上说明这个类是 SpringBoot 的主配置类， SpringBoot 就应该运行这个类的main方法来启动 SpringBoot 应用；它的本质是一个组合注解，我们点进去查看该类的元信息主要包含3个注解：

~~~java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
), @Filter(
    type = FilterType.CUSTOM,
    classes = {AutoConfigurationExcludeFilter.class}
)}
)
public @interface SpringBootApplication {

~~~

- `@SpringBootConfiguration`（里面就是@Configuration，标注当前类为配置类，其实只是做了一层封装改了个名字而已）
- `@EnableAutoConfiguration`（开启自动配置）
- `@ComponentScan`（包扫描）

注：@Inherited是一个标识，用来修饰注解，如果一个类用上了@Inherited修饰的注解，那么其子类也会继承这个注解

我们下面逐一分析这3个注解作用



### 2.2  @SpringBootConfiguration

我们继续点`@SpringBootConfiguration`进去查看源码如下：

~~~java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Configuration
@Indexed
public @interface SpringBootConfiguration {
    @AliasFor(
        annotation = Configuration.class
    )
    boolean proxyBeanMethods() default true;
}

~~~

`@Configuration`标注在某个类上，表示这是一个 springboot的`配置类`。可以向容器中注入组件。



### 2.3 @ComponentScan

- `@ComponentScan`：配置用于 Configuration 类的组件扫描指令。
- 提供与 `Spring XML` 的 `<context:component-scan>` 元素并行的支持。
- 可以 `basePackageClasses` 或`basePackages `来定义要扫描的特定包。 如果没有定义特定的包，将从声明该注解的类的`包开始扫描`。



### 2.4 @EnableAutoConfiguration

- `@ComponentScan`：配置用于 Configuration 类的组件扫描指令。
- 提供与 `Spring XML` 的 `<context:component-scan>` 元素并行的支持。
- 可以 `basePackageClasses` 或`basePackages `来定义要扫描的特定包。 如果没有定义特定的包，将从声明该注解的类的`包开始扫描`。



## 3. 自动配置

 **@EnableAutoConfiguration**

我们点进去看看该注解有什么内容

~~~java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage   //自动导包
@Import({AutoConfigurationImportSelector.class}) //自动配置导入选择
public @interface EnableAutoConfiguration {
    String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";

    Class<?>[] exclude() default {};

    String[] excludeName() default {};
}

~~~



### 3.1 @AutoConfigurationPackage

- 自动导入配置包
- 点进去查看代码：

~~~java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Import({Registrar.class})
public @interface AutoConfigurationPackage {
    String[] basePackages() default {};

    Class<?>[] basePackageClasses() default {};
}

~~~



`@Import` 为spring的注解，导入一个配置文件，在springboot中为给容器导入一个组件，而导入的组件由 AutoConfigurationPackages.class的内部类`Registrar.class` 执行逻辑来决定是如何导入的。

**@Import({Registrar.class})**

点Registrar.class进去查看源码如下：

~~~java
static class Registrar implements ImportBeanDefinitionRegistrar, DeterminableImports {
    Registrar() {
    }

    public void registerBeanDefinitions(AnnotationMetadata metadata, BeanDefinitionRegistry registry) {
        //断点
        AutoConfigurationPackages.register(registry, (String[])(new AutoConfigurationPackages.PackageImports(metadata)).getPackageNames().toArray(new String[0]));
    }

    public Set<Object> determineImports(AnnotationMetadata metadata) {
        return Collections.singleton(new AutoConfigurationPackages.PackageImports(metadata));
    }
}

~~~

注：Registrar实现了`ImportBeanDefinitionRegistrar`类，就可以被注解@Import导入到spring容器里。

这个地方打断点

![image-20230813203640545](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308132036006.png)

运行可以查看到`(String[])(new AutoConfigurationPackages.PackageImports(metadata)).getPackageNames().toArray(new String[0])`的值为`com.leo.Applicaiton`：当前启动类所在的包名

结论： **@AutoConfigurationPackage 就是将主配置类（@SpringBootApplication 标注的类）所在的包下面所有的组件都扫描注册到 spring 容器中。**

### 3.2  @Import({AutoConfigurationImportSelector.class})

作用：AutoConfigurationImportSelector`开启自动配置类的导包的选择器`，即是带入哪些类，有选择性的导入

点AutoConfigurationImportSelector.class进入查看源码，这个类中有两个方法见名知意：

1. selectImports：选择需要导入的组件

   ~~~java
   public String[] selectImports(AnnotationMetadata annotationMetadata) {
       if (!this.isEnabled(annotationMetadata)) {
           return NO_IMPORTS;
       } else {
           AutoConfigurationImportSelector.AutoConfigurationEntry autoConfigurationEntry = this.getAutoConfigurationEntry(annotationMetadata);
           return StringUtils.toStringArray(autoConfigurationEntry.getConfigurations());
       }
   }
   
   ~~~

   

2. getAutoConfigurationEntry：根据导入的@Configuration类的AnnotationMetadata返回AutoConfigurationImportSelector.AutoConfigurationEntry

~~~java
protected AutoConfigurationImportSelector.AutoConfigurationEntry getAutoConfigurationEntry(AnnotationMetadata annotationMetadata) {
    if (!this.isEnabled(annotationMetadata)) {
        return EMPTY_ENTRY;
    } else {
        AnnotationAttributes attributes = this.getAttributes(annotationMetadata);
         // 这打个断点，看看 返回的数据
        List<String> configurations = this.getCandidateConfigurations(annotationMetadata, attributes);
        //删除重复项
        configurations = this.removeDuplicates(configurations);
        Set<String> exclusions = this.getExclusions(annotationMetadata, attributes);
        //检查
        this.checkExcludedClasses(configurations, exclusions);
        //删除需要排除的依赖
        configurations.removeAll(exclusions);
        configurations = this.getConfigurationClassFilter().filter(configurations);
        this.fireAutoConfigurationImportEvents(configurations, exclusions);
        return new AutoConfigurationImportSelector.AutoConfigurationEntry(configurations, exclusions);
    }
}

~~~



> this.getCandidateConfigurations(annotationMetadata, attributes)这里断点查看

![image-20230813204333506](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308132043891.png)

configurations数组长度为127，并且文件后缀名都为 `**AutoConfiguration`

结论： **这些都是候选的配置类，经过去重，去除需要的排除的依赖，最终的组件才是这个环境需要的所有组件。有了自动配置，就不需要我们自己手写配置的值了，配置类有默认值的。**

我们继续往下看看是如何返回需要配置的组件的

#### 1. getCandidateConfigurations(annotationMetadata, attributes)

方法如下：

![image-20230813205426429](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308132054544.png)

~~~java
protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
    List<String> configurations = SpringFactoriesLoader.loadFactoryNames(this.getSpringFactoriesLoaderFactoryClass(), this.getBeanClassLoader());
    Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories. If you are using a custom packaging, make sure that file is correct.");
    return configurations;
}
~~~

这里有句断言： Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories. If you are using a custom packaging, make sure that file is correct.");

意思是：“在 META-INF/spring.factories 中没有找到自动配置类。如果您使用自定义包装，请确保该文件是正确的。“

结论： **即是要loadFactoryNames（）方法要找到自动的配置类返回才不会报错。**



#### 2.  getSpringFactoriesLoaderFactoryClass()

我们点进去发现：this.getSpringFactoriesLoaderFactoryClass()返回的是`EnableAutoConfiguration.class`这个注解。这个注解和@SpringBootApplication下标识注解是同一个注解。

~~~java
protected Class<?> getSpringFactoriesLoaderFactoryClass() {
    return EnableAutoConfiguration.class;
}
protected Class<?> getSpringFactoriesLoaderFactoryClass() {
    return EnableAutoConfiguration.class;
}
~~~

结论：**获取一个能加载自动配置类的类，即SpringBoot默认自动配置类为EnableAutoConfiguration**



#####  loadFactoryNames()

```java
public static List<String> loadFactoryNames(Class<?> factoryType, @Nullable ClassLoader classLoader) {
   ClassLoader classLoaderToUse = classLoader;
   if (classLoaderToUse == null) {
      classLoaderToUse = SpringFactoriesLoader.class.getClassLoader();
   }
   String factoryTypeName = factoryType.getName();
   return loadSpringFactories(classLoaderToUse).getOrDefault(factoryTypeName, Collections.emptyList());
}
```

![image-20230813205719355](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308132057526.png)

先是将 `EnableAutoConfiguration.class` 传给了 `factoryType` 

然后`String factoryTypeName = factoryType.getName();`，所以`factoryTypeName` 值为 ` org.springframework.boot.autoconfigure.EnableAutoConfiguration`



##### loadSpringFactories()

接着查看loadSpringFactories方法的作用

~~~java
private static Map<String, List<String>> loadSpringFactories(ClassLoader classLoader) {
    //断点查看
   Map<String, List<String>> result = cache.get(classLoader);
   if (result != null) {
      return result;
   }

   result = new HashMap<>();
   try {
      //注意这里：META-INF/spring.factories
      Enumeration<URL> urls = classLoader.getResources(FACTORIES_RESOURCE_LOCATION);
      while (urls.hasMoreElements()) {
         URL url = urls.nextElement();
         UrlResource resource = new UrlResource(url);
         Properties properties = PropertiesLoaderUtils.loadProperties(resource);
         for (Map.Entry<?, ?> entry : properties.entrySet()) {
            String factoryTypeName = ((String) entry.getKey()).trim();
            String[] factoryImplementationNames =
                  StringUtils.commaDelimitedListToStringArray((String) entry.getValue());
            for (String factoryImplementationName : factoryImplementationNames) {
            //断点
               result.computeIfAbsent(factoryTypeName, key -> new ArrayList<>())
                     .add(factoryImplementationName.trim());
            }
         }
      }

      // Replace all lists with unmodifiable lists containing unique elements
      //去重，断点查看result值
      result.replaceAll((factoryType, implementations) -> implementations.stream().distinct()
            .collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList)));
      cache.put(classLoader, result);
   }
   catch (IOException ex) {
      throw new IllegalArgumentException("Unable to load factories from location [" +
            FACTORIES_RESOURCE_LOCATION + "]", ex);
   }
   return result;
}
~~~

**这里的 FACTORIES_RESOURCE_LOCATION 在上面有定义：META-INF/spring.factories**

~~~java
public final class SpringFactoriesLoader {

   /**
    * The location to look for factories.
    * <p>Can be present in multiple JAR files.
    */
   public static final String FACTORIES_RESOURCE_LOCATION = "META-INF/spring.factories";
~~~

META-INF/spring.factories文件在哪里？？ 在所有引入的java包的当前类路径下的META-INF/spring.factories文件都会被读取，如：

![image-20230813210249346](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308132102739.png)



> 该方法作用是加载所有依赖的路径META-INF/spring.factories文件，通过map结构保存，key为文件中定义的一些标识工厂类，value就是能自动配置的一些工厂实现的类，value用list保存并去重。

![image-20230813210401399](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308132104637.png)



在回看 `loadSpringFactories(classLoaderToUse).getOrDefault(factoryTypeName, Collections.emptyList());`

因为 `loadFactoryNames` 方法携带过来的第一个参数为 `EnableAutoConfiguration.class`，所以 `factoryType` 值也为 `EnableAutoConfiguration.class`，那么 `factoryTypeName` 值为 `EnableAutoConfiguration`。拿到的值就是META-INF/spring.factories文件下的key为 org.springframework.boot.autoconfigure.EnableAutoConfiguration的值

![image-20230813211838324](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308132118638.png)

`getOrDefault` 当 `Map` 集合中有这个 key 时，就使用这个 key值，如果没有就使用默认值空数组

结论：

- **loadSpringFactories()该方法就是从“META-INF/spring.factories”中加载给定类型的工厂实现的完全限定类名放到map中**
- **loadFactoryNames()是根据SpringBoot的启动生命流程，当需要加载自动配置类时，就会传入org.springframework.boot.autoconfigure.EnableAutoConfiguration参数，从map中查找key为org.springframework.boot.autoconfigure.EnableAutoConfiguration的值，这些值通过反射加到容器中，之后的作用就是用它们来做自动配置，这就是Springboot自动配置开始的地方**
- **只有这些自动配置类进入到容器中以后，接下来这个自动配置类才开始进行启动**
- 当需要其他的配置时如监听相关配置：listenter，就传不同的参数，获取相关的listenter配置。



## 4. 自动配置流程细节梳理

导入`starter-web`：导入了web开发场景

- 1、场景启动器导入了相关场景的所有依赖：`starter-json`、`starter-tomcat`、`springmvc`
- 2、每个场景启动器都引入了一个`spring-boot-starter`，核心场景启动器。
- 3、**核心场景启动器**引入了`spring-boot-autoconfigure`包。
- 4、`spring-boot-autoconfigure`里面囊括了所有场景的所有配置。
- 5、只要这个包下的所有类都能生效，那么相当于SpringBoot官方写好的整合功能就生效了。
- 6、SpringBoot默认却扫描不到 `spring-boot-autoconfigure`下写好的所有**配置类**。（这些**配置类**给我们做了整合操作），**默认只扫描主程序所在的包**。

2、**主程序**：`@SpringBootApplication`

- `@SpringBootApplication`由三个注解组成`@SpringBootConfiguration`、`@EnableAutoConfiguratio`、`@ComponentScan`
- SpringBoot默认只能扫描自己主程序所在的包及其下面的子包，扫描不到 `spring-boot-autoconfigure`包中官方写好的**配置类**
- `**@EnableAutoConfiguration**`：SpringBoot **开启自动配置的核心**。

- - 是由`@Import(AutoConfigurationImportSelector.class)`提供功能：批量给容器中导入组件。
  - SpringBoot启动会默认加载 142个配置类。
  - 这**142个配置类**来自于`spring-boot-autoconfigure`下 `META-INF/spring/**org.springframework.boot.autoconfigure.AutoConfiguration**.imports`文件指定的
  - 项目启动的时候利用 @Import 批量导入组件机制把 `autoconfigure` 包下的142 `xxxxAutoConfiguration`类导入进来（**自动配置类**）
  - 虽然导入了`142`个自动配置类

- 按需生效：

- - 并不是这`142`个自动配置类都能生效
  - 每一个自动配置类，都有条件注解`@ConditionalOnxxx`，只有条件成立，才能生效 

**3、**`**xxxxAutoConfiguration**`**自动配置类**

- **给容器中使用@Bean 放一堆组件。**
- 每个**自动配置类**都可能有这个注解`@EnableConfigurationProperties(**ServerProperties**.class)`，用来把配置文件中配的指定前缀的属性值封装到 `xxxProperties`**属性类**中
- 以Tomcat为例：把服务器的所有配置都是以`server`开头的。配置都封装到了属性类中。
- 给**容器**中放的所有**组件**的一些**核心参数**，都来自于`**xxxProperties**`**。**`**xxxProperties**`**都是和配置文件绑定。**
- **只需要改配置文件的值，核心组件的底层参数都能修改**

**4、**写业务，全程无需关心各种整合（底层这些整合写好了，而且也生效了）

**核心流程总结：**

1、导入`starter`，就会导入`autoconfigure`包。

2、`autoconfigure` 包里面 有一个文件 `META-INF/spring/**org.springframework.boot.autoconfigure.AutoConfiguration**.imports`,里面指定的所有启动要加载的自动配置类

3、@EnableAutoConfiguration 会自动的把上面文件里面写的所有**自动配置类都导入进来。xxxAutoConfiguration 是有条件注解进行按需加载**

4、`xxxAutoConfiguration`给容器中导入一堆组件，组件都是从 `xxxProperties`中提取属性值

5、`xxxProperties`又是和**配置文件**进行了绑定

**效果：**导入`starter`、修改配置文件，就能修改底层行为。



## 5. 常用的Conditional注解

- 在加载自动配置类的时候，并不是将spring.factories的配置全部加载进来，而是通过@Conditional等注解的判断进行动态加载
- @Conditional其实是spring底层注解，意思就是根据不同的条件，来进行自己不同的条件判断，如果满足指定的条件，那么配置类里边的配置才会生效。
- 常用的Conditional注解：
  - @ConditionalOnClass ： classpath中存在该类时起效
  - @ConditionalOnMissingClass ： classpath中不存在该类时起效
  - @ConditionalOnBean ： DI容器中存在该类型Bean时起效
  - @ConditionalOnMissingBean ： DI容器中不存在该类型Bean时起效
  - @ConditionalOnSingleCandidate ： DI容器中该类型Bean只有一个或@Primary的只有一个时起效
  - @ConditionalOnExpression ： SpEL表达式结果为true时
  - @ConditionalOnProperty ： 参数设置或者值一致时起效
  - @ConditionalOnResource ： 指定的文件存在时起效
  - @ConditionalOnJndi ： 指定的JNDI存在时起效
  - @ConditionalOnJava ： 指定的Java版本存在时起效
  - @ConditionalOnWebApplication ： Web应用环境下起效
  - @ConditionalOnNotWebApplication ： 非Web应用环境下起效

![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)