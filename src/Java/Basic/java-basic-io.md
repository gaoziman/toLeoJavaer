---
title: Java基础篇 IO流
icon: circle-info
order: 5
category:
  - Java☕
tag:
  - Java☕
pageview: false
date: 2023-10-09 15:26:30
comment: false
breadcrumb: false
---




> 大家好，我是Leo🫣🫣🫣，最近在复习Java基础内容，这个专栏后续也会一直更新下去，Java基础乃是咱
>
> 们Java的根基，俗话说，基础不牢，地动山摇。今天我们来学习有关IO流相关的内容。话不多说，让我们开始吧😎😎😎。

我们先看一下IO的整个知识体系

![image-20230927110000070](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309271100846.png)

> 大家好，我是Leo🫣🫣🫣，
>
> 话不多说，让我们开始吧😎😎😎。

## 1.初步认识IO

> 以下部分解释摘录于维基百科

[维基百科-IO](https://zh.wikipedia.org/wiki/I/O)

**I/O**（英语：**I**nput/**O**utput），即 **输入／输出**，通常指[数据 ](https://zh.wikipedia.org/wiki/数据)在 [存储器](https://zh.wikipedia.org/wiki/存储器)（内部和外部）或其他周边设备之间的输入和输出，是信息处理系统（例如[计算机](https://zh.wikipedia.org/wiki/电子计算机)）与外部世界（可能是人类或另一信息处理系统）之间的通信。输入是系统接收的信号或数据，输出则是从其发送的信号或数据。该术语也可以用作行动的一部分；到“执行I/O”是执行输入或输出的操作。

输入/出设备是硬件中由人（**或其他系统**）使用与计算机进行通信的部件。例如，键盘或鼠标是计算机的输入设备，而监控器和打印机是输出设备。计算机之间的通信设备（**如电信调制解调器和网卡**）通常执行输入和输出操作。

将设备指定为输入或输出取决于视角。鼠标和键盘截取人类用户的肢体动作，并将其转换为计算机可解的输入信号；这些设备的输出是计算机的输入。同样，打印机和监控器则用于将计算机处理的过程和结果输出，并将这些信号转换为人类用户能理解的呈现。从用户的角度来看，阅读或查看这些呈现的过程则是接受输入；人机交互主要是在研究了解机器与人类之间这种过程的交互接口。

在现代计算机体系结构中 CPU 可以使用单独的指令直接读取或写入，被认为是计算机的核心。而 CPU 和主存储器的组合，任何信息传入或传出 CPU /内存组合，例如通过从磁盘驱动器读取数据，就会被认为是 I/O；CPU 及其电路版提供用于低端编程的存储器映射 I/O，例如在设备驱动程序的实现中，或者提供对 I/O 通道的访问。一个 I/O 算法设计是利用内存，而且高效地进行与辅助存储设备交换数据时，如一个磁盘驱动器。、

Java 中是通过流处理IO 的，那么什么是流？

`流（Stream）`，是一个抽象的概念，是指一连串的数据（**字符或字节**），是以先进先出的方式发送信息的通道。

当程序需要读取数据的时候，就会开启一个通向数据源的流，这个数据源可以是文件，内存，或是网络连接。类似的，当程序需要写入数据的时候，就会开启一个通向目的地的流。这时候你就可以想象数据好像在这其中“流”动一样。

一般来说关于流的特性有下面几点：

1. 先进先出：最先写入输出流的数据最先被输入流读取到。
2. 顺序存取：可以一个接一个地往流中写入一串字节，读出时也将按写入顺序读取一串字节，不能随机访问中间的数据。（`RandomAccessFile`除外）
3. 只读或只写：每个流只能是输入流或输出流的一种，不能同时具备两个功能，输入流只能进行读操作，对输出流只能进行写操作。在一个数据传输通道中，如果既要写入数据，又要读取数据，则要分别提供两个流。



### 1.1 为什么要学习IO流

- 通过变量,数组,或者集合存储数据
    - 都是不能永久化存储 , 因为数据都是存储在内存中
    - 只要代码运行结束，所有数据都会丢失
- 使用IO流
    - 1，将数据写到文件中，实现数据永久化存储
    - 2，把文件中的数据读取到内存中(Java程序)



### 1.2 什么是IO流

- I  表示 **intput** ，是数据从硬盘进内存的过程，称之为读。
- O 表示 **output** ，是数据从内存到硬盘的过程。称之为写
- IO的数据传输，可以看做是一种数据的流动，按照流动的方向，以内存为参照物，进行读写操作
    - 简单来说：**内存在读，内存在写**



### 1.3 IO流的简单分类

![image-20230927111923412](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309271119520.png)

从数据来源或者说是操作对象角度看，IO 类可以分为:

![image-20230927133323360](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309271333464.png)

- 按照流向区分
    - 输入流 : 用来读取数据
    - 输出流 : 用来写入数据
- 按照类型区分
    - 字节流
    - 字符流
- 注意 :
    - 字节流可以操作任意文件
    - 字符流只能操作纯文本文件
    - 用 windows记事本打开能读的懂，那么这样的文件就是纯文本文件。

#### 1、输入流与输出流

输入与输出是相对于应用程序而言的，比如文件读写，读取文件是输入流，写文件是输出流，这点很容易搞反。

![image-20230312151429590](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230312151429590.png)

#### 2、字节流与字符流

字节流和字符流的用法几乎完成全一样，区别在于字节流和字符流所操作的数据单元不同，字节流操作的单元是数据单元是8位的字节，字符流操作的是数据单元为16位的字符。

**为什么要有字符流？**

![image-20230927112827673](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309271128762.png)

Java中字符是采用 **Unicode** 标准，Unicode 编码中，一个英文字母或一					个中文汉字为两个字节。

而在UTF-8编码中，一个中文字符是3个字节。例如下面图中，**程序员里奥** 5个中文对应的是15个字节：-28-70-111-26-73-79-28-72-115-25-97-91-27-92-124

![image-20230927113421715](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309271134802.png)


那么问题来了，如果使用字节流处理中文，如果一次读写一个字符对应的字节数就不会有问题，一旦将一个字符对应的字节分裂开来，就会出现乱码了。为了更方便地处理中文这些字符，**Java** 就推出了字符流。

字节流和字符流的其他区别：

字节流一般用来处理图像、视频、音频、PPT、Word等类型的文件。字符流一般用于处理纯文本类型的文件，如TXT文件等，但不能处理图像视频等非文本文件。用一句话说就是：字节流可以处理一切文件，而字符流只能处理纯文本文件。
字节流本身没有缓冲区，缓冲字节流相对于字节流，效率提升非常高。而字符流本身就带有缓冲区，缓冲字符流相对于字符流效率提升就不是那么大了。

字节流和字符流是I/O操作中的两种不同的数据处理方式。字节流以字节（byte）为单位读写数据，而字符流则以字符（char）为单位进行读写。

在处理文本文件时，字符流是更好的选择，因为文本文件是由字符组成的。使用字符流可以避免在读写文本时发生编码问题，例如出现中文乱码等情况。字符流可以将字节流中的字节按照指定编码格式（如UTF-8、GBK等）转化为字符，然后进行操作。在写入文本文件时，字符流会将字符转换成指定编码格式的字节序列，然后写入文件。

此外，字符流还具有一些其他优点。例如，字符流可以按照行的方式读取文本文件，而字节流则需要自行判断换行符，以此来分离每一行文本。在处理大量文本数据时，使用字符流可以提高效率。

总的来说，字符流在处理文本文件时更为方便和高效，因此在处理文本文件时应该优先选择字符流。当然，在处理二进制文件时，字节流则是更为合适的选择。



#### 3、节点流和处理流

节点流：直接操作数据读写的流类，比如FileInputStream

处理流：对一个已存在的流的链接和封装，通过对数据进行处理为程序提供功能强大、灵活的读写功能，例如BufferedInputStream（缓冲字节流）

处理流和节点流应用了Java的装饰者设计模式。

下图就很形象地描绘了节点流和处理流，处理流是对节点流的封装，最终的数据处理还是由节点流完成的。

![image-20230927192528762](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309271925901.png)

在诸多处理流中，有一个非常重要，那就是缓冲流。

我们知道，程序与磁盘的交互相对于内存运算是很慢的，容易成为程序的性能瓶颈。减少程序与磁盘的交互，是提升程序效率一种有效手段。缓冲流，就应用这种思路：普通流每次读写一个字节，而缓冲流在内存中设置一个缓存区，缓冲区先存储足够的待操作数据后，再与内存或磁盘进行交互。这样，在总数据量不变的情况下，通过提高每次交互的数据量，减少了交互次数。

![image-20230927193010388](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309271930516.png)



## 2.字节流

### 2.1 字节输出流

#### 1.字节输出流入门

- ##### FileOutputStream类 :

    - `OutputStream`有很多子类，我们从最简单的一个子类开始。
    - `java.io.FileOutputStream `类是文件输出流，用于将数据写出到文件

- ##### 字节输出流OutputStream主要方法：

    - write(byte[] b) ：将 b.length 个字节从指定 byte 数组写入此文件输出流中。
    - write(byte[] b, int off, int len) ：将指定 byte 数组中从偏移量 off 开始的 len 个字节写入此文件输出流。
    - write(int b) ：将指定字节写入此文件输出流。
    - close() ：关闭此输入流并释放与该流关联的所有系统资源。



  ```java
  public class FileOutputStreamConstructor throws IOException {
      public static void main(String[] args) {
     	 	// 使用File对象创建流对象
          File file = new File("a.txt");
          FileOutputStream fos = new FileOutputStream(file);
        
          // 使用文件名称创建流对象
          FileOutputStream fos = new FileOutputStream("b.txt");
      }
  }
  ```

- ##### 字节输出流写数据快速入门

    - 创建字节输出流对象。
    - 写数据
    - 释放资源

  ```java
  package com.Leo.io.output;
  
  import org.junit.jupiter.api.Test;
  
  import java.io.FileOutputStream;
  import java.io.IOException;
  /*
      字节输出流写数据快速入门 :
          1 创建字节输出流对象。
          2 写数据
          3 释放资源
   */
  public class FileOutputStream01 {
      public static void main(String[] args) throws IOException {
          // 创建字节输出流对象
          // 如果指定的文件不存在 , 会自动创建文件
          // 如果文件存在 , 会把文件中的内容清空
          FileOutputStream fos = new FileOutputStream("e:/test.txt");
  
          // 写数据
          // 写到文件中就是以字节形式存在的
          // 只是文件帮我们把字节翻译成了对应的字符 , 方便查看
          fos.write(97);
          fos.write(98);
          fos.write(99);
  
          // 释放资源
          // while(true){}
          // 断开流与文件中间的关系
          fos.close();
      }
  }
  ```

#### 2.字节输出流写数据的方法

- 字节流写数据的方法

    - 1 void write(int b)    一次写一个字节数据
    - 2 void write(byte[] b)    一次写一个字节数组数据
    - 3 void write(byte[] b, int off, int len)  一次写一个字节数组的部分数据

  ```java
  package com.Leo.io.output;
  
  import org.junit.jupiter.api.Test;
  
  import java.io.FileOutputStream;
  import java.io.IOException;
  
  /**
   * @author : Leo
   * @version 1.0
   * @date 2023/9/24/024 22:07
   * @description :
   *     字节输出流写数据快速入门 :
   *         1 创建字节输出流对象。
   *         2 写数据
   *         3 释放资源
   *  
   */
  public class FileOutputStream02 {
  
      /**
      * 用于测试: FileOutStream基本练习
      */
      @Test
      public void testFileOutStream01()
      {
          FileOutputStream fos = null;
  
          try {
              // 创建字节输出流对象 用于写入数据到磁盘  true 就是往文件后面进行追加的方式而不是覆盖
              fos =  new FileOutputStream("e:/fos.txt",true);
  
              // 写入一个字符串 把字符串转为字符数组
              String str = "Hello Leo 666";
              fos.write(str.getBytes());
            fos.write(str.getBytes(),0, str.length());
  
  
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              try {
                  fos.close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
  }
  ```



#### 3.写数据的换行和追加写入

```java
package com.Leo.io.output;

import java.io.FileOutputStream;
import java.io.IOException;

/*
    字节流写数据的换行和追加写入

    1 字节流写数据如何实现换行呢？
        写完数据后，加换行符
        windows : \r\n
        linux : \n
        mac : \r

    2 字节流写数据如何实现追加写入呢？
        通过构造方法 : public FileOutputStream(String name，boolean append)
        创建文件输出流以指定的名称写入文件。如果第二个参数为true ，不会清空文件里面的内容
 */
public class OutputStreamDemo3 {
    public static void main(String[] args) throws IOException {
        // 创建字节输出流对象
        FileOutputStream fos = new FileOutputStream("e:/a.txt");

        // void write(int b)  一次写一个字节数据
        fos.write(97);
        // 因为字节流无法写入一个字符串 , 把字符串转成字节数组写入
        fos.write("\r\n".getBytes());
        fos.write(98);
        fos.write("\r\n".getBytes());
        fos.write(99);
        fos.write("\r\n".getBytes());

        // 释放资源
        fos.close();
    }
}
```

```java
package com.Leo.io.output;

import java.io.FileOutputStream;
import java.io.IOException;

/*
    字节流写数据的换行和追加写入

    1 字节流写数据如何实现换行呢？
        写完数据后，加换行符
        windows : \r\n
        linux : \n
        mac : \r

    2 字节流写数据如何实现追加写入呢？
        通过构造方法 : public FileOutputStream​(String name，boolean append)
        创建文件输出流以指定的名称写入文件。如果第二个参数为true ，不会清空文件里面的内容
 */
public class OutputStreamDemo3 {
    public static void main(String[] args) throws IOException {
        // 创建字节输出流对象
        // 追加写数据
        // 通过构造方法 : public FileOutputStream​(String name，boolean append) : 追加写数据
        FileOutputStream fos = new FileOutputStream("e:/a.txt"，true);

        // void write(int b)	一次写一个字节数据
        fos.write(97);
        // 因为字节流无法写入一个字符串 , 把字符串转成字节数组写入
        fos.write("\r\n".getBytes());
        fos.write(98);
        fos.write("\r\n".getBytes());
        fos.write(99);
        fos.write("\r\n".getBytes());

        // 释放资源
        fos.close();
    }
    // 写完数据换行操作
    private static void method1() throws IOException {
        // 创建字节输出流对象
        FileOutputStream fos = new FileOutputStream("day11_demo\\a.txt");

        // void write​(int b)	一次写一个字节数据
        fos.write(97);
        // 因为字节流无法写入一个字符串 , 把字符串转成字节数组写入
        fos.write("\r\n".getBytes());
        fos.write(98);
        fos.write("\r\n".getBytes());
        fos.write(99);
        fos.write("\r\n".getBytes());

        // 释放资源
        fos.close();
    }
}

```



### 2.2 字节输入流

`InputStream`类有很多的实现子类，下面列举了一些比较常用的：

![image-20230312151328362](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230312151328362.png)





详细说明一下上图中的类：

1.**InputStream**: **InputStream**是所有字节输入流的抽象基类，前面说过抽象类不能被实例化，实际上是作为模板而存在的，为所有
实现类定义了处理输入流的方法。
2.**Fi1eInputSream**:文件输入流，一个非常重要的字节输入流，用于对文件进行读取操作。
3.**PipedInputStream**:管道字节输入流，能实现多线程间的管道通信。
4.**ByteArrayInputStream**：字节数组输入流，从字节数组(**byte**)中进行以字节为单位的读取，也就是将资源文件都以字节的形式存入
到该类中的字节数组中去。
5.**FilterInputStream**：装饰者类，具体的装饰者继承该类，这些类都是处理类，作用是对节点类进行封装，实现一些特殊功能。
6.**DataInputStream**：数据输入流，它是用来装饰其它输入流，作用是"允许应用程序以与机器无关方式从底层输入流中读取基本Java数据类型。
7.**BufferedInputStream**:缓冲流，对节点流进行装饰，内部会有一个缓存区，用来存放字节，每次都是将缓存区存满然后发送，而
不是一个字节或两个字节这样发送，效率更高。
8.**ObjectInputstream**:对象输入流，用来提供对基本数据或对象的持久存储。通俗点说，也就是能直接传输对象，通常应用在反序
列化中。它也是一种处理流，构造器的入参是一个**InputStream**的实例对象。



#### 1.字节输出流入门

- #####  字节输入流类

    - InputStream类 : 字节输入流最顶层的类 , 抽象类
      --- FileInputStream类 : **FileInputStream** extends **InputStream**

- ##### 字节输入流`InputStream`主要方法：

    - read() ：从此输入流中读取一个数据字节。
    - read(byte[] b) ：从此输入流中将最多 b.length 个字节的数据读入一个 byte 数组中。
    - read(byte[] b, int off, int len) ：从此输入流中将最多 len 个字节的数据读入一个 byte 数组中。
    - close()：关闭此输入流并释放与该流关联的所有系统资源。

- ##### 步骤

    -  创建输入流对象
    -  读数据
    -  释放资源

- ```java
  package com.Leo.io.input;
  
  import java.io.FileInputStream;
  import java.io.IOException;
  
  /*
      字节输入流写数据快速入门 : 一次读一个字节
              第一部分 : 字节输入流类
                  InputStream类 : 字节输入流最顶层的类 , 抽象类
                  --- FileInputStream类 : FileInputStream extends InputStream
              第二部分 : 构造方法
                  public FileInputStream(File file) :  从file类型的路径中读取数据
                  public FileInputStream(String name) : 从字符串路径中读取数据
              第三部分 : 字节输入流步骤
                  1 创建输入流对象
                  2 读数据
                  3 释放资源
   */
  public class FileInputStreamDemo1 {
      public static void main(String[] args) throws IOException {
          // 创建字节输入流对象
          // 读取的文件必须存在 , 不存在则报错
          FileInputStream fis = new FileInputStream("E:/test.txt");
  
          // 读数据 , 从文件中读到一个字节
          // 返回的是一个int类型的字节
          // 如果想看字符, 需要强转
          int by = fis.read();
          System.out.println((char) by);
  
          // 释放资源
          fis.close();
      }
  }
  ```



#### 2.字节输入流读多个字节

```java
package com.Leo.io.input;

import java.io.FileInputStream;
import java.io.IOException;

/*
    字节输入流写数据快速入门 : 读多个字节
            第一部分 : 字节输入流类
                InputStream类 : 字节输入流最顶层的类 , 抽象类
                --- FileInputStream类 : FileInputStream extends InputStream
            第二部分 : 构造方法
                public FileInputStream(File file) :  从file类型的路径中读取数据
                public FileInputStream(String name) : 从字符串路径中读取数据
            第三部分 : 字节输入流步骤
                1 创建输入流对象
                2 读数据
                3 释放资源
 */
 /**
    * 用于测试: 字节输入流去读取
    */
    @Test
    public void testFileInputStream01() throws IOException
    {
        FileInputStream fis = null;

        int readData = 0;


        // 创建FileInputStream 对象， 用于文件的读取
        try {
            fis =  new FileInputStream("E:/test.txt");
            while ((readData = fis.read()) != -1)
            {
                System.out.print((char) readData);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 关闭流
            fis.close();
        }
    }
}
```



#### 3.图片的拷贝

```java
package com.Leo.io.output;

import org.junit.jupiter.api.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/9/24/024 22:21
 * @description : 文件拷贝
 */
public class FileCopy {
    public static void main(String[] args) {

    }


    /**
    * 用于测试: 文件的拷贝
    */
    @Test
    public void testFileCopy()
    {
        // 创建一个文件输入流和一个文件输出流 先读后写

        FileInputStream  fis = null;
        FileOutputStream fos  = null;
        int len = 0;

        try {
            fis = new FileInputStream("D:/Leo Gallery/LeoSave/wallhaven-wexe9r.jpg");
            fos = new FileOutputStream("E:/ fosCopy.jpg");

            byte[] bytes = new byte[1024];
            // 边读边写
            while ((len = fis.read(bytes)) != -1)
            {
                fos.write(bytes, 0, len);
            }
            System.out.println("拷贝图片成功!");

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 关闭流
            try {
                fis.close();
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

```



#### 4.异常的捕获处理

- ##### JDK7版本之前处理方式 : 手动释放资源

  ```java
  package com.Leo.io.output;
  
  
  import java.io.FileInputStream;
  import java.io.FileOutputStream;
  import java.io.IOException;
  
  /*
      需求 : 对上一个赋值图片的代码进行使用捕获方式处理
   */
  public class FileInputStreamDemo4 {
      public static void main(String[] args) {
          FileInputStream fis = null ;
          FileOutputStream fos = null;
          try {
              // 创建字节输入流对象
              fis = new FileInputStream("D:/Leo Gallery/LeoSave/wallhaven-wexe9r.jpg");
  
              // 创建字节输出流
              fos = new FileOutputStream("e:/copy.jpg");
  
              // 一次读写一个字节
              int by;
              while ((by = fis.read()) != -1) {
                  fos.write(by);
              }
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              // 释放资源
              if(fis != null){
                  try {
                      fis.close();
                  } catch (IOException e) {
                      e.printStackTrace();
                  }
              }
              // 释放资源
              if(fos != null){
                  try {
                      fos.close();
                  } catch (IOException e) {
                      e.printStackTrace();
                  }
              }
          }
      }
  }
  
  ```



- ##### JDK7版本优化处理方式 : 自动释放资源

    - JDK7优化后可以使用 try-with-resource 语句 , 该语句确保了每个资源在语句结束时自动关闭。
      简单理解 : 使用此语句,会自动释放资源 , 不需要自己在写finally代码块了

    - 格式 :

      ```java
      格式 :  
      try (创建流对象语句1 ; 创建流对象语句2 ...) {
              // 读写数据
          } catch (IOException e) {
              处理异常的代码...
          }
      
      举例 :
          try ( 
              FileInputStream fis1 = new FileInputStream("day11_demo\\a.txt") ; 
              FileInputStream fis2 = new FileInputStream("day11_demo\\b.txt") ) 
          {
              // 读写数据
          } catch (IOException e) {
              处理异常的代码...
          }
      
      ```

- ##### 代码实践

  ```java
  package com.itheima.inputstream_demo;
  
  import java.io.FileInputStream;
  import java.io.FileOutputStream;
  import java.io.IOException;
  
  /*
      JDK7版本优化处理方式
  
      需求 : 对上一个赋值图片的代码进行使用捕获方式处理
   */
  public class FileInputStreamDemo5 {
      public static void main(String[] args) {
          try (
                  // 创建字节输入流对象
                  FileInputStream fis = new FileInputStream("D:/Leo Gallery/LeoSave/wallhaven-wexe9r.jpg");
                  // 创建字节输出流
                  FileOutputStream fos = new FileOutputStream("D://copy.jpg")
          ) {
              // 一次读写一个字节
              int by;
              while ((by = fis.read()) != -1) {
                  fos.write(by);
              }
              // 释放资源 , 发现已经灰色 , 提示多余的代码 , 所以使用 try-with-resource 方式会自动关流
              // fis.close();
              // fos.close();
          } catch (IOException e) {
              e.printStackTrace();
          }
      }
  }
  ```



#### 5.字节输入流一次读一个字节数组

- FileInputStream类 :

    - public int read(byte[] b)  : 从输入流读取最多b.length个字节的数据, 返回的是真实读到的数据个数

  ```java
  package com.Leo.io.input;
  
  
  import javax.sound.midi.Soundbank;
  import java.io.FileInputStream;
  import java.io.FileNotFoundException;
  import java.io.IOException;
  
  /*
     FileInputStream类 :
          public int read​(byte[] b)：
          1 从输入流读取最多b.length个字节的数据
          2 返回的是真实读到的数据个数
   */
   /**
       * 用于测试: 使用字节数组输入流去读取
       */
      @Test
      public void testFileInputStream02()
      {
          FileInputStream fis = null;
  
          int readData = 0;
          int len = 0;
  
          // 使用字节数组
          byte[] bytes = new byte[1024];
  
          // 创建FileInputStream 对象， 用于文件的读取
           try {
              // len如果返回-1, 代表文件读取完毕, 否则循环读取 如果读取正常, 则返回实际读取的字节
              fis =  new FileInputStream("E:/test.txt");
              while ((len = fis.read(bytes)) != -1)
              {
                  System.out.print(new String(bytes, 0, len));
              }
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              // 关闭流
              try {
                  fis.close();
              } catch (IOException e) {
                 e.printStackTrace();
              }
          }
      }
  
  ```

- 对复制图片的代码进行使用一次读写一个字节数组的方式进行改进

  ```java
  package com.itheima.inputstream_demo;
  
  
  import java.io.FileInputStream;
  import java.io.FileNotFoundException;
  import java.io.FileOutputStream;
  import java.io.IOException;
  
  /*
      需求 : 对复制图片的代码进行使用一次读写一个字节数组的方式进行改进
  
      FileInputStream类 :
          public int read​(byte[] b)：
          1 从输入流读取最多b.length个字节的数据
          2 返回的是真实读到的数据个数
   */
  public class FileInputStreamDemo7 {
      public static void main(String[] args) throws IOException {
         // 创建字节输入流对象
          FileInputStream fis = new FileInputStream("D:/Leo Gallery/LeoSave/wallhaven-wexe9r.jpg");
          // 创建字节输出流
          FileOutputStream fos = new FileOutputStream("D://copy.jpg")
          byte[] bys = new byte[1024];
          int len;// 每次真实读到数据的个数
          int by;
          while ((len = fis.read(bys)) != -1) {
              fos.write(bys, 0, len);
          }
  
          // 释放资源
          fis.close();
          fos.close();
      }
  }
  
  ```



## 3.节点流和处理流联系和区别是什么

![image-20230927134552527](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309271345699.png)

### 3.1 基本介绍

1、节点流可以从一个特定的数据源读写数据，如：FileReader、FileWriter  
2、处理流（也叫包装流）是连接在以存在的流（节点流或处理流）之上，为程序提供更为强大的读写功能，更加灵活多变。如BufferReader、BufferWriter。



### 3.2节点流和处理流的区别和联系

1、节点流是底层流，直接和数据源相接  
2、处理包装节点流，即可以消除不同节点流的实现差异，也可以提供更方便的方法来完成输入和输出。  
3、处理流对节点流进行包装，使用了修饰器设计模式，不会直接与数据源相连。

Java流可以分**节点流**和**处理流**两类。

节点流是面向各种物理节点的流，比如面向读写文件的 **FileInputStream** 和 **FileOutputStream**；面向对象的 **ObjectInputStream**和**ObjectOutputStream **等等。

处理流则需要依附于节点流，用来对节点流的功能进行拓展和加强。比如BufferedInputStream，用它来包装FileInputStream（或者其他的节点输入流也一样）以后 ，直接调用BufferedInputStream的read方法，这个read方法的效果和FileInputStream的read方法的效果相比，就多出来一个缓存的功能。

![image-20230927134509076](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309271345208.png)

**简单来说就是**

1.节点流是底层流/低级流，直接跟数据源相接
2.处理流（**包装流**）包装 `节点流`，既可以消除不同节点流的实现差异，也可以提供更方便的方法来完成输入输出。
3.处理流（**也叫包装流**）对 `节点流 `进行包装，使用了修饰器设计模式，不会直接与数据源相连[**模拟修饰器设计模式**]



### 3.3 处理流的功能主要体现在以下两个方面

1.性能的提高：主要以增加缓冲的方式来提高输入输出的效率。
2.操作的便捷：处理流可能提供了一系列便捷的方法来一次输入输出大批量的数据，使用更加灵活方便



## 4.字符流

与字节流类似，字符流也有两个抽象基类，分别是`Reader `和 `Writer`。其他的字符流实现类都是继承了这两个类。

以`Reader`为例，它的主要实现子类如下图：

![image-20230312151354900](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230312151354900.png)



![image-20230312151407512](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230312151407512.png)


当使用字节流读取文本文件时，可能会有一个小问题。就是遇到中文字符时，可能不会显示完整的字符，那是因为一个中文字符可能占用多个字节存储。所以Java提供一些字符流类，以字符为单位读写数据，专门用于处理文本文件。

> 小贴士：字符流，只能操作文本文件，不能操作图片，视频等非文本文件。当我们单纯读或者写文本文件时  使用字符流 其他情况使用字节流。

### 4.1 字符输入流【Reader】

`java.io.Reader`抽象类是表示用于读取字符流的所有类的超类，可以读取字符信息到内存中。它定义了字符输入流的基本共性功能方法。

- `public int read()`： 从输入流读取一个字符。 虽然读取了一个字符，但是会自动提升为int类型。返回该字符的Unicode编码值。如果已经到达流末尾了，则返回-1。
- `public int read(char[] cbuf)`： 从输入流中读取一些字符，并将它们存储到字符数组 cbuf中 。每次最多读取cbuf.length个字符。返回实际读取的字符个数。如果已经到达流末尾，没有数据可读，则返回-1。
- `public int read(char[] cbuf,int off,int len)`：从输入流中读取一些字符，并将它们存储到字符数组 cbuf中，从cbuf[off]开始的位置存储。每次最多读取len个字符。返回实际读取的字符个数。如果已经到达流末尾，没有数据可读，则返回-1。
- `public void close()` ：关闭此流并释放与此流相关联的任何系统资源。

> 小贴士：close方法，当完成流的操作时，必须调用此方法，释放系统资源。



### 4.2 FileReader类

`java.io.FileReader `类是读取字符文件的便利类。构造时使用系统默认的字符编码和默认字节缓冲区。

- `FileReader(File file)`： 创建一个新的 FileReader ，给定要读取的File对象。
- `FileReader(String fileName)`： 创建一个新的 FileReader ，给定要读取的文件的名称。

当你创建一个流对象时，必须传入一个文件路径。类似于FileInputStream 。如果该文件不存在，则报FileNotFoundException。如果传入的是一个目录，则会报IOException异常。

```java
package com.Leo.io.reader;

import org.junit.jupiter.api.Test;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/9/24/024 22:30
 * @description : FileReader相关操作
 *
    1)new FileReader(File/String)
    2)read每次读取单个字符，返回该字符，如果到文件末尾返回-1
    3)read(char[):批量读取多个字符到数组，返回读取到的字符数，如果到文件末尾返回-1
    相关API:
    1)new String(char[):将char【】转换成String
    2)new String(char[l,off,Ien):将char[I的指定部分转换成String
 */
public class FileReader01 {
    public static void main(String[] args)
    {

    }

    /**
    * 用于测试: FileReader测试 一个一个读取
    */
    @Test
    public void testFileReader01()
    {
        // 使用FileReader的方式读取文件

        FileReader frd = null;

        int readData = 0;

        try {
            frd = new FileReader("e:/sort.txt");
            while ((readData = frd.read()) != -1)
            {
                System.out.print((char) readData);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            try {
                frd.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }



    /**
     * 用于测试: FileReader测试 使用char数组方式读取
     */
    @Test
    public void testFileReader02()
    {
        // 使用FileReader的方式读取文件

        FileReader frd = null;

        int readData = 0;

        int len = 0;

        try {
            char[] chars = new char[1024];

            frd = new FileReader("e:/sort.txt");
            while ((len = frd.read(chars)) != -1)
            {
                // 使用char数组进行读取文件
                System.out.print(new String(chars,0, len) );
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            try {
                frd.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}

```



### 4.3 字符输出流【Writer】

`java.io.Writer `抽象类是表示用于写出字符流的所有类的超类，将指定的字符信息写出到目的地。它定义了字节输出流的基本共性功能方法。

- `public void write(int c)` 写入单个字符。
- `public void write(char[] cbuf) `写入字符数组。
- `public void write(char[] cbuf, int off, int len) `写入字符数组的某一部分,off数组的开始索引,len写的字符个数。
- `public void write(String str) `写入字符串。
- `public void write(String str, int off, int len)` 写入字符串的某一部分,off字符串的开始索引,len写的字符个数。
- `public void flush() `刷新该流的缓冲。
- `public void close()` 关闭此流，但要先刷新它。



### 4.4 FileWriter类

`java.io.FileWriter `类是写出字符到文件的便利类。构造时使用系统默认的字符编码和默认字节缓冲区。

- `FileWriter(File file)`： 创建一个新的 FileWriter，给定要读取的File对象。
- `FileWriter(String fileName)`： 创建一个新的 FileWriter，给定要读取的文件的名称。

当你创建一个流对象时，必须传入一个文件路径，类似于FileOutputStream。如果文件不存在，则会自动创建。如果文件已经存在，则会清空文件内容，写入新的内容。

#### 1.写出字符数据

```java
package com.Leo.writer;

import org.junit.Test;

import java.io.FileWriter;
import java.io.IOException;

public class FWWrite {
    @Test
    public void test01()throws IOException {
        // 使用文件名称创建流对象
        FileWriter fw = new FileWriter("fw.txt");
        // 写出数据
        fw.write(97); // 写出第1个字符
        fw.write('b'); // 写出第2个字符
        fw.write('C'); // 写出第3个字符
        fw.write(30000); // 写出第4个字符，中文编码表中30000对应一个汉字。

      	/*
        【注意】FileWriter与FileOutputStream不同。
      	 如果不关闭,数据只是保存到缓冲区，并未保存到文件。
        */
        // fw.close();
    }

    @Test
    public void test02()throws IOException {
        // 使用文件名称创建流对象
        FileWriter fw = new FileWriter("fw.txt");
        // 字符串转换为字节数组
        char[] chars = "程序员Leo".toCharArray();

        // 写出字符数组
        fw.write(chars); // 程序员Leo

        // 写出从索引1开始，2个字符。
        fw.write(chars,1,2); // 程序员Leo

        // 关闭资源
        fw.close();
    }

    @Test
    public void test03()throws IOException {
        // 使用文件名称创建流对象
        FileWriter fw = new FileWriter("fw.txt");
        // 字符串
        String msg = "程序员Leo";

        // 写出字符数组
        fw.write(msg); //程序员Leo

        // 写出从索引1开始，2个字符。
        fw.write(msg,1,2);	// 程序员Leo

        // 关闭资源
        fw.close();
    }
}
```



#### 2.续写

- `public FileWriter(File file,boolean append)`： 创建文件输出流以写入由指定的 File对象表示的文件。
- `public FileWriter(String fileName,boolean append)`： 创建文件输出流以指定的名称写入文件。

这两个构造方法，参数中都需要传入一个boolean类型的值，`true` 表示追加数据，`false` 表示清空原有数据。这样创建的输出流对象，就可以指定是否追加续写了，代码使用演示：

操作类似于FileOutputStream。

```java
package com.Leo.writer;

import org.junit.Test;

import java.io.FileWriter;
import java.io.IOException;

public class FWWriteAppend {
    @Test
    public void test01()throws IOException {
        // 使用文件名称创建流对象，可以续写数据
        FileWriter fw = new FileWriter("fw.txt",true);
        // 写出字符串
        fw.write("程序员Leo真棒");
        // 关闭资源
        fw.close();
    }
}
```

#### 3.换行

```java
package com.Leo.writer;

import java.io.FileWriter;
import java.io.IOException;

public class FWWriteNewLine {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象，可以续写数据
        FileWriter fw = new FileWriter("fw.txt");
        // 写出字符串
        fw.write("程序员Leo");
        // 写出换行
        fw.write("\r\n");
        // 写出字符串
        fw.write("程序员Leo");
        // 关闭资源
        fw.close();
    }
}
```



#### 4.关闭和刷新

【注意】FileWriter与FileOutputStream不同。因为内置缓冲区的原因，如果不关闭输出流，无法写出字符到文件中。但是关闭的流对象，是无法继续写出数据的。如果我们既想写出数据，又想继续使用流，就需要`flush` 方法了。

- `flush` ：刷新缓冲区，流对象可以继续使用。
- `close `:先刷新缓冲区，然后通知系统释放资源。流对象不可以再被使用了。

代码使用演示：

```java
package com.Leo.writer;

import java.io.FileWriter;
import java.io.IOException;

public class FWWriteFlush {
    public static void main(String[] args)throws IOException {
        // 使用文件名称创建流对象
        FileWriter fw = new FileWriter("fw.txt");
        // 写出数据，通过flush
        fw.write('刷'); // 写出第1个字符
        fw.flush();
        fw.write('新'); // 继续写出第2个字符，写出成功
        fw.flush();

        // 写出数据，通过close
        fw.write('关'); // 写出第1个字符
        fw.close();
        fw.write('闭'); // 继续写出第2个字符,【报错】java.io.IOException: Stream closed
        fw.close();
    }
}
```

> 小贴士：即便是flush方法写出了数据，操作的最后还是要调用close方法，释放系统资源。



## 5.缓冲流

缓冲流,也叫 **高效流**，按照数据类型分类：

* **字节缓冲流**：`BufferedInputStream`，`BufferedOutputStream`
* **字符缓冲流**：`BufferedReader`，`BufferedWriter`

缓冲流的基本原理，是在创建流对象时，会创建一个内置的默认大小的缓冲区数组，通过缓冲区读写，减少系统IO次数，从而提高读写的效率。

### 5.1 构造方法

* `public BufferedInputStream(InputStream in)` ：创建一个 新的缓冲输入流。
* `public BufferedOutputStream(OutputStream out)`： 创建一个新的缓冲输出流。

构造举例，代码如下：

```java
// 创建字节缓冲输入流
BufferedInputStream bis = new BufferedInputStream(new FileInputStream("bis.txt"));
// 创建字节缓冲输出流
BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("bos.txt"));
```

* `public BufferedReader(Reader in)` ：创建一个 新的缓冲输入流。
* `public BufferedWriter(Writer out)` ： 创建一个新的缓冲输出流。

构造举例，代码如下：

```java
// 创建字符缓冲输入流
BufferedReader br = new BufferedReader(new FileReader("br.txt"));
// 创建字符缓冲输出流
BufferedWriter bw = new BufferedWriter(new FileWriter("bw.txt"));
```



### 5.2 效率测试

查询API，缓冲流读写方法与基本的流是一致的，我们通过复制大文件（375MB），测试它的效率。

```java
package com.Leo.buffer;

import org.junit.Test;

import java.io.*;

public class BufferedIO {
    @Test
    public void testNoBuffer() throws IOException {
        // 记录开始时间
        long start = System.currentTimeMillis();
        // 创建流对象
        FileInputStream fis = new FileInputStream("jdk8.exe");
        FileOutputStream fos = new FileOutputStream("copy.exe");
        // 读写数据
        byte[] data = new byte[1024];
        int len;
        while ((len = fis.read(data)) != -1) {
            fos.write(data,0,len);
        }

        fos.close();
        fis.close();

        // 记录结束时间
        long end = System.currentTimeMillis();
        System.out.println("普通流复制时间:"+(end - start)+" 毫秒");
    }

    @Test
    public void testUseBuffer() throws IOException {
        // 记录开始时间
        long start = System.currentTimeMillis();
        // 创建流对象
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream("jdk8.exe"));
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("copy.exe"));
        // 读写数据
        int len;
        byte[] data = new byte[1024];
        while ((len = bis.read(data)) != -1) {
            bos.write(data, 0 , len);
        }

        bos.close();
        bis.close();
        // 记录结束时间
        long end = System.currentTimeMillis();
        System.out.println("缓冲流使用数组复制时间:"+(end - start)+" 毫秒");
    }
}
```



### 5.3 字符缓冲流特有方法

字符缓冲流的基本方法与普通字符流调用方式一致，不再阐述，我们来看它们具备的特有方法。

* BufferedReader：`public String readLine()`: 读一行文字。
* BufferedWriter：`public void newLine()`: 写一行行分隔符,由系统属性定义符号。

```java
package com.Leo.buffer;

import org.junit.Test;

import java.io.*;

public class BufferedIOLine {
    @Test
    public void testReadLine()throws IOException {
        // 创建流对象
        BufferedReader br = new BufferedReader(new FileReader("in.txt"));
        // 定义字符串,保存读取的一行文字
        String line;
        // 循环读取,读取到最后返回null
        while ((line = br.readLine())!=null) {
            System.out.println(line);
        }
        // 释放资源
        br.close();
    }

    @Test
    public void testNewLine()throws IOException{
        // 创建流对象
        BufferedWriter bw = new BufferedWriter(new FileWriter("out.txt"));
        // 写出数据
        bw.write("程");
        // 写出换行
        bw.newLine();
        bw.write("序");
        bw.newLine();
        bw.write("员");
        bw.newLine();
        // 释放资源
        bw.close();
    }
}

```



### 5.4 流的关闭顺序

```java
package com.Leo.buffer;

import org.junit.Test;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class IOClose {
    @Test
    public void test01() throws IOException {
        FileWriter fw = new FileWriter("d:/1.txt");
        BufferedWriter bw = new BufferedWriter(fw);

        bw.write("hello");

        fw.close();
        bw.close();//java.io.IOException: Stream closed
        /*
        缓冲流BufferedWriter，把数据先写到缓冲区，
        默认情况下是当缓冲区满，或调用close，或调用flush这些情况才会把缓冲区的数据输出。

        bw.close()时，需要把数据从缓冲区的数据输出。

        数据的流向： 写到bw（缓冲区）-->fw ->"d:/1.txt"
        此时，我先把fw关闭了，bw的数据无法输出了
         */
    }

    @Test
    public void test02() throws IOException {
        FileWriter fw = new FileWriter("d:/1.txt");
        BufferedWriter bw = new BufferedWriter(fw);

        bw.write("hello");

        bw.close();
        fw.close();
        /*
        原则：
        先关外面的，再关里面的。

        例如：
        FileWriter fw = new FileWriter("d:/1.txt"); //里面        穿内衣
        BufferedWriter bw = new BufferedWriter(fw); //外面        穿外套

        关闭
        bw.close();  //先关外面的                                先脱外套
        fw.close(); //再关里面的                                 再脱内衣
         */
    }
}
```





## 6.其他内容

### 6.1 位、字节、字符

字节(Byte)是计量单位，表示数据量多少，是计算机信息技术用于计量存储容量的一种计量单位，通常情况下一字节等于八位。

字符(Character)计算机中使用的字母、数字、字和符号，比如’A’、‘B’、’$’、’&'等。

一般在英文状态下一个字母或字符占用一个字节，一个汉字用两个字节表示。

字节与字符：

- ASCII 码中，一个英文字母（不分大小写）为一个字节，一个中文汉字为两个字节。
- UTF-8 编码中，一个英文字为一个字节，一个中文为三个字节。
- Unicode 编码中，一个英文为一个字节，一个中文为两个字节。
- 符号：英文标点为一个字节，中文标点为两个字节。例如：英文句号 . 占1个字节的大小，中文句号 。占2个字节的大小。
- UTF-16 编码中，一个英文字母字符或一个汉字字符存储都需要 2 个字节（Unicode 扩展区的一些汉字存储需要 4 个字节）。
- UTF-32 编码中，世界上任何字符的存储都需要 4 个字节。



### 6.2 IO流效率对比

首先，对比下普通字节流和缓冲字节流的效率：

```java
public class MyTest {
	public static void main(String[] args) throws IOException {
		File file = new File("E:/2023-IO/test.txt");
		StringBuilder sb = new StringBuilder();

		for (int i = 0; i < 3000000; i++) {
			sb.append("abcdefghigklmnopqrstuvwsyz");
		}
		byte[] bytes = sb.toString().getBytes();

		long start = System.currentTimeMillis();
		write(file, bytes);
		long end = System.currentTimeMillis();

		long start2 = System.currentTimeMillis();
		bufferedWrite(file, bytes);
		long end2 = System.currentTimeMillis();

		System.out.println("普通字节流耗时：" + (end - start) + " ms");
		System.out.println("缓冲字节流耗时：" + (end2 - start2) + " ms");

	}

	// 普通字节流
	public static void write(File file, byte[] bytes) throws IOException {
		OutputStream os = new FileOutputStream(file);
		os.write(bytes);
		os.close();
	}

	// 缓冲字节流
	public static void bufferedWrite(File file, byte[] bytes) throws IOException {
		BufferedOutputStream bo = new BufferedOutputStream(new FileOutputStream(file));
		bo.write(bytes);
		bo.close();
	}
}
```

运行结果：

~~~java
普通字节流耗时：250 ms
缓冲字节流耗时：268 ms
~~~

这个结果让我大跌眼镜，不是说好缓冲流效率很高么？要知道为什么，只能去源码里找答案了。翻看字节缓冲流的write方法：

~~~java
public synchronized void write(byte b[], int off, int len) throws IOException {
    if (len >= buf.length) {
        /* If the request length exceeds the size of the output buffer,
           flush the output buffer and then write the data directly.
           In this way buffered streams will cascade harmlessly. */
        flushBuffer();
        out.write(b, off, len);
        return;
    }
    if (len > buf.length - count) {
        flushBuffer();
    }
    System.arraycopy(b, off, buf, count, len);
    count += len;
}

~~~

注释里说得很明白：如果请求长度超过输出缓冲区的大小，刷新输出缓冲区，然后直接写入数据。这样，缓冲流将无害地级联。

但是，至于为什么这么设计，我没有想明白，有哪位明白的大佬可以留言指点一下。

基于上面的情形，要想对比普通字节流和缓冲字节流的效率差距，就要避免直接读写较长的字符串，于是，设计了下面这个对比案例：用字节流和缓冲字节流分别复制文件。



```java
public class MyTest {
	public static void main(String[] args) throws IOException {
		File data = new File("C:/Mu/data.zip");
		File a = new File("C:/Mu/a.zip");
		File b = new File("C:/Mu/b.zip");

		StringBuilder sb = new StringBuilder();

		long start = System.currentTimeMillis();
		copy(data, a);
		long end = System.currentTimeMillis();

		long start2 = System.currentTimeMillis();
		bufferedCopy(data, b);
		long end2 = System.currentTimeMillis();

		System.out.println("普通字节流耗时：" + (end - start) + " ms");
		System.out.println("缓冲字节流耗时：" + (end2 - start2) + " ms");
	}

	// 普通字节流
	public static void copy(File in, File out) throws IOException {
		// 封装数据源
		InputStream is = new FileInputStream(in);
		// 封装目的地
		OutputStream os = new FileOutputStream(out);
		
		int by = 0;
		while ((by = is.read()) != -1) {
			os.write(by);
		}
		is.close();
		os.close();
	}

	// 缓冲字节流
	public static void bufferedCopy(File in, File out) throws IOException {
		// 封装数据源
		BufferedInputStream bi = new BufferedInputStream(new FileInputStream(in));
		// 封装目的地
		BufferedOutputStream bo = new BufferedOutputStream(new FileOutputStream(out));
		
		int by = 0;
		while ((by = bi.read()) != -1) {
			bo.write(by);
		}
		bo.close();
		bi.close();
	}
}
```

运行结果：

~~~bash
普通字节流耗时：184867 ms
缓冲字节流耗时：752 ms
~~~

这次，普通字节流和缓冲字节流的效率差异就很明显了，达到了245倍。

再看看字符流和缓冲字符流的效率对比：



```java
public class IOTest {
	public static void main(String[] args) throws IOException {
		// 数据准备
		dataReady();

		File data = new File("C:/Mu/data.txt");
		File a = new File("C:/Mu/a.txt");
		File b = new File("C:/Mu/b.txt");
		File c = new File("C:/Mu/c.txt");

		long start = System.currentTimeMillis();
		copy(data, a);
		long end = System.currentTimeMillis();

		long start2 = System.currentTimeMillis();
		copyChars(data, b);
		long end2 = System.currentTimeMillis();

		long start3 = System.currentTimeMillis();
		bufferedCopy(data, c);
		long end3 = System.currentTimeMillis();

		System.out.println("普通字节流1耗时：" + (end - start) + " ms,文件大小：" + a.length() / 1024 + " kb");
		System.out.println("普通字节流2耗时：" + (end2 - start2) + " ms,文件大小：" + b.length() / 1024 + " kb");
		System.out.println("缓冲字节流耗时：" + (end3 - start3) + " ms,文件大小：" + c.length() / 1024 + " kb");
	}

	// 普通字符流不使用数组
	public static void copy(File in, File out) throws IOException {
		Reader reader = new FileReader(in);
		Writer writer = new FileWriter(out);

		int ch = 0;
		while ((ch = reader.read()) != -1) {
			writer.write((char) ch);
		}
		reader.close();
		writer.close();
	}

	// 普通字符流使用字符流
	public static void copyChars(File in, File out) throws IOException {
		Reader reader = new FileReader(in);
		Writer writer = new FileWriter(out);

		char[] chs = new char[1024];
		while ((reader.read(chs)) != -1) {
			writer.write(chs);
		}
		reader.close();
		writer.close();
	}

	// 缓冲字符流
	public static void bufferedCopy(File in, File out) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader(in));
		BufferedWriter bw = new BufferedWriter(new FileWriter(out));

		String line = null;
		while ((line = br.readLine()) != null) {
			bw.write(line);
			bw.newLine();
			bw.flush();
		}

		// 释放资源
		bw.close();
		br.close();
	}

	// 数据准备
	public static void dataReady() throws IOException {
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < 600000; i++) {
			sb.append("abcdefghijklmnopqrstuvwxyz");
		}
		OutputStream os = new FileOutputStream(new File("C:/Mu/data.txt"));
		os.write(sb.toString().getBytes());

		os.close();
		System.out.println("完毕");
	}
}

```

运行结果：

~~~java
普通字符流1耗时：1337 ms,文件大小：15234 kb
普通字符流2耗时：82 ms,文件大小：15235 kb
缓冲字符流耗时：205 ms,文件大小：15234 kb
~~~



**测试多次，结果差不多，可见字符缓冲流效率上并没有明显提高，我们更多的是要使用它的readLine()和newLine()方法。**



## 7.重新认识System.out和Scanner

### 7.1 PrintStream类

我们每天都在用的System.out对象是PrintStream类型的。它也是IO流对象。

`PrintStream`  为其他输出流添加了功能，使它们能够方便地打印各种数据值表示形式。它还提供其他两项功能。与其他输出流不同，`PrintStream`  永远不会抛出

`IOException`；另外，`PrintStream` 可以设置自动刷新。

- PrintStream(File file) ：创建具有指定文件且不带自动行刷新的新打印流。

- PrintStream(File file, String csn)：创建具有指定文件名称和字符集且不带自动行刷新的新打印流。

- PrintStream(OutputStream out) ：创建新的打印流。

- PrintStream(OutputStream out, boolean autoFlush)：创建新的打印流。 autoFlush如果为 true，则每当写入 byte 数组、调用其中一个

  println 方法或写入换行符或字节 ('\n') 时都会刷新输出缓冲区。

- PrintStream(OutputStream out, boolean autoFlush, String encoding) ：创建新的打印流。

- PrintStream(String fileName)：创建具有指定文件名称且不带自动行刷新的新打印流。

- PrintStream(String fileName, String csn) ：创建具有指定文件名称和字符集且不带自动行刷新的新打印流。



```java
package com.Leo.io.print;

import org.junit.jupiter.api.Test;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/9/25/025 15:26
 * @description : PrintWriter 打印流的基本操作
 */
public class PrintWriter01 {


    /**
    * 用于测试:PrintWriter 打印流的基本操作
    */
    @Test
    public void testPrintWriter01() throws IOException {
        PrintWriter pw1  = new PrintWriter(new FileOutputStream("e:/2023-io/pw.txt"));

        PrintWriter pw2  = new PrintWriter(Files.newOutputStream(Paths.get("e:/2023-io/pw.txt")));
        pw2.write("Leo 你好");
        pw2.close();

    }


    /**
    * 用于测试: PrintWriter
    */
    @Test
    public void testPrintWriter02() throws IOException {
        PrintWriter pw = new PrintWriter(System.out);
        pw.write("Leo 你好");
        pw.close();

    }
}

```



### 7.2 Scanner类

构造方法

* Scanner(File source) ：构造一个新的 Scanner，它生成的值是从指定文件扫描的。
* Scanner(File source, String charsetName) ：构造一个新的 Scanner，它生成的值是从指定文件扫描的。
* Scanner(InputStream source) ：构造一个新的 Scanner，它生成的值是从指定的输入流扫描的。
* Scanner(InputStream source, String charsetName) ：构造一个新的 Scanner，它生成的值是从指定的输入流扫描的。

常用方法：

* boolean hasNextXxx()： 如果通过使用nextXxx()方法，此扫描器输入信息中的下一个标记可以解释为默认基数中的一个 Xxx 值，则返回 true。
* Xxx nextXxx()： 将输入信息的下一个标记扫描为一个Xxx

```java
package com.Leo.io.print;

import org.junit.Test;

import java.io.*;
import java.util.Scanner;

public class TestScanner {

    @Test
    public void test01() throws IOException {
        Scanner input = new Scanner(System.in);
        PrintStream ps = new PrintStream("1.txt");
        while(true){
            System.out.print("请输入一个单词：");
            String str = input.nextLine();
            if("stop".equals(str)){
                break;
            }
            ps.println(str);
        }
        input.close();
        ps.close();
    }
    
    @Test
    public void test2() throws IOException {
        Scanner input = new Scanner(new FileInputStream("1.txt"));
        while(input.hasNextLine()){
            String str = input.nextLine();
            System.out.println(str);
        }
        input.close();
    }
}
```



### 7.3 System类的三个IO流对象

System类中有三个常量对象：

- System.out
- System.in
- System.err

查看System类中这三个常量对象的声明：

```java
public final static InputStream in = null;
public final static PrintStream out = null;
public final static PrintStream err = null;
```

奇怪的是，

- 这三个常量对象有final声明，但是却初始化为null。final声明的常量一旦赋值就不能修改，那么null不会空指针异常吗？
- 这三个常量对象为什么要小写？final声明的常量按照命名规范不是应该大写吗？
- 这三个常量的对象有set方法？final声明的常量不是不能修改值吗？set方法是如何修改它们的值的？

```java
final声明的常量，表示在Java的语法体系中它们的值是不能修改的，而这三个常量对象的值是由C/C++等系统函数进行初始化和修改值的，所以它们故意没有用大写，也有set方法。
```

```java
    public static void setOut(PrintStream out) {
        checkIO();
        setOut0(out);
    }
    public static void setErr(PrintStream err) {
        checkIO();
        setErr0(err);
    }
    public static void setIn(InputStream in) {
        checkIO();
        setIn0(in);
    }
    private static void checkIO() {
        SecurityManager sm = getSecurityManager();
        if (sm != null) {
            sm.checkPermission(new RuntimePermission("setIO"));
        }
    }
    private static native void setIn0(InputStream in);
    private static native void setOut0(PrintStream out);
    private static native void setErr0(PrintStream err);
```



## 8. 文件操作

### 8.1什么是文件

**计算机文件、文件**（英语：computer file，台湾叫作**电脑档案、档案**）是存储在某种长期储存设备或临时储存装置中的一段数据流，并且归属于计算机文件系统管理之下。所谓“长期储存设备”一般指[磁盘](https://zh.wikipedia.org/wiki/磁碟)、[光盘](https://zh.wikipedia.org/wiki/光盘)、[磁带 ](https://zh.wikipedia.org/wiki/磁带)等。而“短期存储装置”一般指 [电脑记忆体](https://zh.wikipedia.org/wiki/计算机内存)。需要注意的是，储存于长期存储装置的文件不一定是长期储存的，有些也可能是程序或系统运行中产生的临时数据，并于程序或系统退出后删除。



### 8.2Java中的文件类File

在 [Java](http://c.biancheng.net/java/) 中，File 类是 java.io 包中唯一代表磁盘文件本身的对象，也就是说，如果希望在程序中操作文件和目录，则都可以通过 File 类来完成。File 类定义了一些方法来操作文件，如新建、删除、重命名文件和目录等。

File 类不能访问文件内容本身，如果需要访问文件内容本身，则需要使用输入/输出流。

File 类提供了如下三种形式构造方法。

1. File(String path)：如果 path 是实际存在的路径，则该 File 对象表示的是目录；如果 path 是文件名，则该 File 对象表示的是文件。
2. File(String path, String name)：path 是路径名，name 是文件名。
3. File(File dir, String name)：dir 是路径对象，name 是文件名。



### 8.3常用的文件操作

使用任意一个构造方法都可以创建一个 File 对象，然后调用其提供的方法对文件进行操作。在表 1 中列出了 File 类的常用方法及说明。

![image-20230927135314852](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309271353001.png)

#### 1.创建文件对象相关构造器和方法

`相关方法`

new File(String pathname)/ **根据路径构建一个File对象**
new File(File parent,String child)/ **根据父目录文件+子路径构建**
new File(String parent,,String child)/ **根据父目录+子路径构建**
createNewFile / **建新文件**

```java
/**
    * 用于测试: 创建一个文件
    */
    @Test
    public void test01()
    {
        File file = new File("e://2023-File.txt");
        try {
            file.createNewFile();
            System.out.println("创建成功!");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
```



#### 2.获取文件的相关信息

我们点进去File类的源码可以看到有很多可以操作相关信息的方法。

![image-20230927140028965](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309271400124.png)



#### 3.应用案例演示

下面我们来写两个小案例来实操一下。

```java
    /**
    * 用于测试: 文件基本信息
    */
    @Test
    public void testInfo01()
    {

        File file = new File("E:/terrence/焊缝管口/焊缝管口数据表.txt");
        System.out.println("文件的名称: " + file.getName());
        System.out.println("文件绝对路径: " + file.getAbsolutePath());
        System.out.println("文件的父路径: " + file.getParentFile());
        System.out.println("文件父级目录: " + file.getParent());
        System.out.println("文件大小(字节):" + file.length());
        System.out.println("文件是否存在 :" + file.exists());
        System.out.println("是不是一个文件 :" + file.isFile());
        System.out.println("是不是一个目录 :" + file.isDirectory());
    }
```



```java
 /**
     * 用于测试: 文件基本信息
     */
    @Test
    public void testInfo02()
    {

        File f = new File("E:/tr23ence/焊缝管口/焊缝管口数据表.txt");
        System.out.println("============================================");
        System.out.println("文件长度：" + f.length() + "字节");
        System.out.println("文件或者目录：" + (f.isFile() ? "是文件" : "不是文件"));
        System.out.println("文件或者目录：" + (f.isDirectory() ? "是目录" : "不是目录"));
        System.out.println("是否可读：" + (f.canRead() ? "可读取" : "不可读取"));
        System.out.println("是否可写：" + (f.canWrite() ? "可写入" : "不可写入"));
        System.out.println("是否隐藏：" + (f.isHidden() ? "是隐藏文件" : "不是隐藏文件"));
        System.out.println("最后修改日期：" + new Date(f.lastModified()));
        System.out.println("文件名称：" + f.getName());
        System.out.println("文件路径：" + f.getPath());
        System.out.println("绝对路径：" + f.getAbsolutePath());
    }
```

最终运行效果如下所示：

![image-20230927140456933](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202309271404199.png)



#### 4.目录的操作和文件删除

1) 判断e:\news1.txt是否存在，如果存在就删除
2) 判断e:demo02是否存在，存在就删除，否则提示不存在，
3) 判断e:/Java-2023/Leo/test目录是否存在，如果存在就提示已经存在，否则就创建

```java
package com.Leo.io;

import org.junit.jupiter.api.Test;

import java.io.File;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/9/24/024 19:22
 * @description : 目录信息
 */
public class DirectoryInformation {

    public static void main(String[] args) {

    }



    /**
    * 用于测试: 文件小练习
    */
    @Test
    public void testFile()
    {
        File file = new File("e:/2023-File.txt");
        if (file.exists())
        {
            if (file.delete())
            {
                System.out.println("文件删除成功!");
            }else
            {
                System.out.println("文件删除失败!");
            }
        }else
        {
            System.out.println("该文件不存在!");
        }

    }


    
    /**
    * 用于测试: 目录练习测试 注意： 删除目录的时候，目录下的有文件的时候会删除失败
    */
    @Test
    public void testDirectory()
    {
        File file = new File("e:/2023");
        if (file.exists())
        {
            if (file.delete())
            {
                System.out.println("目录删除成功!");
            }else
            {
                System.out.println("目录删除失败!");
            }
        }else
        {
            System.out.println("该目录不存在!");
        }
    }



    /**
    * 用于测试: 判断 e:/Java-2023/Leo/test目录是否存在，如果存在就提示已经存在，否则就创建
    */
    @Test
    public void test()
    {
        File file = new File("e:/Java-2023/Leo/test");
        if (file.exists())
        {
            System.out.println("目录已存在!");
        }else
        {
            if (file.mkdirs())
            {
                System.out.println("目录创建成功!");
            }else
            {
               System.out.println("目录创建失败!");
            }
        }
    }
    
}

```

运行程序之后可以发现，在 E 盘中已经创建好了 test.txt 文件。但是如果在不同的操作系统中，路径的分隔符是不一样的，例如：

- Windows 中使用反斜杠 `\` 表示目录的分隔符。
- Linux 中使用正斜杠 `/ `表示目录的分隔符。

注意：在操作文件时一定要使用 File.separator 表示分隔符。在程序的开发中，往往会使用 Windows 开发环境，因为在 Windows 操作系统中支持的开发工具较多，使用方便，而在程序发布时往往是直接在 Linux 或其它操作系统上部署，所以这时如果不使用 File.separator，则程序运行就有可能存在问题。关于这一点我们在以后的开发中一定要有所警惕。



## 参考文章

- https://worktile.com/kb/p/52158
- https://pdai.tech/md/java/io/java-io-basic-category.html
- http://c.biancheng.net/view/1133.html
- https://zh.wikipedia.org/zh-hans/%E9%9B%BB%E8%85%A6%E6%AA%94%E6%A1%88

今天的知识分享就先到这里，关于IO流对于初学者还是有一些绕，还需大家多加练习，**实践出真知**。大家有什么其他问题，欢迎评论区讨论。



![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)