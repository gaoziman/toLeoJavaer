---
title: Netty实战专栏 网络编程解析
icon: circle-info
order: 1
tags:
  - Netty
categories:
  - Netty
pageview: false
date: 2023-11-5 22:48:30
comment: false
---

# Java网络编程深入解析



## 1.前言

大家好，我是Leo哥🫣🫣🫣，本次专栏学习Java并发以及netty应用的深度学习，netty提供了异步、事件驱动、非阻塞的网络编程模型，能够轻松处理高并发、高吞吐量的网络通信场景。是一个基于**Java NIO(Non-blocking I/O)** 的高性能网络应用框架。但是在此之前我们需要对我们**Java**前置知识进行一些巩固和复习。那就是IO，Java网络编程，BIO,NIO,AIO相关知识点，前置知识是还是挺多，只有打好前面的基础我们才能更深入理解**netty**这个框架以及他的底层原理。对于IO相关的知识，[大家可以看我之前写的这篇](https://gaoziman.blog.csdn.net/article/details/133349922?spm=1001.2014.3001.5502)。本篇主要讲解和回顾Java网络编程的相关知识点。好了，话不多说让我们开始吧😎😎😎。

![image-20231102103941814](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311021039005.png)

## 2.网络基础知识

### 2.1TCP/IP协议

#### 1.什么是协议

**协议(Protocol)** 指的是计算机网络传输数据时遵循的规则和标准。在计算机网络中，各个设备通过协议进行通信，以确保数据的可靠性、安全性和正确性。它定义了在计算机网络中进行通信所需的规则和标准，并规定了通信的格式、内容、顺序、错误处理等细节。

协议可以根据功能和层级分类，常见的协议有：

- **应用层协议：** 如HTTP、FTP、SMTP等，主要用于应用程序之间的通信和数据传输。
- **传输层协议：** 如TCP、UDP等，主要负责数据传输的可靠性和流量控制。
- **网络层协议：** 如IP、ICMP、ARP等，主要处理数据在网络中的路径选择和寻址。
- **数据链路层协议：** 如以太网协议、PPP协议等，主要负责物理设备之间的数据传输。

协议的制定依赖于计算机网络的发展和应用需求。随着网络技术的不断发展，协议也在不断完善和更新。例如，IPv4协议在全球范围内广泛使用，但其地址空间有限；IPv6协议则扩大了地址空间，但目前仍在逐步普及中。在网络通信中，合理使用和选择协议是确保网络通信顺畅的重要因素。



#### 2.协议的必要性

协议在计算机网络中是非常必要的，可以从以下几个方面来说明协议的重要性：

1. **规范通信规则：** 计算机网络中的各个设备需要通过协议来进行通信。协议规定了通信的格式、内容、顺序、错误处理等细节，确保不同设备之间能够正确理解和解释通信内容。协议的存在使得网络中的设备能够按照统一的规则进行通信，避免了混乱和冲突。
2. **提供可靠性和安全性：** 协议定义了数据传输的可靠性和安全性相关的机制。例如，TCP协议提供了可靠的数据传输机制，确保数据不丢失、不重复、按顺序到达目标设备。SSL/TLS协议提供了加密和身份验证机制，确保数据在传输过程中的机密性和完整性。协议的存在使得网络通信更加安全可靠，有效保护了通信内容的隐私性和完整性。
3. 支持互操作性： 协议的制定和广泛应用使得不同厂商、不同平台的设备能够进行互相通信。无论是硬件设备还是软件应用，只要符合同一个协议标准，就可以实现互操作性，从而实现信息的共享和交换。协议的存在促进了设备和应用之间的互联互通，推动了计算机网络的发展和应用。
4. **促进网络发展和标准化：** 协议是网络发展和标准化的基础。通过制定和遵循协议，可以促进网络技术的发展和应用。网络中的各种新功能、新服务都需要有相应的协议支持。同时，协议的标准化也有助于推动行业内的一致性和互操作性，降低了开发成本和复杂性。

> 简单来说，协议就是计算机与计算机之间通过网络通信时，事先达成的一种 “约定”。这种“约定”使不同厂商的设备、不同的CPU以及不同操作系统组成的计算机之间，只要遵循相同的协议就能够实现通信。这就好比一个中国人说汉语一个外国人说英语使用不同的国家语言进行沟通，怎么也无法理解。如果两个人约定好 都说中文或英文，就可以互相沟通通信。协议分为很多种，每一种协议都明确界定了它的行为规范。两台计算机必须能够支持相同的协议，并遵循相同协议进行处理，这样才能实现相互通信。



### 2.2端口和套接字

#### 1.关于端口

在计算机网络中，端口（Port）是指一种标识网络服务的机制，是用于标识不同网络应用程序的数字。每个TCP或UDP连接都需要一个端口来确定要发送或接收的数据类型。TCP/IP协议中，端口号范围从0到65535。

端口的作用是在互联网上标识特定的应用程序和服务，使得不同的应用程序可以通过互联网同时运行，并且互不干扰。具体来说，端口主要有以下几个方面的作用：

1. **标识应用程序：** 同一台计算机上不同的应用程序可以使用不同的端口号标识自己。当网络上接收到数据包时，根据端口号来确定数据包应该交给哪个应用程序处理。
2. 区分服务类型： 不同的端口号对应不同的服务类型，例如HTTP协议默认使用80端口，FTP协议默认使用21端口。这样可以使得网络上的数据包被正确地路由到相应的服务。
3. **控制网络访问：** 在防火墙等安全设备中，可以根据端口号来限制对某些服务的访问。例如，可以设置防火墙规则，只允许80端口**(HTTP)** 的数据通过，而拒绝21端口 **(FTP)**的数据通过。
4. **优化网络性能：** 在负载均衡器等设备中，可以通过端口号来分配流量，从而优化网络性能。例如，将HTTP请求分配到不同的服务器上，以提高服务器的负载均衡和响应速度。

端口是用于标识不同网络应用程序的数字，其作用包括标识应用程序、区分服务类型、控制网络访问和优化网络性能等。在计算机网络中，端口的使用使得网络上的不同应用程序可以同时运行，互不干扰，从而实现了网络的多样化和高效性。



#### 2.关于Socket套接字

**Socket(套接字)** 是计算机网络中用于实现网络通信的一种编程接口。它提供了一组函数和方法，使得应用程序能够通过网络进行数据的发送和接收。

Socket的作用是在不同主机之间建立通信连接，使得这些主机上运行的应用程序能够进行数据交换。具体来说，Socket有以下几个方面的作用：

1. 建立连接：通过Socket，应用程序可以创建一个连接，将自己与远程主机上的应用程序关联起来。在客户端-服务端模型中，客户端通过Socket发起连接请求，服务端通过Socket接受连接请求，建立连接后双方可以进行数据的发送和接收。
2. 数据传输：Socket提供了发送和接收数据的方法。通过Socket，应用程序可以将数据打包发送给远程主机上的应用程序，也可以从远程主机接收数据。对于TCP协议，Socket提供了可靠的、面向连接的数据传输；对于UDP协议，Socket提供了不可靠的、无连接的数据传输。
3. 网络编程：Socket是进行网络编程的基础接口。通过使用Socket，开发者可以在应用程序中实现与网络相关的功能，如创建服务器、客户端，进行数据交换、文件传输等。Socket提供了一系列函数和方法，使得网络编程更加方便和灵活。
4. 协议支持：Socket可以支持不同的网络协议，如TCP、UDP等。开发者可以根据需要选择合适的协议，并通过Socket进行相应的网络通信。通过Socket，应用程序可以与不同协议的主机进行通信，实现了协议的透明性和互操作性。

**Socket套接字** 本质是编程的API接口，是对TCP/IP的一个封装。

![image-20231101105942280](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011059472.png)



**编程流程**

**注：**要通过互联网进行通信，至少需要**一对套接字**，其中一个**运行于客户端**，我们称之为 `Client Socket`，另一个**运行于服务器端**，我们称之为 `Server Socket`

- **1.服务器监听**

  所谓服务器监听，是指**服务器端套接字**并**不定位具体的客户端套接字**，而是处于**等待连接**的状态，**实时监控网络状态** 。

- **2.客户端请求**

  所谓客户端请求，是指由**客户端的套接字提出连接请求**，要连接的目标是服务器端的套接字。为此，客户端的套接字必须**首先描述它要连接的服务器的套接字**，**指出服务器端套接字的地址和端口号**，然后就向服务器端接字提出连接请求 。

- **3.连接确认**

  所谓连接确认，是指**当服务器端套接字监听到或者说接收**到客户端套接字的连接请求，就会**响应客户端套接字的请求**，建立一个**新的线程**，并把**服务器端套接字**的***描述*** 发送给客户端。一旦**客户端确认了此描述**，连接就建立好了。而**服务器端套接字继续处于监听状态**，接收其他客户端套接字的连接请求 。

------

**主要类型**

- **1.流式套接字(SOCK_STREAM)**

  流式套接字用于提供**面向连接、可靠的数据传输服务**。该服务将保证数据能够**实现无差错、无重复送，并按顺序接收**。流套接字之所以能够实现可靠的数据服务，原因在于其使用了**传输控制协议**，即 `TCP(The Transmission Control Protocol)协议` 。

- **2.数据报套接字(SOCK_DGRAM)**

  数据报套接字提供一种**无连接的服务**。该服务并**不能保证数据传输的可靠性**,数据**有可能**在**传输过程中丢失或出现数据重复**，且**无法保证顺序地接收到数据**。数据报套接字使用 `UDP( User DatagramProtocol)协议` 进行数据的传输。由于数据报套接字不能保证数据传输的可靠性，对于有可能出现的数据丢失情况，需要在程序中做相应的处理。

------

**主要特点**

**根据套接字的不同类型，可以将套接字调用分为面向连接服务和无连接服务** 。

面向连接服务的主要特点如下：

- `(1)数据传输过程必须经过建立连接、维护连接和释放连接3个阶段；`
- `(2)在传输过程中，各分组不需要携带目的主机的地址；`
- `(3)可靠性好，但由于协议复杂，通信效率不高 。`

面向无连接服务的主要特点如下：

- `(1)不需要连接的各个阶段；`
- `(2)每个分组都携带完整的目的主机地址，在系统中独立传送；`
- `(3)由于没有顺序控制，所以接收方的分组可能出现乱序、重复和丢失现象；`
- `(4)通信效率高，但可靠性不能确保 。`

------

**表示方法**

- 套接字Socket =（IP地址:端口号），套接字的表示方法是点分十进制的lP地址后面写上端口号，中间用冒号或逗号隔开。
- 每一个传输层连接唯一地被通信两端的两个端点（即两个套接字）所确定。
  - 例如：如果IP地址是210.37.145.1，而端口号是23，那么得到套接字就是(210.37.145.1:23) 。



### 2.3IP地址和域名系统(DNS)

#### 1.什么是IP地址

在计算机网络中，**IP地址(Internet Protocol Address)** 是用于在网络中唯一标识和定位设备的一个数字标识。它是互联网协议**(IP)**的核心组成部分，用于实现通过网络进行数据传输和通信。

IP地址由一串32位或128位的二进制数字组成，用于标识网络中的主机或路由器。为了方便人类理解和使用，IP地址通常以点分**十进制(IPv4)或冒号分组** 十六进制**(IPv6)** 的形式呈现。

IPv4地址是最常见的IP地址格式，由四个8位字段组成，每个字段用点分隔，取值范围是0~255。例如，192.168.0.1就是一个IPv4地址。IPv4地址的总数是有限的，大约为42亿个，因此IPv4地址空间已经相对紧张。

为了解决IPv4地址空间不足的问题，IPv6应运而生。IPv6地址采用128位二进制数表示，可以提供更多的地址空间。IPv6地址使用冒号分组十六进制的格式，例如2001:0db8:85a3:0000:0000:8a2e:0370:7334。IPv6地址的数量非常庞大，远远超过了IPv4地址。

IP地址的作用是用于在网络中唯一标识和定位设备。每个设备**(如计算机、路由器等)** 在网络中都必须拥有一个唯一的IP地址，这样才能准确地进行数据传输和通信。通过IP地址，数据包可以被正确地路由到目标设备。

此外，IP地址还可以用于确定设备所属的网络段。IP地址中的网络部分用于标识设备所在的网络，而主机部分则用于标识具体的设备。这样可以进行网络划分和组织，方便管理和配置网络设备。

总之，IP地址是用于在网络中唯一标识和定位设备的数字标识。它是实现网络通信和数据传输的基础，为互联网的正常运行提供了重要支持。

#### 2.点分十进制表示法

我们熟悉的 IP 地址 `172.16.254.1` 由多个字符构成，而不是 4 个字节，这是为什么呢？为回答这个问题，我们需要深入考察 IP 地址结构，理解 **点分十进制表示法** (dotted decimal notation)。

IP 地址由 4 个字节构成，但不是每个字节都能用 ASCII 来显示。下面这个 IP 地址如果用 ASCII 来解读，有 2 个字节是非法字符，另外 2 个是 ASCII 中的控制字符，没一个能直接显示：

![image-20231101111550100](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011115166.png)

我们知道，一个字节有 8 位，可以表示从 0 到 255 的整数。因此，一个 IP 地址可以用 4 个十进制数来表示，每个数字各代表一个字节：

![image-20231101111557474](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011115525.png)

我们可以用若干个 ASCII 数字字符来表示一个十进制数，每个数之间额外插入一个英文句点，进一步增强可读性，这就是我们常用的 **点分十进制表示法** ：

![image-20231101111605063](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011116114.png)

注意到，原 IP 地址中的一个字节，可能需要多个 ASCII 数字字符来表示。此外，还要插入 3 个英文句点来分隔，总长度膨胀不少。因此，点分十进制存储效率和处理效率都不高，底层网络通信还是采用原本的二进制格式。

那么，如何将点分十进制法表示的 IP 地址，换算成二进制形式呢？我们只需将每个数字都换算成 8 个二进制位，再将所有的二进制位连接起来即可：

![image-20231101111611826](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011116891.png)

#### 3.网络号和主机号

同一个网络中的主机，IP 地址都有相同的前缀。以上节讨论的网络拓扑为例：

![image-20231101111622300](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011116350.png)

左边网络的主机，IP 地址前缀都是 `192.168.1` ；右边网络的主机，IP 地址前缀都是 `192.168.2` 。根据这个特性，一个 IP 地址可以分为两部分：

![image-20231101111630981](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011116023.png)

- **网络号** ，即公共前缀部分，用于表示一个网络；
- **主机号** ，即剩余部分，用于表示该网络内的一台主机；

这个例子中，IP 地址前 3 个字节（ 24 位 ）为网络号，最后一个字节（ 8 位 ）为主机号。主机号长度为 8 比特的网络，理论上可以接入 28=256 台主机。实际上，每个网络都有两个特殊的地址，不能分配：

![image-20231101111638776](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011116832.png)

- 主机号比特全为 0 ，是网络的起始地址，用于表示网络本身，一般称为 **网络地址** ；
- 主机号比特全为 1 ，是网络的结束地址，用于向网络内的所有主机进行广播，一般称为 **广播地址** ；

因此，一个主机号长度为 n 比特的网络，最多可以接入 2*n−2 台主机。



#### 4.IP地址分类

那么，是不是所有的 IP 地址，网络号都是 3 字节，主机号都是 1 字节呢？

答案肯定是否定的。不同的网络，规模有大有小。因此，网络号和主机号的长度，需要根据网络规模来确定。试想，如果主机号总是 1 字节，当一个网络内的主机超过 254 台时，该怎么办呢？

在网络技术兴起的早期，科学家们将 IP 地址划分为若干类：

![image-20231101111803393](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011118472.png)

##### A类地址

A 类地址第一位总是为 0 ，网络号总是 1 字节，主机号总是 3 字节，一般分配给 **大型网络** 。

- 前缀：`0`
- 网络号可变位数：7
- 网络个数：27=128
- 每个网络支持的主机数：224−2=16777214 ，超过一千六百万；
- 地址范围：`0.0.0.0` ~ `127.255.255.255`

![image-20231101111743876](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011117939.png)

##### B类地址

B 类地址前两位总是 `10` ，网络号总是 2 字节，主机号总是 2 字节，一般分配给 **中型网络** 。

- 前缀：`10`
- 网络号可变位数：14
- 网络个数：214=16384
- 每个网络支持的主机数：216−2=65534 ，超过六万五千；
- 地址范围：`128.0.0.0` ~ `191.255.255.255`

##### C类地址

C 类地址前三位总是 `110` ，网络号总是 3 字节，主机号总是 1 字节，一般分配给 **小型网络** 。

- 前缀：`110`
- 网络号可变位数：21
- 网络个数：221=2097152
- 每个网络支持的主机数：28−2=254 ；
- 地址范围：`192.0.0.0` ~ `223.255.255.255`

##### D类地址

D 类地址前四位总是 `1110` ，用于 **多播通信** 。

- 前缀：`1110`
- 地址范围：`224.0.0.0` ~ `239.255.255.255`

##### E类地址

E 类地址前四位总是 `1111` ，保留未用 。

- 前缀：`1111`
- 地址范围：`240.0.0.0` ~ `255.255.255.255`

| 分类    | 前缀码 | 网络号位数 | 主机号位数 | 网络个数 | 每个网络的主机数 | 开始地址  | 结束地址        |
| :------ | :----- | :--------- | :--------- | :------- | :--------------- | :-------- | :-------------- |
| A类地址 | 0      | 8          | 24         | 128      | 16777214         | 0.0.0.0   | 127.255.255.255 |
| B类地址 | 10     | 16         | 16         | 16384    | 65534            | 128.0.0.0 | 191.255.255.255 |
| C类地址 | 110    | 24         | 8          | 2097152  | 254              | 192.0.0.0 | 223.255.255.255 |
| D类地址 | 1110   | -          | -          | -        | -                | 224.0.0.0 | 239.255.255.255 |
| E类地址 | 1111   | -          | -          | -        | -                | 240.0.0.0 | 255.255.255.255 |



#### 域名系统

**域名系统(Domain Name System，缩写为DNS)** 是互联网中用于将域名转换为对应IP地址的系统。它充当了一个分布式的命名服务，提供了将易记的域名映射到数字化的IP地址的功能。

在互联网上，每个设备都需要一个唯一的IP地址来进行通信。然而，人类更容易记住和使用易于理解的域名，[例如www.example.com](http://xn--www-uc0ep96b.example.com/)，而不是一串复杂的IP地址。这就是域名系统的作用所在。

域名系统通过建立一个分层分布式数据库来实现域名与IP地址之间的映射关系。这个数据库由一组域名服务器（DNS服务器）组成，每个服务器负责管理特定的域名空间。

当用户在浏览器中输入一个域名时，操作系统会首先向本地域名服务器发送查询请求。本地域名服务器会检查自己的缓存中是否有该域名对应的IP地址，如果有则直接返回给操作系统。如果没有，则本地域名服务器会向根域名服务器发送查询请求。

根域名服务器是位于全球各地的13个服务器，它们存储了顶级域名（如.com、.org、.net等）的信息。根域名服务器会告诉本地域名服务器所查询域名对应的顶级域名服务器的地址。

本地域名服务器再向顶级域名服务器发送查询请求，顶级域名服务器会告诉本地域名服务器所查询域名对应的权威域名服务器的地址。

最后，本地域名服务器向权威域名服务器发送查询请求，权威域名服务器会返回该域名对应的IP地址给本地域名服务器，然后本地域名服务器将结果缓存并返回给操作系统。

整个过程中，域名系统通过层层查询和分布式数据库的方式，将域名转换为对应的IP地址。这样，用户只需要记住易于理解的域名，就能够访问互联网上的各种资源。

除了将域名映射到IP地址外，域名系统还可以提供其他相关信息，如邮件服务器的地址(MX记录)、子域名的映射关系（CNAME记录）等。

域名系统是当用户使用浏览器访问网址之后，使用的第一个重要协议。DNS 要解决的是**域名和 IP 地址的映射问题**。

在实际使用中，有一种情况下，浏览器是可以不必动用 DNS 就可以获知域名和 IP 地址的映射的。浏览器在本地会维护一个`hosts`列表，一般来说浏览器要先查看要访问的域名是否在`hosts`列表中，如果有的话，直接提取对应的 IP 地址记录，就好了。如果本地`hosts`列表内没有域名-IP 对应记录的话，那么 DNS 就闪亮登场了。

目前 DNS 的设计采用的是分布式、层次数据库结构，**DNS 是应用层协议，基于 UDP 协议之上，端口为 53** 。

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011126903.png)

DNS 服务器自底向上可以依次分为以下几个层级(所有 DNS 服务器都属于以下四个类别之一):

- 根 DNS 服务器。根 DNS 服务器提供 TLD 服务器的 IP 地址。目前世界上只有 13 组根服务器，我国境内目前仍没有根服务器。
- 顶级域 DNS 服务器（TLD 服务器）。顶级域是指域名的后缀，如`com`、`org`、`net`和`edu`等。国家也有自己的顶级域，如`uk`、`fr`和`ca`。TLD 服务器提供了权威 DNS 服务器的 IP 地址。
- 权威 DNS 服务器。在因特网上具有公共可访问主机的每个组织机构必须提供公共可访问的 DNS 记录，这些记录将这些主机的名字映射为 IP 地址。
- 本地 DNS 服务器。每个 ISP（互联网服务提供商）都有一个自己的本地 DNS 服务器。当主机发出 DNS 请求时，该请求被发往本地 DNS 服务器，它起着代理的作用，并将该请求转发到 DNS 层次结构中。严格说来，不属于 DNS 层级结构。

### 2.4TCP/UDP协议

#### 1.什么是TCP

**TCP(Transmission Control Protocol)**是一种面向连接的、可靠的传输协议，用于在计算机网络中传输数据。它是互联网传输层的主要协议之一，负责提供可靠的、有序的数据传输。

> TCP通过建立连接、数据分段、确认和超时重传等机制来确保数据的可靠传输。在发送数据之前，发送端与接收端需要先进行三次握手建立连接。建立连接后，数据被分割成较小的数据段，并通过序列号进行编号，然后按序发送给接收端。
>
> 接收端收到数据段后会发送确认应答，以通知发送端已经成功接收到数据。如果发送端在一定时间内没有收到确认应答，将会进行超时重传，确保数据的可靠性。
>
> TCP通常用于对实时性要求不苛刻，但要求通讯双方传输数据完整无误的场景，例如网页浏览（HTTP/HTTPS协议）、邮件发送（SMTP协议）等。
>
> 除了可靠性和有序性，TCP还提供了双向通信的全双工特性，即发送端和接收端可以同时发送和接收数据。

**TCP是一种面向连接、可靠的传输协议，用于在计算机网络中传输数据。通过连接建立、数据分段、确认和超时重传等机制，TCP确保数据的可靠传输。它还具有流量控制和拥塞控制的功能，以及全双工通信的特性。因其可靠性和广泛应用，TCP成为互联网传输层的主要协议之一。**

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011138900.png)

-  面向连接：只能一对一连接，不能一对多 
-  可靠：无论的网络链路中出现了怎样的链路变化，TCP 都可以保证⼀个报文⼀定能够到达接收端（依靠各种机制） 
-  字节流：消息是没有数据边界的（管道也是），不管消息多大都可以传输，并且消息是有序的



#### 2.什么是TCP连接

- ⽤于保证可靠性和流量控制维护的某些状态信息，这些信息的组合，包括Socket、序列号和窗口大小称为连接
- 所以一个TCP连接是需要客户端和服务端达成三个信息的共识：
- Socket：IP地址 + 端口号
- 序列号：用来解决乱序问题
- 窗口大小：流量控制

#### 3.TCP协议段格式

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011138739.png)



- **源/目的端口号: 表示数据是从哪个进程来, 到哪个进程去**
- **32位的序列号：占4个字节，TCP是面向字节流的，所以在每一个TCP连接中传送的字节流的每一个字节都是按顺序编号，整个要传送的字节流的起始序号必须在建立时设置，通过SYN包传给接收方，`主要解决网络包乱序(去重)的问题（接收方更加关心）`**
- **32位的确认应答号：占4个字节，是期望收到对方下一个报文段的第一个数据字节的序号，比如说：A给B发送了一个 6 7 8，B返回的应该是 7 8 9，如果A只收到了一个9，那就说明9之前的所有数据B都已经正确收到，`主要解决不丢包的问题（发送方更关心）`**
- **4位首部长度（也有叫数据偏移）：表示该TCP头部有多少个32位bit(有多少个4字节); 所以TCP头部最大长度是15 \* 4 = 60**
- **6位保留：保留为今后使用，目前应置为0**
- **URG（紧急：URGent）：当URG = 1时，表示当前报文段中存在优先处理的数据，也叫`带外数据(OOB:out of band)`，不要按原来的排队顺序发送，会把数据紧急插入到本报文段的最前面，这时就和后面的的16位紧急指针配合使用，`可以理解为一种数据的插队机制`**
- **ACK（确认：ACKnowledegment）：仅当ACK = 1时，确认号字段才有效，ACK = 0时，确认号无效**
- **PSH（推送：Push）：提示接收端应用程序立刻从TCP缓冲区把数据读走，比如：A和B正在通信，A端的一个进程希望立刻获得B端的回应，这时A端就把PSH置为1，立即创建一个报文段发送出去，B端收到后，尽快交付给上层的进程，不需要等待缓冲区填满再向上交付**
- **RST（复位：Reset）：RST = 1时，说明TCP连接出现了问题，必须释放连接，然后再重新建立连接，RST还可以用来拒绝一个非法的报文段或者拒绝打开一个连接，RST也可以叫做重置位**
- **SYN（同步：SYNchronization）：在连接建立时用来同步序号，当SYN = 1,ACK = 0时，说明这是一个连接请求报文段，如果对方同意，在响应报文段中SYN = 1,ACK = 1**
- **FIN（完结：Finis）：用来释放一个连接，当FIN = 1时，表示数据发送完毕，并要求断开连接**
- **16位窗口大小：占2字节，窗口指的是发送本报文段的一方的接收窗口（而不是自己的发送窗口），窗口值会告诉对方：从现在开始，我只要多少的数据，是因为接收方的缓冲区大小是有限制的，`窗口字段明确指出了现在允许对方发送的数据里量`**
- **16位校验和：占2字节，发送端填充, CRC校验. 接收端校验不通过, 则认为数据有问题. 此处的检验和不光包含TCP首部, 也包含TCP数据部分**
- **16位紧急指针：占2字节，紧急指针只有在URG = 1时才有意义，实际是一段偏移量，指出紧急数据的末尾在报文段的位置**

#### 4.TCP主要特点

- TCP是面向连接的运输层协议
- 每一条TCP连接只能由两个端点，每一条TCP连接只能是点对点的
- TCP提供可靠交付的服务，通过TCP连接传送的数据，无差错，不丢失，不重复，并且按序到达



#### 5.什么是UDP

**UDP(User Datagram Protocol)** 是一种无连接协议，在计算机网络中用于传输短消息或数据报。它不提供可靠交付、流量控制和拥塞控制等特性，但由于其简单和高效的设计，常被用于实时性要求较高的应用。

> UDP是传输层协议之一，与TCP（传输控制协议）并列成为互联网传输层的两种主要协议。与TCP不同，UDP没有建立连接的过程，发送端直接向接收端发送数据包。数据包的大小也没有限制，可以根据应用需要进行定制。
>
> 由于UDP没有建立连接的过程，所以它的开销相比TCP更小，传输速度也更快。同时，由于UDP没有可靠性保证，发送端发送的数据包有可能会丢失或到达顺序出错，因此它通常用于实时性要求较高的应用，如视频、音频等多媒体数据的传输。
>
> 另外，UDP还支持单播、广播和组播三种传输方式。其中单播是指一对一的传输方式，广播是指将数据包发送到同一网络中的所有设备，而组播是指将数据包发送到指定的一组设备。这些传输方式可以根据应用需要进行灵活的选择。

**UDP通常用于对实时性要求较高的场景，如语音通信，视频通话，直播流媒体，实时多人游戏等，这些场景中，丢失一些数据包对整体效果影响不大，但是要求传输延迟较低。**

#### 6.UDP的协议段格式

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011139856.png)



- **目标和源端口：主要是告诉 UDP 协议应该把报文发给哪个进程**
- **包长度：保存了UDP的首部长度和数据长度的和**
- **校验和：校验和是为了提供可靠的UDP首部和数据，检测数据报在传输中是否有错，有错就丢弃**

#### 7.UDP的主要特点

- **UDP是无连接的：知道对端的IP和端口号就直接进行传输, 不需要建立连接**
- **UDP使用尽最大努力交付（不可靠）：没有确认机制, 没有重传机制; 如果因为网络故障该段无法发到对方, UDP协议层也不会给应用层返回任何错误信息**
- **UDP是面向数据报：不能够灵活的控制读写数据的次数和数量**
- **UDP没有拥塞控制（直播，视频会议等实时应用）**
- **UDP支持一对一，一对多，多对一，多对多的交互通信（腾讯早期使用的就是UDP）**
- **UDP的首部开销小，只有8字节**

#### 8.UDP的缓冲区

- **UDP没有真正意义上的 发送缓冲区. 调用`sendto`会直接交给内核, 由内核将数据传给网络层协议进行后续的传输动作**
- **UDP具有接收缓冲区. 但是这个接收缓冲区不能保证收到的UDP报的顺序和发送UDP报的顺序一致; 如果缓冲区满了, 再到达的UDP数据就会被丢弃**
- **UDP的socket既能读也能写，全双工通信**



## 3.Java中的网络编程	

### 3.1InetAddress类

#### 1.InetAddress综述

IP地址是IP使用的32位（IPv4）或者128位（IPv6）位无符号数字，它是传输层协议TCP，UDP的基础。InetAddress是Java对IP地址的封装，几乎所有的Java网络相关的类都和它有关系，例如：serversocket,socket,URL,DataGramSocket,DataGRamPacket等。

　　InetAddress的实例对象包含以数字形式保存的IP地址，同时还可能包含主机名（如果使用主机名来获取InetAddress的实例，或者使用数字来构造，并且启用了反向主机名解析的功能）。InetAddress类提供了将主机名解析为IP地址（或反之）的方法。

　　InetAddress对域名进行解析是使用本地机器配置或者网络命名服务（如域名系统（Domain Name System，DNS）和网络信息服务（Network Information Service，NIS））来实现。对于DNS来说，本地需要向DNS服务器发送查询的请求，然后服务器根据一系列的操作，返回对应的IP地址，为了提高效率，通常本地会缓存一些主机名与IP地址的映射，这样访问相同的地址，就不需要重复发送DNS请求了。在java.net.InetAddress类同样采用了这种策略。在默认情况下，会缓存一段有限时间的映射，对于主机名解析不成功的结果，会缓存非常短的时间（10秒）来提高性能。

　　Java提供了InetAddress类来代表IP地址，InetAddress下还有2个子类：Inet4Address、Inet6Address,它们分别代表Internet Protocol version 4（IPv4）地址和Internet Protocol version 6（IPv6）地址，不过这两个子类不常用，这里也不在赘述。

　　此外，InetAddress类没有提供构造器，而是提供了如下两个静态方法来获取InetAddress实例：

　　getByName（String host）：根据主机获取对应的InetAddress对象。

　　getByAddress（byte[] addr）：根据原始IP地址来获取对应的InetAddress对象。

#### 2.InetAddress数据结构

![image-20231101135720501](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011357667.png)

可见，**InetAddress**实现了Serializable接口，其对象可序列化



#### 3.InetAddress方法API

![image-20231101135847025](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311011358166.png)

#### 4.代码示例

```java
1 package org.javatop.net.ip;
 2 
 3 import java.net.InetAddress;
 4 import java.net.UnknownHostException;
 5 
 6 /**
 7  * InetAddress用来代表IP地址 一个InetAddress对象代表一个IP地址
 9  * @author Leo
10  *
11  */
12 public class TestInetAddress {
13 
14     public static void main(String[] args) throws UnknownHostException {
15     //如何创建一个InetAddress对象
16     InetAddress inet = InetAddress.getByName("www.baidu.com");
17     System.out.println(inet);
18     System.out.println(inet.getHostName());
19     System.out.println(inet.getHostAddress());
20     //获取本机信息
21     inet = InetAddress.getLocalHost();
22     System.out.println(inet);
23     System.out.println(inet.getHostName());
24     System.out.println(inet.getHostAddress());
25     }
26 
27 }
```



### 3.2Socket类

#### 3.3.1Socket

1. 套接字(Socket)开发网络应用程序被广泛采用，以至于成为事实上的标准。
2. 通信的两端都要有Socket,是两台机器间通信的端点
3. 网络通信其实就是Socket]间的通信。
4. Sockets允许程序把网络连接当成一个流，数据在两个Socket间通过1O传输，
5. 一般主动发起通信的应用程序属客户端，等待通信请求的为服务端

在【客户端/服务端】的通信模式中，客户端需要主动构造与服务器连接的 Socket，构造方法有以下几种重载形式：

```java
Socket()
Socket(InetAddress address, int port) throws UnknownHostException,IOException
Socket(InetAddress address, int port, InetAddress localAddr, int localPort) throws IOException
Socket(String host, int port) throws UnknownHostException,IOException
Socket(String host, int port, InetAddress localAddr, int localPort) throws IOException
Socket(Proxy proxy)
```

除了第一个不带参数的构造方法，其他构造方法都会试图建立与服务器的连接，一旦连接成功，就返回 Socket 对象，否则抛出异常

##### 1. 设定等待建立连接的超时时间

当客户端的 Socket 构造方法请求与服务器连接时，可能要等待一段时间。在默认情况下，Socket 构造方法会一直等待下去，直到连接成功，或者出现异常。Socket 构造方法请求连接时，受底层网络的传输速度的影响，可能会处于长时间的等待状态。如果希望限定等待连接的时间，就需要使用第一个不带参数的构造方法

```java
Socket socket = new Socket();
SocketAddress remoteAddr = new InetSocketAddress("1ocalhostn", 8000);
// 参数endpoint指定服务器的地址,参数timeout设定的超时时间(ms)
// 如果参数timeout被设为0则表示永远不会超时
socket.connect(remoteAddr, 60000);
```

以上代码用于连接到本地机器上的监听 8000 端口的服务器程序，等待连接的最长时间为一分钟。如果在一分钟内连接成功，则 `connect()` 方法顺利返回，如果在一分钟内出现某种异常则抛出该异常，如果在一分钟后既没有连接成功，也没有出现异常，那么会抛出 SocketTimeoutException

##### 2. 设定服务器的地址

除了不带参数的构造方法，其他构造方法都需要在参数中设定服务器的地城，包括服务器的 IP 或主机名，以及端口

```java
// address表示主机的IP地址
Socket(InetAddress address, int port)
// address表示主机的名字
Socket(String host, int port)
```

InetAddress 类表示主机的P地址，提供了一系列静态工厂方法用于构造自身实例

```java
// 返回本地主机的IP地址、
InetAddress addr1 = inetAddress.getLocalHost();
// 返回代表 "222.34.57” 的 IPv4 地址
InetAddress addr2 = InetAddress.getByName("222.34.5.7");
// 返同代表 ”2001:DB8:2DE::E13" 的 IPv6 地址
InetAddress addr3 = InetAddress.getByName("2001:DB8:2DE::E13");
// 返回主机名为 "www.javathinker.net" 的 IP 地址
InetAddress addr4 = InetAddress.getByName ("www.javathinker.net");
```

##### 3. 设定客户端的地址

在一个 Socket 对象中既包含远程服务器的 IP 地址和端口信息，也包含本地客户端的 IP 地址和端口信息。在默认情况下，客户端的 IP 地址来自客户程序所在的主机，客户端的端口则由操作系统随机分配。Socket 类还有两个构造方法允许显式地设置客户端的 IP 地址和端口

```java
Socket(InetAddress address, int port, InetAddress localAddr, int localPort) throws IOException
Socket(String host, int port, InetAddress localAddr, int localPort) throws IOException
```

如果一个主机同时属于两个以上的网络，它就可能拥有两个以上 IP 地址，例如一个主机在 Internet 网络中的 IP 地址为 “222.67,1.34”，在一个局域网中的 IP 地址为 “1125.4.3"，假定这个主机上的客户程序希望和同一个局城网上的一个地址为 “112.5.4.4:8000” 的服务器程序通信，客户端可按照如下方式构造 Socket 对象

```java
InetAddress remoteAddr = InetAddress.getByName("112.5,4.45");
InetAddress localAddr = InetAddress.getByName("112.5.4.3");
//客户端使用口2345
Socket socket = new Socket(remoteAddr, 8000, localAddr, 2345);
```

##### 4. 客户连接服务器时可能抛出的异常

当 Socket 的构造方法请求连接服务器时，可能会抛出以下异常：

- UnknownHostException：无法识别主机的名字或 IP 地址
- ConnectException：没有服务器进程监听指定的端口，或者服务器进程拒绝连接
- SocketTimeoutException：等待连接超时
- BindException：无法把Socket 对象与指定的本地 IP 地址或端口绑定

##### 5. 使用代理服务器

在实际应用中，有的客户程序会通过代理服务器来访问远程服务器。代理服务器有许多功能，比如能作为防火墙进行安全防范，或者提高访问速度，或者具有访问特定远程服务器的权限

```java
String proxyIP = "myproxy.abc.oom"; // 代理服务器地址
int proxyPort = 1080; // 代理服务器端口
// 创建代理对象
Proxy proxy = new Proxy(Proxy.Type.SOCKS, new InetSocketAddress(proxyIP, proxyPort));
Socket socket  new Socket(proxy);
//连接到远程服务器
socket.connect(new InetSocketAddress("www.javathinker.net", 80));
```

ProxyType 类表示代理服务器的类型，有以下可选值：

- Proxy.Type.SOCKS：在分层的网络结构中，SOCKS 是位于会话层的代理类型
- Proxy.Type.HTTP：在分层的网络结构中，HTTP 是位于应用层的代理类型
- Proxy.Type.DIRECT：不使用代理，直接连接远程服务器

##### 6. InetAddress 地址类的用法

InetAddress 类表示主机的IP 地址，InetAddress 类的静态工厂方法给 `getByName()` 用于构造自身的实例

```java
// 返回代表 "222.34.5.7" 的 IPv4 地址
InetAddress addr2 = InetAddress,getByName("222.34.5.7");
// 返回主机名为 "www.javathinker.net" 的 IP 地址
InetAddress addr4 = InetAddress.getByName("www.javathinker.net");
```

InetAddress 还提供了获取相应的主机名的两种方法：

- `getHostname()`：首先从 DNS 缓存中查找与 IP 地址匹配的主机名，如果不存在，再通过 DNS 服务器查找，如果找到，则返回主机名，否则返回 IP 地址
- `getCanonicalHostName()`：通过 DNS 服务器查找与 IP 地址匹配的主机名，如果找到则返回主机名，否则返问 IP 地址

以上两种方法的区别在于 `getHostname()` 会先查找 DNS 缓存，减少查找 DNS 服务器的概率，提高查找性能。而 `getCanonicalHostName()` 总是查找 DNS 服务器，确保获得当前最新版本的主机名

InetAddress 类还提供了两个测试能否从本地主机连接到特定主机的方法：

```java
public boolean isReachable(int timeout) throws IOException
public boolean isReachable(NefworkInterface interface, int ttl, int timeout) throws IOException
```

如果远程主机在参数 timeout（ms）指定的时间内做出回应，以上方法返回true，否则返回 false，如果出现网络错误则抛出 IOException。第二种方法还允许从参数指定的本地网络接口建立连接，以及 TTL（IP 数据包被丢弃前允许存在的时间）

##### 7. NetworkInterface 类的用法

NetworkInterfiace 类表示物理上的网络接口，它有两种构造自身实例的静态工厂方法，这两种方法都声明抛出 SocketException

```java
// 参数 name 指定网络接口的名字，如果不存在与名字对应的网络接口，就返回 null
getByName(String name)
// 参数 address 指定网络接口的 IP 地址，如果不存在与 IP 地址对应的网络接口，就返回 null
getByInetAddress(InetAddress address)
```

NetworkInterface 类的以下方法用于获取网络接口的信息

```java
// 返回网络接口的名字
public String getName()
// 返回和网络接口绑定的所有 IP 地址，返回值为 Enumeration 类型，里面存放了表示 IP 地址的 InetAddress 对象
public Enumeration getInetAddresses()
```



#### 3.3.2获取 Socket 的信息

在一个 Socket 对象中同时包含了远程服务器的 IP 地址和端口信息，以及客户本地的 IP 地址和端口信息。此外，从 Socket 对象中还可以获得输出流和输入流，分别用于向服务器发送数据，以及接收从服务器端发来的数据

以下方法用于获取 Socket 的有关信息

```java
// 获得远程被连接进程的IP地址
getInetAddress()
// 获得远程被连接进程的端口
getPort()
// 获得本地的IP地址
getLocalAddress()
// 获得本地的端口
getLocalPort()
// 获得输入流,如果Socket还没有连接,或者已经关团,或者已经通过shutdownInput()方法关闭输入流,那么此方法会抛出IOException
getInputStream()
// 获得输出流,如果Socket还没有连接,或者已经关闭,或者已经通过shutdownOutput()方法关闭输出流,那么此方法会抛出 IOException
getOutputStream()
```



#### 3.3.3关闭 Socket

当客户与服务器的通信结束时，应该及时关闭 Socket，以释放 Socket 占用的包括端口在内的各种资源。Socket 的 `close()` 方法负责关闭 Socket，如果一个 socket 对象被关闭，就不能再通过它的输入流和输出流进行 IO 操作，否则会导致 IOException

Socket 类提供了三个状态测试方法

```java
// 如果Socket没有关闭，则返回false，否则返回true
isClosed()
// 如果Socket曾经连接到远程主机，不管当前是否已经关闭，都返回true。如果Socket从未连接到远程主机，就返回false
isConnected()
// 如果Socket已经与一个本地端口绑定，则返回true，否则返回false
isBound()
```

如果要判断一个 Socket 对象当前是否处于连接状态，可采用以下方式

```java
String isConnected = socket.isConnected() && !socket.isClosed();
```



#### 3.3.4半关闭 Socket

进程 A 与进程 B 通过 Socket 通信，假定进程 A 输出数据，进程 B 读入数据，进程 A 如何告诉进程 B 所有数据已经输出完毕呢？有几种处理办法：

- 如果进程 A 与进程 B 交换的是字符流，并且都一行一行地读写数据，那么可以事先约定以一个特殊的标志作为结束标志，例如以字符串 “bye” 作为结束标志，当进程 A 向进程 B 发送一行字符串 “bye”，进程 B 读到这一行数据后，就停止读取数据

- 进程 A 先发送一个消息，告诉进程 B 所发送的正文的长度，然后发送正文。进程 B 先获知进程 A 将发送的正文的长度，接下来只要读取该长度的字符或者字节，就停止读取数据

- 进程 A 发完所有数据后，关闭 Socket，当进程 B 读入了进程 A 发送的所有数据后，再次执行输入流的 read() 方法时，该方法返回 “-1”，如果执行 BufferedReader 的 readLine() 方法，那么该方法返回 null

  ```java
  ByteArrayOutputstream bufferenew = ByteArrayOutputstream();
  byte[] buff = new byte[1024);
  int len = -1;
  while((len = socketIn.read(buff)) != -1) {
      buffer.write(buff, 0, len);   
  }
  ```

- 当调用 Socke t的 close() 方法关闭 Socket 后，它的输出流和输入流也都被关闭。有的时候，可能仅仅希望关闭输出流或输入流之一，此时可以采用 Socket 类提供的半关闭方法

  ```java
  shutdownInput() // 关闭输入流
  shutdownOutput() // 关团输出流
  ```

  假定进程 A 执行以下代码，先向进程 B 发送一个字符串，等到进程 B 接收到这个字符串后，进程 A 再调用 Socket 的 shutdownOutput() 方法关闭输出流，接下来进程 A 不允许再输出数据，但是仍可以通过输入流读入数据

  

  ```java
  // 发出请求信息
  String data = ...;
  OutputStream socketOut = socket.getOutputStream();
  socketOut.write(data.getBytes());
  socketOut.flush();
  // 读取响应
  InputStream socketIn = socket.getInputStream();
  if(服务器端返回提示信息，表明已经接收到客户端的所有请求数据)
      socket.shutdownOutput(); //关闭输出流
  //继续通过socketIn读取数据
  ...
  ```

  值得注意的是，先后调用 Socket 的 shutdownInput() 和 shutdownOutput() 方法，仅仅关闭了输入流和输出流，并不等价于调用 Socket 的 close() 方法。在通信结束后，仍然要调用 Socket 的 close() 方法，因为只有该方法才会释放 Socket 占用的资源，比如占用的本地端口等

  Socket 类还提供了两种状态测试方法，用来判断输入流和输出流是否关闭

  

  ```java
  public boolean isInputShutdown() // 如果输入流关闭，则返回true，否则返回false
  public boolean isOutputShutdown() // 如果输出流关闭，则返回true，否则返回false
  ```



## 4.TCP通信编程

### 4.1创建简单客户端服务端连接

**注意：在网络编程中，我们必须养成一个好习惯，首先编写服务端，然后首先启动服务端，再去处理客户端。**

#### 1.编写服务端

```java
package org.javatop.socket;

import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-02 9:44
 * @description : 服务端
 */
public class SocketTCPServer01 {

    public static void main(String[] args) throws IOException {

        /*
            * 1. 在本机的8888端口监听, 等待连接
            * 细节: 要求在本机没有其它服务在监听9999
            * 细节：这个 ServerSocket 可以通过 accept() 返回多个Socket[多个客户端连接服务器的并发]
        */

        ServerSocket serverSocket = new ServerSocket(8888);
        System.out.println("服务端，在8888端口监听，等待连接..");
        //2. 当没有客户端连接9999端口时，程序会 阻塞, 等待连接
        //如果有客户端连接，则会返回Socket对象，程序继续

        Socket socket = serverSocket.accept();

        System.out.println("服务端 socket ="+socket.getClass());
        //
        //3. 通过socket.getInputStream() 读取客户端写入到数据通道的数据, 显示
        InputStream is = socket.getInputStream();
        //4. 通过IO流读取
        byte[] buf = new byte[1024];
        int readLen = 0;
        while((readLen = is.read(buf))!=-1){
            //根据读取到的实际长度，显示内容.
            System.out.println(new String(buf, 0, readLen));
        }
        //5.关闭流和socket
        is.close();
        socket.close();
        serverSocket.close();//关闭
    }

}
```



#### 2.编写客户端

```java
package org.javatop.socket;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-02 9:44
 * @description : 客户端
 */
public class SocketTCPClent01 {

    public static void main(String[] args) throws IOException {
        /*
         *  1. 连接服务端 (ip , 端口）
         *  连接本机的 8888端口, 如果连接成功，返回Socket对象
         */

        Socket socket = new Socket(InetAddress.getLocalHost(), 8888);
        System.out.println("客户端 socket返回=" + socket.getClass());
	
        //2. 连接上之后，生成Socket, 通过socket.getOutputStream()
        // 得到 和 socket对象关联的输出流对象
        OutputStream outputStream = socket.getOutputStream();
        //3. 通过输出流，写入数据到 数据通道
        outputStream.write("hello, SocketTCPServer01,我是客户端，这是我给你发的一条信息".getBytes());
        //4. 关闭流对象和socket, 必须关闭
        outputStream.close();
        socket.close();
        System.out.println("客户端退出.....");
    }
}

```

**控制台打印：**

![image-20231102100348316](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311021003629.png)

**首先客户端连接服务端，io流写入信息之后，就直接退出连接了。**

![image-20231102100433605](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311021004723.png)

**而服务端在启动之后就开始就开始监听8888端口，然后等待客户端连接，直到客户端连接上之后，首先打印服务端的socket，然后接收到客户端发来的消息并打印在控制台上。**		

### 4.2创建复杂客户端服务端连接

上面我们实现了一个简单的TCP通信案例，接下来我们来改进这个程序，让他更完善。

**需求：客户端连接到服务端之后，发送一条消息，等服务端读取到这条消息之后，还需要接收到服务端发给客户端的一条消息之后，再退出连接。**

**思路分析：我们可以当客户端发送完一条消息之后，给出一个标识，服务端知道我们发送完毕消息了，当服务端收到这个标识之后就知道客户端已经把消息发送完毕了，此时服务端接收到消息，并且发送发送一条消息，然后也给出客户端一条标识信息，让客户端知道我们消息发送完毕，此时客户端就可以接受到我们服务端发送的消息了，最后，客户端退出连接。**

#### 1.改进服务端

```java
package org.javatop.socket;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-02 9:44
 * @description : 服务端
 */
public class SocketTCPServer02 {

    public static void main(String[] args) throws IOException {

        /*
            * 1. 在本机的8888端口监听, 等待连接
            * 细节: 要求在本机没有其它服务在监听9999
            * 细节：这个 ServerSocket 可以通过 accept() 返回多个Socket[多个客户端连接服务器的并发]
        */

        ServerSocket serverSocket = new ServerSocket(8888);
        System.out.println("服务端，在8888端口监听，等待连接..");
        //2. 当没有客户端连接8888端口时，程序会 阻塞, 等待连接
        //如果有客户端连接，则会返回Socket对象，程序继续

        Socket socket = serverSocket.accept();

        System.out.println("服务端 socket ="+socket.getClass());
        //
        //3. 通过socket.getInputStream() 读取客户端写入到数据通道的数据, 显示
        InputStream is = socket.getInputStream();
        //4. 通过IO流读取
        byte[] buf = new byte[1024];
        int readLen = 0;
        while((readLen = is.read(buf))!=-1){
            //根据读取到的实际长度，显示内容.
            System.out.println(new String(buf, 0, readLen));
        }
        //5. 获取socket相关联的输出流
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write("hello, SocketTCPClent02,我是服务端，这是我给你回的一条信息....".getBytes());
        //6.设置结束标记
        socket.shutdownOutput();
        //7.关闭流和socket
        is.close();
        socket.close();
        serverSocket.close();
    }
}
```



#### 2.改进客户端

```java
package org.javatop.socket;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-02 9:44
 * @description : 客户端
 */
public class SocketTCPClent02 {

    public static void main(String[] args) throws IOException {
        /*
         *  1. 连接服务端 (ip , 端口）
         *  连接本机的 8888端口, 如果连接成功，返回Socket对象
         */

        Socket socket = new Socket(InetAddress.getLocalHost(), 8888);
        System.out.println("客户端 socket返回=" + socket.getClass());

        //2. 连接上之后，生成Socket, 通过socket.getOutputStream()
        // 得到 和 socket对象关联的输出流对象
        OutputStream outputStream = socket.getOutputStream();

        //3. 通过输出流，写入数据到 数据通道
        outputStream.write("hello, SocketTCPServer02,我是客户端，这是我给你发的一条信息".getBytes());

        //4.设置结束标记
        socket.shutdownOutput();

        //5. 获取和socket关联的输入流. 读取数据(字节)，并显示
        InputStream inputStream = socket.getInputStream();
        byte[] buf = new byte[1024];
        int readLen = 0;
        while ((readLen = inputStream.read(buf)) != -1) {
            System.out.println("客户端收到服务端的 回复信息 = " + new String(buf, 0, readLen));
        }
        //6.关闭流对象和socket, 必须关闭
        outputStream.close();
        socket.close();
        System.out.println("客户端退出.....");
    }
}
```



**控制台打印：**

![image-20231102102120917](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311021021012.png)

**首先客户端连接服务端，io流写入信息之后，就给出标记点，告知服务端自己的消息已经发送完毕，然后等待服务端传来的消息，一旦接收到服务端传递过来的消息就可以退出连接了。**

![image-20231102102053523](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311021020622.png)

**而服务端在启动之后就开始就开始监听8888端口，然后等待客户端连接，直到客户端连接上之后，首先打印服务端的socket，然后接收到客户端发来的消息并打印在控制台上，并给客户端发送一条消息，然后给出一个标识，告知客户端自己消息已经发送完了。**

### 4.3TCP细节

- 构造方法

  | 方法名                  | 说明                             |
  | ----------------------- | -------------------------------- |
  | ServletSocket(int port) | 创建绑定到指定端口的服务器套接字 |

- 相关方法

  | 方法名          | 说明                           |
  | --------------- | ------------------------------ |
  | Socket accept() | 监听要连接到此的套接字并接受它 |

- 注意事项

  1. accept方法是阻塞的,作用就是等待客户端连接
  2. 客户端创建对象并连接服务器,此时是通过三次握手协议,保证跟服务器之间的连接
  3. 针对客户端来讲,是往外写的,所以是输出流
     针对服务器来讲,是往里读的,所以是输入流
  4. read方法也是阻塞的
  5. 客户端在关流的时候,还多了一个往服务器写结束标记的动作
  6. 最后一步断开连接,通过四次挥手协议保证连接终止

#### 1.三次握手

![07_TCP三次握手](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311021029775.png)



#### 2.四次挥手

![08_TCP四次挥手](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202311021030207.png)







## 5.UDP通信程序

### 5.1UDP发送数据

- Java中的UDP通信

  - UDP协议是一种不可靠的网络协议，它在通信的两端各建立一个Socket对象，但是这两个Socket只是发送，接收数据的对象，因此对于基于UDP协议的通信双方而言，没有所谓的客户端和服务器的概念
  - Java提供了DatagramSocket类作为基于UDP协议的Socket

- 构造方法

  | 方法名                                                      | 说明                                                 |
  | ----------------------------------------------------------- | ---------------------------------------------------- |
  | DatagramSocket()                                            | 创建数据报套接字并将其绑定到本机地址上的任何可用端口 |
  | DatagramPacket(byte[] buf,int len,InetAddress add,int port) | 创建数据包,发送长度为len的数据包到指定主机的指定端口 |

- 相关方法

  | 方法名                         | 说明                   |
  | ------------------------------ | ---------------------- |
  | void send(DatagramPacket p)    | 发送数据报包           |
  | void close()                   | 关闭数据报套接字       |
  | void receive(DatagramPacket p) | 从此套接字接受数据报包 |

- 发送数据的步骤

  - 创建发送端的Socket对象(DatagramSocket)
  - 创建数据，并把数据打包
  - 调用DatagramSocket对象的方法发送数据
  - 关闭发送端

- 代码演示

  ```java
  public class SendDemo {
      public static void main(String[] args) throws IOException {
          //创建发送端的Socket对象(DatagramSocket)
          // DatagramSocket() 构造数据报套接字并将其绑定到本地主机上的任何可用端口
          DatagramSocket ds = new DatagramSocket();
  
          //创建数据，并把数据打包
          //DatagramPacket(byte[] buf, int length, InetAddress address, int port)
          //构造一个数据包，发送长度为 length的数据包到指定主机上的指定端口号。
          byte[] bys = "hello,udp,我来了".getBytes();
  
          DatagramPacket dp = new DatagramPacket(bys,bys.length,InetAddress.getByName("127.0.0.1"),10086);
  
          //调用DatagramSocket对象的方法发送数据
          //void send(DatagramPacket p) 从此套接字发送数据报包
          ds.send(dp);
  
          //关闭发送端
          //void close() 关闭此数据报套接字
          ds.close();
      }
  }
  ```

### 5.2UDP接收数据

- 接收数据的步骤

  - 创建接收端的Socket对象(DatagramSocket)
  - 创建一个数据包，用于接收数据
  - 调用DatagramSocket对象的方法接收数据
  - 解析数据包，并把数据在控制台显示
  - 关闭接收端

- 构造方法

  | 方法名                              | 说明                                            |
  | ----------------------------------- | ----------------------------------------------- |
  | DatagramPacket(byte[] buf, int len) | 创建一个DatagramPacket用于接收长度为len的数据包 |

- 相关方法

  | 方法名            | 说明                                     |
  | ----------------- | ---------------------------------------- |
  | byte[]  getData() | 返回数据缓冲区                           |
  | int  getLength()  | 返回要发送的数据的长度或接收的数据的长度 |

- 示例代码

  ```java
  public class ReceiveDemo {
      public static void main(String[] args) throws IOException {
        	//创建接收端的Socket对象(DatagramSocket)
        	DatagramSocket ds = new DatagramSocket(12345);
  
        	//创建一个数据包，用于接收数据
        	byte[] bys = new byte[1024];
        	DatagramPacket dp = new DatagramPacket(bys, bys.length);
  
        	//调用DatagramSocket对象的方法接收数据
        	ds.receive(dp);
  
        	//解析数据包，并把数据在控制台显示
        	System.out.println("数据是：" + new String(dp.getData(), 0,dp.getLength()));
          }
      }
  }
  ```

### 5.3UDP通信程序练习

- 案例需求

  UDP发送数据：数据来自于键盘录入，直到输入的数据是886，发送数据结束

  UDP接收数据：因为接收端不知道发送端什么时候停止发送，故采用死循环接收

- 代码实现

  ```java
  /*
      UDP发送数据：
          数据来自于键盘录入，直到输入的数据是886，发送数据结束
   */
  public class SendDemo {
      public static void main(String[] args) throws IOException {
          //创建发送端的Socket对象(DatagramSocket)
          DatagramSocket ds = new DatagramSocket();
          //键盘录入数据
          Scanner sc = new Scanner(System.in);
          while (true) {
            	String s = sc.nextLine();
              //输入的数据是886，发送数据结束
              if ("886".equals(s)) {
                  break;
              }
              //创建数据，并把数据打包
              byte[] bys = s.getBytes();
              DatagramPacket dp = new DatagramPacket(bys, bys.length, InetAddress.getByName("192.168.1.66"), 12345);
  
              //调用DatagramSocket对象的方法发送数据
              ds.send(dp);
          }
          //关闭发送端
          ds.close();
      }
  }
  
  /*
      UDP接收数据：
          因为接收端不知道发送端什么时候停止发送，故采用死循环接收
   */
  public class ReceiveDemo {
      public static void main(String[] args) throws IOException {
          //创建接收端的Socket对象(DatagramSocket)
          DatagramSocket ds = new DatagramSocket(12345);
          while (true) {
              //创建一个数据包，用于接收数据
              byte[] bys = new byte[1024];
              DatagramPacket dp = new DatagramPacket(bys, bys.length);
              //调用DatagramSocket对象的方法接收数据
              ds.receive(dp);
              //解析数据包，并把数据在控制台显示
              System.out.println("数据是：" + new String(dp.getData(), 0, dp.getLength()));
          }
          //关闭接收端
  //        ds.close();
      }
  }
  ```

### 5.4UDP三种通讯方式

- 单播

  单播用于两个主机之间的端对端通信

- 组播

  组播用于对一组特定的主机进行通信

- 广播

  广播用于一个主机对整个局域网上所有主机上的数据通信

### 5.5UDP组播实现

- 实现步骤

  - 发送端
    1. 创建发送端的Socket对象(DatagramSocket)
    2. 创建数据，并把数据打包(DatagramPacket)
    3. 调用DatagramSocket对象的方法发送数据(在单播中,这里是发给指定IP的电脑但是在组播当中,这里是发给组播地址)
    4. 释放资源
  - 接收端
    1. 创建接收端Socket对象(MulticastSocket)
    2. 创建一个箱子,用于接收数据
    3. 把当前计算机绑定一个组播地址
    4. 将数据接收到箱子中
    5. 解析数据包,并打印数据
    6. 释放资源

- 代码实现

  ```java
  // 发送端
  public class ClinetDemo {
      public static void main(String[] args) throws IOException {
          // 1. 创建发送端的Socket对象(DatagramSocket)
          DatagramSocket ds = new DatagramSocket();
          String s = "hello 组播";
          byte[] bytes = s.getBytes();
          InetAddress address = InetAddress.getByName("224.0.1.0");
          int port = 10000;
          // 2. 创建数据，并把数据打包(DatagramPacket)
          DatagramPacket dp = new DatagramPacket(bytes,bytes.length,address,port);
          // 3. 调用DatagramSocket对象的方法发送数据(在单播中,这里是发给指定IP的电脑但是在组播当中,这里是发给组播地址)
          ds.send(dp);
          // 4. 释放资源
          ds.close();
      }
  }
  // 接收端
  public class ServerDemo {
      public static void main(String[] args) throws IOException {
          // 1. 创建接收端Socket对象(MulticastSocket)
          MulticastSocket ms = new MulticastSocket(10000);
          // 2. 创建一个箱子,用于接收数据
          DatagramPacket dp = new DatagramPacket(new byte[1024],1024);
          // 3. 把当前计算机绑定一个组播地址,表示添加到这一组中.
          ms.joinGroup(InetAddress.getByName("224.0.1.0"));
          // 4. 将数据接收到箱子中
          ms.receive(dp);
          // 5. 解析数据包,并打印数据
          byte[] data = dp.getData();
          int length = dp.getLength();
          System.out.println(new String(data,0,length));
          // 6. 释放资源
          ms.close();
      }
  }
  ```

### 5.6UDP广播实现

- 实现步骤

  - 发送端
    1. 创建发送端Socket对象(DatagramSocket)
    2. 创建存储数据的箱子,将广播地址封装进去
    3. 发送数据
    4. 释放资源
  - 接收端
    1. 创建接收端的Socket对象(DatagramSocket)
    2. 创建一个数据包，用于接收数据
    3. 调用DatagramSocket对象的方法接收数据
    4. 解析数据包，并把数据在控制台显示
    5. 关闭接收端

- 代码实现

  ```java
  // 发送端
  public class ClientDemo {
      public static void main(String[] args) throws IOException {
        	// 1. 创建发送端Socket对象(DatagramSocket)
          DatagramSocket ds = new DatagramSocket();
  		// 2. 创建存储数据的箱子,将广播地址封装进去
          String s = "广播 hello";
          byte[] bytes = s.getBytes();
          InetAddress address = InetAddress.getByName("255.255.255.255");
          int port = 10000;
          DatagramPacket dp = new DatagramPacket(bytes,bytes.length,address,port);
  		// 3. 发送数据
          ds.send(dp);
  		// 4. 释放资源
          ds.close();
      }
  }
  
  // 接收端
  public class ServerDemo {
      public static void main(String[] args) throws IOException {
          // 1. 创建接收端的Socket对象(DatagramSocket)
          DatagramSocket ds = new DatagramSocket(10000);
          // 2. 创建一个数据包，用于接收数据
          DatagramPacket dp = new DatagramPacket(new byte[1024],1024);
          // 3. 调用DatagramSocket对象的方法接收数据
          ds.receive(dp);
          // 4. 解析数据包，并把数据在控制台显示
          byte[] data = dp.getData();
          int length = dp.getLength();
          System.out.println(new String(data,0,length));
          // 5. 关闭接收端
          ds.close();
      }
  }
  ```



## 6.综合代码练习

通过上面的学习，我们对网络编程已经有了一个基本了解，下面通过一些案例来巩固一下我们学习的知识。

### 练习一：多发多收

需求：

​	客户端：多次发送数据

​	服务器：接收多次接收数据，并打印

代码示例：

```java
public class Client {
    public static void main(String[] args) throws IOException {
        //客户端：多次发送数据
        //服务器：接收多次接收数据，并打印

        //1. 创建Socket对象并连接服务端
        Socket socket = new Socket("127.0.0.1",10000);

        //2.写出数据
        Scanner sc = new Scanner(System.in);
        OutputStream os = socket.getOutputStream();

        while (true) {
            System.out.println("请输入您要发送的信息");
            String str = sc.nextLine();
            if("886".equals(str)){
                break;
            }
            os.write(str.getBytes());
        }
        //3.释放资源
        socket.close();
    }
}
```

```java
public class Server {
    public static void main(String[] args) throws IOException {
        //客户端：多次发送数据
        //服务器：接收多次接收数据，并打印

        //1.创建对象绑定10000端口
        ServerSocket ss = new ServerSocket(10000);

        //2.等待客户端来连接
        Socket socket = ss.accept();

        //3.读取数据
        InputStreamReader isr = new InputStreamReader(socket.getInputStream());
        int b;
        while ((b = isr.read()) != -1){
            System.out.print((char)b);
        }

        //4.释放资源
        socket.close();
        ss.close();
    }
}
```



### 练习二：接收并反馈

- 案例需求

  客户端：发送数据，接受服务器反馈

  服务器：收到消息后给出反馈

- 案例分析

  - 客户端创建对象，使用输出流输出数据
  - 服务端创建对象，使用输入流接受数据
  - 服务端使用输出流给出反馈数据
  - 客户端使用输入流接受反馈数据

- 代码实现

  ```java
  // 客户端
  public class ClientDemo {
      public static void main(String[] args) throws IOException {
          Socket socket = new Socket("127.0.0.1",10000);
  
          OutputStream os = socket.getOutputStream();
          os.write("hello".getBytes());
         // os.close();如果在这里关流,会导致整个socket都无法使用
          socket.shutdownOutput();//仅仅关闭输出流.并写一个结束标记,对socket没有任何影响
          
          BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
          String line;
          while((line = br.readLine())!=null){
              System.out.println(line);
          }
          br.close();
          os.close();
          socket.close();
      }
  }
  // 服务器
  public class ServerDemo {
      public static void main(String[] args) throws IOException {
          ServerSocket ss = new ServerSocket(10000);
  
          Socket accept = ss.accept();
  
          InputStream is = accept.getInputStream();
          int b;
          while((b = is.read())!=-1){
              System.out.println((char) b);
          }
  
          System.out.println("看看我执行了吗?");
  
          BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(accept.getOutputStream()));
          bw.write("你谁啊?");
          bw.newLine();
          bw.flush();
  
          bw.close();
          is.close();
          accept.close();
          ss.close();
      }
  }
  ```

### 练习三：上传练习（TCP协议）

- 案例需求

  客户端：数据来自于本地文件，接收服务器反馈

  服务器：接收到的数据写入本地文件，给出反馈

- 案例分析

  - 创建客户端对象，创建输入流对象指向文件，每读一次数据就给服务器输出一次数据，输出结束后使用**shutdownOutput()**方法告知服务端传输结束
  - 创建服务器对象，创建输出流对象指向文件，每接受一次数据就使用输出流输出到文件中，传输结束后。使用输出流给客户端反馈信息
  - 客户端接受服务端的回馈信息

- 相关方法

  | 方法名                | 说明                               |
  | --------------------- | ---------------------------------- |
  | void shutdownInput()  | 将此套接字的输入流放置在“流的末尾” |
  | void shutdownOutput() | 禁止用此套接字的输出流             |

- 代码实现

  ```java
  public class Client {
      public static void main(String[] args) throws IOException {
          //客户端：将本地文件上传到服务器。接收服务器的反馈。
          //服务器：接收客户端上传的文件，上传完毕之后给出反馈。
  
  
          //1. 创建Socket对象，并连接服务器
          Socket socket = new Socket("127.0.0.1",10000);
  
          //2.读取本地文件中的数据，并写到服务器当中
          BufferedInputStream bis = new BufferedInputStream(new FileInputStream("mysocketnet\\clientdir\\a.jpg"));
          BufferedOutputStream bos = new BufferedOutputStream(socket.getOutputStream());
          byte[] bytes = new byte[1024];
          int len;
          while ((len = bis.read(bytes)) != -1){
              bos.write(bytes,0,len);
          }
  
          //往服务器写出结束标记
          socket.shutdownOutput();
  
  
          //3.接收服务器的回写数据
          BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
          String line = br.readLine();
          System.out.println(line);
  
  
          //4.释放资源
          socket.close();
  
      }
  }
  ```

  ```java
  public class Server {
      public static void main(String[] args) throws IOException {
          //客户端：将本地文件上传到服务器。接收服务器的反馈。
          //服务器：接收客户端上传的文件，上传完毕之后给出反馈。
  
  
          //1.创建对象并绑定端口
          ServerSocket ss = new ServerSocket(10000);
  
          //2.等待客户端来连接
          Socket socket = ss.accept();
  
          //3.读取数据并保存到本地文件中
          BufferedInputStream bis = new BufferedInputStream(socket.getInputStream());
          BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("mysocketnet\\serverdir\\a.jpg"));
          int len;
          byte[] bytes = new byte[1024];
          while ((len = bis.read(bytes)) != -1){
              bos.write(bytes,0,len);
          }
          bos.close();
          //4.回写数据
          BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
          bw.write("上传成功");
          bw.newLine();
          bw.flush();
  
          //5.释放资源
          socket.close();
          ss.close();
      }
  }
  ```

### 练习四：文件名重复

```java
 public class UUIDTest {
    public static void main(String[] args) {
        String str = UUID.randomUUID().toString().replace("-", "");
        System.out.println(str);//9f15b8c356c54f55bfcb0ee3023fce8a
    }
}
```

```java
public class Client {
    public static void main(String[] args) throws IOException {
        //客户端：将本地文件上传到服务器。接收服务器的反馈。
        //服务器：接收客户端上传的文件，上传完毕之后给出反馈。


        //1. 创建Socket对象，并连接服务器
        Socket socket = new Socket("127.0.0.1",10000);

        //2.读取本地文件中的数据，并写到服务器当中
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream("mysocketnet\\clientdir\\a.jpg"));
        BufferedOutputStream bos = new BufferedOutputStream(socket.getOutputStream());
        byte[] bytes = new byte[1024];
        int len;
        while ((len = bis.read(bytes)) != -1){
            bos.write(bytes,0,len);
        }

        //往服务器写出结束标记
        socket.shutdownOutput();


        //3.接收服务器的回写数据
        BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        String line = br.readLine();
        System.out.println(line);


        //4.释放资源
        socket.close();

    }
}
```

```java
public class Server {
    public static void main(String[] args) throws IOException {
        //客户端：将本地文件上传到服务器。接收服务器的反馈。
        //服务器：接收客户端上传的文件，上传完毕之后给出反馈。


        //1.创建对象并绑定端口
        ServerSocket ss = new ServerSocket(10000);

        //2.等待客户端来连接
        Socket socket = ss.accept();

        //3.读取数据并保存到本地文件中
        BufferedInputStream bis = new BufferedInputStream(socket.getInputStream());
        String name = UUID.randomUUID().toString().replace("-", "");
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("mysocketnet\\serverdir\\" + name + ".jpg"));
        int len;
        byte[] bytes = new byte[1024];
        while ((len = bis.read(bytes)) != -1) {
            bos.write(bytes, 0, len);
        }
        bos.close();
        //4.回写数据
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
        bw.write("上传成功");
        bw.newLine();
        bw.flush();

        //5.释放资源
        socket.close();
        ss.close();
    }
}
```

### 练习五：服务器改写为多线程

服务器只能处理一个客户端请求，接收完一个图片之后，服务器就关闭了。

**优化方案一：**

​	使用循环

弊端：

​	第一个用户正在上传数据，第二个用户就来访问了，此时第二个用户是无法成功上传的。

​	所以，使用多线程改进

**优化方案二：**

​	每来一个用户，就开启多线程处理

```java
public class Client {
    public static void main(String[] args) throws IOException {
        //客户端：将本地文件上传到服务器。接收服务器的反馈。
        //服务器：接收客户端上传的文件，上传完毕之后给出反馈。


        //1. 创建Socket对象，并连接服务器
        Socket socket = new Socket("127.0.0.1",10000);

        //2.读取本地文件中的数据，并写到服务器当中
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream("mysocketnet\\clientdir\\a.jpg"));
        BufferedOutputStream bos = new BufferedOutputStream(socket.getOutputStream());
        byte[] bytes = new byte[1024];
        int len;
        while ((len = bis.read(bytes)) != -1){
            bos.write(bytes,0,len);
        }

        //往服务器写出结束标记
        socket.shutdownOutput();

        //3.接收服务器的回写数据
        BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        String line = br.readLine();
        System.out.println(line);

        //4.释放资源
        socket.close();

    }
}
```

```java
public class Server {
    public static void main(String[] args) throws IOException {
        //客户端：将本地文件上传到服务器。接收服务器的反馈。
        //服务器：接收客户端上传的文件，上传完毕之后给出反馈。

        //1.创建对象并绑定端口
        ServerSocket ss = new ServerSocket(10000);

        while (true) {
            //2.等待客户端来连接
            Socket socket = ss.accept();

            //开启一条线程
            //一个用户就对应服务端的一条线程
            new Thread(new MyRunnable(socket)).start();
        }

    }
}


public class MyRunnable implements Runnable{
    Socket socket;
    public MyRunnable(Socket socket){
        this.socket = socket;
    }

    @Override
    public void run() {
        try {
            //3.读取数据并保存到本地文件中
            BufferedInputStream bis = new BufferedInputStream(socket.getInputStream());
            String name = UUID.randomUUID().toString().replace("-", "");
            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("mysocketnet\\serverdir\\" + name + ".jpg"));
            int len;
            byte[] bytes = new byte[1024];
            while ((len = bis.read(bytes)) != -1) {
                bos.write(bytes, 0, len);
            }
            bos.close();
            //4.回写数据
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
            bw.write("上传成功");
            bw.newLine();
            bw.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            //5.释放资源
           if(socket != null){
               try {
                   socket.close();
               } catch (IOException e) {
                   e.printStackTrace();
               }
           }
        }
    }
}
```

### 练习六：线程池改进

```java
public class Client {
    public static void main(String[] args) throws IOException {
        //客户端：将本地文件上传到服务器。接收服务器的反馈。
        //服务器：接收客户端上传的文件，上传完毕之后给出反馈。

        //1. 创建Socket对象，并连接服务器
        Socket socket = new Socket("127.0.0.1",10000);

        //2.读取本地文件中的数据，并写到服务器当中
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream("mysocketnet\\clientdir\\a.jpg"));
        BufferedOutputStream bos = new BufferedOutputStream(socket.getOutputStream());
        byte[] bytes = new byte[1024];
        int len;
        while ((len = bis.read(bytes)) != -1){
            bos.write(bytes,0,len);
        }

        //往服务器写出结束标记
        socket.shutdownOutput();

        //3.接收服务器的回写数据
        BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        String line = br.readLine();
        System.out.println(line);

        //4.释放资源
        socket.close();

    }
}
```

```java
public class Server {
    public static void main(String[] args) throws IOException {
        //客户端：将本地文件上传到服务器。接收服务器的反馈。
        //服务器：接收客户端上传的文件，上传完毕之后给出反馈。

        //创建线程池对象
        ThreadPoolExecutor pool = new ThreadPoolExecutor(
                3,//核心线程数量
                16,//线程池总大小
                60,//空闲时间
                TimeUnit.SECONDS,//空闲时间（单位）
                new ArrayBlockingQueue<>(2),//队列
                Executors.defaultThreadFactory(),//线程工厂，让线程池如何创建线程对象
                new ThreadPoolExecutor.AbortPolicy()//阻塞队列
        );

        //1.创建对象并绑定端口
        ServerSocket ss = new ServerSocket(10000);
        while (true) {
            //2.等待客户端来连接
            Socket socket = ss.accept();
            //开启一条线程
            //一个用户就对应服务端的一条线程
            //new Thread(new MyRunnable(socket)).start();
            pool.submit(new MyRunnable(socket));
        }
    }
}
```

```java
public class MyRunnable implements Runnable{

    Socket socket;

    public MyRunnable(Socket socket){
        this.socket = socket;
    }

    @Override
    public void run() {
        try {
            //3.读取数据并保存到本地文件中
            BufferedInputStream bis = new BufferedInputStream(socket.getInputStream());
            String name = UUID.randomUUID().toString().replace("-", "");
            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("mysocketnet\\serverdir\\" + name + ".jpg"));
            int len;
            byte[] bytes = new byte[1024];
            while ((len = bis.read(bytes)) != -1) {
                bos.write(bytes, 0, len);
            }
            bos.close();
            //4.回写数据
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
            bw.write("上传成功");
            bw.newLine();
            bw.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            //5.释放资源
           if(socket != null){
               try {
                   socket.close();
               } catch (IOException e) {
                   e.printStackTrace();
               }
           }
        }
    }
}
```





## 7.参考文献

- https://fasionchan.com/network/ip/ip-address/
- https://www.cnblogs.com/klb561/p/11485463.html
- https://zhuanlan.zhihu.com/p/33889997
- http://docs.52im.net/extend/docs/book/tcpip/vol1/1/
- https://cloud.tencent.com/developer/article/2081316
- http://gitbook.net/java/java_networking.html



## 8.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。


![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)