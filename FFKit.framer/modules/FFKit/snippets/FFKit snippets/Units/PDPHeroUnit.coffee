plugin.run = (contents, options) ->
	"""
#{contents}
# PDP Hero
myArray = JSON.parse Utils.domLoadDataSync "modules/FFKit/units/PDPHeroUnit/data/productImages.json"

pdpHeroUnit = new PDPHeroUnit
    parent: scroll.content
    array: myArray

	"""
