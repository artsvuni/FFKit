{generateDots} = require('../../helper-functions/private/generateDots.coffee')
{paralaxOnScroll} = require('../../helper-functions/private/paralaxOnScroll.coffee')

class window.HeroUnit extends Layer
	constructor: (@opt = {}) ->
		############### SINGLE UNIT ###############
		if @opt.sliderArray is undefined
			# Cloning layers from 'Design mode'
			@unit = hero_unit.copy()
			@unit.props = # cloned unit settings
				x:0, y:0

		############### SLIDER UNIT ###############
		else
			# Slider
			@unit = new PageComponent
				width: hero_unit.width, height: hero_unit.height
				scrollVertical: false
				originX : 0.5
				directionLock: true # avoids swipe when
			
			@slides = []  # storage

			for i in [0...@opt.sliderArray.length]
				# Cloning Product Card from 'Design mode'
				@slide = hero_unit.copy()
				
				# Add the card to Page Component
				@unit.addPage(@slide)
				@slides.push(@slide) # store
			
			# Generating Slider Dots
			generateDots(@unit, @opt.sliderArray)


		# Initialise the Unit
		super _.defaults @opt,
			paralax: true
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)
							
		@unit.parent = @
		@height = hero_unit.height
		@width = hero_unit.width

		# Enable paralax
		if @opt.paralax is true and @opt.sliderArray is undefined
			paralaxOnScroll(@)

		if @opt.paralax is true and @opt.sliderArray isnt undefined	
			for child in @slides
				paralaxOnScroll(child)

	############### DEFINE PROPERTIES ###############
	@define 'title', 
		get: -> @opt.title,
		set: (value) -> 
			if @opt.sliderArray is undefined
				@unit.selectChild("title").text = value # update the value
				@unit.selectChild('title').autoHeight = true # positioning 
		
	@define 'subTitle', 
		get: -> @opt.subTitle,
		set: (value) -> 
			if @opt.sliderArray is undefined
				@unit.selectChild("sub_title").text = value # update the value
				@unit.selectChild('sub_title').y = @unit.selectChild('title').maxY
			
	@define 'cover', 
		get: -> @opt.cover,
		set: (value) -> 
			if @opt.sliderArray is undefined
				# @unit.selectChild("image").image = "modules/FFKit/units/HeroUnit/images/#{value}" # update the value
				@unit.selectChild("image").image = value # update the value				
	
	# Slider data from the Array
	@define 'sliderArray', 
		get: -> @opt.sliderArray,
		set: (value) -> 
			for i in [0...value.length] # run loop as many times as there are entires
				
				unit = @slides[i] # select
				
				unit.selectChild("title").text = value[i].title
				unit.selectChild("sub_title").text = value[i].subTitle
				# unit.selectChild("image").image = "modules/FFKit/units/HeroUnit/images/#{value[ii].cover}"
				unit.selectChild("image").image = value[i].cover


				# Line brake fix for TextLayers
				unit.selectChild('title').autoHeight = true
				unit.selectChild('sub_title').y = unit.selectChild('title').maxY
				