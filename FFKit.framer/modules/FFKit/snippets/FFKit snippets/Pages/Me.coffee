plugin.run = (contents, options) ->
	"""
#{contents}

# Me Screen container that can be used by Flow Component
meScreen = new Layer
	width: Screen.width
	height: Screen.height  # Mind to remove statusbar & tabbar height later.
	backgroundColor: "green"

meHeader = new Header
	parent: meScreen
	title: "Me"
	iconRight: "bag"
	search: true

# ScrollComponent
meScroll = new ScrollComponent
	parent: meScreen
	y: meHeader.maxY
	height: meScreen.height - meHeader.height
	width: Screen.width
	backgroundColor: "#ffffff"
	scrollHorizontal: false
meScroll.content.backgroundColor = "#ffffff"

signIn = new MeSignIn
	parent: meScroll.content

myLocation = new ListTitle
	text: "My Location"
	after: signIn
	y: M_spacer

country = new ListItem
	text: "United Kingdom (GBP)"
	left: "arrow-right"
	flag: "uk"
	after: myLocation

countryComment = new FFTextLayer
	text: "Your chosen location defines your language and shopping currency."
	textStyle: "S"
	after: country
	y: S_spacer
	x: M_spacer
	width: Screen.width - M_spacer - M_spacer
	
myLang = new ListTitle
	text: "My Language"
	after: countryComment
	y: M_spacer

lang = new ListItem
	text: "English (UK)"
	left: "arrow-right"
	after: myLang

myShopPref = new ListTitle
	text: "My Shop Preference"
	after: lang
	y: M_spacer

shopPref = new ListRadioSelect
	selectArray: [
		{text : "Women", on : true}, 
		{text : "Men"}
		]
	after: myShopPref
	
shopPrefComment = new FFTextLayer
	text: "This will tailor your app experience, showing you the type of products most suited to you."
	textStyle: "S"
	after: shopPref
	x: M_spacer
	y: S_spacer
	width: Screen.width - M_spacer - M_spacer

mySettings = new ListTitle
	text: "My Settings"
	after: shopPrefComment
	y: M_spacer

pushNotifications = new ListItem
	text: "Push Notifications"
	left: "arrow-right"
	after: mySettings

locationServices = new ListItem
	text: "Location Services"
	left: "arrow-right"
	after: pushNotifications

touchId = new ListItem
	text: "Apple Touch ID"
	left: "toggle"
	after: locationServices

support = new ListTitle
	text: "Support"
	after: touchId
	y: M_spacer

about = new ListItem
	text: "About Farfetch"
	left: "arrow-right"
	after: support

terms = new ListItem
	text: "Terms & Conditions"
	left: "arrow-right"
	after: about

privacy = new ListItem
	text: "Privacy policy"
	left: "arrow-right"
	after: terms

faq = new ListItem
	text: "FAQ & Guides"
	left: "arrow-right"
	after: privacy

partners = new ListItem
	text: "Boutique partners"
	left: "arrow-right"
	after: faq

contact_us = new MeContactUs
	after: partners
	y: M_spacer
	backgroundColor: "#ffffff"
	height: 300

meScroll.updateContent() # Update scroll

	"""
