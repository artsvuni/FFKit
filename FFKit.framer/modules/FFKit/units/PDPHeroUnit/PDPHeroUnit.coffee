{generateDots} = require('../../helper-functions/private/generateDots.coffee')

############## PRODUCT HERO ###############
class window.PDPHeroUnit extends Layer
	constructor: (@opt = {}) ->
		unit_frame = pdp_hero
		defaultArray = JSON.parse Utils.domLoadDataSync "modules/FFKit/units/PDPHeroUnit/data/productImages.json"
		unit_frame.selectChild("dots").destroy()
		# Slider
		@imageSlider = new PageComponent
			name: "imageSlider"
			width: unit_frame.width, height: unit_frame.selectChild("image").height
			scrollVertical: false
			originX : 0.5
			directionLock: true # avoids swipe when
			clip: true
		
		super _.defaults @opt,
			name: "pdpHero"
			backgroundColor: "white"
			width: unit_frame.width
			height: unit_frame.height
			array: defaultArray
			brand: unit_frame.selectChild("brand").text
			description: unit_frame.selectChild("description").text
			price: unit_frame.selectChild("price").text
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		for child, i in @opt.array
			cover_frame = unit_frame.selectChild("image").copy()
			cover_frame.props =
				image: defaultArray[i].image
			
			@imageSlider.addPage(cover_frame)
		
		generateDots(@imageSlider, @opt.array)
		@imageSlider.parent = @
		@icon = unit_frame.selectChild("wishlist-ico").copy()
		@icon.y = if Framer.Device.deviceType is "apple-iphone-x-space-gray" then @icon.y+20 else @icon.y
		@icon.parent = @

		# Copy description text
		@baseDescription_frame = unit_frame.selectChild("base_description_frame").copy()
		@baseDescription_frame.props =
			x: 0, y: unit_frame.selectChild("image").maxY
			parent: @

		# Set values from @opt
		@baseDescription_frame.selectChild("title").text = @baseDescription_frame.selectChild("brand").text = @opt.brand
		@baseDescription_frame.selectChild("description").text = @opt.description
		@baseDescription_frame.selectChild("price").text = @opt.price

		# Variabbles for scroll
		currentBaseDescrriptionY = @baseDescription_frame.y
		currentBaseDescrriptionPriceY = @baseDescription_frame.selectChild("price").y
		currentImageSliderHeight = @imageSlider.height

		# if parent is scroll
		if @.parent and @.parent.parent.content and @.parent.parent.content.name is "content"
			if @.parent.parent.constructor.name is "ScrollComponent"
				@.parent.on "change:y", (offset) =>
					# Image offseting
					@imageSlider.y = Utils.modulate(@.parent.parent.scrollY, [0, 250], [0, 100])
					@imageSlider.height = Utils.modulate(@.parent.parent.scrollY, [0, 100], [currentImageSliderHeight, currentImageSliderHeight-30])
					
					# Stick the base description block
					if Framer.Device.deviceType is "apple-iphone-x-space-gray"
						if @.parent.y < -530
							@baseDescription_frame.y = -@.parent.parent.content.y - 40
						else
							@baseDescription_frame.y = currentBaseDescrriptionY
					else
						if @.parent.y < -550
							@baseDescription_frame.y = -@.parent.parent.content.y - 66
						else
							@baseDescription_frame.y = currentBaseDescrriptionY
					
					# Elements animation
					if @.parent.y < -440 and @baseDescription_frame.selectChild("brand").opacity >= 0
						@baseDescription_frame.selectChild("brand").opacity -= 0.14
						@baseDescription_frame.selectChild("description").opacity -= 0.14
					else if @.parent.y > -440 and @baseDescription_frame.selectChild("brand").opacity <= 1
						@baseDescription_frame.selectChild("brand").opacity += 0.14
						@baseDescription_frame.selectChild("description").opacity += 0.14

					if @.parent.y < -490 and @baseDescription_frame.selectChild("price").fontSize >= 12
						@baseDescription_frame.selectChild("price").y += 4
						@baseDescription_frame.selectChild("price").fontSize -= 0.3
						@baseDescription_frame.selectChild("price").style.filter = "brightness(0)"
						
						@baseDescription_frame.selectChild("title").opacity += 0.1
						@baseDescription_frame.selectChild("title").y += 8.2
					else if @.parent.y > -490 and @baseDescription_frame.selectChild("price").fontSize <= 15
						@baseDescription_frame.selectChild("price").fontSize += 0.3
						@baseDescription_frame.selectChild("price").y -= 4
						@baseDescription_frame.selectChild("price").style.filter = "brightness(1)"
						
						@baseDescription_frame.selectChild("title").opacity -= 0.1
						@baseDescription_frame.selectChild("title").y -= 8.2