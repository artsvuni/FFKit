plugin.run = (contents, options) ->
	"""
#{contents}

# Order traker unit
order_traker = new OrderTraker
	title: "We've shipped your order"
	subTitle: "Expected: 6 – 8 Jul"
	image: $+"default/product-01.jpg"
	progress: 50
	progStart: 25

	"""
