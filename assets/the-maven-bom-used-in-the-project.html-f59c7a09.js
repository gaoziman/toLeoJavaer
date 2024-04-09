import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,e as t}from"./app-2feb0630.js";const p={},e=t(`<h1 id="项目中使用之maven-bom" tabindex="-1"><a class="header-anchor" href="#项目中使用之maven-bom" aria-hidden="true">#</a> 项目中使用之Maven BOM</h1><h2 id="_1-什么是bom" tabindex="-1"><a class="header-anchor" href="#_1-什么是bom" aria-hidden="true">#</a> 1.什么是BOM</h2><p>在 Maven 中，BOM 是“Bill Of Materials”（物料清单）的缩写。它是 Maven 项目管理中使用的一种特殊类型的 POM（Project Object Model）文件，通常用来提供一组有共同版本管理的依赖列表。</p><p>BOM全称是<code>Bill Of Materials</code>，译作材料清单。BOM本身并不是一种特殊的文件格式，而是一个普通的POM文件，只是在这个POM中，我们罗列的是一个工程的所有依赖和其对应的版本。该文件一般被其它工程使用，当其它工程引用BOM中罗列的jar包时，不用显示指定具体的版本，会自动使用BOM对应的jar版本。</p><p>所以BOM的好处是用来管理一个工程的所有依赖版本信息。</p><h2 id="_2-bom的简单格式" tabindex="-1"><a class="header-anchor" href="#_2-bom的简单格式" aria-hidden="true">#</a> 2.BOM的简单格式</h2><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">&gt;</span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.javatop<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>BOMtest<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>0.0.1-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>packaging</span><span class="token punctuation">&gt;</span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>packaging</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>BOMtest<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>description</span><span class="token punctuation">&gt;</span></span>parent pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>description</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>a<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>b<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>compile<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>c<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>compile<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中定义的关键信息是</p><ul><li><code>&lt;packaging&gt;pom&lt;/packaging&gt;</code>打包方式是pom文件</li><li><code>&lt;dependencyManagement&gt;&lt;dependencies&gt;</code>下定义的各种依赖的版本</li></ul><h2 id="_3-bom的好处" tabindex="-1"><a class="header-anchor" href="#_3-bom的好处" aria-hidden="true">#</a> 3.BOM的好处</h2><ul><li>减少了版本冲突的风险，特别是当你使用许多相互依赖的库时。</li><li>简化了项目依赖的升级过程，只需在 BOM 文件中更新依赖版本，所有引用该 BOM 的项目都会使用新版本。</li><li>在企业环境中，BOM 可以提供一个企业级标准的依赖版本集合。</li></ul><h2 id="_4-bom的目的" tabindex="-1"><a class="header-anchor" href="#_4-bom的目的" aria-hidden="true">#</a> 4.BOM的目的</h2><ol><li><strong>集中依赖版本管理</strong>：在多模块项目中，或者在需要共享相同依赖集的不同项目之间，BOM 允许统一管理依赖的版本，这样你可以确保所有项目或子模块使用的都是相同版本的依赖库。</li><li><strong>简化依赖定义</strong>：项目可以通过引用 BOM 来避免在每个项目的 POM 文件中重复定义依赖版本，减少重复并使依赖管理变得更加清晰。</li></ol><h2 id="_5-如何使用bom" tabindex="-1"><a class="header-anchor" href="#_5-如何使用bom" aria-hidden="true">#</a> 5.如何使用BOM</h2><p>当你想在你的项目中使用 BOM 时，你可以在项目的 POM 文件里像下面这样声明它：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://maven.apache.org/POM/4.0.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">&gt;</span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">&gt;</span></span>

    <span class="token comment">&lt;!-- ... other settings ... --&gt;</span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.mycompany<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>my-bom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>import<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">&gt;</span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-通过dependencymanagement" tabindex="-1"><a class="header-anchor" href="#_5-1-通过dependencymanagement" aria-hidden="true">#</a> 5.1 通过dependencyManagement</h3><p>parent只能指定一个BOM。如果我还想引入一个或多个BOM，这个时候，就可以使用<code>&lt;dependencyManagement&gt;</code>配置。也即<code>&lt;dependencyManagement&gt;</code> 不光可以用来定义BOM本身的依赖清单，也可以用作BOM的引入。因为dependencyManagement本身是做依赖管理的，Jar是一种依赖，BOM当然也是一种依赖</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312062222934.png" alt="image-20231206222204858" tabindex="0" loading="lazy"><figcaption>image-20231206222204858</figcaption></figure><h3 id="_5-2-使用" tabindex="-1"><a class="header-anchor" href="#_5-2-使用" aria-hidden="true">#</a> 5.2 使用</h3><p>那么如何在其他模块中使用呢，非常简单，因为我们父依赖中引入了并管理了依赖版本。</p><p>我们子模块可以直接引用依赖即可，就不需要再引入版本了。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312062226253.png" alt="image-20231206222608187" tabindex="0" loading="lazy"><figcaption>image-20231206222608187</figcaption></figure><h3 id="_5-3-怎么查看依赖的bom的具体清单" tabindex="-1"><a class="header-anchor" href="#_5-3-怎么查看依赖的bom的具体清单" aria-hidden="true">#</a> 5.3 怎么查看依赖的BOM的具体清单</h3><p>由于BOM不是一个jar包，所以你没办法在idea的依赖libary中看看到该文件</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312062222092.png" alt="image-20231206222244058" tabindex="0" loading="lazy"><figcaption>image-20231206222244058</figcaption></figure><h2 id="_6-版本冲突的一些规则" tabindex="-1"><a class="header-anchor" href="#_6-版本冲突的一些规则" aria-hidden="true">#</a> 6.版本冲突的一些规则</h2><p>当出现版本冲突时，具体使用哪一个版本的优先顺序是</p><ul><li>直接在当前工程中显示指定的版本</li><li>parent中配置的父工程使用的版本</li><li>在当前工程中通过dependencyManagement引入的BOM清单中的版本，当引入的多个BOM都有对应jar包时，先引入的BOM生效</li><li>上述三个地方都没配置，则启用依赖调解dependency mediation</li></ul><h2 id="_7-总结" tabindex="-1"><a class="header-anchor" href="#_7-总结" aria-hidden="true">#</a> 7.总结</h2><p>以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是<strong>Leo</strong>，一个在互联网行业的小白，立志成为更好的自己。</p><p>如果你想了解更多关于<strong>Leo</strong>，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312062226288.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,33),c=[e];function o(l,i){return a(),s("div",null,c)}const k=n(p,[["render",o],["__file","the-maven-bom-used-in-the-project.html.vue"]]);export{k as default};