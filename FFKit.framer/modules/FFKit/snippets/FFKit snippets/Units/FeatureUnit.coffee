plugin.run = (contents, options) ->
	"""
#{contents}

# Create feature unit
featureUnit = new FeatureUnit
	title: "Hello World"
	subTitle: "Shop now"
	description: "Selection of new items has just arrived to our boutiques."
	cover: $+"default/feature-01.jpg"
	nopadding: yes

	"""
