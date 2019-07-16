########### List Title ############
class window.WishlistUnit extends ScrollComponent
	constructor: (@opt = {}) ->
		super _.defaults @opt,
			width: Screen.width
			height: Screen.height
			scrollHorizontal: false
			array: JSON.parse Utils.domLoadDataSync "modules/FFKit/units/ProductListingUnit/data/products.json"
			icon: true
			border: true
			description: true
		
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
			
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @)
			
		# Initial variables
		columnCount = 2
		tileCount = @opt.array.length
		combinedTileWidth = Screen.width
		tileWidth = combinedTileWidth / columnCount
		
		# Create grid
		for i in [0...tileCount]
			# Ration varibles to make a grid
			columnIndex = i % columnCount
			rowIndex = Math.floor(i / columnCount)
			
			# Create cards
			@["listcard_#{i+1}"] = new ListProductCard
				name: "listcard_#{i+1}"
				icon: "big-cross"
				parent: @content
				x: columnIndex * tileWidth
				season: @opt.array[i].season
				cover: @opt.array[i].image
				brand: @opt.array[i].brand
				description: if @opt.description then @opt.array[i].shortDescription else false
				borderWidth: if @opt.border then 0.5
				borderColor: if @opt.border then "rgba(0,0,0,0.1)"
			
			@["listcard_#{i+1}"].y = rowIndex * @["listcard_#{i+1}"].maxY
			
			# On Tap
			@["listcard_#{i+1}"].icon_frame.onTap ->
				card = @parent
				scrollContent = @parent.parent.children
				
				@parent.animate
					opacity: 0
					options:
						time: 0.2
						
				Utils.delay 0.2, =>
					card.destroy()
					Utils.delay 0.1, =>
						@parent.parent.parent.updateContent()
					
				currentPos = {
					x: card.x
					y: card.y
				}
				
				# If this is not a last card
				if @parent.id isnt scrollContent[scrollContent.length-1].id
					scrollContent[scrollContent.indexOf(@parent)+1].animate
						x: currentPos.x
						y: currentPos.y
						options:
							curve: Spring(damping: 0.9)
							time: 0.4
					
					# Get all elements after current item
					prevItemsArray = scrollContent.slice(scrollContent.indexOf(@parent)+1)
					# Get all elements after first item in prevItemsArray
					nextItemsArray = prevItemsArray.slice(1)
					
					for child, i in nextItemsArray
						child.animate
							x: prevItemsArray[i].x
							y: prevItemsArray[i].y
							options:
								curve: Spring(damping: 0.9)
								time: 0.5
			
			if @opt.icon is false
				listCard.card_frame.destroy()
		
		@updateContent()