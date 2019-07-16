{paralaxOnScroll} = require('../../helper-functions/private/paralaxOnScroll.coffee')

############## PRODUCT HERO ###############
class window.ProductHero extends Layer
	# Variables from Design Mode
	refFrame = product_hero

	constructor: (@opt = {}) ->
		opt = _.defaults @opt,
			title: refFrame.selectChild("title").text
			subTitle: refFrame.selectChild("sub_title").text
			description: refFrame.selectChild("description").text
			cover: refFrame.selectChild("image").image
			width: refFrame.width, height: refFrame.height
			backgroundColor: "rgba(0,0,0,1)"
			clip: true
			paddingLeft: Screen.width - 40
			paralax: true
		super opt
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		# Create image
		@backgroundImage = refFrame.selectChild("image").copy()
		@backgroundImage.props =
			parent: @
			image: @opt.cover


		# Create fade Frame
		@fadeFrame = fadeFrame = refFrame.selectChild("fade_frame").copy()
		@fadeFrame.props =
			parent: @

		# Create title
		@title = refFrame.selectChild("title").copy()
		@title.props =
			parent: @
			text: @opt.title
			autoHeight: true

		# Create subTitle
		@subTitle = refFrame.selectChild("sub_title").copy()
		@subTitle.props =
			parent: @
			text: @opt.subTitle
			autoHeight: true

		# Create description text
		@description = description = refFrame.selectChild("description").copy()
		@description.props =
			parent: @
			text: @opt.description

		# Create tap area
		@tapArea = new Layer
			parent: @
			backgroundColor: null
			frame: refFrame.selectChild('tap_area').frame

		# Create Product slider
		@productSlider = productSlider = new ProductSlider
			parent: @
			paddingLeft: @opt.paddingLeft
			array: @opt.productsArray
		@productSlider.content.clip = false
		@productSlider.frame = refFrame.selectChild("page").frame
		
		@productSlider.showMoreCard.props =
			backgroundColor: "rgba(0,0,0,0.5)"
			width: @productSlider.showMoreCard.width*2.5
		@productSlider.buttonShowMore.style["filter"] = "invert(1)"

		# Create CTA button
		@ctaButton = new Button
			parent: @
			text: refFrame.selectChild("cta").selectChild("button_text").text
		@ctaButton.frame = refFrame.selectChild("cta").frame

		if @opt.paralax is true
			paralaxOnScroll(@)

		# Fixating variables
		scrollModulateFlag = true
		layerY = @y
		currentDescriptionOpacity = description.opacity

		# Check if parent is ScrollComponent
		if @parent and @parent.name is "content"
			if @parent.parent.constructor.name is "ScrollComponent"
				# Modulate on scroll
				@parent.onMove (event, layer) ->
					# if slider.content.x < 0
					if scrollModulateFlag is true
						currentDescriptionOpacity = description.opacity
						description.opacity = Utils.modulate(
							(layerY - @parent.scrollPoint.y) - (@parent.height/2)
							[0, -@parent.height/6]
							[0, 1]
						)
						fadeFrame.opacity = Utils.modulate(
							(layerY - @parent.scrollPoint.y) - (@parent.height/2)
							[0, -@parent.height/6]
							[0, 1]
						)

		@productSlider.onMove (event, layer) ->
			# Modulate if fadeFrame.opacity more then 0 and productSlider.x more then 0
			if fadeFrame.opacity > 0 and @x < 0
				description.opacity = Utils.modulate(
					@.x
					[0, -@parent.width/4]
					[currentDescriptionOpacity, 0]
				)
			# Switch variable to false if productSlider.x less then 0
			if @x < -40
				scrollModulateFlag = false
			# Switch variable to true if productSlider.x more or equel 0 
			# and less then half of the empty layer in productSlider
			else if @x > -40
				scrollModulateFlag = true
