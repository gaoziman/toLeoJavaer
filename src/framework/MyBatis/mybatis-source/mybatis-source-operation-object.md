---
title: MyBatis操作类型对象
icon: circle-info
order: 2
tag:
  - MyBatis🐦️
category:
  - MyBatis🐦️
pageview: false
date: 2023-10-22 16:48:30
comment: false
---



上篇文章中我们提到 **Mybatis**的核心对象分为**存储类对象**和**操作类对象**。在上一篇文章我们已经介绍了关于存储类对象的概念以及场景，还没有学习的朋友们可以 [点击这里](https://blog.csdn.net/qq_58608526/article/details/133900303?spm=1001.2014.3001.5501) 进行学习。

学习参考 ：

- 讲师：**孙帅老师**
- 课程：[Mybatis3源码完全解读：从零到精通](https://www.bilibili.com/video/BV1iX4y1B7rh/?spm_id_from=333.337.search-card.all.click&vd_source=cea816a08805c218ac4390ae9b61ae31)

**Mapper.xml**当中的SQL标签都被解析成了一个一个的 **MappedStatement**对象。那么我们当中的SQL是基于什么形式进行封装的呢？

在Java中，Java当中一切皆对象。**MappedStatement**当中SQL被封装成了 **MappedStatement** 当中的SqlSource对象。

我们通过sqlSource.getBoundSql()来获取一个BoundSql对象，BoundSQL当中的对象就是对于SQL语句的真实封装。

**Cofiguration **和 **MappedStatement** 存储的是我们配置文件或者是在注解当中书写的配置信息。它们是一个存储对象。
我们还要有操作类型的对象。例如：在configuration中的mybatis-config.xml 和 我们的mapper的映射文件，xxxmapper.xml等配置文件。

## 1.什么是MyBatis操作类对象

在**MyBatis**框架中，操作类对象是**用于执行数据库操作的核心对象**。它是通过**Mapper**接口或者**XML**文件定义的，用于执行与数据库相关的**CRUD**操作(**增删改查**)。

操作类对象的作用是提供一组方法，用于执行数据库操作并返回结果。这些方法可以是对应于数据库表的增删改查操作，也可以是自定义的SQL查询操作。

在MyBatis中，操作类对象有两种定义方式：

1. **Mapper接口：** 通过定义Java接口并使用注解或XML进行映射，创建一个Mapper接口。Mapper接口中的方法可以通过注解或XML配置与具体的SQL语句进行映射。开发人员可以通过Java代码直接调用接口中的方法来执行数据库操作。
2. **XML文件：** 通过编写XML文件来定义SQL语句和数据库操作，这些XML文件可以是独立的SQL映射文件，也可以是Mapper接口对应的XML配置文件。XML文件中定义了SQL语句的具体内容和参数映射关系，开发人员可以通过读取和解析这些XML文件来执行数据库操作。

操作类对象可以通过MyBatis的Configuration对象或者SqlSessionFactory对象来获取。一旦获取到操作类对象，开发人员就可以使用它提供的方法来执行数据库操作。操作类对象会将数据库操作的细节封装起来，使开发人员只需关注业务逻辑而不需要关心具体的SQL语句和数据库连接操作。

总而言之，**MyBatis操作类对象**是用于执行数据库操作的核心对象，通过Mapper接口或者XML文件的定义，提供了一组方法来执行与数据库相关的增删改查操作。它简化了数据库操作的代码编写，提高了开发效率和可维护性。





## 2.MyBatis操作类对象的分类

### 2.1 Executor

什么是Executor？

Excutor是执行器的意思，什么是执行器，执行器就是完成各种操作的对象。Executor是执行具体的SQL语句的核心组件之一。它负责接收Mapper接口或XML文件定义的SQL语句，并将其转换为JDBC的**PreparedStatement对象**或**Statement对象**来执行数据库操作。

**Executor**主要有以下几种分类：

![image-20231018214816651](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310182148761.png)



#### 2.1.1 BaseExecutor

- **BaseExecutor** :实现了Executor的全部方法,包括对缓存,事务,连接提供了一系列的模板方法, 这些模板方法中留出来了四个抽象的方法等待子类去实现如下

```java
protected abstract int doUpdate(MappedStatement ms, Object parameter)
 throws SQLException;

protected abstract List<BatchResult> doFlushStatements(boolean isRollback)
 throws SQLException;

protected abstract <E> List<E> doQuery(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql)
 throws SQLException;

protected abstract <E> Cursor<E> doQueryCursor(MappedStatement ms, Object parameter, RowBounds rowBounds, BoundSql boundSql)
 throws SQLException;
```



#### 2.1.2 CachingExecutor

**CachingExecutor**是Executor的一种实现，它的作用是提供缓存机制，用于缓存SQL语句的执行结果。**CachingExecutor**会在执行SQL语句之前先检查缓存中是否存在相同的SQL语句及其参数，如果存在，则直接从缓存中获取结果，而不再执行数据库操作。

**CachingExecutor**的主要作用是提高系统的性能和响应速度，避免对数据库的频繁访问。它可以减少与数据库的交互次数，降低数据库的压力，提高系统的吞吐量。



#### 2.1.3 SimpleExecutor

**SimpleExecutor**是MyBatis默认的Executor，它是在每次执行SQL语句时创建一个新的Statement对象。它不支持事务处理，每次执行SQL语句都会进行数据库连接的获取和释放。这种Executor适用于简单的、非事务性的SQL操作。

**特点是每次执行完毕后都会将创建出来的statement关闭掉,他也是默认的执行器类型。**

**SimpleExecutor**是 **MyBatis **提供的默认的执行器,他里面封装了MyBatis对JDBC的操作,但是虽然他叫**XXXExecuto**,但是真正去CRUD的还真不是**SimpleExecutor**,先看一下它是如何重写 **BaseExecuto**的**doQuery**()方法的

```java
@Override
  public <E> List<E> doQuery(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) throws SQLException {
    Statement stmt = null;
    try {
      Configuration configuration = ms.getConfiguration();
      StatementHandler handler = configuration.newStatementHandler(wrapper, ms, parameter, rowBounds, resultHandler, boundSql);
      stmt = prepareStatement(handler, ms.getStatementLog());
      return handler.<E>query(stmt, resultHandler);
    } finally {
      closeStatement(stmt);
    }
  }
```

首先会创建**StatementHandler**

```java
public StatementHandler newStatementHandler(Executor executor, MappedStatement mappedStatement, Object parameterObject, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) {
  StatementHandler statementHandler = new RoutingStatementHandler(executor, mappedStatement, parameterObject, rowBounds, resultHandler, boundSql);
  statementHandler = (StatementHandler) interceptorChain.pluginAll(statementHandler);
  return statementHandler;
}
```

虽然表面上看上面的代码,感觉它只会创建一个叫 **RoutingStatementHandler** 的handler,但是其实上这里面有个秘密,**根据MappedStatement 的不同,实际上他会创建三种不同类型的处理器,如下:**

```java
public RoutingStatementHandler(Executor executor, MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) {

    switch (ms.getStatementType()) {
      case STATEMENT:
        delegate = new SimpleStatementHandler(executor, ms, parameter, rowBounds, resultHandler, boundSql);
        break;
      case PREPARED:
        delegate = new PreparedStatementHandler(executor, ms, parameter, rowBounds, resultHandler, boundSql);
        break;
      case CALLABLE:
        delegate = new CallableStatementHandler(executor, ms, parameter, rowBounds, resultHandler, boundSql);
        break;
      default:
        throw new ExecutorException("Unknown statement type: " + ms.getStatementType());
    }

  }
```

最后通过**closeStatement**来关闭Statement

```java
protected void closeStatement(Statement statement) {
    if (statement != null) {
      try {
        if (!statement.isClosed()) {
          statement.close();
        }
      } catch (SQLException e) {
        // ignore
      }
    }
  }
```



#### 2.1.4 ReuseExecutor

**ReuseExecutor**是Executor的一种实现，它会重用已经创建的Statement对象。它会对SQL语句进行缓存，当下次执行相同的SQL语句时，会直接使用已经创建的Statement对象。这种Executor适用于相同SQL语句频繁执行的场景，可以减少Statement对象的创建和销毁开销，提高性能。

**在它在本地维护了一个容器,用来存放针对每条sql创建出来的statement,下次执行相同的sql时,会先检查容器中是否存在相同的sql,如果存在就使用现成的,不再重复获取。**

**应用场景示例：**

1. 频繁查询静态数据：对于一些不经常变化的静态数据，如国家、省份、城市等信息，可以使用CachingExecutor进行缓存。这样可以避免每次查询都去数据库中查询，提高查询效率。
2. 频繁查询的结果集不变：对于一些业务场景中，某些查询结果集在一段时间内是不变的，如热门商品、广告信息等。可以使用CachingExecutor缓存这些查询结果，减少数据库的访问次数，提高性能。

需要注意的是，CachingExecutor使用缓存机制可以提高性能，但同时也可能引入数据一致性的问题。因为当对数据库进行增删改操作时，会导致缓存数据的失效。因此，在使用CachingExecutor时，需要根据业务需求合理设置缓存的有效期，以保证数据的一致性。

在**MyBatis**中，默认情况下是不开启**CachingExecutor**的，如果需要使用缓存机制，可以通过配置文件或注解来开启和配置缓存。

**源码解析：**

**这个ReuseExecutor相对于SimpleExecutor来说,不同点就是它先来的对Statement的复用,换句话说,某条Sql对应的Statement创建出来后被放在容器中保存起来,再有使用这个statement的地方就是容器中拿就行了**

他是怎么实现的呢? 看看下面的代码就知道了

```java
public class ReuseExecutor extends BaseExecutor {

  private final Map<String, Statement> statementMap = new HashMap<String, Statement>();

  public ReuseExecutor(Configuration configuration, Transaction transaction) {
    super(configuration, transaction);
  }
```

**嗯! 所谓的容器,不过是一个叫statementMap的HashMap而已**

**下一个问题: 这个容器什么时候派上用场呢? 看看下面的代码也就知道了--this.hasStatementFor(sql)**

```java
private Statement prepareStatement(StatementHandler handler, Log statementLog) throws SQLException {
    Statement stmt;
    BoundSql boundSql = handler.getBoundSql();
    String sql = boundSql.getSql();
    if (hasStatementFor(sql)) {
      stmt = getStatement(sql);
      applyTransactionTimeout(stmt);
    } else {
      Connection connection = getConnection(statementLog);
      stmt = handler.prepare(connection, transaction.getTimeout());
      putStatement(sql, stmt);
    }
    handler.parameterize(stmt);
    return stmt;
  }
```

**最后一点: 当MyBatis知道发生了事务的提交,回滚等操作时**,**ReuseExecutor**会批量关闭容器中的Statement



#### 2.1.5 BatchExecutor

**BatchExecutor**是Executor的一种实现，它用于批量操作数据库。它会将多个SQL语句进行批量执行，减少了与数据库的交互次数，提高了性能。BatchExecutor适用于需要批量插入、更新或删除数据的场景。

**特点是进行批量修改,她会将修改操作记录在本地,等待程序触发提交事务,或者是触发下一次查询时,批量执行修改。**



### 2.2 StatementHandler

**Statementhandler**是四大神器中最重要的一个对象,负责操作Statement与数据库进行交流.在工作时 还会使用**ParameterHandler**进行参数配置,使用**ResultHandler**将查询结果与实体类对象进行绑定。StatementHandler是MyBatis的核心组件之一，负责处理SQL语句的执行和结果的映射。它是在执行SQL语句之前进行参数处理和SQL语句的构建，然后执行SQL语句，最后将结果映射到Java对象上。

**StatementHandler**的主要职责包括以下几个方面：

1. 参数处理：StatementHandler会将用户传入的参数与SQL语句中的占位符进行匹配，构建最终的可执行的SQL语句。
2. SQL语句的构建：根据映射文件或注解中定义的SQL语句，StatementHandler会将参数替换为实际的值，生成最终的可执行的SQL语句。
3. SQL语句的执行：StatementHandler将生成的SQL语句交给JDBC的Statement对象执行，获取执行结果。
4. 结果映射：StatementHandler将执行结果映射到Java对象上，生成最终的结果。

**StatementHandler的应用场景：**

1. 执行简单的SQL操作：StatementHandler适用于执行简单的SQL操作，如查询、插入、更新和删除等。
2. 自定义SQL语句：如果需要执行的SQL语句不方便通过MyBatis的自动映射机制来处理，可以使用StatementHandler来自定义SQL语句，实现更灵活的数据库操作。
3. 复杂的结果映射：如果需要将查询结果映射到多个Java对象中，或者需要进行一些特殊的结果处理，可以通过自定义StatementHandler来实现复杂的结果映射逻辑。

需要注意的是，大多数情况下，我们不需要直接操作和使用StatementHandler，MyBatis框架会自动创建和管理StatementHandler对象。只有在需要实现一些特殊的数据库操作时，才需要自定义或扩展StatementHandler。通常情况下，我们只需要编写Mapper接口或XML文件，定义SQL语句和结果映射规则，MyBatis会自动处理和执行SQL语句。

后续会继续通过跟进源码分析....



### 2.3 ParameterHandler

**ParameterHandler**是MyBatis的核心组件之一，它负责处理SQL语句中的参数传递和设置。**ParameterHandler**主要用于将Java对象的属性值设置到**PreparedStatement**中，替换SQL语句中的占位符。

**ParameterHandler的主要职责包括以下几个方面：**

1. 参数处理：ParameterHandler将用户传入的参数与SQL语句中的占位符进行匹配，根据占位符的位置和类型，将Java对象的属性值设置到PreparedStatement中。
2. 参数类型处理：ParameterHandler负责处理不同类型的参数，将Java对象的属性值转换为对应的数据库类型，以便正确地设置到PreparedStatement中。
3. 参数传递：ParameterHandler将处理后的参数传递给JDBC的PreparedStatement对象，以便执行SQL语句。

**ParameterHandler的应用场景：**

1. SQL语句的参数传递：ParameterHandler适用于处理SQL语句中的参数传递，将Java对象的属性值设置到PreparedStatement中。这包括简单的参数类型，如字符串、整数、日期等，也包括复杂的参数类型，如Java对象、集合等。
2. 动态SQL语句的构建：如果SQL语句是动态生成的，根据不同的条件拼接不同的SQL片段，ParameterHandler可以根据条件设置对应的参数值，确保动态生成的SQL语句的正确执行。
3. 参数类型转换：如果涉及到不同的数据类型，如Java对象属性与数据库字段类型不一致，或需要将Java对象属性值转换为数据库支持的类型，ParameterHandler可以负责处理参数类型转换，确保参数的正确性。

需要注意的是，大多数情况下，我们不需要直接操作和使用ParameterHandler，MyBatis框架会自动创建和管理ParameterHandler对象。只有在需要实现一些特殊的参数处理或转换操作时，才需要自定义或扩展ParameterHandler。通常情况下，我们只需要编写Mapper接口或XML文件，定义SQL语句和参数映射规则，MyBatis会自动处理和设置参数。

后续会继续通过跟进源码分析....



### 2.4 ResultSetHandler

**ResultSetHandler**是MyBatis的核心组件之一，它负责将JDBC查询结果集中的数据映射到Java对象上。**ResultSetHandler**将ResultSet中的每一行数据转换为Java对象，并将这些对象组成一个集合或数组，作为最终的查询结果返回。

**ResultSetHandler的主要职责包括以下几个方面：**

1. 结果集处理：ResultSetHandler将JDBC的ResultSet对象中的数据进行处理，将每一行数据转换为Java对象。
2. 映射规则：ResultSetHandler根据映射文件或注解中定义的结果映射规则，将ResultSet中的列与Java对象的属性进行映射。
3. 数据类型转换：ResultSetHandler负责将ResultSet中的数据转换为Java对象的属性类型，确保类型的匹配和正确性。
4. 结果集的封装：ResultSetHandler将处理后的Java对象封装成一个集合或数组，作为最终的查询结果返回给用户。

**ResultSetHandler的应用场景：**

1. 查询操作：ResultSetHandler适用于执行查询操作，将查询结果映射到Java对象上，并返回给用户。
2. 数据类型转换：如果查询结果中的数据类型与Java对象的属性类型不匹配，或者需要进行一些特殊的数据类型转换，ResultSetHandler可以负责处理数据类型的转换，确保数据的正确映射。
3. 结果集的定制化：如果需要将查询结果映射到多个Java对象中，或者需要进行一些特殊的结果处理，如对结果进行分组、排序、聚合等，可以通过自定义ResultSetHandler来实现定制化的结果集处理逻辑。

需要注意的是，大多数情况下，我们不需要直接操作和使用ResultSetHandler，MyBatis框架会自动创建和管理ResultSetHandler对象。只有在需要实现一些特殊的结果集处理逻辑时，才需要自定义或扩展ResultSetHandler。通常情况下，我们只需要编写Mapper接口或XML文件，定义SQL语句和结果映射规则，MyBatis会自动处理和映射结果集。

后续会继续通过跟进源码分析....



### 2.5 TypeHandler

**TypeHandler**是MyBatis的核心组件之一，它负责处理Java对象与数据库类型之间的转换。**TypeHandler**将Java对象的属性值转换为数据库支持的数据类型，并且在从数据库中读取数据时将其转换为Java对象的属性类型。

**TypeHandler的主要职责包括以下几个方面：**

1. 参数设置：TypeHandler负责将Java对象的属性值转换为对应的数据库类型，将参数设置到PreparedStatement中。
2. 结果获取：TypeHandler负责从ResultSet中获取数据库的值，并将其转换为Java对象的属性类型。
3. JDBC类型处理：TypeHandler根据Java对象的属性类型和数据库支持的类型，进行类型之间的转换，确保数据的正确性和兼容性。

**TypeHandler的应用场景：**

1. 自定义数据类型映射：如果在数据库中使用了一些非标准或自定义的数据类型，TypeHandler可以帮助我们将这些类型映射到Java对象的属性类型上，实现数据库类型与Java类型之间的转换。
2. 数据类型转换：如果Java对象的属性类型与数据库字段类型不匹配，或者需要进行一些特殊的数据类型转换，TypeHandler可以负责处理数据类型的转换，确保数据的正确映射。
3. 复杂数据结构的映射：如果Java对象的属性是一个复杂的数据结构，如JSON字符串、XML字符串等，TypeHandler可以负责将这些复杂结构转换为数据库支持的数据类型，以及从数据库中读取并转换为Java对象的属性类型。
4. 枚举类型的映射：MyBatis内置了一些常用的TypeHandler，可以直接映射Java的枚举类型到数据库中的数字或字符串类型。

需要注意的是，MyBatis提供了一些内置的TypeHandler，用于处理常见的数据类型转换，如字符串、整数、日期等。对于自定义的数据类型，我们可以通过实现TypeHandler接口来自定义TypeHandler，并注册到MyBatis的配置中。这样，在执行SQL语句时，MyBatis就会自动调用相应的TypeHandler来进行数据类型的转换。

后续会继续通过跟进源码分析....



## 3.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。

![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)