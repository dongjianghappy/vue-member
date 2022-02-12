module.exports = {
    // outputDir: 'dist',   //build输出目录
    // assetsDir: 'assets', //静态资源目录（js, css, img）
    // lintOnSave: false, //是否开启eslint
    // publicPath: process.env.NODE_ENV === 'production' ? '/app/' : './', // 页面报vue Cannot GET错误信息，先注释，配置信息重启生效
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
      proxy: {
          '/api': {
              target: 'http://127.0.0.1', //API服务器的地址 http://www.yunxi10.com  http://127.0.0.1  http://www.dongblog.com
              ws: true,  //代理websockets
              changeOrigin: true, // 虚拟的站点需要更管origin
              pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                  '^/': ''
              }
          }
      },
  }
  }