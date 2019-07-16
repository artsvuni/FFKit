plugin.run = (contents, options) ->
	"""
#{contents}

toggle = new iOSSwitch
	y: Align.center
	isOn: true

toggle.onValueChange (value) ->
	print value

	"""
