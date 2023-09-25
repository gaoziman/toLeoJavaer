import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import {searchPlugin} from "@vuepress/plugin-search";


export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "ToLeoJavaer",
  description: "Leo知识库",

  theme,
  head: [
      // [
      //     "link",
      //   {
      //     rel: "stylesheet",
      //     href: "//at.alicdn.com/t/c/font_4229417_w63o4uwc32.css",
      //   },
      // ],
    // meta

    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "Leo" }],
    [
      "meta",
      {
        "http-equiv": "Cache-Control",
        content: "no-cache, no-store, must-revalidate",
      },
    ],
    ["meta", { "http-equiv": "Pragma", content: "no-cache" }],
    ["meta", { "http-equiv": "Expires", content: "0" }],
    [
      "meta",
      {
        name: "keywords",
        content:
            "Basic, 多线程, JVM, 虚拟机, 数据库, database, Spring, Redis, MyBatis, 系统设计, 分布式, RPC, 高可用, 高并发",
      },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    // 添加百度统计
    [
      "script",
      {},
      `var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?7f3ff39fbb72aabacbcc5072e15b827e";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`,
    ],
    [
        "link",
        {
          rel: "stylesheet",
          href: "no-chttps://cdn.jsdelivr.net/npm/@docsearch/css@3ache"
        }
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/@docsearch/js@3"
      }
    ],
    [
      "script",
      {},
      `docsearch({
        appId: ZFRMOYLR37,
        apiKey: a1e9823097269d5beb0753f8567a5edf,
        indexName: toleojavaer,
        insights: true, // Optional, automatically send insights when user interacts with search results
        container: '#docsearch'
        debug: false // Set debug to true if you want to inspect the modal
        });`,
    ],
  ],
  plugins: [
    // 搜索插件
    searchPlugin({
      //多语言支持
      locales: {
        "/": {
          placeholder: "搜索本站",
        },
      },
      // 热键支持
      hotKeys: ["command", "k"],
      // 最大推荐个数
      maxSuggestions: 7,
      // 排除首页
      isSearchable: (page) => page.path !== "/",
      // 允许搜索 Frontmatter 中的 `tags`
      getExtraFields: (page) => page.frontmatter.tags ?? [],
    }),
  ],

  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  shouldPrefetch: false,
  // Enable it with pwa
  // shouldPrefetch: false,
});
