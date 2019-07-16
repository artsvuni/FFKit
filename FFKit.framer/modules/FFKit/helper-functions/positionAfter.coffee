#🚦⚙️  Helper Function - positionAfter

window.positionAfter = (after, frame, offset=0) ->
	frame.parent = after.parent
	frame.y = after.maxY + offset



