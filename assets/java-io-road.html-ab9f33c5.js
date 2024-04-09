const e=JSON.parse('{"key":"v-718cfeab","path":"/distributed/netty/java-io-road.html","title":"Netty实战专栏 IO演进之路","lang":"zh-CN","frontmatter":{"title":"Netty实战专栏 IO演进之路","icon":"circle-info","order":2,"tag":["Netty"],"category":["Netty"],"pageview":false,"date":"2023-11-05T22:49:30.000Z","comment":false,"description":"1.前言 大家好，我是Leo哥🫣🫣🫣，上一篇博客我们主要了解了Java网络编程的相关内容，通过对网络编程的一些了解，有助于我们学习接下来的知识点。在此之前，这一篇我想讲讲关于Java整个IO的演变历程，Java到底是怎样一步一步从基础IO操作到最后的AIO演变。好了，话不多说让我们开始吧😎😎😎。 2.早期的JavaIO 在Java早期版本中...","head":[["meta",{"property":"og:url","content":"https://manamn.space/toLeoJavaer/distributed/netty/java-io-road.html"}],["meta",{"property":"og:site_name","content":"ToLeoJavaer"}],["meta",{"property":"og:title","content":"Netty实战专栏 IO演进之路"}],["meta",{"property":"og:description","content":"1.前言 大家好，我是Leo哥🫣🫣🫣，上一篇博客我们主要了解了Java网络编程的相关内容，通过对网络编程的一些了解，有助于我们学习接下来的知识点。在此之前，这一篇我想讲讲关于Java整个IO的演变历程，Java到底是怎样一步一步从基础IO操作到最后的AIO演变。好了，话不多说让我们开始吧😎😎😎。 2.早期的JavaIO 在Java早期版本中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-13T06:28:42.000Z"}],["meta",{"property":"article:author","content":"Leo"}],["meta",{"property":"article:tag","content":"Netty"}],["meta",{"property":"article:published_time","content":"2023-11-05T22:49:30.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-13T06:28:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Netty实战专栏 IO演进之路\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-05T22:49:30.000Z\\",\\"dateModified\\":\\"2024-01-13T06:28:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Leo\\",\\"url\\":\\"https://manamn.space/\\"}]}"]]},"headers":[{"level":2,"title":"1.前言","slug":"_1-前言","link":"#_1-前言","children":[]},{"level":2,"title":"2.早期的JavaIO","slug":"_2-早期的javaio","link":"#_2-早期的javaio","children":[]},{"level":2,"title":"3.引入NIO","slug":"_3-引入nio","link":"#_3-引入nio","children":[]},{"level":2,"title":"4.引入NIO.2(Java7)","slug":"_4-引入nio-2-java7","link":"#_4-引入nio-2-java7","children":[]},{"level":2,"title":"5.引入流式API(Java8)","slug":"_5-引入流式api-java8","link":"#_5-引入流式api-java8","children":[]},{"level":2,"title":"6.I/O模型基本说明","slug":"_6-i-o模型基本说明","link":"#_6-i-o模型基本说明","children":[]},{"level":2,"title":"7.I/O模型","slug":"_7-i-o模型","link":"#_7-i-o模型","children":[{"level":3,"title":"7.1 Java BIO","slug":"_7-1-java-bio","link":"#_7-1-java-bio","children":[]},{"level":3,"title":"7.2 Java NIO","slug":"_7-2-java-nio","link":"#_7-2-java-nio","children":[]},{"level":3,"title":"7.3 Java AIO","slug":"_7-3-java-aio","link":"#_7-3-java-aio","children":[]}]},{"level":2,"title":"8.BIO、NIO、AIO适用场景分析","slug":"_8-bio、nio、aio适用场景分析","link":"#_8-bio、nio、aio适用场景分析","children":[]},{"level":2,"title":"9.总结","slug":"_9-总结","link":"#_9-总结","children":[]}],"git":{"createdTime":1699201053000,"updatedTime":1705127322000,"contributors":[{"name":"gaoziman","email":"2942894660@qq.com","commits":3},{"name":"“gaoziman”","email":"“2942894660@qq.com”","commits":2}]},"readingTime":{"minutes":5.57,"words":1672},"filePathRelative":"distributed/netty/java-io-road.md","localizedDate":"2023年11月6日","copyright":{"author":"LeoJavaer(toleojavaer.cn)","license":"MIT"},"autoDesc":true}');export{e as data};
