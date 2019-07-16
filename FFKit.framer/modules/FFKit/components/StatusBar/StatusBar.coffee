############## STATUS BAR ##############
class window.StatusBar extends Layer
	constructor: (@opt={}) ->
		super _.defaults @opt,
			x: 0, y: 0
			width: Screen.width
			height: if Framer.Device.deviceType is "apple-iphone-x-space-gray" then 44 else 20
			backgroundColor: "white"
			updateTime: false
			signalIcon: "signal"
			wifiIcon: "wifi"
			batteryIcon: "battery"
			# Capture current time into variable
			currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
		# Replace a 'target' from designe mode. 
		if @opt.target isnt undefined 
			targetDesignMode(@opt.target, @)
		# Position after another layer/object
		if @opt.after isnt undefined
			positionAfter(@opt.after, @, @opt.y)

		# Prepare styles
		@style = 
			"filter": "invert(0)"
			"position": "absolute",
			"z-index": 99999
		
		# Check if iPhoneX mode is on 
		if Framer.Device.deviceType is "apple-iphone-x-space-gray"
			@time = new TextLayer
				name: "time"
				parent: @
				color: @opt.timeColor
				text: currentTime
				fontWeight: 700
				fontSize: 15
				lineHeight: 1
				color: "black"
				x: 28, y: 16
				textAlign: "center"

			@signal = new Layer
				name: "signal"
				parent: @
				width: 17, height: 12
				x: Align.right(-64), y: 18
				image: "modules/FFKit/components/StatusBar/assets/#{@opt.signalIcon}.svg"

			@wifi = new Layer
				name: "wifi"
				parent: @
				width: 15, height: 12
				x: Align.right(-44), y: 18
				image: "modules/FFKit/components/StatusBar/assets/#{@opt.wifiIcon}.svg"

			@battery = new Layer
				name: "battery"
				parent: @
				width: 25, height: 12
				x: Align.right(-14), y: 18
				image: "modules/FFKit/components/StatusBar/assets/#{@opt.batteryIcon}.svg"
		else
			@signal = new Layer
				name: "signal"
				parent: @
				width: 15, height: 9
				x: 7, y: 5
				image: "modules/FFKit/components/StatusBar/assets/#{@opt.signalIcon}.svg"

			@wifi = new Layer
				name: "wifi"
				parent: @
				width: 13, height: 9
				x: 28, y: 5
				image: "modules/FFKit/components/StatusBar/assets/#{@opt.wifiIcon}.svg"

			@time = new TextLayer
				name: "time"
				parent: @
				color: @opt.timeColor
				text: currentTime
				fontWeight: 700
				fontSize: 12
				lineHeight: 1
				color: "black"
				x: Align.center, y: 4
				textAlign: "center"

			@battery = new Layer
				name: "battery"
				parent: @
				width: 24, height: 10.5
				x: Align.right(-4), y: 5
				image: "modules/FFKit/components/StatusBar/assets/#{@opt.batteryIcon}.svg"
				
			@batteryPercentage = new TextLayer
				name: "time"
				parent: @
				color: @opt.timeColor
				text: "100%"
				fontWeight: 500
				fontSize: 12
				lineHeight: 1
				color: "black"
				x: Align.right(-32), y: 4
				textAlign: "center"
			
		updateTimeFoo(@opt.updateTime, @time)

	# Private method which we call based on @opt.updateTime property
	updateTimeFoo = (val, timeLayer) ->
		if val
			Utils.interval 1, ->
				timeLayer.text = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
	
	# Public method to switch modes by CSS filters
	switchMode: (time) ->
		time ?= 0.2
		@.style["transition"] = "all " + time + "s"
		if @.style["filter"] is "invert(0)"
			@.style["filter"] = "invert(1)"
		else
			@.style["filter"] = "invert(0)"