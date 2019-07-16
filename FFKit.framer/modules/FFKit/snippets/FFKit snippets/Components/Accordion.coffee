plugin.run = (contents, options) ->
	"""
#{contents}
# Accordion example
accordionA = new Accordion
	expanded: true
	labelText: "Description"

# Accordion with your content 
# (paste tergeted frame from design mode)
accordionB = new Accordion
	y: accordionA.maxY
	expanded: true
	labelText: "Description"
	content: acc_description_conetent

	"""
