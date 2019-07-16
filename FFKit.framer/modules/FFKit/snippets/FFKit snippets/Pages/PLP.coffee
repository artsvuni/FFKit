plugin.run = (contents, options) ->
	"""
#{contents}

# PLP Screen container that can be used by Flow Component
plpScreen = new Layer
	width: Screen.width
	height: Screen.height # Mind to remove statusbar & tabbar height later.
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

# Refine filter animation on sroll
hideRefine = new Animation refineFilter,
	y: -refineFilter.height
	options:
		time: 0.2
showRefine = hideRefine.reverse()

plpScroll.onScroll (event) ->
	if event.deltaY < 2 and plpScroll.content.y < -68
		hideRefine.start()
	else if event.deltaY > 2
		showRefine.start()

# Generate product listing cards
productCards = new ProductListingUnit
	parent: plpScroll.content
	y: refineFilter.height

plpHeader.bringToFront() # Bring header to front
plpScroll.updateContent() # Update scroll

	"""
