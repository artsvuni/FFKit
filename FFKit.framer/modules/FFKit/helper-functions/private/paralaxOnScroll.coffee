# Helper Function - paralaxOnScroll
exports.paralaxOnScroll = (unit) ->
	# Check if parent of the unit is ScrollComponent
	if unit.parent and unit.parent.name is "content"
		if unit.parent.parent.constructor.name is "ScrollComponent"
				unit.parent.parent.on Events.Move, (event, layer) ->
					y = unit.parent.y + unit.y
					unit.selectChild('image').y = Utils.modulate(
						y, 		   # A variable, representing the input.
						[0, -360], # The range, representing when to module... #TODO: Attached to the Screen Size
						[0, 100]   # How much to modulate.
					)
		else if unit.parent.parent.constructor.name is "PageComponent"
			if unit.parent.parent.parent.parent
				if unit.parent.parent.parent.parent.parent.constructor.name is "ScrollComponent"
					unit.parent.parent.parent.parent.parent.on Events.Move, (event, layer) ->
						y = unit.parent.parent.parent.parent.y + unit.y
						unit.selectChild('image').y = Utils.modulate(
							y, 		   # A variable, representing the input.
							[0, -360], # The range, representing when to module... #TODO: Attached to the Screen Size
							[0, 100]   # How much to modulate.
						)