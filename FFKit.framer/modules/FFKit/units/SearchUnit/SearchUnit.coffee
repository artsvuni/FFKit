############## SEARCH UNIT ###############
class window.SearchUnit extends Layer
	# Initial frame constructor
	constructor: (@opt = {}) ->
		super _.defaults @opt,
			width: Screen.width
			backgroundColor: "#F5F5F5"
			height: switch Framer.Device.deviceType
				when "apple-iphone-x-silver", "apple-iphone-x-space-gray"
					search_frame.height + 44
				else
					search_frame.height + 20
			title: search_frame.selectChild("search_title").text
			designers: "modules/FFKit/content/default/designers.json"
			categories: "modules/FFKit/content/default/categories.json"
			actions: {
				"2682082": -> print "Tap!"
			}
			
		#### MAIN VARS ####
		@search_comp = search_frame
		@header = @search_comp.selectChild("search_header")
		@nothingFound = @search_comp.selectChild("nothing_found")
		@input = @search_comp.selectChild("search_input")
		@leftIcon = @search_comp.selectChild("search_input_l-icon")
		@rightIcon = @search_comp.selectChild("search_input_r-icon")
		@clearBtn = @search_comp.selectChild("clear_btn")
		@closeBtn = @search_comp.selectChild("cross-ico")
		parent = @
		
		#### CREATE SUB ELEMENTS ####
		@bckLayer = new Layer
			name: "back layer"
			parent: @
			width: Screen.width
			height: Screen.height
			backgroundColor: "white"
			opacity: 0
			visible: false
		
		@search_comp.props =
			parent: @
			x: 0, y: Align.bottom()
			backgroundColor: null
		
		# Create HTML input
		@inputWrap = new Layer
			name: "input wrap"
			parent: @input
			y: @search_comp.selectChild("search_placeholder").y
			x: @search_comp.selectChild("search_placeholder").x
			backgroundColor: null
			width: @search_comp.selectChild("search_placeholder").width
			height: @search_comp.selectChild("search_placeholder").height
			html: """<input
				class = 'search-input'
				placeholder = '#{@search_comp.selectChild("search_placeholder").text}'>
			</input>"""
			style:
				"position": "relative"
		
		@inputWrap.placeBehind(@leftIcon)
		
		css = """
		.search-input {
			position: absolute;
			top: 1px;
			width: #{@search_comp.selectChild("search_placeholder").width}px;
			height: #{@search_comp.selectChild("search_placeholder").height}px;
			font-size: 15px;
			line-height: 1.5;
			font-family: "Polaris-Book", "Polaris", sans-serif';
			text-rendering: optimizeLegibility;
			-webkit-font-smoothing: antialiased;
		}
		.search-input::-webkit-input-placeholder {
			color: #{@search_comp.selectChild("search_placeholder").color};
		}
		:focus {
		  outline: none;
		}
		"""
		Utils.insertCSS(css)
		
		# Destroy copy donor
		@search_comp.selectChild("search_placeholder").destroy()
		
		inputFrame = document.body.querySelector('.search-input')
		
		@tabs = new Tabs
			name: "tabs"
			parent: @
			opacity: 0
			visible: false
			y: Align.top(@input.height+50)
		
		@nothingFound.props = 
			parent: @bckLayer
			y: @tabs.maxY+70
		
		@resultsScrollCmp = new ScrollComponent
			parent: @
			name: "scroll"
			y: @tabs.maxY
			width: Screen.width
			height: Screen.height - @tabs.maxY
			scrollHorizontal: false
			visible: false
			contentInset:
				top: 10

		@resultsScrollCmp.content.backgroundColor = null
		
		#### STATES ####
		@states =
			stateA:
				backgroundColor: "white"
			animationOptions:
				time: 0.2
		
		@header.states =
			stateA:
				y: Align.top(-@header.height-40)
			animationOptions:
				time: 0.3
		
		@input.states =
			stateA:
				y: Align.top(16)
				borderWidth: 0
			animationOptions:
				time: 0.2
				
		@bckLayer.states =
			stateA:
				opacity: 1
			animationOptions:
				time: 0.2
		
		@tabs.states =
			stateA:
				opacity: 1
			animationOptions:
				time: 0.2
		
		@search_comp.selectChild("clear_btn").states =
			stateA:
				opacity: 1
			animationOptions:
				time: 0.2
		
		@search_comp.selectChild("search_input_l-icon").states =
			stateA:
				x: -6
			animationOptions:
				time: 0.2
		
		@search_comp.selectChild("search_input_r-icon").states =
			stateA:
				opacity: 0
			animationOptions:
				time: 0.2
		
		# SCRIPTS
		setSecondState = =>
			@bringToFront()
			blockParentScroll(@, true)
			# Animate states
			@animate("stateA")
			@header.animate("stateA")
			@input.animate("stateA")
			@leftIcon.animate("stateA")
			@rightIcon.animate("stateA")
			@bckLayer.animate("stateA")
			# Visability
			@bckLayer.visible = true
			@tabs.visible = true
			@search_comp.selectChild("search-ico").visible = false
			@search_comp.selectChild("cross-ico").visible = true
		
		setDefaultState = =>
			blockParentScroll(@, false)
			# Animate states
			@animate("default")
			@header.animate("default")
			@input.animate("default")
			@leftIcon.animate("default")
			@rightIcon.animate("default")
			@bckLayer.animate("default")
			# Visability
			@bckLayer.visible = false
			@search_comp.selectChild("search-ico").visible = true
			@search_comp.selectChild("cross-ico").visible = false
			@clearBtn.visible = false
			# Tabs
			@tabs.visible = false
			@tabs.stateSwitch("default")
			# Clear input
			inputFrame.value = ""
		
		######## EVENTS ########
		inputFrame.addEventListener("focus", setSecondState)
		inputFrame.oninput = =>
			if inputFrame.value.length > 0
				@search_comp.selectChild("clear_btn").visible = true
				@resultsScrollCmp.visible = true
				@search_comp.selectChild("clear_btn").animate("stateA")
			
				findInGender(@, @tabs.currentItem, inputFrame.value)
				@resultsScrollCmp.updateContent()
			else if inputFrame.value.length is 0
				eraseArray(parent.resultsScrollCmp.content.children)
				@search_comp.selectChild("clear_btn").animate("default")
				@tabs.visible = false
				@tabs.animate("default")

			if @resultsScrollCmp.content.children.length is 0 and inputFrame.value.length > 0
				@resultsScrollCmp.visible = false
				@nothingFound.visible = true
				@nothingFound.template =
					nothing: inputFrame.value
			else if @resultsScrollCmp.content.children.length > 0
				@nothingFound.visible = false
				
		######## ACTIONS ########
		#### Clear button ####
		@clearBtn.onTap =>
			inputFrame.value = ""
			inputFrame.focus()
			eraseArray(@resultsScrollCmp.content.children)
			@search_comp.selectChild("clear_btn").animate("default")
			@search_comp.selectChild("clear_btn").visible = false
			@tabs.visible = false
			@nothingFound.visible = false
			@tabs.stateSwitch("default")
		
		#### Close button ####
		@closeBtn.onTap =>
			@resultsScrollCmp.visible = false
			eraseArray(@resultsScrollCmp.content.children)
			inputFrame.blur()
			setDefaultState()
			@nothingFound.visible = false
		
		#### Tap on Gender selection ####
		for item in @tabs.newItemsArr
			item.onTap =>
				findInGender(@, @tabs.currentItem, inputFrame.value)
	
	############ PRIVATE METHODS () ############
	#### block parent scroll if search comp is active ####
	blockParentScroll = (unit, toggle) ->
		if unit.parent and unit.parent.name is "content"
			if unit.parent.parent.constructor.name is "ScrollComponent"
				if toggle
					unit.parent.parent.scrollVertical = false
					unit.parent.y = 0
				else
					unit.parent.parent.scrollVertical = true

	#### Erase Array method ####
	eraseArray = (array) ->
		for child in array
			child.destroy()
			
	#### Create search list items ####
	createLayers = (parent, name, type, id) =>
		matchedIttem = search_frame.selectChild("search_list_item").copy()
		matchedIttem.selectChild("name_label").props =
			autoHeight: true
			textOverflow: "elepsis"
			whiteSpace: "nowrap"
			overflow: "hidden"
			
		matchedIttem.visible = true
		matchedIttem.selectChild("name_label").template =
			name: name
			type: type

		matchedIttem.props =
			parent: parent.resultsScrollCmp.content
			x: 0, y: 0

		matchedIttem.onTap ->
			if typeof parent.opt.actions["#{id}"] is "function"
				parent.opt.actions["#{id}"]()

	#### Find and compare values in JSONs ####
	findVal = (parent, designersArray, categoriesArray, val) ->
		eraseArray(parent.resultsScrollCmp.content.children)
		
		# Create empty storage for matched items 
		unionMatchedArray = []
		
		# Check Designers array
		for child in designersArray
			if _.includes(child.name, val.toUpperCase()) or _.includes(child.name, val.toLowerCase()) or _.includes(child.name, val)
				unionMatchedArray.push({
					name: child.name
					type: child.type
					id: child.id
				})
				
		# Check Categories array
		for child in categoriesArray
			if _.includes(child.name, val.toUpperCase()) or _.includes(child.name, val.toLowerCase()) or _.includes(child.name, val)
				unionMatchedArray.push({
					name: child.name
					type: child.type
					id: child.id
				})
	 
		# Create layers based on unionMatchedArray
		for child in unionMatchedArray
			createLayers(parent, child.name, child.type, child.id)
			parent.tabs.visible = true
			parent.tabs.animate("stateA")
		
		# Set positioning
		for child in parent.resultsScrollCmp.content.children
			child.y = nextPosY
			nextPosY = child.maxY

	#### Switch gender tabs ####
	findInGender = (parent, tabs, val) ->
		designersArray = JSON.parse Utils.domLoadDataSync (parent.opt.designers)
		categoriesArray = JSON.parse Utils.domLoadDataSync (parent.opt.categories)
		
		switch tabs
			when "women"
				findVal(parent, designersArray.women, categoriesArray.women, val)
			when "men"
				findVal(parent, designersArray.men, categoriesArray.men, val)
			when "kids"
				findVal(parent, designersArray.kids, categoriesArray.kids, val)