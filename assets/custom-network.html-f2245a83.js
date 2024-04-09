import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as r,c as o,a as e,b as n,d as t,e as i}from"./app-2feb0630.js";const c={},a=i(`<h1 id="docker-自定义网络" tabindex="-1"><a class="header-anchor" href="#docker-自定义网络" aria-hidden="true">#</a> Docker | 自定义网络</h1><h2 id="_1-前言" tabindex="-1"><a class="header-anchor" href="#_1-前言" aria-hidden="true">#</a> 1.前言</h2><p>大家好，我是Leo哥🫣🫣🫣。前面我们创建了一个Java项目的容器，而Java项目往往需要访问其它各种中间件，例如MySQL、Redis等。现在，我们的容器之间能否互相访问呢？我们这篇文章主要讨论如何在Docker中使用网络。</p><h2 id="_2-测试访问" tabindex="-1"><a class="header-anchor" href="#_2-测试访问" aria-hidden="true">#</a> 2.测试访问</h2><p>首先，我们查看下MySQL容器的详细信息，重点关注其中的网络IP地址：</p><div class="language-Bash line-numbers-mode" data-ext="Bash"><pre class="language-Bash"><code># 1.用基本命令，寻找Networks.bridge.IPAddress属性
docker inspect mysql
# 也可以使用format过滤结果
docker inspect --format=&#39;{{range .NetworkSettings.Networks}}{{println .IPAddress}}{{end}}&#39; mysql
# 得到IP地址如下：
172.18.0.2

# 2.然后通过命令进入dd容器
docker exec -it dd bash

# 3.在容器内，通过ping命令测试网络
ping 172.18.0.2
# 结果
PING 172.18.0.2 (172.17.0.2) 56(84) bytes of data.
64 bytes from 172.18.0.2: icmp_seq=1 ttl=64 time=0.053 ms
64 bytes from 172.18.0.2: icmp_seq=2 ttl=64 time=0.059 ms
64 bytes from 172.18.0.2: icmp_seq=3 ttl=64 time=0.058 ms
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发现可以互联，没有问题。</p><p>但是，容器的网络IP其实是一个虚拟的IP，其值并不固定与某一个容器绑定，如果我们在开发时写死某个IP，而在部署时很可能MySQL容器的IP会发生变化，连接会失败。</p><p>所以，我们必须借助于docker的网络功能来解决这个问题，官方文档：</p>`,9),m={href:"https://docs.docker.com/engine/reference/commandline/network/",target:"_blank",rel:"noopener noreferrer"},u=e("h2",{id:"_3-常见命令",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-常见命令","aria-hidden":"true"},"#"),n(" 3.常见命令")],-1),v=e("thead",null,[e("tr",null,[e("th",{style:{"text-align":"left"}},[e("strong",null,"命令")]),e("th",{style:{"text-align":"left"}},[e("strong",null,"说明")]),e("th",{style:{"text-align":"left"}},[e("strong",null,"文档地址")])])],-1),b=e("td",{style:{"text-align":"left"}},"docker network create",-1),p=e("td",{style:{"text-align":"left"}},"创建一个网络",-1),_={style:{"text-align":"left"}},h={href:"https://docs.docker.com/engine/reference/commandline/network_create/",target:"_blank",rel:"noopener noreferrer"},g=e("td",{style:{"text-align":"left"}},"docker network ls",-1),f=e("td",{style:{"text-align":"left"}},"查看所有网络",-1),y={style:{"text-align":"left"}},k={href:"https://docs.docker.com/engine/reference/commandline/network_ls/",target:"_blank",rel:"noopener noreferrer"},q=e("td",{style:{"text-align":"left"}},"docker network rm",-1),x=e("td",{style:{"text-align":"left"}},"删除指定网络",-1),w={style:{"text-align":"left"}},I={href:"https://docs.docker.com/engine/reference/commandline/network_rm/",target:"_blank",rel:"noopener noreferrer"},P=e("td",{style:{"text-align":"left"}},"docker network prune",-1),N=e("td",{style:{"text-align":"left"}},"清除未使用的网络",-1),L={style:{"text-align":"left"}},z={href:"https://docs.docker.com/engine/reference/commandline/network_prune/",target:"_blank",rel:"noopener noreferrer"},B=e("td",{style:{"text-align":"left"}},"docker network connect",-1),E=e("td",{style:{"text-align":"left"}},"使指定容器连接加入某网络",-1),S={style:{"text-align":"left"}},V={href:"https://docs.docker.com/engine/reference/commandline/network_connect/",target:"_blank",rel:"noopener noreferrer"},j=e("td",{style:{"text-align":"left"}},"docker network disconnect",-1),D=e("td",{style:{"text-align":"left"}},"使指定容器连接离开某网络",-1),M={style:{"text-align":"left"}},R={href:"https://docs.docker.com/engine/reference/commandline/network_disconnect/",target:"_blank",rel:"noopener noreferrer"},A=e("td",{style:{"text-align":"left"}},"docker network inspect",-1),G=e("td",{style:{"text-align":"left"}},"查看网络详细信息",-1),O={style:{"text-align":"left"}},Q={href:"https://docs.docker.com/engine/reference/commandline/network_inspect/",target:"_blank",rel:"noopener noreferrer"},C=i(`<h2 id="_4-自定义网络" tabindex="-1"><a class="header-anchor" href="#_4-自定义网络" aria-hidden="true">#</a> 4.自定义网络</h2><div class="language-Bash line-numbers-mode" data-ext="Bash"><pre class="language-Bash"><code># 1.首先通过命令创建一个网络
docker computer-network create custom

# 2.然后查看网络
docker computer-network ls
# 结果：
NETWORK ID     NAME      DRIVER    SCOPE
7d7c301aa09e   bridge    bridge    local
7808eff78157   custom    bridge    local
63b937d578ce   hm-net    bridge    local
2a13737524df   host      host      local
56086dc30251   none      null      local
# 其中，除了custom以外，其它都是默认的网络

# 3.让dd和mysql都加入该网络，注意，在加入网络时可以通过--alias给容器起别名
# 这样该网络内的其它容器可以用别名互相访问！
# 3.1.mysql容器，指定别名为db，另外每一个容器都有一个别名是容器名
docker computer-network connect custom mysql --alias db
# 3.2.db容器，也就是我们的java项目
docker computer-network connect custom project

# 4.进入project容器，尝试利用别名访问db
# 4.1.进入容器
docker exec -it project bash
# 4.2.用db别名访问
ping db
# 结果
PING db (172.18.0.2) 56(84) bytes of data.
64 bytes from mysql.custom (172.19.0.2): icmp_seq=1 ttl=64 time=0.055 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=2 ttl=64 time=0.066 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=3 ttl=64 time=0.062 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=4 ttl=64 time=0.072 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=5 ttl=64 time=0.060 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=6 ttl=64 time=0.348 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=7 ttl=64 time=0.311 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=8 ttl=64 time=0.062 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=9 ttl=64 time=0.062 ms

# 4.3.用容器名访问
ping mysql
# 结果：
PING mysql (172.18.0.2) 56(84) bytes of data.
64 bytes from mysql.custom (172.19.0.2): icmp_seq=1 ttl=64 time=0.055 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=2 ttl=64 time=0.066 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=3 ttl=64 time=0.062 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=4 ttl=64 time=0.072 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=5 ttl=64 time=0.060 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=6 ttl=64 time=0.348 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=7 ttl=64 time=0.311 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=8 ttl=64 time=0.062 ms
64 bytes from mysql.custom (172.19.0.2): icmp_seq=9 ttl=64 time=0.062 ms

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312112042799.png" alt="image-20231211204208746" tabindex="0" loading="lazy"><figcaption>image-20231211204208746</figcaption></figure><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312112042286.png" alt="image-20231211204233248" tabindex="0" loading="lazy"><figcaption>image-20231211204233248</figcaption></figure><p>OK，现在无需记住IP地址也可以实现容器互联了。</p><p><strong>注意：</strong></p><p>这里有些朋友可能会遇到ping common命令不可用的情况，这里给出解决方案。</p><p>解决：</p><p>1)这时候需要敲：apt-get update，这个命令的作用是：同步 /etc/apt/sources.list 和 /etc/apt/sources.list.d 中列出的源的索引，这样才能获取到最新的软件包。<br> 　　2)等更新完毕以后再敲命令：apt-get install iputils-ping命令即可。</p><p>同理，安装 vim也是：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> <span class="token function">vim</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装 net-tools:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> net-tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>总结</strong>：</p><ul><li>在自定义网络中，可以给容器起多个别名，默认的别名是容器名本身</li><li>在同一个自定义网络中的容器，可以通过别名互相访问</li></ul><h2 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结" aria-hidden="true">#</a> 5.总结</h2><p>以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是<strong>Leo</strong>，一个在互联网行业的小白，立志成为更好的自己。</p><p>如果你想了解更多关于<strong>Leo</strong>，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312112044028.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,19);function J(K,T){const s=d("ExternalLinkIcon");return r(),o("div",null,[a,e("p",null,[e("a",m,[n("https://docs.docker.com/engine/reference/commandline/network/"),t(s)])]),u,e("table",null,[v,e("tbody",null,[e("tr",null,[b,p,e("td",_,[e("a",h,[n("docker network create"),t(s)])])]),e("tr",null,[g,f,e("td",y,[e("a",k,[n("docs.docker.com"),t(s)])])]),e("tr",null,[q,x,e("td",w,[e("a",I,[n("docs.docker.com"),t(s)])])]),e("tr",null,[P,N,e("td",L,[e("a",z,[n("docs.docker.com"),t(s)])])]),e("tr",null,[B,E,e("td",S,[e("a",V,[n("docs.docker.com"),t(s)])])]),e("tr",null,[j,D,e("td",M,[e("a",R,[n("docker network disconnect"),t(s)])])]),e("tr",null,[A,G,e("td",O,[e("a",Q,[n("docker network inspect"),t(s)])])])])]),C])}const H=l(c,[["render",J],["__file","custom-network.html.vue"]]);export{H as default};
