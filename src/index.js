require("babel-core/register");
var isomorphicToolsPlugin = require("webpack-isomorphic-tools");
// this must be equal to the Webpack configuration "context" parameter
var projectBasePath = require("path").resolve(__dirname, "..");
// this global variable will be used later in express middleware
// enter development mode if needed
global.webpack_isomorphic_tools = new isomorphicToolsPlugin(require("../webpack-isomorphic-tools-config"))
	.development(process.env.NODE_ENV === "development")
	.server(projectBasePath, function() {
		// webpack isomorphic tools is now setup
		// Require our server code.
		require("./server");
	});
