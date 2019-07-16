plugin.run = (contents, options) ->
	"""
#{contents}

# Data array
array = 
[
	{
	title: "Hello World", 
	description: "Please see our reccomendations, based on designers you love.", 
	productsArray: [
			{ # Product 1
				"brand": { "name": "GUCCI" }, 
				"shortDescription": "Tiger embroided hooded sweatshirt", 
				"price": "£2420", 
				"images": [{ "isLocal": true, "url": $+"default/products/01.jpg"}]
			} 
	]}
]

# Create product unit
unit = new ProductUnit
	title: array[0].title
	description: array[0].description
	productsArray: array[0].productsArray

	"""