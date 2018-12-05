  const path = require('path');

  module.exports = {
  	mode: 'development',
    entry: {
      index:'./src/index.js'
    },
    devtool: 'inline-source-map',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
     contentBase: path.join(__dirname, 'dist'),
     compress: true,
     port: 8181,
     historyApiFallback: {
      rewrites: [
        {
          from: /^\/$/,
          to: "/views/index.html"
        },
        {
          from: /add_posts/,
          to: "/views/add_posts.html"
        }
      ]
    }
  },

   module: {
     rules: [
       {
         test: /\.css$|\.scss$/,
         use: [
           'style-loader',
           'css-loader',
           'sass-loader'
         ]
       },   
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       },
       {
        test: /\.json$/,
        loader: 'json-loader'
      }
     ]
   }
  };