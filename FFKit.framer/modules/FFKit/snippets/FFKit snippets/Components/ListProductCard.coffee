plugin.run = (contents, options) ->
	"""
#{contents}
# List Product Card
listCard = new ListProductCard
	y: 40
	cover: $+"default/list-product-card-01.png"
	season: ""
	brand: "Dvf Diane Von Furstenberg"
	icon: "wishlist"
	description: "The Large Rucksack in Technical Nylon and Leather"
	price: "£239"
	"""
