const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");

module.exports = {
    //The entry point is the root of the bundle and the beginning of the dependency graph, so give it the relative path to the client's code
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
      },


    //webpack will next take the entry point we have provided, bundle that code, and output that bundled code to a folder that we specify.
    // It is common and best practice to put your bundled code into a folder named dist, which is short for distribution
    //The name of each attribute in the entry object will be used in place of [name] in each bundle.js file that is created
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist"
      },
      module: {
        rules: [
          {
            test: /\.jpg$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  esModule: false,
                  name(file) {
                    return '[path][name].[ext]';
                  },
                  publicPath: function(url) {
                    return url.replace('../', '/assets/');
                  }
                }
              },
              {
                loader: 'image-webpack-loader'
              }
            ]
          }
        ]
      },
    //This is because if we want webpack to now use the jQuery package, we need to use a plugin to let webpack know. Plugins play an important role in directing webpack what to do
    //We're going to use the providePlugin plugin to define the $ and jQuery variables to use the installed npm package. 
    //If we did not do this, the code would still not work even though we installed jQuery.
    plugins:[
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
        //plugin that will analyze our bundle sizes to see how much JavaScript is being processed by the browser
        new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to an HTML called report.html file in the dist folder
          })
      ],

//The final piece of our basic setup will provide the mode in which we want webpack to run. By default, webpack wants to run in production mode.
// In this mode, webpack will minify our code for us automatically, along with some other nice additions. 
    mode: 'development'
};