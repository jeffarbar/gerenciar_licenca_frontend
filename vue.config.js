module.exports = {
    runtimeCompiler: true,
    /*
    productionSourceMap: false,

    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
    */
        devServer: {
            proxy: {
              '/gd': {
                //target: 'http://127.0.0.1:8090/',
                target: 'http://20.127.118.141:8090/',
                changeOrigin: false,
                logLevel: 'debug'
              },
            },
          },
}