############## HEADER ###############
class window.Header extends Layer
	constructor: (@opt = {}) ->
		# Frame from Design Mode
		frame = header

		# Other frames from Design Mode
		@subTitle_frame = header_extra.selectChild("subtitle").copy()
		@subTitle_frame.autoHeight = true
	
		switch 
			# Normal title
			when @opt.title isnt "logo" and @opt.subTitle is undefined 
				@title_frame = header.selectChild("title").copy()
				@title_frame.autoHeight = true
			# Logo
			when  @opt.title is "logo" 
				@title_frame = header_logo.selectChild("logo").copy()
			# with subTitle
			when @opt.subTitle isnt undefined 
				@title_frame = header_extra.selectChild("title").copy()
				@title_frame.autoHeight = true

		@iconLeft_layer = new Layer 
		@iconLeft_layer.props =  header.selectChild("icn_left").props

		@iconRight_layer = new Layer 
		@iconRight_layer.props =  header.selectChild("icn_right").props

		@linkLeft_frame = header_links.selectChild("left_link").copy()
		@linkLeft_frame.autoHeight = true

		@linkRight_frame = header_links.selectChild("right_link").copy()
		@linkRight_frame.autoHeight = true

		@bag_frame = header_extra.selectChild("bag").copy()

		@search_frame = header.selectChild("icn_search").copy()

		# Initialise the class
		super _.defaults @opt,
			height: frame.height
			width: frame.width
			backgroundColor: frame.backgroundColor
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)
			
		# Staging frames
		if @opt.subTitle isnt undefined then @subTitle_frame.parent = @ else @subTitle_frame.destroy()
		if @opt.title isnt undefined then @title_frame.parent = @ else @title_frame.destroy()
		if @opt.iconLeft isnt undefined then @iconLeft_layer.parent = @ else @iconLeft_layer.destroy()
		if @opt.iconRight isnt undefined then @iconRight_layer.parent = @ else @iconRight_layer.destroy()
		if @opt.linkLeft isnt undefined then @linkLeft_frame.parent = @ else @linkLeft_frame.destroy()
		if @opt.linkRight isnt undefined then @linkRight_frame.parent = @ else @linkRight_frame.destroy()
		if @opt.bag isnt undefined then @bag_frame.parent = @ else @bag_frame.destroy()
		if @opt.search isnt undefined then @search_frame.parent = @ else @search_frame.destroy()

	############## GET, SET ATRIBUTES ###############

	@define "subTitle", 
		get: -> @opt.subTitle,
		set: (value) ->
			@opt.subTitle = value
			@subTitle_frame.text = value

	@define "title", 
		get: -> @opt.title,
		set: (value) ->
			@opt.title = value
			@title_frame.text = value


	@define "iconLeft", 
		get: -> @opt.iconLeft,
		set: (value) -> 
			@opt.iconLeft = value
			@iconLeft_layer.image = "modules/FFKit/assets/icons/#{value}.svg"

	@define "linkLeft", 
		get: -> @opt.linkLeft,
		set: (value) -> 
			@opt.linkLeft = value
			@linkLeft_frame.text = value

	@define "iconRight",
		get: -> @opt.iconRight,
		set: (value) -> 
			@opt.iconRight = value
			@iconRight_layer.image = "modules/FFKit/assets/icons/#{value}.svg"


	@define "linkRight", 
		get: -> @opt.linkRight,
		set: (value) -> 
			@opt.linkRight = value
			@linkRight_frame.text = value

	@define "bag", 
		get: -> @opt.bag,
		set: (value) -> 
			# Hardcoded bag icon with counter
			@opt.bag = value
			@bag_frame.selectChild("bag_number").text = value
			@search_frame.maxX = @bag_frame.x - 18

	@define "search", 
		get: -> @opt.search,
		set: (value) -> 
			# Hardcoded search icon
			# Does not have valued to modify

	@define "nobg", 
		get: -> @opt.nobg,
		set: (value) -> 
			@backgroundColor = "rgba(0,0,0,0.00)"