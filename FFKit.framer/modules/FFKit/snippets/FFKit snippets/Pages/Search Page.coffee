plugin.run = (contents, options) ->
	"""
#{contents}

######### Snippet Search Page #########
statusBar = new StatusBar
	backgroundColor: null

flow = new FlowComponent
		
categoriesPage = new CategoriesPage
	x: Screen.width
	actions: {
		"item1": -> print "Tap!",
		"item2": -> print "And another Tap!"
	}

categoriesPage.header.iconLeft_layer.onTap ->
	flow.showPrevious()

designersPage = new DesignersPage
	x: Screen.width
	actions: {
		"2682082": -> print "Yo!"
	}
	
designersPage.header.iconLeft_layer.onTap ->
	flow.showPrevious()

searchPage = new Layer
	width: Screen.width
	height: Screen.height
	backgroundColor: "white"
	
searchCmp = new SearchUnit
	parent: searchPage
	actions: {
		"2682082": -> print "It's my Tap!"
	}

designersListItem = new ListItem
	type: "wide"
	right: "arrow-right"
	text: "Designers"
	after: searchCmp

designersListItem.onTap ->
	flow.showNext(designersPage)

categoriesListItem = new ListItem
	type: "wide"
	right: "arrow-right"
	text: "Categories"
	after: designersListItem

categoriesListItem.onTap ->
	flow.showNext(categoriesPage)

flow.showNext(searchPage)

	"""
