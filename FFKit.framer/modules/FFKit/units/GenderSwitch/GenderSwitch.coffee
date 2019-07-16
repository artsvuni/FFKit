class window.GenderSwitch extends Layer
	constructor: (@opt = {}) ->
		# Main frame from Design mode
		cmp_frame = gender_switch

		# CTA
		@cta = cmp_frame.selectChild("cta").copy()
		
		# Gradient
		@gradient_ = cmp_frame.selectChild("shape").copy()
		
		# Banner
		@banner_ = cmp_frame.selectChild("banner").copy()

		super _.defaults @opt,
			size: cmp_frame.size
			backgroundColor: cmp_frame.backgroundColor
		
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		@banner_.parent = @
		@gradient_.parent = @
		@cta.parent = @



	@define "text",
		get: -> @opt.text
		set: (value) ->
			@opt.text = value
			@cta.selectChild("button_text").text = value

	@define "type",
		get: -> @opt.type
		set: (value) ->
			@opt.type = value
			if @opt.type is "women"
				@banner_.image = $+"default/genderSwitch-00.jpg"
			
			if @opt.type is "men"
				@banner_.image = $+"default/genderSwitch-01.jpg"

	@define "banner",
		get: -> @opt.banner
		set: (value) ->
			@opt.banner = value
			@banner_.image = value

	@define "gradient",
		get: -> @opt.gradient
		set: (value) ->
			@opt.gradient = value
			if @opt.gradient is yes
				@gradient_.visible = true
			
			if @opt.gradient is no
				@gradient_.visible = false