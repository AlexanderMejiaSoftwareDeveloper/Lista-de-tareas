const path = require('path');
const webpack = require('webpack')

module.exports = {
    entry: './public/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,"./public/dist")
    },
    module: {
        rules: [
            {
                test:  /\.m?js$/,//Esto hace referencia a todos los archivos que terminen en js 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}