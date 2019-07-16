########### ME - SIGN IN ############
class window.MeSignIn extends Layer
	constructor: (@opt = {}) ->
		
		# Component frame from Design Mode
		comp_frame = me_sign_in
		
		@meSignIn_frame = comp_frame.copy()
		@meSignIn_frame.props = 
			x: 0, y: 0
			
		# Initialise the class
		super _.defaults @opt,
			height: comp_frame.height
			width: comp_frame.width
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)
			
		# Staging frames
		@meSignIn_frame.parent = @