plugin.run = (contents, options) ->
	"""
#{contents}
# Creating product hero
productHero = new ProductHero
	title: "Hello World"
	subTitle: "Please see our reccomendations, based on designers you love."
	description: "There was a shift in sportswear this season. Sure, expected injections of nineties youth culture courtesy of Gosha and the gang were still present, but the general mood played to the more distant past of seventies and eighties athletic wear."
	cover: $+"default/product-hero-01.jpg"
	productsArray: JSON.parse Utils.domLoadDataSync $+"default/products.json"

	"""
