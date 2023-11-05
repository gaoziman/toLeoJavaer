---
title: Java基础篇 初始面向对象
icon: circle-info
order: 4
category:
  - Java☕
tag:
  - Java☕
pageview: false
date: 2023-11-05 23:10:30
comment: false
breadcrumb: false
---

# 04 Java基础篇 初始面向对象

> 大家好，我是Leo🫣🫣🫣，最近在复习Java基础内容，这个专栏后续也会一直更新下去，Java基础乃是咱们Java的根基，俗话说，基础不牢，地动山摇。今天我们主要简单认识一下面向对象。好了，话不多说让我们开始吧😎😎😎。
>

## 1.学前案例

### 1.1问题提出

我们首先来看一个看案例，想想通过你之前所学的知识如何解决。

> 小明养了两只狗:一只名字叫小白,今年 3 岁,白色。还有一只叫小花,今年10岁,花色。请编写一个程序，当用户输入小狗的名字时，就显示该狗的名字，年龄，颜色。如果用户输入的小狗名错误，则显示 小明没有这只小狗。

通过我们之前学习的技术来看，我们有两种方式来使用Java代码解决这个问题。

- 单独定义变量来解决
- 使用数组解决

**话不多说，直接上代码**

```java
public static void main(String[] args) {
        // 单独使用变量来解决

        // 第一只小狗
         String cat1Name = "小白";
         int cat1Age = 3;
         String cat1Color = "白色";

         // 第二只小狗
         String cat2Name = "小花";
         int cat2Age = 100;
         String cat2Color = "花色";
        
         // 使用数组的方式
        String[] dog1 = {"小白","3","白色"};
        String[] dog2 = {"小花","3","花色"};
    }
```

不知道小伙伴发现问题没有，其实这两者方式虽然都能实现，但确是漏洞百出，接下来我们一点一点分析。

**使用功能单独变量来解决：** 不利于数据的管理(你把一只狗的信息拆解)

**使用数组的方式来解决**

1. 数据类型体现不出来
2. 只能通过**[下标]**获取信息，造成变量名字和内容的对应关系不明确
3. 不能体现猫的行为



### 1.2类与对象的引出

上述我们知道了我们这个程序的不足，于是我们引入了我们这节课的重点内容：**类与对象**。

> Java 设计者引入类与对象(OOP) ，根本原因就是现有的技术，不能完美的解决新的新的需求.

在Java编程语言中，**类**和**对象**是两个核心概念。它们是面向对象编程(**OOP**)的基石。下面是对它们的简要描述：

1. **类 (Class)**：

   - **定义**：类是一个模板或蓝图，`用于描述一组具有相同属性和方法的对象的特性`。
   - **组件**：类主要包括两个部分：**成员变量**(也称为属性、字段或实例变量)和 **方法**(函数)。
   - **实例**：想象你有一个**车**的类。这个类描述了车可能有的所有特性，例如颜色、型号、速度**(成员变量)**等，以及车可能执行的所有动作，例如加速、减速或停车**(方法)**。

   ```java
   public class Car {
       // 成员变量
       private String color;
       private String model;
   
       // 构造方法
       public Car(String color, String model) {
           this.color = color;
           this.model = model;
       }
   
       // 方法
       public void accelerate() {
           System.out.println("Car is accelerating");
       }
   }
   ```

2. **对象 (Object)**：

   - **定义**：对象是类的一个实例。当您基于类创建一个对象时，该对象将包含类中定义的所有属性和方法。
   - **创建**：使用**new**关键字和构造函数来创建类的新实例**(对象)**。
   - **实例**：使用上面的**车**类，你可以创建多个具有不同属性的车对象。

   ```java
   Car toyota = new Car("Red", "Corolla");
   Car honda = new Car("Blue", "Civic");
   
   toyota.accelerate();  // 输出: Car is accelerating
   ```

**总结：类是一个抽象的概念，描述了如何创建对象，而对象则是这个描述的具体实例。在面向对象编程中，我们设计和创建类，然后使用这些类来创建对象，这些对象将在程序中执行实际的任务。**

类和对象之间的关系是：**类是对象的抽象，而对象是类的具体实例。**

在Java中，通过定义类可以创建多个对象。类定义了对象的共同属性和行为，对象则具体化了类的定义，每个对象都有自己的**状态(属性值)**和**行为(方法调用)**。



### 1.3问题的解决

基于上个案例，我们可以通过类和对象的方式来解决。
首先我们需要定义一个Dog类，这个类的对象可以存储每只狗的名字、年龄和颜色。然后、可以创建一个DogsKeeper类来存储并管理所有的Dog对象。

```java
package com.Leo.exer.object01;
import java.util.*;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-10-26 16:09
 * @description : Dog 测试类
 */
class Dog {
    String name;
    int age;
    String color;

    Dog(String name, int age, String color) {
        this.name = name;
        this.age = age;
        this.color = color;
    }
}

class DogsKeeper {
    Map<String, Dog> dogsMap;

    DogsKeeper() {
        dogsMap = new HashMap<>();
    }

    void addDog(Dog dog) {
        dogsMap.put(dog.name, dog);
    }

    String findDog(String name) {
        Dog dog = dogsMap.get(name);
        if (dog == null) {
            return "小明没有这只小狗";
        } else {
            return "名字：" + dog.name + "，年龄：" + dog.age + "，颜色：" + dog.color;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog1 = new Dog("小白", 3, "白色");
        Dog dog2 = new Dog("小花", 100, "花色");

        DogsKeeper keeper = new DogsKeeper();
        keeper.addDog(dog1);
        keeper.addDog(dog2);

        // 假设用户输入的是"小白"
        System.out.println(keeper.findDog("小白"));

        // 假设用户输入的是"小花"
        System.out.println(keeper.findDog("小花"));

        // 假设用户输入的是"小黄"
        System.out.println(keeper.findDog("小黄"));
    }
}
```



## 2.对象详解

面向对象简称 OO（Object Oriented），20 世纪 80 年代以后，有了面向对象分析（OOA）、 面向对象设计（OOD）、面向对象程序设计（OOP）等新的系统开发方式模型的研究。

对 **Java** 语言来说，一切皆是对象。把现实世界中的对象抽象地体现在编程世界中，一个对象代表了某个具体的操作。一个个对象最终组成了完整的程序设计，这些对象可以是独立存在的，也可以是从别的对象继承过来的。对象之间通过相互作用传递信息，实现程序开发。

### 2.1什么是对象

Java 是面向对象的编程语言，对象就是面向对象程序设计的核心。所谓对象就是真实世界中的实体，对象与实体是一一对应的，也就是说现实世界中每一个实体都是一个对象，它是一种具体的概念。对象有以下特点：

- 对象具有属性和行为。
- 对象具有变化的状态。
- 对象具有唯一性。
- 对象都是某个类别的实例。
-  一切皆为对象，真实世界中的所有事物都可以视为对象。


例如，在真实世界的学校里，会有学生和老师等实体，学生有学号、姓名、所在班级等属性（数据），学生还有学习、提问、吃饭和走路等操作。学生只是抽象的描述，这个抽象的描述称为“类”。在学校里活动的是学生个体，即张同学、李同学等，这些具体的个体称为**对象**，对象也称为**实例**。



### 2.2类与对象的关系示意图

我们可以通过下面这张图清晰的理解我们使用类和对象的方式来如何解决我们刚刚上面的案例。

![image-20231026170204702](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310261702979.png)

**注意事项：**

1. 从Dog类到对象，目前有几种说法：
   1. 创建了一个对象
   2. 实例化了一个对象
   3. 把类实例化为Dog类
2. 上面这个Dog也不局限于Dog，可以是我们现实生活中的任意存在的。也可以是猫，人，鱼等等... 。Java最大的特点就是面向对象，



### 2.3类与对象的区别和联系

在Java中，虽然类**(Class)**和对象**(Object)**是两个概念，但是他们两个之间的关系既密切又有区别。

**区别：**

1. 定义：类是抽象的概念，用于描述对象的属性和行为，是对象的模板或蓝图；对象是类的实例化结果，是具体的数据实体。
2. 内存占用：类本身不占用内存空间，而对象在内存中占用一定的空间。
3. 创建方式：类是通过关键字"class"定义的，可以多次实例化创建多个对象；对象是通过使用**new**关键字创建的。

**联系：**

1. 关联性：类和对象之间存在关联关系。类定义了对象的共同属性和行为，而对象具体化了类的定义，每个对象都有自己的状态和行为。
2. 类的实例化：对象是类的实例化结果，通过创建类的实例（对象），可以使用对象的方法来操作对象的状态和执行特定的功能。
3. 继承关系：类可以通过继承关系形成类的层次结构，子类继承了父类的属性和方法，并可以添加自己的特定属性和方法。通过继承，可以创建多个不同的对象。

类和对象在Java中的关系可以用以下示例说明：

```java
// 定义Person类
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void speak() {
        System.out.println("My name is " + name + " and I am " + age + " years old.");
    }
}

// 创建Person对象并调用方法
public class Main {
    public static void main(String[] args) {
        // 创建Person对象
        Person person1 = new Person("John", 25);
        Person person2 = new Person("Alice", 30);

        // 调用对象的方法
        person1.speak(); // 输出："My name is John and I am 25 years old."
        person2.speak(); // 输出："My name is Alice and I am 30 years old."
    }
}
```

在上述示例中，Person类定义了属性**(name和age)**和方法(speak)。通过创建Person类的实例**(person1和person2)**，可以使用对象的方法来输出不同的信息。每个对象都有自己的属性值，但共享同一个类的方法定义。

**总结：类是对象的模板，描述了对象的属性和行为；对象是类的实例，具体化了类的定义，拥有自己的状态和行为。类和对象之间通过实例化关联在一起，通过对象可以调用类定义的方法操作对象的状态。**



### 2.4对象在内存中的存在形式

我们通过图文结合的方式更清楚的一个对象在JVM内存的存在形式。

![image-20231026223342947](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310262233312.png)





## 3.类与对象的其他细节

### 3.1属性/成员变量/字段

从概念来说 类的属性，成员变量，字段都是一个意思。即成员变量 = 属性 = field(字段)

属性是类的一个组成部分，一般是基本数据类型,也可是引用类型(对象，数组)。比如我们前面定义Dog类的int age 就
是属性

**注意事项和细节说明**

1. 属性的定义语法同变量，示例：访问修饰符 属性类型 属性名;这里简单的介绍访问修饰符： 控制属性的访问范围
   有四种访问修饰符 **public**, **proctected**, **默认**, **private** 。
2. 属性的定义类型可以为任意类型，包含基本类型或引用类型
3. 属性如果不赋值，有默认值，规则和数组一致。具体说: int 0，short 0, byte 0, long 0, float 0.0,double 0.0，char \u0000，
   boolean false，String null

### 3.2如何创建对象

#### 1.先声明再创建

```java
Cat cat ; //声明对象 cat
cat = new Cat(); //创建
```

#### 2.直接创建

```java
Cat cat = new Cat();
```



### 3.3如何访问属性

**基本语法**

> 对象名.属性名;
> 案例演示赋值和输出

```java
cat.name ;
cat.age;
cat.color;
```

**类和对象的内存分配机制(重要)**
我们看一个思考题
我们定义一个人类(Person)(包括 名字,年龄)。编写Object2.java

我们看看下面一段代码：

> Person pl=new Person();
>
> p1.age=10;
>
> Person p2 = p1;//把pl赋给了p2，让p2指向p1
>
> System.out.println(p2.age);

请问：p2．age究竟是多少？并画出内存图：

![image-20231026224539664](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310262245785.png)



### 3.4类和对象的内存分配机制

#### 1.Java 内存的结构分析

1. 类的内存分配：
   - 类的定义存储在方法区（Method Area）中，包括类的结构、字段、方法、构造方法等信息。
   - 静态成员变量（static fields）被分配在方法区的静态存储区域，它们在程序运行期间一直存在，并且对所有类的实例共享。
   - 类的字节码（Bytecode）也存储在方法区中。
2. 对象的内存分配：
   - 对象在堆内存（Heap）中分配空间。堆是运行时数据区域，用于存储对象实例和数组。
   - 当使用关键字 "new" 创建对象时，会在堆中分配一块连续的内存空间来存储对象的实例变量。
   - 对象的实例变量包括类的非静态成员变量和从父类继承的实例变量。
   - 对象的方法代码存储在方法区中，而方法的实际执行是在堆中的对象上进行。
3. 对象引用的内存分配：
   - 对象引用是指向对象的指针或引用变量。
   - 对象引用变量本身存储在栈内存（Stack）中，而不是堆内存中。
   - 栈内存用于存储方法调用和局部变量等信息，它的空间由编译器自动分配和释放。
   - 对象引用变量存储在栈中，但它指向的对象实例存储在堆中。
4. 垃圾回收**(Garbage Collection)**：
   - Java中的垃圾回收机制负责自动回收不再使用的对象内存。
   - 当对象不再被引用时，垃圾回收器会自动标记并回收该对象所占用的内存空间。
   - 垃圾回收器通过追踪对象的引用关系，确定哪些对象是可达的，哪些对象是不可达的，从而进行垃圾回收。

需要注意的是，Java中的内存分配和回收是由Java虚拟机（JVM）负责管理的，开发人员无需显式地进行内存分配和释放操作。JVM会根据程序的需要自动进行内存管理，包括对象的创建、分配和垃圾回收等。这种自动化的内存管理机制大大简化了开发过程，并提供了更高的安全性和可靠性。

#### 2.Java 创建对象的流程简单分析

我们先看一下下面这串代码，看看他在内存中如何执行的。

```java
Person p = new Person();
p.name = "Leo";
p.age = 20
```

1. 首先会在方法区去加载类的信息(包括类的属性信息和方法信息，只会加载一次)。
2. 栈里面首先运行main方法，new创建了p对象，new出来的都存在堆里面，成员变量有默认值，成员方法实际保存的是地址，是方法区里对应的方法的地址；根据创建对象时设立的值，到堆里修改对应值，其实是直接在地址改，因为new Person（）是要赋给在栈里p的；
3. 然后开始在堆内存分配Person这个对象的空间，进入默认初始化。
4. 把分配的这个内存地址分配给p引用，此时p引用就会指向Person对象。
5. 然后进行**指定初始化** ,比如：p.name = "Leo"; p.age = **20** 。

#### 3.练习分析

下面我们看一个代码练习，并分析出他的内存布局图。

```java
我们看看下面一段代码，会输出什么信息：
Person a=new Person（）;
a.age=10;
a.name="小明"：
Person b;
b=a;
System.out.println(b.name）//小明
b.age=200;
b = null;
System.out.println(a.age);//200
System.out.println(b.age;//异常
```

![image-20231027090706452](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310270907574.png)



## 4.参考文献

- https://c.biancheng.net/view/939.html
- https://www.cnblogs.com/zhangdiIT/p/5685115.html
- https://www.hainingwang.cn/html/biancheng/20220710/534213.html



## 5.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。
