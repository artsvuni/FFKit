############## USAGE ##############
# tabs = new Tabs
# 	after: statusBar
# 	items: ["one", "two", "three", "four"]

# tabs.one.onTap ->
# 	print 'sdf'


############## TABS ###############
class window.Tabs extends Layer
	cmp_comp = tabs_frame
	itemsArr = []
	
	for item, i in cmp_comp.selectChild("items").children
		itemsArr.push(item.name)

	constructor: (@opt = {}) ->
		super _.defaults @opt,
			width: Screen.width
			height: cmp_comp.height
			backgroundColor: "white"
			items: itemsArr

		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
			
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @)
		
		# Vars
		childrenLength = @opt.items.length
		btnsArr = []
		@underline = cmp_comp.selectChild("underline").copy()
		parent = @
		
		# Create buttons
		@newItemsArr = []
		
		for item, i in @opt.items
			newItemName = item.split(' ').join('_')
			@["#{newItemName}"] = new Layer
				name: item
				parent: @
				width: cmp_comp.width/@opt.items.length
				backgroundColor: null
				x: newXpos
				height: @height
			
			@["#{newItemName}"]["text"] = new TextLayer
				parent: @["#{newItemName}"]

			@["#{newItemName}"]["text"].props = cmp_comp.selectChild("items").children[0].props
			@["#{newItemName}"]["text"].props = 
				name: "text"
				textTransform: "uppercase"
				text: item
			@["#{newItemName}"]["text"].x = Align.center
			
			newXpos = @["#{newItemName}"].maxX
			
			@newItemsArr.push(@["#{newItemName}"])
			
		# Underline initial state
		@underline.props =
			parent: @
			x: @newItemsArr[0].children[0].x
			width: @newItemsArr[0].children[0].width
		
		@currentItem = @newItemsArr[0].children[0].text

		# create underline animation
		for item, i in @newItemsArr
			@newItemsArr[i].onTap ->
				parent.currentItem = @children[0].text
				parent.underline.animate
					midX: @midX
					width: @children[0].width
					options: 
						curve: Spring(damping: 0.8)
						time: 0.4
