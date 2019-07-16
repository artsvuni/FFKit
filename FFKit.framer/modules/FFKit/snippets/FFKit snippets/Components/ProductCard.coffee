plugin.run = (contents, options) ->
	"""
#{contents}
# Product card example
productCardA = new ProductCard
	cover: "modules/FFKit/content/default/products/women/02.jpg"
	brandText: "C&C"
	descriptionText: "Embellished logo denim jacket"
	priceText: "£1256"
	"""