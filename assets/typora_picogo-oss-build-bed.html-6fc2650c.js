import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as g,o as r,c,a as i,b as a,d as e,e as n}from"./app-2feb0630.js";const s={},p=n('<h2 id="为什么要搭建博客图床" tabindex="-1"><a class="header-anchor" href="#为什么要搭建博客图床" aria-hidden="true">#</a> 为什么要搭建博客图床?</h2><p>以CSDN为例，我们可以选择使用大部分blog平台通用的Markdown语法进行博客创作，作为一个合格的程序狗，那么Markdown语法必然是首选。</p><p>虽然CSDN自带的编辑器已经能满足我们95%的写作需求，但是我们的图片不可能一直保存在本地吧，想要在网络中看到我们图片，那么图床就必不可少啦</p><p>在Typora在Markdown语法编辑上能给你提供更好的写作体验，那为什么一定要选择阿里云OSS，其实我最早是使用github跟gitee免费搭建的图床，但是俗话说，<code>便宜没好货</code>，github因服务器在国外，之前很长一段时间国内无法访问图片，于是便转战国内gitee，但是当时那次事故之后，gitee里面的全部图片都挂了，真的心疼，将近一万字图片就这么没了.......</p><p>所以我选择了以Typora+Picgo+图床的方式来进行博客创作,目前也是我的主力图床！</p><p>而在本地的Markdown文件.md中，图片是以“外链”这一形式存在的</p><p>Office word中，图片是直接插入docx文件里面<br> Markdown中，图片只是一个本地/联网的地址<br> 也就是说，如果我们使用本地Markdown编译器（如typora）来编辑MD文件的时候，如果MD里面插入的图片的源文件被移动或者删除了，我们的MD文档里面对应的图片也无法显示出来。</p><p>同时，如果我们用本地编辑器写好了一篇博客，想把它上传到CSDN上。CSDN是无法自动转存文件里面的图片的（因为这个图片只是一个你硬盘里面的文件路径）</p><p>如果你的图片在本地上传到CSDN上，就如下这个效果 ：</p><blockquote><p>[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img)(blog/image-20220318140612548.png)]</p></blockquote><p>这时候我们就需要用<strong>图床</strong>来解决这个问题</p><h2 id="什么是图床" tabindex="-1"><a class="header-anchor" href="#什么是图床" aria-hidden="true">#</a> 什么是图床？</h2>',12),d=i("code",null,"图床一般是指储存图片的服务器",-1),l={href:"https://baike.baidu.com/item/%E7%A9%BA%E9%97%B4%E8%B7%9D%E7%A6%BB/8965556?fromModule=lemma_inlink",target:"_blank",rel:"noopener noreferrer"},h={href:"https://baike.baidu.com/item/%E5%A4%9A%E7%BA%BF%E7%A9%BA%E9%97%B4/1339906?fromModule=lemma_inlink",target:"_blank",rel:"noopener noreferrer"},u=i("p",null,[i("strong",null,"简单来说：")],-1),m={href:"https://so.csdn.net/so/search?q=PicGO&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},f=i("code",null,"图床",-1),b=i("code",null,"链接",-1),y=n('<blockquote><p>这时候你的图片就是一个<strong>网络的链接(网址)</strong>，不再是本地路径。</p><p>你也可以在任何有网络的地方、用任何设备访问这张图片了</p></blockquote><p>即便是本地的那张图片<strong>移动或者删除</strong>，也不会影响图床里的这张图片</p><p>Markdown<strong>本地文件</strong>里面的图片也就不会失效了！</p><h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h2><h3 id="typora" tabindex="-1"><a class="header-anchor" href="#typora" aria-hidden="true">#</a> typora</h3>',5),_=i("code",null,"Typora",-1),z={href:"https://typora.com.cn/",target:"_blank",rel:"noopener noreferrer"},k=i("p",null,"必各位应该听很多博主安利过Typora这款软件，这里就不展开描述了。",-1),x=i("p",null,[a("新版本typora需要付费买断。可以考虑支持"),i("strong",null,"正版"),a("，也可以去找找"),i("strong",null,"旧版本安装包")],-1),B=i("h3",{id:"picogo",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#picogo","aria-hidden":"true"},"#"),a(" PicoGo")],-1),S=i("code",null,"PicGo",-1),G={href:"https://github.com/Molunerfinn/PicGo/releases",target:"_blank",rel:"noopener noreferrer"},M=n('<figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525170115723.png" alt="image-20230525170115723" tabindex="0" loading="lazy"><figcaption>image-20230525170115723</figcaption></figure><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525170044870.png" alt="image-20230525170044870" tabindex="0" loading="lazy"><figcaption>image-20230525170044870</figcaption></figure><h2 id="配置阿里云oss" tabindex="-1"><a class="header-anchor" href="#配置阿里云oss" aria-hidden="true">#</a> 配置阿里云OSS</h2><h3 id="注册-开通对象储存" tabindex="-1"><a class="header-anchor" href="#注册-开通对象储存" aria-hidden="true">#</a> 注册,开通对象储存</h3><p><code>百度搜索阿里云即可看到阿里云的官网</code></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525170321335.png" alt="image-20230525170321335" tabindex="0" loading="lazy"><figcaption>image-20230525170321335</figcaption></figure><p>注册账户并实名后，进入你的<code>控制台</code></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525170444135.png" alt="image-20230525170444135" tabindex="0" loading="lazy"><figcaption>image-20230525170444135</figcaption></figure><p>选择<code>对象储存</code>并开通</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525170511060.png" alt="image-20230525170511060" tabindex="0" loading="lazy"><figcaption>image-20230525170511060</figcaption></figure><h3 id="创建bucket" tabindex="-1"><a class="header-anchor" href="#创建bucket" aria-hidden="true">#</a> 创建bucket</h3><p>在左侧选择概览，然后在右侧创建一个新的bucket</p><p><strong>注意：</strong></p><ul><li>Bucket名字<strong>不能</strong>有大写字母</li><li>服务器就近选择</li><li>图床选择<code>标准存储</code></li><li>读写权限<code>公共读</code></li></ul><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525170613135.png" alt="image-20230525170613135" tabindex="0" loading="lazy"><figcaption>image-20230525170613135</figcaption></figure><p><code>创建完成后，你的bucket应该就出现在了左侧</code></p><h3 id="找到你的地域节点" tabindex="-1"><a class="header-anchor" href="#找到你的地域节点" aria-hidden="true">#</a> 找到你的地域节点</h3><p>点击你的<strong>bucket名</strong></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526102332195.png" alt="image-20230526102332195" tabindex="0" loading="lazy"><figcaption>image-20230526102332195</figcaption></figure><p>然后点击bucket下的<code>概览</code></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526102357117.png" alt="image-20230526102357117" tabindex="0" loading="lazy"><figcaption>image-20230526102357117</figcaption></figure><p>在<code>访问域名</code>一栏找到你的地域节点，后面会用到</p><p>如图，只需要复制<code>oss-cn-hangzhou</code>即可，不需要后面的<code>.aliyuncs.com</code></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526102448168.png" alt="image-20230526102448168" tabindex="0" loading="lazy"><figcaption>image-20230526102448168</figcaption></figure><h3 id="找到你的key" tabindex="-1"><a class="header-anchor" href="#找到你的key" aria-hidden="true">#</a> 找到你的Key</h3><p>来到右上角，鼠标放在你的头像上，在弹出的框里选择AccessKey管理</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526102633876.png" alt="image-20230526102633876" tabindex="0" loading="lazy"><figcaption>image-20230526102633876</figcaption></figure><h3 id="阿里云账户充值" tabindex="-1"><a class="header-anchor" href="#阿里云账户充值" aria-hidden="true">#</a> 阿里云账户充值</h3><h4 id="收费问题" tabindex="-1"><a class="header-anchor" href="#收费问题" aria-hidden="true">#</a> 收费问题</h4><p>阿里云OSS的各项收费是<strong>独立</strong>的！</p><p>对于<strong>图床</strong>而言，有两种收费形式</p><ul><li>以<strong>充值的方式</strong>使用<strong>储存容量</strong>以及<strong>流量</strong>(默认状态)</li><li>按年/月收费，购买一定存储包。<strong>流量额外收费</strong></li></ul><p>也就是说，即便你购买了下图的存储包，你依旧要为<strong>访问图床的流量</strong>付钱！</p><blockquote><p>图床使用的是<strong>标准型</strong>，请勿购买其他类型</p></blockquote><ul><li>储存容量：0.12元/GB/月</li><li>图片<strong>上传</strong>到阿里OSS流量：免费</li><li><strong>外网流出</strong>流量(如typora访问图床图片)：闲时0.25元/GB，<strong>忙</strong>时0.50元/GB</li></ul><p>仔细算算，我们图床的数据量其实很小的</p><blockquote><p>0.12元/1GB/1个月，一年就是1.44元，<strong>远低于40GB的9元收费！</strong></p><p>截图/照片以平均0.5mb/张估算，1gb可存放超过1600张图片！</p><p>数据低于6GB的情况下直接充值，以GB付费其实比<strong>购买储存包</strong>更加值得！</p></blockquote><h4 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h4><ul><li>记得给阿里云账户充值！！别到时候欠费停用了!!(笔者建议下载一个阿里云的APP，在手机上可以随时看到你的阿里云费用情况)</li><li>刚开始作图床的时候，直接充值使用即可，<strong>无需购买容量包</strong>！</li></ul><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526102944761.png" alt="image-20230526102944761" tabindex="0" loading="lazy"><figcaption>image-20230526102944761</figcaption></figure><p>到这里，我们阿里云OSS基本配置完毕了😎</p><h2 id="配置picgo" tabindex="-1"><a class="header-anchor" href="#配置picgo" aria-hidden="true">#</a> 配置PicGo</h2><p>打开picgo后，在你windows的<strong>状态栏</strong>里找到picgo的图标，打开picgo的主界面</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526103021975.png" alt="image-20230526103021975" tabindex="0" loading="lazy"><figcaption>image-20230526103021975</figcaption></figure><h3 id="图床设置" tabindex="-1"><a class="header-anchor" href="#图床设置" aria-hidden="true">#</a> 图床设置</h3><p>在图床设置里面选择<code>阿里云OSS</code>，依照以下步骤填写信息</p><ul><li><p><strong>设定Keyld</strong>：填写刚刚获得的<code>AccessKeyID</code></p></li><li><p><strong>设定KeySecret</strong>：填写<code>AccessKeyIDSecret</code></p></li><li><p><strong>设定储存空间名</strong>：填写<code>bucket</code>名称</p><p>这里填写的是bucket名称，不是浏览器里的域名</p></li><li><p><strong>确认存储区域</strong>：填写你的地域节点，注意复制的格式</p></li><li><p><strong>指定存储路径</strong>：其实就是自定义一个文件夹的名字，以/结尾</p></li></ul><p>它会<strong>自动</strong>在你的bucket里面创建一个文件夹，并把图片上传进去</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526103159534.png" alt="image-20230526103159534" tabindex="0" loading="lazy"><figcaption>image-20230526103159534</figcaption></figure><p><strong>弄完之后，记得“确定”，并点击“设置为默认图床”！</strong></p><h3 id="picgo设置" tabindex="-1"><a class="header-anchor" href="#picgo设置" aria-hidden="true">#</a> picgo设置</h3><p>在设置里打开<code>时间戳重命名</code>和<code>上传后自动复制URL</code></p><blockquote><p>时间戳重命名：以上传时间来重命名图片，避免同名的图片无法上传（该设置不影响本地图片名）</p></blockquote><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305261033339.png" alt="image-20230526103306274" tabindex="0" loading="lazy"><figcaption>image-20230526103306274</figcaption></figure><h3 id="配置typora" tabindex="-1"><a class="header-anchor" href="#配置typora" aria-hidden="true">#</a> 配置typora</h3><p>进入typora主界面，点击左上角的“文件-偏好设置”</p><ul><li>择<code>图像</code></li><li>插入图片时<code>上传图片</code></li><li>下面的选项全勾上【更新22.03.05: 第二个<code>网络位置的图片</code>可以不勾，避免已经上传到图床的图片重复上传】</li><li>上传服务选择<code>PicGo(app)</code></li><li>PicGo路径：找到picgo的安装路径<br><strong>不是安装包的路径！！！！</strong></li></ul><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305261035054.png" alt="image-20230526103515936" tabindex="0" loading="lazy"><figcaption>image-20230526103515936</figcaption></figure><h3 id="大功告成" tabindex="-1"><a class="header-anchor" href="#大功告成" aria-hidden="true">#</a> 大功告成！</h3><p>设置完毕后，我们点击<code>验证图片上传选项</code></p><p>如果弹出以下弹窗，我们的图床就搞定了！😀</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305261036932.png" alt="image-20230526103605884" tabindex="0" loading="lazy"><figcaption>image-20230526103605884</figcaption></figure><p>最后新建一个文件，验证图片是否正常上传</p><p>日常写作的时候，我们只需要<code>复制</code>图片，在typora里面<code>粘贴</code>即可，无需拖动！</p><p>当你的图片链接显示为<strong>阿里云的网络链接</strong>，而不是本地路径时</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305261036056.png" alt="image-20230526103638933" tabindex="0" loading="lazy"><figcaption>image-20230526103638933</figcaption></figure><p>我们的图床就大获全胜！</p><p>今天的文章就到这里了，欢迎大家评论区留言!!!</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>',69);function A(P,q){const o=g("ExternalLinkIcon");return r(),c("div",null,[p,i("p",null,[d,a("，有国内和国外之分。国外的图床由于有"),i("a",l,[a("空间距离"),e(o)]),a("等因素决定访问速度很慢影响图片显示速度。国内也分为单线空间、"),i("a",h,[a("多线空间"),e(o)]),a("和cdn加速三种。")]),u,i("p",null,[a("在我们往typora里插入图片的时候，"),i("a",m,[a("PicGO"),e(o)]),a("会自动上传图片到"),f,a("，并返回一个图片的"),b]),y,i("p",null,[_,a("："),i("a",z,[a("【中文官网】"),e(o)])]),k,x,B,i("p",null,[S,a("："),i("a",G,[a("【Github地址】"),e(o)])]),M])}const w=t(s,[["render",A],["__file","typora_picogo-oss-build-bed.html.vue"]]);export{w as default};
