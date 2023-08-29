import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "案例",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "文档",
      icon: "book",
      prefix: "guide/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "Java",
      icon: "book",
      prefix: "Java/",
      collapsible: true,
      children: "structure",
    },
    // "slides",
  ],
});
