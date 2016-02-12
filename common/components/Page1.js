require("../scss/page1.css");
import React from "react";

export default class Page1 extends React.Component {
	render() {
		// Thanks to React Router, we don't need to write custom 
		// logic to determine which content is our mainview
		// We jut use this.props.children
		return	<a>
					Link
				</a>;
	}
}