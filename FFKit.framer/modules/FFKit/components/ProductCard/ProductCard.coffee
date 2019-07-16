########### REFINE FILTER ############
class window.ProductCard extends Layer
	# References from Ddesign mode
	productCard = swipe_product_card
	brandText = productCard.selectChild("brand")
	descriptionText = productCard.selectChild("short_description")
	priceText = productCard.selectChild("price")
	# Spaces
	BrandDescriptionSpase = descriptionText.y - brandText.maxY
	DescriptionPriceSpase = priceText.y - descriptionText.maxY

	constructor: (@opt = {}) ->
		opt = _.defaults @opt,
			width: productCard.width
			height: productCard.height
			backgroundColor: "white"
			cover: "modules/FFKit/content/default/products/women/01.jpg"
			brandText: brandText.text
			descriptionText: descriptionText.text
			priceText: priceText.text
		super opt
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)
			
		# Cover image
		@prodBackgroud = productCard.selectChild("prod_background").copy()
		@prodBackgroud.props =
			parent: @

		@prodBackgroud.selectChild("image").props =
			style:
				"mix-blend-mode": "multiply"
			image: @opt.cover
		
		# Wishlist icon
		@wishlist = productCard.selectChild("wishlist-ico").copy()
		@wishlist.props =
			parent: @
		
		# Text
		@brand = brandText.copy()
		@brand.props =
			parent: @
			fontFamily: brandText.fontFamily
			fontWeight: brandText.fontWeight
			text: @opt.brandText
			textTransform: "uppercase"
			frame: brandText.frame
		
		@short_description = descriptionText.copy()
		@short_description.props =
			autoHeight: true
			parent: @
			fontSize: descriptionText.fontSize + 1
			fontFamily: descriptionText.fontFamily
			fontWeight: descriptionText.fontWeight
			text: @opt.descriptionText
			y: @brand.maxY + BrandDescriptionSpase
		
		@price = priceText.copy()
		@price.props =
			autoHeight: true
			parent: @
			fontFamily: priceText.fontFamily
			fontWeight: priceText.fontWeight
			text: @opt.priceText
			y: @short_description.maxY + DescriptionPriceSpase

		# Reset font size
		@short_description.fontSize = descriptionText.fontSize

	################ 💾 GETTING AND SETTING CLASS DATA ###############
	@define 'cover', 
		get: -> @opt.cover
		set: (value) ->
			if !!@children.length
				@selectChild("image").image = value

	@define 'brandText', 
		get: -> @opt.brandText
		set: (value) ->
			if !!@children.length
				@opt.brandText = value
				@brand.text = value

	@define 'descriptionText', 
		get: -> @opt.descriptionText
		set: (value) ->
			if !!@children.length
				@opt.descriptionText = value
				@short_description.text = value
				@price.y = @short_description.maxY + DescriptionPriceSpase

	@define 'priceText', 
		get: -> @opt.priceText
		set: (value) ->
			if !!@children.length
				@opt.priceText = value
				@price.text = value