---
title: 静态代理和动态代理
icon: circle-info
order: 6
category:
  - Knowledge
tag:
  - Knowledge
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---
> 在了解静态代理和动态代理之前，我们需要先了解一下什么是代理模式

## 1. 代理模式

代理模式是一种比较好理解的设计模式。简单来说就是 **我们使用代理对象来代替对真实对象(real object)的访问，这样就可以在不修改原目标对象的前提下，提供额外的功能操作，扩展目标对象的功能。**

**代理模式的主要作用是扩展目标对象的功能，比如说在目标对象的某个方法执行前后你可以增加一些自定义的操作。**

1. `代理模式:` 为一个对象提供一个替身，以控制对这个对象的访问。即通过代理对象访问目标对象.这样做的好处是:可以在目标对象实现的基础上,增强额外的功能操作,即**扩展目标对象的功能**。
2. 被代理的对象可以是远程对象、创建开销大的对象或需要安全控制的对象

举个例子：当我们工作之后需要出去租房子，房东张贴广告带我看房子，最后签合同，但是房东只想坐着签合同并不想到处跑着看房子，于是就找了一个中介专门来宣传广告并且带租户看房子，而房东只负责签合同收钱！中介在这里就可以看作是代理你的`代理对象`，`代理的行为（方法）`是带租户看房子。

![image-20230814112036352](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308141120518.png)

代理模式有静态代理和动态代理两种实现方式，我们 先来看一下静态代理模式的实现。



## 2.静态代理



**静态代理中，我们对目标对象的每个方法的增强都是手动完成的，非常不灵活（比如接口一旦新增加方法，目标对象和代理对象都要进行修改）且麻烦(需要对每个目标类都单独写一个代理类）。**  实际应用场景非常非常少，日常开发几乎看不到使用静态代理的场景。

上面我们是从实现和应用角度来说的静态代理，从 JVM 层面来说， **静态代理在编译时就将接口、实现类、代理类这些都变成了一个个实际的 class 文件。**

静态代理实现步骤:

1. 定义一个接口及其实现类；
2. 创建一个代理类同样实现这个接口
3. 将目标对象注入进代理类，然后在代理类的对应方法调用目标类中的对应方法。这样的话，我们就可以通过代理类屏蔽对目标对象的访问，并且可以在目标方法执行前后做一些自己想做的事情。

下面通过代码来进一步了解静态代理的应用

1. 定义一个卖房的接口

   ~~~java
   public interface UserService {
   
        String sell(String message);
   }
   ~~~



2. 实现卖房接口

   ~~~java
   public class UserServiceImpl implements UserService{
       public String sell(String message) {
           System.out.println("我是房东-->我要卖房,找我签合同");
           return message;
       }
   }
   ~~~



3. 创建代理类实现卖房接口

   ~~~java
   public class UserServiceProxy implements UserService{
   
       private UserService userService;
   
       public UserServiceProxy(UserService userService) {
           this.userService = userService;
       }
   
       @Override
       public String sell(String message) {
           System.out.println("我是中介,我可以带你去看房");
           userService.sell(message);
           //调用方法之后，我们同样可以添加自己的操作
           System.out.println("after method send()");
           return null;
       }
   }
   ~~~



4. 测试

   ~~~java
   @org.junit.Test
       public void name() {
           UserServiceImpl userService = new UserServiceImpl();
           UserServiceProxy userServiceProxy = new UserServiceProxy(userService);
           userServiceProxy.sell("卖房");
       }
   }
   ~~~

   控制台打印 ：

   ![image-20230814114502067](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308141145127.png)



### 静态代理存在的问题

~~~markdown
1. 静态类文件数量过多，不利于项目管理
   UserServiceImpl  UserServiceProxy
   OrderServiceImpl OrderServiceProxy
2. 额外功能维护性差
   代理类中 额外功能修改复杂(麻烦)
~~~



## 3. 动态代理

相比于静态代理来说，动态代理更加灵活。我们不需要针对每个目标类都单独创建一个代理类，并且也不需要我们必须实现接口，我们可以直接代理实现类( `CGLIB 动态代理机制`)。

**从 JVM 角度来说，动态代理是在运行时动态生成类字节码，并加载到 JVM 中的。**

说到动态代理，Spring AOP、RPC 框架应该是两个不得不提的，它们的实现都依赖了动态代理。

**动态代理在我们日常开发中使用的相对较少，但是在框架中的几乎是必用的一门技术。学会了动态代理之后，对于我们理解和学习各种框架的原理也非常有帮助。**

就 Java 来说，动态代理的实现方式有很多种，比如 **JDK 动态代理**、**CGLIB 动态代理**等等。

```text
概念：通过代理类为原始类(目标类)增加额外功能,代理类由Spring动态生成。
好处：利于原始类(目标类)的维护
```

**代理运行对象在程序运行的过程中动态的在内存进行构建，可以灵活的进行业务功能的切换。**



### 3.1 JDK动态代理

> JDK动态代理是基于 Java 的反射机制实现的。使用 JDK中接口和类实现代理对象的动态创建。JDK的动态代理要求目标对象必须实现接口，而代理对象不必实现业务接口，这是 java 设计上的要求。从 jdk1.3 以来，java 语言通过 java.lang.reflect 包提供三个类和接口支持代理模式，它们分别Proxy, Method和 InvocationHandler。

- 目标对象必须实现业务接口

- JDK代理代理对象不需要实现业务接口

- 动态代理的对象在程序运行中不存在

- 动态代理灵活的进行业务功能的切换



#### 1. Proxy类

> ​	通过JDK的 `java.lang.reflect.Proxy` 类实现动态代理，会使用其静态方法 `newProxyInstance()`，依据目标对象、业务接口及调用处理器三者，自动生成一个动态代理对象。

~~~java
public static newProxyInstance ( ClassLoader loader, Class<?>[] interfaces,InvocationHandler handler)
    
loader：目标类的类加载器，通过目标对象的反射可获取
interfaces：目标类实现的接口数组，通过目标对象的反射可获取
handler：调用处理器。
~~~



#### 2. Method类

> `invoke()`方法的第二个参数为 `Method` 类对象，该类有一个方法也叫 invoke()，可以调用目标方法。这两个 invoke()方法，虽然同名，但无关。

~~~java
public Object invoke ( Object obj, Object... args)
    
obj：表示目标对象
args：表示目标方法参数，就是其上一层 invoke 方法的第三个参数
该方法的作用是：调用执行 obj 对象所属类的方法，这个方法由其调用者 Method 对象确定。在代码中，一般的写法为
method.invoke(target, args);
其中，method 为上一层 invoke 方法的第二个参数。这样，即可调用了目标类的目标方法。
~~~



#### 3. IocationHandler接口

~~~java
InvocationHandler 接口叫做调用处理器，负责完成调用目标方法，并增强功能。通过代理对象执行目标接口中的方法 ， 会把方法的调用分派给调用处理器(InvocationHandler)的实现类，执行实现类中的 invoke()方法，我们需要把功能代理写在 invoke（）方法中 。此接口中只有一个方法。
~~~

![img](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308141348381.png)

> 在 `invoke` 方法中可以截取对目标方法的调用。在这里进行功能增强。Java 的动态代理是建立在反射机制之上的。实现了 `InvocationHandler` 接口的类用于加强目标类的主业务逻辑。这个接口中有一个方法 `invoke()`，具体加强的代码逻辑就是定义在该方法中的。通过代理对象执行接口中的方法时，会自动调用 invoke()方法。



####  4. 实现步骤

1. 代理对象不需要实现接口。

2. 代理对象的生成是利用JDK中的proxy类，动态的在内存中构建代理对象。

3. 代码实现接口

4. `ProxyFactory.java` 代理实例生成工厂

   ~~~java
   package com.leo.demo02.service.impl;
   
   import com.leo.demo02.service.UserService;
   
   import java.lang.reflect.InvocationHandler;
   import java.lang.reflect.Method;
   import java.lang.reflect.Proxy;
   
   /**
    * @author : Leo
    * @version 1.0
    * @date 2023/8/14 13:40
    * @description :
    */
   public class ProxyFactory {
   
       /**任何的代理对象，都要清楚目标对象，在此得设置一个目标对象*/
       private UserService userService;
   
       //传入目标对象
   
       public ProxyFactory(UserService userService){
           this.userService = userService;
       }
   
       /** 给目标对象生成代理实例 */
       public Object getProxyInstance(){
           return Proxy.newProxyInstance(
                   //指定当前目标对象，使用类加载器获得
                   userService.getClass().getClassLoader(),
                   //获得目标对象实现的所有接口
                   userService.getClass().getInterfaces(),
                   //处理代理实例上的方法并返回调用结果
                   new InvocationHandler() {
                       @Override
                       public Object invoke(
                               //代理对象的实例
                               Object proxy,
                               //代理的目标对象的实现方法
                               Method method,
                               //代理的目标对象实现方法的参数
                               Object[] args) throws Throwable {
                           System.out.println("我是中介,我在张贴广告......");
                           System.out.println("我是中介,我在带领租客看房子......");
                           //目标对象执行自己的方法
                           Object returnValue = method.invoke(userService, args);
                           System.out.println("我是中介,我在带领租客办理结束流程");
                           return returnValue;
                       }
                   });
       }
   }
   ~~~

   

5. 测试类

   ~~~java
    @org.junit.Test
       public void test03() {
           // 创建代理工厂对象
           ProxyFactory factory = new ProxyFactory(new UserServiceImpl());
           UserService service = (UserService) factory.getProxyInstance();
           service.sell("卖房");
       }
   ~~~

   **控制台打印 ：**

   ![image-20230814135707682](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308141357779.png)

> 注意：JDK动态代理中，代理对象不需要实现接口，但是目标对象一定要实现接口，否则不能用JDK动态代理。



### 3.2 CGlib动态代理

**Code Generation Library** ，又称为子类通过动态的的在内存中构建子类对象，重写父类方法进行代理功能的增强。

> 想要功能扩展，但目标对象没有实现接口，怎样功能扩展？
>
> 解决方案：**子类的方式**
>
> Class subclass extends UserDao{}
>
> 以子类的方式实现(cglib代理)，在内存中构建一个子类对象从而实现对目标对象功能的扩展。



#### 1. CGlib动态代理的特点

1. JDK动态代理有一个限制，就是使用动态代理的目标对象必须实现一个或多个接口。如果想代理没有实现类的接口，就可以使用CGLIB进行代理。
2. CGLIB是一个强大的高性能的代码生成包，它可以在运行期扩展Java类与实现Java接口。它广泛的被许多AOP的框架使用，例如Spring AOP和dynaop，为他们提供方法的interception。
3. CGLIB包的底层是通过使用一个小而快的字节码处理框架ASM，来转换字节码并生成新的类。不鼓励直接使用ASM，因为它要求你必须对JVM内部结构包括class文件的格式和指令集都很熟悉。



#### 2. CGLIB的实现步骤

1. 需要spring-core-5.2.5.jar依赖即可。

2. 引入功能包后，就可以在内存中动态构建子类

3. 被代理的类不能为final， 否则报错。

4. 目标对象的方法如果为final/static, 那么就不会被拦截，即不会执行目标对象额外的业务方法。

5. 编写 **ProxyFactory.java**

   ~~~java
   package com.leo.demo02.service.impl;
   
   import org.springframework.cglib.proxy.Enhancer;
   import org.springframework.cglib.proxy.MethodInterceptor;
   import org.springframework.cglib.proxy.MethodProxy;
   
   import java.lang.reflect.Method;
   
   /**
    * @author : Leo
    * @version 1.0
    * @date 2023/8/14 14:00
    * @description :
    */
   public class ProxyFactory2 implements MethodInterceptor {
       /** 目标对象 */
       private Object target;
   
       /** 传入目标对象 */
       public ProxyFactory2(Object target){
           this.target = target;
       }
       /** Cglib采用底层的字节码技术，在子类中采用方法拦截的技术，拦截父类指定方法的调用，并顺势植入代理功能的代码 */
       @Override
       public Object intercept(Object obj, Method method, Object[] arg2, MethodProxy proxy) throws Throwable {
           //代理对象的功能
           System.out.println("我是中介,我在张贴广告......");
           System.out.println("我是中介,我在带领租客看房子......");
           //调用目标对象的方法
           Object returnValue=method.invoke(target, arg2);
           //代理对象的功能
           System.out.println("我是中介,我在带领租客办理结束流程");
           return returnValue;
       }
       /** 生成代理对象 */
       public Object getProxyInstance(){
           //1.使用工具类
           Enhancer en=new Enhancer();
           //2.设置父类
           en.setSuperclass(target.getClass());
           //3.设置回调函数
           en.setCallback(this);
           //4.创建子类（代理）对象
           return en.create();
       }}
   ~~~

   

6. 测试类

   ~~~java
    @org.junit.Test
       public void test04() {
           UserService service = (UserService)new ProxyFactory2(new UserServiceImpl()).getProxyInstance();
           service.sell("卖房");
   }
   ~~~

   **控制台打印：**

   ![image-20230814141003722](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308141410807.png)



### 3.3  JDK 动态代理和 CGLIB 动态代理对比

**JDK 动态代理只能代理实现了接口的类或者直接代理接口，而 CGLIB 可以代理未实现任何接口的类。** 另外， CGLIB 动态代理是通过生成一个被代理类的子类来拦截被代理类的方法调用，因此不能代理声明为 final 类型的类和方法。

就二者的效率来说，大部分情况都是 JDK 动态代理更优秀，随着 JDK 版本的升级，这个优势更加明显。



## 4. 静态代理和动态代理的对比

**灵活性**：动态代理更加灵活，不需要必须实现接口，可以直接代理实现类，并且可以不需要针对每个目标类都创建一个代理类。另外，静态代理中，接口一旦新增加方法，目标对象和代理对象都要进行修改，这是非常麻烦的！

**JVM 层面**：静态代理在编译时就将接口、实现类、代理类这些都变成了一个个实际的 class 文件。而动态代理是在运行时动态生成类字节码，并加载到 JVM 中的。


![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)