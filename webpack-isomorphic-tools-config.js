var webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')
 
module.exports = {
  assets:
  {
    images:
    {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
    },		
    styles: {
		extensions: ["css"],

		// which `module`s to parse CSS from:
		filter: function(module, regular_expression, options, log) {
			if (options.development) {
				return webpack_isomorphic_tools_plugin.style_loader_filter(module, regular_expression, options, log)
			}
		},
		path: webpack_isomorphic_tools_plugin.style_loader_path_extractor,
		parser: webpack_isomorphic_tools_plugin.css_loader_parser
	}
  }
}