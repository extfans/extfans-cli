# extfans 扩展构建工具

## node版本要求
10.9.0

## 构建流程
1. 清理`dist`目录
2. 复制国际化及图标文件到`dist`
3. 生成扩展manifest临时文件
4. 读取extfans cli配置
5. 根据manifest临时文件和extfans cli配置中描述的路径生成webpack entry
6. 执行webpack打包
7. 根据webpack打包结果，替换manifest临时文件中的路径生成正式的manifest.json

## 预定义的webpack env
* process.env.BROWSER(当运行`extfans-cli dev chrome`时，process.env.BROWSER === 'chrome')
* process.env.NODE_ENV(dev时为`development`，build时为`production`)

## 预定义的webpack alias
* @(相当于browser/base/src)
* ~(相当于browser/${process.env.BROWSER}/src)
* @extfans/lib(相当于@extfans/lib/src)

## webpack entry point收集流程
1. 生成`manifest.json`，收集文件中以`@/`或`~/`开始的路径，比如`@/pages/newtab.html`
2. 生成extfans cli配置，记录`webpackPoints`下保存的路径
3. 将路径转化为entry point，比如`@/pages/newtab.html`->`browser/base/src/pages/newtab/index.js`，如果目录下还存在`index.html`就作为该页面对应的html模板传递给`HtmlWebpackPlugin`

## 使用中的项目
1. http://git.infinitynewtab.com/Starlab/extfans-weather-extension
