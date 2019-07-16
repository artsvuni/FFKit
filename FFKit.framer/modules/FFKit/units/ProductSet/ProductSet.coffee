{paralaxOnScroll} = require('../../helper-functions/private/paralaxOnScroll.coffee')

############## PRODUCT SET ###############
class window.ProductSet extends Layer
	# Frame from Design Mode
	frame = product_set

	constructor: (@opt = {}) ->
		# Cloning layers from 'Design mode'
		@unit = frame.copy()
		@unit.props = # cloned unit settings
			x:0, y:0

		super _.defaults @opt,
			paralax: true
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		@height = frame.height
		@width = frame.width
		@unit.parent = @
		@unit.selectChild("page").backgroundColor = null
		@unit.selectChild('title').autoHeight = true
		@unit.selectChild("sub_title").autoHeight = true

		# Create CTA
		@shopNowBtn = new Button
			parent: @
			frame: @unit.selectChild("cta").frame
			x: @unit.selectChild("cta").x, y:@unit.selectChild("cta").y
			text: @unit.selectChild("cta").selectChild("button_text").text

		@unit.selectChild("cta").destroy() # remove layer


		# Enable paralax
		if @opt.paralax is true
			paralaxOnScroll(@)

		# Generate Product Slider
		productSlider = new ProductSlider
			parent: @unit.selectChild("page")
			array: @opt.productsArray

	############### 💾 GETTING AND SETTING CLASS DATA ###############
			
	@define 'title', 
		get: -> @opt.title,
		set: (value) -> 
			@unit.selectChild('title').autoHeight = true
			@unit.selectChild("title").text = value # update the value
		
	@define 'subTitle', 
		get: -> @opt.subTitle,
		set: (value) ->
			@unit.selectChild('title').autoHeight = true
			@unit.selectChild("sub_title").text = value # update the value
			@unit.selectChild('sub_title').y = @unit.selectChild('title').maxY + 10

	@define 'cover', 
		get: -> @opt.cover,
		set: (value) -> 
			@unit.selectChild("image").image = value # update the value

	# TO-DO latest verssion of UI does not use this. Remove on some point from here and Design mode.
	@define 'description', 
		get: -> @opt.description,
		set: (value) -> 
			@unit.selectChild("description").text = value # update the value
# 			# Aligning the arrow
# 			unit.selectChild('arrow').y = unit.selectChild('description').y + 8