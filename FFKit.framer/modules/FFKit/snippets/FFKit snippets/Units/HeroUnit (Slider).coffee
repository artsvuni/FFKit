plugin.run = (contents, options) ->
	"""
#{contents}

# Create Hero unit with multiple slides
heroSlider = new HeroUnit
	sliderArray: [
		{title : "Title 1" , subTitle: "Shop Now", cover: $+"default/hero-00.jpg"}
		{title : "Title 2" , subTitle: "Shop Now", cover: $+"default/hero-01.jpg"}
	]

	"""
