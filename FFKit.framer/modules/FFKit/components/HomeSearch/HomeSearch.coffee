########### HomeSearch ############
class window.HomeSearch extends Layer
	constructor: (@opt = {}) ->
		
		# Component frame from Design Mode
		comp_frame = home_search
		
		@homeSearch = comp_frame.copy()
		@homeSearch.props = 
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
		@homeSearch.parent = @