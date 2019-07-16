{selectImage} = require('../../helper-functions/private/selectImage.coffee')

############## PRODUCT SLIDER COMPONENT ###############
class window.ProductSlider extends PageComponent
	constructor: (@opt = {}) ->
		super _.defaults @opt,
			width: Screen.width
			height: swipe_product_card.height
			scrollVertical: false
			originX: 0.5
			directionLock: true # avoids swipe when
			array: false
			paddingLeft: false
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		@emptySpace = new Layer
			name: "emptySpace"
			width: @opt.paddingLeft
			backgroundColor: null
		@addPage(@emptySpace)
		
		if @opt.array
			for i in [0...@opt.array.length]
				# Set new prodCard X position
				currentX = @content.children[i].maxX + S_spacer
				# Create card
				@prodCard = new ProductCard
					name: "product card"
					parent: @content
					x: currentX
					brandText: @opt.array[i].brand.name
					descriptionText: @opt.array[i].shortDescription
					priceText: @opt.array[i].price
					cover: if useExternalImages then window.selectImage(@opt.array[i].images) else Utils.randomChoice(womenPoroducts)
				
				# Interaction
				@prodCard.onTap ->
					print "Product tap"
		else
			prodCard = new ProductCard
				parent: @.content
				x: S_spacer + @emptySpace.maxX
	
			# Interaction
			prodCard.onTap ->
				print "Product tap"
		
		# Show More card / button
		@showMoreCard = new Layer
			name: "ShowMoreСard"
			width: 198
			height: @height
			backgroundColor: "white"
	
		@buttonShowMore = new Button
			name: "Show more btn"
			text: "Show more"
			type: "flat"
			icon: "arrow-right"
			iconAlign: "right"
			parent: @showMoreCard
			width: 134
			midX: @showMoreCard.midX
			midY: @showMoreCard.midY
		
		@addPage(@showMoreCard)