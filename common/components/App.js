require("../scss/main.css");
import React from "react";

export default class App extends React.Component {
	render() {
		// Thanks to React Router, we don't need to write custom 
		// logic to determine which content is our mainview
		// We jut use this.props.children
		return	<div>
					Hello, world
				</div>;
	}
}