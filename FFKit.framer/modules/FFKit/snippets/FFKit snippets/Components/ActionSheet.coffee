plugin.run = (contents, options) ->
	"""
#{contents}
# Simple action sheet example
btnA = new Button
	text: "Show action sheet"
	y: 100, x: Align.center

actionSheet = new ActionSheet
	content: my_actionsheet_content
	button:
		text: "Purchase"
		width: 116
		visible: false
	title:
		visible: true
		text: "Hello!"

btnA.onTap ->
	actionSheet.show()
	"""
