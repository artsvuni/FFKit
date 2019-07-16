############## ADD TO BAG BUTTON ###############
class window.ButtonFixed extends Layer
	constructor: (@opt = {}) ->
		cmp_frame = button_fixed

		@fixed_btn = new Button
			name: "button"
			x: Align.center, y: cmp_frame.selectChild("cta").y
			width: cmp_frame.width - L_spacer
			text: cmp_frame.selectChild("button_text").text
		cmp_frame.selectChild("cta").destroy()


		super _.defaults @opt,
			width: cmp_frame.width
			height: if Framer.Device.deviceType is "apple-iphone-x-space-gray" then 90 else cmp_frame.height
			y: Align.bottom()
			image: cmp_frame.image 
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)


		@fixed_btn.parent = @


	############## GET, SET ATRIBUTES ###############

	@define "text",
		get: -> @opt.text
		set: (value) ->
			@opt.text = value
			@fixed_btn.text = value
