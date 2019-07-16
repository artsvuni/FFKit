########### List Title ############
class window.ListTitle extends Layer
	constructor: (@opt = {}) ->
		
		# Component frame from Design Mode
		comp_frame = list_title
		
		@text_frame = comp_frame.selectChild("text").copy()

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
		@text_frame.parent = @

	############## GET, SET ATRIBUTES ###############

	@define "text",
		get: -> @opt.text
		set: (value) ->
			@opt.text = value
			@text_frame.text = value