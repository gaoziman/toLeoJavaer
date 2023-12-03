---
title: Java基础篇 数组
icon: circle-info
order: 3
category:
  - Java☕
tag:
  - Java☕
pageview: false
date: 2023-10-09 15:25:30
comment: false
breadcrumb: false
---

> 大家好，我是Leo🫣🫣🫣，最近在复习Java基础内容，这个专栏后续也会一直更新下去，Java基础乃是咱
>
> 们Java的根基，俗话说，基础不牢，地动山摇。今天我们主要学习Java数组相关知识，话不多说，
>
> 让我们开始吧😎😎😎。

在开始之前，先通过一张图来了解一下我们今天要学习的数组的主要大纲吧

![image-20231009131946655](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091319817.png)

## 1. 数组的概述



### 1.1 为什么需要数组

我们下面先看一个简单的例子

一个**养鸡场有** 6 **只鸡**，它们的体重分别是 3kg,5kg,1kg,3.4kg,2kg,50kg 。请问这六只鸡的总体重是多少?平 均体重是多少? 请你编一个程序。

**思路：** 定义 6个变量, 加起来 总体重， 求出平均体重 引出 -> 数组

```JAVA
package com.Leo.array.Leo01.exer;


/**
 * @author : Leo
 * @version 1.0
 * @date 2023/9/24/024 11:06
 * @description : 数组练习3
 *
 * 一个养鸡场有 6 只鸡，它们的体重分别是 3kg,5kg,1kg,3.4kg,2kg,50kg 。
 * 请问这六只鸡的总体重是多少?平均体重是多少? 请你编一个程序。
 */
public class ArrayExer03
{
    
    public static void main(String[] args)
    {
        // 1. 使用for循环来计算以下的平均体重/ double hen1 = 3;
        // double hen2 = 5;
        // double hen3 = 1;
        // double hen4 = 3.4;
        // double hen5 = 2;
        // double hen6 = 50;
        // double totalWeight = hen1 + hen2 + hen3 + hen4 + hen5 + hen6;
        // double avgWeight = totalWeight / 6;
        // System.out.println("总体重=" + totalWeight
        // + "平均体重=" + avgWeight);
        //比如，我们可以用数组来解决上一个问题 => 体验


        //1. double[] 表示 是 double 类型的数组， 数组名 hens
        //2. {3, 5, 1, 3.4, 2, 50} 表示数组的值/元素,依次表示数组的

        double[] hens = {3, 5, 1, 3.4, 2, 50, 7.8, 88.8,1.1,5.6,100};
        //遍历数组得到数组的所有元素的和， 使用 for循环来得到

        //1. 我们可以通过 hens[下标] 来访问数组的元素

        // 下标是从 0 开始编号的比如第一个元素就是 hens[0]
        // 第 2 个元素就是 hens[1] , 依次类推

        //2. 通过 for 就可以循环的访问 数组的元素/值

        //3. 使用一个变量 totalWeight 将各个元素累积

        System.out.println("===使用数组解决===");
        double totalWeight = 0;
        for( int i = 0; i < hens.length; i++) {
            totalWeight += hens[i];
        }
        System.out.println("总体重=" + totalWeight + "平均体重=" + (totalWeight / hens.length) );

    }
}

```

### 1.2 什么是数组

****

在计算机科学中，**阵列资料结构**（英语：array data structure），简称**数组**（英语：Array），是由相同类型的元素（element）的集合所组成的 [资料结构](https://zh.wikipedia.org/wiki/数据结构)，分配一块连续的内存来存储。利用元素的索引（index）可以计算出该元素对应的储存地址。

最简单的资料结构类型是 **一维阵列**。例如，索引为0到9的32位元整数阵列，可作为在记忆体位址2000，2004，2008，...2036中，储存10个变量，因此索引为i的元素即在记忆体中的2000+4×i位址。阵列第一个元素的记忆体位址称为第一位址或基础位址。

**简单来说数组的定义：**

数组（array）是一种最简单的复合数据类型，它是有序数据的集合，数组中的每个元素具有相同的数据类型，可以用一个统一的数组名和不同的下标来确定数组中唯一的元素。根据数组的维度，可以将其分为一维数组、二维数组和多维数组等。



### 1.4 简述数组特性

**数组的特点：**

1. 数组是一组数据的集合。
2. **数组作为一种引用类型。**
3. **长度固定**：Array 的长度在创建时就已经确定，并且不能被修改，但是可以指向其他数组。
4. **同类型元素**：Array 中的所有元素必须是同一种类型（对象类型存储的是引用）。
5. **内存连续**：Array 存储在连续的内存位置。
6. **下标从 0 开始**：Array 中的元素是通过下标来访问的，下标从 0 开始，最大下标为长度减 1,如果数组有 **n** 个元素，那么数组的索引是从 0 到（n-1）。
7. 给定数组下标访问下标对应的元素时，的时间复杂度为 1。
8. Array 是 Java 中的对象，因此可以使用对象属性 `lenght` 获取到 Array 的长度。
9. Java 中 Array 都实现了 `Cloneable` 和 `java.io.Serializable` 接口。
10. 数组可以是**一维数组**、**二维数组**或**多维数组**。
11. 数值数组元素的默认值为 0，而引用元素的默认值为 null。
12. 数组元素可以是任何类型，包括数组类型。
13. 数组类型是从抽象基类 Array 派生的引用类型。



**数组的分类：**

- 按照维度：**一维数组**、**二维数组**、**三维数组**、…
- 按照元素的数据类型分：基本数据类型元素的数组、引用数据类型元素的数组(即对象数组)

Java中数组是一种用来存储多个数据项的数据结构。数组可以存储基本类型和对象类型的数据，使用时需要先声明数组类型以及数组长度，如下所示




## 2. 数组的使用

### 2.1 数组的声明

**数组的定义**

```java
数据类型[] 数组名  new 数据类型[大小]
int[] a = new int[5];
创建了一个数组，名字为a ，存放了5个int
```

**说明：这是定义数组的一种方法。为了让大家明白，我画了一个数组内存图说明**

![image-20231009133318210](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091333275.png)



### 2.2 数组的创建

#### 1. 使用方式一：动态初始化

**先声明数组**

**语法**:数据类型 数组名[];

也可以 数据类型[] 数组名; int a[]; 或者 int[] a;

**创建数组**

**语法**: 数组名=new 数据类型[大小];

```Java
a = new int[5];
```





### 2.3 数组的使用和注意事项

1. 数组是多个相同类型数据的组合，实现对这些数据的统一管理。

2. 数组中的元素可以是任何数据类型，包括基本类型和引用类型，但是不能混用。

3. 数组创建后，如果没有赋值，有默认值

   > int 0，short 0, byte 0, long 0, float 0.0,double 0.0，char \u0000，boolean false，String null

4. 使用数组的步骤 1. 声明数组并开辟空间 2 给数组各个元素赋值 3 使用数组

5. 数组的**下标是从** 0 **开始的**。

6. 数组下标必须在指定范围内使用，否则报：下标越界异常，比如

> int [] arr=new int[5]; 则有效下标为 0-4

7. 数组属引用类型，数组型数据是对象(object)




## 4. 数组使用案例

### 4.1 案例1

创建一个 char 类型的 26 个元素的数组，分别 放置'A'-'Z'。使用 for 循环访问所有元素并打印出来。提示：char 类型 数据运算 'A'+2 -> 'C'

```JAVA
package com.Leo.array.Leo01.exer;



/**
 * @author : Leo
 * @version 1.0
 * @date 2023/9/24/024 11:06
 * @description : 数组案例1
 *
 * 创建一个 char 类型的 26 个元素的数组，分别 放置'A'-'Z'。
 * 使用 for 循环访问所有元素并打印出来。
 * 提示：char 类型数据运算 'A'+1 -> 'B'
 */
public class ArrayCase01
{

    public static void main(String[] args)
    {

        char[] chars = new char[26];

        for (int i = 0; i <chars.length; i++) {
            chars[i]  = (char) ('A' + i);
            System.out.print(chars[i] + " ");
        }

        System.out.println("初始化的字符数组:  " + new String(chars));
    }
}

```

### 4.2 案例2

请求出一个数组 int[]的最大值 {4,-1,9, 10,23}，并得到对应的下标。

```JAVA
package com.Leo.array.Leo01.exer;


/**
 * @author : Leo
 * @version 1.0
 * @date 2023/9/24/024 11:06
 * @description : 数组案例2
 *
 *
 * 请求出一个数组 int[]的最大值 {4,-1,9, 10,23}，并得到对应的下标。
 */
public class ArrayCase02
{

    // 1.假定 max = arr[0] 是最大值 , maxIndex=0;
    // 2.从下标 1 开始遍历 arr， 如果 max < 当前元素，说明 max 不是真正的
   //  最大值, 我们就 max=当前元素; maxIndex=当前元素下标
  //   3. 当我们遍历这个数组 arr 后 , max 就是真正的最大值，maxIndex 最大值
    
    public static void main(String[] args)
    {

        int[] array = {4,-1,9, 10,23};

        //假定第一个元素就是最大值
        int max = array[0];
        int maxIndex = 0;

        for (int i = 0; i < array.length; i++)
        {
            if (max < array[i])
            {
                max = array[i];
                maxIndex = i;
            }
        }
        System.out.println("数组最大值为: " + max + " , "+"最大值下标为:" + maxIndex);
    }
}
```



## 5. 数组进阶

### 5.1 数组的赋值机制

1. 基本数据类型赋值，这个值就是具体的数据，而且相互不影响。

   > int n1 = 2; int n2 = n1;

2. 数组在默认情况下是引用传递，赋的值是地址。

看一个案例，并分析数组赋值的内存图(重点,难点. )。

```java
//代码ArrayAssign.java

int[] arr1 = {1,2,3};

int[] arr2 = arr1;

```

**用韩顺平老师的图来讲解以下。**

![image-20231009141326983](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091413124.png)

**这里的arr1和arr2相当于栈，而数组中的数据{1,2，3}就相当于与内存中的堆，arr1[]是指向{1,2，3}这个堆的，所以可以访问，当把arr1赋值给arr2时，arr2就具有了和arr1一样的访问权，因此对arr2的数据更改，会影响到arr1的数据。**

**如果还有人听不懂，那我就再举个很简单的例子，我们都玩过“我的世界”这款游戏。比如你和你的朋友一起玩，你的朋友做了一把木剑，放在了他自己的背包里，他又做了一个相同的木剑给了你，你们都有了木剑（这就相当于简单地值拷贝）。现在有一个箱子，你朋友做了一把木剑放在了箱子里，你觉得木剑太垃圾了，把木剑换成了钻石剑放在了箱子里，你朋友打开箱子发现木剑变成了钻石剑（这就是引用赋值）**

我想到这里应该讲的也挺清楚的了，数组的赋值引用，变得是地址罢了。希望能够帮助到小伙伴们！！




### 5.2 数组拷贝

编写代码实现数组拷贝(内容复制) ArrayCopy.java

将int[] arr1 = {10,20,30};拷贝到arr2数组,要求数据空间是独立的.

```java
package com.Leo.array.Leo01.exer;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/10/9/009 14:21
 * @description :
 */
public class ArrayCopy {

    public static void main(String[] args) {
        //将 int[] arr1 = {10,20,30};拷贝到 arr2数组,//要求数据空间是独立的.

        int[] arr1 = {10,20,30};

        //创建一个新的数组 arr2,开辟新的数据空间  大小 arr1.length;

        int[] arr2 = new int[arr1.length];

        //遍历 arr1，把每个元素拷贝到 arr2对应的元素位置
        for(int i = 0; i < arr1.length; i++) {
            arr2[i] = arr1[i];
        }


        //修改 arr2，不会对 arr1有影响
        arr2[0] = 100;

        //输出 arr1
        System.out.println("====arr1的元素====");
        for(int i = 0; i < arr1.length; i++) {
            System.out.println(arr1[i]);
        }

        System.out.println("====arr2的元素====");
        for(int i = 0; i < arr2.length; i++) {
            System.out.println(arr2[i]);
        }
    }
}

```

**结果：**

![image-20231009142441125](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091424192.png)




### 5.3 数组反转

#### 1. 方式1：通过找规律反转


```java
package com.Leo.array.Leo01;


import java.util.Arrays;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/9/24/024 11:06
 * @description : 数组案例2  数组反转
 *
 *
 * 要求: 把数组的元素内容反转。
 * arr {11,22,33,44,55,66} {66, 55,44,33,22,11}
 */
public class ArrayReverse01
{

    public static void main(String[] args)
    {
        // 把数组的元素内容反转

        // 使用交换的方式
        int[] arr1 = {11, 22, 33, 44, 55, 66};
        int temp;
        int len = arr1.length;
        // 先遍历所有的元素
        for (int i = 0; i < len/2; i++)
        {
            // 模拟交换数组中的两个元素
            temp = arr1[i];
            arr1[i] = arr1[len-1-i];
            arr1[len - i -1] = temp;
        }
        // 打印新数组
        System.out.println("反转后的数组: "+Arrays.toString(arr1));

    }
}

```

#### 2. 方式2：使用逆序赋值方式 ArrayReverse02.java

**思路分析：**



```java
          //使用逆序赋值方式
          //1.先创建一个新的数组arr2 ,大小arr.length
          //2.逆序遍历arr ,将每个元素拷贝到arr2的元素中(顺序拷贝)
          //3.建议增加一个循环变量j -> 0 -> 5
          // int[] arr2 = new int[arr.length];
          //逆序遍历arr 
          //4.当for循环结束，arr2就是一个逆序的数组{66, 55, 44,33, 22, 11}
          //5.让arr指向arr2数据空间,此时arr原来的数据空间就没有变量引用
          //会被当做垃圾，销毁
          arr = arr2;
				// 第二种方式:
        int[] arr = {11, 22, 33, 44, 55, 66};
        int[] arrReverse = new int[arr.length];
        for (int i = arr.length -1, j = 0; i >= 0; i--, j++)
        {
            arrReverse[j] = arr[i];
        }

        // 对arrReverse进行销毁
        // arr = arrReverse;
        System.out.println("反转之后的数组2:" + Arrays.toString(arrReverse));
        System.out.println("===========================================");

        // 第二种方式: 创建一个新的数组并上移
        int[] arrReverseNew = new int[arr.length];
        for (int i = 0, j = arr.length -1; i < arr.length; i++, j--)
        {
            arrReverseNew[j] = arr[i];
        }
        System.out.println("反转之后的数组: "+Arrays.toString(arrReverseNew));


        System.out.println("=============================================");
```



#### 3. 方式3： 创建一个新的数组并下移

```java
		// 第三种方式 - 创建一个新的数组并下移
        int[] arrReverseNew2 = new int[arr.length];
        for (int i = arr.length -1, j = 0; i >= 0; i--, j++)
        {
            arrReverseNew2[j] = arr[i];
        }
        System.out.println("反转之后的数组: "+Arrays.toString(arrReverseNew2));


        // 第四种方式: 要求在下移之后还原数组元素的相对顺序
        int[] arrReverseNew3 = new int[arr.length];
        int left = 0;
        int right = arr.length -1;
        while (left < right)
        {

            arrReverseNew3[left] = arr[right];
            left++;
            right--;
        }


        System.out.println("=============================================");
```



#### 4. 要求在下移之后还原数组元素的相对顺序

```java
			// 第四种方式: 要求在下移之后还原数组元素的相对顺序
        int[] arrReverseNew3 = new int[arr.length];
        int left = 0;
        int right = arr.length -1;
        while (left < right)
        {

            arrReverseNew3[left] = arr[right];
            left++;
            right--;
        }
        System.out.println("=============================================");
```





### 5.4 数组的扩容机制

#### 1. 介绍

在Java中，数组是一种固定长度的数据结构，一旦创建后，其长度无法改变。然而，在实际开发中，经常会遇到需要动态扩容数组的情况。为了解决这个问题，Java提供了一种机制来实现数组的动态扩容，即通过创建一个更大的新数组，然后将原有数组的元素复制到新数组中。

本文将介绍Java数组扩容的机制及其具体实现步骤。



#### 2. 实现步骤

| 步骤 | 描述                             |
| ---- | -------------------------------- |
| 1    | 创建一个新的数组                 |
| 2    | 将原有数组的元素复制到新数组中   |
| 3    | 更新引用，将新数组赋值给原有数组 |

下面将分别介绍每个步骤需要做的具体操作。


##### 2.1 创建一个新的数组

首先，我们需要创建一个新的数组，用于存放扩容后的元素。根据需要扩容的大小，我们可以使用`new`关键字创建一个新的数组对象，并指定新数组的长度。例如：

```java
int newSize = oldSize * 2; // 假设需要将数组扩容为原大小的两倍
int[] newArray = new int[newSize];
```



##### 2.2 将原有数组的元素复制到新数组中

接下来，我们需要将原有数组的元素复制到新数组中。Java提供了`System.arraycopy()`方法来进行数组复制操作。该方法需要传入源数组、源数组的起始位置、目标数组、目标数组的起始位置以及要复制的元素数量。代码示例如下：

```java
System.arraycopy(oldArray, 0, newArray, 0, oldSize);
```



##### 2.3 更新引用，将新数组赋值给原有数组

最后，我们需要更新引用，将新数组赋值给原有数组。这样，原有数组的引用就指向了新的扩容后的数组，从而完成了数组的扩容操作。代码示例如下：

```java
oldArray = newArray;
```



#### 3.示例代码1

下面是一个完整的示例代码，演示了如何实现Java数组的扩容机制：

```java
public class ArrayResizeExample {
    public static void main(String[] args) {
        int[] oldArray = new int[5]; // 原始数组的大小为5
        int oldSize = oldArray.length;
        int newSize = oldSize * 2; // 扩容为原大小的两倍

        int[] newArray = new int[newSize]; // 创建一个新的数组

        System.arraycopy(oldArray, 0, newArray, 0, oldSize); // 复制原数组的元素到新数组中

        oldArray = newArray; // 更新引用，将新数组赋值给原数组

        System.out.println("原始数组大小：" + oldSize);
        System.out.println("扩容后数组大小：" + oldArray.length);
    }
}
```

运行以上代码，输出结果如下：

```java
原始数组大小：5
扩容后数组大小：10
```

通过以上示例，我们可以看到原始数组的大小为5，扩容后数组的大小为10，成功实现了数组的扩容操作。



#### 3.示例代码2



```java
package com.Leo.array.Leo01.exer;

import java.util.Scanner;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/10/09/024 11:06
 * @description : 数组拷贝
       要求：实现动态的给数组添加元素效果，实现对数组扩容。ArrayAdd.java
      
      1. 原始数组使用静态分配int[] arr = {1,2,3}
      2. 增加的元素4，直接放在数组的最后arr = {1,2,3,4}
      3. 用户可以通过如下方法来决定是否继续添加，添加成功，是否继续？y/n
 *
 */
public class ArrayAdd02 { 

	//编写一个main方法
	public static void main(String[] args) {
		/*
		要求：实现动态的给数组添加元素效果，实现对数组扩容。
		1.原始数组使用静态分配 int[] arr = {1,2,3}
		2.增加的元素4，直接放在数组的最后 arr = {1,2,3,4}
		3.用户可以通过如下方法来决定是否继续添加，添加成功，是否继续？y/n
		
		思路分析
		1. 定义初始数组 int[] arr = {1,2,3}//下标0-2
		2. 定义一个新的数组 int[] arrNew = new int[arr.length+1];
		3. 遍历 arr 数组，依次将arr的元素拷贝到 arrNew数组
		4. 将 4 赋给 arrNew[arrNew.length - 1] = 4;把4赋给arrNew最后一个元素
		5. 让 arr 指向 arrNew ;  arr = arrNew; 那么 原来arr数组就被销毁
		6. 创建一个 Scanner可以接受用户输入
		7. 因为用户什么时候退出，不确定，使用 do-while + break来控制
		 */
		
		Scanner myScanner = new Scanner(System.in);
		//初始化数组
		int[] arr = {1,2,3};

		do {
			int[] arrNew = new int[arr.length + 1];
			//遍历 arr 数组，依次将arr的元素拷贝到 arrNew数组
			for(int i = 0; i < arr.length; i++) {
				arrNew[i] = arr[i];
			}
			System.out.println("请输入你要添加的元素");
			int addNum = myScanner.nextInt();
			//把addNum赋给arrNew最后一个元素
			arrNew[arrNew.length - 1] = addNum;
			//让 arr 指向 arrNew, 
			arr = arrNew;
			//输出arr 看看效果
			System.out.println("====arr扩容后元素情况====");
			for(int i = 0; i < arr.length; i++) {
				System.out.print(arr[i] + "\t");
			}
			//问用户是否继续
			System.out.println("是否继续添加 y/n");
			char key = myScanner.next().charAt(0);
			if( key == 'n') { 
				break;
			}			
		}while(true);

		System.out.println("你退出了添加...");
	}
}
```



## 6. 数组的排序与查找

### 6.1 排序的介绍

排序是将多个数据，依指定的顺序进行排列的过程。

**1. 定义**

**排序算法**（英语：Sorting algorithm）是一种将一组特定的数据按某种顺序进行排列的算法。排序算法多种多样，性质也大多不同。



**2.稳定性**

稳定性是指相等的元素经过排序之后相对顺序是否发生了改变。

![image-20231009144740597](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091447662.png)

基数排序、计数排序、插入排序、冒泡排序、归并排序是稳定排序。

选择排序、堆排序、快速排序、希尔排序不是稳定排序。

**3.时间复杂度**

![image-20231009144809928](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091448007.png)

以下是几种排序算法的比较。

![](https://oi-wiki.org/basic/images/sort-intro-1.apng)

**4.空间复杂度**

与时间复杂度类似，空间复杂度用来描述算法空间消耗的规模。一般来说，空间复杂度越小，算法越好。



#### 1. 内部排序

指将需要处理的所有数据都加载到内部存储器中进行排序。包括(**交换式排序法、选择式排序法和插入式排序法**)。



#### 2. 外部排序

数据量过大，无法全部加载到内存中，需要借助外部存储进行排序。包括(合并排序法和直接合并排序法)。


### 6.2 冒泡排序

假设有 5 个数字 3，1，6，2，5 在一个 int 数组中，要求按从小到大排序输出

如何采用冒泡排序算法呢？

冒泡排序的算法是这样的，首先从数组的最左边开始，取出第 0 号位置（左边）的数据和第 1

号位置（右边）的数据，如果左边的数据大于右边的数据，则进行交换，否而不进行交换。接 下来右移一个位置，取出第 1 个位置的数据和第 2 个位置的数据，进行比较，如果左边的数据 大于右边的数据，则进行交换，否而不进行交换。沿着这个算法一直排序下去，最大的数就会 冒出水面，这就是冒泡排序。

以上示例排序过程如下：

![image-20231009145156471](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091451569.png)

![image-20231009145215167](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091452252.png)

下面以数列{20,40,30,10,60,50}为例，演示它的冒泡排序过程(如下图)。

![](https://pdai.tech/images/alg/alg-sort-bubble-1.jpg)

我们先分析第1趟排序

- 当i=5,j=0时，a[0]<a[1]。此时，不做任何处理！
- 当i=5,j=1时，a[1]>a[2]。此时，交换a[1]和a[2]的值；交换之后，a[1]=30，a[2]=40。
- 当i=5,j=2时，a[2]>a[3]。此时，交换a[2]和a[3]的值；交换之后，a[2]=10，a[3]=40。
- 当i=5,j=3时，a[3]<a[4]。此时，不做任何处理！
- 当i=5,j=4时，a[4]>a[5]。此时，交换a[4]和a[5]的值；交换之后，a[4]=50，a[3]=60。

于是，第1趟排序完之后，数列{20,40,30,10,60,50}变成了{20,30,10,40,50,60}。此时，数列末尾的值最大。

根据这种方法:

- 第2趟排序完之后，数列中a[5...6]是有序的。
- 第3趟排序完之后，数列中a[4...6]是有序的。
- 第4趟排序完之后，数列中a[3...6]是有序的。
- 第5趟排序完之后，数列中a[1...6]是有序的。整个数列也就是有序的了。

#### 冒泡排序时间复杂度

冒泡排序的时间复杂度是O(N2)。 假设被排序的数列中有N个数。遍历一趟的时间复杂度是O(N)，需要遍历多少次呢? N-1次！因此，冒泡排序的时间复杂度是O(N2)。



#### 冒泡排序稳定性

冒泡排序是稳定的算法，它满足稳定算法的定义。 算法稳定性 -- 假设在数列中存在a[i]=a[j]，若在排序之前，a[i]在a[j]前面；并且排序之后，a[i]仍然在a[j]前面。则这个排序算法是稳定的！



#### 代码示例

```java
package com.Leo.array.Leo01.sort;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/9/26/026 11:34
 * @description : 冒泡排序
 */
public class ArrayBubbleSort {

    /**
     * 用于测试: 冒泡排序基本写法
     */
    @Test
    public void testBubbleSort01() {

        int[] arr = {73,88,41, 23, 93, 14, 25, 3, 1, 10, 4, 2 };

        int temp = 0;

        int len = arr.length - 1;


        // 外层循环负责总轮数
        for (int i = 0; i < len; i++) {
            // 内层循环负责每轮的第(i+1)次处理
            for (int j = 0; j < len - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }

            // 循环打印每一轮的数量
            System.out.println("\n第"+ (i+1)+"轮处理的数组: ");
            for (int j = 0; j <arr.length; j++) {
                System.out.print(arr[j] + "\t");
            }
        }

        System.out.println();
        System.out.println("新序列: " + Arrays.toString(arr));

    }


    /**
    * 用于测试: 冒泡排序第二种写法
     *
         原始数据：
         3,2,7,6,8

          第1次循环：(最大的跑到最右边)

          2,3,7,6,8 (3和2比较，2<3，所以2和3交换位置)
          2,3,7,6,8 (虽然不需要交换位匿：但是3和7还是需要比较一次。)
          2,3,6,7,8 (76交换位匿)
          2,3,6,7,8 (虽然不需要交换位置：但是3机还是需要比较-次。)

         经过第1次循环，此时菊剩下参与比较的数据：2,3,6,7进行第2次循环：
         2,3,6,7 (2和3比较，不需要交换位置)
         2,3,6,7 (36比较， 不需要交换位置)
         2,3,6,7 (67比较， 不需要交换位置)

         经过第2次循环，此时剩下参与比较的数据：2,3,6进行第3次循环：

         2,3,6(2和3比较，不需要交换位置)
         2,3,6(36比较，不需要交换位置)

         经过第3次循环，此时剩下参与比较的数据：2,3进行第4次循环：

        2,3(2和3比较，不需要交换位置)
    */
    @Test
    public void testBubbleSort02()
    {
        int[] arr = {6, 8,3,2,7, 23,  20};

        int temp = 0;

        int len = arr.length - 1;


        // 外层循环负责总轮数
        for (int i = len; i >0; i--) {
            // 内层循环负责每轮的第(i+1)次处理
            for (int j = 0; j < i; j++) {
                if (arr[j] > arr[j + 1]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }

            // 循环打印每一轮的数量
            System.out.println("\n第"+ (i)+"轮处理的数组: ");
            for (int j = 0; j <arr.length; j++) {
                System.out.print(arr[j] + "\t");
            }
        }

        System.out.println();
        System.out.println("新序列: " + Arrays.toString(arr));
    }

}
```



### 6.3 选择排序

选择排序对冒泡排序进行了改进，使交换次数减少，但比较次数仍然没有减少。

假设有 5 个数字 3，1，6，2，5 在一个 int 数组中，要求按从小到大排序输出

采用选择排序，选择排序是这样的，先从左端开始，找到下标为 0 的元素，然后和后面的元素 依次比较，如果找到了比下标 0 小的元素，那么再使用此元素，再接着依次比较，直到比较完 成所有的元素，最后把最小的和第 0 个位置交换。

以上示例排序过程如下：

下面以数列{20,40,30,10,60,50}为例，演示它的选择排序过程(如下图)。

![img](https://pdai.tech/images/alg/alg-sort-select-1.jpg)

排序流程

- 第1趟: i=0。找出a[1...5]中的最小值a[3]=10，然后将a[0]和a[3]互换。 数列变化: 20,40,30,10,60,50 -- > 10,40,30,20,60,50
- 第2趟: i=1。找出a[2...5]中的最小值a[3]=20，然后将a[1]和a[3]互换。 数列变化: 10,40,30,20,60,50 -- > 10,20,30,40,60,50
- 第3趟: i=2。找出a[3...5]中的最小值，由于该最小值大于a[2]，该趟不做任何处理。
- 第4趟: i=3。找出a[4...5]中的最小值，由于该最小值大于a[3]，该趟不做任何处理。
- 第5趟: i=4。交换a[4]和a[5]的数据。 数列变化: 10,20,30,40,60,50 -- > 10,20,30,40,50,60



#### 空间复杂度

选择排序的时间复杂度是O(N2)。

假设被排序的数列中有N个数。遍历一趟的时间复杂度是O(N)，需要遍历多少次呢? N-1！因此，选择排序的时间复杂度是O(N2)



#### 稳定性

- **回顾：什么是排序算法的稳定性**？

假定在待排序的记录序列中，存在多个具有相同的关键字的记录，若经过排序，这些记录的相对次序保持不变，即在原序列中，r[i]=r[j]，且r[i]在r[j]之前，而在排序后的序列中，r[i]仍在r[j]之前，则称这种排序算法是稳定的；否则称为不稳定的。

- **数组实现和链表实现的差异**

用数组实现的选择排序是不稳定的，用链表实现的选择排序是稳定的。

不过，一般提到排序算法时，大家往往会默认是数组实现，所以选择排序是不稳定的。

- **此外，排序算法的稳定性也是可以改变的，只是需要额外的时间和空间**



#### 代码示例

```java
package com.Leo.array.Leo01.sort;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/9/26/026 11:34
 * @description : 选择排序
 * <p>
 * 选择排序比目泡排序的效率高。高在交换位置的次数上。
 * 选择排序的交换位置是有意义的。
 * 循环一次，然后找出参加比较的这堆数据中最小的，拿着这个最小的值和最前面的数据交换位置。
 */
public class ArraySelectSort {

    /**
     * 用于测试: 选择排序基本写法
     */
    @Test
    public void testSelectSort01() {

        int[] arr = {73, 88, 41, 23, 93, 14, 25, 3,10, 4, 2,1};

        int temp = 0;


        for (int i = 0; i < arr.length - 1; i++) {
            // 假设i是最小的
            int min = i;
            // i正好是参加比较的这堆数据中”最左边那个元奉的下标。
            // 第二层循环指的是除了第一层的所有元素，最后剩下的元素中 最小的那个元素
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[min]) {
                    // 最小的是J ，并将其与后面所有元素进行交换
                    min = j;
                }
                if (min != i){
                    temp = arr[min];
                    arr[min] = arr[i];
                    arr[i] = temp;
                }
            }
        }
        System.out.println(Arrays.toString(arr));
    }

}
```

### 6.4 二分法查找

#### 二分法介绍

查找数组中的元素我们可以遍历数组中的所有元素，这种方式称为线性查找。线性查找适合与 小型数组，大型数组效率太低。如果一个数组已经排好序，那么我们可以采用效率比较高的**二分查找**或叫**折半查找算法**。

![image-20231009150207060](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091502170.png)



#### 代码示例

```java
package com.Leo.array.Leo01.sort;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/10/9/009 15:02
 * @description : 二分法查找
 */
public class BinarySearch {
    public static void main(String[] args) {
        int[] data = {11,12,13,14,15,16,17,18,19,20};
        int index = binarySearch(data, 18);
        System.out.println(index);
    }

    //采用折半法查询，必须建立在排序的基础上 
    private static int binarySearch(int[] data, int value) {
        //开始下标 
        int beginPos = 0;
        //结束下标 
        int endPos = data.length - 1;

        while (beginPos <=endPos) {
            int midPos = (beginPos + endPos)/2;
            if (value == data[midPos]) {
                return midPos;
            }else if (value > data[midPos]) {
                beginPos = midPos + 1;
            }else if (value < data[midPos]) {
                endPos = midPos - 1;
            }
        }
        return -1;
    }
}
```



## 7. 多维数组

多维数组我们只介绍二维数组。

**二维数组的应用场景**

比如我们开发一个五子棋游戏，棋盘就是需要二维数组来表示。如图：

![image-20231009150512831](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091505911.png)



### 7.1 二维数组的使用

#### 1. 快速入门

> TwoDimensionalArray01.java
>
> 请用二维数组输出如下图形
>
> 0 0 0 0 0 0
>
> 0 0 1 0 0 0
>
> 0 2 0 3 0 0
>
> 0 0 0 0 0 0

```java
package com.Leo.array.Leo01.two;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/10/9/009 15:06
 * @description : 认识二维数组
 */
public class TwoDimensionalArray01 {


    //编写一个main方法
    public static void main(String[] args) {

		/*
		请用二维数组输出如下图形
			0 0 0 0 0 0
			0 0 1 0 0 0
			0 2 0 3 0 0
			0 0 0 0 0 0
		 */

        //什么是二维数组：
        //1. 从定义形式上看 int[][]
        //2. 可以这样理解，原来的一维数组的每个元素是一维数组, 就构成二维数组
        int[][] arr = { {0, 0, 0, 0, 0, 0},
                {0, 0, 1, 0, 0, 0},
                {0,2,  0, 3, 0, 0},
                {0, 0, 0, 0, 0, 0} };

        //关于二维数组的关键概念
        //(1)
        System.out.println("二维数组的元素个数=" + arr.length);
        //(2) 二维数组的每个元素是一维数组, 所以如果需要得到每个一维数组的值
        //    还需要再次遍历
        //(3) 如果我们要访问第 (i+1)个一维数组的第j+1个值 arr[i][j];
        //    举例 访问 3, =》 他是第3个一维数组的第4个值 arr[2][3]
        
        System.out.println("第3个一维数组的第4个值=" + arr[2][3]); 


        //输出二维图形
        for(int i = 0; i < arr.length; i++) {
            //遍历二维数组的每个元素
            //遍历二维数组的每个元素(数组)
            //1. arr[i] 表示 二维数组的第i+1个元素 比如arr[0]：二维数组的第一个元素
            //2. arr[i].length 得到 对应的 每个一维数组的长度
            for(int j = 0; j < arr[i].length; j++) {
                //输出了一维数组
                System.out.print(arr[i][j] + " ");
            }
            System.out.println();
        }
    }
}

```



### 7.2 二维数组的使用细节

1. 一维数组的声明方式有:

   int[] x或者int x[]

2. 二维数组的声明方式有:

   int[][] y**或者**int[] y[] **或者**int y[][]

[//]: # (3. 二维数组实际上是由多个一维数组组成的，它的各个一维数组的长度可以相同，也可以不相同。比如：map[][]是)

[//]: # ()
[//]: # (   一个二维数组)

[//]: # ()
[//]: # (   int map [][] = {{1,2},{3,4,5}})

[//]: # ()
[//]: # (   由map[0]是一个含有两个元素的一维数组，map[1]是一个含有三个元素的一维数组构成，我们也称为列数不等)

[//]: # ()
[//]: # (   的二维数组。)



## 8. 数组练习

#### 1. 第一题

随机生成10个整数(1100的范围)保存到数组，并倒序打印以及求平均值、求最大值和最大值的下标、并查找里面是否有8

```java
package com.Leo.array.Leo01.homework;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/10/9/009 15:11
 * @description :
 */
public class HomeWork01 {
        

            //编写一个main方法
            public static void main(String[] args) {
		
		/*
            随机生成10个整数(1_100的范围)保存到数组，
            并倒序打印以及求平均值、求最大值和最大值的下标、
            并查找里面是否有 8  Homework01.java
		 */

                int[] arr = new int[10];
                //(int)(Math.random() * 100) + 1 生产 随机数 1-100

                for(int i = 0; i < arr.length; i++) {
                    arr[i] = (int)(Math.random() * 100) + 1;
                }

                System.out.println("====arr的元素情况=====");
                for(int i = 0; i < arr.length; i++) {
                    System.out.print(arr[i] + "\t");
                }

                System.out.println("\n====arr的元素情况(倒序)=====");
                for(int i = arr.length -1; i >= 0; i--) {
                    System.out.print(arr[i] + "\t");
                }

                //平均值、求最大值和最大值的下标
                //我们这里将需要一起完成
                //
                double sum = arr[0];
                int max = arr[0];
                int maxIndex = 0;
                for(int i = 1; i < arr.length; i++ ) {

                    sum += arr[i]; 
                    //累积和

                    if( max < arr[i]) {
                        //说明max不是最大值，就变化
                        max = arr[i];
                        maxIndex = i;
                    }
                }

                System.out.println("\nmax=" + max + " maxIndex=" + maxIndex);
                System.out.println("\n平均值=" + (sum / arr.length));


                //查找数组中是否有8->使用顺序查找
                int findNum = 8;
                int index = -1; 
                //如果找到，就把下标记录到 index
                for(int i = 0; i < arr.length; i++) {
                    if(findNum == arr[i]) {
                        System.out.println("找到数" + findNum + " 下标=" + i);
                        index = i;
                        break;
                    }
                }

                if(index == -1) {
                    System.out.println("没有找到数" + findNum );
                }
            }
}
```



## 9. 参考文章

- https://zh.wikipedia.org/wiki/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95
- https://blog.51cto.com/u_16175522/6812404
- https://developer.aliyun.com/article/1137886
- https://pdai.tech/md/algorithm/alg-sort-x-bubble.html#%E6%8E%92%E5%BA%8F-%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F-bubble-sort
- https://oi-wiki.org/basic/sort-intro/

![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)