plugin.run = (contents, options) ->
	"""
#{contents}


# Status bar
status_bar = new StatusBar

# Tabbar example
tabbar = new Tabbar
	activeItem: "home"



## Home Screen

homeScreen = new Layer
	width: Screen.width 
	height: Screen.height - status_bar.height - tabbar.height

homeHeader = new Header
	parent: homeScreen
	title: "logo"
	iconRight: "bag"
	
homeSearch = new HomeSearch
	after:  homeHeader

# ScrollComponent
homeScroll = new ScrollComponent
	y: homeSearch.maxY # can't use 'after' as this is Framer's Class
	backgroundColor: "white"
	scrollHorizontal: false
	directionLock: true # avoids scroll when product swiping
	width: Screen.width
	parent: homeScreen
homeScroll.height = homeScreen.height - homeHeader.height - homeSearch.height

pos = new PosBanner
	text: "Private Sale"
	parent: homeScroll.content

# Create hero unit
unit1 = new HeroUnit
	title: "Hello World"
	subTitle: "Shop now"
	cover: $+"default/hero-01.jpg"
	after: pos

# Create product unit
unit2 = new ProductUnit
	title: "Hello World"
	description: "Selection of new items has just arrived to our boutiques."
	productsArray: JSON.parse Utils.domLoadDataSync $+"default/products.json"
	after: unit1

homeScroll.updateContent() # Update scroll




## PLP Screen

plpScreen = new Layer
	width: Screen.width
	height: Screen.height - status_bar.height - tabbar.height
	backgroundColor: "white"

plpHeader = new Header
	title: "Summer"
	subTitle: "7 items"
	iconLeft: "big-arrow"
	iconRight: "bag"
	search: true
	parent: plpScreen

# Create default ScrollComponent
plpScroll = new ScrollComponent
	width: Screen.width
	height: Screen.height - (plpHeader.height)
	scrollHorizontal: false
	y: plpHeader.maxY
	parent: plpScreen

# Product list array
PLPlistArr = JSON.parse Utils.domLoadDataSync $+"default/plp.json"

# Refine Filter's array
refineFiltersArray = []
for i in [0...PLPlistArr.length]
	refineFiltersArray.push PLPlistArr[i].brand.charAt(0) + PLPlistArr[i].brand.slice(1).toLowerCase()
	
# Refine filter
refineFilter = new RefineFilter
	after: plpHeader
	itemsArray: refineFiltersArray
	y: 0

# Refine filter animation on sroll
hideRefine = new Animation refineFilter,
	y: -refineFilter.height
	options:
		time: 0.2
#showRefine = hideRefine.reverse()
showRefine = new Animation refineFilter,
	y: 10
	options:
		time: 0.2
	
	
plpScroll.onScroll (event) ->
	if event.deltaY < 2 and plpScroll.content.y < - 68
		hideRefine.start()
	else if event.deltaY > 2
		showRefine.start()

# Generate product listing cards
productCards = new ProductListingUnit
	parent: plpScroll.content
	y: refineFilter.height

plpHeader.bringToFront() # Bring header to front
# plpScroll.contentInset =
# 	top: 68
plpScroll.updateContent() # Update scroll



## Flow Component

flow = new FlowComponent
	height: Screen.height - status_bar.height - tabbar.height
	y: status_bar.maxY
	
# First screen
flow.showNext(homeScreen)



## Logic and Interactions


# Tabbar
tabbar.selectChild("home").onClick (event, layer) ->
	flow.showNext(homeScreen, animate: false)
	
tabbar.bringToFront()

# Taps to PDP
unit1.onClick (event, layer) ->
	flow.showNext(plpScreen)
	
unit2.cta.onClick (event, layer) ->
	flow.showNext(plpScreen)

plpHeader.selectChild("icn_left").onClick (event, layer) ->
	flow.showPrevious() 

	"""