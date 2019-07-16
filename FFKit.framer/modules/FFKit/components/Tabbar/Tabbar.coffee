########### TAB BAR ############
class window.Tabbar extends Layer

	# Check if iPhoneX mode is on 
	if Framer.Device.deviceType is "apple-iphone-x-space-gray"
		cmp = tab_bar_x
	else
		cmp = tab_bar

	defaultOpacity = cmp.children[2].opacity

	constructor: (@opt = {}) ->

		@tabbar_item = cmp.copy()
		@tabbar_item.props =
			x: 0
			y: 0
		
		super _.defaults @opt,
			height: cmp.height
			width: cmp.width
			y: Align.bottom
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		@tabbar_item.parent = @

		# Interaction
		for child, i in @tabbar_item.children
			child.onTap ->
				for j in @parent.children
					j.opacity = defaultOpacity
				@animate
					opacity: 1
					options:
						curve: "ease-out"
						time: 0.2

	
	@define "activeItem",
		get: -> @opt.activeItem
		set: (value) ->
			for child, i in @tabbar_item.children
				child.opacity = @tabbar_item.children[2].opacity
			@opt.activeItem = value
			@tabbar_item.selectChild(value).opacity = 1