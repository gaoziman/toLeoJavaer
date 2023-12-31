---
title: SpringJDK动态代理
icon: circle-info
order: 8
category:
  - Spring🍃
tag:
  - Spring🍃
pageview: false
date: 2023-11-05 23:47:15
comment: false
breadcrumb: false
---

# Spring学习笔记—JDK动态代理



- 学习参考 ： 

  - 讲师：**孙帅老师**
  - 课程：[孙哥说Spring5](https://www.bilibili.com/video/BV185411477k?p=188&spm_id_from=pageDriver&vd_source=cea816a08805c218ac4390ae9b61ae31)

## 1.前言

前面文章我们学习了关于Spring的IOC与AOP相关知识点，在此之前，我们主要学习Spring的一些核心概念，**IOC**和**AOP**等等。我们之前学习了简单了解了AOP如何借助动态字节码技术来构建动态代理类。实现动态代理的方式不止一种。本次系列文章主要介绍两种：**JDK动态代理**和**CGlib动态代理**，主要主要介绍JDK动态代理。首先，我们将着重了解JDK动态代理的核心原理和实际应用情境。好了，话不多说，让我们开始吧😎😎😎。



## 2.什么是JDK动态代理

大家都知道，**AOP**底层是动态代理，而Java中的动态代理有两种实现方式：

- 基于 JDK 的动态代理
- 基于 Cglib 的动态代理

这两者最大的区别在于基于 JDK 的动态代理需要被代理的对象有接口，而基于 Cglib 的动态代理并不需要被代理对象有接口。

那么大家不禁要问，Spring 中的 AOP 是怎么实现的？是基于 JDK 的动态代理还是基于 Cglib 的动态代理？那我们就先来里了解一下**JDK动态代理**。

在Spring框架中，JDK动态代理是一种实现代理模式的技术，用于在运行时动态地生成代理对象。它是基于Java的反射机制实现的。

JDK动态代理主要涉及两个核心接口：`InvocationHandler`和`Proxy`。

1. `InvocationHandler`接口： `InvocationHandler`是一个接口，它定义了一个方法`invoke(Object proxy, Method method, Object[] args)`。在使用JDK动态代理时，我们需要实现`InvocationHandler`接口，并在该方法中编写代理逻辑。

   在`invoke`方法中，代理对象的方法调用会被重定向到`invoke`方法中进行处理。我们可以在`invoke`方法中添加额外的逻辑，如在方法调用前后做一些处理、拦截方法调用、修改方法参数等。通过`invoke`方法，我们可以在不修改原始对象的情况下，对其方法进行增强或增加额外的行为。

2. `Proxy`类： `Proxy`类是JDK提供的一个工具类，用于创建代理对象。它提供了一个静态方法`newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h)`，用于创建代理对象。

   `newProxyInstance`方法接受三个参数：

   - `ClassLoader loader`：指定代理对象的类加载器。
   - `Class<?>[] interfaces`：指定代理对象要实现的接口。
   - `InvocationHandler h`：指定实现了`InvocationHandler`接口的对象，用于处理方法调用。

   `newProxyInstance`方法会返回一个实现了指定接口的代理对象，该代理对象会将方法调用转发给指定的`InvocationHandler`对象。

**我们可以通过这张流程图来清楚的了解JDK动态代理的执行流程：**

![image-20231025215100690](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310252151982.png)



## 3.JDK动态代理的优缺点

### 3.1优点

JDK动态代理有以下优点：

1. **简单易用：** 使用JDK动态代理可以快速创建代理对象，无需手动编写代理类，减少了代码的编写量和维护成本。
2. **高效性能：** JDK动态代理是通过Java的反射机制实现的，底层通过字节码生成和动态类加载的方式来创建代理对象。相比于其他代理方式，JDK动态代理的性能较高。
3. **纯Java实现：** JDK动态代理是Java标准库的一部分，不依赖第三方库或框架，能够直接在Java应用中使用。
4. **松耦合：** JDK动态代理可以对接口进行代理，代理对象与目标对象之间通过接口进行交互，实现了目标对象和代理对象的解耦。
5. **面向接口：** JDK动态代理主要面向接口，可以为接口中的所有方法提供代理，对于实现了多个接口的对象，可以为每个接口提供不同的代理逻辑。



### 3.2缺点

JDK动态代理也有一些缺点：

1. **只能代理接口：** JDK动态代理只能代理实现了接口的目标对象，对于没有实现接口的类无法进行代理。这限制了JDK动态代理的使用范围。
2. **无法直接访问目标对象的私有方法：** JDK动态代理只能代理目标对象的公共方法，无法直接访问目标对象的私有方法。如果需要对私有方法进行代理，需要通过其他方式实现。
3. 创建代理对象的性能开销：在创建代理对象时，JDK动态代理需要通过反射和动态类加载来生成代理类，这会带来一定的性能开销。但一旦代理对象创建完成后，后续的方法调用性能与普通方法调用相当。



## 4.JDK动态代理的开发步骤

使用JDK动态代理时，我们需要遵循以下步骤：

1. 创建一个实现了`InvocationHandler`接口的代理处理器类，实现其中的`invoke`方法，编写代理逻辑。
2. 使用`Proxy`类的`newProxyInstance`方法创建代理对象，传入类加载器、接口数组和代理处理器对象。
3. 使用代理对象调用方法时，方法调用会被重定向到代理处理器的`invoke`方法中。在`invoke`方法中，可以进行额外的处理或增强。

JDK动态代理在Spring框架中被广泛应用，例如在AOP（面向切面编程）中，用于实现切面逻辑和方法拦截。通过JDK动态代理，可以实现对目标对象的方法调用进行拦截、增强、事务管理等操作，提供了一种灵活而有弹性的代理方式。

### 4.1ClassLoader

ClassLoader，即类加载器，在Java中起着至关重要的作用。但要深入了解它，首先必须回顾Java程序的标准运行流程。典型情况下，当程序启动时，类加载器首先会读取类对应的字节码文件（.class文件），将其加载到JVM中。随后，JVM会基于这些字节码数据，通过类加载器创建出对应的Class对象，并根据需要进一步实例化为具体对象。

这个流程在遇到动态代理时遭遇了挑战。动态代理，顾名思义，其类是在运行时动态生成的，它并没有预先准备好的.class文件。那么，如何为这样的代理类创建一个Class对象呢？又或者说，ClassLoader在这里扮演什么角色？

实际上，当我们请求JVM创建一个动态代理时，JVM会为我们**临时生成**这个代理类的字节码。这并不是从文件系统中读取的，而是基于我们给定的接口和实现，即时生成的。 在这里，ClassLoader的任务是加载这个**临时生成**的字节码到JVM的内存中。这意味着，尽管代理类的字节码并没有物理存在，但ClassLoader依然可以处理它，就像处理其他常规Java类一样。

但这里有一个细节值得注意：这个用于加载动态代理的ClassLoader并不是新创建的，而是借用了现有的一个类加载器。这点尤为重要，因为在Java项目中，每个类都有它自己对应的类加载器，确保了类的隔离和安全性。在动态代理的场景中，我们实际上是复用了某个现有类的加载器来加载代理类，确保代理类能够顺利地与原始 类在同一个上下文中工作

### 4.2Class<?>[]

在**Proxy.newProxyInstance()**方法中，第二个参数Class<?>[]起着至关重要的作用。它是一个Class对象的数组，代表了一组接口。当我们希望创建一个动态代理对象时，这些接口定义了创建的代理对象将额外功能加在哪些原始类方法上。

为什么是接口而不是具体的类呢？这是因为JDK的动态代理机制建立在接口的基础之上。具体来说，动态代理生成的代理类会实现指定的一组接口，而不是继承某个类。这使得动态代理具有很大的灵活性，因为一个Java类可以实现多个接口，但只能继承一个父类。

通过传递一个Class对象的数组作为参数，我们告诉JVM我们希望代理类实现哪些接口，将额外功能加在哪些原始类方法上。然后，动态生成的代理类将会实现这些接口，并在每个接口方法的实现中，根据我们的需求，调用InvocationHandler来处理方法调用。

简而言之，Class<?>[]参数为**Proxy.newProxyInstance()**方法提供了一个蓝图，说明代理类应如何构建，并且定义了其行为特征

### 4.3InvocationHandler

InvocationHandler是JDK动态代理机制中的一个关键接口，其定义了如何在代理对象上处理方法调用。该接口中，仅包含一个名为invoke的方法。此方法在设计上，旨在调用原始对象的方法，同时为其注入额外的功能。

当代理对象上的一个方法被调用时，invoke方法就会被触发。它提供了我们一个场所，允许我们在原始方法执行前后添加自定义的行为或功能，从而扩展或改变原始方法的行为。
关于invoke方法的三个参数，它们分别为：

Proxy：这是正在调用的方法所属的代理实例。大多数情况下，我们并不直接使用它，因为在InvocationHandler实现内部调用该代理对象会导致无限递归。
Method：这代表了被代理对象的某个具体方法的反射对象它为我们提供了调用原始对象方法的能力，这可以通过method.invoke(targetObject, args)来完成，其中targetObject是原始对象的实例。
Object[]：这是被代理方法的参数数组，表示在代理对象上调用方法时传递的参数。
通过组合上述三个参数，我们可以在invoke方法中灵活地调用原始方法，同时根据需要为其添加额外的逻辑或功能，从而实现对原始方法行为的定制。

在我们深入了解JDK的InvocationHandler接口后，不禁让人回想起Spring AOP中的一个相似结构——MethodInterceptor接口。Spring AOP在动态代理实现中提供了这个接口，它与JDK的动态代理机制的核心思想相似，但是Spring对其进行了封装。

MethodInterceptor接口的设计是简洁而聚焦的。它的中心是一个invoke方法，这个方法的目的与InvocationHandler中的invoke相似： 拦截并增强方法调用。但不同的是，Spring选择了一个集成的方法来传递信息。而不是分开的多个参数，MethodInterceptor的invoke方法接受一个封装了方法调用详情的MethodInvocation对象。这个对象包含了调用的方法、目标对象、参数等所有必要的信息，而且还提供了一个proceed方法，用于执行原始的方法调用。

![image-20231025215429544](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310252154614.png)



## 5.JDK动态代理小结

总的来说，JDK动态代理是一种简单易用、高效性能、纯Java实现的代理技术，适用于面向接口的场景。它具有松耦合的特点，能够将代理对象与目标对象解耦，但同时也存在一些局限性，如只能代理接口、无法直接访问私有方法等。根据具体的使用场景和需求，选择合适的代理方式才能发挥代理的优势。



## 6.参考文献

- https://www.itheima.com/news/20210525/165219.html
- https://blog.csdn.net/luoyoub/article/details/80101376
- https://spring.io/
- https://blog.csdn.net/qq_43266723/article/details/133488696



## 7.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。


![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)