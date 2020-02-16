// vue.config.js
// https://cli.vuejs.org/config/
// https://webpack.js.org/configuration/dev-server/#devserverserveindex

module.exports = {
  // options...
  devServer: {
    /*
      host: '0.0.0.0',
      port: 8080,
      */
      publicPath : 'http://olafrv.ddns.net:8080/',
      disableHostCheck: true
  }
}