#🚦⚙️  Helper Function - addChildren
# Function helps to add multiple layers to the one parent

window.addChildren = (parent, childrenArray) ->
	for children, i in childrenArray
		children.parent = parent