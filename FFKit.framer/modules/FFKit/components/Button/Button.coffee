############## BUTTONS ###############
class window.Button extends Layer

	tagButtonIcon = tag_button_icon_layout.selectChild("button_icon")
	buttonIcon = button_icon_layout.selectChild("button_icon")

	constructor: (@opt={}) ->
		# Switch buttons type and properties for them 
		_.defaults @opt,
			switch @opt.type
				when "primary", undefined
					@referenceBtn = primary_button
					text: @referenceBtn.selectChild("button_text").text
					iconInvertValue: 1
				when "secondary"
					@referenceBtn = secondary_button
					text: @referenceBtn.selectChild("button_text").text
				when "tertiary"
					@referenceBtn = tertiary_button
					text: @referenceBtn.selectChild("button_text").text
				when "flat"
					@referenceBtn = flat_button
					text: @referenceBtn.selectChild("button_text").text
				when "tag"
					@referenceBtn = tag_button
					text: @referenceBtn.selectChild("button_text").text
					sidePaddings: S_spacer
					iconMargin: XS_spacer

		# copy all parametrs and reset font-family and font-size to default fonts
		@btnText = @referenceBtn.selectChild("button_text").copy()
		@btnText.props =
			name: "text_btn"
			text: @opt.text
			whiteSpace: "nowrap"

		tagBtnIconRightMargin = tag_button_icon_layout.width - tagButtonIcon.maxX

		# Include other properties
		super _.defaults @opt,
			width: switch
				when @opt.type is "tag" and @opt.icon is undefined
					@btnText.width + @opt.sidePaddings*2
				when @opt.type is "tag" and @opt.icon isnt undefined
					@btnText.width + @opt.sidePaddings + tagBtnIconRightMargin + tagButtonIcon.width + @opt.iconMargin
				else
					@referenceBtn.width
			height: @referenceBtn.height
			backgroundColor: @referenceBtn.backgroundColor
			borderRadius: @referenceBtn.borderRadius
			borderWidth: @referenceBtn.borderWidth
			borderColor: @referenceBtn.borderColor
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		@btnText.parent = @
		@btnText.autoWidth = true

		@btnText.x = switch
			when @opt.type is "tag" and @opt.iconAlign is "left"
				Align.left(tagBtnIconRightMargin + tagButtonIcon.width + @opt.iconMargin)
			when @opt.type is "tag" and @opt.icon isnt undefined 
				Align.left(@opt.sidePaddings)
			else
				Align.center()

		# Create icon	
		if @opt.icon isnt undefined
			@icon = new Layer
				parent: @
				name: "icon_btn"
				width: buttonIcon.width
				height: buttonIcon.height
				y: Align.center()	
				x: switch
					when @opt.type is "tag" and @opt.iconAlign is "left"
						@btnText.x - tagButtonIcon.width - @opt.iconMargin
					when @opt.type is "tag"
						Align.right(-(tag_button_icon_layout.width - tag_button_icon_layout.selectChild("button_icon").maxX))
					when @opt.iconAlign is "left"
						Align.left(@referenceBtn.width - buttonIcon.maxX)
					else
						Align.right(-(@referenceBtn.width - buttonIcon.maxX))
				backgroundColor: "rgba(0,0,0,0.2)"
			@icon.style =
			"filter": "invert(#{@opt.iconInvertValue})"
			if _.isString(@opt.icon)
				@icon.props =
					backgroundColor: null
					# backgroundColor: "rgba(0,0,0,0.2)" # Comented line to see the container
					image: "modules/FFKit/assets/icons/#{@opt.icon}.svg"

		# Watch for width changes and set up new properties for children
		@.on "change:width", ->
			@btnText.x = Align.center()
			if @opt.type is "tag" and @opt.icon isnt undefined
				@btnText.x = Align.center(-tagButtonIcon.width/2)
				@icon.x = @btnText.maxX + @opt.iconMargin
			else if @opt.icon isnt undefined
				@icon.x = switch
					when @opt.iconAlign is "left"
						Align.left(@referenceBtn.width - buttonIcon.maxX)
					else
						Align.right(-(@referenceBtn.width - buttonIcon.maxX))

	@define "text",
		get: -> 
			@btnText.text
		set: (val) ->
			@btnText.text = val
			@btnText.x = Align.center()
			switch
				when @opt.type is "tag" and @icon isnt undefined and @opt.iconAlign is "left"
					@width = @btnText.width + @opt.sidePaddings*2 + buttonIcon.width + @opt.iconMargin
					@btnText.x = Align.center((buttonIcon.width + @opt.iconMargin)/2)
					@icon.x = @btnText.x - buttonIcon.width - @opt.iconMargin
				when @opt.type is "tag" and @icon isnt undefined
					@icon.x = @btnText.maxX + @opt.iconMargin
					@width = @btnText.width + @opt.sidePaddings*2 + buttonIcon.width + @opt.iconMargin
				when @opt.type is "tag" and @opt.icon is undefined
					@width = @btnText.width + @opt.sidePaddings*2
				else
					@btnText.x = Align.center()

