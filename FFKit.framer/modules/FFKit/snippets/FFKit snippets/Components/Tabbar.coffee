plugin.run = (contents, options) ->
	"""
#{contents}
# Tabbar example
tabbar = new Tabbar
	activeItem: "home"

# Change active item
tabbar.activeItem = "me"

# Add events
tabbar.selectChild("home").on Events.Click, (event, layer) ->
	print "Clicked Home", layer.name

	"""
