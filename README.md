Typescript Electron Webpack Axios Send Request by Node Demo
===========================================================

axios同时支持browser和node, 但在electron中运行时，默认走的是browser

强制axios走node还比较麻烦，主要原因是axios中的package.json有一个`browser`选项，其中定义了一个替换：

```
"browser": {
   "./lib/adapters/http.js": "./lib/adapters/xhr.js"
}
```

哪怕我们在代码中指定axios使用http的adapter，webpack也会自动执行该替换。

为了解决这个问题，需要：

1. webpack config中指定`aliasFields: ['unpkg']`，其中`unpkg`是axios的package.json定义的另一个package配置，我们在webpack config中指定它之后，
将不会使用默认的`browser`值，从而不会执行替换。（参见rendererProcessConfig.ts）
2. 在代码中指定axios使用node: `axios.defaults.adapter = require('axios/lib/adapters/http')`，参见`src/renderer/index.ts`
3. electron中启用`nodeIntegration: true`，以支持node，参见`src/main/index.ts`

详情见：https://github.com/axios/axios/issues/552

```
npm install
npm demo
```

1. 按F12打开console,切换到Network。
2. 点击"send request"按钮，页面上将会显示返回的response，其中包含`Cookie`内容
3. Network中看不到请求，因为走的是node
4. Browser console中不会提示发送`Cookie`被禁止的信息
