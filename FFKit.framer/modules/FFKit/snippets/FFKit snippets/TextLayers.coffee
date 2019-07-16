plugin.run = (contents, options) ->
	"""
#{contents}

text1 = new FFTextLayer
	textStyle: "XLBold"
	text: "XLarge — 26 Bold"
	y: 100
	x: M_spacer
	
text2 = new FFTextLayer
	textStyle: "LBold"
	text: "Large — 18 Bold"
	y: text1.maxY + M_spacer
	x: M_spacer
	
text3 = new FFTextLayer
	textStyle: "L"
	text: "Large — 18 Book"
	y: text2.maxY + M_spacer
	x: M_spacer

text4 = new FFTextLayer
	textStyle: "MCond"
	text: "Medium — 14 Condenced"
	y: text3.maxY + M_spacer
	x: M_spacer

text5 = new FFTextLayer
	textStyle: "MBold"
	text: "Medium — 15 Bold"
	y: text4.maxY + M_spacer
	x: M_spacer

text6 = new FFTextLayer
	textStyle: "M"
	text: "Medium — 15 Book"
	y: text5.maxY + M_spacer
	x: M_spacer

text7 = new FFTextLayer
	textStyle: "SBold"
	text: "Small — 12 Bold"
	y: text6.maxY + M_spacer
	x: M_spacer


	"""