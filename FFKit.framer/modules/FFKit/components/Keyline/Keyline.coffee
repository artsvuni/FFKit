class window.Keyline extends Layer
	# References from Ddesign mode
	keyline = key_line

	constructor: (@opt={}) ->
		opt = _.defaults @opt,
			width: keyline.width
			height: keyline.height
			backgroundColor: keyline.backgroundColor
		super opt
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)