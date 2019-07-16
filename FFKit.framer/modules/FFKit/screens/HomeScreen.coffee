#🚦⚙️ 🎢 🎠 Home Feed — Scroll & Paralax

# Default mode with all and empty also add and delete props as methods

# exports.paralaxHomeFeed = () ->
# 	# Делаем хоум пэйдж как компонент или секцию / раздел возможно отделить в отдельную папку
	
# 	# # 🎢 🖼 Wraping Home Feed Frame with a ScrollComponent
# 	scroll = ScrollComponent.wrap(homeFeedFrame)
	
# 	scroll.props =
# 		scrollHorizontal: false
# 		directionLock: true # avoids scroll when product swiping
# 	scroll.updateContent() # updates scroll's height
	
	
# 	# 🎠 Unit Backgound Image Paralax on Scroll 
# 	scroll.on Events.Move, (event, layer) ->
# 		for layer in paralaxedLayers # Apply paralax to units in the array 
# 			y = homeFeedFrame.y + layer.y
# 			layer.selectChild('image').y = Utils.modulate(
# 				y, 		   # A variable, representing the input.
# 				[0, -360], # The range, representing when to module...
# 				[0, 100]   # How much to modulate.
# 			)