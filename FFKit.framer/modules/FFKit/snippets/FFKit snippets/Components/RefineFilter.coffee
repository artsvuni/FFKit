plugin.run = (contents, options) ->
	"""
#{contents}
# Refine filter
refine = new RefineFilter
	x: Align.center()
	y: status_bar.maxY
	itemsArray: ["item #1","long item #2","item #3","item #4", "item #5"]

# Update selected items
refine.selected(6)
	"""
