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
}