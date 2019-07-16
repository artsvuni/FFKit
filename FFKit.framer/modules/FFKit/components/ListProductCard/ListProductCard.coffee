############## LIST PRODUCT CARD ###############
class window.ListProductCard extends Layer
	# Variables
	cmp_frame = list_product_card
	# Spaces
	descriptionPriceSpace = cmp_frame.selectChild("price").y - list_product_card.selectChild("description").maxY
	priceParentSpace = cmp_frame.height - cmp_frame.selectChild("price").maxY
	
	constructor: (@opt = {}) ->
		
		# Cover image
		@cover_frame = cmp_frame.selectChild("image").copy()
		@cover_frame.props =
			autoHeight: true
		
		# Season label
		@season_frame = cmp_frame.selectChild("season").copy()
		@season_frame.props =
			autoHeight: true
		
		# Brand text
		@brand_frame = cmp_frame.selectChild("brand").copy()
		@brand_frame.props =
			# backgroundColor: "rgba(0,0,0,0.2)" # Debug layer
			textTransform: "uppercase"
			fontFamily: "Polaris Condensed, AvenirNextCondensed-Regular"
			autoHeight: true
		newHeight = @brand_frame.height
		
		# Description text
		@description_frame = cmp_frame.selectChild("description").copy()
		@description_frame.props =
			autoHeight: true
			# backgroundColor: "rgba(0,0,0,0.4)" # Debug layer
			y: @brand_frame.maxY
			fontFamily: "Polaris"
		
		# Price text
		@price_frame = cmp_frame.selectChild("price").copy()
		@price_frame.props =
			autoHeight: true
			y: @description_frame.maxY + descriptionPriceSpace
			
		# Top-right icon
		@icon_frame = cmp_frame.selectChild("icon").copy()
		@icon_frame.selectChild("wishlist.svg").destroy()
		@icon_frame.props =
			image: "modules/FFKit/assets/icons/wishlist.svg"
			opacity: 0.3
		# Add animation on tap
		iconChangeState(@icon_frame)
		
		# Store default props for the parent container
		super _.defaults @opt,
			width: cmp_frame.width
			height: cmp_frame.height
			backgroundColor: cmp_frame.backgroundColor
			
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		# Add all children to the parent container
		addChildren(@, [@cover_frame, @season_frame, @brand_frame, @description_frame, @price_frame, @icon_frame])

	################ PRIVATE METHOD () ################
	# State animation for the icon
	iconChangeState = (layer) ->
		layer.onTap ->
			if @opacity < 1
				@animate
					opacity: 1
					options: time: 0.2
			else
				@animate
					opacity: 0.3
					options: time: 0.2

	################ 💾 GETTING AND SETTING CLASS DATA ###############
	@define "cover",
		get: -> @opt.cover
		set: (value) ->
			@opt.cover = value
			@cover_frame.image = value
	
	@define "season",
		get: -> @opt.season
		set: (value) ->
			@opt.season = value
			@season_frame.text = value
	
	@define "brand",
		get: -> @opt.brand
		set: (value) ->
			@opt.brand = value
			@brand_frame.text = value
			# Fix the distance
			@description_frame.y = @brand_frame.maxY
			@price_frame.y = @description_frame.maxY + descriptionPriceSpace
	
	@define "description",
		get: -> @opt.description
		set: (value) ->
			if value is false or ""
				@description_frame.height = 1
				@price_frame.y = @description_frame.maxY + descriptionPriceSpace
			else
				@opt.description = value
				@description_frame.text = value
				# Fix the distance
				@price_frame.y = @description_frame.maxY + descriptionPriceSpace
	
	@define "price",
		get: -> @opt.price
		set: (value) ->
			@opt.price = value
			@price_frame.text = value
	
	@define "icon",
		get: -> @opt.icon
		set: (value) ->
			@opt.icon = "modules/FFKit/assets/icons/#{value}.svg"
			@icon_frame.image = "modules/FFKit/assets/icons/#{value}.svg"
			iconChangeState(@icon_frame)

