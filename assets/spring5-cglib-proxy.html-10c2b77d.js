const e=JSON.parse('{"key":"v-2d28e314","path":"/framework/spring/spring5-cglib-proxy.html","title":"SpringCGlib动态代理","lang":"zh-CN","frontmatter":{"title":"SpringCGlib动态代理","icon":"circle-info","order":9,"category":["spring🍃"],"tag":["spring🍃"],"pageview":false,"date":"2023-11-05T23:47:15.000Z","comment":false,"breadcrumb":false,"description":"1.前言 前面文章我们学习了关于Spring的IOC与AOP相关知识点，在此之前，我们主要学习Spring的一些核心概念，IOC和AOP等等。我们之前学习了简单了解了AOP如何借助动态字节码技术来构建动态代理类。实现动态代理的方式不止一种。本次系列文章主要介绍两种：JDK动态代理和CGlib动态代理，主要主要介绍CGlib动态代理。好了，话不多说，让我...","head":[["meta",{"property":"og:url","content":"https://manamn.space/toLeoJavaer/framework/spring/spring5-cglib-proxy.html"}],["meta",{"property":"og:site_name","content":"ToLeoJavaer"}],["meta",{"property":"og:title","content":"SpringCGlib动态代理"}],["meta",{"property":"og:description","content":"1.前言 前面文章我们学习了关于Spring的IOC与AOP相关知识点，在此之前，我们主要学习Spring的一些核心概念，IOC和AOP等等。我们之前学习了简单了解了AOP如何借助动态字节码技术来构建动态代理类。实现动态代理的方式不止一种。本次系列文章主要介绍两种：JDK动态代理和CGlib动态代理，主要主要介绍CGlib动态代理。好了，话不多说，让我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-05T08:04:01.000Z"}],["meta",{"property":"article:author","content":"Leo"}],["meta",{"property":"article:tag","content":"spring🍃"}],["meta",{"property":"article:published_time","content":"2023-11-05T23:47:15.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-05T08:04:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SpringCGlib动态代理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-05T23:47:15.000Z\\",\\"dateModified\\":\\"2024-04-05T08:04:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Leo\\",\\"url\\":\\"https://manamn.space/\\"}]}"]]},"headers":[{"level":2,"title":"1.前言","slug":"_1-前言","link":"#_1-前言","children":[]},{"level":2,"title":"2.JDK动态代理有什么缺陷","slug":"_2-jdk动态代理有什么缺陷","link":"#_2-jdk动态代理有什么缺陷","children":[]},{"level":2,"title":"3.什么是CGlib动态代理","slug":"_3-什么是cglib动态代理","link":"#_3-什么是cglib动态代理","children":[]},{"level":2,"title":"4.Spring5整合CGlib动态代理开发步骤","slug":"_4-spring5整合cglib动态代理开发步骤","link":"#_4-spring5整合cglib动态代理开发步骤","children":[{"level":3,"title":"4.1 创建目标对象","slug":"_4-1-创建目标对象","link":"#_4-1-创建目标对象","children":[]},{"level":3,"title":"4.2 创建切面类","slug":"_4-2-创建切面类","link":"#_4-2-创建切面类","children":[]},{"level":3,"title":"4.3 配置Spring AOP","slug":"_4-3-配置spring-aop","link":"#_4-3-配置spring-aop","children":[]},{"level":3,"title":"4.4 测试","slug":"_4-4-测试","link":"#_4-4-测试","children":[]}]},{"level":2,"title":"5.最后总结","slug":"_5-最后总结","link":"#_5-最后总结","children":[]},{"level":2,"title":"6.参考文献","slug":"_6-参考文献","link":"#_6-参考文献","children":[]},{"level":2,"title":"7.总结","slug":"_7-总结","link":"#_7-总结","children":[]}],"git":{"createdTime":1712304241000,"updatedTime":1712304241000,"contributors":[{"name":"gaoziman","email":"2942894660@qq.com","commits":1}]},"readingTime":{"minutes":7.79,"words":2336},"filePathRelative":"framework/spring/spring5-cglib-proxy.md","localizedDate":"2023年11月6日","copyright":{"author":"LeoJavaer(toleojavaer.cn)","license":"MIT"},"autoDesc":true}');export{e as data};
