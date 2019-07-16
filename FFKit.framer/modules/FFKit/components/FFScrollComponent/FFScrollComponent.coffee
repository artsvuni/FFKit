############## STATUS BAR ##############
class window.FFScrollComponent extends ScrollComponent
	constructor: (@opt={}) ->
		super _.defaults @opt,
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)
