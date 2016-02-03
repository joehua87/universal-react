import React from "react";
import { renderToString } from "react-dom/server";


export default class HTML extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { assets, component } = this.props;

		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<title>Universal React</title>
					{/* styles (will be present only in production with webpack extract text plugin) */}
					{Object.keys(assets.styles).map((style, i) =>
						<link href={assets.styles[style]} key={i} media="screen, projection"
						rel="stylesheet" type="text/css"/>)}

					<style>{require('../common/scss/main.css')}</style>
				</head>

				<body>
					{/* rendered React page */}
					<div id="content" dangerouslySetInnerHTML={{__html: React.renderToString(component)}}/>

					{/* javascripts */}
					{/* (usually one for each "entry" in webpack configuration) */}
					{/* (for more informations on "entries" see https://github.com/petehunt/webpack-howto/) */}
					{Object.keys(assets.javascript).map((script, i) =>
						<script src={assets.javascript[script]} key={i}/>
						)}
				</body>
			</html>
		)
	}
}

HTML.propTypes = {
	assets: React.PropTypes.object,
	component: React.PropTypes.object
}