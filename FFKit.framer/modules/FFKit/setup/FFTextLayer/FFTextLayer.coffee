# window.FFText =
# 	XLBold: "boldTitle"
# 	L: "largeTitle"
# 	LBold: "title1"
# 	M: "title1"
# 	MCondensed: "title2"
# 	MBold: "title3"
# 	SBold: "headline"
# 	S: "body"
# 	XSBold: "callout"
# 	XS: "subhead"


class window.FFTextLayer extends TextLayer
	constructor: (@opt={}) ->
		@opt = _.defaults {}, @opt,
#			textStyle: Polaris
#			fontSize: 17
#			fontWeight: 400
			color: "#222222"

		# TextLayer ignores any font changes during construction, so delay setting the style until after super
		textStyle = @opt.textStyle
		@opt.textStyle = null

		super @opt
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)


		@textStyle = textStyle

	@define "textStyle",
		get: -> @_textStyle
		set: (value) ->
			@_textStyle = value
			@_updateStyle()

	_updateStyle: ->
		styles =
			XLBold:
				fontSize: 26
#				lineHeight: 32
				fontWeight: 800
				fontFamily: "Polaris"
			L:
				fontSize: 18
#				lineHeight: 28
				fontWeight: 400
				fontFamily: "Polaris"
			LBold:
				fontSize: 18
#				lineHeight: 28
				fontWeight: 800
				fontFamily: "Polaris"
			M:
				fontSize: 15
#				lineHeight: 22
				fontWeight: 400
				fontFamily: "Polaris"
			MCond:
				fontSize: 14
#				lineHeight: 23
				fontWeight: 700
				letterSpacing: 1.6
				fontFamily: "Polaris Condensed"
				textTransform: "uppercase"
			MBold:
				fontSize: 15
#				lineHeight: 22
				fontWeight: 800
				fontFamily: "Polaris"
			SBold:
				fontSize: 12
#				lineHeight: 18
				fontWeight: 800		
				fontFamily: "Polaris"
			S:
				fontSize: 12
#				lineHeight: 18
				fontWeight: 400
				fontFamily: "Polaris"
			XSBold:
				fontSize: 10
#				lineHeight: 16
				fontWeight: 800
				fontFamily: "Polaris"	
			XS:
				fontSize: 10
#				lineHeight: 16
				fontWeight: 400
				fontFamily: "Polaris"

		@props = styles[@textStyle]
