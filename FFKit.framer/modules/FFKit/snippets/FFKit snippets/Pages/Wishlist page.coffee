plugin.run = (contents, options) ->
	"""
#{contents}

########## Wishlist Page ###########
statusBar = new StatusBar

wishListPage = new Layer
	width: Screen.width
	height: Screen.height
	backgroundColor: "white"

wishlistHeader = new Header
	parent: wishListPage
	after: statusBar
	title: "Wishlist"
	iconRight: "bag"
	search: true

wishlistTabs = new Tabs
	parent: wishListPage
	after: wishlistHeader
	items: ["all", "on sale"]

wishlistTabs.on_sale.text.color = "red"

wishlistUnit = new WishlistUnit
	parent: wishListPage
	after: wishlistTabs
	height: Screen.height - wishlistTabs.maxY
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

wishlistHeader.title = "Wishlist (" + wishlistUnit.content.children.length + ")"
	
wishlistUnit.listcard_1.onTap ->
	print "Tap!"

wishlistUnit.states =
	hide:
		x: -Screen.width
	animationOptions:
		time: 0.2

# On Sale
wishlistUnitSale = new WishlistUnit
	parent: wishListPage
	x: Screen.width
	after: wishlistTabs
	height: Screen.height - wishlistTabs.maxY
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
		}
	]

wishlistUnitSale.states =
	show:
		x: 0
	animationOptions:
		time: 0.4
		curve: Spring(damping: 0.9)

# On tab animation
wishlistTabs.on_sale.onTap ->
	wishlistUnit.animate("hide")
	wishlistUnitSale.animate("show")

wishlistTabs.all.onTap ->
	wishlistUnit.animate("default")
	wishlistUnitSale.animate("default")

	"""
