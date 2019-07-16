plugin.run = (contents, options) ->
	"""
#{contents}

# Create feature unit with product image
featureUnit = new FeatureUnit
	title: "Hello World"
	subTitle: "Shop now"
	description: "Selection of new items has just arrived to our boutiques."
	cover: $+"default/product-01.jpg"

	"""
