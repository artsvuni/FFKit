# Framer — Farfetch Mobile Kit
# By Farfetch
# Contents: Parse JSON configuration, whitch modules should be includes in the Kit
# Autors: Alexander Artsvuni, Sophie Rahiers, Pavel Laptev
# Website: https://www.farfetch.com
# Kit version: 1.0.2

# Functions makes path shorter
global.require_setup = (name) ->
	return require("FFKit/setup/#{name}/#{name}")

# Function makes path to a component shorter
global.require_component = (name) ->
	return require("FFKit/components/#{name}/#{name}")

# Function makes path to a unit shorter
global.require_unit = (name) ->
	return require("FFKit/units/#{name}/#{name}")

# Function makes path to a pages shorter
global.require_page = (name) ->
	return require("FFKit/pages/#{name}/#{name}")


# CONFIGURATION
# Initial setup
{setup} = require "FFKit/setup/setup"
exports.setup = setup
#
require_setup "sizes"
require_setup "FFTextLayer"

# Components
# Basic
require_component "StatusBar"
require_component "Button"
require_component "Header"
require_component "Keyline"
require_component "Tabbar"
require_component "RefineFilter"
require_component "ProductCard"
require_component "ListProductCard"
require_component "ProductSlider"
require_component "PosBanner"
require_component "ListTitle"
require_component "ListItem"
require_component "Selector"
require_component "iOSSwitch"
require_component "ListRadioSelect"
require_component "Accordion"
require_component "AccordionGroup"
require_component "ActionSheet"
require_component "ButtonFixed"
require_component "MeSignIn"
require_component "HomeSearch"
require_component "SearchInput"
require_component "MeContactUs"
require_component "Input"
require_component "FFInput"
require_component "FFScrollComponent"
require_component "Tabs"

# Units
require_unit "HeroUnit"
require_unit "ProductUnit"
require_unit "FeatureUnit"
require_unit "ProductSet"
require_unit "ProductHero"
require_unit "ProductListingUnit"
require_unit "PDPHeroUnit"
require_unit "RecommendedListUnit"
require_unit "OrderTraker"
require_unit "SearchUnit"
require_unit "WishlistUnit"
require_unit "GenderSwitch"

# Pages
require_page "CategoriesPage"
require_page "DesignersPage"