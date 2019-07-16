############## Categories Page ###############
class window.CategoriesPage extends Layer
	# Initial frame constructor
	constructor: (@opt = {}) ->
		super _.defaults @opt,
			width: Screen.width
			height: Screen.height
			backgroundColor: "white"
			content: "modules/FFKit/content/default/categories.json"
			actions: {
				"item1": -> print "Tap!"
			}
		
		@header = new Header
			parent: @
			y: switch Framer.Device.deviceType
				when "apple-iphone-x-space-gray", "apple-iphone-x-silver" then 44 
				else 20
			name: "categories header"
			title: "Categories"
			iconLeft: "big-arrow"

		@tabs = new Tabs
			name: "tabs"
			parent: @
			y: @header.maxY + S_spacer
		
		@categoriesList = new ScrollComponent
			name: "categories list"
			parent: @
			y: @tabs.maxY + S_spacer
			scrollHorizontal: false
			width: Screen.width
			height: Screen.height - @tabs.maxY - S_spacer
		
		newContentArr = JSON.parse Utils.domLoadDataSync (@opt.content)

		showItems(@, newContentArr.women)
		
		#### Tap on Gender selection ####
		for item in @tabs.newItemsArr
			item.onTap =>
				for child in @categoriesList.content.children
					child.destroy()
				
				switch @tabs.currentItem
					when "women"
						showItems(@, newContentArr.women)
					when "men"
						showItems(@, newContentArr.men)
					when "kids"
						showItems(@, newContentArr.kids)
		
	#### Methods ####	
	showItems = (parent, contentArr) ->
		for child in contentArr
			parent.categoriesList.content["#{child.id}"] = new ListItem
				name: child.id
				parent: parent.categoriesList.content
				text: child.name
				right: "arrow-right"
			
			parent.categoriesList.content["#{child.id}"].y = nextPosY
			nextPosY = parent.categoriesList.content["#{child.id}"].maxY
				
			parent.categoriesList.content["#{child.id}"].onTap ->
				if typeof parent.opt.actions["#{@name}"] is "function"
					parent.opt.actions["#{@name}"]()