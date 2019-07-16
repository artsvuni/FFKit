plugin.run = (contents, options) ->
	"""
#{contents}
# Selector
selector = new Selector
	placeholderText: "Select sdf your size"
	labelText: "Country/Region"
	helperText: "This is helper text"
	"""
