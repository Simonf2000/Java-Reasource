module.exports = {                      //./deploy.sh  
    title: 'Java学习资料',       //所有图片都得传上去，不然会报错.有些空格得去掉，字体变灰也加载不出来，类似\<clinit\>要加转义字符
    description: "JavaSE,MySQL,Spring,MyBatis",
    dest: 'E:/Java/Java-Learning-Resource/VuePress-markdown-master/docs/.vuepress/dist',
    port: 8884,
    base: '/Java-Resource/',
    markdown: {
      // ......
      extendMarkdown: md => {
        md.use(require("markdown-it-disable-url-encode"));
      }
    },  
    themeConfig: {
      nav: [
        { text: '首页', link: '/' },
        { 
            text: 'simonf 博客', 
            items: [
                { text: 'blog', link: 'https://simonf.cn/' }
            ]
        }
    ],
    sidebar: [
      {
          title: 'JavaSE',
          path: '/JavaSE/安装笔记',
          collapsable: false, // 不折叠
          children: [
            //图片地址换成能显示的
              { title: "安装笔记", path: "/JavaSE/安装笔记.md" },
              { title: "JDK的下载、安装与配置", path: "/JavaSE/JDK的下载、安装与配置.md" },
              { title: "Java程序编译运行常见问题", path: "/JavaSE/Java程序编译运行常见问题.md" },
              { title: "Java概述", path: "/JavaSE/尚硅谷_李金辉_JavaSE_第1章 Java概述.md" },
              { title: "Java基础语法", path: "/JavaSE/尚硅谷_李金辉_JavaSE_第2章 Java基础语法.md" },
              { title: "流程控制", path: "/JavaSE/流程控制.md" },
              { title: "数组", path: "/JavaSE/尚硅谷_李金辉_第四章 数组.md" },
              { title: "方法", path: "/JavaSE/尚硅谷_李金辉_第五章 方法.md" },
              { title: "面向对象基础（上）", path: "/JavaSE/尚硅谷_李金辉_JavaSE_第6章 面向对象基础（上）.md" },
              { title: "面向对象基础（中）", path: "/JavaSE/尚硅谷_李金辉_JavaSE_第7章 面向对象基础（中）.md" },
              { title: "面向对象基础（下）", path: "/JavaSE/尚硅谷_李金辉_JavaSE_第8章 面向对象基础（下）.md" },
              { title: "异常", path: "/JavaSE/尚硅谷_李金辉_JavaSE_第8章 异常.md" },
              { title: "集合", path: "/JavaSE/尚硅谷_李金辉_JavaSE_第11章 集合.md" },
              { title: "泛型", path: "/JavaSE/尚硅谷_李金辉_JavaSE_第12章 泛型.md" },
              { title: "File类与IO流", path: "/JavaSE/尚硅谷_李金辉_JavaSE_第13章 File类与IO流.md" },
              { title: "多线程", path: "/JavaSE/尚硅谷_李金辉_JavaSE_第14章 多线程.md" },
              { title: "网络编程", path: "/JavaSE/尚硅谷-李金辉-JavaSE-第15章 网络编程.md" },
              { title: "反射", path: "/JavaSE/尚硅谷-李金辉-JavaSE-第16章 反射（Reflect）.md" },
              { title: "类的加载器", path: "/JavaSE/类的加载器.md" },
              { title: "JDK新特性", path: "/JavaSE/尚硅谷-李金辉-JavaSE-第17章 JDK新特性.md" },
              { title: "JavaSE复习", path: "/JavaSE/JavaSE复习笔记.md" }
          ]
      },
      {
        title: "MySQL",
        path: '/MySQL/尚硅谷_柴林燕_MySQL8_可视化工具Navicat的使用',
        collapsable: false, // 不折叠
        children: [
          { title: "可视化工具Navicat的使用", path: "/MySQL/尚硅谷_柴林燕_MySQL8_可视化工具Navicat的使用.md" },
          { title: "MySQL8.0_安装和使用文档", path: "/MySQL/尚硅谷_柴林燕_MySQL8.0_安装和使用文档.md" },
          { title: "SQL笔记", path: "/MySQL/尚硅谷_柴林燕_MySQL8.0_SQL笔记.md" },
          { title: "JDBC笔记", path: "/MySQL/尚硅谷_柴林燕_MySQL8.0_JDBC笔记.md" }
        ],
      }
    ], // 侧边栏配置

    },
    theme: 'reco',
    locales: {
      '/': {
        lang: 'zh-CN'
      }
    },
  };