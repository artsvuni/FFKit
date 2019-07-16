plugin.run = (contents, options) ->
	"""
#{contents}

# Create product set
productSet = new ProductSet
	parent: scroll.content
	title: "Hello World"
	subTitle: "Shop Now"
	cover: $+"default/hero-01.jpg", 
	productsArray: JSON.parse Utils.domLoadDataSync $+"default/products.json"

	"""
