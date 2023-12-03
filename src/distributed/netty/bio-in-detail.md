---
title: Netty实战专栏 BIO详解
icon: circle-info
order: 3
tag:
  - Netty
category:
  - Netty
pageview: false
date: 2023-11-5 22:50:30
comment: false
---


# Netty实战专栏 | BIO详解



## 1.前言

大家好，我是Leo哥🫣🫣🫣，上一篇博客我们主要大致了解了一下Java中IO的演变历程，大体分为基础IO-->BIO-->NIO-->AIO这几个阶段，分部逐层递进。下面几个章节我们就要来聊聊这个变化。本节主要讨论关于BIO的知识。好了，话不多说让我们开始吧😎😎😎。



## 2.前置知识

在学习BIO之前，我们先了解一下IO相关的前置知识。

### 2.1阻塞IO和非阻塞IO

那什么是阻塞式 IO，什么是非阻塞 IO 呢？

**阻塞IO：**

在这种模型中，I/O 操作是阻塞的，即执行 I/O 操作时，线程会被阻塞，直到操作完成。在阻塞 I/O 模型中，每个连接都需要一个线程来处理。因此，对于大量并发连接的场景，阻塞 I/O 模型的性能较差。

在阻塞IO模型中，常见的阻塞操作包括从输入流中读取数据和向输出流中写入数据。例如，在读取文件内容时，程序会一直等待文件数据加载到内存中才能继续执行后续代码。同样地，向网络连接发送数据时，程序会一直等待数据发送完毕才能进行下一步操作。

阻塞IO的特点是简单直观，代码易于理解和编写。然而，它也存在一些潜在的问题。首先，如果IO操作时间较长（如读取大文件或网络延迟高），那么程序将会长时间地处于阻塞状态，影响整体的性能和响应性能。其次，阻塞IO模型通常是单线程的，即一次只能处理一个IO请求，这可能造成资源的浪费和效率低下。







![image-20231103133810095](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311031338172.png)



**非阻塞IO：**

为了解决阻塞IO模型的问题，Java引入了非阻塞IO（NIO）机制，使得程序能够在等待IO操作完成时继续执行其他任务，提高了系统的并发性能和响应速度。非阻塞IO模型使用选择器**(Selector)**来管理多个通道**(Channel)**，并通过轮询的方式检查通道上是否有可以进行IO操作的事件，从而实现高效的IO操作。

在这种模型中，I/O 操作不会阻塞线程。当数据尚未准备好时，I/O 调用会立即返回。线程可以继续执行其他任务，然后在适当的时候再次尝试执行 I/O 操作。非阻塞 I/O 模型允许单个线程同时处理多个连接，但可能需要在应用程序级别进行复杂的调度和管理。这种模型通常需要一个专门的线程来处理轮询操作。

**Java NIO(New IO)**库提供了非阻塞IO支持。在NIO中，数据传输通过缓冲区**(Buffer)**进行，而**通道(Channel)**则负责管理缓冲区和底层IO操作。其中，**选择器(Selector)**是实现非阻塞IO的关键组件之一。选择器可以注册多个通道，并监视它们上的IO事件，如读取、写入、连接等。通过轮询选择器上的事件，程序可以快速地响应IO事件，而不会被单个IO操作所阻塞。

与阻塞IO相比，非阻塞IO具有更高的并发性能和响应速度。非阻塞IO模型允许程序同时处理多个IO请求，并且可以在等待IO操作完成时继续执行其他任务，从而充分利用系统资源。然而，使用非阻塞IO也面临着更高的复杂性和编程难度，因为程序需要显式地处理缓冲区和事件轮询等细节。

![image-20231103134101127](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311031341228.png)





### 2.2同步IO和非同步IO

同步IO的概念是操作系统级别的IO了，若Java程序发起IO请求，若操作系统IO资源未准备好，同步IO不做出任何响应。而非同步IO则会返回一个标记，当IO资源准备完成后，再通过事件机制通知程序。

如下图所示，同步IO会因为IO资源未准备好而进入阻塞状态。







非同步IO则会通过事件机制，避免和操作系统级别的阻塞。



## 3.传统的BIO通信方式简介

以前大多数网络通信方式都是阻塞模式的，即:

- 客户端向服务器端发出请求后，客户端会一直等待(不会再做其他事情)，直到服务器端返回结果或者网络出现问题。
- 服务器端同样的，当在处理某个客户端A发来的请求时，另一个客户端B发来的请求会等待，直到服务器端的这个处理线程完成上一个处理。

![image-20231103135551587](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311031355714.png)



## 4.传统的BIO的问题

1. 低效率：在等待IO操作时，线程会一直处于阻塞状态，占用系统资源，无法响应其他请求。如果有大量的并发请求，那么线程将被频繁地切换，导致系统性能下降。
2. 编程复杂度高：由于每个连接都需要一个独立的线程来处理，因此需要管理大量的线程。而线程管理是一项非常复杂的任务，容易出错。
3. 可伸缩性差：由于每个连接都需要一个独立的线程来处理，线程数量可能会随着连接数的增加而急剧增加，导致系统崩溃或者性能急剧下降。
4. 不支持异步IO：BIO只支持同步阻塞IO模型，无法实现异步IO，而异步IO在处理高并发和大吞吐量的场景中具有重要意义。



## 4.BIO通信方式深入分析

### 4.1BIO的工作机制

![image-20231103140520774](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311031405854.png)



**对 BIO 编程流程的梳理**

1. 服务器端启动一个 ServerSocket，注册端口，调用accpet方法监听客户端的Socket连接。
2. 客户端启动 Socket对服务器进行通信，默认情况下服务器端需要对每个客户 建立一个线程与之通讯



### 4.2传统的BIO编程实例回顾

> 网络编程的基本模型是Client/Server模型，也就是两个进程之
> 间进行相互通信，其中服务端提供位置信（绑定IP地址和端口），
> 客户端通过连接操作向服务端监听的端口地址发起连接请
> 求，基于TCP协议下进行三次握手连接，连接成功后，双方
> 通过网络套接字（Socket）进行通信。
>
> 传统的同步阻塞模型开发中，服务端ServerSocket负责绑定
> IP地址，启动监听端口；客户端Socket负责发起连接操作。连
> 接成功后，双方通过输入和输出流进行同步阻塞式通信。 
> 基于BIO模式下的通信，**客户端 - 服务端**是完全**同步**，完全耦合的。	  



### 4.3多发多收案例

#### 1.客户端编写

```java
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.Socket;
/**
    目标: Socket网络编程。

    Java提供了一个包：java.net下的类都是用于网络通信。
    Java提供了基于套接字（端口）Socket的网络通信模式，我们基于这种模式就可以直接实现TCP通信。
    只要用Socket通信，那么就是基于TCP可靠传输通信。

    功能1：客户端发送一个消息，服务端接口一个消息，通信结束！！

    创建客户端对象：
        （1）创建一个Socket的通信管道，请求与服务端的端口连接。
        （2）从Socket管道中得到一个字节输出流。
        （3）把字节流改装成自己需要的流进行数据的发送
    创建服务端对象：
        （1）注册端口
        （2）开始等待接收客户端的连接,得到一个端到端的Socket管道
        （3）从Socket管道中得到一个字节输入流。
        （4）把字节输入流包装成自己需要的流进行数据的读取。

    Socket的使用：
        构造器：public Socket(String host, int port)
        方法：  public OutputStream getOutputStream()：获取字节输出流
               public InputStream getInputStream() :获取字节输入流

    ServerSocket的使用：
        构造器：public ServerSocket(int port)

    小结：
        通信是很严格的，对方怎么发你就怎么收，对方发多少你就只能收多少！！

 */
public class ClientDemo {
    public static void main(String[] args) throws Exception {
        System.out.println("==客户端的启动==");
        // （1）创建一个Socket的通信管道，请求与服务端的端口连接。
        Socket socket = new Socket("127.0.0.1",8888);
        // （2）从Socket通信管道中得到一个字节输出流。
        OutputStream os = socket.getOutputStream();
        // （3）把字节流改装成自己需要的流进行数据的发送
        PrintStream ps = new PrintStream(os);
        // （4）开始发送消息
        ps.println("我是客户端，我想约吃烤肉！！！");
        ps.flush();
    }
}

```



#### 2.服务端编写

```java
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * 服务端
 */
public class ServerDemo {
    public static void main(String[] args) throws Exception {
        System.out.println("==服务器的启动==");
        // （1）注册端口
        ServerSocket serverSocket = new ServerSocket(8888);
        //（2）开始在这里暂停等待接收客户端的连接,得到一个端到端的Socket管道
        Socket socket = serverSocket.accept();
        //（3）从Socket管道中得到一个字节输入流。
        InputStream is = socket.getInputStream();
        //（4）把字节输入流包装成自己需要的流进行数据的读取。
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        //（5）读取数据
        String line ;
        while((line = br.readLine())!=null){
            System.out.println("服务端收到："+line);
        }
    }
}

```



#### 3.小结

> 在以上通信中，服务端会一致等待客户端的消息，如果客户端没有进行消息的发送，服务端将一直进入阻塞状态。同时服务端是按照行获取消息的，这意味着客户端也必须按照行进行消息的发送，否则服务端将进入等待消息的阻塞状态！



### 4.4BIO模式下接收多个客户端

在上面的案例中，一个服务端只能接收到一个客户端传递过来的请求，那么如果服务端需要处理很多个客户端的消息通信请求应该如何处理呢，此时我们就需要在服务端引入线程了，也就是说客户端每发起一个请求，服务端就创建一个新的线程来处理这个客户端的请求，这样就实现了一个客户端一个线程的模型。

![image-20231103141359894](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311031414020.png)

下面我们通过编写代码案例进一步深入。

#### 1.服务端编写

```java
/**
    服务端
 */
public class ServerDemo {
    public static void main(String[] args) throws Exception {
        System.out.println("==服务器的启动==");
        // （1）注册端口
        ServerSocket serverSocket = new ServerSocket(7777);
        while(true){
            //（2）开始在这里暂停等待接收客户端的连接,得到一个端到端的Socket管道
            Socket socket = serverSocket.accept();
            new ServerReadThread(socket).start();
            System.out.println(socket.getRemoteSocketAddress()+"上线了！");
        }
    }
}
class ServerReadThread extends Thread{
    private Socket socket;

    public ServerReadThread(Socket socket){
        this.socket = socket;
    }

    @Override
    public void run() {
        try{
            //（3）从Socket管道中得到一个字节输入流。
            InputStream is = socket.getInputStream();
            //（4）把字节输入流包装成自己需要的流进行数据的读取。
            BufferedReader br = new BufferedReader(new InputStreamReader(is));
            //（5）读取数据
            String line ;
            while((line = br.readLine())!=null){
                System.out.println("服务端收到："+socket.getRemoteSocketAddress()+":"+line);
            }
        }catch (Exception e){
            System.out.println(socket.getRemoteSocketAddress()+"下线了！");
        }
    }
}
```



#### 2.客户端编写

```java
/**
    目标: Socket网络编程。

    功能1：客户端可以反复发，一个服务端可以接收无数个客户端的消息！！

    小结：
         服务器如果想要接收多个客户端，那么必须引入线程，一个客户端一个线程处理！！

 */
public class ClientDemo {
    public static void main(String[] args) throws Exception {
        System.out.println("==客户端的启动==");
        // （1）创建一个Socket的通信管道，请求与服务端的端口连接。
        Socket socket = new Socket("127.0.0.1",7777);
        // （2）从Socket通信管道中得到一个字节输出流。
        OutputStream os = socket.getOutputStream();
        // （3）把字节流改装成自己需要的流进行数据的发送
        PrintStream ps = new PrintStream(os);
        // （4）开始发送消息
        Scanner sc = new Scanner(System.in);
        while(true){
            System.out.print("请说:");
            String msg = sc.nextLine();
            ps.println(msg);
            ps.flush();
        }
    }
}
```

**注意：**

1. 每个Socket接收到，都会创建一个线程，线程的竞争、切换上下文影响性能。
2. 每个线程都会占用栈空间和CPU资源。
3. 并不是每个socket都进行IO操作，无意义的线程处理。
4. 客户端的并发访问增加时。服务端将呈现1:1的线程开销，访问量越大，系统将发生线程栈溢出，线程创建失败，最终导致进程宕机或者僵死，从而不能对外提供服务。



### 4.4Java BIO模式下的端口转发思想

**需要实现一个客户端的消息可以发送给所有的客户**

![image-20231103142118923](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311031421989.png)



#### 1.客户端代码编写

```java
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.Socket;
import java.util.Scanner;
public class Client {
    public static void main(String[] args) {
        try {
            //1.请求与服务端的Socket对象连接
            Socket socket = new Socket("127.0.0.1", 9999);
            //收消息
            Thread clientThread = new ClientReaderThread(socket);
            clientThread.start();
            while (true) {
                //发消息
                OutputStream os = socket.getOutputStream();
                PrintStream ps = new PrintStream(os);
                //3. 使用循环不断的发送消息给服务端接收
                Scanner sc = new Scanner(System.in);
                //System.out.print("client send message：");
                String msg = sc.nextLine();
                ps.println(msg);
                ps.flush();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



#### 2.客户端线程处理类

```java
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Socket;
public class ClientReaderThread extends Thread {
    private Socket socket;
    public ClientReaderThread(Socket socket) {
        this.socket = socket;
    }
    @Override
    public void run() {
        try {
            while (true) {
                InputStream is = socket.getInputStream();
                //4.把字节输入流包装成一个缓存字符输入流
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                String msg;
                if ((msg = br.readLine()) != null) {
                    System.out.println(msg);
                }
            }
        } catch (Exception e) {
        }
    }
}
```



#### 3.服务端代码编写

```java
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
/**
 * 目标：BIO模式下的端口转发思想-服务端实现
 * 服务端实现需求：
 * 1.注册端口
 * 2.接收客户端的socket连接，交给一个独立的线程来处理
 * 3.把当前连接的客户端socket存入到一个所谓的在线socket集合中保存
 * 4.接收客户端的消息，然后推动给当前所有的在线socket接收
 */
public class Server {
    //定义一个静态集合
    public static List<Socket> allSocketOnLine = new ArrayList<>();
    public static void main(String[] args) {
        try {
            ServerSocket ss = new ServerSocket(9999);
            while (true) {
                Socket socket = ss.accept();
                //把登录的客户端socket存入到一个在线集合中去
                allSocketOnLine.add(socket);
                //为当前登录成功的socket分配一个独立的线程来处理与之通信
                new ServerReaderThread(socket).start();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



#### 4.服务端线程处理类

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;
public class ServerReaderThread extends Thread {
    private Socket socket;
    public ServerReaderThread(Socket socket) {
        this.socket = socket;
    }
    @Override
    public void run() {
        try {
            //1.从socket中去获取当前客户端的输入流
            BufferedReader br = new BufferedReader(new
                    InputStreamReader(socket.getInputStream()));
            String msg;
            while ((msg = br.readLine()) != null) {
                System.out.println("服务器收到消息：" + msg);
                //2.服务端接收到了客户端的消息后，需要推送给所有的当前在线的socket
                sendMsgToAllClient(msg, socket);
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("当前有人下线了！");
            //从在线socket集合中移除本socket
            Server.allSocketOnLine.remove(socket);
        }
    }
    /**
     * 把当前客户端发送来的消息推送给全部在线的socket
     *
     * @param msg
     */
    private void sendMsgToAllClient(String msg, Socket socket) throws Exception {
        for (Socket sk : Server.allSocketOnLine) {
            //只发送给除自己以外的其他客户端
            if (socket != sk) {
                PrintStream ps = new PrintStream(sk.getOutputStream());
                ps.println(msg);
                ps.flush();
            }
        }
    }
}
```



#### 测试

先启动服务端再启动客户端

```markdown
服务器收到消息：大家好，我是客户端一
服务器收到消息：哈哈哈哈
服务器收到消息：大家好，我是client2
服务器收到消息：嘻嘻嘻嘻
服务器收到消息：hello everyone
服务器收到消息：i am client3
    
#客户端一
大家好，我是客户端一 --发送
哈哈哈哈 --发送
大家好，我是client2 --接收
嘻嘻嘻嘻 --接收
hello everyone --接收
i am client3 --接收
    
#客户端二
大家好，我是客户端一 --接收
哈哈哈哈 --接收
大家好，我是client2 --发送
嘻嘻嘻嘻 --发送
hello everyone --接收
i am client3 --接收
    
#客户端三
大家好，我是客户端一 --接收
哈哈哈哈 --接收
大家好，我是client2 --接收
嘻嘻嘻嘻 --接收
hello everyone --发送
i am client3 --发送
```

## 5.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。



![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)