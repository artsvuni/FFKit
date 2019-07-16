plugin.run = (contents, options) ->
	"""
#{contents}

designersPage = new DesignersPage
	actions: {
		"2682082": -> print "Yo!"
	}
	
designersPage.header.iconLeft_layer.onTap ->
	print "back"
    
	"""
