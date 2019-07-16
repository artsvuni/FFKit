############ PROPERTIES ##########
# recomendedList = new RecommendedListUnit
# 	shopAllBtn: false
# 	icon: false
# 	border: false
# 	description: false

############## LIST PRODUCT CARD ###############
class window.RecommendedListUnit extends Layer
	constructor: (@opt = {}) ->
		@unit_frame = recomended_list_unit.copy()
		
		super _.defaults @opt,
			width: @unit_frame.width
			height: @unit_frame.height
			array: JSON.parse Utils.domLoadDataSync "modules/FFKit/units/ProductListingUnit/data/products.json"
			shopAllBtn: true
			icon: false
			border: false
			description: false
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)
								
		limitedArr = @opt.array.slice(0,4)
		
		@unit_frame.parent = @
		@unit_frame.props =
			x: 0, y: 0
		
		@list = new ProductListingUnit
			parent: @unit_frame
			y: @unit_frame.selectChild("cards").y
			icon: @opt.icon
			border: @opt.border
			description: @opt.description
			array: limitedArr
			
		@unit_frame.selectChild("cards").destroy()
		
		if @opt.shopAllBtn is true
			@unit_frame.selectChild("cta").y = @list.maxY + M_spacer
			@height = @unit_frame.height = @unit_frame.selectChild("cta").maxY
		else
			@unit_frame.selectChild("cta").destroy()
			@height = @list.maxY
		

