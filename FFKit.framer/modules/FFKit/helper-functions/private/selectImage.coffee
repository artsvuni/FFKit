# 🚦⚙️ Helper Functions — selectImage, selectRandomImage
window.selectImage = (array, imageOrder = defaultAPIImageOrder) ->
	
	if array.length == 0
		return ""
	
	if array.length > 1
		filteredImages = array.filter (image) -> image.order == imageOrder && image.size == defaultAPIImageSize
		
		if filteredImages.length > 0
			selectedImage = filteredImages[0]
		else
			selectedImage = array[0]
	else
		selectedImage = array[0]
		
	return selectedImage.url