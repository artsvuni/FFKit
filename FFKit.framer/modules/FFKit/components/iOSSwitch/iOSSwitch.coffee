# Based on iOSSwitch by Facebook

Events.SwitchValueChange = "switchValueChange"
class window.iOSSwitch extends Layer
	# Frame
	toggle_frame = list_item_toggle.selectChild("toggle")

	constructor: (@opt={}) ->
		@opt = _.defaults {}, @opt,			
			width: toggle_frame.width
			height: toggle_frame.height
			backgroundColor: new Color("transparent")
			isOn: false
		super @opt
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		@base = new Layer
			name: ".base"
			parent: @
			width: @width
			height: @height
			backgroundColor: "#e6e6e6" # Disabled State
			borderRadius: 16

		@base.states.on =
			borderWidth: 0
			backgroundColor: "#222222" # Enabled State

		@base.animationOptions =
			time: 0.6
			curve: Spring(damping: 0.75)

		@thumb = new Layer
			name: ".thumb"
			parent: @
			width: 27, height: 27
			borderRadius: 14.5
			x: 2
			y: 2
			backgroundColor: "white"

		@thumb.states.on =
			x: 23
		@thumb.animationOptions =
			time: 0.6
			curve: Spring(damping: 0.8)

		@thumbFill = new Layer
			name: "thumbFill"
			parent: @thumb
			x: 0.5
			y: 0.5
			width: 27, height: 27
			borderRadius: 14
			backgroundColor: @thumbTintColor
			shadow1:
				y: 3
				blur: 8
				color: "rgba(0,0,0,0.15)"
			# shadow2:
			# 	y: 1
			# 	blur: 1
			# 	color: "rgba(0,0,0,0.16)"
			# shadow3:
			# 	y: 3
			# 	blur: 1
			# 	color: "rgba(0,0,0,0.10)"

		if @isOn
			@base.stateSwitch "on"
			@thumb.stateSwitch "on"



		@onClick ->
			@setOn !@isOn, true


	@define "tintColor",
		get: -> @_tintColor
		set: (value) ->
			@_tintColor = value
			@_updateTintColor()
	@define "thumbTintColor",
		get: -> @_thumbTintColor
		set: (value) ->
			@_thumbTintColor = value
			@_updateThumb()

	@define "isOn",
		get: -> @_isOn
		set: (value) ->
			@_isOn = value

	setOn: (switchOn, animated) ->
		@isOn = switchOn
		animated = animated ? true

		if @isOn
			if animated
				@base.animate "on"
				@thumb.animate "on"
			else
				@base.stateSwitch "on"
				@thumb.stateSwitch "on"
		else
			if animated
				@base.animate "default"
				@thumb.animate "default"
			else
				@base.stateSwitch "default"
				@thumb.stateSwitch "default"

		@emit Events.SwitchValueChange, @isOn


	_updateTintColor: ->
		if @base
#			@base.states.on.shadowColor = @tintColor
#			@base.states.on.shadowColor = @tintColor
			@base.stateSwitch "on" if @isOn

	# _updateThumb: ->
	# 	if @thumbFill then @thumbFill.backgroundColor = @thumbTintColor

	onValueChange: (cb) -> @on(Events.SwitchValueChange, cb)