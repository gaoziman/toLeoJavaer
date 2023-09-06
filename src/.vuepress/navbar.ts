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
        text: "基础",
        icon: "database",
        prefix: "Basic/",
        children: [
          "install-mysql8-green-version",
          "database-Principles-and-Applications",
        ],
      },
      {
        text: "高级",
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
    prefix: "/tools/",
    children: [
      {
        text: "程序日常",
        icon: "laptop",
        prefix: "System/",
        children: [
          "Git-Tutorial01",
          "Git-Tutorial02",
          "Git-Tutorial03",
          "detailed-maven-installation-and-configuration",
          "complete-pressure-testing-on-jmeter",
          "IDEA-daily-configuration",
          "IDEA-configurate-git-push",
          "introduce-the-hutool-toolkit",
          "system-reload-diary",
          "Typora+PicGo+Alibaba-Cloud-OSS-Build-Bed",
          "resolve-Win11-right-click-menu-issues",
        ],
      },
      {
        text: "项目部署",
        icon: "plug",
        prefix: "deploy/",
        children: [
          "native-deployment-project",
          "docker-deployment-project",
          "tencent-cloud-server-deployment-hexo-blog",
        ],
      },
      {
        text: "报错以及Bug",
        icon: "exclamation-triangle",
        prefix: "Bugs/",
        children: [
          "java-connection-sqlServer-error",
          "redis-reported-an-error-in-Docker-for-online-issues",
        ],
      },
    ],
  },
  {
    text: "常用框架",
    icon: "paper-plane",
    prefix: "/framework/",
    children: [
      {
        text: "Spring",
        icon: "leaf",
        prefix: "Spring/",
        children: [
          "spring5-ioc",
          "spring5-aop",
          "Spring5-factory-senior ",
          "Spring5-transaction-processing",
        ],
      },
    ],
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
