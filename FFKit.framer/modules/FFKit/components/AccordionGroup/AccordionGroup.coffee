#### How to use ####
# accList = new AccordionGroup
# 	children: [accorionA, accorionB, accorionC] # Add accordions here

########### Accordion group component ############
class window.AccordionGroup extends Layer
	constructor: (@opt = {}) ->
		super _.defaults @opt,
			backgroundColor: null
			children: undefined
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)


		# If array has morre then 2 items
		if @opt.children.length < 2
			@props =
				width: Screen.width, backgroundColor: "rgba(255,0,0,0.7)", html: "<p style='line-height: 1.2; text-align: center; padding: 60px 40px; font-size: 22px'>Please include accrorion items as an array</p>"
			print "Please include accrorion items as an array"
		else
			# Add all children
			addChildren @, @opt.children
			
			# Make a correct Y position
			for child, i in @children
				child.y = 0
				child.y = nextPosY
				nextPosY = child.maxY
				
				# child.expanded = false
				child.onTap ->
					toggleExpand(@, @content.initialHeight)
				# Set tthe flag
				child.on "change:height", =>
					@height = @opt.children[@opt.children.length - 1].maxY

					if @.parent and @.parent.name is "content"
						if @.parent.parent.constructor.name is "ScrollComponent"
							@.parent.parent.updateContent()
			
			# Set new parernt height
			@props =
				width: @opt.children[0].width
				height: @opt.children[@opt.children.length - 1].maxY
	
	# Toogle expand function
	toggleExpand = (layer, distance) ->
		distance = if layer.expanded is false then distance else -distance
		
		for sib in layer.siblings
			if sib.y > layer.y
				sib.animate
					y: sib.y + distance
					options:
						time: 0.2
		
		layer.expanded = !layer.expanded
