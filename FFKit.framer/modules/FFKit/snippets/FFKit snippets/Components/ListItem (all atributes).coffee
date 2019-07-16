plugin.run = (contents, options) ->
	"""
#{contents}

listItem = new ListItem
	text: "Hello World"
	right: "arrow-right"
	flag: "uk"
	line: "fullwidth"
	lineTop: true
	y: 200
	type: "wide"

	"""
