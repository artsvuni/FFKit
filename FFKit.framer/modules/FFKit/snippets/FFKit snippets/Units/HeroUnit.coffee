plugin.run = (contents, options) ->
	"""
#{contents}

# Create hero unit
heroUnit = new HeroUnit
	title: "Hello World"
	subTitle: "Shop now"
	cover: $+"default/hero-01.jpg"

	"""
