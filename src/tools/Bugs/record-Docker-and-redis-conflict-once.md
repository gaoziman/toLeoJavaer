---
title: 记录一次Docker与Redis冲突
icon: circle-info
order: 4
category:
    - 报错及Bug
tag:
    - 报错及Bug
pageview: false
date: 2023-09-06
comment: false
breadcrumb: false
---




> 大家好，我是Leo，之前整了了一个华为云2c4G的新人优惠云服务器，一直没派上用场，这不最近当前重新学一下Redis相关的知识，就是就准备再服务器上面安装Redis使用，也懒得我在搞虚拟机。



## 1. 问题发现

我索性也没有想太多,Docker默认安装的。

![image-20230911153750067](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309111537144.png)

Redis这部分内容也是基于最新的Redis7版本进行学习，还侧重学习了一下Redis的新特性。

于是在Docker中安装了Redis7.0.2版本。

![image-20230911153934505](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309111539572.png)

**这边一切就绪，于是准备使用进入docker的方式来启动Redis**

```bash
docker exec -it redis bash
```

啪一声快乐没了

![WeyoL](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309111544278.gif)

![image-20230911154029780](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309111540827.png)



## 2. 探询问题

既然有问题，咱们就一点一点找呗。

![G5yKM](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309111549075.gif)

我第一时间想到了去通过`docker日志`去查看具体的问题是啥，这种情况日志就是我们最好的朋友。

```bash
docker logs --tail 50 --follow --timestamps redis
```

你还别说，你还真别说，大家继续往下看

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309111552335.png)

图中我用红色框框圈住的便是问题的所在，于是我便开始进行了面向谷歌编程，开始搜索问题的本源。

![WEke3](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309111554830.jpg)

最后在Redis官方github仓库中给出这一点解析，Docker版本<=20与Redis最新版在一起会发生冲突，官方建议使用低版本Redis, 再Github issures上有关这个问题的一些描述，有兴趣的朋友可以看看，[链接直达](https://github.com/redis/redis/issues/12362)

![image-20230911155841185](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309111558466.png)



![jxJ5W](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309111601446.gif)





## 3. 解决问题

好的，我们继续，于是我就删除了Redis7的镜像，因为Docker还有其他服务，所以我就只能先对Redis下手了，把Redis版本降为5。

当然这里其他朋友可以直接升级Docker版本，只要Docker版本大于20就不会有这个问题哈。

![image-20230911161339264](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309111613322.png)

![Qw5GJ](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202309111616257.jpg)

完美收工。

**到这里问题就解决了，这里想告诉大家，遇到之前没有碰到过的新问题，不要慌，先追溯本源，看看到底是哪里出错了，思路一定要清晰，实在没有头绪的话可以百度，利用好搜索引擎，你一定可以的!!!**







![公众号封面](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png)