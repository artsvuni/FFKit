#🚦⚙️  Helper Function - generateDots
# Atributes:
# slider Unit - needs to be a pageComponent
# numberOfSlides - number, or usually (array.length)
# coloursArray - array indicating what colour is each slide

exports.generateDots = (sliderUnit, array, yPos) ->

	# creating container for the dots
	dotsContainer = new Layer
		name: "dotsContainer"
		width: sliderUnit.width
		height: 6
		x: Align.center
		y: Align.bottom(-20)
		backgroundColor: ""
		parent: sliderUnit
		
	#creating an array for the indicators
	dotsArray = []

	for ii in [0...array.length]
		
		# creating each dot
		dot = new Layer
			parent: dotsContainer
			size: dotsContainer.height
			borderRadius: dotsContainer.height
			x: (dotsContainer.height + 10) * ii
			name: ii
		
		dotValues = 
			dot: dot
			colour: array[ii].dotsColour
			
		# Pushing dots into array
		dotsArray.push(dotValues)
		
		defaultDots = (slideColor) ->
			for i in dotsArray
				i.dot.opacity = 0.2
				if slideColor == "white" then i.dot.backgroundColor = "#ffffff"
				else i.dot.backgroundColor = "#000000"
		
		# Select current dot
		current = sliderUnit.horizontalPageIndex(sliderUnit.currentPage)
		# Style dots
		defaultDots(dotsArray[current].colour)
		# Highlight current dot
		dotsArray[current].dot.opacity = 1
		
	# centering the dots
	dotsContainer.width = dotsArray.length * (dotsContainer.height + 10) 
	dotsContainer.midX = Screen.midX
	
	# Interactions
	sliderUnit.on "change:currentPage", (event, layer) ->
		# Select current dot
		current = layer.horizontalPageIndex(layer.currentPage)
		# Style dots
		defaultDots(dotsArray[current].colour)
		# Highlight current dot
		dotsArray[current].dot.opacity = 1