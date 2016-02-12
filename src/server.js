"use strict";

import express from "express";
import path from "path";

import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../webpack.config";

import React from "react";
import { renderToString } from "react-dom/server";
import { match, RoutingContext } from "react-router";
import createLocation from "history/lib/createLocation";
import routes from "../common/Routes";

import HTML from "./HTML";

// -----------------------------------

// Initialize express server
const server = express();


if(process.env.NODE_ENV == "development") {
	// Here we plug webpack middleware for hot reloading.
	// webpack-dev-middle watches the source code for changes and recompiles the bundle
	// webpack-hot-middleware Notifies the browser when a new bundle has been compiled
	const compiler = webpack(webpackConfig);
	server.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
	server.use(webpackHotMiddleware(compiler));
}

server.use('/static', express.static(path.join(__dirname, "../dist")));

// Get the request
server.use((req, res) => {
	// Use React Router to match our request with our components
	const location = createLocation(req.url);
	match({routes, location}, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			res.send(renderFullPage(renderProps));
		} else {
			res.status(404).send("Not found");
		}
	});

});
function renderFullPage(renderProps) {
	if (process.env.NODE_ENV == "development") {
		global.webpack_isomorphic_tools.refresh()
	}

	return 	"<!DOCTYPE html>\n" + renderToString(<HTML assets={global.webpack_isomorphic_tools.assets()} 
													component={<RoutingContext {...renderProps}/>} />);
}

server.listen(3000);
console.log("Listening on port 3000");