---
title: Spring工厂高级特性
icon: circle-info
order: 3
category:
  - Spring
tag:
  - Spring
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---

## 1. 对象的生命周期

### 1.1  什么是对象的生命周期

含义：一个对象创建、存活、消亡的一个完整过程。



### 1.2 为什么要学习对象的生命周期

由 `Spring` 负责对象的创建、存活、销毁，了解生命周期，有利于我们使用好Spring为我们创建的对象。



### 1.3 声明周期的三个阶段

#### 1. 创建阶段

- `scope="singleton"`

  此时会在创建Spring工厂时，创建对象。

  注意：如果同时设置了`lazy-init="true"`，那么会在获取对象`ctx.getBean("")`时创建。

- `scope="prototype"`

  Spring工厂会在获取对象时，创建对象，即调用`ctx.getBean("")`方法时创建。

注意：如果有属性需要注入(DI)，会在创建完成时立即进行注入。



#### 2.  初始化阶段

***创建阶段完成后，Spring会调用对象的初始化方法，完成对应的初始化操作。***

程序员提供初始化方法的途径：

1. 实现`InitializingBean`接口：

   ```java
   //实现这个方法，完成初始化操作
   public void afterProperitesSet(){
     
   }
   ```

   2. 对象中提供一个普通的方法同时配置Spring配置文件：

   ~~~java
   public void myInit(){
     
   }
   ~~~

   细节分析：

   - 如果一个对象即实现InitializingBean，同时又提供的普通的初始化方法 ，顺序：

     > 1. InitializingBean 
     > 2. 普通初始化方法

   - 注入一定发生在初始化操作的前面

   - 什么叫做初始化操作：资源的初始化：数据库、IO、网络 …

     

#### 3. 销毁阶段

***Spring销毁对象`ctx.close();`前，会调用对象的销毁方法，完成销毁操作***

程序员定义销毁方法的途径：

1. 实现DisposableBean

   ```java
   public void destroy()throws Exception{
     
   }
   ```

2. 定义一个普通的销毁方法同时配置Spring配置文件：

   ```java
   public void myDestroy()throws Exception{
   
   }
   ```

   ~~~xml
   <bean id="" class="" init-method="" destroy-method="myDestroy"/>
   ~~~

   

细节分析：

- 销毁方法的操作只适用于 `scope="singleton"`
- 销毁操作主要指资源的释放操作，比如`io.close();` `connection.close();`



## 2. 配置文件参数化



### 2.1 什么是配置文件参数化

把Spring配置文件中需要经常修改的字符串信息，转移到一个更小的配置文件中。

> 1. Spring的配置文件中存在需要经常修改的字符串？
>    存在 以数据库连接相关的参数 代表
> 2. 经常变化字符串，在Spring的配置文件中，直接修改
>    不利于项目维护(修改)
> 3. 转移到一个小的配置文件(.properties)
>    利于维护(修改)
>    
>
> 配置文件参数化：利于Spring配置文件的维护(修改)



### 2.2 配置文件参数化的开发步骤:

#### 1.  提供一个小的配置文件

~~~properties
# 名字：随便
# 放置位置：随便

jdbc.driverClassName = com.mysql.jdbc.Driver
jdbc.url = jdbc:mysql://localhost:3306/test?useSSL=false
jdbc.username = root
jdbc.password = root
~~~



#### 2. Spring的配置文件与小配置文件进行整合

~~~xml
<context:property-placeholder location="classpath:/db.properties"/>
~~~



#### 3. 在Spring配置文件中通过`${key}`获取小配置文件中对应的值

![image-20200928215903162](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501239.png)



## 3. 自定义类型转换器



### 1. 什么是类型转换器

> Spring 提供了一种 Converter（类型转换器）的类型转换工具。在 Spring MVC 中，它的作用是在控制器方法对请求进行处理前，先获取到请求发送过来的参数，并将其转换为控制器方法指定的数据类型，然后再将转换后的参数值传递给控制器方法的形参，这样后台的控制器方法就可以正确地获取请求中携带的参数了。

Spring MVC 框架默认提供了许多内置的类型转换器，主要包括以下几种类型。



#### 1.1 标量转换器

| 名称                           | 作用                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| StringToBooleanConverter       | String 到 boolean 类型转换                                   |
| ObjectToStringConverter        | Object 到 String 转换，调用 toString 方法转换                |
| StringToNumberConverterFactory | String 到数字转换（例如 Integer、Long 等）                   |
| NumberToNumberConverterFactory | 数字子类型（基本类型）到数字类型（包装类型）转换             |
| StringToCharacterConverter     | String 到 Character 转换，取字符串中的第一个字符             |
| NumberToCharacterConverter     | 数字子类型到 Character 转换                                  |
| CharacterToNumberFactory       | Character 到数字子类型转换                                   |
| StringToEnumConverterFactory   | String 到枚举类型转换，通过 Enum.valueOf 将字符串转换为需要的枚举类型 |
| EnumToStringConverter          | 枚举类型到 String 转换，返回枚举对象的 name 值               |
| StringToLocaleConverter        | String 到 java.util.Locale 转换                              |
| PropertiesToStringConverter    | java.util.Properties 到 String 转换，默认通过 ISO-8859-1 解码 |
| StringToPropertiesConverter    | String 到 java.util.Properties 转换，默认使用 ISO-8859-1 编码 |



#### 1.2 集合、数组相关转换器

| 名称                            | 作用                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| ArrayToCollectionConverter      | 任意数组到任意集合（List、Set）转换                          |
| CollectionToArrayConverter      | 任意集合到任意数组转换                                       |
| ArrayToArrayConverter           | 任意数组到任意数组转换                                       |
| CollectionToCollectionConverter | 集合之间的类型转换                                           |
| MapToMapConverter               | Map之间的类型转换                                            |
| ArrayToStringConverter          | 任意数组到 String 转换                                       |
| StringToArrayConverter          | 字符串到数组的转换，默认通过“，”分割，且去除字符串两边的空格（trim） |
| ArrayToObjectConverter          | 任意数组到 Object 的转换，如果目标类型和源类型兼容，直接返回源对象；否则返回数组的第一个元素并进行类型转换 |
| ObjectToArrayConverter          | Object 到单元素数组转换                                      |
| CollectionToStringConverter     | 任意集合（List、Set）到 String 转换                          |
| StringToCollectionConverter     | String 到集合（List、Set）转换，默认通过“，”分割，且去除字符串两边的空格（trim） |
| CollectionToObjectConverter     | 任意集合到任意 Object 的转换，如果目标类型和源类型兼容，直接返回源对象；否则返回集合的第一个元素并进行类型转换 |
| ObjectToCollectionConverter     | Object 到单元素集合的类型转换                                |

Spring MVC 对于基本类型（例如 int、long、float、double、boolean 以及 char 等）已经做好了基本类型转换。因此，通常情况下 Spring MVC 提供的这些类型转换器可以满足开发人员大多数的类型转换需求的。

> 注意：在使用内置类型转换器时，请求参数输入值需要与接收参数类型相兼容，否则会报 400 错误。



### 2. 类型转换器的作用

Spring通过类型转换器把配置文件中字符串类型的数据，转换成对象中成员变量对应类型的数据，进而完成了注入。

![image-20200418201732220](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501939.png)



### 3. 为什么要自定义类型转换器？

原因：实际应用中需要转换某种特定的类型，且Spring内部没有提供这种类型转换器时，需要程序员自己定义。



### 4.  自定义类型转换器的开发步骤



#### 4.1 实现 `Converter<>`接口

~~~java
public class MyDateConverter implements Converter<String, Date> {
    /*
    convert方法作用：String --->  Date
                   SimpleDateFormat sdf = new SimpleDateFormat();
                   sdf.parset(String) ---> Date
    param:source 代表的是配置文件中 日期字符串 <value>2020-10-11</value>

    return : 当把转换好的Date作为convert方法的返回值后，Spring自动的为birthday属性进行注入（赋值）

    */
    public Date convert(String source) {
        Date date = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            date = sdf.parse(source);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}
~~~



#### 4.2 在Spring的配置文件中进行配置

~~~xml
<!-- 创建自定义转换器对象 -->
<bean id="myDateConverter" class="com.yuziyan.converter.MyDateConverter"/>

<!-- 在Spring中注册自定义的转换器 -->
<!-- 目的：告知Spring框架，我们所创建的MyDateConverter是一个类型转换器 -->
<bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">
    <property name="converters">
        <set>
            <ref bean="myDateConverter"/>
        </set>
    </property>
</bean>

<!-- 上面两步完成之后就可以直接使用了 -->
~~~



### 5. 细节

#### 5.1 体会依赖注入(DI)

`MyDateConverter`中的日期的格式，可以通过依赖注入的方式，由配置文件完成赋值。

~~~java
public class MyDateConverter implements Converter<String, Date> {

    private String pattern;
    
    public String getPattern() { return pattern; }
    
    public void setPattern(String pattern) { this.pattern = pattern; }

    /*
        convert方法作用：String --->  Date
                       SimpleDateFormat sdf = new SimpleDateFormat();
                       sdf.parset(String) ---> Date
        param:source 代表的是配置文件中 日期字符串 <value>2020-10-11</value>

        return : 当把转换好的Date作为convert方法的返回值后，Spring自动的为birthday属性进行注入（赋值）

        */
    public Date convert(String source) {
        Date date = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(pattern);
            date = sdf.parse(source);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}
<!--创建自定义类型转换器对象-->
<bean id="myDateConverter" class="com.yuziyan.converter.MyDateConverter">
    <property name="pattern" value="yyyy-MM-dd"/>
</bean>

~~~



> ##### `ConversionSeviceFactoryBean` 定义id属性，值必须是 `conversionService`



#### 5.2  Spring框架内置日期类型的转换器

> 日期格式：2020/05/01 (不支持 ：2020-05-01)



## 6. 后置处理Bean



### 6.1 BeanPostProcessor的作用：

> 对Spring工厂所创建的对象，进行再加工。
>
> 注意：BeanPostProcessor是接口

#### 1. BeanPostProcessor

*都是在目标对象被实例化之后，并且属性也被设置之后调用的*

- postProcessBeforeInitialization
  - 在afterPropertiesSet或者自定义的初始化方法(使用@bean注解中的initMethod()属性或者使用xml配置)之前执行
- postProcessAfterInitialization
  - 在afterPropertiesSet或者自定义的初始化方法之后执行（如果是从*FactoryBean*中获取的对象，则只有这个方法会起作用，，postProcessBeforeInitialization以及afterPropertiesSet或者自定义的初始化方法都不会有作用）

#### 2. InstantiationAwareBeanPostProcessor

InstantiationAwareBeanPostProcessor接口继承BeanPostProcessor接口，它内部提供了3个方法，再加上BeanPostProcessor接口内部的2个方法，所以实现这个接口需要实现5个方法。InstantiationAwareBeanPostProcessor接口的主要作用在于目标对象的实例化过程中需要处理的事情，包括实例化对象的前后过程以及实例的属性设置

在org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#createBean()方法的Object bean = resolveBeforeInstantiation(beanName, mbdToUse);方法里面执行了这个后置处理器

- postProcessBeforeInstantiation
  - 在目标对象实例化之前调用，方法的返回值类型是Object，我们可以返回任何类型的值。由于这个时候目标对象还未实例化，所以这个返回值可以用来代替原本该生成的目标对象的实例(一般都是代理对象)。如果该方法的返回值代替原本该生成的目标对象，后续只有postProcessAfterInitialization方法会调用，其它方法不再调用；否则按照正常的流程走
- postProcessAfterInstantiation
  - 方法在目标对象实例化之后调用，这个时候对象已经被实例化，但是该实例的属性还未被设置，都是null。如果该方法返回false，会忽略属性值的设置；如果返回true，会按照正常流程设置属性值。
- postProcessPropertyValues
  - 方法对属性值进行修改(这个时候属性值还未被设置，但是我们可以修改原本该设置进去的属性值)。如果postProcessAfterInstantiation方法返回false，该方法不会被调用。可以在该方法内对属性值进行修改
- postProcessBeforeInitialization&postProcessAfterInitialization
  - 父接口BeanPostProcessor的2个方法

#### 3. SmartInstantiationAwareBeanPostProcessor

智能实例化Bean后置处理器（继承InstantiationAwareBeanPostProcessor）

- determineCandidateConstructors
  - 检测Bean的构造器，可以检测出多个候选构造器(Java好像只会确定唯一的备选的构造器)
- getEarlyBeanReference
  - 循环引用的后置处理器，这个东西比较复杂， 获得提前暴露的bean引用。主要用于解决循环引用的问题，只有单例对象才会调用此方法
- predictBeanType
  - 预测bean的类型，在最后的类型转化时会用到

#### 4. MergedBeanDefinitionPostProcessor

- postProcessMergedBeanDefinition
  - 缓存bean的注入信息的后置处理器，仅仅是缓存或者干脆叫做查找更加合适，没有完成注入，注入是另外一个后置处理器的作用（不实现这个方法，也能直接调用postProcessPropertyValues完成属性值的注入）

#### 5. DestructionAwareBeanPostProcessor

- postProcessBeforeDestruction
  - 在bean实例被销毁之前被调用



### 6.2 后置处理Bean的运行原理分析

![在这里插入图片描述](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501381.png)



> 程序员实现BeanPostProcessor规定接口中的方法：
>
> 参数一：Spring工厂创建好的对象
> 参数二：对象名字
> 返回值：返回的对象会交给Spring框架
> Object postProcessBeforeInitiallization(Object bean String beanName)
> 作用：Spring创建完对象，并进行注入后，会运行Before方法进行加工
>
> Object postProcessAfterInitiallization(Object bean String beanName)
> 作用：Spring执行完对象的初始化操作后，会运行After方法进行加工
>
> 实战中：
> 很少处理Spring的初始化操作：没有必要区分Before After。只需要实现其中的一个After方法即可
> 注意：
>     postProcessBeforeInitiallization(){
>     	return bean对象
>     }



### 6.3 BeanPostProcessor的开发步骤

#### 1. 实现 BeanPostProcessor接口

~~~java
public class MyBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {

        Categroy categroy = (Categroy) bean;
        categroy.setName("xiaowb");


        return categroy;
    }
}
~~~



#### 2. Spring的配置文件中进行配置

~~~xml
<bean id="myBeanPostProcessor" class="xxx.MyBeanPostProcessor"/>
~~~



#### 3. BeanPostProcessor细节

BeanPostProcessor会对Spring工厂中所有创建的对象进行加工。

![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)