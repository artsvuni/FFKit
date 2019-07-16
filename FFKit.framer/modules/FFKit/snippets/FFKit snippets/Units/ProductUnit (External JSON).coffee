plugin.run = (contents, options) ->
	"""
#{contents}

# Create product unit
productUnit = new ProductUnit
	title: "Hello World"
	description: "Selection of new items has just arrived to our boutiques."
	productsArray: JSON.parse Utils.domLoadDataSync $+"default/products.json"

	"""
