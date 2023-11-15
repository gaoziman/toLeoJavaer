// @ts-ignore
import { sidebar } from "vuepress-theme-hope";
import {aboutTheAuthor} from "./about-the-author";

export default sidebar({
  "/about-the-author/": aboutTheAuthor,
  "/": [
    {
      text: "必看",
      icon: "star",
      prefix: "star/",
      collapsible: true,
      children: "structure",

    },
    {
      text: "面试准备",
      icon: "book",
      prefix: "interview/",
      collapsible: true,
      children: [
          "interview-question-organization",
      ],
    },
    {
      text: "Leo知识块",
      icon: "book-reader",
      prefix: "knowledge-block/",
      collapsible: true,
      // children: "structure",
      children: [
        {
          text: "重要知识点",
          icon: "star",
          prefix: "star/",
          children: [
            "what-is-csrf",
            "what-is-jwt",
            "the-difference-between-string-stringBuffer-and-stringBuilder",
            "how-spring-solves-circular-dependencies",
            "principle-of-SpringBoot-automatic-configuration",
            "static-proxy-and-dynamic-proxy",
            "static-keyword-function-and-usage",
            "java-generics-mechanism",
            "jwt-token-cookie-session-distinction",
          ],
        },
      ],
    },
    {
      text: "Java",
      icon: "mug-hot",
      prefix: "Java/",
      collapsible: true,
      children: [
        {
          text: "基础",
          icon: "laptop-code",
          prefix: "Basic/",
          children: [
            "java-basic-env" ,
            "java-basic-grammer" ,
            "java-basic-array" ,
            "java-basic-init-object",
            "java-basic-io" ,
            "java-multithread-detail",
            "java-thread-pool",
            "java-network-code",
            "java-stream-program",
            {
              text: "重要知识点",
              icon: "star",
              collapsible: true,
              children: [
              ],
            },
          ],
        },
        {
          text: "集合",
          icon: "drumstick-bite",
          prefix: "Basic/",
          children: [
          ],
        },
        {
          text: "IO",
          icon: "download",
          prefix: "Basic/",
          children: [
          ],
        },
        {
          text: "JVM",
          icon: "satellite-dish",
          prefix: "Basic/",
          children: [
          ],
        },
        {
          text: "新特性",
          icon: "code-branch",
          prefix: "new/",
          children: [
            "java8-new-features",
          ],
        }
      ],
    },
    {
      text: "数据库",
      icon: "database",
      prefix: "database/",
      collapsible: true,
      children: [
        {
          text: "基础",
          icon: "fill",
          prefix: "Basic/",
          children: [
            "install-mysql8-green-version",
            "database-Principles-and-Applications",
          ],
        },
        {
          text: "高级",
          icon: "fill-drip",
          prefix: "Advanced/",
          children: [
            "reasons-for-slow-mysql-queries",
          ],
        },
        {
          text: "MySQL8合集",
          icon: "fish",
          collapsible: true,
          prefix: "Kang/",
          children: [
            {
              text: "基础篇",
              icon: "tag",
              collapsible: true,
              prefix: "basic-chapter/",
              children: [
                "database-overview",
                "mysql-environment-setup",
                "basic-select-statement",
                "operator",
                "sorting-and-paging",
                "multi-table-query",
                "one-line-function",
                "aggregate-function",
                "create-and-manage-tables",
                "subquery",
                "mysql-data-types-in-detail",
                "constraint",
                "view",
                "stored-procedures-and-functions",
                "variables-and-process-control",
                "trigger",
                "other-new-features-of-mysql8",
              ],
            },
            {
              text: "高级篇",
              icon: "tags",
              collapsible: true,
              prefix: "advanced-chapter/",
              children: [
                "install-and-use-mysql-in-linux",
                "mysql-data-directory",
                "user-and-permission-management",
                "logical-architecture",
                "storage-engine",
                "index-data-structure",
                "innoDB-data-storage-structure",
                "index-creation-and-design-principles",
                "use-of-performance-analysis-tools",
                "index-optimization-and-query-optimization",
                "database-design-specifications",
                "other-database-tuning-strategies",
                "transaction-basics",
                "mysql-transaction-log",
                "lock",
                "multi-version-concurrency-control",
                "other-database-logs",
                "master-slave-replication",
                "database-backup-and-recovery",
              ],
            },
          ],
        }
      ],
    },
    {
      text: "计算机基础",
      icon: "computer",
      prefix: "computer/",
      collapsible: true,
      children:[
        {
          text: "计算机组成原理",
          icon: "laptop",
          // icon: "tachometer-alt",
          prefix: "computer-composition-principle/",
          children: [
            "introduction-to-computer-systems-programmers-must-know-and-know",
          ],
        },

      ]
    },
    {
      text: "开发工具",
      icon: "wrench",
      prefix: "tools/",
      collapsible: true,
      children: [
        {
          text: "程序日常",
          icon: "laptop",
          prefix: "System/",
          children: [
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
          icon: "bug",
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
      prefix: "framework/",
      collapsible: true,
      children: [
        // {
        //   text: "SpringBoot",
        //   icon: "chart-bar",
        //   collapsible: true,
        //   prefix: "SpringBoot/",
        //   children: [
        //     "springboot-integration-thymeleaf",
        //   ],
        // },
        {
          text: "MyBatis",
          icon: "glasses",
          collapsible: true,
          prefix: "MyBatis/",
          children: [
            "myBatisplus-one-pass",
            {
              text: "源码",
              icon: "star",
              collapsible: true,
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
          collapsible: true,
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
          icon: "shield-alt",
          collapsible: true,
          prefix: "SpringSecurity/",
          children: [
            'springsecurity6-init',
            "helloworld-simple-code",
            "springsecurity6-filter",
            "delegate-filter-agents-delegateFilter",
            "core-filters",
          ],
        },
        {
          text: "整合",
          icon: "cloud",
          collapsible: true,
          prefix: "Integrate/",
          children: [
            "ssm-integration-complete-process",
          ],
        },

      ],
    },
    {
      text: "中间件",
      icon: "rocket",
      prefix: "middleware/",
      collapsible: true,
      // children: "structure",
      children: [
        {
          text: "Redis",
          icon: "glass-whiskey",
          prefix: "Redis/",
          children: [
            {
              text: "基础",
              icon: "location-arrow",
              collapsible: true,
              prefix: "basic-chapter/",
              children: [
                "redis7-getting-started-overview",
                "redis7-installation-configuration",
                "redis7-top-ten-data-types",
                "redis7-persistence",
                "redis7-transaction",
              ],
            },
            {
              text: "重要知识点",
              icon: "star",
              collapsible: true,
              prefix: "basic-chapter/",
              children: [
                "redis7-getting-started-overview",
              ],
            },
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
      prefix: "service/",
      collapsible: true,
      children: [
        {
          text: "基础",
          icon: "location-arrow",
          collapsible: true,
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
    {
      text: "分布式",
      icon: "sitemap",
      prefix: "distributed/",
      collapsible: true,
      children: [
        {
          text: "Netty应用专栏",
          icon: "location-arrow",
          // collapsible: true,
          prefix: "netty/",
          children: [
            "java-net-code",
            "java-io-road",
            "bio-in-detail",
          ],
        },
      ],
    },
    {
      text: "项目",
      icon: "laptop-code",
      prefix: "project/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "前端技术",
      icon: "palette",
      collapsible: true,
      prefix: "front/",
      children: "structure",
    },
    // "slides",
  ],
});
