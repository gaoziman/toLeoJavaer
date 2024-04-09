import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as t,c as i,a as e,b as a,d as o,e as r}from"./app-2feb0630.js";const d={},l=r('<h1 id="docker-自定义docker镜像" tabindex="-1"><a class="header-anchor" href="#docker-自定义docker镜像" aria-hidden="true">#</a> Docker | 自定义Docker镜像</h1><h2 id="_1-前言" tabindex="-1"><a class="header-anchor" href="#_1-前言" aria-hidden="true">#</a> 1.前言</h2><p>大家好，我是Leo哥🫣🫣🫣，前面我们学习了Docker的安装以及Docker的基本命令。学会了如何去通过Docker进行服务的安装，比如MySQL，Nginx等。那么大家可以思考一个问题，在之前，我们都是通过使用DockerHub官方提供的镜像，那么我们是否可以自定义镜像，对镜像diy呢，答案是当然可以，这篇文章我们就来学习一些前置知识以及自定义我们的镜像。好了，话不多说让我们开始吧😎😎😎。</p><h2 id="_2-什么是镜像" tabindex="-1"><a class="header-anchor" href="#_2-什么是镜像" aria-hidden="true">#</a> 2.什么是镜像</h2>',4),p={href:"https://www.huaweicloud.com/product/ims.html",target:"_blank",rel:"noopener noreferrer"},u=r('<p>所谓镜像文件其实和ZIP压缩包类似，它将特定的一系列文件按照一定的格式制作成单一的文件，以方便用户下载和使用，例如一个测试版的操作系统、游戏等。镜像文件不仅具有ZIP压缩包的“合成”功能，它最重要的特点是可以被特定的软件识别并可直接刻录到光盘上。其实通常意义上的镜像文件可以再扩展一下，在镜像文件中可以包含更多的信息。比如说系统文件、引导文件、分区表信息等，这样镜像文件就可以包含一个分区甚至是一块硬盘的所有信息。使用这类镜像文件的经典软件就是Ghost，它同样具备刻录功能，不过它的刻录仅仅是将镜像文件本身保存在光盘上，而通常意义上的刻录软件都可以直接将支持的镜像文件所包含的内容刻录到光盘上。</p><p>简单来说，在Docker中镜像就是一个轻量的、独立的软件包。用来打包运行环境和基于运行环境开发的软件。它包含软件运行所需的所有内容（包括代码、运行时、库、环境变量、配置文件）</p><p>所有的应用，打包docker镜像，就可以跑起来。</p><h2 id="_3-docker镜像加载原理" tabindex="-1"><a class="header-anchor" href="#_3-docker镜像加载原理" aria-hidden="true">#</a> 3.Docker镜像加载原理</h2><p>Docker 镜像是构建 Docker 容器的基础，它是一个轻量级、可执行的独立软件包，包括运行应用所需要的所有内容——代码、运行时、库、环境变量和配置文件。接下来，我将详细介绍 Docker 镜像的加载原理。</p><h3 id="_3-1-docker-镜像的分层" tabindex="-1"><a class="header-anchor" href="#_3-1-docker-镜像的分层" aria-hidden="true">#</a> 3.1 Docker 镜像的分层</h3><p>Docker 镜像采用了层叠的文件系统，这意味着镜像由一系列只读的层组成。这样做的好处是重用和共享，若干个镜像可以共享相同的层，节省磁盘空间和加速镜像下载。</p><ul><li><strong>基础层</strong>: 所有镜像的第一层，通常是一个最小化的操作系统环境，如 Ubuntu 或 Alpine。</li><li><strong>依赖层</strong>: 包含应用程序运行所需的依赖、库文件等。</li><li><strong>应用层</strong>: 包括应用程序的代码和资源文件。</li></ul><p>当你构建一个镜像时，每个指令（如 <code>RUN</code>, <code>COPY</code>, <code>ADD</code> 等）都会在现有镜像层之上创建一个新的层。</p><h3 id="_3-2-镜像加载过程" tabindex="-1"><a class="header-anchor" href="#_3-2-镜像加载过程" aria-hidden="true">#</a> 3.2 镜像加载过程</h3><p>实际加载和运行 Docker 镜像的过程包含以下几个关键步骤：</p><ol><li><strong>拉取镜像</strong>: 当你使用 <code>docker run</code> 命令运行一个容器时，如果本地没有指定的镜像，Docker 将从 Docker Hub 或其他配置的镜像仓库拉取镜像。</li><li><strong>镜像解压与加载</strong>: Docker 会将拉取的镜像文件解压到磁盘上，并按照镜像层的顺序将它们组合起来。</li><li><strong>Union File System</strong>: Docker 使用 UnionFS 把各层联合成一个统一的文件系统。多个只读层被叠加在一起，最顶部通常是一个可以写入的层，即容器层。</li><li><strong>运行容器</strong>: 加载镜像后，Docker 可以在这个统一文件系统的基础上创建并启动一个新容器。</li><li><strong>容器层动态写入</strong>: 容器运行后，对文件系统的所有更改都会发生在容器层。这些更改与下面的只读镜像层隔离开来，从而不会影响到基础镜像本身。</li><li><strong>存储和缓存</strong>: 镜像层被拉取到本地之后，会被存储在本地的 Docker 宿主机上。当再次运行同样的镜像时，Docker 会使用这些已经存在的层来加速容器的运行。</li></ol><h3 id="_3-3-优化读取速度和资源利用" tabindex="-1"><a class="header-anchor" href="#_3-3-优化读取速度和资源利用" aria-hidden="true">#</a> 3.3 优化读取速度和资源利用</h3><p>Docker 的设计允许多个容器共享同一个基础镜像，这使得部署多个容器更加高效。例如，如果10个容器都基于同一个操作系统镜像，那么在磁盘上只需要有一个该操作系统镜像的副本，各个容器只需创建自己特有的容器层即可。</p><p>另外，Union File System 是增量的，这意味着只有当文件层发生改变时才需要额外存储空间。未被修改的部分仍然共享相同的物理存储空间。结合容器层的设计，这提供了高效的文件操作性能，同时确保了容器之间的文件系统隔离。</p><p>总体来说，Docker 使用一种分层的方式来管理和加载镜像，这种方法带给了 Docker 镜像和容器之间的高效能力和灵活性。通过缓存，共享层和增量更新。</p><h2 id="_4-docker中的分层" tabindex="-1"><a class="header-anchor" href="#_4-docker中的分层" aria-hidden="true">#</a> 4. Docker中的分层</h2><p>下面我们就以 CentOS 发行版的 <code>overlay2</code> 文件系统进行介绍，其实不管是什么发行版，其远离都如出一辙。</p>',18),h={href:"https://docs.docker.com/storage/storagedriver/overlayfs-driver/",target:"_blank",rel:"noopener noreferrer"},k=r(`<p>先来看张图：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311281622980.png" alt="image-20231128162209929" tabindex="0" loading="lazy"><figcaption>image-20231128162209929</figcaption></figure><p>从上图中的右边可以看到 OverlayFS 中有三个层级结构：<code>lowerdir</code>、<code>upperdir</code>、<code>merged</code> 层。</p><p>对应的，使用 <code>docker inspect [container-id]</code> 就可以看到这几个层所在的位置：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token string">&quot;GraphDriver&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;Name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;overlay2&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;LowerDir&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/var/lib/docker/overlay2/45abab78c6fd022d9ce132a0fb995f9e91bc0a807ccc73e2461fce6c9b68b250/root&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;MergedDir&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/var/lib/docker/overlay2/dc838cbc7d903a4bfd6bd0280a6910c063f2d1f03439e917ebc773fccc377402/merged&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;UpperDir&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/var/lib/docker/overlay2/dc838cbc7d903a4bfd6bd0280a6910c063f2d1f03439e917ebc773fccc377402/upper&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;WorkDir&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/var/lib/docker/overlay2/dc838cbc7d903a4bfd6bd0280a6910c063f2d1f03439e917ebc773fccc377402/work&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>docker镜像都是只读的，当容器启动时，一个新的可写层被加到镜像的顶部。</p><p>这一层就是我们通常说的<strong>容器层</strong>，容器之下的都叫<strong>镜像层</strong>。</p><h2 id="_5-自定义镜像" tabindex="-1"><a class="header-anchor" href="#_5-自定义镜像" aria-hidden="true">#</a> 5.自定义镜像</h2><h3 id="_5-1-准备" tabindex="-1"><a class="header-anchor" href="#_5-1-准备" aria-hidden="true">#</a> 5.1 准备</h3><p>首先本地准备一个服务jar包，Redis或者MySQL都可以。</p><h3 id="_5-2-通过容器转镜像" tabindex="-1"><a class="header-anchor" href="#_5-2-通过容器转镜像" aria-hidden="true">#</a> 5.2 通过容器转镜像</h3><p>使用以下命令进行转换</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker commit  容器ID 镜像名称：版本号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker save -o 压缩文件名称  镜像名称：版本号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后通过以下命令加载一下即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker load -i 压缩文件名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样就大功告成了！</p><p>其实这样方式我们使用的并不大，我们今天这里只是简单了解一下，后面我们会详细讲解另一种方式<strong>dockfile</strong>。</p><h2 id="_6-文章参考" tabindex="-1"><a class="header-anchor" href="#_6-文章参考" aria-hidden="true">#</a> 6.文章参考</h2>`,19),g={href:"https://docs.docker.com/engine/install/centos/#install-from-a-package",target:"_blank",rel:"noopener noreferrer"},m={href:"https://docs.docker.com/engine/reference/commandline/cli/",target:"_blank",rel:"noopener noreferrer"},v=e("h2",{id:"_7-总结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_7-总结","aria-hidden":"true"},"#"),a(" 7.总结")],-1),b=e("p",null,[a("以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是"),e("strong",null,"Leo"),a("，一个在互联网行业的小白，立志成为更好的自己。")],-1),_=e("p",null,[a("如果你想了解更多关于"),e("strong",null,"Leo"),a("，可以关注微信公众号-程序员Leo，后面文章会首先同步至公众号。")],-1),f=e("figure",null,[e("img",{src:"https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311281615389.png",alt:"公众号封面",tabindex:"0",loading:"lazy"}),e("figcaption",null,"公众号封面")],-1);function D(x,q){const n=c("ExternalLinkIcon");return t(),i("div",null,[l,e("p",null,[e("a",p,[a("镜像 "),o(n)]),a("（Mirroring）是一种文件存储形式，是冗余的一种类型，一个磁盘上的数据在另一个磁盘上存在一个完全相同的副本即为镜像。可以把许多文件做成一个镜像文件，与GHOST等程序放在一个盘里用GHOST等软件打开后，又恢复成许多文件，RAID 1和RAID 10使用的就是镜像。常见的镜像文件格式有ISO、BIN、IMG、TAO、DAO、CIF、FCD。")]),u,e("p",null,[a("overlayer2 官方介绍： "),e("a",h,[a("https://docs.docker.com/storage/storagedriver/overlayfs-driver/"),o(n)])]),k,e("ul",null,[e("li",null,[e("a",g,[a("https://docs.docker.com/engine/install/centos/#install-from-a-package"),o(n)])]),e("li",null,[e("a",m,[a("https://docs.docker.com/engine/reference/commandline/cli/"),o(n)])])]),v,b,_,f])}const L=s(d,[["render",D],["__file","custom-docker-images.html.vue"]]);export{L as default};
