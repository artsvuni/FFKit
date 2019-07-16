############## SELECTOR ###############
class window.Selector extends Layer
	cmp_frame = selector

	constructor: (@opt = {}) ->
		super _.defaults @opt,
			name: "Selector"
			width: cmp_frame.width, height: cmp_frame.height
			backgroundColor: cmp_frame.backgroundColor
			placeholderText: "Placeholder"
			value: false

		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)
						
		if @opt.labelText
			@labelText = cmp_frame.selectChild("selector_label").copy()
			@labelText.props = 
				parent: @
				text: @opt.labelText
				autoHeight: true

		if @opt.helperText
			@helperText = cmp_frame.selectChild("helper_text").copy()
			@helperText.props = 
				parent: @
				text: @opt.helperText
				autoHeight: true

		@selector_frame = cmp_frame.selectChild("input").copy()
		@selector_frame.props = 
			width: @width - M_spacer*2
			parent: @
			y: if @opt.labelText then cmp_frame.selectChild("input").y else 0

		@selectChild("placeholder").autoHeight = true

		@selector_frame.selectChild("dropdawn_btn").x = Align.right(2)

		@selectChild("placeholder").text = @opt.placeholderText

		if @opt.value
			@selectChild("placeholder").props =
				color: "#222222"
				text: @opt.value

		@height = if @opt.helperText then @helperText.maxY + M_spacer else @selector_frame.maxY + M_spacer


	@define "placeholderText",
		get: -> @opt.placeholderText
		set: (value) ->
			@opt.placeholderText = value
			if !!@children.length
				@selectChild("placeholder").text = value
	
	@define "value",
		get: -> @opt.value
		set: (value) ->
			@opt.value = value
			if !!@children.length
				@selectChild("placeholder").props =
					color: "#222222"
					text: value