---
title: Java泛型机制
icon: circle-info
order: 8
category:
  - Knowledge
tag:
  - Knowledge
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---

## 1. 为什么会有泛型

> 泛型的本质是为了参数化类型（在不创建新的类型的情况下，通过泛型指定的不同类型来控制形参具体限制的类型）。也就是说在泛型使用过程中，操作的数据类型被指定为一个参数，这种参数类型可以用在类、接口和方法中，分别被称为泛型类、泛型接口、泛型方法。

引入泛型的意义在于：

- **适用于多种数据类型执行相同的代码**

我们通过一个例子来阐述，先看下下面的代码：

- 泛型中的类型在使用时指定，不需要强制类型转换（**类型安全**，编译器会**检查类型**）

  看下这个例子：

  ```java
      private static int add(int a, int b) {
          System.out.println(a + "+"  + b + "=" + (a + b));
          return a + b;
      }
  
      private static float add(float a, float b) {
          System.out.println(a + "+" + b + "=" + (a + b));
          return a + b;
      }
  
      private static double add(double a, double b) {
          System.out.println(a + "+" + b + "=" + (a + b));
          return a + b;
      }
  ```

  如果没有泛型，要实现不同类型的加法，每种类型都需要重载一个add方法；通过泛型，我们可以复用为一个方法：

  ```java
  private static <T extends Number> double add(T a, T b) {
      System.out.println(a + "+" + b + "=" + (a.doubleValue() + b.doubleValue()));
      return a.doubleValue() + b.doubleValue();
  }
  ```

  

  ```java
  List list = new ArrayList();
  list.add("Leo");
  list.add(100d);
  list.add(new Person());
  ```

  我们在使用上述`list`中，`list`中的元素都是`Object`类型（无法约束其中的类型），所以在取出集合元素时需要人为的强制类型转化到具体的目标类型，且很容易出现`java.lang.ClassCastException`异常。

  引入泛型，它将提供类型的约束，提供编译前的检查：

  ```java
  List<String> list = new ArrayList<String>();
  
  // list中只能放String, 不能放其它类型的元素
  ```

  如上代码所示，在没有泛型之前**类型的检查**和**类型的强转**都必须由我们程序员自己负责，一旦我们犯了错（谁还能不犯错？），就是一个运行时崩溃等着我们。那时候我们就会抱怨了：***编译器，毛也检查不出来，我把一个`Integer` 类型的对象强行转换成`String`类型你在编译的时候也不告诉我，害的我程序运行时崩溃了，这个月奖金没了！

## 2. 泛型的作用对象

### 2.1 泛型集合

泛型本质上是提供类型的“类型参数”，也就是参数化类型。我们可以为类、接口或方法指定一个类型参数，通过这个参数限制操作的数据类型，从而保证类型转换的绝对安全。

#### 例 1

下面将结合泛型与集合编写一个案例实现图书信息输出。

1）首先需要创建一个表示图书的实体类 Book，其中包括的图书信息有图书编号、图书名称和价格。Book 类的具体代码如下：

```java
package com.Leo.generics;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/23 22:22
 * @description : Book
 */
public class Book {
    private int Id; // 图书编号
    private String Name; // 图书名称
    private int Price; // 图书价格

    public Book(int id, String name, int price) { // 构造方法
        this.Id = id;
        this.Name = name;
        this.Price = price;
    }

    public String toString() { // 重写 toString()方法
        return this.Id + ", " + this.Name + "，" + this.Price;
    }
}

```

2）使用 Book 作为类型创建 Map 和 List 两个泛型集合，然后向集合中添加图书元素，最后输出集合中的内容。具体代码如下：

```java
package com.Leo.generics;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/23 22:22
 * @description :
 */
public class Demo2 {
    public static void main(String[] args) {
        // 创建3个Book对象
        Book book1 = new Book(1, "灰姑娘", 8);
        Book book2 = new Book(2, "大猩猩", 12);
        Book book3 = new Book(3, "童话故事", 22);
        // 定义泛型 Map 集合
        Map<Integer, Book> books = new HashMap<>();
        // 将第一个 Book 对象存储到 Map 中
        books.put(1001, book1);
        // 将第二个 Book 对象存储到 Map 中
        books.put(1002, book2);
        // 将第三个 Book 对象存储到 Map 中
        books.put(1003, book3);
        System.out.println("泛型Map存储的图书信息如下:");
        for (Integer id : books.keySet()) {
            // 遍历键
            System.out.print(id + "——");
            // 不需要类型转换
            System.out.println(books.get(id));
        }
        // 定义泛型的 List 集合
        List<Book> bookList = new ArrayList<>();
        bookList.add(book1);
        bookList.add(book2);
        bookList.add(book3);
        System.out.println("泛型List存储的图书信息如下:");
        for (int i = 0; i < bookList.size(); i++) {
            // 这里不需要类型转换
            System.out.println(bookList.get(i));
        }
    }

}

```

在该示例中，第 21行代码创建了一个键类型为 Integer、值类型为 Book 的泛型集合，即指明了该 Map 集合中存放的键必须是 Integer 类型、值必须为 Book 类型，否则编译出错。在获取 Map 集合中的元素时，不需要将`books.get(id);`获取的值强制转换为 Book 类型，程序会隐式转换。在创建 List 集合时，同样使用了泛型，因此在获取集合中的元素时也不需要将`bookList.get(i)`代码强制转换为 Book 类型，程序会隐式转换。

执行结果如下：

![image-20230823222645187](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308232226377.png)



### 2.2 泛型类

除了可以定义泛型集合之外，还可以直接限定泛型类的类型参数。语法格式如下：

```java
public class class_name<data_type1,data_type2,…>{}
```

其中，class_name 表示类的名称，data_ type1 等表示类型参数。Java 泛型支持声明一个以上的类型参数，只需要将类型用逗号隔开即可。

泛型类一般用于类中的属性类型不确定的情况下。在声明属性时，使用下面的语句：

```java
private data_type1 property_name1;private data_type2 property_name2;
```

该语句中的 data_type1 与类声明中的 data_type1 表示的是同一种数据类型。

在实例化泛型类时，需要指明泛型类中的类型参数，并赋予泛型类属性相应类型的值。例如，下面的示例代码创建了一个表示学生的泛型类，该类中包括 3 个属性，分别是姓名、年龄和性别。

```java
package com.Leo.generics;

public class Student<N, A, S> {
    /** 姓名 */
    private N name;

    /** 年龄 */
    private A age;

    /**  性别 */
    private S sex;
    // 创建类的构造函数

    public Student(N name, A age, S sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    /** 下面是上面3个属性的setter/getter方法*/
    public N getName() {
        return name;
    }

    public void setName(N name) {
        this.name = name;
    }

    public A getAge() {
        return age;
    }

    public void setAge(A age) {
        this.age = age;
    }

    public S getSex() {
        return sex;
    }

    public void setSex(S sex) {
        this.sex = sex;
    }
}
```

接着创建测试类。在测试类中调用 Stu 类的构造方法实例化 Stu 对象，并给该类中的 3 个属性赋予初始值，最终需要输出学生信息。测试类的代码实现如下：

```java
package com.Leo.generics;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/23 22:33
 * @description :
 */
public class Demo03 {
    public static void main(String[] args) {
        Student<String, Integer, Character> stu = new Student<>("Leo", 22, '男');
        String name = stu.getName();
        Integer age = stu.getAge();
        Character sex = stu.getSex();
        System.out.println("学生信息如下：");
        System.out.println("学生姓名：" + name + "，年龄：" + age + "，性别：" + sex);
    }
}
```

运行结果： 

![image-20230823223517060](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308232235133.png)

> 在该程序的 `Student` 类中，定义了 3 个类型参数，分别使用 N、A 和 S 来代替，同时实现了这 3 个属性的 setter/getter 方法。在主类中，调用 Stu 类的构造函数创建了 `Student` 类的对象，同时指定 3 个类型参数，分别为 String、Integer 和 Character。在获取学生姓名、年龄和性别时，不需要类型转换，程序隐式地将 Object 类型的数据转换为相应的数据类型。

**注意**：

- 1. 泛型的类型参数只能是类类型，不能是简单类型。
- 1. 不能对确切的泛型类型使用 **instanceof** 操作。如下面的操作是非法的，编译时会出错。



### 2.3 泛型方法

在此之前，我们所使用的泛型都是应用于整个类上。泛型同样可以在类中包含参数化的方法，而方法所在的类可以是泛型类，也可以不是泛型类。也就是说，<font size= 5 ><font color="blue">是否拥有泛型方法，与其所在的类是不是泛型没有关系。</font></font>

泛型方法使得该方法能够独立于类而产生变化。如果使用泛型方法可以取代类泛型化，那么就应该只使用泛型方法。另外，对一个 `static` 的方法而言，无法访问泛型类的类型参数。因此，如果 `static` 方法需要使用泛型能力，就必须使其成为泛型方法。

- 自定义的标识符(T、V、E)来代表一个类型，用`< >`括住，放在方法返回值前面。可以被用到形参声明、方法返回值、方法定义中的变量声明和类型转换。
- 泛型方法使得该泛型方法的类型参数独立于类而产生变化。泛型方法和泛型类没有关系。
- 泛型方法的类型参数，一般情况下都是被推断inference出来。更具体地讲，只能被形参或返回值推断出来，当形参和返回值用了同一个类型参数时，二者推断出来的类型必须一样、或者符合多态。
- 形参的类型参数通过实参确定；返回值的类型参数通过方法返回值赋值的对象确定。这也就是 **类型参数推断** 。
- 当形参的类型参数和返回值的类型参数是同一个时，优先使用形参的推断。因为返回值的类型参数的推断是一种拖延行为。
- 类的成员方法可以使用定义泛型类的类型参数（注意，这种方法不是泛型方法，只不过使用了类型参数而已）；而类的静态方法不可以使用泛型类的类型参数，这是因为只有当创建泛型类对象时类型参数才会被具体类型确定，也就是说，泛型类的类型参数是与对象相关的。那么，很自然地，作为一个static方法肯定不可以使用泛型类的类型参数。 **static方法想用到泛型只能将其定义为泛型方法。**

定义泛型方法的语法格式如下：

```java
[访问权限修饰符] [static] [final] <类型参数列表> 返回值类型 方法名([形式参数列表])
```

例如：

```java
public static <T> List find(Class<T> cs,int userId){}
```


一般来说编写 **Java**  泛型方法，其返回值类型至少有一个参数类型应该是泛型，而且类型应该是一致的，如果只有返回值类型或参数类型之一使用了泛型，那么这个泛型方法的使用就被限制了。下面就来定义一个`泛型方法`，具体介绍泛型方法的创建和使用。

```java
public static <T> void List(T book) { // 定义泛型方法
        if (book != null) {
            System.out.println(book);
        }
    }
    public static void main(String[] args) {
        Book stu = new Book(1, "Leo学Java", 28);
        List(stu);
        // 调用泛型方法
    }
```



### 2.4 泛型数组

其实在很多文档中都有提到这个概念，于是我翻阅了Sun文档，经过查看Sun的说明文档，在java中是**”不能创建一个确切的泛型类型的数组”**的。

也就是说下面的这个例子是不可以的：

```java
List<String>[] ls = new ArrayList<String>[10];  
```

而使用通配符创建泛型数组是可以的，如下面这个例子：

```java
List<?>[] ls = new ArrayList<?>[10];  
```

这样也是可以的：

```java
List<String>[] ls = new ArrayList[10];
```



## 3. 泛型通配符

我们在定义泛型类，泛型方法，泛型接口的时候经常会碰见很多不同的通配符，比如 T，E，K，V 等等，这些通配符又都是什么意思呢？

### 1. 常用的 T，E，K，V，？

本质上这些个都是通配符，没啥区别，只不过是编码时的一种约定俗成的东西。比如上述代码中的 T ，我们可以换成 A-Z 之间的任何一个 字母都可以，并不会影响程序的正常运行，但是如果换成其他的字母代替 T ，在可读性上可能会弱一些。**通常情况下，T，E，K，V，？ 是这样约定的：**

- ？ 表示不确定的 java 类型
- T `(type)` 表示具体的一个java类型
- K V `(key value)` 分别代表java键值中的Key Value
- E `(element)` 代表Element



### 2. ？ 和 T 的区别



![image-20230830154957129](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308301549244.png)



？和 T 都表示不确定的类型，区别在于我们可以对 T 进行操作，但是对 ？ 不行，比如如下这种 ：

```java
// 可以
T t = operate();

// 不可以
？ car = operate();
```

简单总结下：

> T 是一个 确定的 类型，通常用于泛型类和泛型方法的定义，？是一个 不确定 的类型，通常用于泛型方法的调用代码和形参，不能用于定义类和泛型方法。



## 4. 总结

本文零碎整理了下 JAVA 泛型中的一些点，不是很全，仅供参考。如果文中有不当的地方，欢迎指正。

![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311152019893.png)