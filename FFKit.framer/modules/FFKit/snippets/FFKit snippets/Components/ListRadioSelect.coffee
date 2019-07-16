plugin.run = (contents, options) ->
	"""
#{contents}

radioSelect = new ListRadioSelect
	selectArray: [
		{text : "List Item 1"}, 
		{text : "List Item 2", on : true}
		{text: "List Item 3"}
		]
		
	"""
