import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as n,b as s,d as t,e as p}from"./app-cc68b47f.js";const l={},u=p(`<blockquote><p>大家好，我是Leo🫣🫣🫣，最近在复习Java基础内容，这个专栏后续也会一直更新下去，Java基础乃是咱</p><p>们Java的根基，俗话说，基础不牢，地动山摇。今天我们主要学习Java数组相关知识，话不多说，</p><p>让我们开始吧😎😎😎。</p></blockquote><p>在开始之前，先通过一张图来了解一下我们今天要学习的数组的主要大纲吧</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091319817.png" alt="image-20231009131946655" tabindex="0" loading="lazy"><figcaption>image-20231009131946655</figcaption></figure><h2 id="_1-数组的概述" tabindex="-1"><a class="header-anchor" href="#_1-数组的概述" aria-hidden="true">#</a> 1. 数组的概述</h2><h3 id="_1-1-为什么需要数组" tabindex="-1"><a class="header-anchor" href="#_1-1-为什么需要数组" aria-hidden="true">#</a> 1.1 为什么需要数组</h3><p>我们下面先看一个简单的例子</p><p>一个<strong>养鸡场有</strong> 6 <strong>只鸡</strong>，它们的体重分别是 3kg,5kg,1kg,3.4kg,2kg,50kg 。请问这六只鸡的总体重是多少?平 均体重是多少? 请你编一个程序。</p><p><strong>思路：</strong> 定义 6个变量, 加起来 总体重， 求出平均体重 引出 -&gt; 数组</p><div class="language-JAVA line-numbers-mode" data-ext="JAVA"><pre class="language-JAVA"><code>package com.Leo.array.Leo01.exer;


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
        // System.out.println(&quot;总体重=&quot; + totalWeight
        // + &quot;平均体重=&quot; + avgWeight);
        //比如，我们可以用数组来解决上一个问题 =&gt; 体验


        //1. double[] 表示 是 double 类型的数组， 数组名 hens
        //2. {3, 5, 1, 3.4, 2, 50} 表示数组的值/元素,依次表示数组的

        double[] hens = {3, 5, 1, 3.4, 2, 50, 7.8, 88.8,1.1,5.6,100};
        //遍历数组得到数组的所有元素的和， 使用 for循环来得到

        //1. 我们可以通过 hens[下标] 来访问数组的元素

        // 下标是从 0 开始编号的比如第一个元素就是 hens[0]
        // 第 2 个元素就是 hens[1] , 依次类推

        //2. 通过 for 就可以循环的访问 数组的元素/值

        //3. 使用一个变量 totalWeight 将各个元素累积

        System.out.println(&quot;===使用数组解决===&quot;);
        double totalWeight = 0;
        for( int i = 0; i &lt; hens.length; i++) {
            totalWeight += hens[i];
        }
        System.out.println(&quot;总体重=&quot; + totalWeight + &quot;平均体重=&quot; + (totalWeight / hens.length) );

    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-什么是数组" tabindex="-1"><a class="header-anchor" href="#_1-2-什么是数组" aria-hidden="true">#</a> 1.2 什么是数组</h3><hr>`,11),r=n("strong",null,"阵列资料结构",-1),d=n("strong",null,"数组",-1),k={href:"https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84",target:"_blank",rel:"noopener noreferrer"},v=p(`<p>最简单的资料结构类型是 <strong>一维阵列</strong>。例如，索引为0到9的32位元整数阵列，可作为在记忆体位址2000，2004，2008，...2036中，储存10个变量，因此索引为i的元素即在记忆体中的2000+4×i位址。阵列第一个元素的记忆体位址称为第一位址或基础位址。</p><p><strong>简单来说数组的定义：</strong></p><p>数组（array）是一种最简单的复合数据类型，它是有序数据的集合，数组中的每个元素具有相同的数据类型，可以用一个统一的数组名和不同的下标来确定数组中唯一的元素。根据数组的维度，可以将其分为一维数组、二维数组和多维数组等。</p><h3 id="_1-4-简述数组特性" tabindex="-1"><a class="header-anchor" href="#_1-4-简述数组特性" aria-hidden="true">#</a> 1.4 简述数组特性</h3><p><strong>数组的特点：</strong></p><ol><li>数组是一组数据的集合。</li><li><strong>数组作为一种引用类型。</strong></li><li><strong>长度固定</strong>：Array 的长度在创建时就已经确定，并且不能被修改，但是可以指向其他数组。</li><li><strong>同类型元素</strong>：Array 中的所有元素必须是同一种类型（对象类型存储的是引用）。</li><li><strong>内存连续</strong>：Array 存储在连续的内存位置。</li><li><strong>下标从 0 开始</strong>：Array 中的元素是通过下标来访问的，下标从 0 开始，最大下标为长度减 1,如果数组有 <strong>n</strong> 个元素，那么数组的索引是从 0 到（n-1）。</li><li>给定数组下标访问下标对应的元素时，的时间复杂度为 1。</li><li>Array 是 Java 中的对象，因此可以使用对象属性 <code>lenght</code> 获取到 Array 的长度。</li><li>Java 中 Array 都实现了 <code>Cloneable</code> 和 <code>java.io.Serializable</code> 接口。</li><li>数组可以是<strong>一维数组</strong>、<strong>二维数组</strong>或<strong>多维数组</strong>。</li><li>数值数组元素的默认值为 0，而引用元素的默认值为 null。</li><li>数组元素可以是任何类型，包括数组类型。</li><li>数组类型是从抽象基类 Array 派生的引用类型。</li></ol><p><strong>数组的分类：</strong></p><ul><li>按照维度：<strong>一维数组</strong>、<strong>二维数组</strong>、<strong>三维数组</strong>、…</li><li>按照元素的数据类型分：基本数据类型元素的数组、引用数据类型元素的数组(即对象数组)</li></ul><p>Java中数组是一种用来存储多个数据项的数据结构。数组可以存储基本类型和对象类型的数据，使用时需要先声明数组类型以及数组长度，如下所示</p><h2 id="_2-数组的使用" tabindex="-1"><a class="header-anchor" href="#_2-数组的使用" aria-hidden="true">#</a> 2. 数组的使用</h2><h3 id="_2-1-数组的声明" tabindex="-1"><a class="header-anchor" href="#_2-1-数组的声明" aria-hidden="true">#</a> 2.1 数组的声明</h3><p><strong>数组的定义</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>数据类型<span class="token punctuation">[</span><span class="token punctuation">]</span> 数组名  <span class="token keyword">new</span> 数据类型<span class="token punctuation">[</span>大小<span class="token punctuation">]</span>
<span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
创建了一个数组，名字为a ，存放了<span class="token number">5</span>个<span class="token keyword">int</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>说明：这是定义数组的一种方法。为了让大家明白，我画了一个数组内存图说明</strong></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091333275.png" alt="image-20231009133318210" tabindex="0" loading="lazy"><figcaption>image-20231009133318210</figcaption></figure><h3 id="_2-2-数组的创建" tabindex="-1"><a class="header-anchor" href="#_2-2-数组的创建" aria-hidden="true">#</a> 2.2 数组的创建</h3><h4 id="_1-使用方式一-动态初始化" tabindex="-1"><a class="header-anchor" href="#_1-使用方式一-动态初始化" aria-hidden="true">#</a> 1. 使用方式一：动态初始化</h4><p><strong>先声明数组</strong></p><p><strong>语法</strong>:数据类型 数组名[];</p><p>也可以 数据类型[] 数组名; int a[]; 或者 int[] a;</p><p><strong>创建数组</strong></p><p><strong>语法</strong>: 数组名=new 数据类型[大小];</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>a = new int[5];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-3-数组的使用和注意事项" tabindex="-1"><a class="header-anchor" href="#_2-3-数组的使用和注意事项" aria-hidden="true">#</a> 2.3 数组的使用和注意事项</h3><ol><li><p>数组是多个相同类型数据的组合，实现对这些数据的统一管理。</p></li><li><p>数组中的元素可以是任何数据类型，包括基本类型和引用类型，但是不能混用。</p></li><li><p>数组创建后，如果没有赋值，有默认值</p><blockquote><p>int 0，short 0, byte 0, long 0, float 0.0,double 0.0，char \\u0000，boolean false，String null</p></blockquote></li><li><p>使用数组的步骤 1. 声明数组并开辟空间 2 给数组各个元素赋值 3 使用数组</p></li><li><p>数组的<strong>下标是从</strong> 0 <strong>开始的</strong>。</p></li><li><p>数组下标必须在指定范围内使用，否则报：下标越界异常，比如</p></li></ol><blockquote><p>int [] arr=new int[5]; 则有效下标为 0-4</p></blockquote><ol start="7"><li>数组属引用类型，数组型数据是对象(object)</li></ol><h2 id="_4-数组使用案例" tabindex="-1"><a class="header-anchor" href="#_4-数组使用案例" aria-hidden="true">#</a> 4. 数组使用案例</h2><h3 id="_4-1-案例1" tabindex="-1"><a class="header-anchor" href="#_4-1-案例1" aria-hidden="true">#</a> 4.1 案例1</h3><p>创建一个 char 类型的 26 个元素的数组，分别 放置&#39;A&#39;-&#39;Z&#39;。使用 for 循环访问所有元素并打印出来。提示：char 类型 数据运算 &#39;A&#39;+2 -&gt; &#39;C&#39;</p><div class="language-JAVA line-numbers-mode" data-ext="JAVA"><pre class="language-JAVA"><code>package com.Leo.array.Leo01.exer;



/**
 * @author : Leo
 * @version 1.0
 * @date 2023/9/24/024 11:06
 * @description : 数组案例1
 *
 * 创建一个 char 类型的 26 个元素的数组，分别 放置&#39;A&#39;-&#39;Z&#39;。
 * 使用 for 循环访问所有元素并打印出来。
 * 提示：char 类型数据运算 &#39;A&#39;+1 -&gt; &#39;B&#39;
 */
public class ArrayCase01
{

    public static void main(String[] args)
    {

        char[] chars = new char[26];

        for (int i = 0; i &lt;chars.length; i++) {
            chars[i]  = (char) (&#39;A&#39; + i);
            System.out.print(chars[i] + &quot; &quot;);
        }

        System.out.println(&quot;初始化的字符数组:  &quot; + new String(chars));
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-案例2" tabindex="-1"><a class="header-anchor" href="#_4-2-案例2" aria-hidden="true">#</a> 4.2 案例2</h3><p>请求出一个数组 int[]的最大值 {4,-1,9, 10,23}，并得到对应的下标。</p><div class="language-JAVA line-numbers-mode" data-ext="JAVA"><pre class="language-JAVA"><code>package com.Leo.array.Leo01.exer;


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
    // 2.从下标 1 开始遍历 arr， 如果 max &lt; 当前元素，说明 max 不是真正的
   //  最大值, 我们就 max=当前元素; maxIndex=当前元素下标
  //   3. 当我们遍历这个数组 arr 后 , max 就是真正的最大值，maxIndex 最大值
    
    public static void main(String[] args)
    {

        int[] array = {4,-1,9, 10,23};

        //假定第一个元素就是最大值
        int max = array[0];
        int maxIndex = 0;

        for (int i = 0; i &lt; array.length; i++)
        {
            if (max &lt; array[i])
            {
                max = array[i];
                maxIndex = i;
            }
        }
        System.out.println(&quot;数组最大值为: &quot; + max + &quot; , &quot;+&quot;最大值下标为:&quot; + maxIndex);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-数组进阶" tabindex="-1"><a class="header-anchor" href="#_5-数组进阶" aria-hidden="true">#</a> 5. 数组进阶</h2><h3 id="_5-1-数组的赋值机制" tabindex="-1"><a class="header-anchor" href="#_5-1-数组的赋值机制" aria-hidden="true">#</a> 5.1 数组的赋值机制</h3><ol><li><p>基本数据类型赋值，这个值就是具体的数据，而且相互不影响。</p><blockquote><p>int n1 = 2; int n2 = n1;</p></blockquote></li><li><p>数组在默认情况下是引用传递，赋的值是地址。</p></li></ol><p>看一个案例，并分析数组赋值的内存图(重点,难点. )。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//代码ArrayAssign.java</span>

<span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr2 <span class="token operator">=</span> arr1<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>用韩顺平老师的图来讲解以下。</strong></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091413124.png" alt="image-20231009141326983" tabindex="0" loading="lazy"><figcaption>image-20231009141326983</figcaption></figure><p><strong>这里的arr1和arr2相当于栈，而数组中的数据{1,2，3}就相当于与内存中的堆，arr1[]是指向{1,2，3}这个堆的，所以可以访问，当把arr1赋值给arr2时，arr2就具有了和arr1一样的访问权，因此对arr2的数据更改，会影响到arr1的数据。</strong></p><p><strong>如果还有人听不懂，那我就再举个很简单的例子，我们都玩过“我的世界”这款游戏。比如你和你的朋友一起玩，你的朋友做了一把木剑，放在了他自己的背包里，他又做了一个相同的木剑给了你，你们都有了木剑（这就相当于简单地值拷贝）。现在有一个箱子，你朋友做了一把木剑放在了箱子里，你觉得木剑太垃圾了，把木剑换成了钻石剑放在了箱子里，你朋友打开箱子发现木剑变成了钻石剑（这就是引用赋值）</strong></p><p>我想到这里应该讲的也挺清楚的了，数组的赋值引用，变得是地址罢了。希望能够帮助到小伙伴们！！</p><h3 id="_5-2-数组拷贝" tabindex="-1"><a class="header-anchor" href="#_5-2-数组拷贝" aria-hidden="true">#</a> 5.2 数组拷贝</h3><p>编写代码实现数组拷贝(内容复制) ArrayCopy.java</p><p>将int[] arr1 = {10,20,30};拷贝到arr2数组,要求数据空间是独立的.</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span></span><span class="token class-name">Leo</span><span class="token punctuation">.</span>array<span class="token punctuation">.</span>Leo01<span class="token punctuation">.</span>exer<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : Leo
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/10/9/009 14:21
 * <span class="token keyword">@description</span> :
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArrayCopy</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//将 int[] arr1 = {10,20,30};拷贝到 arr2数组,//要求数据空间是独立的.</span>

        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token comment">//创建一个新的数组 arr2,开辟新的数据空间  大小 arr1.length;</span>

        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>arr1<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token comment">//遍历 arr1，把每个元素拷贝到 arr2对应的元素位置</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr1<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            arr2<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>


        <span class="token comment">//修改 arr2，不会对 arr1有影响</span>
        arr2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>

        <span class="token comment">//输出 arr1</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;====arr1的元素====&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr1<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>arr1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;====arr2的元素====&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr2<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>arr2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结果：</strong></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091424192.png" alt="image-20231009142441125" tabindex="0" loading="lazy"><figcaption>image-20231009142441125</figcaption></figure><h3 id="_5-3-数组反转" tabindex="-1"><a class="header-anchor" href="#_5-3-数组反转" aria-hidden="true">#</a> 5.3 数组反转</h3><h4 id="_1-方式1-通过找规律反转" tabindex="-1"><a class="header-anchor" href="#_1-方式1-通过找规律反转" aria-hidden="true">#</a> 1. 方式1：通过找规律反转</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span></span><span class="token class-name">Leo</span><span class="token punctuation">.</span>array<span class="token punctuation">.</span>Leo01<span class="token punctuation">;</span>


<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Arrays</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : Leo
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/9/24/024 11:06
 * <span class="token keyword">@description</span> : 数组案例2  数组反转
 *
 *
 * 要求: 把数组的元素内容反转。
 * arr <span class="token punctuation">{</span>11,22,33,44,55,66<span class="token punctuation">}</span> <span class="token punctuation">{</span>66, 55,44,33,22,11<span class="token punctuation">}</span>
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArrayReverse01</span>
<span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 把数组的元素内容反转</span>

        <span class="token comment">// 使用交换的方式</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">44</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">,</span> <span class="token number">66</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> temp<span class="token punctuation">;</span>
        <span class="token keyword">int</span> len <span class="token operator">=</span> arr1<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token comment">// 先遍历所有的元素</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 模拟交换数组中的两个元素</span>
            temp <span class="token operator">=</span> arr1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr1<span class="token punctuation">[</span>len<span class="token operator">-</span><span class="token number">1</span><span class="token operator">-</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr1<span class="token punctuation">[</span>len <span class="token operator">-</span> i <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 打印新数组</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;反转后的数组: &quot;</span><span class="token operator">+</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arr1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-方式2-使用逆序赋值方式-arrayreverse02-java" tabindex="-1"><a class="header-anchor" href="#_2-方式2-使用逆序赋值方式-arrayreverse02-java" aria-hidden="true">#</a> 2. 方式2：使用逆序赋值方式 ArrayReverse02.java</h4><p><strong>思路分析：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>          <span class="token comment">//使用逆序赋值方式</span>
          <span class="token comment">//1.先创建一个新的数组arr2 ,大小arr.length</span>
          <span class="token comment">//2.逆序遍历arr ,将每个元素拷贝到arr2的元素中(顺序拷贝)</span>
          <span class="token comment">//3.建议增加一个循环变量j -&gt; 0 -&gt; 5</span>
          <span class="token comment">// int[] arr2 = new int[arr.length];</span>
          <span class="token comment">//逆序遍历arr </span>
          <span class="token comment">//4.当for循环结束，arr2就是一个逆序的数组{66, 55, 44,33, 22, 11}</span>
          <span class="token comment">//5.让arr指向arr2数据空间,此时arr原来的数据空间就没有变量引用</span>
          <span class="token comment">//会被当做垃圾，销毁</span>
          arr <span class="token operator">=</span> arr2<span class="token punctuation">;</span>
				<span class="token comment">// 第二种方式:</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">44</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">,</span> <span class="token number">66</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arrReverse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">,</span> j<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            arrReverse<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 对arrReverse进行销毁</span>
        <span class="token comment">// arr = arrReverse;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;反转之后的数组2:&quot;</span> <span class="token operator">+</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arrReverse<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;===========================================&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 第二种方式: 创建一个新的数组并上移</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arrReverseNew <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> j <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">,</span> j<span class="token operator">--</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            arrReverseNew<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;反转之后的数组: &quot;</span><span class="token operator">+</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arrReverseNew<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;=============================================&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-方式3-创建一个新的数组并下移" tabindex="-1"><a class="header-anchor" href="#_3-方式3-创建一个新的数组并下移" aria-hidden="true">#</a> 3. 方式3： 创建一个新的数组并下移</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>		<span class="token comment">// 第三种方式 - 创建一个新的数组并下移</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arrReverseNew2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">,</span> j<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            arrReverseNew2<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;反转之后的数组: &quot;</span><span class="token operator">+</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arrReverseNew2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">// 第四种方式: 要求在下移之后还原数组元素的相对顺序</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arrReverseNew3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> right <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>

            arrReverseNew3<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">;</span>
            left<span class="token operator">++</span><span class="token punctuation">;</span>
            right<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>


        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;=============================================&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-要求在下移之后还原数组元素的相对顺序" tabindex="-1"><a class="header-anchor" href="#_4-要求在下移之后还原数组元素的相对顺序" aria-hidden="true">#</a> 4. 要求在下移之后还原数组元素的相对顺序</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>			<span class="token comment">// 第四种方式: 要求在下移之后还原数组元素的相对顺序</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arrReverseNew3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> right <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>

            arrReverseNew3<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">;</span>
            left<span class="token operator">++</span><span class="token punctuation">;</span>
            right<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;=============================================&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-数组的扩容机制" tabindex="-1"><a class="header-anchor" href="#_5-4-数组的扩容机制" aria-hidden="true">#</a> 5.4 数组的扩容机制</h3><h4 id="_1-介绍" tabindex="-1"><a class="header-anchor" href="#_1-介绍" aria-hidden="true">#</a> 1. 介绍</h4><p>在Java中，数组是一种固定长度的数据结构，一旦创建后，其长度无法改变。然而，在实际开发中，经常会遇到需要动态扩容数组的情况。为了解决这个问题，Java提供了一种机制来实现数组的动态扩容，即通过创建一个更大的新数组，然后将原有数组的元素复制到新数组中。</p><p>本文将介绍Java数组扩容的机制及其具体实现步骤。</p><h4 id="_2-实现步骤" tabindex="-1"><a class="header-anchor" href="#_2-实现步骤" aria-hidden="true">#</a> 2. 实现步骤</h4><table><thead><tr><th>步骤</th><th>描述</th></tr></thead><tbody><tr><td>1</td><td>创建一个新的数组</td></tr><tr><td>2</td><td>将原有数组的元素复制到新数组中</td></tr><tr><td>3</td><td>更新引用，将新数组赋值给原有数组</td></tr></tbody></table><p>下面将分别介绍每个步骤需要做的具体操作。</p><h5 id="_2-1-创建一个新的数组" tabindex="-1"><a class="header-anchor" href="#_2-1-创建一个新的数组" aria-hidden="true">#</a> 2.1 创建一个新的数组</h5><p>首先，我们需要创建一个新的数组，用于存放扩容后的元素。根据需要扩容的大小，我们可以使用<code>new</code>关键字创建一个新的数组对象，并指定新数组的长度。例如：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">int</span> newSize <span class="token operator">=</span> oldSize <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 假设需要将数组扩容为原大小的两倍</span>
<span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> newArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>newSize<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-2-将原有数组的元素复制到新数组中" tabindex="-1"><a class="header-anchor" href="#_2-2-将原有数组的元素复制到新数组中" aria-hidden="true">#</a> 2.2 将原有数组的元素复制到新数组中</h5><p>接下来，我们需要将原有数组的元素复制到新数组中。Java提供了<code>System.arraycopy()</code>方法来进行数组复制操作。该方法需要传入源数组、源数组的起始位置、目标数组、目标数组的起始位置以及要复制的元素数量。代码示例如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>oldArray<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> newArray<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> oldSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_2-3-更新引用-将新数组赋值给原有数组" tabindex="-1"><a class="header-anchor" href="#_2-3-更新引用-将新数组赋值给原有数组" aria-hidden="true">#</a> 2.3 更新引用，将新数组赋值给原有数组</h5><p>最后，我们需要更新引用，将新数组赋值给原有数组。这样，原有数组的引用就指向了新的扩容后的数组，从而完成了数组的扩容操作。代码示例如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>oldArray <span class="token operator">=</span> newArray<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-示例代码1" tabindex="-1"><a class="header-anchor" href="#_3-示例代码1" aria-hidden="true">#</a> 3.示例代码1</h4><p>下面是一个完整的示例代码，演示了如何实现Java数组的扩容机制：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArrayResizeExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> oldArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 原始数组的大小为5</span>
        <span class="token keyword">int</span> oldSize <span class="token operator">=</span> oldArray<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">int</span> newSize <span class="token operator">=</span> oldSize <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 扩容为原大小的两倍</span>

        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> newArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>newSize<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 创建一个新的数组</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>oldArray<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> newArray<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> oldSize<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 复制原数组的元素到新数组中</span>

        oldArray <span class="token operator">=</span> newArray<span class="token punctuation">;</span> <span class="token comment">// 更新引用，将新数组赋值给原数组</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;原始数组大小：&quot;</span> <span class="token operator">+</span> oldSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;扩容后数组大小：&quot;</span> <span class="token operator">+</span> oldArray<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行以上代码，输出结果如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>原始数组大小：<span class="token number">5</span>
扩容后数组大小：<span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过以上示例，我们可以看到原始数组的大小为5，扩容后数组的大小为10，成功实现了数组的扩容操作。</p><h4 id="_3-示例代码2" tabindex="-1"><a class="header-anchor" href="#_3-示例代码2" aria-hidden="true">#</a> 3.示例代码2</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span></span><span class="token class-name">Leo</span><span class="token punctuation">.</span>array<span class="token punctuation">.</span>Leo01<span class="token punctuation">.</span>exer<span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : Leo
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/10/09/024 11:06
 * <span class="token keyword">@description</span> : 数组拷贝
       要求：实现动态的给数组添加元素效果，实现对数组扩容。ArrayAdd.java
      
      1. 原始数组使用静态分配int[] arr = <span class="token punctuation">{</span>1,2,3<span class="token punctuation">}</span>
      2. 增加的元素4，直接放在数组的最后arr = <span class="token punctuation">{</span>1,2,3,4<span class="token punctuation">}</span>
      3. 用户可以通过如下方法来决定是否继续添加，添加成功，是否继续？y/n
 *
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArrayAdd02</span> <span class="token punctuation">{</span> 

	<span class="token comment">//编写一个main方法</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">/*
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
		 */</span>
		
		<span class="token class-name">Scanner</span> myScanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//初始化数组</span>
		<span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

		<span class="token keyword">do</span> <span class="token punctuation">{</span>
			<span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arrNew <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>arr<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
			<span class="token comment">//遍历 arr 数组，依次将arr的元素拷贝到 arrNew数组</span>
			<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				arrNew<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;请输入你要添加的元素&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">int</span> addNum <span class="token operator">=</span> myScanner<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">//把addNum赋给arrNew最后一个元素</span>
			arrNew<span class="token punctuation">[</span>arrNew<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> addNum<span class="token punctuation">;</span>
			<span class="token comment">//让 arr 指向 arrNew, </span>
			arr <span class="token operator">=</span> arrNew<span class="token punctuation">;</span>
			<span class="token comment">//输出arr 看看效果</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;====arr扩容后元素情况====&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;\\t&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token comment">//问用户是否继续</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;是否继续添加 y/n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">char</span> key <span class="token operator">=</span> myScanner<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span> key <span class="token operator">==</span> <span class="token char">&#39;n&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
				<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>			
		<span class="token punctuation">}</span><span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;你退出了添加...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-数组的排序与查找" tabindex="-1"><a class="header-anchor" href="#_6-数组的排序与查找" aria-hidden="true">#</a> 6. 数组的排序与查找</h2><h3 id="_6-1-排序的介绍" tabindex="-1"><a class="header-anchor" href="#_6-1-排序的介绍" aria-hidden="true">#</a> 6.1 排序的介绍</h3><p>排序是将多个数据，依指定的顺序进行排列的过程。</p><p><strong>1. 定义</strong></p><p><strong>排序算法</strong>（英语：Sorting algorithm）是一种将一组特定的数据按某种顺序进行排列的算法。排序算法多种多样，性质也大多不同。</p><p><strong>2.稳定性</strong></p><p>稳定性是指相等的元素经过排序之后相对顺序是否发生了改变。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091447662.png" alt="image-20231009144740597" tabindex="0" loading="lazy"><figcaption>image-20231009144740597</figcaption></figure><p>基数排序、计数排序、插入排序、冒泡排序、归并排序是稳定排序。</p><p>选择排序、堆排序、快速排序、希尔排序不是稳定排序。</p><p><strong>3.时间复杂度</strong></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091448007.png" alt="image-20231009144809928" tabindex="0" loading="lazy"><figcaption>image-20231009144809928</figcaption></figure><p>以下是几种排序算法的比较。</p><figure><img src="https://oi-wiki.org/basic/images/sort-intro-1.apng" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>4.空间复杂度</strong></p><p>与时间复杂度类似，空间复杂度用来描述算法空间消耗的规模。一般来说，空间复杂度越小，算法越好。</p><h4 id="_1-内部排序" tabindex="-1"><a class="header-anchor" href="#_1-内部排序" aria-hidden="true">#</a> 1. 内部排序</h4><p>指将需要处理的所有数据都加载到内部存储器中进行排序。包括(<strong>交换式排序法、选择式排序法和插入式排序法</strong>)。</p><h4 id="_2-外部排序" tabindex="-1"><a class="header-anchor" href="#_2-外部排序" aria-hidden="true">#</a> 2. 外部排序</h4><p>数据量过大，无法全部加载到内存中，需要借助外部存储进行排序。包括(合并排序法和直接合并排序法)。</p><h3 id="_6-2-冒泡排序" tabindex="-1"><a class="header-anchor" href="#_6-2-冒泡排序" aria-hidden="true">#</a> 6.2 冒泡排序</h3><p>假设有 5 个数字 3，1，6，2，5 在一个 int 数组中，要求按从小到大排序输出</p><p>如何采用冒泡排序算法呢？</p><p>冒泡排序的算法是这样的，首先从数组的最左边开始，取出第 0 号位置（左边）的数据和第 1</p><p>号位置（右边）的数据，如果左边的数据大于右边的数据，则进行交换，否而不进行交换。接 下来右移一个位置，取出第 1 个位置的数据和第 2 个位置的数据，进行比较，如果左边的数据 大于右边的数据，则进行交换，否而不进行交换。沿着这个算法一直排序下去，最大的数就会 冒出水面，这就是冒泡排序。</p><p>以上示例排序过程如下：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091451569.png" alt="image-20231009145156471" tabindex="0" loading="lazy"><figcaption>image-20231009145156471</figcaption></figure><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091452252.png" alt="image-20231009145215167" tabindex="0" loading="lazy"><figcaption>image-20231009145215167</figcaption></figure><p>下面以数列{20,40,30,10,60,50}为例，演示它的冒泡排序过程(如下图)。</p><figure><img src="https://pdai.tech/images/alg/alg-sort-bubble-1.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们先分析第1趟排序</p><ul><li>当i=5,j=0时，a[0]&lt;a[1]。此时，不做任何处理！</li><li>当i=5,j=1时，a[1]&gt;a[2]。此时，交换a[1]和a[2]的值；交换之后，a[1]=30，a[2]=40。</li><li>当i=5,j=2时，a[2]&gt;a[3]。此时，交换a[2]和a[3]的值；交换之后，a[2]=10，a[3]=40。</li><li>当i=5,j=3时，a[3]&lt;a[4]。此时，不做任何处理！</li><li>当i=5,j=4时，a[4]&gt;a[5]。此时，交换a[4]和a[5]的值；交换之后，a[4]=50，a[3]=60。</li></ul><p>于是，第1趟排序完之后，数列{20,40,30,10,60,50}变成了{20,30,10,40,50,60}。此时，数列末尾的值最大。</p><p>根据这种方法:</p><ul><li>第2趟排序完之后，数列中a[5...6]是有序的。</li><li>第3趟排序完之后，数列中a[4...6]是有序的。</li><li>第4趟排序完之后，数列中a[3...6]是有序的。</li><li>第5趟排序完之后，数列中a[1...6]是有序的。整个数列也就是有序的了。</li></ul><h4 id="冒泡排序时间复杂度" tabindex="-1"><a class="header-anchor" href="#冒泡排序时间复杂度" aria-hidden="true">#</a> 冒泡排序时间复杂度</h4><p>冒泡排序的时间复杂度是O(N2)。 假设被排序的数列中有N个数。遍历一趟的时间复杂度是O(N)，需要遍历多少次呢? N-1次！因此，冒泡排序的时间复杂度是O(N2)。</p><h4 id="冒泡排序稳定性" tabindex="-1"><a class="header-anchor" href="#冒泡排序稳定性" aria-hidden="true">#</a> 冒泡排序稳定性</h4><p>冒泡排序是稳定的算法，它满足稳定算法的定义。 算法稳定性 -- 假设在数列中存在a[i]=a[j]，若在排序之前，a[i]在a[j]前面；并且排序之后，a[i]仍然在a[j]前面。则这个排序算法是稳定的！</p><h4 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例" aria-hidden="true">#</a> 代码示例</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span></span><span class="token class-name">Leo</span><span class="token punctuation">.</span>array<span class="token punctuation">.</span>Leo01<span class="token punctuation">.</span>sort<span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span></span><span class="token class-name">Test</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Arrays</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : Leo
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/9/26/026 11:34
 * <span class="token keyword">@description</span> : 冒泡排序
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArrayBubbleSort</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 用于测试: 冒泡排序基本写法
     */</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testBubbleSort01</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">73</span><span class="token punctuation">,</span><span class="token number">88</span><span class="token punctuation">,</span><span class="token number">41</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">93</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> temp <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> len <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>


        <span class="token comment">// 外层循环负责总轮数</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 内层循环负责每轮的第(i+1)次处理</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> len <span class="token operator">-</span> i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span> arr<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                    arr<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 循环打印每一轮的数量</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n第&quot;</span><span class="token operator">+</span> <span class="token punctuation">(</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;轮处理的数组: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;\\t&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;新序列: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
    * 用于测试: 冒泡排序第二种写法
     *
         原始数据：
         3,2,7,6,8

          第1次循环：(最大的跑到最右边)

          2,3,7,6,8 (3和2比较，2&lt;3，所以2和3交换位置)
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
    */</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testBubbleSort02</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span>  <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> temp <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> len <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>


        <span class="token comment">// 外层循环负责总轮数</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> len<span class="token punctuation">;</span> i <span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 内层循环负责每轮的第(i+1)次处理</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span> arr<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                    arr<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 循环打印每一轮的数量</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n第&quot;</span><span class="token operator">+</span> <span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;轮处理的数组: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;\\t&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;新序列: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-选择排序" tabindex="-1"><a class="header-anchor" href="#_6-3-选择排序" aria-hidden="true">#</a> 6.3 选择排序</h3><p>选择排序对冒泡排序进行了改进，使交换次数减少，但比较次数仍然没有减少。</p><p>假设有 5 个数字 3，1，6，2，5 在一个 int 数组中，要求按从小到大排序输出</p><p>采用选择排序，选择排序是这样的，先从左端开始，找到下标为 0 的元素，然后和后面的元素 依次比较，如果找到了比下标 0 小的元素，那么再使用此元素，再接着依次比较，直到比较完 成所有的元素，最后把最小的和第 0 个位置交换。</p><p>以上示例排序过程如下：</p><p>下面以数列{20,40,30,10,60,50}为例，演示它的选择排序过程(如下图)。</p><figure><img src="https://pdai.tech/images/alg/alg-sort-select-1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>排序流程</p><ul><li>第1趟: i=0。找出a[1...5]中的最小值a[3]=10，然后将a[0]和a[3]互换。 数列变化: 20,40,30,10,60,50 -- &gt; 10,40,30,20,60,50</li><li>第2趟: i=1。找出a[2...5]中的最小值a[3]=20，然后将a[1]和a[3]互换。 数列变化: 10,40,30,20,60,50 -- &gt; 10,20,30,40,60,50</li><li>第3趟: i=2。找出a[3...5]中的最小值，由于该最小值大于a[2]，该趟不做任何处理。</li><li>第4趟: i=3。找出a[4...5]中的最小值，由于该最小值大于a[3]，该趟不做任何处理。</li><li>第5趟: i=4。交换a[4]和a[5]的数据。 数列变化: 10,20,30,40,60,50 -- &gt; 10,20,30,40,50,60</li></ul><h4 id="空间复杂度" tabindex="-1"><a class="header-anchor" href="#空间复杂度" aria-hidden="true">#</a> 空间复杂度</h4><p>选择排序的时间复杂度是O(N2)。</p><p>假设被排序的数列中有N个数。遍历一趟的时间复杂度是O(N)，需要遍历多少次呢? N-1！因此，选择排序的时间复杂度是O(N2)</p><h4 id="稳定性" tabindex="-1"><a class="header-anchor" href="#稳定性" aria-hidden="true">#</a> 稳定性</h4><ul><li><strong>回顾：什么是排序算法的稳定性</strong>？</li></ul><p>假定在待排序的记录序列中，存在多个具有相同的关键字的记录，若经过排序，这些记录的相对次序保持不变，即在原序列中，r[i]=r[j]，且r[i]在r[j]之前，而在排序后的序列中，r[i]仍在r[j]之前，则称这种排序算法是稳定的；否则称为不稳定的。</p><ul><li><strong>数组实现和链表实现的差异</strong></li></ul><p>用数组实现的选择排序是不稳定的，用链表实现的选择排序是稳定的。</p><p>不过，一般提到排序算法时，大家往往会默认是数组实现，所以选择排序是不稳定的。</p><ul><li><strong>此外，排序算法的稳定性也是可以改变的，只是需要额外的时间和空间</strong></li></ul><h4 id="代码示例-1" tabindex="-1"><a class="header-anchor" href="#代码示例-1" aria-hidden="true">#</a> 代码示例</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span></span><span class="token class-name">Leo</span><span class="token punctuation">.</span>array<span class="token punctuation">.</span>Leo01<span class="token punctuation">.</span>sort<span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span></span><span class="token class-name">Test</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Arrays</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : Leo
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/9/26/026 11:34
 * <span class="token keyword">@description</span> : 选择排序
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
 * 选择排序比目泡排序的效率高。高在交换位置的次数上。
 * 选择排序的交换位置是有意义的。
 * 循环一次，然后找出参加比较的这堆数据中最小的，拿着这个最小的值和最前面的数据交换位置。
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArraySelectSort</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 用于测试: 选择排序基本写法
     */</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testSelectSort01</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">73</span><span class="token punctuation">,</span> <span class="token number">88</span><span class="token punctuation">,</span> <span class="token number">41</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">93</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> temp <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>


        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 假设i是最小的</span>
            <span class="token keyword">int</span> min <span class="token operator">=</span> i<span class="token punctuation">;</span>
            <span class="token comment">// i正好是参加比较的这堆数据中”最左边那个元奉的下标。</span>
            <span class="token comment">// 第二层循环指的是除了第一层的所有元素，最后剩下的元素中 最小的那个元素</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>min<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 最小的是J ，并将其与后面所有元素进行交换</span>
                    min <span class="token operator">=</span> j<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>min <span class="token operator">!=</span> i<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>min<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    arr<span class="token punctuation">[</span>min<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-二分法查找" tabindex="-1"><a class="header-anchor" href="#_6-4-二分法查找" aria-hidden="true">#</a> 6.4 二分法查找</h3><h4 id="二分法介绍" tabindex="-1"><a class="header-anchor" href="#二分法介绍" aria-hidden="true">#</a> 二分法介绍</h4><p>查找数组中的元素我们可以遍历数组中的所有元素，这种方式称为线性查找。线性查找适合与 小型数组，大型数组效率太低。如果一个数组已经排好序，那么我们可以采用效率比较高的<strong>二分查找</strong>或叫<strong>折半查找算法</strong>。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091502170.png" alt="image-20231009150207060" tabindex="0" loading="lazy"><figcaption>image-20231009150207060</figcaption></figure><h4 id="代码示例-2" tabindex="-1"><a class="header-anchor" href="#代码示例-2" aria-hidden="true">#</a> 代码示例</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span></span><span class="token class-name">Leo</span><span class="token punctuation">.</span>array<span class="token punctuation">.</span>Leo01<span class="token punctuation">.</span>sort<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : Leo
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/10/9/009 15:02
 * <span class="token keyword">@description</span> : 二分法查找
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BinarySearch</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">11</span><span class="token punctuation">,</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token number">13</span><span class="token punctuation">,</span><span class="token number">14</span><span class="token punctuation">,</span><span class="token number">15</span><span class="token punctuation">,</span><span class="token number">16</span><span class="token punctuation">,</span><span class="token number">17</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">,</span><span class="token number">19</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//采用折半法查询，必须建立在排序的基础上 </span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> data<span class="token punctuation">,</span> <span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//开始下标 </span>
        <span class="token keyword">int</span> beginPos <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token comment">//结束下标 </span>
        <span class="token keyword">int</span> endPos <span class="token operator">=</span> data<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>beginPos <span class="token operator">&lt;=</span>endPos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> midPos <span class="token operator">=</span> <span class="token punctuation">(</span>beginPos <span class="token operator">+</span> endPos<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> data<span class="token punctuation">[</span>midPos<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> midPos<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&gt;</span> data<span class="token punctuation">[</span>midPos<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                beginPos <span class="token operator">=</span> midPos <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&lt;</span> data<span class="token punctuation">[</span>midPos<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                endPos <span class="token operator">=</span> midPos <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-多维数组" tabindex="-1"><a class="header-anchor" href="#_7-多维数组" aria-hidden="true">#</a> 7. 多维数组</h2><p>多维数组我们只介绍二维数组。</p><p><strong>二维数组的应用场景</strong></p><p>比如我们开发一个五子棋游戏，棋盘就是需要二维数组来表示。如图：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/Leo100/202310091505911.png" alt="image-20231009150512831" tabindex="0" loading="lazy"><figcaption>image-20231009150512831</figcaption></figure><h3 id="_7-1-二维数组的使用" tabindex="-1"><a class="header-anchor" href="#_7-1-二维数组的使用" aria-hidden="true">#</a> 7.1 二维数组的使用</h3><h4 id="_1-快速入门" tabindex="-1"><a class="header-anchor" href="#_1-快速入门" aria-hidden="true">#</a> 1. 快速入门</h4><blockquote><p>TwoDimensionalArray01.java</p><p>请用二维数组输出如下图形</p><p>0 0 0 0 0 0</p><p>0 0 1 0 0 0</p><p>0 2 0 3 0 0</p><p>0 0 0 0 0 0</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span></span><span class="token class-name">Leo</span><span class="token punctuation">.</span>array<span class="token punctuation">.</span>Leo01<span class="token punctuation">.</span>two<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : Leo
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/10/9/009 15:06
 * <span class="token keyword">@description</span> : 认识二维数组
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TwoDimensionalArray01</span> <span class="token punctuation">{</span>


    <span class="token comment">//编写一个main方法</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token comment">/*
		请用二维数组输出如下图形
			0 0 0 0 0 0
			0 0 1 0 0 0
			0 2 0 3 0 0
			0 0 0 0 0 0
		 */</span>

        <span class="token comment">//什么是二维数组：</span>
        <span class="token comment">//1. 从定义形式上看 int[][]</span>
        <span class="token comment">//2. 可以这样理解，原来的一维数组的每个元素是一维数组, 就构成二维数组</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token comment">//关于二维数组的关键概念</span>
        <span class="token comment">//(1)</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;二维数组的元素个数=&quot;</span> <span class="token operator">+</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//(2) 二维数组的每个元素是一维数组, 所以如果需要得到每个一维数组的值</span>
        <span class="token comment">//    还需要再次遍历</span>
        <span class="token comment">//(3) 如果我们要访问第 (i+1)个一维数组的第j+1个值 arr[i][j];</span>
        <span class="token comment">//    举例 访问 3, =》 他是第3个一维数组的第4个值 arr[2][3]</span>
        
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;第3个一维数组的第4个值=&quot;</span> <span class="token operator">+</span> arr<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 


        <span class="token comment">//输出二维图形</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//遍历二维数组的每个元素</span>
            <span class="token comment">//遍历二维数组的每个元素(数组)</span>
            <span class="token comment">//1. arr[i] 表示 二维数组的第i+1个元素 比如arr[0]：二维数组的第一个元素</span>
            <span class="token comment">//2. arr[i].length 得到 对应的 每个一维数组的长度</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//输出了一维数组</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-二维数组的使用细节" tabindex="-1"><a class="header-anchor" href="#_7-2-二维数组的使用细节" aria-hidden="true">#</a> 7.2 二维数组的使用细节</h3><ol><li><p>一维数组的声明方式有:</p><p>int[] x或者int x[]</p></li><li><p>二维数组的声明方式有:</p><p>int[][] y<strong>或者</strong>int[] y[] <strong>或者</strong>int y[][]</p></li></ol><h2 id="_8-数组练习" tabindex="-1"><a class="header-anchor" href="#_8-数组练习" aria-hidden="true">#</a> 8. 数组练习</h2><h4 id="_1-第一题" tabindex="-1"><a class="header-anchor" href="#_1-第一题" aria-hidden="true">#</a> 1. 第一题</h4><p>随机生成10个整数(1100的范围)保存到数组，并倒序打印以及求平均值、求最大值和最大值的下标、并查找里面是否有8</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span></span><span class="token class-name">Leo</span><span class="token punctuation">.</span>array<span class="token punctuation">.</span>Leo01<span class="token punctuation">.</span>homework<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : Leo
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/10/9/009 15:11
 * <span class="token keyword">@description</span> :
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HomeWork01</span> <span class="token punctuation">{</span>
        

            <span class="token comment">//编写一个main方法</span>
            <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		
		<span class="token comment">/*
            随机生成10个整数(1_100的范围)保存到数组，
            并倒序打印以及求平均值、求最大值和最大值的下标、
            并查找里面是否有 8  Homework01.java
		 */</span>

                <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token comment">//(int)(Math.random() * 100) + 1 生产 随机数 1-100</span>

                <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;====arr的元素情况=====&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;\\t&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n====arr的元素情况(倒序)=====&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;\\t&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token comment">//平均值、求最大值和最大值的下标</span>
                <span class="token comment">//我们这里将需要一起完成</span>
                <span class="token comment">//</span>
                <span class="token keyword">double</span> sum <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> max <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> maxIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>

                    sum <span class="token operator">+=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> 
                    <span class="token comment">//累积和</span>

                    <span class="token keyword">if</span><span class="token punctuation">(</span> max <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token comment">//说明max不是最大值，就变化</span>
                        max <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                        maxIndex <span class="token operator">=</span> i<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>

                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\\nmax=&quot;</span> <span class="token operator">+</span> max <span class="token operator">+</span> <span class="token string">&quot; maxIndex=&quot;</span> <span class="token operator">+</span> maxIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n平均值=&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>sum <span class="token operator">/</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


                <span class="token comment">//查找数组中是否有8-&gt;使用顺序查找</span>
                <span class="token keyword">int</span> findNum <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> 
                <span class="token comment">//如果找到，就把下标记录到 index</span>
                <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span>findNum <span class="token operator">==</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;找到数&quot;</span> <span class="token operator">+</span> findNum <span class="token operator">+</span> <span class="token string">&quot; 下标=&quot;</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        index <span class="token operator">=</span> i<span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>

                <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;没有找到数&quot;</span> <span class="token operator">+</span> findNum <span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-参考文章" tabindex="-1"><a class="header-anchor" href="#_9-参考文章" aria-hidden="true">#</a> 9. 参考文章</h2>`,168),m={href:"https://zh.wikipedia.org/wiki/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95",target:"_blank",rel:"noopener noreferrer"},b={href:"https://blog.51cto.com/u_16175522/6812404",target:"_blank",rel:"noopener noreferrer"},g={href:"https://developer.aliyun.com/article/1137886",target:"_blank",rel:"noopener noreferrer"},h={href:"https://pdai.tech/md/algorithm/alg-sort-x-bubble.html#%E6%8E%92%E5%BA%8F-%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F-bubble-sort",target:"_blank",rel:"noopener noreferrer"},y={href:"https://oi-wiki.org/basic/sort-intro/",target:"_blank",rel:"noopener noreferrer"},w=n("figure",null,[n("img",{src:"https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png",alt:"公众号封面",tabindex:"0",loading:"lazy"}),n("figcaption",null,"公众号封面")],-1);function f(x,j){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,n("p",null,[s("在计算机科学中，"),r,s("（英语：array data structure），简称"),d,s("（英语：Array），是由相同类型的元素（element）的集合所组成的 "),n("a",k,[s("资料结构"),t(a)]),s("，分配一块连续的内存来存储。利用元素的索引（index）可以计算出该元素对应的储存地址。")]),v,n("ul",null,[n("li",null,[n("a",m,[s("https://zh.wikipedia.org/wiki/排序算法"),t(a)])]),n("li",null,[n("a",b,[s("https://blog.51cto.com/u_16175522/6812404"),t(a)])]),n("li",null,[n("a",g,[s("https://developer.aliyun.com/article/1137886"),t(a)])]),n("li",null,[n("a",h,[s("https://pdai.tech/md/algorithm/alg-sort-x-bubble.html#排序-冒泡排序-bubble-sort"),t(a)])]),n("li",null,[n("a",y,[s("https://oi-wiki.org/basic/sort-intro/"),t(a)])])]),w])}const S=e(l,[["render",f],["__file","java-basic-array.html.vue"]]);export{S as default};
