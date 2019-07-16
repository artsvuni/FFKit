plugin.run = (contents, options) ->
	"""
#{contents}

# Different examples of headers

header1 = new Header
	y: 150
	title: "logo"
	iconRight: "bag"

header2 = new Header
	y: 250
	title: "Hello World"
	iconLeft: "big-arrow"
	iconRight: "bag"
	search: true

header3 = new Header
	y: 350
	title: "Alexander MqQueen"
	subTitle: "1500 items"
	iconLeft: "big-arrow"
	iconRight: "bag"
	bag: 2
	search: true

header4 = new Header
	y: 450
	title: "Refine"
	iconLeft: "cross"
	linkRight: "Clear All"

header4 = new Header
	y: 550
	iconLeft: "big-arrow"
	iconRight: "bag"
	search: true
	nobg: true 

header6 = new Header
	y: 650
	title: "Hello Word"
	iconRight: "cross"

	"""