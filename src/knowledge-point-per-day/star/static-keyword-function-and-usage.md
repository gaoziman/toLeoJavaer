---
title: Static关键字作用及用法
icon: circle-info
order: 7
category:
  - Knowledge
tag:
  - Knowledge
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---

## 1. 概述

>  `Static`是静态修饰符，什么叫静态修饰符呢？大家都知道，在程序中任何变量或者代码都是在编译时由系统自动分配内存来存储的，而所谓静态就是指在编译后所分配的内存会一直存在，直到程序退出内存才会释放这个空间，也就是只要程序在运行，那么这块内存就会一直存在。这样做有什么意义呢？在Java程序里面，所有的东西都是对象，而对象的抽象就是类，对于一个类而言，如果要使用他的成员，那么普通情况下必须先实例化对象后，通过对象的引用才能够访问这些成员，但是用static修饰的成员可以通过类名加“.”进行直接访问。

<font color="blue">`官方解释`</font>： **静态变量**（*Static Variable*）在[计算机编程](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BC%96%E7%A8%8B)领域指在[程序](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E7%A8%8B%E5%BA%8F)执行前系统就为之[静态分配](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/w/index.php%3Ftitle%3D%E9%9D%99%E6%80%81%E5%88%86%E9%85%8D%26action%3Dedit%26redlink%3D1)（也即在运行时中不再改变分配情况）存储空间的一类[变量](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E5%8F%98%E9%87%8F_(%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1))。与之相对应的是在运行时只暂时存在的[自动变量](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E8%87%AA%E5%8A%A8%E5%8F%98%E9%87%8F)（即局部变量）与以[动态分配](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E5%86%85%E5%AD%98%E5%88%86%E9%85%8D)方式获取存储空间的一些对象，其中自动变量的存储空间在[调用栈](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E8%B0%83%E7%94%A8%E6%A0%88)上分配与释放。（选自维基百科）

如何理解？为什么要这样做？例子？

- 解释：

首先，先了解一下Java的内存分配：

> Java 把内存分为栈内存和堆内存，其中栈内存用来存放一些基本类型的变量、数组和对象的引用，堆内存主要存放一些对象。

<font size= 4 >什么是句柄</font>： 自己理解的话,其实就是类似于对这些静态的成员进行编号。

那为什么要这样做呢？

> 在 JVM 加载一个类的时候，若该类存在 static 修饰的成员变量和成员方法，则会为这些成员变量和成员方法在固定的位置开辟一个固定大小的内存区域，有了这些“固定”的特性，那么 JVM 就可以非常方便地访问他们。同时如果静态的成员变量和成员方法不出作用域的话，它们的句柄都会保持不变。同时 static 所蕴含“静态”的概念表示着它是不可恢复的，即在那个地方，你修改了，他是不会变回原样的，你清理了，他就不会回来了。

可能这些有些偏于理论，下面我们通过一些代码示例来进一步了解`Static`关键字



## 2. 修饰成员属性

当我们需要在一个类（class）中`定义一个属性为公共的属性`，就好比说我们需要这个属性是所有类都是共有的，并且这个属性的值是同一个。

```java
package com.cisyam.testStatic;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/18 11:06
 * @description :
 */
class Book{

    // 设置一个默认的值

    static String pub = "清华大学出版社";

    // 用来和 static 作为对比

    String description = "描述";

    // Book 类正常的属性

    private String title;
    private double price;

    // Book 的构造类

    public Book(String title, double price) {
        this.title = title;
        this.price = price;
    }

    // 获取 Book 的信息

    public void getInfo(){
        System.out.println("图书名称："+ this.title + "，价格为："+ this.price + "，出版社为："+ pub + "，描述 "+ this.description);
    }
}

public class Test {

    public static void main(String[] args) {
        // 实例化三个Book类
        Book book1 = new Book("Android开发实战", 69.8);
        Book book2 = new Book("Java EE开发实战", 49.8);
        Book book3 = new Book("Java 开发教程", 79.8);

        // 在没有设置 pub 属性的情况下输出
        book1.getInfo();
        book2.getInfo();
        book3.getInfo();

        System.out.println("————————————————————无敌分割线————————————————————");

        // 我们给 book1 设置一个 pub 属性
        Book.pub = "中信出版社";
        book1.description = "这本书很牛逼，看了你就知道";

        book1.getInfo();
        book2.getInfo();
        book3.getInfo();
    }
}
```

<font size= 5 ><font color="blue">控制台输出</font></font>

![image-20230818111309548](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308181113774.png)

从控制台输出的结果，可以看到：

- 如果给 属性 赋默认值，在上面的例子中是(description 和 pub)，输出的结果为都是默认的。
- 当我们修改了类中 <font color="DarkOrange">static</font> 关键字声明的属性，那么只要修改了一次，那么其他所有的对象的这个属性都给修改了。
  

### 通过类调用 static 声明的属性

> 但是基于上面的代码，我们发现如果是其中的一个类对象就改变了所有的对象的属性，这样子操作是不是感觉不是特别好？然后在Java中，如果是使用 static 声明的属性值，是可以直接通过类调用的。

```java
public class Test {

    public static void main(String[] args) {
        // 实例化三个Book类
        Book book1 = new Book("Android开发实战", 69.8);
        Book book2 = new Book("Java EE开发实战", 49.8);
        Book book3 = new Book("Java 开发教程", 79.8);

        // 在没有设置 pub 属性的情况下输出
        book1.getInfo();
        book2.getInfo();
        book3.getInfo();

        System.out.println("————————————————————无敌分割线————————————————————");

        // 我们使用 Book 类直接调用pub
        Book.pub = "中信出版社";

        book1.description = "这本书很牛逼，看了你就知道";

        book1.getInfo();
        book2.getInfo();
        book3.getInfo();
    }
}
```



### 没有实例化类时，调用 static 属性

```java
package com.cisyam.testStatic;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/18 11:19
 * @description :
 */
class Book2{

    // 设置一个默认的值
    static String pub = "清华大学出版社";

    // 用来和 static 作为对比
    String description = "描述";

    // Book 类正常的属性
    private String title;
    private double price;

    // Book 的构造类
    public Book2(String title, double price) {
        this.title = title;
        this.price = price;
    }

    // 获取 Book 的信息
    public void getInfo(){
        System.out.println("图书名称："+ this.title + "，价格为："+ this.price + "，出版社为："+ pub + "，描述 "+ this.description);
    }
}

public class Test3 {

    public static void main(String[] args) {
        // 在没有实例化对象时，就调用
        System.out.println(Book.pub);

        // 没事实例化对象的时候，去给static属性赋值上默认值
        Book2.pub = "北京大学出版社";
        System.out.println(Book.pub);

        // 新建一个类，输入 pub 属性
        Book2 book = new Book2("Java", 88);
        book.getInfo();
    }
}
```

<font size= 5 ><font color="blue">控制台输出</font></font>

![image-20230818112054747](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308181120814.png)

<font size= 4 ><span style="color:red">**由此，我们看出，在没有实例化对象的时候，就可以直接通过类去掉用 static属性，并且还可以修改 static 的属性。static 属性声明虽然是在类的结构中，但是并不受到对象的控制，是独立存在的。**</span></font>

### static 属性与非 static 属性的区别

- static 声明的属性和普通属性（非 static 属性）最大的区别在于保存的内存区域不同。static 所修饰的在静态数据区。而不是在堆和栈。

- static 属性与非 static 属性还有一个最大的区别，就是在于所有非 static 属性必须产生实例化之后才可以访问，但是static 属性不受实例化对象的控制。也就是说，在没有产生实例化对象的情况下，依然可以使用 static 对象。

  

## 3. 修饰成员方法

<font color="blue">**说明**</font>

方法本来就是存放在类的定义当中的。static修饰成员方法的作用是可以使用"类名.方法名"的方式操作方法，避免了先要new出对象的繁琐和资源消耗。

```Java
package com.cisyam.testStatic;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/18 11:19
 * @description :
 */
class Test2{
    public static void sayHello(String name) {
        System.out.println("Hello," + name);
    }
}
 
public class Demo {
    public static void main(String[] args) {
        Test2.sayHello("Leo");
    }
}
```

<font size= 5 ><font color="blue">控制台输出</font></font>

![image-20230818112801463](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308181128564.png)





## 4. 修饰代码块

**<font color="blue">说明</font>**

<span style="color:red">**static **</span>{ }就是静态块，当类加载器载入类的时候，这一部分代码被执行，常用于对静态变量进行初始化工作。当其他代码用到这个类，类加载器才会将它载入。

代码只能执行一次，不能再调用。在静态块中，可以访问静态变量，调用静态方法。

如果去掉static，{ }中的代码则会在创建类对象的时候才执行，（相当于把这部分代码复制到各个构造函数中），这样可以实现块中的内容在多个构造函数中的复用。

```java
package com.cisyam.testStatic;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/18 11:29
 * @description :
 */
class Test4{
    static {
        System.out.println("静态代码块执行");
    }

    {
        System.out.println("普通代码块执行");
    }

    public Test4(){
        System.out.println("This is Test()");
    }

    public Test4(String string){
        System.out.println("This is Test(String string)");
    }
}

public class Demo2 {
    public static void main(String[] args) {
        System.out.println("------------------------");
        Test4 test1 = new Test4();
        System.out.println("------------------------");
        Test4 test2 = new Test4("Hello");
    }
}

```

<font size= 5 ><font color="blue">控制台输出</font></font>

![image-20230818113217885](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308181132009.png)



## 5. 修饰内部类

<font size= 4 ><span style="color:red">**static**</span></font> 不能修饰普通类，但可以修饰内部类。原因如下：

<font size= 4 ><span style="color:red">**static**</span></font> 修饰的东西被我们成为类成员，它会随着类的加载而加载，比如：静态代码块，静态成员，静态方法(这里只是加载，并没有调用)等等。若把一个Class文件中的外部类设为<font size= 4 ><span style="color:red">**static**</span></font>，那目的何在呢？难道让这个类随着应用的启动而加载吗？如果我在这次使用过程中根本没有使用过这个类，那么是不是就会浪费内存。这样来说设计不合理，总而言之，设计不合理的地方，Java是不会让它存在的。

为什么内部类可以使用 <font size= 4 ><span style="color:red">**static**</span></font> 修饰呢，因为内部类算是类的成员了，如果我们没有使用静态来修饰，那么我们在创建内部类的时候就需要先有一个外部类的对象，如果我们一直在使用内部类，那么内存中就会一直存在外部类的引用，而我们有时候只需要使用内部类，不需要外部类，那么还是会浪费内存，甚至会造成内存溢出。使用 <font size= 4 ><span style="color:red">**static**</span></font>修饰内部类之后，内部类在创建对象时就不需要有外部类对象的引用了。

```java
package com.cisyam.testStatic;

public class Singleton {
    private static class SingletonHolder {
	    private static final Singleton INSTANCE = new Singleton();
    }
 
    private Singleton (){}
 
    public static final Singleton getInstance() {
	    return SingletonHolder.INSTANCE;
    }
}
 
class Demo3 {

    public static void main(String[] args) {
        Singleton singleton = Singleton.getInstance();
        System.out.println(singleton);
    }

}
 

```



## 6. static加载顺序

首先思考，下边程序是否能编译通过？若可以编译通过，那么执行结果是什么？

```java
package com.cisyam.testStatic;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/18 11:38
 * @description :
 */
public class User {

    private static String name;

    public void setName(String name) {
        this.name = name;
    }

    public static String getName() {
        return User.name;
    }
}

```



```java
public class Test6 {

    public static void main(String[] args) {
        User user = new User();
        user.setName("Leo");
        System.out.println("user = " + User.getName());
    }
}
```



<font size= 5 ><font color="blue">控制台输出</font></font>

![image-20230818114056989](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308181140104.png)

<font size= 6 ><span style="color:red">**从上述结果可见，实例对象可以访问访问类变量。**</span></font>

