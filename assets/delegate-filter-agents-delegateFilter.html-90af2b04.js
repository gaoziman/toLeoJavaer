const e=JSON.parse('{"key":"v-2468e922","path":"/framework/springsecurity/delegate-filter-agents-delegateFilter.html","title":"筛选器代理和过滤器链代理","lang":"zh-CN","frontmatter":{"title":"筛选器代理和过滤器链代理","icon":"circle-info","order":4,"category":["springsecurity"],"tag":["springsecurity"],"pageview":false,"date":"2023-11-15T23:40:03.000Z","comment":false,"breadcrumb":false,"description":"1.前言 大家好，我是Leo哥🫣🫣🫣，上一节我们简单回顾了一下关于Servlet原生过滤器以及简单认识了SpringSecurity中的一些过滤器。但是底层SpringSecurity是如何维护这些过滤器，并通过这些过滤器是如果拦截我们的客户端请求的，我们都还只是停留在表层，今天就让我们去深入了解一下我们今天得主角---委派筛选器代理 Deleg...","head":[["meta",{"property":"og:url","content":"https://manamn.space/toLeoJavaer/framework/springsecurity/delegate-filter-agents-delegateFilter.html"}],["meta",{"property":"og:site_name","content":"ToLeoJavaer"}],["meta",{"property":"og:title","content":"筛选器代理和过滤器链代理"}],["meta",{"property":"og:description","content":"1.前言 大家好，我是Leo哥🫣🫣🫣，上一节我们简单回顾了一下关于Servlet原生过滤器以及简单认识了SpringSecurity中的一些过滤器。但是底层SpringSecurity是如何维护这些过滤器，并通过这些过滤器是如果拦截我们的客户端请求的，我们都还只是停留在表层，今天就让我们去深入了解一下我们今天得主角---委派筛选器代理 Deleg..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-05T08:04:01.000Z"}],["meta",{"property":"article:author","content":"Leo"}],["meta",{"property":"article:tag","content":"springsecurity"}],["meta",{"property":"article:published_time","content":"2023-11-15T23:40:03.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-05T08:04:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"筛选器代理和过滤器链代理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-15T23:40:03.000Z\\",\\"dateModified\\":\\"2024-04-05T08:04:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Leo\\",\\"url\\":\\"https://manamn.space/\\"}]}"]]},"headers":[{"level":2,"title":"1.前言","slug":"_1-前言","link":"#_1-前言","children":[]},{"level":2,"title":"2.剖析DelegatingFilterProxy","slug":"_2-剖析delegatingfilterproxy","link":"#_2-剖析delegatingfilterproxy","children":[{"level":3,"title":"2.1DelegatingFilterProxy概述","slug":"_2-1delegatingfilterproxy概述","link":"#_2-1delegatingfilterproxy概述","children":[]},{"level":3,"title":"2.类的结构","slug":"_2-类的结构","link":"#_2-类的结构","children":[]},{"level":3,"title":"3.类的属性","slug":"_3-类的属性","link":"#_3-类的属性","children":[]}]},{"level":2,"title":"3.DelegatingFilterProxy原理","slug":"_3-delegatingfilterproxy原理","link":"#_3-delegatingfilterproxy原理","children":[{"level":3,"title":"3.1init","slug":"_3-1init","link":"#_3-1init","children":[]},{"level":3,"title":"3.2dofilter","slug":"_3-2dofilter","link":"#_3-2dofilter","children":[]},{"level":3,"title":"3.3destroy","slug":"_3-3destroy","link":"#_3-3destroy","children":[]}]},{"level":2,"title":"4.DelegatingFilterProxy作用","slug":"_4-delegatingfilterproxy作用","link":"#_4-delegatingfilterproxy作用","children":[]},{"level":2,"title":"5.FilterChainProxy","slug":"_5-filterchainproxy","link":"#_5-filterchainproxy","children":[{"level":3,"title":"5.1FilterChainProxy概述","slug":"_5-1filterchainproxy概述","link":"#_5-1filterchainproxy概述","children":[]},{"level":3,"title":"5.2FilterChainProxy的作用","slug":"_5-2filterchainproxy的作用","link":"#_5-2filterchainproxy的作用","children":[]}]},{"level":2,"title":"6.SecurityFilterChain概述","slug":"_6-securityfilterchain概述","link":"#_6-securityfilterchain概述","children":[]},{"level":2,"title":"6.参考文献","slug":"_6-参考文献","link":"#_6-参考文献","children":[]},{"level":2,"title":"7.总结","slug":"_7-总结","link":"#_7-总结","children":[]}],"git":{"createdTime":1712304241000,"updatedTime":1712304241000,"contributors":[{"name":"gaoziman","email":"2942894660@qq.com","commits":1}]},"readingTime":{"minutes":14.98,"words":4494},"filePathRelative":"framework/springsecurity/delegate-filter-agents-delegateFilter.md","localizedDate":"2023年11月16日","copyright":{"author":"LeoJavaer(toleojavaer.cn)","license":"MIT"},"autoDesc":true}');export{e as data};
