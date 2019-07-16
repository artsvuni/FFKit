plugin.run = (contents, options) ->
	"""
#{contents}
# Create product unit
productUnit = new ProductUnit
    title: "Hello Workd"
    description: "Selection of new items has just arrived to our boutiques."
    productsArray: [
        { # Product 1 
        "shortDescription": "yellow zebra bag "
        "images": ["url": $+"default/products/01.jpg"]
        "brand": {"name": "Prada"},
        "price": 135.0
        }
    ]
	
	"""