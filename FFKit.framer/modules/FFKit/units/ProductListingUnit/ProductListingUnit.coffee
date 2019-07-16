############ PROPERTIES ##########
# 	array: [array]
# 	icon: false
# 	border: false
#	description: false

############## LIST PRODUCT CARD ###############
class window.ProductListingUnit extends Layer
	
	constructor: (@opt = {}) ->
		super _.defaults @opt,
			name: "ProductListingUnit"
			width: Screen.width
			array: JSON.parse Utils.domLoadDataSync "modules/FFKit/units/ProductListingUnit/data/products.json"
			backgroundColor: null
			icon: true
			border: true
			description: true

		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

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
				x: columnIndex * tileWidth
				parent: @
				season: @opt.array[i].season
				cover: @opt.array[i].image
				brand: @opt.array[i].brand
				description: if @opt.description then @opt.array[i].shortDescription else false
				borderWidth: if @opt.border then 0.5
				borderColor: if @opt.border then "rgba(0,0,0,0.1)"
			
			@["listcard_#{i+1}"].y = rowIndex * @["listcard_#{i+1}"].maxY
			
			if @opt.icon is false
				@["listcard_#{i+1}"].icon_frame.destroy()
		
		@height = @children[tileCount-1].maxY
				

