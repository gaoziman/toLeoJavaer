const e=JSON.parse('{"key":"v-61015f17","path":"/Java/basic/java-network-code.html","title":"Java基础篇 网络编程解析","lang":"zh-CN","frontmatter":{"title":"Java基础篇 网络编程解析","icon":"circle-info","order":7,"category":["Java"],"tag":["Java"],"pageview":false,"date":"2023-11-05T23:10:30.000Z","comment":false,"breadcrumb":false,"description":"1.前言 大家好，我是Leo哥🫣🫣🫣，本次专栏学习Java并发以及netty应用的深度学习，netty提供了异步、事件驱动、非阻塞的网络编程模型，能够轻松处理高并发、高吞吐量的网络通信场景。是一个基于Java NIO(Non-blocking I/O) 的高性能网络应用框架。但是在此之前我们需要对我们Java前置知识进行一些巩固和复习。那就是IO...","head":[["meta",{"property":"og:url","content":"https://manamn.space/toLeoJavaer/Java/basic/java-network-code.html"}],["meta",{"property":"og:site_name","content":"ToLeoJavaer"}],["meta",{"property":"og:title","content":"Java基础篇 网络编程解析"}],["meta",{"property":"og:description","content":"1.前言 大家好，我是Leo哥🫣🫣🫣，本次专栏学习Java并发以及netty应用的深度学习，netty提供了异步、事件驱动、非阻塞的网络编程模型，能够轻松处理高并发、高吞吐量的网络通信场景。是一个基于Java NIO(Non-blocking I/O) 的高性能网络应用框架。但是在此之前我们需要对我们Java前置知识进行一些巩固和复习。那就是IO..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-05T08:04:01.000Z"}],["meta",{"property":"article:author","content":"Leo"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2023-11-05T23:10:30.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-05T08:04:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java基础篇 网络编程解析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-05T23:10:30.000Z\\",\\"dateModified\\":\\"2024-04-05T08:04:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Leo\\",\\"url\\":\\"https://manamn.space/\\"}]}"]]},"headers":[{"level":2,"title":"1.前言","slug":"_1-前言","link":"#_1-前言","children":[]},{"level":2,"title":"2.网络基础知识","slug":"_2-网络基础知识","link":"#_2-网络基础知识","children":[{"level":3,"title":"2.1TCP/IP协议","slug":"_2-1tcp-ip协议","link":"#_2-1tcp-ip协议","children":[]},{"level":3,"title":"2.2端口和套接字","slug":"_2-2端口和套接字","link":"#_2-2端口和套接字","children":[]},{"level":3,"title":"2.3IP地址和域名系统(DNS)","slug":"_2-3ip地址和域名系统-dns","link":"#_2-3ip地址和域名系统-dns","children":[]},{"level":3,"title":"2.4TCP/UDP协议","slug":"_2-4tcp-udp协议","link":"#_2-4tcp-udp协议","children":[]}]},{"level":2,"title":"3.Java中的网络编程","slug":"_3-java中的网络编程","link":"#_3-java中的网络编程","children":[{"level":3,"title":"3.1InetAddress类","slug":"_3-1inetaddress类","link":"#_3-1inetaddress类","children":[]},{"level":3,"title":"3.2Socket类","slug":"_3-2socket类","link":"#_3-2socket类","children":[]}]},{"level":2,"title":"4.TCP通信编程","slug":"_4-tcp通信编程","link":"#_4-tcp通信编程","children":[{"level":3,"title":"4.1创建简单客户端服务端连接","slug":"_4-1创建简单客户端服务端连接","link":"#_4-1创建简单客户端服务端连接","children":[]},{"level":3,"title":"4.2创建复杂客户端服务端连接","slug":"_4-2创建复杂客户端服务端连接","link":"#_4-2创建复杂客户端服务端连接","children":[]},{"level":3,"title":"4.3TCP细节","slug":"_4-3tcp细节","link":"#_4-3tcp细节","children":[]}]},{"level":2,"title":"5.UDP通信程序","slug":"_5-udp通信程序","link":"#_5-udp通信程序","children":[{"level":3,"title":"5.1UDP发送数据","slug":"_5-1udp发送数据","link":"#_5-1udp发送数据","children":[]},{"level":3,"title":"5.2UDP接收数据","slug":"_5-2udp接收数据","link":"#_5-2udp接收数据","children":[]},{"level":3,"title":"5.3UDP通信程序练习","slug":"_5-3udp通信程序练习","link":"#_5-3udp通信程序练习","children":[]},{"level":3,"title":"5.4UDP三种通讯方式","slug":"_5-4udp三种通讯方式","link":"#_5-4udp三种通讯方式","children":[]},{"level":3,"title":"5.5UDP组播实现","slug":"_5-5udp组播实现","link":"#_5-5udp组播实现","children":[]},{"level":3,"title":"5.6UDP广播实现","slug":"_5-6udp广播实现","link":"#_5-6udp广播实现","children":[]}]},{"level":2,"title":"6.综合代码练习","slug":"_6-综合代码练习","link":"#_6-综合代码练习","children":[{"level":3,"title":"练习一：多发多收","slug":"练习一-多发多收","link":"#练习一-多发多收","children":[]},{"level":3,"title":"练习二：接收并反馈","slug":"练习二-接收并反馈","link":"#练习二-接收并反馈","children":[]},{"level":3,"title":"练习三：上传练习（TCP协议）","slug":"练习三-上传练习-tcp协议","link":"#练习三-上传练习-tcp协议","children":[]},{"level":3,"title":"练习四：文件名重复","slug":"练习四-文件名重复","link":"#练习四-文件名重复","children":[]},{"level":3,"title":"练习五：服务器改写为多线程","slug":"练习五-服务器改写为多线程","link":"#练习五-服务器改写为多线程","children":[]},{"level":3,"title":"练习六：线程池改进","slug":"练习六-线程池改进","link":"#练习六-线程池改进","children":[]}]},{"level":2,"title":"7.参考文献","slug":"_7-参考文献","link":"#_7-参考文献","children":[]},{"level":2,"title":"8.总结","slug":"_8-总结","link":"#_8-总结","children":[]}],"git":{"createdTime":1712304241000,"updatedTime":1712304241000,"contributors":[{"name":"gaoziman","email":"2942894660@qq.com","commits":1}]},"readingTime":{"minutes":61.9,"words":18570},"filePathRelative":"Java/basic/java-network-code.md","localizedDate":"2023年11月6日","copyright":{"author":"LeoJavaer(toleojavaer.cn)","license":"MIT"},"autoDesc":true}');export{e as data};