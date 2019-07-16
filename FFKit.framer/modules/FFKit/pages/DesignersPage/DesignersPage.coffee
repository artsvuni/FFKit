############## Categories Page ###############
class window.DesignersPage extends Layer
#### Initial frame constructor ####
	constructor: (@opt = {}) ->
		super _.defaults @opt,
			width: Screen.width
			height: Screen.height
			backgroundColor: "white"
			content: "modules/FFKit/content/default/designers.json"
			actions: {
				"2682082": -> print "Tap!"
				"185663": -> print "And another tap!"
			}
		
		contentArr = JSON.parse Utils.domLoadDataSync @opt.content
		unionArr = contentArr.women.concat(contentArr.men, contentArr.kids)
		
		###### Create letters array #######
		lettersArr = []
		for child in unionArr
			if isNaN child.name.charAt(0)
				lettersArr.push child.name.charAt(0)
		
		lettersArr.sort (a, b) ->
			a > b
			
		lettersArr.shift()
		lettersArr.push("#")
		lettersArr = _.uniq lettersArr

		###### crreate layers ######
		@header = new Header
			parent: @
			y: switch Framer.Device.deviceType
				when "apple-iphone-x-space-gray", "apple-iphone-x-silver" then 44 
				else 20
			name: "categories header"
			title: "Designers"
			iconLeft: "big-arrow"
		
		@refineWrap = new Layer
			parent: @
			name: "refine wrap"
			width: @width
			height: refine_filter.height
			y: @header.maxY
			backgroundColor: "white"
		
		@refineBtn = refine_filter.selectChild("refine_button").copy()
		@refineBtn.props = 
			parent: @refineWrap
			y: Align.center()
			x: M_spacer
		
		@refineBtn.selectChild("refine_button_text").width = @refineBtn.selectChild("refine_button_text").width + 2
		
		@scrollCmp = new ScrollComponent
			parent: @
			name: "scroll comp"
			width: @width
			height: @height - @header.maxY
			y: @header.maxY
			scrollHorizontal: false
			contentInset:
				top: @refineWrap.height + XS_spacer
		
		@.on "change:frame", =>
			@scrollCmp.contentInset =
				top: @refineWrap.height + XS_spacer
			
			@scrollCmp.scrollPoint =
				y: @searchInput.height
					
		@searchInput = new SearchInput
			name: "search input"
			parent: @scrollCmp.content
			width: Screen.width - M_spacer
			y: XS_spacer
			x: Align.center()
			placeholder: "Search for a designer"
		
		@scrollCmp.scrollPoint =
			y: @searchInput.height
			
		@refineWrap.bringToFront()
		
		sectionsArr = []
		
		for item, i in lettersArr
			@["#{item}Header"] = new Layer
				parent: @scrollCmp.content
				name: "#{item}Header"
				width: @width
				height: 64
				backgroundColor: "white"
				
			@["#{item}Section"] = new Layer
				name: "#{item}Section"
				parent: @scrollCmp.content
				width: @width
			
			sectionsArr.push(@["#{item}Section"])
			
			headerLetter = new TextLayer
				x: M_spacer, y: M_spacer
				parent: @["#{item}Header"]
				text: item
				textTransform: "uppercase"
				fontFamily: "Polaris-Bold"
				color: "#222222"
				fontSize: 18
		
		itemsArray = []
		
		for child, i in unionArr
			for i in lettersArr
				if i is child.name.charAt(0)
					@["#{child.id}"] = new ListItem
						name: "#{child.id}"
						parent: @["#{i}Section"]
						text: child.name
					
					itemsArray.push(@["#{child.id}"])
											
			if !isNaN child.name.charAt(0)
				@["#{child.id}"] = new ListItem
					name: "#{child.id}"
					parent: @["#Section"]
					text: child.name
				
				itemsArray.push(@["#{child.id}"])
			
		actionsArr = @opt.actions
		for child, i in itemsArray
			child.onTap ->
				console.log(@name)
				if typeof actionsArr["#{@name}"] is "function"
					actionsArr["#{@name}"]()
		
		for item, i in sectionsArr
			newPos = 0
			for i, j in item.children
				i.y = newPos
				newPos = i.maxY
				
			item.height = item.children.slice(-1)[0].maxY
		
		sectionsArr = unionArr = []
		
		for item, i in @scrollCmp.content.children
			item.y = newYpos
			newYpos = item.maxY
		
		@sideAlphabet = new TextLayer
			name: "sideAlphabet"
			parent: @
			x: Align.right()
			y: Align.center()
			textAlign: "center"
			text: "#{lettersArr.join(" ")}"
			fontSize: 12
			width: 12
			textTransform: "uppercase"
		
		#### Refine Page ####
		@refinePage = new Layer
			parent: @
			width: @width
			height: @height
			backgroundColor: "white"
		
		@refinePage.y = Align.bottom(@refinePage.height)
		
		@refinePage.states =
			stateA:
				y: 0
			animationOptions:
				time: 0.4
				curve: Spring(damping: 0.9)
		
		@refinePageHeader = new Header
			parent: @refinePage
			iconLeft: "big-cross"
			title: "Refine"
			y: switch Framer.Device.deviceType
				when "apple-iphone-x-space-gray", "apple-iphone-x-silver" then 44 
				else 20
		
		@refineScroll = new ScrollComponent
			parent: @refinePage
			scrollHorizontal: false
			width: @width
			height: @height - (@refinePageHeader.maxY + S_spacer)
			y: @refinePageHeader.maxY + S_spacer
		
		@genderTitle = new ListTitle
			parent: @refineScroll.content
			text: "Gender"
		
		@genderRadioSelect = new ListRadioSelect
			y: @genderTitle.maxY
			parent: @refineScroll.content
			selectArray: [
				{text : "Women", on: true}, 
				{text : "Men"}
				{text: "Kids"}
			]
		
		@filterByTtitle = new ListTitle
			parent: @refineScroll.content
			text: "Filter By"
			y: @genderRadioSelect.maxY + M_spacer
		
		@filterItemA = new ListItem
			parent: @refineScroll.content
			y: @filterByTtitle.maxY
			right: "small-tick"
			text: "Current season"
		
		@filterItemB = new ListItem
			parent: @refineScroll.content
			y: @filterItemA.maxY
			text: "Sale only"
		
		@filterItemC = new ListItem
			parent: @refineScroll.content
			y: @filterItemB.maxY
			text: "Favourite designers"	
		
		@fixedBtn = new ButtonFixed
			parent: @refinePage
			text: "Show designers"
		
		@fixedBtn.fixed_btn.width = 220
		@fixedBtn.fixed_btn.x = Align.center()
		
		# Actions
		@refineBtn.onTap =>
			@refinePage.animate("stateA")
		
		@refinePageHeader.iconLeft_layer.onTap =>
			@refinePage.animate("default")