---
title:  自动配置(下)
icon: circle-info
order: 7
category:
  - SpringSecurity
tag:
  - SpringSecurity
pageview: false
date: 2023-11-19 23:41:03
comment: false
breadcrumb: false
---


# SpringSecurity6 | 自动配置(下)



![image-20231030235443828](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311162329387.png)

## 1.前言

大家好，我是Leo哥🫣🫣🫣，上一节我们揭开了为什么引入依赖之后就会进行登录鉴权这一神秘面纱，了解复习了关于SpringBoot的自动配置以及如何一步一步的通过自动配置让我们请求加上认证权限。本次我们接着讨论关于自动配置相关问题。好了，话不多说让我们开始吧😎😎😎。



## 2.问题引出

既然我们知道了有关SpringBoot自动装配的一些基本流程。具体的方法调用路径或者叫配置路径是这样的：首先是三个核心的注解：

> @SpringBootApplication-> @EnableAutoConfiguration>@Import(AutoConfigurationImportSelector)

然后通过@Import注解去加载他的所有配置文件到SpringBoot中。这样加载到SpringSecurity的核心文件。最终调用到上边的方法，导致所有的方法都得进行登录认证。

那么这些个注解尤其是**@Import**是如何生效的呢，具体是怎么生效的呢，在什么时候被加载呢，其实上一篇文章我们已经有了一些简单的了解，这节课我们随着Leo哥的视角通过源码方式来深入学习一下。



## 3.再看自动装配

### 3.1 run方法到注解解读器

我们找到我们项目的启动类。

![image-20231117232122451](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311172321510.png)



  然后通过Ctrl + 鼠标左键，点进去run方法。

![image-20231117232424261](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311172324287.png)



我们查看这个里面的构造方法：

![image-20231118123722315](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311181237365.png)	



然后我们找到run()方法

![image-20231118124312944](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311181243052.png)

![image-20231118124041959](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311181240025.png)



可以看到这个prepareContext这个方法。它接受6个参数，分别是`bootstrapContext`，`context`，`environment`，`listeners`，`applicationArguments`和printedBanner，并对这些参数进行处理以准备上下文。

然后我们通过Ctrl + 鼠标左键，点到prepareContext这个里面去查看。

![image-20231118124238053](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311181242143.png)

那么他在这里做了什么准备工作呢，我们来简单分析一下：

它的功能是在Spring应用启动过程中准备并设置应用上下文（ApplicationContext）

1. **设置环境并处理应用上下文**:
   - `context.setEnvironment(environment)`: 将配置环境设置到应用上下文中。
   - `postProcessApplicationContext(context)`: 对应用上下文进行后处理，可能涉及一些自定义配置或修改。
   - `addAotGeneratedInitializerIfNecessary(this.initializers)`: 如果需要，添加Ahead-of-Time (AOT) 生成的初始化器到应用的初始化器列表中。
   - `applyInitializers(context)`: 应用之前添加的所有初始化器到应用上下文。
2. **通知监听器上下文已准备好**:
   - `listeners.contextPrepared(context)`: 通知Spring应用运行监听器，上下文已准备完成。
   - `bootstrapContext.close(context)`: 关闭引导上下文。
3. **启动信息日志**:
   - 如果启用了启动日志（`this.logStartupInfo`），则记录启动信息和配置文件信息。
4. **注册Spring Boot特定的单例Bean**:
   - 向Bean工厂注册`springApplicationArguments`和`springBootBanner`（如果存在的话）。
5. **处理Bean工厂配置**:
   - 设置允许循环引用（`setAllowCircularReferences`）和允许Bean定义覆盖（`setAllowBeanDefinitionOverriding`），根据配置决定。
6. **懒加载和属性源排序处理**:
   - 如果启用了懒加载（`this.lazyInitialization`），则添加相关的BeanFactoryPostProcessor。
   - 添加一个用于属性源排序的BeanFactoryPostProcessor。
7. **加载应用的源**:
   - 如果没有使用AOT生成的工件，那么将从`getAllSources()`获取所有源，并使用`load(context, sources.toArray(new Object[0]))`加载它们。
8. **通知监听器上下文已加载**:
   - `listeners.contextLoaded(context)`: 通知监听器上下文加载完成。

**主要作用：** 识别入口类，读取入口类的所有内容包括注解在内。并注册到注解解读器announationreader中，方便后续注解进行解析。

通过`getAllSources()`获取所有源信息，也就是我们当前的入口类信息，然后把这些source放到一个set集合中，最后去加载load，接下来我们点开load方法继续查看。

![image-20231118125037298](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311181250331.png)

1. 首先，它检查logger是否处于调试模式（debugEnabled）。如果处于调试模式，它会记录一条调试日志，显示正在加载的源（sources）。
2. 然后，它创建一个BeanDefinitionLoader实例。这个实例是用于加载Bean定义的。它使用getBeanDefinitionRegistry(context)方法获取BeanDefinitionRegistry，然后使用createBeanDefinitionLoader()方法创建一个BeanDefinitionLoader实例。
3. 如果beanNameGenerator属性不为null，它将beanNameGenerator设置为loader的属性。
4. 如果resourceLoader属性不为null，它将resourceLoader设置为loader的属性。
5. 如果environment属性不为null，它将environment设置为loader的属性。
6. 最后，调用loader的load()方法来加载Bean定义。

到这里，前面的工作已经基本完成了：读取入口类中重要的信息，包括注解包括入口类本身。将入口类中的注解注册到注解解读器`annotationreader`当中。



### 3.2 加载Bean

 真正解析Bean的工作是从`refreshContext`当中进行的。

![image-20231118125314882](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311181253938.png)

首先通通过prepareContext方法进行准备，然后通过refreshContext进行装载工作，那么他具体是怎么进行转载的呢，下面我们点进去这个方法继续查看。

![image-20231118125430218](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311181254264.png)



这部分代码涉及应用上下文的刷新动作。这里我逐行解释一下：

**注册关闭钩子（shutdown hook）**:

- `if (this.registerShutdownHook)`: 首先检查一个布尔标志`this.registerShutdownHook`，判断是否需要注册一个shutdown hook。这个标志通常是在Spring Boot的配置中设置的，用以确定我们是否希望在JVM关闭时能够自动清理和关闭Spring上下文。
- `shutdownHook.registerApplicationContext(context)`: 如果需要注册shutdown hook，这行代码执行注册操作。具体来说，`shutdownHook`是一个管理器（可能是Spring Boot中的一个组件），负责注册和执行关闭Spring应用上下文的逻辑。当JVM进程结束时，这个shutdown hook将得到执行。

 最后跑到了一个applicationContext的refresh方法当中。

![image-20231118125721796](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311181257877.png)

**刷新应用上下文**:

```java
refresh(context)
```

这是调用ApplicationContext的

```java
refresh()
```

方法，该方法是启动和重新启动Spring上下文的核心方法。它会执行以下关键步骤：

- 准备上下文环境（比如设置必要的属性源、验证必要的环境变量等）。
- 实例化和初始化所有的Bean，包括Spring配置中声明的Bean以及注解声明的Bean。
- 如果有的话，运行BeanFactory后处理器。
- 触发任何实现ApplicationContextAware接口的Bean，让它们能够感知到自己所处的ApplicationContext。
- 最后，发送上下文刷新事件，这将通知所有监听器上下文已经完全初始化和可用。

这个`refreshContext`方法的目的是确保SpringBoot应用中的ApplicationContext处于最新状态，具备服务请求的能力。这通常发生在应用启动时，或者需要重新加载上下文配置的任何时候。



接下来会进行Bean处理的13方法，**其中一个比较关键的方法：** `invokeBeanFactoryPostProcessors`

![image-20231118125934988](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311181259020.png)

我们点过去这个方法

![image-20231118130018787](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311181300826.png)

1. `invokeBeanFactoryPostProcessors` 方法接收一个 `ConfigurableListableBeanFactory` 类型的参数 `beanFactory`。

2. `PostProcessorRegistrationDelegate.invokeBeanFactoryPostProcessors(beanFactory, getBeanFactoryPostProcessors())` 这一行调用了 `PostProcessorRegistrationDelegate` 类的 `invokeBeanFactoryPostProcessors` 方法，传入了两个参数，即当前的 `beanFactory` 和获取的一些BeanFactory后处理器列表（通过 `getBeanFactoryPostProcessors()` 获取）。

3. 接下来的注释提到了检测 `LoadTimeWeaver` 并准备进行织入（weaving）。具体地说，它通过以下条件进行检查：

   - `NativeDetector.inNativeImage()` 确保不在本机镜像环境下。
   - `beanFactory.getTempClassLoader() == null` 确保临时类加载器为空。
   - `beanFactory.containsBean(LOAD_TIME_WEAVER_BEAN_NAME)` 确保BeanFactory中包含名为 `LOAD_TIME_WEAVER_BEAN_NAME` 的bean。

4. 如果以上条件都满足，那么会执行以下两个操作：

   - `beanFactory.addBeanPostProcessor(new LoadTimeWeaverAwareProcessor(beanFactory))` 添加一个 `LoadTimeWeaverAwareProcessor` 的Bean后处理器。
   - `beanFactory.setTempClassLoader(new ContextTypeMatchClassLoader(beanFactory.getBeanClassLoader()))` 设置临时类加载器为 `ContextTypeMatchClassLoader` 类的实例，该实例使用当前的 `beanFactory` 的类加载器。

   **总结：**

   经常`refresh()`的层层调用2进到AbstractApplicationContext类中refresh0方法，该方法主要有13
   个步骤用于对bean对象进行解析加载，其中第5步`invokeBeanFactoryPostProcessors()`进行核心加
   载类上的**@Configurer**、**@Bean**、**@Import**等注解。



## 6.参考文献

- https://springdoc.cn/spring-security/servlet/architecture.html
- http://springboot.fun/



## 7.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。



![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311162329344.png)