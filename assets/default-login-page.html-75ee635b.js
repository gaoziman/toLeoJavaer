import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as c,c as l,a as n,b as e,d as i,e as o}from"./app-2feb0630.js";const r={},p=o('<h1 id="springsecurity6-默认登录页" tabindex="-1"><a class="header-anchor" href="#springsecurity6-默认登录页" aria-hidden="true">#</a> SpringSecurity6 | 默认登录页</h1><h2 id="_1-前言" tabindex="-1"><a class="header-anchor" href="#_1-前言" aria-hidden="true">#</a> 1.前言</h2><p>大家好，我是Leo哥🫣🫣🫣，前面我们学习了有关SpringSecurity在SpringBoot项目中是如何给我进行自动的添加鉴权功能，简单复习了一下SpirngBoot的自动配置。接下来我们就接着学习SpringSecurity相关知识点。这一节我们将要学习SpringSecurity中默认的登录页面是如何实现的。好了，话不多说让我们开始吧😎😎😎。</p><h2 id="_2-涉及过滤器" tabindex="-1"><a class="header-anchor" href="#_2-涉及过滤器" aria-hidden="true">#</a> 2.涉及过滤器</h2>',4),d={href:"https://gaoziman.blog.csdn.net/article/details/134282404?spm=1001.2014.3001.5502",target:"_blank",rel:"noopener noreferrer"},g=o('<ul><li><p>首先是<code>UsernamePasswordAuthenticationFilter</code>，他主要根据用户名和密码进行认证的。</p></li><li><p>然后就是<code>DefaultLoginPageGeneratingFilter</code>，它主要负责默认登录页面的生成。</p></li><li><p><code>ExceptionTranslationFilter</code>，他主要负责SpringSecurity处理认证过程中发生的异常。</p></li><li><p>最后就是<code>AuthorizationFilter</code>，主要是处理用户的访问认证处理，只有当访问认证通过了，该请求才会被通过。</p></li></ul><h2 id="_3-登录页面渲染流程" tabindex="-1"><a class="header-anchor" href="#_3-登录页面渲染流程" aria-hidden="true">#</a> 3.登录页面渲染流程</h2><p>我们要想知道一个请求是如何被SpringSecurity中一步一步拦截，并生成默认的登录页面的话，我们就必须知道当我们的请求经过SpringSecurity中如何被过滤器拦截，就要知道他的细节。下面我通过一张图来带大家了解，一个请求发出后，在SpringSecurity内部是如何运作的。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192201055.png" alt="image-20231119220128982" tabindex="0" loading="lazy"><figcaption>image-20231119220128982</figcaption></figure><p><strong>页面渲染力流程：</strong></p>',5),u={href:"http://localhost:8500/hello,%E4%BC%9A%E7%BB%8F%E8%BF%87%E8%BF%87%E4%B8%AA%E8%BF%87%E6%BB%A4%E5%99%A8%E8%BF%9B%E8%A1%8C%E8%BF%87%E6%BB%A4%E6%8B%A6%E6%88%AA%E3%80%82",target:"_blank",rel:"noopener noreferrer"},h=n("li",null,[e("当请求到达AuthorizationFilter时，系统会检查是否该请求是否进行了认证，如何未认证，则会将该请求拦截下来，并抛出"),n("code",null,"AccessDenieException"),e("异常。")],-1),m=n("li",null,[e("抛出的"),n("code",null,"AccessDenieException"),e("异常会被ExceptionTranslationFilter破获并启动身份验证，在这个Filter中会调用LoginUrlAuthenticationEntrypoint的commence()方法，并要求重定向到/login页面中去。")],-1),f=n("li",null,"重定向到/login页面，也就是客户端发送的/loginq请求。",-1),_=n("li",null,[e("/login请求会被过滤器"),n("code",null,"DefaultLoginPageGeneratingFilter"),e("进行拦截，并在过滤器中返回默认的登录页面。")],-1),k=o(`<h2 id="_4-重定向登录页" tabindex="-1"><a class="header-anchor" href="#_4-重定向登录页" aria-hidden="true">#</a> 4.重定向登录页</h2><p>那么上面流程是这么说的，流程图是这么画的，如何验证我们的猜想呢，下面就跟着Leo哥视角，去写一个测试，通过源码追踪的方式去验证我们的猜想。</p><p>首先添加一个访问测试接口：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/test&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Hello SpringSecurity6&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>未登录时访问接口，会 <strong>重定向到登录页</strong>，流程图如下说示：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192227103.png" alt="image-20231119222738018" tabindex="0" loading="lazy"><figcaption>image-20231119222738018</figcaption></figure><p>流程图说明：</p><ol><li>一个用户向其未被授权的资源（<code>/test</code>）发出一个未经认证的请求。</li><li>请求进入<code>SecurityFilterChain</code>开始执行过滤器，在<code>AuthorizationFilter</code>中校验不通过，抛出一个<code>AccessDeniedException</code>。</li><li><code>ExceptionTranslationFilter </code>捕获到异常，调用<code>LoginUrlAuthenticationEntryPoint </code>重定向到<code>/login</code>。</li><li>重定向的<code>/login</code>发起请求进入过滤器</li><li><code>/login</code>会被<code>DefaultLoginPageGeneratingFilter</code>处理，直接响应写出默认登录页。</li></ol><h3 id="_4-1-抛出-accessdeniedexception" tabindex="-1"><a class="header-anchor" href="#_4-1-抛出-accessdeniedexception" aria-hidden="true">#</a> 4.1 抛出 AccessDeniedException</h3>`,9),v={href:"https://gaoziman.blog.csdn.net/article/details/134282404?spm=1001.2014.3001.5502",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"FilterChainProxy",-1),y=n("code",null,"SecurityFilterChain",-1),z=n("code",null,"/test",-1),x=o(`<figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192229694.png" alt="image-20231119222914647" tabindex="0" loading="lazy"><figcaption>image-20231119222914647</figcaption></figure><p>在通过最后一个过滤器<code>AuthorizationFilter</code>中，对当前请求做最后的权限校验，如果没有权限，则会抛出<code>AccessDeniedException</code>：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192229882.png" alt="image-20231119222957823" tabindex="0" loading="lazy"><figcaption>image-20231119222957823</figcaption></figure><p>首先<code>AuthorizationFilter</code>会取出当前用户认证信息，因为当前请求未认证，用户为<code>AnonymousAuthenticationFilter</code>创建的<strong>匿名用户</strong>：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192231149.png" alt="image-20231119223120045" tabindex="0" loading="lazy"><figcaption>image-20231119223120045</figcaption></figure><p>接着使用<code>AuthorizationManager</code>授权管理器对当前认证信息检查，因为是<strong>匿名用户</strong>，所以判定当前请求无权访问，抛出<code>AccessDeniedException</code>：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192233539.png" alt="image-20231119223320474" tabindex="0" loading="lazy"><figcaption>image-20231119223320474</figcaption></figure><h3 id="_4-2-异常处理" tabindex="-1"><a class="header-anchor" href="#_4-2-异常处理" aria-hidden="true">#</a> 4.2 异常处理</h3><p>抛出的<code>AccessDeniedException</code>异常会被<code>ExceptionTranslationFilter</code>捕获：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192234057.png" alt="image-20231119223453928" tabindex="0" loading="lazy"><figcaption>image-20231119223453928</figcaption></figure><p><code>ExceptionTranslationFilter</code>根据异常类型进行相应处理：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192235571.png" alt="image-20231119223543539" tabindex="0" loading="lazy"><figcaption>image-20231119223543539</figcaption></figure><p>接着调用<code>handleAccessDeniedException</code>：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192236930.png" alt="image-20231119223648856" tabindex="0" loading="lazy"><figcaption>image-20231119223648856</figcaption></figure><p>接着调用<code>sendStartAuthentication</code>缓存请求，并调用<code>AuthenticationEntryPoint</code>生成认证入口：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192236173.png" alt="image-20231119223625130" tabindex="0" loading="lazy"><figcaption>image-20231119223625130</figcaption></figure><h3 id="_4-3-重定向" tabindex="-1"><a class="header-anchor" href="#_4-3-重定向" aria-hidden="true">#</a> 4.3 重定向</h3><p>接着调用到<code>LoginUrlAuthenticationEntryPoint</code>的commence进行<strong>重定向</strong>或者<strong>转发</strong>：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192238245.png" alt="image-20231119223801209" tabindex="0" loading="lazy"><figcaption>image-20231119223801209</figcaption></figure><h3 id="_4-4-生成默认登录页面" tabindex="-1"><a class="header-anchor" href="#_4-4-生成默认登录页面" aria-hidden="true">#</a> 4.4 生成默认登录页面</h3><p>在经过<code>DefaultLoginPageGeneratingFilter</code>时，进行<strong>默认登录页</strong>处理，在该过滤器中，维护了很多参数：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token comment">// 登录页地址，默认/login</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> loginPageUrl<span class="token punctuation">;</span>
    <span class="token comment">// 登出成功页地址，默认/login?logout</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> logoutSuccessUrl<span class="token punctuation">;</span>
    <span class="token comment">// 登录错误页地址，默认/login?error</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> failureUrl<span class="token punctuation">;</span>
    <span class="token comment">// 是否开启表单登录</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> formLoginEnabled<span class="token punctuation">;</span>
    <span class="token comment">// 是否开启oauth2登录</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> oauth2LoginEnabled<span class="token punctuation">;</span>
    <span class="token comment">// 是否开启saml2登录</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> saml2LoginEnabled<span class="token punctuation">;</span>
    <span class="token comment">// 认证请求地址，默认/login</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> authenticationUrl<span class="token punctuation">;</span>
    <span class="token comment">// 用户名参数，默认username</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> usernameParameter<span class="token punctuation">;</span>
    <span class="token comment">// 密码参数，默认password</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> passwordParameter<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重定向的<code>GET /login</code>请求则会进入<strong>生成登录页</strong>逻辑，调用<code>response</code>直接输出一个页面，并<code>return</code>不再执行后续操作：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192239728.png" alt="image-20231119223919693" tabindex="0" loading="lazy"><figcaption>image-20231119223919693</figcaption></figure><p>那么这个LoginPageHtml是啥呢，其实大家到这里已经可以猜到了，没错就是我们的默认登录页面的HTML，被拼接成了String字符串，最后通过response写出。</p><p>我们可以点进去generateLoginPageHtml()这个方法中去查看。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192241389.png" alt="image-20231119224144289" tabindex="0" loading="lazy"><figcaption>image-20231119224144289</figcaption></figure><p>没错，就是我们熟悉的HTML，然后通过StringBuilder拼接然后返回。</p><p>最后，我们默认的登录页面就在前端浏览器进行了展示。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311192243976.png" alt="image-20231119224305949" tabindex="0" loading="lazy"><figcaption>image-20231119224305949</figcaption></figure><h2 id="_5-参考文献" tabindex="-1"><a class="header-anchor" href="#_5-参考文献" aria-hidden="true">#</a> 5.参考文献</h2>`,31),S={href:"https://springdoc.cn/spring-security/servlet/architecture.html",target:"_blank",rel:"noopener noreferrer"},E={href:"http://springboot.fun/",target:"_blank",rel:"noopener noreferrer"},L=n("h2",{id:"_6-总结",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_6-总结","aria-hidden":"true"},"#"),e(" 6.总结")],-1),A=n("p",null,[e("以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是"),n("strong",null,"Leo"),e("，一个在互联网行业的小白，立志成为更好的自己。")],-1),P=n("p",null,[e("如果你想了解更多关于"),n("strong",null,"Leo"),e("，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。")],-1),F=n("figure",null,[n("img",{src:"https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311301345907.png",alt:"公众号封面",tabindex:"0",loading:"lazy"}),n("figcaption",null,"公众号封面")],-1);function B(w,D){const a=t("ExternalLinkIcon");return c(),l("div",null,[p,n("p",null,[e("在在"),n("a",d,[e("SpringSecurity6核心过滤器"),i(a)]),e("中，我们有介绍到当SpringBoot项目启动后，SpringSecurity一共有15个过滤器默认自启动。那么我们请求发出到渲染出默认登录页面这个过程又设计到几个过滤器呢，接下来我们简单介绍一下。")]),g,n("ol",null,[n("li",null,[e("访问地址 "),n("a",u,[e("http://localhost:8500/hello,会经过过个过滤器进行过滤拦截。"),i(a)])]),h,m,f,_]),k,n("p",null,[e("访问上述接口地址，在"),n("a",v,[e("SpringSecurity6核心过滤器"),i(a)]),e("中，有介绍请求最开始是到达"),b,e("，由它来调用"),y,e("中的过滤器，"),z,e("是没有经过认证的，依次通过下述所有过滤器。")]),x,n("ul",null,[n("li",null,[n("a",S,[e("https://springdoc.cn/spring-security/servlet/architecture.html"),i(a)])]),n("li",null,[n("a",E,[e("http://springboot.fun/"),i(a)])])]),L,A,P,F])}const j=s(r,[["render",B],["__file","default-login-page.html.vue"]]);export{j as default};
