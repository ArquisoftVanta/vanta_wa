const fs = require('fs')

module.exports = {
    lintOnSave: true,
    devServer: {
        https: {
            key: fs.readFileSync('./key/private.key'),
            cert: fs.readFileSync('./key/private.crt'),
        },
        public: 'https://localhost:3500/'
    }
    /*runtimeCompiler:true,
    configureWebpack:{
      mode: 'production',

      resolve:{
        extensions:['.js'],
        alias:{
          'jquery': 'jquery/dist/jquery.slim.js',
        }
      },
      plugins:[
        new webpack.ProvidePlugin({
          '$': 'jquery',
          jQuery: 'jquery',
          Popper: ['popper.js', 'default'],
          'Util': "exports-loader?Util!bootstrap/js/dist/util"
        })
      ]
    }*/
}