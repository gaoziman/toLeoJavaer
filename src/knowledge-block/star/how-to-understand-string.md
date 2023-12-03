---
title: 如何理解String是不可变的
icon: circle-info
order: 13
category:
  - Knowledge
tag:
  - Knowledge
pageview: false
date: 2023-11-15 21:44:15
comment: false
breadcrumb: false
---

# 如何理解String是不可变的

## 1.何为不可变

众所周知， 在Java中， **String**类是不可变的。那么到底什么是不可变的对象呢？ 

**可以这样认为：**

如果一个对象，在它创建完成之后，不能再改变它的状态，那么这个对象就是不可变的。不能改变状态的意思是，不能改变对象内的成员变量，包括基本`数据类型的值`不能改变，引用类型的变量不能指向其他的对象，**引用类型指向的对象的状态**也不能改变。

《java concurrency in practice》一书给出了一个粗略的定义：对**象一旦创建后，其状态不可修改，则该对象为不可变对象。**一般一个对象满足以下三点，则可以称为是不可变对象：

1. 其状态不能在创建后再修改；
2. 所有域都是final类型；
3. 其构造函数构造对象期间，this引用没有泄露。

这里重点说明一下第2点，一个对象其所有域都是final类型，该对象也可能是可变对象。因为final关键字只是限制对象的域的引用不可变，但无法限制通过该引用去修改其对应域的内部状态。



## 2.对象和对象引用

在此之前，我们先看一看下面这行代码。

![image-20231121095619930](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311210956967.png)



打印结果：

![image-20231121095705865](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311210957892.png)

首先创建一个String对象s，然后让s的值为`ABC`， 然后又让s的值加等为`ABCabc`。 从打印结果可以看出，s的值确实改变了。那么怎么还说String对象是不可变的呢？ 其实这里存在一个误区： s只是一个String对象的引用，并不是对象本身。对象在内存中是一块内存区，成员变量越多，这块内存区占的空间越大。引用只是一个4字节的数据，里面存放了它所指向的对象的地址，通过这个地址可以访问对象。

也就是说，s只是一个引用，它指向了一个具体的对象，当s=`ABC`; 这句代码执行过之后，又创建了一个新的对象`ABCabc`， 而引用s重新指向了这个新的对象，原来的对象`ABC`还在内存中存在，并没有改变。内存结构如下图所示：

![image-20231121100231507](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311211002550.png)

 如果希望存放的String可以调整大小，而不是创建新的内存来存放新的对象，可以使用**StringBuffer**这个类来存放。这个内存可以调整大小。而不会抛弃。



## 3.String为什么不可变

我们打开String的源码查看

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311211004432.png)

String类是用final关键字修饰，这说明String不可继承。再看下面，String类的主力成员字段value是个char[ ]数组，而且是用**final**修饰的。final修饰的字段创建以后就不可改变。

![image-20231121100550849](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311211005890.png)

value用final修饰，编译器不允许我把value指向堆区另一个地址。

但如果我直接对数组元素动手，那不就没什么问题了嘛。

![image-20231121100622372](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311211006406.png)





## 4.不可变有什么好处

最简单的原因就是安全，我们下面再来看一个例子。

```java
package com.Leo.exer.string;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-21 9:38
 * @description : String 测试用例
 */
public class Test {
        //不可变的String
        public static String appendStr(String s){
            s+="bbb";
            return s;
        }

        //可变的StringBuilder
        public static StringBuilder appendSb(StringBuilder sb){
            return sb.append("bbb");
        }

        public static void main(String[] args){
            //String做参数
            String s = new String("aaa");
            String ns=Test.appendStr(s);
            System.out.println("String s >>> "+s);

            //StringBuilder做参数
            StringBuilder sb=new StringBuilder("aaa");
            StringBuilder sbn=Test.appendSb(sb);
            System.out.println("StringBuilder sbn >>> "+sb);
        }
}
```

运行结果:

![image-20231121100836941](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311211008980.png)

如果我们不小心像上面例子里，直接在传进来的参数上加"bbb"，因为Java对象参数传的是引用，所以可变的的**StringBuffer**参数就被改变了。可以看到变量sb在Test.appendSb(sb)操作之后，就变成了"aaabbb"。有的时候这可能不是程序员的本意。所以String不可变的安全性就体现在这里。

1. 只有当字符串是不可变的，字符串池才有可能实现。字符串池的实现可以在运行时节约很多heap空间，因为不同的字符串变量都指向池中的同一个字符串。但如果字符串是可变的，那么String interning将不能实现([String interning](http://en.wikipedia.org/wiki/String_interning)是指对不同的字符串仅仅只保存一个，即不会保存多个相同的字符串)，因为这样的话，如果变量改变了它的值，那么其它指向这个值的变量的值也会一起改变。
2. 如果字符串是可变的，那么会引起很严重的安全问题。譬如，数据库的用户名、密码都是以字符串的形式传入来获得数据库的连接，或者在socket编程中，主机名和端口都是以字符串的形式传入。因为字符串是不可变的，所以它的值是不可改变的，否则黑客们可以钻到空子，**改变字符串指向的对象的值，造成安全漏洞。**
3. 因为字符串是不可变的，所以是多线程安全的，同一个字符串实例可以被多个线程共享。这样便不用因为线程安全问题而使用同步。字符串自己便是线程安全的。
4. 类加载器要用到字符串，不可变性提供了安全性，以便正确的类被加载。譬如你想加载java.sql.Connection类，而这个值被改成了myhacked.Connection，那么会对你的数据库造成不可知的破坏。



## 5.String小结

Java中的String类被设计成不可变（immutable）的，这里所说的“不可变”是指一旦一个String对象被创建，那么它所包含的字符序列就不能被改变。

1. **存储方式**：
   - 在Java中，String对象内部使用字符数组保存字符串数据。这个字符数组是被标记为final的，这就意味着数组的引用不能被更改。一旦分配了数组空间和内容，就无法再更改数组中存储的字符。
2. **创建String对象**：
   - 当你创建一个String对象时，例如通过`String s = "hello";`，实际上就在字符串池中创建了一个String实例（如果池中不存在的话）。
   - 如果你试图“更改”String对象如`s = s + " world";`，这实际上并不是更改原有的String对象，而是在字符串池中创建了一个新的String对象，并把它的引用指向变量s。原来的字符串"hello"仍然存在，只是我们没有任何变量引用它了。
3. **效率和安全性**：
   - 不可变的好处之一在于效率。不可变对象因为不可更改，所以它们可以自由地共享。例如，多个引用可以安全地指向同一个字符串，而不需要担心其中的一个引用会无意中修改字符串内容，影响到其他的引用。
   - 另一个好处是安全性。由于String的不可变性，它的值在创建之后就不能被更改，这意味着它是线程安全的，可以在多线程环境下被共享而不需要额外的同步措施。
4. **String Pool特性**：
   - Java中有一个特别的字符串池，用于存储字符串字面量。这是可能的因为字符串是不可变的。如果字符串是可变的，那么一个字符串的改变可能影响到引用同一个字符串的其他地方，这会造成显著的错误和安全问题。
5. **hashCode的缓存**：
   - 因为String是不可变的，其hashCode的值也是不会改变的，这就允许String类缓存hashCode值。因为String在Java中经常作为HashMap和HashSet的键，所以不可变性带来的hashCode缓存能显著提高这些集合操作的性能。
6. **设计决策和实现**：
   - String的不可变性是一项设计决策，它有助于简化代码和提高性能。在一些需要可变字符串的情况下，Java提供了StringBuffer和StringBuilder类，它们包含了可以更改字符串内容的API。



## 6.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311231351923.png)

欢迎进入Leo哥交流群，一起共商Java大计，如若二维码失效，可添加Leo哥微信：Leocisyam，拉你入群。

![image-20231122221500504](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311222217346.png)