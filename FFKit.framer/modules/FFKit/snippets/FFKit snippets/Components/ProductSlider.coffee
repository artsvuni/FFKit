plugin.run = (contents, options) ->
	"""
#{contents}
productCardA = new ProductSlider
	array: [
		{ # Product 1 
		"shortDescription": "I heart Prada bag charm"
		"images": ["url": "https://cdn-images.farfetch-contents.com/12/65/74/91/12657491_12339825_300.jpg"]
		"brand": {"name": "Prada"},
		"price": "£ 135"
		}
		{ # Product 1 
		"shortDescription": "I heart Prada bag charm"
		"images": ["url": "https://cdn-images.farfetch-contents.com/12/65/74/91/12657491_12339825_300.jpg"]
		"brand": {"name": "Prada"},
		"price": "£ 135"
		}
	]
	"""
