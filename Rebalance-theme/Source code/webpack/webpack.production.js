'use strict';

const WebpackAssetsManifest = require('webpack-assets-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin')

const paths = require('./paths');
const path = require('path');
const glob = require('glob')

const production = {
  plugins: [

    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/landing/index-2.html'),
      filename:'landing-2.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/landing/index-3.html'),
      filename:'landing-3.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/portfolio/portfolio-1.html'),
      filename:'portfolio-1.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/portfolio/portfolio-2.html'),
      filename:'portfolio-2.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/portfolio/portfolio-3.html'),
      filename:'portfolio-3.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/portfolio/portfolio-4.html'),
      filename:'portfolio-4.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/portfolio/portfolio-inner-1.html'),
      filename:'portfolio-inner-1.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/portfolio/portfolio-inner-2.html'),
      filename:'portfolio-inner-2.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/portfolio/portfolio-inner-3.html'),
      filename:'portfolio-inner-3.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/portfolio/portfolio-inner-4.html'),
      filename:'portfolio-inner-4.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/portfolio/portfolio-inner-5.html'),
      filename:'portfolio-inner-5.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/portfolio/portfolio-inner-6.html'),
      filename:'portfolio-inner-6.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/blog/news.html'),
      filename:'news.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/blog/single-blog.html'),
      filename:'single-blog.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/contact/contact-1.html'),
      filename:'contact-1.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/contact/contact-2.html'),
      filename:'contact-2.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/contact/contact-3.html'),
      filename:'contact-3.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/about/about-us.html'),
      filename:'about-us-1.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/about/about-us-2.html'),
      filename:'about-us-2.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/other/404.html'),
      filename:'404.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/other/faq.html'),
      filename:'faq.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, './inner/other/team.html'),
      filename:'team.html'
    }),
    
    new StatsWriterPlugin({ fields: null, filename: '../stats.json' }),
    new WebpackAssetsManifest(),
    new CssoWebpackPlugin(),
  ],
	optimization: {
		runtimeChunk: true
	}
};

module.exports = production;
