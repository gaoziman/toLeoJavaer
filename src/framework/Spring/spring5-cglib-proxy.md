---
title: SpringCGlib动态代理
icon: circle-info
order: 9
category:
  - Spring🍃
tag:
  - Spring🍃
pageview: false
date: 2023-11-05 23:47:15
comment: false
breadcrumb: false
---


# Spring5学习笔记—CGlib动态代理

- 学习参考 ： 

  - 讲师：**孙帅老师**
  - 课程：[孙哥说Spring5](https://www.bilibili.com/video/BV185411477k?p=188&spm_id_from=pageDriver&vd_source=cea816a08805c218ac4390ae9b61ae31)

## 1.前言

前面文章我们学习了关于Spring的IOC与AOP相关知识点，在此之前，我们主要学习Spring的一些核心概念，**IOC**和**AOP**等等。我们之前学习了简单了解了AOP如何借助动态字节码技术来构建动态代理类。实现动态代理的方式不止一种。本次系列文章主要介绍两种：**JDK动态代理**和**CGlib动态代理**，主要主要介绍CGlib动态代理。好了，话不多说，让我们开始吧😎😎😎。

## 2.JDK动态代理有什么缺陷

在上一章关于JDK动态代理的讨论中，我们确实注意到了其一个明显的限制：**原始类和代理类都必须实现同一个接口，代理类方法添加额外功能并调用原始类方法**。这种方式就像房屋中介：他们为租客提供服务，而租客可能并不知道背后的真正房东。但这种模式确实存在局限性，特别是当我们的系统设计中没有采用接口，或者原始类并没有实现任何接口而是直接写具体方法实现时。

那么，面对这种情况，我们怎么办？我们如何实现动态代理而不受到**必须实现接口**这一限制的约束？为了解决这个问题，Cglib(**Code Generation Library**) 应运而生。Cglib为我们提供了一种不基于接口的代理实现方式，它可以直接代理类。相对于JDK的代理方式，Cglib是基于继承父类(原始类)的，它会动态生成一个子类来覆盖原始类的方法，从而实现代理功能。这样既可以保证二者方法一致，这样既可以保证在代理类中提供新的实现，同时又调用了原始方法

这种方法提供了更大的灵活性，特别是对于那些没有接口的类。在接下来的章节中，我们将深入探讨Cglib，了解它是如何提供这种强大功能的，以及它与JDK动态代理的区别和优缺点



## 3.什么是CGlib动态代理

CGLib**(Code Generation Library)**是一个强大的、高性能的代码生成库，它是基于Java字节码操作的开源框架。CGLib动态代理是CGLib框架提供的一种动态代理技术。与Java标准库中的动态代理（基于接口）不同，CGLib动态代理可以代理普通的类，而不仅限于接口。

使用CGLib动态代理，我们可以在运行时创建一个目标类的子类，并在子类中拦截并增强目标类的方法调用。这种方式不需要目标类实现任何接口，而是通过继承来实现代理。

CGLib动态代理的原理是通过生成目标类的子类来实现代理。在子类中，代理类重写了目标类的方法，并在方法中添加了额外的逻辑，例如前置处理、后置处理等。当我们调用代理对象的方法时，实际上是调用了子类中重写的方法，从而实现了对目标类方法的拦截和增强。

相比于基于接口的动态代理，CGLib动态代理的性能更高，但也因为需要生成子类，所以在代理类的创建过程中会消耗一定的时间和内存。因此，如果目标类已经实现了接口，且性能要求不高，那么使用基于接口的动态代理可能更合适；而如果目标类没有实现接口，或者对性能有较高要求，那么可以选择CGLib动态代理。

**需要注意的是，CGLib动态代理只能代理非final的类，因为无法生成final类的子类。另外，由于CGLib动态代理是直接操作字节码的，所以在一些特殊的环境中可能会受到限制。**



## 4.Spring5整合CGlib动态代理开发步骤

Spring框架提供了丰富的AOP功能，可以帮助我们更好地管理代码。在Spring中，我们可以使用CGlib动态代理来实现AOP功能。下面是一个简单的示例，演示如何使用Spring5整合CGlib动态代理。

1. 原始类的设计：首先，我们要设计并定义一个原始类。特别要注意的是，这里的原始类无需实现任何接口。这为那些基于纯类设计而非接口设计的应用提供了方便。
2. 定义增强功能：就像在JDK动态代理中一样，您需要确定您希望添加到原始类中的额外或增强功能。
3. 生成动态代理对象：使用Cglib的Enhancer对象可以为上一步中定义的原始类生成动态代理对象。为了实现此过程，确保项目中包含了Cglib的必要依赖。幸运的是这些依赖已经包含在spring-context库中，从而简化了集成过程.

### 4.1创建目标对象

首先，我们需要创建一个目标对象，这个目标对象将被代理。在本例中，我们创建一个UserServiceImpl类作为目标对象，它包含一个addUser方法。

```java
public class UserServiceImpl {
    public void addUser(String name) {
        System.out.println("添加用户：" + name);
    }
}
```



### 4.2创建切面类

接下来，我们需要创建一个切面类，这个切面类将在目标对象执行前或执行后执行一些操作。在本例中，我们创建一个LogAspect类作为切面类，它包含一个before方法，在目标对象执行前打印日志。

```java
public class LogAspect {
    public void before() {
        System.out.println("开始执行方法...");
    }
}
```



### 4.3配置Spring AOP

#### 1.配置文件方式

接下来，我们需要配置Spring AOP，以便在运行时生成代理对象。在本例中，我们使用XML配置文件来配置Spring AOP。

```java
<bean id="userService" class="org.javatop.UserService">
    <property name="userServiceImpl" ref="userServiceImpl"/>
</bean>

<bean id="logAspect" class="org.javatop.LogAspect"/>

<aop:config>
    <aop:aspect ref="logAspect">
        <aop:before method="before" pointcut="execution(* org.javatop.UserServiceImpl.addUser(..))"/>
    </aop:aspect>
</aop:config>
```

在上面的配置中，我们首先创建了一个UserService类，并将其注入到UserServiceImpl类中。然后，我们创建了一个LogAspect类，并将其配置为切面类。最后，我们使用aop:before标签来定义一个切入点，指定在执行UserServiceImpl类的addUser方法之前执行LogAspect类的before方法。‘

#### 2.原始方式

```java
public class TestCglibProxy {

    private static final Logger log = LoggerFactory.getLogger(TestCglibProxy.class);

    @Test
    public void test1() {
        // 创建原始对象
        UserService userService = new UserService();

        // 创建Cglib提供的Enhancer对象，用于设置好创建代理对象
        Enhancer enhancer = new Enhancer();

        // 设置类加载器
        enhancer.setClassLoader(TestCglibProxy.class.getClassLoader());

        // 设置被代理类(原始父类)
        enhancer.setSuperclass(UserService.class);

        // 设置方法拦截器
        MethodInterceptor methodInterceptor = new MethodInterceptor() {
            // 等同于InvocationHandler中的invoke方法
            @Override
            public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
                log.debug("log before");

                Object ret = method.invoke(userService, objects);

                log.debug("log after");
                return ret;
            }
        };
        enhancer.setCallback(methodInterceptor);

        // 创建代理对象
        UserService userServiceProxy = (UserService) enhancer.create();
        userServiceProxy.login("Leo", "123456");
    }
}

```



### 4.4测试

最后，我们可以编写一个测试类来测试我们的代码。在本例中，我们创建一个Main类，通过Spring容器获取UserService对象，并调用其addUser方法。

```java
public class Test {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService userService = (UserService) context.getBean("userService");
        userService.addUser("Leo");
    }
}
```

当我们运行Test类时，我们可以看到在执行addUser方法之前打印了一条日志。

## 5.最后总结

JDK动态代理以接口为核心，通过Proxy.newInstance()方法为我们提供了创建代理对象的能力，要求原始类必须实现某个接口。而Cglib动态代理则更为灵活，不受接口的限制。通过Enhancer.create()，它直接生成原始类的子类，并在其中嵌入额外功能，从而实现代理。当然我们也可以通过设置让Spring在创建的时候只使用Cglib而不使用JDK

Spring AOP聪明地整合了这两种机制，为开发者提供了无缝的体验。它默认采用JDK动态代理，但当遇到没有实现接口的原始类时，会智能切换到Cglib动态代理。

本文介绍了如何使用Spring5整合CGlib动态代理实现AOP功能，并给出了具体的案例。通过使用动态代理，我们可以在运行时生成代理对象，从而实现对目标对象的增强。在实际开发中，动态代理是一个非常重要的概念，可以帮助我们更好地管理代码，提高代码的可维护性和可扩展性。



## 6.参考文献

- https://www.itheima.com/news/20210525/165219.html
- https://blog.csdn.net/luoyoub/article/details/80101376
- https://spring.io/
- https://blog.csdn.net/qq_43266723/article/details/133488696



## 7.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。
