plugin.run = (contents, options) ->
	"""
#{contents}

tabs = new Tabs
    items: ["one", "two", "three", "four"]

tabs.one.onTap ->
    print 'sdf'
    
	"""
