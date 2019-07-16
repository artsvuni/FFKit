class window.FeatureUnit extends Layer
	# Frame from Design Mode
	frame = feature_unit
	ctaFrame = frame.selectChild("cta")
	titleText = frame.selectChild("title")
	descriptionText = frame.selectChild("description")
	ctaButton = frame.selectChild("cta")
	# Spaces
	titleDescriptionSpase = descriptionText.y - titleText.maxY
	descriptionButtonSpase = ctaButton.y - descriptionText.maxY
	ButtonFrameSpase = frame.height - ctaButton.maxY

	constructor: (@opt = {}) ->
		opt = _.defaults @opt,
			width: frame.width
			height: frame.height
			backgroundColor: frame.backgroundColor
			cover: frame.selectChild("image").image
			title: titleText.text
			description: descriptionText.text
			# borderWidth: 1 # Debug frame size
			nopadding: false
		super opt
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		# Cover image
		@prodBackgroud = frame.selectChild("prod_background").copy()
		@prodBackgroud.props =
			parent: @

		@prodBackgroud.selectChild("image").props =
			style:
				"mix-blend-mode": "multiply"
			image: @opt.cover

		# Text
		@titleText = titleText.copy()
		@titleText.props =
			parent: @
			fontFamily: "Polaris"
			fontWeight: 800
			text: @opt.title
			frame: titleText.frame

		@descriptionText = descriptionText.copy()
		@descriptionText.props =
			parent: @
			fontFamily: "Polaris"
			fontWeight: 400
			text: @opt.description
			autoHeight: true
			y: @titleText.maxY + titleDescriptionSpase


		# Create CTA
		@shopNowBtn = new Button
			parent: @
			frame: ctaButton.frame
			x: ctaButton.x, y: @descriptionText.maxY + descriptionButtonSpase
			text: ctaButton.selectChild("button_text").text

		# Update size
		switch @opt.description
			when null, "none", ""
				@descriptionText.destroy()
				@shopNowBtn.y = @titleText.maxY + descriptionButtonSpase
				@height = @shopNowBtn.maxY + ButtonFrameSpase
			else
				@height = @shopNowBtn.maxY + ButtonFrameSpase

		if @opt.nopadding then resizeImage(@prodBackgroud)

	resizeImage = (layer) ->
		layer.selectChild("image").height = layer.height
		layer.selectChild("image").width = layer.width
		layer.selectChild("image").midX = layer.width / 2 # centering
		layer.selectChild("image").y = 0

	############### 💾 GETTING AND SETTING CLASS DATA ###############
	@define 'cover', 
		get: -> @opt.cover
		set: (value) ->
			if !!@children.length
				@selectChild("image").image = value

	@define 'title', 
		get: -> @opt.title
		set: (value) ->
			if !!@children.length
				@titleText.text = value

	@define 'description', 
		get: -> @opt.description
		set: (value) ->
			if !!@children.length
				@descriptionText.text = value
				@shopNowBtn.y = @descriptionText.maxY + descriptionButtonSpase
				@height = @shopNowBtn.maxY + ButtonFrameSpase

	@define 'nopadding', 
		get: -> @opt.nopadding
		set: (value) -> 
			if !!@children.length and value
				resizeImage(@prodBackgroud)