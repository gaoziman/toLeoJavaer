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





## 3. 数据类型命令及落地运用

**英文官网：** https://redis.io/commands/

**中文官网：** http://www.redis.cn/commands.html

**备注：**

1.$\textcolor{blue}{命令不区分大小写，而key是区分大小写的}$

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309091501337.jpg)

2.永远的帮助命令，help @类型

help @string

help @list

help @hash

help @hyperloglog

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309091501358.jpg)





## 4. Redis字符串(String)

**官网：** https://redis.io/docs/data-types/strings/

![image-20230906210420929](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309062104357.png)

`String`是单值单 `value`

String常见 `API`  ：

![image-20230910141225950](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101412062.png)



### 1. 最 常 用：

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309091503481.jpg)

**返回值：**

设置成功则返回OK，返回 `nil` 为未执行Set命令，如不满足`NX`，`XX`条件等。

若使用GET参数，则返回该键原来的值，或在键不存在时nil。

![image-20230910141913060](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101419174.png)

如何获得设置指定的 **key** 过期的 **Unix** 时间，单位为秒

```java
System.out.println(Long.toString(System.currentTimeMillis()/1000L));
```

![image-20230910142456459](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101424556.png)

### 2.同时设置/获取多个键值

![image-20230910142525476](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101425583.png)

![image-20230910143000665](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101430754.png)



### 3.获取指定区间范围内的值

`setrange`

![image-20230910143221785](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101432850.png)

![image-20230910143626994](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101436068.png)



`getrange`

![image-20230910143245397](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101432467.png)

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101438721.png)



### 4.数值增减

**一定要是数据才能进行加减**

> 递增数字：INCR key
>
> 增加指定的整数：INCRBY key increment
>
> 递减数值：DECR key
>
> 减少指定的整数：DECRBY key decrement

![image-20230910144128608](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101441698.png)



### 5.获取字符串长度和内容追加

![image-20230910144218549](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101442632.png)

获取字符串长度：`strlen key`

字符串内容追加：`append key value`

![image-20230910144505283](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101445392.png)



### 6.分布式锁

setnx key value

setex(set with expire) 键秒值/setnx(set if not exist)

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309091503045.jpg)



### 7.getset(先get再set)

![image-20230910144633552](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101446625.png)

getset：将给定key的值设为value，并返回key的旧值(old value)。

简单一句话：**先get然后立即set**

![image-20230910144610147](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101446201.png)



## 5. Redis列表(List)

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101353859.jpg)

List属于 **单key多value**

List API

![image-20230910151851211](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101518321.png)

简单说明：一个双端链表的结构，容量是2的32次方减1个元素大概40多亿，主要功能有`push`/`pop`等，一般用在栈、队列、消息队列等场景。left、right都可以插入添加。

- 如果键不存在，创建新的链表；
- 如果键已存在，新增内容；
- 如果值全移除，对应的键也就消失了
- 它的底层实际上就是个双向链表，对两端的作性能很高，通过索引下标的操作中间的节点性能会较差。

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101353913.jpg)

### 1.lpush/rpush/lrange

![image-20230910151925285](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101519357.png)



![image-20230910151938400](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101519474.png)



![image-20230910151955209](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101519285.png)

注意：**没有rrange**

![image-20230910152426922](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101524993.png)



### 2.lpop/rpop

![image-20230910152441194](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101524266.png)



![image-20230910152512998](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101525072.png)



![image-20230910152726280](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101527359.png)



### 3.lindex，按照索引下标获得元素（从上到下）

![image-20230910152804200](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101528275.png)



![image-20230910153015864](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101530946.png)



### 4.llen,获取List列表中元素的个数

![image-20230910153032543](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101530623.png)



![image-20230910153050140](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101530216.png)



### 5.lrem key 数字N 给定值v1

解释：删除N个值等于v1的元素

从left往right删除2个值等于v1的元素，返回的值为实际删除的数量

LREM list3 0 值，表示删除全部给定的值，$\textcolor{red}{零个就是全部值}$

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101353475.jpg)



### 6.ltrim key 开始index 结束index

![image-20230910153118250](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101531322.png)

截取指定范围的值后在赋值给key

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101532650.png)



### 7.rpoplpush 源列表  目的列表

![image-20230910153309028](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101533113.png)

移除列表的最后一个元素，并将该元素添加到另一个列表并返回

![image-20230910153423242](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101534333.png)



### 8.lset key index value

![image-20230910153451694](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101534771.png)

让指定数组集合的小标位置值替换成新值

![image-20230910153542980](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101535091.png)



### 9.linsert key before/after 已有值 插入的新值

![image-20230910153605700](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101536791.png)

![image-20230910160136407](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101601490.png)



## 6. Redis哈希(Hash)

KV模式不变，但V是一个键值对  `Map<String, Map<Object, Object>>`

**API**

![image-20230910160833304](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101608395.png)



### 1. hset/hget/hmset/hmget/hgetall/hdel

#### 1.1 hset

![image-20230910200758290](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102007403.png)



#### 1.2 hget

![image-20230910200949115](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102009203.png)



#### 1.3 hmset

![image-20230910200958959](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102009053.png)



#### 1.4 hmget

![image-20230910201016661](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102010741.png)



#### 1.5 hgetall

![image-20230910201027775](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102010849.png)



#### 1.6 hdel

![image-20230910201040947](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102010069.png)



![image-20230910202257771](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102022873.png)



### 2. hlen

![image-20230910202512054](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102025135.png)

获取某个key内的全部数量

![image-20230910202417406](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102024486.png)



###  3.hexists key 在key里面的某个值的key

![image-20230910202521876](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102025960.png)

![image-20230910202449961](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102024032.png)



### 4. hkeys/hvals

![image-20230910202539785](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102025859.png)

hkeys key 查询出所有key对应的子key值

![image-20230910202550564](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102025635.png)

hvals key 查询出所有key对应的子key的value值

![image-20230910202626714](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102026794.png)



### 5. hincrby/hincrbyfloat

![image-20230910202648354](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102026449.png)

![image-20230910202658740](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102026840.png)



![image-20230910202910165](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102029323.png)



### 6. hsetnx

不存在赋值，存在了无效

![image-20230910202941572](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102029639.png)



## 7. Redis集合(Set)

单值`多value`，且`无重复`

**API**

![image-20230910160428090](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101604199.png)



### 1. SADD key member

![image-20230910203102087](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102031202.png)

添加元素，可以多次向同一个key中设置不同值，不会覆盖之前的值



### 2. SMEMBERS key

![image-20230910203123078](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102031176.png)

遍历集合中的所有元素



### 3. SISMEMBER key member

![image-20230910203202534](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102032660.png)

判断元素是否在集合中

![image-20230910203707716](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102037820.png)



### 4. SREM key member

![image-20230910203238159](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102032258.png)

删除元素

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102038543.png)



### 5.scard

![image-20230910203304295](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102033380.png)

获取集合里面的元素个数

![image-20230910204018382](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102040468.png)



### 6.SRANDMEMBER key [数字]

![image-20230910204140181](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102041274.png)

从集合中随机`展现设置的数字个数元素`，元素不删除

![image-20230910204251361](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102042509.png)



### 7.SPOP key [数字]

![image-20230910204308099](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102043182.png)

从集合中`随机弹出`一个元素，出一个`删除`一个

![image-20230910204421632](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102044765.png)

### 8. smove key1 key2

![image-20230910204506010](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102045121.png)

将key1里已存在的某个值赋给key2

![image-20230910204625458](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102046582.png)



### 9.集合运算-集合的差集运算A-B

![image-20230910204447526](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102044617.png)

属于A但是不属于B的元素构成的集合

SDIFF key [key ...]，可以计算多个元素的差集

![image-20230910204858847](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102048958.png)



### 10.集合运算-集合的并集运算A∪B

![image-20230910205059224](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102050331.png)

属于A或者属于B的元素构成的集合

SUNION key [key ...]

![image-20230910204942210](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102049284.png)



### 11.集合运算-集合的交集运算A∩B

![image-20230910205110280](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102051371.png)

属于A同时也属于B的共同拥有的元素构成的集合

SINTER key [key ...]

![image-20230910205006591](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102050721.png)



**SINTERCARD numkeys key 【key ...】【LIMIT limit】**

numkeys 的具体值由输入的key个数决定

SINTERCARD 为redis7新命令，它不返回结果集，而是返回结果的基数。返回由所有给定集合的交集产生的集合的基数

基数的词语解释: 用于表示事物个数的数

![image-20230910205154159](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102051241.png)





## 8. Redis有序集合Zset(sorted set)

> 在 set 基础上，每个val值前加一个score分数值。之前set是k1 v1 v2 v3，现在zset是 k1 score1 v1 score2 v2

**API**

![image-20230910205337647](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102053781.png)

向有序集合中加入一个元素和该元素的分数



### 1.ZADD key score member [score member ...]

![image-20230910205403432](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102054534.png)

添加元素



### 2.ZRANGE key start stop [WITHSCORES]

![image-20230910205509412](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102055526.png)

按照元素分数从小到大的顺序返回索引从start到stop之间的所有元素

![image-20230910205929183](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102059274.png)



### 3.zrevrange key start stop [WITHSCORES]

![image-20230910205951995](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102059101.png)

反转集合，按照元素分数从大到小的顺序返回索引从start到stop之间的所有元素

![image-20230910210724452](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102107529.png)



### 4.ZRANGEBYSCORE key min max 【WITHSCORES】【LIMIT offset count】

![image-20230910210123269](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102101415.png)

获取指定分数范围的元素，可以在min和max前面加个(，表示不包含

limit作用是返回限制，limit开始下标步，一共多少步

![image-20230910211107927](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102111046.png)



### 5.ZSCORE key member

![image-20230910210141099](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102101188.png)

获取元素的分数



### 6.ZCARD key

![image-20230910210151637](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102101732.png)

获取集合中元素的数量

![image-20230910211149821](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102111901.png)



### 7. zrem key member [member ...]

![image-20230910210313660](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102103781.png)

某个score对应的value值，作用是删除元素

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102114212.png)



### 8.ZINCRBY key increment member

![image-20230910210348414](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102103509.png)

增加某个元素的分数

![image-20230910211534103](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102115186.png)



### 9.ZCOUNT key min max

![image-20230910210408056](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102104146.png)

获得指定分数内的元素个数

![image-20230910211658790](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102116911.png)



### 10.ZMPOP numkeys key [key ...] MIN|MAX [COUNT count]

从键名列表中的**第一个非空排序集中弹出一个或多个元素**，他们是成员分数对

![image-20230910211911396](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102119473.png)



### 11.zrank key member [withscore]

![image-20230910210522979](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102105076.png)

作用是通过子value获得下标值



### 12.zrevrank key member [withscore]

![image-20230910210545637](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102105737.png)

作用是通过子value逆序获得下标值

![image-20230910212153456](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309102121539.png)



## 9. Redis位图(bitmap)

在平时开发过程中，经常会有一些 bool 类型数据需要存取。比如记录用户一年内签到的次数，签了是 1，没签是 0。如果使用 key-value 来存储，那么每个用户都要记录 365 次，当用户成百上亿时，需要的存储空间将非常巨大。为了解决这个问题，Redis 提供了位图结构。

位图（bitmap）同样属于 string 数据类型。Redis 中一个字符串类型的值最多能存储 512 MB 的内容，每个字符串由多个字节组成，每个字节又由 8 个 Bit 位组成。位图结构正是使用“位”来实现存储的，它通过将比特位设置为 0 或 1来达到数据存取的目的，这大大增加了 value 存储数量，它存储上限为`2^32 `。

位图本质上就是一个普通的字节串，也就是 bytes 数组。您可以使用 `getbit/setbit` 命令来处理这个位数组，位图的结构如下所示：



![位数组](http://c.biancheng.net/uploads/allimg/210913/1333395108-0.gif)


位图适用于一些特定的应用场景，比如用户签到次数、或者登录次数等。上图是表示一位用户 10 天内来网站的签到次数，1 代表签到，0 代表未签到，这样可以很轻松地统计出用户的活跃程度。相比于直接使用字符串而言，位图中的每一条记录仅占用一个 bit 位，从而大大降低了内存空间使用率。

Redis 官方也做了一个实验，他们模拟了一个拥有 1 亿 2 千 8 百万用户的系统，然后使用 Redis 的位图来统计 **日均用户数量**，最终所用时间的约为 50ms，且仅仅占用 16 MB内存。

一句话：**由0和1状态表现的二进制位的bit数组**



### 1. 需求：

1. 用户是否登陆过Y、N，比如软件的每日签到功能
2. 电影、广告是否被点击播放过
3. 钉钉打卡上下班，签到统计
4. 统计用户在某网站的活跃度



### 2. bitmap是什么?

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101354055.jpg)

说明：用`String`类型作为底层数据结构实现的一种统计二值状态的数据类型

位图本质是数组，它是基于String数据类型的按位的操作。该数组由多个二进制位组成，每个二进制位都对应一个偏移量（我们称之为一个索引）。

`Bitmap`支持的最大位数是2^32位，它可以极大的节约存储空间，使用512M内存就可以存储多达42.9亿的字节信息(2^32=4294967296)



### 3. bitmap可以用来干嘛？

用于状态统计，Y、N类似 `AtomicBoolean`



### 4. 原理

某网站要统计一个用户一年的签到记录，若用 String 类型存储，则需要 365 个键值对。若使用位图存储，用户签到就存 1，否则存 0。最后会生成 11010101... 这样的存储结果，其中每天的记录只占一位，一年就是 365 位，约为 46 个字节。如果只想统计用户签到的天数，那么统计 1 的个数即可。

位图操作的优势，相比于字符串而言，它不仅效率高，而且还非常的节省空间。

Redis 的位数组是自动扩展的，如果设置了某个偏移位置超出了现有的内容范围，位数组就会自动扩充。

下面设置一个名为 a 的 key，我们对这个 key 进行位图操作，使得 a 的对应的 value 变为“he”。

首先我们分别获取字符“h”和字符“e”的八位二进制码，如下所示：

```
>>> bin(ord("h"))
'0b1101000'
>>> bin(ord("e"))
'0b1100101'
```

接下来，只要对需值为 1 的位进行操作即可。如下图所示：



![bitmap位图应用](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309111115474.gif)


把 h 和 e 的二进制码连接在一起，第一位的下标是 0，依次递增至 15，然后将数字为 1 的位置标记出来，得到 1/2/4/9/10/13/15，我们把这组数字称为位的“偏置数”，最后按照上述偏置数对字符 a 进行如下位图操作。注意，key 的初始二进制位全部为 0。



### 5. 基本命令

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101354066.jpg)



#### 1.setbit key offset value

setbit 键偏移位 只能零或者1

**Bitmap的偏移量从零开始计算的**

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101354071.jpg)



![image-20230911202012402](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309112020538.png)



#### 2.getbit key offset

获取键偏移位的值

![image-20230911202050086](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309112020171.png)



#### 3.strlen key

统计字节数占用多少

![image-20230911202234321](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309112022416.png)

不是字符串长度而是占据几个字节，超过8位后自己按照8位一组**一byte**再扩容



#### 4.bitcount key [start end [byte|bit]]

全部键里面包含有1的有多少个

![image-20230911202257570](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309112022671.png)



#### 5.bitop operation(AND|OR|XOR|NOT) destkey key [key ...]

案例：连续2天都签到的用户数量

假如某个网站或者系统，它的用户有1000W，我们可以使用Redis的`HASH`结构和`bitmap`结构做个用户id和位置的映射

![image-20230911203452911](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309112034034.png)



## 10. Redis基数统计(HyperLogLog)

### 1. 需求：

用户搜索网站关键词的数量

统计用户每天搜索不同词条个数

统计某个网站的UV、统计某个文章的UV

什么是UV？

**Unique Visitor**，独立访客，一般理解为客户端IP，**需要去重考虑**



### 2. HyperLogLog是什么

去重复统计功能的基数估计算法-就是HyperLogLog

```tex
Redis在2.8.9版本添加了HyperLogLog 结构。
Redis HyperLogLog是用来做基数统计的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定的、并且是很小的。
在Redis里面，每个 HyperLogLog键只需要花费12KB内存，就可以计算接近2^64个不同元素的基数。这和计算基数时，元素越多耗费
内存就越多的集合形成鲜明对比。
但是，因为HyperLogLog只会根据输入元素来计算基数，而不会储存输入元素本身，所以HyperLogLog不能像集合那样，返回输入的各个元素。
```

**基数**：是一种数据集，去重复后的真实个数

```tex
(全集)={2,4,6,8,77,39,4,8,10}
去掉重复的内容
基数={2,4,6,8,77,39,10} = 7
```

基数统计：用于统计一个集合中不重复的元素个数，就是对集合去重复后剩余元素的计算。

一句话：去重脱水后的真实数据



### 3. 基本命令

![image-20230911111916490](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309111119587.png)



![image-20230911203836964](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309112038073.png)





## 11. Redis地理空间(GEO)



### 1. GEO简介：

移动互联网时代LBS应用越来越多，交友软件中附近的小姐姐、外卖软件中附近的美食店铺、高德地图附近的核酸检查点等等，那这种附近各种形形色色的XXX地址位置选择是如何实现的?
地球上的地理位置是使用二维的经纬度表示，经度范围(-180,180]，纬度范围(-90，90]，只要我们确定一个点的经纬度就可以取得他在地球的位置。
例如滴滴打车，最直观的操作就是实时记录更新各个车的位置，
然后当我们要找车时，在数据库中查找距离我们(坐标x0,y0)附近r公里范围内部的车辆

使用如下SQL即可:

```sql
select taxi from position where x0-r< X < x0 + r and y0-r< y < y0+r
```

但是这样会有什么问题呢?

1. 查询性能问题，如果并发高，数据量大这种查询是要搞垮数据库的
2. 这个查询的是一个矩形访问，而不是以我为中心r公里为半径的圆形访问。
3. 精准度的问题，我们知道地球不是平面坐标系，而是一个圆球，这种矩形计算在长距离计算时会有很大误差



### 2. GEO原理

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101355430.jpg)

Redis在 `3.2` 版本以后增加了地址位置的处理



### 3. GEO命令

#### 1.GEOADD key longitude latitude member [longitude latitude member]

多个经度(longitude)、纬度(latitude)、位置名称(member)添加到指定的key中

命令：GEOADD city 116.403963 39.915119 "天安门" 116.403414 39.924091 "故宫" 116.024067 40.362639 "长城"

geo类型实际上是zset，可以使用zset相关的命令对其进行遍历，如果遍历出现中文乱码可以使用如下命令：redis-cli --raw

![image-20230911204251128](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309112042252.png)



#### 2.GEOPOS key member [member]

从键里面返回所有指定名称(member )元素的位置（经度和纬度），不存在返回nil

GEOPOS city 天安门 故宫 长城

![image-20230911204545099](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309112045182.png)



#### 3.GEODIST key member1 member2 [M|KM|FT|MI]

返回两个给定位置之间的距离

- m-米
- km-千米
- ft-英寸
- mi-英里

![image-20230911204822752](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309112048871.png)



#### 4.GEORADIUS key longitude latitude radius

以给定的经纬度为中心，返回与中心的距离不超过给定最大距离的所有元素位置

WITHDIST: 在返回位置元素的同时， 将位置元素与中心之间的距离也一并返回。 距离的单位和用户给定的范围单位保持一致。
WITHCOORD: 将位置元素的经度和维度也一并返回。
WITHHASH:以 52 位有符号整数的形式， 返回位置元素经过原始 geohash 编码的有序集合分值。 这个选项主要用于底层应用或者调试，实际中的作用并不大
COUNT 限定返回的记录数。

![image-20230911204915408](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309112049523.png)



#### 5.GEORADIUSBYMEMBER

跟GEORADIUS类似

![image-20230911205034351](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309112050434.png)



#### 6.GEOHASH

返回一个或多个位置元素的GEOhash表示

geohash 算法生成的base32编码值，3维变2维变1维

![image-20230911205104660](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309112051754.png)



## 12. Redis流(Stream)



### 1. Stream是什么

Redis5.0 之前的痛点，Redis消息队列的2种方案：

1. List实现消息队列，List实现方式其实就是点对点的模式

   ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356770.png)

2. Pub/Sub

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356781.png)

Redis5.0版本新增了一个更强大的数据结构---Stream

一句话：Stream流就是Redis版的MQ消息中间件+阻塞队列



### 2. Stream能干嘛

实现消息队列，它支持消息的持久化、支持自动生成全局唯一ID、支持ack确认消息的模式、支持消费组模式等，让消息队列更加的稳定和可靠



### 3. Stream底层结构和原理说明

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356793.png)

一个**消息链表**，将所有加入的消息都串起来，每个消息都有一个唯一的ID和对应的内容

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356805.png)



### 4. Stream基本命令



#### 1. 队列相关指令

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356801.png)



#### 2. 消费组相关指令

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356829.png)

XINFO GROUPS    打印消费组的详细信息

XINFO STREAM     打印stream的详细信息



#### 3. 四个特殊符号

| - +  | 最小和最大可能出现的Id                                       |
| ---- | ------------------------------------------------------------ |
| $    | $表示只消费新的消息，当前流中最大的Id，可用于将要到来的信息  |
| >    | 用于XREADGROUP命令，表示迄今还没有发送给组中使用者的信息，会更新消费者组的最后Id |
| *    | 用于XADD命令，让系统自动生成Id                               |

$\textcolor{red}{基本命令代码实操}$

Redis流实例演示



### 5. Stream队列相关命令

#### 1.XADD

添加消息到队列末尾，消息ID必须要比上一个ID大，默认用星号表示自动生成ID；* 用于XADD命令中，让系统自动生成ID；

XADD用于向Stream队列中添加消息，如果指定的Stream队列不存在，则该命令执行时会新建一个Stream队列

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356529.png)

生成的消息ID，有两部分组成，毫秒时间戳-该毫秒内产生的第一条消息

// * 表示服务器自动生成MessageID(类似MySQL里面主键auto_increment)，后面顺序跟着一堆业务key/value

| 信息条目指的是序列号，在相同的毫秒下序列号从0开始递增，序列号是64位长度，理论上在同一毫秒内生成的数据量无法到达这个级别，因此不用担心序列号会不够用。milisecondsTime指的是Redis节点服务器的本地时间，如果存在当前的毫秒时间截比以前已经存在的数据的时间戳小的话(本地时间钟后跳)，那么系统将会采用以前相同的毫秒创建新的ID，也即redis 在增加信息条目时会检查当前 id 与上一条目的 id，自动纠正错误的情况，一定要保证后面的 id 比前面大，.个流中信息条目的ID必须是单调增的，这是流的基础。 |
| ------------------------------------------------------------ |
| 客户端显示传入规则:<br />Redis对于ID有强制要求，格式必须是**时间戳-自增Id**这样的方式，且后续ID不能小于前一个ID |
| Stream的消息内容，也就是图中的Messaget它的结构类似Hash结构，以kev-value的形式存在 |

#### 2.XRANGE key start end [COUNT count]

用于获取消息列表（可以指定范围），忽略删除的消息

start 表示开始值，-代表最小值

end 表示结束值，+代表最大值

count 表示最多获取多少个值

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356547.png)



#### 3.XREVRANGE key end start [COUNT count]

根据ID降序输出

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356585.png)



#### 4.XDEL key id [id ...]

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356802.png)



#### 5.XLEN key

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356808.png)



#### 6.XTRIM key MAXLEN|MINID

用于对Stream的长度进行截取，如超长会进行截取

MAXLEN 允许的最大长度，对流进行修剪限制长度

MINID 允许的最小id，从某个id值开始比该id值小的将会被抛弃

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356842.png)



#### 7.XREAD \[COUNT count] [BLOCK milliseconds] STREAMS key [key ...] id [id ...]

可以读取多个key

**用于获取消息(阻塞/非阻塞)**

​	只会返回大于指定ID的消息，COUNT最多读取多少条消息；BLOCK是否以阻塞的方式读取消息，默认不阻塞，如果milliseconds设置为0，表示永远阻塞

**非阻塞**

- $表特殊ID，表示以当前Stream已经存储的最大的ID作为最后一个ID，当前Stream中不存在大于当前最大ID的消息，因此此时返回nil

- 0-0代表从最小的ID开始获取Stream中的消息，当不指定count，将会返回Stream中的所有消息，注意也可以使用0 (00/000也都是可以的)

  ![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356879.png)

**阻塞**

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356121.png)

**小总结**（类似Java里面的阻塞队列）

Stream的基础方法，使用XADD存入消息和XREAD循环阻塞读取消息的方式可以实现简易版的消息队列

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356236.png)



---



### 6. 消费组相关指令

#### 1.XGROUP CREATE key group id|$

用于创建消费组

xgroup create mystream group $

xgroup create mystream groupB 0

$表示从Stream尾部开始消费

0表示从Stream头部开始消费

创建消费组的时候必须指定ID，ID为0表示从头开始消费，为$表示只消费新消息

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356274.png)''

#### 2.XREADGROUP GROUP group

">"，表示从第一条尚未被消费的消息开始读取

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356374.png)

消费组groupA内的消费者consumer1从mystream消息队列中读取所有消息

但是，**不同消费组**的消费者可以消费同一条消息

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356557.png)

**消费组的目的？**

让组内的多个消费者共同分担读取消息，所以，我们通常会让每个消费者读取部分消息，从而实现消息读取负载在多个消费者间是均衡分部的

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356590.png)



**重点问题**

基于 Stream 实现的消息队列，如何保证消费者在发生故障或宕机再次重启后，仍然可以读取未处理完的消息?

Streams 会自动使用内部队列(也称为 PENDING List)留存消费组里每个消费者读取的消息保底措施，直到消费者使用 XACK命令通知 Streams"消息已经处理完成”。
消费确认增加了消息的可靠性，一般在业务处理完成之后，需要执行 XACK 命令确认消息已经被消费完成

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356621.png)

#### 3.XPENDING

查询每个消费组内所有消费组$\textcolor{red}{[已读取、但尚未确认]}$的消息

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356809.png)

查看某个消费组具体读取了那些数据

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356930.png)



#### 4.XACK key group id [id...]

向消息队列确认消息处理已完成

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356136.jpg)



### 7. XINFO 用于打印Stream\Consumer\Group的详细信息

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101356159.jpg)





## 13. Redis位域(bitfield)

### 1. bitfield能干嘛

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101357453.jpg)

位域修改、溢出控制



### 2. bitfield是什么

将一个redis字符串看作是**一个由二进制位组成的数组**并能对变长位宽和任意没有字节对齐的指定整型位域进行寻址和修改

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101357458.jpg)



### 3. bitfield命令

Ascii码表：https://ascii.org.cn



#### 1.BITFIELD key [GET type offset]

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101357480.jpg)



#### 2.BITFIELD key set type offstet value

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101357470.jpg)

#### 3.BITFIELD key [INCRBY type offset increment]

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101357474.jpg)

如果偏移量后面的值发生溢出（大于127），redis对此也有对应的溢出控制，默认情况下，INCRBY使用WRAP参数



#### 4.溢出控制 OVERFLOW [WRAP|SAT|FAIL]

WRAP:使用回绕(wrap around)方法处理有符号整数和无符号整数溢出情况

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101357500.jpg)

SAT:使用饱和计算(saturation arithmetic)方法处理溢出，下溢计算的结果为最小的整数值，而上溢计算的结果为最大的整数值

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101357109.jpg)

fail:命令将拒绝执行那些会导致上溢或者下溢情况出现的计算，并向用户返回空值表示计算未被执行

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309101357182.jpg)








![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)