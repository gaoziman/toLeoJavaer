import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as p,c as i,a as n,b as s,d as l,e as a}from"./app-2feb0630.js";const c={},u=a('<h1 id="linux自用笔记" tabindex="-1"><a class="header-anchor" href="#linux自用笔记" aria-hidden="true">#</a> Linux自用笔记</h1><h2 id="_1-命令终端字段含义介绍" tabindex="-1"><a class="header-anchor" href="#_1-命令终端字段含义介绍" aria-hidden="true">#</a> 1.命令终端字段含义介绍</h2><ul><li><p>[root@localhost ~]#</p></li><li><p>解释：</p><ul><li>root：当前登录系统用户名(root超级管理员)</li><li>localhost ：当前主机名</li><li><sub>：当前用户所在目录（</sub> 为家目录） ，root超级管理员家目录：/root</li><li>#： 当前用户身份是超级管理员</li></ul></li><li><p>[student@localhost ~]$</p><ul><li>$：当前用户身份为普通用户，普通用户的家目录：/home/用户名同名</li></ul></li></ul><h2 id="_3-linux系统基本概念" tabindex="-1"><a class="header-anchor" href="#_3-linux系统基本概念" aria-hidden="true">#</a> 3.Linux系统基本概念</h2><ul><li>多用户的系统：允许同时有很多个用户登录系统，使用系统里的资源</li><li>多任务的系统：允许同时执行多个任务</li><li>严格区分大小写：命令，选项，参数，文件名，目录名都严格区分大小写</li><li>一切皆文件：硬件设备（内存、CPU、网卡、显示器、硬盘等等）都是以文件的形式存在的</li><li>不管是文件还是目录都是以倒挂的树形结构，存在于系统的“/”根目录下，根目录是Linux系统的起点</li><li>对于Linux系统而言，目录/文件没有扩展名一说，扩展名如：.sh（脚本文件) .conf（配置文件） .log（日志文件） .rpm（软件包）.tar（压缩包）是易于用户方便识别</li><li>没有提示就是最好的提示（成功了）</li><li>Linux系统没有回收站</li></ul><h2 id="_4-显示行号" tabindex="-1"><a class="header-anchor" href="#_4-显示行号" aria-hidden="true">#</a> 4.显示行号</h2>',6),r={href:"https://so.csdn.net/so/search?q=vim&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},d=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> ~/.vimrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第二步，在该文件中加入一行，命令如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">set</span> nu                       <span class="token comment"># 显示行号</span>
<span class="token builtin class-name">set</span> nonu                     <span class="token comment"># 不显示行号    </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-命令行编辑技巧" tabindex="-1"><a class="header-anchor" href="#_5-命令行编辑技巧" aria-hidden="true">#</a> 5.命令行编辑技巧</h2><p>键盘上下键调出历史命令</p><blockquote><p>Ctrl + c：废弃当前命令行中的命令，取消当前执行的命令，例如ping</p><p>Ctrl + l,clear：清屏</p><p>tab建自动补齐：可补齐命令、参数、文件路径、软件名</p><p>esc + . ：将上一条命令参数变成当前命令的执行对象</p><p>Ctrl + a：将当前光标移动至行首</p><p>Ctrl + e：将当前光标移动至行尾</p><p>Ctrl + u 清空至行首</p><p>Ctrl + w 删除一个单词</p><p>exit，logout：退出系统</p></blockquote><h2 id="_6-命令行一般命令格式" tabindex="-1"><a class="header-anchor" href="#_6-命令行一般命令格式" aria-hidden="true">#</a> 6.命令行一般命令格式</h2><ul><li>命令字 [-选项...] [参数...] <ul><li>命令字：命令本身（功能）</li><li>选项：调整命令功能的 <ul><li>短选项：-l -a -d -h（单个字符），短选项可以合并使用：-lad -lh</li><li>长选项：--help（单词），长选项通常是不能合并使用的</li></ul></li><li>参数：命令的执行对象，文件/目录/程序等</li><li>[]：可选的</li><li>...：可以同时有多个选项或参数</li></ul></li></ul><h2 id="_7-linux系统辨别目录与文件的方法" tabindex="-1"><a class="header-anchor" href="#_7-linux系统辨别目录与文件的方法" aria-hidden="true">#</a> 7.Linux系统辨别目录与文件的方法</h2><blockquote><p>蓝色表示目录（windows系统里的文件夹）</p><p>白色表示文件</p><p>浅蓝色表示链接文件（类似于windows系统的快捷方式）</p><p>绿色表示可执行文件（如脚本，命令程序文件）</p><p>红色表示压缩文件</p><p>黄色表示设备文件（硬盘、键盘、鼠标、网卡、CPU硬件设备都是以文件的形式存在的）</p><p>红色闪动文件——&gt;表示链接文件不可用</p></blockquote>`,10),m={id:"_8-ls-查看目录-文件命令",tabindex:"-1"},v=n("a",{class:"header-anchor",href:"#_8-ls-查看目录-文件命令","aria-hidden":"true"},"#",-1),k={href:"http://8.ls",target:"_blank",rel:"noopener noreferrer"},b=a(`<ul><li><p>ls命令（英文全拼：list）：用于查看目录下内容及目录和文件详细属性信息</p></li><li><p>命令格式：ls [-选项...] [参数...]</p></li><li><p>常用选项：</p><ul><li><code>-a 显示目录下所有内容，包含隐藏的内容</code></li><li><code>-l 以长格式显示目录下的内容及详细属性</code></li><li><code>-h 人性化显示目录下内容大小（kB、MB、GB）</code></li><li><code>-d 仅显示目录本身而不显示目录下的内容</code></li><li><code>-i 查看inode号（系统任何的文件或目录都有一个唯一的编号）</code></li><li><code>-R：递归查看目录下所有内容（从头到尾）</code></li></ul></li><li><p>注意（附加）：递归是指将所有的目录从头到尾全部呈现出来。</p></li></ul><h2 id="_9-linux系统文件类型" tabindex="-1"><a class="header-anchor" href="#_9-linux系统文件类型" aria-hidden="true">#</a> 9.Linux系统文件类型</h2><blockquote><p>- 文件：</p><p>d 目录：</p><p>l 链接文件</p><p>b 跨设备文件</p><p>c 字符设备文件</p><p>p 管道设备文件</p><p>s 套接字</p></blockquote><h2 id="_10-linux系统下的归属关系" tabindex="-1"><a class="header-anchor" href="#_10-linux系统下的归属关系" aria-hidden="true">#</a> 10.Linux系统下的归属关系</h2><ul><li><p>在<strong>Linux</strong>系统下，文件给用户分成了三类</p><ul><li><p>所有者：文件或目录的拥有者，拥有者的权限通常是最大的</p></li><li><p>所属组：文件或目录属于哪一个组，所属组的权限略微比所有者小</p></li><li><p>其他人：既不是文件或目录的所有者，也不属于文件或目录组内的成员，其他人的权限通常最小的权限</p></li></ul></li><li><p>ls命令示例：</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#显示当前所在目录下的所有内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls		</span>

<span class="token comment">#查看根目录下所有内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls   /</span>
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

<span class="token comment">#查看/etc目录下所有内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /etc</span>

<span class="token comment">#查看/bin目录下所有内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /bin</span>

<span class="token comment">#查看/dev目录下所有内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /dev</span>

<span class="token comment">#查看目录下所有目录和文件，包括隐藏的内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -a</span>

<span class="token comment">#以长格式显示目录下所有内容，包括详细的属性信息</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l</span>
-rw-r--r--. <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">10</span>月 <span class="token number">24</span> <span class="token number">15</span>:16 hello

<span class="token comment">#解释</span>
-：文件类型
<span class="token number">1</span>：代表文件的引用次数
root：文件的所有者
root：文件的所属组
<span class="token number">0</span>：文件的大小，默认以字节为单位显示大小
<span class="token number">10</span>月 <span class="token number">24</span> <span class="token number">15</span>:16：文件最近一次的修改时间
hello：文件名

<span class="token comment">#以长格式显示目录所有内容，以人性化的方式显示详细的属性信息</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l -h</span>

<span class="token comment">#短选项合并使用</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -lh</span>

<span class="token comment">#以长格式显示目录所有内容，以人性化的方式显示详细的属性信息，包括隐藏的内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -lha</span>


<span class="token comment">#以长格式显示根目录下所有内容，包括详细的属性信息</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l /</span>
lrwxrwxrwx.   <span class="token number">1</span> root root    <span class="token number">7</span> <span class="token number">3</span>月  <span class="token number">13</span> <span class="token number">17</span>:15 bin -<span class="token operator">&gt;</span> usr/bin

<span class="token comment">#创建hello.txt文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># touch hello.txt</span>

<span class="token comment">#查看文件的元数据信息</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># stat hello.txt</span>
  文件：<span class="token string">&quot;hello.txt&quot;</span>
  大小：0         	块：0          IO 块：4096   普通空文件
设备：fd00h/64768d	Inode：33575020    硬链接：1
权限：<span class="token punctuation">(</span>0644/-rw-r--r--<span class="token punctuation">)</span>  Uid：<span class="token punctuation">(</span>    <span class="token number">0</span>/    root<span class="token punctuation">)</span>   Gid：<span class="token punctuation">(</span>    <span class="token number">0</span>/    root<span class="token punctuation">)</span>
环境：unconfined_u:object_r:admin_home_t:s0
最近访问：2021-03-14 <span class="token number">16</span>:38:14.349861770 +0800
最近更改：2021-03-14 <span class="token number">16</span>:38:14.349861770 +0800
最近改动：2021-03-14 <span class="token number">16</span>:38:14.349861770 +0800
创建时间：-

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_11-linux基本权限的类别" tabindex="-1"><a class="header-anchor" href="#_11-linux基本权限的类别" aria-hidden="true">#</a> 11.Linux基本权限的类别</h2><ul><li><p>r 读取 w 写入 x 执行 - 没有权限</p></li><li><p>权限顺序：rwx rwx rwx</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l</span>
-rw-r--r--. <span class="token number">1</span> root root <span class="token number">1831</span> <span class="token number">3</span>月  <span class="token number">13</span> <span class="token number">17</span>:45 initial-setup-ks.cfg
<span class="token comment"># 解释</span>
-：文件类型
rw- r-- r--：所有者u、所属组g、其他人o的权限
u   g   o

r 读取权限，w写入权限，x执行权限，-没有任何权限

<span class="token number">1</span>：代表文件的引用次数，只针对与做了硬连接的文件才有效
root：文件的所有者
root：文件的所属组
<span class="token number">1831</span>：文件的大小，默认以字节为单位显示大小
<span class="token number">3</span>月  <span class="token number">13</span> <span class="token number">17</span>:45：文件最近一次的修改时间
initial-setup-ks.cfg：文件名

<span class="token comment">#查看/root目录本身详细属性信息</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -ld /root</span>
dr-xr-x---. <span class="token number">14</span> root root <span class="token number">4096</span> <span class="token number">3</span>月  <span class="token number">14</span> <span class="token number">16</span>:38 /root

<span class="token comment">#查看当前目录下所有内容的inode号</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -i</span>
<span class="token number">33574979</span> anaconda-ks.cfg  <span class="token number">33574984</span> initial-setup-ks.cfg  <span class="token number">33575035</span> 模板  <span class="token number">33575036</span> 图片  <span class="token number">17470701</span> 下载            <span class="token number">17470702</span> 音乐
<span class="token number">33575020</span> hello.txt        <span class="token number">51909391</span> 公共                  <span class="token number">51909392</span> 视频   <span class="token number">3204374</span> 文档  <span class="token number">33575017</span> 新建文件夹.zip   <span class="token number">3204373</span> 桌面

<span class="token comment">#查看hello.txt文件的inode号</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -i hello.txt</span>
<span class="token number">33575020</span> hello.txt

<span class="token comment">#查看/etc/目录本身的inode号</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -id /etc</span>
<span class="token number">16777281</span> /etc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_12-绝对路径与相对路径" tabindex="-1"><a class="header-anchor" href="#_12-绝对路径与相对路径" aria-hidden="true">#</a> 12.绝对路径与相对路径</h2><ul><li><p>绝对路径：以 <strong>/（根）</strong> 为起点，到达你想去的目标目录称为绝对路径</p></li><li><p>相对路径：以当前路径为起点，到达你想去的目标目录</p></li><li><p>常用快捷操作：</p><ul><li>~ 表示为家目录</li><li>. 表示为当前目录</li><li>.. 表示上一级目录</li></ul></li><li><p>-可在两路径之间来回切换</p></li></ul><h2 id="_13-pwd-打印当前所在目录" tabindex="-1"><a class="header-anchor" href="#_13-pwd-打印当前所在目录" aria-hidden="true">#</a> 13.pwd 打印当前所在目录</h2><ul><li><p>pwd（英文全拼：print work directory）打印当前所在的工作目录，执行pwd命令后，可显示当前所在的工作目录的绝对路径名称</p></li><li><p>命令格式：pwd [-选项]</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cd /opt/a/b/c/d</span>

<span class="token comment">#打印当前所在目录绝对路径</span>
<span class="token punctuation">[</span>root@localhost d<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/opt/a/b/c/d

<span class="token comment">#切换到用户家目录</span>
<span class="token punctuation">[</span>root@localhost d<span class="token punctuation">]</span><span class="token comment"># cd ~</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/root
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cd /opt/a/b/c/d</span>
<span class="token punctuation">[</span>root@localhost d<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/opt/a/b/c/d
<span class="token punctuation">[</span>root@localhost d<span class="token punctuation">]</span><span class="token comment"># cd</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/root

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cd /bin</span>
<span class="token punctuation">[</span>root@localhost bin<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/bin

<span class="token punctuation">[</span>root@localhost bin<span class="token punctuation">]</span><span class="token comment"># cd /boot</span>
<span class="token punctuation">[</span>root@localhost boot<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/boot
<span class="token punctuation">[</span>root@localhost boot<span class="token punctuation">]</span><span class="token comment"># ls</span>

<span class="token punctuation">[</span>root@localhost boot<span class="token punctuation">]</span><span class="token comment"># cd /dev</span>
<span class="token punctuation">[</span>root@localhost dev<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/dev
<span class="token punctuation">[</span>root@localhost dev<span class="token punctuation">]</span><span class="token comment"># ls</span>

<span class="token punctuation">[</span>root@localhost dev<span class="token punctuation">]</span><span class="token comment"># cd /etc</span>
<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/etc
<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># ls</span>

<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># ls /</span>
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

<span class="token comment">#“.”表示当前所在目录，对于cd命令而言作用不大</span>
<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># cd .</span>

<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># cd /opt/a/b/c/d</span>
<span class="token punctuation">[</span>root@localhost d<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/opt/a/b/c/d

<span class="token comment">#“..”切换到当前目录的上一级目录</span>
<span class="token punctuation">[</span>root@localhost d<span class="token punctuation">]</span><span class="token comment"># cd ..</span>
<span class="token punctuation">[</span>root@localhost c<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/opt/a/b/c

<span class="token punctuation">[</span>root@localhost c<span class="token punctuation">]</span><span class="token comment"># cd ..</span>
<span class="token punctuation">[</span>root@localhost b<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/opt/a/b

<span class="token punctuation">[</span>root@localhost b<span class="token punctuation">]</span><span class="token comment"># cd ..</span>
<span class="token punctuation">[</span>root@localhost a<span class="token punctuation">]</span><span class="token comment"># cd ..</span>
<span class="token punctuation">[</span>root@localhost opt<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/opt

<span class="token punctuation">[</span>root@localhost opt<span class="token punctuation">]</span><span class="token comment"># cd ..</span>
<span class="token punctuation">[</span>root@localhost /<span class="token punctuation">]</span><span class="token comment"># cd ..</span>
<span class="token punctuation">[</span>root@localhost /<span class="token punctuation">]</span><span class="token comment"># cd</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cd /opt/a/b/c/d</span>
<span class="token punctuation">[</span>root@localhost d<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/opt/a/b/c/d

<span class="token comment">#&quot;-&quot;可在两个路径之间来回切换</span>
<span class="token punctuation">[</span>root@localhost d<span class="token punctuation">]</span><span class="token comment"># cd /etc/yum</span>
<span class="token punctuation">[</span>root@localhost yum<span class="token punctuation">]</span><span class="token comment"># cd -</span>
/opt/a/b/c/d

<span class="token punctuation">[</span>root@localhost d<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/opt/a/b/c/d

<span class="token punctuation">[</span>root@localhost d<span class="token punctuation">]</span><span class="token comment"># cd -</span>
/etc/ym

<span class="token punctuation">[</span>root@localhost yum<span class="token punctuation">]</span><span class="token comment"># cd -</span>
/opt/a/b/c/d

<span class="token punctuation">[</span>root@localhost d<span class="token punctuation">]</span><span class="token comment"># cd -</span>
/etc/yum
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_14-rmdir-删除空目录命令" tabindex="-1"><a class="header-anchor" href="#_14-rmdir-删除空目录命令" aria-hidden="true">#</a> 14.rmdir 删除空目录命令</h2><ul><li><p>rmdir（英文全拼：remove directory）删除空目录</p></li><li><p>命令格式：rmdir [-选项] 目录名</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#rmdir只能删除空目录，如果目录下存在数据无法删除</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rmdir /opt/a</span>
rmdir: 删除 <span class="token string">&quot;/opt/a&quot;</span> 失败: 目录非空
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -R /opt/a</span>
/opt/a:
b

/opt/a/b:
c

/opt/a/b/c:
d

/opt/a/b/c/d:

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rmdir /opt/a/b/c/d</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -R /opt/a</span>
/opt/a:
b

/opt/a/b:
c

/opt/a/b/c:

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rmdir /opt/a/b/c</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -R /opt/a/b</span>
/opt/a/b:

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rmdir /opt/a/b</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -R /opt/a</span>
/opt/a:

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rmdir /opt/a</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
rh  student  xx

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rmdir /opt/</span>
rmdir: 删除 <span class="token string">&quot;/opt/&quot;</span> 失败: 目录非空
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_15-touch-创建文件命令" tabindex="-1"><a class="header-anchor" href="#_15-touch-创建文件命令" aria-hidden="true">#</a> 15.touch 创建文件命令</h2><ul><li><p>touch 命令用于创建新的空白文件</p></li><li><p>命令格式：touch [-选项] 文件名</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#在当前路径创建空文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># touch hello</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls</span>

<span class="token comment">#在当前路径同时创建多个文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># touch t1 t2 t3 t4</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls</span>

<span class="token comment">#在指定路径同时创建多个文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># touch /opt/test1 /opt/test2 /opt/test3</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
rh  student  test1  test2  test3  xx

<span class="token comment">#如果存在同名目录时，无法创建</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir test</span>
mkdir: 无法创建目录<span class="token string">&quot;test&quot;</span><span class="token builtin class-name">:</span> 文件已存在

<span class="token comment">#如果存在同名文件时，touch命令没有提示，但原有文件不会被覆盖</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># touch t1</span>

<span class="token comment">#对于目录而言，只有单个目录的时候，“/”可有可无</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt/</span>
rh  student  test1  test2  test3  xx
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
rh  student  test1  test2  test3  xx

<span class="token comment">#对于目录而言，查看目录下的内容时，必须要有“/”</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt/xx</span>
oo

<span class="token comment">#对于文件而言，后边绝对不能有“/”</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt/test1</span>
/opt/test1
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt/test1/</span>
ls: 无法访问/opt/test1/: 不是目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_16-cp-复制命令" tabindex="-1"><a class="header-anchor" href="#_16-cp-复制命令" aria-hidden="true">#</a> 16.cp 复制命令</h2><ul><li><p>cp（英文全拼：copy file）用于复制文件或目录，cp命令在复制时也可修改目录或文件名字</p></li><li><p>命令格式：cp [-选项] 源文件或目录 目标目录</p></li><li><p>常用选项：</p><ul><li><code>-a: 通常在复制目录时使用，它保留链接，文件属性，并复制目录下所有的内容</code></li><li><code>-f: 覆盖已经存在的目标文件而不给出提示</code></li><li><code>-i:覆盖目标文件之前给出提示，若用户回复y则确认覆盖</code></li><li><code>-p: 除复制文件的内容外，还把修改时间和访问权限也复制到新文件中</code></li><li><code>-r: 复制目录下的所有子目录和文件</code></li><li><code>-d: 如果来源文件为连结档，就复制连结档属性</code></li><li><code>-l：创建链接文件而不复制</code></li><li><code>-a: 相当于-p,-d,-r三条命令一起的意思</code></li><li><code>-s: 复制为快捷方式</code></li><li><code>-u: 如果复制文件a比b新才复制</code></li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#复制当前目录文件到/opt目录（相对路径方式复制）</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp t1 /opt/</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
rh  student  t1  test1  test2  test3  xx

<span class="token comment">#复制文件到/opt目录（绝对路径方式复制）</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp /root/t2 /opt</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
rh  student  t1  t2  test1  test2  test3  xx

<span class="token comment">#同时复制多个文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp t3 t4 /opt/</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>

<span class="token comment">#创建目录</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir abc</span>

<span class="token comment">#使用-r对目录执行复制</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp -r abc /opt</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>

<span class="token comment">#同时复制多个目录</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir abc1 abc2 abc3</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp -r abc1 abc2 abc3 /opt</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>

<span class="token comment">#复制hello文件到/opt并改名为hello.txt</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp hello /opt/hello.txt</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>

<span class="token comment">#复制xxxx目录到/opt并改名xxoo</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir xxxx</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp -r xxxx /opt/xxoo</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>

<span class="token comment">#使用“.”配合cp命令执行复制</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cd /etc/sysconfig/computer-network-scripts/</span>
<span class="token punctuation">[</span>root@localhost computer-network-scripts<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/etc/sysconfig/computer-network-scripts

<span class="token punctuation">[</span>root@localhost computer-network-scripts<span class="token punctuation">]</span><span class="token comment"># cp /root/t1 .</span>
<span class="token punctuation">[</span>root@localhost computer-network-scripts<span class="token punctuation">]</span><span class="token comment"># ls</span>

<span class="token comment">#操持属性不变复制文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp -p anaconda-ks.cfg /opt</span>
cp：是否覆盖<span class="token string">&quot;/opt/anaconda-ks.cfg&quot;</span>？ y                         
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l /opt/anaconda-ks.cfg </span>
-rw-------. <span class="token number">1</span> root root <span class="token number">1800</span> <span class="token number">3</span>月  <span class="token number">13</span> <span class="token number">17</span>:34 /opt/anaconda-ks.cfg

<span class="token comment">#对比以上两个文件的详细属性信息（最后一次修改时间）</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l anaconda-ks.cfg </span>
-rw-------. <span class="token number">1</span> root root <span class="token number">1800</span> <span class="token number">3</span>月  <span class="token number">13</span> <span class="token number">17</span>:34 anaconda-ks.cfg

<span class="token comment">#这两个操作代表什么意思？</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp -r /opt/software/test/case2 /opt/software/test/case3 #拷贝并改名</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp -r /opt/software/test/case2 /opt/software/case3  #拷贝</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),h={id:"_17-mv-移动命令",tabindex:"-1"},g=n("a",{class:"header-anchor",href:"#_17-mv-移动命令","aria-hidden":"true"},"#",-1),f={href:"http://17.mv",target:"_blank",rel:"noopener noreferrer"},x=a(`<ul><li>mv（英文全拼：move file）用于移动文件或目录到其他位置，也可用于修改目录或文件名</li><li>命令格式：mv [-选项] 源文件... 目标路径 <ul><li><code>-b ：若需覆盖文件，则覆盖前先行备份。</code></li><li><code>-f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；</code></li><li><code>-i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖！</code></li><li><code>-u ：若目标文件已经存在，且 source 比较新，才会更新(update)</code></li><li><code>-t ： --target-directory=DIRECTORY move all SOURCE arguments into DIRECTORY，即指定mv的目标目录，该选项适用于移动多个源文件到一个目录的情况，此时目标目录在前，源文件在后。</code></li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#移动当前路径hello文件到/mnt目录</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mv hello /mnt</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /mnt</span>
hello  home  oooo  <span class="token builtin class-name">test</span>

<span class="token comment">#同时移动多个文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mv t1 t2 t3 t4 /mnt</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /mnt</span>
hello  home  oooo  student1  t1  t2  t3  t4  <span class="token builtin class-name">test</span>

<span class="token comment">#移动/opt目录下文件到/mnt</span>
root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mv /opt/test1 /opt/test2 /opt/test3 /mnt/</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /mnt</span>
hello  home  oooo  student1  t1  t2  t3  t4  <span class="token builtin class-name">test</span>  test1  test2  test3

<span class="token comment">#移动目录</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mv student1 /mnt</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /mnt</span>
hello  home  oooo  student1  <span class="token builtin class-name">test</span>

<span class="token comment">#移动文件并改名</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mv hello.txt /media/hello</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /media/</span>
hello

<span class="token comment">#移动目录并改名</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mv test /media/testxx</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /media/</span>
hello  testxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_18-cat-查看文件内容命令" tabindex="-1"><a class="header-anchor" href="#_18-cat-查看文件内容命令" aria-hidden="true">#</a> 18.cat 查看文件内容命令</h2><ul><li><p>cat （英文全拼：concatenate）命令用于查看文本文件内容</p></li><li><p>命令格式：cat [选项] 文件名</p></li><li><p>常用选项</p><ul><li><code>-n或-number：有1开始对所有输出的行数编号；</code></li><li><code>-b或--number-nonblank：和-n相似，只不过对于空白行不编号；</code></li><li><code>-s或--squeeze-blank：当遇到有连续两行以上的空白行，就代换为一行的空白行；</code></li><li><code>-A：显示不可打印字符，行尾显示“$”；</code></li><li><code>-e：等价于&quot;-vE&quot;选项；</code></li><li><code>-t：等价于&quot;-vT&quot;选项；</code></li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看文件内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat anaconda-ks.cfg </span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat initial-setup-ks.cfg </span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/hosts</span>

<span class="token comment">#查看网卡文件内容，网卡配置文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/sysconfig/computer-network-scripts/ifcfg-ens32 </span>
<span class="token punctuation">..</span>.
<span class="token assign-left variable">NAME</span><span class="token operator">=</span><span class="token string">&quot;ens32&quot;</span>   //网卡名
<span class="token assign-left variable">UUID</span><span class="token operator">=</span><span class="token string">&quot;16085f4c-f690-4058-b29e-d55c73387026&quot;</span>
<span class="token assign-left variable">DEVICE</span><span class="token operator">=</span><span class="token string">&quot;ens32&quot;</span>
<span class="token assign-left variable">ONBOOT</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPADDR</span><span class="token operator">=</span><span class="token string">&quot;192.168.0.50&quot;</span>     //网卡IP地址
<span class="token assign-left variable">PREFIX</span><span class="token operator">=</span><span class="token string">&quot;24&quot;</span>			      //子网掩码
<span class="token assign-left variable">GATEWAY</span><span class="token operator">=</span><span class="token string">&quot;192.168.0.254&quot;</span>   //网关
<span class="token assign-left variable">DNS1</span><span class="token operator">=</span><span class="token string">&quot;114.114.114.114&quot;</span>    //DNS

<span class="token comment">#查看当前系统用户基本信息文件内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/passwd</span>
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin

<span class="token comment">#查看当前系统主机名配置文件内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/hostname</span>
localhost.localdomain

<span class="token comment">#查看当前系统版本信息文件内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/redhat-release </span>
CentOS linux release <span class="token number">7.6</span>.1810 <span class="token punctuation">(</span>Core<span class="token punctuation">)</span> 

<span class="token comment">#查看当前系统开机自动挂载配置文件内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/fstab</span>

<span class="token comment">#查看系统组基本信息文件内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/group</span>

<span class="token comment">#使用“-n”以行号形式显示文件内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat -n /etc/passwd</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat -n /etc/hostname</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat -n /etc/fstab</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat -n /etc/group</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat -n /etc/services </span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_19-less命令" tabindex="-1"><a class="header-anchor" href="#_19-less命令" aria-hidden="true">#</a> 19.less命令</h2><ul><li><p>less工具是对文件的输出进行分页显示的工具，常用于查看内容量较大的文件</p></li><li><p>命令格式：less [-选项] 文件</p></li><li><p>常用选项：</p><ul><li>-N #以行号形式显示文件内容</li></ul></li><li><p>使用技巧：</p><ul><li>键盘上下键逐行查看</li><li>pgdn ：向下翻一页（Fn + 下键）</li><li>pgup ：向上翻一页（Fn + 上键）</li></ul></li><li><p>/字符串 ：搜索指定字符串（n从上向下搜索，N从下向上搜索）</p><ul><li>G：直接跳转到文件最后一行</li><li>gg：直接跳转到文件行首</li><li>：1000 #精准的定位到某一行</li><li>q ：退出</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># less -N /etc/services</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_20-head与tail命令" tabindex="-1"><a class="header-anchor" href="#_20-head与tail命令" aria-hidden="true">#</a> 20.head与tail命令</h2><ul><li><p>head命令：用来显示文件开头部分内容，默认显示文件开头10行内容</p></li><li><p>命令格式：head [选项] 参数</p></li><li><p>常用选项：</p><ul><li>-n&lt;行数&gt; 指定显示的行数</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># head /etc/passwd</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># head /etc/fstab</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># head /etc/group</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># head /etc/hostname</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># head /etc/hosts</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># head /etc/sysconfig/computer-network-scripts/ifcfg-ens32 </span>

<span class="token comment">#查看存放DNS配置文件信息</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># head /etc/resolv.conf </span>

<span class="token comment">#使用-n指定显示文件前多少行内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># head -n 5 /etc/passwd</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># head -n 6 /etc/passwd</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># head -n 15 /etc/passwd</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># head -n 20 /etc/passwd</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>tail命令：用来显示文件末尾部分内容，默认显示文件末尾10行内容</p></li><li><p>命令格式：tail [选项] 参数</p></li><li><p>常用选项：-n&lt;行数&gt; 指定显示的行数 -f 动态显示</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># tail /etc/passwd</span>

<span class="token comment">#使用“-n”指定显示文件末尾多少行内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># tail -n 5 /etc/passwd</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># tail -n 5 /etc/sysconfig/computer-network-scripts/ifcfg-ens32 </span>
<span class="token assign-left variable">IPADDR</span><span class="token operator">=</span><span class="token string">&quot;192.168.0.50&quot;</span>
<span class="token assign-left variable">PREFIX</span><span class="token operator">=</span><span class="token string">&quot;24&quot;</span>
<span class="token assign-left variable">GATEWAY</span><span class="token operator">=</span><span class="token string">&quot;192.168.0.254&quot;</span>
<span class="token assign-left variable">DNS1</span><span class="token operator">=</span><span class="token string">&quot;114.114.114.114&quot;</span>
<span class="token assign-left variable">IPV6_PRIVACY</span><span class="token operator">=</span><span class="token string">&quot;no&quot;</span>

<span class="token comment">#动态查看文件内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># touch t1</span>
root@localhost ~<span class="token punctuation">]</span><span class="token comment"># tail -f t1</span>

<span class="token comment">#另开一个终端向文件写入内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo 123 &gt; t1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_21-rm-删除命令" tabindex="-1"><a class="header-anchor" href="#_21-rm-删除命令" aria-hidden="true">#</a> 21.rm 删除命令</h2><ul><li><p>rm（英文全拼：remove）命令用于删除文件或者目录。</p></li><li><p>命令格式：rm [-选项…] 目录或文件…</p></li><li><p>常用选项</p><ul><li>-f 强制删除</li><li>-r 删除目录</li><li>***** 特殊字符：系统常用符号，用来代表任意所有字符</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
abc  abc1  abc2  abc3  anaconda-ks.cfg  hello.txt  home  rh  student  t1  t2  t3  t4  xx  xxoo

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /mnt</span>
hello  home  oooo  student1  t1  t2  t3  t4  <span class="token builtin class-name">test</span>  test1  test2  test3

<span class="token comment">#删除指定目录下文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rm /opt/anaconda-ks.cfg </span>
rm：是否删除普通文件 <span class="token string">&quot;/opt/anaconda-ks.cfg&quot;</span>？y  <span class="token comment">#默认需要确认（y|n）</span>

<span class="token comment">#查看文件是否被成功删除</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
abc  abc1  abc2  abc3  hello.txt  home  rh  student  t1  t2  t3  t4  xx  xxoo

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rm /opt/hello.txt </span>
rm：是否删除普通空文件 <span class="token string">&quot;/opt/hello.txt&quot;</span>？y

<span class="token comment">#同时删除目录下指定文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rm /opt/t1 /opt/t2 /opt/t3 /opt/t4</span>
rm：是否删除普通空文件 <span class="token string">&quot;/opt/t1&quot;</span>？y
rm：是否删除普通空文件 <span class="token string">&quot;/opt/t2&quot;</span>？y
rm：是否删除普通空文件 <span class="token string">&quot;/opt/t3&quot;</span>？y
rm：是否删除普通空文件 <span class="token string">&quot;/opt/t4&quot;</span>？y

<span class="token comment">#查看文件是否被成功删除</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
abc  abc1  abc2  abc3  home  rh  student  xx  xxoo

<span class="token comment">#使用“-f”强制删除文件（无需确认，直接删除）</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rm -f /mnt/hello</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /mnt</span>
home  oooo  student1  t1  t2  t3  t4  <span class="token builtin class-name">test</span>  test1  test2  test3

<span class="token comment">#同时强制删除多个文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rm -f /mnt/t1 /mnt/t2 /mnt/t3 /mnt/t4</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /mnt</span>

<span class="token comment">#删除目录</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rm  -r /opt/abc</span>
rm：是否删除目录 <span class="token string">&quot;/opt/abc&quot;</span>？y

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
abc1  abc2  abc3  home  rh  student  xx  xxoo

<span class="token comment">#同时删除多个目录</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rm -r /opt/abc1 /opt/abc2 /opt/abc3</span>
rm：是否删除目录 <span class="token string">&quot;/opt/abc1&quot;</span>？y
rm：是否删除目录 <span class="token string">&quot;/opt/abc2&quot;</span>？y
rm：是否删除目录 <span class="token string">&quot;/opt/abc3&quot;</span>？y

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
home  rh  student  xx  xxoo

<span class="token comment">#同时强制删除多个目录</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rm -rf /opt/home /opt/student /opt/xx /opt/xxoo</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
rh

<span class="token comment">#创建目录与文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># touch /opt/t1</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir /opt/test</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
rh  t1  <span class="token builtin class-name">test</span>

<span class="token comment">#rm命令在删除目录时，包含改目录及目录下所有数据全部删除</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rm -rf /opt/</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /mnt</span>
home  oooo  student1  <span class="token builtin class-name">test</span>  test1  test2  test3

<span class="token comment">#使用“*”通配任意所有字符，删除/mnt目录下所有数据</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rm -rf /mnt/*</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /mnt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_22-软连接与硬连接" tabindex="-1"><a class="header-anchor" href="#_22-软连接与硬连接" aria-hidden="true">#</a> 22.软连接与硬连接</h2><ul><li>Linux中的链接文件类似于windows中的快捷方式</li><li>软连接特点：软连接可以跨分区，可以对目录进行链接，源文件删除后，链接文件不可用</li><li>软连接命令格式：ln -s 源文件路径 目标路径</li><li>注意：创建链接时一定要写目录或文件的绝对路径，哪怕是在当前路径下，也要写绝对路径·</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># touch hello.soft</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls</span>

<span class="token comment">#创建软连接（必须要绝对路径创建）</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ln -s /root/hello.soft /opt</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>

<span class="token comment">#查看连接文件详细属性</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l /opt/hello.soft </span>

lrwxrwxrwx. <span class="token number">1</span> root root <span class="token number">16</span> <span class="token number">3</span>月  <span class="token number">21</span> <span class="token number">14</span>:28 /opt/hello.soft -<span class="token operator">&gt;</span> /root/hello.soft

<span class="token comment">#提示：链接文件的权限最终取决于源文件的权限</span>

<span class="token comment">#普通用户验证</span>

<span class="token punctuation">[</span>lisi@localhost ~<span class="token punctuation">]</span>$ <span class="token function">ls</span> /opt
hello.soft
<span class="token punctuation">[</span>lisi@localhost ~<span class="token punctuation">]</span>$ <span class="token function">ls</span> <span class="token parameter variable">-l</span> /opt/hello.soft 
lrwxrwxrwx. <span class="token number">1</span> root root <span class="token number">16</span> <span class="token number">3</span>月  <span class="token number">21</span> <span class="token number">14</span>:28 /opt/hello.soft -<span class="token operator">&gt;</span> /root/hello.soft
<span class="token punctuation">[</span>lisi@localhost ~<span class="token punctuation">]</span>$ <span class="token function">cat</span> /opt/hello.soft 

cat: /opt/hello.soft: 权限不够
<span class="token comment">#提示：由于源文件存放于/root目录下，而普通用户对/root目录没有任何权限，所以普通用户无法查看</span>

<span class="token comment">#删除源文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rm -f /root/hello.soft </span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls</span>

<span class="token comment">#删除源文件后，软链接文件不可用</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l /opt/hello.soft </span>
lrwxrwxrwx. <span class="token number">1</span> root root <span class="token number">16</span> <span class="token number">3</span>月  <span class="token number">21</span> <span class="token number">14</span>:28 /opt/hello.soft -<span class="token operator">&gt;</span> /root/hello.soft

<span class="token comment">#创建文件并创建软连接</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># touch hello.soft</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ln -s /root/hello.soft /opt</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l /opt/hello.soft </span>
lrwxrwxrwx. <span class="token number">1</span> root root <span class="token number">16</span> <span class="token number">3</span>月  <span class="token number">21</span> <span class="token number">14</span>:39 /opt/hello.soft -<span class="token operator">&gt;</span> /root/hello.soft

<span class="token comment">#删除链接文件后，源文件仍然可用</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rm -f /opt/hello.soft </span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat hello.soft </span>

<span class="token comment">#对目录创建软连接</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ln -s /root/test1 /opt/</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -ld /opt/test1</span>
lrwxrwxrwx. <span class="token number">1</span> root root <span class="token number">11</span> <span class="token number">3</span>月  <span class="token number">21</span> <span class="token number">14</span>:44 /opt/test1 -<span class="token operator">&gt;</span> /root/test1

<span class="token number">3</span>创建链接时一定要写目录或文件的绝对路径，哪怕是在当前路径下，也要写绝对路径
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ln -s hello.soft /opt</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
hello.soft  test1

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l /opt/hello.soft </span>
lrwxrwxrwx. <span class="token number">1</span> root root <span class="token number">10</span> <span class="token number">3</span>月  <span class="token number">21</span> <span class="token number">14</span>:47 /opt/hello.soft -<span class="token operator">&gt;</span> hello.soft
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>硬链接特点：硬连接不可以跨分区，不可以对目录进行链接，源文件删除后，链接文件仍然可用</p></li><li><p>硬连接命令格式：ln 源文件路径 目标路径</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#创建文件，并创建硬连接</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># touch hello.hard</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ln /root/hello.hard /opt/</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls /opt</span>
hello.hard  hello.soft  test1

<span class="token comment">#向硬连接的源文件写入内容</span>
root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo 123 &gt; /root/hello.hard </span>

<span class="token comment">#查看源文件内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /root/hello.hard </span>
<span class="token number">123</span>

<span class="token comment">#查看链接文件内容，以同步更新</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/hello.hard </span>
<span class="token number">123</span>

<span class="token comment">#向链接文件写入内容，查看源文件以同步更新</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo xx &gt;&gt; /opt/hello.hard </span>

<span class="token comment">#擦看源文件，以同步更新</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /root/hello.hard </span>
<span class="token number">123</span>
xx

<span class="token comment">#硬连接文件的特点可以保持文件属性不发生改变</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l /root/hello.hard </span>
-rw-r--r--. <span class="token number">2</span> root root <span class="token number">7</span> <span class="token number">3</span>月  <span class="token number">21</span> <span class="token number">14</span>:55 /root/hello.hard
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l /opt/hello.hard </span>
-rw-r--r--. <span class="token number">2</span> root root <span class="token number">7</span> <span class="token number">3</span>月  <span class="token number">21</span> <span class="token number">14</span>:55 /opt/hello.hard

<span class="token comment">#并且硬连接文件的i节点号相同</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -i /root/hello.hard </span>
<span class="token number">33711090</span> /root/hello.hard
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -i /opt/hello.hard </span>
<span class="token number">33711090</span> /opt/hello.hard

<span class="token comment">#硬连接不允许对目录进行连接</span>
root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ln /root/test1 /opt</span>
ln: <span class="token string">&quot;/root/test1&quot;</span><span class="token builtin class-name">:</span> 不允许将硬链接指向目录

<span class="token comment">#硬连接源文件删除后，链接文件仍然可用</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rm -f /root/hello.hard </span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/hello.hard </span>
<span class="token number">123</span>
xx

<span class="token comment">#向硬连接文件写入内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo  abc &gt;&gt; /opt/hello.hard </span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/hello.hard </span>
<span class="token number">123</span>
xx
abc

<span class="token comment">#硬连接不允许跨分区</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># lsblk</span>
NAME            MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda               <span class="token number">8</span>:0    <span class="token number">0</span>   20G  <span class="token number">0</span> disk 
├─sda1            <span class="token number">8</span>:1    <span class="token number">0</span>    1G  <span class="token number">0</span> part /boot
└─sda2            <span class="token number">8</span>:2    <span class="token number">0</span>   19G  <span class="token number">0</span> part 
  ├─centos-root <span class="token number">253</span>:0    <span class="token number">0</span>   17G  <span class="token number">0</span> lvm  /
  └─centos-swap <span class="token number">253</span>:1    <span class="token number">0</span>    2G  <span class="token number">0</span> lvm  <span class="token punctuation">[</span>SWAP<span class="token punctuation">]</span>
sr0              <span class="token number">11</span>:0    <span class="token number">1</span>  <span class="token number">4</span>.3G  <span class="token number">0</span> rom  
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ln /root/hello.soft /boot</span>
ln: 无法创建硬链接<span class="token string">&quot;/boot/hello.soft&quot;</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&quot;/root/hello.soft&quot;</span><span class="token builtin class-name">:</span> 无效的跨设备连接
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_23-linux命令的分类" tabindex="-1"><a class="header-anchor" href="#_23-linux命令的分类" aria-hidden="true">#</a> 23.Linux命令的分类</h2><ul><li><p>内部命令：bash程序自带的基本管理命令</p></li><li><p>外部命令：有独立的外部可执行程序文件命令</p></li><li><p>type 用于区别内部命令与外部命令</p></li><li><p>which 用于查找可以执行程序文件位置</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost opt<span class="token punctuation">]</span><span class="token comment"># type ls</span>

<span class="token punctuation">[</span>root@localhost opt<span class="token punctuation">]</span><span class="token comment"># type cat</span>

<span class="token punctuation">[</span>root@localhost opt<span class="token punctuation">]</span><span class="token comment"># type hash</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $PATH</span>
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># hash</span>
命中	命令
   <span class="token number">1</span>	/usr/bin/cat
   <span class="token number">1</span>	/usr/bin/ls


<span class="token punctuation">[</span>root@localhost opt<span class="token punctuation">]</span><span class="token comment"># hash -r</span>
<span class="token punctuation">[</span>root@localhost opt<span class="token punctuation">]</span><span class="token comment"># </span>
<span class="token punctuation">[</span>root@localhost opt<span class="token punctuation">]</span><span class="token comment"># hash</span>
hash: 哈希表为空

<span class="token punctuation">[</span>root@localhost opt<span class="token punctuation">]</span><span class="token comment"># ls</span>
hello.hard  hello.soft  t1  test1  test.txt
<span class="token punctuation">[</span>root@localhost opt<span class="token punctuation">]</span><span class="token comment"># hash</span>
命中	命令
   <span class="token number">1</span>	/usr/sbin/ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>总结： <ul><li>shell程序是用户和系统之间的接口，用于解释用户的命令</li><li>查找命令对应的程序文件所在位置：which 命令</li><li>shell程序大多数存放在/etc/shells文件中</li><li>系统默认使用的shell为/bin/bash</li><li>查看当前使用的shell：echo $SHELL</li><li>区别内部命令与外部命令的方式：typt 命令</li><li>shell程序查找可执行程序文件路径定义在$PATH环境变量中</li><li>shell查找的外部命令路径结果会记录到缓存的hash表中</li></ul></li></ul><h2 id="_24-help-命令帮助手册" tabindex="-1"><a class="header-anchor" href="#_24-help-命令帮助手册" aria-hidden="true">#</a> 24.help 命令帮助手册</h2><ul><li><p>help命令用于查看shell内部命令的帮助信息，包括使用方法、选项等…</p></li><li><p>命令格式：help [选项] 命令</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#获取内部命令帮助信息</span>
<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># help cd</span>

<span class="token comment">#help无法获取外部命令的帮助信息</span>
root@localhost etc<span class="token punctuation">]</span><span class="token comment"># help ls</span>
bash: help: 没有与 <span class="token variable"><span class="token variable">\`</span>ls&#39; 匹配的帮助主题。尝试 <span class="token variable">\`</span></span><span class="token builtin class-name">help</span> <span class="token builtin class-name">help</span><span class="token string">&#39; 或者 \`man -k ls&#39;</span> 或者 <span class="token variable"><span class="token variable">\`</span>info ls&#39;。

<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># type help</span>
<span class="token builtin class-name">help</span> 是 shell 内嵌

<span class="token comment">#获取help命令本身的帮助信息</span>
<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># help help</span>

<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># type cat</span>
<span class="token function">cat</span> 是 /usr/bin/cat

<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># help cat</span>
bash: help: 没有与 <span class="token variable">\`</span></span><span class="token function">cat</span><span class="token string">&#39; 匹配的帮助主题。尝试 \`help help&#39;</span> 或者 <span class="token variable"><span class="token variable">\`</span><span class="token function">man</span> <span class="token parameter variable">-k</span> cat&#39; 或者 <span class="token variable">\`</span></span>info cat&#39;。

<span class="token comment">#查看命令帮助手册（命令自带）</span>
<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># cat --help</span>
<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># ls --help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_25-关机与重启" tabindex="-1"><a class="header-anchor" href="#_25-关机与重启" aria-hidden="true">#</a> 25.关机与重启</h2><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312121413555.png" alt="image-20231212141325433" tabindex="0" loading="lazy"><figcaption>image-20231212141325433</figcaption></figure><ul><li><p>linux下常用的关机命令有：shutdown、halt、poweroff、init</p><ul><li>init 0 关机</li><li>halt #立刻关机</li></ul></li><li><p>shutdown –h now #立刻关机</p><ul><li>shutdown -h 10 #10分钟后自动关机</li><li><strong>poweroff #立刻关机 （记这个）</strong></li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># poweroff</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>重启命令：reboot shutdown <ul><li><strong>reboot #立刻重启 （记这个）</strong></li><li>shutdown -r now #立刻重启</li><li>shutdown -r 10 #过十分钟后重启</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_26-linux系统目录介绍" tabindex="-1"><a class="header-anchor" href="#_26-linux系统目录介绍" aria-hidden="true">#</a> 26.Linux系统目录介绍</h2><ul><li><p>/（根）:系统所有数据都存放在根目录下</p></li><li><p>/bin：存放用户和管理员必备的可执行的二进制程序文件</p></li><li><p>/boot：存放Linux系统内核及引导系统程序所需要的文件目录</p></li><li><p>/dev：存放硬件设备的目录，如键盘、鼠标、硬盘、光盘等等 （记住）</p></li><li><p>/etc：存放服务的配置文件，用户信息文件 （记住）</p></li><li><p>/root：超级管理员的家目录</p></li><li><p>/home：系统普通用户的家目录（记住）</p></li><li><p>/lib：存放系统中的程序运行所需要的共享库及内核模块</p></li><li><p>/opt：额外安装的可选应用程序包所放置的位置</p></li><li><p>/srv：服务启动之后需要访问的数据目录</p></li><li><p>/tmp：一般用户或正在执行的程序临时存放文件的目录,任何人都可以访问,重要数据不可放置在此目录下</p></li><li><p>/var：存放系统执行过程中经常变化的文件，如随时都在变化的日志文件就存放/var/log/下 （记住）</p></li><li><p>/mnt、/media ：光盘和镜像等预设的挂载点（记住）</p></li><li><p>/proc：Linux伪文件系统，该目录下的数据存在于内存当中，不占用磁盘空间</p></li><li><p>/lib64 ：存放函式库</p></li><li><p>/run ：程序或服务启动后，存放PID的目录</p></li><li><p>/sys：存放被建立在内存中的虚拟文件系统</p></li><li><p>/usr：操作系统软件资源所放置的目录</p><ul><li>/usr/bin：与/bin目录相同，存放用户可以使用的命令程序</li><li>/usr/lib：与/lib目录相同，存放系统中的程序运行所需要的共享库及内核模块</li><li>/usr/etc：用于存放安装软件时使用的配置文件</li><li>/usr/games：与游戏比较相关的数据放置处</li><li>/usr/include：c/c++等程序语言的档头(header)与包含档(include)放置处</li><li>/usr/lib64：与/lib64目录相同，存放函式库</li><li>/usr/libexec：不经常被使用的执行程序或脚本会放置在此目录中</li><li>/usr/local： 额外安装的软件存放目录 (记住)</li><li>/usr/sbin：该目录与/sbin目录相同，存放用户可执行的二进制程序文件</li><li>/usr/share： 放置只读架构的杂项数据文件</li><li>/usr/src：一般软件源代码建议存放该目录下</li></ul></li></ul><h2 id="_27-查看内核信息" tabindex="-1"><a class="header-anchor" href="#_27-查看内核信息" aria-hidden="true">#</a> 27.查看内核信息</h2><ul><li><p>uname 命令用于显示系统内核信息</p></li><li><p>命令格式：uname [-选项...]</p></li><li><p>常用选项：</p><ul><li>-s ：显示内核名称</li><li>-r ：显示内核版本</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># uname</span>
linux

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># uname -rs</span>
linux <span class="token number">3.10</span>.0-957.el7.x86_64
<span class="token comment">#解释：</span>
linux 	<span class="token comment">#内核名称</span>
<span class="token number">3</span>		<span class="token comment">#主版本</span>
<span class="token number">10</span>		<span class="token comment">#次版本</span>
<span class="token number">0</span>		<span class="token comment">#修改版本</span>
<span class="token number">957</span>		<span class="token comment">#补丁次数</span>
el7		<span class="token comment">#Enterprise linux（企业版Linux）</span>
x86_64	<span class="token comment">#CPU架构</span>

<span class="token comment">#Linux内核官网</span>
https://www.kernel.org/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_28-查看cpu信息" tabindex="-1"><a class="header-anchor" href="#_28-查看cpu信息" aria-hidden="true">#</a> 28.查看CPU信息</h2><ul><li><p>/proc/cpuinfo文件用于存放系统CPU信息</p></li><li><p>lscpu 用于显示CPU架构信息</p></li><li><p>命令格式：lscpu [-选项]</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看/proc/cpuinfo文件内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /proc/cpuinfo </span>
processor　：<span class="token comment">#系统中逻辑处理核的编号。对于单核处理器，则可认为是其CPU编号，对于多核处理器则可以是物理核、或者使用超线程技术虚拟的逻辑核</span>
vendor_id　：   <span class="token comment">#CPU制造商     </span>
cpu family　：  <span class="token comment">#CPU产品系列代号</span>
model　　　：    <span class="token comment">#CPU属于其系列中的哪一代的代号</span>
model name：    <span class="token comment">#CPU属于的名字及其编号、标称主频</span>
stepping　  ：   <span class="token comment">#CPU属于制作更新版本</span>
cpu MHz　  ：    <span class="token comment">#CPU的实际使用主频</span>
cache size   ：  <span class="token comment">#CPU二级缓存大小</span>
physical <span class="token function">id</span>   ： <span class="token comment">#单个CPU的标号</span>
siblings       ：<span class="token comment">#单个CPU逻辑物理核数</span>
core <span class="token function">id</span>        ：<span class="token comment">#当前物理核在其所处CPU中的编号，这个编号不一定连续</span>
cpu cores    ：  <span class="token comment">#该逻辑核所处CPU的物理核数</span>
apicid          ：<span class="token comment">#用来区分不同逻辑核的编号，系统中每个逻辑核的此编号必然不同，此编号不一定连续</span>
fpu             ： <span class="token comment">#是否具有浮点运算单元（Floating Point Unit）</span>
fpu_exception  ：  <span class="token comment">#是否支持浮点计算异常</span>
cpuid level   ：   <span class="token comment">#执行cpuid指令前，eax寄存器中的值，根据不同的值cpuid指令会返回不同的内容</span>
wp             ：  <span class="token comment">#表明当前CPU是否在内核态支持对用户空间的写保护（Write Protection）</span>
flags          ：   <span class="token comment">#当前CPU支持的功能</span>
bogomips   ：       <span class="token comment">#在系统内核启动时粗略测算的CPU速度（Million Instructions Per Second）</span>
clflush size  ：    <span class="token comment">#每次刷新缓存的大小单位</span>
cache_alignment ：  <span class="token comment">#缓存地址对齐单位</span>
address sizes     ：<span class="token comment">#可访问地址空间位数</span>
power management ： <span class="token comment">#对能源管理的支持，有以下几个可选支持功能：</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_28-查看系统内存信息" tabindex="-1"><a class="header-anchor" href="#_28-查看系统内存信息" aria-hidden="true">#</a> 28.查看系统内存信息</h2><ul><li><p>/proc/meminfo文件用于存放系统内存信息</p></li><li><p>free 用于查看内存使用情况</p></li><li><p>命令格式：free [-选项]</p></li><li><p>常用选项：-h #以人类易读方式显示大小（KB，MB，GB）</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看/proc/meminfo文件内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /proc/meminfo </span>
MemTotal:          <span class="token number">995896</span> kB    <span class="token comment">#所有可用的内存大小，物理内存减去预留位和内核使用。系统从加电开始到引导完成，firmware/BIOS要预留一些内存，内核本身要占用一些内存，最后剩下可供内核支配的内存就是MemTotal。这个值在系统运行期间一般是固定不变的，重启会改变。</span>
MemFree:            <span class="token number">244196</span> kB   <span class="token comment">#表示系统尚未使用的内存。</span>
MemAvailable:       <span class="token number">435080</span> kB   <span class="token comment">#真正的系统可用内存，系统中有些内存虽然已被使用但是可以回收的，比如cache/buffer、slab都有一部分可以回收，所以这部分可回收的内存加上MemFree才是系统可用的内存</span>
Buffers:             <span class="token number">2132</span> kB   <span class="token comment">#用来给块设备做缓存的内存，(文件系统的 metadata、pages)</span>
Cached:             <span class="token number">314632</span> kB  <span class="token comment">#分配给文件缓冲区的内存,例如vi一个文件，就会将未保存的内容写到该缓冲区</span>
SwapCached:            <span class="token number">0</span> kB    <span class="token comment">#被高速缓冲存储用的交换空间（硬盘的swap）的大小</span>
Active:            <span class="token number">295908</span> kB    <span class="token comment">#经常使用的高速缓冲存储器页面文件大小</span>
Inactive:          <span class="token number">271552</span> kB    <span class="token comment">#不经常使用的高速缓冲存储器文件大小</span>
Active<span class="token punctuation">(</span>anon<span class="token punctuation">)</span>:      <span class="token number">251528</span> kB    <span class="token comment">#活跃的匿名内存</span>
Inactive<span class="token punctuation">(</span>anon<span class="token punctuation">)</span>:     <span class="token number">13044</span> kB    <span class="token comment">#不活跃的匿名内存</span>
Active<span class="token punctuation">(</span>file<span class="token punctuation">)</span>:       <span class="token number">44380</span> kB    <span class="token comment">#活跃的文件使用内存</span>
Inactive<span class="token punctuation">(</span>file<span class="token punctuation">)</span>:    <span class="token number">258508</span> kB   <span class="token comment">#不活跃的文件使用内存</span>
Unevictable:           <span class="token number">0</span> kB    <span class="token comment">#不能被释放的内存页</span>
Mlocked:               <span class="token number">0</span> kB    <span class="token comment">#系统调用 mlock 家族允许程序在物理内存上锁住它的部分或全部地址空间。这将阻止Linux 将这个内存页调度到交换空间（swap space），即使该程序已有一段时间没有访问这段空间</span>
SwapTotal:             <span class="token number">0</span> kB    <span class="token comment">#交换空间总内存</span>
SwapFree:              <span class="token number">0</span> kB    <span class="token comment">#交换空间空闲内存</span>
Dirty:                 <span class="token number">4</span> kB    <span class="token comment">#等待被写回到磁盘的</span>
Writeback:             <span class="token number">0</span> kB    <span class="token comment">#正在被写回的</span>
AnonPages:         <span class="token number">15100</span> kB    <span class="token comment">#未映射页的内存/映射到用户空间的非文件页表大小</span>
Mapped:             <span class="token number">7160</span> kB    <span class="token comment">#映射文件内存</span>
Shmem:               <span class="token number">100</span> kB    <span class="token comment">#已经被分配的共享内存</span>
Slab:               <span class="token number">9236</span> kB    <span class="token comment">#内核数据结构缓存</span>
SReclaimable:       <span class="token number">2316</span> kB    <span class="token comment">#可收回slab内存</span>
SUnreclaim:         <span class="token number">6920</span> kB    <span class="token comment">#不可收回slab内存</span>
KernelStack:        <span class="token number">2408</span> kB    <span class="token comment">#内核消耗的内存</span>
PageTables:         <span class="token number">1268</span> kB    <span class="token comment">#管理内存分页的索引表的大小</span>
NFS_Unstable:          <span class="token number">0</span> kB    <span class="token comment">#不稳定页表的大小</span>
Bounce:                <span class="token number">0</span> kB    <span class="token comment">#在低端内存中分配一个临时buffer作为跳转，把位于高端内存的缓存数据复制到此处消耗的内存</span>
WritebackTmp:          <span class="token number">0</span> kB    <span class="token comment">#FUSE用于临时写回缓冲区的内存</span>
CommitLimit:       <span class="token number">22980</span> kB    <span class="token comment">#系统实际可分配内存</span>
Committed_AS:     <span class="token number">536244</span> kB    <span class="token comment">#系统当前已分配的内存</span>
VmallocTotal:     <span class="token number">892928</span> kB    <span class="token comment">#预留的虚拟内存总量</span>
VmallocUsed:       <span class="token number">29064</span> kB    <span class="token comment">#已经被使用的虚拟内存</span>
VmallocChunk:     <span class="token number">860156</span> kB    <span class="token comment">#可分配的最大的逻辑连续的虚拟内存</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用ifconfig命令查看网卡信息</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@lesson-101 case1<span class="token punctuation">]</span><span class="token comment"># ifconfig</span>
br-63b937d578ce: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet <span class="token number">172.18</span>.0.1  netmask <span class="token number">255.255</span>.0.0  broadcast <span class="token number">172.18</span>.255.255
        inet6 fe80::42:8cff:fe41:4661  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether 02:42:8c:41:46:61  txqueuelen <span class="token number">0</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">0</span>  bytes <span class="token number">0</span> <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">11</span>  bytes <span class="token number">878</span> <span class="token punctuation">(</span><span class="token number">878.0</span> B<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

br-7808eff78157: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet <span class="token number">172.19</span>.0.1  netmask <span class="token number">255.255</span>.0.0  broadcast <span class="token number">172.19</span>.255.255
        inet6 fe80::42:80ff:fe0a:4f2b  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether 02:42:80:0a:4f:2b  txqueuelen <span class="token number">0</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">0</span>  bytes <span class="token number">0</span> <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">13</span>  bytes <span class="token number">1102</span> <span class="token punctuation">(</span><span class="token number">1.0</span> KiB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

docker0: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet <span class="token number">172.17</span>.0.1  netmask <span class="token number">255.255</span>.0.0  broadcast <span class="token number">172.17</span>.255.255
        inet6 fe80::42:98ff:fe97:242d  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether 02:42:98:97:24:2d  txqueuelen <span class="token number">0</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">17449</span>  bytes <span class="token number">1353898</span> <span class="token punctuation">(</span><span class="token number">1.2</span> MiB<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">12079</span>  bytes <span class="token number">2738799</span> <span class="token punctuation">(</span><span class="token number">2.6</span> MiB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

ens33: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet <span class="token number">192.168</span>.74.101  netmask <span class="token number">255.255</span>.255.0  broadcast <span class="token number">192.168</span>.74.255
        inet6 fe80::280c:a2de:b188:8ad2  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether 00:0c:29:dd:86:3d  txqueuelen <span class="token number">1000</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">234710</span>  bytes <span class="token number">24140481</span> <span class="token punctuation">(</span><span class="token number">23.0</span> MiB<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">433436</span>  bytes <span class="token number">134043699</span> <span class="token punctuation">(</span><span class="token number">127.8</span> MiB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

lo: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">7</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,LOOPBACK,RUNNING<span class="token operator">&gt;</span>  mtu <span class="token number">65536</span>
        inet <span class="token number">127.0</span>.0.1  netmask <span class="token number">255.0</span>.0.0
        inet6 ::1  prefixlen <span class="token number">128</span>  scopeid 0x1<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>host<span class="token operator">&gt;</span>
        loop  txqueuelen <span class="token number">1000</span>  <span class="token punctuation">(</span>Local Loopback<span class="token punctuation">)</span>
        RX packets <span class="token number">32</span>  bytes <span class="token number">2592</span> <span class="token punctuation">(</span><span class="token number">2.5</span> KiB<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">32</span>  bytes <span class="token number">2592</span> <span class="token punctuation">(</span><span class="token number">2.5</span> KiB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

veth58b7ee3: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet6 fe80::8815:b5ff:fe9d:6b57  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether 8a:15:b5:9d:6b:57  txqueuelen <span class="token number">0</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">0</span>  bytes <span class="token number">0</span> <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">12</span>  bytes <span class="token number">920</span> <span class="token punctuation">(</span><span class="token number">920.0</span> B<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

veth5c1b15a: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet6 fe80::446:f3ff:fe77:9696  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether 06:46:f3:77:96:96  txqueuelen <span class="token number">0</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">11795</span>  bytes <span class="token number">2710396</span> <span class="token punctuation">(</span><span class="token number">2.5</span> MiB<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">17529</span>  bytes <span class="token number">1600763</span> <span class="token punctuation">(</span><span class="token number">1.5</span> MiB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

veth5d0949f: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet6 fe80::307d:6eff:febe:4274  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether <span class="token number">32</span>:7d:6e:be:42:74  txqueuelen <span class="token number">0</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">17396</span>  bytes <span class="token number">1591689</span> <span class="token punctuation">(</span><span class="token number">1.5</span> MiB<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">12014</span>  bytes <span class="token number">2724843</span> <span class="token punctuation">(</span><span class="token number">2.5</span> MiB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

veth7a34000: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet6 fe80::5c66:46ff:fe4a:af6f  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether 5e:66:46:4a:af:6f  txqueuelen <span class="token number">0</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">0</span>  bytes <span class="token number">0</span> <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">7</span>  bytes <span class="token number">586</span> <span class="token punctuation">(</span><span class="token number">586.0</span> B<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

vethaa33c37: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet6 fe80::64d4:51ff:fea0:bb7  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether <span class="token number">66</span>:d4:51:a0:0b:b7  txqueuelen <span class="token number">0</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">0</span>  bytes <span class="token number">0</span> <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">11</span>  bytes <span class="token number">878</span> <span class="token punctuation">(</span><span class="token number">878.0</span> B<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

vethdcb0bc3: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet6 fe80::70b0:b1ff:feff:2cc0  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether <span class="token number">72</span>:b0:b1:ff:2c:c0  txqueuelen <span class="token number">0</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">53</span>  bytes <span class="token number">6495</span> <span class="token punctuation">(</span><span class="token number">6.3</span> KiB<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">83</span>  bytes <span class="token number">15356</span> <span class="token punctuation">(</span><span class="token number">14.9</span> KiB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

vethfc861c1: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet6 fe80::c817:bbff:fe9c:bc41  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether ca:17:bb:9c:bc:41  txqueuelen <span class="token number">0</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">0</span>  bytes <span class="token number">0</span> <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">13</span>  bytes <span class="token number">1102</span> <span class="token punctuation">(</span><span class="token number">1.0</span> KiB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_29-查看网卡信息" tabindex="-1"><a class="header-anchor" href="#_29-查看网卡信息" aria-hidden="true">#</a> 29.查看网卡信息</h2><ul><li>网卡配置文件地址： /etc/sysconfig/network-scripts/网卡名</li><li>ifconfig 用于显示和设置网卡的参数</li><li>命令格式： ifconfig [网卡名]</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@lesson-101 case1<span class="token punctuation">]</span><span class="token comment"># cat /etc/sysconfig/computer-network-scripts/ifcfg-ens33</span>
<span class="token assign-left variable">TYPE</span><span class="token operator">=</span><span class="token string">&quot;Ethernet&quot;</span>
<span class="token assign-left variable">PROXY_METHOD</span><span class="token operator">=</span><span class="token string">&quot;none&quot;</span>
<span class="token assign-left variable">BROWSER_ONLY</span><span class="token operator">=</span><span class="token string">&quot;no&quot;</span>
<span class="token assign-left variable">BOOTPROTO</span><span class="token operator">=</span><span class="token string">&quot;static&quot;</span>
<span class="token assign-left variable">DEFROUTE</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPV4_FAILURE_FATAL</span><span class="token operator">=</span><span class="token string">&quot;no&quot;</span>
<span class="token assign-left variable">IPV6INIT</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPV6_AUTOCONF</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPV6_DEFROUTE</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPV6_FAILURE_FATAL</span><span class="token operator">=</span><span class="token string">&quot;no&quot;</span>
<span class="token assign-left variable">IPV6_ADDR_GEN_MODE</span><span class="token operator">=</span><span class="token string">&quot;stable-privacy&quot;</span>
<span class="token assign-left variable">NAME</span><span class="token operator">=</span><span class="token string">&quot;ens33&quot;</span>
<span class="token assign-left variable">UUID</span><span class="token operator">=</span><span class="token string">&quot;47fb2d04-5f3a-4c68-87d7-dcf09401edd1&quot;</span>
<span class="token assign-left variable">DEVICE</span><span class="token operator">=</span><span class="token string">&quot;ens33&quot;</span>
<span class="token assign-left variable">ONBOOT</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPADDR</span><span class="token operator">=</span><span class="token string">&#39;192.168.74.101&#39;</span>
<span class="token assign-left variable">NETMASK</span><span class="token operator">=</span><span class="token string">&#39;255.255.255.0&#39;</span>
<span class="token assign-left variable">GATEWAY</span><span class="token operator">=</span><span class="token string">&#39;192.168.74.2&#39;</span>
<span class="token assign-left variable">DNS1</span><span class="token operator">=</span><span class="token string">&#39;114.114.114.114&#39;</span>

virbr0: 虚拟化的网络接口，通过软件技术虚拟出来的一个网卡，192.168.122.1，KVM虚拟化技术的时候
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_30-查看主机名及修改主机名" tabindex="-1"><a class="header-anchor" href="#_30-查看主机名及修改主机名" aria-hidden="true">#</a> 30.查看主机名及修改主机名</h2><ul><li><p>/etc/hostname文件用于存放主机名</p></li><li><p>hostname 命令用于显示和设置主机名</p></li><li><p>命令格式：hostname [新名称]</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看主机名</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># hostname</span>
localhost.localdomain

<span class="token comment">#查看主机名配置文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/hostname </span>
localhost.localdomain

<span class="token comment">#临时修改主机名（立刻生效，服务器重启以后失效）</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># hostname test</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># hostname</span>
<span class="token builtin class-name">test</span>

<span class="token comment">#exit/loguot登出系统</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># exit</span>
<span class="token punctuation">[</span>c:<span class="token punctuation">\\</span>~<span class="token punctuation">]</span>$ <span class="token function">ssh</span> <span class="token number">192.168</span>.0.50
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># </span>

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># hostname fhsd.jhglshdjkghjkdfhgkjhgdsahgjklhdsfjghsdhgjlhsd</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># logout</span>

<span class="token punctuation">[</span>root@fhsd ~<span class="token punctuation">]</span><span class="token comment"># hostname sdhjghsdfjkhgkjdfshkgljhsdjfhgjksdhgjkhsdjgjkl</span>
<span class="token punctuation">[</span>root@fhsd ~<span class="token punctuation">]</span><span class="token comment"># exit</span>

<span class="token comment">#命令行永久修改主机名（立刻生效，不需要重启系统）</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># hostnamectl set-hostname test</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,53),w={id:"_31-vi-vim文本编辑器",tabindex:"-1"},_=n("a",{class:"header-anchor",href:"#_31-vi-vim文本编辑器","aria-hidden":"true"},"#",-1),q={href:"http://31.vi/vim%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8",target:"_blank",rel:"noopener noreferrer"},y=a(`<ul><li><p>Vim是从 vi 发展出来的一个文本编辑器，vim 具有程序编辑的能力，可以主动的以字体颜色辨别语法的正确性</p></li><li><p>vi/vim 共分为三种模式：命令模式、输入模式、底线命令模式（末行模式）</p><ul><li><p>命令模式：刚刚启动 vi/vim，便进入了命令模式</p></li><li><p>输入模式：在命令模式下按 a/i/o 就进入了输入模式</p></li><li><p>ESC，退出输入模式，切换到命令模式</p></li><li><p>底线命令模式：在命令模式下按下:（英文冒号）就进入了底线命令模式</p></li></ul></li><li><p>命令格式：vim 文件名</p><ul><li>若目标文件不存在，则新创建文件并编辑</li><li>若目标文件以存在，则打开文件并编辑</li></ul></li><li><p>命令模式：刚刚启动 vi/vim，便进入了命令模式</p><ul><li>i 切换到输入模式，在当前光标所在字符前插入</li><li>a 切换到输入模式，在当前光标所在字符后插入</li><li>o 切换到输入模式，在当前光标所在行下插入新行</li><li>: 切换到底线命令模式，以在最底一行输入命令</li><li>x 在命令模式下删除当前光标所在的单字符</li><li>dd 删除一整行内容，配合数字可删除指定范围内的行</li><li>C 删除当前光标及光标后所有内容并进入输入模式</li><li>u 恢复上一次修改内容，一次恢复一个操作，可多次恢复，直到恢复本次操作初始状态为止</li><li>$ 将光标移动至行尾</li><li>0（零） 将光标移动至行首</li><li>gg 跳转至文件第一行</li><li>G 跳转至文件最后一行</li><li>yy 复制当前行，配合数字可以同时复制多行</li><li>p 粘贴当前光标所在行下</li><li>/关键字 搜索文件内关键字，n从上向下快速定位关键字，N从下向上快速定位关键字</li></ul></li><li><p>底线命令模式可以输入单个或多个字符的命令，可用的命令非常多。</p><ul><li>:w 保存</li><li>:q 退出</li><li>:wq 保存并退出</li><li>:x 保存并退出</li><li>ZZ 保存并退出</li><li>:q! 强制退出不保存</li><li>:wq! 强制保存并退出，适用于只读文件（没有写权限）</li><li>:set nu 以行号形式显示文件内容</li><li>:set nonu 取消行号显示</li><li>:行号 快速跳转到指定行</li><li>:%s 替换文件内容，g替换全文，默认只替换每一行匹配到的第一个关键字（数字s 指定替换的行）</li><li>:nohl 取消高亮显示</li></ul></li></ul><h2 id="_32-修改网卡ip地址" tabindex="-1"><a class="header-anchor" href="#_32-修改网卡ip地址" aria-hidden="true">#</a> 32.修改网卡IP地址</h2><ul><li>网卡配置文件地址： /etc/sysconfig/network-scripts/网卡名</li><li>ifconfig #用于显示和设置网卡的参数</li><li>systemctl restart network #重启网络</li><li>ifup 网卡名 #启动该网卡设备</li><li>ifdown 网卡名 #禁用该网卡设备</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token assign-left variable">TYPE</span><span class="token operator">=</span><span class="token string">&quot;Ethernet&quot;</span>
 <span class="token assign-left variable">PROXY_METHOD</span><span class="token operator">=</span><span class="token string">&quot;none&quot;</span>
 <span class="token assign-left variable">BROWSER_ONLY</span><span class="token operator">=</span><span class="token string">&quot;no&quot;</span>
 <span class="token assign-left variable">BOOTPROTO</span><span class="token operator">=</span><span class="token string">&quot;static&quot;</span>
 <span class="token assign-left variable">DEFROUTE</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
 <span class="token assign-left variable">IPV4_FAILURE_FATAL</span><span class="token operator">=</span><span class="token string">&quot;no&quot;</span>
 <span class="token assign-left variable">IPV6INIT</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
 <span class="token assign-left variable">IPV6_AUTOCONF</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
 <span class="token assign-left variable">IPV6_DEFROUTE</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
 <span class="token assign-left variable">IPV6_FAILURE_FATAL</span><span class="token operator">=</span><span class="token string">&quot;no&quot;</span>
 <span class="token assign-left variable">IPV6_ADDR_GEN_MODE</span><span class="token operator">=</span><span class="token string">&quot;stable-privacy&quot;</span>
 <span class="token assign-left variable">NAME</span><span class="token operator">=</span><span class="token string">&quot;ens33&quot;</span>
 <span class="token assign-left variable">UUID</span><span class="token operator">=</span><span class="token string">&quot;47fb2d04-5f3a-4c68-87d7-dcf09401edd1&quot;</span>
 <span class="token assign-left variable">DEVICE</span><span class="token operator">=</span><span class="token string">&quot;ens33&quot;</span>
 <span class="token assign-left variable">ONBOOT</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
 <span class="token assign-left variable">IPADDR</span><span class="token operator">=</span><span class="token string">&#39;192.168.74.101&#39;</span>
 <span class="token assign-left variable">NETMASK</span><span class="token operator">=</span><span class="token string">&#39;255.255.255.0&#39;</span>
 <span class="token assign-left variable">GATEWAY</span><span class="token operator">=</span><span class="token string">&#39;192.168.74.2&#39;</span>
 <span class="token assign-left variable">DNS1</span><span class="token operator">=</span><span class="token string">&#39;114.114.114.114&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启网络（IP地址发生改变，当前终端会断开）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl restart computer-network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>关闭网卡并激活网卡</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ifdown</span> ens33<span class="token punctuation">;</span><span class="token function">ifup</span> ens33
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看所有网卡信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token function">ip</span> a 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_33-host命令" tabindex="-1"><a class="header-anchor" href="#_33-host命令" aria-hidden="true">#</a> 33.host命令</h2><ul><li>host用于将一个域名解析到一个IP地址</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># host www.baidu.com</span>
www.baidu.com has address <span class="token number">110.242</span>.68.3
www.baidu.com has address <span class="token number">110.242</span>.68.4
www.baidu.com is an <span class="token builtin class-name">alias</span> <span class="token keyword">for</span> www.a.shifen.com.
www.baidu.com is an <span class="token builtin class-name">alias</span> <span class="token keyword">for</span> www.a.shifen.com.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_34-nslookup命令" tabindex="-1"><a class="header-anchor" href="#_34-nslookup命令" aria-hidden="true">#</a> 34.nslookup命令</h2><p>nslookup用于查询域名解析是否正常，在网络故障时用来诊断网络问题</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># nslookup www.baidu.com</span>
Server:		<span class="token number">114.114</span>.114.114
Address:	<span class="token number">114.114</span>.114.114<span class="token comment">#53</span>

Non-authoritative answer:
Name:	www.baidu.com
Address: <span class="token number">110.242</span>.68.4
Name:	www.baidu.com
Address: <span class="token number">110.242</span>.68.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_35-alias别名管理" tabindex="-1"><a class="header-anchor" href="#_35-alias别名管理" aria-hidden="true">#</a> 35.alias别名管理</h2><ul><li><p>alias命令用于设置命令别名，用户可以使用alias自定义命令别名来简化命令的复杂度</p></li><li><p>.bashrc 文件存放命令别名</p></li><li><p>命令格式：aliasi [别名]=[命令] #注意事项：等号（=）前后不能有空格</p></li><li><p>unalias 别名 #取消别名</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#定义别名</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># alias lsnet=&#39;ls /etc/sysconfig/computer-network-scripts/&#39;</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># lsnet</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># alias myls=&#39;ls -ldh&#39;</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># myls /opt</span>

<span class="token comment">#查看当前系统可用命令别名</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># alias</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">cp</span><span class="token operator">=</span><span class="token string">&#39;cp -i&#39;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">egrep</span><span class="token operator">=</span><span class="token string">&#39;egrep --color=auto&#39;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">fgrep</span><span class="token operator">=</span><span class="token string">&#39;fgrep --color=auto&#39;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">grep</span><span class="token operator">=</span><span class="token string">&#39;grep --color=auto&#39;</span>
<span class="token builtin class-name">alias</span> l.<span class="token operator">=</span><span class="token string">&#39;ls -d .* --color=auto&#39;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">ll</span><span class="token operator">=</span><span class="token string">&#39;ls -l --color=auto&#39;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">ls</span><span class="token operator">=</span><span class="token string">&#39;ls --color=auto&#39;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">lsnet</span><span class="token operator">=</span><span class="token string">&#39;ls /etc/sysconfig/computer-network-scripts/&#39;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">mv</span><span class="token operator">=</span><span class="token string">&#39;mv -i&#39;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">myls</span><span class="token operator">=</span><span class="token string">&#39;ls -ldh&#39;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">rm</span><span class="token operator">=</span><span class="token string">&#39;rm -i&#39;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">which</span><span class="token operator">=</span><span class="token string">&#39;alias | /usr/bin/which --tty-only --read-alias --show-dot --show-tilde&#39;</span>

<span class="token comment">#两条命令效果相同</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># ls -l hello</span>
-rw-r--r--. <span class="token number">1</span> root root <span class="token number">426</span> <span class="token number">3</span>月  <span class="token number">28</span> <span class="token number">15</span>:00 hello
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># ll hello</span>
-rw-r--r--. <span class="token number">1</span> root root <span class="token number">426</span> <span class="token number">3</span>月  <span class="token number">28</span> <span class="token number">15</span>:00 hello

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># which ls</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">ls</span><span class="token operator">=</span><span class="token string">&#39;ls --color=auto&#39;</span>
	/usr/sbin/ls
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># /usr/sbin/ls</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># ls</span>

<span class="token comment">#取消本次命令的别名功能“\\”</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># \\ls</span>

<span class="token comment">#取消命令别名</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># unalias myls</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># myls</span>
bash: myls: 未找到命令<span class="token punctuation">..</span>.

<span class="token comment">#定义别名不要跟系统命令发生冲突</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># alias ls=hostname</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># ls</span>
<span class="token builtin class-name">test</span>

<span class="token comment">#取消命令别名</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># unalias ls</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># alias</span>

<span class="token comment">#重新定义别名</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># alias ls=&#39;ls --color=auto&#39;</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_36-history-管理历史" tabindex="-1"><a class="header-anchor" href="#_36-history-管理历史" aria-hidden="true">#</a> 36.history 管理历史</h2><ul><li><p>history命令用于显示历史记录和执行过的命令，登录shell时会读取~./bash_history历史文件中记录下的命令，当退出或登出shell时，会自动保存到历史命令文件，该命令单独使用时，仅显示历史命令</p></li><li><p>历史命令默认只能存储1000条，可以通过/etc/profile文件修改</p></li><li><p>命令格式：history [-选项] [参数]</p></li><li><p>常用选项：</p><ul><li>-a 追加本次新执行的命令至历史命令文件中</li><li>-d 删除历史命令中指定的命令</li><li>-c 清空历史命令列表</li></ul></li><li><p>快捷操作：</p><ul><li><p>!# 调用命令历史中第N条命令</p></li><li><p>!string 调用命令历史中以strind开头的命令</p></li><li><p>!! 重复执行上一条命令</p></li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#获取命令帮助</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># help history </span>

<span class="token comment">#查看历史命令</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># history</span>

<span class="token comment">#查看记录历史命令文件</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat .bash_history </span>

<span class="token comment">#将历史命令同步至历史命令配置文件中</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># history -a</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat .bash_history </span>

<span class="token comment">#删除历史命令中655条命令历史</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># history -d 655</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># history -d 637</span>

<span class="token comment">#清空缓存中所有历史命令</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># history -c</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># history</span>
    <span class="token number">1</span>  <span class="token function">history</span>

<span class="token comment">#删除历史命令配置文件（该文件删除后系统会再次自动创建）</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># rm -rf .bash_history </span>

<span class="token comment">#快速调用历史命令中第1条</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># !1</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># !3</span>

<span class="token comment">#调用历史命令中以cat开头的命令（只调用最近使用的cat历史命令）</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># !cat</span>

<span class="token comment">#重复执行上一条命令</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># !!</span>

<span class="token comment">#历史命令默认只能记录1000条，可以通过/etc/profile文件修改</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/profile</span>
<span class="token punctuation">..</span>.
<span class="token number">46</span> <span class="token assign-left variable"><span class="token environment constant">HISTSIZE</span></span><span class="token operator">=</span><span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_37-date日期时间管理" tabindex="-1"><a class="header-anchor" href="#_37-date日期时间管理" aria-hidden="true">#</a> 37.date日期时间管理</h2><ul><li><p>date命令用于显示或设置系统日期与时间</p></li><li><p>命令格式：date [-选项] [+格式符] #查看系统日期时间</p></li><li><p>命令格式：date [-选项] #设置日期时间</p></li><li><p>常用选项：-s 设置日期时间</p></li><li><p>格式符：</p><ul><li><p>+%Y 年份</p></li><li><p>+%B 月份</p></li><li><p>+%d 日</p></li><li><p>+%H 时</p></li><li><p>+%M 分</p></li><li><p>+%S 秒</p></li><li><p>+%F 年-月-日</p></li><li><p>+%X 时：分：秒</p></li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#显示系统日期与时间</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date</span>
<span class="token number">2021</span>年 03月 <span class="token number">28</span>日 星期日 <span class="token number">17</span>:08:34 CST

<span class="token comment">#只显示年分</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date +%Y</span>
<span class="token number">2021</span>

<span class="token comment">#只显示月份</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date +%B</span>
三月

<span class="token comment">#只显示几号</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date +%d</span>
<span class="token number">28</span>

<span class="token comment">#只显示小时</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date +%H</span>
<span class="token number">17</span>

<span class="token comment">#只显示分钟</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date +%M</span>
<span class="token number">10</span>

<span class="token comment">#只显示秒</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date +%S</span>
<span class="token number">24</span>

<span class="token comment">#显示年月日</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date +%F</span>
<span class="token number">2021</span>-03-28

<span class="token comment">#显示时分秒</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date +%X</span>
<span class="token number">17</span>时12分10秒

<span class="token comment">#显示年月日时分秒</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date +%F%X</span>
<span class="token number">2021</span>-03-2817时12分39秒

<span class="token comment">#可以自定义分隔符“-”</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date +%F-%X</span>
<span class="token number">2021</span>-03-28-17时13分38秒

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date +%F:%X</span>
<span class="token number">2021</span>-03-28:17时13分55秒

<span class="token comment">#修改系统年月日</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date -s 2020-03-28</span>
<span class="token number">2020</span>年 03月 <span class="token number">28</span>日 星期六 00:00:00 CST

<span class="token comment">#修改系统时分秒</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date -s 17:16:00</span>
<span class="token number">2020</span>年 03月 <span class="token number">28</span>日 星期六 <span class="token number">17</span>:16:00 CST

<span class="token comment">#修改年月日时分秒</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date -s &#39;2021-03-28 17:17:00&#39;</span>
<span class="token number">2021</span>年 03月 <span class="token number">28</span>日 星期日 <span class="token number">17</span>:17:00 CST
<span class="token comment">#解释：</span>
<span class="token string">&#39;&#39;</span>单引号：引用整体，屏蔽特殊符号的功能
<span class="token string">&quot;&quot;</span>双引号：引用整体，不会屏蔽特殊符号的功能

<span class="token comment">#Linux的两种时钟</span>
系统时钟：内核通过CPU的工作频率去计算的时间
硬件时钟：

<span class="token comment">#显示硬件时间</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># clock</span>
<span class="token number">2021</span>年03月28日 星期日 <span class="token number">17</span>时23分42秒  <span class="token parameter variable">-0.945549</span> 秒

<span class="token comment">#显示并同步系统与硬件时钟</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># man hwclock</span>
-s：把系统时间设置成与硬件时间相同
-w：把硬件时间设置成与系统时间相同
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># hwclock -w</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># date</span>
<span class="token number">2021</span>年 03月 <span class="token number">28</span>日 星期日 <span class="token number">17</span>:27:18 CST

<span class="token comment">#cal显示日历</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cal</span>
      三月 <span class="token number">2021</span>     
日 一 二 三 四 五 六
    <span class="token number">1</span>  <span class="token number">2</span>  <span class="token number">3</span>  <span class="token number">4</span>  <span class="token number">5</span>  <span class="token number">6</span>
 <span class="token number">7</span>  <span class="token number">8</span>  <span class="token number">9</span> <span class="token number">10</span> <span class="token number">11</span> <span class="token number">12</span> <span class="token number">13</span>
<span class="token number">14</span> <span class="token number">15</span> <span class="token number">16</span> <span class="token number">17</span> <span class="token number">18</span> <span class="token number">19</span> <span class="token number">20</span>
<span class="token number">21</span> <span class="token number">22</span> <span class="token number">23</span> <span class="token number">24</span> <span class="token number">25</span> <span class="token number">26</span> <span class="token number">27</span>
<span class="token number">28</span> <span class="token number">29</span> <span class="token number">30</span> <span class="token number">31</span>

<span class="token comment">#显示指定的全年月份</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cal 2021</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_38-wc统计命令" tabindex="-1"><a class="header-anchor" href="#_38-wc统计命令" aria-hidden="true">#</a> 38.wc统计命令</h2><ul><li><p>wc 用于统计文件的字节数、行数，并将统计的结果输出到屏幕</p></li><li><p>命令格式：wc [-选项] 文件名</p></li><li><p>常用选项：</p><ul><li>-c #统计字节数</li><li>-l #统计行数</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># wc /etc/passwd</span>
 <span class="token number">20</span>  <span class="token number">28</span> <span class="token number">886</span> /etc/passwd
行数 单词 字节  文件名

<span class="token comment">#统计文件字节数</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># wc -c /etc/passwd</span>
<span class="token number">886</span> /etc/passwd

<span class="token comment">#统计文件行数</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># wc -l /etc/passwd</span>
<span class="token number">20</span> /etc/passwd

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># wc -l /etc/fstab</span>
<span class="token number">11</span> /etc/fstab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_39-管道符" tabindex="-1"><a class="header-anchor" href="#_39-管道符" aria-hidden="true">#</a> 39.管道符</h2><p>管道符“|”：将命令的输出结果交给另外一条命令作为参数继续处理</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># head -10 /etc/passwd |tail -5</span>

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># head -10 /etc/passwd |tail -5 |wc -l</span>
<span class="token number">5</span>

root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat -n /etc/passwd |head -10|tail -5</span>
     <span class="token number">6</span>	sync:x:5:0:sync:/sbin:/bin/sync
     <span class="token number">7</span>	shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
     <span class="token number">8</span>	halt:x:7:0:halt:/sbin:/sbin/halt
     <span class="token number">9</span>	mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
    <span class="token number">10</span>	operator:x:11:0:operator:/root:/sbin/nologin

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># ifconfig ens32 |head -2</span>
ens32: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet <span class="token number">192.168</span>.0.50  netmask <span class="token number">255.255</span>.255.0  broadcast <span class="token number">192.168</span>.0.255
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_40-重定向操作" tabindex="-1"><a class="header-anchor" href="#_40-重定向操作" aria-hidden="true">#</a> 40.重定向操作</h2><ul><li><p>重定向操作：将前面命令的输出结果，写入到其他的文本文件中</p></li><li><p>重定向的表示符号</p><ul><li>&gt; #重定向输出（覆盖）</li><li>&gt;&gt; #重定向输出（追加）</li><li>&lt; #输入重定向（覆盖）</li><li>&lt;&lt; #输入重定向（追加）</li><li>&gt; 只收集正确的输出结果</li><li>2&gt; 只收集错误的输出结果（覆盖）</li><li>2&gt;&gt; 只收集错误的输出结果（追加）</li><li>&amp;&gt; 正确错误都收集（覆盖）</li><li>&amp;&gt;&gt; 正确错误都收集（追加）</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#将命令的输出结果以覆盖的方式重定向到文件中，（&gt;附带创建文件功能）</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># ifconfig ens32 |head -2 &gt; /opt/ens32.bak</span>
ens32: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet <span class="token number">192.168</span>.0.50  netmask <span class="token number">255.255</span>.255.0  broadcast <span class="token number">192.168</span>.0.255

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/hostname &gt; /opt/ens32.bak </span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/ens32.bak </span>
<span class="token builtin class-name">test</span>

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># free -h &gt; /opt/free.bak</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/free.bak </span>
              total        used        <span class="token function">free</span>      shared  buff/cache   available
Mem:           972M        414M        123M         15M        435M        336M
Swap:          <span class="token number">2</span>.0G          0B        <span class="token number">2</span>.0G

<span class="token comment">#将命令的输出结果以追加的方式重定向到文件中</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/hostname &gt;&gt; /opt/free.bak </span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/free.bak </span>

<span class="token comment">#“&gt;”只收集正确的输出结果，不收集错误的输出结果</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># ls xxooooxx &gt; /opt/xx.txt</span>
ls: 无法访问xxooooxx: 没有那个文件或目录

<span class="token comment">#“2&gt;”只收集错误的输出结果，不收集正确的输出结果</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># ls xxooooxx 2&gt; /opt/xx.txt</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/xx.txt </span>
ls: 无法访问xxooooxx: 没有那个文件或目录

<span class="token comment">#“2&gt;”以覆盖的方式将输出结果重定向到文件中</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/abc 2&gt; /opt/ens32.bak </span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/ens32.bak </span>
cat: /etc/abc: 没有那个文件或目录

<span class="token comment">#“2&gt;&gt;”以追加的方式将输出结果重定向到文件中</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># ls /etc/abcd 2&gt;&gt; /opt/ens32.bak </span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/ens32.bak </span>
cat: /etc/abc: 没有那个文件或目录
ls: 无法访问/etc/abcd: 没有那个文件或目录

<span class="token comment">#“&amp;&gt;”以覆盖的方式将正确输出与错误输出重定向到文件中</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># lscat &amp;&gt; /opt/abc.txt</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/abc.txt </span>

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># ls /etc/passwd &amp;&gt; /opt/pass.bak</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/pass.bak </span>

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># free -h &amp;&gt; /opt/pass.bak </span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/pass.bak </span>

<span class="token comment">#“&amp;&gt;”以追加的方式将正确输出与错误输出重定向到文件中</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># ifconfig ens32 | head -2 &amp;&gt;&gt; /opt/pass.bak </span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/pass.bak </span>

<span class="token comment">#以覆盖方式将正确输出与错误输出重定向到不同文件中</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># ll -d /root/  bcd &gt;a.txt 2&gt;b.txt</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat a.txt </span>
dr-xr-x---. <span class="token number">24</span> root root <span class="token number">4096</span> <span class="token number">3</span>月  <span class="token number">28</span> <span class="token number">18</span>:07 /root/
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat b.txt </span>
ls: 无法访问bcd: 没有那个文件或目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_41-echo命令与sleep命令" tabindex="-1"><a class="header-anchor" href="#_41-echo命令与sleep命令" aria-hidden="true">#</a> 41.echo命令与sleep命令</h2><ul><li><p>echo命令用于输出指定的字符串和变量</p></li><li><p>命令格式：echo [-选项] [参数]</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># echo $PATH</span>
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># echo xxoo</span>
xxoo

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># echo abc</span>
abc

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># echo 男人好难</span>
男人好难

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># echo 123</span>
<span class="token number">123</span>

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/hostname </span>
<span class="token builtin class-name">test</span>

<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># echo localhost &gt; /etc/hostname</span>
<span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/hostname </span>
localhost
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>sleep命令可以用来将目前动作延迟一段时间</p></li><li><p>命令格式：sleep 时间</p></li><li><p>常用选项： s 秒 m 分钟 h 小时 d 日</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@lesson101 ~<span class="token punctuation">]</span><span class="token comment"># sleep 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_42" tabindex="-1"><a class="header-anchor" href="#_42" aria-hidden="true">#</a> 42.</h2><h2 id="_35-man-获取命令帮助手册" tabindex="-1"><a class="header-anchor" href="#_35-man-获取命令帮助手册" aria-hidden="true">#</a> 35.man 获取命令帮助手册</h2><ul><li><p>man 命令用于查看系统命令的帮助信息，包括使用方法、选项、使用例子等…，对比--help ，man 输出的信息更加详细</p></li><li><p>命令格式：man [-选项] 命令</p></li><li><p>常用快捷操作</p><ul><li><p>向下键向下移一行</p></li><li><p>向上键向上移一行</p></li><li><p>[Page Down] 向下翻一页</p></li><li><p>[Page Up] 向上翻一页</p></li><li><p>/关键字 #搜索关键字，配合n（向下查询）、N（向上查询）</p></li><li><p>q 退出</p></li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># man ls</span>
<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># man cat</span>
<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># man touch</span>
<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># man mkdir</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># info ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_90-linux系统的运行级别" tabindex="-1"><a class="header-anchor" href="#_90-linux系统的运行级别" aria-hidden="true">#</a> 90.Linux系统的运行级别</h2><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,46);function T(B,A){const e=o("ExternalLinkIcon");return p(),i("div",null,[u,n("p",null,[s("第一步，打开"),n("a",r,[s("vim"),l(e)])]),d,n("h2",m,[v,s(),n("a",k,[s("8.ls"),l(e)]),s(" 查看目录/文件命令")]),b,n("h2",h,[g,s(),n("a",f,[s("17.mv"),l(e)]),s(" 移动命令")]),x,n("h2",w,[_,s(),n("a",q,[s("31.vi/vim文本编辑器"),l(e)])]),y])}const N=t(c,[["render",T],["__file","linux-note.html.vue"]]);export{N as default};
