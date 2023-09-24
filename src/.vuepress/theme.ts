import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://toleojavaer.netlify.app",

  author: {
    name: "Leo",
    url: "https://toleojavaer.netlify.app/",
  },

  iconAssets: "fontawesome-with-brands",

  logo: "/logo.png",

  repo: "gaoziman/toLeoJavaer",

  repoLabel: "GitHub",
  docsBranch: "master",

  docsDir: "src",


  breadcrumb: false,

  // themeColor: "#46bd87",


  // navbar
  navbar,

  // sidebar
  sidebar,

  footer: '<a href="http://beian.miit.gov.cn/" target="_blank">粤ICP备2022005190号-2</a>',

  // pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  pageInfo: [
    "Author",
    "Category",
    "Tag",
    "Date",
    "Original",
    "Word",
    "ReadingTime",
  ],
  displayFooter: true,

  encrypt: {
    config: {
      "/database/Kang/": ["123456"],
    },
  },

  // hotReload: true,
  lastUpdated: true,
  contributors: true,
  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",

  },





  plugins: {
    home:true,
    // You should generate and use your own comment service
    // comment: {
      // provider: "Twikoo",
      // envId: "https://twikoo.manamn.space",
      // repo: "vuepress-theme-hope/giscus-discussions",
      // repoId: "R_kgDOG_Pt2A",
      // category: "Announcements",
      // categoryId: "DIC_kwDOG_Pt2M4COD69",
    // },
    // copyright: true,
    copyright: {
      author: "LeoJavaer(toleojavaer.cn)",
      license: "MIT",
      triggerLength: 100,
      maxLength:100,
      canonical: "https://toleojavaer.netlify.app/",
      global:true
    },

    // All features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: ["highlight", "math", "search", "notes", "zoom"],
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    // uncomment these if you want a pwa
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
