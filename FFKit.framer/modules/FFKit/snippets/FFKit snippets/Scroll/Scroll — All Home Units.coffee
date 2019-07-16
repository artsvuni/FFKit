plugin.run = (contents, options) ->
	"""
#{contents}

# Create default ScrollComponent
scroll = new ScrollComponent
	size: Screen.size
	scrollHorizontal: false

# Create hero unit
unit1 = new HeroUnit
	title: "Hello World"
	subTitle: "Shop now"
	cover: $+"default/hero-01.jpg"
	parent: scroll.content

# Create product unit
unit2 = new ProductUnit
	title: "Hello World"
	description: "Selection of new items has just arrived to our boutiques."
	productsArray: JSON.parse Utils.domLoadDataSync $+"default/products.json"
	parent: scroll.content
	y: unit1.maxY

# Create product set
unit3 = new ProductSet
	parent: scroll.content
	title: "Hello World"
	subTitle: "Shop Now"
	cover:  $+"default/hero-01.jpg", 
	productsArray: JSON.parse Utils.domLoadDataSync $+"default/products.json"
	parent: scroll.content
	y: unit2.maxY

# Divider line
line = new Keyline
	parent: scroll.content
	y: unit3.maxY

# Create feature unit with product image
unit4 = new FeatureUnit
	title: "Hello World"
	subTitle: "Shop now"
	description: "Selection of new items has just arrived to our boutiques."
	cover: $+"default/product-01.jpg"
	parent: scroll.content
	y: line.maxY

# Creating product hero
unit5 = new ProductHero
	title: "Hello World"
	subTitle: "Please see our reccomendations, based on designers you love."
	description: "There was a shift in sportswear this season. Sure, expected injections of nineties youth culture courtesy of Gosha and the gang were still present, but the general mood played to the more distant past of seventies and eighties athletic wear."
	cover: $+"default/product-hero-01.jpg"
	productsArray: JSON.parse Utils.domLoadDataSync $+"default/products.json"
	parent: scroll.content
	y: unit4.maxY

scroll.updateContent() # Update scroll

	"""
