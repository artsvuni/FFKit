#### How to use ####
# accorionA = new Accordion
# 	labelText: "Your text"
#	expanded: true
# 	content: acc_cont_01 #Target frame in Design mode. Work with any layers

########### Accordion component ############
class window.Accordion extends Layer
	comp_frame = accordion_comp
	comp_frame_item = comp_frame.selectChild("accordion_item")

	constructor: (@opt = {}) ->
		super _.defaults @opt,
			width: comp_frame.width
			height: comp_frame_item.height
			backgroundColor: "white"
			labelText: "label"
			content: comp_frame.selectChild("accordion_content")
			expanded: false
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		@item = comp_frame_item.copy()
		@item.selectChild("label_text").text = @opt.labelText
		@item.selectChild("label_text").autoHeight = true
		@itemIcon = @item.selectChild("icon")

		@content = @opt.content.copy()
		@content.initialHeight = @content.height
		@content.props = 
			x: 0, y: @item.maxY
			clip: true

		# Reset
		if @opt.expanded is false
			@itemIcon.rotation = 0
			@content.height = 0
		else
			@height = @.height + @content.height
		
		addChildren(@, [@item, @content])
	
		# Interaction
		@item.onTap =>
			if @itemIcon.rotation is 0
				@itemIcon.animate
					rotation: 180
					options:
						time: 0.2
				@content.animate
					height: @content.initialHeight
					options:
						time: 0.2
				@animate
					height: @height + @content.initialHeight
					options:
						time: 0.2
			else
				@itemIcon.animate
					rotation: 0
					options:
						time: 0.2
				@content.animate
					height: 0
					options:
						time: 0.2
				@animate
					height: comp_frame_item.height
					options:
						time: 0.2

	@define "expanded",
		get: -> @opt.expanded
		set: (value) ->
			@opt.expanded = value