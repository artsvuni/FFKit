plugin.run = (contents, options) ->
	"""
#{contents}
# Recomended List
scroll = new ScrollComponent
	size: Screen.size
	scrollHorizontal: false
	contentInset: 
		bottom: M_spacer

recomendedList = new RecommendedListUnit
	parent: scroll.content
	icon: true
	border: true
	description: true

scroll.updateContent() # Update scroll

	"""
