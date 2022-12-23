# RuleApiVisible

RuleApiVisible是一套适用于RuleApi的可视化配置管理界面，技术栈为vue2+elementUi+NuxtJS。它主要用于可视化的管理RuleApi的系统配置项和各模块数据，并且提供在vue和NuxtJS环境下对接RuleApi的参考范例。

## 安装教程

1.在安装完成NodeJS环境后，打开RuleApiVisible文件夹，在此处打开终端，执行如下命令安装所需的全部组件。

```bash
$ npm install
```

2.组件安装完成后，编辑根目录nuxt.config文件，将baseUrl改为自己的接口地址，随后可通过如下命令运行调试，用于二次开发或部分修改。

```bash
$ npm run dev
```

3.通过如下命令将RuleApiVisible编译打包为静态文件，即可放入RuleApi的static文件夹或者单独发布运行。

```bash
$ npm run generate
```

还可以参阅 [nuxtjs官方文档](https://nuxtjs.org)


