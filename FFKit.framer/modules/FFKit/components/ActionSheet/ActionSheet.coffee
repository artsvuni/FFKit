########### Usage example ###########
# btnA = new Button
# 	text: "Show action sheet"
# 	y: 100, x: Align.center

# actionSheet = new ActionSheet
# 	content: my_actionsheet_content
# 	button:
# 		text: "Purchase"
# 		width: 116
# 		visible: false
# 	title:
# 		visible: true
# 		text: "Hello!"

# btnA.onTap ->
# 	actionSheet.show()

########### HomeSearch ############
class window.ActionSheet extends Layer
	cmp_frame = actionsheet_container
	actionSheet_frame = actionsheet_container.selectChild("actionsheet_cmp")
	content_frame = actionsheet_container.selectChild("content")
	additionalHeight = 40
	
	buttonProps =
		text: actionsheet_container.selectChild("cta_text").text
		width: actionsheet_container.selectChild("header_cta").width
		visible: true
	
	titleProps =
		text: actionsheet_container.selectChild("header_title").text
		visible: false

	constructor: (@opt = {}) ->
		super _.defaults @opt,
			width: Screen.width
			height: Screen.height
			visible: false
			content: content_frame
			button: {}
			title: {}
		
		# Replace a 'target' from designe mode.
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)

		# Close on tap area
		@closearea_frame = actionsheet_container.selectChild("close_area").copy()
		@closearea_frame.props =
			parent: @
			x: 0, y: 0
			height: @height, width: @width
	
		# ActionSheet component 
		@actionsheet = actionsheet_container.selectChild("actionsheet_cmp").copy()
		@actionsheet.props =
			parent: @
			x: 0
		
		# Create content target
		@content = @opt.content
		@content.props =
			parent: @actionsheet
			x: 0, y: content_frame.y
		
		@actionsheet.selectChild("content").destroy()
		
		@actionsheet.height = @content.maxY + additionalHeight
		@actionsheet.y = Align.bottom(@actionsheet.height)
		
		# ActionSheet button
		@headerButton = new Button
			name: "CTA button"
			parent: @actionsheet.selectChild("header")
			x: Align.right(-(actionSheet_frame.width - @actionsheet.selectChild("header_cta").maxX)), y: @actionsheet.selectChild("header_cta").y
			width: if @opt.button.width is undefined then buttonProps.width else @opt.button.width
			text: if @opt.button.text is undefined then buttonProps.text else @opt.button.text
			visible: @opt.button.visible
		
		@actionsheet.selectChild("header_cta").destroy()
		
		# ActionSheet title
		@headerTitle = @actionsheet.selectChild("header_title")
		@headerTitle.props =
			visible: if @opt.title.visible is undefined then titleProps.visible else @opt.title.visible
			autoHeight: true
			text: if @opt.title.text is undefined then titleProps.text else @opt.title.text
			
		# States
		@states =
			show:
				opacity: 1
			hide:
				opacity: 0
				options:
					delay: 0.1
			animationOptions:
				time: 0.2
				curve: "ease-out"
		
		@actionsheet.states =
			show:
				y: Align.bottom(additionalHeight)
				options:
					curve: Spring(tension: 380, friction: 30)
			hide:
				y: Align.bottom(@actionsheet.height)
				options: 
					time: 0.1
		
		# Actions
		@closearea_frame.onTap =>
			@actionsheet.animate("hide")
			@animate("hide")
			Utils.delay 0.3, =>
				@visible = false
		
		@actionsheet.selectChild("header_close").onTap =>
			@actionsheet.animate("hide")
			@animate("hide")
			Utils.delay 0.3, =>
				@visible = false
		
		@actionsheet.onTap ->
			return true
		
	# Methods ()	
	show: ->
		@visible = true
		@animate("show")
		@actionsheet.animate("show")