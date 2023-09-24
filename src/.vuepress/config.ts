import { defineUserConfig } from "vuepress";
// @ts-ignore
import docsearch from '@docsearch/js';
import theme from "./theme.js";
import {searchPlugin} from "@vuepress/plugin-search";


// @ts-ignore
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
    // docsearchPlugin({
    //   appId: "LDBQGQC8Q9",
    //   apiKey: "5c3a7145aeba231c3b85b742d24fc24f",
    //   indexName: "mrhope",
    //   locales: {
    //     "/": {
    //       placeholder: "搜索",
    //       translations: {
    //         button: {
    //           buttonText: "搜索",
    //           buttonAriaLabel: "搜索",
    //         },
    //         modal: {
    //           searchBox: {
    //             resetButtonTitle: "清除查询条件",
    //             resetButtonAriaLabel: "清除查询条件",
    //             cancelButtonText: "取消",
    //             cancelButtonAriaLabel: "取消",
    //           },
    //           startScreen: {
    //             recentSearchesTitle: "搜索历史",
    //             noRecentSearchesText: "没有搜索历史",
    //             saveRecentSearchButtonTitle: "保存至搜索历史",
    //             removeRecentSearchButtonTitle: "从搜索历史中移除",
    //             favoriteSearchesTitle: "收藏",
    //             removeFavoriteSearchButtonTitle: "从收藏中移除",
    //           },
    //           errorScreen: {
    //             titleText: "无法获取结果",
    //             helpText: "你可能需要检查你的网络连接",
    //           },
    //           footer: {
    //             selectText: "选择",
    //             navigateText: "切换",
    //             closeText: "关闭",
    //             searchByText: "搜索提供者",
    //           },
    //           noResultsScreen: {
    //             noResultsText: "无法找到相关结果",
    //             suggestedQueryText: "你可以尝试查询",
    //             reportMissingResultsText: "你认为该查询应该有结果？",
    //             reportMissingResultsLinkText: "点击反馈",
    //           },
    //         },
    //       },
    //     },
    //   },
    // }),
  ],

  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  shouldPrefetch: false,
  // Enable it with pwa
  // shouldPrefetch: false,
});
