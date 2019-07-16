plugin.run = (contents, options) ->
	"""
#{contents}
# Refine Filters
status_bar = new StatusBar

header_refine = new Header
	after: status_bar
	title: "Refine"
	iconLeft: "big-cross"

# Create ScrollComponent
scroll = new ScrollComponent
	y: header_refine.maxY
	height: Screen.height - status_bar.height - header_refine.height
	width: Screen.width
	backgroundColor: "#ffffff"
	scrollHorizontal: false
scroll.content.backgroundColor = "#ffffff"


title1 = new ListTitle
	text: "Sort by"
	parent: scroll.content
	y: M_spacer

sortByList = new ListRadioSelect
	selectArray: [
		{text : "Our Picks", on : true}, 
		{text : "New Items"}
		{text : "Price (high first)"}
		{text : "Price (low first)"}
		]
	after: title1

title2 = new ListTitle
	text: "Filter by"
	y: M_spacer
	after: sortByList

listItem1 = new ListItem
	text: "Designers"
	left: "arrow-right"
	after: title2

listItem2 = new ListItem
	text: "Colours"
	left: "arrow-right"
	after: listItem1

listItem3 = new ListItem
	text: "Price Range"
	left: "arrow-right"
	after: listItem2

listItem4 = new ListItem
	text: "F90 Delivery"
	left: "arrow-right"
	after: listItem3

listItem5 = new ListItem
	text: "Same Day Delivery"
	left: "arrow-right"
	after: listItem4

listItem6 = new ListItem
	text: "Sale Discount"
	left: "arrow-right"
	after: listItem5


scroll.updateContent() # Update scroll


showResultsButon = new ButtonFixed
	text: "Show 1250 results"

	"""
