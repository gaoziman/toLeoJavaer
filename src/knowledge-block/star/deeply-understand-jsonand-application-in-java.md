---
title: 深入理解JSON
icon: circle-info
order: 14
category:
  - Knowledge
tag:
  - Knowledge
pageview: false
date: 2023-11-15 21:44:15
comment: false
breadcrumb: false
---

# 深入理解JSON及其在Java中的应用

## 1.什么是JSON

在现代的Web开发中，JSON（JavaScript Object Notation）扮演了极其重要的角色。它是一种轻量级的数据交换格式，由于其易于阅读和编写，同时也易于机器解析和生成，因此广泛应用于网络数据交换和配置文件。

JSON: `J`ava`S`cript `O`bject `N`otation(JavaScript 对象表示法)

JSON 是存储和交换文本信息的语法，类似 XML。

JSON 比 XML更小、更快，更易解析。

我们来看一下到底什么是JSON数据：

```json
{
    "message": [
    { "name":"Leo" , "address":"江苏省" }, 
    { "name":"Mary" , "address":"湖北省" }, 
    { "name":"Jack" , "address":"浙江省" }
    ]
}
```

- 关于 JSON，最重要的是要理解**它是一种数据格式，不是一种编程语言。虽然具有相同的语法形式，但 JSON 并不从属于 JavaScript。**而且，并不是只有 JavaScript 才使用 JSON，毕竟 JSON 只是一种数据格式。很多编程语言都有针对 JSON 的解析器和序列化器。
- JSON 是一个**轻量级的数据格式**，可以简化表示复杂数据结构的工作量。JSON 使用 JavaScript 语法的子集表示对象、数组、字符串、数值、布尔值和 null **。
- 即使 XML 也能表示同样复杂的数据结果，但JSON 没有那么烦琐，而且在 JavaScript 中使用更便利。ECMAScript 5 定义了一个原生的 JSON 对象; JSON对象包含两个方法: 用于解析 [JavaScript Object Notation](https://link.juejin.cn/?target=https%3A%2F%2Fwww.json.org%2Fjson-en.html) (JSON) 的 `parse()` 方法，以及将`对象/值`转换为 JSON字符串的 `stringify()` 方法。



## 2.JSON语法

在了解到什么JSON之后，我们再来讲讲JSON的语法。





## 3.认识JSON分支

### 3.1 JSON字符串

前我一直有个困惑，分不清普通字符串，json字符串和json对象的区别。经过一番研究终于给弄明白了。比如在Java中。

JSON字符串是将JSON数据格式化为字符串的形式。这在数据传输时非常有用，因为J**SON数据需要被序列化成字符串格式进行网络传输**。例如，一个表示用户的JSON对象可能会被转换成这样的字符串：

字符串：这个很好解释，指使用“”双引号包括的字符。

```java
"{\"name\": \"Leo\", \"age\": 20, \"isStudent\": false}"
```

Json字符串：指的是符合Json格式要求的字符串。



### 3.2 JSON对象

Json对象：指符合Json格式要求的Java对象

```java
{
    "name":"Leo" , 
    "age":"20",
    "isStudetn":false 
}
```



### 3.3 JSON数组

**`JSON`** 数组其实就是包含了多个 **`JSON`** 对象的一个集合，数组是以 数组括号 [] 括起来的

```json
[{
    "area": "浙江杭州
    "name": "李师傅",
    "age": 25
}, 
 {
    "area": "北京海淀
    "name": "小李",
    "age": 26
}]
```

**`JSON`** 数组并一定是要相同的 **`JSON`** 对象的集合，也可以是不同的对象，不过我在开发过程中并没有这么使用过，感觉挺别扭的。因为如果将多个对象放进一个 **`JSONArray`** 中的话，下意识认为是相同类型的集合

下面 👇 这种类型也是正确的 **`JSON`** 数组格式

```json
[{
    "area": "湖北武汉",
    "name": "Leo",
    "age": 20
}, {
    "address": "湖北宜昌",
    "email": "Jack@qq.com",
    "phone": 198787891
}]
```



## 4.JSONObject

**JSONObject**是一个在Java中表示JSON对象的类，通常是由像`org.json`, `Gson`, `Jackson`或其他处理JSON的库提供。以`org.json`库为例，`JSONObject`是一个封装了JSON数据的键值映射的类。这个类允许你创建新的JSON对象、从字符串解析JSON数据以及像操作普通Java对象一样访问或修改JSON对象中的数据。

简单来说**`JSONObject`** 是根据 **`JSON`** 形式在 **`Java`** 中存在的对象映射

### 4.1 功能特点

`JSONObject`提供了一系列方法以便与JSON数据进行交互。以下是一些常用方法：

1. **创建JSON对象**: 使用 new 来创建一个空的`JSONObject`，或者通过传递一个JSON字符串来构造一个已填充的`JSONObject`。
2. **添加键值对**: 使用`put`方法可以添加键值对，如果键已经存在，将替换键对应的值。
3. **获取数据**: 提供了`get`和`opt`系列方法来获取键对应的值。`get`方法在键不存在时会抛出异常，而`opt`方法在找不到键时会返回一个默认值（例如`null`）或指定的默认值。
4. **转换为字符串**: `toString()`方法将`JSONObject`转换成JSON格式的字符串。
5. **检查键**: `has`方法可以检查`JSONObject`是否包含特定的键。



### 4.2 代码示例

下面我们通过使用`org.json`库中`JSONObject`类的做一个简单示例

```java
/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-21 19:38
 * @description :
 */
public class JSONObjectDemo{
    public static void main(String[] args) {
        // 创建一个JSONObject实例
        JSONObject jsonObj = new JSONObject();

        // 向这个对象添加键值对
        jsonObj.put("name", "Alice");
        jsonObj.put("age", 30);
        jsonObj.put("hasPet", true);

        // 输出JSON对象的字符串表示
        System.out.println("JSON Object: " + jsonObj);

        // 访问JSONObject中的值
        int age = jsonObj.getInt("age");
        String name = jsonObj.getString("name");

        // 输出获取的值
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);

        // 检查是否存在键
        boolean hasAge = jsonObj.has("age");
        System.out.println("Has age key? " + hasAge);

        // 转换JSON对象为JSON字符串
        String jsonString = jsonObj.toString();
        System.out.println("JSON String: " + jsonString);
    }
}
```



## 5.JSONArray

`JSONArray` 是Java中用于表示JSON数组的类，类似于`JSONObject`，它是用来处理JSON数据中的数组类型。JSON数组是一个有序的元素集合，每个元素可以是任意类型，如字符串、数字、JSON对象、其他数组等。这个类提供了一系列的方法来创建、解析和操作JSON数组。

### 5.1 特点

- **有序集合**: `JSONArray` 中的元素按照它们被添加的顺序排列。
- **多种类型**: 数组中可以包含不同类型的元素，包括其他的`JSONObject`或`JSONArray`。
- **灵活性**: 和`JSONObject`类似，提供了丰富的方法来操作数组。

### 5.2 常用方法

- **添加元素**: 使用 `put` 方法来向数组中添加元素。
- **提取元素**: 可以通过索引来取数组中的元素，使用诸如 `getString(index)`, `getJSONObject(index)` 等方法。
- **修改元素**: 可以通过传递索引和新值到 `put` 方法来修改数组中的元素。
- **数组长度**: 使用 `length` 方法可以获取数组的长度。
- **遍历数组**: 对`JSONArray`进行遍历，通常使用`for`循环结合 `get` 方法访问每个元素。
- **转换为字符串**: `toString` 方法可以将整个数组转换成JSON格式的字符串。

### 示例代码

```java
import org.json.JSONArray;
import org.json.JSONObject;

public class JSONArrayExample {
    public static void main(String[] args) {
        // 创建(构造)一个JSONArray实例
        JSONArray array = new JSONArray();

        // 向数组中添加元素
        array.put("apple");
        array.put(100);
        array.put(new JSONObject().put("key", "value"));

        // 获取数组长度
        int length = array.length();

        // 遍历JSONArray并输出每个元素
        for (int i = 0; i < length; i++) {
            System.out.println(array.get(i));
        }

        // 输出整个JSONArray
        System.out.println(array.toString());
    }
}
```

在上面的代码中，我们创建了一个`JSONArray`对象，并向其中添加了不同类型的元素。我们还遍历了数组并打印了每个元素，最后，我们将整个数组转换成了一个字符串。



### 5.3 应用场景

`JSONArray` 通常用于处理那些按顺序存放同类或不同类数据项的场景。在Web开发中，当我们从API接收到一个JSON数组，或者需要发送一个JSON数组时，`JSONArray`成为一个理想的工具。此外，当从JSON文件中读取数据，或者需要生成JSON格式的数据进行本地存储时，也经常会用到`JSONArray`。



## 6.FastJson的应用

阿里官方给的定义是， `fastjson` 是阿里巴巴的开源JSON解析库，它可以解析 JSON 格式的字符串，支持将 Java Bean 序列化为 **JSON字符串**，也可以从 JSON字符串反序列化到 JavaBean。



### 6.1 FastJson的优点

- **速度快**
  fastjson相对其他JSON库的特点是快，从2011年fastjson发布1.1.x版本之后，其性能从未被其他Java实现的JSON库超越。
- **使用广泛**
  fastjson在阿里巴巴大规模使用，在数万台服务器上部署，fastjson在业界被广泛接受。在2012年被开源中国评选为最受欢迎的国产开源软件之一。
- **测试完备**
  fastjson有非常多的testcase，在1.2.11版本中，testcase超过3321个。每次发布都会进行回归测试，保证质量稳定。
- **使用简单**
  fastjson的 API 十分简洁。
- **功能完备**
  支持泛型，支持流处理超大文本，支持枚举，支持序列化和反序列化扩展。



### 6.2 在Java中引用FastJson

要在Java项目中使用FastJson，首先需要将其库添加到项目的依赖中。如果你使用Maven来管理项目，可以在`pom.xml`文件中添加以下依赖：

```xml
 <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>2.0.24</version>
</dependency>
```









### 6.4 示例代码

首先我们需要先准备一个Person对象。

```java
package com.Leo.exer.json;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023-11-21 19:52
 * @description :
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Person {
    private String name;
    private int age;
}
```

#### 将Java对象转换为Json字符串

```java
Person person = new Person("Leo", 20);

// 1.将对象转换为json字符串
String jsonStr = JSON.toJSONString(person);
System.out.println("jsonStr = " + jsonStr);
```

![image-20231121195656342](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311211956395.png)



#### 将Json字符串转换为JSONObject对象

```
//2.将json字符串转换为JSONObject对象
JSONObject jsonObject = JSON.parseObject(jsonStr);
System.out.println("jsonObject = " + jsonObject);
```

![image-20231121200126582](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311212001628.png)



#### 将JSONObject转换为Java对象

```java
Person person2 = JSON.toJavaObject(jsonObject, Person.class);
System.out.println("person2 = " + person2);
```

![image-20231121200440267](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311212004331.png)



## 7.JSON格式化网站

这里推荐两个笔者比较常用的两个网站

- [在线校验JSON](https://www.bejson.com/?spm=a2c6h.12873639.article-detail.8.79d12248jPcd1L)
- [JSON在线格式解析](https://www.json.cn/?spm=a2c6h.12873639.article-detail.9.79d12248jPcd1L)



![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311231351360.png)

欢迎进入Leo哥交流群，一起共商Java大计，如若二维码失效，可添加Leo哥微信：Leocisyam，拉你入群。

![image-20231122221500504](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311222215655.png)