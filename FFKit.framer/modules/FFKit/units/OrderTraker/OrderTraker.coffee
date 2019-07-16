########### List Title ############
class window.OrderTraker extends Layer
	constructor: (@opt = {}) ->
		
		# Component frame from Design Mode
		comp_frame = order_traker

		############### SINGLE UNIT ###############
		if @opt.sliderArray is undefined
			
			# Copying sub frames
			@card_frame = comp_frame.selectChild("order_traker_card").copy()
			
			@progress_frame = @card_frame.selectChild("progress")
			@progress_frame.width = 0 #default status
		
		############### MULTIPLE UNITS ###############
		else
			# Slider
			@slider_frame = new PageComponent
				width: Screen.width, height: comp_frame.height
				scrollVertical: false
				originX : 0.5
				directionLock: true # avoids swipe when
				contentInset: 
					left: 12
					right: 12
			
			@slides = []  # storage
			cardWidth = 298

			for i in [0...@opt.sliderArray.length]
				
				@slide = comp_frame.selectChild("order_traker_card").copy()
				@slide.width = cardWidth
				@slide.selectChild("progress_bg").width = cardWidth

				# If progStart is not defined
				if @opt.sliderArray[i].progStart is undefined then @opt.sliderArray[i].progStart = 0
				# Set the 'progressbar' to requered default width
				startWidth = (@opt.sliderArray[i].progStart * cardWidth)/100 # calculating percentage
				@slide.selectChild("progress").width = startWidth #default status

				# Set new prodCard X position
				currentX = (cardWidth + 12)*i
				
				@slide.props =
					y: 12
					x: currentX
					parent: @slider_frame.content
				
				# Add the card to Page Component
				@slides.push(@slide) # store




		# Initialise the class
		super _.defaults @opt,
			height: comp_frame.height
			width: comp_frame.width
			backgroundColor: comp_frame.backgroundColor
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)


		############### SINGLE UNIT ###############
		if @opt.sliderArray is undefined			
		# Staging sub frames
			addChildren(@, [@card_frame])
		

		############### MULTIPLE UNITS ###############
		else 
			addChildren(@, [@slider_frame])

			############### Animate first slider on load
			current = @slider_frame.horizontalPageIndex(@slider_frame.currentPage)

			startWidth = (@progStartValues[current] * cardWidth)/100 # calculating percentage			
			@slides[current].selectChild("progress").width = startWidth # Set start width

			value = @opt.sliderArray[current].progress
			@slides[current].selectChild("progress").animate 
				width: (value * @slides[current].selectChild("progress_bg").width)/100
				options:
					curve: Spring(damping: 0.5)
					time: 0.5
					delay: 0.4
			# Prevent from 're-anymating'
			@progStartValues[current] = @opt.sliderArray[current].progress

			############### Interactions: Animate other cards
			@slider_frame.on "change:currentPage", (event, layer) =>
				# Select current
				current = layer.horizontalPageIndex(layer.currentPage)

				# Current slide — @slides[current]
				# Current progress Value — @progValues[current]
				# Current progStart Value — @progStartValues[current]

				# Set progStart
				startWidth = (@progStartValues[current] * cardWidth)/100 # calculating percentage			
				@slides[current].selectChild("progress").width = startWidth # Set start width

				# Animate to Progress
				newWidth = (@progValues[current] * @slides[current].selectChild("progress_bg").width)/100
				@slides[current].selectChild("progress").animate 
					width: newWidth
					options:
						curve: Spring(damping: 0.5)
						time: 0.5
						delay: 0.4
				
				# Prevent from 're-anymating'
				@progStartValues[current] = @progValues[current]




	############## GET, SET ATRIBUTES ###############

	@define "title",
		get: -> @opt.title
		set: (value) ->
			if @opt.sliderArray is undefined
				@opt.title = value
				@card_frame.selectChild("title").text = value

	@define "subTitle",
		get: -> @opt.subTitle
		set: (value) ->
			if @opt.sliderArray is undefined
				@opt.subTitle = value
				@card_frame.selectChild("sub_title").text = value

	@define "image",
		get: -> @opt.image
		set: (value) ->
			if @opt.sliderArray is undefined
				@opt.image = value
				@card_frame.selectChild("image").image = value
				@card_frame.selectChild("image").style = "mix-blend-mode": "multiply"

	@define "progStart",
		get: -> @opt.progStart
		set: (value) ->
			if @opt.sliderArray is undefined
				@opt.progStart = value # this will be used in  'progress'

	@define "progress",
		get: -> @opt.progress
		set: (value) ->
			if @opt.sliderArray is undefined
				@opt.progress = value

				# Default progStart value
				if @opt.progStart is undefined
					@progress_frame.width = 0
				# User defined progStart value
				else 
					progStartValue = (@opt.progStart * @card_frame.width)/100 # calculating percentage
					@progress_frame.width = progStartValue

				# Animating the progress
				@progress_frame.animate
					width: (value * @card_frame.width)/100 # calculating percentage of
					options:
						curve: Spring(damping: 0.5)
						time: 0.5
						delay: 0.4

	# Slider data from the Array
	@define 'sliderArray', 
		get: -> @opt.sliderArray,
		set: (value) -> 
			if @opt.sliderArray isnt undefined
				@opt.sliderArray = value

				@progValues = [] #storage for values 
				@progStartValues = []

				for i in [0...value.length] # run loop as many times as there are entires
					unit = @slides[i] # select
					
					unit.selectChild("title").text = value[i].title
					unit.selectChild("sub_title").text = value[i].subTitle
					unit.selectChild("image").image = value[i].image
					unit.selectChild("image").style = "mix-blend-mode": "multiply"

					# Add the card to Page Component
					@progValues.push(value[i].progress) # store
					if value[i].progStart is undefined then value[i].progStart = 0
					@progStartValues.push(value[i].progStart) # store
