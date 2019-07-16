plugin.run = (contents, options) ->
	"""
#{contents}
# PDP hero
pdpHeroUnit = new PDPHeroUnit
	parent: scroll.content
	"""
