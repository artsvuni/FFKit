############# Properties ##############
# placeholder: "Your text"

############## Search input ###############
class window.SearchInput extends Layer
	cmp_frame = search_input_frame

	constructor: (@opt = {}) ->
		super _.defaults @opt,
			width: Screen.width
			height: cmp_frame.height
			backgroundColor: cmp_frame.backgroundColor
			placeholder: "Search for something"

		cmpSidePaddings = cmp_frame.width - cmp_frame.selectChild("input").width
	
		@inputWrap = cmp_frame.selectChild("input").copy()
		@inputWrap.props =
			parent: @
			width: @width - cmpSidePaddings
		@inputWrap.selectChild("search_placeholder").autoHeight = true
		
		# Create HTML input
		@inputFrame = new Layer
			name: "input wrap"
			parent: @inputWrap
			y: @inputWrap.selectChild("search_placeholder").y
			x: @inputWrap.selectChild("search_placeholder").x
			backgroundColor: null
			width: @inputWrap.selectChild("search_placeholder").width
			height: @inputWrap.selectChild("search_placeholder").height
			html: """<input
				class = 'search-input-cmp'
				placeholder = '#{@opt.placeholder}'>
			</input>"""
			style:
				"position": "relative"
		
		css = """
		.search-input-cmp {
			position: absolute;
			top: 0;
			width: #{@inputWrap.selectChild("search_placeholder").width}px;
			height: #{@inputWrap.selectChild("search_placeholder").height}px;
			font-size: 15px;
			line-height: 1.5;
			background-color: transparent;
			font-family: "Polaris-Book", "Polaris", sans-serif';
			text-rendering: optimizeLegibility;
			-webkit-font-smoothing: antialiased;
		}
		.search-input-cmp::-webkit-input-placeholder {
			color: #{@inputWrap.selectChild("search_placeholder").color};
		}
		:focus {
		  outline: none;
		}
		"""
		Utils.insertCSS(css)
			
		@inputWrap.selectChild("search_placeholder").destroy()
		@input = document.body.querySelector('#search-input-cmp')