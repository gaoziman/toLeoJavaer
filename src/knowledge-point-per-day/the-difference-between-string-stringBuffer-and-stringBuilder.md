---
title: String, StringBuffer, StringBuilder的区别
icon: circle-info
order: 3
category:
  - Knowledge
tag:
  - Knowledge
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---


![image-20230810140328156](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308101403272.png)

## 1. 可变性

> String 内部的 value 值是 final 修饰的，所以它是不可变类。所以每次修改 String的值，都会产生一个新的对象。
>
> StringBuffer 和 StringBuilder 是可变类，字符串的变更不会产生新的对象。

## 2. 线程安全性

**Srring** 是不可变的，所以它是线程安全的。

**StringBuffer** 是线程安全的，因为它的每个操作方法都加了`synchronized` 同步关键 字。

**StringBuilder** 是非线程安全的，在多环境下对字符串进行操作的时候，应该使用`StringBuffer`，否则才会使用 `StringBuilder`。



## 3. 性能方面

> **String**  的性能是最的低的，因为不可变意味着在做字符串拼接和修改的时候，需要重新创建新的对象以及分配内存。 其次是 **StringBuffer** 要比 `String` 性能高，因为它的可变性使得字符串可以直接被 修改最后是 **StringBuilder**，它比 StringBuffer 的性能高，因为 **StringBuffer** 加了 同步锁。



## 4. 存储方面

> **String**  存储在字符串常量池里面   
>
> **StringBuffer**  和  **StringBuilder**  存储在堆内存空间。

## 5. 使用场景

**String**：适用于少量的字符串操作的情况。

**StringBuilder**：适用于单线程下在字符缓冲区进行大量操作的情况。

**StringBuffer**：适用于多线程下在字符缓冲区进行大量操作的情况。

## 6. 运行速度

> 运行速度快慢顺序为：StringBuilder > StringBuffer > String

