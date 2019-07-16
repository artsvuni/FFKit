plugin.run = (contents, options) ->
	"""
#{contents}

# Status bar
status_bar = new StatusBar

# Tabbar example
tabbar = new Tabbar
	activeItem: "home"

## Screens

# Home Screen
homeScreen = new Layer
	width: Screen.width 
	height: Screen.height - status_bar.height - tabbar.height
	backgroundColor: "blue"

# Me Screen
meScreen = new Layer
	width: Screen.width
	height: Screen.height - status_bar.height - tabbar.height
	backgroundColor: "green"


# Set up FlowComponent
flow = new FlowComponent
	height: Screen.height - status_bar.height - tabbar.height
	y: status_bar.maxY
	
# First screen
flow.showNext(homeScreen)


# Tabbar logic
tabbar.selectChild("home").onClick (event, layer) ->
	flow.showNext(homeScreen, animate: false)

tabbar.selectChild("me").onClick (event, layer) ->
	flow.showNext(meScreen, animate: false)
	
tabbar.bringToFront()

	"""