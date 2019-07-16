plugin.run = (contents, options) ->
	"""
#{contents}

# Create gender switch banner
genderSwitch = new GenderSwitch
	text: "Shop Men"
	type: "men"
	gradient: yes
# 	banner: $+"default/feature-00.jpg"

	"""
