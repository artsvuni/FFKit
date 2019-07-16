plugin.run = (contents, options) ->
	"""
#{contents}

# Header with all possible atributes #####
header = new Header
	y: 44
	title: "Hello World"
	subTitle: "1500 items"
	iconLeft: "big-arrow"
	iconRight: "bag"
	linkLeft: "Left"
	linkRight: "Right"
	bag: 2
	search: true
	nobg: true 


	"""