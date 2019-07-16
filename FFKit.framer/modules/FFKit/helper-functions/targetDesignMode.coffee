#🚦⚙️  Helper Function - targetDesignMode

window.targetDesignMode = (target, frame) ->
	# for children, i in childrenArray
	# 	children.parent = parent
	frame.x = target.x
	frame.y = target.y
	frame.size = target.size
	frame.parent = target.parent
	target.destroy()
