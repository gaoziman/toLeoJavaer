---
title: Spring事务处理
icon: circle-info
order: 4
category:
  - Spring🍃
tag:
  - Spring🍃
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---



## 1. 什么是事务

**事务是逻辑上的一组操作，要么都执行，要么都不执行。**

相信大家应该都能背上面这句话了，下面我结合我们日常的真实开发来谈一谈。

我们系统的每个业务方法可能包括了多个原子性的数据库操作，比如下面的 `save()` 方法中就有两个原子性的数据库操作。这些原子性的数据库操作是有依赖的，它们要么都执行，要不就都不执行。

```java
	public void save() {
		personDao.save(student);
		personDetailDao.save(studentDetail);
	}
```

另外，需要格外注意的是：**事务能否生效数据库引擎是否支持事务是关键。比如常用的 MySQL 数据库默认使用支持事务的 `innodb`引擎。但是，如果把数据库引擎变为 `myisam`，那么程序也就不再支持事务了**

```markdown
事务是保证业务操作完整性的一种数据库机制。

事务的4特点： A C I D
1. A(Atomicity) 	原子性 
2. C(Consistency) 	一致性
3. I(Isolation)		隔离性
4. D(durability) 	持久性
```

1. **原子性**（`Atomicity`）：事务是最小的执行单位，不允许分割。事务的原子性确保动作要么全部完成，要么完全不起作用；
2. **一致性**（`Consistency`）：执行事务前后，数据保持一致，例如转账业务中，无论事务是否成功，转账者和收款人的总额应该是不变的；
3. **隔离性**（`Isolation`）：并发访问数据库时，一个用户的事务不被其他事务所干扰，各并发事务之间数据库是独立的；
4. **持久性**（`Durability`）：一个事务被提交之后。它对数据库中数据的改变是持久的，即使数据库发生故障也不应该对其有任何影响。

🌈：**只有保证了事务的持久性、原子性、隔离性之后，一致性才能得到保障。也就是说 A、I、D 是手段，C 是目的！**

![image-20230828202040602](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308282028921.png)



## 2. Spring对事务的支持

### Spring支持的两种事务管理



#### 3.1 编程式事务管理

通过 `TransactionTemplate`或者`TransactionManager`手动管理事务，实际应用中很少使用。

使用`TransactionTemplate` 进行编程式事务管理的示例代码如下：

```java
@Autowired
private TransactionTemplate transactionTemplate;
public void testTransaction() {

        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus transactionStatus) {
                try {

                    // ....  业务代码
                } catch (Exception e){
                    //回滚
                    transactionStatus.setRollbackOnly();
                }

            }
        });
}
```

使用 `TransactionManager` 进行编程式事务管理的示例代码如下：

```java
@Autowired
private PlatformTransactionManager transactionManager;

public void testTransaction() {

  TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());
          try {
               // ....  业务代码
              transactionManager.commit(status);
          } catch (Exception e) {
              transactionManager.rollback(status);
          }
}
```



#### 3.2 声明式事务管理

这一种方式实际上比较推荐的，实际是通过 AOP 实现（基于`@Transactional` 的全注解方式使用最多）。

使用 `@Transactional`注解进行事务管理的示例代码如下：

```java
public class Test {

    @Transactional(propagation = Propagation.REQUIRED)
    public void method() {
        /** 做业务**/
        MethodOne mb = new MethodOne();
        MethodOne mc = new MethodOne();
        mb.bMethod();
        mc.cMethod();
    }
}
```

Spring主要通过以下三个接口对事务进行管理

- **`PlatformTransactionManager`**：（平台）事务管理器，Spring 事务策略的核心。
- **`TransactionDefinition`**：事务定义信息(事务隔离级别、传播行为、超时、只读、回滚规则)。
- **`TransactionStatus`**：事务运行状态。

我们可以把 **`PlatformTransactionManager`** 接口可以被看作是事务上层的管理者，而 **`TransactionDefinition`** 和 **`TransactionStatus`** 这两个接口可以看作是事务的描述。

**`PlatformTransactionManager`** 会根据 **`TransactionDefinition`** 的定义比如事务超时时间、隔离级别、传播行为等来进行事务管理 ，而 **`TransactionStatus`** 接口则提供了一些方法来获取事务相应的状态比如是否新事务、是否可以回滚等等。



##### 1. PlatformTransactionManager

简称**事务管理接口**

![image-20230828200844565](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308282008683.png)

`PlatformTransactionManager`接口中定义了三个方法：

```java
package org.springframework.transaction;

import org.springframework.lang.Nullable;

public interface PlatformTransactionManager {
    //获得事务
    TransactionStatus getTransaction(@Nullable TransactionDefinition var1) throws TransactionException;
    //提交事务
    void commit(TransactionStatus var1) throws TransactionException;
    //回滚事务
    void rollback(TransactionStatus var1) throws TransactionException;
}
```



##### 2.  TransactionDefinition

简称**事务属性**

事务管理器接口 **`PlatformTransactionManager`** 通过 **`getTransaction(TransactionDefinition definition)`** 方法来得到一个事务，这个方法里面的参数是 **`TransactionDefinition`** 类 ，这个类就定义了一些基本的事务属性。

**什么是事务属性呢？** 事务属性可以理解成事务的一些基本配置，描述了事务策略如何应用到方法上。

事务属性包含了 5 个方面：

- 隔离级别
- 传播行为
- 回滚规则
- 是否只读
- 事务超时

`TransactionDefinition` 接口中定义了 5 个方法以及一些表示事务属性的常量比如隔离级别、传播行为等等。

```java
package org.springframework.transaction;

import org.springframework.lang.Nullable;

public interface TransactionDefinition {
    int PROPAGATION_REQUIRED = 0;
    int PROPAGATION_SUPPORTS = 1;
    int PROPAGATION_MANDATORY = 2;
    int PROPAGATION_REQUIRES_NEW = 3;
    int PROPAGATION_NOT_SUPPORTED = 4;
    int PROPAGATION_NEVER = 5;
    int PROPAGATION_NESTED = 6;
    int ISOLATION_DEFAULT = -1;
    int ISOLATION_READ_UNCOMMITTED = 1;
    int ISOLATION_READ_COMMITTED = 2;
    int ISOLATION_REPEATABLE_READ = 4;
    int ISOLATION_SERIALIZABLE = 8;
    int TIMEOUT_DEFAULT = -1;
    // 返回事务的传播行为，默认值为 REQUIRED。
    int getPropagationBehavior();
    //返回事务的隔离级别，默认值是 DEFAULT
    int getIsolationLevel();
    // 返回事务的超时时间，默认值为-1。如果超过该时间限制但事务还没有完成，则自动回滚事务。
    int getTimeout();
    // 返回是否为只读事务，默认值为 false
    boolean isReadOnly();

    @Nullable
    String getName();
}
```



##### 3.  TransactionStatus

简称**事务状态**

`TransactionStatus`接口用来记录事务的状态 该接口定义了一组方法,用来获取或判断事务的相应状态信息。

`PlatformTransactionManager.getTransaction(…)`方法返回一个 `TransactionStatus` 对象。

**TransactionStatus 接口内容如下：**

```java
public interface TransactionStatus{
    boolean isNewTransaction(); // 是否是新的事务
    boolean hasSavepoint(); // 是否有恢复点
    void setRollbackOnly();  // 设置为只回滚
    boolean isRollbackOnly(); // 是否为只回滚
    boolean isCompleted; // 是否已完成
}
```





### Spring对事务的支持

> ⚠️ 再提醒一次：你的程序是否支持事务首先取决于数据库 ，比如使用 MySQL 的话，如果你选择的是 innodb 引擎，那么恭喜你，是可以支持事务的。
>
> 但是，如果你的 MySQL 数据库使用的是 myisam 引擎的话，那不好意思，从根上就是不支持事务的。

**MySQL 怎么保证原子性的？**

我们知道如果想要保证事务的原子性，就需要在异常发生时，对已经执行的操作进行**回滚**，在 MySQL 中，恢复机制是通过 **回滚日志（undo log）** 实现的，所有事务进行的修改都会先记录到这个回滚日志中，然后再执行相关的操作。如果执行过程中遇到异常的话，我们直接利用 **回滚日志** 中的信息将数据回滚到修改之前的样子即可！并且，回滚日志会先于数据持久化到磁盘上。这样就保证了即使遇到数据库突然宕机等情况，当用户再次启动数据库的时候，数据库还能够通过查询回滚日志来回滚之前未完成的事务。



### Spring对事务控制

> JDBC:
>     Connection.setAutoCommit(false);Connection.commit(); Connection.rollback();
>    
>    Mybatis：
> 
>     Mybatis自动开启事务
>
> ​    sqlSession(Connection).commit();
> ​    sqlSession(Connection).rollback();
>
> 结论：控制事务的底层 都是Connection对象完成的。



## 3. Spring控制事务的开发步骤：

Spring是通过AOP的方式进行事务的开发、

### 3.1 目标对象

```markdown
public class XXXUserServiceImpl{
   private xxxDAO xxxDAO
   set get

   1. 原始对象 ---》 原始方法 ---》核心功能 (业务处理+DAO调用)
   2. DAO作为Service的成员变量，依赖注入的方式进行赋值
}
```



### 3.2 额外功能

```markdown
1. org.springframework.jdbc.datasource.DataSourceTransactionManager
2. 注入DataSource 
1. MethodInterceptor
   public Object invoke(MethodInvocation invocation){
   	  //原理：
      try{
        Connection.setAutoCommit(false);
        Object ret = invocation.proceed();
        Connection.commit();
      }catch(Exception e){
        Connection.rollback();
      }
        return ret;
   }
2. @Aspect
   @Around 
```



### 3.3 切入点

> @Transactional 
>
> 事务的额外功能加入给哪些业务方法。
>
> 1. 类上：类中所有的方法都会加入事务
> 2. 方法上：这个方法会加入事务



### 3.4 组装切面

```markdown
1. 切入点
2. 额外功能

<tx:annotation-driven transaction-manager=""/>
```



## 4. Spring控制事务的真实编码：

- 搭建开发环境：

  ```xml
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>5.1.14.RELEASE</version>
  </dependency>
  ```

- 编码：

  ```xml
  <!-- 原始对象 -->
  <bean id="userService" class="com.baizhiedu.service.UserServiceImpl">
  	<property name="userDAO" ref="userDAO"/>
  </bean>
  
  <!--DataSourceTransactionManager-->
  <bean id="dataSourceTransactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
      <!-- 需要Connection 而Connection又在dataSource里 -->
   	<property name="dataSource" ref="dataSource"/>
  </bean>
  
  @Transactional
  public class UserServiceImpl implements UserService {
      private UserDAO userDAO;
  <!-- 告诉Spring开启基于注解的事务管理 -->
  <tx:annotation-driven transaction-manager="dataSourceTransactionManager"/>
  ```

- 细节：

  ```markdown
  <tx:annotation-driven transaction-manager="dataSourceTransactionManager" proxy-target-class="true"/>
  进行动态代理底层实现的切换   proxy-target-class
  	默认	false JDK
  		 true  Cglib 
  ```

## 5. Spring的事务属性

事务属性简称 **Transaction Attribute**

### 5.1 什么是事务属性？

> 属性：描述物体特征的一系列值
>
>   性别 身高 体重 ...
>
> 事务属性：描述事务特征的一系列值 
>
> 1. 隔离属性
> 2. 传播属性
> 3. 只读属性
> 4. 超时属性
> 5. 异常属性 



### 5.2 如何添加事务属性

```java
@Transactional(isloation=,propagation=,readOnly=,timeout=,rollbackFor=,noRollbackFor=,)
```



### 5.3 事务属性详解

#### 1. 隔离属性 (ISOLATION)

- 隔离属性的概念

  ```markdown
  概念：他描述了事务解决并发问题的特征
  1. 什么是并发
         多个事务(用户)在同一时间，访问操作了相同的数据
         
         同一时间：0.000几秒 微小前 微小后
  2. 并发会产生那些问题
         1. 脏读
         2. 不可重复读
         3. 幻影读
  3. 并发问题如何解决
         通过隔离属性解决，隔离属性中设置不同的值，解决并发处理过程中的问题。
  ```

- 事务并发会产生的问题

  - 脏读

    > 一个事务，读取了另一个事务中没有提交的数据。会在本事务中产生数据不一致的问题
    > 解决方案  @Transactional(isolation=Isolation.READ_COMMITTED)
  
- 不可重复读

  > 一个事务中，多次读取相同的数据，但是读取结果不一样。会在本事务中产生数据不一致的问题
  >
  > 注意：1 不是脏读 2 一个事务中
  >
  > 解决方案 @Transactional(isolation=Isolation.REPEATABLE_READ)
  >
> 本质： 一把行锁
  
  - 幻影读
  
    > 一个事务中，多次对整表进行查询统计，但是结果不一样，会在本事务中产生数据不一致的问题
    
    > 解决方案 @Transactional(isolation=Isolation.SERIALIZABLE)
    >
    > 本质：表锁 
    
  - 总结
  
    >   并发安全： SERIALIZABLE > REPEATABLE_READ > READ_COMMITTED
  
    > 运行效率： READ_COMMITTED > REPEATABLE_READ > SERIALIZABLE
  
- 数据库对于隔离属性的支持

  | 隔离属性值                | MySQL | Oracle |
  | ------------------------- | ----- | ------ |
  | ISOLATION_READ_COMMITTED  | ✅     | ✅      |
  | IOSLATION_REPEATABLE_READ | ✅     | ❎      |
  | ISOLATION_SERIALIZABLE    | ✅     | ✅      |

  > Oracle不支持REPEATABLE_READ值 如何解决不可重复读?
  >
  > 采用的是多版本比对的方式 解决不可重复读的问题
  
- 默认隔离属性

  > ISOLATION_DEFAULT：会调用不同数据库所设置的默认隔离属性
  >
  > MySQL : REPEATABLE_READ 
  >
  > Oracle: READ_COMMITTED  
  
- 查看数据库默认隔离属性

  - MySQL

    ```text
      select @@tx_isolation;
    ```

  - Oracle

    ```sql
    SELECT s.sid, s.serial#,
         CASE BITAND(t.flag, POWER(2, 28))
            WHEN 0 THEN 'READ COMMITTED'
            ELSE 'SERIALIZABLE'
         END AS isolation_level
      FROM v$transaction t 
      JOIN v$session s ON t.addr = s.taddr
      AND s.sid = sys_context('USERENV', 'SID');
    ```

- 隔离属性在实战中的建议

  > 推荐使用Spring指定的ISOLATION_DEFAULT
  >  1. MySQL   repeatable_read
  >  2. Oracle  read_commited 
  >
  > 未来实战中，并发访问情况，很少
  >
  > 如果真遇到并发问题，乐观锁
  >
  >    Hibernate(JPA)  Version 
  >
  >    MyBatis         通过拦截器自定义开发



#### 2.  传播属性（PROPAGATION）

- 传播属性的概念：

  > 概念：他描述了事务解决嵌套问题的特征
  >
  > 什么叫做事务的嵌套：他指的是一个大的事务中，包含了若干个小的事务
  >
  > 问题：大事务中融入了很多小的事务，他们彼此影响，最终就会导致外部大的事务，丧失了事务的原子性

![image-20230828155139656](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308281551768.png)

- 传播属性的值极其用法：

  | 传播属性的值  | 外部不存在事务 | 外部存在事务               | 用法                                                    | 备注           |
  | ------------- | -------------- | -------------------------- | ------------------------------------------------------- | -------------- |
  | REQUIRED      | 开启新的事务   | 融合到外部事务中           | @Transactional(propagation = Propagation.REQUIRED)      | 增删改方法     |
  | SUPPORTS      | 不开启事务     | 融合到外部事务中           | @Transactional(propagation = Propagation.SUPPORTS)      | 查询方法       |
  | REQUIRES_NEW  | 开启新的事务   | 挂起外部事务，创建新的事务 | @Transactional(propagation = Propagation.REQUIRES_NEW)  | 日志记录方法中 |
  | NOT_SUPPORTED | 不开启事务     | 挂起外部事务               | @Transactional(propagation = Propagation.NOT_SUPPORTED) | 及其不常用     |
  | NEVER         | 不开启事务     | 抛出异常                   | @Transactional(propagation = Propagation.NEVER)         | 及其不常用     |
  | MANDATORY     | 抛出异常       | 融合到外部事务中           | @Transactional(propagation = Propagation.MANDATORY)     | 及其不常用     |

- 默认传播属性：

  Propagation.REQUIRED

- 推荐传播属性的使用方式

  > 增删改 方法：直接使用默认值REQUIRED 
  >
  > 查询   操作：显示指定传播属性的值为SUPPORTS  







  
  

