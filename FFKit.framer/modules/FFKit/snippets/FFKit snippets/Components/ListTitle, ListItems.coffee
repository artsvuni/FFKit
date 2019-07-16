plugin.run = (contents, options) ->
	"""
#{contents}

listTitle = new ListTitle
	text: "Hello Word"
	y: 50
	
listItem1 = new ListItem
	text: "Hello World"
	right: "arrow-right"
	y: listTitle.maxY
	type: "wide"

listItem2 = new ListItem
	text: "Hello World"
	y: listItem1.maxY

listItem3 = new ListItem
	text: "Hello World"
	right: "arrow-right"
	flag: "uk"
	y: listItem2.maxY
	type: "wide"
	
listItem4 = new ListItem
	text: "Hello World"
	right: "toggle"
	y: listItem3.maxY
	type: "wide"

listItem5 = new ListItem
	text: "Hello World"
	line: "fullwidth"
	lineTop: true
	y: listItem4.maxY
	
	
listItem6 = new ListItem
	text: "Hello World"
	line: false
	lineTop: "fullwidth"
	y: listItem5.maxY

	"""
