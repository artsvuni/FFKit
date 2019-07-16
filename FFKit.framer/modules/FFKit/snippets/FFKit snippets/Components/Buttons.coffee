plugin.run = (contents, options) ->
	"""
#{contents}

##### Different examples of buttons #####

btn = new Button
	type: "primary"
	text: "Hello!"
	x: Align.center()
	y: 100

btn2 = new Button
	type: "secondary"
	text: "Yo!"
	icon: "arrow-right"
	x: Align.center()
	y: btn.maxY + M_spacer # Variables

btn3 = new Button
	type: "tag"
	text: "This is awesome"
	x: Align.center()
	y: btn2.maxY + M_spacer

btn4 = new Button
	type: "tag"
	text: "This is awesome"
	icon: "cross"
	iconAlign: "left"
	x: Align.center()
	y: btn3.maxY + M_spacer
	
btn5 = new Button
	type: "primary"
	text: "Hello!"
	x: Align.center()
	icon: "arrow-left"
	iconAlign: "left"
	y: btn4.maxY + M_spacer

btn6 = new Button
	type: "tag"
	text: "This is awesome"
	icon: "cross"
	x: Align.center()
	sidePaddings: 12
	y: btn5.maxY + M_spacer

btn7 = new Button
	type: "tertiary"
	text: "This is awesome"
	x: Align.center()
	y: btn6.maxY + M_spacer

	"""