import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as p,c,a as n,b as a,d as t,e}from"./app-2feb0630.js";const l={},u=e('<h1 id="springsecurity6-自定义认证规则" tabindex="-1"><a class="header-anchor" href="#springsecurity6-自定义认证规则" aria-hidden="true">#</a> SpringSecurity6 | 自定义认证规则</h1><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312091750103.png" alt="image-20231030235443828" tabindex="0" loading="lazy"><figcaption>image-20231030235443828</figcaption></figure><h2 id="_1-前言" tabindex="-1"><a class="header-anchor" href="#_1-前言" aria-hidden="true">#</a> 1.前言</h2>',3),r={href:"https://gaoziman.blog.csdn.net/article/details/134864581",target:"_blank",rel:"noopener noreferrer"},d=e('<h2 id="_2-环境搭建" tabindex="-1"><a class="header-anchor" href="#_2-环境搭建" aria-hidden="true">#</a> 2.环境搭建</h2><p>本篇我们开始搭建一个新的模块，并取名为custom。具体搭建过程大家可以自行搭建，我这里就不在赘述了哈。</p><p>我已经搭建好了基本工程，并定义好了两个接口，以及自定义我们的登录用户名以及密码。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312091758147.png" alt="image-20231209175808107" tabindex="0" loading="lazy"><figcaption>image-20231209175808107</figcaption></figure><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312091758866.png" alt="image-20231209175827845" tabindex="0" loading="lazy"><figcaption>image-20231209175827845</figcaption></figure><p>下面我们直接启动SpringBoot工程。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312091759271.png" alt="image-20231209175918237" tabindex="0" loading="lazy"><figcaption>image-20231209175918237</figcaption></figure>',7),k={href:"http://localhost:8600/test%E8%AE%BF%E9%97%AEtest%E6%8E%A5%E5%8F%A3",target:"_blank",rel:"noopener noreferrer"},g={href:"http://localhost:8600/hello%E8%AE%BF%E9%97%AEhello%E6%8E%A5%E5%8F%A3",target:"_blank",rel:"noopener noreferrer"},h=e(`<p>发现他都经过认证，至此我们基本环境介绍就到这里。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312091936305.png" alt="image-20231209193647262" tabindex="0" loading="lazy"><figcaption>image-20231209193647262</figcaption></figure><h2 id="_3-自定义规则" tabindex="-1"><a class="header-anchor" href="#_3-自定义规则" aria-hidden="true">#</a> 3.自定义规则</h2><h3 id="_3-1-概述" tabindex="-1"><a class="header-anchor" href="#_3-1-概述" aria-hidden="true">#</a> 3.1 概述</h3><p>在SpringSecurity6中，我们原本在原来SpringSecurity实现的方法已经被抛弃,已经完全不能用了。我们在SpringSecurity6可以这样进行实现。</p><ol><li>首先自定义一个配置类，我这里命名为MySecurityConfig.java。</li><li>然后实现@EnableWebSecurity注解，并向Spring中注入一个Bean对象SecurityFilterChain。</li><li>后面我们都是通过这样实现方式的。</li><li>最后我们就可以开始自定义我们的规则了。</li></ol><h3 id="_3-2-规则" tabindex="-1"><a class="header-anchor" href="#_3-2-规则" aria-hidden="true">#</a> 3.2 规则</h3><ol><li>放行hello接口。</li><li>除了hello接口，其他接口都需要进行认证。</li><li>开启表单认证。</li></ol><p><strong>直接上代码。</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>javatop<span class="token punctuation">.</span>custom<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>web<span class="token punctuation">.</span>builders<span class="token punctuation">.</span></span><span class="token class-name">HttpSecurity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>web<span class="token punctuation">.</span>configuration<span class="token punctuation">.</span></span><span class="token class-name">EnableWebSecurity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>web<span class="token punctuation">.</span></span><span class="token class-name">SecurityFilterChain</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : Leo
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023-12-09 17:45
 * <span class="token keyword">@description</span> :
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableWebSecurity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MySecurityConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">securityFilterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        http<span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 放行改资源，不用认证可以直接访问</span>
                <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 所有请求都需要认证</span>
                <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 开启表单登录</span>
        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后我们重启项目然后看效果是不是按照我们配置这样的。</p>`,11),m={href:"http://localhost:8600/hello%E6%8E%A5%E5%8F%A3%EF%BC%8C%E5%8F%91%E7%8E%B0%E7%A1%AE%E5%AE%9E%E6%B2%A1%E6%9C%89%E9%80%9A%E8%BF%87%E8%AE%A4%E8%AF%81%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E8%AE%BF%E9%97%AE%EF%BC%8C%E8%AF%B4%E6%98%8E%E6%88%91%E4%BB%AC%E7%9A%84%E9%85%8D%E7%BD%AE%E7%B1%BB%E7%94%9F%E6%95%88%E4%BA%86%E3%80%82",target:"_blank",rel:"noopener noreferrer"},E=n("figure",null,[n("img",{src:"https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312091945185.png",alt:"image-20231209194520148",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20231209194520148")],-1),f={href:"http://localhost:8600/test%E6%8E%A5%E5%8F%A3%EF%BC%8C%E5%8F%91%E7%8E%B0%E6%88%91%E4%BB%AC%E9%9C%80%E8%A6%81%E8%BF%9B%E8%A1%8C%E7%99%BB%E5%BD%95%E8%AE%A4%E8%AF%81%E4%B9%8B%E5%90%8E%E6%89%8D%E5%8F%AF%E4%BB%A5%E8%AE%BF%E9%97%AE%E3%80%82",target:"_blank",rel:"noopener noreferrer"},v=e('<figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312091948929.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-3-拓展" tabindex="-1"><a class="header-anchor" href="#_3-3-拓展" aria-hidden="true">#</a> 3.3 拓展</h3><p>当然也不是需要通过一个一个加然后进行配置，我们如果需要放行多个接口，我们可以通过进行以下配置。</p><p>直接在后面加上你需要放行的接口路径即可。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312091950858.png" alt="image-20231209195016819" tabindex="0" loading="lazy"><figcaption>image-20231209195016819</figcaption></figure><h2 id="_4-总结" tabindex="-1"><a class="header-anchor" href="#_4-总结" aria-hidden="true">#</a> 4.总结</h2><p>以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是<strong>Leo</strong>，一个在互联网行业的小白，立志成为更好的自己。</p><p>如果你想了解更多关于<strong>Leo</strong>，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312091933656.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>',9);function b(y,_){const s=i("ExternalLinkIcon");return p(),c("div",null,[u,n("p",null,[a("大家好，我是Leo哥🫣🫣🫣，接到"),n("a",r,[a("上一节"),t(s)]),a("，我们学习了如何修改SpringSecurity默认用户，使用我们自己的自定义的用户名和密码来进行认证登录。但是有时候我们的开发者可能并不是所有的接口都需要进行拦截，就比如，登录，注册接口等这些是不是要进行拦截的，那么如何修改并自定义这些规则。没错这就是我们本节的重点。好了，话不多说让我们开始吧😎😎😎。")]),d,n("p",null,[a("通过"),n("a",k,[a("http://localhost:8600/test访问test接口"),t(s)])]),n("p",null,[a("通过"),n("a",g,[a("http://localhost:8600/hello访问hello接口"),t(s)])]),h,n("p",null,[a("首先访问"),n("a",m,[a("http://localhost:8600/hello接口，发现确实没有通过认证可以直接访问，说明我们的配置类生效了。"),t(s)])]),E,n("p",null,[a("然后访问"),n("a",f,[a("http://localhost:8600/test接口，发现我们需要进行登录认证之后才可以访问。"),t(s)])]),v])}const z=o(l,[["render",b],["__file","default-rules.html.vue"]]);export{z as default};
