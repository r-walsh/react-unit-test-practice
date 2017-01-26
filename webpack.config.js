const webpack = require( "webpack" );

module.exports = {
	devServer: {
		contentBase: "./dist"
		, historyApiFallback: true
		, hot: true
		, stats: {
			colors: true
		}
	}
	, devtool: "source-map"

	, entry: [
		"webpack-dev-server/client?http://localhost:8080"
		, "webpack/hot/only-dev-server"
		, "./src/index.js"
	]

	, externals: {
		"react/addons": true
		, "react/lib/ExecutionEnvironment": true
		, "react/lib/ReactContext": true
	}

	, module: {
		loaders: [
			{ exclude: /node_modules/, loaders: [ "react-hot", "babel" ], test: /\.js/ }
			, { loader: "style-loader!css-loader!stylus-loader", test: /\.styl/ }
			, { loader: "style-loader!css-loader", test: /\.css/ }
			, { loader: "json-loader", test: /\.json$/ }
		]

		, noParse: [ /\/sinon\.js/ ]
	}
	, output: {
		filename: "bundle.js"
		, path: `${ __dirname  }/dist/`
		, publicPath: "http://localhost:8080/"
	}

	, plugins: [ new webpack.HotModuleReplacementPlugin() ]

	, resolve: {
		extensions: [ "", ".js" ]
	}

};
