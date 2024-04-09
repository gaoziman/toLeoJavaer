import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as l,c as u,d as a,w as e,b as s,a as n,e as o}from"./app-2feb0630.js";const k={},d=n("h2",{id:"_1-概述",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-概述","aria-hidden":"true"},"#"),s(" 1. 概述")],-1),r=n("blockquote",null,[n("p",null,[n("code",null,"Static"),s("是静态修饰符，什么叫静态修饰符呢？大家都知道，在程序中任何变量或者代码都是在编译时由系统自动分配内存来存储的，而所谓静态就是指在编译后所分配的内存会一直存在，直到程序退出内存才会释放这个空间，也就是只要程序在运行，那么这块内存就会一直存在。这样做有什么意义呢？在Java程序里面，所有的东西都是对象，而对象的抽象就是类，对于一个类而言，如果要使用他的成员，那么普通情况下必须先实例化对象后，通过对象的引用才能够访问这些成员，但是用static修饰的成员可以通过类名加“.”进行直接访问。")])],-1),v=n("strong",null,"静态变量",-1),m=n("em",null,"Static Variable",-1),b={href:"https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BC%96%E7%A8%8B",target:"_blank",rel:"noopener noreferrer"},g={href:"https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E7%A8%8B%E5%BA%8F",target:"_blank",rel:"noopener noreferrer"},h={href:"https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/w/index.php%3Ftitle%3D%E9%9D%99%E6%80%81%E5%88%86%E9%85%8D%26action%3Dedit%26redlink%3D1",target:"_blank",rel:"noopener noreferrer"},y={href:"https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E5%8F%98%E9%87%8F_(%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1)",target:"_blank",rel:"noopener noreferrer"},w={href:"https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E8%87%AA%E5%8A%A8%E5%8F%98%E9%87%8F",target:"_blank",rel:"noopener noreferrer"},_={href:"https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E5%86%85%E5%AD%98%E5%88%86%E9%85%8D",target:"_blank",rel:"noopener noreferrer"},f={href:"https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E8%B0%83%E7%94%A8%E6%A0%88",target:"_blank",rel:"noopener noreferrer"},q=n("p",null,"如何理解？为什么要这样做？例子？",-1),S=n("ul",null,[n("li",null,"解释：")],-1),z=n("p",null,"首先，先了解一下Java的内存分配：",-1),B=n("blockquote",null,[n("p",null,"Java 把内存分为栈内存和堆内存，其中栈内存用来存放一些基本类型的变量、数组和对象的引用，堆内存主要存放一些对象。")],-1),E=o(`<p>那为什么要这样做呢？</p><blockquote><p>在 JVM 加载一个类的时候，若该类存在 static 修饰的成员变量和成员方法，则会为这些成员变量和成员方法在固定的位置开辟一个固定大小的内存区域，有了这些“固定”的特性，那么 JVM 就可以非常方便地访问他们。同时如果静态的成员变量和成员方法不出作用域的话，它们的句柄都会保持不变。同时 static 所蕴含“静态”的概念表示着它是不可恢复的，即在那个地方，你修改了，他是不会变回原样的，你清理了，他就不会回来了。</p></blockquote><p>可能这些有些偏于理论，下面我们通过一些代码示例来进一步了解<code>Static</code>关键字</p><h2 id="_2-修饰成员属性" tabindex="-1"><a class="header-anchor" href="#_2-修饰成员属性" aria-hidden="true">#</a> 2. 修饰成员属性</h2><p>当我们需要在一个类（class）中<code>定义一个属性为公共的属性</code>，就好比说我们需要这个属性是所有类都是共有的，并且这个属性的值是同一个。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>cisyam<span class="token punctuation">.</span>testStatic</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : Leo
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/8/18 11:06
 * <span class="token keyword">@description</span> :
 */</span>
<span class="token keyword">class</span> <span class="token class-name">Book</span><span class="token punctuation">{</span>

    <span class="token comment">// 设置一个默认的值</span>

    <span class="token keyword">static</span> <span class="token class-name">String</span> pub <span class="token operator">=</span> <span class="token string">&quot;清华大学出版社&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">// 用来和 static 作为对比</span>

    <span class="token class-name">String</span> description <span class="token operator">=</span> <span class="token string">&quot;描述&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">// Book 类正常的属性</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">double</span> price<span class="token punctuation">;</span>

    <span class="token comment">// Book 的构造类</span>

    <span class="token keyword">public</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token keyword">double</span> price<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">=</span> title<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>price <span class="token operator">=</span> price<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取 Book 的信息</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;图书名称：&quot;</span><span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">+</span> <span class="token string">&quot;，价格为：&quot;</span><span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>price <span class="token operator">+</span> <span class="token string">&quot;，出版社为：&quot;</span><span class="token operator">+</span> pub <span class="token operator">+</span> <span class="token string">&quot;，描述 &quot;</span><span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 实例化三个Book类</span>
        <span class="token class-name">Book</span> book1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Android开发实战&quot;</span><span class="token punctuation">,</span> <span class="token number">69.8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Book</span> book2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Java EE开发实战&quot;</span><span class="token punctuation">,</span> <span class="token number">49.8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Book</span> book3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Java 开发教程&quot;</span><span class="token punctuation">,</span> <span class="token number">79.8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 在没有设置 pub 属性的情况下输出</span>
        book1<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        book2<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        book3<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;————————————————————无敌分割线————————————————————&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 我们给 book1 设置一个 pub 属性</span>
        <span class="token class-name">Book</span><span class="token punctuation">.</span>pub <span class="token operator">=</span> <span class="token string">&quot;中信出版社&quot;</span><span class="token punctuation">;</span>
        book1<span class="token punctuation">.</span>description <span class="token operator">=</span> <span class="token string">&quot;这本书很牛逼，看了你就知道&quot;</span><span class="token punctuation">;</span>

        book1<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        book2<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        book3<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),A=n("figure",null,[n("img",{src:"https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308181113774.png",alt:"image-20230818111309548",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20230818111309548")],-1),x=n("p",null,"从控制台输出的结果，可以看到：",-1),j=n("li",null,"如果给 属性 赋默认值，在上面的例子中是(description 和 pub)，输出的结果为都是默认的。",-1),I=o(`<h3 id="通过类调用-static-声明的属性" tabindex="-1"><a class="header-anchor" href="#通过类调用-static-声明的属性" aria-hidden="true">#</a> 通过类调用 static 声明的属性</h3><blockquote><p>但是基于上面的代码，我们发现如果是其中的一个类对象就改变了所有的对象的属性，这样子操作是不是感觉不是特别好？然后在Java中，如果是使用 static 声明的属性值，是可以直接通过类调用的。</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 实例化三个Book类</span>
        <span class="token class-name">Book</span> book1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Android开发实战&quot;</span><span class="token punctuation">,</span> <span class="token number">69.8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Book</span> book2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Java EE开发实战&quot;</span><span class="token punctuation">,</span> <span class="token number">49.8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Book</span> book3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Java 开发教程&quot;</span><span class="token punctuation">,</span> <span class="token number">79.8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 在没有设置 pub 属性的情况下输出</span>
        book1<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        book2<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        book3<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;————————————————————无敌分割线————————————————————&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 我们使用 Book 类直接调用pub</span>
        <span class="token class-name">Book</span><span class="token punctuation">.</span>pub <span class="token operator">=</span> <span class="token string">&quot;中信出版社&quot;</span><span class="token punctuation">;</span>

        book1<span class="token punctuation">.</span>description <span class="token operator">=</span> <span class="token string">&quot;这本书很牛逼，看了你就知道&quot;</span><span class="token punctuation">;</span>

        book1<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        book2<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        book3<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="没有实例化类时-调用-static-属性" tabindex="-1"><a class="header-anchor" href="#没有实例化类时-调用-static-属性" aria-hidden="true">#</a> 没有实例化类时，调用 static 属性</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>cisyam<span class="token punctuation">.</span>testStatic</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : Leo
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/8/18 11:19
 * <span class="token keyword">@description</span> :
 */</span>
<span class="token keyword">class</span> <span class="token class-name">Book2</span><span class="token punctuation">{</span>

    <span class="token comment">// 设置一个默认的值</span>
    <span class="token keyword">static</span> <span class="token class-name">String</span> pub <span class="token operator">=</span> <span class="token string">&quot;清华大学出版社&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">// 用来和 static 作为对比</span>
    <span class="token class-name">String</span> description <span class="token operator">=</span> <span class="token string">&quot;描述&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">// Book 类正常的属性</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">double</span> price<span class="token punctuation">;</span>

    <span class="token comment">// Book 的构造类</span>
    <span class="token keyword">public</span> <span class="token class-name">Book2</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token keyword">double</span> price<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">=</span> title<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>price <span class="token operator">=</span> price<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取 Book 的信息</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;图书名称：&quot;</span><span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">+</span> <span class="token string">&quot;，价格为：&quot;</span><span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>price <span class="token operator">+</span> <span class="token string">&quot;，出版社为：&quot;</span><span class="token operator">+</span> pub <span class="token operator">+</span> <span class="token string">&quot;，描述 &quot;</span><span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test3</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 在没有实例化对象时，就调用</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Book</span><span class="token punctuation">.</span>pub<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 没事实例化对象的时候，去给static属性赋值上默认值</span>
        <span class="token class-name">Book2</span><span class="token punctuation">.</span>pub <span class="token operator">=</span> <span class="token string">&quot;北京大学出版社&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Book</span><span class="token punctuation">.</span>pub<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 新建一个类，输入 pub 属性</span>
        <span class="token class-name">Book2</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book2</span><span class="token punctuation">(</span><span class="token string">&quot;Java&quot;</span><span class="token punctuation">,</span> <span class="token number">88</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        book<span class="token punctuation">.</span><span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),T=n("figure",null,[n("img",{src:"https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308181120814.png",alt:"image-20230818112054747",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20230818112054747")],-1),J=n("span",{style:{color:"red"}},"**由此，我们看出，在没有实例化对象的时候，就可以直接通过类去掉用 static属性，并且还可以修改 static 的属性。static 属性声明虽然是在类的结构中，但是并不受到对象的控制，是独立存在的。**",-1),N=n("h3",{id:"static-属性与非-static-属性的区别",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#static-属性与非-static-属性的区别","aria-hidden":"true"},"#"),s(" static 属性与非 static 属性的区别")],-1),D=n("ul",null,[n("li",null,[n("p",null,"static 声明的属性和普通属性（非 static 属性）最大的区别在于保存的内存区域不同。static 所修饰的在静态数据区。而不是在堆和栈。")]),n("li",null,[n("p",null,"static 属性与非 static 属性还有一个最大的区别，就是在于所有非 static 属性必须产生实例化之后才可以访问，但是static 属性不受实例化对象的控制。也就是说，在没有产生实例化对象的情况下，依然可以使用 static 对象。")])],-1),L=n("h2",{id:"_3-修饰成员方法",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_3-修饰成员方法","aria-hidden":"true"},"#"),s(" 3. 修饰成员方法")],-1),F=o(`<p>方法本来就是存放在类的定义当中的。static修饰成员方法的作用是可以使用&quot;类名.方法名&quot;的方式操作方法，避免了先要new出对象的繁琐和资源消耗。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>package com.cisyam.testStatic;

/**
 * @author : Leo
 * @version 1.0
 * @date 2023/8/18 11:19
 * @description :
 */
class Test2{
    public static void sayHello(String name) {
        System.out.println(&quot;Hello,&quot; + name);
    }
}
 
public class Demo {
    public static void main(String[] args) {
        Test2.sayHello(&quot;Leo&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),C=n("figure",null,[n("img",{src:"https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308181128564.png",alt:"image-20230818112801463",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20230818112801463")],-1),V=n("h2",{id:"_4-修饰代码块",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_4-修饰代码块","aria-hidden":"true"},"#"),s(" 4. 修饰代码块")],-1),H=o(`<p><span style="color:red;">**static **</span>{ }就是静态块，当类加载器载入类的时候，这一部分代码被执行，常用于对静态变量进行初始化工作。当其他代码用到这个类，类加载器才会将它载入。</p><p>代码只能执行一次，不能再调用。在静态块中，可以访问静态变量，调用静态方法。</p><p>如果去掉static，{ }中的代码则会在创建类对象的时候才执行，（相当于把这部分代码复制到各个构造函数中），这样可以实现块中的内容在多个构造函数中的复用。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>cisyam<span class="token punctuation">.</span>testStatic</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : Leo
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/8/18 11:29
 * <span class="token keyword">@description</span> :
 */</span>
<span class="token keyword">class</span> <span class="token class-name">Test4</span><span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;静态代码块执行&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;普通代码块执行&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Test4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;This is Test()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Test4</span><span class="token punctuation">(</span><span class="token class-name">String</span> string<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;This is Test(String string)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;------------------------&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Test4</span> test1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Test4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;------------------------&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Test4</span> test2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Test4</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),U=n("figure",null,[n("img",{src:"https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308181132009.png",alt:"image-20230818113217885",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20230818113217885")],-1),M=n("h2",{id:"_5-修饰内部类",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_5-修饰内部类","aria-hidden":"true"},"#"),s(" 5. 修饰内部类")],-1),K=n("span",{style:{color:"red"}},"**static**",-1),O=n("span",{style:{color:"red"}},"**static**",-1),P=n("span",{style:{color:"red"}},"**static**",-1),G=n("span",{style:{color:"red"}},[n("strong",null,"static")],-1),Q=n("span",{style:{color:"red"}},[n("strong",null,"static")],-1),R=o(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>cisyam<span class="token punctuation">.</span>testStatic</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SingletonHolder</span> <span class="token punctuation">{</span>
	    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
 
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	    <span class="token keyword">return</span> <span class="token class-name">SingletonHolder</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
 
<span class="token keyword">class</span> <span class="token class-name">Demo3</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Singleton</span> singleton <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>singleton<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-static加载顺序" tabindex="-1"><a class="header-anchor" href="#_6-static加载顺序" aria-hidden="true">#</a> 6. static加载顺序</h2><p>首先思考，下边程序是否能编译通过？若可以编译通过，那么执行结果是什么？</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>cisyam<span class="token punctuation">.</span>testStatic</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : Leo
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/8/18 11:38
 * <span class="token keyword">@description</span> :
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">User</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test6</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        user<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;Leo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;user = &quot;</span> <span class="token operator">+</span> <span class="token class-name">User</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),W=n("figure",null,[n("img",{src:"https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308181140104.png",alt:"image-20230818114056989",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20230818114056989")],-1),X=n("span",{style:{color:"red"}},"**从上述结果可见，实例对象可以访问访问类变量。**",-1),Y=n("figure",null,[n("img",{src:"https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png",alt:"公众号封面",tabindex:"0",loading:"lazy"}),n("figcaption",null,"公众号封面")],-1);function Z($,nn){const t=c("font"),p=c("ExternalLinkIcon");return l(),u("div",null,[d,r,a(t,{color:"blue"},{default:e(()=>[s("`官方解释`")]),_:1}),s("： "),v,s("（"),m,s("）在"),n("a",b,[s("计算机编程"),a(p)]),s("领域指在"),n("a",g,[s("程序"),a(p)]),s("执行前系统就为之"),n("a",h,[s("静态分配"),a(p)]),s("（也即在运行时中不再改变分配情况）存储空间的一类"),n("a",y,[s("变量"),a(p)]),s("。与之相对应的是在运行时只暂时存在的"),n("a",w,[s("自动变量"),a(p)]),s("（即局部变量）与以"),n("a",_,[s("动态分配"),a(p)]),s("方式获取存储空间的一些对象，其中自动变量的存储空间在"),n("a",f,[s("调用栈"),a(p)]),s("上分配与释放。（选自维基百科）"),q,S,z,B,a(t,{size:"4"},{default:e(()=>[s("什么是句柄")]),_:1}),s("： 自己理解的话,其实就是类似于对这些静态的成员进行编号。"),E,a(t,{size:"5"},{default:e(()=>[a(t,{color:"blue"},{default:e(()=>[s("控制台输出")]),_:1})]),_:1}),A,x,n("ul",null,[j,n("li",null,[s("当我们修改了类中 "),a(t,{color:"DarkOrange"},{default:e(()=>[s("static")]),_:1}),s(" 关键字声明的属性，那么只要修改了一次，那么其他所有的对象的这个属性都给修改了。")])]),I,a(t,{size:"5"},{default:e(()=>[a(t,{color:"blue"},{default:e(()=>[s("控制台输出")]),_:1})]),_:1}),T,a(t,{size:"4"},{default:e(()=>[J]),_:1}),N,D,L,a(t,{color:"blue"},{default:e(()=>[s("**说明**")]),_:1}),F,a(t,{size:"5"},{default:e(()=>[a(t,{color:"blue"},{default:e(()=>[s("控制台输出")]),_:1})]),_:1}),C,V,n("p",null,[n("strong",null,[a(t,{color:"blue"},{default:e(()=>[s("说明")]),_:1})])]),H,a(t,{size:"5"},{default:e(()=>[a(t,{color:"blue"},{default:e(()=>[s("控制台输出")]),_:1})]),_:1}),U,M,a(t,{size:"4"},{default:e(()=>[K]),_:1}),s(" 不能修饰普通类，但可以修饰内部类。原因如下："),a(t,{size:"4"},{default:e(()=>[O]),_:1}),s(" 修饰的东西被我们成为类成员，它会随着类的加载而加载，比如：静态代码块，静态成员，静态方法(这里只是加载，并没有调用)等等。若把一个Class文件中的外部类设为"),a(t,{size:"4"},{default:e(()=>[P]),_:1}),s("，那目的何在呢？难道让这个类随着应用的启动而加载吗？如果我在这次使用过程中根本没有使用过这个类，那么是不是就会浪费内存。这样来说设计不合理，总而言之，设计不合理的地方，Java是不会让它存在的。"),n("p",null,[s("为什么内部类可以使用 "),a(t,{size:"4"},{default:e(()=>[G]),_:1}),s(" 修饰呢，因为内部类算是类的成员了，如果我们没有使用静态来修饰，那么我们在创建内部类的时候就需要先有一个外部类的对象，如果我们一直在使用内部类，那么内存中就会一直存在外部类的引用，而我们有时候只需要使用内部类，不需要外部类，那么还是会浪费内存，甚至会造成内存溢出。使用 "),a(t,{size:"4"},{default:e(()=>[Q]),_:1}),s("修饰内部类之后，内部类在创建对象时就不需要有外部类对象的引用了。")]),R,a(t,{size:"5"},{default:e(()=>[a(t,{color:"blue"},{default:e(()=>[s("控制台输出")]),_:1})]),_:1}),W,a(t,{size:"6"},{default:e(()=>[X]),_:1}),Y])}const tn=i(k,[["render",Z],["__file","static-keyword-function-and-usage.html.vue"]]);export{tn as default};
