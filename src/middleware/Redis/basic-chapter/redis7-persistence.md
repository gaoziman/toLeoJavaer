---
title: Redis持久化
icon: circle-info
order: 4
category:
  - Redis7
tag:
  - Redis7
pageview: false
date: 2023-09-23
comment: false
breadcrumb: false
---



## 1. 总体介绍

**官网地址：** https://redis.io/docs/manual/persistence/

这里我做了一些简单的翻译

![image-20230913092743096](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130927202.png)



### 1.1 持久化双雄

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130917417.jpg)

### 1.2 为什么需要持久化

`Redis`是个基于内存的数据库。那服务一旦宕机，内存中的数据将全部丢失。通常的解决方案是从后端数据库恢复这些数据，但后端数据库有性能瓶颈，如果是大数据量的恢复，1、会对数据库带来巨大的压力，2、数据库的性能不如Redis。导致程序响应慢。所以对Redis来说，实现数据的持久化，避免从后端数据库中恢复数据，是至关重要的。

**Redis持久化有哪些方式呢**？**为什么我们需要重点学RDB和AOF**？

从严格意义上说，`Redis`服务提供四种持久化存储方案：`RDB`、`AOF`、`虚拟内存（VM）`和　`DISKSTORE`。虚拟内存（VM）方式，从Redis Version 2.4开始就被官方明确表示不再建议使用，Version 3.2版本中更找不到关于虚拟内存（VM）的任何配置范例，Redis的主要作者Salvatore Sanfilippo还专门写了一篇论文，来反思Redis对虚拟内存（VM）存储技术的支持问题。

至于DISKSTORE方式，是从Redis Version 2.8版本开始提出的一个存储设想，到目前为止Redis官方也没有在任何stable版本中明确建议使用这用方式。在Version 3.2版本中同样找不到对于这种存储方式的明确支持。从网络上能够收集到的各种资料来看，DISKSTORE方式和RDB方式还有着一些千丝万缕的联系，不过各位读者也知道，除了官方文档以外网络资料很多就是大抄。

最关键的是目前官方文档上能够看到的 `Redis` 对持久化存储的支持明确的就只有两种方案（https://redis.io/topics/persistence 和 `AOF`。所以本文也只会具体介绍这两种持久化存储方案的工作特定和配置要点。

**RDB** 简称 `Redis DataBase`

**AOF**  简称 `Append Only File`





## 2. Redis DataBase

### 官网介绍

这里我对重点内容做了一些简单的翻译

![image-20230913092814405](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130928486.png)

RDB(Redis 数据库)：RDB持久化以指定的时间间隔执行数据集的时间点快照

### 2.1 RDB是什么

RDB持久化是把当前进程数据生成快照保存到硬盘的过程，触发RDB持久化过程分为手动触发和自动触发。

![5enkN](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130942320.jpg)

**说人话就是** 在指定的时间间隔，执行数据集的时间点快照，实现类似照片记录效果的方式，就是把某一时刻的数据和状态以文件的形式写到磁盘上，也就是快照。这样一来即使故障宕机，快照文件也不会丢失，数据的可靠性也就得到了保证。这个快照文件就称为RDB文件(dump.rdb)其中，RDB就是`Redis DataBase`的缩写。

> Redis也可以通过加载RDB文件，把数据从磁盘加载读取到Redis中。



### 2.2 RDB能做什么

- 在指定的时间间隔内将内存中的数据集快照写入磁盘，也就是行话讲的snapshot内存快照，它恢复时再将硬盘快照文件直接读回到内存里。
- Redis的数据都在内存中，保存备份时它执行的是全量快照，也就是说，把内存中的所有数据都记录到磁盘中，一锅端。
- RDB保存的是dump.rdb文件。



## 3. RDB案例演示

### 3.1 需求说明

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918366.jpg)

**配置文件(6 VS 7)**

Redis6.0.16及以下

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918393.jpg)

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918379.jpg)

Redis6. 以及 Redis-7.2.0

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918373.jpg)



### 3.2 操作步骤

![image-20230913094439372](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130944437.png)



#### 1. 自动触发

Redis7版本，按照 Redis.conf里配置的 save \<seconds> \<changes>

**本次案例5秒2次修改**

![image-20230914103139840](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309141031900.png)

**修改dump文件保存路径**

![image-20230914103235900](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309141032966.png)

![image-20230914103435083](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309141034127.png)

**修改dump文件名称**

![image-20230914103641709](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309141036771.png)

**触发备份**

第一种情况，5秒内保存2次

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918962.png)

第二种情况，两次保存间隔超过5秒

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918011.png)
注：RDB 持久化是 Redis 的一种持久化机制，它会在 Redis 数据发生修改时对内存中的数据进行快照，然后保存到磁盘，以保证数据的持久性。通常情况下，RDB 保存快照的时间间隔由配置文件中的参数 **save** 决定，格式为 save \<seconds> \<changes>，表示在 \<seconds> 秒内，如果数据有 \<changes> 次修改，则会进行一次快照。

在题目描述的情况下，RDB 设置了每 5 秒进行一次快照，但是如果在 5 秒内修改次数超过了 2 次，也会进行快照。这是因为在 Redis 中，保存快照并不是在规定的时间到达后才进行，而是在修改数据时和时间间隔条件的双重限制下才进行的。

如果限制只按时间间隔来进行保存快照，则会出现两个问题：

如果时间间隔太大，那么 Redis 持久化的数据可能会丢失，并且故障恢复时的数据可能会受到影响。

如果时间间隔太小，那么数据的保存成本就会过高，并可能导致 Redis 运行效率下降。

因此，Redis 引入了按时间和数据修改次数双重限制的快照保存机制，以在灵活性和效率之间取得平衡。如果在 5 秒内修改的次数超过 2 次，则说明数据的变化较快，在此情况下保存快照并不会带来明显的性能问题。因此，Redis 将其纳入保存快照的范围，以保证数据的安全和一致性

**如何恢复**

将备份文件(dump.rdb)移动到 Redis 安装目录并启动服务即可

备份成功后故意用flushdb清空redis，看看是否可以恢复数据

- 执行flushall/flushdb命令也会产生dump.rdb文件，但里面是空的，无意义

物理恢复，一定要将服务产生的RDB文件备份一份，然后分机隔离，避免生产上物理损坏后备份文件也挂了。



#### 2. 手动触发

使用save或者bgsave命令

Redis提供了两个命令来生成RDB文件，分别是 `save` 和 `bgsave`

![image-20230913094610805](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130946876.png)

**save**：在主程序中执行会**阻塞**当前redis服务器，直到持久化工作完成执行save命令期间，Redis不能处理其他命令，**线上禁止使用**

**bgsave(默认)**：

- redis会在后台异步进行快照操作，**不阻塞**快照同时还可以相应客户端请求，该触发方式会fork一个子进程由子进程复制持久化过程

- 官网说明



![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918320.png)



- Redis会使用bgsave对当前内存中的所有数据做快照，这个操作是子进程在后台完成的，这就允许主进程同时可以修改数据。

- fork是什么？
  在Linux程序中，fork()会产生一个和父进程完全相同的子进程，但子进程在此后会exec系统调用，处于效率考虑，尽量避免膨胀

- LASTSAVE

  可以通过 `lastsave` 命令获取最后一次成功执行快照的时间

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918347.png)

**bgsave流程图如下所示**

![image-20230913102421462](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131024559.png)



## 4. RDB优缺点

### 4.1 优点

官网说明：

我这里进行了简单的翻译

![image-20230913095734437](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130957528.png)

- RDB是Redis 数据的一个非常紧凑的单文件时间点表示。RDB文件非常适合备份。例如，您可能希望在最近的24小时内每小时归档一次RDB文件，并在30天内每天保存一个RDB快照。这使您可以在发生灾难时轻松恢复不同版本的数据集。
- RDB非常适合灾难恢复，它是一个可以传输到远程数据中心或Amazon S3(可能已加密）的压缩文件。
- RDB最大限度地提高了Redis 的性能，因为Redis 父进程为了持久化而需要做的唯一工作就是派生一个将完成所有其余工作的子进程。父进程永远不会执行磁盘I/О或类似操作。
- 与AOF 相比，RDB允许使用大数据集更快地重启。
- 在副本上，RDB支持重启和故障转移后的部分重新同步。

**总结：**

- 适合大规模的数据恢复
- 按照业务定时备份
- 对数据完整性和一致性要求不高
- RDB文件在内存中的加载速度要比AOF快很多



### 4.2 缺点

官网说明：

我这里进行了简单的翻译

![image-20230913095714735](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130957806.png)

- 如果您需要在Redis停止工作时（例如断电后）将数据丢失的可能性降到最低，那么RDB并不好。您可以配置生成RDB的不同保存点（例如，在对数据集至少5分钟和100次写入之后，您可以有多个保存点)。但是，您通常会每五分钟或更长时间创建一次RDB快照，因此，如果Redis由于任何原因在没有正确关闭的情况下停止工作，您应该准备好丢失最新分钟的数据。
- RDB需要经常 **fork()** 以便使用子进程在磁盘上持久化。如果数据集很大，fork()可能会很耗时，并且如果数据集很大并且CPU性能不是很好，可能会导致Redis停止为客户端服务几毫 秒甚至一秒钟。AOF也需要fork()但频率较低，您可以调整要重写日志的频率，而不需要对持久性进行任何权衡。

**总结：**

- 在一定间隔时间做一次备份，所以如果Redis意外down掉的话，就会丢失从当前至最近一次快照期间的数据，**快照之间的数据会丢失**
- 内存数据的全量同步，如果数据量太大会导致IO严重影响服务器性能
- RDB依赖于主进程的fork，在更大的数据集中，这可能会导致服务请求的瞬间延迟。fork的时候内存中的数据被克隆了一份，大致2倍的膨胀性，需要考虑

模拟数据丢失：

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918364.jpg)





## 5.  有关RDB快照文件



### 5.1 如何检查修复dump.rdb文件？

```bash
cd /usr/local/bin			
```

进入到 `redis` 安装目录，执行 `redis-check-rdb` 命令 redis-check-rdb ./redisconfig/dump.rdb



### 5.2 哪些情况会触发RDB快照

1. 配置文件中默认的快照配置
2. 手动save/bgsave命令
3. 执行flushdb/fulshall命令也会产生dump.rdb文件，但是也会将命令记录到dump.rdb文件中，恢复后依旧是空，无意义
4. 执行shutdown且没有设置开启AOF持久化
5. 主从复制时，主节点自动触发



### 5.3 如何禁用快照

1. 动态所有停止RDB保存规则的方法：

   ```
   redis-cli config set value ""
   ```



2. 手动修改配置文件

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918396.jpg)



### 5.4 RDB优化配置项详解

配置文件SNAPSHOTTING模块

- save \<seconds> \<changes>：配置快照保存条件

- dir：配置快照保存目录地址

- dbfilename：配置快照的文件名

- stop-writes-on-bgsave-error：

  ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918410.jpg)

  默认yes，如果配置成no，表示不在乎数据不一致或者有其他的手段发现和控制这种不一致，那么在快照写入失败时，也能确保redis继续接受新的请求

- rdbcompression：

  ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918389.jpg)

  默认yes，对于存储到磁盘中的快照，可以设置是否进行压缩存储。如果是的话，Redis会采用LZF算法进行压缩。如果你不想消耗CPU来进行压缩的话，可以设置为关闭此功能

- rdbchecksum：

  ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918435.jpg)

  默认yes，在存储快照后，还可以让`Redis`使用`CRC64`算法来进行数据校验，但是这样做会增加大约10%的性能消耗，如果希望获取到最大的性能提升，可以关闭此功能

- rdb-del-sync-files：

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130918440.jpg)

在没有持久化的情况下删除复制中使用的RDB文件。默认情况下no，此选项是禁用的。

**总结：**

![image-20230913103518090](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131035168.png)





## 6. AOF(Append Only File)

### 6.1 官网介绍

这里我对重点内容做了一些简单的翻译

![image-20230913092814405](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309130928486.png)

### 6.2 AOF是什么

以日志的形式来记录每个写操作，将Redis执行过的所有写指令记录下来(读操作不记录)，只许追加文件但是不可以改写文件，redis启动之初会读取该文件重新构建数据，换言之，`Redis` 启的话就根据日志文件的内容将写指令从前到后执行一次以完成数据的恢复工作

默认情况下，`Redis`是没有开启AOF的。开启AOF功能需要设置配置：`appendonly yes`



### 6.3 AOF可以用来干嘛

这里简单翻译一下

![image-20230913144210464](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131442578.png)

AOF 保存的是 **appendonly.aof** 文件



### 6.4 AOF持久化工作流程

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131431868.jpg)

1. **Client** 作为命令的来源，会有多个源头以及源源不断的请求命令。
2. 在这些命令到达**Redis Server** 以后并不是直接写入**AOF**文件，会将其这些命令先放入AOF缓存中进行保存。这里的AOF缓冲区实际上是内存中的一片区域，存在的目的是当这些命令达到一定量以后再写入磁盘，避免频繁的磁盘IO操作。
3. AOF缓冲会根据AOF缓冲区**同步文件的三种写回策略**将命令写入磁盘上的AOF文件。
4. 随着写入AOF内容的增加为避免文件膨胀，会根据规则进行命令的合并(**又称AOF重写**)，从而起到AOF文件压缩的目的。
5. 当Redis Server服务器重启的时候会队AOF文件载入数据。



### 6.5 AOF缓冲区三种写回策略

![image-20230914090831368](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309140908493.png)

1. **ALways**：同步写回，每个写命令执行完立刻同步地将日志写会磁盘
2. **everysec**：每秒写回，每个写命令执行完，只是先把日志写到AOF文件的内存缓冲区，每隔1秒把缓冲区中的内容写入到磁盘
3. **no**：操作系统控制的写回，每个写命令执行完，只是先把日志写到AOF文件的内存缓冲区，由操作系统决定何时将缓冲区内容写回磁盘

**小总结：**

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131431902.jpg)



## 7. AOF案例演示和优劣对比

### 7.1 配置文件说明 (6 VS 7)



#### 1. 如何开启AOF

![image-20230914090916251](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309140918458.png)



#### 2. 使用默认写回策略

![image-20230914091448343](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309140918264.png)



#### 3. AOF文件-保存路径

- Redis6及以前

  AOF保存文件的位置和RDB保存文件的位置一样，都是通过redis.conf配置文件的dir配置

![image-20230914091847221](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309140918307.png)

- Redis7最新

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131431223.jpg)



**一句话：**

![image-20230914092758275](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309140927369.png)



#### 4. AOF文件 - 保存名称

- Redis6 及以前 ，有且仅有一个


![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131431243.jpg)

- Redis7 **Multi Part AOF**的设计


从1个文件到3个文件

![image-20230914092909406](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309140929474.png)



**MP-AOF实现**
**方案概述**
顾名思义，MP-AOF就是将原来的单个AOF文件拆分成多个AOF文件。在MP-AOF中，我们将AOF分为三种类型,
分别为:

- **BASE: 表示基础AOF**，它一般由子进程通过重写产生，该文件最多只有一个。


- **INCR:表示增量AOF**，它一般会在AOFRW开始执行时被创建，该文件可能存在多个。


- **HISTORY**:表示历史AOF，它由`BASE`和`INCR AOF`变化而来，每次AOFRW成功完成时，本次`AOFRW`之前对应的`BASE`和`INCR AOF`都将变为`HISTORY`，HISTORY类型的AOF会被Redis自动删除。

为了管理这些AOF文件，我们引入了一个manifest (清单)文件来跟踪、管理这些AOF。同时，为了便于AOF备份和拷贝，我们将所有的AOF文件和manifest文件放入一个单独的文件目录中，目录名由appenddirname配置(Redis 7.0新增配置项)决定。

Redis7.2 **config** 中对应的配置项

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131431877.jpg)



### 7.2  AOF正常恢复

1. 修改默认的appendonly no，改为yes

2. 写操作继续，生成aof文件到指定目录（然后将`appendonly`文件备份，使用 `flushdb+shutdown` 服务器来模拟**Redis** 宕机数据丢失，删除生成的新 `aof` 文件，将备份文件恢复）

   ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131431901.jpg)

3. 恢复：重启Redis然后重新加载，结果OK，将数据重新写入到了redis



### 7.3 异常恢复

1. 故意胡乱改动正常的AOF文件，模拟网络闪断文件写入不完整等其他异常情况

2. ![image-20230914093853575](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309140938676.png)



3. 重启Redis之后就会进行AOF文件的载入
   ![image-20230914093939055](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309140939123.png)

4. 异常修复命令：redis-check-aof --fix进行修复
   ![image-20230914094216850](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309140942919.png)

5. 启动后OK


### 7.4 优点

更好的保护数据不丢失、性能高、可做紧急恢复

![image-20230913144839908](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131448017.png)

- 使用AOF Redis 更加持久: 您可以有不同的fsync 策略: 根本不fsync、每秒 fsync、每次查询时fsync。使用每秒fsync的默认策略，写入性能仍然很棒。fsync 是使用后台线程执行的，当没有fsync正在进行时，主线程将努力执行写入，因此您只能丢失一秒钟的写入。
- AOF 日志是一个仅附加日志，因此不会出现寻道问题，也不会在断电时出现损坏问题。即使由于某种原因(磁盘已满或其他原因) 日志以写一半的命令结尾，redis-check-aof 工具也能够轻松修复它。
- 当AOF 变得太大时，Redis 能够在后台自动重写AOF。重写是完全安全的，因为当 Redis继续附加到旧文件时，会使用创建当前数据集所需的最少操作集生成一个全新的文件，一旦第二个文件准备就绪，Redis 就会切换两者并开始附加到新的那一个。
- AOF以易于理解和解析的格式依次包含所有操作的日志。您甚至可以轻松导出AOF文件。例如，即使您不小心使用孩FLUSHALL命令刷新了所有内容，只要在此期间没有执行日志重写，您仍然可以通过停止服务器、删除最新命令并重新启动 Redis 来保存您的数据集。



### 7.5 缺点

相同数据集的数据而言AOF文件要远大于RDB文件，恢复速度慢于RDB

AOF运行效率要慢于RDB，每秒同步策略效率较好，不同步效率和RDB相同

![image-20230913144859105](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131448186.png)

- AOF文件通常比相同数据集的等效 RDB 文件大。
- 根据确切的 fsync策略，AOF可能比 RDB 慢。一般来说，将fsync 设置为每秒性能仍然非常高，并且在禁用 fsync的情况下，即使在高负载下它也应该与 RDB 一样快。即使在巨大的写入负载的情况下，RDB仍然能够提供关于最大延迟的更多保证。



## 8. AOF重写机制

### 8.1  AOF重写是什么？

由于AOF持久化是Redis不断将写命令记录到 AOF 文件中，随着Redis不断的进行，AOF 的文件会越来越大,文件越大，占用服务器内存越大以及 AOF 恢复要求时间越长。
为了解决这个问题，**Redis新增了重写机制**，当AOF文件的大小超过所设定的峰值时，Redis就会**自动**启动AOF文件的内容压缩.只保留可以恢复数据的最小指令集或者可以**手动使用命令 bgrewriteaof 来重新**。

这里简单翻译了一下

![image-20230913144940867](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131449994.png)

一句话：启动AOF文件的内容压缩，只保留可以恢复数据的最小指令集。



### 8.2 AOF重写触发机制

- **官网默认配置**

![image-20230914095828763](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309140958857.png)

- **自动触发**

满足配置文件中的选项后，Redis会记录上次重写时的AOF大小，默认配置是当AOF文件大小是上次rewrite后大小的一倍且文件大于64M时

- **手动触发**

客户端向服务器发送 `bgrewriteaof` 命令



### 8.3  AOF重写案例说明

**需求说明：**

启动AOF文件的内容压缩，只保留可以恢复数据的最小指令集。
**举个例子:**  比如有个key

开始你 set k1 v1
然后改成 set k1 v2
最后改成 set k1 v3

> 如果不重写，那么这3条语句都在aof文件中，内容占空间不说启动的时候都要执行一遍，共计3条命令但是，我们实际效果只需要set k1 v3这一条，所以，
> 开启重写后，只需要保存set k1 3就可以了只需要保留最后一次修改值，相当于给aof文件瘦身减肥，性能更好。
> AOF重写不仅降低了文件的占用空间，同时更小的AOF也可以更快地被Redis加载。

**需求验证：**

**启动AOF文件的内容压缩，只保留可以恢复数据的最小指令集**

**步骤：**

- 前期配置准备：

    1. 开启 aof，appendonly yes，设置 `aof` 持久化开启

    2. 重写峰值修改为1k

       ![image-20230914100127175](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309141001251.png)

    3. 关闭混合，设置为no

       ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309141000673.png)



4. 删除全部 `aof` 和 `rdb`，清除干扰项


- 自动触发案例01

    1. 完成上述正确配置，重启redis服务器，执行 set k2 v2 查看aof文件是否正常

    2. ![image-20230914101906019](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309141019066.png)

       ![image-20230914101900125](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309141019183.png)

    3. 查看`aof` 三大 配置文件

       appendonly.aof.1.base.aof；appendonly.aof.1.incr.aof；appendonly.aof.manifest

    4. k2不停的更新值



     ![image-20230914101814295](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309141018376.png)

5. 重写触发

![image-20230914101900125](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309141019183.png)

- 手动触发案例02

  客户端向服务器发送`bgrewriteaof`命令

![image-20230914102002435](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309141020494.png)

- 结论

**也就是说AOF文件重写并不是对原文件进行重新整理，而是直接读取服务器现有的键值对，然后用一条命令去代替之前记录这个键值对的多条命令，生成一个新的文件后去替换原来的AOF文件。**
AOF文件重写触发机制:通过 redis.conf配置文件中的 auto-aof-rewrite-percentage:默认值为100，以及auto-aof-rewrite-min-size: 64mb配置，也就是说默认Redis会记录上次重写时的AOF大小，**默认配置是当AOF文件大小是上次rewrite后大小的一倍且文件大于64M时触发。**



### 8.4 重写原理

1. 在重写开始前，redis会创建一个“重写子进程”，这个子进程会读取现有的AOF文件，并将其包含的指令进行分析压缩并写入到一个临时文件中。
2. 与此同时，主进程会将新接收到的写指令一边累积到内存缓冲区中，一边继续写入到原有的AOF文件中，这样做是保证原有的AOF文件的可用性，避免在重写过程中出现意外。
3. 当“重写子进程”完成重写工作后，它会给父进程发一个信号，父进程收到信号后就会将内存中缓存的写指令追加到新AOF文件中
4. 当追加结束后，redis就会用新AOF文件来代替旧AOF文件，之后再有新的写指令，就都会追加到新的AOF文件中
5. 重写aof文件的操作，并没有读取旧的aof文件，而是将整个内存中的数据库内容用命令的方式重写了一个新的aof文件，这点和快照有点类似



### 8.5 AOF 优化配置项详解

配置文件 APPEND ONLY MODE模块

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131431380.jpg)



### 8.6 总结

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131431408.jpg)



## 9. RDB-AOF混合持久化

### 9.1 官网建议

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131432091.jpg)



### 9.2 RDB VS AOF

**问题：**

可否共存？

如果共存听谁的？

**Redis配置文档解答：RDB和AOF共存时会优先加载AOF文件**

![image-20230914102059957](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309141021031.png)

**数据恢复顺序和加载流程**

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309131432099.jpg)



### 9.4 你怎么选？用哪个？

- RDB持久化方式能够在指定的时间间隔对你的数据进行快照存储。
- AOF持久化方式记录每次对服务器写的操作，当服务器重启的时候会重新执行这些命令来恢复原始的数据，AOF命令以redis协议追加保存每次写的操作到文件末尾。



### 9.5 同时开启两种持久化方式

- 在这种情况下，$\textcolor{red}{当redis重启的时候会优先载入AOF文件来恢复原始的数据}$，因为在通常情况下AOF文件保存的数据集要比RDB文件保存的数据集要完整。
- RDB的数据不实时，同时使用两者时服务器重启也只会找AOF文件。但是作者也不建议只使用AOF方式备份，因为RDB更适合用于备份数据库（AOF在不断的变化不好备份），留着RDB作为一个万一的手段。



### 9.6 推荐方式

RDB+AOF混合方式

1. 开启混合方式设置
   设置aof-use-rdb-preamble的值为yes， yes表示开启，设置为no表示禁用
2. RDB+AOF的混合方式--------->结论:RDB镜像做全量持久化，AOF做增量持久化
   先使用RDB进行快照存储，然后使用AOF持久化记录所有的写操作，当重写策略满足或手动触发重写的时候，将最新的数据存储为新的RDB记录。这样的话，重启服务的时候会从RDB和AOF两部分恢复数据，既保证了数据完整性，又提高了恢复数据的性能。简单来说:混合持久化方式产生的文件一部分是RDB格式，一部分是AOF格式。----》AOF包括了RDB头部+AOF混写

![image-20230914102443698](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309141024771.png)





## 10. 纯缓存模式



### 同时关闭RDB+AOF，专心做缓存

1. save ""  -- 禁用RDB

   禁用RDB持久化模式下，我们仍然可以使用命令`save`、`bgsave`生成RDB文件

2. appendonly no  -- 禁用AOF

   禁用AOF持久化模式下，我们仍然可以使用命令`bgrewriteaof`生成`AOF`文件





![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)