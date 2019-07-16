############## Usage example ###############
# input = new FFInput
# 	labelText: "First name"
# 	placeholderText: "Placeholder test"
# 	helperText: "This is helper text"
# 	value: "Input value"

############## FF input ###############
class window.FFInput extends Layer
	cmp_frame = ff_input
	initialInputProps = cmp_frame.selectChild("input").props
	initialInputTextProps = cmp_frame.selectChild("placeholder").props
	_iOSDevice = !!navigator.platform.match(/iPhone|iPod|iPad/)
	
	constructor: (@opt={}) ->
		super _.defaults @opt,
			width: cmp_frame.width
			height: cmp_frame.height
			backgroundColor: cmp_frame.backgroundColor
		
		# Label text
		if @opt.labelText
			@labelText = cmp_frame.selectChild("input_label").copy()
			@labelText.props =
				parent: @
				text: @opt.labelText
				autoHeight: true
		
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
			
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @)

		# Input frame
		@input = new Input
			name: "FF input"
			value: @opt.value
			parent: @
			x: initialInputProps.x, y: if @opt.labelText then initialInputProps.y else 0
			width: @width - M_spacer*2, height: initialInputProps.height
			text: @opt.placeholderText
			borderRadius: initialInputProps.borderRadius
			borderWidth: initialInputProps.borderWidth
			borderColor: initialInputProps.borderColor
			color: if @opt.placeholderText then initialInputTextProps.color else "transparent"
			padding:
				left: initialInputTextProps.x

		@input._inputElement.style.fontFamily = initialInputTextProps.fontFamily
		@input._inputElement.style.fontSize = 
			if window.devicePixelRatio is 2 and _iOSDevice is true
				"#{initialInputTextProps.fontSize*2}px"
			else if window.devicePixelRatio is 1
				"#{initialInputTextProps.fontSize*2}px"
			else if window.devicePixelRatio is 3 and _iOSDevice is true
				"#{initialInputTextProps.fontSize*3}px"
			else if Framer.Device.deviceType is "apple-iphone-x-space-gray" or Framer.Device.deviceType is "apple-iphone-x-silver"
				"#{initialInputTextProps.fontSize*3}px"
			else
				"#{initialInputTextProps.fontSize}px"

		@input._inputElement.style.height = (parseInt(@input._inputElement.style.height)-4) + "px"

		# Helper text
		if @opt.helperText
			@helperText = cmp_frame.selectChild("helper_text").copy()
			@helperText.props =
				y: @input.maxY + (cmp_frame.selectChild("helper_text").y - (initialInputProps.y + initialInputProps.height))
				parent: @
				text: @opt.helperText
				autoHeight: true
		
		@height = if @opt.helperText
				@helperText.maxY + (cmp_frame.height - cmp_frame.selectChild("helper_text").maxY)
			else
				cmp_frame.height - cmp_frame.selectChild("helper_text").height
		
	# Methods ()
	focus: =>
		@input.focus()