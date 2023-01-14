//虚拟模块的前缀
//作用,调用此模块,得到blog的扫描数据
//
import Analyze from './analy'

export default function MyVirtualBlogDataPlugin() {
  // 虚拟模块的前缀，在使用的时候，模块名必须以这个作为前缀的模块名才会被进一步解析
  const modulePrefix = 'virtual-blog-data:'

  return {
    // 我们自定义的插件名
    name: 'my-virtual-blog-date-plugin',
    resolveId(id /*: string */) {
      // 判断是否符合插件的前缀条件
      const [, dir_] = id.split(modulePrefix)
      // 如果不符合则停止
      if (!dir_) return
      // 如果符合基本格式，但日期的值不合法，比如 13 月, 32 号
      // if (Number.isNaN(Date.parse(date))) {
      //   throw new Error('Trying to load an invalid date')
      // }
      // 一切正常则返回
      return id
    },
    load(id/* : string */) {
      // 在加载文件内容的钩子中返回这个虚拟模块的内容
      const [, dir_] = id.split(modulePrefix)
      // 如果值不合法则跳过，加载下一个文件
      if (!dir_) return
      // 返回一个预期的文件内容
        let _data = Analyze() //得到数据

      return `export default ${JSON.stringify(_data)}`
    }
  }
}
