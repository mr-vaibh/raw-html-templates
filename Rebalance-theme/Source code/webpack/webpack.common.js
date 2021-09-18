const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = require('./paths');

module.exports = {
  context: paths.src,
  entry: {
    app: `./scripts/index.js`,
  },
  output: {
    filename: `scripts/[name].[hash:8].js`,
    path: paths.build,
  },
  devServer:{

    // `contentBase` specifies what folder to server relative to the 
    // current directory. This technically isn't false since it's an absolute
    // path, but the use of `__dirname` isn't necessary. 
    contentBase: paths.src
},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer'), require('postcss-flexbugs-fixes')],
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        use:{
          loader: 'html-loader',
          options:{
            attrs: [':data-image','img:src']
          }
        },

      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '../fonts',
            outputPath: 'fonts',
            name: '[name].[hash:8].[ext]',
          },
        },
      },
      {
        test: /\.(gif|ico|jpe?g|png|svg|webp|mp4)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: './images',
            outputPath: 'images',
            name: '[name].[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './[name].[hash:8].css',
    }),
    new CopyWebpackPlugin([{ from: paths.static, to:"static", }]),
  ],
  resolve:{
    alias: {
      cheerio: 'cheerio/lib/cheerio'
    }
  }
};
