import React from "react";
import { Route } from "react-router";
import App from "./components/App";
import Page1 from "./components/Page1";
export default (
	<Route path="/" component={App}>
		<Route path="/page1" component={Page1}></Route>
	</Route>
);