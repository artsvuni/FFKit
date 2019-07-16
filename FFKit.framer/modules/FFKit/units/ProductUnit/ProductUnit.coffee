############## PRODUCT UNIT ##############
class window.ProductUnit extends Layer
	# Frame from Design Mode
	frame = product_unit
	
	constructor: (@opt = {}) ->
		# Cloning layers from 'Design mode'
		@unit = frame.copy()
		@unit.props = # cloned unit settings
			x:0, y:0

		# Initialise the Unit
		super @opt 
		@height = frame.height
		@width = frame.width
		@unit.parent = @
		@unit.selectChild("page").backgroundColor = null
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		# Generate Product Slider
		productSlider = new ProductSlider
			parent: @unit.selectChild("page")
			array: @opt.productsArray

		# Frame in Design Mode
		cta_frame = @unit.selectChild("cta")

		# Create CTA
		@cta = new Button
			x: cta_frame.x, y: cta_frame.y, parent: cta_frame.parent, # copy frame props
			text: "Shop now"
		#	name: "cta"
		cta_frame.destroy() # remove layer


	############### 💾 GETTING AND SETTING CLASS DATA ###############
			
	@define 'title', 
		get: -> @opt.title,
		set: (value) -> 
			@unit.selectChild("title").text = value # update the value
			@unit.selectChild('title').autoHeight = true # layout / positioning
		
	@define 'description', 
		get: -> @opt.description,
		set: (value) -> 
			@unit.selectChild("description").text = value # update the value

			# layout / positioning
			@unit.selectChild('description').autoHeight = true 
			@unit.selectChild('description').y = @unit.selectChild('title').maxY + 10
			@unit.selectChild('page').y = @unit.selectChild('description').maxY + 25
