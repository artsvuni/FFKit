plugin.run = (contents, options) ->
	"""
#{contents}

wishlistUnit = new WishlistUnit
	array: [
		{
			"season": "New Season",
			"shortDescription": "swing denim jacket",
			"image": "modules/FFKit/content/default/products/women/01.jpg",
			"brand": "BALENCIAGA",
			"price": "£1,259"
		},
		{
			"season": "New Season",
			"shortDescription": "Gucci logo T-shirt with shooting stars",
			"image": "modules/FFKit/content/default/products/women/02.jpg",
			"brand": "GUCCI",
			"price": "£1,500"
		},
		{
			"season": "",
			"shortDescription": "sleeveless V-neck stamp print dress",
			"image": "modules/FFKit/content/default/products/women/03.jpg",
			"brand": "GUCCPETER PILOTTOI",
			"price": "£739"
		},
		{
			"season": "New Season",
			"shortDescription": "fringed netted midi dress",
			"image": "modules/FFKit/content/default/products/women/05.jpg",
			"brand": "CALVIN KLEIN 205W39NYC",
			"price": "£1,575"
		},
		{
			"season": "",
			"shortDescription": "New Swing shirt",
			"image": "modules/FFKit/content/default/products/women/06.jpg",
			"brand": "BALENCIAGA",
			"price": "£1,050"
		}
	]

	"""
