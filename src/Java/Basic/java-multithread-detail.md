---
title: Java基础篇 多线程详解
icon: circle-info
order: 6
category:
  - Java☕
tag:
  - Java☕
pageview: false
date: 2023-11-05 23:10:30
comment: false
breadcrumb: false
---

# Java基础篇 | 多线程详解



**思维导图**

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311042111731.png)

## 1.前言

> 大家好，我是Leo哥🫣🫣🫣，在Java的开发中，处处都会用到多线程，现在开发大多都会使用到Spring的框架，里面就封装了很多多线程相关的代码，只是我们在平时的开发中感受不到,比如tomcat的连接池就使用到了线程池技术，所以了解Java多线程是学习Java至关重要的一步！好了，话不多说让我们开始吧😎😎😎。
>



## 2.相关概念

在此正式学习之前，我们先了解一下有关线程和进程的相关概念。

### 2.1进程(Process)

#### 2.1.1进程

- 进程是计算机中正在运行的程序的实例。每个进程都有自己独立的内存空间和系统资源，例如CPU、内存、文件句柄等。进程之间是相互独立的，它们不能直接访问其他进程的内存空间和资源。进程是操作系统进行资源分配和调度的基本单位。
- 在一个操作系统中，可以同时运行多个进程。操作系统会为每个进程分配一定的资源，例如内存、CPU时间片等，并根据进程的优先级和调度算法来进行资源分配和调度，以保证各个进程都能够得到合理的资源使用并且不会相互干扰。、

**简单来说：进程就是一个正在进行的一个过程或者是一个任务。而负责执行任务的则是CPU。**



#### 2.1.2进程与程序的区别

程序仅仅只是一堆代码而已，而进程指的是程序的运行过程。

> 举例：
>
> 想象一位有一手好厨艺的计算机科学家egon正在为他的女儿元昊烘制生日蛋糕。
>
> 他有做生日蛋糕的食谱，
>
> 厨房里有所需的原料:面粉、鸡蛋、韭菜，蒜泥等。

在这个比喻中：

- 做蛋糕的食谱就是程序(即用适当形式描述的算法)

- 计算机科学家就是处理器(cpu)

- 而做蛋糕的各种原料就是输入数据。

- 进程就是厨师阅读食谱、取来各种原料以及烘制蛋糕等一系列动作的总和。

现在假设计算机科学家egon的儿子alex哭着跑了进来，说：Hey, Dad, my head got stung by a bee.

科学家egon想了想，处理儿子alex蛰伤的任务比给女儿元昊做蛋糕的任务更重要，于是

计算机科学家就记录下他照着食谱做到哪儿了(保存进程的当前状态)，然后拿出一本急救手册，按照其中的指示处理蛰伤。

这里，我们看到处理机从一个进程(做蛋糕)切换到另一个高优先级的进程(实施医疗救治)，每个进程拥有各自的程序(食谱和急救手册)。

当蜜蜂蛰伤处理完之后，这位计算机科学家又回来做蛋糕，从他离开时的那一步继续做下去。

**需要强调的是：同一个程序执行两次，那也是两个进程，比如打开暴风影音，虽然都是同一个软件，但是一个可以播放苍井空，一个可以播放饭岛爱。**



### 2.2线程(Thread)

#### 2.2.1线程

- 线程是进程内的执行单元。一个进程中可以包含多个线程。不同线程之间共享进程的资源，例如内存空间和文件句柄等。线程是操作系统进行并发处理的基本单位。

- 在一个线程中，可以执行一些具体的任务或者操作。线程之间是可以并发执行的，在多核CPU上可以实现真正的并行处理。但是，由于线程之间共享进程的资源，所以线程之间需要保证数据的同步和互斥，否则会导致数据不一致或者竞态条件等问题。



#### 2.2.2线程的六种状态及转化：

`ava.lang.Thread.State`枚举类中定义了六种线程的状态，可以调用线程Thread中的`getState()`方法**获取当前线程的状态**。

| 线程状态      | 解释                                                         |
| :------------ | :----------------------------------------------------------- |
| NEW           | 尚未启动的线程状态，即线程创建，**还未调用start方法**        |
| RUNNABLE      | **就绪状态**（调用start，等待调度）+**正在运行**             |
| BLOCKED       | **等待监视器锁**时，陷入阻塞状态                             |
| WAITING       | 等待状态的线程正在**等待**另一线程执行特定的操作（如notify） |
| TIMED_WAITING | 具有**指定等待时间**的等待状态                               |
| TERMINATED    | 线程完成执行，**终止状态**                                   |

![image-20231104211927200](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311042119289.png)



##### 1.新建状态(NEW)

即用**new关键字**新建一个线程，这个线程就处于**新建状态**。

##### 2.运行状态(RUNNABLE)

操作系统中的就绪和运行两种状态，在Java中统称为RUNNABLE。

**就绪状态（READY)**

当线程对象调用了`start()`方法之后，线程处于**就绪状态**，就绪意味着该线程**可以执行**，但具体啥时候执行将取决于JVM里线程调度器的调度。

> It is never legal to start a thread more than once. In particular, a thread may not be restarted once it has completed execution.

- 不允许对一个线程多次使用start。
- 线程执行完成之后，不能试图用start将其唤醒。

##### 4.其他状态 ->就绪

- 线程调用start()，新建状态转化为就绪状态。
- 线程sleep(long)时间到，等待状态转化为就绪状态。
- 阻塞式IO操作结果返回，线程变为就绪状态。
- 其他线程调用join()方法，结束之后转化为就绪状态。
- 线程对象拿到对象锁之后，也会进入就绪状态。

**运行状态(RUNNING)**

处于就绪状态的线程获得了CPU之后，**真正开始执行run()方法的线程执行体时**，意味着该线程就已经处于**运行状态**。需要注意的是，**对于单处理器，一个时刻只能有一个线程处于运行状态。**
对于抢占式策略的系统来说，系统会给每个线程一小段时间处理各自的任务。时间用完之后，系统负责夺回线程占用的资源。下一段时间里，系统会根据一定规则，再次进行调度。

**运行状态转变为就绪状态**的情形：

- 线程失去处理器资源。线程不一定完整执行的，执行到一半，说不定就被别的线程抢走了。
- 调用yield()静态方法，暂时暂停当前线程，让系统的线程调度器重新调度一次，它自己完全有可能再次运行。

**yield方法的官方解释：**

> A hint to the scheduler that the current thread is willing to yield its current use of a processor. The scheduler is free to ignore this hint.

提示调度程序，当前线程愿意放弃当前对处理器的使用。这时，**当前线程将会被置为就绪状态**，和其他线程一样等待调度，这时候根据不同**优先级**决定的**概率**，当前线程完全有可能再次抢到处理器资源。

##### 3.阻塞状态(BLOCKED)

阻塞状态表示线程**正等待监视器锁**，而陷入的状态。

以下场景线程将会阻塞：

- 线程等待进入synchronized同步方法。
- 线程等待进入synchronized同步代码块。

线程取得锁，就会从阻塞状态转变为就绪状态。

##### 5.等待状态(WAITING)

进入该状态表示**当前线程需要等待其他线程做出一些的特定的动作**（通知或中断）。

**运行->等待**

- 当前线程运行过程中，其他线程调用`join`方法，当前线程将会进入等待状态。
- 当前线程对象调用`wait()`方法。
  -`LockSupport.park()`：出于线程调度的目的**禁用当前线程**。

**等待->就绪**

- 等待的线程**被其他线程对象唤醒**，`notify()`和`notifyAll()`。
- `LockSupport.unpark(Thread)`，与上面park方法对应，给出许可证，**解除等待状态**。

##### 6.超时等待状态(TIMED_WAITING)

区别于`WAITING`，它可以在**指定的时间**自行返回。

**运行->超时等待**

- 调用静态方法，`Thread.sleep(long)`
- 线程对象调用`wait(long)`方法
- 其他线程调用指定时间的`join(long)`。
- `LockSupport.parkNanos()`。
- `LockSupport.parkUntil()`。

补充：
sleep和yield的不同之处：

- sleep(long)方法会**使线程转入超时等待状态**，时间到了之后才会转入就绪状态。而yield()方法不会将线程转入等待，而是强制线程进入就绪状态。
- 使用sleep(long)方法**需要处理异常**，而yield()不用。

**超时等待->就绪**

- 同样的，等待的线程被其他线程对象唤醒，`notify()`和`notifyAll()`。
- `LockSupport.unpark(Thread)`。

##### 6.消亡状态

即**线程的终止**，表示线程已经执行完毕。前面已经说了，已经消亡的线程不能通过start再次唤醒。

- run()和call()线程执行体中顺利执行完毕，**线程正常终止**。
- 线程抛出一个没有捕获的Exception或Error。

**需要注意的是：主线成和子线程互不影响，子线程并不会因为主线程结束就结束。**

**进程的一个实体，是CPU运行调度的基本单位，它是比进程更小的能独立运行的基本单位。线程自己基本上不拥有系统资源，只拥有一点在运行中必不可少的资源(如程序计数器,一组寄存器和栈)，但是它可与同属一个进程的其他的线程共享进程所拥有的全部资源。**

### 2.3并行和并发的理解

#### 1.并行

当系统有一个以上CPU时，当一个CPU执行一个进程时，另一个CPU可以执行另一个进程，两个进程互不抢占CPU资源，可以同时进行，这种方式我们称之为**并行(Parallel)**。

**并行：在同一时刻，有多个指令在多个CPU上同时执行。**

![image-20231104213305136](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311042133298.png)



#### 2.并发

当有多个线程在操作时，如果系统只有一个 CPU，则它根本不可能真正同时进行一个以上的线程，它只能把 CPU 运行时间划分成若干个时间段，再将时间段分配给各个线程执行，在一个时间段的线程代码运行时,其它线程处于挂起状态.这种方式我们称之为**并发(Concurrent)**。

**并发：在同一时刻，有多个指令在单个CPU上交替执行。**

![image-20231104213421307](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311042134435.png)

我们在使用电脑的时候，我们的计算机可以**同时运行**着看片软件和IDEA，我们可以边敲代码，边听音乐，计算机同时的在做多件事情。

在单核**CPU**的计算机中，我们似乎也能**同时**做这些事情，但这不是真正意义上的并行，其底层是由于CPU快速切换执行任务，给我们一种同时运行的错觉而已。

但是，当计算机是多核cpu的时候，当一个CPU执行一个进程时，另一个CPU可以执行另一个进程，两个进程互不抢占CPU资源，可以同时进行，这时候才是真正的**同时进行**，我们称之为**并行**。

就好比，一个网吧，它有多台电脑可以同时满足多位客户的上网需求，这就是并行，同时进行，互不争抢。

#### 3.并发和并行的区别

并发是指一个处理器同时处理多个任务，并行是指多个处理器或者是多核的处理器同时处理多个不同的任务。

**并发是逻辑上的同时发生，而并行是物理上的同时发生。**

并行在多处理器系统中存在，而并发可以在单处理器和多处理器系统中都存在，并发能够在单处理器系统中存在是因为并发是并行的假象，并行要求程序能够同时执行多个操作，而并发只是要求程序假装同时执行多个操作。

并发和并行两者的最大区别: **一个是交替执行,一个是同时执行**。

![image-20231104214921886](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311042149980.png)





## 3.背景

### 3.1为什么要使用多线程

在Java中使用多线程可以提高程序的并发性和性能。通过多线程可以将任务分解成多个独立的子任务，并让这些子任务并行执行，从而增加程序的吞吐量和响应性。下面通过一个实际案例来详细说明为什么要使用多线程。

假设我们有一个图片处理程序，需要对一系列图片进行处理，包括读取**图片、缩放、旋转、添加水印**等操作。如果采用单线程的方式进行处理，那么每张图片的处理都需要等待前一张图片的处理完成才能开始，这样就会导致整个处理过程非常耗时。

下面是为什么要使用多线程的几个常见原因：

1. **提高程序的响应性和并发性：** 多线程使得程序可以同时处理多个任务或请求，增强了程序的并发性和响应性。当一个线程执行耗时操作**(如网络请求、文件读写等)**时，其他线程可以继续执行，从而避免程序因为等待而被阻塞。
2. **充分利用多核处理器：** 现代计算机通常拥有多个处理核心，多线程可以将任务分配给不同的核心并发执行，提高计算机系统的利用率和性能。
3. **简化编程模型：** 多线程可以将复杂的任务分解为多个子任务，并发执行，使得程序结构更加清晰简洁。例如，在图形界面应用程序中，可以使用多线程来处理用户界面的响应和后台任务的执行，提升用户体验。
4. **资源共享和通信：** 多线程可以共享同一进程的内存空间，使得线程之间可以方便地共享数据和通信。这样可以避免复制大量数据或使用复杂的进程间通信机制。

现在我们可以利用多线程来优化这个过程，将每张图片的处理任务分解成多个子任务，每个子任务独立处理一张图片。每个子任务可以在一个独立的线程中执行，这样多个线程可以同时处理多张图片，提高整个处理过程的效率。



### 3.2多线程的好处

1. **提高程序的并发性和性能：** 多线程可以将任务分解成多个独立的子任务，并让这些子任务并行执行，从而充分利用 CPU 的多核处理能力，加快程序的运行速度。通过多线程可以实现高效的并发处理，提高系统的吞吐量和响应性。
2. **提高程序的稳定性和可靠性：** 多线程可以将程序分解成多个相对独立的模块，每个模块可以在独立的线程中运行，从而降低模块之间的耦合度，提高程序的灵活性、可维护性和可扩展性。同时，多线程可以防止单个线程崩溃导致整个程序崩溃的情况发生，提高程序的稳定性和可靠性。
3. **提高用户体验：** 多线程可以加快程序的响应速度，让用户的操作得到更快的反馈，提高用户体验。例如，在图形界面应用程序中，可以通过多线程的方式来加快图像处理、数据计算等操作，从而提高程序的响应速度和用户体验。
4. **便于任务管理和资源调度：** 多线程可以将任务分解成多个独立的线程，每个线程可以独立运行，从而便于任务的管理和资源的调度。例如，在多线程的 Web 服务器中，可以将每个请求分配给不同的线程进行处理，从而充分利用系统的资源，提高系统的并发处理能力。



## 4.实现多线程的几种方式以及方法应用

### 4.1继承Thread类

#### 1.方法介绍

| 方法名       | 说明                                        |
| ------------ | ------------------------------------------- |
| void run()   | 在线程开启后，此方法将被调用执行            |
| void start() | 使此线程开始执行，Java虚拟机会调用run方法() |

#### 2.实现步骤

- 定义一个类MyThread继承Thread类
- 在MyThread类中重写run()方法
- 创建MyThread类的对象
- 启动线程

#### 3.代码演示

```java
package org.javatop.thread;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-03 15:03
 * @description : 创建线程的第一种方式
 */
public class MyThread01  extends Thread{
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println( "子线程:" + i);
        }
    }
}



/**
     * 用于测试：线程创建的第一种方式
     */
    @Test
    public void test01() {
        Thread t1 = new MyThread01();
        t1.start();
        for (int i = 1; i <= 5; i++) {
            System.err.println("主线程:" + i);
        }
    }
```



#### 4.结果打印

![image-20231104220352276](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311042203378.png)

**可以看出来，主线程在和子线程抢占CPU的过程中，交替打印结果。**

#### 5.两个小问题

- 为什么要重写run()方法？

  因为run()是用来封装被线程执行的代码

- run()方法和start()方法的区别？

  run()：封装线程执行的代码，直接调用，相当于普通方法的调用

  start()：启动线程；然后由JVM调用此线程的run()方法



### 4.2实现Runnable接口

#### 1.方法介绍

| 方法名                               | 说明                   |
| ------------------------------------ | ---------------------- |
| Thread(Runnable target)              | 分配一个新的Thread对象 |
| Thread(Runnable target, String name) | 分配一个新的Thread对象 |

#### 2.实现步骤

- 定义一个类MyRunnable实现Runnable接口
- 在MyRunnable类中重写run()方法
- 创建MyRunnable类的对象
- 创建Thread类的对象，把MyRunnable对象作为构造方法的参数
- 启动线程

#### 3.代码演示

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-03 15:03
 * @description : 创建线程的第二种方式
 */
public class MyThread02 implements Runnable {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println( "主线程:" + i);
        }
    }
}


  /**
     * 用于测试: 创建线程的第二种方式
     */
    @Test
    public void test02() {
        // 创建线程对象
        Runnable runnable = new MyThread02();

        // 通过start方法启动
        new Thread(runnable).start();

        for (int i = 1; i <= 5; i++) {
            System.err.println("主线程:" + i);
        }
    }
```



#### 4.结果打印

![image-20231104220523892](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311042205009.png)

**可以看出来，主线程在和子线程抢占CPU的过程中，交替打印结果。**



### 4.3实现Callable接口

#### 1.方法介绍

[//]: # (| 方法名                           | 说明                                               |)

[//]: # (| -------------------------------- | -------------------------------------------------- |)

[//]: # (| V call&#40;&#41;                         | 计算结果，如果无法计算结果，则抛出一个异常         |)

[//]: # (| FutureTask&#40;Callable<V> callable&#41; | 创建一个 FutureTask，一旦运行就执行给定的 Callable |)

[//]: # (| V get&#40;&#41;                          | 如有必要，等待计算完成，然后获取其结果             |)

#### 2.实现步骤

- 定义一个类MyCallable实现Callable接口
- 在MyCallable类中重写call()方法
- 创建MyCallable类的对象
- 创建Future的实现类FutureTask对象，把MyCallable对象作为构造方法的参数
- 创建Thread类的对象，把FutureTask对象作为构造方法的参数
- 启动线程
- 再调用get方法，就可以获取线程结束之后的结果。

#### 3.代码演示

```java
package org.javatop.thread;
import java.util.concurrent.Callable;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-03 15:03
 * @description : 创建线程的第三种方式 实现 Callable接口
 */
public class MyThread03 implements Callable<String> {
    private int n;

    public MyThread03(int n) {
        this.n = n;
    }

    @Override
    public String call() throws Exception {
        int sum = 0;
        // 描述这个线程的任务和这个线程返回的结果
        for (int i = 0; i <= n; i++) {
            // 求1-n 的和
            sum += i;
        }
        return "线程求出来1-" + n + "的和为" + sum;
    }
}


	/**
     *  用于测试:创建线程的第三种方式 实现 Callable接口
     */
    @Test
    public void test04() throws ExecutionException, InterruptedException {

      Callable<String> callable = new  MyThread03(100);

        //创建未来任务对象 FutureTask实现类Runnable接口
        FutureTask<String> f1 =  new FutureTask<>(callable);
        new Thread(f1).start();


        //获取线程执行完毕之后的结果
        String sum = f1.get();
        System.out.println("sum = " + sum);
    }
```



#### 4.结果打印

![image-20231104220723455](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311042207566.png)



### 4.4设置和获取线程名称

#### 1.方法介绍

| 方法名                     | 说明                               |
| -------------------------- | ---------------------------------- |
| void  setName(String name) | 将此线程的名称更改为等于参数name   |
| String  getName()          | 返回此线程的名称                   |
| Thread  currentThread()    | 返回对当前正在执行的线程对象的引用 |



#### 2.代码演示

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-03 15:03
 * @description : 设置和获取线程名称
 */
public class MyThread extends Thread {
    public MyThread() {}
    public MyThread(String name) {
        super(name);
    }

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(getName()+":"+i);
        }
    }
}
public class MyThreadDemo {
    public static void main(String[] args) {
        MyThread my1 = new MyThread();
        MyThread my2 = new MyThread();

        //void setName(String name)：将此线程的名称更改为等于参数 name
        my1.setName("高铁");
        my2.setName("飞机");

        //Thread(String name)
        MyThread my1 = new MyThread("高铁");
        MyThread my2 = new MyThread("飞机");

        my1.start();
        my2.start();

        //static Thread currentThread() 返回对当前正在执行的线程对象的引用
        System.out.println(Thread.currentThread().getName());
    }
}
```



### 4.5线程休眠

#### 1.方法介绍

| 方法名                         | 说明                                             |
| ------------------------------ | ------------------------------------------------ |
| static void sleep(long millis) | 使当前正在执行的线程停留（暂停执行）指定的毫秒数 |

#### 2.代码演示

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-03 15:03
 * @description : 线程休眠
 */
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println(Thread.currentThread().getName() + "---" + i);
        }
    }
}
public class Demo {
    public static void main(String[] args) throws InterruptedException {
        /*System.out.println("睡觉前");
        Thread.sleep(3000);
        System.out.println("睡醒了");*/

        MyRunnable mr = new MyRunnable();

        Thread t1 = new Thread(mr);
        Thread t2 = new Thread(mr);

        t1.start();
        t2.start();
    }
}
```



### 4.6线程优先级

#### 1.线程调度

- 两种调度方式

  - 分时调度模型：所有线程轮流使用 CPU 的使用权，平均分配每个线程占用 CPU 的时间片
  - 抢占式调度模型：优先让优先级高的线程使用 CPU，如果线程的优先级相同，那么会随机选择一个，优先级高的线程获取的 CPU 时间片相对多一些

- Java使用的是抢占式调度模型

- 随机性

  假如计算机只有一个 CPU，那么 CPU 在某一个时刻只能执行一条指令，线程只有得到CPU时间片，也就是使用权，才可以执行指令。所以说多线程程序的执行是有随机性，因为谁抢到CPU的使用权是不一定的

  ![05_多线程示例图](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311042213403.png)

#### 2.优先级相关方法

| 方法名                                  | 说明                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| final int getPriority()                 | 返回此线程的优先级                                           |
| final void setPriority(int newPriority) | 更改此线程的优先级线程默认优先级是5；线程优先级的范围是：1-10 |

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-03 17:03
 * @description : 线程优先级
 */
public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        for (int i = 0; i < 100; i++) {
            System.out.println(Thread.currentThread().getName() + "---" + i);
        }
        return "线程执行完毕了";
    }
}
public class Demo {
    public static void main(String[] args) {
        //优先级: 1 - 10 默认值:5
        MyCallable mc = new MyCallable();

        FutureTask<String> ft = new FutureTask<>(mc);

        Thread t1 = new Thread(ft);
        t1.setName("飞机");
        t1.setPriority(10);
        //System.out.println(t1.getPriority());//5
        t1.start();

        MyCallable mc2 = new MyCallable();

        FutureTask<String> ft2 = new FutureTask<>(mc2);

        Thread t2 = new Thread(ft2);
        t2.setName("坦克");
        t2.setPriority(1);
        //System.out.println(t2.getPriority());//5
        t2.start();
    }
}
```



### 4.7守护线程

#### 1.相关方法

| 方法名                     | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| void setDaemon(boolean on) | 将此线程标记为守护线程，当运行的线程都是守护线程时，Java虚拟机将退出 |

#### 2.代码演示

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-03 17:03
 * @description : 守护线程
 */
public class MyThread1 extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(getName() + "---" + i);
        }
    }
}
public class MyThread2 extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(getName() + "---" + i);
        }
    }
}
public class Demo {
    public static void main(String[] args) {
        MyThread1 t1 = new MyThread1();
        MyThread2 t2 = new MyThread2();

        t1.setName("张三");
        t2.setName("李四");

        //把第二个线程设置为守护线程
        //当普通线程执行完之后,那么守护线程也没有继续运行下去的必要了.
        t2.setDaemon(true);

        t1.start();
        t2.start();
    }
}
```



## 5.线程同步

### 5.1卖票

#### 1.案例需求

某电影院目前正在上映国产大片，共有100张票，而它有3个窗口卖票，请设计一个程序模拟该电影院卖票

#### 2.实现步骤

- 定义一个类SellTicket实现Runnable接口，里面定义一个成员变量：private int tickets = 100;

- 在SellTicket类中重写run()方法实现卖票，代码步骤如下

- 判断票数大于0，就卖票，并告知是哪个窗口卖的
- 卖了票之后，总票数要减1
- 票卖没了，线程停止
- 定义一个测试类SellTicketDemo，里面有main方法，代码步骤如下
- 创建SellTicket类的对象
- 创建三个Thread类的对象，把SellTicket对象作为构造方法的参数，并给出对应的窗口名称
- 启动线程

#### 3.代码演示

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-03 19:03
 * @description : 卖票案例
 */
public class SellTicket implements Runnable {
    private int tickets = 100;
    //在SellTicket类中重写run()方法实现卖票，代码步骤如下
    @Override
    public void run() {
        while (true) {
            if(ticket <= 0){
                    //卖完了
                    break;
                }else{
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    ticket--;
                    System.out.println(Thread.currentThread().getName() + "在卖票,还剩下" + ticket + "张票");
                }
        }
    }
}
public class SellTicketDemo {
    public static void main(String[] args) {
        //创建SellTicket类的对象
        SellTicket st = new SellTicket();

        //创建三个Thread类的对象，把SellTicket对象作为构造方法的参数，并给出对应的窗口名称
        Thread t1 = new Thread(st,"窗口1");
        Thread t2 = new Thread(st,"窗口2");
        Thread t3 = new Thread(st,"窗口3");

        //启动线程
        t1.start();
        t2.start();
        t3.start();
    }
}
```


### 5.2卖票案例的问题

- 卖票出现了问题

  - 相同的票出现了多次

  - 出现了负数的票

- 问题产生原因

  线程执行的随机性导致的,可能在卖票过程中丢失cpu的执行权,导致出现问题



### 5.3同步代码块解决数据安全问题

#### 1.安全问题出现的条件

- 是多线程环境

- 有共享数据

- 有多条语句操作共享数据

#### 2.如何解决多线程安全问题呢?

- 基本思想：让程序没有安全问题的环境

#### 3.怎么实现呢?

- 把多条语句操作共享数据的代码给锁起来，让任意时刻只能有一个线程执行即可

- Java提供了同步代码块的方式来解决

#### 3.同步代码块格式：

```java
synchronized(任意对象) { 
	多条语句操作共享数据的代码 
}
```

synchronized(任意对象)：就相当于给代码加锁了，任意对象就可以看成是一把锁

- 同步的好处和弊端  

  - 好处：解决了多线程的数据安全问题

  - 弊端：当线程很多时，因为每个线程都会去判断同步上的锁，这是很耗费资源的，无形中会降低程序的运行效率

  #### 4.代码演示

  ```java
  /**
   * @author : Leo
   * @version 1.0
   * @date 2023-11-03 17:03
   * @description : 同步代码块解决数据安全问题
   */
  public class SellTicket implements Runnable {
      private int tickets = 100;
      private Object obj = new Object();
  
      @Override
      public void run() {
          while (true) {
              synchronized (obj) { // 对可能有安全问题的代码加锁,多个线程必须使用同一把锁
                  //t1进来后，就会把这段代码给锁起来
                  if (tickets > 0) {
                      try {
                          Thread.sleep(100);
                          //t1休息100毫秒
                      } catch (InterruptedException e) {
                          e.printStackTrace();
                      }
                      //窗口1正在出售第100张票
                      System.out.println(Thread.currentThread().getName() + "正在出售第" + tickets + "张票");
                      tickets--; //tickets = 99;
                  }
              }
              //t1出来了，这段代码的锁就被释放了
          }
      }
  }
  
  public class SellTicketDemo {
      public static void main(String[] args) {
          SellTicket st = new SellTicket();
  
          Thread t1 = new Thread(st, "窗口1");
          Thread t2 = new Thread(st, "窗口2");
          Thread t3 = new Thread(st, "窗口3");
  
          t1.start();
          t2.start();
          t3.start();
      }
  }
  ```




### 5.4同步方法解决数据安全问题

#### 1.同步方法的格式

同步方法：就是把**synchronized**关键字加到方法上

```java
修饰符 synchronized 返回值类型 方法名(方法参数) { 
	方法体；
}
```

同步方法的锁对象是什么呢?

​	**this**

#### 2.静态同步方法

同步静态方法：就是把synchronized关键字加到静态方法上

```java
修饰符 static synchronized 返回值类型 方法名(方法参数) { 
	方法体；
}
```

同步静态方法的锁对象是什么呢?

​	**类名.class**

#### 3.代码演示

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-03 17:03
 * @description : 同步方法加锁
 */
public class MyRunnable implements Runnable {
    private static int ticketCount = 100;

    @Override
    public void run() {
        while(true){
            if("窗口一".equals(Thread.currentThread().getName())){
                //同步方法
                boolean result = synchronizedMthod();
                if(result){
                    break;
                }
            }

            if("窗口二".equals(Thread.currentThread().getName())){
                //同步代码块
                synchronized (MyRunnable.class){
                    if(ticketCount == 0){
                       break;
                    }else{
                        try {
                            Thread.sleep(10);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                        ticketCount--;
                        System.out.println(Thread.currentThread().getName() + "在卖票,还剩下" + ticketCount + "张票");
                    }
                }
            }

        }
    }

    private static synchronized boolean synchronizedMthod() {
        if(ticketCount == 0){
            return true;
        }else{
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            ticketCount--;
            System.out.println(Thread.currentThread().getName() + "在卖票,还剩下" + ticketCount + "张票");
            return false;
        }
    }
}


public class Demo {
   public static void main(String[] args) {
       MyRunnable mr = new MyRunnable();
       Thread t1 = new Thread(mr);
       Thread t2 = new Thread(mr);

        t1.setName("窗口一");
        t2.setName("窗口二");
        t1.start();
        t2.start();
  }
}
```




  

### 5.5Lock锁

虽然我们可以理解同步代码块和同步方法的锁对象问题，但是我们并没有直接看到在哪里加上了锁，在哪里释放了锁，为了更清晰的表达如何加锁和释放锁，JDK5以后提供了一个新的锁对象Lock

Lock是接口不能直接实例化，这里采用它的实现类ReentrantLock来实例化

#### 1.ReentrantLock构造方法

| 方法名          | 说明                        |
| --------------- | --------------------------- |
| ReentrantLock() | 创建一个ReentrantLock的实例 |

#### 2.加锁解锁方法

| 方法名        | 说明   |
| ------------- | ------ |
| void lock()   | 获得锁 |
| void unlock() | 释放锁 |

#### 3.代码演示

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-03 15:03
 * @description : Lock锁
 */
public class Ticket implements Runnable {
    //票的数量
    private int ticket = 100;
    private Object obj = new Object();
    private ReentrantLock lock = new ReentrantLock();

    @Override
    public void run() {
        while (true) {
            //synchronized (obj){//多个线程必须使用同一把锁.
            try {
                lock.lock();
                if (ticket <= 0) {
                    //卖完了
                    break;
                } else {
                    Thread.sleep(100);
                    ticket--;
                    System.out.println(Thread.currentThread().getName() + "在卖票,还剩下" + ticket + "张票");
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                lock.unlock();
            }
            // }
        }
    }
}

public class Demo {
    public static void main(String[] args) {
        Ticket ticket = new Ticket();

        Thread t1 = new Thread(ticket);
        Thread t2 = new Thread(ticket);
        Thread t3 = new Thread(ticket);

        t1.setName("窗口一");
        t2.setName("窗口二");
        t3.setName("窗口三");

        t1.start();
        t2.start();
        t3.start();
    }
}
```



### 5.6死锁

#### 1.概述

**线程死锁是指由于两个或者多个线程互相持有对方所需要的资源，导致这些线程处于等待状态，无法前往执行**

#### 2.什么情况下会产生死锁

1. 资源竞争：多个线程同时竞争同一资源（如共享变量、文件、数据库连接等），如果每个线程都占用了一部分资源并且正在等待其它线程释放其所需的资源，那么就会出现死锁。
2. 嵌套锁：多个线程在不同的顺序上请求锁，例如，线程 A 先获取了锁 1，再请求锁 2，而线程 B 先获取了锁 2，再请求锁 1，这样就会产生死锁。
3. 线程间等待：多个线程相互依赖，每个线程都在等待其它线程完成某些操作后才能继续执行，但又互相阻塞，导致无法继续进行下去。

#### 3.如何避免死锁

**为避免死锁的发生，我们可以采用以下几种方法：**

1. **避免嵌套锁：** 尽量避免线程在多个嵌套层次中获取锁，以减少死锁的风险。
2. **统一锁定顺序：** 确保在不同线程中获取锁的顺序一致，避免出现不同的线程以不同的顺序获取锁导致死锁的发生。
3. **减少锁的持有时间：** 尽量减少每个线程占用锁的时间，从而降低死锁的概率。
4. **使用非阻塞算法：** 非阻塞算法可以在不使用锁的情况下实现并发控制，避免了线程间的互相等待和阻塞。
5. **加强监控和测试：** 加强对多线程代码的监控和测试，及时发现问题，并进行修复和优化。

总之，死锁是多线程并发编程中常见的问题，要避免死锁，需要开发人员具备良好的多线程编程能力和经验，同时采用适当的编程技巧和工具，加强监控和测试，确保多线程程序的正确性和稳定性。



#### 3.代码演示

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-03 15:03
 * @description : 死锁代码演示
 */
public class Demo {
    public static void main(String[] args) {
        Object objA = new Object();
        Object objB = new Object();

        new Thread(()->{
            while(true){
                synchronized (objA){
                    //线程一
                    synchronized (objB){
                        System.out.println("张三同学正在走路");
                    }
                }
            }
        }).start();

        new Thread(()->{
            while(true){
                synchronized (objB){
                    //线程二
                    synchronized (objA){
                        System.out.println("李四同学正在走路");
                    }
                }
            }
        }).start();
    }
}
```



### 5.7线程同步的多种方式

Java中多线程编程中为了解决线程安全问题，实现线程同步可以采用以下几种方式：

#### 1.synchronized关键字：

synchronized关键字可以修饰方法或代码块，在多个线程访问共享资源时，只允许一个线程进入临界区执行，其他线程必须等待当前线程退出临界区才能再次进入。例如：

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-04 10:58
 * @description : 
 */
public synchronized void method() {
    // 这里是需要同步的代码块 
}
```



#### 2.ReentrantLock类：

ReentrantLock类是Java提供的一个可重入锁，也可以用于实现线程同步。该类提供了与synchronized关键字相似的机制：在多个线程访问共享资源时，只允许一个线程进入临界区执行，其他线程必须等待当前线程退出临界区才能再次进入。例如：

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-04 10:58
 * @description : 
 */
private ReentrantLock lock = new ReentrantLock();
public void method() {
    lock.lock(); // 获取锁
    try {
         // 这里是需要同步的代码块
    } finally {
        lock.unlock(); // 释放锁
    }
}
```



#### 3.AtomicInteger类：

AtomicInteger类是Java提供的一个原子类，可以用于实现线程安全的计数器。该类的操作都是原子性的，多个线程同时进行操作时，不会出现竞争条件。例如：

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-04 10:58
 * @description : 
 */
private AtomicInteger count = new AtomicInteger();
public void increment() {
    count.incrementAndGet();
}
```



#### 4.Semaphore类：

Semaphore类是Java提供的一个信号量类，可以用于控制对共享资源的访问。该类通过指定许可证的数量来控制同时访问共享资源的线程数，超过许可证数量的线程必须等待其他线程释放许可证后才能继续执行。例如：

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-04 10:58
 * @description : 
 */
private Semaphore semaphore = new Semaphore(n);
public void method() throws InterruptedException {
    semaphore.acquire(); // 获取许可证
    try {
        // 这里是需要同步的代码块     
    } finally {
        semaphore.release(); // 释放许可证
    }
}
```

总之，Java提供了多种方式实现线程同步，包括synchronized关键字、ReentrantLock类、AtomicInteger类和Semaphore类等。



### 5.8Lock锁和synchronized同步锁的区别

1. Lock是一个接口，而synchronized是Java的关键字，synchronized是内置的语言实现的
2. Lock是显示锁（需要手动开启和关闭锁，不要忘记关锁），synchronized是隐式锁，处理完作用域自动释放
3. synchronized在发生异常时，会自动释放线程占有的锁，因此不会造成死锁，而Lock锁在发生异常时，如果没有主动通过unlock()方法去释放锁，则会造成死锁现象，所以使用Lock时需要在finally块中释放锁。
4. Lock只有代码块锁，synchronized有代码块锁和方法锁
5. 使用Lock锁，JVM将花费较少的时间来调度线程，性能更好，并且具有很好的扩展性
6. synchronized无法判断锁的状态，而Lock可以知道线程有没有拿到锁
7. 优先使用顺序：lock>同步代码块



## 6.生产者与消费者案例

### 3.1生产者和消费者模式概述

#### 1.概述

> 生产者消费者模式是一个十分经典的多线程协作的模式，弄懂生产者消费者问题能够让我们对多线程编程的理解更加深刻。
>
> 所谓生产者消费者问题，实际上主要是包含了两类线程：
>
> ​	一类是生产者线程用于生产数据
>
> ​	一类是消费者线程用于消费数据
>
> 为了解耦生产者和消费者的关系，通常会采用共享的数据区域，就像是一个仓库
>
> 生产者生产数据之后直接放置在共享数据区中，并不需要关心消费者的行为
>
> 消费者只需要从共享数据区中去获取数据，并不需要关心生产者的行为

#### 2.Object类的等待和唤醒方法

| 方法名           | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| void wait()      | 导致当前线程等待，直到另一个线程调用该对象的 notify()方法或 notifyAll()方法 |
| void notify()    | 唤醒正在等待对象监视器的单个线程                             |
| void notifyAll() | 唤醒正在等待对象监视器的所有线程                             |



### 3.2生产者和消费者案例

#### 1.案例需求

+ 桌子类(Desk)：定义表示包子数量的变量,定义锁对象变量,定义标记桌子上有无包子的变量

+ 生产者类(Cooker)：实现Runnable接口，重写run()方法，设置线程任务

  1.判断是否有包子,决定当前线程是否执行

  2.如果有包子,就进入等待状态,如果没有包子,继续执行,生产包子

  3.生产包子之后,更新桌子上包子状态,唤醒消费者消费包子

+ 消费者类(Foodie)：实现Runnable接口，重写run()方法，设置线程任务

  1.判断是否有包子,决定当前线程是否执行

  2.如果没有包子,就进入等待状态,如果有包子,就消费包子

  3.消费包子后,更新桌子上包子状态,唤醒生产者生产包子

+ 测试类(Demo)：里面有main方法，main方法中的代码步骤如下

  创建生产者线程和消费者线程对象

  分别开启两个线程

#### 2.代码实现

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-04 10:58
 * @description : 
 */
public class Desk {

    //定义一个标记
    //true 就表示桌子上有汉堡包的,此时允许吃货执行
    //false 就表示桌子上没有汉堡包的,此时允许厨师执行
    public static boolean flag = false;

    //汉堡包的总数量
    public static int count = 10;

    //锁对象
    public static final Object lock = new Object();
}

public class Cooker extends Thread {
//    生产者步骤：
//            1，判断桌子上是否有汉堡包
//    如果有就等待，如果没有才生产。
//            2，把汉堡包放在桌子上。
//            3，叫醒等待的消费者开吃。
    @Override
    public void run() {
        while(true){
            synchronized (Desk.lock){
                if(Desk.count == 0){
                    break;
                }else{
                    if(!Desk.flag){
                        //生产
                        System.out.println("厨师正在生产汉堡包");
                        Desk.flag = true;
                        Desk.lock.notifyAll();
                    }else{
                        try {
                            Desk.lock.wait();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
    }
}

public class Foodie extends Thread {
    @Override
    public void run() {
//        1，判断桌子上是否有汉堡包。
//        2，如果没有就等待。
//        3，如果有就开吃
//        4，吃完之后，桌子上的汉堡包就没有了
//                叫醒等待的生产者继续生产
//        汉堡包的总数量减一

        //套路:
            //1. while(true)死循环
            //2. synchronized 锁,锁对象要唯一
            //3. 判断,共享数据是否结束. 结束
            //4. 判断,共享数据是否结束. 没有结束
        while(true){
            synchronized (Desk.lock){
                if(Desk.count == 0){
                    break;
                }else{
                    if(Desk.flag){
                        //有
                        System.out.println("吃货在吃汉堡包");
                        Desk.flag = false;
                        Desk.lock.notifyAll();
                        Desk.count--;
                    }else{
                        //没有就等待
                        //使用什么对象当做锁,那么就必须用这个对象去调用等待和唤醒的方法.
                        try {
                            Desk.lock.wait();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }

    }
}

public class Demo {
    public static void main(String[] args) {
        /*消费者步骤：
        1，判断桌子上是否有汉堡包。
        2，如果没有就等待。
        3，如果有就开吃
        4，吃完之后，桌子上的汉堡包就没有了
                叫醒等待的生产者继续生产
        汉堡包的总数量减一*/

        /*生产者步骤：
        1，判断桌子上是否有汉堡包
        如果有就等待，如果没有才生产。
        2，把汉堡包放在桌子上。
        3，叫醒等待的消费者开吃。*/

        Foodie f = new Foodie();
        Cooker c = new Cooker();

        f.start();
        c.start();

    }
}
```



### 3.3生产者和消费者案例优化

#### 1.需求

+ 将Desk类中的变量,采用面向对象的方式封装起来
+ 生产者和消费者类中构造方法接收Desk类对象,之后在run方法中进行使用
+ 创建生产者和消费者线程对象,构造方法中传入Desk类对象
+ 开启两个线程

#### 2.代码演示

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-04 10:58
 * @description : 
 */
public class Desk {

    //定义一个标记
    //true 就表示桌子上有汉堡包的,此时允许吃货执行
    //false 就表示桌子上没有汉堡包的,此时允许厨师执行
    //public static boolean flag = false;
    private boolean flag;

    //汉堡包的总数量
    //public static int count = 10;
    //以后我们在使用这种必须有默认值的变量
   // private int count = 10;
    private int count;

    //锁对象
    //public static final Object lock = new Object();
    private final Object lock = new Object();

    public Desk() {
        this(false,10); // 在空参内部调用带参,对成员变量进行赋值,之后就可以直接使用成员变量了
    }

    public Desk(boolean flag, int count) {
        this.flag = flag;
        this.count = count;
    }

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public Object getLock() {
        return lock;
    }

    @Override
    public String toString() {
        return "Desk{" +
                "flag=" + flag +
                ", count=" + count +
                ", lock=" + lock +
                '}';
    }
}

public class Cooker extends Thread {

    private Desk desk;

    public Cooker(Desk desk) {
        this.desk = desk;
    }
//    生产者步骤：
//            1，判断桌子上是否有汉堡包
//    如果有就等待，如果没有才生产。
//            2，把汉堡包放在桌子上。
//            3，叫醒等待的消费者开吃。

    @Override
    public void run() {
        while(true){
            synchronized (desk.getLock()){
                if(desk.getCount() == 0){
                    break;
                }else{
                    //System.out.println("验证一下是否执行了");
                    if(!desk.isFlag()){
                        //生产
                        System.out.println("厨师正在生产汉堡包");
                        desk.setFlag(true);
                        desk.getLock().notifyAll();
                    }else{
                        try {
                            desk.getLock().wait();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
    }
}

public class Foodie extends Thread {
    private Desk desk;

    public Foodie(Desk desk) {
        this.desk = desk;
    }

    @Override
    public void run() {
//        1，判断桌子上是否有汉堡包。
//        2，如果没有就等待。
//        3，如果有就开吃
//        4，吃完之后，桌子上的汉堡包就没有了
//                叫醒等待的生产者继续生产
//        汉堡包的总数量减一

        //套路:
            //1. while(true)死循环
            //2. synchronized 锁,锁对象要唯一
            //3. 判断,共享数据是否结束. 结束
            //4. 判断,共享数据是否结束. 没有结束
        while(true){
            synchronized (desk.getLock()){
                if(desk.getCount() == 0){
                    break;
                }else{
                    //System.out.println("验证一下是否执行了");
                    if(desk.isFlag()){
                        //有
                        System.out.println("吃货在吃汉堡包");
                        desk.setFlag(false);
                        desk.getLock().notifyAll();
                        desk.setCount(desk.getCount() - 1);
                    }else{
                        //没有就等待
                        //使用什么对象当做锁,那么就必须用这个对象去调用等待和唤醒的方法.
                        try {
                            desk.getLock().wait();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }

    }
}

public class Demo {
    public static void main(String[] args) {
        /*消费者步骤：
        1，判断桌子上是否有汉堡包。
        2，如果没有就等待。
        3，如果有就开吃
        4，吃完之后，桌子上的汉堡包就没有了
                叫醒等待的生产者继续生产
        汉堡包的总数量减一*/

        /*生产者步骤：
        1，判断桌子上是否有汉堡包
        如果有就等待，如果没有才生产。
        2，把汉堡包放在桌子上。
        3，叫醒等待的消费者开吃。*/

        Desk desk = new Desk();

        Foodie f = new Foodie(desk);
        Cooker c = new Cooker(desk);

        f.start();
        c.start();

    }
}
```



### 3.4阻塞队列基本使用

#### 1.阻塞队列继承结构

![06_阻塞队列继承结构](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311042233386.png)


+ 常见BlockingQueue:

  ArrayBlockingQueue: 底层是数组,有界

  LinkedBlockingQueue: 底层是链表,无界.但不是真正的无界,最大为int的最大值

+ BlockingQueue的核心方法:

  put(anObject): 将参数放入队列,如果放不进去会阻塞

  take(): 取出第一个数据,取不到会阻塞

  

  #### 2.代码演示

  ```java
  /**
   * @author : Leo
   * @version 1.0
   * @date 2023-11-04 10:58
   * @description : 
   */
  public class Demo02 {
      public static void main(String[] args) throws Exception {
          // 创建阻塞队列的对象,容量为 1
          ArrayBlockingQueue<String> arrayBlockingQueue = new ArrayBlockingQueue<>(1);
  
          // 存储元素
          arrayBlockingQueue.put("汉堡包");
  
          // 取元素
          System.out.println(arrayBlockingQueue.take());
          System.out.println(arrayBlockingQueue.take()); // 取不到会阻塞
  
          System.out.println("程序结束了");
      }
  }
  ```



### 3.5阻塞队列实现等待唤醒机制

#### 1.案例需求

+ 生产者类(Cooker)：实现Runnable接口，重写run()方法，设置线程任务

  1.构造方法中接收一个阻塞队列对象

  2.在run方法中循环向阻塞队列中添加包子

  3.打印添加结果

+ 消费者类(Foodie)：实现Runnable接口，重写run()方法，设置线程任务

  1.构造方法中接收一个阻塞队列对象

  2.在run方法中循环获取阻塞队列中的包子

  3.打印获取结果

+ 测试类(Demo)：里面有main方法，main方法中的代码步骤如下

  创建阻塞队列对象

  创建生产者线程和消费者线程对象,构造方法中传入阻塞队列对象

  分别开启两个线程

#### 2.代码演示

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-04 10:58
 * @description : 
 */
public class Cooker extends Thread {

    private ArrayBlockingQueue<String> bd;

    public Cooker(ArrayBlockingQueue<String> bd) {
        this.bd = bd;
    }
//    生产者步骤：
//            1，判断桌子上是否有汉堡包
//    如果有就等待，如果没有才生产。
//            2，把汉堡包放在桌子上。
//            3，叫醒等待的消费者开吃。

    @Override
    public void run() {
        while (true) {
            try {
                bd.put("汉堡包");
                System.out.println("厨师放入一个汉堡包");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class Foodie extends Thread {
    private ArrayBlockingQueue<String> bd;

    public Foodie(ArrayBlockingQueue<String> bd) {
        this.bd = bd;
    }

    @Override
    public void run() {
//        1，判断桌子上是否有汉堡包。
//        2，如果没有就等待。
//        3，如果有就开吃
//        4，吃完之后，桌子上的汉堡包就没有了
//                叫醒等待的生产者继续生产
//        汉堡包的总数量减一

        //套路:
        //1. while(true)死循环
        //2. synchronized 锁,锁对象要唯一
        //3. 判断,共享数据是否结束. 结束
        //4. 判断,共享数据是否结束. 没有结束
        while (true) {
            try {
                String take = bd.take();
                System.out.println("吃货将" + take + "拿出来吃了");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }
}

public class Demo {
    public static void main(String[] args) {
        ArrayBlockingQueue<String> bd = new ArrayBlockingQueue<>(1);

        Foodie f = new Foodie(bd);
        Cooker c = new Cooker(bd);

        f.start();
        c.start();
    }
}
```



## 7.使用多线程引入的问题

多线程的优点很明显，但是多线程的缺点也同样明显，线程的使用（滥用）会给系统带来上下文切换的额外负担,并且线程间的共享变量可能造成死锁的出现。

### 1.线程安全问题

#### 1.1原子性

在**并发编程中**很多的操作都不是原子操作，比如：

```java
i++;   // 操作2
i = j; // 操作3
i = i + 1; // 操作4
```

在单线程环境中这3个操作都不会出现问题，但是在多线程环境中，如果不通过加锁操作，往往很可能会出现意料之外的值。

在Java中可以通过**synchronized**或者**ReentrantLock**来保证原子性。

 

#### 1.2可见性

**可见性：指当多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即得到这个修改的值。**

![image-20231104224552731](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311042245947.png)

如上图所示，每个线程都有自己的工作内存，工作内存和主存间要通过store和load进行交互。

为了解决多线程的可见性问题，Java提供了**volatile**关键字，当一个共享变量被**volatile**修饰时，他会保证修改的值会立即更新到主存，当有其他线程需要读取时，他会去主存中读取新值，而普通共享变量不能保证其可见性，因为变量被修改后刷回到主存的时间是不确定的。



### 3.线程死锁

线程死锁是指由于两个或者多个线程互相持有对方所需要的资源，导致这些线程处于等待状态，无法前往执行。

当线程互相持有对方所需要的资源时，会互相等待对方释放资源，如果线程都不主动释放所占有的资源，将产生死锁，如图所示：

![image-20231104225049449](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311042250597.png)

举一个例子：

```java
public void add(int m) {
    synchronized(lockA) { // 获得lockA的锁
        this.value += m;
        synchronized(lockB) { // 获得lockB的锁
            this.another += m;
        } // 释放lockB的锁
    } // 释放lockA的锁
}
 
public void dec(int m) {
    synchronized(lockB) { // 获得lockB的锁
        this.another -= m;
        synchronized(lockA) { // 获得lockA的锁
            this.value -= m;
        } // 释放lockA的锁
    } // 释放lockB的锁
}
```

**两个线程各自持有不同的锁，然后各自试图获取对方手里的锁，造成了双方无限等待下去，这就是死锁。**

### 3.上下文切换

多线程并发一定会快吗？其实不一定，因为多线程有线程创建和线程上下文切换的开销。

![image-20231104230528860](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311042305021.png)

CPU是很宝贵的资源，速度也非常快，为了保证均衡，通常会给不同的线程分配时间片，当CPU从一个线程切换到另外一个线程的时候，CPU需要保存当前线程的本地数据，程序指针等状态，并加载下一个要执行的线程的本地数据，程序指针等，这个切换称之为上下文切换。

一般减少上下文切换的方法有：**无锁并发编程**，**CAS算法**，**使用协程**等方式。



## 8.Java线程池

....待更新



## 9.参考文献

- https://zhuanlan.zhihu.com/p/106283969
- https://www.cnblogs.com/vipstone/p/15907280.html
- https://mikechen.cc/9616.html#1_%E6%99%AE%E9%80%9A%E5%90%8C%E6%AD%A5%E6%96%B9%E6%B3%95



## 10.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。


![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)