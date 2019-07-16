plugin.run = (contents, options) ->
	"""
#{contents}

# PDP Screen container that can be used by Flow Component
pdpScreen = new Layer
	width: Screen.width
	height: Screen.height # Mind to remove statusbar height later.
	backgroundColor: "purple"

pdpHeader = new Header
	name: "header"
	iconLeft: "big-arrow"
	iconRight: "bag"
	search: true
	backgroundColor: null

# Create default ScrollComponent
pdpScroll = new ScrollComponent
	size: Screen.size
	backgroundColor: "white"
	scrollHorizontal: false
	directionLock: true # avoids scroll when product swiping
	contentInset: 
		bottom: 120
	parent: pdpScreen

pdpHeroUnit = new PDPHeroUnit
	parent: pdpScroll.content

selector = new Selector
	placeholder: "Select sdf your size"
	after: pdpHeroUnit
	
description = new Accordion
	expanded: true
	labelText: "Description"
	content: acc_description_conetent
	after: selector
	
sizeAndFeet = new Accordion
	after: description
	labelText: "Size & Fit"
	content: acc_size_content
	
careContent = new Accordion
	content: acc_care_content
	labelText: "Composition & Care"
	after: sizeAndFeet

accList = new AccordionGroup
	after: selector
	parent: scroll.content
	children: [description, sizeAndFeet, careContent]

contactUs = new MeContactUs
	after: accList
	
recomendedList = new RecommendedListUnit
	parent: scroll.content
	shopAllBtn: false
	after: contactUs
	y: L_spacer

# Update Y pos of components below
accList.on "change:height", ->
	contactUs.y = accList.maxY
	recomendedList.y = contactUs.maxY + L_spacer

pdpScroll.updateContent() # Update scroll
pdpHeroUnit.bringToFront()

addToBag = new ButtonFixed
	text: "Add to bag"
	parent: pdpScreen

	"""
