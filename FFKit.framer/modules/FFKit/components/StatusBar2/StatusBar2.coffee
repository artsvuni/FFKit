# Device detection

heightValue = 0

getMobileOperatingSystem = () ->
	userAgent = navigator.userAgent || navigator.vendor || window.opera
	if Utils.isMobile()
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
			return "iOS"
		if (/android/i.test(userAgent)) || (Framer.Device.deviceType.search("google") >= 0)
			return "Android"
		return "unknown"
	else
		if (Framer.Device.deviceType.search("apple-iphone") >= 0) || (Framer.Device.deviceType.search("apple-ipad") >= 0)
			return "iOS"
		if (Framer.Device.deviceType.search("google") >= 0) || (Framer.Device.deviceType.search("htc") >= 0) || (Framer.Device.deviceType.search("samsung") >= 0)
			return "Android"
		return "unknown"



getMobileType = () ->
	switch getMobileOperatingSystem()
		when "iOS"
			if Framer.Device.orientationName = "portrait" && Screen.height == 812
				return "iphone-x"
			if Framer.Device.orientationName = "landscsape" && Screen.width == 812
				return "unknown"
			else
				return "classic-iphone"
		when "Android" then return "android"
		when "unknown" then return "unknown"

#SVG shit
iosSignalSVG = "<svg><path d='M1,5.5 L2,5.5 C2.55228475,5.5 3,5.94771525 3,6.5 L3,9 C3,9.55228475 2.55228475,10 2,10 L1,10 C0.44771525,10 6.76353751e-17,9.55228475 0,9 L0,6.5 C-6.76353751e-17,5.94771525 0.44771525,5.5 1,5.5 Z M5.5,4 L6.5,4 C7.05228475,4 7.5,4.44771525 7.5,5 L7.5,9 C7.5,9.55228475 7.05228475,10 6.5,10 L5.5,10 C4.94771525,10 4.5,9.55228475 4.5,9 L4.5,5 C4.5,4.44771525 4.94771525,4 5.5,4 Z M10,2 L11,2 C11.5522847,2 12,2.44771525 12,3 L12,9 C12,9.55228475 11.5522847,10 11,10 L10,10 C9.44771525,10 9,9.55228475 9,9 L9,3 C9,2.44771525 9.44771525,2 10,2 Z M14.5,0 L15.5,0 C16.0522847,-1.01453063e-16 16.5,0.44771525 16.5,1 L16.5,9 C16.5,9.55228475 16.0522847,10 15.5,10 L14.5,10 C13.9477153,10 13.5,9.55228475 13.5,9 L13.5,1 C13.5,0.44771525 13.9477153,1.01453063e-16 14.5,0 Z'></path></svg>"

iosWifiSVG = "<svg><path d='M1.72225058e-11,2.82956276 C1.87663887,1.07441257 4.39785587,0 7.17000008,0 C9.94214428,0 12.4633613,1.07441257 14.3400002,2.82956276 L12.9248876,4.24476162 C11.4109979,2.85107918 9.38988303,2 7.17000008,2 C4.95011713,2 2.92900225,2.85107918 1.41511257,4.24476162 L0,2.82956276 Z M2.47681709,5.30653087 C3.71833306,4.18377399 5.36431945,3.5 7.17000008,3.5 C8.9756807,3.5 10.6216671,4.18377399 11.8631831,5.30653087 L10.4465387,6.72326155 C9.56905299,5.96124278 8.42338776,5.5 7.17000008,5.5 C5.91661239,5.5 4.77094717,5.96124278 3.8934614,6.72326155 L2.47681709,5.30653087 Z M4.95784379,7.78770884 C5.5607522,7.29532392 6.33088994,7 7.17000008,7 C8.00911021,7 8.77924795,7.29532392 9.38215636,7.78770884 L7.17000008,10 L4.95784379,7.78770884 Z'></path></svg>"

iosBatterySVG = "<svg><path d='M3.2048565,1 C2.33980043,1 2.04887034,1.05618119 1.75054173,1.21572908 C1.5174028,1.34041314 1.34041314,1.5174028 1.21572908,1.75054173 C1.05618119,2.04887034 1,2.33980043 1,3.2048565 L1,8.2951435 C1,9.16019957 1.05618119,9.45112966 1.21572908,9.74945827 C1.34041314,9.9825972 1.5174028,10.1595869 1.75054173,10.2842709 C2.04887034,10.4438188 2.33980043,10.5 3.2048565,10.5 L22.0738202,10.5 C22.5853352,10.5 23,10.0853352 23,9.57382015 L23,3.2048565 C23,2.33980043 22.9438188,2.04887034 22.7842709,1.75054173 C22.6595869,1.5174028 22.4825972,1.34041314 22.2494583,1.21572908 C21.9511297,1.05618119 21.6601996,1 20.7951435,1 L3.2048565,1 Z M3.2048565,-5.73569248e-16 L20.7951435,1.29480038e-16 C21.9095419,-7.52316311e-17 22.3136497,0.116032014 22.7210571,0.33391588 C23.1284645,0.551799746 23.4482003,0.871535463 23.6660841,1.27894287 C23.883968,1.68635028 24,2.09045808 24,3.2048565 L24,9.57382015 C24,10.6376199 23.1376199,11.5 22.0738202,11.5 L3.2048565,11.5 C2.09045808,11.5 1.68635028,11.383968 1.27894287,11.1660841 C0.871535463,10.9482003 0.551799746,10.6284645 0.33391588,10.2210571 C0.116032014,9.81364972 5.01544207e-17,9.40954192 -8.63200256e-17,8.2951435 L8.63200256e-17,3.2048565 C-5.01544207e-17,2.09045808 0.116032014,1.68635028 0.33391588,1.27894287 C0.551799746,0.871535463 0.871535463,0.551799746 1.27894287,0.33391588 C1.68635028,0.116032014 2.09045808,-3.68857579e-16 3.2048565,-5.73569248e-16 Z' fill-rule='nonzero' opacity='0.4'></path><path d='M25,4 C25.8626136,4.2220214 26.5,5.00507154 26.5,5.93699126 C26.5,6.86891097 25.8626136,7.65196112 25,7.87398251 L25,4 Z' opacity='0.4'></path><rect x='2' y='2' width='20' height='7.5' rx='0.5'></rect></svg>"

androidBatterySVG = "<svg><polygon points='6 0.875 6 3.77475828e-15 3 1.11022302e-16 3 0.875 0 0.875 0 14 9 14 9 0.875'></polygon></svg>"

androidSignalSVG = "<svg><polygon points='0 14 14 14 14 0'></polygon></svg>"

androidWifiSVG = "<svg><path d='M-4.02993194e-11,3.01593123 C2.510847,1.12256382 5.63564304,0 9.02262791,0 C12.4096128,0 15.5344088,1.12256382 18.0452558,3.01593123 L9.02262791,14 L-4.91695573e-11,3.01593123 Z'></path></svg>"


getAllChildrenOfLayer = (layer, mem = []) ->
	allChildren = mem
	for child in layer.children
		if(child.children.length == 0)
			allChildren.push(child)
		else
			allChildren = allChildren.concat(child).concat(getAllChildrenOfLayer(child))
	return allChildren

#Status Bar Class
class window.StatusBar2 extends Layer
	constructor : (@options = {}) ->
		@options.backgroundColor ?= "transparent"
		@options.height ?= 0
		@options.style ?= "dark"
		@options.parent ?= null
		super(@options)
		#Layers
		@statusBarLayer = new Layer
			name: "statusBarLayer"
			y: 0
			midX: Screen.midX
			width: Screen.width
			backgroundColor: @options.backgroundColor
			parent: this
		#Update at creation
		if @options.device
			@changeStatusBar(@options.device)
		else
			@changeStatusBar(getMobileType())

	changeStatusBar : (phone) ->
		switch phone
			when "classic-iphone" then this.iPhoneStatusBar()
			when "iphone-x" then this.iPhoneXStatusbar()
			when "android" then this.androidStatusbar()
			when "unknown" then this.destroyStatusbar()
		return @height = heightValue

	iPhoneStatusBar : () ->
		heightValue = 20
		@statusBarLayer.props =
			height : heightValue
		hour = new TextLayer
			name: "hour"
			parent : @statusBarLayer
			text: "9:41 AM"
			fontSize: 12
			textAlign: "center"
			fontWeight: 600
			fontFamily: "'-apple-system', 'SF Pro Text', sans-serif"
			x: Align.center
			y: Align.center

		battery = new Layer
			name : "battery"
			parent: @statusBarLayer
			x: Align.right
			height: @statusBarLayer.height
			backgroundColor: null
		batteryIcon = new SVGLayer
			name : "batteryIcon"
			parent: battery
			svg: iosBatterySVG
			fill: "white"
			width: 27
			height: 12
			x: Align.right(-7)
			y: Align.center

		batteryPercent = new TextLayer
			name: "batteryPercent"
			parent : battery
			text: "100%"
			fontSize: 12
			textAlign: "center"
			fontWeight: 500
			fontFamily: "'-apple-system', 'SF Pro Text', sans-serif"
			color: "white"
			x: Align.right(-batteryIcon.width - 10)
			y: Align.center

		statusIcons = new Layer
			name: "statusIcons"
			parent: @statusBarLayer
			x: Align.left
			height: @statusBarLayer.height
			backgroundColor: null

		signalIcon = new SVGLayer
			name: "signalIcon"
			parent: statusIcons
			svg: iosSignalSVG
			fill: "white"
			width: 17
			height: 10
			y: Align.center
			x: 7

		wifiIcon = new SVGLayer
			name: "wifiIcon"
			parent: statusIcons
			svg: iosWifiSVG
			fill: "white"
			width: 14
			height: 10
			y: Align.center
			x: signalIcon.x + signalIcon.width + 3

		if @options.style == "light"
			hour.color = "white"
			batteryIcon.fill = "white"
			batteryPercent.color = "white"
			wifiIcon.fill = "white"
			signalIcon.fill = "white"
		else
			hour.color = "black"
			batteryIcon.fill = "black"
			batteryPercent.color = "black"
			wifiIcon.fill = "black"
			signalIcon.fill = "black"

	iPhoneXStatusbar : () ->
		heightValue = 44

		@statusBarLayer.props =
			y: 0
			midX: Screen.midX
			width: Screen.width
			height: heightValue
			parent: null
		hourFrame = new Layer
			name: "hourFrame"
			parent: @statusBarLayer
			height: 16
			width: 54
			x: Align.left(21)
			y: Align.center
			backgroundColor: null

		hour = new TextLayer
			name: "hour"
			parent : hourFrame
			text: "9:41"
			fontSize: 14
			letterSpacing: -0.28
			textAlign: "center"
			fontWeight: 600
			fontFamily: "'-apple-system', 'SF Pro Text', sans-serif"
			color: "white"
			x: Align.center
			y: Align.center

		statusIcons = new Layer
			name: "statusIcons"
			parent: @statusBarLayer
			x: Align.right
			height: @statusBarLayer.height
			backgroundColor: null

		batteryIcon = new SVGLayer
			name: "batteryIcon"
			parent: statusIcons
			svg: iosBatterySVG
			fill: "white"
			width: 27
			height: 12
			x: Align.right(-12)
			y: Align.center

		wifiIcon = new SVGLayer
			name: "wifiIcon"
			parent: statusIcons
			svg: iosWifiSVG
			fill: "white"
			width: 15
			height: 10
			x: Align.right(-batteryIcon.width - 12 - 5)
			y: Align.center

		signalIcon = new SVGLayer
			name: "signalIcon"
			parent: statusIcons
			svg: iosSignalSVG
			fill: "white"
			width: 17
			height: 10
			x: Align.right(-batteryIcon.width - 12 - 5 - wifiIcon.width - 5)
			y: Align.center

		if @options.style == "light"
			hour.color = "white"
			batteryIcon.fill = "white"
			wifiIcon.fill = "white"
			signalIcon.fill = "white"
		else
			hour.color = "black"
			batteryIcon.fill = "black"
			wifiIcon.fill = "black"
			signalIcon.fill = "black"

	androidStatusbar : () ->
		heightValue = 24
		@statusBarLayer.props =
			y: 0
			midX: Screen.midX
			width: Screen.width
			height: heightValue
			parent: null

		hour = new TextLayer
			name: "hour"
			parent : @statusBarLayer
			text: "12:30"
			fontSize: 14
			textAlign: "right"
			fontWeight: 500
			fontFamily: "Roboto"
			color: "white"
			x: Align.right(-8)
			y: Align.center

		batteryIcon = new SVGLayer
			name: "batteryIcon"
			parent: @statusBarLayer
			svg: androidBatterySVG
			fill: "white"
			width: 9
			height: 14
			x: Align.right(-hour.width - 8 - 7)
			y: Align.center

		signalIcon = new SVGLayer
			name: "signalIcon"
			parent: @statusBarLayer
			svg: androidSignalSVG
			fill: "white"
			width: 14
			height: 14
			x: Align.right(-hour.width - 8 - batteryIcon.width - 7 - 9)
			y: Align.center

		wifiIcon = new SVGLayer
			name: "wifiIcon"
			parent: @statusBarLayer
			svg: androidWifiSVG
			fill: "white"
			width: 18
			height: 14
			x: Align.right(-hour.width - 8 - batteryIcon.width - 7 - 9 - signalIcon.width - 2)
			y: Align.center

		if @options.style == "light"
			hour.color = "white"
			batteryIcon.fill = "white"
			wifiIcon.fill = "white"
			signalIcon.fill = "white"
		else
			hour.color = "black"
			batteryIcon.fill = "black"
			wifiIcon.fill = "black"
			signalIcon.fill = "black"

	hide : () ->
		@statusBarLayer.animate
			y: -@statusBarLayer.height
			options:
				time: .4
				curve: Bezier.ease
	show : () ->
		@statusBarLayer.animate
			y: 0
			options:
				time: .4
				curve: Bezier.ease

	destroyLayersInStatusBar : () ->
		for child in getAllChildrenOfLayer(@statusBarLayer)
			child.destroy()
	destroyStatusbar : () ->
		@destroyLayersInStatusBar()
		@statusBarLayer.destroy()
