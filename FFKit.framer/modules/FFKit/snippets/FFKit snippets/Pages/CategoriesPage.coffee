plugin.run = (contents, options) ->
	"""
#{contents}

categoriesPage = new CategoriesPage
	actions: {
		"item1": -> print "Tap!",
		"item2": -> print "And another Tap!"
	}

categoriesPage.header.iconLeft_layer.onTap ->
	print "back"
    
	"""
