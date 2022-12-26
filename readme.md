## 我的目的

写了博客,很长时间了,其时blog对我来就是一个笔记,方便我需要的时候来查找.

用过hexo,但是不方便查找,对我来说太复杂,

也用了vitepress,源码太复杂,看不懂,不是我的习惯(看不懂源码的东西少用)

还是自己实现一个简单的,静态blog生成的项目吧



## 我需要的功能

- 可以自定义渲染markdown的样式,`markdown-it`,可以写插件
- 目录树对文章进行分类,而不是列表,方便查找
- 前端可以查找文章,lur.js
- tab 可以现时打开多篇文章

## 我的思路

使用vue3+vite实现

其它项目需要用的时候,直接使用编译好的js文件

## 感谢下面的文章给我提供的思路


- lunr.js 提供前端搜索功能
- 提供了sideNavTree实现的思路 [hyounoo/v-treeview: A treeview component for Vue.js2](https://github.com/hyounoo/v-treeview)
- [外部js调用vue事件方法 - MELANCHOLYS - 博客园](https://www.cnblogs.com/melancholys/p/16547793.html)
- 给我提供了tabbar实现的思路 [vue 后台管理系统实现页面多tab，右键菜单关闭、刷新等功能 - 简书](https://www.jianshu.com/p/78d09060bbb0)
- [vite打包lib库 - 掘金](https://juejin.cn/post/7073646687968821256)
