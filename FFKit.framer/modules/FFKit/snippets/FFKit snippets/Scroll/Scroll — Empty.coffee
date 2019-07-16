plugin.run = (contents, options) ->
	"""
#{contents}

# Create default ScrollComponent
scroll = new ScrollComponent
	size: Screen.size
	scrollHorizontal: false

# unit 1
# unit = new unitClass
# 	parent: scroll.content

# unit 2
# unit = new unitClass
# 	parent: scroll.content

# unit 3
# unit = new unitClass
# 	parent: scroll.content


scroll.updateContent() # Update scroll

	"""
