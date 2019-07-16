# Hide hints
Framer.Extras.Hints.disable()

# Function destory all selected layers from inspector from Design mode
destroyInspectorLayers = ->
	FFKit_components.destroy()
	FFKit_units.destroy()
	FFKit_type_styles.destroy()

# Combined setup functions 
exports.setup = ->
	destroyInspectorLayers()

# Config for selectImage()
window.defaultAPIImageSize = "300"
window.defaultAPIImageOrder = 1
window.useExternalImages = false # true, false 

# Defining var '$' that represengts path to content folder 
window.$ = "modules/FFKit/content/"

# Load global helper functions
require "FFKit/helper-functions/addChildren" 
require "FFKit/helper-functions/targetDesignMode"
require "FFKit/helper-functions/positionAfter"

# Array 1
window.womenPoroducts = [
	"modules/FFKit/content/default/products/women/01.jpg",
	"modules/FFKit/content/default/products/women/02.jpg",
	"modules/FFKit/content/default/products/women/03.jpg",
	"modules/FFKit/content/default/products/women/04.jpg",
	"modules/FFKit/content/default/products/women/05.jpg",
	"modules/FFKit/content/default/products/women/06.jpg",
	"modules/FFKit/content/default/products/women/07.jpg",
	]