import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "面试准备",
    icon: "book",
    link: "#",
  },
  {
    text: "Java",
    icon: "coffee",
    link: "#",
  },
  {
    text: "数据库",
    icon: "database",
    prefix: "/database/",
    children: [
      {
        text: "Basic",
        icon: "database",
        prefix: "Basic/",
        children: [
            "install-mysql8-green-version",
            "database-Principles-and-Applications",
        ],
      },
      {
        text: "Advanced",
        icon: "database",
        prefix: "Advanced/",
        children: [
          "reasons-for-slow-mysql-queries",
        ],
      },
    ],
  },
  {
    text: "计算机基础",
    icon: "computer",
    link: "#",
  },
  {
    text: "开发工具",
    icon: "tools",
    link: "#",
  },

  {
    text: "常用框架",
    icon: "paper-plane",
    link: "#",
  },
  {
    text: "微服务",
    icon: "leaf",
    link: "#",
  },
  {
    text: "分布式",
    icon: "sitemap",
    link: "#",
  },
  {
    text: "关于我",
    icon: "user-alt",
    link: "#",
  },
]);
