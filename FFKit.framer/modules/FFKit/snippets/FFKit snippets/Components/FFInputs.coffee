plugin.run = (contents, options) ->
	"""
#{contents}
# Inputs list
# Create default ScrollComponent
scroll = new ScrollComponent
	y: statusbar.maxY
	size: Screen.size
	scrollHorizontal: false
	backgroundColor: "white"
	contentInset:
		bottom: 40
	
fName = new FFInput
	parent: scroll.content
	labelText: "First name"
	placeholderText: "Placeholder test"

lName = new FFInput
	parent: scroll.content
	labelText: "Last name"
	after: fName

country = new Selector
	parent: scroll.content
	after: lName
	labelText: "Country/Region"
	
address1 = new FFInput
	parent: scroll.content
	labelText: "Address Line 1"
	after: country

address2 = new FFInput
	parent: scroll.content
	labelText: "Address Line 2"
	helperText: "+ Add another line" 
	after: address1

address2.helperText.props =
	color: "#8c8c8c"
	textAlign: "right"

city = new FFInput
	parent: scroll.content
	labelText: "City"
	after: address2

state = new FFInput
	parent: scroll.content
	labelText: "State (optional)"
	after: city
	
postalCode = new FFInput
	parent: scroll.content
	labelText: "Postal Code"
	after: state

scroll.updateContent() # Update scroll

	"""
