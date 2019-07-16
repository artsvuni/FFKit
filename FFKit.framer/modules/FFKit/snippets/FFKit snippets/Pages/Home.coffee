plugin.run = (contents, options) ->
	"""
#{contents}

# Home Screen container that can be used by Flow Component
homeScreen = new Layer
	width: Screen.width 
	height: Screen.height # Mind to remove statusbar & tabbar height later.
	backgroundColor: "blue"

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

# Create product set
unit3 = new ProductSet
	title: "Hello World"
	subTitle: "Shop Now"
	cover:  $+"default/hero-01.jpg", 
	productsArray: JSON.parse Utils.domLoadDataSync $+"default/products.json"
	after: unit2

# Divider line
line = new Keyline
	after: unit3

# Create feature unit with product image
unit4 = new FeatureUnit
	title: "Hello World"
	subTitle: "Shop now"
	description: "Selection of new items has just arrived to our boutiques."
	cover: $+"default/product-01.jpg"
	after: line

# Creating product hero
unit5 = new ProductHero
	title: "Hello World"
	subTitle: "Please see our reccomendations, based on designers you love."
	description: "There was a shift in sportswear this season. Sure, expected injections of nineties youth culture courtesy of Gosha and the gang were still present, but the general mood played to the more distant past of seventies and eighties athletic wear."
	cover: $+"default/product-hero-01.jpg"
	productsArray: JSON.parse Utils.domLoadDataSync $+"default/products.json"
	after: unit4

homeScroll.updateContent() # Update scroll

	"""
