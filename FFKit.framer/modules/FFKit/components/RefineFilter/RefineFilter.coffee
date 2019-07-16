########### REFINE FILTER ############
class window.RefineFilter extends Layer

	foldedBtnWidth = refine_button.selectChild("refine_button_icon").width + 16	
	spaceBetweenitems = refine_filter.selectChild("refine_filter_item_2").x - refine_filter.selectChild("refine_filter_item").maxX

	constructor: (@opt) ->
		super _.defaults @opt,
			height: refine_filter.height
			width: Screen.width
			backgroundColor: refine_filter.backgroundColor
			itemsArray: ["item #1","long item #2","item #3","item #4", "item #5"]
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)	

		refineAmount = null ? @opt.refineAmount
		@refineBtn = refineBtn = refine_button.copy()
		@refineBtn.props =
			parent: @

		@btnText = @refineBtn.selectChild("refine_button_text")
		@btnText.props = 
			text: switch refineAmount
				when null, undefined
					"Refine" 
				else 
					"Refine (#{refineAmount})"
			autoSize: true
			fontFamily: @btnText.fontFamily
			textAlign: "left"

		updateBtnWidth(@)
		
		# Create scroll component
		@scrollCmp = new ScrollComponent
			parent: @
			x: @refineBtn.maxX + (refine_filter.selectChild("refine_filter_item").x - refine_button.maxX)
			height: @.height
			width: Screen.width - (foldedBtnWidth + 20)
			scrollVertical: false
			scrollHorizontal: false
			# backgroundColor: "rgba(0,0,0,0.2)"
			contentInset:
				right: spaceBetweenitems

		# Create items inside ScrollComponent
		for itemArray, i in @opt.itemsArray
			@item = new Button
				parent: @scrollCmp.content
				name: "#{itemArray}"
				type: "tag"
				text: @opt.itemsArray[i]
				y: refine_filter.selectChild("refine_filter_item").y
				x: currentX
			
			currentX = @item.maxX + spaceBetweenitems
		
		lastArrayChild = @scrollCmp.content.children[@scrollCmp.content.children.length - 1]

		# Check if last item is out of Screen
		if lastArrayChild.maxX > Screen.width
			@scrollCmp.scrollHorizontal = true

		@scrollCmp.x = newX = @refineBtn.maxX + (refine_filter.selectChild("refine_filter_item").x - refine_button.maxX)

		# Animation on scroll
		@scrollCmp.states =
			stateA:
				x: foldedBtnWidth + 20
				width: @scrollCmp.width
			stateB:
				x: newX
			animationOptions:
				time: 0.2
		
		@refineBtn.selectChild("refine_button_text").states =
			stateA:
				opacity: 0
			stateB:
				opacity: 1
			animationOptions:
				time: 0.2
		
		@refineBtn.states =
			stateA:
				width: foldedBtnWidth
			stateB: 
				width: @refineBtn.selectChild("refine_button_text").width + refine_button.selectChild("refine_button_icon").width + (refine_button.width - (refine_button.selectChild("refine_button_icon").width + refine_button.selectChild("refine_button_text").width))
			animationOptions:
				time: 0.2

		@scrollCmp.content.on "change:x", ->
			if @x < -10 and @parent.parent.refineBtn.selectChild("refine_button_text").opacity is 1
				@parent.parent.refineBtn.selectChild("refine_button_text").animate("stateA")
				@parent.parent.refineBtn.animate("stateA")
				@parent.animate("stateA")
			else if @x > -10 and @parent.states.current.name is "stateA"
				@parent.parent.refineBtn.selectChild("refine_button_text").animate("stateB")
				@parent.parent.refineBtn.animate("stateB")
				@parent.animate("stateB")


	################ METHODS () ###############
	# Private method to get a new refine button width
	updateBtnWidth = (parent) ->
		btn = parent.refineBtn
		thisText = btn.selectChild("refine_button_text")
		refText = refine_button.selectChild("refine_button_text")
		refIcon = refine_button.selectChild("refine_button_icon")
		btn.width = thisText.width + refIcon.width + refIcon.x + (refine_button.width - refText.maxX) + (refText.x - refIcon.maxX)

	# Public method to update refine amount 
	selected: (value) ->
		@btnText.text = switch value
			when null, undefined, 0
				"Refine"
			else
				"Refine (#{value})"
		updateBtnWidth(@)
		newWidth = @refineBtn.width
		@scrollCmp.x = newX = @refineBtn.maxX + (refine_filter.selectChild("refine_filter_item").x - refine_button.maxX)

		# Animation on scroll
		@scrollCmp.states =
			stateA:
				x: foldedBtnWidth + 20
				width: @scrollCmp.width
			stateB:
				x: newX
			animationOptions:
				time: 0.2
		
		@refineBtn.selectChild("refine_button_text").states =
			stateA:
				opacity: 0
			stateB:
				opacity: 1
			animationOptions:
				time: 0.2
		
		@refineBtn.states =
			stateA:
				width: foldedBtnWidth
			stateB: 
				width: @refineBtn.selectChild("refine_button_text").width + refine_button.selectChild("refine_button_icon").width + (refine_button.width - (refine_button.selectChild("refine_button_icon").width + refine_button.selectChild("refine_button_text").width))
			animationOptions:
				time: 0.2

		@scrollCmp.content.on "change:x", ->
			if @x < -10 and @parent.parent.refineBtn.selectChild("refine_button_text").opacity is 1
				@parent.parent.refineBtn.selectChild("refine_button_text").animate("stateA")
				@parent.parent.refineBtn.animate("stateA")
				@parent.animate("stateA")
			else if @x > -10 and @parent.states.current.name is "stateA"
				@parent.parent.refineBtn.selectChild("refine_button_text").animate("stateB")
				@parent.parent.refineBtn.animate("stateB")
				@parent.animate("stateB")

