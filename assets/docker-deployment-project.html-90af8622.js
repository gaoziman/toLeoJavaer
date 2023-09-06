import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as t,c as l,a as n,b as a,d as o,f as s}from"./app-a867567b.js";const i={},c=s(`<h2 id="_1-docker环境安装" tabindex="-1"><a class="header-anchor" href="#_1-docker环境安装" aria-hidden="true">#</a> 1. Docker环境安装</h2><h3 id="_1-1-centos安装docker" tabindex="-1"><a class="header-anchor" href="#_1-1-centos安装docker" aria-hidden="true">#</a> 1.1 Centos安装Docker</h3><h3 id="_1-2-卸载-可选" tabindex="-1"><a class="header-anchor" href="#_1-2-卸载-可选" aria-hidden="true">#</a> 1.2 卸载（可选）</h3><p>如果之前安装过旧版本的Docker，可以使用下面命令卸载：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>yum remove docker \\
                  docker<span class="token operator">-</span>client \\
                  docker<span class="token operator">-</span>client<span class="token operator">-</span>latest \\
                  docker<span class="token operator">-</span>common \\
                  docker<span class="token operator">-</span>latest \\
                  docker<span class="token operator">-</span>latest<span class="token operator">-</span>logrotate \\
                  docker<span class="token operator">-</span>logrotate \\
                  docker<span class="token operator">-</span>selinux \\
                  docker<span class="token operator">-</span>engine<span class="token operator">-</span>selinux \\
                  docker<span class="token operator">-</span>engine \\
                  docker<span class="token operator">-</span>ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-安装docker" tabindex="-1"><a class="header-anchor" href="#_1-3-安装docker" aria-hidden="true">#</a> 1.3 安装Docker</h3>`,6),d={href:"https://so.csdn.net/so/search?q=%E8%99%9A%E6%8B%9F%E6%9C%BA%E8%81%94%E7%BD%91&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},v=s(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils <span class="token punctuation">\\</span>
           device-mapper-persistent-data <span class="token punctuation">\\</span>
           lvm2 --skip-broken
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>更新本地镜像源并设置Docker镜像源</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 设置docker镜像源</span>
yum-config-manager <span class="token punctuation">\\</span>
    --add-repo <span class="token punctuation">\\</span>
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/download.docker.com/mirrors.aliyun.com\\/docker-ce/g&#39;</span> /etc/yum.repos.d/docker-ce.repo

yum makecache fast
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>输入命令，安装Docker</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>yum install <span class="token operator">-</span>y docker<span class="token operator">-</span>ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**docker-ce为社区免费版本。稍等片刻，docker即可安装成功。 **</p><h3 id="_1-4-启动docker" tabindex="-1"><a class="header-anchor" href="#_1-4-启动docker" aria-hidden="true">#</a> 1.4 启动Docker</h3><ol><li><strong>启动docker前，一定要关闭防火墙 (这里如果使用的是云服务器可以不用设置)</strong></li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code># 关闭
systemctl stop firewalld

# 禁止开机启动防火墙
systemctl disable firewalld

#查看是否关闭防火墙
systemctl status firewalld

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>通过命令启动docker</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code># 启动docker服务
systemctl start docker

# 停止docker服务
systemctl stop docker 

# 重启docker服务
systemctl restart docker  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-其他服务安装" tabindex="-1"><a class="header-anchor" href="#_2-其他服务安装" aria-hidden="true">#</a> 2. 其他服务安装</h2><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>部署若依前后端分离版 需要安装MySQL、Redis、Nginx</p></div><h3 id="_2-1-dcoker安装mysql" tabindex="-1"><a class="header-anchor" href="#_2-1-dcoker安装mysql" aria-hidden="true">#</a> 2.1 Dcoker安装MySQL</h3><h4 id="_1-拉取镜像" tabindex="-1"><a class="header-anchor" href="#_1-拉取镜像" aria-hidden="true">#</a> 1. 拉取镜像</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>docker pull mysql<span class="token operator">:</span><span class="token number">8.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-查看是否拉取成功" tabindex="-1"><a class="header-anchor" href="#_2-查看是否拉取成功" aria-hidden="true">#</a> 2. 查看是否拉取成功</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>docker images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如下便是拉取成功<br><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112125493.png" alt="image.png" loading="lazy"></p><h4 id="_3-创建文件夹-配置、数据等" tabindex="-1"><a class="header-anchor" href="#_3-创建文件夹-配置、数据等" aria-hidden="true">#</a> 3. 创建文件夹(配置、数据等)</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>mkdir <span class="token operator">-</span>p <span class="token operator">/</span>work<span class="token operator">/</span>docker<span class="token operator">/</span>mysql<span class="token operator">/</span>conf
mkdir <span class="token operator">-</span>p <span class="token operator">/</span>work<span class="token operator">/</span>docker<span class="token operator">/</span>mysql<span class="token operator">/</span>data
mkdir <span class="token operator">-</span>p <span class="token operator">/</span>work<span class="token operator">/</span>docker<span class="token operator">/</span>mysql<span class="token operator">/</span>log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建配置文件</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>创建文件：<span class="token operator">/</span>work<span class="token operator">/</span>docker<span class="token operator">/</span>mysql<span class="token operator">/</span>conf<span class="token operator">/</span>my<span class="token punctuation">.</span>cnf
命令： touch <span class="token operator">/</span>work<span class="token operator">/</span>docker<span class="token operator">/</span>mysql<span class="token operator">/</span>conf<span class="token operator">/</span>my<span class="token punctuation">.</span>cnf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>内容如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token punctuation">[</span>client<span class="token punctuation">]</span>
<span class="token keyword">default</span><span class="token operator">-</span>character<span class="token operator">-</span>set<span class="token operator">=</span>utf8mb4
 
<span class="token punctuation">[</span>mysql<span class="token punctuation">]</span>
<span class="token keyword">default</span><span class="token operator">-</span>character<span class="token operator">-</span>set<span class="token operator">=</span>utf8mb4
 
<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
#服务端口号 默认<span class="token number">3306</span>
port<span class="token operator">=</span><span class="token number">3306</span>
 
datadir <span class="token operator">=</span> <span class="token operator">/</span>work<span class="token operator">/</span>docker<span class="token operator">/</span>mysql<span class="token operator">/</span>data
 
init_connect<span class="token operator">=</span>&#39;<span class="token constant">SET</span> <span class="token constant">NAMES</span> utf8mb4&#39;
character<span class="token operator">-</span>set<span class="token operator">-</span>server<span class="token operator">=</span>utf8mb4
collation<span class="token operator">-</span>server<span class="token operator">=</span>utf8mb4_unicode_ci
 
# 最大连接数
max_connections<span class="token operator">=</span><span class="token number">200</span>
 
# 连接失败的最大次数。防止有人从该主机试图攻击数据库系统
max_connect_errors<span class="token operator">=</span><span class="token number">20</span>
 
# 创建新表时将使用的默认存储引擎
<span class="token keyword">default</span><span class="token operator">-</span>storage<span class="token operator">-</span>engine<span class="token operator">=</span><span class="token constant">INNODB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h4><p>启动容器</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>docker run <span class="token operator">-</span>p <span class="token number">3306</span><span class="token operator">:</span><span class="token number">3306</span>  \\
<span class="token operator">--</span>name mysql8 \\
<span class="token operator">--</span>privileged<span class="token operator">=</span><span class="token boolean">true</span> \\
<span class="token operator">-</span>v <span class="token operator">/</span>work<span class="token operator">/</span>docker<span class="token operator">/</span>mysql<span class="token operator">/</span>log<span class="token operator">:</span><span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>log<span class="token operator">/</span>mysql \\
<span class="token operator">-</span>v <span class="token operator">/</span>work<span class="token operator">/</span>docker<span class="token operator">/</span>mysql<span class="token operator">/</span>data<span class="token operator">:</span><span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>lib<span class="token operator">/</span>mysql \\
<span class="token operator">-</span>v <span class="token operator">/</span>work<span class="token operator">/</span>docker<span class="token operator">/</span>mysql<span class="token operator">/</span>conf<span class="token operator">:</span><span class="token operator">/</span>etc<span class="token operator">/</span>mysql<span class="token operator">/</span>conf<span class="token punctuation">.</span>d \\
<span class="token operator">-</span>e <span class="token constant">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>root \\
<span class="token operator">-</span>d mysql<span class="token operator">:</span><span class="token number">8.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>–privileged=true<br> 设置MySQL 的root用户权限, 否则外部不能使用root用户登陆。<br> -e MYSQL_ROOT_PASSWORD=123456<br> 设置MySQL数据库root用户的密码</p></div><h4 id="_4-查看启动后的容器" tabindex="-1"><a class="header-anchor" href="#_4-查看启动后的容器" aria-hidden="true">#</a> 4. 查看启动后的容器</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>docker ps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112125839.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h4 id="_5-设置密码等" tabindex="-1"><a class="header-anchor" href="#_5-设置密码等" aria-hidden="true">#</a> 5. 设置密码等</h4><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>实际原来的root仍然有效，只不过只能localhost机器能用（在MySQL服务器上的mysql命令直连时可以使用）Navicat不能用。</p></div><h5 id="_1-进入容器内部" tabindex="-1"><a class="header-anchor" href="#_1-进入容器内部" aria-hidden="true">#</a> <strong>1.进入容器内部</strong></h5><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>docker exec <span class="token operator">-</span>it mysql8 <span class="token operator">/</span>bin<span class="token operator">/</span>bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_2-连接mysql" tabindex="-1"><a class="header-anchor" href="#_2-连接mysql" aria-hidden="true">#</a> <strong>2.连接mysql</strong></h5><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>mysql <span class="token operator">-</span>u root <span class="token operator">-</span>p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112125864.png" alt="image.png" loading="lazy"><br> 输入前边设置的密码：root，然后回车。</p><h5 id="_3-修改访问主机以及密码" tabindex="-1"><a class="header-anchor" href="#_3-修改访问主机以及密码" aria-hidden="true">#</a> <strong>3.修改访问主机以及密码</strong></h5><p>设置为所有主机可访问</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token constant">ALTER</span> <span class="token constant">USER</span> <span class="token char">&#39;root&#39;</span>@<span class="token char">&#39;%&#39;</span> <span class="token constant">IDENTIFIED</span> <span class="token constant">BY</span> <span class="token char">&#39;新密码&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,42),u={href:"https://so.csdn.net/so/search?q=Mysql8&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},m=s(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token constant">CREATE</span> <span class="token constant">USER</span> <span class="token char">&#39;root&#39;</span>@<span class="token char">&#39;%&#39;</span> <span class="token constant">IDENTIFIED</span> <span class="token constant">WITH</span> <span class="token constant">MYSQL_NATIVE_PASSWORD</span> <span class="token constant">BY</span> <span class="token char">&#39;222333&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_4-刷新权限" tabindex="-1"><a class="header-anchor" href="#_4-刷新权限" aria-hidden="true">#</a> <strong>4.刷新权限</strong></h5><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">FLUSH</span> <span class="token constant">PRIVILEGES</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>完工！！！</strong></p><h3 id="_2-2-docker安装redis" tabindex="-1"><a class="header-anchor" href="#_2-2-docker安装redis" aria-hidden="true">#</a> 2.2 Docker安装Redis</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token number">1.</span> 拉取redis镜像
# 不指定版本号，默认拉取最新版的redis 
docker pull redis
# 指定的版本号 docker pull redis<span class="token operator">:</span><span class="token number">5.0</span><span class="token number">.14</span>
# 查看镜像是否拉取成功docker images

<span class="token number">2.</span> 运行redis
# 带密码认证的redis，登录时需要输入验证码  appendonly（redis是否持久化）
docker run <span class="token operator">--</span>name redis <span class="token operator">-</span>p <span class="token number">6379</span><span class="token operator">:</span><span class="token number">6379</span> <span class="token operator">-</span>d <span class="token operator">--</span>restart<span class="token operator">=</span>always redis redis<span class="token operator">-</span>server <span class="token operator">--</span>appendonly yes <span class="token operator">--</span>requirepass cisyam

# 不带密码认证的redis
docker run <span class="token operator">--</span>name redis <span class="token operator">-</span>p <span class="token number">6379</span><span class="token operator">:</span><span class="token number">6379</span> <span class="token operator">-</span>d <span class="token operator">--</span>restart<span class="token operator">=</span>always redis redis<span class="token operator">-</span>server <span class="token operator">--</span>appendonly yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-docker安装nginx" tabindex="-1"><a class="header-anchor" href="#_2-3-docker安装nginx" aria-hidden="true">#</a> 2.3 Docker安装Nginx</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code># 拉取nginx
docker pull nginx<span class="token operator">:</span><span class="token number">1.18</span>

# 挂载文件 本地路径
mkdir	<span class="token operator">-</span>p <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>conf
mkdir	<span class="token operator">-</span>p <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>log
mkdir	<span class="token operator">-</span>p <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>html
# 挂载
# 生成容器
docker run <span class="token operator">--</span>name nginx <span class="token operator">-</span>p <span class="token number">80</span><span class="token operator">:</span><span class="token number">80</span> <span class="token operator">-</span>d nginx<span class="token operator">:</span><span class="token number">1.18</span>
docker run <span class="token operator">--</span>name nginx <span class="token operator">-</span>p <span class="token number">100</span><span class="token operator">:</span><span class="token number">80</span> <span class="token operator">-</span>d nginx<span class="token operator">:</span><span class="token number">1.18</span>

# 将容器nginx<span class="token punctuation">.</span>conf文件复制到宿主机
# 将容器conf<span class="token punctuation">.</span>d文件夹下内容复制到宿主机
# 将容器中的html文件夹复制到宿主机

docker cp nginx<span class="token operator">:</span><span class="token operator">/</span>etc<span class="token operator">/</span>nginx<span class="token operator">/</span>nginx<span class="token punctuation">.</span>conf <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>conf<span class="token operator">/</span>nginx<span class="token punctuation">.</span>conf
docker cp nginx<span class="token operator">:</span><span class="token operator">/</span>etc<span class="token operator">/</span>nginx<span class="token operator">/</span>conf<span class="token punctuation">.</span>d <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>conf<span class="token operator">/</span>conf<span class="token punctuation">.</span>d
docker cp nginx<span class="token operator">:</span><span class="token operator">/</span>usr<span class="token operator">/</span>share<span class="token operator">/</span>nginx<span class="token operator">/</span>html <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>
#卸载
docker rm <span class="token operator">-</span>f nginx
#真实安装
docker run \\
<span class="token operator">-</span>p <span class="token number">80</span><span class="token operator">:</span><span class="token number">80</span> \\
<span class="token operator">--</span>name nginx \\
<span class="token operator">-</span>v <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>conf<span class="token operator">/</span>nginx<span class="token punctuation">.</span>conf<span class="token operator">:</span><span class="token operator">/</span>etc<span class="token operator">/</span>nginx<span class="token operator">/</span>nginx<span class="token punctuation">.</span>conf \\
<span class="token operator">-</span>v <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>conf<span class="token operator">/</span>conf<span class="token punctuation">.</span>d<span class="token operator">:</span><span class="token operator">/</span>etc<span class="token operator">/</span>nginx<span class="token operator">/</span>conf<span class="token punctuation">.</span>d \\
<span class="token operator">-</span>v <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>log<span class="token operator">:</span><span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>log<span class="token operator">/</span>nginx \\
<span class="token operator">-</span>v <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>html<span class="token operator">:</span><span class="token operator">/</span>usr<span class="token operator">/</span>share<span class="token operator">/</span>nginx<span class="token operator">/</span>html \\
<span class="token operator">-</span>d nginx<span class="token operator">:</span><span class="token number">1.18</span>
——————————————————————————————
docker run \\
<span class="token operator">-</span>p <span class="token number">100</span><span class="token operator">:</span><span class="token number">80</span> \\
<span class="token operator">--</span>name nginx \\
<span class="token operator">-</span>v <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>conf<span class="token operator">/</span>nginx<span class="token punctuation">.</span>conf<span class="token operator">:</span><span class="token operator">/</span>etc<span class="token operator">/</span>nginx<span class="token operator">/</span>nginx<span class="token punctuation">.</span>conf \\
<span class="token operator">-</span>v <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>conf<span class="token operator">/</span>conf<span class="token punctuation">.</span>d<span class="token operator">:</span><span class="token operator">/</span>etc<span class="token operator">/</span>nginx<span class="token operator">/</span>conf<span class="token punctuation">.</span>d \\
<span class="token operator">-</span>v <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>log<span class="token operator">:</span><span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>log<span class="token operator">/</span>nginx \\
<span class="token operator">-</span>v <span class="token operator">/</span>home<span class="token operator">/</span>nginx<span class="token operator">/</span>html<span class="token operator">:</span><span class="token operator">/</span>usr<span class="token operator">/</span>share<span class="token operator">/</span>nginx<span class="token operator">/</span>html \\
<span class="token operator">-</span>d nginx<span class="token operator">:</span><span class="token number">1.18</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-部署若依" tabindex="-1"><a class="header-anchor" href="#_3-部署若依" aria-hidden="true">#</a> 3. 部署若依</h2><h3 id="_3-1-下载若依源码" tabindex="-1"><a class="header-anchor" href="#_3-1-下载若依源码" aria-hidden="true">#</a> 3.1 下载若依源码</h3>`,10),k={href:"https://gitee.com/y_project/RuoYi",target:"_blank",rel:"noopener noreferrer"},b=n("br",null,null,-1),h=n("br",null,null,-1),g=n("strong",null,"ruoyi-ui文件夹是前端项目，其余为后端项目",-1),x=s(`<h3 id="_3-2-远程连接服务器" tabindex="-1"><a class="header-anchor" href="#_3-2-远程连接服务器" aria-hidden="true">#</a> 3.2 远程连接服务器</h3><p>这里我使用的是FinalShell，具体连接操作步骤 这里不做叙述</p><h3 id="_3-3-若依前端部署" tabindex="-1"><a class="header-anchor" href="#_3-3-若依前端部署" aria-hidden="true">#</a> 3.3 若依前端部署</h3><p>打开dos窗口，进入ruoyi-ui文件夹，并对前端代码进行打包,生成一个dist文件夹，这就是前端代码打包后的文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --unsafe-perm <span class="token parameter variable">--registry</span><span class="token operator">=</span>https://registry.npm.taobao.org
<span class="token function">npm</span> run build:prod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以进入ruoyi-ui -&gt; bin目录中 双击鼠标运行build.bat文件<br> 将dist文件夹通过FinalShell上传到/home/nginx/html中<br> 进入/home/nginx/conf/conf.d目录中，新建cisyam-ui.conf，添加以下内容<br><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112125771.png" alt="image.png" loading="lazy"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen       <span class="token number">80</span><span class="token punctuation">;</span>
    listen  <span class="token punctuation">[</span>::<span class="token punctuation">]</span>:80<span class="token punctuation">;</span>
    server_name  <span class="token number">110.42</span>.223.238<span class="token punctuation">;</span>

    <span class="token comment">#charset koi8-r;</span>
    <span class="token comment">#access_log  /var/log/nginx/host.access.log  main;</span>

    location / <span class="token punctuation">{</span>
        root    /usr/share/nginx/html/dist<span class="token punctuation">;</span> 
        index  index.html index.htm<span class="token punctuation">;</span>
				try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

  location /prod-api/<span class="token punctuation">{</span>
	    proxy_set_header Host <span class="token variable">$http_host</span><span class="token punctuation">;</span>
	    proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
	    proxy_set_header REMOTE-HOST <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
	    proxy_set_header X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span>
	    proxy_pass http://110.42.253.238:8686/<span class="token punctuation">;</span>
	 <span class="token punctuation">}</span>

    <span class="token comment">#error_page  404              /404.html;</span>

    <span class="token comment"># redirect server error pages to the static page /50x.html</span>
    <span class="token comment">#</span>
    error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span>
    location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span>
        root   /usr/share/nginx/html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span>
    <span class="token comment">#</span>
    <span class="token comment">#location ~ \\.php$ {</span>
    <span class="token comment">#    proxy_pass   http://127.0.0.1;</span>
    <span class="token comment">#}</span>

    <span class="token comment"># pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span>
    <span class="token comment">#</span>
    <span class="token comment">#location ~ \\.php$ {</span>
    <span class="token comment">#    root           html;</span>
    <span class="token comment">#    fastcgi_pass   127.0.0.1:9000;</span>
    <span class="token comment">#    fastcgi_index  index.php;</span>
    <span class="token comment">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span>
    <span class="token comment">#    include        fastcgi_params;</span>
    <span class="token comment">#}</span>

    <span class="token comment"># deny access to .htaccess files, if Apache&#39;s document root</span>
    <span class="token comment"># concurs with nginx&#39;s one</span>
    <span class="token comment">#</span>
    <span class="token comment">#location ~ /\\.ht {</span>
    <span class="token comment">#    deny  all;</span>
    <span class="token comment">#}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开谷歌浏览器，输入ip地址访问<br><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112125280.png" alt="image.png" loading="lazy"></p><h3 id="_3-4-若依后端部署" tabindex="-1"><a class="header-anchor" href="#_3-4-若依后端部署" aria-hidden="true">#</a> 3.4  若依后端部署</h3><ol><li><p>导入若依数据库</p></li><li><p>修改项目中ruoyi-admin中的application.yml，application-druid.yml两个文件<br> （1）在application.yml中，修改redis的信息，分别为host地址（你的服务器ip），port端口号（你的redis开放的端口号，一般为6379），password密码（你的redis的密码）。<br> （2） 在application-druid.yml中，修改mysql的信息，url的中间填写访问mysql的 ip:端口号，例如：114.115.164.15:3306；username填你的mysql用户名；password填你的mysql密码。</p></li><li><p>尝试运行后端项目可以通过InteliJ IDEA或者eclipse软件来运行这个java后端项目，前提是你运行的本机上应该也具备一定的环境，jdk至少是1.8，以及本地8080端口（用于后端）已开启且未被占用。其他的例如mysql，redis可以直接通过服务器ip+端口号远程访问，不需要在本机上配置。<br> 出现下方图片所示LOGO表示启动成功，可以开始打包后端代码。如果未成功，检查报错，查看是否关于mysql，redis的（如果是，则可能是这两个没有在你的服务器上配置好或者刚才修改的信息出错了，例如账号，密码不对，或者远程连接未成功，导致本机无法远程访问等等），如果是关于8080端口，可能是由于你本机有程序以及占用了8080端口，这个基本上就不是什么问题，部署到服务器后只要服务器8080端口可用就行。接下来可以直接打包代码。</p></li><li><p>打包后端代码jar包<br> 熟练java项目开发的，可以直接通过InteliJ IDEA或者eclipse软件打jar包。不熟悉的有第二种方法，是若依提供的。进入下载的项目文件夹中的bin目录下，直接双击执行package.bat，它会直接在项目中生成target文件夹，里面包含以及打包好的jar包。我们要使用的是ruoyi-admin文件夹下的target里的jar包。运行package.bat需要marven环境&gt;=3.0，操作顺序如下图：</p><p><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112124302.png" alt="" loading="lazy"><br><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112124258.png" alt="image.png" loading="lazy"></p></li><li><p>将打包好的jar包通过FinalShell上传至/opt/project 目录（project目录需要自己手动创建）</p></li><li><p>编写DockerFile 文件</p></li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>DockerFile文件和jar包放在同一目录下</strong></p><ol start="7"><li>将项目挂载到docker镜像中 后面有个点. 千万不要忘记复制</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> cisyam-admin.jar <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="8"><li>运行docker镜像</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8686</span>:8686 <span class="token parameter variable">--name</span> cisyam-admin.jar cisyam-admin.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="9"><li>成功部署效果图<br><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112124780.png" alt="image.png" loading="lazy"></li></ol>`,17);function _(y,f){const e=p("ExternalLinkIcon");return t(),l("div",null,[c,n("ol",null,[n("li",null,[a("如果使用的是虚拟机，首先需要"),n("a",d,[a("虚拟机联网"),o(e)]),a(" 安装yum工具")])]),v,n("p",null,[n("a",u,[a("Mysql8"),o(e)]),a(".0 默认采用 caching-sha2-password 加密，有可能旧的客户端不支持，可改为 mysql_native_password;")]),m,n("p",null,[a("若依前后端项目地址："),n("a",k,[a("https://gitee.com/y_project/RuoYi"),o(e)]),b,a(" 将项目下载或者git clone到本地并解压"),h,g]),x])}const w=r(i,[["render",_],["__file","docker-deployment-project.html.vue"]]);export{w as default};
