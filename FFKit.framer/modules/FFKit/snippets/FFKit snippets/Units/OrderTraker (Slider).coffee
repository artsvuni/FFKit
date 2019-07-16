plugin.run = (contents, options) ->
	"""
#{contents}

# Order traker slider
order_traker_slider = new OrderTraker
	sliderArray: [
		{title : "Title 1" , subTitle: "date1", image: $+"default/product-01.jpg", progress: 75,}
		{title : "Title 2" , subTitle: "date2", image: $+"default/hero-01.jpg", progress: 50, progStart:25}
		{title : "Title 2" , subTitle: "date3", image: $+"default/hero-01.jpg", progress: 75,}
		{title : "Title 2" , subTitle: "date4", image: $+"default/hero-01.jpg", progress: 100, progStart:50}
	]

	"""
