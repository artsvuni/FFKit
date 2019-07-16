########### Model ###########
# listItem = new ListItem
# 	text: "Hello World"
# 	right: "arrow-right"
# 	flag: "uk"
# 	line: false, "fullwidth"
# 	lineTop: true, "fullwidth"
#	type: "wide"


########### List Item ############
class window.ListItem extends Layer
	constructor: (@opt = {}) ->
		# Component frame from Design Mode
		comp_frame = list_item
		wide_type_frame = wide_list_item

		# Create sublyers
		@text_frame = comp_frame.selectChild("text").copy()
		@text_frame.props =
			autoHeight: true

		@line_frame = comp_frame.selectChild("line").copy()

		@flag_frame = new Layer
		@flag_frame.props = list_item_flag.selectChild("flag").props

		switch 
			# Normal list item with > icon
			when @opt.right isnt "toggle"# and @opt.right isnt false 
				@right_frame = new Layer 
				@right_frame.props = comp_frame.selectChild("icon").props
			# Toggle
			when  @opt.right is "toggle" 
				@right_frame = new iOSSwitch # Using iOSSwitch component
					isOn: true
					x: list_item_toggle.selectChild("toggle").x
					y: list_item_toggle.selectChild("toggle").y

		switch
			# Top line
			when @opt.lineTop isnt undefined
				@lineTop_frame = comp_frame.selectChild("line").copy()
				@lineTop_frame.y = 0

		# Initialise the class
		super _.defaults @opt,
			height: comp_frame.height
			width: comp_frame.width
			backgroundColor: comp_frame.backgroundColor

		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)


		# Staging frames
		# conditional children
		if @opt.line isnt false then @line_frame.parent = @ else @line_frame.destroy()
		if @opt.right isnt undefined and @opt.right isnt false then @right_frame.parent = @ else @right_frame.destroy()
		if @opt.flag isnt undefined then @flag_frame.parent = @ else @flag_frame.destroy()
		if @opt.lineTop isnt undefined then @lineTop_frame.parent = @

		addChildren(@, [@text_frame])

		# if type is "wide" 
		switch @opt.type
			when "wide"
				@height = 77

				@text_frame.props =
					fontFamily: wide_type_frame.selectChild("text").fontFamily
					fontSize: wide_type_frame.selectChild("text").fontSize
					y: wide_type_frame.selectChild("text").y
				
				@line_frame.props =
					y: wide_type_frame.selectChild("line").y
				
				@flag_frame.y = Align.center(-4)
				@right_frame.y = Align.center(-2)
			else
				@height = comp_frame.height


	############## GET, SET ATRIBUTES ###############

	@define "text",
		get: -> @opt.text
		set: (value) ->
			@opt.text = value
			@text_frame.text = value

	@define "line",
		get: -> @opt.line
		set: (value) ->
			if value = "fullwidth"
				@line_frame.x = 0
				@line_frame.width = Screen.width

	@define "lineTop",
		get: -> @opt.lineTop
		set: (value) ->
			if value == "fullwidth"
				@lineTop_frame.x = 0
				@lineTop_frame.width = Screen.width

	@define "right", 
		get: -> @opt.right,
		set: (value) -> 
			@opt.right = value
			@right_frame.image = "modules/FFKit/assets/icons/#{value}.svg"

	@define "flag", 
		get: -> @opt.falg,
		set: (value) -> 
			@opt.flag = value
			@flag_frame.image = "modules/FFKit/assets/flags/#{value}.png"
			@text_frame.x = @flag_frame.maxX + S_spacer