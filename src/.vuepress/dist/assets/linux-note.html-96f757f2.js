import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as s,b as n,d as l,e as a}from"./app-cc68b47f.js";const p={},u=a('<h2 id="_1-命令终端字段含义介绍" tabindex="-1"><a class="header-anchor" href="#_1-命令终端字段含义介绍" aria-hidden="true">#</a> 1.命令终端字段含义介绍</h2><ul><li><p>[root@localhost ~]#</p></li><li><p>解释：</p><ul><li>root：当前登录系统用户名(root超级管理员)</li><li>localhost ：当前主机名</li><li><sub>：当前用户所在目录（</sub> 为家目录） ，root超级管理员家目录：/root</li><li>#： 当前用户身份是超级管理员</li></ul></li><li><p>[student@localhost ~]$</p><ul><li>$：当前用户身份为普通用户，普通用户的家目录：/home/用户名同名</li></ul></li></ul><h2 id="_3-linux系统基本概念" tabindex="-1"><a class="header-anchor" href="#_3-linux系统基本概念" aria-hidden="true">#</a> 3.Linux系统基本概念</h2><ul><li>多用户的系统：允许同时有很多个用户登录系统，使用系统里的资源</li><li>多任务的系统：允许同时执行多个任务</li><li>严格区分大小写：命令，选项，参数，文件名，目录名都严格区分大小写</li><li>一切皆文件：硬件设备（内存、CPU、网卡、显示器、硬盘等等）都是以文件的形式存在的</li><li>不管是文件还是目录都是以倒挂的树形结构，存在于系统的“/”根目录下，根目录是Linux系统的起点</li><li>对于Linux系统而言，目录/文件没有扩展名一说，扩展名如：.sh（脚本文件) .conf（配置文件） .log（日志文件） .rpm（软件包）.tar（压缩包）是易于用户方便识别</li><li>没有提示就是最好的提示（成功了）</li><li>Linux系统没有回收站</li></ul><h2 id="_4-显示行号" tabindex="-1"><a class="header-anchor" href="#_4-显示行号" aria-hidden="true">#</a> 4.显示行号</h2>',5),d={href:"https://so.csdn.net/so/search?q=vim&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},r=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> ~/.vimrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第二步，在该文件中加入一行，命令如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">set</span> nu                       <span class="token comment"># 显示行号</span>
<span class="token builtin class-name">set</span> nonu                     <span class="token comment"># 不显示行号    </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-命令行编辑技巧" tabindex="-1"><a class="header-anchor" href="#_5-命令行编辑技巧" aria-hidden="true">#</a> 5.命令行编辑技巧</h2><p>键盘上下键调出历史命令</p><blockquote><p>Ctrl + c：废弃当前命令行中的命令，取消当前执行的命令，例如ping</p><p>Ctrl + l,clear：清屏</p><p>tab建自动补齐：可补齐命令、参数、文件路径、软件名</p><p>esc + . ：将上一条命令参数变成当前命令的执行对象</p><p>Ctrl + a：将当前光标移动至行首</p><p>Ctrl + e：将当前光标移动至行尾</p><p>Ctrl + u 清空至行首</p><p>Ctrl + w 删除一个单词</p><p>exit，logout：退出系统</p></blockquote><h2 id="_6-命令行一般命令格式" tabindex="-1"><a class="header-anchor" href="#_6-命令行一般命令格式" aria-hidden="true">#</a> 6.命令行一般命令格式</h2><ul><li>命令字 [-选项...] [参数...] <ul><li>命令字：命令本身（功能）</li><li>选项：调整命令功能的 <ul><li>短选项：-l -a -d -h（单个字符），短选项可以合并使用：-lad -lh</li><li>长选项：--help（单词），长选项通常是不能合并使用的</li></ul></li><li>参数：命令的执行对象，文件/目录/程序等</li><li>[]：可选的</li><li>...：可以同时有多个选项或参数</li></ul></li></ul><h2 id="_7-linux系统辨别目录与文件的方法" tabindex="-1"><a class="header-anchor" href="#_7-linux系统辨别目录与文件的方法" aria-hidden="true">#</a> 7.Linux系统辨别目录与文件的方法</h2><blockquote><p>蓝色表示目录（windows系统里的文件夹）</p><p>白色表示文件</p><p>浅蓝色表示链接文件（类似于windows系统的快捷方式）</p><p>绿色表示可执行文件（如脚本，命令程序文件）</p><p>红色表示压缩文件</p><p>黄色表示设备文件（硬盘、键盘、鼠标、网卡、CPU硬件设备都是以文件的形式存在的）</p><p>红色闪动文件——&gt;表示链接文件不可用</p></blockquote>`,10),m={id:"_8-ls-查看目录-文件命令",tabindex:"-1"},v=s("a",{class:"header-anchor",href:"#_8-ls-查看目录-文件命令","aria-hidden":"true"},"#",-1),k={href:"http://8.ls",target:"_blank",rel:"noopener noreferrer"},b=a(`<ul><li><p>ls命令（英文全拼：list）：用于查看目录下内容及目录和文件详细属性信息</p></li><li><p>命令格式：ls [-选项...] [参数...]</p></li><li><p>常用选项：</p><ul><li>-a 显示目录下所有内容，包含隐藏的内容</li><li>-l 以长格式显示目录下的内容及详细属性</li><li>-h 人性化显示目录下内容大小（kB、MB、GB）</li><li>-d 仅显示目录本身而不显示目录下的内容</li><li>-i 查看inode号（系统任何的文件或目录都有一个唯一的编号）</li><li>-R：递归查看目录下所有内容（从头到尾）</li></ul></li><li><p>注意（附加）：递归是指将所有的目录从头到尾全部呈现出来。</p></li></ul><h2 id="_9-linux系统文件类型" tabindex="-1"><a class="header-anchor" href="#_9-linux系统文件类型" aria-hidden="true">#</a> 9.Linux系统文件类型</h2><blockquote><p>- 文件：</p><p>d 目录：</p><p>l 链接文件</p><p>b 跨设备文件</p><p>c 字符设备文件</p><p>p 管道设备文件</p><p>s 套接字</p></blockquote><h2 id="_10-linux系统下的归属关系" tabindex="-1"><a class="header-anchor" href="#_10-linux系统下的归属关系" aria-hidden="true">#</a> 10.Linux系统下的归属关系</h2><ul><li><p>在<strong>Linux</strong>系统下，文件给用户分成了三类</p><ul><li><p>所有者：文件或目录的拥有者，拥有者的权限通常是最大的</p></li><li><p>所属组：文件或目录属于哪一个组，所属组的权限略微比所有者小</p></li><li><p>其他人：既不是文件或目录的所有者，也不属于文件或目录组内的成员，其他人的权限通常最小的权限</p></li></ul></li><li><p>ls命令示例：</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#显示当前所在目录下的所有内容</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_16-cp-复制命令" tabindex="-1"><a class="header-anchor" href="#_16-cp-复制命令" aria-hidden="true">#</a> 16.cp 复制命令</h2><ul><li><p>cp（英文全拼：copy file）用于复制文件或目录，cp命令在复制时也可修改目录或文件名字</p></li><li><p>命令格式：cp [-选项] 源文件或目录 目标目录</p></li><li><p>常用选项：</p><ul><li>-p 保留源文件属性不变（如：修改时间、归属关系、权限）</li><li>-r 复制目录（包含该目录下所有的子目录和文件）</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#复制当前目录文件到/opt目录（相对路径方式复制）</span>
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
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cd /etc/sysconfig/network-scripts/</span>
<span class="token punctuation">[</span>root@localhost network-scripts<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/etc/sysconfig/network-scripts

<span class="token punctuation">[</span>root@localhost network-scripts<span class="token punctuation">]</span><span class="token comment"># cp /root/t1 .</span>
<span class="token punctuation">[</span>root@localhost network-scripts<span class="token punctuation">]</span><span class="token comment"># ls</span>

<span class="token comment">#操持属性不变复制文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp -p anaconda-ks.cfg /opt</span>
cp：是否覆盖<span class="token string">&quot;/opt/anaconda-ks.cfg&quot;</span>？ y                         
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l /opt/anaconda-ks.cfg </span>
-rw-------. <span class="token number">1</span> root root <span class="token number">1800</span> <span class="token number">3</span>月  <span class="token number">13</span> <span class="token number">17</span>:34 /opt/anaconda-ks.cfg

<span class="token comment">#对比以上两个文件的详细属性信息（最后一次修改时间）</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l anaconda-ks.cfg </span>
-rw-------. <span class="token number">1</span> root root <span class="token number">1800</span> <span class="token number">3</span>月  <span class="token number">13</span> <span class="token number">17</span>:34 anaconda-ks.cfg

<span class="token comment">#这两个操作代表什么意思？</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp -r xxxx /mnt/oooo  #拷贝并改名</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp -r xxxx /mnt/oooo  #拷贝</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),h={id:"_17-mv-移动命令",tabindex:"-1"},x=s("a",{class:"header-anchor",href:"#_17-mv-移动命令","aria-hidden":"true"},"#",-1),g={href:"http://17.mv",target:"_blank",rel:"noopener noreferrer"},f=a(`<ul><li><p>mv（英文全拼：move file）用于移动文件或目录到其他位置，也可用于修改目录或文件名</p></li><li><p>命令格式：mv [-选项] 源文件... 目标路径</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#移动当前路径hello文件到/mnt目录</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_18-cat-查看文件内容命令" tabindex="-1"><a class="header-anchor" href="#_18-cat-查看文件内容命令" aria-hidden="true">#</a> 18.cat 查看文件内容命令</h2><ul><li><p>cat （英文全拼：concatenate）命令用于查看文本文件内容</p></li><li><p>命令格式：cat [选项] 文件名</p></li><li><p>常用选项</p><ul><li>-n #查看文件时以行号的形式显示文件内容</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看文件内容</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat anaconda-ks.cfg </span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat initial-setup-ks.cfg </span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/hosts</span>

<span class="token comment">#查看网卡文件内容，网卡配置文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/sysconfig/network-scripts/ifcfg-ens32 </span>
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
CentOS Linux release <span class="token number">7.6</span>.1810 <span class="token punctuation">(</span>Core<span class="token punctuation">)</span> 

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
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># head /etc/sysconfig/network-scripts/ifcfg-ens32 </span>

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
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># tail -n 5 /etc/sysconfig/network-scripts/ifcfg-ens32 </span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_25-man-获取命令帮助手册" tabindex="-1"><a class="header-anchor" href="#_25-man-获取命令帮助手册" aria-hidden="true">#</a> 25.man 获取命令帮助手册</h2><ul><li><p>man 命令用于查看系统命令的帮助信息，包括使用方法、选项、使用例子等…，对比--help ，man 输出的信息更加详细</p></li><li><p>命令格式：man [-选项] 命令</p></li><li><p>常用快捷操作</p><ul><li><p>向下键向下移一行</p></li><li><p>向上键向上移一行</p></li><li><p>[Page Down] 向下翻一页</p></li><li><p>[Page Up] 向上翻一页</p></li><li><p>/关键字 #搜索关键字，配合n（向下查询）、N（向上查询）</p></li><li><p>q 退出</p></li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># man ls</span>
<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># man cat</span>
<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># man touch</span>
<span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># man mkdir</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost etc<span class="token punctuation">]</span><span class="token comment"># info ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_26-linux系统的运行级别" tabindex="-1"><a class="header-anchor" href="#_26-linux系统的运行级别" aria-hidden="true">#</a> 26.Linux系统的运行级别</h2><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,34);function _(w,q){const t=o("ExternalLinkIcon");return c(),i("div",null,[u,s("p",null,[n("第一步，打开"),s("a",d,[n("vim"),l(t)])]),r,s("h2",m,[v,n(),s("a",k,[n("8.ls"),l(t)]),n(" 查看目录/文件命令")]),b,s("h2",h,[x,n(),s("a",g,[n("17.mv"),l(t)]),n(" 移动命令")]),f])}const L=e(p,[["render",_],["__file","linux-note.html.vue"]]);export{L as default};
