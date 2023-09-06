---
title: Redis十大数据类型
icon: circle-info
order: 3
category:
  - Redis7
tag:
  - Redis7
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---



## 1. 认识Redis十大数据类型



官网: https://redis.io/docs/data-types/

![image-20230906210420929](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062104357.png)

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062103533.png)

**提前声明**

这里说的数据类型是`value`的数据类型，`key` 的类型都是字符串

### 1.1 redis字符串（String）

String是redis最基本的数据类型，一个key对应一个value。

string类型是 <font color='red'>二进制安全的</font>，意思是redis的string可以包含任何数据，比如jpg图片或者序列化的对象。

string类型是Redis最基本的数据类型，一个redis中字符串value**最多可以是512M**



### 2.redis列表（List）

Redis列表是最简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的$\textcolor{blue}{头部（左边）或者尾部（右边）}$，它的底层实际是个$\textcolor{red}{双端链表}$，最多可以包含2^32-1个元素（4294967295，每个列表超过40亿个元素）



### 3.redis哈希表（Hash）

Redis Hash是一个string类型的field（字段）和value（值）的映射表，Hash特别适合用户存储对象。

Redis中每个Hash可以存储2^32-1个键值对（40多亿）



### 4.redis集合（Set）

Redis的Set是string类型的$\textcolor{red}{无序集合}$。集合成员是唯一的，这就意味着集合中不能出现重复的数据，集合对象的编码可以是intset或者Hashtable。

Redis中Set集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。

集合中最大的成员数为2^32-1（4294967295，每个集合可存储40多亿个成员）



### 5.redis有序集合（ZSet）

zset(sorted set：有序集合)

- Redis `zset` 和`Set`一样也是`string`类型元素的集合，且不允许重复的成员。
- 不同的是每个元素都会关联一个`double`类型的分数，`Redis`正是通过分数来为集合中的成员进行从小到大的排序。
- zset的成员是唯一的，但是分数（`score`）却可以重复。
- zset集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。集合中最大的成员数是`2^.32-1`



### 6.redis地理空间（GEO）

Redis GEO主要用于存储地理位置信息，并对存储的信息进行操作，包括：

- 添加地理位置的坐标。
- 获取地理位置的坐标。
- 计算两个位置之间的距离。
- 根据用户给定的经纬度坐标来获取指定范围内的地址位置集合。

7.redis基数统计（HyperLogLog）

HyperLogLog是用来做$\textcolor{red}{基数统计}$的算法，HyperLogLog的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需要的空间总是固定且是很小的。

在Redis里面，每个HyperLogLog键只需要花费12KB内存，就可以计算接近2^64个不同元素的基数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。

但是，因为HyperLogLog只会根据输入元素来计算基数，而不会存储输入元素本身，所以HyperLogLog不能像集合那样，返回输入的各个元素。



### 8.redis位图（bitmap）



![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062103550.jpg)

由0和1状态表现的二进制位的bit数组

### 9.redis位域（bitfield）

通过bitfield命令可以一次性操作多个$\textcolor{red}{比特位域(指的是连续的多个比特位)}$，它会执行一系列操作并返回一个响应数组，这个数组中的元素对应参数列表中的相应的执行结果。

说白了就是通过bitfield命令我们可以一次性对多个比特位域进行操作。

### 10.redis流（Stream）

Redis Stream是Redis5.0版本新增加的数据结构。

Redis Stream主要用于消息队列（MQ，Message Queue），Redis本身就是一个Redis发布订阅（pub/sub）来实现消息队列的功能，但它有个缺点就是消息无法持久化，如果出现网络断开、Redis宕机等，消息就会被丢弃。

简单来说发布订阅（pub/sub）可以分发消息，但无法记录历史消息。

而Redis Stream提供了消息的持久化和主备复制功能，可以让任何客户端访问任何时刻的数据，并且能记住每一个客户端的访问位置，还能保证消息不丢失。



**Redis常见数据类型操作命令**

**英文官网：**  https://redis.io/commands/

**中文：**  http://www.redis.cn/commands.html



## 2. Redis键

案例



### 2. 1 keys *

**查看当前库所有的key**

![image-20230906211123943](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062111004.png)



### 2.2 exists key

**判断某个key是否存在, 存在则返回1，不存在返回0**

![image-20230906211144328](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062111380.png)



### 2.3 type key

**查看你的key是什么类型**

![image-20230906211232025](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062112076.png)



### 2.4 del key

**删除指定的key数据**

![image-20230906211407659](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062114720.png)

### 2.5 unlink

**非阻塞删除**，仅仅将keys从keyspace元数据中删除，真正的删除会在后续异步中操作。

> del key 是原子的删除，只有删除成功了才会返回删除结果，如果是删除大key用del会将后面的操作都阻塞，而unlink key 不会阻塞，它会在后台异步删除数据。
>



### 2.6 ttl key

**查看还有多少秒过期，-1表示永不过期，-2表示已过期**



### 2.7 expire key 秒钟

**为给定的key设置过期时间**

![image-20230906211631076](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062116184.png)



### 2.8 move key dbindex[0-15]

**将当前数据库的key移动到给定的数据库DB当中**

![image-20230906212209759](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062122821.png)



### 2.9 select dbindex

**切换数据库【0-15】，默认为0**



### 2.10 dbsize

**查看当前数据库key的数量**



### 2.11 flushdb

**清空当前库**



### 2.12 flushall

**通杀全部库**

![image-20230906212318127](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062123178.png)

> 注意 ： flushall 命令会删除所有库的数据，谨慎使用！！！
>



**持续更新中....**

