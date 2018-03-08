var path = require("path");
var fableUtils = require("fable-utils");

function resolve(filePath) {
  return path.join(__dirname, filePath)
}

var babelOptions = {
  "presets": [resolve("./node_modules/babel-preset-es2015")]
}

var isProduction = process.argv.indexOf("-p") >= 0;
console.log("Bundling for " + (isProduction ? "production" : "development") + "...");

module.exports = {
//  devtool: "source-map",
  entry: resolve('./src/fable-aws-lambda.fsproj'),
  output: {
    filename: 'main.js',
    path: resolve('./'),
    libraryTarget: 'commonjs', //libraryTarget: 'var',
//    library: 'FableAwsLambda'   
  },
  resolve: {
    modules: [resolve("./node_modules/")]
  },
  target : "node",
  module: {
    rules: [
      {
        test: /\.fs(x|proj)?$/,
        use: {
          loader: "fable-loader",
          options: {
            babel: babelOptions,
            define: isProduction ? [] : ["DEBUG"]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        },
      }
    ]
  }
};
