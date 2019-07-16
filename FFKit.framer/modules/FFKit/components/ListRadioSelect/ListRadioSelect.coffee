###
radioSelect = new ListRadioSelect
	selectArray: [
		{text : "List Item 1"}, 
		{text : "List Item 2", on : true}
		{text: "List Item 3"}
		]
###

########### List Select Radio ############
class window.ListRadioSelect extends Layer
	constructor: (@opt = {}) ->
		opt = _.defaults @opt,
		super
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		@list = new Layer
			backgroundColor: new Color("transparent")
			name: "ListRadioSelect"
		
		@listArray = [] # Storage for the list
		
		for i in [0...@opt.selectArray.length]
			@listItem = new ListItem
				parent: @list
				text: @opt.selectArray[i].text
				right: "radio-off"
			@listItem.states.on =
				right: "radio-on"
			@listItem.states.off =
				right: "radio-off"
			@listItem.y = @listItem.height * i			
			if @opt.selectArray[i].on == true
				@listItem.stateSwitch("on")

			@listArray.push(@listItem) # Store List
			
			@listItem.onTap (event, layer) =>
				for i in [0...@listArray.length]
					@listArray[i].stateSwitch("off")
				layer.stateSwitch("on")
		@list.height = @listArray.length * @listItem.height

		@list.parent = @
		@height = @list.height # help to align
