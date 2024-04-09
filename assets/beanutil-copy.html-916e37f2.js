import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-2feb0630.js";const e={},p=t(`<h1 id="_2024年了你还在用beanutil-copy-看看这款神器" tabindex="-1"><a class="header-anchor" href="#_2024年了你还在用beanutil-copy-看看这款神器" aria-hidden="true">#</a> 2024年了你还在用BeanUtil.copy，看看这款神器</h1><h2 id="_1-前言" tabindex="-1"><a class="header-anchor" href="#_1-前言" aria-hidden="true">#</a> 1.前言</h2><p>在项目中，如果我们要遵循分层领域模型规约: 话，肯定避免不了在DTO、VO、BO、AO、VO、Query等实体的转换，我们通常有几种做法:</p><ul><li>手动一个个字段的赋值</li><li>通过反序列化的手段，必须先转成JSON字符串，再转回来</li><li>使用Spring的BeanUtils，提供的克隆方法。</li></ul><p>想必上面这几种方式大家都使用过。但是BeanUtils底层是通过反射实现的，复杂场景支持不足，控制 copy 粒度太粗，不易重构。</p><p>而前两种方式的话， 重复性工作多，手写代码容易遗漏掉有些字段。</p><p>今天我们来介绍关于MapStruct，MapStruct是一个代码生成器，它通过编译时自动生成映射代码，从而避免了手动编写重复且容易出错的映射逻辑。这种方式不仅提高了代码的效率和性能，而且保证了类型的安全性。</p><h2 id="_2-什么是dto、do、bo、ao、vo、query" tabindex="-1"><a class="header-anchor" href="#_2-什么是dto、do、bo、ao、vo、query" aria-hidden="true">#</a> 2.什么是DTO、DO、BO、AO、VO、Query</h2><p>在此之前，我们先来认识认识什么是DTO、VO、BO、AO、VO、Query专业名词。</p><p>我们项目中会定义各种Object,如下图所示,我把它们分成了三大类</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202403062005048.png" alt="image-20240306200530976" tabindex="0" loading="lazy"><figcaption>image-20240306200530976</figcaption></figure><h3 id="_2-1-dto" tabindex="-1"><a class="header-anchor" href="#_2-1-dto" aria-hidden="true">#</a> 2.1 DTO</h3><p><strong>Data Transfer Object的简称：</strong> 数据传输对象，Service 或 Manager 向外传输的对象。</p><h3 id="_2-2-do" tabindex="-1"><a class="header-anchor" href="#_2-2-do" aria-hidden="true">#</a> 2.2 DO</h3><p><strong>Data Object的简称：</strong> 此对象与数据库表结构一一对应，通过 DAO 层向上传输数据源对象。</p><h3 id="_2-3-bo" tabindex="-1"><a class="header-anchor" href="#_2-3-bo" aria-hidden="true">#</a> 2.3 BO</h3><p><strong>Business Object的简称：</strong> 业务对象，由 Service 层输出的封装业务逻辑的对象。</p><h3 id="_2-4-ao" tabindex="-1"><a class="header-anchor" href="#_2-4-ao" aria-hidden="true">#</a> 2.4 AO</h3><p><strong>ApplicationObject的简称：</strong> 应用对象，在Web层与Service层之间抽象的复用对象模型， 极为贴近展示层，复用度不高。</p><h3 id="_2-5-vo" tabindex="-1"><a class="header-anchor" href="#_2-5-vo" aria-hidden="true">#</a> 2.5 VO</h3><p><strong>View Object的简称：</strong> 数据传输对象，Service向外传输的对象。</p><h3 id="_2-6-query" tabindex="-1"><a class="header-anchor" href="#_2-6-query" aria-hidden="true">#</a> 2.6 Query</h3><p>数据查询对象，各层接收上层的查询请求。注意超过 2 个参数的查询封装，禁止 使用 Map 类来传输。</p><blockquote><p>最难理解的是BO，大致这么理解：</p><p>BO这个对象可以包括一个或多个其它的对象。</p><p>比如一个简历，有教育经历、工作经历、社会关系等等。</p><p>我们可以把教育经历对应一个PO，工作经历对应一个PO，社会关系对应一个PO。</p><p>建立一个对应简历的BO对象处理简历，每个BO包含这些PO。这样处理业务逻辑时，我们就可以针对BO去处理。</p></blockquote><h3 id="_2-7-示例代码" tabindex="-1"><a class="header-anchor" href="#_2-7-示例代码" aria-hidden="true">#</a> 2.7 示例代码</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Controller</span>层

<span class="token keyword">public</span> <span class="token class-name">List</span> <span class="token function">getUsers</span><span class="token punctuation">(</span><span class="token class-name">UserQuery</span> userQuery<span class="token punctuation">)</span><span class="token punctuation">;</span>

此层常见的转换为：<span class="token constant">DTO</span>转<span class="token constant">VO</span>

<span class="token class-name">Service</span>层

<span class="token comment">// 普通的service层接口</span>

 <span class="token class-name">List</span> <span class="token function">getUsers</span><span class="token punctuation">(</span><span class="token class-name">UserQuery</span> userQuery<span class="token punctuation">)</span><span class="token punctuation">;</span>

然后在<span class="token class-name">Service</span>内部使用<span class="token class-name">UserBO</span>封装中间所需的逻辑对象

<span class="token comment">// 来自前端的请求</span>

 <span class="token class-name">List</span> <span class="token function">getUsers</span><span class="token punctuation">(</span><span class="token class-name">UserAO</span> userAo<span class="token punctuation">)</span><span class="token punctuation">;</span>

此层常见的转换为：<span class="token constant">DO</span>转<span class="token constant">BO</span>、<span class="token constant">BO</span>转<span class="token constant">DTO</span>

<span class="token constant">DAO</span>层

<span class="token class-name">List</span> <span class="token function">getUsers</span><span class="token punctuation">(</span><span class="token class-name">UserQuery</span> userQuery<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-mapstruct的作用" tabindex="-1"><a class="header-anchor" href="#_3-mapstruct的作用" aria-hidden="true">#</a> 3.mapstruct的作用</h2><ol><li><strong>自动生成映射代码：</strong> 通过注解配置，MapStruct 可以在编译时自动生成符合映射规则的 <strong>JavaBean</strong> 映射代码，减少了手动编写代码的工作量。</li><li><strong>类型转换支持：</strong> MapStruct 提供了丰富的类型转换支持，可以处理不同类型之间的映射转换，包括基本类型、集合类型等。</li><li><strong>易于使用：</strong> MapStruct 的注解简单明了，易于理解和配置，同时提供了灵活的定制选项，适应各种复杂映射需求。</li><li><strong>高性能：</strong> 生成的映射代码是高度优化的，性能较高，适用于对性能要求较高的应用场景。</li></ol><h2 id="_4-mapstruct哪点比beanutils好" tabindex="-1"><a class="header-anchor" href="#_4-mapstruct哪点比beanutils好" aria-hidden="true">#</a> 4.mapstruct哪点比BeanUtils好？</h2><ul><li>支持复杂属性赋值</li><li>效率高，在编译时直接给你生成代码，相当与帮你手动去一个个赋值</li><li>支持不同字段间的赋值，通过注解实现</li></ul><p>假如没有使用 MapStruct 的话，当我们需要把 DO 对象转成一个 VO 对象时，我们需要这样做。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">UserInfoVO</span> <span class="token function">originalCopyItem</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span> userDTO<span class="token punctuation">)</span><span class="token punctuation">{</span>
     <span class="token class-name">UserInfoVO</span> userInfoVO <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserInfoVO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     userInfoVO<span class="token punctuation">.</span><span class="token function">setUserName</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     userInfoVO<span class="token punctuation">.</span><span class="token function">setAge</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     userInfoVO<span class="token punctuation">.</span><span class="token function">setBirthday</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">.</span><span class="token function">getBirthday</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     userInfoVO<span class="token punctuation">.</span><span class="token function">setIdCard</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">.</span><span class="token function">getIdCard</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     userInfoVO<span class="token punctuation">.</span><span class="token function">setGender</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">.</span><span class="token function">getGender</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     userInfoVO<span class="token punctuation">.</span><span class="token function">setIsMarried</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">.</span><span class="token function">getIsMarried</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     userInfoVO<span class="token punctuation">.</span><span class="token function">setPhoneNumber</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">.</span><span class="token function">getPhoneNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     userInfoVO<span class="token punctuation">.</span><span class="token function">setAddress</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token keyword">return</span> userInfoVO<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传统的方法一般是采用硬编码，将每个对象的值都逐一设值。当然为了偷懒也会有采用一些BeanUtil简约代码的方式：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token class-name">UserInfoVO</span> <span class="token function">utilCopyItem</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span> userDTO<span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token class-name">UserInfoVO</span> userInfoVO <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserInfoVO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token comment">//采用反射、内省机制实现拷贝</span>
         <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">copyProperties</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">,</span> userInfoVO<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">return</span> userInfoVO<span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，像BeanUtils这类通过反射、内省等实现的框架，在速度上会带来比较严重的影响。尤其是对于一些大字段、大对象而言，这个速度的缺陷就会越明显。针对速度这块我还专门进行了测试，对普通的setter方法、BeanUtils的拷贝以及本次需要介绍的mapperStruct进行了一次对比。得到的耗时结果如下所示：</p><table><thead><tr><th>运行次数</th><th>setter方法耗时</th><th>BeanUtils拷贝耗时</th><th>MapperStruct拷贝耗时</th></tr></thead><tbody><tr><td>1</td><td>2921528（1）</td><td>3973292（1.36）</td><td>2989942（1.023）</td></tr><tr><td>10</td><td>2362724（1）</td><td>66402953（28.10）</td><td>3348099（1.417）</td></tr><tr><td>100</td><td>2500452（1）</td><td>71741323（28.69）</td><td>2120820（0.848）</td></tr><tr><td>1000</td><td>3187151（1）</td><td>157925125（49.55）</td><td>5456290（1.711）</td></tr><tr><td>10000</td><td>5722147（1）</td><td>300814054（52.57）</td><td>5229080（0.913）</td></tr><tr><td>100000</td><td>19324227（1）</td><td>244625923（12.65）</td><td>12932441（0.669）</td></tr></tbody></table><p>以上单位均为毫微秒。括号内的为当前组件同Setter比较的比值。可以看到BeanUtils的拷贝耗时基本为setter方法的<code>十倍、二十倍</code>以上。而MapperStruct方法拷贝的耗时，则与setter方法相近。由此可见，简单的BeanUtils确实会给服务的性能带来很大的压力。而MapperStruct拷贝则可以很好的解决这个问题。</p><h2 id="_5-springboot整合mapstruct" tabindex="-1"><a class="header-anchor" href="#_5-springboot整合mapstruct" aria-hidden="true">#</a> 5.SpringBoot整合mapstruct</h2><h3 id="_5-1-引入pom依赖" tabindex="-1"><a class="header-anchor" href="#_5-1-引入pom依赖" aria-hidden="true">#</a> 5.1 引入pom依赖</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token generics"><span class="token punctuation">&lt;</span>dependencies<span class="token punctuation">&gt;</span></span>
       <span class="token generics"><span class="token punctuation">&lt;</span>dependency<span class="token punctuation">&gt;</span></span>
           <span class="token generics"><span class="token punctuation">&lt;</span>groupId<span class="token punctuation">&gt;</span></span>org<span class="token punctuation">.</span>mapstruct<span class="token operator">&lt;</span><span class="token operator">/</span>groupId<span class="token operator">&gt;</span>
           <span class="token generics"><span class="token punctuation">&lt;</span>artifactId<span class="token punctuation">&gt;</span></span>mapstruct<span class="token operator">&lt;</span><span class="token operator">/</span>artifactId<span class="token operator">&gt;</span>
       <span class="token operator">&lt;</span><span class="token operator">/</span>dependency<span class="token operator">&gt;</span>
       <span class="token generics"><span class="token punctuation">&lt;</span>dependency<span class="token punctuation">&gt;</span></span>
           <span class="token generics"><span class="token punctuation">&lt;</span>groupId<span class="token punctuation">&gt;</span></span>org<span class="token punctuation">.</span>mapstruct<span class="token operator">&lt;</span><span class="token operator">/</span>groupId<span class="token operator">&gt;</span>
           <span class="token generics"><span class="token punctuation">&lt;</span>artifactId<span class="token punctuation">&gt;</span></span>mapstruct<span class="token operator">-</span>processor<span class="token operator">&lt;</span><span class="token operator">/</span>artifactId<span class="token operator">&gt;</span>
       <span class="token operator">&lt;</span><span class="token operator">/</span>dependency<span class="token operator">&gt;</span>
       <span class="token generics"><span class="token punctuation">&lt;</span>dependency<span class="token punctuation">&gt;</span></span>
           <span class="token generics"><span class="token punctuation">&lt;</span>groupId<span class="token punctuation">&gt;</span></span>org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token operator">&lt;</span><span class="token operator">/</span>groupId<span class="token operator">&gt;</span>
           <span class="token generics"><span class="token punctuation">&lt;</span>artifactId<span class="token punctuation">&gt;</span></span>spring<span class="token operator">-</span>boot<span class="token operator">-</span>starter<span class="token operator">-</span>web<span class="token operator">&lt;</span><span class="token operator">/</span>artifactId<span class="token operator">&gt;</span>
       <span class="token operator">&lt;</span><span class="token operator">/</span>dependency<span class="token operator">&gt;</span>
       <span class="token generics"><span class="token punctuation">&lt;</span>dependency<span class="token punctuation">&gt;</span></span>
           <span class="token generics"><span class="token punctuation">&lt;</span>groupId<span class="token punctuation">&gt;</span></span>org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token operator">&lt;</span><span class="token operator">/</span>groupId<span class="token operator">&gt;</span>
           <span class="token generics"><span class="token punctuation">&lt;</span>artifactId<span class="token punctuation">&gt;</span></span>spring<span class="token operator">-</span>boot<span class="token operator">-</span>starter<span class="token operator">-</span>test<span class="token operator">&lt;</span><span class="token operator">/</span>artifactId<span class="token operator">&gt;</span>
       <span class="token operator">&lt;</span><span class="token operator">/</span>dependency<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 不是必要的，哥们只是比较懒      <span class="token operator">--</span><span class="token operator">&gt;</span>
       <span class="token generics"><span class="token punctuation">&lt;</span>dependency<span class="token punctuation">&gt;</span></span>
           <span class="token generics"><span class="token punctuation">&lt;</span>groupId<span class="token punctuation">&gt;</span></span>org<span class="token punctuation">.</span>projectlombok<span class="token operator">&lt;</span><span class="token operator">/</span>groupId<span class="token operator">&gt;</span>
           <span class="token generics"><span class="token punctuation">&lt;</span>artifactId<span class="token punctuation">&gt;</span></span>lombok<span class="token operator">&lt;</span><span class="token operator">/</span>artifactId<span class="token operator">&gt;</span>
       <span class="token operator">&lt;</span><span class="token operator">/</span>dependency<span class="token operator">&gt;</span>
   <span class="token operator">&lt;</span><span class="token operator">/</span>dependencies<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它们的作用如下：</p><ol><li><strong>org.mapstruct:mapstruct：</strong></li></ol><ul><li>MapStruct 的核心库。它提供了 MapStruct 所需的主要注解和工具方法，例如 <strong>@Mapper</strong>, @Mapping 等注解以及 <strong>Mappers.getMapper()</strong> 方法。</li><li>在运行时，这个库是必需的，生成的映射代码会依赖它。</li></ul><ol start="2"><li><strong>org.mapstruct:mapstruct-processor：</strong></li></ol><ul><li><strong>MapStruct</strong> 的注解处理器。它在编译时生成具体的映射实现代码。</li><li><strong>compile</strong> 作用域，意味着它只在编译时被使用。</li><li>当你编译一个使用了 <strong>MapStruct</strong> 注解的项目时，注解处理器会检测你的代码，然后为你的 <strong>@Mapper</strong> 注解的接口或抽象类生成实现。</li></ul><h3 id="_5-2-创建-do、vo" tabindex="-1"><a class="header-anchor" href="#_5-2-创建-do、vo" aria-hidden="true">#</a> 5.2 创建 DO、VO</h3><p>创建实体类Student跟StudentVo</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentVO</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-创建转换器接口" tabindex="-1"><a class="header-anchor" href="#_5-3-创建转换器接口" aria-hidden="true">#</a> 5.3 创建转换器接口</h3><p>定义了一个接口 StudentMapper，该接口的主要作用是将 Student对象转换为 StudentVO对象。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">StudentMapper</span> <span class="token punctuation">{</span>

    <span class="token class-name">StudentMapper</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token class-name">Mappers</span><span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">StudentMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token class-name">StudentVO</span> <span class="token function">tostudentVO</span><span class="token punctuation">(</span><span class="token class-name">Student</span> student<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Mappings</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>source <span class="token operator">=</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> target <span class="token operator">=</span> <span class="token string">&quot;ageVo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>source <span class="token operator">=</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> target <span class="token operator">=</span> <span class="token string">&quot;nameVo&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><p><strong>@Mapper</strong></p><p>这是 MapStruct 的核心注解之一。它标记了这个接口为一个映射器，并告诉 MapStruct 的注解处理器在编译时为此接口生成实现。</p></li><li><p><strong>INSTANCE常量</strong></p><p>Mappers.getMapper 是 MapStruct 提供的一个工具方法，用于在不使用 Spring 或其他依赖注入框架的情况下获取映射器的实例。</p></li></ol><h3 id="_5-4-进行测试" tabindex="-1"><a class="header-anchor" href="#_5-4-进行测试" aria-hidden="true">#</a> 5.4 进行测试</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span><span class="token punctuation">(</span>classes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token class-name">MapStructApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentTest</span> <span class="token punctuation">{</span>


    <span class="token doc-comment comment">/**
     *  用于测试:01
     */</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test01</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Student</span> student <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">StudentVO</span> studentVO <span class="token operator">=</span> <span class="token class-name">StudentMapper</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">.</span><span class="token function">tostudentVO</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;studentVO = &quot;</span> <span class="token operator">+</span> studentVO<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，已经成功将student实体类赋值给StudentVO。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202403062050071.png" alt="image-20240306205022847" tabindex="0" loading="lazy"><figcaption>image-20240306205022847</figcaption></figure><h2 id="_6-mapstruct其他操作" tabindex="-1"><a class="header-anchor" href="#_6-mapstruct其他操作" aria-hidden="true">#</a> 6.mapstruct其他操作</h2><h3 id="_6-1-不同字段映射" tabindex="-1"><a class="header-anchor" href="#_6-1-不同字段映射" aria-hidden="true">#</a> 6.1 不同字段映射</h3><p>我们的实际开发中，原实体类跟我们需要转换的VO的字段名可能不太一样，那这个时候我们该怎么办，mpapstruct是否可以帮我们进行转换呢，我们接着往下聊。</p><p>我们创建第二个VO，名字叫做StudentVo2</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentVO2</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> nameVo<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Integer</span> ageVo<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写mapper转换器，使用@Mappings来映射多个字段不一致情况，如果只有一个字段，使用@mapping即可。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mappings</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>source <span class="token operator">=</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> target <span class="token operator">=</span> <span class="token string">&quot;ageVo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>source <span class="token operator">=</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> target <span class="token operator">=</span> <span class="token string">&quot;nameVo&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token class-name">StudentVO2</span> <span class="token function">tostudentVO2</span><span class="token punctuation">(</span><span class="token class-name">Student</span> student<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-mappings注解" tabindex="-1"><a class="header-anchor" href="#_6-2-mappings注解" aria-hidden="true">#</a> 6.2 @Mappings注解</h3><p>org.mapstruct 包下的 @Mappings 和 @DecoratedWith 注解是 MapStruct 中用于定义映射规则和装饰器的注解。<br> @Mappings 注解用于定义多个 @Mapping 注解，表示多个字段之间的映射关系。@Mapping 注解用于指定源对象和目标对象之间的字段映射关系，例如：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mappings</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>source <span class="token operator">=</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> target <span class="token operator">=</span> <span class="token string">&quot;ageVo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token annotation punctuation">@Mapping</span><span class="token punctuation">(</span>source <span class="token operator">=</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> target <span class="token operator">=</span> <span class="token string">&quot;nameVo&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token class-name">StudentVO2</span> <span class="token function">tostudentVO2</span><span class="token punctuation">(</span><span class="token class-name">Student</span> student<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码中，使用 @Mappings 注解定义了两个 @Mapping 注解，表示 age映射到 ageVo，name映射到 nameVo。</p><h3 id="_6-3-list转换" tabindex="-1"><a class="header-anchor" href="#_6-3-list转换" aria-hidden="true">#</a> 6.3 List转换</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">StudentVO</span><span class="token punctuation">&gt;</span></span> <span class="token function">studentListVo2Dto</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">StudentVO</span><span class="token punctuation">&gt;</span></span> vo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6-4-spring依赖注入" tabindex="-1"><a class="header-anchor" href="#_6-4-spring依赖注入" aria-hidden="true">#</a> 6.4 Spring依赖注入</h3><p>在前面的案例中，我们一直在使用 <strong>Mappers.getMapper</strong> 来获取映射器 INSTANCE</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">StudentMapper</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token class-name">Mappers</span><span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">StudentMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果是在 Spring 环境下，还可以在 <strong>@Mapper</strong> 注解中添加 componentModel = &quot;spring&quot; 参数来告诉 MapStruct 在生成映射实现类的时候，提供 Spring 依赖注入。</p><p>这样我们在使用映射器的时候，可以直接通过 <strong>@Autowired</strong> 注解来注入 ColumnStructMapper 对象，然后就可以直接这样使用。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">StudentMapper</span> studentMapper<span class="token punctuation">;</span>

<span class="token class-name">StudentVO</span> <span class="token function">tostudentVO</span><span class="token punctuation">(</span><span class="token class-name">Student</span> student<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们以后就需要映射器接口中添加 INSTANCE 了。</p><h2 id="_7-mapstruct的idea插件" tabindex="-1"><a class="header-anchor" href="#_7-mapstruct的idea插件" aria-hidden="true">#</a> 7.MapStruct的IDEA插件</h2><p>我们可以通过在Intellij IDEA 中安装MapStruct插件。</p><p>直接点击install即可。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202403062121427.png" alt="image-20240306212122365" tabindex="0" loading="lazy"><figcaption>image-20240306212122365</figcaption></figure><p>安装完成后，可以直接在 <strong>@Mapper</strong> 接口和它的实现类之间快速导航。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202403062127938.png" alt="image-20240306212712842" tabindex="0" loading="lazy"><figcaption>image-20240306212712842</figcaption></figure><p>点击之后，就可以到对应的实体类中了。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202403062133192.png" alt="image-20240306213302904" tabindex="0" loading="lazy"><figcaption>image-20240306213302904</figcaption></figure><h2 id="_8-总结" tabindex="-1"><a class="header-anchor" href="#_8-总结" aria-hidden="true">#</a> 8.总结</h2><p>以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是<strong>Leo</strong>，一个在互联网行业的小白，立志成为更好的自己。</p><p>如果你想了解更多关于<strong>Leo</strong>，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202403062119867.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,89),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","beanutil-copy.html.vue"]]);export{d as default};
