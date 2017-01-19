var debug   = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path    = require('path');

var babelLoader = {
    test    : /\.jsx?$/,
    exclude : /(node_modules|bower_components)/,
    loader  : 'babel-loader',

    query: {
        presets : ['react', 'es2015', 'stage-0'],
        plugins : ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
    }
};

var jsonLoader = {
    test   : /\.json$/,
    loader : 'json-loader'
};

var markdownLoader = {
     test: /\.md$/, 
     loader: "html!markdown" 
}

var plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        mangle    : false,
        sourcemap : false,
        compress: {
            warnings: false
        }
    }),
    new webpack.DefinePlugin({ "global.GENTLY": false })
];

// Not transpiling server code since everything breaks.
module.exports = { // Client.
    context : path.join(__dirname, 'src', 'public'),
    devtool : debug ? 'eval' : null,
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8082',
        'webpack/hot/only-dev-server',
        'webpack-hot-middleware/client',
        './client.js'
    ],

    node: {
      __dirname: true,
    },

    module: {
        loaders: [ babelLoader ]
    },

    devServer: {
        port: 8082
    },

    output: {
        path     : path.join(__dirname, 'src/public'),
        publicPath: 'src/public',
        filename : 'client.min.js'
    },

    plugins: debug ? [] : plugins
};


/*
var debug   = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path    = require('path');

var jsonwebtoken = require('jsonwebtoken');

var babelLoader = {
    test    : /\.jsx?$/,
    exclude : /(node_modules|bower_components)/,
    loader  : 'babel-loader',

    query: {
        presets : ['react', 'es2015', 'stage-0'],
        plugins : ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
    }
};

var jsonLoader = {
    test   : /\.json$/,
    loader : 'json-loader'
};

var markdownLoader = {
     test: /\.md$/, 
     loader: "html!markdown" 
}

var plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        mangle    : false,
        sourcemap : false,

        compress: {
            warnings: false
        }
    })
];

// Not transpiling server code since everything breaks.
module.exports = [{ // Client.
    context : path.join(__dirname, 'src', 'public'),
    devtool : debug ? 'eval' : null, // Use 'sourcemap' to debug in browser.
    entry   : './client.js',

    module: {
        loaders: [ babelLoader ]
    },

    output: {
        path     : path.join(__dirname, 'src', 'public'),
        filename : 'client.min.js'
    },

    plugins: debug ? [] : plugins
}];*/


