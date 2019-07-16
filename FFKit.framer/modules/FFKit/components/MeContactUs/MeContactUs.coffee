########### ME - SIGN IN ############
class window.MeContactUs extends Layer
	constructor: (@opt = {}) ->
		
		# Component frame from Design Mode
		contactUs_frame = contact_us
		
		@contactUs_frame = contactUs_frame.copy()
		@contactUs_frame.props = 
			x: 0, y: 0
			
		# Initialise the class
		super _.defaults @opt,
			height: contactUs_frame.height
			width: contactUs_frame.width
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		# Staging frames
		@contactUs_frame.parent = @