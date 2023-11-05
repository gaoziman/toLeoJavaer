// @ts-ignore
import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // {
  //   text: "面试准备",
  //   icon: "book",
  //   link: "#",
  // },
  {
    text: "Java",
    icon: "coffee",
    prefix: "/Java/",
    children: [
      {
        text: "基础",
        icon: "database",
        prefix: "Basic/",
        children: [
          "java-basic-env" ,
          "java-basic-grammer" ,
          "java-basic-array" ,
          "java-basic-init-object",
          "java-basic-io" ,
          "java-multithread-detail",
          "java-network-code",
          "java-stream-program",
          "java8-new-features",
        ],
      },
    ],
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
    prefix: "/computer/",
    children: [
      {
        text: "计算机组成原理",
        icon: "tachometer-alt",
        prefix: "computer-composition-principle/",
        children: [
          "introduction-to-computer-systems-programmers-must-know-and-know" ,
        ],
      },
    ],
  },
  {
    text: "开发工具",
    icon: "wrench",
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
          "markdown-grammer",
        ],
      },
      {
        text: "项目部署",
        icon: "plug",
        prefix: "deploy/",
        children: [
          "let-me-introduce-you-to-cloud-servers-from",
          "docker-deployment-project",
          "native-deployment-project",
          "tencent-cloud-server-deployment-hexo-blog",
          "docker-deploy-springboot-project"
        ],
      },
      {
        text: "报错以及Bug",
        icon: "exclamation-triangle",
        prefix: "Bugs/",
        children: [
          "java-connection-sqlServer-error",
          "redis-reported-an-error-in-Docker-for-online-issues",
          "record-idea-illegal-character-ufeff-and-report-an-error-once",
          "record-Docker-and-redis-conflict-once",
          "Springboot3-integration-Mybatis-plus3.5.3-errors"
        ],
      },
    ],
  },
  {
    text: "常用框架",
    icon: "layer-group",
    prefix: "/framework/",
    children: [
      // {
      //   text: "SpringBoot",
      //   icon: "chart-bar",
      //   prefix: "SpringBoot/",
      //   children: [
      //     "springboot-integration-thymeleaf",
      //   ],
      // },
      {
        text: "MyBatis",
        icon: "glasses",
        prefix: "MyBatis/",
        children: [
          "myBatisplus-one-pass",
          {
            text: "MyBatis源码",
            icon: "tag",
            prefix: "mybatis-source/",
            children: [
              "mybatis-source-start",
              "mybatis-source-operation-object",
            ],
          },
        ],
      },
      {
        text: "Spring",
        icon: "leaf",
        prefix: "Spring/",
        children: [
          "spring5-ioc",
          "spring5-aop",
          "Spring5-factory-senior",
          "spring5-transaction-processing",
          "spring5-integration-mybatis",
          "spring5-annotation-code01",
          "spring5-annotation-code02",
          "spring5-jdk-proxy",
          "spring5-cglib-proxy",
        ],
      },
      {
        text: "SpringSecurity",
        icon: "star",
        prefix: "SpringSecurity/",
        children: [
          'springsecurity6-init',
          "helloworld-simple-code",
          "springsecurity6-filter",
        ],
      },
      "ssm-integration-complete-process",
    ],
  },
  {
    text: "中间件",
    icon: "rocket",
    prefix: "/middleware/",
    children: [
      {
        text: "Redis",
        icon: "glass-whiskey",
        prefix: "Redis/basic-chapter/",
        children: [
          "redis7-getting-started-overview",
          "redis7-installation-configuration",
          "redis7-top-ten-data-types",
          "redis7-persistence",
        ],
      },
      {
        text: "Linux",
        icon: "globe",
        prefix: "Linux/",
        children: [
          "linux-note",
          "vmvare-install-centos7"
        ],
      },
    ],
  },
  {
    text: "微服务",
    icon: "leaf",
    prefix: "/service/",
    children: [
      {
        text: "重要知识点",
        icon: "star",
        prefix: "star/",
        children: [
          "understanding-springcloud-microservices",
          "understanding-core-components-springcloud",
          "ribbon-and-Nacos-Service-registry",
          "remote-call-to-openFeign-integration",
          "micro-service-integration-gateway",
        ],
      },
    ],
  },
  // {
  //   text: "分布式",
  //   icon: "sitemap",
  //   link: "#",
  // },
  {
    text: "网站相关",
    icon: "user-alt",
    children: [
      {
        text: "关于作者",
        icon: "user-alt",
        link: "/about-the-author/"
      },
      // {
      //   text: "更新历史",
      //   icon: "history",
      //   link: "/timeline/",
      // },
    ],
  },
]);
