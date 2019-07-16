require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"FFKit/components/Accordion/Accordion":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.Accordion = (function(superClass) {
  var comp_frame, comp_frame_item;

  extend(Accordion, superClass);

  comp_frame = accordion_comp;

  comp_frame_item = comp_frame.selectChild("accordion_item");

  function Accordion(opt) {
    this.opt = opt != null ? opt : {};
    Accordion.__super__.constructor.call(this, _.defaults(this.opt, {
      width: comp_frame.width,
      height: comp_frame_item.height,
      backgroundColor: "white",
      labelText: "label",
      content: comp_frame.selectChild("accordion_content"),
      expanded: false
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.item = comp_frame_item.copy();
    this.item.selectChild("label_text").text = this.opt.labelText;
    this.item.selectChild("label_text").autoHeight = true;
    this.itemIcon = this.item.selectChild("icon");
    this.content = this.opt.content.copy();
    this.content.initialHeight = this.content.height;
    this.content.props = {
      x: 0,
      y: this.item.maxY,
      clip: true
    };
    if (this.opt.expanded === false) {
      this.itemIcon.rotation = 0;
      this.content.height = 0;
    } else {
      this.height = this.height + this.content.height;
    }
    addChildren(this, [this.item, this.content]);
    this.item.onTap((function(_this) {
      return function() {
        if (_this.itemIcon.rotation === 0) {
          _this.itemIcon.animate({
            rotation: 180,
            options: {
              time: 0.2
            }
          });
          _this.content.animate({
            height: _this.content.initialHeight,
            options: {
              time: 0.2
            }
          });
          return _this.animate({
            height: _this.height + _this.content.initialHeight,
            options: {
              time: 0.2
            }
          });
        } else {
          _this.itemIcon.animate({
            rotation: 0,
            options: {
              time: 0.2
            }
          });
          _this.content.animate({
            height: 0,
            options: {
              time: 0.2
            }
          });
          return _this.animate({
            height: comp_frame_item.height,
            options: {
              time: 0.2
            }
          });
        }
      };
    })(this));
  }

  Accordion.define("expanded", {
    get: function() {
      return this.opt.expanded;
    },
    set: function(value) {
      return this.opt.expanded = value;
    }
  });

  return Accordion;

})(Layer);


},{}],"FFKit/components/AccordionGroup/AccordionGroup":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.AccordionGroup = (function(superClass) {
  var toggleExpand;

  extend(AccordionGroup, superClass);

  function AccordionGroup(opt) {
    var child, i, j, len, nextPosY, ref;
    this.opt = opt != null ? opt : {};
    AccordionGroup.__super__.constructor.call(this, _.defaults(this.opt, {
      backgroundColor: null,
      children: void 0
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    if (this.opt.children.length < 2) {
      this.props = {
        width: Screen.width,
        backgroundColor: "rgba(255,0,0,0.7)",
        html: "<p style='line-height: 1.2; text-align: center; padding: 60px 40px; font-size: 22px'>Please include accrorion items as an array</p>"
      };
      print("Please include accrorion items as an array");
    } else {
      addChildren(this, this.opt.children);
      ref = this.children;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        child = ref[i];
        child.y = 0;
        child.y = nextPosY;
        nextPosY = child.maxY;
        child.onTap(function() {
          return toggleExpand(this, this.content.initialHeight);
        });
        child.on("change:height", (function(_this) {
          return function() {
            _this.height = _this.opt.children[_this.opt.children.length - 1].maxY;
            if (_this.parent && _this.parent.name === "content") {
              if (_this.parent.parent.constructor.name === "ScrollComponent") {
                return _this.parent.parent.updateContent();
              }
            }
          };
        })(this));
      }
      this.props = {
        width: this.opt.children[0].width,
        height: this.opt.children[this.opt.children.length - 1].maxY
      };
    }
  }

  toggleExpand = function(layer, distance) {
    var j, len, ref, sib;
    distance = layer.expanded === false ? distance : -distance;
    ref = layer.siblings;
    for (j = 0, len = ref.length; j < len; j++) {
      sib = ref[j];
      if (sib.y > layer.y) {
        sib.animate({
          y: sib.y + distance,
          options: {
            time: 0.2
          }
        });
      }
    }
    return layer.expanded = !layer.expanded;
  };

  return AccordionGroup;

})(Layer);


},{}],"FFKit/components/ActionSheet/ActionSheet":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.ActionSheet = (function(superClass) {
  var actionSheet_frame, additionalHeight, buttonProps, cmp_frame, content_frame, titleProps;

  extend(ActionSheet, superClass);

  cmp_frame = actionsheet_container;

  actionSheet_frame = actionsheet_container.selectChild("actionsheet_cmp");

  content_frame = actionsheet_container.selectChild("content");

  additionalHeight = 40;

  buttonProps = {
    text: actionsheet_container.selectChild("cta_text").text,
    width: actionsheet_container.selectChild("header_cta").width,
    visible: true
  };

  titleProps = {
    text: actionsheet_container.selectChild("header_title").text,
    visible: false
  };

  function ActionSheet(opt) {
    this.opt = opt != null ? opt : {};
    ActionSheet.__super__.constructor.call(this, _.defaults(this.opt, {
      width: Screen.width,
      height: Screen.height,
      visible: false,
      content: content_frame,
      button: {},
      title: {}
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    this.closearea_frame = actionsheet_container.selectChild("close_area").copy();
    this.closearea_frame.props = {
      parent: this,
      x: 0,
      y: 0,
      height: this.height,
      width: this.width
    };
    this.actionsheet = actionsheet_container.selectChild("actionsheet_cmp").copy();
    this.actionsheet.props = {
      parent: this,
      x: 0
    };
    this.content = this.opt.content;
    this.content.props = {
      parent: this.actionsheet,
      x: 0,
      y: content_frame.y
    };
    this.actionsheet.selectChild("content").destroy();
    this.actionsheet.height = this.content.maxY + additionalHeight;
    this.actionsheet.y = Align.bottom(this.actionsheet.height);
    this.headerButton = new Button({
      name: "CTA button",
      parent: this.actionsheet.selectChild("header"),
      x: Align.right(-(actionSheet_frame.width - this.actionsheet.selectChild("header_cta").maxX)),
      y: this.actionsheet.selectChild("header_cta").y,
      width: this.opt.button.width === void 0 ? buttonProps.width : this.opt.button.width,
      text: this.opt.button.text === void 0 ? buttonProps.text : this.opt.button.text,
      visible: this.opt.button.visible
    });
    this.actionsheet.selectChild("header_cta").destroy();
    this.headerTitle = this.actionsheet.selectChild("header_title");
    this.headerTitle.props = {
      visible: this.opt.title.visible === void 0 ? titleProps.visible : this.opt.title.visible,
      autoHeight: true,
      text: this.opt.title.text === void 0 ? titleProps.text : this.opt.title.text
    };
    this.states = {
      show: {
        opacity: 1
      },
      hide: {
        opacity: 0,
        options: {
          delay: 0.1
        }
      },
      animationOptions: {
        time: 0.2,
        curve: "ease-out"
      }
    };
    this.actionsheet.states = {
      show: {
        y: Align.bottom(additionalHeight),
        options: {
          curve: Spring({
            tension: 380,
            friction: 30
          })
        }
      },
      hide: {
        y: Align.bottom(this.actionsheet.height),
        options: {
          time: 0.1
        }
      }
    };
    this.closearea_frame.onTap((function(_this) {
      return function() {
        _this.actionsheet.animate("hide");
        _this.animate("hide");
        return Utils.delay(0.3, function() {
          return _this.visible = false;
        });
      };
    })(this));
    this.actionsheet.selectChild("header_close").onTap((function(_this) {
      return function() {
        _this.actionsheet.animate("hide");
        _this.animate("hide");
        return Utils.delay(0.3, function() {
          return _this.visible = false;
        });
      };
    })(this));
    this.actionsheet.onTap(function() {
      return true;
    });
  }

  ActionSheet.prototype.show = function() {
    this.visible = true;
    this.animate("show");
    return this.actionsheet.animate("show");
  };

  return ActionSheet;

})(Layer);


},{}],"FFKit/components/Button/Button":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.Button = (function(superClass) {
  var buttonIcon, tagButtonIcon;

  extend(Button, superClass);

  tagButtonIcon = tag_button_icon_layout.selectChild("button_icon");

  buttonIcon = button_icon_layout.selectChild("button_icon");

  function Button(opt) {
    var tagBtnIconRightMargin;
    this.opt = opt != null ? opt : {};
    _.defaults(this.opt, (function() {
      switch (this.opt.type) {
        case "primary":
        case void 0:
          this.referenceBtn = primary_button;
          return {
            text: this.referenceBtn.selectChild("button_text").text,
            iconInvertValue: 1
          };
        case "secondary":
          this.referenceBtn = secondary_button;
          return {
            text: this.referenceBtn.selectChild("button_text").text
          };
        case "tertiary":
          this.referenceBtn = tertiary_button;
          return {
            text: this.referenceBtn.selectChild("button_text").text
          };
        case "flat":
          this.referenceBtn = flat_button;
          return {
            text: this.referenceBtn.selectChild("button_text").text
          };
        case "tag":
          this.referenceBtn = tag_button;
          return {
            text: this.referenceBtn.selectChild("button_text").text,
            sidePaddings: S_spacer,
            iconMargin: XS_spacer
          };
      }
    }).call(this));
    this.btnText = this.referenceBtn.selectChild("button_text").copy();
    this.btnText.props = {
      name: "text_btn",
      text: this.opt.text,
      whiteSpace: "nowrap"
    };
    tagBtnIconRightMargin = tag_button_icon_layout.width - tagButtonIcon.maxX;
    Button.__super__.constructor.call(this, _.defaults(this.opt, {
      width: (function() {
        switch (false) {
          case !(this.opt.type === "tag" && this.opt.icon === void 0):
            return this.btnText.width + this.opt.sidePaddings * 2;
          case !(this.opt.type === "tag" && this.opt.icon !== void 0):
            return this.btnText.width + this.opt.sidePaddings + tagBtnIconRightMargin + tagButtonIcon.width + this.opt.iconMargin;
          default:
            return this.referenceBtn.width;
        }
      }).call(this),
      height: this.referenceBtn.height,
      backgroundColor: this.referenceBtn.backgroundColor,
      borderRadius: this.referenceBtn.borderRadius,
      borderWidth: this.referenceBtn.borderWidth,
      borderColor: this.referenceBtn.borderColor
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.btnText.parent = this;
    this.btnText.autoWidth = true;
    this.btnText.x = (function() {
      switch (false) {
        case !(this.opt.type === "tag" && this.opt.iconAlign === "left"):
          return Align.left(tagBtnIconRightMargin + tagButtonIcon.width + this.opt.iconMargin);
        case !(this.opt.type === "tag" && this.opt.icon !== void 0):
          return Align.left(this.opt.sidePaddings);
        default:
          return Align.center();
      }
    }).call(this);
    if (this.opt.icon !== void 0) {
      this.icon = new Layer({
        parent: this,
        name: "icon_btn",
        width: buttonIcon.width,
        height: buttonIcon.height,
        y: Align.center(),
        x: (function() {
          switch (false) {
            case !(this.opt.type === "tag" && this.opt.iconAlign === "left"):
              return this.btnText.x - tagButtonIcon.width - this.opt.iconMargin;
            case this.opt.type !== "tag":
              return Align.right(-(tag_button_icon_layout.width - tag_button_icon_layout.selectChild("button_icon").maxX));
            case this.opt.iconAlign !== "left":
              return Align.left(this.referenceBtn.width - buttonIcon.maxX);
            default:
              return Align.right(-(this.referenceBtn.width - buttonIcon.maxX));
          }
        }).call(this),
        backgroundColor: "rgba(0,0,0,0.2)"
      });
      this.icon.style = {
        "filter": "invert(" + this.opt.iconInvertValue + ")"
      };
      if (_.isString(this.opt.icon)) {
        this.icon.props = {
          backgroundColor: null,
          image: "modules/FFKit/assets/icons/" + this.opt.icon + ".svg"
        };
      }
    }
    this.on("change:width", function() {
      this.btnText.x = Align.center();
      if (this.opt.type === "tag" && this.opt.icon !== void 0) {
        this.btnText.x = Align.center(-tagButtonIcon.width / 2);
        return this.icon.x = this.btnText.maxX + this.opt.iconMargin;
      } else if (this.opt.icon !== void 0) {
        return this.icon.x = (function() {
          switch (false) {
            case this.opt.iconAlign !== "left":
              return Align.left(this.referenceBtn.width - buttonIcon.maxX);
            default:
              return Align.right(-(this.referenceBtn.width - buttonIcon.maxX));
          }
        }).call(this);
      }
    });
  }

  Button.define("text", {
    get: function() {
      return this.btnText.text;
    },
    set: function(val) {
      this.btnText.text = val;
      this.btnText.x = Align.center();
      switch (false) {
        case !(this.opt.type === "tag" && this.icon !== void 0 && this.opt.iconAlign === "left"):
          this.width = this.btnText.width + this.opt.sidePaddings * 2 + buttonIcon.width + this.opt.iconMargin;
          this.btnText.x = Align.center((buttonIcon.width + this.opt.iconMargin) / 2);
          return this.icon.x = this.btnText.x - buttonIcon.width - this.opt.iconMargin;
        case !(this.opt.type === "tag" && this.icon !== void 0):
          this.icon.x = this.btnText.maxX + this.opt.iconMargin;
          return this.width = this.btnText.width + this.opt.sidePaddings * 2 + buttonIcon.width + this.opt.iconMargin;
        case !(this.opt.type === "tag" && this.opt.icon === void 0):
          return this.width = this.btnText.width + this.opt.sidePaddings * 2;
        default:
          return this.btnText.x = Align.center();
      }
    }
  });

  return Button;

})(Layer);


},{}],"FFKit/components/ButtonFixed/ButtonFixed":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.ButtonFixed = (function(superClass) {
  extend(ButtonFixed, superClass);

  function ButtonFixed(opt) {
    var cmp_frame;
    this.opt = opt != null ? opt : {};
    cmp_frame = button_fixed;
    this.fixed_btn = new Button({
      name: "button",
      x: Align.center,
      y: cmp_frame.selectChild("cta").y,
      width: cmp_frame.width - L_spacer,
      text: cmp_frame.selectChild("button_text").text
    });
    cmp_frame.selectChild("cta").destroy();
    ButtonFixed.__super__.constructor.call(this, _.defaults(this.opt, {
      width: cmp_frame.width,
      height: Framer.Device.deviceType === "apple-iphone-x-space-gray" ? 90 : cmp_frame.height,
      y: Align.bottom(),
      image: cmp_frame.image
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    this.fixed_btn.parent = this;
  }

  ButtonFixed.define("text", {
    get: function() {
      return this.opt.text;
    },
    set: function(value) {
      this.opt.text = value;
      return this.fixed_btn.text = value;
    }
  });

  return ButtonFixed;

})(Layer);


},{}],"FFKit/components/FFInput/FFInput":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.FFInput = (function(superClass) {
  var _iOSDevice, cmp_frame, initialInputProps, initialInputTextProps;

  extend(FFInput, superClass);

  cmp_frame = ff_input;

  initialInputProps = cmp_frame.selectChild("input").props;

  initialInputTextProps = cmp_frame.selectChild("placeholder").props;

  _iOSDevice = !!navigator.platform.match(/iPhone|iPod|iPad/);

  function FFInput(opt) {
    this.opt = opt != null ? opt : {};
    this.focus = bind(this.focus, this);
    FFInput.__super__.constructor.call(this, _.defaults(this.opt, {
      width: cmp_frame.width,
      height: cmp_frame.height,
      backgroundColor: cmp_frame.backgroundColor
    }));
    if (this.opt.labelText) {
      this.labelText = cmp_frame.selectChild("input_label").copy();
      this.labelText.props = {
        parent: this,
        text: this.opt.labelText,
        autoHeight: true
      };
    }
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this);
    }
    this.input = new Input({
      name: "FF input",
      value: this.opt.value,
      parent: this,
      x: initialInputProps.x,
      y: this.opt.labelText ? initialInputProps.y : 0,
      width: this.width - M_spacer * 2,
      height: initialInputProps.height,
      text: this.opt.placeholderText,
      borderRadius: initialInputProps.borderRadius,
      borderWidth: initialInputProps.borderWidth,
      borderColor: initialInputProps.borderColor,
      color: this.opt.placeholderText ? initialInputTextProps.color : "transparent",
      padding: {
        left: initialInputTextProps.x
      }
    });
    this.input._inputElement.style.fontFamily = initialInputTextProps.fontFamily;
    this.input._inputElement.style.fontSize = window.devicePixelRatio === 2 && _iOSDevice === true ? (initialInputTextProps.fontSize * 2) + "px" : window.devicePixelRatio === 1 ? (initialInputTextProps.fontSize * 2) + "px" : window.devicePixelRatio === 3 && _iOSDevice === true ? (initialInputTextProps.fontSize * 3) + "px" : Framer.Device.deviceType === "apple-iphone-x-space-gray" || Framer.Device.deviceType === "apple-iphone-x-silver" ? (initialInputTextProps.fontSize * 3) + "px" : initialInputTextProps.fontSize + "px";
    this.input._inputElement.style.height = (parseInt(this.input._inputElement.style.height) - 4) + "px";
    if (this.opt.helperText) {
      this.helperText = cmp_frame.selectChild("helper_text").copy();
      this.helperText.props = {
        y: this.input.maxY + (cmp_frame.selectChild("helper_text").y - (initialInputProps.y + initialInputProps.height)),
        parent: this,
        text: this.opt.helperText,
        autoHeight: true
      };
    }
    this.height = this.opt.helperText ? this.helperText.maxY + (cmp_frame.height - cmp_frame.selectChild("helper_text").maxY) : cmp_frame.height - cmp_frame.selectChild("helper_text").height;
  }

  FFInput.prototype.focus = function() {
    return this.input.focus();
  };

  return FFInput;

})(Layer);


},{}],"FFKit/components/FFScrollComponent/FFScrollComponent":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.FFScrollComponent = (function(superClass) {
  extend(FFScrollComponent, superClass);

  function FFScrollComponent(opt) {
    this.opt = opt != null ? opt : {};
    FFScrollComponent.__super__.constructor.call(this, _.defaults(this.opt, this.opt.target !== void 0 ? targetDesignMode(this.opt.target, this) : void 0));
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
  }

  return FFScrollComponent;

})(ScrollComponent);


},{}],"FFKit/components/Header/Header":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.Header = (function(superClass) {
  extend(Header, superClass);

  function Header(opt) {
    var frame;
    this.opt = opt != null ? opt : {};
    frame = header;
    this.subTitle_frame = header_extra.selectChild("subtitle").copy();
    this.subTitle_frame.autoHeight = true;
    switch (false) {
      case !(this.opt.title !== "logo" && this.opt.subTitle === void 0):
        this.title_frame = header.selectChild("title").copy();
        this.title_frame.autoHeight = true;
        break;
      case this.opt.title !== "logo":
        this.title_frame = header_logo.selectChild("logo").copy();
        break;
      case this.opt.subTitle === void 0:
        this.title_frame = header_extra.selectChild("title").copy();
        this.title_frame.autoHeight = true;
    }
    this.iconLeft_layer = new Layer;
    this.iconLeft_layer.props = header.selectChild("icn_left").props;
    this.iconRight_layer = new Layer;
    this.iconRight_layer.props = header.selectChild("icn_right").props;
    this.linkLeft_frame = header_links.selectChild("left_link").copy();
    this.linkLeft_frame.autoHeight = true;
    this.linkRight_frame = header_links.selectChild("right_link").copy();
    this.linkRight_frame.autoHeight = true;
    this.bag_frame = header_extra.selectChild("bag").copy();
    this.search_frame = header.selectChild("icn_search").copy();
    Header.__super__.constructor.call(this, _.defaults(this.opt, {
      height: frame.height,
      width: frame.width,
      backgroundColor: frame.backgroundColor
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    if (this.opt.subTitle !== void 0) {
      this.subTitle_frame.parent = this;
    } else {
      this.subTitle_frame.destroy();
    }
    if (this.opt.title !== void 0) {
      this.title_frame.parent = this;
    } else {
      this.title_frame.destroy();
    }
    if (this.opt.iconLeft !== void 0) {
      this.iconLeft_layer.parent = this;
    } else {
      this.iconLeft_layer.destroy();
    }
    if (this.opt.iconRight !== void 0) {
      this.iconRight_layer.parent = this;
    } else {
      this.iconRight_layer.destroy();
    }
    if (this.opt.linkLeft !== void 0) {
      this.linkLeft_frame.parent = this;
    } else {
      this.linkLeft_frame.destroy();
    }
    if (this.opt.linkRight !== void 0) {
      this.linkRight_frame.parent = this;
    } else {
      this.linkRight_frame.destroy();
    }
    if (this.opt.bag !== void 0) {
      this.bag_frame.parent = this;
    } else {
      this.bag_frame.destroy();
    }
    if (this.opt.search !== void 0) {
      this.search_frame.parent = this;
    } else {
      this.search_frame.destroy();
    }
  }

  Header.define("subTitle", {
    get: function() {
      return this.opt.subTitle;
    },
    set: function(value) {
      this.opt.subTitle = value;
      return this.subTitle_frame.text = value;
    }
  });

  Header.define("title", {
    get: function() {
      return this.opt.title;
    },
    set: function(value) {
      this.opt.title = value;
      return this.title_frame.text = value;
    }
  });

  Header.define("iconLeft", {
    get: function() {
      return this.opt.iconLeft;
    },
    set: function(value) {
      this.opt.iconLeft = value;
      return this.iconLeft_layer.image = "modules/FFKit/assets/icons/" + value + ".svg";
    }
  });

  Header.define("linkLeft", {
    get: function() {
      return this.opt.linkLeft;
    },
    set: function(value) {
      this.opt.linkLeft = value;
      return this.linkLeft_frame.text = value;
    }
  });

  Header.define("iconRight", {
    get: function() {
      return this.opt.iconRight;
    },
    set: function(value) {
      this.opt.iconRight = value;
      return this.iconRight_layer.image = "modules/FFKit/assets/icons/" + value + ".svg";
    }
  });

  Header.define("linkRight", {
    get: function() {
      return this.opt.linkRight;
    },
    set: function(value) {
      this.opt.linkRight = value;
      return this.linkRight_frame.text = value;
    }
  });

  Header.define("bag", {
    get: function() {
      return this.opt.bag;
    },
    set: function(value) {
      this.opt.bag = value;
      this.bag_frame.selectChild("bag_number").text = value;
      return this.search_frame.maxX = this.bag_frame.x - 18;
    }
  });

  Header.define("search", {
    get: function() {
      return this.opt.search;
    },
    set: function(value) {}
  });

  Header.define("nobg", {
    get: function() {
      return this.opt.nobg;
    },
    set: function(value) {
      return this.backgroundColor = "rgba(0,0,0,0.00)";
    }
  });

  return Header;

})(Layer);


},{}],"FFKit/components/HomeSearch/HomeSearch":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.HomeSearch = (function(superClass) {
  extend(HomeSearch, superClass);

  function HomeSearch(opt) {
    var comp_frame;
    this.opt = opt != null ? opt : {};
    comp_frame = home_search;
    this.homeSearch = comp_frame.copy();
    this.homeSearch.props = {
      x: 0,
      y: 0
    };
    HomeSearch.__super__.constructor.call(this, _.defaults(this.opt, {
      height: comp_frame.height,
      width: comp_frame.width
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.homeSearch.parent = this;
  }

  return HomeSearch;

})(Layer);


},{}],"FFKit/components/Input/Input":[function(require,module,exports){
var wrapInput,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Events.EnterKey = "EnterKey";

Events.SpaceKey = "SpaceKey";

Events.BackspaceKey = "BackspaceKey";

Events.CapsLockKey = "CapsLockKey";

Events.ShiftKey = "ShiftKey";

Events.ValueChange = "ValueChange";

Events.InputFocus = "InputFocus";

Events.InputBlur = "InputBlur";

window.Input = (function(superClass) {
  extend(Input, superClass);

  function Input(options) {
    var base, currentValue, property, textProperties, value;
    if (options == null) {
      options = {};
    }
    this._setTextProperties = bind(this._setTextProperties, this);
    this._setPlaceholder = bind(this._setPlaceholder, this);
    _.defaults(options, {
      backgroundColor: "#FFF",
      width: 375,
      height: 60,
      padding: {
        left: 20
      },
      text: "Type something...",
      fontSize: 40,
      fontWeight: 300
    });
    if (options.multiLine) {
      if ((base = options.padding).top == null) {
        base.top = 20;
      }
    }
    this._inputElement = document.createElement("input");
    this._inputElement.style.position = "absolute";
    Input.__super__.constructor.call(this, options);
    this._background = void 0;
    this._placeholder = void 0;
    this._isDesignLayer = false;
    this.input = new Layer({
      backgroundColor: "transparent",
      name: "input",
      width: this.width,
      height: this.height,
      parent: this
    });
    if (this.multiLine) {
      this._inputElement = document.createElement("textarea");
    }
    this.input._element.appendChild(this._inputElement);
    this._setTextProperties(this);
    this._inputElement.autocomplete = "off";
    this._inputElement.autocorrect = "off";
    this._inputElement.spellcheck = false;
    this._inputElement.className = "input" + this.id;
    textProperties = {
      text: this.text,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      lineHeight: this.lineHeight,
      fontWeight: this.fontWeight,
      color: this.color,
      backgroundColor: this.backgroundColor,
      width: this.width,
      height: this.height,
      padding: this.padding,
      parent: this.parent
    };
    for (property in textProperties) {
      value = textProperties[property];
      this.on("change:" + property, (function(_this) {
        return function(value) {
          _this._elementHTML.children[0].textContent = "";
          if (_this._isDesignLayer) {
            return;
          }
          _this._setTextProperties(_this);
          return _this._setPlaceholderColor(_this._id, _this.color);
        };
      })(this));
    }
    this._setPlaceholder(this.text);
    this._setPlaceholderColor(this._id, this.color);
    this._elementHTML.children[0].textContent = "";
    this._isFocused = false;
    this._inputElement.onfocus = (function(_this) {
      return function(e) {
        if (_this.focusColor == null) {
          _this.focusColor = "#000";
        }
        _this.emit(Events.InputFocus, event);
        return _this._isFocused = true;
      };
    })(this);
    this._inputElement.onblur = (function(_this) {
      return function(e) {
        _this.emit(Events.InputBlur, event);
        return _this._isFocused = false;
      };
    })(this);
    currentValue = void 0;
    this._inputElement.onkeydown = (function(_this) {
      return function(e) {
        currentValue = _this.value;
        if (e.which === 20) {
          _this.emit(Events.CapsLockKey, event);
        }
        if (e.which === 16) {
          return _this.emit(Events.ShiftKey, event);
        }
      };
    })(this);
    this._inputElement.onkeyup = (function(_this) {
      return function(e) {
        if (currentValue !== _this.value) {
          _this.emit("change:value", _this.value);
          _this.emit(Events.ValueChange, _this.value);
        }
        if (e.which === 13) {
          _this.emit(Events.EnterKey, event);
        }
        if (e.which === 8) {
          _this.emit(Events.BackspaceKey, event);
        }
        if (e.which === 32) {
          _this.emit(Events.SpaceKey, event);
        }
        if (e.which === 20) {
          return _this.emit(Events.CapsLockKey, event);
        }
      };
    })(this);
  }

  Input.prototype._setPlaceholder = function(text) {
    return this._inputElement.placeholder = text;
  };

  Input.prototype._setPlaceholderColor = function(id, color) {
    return document.styleSheets[0].addRule(".input" + id + "::-webkit-input-placeholder", "color: " + color);
  };

  Input.prototype._checkDevicePixelRatio = function() {
    var dpr, ratio;
    ratio = Screen.width / Framer.Device.screen.width;
    if (Utils.isDesktop()) {
      if (ratio < 0.5 && ratio > 0.25) {
        dpr = 1 - ratio;
      } else if (ratio === 0.25) {
        dpr = 1 - (ratio * 2);
      } else {
        dpr = Utils.devicePixelRatio();
      }
      if (Framer.Device.deviceType === "fullscreen") {
        dpr = 2;
      }
    } else {
      if (ratio < 0.5 && ratio > 0.25) {
        dpr = 1 - ratio;
      } else if (ratio === 0.25) {
        dpr = 1 - (ratio * 2);
      } else if (ratio === 0.5) {
        dpr = 1;
      }
    }
    return dpr;
  };

  Input.prototype._setTextProperties = function(layer) {
    var dpr, ref;
    dpr = this._checkDevicePixelRatio();
    if (!this._isDesignLayer) {
      this._inputElement.style.fontFamily = layer.fontFamily;
      this._inputElement.style.fontSize = (layer.fontSize / dpr) + "px";
      this._inputElement.style.fontWeight = (ref = layer.fontWeight) != null ? ref : "normal";
      this._inputElement.style.paddingTop = (layer.padding.top * 2 / dpr) + "px";
      this._inputElement.style.paddingRight = (layer.padding.bottom * 2 / dpr) + "px";
      this._inputElement.style.paddingBottom = (layer.padding.right * 2 / dpr) + "px";
      this._inputElement.style.paddingLeft = (layer.padding.left * 2 / dpr) + "px";
    }
    this._inputElement.style.width = ((layer.width - layer.padding.left * 2) * 2 / dpr) + "px";
    this._inputElement.style.height = (layer.height * 2 / dpr) + "px";
    this._inputElement.style.outline = "none";
    this._inputElement.style.backgroundColor = "transparent";
    this._inputElement.style.cursor = "auto";
    this._inputElement.style.webkitAppearance = "none";
    this._inputElement.style.resize = "none";
    this._inputElement.style.overflow = "hidden";
    return this._inputElement.style.webkitFontSmoothing = "antialiased";
  };

  Input.prototype.addBackgroundLayer = function(layer) {
    this._background = layer;
    this._background.parent = this;
    this._background.name = "background";
    this._background.x = this._background.y = 0;
    this._background._element.appendChild(this._inputElement);
    return this._background;
  };

  Input.prototype.addPlaceHolderLayer = function(layer) {
    var dpr;
    this._isDesignLayer = true;
    this._inputElement.className = "input" + layer.id;
    this.padding = {
      left: 0,
      top: 0
    };
    this._setPlaceholder(layer.text);
    this._setTextProperties(layer);
    this._setPlaceholderColor(layer.id, layer.color);
    this.on("change:color", (function(_this) {
      return function() {
        return _this._setPlaceholderColor(layer.id, _this.color);
      };
    })(this));
    layer.visible = false;
    this._elementHTML.children[0].textContent = "";
    dpr = this._checkDevicePixelRatio();
    this._inputElement.style.fontSize = (layer.fontSize * 2 / dpr) + "px";
    this._inputElement.style.paddingTop = (layer.y * 2 / dpr) + "px";
    this._inputElement.style.paddingLeft = (layer.x * 2 / dpr) + "px";
    this._inputElement.style.width = ((this._background.width - layer.x * 2) * 2 / dpr) + "px";
    if (this.multiLine) {
      this._inputElement.style.height = (this._background.height * 2 / dpr) + "px";
    }
    this.on("change:padding", (function(_this) {
      return function() {
        _this._inputElement.style.paddingTop = (_this.padding.top * 2 / dpr) + "px";
        return _this._inputElement.style.paddingLeft = (_this.padding.left * 2 / dpr) + "px";
      };
    })(this));
    return this._placeholder;
  };

  Input.prototype.focus = function() {
    return this._inputElement.focus();
  };

  Input.define("value", {
    get: function() {
      return this._inputElement.value;
    },
    set: function(value) {
      return this._inputElement.value = value;
    }
  });

  Input.define("focusColor", {
    get: function() {
      return this._inputElement.style.color;
    },
    set: function(value) {
      return this._inputElement.style.color = value;
    }
  });

  Input.define("multiLine", Input.simpleProperty("multiLine", false));

  Input.wrap = function(background, placeholder, options) {
    return wrapInput(new this(options), background, placeholder, options);
  };

  Input.prototype.onEnterKey = function(cb) {
    return this.on(Events.EnterKey, cb);
  };

  Input.prototype.onSpaceKey = function(cb) {
    return this.on(Events.SpaceKey, cb);
  };

  Input.prototype.onBackspaceKey = function(cb) {
    return this.on(Events.BackspaceKey, cb);
  };

  Input.prototype.onCapsLockKey = function(cb) {
    return this.on(Events.CapsLockKey, cb);
  };

  Input.prototype.onShiftKey = function(cb) {
    return this.on(Events.ShiftKey, cb);
  };

  Input.prototype.onValueChange = function(cb) {
    return this.on(Events.ValueChange, cb);
  };

  Input.prototype.onInputFocus = function(cb) {
    return this.on(Events.InputFocus, cb);
  };

  Input.prototype.onInputBlur = function(cb) {
    return this.on(Events.InputBlur, cb);
  };

  return Input;

})(TextLayer);

wrapInput = function(instance, background, placeholder) {
  var input, ref;
  if (!(background instanceof Layer)) {
    throw new Error("InputLayer expects a background layer.");
  }
  if (!(placeholder instanceof TextLayer)) {
    throw new Error("InputLayer expects a text layer.");
  }
  input = instance;
  if (input.__framerInstanceInfo == null) {
    input.__framerInstanceInfo = {};
  }
  if ((ref = input.__framerInstanceInfo) != null) {
    ref.name = instance.constructor.name;
  }
  input.frame = background.frame;
  input.parent = background.parent;
  input.index = background.index;
  input.addBackgroundLayer(background);
  input.addPlaceHolderLayer(placeholder);
  return input;
};


},{}],"FFKit/components/Keyline/Keyline":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.Keyline = (function(superClass) {
  var keyline;

  extend(Keyline, superClass);

  keyline = key_line;

  function Keyline(opt1) {
    var opt;
    this.opt = opt1 != null ? opt1 : {};
    opt = _.defaults(this.opt, {
      width: keyline.width,
      height: keyline.height,
      backgroundColor: keyline.backgroundColor
    });
    Keyline.__super__.constructor.call(this, opt);
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
  }

  return Keyline;

})(Layer);


},{}],"FFKit/components/ListItem/ListItem":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.ListItem = (function(superClass) {
  extend(ListItem, superClass);

  function ListItem(opt) {
    var comp_frame, wide_type_frame;
    this.opt = opt != null ? opt : {};
    comp_frame = list_item;
    wide_type_frame = wide_list_item;
    this.text_frame = comp_frame.selectChild("text").copy();
    this.text_frame.props = {
      autoHeight: true
    };
    this.line_frame = comp_frame.selectChild("line").copy();
    this.flag_frame = new Layer;
    this.flag_frame.props = list_item_flag.selectChild("flag").props;
    switch (false) {
      case this.opt.right === "toggle":
        this.right_frame = new Layer;
        this.right_frame.props = comp_frame.selectChild("icon").props;
        break;
      case this.opt.right !== "toggle":
        this.right_frame = new iOSSwitch({
          isOn: true,
          x: list_item_toggle.selectChild("toggle").x,
          y: list_item_toggle.selectChild("toggle").y
        });
    }
    switch (false) {
      case this.opt.lineTop === void 0:
        this.lineTop_frame = comp_frame.selectChild("line").copy();
        this.lineTop_frame.y = 0;
    }
    ListItem.__super__.constructor.call(this, _.defaults(this.opt, {
      height: comp_frame.height,
      width: comp_frame.width,
      backgroundColor: comp_frame.backgroundColor
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    if (this.opt.line !== false) {
      this.line_frame.parent = this;
    } else {
      this.line_frame.destroy();
    }
    if (this.opt.right !== void 0 && this.opt.right !== false) {
      this.right_frame.parent = this;
    } else {
      this.right_frame.destroy();
    }
    if (this.opt.flag !== void 0) {
      this.flag_frame.parent = this;
    } else {
      this.flag_frame.destroy();
    }
    if (this.opt.lineTop !== void 0) {
      this.lineTop_frame.parent = this;
    }
    addChildren(this, [this.text_frame]);
    switch (this.opt.type) {
      case "wide":
        this.height = 77;
        this.text_frame.props = {
          fontFamily: wide_type_frame.selectChild("text").fontFamily,
          fontSize: wide_type_frame.selectChild("text").fontSize,
          y: wide_type_frame.selectChild("text").y
        };
        this.line_frame.props = {
          y: wide_type_frame.selectChild("line").y
        };
        this.flag_frame.y = Align.center(-4);
        this.right_frame.y = Align.center(-2);
        break;
      default:
        this.height = comp_frame.height;
    }
  }

  ListItem.define("text", {
    get: function() {
      return this.opt.text;
    },
    set: function(value) {
      this.opt.text = value;
      return this.text_frame.text = value;
    }
  });

  ListItem.define("line", {
    get: function() {
      return this.opt.line;
    },
    set: function(value) {
      if (value = "fullwidth") {
        this.line_frame.x = 0;
        return this.line_frame.width = Screen.width;
      }
    }
  });

  ListItem.define("lineTop", {
    get: function() {
      return this.opt.lineTop;
    },
    set: function(value) {
      if (value === "fullwidth") {
        this.lineTop_frame.x = 0;
        return this.lineTop_frame.width = Screen.width;
      }
    }
  });

  ListItem.define("right", {
    get: function() {
      return this.opt.right;
    },
    set: function(value) {
      this.opt.right = value;
      return this.right_frame.image = "modules/FFKit/assets/icons/" + value + ".svg";
    }
  });

  ListItem.define("flag", {
    get: function() {
      return this.opt.falg;
    },
    set: function(value) {
      this.opt.flag = value;
      this.flag_frame.image = "modules/FFKit/assets/flags/" + value + ".png";
      return this.text_frame.x = this.flag_frame.maxX + S_spacer;
    }
  });

  return ListItem;

})(Layer);


},{}],"FFKit/components/ListProductCard/ListProductCard":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.ListProductCard = (function(superClass) {
  var cmp_frame, descriptionPriceSpace, iconChangeState, priceParentSpace;

  extend(ListProductCard, superClass);

  cmp_frame = list_product_card;

  descriptionPriceSpace = cmp_frame.selectChild("price").y - list_product_card.selectChild("description").maxY;

  priceParentSpace = cmp_frame.height - cmp_frame.selectChild("price").maxY;

  function ListProductCard(opt) {
    var newHeight;
    this.opt = opt != null ? opt : {};
    this.cover_frame = cmp_frame.selectChild("image").copy();
    this.cover_frame.props = {
      autoHeight: true
    };
    this.season_frame = cmp_frame.selectChild("season").copy();
    this.season_frame.props = {
      autoHeight: true
    };
    this.brand_frame = cmp_frame.selectChild("brand").copy();
    this.brand_frame.props = {
      textTransform: "uppercase",
      fontFamily: "Polaris Condensed, AvenirNextCondensed-Regular",
      autoHeight: true
    };
    newHeight = this.brand_frame.height;
    this.description_frame = cmp_frame.selectChild("description").copy();
    this.description_frame.props = {
      autoHeight: true,
      y: this.brand_frame.maxY,
      fontFamily: "Polaris"
    };
    this.price_frame = cmp_frame.selectChild("price").copy();
    this.price_frame.props = {
      autoHeight: true,
      y: this.description_frame.maxY + descriptionPriceSpace
    };
    this.icon_frame = cmp_frame.selectChild("icon").copy();
    this.icon_frame.selectChild("wishlist.svg").destroy();
    this.icon_frame.props = {
      image: "modules/FFKit/assets/icons/wishlist.svg",
      opacity: 0.3
    };
    iconChangeState(this.icon_frame);
    ListProductCard.__super__.constructor.call(this, _.defaults(this.opt, {
      width: cmp_frame.width,
      height: cmp_frame.height,
      backgroundColor: cmp_frame.backgroundColor
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    addChildren(this, [this.cover_frame, this.season_frame, this.brand_frame, this.description_frame, this.price_frame, this.icon_frame]);
  }

  iconChangeState = function(layer) {
    return layer.onTap(function() {
      if (this.opacity < 1) {
        return this.animate({
          opacity: 1,
          options: {
            time: 0.2
          }
        });
      } else {
        return this.animate({
          opacity: 0.3,
          options: {
            time: 0.2
          }
        });
      }
    });
  };

  ListProductCard.define("cover", {
    get: function() {
      return this.opt.cover;
    },
    set: function(value) {
      this.opt.cover = value;
      return this.cover_frame.image = value;
    }
  });

  ListProductCard.define("season", {
    get: function() {
      return this.opt.season;
    },
    set: function(value) {
      this.opt.season = value;
      return this.season_frame.text = value;
    }
  });

  ListProductCard.define("brand", {
    get: function() {
      return this.opt.brand;
    },
    set: function(value) {
      this.opt.brand = value;
      this.brand_frame.text = value;
      this.description_frame.y = this.brand_frame.maxY;
      return this.price_frame.y = this.description_frame.maxY + descriptionPriceSpace;
    }
  });

  ListProductCard.define("description", {
    get: function() {
      return this.opt.description;
    },
    set: function(value) {
      if (value === false || "") {
        this.description_frame.height = 1;
        return this.price_frame.y = this.description_frame.maxY + descriptionPriceSpace;
      } else {
        this.opt.description = value;
        this.description_frame.text = value;
        return this.price_frame.y = this.description_frame.maxY + descriptionPriceSpace;
      }
    }
  });

  ListProductCard.define("price", {
    get: function() {
      return this.opt.price;
    },
    set: function(value) {
      this.opt.price = value;
      return this.price_frame.text = value;
    }
  });

  ListProductCard.define("icon", {
    get: function() {
      return this.opt.icon;
    },
    set: function(value) {
      this.opt.icon = "modules/FFKit/assets/icons/" + value + ".svg";
      this.icon_frame.image = "modules/FFKit/assets/icons/" + value + ".svg";
      return iconChangeState(this.icon_frame);
    }
  });

  return ListProductCard;

})(Layer);


},{}],"FFKit/components/ListRadioSelect/ListRadioSelect":[function(require,module,exports){

/*
radioSelect = new ListRadioSelect
	selectArray: [
		{text : "List Item 1"}, 
		{text : "List Item 2", on : true}
		{text: "List Item 3"}
		]
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.ListRadioSelect = (function(superClass) {
  extend(ListRadioSelect, superClass);

  function ListRadioSelect(opt1) {
    var i, j, opt, ref;
    this.opt = opt1 != null ? opt1 : {};
    opt = _.defaults(this.opt, ListRadioSelect.__super__.constructor.apply(this, arguments));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.list = new Layer({
      backgroundColor: new Color("transparent"),
      name: "ListRadioSelect"
    });
    this.listArray = [];
    for (i = j = 0, ref = this.opt.selectArray.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      this.listItem = new ListItem({
        parent: this.list,
        text: this.opt.selectArray[i].text,
        right: "radio-off"
      });
      this.listItem.states.on = {
        right: "radio-on"
      };
      this.listItem.states.off = {
        right: "radio-off"
      };
      this.listItem.y = this.listItem.height * i;
      if (this.opt.selectArray[i].on === true) {
        this.listItem.stateSwitch("on");
      }
      this.listArray.push(this.listItem);
      this.listItem.onTap((function(_this) {
        return function(event, layer) {
          var k, ref1;
          for (i = k = 0, ref1 = _this.listArray.length; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
            _this.listArray[i].stateSwitch("off");
          }
          return layer.stateSwitch("on");
        };
      })(this));
    }
    this.list.height = this.listArray.length * this.listItem.height;
    this.list.parent = this;
    this.height = this.list.height;
  }

  return ListRadioSelect;

})(Layer);


},{}],"FFKit/components/ListTitle/ListTitle":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.ListTitle = (function(superClass) {
  extend(ListTitle, superClass);

  function ListTitle(opt) {
    var comp_frame;
    this.opt = opt != null ? opt : {};
    comp_frame = list_title;
    this.text_frame = comp_frame.selectChild("text").copy();
    ListTitle.__super__.constructor.call(this, _.defaults(this.opt, {
      height: comp_frame.height,
      width: comp_frame.width,
      backgroundColor: comp_frame.backgroundColor
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.text_frame.parent = this;
  }

  ListTitle.define("text", {
    get: function() {
      return this.opt.text;
    },
    set: function(value) {
      this.opt.text = value;
      return this.text_frame.text = value;
    }
  });

  return ListTitle;

})(Layer);


},{}],"FFKit/components/MeContactUs/MeContactUs":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.MeContactUs = (function(superClass) {
  extend(MeContactUs, superClass);

  function MeContactUs(opt) {
    var contactUs_frame;
    this.opt = opt != null ? opt : {};
    contactUs_frame = contact_us;
    this.contactUs_frame = contactUs_frame.copy();
    this.contactUs_frame.props = {
      x: 0,
      y: 0
    };
    MeContactUs.__super__.constructor.call(this, _.defaults(this.opt, {
      height: contactUs_frame.height,
      width: contactUs_frame.width
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.contactUs_frame.parent = this;
  }

  return MeContactUs;

})(Layer);


},{}],"FFKit/components/MeSignIn/MeSignIn":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.MeSignIn = (function(superClass) {
  extend(MeSignIn, superClass);

  function MeSignIn(opt) {
    var comp_frame;
    this.opt = opt != null ? opt : {};
    comp_frame = me_sign_in;
    this.meSignIn_frame = comp_frame.copy();
    this.meSignIn_frame.props = {
      x: 0,
      y: 0
    };
    MeSignIn.__super__.constructor.call(this, _.defaults(this.opt, {
      height: comp_frame.height,
      width: comp_frame.width
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.meSignIn_frame.parent = this;
  }

  return MeSignIn;

})(Layer);


},{}],"FFKit/components/PosBanner/PosBanner":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.PosBanner = (function(superClass) {
  extend(PosBanner, superClass);

  function PosBanner(opt) {
    var comp_frame;
    this.opt = opt != null ? opt : {};
    comp_frame = pos_banner;
    this.text_frame = comp_frame.selectChild("text").copy();
    PosBanner.__super__.constructor.call(this, _.defaults(this.opt, {
      height: comp_frame.height,
      width: comp_frame.width,
      backgroundColor: comp_frame.backgroundColor
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.text_frame.parent = this;
  }

  PosBanner.define("text", {
    get: function() {
      return this.opt.text;
    },
    set: function(value) {
      this.opt.text = value;
      return this.text_frame.text = value;
    }
  });

  return PosBanner;

})(Layer);


},{}],"FFKit/components/ProductCard/ProductCard":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.ProductCard = (function(superClass) {
  var BrandDescriptionSpase, DescriptionPriceSpase, brandText, descriptionText, priceText, productCard;

  extend(ProductCard, superClass);

  productCard = swipe_product_card;

  brandText = productCard.selectChild("brand");

  descriptionText = productCard.selectChild("short_description");

  priceText = productCard.selectChild("price");

  BrandDescriptionSpase = descriptionText.y - brandText.maxY;

  DescriptionPriceSpase = priceText.y - descriptionText.maxY;

  function ProductCard(opt1) {
    var opt;
    this.opt = opt1 != null ? opt1 : {};
    opt = _.defaults(this.opt, {
      width: productCard.width,
      height: productCard.height,
      backgroundColor: "white",
      cover: "modules/FFKit/content/default/products/women/01.jpg",
      brandText: brandText.text,
      descriptionText: descriptionText.text,
      priceText: priceText.text
    });
    ProductCard.__super__.constructor.call(this, opt);
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.prodBackgroud = productCard.selectChild("prod_background").copy();
    this.prodBackgroud.props = {
      parent: this
    };
    this.prodBackgroud.selectChild("image").props = {
      style: {
        "mix-blend-mode": "multiply"
      },
      image: this.opt.cover
    };
    this.wishlist = productCard.selectChild("wishlist-ico").copy();
    this.wishlist.props = {
      parent: this
    };
    this.brand = brandText.copy();
    this.brand.props = {
      parent: this,
      fontFamily: brandText.fontFamily,
      fontWeight: brandText.fontWeight,
      text: this.opt.brandText,
      textTransform: "uppercase",
      frame: brandText.frame
    };
    this.short_description = descriptionText.copy();
    this.short_description.props = {
      autoHeight: true,
      parent: this,
      fontSize: descriptionText.fontSize + 1,
      fontFamily: descriptionText.fontFamily,
      fontWeight: descriptionText.fontWeight,
      text: this.opt.descriptionText,
      y: this.brand.maxY + BrandDescriptionSpase
    };
    this.price = priceText.copy();
    this.price.props = {
      autoHeight: true,
      parent: this,
      fontFamily: priceText.fontFamily,
      fontWeight: priceText.fontWeight,
      text: this.opt.priceText,
      y: this.short_description.maxY + DescriptionPriceSpase
    };
    this.short_description.fontSize = descriptionText.fontSize;
  }

  ProductCard.define('cover', {
    get: function() {
      return this.opt.cover;
    },
    set: function(value) {
      if (!!this.children.length) {
        return this.selectChild("image").image = value;
      }
    }
  });

  ProductCard.define('brandText', {
    get: function() {
      return this.opt.brandText;
    },
    set: function(value) {
      if (!!this.children.length) {
        this.opt.brandText = value;
        return this.brand.text = value;
      }
    }
  });

  ProductCard.define('descriptionText', {
    get: function() {
      return this.opt.descriptionText;
    },
    set: function(value) {
      if (!!this.children.length) {
        this.opt.descriptionText = value;
        this.short_description.text = value;
        return this.price.y = this.short_description.maxY + DescriptionPriceSpase;
      }
    }
  });

  ProductCard.define('priceText', {
    get: function() {
      return this.opt.priceText;
    },
    set: function(value) {
      if (!!this.children.length) {
        this.opt.priceText = value;
        return this.price.text = value;
      }
    }
  });

  return ProductCard;

})(Layer);


},{}],"FFKit/components/ProductSlider/ProductSlider":[function(require,module,exports){
var selectImage,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

selectImage = require('../../helper-functions/private/selectImage.coffee').selectImage;

window.ProductSlider = (function(superClass) {
  extend(ProductSlider, superClass);

  function ProductSlider(opt) {
    var currentX, i, j, prodCard, ref;
    this.opt = opt != null ? opt : {};
    ProductSlider.__super__.constructor.call(this, _.defaults(this.opt, {
      width: Screen.width,
      height: swipe_product_card.height,
      scrollVertical: false,
      originX: 0.5,
      directionLock: true,
      array: false,
      paddingLeft: false
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.emptySpace = new Layer({
      name: "emptySpace",
      width: this.opt.paddingLeft,
      backgroundColor: null
    });
    this.addPage(this.emptySpace);
    if (this.opt.array) {
      for (i = j = 0, ref = this.opt.array.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        currentX = this.content.children[i].maxX + S_spacer;
        this.prodCard = new ProductCard({
          name: "product card",
          parent: this.content,
          x: currentX,
          brandText: this.opt.array[i].brand.name,
          descriptionText: this.opt.array[i].shortDescription,
          priceText: this.opt.array[i].price,
          cover: useExternalImages ? window.selectImage(this.opt.array[i].images) : Utils.randomChoice(womenPoroducts)
        });
        this.prodCard.onTap(function() {
          return print("Product tap");
        });
      }
    } else {
      prodCard = new ProductCard({
        parent: this.content,
        x: S_spacer + this.emptySpace.maxX
      });
      prodCard.onTap(function() {
        return print("Product tap");
      });
    }
    this.showMoreCard = new Layer({
      name: "ShowMoreСard",
      width: 198,
      height: this.height,
      backgroundColor: "white"
    });
    this.buttonShowMore = new Button({
      name: "Show more btn",
      text: "Show more",
      type: "flat",
      icon: "arrow-right",
      iconAlign: "right",
      parent: this.showMoreCard,
      width: 134,
      midX: this.showMoreCard.midX,
      midY: this.showMoreCard.midY
    });
    this.addPage(this.showMoreCard);
  }

  return ProductSlider;

})(PageComponent);


},{"../../helper-functions/private/selectImage.coffee":"FFKit/helper-functions/private/selectImage"}],"FFKit/components/RefineFilter/RefineFilter":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.RefineFilter = (function(superClass) {
  var foldedBtnWidth, spaceBetweenitems, updateBtnWidth;

  extend(RefineFilter, superClass);

  foldedBtnWidth = refine_button.selectChild("refine_button_icon").width + 16;

  spaceBetweenitems = refine_filter.selectChild("refine_filter_item_2").x - refine_filter.selectChild("refine_filter_item").maxX;

  function RefineFilter(opt) {
    var currentX, i, itemArray, j, lastArrayChild, len, newX, ref, refineAmount, refineBtn;
    this.opt = opt;
    RefineFilter.__super__.constructor.call(this, _.defaults(this.opt, {
      height: refine_filter.height,
      width: Screen.width,
      backgroundColor: refine_filter.backgroundColor,
      itemsArray: ["item #1", "long item #2", "item #3", "item #4", "item #5"]
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    refineAmount = null != null ? null : this.opt.refineAmount;
    this.refineBtn = refineBtn = refine_button.copy();
    this.refineBtn.props = {
      parent: this
    };
    this.btnText = this.refineBtn.selectChild("refine_button_text");
    this.btnText.props = {
      text: (function() {
        switch (refineAmount) {
          case null:
          case void 0:
            return "Refine";
          default:
            return "Refine (" + refineAmount + ")";
        }
      })(),
      autoSize: true,
      fontFamily: this.btnText.fontFamily,
      textAlign: "left"
    };
    updateBtnWidth(this);
    this.scrollCmp = new ScrollComponent({
      parent: this,
      x: this.refineBtn.maxX + (refine_filter.selectChild("refine_filter_item").x - refine_button.maxX),
      height: this.height,
      width: Screen.width - (foldedBtnWidth + 20),
      scrollVertical: false,
      scrollHorizontal: false,
      contentInset: {
        right: spaceBetweenitems
      }
    });
    ref = this.opt.itemsArray;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      itemArray = ref[i];
      this.item = new Button({
        parent: this.scrollCmp.content,
        name: "" + itemArray,
        type: "tag",
        text: this.opt.itemsArray[i],
        y: refine_filter.selectChild("refine_filter_item").y,
        x: currentX
      });
      currentX = this.item.maxX + spaceBetweenitems;
    }
    lastArrayChild = this.scrollCmp.content.children[this.scrollCmp.content.children.length - 1];
    if (lastArrayChild.maxX > Screen.width) {
      this.scrollCmp.scrollHorizontal = true;
    }
    this.scrollCmp.x = newX = this.refineBtn.maxX + (refine_filter.selectChild("refine_filter_item").x - refine_button.maxX);
    this.scrollCmp.states = {
      stateA: {
        x: foldedBtnWidth + 20,
        width: this.scrollCmp.width
      },
      stateB: {
        x: newX
      },
      animationOptions: {
        time: 0.2
      }
    };
    this.refineBtn.selectChild("refine_button_text").states = {
      stateA: {
        opacity: 0
      },
      stateB: {
        opacity: 1
      },
      animationOptions: {
        time: 0.2
      }
    };
    this.refineBtn.states = {
      stateA: {
        width: foldedBtnWidth
      },
      stateB: {
        width: this.refineBtn.selectChild("refine_button_text").width + refine_button.selectChild("refine_button_icon").width + (refine_button.width - (refine_button.selectChild("refine_button_icon").width + refine_button.selectChild("refine_button_text").width))
      },
      animationOptions: {
        time: 0.2
      }
    };
    this.scrollCmp.content.on("change:x", function() {
      if (this.x < -10 && this.parent.parent.refineBtn.selectChild("refine_button_text").opacity === 1) {
        this.parent.parent.refineBtn.selectChild("refine_button_text").animate("stateA");
        this.parent.parent.refineBtn.animate("stateA");
        return this.parent.animate("stateA");
      } else if (this.x > -10 && this.parent.states.current.name === "stateA") {
        this.parent.parent.refineBtn.selectChild("refine_button_text").animate("stateB");
        this.parent.parent.refineBtn.animate("stateB");
        return this.parent.animate("stateB");
      }
    });
  }

  updateBtnWidth = function(parent) {
    var btn, refIcon, refText, thisText;
    btn = parent.refineBtn;
    thisText = btn.selectChild("refine_button_text");
    refText = refine_button.selectChild("refine_button_text");
    refIcon = refine_button.selectChild("refine_button_icon");
    return btn.width = thisText.width + refIcon.width + refIcon.x + (refine_button.width - refText.maxX) + (refText.x - refIcon.maxX);
  };

  RefineFilter.prototype.selected = function(value) {
    var newWidth, newX;
    this.btnText.text = (function() {
      switch (value) {
        case null:
        case void 0:
        case 0:
          return "Refine";
        default:
          return "Refine (" + value + ")";
      }
    })();
    updateBtnWidth(this);
    newWidth = this.refineBtn.width;
    this.scrollCmp.x = newX = this.refineBtn.maxX + (refine_filter.selectChild("refine_filter_item").x - refine_button.maxX);
    this.scrollCmp.states = {
      stateA: {
        x: foldedBtnWidth + 20,
        width: this.scrollCmp.width
      },
      stateB: {
        x: newX
      },
      animationOptions: {
        time: 0.2
      }
    };
    this.refineBtn.selectChild("refine_button_text").states = {
      stateA: {
        opacity: 0
      },
      stateB: {
        opacity: 1
      },
      animationOptions: {
        time: 0.2
      }
    };
    this.refineBtn.states = {
      stateA: {
        width: foldedBtnWidth
      },
      stateB: {
        width: this.refineBtn.selectChild("refine_button_text").width + refine_button.selectChild("refine_button_icon").width + (refine_button.width - (refine_button.selectChild("refine_button_icon").width + refine_button.selectChild("refine_button_text").width))
      },
      animationOptions: {
        time: 0.2
      }
    };
    return this.scrollCmp.content.on("change:x", function() {
      if (this.x < -10 && this.parent.parent.refineBtn.selectChild("refine_button_text").opacity === 1) {
        this.parent.parent.refineBtn.selectChild("refine_button_text").animate("stateA");
        this.parent.parent.refineBtn.animate("stateA");
        return this.parent.animate("stateA");
      } else if (this.x > -10 && this.parent.states.current.name === "stateA") {
        this.parent.parent.refineBtn.selectChild("refine_button_text").animate("stateB");
        this.parent.parent.refineBtn.animate("stateB");
        return this.parent.animate("stateB");
      }
    });
  };

  return RefineFilter;

})(Layer);


},{}],"FFKit/components/SearchInput/SearchInput":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.SearchInput = (function(superClass) {
  var cmp_frame;

  extend(SearchInput, superClass);

  cmp_frame = search_input_frame;

  function SearchInput(opt) {
    var cmpSidePaddings, css;
    this.opt = opt != null ? opt : {};
    SearchInput.__super__.constructor.call(this, _.defaults(this.opt, {
      width: Screen.width,
      height: cmp_frame.height,
      backgroundColor: cmp_frame.backgroundColor,
      placeholder: "Search for something"
    }));
    cmpSidePaddings = cmp_frame.width - cmp_frame.selectChild("input").width;
    this.inputWrap = cmp_frame.selectChild("input").copy();
    this.inputWrap.props = {
      parent: this,
      width: this.width - cmpSidePaddings
    };
    this.inputWrap.selectChild("search_placeholder").autoHeight = true;
    this.inputFrame = new Layer({
      name: "input wrap",
      parent: this.inputWrap,
      y: this.inputWrap.selectChild("search_placeholder").y,
      x: this.inputWrap.selectChild("search_placeholder").x,
      backgroundColor: null,
      width: this.inputWrap.selectChild("search_placeholder").width,
      height: this.inputWrap.selectChild("search_placeholder").height,
      html: "<input\n	class = 'search-input-cmp'\n	placeholder = '" + this.opt.placeholder + "'>\n</input>",
      style: {
        "position": "relative"
      }
    });
    css = ".search-input-cmp {\n	position: absolute;\n	top: 0;\n	width: " + (this.inputWrap.selectChild("search_placeholder").width) + "px;\n	height: " + (this.inputWrap.selectChild("search_placeholder").height) + "px;\n	font-size: 15px;\n	line-height: 1.5;\n	background-color: transparent;\n	font-family: \"Polaris-Book\", \"Polaris\", sans-serif';\n	text-rendering: optimizeLegibility;\n	-webkit-font-smoothing: antialiased;\n}\n.search-input-cmp::-webkit-input-placeholder {\n	color: " + (this.inputWrap.selectChild("search_placeholder").color) + ";\n}\n:focus {\n  outline: none;\n}";
    Utils.insertCSS(css);
    this.inputWrap.selectChild("search_placeholder").destroy();
    this.input = document.body.querySelector('#search-input-cmp');
  }

  return SearchInput;

})(Layer);


},{}],"FFKit/components/Selector/Selector":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.Selector = (function(superClass) {
  var cmp_frame;

  extend(Selector, superClass);

  cmp_frame = selector;

  function Selector(opt) {
    this.opt = opt != null ? opt : {};
    Selector.__super__.constructor.call(this, _.defaults(this.opt, {
      name: "Selector",
      width: cmp_frame.width,
      height: cmp_frame.height,
      backgroundColor: cmp_frame.backgroundColor,
      placeholderText: "Placeholder",
      value: false
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    if (this.opt.labelText) {
      this.labelText = cmp_frame.selectChild("selector_label").copy();
      this.labelText.props = {
        parent: this,
        text: this.opt.labelText,
        autoHeight: true
      };
    }
    if (this.opt.helperText) {
      this.helperText = cmp_frame.selectChild("helper_text").copy();
      this.helperText.props = {
        parent: this,
        text: this.opt.helperText,
        autoHeight: true
      };
    }
    this.selector_frame = cmp_frame.selectChild("input").copy();
    this.selector_frame.props = {
      width: this.width - M_spacer * 2,
      parent: this,
      y: this.opt.labelText ? cmp_frame.selectChild("input").y : 0
    };
    this.selectChild("placeholder").autoHeight = true;
    this.selector_frame.selectChild("dropdawn_btn").x = Align.right(2);
    this.selectChild("placeholder").text = this.opt.placeholderText;
    if (this.opt.value) {
      this.selectChild("placeholder").props = {
        color: "#222222",
        text: this.opt.value
      };
    }
    this.height = this.opt.helperText ? this.helperText.maxY + M_spacer : this.selector_frame.maxY + M_spacer;
  }

  Selector.define("placeholderText", {
    get: function() {
      return this.opt.placeholderText;
    },
    set: function(value) {
      this.opt.placeholderText = value;
      if (!!this.children.length) {
        return this.selectChild("placeholder").text = value;
      }
    }
  });

  Selector.define("value", {
    get: function() {
      return this.opt.value;
    },
    set: function(value) {
      this.opt.value = value;
      if (!!this.children.length) {
        return this.selectChild("placeholder").props = {
          color: "#222222",
          text: value
        };
      }
    }
  });

  return Selector;

})(Layer);


},{}],"FFKit/components/StatusBar/StatusBar":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.StatusBar = (function(superClass) {
  var updateTimeFoo;

  extend(StatusBar, superClass);

  function StatusBar(opt) {
    var currentTime;
    this.opt = opt != null ? opt : {};
    StatusBar.__super__.constructor.call(this, _.defaults(this.opt, {
      x: 0,
      y: 0,
      width: Screen.width,
      height: Framer.Device.deviceType === "apple-iphone-x-space-gray" ? 44 : 20,
      backgroundColor: "white",
      updateTime: false,
      signalIcon: "signal",
      wifiIcon: "wifi",
      batteryIcon: "battery"
    }, currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.style = {
      "filter": "invert(0)",
      "position": "absolute",
      "z-index": 99999
    };
    if (Framer.Device.deviceType === "apple-iphone-x-space-gray") {
      this.time = new TextLayer({
        name: "time",
        parent: this,
        color: this.opt.timeColor,
        text: currentTime,
        fontWeight: 700,
        fontSize: 15,
        lineHeight: 1,
        color: "black",
        x: 28,
        y: 16,
        textAlign: "center"
      });
      this.signal = new Layer({
        name: "signal",
        parent: this,
        width: 17,
        height: 12,
        x: Align.right(-64),
        y: 18,
        image: "modules/FFKit/components/StatusBar/assets/" + this.opt.signalIcon + ".svg"
      });
      this.wifi = new Layer({
        name: "wifi",
        parent: this,
        width: 15,
        height: 12,
        x: Align.right(-44),
        y: 18,
        image: "modules/FFKit/components/StatusBar/assets/" + this.opt.wifiIcon + ".svg"
      });
      this.battery = new Layer({
        name: "battery",
        parent: this,
        width: 25,
        height: 12,
        x: Align.right(-14),
        y: 18,
        image: "modules/FFKit/components/StatusBar/assets/" + this.opt.batteryIcon + ".svg"
      });
    } else {
      this.signal = new Layer({
        name: "signal",
        parent: this,
        width: 15,
        height: 9,
        x: 7,
        y: 5,
        image: "modules/FFKit/components/StatusBar/assets/" + this.opt.signalIcon + ".svg"
      });
      this.wifi = new Layer({
        name: "wifi",
        parent: this,
        width: 13,
        height: 9,
        x: 28,
        y: 5,
        image: "modules/FFKit/components/StatusBar/assets/" + this.opt.wifiIcon + ".svg"
      });
      this.time = new TextLayer({
        name: "time",
        parent: this,
        color: this.opt.timeColor,
        text: currentTime,
        fontWeight: 700,
        fontSize: 12,
        lineHeight: 1,
        color: "black",
        x: Align.center,
        y: 4,
        textAlign: "center"
      });
      this.battery = new Layer({
        name: "battery",
        parent: this,
        width: 24,
        height: 10.5,
        x: Align.right(-4),
        y: 5,
        image: "modules/FFKit/components/StatusBar/assets/" + this.opt.batteryIcon + ".svg"
      });
      this.batteryPercentage = new TextLayer({
        name: "time",
        parent: this,
        color: this.opt.timeColor,
        text: "100%",
        fontWeight: 500,
        fontSize: 12,
        lineHeight: 1,
        color: "black",
        x: Align.right(-32),
        y: 4,
        textAlign: "center"
      });
    }
    updateTimeFoo(this.opt.updateTime, this.time);
  }

  updateTimeFoo = function(val, timeLayer) {
    if (val) {
      return Utils.interval(1, function() {
        return timeLayer.text = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });
      });
    }
  };

  StatusBar.prototype.switchMode = function(time) {
    if (time == null) {
      time = 0.2;
    }
    this.style["transition"] = "all " + time + "s";
    if (this.style["filter"] === "invert(0)") {
      return this.style["filter"] = "invert(1)";
    } else {
      return this.style["filter"] = "invert(0)";
    }
  };

  return StatusBar;

})(Layer);


},{}],"FFKit/components/Tabbar/Tabbar":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.Tabbar = (function(superClass) {
  var cmp, defaultOpacity;

  extend(Tabbar, superClass);

  if (Framer.Device.deviceType === "apple-iphone-x-space-gray") {
    cmp = tab_bar_x;
  } else {
    cmp = tab_bar;
  }

  defaultOpacity = cmp.children[2].opacity;

  function Tabbar(opt) {
    var child, i, k, len, ref;
    this.opt = opt != null ? opt : {};
    this.tabbar_item = cmp.copy();
    this.tabbar_item.props = {
      x: 0,
      y: 0
    };
    Tabbar.__super__.constructor.call(this, _.defaults(this.opt, {
      height: cmp.height,
      width: cmp.width,
      y: Align.bottom
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.tabbar_item.parent = this;
    ref = this.tabbar_item.children;
    for (i = k = 0, len = ref.length; k < len; i = ++k) {
      child = ref[i];
      child.onTap(function() {
        var j, l, len1, ref1;
        ref1 = this.parent.children;
        for (l = 0, len1 = ref1.length; l < len1; l++) {
          j = ref1[l];
          j.opacity = defaultOpacity;
        }
        return this.animate({
          opacity: 1,
          options: {
            curve: "ease-out",
            time: 0.2
          }
        });
      });
    }
  }

  Tabbar.define("activeItem", {
    get: function() {
      return this.opt.activeItem;
    },
    set: function(value) {
      var child, i, k, len, ref;
      ref = this.tabbar_item.children;
      for (i = k = 0, len = ref.length; k < len; i = ++k) {
        child = ref[i];
        child.opacity = this.tabbar_item.children[2].opacity;
      }
      this.opt.activeItem = value;
      return this.tabbar_item.selectChild(value).opacity = 1;
    }
  });

  return Tabbar;

})(Layer);


},{}],"FFKit/components/Tabs/Tabs":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.Tabs = (function(superClass) {
  var cmp_comp, i, item, itemsArr, j, len, ref;

  extend(Tabs, superClass);

  cmp_comp = tabs_frame;

  itemsArr = [];

  ref = cmp_comp.selectChild("items").children;
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    item = ref[i];
    itemsArr.push(item.name);
  }

  function Tabs(opt) {
    var btnsArr, childrenLength, k, l, len1, len2, newItemName, newXpos, parent, ref1, ref2;
    this.opt = opt != null ? opt : {};
    Tabs.__super__.constructor.call(this, _.defaults(this.opt, {
      width: Screen.width,
      height: cmp_comp.height,
      backgroundColor: "white",
      items: itemsArr
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this);
    }
    childrenLength = this.opt.items.length;
    btnsArr = [];
    this.underline = cmp_comp.selectChild("underline").copy();
    parent = this;
    this.newItemsArr = [];
    ref1 = this.opt.items;
    for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
      item = ref1[i];
      newItemName = item.split(' ').join('_');
      this["" + newItemName] = new Layer({
        name: item,
        parent: this,
        width: cmp_comp.width / this.opt.items.length,
        backgroundColor: null,
        x: newXpos,
        height: this.height
      });
      this["" + newItemName]["text"] = new TextLayer({
        parent: this["" + newItemName]
      });
      this["" + newItemName]["text"].props = cmp_comp.selectChild("items").children[0].props;
      this["" + newItemName]["text"].props = {
        name: "text",
        textTransform: "uppercase",
        text: item
      };
      this["" + newItemName]["text"].x = Align.center;
      newXpos = this["" + newItemName].maxX;
      this.newItemsArr.push(this["" + newItemName]);
    }
    this.underline.props = {
      parent: this,
      x: this.newItemsArr[0].children[0].x,
      width: this.newItemsArr[0].children[0].width
    };
    this.currentItem = this.newItemsArr[0].children[0].text;
    ref2 = this.newItemsArr;
    for (i = l = 0, len2 = ref2.length; l < len2; i = ++l) {
      item = ref2[i];
      this.newItemsArr[i].onTap(function() {
        parent.currentItem = this.children[0].text;
        return parent.underline.animate({
          midX: this.midX,
          width: this.children[0].width,
          options: {
            curve: Spring({
              damping: 0.8
            }),
            time: 0.4
          }
        });
      });
    }
  }

  return Tabs;

})(Layer);


},{}],"FFKit/components/iOSSwitch/iOSSwitch":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Events.SwitchValueChange = "switchValueChange";

window.iOSSwitch = (function(superClass) {
  var toggle_frame;

  extend(iOSSwitch, superClass);

  toggle_frame = list_item_toggle.selectChild("toggle");

  function iOSSwitch(opt) {
    this.opt = opt != null ? opt : {};
    this.opt = _.defaults({}, this.opt, {
      width: toggle_frame.width,
      height: toggle_frame.height,
      backgroundColor: new Color("transparent"),
      isOn: false
    });
    iOSSwitch.__super__.constructor.call(this, this.opt);
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.base = new Layer({
      name: ".base",
      parent: this,
      width: this.width,
      height: this.height,
      backgroundColor: "#e6e6e6",
      borderRadius: 16
    });
    this.base.states.on = {
      borderWidth: 0,
      backgroundColor: "#222222"
    };
    this.base.animationOptions = {
      time: 0.6,
      curve: Spring({
        damping: 0.75
      })
    };
    this.thumb = new Layer({
      name: ".thumb",
      parent: this,
      width: 27,
      height: 27,
      borderRadius: 14.5,
      x: 2,
      y: 2,
      backgroundColor: "white"
    });
    this.thumb.states.on = {
      x: 23
    };
    this.thumb.animationOptions = {
      time: 0.6,
      curve: Spring({
        damping: 0.8
      })
    };
    this.thumbFill = new Layer({
      name: "thumbFill",
      parent: this.thumb,
      x: 0.5,
      y: 0.5,
      width: 27,
      height: 27,
      borderRadius: 14,
      backgroundColor: this.thumbTintColor,
      shadow1: {
        y: 3,
        blur: 8,
        color: "rgba(0,0,0,0.15)"
      }
    });
    if (this.isOn) {
      this.base.stateSwitch("on");
      this.thumb.stateSwitch("on");
    }
    this.onClick(function() {
      return this.setOn(!this.isOn, true);
    });
  }

  iOSSwitch.define("tintColor", {
    get: function() {
      return this._tintColor;
    },
    set: function(value) {
      this._tintColor = value;
      return this._updateTintColor();
    }
  });

  iOSSwitch.define("thumbTintColor", {
    get: function() {
      return this._thumbTintColor;
    },
    set: function(value) {
      this._thumbTintColor = value;
      return this._updateThumb();
    }
  });

  iOSSwitch.define("isOn", {
    get: function() {
      return this._isOn;
    },
    set: function(value) {
      return this._isOn = value;
    }
  });

  iOSSwitch.prototype.setOn = function(switchOn, animated) {
    this.isOn = switchOn;
    animated = animated != null ? animated : true;
    if (this.isOn) {
      if (animated) {
        this.base.animate("on");
        this.thumb.animate("on");
      } else {
        this.base.stateSwitch("on");
        this.thumb.stateSwitch("on");
      }
    } else {
      if (animated) {
        this.base.animate("default");
        this.thumb.animate("default");
      } else {
        this.base.stateSwitch("default");
        this.thumb.stateSwitch("default");
      }
    }
    return this.emit(Events.SwitchValueChange, this.isOn);
  };

  iOSSwitch.prototype._updateTintColor = function() {
    if (this.base) {
      if (this.isOn) {
        return this.base.stateSwitch("on");
      }
    }
  };

  iOSSwitch.prototype.onValueChange = function(cb) {
    return this.on(Events.SwitchValueChange, cb);
  };

  return iOSSwitch;

})(Layer);


},{}],"FFKit/helper-functions/addChildren":[function(require,module,exports){
window.addChildren = function(parent, childrenArray) {
  var children, i, j, len, results;
  results = [];
  for (i = j = 0, len = childrenArray.length; j < len; i = ++j) {
    children = childrenArray[i];
    results.push(children.parent = parent);
  }
  return results;
};


},{}],"FFKit/helper-functions/positionAfter":[function(require,module,exports){
window.positionAfter = function(after, frame, offset) {
  if (offset == null) {
    offset = 0;
  }
  frame.parent = after.parent;
  return frame.y = after.maxY + offset;
};


},{}],"FFKit/helper-functions/private/generateDots":[function(require,module,exports){
exports.generateDots = function(sliderUnit, array, yPos) {
  var current, defaultDots, dot, dotValues, dotsArray, dotsContainer, ii, j, ref;
  dotsContainer = new Layer({
    name: "dotsContainer",
    width: sliderUnit.width,
    height: 6,
    x: Align.center,
    y: Align.bottom(-20),
    backgroundColor: "",
    parent: sliderUnit
  });
  dotsArray = [];
  for (ii = j = 0, ref = array.length; 0 <= ref ? j < ref : j > ref; ii = 0 <= ref ? ++j : --j) {
    dot = new Layer({
      parent: dotsContainer,
      size: dotsContainer.height,
      borderRadius: dotsContainer.height,
      x: (dotsContainer.height + 10) * ii,
      name: ii
    });
    dotValues = {
      dot: dot,
      colour: array[ii].dotsColour
    };
    dotsArray.push(dotValues);
    defaultDots = function(slideColor) {
      var i, k, len, results;
      results = [];
      for (k = 0, len = dotsArray.length; k < len; k++) {
        i = dotsArray[k];
        i.dot.opacity = 0.2;
        if (slideColor === "white") {
          results.push(i.dot.backgroundColor = "#ffffff");
        } else {
          results.push(i.dot.backgroundColor = "#000000");
        }
      }
      return results;
    };
    current = sliderUnit.horizontalPageIndex(sliderUnit.currentPage);
    defaultDots(dotsArray[current].colour);
    dotsArray[current].dot.opacity = 1;
  }
  dotsContainer.width = dotsArray.length * (dotsContainer.height + 10);
  dotsContainer.midX = Screen.midX;
  return sliderUnit.on("change:currentPage", function(event, layer) {
    current = layer.horizontalPageIndex(layer.currentPage);
    defaultDots(dotsArray[current].colour);
    return dotsArray[current].dot.opacity = 1;
  });
};


},{}],"FFKit/helper-functions/private/paralaxOnScroll":[function(require,module,exports){
exports.paralaxOnScroll = function(unit) {
  if (unit.parent && unit.parent.name === "content") {
    if (unit.parent.parent.constructor.name === "ScrollComponent") {
      return unit.parent.parent.on(Events.Move, function(event, layer) {
        var y;
        y = unit.parent.y + unit.y;
        return unit.selectChild('image').y = Utils.modulate(y, [0, -360], [0, 100]);
      });
    } else if (unit.parent.parent.constructor.name === "PageComponent") {
      if (unit.parent.parent.parent.parent) {
        if (unit.parent.parent.parent.parent.parent.constructor.name === "ScrollComponent") {
          return unit.parent.parent.parent.parent.parent.on(Events.Move, function(event, layer) {
            var y;
            y = unit.parent.parent.parent.parent.y + unit.y;
            return unit.selectChild('image').y = Utils.modulate(y, [0, -360], [0, 100]);
          });
        }
      }
    }
  }
};


},{}],"FFKit/helper-functions/private/selectImage":[function(require,module,exports){
window.selectImage = function(array, imageOrder) {
  var filteredImages, selectedImage;
  if (imageOrder == null) {
    imageOrder = defaultAPIImageOrder;
  }
  if (array.length === 0) {
    return "";
  }
  if (array.length > 1) {
    filteredImages = array.filter(function(image) {
      return image.order === imageOrder && image.size === defaultAPIImageSize;
    });
    if (filteredImages.length > 0) {
      selectedImage = filteredImages[0];
    } else {
      selectedImage = array[0];
    }
  } else {
    selectedImage = array[0];
  }
  return selectedImage.url;
};


},{}],"FFKit/helper-functions/targetDesignMode":[function(require,module,exports){
window.targetDesignMode = function(target, frame) {
  frame.x = target.x;
  frame.y = target.y;
  frame.size = target.size;
  frame.parent = target.parent;
  return target.destroy();
};


},{}],"FFKit/pages/CategoriesPage/CategoriesPage":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.CategoriesPage = (function(superClass) {
  var showItems;

  extend(CategoriesPage, superClass);

  function CategoriesPage(opt) {
    var i, item, len, newContentArr, ref;
    this.opt = opt != null ? opt : {};
    CategoriesPage.__super__.constructor.call(this, _.defaults(this.opt, {
      width: Screen.width,
      height: Screen.height,
      backgroundColor: "white",
      content: "modules/FFKit/content/default/categories.json",
      actions: {
        "item1": function() {
          return print("Tap!");
        }
      }
    }));
    this.header = new Header({
      parent: this,
      y: (function() {
        switch (Framer.Device.deviceType) {
          case "apple-iphone-x-space-gray":
          case "apple-iphone-x-silver":
            return 44;
          default:
            return 20;
        }
      })(),
      name: "categories header",
      title: "Categories",
      iconLeft: "big-arrow"
    });
    this.tabs = new Tabs({
      name: "tabs",
      parent: this,
      y: this.header.maxY + S_spacer
    });
    this.categoriesList = new ScrollComponent({
      name: "categories list",
      parent: this,
      y: this.tabs.maxY + S_spacer,
      scrollHorizontal: false,
      width: Screen.width,
      height: Screen.height - this.tabs.maxY - S_spacer
    });
    newContentArr = JSON.parse(Utils.domLoadDataSync(this.opt.content));
    showItems(this, newContentArr.women);
    ref = this.tabs.newItemsArr;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.onTap((function(_this) {
        return function() {
          var child, j, len1, ref1;
          ref1 = _this.categoriesList.content.children;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            child = ref1[j];
            child.destroy();
          }
          switch (_this.tabs.currentItem) {
            case "women":
              return showItems(_this, newContentArr.women);
            case "men":
              return showItems(_this, newContentArr.men);
            case "kids":
              return showItems(_this, newContentArr.kids);
          }
        };
      })(this));
    }
  }

  showItems = function(parent, contentArr) {
    var child, i, len, nextPosY, results;
    results = [];
    for (i = 0, len = contentArr.length; i < len; i++) {
      child = contentArr[i];
      parent.categoriesList.content["" + child.id] = new ListItem({
        name: child.id,
        parent: parent.categoriesList.content,
        text: child.name,
        right: "arrow-right"
      });
      parent.categoriesList.content["" + child.id].y = nextPosY;
      nextPosY = parent.categoriesList.content["" + child.id].maxY;
      results.push(parent.categoriesList.content["" + child.id].onTap(function() {
        if (typeof parent.opt.actions["" + this.name] === "function") {
          return parent.opt.actions["" + this.name]();
        }
      }));
    }
    return results;
  };

  return CategoriesPage;

})(Layer);


},{}],"FFKit/pages/DesignersPage/DesignersPage":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.DesignersPage = (function(superClass) {
  extend(DesignersPage, superClass);

  function DesignersPage(opt) {
    var actionsArr, child, contentArr, headerLetter, i, item, itemsArray, j, k, l, len, len1, len2, len3, len4, len5, len6, len7, lettersArr, m, n, newPos, newYpos, o, p, q, r, ref, ref1, sectionsArr, unionArr;
    this.opt = opt != null ? opt : {};
    DesignersPage.__super__.constructor.call(this, _.defaults(this.opt, {
      width: Screen.width,
      height: Screen.height,
      backgroundColor: "white",
      content: "modules/FFKit/content/default/designers.json",
      actions: {
        "2682082": function() {
          return print("Tap!");
        },
        "185663": function() {
          return print("And another tap!");
        }
      }
    }));
    contentArr = JSON.parse(Utils.domLoadDataSync(this.opt.content));
    unionArr = contentArr.women.concat(contentArr.men, contentArr.kids);
    lettersArr = [];
    for (k = 0, len = unionArr.length; k < len; k++) {
      child = unionArr[k];
      if (isNaN(child.name.charAt(0))) {
        lettersArr.push(child.name.charAt(0));
      }
    }
    lettersArr.sort(function(a, b) {
      return a > b;
    });
    lettersArr.shift();
    lettersArr.push("#");
    lettersArr = _.uniq(lettersArr);
    this.header = new Header({
      parent: this,
      y: (function() {
        switch (Framer.Device.deviceType) {
          case "apple-iphone-x-space-gray":
          case "apple-iphone-x-silver":
            return 44;
          default:
            return 20;
        }
      })(),
      name: "categories header",
      title: "Designers",
      iconLeft: "big-arrow"
    });
    this.refineWrap = new Layer({
      parent: this,
      name: "refine wrap",
      width: this.width,
      height: refine_filter.height,
      y: this.header.maxY,
      backgroundColor: "white"
    });
    this.refineBtn = refine_filter.selectChild("refine_button").copy();
    this.refineBtn.props = {
      parent: this.refineWrap,
      y: Align.center(),
      x: M_spacer
    };
    this.refineBtn.selectChild("refine_button_text").width = this.refineBtn.selectChild("refine_button_text").width + 2;
    this.scrollCmp = new ScrollComponent({
      parent: this,
      name: "scroll comp",
      width: this.width,
      height: this.height - this.header.maxY,
      y: this.header.maxY,
      scrollHorizontal: false,
      contentInset: {
        top: this.refineWrap.height + XS_spacer
      }
    });
    this.on("change:frame", (function(_this) {
      return function() {
        _this.scrollCmp.contentInset = {
          top: _this.refineWrap.height + XS_spacer
        };
        return _this.scrollCmp.scrollPoint = {
          y: _this.searchInput.height
        };
      };
    })(this));
    this.searchInput = new SearchInput({
      name: "search input",
      parent: this.scrollCmp.content,
      width: Screen.width - M_spacer,
      y: XS_spacer,
      x: Align.center(),
      placeholder: "Search for a designer"
    });
    this.scrollCmp.scrollPoint = {
      y: this.searchInput.height
    };
    this.refineWrap.bringToFront();
    sectionsArr = [];
    for (i = l = 0, len1 = lettersArr.length; l < len1; i = ++l) {
      item = lettersArr[i];
      this[item + "Header"] = new Layer({
        parent: this.scrollCmp.content,
        name: item + "Header",
        width: this.width,
        height: 64,
        backgroundColor: "white"
      });
      this[item + "Section"] = new Layer({
        name: item + "Section",
        parent: this.scrollCmp.content,
        width: this.width
      });
      sectionsArr.push(this[item + "Section"]);
      headerLetter = new TextLayer({
        x: M_spacer,
        y: M_spacer,
        parent: this[item + "Header"],
        text: item,
        textTransform: "uppercase",
        fontFamily: "Polaris-Bold",
        color: "#222222",
        fontSize: 18
      });
    }
    itemsArray = [];
    for (i = m = 0, len2 = unionArr.length; m < len2; i = ++m) {
      child = unionArr[i];
      for (n = 0, len3 = lettersArr.length; n < len3; n++) {
        i = lettersArr[n];
        if (i === child.name.charAt(0)) {
          this["" + child.id] = new ListItem({
            name: "" + child.id,
            parent: this[i + "Section"],
            text: child.name
          });
          itemsArray.push(this["" + child.id]);
        }
      }
      if (!isNaN(child.name.charAt(0))) {
        this["" + child.id] = new ListItem({
          name: "" + child.id,
          parent: this["#Section"],
          text: child.name
        });
        itemsArray.push(this["" + child.id]);
      }
    }
    actionsArr = this.opt.actions;
    for (i = o = 0, len4 = itemsArray.length; o < len4; i = ++o) {
      child = itemsArray[i];
      child.onTap(function() {
        console.log(this.name);
        if (typeof actionsArr["" + this.name] === "function") {
          return actionsArr["" + this.name]();
        }
      });
    }
    for (i = p = 0, len5 = sectionsArr.length; p < len5; i = ++p) {
      item = sectionsArr[i];
      newPos = 0;
      ref = item.children;
      for (j = q = 0, len6 = ref.length; q < len6; j = ++q) {
        i = ref[j];
        i.y = newPos;
        newPos = i.maxY;
      }
      item.height = item.children.slice(-1)[0].maxY;
    }
    sectionsArr = unionArr = [];
    ref1 = this.scrollCmp.content.children;
    for (i = r = 0, len7 = ref1.length; r < len7; i = ++r) {
      item = ref1[i];
      item.y = newYpos;
      newYpos = item.maxY;
    }
    this.sideAlphabet = new TextLayer({
      name: "sideAlphabet",
      parent: this,
      x: Align.right(),
      y: Align.center(),
      textAlign: "center",
      text: "" + (lettersArr.join(" ")),
      fontSize: 12,
      width: 12,
      textTransform: "uppercase"
    });
    this.refinePage = new Layer({
      parent: this,
      width: this.width,
      height: this.height,
      backgroundColor: "white"
    });
    this.refinePage.y = Align.bottom(this.refinePage.height);
    this.refinePage.states = {
      stateA: {
        y: 0
      },
      animationOptions: {
        time: 0.4,
        curve: Spring({
          damping: 0.9
        })
      }
    };
    this.refinePageHeader = new Header({
      parent: this.refinePage,
      iconLeft: "big-cross",
      title: "Refine",
      y: (function() {
        switch (Framer.Device.deviceType) {
          case "apple-iphone-x-space-gray":
          case "apple-iphone-x-silver":
            return 44;
          default:
            return 20;
        }
      })()
    });
    this.refineScroll = new ScrollComponent({
      parent: this.refinePage,
      scrollHorizontal: false,
      width: this.width,
      height: this.height - (this.refinePageHeader.maxY + S_spacer),
      y: this.refinePageHeader.maxY + S_spacer
    });
    this.genderTitle = new ListTitle({
      parent: this.refineScroll.content,
      text: "Gender"
    });
    this.genderRadioSelect = new ListRadioSelect({
      y: this.genderTitle.maxY,
      parent: this.refineScroll.content,
      selectArray: [
        {
          text: "Women",
          on: true
        }, {
          text: "Men"
        }, {
          text: "Kids"
        }
      ]
    });
    this.filterByTtitle = new ListTitle({
      parent: this.refineScroll.content,
      text: "Filter By",
      y: this.genderRadioSelect.maxY + M_spacer
    });
    this.filterItemA = new ListItem({
      parent: this.refineScroll.content,
      y: this.filterByTtitle.maxY,
      right: "small-tick",
      text: "Current season"
    });
    this.filterItemB = new ListItem({
      parent: this.refineScroll.content,
      y: this.filterItemA.maxY,
      text: "Sale only"
    });
    this.filterItemC = new ListItem({
      parent: this.refineScroll.content,
      y: this.filterItemB.maxY,
      text: "Favourite designers"
    });
    this.fixedBtn = new ButtonFixed({
      parent: this.refinePage,
      text: "Show designers"
    });
    this.fixedBtn.fixed_btn.width = 220;
    this.fixedBtn.fixed_btn.x = Align.center();
    this.refineBtn.onTap((function(_this) {
      return function() {
        return _this.refinePage.animate("stateA");
      };
    })(this));
    this.refinePageHeader.iconLeft_layer.onTap((function(_this) {
      return function() {
        return _this.refinePage.animate("default");
      };
    })(this));
  }

  return DesignersPage;

})(Layer);


},{}],"FFKit/screens/HomeScreen":[function(require,module,exports){


},{}],"FFKit/setup/FFTextLayer/FFTextLayer":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.FFTextLayer = (function(superClass) {
  extend(FFTextLayer, superClass);

  function FFTextLayer(opt) {
    var textStyle;
    this.opt = opt != null ? opt : {};
    this.opt = _.defaults({}, this.opt, {
      color: "#222222"
    });
    textStyle = this.opt.textStyle;
    this.opt.textStyle = null;
    FFTextLayer.__super__.constructor.call(this, this.opt);
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.textStyle = textStyle;
  }

  FFTextLayer.define("textStyle", {
    get: function() {
      return this._textStyle;
    },
    set: function(value) {
      this._textStyle = value;
      return this._updateStyle();
    }
  });

  FFTextLayer.prototype._updateStyle = function() {
    var styles;
    styles = {
      XLBold: {
        fontSize: 26,
        fontWeight: 800,
        fontFamily: "Polaris"
      },
      L: {
        fontSize: 18,
        fontWeight: 400,
        fontFamily: "Polaris"
      },
      LBold: {
        fontSize: 18,
        fontWeight: 800,
        fontFamily: "Polaris"
      },
      M: {
        fontSize: 15,
        fontWeight: 400,
        fontFamily: "Polaris"
      },
      MCond: {
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: 1.6,
        fontFamily: "Polaris Condensed",
        textTransform: "uppercase"
      },
      MBold: {
        fontSize: 15,
        fontWeight: 800,
        fontFamily: "Polaris"
      },
      SBold: {
        fontSize: 12,
        fontWeight: 800,
        fontFamily: "Polaris"
      },
      S: {
        fontSize: 12,
        fontWeight: 400,
        fontFamily: "Polaris"
      },
      XSBold: {
        fontSize: 10,
        fontWeight: 800,
        fontFamily: "Polaris"
      },
      XS: {
        fontSize: 10,
        fontWeight: 400,
        fontFamily: "Polaris"
      }
    };
    return this.props = styles[this.textStyle];
  };

  return FFTextLayer;

})(TextLayer);


},{}],"FFKit/setup/setup":[function(require,module,exports){
var destroyInspectorLayers;

Framer.Extras.Hints.disable();

destroyInspectorLayers = function() {
  FFKit_components.destroy();
  FFKit_units.destroy();
  return FFKit_type_styles.destroy();
};

exports.setup = function() {
  return destroyInspectorLayers();
};

window.defaultAPIImageSize = "300";

window.defaultAPIImageOrder = 1;

window.useExternalImages = false;

window.$ = "modules/FFKit/content/";

require("FFKit/helper-functions/addChildren");

require("FFKit/helper-functions/targetDesignMode");

require("FFKit/helper-functions/positionAfter");

window.womenPoroducts = ["modules/FFKit/content/default/products/women/01.jpg", "modules/FFKit/content/default/products/women/02.jpg", "modules/FFKit/content/default/products/women/03.jpg", "modules/FFKit/content/default/products/women/04.jpg", "modules/FFKit/content/default/products/women/05.jpg", "modules/FFKit/content/default/products/women/06.jpg", "modules/FFKit/content/default/products/women/07.jpg"];


},{"FFKit/helper-functions/addChildren":"FFKit/helper-functions/addChildren","FFKit/helper-functions/positionAfter":"FFKit/helper-functions/positionAfter","FFKit/helper-functions/targetDesignMode":"FFKit/helper-functions/targetDesignMode"}],"FFKit/setup/sizes/sizes":[function(require,module,exports){
window.L_spacer = sizes_variables.selectChild("L").width;

window.M_spacer = sizes_variables.selectChild("M").width;

window.S_spacer = sizes_variables.selectChild("S").width;

window.XS_spacer = sizes_variables.selectChild("XS").width;

window.XXS_spacer = sizes_variables.selectChild("XXS").width;

window.XXXS_spacer = sizes_variables.selectChild("XXXS").width;


},{}],"FFKit/snippets/FFKit-snippets/Components/Accordion":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# Accordion example\naccordionA = new Accordion\n	expanded: true\n	labelText: \"Description\"\n\n# Accordion with your content \n# (paste tergeted frame from design mode)\naccordionB = new Accordion\n	y: accordionA.maxY\n	expanded: true\n	labelText: \"Description\"\n	content: acc_description_conetent\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/ActionSheet":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# Simple action sheet example\nbtnA = new Button\n	text: \"Show action sheet\"\n	y: 100, x: Align.center\n\nactionSheet = new ActionSheet\n	content: my_actionsheet_content\n	button:\n		text: \"Purchase\"\n		width: 116\n		visible: false\n	title:\n		visible: true\n		text: \"Hello!\"\n\nbtnA.onTap ->\n	actionSheet.show()";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/Button-Fixed":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Fixed button\nbuttonFixed = new ButtonFixed\n	text: \"Add to basket\"";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/Buttons":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n##### Different examples of buttons #####\n\nbtn = new Button\n	type: \"primary\"\n	text: \"Hello!\"\n	x: Align.center()\n	y: 100\n\nbtn2 = new Button\n	type: \"secondary\"\n	text: \"Yo!\"\n	icon: \"arrow-right\"\n	x: Align.center()\n	y: btn.maxY + M_spacer # Variables\n\nbtn3 = new Button\n	type: \"tag\"\n	text: \"This is awesome\"\n	x: Align.center()\n	y: btn2.maxY + M_spacer\n\nbtn4 = new Button\n	type: \"tag\"\n	text: \"This is awesome\"\n	icon: \"cross\"\n	iconAlign: \"left\"\n	x: Align.center()\n	y: btn3.maxY + M_spacer\n	\nbtn5 = new Button\n	type: \"primary\"\n	text: \"Hello!\"\n	x: Align.center()\n	icon: \"arrow-left\"\n	iconAlign: \"left\"\n	y: btn4.maxY + M_spacer\n\nbtn6 = new Button\n	type: \"tag\"\n	text: \"This is awesome\"\n	icon: \"cross\"\n	x: Align.center()\n	sidePaddings: 12\n	y: btn5.maxY + M_spacer\n\nbtn7 = new Button\n	type: \"tertiary\"\n	text: \"This is awesome\"\n	x: Align.center()\n	y: btn6.maxY + M_spacer\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/FFInputs":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# Inputs list\n# Create default ScrollComponent\nscroll = new ScrollComponent\n	y: statusbar.maxY\n	size: Screen.size\n	scrollHorizontal: false\n	backgroundColor: \"white\"\n	contentInset:\n		bottom: 40\n	\nfName = new FFInput\n	parent: scroll.content\n	labelText: \"First name\"\n	placeholderText: \"Placeholder test\"\n\nlName = new FFInput\n	parent: scroll.content\n	labelText: \"Last name\"\n	after: fName\n\ncountry = new Selector\n	parent: scroll.content\n	after: lName\n	labelText: \"Country/Region\"\n	\naddress1 = new FFInput\n	parent: scroll.content\n	labelText: \"Address Line 1\"\n	after: country\n\naddress2 = new FFInput\n	parent: scroll.content\n	labelText: \"Address Line 2\"\n	helperText: \"+ Add another line\" \n	after: address1\n\naddress2.helperText.props =\n	color: \"#8c8c8c\"\n	textAlign: \"right\"\n\ncity = new FFInput\n	parent: scroll.content\n	labelText: \"City\"\n	after: address2\n\nstate = new FFInput\n	parent: scroll.content\n	labelText: \"State (optional)\"\n	after: city\n	\npostalCode = new FFInput\n	parent: scroll.content\n	labelText: \"Postal Code\"\n	after: state\n\nscroll.updateContent() # Update scroll\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/Header-all-atributes-":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Header with all possible atributes #####\nheader = new Header\n	y: 44\n	title: \"Hello World\"\n	subTitle: \"1500 items\"\n	iconLeft: \"big-arrow\"\n	iconRight: \"bag\"\n	linkLeft: \"Left\"\n	linkRight: \"Right\"\n	bag: 2\n	search: true\n	nobg: true \n\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/Headers":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Different examples of headers\n\nheader1 = new Header\n	y: 150\n	title: \"logo\"\n	iconRight: \"bag\"\n\nheader2 = new Header\n	y: 250\n	title: \"Hello World\"\n	iconLeft: \"big-arrow\"\n	iconRight: \"bag\"\n	search: true\n\nheader3 = new Header\n	y: 350\n	title: \"Alexander MqQueen\"\n	subTitle: \"1500 items\"\n	iconLeft: \"big-arrow\"\n	iconRight: \"bag\"\n	bag: 2\n	search: true\n\nheader4 = new Header\n	y: 450\n	title: \"Refine\"\n	iconLeft: \"cross\"\n	linkRight: \"Clear All\"\n\nheader4 = new Header\n	y: 550\n	iconLeft: \"big-arrow\"\n	iconRight: \"bag\"\n	search: true\n	nobg: true \n\nheader6 = new Header\n	y: 650\n	title: \"Hello Word\"\n	iconRight: \"cross\"\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/HomeSearch":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\nsearch = new HomeSearch\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/Keyline":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\nline = new Keyline\n	y: 100 # position the line \n";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/ListItem-all-atributes-":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\nlistItem = new ListItem\n	text: \"Hello World\"\n	right: \"arrow-right\"\n	flag: \"uk\"\n	line: \"fullwidth\"\n	lineTop: true\n	y: 200\n	type: \"wide\"\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/ListProductCard":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# List Product Card\nlistCard = new ListProductCard\n	y: 40\n	cover: $+\"default/list-product-card-01.png\"\n	season: \"\"\n	brand: \"Dvf Diane Von Furstenberg\"\n	icon: \"wishlist\"\n	description: \"The Large Rucksack in Technical Nylon and Leather\"\n	price: \"£239\"";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/ListRadioSelect":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\nradioSelect = new ListRadioSelect\n	selectArray: [\n		{text : \"List Item 1\"}, \n		{text : \"List Item 2\", on : true}\n		{text: \"List Item 3\"}\n		]\n		";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/ListTitle-ListItems":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\nlistTitle = new ListTitle\n	text: \"Hello Word\"\n	y: 50\n	\nlistItem1 = new ListItem\n	text: \"Hello World\"\n	right: \"arrow-right\"\n	y: listTitle.maxY\n	type: \"wide\"\n\nlistItem2 = new ListItem\n	text: \"Hello World\"\n	y: listItem1.maxY\n\nlistItem3 = new ListItem\n	text: \"Hello World\"\n	right: \"arrow-right\"\n	flag: \"uk\"\n	y: listItem2.maxY\n	type: \"wide\"\n	\nlistItem4 = new ListItem\n	text: \"Hello World\"\n	right: \"toggle\"\n	y: listItem3.maxY\n	type: \"wide\"\n\nlistItem5 = new ListItem\n	text: \"Hello World\"\n	line: \"fullwidth\"\n	lineTop: true\n	y: listItem4.maxY\n	\n	\nlistItem6 = new ListItem\n	text: \"Hello World\"\n	line: false\n	lineTop: \"fullwidth\"\n	y: listItem5.maxY\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/PDPHeroUnit":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# PDP hero\npdpHeroUnit = new PDPHeroUnit\n	parent: scroll.content";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/PosBanner":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\npos = new PosBanner\n	text: \"Private Sale\"\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/ProductCard":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# Product card example\nproductCardA = new ProductCard\n	cover: \"modules/FFKit/content/default/products/women/02.jpg\"\n	brandText: \"C&C\"\n	descriptionText: \"Embellished logo denim jacket\"\n	priceText: \"£1256\"";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/ProductSlider":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\nproductCardA = new ProductSlider\n	array: [\n		{ # Product 1 \n		\"shortDescription\": \"I heart Prada bag charm\"\n		\"images\": [\"url\": \"https://cdn-images.farfetch-contents.com/12/65/74/91/12657491_12339825_300.jpg\"]\n		\"brand\": {\"name\": \"Prada\"},\n		\"price\": \"£ 135\"\n		}\n		{ # Product 1 \n		\"shortDescription\": \"I heart Prada bag charm\"\n		\"images\": [\"url\": \"https://cdn-images.farfetch-contents.com/12/65/74/91/12657491_12339825_300.jpg\"]\n		\"brand\": {\"name\": \"Prada\"},\n		\"price\": \"£ 135\"\n		}\n	]";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/RefineFilter":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# Refine filter\nrefine = new RefineFilter\n	x: Align.center()\n	y: status_bar.maxY\n	itemsArray: [\"item #1\",\"long item #2\",\"item #3\",\"item #4\", \"item #5\"]\n\n# Update selected items\nrefine.selected(6)";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/SearchInput":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\nsearchInputt = new SearchInput\n    placeholder: \"Your text\"\n    ";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/Selector":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# Selector\nselector = new Selector\n	placeholderText: \"Select sdf your size\"\n	labelText: \"Country/Region\"\n	helperText: \"This is helper text\"";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/StatusBar":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\nstatus_bar = new StatusBar";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/Tabbar":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# Tabbar example\ntabbar = new Tabbar\n	activeItem: \"home\"\n\n# Change active item\ntabbar.activeItem = \"me\"\n\n# Add events\ntabbar.selectChild(\"home\").on Events.Click, (event, layer) ->\n	print \"Clicked Home\", layer.name\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/Tabs":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\ntabs = new Tabs\n    items: [\"one\", \"two\", \"three\", \"four\"]\n\ntabs.one.onTap ->\n    print 'sdf'\n    ";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/WishlistUnit":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\nwishlistUnit = new WishlistUnit\n	array: [\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"swing denim jacket\",\n			\"image\": \"modules/FFKit/content/default/products/women/01.jpg\",\n			\"brand\": \"BALENCIAGA\",\n			\"price\": \"£1,259\"\n		},\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"Gucci logo T-shirt with shooting stars\",\n			\"image\": \"modules/FFKit/content/default/products/women/02.jpg\",\n			\"brand\": \"GUCCI\",\n			\"price\": \"£1,500\"\n		},\n		{\n			\"season\": \"\",\n			\"shortDescription\": \"sleeveless V-neck stamp print dress\",\n			\"image\": \"modules/FFKit/content/default/products/women/03.jpg\",\n			\"brand\": \"GUCCPETER PILOTTOI\",\n			\"price\": \"£739\"\n		},\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"fringed netted midi dress\",\n			\"image\": \"modules/FFKit/content/default/products/women/05.jpg\",\n			\"brand\": \"CALVIN KLEIN 205W39NYC\",\n			\"price\": \"£1,575\"\n		},\n		{\n			\"season\": \"\",\n			\"shortDescription\": \"New Swing shirt\",\n			\"image\": \"modules/FFKit/content/default/products/women/06.jpg\",\n			\"brand\": \"BALENCIAGA\",\n			\"price\": \"£1,050\"\n		}\n	]\n	\nwishlistUnit.listcard_1.onTap ->\n	print \"Tap!\"\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Components/iOSSwitch":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\ntoggle = new iOSSwitch\n	y: Align.center\n	isOn: true\n\ntoggle.onValueChange (value) ->\n	print value\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Flows/Home-PLP":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n\n# Status bar\nstatus_bar = new StatusBar\n\n# Tabbar example\ntabbar = new Tabbar\n	activeItem: \"home\"\n\n\n\n## Home Screen\n\nhomeScreen = new Layer\n	width: Screen.width \n	height: Screen.height - status_bar.height - tabbar.height\n\nhomeHeader = new Header\n	parent: homeScreen\n	title: \"logo\"\n	iconRight: \"bag\"\n	\nhomeSearch = new HomeSearch\n	after:  homeHeader\n\n# ScrollComponent\nhomeScroll = new ScrollComponent\n	y: homeSearch.maxY # can't use 'after' as this is Framer's Class\n	backgroundColor: \"white\"\n	scrollHorizontal: false\n	directionLock: true # avoids scroll when product swiping\n	width: Screen.width\n	parent: homeScreen\nhomeScroll.height = homeScreen.height - homeHeader.height - homeSearch.height\n\npos = new PosBanner\n	text: \"Private Sale\"\n	parent: homeScroll.content\n\n# Create hero unit\nunit1 = new HeroUnit\n	title: \"Hello World\"\n	subTitle: \"Shop now\"\n	cover: $+\"default/hero-01.jpg\"\n	after: pos\n\n# Create product unit\nunit2 = new ProductUnit\n	title: \"Hello World\"\n	description: \"Selection of new items has just arrived to our boutiques.\"\n	productsArray: JSON.parse Utils.domLoadDataSync $+\"default/products.json\"\n	after: unit1\n\nhomeScroll.updateContent() # Update scroll\n\n\n\n\n## PLP Screen\n\nplpScreen = new Layer\n	width: Screen.width\n	height: Screen.height - status_bar.height - tabbar.height\n	backgroundColor: \"white\"\n\nplpHeader = new Header\n	title: \"Summer\"\n	subTitle: \"7 items\"\n	iconLeft: \"big-arrow\"\n	iconRight: \"bag\"\n	search: true\n	parent: plpScreen\n\n# Create default ScrollComponent\nplpScroll = new ScrollComponent\n	width: Screen.width\n	height: Screen.height - (plpHeader.height)\n	scrollHorizontal: false\n	y: plpHeader.maxY\n	parent: plpScreen\n\n# Product list array\nPLPlistArr = JSON.parse Utils.domLoadDataSync $+\"default/plp.json\"\n\n# Refine Filter's array\nrefineFiltersArray = []\nfor i in [0...PLPlistArr.length]\n	refineFiltersArray.push PLPlistArr[i].brand.charAt(0) + PLPlistArr[i].brand.slice(1).toLowerCase()\n	\n# Refine filter\nrefineFilter = new RefineFilter\n	after: plpHeader\n	itemsArray: refineFiltersArray\n	y: 0\n\n# Refine filter animation on sroll\nhideRefine = new Animation refineFilter,\n	y: -refineFilter.height\n	options:\n		time: 0.2\n#showRefine = hideRefine.reverse()\nshowRefine = new Animation refineFilter,\n	y: 10\n	options:\n		time: 0.2\n	\n	\nplpScroll.onScroll (event) ->\n	if event.deltaY < 2 and plpScroll.content.y < - 68\n		hideRefine.start()\n	else if event.deltaY > 2\n		showRefine.start()\n\n# Generate product listing cards\nproductCards = new ProductListingUnit\n	parent: plpScroll.content\n	y: refineFilter.height\n\nplpHeader.bringToFront() # Bring header to front\n# plpScroll.contentInset =\n# 	top: 68\nplpScroll.updateContent() # Update scroll\n\n\n\n## Flow Component\n\nflow = new FlowComponent\n	height: Screen.height - status_bar.height - tabbar.height\n	y: status_bar.maxY\n	\n# First screen\nflow.showNext(homeScreen)\n\n\n\n## Logic and Interactions\n\n\n# Tabbar\ntabbar.selectChild(\"home\").onClick (event, layer) ->\n	flow.showNext(homeScreen, animate: false)\n	\ntabbar.bringToFront()\n\n# Taps to PDP\nunit1.onClick (event, layer) ->\n	flow.showNext(plpScreen)\n	\nunit2.cta.onClick (event, layer) ->\n	flow.showNext(plpScreen)\n\nplpHeader.selectChild(\"icn_left\").onClick (event, layer) ->\n	flow.showPrevious() \n";
};


},{}],"FFKit/snippets/FFKit-snippets/Flows/Statusbar-and-Tabbar":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Status bar\nstatus_bar = new StatusBar\n\n# Tabbar example\ntabbar = new Tabbar\n	activeItem: \"home\"\n\n## Screens\n\n# Home Screen\nhomeScreen = new Layer\n	width: Screen.width \n	height: Screen.height - status_bar.height - tabbar.height\n	backgroundColor: \"blue\"\n\n# Me Screen\nmeScreen = new Layer\n	width: Screen.width\n	height: Screen.height - status_bar.height - tabbar.height\n	backgroundColor: \"green\"\n\n\n# Set up FlowComponent\nflow = new FlowComponent\n	height: Screen.height - status_bar.height - tabbar.height\n	y: status_bar.maxY\n	\n# First screen\nflow.showNext(homeScreen)\n\n\n# Tabbar logic\ntabbar.selectChild(\"home\").onClick (event, layer) ->\n	flow.showNext(homeScreen, animate: false)\n\ntabbar.selectChild(\"me\").onClick (event, layer) ->\n	flow.showNext(meScreen, animate: false)\n	\ntabbar.bringToFront()\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Pages/CategoriesPage":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\ncategoriesPage = new CategoriesPage\n	actions: {\n		\"item1\": -> print \"Tap!\",\n		\"item2\": -> print \"And another Tap!\"\n	}\n\ncategoriesPage.header.iconLeft_layer.onTap ->\n	print \"back\"\n    ";
};


},{}],"FFKit/snippets/FFKit-snippets/Pages/DesignersPage":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\ndesignersPage = new DesignersPage\n	actions: {\n		\"2682082\": -> print \"Yo!\"\n	}\n	\ndesignersPage.header.iconLeft_layer.onTap ->\n	print \"back\"\n    ";
};


},{}],"FFKit/snippets/FFKit-snippets/Pages/Home":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Home Screen container that can be used by Flow Component\nhomeScreen = new Layer\n	width: Screen.width \n	height: Screen.height # Mind to remove statusbar & tabbar height later.\n	backgroundColor: \"blue\"\n\nhomeHeader = new Header\n	parent: homeScreen\n	title: \"logo\"\n	iconRight: \"bag\"\n	\nhomeSearch = new HomeSearch\n	after:  homeHeader\n\n# ScrollComponent\nhomeScroll = new ScrollComponent\n	y: homeSearch.maxY # can't use 'after' as this is Framer's Class\n	backgroundColor: \"white\"\n	scrollHorizontal: false\n	directionLock: true # avoids scroll when product swiping\n	width: Screen.width\n	parent: homeScreen\nhomeScroll.height = homeScreen.height - homeHeader.height - homeSearch.height\n\npos = new PosBanner\n	text: \"Private Sale\"\n	parent: homeScroll.content\n\n# Create hero unit\nunit1 = new HeroUnit\n	title: \"Hello World\"\n	subTitle: \"Shop now\"\n	cover: $+\"default/hero-01.jpg\"\n	after: pos\n\n# Create product unit\nunit2 = new ProductUnit\n	title: \"Hello World\"\n	description: \"Selection of new items has just arrived to our boutiques.\"\n	productsArray: JSON.parse Utils.domLoadDataSync $+\"default/products.json\"\n	after: unit1\n\n# Create product set\nunit3 = new ProductSet\n	title: \"Hello World\"\n	subTitle: \"Shop Now\"\n	cover:  $+\"default/hero-01.jpg\", \n	productsArray: JSON.parse Utils.domLoadDataSync $+\"default/products.json\"\n	after: unit2\n\n# Divider line\nline = new Keyline\n	after: unit3\n\n# Create feature unit with product image\nunit4 = new FeatureUnit\n	title: \"Hello World\"\n	subTitle: \"Shop now\"\n	description: \"Selection of new items has just arrived to our boutiques.\"\n	cover: $+\"default/product-01.jpg\"\n	after: line\n\n# Creating product hero\nunit5 = new ProductHero\n	title: \"Hello World\"\n	subTitle: \"Please see our reccomendations, based on designers you love.\"\n	description: \"There was a shift in sportswear this season. Sure, expected injections of nineties youth culture courtesy of Gosha and the gang were still present, but the general mood played to the more distant past of seventies and eighties athletic wear.\"\n	cover: $+\"default/product-hero-01.jpg\"\n	productsArray: JSON.parse Utils.domLoadDataSync $+\"default/products.json\"\n	after: unit4\n\nhomeScroll.updateContent() # Update scroll\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Pages/Me":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Me Screen container that can be used by Flow Component\nmeScreen = new Layer\n	width: Screen.width\n	height: Screen.height  # Mind to remove statusbar & tabbar height later.\n	backgroundColor: \"green\"\n\nmeHeader = new Header\n	parent: meScreen\n	title: \"Me\"\n	iconRight: \"bag\"\n	search: true\n\n# ScrollComponent\nmeScroll = new ScrollComponent\n	parent: meScreen\n	y: meHeader.maxY\n	height: meScreen.height - meHeader.height\n	width: Screen.width\n	backgroundColor: \"#ffffff\"\n	scrollHorizontal: false\nmeScroll.content.backgroundColor = \"#ffffff\"\n\nsignIn = new MeSignIn\n	parent: meScroll.content\n\nmyLocation = new ListTitle\n	text: \"My Location\"\n	after: signIn\n	y: M_spacer\n\ncountry = new ListItem\n	text: \"United Kingdom (GBP)\"\n	left: \"arrow-right\"\n	flag: \"uk\"\n	after: myLocation\n\ncountryComment = new FFTextLayer\n	text: \"Your chosen location defines your language and shopping currency.\"\n	textStyle: \"S\"\n	after: country\n	y: S_spacer\n	x: M_spacer\n	width: Screen.width - M_spacer - M_spacer\n	\nmyLang = new ListTitle\n	text: \"My Language\"\n	after: countryComment\n	y: M_spacer\n\nlang = new ListItem\n	text: \"English (UK)\"\n	left: \"arrow-right\"\n	after: myLang\n\nmyShopPref = new ListTitle\n	text: \"My Shop Preference\"\n	after: lang\n	y: M_spacer\n\nshopPref = new ListRadioSelect\n	selectArray: [\n		{text : \"Women\", on : true}, \n		{text : \"Men\"}\n		]\n	after: myShopPref\n	\nshopPrefComment = new FFTextLayer\n	text: \"This will tailor your app experience, showing you the type of products most suited to you.\"\n	textStyle: \"S\"\n	after: shopPref\n	x: M_spacer\n	y: S_spacer\n	width: Screen.width - M_spacer - M_spacer\n\nmySettings = new ListTitle\n	text: \"My Settings\"\n	after: shopPrefComment\n	y: M_spacer\n\npushNotifications = new ListItem\n	text: \"Push Notifications\"\n	left: \"arrow-right\"\n	after: mySettings\n\nlocationServices = new ListItem\n	text: \"Location Services\"\n	left: \"arrow-right\"\n	after: pushNotifications\n\ntouchId = new ListItem\n	text: \"Apple Touch ID\"\n	left: \"toggle\"\n	after: locationServices\n\nsupport = new ListTitle\n	text: \"Support\"\n	after: touchId\n	y: M_spacer\n\nabout = new ListItem\n	text: \"About Farfetch\"\n	left: \"arrow-right\"\n	after: support\n\nterms = new ListItem\n	text: \"Terms & Conditions\"\n	left: \"arrow-right\"\n	after: about\n\nprivacy = new ListItem\n	text: \"Privacy policy\"\n	left: \"arrow-right\"\n	after: terms\n\nfaq = new ListItem\n	text: \"FAQ & Guides\"\n	left: \"arrow-right\"\n	after: privacy\n\npartners = new ListItem\n	text: \"Boutique partners\"\n	left: \"arrow-right\"\n	after: faq\n\ncontact_us = new MeContactUs\n	after: partners\n	y: M_spacer\n	backgroundColor: \"#ffffff\"\n	height: 300\n\nmeScroll.updateContent() # Update scroll\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Pages/PDP":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# PDP Screen container that can be used by Flow Component\npdpScreen = new Layer\n	width: Screen.width\n	height: Screen.height # Mind to remove statusbar height later.\n	backgroundColor: \"purple\"\n\npdpHeader = new Header\n	name: \"header\"\n	iconLeft: \"big-arrow\"\n	iconRight: \"bag\"\n	search: true\n	backgroundColor: null\n\n# Create default ScrollComponent\npdpScroll = new ScrollComponent\n	size: Screen.size\n	backgroundColor: \"white\"\n	scrollHorizontal: false\n	directionLock: true # avoids scroll when product swiping\n	contentInset: \n		bottom: 120\n	parent: pdpScreen\n\npdpHeroUnit = new PDPHeroUnit\n	parent: pdpScroll.content\n\nselector = new Selector\n	placeholder: \"Select sdf your size\"\n	after: pdpHeroUnit\n	\ndescription = new Accordion\n	expanded: true\n	labelText: \"Description\"\n	content: acc_description_conetent\n	after: selector\n	\nsizeAndFeet = new Accordion\n	after: description\n	labelText: \"Size & Fit\"\n	content: acc_size_content\n	\ncareContent = new Accordion\n	content: acc_care_content\n	labelText: \"Composition & Care\"\n	after: sizeAndFeet\n\naccList = new AccordionGroup\n	after: selector\n	parent: scroll.content\n	children: [description, sizeAndFeet, careContent]\n\ncontactUs = new MeContactUs\n	after: accList\n	\nrecomendedList = new RecommendedListUnit\n	parent: scroll.content\n	shopAllBtn: false\n	after: contactUs\n	y: L_spacer\n\n# Update Y pos of components below\naccList.on \"change:height\", ->\n	contactUs.y = accList.maxY\n	recomendedList.y = contactUs.maxY + L_spacer\n\npdpScroll.updateContent() # Update scroll\npdpHeroUnit.bringToFront()\n\naddToBag = new ButtonFixed\n	text: \"Add to bag\"\n	parent: pdpScreen\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Pages/PLP":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# PLP Screen container that can be used by Flow Component\nplpScreen = new Layer\n	width: Screen.width\n	height: Screen.height # Mind to remove statusbar & tabbar height later.\n	backgroundColor: \"white\"\n\nplpHeader = new Header\n	title: \"Summer\"\n	subTitle: \"7 items\"\n	iconLeft: \"big-arrow\"\n	iconRight: \"bag\"\n	search: true\n	parent: plpScreen\n\n# Create default ScrollComponent\nplpScroll = new ScrollComponent\n	width: Screen.width\n	height: Screen.height - (plpHeader.height)\n	scrollHorizontal: false\n	y: plpHeader.maxY\n	parent: plpScreen\n\n# Product list array\nPLPlistArr = JSON.parse Utils.domLoadDataSync $+\"default/plp.json\"\n\n# Refine Filter's array\nrefineFiltersArray = []\nfor i in [0...PLPlistArr.length]\n	refineFiltersArray.push PLPlistArr[i].brand.charAt(0) + PLPlistArr[i].brand.slice(1).toLowerCase()\n	\n# Refine filter\nrefineFilter = new RefineFilter\n	after: plpHeader\n	itemsArray: refineFiltersArray\n\n# Refine filter animation on sroll\nhideRefine = new Animation refineFilter,\n	y: -refineFilter.height\n	options:\n		time: 0.2\nshowRefine = hideRefine.reverse()\n\nplpScroll.onScroll (event) ->\n	if event.deltaY < 2 and plpScroll.content.y < -68\n		hideRefine.start()\n	else if event.deltaY > 2\n		showRefine.start()\n\n# Generate product listing cards\nproductCards = new ProductListingUnit\n	parent: plpScroll.content\n	y: refineFilter.height\n\nplpHeader.bringToFront() # Bring header to front\nplpScroll.updateContent() # Update scroll\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Pages/Refine":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# Refine Filters\nstatus_bar = new StatusBar\n\nheader_refine = new Header\n	after: status_bar\n	title: \"Refine\"\n	iconLeft: \"big-cross\"\n\n# Create ScrollComponent\nscroll = new ScrollComponent\n	y: header_refine.maxY\n	height: Screen.height - status_bar.height - header_refine.height\n	width: Screen.width\n	backgroundColor: \"#ffffff\"\n	scrollHorizontal: false\nscroll.content.backgroundColor = \"#ffffff\"\n\n\ntitle1 = new ListTitle\n	text: \"Sort by\"\n	parent: scroll.content\n	y: M_spacer\n\nsortByList = new ListRadioSelect\n	selectArray: [\n		{text : \"Our Picks\", on : true}, \n		{text : \"New Items\"}\n		{text : \"Price (high first)\"}\n		{text : \"Price (low first)\"}\n		]\n	after: title1\n\ntitle2 = new ListTitle\n	text: \"Filter by\"\n	y: M_spacer\n	after: sortByList\n\nlistItem1 = new ListItem\n	text: \"Designers\"\n	left: \"arrow-right\"\n	after: title2\n\nlistItem2 = new ListItem\n	text: \"Colours\"\n	left: \"arrow-right\"\n	after: listItem1\n\nlistItem3 = new ListItem\n	text: \"Price Range\"\n	left: \"arrow-right\"\n	after: listItem2\n\nlistItem4 = new ListItem\n	text: \"F90 Delivery\"\n	left: \"arrow-right\"\n	after: listItem3\n\nlistItem5 = new ListItem\n	text: \"Same Day Delivery\"\n	left: \"arrow-right\"\n	after: listItem4\n\nlistItem6 = new ListItem\n	text: \"Sale Discount\"\n	left: \"arrow-right\"\n	after: listItem5\n\n\nscroll.updateContent() # Update scroll\n\n\nshowResultsButon = new ButtonFixed\n	text: \"Show 1250 results\"\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Pages/Search-Page":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n######### Snippet Search Page #########\nstatusBar = new StatusBar\n	backgroundColor: null\n\nflow = new FlowComponent\n		\ncategoriesPage = new CategoriesPage\n	x: Screen.width\n	actions: {\n		\"item1\": -> print \"Tap!\",\n		\"item2\": -> print \"And another Tap!\"\n	}\n\ncategoriesPage.header.iconLeft_layer.onTap ->\n	flow.showPrevious()\n\ndesignersPage = new DesignersPage\n	x: Screen.width\n	actions: {\n		\"2682082\": -> print \"Yo!\"\n	}\n	\ndesignersPage.header.iconLeft_layer.onTap ->\n	flow.showPrevious()\n\nsearchPage = new Layer\n	width: Screen.width\n	height: Screen.height\n	backgroundColor: \"white\"\n	\nsearchCmp = new SearchUnit\n	parent: searchPage\n	actions: {\n		\"2682082\": -> print \"It's my Tap!\"\n	}\n\ndesignersListItem = new ListItem\n	type: \"wide\"\n	right: \"arrow-right\"\n	text: \"Designers\"\n	after: searchCmp\n\ndesignersListItem.onTap ->\n	flow.showNext(designersPage)\n\ncategoriesListItem = new ListItem\n	type: \"wide\"\n	right: \"arrow-right\"\n	text: \"Categories\"\n	after: designersListItem\n\ncategoriesListItem.onTap ->\n	flow.showNext(categoriesPage)\n\nflow.showNext(searchPage)\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Pages/Wishlist-page":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n########## Wishlist Page ###########\nstatusBar = new StatusBar\n\nwishListPage = new Layer\n	width: Screen.width\n	height: Screen.height\n	backgroundColor: \"white\"\n\nwishlistHeader = new Header\n	parent: wishListPage\n	after: statusBar\n	title: \"Wishlist\"\n	iconRight: \"bag\"\n	search: true\n\nwishlistTabs = new Tabs\n	parent: wishListPage\n	after: wishlistHeader\n	items: [\"all\", \"on sale\"]\n\nwishlistTabs.on_sale.text.color = \"red\"\n\nwishlistUnit = new WishlistUnit\n	parent: wishListPage\n	after: wishlistTabs\n	height: Screen.height - wishlistTabs.maxY\n	array: [\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"swing denim jacket\",\n			\"image\": \"modules/FFKit/content/default/products/women/01.jpg\",\n			\"brand\": \"BALENCIAGA\",\n			\"price\": \"£1,259\"\n		},\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"Gucci logo T-shirt with shooting stars\",\n			\"image\": \"modules/FFKit/content/default/products/women/02.jpg\",\n			\"brand\": \"GUCCI\",\n			\"price\": \"£1,500\"\n		},\n		{\n			\"season\": \"\",\n			\"shortDescription\": \"sleeveless V-neck stamp print dress\",\n			\"image\": \"modules/FFKit/content/default/products/women/03.jpg\",\n			\"brand\": \"GUCCPETER PILOTTOI\",\n			\"price\": \"£739\"\n		},\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"fringed netted midi dress\",\n			\"image\": \"modules/FFKit/content/default/products/women/05.jpg\",\n			\"brand\": \"CALVIN KLEIN 205W39NYC\",\n			\"price\": \"£1,575\"\n		},\n		{\n			\"season\": \"\",\n			\"shortDescription\": \"New Swing shirt\",\n			\"image\": \"modules/FFKit/content/default/products/women/06.jpg\",\n			\"brand\": \"BALENCIAGA\",\n			\"price\": \"£1,050\"\n		}\n	]\n\nwishlistHeader.title = \"Wishlist (\" + wishlistUnit.content.children.length + \")\"\n	\nwishlistUnit.listcard_1.onTap ->\n	print \"Tap!\"\n\nwishlistUnit.states =\n	hide:\n		x: -Screen.width\n	animationOptions:\n		time: 0.2\n\n# On Sale\nwishlistUnitSale = new WishlistUnit\n	parent: wishListPage\n	x: Screen.width\n	after: wishlistTabs\n	height: Screen.height - wishlistTabs.maxY\n	array: [\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"swing denim jacket\",\n			\"image\": \"modules/FFKit/content/default/products/women/01.jpg\",\n			\"brand\": \"BALENCIAGA\",\n			\"price\": \"£1,259\"\n		},\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"Gucci logo T-shirt with shooting stars\",\n			\"image\": \"modules/FFKit/content/default/products/women/02.jpg\",\n			\"brand\": \"GUCCI\",\n			\"price\": \"£1,500\"\n		}\n	]\n\nwishlistUnitSale.states =\n	show:\n		x: 0\n	animationOptions:\n		time: 0.4\n		curve: Spring(damping: 0.9)\n\n# On tab animation\nwishlistTabs.on_sale.onTap ->\n	wishlistUnit.animate(\"hide\")\n	wishlistUnitSale.animate(\"show\")\n\nwishlistTabs.all.onTap ->\n	wishlistUnit.animate(\"default\")\n	wishlistUnitSale.animate(\"default\")\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Scroll/Scroll-All-Home-Units":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Create default ScrollComponent\nscroll = new ScrollComponent\n	size: Screen.size\n	scrollHorizontal: false\n\n# Create hero unit\nunit1 = new HeroUnit\n	title: \"Hello World\"\n	subTitle: \"Shop now\"\n	cover: $+\"default/hero-01.jpg\"\n	parent: scroll.content\n\n# Create product unit\nunit2 = new ProductUnit\n	title: \"Hello World\"\n	description: \"Selection of new items has just arrived to our boutiques.\"\n	productsArray: JSON.parse Utils.domLoadDataSync $+\"default/products.json\"\n	parent: scroll.content\n	y: unit1.maxY\n\n# Create product set\nunit3 = new ProductSet\n	parent: scroll.content\n	title: \"Hello World\"\n	subTitle: \"Shop Now\"\n	cover:  $+\"default/hero-01.jpg\", \n	productsArray: JSON.parse Utils.domLoadDataSync $+\"default/products.json\"\n	parent: scroll.content\n	y: unit2.maxY\n\n# Divider line\nline = new Keyline\n	parent: scroll.content\n	y: unit3.maxY\n\n# Create feature unit with product image\nunit4 = new FeatureUnit\n	title: \"Hello World\"\n	subTitle: \"Shop now\"\n	description: \"Selection of new items has just arrived to our boutiques.\"\n	cover: $+\"default/product-01.jpg\"\n	parent: scroll.content\n	y: line.maxY\n\n# Creating product hero\nunit5 = new ProductHero\n	title: \"Hello World\"\n	subTitle: \"Please see our reccomendations, based on designers you love.\"\n	description: \"There was a shift in sportswear this season. Sure, expected injections of nineties youth culture courtesy of Gosha and the gang were still present, but the general mood played to the more distant past of seventies and eighties athletic wear.\"\n	cover: $+\"default/product-hero-01.jpg\"\n	productsArray: JSON.parse Utils.domLoadDataSync $+\"default/products.json\"\n	parent: scroll.content\n	y: unit4.maxY\n\nscroll.updateContent() # Update scroll\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Scroll/Scroll-Empty":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Create default ScrollComponent\nscroll = new ScrollComponent\n	size: Screen.size\n	scrollHorizontal: false\n\n# unit 1\n# unit = new unitClass\n# 	parent: scroll.content\n\n# unit 2\n# unit = new unitClass\n# 	parent: scroll.content\n\n# unit 3\n# unit = new unitClass\n# 	parent: scroll.content\n\n\nscroll.updateContent() # Update scroll\n";
};


},{}],"FFKit/snippets/FFKit-snippets/TextLayers":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\ntext1 = new FFTextLayer\n	textStyle: \"XLBold\"\n	text: \"XLarge — 26 Bold\"\n	y: 100\n	x: M_spacer\n	\ntext2 = new FFTextLayer\n	textStyle: \"LBold\"\n	text: \"Large — 18 Bold\"\n	y: text1.maxY + M_spacer\n	x: M_spacer\n	\ntext3 = new FFTextLayer\n	textStyle: \"L\"\n	text: \"Large — 18 Book\"\n	y: text2.maxY + M_spacer\n	x: M_spacer\n\ntext4 = new FFTextLayer\n	textStyle: \"MCond\"\n	text: \"Medium — 14 Condenced\"\n	y: text3.maxY + M_spacer\n	x: M_spacer\n\ntext5 = new FFTextLayer\n	textStyle: \"MBold\"\n	text: \"Medium — 15 Bold\"\n	y: text4.maxY + M_spacer\n	x: M_spacer\n\ntext6 = new FFTextLayer\n	textStyle: \"M\"\n	text: \"Medium — 15 Book\"\n	y: text5.maxY + M_spacer\n	x: M_spacer\n\ntext7 = new FFTextLayer\n	textStyle: \"SBold\"\n	text: \"Small — 12 Bold\"\n	y: text6.maxY + M_spacer\n	x: M_spacer\n\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/FeatureUnit-Product-":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Create feature unit with product image\nfeatureUnit = new FeatureUnit\n	title: \"Hello World\"\n	subTitle: \"Shop now\"\n	description: \"Selection of new items has just arrived to our boutiques.\"\n	cover: $+\"default/product-01.jpg\"\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/FeatureUnit":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Create feature unit\nfeatureUnit = new FeatureUnit\n	title: \"Hello World\"\n	subTitle: \"Shop now\"\n	description: \"Selection of new items has just arrived to our boutiques.\"\n	cover: $+\"default/feature-01.jpg\"\n	nopadding: yes\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/GenderSwitch":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Create gender switch banner\ngenderSwitch = new GenderSwitch\n	text: \"Shop Men\"\n	type: \"men\"\n	gradient: yes\n# 	banner: $+\"default/feature-00.jpg\"\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/HeroUnit-Slider-":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Create Hero unit with multiple slides\nheroSlider = new HeroUnit\n	sliderArray: [\n		{title : \"Title 1\" , subTitle: \"Shop Now\", cover: $+\"default/hero-00.jpg\"}\n		{title : \"Title 2\" , subTitle: \"Shop Now\", cover: $+\"default/hero-01.jpg\"}\n	]\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/HeroUnit":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Create hero unit\nheroUnit = new HeroUnit\n	title: \"Hello World\"\n	subTitle: \"Shop now\"\n	cover: $+\"default/hero-01.jpg\"\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/OrderTraker-Slider-":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Order traker slider\norder_traker_slider = new OrderTraker\n	sliderArray: [\n		{title : \"Title 1\" , subTitle: \"date1\", image: $+\"default/product-01.jpg\", progress: 75,}\n		{title : \"Title 2\" , subTitle: \"date2\", image: $+\"default/hero-01.jpg\", progress: 50, progStart:25}\n		{title : \"Title 2\" , subTitle: \"date3\", image: $+\"default/hero-01.jpg\", progress: 75,}\n		{title : \"Title 2\" , subTitle: \"date4\", image: $+\"default/hero-01.jpg\", progress: 100, progStart:50}\n	]\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/OrderTraker":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Order traker unit\norder_traker = new OrderTraker\n	title: \"We've shipped your order\"\n	subTitle: \"Expected: 6 – 8 Jul\"\n	image: $+\"default/product-01.jpg\"\n	progress: 50\n	progStart: 25\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/PDPHeroUnit":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# PDP Hero\nmyArray = JSON.parse Utils.domLoadDataSync \"modules/FFKit/units/PDPHeroUnit/data/productImages.json\"\n\npdpHeroUnit = new PDPHeroUnit\n    parent: scroll.content\n    array: myArray\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/ProductHero":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# Creating product hero\nproductHero = new ProductHero\n	title: \"Hello World\"\n	subTitle: \"Please see our reccomendations, based on designers you love.\"\n	description: \"There was a shift in sportswear this season. Sure, expected injections of nineties youth culture courtesy of Gosha and the gang were still present, but the general mood played to the more distant past of seventies and eighties athletic wear.\"\n	cover: $+\"default/product-hero-01.jpg\"\n	productsArray: JSON.parse Utils.domLoadDataSync $+\"default/products.json\"\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/ProductListingUnit":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# Create default ScrollComponent\nscroll = new ScrollComponent\n	size: Screen.size\n	scrollHorizontal: false\n	\n# Create Product Listing Unit\nlistUnit = new ProductListingUnit\n	parent: scroll.content\n	array: [\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"swing denim jacket\",\n			\"image\": \"modules/FFKit/content/default/products/women/01.jpg\",\n			\"brand\": \"BALENCIAGA\",\n			\"price\": \"£1,259\"\n		},\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"Gucci logo T-shirt with shooting stars\",\n			\"image\": \"modules/FFKit/content/default/products/women/02.jpg\",\n			\"brand\": \"GUCCI\",\n			\"price\": \"£1,500\"\n		},\n		{\n			\"season\": \"\",\n			\"shortDescription\": \"sleeveless V-neck stamp print dress\",\n			\"image\": \"modules/FFKit/content/default/products/women/03.jpg\",\n			\"brand\": \"GUCCPETER PILOTTOI\",\n			\"price\": \"£739\"\n		},\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"fringed netted midi dress\",\n			\"image\": \"modules/FFKit/content/default/products/women/05.jpg\",\n			\"brand\": \"CALVIN KLEIN 205W39NYC\",\n			\"price\": \"£1,575\"\n		},\n		{\n			\"season\": \"\",\n			\"shortDescription\": \"New Swing shirt\",\n			\"image\": \"modules/FFKit/content/default/products/women/06.jpg\",\n			\"brand\": \"BALENCIAGA\",\n			\"price\": \"£1,050\"\n		}\n	]\n\n# Update scroll\nscroll.updateContent()";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/ProductSet":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Create product set\nproductSet = new ProductSet\n	parent: scroll.content\n	title: \"Hello World\"\n	subTitle: \"Shop Now\"\n	cover: $+\"default/hero-01.jpg\", \n	productsArray: JSON.parse Utils.domLoadDataSync $+\"default/products.json\"\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/ProductUnit-Array-":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Data array\narray = \n[\n	{\n	title: \"Hello World\", \n	description: \"Please see our reccomendations, based on designers you love.\", \n	productsArray: [\n			{ # Product 1\n				\"brand\": { \"name\": \"GUCCI\" }, \n				\"shortDescription\": \"Tiger embroided hooded sweatshirt\", \n				\"price\": \"£2420\", \n				\"images\": [{ \"isLocal\": true, \"url\": $+\"default/products/01.jpg\"}]\n			} \n	]}\n]\n\n# Create product unit\nunit = new ProductUnit\n	title: array[0].title\n	description: array[0].description\n	productsArray: array[0].productsArray\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/ProductUnit-External-JSON-":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\n# Create product unit\nproductUnit = new ProductUnit\n	title: \"Hello World\"\n	description: \"Selection of new items has just arrived to our boutiques.\"\n	productsArray: JSON.parse Utils.domLoadDataSync $+\"default/products.json\"\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/ProductUnit":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# Create product unit\nproductUnit = new ProductUnit\n    title: \"Hello Workd\"\n    description: \"Selection of new items has just arrived to our boutiques.\"\n    productsArray: [\n        { # Product 1 \n        \"shortDescription\": \"yellow zebra bag \"\n        \"images\": [\"url\": $+\"default/products/01.jpg\"]\n        \"brand\": {\"name\": \"Prada\"},\n        \"price\": 135.0\n        }\n    ]\n	";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/RecommendedListUnit":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n# Recomended List\nscroll = new ScrollComponent\n	size: Screen.size\n	scrollHorizontal: false\n	contentInset: \n		bottom: M_spacer\n\nrecomendedList = new RecommendedListUnit\n	parent: scroll.content\n	icon: true\n	border: true\n	description: true\n\nscroll.updateContent() # Update scroll\n";
};


},{}],"FFKit/snippets/FFKit-snippets/Units/WishlistUnit":[function(require,module,exports){
plugin.run = function(contents, options) {
  return contents + "\n\nwishlistUnit = new WishlistUnit\n	array: [\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"swing denim jacket\",\n			\"image\": \"modules/FFKit/content/default/products/women/01.jpg\",\n			\"brand\": \"BALENCIAGA\",\n			\"price\": \"£1,259\"\n		},\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"Gucci logo T-shirt with shooting stars\",\n			\"image\": \"modules/FFKit/content/default/products/women/02.jpg\",\n			\"brand\": \"GUCCI\",\n			\"price\": \"£1,500\"\n		},\n		{\n			\"season\": \"\",\n			\"shortDescription\": \"sleeveless V-neck stamp print dress\",\n			\"image\": \"modules/FFKit/content/default/products/women/03.jpg\",\n			\"brand\": \"GUCCPETER PILOTTOI\",\n			\"price\": \"£739\"\n		},\n		{\n			\"season\": \"New Season\",\n			\"shortDescription\": \"fringed netted midi dress\",\n			\"image\": \"modules/FFKit/content/default/products/women/05.jpg\",\n			\"brand\": \"CALVIN KLEIN 205W39NYC\",\n			\"price\": \"£1,575\"\n		},\n		{\n			\"season\": \"\",\n			\"shortDescription\": \"New Swing shirt\",\n			\"image\": \"modules/FFKit/content/default/products/women/06.jpg\",\n			\"brand\": \"BALENCIAGA\",\n			\"price\": \"£1,050\"\n		}\n	]\n";
};


},{}],"FFKit/units/FeatureUnit/FeatureUnit":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.FeatureUnit = (function(superClass) {
  var ButtonFrameSpase, ctaButton, ctaFrame, descriptionButtonSpase, descriptionText, frame, resizeImage, titleDescriptionSpase, titleText;

  extend(FeatureUnit, superClass);

  frame = feature_unit;

  ctaFrame = frame.selectChild("cta");

  titleText = frame.selectChild("title");

  descriptionText = frame.selectChild("description");

  ctaButton = frame.selectChild("cta");

  titleDescriptionSpase = descriptionText.y - titleText.maxY;

  descriptionButtonSpase = ctaButton.y - descriptionText.maxY;

  ButtonFrameSpase = frame.height - ctaButton.maxY;

  function FeatureUnit(opt1) {
    var opt;
    this.opt = opt1 != null ? opt1 : {};
    opt = _.defaults(this.opt, {
      width: frame.width,
      height: frame.height,
      backgroundColor: frame.backgroundColor,
      cover: frame.selectChild("image").image,
      title: titleText.text,
      description: descriptionText.text,
      nopadding: false
    });
    FeatureUnit.__super__.constructor.call(this, opt);
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.prodBackgroud = frame.selectChild("prod_background").copy();
    this.prodBackgroud.props = {
      parent: this
    };
    this.prodBackgroud.selectChild("image").props = {
      style: {
        "mix-blend-mode": "multiply"
      },
      image: this.opt.cover
    };
    this.titleText = titleText.copy();
    this.titleText.props = {
      parent: this,
      fontFamily: "Polaris",
      fontWeight: 800,
      text: this.opt.title,
      frame: titleText.frame
    };
    this.descriptionText = descriptionText.copy();
    this.descriptionText.props = {
      parent: this,
      fontFamily: "Polaris",
      fontWeight: 400,
      text: this.opt.description,
      autoHeight: true,
      y: this.titleText.maxY + titleDescriptionSpase
    };
    this.shopNowBtn = new Button({
      parent: this,
      frame: ctaButton.frame,
      x: ctaButton.x,
      y: this.descriptionText.maxY + descriptionButtonSpase,
      text: ctaButton.selectChild("button_text").text
    });
    switch (this.opt.description) {
      case null:
      case "none":
      case "":
        this.descriptionText.destroy();
        this.shopNowBtn.y = this.titleText.maxY + descriptionButtonSpase;
        this.height = this.shopNowBtn.maxY + ButtonFrameSpase;
        break;
      default:
        this.height = this.shopNowBtn.maxY + ButtonFrameSpase;
    }
    if (this.opt.nopadding) {
      resizeImage(this.prodBackgroud);
    }
  }

  resizeImage = function(layer) {
    layer.selectChild("image").height = layer.height;
    layer.selectChild("image").width = layer.width;
    layer.selectChild("image").midX = layer.width / 2;
    return layer.selectChild("image").y = 0;
  };

  FeatureUnit.define('cover', {
    get: function() {
      return this.opt.cover;
    },
    set: function(value) {
      if (!!this.children.length) {
        return this.selectChild("image").image = value;
      }
    }
  });

  FeatureUnit.define('title', {
    get: function() {
      return this.opt.title;
    },
    set: function(value) {
      if (!!this.children.length) {
        return this.titleText.text = value;
      }
    }
  });

  FeatureUnit.define('description', {
    get: function() {
      return this.opt.description;
    },
    set: function(value) {
      if (!!this.children.length) {
        this.descriptionText.text = value;
        this.shopNowBtn.y = this.descriptionText.maxY + descriptionButtonSpase;
        return this.height = this.shopNowBtn.maxY + ButtonFrameSpase;
      }
    }
  });

  FeatureUnit.define('nopadding', {
    get: function() {
      return this.opt.nopadding;
    },
    set: function(value) {
      if (!!this.children.length && value) {
        return resizeImage(this.prodBackgroud);
      }
    }
  });

  return FeatureUnit;

})(Layer);


},{}],"FFKit/units/GenderSwitch/GenderSwitch":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.GenderSwitch = (function(superClass) {
  extend(GenderSwitch, superClass);

  function GenderSwitch(opt) {
    var cmp_frame;
    this.opt = opt != null ? opt : {};
    cmp_frame = gender_switch;
    this.cta = cmp_frame.selectChild("cta").copy();
    this.gradient_ = cmp_frame.selectChild("shape").copy();
    this.banner_ = cmp_frame.selectChild("banner").copy();
    GenderSwitch.__super__.constructor.call(this, _.defaults(this.opt, {
      size: cmp_frame.size,
      backgroundColor: cmp_frame.backgroundColor
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.banner_.parent = this;
    this.gradient_.parent = this;
    this.cta.parent = this;
  }

  GenderSwitch.define("text", {
    get: function() {
      return this.opt.text;
    },
    set: function(value) {
      this.opt.text = value;
      return this.cta.selectChild("button_text").text = value;
    }
  });

  GenderSwitch.define("type", {
    get: function() {
      return this.opt.type;
    },
    set: function(value) {
      this.opt.type = value;
      if (this.opt.type === "women") {
        this.banner_.image = $ + "default/genderSwitch-00.jpg";
      }
      if (this.opt.type === "men") {
        return this.banner_.image = $ + "default/genderSwitch-01.jpg";
      }
    }
  });

  GenderSwitch.define("banner", {
    get: function() {
      return this.opt.banner;
    },
    set: function(value) {
      this.opt.banner = value;
      return this.banner_.image = value;
    }
  });

  GenderSwitch.define("gradient", {
    get: function() {
      return this.opt.gradient;
    },
    set: function(value) {
      this.opt.gradient = value;
      if (this.opt.gradient === true) {
        this.gradient_.visible = true;
      }
      if (this.opt.gradient === false) {
        return this.gradient_.visible = false;
      }
    }
  });

  return GenderSwitch;

})(Layer);


},{}],"FFKit/units/HeroUnit/HeroUnit":[function(require,module,exports){
var generateDots, paralaxOnScroll,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

generateDots = require('../../helper-functions/private/generateDots.coffee').generateDots;

paralaxOnScroll = require('../../helper-functions/private/paralaxOnScroll.coffee').paralaxOnScroll;

window.HeroUnit = (function(superClass) {
  extend(HeroUnit, superClass);

  function HeroUnit(opt) {
    var child, i, j, k, len, ref, ref1;
    this.opt = opt != null ? opt : {};
    if (this.opt.sliderArray === void 0) {
      this.unit = hero_unit.copy();
      this.unit.props = {
        x: 0,
        y: 0
      };
    } else {
      this.unit = new PageComponent({
        width: hero_unit.width,
        height: hero_unit.height,
        scrollVertical: false,
        originX: 0.5,
        directionLock: true
      });
      this.slides = [];
      for (i = j = 0, ref = this.opt.sliderArray.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        this.slide = hero_unit.copy();
        this.unit.addPage(this.slide);
        this.slides.push(this.slide);
      }
      generateDots(this.unit, this.opt.sliderArray);
    }
    HeroUnit.__super__.constructor.call(this, _.defaults(this.opt, {
      paralax: true
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.unit.parent = this;
    this.height = hero_unit.height;
    this.width = hero_unit.width;
    if (this.opt.paralax === true && this.opt.sliderArray === void 0) {
      paralaxOnScroll(this);
    }
    if (this.opt.paralax === true && this.opt.sliderArray !== void 0) {
      ref1 = this.slides;
      for (k = 0, len = ref1.length; k < len; k++) {
        child = ref1[k];
        paralaxOnScroll(child);
      }
    }
  }

  HeroUnit.define('title', {
    get: function() {
      return this.opt.title;
    },
    set: function(value) {
      if (this.opt.sliderArray === void 0) {
        this.unit.selectChild("title").text = value;
        return this.unit.selectChild('title').autoHeight = true;
      }
    }
  });

  HeroUnit.define('subTitle', {
    get: function() {
      return this.opt.subTitle;
    },
    set: function(value) {
      if (this.opt.sliderArray === void 0) {
        this.unit.selectChild("sub_title").text = value;
        return this.unit.selectChild('sub_title').y = this.unit.selectChild('title').maxY;
      }
    }
  });

  HeroUnit.define('cover', {
    get: function() {
      return this.opt.cover;
    },
    set: function(value) {
      if (this.opt.sliderArray === void 0) {
        return this.unit.selectChild("image").image = value;
      }
    }
  });

  HeroUnit.define('sliderArray', {
    get: function() {
      return this.opt.sliderArray;
    },
    set: function(value) {
      var i, j, ref, results, unit;
      results = [];
      for (i = j = 0, ref = value.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        unit = this.slides[i];
        unit.selectChild("title").text = value[i].title;
        unit.selectChild("sub_title").text = value[i].subTitle;
        unit.selectChild("image").image = value[i].cover;
        unit.selectChild('title').autoHeight = true;
        results.push(unit.selectChild('sub_title').y = unit.selectChild('title').maxY);
      }
      return results;
    }
  });

  return HeroUnit;

})(Layer);


},{"../../helper-functions/private/generateDots.coffee":"FFKit/helper-functions/private/generateDots","../../helper-functions/private/paralaxOnScroll.coffee":"FFKit/helper-functions/private/paralaxOnScroll"}],"FFKit/units/HeroUnit/data/data":[function(require,module,exports){
exports.userCameoNew = [
  {
    type: "HeroUnit",
    title: "Bella wears vintage",
    subTitle: "Shop now",
    cover: "images/v2/cover-00a.jpg"
  }
];


},{}],"FFKit/units/OrderTraker/OrderTraker":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.OrderTraker = (function(superClass) {
  extend(OrderTraker, superClass);

  function OrderTraker(opt) {
    var cardWidth, comp_frame, current, currentX, i, j, ref, startWidth, value;
    this.opt = opt != null ? opt : {};
    comp_frame = order_traker;
    if (this.opt.sliderArray === void 0) {
      this.card_frame = comp_frame.selectChild("order_traker_card").copy();
      this.progress_frame = this.card_frame.selectChild("progress");
      this.progress_frame.width = 0;
    } else {
      this.slider_frame = new PageComponent({
        width: Screen.width,
        height: comp_frame.height,
        scrollVertical: false,
        originX: 0.5,
        directionLock: true,
        contentInset: {
          left: 12,
          right: 12
        }
      });
      this.slides = [];
      cardWidth = 298;
      for (i = j = 0, ref = this.opt.sliderArray.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        this.slide = comp_frame.selectChild("order_traker_card").copy();
        this.slide.width = cardWidth;
        this.slide.selectChild("progress_bg").width = cardWidth;
        if (this.opt.sliderArray[i].progStart === void 0) {
          this.opt.sliderArray[i].progStart = 0;
        }
        startWidth = (this.opt.sliderArray[i].progStart * cardWidth) / 100;
        this.slide.selectChild("progress").width = startWidth;
        currentX = (cardWidth + 12) * i;
        this.slide.props = {
          y: 12,
          x: currentX,
          parent: this.slider_frame.content
        };
        this.slides.push(this.slide);
      }
    }
    OrderTraker.__super__.constructor.call(this, _.defaults(this.opt, {
      height: comp_frame.height,
      width: comp_frame.width,
      backgroundColor: comp_frame.backgroundColor
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    if (this.opt.sliderArray === void 0) {
      addChildren(this, [this.card_frame]);
    } else {
      addChildren(this, [this.slider_frame]);
      current = this.slider_frame.horizontalPageIndex(this.slider_frame.currentPage);
      startWidth = (this.progStartValues[current] * cardWidth) / 100;
      this.slides[current].selectChild("progress").width = startWidth;
      value = this.opt.sliderArray[current].progress;
      this.slides[current].selectChild("progress").animate({
        width: (value * this.slides[current].selectChild("progress_bg").width) / 100,
        options: {
          curve: Spring({
            damping: 0.5
          }),
          time: 0.5,
          delay: 0.4
        }
      });
      this.progStartValues[current] = this.opt.sliderArray[current].progress;
      this.slider_frame.on("change:currentPage", (function(_this) {
        return function(event, layer) {
          var newWidth;
          current = layer.horizontalPageIndex(layer.currentPage);
          startWidth = (_this.progStartValues[current] * cardWidth) / 100;
          _this.slides[current].selectChild("progress").width = startWidth;
          newWidth = (_this.progValues[current] * _this.slides[current].selectChild("progress_bg").width) / 100;
          _this.slides[current].selectChild("progress").animate({
            width: newWidth,
            options: {
              curve: Spring({
                damping: 0.5
              }),
              time: 0.5,
              delay: 0.4
            }
          });
          return _this.progStartValues[current] = _this.progValues[current];
        };
      })(this));
    }
  }

  OrderTraker.define("title", {
    get: function() {
      return this.opt.title;
    },
    set: function(value) {
      if (this.opt.sliderArray === void 0) {
        this.opt.title = value;
        return this.card_frame.selectChild("title").text = value;
      }
    }
  });

  OrderTraker.define("subTitle", {
    get: function() {
      return this.opt.subTitle;
    },
    set: function(value) {
      if (this.opt.sliderArray === void 0) {
        this.opt.subTitle = value;
        return this.card_frame.selectChild("sub_title").text = value;
      }
    }
  });

  OrderTraker.define("image", {
    get: function() {
      return this.opt.image;
    },
    set: function(value) {
      if (this.opt.sliderArray === void 0) {
        this.opt.image = value;
        this.card_frame.selectChild("image").image = value;
        return this.card_frame.selectChild("image").style = {
          "mix-blend-mode": "multiply"
        };
      }
    }
  });

  OrderTraker.define("progStart", {
    get: function() {
      return this.opt.progStart;
    },
    set: function(value) {
      if (this.opt.sliderArray === void 0) {
        return this.opt.progStart = value;
      }
    }
  });

  OrderTraker.define("progress", {
    get: function() {
      return this.opt.progress;
    },
    set: function(value) {
      var progStartValue;
      if (this.opt.sliderArray === void 0) {
        this.opt.progress = value;
        if (this.opt.progStart === void 0) {
          this.progress_frame.width = 0;
        } else {
          progStartValue = (this.opt.progStart * this.card_frame.width) / 100;
          this.progress_frame.width = progStartValue;
        }
        return this.progress_frame.animate({
          width: (value * this.card_frame.width) / 100,
          options: {
            curve: Spring({
              damping: 0.5
            }),
            time: 0.5,
            delay: 0.4
          }
        });
      }
    }
  });

  OrderTraker.define('sliderArray', {
    get: function() {
      return this.opt.sliderArray;
    },
    set: function(value) {
      var i, j, ref, results, unit;
      if (this.opt.sliderArray !== void 0) {
        this.opt.sliderArray = value;
        this.progValues = [];
        this.progStartValues = [];
        results = [];
        for (i = j = 0, ref = value.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          unit = this.slides[i];
          unit.selectChild("title").text = value[i].title;
          unit.selectChild("sub_title").text = value[i].subTitle;
          unit.selectChild("image").image = value[i].image;
          unit.selectChild("image").style = {
            "mix-blend-mode": "multiply"
          };
          this.progValues.push(value[i].progress);
          if (value[i].progStart === void 0) {
            value[i].progStart = 0;
          }
          results.push(this.progStartValues.push(value[i].progStart));
        }
        return results;
      }
    }
  });

  return OrderTraker;

})(Layer);


},{}],"FFKit/units/OrderTraker/data/data":[function(require,module,exports){
arguments[4]["FFKit/units/HeroUnit/data/data"][0].apply(exports,arguments)
},{"dup":"FFKit/units/HeroUnit/data/data"}],"FFKit/units/PDPHeroUnit/PDPHeroUnit":[function(require,module,exports){
var generateDots,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

generateDots = require('../../helper-functions/private/generateDots.coffee').generateDots;

window.PDPHeroUnit = (function(superClass) {
  extend(PDPHeroUnit, superClass);

  function PDPHeroUnit(opt) {
    var child, cover_frame, currentBaseDescrriptionPriceY, currentBaseDescrriptionY, currentImageSliderHeight, defaultArray, i, j, len, ref, unit_frame;
    this.opt = opt != null ? opt : {};
    unit_frame = pdp_hero;
    defaultArray = JSON.parse(Utils.domLoadDataSync("modules/FFKit/units/PDPHeroUnit/data/productImages.json"));
    unit_frame.selectChild("dots").destroy();
    this.imageSlider = new PageComponent({
      name: "imageSlider",
      width: unit_frame.width,
      height: unit_frame.selectChild("image").height,
      scrollVertical: false,
      originX: 0.5,
      directionLock: true,
      clip: true
    });
    PDPHeroUnit.__super__.constructor.call(this, _.defaults(this.opt, {
      name: "pdpHero",
      backgroundColor: "white",
      width: unit_frame.width,
      height: unit_frame.height,
      array: defaultArray,
      brand: unit_frame.selectChild("brand").text,
      description: unit_frame.selectChild("description").text,
      price: unit_frame.selectChild("price").text
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    ref = this.opt.array;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      child = ref[i];
      cover_frame = unit_frame.selectChild("image").copy();
      cover_frame.props = {
        image: defaultArray[i].image
      };
      this.imageSlider.addPage(cover_frame);
    }
    generateDots(this.imageSlider, this.opt.array);
    this.imageSlider.parent = this;
    this.icon = unit_frame.selectChild("wishlist-ico").copy();
    this.icon.y = Framer.Device.deviceType === "apple-iphone-x-space-gray" ? this.icon.y + 20 : this.icon.y;
    this.icon.parent = this;
    this.baseDescription_frame = unit_frame.selectChild("base_description_frame").copy();
    this.baseDescription_frame.props = {
      x: 0,
      y: unit_frame.selectChild("image").maxY,
      parent: this
    };
    this.baseDescription_frame.selectChild("title").text = this.baseDescription_frame.selectChild("brand").text = this.opt.brand;
    this.baseDescription_frame.selectChild("description").text = this.opt.description;
    this.baseDescription_frame.selectChild("price").text = this.opt.price;
    currentBaseDescrriptionY = this.baseDescription_frame.y;
    currentBaseDescrriptionPriceY = this.baseDescription_frame.selectChild("price").y;
    currentImageSliderHeight = this.imageSlider.height;
    if (this.parent && this.parent.parent.content && this.parent.parent.content.name === "content") {
      if (this.parent.parent.constructor.name === "ScrollComponent") {
        this.parent.on("change:y", (function(_this) {
          return function(offset) {
            _this.imageSlider.y = Utils.modulate(_this.parent.parent.scrollY, [0, 250], [0, 100]);
            _this.imageSlider.height = Utils.modulate(_this.parent.parent.scrollY, [0, 100], [currentImageSliderHeight, currentImageSliderHeight - 30]);
            if (Framer.Device.deviceType === "apple-iphone-x-space-gray") {
              if (_this.parent.y < -530) {
                _this.baseDescription_frame.y = -_this.parent.parent.content.y - 40;
              } else {
                _this.baseDescription_frame.y = currentBaseDescrriptionY;
              }
            } else {
              if (_this.parent.y < -550) {
                _this.baseDescription_frame.y = -_this.parent.parent.content.y - 66;
              } else {
                _this.baseDescription_frame.y = currentBaseDescrriptionY;
              }
            }
            if (_this.parent.y < -440 && _this.baseDescription_frame.selectChild("brand").opacity >= 0) {
              _this.baseDescription_frame.selectChild("brand").opacity -= 0.14;
              _this.baseDescription_frame.selectChild("description").opacity -= 0.14;
            } else if (_this.parent.y > -440 && _this.baseDescription_frame.selectChild("brand").opacity <= 1) {
              _this.baseDescription_frame.selectChild("brand").opacity += 0.14;
              _this.baseDescription_frame.selectChild("description").opacity += 0.14;
            }
            if (_this.parent.y < -490 && _this.baseDescription_frame.selectChild("price").fontSize >= 12) {
              _this.baseDescription_frame.selectChild("price").y += 4;
              _this.baseDescription_frame.selectChild("price").fontSize -= 0.3;
              _this.baseDescription_frame.selectChild("price").style.filter = "brightness(0)";
              _this.baseDescription_frame.selectChild("title").opacity += 0.1;
              return _this.baseDescription_frame.selectChild("title").y += 8.2;
            } else if (_this.parent.y > -490 && _this.baseDescription_frame.selectChild("price").fontSize <= 15) {
              _this.baseDescription_frame.selectChild("price").fontSize += 0.3;
              _this.baseDescription_frame.selectChild("price").y -= 4;
              _this.baseDescription_frame.selectChild("price").style.filter = "brightness(1)";
              _this.baseDescription_frame.selectChild("title").opacity -= 0.1;
              return _this.baseDescription_frame.selectChild("title").y -= 8.2;
            }
          };
        })(this));
      }
    }
  }

  return PDPHeroUnit;

})(Layer);


},{"../../helper-functions/private/generateDots.coffee":"FFKit/helper-functions/private/generateDots"}],"FFKit/units/ProductHero/ProductHero":[function(require,module,exports){
var paralaxOnScroll,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

paralaxOnScroll = require('../../helper-functions/private/paralaxOnScroll.coffee').paralaxOnScroll;

window.ProductHero = (function(superClass) {
  var refFrame;

  extend(ProductHero, superClass);

  refFrame = product_hero;

  function ProductHero(opt1) {
    var currentDescriptionOpacity, description, fadeFrame, layerY, opt, productSlider, scrollModulateFlag;
    this.opt = opt1 != null ? opt1 : {};
    opt = _.defaults(this.opt, {
      title: refFrame.selectChild("title").text,
      subTitle: refFrame.selectChild("sub_title").text,
      description: refFrame.selectChild("description").text,
      cover: refFrame.selectChild("image").image,
      width: refFrame.width,
      height: refFrame.height,
      backgroundColor: "rgba(0,0,0,1)",
      clip: true,
      paddingLeft: Screen.width - 40,
      paralax: true
    });
    ProductHero.__super__.constructor.call(this, opt);
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.backgroundImage = refFrame.selectChild("image").copy();
    this.backgroundImage.props = {
      parent: this,
      image: this.opt.cover
    };
    this.fadeFrame = fadeFrame = refFrame.selectChild("fade_frame").copy();
    this.fadeFrame.props = {
      parent: this
    };
    this.title = refFrame.selectChild("title").copy();
    this.title.props = {
      parent: this,
      text: this.opt.title,
      autoHeight: true
    };
    this.subTitle = refFrame.selectChild("sub_title").copy();
    this.subTitle.props = {
      parent: this,
      text: this.opt.subTitle,
      autoHeight: true
    };
    this.description = description = refFrame.selectChild("description").copy();
    this.description.props = {
      parent: this,
      text: this.opt.description
    };
    this.tapArea = new Layer({
      parent: this,
      backgroundColor: null,
      frame: refFrame.selectChild('tap_area').frame
    });
    this.productSlider = productSlider = new ProductSlider({
      parent: this,
      paddingLeft: this.opt.paddingLeft,
      array: this.opt.productsArray
    });
    this.productSlider.content.clip = false;
    this.productSlider.frame = refFrame.selectChild("page").frame;
    this.productSlider.showMoreCard.props = {
      backgroundColor: "rgba(0,0,0,0.5)",
      width: this.productSlider.showMoreCard.width * 2.5
    };
    this.productSlider.buttonShowMore.style["filter"] = "invert(1)";
    this.ctaButton = new Button({
      parent: this,
      text: refFrame.selectChild("cta").selectChild("button_text").text
    });
    this.ctaButton.frame = refFrame.selectChild("cta").frame;
    if (this.opt.paralax === true) {
      paralaxOnScroll(this);
    }
    scrollModulateFlag = true;
    layerY = this.y;
    currentDescriptionOpacity = description.opacity;
    if (this.parent && this.parent.name === "content") {
      if (this.parent.parent.constructor.name === "ScrollComponent") {
        this.parent.onMove(function(event, layer) {
          if (scrollModulateFlag === true) {
            currentDescriptionOpacity = description.opacity;
            description.opacity = Utils.modulate((layerY - this.parent.scrollPoint.y) - (this.parent.height / 2), [0, -this.parent.height / 6], [0, 1]);
            return fadeFrame.opacity = Utils.modulate((layerY - this.parent.scrollPoint.y) - (this.parent.height / 2), [0, -this.parent.height / 6], [0, 1]);
          }
        });
      }
    }
    this.productSlider.onMove(function(event, layer) {
      if (fadeFrame.opacity > 0 && this.x < 0) {
        description.opacity = Utils.modulate(this.x, [0, -this.parent.width / 4], [currentDescriptionOpacity, 0]);
      }
      if (this.x < -40) {
        return scrollModulateFlag = false;
      } else if (this.x > -40) {
        return scrollModulateFlag = true;
      }
    });
  }

  return ProductHero;

})(Layer);


},{"../../helper-functions/private/paralaxOnScroll.coffee":"FFKit/helper-functions/private/paralaxOnScroll"}],"FFKit/units/ProductListingUnit/ProductListingUnit":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.ProductListingUnit = (function(superClass) {
  extend(ProductListingUnit, superClass);

  function ProductListingUnit(opt) {
    var columnCount, columnIndex, combinedTileWidth, i, j, ref, rowIndex, tileCount, tileWidth;
    this.opt = opt != null ? opt : {};
    ProductListingUnit.__super__.constructor.call(this, _.defaults(this.opt, {
      name: "ProductListingUnit",
      width: Screen.width,
      array: JSON.parse(Utils.domLoadDataSync("modules/FFKit/units/ProductListingUnit/data/products.json")),
      backgroundColor: null,
      icon: true,
      border: true,
      description: true
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    columnCount = 2;
    tileCount = this.opt.array.length;
    combinedTileWidth = Screen.width;
    tileWidth = combinedTileWidth / columnCount;
    for (i = j = 0, ref = tileCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      columnIndex = i % columnCount;
      rowIndex = Math.floor(i / columnCount);
      this["listcard_" + (i + 1)] = new ListProductCard({
        name: "listcard_" + (i + 1),
        x: columnIndex * tileWidth,
        parent: this,
        season: this.opt.array[i].season,
        cover: this.opt.array[i].image,
        brand: this.opt.array[i].brand,
        description: this.opt.description ? this.opt.array[i].shortDescription : false,
        borderWidth: this.opt.border ? 0.5 : void 0,
        borderColor: this.opt.border ? "rgba(0,0,0,0.1)" : void 0
      });
      this["listcard_" + (i + 1)].y = rowIndex * this["listcard_" + (i + 1)].maxY;
      if (this.opt.icon === false) {
        this["listcard_" + (i + 1)].icon_frame.destroy();
      }
    }
    this.height = this.children[tileCount - 1].maxY;
  }

  return ProductListingUnit;

})(Layer);


},{}],"FFKit/units/ProductSet/ProductSet":[function(require,module,exports){
var paralaxOnScroll,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

paralaxOnScroll = require('../../helper-functions/private/paralaxOnScroll.coffee').paralaxOnScroll;

window.ProductSet = (function(superClass) {
  var frame;

  extend(ProductSet, superClass);

  frame = product_set;

  function ProductSet(opt) {
    var productSlider;
    this.opt = opt != null ? opt : {};
    this.unit = frame.copy();
    this.unit.props = {
      x: 0,
      y: 0
    };
    ProductSet.__super__.constructor.call(this, _.defaults(this.opt, {
      paralax: true
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    this.height = frame.height;
    this.width = frame.width;
    this.unit.parent = this;
    this.unit.selectChild("page").backgroundColor = null;
    this.unit.selectChild('title').autoHeight = true;
    this.unit.selectChild("sub_title").autoHeight = true;
    this.shopNowBtn = new Button({
      parent: this,
      frame: this.unit.selectChild("cta").frame,
      x: this.unit.selectChild("cta").x,
      y: this.unit.selectChild("cta").y,
      text: this.unit.selectChild("cta").selectChild("button_text").text
    });
    this.unit.selectChild("cta").destroy();
    if (this.opt.paralax === true) {
      paralaxOnScroll(this);
    }
    productSlider = new ProductSlider({
      parent: this.unit.selectChild("page"),
      array: this.opt.productsArray
    });
  }

  ProductSet.define('title', {
    get: function() {
      return this.opt.title;
    },
    set: function(value) {
      this.unit.selectChild('title').autoHeight = true;
      return this.unit.selectChild("title").text = value;
    }
  });

  ProductSet.define('subTitle', {
    get: function() {
      return this.opt.subTitle;
    },
    set: function(value) {
      this.unit.selectChild('title').autoHeight = true;
      this.unit.selectChild("sub_title").text = value;
      return this.unit.selectChild('sub_title').y = this.unit.selectChild('title').maxY + 10;
    }
  });

  ProductSet.define('cover', {
    get: function() {
      return this.opt.cover;
    },
    set: function(value) {
      return this.unit.selectChild("image").image = value;
    }
  });

  ProductSet.define('description', {
    get: function() {
      return this.opt.description;
    },
    set: function(value) {
      return this.unit.selectChild("description").text = value;
    }
  });

  return ProductSet;

})(Layer);


},{"../../helper-functions/private/paralaxOnScroll.coffee":"FFKit/helper-functions/private/paralaxOnScroll"}],"FFKit/units/ProductUnit/ProductUnit":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.ProductUnit = (function(superClass) {
  var frame;

  extend(ProductUnit, superClass);

  frame = product_unit;

  function ProductUnit(opt) {
    var cta_frame, productSlider;
    this.opt = opt != null ? opt : {};
    this.unit = frame.copy();
    this.unit.props = {
      x: 0,
      y: 0
    };
    ProductUnit.__super__.constructor.call(this, this.opt);
    this.height = frame.height;
    this.width = frame.width;
    this.unit.parent = this;
    this.unit.selectChild("page").backgroundColor = null;
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    productSlider = new ProductSlider({
      parent: this.unit.selectChild("page"),
      array: this.opt.productsArray
    });
    cta_frame = this.unit.selectChild("cta");
    this.cta = new Button({
      x: cta_frame.x,
      y: cta_frame.y,
      parent: cta_frame.parent,
      text: "Shop now"
    });
    cta_frame.destroy();
  }

  ProductUnit.define('title', {
    get: function() {
      return this.opt.title;
    },
    set: function(value) {
      this.unit.selectChild("title").text = value;
      return this.unit.selectChild('title').autoHeight = true;
    }
  });

  ProductUnit.define('description', {
    get: function() {
      return this.opt.description;
    },
    set: function(value) {
      this.unit.selectChild("description").text = value;
      this.unit.selectChild('description').autoHeight = true;
      this.unit.selectChild('description').y = this.unit.selectChild('title').maxY + 10;
      return this.unit.selectChild('page').y = this.unit.selectChild('description').maxY + 25;
    }
  });

  return ProductUnit;

})(Layer);


},{}],"FFKit/units/RecommendedListUnit/RecommendedListUnit":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.RecommendedListUnit = (function(superClass) {
  extend(RecommendedListUnit, superClass);

  function RecommendedListUnit(opt) {
    var limitedArr;
    this.opt = opt != null ? opt : {};
    this.unit_frame = recomended_list_unit.copy();
    RecommendedListUnit.__super__.constructor.call(this, _.defaults(this.opt, {
      width: this.unit_frame.width,
      height: this.unit_frame.height,
      array: JSON.parse(Utils.domLoadDataSync("modules/FFKit/units/ProductListingUnit/data/products.json")),
      shopAllBtn: true,
      icon: false,
      border: false,
      description: false
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this, this.opt.y);
    }
    limitedArr = this.opt.array.slice(0, 4);
    this.unit_frame.parent = this;
    this.unit_frame.props = {
      x: 0,
      y: 0
    };
    this.list = new ProductListingUnit({
      parent: this.unit_frame,
      y: this.unit_frame.selectChild("cards").y,
      icon: this.opt.icon,
      border: this.opt.border,
      description: this.opt.description,
      array: limitedArr
    });
    this.unit_frame.selectChild("cards").destroy();
    if (this.opt.shopAllBtn === true) {
      this.unit_frame.selectChild("cta").y = this.list.maxY + M_spacer;
      this.height = this.unit_frame.height = this.unit_frame.selectChild("cta").maxY;
    } else {
      this.unit_frame.selectChild("cta").destroy();
      this.height = this.list.maxY;
    }
  }

  return RecommendedListUnit;

})(Layer);


},{}],"FFKit/units/SearchUnit/SearchUnit":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.SearchUnit = (function(superClass) {
  var blockParentScroll, createLayers, eraseArray, findInGender, findVal;

  extend(SearchUnit, superClass);

  function SearchUnit(opt) {
    var css, i, inputFrame, item, len, parent, ref, setDefaultState, setSecondState;
    this.opt = opt != null ? opt : {};
    SearchUnit.__super__.constructor.call(this, _.defaults(this.opt, {
      width: Screen.width,
      backgroundColor: "#F5F5F5",
      height: (function() {
        switch (Framer.Device.deviceType) {
          case "apple-iphone-x-silver":
          case "apple-iphone-x-space-gray":
            return search_frame.height + 44;
          default:
            return search_frame.height + 20;
        }
      })(),
      title: search_frame.selectChild("search_title").text,
      designers: "modules/FFKit/content/default/designers.json",
      categories: "modules/FFKit/content/default/categories.json",
      actions: {
        "2682082": function() {
          return print("Tap!");
        }
      }
    }));
    this.search_comp = search_frame;
    this.header = this.search_comp.selectChild("search_header");
    this.nothingFound = this.search_comp.selectChild("nothing_found");
    this.input = this.search_comp.selectChild("search_input");
    this.leftIcon = this.search_comp.selectChild("search_input_l-icon");
    this.rightIcon = this.search_comp.selectChild("search_input_r-icon");
    this.clearBtn = this.search_comp.selectChild("clear_btn");
    this.closeBtn = this.search_comp.selectChild("cross-ico");
    parent = this;
    this.bckLayer = new Layer({
      name: "back layer",
      parent: this,
      width: Screen.width,
      height: Screen.height,
      backgroundColor: "white",
      opacity: 0,
      visible: false
    });
    this.search_comp.props = {
      parent: this,
      x: 0,
      y: Align.bottom(),
      backgroundColor: null
    };
    this.inputWrap = new Layer({
      name: "input wrap",
      parent: this.input,
      y: this.search_comp.selectChild("search_placeholder").y,
      x: this.search_comp.selectChild("search_placeholder").x,
      backgroundColor: null,
      width: this.search_comp.selectChild("search_placeholder").width,
      height: this.search_comp.selectChild("search_placeholder").height,
      html: "<input\n	class = 'search-input'\n	placeholder = '" + (this.search_comp.selectChild("search_placeholder").text) + "'>\n</input>",
      style: {
        "position": "relative"
      }
    });
    this.inputWrap.placeBehind(this.leftIcon);
    css = ".search-input {\n	position: absolute;\n	top: 1px;\n	width: " + (this.search_comp.selectChild("search_placeholder").width) + "px;\n	height: " + (this.search_comp.selectChild("search_placeholder").height) + "px;\n	font-size: 15px;\n	line-height: 1.5;\n	font-family: \"Polaris-Book\", \"Polaris\", sans-serif';\n	text-rendering: optimizeLegibility;\n	-webkit-font-smoothing: antialiased;\n}\n.search-input::-webkit-input-placeholder {\n	color: " + (this.search_comp.selectChild("search_placeholder").color) + ";\n}\n:focus {\n  outline: none;\n}";
    Utils.insertCSS(css);
    this.search_comp.selectChild("search_placeholder").destroy();
    inputFrame = document.body.querySelector('.search-input');
    this.tabs = new Tabs({
      name: "tabs",
      parent: this,
      opacity: 0,
      visible: false,
      y: Align.top(this.input.height + 50)
    });
    this.nothingFound.props = {
      parent: this.bckLayer,
      y: this.tabs.maxY + 70
    };
    this.resultsScrollCmp = new ScrollComponent({
      parent: this,
      name: "scroll",
      y: this.tabs.maxY,
      width: Screen.width,
      height: Screen.height - this.tabs.maxY,
      scrollHorizontal: false,
      visible: false,
      contentInset: {
        top: 10
      }
    });
    this.resultsScrollCmp.content.backgroundColor = null;
    this.states = {
      stateA: {
        backgroundColor: "white"
      },
      animationOptions: {
        time: 0.2
      }
    };
    this.header.states = {
      stateA: {
        y: Align.top(-this.header.height - 40)
      },
      animationOptions: {
        time: 0.3
      }
    };
    this.input.states = {
      stateA: {
        y: Align.top(16),
        borderWidth: 0
      },
      animationOptions: {
        time: 0.2
      }
    };
    this.bckLayer.states = {
      stateA: {
        opacity: 1
      },
      animationOptions: {
        time: 0.2
      }
    };
    this.tabs.states = {
      stateA: {
        opacity: 1
      },
      animationOptions: {
        time: 0.2
      }
    };
    this.search_comp.selectChild("clear_btn").states = {
      stateA: {
        opacity: 1
      },
      animationOptions: {
        time: 0.2
      }
    };
    this.search_comp.selectChild("search_input_l-icon").states = {
      stateA: {
        x: -6
      },
      animationOptions: {
        time: 0.2
      }
    };
    this.search_comp.selectChild("search_input_r-icon").states = {
      stateA: {
        opacity: 0
      },
      animationOptions: {
        time: 0.2
      }
    };
    setSecondState = (function(_this) {
      return function() {
        _this.bringToFront();
        blockParentScroll(_this, true);
        _this.animate("stateA");
        _this.header.animate("stateA");
        _this.input.animate("stateA");
        _this.leftIcon.animate("stateA");
        _this.rightIcon.animate("stateA");
        _this.bckLayer.animate("stateA");
        _this.bckLayer.visible = true;
        _this.tabs.visible = true;
        _this.search_comp.selectChild("search-ico").visible = false;
        return _this.search_comp.selectChild("cross-ico").visible = true;
      };
    })(this);
    setDefaultState = (function(_this) {
      return function() {
        blockParentScroll(_this, false);
        _this.animate("default");
        _this.header.animate("default");
        _this.input.animate("default");
        _this.leftIcon.animate("default");
        _this.rightIcon.animate("default");
        _this.bckLayer.animate("default");
        _this.bckLayer.visible = false;
        _this.search_comp.selectChild("search-ico").visible = true;
        _this.search_comp.selectChild("cross-ico").visible = false;
        _this.clearBtn.visible = false;
        _this.tabs.visible = false;
        _this.tabs.stateSwitch("default");
        return inputFrame.value = "";
      };
    })(this);
    inputFrame.addEventListener("focus", setSecondState);
    inputFrame.oninput = (function(_this) {
      return function() {
        if (inputFrame.value.length > 0) {
          _this.search_comp.selectChild("clear_btn").visible = true;
          _this.resultsScrollCmp.visible = true;
          _this.search_comp.selectChild("clear_btn").animate("stateA");
          findInGender(_this, _this.tabs.currentItem, inputFrame.value);
          _this.resultsScrollCmp.updateContent();
        } else if (inputFrame.value.length === 0) {
          eraseArray(parent.resultsScrollCmp.content.children);
          _this.search_comp.selectChild("clear_btn").animate("default");
          _this.tabs.visible = false;
          _this.tabs.animate("default");
        }
        if (_this.resultsScrollCmp.content.children.length === 0 && inputFrame.value.length > 0) {
          _this.resultsScrollCmp.visible = false;
          _this.nothingFound.visible = true;
          return _this.nothingFound.template = {
            nothing: inputFrame.value
          };
        } else if (_this.resultsScrollCmp.content.children.length > 0) {
          return _this.nothingFound.visible = false;
        }
      };
    })(this);
    this.clearBtn.onTap((function(_this) {
      return function() {
        inputFrame.value = "";
        inputFrame.focus();
        eraseArray(_this.resultsScrollCmp.content.children);
        _this.search_comp.selectChild("clear_btn").animate("default");
        _this.search_comp.selectChild("clear_btn").visible = false;
        _this.tabs.visible = false;
        _this.nothingFound.visible = false;
        return _this.tabs.stateSwitch("default");
      };
    })(this));
    this.closeBtn.onTap((function(_this) {
      return function() {
        _this.resultsScrollCmp.visible = false;
        eraseArray(_this.resultsScrollCmp.content.children);
        inputFrame.blur();
        setDefaultState();
        return _this.nothingFound.visible = false;
      };
    })(this));
    ref = this.tabs.newItemsArr;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.onTap((function(_this) {
        return function() {
          return findInGender(_this, _this.tabs.currentItem, inputFrame.value);
        };
      })(this));
    }
  }

  blockParentScroll = function(unit, toggle) {
    if (unit.parent && unit.parent.name === "content") {
      if (unit.parent.parent.constructor.name === "ScrollComponent") {
        if (toggle) {
          unit.parent.parent.scrollVertical = false;
          return unit.parent.y = 0;
        } else {
          return unit.parent.parent.scrollVertical = true;
        }
      }
    }
  };

  eraseArray = function(array) {
    var child, i, len, results;
    results = [];
    for (i = 0, len = array.length; i < len; i++) {
      child = array[i];
      results.push(child.destroy());
    }
    return results;
  };

  createLayers = function(parent, name, type, id) {
    var matchedIttem;
    matchedIttem = search_frame.selectChild("search_list_item").copy();
    matchedIttem.selectChild("name_label").props = {
      autoHeight: true,
      textOverflow: "elepsis",
      whiteSpace: "nowrap",
      overflow: "hidden"
    };
    matchedIttem.visible = true;
    matchedIttem.selectChild("name_label").template = {
      name: name,
      type: type
    };
    matchedIttem.props = {
      parent: parent.resultsScrollCmp.content,
      x: 0,
      y: 0
    };
    return matchedIttem.onTap(function() {
      if (typeof parent.opt.actions["" + id] === "function") {
        return parent.opt.actions["" + id]();
      }
    });
  };

  findVal = function(parent, designersArray, categoriesArray, val) {
    var child, i, j, k, l, len, len1, len2, len3, nextPosY, ref, results, unionMatchedArray;
    eraseArray(parent.resultsScrollCmp.content.children);
    unionMatchedArray = [];
    for (i = 0, len = designersArray.length; i < len; i++) {
      child = designersArray[i];
      if (_.includes(child.name, val.toUpperCase()) || _.includes(child.name, val.toLowerCase()) || _.includes(child.name, val)) {
        unionMatchedArray.push({
          name: child.name,
          type: child.type,
          id: child.id
        });
      }
    }
    for (j = 0, len1 = categoriesArray.length; j < len1; j++) {
      child = categoriesArray[j];
      if (_.includes(child.name, val.toUpperCase()) || _.includes(child.name, val.toLowerCase()) || _.includes(child.name, val)) {
        unionMatchedArray.push({
          name: child.name,
          type: child.type,
          id: child.id
        });
      }
    }
    for (k = 0, len2 = unionMatchedArray.length; k < len2; k++) {
      child = unionMatchedArray[k];
      createLayers(parent, child.name, child.type, child.id);
      parent.tabs.visible = true;
      parent.tabs.animate("stateA");
    }
    ref = parent.resultsScrollCmp.content.children;
    results = [];
    for (l = 0, len3 = ref.length; l < len3; l++) {
      child = ref[l];
      child.y = nextPosY;
      results.push(nextPosY = child.maxY);
    }
    return results;
  };

  findInGender = function(parent, tabs, val) {
    var categoriesArray, designersArray;
    designersArray = JSON.parse(Utils.domLoadDataSync(parent.opt.designers));
    categoriesArray = JSON.parse(Utils.domLoadDataSync(parent.opt.categories));
    switch (tabs) {
      case "women":
        return findVal(parent, designersArray.women, categoriesArray.women, val);
      case "men":
        return findVal(parent, designersArray.men, categoriesArray.men, val);
      case "kids":
        return findVal(parent, designersArray.kids, categoriesArray.kids, val);
    }
  };

  return SearchUnit;

})(Layer);


},{}],"FFKit/units/WishlistUnit/WishlistUnit":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.WishlistUnit = (function(superClass) {
  extend(WishlistUnit, superClass);

  function WishlistUnit(opt) {
    var columnCount, columnIndex, combinedTileWidth, i, j, ref, rowIndex, tileCount, tileWidth;
    this.opt = opt != null ? opt : {};
    WishlistUnit.__super__.constructor.call(this, _.defaults(this.opt, {
      width: Screen.width,
      height: Screen.height,
      scrollHorizontal: false,
      array: JSON.parse(Utils.domLoadDataSync("modules/FFKit/units/ProductListingUnit/data/products.json")),
      icon: true,
      border: true,
      description: true
    }));
    if (this.opt.target !== void 0) {
      targetDesignMode(this.opt.target, this);
    }
    if (this.opt.after !== void 0) {
      positionAfter(this.opt.after, this);
    }
    columnCount = 2;
    tileCount = this.opt.array.length;
    combinedTileWidth = Screen.width;
    tileWidth = combinedTileWidth / columnCount;
    for (i = j = 0, ref = tileCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      columnIndex = i % columnCount;
      rowIndex = Math.floor(i / columnCount);
      this["listcard_" + (i + 1)] = new ListProductCard({
        name: "listcard_" + (i + 1),
        icon: "big-cross",
        parent: this.content,
        x: columnIndex * tileWidth,
        season: this.opt.array[i].season,
        cover: this.opt.array[i].image,
        brand: this.opt.array[i].brand,
        description: this.opt.description ? this.opt.array[i].shortDescription : false,
        borderWidth: this.opt.border ? 0.5 : void 0,
        borderColor: this.opt.border ? "rgba(0,0,0,0.1)" : void 0
      });
      this["listcard_" + (i + 1)].y = rowIndex * this["listcard_" + (i + 1)].maxY;
      this["listcard_" + (i + 1)].icon_frame.onTap(function() {
        var card, child, currentPos, k, len, nextItemsArray, prevItemsArray, results, scrollContent;
        card = this.parent;
        scrollContent = this.parent.parent.children;
        this.parent.animate({
          opacity: 0,
          options: {
            time: 0.2
          }
        });
        Utils.delay(0.2, (function(_this) {
          return function() {
            card.destroy();
            return Utils.delay(0.1, function() {
              return _this.parent.parent.parent.updateContent();
            });
          };
        })(this));
        currentPos = {
          x: card.x,
          y: card.y
        };
        if (this.parent.id !== scrollContent[scrollContent.length - 1].id) {
          scrollContent[scrollContent.indexOf(this.parent) + 1].animate({
            x: currentPos.x,
            y: currentPos.y,
            options: {
              curve: Spring({
                damping: 0.9
              }),
              time: 0.4
            }
          });
          prevItemsArray = scrollContent.slice(scrollContent.indexOf(this.parent) + 1);
          nextItemsArray = prevItemsArray.slice(1);
          results = [];
          for (i = k = 0, len = nextItemsArray.length; k < len; i = ++k) {
            child = nextItemsArray[i];
            results.push(child.animate({
              x: prevItemsArray[i].x,
              y: prevItemsArray[i].y,
              options: {
                curve: Spring({
                  damping: 0.9
                }),
                time: 0.5
              }
            }));
          }
          return results;
        }
      });
      if (this.opt.icon === false) {
        listCard.card_frame.destroy();
      }
    }
    this.updateContent();
  }

  return WishlistUnit;

})(ScrollComponent);


},{}],"FFKit":[function(require,module,exports){
(function (global){
var setup;

global.require_setup = function(name) {
  return require("FFKit/setup/" + name + "/" + name);
};

global.require_component = function(name) {
  return require("FFKit/components/" + name + "/" + name);
};

global.require_unit = function(name) {
  return require("FFKit/units/" + name + "/" + name);
};

global.require_page = function(name) {
  return require("FFKit/pages/" + name + "/" + name);
};

setup = require("FFKit/setup/setup").setup;

exports.setup = setup;

require_setup("sizes");

require_setup("FFTextLayer");

require_component("StatusBar");

require_component("Button");

require_component("Header");

require_component("Keyline");

require_component("Tabbar");

require_component("RefineFilter");

require_component("ProductCard");

require_component("ListProductCard");

require_component("ProductSlider");

require_component("PosBanner");

require_component("ListTitle");

require_component("ListItem");

require_component("Selector");

require_component("iOSSwitch");

require_component("ListRadioSelect");

require_component("Accordion");

require_component("AccordionGroup");

require_component("ActionSheet");

require_component("ButtonFixed");

require_component("MeSignIn");

require_component("HomeSearch");

require_component("SearchInput");

require_component("MeContactUs");

require_component("Input");

require_component("FFInput");

require_component("FFScrollComponent");

require_component("Tabs");

require_unit("HeroUnit");

require_unit("ProductUnit");

require_unit("FeatureUnit");

require_unit("ProductSet");

require_unit("ProductHero");

require_unit("ProductListingUnit");

require_unit("PDPHeroUnit");

require_unit("RecommendedListUnit");

require_unit("OrderTraker");

require_unit("SearchUnit");

require_unit("WishlistUnit");

require_unit("GenderSwitch");

require_page("CategoriesPage");

require_page("DesignersPage");


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"FFKit/setup/setup":"FFKit/setup/setup"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvdW5pdHMvV2lzaGxpc3RVbml0L1dpc2hsaXN0VW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvdW5pdHMvU2VhcmNoVW5pdC9TZWFyY2hVbml0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC91bml0cy9SZWNvbW1lbmRlZExpc3RVbml0L1JlY29tbWVuZGVkTGlzdFVuaXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3VuaXRzL1Byb2R1Y3RVbml0L1Byb2R1Y3RVbml0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC91bml0cy9Qcm9kdWN0U2V0L1Byb2R1Y3RTZXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3VuaXRzL1Byb2R1Y3RMaXN0aW5nVW5pdC9Qcm9kdWN0TGlzdGluZ1VuaXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3VuaXRzL1Byb2R1Y3RIZXJvL1Byb2R1Y3RIZXJvLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC91bml0cy9QRFBIZXJvVW5pdC9QRFBIZXJvVW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvdW5pdHMvT3JkZXJUcmFrZXIvT3JkZXJUcmFrZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3VuaXRzL0hlcm9Vbml0L2RhdGEvZGF0YS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvdW5pdHMvSGVyb1VuaXQvSGVyb1VuaXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3VuaXRzL0dlbmRlclN3aXRjaC9HZW5kZXJTd2l0Y2guY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3VuaXRzL0ZlYXR1cmVVbml0L0ZlYXR1cmVVbml0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9XaXNobGlzdFVuaXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1VuaXRzL1JlY29tbWVuZGVkTGlzdFVuaXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1VuaXRzL1Byb2R1Y3RVbml0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9Qcm9kdWN0VW5pdCAoRXh0ZXJuYWwgSlNPTikuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1VuaXRzL1Byb2R1Y3RVbml0IChBcnJheSkuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1VuaXRzL1Byb2R1Y3RTZXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1VuaXRzL1Byb2R1Y3RMaXN0aW5nVW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvVW5pdHMvUHJvZHVjdEhlcm8uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1VuaXRzL1BEUEhlcm9Vbml0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9PcmRlclRyYWtlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvVW5pdHMvT3JkZXJUcmFrZXIgKFNsaWRlcikuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1VuaXRzL0hlcm9Vbml0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9IZXJvVW5pdCAoU2xpZGVyKS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvVW5pdHMvR2VuZGVyU3dpdGNoLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9GZWF0dXJlVW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvVW5pdHMvRmVhdHVyZVVuaXQgKFByb2R1Y3QpLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9UZXh0TGF5ZXJzLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9TY3JvbGwvU2Nyb2xsIOKAlCBFbXB0eS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvU2Nyb2xsL1Njcm9sbCDigJQgQWxsIEhvbWUgVW5pdHMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1BhZ2VzL1dpc2hsaXN0IHBhZ2UuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1BhZ2VzL1NlYXJjaCBQYWdlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9QYWdlcy9SZWZpbmUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1BhZ2VzL1BMUC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvUGFnZXMvUERQLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9QYWdlcy9NZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvUGFnZXMvSG9tZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvUGFnZXMvRGVzaWduZXJzUGFnZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvUGFnZXMvQ2F0ZWdvcmllc1BhZ2UuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL0Zsb3dzL1N0YXR1c2JhciBhbmQgVGFiYmFyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9GbG93cy9Ib21lID4gUExQLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL2lPU1N3aXRjaC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9XaXNobGlzdFVuaXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL0NvbXBvbmVudHMvVGFicy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9UYWJiYXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL0NvbXBvbmVudHMvU3RhdHVzQmFyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL1NlbGVjdG9yLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL1NlYXJjaElucHV0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL1JlZmluZUZpbHRlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9Qcm9kdWN0U2xpZGVyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL1Byb2R1Y3RDYXJkLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL1Bvc0Jhbm5lci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9QRFBIZXJvVW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9MaXN0VGl0bGUsIExpc3RJdGVtcy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9MaXN0UmFkaW9TZWxlY3QuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL0NvbXBvbmVudHMvTGlzdFByb2R1Y3RDYXJkLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL0xpc3RJdGVtIChhbGwgYXRyaWJ1dGVzKS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9LZXlsaW5lLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL0hvbWVTZWFyY2guY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL0NvbXBvbmVudHMvSGVhZGVycy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9IZWFkZXIgKGFsbCBhdHJpYnV0ZXMpLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL0ZGSW5wdXRzLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL0J1dHRvbnMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL0NvbXBvbmVudHMvQnV0dG9uIEZpeGVkLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL0FjdGlvblNoZWV0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL0FjY29yZGlvbi5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc2V0dXAvc2l6ZXMvc2l6ZXMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NldHVwL3NldHVwLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zZXR1cC9GRlRleHRMYXllci9GRlRleHRMYXllci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvcGFnZXMvRGVzaWduZXJzUGFnZS9EZXNpZ25lcnNQYWdlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9wYWdlcy9DYXRlZ29yaWVzUGFnZS9DYXRlZ29yaWVzUGFnZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvaGVscGVyLWZ1bmN0aW9ucy90YXJnZXREZXNpZ25Nb2RlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9oZWxwZXItZnVuY3Rpb25zL3ByaXZhdGUvc2VsZWN0SW1hZ2UuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2hlbHBlci1mdW5jdGlvbnMvcHJpdmF0ZS9wYXJhbGF4T25TY3JvbGwuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2hlbHBlci1mdW5jdGlvbnMvcHJpdmF0ZS9nZW5lcmF0ZURvdHMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2hlbHBlci1mdW5jdGlvbnMvcG9zaXRpb25BZnRlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvaGVscGVyLWZ1bmN0aW9ucy9hZGRDaGlsZHJlbi5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9pT1NTd2l0Y2gvaU9TU3dpdGNoLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL1RhYnMvVGFicy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9UYWJiYXIvVGFiYmFyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL1N0YXR1c0Jhci9TdGF0dXNCYXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvU2VsZWN0b3IvU2VsZWN0b3IuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvU2VhcmNoSW5wdXQvU2VhcmNoSW5wdXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvUmVmaW5lRmlsdGVyL1JlZmluZUZpbHRlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9Qcm9kdWN0U2xpZGVyL1Byb2R1Y3RTbGlkZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvUHJvZHVjdENhcmQvUHJvZHVjdENhcmQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvUG9zQmFubmVyL1Bvc0Jhbm5lci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9NZVNpZ25Jbi9NZVNpZ25Jbi5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9NZUNvbnRhY3RVcy9NZUNvbnRhY3RVcy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9MaXN0VGl0bGUvTGlzdFRpdGxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL0xpc3RSYWRpb1NlbGVjdC9MaXN0UmFkaW9TZWxlY3QuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvTGlzdFByb2R1Y3RDYXJkL0xpc3RQcm9kdWN0Q2FyZC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9MaXN0SXRlbS9MaXN0SXRlbS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9hbGV4YW5kZXIuYXJ0c3Z1bmkvX2Rldi9hcnRzdnVuaS5naWh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9LZXlsaW5lL0tleWxpbmUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvSW5wdXQvSW5wdXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvSG9tZVNlYXJjaC9Ib21lU2VhcmNoLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL0hlYWRlci9IZWFkZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvRkZTY3JvbGxDb21wb25lbnQvRkZTY3JvbGxDb21wb25lbnQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvRkZJbnB1dC9GRklucHV0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL0J1dHRvbkZpeGVkL0J1dHRvbkZpeGVkLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2FsZXhhbmRlci5hcnRzdnVuaS9fZGV2L2FydHN2dW5pLmdpaHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL0J1dHRvbi9CdXR0b24uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvQWN0aW9uU2hlZXQvQWN0aW9uU2hlZXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvQWNjb3JkaW9uR3JvdXAvQWNjb3JkaW9uR3JvdXAuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvYWxleGFuZGVyLmFydHN2dW5pL19kZXYvYXJ0c3Z1bmkuZ2lodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvQWNjb3JkaW9uL0FjY29yZGlvbi5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgRnJhbWVyIOKAlCBGYXJmZXRjaCBNb2JpbGUgS2l0XG4jIEJ5IEZhcmZldGNoXG4jIENvbnRlbnRzOiBQYXJzZSBKU09OIGNvbmZpZ3VyYXRpb24sIHdoaXRjaCBtb2R1bGVzIHNob3VsZCBiZSBpbmNsdWRlcyBpbiB0aGUgS2l0XG4jIEF1dG9yczogQWxleGFuZGVyIEFydHN2dW5pLCBTb3BoaWUgUmFoaWVycywgUGF2ZWwgTGFwdGV2XG4jIFdlYnNpdGU6IGh0dHBzOi8vd3d3LmZhcmZldGNoLmNvbVxuIyBLaXQgdmVyc2lvbjogMS4wLjJcblxuIyBGdW5jdGlvbnMgbWFrZXMgcGF0aCBzaG9ydGVyXG5nbG9iYWwucmVxdWlyZV9zZXR1cCA9IChuYW1lKSAtPlxuXHRyZXR1cm4gcmVxdWlyZShcIkZGS2l0L3NldHVwLyN7bmFtZX0vI3tuYW1lfVwiKVxuXG4jIEZ1bmN0aW9uIG1ha2VzIHBhdGggdG8gYSBjb21wb25lbnQgc2hvcnRlclxuZ2xvYmFsLnJlcXVpcmVfY29tcG9uZW50ID0gKG5hbWUpIC0+XG5cdHJldHVybiByZXF1aXJlKFwiRkZLaXQvY29tcG9uZW50cy8je25hbWV9LyN7bmFtZX1cIilcblxuIyBGdW5jdGlvbiBtYWtlcyBwYXRoIHRvIGEgdW5pdCBzaG9ydGVyXG5nbG9iYWwucmVxdWlyZV91bml0ID0gKG5hbWUpIC0+XG5cdHJldHVybiByZXF1aXJlKFwiRkZLaXQvdW5pdHMvI3tuYW1lfS8je25hbWV9XCIpXG5cbiMgRnVuY3Rpb24gbWFrZXMgcGF0aCB0byBhIHBhZ2VzIHNob3J0ZXJcbmdsb2JhbC5yZXF1aXJlX3BhZ2UgPSAobmFtZSkgLT5cblx0cmV0dXJuIHJlcXVpcmUoXCJGRktpdC9wYWdlcy8je25hbWV9LyN7bmFtZX1cIilcblxuXG4jIENPTkZJR1VSQVRJT05cbiMgSW5pdGlhbCBzZXR1cFxue3NldHVwfSA9IHJlcXVpcmUgXCJGRktpdC9zZXR1cC9zZXR1cFwiXG5leHBvcnRzLnNldHVwID0gc2V0dXBcbiNcbnJlcXVpcmVfc2V0dXAgXCJzaXplc1wiXG5yZXF1aXJlX3NldHVwIFwiRkZUZXh0TGF5ZXJcIlxuXG4jIENvbXBvbmVudHNcbiMgQmFzaWNcbnJlcXVpcmVfY29tcG9uZW50IFwiU3RhdHVzQmFyXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiQnV0dG9uXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiSGVhZGVyXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiS2V5bGluZVwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIlRhYmJhclwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIlJlZmluZUZpbHRlclwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIlByb2R1Y3RDYXJkXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiTGlzdFByb2R1Y3RDYXJkXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiUHJvZHVjdFNsaWRlclwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIlBvc0Jhbm5lclwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIkxpc3RUaXRsZVwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIkxpc3RJdGVtXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiU2VsZWN0b3JcIlxucmVxdWlyZV9jb21wb25lbnQgXCJpT1NTd2l0Y2hcIlxucmVxdWlyZV9jb21wb25lbnQgXCJMaXN0UmFkaW9TZWxlY3RcIlxucmVxdWlyZV9jb21wb25lbnQgXCJBY2NvcmRpb25cIlxucmVxdWlyZV9jb21wb25lbnQgXCJBY2NvcmRpb25Hcm91cFwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIkFjdGlvblNoZWV0XCJcbnJlcXVpcmVfY29tcG9uZW50IFwiQnV0dG9uRml4ZWRcIlxucmVxdWlyZV9jb21wb25lbnQgXCJNZVNpZ25JblwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIkhvbWVTZWFyY2hcIlxucmVxdWlyZV9jb21wb25lbnQgXCJTZWFyY2hJbnB1dFwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIk1lQ29udGFjdFVzXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiSW5wdXRcIlxucmVxdWlyZV9jb21wb25lbnQgXCJGRklucHV0XCJcbnJlcXVpcmVfY29tcG9uZW50IFwiRkZTY3JvbGxDb21wb25lbnRcIlxucmVxdWlyZV9jb21wb25lbnQgXCJUYWJzXCJcblxuIyBVbml0c1xucmVxdWlyZV91bml0IFwiSGVyb1VuaXRcIlxucmVxdWlyZV91bml0IFwiUHJvZHVjdFVuaXRcIlxucmVxdWlyZV91bml0IFwiRmVhdHVyZVVuaXRcIlxucmVxdWlyZV91bml0IFwiUHJvZHVjdFNldFwiXG5yZXF1aXJlX3VuaXQgXCJQcm9kdWN0SGVyb1wiXG5yZXF1aXJlX3VuaXQgXCJQcm9kdWN0TGlzdGluZ1VuaXRcIlxucmVxdWlyZV91bml0IFwiUERQSGVyb1VuaXRcIlxucmVxdWlyZV91bml0IFwiUmVjb21tZW5kZWRMaXN0VW5pdFwiXG5yZXF1aXJlX3VuaXQgXCJPcmRlclRyYWtlclwiXG5yZXF1aXJlX3VuaXQgXCJTZWFyY2hVbml0XCJcbnJlcXVpcmVfdW5pdCBcIldpc2hsaXN0VW5pdFwiXG5yZXF1aXJlX3VuaXQgXCJHZW5kZXJTd2l0Y2hcIlxuXG4jIFBhZ2VzXG5yZXF1aXJlX3BhZ2UgXCJDYXRlZ29yaWVzUGFnZVwiXG5yZXF1aXJlX3BhZ2UgXCJEZXNpZ25lcnNQYWdlXCIiLCIjIyMjIyMjIyMjIyBMaXN0IFRpdGxlICMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93Lldpc2hsaXN0VW5pdCBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHRcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRhcnJheTogSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgXCJtb2R1bGVzL0ZGS2l0L3VuaXRzL1Byb2R1Y3RMaXN0aW5nVW5pdC9kYXRhL3Byb2R1Y3RzLmpzb25cIlxuXHRcdFx0aWNvbjogdHJ1ZVxuXHRcdFx0Ym9yZGVyOiB0cnVlXG5cdFx0XHRkZXNjcmlwdGlvbjogdHJ1ZVxuXHRcdFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0XHRcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBAKVxuXHRcdFx0XG5cdFx0IyBJbml0aWFsIHZhcmlhYmxlc1xuXHRcdGNvbHVtbkNvdW50ID0gMlxuXHRcdHRpbGVDb3VudCA9IEBvcHQuYXJyYXkubGVuZ3RoXG5cdFx0Y29tYmluZWRUaWxlV2lkdGggPSBTY3JlZW4ud2lkdGhcblx0XHR0aWxlV2lkdGggPSBjb21iaW5lZFRpbGVXaWR0aCAvIGNvbHVtbkNvdW50XG5cdFx0XG5cdFx0IyBDcmVhdGUgZ3JpZFxuXHRcdGZvciBpIGluIFswLi4udGlsZUNvdW50XVxuXHRcdFx0IyBSYXRpb24gdmFyaWJsZXMgdG8gbWFrZSBhIGdyaWRcblx0XHRcdGNvbHVtbkluZGV4ID0gaSAlIGNvbHVtbkNvdW50XG5cdFx0XHRyb3dJbmRleCA9IE1hdGguZmxvb3IoaSAvIGNvbHVtbkNvdW50KVxuXHRcdFx0XG5cdFx0XHQjIENyZWF0ZSBjYXJkc1xuXHRcdFx0QFtcImxpc3RjYXJkXyN7aSsxfVwiXSA9IG5ldyBMaXN0UHJvZHVjdENhcmRcblx0XHRcdFx0bmFtZTogXCJsaXN0Y2FyZF8je2krMX1cIlxuXHRcdFx0XHRpY29uOiBcImJpZy1jcm9zc1wiXG5cdFx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcdFx0eDogY29sdW1uSW5kZXggKiB0aWxlV2lkdGhcblx0XHRcdFx0c2Vhc29uOiBAb3B0LmFycmF5W2ldLnNlYXNvblxuXHRcdFx0XHRjb3ZlcjogQG9wdC5hcnJheVtpXS5pbWFnZVxuXHRcdFx0XHRicmFuZDogQG9wdC5hcnJheVtpXS5icmFuZFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogaWYgQG9wdC5kZXNjcmlwdGlvbiB0aGVuIEBvcHQuYXJyYXlbaV0uc2hvcnREZXNjcmlwdGlvbiBlbHNlIGZhbHNlXG5cdFx0XHRcdGJvcmRlcldpZHRoOiBpZiBAb3B0LmJvcmRlciB0aGVuIDAuNVxuXHRcdFx0XHRib3JkZXJDb2xvcjogaWYgQG9wdC5ib3JkZXIgdGhlbiBcInJnYmEoMCwwLDAsMC4xKVwiXG5cdFx0XHRcblx0XHRcdEBbXCJsaXN0Y2FyZF8je2krMX1cIl0ueSA9IHJvd0luZGV4ICogQFtcImxpc3RjYXJkXyN7aSsxfVwiXS5tYXhZXG5cdFx0XHRcblx0XHRcdCMgT24gVGFwXG5cdFx0XHRAW1wibGlzdGNhcmRfI3tpKzF9XCJdLmljb25fZnJhbWUub25UYXAgLT5cblx0XHRcdFx0Y2FyZCA9IEBwYXJlbnRcblx0XHRcdFx0c2Nyb2xsQ29udGVudCA9IEBwYXJlbnQucGFyZW50LmNoaWxkcmVuXG5cdFx0XHRcdFxuXHRcdFx0XHRAcGFyZW50LmFuaW1hdGVcblx0XHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFV0aWxzLmRlbGF5IDAuMiwgPT5cblx0XHRcdFx0XHRjYXJkLmRlc3Ryb3koKVxuXHRcdFx0XHRcdFV0aWxzLmRlbGF5IDAuMSwgPT5cblx0XHRcdFx0XHRcdEBwYXJlbnQucGFyZW50LnBhcmVudC51cGRhdGVDb250ZW50KClcblx0XHRcdFx0XHRcblx0XHRcdFx0Y3VycmVudFBvcyA9IHtcblx0XHRcdFx0XHR4OiBjYXJkLnhcblx0XHRcdFx0XHR5OiBjYXJkLnlcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0IyBJZiB0aGlzIGlzIG5vdCBhIGxhc3QgY2FyZFxuXHRcdFx0XHRpZiBAcGFyZW50LmlkIGlzbnQgc2Nyb2xsQ29udGVudFtzY3JvbGxDb250ZW50Lmxlbmd0aC0xXS5pZFxuXHRcdFx0XHRcdHNjcm9sbENvbnRlbnRbc2Nyb2xsQ29udGVudC5pbmRleE9mKEBwYXJlbnQpKzFdLmFuaW1hdGVcblx0XHRcdFx0XHRcdHg6IGN1cnJlbnRQb3MueFxuXHRcdFx0XHRcdFx0eTogY3VycmVudFBvcy55XG5cdFx0XHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDAuOSlcblx0XHRcdFx0XHRcdFx0dGltZTogMC40XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0IyBHZXQgYWxsIGVsZW1lbnRzIGFmdGVyIGN1cnJlbnQgaXRlbVxuXHRcdFx0XHRcdHByZXZJdGVtc0FycmF5ID0gc2Nyb2xsQ29udGVudC5zbGljZShzY3JvbGxDb250ZW50LmluZGV4T2YoQHBhcmVudCkrMSlcblx0XHRcdFx0XHQjIEdldCBhbGwgZWxlbWVudHMgYWZ0ZXIgZmlyc3QgaXRlbSBpbiBwcmV2SXRlbXNBcnJheVxuXHRcdFx0XHRcdG5leHRJdGVtc0FycmF5ID0gcHJldkl0ZW1zQXJyYXkuc2xpY2UoMSlcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmb3IgY2hpbGQsIGkgaW4gbmV4dEl0ZW1zQXJyYXlcblx0XHRcdFx0XHRcdGNoaWxkLmFuaW1hdGVcblx0XHRcdFx0XHRcdFx0eDogcHJldkl0ZW1zQXJyYXlbaV0ueFxuXHRcdFx0XHRcdFx0XHR5OiBwcmV2SXRlbXNBcnJheVtpXS55XG5cdFx0XHRcdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0XHRcdFx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAwLjkpXG5cdFx0XHRcdFx0XHRcdFx0dGltZTogMC41XG5cdFx0XHRcblx0XHRcdGlmIEBvcHQuaWNvbiBpcyBmYWxzZVxuXHRcdFx0XHRsaXN0Q2FyZC5jYXJkX2ZyYW1lLmRlc3Ryb3koKVxuXHRcdFxuXHRcdEB1cGRhdGVDb250ZW50KCkiLCIjIyMjIyMjIyMjIyMjIyBTRUFSQ0ggVU5JVCAjIyMjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5TZWFyY2hVbml0IGV4dGVuZHMgTGF5ZXJcblx0IyBJbml0aWFsIGZyYW1lIGNvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjRjVGNUY1XCJcblx0XHRcdGhlaWdodDogc3dpdGNoIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZVxuXHRcdFx0XHR3aGVuIFwiYXBwbGUtaXBob25lLXgtc2lsdmVyXCIsIFwiYXBwbGUtaXBob25lLXgtc3BhY2UtZ3JheVwiXG5cdFx0XHRcdFx0c2VhcmNoX2ZyYW1lLmhlaWdodCArIDQ0XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRzZWFyY2hfZnJhbWUuaGVpZ2h0ICsgMjBcblx0XHRcdHRpdGxlOiBzZWFyY2hfZnJhbWUuc2VsZWN0Q2hpbGQoXCJzZWFyY2hfdGl0bGVcIikudGV4dFxuXHRcdFx0ZGVzaWduZXJzOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L2Rlc2lnbmVycy5qc29uXCJcblx0XHRcdGNhdGVnb3JpZXM6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvY2F0ZWdvcmllcy5qc29uXCJcblx0XHRcdGFjdGlvbnM6IHtcblx0XHRcdFx0XCIyNjgyMDgyXCI6IC0+IHByaW50IFwiVGFwIVwiXG5cdFx0XHR9XG5cdFx0XHRcblx0XHQjIyMjIE1BSU4gVkFSUyAjIyMjXG5cdFx0QHNlYXJjaF9jb21wID0gc2VhcmNoX2ZyYW1lXG5cdFx0QGhlYWRlciA9IEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcInNlYXJjaF9oZWFkZXJcIilcblx0XHRAbm90aGluZ0ZvdW5kID0gQHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwibm90aGluZ19mb3VuZFwiKVxuXHRcdEBpbnB1dCA9IEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcInNlYXJjaF9pbnB1dFwiKVxuXHRcdEBsZWZ0SWNvbiA9IEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcInNlYXJjaF9pbnB1dF9sLWljb25cIilcblx0XHRAcmlnaHRJY29uID0gQHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoX2lucHV0X3ItaWNvblwiKVxuXHRcdEBjbGVhckJ0biA9IEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcImNsZWFyX2J0blwiKVxuXHRcdEBjbG9zZUJ0biA9IEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcImNyb3NzLWljb1wiKVxuXHRcdHBhcmVudCA9IEBcblx0XHRcblx0XHQjIyMjIENSRUFURSBTVUIgRUxFTUVOVFMgIyMjI1xuXHRcdEBiY2tMYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJiYWNrIGxheWVyXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcblx0XHRAc2VhcmNoX2NvbXAucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiAwLCB5OiBBbGlnbi5ib3R0b20oKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0IyBDcmVhdGUgSFRNTCBpbnB1dFxuXHRcdEBpbnB1dFdyYXAgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiaW5wdXQgd3JhcFwiXG5cdFx0XHRwYXJlbnQ6IEBpbnB1dFxuXHRcdFx0eTogQHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLnlcblx0XHRcdHg6IEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcInNlYXJjaF9wbGFjZWhvbGRlclwiKS54XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiBAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJzZWFyY2hfcGxhY2Vob2xkZXJcIikud2lkdGhcblx0XHRcdGhlaWdodDogQHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLmhlaWdodFxuXHRcdFx0aHRtbDogXCJcIlwiPGlucHV0XG5cdFx0XHRcdGNsYXNzID0gJ3NlYXJjaC1pbnB1dCdcblx0XHRcdFx0cGxhY2Vob2xkZXIgPSAnI3tAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJzZWFyY2hfcGxhY2Vob2xkZXJcIikudGV4dH0nPlxuXHRcdFx0PC9pbnB1dD5cIlwiXCJcblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRcInBvc2l0aW9uXCI6IFwicmVsYXRpdmVcIlxuXHRcdFxuXHRcdEBpbnB1dFdyYXAucGxhY2VCZWhpbmQoQGxlZnRJY29uKVxuXHRcdFxuXHRcdGNzcyA9IFwiXCJcIlxuXHRcdC5zZWFyY2gtaW5wdXQge1xuXHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdFx0dG9wOiAxcHg7XG5cdFx0XHR3aWR0aDogI3tAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJzZWFyY2hfcGxhY2Vob2xkZXJcIikud2lkdGh9cHg7XG5cdFx0XHRoZWlnaHQ6ICN7QHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLmhlaWdodH1weDtcblx0XHRcdGZvbnQtc2l6ZTogMTVweDtcblx0XHRcdGxpbmUtaGVpZ2h0OiAxLjU7XG5cdFx0XHRmb250LWZhbWlseTogXCJQb2xhcmlzLUJvb2tcIiwgXCJQb2xhcmlzXCIsIHNhbnMtc2VyaWYnO1xuXHRcdFx0dGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcblx0XHRcdC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuXHRcdH1cblx0XHQuc2VhcmNoLWlucHV0Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcblx0XHRcdGNvbG9yOiAje0BzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcInNlYXJjaF9wbGFjZWhvbGRlclwiKS5jb2xvcn07XG5cdFx0fVxuXHRcdDpmb2N1cyB7XG5cdFx0ICBvdXRsaW5lOiBub25lO1xuXHRcdH1cblx0XHRcIlwiXCJcblx0XHRVdGlscy5pbnNlcnRDU1MoY3NzKVxuXHRcdFxuXHRcdCMgRGVzdHJveSBjb3B5IGRvbm9yXG5cdFx0QHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLmRlc3Ryb3koKVxuXHRcdFxuXHRcdGlucHV0RnJhbWUgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtaW5wdXQnKVxuXHRcdFxuXHRcdEB0YWJzID0gbmV3IFRhYnNcblx0XHRcdG5hbWU6IFwidGFic1wiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHZpc2libGU6IGZhbHNlXG5cdFx0XHR5OiBBbGlnbi50b3AoQGlucHV0LmhlaWdodCs1MClcblx0XHRcblx0XHRAbm90aGluZ0ZvdW5kLnByb3BzID0gXG5cdFx0XHRwYXJlbnQ6IEBiY2tMYXllclxuXHRcdFx0eTogQHRhYnMubWF4WSs3MFxuXHRcdFxuXHRcdEByZXN1bHRzU2Nyb2xsQ21wID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRuYW1lOiBcInNjcm9sbFwiXG5cdFx0XHR5OiBAdGFicy5tYXhZXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgLSBAdGFicy5tYXhZXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcdGNvbnRlbnRJbnNldDpcblx0XHRcdFx0dG9wOiAxMFxuXG5cdFx0QHJlc3VsdHNTY3JvbGxDbXAuY29udGVudC5iYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cdFx0XG5cdFx0IyMjIyBTVEFURVMgIyMjI1xuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0c3RhdGVBOlxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4yXG5cdFx0XG5cdFx0QGhlYWRlci5zdGF0ZXMgPVxuXHRcdFx0c3RhdGVBOlxuXHRcdFx0XHR5OiBBbGlnbi50b3AoLUBoZWFkZXIuaGVpZ2h0LTQwKVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4zXG5cdFx0XG5cdFx0QGlucHV0LnN0YXRlcyA9XG5cdFx0XHRzdGF0ZUE6XG5cdFx0XHRcdHk6IEFsaWduLnRvcCgxNilcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDBcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFx0XHRcblx0XHRAYmNrTGF5ZXIuc3RhdGVzID1cblx0XHRcdHN0YXRlQTpcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4yXG5cdFx0XG5cdFx0QHRhYnMuc3RhdGVzID1cblx0XHRcdHN0YXRlQTpcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4yXG5cdFx0XG5cdFx0QHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwiY2xlYXJfYnRuXCIpLnN0YXRlcyA9XG5cdFx0XHRzdGF0ZUE6XG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFxuXHRcdEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcInNlYXJjaF9pbnB1dF9sLWljb25cIikuc3RhdGVzID1cblx0XHRcdHN0YXRlQTpcblx0XHRcdFx0eDogLTZcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFxuXHRcdEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcInNlYXJjaF9pbnB1dF9yLWljb25cIikuc3RhdGVzID1cblx0XHRcdHN0YXRlQTpcblx0XHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4yXG5cdFx0XG5cdFx0IyBTQ1JJUFRTXG5cdFx0c2V0U2Vjb25kU3RhdGUgPSA9PlxuXHRcdFx0QGJyaW5nVG9Gcm9udCgpXG5cdFx0XHRibG9ja1BhcmVudFNjcm9sbChALCB0cnVlKVxuXHRcdFx0IyBBbmltYXRlIHN0YXRlc1xuXHRcdFx0QGFuaW1hdGUoXCJzdGF0ZUFcIilcblx0XHRcdEBoZWFkZXIuYW5pbWF0ZShcInN0YXRlQVwiKVxuXHRcdFx0QGlucHV0LmFuaW1hdGUoXCJzdGF0ZUFcIilcblx0XHRcdEBsZWZ0SWNvbi5hbmltYXRlKFwic3RhdGVBXCIpXG5cdFx0XHRAcmlnaHRJY29uLmFuaW1hdGUoXCJzdGF0ZUFcIilcblx0XHRcdEBiY2tMYXllci5hbmltYXRlKFwic3RhdGVBXCIpXG5cdFx0XHQjIFZpc2FiaWxpdHlcblx0XHRcdEBiY2tMYXllci52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0QHRhYnMudmlzaWJsZSA9IHRydWVcblx0XHRcdEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcInNlYXJjaC1pY29cIikudmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJjcm9zcy1pY29cIikudmlzaWJsZSA9IHRydWVcblx0XHRcblx0XHRzZXREZWZhdWx0U3RhdGUgPSA9PlxuXHRcdFx0YmxvY2tQYXJlbnRTY3JvbGwoQCwgZmFsc2UpXG5cdFx0XHQjIEFuaW1hdGUgc3RhdGVzXG5cdFx0XHRAYW5pbWF0ZShcImRlZmF1bHRcIilcblx0XHRcdEBoZWFkZXIuYW5pbWF0ZShcImRlZmF1bHRcIilcblx0XHRcdEBpbnB1dC5hbmltYXRlKFwiZGVmYXVsdFwiKVxuXHRcdFx0QGxlZnRJY29uLmFuaW1hdGUoXCJkZWZhdWx0XCIpXG5cdFx0XHRAcmlnaHRJY29uLmFuaW1hdGUoXCJkZWZhdWx0XCIpXG5cdFx0XHRAYmNrTGF5ZXIuYW5pbWF0ZShcImRlZmF1bHRcIilcblx0XHRcdCMgVmlzYWJpbGl0eVxuXHRcdFx0QGJja0xheWVyLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0QHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoLWljb1wiKS52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0QHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwiY3Jvc3MtaWNvXCIpLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0QGNsZWFyQnRuLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0IyBUYWJzXG5cdFx0XHRAdGFicy52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEB0YWJzLnN0YXRlU3dpdGNoKFwiZGVmYXVsdFwiKVxuXHRcdFx0IyBDbGVhciBpbnB1dFxuXHRcdFx0aW5wdXRGcmFtZS52YWx1ZSA9IFwiXCJcblx0XHRcblx0XHQjIyMjIyMjIyBFVkVOVFMgIyMjIyMjIyNcblx0XHRpbnB1dEZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBzZXRTZWNvbmRTdGF0ZSlcblx0XHRpbnB1dEZyYW1lLm9uaW5wdXQgPSA9PlxuXHRcdFx0aWYgaW5wdXRGcmFtZS52YWx1ZS5sZW5ndGggPiAwXG5cdFx0XHRcdEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcImNsZWFyX2J0blwiKS52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0XHRAcmVzdWx0c1Njcm9sbENtcC52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0XHRAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJjbGVhcl9idG5cIikuYW5pbWF0ZShcInN0YXRlQVwiKVxuXHRcdFx0XG5cdFx0XHRcdGZpbmRJbkdlbmRlcihALCBAdGFicy5jdXJyZW50SXRlbSwgaW5wdXRGcmFtZS52YWx1ZSlcblx0XHRcdFx0QHJlc3VsdHNTY3JvbGxDbXAudXBkYXRlQ29udGVudCgpXG5cdFx0XHRlbHNlIGlmIGlucHV0RnJhbWUudmFsdWUubGVuZ3RoIGlzIDBcblx0XHRcdFx0ZXJhc2VBcnJheShwYXJlbnQucmVzdWx0c1Njcm9sbENtcC5jb250ZW50LmNoaWxkcmVuKVxuXHRcdFx0XHRAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJjbGVhcl9idG5cIikuYW5pbWF0ZShcImRlZmF1bHRcIilcblx0XHRcdFx0QHRhYnMudmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRcdEB0YWJzLmFuaW1hdGUoXCJkZWZhdWx0XCIpXG5cblx0XHRcdGlmIEByZXN1bHRzU2Nyb2xsQ21wLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoIGlzIDAgYW5kIGlucHV0RnJhbWUudmFsdWUubGVuZ3RoID4gMFxuXHRcdFx0XHRAcmVzdWx0c1Njcm9sbENtcC52aXNpYmxlID0gZmFsc2Vcblx0XHRcdFx0QG5vdGhpbmdGb3VuZC52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0XHRAbm90aGluZ0ZvdW5kLnRlbXBsYXRlID1cblx0XHRcdFx0XHRub3RoaW5nOiBpbnB1dEZyYW1lLnZhbHVlXG5cdFx0XHRlbHNlIGlmIEByZXN1bHRzU2Nyb2xsQ21wLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoID4gMFxuXHRcdFx0XHRAbm90aGluZ0ZvdW5kLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0XHRcblx0XHQjIyMjIyMjIyBBQ1RJT05TICMjIyMjIyMjXG5cdFx0IyMjIyBDbGVhciBidXR0b24gIyMjI1xuXHRcdEBjbGVhckJ0bi5vblRhcCA9PlxuXHRcdFx0aW5wdXRGcmFtZS52YWx1ZSA9IFwiXCJcblx0XHRcdGlucHV0RnJhbWUuZm9jdXMoKVxuXHRcdFx0ZXJhc2VBcnJheShAcmVzdWx0c1Njcm9sbENtcC5jb250ZW50LmNoaWxkcmVuKVxuXHRcdFx0QHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwiY2xlYXJfYnRuXCIpLmFuaW1hdGUoXCJkZWZhdWx0XCIpXG5cdFx0XHRAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJjbGVhcl9idG5cIikudmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAdGFicy52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBub3RoaW5nRm91bmQudmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAdGFicy5zdGF0ZVN3aXRjaChcImRlZmF1bHRcIilcblx0XHRcblx0XHQjIyMjIENsb3NlIGJ1dHRvbiAjIyMjXG5cdFx0QGNsb3NlQnRuLm9uVGFwID0+XG5cdFx0XHRAcmVzdWx0c1Njcm9sbENtcC52aXNpYmxlID0gZmFsc2Vcblx0XHRcdGVyYXNlQXJyYXkoQHJlc3VsdHNTY3JvbGxDbXAuY29udGVudC5jaGlsZHJlbilcblx0XHRcdGlucHV0RnJhbWUuYmx1cigpXG5cdFx0XHRzZXREZWZhdWx0U3RhdGUoKVxuXHRcdFx0QG5vdGhpbmdGb3VuZC52aXNpYmxlID0gZmFsc2Vcblx0XHRcblx0XHQjIyMjIFRhcCBvbiBHZW5kZXIgc2VsZWN0aW9uICMjIyNcblx0XHRmb3IgaXRlbSBpbiBAdGFicy5uZXdJdGVtc0FyclxuXHRcdFx0aXRlbS5vblRhcCA9PlxuXHRcdFx0XHRmaW5kSW5HZW5kZXIoQCwgQHRhYnMuY3VycmVudEl0ZW0sIGlucHV0RnJhbWUudmFsdWUpXG5cdFxuXHQjIyMjIyMjIyMjIyMgUFJJVkFURSBNRVRIT0RTICgpICMjIyMjIyMjIyMjI1xuXHQjIyMjIGJsb2NrIHBhcmVudCBzY3JvbGwgaWYgc2VhcmNoIGNvbXAgaXMgYWN0aXZlICMjIyNcblx0YmxvY2tQYXJlbnRTY3JvbGwgPSAodW5pdCwgdG9nZ2xlKSAtPlxuXHRcdGlmIHVuaXQucGFyZW50IGFuZCB1bml0LnBhcmVudC5uYW1lIGlzIFwiY29udGVudFwiXG5cdFx0XHRpZiB1bml0LnBhcmVudC5wYXJlbnQuY29uc3RydWN0b3IubmFtZSBpcyBcIlNjcm9sbENvbXBvbmVudFwiXG5cdFx0XHRcdGlmIHRvZ2dsZVxuXHRcdFx0XHRcdHVuaXQucGFyZW50LnBhcmVudC5zY3JvbGxWZXJ0aWNhbCA9IGZhbHNlXG5cdFx0XHRcdFx0dW5pdC5wYXJlbnQueSA9IDBcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHVuaXQucGFyZW50LnBhcmVudC5zY3JvbGxWZXJ0aWNhbCA9IHRydWVcblxuXHQjIyMjIEVyYXNlIEFycmF5IG1ldGhvZCAjIyMjXG5cdGVyYXNlQXJyYXkgPSAoYXJyYXkpIC0+XG5cdFx0Zm9yIGNoaWxkIGluIGFycmF5XG5cdFx0XHRjaGlsZC5kZXN0cm95KClcblx0XHRcdFxuXHQjIyMjIENyZWF0ZSBzZWFyY2ggbGlzdCBpdGVtcyAjIyMjXG5cdGNyZWF0ZUxheWVycyA9IChwYXJlbnQsIG5hbWUsIHR5cGUsIGlkKSA9PlxuXHRcdG1hdGNoZWRJdHRlbSA9IHNlYXJjaF9mcmFtZS5zZWxlY3RDaGlsZChcInNlYXJjaF9saXN0X2l0ZW1cIikuY29weSgpXG5cdFx0bWF0Y2hlZEl0dGVtLnNlbGVjdENoaWxkKFwibmFtZV9sYWJlbFwiKS5wcm9wcyA9XG5cdFx0XHRhdXRvSGVpZ2h0OiB0cnVlXG5cdFx0XHR0ZXh0T3ZlcmZsb3c6IFwiZWxlcHNpc1wiXG5cdFx0XHR3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiXG5cdFx0XHRvdmVyZmxvdzogXCJoaWRkZW5cIlxuXHRcdFx0XG5cdFx0bWF0Y2hlZEl0dGVtLnZpc2libGUgPSB0cnVlXG5cdFx0bWF0Y2hlZEl0dGVtLnNlbGVjdENoaWxkKFwibmFtZV9sYWJlbFwiKS50ZW1wbGF0ZSA9XG5cdFx0XHRuYW1lOiBuYW1lXG5cdFx0XHR0eXBlOiB0eXBlXG5cblx0XHRtYXRjaGVkSXR0ZW0ucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBwYXJlbnQucmVzdWx0c1Njcm9sbENtcC5jb250ZW50XG5cdFx0XHR4OiAwLCB5OiAwXG5cblx0XHRtYXRjaGVkSXR0ZW0ub25UYXAgLT5cblx0XHRcdGlmIHR5cGVvZiBwYXJlbnQub3B0LmFjdGlvbnNbXCIje2lkfVwiXSBpcyBcImZ1bmN0aW9uXCJcblx0XHRcdFx0cGFyZW50Lm9wdC5hY3Rpb25zW1wiI3tpZH1cIl0oKVxuXG5cdCMjIyMgRmluZCBhbmQgY29tcGFyZSB2YWx1ZXMgaW4gSlNPTnMgIyMjI1xuXHRmaW5kVmFsID0gKHBhcmVudCwgZGVzaWduZXJzQXJyYXksIGNhdGVnb3JpZXNBcnJheSwgdmFsKSAtPlxuXHRcdGVyYXNlQXJyYXkocGFyZW50LnJlc3VsdHNTY3JvbGxDbXAuY29udGVudC5jaGlsZHJlbilcblx0XHRcblx0XHQjIENyZWF0ZSBlbXB0eSBzdG9yYWdlIGZvciBtYXRjaGVkIGl0ZW1zIFxuXHRcdHVuaW9uTWF0Y2hlZEFycmF5ID0gW11cblx0XHRcblx0XHQjIENoZWNrIERlc2lnbmVycyBhcnJheVxuXHRcdGZvciBjaGlsZCBpbiBkZXNpZ25lcnNBcnJheVxuXHRcdFx0aWYgXy5pbmNsdWRlcyhjaGlsZC5uYW1lLCB2YWwudG9VcHBlckNhc2UoKSkgb3IgXy5pbmNsdWRlcyhjaGlsZC5uYW1lLCB2YWwudG9Mb3dlckNhc2UoKSkgb3IgXy5pbmNsdWRlcyhjaGlsZC5uYW1lLCB2YWwpXG5cdFx0XHRcdHVuaW9uTWF0Y2hlZEFycmF5LnB1c2goe1xuXHRcdFx0XHRcdG5hbWU6IGNoaWxkLm5hbWVcblx0XHRcdFx0XHR0eXBlOiBjaGlsZC50eXBlXG5cdFx0XHRcdFx0aWQ6IGNoaWxkLmlkXG5cdFx0XHRcdH0pXG5cdFx0XHRcdFxuXHRcdCMgQ2hlY2sgQ2F0ZWdvcmllcyBhcnJheVxuXHRcdGZvciBjaGlsZCBpbiBjYXRlZ29yaWVzQXJyYXlcblx0XHRcdGlmIF8uaW5jbHVkZXMoY2hpbGQubmFtZSwgdmFsLnRvVXBwZXJDYXNlKCkpIG9yIF8uaW5jbHVkZXMoY2hpbGQubmFtZSwgdmFsLnRvTG93ZXJDYXNlKCkpIG9yIF8uaW5jbHVkZXMoY2hpbGQubmFtZSwgdmFsKVxuXHRcdFx0XHR1bmlvbk1hdGNoZWRBcnJheS5wdXNoKHtcblx0XHRcdFx0XHRuYW1lOiBjaGlsZC5uYW1lXG5cdFx0XHRcdFx0dHlwZTogY2hpbGQudHlwZVxuXHRcdFx0XHRcdGlkOiBjaGlsZC5pZFxuXHRcdFx0XHR9KVxuXHQgXG5cdFx0IyBDcmVhdGUgbGF5ZXJzIGJhc2VkIG9uIHVuaW9uTWF0Y2hlZEFycmF5XG5cdFx0Zm9yIGNoaWxkIGluIHVuaW9uTWF0Y2hlZEFycmF5XG5cdFx0XHRjcmVhdGVMYXllcnMocGFyZW50LCBjaGlsZC5uYW1lLCBjaGlsZC50eXBlLCBjaGlsZC5pZClcblx0XHRcdHBhcmVudC50YWJzLnZpc2libGUgPSB0cnVlXG5cdFx0XHRwYXJlbnQudGFicy5hbmltYXRlKFwic3RhdGVBXCIpXG5cdFx0XG5cdFx0IyBTZXQgcG9zaXRpb25pbmdcblx0XHRmb3IgY2hpbGQgaW4gcGFyZW50LnJlc3VsdHNTY3JvbGxDbXAuY29udGVudC5jaGlsZHJlblxuXHRcdFx0Y2hpbGQueSA9IG5leHRQb3NZXG5cdFx0XHRuZXh0UG9zWSA9IGNoaWxkLm1heFlcblxuXHQjIyMjIFN3aXRjaCBnZW5kZXIgdGFicyAjIyMjXG5cdGZpbmRJbkdlbmRlciA9IChwYXJlbnQsIHRhYnMsIHZhbCkgLT5cblx0XHRkZXNpZ25lcnNBcnJheSA9IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIChwYXJlbnQub3B0LmRlc2lnbmVycylcblx0XHRjYXRlZ29yaWVzQXJyYXkgPSBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyAocGFyZW50Lm9wdC5jYXRlZ29yaWVzKVxuXHRcdFxuXHRcdHN3aXRjaCB0YWJzXG5cdFx0XHR3aGVuIFwid29tZW5cIlxuXHRcdFx0XHRmaW5kVmFsKHBhcmVudCwgZGVzaWduZXJzQXJyYXkud29tZW4sIGNhdGVnb3JpZXNBcnJheS53b21lbiwgdmFsKVxuXHRcdFx0d2hlbiBcIm1lblwiXG5cdFx0XHRcdGZpbmRWYWwocGFyZW50LCBkZXNpZ25lcnNBcnJheS5tZW4sIGNhdGVnb3JpZXNBcnJheS5tZW4sIHZhbClcblx0XHRcdHdoZW4gXCJraWRzXCJcblx0XHRcdFx0ZmluZFZhbChwYXJlbnQsIGRlc2lnbmVyc0FycmF5LmtpZHMsIGNhdGVnb3JpZXNBcnJheS5raWRzLCB2YWwpIiwiIyMjIyMjIyMjIyMjIFBST1BFUlRJRVMgIyMjIyMjIyMjI1xuIyByZWNvbWVuZGVkTGlzdCA9IG5ldyBSZWNvbW1lbmRlZExpc3RVbml0XG4jIFx0c2hvcEFsbEJ0bjogZmFsc2VcbiMgXHRpY29uOiBmYWxzZVxuIyBcdGJvcmRlcjogZmFsc2VcbiMgXHRkZXNjcmlwdGlvbjogZmFsc2VcblxuIyMjIyMjIyMjIyMjIyMgTElTVCBQUk9EVUNUIENBUkQgIyMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuUmVjb21tZW5kZWRMaXN0VW5pdCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdEB1bml0X2ZyYW1lID0gcmVjb21lbmRlZF9saXN0X3VuaXQuY29weSgpXG5cdFx0XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IEB1bml0X2ZyYW1lLndpZHRoXG5cdFx0XHRoZWlnaHQ6IEB1bml0X2ZyYW1lLmhlaWdodFxuXHRcdFx0YXJyYXk6IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIFwibW9kdWxlcy9GRktpdC91bml0cy9Qcm9kdWN0TGlzdGluZ1VuaXQvZGF0YS9wcm9kdWN0cy5qc29uXCJcblx0XHRcdHNob3BBbGxCdG46IHRydWVcblx0XHRcdGljb246IGZhbHNlXG5cdFx0XHRib3JkZXI6IGZhbHNlXG5cdFx0XHRkZXNjcmlwdGlvbjogZmFsc2Vcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRsaW1pdGVkQXJyID0gQG9wdC5hcnJheS5zbGljZSgwLDQpXG5cdFx0XG5cdFx0QHVuaXRfZnJhbWUucGFyZW50ID0gQFxuXHRcdEB1bml0X2ZyYW1lLnByb3BzID1cblx0XHRcdHg6IDAsIHk6IDBcblx0XHRcblx0XHRAbGlzdCA9IG5ldyBQcm9kdWN0TGlzdGluZ1VuaXRcblx0XHRcdHBhcmVudDogQHVuaXRfZnJhbWVcblx0XHRcdHk6IEB1bml0X2ZyYW1lLnNlbGVjdENoaWxkKFwiY2FyZHNcIikueVxuXHRcdFx0aWNvbjogQG9wdC5pY29uXG5cdFx0XHRib3JkZXI6IEBvcHQuYm9yZGVyXG5cdFx0XHRkZXNjcmlwdGlvbjogQG9wdC5kZXNjcmlwdGlvblxuXHRcdFx0YXJyYXk6IGxpbWl0ZWRBcnJcblx0XHRcdFxuXHRcdEB1bml0X2ZyYW1lLnNlbGVjdENoaWxkKFwiY2FyZHNcIikuZGVzdHJveSgpXG5cdFx0XG5cdFx0aWYgQG9wdC5zaG9wQWxsQnRuIGlzIHRydWVcblx0XHRcdEB1bml0X2ZyYW1lLnNlbGVjdENoaWxkKFwiY3RhXCIpLnkgPSBAbGlzdC5tYXhZICsgTV9zcGFjZXJcblx0XHRcdEBoZWlnaHQgPSBAdW5pdF9mcmFtZS5oZWlnaHQgPSBAdW5pdF9mcmFtZS5zZWxlY3RDaGlsZChcImN0YVwiKS5tYXhZXG5cdFx0ZWxzZVxuXHRcdFx0QHVuaXRfZnJhbWUuc2VsZWN0Q2hpbGQoXCJjdGFcIikuZGVzdHJveSgpXG5cdFx0XHRAaGVpZ2h0ID0gQGxpc3QubWF4WVxuXHRcdFxuXG4iLCIjIyMjIyMjIyMjIyMjIyBQUk9EVUNUIFVOSVQgIyMjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5Qcm9kdWN0VW5pdCBleHRlbmRzIExheWVyXG5cdCMgRnJhbWUgZnJvbSBEZXNpZ24gTW9kZVxuXHRmcmFtZSA9IHByb2R1Y3RfdW5pdFxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0IyBDbG9uaW5nIGxheWVycyBmcm9tICdEZXNpZ24gbW9kZSdcblx0XHRAdW5pdCA9IGZyYW1lLmNvcHkoKVxuXHRcdEB1bml0LnByb3BzID0gIyBjbG9uZWQgdW5pdCBzZXR0aW5nc1xuXHRcdFx0eDowLCB5OjBcblxuXHRcdCMgSW5pdGlhbGlzZSB0aGUgVW5pdFxuXHRcdHN1cGVyIEBvcHQgXG5cdFx0QGhlaWdodCA9IGZyYW1lLmhlaWdodFxuXHRcdEB3aWR0aCA9IGZyYW1lLndpZHRoXG5cdFx0QHVuaXQucGFyZW50ID0gQFxuXHRcdEB1bml0LnNlbGVjdENoaWxkKFwicGFnZVwiKS5iYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBALCBAb3B0LnkpXG5cblx0XHQjIEdlbmVyYXRlIFByb2R1Y3QgU2xpZGVyXG5cdFx0cHJvZHVjdFNsaWRlciA9IG5ldyBQcm9kdWN0U2xpZGVyXG5cdFx0XHRwYXJlbnQ6IEB1bml0LnNlbGVjdENoaWxkKFwicGFnZVwiKVxuXHRcdFx0YXJyYXk6IEBvcHQucHJvZHVjdHNBcnJheVxuXG5cdFx0IyBGcmFtZSBpbiBEZXNpZ24gTW9kZVxuXHRcdGN0YV9mcmFtZSA9IEB1bml0LnNlbGVjdENoaWxkKFwiY3RhXCIpXG5cblx0XHQjIENyZWF0ZSBDVEFcblx0XHRAY3RhID0gbmV3IEJ1dHRvblxuXHRcdFx0eDogY3RhX2ZyYW1lLngsIHk6IGN0YV9mcmFtZS55LCBwYXJlbnQ6IGN0YV9mcmFtZS5wYXJlbnQsICMgY29weSBmcmFtZSBwcm9wc1xuXHRcdFx0dGV4dDogXCJTaG9wIG5vd1wiXG5cdFx0I1x0bmFtZTogXCJjdGFcIlxuXHRcdGN0YV9mcmFtZS5kZXN0cm95KCkgIyByZW1vdmUgbGF5ZXJcblxuXG5cdCMjIyMjIyMjIyMjIyMjIyDwn5K+IEdFVFRJTkcgQU5EIFNFVFRJTkcgQ0xBU1MgREFUQSAjIyMjIyMjIyMjIyMjIyNcblx0XHRcdFxuXHRAZGVmaW5lICd0aXRsZScsIFxuXHRcdGdldDogLT4gQG9wdC50aXRsZSxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAdW5pdC5zZWxlY3RDaGlsZChcInRpdGxlXCIpLnRleHQgPSB2YWx1ZSAjIHVwZGF0ZSB0aGUgdmFsdWVcblx0XHRcdEB1bml0LnNlbGVjdENoaWxkKCd0aXRsZScpLmF1dG9IZWlnaHQgPSB0cnVlICMgbGF5b3V0IC8gcG9zaXRpb25pbmdcblx0XHRcblx0QGRlZmluZSAnZGVzY3JpcHRpb24nLCBcblx0XHRnZXQ6IC0+IEBvcHQuZGVzY3JpcHRpb24sXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QHVuaXQuc2VsZWN0Q2hpbGQoXCJkZXNjcmlwdGlvblwiKS50ZXh0ID0gdmFsdWUgIyB1cGRhdGUgdGhlIHZhbHVlXG5cblx0XHRcdCMgbGF5b3V0IC8gcG9zaXRpb25pbmdcblx0XHRcdEB1bml0LnNlbGVjdENoaWxkKCdkZXNjcmlwdGlvbicpLmF1dG9IZWlnaHQgPSB0cnVlIFxuXHRcdFx0QHVuaXQuc2VsZWN0Q2hpbGQoJ2Rlc2NyaXB0aW9uJykueSA9IEB1bml0LnNlbGVjdENoaWxkKCd0aXRsZScpLm1heFkgKyAxMFxuXHRcdFx0QHVuaXQuc2VsZWN0Q2hpbGQoJ3BhZ2UnKS55ID0gQHVuaXQuc2VsZWN0Q2hpbGQoJ2Rlc2NyaXB0aW9uJykubWF4WSArIDI1XG4iLCJ7cGFyYWxheE9uU2Nyb2xsfSA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlci1mdW5jdGlvbnMvcHJpdmF0ZS9wYXJhbGF4T25TY3JvbGwuY29mZmVlJylcblxuIyMjIyMjIyMjIyMjIyMgUFJPRFVDVCBTRVQgIyMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuUHJvZHVjdFNldCBleHRlbmRzIExheWVyXG5cdCMgRnJhbWUgZnJvbSBEZXNpZ24gTW9kZVxuXHRmcmFtZSA9IHByb2R1Y3Rfc2V0XG5cblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0IyBDbG9uaW5nIGxheWVycyBmcm9tICdEZXNpZ24gbW9kZSdcblx0XHRAdW5pdCA9IGZyYW1lLmNvcHkoKVxuXHRcdEB1bml0LnByb3BzID0gIyBjbG9uZWQgdW5pdCBzZXR0aW5nc1xuXHRcdFx0eDowLCB5OjBcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHBhcmFsYXg6IHRydWVcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXHRcdEBoZWlnaHQgPSBmcmFtZS5oZWlnaHRcblx0XHRAd2lkdGggPSBmcmFtZS53aWR0aFxuXHRcdEB1bml0LnBhcmVudCA9IEBcblx0XHRAdW5pdC5zZWxlY3RDaGlsZChcInBhZ2VcIikuYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXHRcdEB1bml0LnNlbGVjdENoaWxkKCd0aXRsZScpLmF1dG9IZWlnaHQgPSB0cnVlXG5cdFx0QHVuaXQuc2VsZWN0Q2hpbGQoXCJzdWJfdGl0bGVcIikuYXV0b0hlaWdodCA9IHRydWVcblxuXHRcdCMgQ3JlYXRlIENUQVxuXHRcdEBzaG9wTm93QnRuID0gbmV3IEJ1dHRvblxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRmcmFtZTogQHVuaXQuc2VsZWN0Q2hpbGQoXCJjdGFcIikuZnJhbWVcblx0XHRcdHg6IEB1bml0LnNlbGVjdENoaWxkKFwiY3RhXCIpLngsIHk6QHVuaXQuc2VsZWN0Q2hpbGQoXCJjdGFcIikueVxuXHRcdFx0dGV4dDogQHVuaXQuc2VsZWN0Q2hpbGQoXCJjdGFcIikuc2VsZWN0Q2hpbGQoXCJidXR0b25fdGV4dFwiKS50ZXh0XG5cblx0XHRAdW5pdC5zZWxlY3RDaGlsZChcImN0YVwiKS5kZXN0cm95KCkgIyByZW1vdmUgbGF5ZXJcblxuXG5cdFx0IyBFbmFibGUgcGFyYWxheFxuXHRcdGlmIEBvcHQucGFyYWxheCBpcyB0cnVlXG5cdFx0XHRwYXJhbGF4T25TY3JvbGwoQClcblxuXHRcdCMgR2VuZXJhdGUgUHJvZHVjdCBTbGlkZXJcblx0XHRwcm9kdWN0U2xpZGVyID0gbmV3IFByb2R1Y3RTbGlkZXJcblx0XHRcdHBhcmVudDogQHVuaXQuc2VsZWN0Q2hpbGQoXCJwYWdlXCIpXG5cdFx0XHRhcnJheTogQG9wdC5wcm9kdWN0c0FycmF5XG5cblx0IyMjIyMjIyMjIyMjIyMjIPCfkr4gR0VUVElORyBBTkQgU0VUVElORyBDTEFTUyBEQVRBICMjIyMjIyMjIyMjIyMjI1xuXHRcdFx0XG5cdEBkZWZpbmUgJ3RpdGxlJywgXG5cdFx0Z2V0OiAtPiBAb3B0LnRpdGxlLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEB1bml0LnNlbGVjdENoaWxkKCd0aXRsZScpLmF1dG9IZWlnaHQgPSB0cnVlXG5cdFx0XHRAdW5pdC5zZWxlY3RDaGlsZChcInRpdGxlXCIpLnRleHQgPSB2YWx1ZSAjIHVwZGF0ZSB0aGUgdmFsdWVcblx0XHRcblx0QGRlZmluZSAnc3ViVGl0bGUnLCBcblx0XHRnZXQ6IC0+IEBvcHQuc3ViVGl0bGUsXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAdW5pdC5zZWxlY3RDaGlsZCgndGl0bGUnKS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXHRcdFx0QHVuaXQuc2VsZWN0Q2hpbGQoXCJzdWJfdGl0bGVcIikudGV4dCA9IHZhbHVlICMgdXBkYXRlIHRoZSB2YWx1ZVxuXHRcdFx0QHVuaXQuc2VsZWN0Q2hpbGQoJ3N1Yl90aXRsZScpLnkgPSBAdW5pdC5zZWxlY3RDaGlsZCgndGl0bGUnKS5tYXhZICsgMTBcblxuXHRAZGVmaW5lICdjb3ZlcicsIFxuXHRcdGdldDogLT4gQG9wdC5jb3Zlcixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAdW5pdC5zZWxlY3RDaGlsZChcImltYWdlXCIpLmltYWdlID0gdmFsdWUgIyB1cGRhdGUgdGhlIHZhbHVlXG5cblx0IyBUTy1ETyBsYXRlc3QgdmVyc3Npb24gb2YgVUkgZG9lcyBub3QgdXNlIHRoaXMuIFJlbW92ZSBvbiBzb21lIHBvaW50IGZyb20gaGVyZSBhbmQgRGVzaWduIG1vZGUuXG5cdEBkZWZpbmUgJ2Rlc2NyaXB0aW9uJywgXG5cdFx0Z2V0OiAtPiBAb3B0LmRlc2NyaXB0aW9uLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEB1bml0LnNlbGVjdENoaWxkKFwiZGVzY3JpcHRpb25cIikudGV4dCA9IHZhbHVlICMgdXBkYXRlIHRoZSB2YWx1ZVxuIyBcdFx0XHQjIEFsaWduaW5nIHRoZSBhcnJvd1xuIyBcdFx0XHR1bml0LnNlbGVjdENoaWxkKCdhcnJvdycpLnkgPSB1bml0LnNlbGVjdENoaWxkKCdkZXNjcmlwdGlvbicpLnkgKyA4IiwiIyMjIyMjIyMjIyMjIFBST1BFUlRJRVMgIyMjIyMjIyMjI1xuIyBcdGFycmF5OiBbYXJyYXldXG4jIFx0aWNvbjogZmFsc2VcbiMgXHRib3JkZXI6IGZhbHNlXG4jXHRkZXNjcmlwdGlvbjogZmFsc2VcblxuIyMjIyMjIyMjIyMjIyMgTElTVCBQUk9EVUNUIENBUkQgIyMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuUHJvZHVjdExpc3RpbmdVbml0IGV4dGVuZHMgTGF5ZXJcblx0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdG5hbWU6IFwiUHJvZHVjdExpc3RpbmdVbml0XCJcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGFycmF5OiBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyBcIm1vZHVsZXMvRkZLaXQvdW5pdHMvUHJvZHVjdExpc3RpbmdVbml0L2RhdGEvcHJvZHVjdHMuanNvblwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGljb246IHRydWVcblx0XHRcdGJvcmRlcjogdHJ1ZVxuXHRcdFx0ZGVzY3JpcHRpb246IHRydWVcblxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0IyBJbml0aWFsIHZhcmlhYmxlc1xuXHRcdGNvbHVtbkNvdW50ID0gMlxuXHRcdHRpbGVDb3VudCA9IEBvcHQuYXJyYXkubGVuZ3RoXG5cdFx0Y29tYmluZWRUaWxlV2lkdGggPSBTY3JlZW4ud2lkdGhcblx0XHR0aWxlV2lkdGggPSBjb21iaW5lZFRpbGVXaWR0aCAvIGNvbHVtbkNvdW50XG5cblx0XHQjIENyZWF0ZSBncmlkXG5cdFx0Zm9yIGkgaW4gWzAuLi50aWxlQ291bnRdXG5cdFx0XHQjIFJhdGlvbiB2YXJpYmxlcyB0byBtYWtlIGEgZ3JpZFxuXHRcdFx0Y29sdW1uSW5kZXggPSBpICUgY29sdW1uQ291bnRcblx0XHRcdHJvd0luZGV4ID0gTWF0aC5mbG9vcihpIC8gY29sdW1uQ291bnQpXG5cdFx0XHRcblx0XHRcdCMgQ3JlYXRlIGNhcmRzXG5cdFx0XHRAW1wibGlzdGNhcmRfI3tpKzF9XCJdID0gbmV3IExpc3RQcm9kdWN0Q2FyZFxuXHRcdFx0XHRuYW1lOiBcImxpc3RjYXJkXyN7aSsxfVwiXG5cdFx0XHRcdHg6IGNvbHVtbkluZGV4ICogdGlsZVdpZHRoXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHRzZWFzb246IEBvcHQuYXJyYXlbaV0uc2Vhc29uXG5cdFx0XHRcdGNvdmVyOiBAb3B0LmFycmF5W2ldLmltYWdlXG5cdFx0XHRcdGJyYW5kOiBAb3B0LmFycmF5W2ldLmJyYW5kXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBpZiBAb3B0LmRlc2NyaXB0aW9uIHRoZW4gQG9wdC5hcnJheVtpXS5zaG9ydERlc2NyaXB0aW9uIGVsc2UgZmFsc2Vcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IGlmIEBvcHQuYm9yZGVyIHRoZW4gMC41XG5cdFx0XHRcdGJvcmRlckNvbG9yOiBpZiBAb3B0LmJvcmRlciB0aGVuIFwicmdiYSgwLDAsMCwwLjEpXCJcblx0XHRcdFxuXHRcdFx0QFtcImxpc3RjYXJkXyN7aSsxfVwiXS55ID0gcm93SW5kZXggKiBAW1wibGlzdGNhcmRfI3tpKzF9XCJdLm1heFlcblx0XHRcdFxuXHRcdFx0aWYgQG9wdC5pY29uIGlzIGZhbHNlXG5cdFx0XHRcdEBbXCJsaXN0Y2FyZF8je2krMX1cIl0uaWNvbl9mcmFtZS5kZXN0cm95KClcblx0XHRcblx0XHRAaGVpZ2h0ID0gQGNoaWxkcmVuW3RpbGVDb3VudC0xXS5tYXhZXG5cdFx0XHRcdFxuXG4iLCJ7cGFyYWxheE9uU2Nyb2xsfSA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlci1mdW5jdGlvbnMvcHJpdmF0ZS9wYXJhbGF4T25TY3JvbGwuY29mZmVlJylcblxuIyMjIyMjIyMjIyMjIyMgUFJPRFVDVCBIRVJPICMjIyMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LlByb2R1Y3RIZXJvIGV4dGVuZHMgTGF5ZXJcblx0IyBWYXJpYWJsZXMgZnJvbSBEZXNpZ24gTW9kZVxuXHRyZWZGcmFtZSA9IHByb2R1Y3RfaGVyb1xuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdG9wdCA9IF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHRpdGxlOiByZWZGcmFtZS5zZWxlY3RDaGlsZChcInRpdGxlXCIpLnRleHRcblx0XHRcdHN1YlRpdGxlOiByZWZGcmFtZS5zZWxlY3RDaGlsZChcInN1Yl90aXRsZVwiKS50ZXh0XG5cdFx0XHRkZXNjcmlwdGlvbjogcmVmRnJhbWUuc2VsZWN0Q2hpbGQoXCJkZXNjcmlwdGlvblwiKS50ZXh0XG5cdFx0XHRjb3ZlcjogcmVmRnJhbWUuc2VsZWN0Q2hpbGQoXCJpbWFnZVwiKS5pbWFnZVxuXHRcdFx0d2lkdGg6IHJlZkZyYW1lLndpZHRoLCBoZWlnaHQ6IHJlZkZyYW1lLmhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMSlcIlxuXHRcdFx0Y2xpcDogdHJ1ZVxuXHRcdFx0cGFkZGluZ0xlZnQ6IFNjcmVlbi53aWR0aCAtIDQwXG5cdFx0XHRwYXJhbGF4OiB0cnVlXG5cdFx0c3VwZXIgb3B0XG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBALCBAb3B0LnkpXG5cblx0XHQjIENyZWF0ZSBpbWFnZVxuXHRcdEBiYWNrZ3JvdW5kSW1hZ2UgPSByZWZGcmFtZS5zZWxlY3RDaGlsZChcImltYWdlXCIpLmNvcHkoKVxuXHRcdEBiYWNrZ3JvdW5kSW1hZ2UucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRpbWFnZTogQG9wdC5jb3ZlclxuXG5cblx0XHQjIENyZWF0ZSBmYWRlIEZyYW1lXG5cdFx0QGZhZGVGcmFtZSA9IGZhZGVGcmFtZSA9IHJlZkZyYW1lLnNlbGVjdENoaWxkKFwiZmFkZV9mcmFtZVwiKS5jb3B5KClcblx0XHRAZmFkZUZyYW1lLnByb3BzID1cblx0XHRcdHBhcmVudDogQFxuXG5cdFx0IyBDcmVhdGUgdGl0bGVcblx0XHRAdGl0bGUgPSByZWZGcmFtZS5zZWxlY3RDaGlsZChcInRpdGxlXCIpLmNvcHkoKVxuXHRcdEB0aXRsZS5wcm9wcyA9XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHRleHQ6IEBvcHQudGl0bGVcblx0XHRcdGF1dG9IZWlnaHQ6IHRydWVcblxuXHRcdCMgQ3JlYXRlIHN1YlRpdGxlXG5cdFx0QHN1YlRpdGxlID0gcmVmRnJhbWUuc2VsZWN0Q2hpbGQoXCJzdWJfdGl0bGVcIikuY29weSgpXG5cdFx0QHN1YlRpdGxlLnByb3BzID1cblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogQG9wdC5zdWJUaXRsZVxuXHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXG5cdFx0IyBDcmVhdGUgZGVzY3JpcHRpb24gdGV4dFxuXHRcdEBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uID0gcmVmRnJhbWUuc2VsZWN0Q2hpbGQoXCJkZXNjcmlwdGlvblwiKS5jb3B5KClcblx0XHRAZGVzY3JpcHRpb24ucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR0ZXh0OiBAb3B0LmRlc2NyaXB0aW9uXG5cblx0XHQjIENyZWF0ZSB0YXAgYXJlYVxuXHRcdEB0YXBBcmVhID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0ZnJhbWU6IHJlZkZyYW1lLnNlbGVjdENoaWxkKCd0YXBfYXJlYScpLmZyYW1lXG5cblx0XHQjIENyZWF0ZSBQcm9kdWN0IHNsaWRlclxuXHRcdEBwcm9kdWN0U2xpZGVyID0gcHJvZHVjdFNsaWRlciA9IG5ldyBQcm9kdWN0U2xpZGVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHBhZGRpbmdMZWZ0OiBAb3B0LnBhZGRpbmdMZWZ0XG5cdFx0XHRhcnJheTogQG9wdC5wcm9kdWN0c0FycmF5XG5cdFx0QHByb2R1Y3RTbGlkZXIuY29udGVudC5jbGlwID0gZmFsc2Vcblx0XHRAcHJvZHVjdFNsaWRlci5mcmFtZSA9IHJlZkZyYW1lLnNlbGVjdENoaWxkKFwicGFnZVwiKS5mcmFtZVxuXHRcdFxuXHRcdEBwcm9kdWN0U2xpZGVyLnNob3dNb3JlQ2FyZC5wcm9wcyA9XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0XHRcdHdpZHRoOiBAcHJvZHVjdFNsaWRlci5zaG93TW9yZUNhcmQud2lkdGgqMi41XG5cdFx0QHByb2R1Y3RTbGlkZXIuYnV0dG9uU2hvd01vcmUuc3R5bGVbXCJmaWx0ZXJcIl0gPSBcImludmVydCgxKVwiXG5cblx0XHQjIENyZWF0ZSBDVEEgYnV0dG9uXG5cdFx0QGN0YUJ1dHRvbiA9IG5ldyBCdXR0b25cblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogcmVmRnJhbWUuc2VsZWN0Q2hpbGQoXCJjdGFcIikuc2VsZWN0Q2hpbGQoXCJidXR0b25fdGV4dFwiKS50ZXh0XG5cdFx0QGN0YUJ1dHRvbi5mcmFtZSA9IHJlZkZyYW1lLnNlbGVjdENoaWxkKFwiY3RhXCIpLmZyYW1lXG5cblx0XHRpZiBAb3B0LnBhcmFsYXggaXMgdHJ1ZVxuXHRcdFx0cGFyYWxheE9uU2Nyb2xsKEApXG5cblx0XHQjIEZpeGF0aW5nIHZhcmlhYmxlc1xuXHRcdHNjcm9sbE1vZHVsYXRlRmxhZyA9IHRydWVcblx0XHRsYXllclkgPSBAeVxuXHRcdGN1cnJlbnREZXNjcmlwdGlvbk9wYWNpdHkgPSBkZXNjcmlwdGlvbi5vcGFjaXR5XG5cblx0XHQjIENoZWNrIGlmIHBhcmVudCBpcyBTY3JvbGxDb21wb25lbnRcblx0XHRpZiBAcGFyZW50IGFuZCBAcGFyZW50Lm5hbWUgaXMgXCJjb250ZW50XCJcblx0XHRcdGlmIEBwYXJlbnQucGFyZW50LmNvbnN0cnVjdG9yLm5hbWUgaXMgXCJTY3JvbGxDb21wb25lbnRcIlxuXHRcdFx0XHQjIE1vZHVsYXRlIG9uIHNjcm9sbFxuXHRcdFx0XHRAcGFyZW50Lm9uTW92ZSAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0XHRcdCMgaWYgc2xpZGVyLmNvbnRlbnQueCA8IDBcblx0XHRcdFx0XHRpZiBzY3JvbGxNb2R1bGF0ZUZsYWcgaXMgdHJ1ZVxuXHRcdFx0XHRcdFx0Y3VycmVudERlc2NyaXB0aW9uT3BhY2l0eSA9IGRlc2NyaXB0aW9uLm9wYWNpdHlcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uLm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdFx0XHRcdFx0KGxheWVyWSAtIEBwYXJlbnQuc2Nyb2xsUG9pbnQueSkgLSAoQHBhcmVudC5oZWlnaHQvMilcblx0XHRcdFx0XHRcdFx0WzAsIC1AcGFyZW50LmhlaWdodC82XVxuXHRcdFx0XHRcdFx0XHRbMCwgMV1cblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdGZhZGVGcmFtZS5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHRcdFx0XHRcdChsYXllclkgLSBAcGFyZW50LnNjcm9sbFBvaW50LnkpIC0gKEBwYXJlbnQuaGVpZ2h0LzIpXG5cdFx0XHRcdFx0XHRcdFswLCAtQHBhcmVudC5oZWlnaHQvNl1cblx0XHRcdFx0XHRcdFx0WzAsIDFdXG5cdFx0XHRcdFx0XHQpXG5cblx0XHRAcHJvZHVjdFNsaWRlci5vbk1vdmUgKGV2ZW50LCBsYXllcikgLT5cblx0XHRcdCMgTW9kdWxhdGUgaWYgZmFkZUZyYW1lLm9wYWNpdHkgbW9yZSB0aGVuIDAgYW5kIHByb2R1Y3RTbGlkZXIueCBtb3JlIHRoZW4gMFxuXHRcdFx0aWYgZmFkZUZyYW1lLm9wYWNpdHkgPiAwIGFuZCBAeCA8IDBcblx0XHRcdFx0ZGVzY3JpcHRpb24ub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKFxuXHRcdFx0XHRcdEAueFxuXHRcdFx0XHRcdFswLCAtQHBhcmVudC53aWR0aC80XVxuXHRcdFx0XHRcdFtjdXJyZW50RGVzY3JpcHRpb25PcGFjaXR5LCAwXVxuXHRcdFx0XHQpXG5cdFx0XHQjIFN3aXRjaCB2YXJpYWJsZSB0byBmYWxzZSBpZiBwcm9kdWN0U2xpZGVyLnggbGVzcyB0aGVuIDBcblx0XHRcdGlmIEB4IDwgLTQwXG5cdFx0XHRcdHNjcm9sbE1vZHVsYXRlRmxhZyA9IGZhbHNlXG5cdFx0XHQjIFN3aXRjaCB2YXJpYWJsZSB0byB0cnVlIGlmIHByb2R1Y3RTbGlkZXIueCBtb3JlIG9yIGVxdWVsIDAgXG5cdFx0XHQjIGFuZCBsZXNzIHRoZW4gaGFsZiBvZiB0aGUgZW1wdHkgbGF5ZXIgaW4gcHJvZHVjdFNsaWRlclxuXHRcdFx0ZWxzZSBpZiBAeCA+IC00MFxuXHRcdFx0XHRzY3JvbGxNb2R1bGF0ZUZsYWcgPSB0cnVlXG4iLCJ7Z2VuZXJhdGVEb3RzfSA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlci1mdW5jdGlvbnMvcHJpdmF0ZS9nZW5lcmF0ZURvdHMuY29mZmVlJylcblxuIyMjIyMjIyMjIyMjIyMgUFJPRFVDVCBIRVJPICMjIyMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LlBEUEhlcm9Vbml0IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0dW5pdF9mcmFtZSA9IHBkcF9oZXJvXG5cdFx0ZGVmYXVsdEFycmF5ID0gSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgXCJtb2R1bGVzL0ZGS2l0L3VuaXRzL1BEUEhlcm9Vbml0L2RhdGEvcHJvZHVjdEltYWdlcy5qc29uXCJcblx0XHR1bml0X2ZyYW1lLnNlbGVjdENoaWxkKFwiZG90c1wiKS5kZXN0cm95KClcblx0XHQjIFNsaWRlclxuXHRcdEBpbWFnZVNsaWRlciA9IG5ldyBQYWdlQ29tcG9uZW50XG5cdFx0XHRuYW1lOiBcImltYWdlU2xpZGVyXCJcblx0XHRcdHdpZHRoOiB1bml0X2ZyYW1lLndpZHRoLCBoZWlnaHQ6IHVuaXRfZnJhbWUuc2VsZWN0Q2hpbGQoXCJpbWFnZVwiKS5oZWlnaHRcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiBmYWxzZVxuXHRcdFx0b3JpZ2luWCA6IDAuNVxuXHRcdFx0ZGlyZWN0aW9uTG9jazogdHJ1ZSAjIGF2b2lkcyBzd2lwZSB3aGVuXG5cdFx0XHRjbGlwOiB0cnVlXG5cdFx0XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0bmFtZTogXCJwZHBIZXJvXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHR3aWR0aDogdW5pdF9mcmFtZS53aWR0aFxuXHRcdFx0aGVpZ2h0OiB1bml0X2ZyYW1lLmhlaWdodFxuXHRcdFx0YXJyYXk6IGRlZmF1bHRBcnJheVxuXHRcdFx0YnJhbmQ6IHVuaXRfZnJhbWUuc2VsZWN0Q2hpbGQoXCJicmFuZFwiKS50ZXh0XG5cdFx0XHRkZXNjcmlwdGlvbjogdW5pdF9mcmFtZS5zZWxlY3RDaGlsZChcImRlc2NyaXB0aW9uXCIpLnRleHRcblx0XHRcdHByaWNlOiB1bml0X2ZyYW1lLnNlbGVjdENoaWxkKFwicHJpY2VcIikudGV4dFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0Zm9yIGNoaWxkLCBpIGluIEBvcHQuYXJyYXlcblx0XHRcdGNvdmVyX2ZyYW1lID0gdW5pdF9mcmFtZS5zZWxlY3RDaGlsZChcImltYWdlXCIpLmNvcHkoKVxuXHRcdFx0Y292ZXJfZnJhbWUucHJvcHMgPVxuXHRcdFx0XHRpbWFnZTogZGVmYXVsdEFycmF5W2ldLmltYWdlXG5cdFx0XHRcblx0XHRcdEBpbWFnZVNsaWRlci5hZGRQYWdlKGNvdmVyX2ZyYW1lKVxuXHRcdFxuXHRcdGdlbmVyYXRlRG90cyhAaW1hZ2VTbGlkZXIsIEBvcHQuYXJyYXkpXG5cdFx0QGltYWdlU2xpZGVyLnBhcmVudCA9IEBcblx0XHRAaWNvbiA9IHVuaXRfZnJhbWUuc2VsZWN0Q2hpbGQoXCJ3aXNobGlzdC1pY29cIikuY29weSgpXG5cdFx0QGljb24ueSA9IGlmIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSBpcyBcImFwcGxlLWlwaG9uZS14LXNwYWNlLWdyYXlcIiB0aGVuIEBpY29uLnkrMjAgZWxzZSBAaWNvbi55XG5cdFx0QGljb24ucGFyZW50ID0gQFxuXG5cdFx0IyBDb3B5IGRlc2NyaXB0aW9uIHRleHRcblx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lID0gdW5pdF9mcmFtZS5zZWxlY3RDaGlsZChcImJhc2VfZGVzY3JpcHRpb25fZnJhbWVcIikuY29weSgpXG5cdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5wcm9wcyA9XG5cdFx0XHR4OiAwLCB5OiB1bml0X2ZyYW1lLnNlbGVjdENoaWxkKFwiaW1hZ2VcIikubWF4WVxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHQjIFNldCB2YWx1ZXMgZnJvbSBAb3B0XG5cdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcInRpdGxlXCIpLnRleHQgPSBAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwiYnJhbmRcIikudGV4dCA9IEBvcHQuYnJhbmRcblx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwiZGVzY3JpcHRpb25cIikudGV4dCA9IEBvcHQuZGVzY3JpcHRpb25cblx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwicHJpY2VcIikudGV4dCA9IEBvcHQucHJpY2VcblxuXHRcdCMgVmFyaWFiYmxlcyBmb3Igc2Nyb2xsXG5cdFx0Y3VycmVudEJhc2VEZXNjcnJpcHRpb25ZID0gQGJhc2VEZXNjcmlwdGlvbl9mcmFtZS55XG5cdFx0Y3VycmVudEJhc2VEZXNjcnJpcHRpb25QcmljZVkgPSBAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwicHJpY2VcIikueVxuXHRcdGN1cnJlbnRJbWFnZVNsaWRlckhlaWdodCA9IEBpbWFnZVNsaWRlci5oZWlnaHRcblxuXHRcdCMgaWYgcGFyZW50IGlzIHNjcm9sbFxuXHRcdGlmIEAucGFyZW50IGFuZCBALnBhcmVudC5wYXJlbnQuY29udGVudCBhbmQgQC5wYXJlbnQucGFyZW50LmNvbnRlbnQubmFtZSBpcyBcImNvbnRlbnRcIlxuXHRcdFx0aWYgQC5wYXJlbnQucGFyZW50LmNvbnN0cnVjdG9yLm5hbWUgaXMgXCJTY3JvbGxDb21wb25lbnRcIlxuXHRcdFx0XHRALnBhcmVudC5vbiBcImNoYW5nZTp5XCIsIChvZmZzZXQpID0+XG5cdFx0XHRcdFx0IyBJbWFnZSBvZmZzZXRpbmdcblx0XHRcdFx0XHRAaW1hZ2VTbGlkZXIueSA9IFV0aWxzLm1vZHVsYXRlKEAucGFyZW50LnBhcmVudC5zY3JvbGxZLCBbMCwgMjUwXSwgWzAsIDEwMF0pXG5cdFx0XHRcdFx0QGltYWdlU2xpZGVyLmhlaWdodCA9IFV0aWxzLm1vZHVsYXRlKEAucGFyZW50LnBhcmVudC5zY3JvbGxZLCBbMCwgMTAwXSwgW2N1cnJlbnRJbWFnZVNsaWRlckhlaWdodCwgY3VycmVudEltYWdlU2xpZGVySGVpZ2h0LTMwXSlcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQjIFN0aWNrIHRoZSBiYXNlIGRlc2NyaXB0aW9uIGJsb2NrXG5cdFx0XHRcdFx0aWYgRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlIGlzIFwiYXBwbGUtaXBob25lLXgtc3BhY2UtZ3JheVwiXG5cdFx0XHRcdFx0XHRpZiBALnBhcmVudC55IDwgLTUzMFxuXHRcdFx0XHRcdFx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnkgPSAtQC5wYXJlbnQucGFyZW50LmNvbnRlbnQueSAtIDQwXG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUueSA9IGN1cnJlbnRCYXNlRGVzY3JyaXB0aW9uWVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGlmIEAucGFyZW50LnkgPCAtNTUwXG5cdFx0XHRcdFx0XHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUueSA9IC1ALnBhcmVudC5wYXJlbnQuY29udGVudC55IC0gNjZcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS55ID0gY3VycmVudEJhc2VEZXNjcnJpcHRpb25ZXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0IyBFbGVtZW50cyBhbmltYXRpb25cblx0XHRcdFx0XHRpZiBALnBhcmVudC55IDwgLTQ0MCBhbmQgQGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcImJyYW5kXCIpLm9wYWNpdHkgPj0gMFxuXHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcImJyYW5kXCIpLm9wYWNpdHkgLT0gMC4xNFxuXHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcImRlc2NyaXB0aW9uXCIpLm9wYWNpdHkgLT0gMC4xNFxuXHRcdFx0XHRcdGVsc2UgaWYgQC5wYXJlbnQueSA+IC00NDAgYW5kIEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJicmFuZFwiKS5vcGFjaXR5IDw9IDFcblx0XHRcdFx0XHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJicmFuZFwiKS5vcGFjaXR5ICs9IDAuMTRcblx0XHRcdFx0XHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJkZXNjcmlwdGlvblwiKS5vcGFjaXR5ICs9IDAuMTRcblxuXHRcdFx0XHRcdGlmIEAucGFyZW50LnkgPCAtNDkwIGFuZCBAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwicHJpY2VcIikuZm9udFNpemUgPj0gMTJcblx0XHRcdFx0XHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJwcmljZVwiKS55ICs9IDRcblx0XHRcdFx0XHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJwcmljZVwiKS5mb250U2l6ZSAtPSAwLjNcblx0XHRcdFx0XHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJwcmljZVwiKS5zdHlsZS5maWx0ZXIgPSBcImJyaWdodG5lc3MoMClcIlxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwidGl0bGVcIikub3BhY2l0eSArPSAwLjFcblx0XHRcdFx0XHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJ0aXRsZVwiKS55ICs9IDguMlxuXHRcdFx0XHRcdGVsc2UgaWYgQC5wYXJlbnQueSA+IC00OTAgYW5kIEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJwcmljZVwiKS5mb250U2l6ZSA8PSAxNVxuXHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcInByaWNlXCIpLmZvbnRTaXplICs9IDAuM1xuXHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcInByaWNlXCIpLnkgLT0gNFxuXHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcInByaWNlXCIpLnN0eWxlLmZpbHRlciA9IFwiYnJpZ2h0bmVzcygxKVwiXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJ0aXRsZVwiKS5vcGFjaXR5IC09IDAuMVxuXHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcInRpdGxlXCIpLnkgLT0gOC4yIiwiIyMjIyMjIyMjIyMgTGlzdCBUaXRsZSAjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5PcmRlclRyYWtlciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdFxuXHRcdCMgQ29tcG9uZW50IGZyYW1lIGZyb20gRGVzaWduIE1vZGVcblx0XHRjb21wX2ZyYW1lID0gb3JkZXJfdHJha2VyXG5cblx0XHQjIyMjIyMjIyMjIyMjIyMgU0lOR0xFIFVOSVQgIyMjIyMjIyMjIyMjIyMjXG5cdFx0aWYgQG9wdC5zbGlkZXJBcnJheSBpcyB1bmRlZmluZWRcblx0XHRcdFxuXHRcdFx0IyBDb3B5aW5nIHN1YiBmcmFtZXNcblx0XHRcdEBjYXJkX2ZyYW1lID0gY29tcF9mcmFtZS5zZWxlY3RDaGlsZChcIm9yZGVyX3RyYWtlcl9jYXJkXCIpLmNvcHkoKVxuXHRcdFx0XG5cdFx0XHRAcHJvZ3Jlc3NfZnJhbWUgPSBAY2FyZF9mcmFtZS5zZWxlY3RDaGlsZChcInByb2dyZXNzXCIpXG5cdFx0XHRAcHJvZ3Jlc3NfZnJhbWUud2lkdGggPSAwICNkZWZhdWx0IHN0YXR1c1xuXHRcdFxuXHRcdCMjIyMjIyMjIyMjIyMjIyBNVUxUSVBMRSBVTklUUyAjIyMjIyMjIyMjIyMjIyNcblx0XHRlbHNlXG5cdFx0XHQjIFNsaWRlclxuXHRcdFx0QHNsaWRlcl9mcmFtZSA9IG5ldyBQYWdlQ29tcG9uZW50XG5cdFx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogY29tcF9mcmFtZS5oZWlnaHRcblx0XHRcdFx0c2Nyb2xsVmVydGljYWw6IGZhbHNlXG5cdFx0XHRcdG9yaWdpblggOiAwLjVcblx0XHRcdFx0ZGlyZWN0aW9uTG9jazogdHJ1ZSAjIGF2b2lkcyBzd2lwZSB3aGVuXG5cdFx0XHRcdGNvbnRlbnRJbnNldDogXG5cdFx0XHRcdFx0bGVmdDogMTJcblx0XHRcdFx0XHRyaWdodDogMTJcblx0XHRcdFxuXHRcdFx0QHNsaWRlcyA9IFtdICAjIHN0b3JhZ2Vcblx0XHRcdGNhcmRXaWR0aCA9IDI5OFxuXG5cdFx0XHRmb3IgaSBpbiBbMC4uLkBvcHQuc2xpZGVyQXJyYXkubGVuZ3RoXVxuXHRcdFx0XHRcblx0XHRcdFx0QHNsaWRlID0gY29tcF9mcmFtZS5zZWxlY3RDaGlsZChcIm9yZGVyX3RyYWtlcl9jYXJkXCIpLmNvcHkoKVxuXHRcdFx0XHRAc2xpZGUud2lkdGggPSBjYXJkV2lkdGhcblx0XHRcdFx0QHNsaWRlLnNlbGVjdENoaWxkKFwicHJvZ3Jlc3NfYmdcIikud2lkdGggPSBjYXJkV2lkdGhcblxuXHRcdFx0XHQjIElmIHByb2dTdGFydCBpcyBub3QgZGVmaW5lZFxuXHRcdFx0XHRpZiBAb3B0LnNsaWRlckFycmF5W2ldLnByb2dTdGFydCBpcyB1bmRlZmluZWQgdGhlbiBAb3B0LnNsaWRlckFycmF5W2ldLnByb2dTdGFydCA9IDBcblx0XHRcdFx0IyBTZXQgdGhlICdwcm9ncmVzc2JhcicgdG8gcmVxdWVyZWQgZGVmYXVsdCB3aWR0aFxuXHRcdFx0XHRzdGFydFdpZHRoID0gKEBvcHQuc2xpZGVyQXJyYXlbaV0ucHJvZ1N0YXJ0ICogY2FyZFdpZHRoKS8xMDAgIyBjYWxjdWxhdGluZyBwZXJjZW50YWdlXG5cdFx0XHRcdEBzbGlkZS5zZWxlY3RDaGlsZChcInByb2dyZXNzXCIpLndpZHRoID0gc3RhcnRXaWR0aCAjZGVmYXVsdCBzdGF0dXNcblxuXHRcdFx0XHQjIFNldCBuZXcgcHJvZENhcmQgWCBwb3NpdGlvblxuXHRcdFx0XHRjdXJyZW50WCA9IChjYXJkV2lkdGggKyAxMikqaVxuXHRcdFx0XHRcblx0XHRcdFx0QHNsaWRlLnByb3BzID1cblx0XHRcdFx0XHR5OiAxMlxuXHRcdFx0XHRcdHg6IGN1cnJlbnRYXG5cdFx0XHRcdFx0cGFyZW50OiBAc2xpZGVyX2ZyYW1lLmNvbnRlbnRcblx0XHRcdFx0XG5cdFx0XHRcdCMgQWRkIHRoZSBjYXJkIHRvIFBhZ2UgQ29tcG9uZW50XG5cdFx0XHRcdEBzbGlkZXMucHVzaChAc2xpZGUpICMgc3RvcmVcblxuXG5cblxuXHRcdCMgSW5pdGlhbGlzZSB0aGUgY2xhc3Ncblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHRoZWlnaHQ6IGNvbXBfZnJhbWUuaGVpZ2h0XG5cdFx0XHR3aWR0aDogY29tcF9mcmFtZS53aWR0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBjb21wX2ZyYW1lLmJhY2tncm91bmRDb2xvclxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cblx0XHQjIyMjIyMjIyMjIyMjIyMgU0lOR0xFIFVOSVQgIyMjIyMjIyMjIyMjIyMjXG5cdFx0aWYgQG9wdC5zbGlkZXJBcnJheSBpcyB1bmRlZmluZWRcdFx0XHRcblx0XHQjIFN0YWdpbmcgc3ViIGZyYW1lc1xuXHRcdFx0YWRkQ2hpbGRyZW4oQCwgW0BjYXJkX2ZyYW1lXSlcblx0XHRcblxuXHRcdCMjIyMjIyMjIyMjIyMjIyBNVUxUSVBMRSBVTklUUyAjIyMjIyMjIyMjIyMjIyNcblx0XHRlbHNlIFxuXHRcdFx0YWRkQ2hpbGRyZW4oQCwgW0BzbGlkZXJfZnJhbWVdKVxuXG5cdFx0XHQjIyMjIyMjIyMjIyMjIyMgQW5pbWF0ZSBmaXJzdCBzbGlkZXIgb24gbG9hZFxuXHRcdFx0Y3VycmVudCA9IEBzbGlkZXJfZnJhbWUuaG9yaXpvbnRhbFBhZ2VJbmRleChAc2xpZGVyX2ZyYW1lLmN1cnJlbnRQYWdlKVxuXG5cdFx0XHRzdGFydFdpZHRoID0gKEBwcm9nU3RhcnRWYWx1ZXNbY3VycmVudF0gKiBjYXJkV2lkdGgpLzEwMCAjIGNhbGN1bGF0aW5nIHBlcmNlbnRhZ2VcdFx0XHRcblx0XHRcdEBzbGlkZXNbY3VycmVudF0uc2VsZWN0Q2hpbGQoXCJwcm9ncmVzc1wiKS53aWR0aCA9IHN0YXJ0V2lkdGggIyBTZXQgc3RhcnQgd2lkdGhcblxuXHRcdFx0dmFsdWUgPSBAb3B0LnNsaWRlckFycmF5W2N1cnJlbnRdLnByb2dyZXNzXG5cdFx0XHRAc2xpZGVzW2N1cnJlbnRdLnNlbGVjdENoaWxkKFwicHJvZ3Jlc3NcIikuYW5pbWF0ZSBcblx0XHRcdFx0d2lkdGg6ICh2YWx1ZSAqIEBzbGlkZXNbY3VycmVudF0uc2VsZWN0Q2hpbGQoXCJwcm9ncmVzc19iZ1wiKS53aWR0aCkvMTAwXG5cdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAwLjUpXG5cdFx0XHRcdFx0dGltZTogMC41XG5cdFx0XHRcdFx0ZGVsYXk6IDAuNFxuXHRcdFx0IyBQcmV2ZW50IGZyb20gJ3JlLWFueW1hdGluZydcblx0XHRcdEBwcm9nU3RhcnRWYWx1ZXNbY3VycmVudF0gPSBAb3B0LnNsaWRlckFycmF5W2N1cnJlbnRdLnByb2dyZXNzXG5cblx0XHRcdCMjIyMjIyMjIyMjIyMjIyBJbnRlcmFjdGlvbnM6IEFuaW1hdGUgb3RoZXIgY2FyZHNcblx0XHRcdEBzbGlkZXJfZnJhbWUub24gXCJjaGFuZ2U6Y3VycmVudFBhZ2VcIiwgKGV2ZW50LCBsYXllcikgPT5cblx0XHRcdFx0IyBTZWxlY3QgY3VycmVudFxuXHRcdFx0XHRjdXJyZW50ID0gbGF5ZXIuaG9yaXpvbnRhbFBhZ2VJbmRleChsYXllci5jdXJyZW50UGFnZSlcblxuXHRcdFx0XHQjIEN1cnJlbnQgc2xpZGUg4oCUIEBzbGlkZXNbY3VycmVudF1cblx0XHRcdFx0IyBDdXJyZW50IHByb2dyZXNzIFZhbHVlIOKAlCBAcHJvZ1ZhbHVlc1tjdXJyZW50XVxuXHRcdFx0XHQjIEN1cnJlbnQgcHJvZ1N0YXJ0IFZhbHVlIOKAlCBAcHJvZ1N0YXJ0VmFsdWVzW2N1cnJlbnRdXG5cblx0XHRcdFx0IyBTZXQgcHJvZ1N0YXJ0XG5cdFx0XHRcdHN0YXJ0V2lkdGggPSAoQHByb2dTdGFydFZhbHVlc1tjdXJyZW50XSAqIGNhcmRXaWR0aCkvMTAwICMgY2FsY3VsYXRpbmcgcGVyY2VudGFnZVx0XHRcdFxuXHRcdFx0XHRAc2xpZGVzW2N1cnJlbnRdLnNlbGVjdENoaWxkKFwicHJvZ3Jlc3NcIikud2lkdGggPSBzdGFydFdpZHRoICMgU2V0IHN0YXJ0IHdpZHRoXG5cblx0XHRcdFx0IyBBbmltYXRlIHRvIFByb2dyZXNzXG5cdFx0XHRcdG5ld1dpZHRoID0gKEBwcm9nVmFsdWVzW2N1cnJlbnRdICogQHNsaWRlc1tjdXJyZW50XS5zZWxlY3RDaGlsZChcInByb2dyZXNzX2JnXCIpLndpZHRoKS8xMDBcblx0XHRcdFx0QHNsaWRlc1tjdXJyZW50XS5zZWxlY3RDaGlsZChcInByb2dyZXNzXCIpLmFuaW1hdGUgXG5cdFx0XHRcdFx0d2lkdGg6IG5ld1dpZHRoXG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMC41KVxuXHRcdFx0XHRcdFx0dGltZTogMC41XG5cdFx0XHRcdFx0XHRkZWxheTogMC40XG5cdFx0XHRcdFxuXHRcdFx0XHQjIFByZXZlbnQgZnJvbSAncmUtYW55bWF0aW5nJ1xuXHRcdFx0XHRAcHJvZ1N0YXJ0VmFsdWVzW2N1cnJlbnRdID0gQHByb2dWYWx1ZXNbY3VycmVudF1cblxuXG5cblxuXHQjIyMjIyMjIyMjIyMjIyBHRVQsIFNFVCBBVFJJQlVURVMgIyMjIyMjIyMjIyMjIyMjXG5cblx0QGRlZmluZSBcInRpdGxlXCIsXG5cdFx0Z2V0OiAtPiBAb3B0LnRpdGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRpZiBAb3B0LnNsaWRlckFycmF5IGlzIHVuZGVmaW5lZFxuXHRcdFx0XHRAb3B0LnRpdGxlID0gdmFsdWVcblx0XHRcdFx0QGNhcmRfZnJhbWUuc2VsZWN0Q2hpbGQoXCJ0aXRsZVwiKS50ZXh0ID0gdmFsdWVcblxuXHRAZGVmaW5lIFwic3ViVGl0bGVcIixcblx0XHRnZXQ6IC0+IEBvcHQuc3ViVGl0bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdGlmIEBvcHQuc2xpZGVyQXJyYXkgaXMgdW5kZWZpbmVkXG5cdFx0XHRcdEBvcHQuc3ViVGl0bGUgPSB2YWx1ZVxuXHRcdFx0XHRAY2FyZF9mcmFtZS5zZWxlY3RDaGlsZChcInN1Yl90aXRsZVwiKS50ZXh0ID0gdmFsdWVcblxuXHRAZGVmaW5lIFwiaW1hZ2VcIixcblx0XHRnZXQ6IC0+IEBvcHQuaW1hZ2Vcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdGlmIEBvcHQuc2xpZGVyQXJyYXkgaXMgdW5kZWZpbmVkXG5cdFx0XHRcdEBvcHQuaW1hZ2UgPSB2YWx1ZVxuXHRcdFx0XHRAY2FyZF9mcmFtZS5zZWxlY3RDaGlsZChcImltYWdlXCIpLmltYWdlID0gdmFsdWVcblx0XHRcdFx0QGNhcmRfZnJhbWUuc2VsZWN0Q2hpbGQoXCJpbWFnZVwiKS5zdHlsZSA9IFwibWl4LWJsZW5kLW1vZGVcIjogXCJtdWx0aXBseVwiXG5cblx0QGRlZmluZSBcInByb2dTdGFydFwiLFxuXHRcdGdldDogLT4gQG9wdC5wcm9nU3RhcnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdGlmIEBvcHQuc2xpZGVyQXJyYXkgaXMgdW5kZWZpbmVkXG5cdFx0XHRcdEBvcHQucHJvZ1N0YXJ0ID0gdmFsdWUgIyB0aGlzIHdpbGwgYmUgdXNlZCBpbiAgJ3Byb2dyZXNzJ1xuXG5cdEBkZWZpbmUgXCJwcm9ncmVzc1wiLFxuXHRcdGdldDogLT4gQG9wdC5wcm9ncmVzc1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0aWYgQG9wdC5zbGlkZXJBcnJheSBpcyB1bmRlZmluZWRcblx0XHRcdFx0QG9wdC5wcm9ncmVzcyA9IHZhbHVlXG5cblx0XHRcdFx0IyBEZWZhdWx0IHByb2dTdGFydCB2YWx1ZVxuXHRcdFx0XHRpZiBAb3B0LnByb2dTdGFydCBpcyB1bmRlZmluZWRcblx0XHRcdFx0XHRAcHJvZ3Jlc3NfZnJhbWUud2lkdGggPSAwXG5cdFx0XHRcdCMgVXNlciBkZWZpbmVkIHByb2dTdGFydCB2YWx1ZVxuXHRcdFx0XHRlbHNlIFxuXHRcdFx0XHRcdHByb2dTdGFydFZhbHVlID0gKEBvcHQucHJvZ1N0YXJ0ICogQGNhcmRfZnJhbWUud2lkdGgpLzEwMCAjIGNhbGN1bGF0aW5nIHBlcmNlbnRhZ2Vcblx0XHRcdFx0XHRAcHJvZ3Jlc3NfZnJhbWUud2lkdGggPSBwcm9nU3RhcnRWYWx1ZVxuXG5cdFx0XHRcdCMgQW5pbWF0aW5nIHRoZSBwcm9ncmVzc1xuXHRcdFx0XHRAcHJvZ3Jlc3NfZnJhbWUuYW5pbWF0ZVxuXHRcdFx0XHRcdHdpZHRoOiAodmFsdWUgKiBAY2FyZF9mcmFtZS53aWR0aCkvMTAwICMgY2FsY3VsYXRpbmcgcGVyY2VudGFnZSBvZlxuXHRcdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDAuNSlcblx0XHRcdFx0XHRcdHRpbWU6IDAuNVxuXHRcdFx0XHRcdFx0ZGVsYXk6IDAuNFxuXG5cdCMgU2xpZGVyIGRhdGEgZnJvbSB0aGUgQXJyYXlcblx0QGRlZmluZSAnc2xpZGVyQXJyYXknLCBcblx0XHRnZXQ6IC0+IEBvcHQuc2xpZGVyQXJyYXksXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0aWYgQG9wdC5zbGlkZXJBcnJheSBpc250IHVuZGVmaW5lZFxuXHRcdFx0XHRAb3B0LnNsaWRlckFycmF5ID0gdmFsdWVcblxuXHRcdFx0XHRAcHJvZ1ZhbHVlcyA9IFtdICNzdG9yYWdlIGZvciB2YWx1ZXMgXG5cdFx0XHRcdEBwcm9nU3RhcnRWYWx1ZXMgPSBbXVxuXG5cdFx0XHRcdGZvciBpIGluIFswLi4udmFsdWUubGVuZ3RoXSAjIHJ1biBsb29wIGFzIG1hbnkgdGltZXMgYXMgdGhlcmUgYXJlIGVudGlyZXNcblx0XHRcdFx0XHR1bml0ID0gQHNsaWRlc1tpXSAjIHNlbGVjdFxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHVuaXQuc2VsZWN0Q2hpbGQoXCJ0aXRsZVwiKS50ZXh0ID0gdmFsdWVbaV0udGl0bGVcblx0XHRcdFx0XHR1bml0LnNlbGVjdENoaWxkKFwic3ViX3RpdGxlXCIpLnRleHQgPSB2YWx1ZVtpXS5zdWJUaXRsZVxuXHRcdFx0XHRcdHVuaXQuc2VsZWN0Q2hpbGQoXCJpbWFnZVwiKS5pbWFnZSA9IHZhbHVlW2ldLmltYWdlXG5cdFx0XHRcdFx0dW5pdC5zZWxlY3RDaGlsZChcImltYWdlXCIpLnN0eWxlID0gXCJtaXgtYmxlbmQtbW9kZVwiOiBcIm11bHRpcGx5XCJcblxuXHRcdFx0XHRcdCMgQWRkIHRoZSBjYXJkIHRvIFBhZ2UgQ29tcG9uZW50XG5cdFx0XHRcdFx0QHByb2dWYWx1ZXMucHVzaCh2YWx1ZVtpXS5wcm9ncmVzcykgIyBzdG9yZVxuXHRcdFx0XHRcdGlmIHZhbHVlW2ldLnByb2dTdGFydCBpcyB1bmRlZmluZWQgdGhlbiB2YWx1ZVtpXS5wcm9nU3RhcnQgPSAwXG5cdFx0XHRcdFx0QHByb2dTdGFydFZhbHVlcy5wdXNoKHZhbHVlW2ldLnByb2dTdGFydCkgIyBzdG9yZVxuIiwiIyBkYXRhIGFycmF5XG5cbmV4cG9ydHMudXNlckNhbWVvTmV3ID0gW1xuXHR7XG5cdFx0dHlwZTogXCJIZXJvVW5pdFwiLFxuXHRcdHRpdGxlOiBcIkJlbGxhIHdlYXJzIHZpbnRhZ2VcIlxuXHRcdHN1YlRpdGxlOiBcIlNob3Agbm93XCJcblx0XHRjb3ZlcjogXCJpbWFnZXMvdjIvY292ZXItMDBhLmpwZ1wiXG5cdH1cbl0iLCJ7Z2VuZXJhdGVEb3RzfSA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlci1mdW5jdGlvbnMvcHJpdmF0ZS9nZW5lcmF0ZURvdHMuY29mZmVlJylcbntwYXJhbGF4T25TY3JvbGx9ID0gcmVxdWlyZSgnLi4vLi4vaGVscGVyLWZ1bmN0aW9ucy9wcml2YXRlL3BhcmFsYXhPblNjcm9sbC5jb2ZmZWUnKVxuXG5jbGFzcyB3aW5kb3cuSGVyb1VuaXQgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHQjIyMjIyMjIyMjIyMjIyMgU0lOR0xFIFVOSVQgIyMjIyMjIyMjIyMjIyMjXG5cdFx0aWYgQG9wdC5zbGlkZXJBcnJheSBpcyB1bmRlZmluZWRcblx0XHRcdCMgQ2xvbmluZyBsYXllcnMgZnJvbSAnRGVzaWduIG1vZGUnXG5cdFx0XHRAdW5pdCA9IGhlcm9fdW5pdC5jb3B5KClcblx0XHRcdEB1bml0LnByb3BzID0gIyBjbG9uZWQgdW5pdCBzZXR0aW5nc1xuXHRcdFx0XHR4OjAsIHk6MFxuXG5cdFx0IyMjIyMjIyMjIyMjIyMjIFNMSURFUiBVTklUICMjIyMjIyMjIyMjIyMjI1xuXHRcdGVsc2Vcblx0XHRcdCMgU2xpZGVyXG5cdFx0XHRAdW5pdCA9IG5ldyBQYWdlQ29tcG9uZW50XG5cdFx0XHRcdHdpZHRoOiBoZXJvX3VuaXQud2lkdGgsIGhlaWdodDogaGVyb191bml0LmhlaWdodFxuXHRcdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2Vcblx0XHRcdFx0b3JpZ2luWCA6IDAuNVxuXHRcdFx0XHRkaXJlY3Rpb25Mb2NrOiB0cnVlICMgYXZvaWRzIHN3aXBlIHdoZW5cblx0XHRcdFxuXHRcdFx0QHNsaWRlcyA9IFtdICAjIHN0b3JhZ2VcblxuXHRcdFx0Zm9yIGkgaW4gWzAuLi5Ab3B0LnNsaWRlckFycmF5Lmxlbmd0aF1cblx0XHRcdFx0IyBDbG9uaW5nIFByb2R1Y3QgQ2FyZCBmcm9tICdEZXNpZ24gbW9kZSdcblx0XHRcdFx0QHNsaWRlID0gaGVyb191bml0LmNvcHkoKVxuXHRcdFx0XHRcblx0XHRcdFx0IyBBZGQgdGhlIGNhcmQgdG8gUGFnZSBDb21wb25lbnRcblx0XHRcdFx0QHVuaXQuYWRkUGFnZShAc2xpZGUpXG5cdFx0XHRcdEBzbGlkZXMucHVzaChAc2xpZGUpICMgc3RvcmVcblx0XHRcdFxuXHRcdFx0IyBHZW5lcmF0aW5nIFNsaWRlciBEb3RzXG5cdFx0XHRnZW5lcmF0ZURvdHMoQHVuaXQsIEBvcHQuc2xpZGVyQXJyYXkpXG5cblxuXHRcdCMgSW5pdGlhbGlzZSB0aGUgVW5pdFxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHBhcmFsYXg6IHRydWVcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblx0XHRcdFx0XHRcdFx0XG5cdFx0QHVuaXQucGFyZW50ID0gQFxuXHRcdEBoZWlnaHQgPSBoZXJvX3VuaXQuaGVpZ2h0XG5cdFx0QHdpZHRoID0gaGVyb191bml0LndpZHRoXG5cblx0XHQjIEVuYWJsZSBwYXJhbGF4XG5cdFx0aWYgQG9wdC5wYXJhbGF4IGlzIHRydWUgYW5kIEBvcHQuc2xpZGVyQXJyYXkgaXMgdW5kZWZpbmVkXG5cdFx0XHRwYXJhbGF4T25TY3JvbGwoQClcblxuXHRcdGlmIEBvcHQucGFyYWxheCBpcyB0cnVlIGFuZCBAb3B0LnNsaWRlckFycmF5IGlzbnQgdW5kZWZpbmVkXHRcblx0XHRcdGZvciBjaGlsZCBpbiBAc2xpZGVzXG5cdFx0XHRcdHBhcmFsYXhPblNjcm9sbChjaGlsZClcblxuXHQjIyMjIyMjIyMjIyMjIyMgREVGSU5FIFBST1BFUlRJRVMgIyMjIyMjIyMjIyMjIyMjXG5cdEBkZWZpbmUgJ3RpdGxlJywgXG5cdFx0Z2V0OiAtPiBAb3B0LnRpdGxlLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdGlmIEBvcHQuc2xpZGVyQXJyYXkgaXMgdW5kZWZpbmVkXG5cdFx0XHRcdEB1bml0LnNlbGVjdENoaWxkKFwidGl0bGVcIikudGV4dCA9IHZhbHVlICMgdXBkYXRlIHRoZSB2YWx1ZVxuXHRcdFx0XHRAdW5pdC5zZWxlY3RDaGlsZCgndGl0bGUnKS5hdXRvSGVpZ2h0ID0gdHJ1ZSAjIHBvc2l0aW9uaW5nIFxuXHRcdFxuXHRAZGVmaW5lICdzdWJUaXRsZScsIFxuXHRcdGdldDogLT4gQG9wdC5zdWJUaXRsZSxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRpZiBAb3B0LnNsaWRlckFycmF5IGlzIHVuZGVmaW5lZFxuXHRcdFx0XHRAdW5pdC5zZWxlY3RDaGlsZChcInN1Yl90aXRsZVwiKS50ZXh0ID0gdmFsdWUgIyB1cGRhdGUgdGhlIHZhbHVlXG5cdFx0XHRcdEB1bml0LnNlbGVjdENoaWxkKCdzdWJfdGl0bGUnKS55ID0gQHVuaXQuc2VsZWN0Q2hpbGQoJ3RpdGxlJykubWF4WVxuXHRcdFx0XG5cdEBkZWZpbmUgJ2NvdmVyJywgXG5cdFx0Z2V0OiAtPiBAb3B0LmNvdmVyLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdGlmIEBvcHQuc2xpZGVyQXJyYXkgaXMgdW5kZWZpbmVkXG5cdFx0XHRcdCMgQHVuaXQuc2VsZWN0Q2hpbGQoXCJpbWFnZVwiKS5pbWFnZSA9IFwibW9kdWxlcy9GRktpdC91bml0cy9IZXJvVW5pdC9pbWFnZXMvI3t2YWx1ZX1cIiAjIHVwZGF0ZSB0aGUgdmFsdWVcblx0XHRcdFx0QHVuaXQuc2VsZWN0Q2hpbGQoXCJpbWFnZVwiKS5pbWFnZSA9IHZhbHVlICMgdXBkYXRlIHRoZSB2YWx1ZVx0XHRcdFx0XG5cdFxuXHQjIFNsaWRlciBkYXRhIGZyb20gdGhlIEFycmF5XG5cdEBkZWZpbmUgJ3NsaWRlckFycmF5JywgXG5cdFx0Z2V0OiAtPiBAb3B0LnNsaWRlckFycmF5LFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdGZvciBpIGluIFswLi4udmFsdWUubGVuZ3RoXSAjIHJ1biBsb29wIGFzIG1hbnkgdGltZXMgYXMgdGhlcmUgYXJlIGVudGlyZXNcblx0XHRcdFx0XG5cdFx0XHRcdHVuaXQgPSBAc2xpZGVzW2ldICMgc2VsZWN0XG5cdFx0XHRcdFxuXHRcdFx0XHR1bml0LnNlbGVjdENoaWxkKFwidGl0bGVcIikudGV4dCA9IHZhbHVlW2ldLnRpdGxlXG5cdFx0XHRcdHVuaXQuc2VsZWN0Q2hpbGQoXCJzdWJfdGl0bGVcIikudGV4dCA9IHZhbHVlW2ldLnN1YlRpdGxlXG5cdFx0XHRcdCMgdW5pdC5zZWxlY3RDaGlsZChcImltYWdlXCIpLmltYWdlID0gXCJtb2R1bGVzL0ZGS2l0L3VuaXRzL0hlcm9Vbml0L2ltYWdlcy8je3ZhbHVlW2lpXS5jb3Zlcn1cIlxuXHRcdFx0XHR1bml0LnNlbGVjdENoaWxkKFwiaW1hZ2VcIikuaW1hZ2UgPSB2YWx1ZVtpXS5jb3ZlclxuXG5cblx0XHRcdFx0IyBMaW5lIGJyYWtlIGZpeCBmb3IgVGV4dExheWVyc1xuXHRcdFx0XHR1bml0LnNlbGVjdENoaWxkKCd0aXRsZScpLmF1dG9IZWlnaHQgPSB0cnVlXG5cdFx0XHRcdHVuaXQuc2VsZWN0Q2hpbGQoJ3N1Yl90aXRsZScpLnkgPSB1bml0LnNlbGVjdENoaWxkKCd0aXRsZScpLm1heFlcblx0XHRcdFx0IiwiY2xhc3Mgd2luZG93LkdlbmRlclN3aXRjaCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdCMgTWFpbiBmcmFtZSBmcm9tIERlc2lnbiBtb2RlXG5cdFx0Y21wX2ZyYW1lID0gZ2VuZGVyX3N3aXRjaFxuXG5cdFx0IyBDVEFcblx0XHRAY3RhID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiY3RhXCIpLmNvcHkoKVxuXHRcdFxuXHRcdCMgR3JhZGllbnRcblx0XHRAZ3JhZGllbnRfID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwic2hhcGVcIikuY29weSgpXG5cdFx0XG5cdFx0IyBCYW5uZXJcblx0XHRAYmFubmVyXyA9IGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcImJhbm5lclwiKS5jb3B5KClcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHNpemU6IGNtcF9mcmFtZS5zaXplXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNtcF9mcmFtZS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXHRcdEBiYW5uZXJfLnBhcmVudCA9IEBcblx0XHRAZ3JhZGllbnRfLnBhcmVudCA9IEBcblx0XHRAY3RhLnBhcmVudCA9IEBcblxuXG5cblx0QGRlZmluZSBcInRleHRcIixcblx0XHRnZXQ6IC0+IEBvcHQudGV4dFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdC50ZXh0ID0gdmFsdWVcblx0XHRcdEBjdGEuc2VsZWN0Q2hpbGQoXCJidXR0b25fdGV4dFwiKS50ZXh0ID0gdmFsdWVcblxuXHRAZGVmaW5lIFwidHlwZVwiLFxuXHRcdGdldDogLT4gQG9wdC50eXBlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0LnR5cGUgPSB2YWx1ZVxuXHRcdFx0aWYgQG9wdC50eXBlIGlzIFwid29tZW5cIlxuXHRcdFx0XHRAYmFubmVyXy5pbWFnZSA9ICQrXCJkZWZhdWx0L2dlbmRlclN3aXRjaC0wMC5qcGdcIlxuXHRcdFx0XG5cdFx0XHRpZiBAb3B0LnR5cGUgaXMgXCJtZW5cIlxuXHRcdFx0XHRAYmFubmVyXy5pbWFnZSA9ICQrXCJkZWZhdWx0L2dlbmRlclN3aXRjaC0wMS5qcGdcIlxuXG5cdEBkZWZpbmUgXCJiYW5uZXJcIixcblx0XHRnZXQ6IC0+IEBvcHQuYmFubmVyXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0LmJhbm5lciA9IHZhbHVlXG5cdFx0XHRAYmFubmVyXy5pbWFnZSA9IHZhbHVlXG5cblx0QGRlZmluZSBcImdyYWRpZW50XCIsXG5cdFx0Z2V0OiAtPiBAb3B0LmdyYWRpZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0LmdyYWRpZW50ID0gdmFsdWVcblx0XHRcdGlmIEBvcHQuZ3JhZGllbnQgaXMgeWVzXG5cdFx0XHRcdEBncmFkaWVudF8udmlzaWJsZSA9IHRydWVcblx0XHRcdFxuXHRcdFx0aWYgQG9wdC5ncmFkaWVudCBpcyBub1xuXHRcdFx0XHRAZ3JhZGllbnRfLnZpc2libGUgPSBmYWxzZSIsImNsYXNzIHdpbmRvdy5GZWF0dXJlVW5pdCBleHRlbmRzIExheWVyXG5cdCMgRnJhbWUgZnJvbSBEZXNpZ24gTW9kZVxuXHRmcmFtZSA9IGZlYXR1cmVfdW5pdFxuXHRjdGFGcmFtZSA9IGZyYW1lLnNlbGVjdENoaWxkKFwiY3RhXCIpXG5cdHRpdGxlVGV4dCA9IGZyYW1lLnNlbGVjdENoaWxkKFwidGl0bGVcIilcblx0ZGVzY3JpcHRpb25UZXh0ID0gZnJhbWUuc2VsZWN0Q2hpbGQoXCJkZXNjcmlwdGlvblwiKVxuXHRjdGFCdXR0b24gPSBmcmFtZS5zZWxlY3RDaGlsZChcImN0YVwiKVxuXHQjIFNwYWNlc1xuXHR0aXRsZURlc2NyaXB0aW9uU3Bhc2UgPSBkZXNjcmlwdGlvblRleHQueSAtIHRpdGxlVGV4dC5tYXhZXG5cdGRlc2NyaXB0aW9uQnV0dG9uU3Bhc2UgPSBjdGFCdXR0b24ueSAtIGRlc2NyaXB0aW9uVGV4dC5tYXhZXG5cdEJ1dHRvbkZyYW1lU3Bhc2UgPSBmcmFtZS5oZWlnaHQgLSBjdGFCdXR0b24ubWF4WVxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdG9wdCA9IF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHdpZHRoOiBmcmFtZS53aWR0aFxuXHRcdFx0aGVpZ2h0OiBmcmFtZS5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZnJhbWUuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRjb3ZlcjogZnJhbWUuc2VsZWN0Q2hpbGQoXCJpbWFnZVwiKS5pbWFnZVxuXHRcdFx0dGl0bGU6IHRpdGxlVGV4dC50ZXh0XG5cdFx0XHRkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25UZXh0LnRleHRcblx0XHRcdCMgYm9yZGVyV2lkdGg6IDEgIyBEZWJ1ZyBmcmFtZSBzaXplXG5cdFx0XHRub3BhZGRpbmc6IGZhbHNlXG5cdFx0c3VwZXIgb3B0XG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBALCBAb3B0LnkpXG5cblx0XHQjIENvdmVyIGltYWdlXG5cdFx0QHByb2RCYWNrZ3JvdWQgPSBmcmFtZS5zZWxlY3RDaGlsZChcInByb2RfYmFja2dyb3VuZFwiKS5jb3B5KClcblx0XHRAcHJvZEJhY2tncm91ZC5wcm9wcyA9XG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdEBwcm9kQmFja2dyb3VkLnNlbGVjdENoaWxkKFwiaW1hZ2VcIikucHJvcHMgPVxuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdFwibWl4LWJsZW5kLW1vZGVcIjogXCJtdWx0aXBseVwiXG5cdFx0XHRpbWFnZTogQG9wdC5jb3ZlclxuXG5cdFx0IyBUZXh0XG5cdFx0QHRpdGxlVGV4dCA9IHRpdGxlVGV4dC5jb3B5KClcblx0XHRAdGl0bGVUZXh0LnByb3BzID1cblx0XHRcdHBhcmVudDogQFxuXHRcdFx0Zm9udEZhbWlseTogXCJQb2xhcmlzXCJcblx0XHRcdGZvbnRXZWlnaHQ6IDgwMFxuXHRcdFx0dGV4dDogQG9wdC50aXRsZVxuXHRcdFx0ZnJhbWU6IHRpdGxlVGV4dC5mcmFtZVxuXG5cdFx0QGRlc2NyaXB0aW9uVGV4dCA9IGRlc2NyaXB0aW9uVGV4dC5jb3B5KClcblx0XHRAZGVzY3JpcHRpb25UZXh0LnByb3BzID1cblx0XHRcdHBhcmVudDogQFxuXHRcdFx0Zm9udEZhbWlseTogXCJQb2xhcmlzXCJcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0dGV4dDogQG9wdC5kZXNjcmlwdGlvblxuXHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXHRcdFx0eTogQHRpdGxlVGV4dC5tYXhZICsgdGl0bGVEZXNjcmlwdGlvblNwYXNlXG5cblxuXHRcdCMgQ3JlYXRlIENUQVxuXHRcdEBzaG9wTm93QnRuID0gbmV3IEJ1dHRvblxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRmcmFtZTogY3RhQnV0dG9uLmZyYW1lXG5cdFx0XHR4OiBjdGFCdXR0b24ueCwgeTogQGRlc2NyaXB0aW9uVGV4dC5tYXhZICsgZGVzY3JpcHRpb25CdXR0b25TcGFzZVxuXHRcdFx0dGV4dDogY3RhQnV0dG9uLnNlbGVjdENoaWxkKFwiYnV0dG9uX3RleHRcIikudGV4dFxuXG5cdFx0IyBVcGRhdGUgc2l6ZVxuXHRcdHN3aXRjaCBAb3B0LmRlc2NyaXB0aW9uXG5cdFx0XHR3aGVuIG51bGwsIFwibm9uZVwiLCBcIlwiXG5cdFx0XHRcdEBkZXNjcmlwdGlvblRleHQuZGVzdHJveSgpXG5cdFx0XHRcdEBzaG9wTm93QnRuLnkgPSBAdGl0bGVUZXh0Lm1heFkgKyBkZXNjcmlwdGlvbkJ1dHRvblNwYXNlXG5cdFx0XHRcdEBoZWlnaHQgPSBAc2hvcE5vd0J0bi5tYXhZICsgQnV0dG9uRnJhbWVTcGFzZVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAaGVpZ2h0ID0gQHNob3BOb3dCdG4ubWF4WSArIEJ1dHRvbkZyYW1lU3Bhc2VcblxuXHRcdGlmIEBvcHQubm9wYWRkaW5nIHRoZW4gcmVzaXplSW1hZ2UoQHByb2RCYWNrZ3JvdWQpXG5cblx0cmVzaXplSW1hZ2UgPSAobGF5ZXIpIC0+XG5cdFx0bGF5ZXIuc2VsZWN0Q2hpbGQoXCJpbWFnZVwiKS5oZWlnaHQgPSBsYXllci5oZWlnaHRcblx0XHRsYXllci5zZWxlY3RDaGlsZChcImltYWdlXCIpLndpZHRoID0gbGF5ZXIud2lkdGhcblx0XHRsYXllci5zZWxlY3RDaGlsZChcImltYWdlXCIpLm1pZFggPSBsYXllci53aWR0aCAvIDIgIyBjZW50ZXJpbmdcblx0XHRsYXllci5zZWxlY3RDaGlsZChcImltYWdlXCIpLnkgPSAwXG5cblx0IyMjIyMjIyMjIyMjIyMjIPCfkr4gR0VUVElORyBBTkQgU0VUVElORyBDTEFTUyBEQVRBICMjIyMjIyMjIyMjIyMjI1xuXHRAZGVmaW5lICdjb3ZlcicsIFxuXHRcdGdldDogLT4gQG9wdC5jb3ZlclxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0aWYgISFAY2hpbGRyZW4ubGVuZ3RoXG5cdFx0XHRcdEBzZWxlY3RDaGlsZChcImltYWdlXCIpLmltYWdlID0gdmFsdWVcblxuXHRAZGVmaW5lICd0aXRsZScsIFxuXHRcdGdldDogLT4gQG9wdC50aXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0aWYgISFAY2hpbGRyZW4ubGVuZ3RoXG5cdFx0XHRcdEB0aXRsZVRleHQudGV4dCA9IHZhbHVlXG5cblx0QGRlZmluZSAnZGVzY3JpcHRpb24nLCBcblx0XHRnZXQ6IC0+IEBvcHQuZGVzY3JpcHRpb25cblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdGlmICEhQGNoaWxkcmVuLmxlbmd0aFxuXHRcdFx0XHRAZGVzY3JpcHRpb25UZXh0LnRleHQgPSB2YWx1ZVxuXHRcdFx0XHRAc2hvcE5vd0J0bi55ID0gQGRlc2NyaXB0aW9uVGV4dC5tYXhZICsgZGVzY3JpcHRpb25CdXR0b25TcGFzZVxuXHRcdFx0XHRAaGVpZ2h0ID0gQHNob3BOb3dCdG4ubWF4WSArIEJ1dHRvbkZyYW1lU3Bhc2VcblxuXHRAZGVmaW5lICdub3BhZGRpbmcnLCBcblx0XHRnZXQ6IC0+IEBvcHQubm9wYWRkaW5nXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0aWYgISFAY2hpbGRyZW4ubGVuZ3RoIGFuZCB2YWx1ZVxuXHRcdFx0XHRyZXNpemVJbWFnZShAcHJvZEJhY2tncm91ZCkiLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbndpc2hsaXN0VW5pdCA9IG5ldyBXaXNobGlzdFVuaXRcblx0YXJyYXk6IFtcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIk5ldyBTZWFzb25cIixcblx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcInN3aW5nIGRlbmltIGphY2tldFwiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzAxLmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkJBTEVOQ0lBR0FcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozEsMjU5XCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiTmV3IFNlYXNvblwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwiR3VjY2kgbG9nbyBULXNoaXJ0IHdpdGggc2hvb3Rpbmcgc3RhcnNcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wMi5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJHVUNDSVwiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjMSw1MDBcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJzZWFzb25cIjogXCJcIixcblx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcInNsZWV2ZWxlc3MgVi1uZWNrIHN0YW1wIHByaW50IGRyZXNzXCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDMuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiR1VDQ1BFVEVSIFBJTE9UVE9JXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqM3MzlcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJzZWFzb25cIjogXCJOZXcgU2Vhc29uXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJmcmluZ2VkIG5ldHRlZCBtaWRpIGRyZXNzXCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDUuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiQ0FMVklOIEtMRUlOIDIwNVczOU5ZQ1wiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjMSw1NzVcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJzZWFzb25cIjogXCJcIixcblx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcIk5ldyBTd2luZyBzaGlydFwiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzA2LmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkJBTEVOQ0lBR0FcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozEsMDUwXCJcblx0XHR9XG5cdF1cblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cbiMgUmVjb21lbmRlZCBMaXN0XG5zY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdHNpemU6IFNjcmVlbi5zaXplXG5cdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdGNvbnRlbnRJbnNldDogXG5cdFx0Ym90dG9tOiBNX3NwYWNlclxuXG5yZWNvbWVuZGVkTGlzdCA9IG5ldyBSZWNvbW1lbmRlZExpc3RVbml0XG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblx0aWNvbjogdHJ1ZVxuXHRib3JkZXI6IHRydWVcblx0ZGVzY3JpcHRpb246IHRydWVcblxuc2Nyb2xsLnVwZGF0ZUNvbnRlbnQoKSAjIFVwZGF0ZSBzY3JvbGxcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cbiMgQ3JlYXRlIHByb2R1Y3QgdW5pdFxucHJvZHVjdFVuaXQgPSBuZXcgUHJvZHVjdFVuaXRcbiAgICB0aXRsZTogXCJIZWxsbyBXb3JrZFwiXG4gICAgZGVzY3JpcHRpb246IFwiU2VsZWN0aW9uIG9mIG5ldyBpdGVtcyBoYXMganVzdCBhcnJpdmVkIHRvIG91ciBib3V0aXF1ZXMuXCJcbiAgICBwcm9kdWN0c0FycmF5OiBbXG4gICAgICAgIHsgIyBQcm9kdWN0IDEgXG4gICAgICAgIFwic2hvcnREZXNjcmlwdGlvblwiOiBcInllbGxvdyB6ZWJyYSBiYWcgXCJcbiAgICAgICAgXCJpbWFnZXNcIjogW1widXJsXCI6ICQrXCJkZWZhdWx0L3Byb2R1Y3RzLzAxLmpwZ1wiXVxuICAgICAgICBcImJyYW5kXCI6IHtcIm5hbWVcIjogXCJQcmFkYVwifSxcbiAgICAgICAgXCJwcmljZVwiOiAxMzUuMFxuICAgICAgICB9XG4gICAgXVxuXHRcblx0XCJcIlwiIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIENyZWF0ZSBwcm9kdWN0IHVuaXRcbnByb2R1Y3RVbml0ID0gbmV3IFByb2R1Y3RVbml0XG5cdHRpdGxlOiBcIkhlbGxvIFdvcmxkXCJcblx0ZGVzY3JpcHRpb246IFwiU2VsZWN0aW9uIG9mIG5ldyBpdGVtcyBoYXMganVzdCBhcnJpdmVkIHRvIG91ciBib3V0aXF1ZXMuXCJcblx0cHJvZHVjdHNBcnJheTogSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgJCtcImRlZmF1bHQvcHJvZHVjdHMuanNvblwiXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbiMgRGF0YSBhcnJheVxuYXJyYXkgPSBcbltcblx0e1xuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiLCBcblx0ZGVzY3JpcHRpb246IFwiUGxlYXNlIHNlZSBvdXIgcmVjY29tZW5kYXRpb25zLCBiYXNlZCBvbiBkZXNpZ25lcnMgeW91IGxvdmUuXCIsIFxuXHRwcm9kdWN0c0FycmF5OiBbXG5cdFx0XHR7ICMgUHJvZHVjdCAxXG5cdFx0XHRcdFwiYnJhbmRcIjogeyBcIm5hbWVcIjogXCJHVUNDSVwiIH0sIFxuXHRcdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJUaWdlciBlbWJyb2lkZWQgaG9vZGVkIHN3ZWF0c2hpcnRcIiwgXG5cdFx0XHRcdFwicHJpY2VcIjogXCLCozI0MjBcIiwgXG5cdFx0XHRcdFwiaW1hZ2VzXCI6IFt7IFwiaXNMb2NhbFwiOiB0cnVlLCBcInVybFwiOiAkK1wiZGVmYXVsdC9wcm9kdWN0cy8wMS5qcGdcIn1dXG5cdFx0XHR9IFxuXHRdfVxuXVxuXG4jIENyZWF0ZSBwcm9kdWN0IHVuaXRcbnVuaXQgPSBuZXcgUHJvZHVjdFVuaXRcblx0dGl0bGU6IGFycmF5WzBdLnRpdGxlXG5cdGRlc2NyaXB0aW9uOiBhcnJheVswXS5kZXNjcmlwdGlvblxuXHRwcm9kdWN0c0FycmF5OiBhcnJheVswXS5wcm9kdWN0c0FycmF5XG5cblx0XCJcIlwiIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIENyZWF0ZSBwcm9kdWN0IHNldFxucHJvZHVjdFNldCA9IG5ldyBQcm9kdWN0U2V0XG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblx0dGl0bGU6IFwiSGVsbG8gV29ybGRcIlxuXHRzdWJUaXRsZTogXCJTaG9wIE5vd1wiXG5cdGNvdmVyOiAkK1wiZGVmYXVsdC9oZXJvLTAxLmpwZ1wiLCBcblx0cHJvZHVjdHNBcnJheTogSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgJCtcImRlZmF1bHQvcHJvZHVjdHMuanNvblwiXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG4jIENyZWF0ZSBkZWZhdWx0IFNjcm9sbENvbXBvbmVudFxuc2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcbiMgQ3JlYXRlIFByb2R1Y3QgTGlzdGluZyBVbml0XG5saXN0VW5pdCA9IG5ldyBQcm9kdWN0TGlzdGluZ1VuaXRcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHRhcnJheTogW1xuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiTmV3IFNlYXNvblwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwic3dpbmcgZGVuaW0gamFja2V0XCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDEuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiQkFMRU5DSUFHQVwiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjMSwyNTlcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJzZWFzb25cIjogXCJOZXcgU2Vhc29uXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJHdWNjaSBsb2dvIFQtc2hpcnQgd2l0aCBzaG9vdGluZyBzdGFyc1wiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzAyLmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkdVQ0NJXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqMxLDUwMFwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIlwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwic2xlZXZlbGVzcyBWLW5lY2sgc3RhbXAgcHJpbnQgZHJlc3NcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wMy5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJHVUNDUEVURVIgUElMT1RUT0lcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozczOVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIk5ldyBTZWFzb25cIixcblx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcImZyaW5nZWQgbmV0dGVkIG1pZGkgZHJlc3NcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wNS5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJDQUxWSU4gS0xFSU4gMjA1VzM5TllDXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqMxLDU3NVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIlwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwiTmV3IFN3aW5nIHNoaXJ0XCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDYuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiQkFMRU5DSUFHQVwiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjMSwwNTBcIlxuXHRcdH1cblx0XVxuXG4jIFVwZGF0ZSBzY3JvbGxcbnNjcm9sbC51cGRhdGVDb250ZW50KClcblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG4jIENyZWF0aW5nIHByb2R1Y3QgaGVyb1xucHJvZHVjdEhlcm8gPSBuZXcgUHJvZHVjdEhlcm9cblx0dGl0bGU6IFwiSGVsbG8gV29ybGRcIlxuXHRzdWJUaXRsZTogXCJQbGVhc2Ugc2VlIG91ciByZWNjb21lbmRhdGlvbnMsIGJhc2VkIG9uIGRlc2lnbmVycyB5b3UgbG92ZS5cIlxuXHRkZXNjcmlwdGlvbjogXCJUaGVyZSB3YXMgYSBzaGlmdCBpbiBzcG9ydHN3ZWFyIHRoaXMgc2Vhc29uLiBTdXJlLCBleHBlY3RlZCBpbmplY3Rpb25zIG9mIG5pbmV0aWVzIHlvdXRoIGN1bHR1cmUgY291cnRlc3kgb2YgR29zaGEgYW5kIHRoZSBnYW5nIHdlcmUgc3RpbGwgcHJlc2VudCwgYnV0IHRoZSBnZW5lcmFsIG1vb2QgcGxheWVkIHRvIHRoZSBtb3JlIGRpc3RhbnQgcGFzdCBvZiBzZXZlbnRpZXMgYW5kIGVpZ2h0aWVzIGF0aGxldGljIHdlYXIuXCJcblx0Y292ZXI6ICQrXCJkZWZhdWx0L3Byb2R1Y3QtaGVyby0wMS5qcGdcIlxuXHRwcm9kdWN0c0FycmF5OiBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyAkK1wiZGVmYXVsdC9wcm9kdWN0cy5qc29uXCJcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cbiMgUERQIEhlcm9cbm15QXJyYXkgPSBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyBcIm1vZHVsZXMvRkZLaXQvdW5pdHMvUERQSGVyb1VuaXQvZGF0YS9wcm9kdWN0SW1hZ2VzLmpzb25cIlxuXG5wZHBIZXJvVW5pdCA9IG5ldyBQRFBIZXJvVW5pdFxuICAgIHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcbiAgICBhcnJheTogbXlBcnJheVxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIE9yZGVyIHRyYWtlciB1bml0XG5vcmRlcl90cmFrZXIgPSBuZXcgT3JkZXJUcmFrZXJcblx0dGl0bGU6IFwiV2UndmUgc2hpcHBlZCB5b3VyIG9yZGVyXCJcblx0c3ViVGl0bGU6IFwiRXhwZWN0ZWQ6IDbigInigJPigIk4IEp1bFwiXG5cdGltYWdlOiAkK1wiZGVmYXVsdC9wcm9kdWN0LTAxLmpwZ1wiXG5cdHByb2dyZXNzOiA1MFxuXHRwcm9nU3RhcnQ6IDI1XG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbiMgT3JkZXIgdHJha2VyIHNsaWRlclxub3JkZXJfdHJha2VyX3NsaWRlciA9IG5ldyBPcmRlclRyYWtlclxuXHRzbGlkZXJBcnJheTogW1xuXHRcdHt0aXRsZSA6IFwiVGl0bGUgMVwiICwgc3ViVGl0bGU6IFwiZGF0ZTFcIiwgaW1hZ2U6ICQrXCJkZWZhdWx0L3Byb2R1Y3QtMDEuanBnXCIsIHByb2dyZXNzOiA3NSx9XG5cdFx0e3RpdGxlIDogXCJUaXRsZSAyXCIgLCBzdWJUaXRsZTogXCJkYXRlMlwiLCBpbWFnZTogJCtcImRlZmF1bHQvaGVyby0wMS5qcGdcIiwgcHJvZ3Jlc3M6IDUwLCBwcm9nU3RhcnQ6MjV9XG5cdFx0e3RpdGxlIDogXCJUaXRsZSAyXCIgLCBzdWJUaXRsZTogXCJkYXRlM1wiLCBpbWFnZTogJCtcImRlZmF1bHQvaGVyby0wMS5qcGdcIiwgcHJvZ3Jlc3M6IDc1LH1cblx0XHR7dGl0bGUgOiBcIlRpdGxlIDJcIiAsIHN1YlRpdGxlOiBcImRhdGU0XCIsIGltYWdlOiAkK1wiZGVmYXVsdC9oZXJvLTAxLmpwZ1wiLCBwcm9ncmVzczogMTAwLCBwcm9nU3RhcnQ6NTB9XG5cdF1cblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyBDcmVhdGUgaGVybyB1bml0XG5oZXJvVW5pdCA9IG5ldyBIZXJvVW5pdFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIlNob3Agbm93XCJcblx0Y292ZXI6ICQrXCJkZWZhdWx0L2hlcm8tMDEuanBnXCJcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyBDcmVhdGUgSGVybyB1bml0IHdpdGggbXVsdGlwbGUgc2xpZGVzXG5oZXJvU2xpZGVyID0gbmV3IEhlcm9Vbml0XG5cdHNsaWRlckFycmF5OiBbXG5cdFx0e3RpdGxlIDogXCJUaXRsZSAxXCIgLCBzdWJUaXRsZTogXCJTaG9wIE5vd1wiLCBjb3ZlcjogJCtcImRlZmF1bHQvaGVyby0wMC5qcGdcIn1cblx0XHR7dGl0bGUgOiBcIlRpdGxlIDJcIiAsIHN1YlRpdGxlOiBcIlNob3AgTm93XCIsIGNvdmVyOiAkK1wiZGVmYXVsdC9oZXJvLTAxLmpwZ1wifVxuXHRdXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbiMgQ3JlYXRlIGdlbmRlciBzd2l0Y2ggYmFubmVyXG5nZW5kZXJTd2l0Y2ggPSBuZXcgR2VuZGVyU3dpdGNoXG5cdHRleHQ6IFwiU2hvcCBNZW5cIlxuXHR0eXBlOiBcIm1lblwiXG5cdGdyYWRpZW50OiB5ZXNcbiMgXHRiYW5uZXI6ICQrXCJkZWZhdWx0L2ZlYXR1cmUtMDAuanBnXCJcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyBDcmVhdGUgZmVhdHVyZSB1bml0XG5mZWF0dXJlVW5pdCA9IG5ldyBGZWF0dXJlVW5pdFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIlNob3Agbm93XCJcblx0ZGVzY3JpcHRpb246IFwiU2VsZWN0aW9uIG9mIG5ldyBpdGVtcyBoYXMganVzdCBhcnJpdmVkIHRvIG91ciBib3V0aXF1ZXMuXCJcblx0Y292ZXI6ICQrXCJkZWZhdWx0L2ZlYXR1cmUtMDEuanBnXCJcblx0bm9wYWRkaW5nOiB5ZXNcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyBDcmVhdGUgZmVhdHVyZSB1bml0IHdpdGggcHJvZHVjdCBpbWFnZVxuZmVhdHVyZVVuaXQgPSBuZXcgRmVhdHVyZVVuaXRcblx0dGl0bGU6IFwiSGVsbG8gV29ybGRcIlxuXHRzdWJUaXRsZTogXCJTaG9wIG5vd1wiXG5cdGRlc2NyaXB0aW9uOiBcIlNlbGVjdGlvbiBvZiBuZXcgaXRlbXMgaGFzIGp1c3QgYXJyaXZlZCB0byBvdXIgYm91dGlxdWVzLlwiXG5cdGNvdmVyOiAkK1wiZGVmYXVsdC9wcm9kdWN0LTAxLmpwZ1wiXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbnRleHQxID0gbmV3IEZGVGV4dExheWVyXG5cdHRleHRTdHlsZTogXCJYTEJvbGRcIlxuXHR0ZXh0OiBcIlhMYXJnZSDigJQgMjYgQm9sZFwiXG5cdHk6IDEwMFxuXHR4OiBNX3NwYWNlclxuXHRcbnRleHQyID0gbmV3IEZGVGV4dExheWVyXG5cdHRleHRTdHlsZTogXCJMQm9sZFwiXG5cdHRleHQ6IFwiTGFyZ2Ug4oCUIDE4IEJvbGRcIlxuXHR5OiB0ZXh0MS5tYXhZICsgTV9zcGFjZXJcblx0eDogTV9zcGFjZXJcblx0XG50ZXh0MyA9IG5ldyBGRlRleHRMYXllclxuXHR0ZXh0U3R5bGU6IFwiTFwiXG5cdHRleHQ6IFwiTGFyZ2Ug4oCUIDE4IEJvb2tcIlxuXHR5OiB0ZXh0Mi5tYXhZICsgTV9zcGFjZXJcblx0eDogTV9zcGFjZXJcblxudGV4dDQgPSBuZXcgRkZUZXh0TGF5ZXJcblx0dGV4dFN0eWxlOiBcIk1Db25kXCJcblx0dGV4dDogXCJNZWRpdW0g4oCUIDE0IENvbmRlbmNlZFwiXG5cdHk6IHRleHQzLm1heFkgKyBNX3NwYWNlclxuXHR4OiBNX3NwYWNlclxuXG50ZXh0NSA9IG5ldyBGRlRleHRMYXllclxuXHR0ZXh0U3R5bGU6IFwiTUJvbGRcIlxuXHR0ZXh0OiBcIk1lZGl1bSDigJQgMTUgQm9sZFwiXG5cdHk6IHRleHQ0Lm1heFkgKyBNX3NwYWNlclxuXHR4OiBNX3NwYWNlclxuXG50ZXh0NiA9IG5ldyBGRlRleHRMYXllclxuXHR0ZXh0U3R5bGU6IFwiTVwiXG5cdHRleHQ6IFwiTWVkaXVtIOKAlCAxNSBCb29rXCJcblx0eTogdGV4dDUubWF4WSArIE1fc3BhY2VyXG5cdHg6IE1fc3BhY2VyXG5cbnRleHQ3ID0gbmV3IEZGVGV4dExheWVyXG5cdHRleHRTdHlsZTogXCJTQm9sZFwiXG5cdHRleHQ6IFwiU21hbGwg4oCUIDEyIEJvbGRcIlxuXHR5OiB0ZXh0Ni5tYXhZICsgTV9zcGFjZXJcblx0eDogTV9zcGFjZXJcblxuXG5cdFwiXCJcIiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyBDcmVhdGUgZGVmYXVsdCBTY3JvbGxDb21wb25lbnRcbnNjcm9sbCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0c2l6ZTogU2NyZWVuLnNpemVcblx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2VcblxuIyB1bml0IDFcbiMgdW5pdCA9IG5ldyB1bml0Q2xhc3NcbiMgXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cbiMgdW5pdCAyXG4jIHVuaXQgPSBuZXcgdW5pdENsYXNzXG4jIFx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXG4jIHVuaXQgM1xuIyB1bml0ID0gbmV3IHVuaXRDbGFzc1xuIyBcdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblxuXG5zY3JvbGwudXBkYXRlQ29udGVudCgpICMgVXBkYXRlIHNjcm9sbFxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIENyZWF0ZSBkZWZhdWx0IFNjcm9sbENvbXBvbmVudFxuc2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXG4jIENyZWF0ZSBoZXJvIHVuaXRcbnVuaXQxID0gbmV3IEhlcm9Vbml0XG5cdHRpdGxlOiBcIkhlbGxvIFdvcmxkXCJcblx0c3ViVGl0bGU6IFwiU2hvcCBub3dcIlxuXHRjb3ZlcjogJCtcImRlZmF1bHQvaGVyby0wMS5qcGdcIlxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cbiMgQ3JlYXRlIHByb2R1Y3QgdW5pdFxudW5pdDIgPSBuZXcgUHJvZHVjdFVuaXRcblx0dGl0bGU6IFwiSGVsbG8gV29ybGRcIlxuXHRkZXNjcmlwdGlvbjogXCJTZWxlY3Rpb24gb2YgbmV3IGl0ZW1zIGhhcyBqdXN0IGFycml2ZWQgdG8gb3VyIGJvdXRpcXVlcy5cIlxuXHRwcm9kdWN0c0FycmF5OiBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyAkK1wiZGVmYXVsdC9wcm9kdWN0cy5qc29uXCJcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHR5OiB1bml0MS5tYXhZXG5cbiMgQ3JlYXRlIHByb2R1Y3Qgc2V0XG51bml0MyA9IG5ldyBQcm9kdWN0U2V0XG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblx0dGl0bGU6IFwiSGVsbG8gV29ybGRcIlxuXHRzdWJUaXRsZTogXCJTaG9wIE5vd1wiXG5cdGNvdmVyOiAgJCtcImRlZmF1bHQvaGVyby0wMS5qcGdcIiwgXG5cdHByb2R1Y3RzQXJyYXk6IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jICQrXCJkZWZhdWx0L3Byb2R1Y3RzLmpzb25cIlxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdHk6IHVuaXQyLm1heFlcblxuIyBEaXZpZGVyIGxpbmVcbmxpbmUgPSBuZXcgS2V5bGluZVxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdHk6IHVuaXQzLm1heFlcblxuIyBDcmVhdGUgZmVhdHVyZSB1bml0IHdpdGggcHJvZHVjdCBpbWFnZVxudW5pdDQgPSBuZXcgRmVhdHVyZVVuaXRcblx0dGl0bGU6IFwiSGVsbG8gV29ybGRcIlxuXHRzdWJUaXRsZTogXCJTaG9wIG5vd1wiXG5cdGRlc2NyaXB0aW9uOiBcIlNlbGVjdGlvbiBvZiBuZXcgaXRlbXMgaGFzIGp1c3QgYXJyaXZlZCB0byBvdXIgYm91dGlxdWVzLlwiXG5cdGNvdmVyOiAkK1wiZGVmYXVsdC9wcm9kdWN0LTAxLmpwZ1wiXG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblx0eTogbGluZS5tYXhZXG5cbiMgQ3JlYXRpbmcgcHJvZHVjdCBoZXJvXG51bml0NSA9IG5ldyBQcm9kdWN0SGVyb1xuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIlBsZWFzZSBzZWUgb3VyIHJlY2NvbWVuZGF0aW9ucywgYmFzZWQgb24gZGVzaWduZXJzIHlvdSBsb3ZlLlwiXG5cdGRlc2NyaXB0aW9uOiBcIlRoZXJlIHdhcyBhIHNoaWZ0IGluIHNwb3J0c3dlYXIgdGhpcyBzZWFzb24uIFN1cmUsIGV4cGVjdGVkIGluamVjdGlvbnMgb2YgbmluZXRpZXMgeW91dGggY3VsdHVyZSBjb3VydGVzeSBvZiBHb3NoYSBhbmQgdGhlIGdhbmcgd2VyZSBzdGlsbCBwcmVzZW50LCBidXQgdGhlIGdlbmVyYWwgbW9vZCBwbGF5ZWQgdG8gdGhlIG1vcmUgZGlzdGFudCBwYXN0IG9mIHNldmVudGllcyBhbmQgZWlnaHRpZXMgYXRobGV0aWMgd2Vhci5cIlxuXHRjb3ZlcjogJCtcImRlZmF1bHQvcHJvZHVjdC1oZXJvLTAxLmpwZ1wiXG5cdHByb2R1Y3RzQXJyYXk6IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jICQrXCJkZWZhdWx0L3Byb2R1Y3RzLmpzb25cIlxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdHk6IHVuaXQ0Lm1heFlcblxuc2Nyb2xsLnVwZGF0ZUNvbnRlbnQoKSAjIFVwZGF0ZSBzY3JvbGxcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyMjIyMjIyMjIyBXaXNobGlzdCBQYWdlICMjIyMjIyMjIyMjXG5zdGF0dXNCYXIgPSBuZXcgU3RhdHVzQmFyXG5cbndpc2hMaXN0UGFnZSA9IG5ldyBMYXllclxuXHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXG53aXNobGlzdEhlYWRlciA9IG5ldyBIZWFkZXJcblx0cGFyZW50OiB3aXNoTGlzdFBhZ2Vcblx0YWZ0ZXI6IHN0YXR1c0JhclxuXHR0aXRsZTogXCJXaXNobGlzdFwiXG5cdGljb25SaWdodDogXCJiYWdcIlxuXHRzZWFyY2g6IHRydWVcblxud2lzaGxpc3RUYWJzID0gbmV3IFRhYnNcblx0cGFyZW50OiB3aXNoTGlzdFBhZ2Vcblx0YWZ0ZXI6IHdpc2hsaXN0SGVhZGVyXG5cdGl0ZW1zOiBbXCJhbGxcIiwgXCJvbiBzYWxlXCJdXG5cbndpc2hsaXN0VGFicy5vbl9zYWxlLnRleHQuY29sb3IgPSBcInJlZFwiXG5cbndpc2hsaXN0VW5pdCA9IG5ldyBXaXNobGlzdFVuaXRcblx0cGFyZW50OiB3aXNoTGlzdFBhZ2Vcblx0YWZ0ZXI6IHdpc2hsaXN0VGFic1xuXHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgLSB3aXNobGlzdFRhYnMubWF4WVxuXHRhcnJheTogW1xuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiTmV3IFNlYXNvblwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwic3dpbmcgZGVuaW0gamFja2V0XCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDEuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiQkFMRU5DSUFHQVwiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjMSwyNTlcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJzZWFzb25cIjogXCJOZXcgU2Vhc29uXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJHdWNjaSBsb2dvIFQtc2hpcnQgd2l0aCBzaG9vdGluZyBzdGFyc1wiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzAyLmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkdVQ0NJXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqMxLDUwMFwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIlwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwic2xlZXZlbGVzcyBWLW5lY2sgc3RhbXAgcHJpbnQgZHJlc3NcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wMy5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJHVUNDUEVURVIgUElMT1RUT0lcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozczOVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIk5ldyBTZWFzb25cIixcblx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcImZyaW5nZWQgbmV0dGVkIG1pZGkgZHJlc3NcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wNS5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJDQUxWSU4gS0xFSU4gMjA1VzM5TllDXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqMxLDU3NVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIlwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwiTmV3IFN3aW5nIHNoaXJ0XCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDYuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiQkFMRU5DSUFHQVwiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjMSwwNTBcIlxuXHRcdH1cblx0XVxuXG53aXNobGlzdEhlYWRlci50aXRsZSA9IFwiV2lzaGxpc3QgKFwiICsgd2lzaGxpc3RVbml0LmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoICsgXCIpXCJcblx0XG53aXNobGlzdFVuaXQubGlzdGNhcmRfMS5vblRhcCAtPlxuXHRwcmludCBcIlRhcCFcIlxuXG53aXNobGlzdFVuaXQuc3RhdGVzID1cblx0aGlkZTpcblx0XHR4OiAtU2NyZWVuLndpZHRoXG5cdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0dGltZTogMC4yXG5cbiMgT24gU2FsZVxud2lzaGxpc3RVbml0U2FsZSA9IG5ldyBXaXNobGlzdFVuaXRcblx0cGFyZW50OiB3aXNoTGlzdFBhZ2Vcblx0eDogU2NyZWVuLndpZHRoXG5cdGFmdGVyOiB3aXNobGlzdFRhYnNcblx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0IC0gd2lzaGxpc3RUYWJzLm1heFlcblx0YXJyYXk6IFtcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIk5ldyBTZWFzb25cIixcblx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcInN3aW5nIGRlbmltIGphY2tldFwiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzAxLmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkJBTEVOQ0lBR0FcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozEsMjU5XCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiTmV3IFNlYXNvblwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwiR3VjY2kgbG9nbyBULXNoaXJ0IHdpdGggc2hvb3Rpbmcgc3RhcnNcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wMi5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJHVUNDSVwiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjMSw1MDBcIlxuXHRcdH1cblx0XVxuXG53aXNobGlzdFVuaXRTYWxlLnN0YXRlcyA9XG5cdHNob3c6XG5cdFx0eDogMFxuXHRhbmltYXRpb25PcHRpb25zOlxuXHRcdHRpbWU6IDAuNFxuXHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMC45KVxuXG4jIE9uIHRhYiBhbmltYXRpb25cbndpc2hsaXN0VGFicy5vbl9zYWxlLm9uVGFwIC0+XG5cdHdpc2hsaXN0VW5pdC5hbmltYXRlKFwiaGlkZVwiKVxuXHR3aXNobGlzdFVuaXRTYWxlLmFuaW1hdGUoXCJzaG93XCIpXG5cbndpc2hsaXN0VGFicy5hbGwub25UYXAgLT5cblx0d2lzaGxpc3RVbml0LmFuaW1hdGUoXCJkZWZhdWx0XCIpXG5cdHdpc2hsaXN0VW5pdFNhbGUuYW5pbWF0ZShcImRlZmF1bHRcIilcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyMjIyMjIyMjIFNuaXBwZXQgU2VhcmNoIFBhZ2UgIyMjIyMjIyMjXG5zdGF0dXNCYXIgPSBuZXcgU3RhdHVzQmFyXG5cdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5mbG93ID0gbmV3IEZsb3dDb21wb25lbnRcblx0XHRcbmNhdGVnb3JpZXNQYWdlID0gbmV3IENhdGVnb3JpZXNQYWdlXG5cdHg6IFNjcmVlbi53aWR0aFxuXHRhY3Rpb25zOiB7XG5cdFx0XCJpdGVtMVwiOiAtPiBwcmludCBcIlRhcCFcIixcblx0XHRcIml0ZW0yXCI6IC0+IHByaW50IFwiQW5kIGFub3RoZXIgVGFwIVwiXG5cdH1cblxuY2F0ZWdvcmllc1BhZ2UuaGVhZGVyLmljb25MZWZ0X2xheWVyLm9uVGFwIC0+XG5cdGZsb3cuc2hvd1ByZXZpb3VzKClcblxuZGVzaWduZXJzUGFnZSA9IG5ldyBEZXNpZ25lcnNQYWdlXG5cdHg6IFNjcmVlbi53aWR0aFxuXHRhY3Rpb25zOiB7XG5cdFx0XCIyNjgyMDgyXCI6IC0+IHByaW50IFwiWW8hXCJcblx0fVxuXHRcbmRlc2lnbmVyc1BhZ2UuaGVhZGVyLmljb25MZWZ0X2xheWVyLm9uVGFwIC0+XG5cdGZsb3cuc2hvd1ByZXZpb3VzKClcblxuc2VhcmNoUGFnZSA9IG5ldyBMYXllclxuXHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcbnNlYXJjaENtcCA9IG5ldyBTZWFyY2hVbml0XG5cdHBhcmVudDogc2VhcmNoUGFnZVxuXHRhY3Rpb25zOiB7XG5cdFx0XCIyNjgyMDgyXCI6IC0+IHByaW50IFwiSXQncyBteSBUYXAhXCJcblx0fVxuXG5kZXNpZ25lcnNMaXN0SXRlbSA9IG5ldyBMaXN0SXRlbVxuXHR0eXBlOiBcIndpZGVcIlxuXHRyaWdodDogXCJhcnJvdy1yaWdodFwiXG5cdHRleHQ6IFwiRGVzaWduZXJzXCJcblx0YWZ0ZXI6IHNlYXJjaENtcFxuXG5kZXNpZ25lcnNMaXN0SXRlbS5vblRhcCAtPlxuXHRmbG93LnNob3dOZXh0KGRlc2lnbmVyc1BhZ2UpXG5cbmNhdGVnb3JpZXNMaXN0SXRlbSA9IG5ldyBMaXN0SXRlbVxuXHR0eXBlOiBcIndpZGVcIlxuXHRyaWdodDogXCJhcnJvdy1yaWdodFwiXG5cdHRleHQ6IFwiQ2F0ZWdvcmllc1wiXG5cdGFmdGVyOiBkZXNpZ25lcnNMaXN0SXRlbVxuXG5jYXRlZ29yaWVzTGlzdEl0ZW0ub25UYXAgLT5cblx0Zmxvdy5zaG93TmV4dChjYXRlZ29yaWVzUGFnZSlcblxuZmxvdy5zaG93TmV4dChzZWFyY2hQYWdlKVxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuIyBSZWZpbmUgRmlsdGVyc1xuc3RhdHVzX2JhciA9IG5ldyBTdGF0dXNCYXJcblxuaGVhZGVyX3JlZmluZSA9IG5ldyBIZWFkZXJcblx0YWZ0ZXI6IHN0YXR1c19iYXJcblx0dGl0bGU6IFwiUmVmaW5lXCJcblx0aWNvbkxlZnQ6IFwiYmlnLWNyb3NzXCJcblxuIyBDcmVhdGUgU2Nyb2xsQ29tcG9uZW50XG5zY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdHk6IGhlYWRlcl9yZWZpbmUubWF4WVxuXHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgLSBzdGF0dXNfYmFyLmhlaWdodCAtIGhlYWRlcl9yZWZpbmUuaGVpZ2h0XG5cdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0YmFja2dyb3VuZENvbG9yOiBcIiNmZmZmZmZcIlxuXHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuc2Nyb2xsLmNvbnRlbnQuYmFja2dyb3VuZENvbG9yID0gXCIjZmZmZmZmXCJcblxuXG50aXRsZTEgPSBuZXcgTGlzdFRpdGxlXG5cdHRleHQ6IFwiU29ydCBieVwiXG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblx0eTogTV9zcGFjZXJcblxuc29ydEJ5TGlzdCA9IG5ldyBMaXN0UmFkaW9TZWxlY3Rcblx0c2VsZWN0QXJyYXk6IFtcblx0XHR7dGV4dCA6IFwiT3VyIFBpY2tzXCIsIG9uIDogdHJ1ZX0sIFxuXHRcdHt0ZXh0IDogXCJOZXcgSXRlbXNcIn1cblx0XHR7dGV4dCA6IFwiUHJpY2UgKGhpZ2ggZmlyc3QpXCJ9XG5cdFx0e3RleHQgOiBcIlByaWNlIChsb3cgZmlyc3QpXCJ9XG5cdFx0XVxuXHRhZnRlcjogdGl0bGUxXG5cbnRpdGxlMiA9IG5ldyBMaXN0VGl0bGVcblx0dGV4dDogXCJGaWx0ZXIgYnlcIlxuXHR5OiBNX3NwYWNlclxuXHRhZnRlcjogc29ydEJ5TGlzdFxuXG5saXN0SXRlbTEgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJEZXNpZ25lcnNcIlxuXHRsZWZ0OiBcImFycm93LXJpZ2h0XCJcblx0YWZ0ZXI6IHRpdGxlMlxuXG5saXN0SXRlbTIgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJDb2xvdXJzXCJcblx0bGVmdDogXCJhcnJvdy1yaWdodFwiXG5cdGFmdGVyOiBsaXN0SXRlbTFcblxubGlzdEl0ZW0zID0gbmV3IExpc3RJdGVtXG5cdHRleHQ6IFwiUHJpY2UgUmFuZ2VcIlxuXHRsZWZ0OiBcImFycm93LXJpZ2h0XCJcblx0YWZ0ZXI6IGxpc3RJdGVtMlxuXG5saXN0SXRlbTQgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJGOTAgRGVsaXZlcnlcIlxuXHRsZWZ0OiBcImFycm93LXJpZ2h0XCJcblx0YWZ0ZXI6IGxpc3RJdGVtM1xuXG5saXN0SXRlbTUgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJTYW1lIERheSBEZWxpdmVyeVwiXG5cdGxlZnQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRhZnRlcjogbGlzdEl0ZW00XG5cbmxpc3RJdGVtNiA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIlNhbGUgRGlzY291bnRcIlxuXHRsZWZ0OiBcImFycm93LXJpZ2h0XCJcblx0YWZ0ZXI6IGxpc3RJdGVtNVxuXG5cbnNjcm9sbC51cGRhdGVDb250ZW50KCkgIyBVcGRhdGUgc2Nyb2xsXG5cblxuc2hvd1Jlc3VsdHNCdXRvbiA9IG5ldyBCdXR0b25GaXhlZFxuXHR0ZXh0OiBcIlNob3cgMTI1MCByZXN1bHRzXCJcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyBQTFAgU2NyZWVuIGNvbnRhaW5lciB0aGF0IGNhbiBiZSB1c2VkIGJ5IEZsb3cgQ29tcG9uZW50XG5wbHBTY3JlZW4gPSBuZXcgTGF5ZXJcblx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgIyBNaW5kIHRvIHJlbW92ZSBzdGF0dXNiYXIgJiB0YWJiYXIgaGVpZ2h0IGxhdGVyLlxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXG5wbHBIZWFkZXIgPSBuZXcgSGVhZGVyXG5cdHRpdGxlOiBcIlN1bW1lclwiXG5cdHN1YlRpdGxlOiBcIjcgaXRlbXNcIlxuXHRpY29uTGVmdDogXCJiaWctYXJyb3dcIlxuXHRpY29uUmlnaHQ6IFwiYmFnXCJcblx0c2VhcmNoOiB0cnVlXG5cdHBhcmVudDogcGxwU2NyZWVuXG5cbiMgQ3JlYXRlIGRlZmF1bHQgU2Nyb2xsQ29tcG9uZW50XG5wbHBTY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0IC0gKHBscEhlYWRlci5oZWlnaHQpXG5cdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdHk6IHBscEhlYWRlci5tYXhZXG5cdHBhcmVudDogcGxwU2NyZWVuXG5cbiMgUHJvZHVjdCBsaXN0IGFycmF5XG5QTFBsaXN0QXJyID0gSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgJCtcImRlZmF1bHQvcGxwLmpzb25cIlxuXG4jIFJlZmluZSBGaWx0ZXIncyBhcnJheVxucmVmaW5lRmlsdGVyc0FycmF5ID0gW11cbmZvciBpIGluIFswLi4uUExQbGlzdEFyci5sZW5ndGhdXG5cdHJlZmluZUZpbHRlcnNBcnJheS5wdXNoIFBMUGxpc3RBcnJbaV0uYnJhbmQuY2hhckF0KDApICsgUExQbGlzdEFycltpXS5icmFuZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpXG5cdFxuIyBSZWZpbmUgZmlsdGVyXG5yZWZpbmVGaWx0ZXIgPSBuZXcgUmVmaW5lRmlsdGVyXG5cdGFmdGVyOiBwbHBIZWFkZXJcblx0aXRlbXNBcnJheTogcmVmaW5lRmlsdGVyc0FycmF5XG5cbiMgUmVmaW5lIGZpbHRlciBhbmltYXRpb24gb24gc3JvbGxcbmhpZGVSZWZpbmUgPSBuZXcgQW5pbWF0aW9uIHJlZmluZUZpbHRlcixcblx0eTogLXJlZmluZUZpbHRlci5oZWlnaHRcblx0b3B0aW9uczpcblx0XHR0aW1lOiAwLjJcbnNob3dSZWZpbmUgPSBoaWRlUmVmaW5lLnJldmVyc2UoKVxuXG5wbHBTY3JvbGwub25TY3JvbGwgKGV2ZW50KSAtPlxuXHRpZiBldmVudC5kZWx0YVkgPCAyIGFuZCBwbHBTY3JvbGwuY29udGVudC55IDwgLTY4XG5cdFx0aGlkZVJlZmluZS5zdGFydCgpXG5cdGVsc2UgaWYgZXZlbnQuZGVsdGFZID4gMlxuXHRcdHNob3dSZWZpbmUuc3RhcnQoKVxuXG4jIEdlbmVyYXRlIHByb2R1Y3QgbGlzdGluZyBjYXJkc1xucHJvZHVjdENhcmRzID0gbmV3IFByb2R1Y3RMaXN0aW5nVW5pdFxuXHRwYXJlbnQ6IHBscFNjcm9sbC5jb250ZW50XG5cdHk6IHJlZmluZUZpbHRlci5oZWlnaHRcblxucGxwSGVhZGVyLmJyaW5nVG9Gcm9udCgpICMgQnJpbmcgaGVhZGVyIHRvIGZyb250XG5wbHBTY3JvbGwudXBkYXRlQ29udGVudCgpICMgVXBkYXRlIHNjcm9sbFxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIFBEUCBTY3JlZW4gY29udGFpbmVyIHRoYXQgY2FuIGJlIHVzZWQgYnkgRmxvdyBDb21wb25lbnRcbnBkcFNjcmVlbiA9IG5ldyBMYXllclxuXHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdGhlaWdodDogU2NyZWVuLmhlaWdodCAjIE1pbmQgdG8gcmVtb3ZlIHN0YXR1c2JhciBoZWlnaHQgbGF0ZXIuXG5cdGJhY2tncm91bmRDb2xvcjogXCJwdXJwbGVcIlxuXG5wZHBIZWFkZXIgPSBuZXcgSGVhZGVyXG5cdG5hbWU6IFwiaGVhZGVyXCJcblx0aWNvbkxlZnQ6IFwiYmlnLWFycm93XCJcblx0aWNvblJpZ2h0OiBcImJhZ1wiXG5cdHNlYXJjaDogdHJ1ZVxuXHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuIyBDcmVhdGUgZGVmYXVsdCBTY3JvbGxDb21wb25lbnRcbnBkcFNjcm9sbCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0c2l6ZTogU2NyZWVuLnNpemVcblx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0ZGlyZWN0aW9uTG9jazogdHJ1ZSAjIGF2b2lkcyBzY3JvbGwgd2hlbiBwcm9kdWN0IHN3aXBpbmdcblx0Y29udGVudEluc2V0OiBcblx0XHRib3R0b206IDEyMFxuXHRwYXJlbnQ6IHBkcFNjcmVlblxuXG5wZHBIZXJvVW5pdCA9IG5ldyBQRFBIZXJvVW5pdFxuXHRwYXJlbnQ6IHBkcFNjcm9sbC5jb250ZW50XG5cbnNlbGVjdG9yID0gbmV3IFNlbGVjdG9yXG5cdHBsYWNlaG9sZGVyOiBcIlNlbGVjdCBzZGYgeW91ciBzaXplXCJcblx0YWZ0ZXI6IHBkcEhlcm9Vbml0XG5cdFxuZGVzY3JpcHRpb24gPSBuZXcgQWNjb3JkaW9uXG5cdGV4cGFuZGVkOiB0cnVlXG5cdGxhYmVsVGV4dDogXCJEZXNjcmlwdGlvblwiXG5cdGNvbnRlbnQ6IGFjY19kZXNjcmlwdGlvbl9jb25ldGVudFxuXHRhZnRlcjogc2VsZWN0b3Jcblx0XG5zaXplQW5kRmVldCA9IG5ldyBBY2NvcmRpb25cblx0YWZ0ZXI6IGRlc2NyaXB0aW9uXG5cdGxhYmVsVGV4dDogXCJTaXplICYgRml0XCJcblx0Y29udGVudDogYWNjX3NpemVfY29udGVudFxuXHRcbmNhcmVDb250ZW50ID0gbmV3IEFjY29yZGlvblxuXHRjb250ZW50OiBhY2NfY2FyZV9jb250ZW50XG5cdGxhYmVsVGV4dDogXCJDb21wb3NpdGlvbiAmIENhcmVcIlxuXHRhZnRlcjogc2l6ZUFuZEZlZXRcblxuYWNjTGlzdCA9IG5ldyBBY2NvcmRpb25Hcm91cFxuXHRhZnRlcjogc2VsZWN0b3Jcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHRjaGlsZHJlbjogW2Rlc2NyaXB0aW9uLCBzaXplQW5kRmVldCwgY2FyZUNvbnRlbnRdXG5cbmNvbnRhY3RVcyA9IG5ldyBNZUNvbnRhY3RVc1xuXHRhZnRlcjogYWNjTGlzdFxuXHRcbnJlY29tZW5kZWRMaXN0ID0gbmV3IFJlY29tbWVuZGVkTGlzdFVuaXRcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHRzaG9wQWxsQnRuOiBmYWxzZVxuXHRhZnRlcjogY29udGFjdFVzXG5cdHk6IExfc3BhY2VyXG5cbiMgVXBkYXRlIFkgcG9zIG9mIGNvbXBvbmVudHMgYmVsb3dcbmFjY0xpc3Qub24gXCJjaGFuZ2U6aGVpZ2h0XCIsIC0+XG5cdGNvbnRhY3RVcy55ID0gYWNjTGlzdC5tYXhZXG5cdHJlY29tZW5kZWRMaXN0LnkgPSBjb250YWN0VXMubWF4WSArIExfc3BhY2VyXG5cbnBkcFNjcm9sbC51cGRhdGVDb250ZW50KCkgIyBVcGRhdGUgc2Nyb2xsXG5wZHBIZXJvVW5pdC5icmluZ1RvRnJvbnQoKVxuXG5hZGRUb0JhZyA9IG5ldyBCdXR0b25GaXhlZFxuXHR0ZXh0OiBcIkFkZCB0byBiYWdcIlxuXHRwYXJlbnQ6IHBkcFNjcmVlblxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIE1lIFNjcmVlbiBjb250YWluZXIgdGhhdCBjYW4gYmUgdXNlZCBieSBGbG93IENvbXBvbmVudFxubWVTY3JlZW4gPSBuZXcgTGF5ZXJcblx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgICMgTWluZCB0byByZW1vdmUgc3RhdHVzYmFyICYgdGFiYmFyIGhlaWdodCBsYXRlci5cblx0YmFja2dyb3VuZENvbG9yOiBcImdyZWVuXCJcblxubWVIZWFkZXIgPSBuZXcgSGVhZGVyXG5cdHBhcmVudDogbWVTY3JlZW5cblx0dGl0bGU6IFwiTWVcIlxuXHRpY29uUmlnaHQ6IFwiYmFnXCJcblx0c2VhcmNoOiB0cnVlXG5cbiMgU2Nyb2xsQ29tcG9uZW50XG5tZVNjcm9sbCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0cGFyZW50OiBtZVNjcmVlblxuXHR5OiBtZUhlYWRlci5tYXhZXG5cdGhlaWdodDogbWVTY3JlZW4uaGVpZ2h0IC0gbWVIZWFkZXIuaGVpZ2h0XG5cdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0YmFja2dyb3VuZENvbG9yOiBcIiNmZmZmZmZcIlxuXHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxubWVTY3JvbGwuY29udGVudC5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNmZmZmZmZcIlxuXG5zaWduSW4gPSBuZXcgTWVTaWduSW5cblx0cGFyZW50OiBtZVNjcm9sbC5jb250ZW50XG5cbm15TG9jYXRpb24gPSBuZXcgTGlzdFRpdGxlXG5cdHRleHQ6IFwiTXkgTG9jYXRpb25cIlxuXHRhZnRlcjogc2lnbkluXG5cdHk6IE1fc3BhY2VyXG5cbmNvdW50cnkgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJVbml0ZWQgS2luZ2RvbSAoR0JQKVwiXG5cdGxlZnQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRmbGFnOiBcInVrXCJcblx0YWZ0ZXI6IG15TG9jYXRpb25cblxuY291bnRyeUNvbW1lbnQgPSBuZXcgRkZUZXh0TGF5ZXJcblx0dGV4dDogXCJZb3VyIGNob3NlbiBsb2NhdGlvbiBkZWZpbmVzIHlvdXIgbGFuZ3VhZ2UgYW5kIHNob3BwaW5nIGN1cnJlbmN5LlwiXG5cdHRleHRTdHlsZTogXCJTXCJcblx0YWZ0ZXI6IGNvdW50cnlcblx0eTogU19zcGFjZXJcblx0eDogTV9zcGFjZXJcblx0d2lkdGg6IFNjcmVlbi53aWR0aCAtIE1fc3BhY2VyIC0gTV9zcGFjZXJcblx0XG5teUxhbmcgPSBuZXcgTGlzdFRpdGxlXG5cdHRleHQ6IFwiTXkgTGFuZ3VhZ2VcIlxuXHRhZnRlcjogY291bnRyeUNvbW1lbnRcblx0eTogTV9zcGFjZXJcblxubGFuZyA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIkVuZ2xpc2ggKFVLKVwiXG5cdGxlZnQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRhZnRlcjogbXlMYW5nXG5cbm15U2hvcFByZWYgPSBuZXcgTGlzdFRpdGxlXG5cdHRleHQ6IFwiTXkgU2hvcCBQcmVmZXJlbmNlXCJcblx0YWZ0ZXI6IGxhbmdcblx0eTogTV9zcGFjZXJcblxuc2hvcFByZWYgPSBuZXcgTGlzdFJhZGlvU2VsZWN0XG5cdHNlbGVjdEFycmF5OiBbXG5cdFx0e3RleHQgOiBcIldvbWVuXCIsIG9uIDogdHJ1ZX0sIFxuXHRcdHt0ZXh0IDogXCJNZW5cIn1cblx0XHRdXG5cdGFmdGVyOiBteVNob3BQcmVmXG5cdFxuc2hvcFByZWZDb21tZW50ID0gbmV3IEZGVGV4dExheWVyXG5cdHRleHQ6IFwiVGhpcyB3aWxsIHRhaWxvciB5b3VyIGFwcCBleHBlcmllbmNlLCBzaG93aW5nIHlvdSB0aGUgdHlwZSBvZiBwcm9kdWN0cyBtb3N0IHN1aXRlZCB0byB5b3UuXCJcblx0dGV4dFN0eWxlOiBcIlNcIlxuXHRhZnRlcjogc2hvcFByZWZcblx0eDogTV9zcGFjZXJcblx0eTogU19zcGFjZXJcblx0d2lkdGg6IFNjcmVlbi53aWR0aCAtIE1fc3BhY2VyIC0gTV9zcGFjZXJcblxubXlTZXR0aW5ncyA9IG5ldyBMaXN0VGl0bGVcblx0dGV4dDogXCJNeSBTZXR0aW5nc1wiXG5cdGFmdGVyOiBzaG9wUHJlZkNvbW1lbnRcblx0eTogTV9zcGFjZXJcblxucHVzaE5vdGlmaWNhdGlvbnMgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJQdXNoIE5vdGlmaWNhdGlvbnNcIlxuXHRsZWZ0OiBcImFycm93LXJpZ2h0XCJcblx0YWZ0ZXI6IG15U2V0dGluZ3NcblxubG9jYXRpb25TZXJ2aWNlcyA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIkxvY2F0aW9uIFNlcnZpY2VzXCJcblx0bGVmdDogXCJhcnJvdy1yaWdodFwiXG5cdGFmdGVyOiBwdXNoTm90aWZpY2F0aW9uc1xuXG50b3VjaElkID0gbmV3IExpc3RJdGVtXG5cdHRleHQ6IFwiQXBwbGUgVG91Y2ggSURcIlxuXHRsZWZ0OiBcInRvZ2dsZVwiXG5cdGFmdGVyOiBsb2NhdGlvblNlcnZpY2VzXG5cbnN1cHBvcnQgPSBuZXcgTGlzdFRpdGxlXG5cdHRleHQ6IFwiU3VwcG9ydFwiXG5cdGFmdGVyOiB0b3VjaElkXG5cdHk6IE1fc3BhY2VyXG5cbmFib3V0ID0gbmV3IExpc3RJdGVtXG5cdHRleHQ6IFwiQWJvdXQgRmFyZmV0Y2hcIlxuXHRsZWZ0OiBcImFycm93LXJpZ2h0XCJcblx0YWZ0ZXI6IHN1cHBvcnRcblxudGVybXMgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJUZXJtcyAmIENvbmRpdGlvbnNcIlxuXHRsZWZ0OiBcImFycm93LXJpZ2h0XCJcblx0YWZ0ZXI6IGFib3V0XG5cbnByaXZhY3kgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJQcml2YWN5IHBvbGljeVwiXG5cdGxlZnQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRhZnRlcjogdGVybXNcblxuZmFxID0gbmV3IExpc3RJdGVtXG5cdHRleHQ6IFwiRkFRICYgR3VpZGVzXCJcblx0bGVmdDogXCJhcnJvdy1yaWdodFwiXG5cdGFmdGVyOiBwcml2YWN5XG5cbnBhcnRuZXJzID0gbmV3IExpc3RJdGVtXG5cdHRleHQ6IFwiQm91dGlxdWUgcGFydG5lcnNcIlxuXHRsZWZ0OiBcImFycm93LXJpZ2h0XCJcblx0YWZ0ZXI6IGZhcVxuXG5jb250YWN0X3VzID0gbmV3IE1lQ29udGFjdFVzXG5cdGFmdGVyOiBwYXJ0bmVyc1xuXHR5OiBNX3NwYWNlclxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZmZmZlwiXG5cdGhlaWdodDogMzAwXG5cbm1lU2Nyb2xsLnVwZGF0ZUNvbnRlbnQoKSAjIFVwZGF0ZSBzY3JvbGxcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyBIb21lIFNjcmVlbiBjb250YWluZXIgdGhhdCBjYW4gYmUgdXNlZCBieSBGbG93IENvbXBvbmVudFxuaG9tZVNjcmVlbiA9IG5ldyBMYXllclxuXHR3aWR0aDogU2NyZWVuLndpZHRoIFxuXHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgIyBNaW5kIHRvIHJlbW92ZSBzdGF0dXNiYXIgJiB0YWJiYXIgaGVpZ2h0IGxhdGVyLlxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwiYmx1ZVwiXG5cbmhvbWVIZWFkZXIgPSBuZXcgSGVhZGVyXG5cdHBhcmVudDogaG9tZVNjcmVlblxuXHR0aXRsZTogXCJsb2dvXCJcblx0aWNvblJpZ2h0OiBcImJhZ1wiXG5cdFxuaG9tZVNlYXJjaCA9IG5ldyBIb21lU2VhcmNoXG5cdGFmdGVyOiAgaG9tZUhlYWRlclxuXG4jIFNjcm9sbENvbXBvbmVudFxuaG9tZVNjcm9sbCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0eTogaG9tZVNlYXJjaC5tYXhZICMgY2FuJ3QgdXNlICdhZnRlcicgYXMgdGhpcyBpcyBGcmFtZXIncyBDbGFzc1xuXHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRkaXJlY3Rpb25Mb2NrOiB0cnVlICMgYXZvaWRzIHNjcm9sbCB3aGVuIHByb2R1Y3Qgc3dpcGluZ1xuXHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdHBhcmVudDogaG9tZVNjcmVlblxuaG9tZVNjcm9sbC5oZWlnaHQgPSBob21lU2NyZWVuLmhlaWdodCAtIGhvbWVIZWFkZXIuaGVpZ2h0IC0gaG9tZVNlYXJjaC5oZWlnaHRcblxucG9zID0gbmV3IFBvc0Jhbm5lclxuXHR0ZXh0OiBcIlByaXZhdGUgU2FsZVwiXG5cdHBhcmVudDogaG9tZVNjcm9sbC5jb250ZW50XG5cbiMgQ3JlYXRlIGhlcm8gdW5pdFxudW5pdDEgPSBuZXcgSGVyb1VuaXRcblx0dGl0bGU6IFwiSGVsbG8gV29ybGRcIlxuXHRzdWJUaXRsZTogXCJTaG9wIG5vd1wiXG5cdGNvdmVyOiAkK1wiZGVmYXVsdC9oZXJvLTAxLmpwZ1wiXG5cdGFmdGVyOiBwb3NcblxuIyBDcmVhdGUgcHJvZHVjdCB1bml0XG51bml0MiA9IG5ldyBQcm9kdWN0VW5pdFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdGRlc2NyaXB0aW9uOiBcIlNlbGVjdGlvbiBvZiBuZXcgaXRlbXMgaGFzIGp1c3QgYXJyaXZlZCB0byBvdXIgYm91dGlxdWVzLlwiXG5cdHByb2R1Y3RzQXJyYXk6IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jICQrXCJkZWZhdWx0L3Byb2R1Y3RzLmpzb25cIlxuXHRhZnRlcjogdW5pdDFcblxuIyBDcmVhdGUgcHJvZHVjdCBzZXRcbnVuaXQzID0gbmV3IFByb2R1Y3RTZXRcblx0dGl0bGU6IFwiSGVsbG8gV29ybGRcIlxuXHRzdWJUaXRsZTogXCJTaG9wIE5vd1wiXG5cdGNvdmVyOiAgJCtcImRlZmF1bHQvaGVyby0wMS5qcGdcIiwgXG5cdHByb2R1Y3RzQXJyYXk6IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jICQrXCJkZWZhdWx0L3Byb2R1Y3RzLmpzb25cIlxuXHRhZnRlcjogdW5pdDJcblxuIyBEaXZpZGVyIGxpbmVcbmxpbmUgPSBuZXcgS2V5bGluZVxuXHRhZnRlcjogdW5pdDNcblxuIyBDcmVhdGUgZmVhdHVyZSB1bml0IHdpdGggcHJvZHVjdCBpbWFnZVxudW5pdDQgPSBuZXcgRmVhdHVyZVVuaXRcblx0dGl0bGU6IFwiSGVsbG8gV29ybGRcIlxuXHRzdWJUaXRsZTogXCJTaG9wIG5vd1wiXG5cdGRlc2NyaXB0aW9uOiBcIlNlbGVjdGlvbiBvZiBuZXcgaXRlbXMgaGFzIGp1c3QgYXJyaXZlZCB0byBvdXIgYm91dGlxdWVzLlwiXG5cdGNvdmVyOiAkK1wiZGVmYXVsdC9wcm9kdWN0LTAxLmpwZ1wiXG5cdGFmdGVyOiBsaW5lXG5cbiMgQ3JlYXRpbmcgcHJvZHVjdCBoZXJvXG51bml0NSA9IG5ldyBQcm9kdWN0SGVyb1xuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIlBsZWFzZSBzZWUgb3VyIHJlY2NvbWVuZGF0aW9ucywgYmFzZWQgb24gZGVzaWduZXJzIHlvdSBsb3ZlLlwiXG5cdGRlc2NyaXB0aW9uOiBcIlRoZXJlIHdhcyBhIHNoaWZ0IGluIHNwb3J0c3dlYXIgdGhpcyBzZWFzb24uIFN1cmUsIGV4cGVjdGVkIGluamVjdGlvbnMgb2YgbmluZXRpZXMgeW91dGggY3VsdHVyZSBjb3VydGVzeSBvZiBHb3NoYSBhbmQgdGhlIGdhbmcgd2VyZSBzdGlsbCBwcmVzZW50LCBidXQgdGhlIGdlbmVyYWwgbW9vZCBwbGF5ZWQgdG8gdGhlIG1vcmUgZGlzdGFudCBwYXN0IG9mIHNldmVudGllcyBhbmQgZWlnaHRpZXMgYXRobGV0aWMgd2Vhci5cIlxuXHRjb3ZlcjogJCtcImRlZmF1bHQvcHJvZHVjdC1oZXJvLTAxLmpwZ1wiXG5cdHByb2R1Y3RzQXJyYXk6IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jICQrXCJkZWZhdWx0L3Byb2R1Y3RzLmpzb25cIlxuXHRhZnRlcjogdW5pdDRcblxuaG9tZVNjcm9sbC51cGRhdGVDb250ZW50KCkgIyBVcGRhdGUgc2Nyb2xsXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbmRlc2lnbmVyc1BhZ2UgPSBuZXcgRGVzaWduZXJzUGFnZVxuXHRhY3Rpb25zOiB7XG5cdFx0XCIyNjgyMDgyXCI6IC0+IHByaW50IFwiWW8hXCJcblx0fVxuXHRcbmRlc2lnbmVyc1BhZ2UuaGVhZGVyLmljb25MZWZ0X2xheWVyLm9uVGFwIC0+XG5cdHByaW50IFwiYmFja1wiXG4gICAgXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG5jYXRlZ29yaWVzUGFnZSA9IG5ldyBDYXRlZ29yaWVzUGFnZVxuXHRhY3Rpb25zOiB7XG5cdFx0XCJpdGVtMVwiOiAtPiBwcmludCBcIlRhcCFcIixcblx0XHRcIml0ZW0yXCI6IC0+IHByaW50IFwiQW5kIGFub3RoZXIgVGFwIVwiXG5cdH1cblxuY2F0ZWdvcmllc1BhZ2UuaGVhZGVyLmljb25MZWZ0X2xheWVyLm9uVGFwIC0+XG5cdHByaW50IFwiYmFja1wiXG4gICAgXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIFN0YXR1cyBiYXJcbnN0YXR1c19iYXIgPSBuZXcgU3RhdHVzQmFyXG5cbiMgVGFiYmFyIGV4YW1wbGVcbnRhYmJhciA9IG5ldyBUYWJiYXJcblx0YWN0aXZlSXRlbTogXCJob21lXCJcblxuIyMgU2NyZWVuc1xuXG4jIEhvbWUgU2NyZWVuXG5ob21lU2NyZWVuID0gbmV3IExheWVyXG5cdHdpZHRoOiBTY3JlZW4ud2lkdGggXG5cdGhlaWdodDogU2NyZWVuLmhlaWdodCAtIHN0YXR1c19iYXIuaGVpZ2h0IC0gdGFiYmFyLmhlaWdodFxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwiYmx1ZVwiXG5cbiMgTWUgU2NyZWVuXG5tZVNjcmVlbiA9IG5ldyBMYXllclxuXHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdGhlaWdodDogU2NyZWVuLmhlaWdodCAtIHN0YXR1c19iYXIuaGVpZ2h0IC0gdGFiYmFyLmhlaWdodFxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwiZ3JlZW5cIlxuXG5cbiMgU2V0IHVwIEZsb3dDb21wb25lbnRcbmZsb3cgPSBuZXcgRmxvd0NvbXBvbmVudFxuXHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgLSBzdGF0dXNfYmFyLmhlaWdodCAtIHRhYmJhci5oZWlnaHRcblx0eTogc3RhdHVzX2Jhci5tYXhZXG5cdFxuIyBGaXJzdCBzY3JlZW5cbmZsb3cuc2hvd05leHQoaG9tZVNjcmVlbilcblxuXG4jIFRhYmJhciBsb2dpY1xudGFiYmFyLnNlbGVjdENoaWxkKFwiaG9tZVwiKS5vbkNsaWNrIChldmVudCwgbGF5ZXIpIC0+XG5cdGZsb3cuc2hvd05leHQoaG9tZVNjcmVlbiwgYW5pbWF0ZTogZmFsc2UpXG5cbnRhYmJhci5zZWxlY3RDaGlsZChcIm1lXCIpLm9uQ2xpY2sgKGV2ZW50LCBsYXllcikgLT5cblx0Zmxvdy5zaG93TmV4dChtZVNjcmVlbiwgYW5pbWF0ZTogZmFsc2UpXG5cdFxudGFiYmFyLmJyaW5nVG9Gcm9udCgpXG5cblx0XCJcIlwiIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG5cbiMgU3RhdHVzIGJhclxuc3RhdHVzX2JhciA9IG5ldyBTdGF0dXNCYXJcblxuIyBUYWJiYXIgZXhhbXBsZVxudGFiYmFyID0gbmV3IFRhYmJhclxuXHRhY3RpdmVJdGVtOiBcImhvbWVcIlxuXG5cblxuIyMgSG9tZSBTY3JlZW5cblxuaG9tZVNjcmVlbiA9IG5ldyBMYXllclxuXHR3aWR0aDogU2NyZWVuLndpZHRoIFxuXHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgLSBzdGF0dXNfYmFyLmhlaWdodCAtIHRhYmJhci5oZWlnaHRcblxuaG9tZUhlYWRlciA9IG5ldyBIZWFkZXJcblx0cGFyZW50OiBob21lU2NyZWVuXG5cdHRpdGxlOiBcImxvZ29cIlxuXHRpY29uUmlnaHQ6IFwiYmFnXCJcblx0XG5ob21lU2VhcmNoID0gbmV3IEhvbWVTZWFyY2hcblx0YWZ0ZXI6ICBob21lSGVhZGVyXG5cbiMgU2Nyb2xsQ29tcG9uZW50XG5ob21lU2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHR5OiBob21lU2VhcmNoLm1heFkgIyBjYW4ndCB1c2UgJ2FmdGVyJyBhcyB0aGlzIGlzIEZyYW1lcidzIENsYXNzXG5cdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdGRpcmVjdGlvbkxvY2s6IHRydWUgIyBhdm9pZHMgc2Nyb2xsIHdoZW4gcHJvZHVjdCBzd2lwaW5nXG5cdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0cGFyZW50OiBob21lU2NyZWVuXG5ob21lU2Nyb2xsLmhlaWdodCA9IGhvbWVTY3JlZW4uaGVpZ2h0IC0gaG9tZUhlYWRlci5oZWlnaHQgLSBob21lU2VhcmNoLmhlaWdodFxuXG5wb3MgPSBuZXcgUG9zQmFubmVyXG5cdHRleHQ6IFwiUHJpdmF0ZSBTYWxlXCJcblx0cGFyZW50OiBob21lU2Nyb2xsLmNvbnRlbnRcblxuIyBDcmVhdGUgaGVybyB1bml0XG51bml0MSA9IG5ldyBIZXJvVW5pdFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIlNob3Agbm93XCJcblx0Y292ZXI6ICQrXCJkZWZhdWx0L2hlcm8tMDEuanBnXCJcblx0YWZ0ZXI6IHBvc1xuXG4jIENyZWF0ZSBwcm9kdWN0IHVuaXRcbnVuaXQyID0gbmV3IFByb2R1Y3RVbml0XG5cdHRpdGxlOiBcIkhlbGxvIFdvcmxkXCJcblx0ZGVzY3JpcHRpb246IFwiU2VsZWN0aW9uIG9mIG5ldyBpdGVtcyBoYXMganVzdCBhcnJpdmVkIHRvIG91ciBib3V0aXF1ZXMuXCJcblx0cHJvZHVjdHNBcnJheTogSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgJCtcImRlZmF1bHQvcHJvZHVjdHMuanNvblwiXG5cdGFmdGVyOiB1bml0MVxuXG5ob21lU2Nyb2xsLnVwZGF0ZUNvbnRlbnQoKSAjIFVwZGF0ZSBzY3JvbGxcblxuXG5cblxuIyMgUExQIFNjcmVlblxuXG5wbHBTY3JlZW4gPSBuZXcgTGF5ZXJcblx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgLSBzdGF0dXNfYmFyLmhlaWdodCAtIHRhYmJhci5oZWlnaHRcblx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblxucGxwSGVhZGVyID0gbmV3IEhlYWRlclxuXHR0aXRsZTogXCJTdW1tZXJcIlxuXHRzdWJUaXRsZTogXCI3IGl0ZW1zXCJcblx0aWNvbkxlZnQ6IFwiYmlnLWFycm93XCJcblx0aWNvblJpZ2h0OiBcImJhZ1wiXG5cdHNlYXJjaDogdHJ1ZVxuXHRwYXJlbnQ6IHBscFNjcmVlblxuXG4jIENyZWF0ZSBkZWZhdWx0IFNjcm9sbENvbXBvbmVudFxucGxwU2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdGhlaWdodDogU2NyZWVuLmhlaWdodCAtIChwbHBIZWFkZXIuaGVpZ2h0KVxuXHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHR5OiBwbHBIZWFkZXIubWF4WVxuXHRwYXJlbnQ6IHBscFNjcmVlblxuXG4jIFByb2R1Y3QgbGlzdCBhcnJheVxuUExQbGlzdEFyciA9IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jICQrXCJkZWZhdWx0L3BscC5qc29uXCJcblxuIyBSZWZpbmUgRmlsdGVyJ3MgYXJyYXlcbnJlZmluZUZpbHRlcnNBcnJheSA9IFtdXG5mb3IgaSBpbiBbMC4uLlBMUGxpc3RBcnIubGVuZ3RoXVxuXHRyZWZpbmVGaWx0ZXJzQXJyYXkucHVzaCBQTFBsaXN0QXJyW2ldLmJyYW5kLmNoYXJBdCgwKSArIFBMUGxpc3RBcnJbaV0uYnJhbmQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKVxuXHRcbiMgUmVmaW5lIGZpbHRlclxucmVmaW5lRmlsdGVyID0gbmV3IFJlZmluZUZpbHRlclxuXHRhZnRlcjogcGxwSGVhZGVyXG5cdGl0ZW1zQXJyYXk6IHJlZmluZUZpbHRlcnNBcnJheVxuXHR5OiAwXG5cbiMgUmVmaW5lIGZpbHRlciBhbmltYXRpb24gb24gc3JvbGxcbmhpZGVSZWZpbmUgPSBuZXcgQW5pbWF0aW9uIHJlZmluZUZpbHRlcixcblx0eTogLXJlZmluZUZpbHRlci5oZWlnaHRcblx0b3B0aW9uczpcblx0XHR0aW1lOiAwLjJcbiNzaG93UmVmaW5lID0gaGlkZVJlZmluZS5yZXZlcnNlKClcbnNob3dSZWZpbmUgPSBuZXcgQW5pbWF0aW9uIHJlZmluZUZpbHRlcixcblx0eTogMTBcblx0b3B0aW9uczpcblx0XHR0aW1lOiAwLjJcblx0XG5cdFxucGxwU2Nyb2xsLm9uU2Nyb2xsIChldmVudCkgLT5cblx0aWYgZXZlbnQuZGVsdGFZIDwgMiBhbmQgcGxwU2Nyb2xsLmNvbnRlbnQueSA8IC0gNjhcblx0XHRoaWRlUmVmaW5lLnN0YXJ0KClcblx0ZWxzZSBpZiBldmVudC5kZWx0YVkgPiAyXG5cdFx0c2hvd1JlZmluZS5zdGFydCgpXG5cbiMgR2VuZXJhdGUgcHJvZHVjdCBsaXN0aW5nIGNhcmRzXG5wcm9kdWN0Q2FyZHMgPSBuZXcgUHJvZHVjdExpc3RpbmdVbml0XG5cdHBhcmVudDogcGxwU2Nyb2xsLmNvbnRlbnRcblx0eTogcmVmaW5lRmlsdGVyLmhlaWdodFxuXG5wbHBIZWFkZXIuYnJpbmdUb0Zyb250KCkgIyBCcmluZyBoZWFkZXIgdG8gZnJvbnRcbiMgcGxwU2Nyb2xsLmNvbnRlbnRJbnNldCA9XG4jIFx0dG9wOiA2OFxucGxwU2Nyb2xsLnVwZGF0ZUNvbnRlbnQoKSAjIFVwZGF0ZSBzY3JvbGxcblxuXG5cbiMjIEZsb3cgQ29tcG9uZW50XG5cbmZsb3cgPSBuZXcgRmxvd0NvbXBvbmVudFxuXHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgLSBzdGF0dXNfYmFyLmhlaWdodCAtIHRhYmJhci5oZWlnaHRcblx0eTogc3RhdHVzX2Jhci5tYXhZXG5cdFxuIyBGaXJzdCBzY3JlZW5cbmZsb3cuc2hvd05leHQoaG9tZVNjcmVlbilcblxuXG5cbiMjIExvZ2ljIGFuZCBJbnRlcmFjdGlvbnNcblxuXG4jIFRhYmJhclxudGFiYmFyLnNlbGVjdENoaWxkKFwiaG9tZVwiKS5vbkNsaWNrIChldmVudCwgbGF5ZXIpIC0+XG5cdGZsb3cuc2hvd05leHQoaG9tZVNjcmVlbiwgYW5pbWF0ZTogZmFsc2UpXG5cdFxudGFiYmFyLmJyaW5nVG9Gcm9udCgpXG5cbiMgVGFwcyB0byBQRFBcbnVuaXQxLm9uQ2xpY2sgKGV2ZW50LCBsYXllcikgLT5cblx0Zmxvdy5zaG93TmV4dChwbHBTY3JlZW4pXG5cdFxudW5pdDIuY3RhLm9uQ2xpY2sgKGV2ZW50LCBsYXllcikgLT5cblx0Zmxvdy5zaG93TmV4dChwbHBTY3JlZW4pXG5cbnBscEhlYWRlci5zZWxlY3RDaGlsZChcImljbl9sZWZ0XCIpLm9uQ2xpY2sgKGV2ZW50LCBsYXllcikgLT5cblx0Zmxvdy5zaG93UHJldmlvdXMoKSBcblxuXHRcIlwiXCIiLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbnRvZ2dsZSA9IG5ldyBpT1NTd2l0Y2hcblx0eTogQWxpZ24uY2VudGVyXG5cdGlzT246IHRydWVcblxudG9nZ2xlLm9uVmFsdWVDaGFuZ2UgKHZhbHVlKSAtPlxuXHRwcmludCB2YWx1ZVxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG53aXNobGlzdFVuaXQgPSBuZXcgV2lzaGxpc3RVbml0XG5cdGFycmF5OiBbXG5cdFx0e1xuXHRcdFx0XCJzZWFzb25cIjogXCJOZXcgU2Vhc29uXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJzd2luZyBkZW5pbSBqYWNrZXRcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wMS5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJCQUxFTkNJQUdBXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqMxLDI1OVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIk5ldyBTZWFzb25cIixcblx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcIkd1Y2NpIGxvZ28gVC1zaGlydCB3aXRoIHNob290aW5nIHN0YXJzXCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDIuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiR1VDQ0lcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozEsNTAwXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJzbGVldmVsZXNzIFYtbmVjayBzdGFtcCBwcmludCBkcmVzc1wiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzAzLmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkdVQ0NQRVRFUiBQSUxPVFRPSVwiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjNzM5XCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiTmV3IFNlYXNvblwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwiZnJpbmdlZCBuZXR0ZWQgbWlkaSBkcmVzc1wiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzA1LmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkNBTFZJTiBLTEVJTiAyMDVXMzlOWUNcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozEsNTc1XCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJOZXcgU3dpbmcgc2hpcnRcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wNi5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJCQUxFTkNJQUdBXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqMxLDA1MFwiXG5cdFx0fVxuXHRdXG5cdFxud2lzaGxpc3RVbml0Lmxpc3RjYXJkXzEub25UYXAgLT5cblx0cHJpbnQgXCJUYXAhXCJcblxuXHRcIlwiXCIiLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbnRhYnMgPSBuZXcgVGFic1xuICAgIGl0ZW1zOiBbXCJvbmVcIiwgXCJ0d29cIiwgXCJ0aHJlZVwiLCBcImZvdXJcIl1cblxudGFicy5vbmUub25UYXAgLT5cbiAgICBwcmludCAnc2RmJ1xuICAgIFxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cbiMgVGFiYmFyIGV4YW1wbGVcbnRhYmJhciA9IG5ldyBUYWJiYXJcblx0YWN0aXZlSXRlbTogXCJob21lXCJcblxuIyBDaGFuZ2UgYWN0aXZlIGl0ZW1cbnRhYmJhci5hY3RpdmVJdGVtID0gXCJtZVwiXG5cbiMgQWRkIGV2ZW50c1xudGFiYmFyLnNlbGVjdENoaWxkKFwiaG9tZVwiKS5vbiBFdmVudHMuQ2xpY2ssIChldmVudCwgbGF5ZXIpIC0+XG5cdHByaW50IFwiQ2xpY2tlZCBIb21lXCIsIGxheWVyLm5hbWVcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cbnN0YXR1c19iYXIgPSBuZXcgU3RhdHVzQmFyXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuIyBTZWxlY3Rvclxuc2VsZWN0b3IgPSBuZXcgU2VsZWN0b3Jcblx0cGxhY2Vob2xkZXJUZXh0OiBcIlNlbGVjdCBzZGYgeW91ciBzaXplXCJcblx0bGFiZWxUZXh0OiBcIkNvdW50cnkvUmVnaW9uXCJcblx0aGVscGVyVGV4dDogXCJUaGlzIGlzIGhlbHBlciB0ZXh0XCJcblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbnNlYXJjaElucHV0dCA9IG5ldyBTZWFyY2hJbnB1dFxuICAgIHBsYWNlaG9sZGVyOiBcIllvdXIgdGV4dFwiXG4gICAgXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuIyBSZWZpbmUgZmlsdGVyXG5yZWZpbmUgPSBuZXcgUmVmaW5lRmlsdGVyXG5cdHg6IEFsaWduLmNlbnRlcigpXG5cdHk6IHN0YXR1c19iYXIubWF4WVxuXHRpdGVtc0FycmF5OiBbXCJpdGVtICMxXCIsXCJsb25nIGl0ZW0gIzJcIixcIml0ZW0gIzNcIixcIml0ZW0gIzRcIiwgXCJpdGVtICM1XCJdXG5cbiMgVXBkYXRlIHNlbGVjdGVkIGl0ZW1zXG5yZWZpbmUuc2VsZWN0ZWQoNilcblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5wcm9kdWN0Q2FyZEEgPSBuZXcgUHJvZHVjdFNsaWRlclxuXHRhcnJheTogW1xuXHRcdHsgIyBQcm9kdWN0IDEgXG5cdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwiSSBoZWFydCBQcmFkYSBiYWcgY2hhcm1cIlxuXHRcdFwiaW1hZ2VzXCI6IFtcInVybFwiOiBcImh0dHBzOi8vY2RuLWltYWdlcy5mYXJmZXRjaC1jb250ZW50cy5jb20vMTIvNjUvNzQvOTEvMTI2NTc0OTFfMTIzMzk4MjVfMzAwLmpwZ1wiXVxuXHRcdFwiYnJhbmRcIjoge1wibmFtZVwiOiBcIlByYWRhXCJ9LFxuXHRcdFwicHJpY2VcIjogXCLCoyAxMzVcIlxuXHRcdH1cblx0XHR7ICMgUHJvZHVjdCAxIFxuXHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcIkkgaGVhcnQgUHJhZGEgYmFnIGNoYXJtXCJcblx0XHRcImltYWdlc1wiOiBbXCJ1cmxcIjogXCJodHRwczovL2Nkbi1pbWFnZXMuZmFyZmV0Y2gtY29udGVudHMuY29tLzEyLzY1Lzc0LzkxLzEyNjU3NDkxXzEyMzM5ODI1XzMwMC5qcGdcIl1cblx0XHRcImJyYW5kXCI6IHtcIm5hbWVcIjogXCJQcmFkYVwifSxcblx0XHRcInByaWNlXCI6IFwiwqMgMTM1XCJcblx0XHR9XG5cdF1cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG4jIFByb2R1Y3QgY2FyZCBleGFtcGxlXG5wcm9kdWN0Q2FyZEEgPSBuZXcgUHJvZHVjdENhcmRcblx0Y292ZXI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDIuanBnXCJcblx0YnJhbmRUZXh0OiBcIkMmQ1wiXG5cdGRlc2NyaXB0aW9uVGV4dDogXCJFbWJlbGxpc2hlZCBsb2dvIGRlbmltIGphY2tldFwiXG5cdHByaWNlVGV4dDogXCLCozEyNTZcIlxuXHRcIlwiXCIiLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbnBvcyA9IG5ldyBQb3NCYW5uZXJcblx0dGV4dDogXCJQcml2YXRlIFNhbGVcIlxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuIyBQRFAgaGVyb1xucGRwSGVyb1VuaXQgPSBuZXcgUERQSGVyb1VuaXRcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxubGlzdFRpdGxlID0gbmV3IExpc3RUaXRsZVxuXHR0ZXh0OiBcIkhlbGxvIFdvcmRcIlxuXHR5OiA1MFxuXHRcbmxpc3RJdGVtMSA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIkhlbGxvIFdvcmxkXCJcblx0cmlnaHQ6IFwiYXJyb3ctcmlnaHRcIlxuXHR5OiBsaXN0VGl0bGUubWF4WVxuXHR0eXBlOiBcIndpZGVcIlxuXG5saXN0SXRlbTIgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJIZWxsbyBXb3JsZFwiXG5cdHk6IGxpc3RJdGVtMS5tYXhZXG5cbmxpc3RJdGVtMyA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIkhlbGxvIFdvcmxkXCJcblx0cmlnaHQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRmbGFnOiBcInVrXCJcblx0eTogbGlzdEl0ZW0yLm1heFlcblx0dHlwZTogXCJ3aWRlXCJcblx0XG5saXN0SXRlbTQgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJIZWxsbyBXb3JsZFwiXG5cdHJpZ2h0OiBcInRvZ2dsZVwiXG5cdHk6IGxpc3RJdGVtMy5tYXhZXG5cdHR5cGU6IFwid2lkZVwiXG5cbmxpc3RJdGVtNSA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIkhlbGxvIFdvcmxkXCJcblx0bGluZTogXCJmdWxsd2lkdGhcIlxuXHRsaW5lVG9wOiB0cnVlXG5cdHk6IGxpc3RJdGVtNC5tYXhZXG5cdFxuXHRcbmxpc3RJdGVtNiA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIkhlbGxvIFdvcmxkXCJcblx0bGluZTogZmFsc2Vcblx0bGluZVRvcDogXCJmdWxsd2lkdGhcIlxuXHR5OiBsaXN0SXRlbTUubWF4WVxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG5yYWRpb1NlbGVjdCA9IG5ldyBMaXN0UmFkaW9TZWxlY3Rcblx0c2VsZWN0QXJyYXk6IFtcblx0XHR7dGV4dCA6IFwiTGlzdCBJdGVtIDFcIn0sIFxuXHRcdHt0ZXh0IDogXCJMaXN0IEl0ZW0gMlwiLCBvbiA6IHRydWV9XG5cdFx0e3RleHQ6IFwiTGlzdCBJdGVtIDNcIn1cblx0XHRdXG5cdFx0XG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuIyBMaXN0IFByb2R1Y3QgQ2FyZFxubGlzdENhcmQgPSBuZXcgTGlzdFByb2R1Y3RDYXJkXG5cdHk6IDQwXG5cdGNvdmVyOiAkK1wiZGVmYXVsdC9saXN0LXByb2R1Y3QtY2FyZC0wMS5wbmdcIlxuXHRzZWFzb246IFwiXCJcblx0YnJhbmQ6IFwiRHZmIERpYW5lIFZvbiBGdXJzdGVuYmVyZ1wiXG5cdGljb246IFwid2lzaGxpc3RcIlxuXHRkZXNjcmlwdGlvbjogXCJUaGUgTGFyZ2UgUnVja3NhY2sgaW4gVGVjaG5pY2FsIE55bG9uIGFuZCBMZWF0aGVyXCJcblx0cHJpY2U6IFwiwqMyMzlcIlxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxubGlzdEl0ZW0gPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJIZWxsbyBXb3JsZFwiXG5cdHJpZ2h0OiBcImFycm93LXJpZ2h0XCJcblx0ZmxhZzogXCJ1a1wiXG5cdGxpbmU6IFwiZnVsbHdpZHRoXCJcblx0bGluZVRvcDogdHJ1ZVxuXHR5OiAyMDBcblx0dHlwZTogXCJ3aWRlXCJcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxubGluZSA9IG5ldyBLZXlsaW5lXG5cdHk6IDEwMCAjIHBvc2l0aW9uIHRoZSBsaW5lIFxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG5zZWFyY2ggPSBuZXcgSG9tZVNlYXJjaFxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIERpZmZlcmVudCBleGFtcGxlcyBvZiBoZWFkZXJzXG5cbmhlYWRlcjEgPSBuZXcgSGVhZGVyXG5cdHk6IDE1MFxuXHR0aXRsZTogXCJsb2dvXCJcblx0aWNvblJpZ2h0OiBcImJhZ1wiXG5cbmhlYWRlcjIgPSBuZXcgSGVhZGVyXG5cdHk6IDI1MFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdGljb25MZWZ0OiBcImJpZy1hcnJvd1wiXG5cdGljb25SaWdodDogXCJiYWdcIlxuXHRzZWFyY2g6IHRydWVcblxuaGVhZGVyMyA9IG5ldyBIZWFkZXJcblx0eTogMzUwXG5cdHRpdGxlOiBcIkFsZXhhbmRlciBNcVF1ZWVuXCJcblx0c3ViVGl0bGU6IFwiMTUwMCBpdGVtc1wiXG5cdGljb25MZWZ0OiBcImJpZy1hcnJvd1wiXG5cdGljb25SaWdodDogXCJiYWdcIlxuXHRiYWc6IDJcblx0c2VhcmNoOiB0cnVlXG5cbmhlYWRlcjQgPSBuZXcgSGVhZGVyXG5cdHk6IDQ1MFxuXHR0aXRsZTogXCJSZWZpbmVcIlxuXHRpY29uTGVmdDogXCJjcm9zc1wiXG5cdGxpbmtSaWdodDogXCJDbGVhciBBbGxcIlxuXG5oZWFkZXI0ID0gbmV3IEhlYWRlclxuXHR5OiA1NTBcblx0aWNvbkxlZnQ6IFwiYmlnLWFycm93XCJcblx0aWNvblJpZ2h0OiBcImJhZ1wiXG5cdHNlYXJjaDogdHJ1ZVxuXHRub2JnOiB0cnVlIFxuXG5oZWFkZXI2ID0gbmV3IEhlYWRlclxuXHR5OiA2NTBcblx0dGl0bGU6IFwiSGVsbG8gV29yZFwiXG5cdGljb25SaWdodDogXCJjcm9zc1wiXG5cblx0XCJcIlwiIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIEhlYWRlciB3aXRoIGFsbCBwb3NzaWJsZSBhdHJpYnV0ZXMgIyMjIyNcbmhlYWRlciA9IG5ldyBIZWFkZXJcblx0eTogNDRcblx0dGl0bGU6IFwiSGVsbG8gV29ybGRcIlxuXHRzdWJUaXRsZTogXCIxNTAwIGl0ZW1zXCJcblx0aWNvbkxlZnQ6IFwiYmlnLWFycm93XCJcblx0aWNvblJpZ2h0OiBcImJhZ1wiXG5cdGxpbmtMZWZ0OiBcIkxlZnRcIlxuXHRsaW5rUmlnaHQ6IFwiUmlnaHRcIlxuXHRiYWc6IDJcblx0c2VhcmNoOiB0cnVlXG5cdG5vYmc6IHRydWUgXG5cblxuXHRcIlwiXCIiLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG4jIElucHV0cyBsaXN0XG4jIENyZWF0ZSBkZWZhdWx0IFNjcm9sbENvbXBvbmVudFxuc2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHR5OiBzdGF0dXNiYXIubWF4WVxuXHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRjb250ZW50SW5zZXQ6XG5cdFx0Ym90dG9tOiA0MFxuXHRcbmZOYW1lID0gbmV3IEZGSW5wdXRcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHRsYWJlbFRleHQ6IFwiRmlyc3QgbmFtZVwiXG5cdHBsYWNlaG9sZGVyVGV4dDogXCJQbGFjZWhvbGRlciB0ZXN0XCJcblxubE5hbWUgPSBuZXcgRkZJbnB1dFxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdGxhYmVsVGV4dDogXCJMYXN0IG5hbWVcIlxuXHRhZnRlcjogZk5hbWVcblxuY291bnRyeSA9IG5ldyBTZWxlY3RvclxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdGFmdGVyOiBsTmFtZVxuXHRsYWJlbFRleHQ6IFwiQ291bnRyeS9SZWdpb25cIlxuXHRcbmFkZHJlc3MxID0gbmV3IEZGSW5wdXRcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHRsYWJlbFRleHQ6IFwiQWRkcmVzcyBMaW5lIDFcIlxuXHRhZnRlcjogY291bnRyeVxuXG5hZGRyZXNzMiA9IG5ldyBGRklucHV0XG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblx0bGFiZWxUZXh0OiBcIkFkZHJlc3MgTGluZSAyXCJcblx0aGVscGVyVGV4dDogXCIrIEFkZCBhbm90aGVyIGxpbmVcIiBcblx0YWZ0ZXI6IGFkZHJlc3MxXG5cbmFkZHJlc3MyLmhlbHBlclRleHQucHJvcHMgPVxuXHRjb2xvcjogXCIjOGM4YzhjXCJcblx0dGV4dEFsaWduOiBcInJpZ2h0XCJcblxuY2l0eSA9IG5ldyBGRklucHV0XG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblx0bGFiZWxUZXh0OiBcIkNpdHlcIlxuXHRhZnRlcjogYWRkcmVzczJcblxuc3RhdGUgPSBuZXcgRkZJbnB1dFxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdGxhYmVsVGV4dDogXCJTdGF0ZSAob3B0aW9uYWwpXCJcblx0YWZ0ZXI6IGNpdHlcblx0XG5wb3N0YWxDb2RlID0gbmV3IEZGSW5wdXRcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHRsYWJlbFRleHQ6IFwiUG9zdGFsIENvZGVcIlxuXHRhZnRlcjogc3RhdGVcblxuc2Nyb2xsLnVwZGF0ZUNvbnRlbnQoKSAjIFVwZGF0ZSBzY3JvbGxcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyMjIyMgRGlmZmVyZW50IGV4YW1wbGVzIG9mIGJ1dHRvbnMgIyMjIyNcblxuYnRuID0gbmV3IEJ1dHRvblxuXHR0eXBlOiBcInByaW1hcnlcIlxuXHR0ZXh0OiBcIkhlbGxvIVwiXG5cdHg6IEFsaWduLmNlbnRlcigpXG5cdHk6IDEwMFxuXG5idG4yID0gbmV3IEJ1dHRvblxuXHR0eXBlOiBcInNlY29uZGFyeVwiXG5cdHRleHQ6IFwiWW8hXCJcblx0aWNvbjogXCJhcnJvdy1yaWdodFwiXG5cdHg6IEFsaWduLmNlbnRlcigpXG5cdHk6IGJ0bi5tYXhZICsgTV9zcGFjZXIgIyBWYXJpYWJsZXNcblxuYnRuMyA9IG5ldyBCdXR0b25cblx0dHlwZTogXCJ0YWdcIlxuXHR0ZXh0OiBcIlRoaXMgaXMgYXdlc29tZVwiXG5cdHg6IEFsaWduLmNlbnRlcigpXG5cdHk6IGJ0bjIubWF4WSArIE1fc3BhY2VyXG5cbmJ0bjQgPSBuZXcgQnV0dG9uXG5cdHR5cGU6IFwidGFnXCJcblx0dGV4dDogXCJUaGlzIGlzIGF3ZXNvbWVcIlxuXHRpY29uOiBcImNyb3NzXCJcblx0aWNvbkFsaWduOiBcImxlZnRcIlxuXHR4OiBBbGlnbi5jZW50ZXIoKVxuXHR5OiBidG4zLm1heFkgKyBNX3NwYWNlclxuXHRcbmJ0bjUgPSBuZXcgQnV0dG9uXG5cdHR5cGU6IFwicHJpbWFyeVwiXG5cdHRleHQ6IFwiSGVsbG8hXCJcblx0eDogQWxpZ24uY2VudGVyKClcblx0aWNvbjogXCJhcnJvdy1sZWZ0XCJcblx0aWNvbkFsaWduOiBcImxlZnRcIlxuXHR5OiBidG40Lm1heFkgKyBNX3NwYWNlclxuXG5idG42ID0gbmV3IEJ1dHRvblxuXHR0eXBlOiBcInRhZ1wiXG5cdHRleHQ6IFwiVGhpcyBpcyBhd2Vzb21lXCJcblx0aWNvbjogXCJjcm9zc1wiXG5cdHg6IEFsaWduLmNlbnRlcigpXG5cdHNpZGVQYWRkaW5nczogMTJcblx0eTogYnRuNS5tYXhZICsgTV9zcGFjZXJcblxuYnRuNyA9IG5ldyBCdXR0b25cblx0dHlwZTogXCJ0ZXJ0aWFyeVwiXG5cdHRleHQ6IFwiVGhpcyBpcyBhd2Vzb21lXCJcblx0eDogQWxpZ24uY2VudGVyKClcblx0eTogYnRuNi5tYXhZICsgTV9zcGFjZXJcblxuXHRcIlwiXCIiLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbiMgRml4ZWQgYnV0dG9uXG5idXR0b25GaXhlZCA9IG5ldyBCdXR0b25GaXhlZFxuXHR0ZXh0OiBcIkFkZCB0byBiYXNrZXRcIlxuXHRcIlwiXCIiLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG4jIFNpbXBsZSBhY3Rpb24gc2hlZXQgZXhhbXBsZVxuYnRuQSA9IG5ldyBCdXR0b25cblx0dGV4dDogXCJTaG93IGFjdGlvbiBzaGVldFwiXG5cdHk6IDEwMCwgeDogQWxpZ24uY2VudGVyXG5cbmFjdGlvblNoZWV0ID0gbmV3IEFjdGlvblNoZWV0XG5cdGNvbnRlbnQ6IG15X2FjdGlvbnNoZWV0X2NvbnRlbnRcblx0YnV0dG9uOlxuXHRcdHRleHQ6IFwiUHVyY2hhc2VcIlxuXHRcdHdpZHRoOiAxMTZcblx0XHR2aXNpYmxlOiBmYWxzZVxuXHR0aXRsZTpcblx0XHR2aXNpYmxlOiB0cnVlXG5cdFx0dGV4dDogXCJIZWxsbyFcIlxuXG5idG5BLm9uVGFwIC0+XG5cdGFjdGlvblNoZWV0LnNob3coKVxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cbiMgQWNjb3JkaW9uIGV4YW1wbGVcbmFjY29yZGlvbkEgPSBuZXcgQWNjb3JkaW9uXG5cdGV4cGFuZGVkOiB0cnVlXG5cdGxhYmVsVGV4dDogXCJEZXNjcmlwdGlvblwiXG5cbiMgQWNjb3JkaW9uIHdpdGggeW91ciBjb250ZW50IFxuIyAocGFzdGUgdGVyZ2V0ZWQgZnJhbWUgZnJvbSBkZXNpZ24gbW9kZSlcbmFjY29yZGlvbkIgPSBuZXcgQWNjb3JkaW9uXG5cdHk6IGFjY29yZGlvbkEubWF4WVxuXHRleHBhbmRlZDogdHJ1ZVxuXHRsYWJlbFRleHQ6IFwiRGVzY3JpcHRpb25cIlxuXHRjb250ZW50OiBhY2NfZGVzY3JpcHRpb25fY29uZXRlbnRcblxuXHRcIlwiXCJcbiIsIiMgU2l6ZSB2YXJpYWJsZXMgZnJvbSBEZXNpZ24gbW9kZVxud2luZG93Lkxfc3BhY2VyID0gc2l6ZXNfdmFyaWFibGVzLnNlbGVjdENoaWxkKFwiTFwiKS53aWR0aFxud2luZG93Lk1fc3BhY2VyID0gc2l6ZXNfdmFyaWFibGVzLnNlbGVjdENoaWxkKFwiTVwiKS53aWR0aFxud2luZG93LlNfc3BhY2VyID0gc2l6ZXNfdmFyaWFibGVzLnNlbGVjdENoaWxkKFwiU1wiKS53aWR0aFxud2luZG93LlhTX3NwYWNlciA9IHNpemVzX3ZhcmlhYmxlcy5zZWxlY3RDaGlsZChcIlhTXCIpLndpZHRoXG53aW5kb3cuWFhTX3NwYWNlciA9IHNpemVzX3ZhcmlhYmxlcy5zZWxlY3RDaGlsZChcIlhYU1wiKS53aWR0aFxud2luZG93LlhYWFNfc3BhY2VyID0gc2l6ZXNfdmFyaWFibGVzLnNlbGVjdENoaWxkKFwiWFhYU1wiKS53aWR0aCIsIiMgSGlkZSBoaW50c1xuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuIyBGdW5jdGlvbiBkZXN0b3J5IGFsbCBzZWxlY3RlZCBsYXllcnMgZnJvbSBpbnNwZWN0b3IgZnJvbSBEZXNpZ24gbW9kZVxuZGVzdHJveUluc3BlY3RvckxheWVycyA9IC0+XG5cdEZGS2l0X2NvbXBvbmVudHMuZGVzdHJveSgpXG5cdEZGS2l0X3VuaXRzLmRlc3Ryb3koKVxuXHRGRktpdF90eXBlX3N0eWxlcy5kZXN0cm95KClcblxuIyBDb21iaW5lZCBzZXR1cCBmdW5jdGlvbnMgXG5leHBvcnRzLnNldHVwID0gLT5cblx0ZGVzdHJveUluc3BlY3RvckxheWVycygpXG5cbiMgQ29uZmlnIGZvciBzZWxlY3RJbWFnZSgpXG53aW5kb3cuZGVmYXVsdEFQSUltYWdlU2l6ZSA9IFwiMzAwXCJcbndpbmRvdy5kZWZhdWx0QVBJSW1hZ2VPcmRlciA9IDFcbndpbmRvdy51c2VFeHRlcm5hbEltYWdlcyA9IGZhbHNlICMgdHJ1ZSwgZmFsc2UgXG5cbiMgRGVmaW5pbmcgdmFyICckJyB0aGF0IHJlcHJlc2VuZ3RzIHBhdGggdG8gY29udGVudCBmb2xkZXIgXG53aW5kb3cuJCA9IFwibW9kdWxlcy9GRktpdC9jb250ZW50L1wiXG5cbiMgTG9hZCBnbG9iYWwgaGVscGVyIGZ1bmN0aW9uc1xucmVxdWlyZSBcIkZGS2l0L2hlbHBlci1mdW5jdGlvbnMvYWRkQ2hpbGRyZW5cIiBcbnJlcXVpcmUgXCJGRktpdC9oZWxwZXItZnVuY3Rpb25zL3RhcmdldERlc2lnbk1vZGVcIlxucmVxdWlyZSBcIkZGS2l0L2hlbHBlci1mdW5jdGlvbnMvcG9zaXRpb25BZnRlclwiXG5cbiMgQXJyYXkgMVxud2luZG93LndvbWVuUG9yb2R1Y3RzID0gW1xuXHRcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzAxLmpwZ1wiLFxuXHRcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzAyLmpwZ1wiLFxuXHRcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzAzLmpwZ1wiLFxuXHRcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzA0LmpwZ1wiLFxuXHRcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzA1LmpwZ1wiLFxuXHRcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzA2LmpwZ1wiLFxuXHRcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzA3LmpwZ1wiLFxuXHRdIiwiIyB3aW5kb3cuRkZUZXh0ID1cbiMgXHRYTEJvbGQ6IFwiYm9sZFRpdGxlXCJcbiMgXHRMOiBcImxhcmdlVGl0bGVcIlxuIyBcdExCb2xkOiBcInRpdGxlMVwiXG4jIFx0TTogXCJ0aXRsZTFcIlxuIyBcdE1Db25kZW5zZWQ6IFwidGl0bGUyXCJcbiMgXHRNQm9sZDogXCJ0aXRsZTNcIlxuIyBcdFNCb2xkOiBcImhlYWRsaW5lXCJcbiMgXHRTOiBcImJvZHlcIlxuIyBcdFhTQm9sZDogXCJjYWxsb3V0XCJcbiMgXHRYUzogXCJzdWJoZWFkXCJcblxuXG5jbGFzcyB3aW5kb3cuRkZUZXh0TGF5ZXIgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0PXt9KSAtPlxuXHRcdEBvcHQgPSBfLmRlZmF1bHRzIHt9LCBAb3B0LFxuI1x0XHRcdHRleHRTdHlsZTogUG9sYXJpc1xuI1x0XHRcdGZvbnRTaXplOiAxN1xuI1x0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0Y29sb3I6IFwiIzIyMjIyMlwiXG5cblx0XHQjIFRleHRMYXllciBpZ25vcmVzIGFueSBmb250IGNoYW5nZXMgZHVyaW5nIGNvbnN0cnVjdGlvbiwgc28gZGVsYXkgc2V0dGluZyB0aGUgc3R5bGUgdW50aWwgYWZ0ZXIgc3VwZXJcblx0XHR0ZXh0U3R5bGUgPSBAb3B0LnRleHRTdHlsZVxuXHRcdEBvcHQudGV4dFN0eWxlID0gbnVsbFxuXG5cdFx0c3VwZXIgQG9wdFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBALCBAb3B0LnkpXG5cblxuXHRcdEB0ZXh0U3R5bGUgPSB0ZXh0U3R5bGVcblxuXHRAZGVmaW5lIFwidGV4dFN0eWxlXCIsXG5cdFx0Z2V0OiAtPiBAX3RleHRTdHlsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF90ZXh0U3R5bGUgPSB2YWx1ZVxuXHRcdFx0QF91cGRhdGVTdHlsZSgpXG5cblx0X3VwZGF0ZVN0eWxlOiAtPlxuXHRcdHN0eWxlcyA9XG5cdFx0XHRYTEJvbGQ6XG5cdFx0XHRcdGZvbnRTaXplOiAyNlxuI1x0XHRcdFx0bGluZUhlaWdodDogMzJcblx0XHRcdFx0Zm9udFdlaWdodDogODAwXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiUG9sYXJpc1wiXG5cdFx0XHRMOlxuXHRcdFx0XHRmb250U2l6ZTogMThcbiNcdFx0XHRcdGxpbmVIZWlnaHQ6IDI4XG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0XHRmb250RmFtaWx5OiBcIlBvbGFyaXNcIlxuXHRcdFx0TEJvbGQ6XG5cdFx0XHRcdGZvbnRTaXplOiAxOFxuI1x0XHRcdFx0bGluZUhlaWdodDogMjhcblx0XHRcdFx0Zm9udFdlaWdodDogODAwXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiUG9sYXJpc1wiXG5cdFx0XHRNOlxuXHRcdFx0XHRmb250U2l6ZTogMTVcbiNcdFx0XHRcdGxpbmVIZWlnaHQ6IDIyXG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0XHRmb250RmFtaWx5OiBcIlBvbGFyaXNcIlxuXHRcdFx0TUNvbmQ6XG5cdFx0XHRcdGZvbnRTaXplOiAxNFxuI1x0XHRcdFx0bGluZUhlaWdodDogMjNcblx0XHRcdFx0Zm9udFdlaWdodDogNzAwXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IDEuNlxuXHRcdFx0XHRmb250RmFtaWx5OiBcIlBvbGFyaXMgQ29uZGVuc2VkXCJcblx0XHRcdFx0dGV4dFRyYW5zZm9ybTogXCJ1cHBlcmNhc2VcIlxuXHRcdFx0TUJvbGQ6XG5cdFx0XHRcdGZvbnRTaXplOiAxNVxuI1x0XHRcdFx0bGluZUhlaWdodDogMjJcblx0XHRcdFx0Zm9udFdlaWdodDogODAwXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiUG9sYXJpc1wiXG5cdFx0XHRTQm9sZDpcblx0XHRcdFx0Zm9udFNpemU6IDEyXG4jXHRcdFx0XHRsaW5lSGVpZ2h0OiAxOFxuXHRcdFx0XHRmb250V2VpZ2h0OiA4MDBcdFx0XG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiUG9sYXJpc1wiXG5cdFx0XHRTOlxuXHRcdFx0XHRmb250U2l6ZTogMTJcbiNcdFx0XHRcdGxpbmVIZWlnaHQ6IDE4XG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0XHRmb250RmFtaWx5OiBcIlBvbGFyaXNcIlxuXHRcdFx0WFNCb2xkOlxuXHRcdFx0XHRmb250U2l6ZTogMTBcbiNcdFx0XHRcdGxpbmVIZWlnaHQ6IDE2XG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDgwMFxuXHRcdFx0XHRmb250RmFtaWx5OiBcIlBvbGFyaXNcIlx0XG5cdFx0XHRYUzpcblx0XHRcdFx0Zm9udFNpemU6IDEwXG4jXHRcdFx0XHRsaW5lSGVpZ2h0OiAxNlxuXHRcdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdFx0Zm9udEZhbWlseTogXCJQb2xhcmlzXCJcblxuXHRcdEBwcm9wcyA9IHN0eWxlc1tAdGV4dFN0eWxlXVxuIiwiIyMjIyMjIyMjIyMjIyMgQ2F0ZWdvcmllcyBQYWdlICMjIyMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LkRlc2lnbmVyc1BhZ2UgZXh0ZW5kcyBMYXllclxuIyMjIyBJbml0aWFsIGZyYW1lIGNvbnN0cnVjdG9yICMjIyNcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcdFx0Y29udGVudDogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9kZXNpZ25lcnMuanNvblwiXG5cdFx0XHRhY3Rpb25zOiB7XG5cdFx0XHRcdFwiMjY4MjA4MlwiOiAtPiBwcmludCBcIlRhcCFcIlxuXHRcdFx0XHRcIjE4NTY2M1wiOiAtPiBwcmludCBcIkFuZCBhbm90aGVyIHRhcCFcIlxuXHRcdFx0fVxuXHRcdFxuXHRcdGNvbnRlbnRBcnIgPSBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyBAb3B0LmNvbnRlbnRcblx0XHR1bmlvbkFyciA9IGNvbnRlbnRBcnIud29tZW4uY29uY2F0KGNvbnRlbnRBcnIubWVuLCBjb250ZW50QXJyLmtpZHMpXG5cdFx0XG5cdFx0IyMjIyMjIENyZWF0ZSBsZXR0ZXJzIGFycmF5ICMjIyMjIyNcblx0XHRsZXR0ZXJzQXJyID0gW11cblx0XHRmb3IgY2hpbGQgaW4gdW5pb25BcnJcblx0XHRcdGlmIGlzTmFOIGNoaWxkLm5hbWUuY2hhckF0KDApXG5cdFx0XHRcdGxldHRlcnNBcnIucHVzaCBjaGlsZC5uYW1lLmNoYXJBdCgwKVxuXHRcdFxuXHRcdGxldHRlcnNBcnIuc29ydCAoYSwgYikgLT5cblx0XHRcdGEgPiBiXG5cdFx0XHRcblx0XHRsZXR0ZXJzQXJyLnNoaWZ0KClcblx0XHRsZXR0ZXJzQXJyLnB1c2goXCIjXCIpXG5cdFx0bGV0dGVyc0FyciA9IF8udW5pcSBsZXR0ZXJzQXJyXG5cblx0XHQjIyMjIyMgY3JyZWF0ZSBsYXllcnMgIyMjIyMjXG5cdFx0QGhlYWRlciA9IG5ldyBIZWFkZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eTogc3dpdGNoIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZVxuXHRcdFx0XHR3aGVuIFwiYXBwbGUtaXBob25lLXgtc3BhY2UtZ3JheVwiLCBcImFwcGxlLWlwaG9uZS14LXNpbHZlclwiIHRoZW4gNDQgXG5cdFx0XHRcdGVsc2UgMjBcblx0XHRcdG5hbWU6IFwiY2F0ZWdvcmllcyBoZWFkZXJcIlxuXHRcdFx0dGl0bGU6IFwiRGVzaWduZXJzXCJcblx0XHRcdGljb25MZWZ0OiBcImJpZy1hcnJvd1wiXG5cdFx0XG5cdFx0QHJlZmluZVdyYXAgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0bmFtZTogXCJyZWZpbmUgd3JhcFwiXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IHJlZmluZV9maWx0ZXIuaGVpZ2h0XG5cdFx0XHR5OiBAaGVhZGVyLm1heFlcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XG5cdFx0QHJlZmluZUJ0biA9IHJlZmluZV9maWx0ZXIuc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uXCIpLmNvcHkoKVxuXHRcdEByZWZpbmVCdG4ucHJvcHMgPSBcblx0XHRcdHBhcmVudDogQHJlZmluZVdyYXBcblx0XHRcdHk6IEFsaWduLmNlbnRlcigpXG5cdFx0XHR4OiBNX3NwYWNlclxuXHRcdFxuXHRcdEByZWZpbmVCdG4uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIikud2lkdGggPSBAcmVmaW5lQnRuLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpLndpZHRoICsgMlxuXHRcdFxuXHRcdEBzY3JvbGxDbXAgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwic2Nyb2xsIGNvbXBcIlxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0aGVpZ2h0OiBAaGVpZ2h0IC0gQGhlYWRlci5tYXhZXG5cdFx0XHR5OiBAaGVhZGVyLm1heFlcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRjb250ZW50SW5zZXQ6XG5cdFx0XHRcdHRvcDogQHJlZmluZVdyYXAuaGVpZ2h0ICsgWFNfc3BhY2VyXG5cdFx0XG5cdFx0QC5vbiBcImNoYW5nZTpmcmFtZVwiLCA9PlxuXHRcdFx0QHNjcm9sbENtcC5jb250ZW50SW5zZXQgPVxuXHRcdFx0XHR0b3A6IEByZWZpbmVXcmFwLmhlaWdodCArIFhTX3NwYWNlclxuXHRcdFx0XG5cdFx0XHRAc2Nyb2xsQ21wLnNjcm9sbFBvaW50ID1cblx0XHRcdFx0eTogQHNlYXJjaElucHV0LmhlaWdodFxuXHRcdFx0XHRcdFxuXHRcdEBzZWFyY2hJbnB1dCA9IG5ldyBTZWFyY2hJbnB1dFxuXHRcdFx0bmFtZTogXCJzZWFyY2ggaW5wdXRcIlxuXHRcdFx0cGFyZW50OiBAc2Nyb2xsQ21wLmNvbnRlbnRcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGggLSBNX3NwYWNlclxuXHRcdFx0eTogWFNfc3BhY2VyXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIoKVxuXHRcdFx0cGxhY2Vob2xkZXI6IFwiU2VhcmNoIGZvciBhIGRlc2lnbmVyXCJcblx0XHRcblx0XHRAc2Nyb2xsQ21wLnNjcm9sbFBvaW50ID1cblx0XHRcdHk6IEBzZWFyY2hJbnB1dC5oZWlnaHRcblx0XHRcdFxuXHRcdEByZWZpbmVXcmFwLmJyaW5nVG9Gcm9udCgpXG5cdFx0XG5cdFx0c2VjdGlvbnNBcnIgPSBbXVxuXHRcdFxuXHRcdGZvciBpdGVtLCBpIGluIGxldHRlcnNBcnJcblx0XHRcdEBbXCIje2l0ZW19SGVhZGVyXCJdID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQHNjcm9sbENtcC5jb250ZW50XG5cdFx0XHRcdG5hbWU6IFwiI3tpdGVtfUhlYWRlclwiXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdFx0aGVpZ2h0OiA2NFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcdFx0XHRcblx0XHRcdEBbXCIje2l0ZW19U2VjdGlvblwiXSA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiBcIiN7aXRlbX1TZWN0aW9uXCJcblx0XHRcdFx0cGFyZW50OiBAc2Nyb2xsQ21wLmNvbnRlbnRcblx0XHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0XG5cdFx0XHRzZWN0aW9uc0Fyci5wdXNoKEBbXCIje2l0ZW19U2VjdGlvblwiXSlcblx0XHRcdFxuXHRcdFx0aGVhZGVyTGV0dGVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0XHR4OiBNX3NwYWNlciwgeTogTV9zcGFjZXJcblx0XHRcdFx0cGFyZW50OiBAW1wiI3tpdGVtfUhlYWRlclwiXVxuXHRcdFx0XHR0ZXh0OiBpdGVtXG5cdFx0XHRcdHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCJcblx0XHRcdFx0Zm9udEZhbWlseTogXCJQb2xhcmlzLUJvbGRcIlxuXHRcdFx0XHRjb2xvcjogXCIjMjIyMjIyXCJcblx0XHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XG5cdFx0aXRlbXNBcnJheSA9IFtdXG5cdFx0XG5cdFx0Zm9yIGNoaWxkLCBpIGluIHVuaW9uQXJyXG5cdFx0XHRmb3IgaSBpbiBsZXR0ZXJzQXJyXG5cdFx0XHRcdGlmIGkgaXMgY2hpbGQubmFtZS5jaGFyQXQoMClcblx0XHRcdFx0XHRAW1wiI3tjaGlsZC5pZH1cIl0gPSBuZXcgTGlzdEl0ZW1cblx0XHRcdFx0XHRcdG5hbWU6IFwiI3tjaGlsZC5pZH1cIlxuXHRcdFx0XHRcdFx0cGFyZW50OiBAW1wiI3tpfVNlY3Rpb25cIl1cblx0XHRcdFx0XHRcdHRleHQ6IGNoaWxkLm5hbWVcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpdGVtc0FycmF5LnB1c2goQFtcIiN7Y2hpbGQuaWR9XCJdKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0aWYgIWlzTmFOIGNoaWxkLm5hbWUuY2hhckF0KDApXG5cdFx0XHRcdEBbXCIje2NoaWxkLmlkfVwiXSA9IG5ldyBMaXN0SXRlbVxuXHRcdFx0XHRcdG5hbWU6IFwiI3tjaGlsZC5pZH1cIlxuXHRcdFx0XHRcdHBhcmVudDogQFtcIiNTZWN0aW9uXCJdXG5cdFx0XHRcdFx0dGV4dDogY2hpbGQubmFtZVxuXHRcdFx0XHRcblx0XHRcdFx0aXRlbXNBcnJheS5wdXNoKEBbXCIje2NoaWxkLmlkfVwiXSlcblx0XHRcdFxuXHRcdGFjdGlvbnNBcnIgPSBAb3B0LmFjdGlvbnNcblx0XHRmb3IgY2hpbGQsIGkgaW4gaXRlbXNBcnJheVxuXHRcdFx0Y2hpbGQub25UYXAgLT5cblx0XHRcdFx0Y29uc29sZS5sb2coQG5hbWUpXG5cdFx0XHRcdGlmIHR5cGVvZiBhY3Rpb25zQXJyW1wiI3tAbmFtZX1cIl0gaXMgXCJmdW5jdGlvblwiXG5cdFx0XHRcdFx0YWN0aW9uc0FycltcIiN7QG5hbWV9XCJdKClcblx0XHRcblx0XHRmb3IgaXRlbSwgaSBpbiBzZWN0aW9uc0FyclxuXHRcdFx0bmV3UG9zID0gMFxuXHRcdFx0Zm9yIGksIGogaW4gaXRlbS5jaGlsZHJlblxuXHRcdFx0XHRpLnkgPSBuZXdQb3Ncblx0XHRcdFx0bmV3UG9zID0gaS5tYXhZXG5cdFx0XHRcdFxuXHRcdFx0aXRlbS5oZWlnaHQgPSBpdGVtLmNoaWxkcmVuLnNsaWNlKC0xKVswXS5tYXhZXG5cdFx0XG5cdFx0c2VjdGlvbnNBcnIgPSB1bmlvbkFyciA9IFtdXG5cdFx0XG5cdFx0Zm9yIGl0ZW0sIGkgaW4gQHNjcm9sbENtcC5jb250ZW50LmNoaWxkcmVuXG5cdFx0XHRpdGVtLnkgPSBuZXdZcG9zXG5cdFx0XHRuZXdZcG9zID0gaXRlbS5tYXhZXG5cdFx0XG5cdFx0QHNpZGVBbHBoYWJldCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6IFwic2lkZUFscGhhYmV0XCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoKVxuXHRcdFx0eTogQWxpZ24uY2VudGVyKClcblx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0dGV4dDogXCIje2xldHRlcnNBcnIuam9pbihcIiBcIil9XCJcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0d2lkdGg6IDEyXG5cdFx0XHR0ZXh0VHJhbnNmb3JtOiBcInVwcGVyY2FzZVwiXG5cdFx0XG5cdFx0IyMjIyBSZWZpbmUgUGFnZSAjIyMjXG5cdFx0QHJlZmluZVBhZ2UgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0aGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcdFxuXHRcdEByZWZpbmVQYWdlLnkgPSBBbGlnbi5ib3R0b20oQHJlZmluZVBhZ2UuaGVpZ2h0KVxuXHRcdFxuXHRcdEByZWZpbmVQYWdlLnN0YXRlcyA9XG5cdFx0XHRzdGF0ZUE6XG5cdFx0XHRcdHk6IDBcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IDAuNFxuXHRcdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDAuOSlcblx0XHRcblx0XHRAcmVmaW5lUGFnZUhlYWRlciA9IG5ldyBIZWFkZXJcblx0XHRcdHBhcmVudDogQHJlZmluZVBhZ2Vcblx0XHRcdGljb25MZWZ0OiBcImJpZy1jcm9zc1wiXG5cdFx0XHR0aXRsZTogXCJSZWZpbmVcIlxuXHRcdFx0eTogc3dpdGNoIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZVxuXHRcdFx0XHR3aGVuIFwiYXBwbGUtaXBob25lLXgtc3BhY2UtZ3JheVwiLCBcImFwcGxlLWlwaG9uZS14LXNpbHZlclwiIHRoZW4gNDQgXG5cdFx0XHRcdGVsc2UgMjBcblx0XHRcblx0XHRAcmVmaW5lU2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0cGFyZW50OiBAcmVmaW5lUGFnZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdGhlaWdodDogQGhlaWdodCAtIChAcmVmaW5lUGFnZUhlYWRlci5tYXhZICsgU19zcGFjZXIpXG5cdFx0XHR5OiBAcmVmaW5lUGFnZUhlYWRlci5tYXhZICsgU19zcGFjZXJcblx0XHRcblx0XHRAZ2VuZGVyVGl0bGUgPSBuZXcgTGlzdFRpdGxlXG5cdFx0XHRwYXJlbnQ6IEByZWZpbmVTY3JvbGwuY29udGVudFxuXHRcdFx0dGV4dDogXCJHZW5kZXJcIlxuXHRcdFxuXHRcdEBnZW5kZXJSYWRpb1NlbGVjdCA9IG5ldyBMaXN0UmFkaW9TZWxlY3Rcblx0XHRcdHk6IEBnZW5kZXJUaXRsZS5tYXhZXG5cdFx0XHRwYXJlbnQ6IEByZWZpbmVTY3JvbGwuY29udGVudFxuXHRcdFx0c2VsZWN0QXJyYXk6IFtcblx0XHRcdFx0e3RleHQgOiBcIldvbWVuXCIsIG9uOiB0cnVlfSwgXG5cdFx0XHRcdHt0ZXh0IDogXCJNZW5cIn1cblx0XHRcdFx0e3RleHQ6IFwiS2lkc1wifVxuXHRcdFx0XVxuXHRcdFxuXHRcdEBmaWx0ZXJCeVR0aXRsZSA9IG5ldyBMaXN0VGl0bGVcblx0XHRcdHBhcmVudDogQHJlZmluZVNjcm9sbC5jb250ZW50XG5cdFx0XHR0ZXh0OiBcIkZpbHRlciBCeVwiXG5cdFx0XHR5OiBAZ2VuZGVyUmFkaW9TZWxlY3QubWF4WSArIE1fc3BhY2VyXG5cdFx0XG5cdFx0QGZpbHRlckl0ZW1BID0gbmV3IExpc3RJdGVtXG5cdFx0XHRwYXJlbnQ6IEByZWZpbmVTY3JvbGwuY29udGVudFxuXHRcdFx0eTogQGZpbHRlckJ5VHRpdGxlLm1heFlcblx0XHRcdHJpZ2h0OiBcInNtYWxsLXRpY2tcIlxuXHRcdFx0dGV4dDogXCJDdXJyZW50IHNlYXNvblwiXG5cdFx0XG5cdFx0QGZpbHRlckl0ZW1CID0gbmV3IExpc3RJdGVtXG5cdFx0XHRwYXJlbnQ6IEByZWZpbmVTY3JvbGwuY29udGVudFxuXHRcdFx0eTogQGZpbHRlckl0ZW1BLm1heFlcblx0XHRcdHRleHQ6IFwiU2FsZSBvbmx5XCJcblx0XHRcblx0XHRAZmlsdGVySXRlbUMgPSBuZXcgTGlzdEl0ZW1cblx0XHRcdHBhcmVudDogQHJlZmluZVNjcm9sbC5jb250ZW50XG5cdFx0XHR5OiBAZmlsdGVySXRlbUIubWF4WVxuXHRcdFx0dGV4dDogXCJGYXZvdXJpdGUgZGVzaWduZXJzXCJcdFxuXHRcdFxuXHRcdEBmaXhlZEJ0biA9IG5ldyBCdXR0b25GaXhlZFxuXHRcdFx0cGFyZW50OiBAcmVmaW5lUGFnZVxuXHRcdFx0dGV4dDogXCJTaG93IGRlc2lnbmVyc1wiXG5cdFx0XG5cdFx0QGZpeGVkQnRuLmZpeGVkX2J0bi53aWR0aCA9IDIyMFxuXHRcdEBmaXhlZEJ0bi5maXhlZF9idG4ueCA9IEFsaWduLmNlbnRlcigpXG5cdFx0XG5cdFx0IyBBY3Rpb25zXG5cdFx0QHJlZmluZUJ0bi5vblRhcCA9PlxuXHRcdFx0QHJlZmluZVBhZ2UuYW5pbWF0ZShcInN0YXRlQVwiKVxuXHRcdFxuXHRcdEByZWZpbmVQYWdlSGVhZGVyLmljb25MZWZ0X2xheWVyLm9uVGFwID0+XG5cdFx0XHRAcmVmaW5lUGFnZS5hbmltYXRlKFwiZGVmYXVsdFwiKSIsIiMjIyMjIyMjIyMjIyMjIENhdGVnb3JpZXMgUGFnZSAjIyMjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5DYXRlZ29yaWVzUGFnZSBleHRlbmRzIExheWVyXG5cdCMgSW5pdGlhbCBmcmFtZSBjb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRjb250ZW50OiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L2NhdGVnb3JpZXMuanNvblwiXG5cdFx0XHRhY3Rpb25zOiB7XG5cdFx0XHRcdFwiaXRlbTFcIjogLT4gcHJpbnQgXCJUYXAhXCJcblx0XHRcdH1cblx0XHRcblx0XHRAaGVhZGVyID0gbmV3IEhlYWRlclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR5OiBzd2l0Y2ggRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXG5cdFx0XHRcdHdoZW4gXCJhcHBsZS1pcGhvbmUteC1zcGFjZS1ncmF5XCIsIFwiYXBwbGUtaXBob25lLXgtc2lsdmVyXCIgdGhlbiA0NCBcblx0XHRcdFx0ZWxzZSAyMFxuXHRcdFx0bmFtZTogXCJjYXRlZ29yaWVzIGhlYWRlclwiXG5cdFx0XHR0aXRsZTogXCJDYXRlZ29yaWVzXCJcblx0XHRcdGljb25MZWZ0OiBcImJpZy1hcnJvd1wiXG5cblx0XHRAdGFicyA9IG5ldyBUYWJzXG5cdFx0XHRuYW1lOiBcInRhYnNcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR5OiBAaGVhZGVyLm1heFkgKyBTX3NwYWNlclxuXHRcdFxuXHRcdEBjYXRlZ29yaWVzTGlzdCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdG5hbWU6IFwiY2F0ZWdvcmllcyBsaXN0XCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eTogQHRhYnMubWF4WSArIFNfc3BhY2VyXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0IC0gQHRhYnMubWF4WSAtIFNfc3BhY2VyXG5cdFx0XG5cdFx0bmV3Q29udGVudEFyciA9IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIChAb3B0LmNvbnRlbnQpXG5cblx0XHRzaG93SXRlbXMoQCwgbmV3Q29udGVudEFyci53b21lbilcblx0XHRcblx0XHQjIyMjIFRhcCBvbiBHZW5kZXIgc2VsZWN0aW9uICMjIyNcblx0XHRmb3IgaXRlbSBpbiBAdGFicy5uZXdJdGVtc0FyclxuXHRcdFx0aXRlbS5vblRhcCA9PlxuXHRcdFx0XHRmb3IgY2hpbGQgaW4gQGNhdGVnb3JpZXNMaXN0LmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdFx0XHRjaGlsZC5kZXN0cm95KClcblx0XHRcdFx0XG5cdFx0XHRcdHN3aXRjaCBAdGFicy5jdXJyZW50SXRlbVxuXHRcdFx0XHRcdHdoZW4gXCJ3b21lblwiXG5cdFx0XHRcdFx0XHRzaG93SXRlbXMoQCwgbmV3Q29udGVudEFyci53b21lbilcblx0XHRcdFx0XHR3aGVuIFwibWVuXCJcblx0XHRcdFx0XHRcdHNob3dJdGVtcyhALCBuZXdDb250ZW50QXJyLm1lbilcblx0XHRcdFx0XHR3aGVuIFwia2lkc1wiXG5cdFx0XHRcdFx0XHRzaG93SXRlbXMoQCwgbmV3Q29udGVudEFyci5raWRzKVxuXHRcdFxuXHQjIyMjIE1ldGhvZHMgIyMjI1x0XG5cdHNob3dJdGVtcyA9IChwYXJlbnQsIGNvbnRlbnRBcnIpIC0+XG5cdFx0Zm9yIGNoaWxkIGluIGNvbnRlbnRBcnJcblx0XHRcdHBhcmVudC5jYXRlZ29yaWVzTGlzdC5jb250ZW50W1wiI3tjaGlsZC5pZH1cIl0gPSBuZXcgTGlzdEl0ZW1cblx0XHRcdFx0bmFtZTogY2hpbGQuaWRcblx0XHRcdFx0cGFyZW50OiBwYXJlbnQuY2F0ZWdvcmllc0xpc3QuY29udGVudFxuXHRcdFx0XHR0ZXh0OiBjaGlsZC5uYW1lXG5cdFx0XHRcdHJpZ2h0OiBcImFycm93LXJpZ2h0XCJcblx0XHRcdFxuXHRcdFx0cGFyZW50LmNhdGVnb3JpZXNMaXN0LmNvbnRlbnRbXCIje2NoaWxkLmlkfVwiXS55ID0gbmV4dFBvc1lcblx0XHRcdG5leHRQb3NZID0gcGFyZW50LmNhdGVnb3JpZXNMaXN0LmNvbnRlbnRbXCIje2NoaWxkLmlkfVwiXS5tYXhZXG5cdFx0XHRcdFxuXHRcdFx0cGFyZW50LmNhdGVnb3JpZXNMaXN0LmNvbnRlbnRbXCIje2NoaWxkLmlkfVwiXS5vblRhcCAtPlxuXHRcdFx0XHRpZiB0eXBlb2YgcGFyZW50Lm9wdC5hY3Rpb25zW1wiI3tAbmFtZX1cIl0gaXMgXCJmdW5jdGlvblwiXG5cdFx0XHRcdFx0cGFyZW50Lm9wdC5hY3Rpb25zW1wiI3tAbmFtZX1cIl0oKSIsIiPwn5qm4pqZ77iPICBIZWxwZXIgRnVuY3Rpb24gLSB0YXJnZXREZXNpZ25Nb2RlXG5cbndpbmRvdy50YXJnZXREZXNpZ25Nb2RlID0gKHRhcmdldCwgZnJhbWUpIC0+XG5cdCMgZm9yIGNoaWxkcmVuLCBpIGluIGNoaWxkcmVuQXJyYXlcblx0IyBcdGNoaWxkcmVuLnBhcmVudCA9IHBhcmVudFxuXHRmcmFtZS54ID0gdGFyZ2V0Lnhcblx0ZnJhbWUueSA9IHRhcmdldC55XG5cdGZyYW1lLnNpemUgPSB0YXJnZXQuc2l6ZVxuXHRmcmFtZS5wYXJlbnQgPSB0YXJnZXQucGFyZW50XG5cdHRhcmdldC5kZXN0cm95KClcbiIsIiMg8J+apuKame+4jyBIZWxwZXIgRnVuY3Rpb25zIOKAlCBzZWxlY3RJbWFnZSwgc2VsZWN0UmFuZG9tSW1hZ2VcbndpbmRvdy5zZWxlY3RJbWFnZSA9IChhcnJheSwgaW1hZ2VPcmRlciA9IGRlZmF1bHRBUElJbWFnZU9yZGVyKSAtPlxuXHRcblx0aWYgYXJyYXkubGVuZ3RoID09IDBcblx0XHRyZXR1cm4gXCJcIlxuXHRcblx0aWYgYXJyYXkubGVuZ3RoID4gMVxuXHRcdGZpbHRlcmVkSW1hZ2VzID0gYXJyYXkuZmlsdGVyIChpbWFnZSkgLT4gaW1hZ2Uub3JkZXIgPT0gaW1hZ2VPcmRlciAmJiBpbWFnZS5zaXplID09IGRlZmF1bHRBUElJbWFnZVNpemVcblx0XHRcblx0XHRpZiBmaWx0ZXJlZEltYWdlcy5sZW5ndGggPiAwXG5cdFx0XHRzZWxlY3RlZEltYWdlID0gZmlsdGVyZWRJbWFnZXNbMF1cblx0XHRlbHNlXG5cdFx0XHRzZWxlY3RlZEltYWdlID0gYXJyYXlbMF1cblx0ZWxzZVxuXHRcdHNlbGVjdGVkSW1hZ2UgPSBhcnJheVswXVxuXHRcdFxuXHRyZXR1cm4gc2VsZWN0ZWRJbWFnZS51cmwiLCIjIEhlbHBlciBGdW5jdGlvbiAtIHBhcmFsYXhPblNjcm9sbFxuZXhwb3J0cy5wYXJhbGF4T25TY3JvbGwgPSAodW5pdCkgLT5cblx0IyBDaGVjayBpZiBwYXJlbnQgb2YgdGhlIHVuaXQgaXMgU2Nyb2xsQ29tcG9uZW50XG5cdGlmIHVuaXQucGFyZW50IGFuZCB1bml0LnBhcmVudC5uYW1lIGlzIFwiY29udGVudFwiXG5cdFx0aWYgdW5pdC5wYXJlbnQucGFyZW50LmNvbnN0cnVjdG9yLm5hbWUgaXMgXCJTY3JvbGxDb21wb25lbnRcIlxuXHRcdFx0XHR1bml0LnBhcmVudC5wYXJlbnQub24gRXZlbnRzLk1vdmUsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHRcdFx0eSA9IHVuaXQucGFyZW50LnkgKyB1bml0Lnlcblx0XHRcdFx0XHR1bml0LnNlbGVjdENoaWxkKCdpbWFnZScpLnkgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdFx0XHRcdHksIFx0XHQgICAjIEEgdmFyaWFibGUsIHJlcHJlc2VudGluZyB0aGUgaW5wdXQuXG5cdFx0XHRcdFx0XHRbMCwgLTM2MF0sICMgVGhlIHJhbmdlLCByZXByZXNlbnRpbmcgd2hlbiB0byBtb2R1bGUuLi4gI1RPRE86IEF0dGFjaGVkIHRvIHRoZSBTY3JlZW4gU2l6ZVxuXHRcdFx0XHRcdFx0WzAsIDEwMF0gICAjIEhvdyBtdWNoIHRvIG1vZHVsYXRlLlxuXHRcdFx0XHRcdClcblx0XHRlbHNlIGlmIHVuaXQucGFyZW50LnBhcmVudC5jb25zdHJ1Y3Rvci5uYW1lIGlzIFwiUGFnZUNvbXBvbmVudFwiXG5cdFx0XHRpZiB1bml0LnBhcmVudC5wYXJlbnQucGFyZW50LnBhcmVudFxuXHRcdFx0XHRpZiB1bml0LnBhcmVudC5wYXJlbnQucGFyZW50LnBhcmVudC5wYXJlbnQuY29uc3RydWN0b3IubmFtZSBpcyBcIlNjcm9sbENvbXBvbmVudFwiXG5cdFx0XHRcdFx0dW5pdC5wYXJlbnQucGFyZW50LnBhcmVudC5wYXJlbnQucGFyZW50Lm9uIEV2ZW50cy5Nb3ZlLCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0XHRcdFx0eSA9IHVuaXQucGFyZW50LnBhcmVudC5wYXJlbnQucGFyZW50LnkgKyB1bml0Lnlcblx0XHRcdFx0XHRcdHVuaXQuc2VsZWN0Q2hpbGQoJ2ltYWdlJykueSA9IFV0aWxzLm1vZHVsYXRlKFxuXHRcdFx0XHRcdFx0XHR5LCBcdFx0ICAgIyBBIHZhcmlhYmxlLCByZXByZXNlbnRpbmcgdGhlIGlucHV0LlxuXHRcdFx0XHRcdFx0XHRbMCwgLTM2MF0sICMgVGhlIHJhbmdlLCByZXByZXNlbnRpbmcgd2hlbiB0byBtb2R1bGUuLi4gI1RPRE86IEF0dGFjaGVkIHRvIHRoZSBTY3JlZW4gU2l6ZVxuXHRcdFx0XHRcdFx0XHRbMCwgMTAwXSAgICMgSG93IG11Y2ggdG8gbW9kdWxhdGUuXG5cdFx0XHRcdFx0XHQpIiwiI/CfmqbimpnvuI8gIEhlbHBlciBGdW5jdGlvbiAtIGdlbmVyYXRlRG90c1xuIyBBdHJpYnV0ZXM6XG4jIHNsaWRlciBVbml0IC0gbmVlZHMgdG8gYmUgYSBwYWdlQ29tcG9uZW50XG4jIG51bWJlck9mU2xpZGVzIC0gbnVtYmVyLCBvciB1c3VhbGx5IChhcnJheS5sZW5ndGgpXG4jIGNvbG91cnNBcnJheSAtIGFycmF5IGluZGljYXRpbmcgd2hhdCBjb2xvdXIgaXMgZWFjaCBzbGlkZVxuXG5leHBvcnRzLmdlbmVyYXRlRG90cyA9IChzbGlkZXJVbml0LCBhcnJheSwgeVBvcykgLT5cblxuXHQjIGNyZWF0aW5nIGNvbnRhaW5lciBmb3IgdGhlIGRvdHNcblx0ZG90c0NvbnRhaW5lciA9IG5ldyBMYXllclxuXHRcdG5hbWU6IFwiZG90c0NvbnRhaW5lclwiXG5cdFx0d2lkdGg6IHNsaWRlclVuaXQud2lkdGhcblx0XHRoZWlnaHQ6IDZcblx0XHR4OiBBbGlnbi5jZW50ZXJcblx0XHR5OiBBbGlnbi5ib3R0b20oLTIwKVxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdHBhcmVudDogc2xpZGVyVW5pdFxuXHRcdFxuXHQjY3JlYXRpbmcgYW4gYXJyYXkgZm9yIHRoZSBpbmRpY2F0b3JzXG5cdGRvdHNBcnJheSA9IFtdXG5cblx0Zm9yIGlpIGluIFswLi4uYXJyYXkubGVuZ3RoXVxuXHRcdFxuXHRcdCMgY3JlYXRpbmcgZWFjaCBkb3Rcblx0XHRkb3QgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogZG90c0NvbnRhaW5lclxuXHRcdFx0c2l6ZTogZG90c0NvbnRhaW5lci5oZWlnaHRcblx0XHRcdGJvcmRlclJhZGl1czogZG90c0NvbnRhaW5lci5oZWlnaHRcblx0XHRcdHg6IChkb3RzQ29udGFpbmVyLmhlaWdodCArIDEwKSAqIGlpXG5cdFx0XHRuYW1lOiBpaVxuXHRcdFxuXHRcdGRvdFZhbHVlcyA9IFxuXHRcdFx0ZG90OiBkb3Rcblx0XHRcdGNvbG91cjogYXJyYXlbaWldLmRvdHNDb2xvdXJcblx0XHRcdFxuXHRcdCMgUHVzaGluZyBkb3RzIGludG8gYXJyYXlcblx0XHRkb3RzQXJyYXkucHVzaChkb3RWYWx1ZXMpXG5cdFx0XG5cdFx0ZGVmYXVsdERvdHMgPSAoc2xpZGVDb2xvcikgLT5cblx0XHRcdGZvciBpIGluIGRvdHNBcnJheVxuXHRcdFx0XHRpLmRvdC5vcGFjaXR5ID0gMC4yXG5cdFx0XHRcdGlmIHNsaWRlQ29sb3IgPT0gXCJ3aGl0ZVwiIHRoZW4gaS5kb3QuYmFja2dyb3VuZENvbG9yID0gXCIjZmZmZmZmXCJcblx0XHRcdFx0ZWxzZSBpLmRvdC5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMwMDAwMDBcIlxuXHRcdFxuXHRcdCMgU2VsZWN0IGN1cnJlbnQgZG90XG5cdFx0Y3VycmVudCA9IHNsaWRlclVuaXQuaG9yaXpvbnRhbFBhZ2VJbmRleChzbGlkZXJVbml0LmN1cnJlbnRQYWdlKVxuXHRcdCMgU3R5bGUgZG90c1xuXHRcdGRlZmF1bHREb3RzKGRvdHNBcnJheVtjdXJyZW50XS5jb2xvdXIpXG5cdFx0IyBIaWdobGlnaHQgY3VycmVudCBkb3Rcblx0XHRkb3RzQXJyYXlbY3VycmVudF0uZG90Lm9wYWNpdHkgPSAxXG5cdFx0XG5cdCMgY2VudGVyaW5nIHRoZSBkb3RzXG5cdGRvdHNDb250YWluZXIud2lkdGggPSBkb3RzQXJyYXkubGVuZ3RoICogKGRvdHNDb250YWluZXIuaGVpZ2h0ICsgMTApIFxuXHRkb3RzQ29udGFpbmVyLm1pZFggPSBTY3JlZW4ubWlkWFxuXHRcblx0IyBJbnRlcmFjdGlvbnNcblx0c2xpZGVyVW5pdC5vbiBcImNoYW5nZTpjdXJyZW50UGFnZVwiLCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdCMgU2VsZWN0IGN1cnJlbnQgZG90XG5cdFx0Y3VycmVudCA9IGxheWVyLmhvcml6b250YWxQYWdlSW5kZXgobGF5ZXIuY3VycmVudFBhZ2UpXG5cdFx0IyBTdHlsZSBkb3RzXG5cdFx0ZGVmYXVsdERvdHMoZG90c0FycmF5W2N1cnJlbnRdLmNvbG91cilcblx0XHQjIEhpZ2hsaWdodCBjdXJyZW50IGRvdFxuXHRcdGRvdHNBcnJheVtjdXJyZW50XS5kb3Qub3BhY2l0eSA9IDEiLCIj8J+apuKame+4jyAgSGVscGVyIEZ1bmN0aW9uIC0gcG9zaXRpb25BZnRlclxuXG53aW5kb3cucG9zaXRpb25BZnRlciA9IChhZnRlciwgZnJhbWUsIG9mZnNldD0wKSAtPlxuXHRmcmFtZS5wYXJlbnQgPSBhZnRlci5wYXJlbnRcblx0ZnJhbWUueSA9IGFmdGVyLm1heFkgKyBvZmZzZXRcblxuXG5cbiIsIiPwn5qm4pqZ77iPICBIZWxwZXIgRnVuY3Rpb24gLSBhZGRDaGlsZHJlblxuIyBGdW5jdGlvbiBoZWxwcyB0byBhZGQgbXVsdGlwbGUgbGF5ZXJzIHRvIHRoZSBvbmUgcGFyZW50XG5cbndpbmRvdy5hZGRDaGlsZHJlbiA9IChwYXJlbnQsIGNoaWxkcmVuQXJyYXkpIC0+XG5cdGZvciBjaGlsZHJlbiwgaSBpbiBjaGlsZHJlbkFycmF5XG5cdFx0Y2hpbGRyZW4ucGFyZW50ID0gcGFyZW50IiwiIyBCYXNlZCBvbiBpT1NTd2l0Y2ggYnkgRmFjZWJvb2tcblxuRXZlbnRzLlN3aXRjaFZhbHVlQ2hhbmdlID0gXCJzd2l0Y2hWYWx1ZUNoYW5nZVwiXG5jbGFzcyB3aW5kb3cuaU9TU3dpdGNoIGV4dGVuZHMgTGF5ZXJcblx0IyBGcmFtZVxuXHR0b2dnbGVfZnJhbWUgPSBsaXN0X2l0ZW1fdG9nZ2xlLnNlbGVjdENoaWxkKFwidG9nZ2xlXCIpXG5cblx0Y29uc3RydWN0b3I6IChAb3B0PXt9KSAtPlxuXHRcdEBvcHQgPSBfLmRlZmF1bHRzIHt9LCBAb3B0LFx0XHRcdFxuXHRcdFx0d2lkdGg6IHRvZ2dsZV9mcmFtZS53aWR0aFxuXHRcdFx0aGVpZ2h0OiB0b2dnbGVfZnJhbWUuaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcihcInRyYW5zcGFyZW50XCIpXG5cdFx0XHRpc09uOiBmYWxzZVxuXHRcdHN1cGVyIEBvcHRcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXHRcdEBiYXNlID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5iYXNlXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0aGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiI2U2ZTZlNlwiICMgRGlzYWJsZWQgU3RhdGVcblx0XHRcdGJvcmRlclJhZGl1czogMTZcblxuXHRcdEBiYXNlLnN0YXRlcy5vbiA9XG5cdFx0XHRib3JkZXJXaWR0aDogMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyMjIyMjJcIiAjIEVuYWJsZWQgU3RhdGVcblxuXHRcdEBiYXNlLmFuaW1hdGlvbk9wdGlvbnMgPVxuXHRcdFx0dGltZTogMC42XG5cdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDAuNzUpXG5cblx0XHRAdGh1bWIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLnRodW1iXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDI3LCBoZWlnaHQ6IDI3XG5cdFx0XHRib3JkZXJSYWRpdXM6IDE0LjVcblx0XHRcdHg6IDJcblx0XHRcdHk6IDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cblx0XHRAdGh1bWIuc3RhdGVzLm9uID1cblx0XHRcdHg6IDIzXG5cdFx0QHRodW1iLmFuaW1hdGlvbk9wdGlvbnMgPVxuXHRcdFx0dGltZTogMC42XG5cdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDAuOClcblxuXHRcdEB0aHVtYkZpbGwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwidGh1bWJGaWxsXCJcblx0XHRcdHBhcmVudDogQHRodW1iXG5cdFx0XHR4OiAwLjVcblx0XHRcdHk6IDAuNVxuXHRcdFx0d2lkdGg6IDI3LCBoZWlnaHQ6IDI3XG5cdFx0XHRib3JkZXJSYWRpdXM6IDE0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEB0aHVtYlRpbnRDb2xvclxuXHRcdFx0c2hhZG93MTpcblx0XHRcdFx0eTogM1xuXHRcdFx0XHRibHVyOiA4XG5cdFx0XHRcdGNvbG9yOiBcInJnYmEoMCwwLDAsMC4xNSlcIlxuXHRcdFx0IyBzaGFkb3cyOlxuXHRcdFx0IyBcdHk6IDFcblx0XHRcdCMgXHRibHVyOiAxXG5cdFx0XHQjIFx0Y29sb3I6IFwicmdiYSgwLDAsMCwwLjE2KVwiXG5cdFx0XHQjIHNoYWRvdzM6XG5cdFx0XHQjIFx0eTogM1xuXHRcdFx0IyBcdGJsdXI6IDFcblx0XHRcdCMgXHRjb2xvcjogXCJyZ2JhKDAsMCwwLDAuMTApXCJcblxuXHRcdGlmIEBpc09uXG5cdFx0XHRAYmFzZS5zdGF0ZVN3aXRjaCBcIm9uXCJcblx0XHRcdEB0aHVtYi5zdGF0ZVN3aXRjaCBcIm9uXCJcblxuXG5cblx0XHRAb25DbGljayAtPlxuXHRcdFx0QHNldE9uICFAaXNPbiwgdHJ1ZVxuXG5cblx0QGRlZmluZSBcInRpbnRDb2xvclwiLFxuXHRcdGdldDogLT4gQF90aW50Q29sb3Jcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfdGludENvbG9yID0gdmFsdWVcblx0XHRcdEBfdXBkYXRlVGludENvbG9yKClcblx0QGRlZmluZSBcInRodW1iVGludENvbG9yXCIsXG5cdFx0Z2V0OiAtPiBAX3RodW1iVGludENvbG9yXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAX3RodW1iVGludENvbG9yID0gdmFsdWVcblx0XHRcdEBfdXBkYXRlVGh1bWIoKVxuXG5cdEBkZWZpbmUgXCJpc09uXCIsXG5cdFx0Z2V0OiAtPiBAX2lzT25cblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfaXNPbiA9IHZhbHVlXG5cblx0c2V0T246IChzd2l0Y2hPbiwgYW5pbWF0ZWQpIC0+XG5cdFx0QGlzT24gPSBzd2l0Y2hPblxuXHRcdGFuaW1hdGVkID0gYW5pbWF0ZWQgPyB0cnVlXG5cblx0XHRpZiBAaXNPblxuXHRcdFx0aWYgYW5pbWF0ZWRcblx0XHRcdFx0QGJhc2UuYW5pbWF0ZSBcIm9uXCJcblx0XHRcdFx0QHRodW1iLmFuaW1hdGUgXCJvblwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBiYXNlLnN0YXRlU3dpdGNoIFwib25cIlxuXHRcdFx0XHRAdGh1bWIuc3RhdGVTd2l0Y2ggXCJvblwiXG5cdFx0ZWxzZVxuXHRcdFx0aWYgYW5pbWF0ZWRcblx0XHRcdFx0QGJhc2UuYW5pbWF0ZSBcImRlZmF1bHRcIlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSBcImRlZmF1bHRcIlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAYmFzZS5zdGF0ZVN3aXRjaCBcImRlZmF1bHRcIlxuXHRcdFx0XHRAdGh1bWIuc3RhdGVTd2l0Y2ggXCJkZWZhdWx0XCJcblxuXHRcdEBlbWl0IEV2ZW50cy5Td2l0Y2hWYWx1ZUNoYW5nZSwgQGlzT25cblxuXG5cdF91cGRhdGVUaW50Q29sb3I6IC0+XG5cdFx0aWYgQGJhc2VcbiNcdFx0XHRAYmFzZS5zdGF0ZXMub24uc2hhZG93Q29sb3IgPSBAdGludENvbG9yXG4jXHRcdFx0QGJhc2Uuc3RhdGVzLm9uLnNoYWRvd0NvbG9yID0gQHRpbnRDb2xvclxuXHRcdFx0QGJhc2Uuc3RhdGVTd2l0Y2ggXCJvblwiIGlmIEBpc09uXG5cblx0IyBfdXBkYXRlVGh1bWI6IC0+XG5cdCMgXHRpZiBAdGh1bWJGaWxsIHRoZW4gQHRodW1iRmlsbC5iYWNrZ3JvdW5kQ29sb3IgPSBAdGh1bWJUaW50Q29sb3JcblxuXHRvblZhbHVlQ2hhbmdlOiAoY2IpIC0+IEBvbihFdmVudHMuU3dpdGNoVmFsdWVDaGFuZ2UsIGNiKSIsIiMjIyMjIyMjIyMjIyMjIFVTQUdFICMjIyMjIyMjIyMjIyMjXG4jIHRhYnMgPSBuZXcgVGFic1xuIyBcdGFmdGVyOiBzdGF0dXNCYXJcbiMgXHRpdGVtczogW1wib25lXCIsIFwidHdvXCIsIFwidGhyZWVcIiwgXCJmb3VyXCJdXG5cbiMgdGFicy5vbmUub25UYXAgLT5cbiMgXHRwcmludCAnc2RmJ1xuXG5cbiMjIyMjIyMjIyMjIyMjIFRBQlMgIyMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuVGFicyBleHRlbmRzIExheWVyXG5cdGNtcF9jb21wID0gdGFic19mcmFtZVxuXHRpdGVtc0FyciA9IFtdXG5cdFxuXHRmb3IgaXRlbSwgaSBpbiBjbXBfY29tcC5zZWxlY3RDaGlsZChcIml0ZW1zXCIpLmNoaWxkcmVuXG5cdFx0aXRlbXNBcnIucHVzaChpdGVtLm5hbWUpXG5cblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0aGVpZ2h0OiBjbXBfY29tcC5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRpdGVtczogaXRlbXNBcnJcblxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0XHRcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBAKVxuXHRcdFxuXHRcdCMgVmFyc1xuXHRcdGNoaWxkcmVuTGVuZ3RoID0gQG9wdC5pdGVtcy5sZW5ndGhcblx0XHRidG5zQXJyID0gW11cblx0XHRAdW5kZXJsaW5lID0gY21wX2NvbXAuc2VsZWN0Q2hpbGQoXCJ1bmRlcmxpbmVcIikuY29weSgpXG5cdFx0cGFyZW50ID0gQFxuXHRcdFxuXHRcdCMgQ3JlYXRlIGJ1dHRvbnNcblx0XHRAbmV3SXRlbXNBcnIgPSBbXVxuXHRcdFxuXHRcdGZvciBpdGVtLCBpIGluIEBvcHQuaXRlbXNcblx0XHRcdG5ld0l0ZW1OYW1lID0gaXRlbS5zcGxpdCgnICcpLmpvaW4oJ18nKVxuXHRcdFx0QFtcIiN7bmV3SXRlbU5hbWV9XCJdID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6IGl0ZW1cblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHdpZHRoOiBjbXBfY29tcC53aWR0aC9Ab3B0Lml0ZW1zLmxlbmd0aFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFx0eDogbmV3WHBvc1xuXHRcdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdFxuXHRcdFx0QFtcIiN7bmV3SXRlbU5hbWV9XCJdW1widGV4dFwiXSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAW1wiI3tuZXdJdGVtTmFtZX1cIl1cblxuXHRcdFx0QFtcIiN7bmV3SXRlbU5hbWV9XCJdW1widGV4dFwiXS5wcm9wcyA9IGNtcF9jb21wLnNlbGVjdENoaWxkKFwiaXRlbXNcIikuY2hpbGRyZW5bMF0ucHJvcHNcblx0XHRcdEBbXCIje25ld0l0ZW1OYW1lfVwiXVtcInRleHRcIl0ucHJvcHMgPSBcblx0XHRcdFx0bmFtZTogXCJ0ZXh0XCJcblx0XHRcdFx0dGV4dFRyYW5zZm9ybTogXCJ1cHBlcmNhc2VcIlxuXHRcdFx0XHR0ZXh0OiBpdGVtXG5cdFx0XHRAW1wiI3tuZXdJdGVtTmFtZX1cIl1bXCJ0ZXh0XCJdLnggPSBBbGlnbi5jZW50ZXJcblx0XHRcdFxuXHRcdFx0bmV3WHBvcyA9IEBbXCIje25ld0l0ZW1OYW1lfVwiXS5tYXhYXG5cdFx0XHRcblx0XHRcdEBuZXdJdGVtc0Fyci5wdXNoKEBbXCIje25ld0l0ZW1OYW1lfVwiXSlcblx0XHRcdFxuXHRcdCMgVW5kZXJsaW5lIGluaXRpYWwgc3RhdGVcblx0XHRAdW5kZXJsaW5lLnByb3BzID1cblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogQG5ld0l0ZW1zQXJyWzBdLmNoaWxkcmVuWzBdLnhcblx0XHRcdHdpZHRoOiBAbmV3SXRlbXNBcnJbMF0uY2hpbGRyZW5bMF0ud2lkdGhcblx0XHRcblx0XHRAY3VycmVudEl0ZW0gPSBAbmV3SXRlbXNBcnJbMF0uY2hpbGRyZW5bMF0udGV4dFxuXG5cdFx0IyBjcmVhdGUgdW5kZXJsaW5lIGFuaW1hdGlvblxuXHRcdGZvciBpdGVtLCBpIGluIEBuZXdJdGVtc0FyclxuXHRcdFx0QG5ld0l0ZW1zQXJyW2ldLm9uVGFwIC0+XG5cdFx0XHRcdHBhcmVudC5jdXJyZW50SXRlbSA9IEBjaGlsZHJlblswXS50ZXh0XG5cdFx0XHRcdHBhcmVudC51bmRlcmxpbmUuYW5pbWF0ZVxuXHRcdFx0XHRcdG1pZFg6IEBtaWRYXG5cdFx0XHRcdFx0d2lkdGg6IEBjaGlsZHJlblswXS53aWR0aFxuXHRcdFx0XHRcdG9wdGlvbnM6IFxuXHRcdFx0XHRcdFx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAwLjgpXG5cdFx0XHRcdFx0XHR0aW1lOiAwLjRcbiIsIiMjIyMjIyMjIyMjIFRBQiBCQVIgIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuVGFiYmFyIGV4dGVuZHMgTGF5ZXJcblxuXHQjIENoZWNrIGlmIGlQaG9uZVggbW9kZSBpcyBvbiBcblx0aWYgRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlIGlzIFwiYXBwbGUtaXBob25lLXgtc3BhY2UtZ3JheVwiXG5cdFx0Y21wID0gdGFiX2Jhcl94XG5cdGVsc2Vcblx0XHRjbXAgPSB0YWJfYmFyXG5cblx0ZGVmYXVsdE9wYWNpdHkgPSBjbXAuY2hpbGRyZW5bMl0ub3BhY2l0eVxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXG5cdFx0QHRhYmJhcl9pdGVtID0gY21wLmNvcHkoKVxuXHRcdEB0YWJiYXJfaXRlbS5wcm9wcyA9XG5cdFx0XHR4OiAwXG5cdFx0XHR5OiAwXG5cdFx0XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0aGVpZ2h0OiBjbXAuaGVpZ2h0XG5cdFx0XHR3aWR0aDogY21wLndpZHRoXG5cdFx0XHR5OiBBbGlnbi5ib3R0b21cblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXHRcdEB0YWJiYXJfaXRlbS5wYXJlbnQgPSBAXG5cblx0XHQjIEludGVyYWN0aW9uXG5cdFx0Zm9yIGNoaWxkLCBpIGluIEB0YWJiYXJfaXRlbS5jaGlsZHJlblxuXHRcdFx0Y2hpbGQub25UYXAgLT5cblx0XHRcdFx0Zm9yIGogaW4gQHBhcmVudC5jaGlsZHJlblxuXHRcdFx0XHRcdGoub3BhY2l0eSA9IGRlZmF1bHRPcGFjaXR5XG5cdFx0XHRcdEBhbmltYXRlXG5cdFx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0XHRjdXJ2ZTogXCJlYXNlLW91dFwiXG5cdFx0XHRcdFx0XHR0aW1lOiAwLjJcblxuXHRcblx0QGRlZmluZSBcImFjdGl2ZUl0ZW1cIixcblx0XHRnZXQ6IC0+IEBvcHQuYWN0aXZlSXRlbVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0Zm9yIGNoaWxkLCBpIGluIEB0YWJiYXJfaXRlbS5jaGlsZHJlblxuXHRcdFx0XHRjaGlsZC5vcGFjaXR5ID0gQHRhYmJhcl9pdGVtLmNoaWxkcmVuWzJdLm9wYWNpdHlcblx0XHRcdEBvcHQuYWN0aXZlSXRlbSA9IHZhbHVlXG5cdFx0XHRAdGFiYmFyX2l0ZW0uc2VsZWN0Q2hpbGQodmFsdWUpLm9wYWNpdHkgPSAxIiwiIyMjIyMjIyMjIyMjIyMgU1RBVFVTIEJBUiAjIyMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LlN0YXR1c0JhciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdD17fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHR4OiAwLCB5OiAwXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGlmIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSBpcyBcImFwcGxlLWlwaG9uZS14LXNwYWNlLWdyYXlcIiB0aGVuIDQ0IGVsc2UgMjBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHR1cGRhdGVUaW1lOiBmYWxzZVxuXHRcdFx0c2lnbmFsSWNvbjogXCJzaWduYWxcIlxuXHRcdFx0d2lmaUljb246IFwid2lmaVwiXG5cdFx0XHRiYXR0ZXJ5SWNvbjogXCJiYXR0ZXJ5XCJcblx0XHRcdCMgQ2FwdHVyZSBjdXJyZW50IHRpbWUgaW50byB2YXJpYWJsZVxuXHRcdFx0Y3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0J30pXG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBALCBAb3B0LnkpXG5cblx0XHQjIFByZXBhcmUgc3R5bGVzXG5cdFx0QHN0eWxlID0gXG5cdFx0XHRcImZpbHRlclwiOiBcImludmVydCgwKVwiXG5cdFx0XHRcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcblx0XHRcdFwiei1pbmRleFwiOiA5OTk5OVxuXHRcdFxuXHRcdCMgQ2hlY2sgaWYgaVBob25lWCBtb2RlIGlzIG9uIFxuXHRcdGlmIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSBpcyBcImFwcGxlLWlwaG9uZS14LXNwYWNlLWdyYXlcIlxuXHRcdFx0QHRpbWUgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdG5hbWU6IFwidGltZVwiXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHRjb2xvcjogQG9wdC50aW1lQ29sb3Jcblx0XHRcdFx0dGV4dDogY3VycmVudFRpbWVcblx0XHRcdFx0Zm9udFdlaWdodDogNzAwXG5cdFx0XHRcdGZvbnRTaXplOiAxNVxuXHRcdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHRcdGNvbG9yOiBcImJsYWNrXCJcblx0XHRcdFx0eDogMjgsIHk6IDE2XG5cdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXG5cdFx0XHRAc2lnbmFsID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6IFwic2lnbmFsXCJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHdpZHRoOiAxNywgaGVpZ2h0OiAxMlxuXHRcdFx0XHR4OiBBbGlnbi5yaWdodCgtNjQpLCB5OiAxOFxuXHRcdFx0XHRpbWFnZTogXCJtb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvU3RhdHVzQmFyL2Fzc2V0cy8je0BvcHQuc2lnbmFsSWNvbn0uc3ZnXCJcblxuXHRcdFx0QHdpZmkgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogXCJ3aWZpXCJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHdpZHRoOiAxNSwgaGVpZ2h0OiAxMlxuXHRcdFx0XHR4OiBBbGlnbi5yaWdodCgtNDQpLCB5OiAxOFxuXHRcdFx0XHRpbWFnZTogXCJtb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvU3RhdHVzQmFyL2Fzc2V0cy8je0BvcHQud2lmaUljb259LnN2Z1wiXG5cblx0XHRcdEBiYXR0ZXJ5ID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6IFwiYmF0dGVyeVwiXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR3aWR0aDogMjUsIGhlaWdodDogMTJcblx0XHRcdFx0eDogQWxpZ24ucmlnaHQoLTE0KSwgeTogMThcblx0XHRcdFx0aW1hZ2U6IFwibW9kdWxlcy9GRktpdC9jb21wb25lbnRzL1N0YXR1c0Jhci9hc3NldHMvI3tAb3B0LmJhdHRlcnlJY29ufS5zdmdcIlxuXHRcdGVsc2Vcblx0XHRcdEBzaWduYWwgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogXCJzaWduYWxcIlxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0d2lkdGg6IDE1LCBoZWlnaHQ6IDlcblx0XHRcdFx0eDogNywgeTogNVxuXHRcdFx0XHRpbWFnZTogXCJtb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvU3RhdHVzQmFyL2Fzc2V0cy8je0BvcHQuc2lnbmFsSWNvbn0uc3ZnXCJcblxuXHRcdFx0QHdpZmkgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogXCJ3aWZpXCJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHdpZHRoOiAxMywgaGVpZ2h0OiA5XG5cdFx0XHRcdHg6IDI4LCB5OiA1XG5cdFx0XHRcdGltYWdlOiBcIm1vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9TdGF0dXNCYXIvYXNzZXRzLyN7QG9wdC53aWZpSWNvbn0uc3ZnXCJcblxuXHRcdFx0QHRpbWUgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdG5hbWU6IFwidGltZVwiXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHRjb2xvcjogQG9wdC50aW1lQ29sb3Jcblx0XHRcdFx0dGV4dDogY3VycmVudFRpbWVcblx0XHRcdFx0Zm9udFdlaWdodDogNzAwXG5cdFx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHRcdGNvbG9yOiBcImJsYWNrXCJcblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiA0XG5cdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXG5cdFx0XHRAYmF0dGVyeSA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiBcImJhdHRlcnlcIlxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0d2lkdGg6IDI0LCBoZWlnaHQ6IDEwLjVcblx0XHRcdFx0eDogQWxpZ24ucmlnaHQoLTQpLCB5OiA1XG5cdFx0XHRcdGltYWdlOiBcIm1vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9TdGF0dXNCYXIvYXNzZXRzLyN7QG9wdC5iYXR0ZXJ5SWNvbn0uc3ZnXCJcblx0XHRcdFx0XG5cdFx0XHRAYmF0dGVyeVBlcmNlbnRhZ2UgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdG5hbWU6IFwidGltZVwiXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHRjb2xvcjogQG9wdC50aW1lQ29sb3Jcblx0XHRcdFx0dGV4dDogXCIxMDAlXCJcblx0XHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHRcdGNvbG9yOiBcImJsYWNrXCJcblx0XHRcdFx0eDogQWxpZ24ucmlnaHQoLTMyKSwgeTogNFxuXHRcdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdFxuXHRcdHVwZGF0ZVRpbWVGb28oQG9wdC51cGRhdGVUaW1lLCBAdGltZSlcblxuXHQjIFByaXZhdGUgbWV0aG9kIHdoaWNoIHdlIGNhbGwgYmFzZWQgb24gQG9wdC51cGRhdGVUaW1lIHByb3BlcnR5XG5cdHVwZGF0ZVRpbWVGb28gPSAodmFsLCB0aW1lTGF5ZXIpIC0+XG5cdFx0aWYgdmFsXG5cdFx0XHRVdGlscy5pbnRlcnZhbCAxLCAtPlxuXHRcdFx0XHR0aW1lTGF5ZXIudGV4dCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnfSlcblx0XG5cdCMgUHVibGljIG1ldGhvZCB0byBzd2l0Y2ggbW9kZXMgYnkgQ1NTIGZpbHRlcnNcblx0c3dpdGNoTW9kZTogKHRpbWUpIC0+XG5cdFx0dGltZSA/PSAwLjJcblx0XHRALnN0eWxlW1widHJhbnNpdGlvblwiXSA9IFwiYWxsIFwiICsgdGltZSArIFwic1wiXG5cdFx0aWYgQC5zdHlsZVtcImZpbHRlclwiXSBpcyBcImludmVydCgwKVwiXG5cdFx0XHRALnN0eWxlW1wiZmlsdGVyXCJdID0gXCJpbnZlcnQoMSlcIlxuXHRcdGVsc2Vcblx0XHRcdEAuc3R5bGVbXCJmaWx0ZXJcIl0gPSBcImludmVydCgwKVwiIiwiIyMjIyMjIyMjIyMjIyMgU0VMRUNUT1IgIyMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuU2VsZWN0b3IgZXh0ZW5kcyBMYXllclxuXHRjbXBfZnJhbWUgPSBzZWxlY3RvclxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdG5hbWU6IFwiU2VsZWN0b3JcIlxuXHRcdFx0d2lkdGg6IGNtcF9mcmFtZS53aWR0aCwgaGVpZ2h0OiBjbXBfZnJhbWUuaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNtcF9mcmFtZS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHBsYWNlaG9sZGVyVGV4dDogXCJQbGFjZWhvbGRlclwiXG5cdFx0XHR2YWx1ZTogZmFsc2VcblxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXHRcdFx0XHRcdFx0XG5cdFx0aWYgQG9wdC5sYWJlbFRleHRcblx0XHRcdEBsYWJlbFRleHQgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJzZWxlY3Rvcl9sYWJlbFwiKS5jb3B5KClcblx0XHRcdEBsYWJlbFRleHQucHJvcHMgPSBcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHRleHQ6IEBvcHQubGFiZWxUZXh0XG5cdFx0XHRcdGF1dG9IZWlnaHQ6IHRydWVcblxuXHRcdGlmIEBvcHQuaGVscGVyVGV4dFxuXHRcdFx0QGhlbHBlclRleHQgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJoZWxwZXJfdGV4dFwiKS5jb3B5KClcblx0XHRcdEBoZWxwZXJUZXh0LnByb3BzID0gXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR0ZXh0OiBAb3B0LmhlbHBlclRleHRcblx0XHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXG5cdFx0QHNlbGVjdG9yX2ZyYW1lID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiaW5wdXRcIikuY29weSgpXG5cdFx0QHNlbGVjdG9yX2ZyYW1lLnByb3BzID0gXG5cdFx0XHR3aWR0aDogQHdpZHRoIC0gTV9zcGFjZXIqMlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR5OiBpZiBAb3B0LmxhYmVsVGV4dCB0aGVuIGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcImlucHV0XCIpLnkgZWxzZSAwXG5cblx0XHRAc2VsZWN0Q2hpbGQoXCJwbGFjZWhvbGRlclwiKS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXG5cdFx0QHNlbGVjdG9yX2ZyYW1lLnNlbGVjdENoaWxkKFwiZHJvcGRhd25fYnRuXCIpLnggPSBBbGlnbi5yaWdodCgyKVxuXG5cdFx0QHNlbGVjdENoaWxkKFwicGxhY2Vob2xkZXJcIikudGV4dCA9IEBvcHQucGxhY2Vob2xkZXJUZXh0XG5cblx0XHRpZiBAb3B0LnZhbHVlXG5cdFx0XHRAc2VsZWN0Q2hpbGQoXCJwbGFjZWhvbGRlclwiKS5wcm9wcyA9XG5cdFx0XHRcdGNvbG9yOiBcIiMyMjIyMjJcIlxuXHRcdFx0XHR0ZXh0OiBAb3B0LnZhbHVlXG5cblx0XHRAaGVpZ2h0ID0gaWYgQG9wdC5oZWxwZXJUZXh0IHRoZW4gQGhlbHBlclRleHQubWF4WSArIE1fc3BhY2VyIGVsc2UgQHNlbGVjdG9yX2ZyYW1lLm1heFkgKyBNX3NwYWNlclxuXG5cblx0QGRlZmluZSBcInBsYWNlaG9sZGVyVGV4dFwiLFxuXHRcdGdldDogLT4gQG9wdC5wbGFjZWhvbGRlclRleHRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHQucGxhY2Vob2xkZXJUZXh0ID0gdmFsdWVcblx0XHRcdGlmICEhQGNoaWxkcmVuLmxlbmd0aFxuXHRcdFx0XHRAc2VsZWN0Q2hpbGQoXCJwbGFjZWhvbGRlclwiKS50ZXh0ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgXCJ2YWx1ZVwiLFxuXHRcdGdldDogLT4gQG9wdC52YWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdC52YWx1ZSA9IHZhbHVlXG5cdFx0XHRpZiAhIUBjaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0QHNlbGVjdENoaWxkKFwicGxhY2Vob2xkZXJcIikucHJvcHMgPVxuXHRcdFx0XHRcdGNvbG9yOiBcIiMyMjIyMjJcIlxuXHRcdFx0XHRcdHRleHQ6IHZhbHVlIiwiIyMjIyMjIyMjIyMjIyBQcm9wZXJ0aWVzICMjIyMjIyMjIyMjIyMjXG4jIHBsYWNlaG9sZGVyOiBcIllvdXIgdGV4dFwiXG5cbiMjIyMjIyMjIyMjIyMjIFNlYXJjaCBpbnB1dCAjIyMjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5TZWFyY2hJbnB1dCBleHRlbmRzIExheWVyXG5cdGNtcF9mcmFtZSA9IHNlYXJjaF9pbnB1dF9mcmFtZVxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogY21wX2ZyYW1lLmhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBjbXBfZnJhbWUuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRwbGFjZWhvbGRlcjogXCJTZWFyY2ggZm9yIHNvbWV0aGluZ1wiXG5cblx0XHRjbXBTaWRlUGFkZGluZ3MgPSBjbXBfZnJhbWUud2lkdGggLSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJpbnB1dFwiKS53aWR0aFxuXHRcblx0XHRAaW5wdXRXcmFwID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiaW5wdXRcIikuY29weSgpXG5cdFx0QGlucHV0V3JhcC5wcm9wcyA9XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBAd2lkdGggLSBjbXBTaWRlUGFkZGluZ3Ncblx0XHRAaW5wdXRXcmFwLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLmF1dG9IZWlnaHQgPSB0cnVlXG5cdFx0XG5cdFx0IyBDcmVhdGUgSFRNTCBpbnB1dFxuXHRcdEBpbnB1dEZyYW1lID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImlucHV0IHdyYXBcIlxuXHRcdFx0cGFyZW50OiBAaW5wdXRXcmFwXG5cdFx0XHR5OiBAaW5wdXRXcmFwLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLnlcblx0XHRcdHg6IEBpbnB1dFdyYXAuc2VsZWN0Q2hpbGQoXCJzZWFyY2hfcGxhY2Vob2xkZXJcIikueFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogQGlucHV0V3JhcC5zZWxlY3RDaGlsZChcInNlYXJjaF9wbGFjZWhvbGRlclwiKS53aWR0aFxuXHRcdFx0aGVpZ2h0OiBAaW5wdXRXcmFwLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLmhlaWdodFxuXHRcdFx0aHRtbDogXCJcIlwiPGlucHV0XG5cdFx0XHRcdGNsYXNzID0gJ3NlYXJjaC1pbnB1dC1jbXAnXG5cdFx0XHRcdHBsYWNlaG9sZGVyID0gJyN7QG9wdC5wbGFjZWhvbGRlcn0nPlxuXHRcdFx0PC9pbnB1dD5cIlwiXCJcblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRcInBvc2l0aW9uXCI6IFwicmVsYXRpdmVcIlxuXHRcdFxuXHRcdGNzcyA9IFwiXCJcIlxuXHRcdC5zZWFyY2gtaW5wdXQtY21wIHtcblx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdHRvcDogMDtcblx0XHRcdHdpZHRoOiAje0BpbnB1dFdyYXAuc2VsZWN0Q2hpbGQoXCJzZWFyY2hfcGxhY2Vob2xkZXJcIikud2lkdGh9cHg7XG5cdFx0XHRoZWlnaHQ6ICN7QGlucHV0V3JhcC5zZWxlY3RDaGlsZChcInNlYXJjaF9wbGFjZWhvbGRlclwiKS5oZWlnaHR9cHg7XG5cdFx0XHRmb250LXNpemU6IDE1cHg7XG5cdFx0XHRsaW5lLWhlaWdodDogMS41O1xuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdFx0XHRmb250LWZhbWlseTogXCJQb2xhcmlzLUJvb2tcIiwgXCJQb2xhcmlzXCIsIHNhbnMtc2VyaWYnO1xuXHRcdFx0dGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcblx0XHRcdC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuXHRcdH1cblx0XHQuc2VhcmNoLWlucHV0LWNtcDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XG5cdFx0XHRjb2xvcjogI3tAaW5wdXRXcmFwLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLmNvbG9yfTtcblx0XHR9XG5cdFx0OmZvY3VzIHtcblx0XHQgIG91dGxpbmU6IG5vbmU7XG5cdFx0fVxuXHRcdFwiXCJcIlxuXHRcdFV0aWxzLmluc2VydENTUyhjc3MpXG5cdFx0XHRcblx0XHRAaW5wdXRXcmFwLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLmRlc3Ryb3koKVxuXHRcdEBpbnB1dCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignI3NlYXJjaC1pbnB1dC1jbXAnKSIsIiMjIyMjIyMjIyMjIFJFRklORSBGSUxURVIgIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuUmVmaW5lRmlsdGVyIGV4dGVuZHMgTGF5ZXJcblxuXHRmb2xkZWRCdG5XaWR0aCA9IHJlZmluZV9idXR0b24uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX2ljb25cIikud2lkdGggKyAxNlx0XG5cdHNwYWNlQmV0d2Vlbml0ZW1zID0gcmVmaW5lX2ZpbHRlci5zZWxlY3RDaGlsZChcInJlZmluZV9maWx0ZXJfaXRlbV8yXCIpLnggLSByZWZpbmVfZmlsdGVyLnNlbGVjdENoaWxkKFwicmVmaW5lX2ZpbHRlcl9pdGVtXCIpLm1heFhcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHQpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0aGVpZ2h0OiByZWZpbmVfZmlsdGVyLmhlaWdodFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiByZWZpbmVfZmlsdGVyLmJhY2tncm91bmRDb2xvclxuXHRcdFx0aXRlbXNBcnJheTogW1wiaXRlbSAjMVwiLFwibG9uZyBpdGVtICMyXCIsXCJpdGVtICMzXCIsXCJpdGVtICM0XCIsIFwiaXRlbSAjNVwiXVxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVx0XG5cblx0XHRyZWZpbmVBbW91bnQgPSBudWxsID8gQG9wdC5yZWZpbmVBbW91bnRcblx0XHRAcmVmaW5lQnRuID0gcmVmaW5lQnRuID0gcmVmaW5lX2J1dHRvbi5jb3B5KClcblx0XHRAcmVmaW5lQnRuLnByb3BzID1cblx0XHRcdHBhcmVudDogQFxuXG5cdFx0QGJ0blRleHQgPSBAcmVmaW5lQnRuLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpXG5cdFx0QGJ0blRleHQucHJvcHMgPSBcblx0XHRcdHRleHQ6IHN3aXRjaCByZWZpbmVBbW91bnRcblx0XHRcdFx0d2hlbiBudWxsLCB1bmRlZmluZWRcblx0XHRcdFx0XHRcIlJlZmluZVwiIFxuXHRcdFx0XHRlbHNlIFxuXHRcdFx0XHRcdFwiUmVmaW5lICgje3JlZmluZUFtb3VudH0pXCJcblx0XHRcdGF1dG9TaXplOiB0cnVlXG5cdFx0XHRmb250RmFtaWx5OiBAYnRuVGV4dC5mb250RmFtaWx5XG5cdFx0XHR0ZXh0QWxpZ246IFwibGVmdFwiXG5cblx0XHR1cGRhdGVCdG5XaWR0aChAKVxuXHRcdFxuXHRcdCMgQ3JlYXRlIHNjcm9sbCBjb21wb25lbnRcblx0XHRAc2Nyb2xsQ21wID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBAcmVmaW5lQnRuLm1heFggKyAocmVmaW5lX2ZpbHRlci5zZWxlY3RDaGlsZChcInJlZmluZV9maWx0ZXJfaXRlbVwiKS54IC0gcmVmaW5lX2J1dHRvbi5tYXhYKVxuXHRcdFx0aGVpZ2h0OiBALmhlaWdodFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCAtIChmb2xkZWRCdG5XaWR0aCArIDIwKVxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IGZhbHNlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjIpXCJcblx0XHRcdGNvbnRlbnRJbnNldDpcblx0XHRcdFx0cmlnaHQ6IHNwYWNlQmV0d2Vlbml0ZW1zXG5cblx0XHQjIENyZWF0ZSBpdGVtcyBpbnNpZGUgU2Nyb2xsQ29tcG9uZW50XG5cdFx0Zm9yIGl0ZW1BcnJheSwgaSBpbiBAb3B0Lml0ZW1zQXJyYXlcblx0XHRcdEBpdGVtID0gbmV3IEJ1dHRvblxuXHRcdFx0XHRwYXJlbnQ6IEBzY3JvbGxDbXAuY29udGVudFxuXHRcdFx0XHRuYW1lOiBcIiN7aXRlbUFycmF5fVwiXG5cdFx0XHRcdHR5cGU6IFwidGFnXCJcblx0XHRcdFx0dGV4dDogQG9wdC5pdGVtc0FycmF5W2ldXG5cdFx0XHRcdHk6IHJlZmluZV9maWx0ZXIuc2VsZWN0Q2hpbGQoXCJyZWZpbmVfZmlsdGVyX2l0ZW1cIikueVxuXHRcdFx0XHR4OiBjdXJyZW50WFxuXHRcdFx0XG5cdFx0XHRjdXJyZW50WCA9IEBpdGVtLm1heFggKyBzcGFjZUJldHdlZW5pdGVtc1xuXHRcdFxuXHRcdGxhc3RBcnJheUNoaWxkID0gQHNjcm9sbENtcC5jb250ZW50LmNoaWxkcmVuW0BzY3JvbGxDbXAuY29udGVudC5jaGlsZHJlbi5sZW5ndGggLSAxXVxuXG5cdFx0IyBDaGVjayBpZiBsYXN0IGl0ZW0gaXMgb3V0IG9mIFNjcmVlblxuXHRcdGlmIGxhc3RBcnJheUNoaWxkLm1heFggPiBTY3JlZW4ud2lkdGhcblx0XHRcdEBzY3JvbGxDbXAuc2Nyb2xsSG9yaXpvbnRhbCA9IHRydWVcblxuXHRcdEBzY3JvbGxDbXAueCA9IG5ld1ggPSBAcmVmaW5lQnRuLm1heFggKyAocmVmaW5lX2ZpbHRlci5zZWxlY3RDaGlsZChcInJlZmluZV9maWx0ZXJfaXRlbVwiKS54IC0gcmVmaW5lX2J1dHRvbi5tYXhYKVxuXG5cdFx0IyBBbmltYXRpb24gb24gc2Nyb2xsXG5cdFx0QHNjcm9sbENtcC5zdGF0ZXMgPVxuXHRcdFx0c3RhdGVBOlxuXHRcdFx0XHR4OiBmb2xkZWRCdG5XaWR0aCArIDIwXG5cdFx0XHRcdHdpZHRoOiBAc2Nyb2xsQ21wLndpZHRoXG5cdFx0XHRzdGF0ZUI6XG5cdFx0XHRcdHg6IG5ld1hcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFxuXHRcdEByZWZpbmVCdG4uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIikuc3RhdGVzID1cblx0XHRcdHN0YXRlQTpcblx0XHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0c3RhdGVCOlxuXHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcblx0XHRAcmVmaW5lQnRuLnN0YXRlcyA9XG5cdFx0XHRzdGF0ZUE6XG5cdFx0XHRcdHdpZHRoOiBmb2xkZWRCdG5XaWR0aFxuXHRcdFx0c3RhdGVCOiBcblx0XHRcdFx0d2lkdGg6IEByZWZpbmVCdG4uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIikud2lkdGggKyByZWZpbmVfYnV0dG9uLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl9pY29uXCIpLndpZHRoICsgKHJlZmluZV9idXR0b24ud2lkdGggLSAocmVmaW5lX2J1dHRvbi5zZWxlY3RDaGlsZChcInJlZmluZV9idXR0b25faWNvblwiKS53aWR0aCArIHJlZmluZV9idXR0b24uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIikud2lkdGgpKVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4yXG5cblx0XHRAc2Nyb2xsQ21wLmNvbnRlbnQub24gXCJjaGFuZ2U6eFwiLCAtPlxuXHRcdFx0aWYgQHggPCAtMTAgYW5kIEBwYXJlbnQucGFyZW50LnJlZmluZUJ0bi5zZWxlY3RDaGlsZChcInJlZmluZV9idXR0b25fdGV4dFwiKS5vcGFjaXR5IGlzIDFcblx0XHRcdFx0QHBhcmVudC5wYXJlbnQucmVmaW5lQnRuLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpLmFuaW1hdGUoXCJzdGF0ZUFcIilcblx0XHRcdFx0QHBhcmVudC5wYXJlbnQucmVmaW5lQnRuLmFuaW1hdGUoXCJzdGF0ZUFcIilcblx0XHRcdFx0QHBhcmVudC5hbmltYXRlKFwic3RhdGVBXCIpXG5cdFx0XHRlbHNlIGlmIEB4ID4gLTEwIGFuZCBAcGFyZW50LnN0YXRlcy5jdXJyZW50Lm5hbWUgaXMgXCJzdGF0ZUFcIlxuXHRcdFx0XHRAcGFyZW50LnBhcmVudC5yZWZpbmVCdG4uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIikuYW5pbWF0ZShcInN0YXRlQlwiKVxuXHRcdFx0XHRAcGFyZW50LnBhcmVudC5yZWZpbmVCdG4uYW5pbWF0ZShcInN0YXRlQlwiKVxuXHRcdFx0XHRAcGFyZW50LmFuaW1hdGUoXCJzdGF0ZUJcIilcblxuXG5cdCMjIyMjIyMjIyMjIyMjIyMgTUVUSE9EUyAoKSAjIyMjIyMjIyMjIyMjIyNcblx0IyBQcml2YXRlIG1ldGhvZCB0byBnZXQgYSBuZXcgcmVmaW5lIGJ1dHRvbiB3aWR0aFxuXHR1cGRhdGVCdG5XaWR0aCA9IChwYXJlbnQpIC0+XG5cdFx0YnRuID0gcGFyZW50LnJlZmluZUJ0blxuXHRcdHRoaXNUZXh0ID0gYnRuLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpXG5cdFx0cmVmVGV4dCA9IHJlZmluZV9idXR0b24uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIilcblx0XHRyZWZJY29uID0gcmVmaW5lX2J1dHRvbi5zZWxlY3RDaGlsZChcInJlZmluZV9idXR0b25faWNvblwiKVxuXHRcdGJ0bi53aWR0aCA9IHRoaXNUZXh0LndpZHRoICsgcmVmSWNvbi53aWR0aCArIHJlZkljb24ueCArIChyZWZpbmVfYnV0dG9uLndpZHRoIC0gcmVmVGV4dC5tYXhYKSArIChyZWZUZXh0LnggLSByZWZJY29uLm1heFgpXG5cblx0IyBQdWJsaWMgbWV0aG9kIHRvIHVwZGF0ZSByZWZpbmUgYW1vdW50IFxuXHRzZWxlY3RlZDogKHZhbHVlKSAtPlxuXHRcdEBidG5UZXh0LnRleHQgPSBzd2l0Y2ggdmFsdWVcblx0XHRcdHdoZW4gbnVsbCwgdW5kZWZpbmVkLCAwXG5cdFx0XHRcdFwiUmVmaW5lXCJcblx0XHRcdGVsc2Vcblx0XHRcdFx0XCJSZWZpbmUgKCN7dmFsdWV9KVwiXG5cdFx0dXBkYXRlQnRuV2lkdGgoQClcblx0XHRuZXdXaWR0aCA9IEByZWZpbmVCdG4ud2lkdGhcblx0XHRAc2Nyb2xsQ21wLnggPSBuZXdYID0gQHJlZmluZUJ0bi5tYXhYICsgKHJlZmluZV9maWx0ZXIuc2VsZWN0Q2hpbGQoXCJyZWZpbmVfZmlsdGVyX2l0ZW1cIikueCAtIHJlZmluZV9idXR0b24ubWF4WClcblxuXHRcdCMgQW5pbWF0aW9uIG9uIHNjcm9sbFxuXHRcdEBzY3JvbGxDbXAuc3RhdGVzID1cblx0XHRcdHN0YXRlQTpcblx0XHRcdFx0eDogZm9sZGVkQnRuV2lkdGggKyAyMFxuXHRcdFx0XHR3aWR0aDogQHNjcm9sbENtcC53aWR0aFxuXHRcdFx0c3RhdGVCOlxuXHRcdFx0XHR4OiBuZXdYXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcblx0XHRAcmVmaW5lQnRuLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpLnN0YXRlcyA9XG5cdFx0XHRzdGF0ZUE6XG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHN0YXRlQjpcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4yXG5cdFx0XG5cdFx0QHJlZmluZUJ0bi5zdGF0ZXMgPVxuXHRcdFx0c3RhdGVBOlxuXHRcdFx0XHR3aWR0aDogZm9sZGVkQnRuV2lkdGhcblx0XHRcdHN0YXRlQjogXG5cdFx0XHRcdHdpZHRoOiBAcmVmaW5lQnRuLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpLndpZHRoICsgcmVmaW5lX2J1dHRvbi5zZWxlY3RDaGlsZChcInJlZmluZV9idXR0b25faWNvblwiKS53aWR0aCArIChyZWZpbmVfYnV0dG9uLndpZHRoIC0gKHJlZmluZV9idXR0b24uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX2ljb25cIikud2lkdGggKyByZWZpbmVfYnV0dG9uLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpLndpZHRoKSlcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IDAuMlxuXG5cdFx0QHNjcm9sbENtcC5jb250ZW50Lm9uIFwiY2hhbmdlOnhcIiwgLT5cblx0XHRcdGlmIEB4IDwgLTEwIGFuZCBAcGFyZW50LnBhcmVudC5yZWZpbmVCdG4uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIikub3BhY2l0eSBpcyAxXG5cdFx0XHRcdEBwYXJlbnQucGFyZW50LnJlZmluZUJ0bi5zZWxlY3RDaGlsZChcInJlZmluZV9idXR0b25fdGV4dFwiKS5hbmltYXRlKFwic3RhdGVBXCIpXG5cdFx0XHRcdEBwYXJlbnQucGFyZW50LnJlZmluZUJ0bi5hbmltYXRlKFwic3RhdGVBXCIpXG5cdFx0XHRcdEBwYXJlbnQuYW5pbWF0ZShcInN0YXRlQVwiKVxuXHRcdFx0ZWxzZSBpZiBAeCA+IC0xMCBhbmQgQHBhcmVudC5zdGF0ZXMuY3VycmVudC5uYW1lIGlzIFwic3RhdGVBXCJcblx0XHRcdFx0QHBhcmVudC5wYXJlbnQucmVmaW5lQnRuLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpLmFuaW1hdGUoXCJzdGF0ZUJcIilcblx0XHRcdFx0QHBhcmVudC5wYXJlbnQucmVmaW5lQnRuLmFuaW1hdGUoXCJzdGF0ZUJcIilcblx0XHRcdFx0QHBhcmVudC5hbmltYXRlKFwic3RhdGVCXCIpXG5cbiIsIntzZWxlY3RJbWFnZX0gPSByZXF1aXJlKCcuLi8uLi9oZWxwZXItZnVuY3Rpb25zL3ByaXZhdGUvc2VsZWN0SW1hZ2UuY29mZmVlJylcblxuIyMjIyMjIyMjIyMjIyMgUFJPRFVDVCBTTElERVIgQ09NUE9ORU5UICMjIyMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LlByb2R1Y3RTbGlkZXIgZXh0ZW5kcyBQYWdlQ29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogc3dpcGVfcHJvZHVjdF9jYXJkLmhlaWdodFxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IGZhbHNlXG5cdFx0XHRvcmlnaW5YOiAwLjVcblx0XHRcdGRpcmVjdGlvbkxvY2s6IHRydWUgIyBhdm9pZHMgc3dpcGUgd2hlblxuXHRcdFx0YXJyYXk6IGZhbHNlXG5cdFx0XHRwYWRkaW5nTGVmdDogZmFsc2Vcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXHRcdEBlbXB0eVNwYWNlID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImVtcHR5U3BhY2VcIlxuXHRcdFx0d2lkdGg6IEBvcHQucGFkZGluZ0xlZnRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdEBhZGRQYWdlKEBlbXB0eVNwYWNlKVxuXHRcdFxuXHRcdGlmIEBvcHQuYXJyYXlcblx0XHRcdGZvciBpIGluIFswLi4uQG9wdC5hcnJheS5sZW5ndGhdXG5cdFx0XHRcdCMgU2V0IG5ldyBwcm9kQ2FyZCBYIHBvc2l0aW9uXG5cdFx0XHRcdGN1cnJlbnRYID0gQGNvbnRlbnQuY2hpbGRyZW5baV0ubWF4WCArIFNfc3BhY2VyXG5cdFx0XHRcdCMgQ3JlYXRlIGNhcmRcblx0XHRcdFx0QHByb2RDYXJkID0gbmV3IFByb2R1Y3RDYXJkXG5cdFx0XHRcdFx0bmFtZTogXCJwcm9kdWN0IGNhcmRcIlxuXHRcdFx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcdFx0XHR4OiBjdXJyZW50WFxuXHRcdFx0XHRcdGJyYW5kVGV4dDogQG9wdC5hcnJheVtpXS5icmFuZC5uYW1lXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb25UZXh0OiBAb3B0LmFycmF5W2ldLnNob3J0RGVzY3JpcHRpb25cblx0XHRcdFx0XHRwcmljZVRleHQ6IEBvcHQuYXJyYXlbaV0ucHJpY2Vcblx0XHRcdFx0XHRjb3ZlcjogaWYgdXNlRXh0ZXJuYWxJbWFnZXMgdGhlbiB3aW5kb3cuc2VsZWN0SW1hZ2UoQG9wdC5hcnJheVtpXS5pbWFnZXMpIGVsc2UgVXRpbHMucmFuZG9tQ2hvaWNlKHdvbWVuUG9yb2R1Y3RzKVxuXHRcdFx0XHRcblx0XHRcdFx0IyBJbnRlcmFjdGlvblxuXHRcdFx0XHRAcHJvZENhcmQub25UYXAgLT5cblx0XHRcdFx0XHRwcmludCBcIlByb2R1Y3QgdGFwXCJcblx0XHRlbHNlXG5cdFx0XHRwcm9kQ2FyZCA9IG5ldyBQcm9kdWN0Q2FyZFxuXHRcdFx0XHRwYXJlbnQ6IEAuY29udGVudFxuXHRcdFx0XHR4OiBTX3NwYWNlciArIEBlbXB0eVNwYWNlLm1heFhcblx0XG5cdFx0XHQjIEludGVyYWN0aW9uXG5cdFx0XHRwcm9kQ2FyZC5vblRhcCAtPlxuXHRcdFx0XHRwcmludCBcIlByb2R1Y3QgdGFwXCJcblx0XHRcblx0XHQjIFNob3cgTW9yZSBjYXJkIC8gYnV0dG9uXG5cdFx0QHNob3dNb3JlQ2FyZCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJTaG93TW9yZdChYXJkXCJcblx0XHRcdHdpZHRoOiAxOThcblx0XHRcdGhlaWdodDogQGhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XG5cdFx0QGJ1dHRvblNob3dNb3JlID0gbmV3IEJ1dHRvblxuXHRcdFx0bmFtZTogXCJTaG93IG1vcmUgYnRuXCJcblx0XHRcdHRleHQ6IFwiU2hvdyBtb3JlXCJcblx0XHRcdHR5cGU6IFwiZmxhdFwiXG5cdFx0XHRpY29uOiBcImFycm93LXJpZ2h0XCJcblx0XHRcdGljb25BbGlnbjogXCJyaWdodFwiXG5cdFx0XHRwYXJlbnQ6IEBzaG93TW9yZUNhcmRcblx0XHRcdHdpZHRoOiAxMzRcblx0XHRcdG1pZFg6IEBzaG93TW9yZUNhcmQubWlkWFxuXHRcdFx0bWlkWTogQHNob3dNb3JlQ2FyZC5taWRZXG5cdFx0XG5cdFx0QGFkZFBhZ2UoQHNob3dNb3JlQ2FyZCkiLCIjIyMjIyMjIyMjIyBSRUZJTkUgRklMVEVSICMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LlByb2R1Y3RDYXJkIGV4dGVuZHMgTGF5ZXJcblx0IyBSZWZlcmVuY2VzIGZyb20gRGRlc2lnbiBtb2RlXG5cdHByb2R1Y3RDYXJkID0gc3dpcGVfcHJvZHVjdF9jYXJkXG5cdGJyYW5kVGV4dCA9IHByb2R1Y3RDYXJkLnNlbGVjdENoaWxkKFwiYnJhbmRcIilcblx0ZGVzY3JpcHRpb25UZXh0ID0gcHJvZHVjdENhcmQuc2VsZWN0Q2hpbGQoXCJzaG9ydF9kZXNjcmlwdGlvblwiKVxuXHRwcmljZVRleHQgPSBwcm9kdWN0Q2FyZC5zZWxlY3RDaGlsZChcInByaWNlXCIpXG5cdCMgU3BhY2VzXG5cdEJyYW5kRGVzY3JpcHRpb25TcGFzZSA9IGRlc2NyaXB0aW9uVGV4dC55IC0gYnJhbmRUZXh0Lm1heFlcblx0RGVzY3JpcHRpb25QcmljZVNwYXNlID0gcHJpY2VUZXh0LnkgLSBkZXNjcmlwdGlvblRleHQubWF4WVxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdG9wdCA9IF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHdpZHRoOiBwcm9kdWN0Q2FyZC53aWR0aFxuXHRcdFx0aGVpZ2h0OiBwcm9kdWN0Q2FyZC5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRjb3ZlcjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wMS5qcGdcIlxuXHRcdFx0YnJhbmRUZXh0OiBicmFuZFRleHQudGV4dFxuXHRcdFx0ZGVzY3JpcHRpb25UZXh0OiBkZXNjcmlwdGlvblRleHQudGV4dFxuXHRcdFx0cHJpY2VUZXh0OiBwcmljZVRleHQudGV4dFxuXHRcdHN1cGVyIG9wdFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXHRcdFx0XG5cdFx0IyBDb3ZlciBpbWFnZVxuXHRcdEBwcm9kQmFja2dyb3VkID0gcHJvZHVjdENhcmQuc2VsZWN0Q2hpbGQoXCJwcm9kX2JhY2tncm91bmRcIikuY29weSgpXG5cdFx0QHByb2RCYWNrZ3JvdWQucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRAcHJvZEJhY2tncm91ZC5zZWxlY3RDaGlsZChcImltYWdlXCIpLnByb3BzID1cblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRcIm1peC1ibGVuZC1tb2RlXCI6IFwibXVsdGlwbHlcIlxuXHRcdFx0aW1hZ2U6IEBvcHQuY292ZXJcblx0XHRcblx0XHQjIFdpc2hsaXN0IGljb25cblx0XHRAd2lzaGxpc3QgPSBwcm9kdWN0Q2FyZC5zZWxlY3RDaGlsZChcIndpc2hsaXN0LWljb1wiKS5jb3B5KClcblx0XHRAd2lzaGxpc3QucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XG5cdFx0IyBUZXh0XG5cdFx0QGJyYW5kID0gYnJhbmRUZXh0LmNvcHkoKVxuXHRcdEBicmFuZC5wcm9wcyA9XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdGZvbnRGYW1pbHk6IGJyYW5kVGV4dC5mb250RmFtaWx5XG5cdFx0XHRmb250V2VpZ2h0OiBicmFuZFRleHQuZm9udFdlaWdodFxuXHRcdFx0dGV4dDogQG9wdC5icmFuZFRleHRcblx0XHRcdHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCJcblx0XHRcdGZyYW1lOiBicmFuZFRleHQuZnJhbWVcblx0XHRcblx0XHRAc2hvcnRfZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblRleHQuY29weSgpXG5cdFx0QHNob3J0X2Rlc2NyaXB0aW9uLnByb3BzID1cblx0XHRcdGF1dG9IZWlnaHQ6IHRydWVcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0Zm9udFNpemU6IGRlc2NyaXB0aW9uVGV4dC5mb250U2l6ZSArIDFcblx0XHRcdGZvbnRGYW1pbHk6IGRlc2NyaXB0aW9uVGV4dC5mb250RmFtaWx5XG5cdFx0XHRmb250V2VpZ2h0OiBkZXNjcmlwdGlvblRleHQuZm9udFdlaWdodFxuXHRcdFx0dGV4dDogQG9wdC5kZXNjcmlwdGlvblRleHRcblx0XHRcdHk6IEBicmFuZC5tYXhZICsgQnJhbmREZXNjcmlwdGlvblNwYXNlXG5cdFx0XG5cdFx0QHByaWNlID0gcHJpY2VUZXh0LmNvcHkoKVxuXHRcdEBwcmljZS5wcm9wcyA9XG5cdFx0XHRhdXRvSGVpZ2h0OiB0cnVlXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdGZvbnRGYW1pbHk6IHByaWNlVGV4dC5mb250RmFtaWx5XG5cdFx0XHRmb250V2VpZ2h0OiBwcmljZVRleHQuZm9udFdlaWdodFxuXHRcdFx0dGV4dDogQG9wdC5wcmljZVRleHRcblx0XHRcdHk6IEBzaG9ydF9kZXNjcmlwdGlvbi5tYXhZICsgRGVzY3JpcHRpb25QcmljZVNwYXNlXG5cblx0XHQjIFJlc2V0IGZvbnQgc2l6ZVxuXHRcdEBzaG9ydF9kZXNjcmlwdGlvbi5mb250U2l6ZSA9IGRlc2NyaXB0aW9uVGV4dC5mb250U2l6ZVxuXG5cdCMjIyMjIyMjIyMjIyMjIyMg8J+SviBHRVRUSU5HIEFORCBTRVRUSU5HIENMQVNTIERBVEEgIyMjIyMjIyMjIyMjIyMjXG5cdEBkZWZpbmUgJ2NvdmVyJywgXG5cdFx0Z2V0OiAtPiBAb3B0LmNvdmVyXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRpZiAhIUBjaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0QHNlbGVjdENoaWxkKFwiaW1hZ2VcIikuaW1hZ2UgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ2JyYW5kVGV4dCcsIFxuXHRcdGdldDogLT4gQG9wdC5icmFuZFRleHRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdGlmICEhQGNoaWxkcmVuLmxlbmd0aFxuXHRcdFx0XHRAb3B0LmJyYW5kVGV4dCA9IHZhbHVlXG5cdFx0XHRcdEBicmFuZC50ZXh0ID0gdmFsdWVcblxuXHRAZGVmaW5lICdkZXNjcmlwdGlvblRleHQnLCBcblx0XHRnZXQ6IC0+IEBvcHQuZGVzY3JpcHRpb25UZXh0XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRpZiAhIUBjaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0QG9wdC5kZXNjcmlwdGlvblRleHQgPSB2YWx1ZVxuXHRcdFx0XHRAc2hvcnRfZGVzY3JpcHRpb24udGV4dCA9IHZhbHVlXG5cdFx0XHRcdEBwcmljZS55ID0gQHNob3J0X2Rlc2NyaXB0aW9uLm1heFkgKyBEZXNjcmlwdGlvblByaWNlU3Bhc2VcblxuXHRAZGVmaW5lICdwcmljZVRleHQnLCBcblx0XHRnZXQ6IC0+IEBvcHQucHJpY2VUZXh0XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRpZiAhIUBjaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0QG9wdC5wcmljZVRleHQgPSB2YWx1ZVxuXHRcdFx0XHRAcHJpY2UudGV4dCA9IHZhbHVlIiwiIyMjIyMjIyMjIyMgUE9TIEJBTk5FUiAjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5Qb3NCYW5uZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHRcblx0XHQjIENvbXBvbmVudCBmcmFtZSBmcm9tIERlc2lnbiBNb2RlXG5cdFx0Y29tcF9mcmFtZSA9IHBvc19iYW5uZXJcblx0XHRcblx0XHRAdGV4dF9mcmFtZSA9IGNvbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJ0ZXh0XCIpLmNvcHkoKVxuXG5cdFx0IyBJbml0aWFsaXNlIHRoZSBjbGFzc1xuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdGhlaWdodDogY29tcF9mcmFtZS5oZWlnaHRcblx0XHRcdHdpZHRoOiBjb21wX2ZyYW1lLndpZHRoXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbXBfZnJhbWUuYmFja2dyb3VuZENvbG9yXG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBALCBAb3B0LnkpXG5cdFx0XHRcblx0XHQjIFN0YWdpbmcgZnJhbWVzXG5cdFx0QHRleHRfZnJhbWUucGFyZW50ID0gQFxuXG5cdCMjIyMjIyMjIyMjIyMjIEdFVCwgU0VUIEFUUklCVVRFUyAjIyMjIyMjIyMjIyMjIyNcblxuXHRAZGVmaW5lIFwidGV4dFwiLFxuXHRcdGdldDogLT4gQG9wdC50ZXh0XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0LnRleHQgPSB2YWx1ZVxuXHRcdFx0QHRleHRfZnJhbWUudGV4dCA9IHZhbHVlIiwiIyMjIyMjIyMjIyMgTUUgLSBTSUdOIElOICMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93Lk1lU2lnbkluIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0XG5cdFx0IyBDb21wb25lbnQgZnJhbWUgZnJvbSBEZXNpZ24gTW9kZVxuXHRcdGNvbXBfZnJhbWUgPSBtZV9zaWduX2luXG5cdFx0XG5cdFx0QG1lU2lnbkluX2ZyYW1lID0gY29tcF9mcmFtZS5jb3B5KClcblx0XHRAbWVTaWduSW5fZnJhbWUucHJvcHMgPSBcblx0XHRcdHg6IDAsIHk6IDBcblx0XHRcdFxuXHRcdCMgSW5pdGlhbGlzZSB0aGUgY2xhc3Ncblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHRoZWlnaHQ6IGNvbXBfZnJhbWUuaGVpZ2h0XG5cdFx0XHR3aWR0aDogY29tcF9mcmFtZS53aWR0aFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXHRcdFx0XG5cdFx0IyBTdGFnaW5nIGZyYW1lc1xuXHRcdEBtZVNpZ25Jbl9mcmFtZS5wYXJlbnQgPSBAIiwiIyMjIyMjIyMjIyMgTUUgLSBTSUdOIElOICMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93Lk1lQ29udGFjdFVzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0XG5cdFx0IyBDb21wb25lbnQgZnJhbWUgZnJvbSBEZXNpZ24gTW9kZVxuXHRcdGNvbnRhY3RVc19mcmFtZSA9IGNvbnRhY3RfdXNcblx0XHRcblx0XHRAY29udGFjdFVzX2ZyYW1lID0gY29udGFjdFVzX2ZyYW1lLmNvcHkoKVxuXHRcdEBjb250YWN0VXNfZnJhbWUucHJvcHMgPSBcblx0XHRcdHg6IDAsIHk6IDBcblx0XHRcdFxuXHRcdCMgSW5pdGlhbGlzZSB0aGUgY2xhc3Ncblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHRoZWlnaHQ6IGNvbnRhY3RVc19mcmFtZS5oZWlnaHRcblx0XHRcdHdpZHRoOiBjb250YWN0VXNfZnJhbWUud2lkdGhcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXHRcdCMgU3RhZ2luZyBmcmFtZXNcblx0XHRAY29udGFjdFVzX2ZyYW1lLnBhcmVudCA9IEAiLCIjIyMjIyMjIyMjIyBMaXN0IFRpdGxlICMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93Lkxpc3RUaXRsZSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdFxuXHRcdCMgQ29tcG9uZW50IGZyYW1lIGZyb20gRGVzaWduIE1vZGVcblx0XHRjb21wX2ZyYW1lID0gbGlzdF90aXRsZVxuXHRcdFxuXHRcdEB0ZXh0X2ZyYW1lID0gY29tcF9mcmFtZS5zZWxlY3RDaGlsZChcInRleHRcIikuY29weSgpXG5cblx0XHQjIEluaXRpYWxpc2UgdGhlIGNsYXNzXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0aGVpZ2h0OiBjb21wX2ZyYW1lLmhlaWdodFxuXHRcdFx0d2lkdGg6IGNvbXBfZnJhbWUud2lkdGhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogY29tcF9mcmFtZS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblx0XHRcdFxuXHRcdCMgU3RhZ2luZyBmcmFtZXNcblx0XHRAdGV4dF9mcmFtZS5wYXJlbnQgPSBAXG5cblx0IyMjIyMjIyMjIyMjIyMgR0VULCBTRVQgQVRSSUJVVEVTICMjIyMjIyMjIyMjIyMjI1xuXG5cdEBkZWZpbmUgXCJ0ZXh0XCIsXG5cdFx0Z2V0OiAtPiBAb3B0LnRleHRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHQudGV4dCA9IHZhbHVlXG5cdFx0XHRAdGV4dF9mcmFtZS50ZXh0ID0gdmFsdWUiLCIjIyNcbnJhZGlvU2VsZWN0ID0gbmV3IExpc3RSYWRpb1NlbGVjdFxuXHRzZWxlY3RBcnJheTogW1xuXHRcdHt0ZXh0IDogXCJMaXN0IEl0ZW0gMVwifSwgXG5cdFx0e3RleHQgOiBcIkxpc3QgSXRlbSAyXCIsIG9uIDogdHJ1ZX1cblx0XHR7dGV4dDogXCJMaXN0IEl0ZW0gM1wifVxuXHRcdF1cbiMjI1xuXG4jIyMjIyMjIyMjIyBMaXN0IFNlbGVjdCBSYWRpbyAjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5MaXN0UmFkaW9TZWxlY3QgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHRvcHQgPSBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0c3VwZXJcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXHRcdEBsaXN0ID0gbmV3IExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcihcInRyYW5zcGFyZW50XCIpXG5cdFx0XHRuYW1lOiBcIkxpc3RSYWRpb1NlbGVjdFwiXG5cdFx0XG5cdFx0QGxpc3RBcnJheSA9IFtdICMgU3RvcmFnZSBmb3IgdGhlIGxpc3Rcblx0XHRcblx0XHRmb3IgaSBpbiBbMC4uLkBvcHQuc2VsZWN0QXJyYXkubGVuZ3RoXVxuXHRcdFx0QGxpc3RJdGVtID0gbmV3IExpc3RJdGVtXG5cdFx0XHRcdHBhcmVudDogQGxpc3Rcblx0XHRcdFx0dGV4dDogQG9wdC5zZWxlY3RBcnJheVtpXS50ZXh0XG5cdFx0XHRcdHJpZ2h0OiBcInJhZGlvLW9mZlwiXG5cdFx0XHRAbGlzdEl0ZW0uc3RhdGVzLm9uID1cblx0XHRcdFx0cmlnaHQ6IFwicmFkaW8tb25cIlxuXHRcdFx0QGxpc3RJdGVtLnN0YXRlcy5vZmYgPVxuXHRcdFx0XHRyaWdodDogXCJyYWRpby1vZmZcIlxuXHRcdFx0QGxpc3RJdGVtLnkgPSBAbGlzdEl0ZW0uaGVpZ2h0ICogaVx0XHRcdFxuXHRcdFx0aWYgQG9wdC5zZWxlY3RBcnJheVtpXS5vbiA9PSB0cnVlXG5cdFx0XHRcdEBsaXN0SXRlbS5zdGF0ZVN3aXRjaChcIm9uXCIpXG5cblx0XHRcdEBsaXN0QXJyYXkucHVzaChAbGlzdEl0ZW0pICMgU3RvcmUgTGlzdFxuXHRcdFx0XG5cdFx0XHRAbGlzdEl0ZW0ub25UYXAgKGV2ZW50LCBsYXllcikgPT5cblx0XHRcdFx0Zm9yIGkgaW4gWzAuLi5AbGlzdEFycmF5Lmxlbmd0aF1cblx0XHRcdFx0XHRAbGlzdEFycmF5W2ldLnN0YXRlU3dpdGNoKFwib2ZmXCIpXG5cdFx0XHRcdGxheWVyLnN0YXRlU3dpdGNoKFwib25cIilcblx0XHRAbGlzdC5oZWlnaHQgPSBAbGlzdEFycmF5Lmxlbmd0aCAqIEBsaXN0SXRlbS5oZWlnaHRcblxuXHRcdEBsaXN0LnBhcmVudCA9IEBcblx0XHRAaGVpZ2h0ID0gQGxpc3QuaGVpZ2h0ICMgaGVscCB0byBhbGlnblxuIiwiIyMjIyMjIyMjIyMjIyMgTElTVCBQUk9EVUNUIENBUkQgIyMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuTGlzdFByb2R1Y3RDYXJkIGV4dGVuZHMgTGF5ZXJcblx0IyBWYXJpYWJsZXNcblx0Y21wX2ZyYW1lID0gbGlzdF9wcm9kdWN0X2NhcmRcblx0IyBTcGFjZXNcblx0ZGVzY3JpcHRpb25QcmljZVNwYWNlID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwicHJpY2VcIikueSAtIGxpc3RfcHJvZHVjdF9jYXJkLnNlbGVjdENoaWxkKFwiZGVzY3JpcHRpb25cIikubWF4WVxuXHRwcmljZVBhcmVudFNwYWNlID0gY21wX2ZyYW1lLmhlaWdodCAtIGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcInByaWNlXCIpLm1heFlcblx0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdFxuXHRcdCMgQ292ZXIgaW1hZ2Vcblx0XHRAY292ZXJfZnJhbWUgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJpbWFnZVwiKS5jb3B5KClcblx0XHRAY292ZXJfZnJhbWUucHJvcHMgPVxuXHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXHRcdFxuXHRcdCMgU2Vhc29uIGxhYmVsXG5cdFx0QHNlYXNvbl9mcmFtZSA9IGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcInNlYXNvblwiKS5jb3B5KClcblx0XHRAc2Vhc29uX2ZyYW1lLnByb3BzID1cblx0XHRcdGF1dG9IZWlnaHQ6IHRydWVcblx0XHRcblx0XHQjIEJyYW5kIHRleHRcblx0XHRAYnJhbmRfZnJhbWUgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJicmFuZFwiKS5jb3B5KClcblx0XHRAYnJhbmRfZnJhbWUucHJvcHMgPVxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjIpXCIgIyBEZWJ1ZyBsYXllclxuXHRcdFx0dGV4dFRyYW5zZm9ybTogXCJ1cHBlcmNhc2VcIlxuXHRcdFx0Zm9udEZhbWlseTogXCJQb2xhcmlzIENvbmRlbnNlZCwgQXZlbmlyTmV4dENvbmRlbnNlZC1SZWd1bGFyXCJcblx0XHRcdGF1dG9IZWlnaHQ6IHRydWVcblx0XHRuZXdIZWlnaHQgPSBAYnJhbmRfZnJhbWUuaGVpZ2h0XG5cdFx0XG5cdFx0IyBEZXNjcmlwdGlvbiB0ZXh0XG5cdFx0QGRlc2NyaXB0aW9uX2ZyYW1lID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiZGVzY3JpcHRpb25cIikuY29weSgpXG5cdFx0QGRlc2NyaXB0aW9uX2ZyYW1lLnByb3BzID1cblx0XHRcdGF1dG9IZWlnaHQ6IHRydWVcblx0XHRcdCMgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC40KVwiICMgRGVidWcgbGF5ZXJcblx0XHRcdHk6IEBicmFuZF9mcmFtZS5tYXhZXG5cdFx0XHRmb250RmFtaWx5OiBcIlBvbGFyaXNcIlxuXHRcdFxuXHRcdCMgUHJpY2UgdGV4dFxuXHRcdEBwcmljZV9mcmFtZSA9IGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcInByaWNlXCIpLmNvcHkoKVxuXHRcdEBwcmljZV9mcmFtZS5wcm9wcyA9XG5cdFx0XHRhdXRvSGVpZ2h0OiB0cnVlXG5cdFx0XHR5OiBAZGVzY3JpcHRpb25fZnJhbWUubWF4WSArIGRlc2NyaXB0aW9uUHJpY2VTcGFjZVxuXHRcdFx0XG5cdFx0IyBUb3AtcmlnaHQgaWNvblxuXHRcdEBpY29uX2ZyYW1lID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiaWNvblwiKS5jb3B5KClcblx0XHRAaWNvbl9mcmFtZS5zZWxlY3RDaGlsZChcIndpc2hsaXN0LnN2Z1wiKS5kZXN0cm95KClcblx0XHRAaWNvbl9mcmFtZS5wcm9wcyA9XG5cdFx0XHRpbWFnZTogXCJtb2R1bGVzL0ZGS2l0L2Fzc2V0cy9pY29ucy93aXNobGlzdC5zdmdcIlxuXHRcdFx0b3BhY2l0eTogMC4zXG5cdFx0IyBBZGQgYW5pbWF0aW9uIG9uIHRhcFxuXHRcdGljb25DaGFuZ2VTdGF0ZShAaWNvbl9mcmFtZSlcblx0XHRcblx0XHQjIFN0b3JlIGRlZmF1bHQgcHJvcHMgZm9yIHRoZSBwYXJlbnQgY29udGFpbmVyXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IGNtcF9mcmFtZS53aWR0aFxuXHRcdFx0aGVpZ2h0OiBjbXBfZnJhbWUuaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNtcF9mcmFtZS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0IyBBZGQgYWxsIGNoaWxkcmVuIHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXG5cdFx0YWRkQ2hpbGRyZW4oQCwgW0Bjb3Zlcl9mcmFtZSwgQHNlYXNvbl9mcmFtZSwgQGJyYW5kX2ZyYW1lLCBAZGVzY3JpcHRpb25fZnJhbWUsIEBwcmljZV9mcmFtZSwgQGljb25fZnJhbWVdKVxuXG5cdCMjIyMjIyMjIyMjIyMjIyMgUFJJVkFURSBNRVRIT0QgKCkgIyMjIyMjIyMjIyMjIyMjI1xuXHQjIFN0YXRlIGFuaW1hdGlvbiBmb3IgdGhlIGljb25cblx0aWNvbkNoYW5nZVN0YXRlID0gKGxheWVyKSAtPlxuXHRcdGxheWVyLm9uVGFwIC0+XG5cdFx0XHRpZiBAb3BhY2l0eSA8IDFcblx0XHRcdFx0QGFuaW1hdGVcblx0XHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRcdFx0b3B0aW9uczogdGltZTogMC4yXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBhbmltYXRlXG5cdFx0XHRcdFx0b3BhY2l0eTogMC4zXG5cdFx0XHRcdFx0b3B0aW9uczogdGltZTogMC4yXG5cblx0IyMjIyMjIyMjIyMjIyMjIyDwn5K+IEdFVFRJTkcgQU5EIFNFVFRJTkcgQ0xBU1MgREFUQSAjIyMjIyMjIyMjIyMjIyNcblx0QGRlZmluZSBcImNvdmVyXCIsXG5cdFx0Z2V0OiAtPiBAb3B0LmNvdmVyXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0LmNvdmVyID0gdmFsdWVcblx0XHRcdEBjb3Zlcl9mcmFtZS5pbWFnZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lIFwic2Vhc29uXCIsXG5cdFx0Z2V0OiAtPiBAb3B0LnNlYXNvblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdC5zZWFzb24gPSB2YWx1ZVxuXHRcdFx0QHNlYXNvbl9mcmFtZS50ZXh0ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgXCJicmFuZFwiLFxuXHRcdGdldDogLT4gQG9wdC5icmFuZFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdC5icmFuZCA9IHZhbHVlXG5cdFx0XHRAYnJhbmRfZnJhbWUudGV4dCA9IHZhbHVlXG5cdFx0XHQjIEZpeCB0aGUgZGlzdGFuY2Vcblx0XHRcdEBkZXNjcmlwdGlvbl9mcmFtZS55ID0gQGJyYW5kX2ZyYW1lLm1heFlcblx0XHRcdEBwcmljZV9mcmFtZS55ID0gQGRlc2NyaXB0aW9uX2ZyYW1lLm1heFkgKyBkZXNjcmlwdGlvblByaWNlU3BhY2Vcblx0XG5cdEBkZWZpbmUgXCJkZXNjcmlwdGlvblwiLFxuXHRcdGdldDogLT4gQG9wdC5kZXNjcmlwdGlvblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0aWYgdmFsdWUgaXMgZmFsc2Ugb3IgXCJcIlxuXHRcdFx0XHRAZGVzY3JpcHRpb25fZnJhbWUuaGVpZ2h0ID0gMVxuXHRcdFx0XHRAcHJpY2VfZnJhbWUueSA9IEBkZXNjcmlwdGlvbl9mcmFtZS5tYXhZICsgZGVzY3JpcHRpb25QcmljZVNwYWNlXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBvcHQuZGVzY3JpcHRpb24gPSB2YWx1ZVxuXHRcdFx0XHRAZGVzY3JpcHRpb25fZnJhbWUudGV4dCA9IHZhbHVlXG5cdFx0XHRcdCMgRml4IHRoZSBkaXN0YW5jZVxuXHRcdFx0XHRAcHJpY2VfZnJhbWUueSA9IEBkZXNjcmlwdGlvbl9mcmFtZS5tYXhZICsgZGVzY3JpcHRpb25QcmljZVNwYWNlXG5cdFxuXHRAZGVmaW5lIFwicHJpY2VcIixcblx0XHRnZXQ6IC0+IEBvcHQucHJpY2Vcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHQucHJpY2UgPSB2YWx1ZVxuXHRcdFx0QHByaWNlX2ZyYW1lLnRleHQgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSBcImljb25cIixcblx0XHRnZXQ6IC0+IEBvcHQuaWNvblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdC5pY29uID0gXCJtb2R1bGVzL0ZGS2l0L2Fzc2V0cy9pY29ucy8je3ZhbHVlfS5zdmdcIlxuXHRcdFx0QGljb25fZnJhbWUuaW1hZ2UgPSBcIm1vZHVsZXMvRkZLaXQvYXNzZXRzL2ljb25zLyN7dmFsdWV9LnN2Z1wiXG5cdFx0XHRpY29uQ2hhbmdlU3RhdGUoQGljb25fZnJhbWUpXG5cbiIsIiMjIyMjIyMjIyMjIE1vZGVsICMjIyMjIyMjIyMjXG4jIGxpc3RJdGVtID0gbmV3IExpc3RJdGVtXG4jIFx0dGV4dDogXCJIZWxsbyBXb3JsZFwiXG4jIFx0cmlnaHQ6IFwiYXJyb3ctcmlnaHRcIlxuIyBcdGZsYWc6IFwidWtcIlxuIyBcdGxpbmU6IGZhbHNlLCBcImZ1bGx3aWR0aFwiXG4jIFx0bGluZVRvcDogdHJ1ZSwgXCJmdWxsd2lkdGhcIlxuI1x0dHlwZTogXCJ3aWRlXCJcblxuXG4jIyMjIyMjIyMjIyBMaXN0IEl0ZW0gIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuTGlzdEl0ZW0gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHQjIENvbXBvbmVudCBmcmFtZSBmcm9tIERlc2lnbiBNb2RlXG5cdFx0Y29tcF9mcmFtZSA9IGxpc3RfaXRlbVxuXHRcdHdpZGVfdHlwZV9mcmFtZSA9IHdpZGVfbGlzdF9pdGVtXG5cblx0XHQjIENyZWF0ZSBzdWJseWVyc1xuXHRcdEB0ZXh0X2ZyYW1lID0gY29tcF9mcmFtZS5zZWxlY3RDaGlsZChcInRleHRcIikuY29weSgpXG5cdFx0QHRleHRfZnJhbWUucHJvcHMgPVxuXHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXG5cdFx0QGxpbmVfZnJhbWUgPSBjb21wX2ZyYW1lLnNlbGVjdENoaWxkKFwibGluZVwiKS5jb3B5KClcblxuXHRcdEBmbGFnX2ZyYW1lID0gbmV3IExheWVyXG5cdFx0QGZsYWdfZnJhbWUucHJvcHMgPSBsaXN0X2l0ZW1fZmxhZy5zZWxlY3RDaGlsZChcImZsYWdcIikucHJvcHNcblxuXHRcdHN3aXRjaCBcblx0XHRcdCMgTm9ybWFsIGxpc3QgaXRlbSB3aXRoID4gaWNvblxuXHRcdFx0d2hlbiBAb3B0LnJpZ2h0IGlzbnQgXCJ0b2dnbGVcIiMgYW5kIEBvcHQucmlnaHQgaXNudCBmYWxzZSBcblx0XHRcdFx0QHJpZ2h0X2ZyYW1lID0gbmV3IExheWVyIFxuXHRcdFx0XHRAcmlnaHRfZnJhbWUucHJvcHMgPSBjb21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiaWNvblwiKS5wcm9wc1xuXHRcdFx0IyBUb2dnbGVcblx0XHRcdHdoZW4gIEBvcHQucmlnaHQgaXMgXCJ0b2dnbGVcIiBcblx0XHRcdFx0QHJpZ2h0X2ZyYW1lID0gbmV3IGlPU1N3aXRjaCAjIFVzaW5nIGlPU1N3aXRjaCBjb21wb25lbnRcblx0XHRcdFx0XHRpc09uOiB0cnVlXG5cdFx0XHRcdFx0eDogbGlzdF9pdGVtX3RvZ2dsZS5zZWxlY3RDaGlsZChcInRvZ2dsZVwiKS54XG5cdFx0XHRcdFx0eTogbGlzdF9pdGVtX3RvZ2dsZS5zZWxlY3RDaGlsZChcInRvZ2dsZVwiKS55XG5cblx0XHRzd2l0Y2hcblx0XHRcdCMgVG9wIGxpbmVcblx0XHRcdHdoZW4gQG9wdC5saW5lVG9wIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRcdEBsaW5lVG9wX2ZyYW1lID0gY29tcF9mcmFtZS5zZWxlY3RDaGlsZChcImxpbmVcIikuY29weSgpXG5cdFx0XHRcdEBsaW5lVG9wX2ZyYW1lLnkgPSAwXG5cblx0XHQjIEluaXRpYWxpc2UgdGhlIGNsYXNzXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0aGVpZ2h0OiBjb21wX2ZyYW1lLmhlaWdodFxuXHRcdFx0d2lkdGg6IGNvbXBfZnJhbWUud2lkdGhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogY29tcF9mcmFtZS5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cblx0XHQjIFN0YWdpbmcgZnJhbWVzXG5cdFx0IyBjb25kaXRpb25hbCBjaGlsZHJlblxuXHRcdGlmIEBvcHQubGluZSBpc250IGZhbHNlIHRoZW4gQGxpbmVfZnJhbWUucGFyZW50ID0gQCBlbHNlIEBsaW5lX2ZyYW1lLmRlc3Ryb3koKVxuXHRcdGlmIEBvcHQucmlnaHQgaXNudCB1bmRlZmluZWQgYW5kIEBvcHQucmlnaHQgaXNudCBmYWxzZSB0aGVuIEByaWdodF9mcmFtZS5wYXJlbnQgPSBAIGVsc2UgQHJpZ2h0X2ZyYW1lLmRlc3Ryb3koKVxuXHRcdGlmIEBvcHQuZmxhZyBpc250IHVuZGVmaW5lZCB0aGVuIEBmbGFnX2ZyYW1lLnBhcmVudCA9IEAgZWxzZSBAZmxhZ19mcmFtZS5kZXN0cm95KClcblx0XHRpZiBAb3B0LmxpbmVUb3AgaXNudCB1bmRlZmluZWQgdGhlbiBAbGluZVRvcF9mcmFtZS5wYXJlbnQgPSBAXG5cblx0XHRhZGRDaGlsZHJlbihALCBbQHRleHRfZnJhbWVdKVxuXG5cdFx0IyBpZiB0eXBlIGlzIFwid2lkZVwiIFxuXHRcdHN3aXRjaCBAb3B0LnR5cGVcblx0XHRcdHdoZW4gXCJ3aWRlXCJcblx0XHRcdFx0QGhlaWdodCA9IDc3XG5cblx0XHRcdFx0QHRleHRfZnJhbWUucHJvcHMgPVxuXHRcdFx0XHRcdGZvbnRGYW1pbHk6IHdpZGVfdHlwZV9mcmFtZS5zZWxlY3RDaGlsZChcInRleHRcIikuZm9udEZhbWlseVxuXHRcdFx0XHRcdGZvbnRTaXplOiB3aWRlX3R5cGVfZnJhbWUuc2VsZWN0Q2hpbGQoXCJ0ZXh0XCIpLmZvbnRTaXplXG5cdFx0XHRcdFx0eTogd2lkZV90eXBlX2ZyYW1lLnNlbGVjdENoaWxkKFwidGV4dFwiKS55XG5cdFx0XHRcdFxuXHRcdFx0XHRAbGluZV9mcmFtZS5wcm9wcyA9XG5cdFx0XHRcdFx0eTogd2lkZV90eXBlX2ZyYW1lLnNlbGVjdENoaWxkKFwibGluZVwiKS55XG5cdFx0XHRcdFxuXHRcdFx0XHRAZmxhZ19mcmFtZS55ID0gQWxpZ24uY2VudGVyKC00KVxuXHRcdFx0XHRAcmlnaHRfZnJhbWUueSA9IEFsaWduLmNlbnRlcigtMilcblx0XHRcdGVsc2Vcblx0XHRcdFx0QGhlaWdodCA9IGNvbXBfZnJhbWUuaGVpZ2h0XG5cblxuXHQjIyMjIyMjIyMjIyMjIyBHRVQsIFNFVCBBVFJJQlVURVMgIyMjIyMjIyMjIyMjIyMjXG5cblx0QGRlZmluZSBcInRleHRcIixcblx0XHRnZXQ6IC0+IEBvcHQudGV4dFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdC50ZXh0ID0gdmFsdWVcblx0XHRcdEB0ZXh0X2ZyYW1lLnRleHQgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJsaW5lXCIsXG5cdFx0Z2V0OiAtPiBAb3B0LmxpbmVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdGlmIHZhbHVlID0gXCJmdWxsd2lkdGhcIlxuXHRcdFx0XHRAbGluZV9mcmFtZS54ID0gMFxuXHRcdFx0XHRAbGluZV9mcmFtZS53aWR0aCA9IFNjcmVlbi53aWR0aFxuXG5cdEBkZWZpbmUgXCJsaW5lVG9wXCIsXG5cdFx0Z2V0OiAtPiBAb3B0LmxpbmVUb3Bcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdGlmIHZhbHVlID09IFwiZnVsbHdpZHRoXCJcblx0XHRcdFx0QGxpbmVUb3BfZnJhbWUueCA9IDBcblx0XHRcdFx0QGxpbmVUb3BfZnJhbWUud2lkdGggPSBTY3JlZW4ud2lkdGhcblxuXHRAZGVmaW5lIFwicmlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAb3B0LnJpZ2h0LFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBvcHQucmlnaHQgPSB2YWx1ZVxuXHRcdFx0QHJpZ2h0X2ZyYW1lLmltYWdlID0gXCJtb2R1bGVzL0ZGS2l0L2Fzc2V0cy9pY29ucy8je3ZhbHVlfS5zdmdcIlxuXG5cdEBkZWZpbmUgXCJmbGFnXCIsIFxuXHRcdGdldDogLT4gQG9wdC5mYWxnLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBvcHQuZmxhZyA9IHZhbHVlXG5cdFx0XHRAZmxhZ19mcmFtZS5pbWFnZSA9IFwibW9kdWxlcy9GRktpdC9hc3NldHMvZmxhZ3MvI3t2YWx1ZX0ucG5nXCJcblx0XHRcdEB0ZXh0X2ZyYW1lLnggPSBAZmxhZ19mcmFtZS5tYXhYICsgU19zcGFjZXIiLCJjbGFzcyB3aW5kb3cuS2V5bGluZSBleHRlbmRzIExheWVyXG5cdCMgUmVmZXJlbmNlcyBmcm9tIERkZXNpZ24gbW9kZVxuXHRrZXlsaW5lID0ga2V5X2xpbmVcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHQ9e30pIC0+XG5cdFx0b3B0ID0gXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IGtleWxpbmUud2lkdGhcblx0XHRcdGhlaWdodDoga2V5bGluZS5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjoga2V5bGluZS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRzdXBlciBvcHRcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSkiLCJFdmVudHMuRW50ZXJLZXkgPSBcIkVudGVyS2V5XCJcbkV2ZW50cy5TcGFjZUtleSA9IFwiU3BhY2VLZXlcIlxuRXZlbnRzLkJhY2tzcGFjZUtleSA9IFwiQmFja3NwYWNlS2V5XCJcbkV2ZW50cy5DYXBzTG9ja0tleSA9IFwiQ2Fwc0xvY2tLZXlcIlxuRXZlbnRzLlNoaWZ0S2V5ID0gXCJTaGlmdEtleVwiXG5FdmVudHMuVmFsdWVDaGFuZ2UgPSBcIlZhbHVlQ2hhbmdlXCJcbkV2ZW50cy5JbnB1dEZvY3VzID0gXCJJbnB1dEZvY3VzXCJcbkV2ZW50cy5JbnB1dEJsdXIgPSBcIklucHV0Qmx1clwiXG5cbmNsYXNzIHdpbmRvdy5JbnB1dCBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNGRkZcIlxuXHRcdFx0d2lkdGg6IDM3NVxuXHRcdFx0aGVpZ2h0OiA2MFxuXHRcdFx0cGFkZGluZzpcblx0XHRcdFx0bGVmdDogMjBcblx0XHRcdHRleHQ6IFwiVHlwZSBzb21ldGhpbmcuLi5cIlxuXHRcdFx0Zm9udFNpemU6IDQwXG5cdFx0XHRmb250V2VpZ2h0OiAzMDBcblxuXHRcdGlmIG9wdGlvbnMubXVsdGlMaW5lXG5cdFx0XHRvcHRpb25zLnBhZGRpbmcudG9wID89IDIwXG5cblx0XHRAX2lucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuXHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHQjIEdsb2JhbHNcblx0XHRAX2JhY2tncm91bmQgPSB1bmRlZmluZWRcblx0XHRAX3BsYWNlaG9sZGVyID0gdW5kZWZpbmVkXG5cdFx0QF9pc0Rlc2lnbkxheWVyID0gZmFsc2VcblxuXHRcdCMgTGF5ZXIgY29udGFpbmluZyBpbnB1dCBlbGVtZW50XG5cdFx0QGlucHV0ID0gbmV3IExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0bmFtZTogXCJpbnB1dFwiXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0IyBUZXh0IGFyZWFcblx0XHRpZiBAbXVsdGlMaW5lXG5cdFx0XHRAX2lucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKVxuXG5cdFx0IyBBcHBlbmQgZWxlbWVudFxuXHRcdEBpbnB1dC5fZWxlbWVudC5hcHBlbmRDaGlsZChAX2lucHV0RWxlbWVudClcblxuXHRcdCMgTWF0Y2ggVGV4dExheWVyIGRlZmF1bHRzIGFuZCB0eXBlIHByb3BlcnRpZXNcblx0XHRAX3NldFRleHRQcm9wZXJ0aWVzKEApXG5cblx0XHQjIFNldCBhdHRyaWJ1dGVzXG5cdFx0QF9pbnB1dEVsZW1lbnQuYXV0b2NvbXBsZXRlID0gXCJvZmZcIlxuXHRcdEBfaW5wdXRFbGVtZW50LmF1dG9jb3JyZWN0ID0gXCJvZmZcIlxuXHRcdEBfaW5wdXRFbGVtZW50LnNwZWxsY2hlY2sgPSBmYWxzZVxuXG5cdFx0IyBUaGUgaWQgc2VydmVzIHRvIGRpZmZlcmVudGlhdGUgbXVsdGlwbGUgaW5wdXQgZWxlbWVudHMgZnJvbSBvbmUgYW5vdGhlci5cblx0XHQjIFRvIGFsbG93IHN0eWxpbmcgdGhlIHBsYWNlaG9sZGVyIGNvbG9ycyBvZiBzZXBlcmF0ZSBlbGVtZW50cy5cblx0XHRAX2lucHV0RWxlbWVudC5jbGFzc05hbWUgPSBcImlucHV0XCIgKyBAaWRcblxuXHRcdCMgQWxsIGluaGVyaXRlZCBwcm9wZXJ0aWVzXG5cdFx0dGV4dFByb3BlcnRpZXMgPVxuXHRcdFx0e0B0ZXh0LCBAZm9udEZhbWlseSwgQGZvbnRTaXplLCBAbGluZUhlaWdodCwgQGZvbnRXZWlnaHQsIEBjb2xvciwgQGJhY2tncm91bmRDb2xvciwgQHdpZHRoLCBAaGVpZ2h0LCBAcGFkZGluZywgQHBhcmVudH1cblxuXHRcdGZvciBwcm9wZXJ0eSwgdmFsdWUgb2YgdGV4dFByb3BlcnRpZXNcblxuXHRcdFx0QG9uIFwiY2hhbmdlOiN7cHJvcGVydHl9XCIsICh2YWx1ZSkgPT5cblx0XHRcdFx0IyBSZXNldCB0ZXh0TGF5ZXIgY29udGVudHNcblx0XHRcdFx0QF9lbGVtZW50SFRNTC5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9IFwiXCJcblxuXHRcdFx0XHRyZXR1cm4gaWYgQF9pc0Rlc2lnbkxheWVyXG5cdFx0XHRcdEBfc2V0VGV4dFByb3BlcnRpZXMoQClcblx0XHRcdFx0QF9zZXRQbGFjZWhvbGRlckNvbG9yKEBfaWQsIEBjb2xvcilcblxuXG5cdFx0IyBTZXQgZGVmYXVsdCBwbGFjZWhvbGRlclxuXHRcdEBfc2V0UGxhY2Vob2xkZXIoQHRleHQpXG5cdFx0QF9zZXRQbGFjZWhvbGRlckNvbG9yKEBfaWQsIEBjb2xvcilcblxuXHRcdCMgUmVzZXQgdGV4dExheWVyIGNvbnRlbnRzXG5cdFx0QF9lbGVtZW50SFRNTC5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9IFwiXCJcblxuXHRcdCMgQ2hlY2sgaWYgaW4gZm9jdXNcblx0XHRAX2lzRm9jdXNlZCA9IGZhbHNlXG5cblx0XHQjIERlZmF1bHQgZm9jdXMgaW50ZXJhY3Rpb25cblx0XHRAX2lucHV0RWxlbWVudC5vbmZvY3VzID0gKGUpID0+XG5cblx0XHRcdEBmb2N1c0NvbG9yID89IFwiIzAwMFwiXG5cblx0XHRcdCMgRW1pdCBmb2N1cyBldmVudFxuXHRcdFx0QGVtaXQoRXZlbnRzLklucHV0Rm9jdXMsIGV2ZW50KVxuXG5cdFx0XHRAX2lzRm9jdXNlZCA9IHRydWVcblxuXHRcdCMgRW1pdCBibHVyIGV2ZW50XG5cdFx0QF9pbnB1dEVsZW1lbnQub25ibHVyID0gKGUpID0+XG5cdFx0XHRAZW1pdChFdmVudHMuSW5wdXRCbHVyLCBldmVudClcblxuXHRcdFx0QF9pc0ZvY3VzZWQgPSBmYWxzZVxuXG5cdFx0IyBUbyBmaWx0ZXIgaWYgdmFsdWUgY2hhbmdlZCBsYXRlclxuXHRcdGN1cnJlbnRWYWx1ZSA9IHVuZGVmaW5lZFxuXG5cdFx0IyBTdG9yZSBjdXJyZW50IHZhbHVlXG5cdFx0QF9pbnB1dEVsZW1lbnQub25rZXlkb3duID0gKGUpID0+XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBAdmFsdWVcblxuXHRcdFx0IyBJZiBjYXBzIGxvY2sga2V5IGlzIHByZXNzZWQgZG93blxuXHRcdFx0aWYgZS53aGljaCBpcyAyMFxuXHRcdFx0XHRAZW1pdChFdmVudHMuQ2Fwc0xvY2tLZXksIGV2ZW50KVxuXG5cdFx0XHQjIElmIHNoaWZ0IGtleSBpcyBwcmVzc2VkXG5cdFx0XHRpZiBlLndoaWNoIGlzIDE2XG5cdFx0XHRcdEBlbWl0KEV2ZW50cy5TaGlmdEtleSwgZXZlbnQpXG5cblx0XHRAX2lucHV0RWxlbWVudC5vbmtleXVwID0gKGUpID0+XG5cblx0XHRcdGlmIGN1cnJlbnRWYWx1ZSBpc250IEB2YWx1ZVxuXHRcdFx0XHRAZW1pdChcImNoYW5nZTp2YWx1ZVwiLCBAdmFsdWUpXG5cdFx0XHRcdEBlbWl0KEV2ZW50cy5WYWx1ZUNoYW5nZSwgQHZhbHVlKVxuXG5cdFx0XHQjIElmIGVudGVyIGtleSBpcyBwcmVzc2VkXG5cdFx0XHRpZiBlLndoaWNoIGlzIDEzXG5cdFx0XHRcdEBlbWl0KEV2ZW50cy5FbnRlcktleSwgZXZlbnQpXG5cblx0XHRcdCMgSWYgYmFja3NwYWNlIGtleSBpcyBwcmVzc2VkXG5cdFx0XHRpZiBlLndoaWNoIGlzIDhcblx0XHRcdFx0QGVtaXQoRXZlbnRzLkJhY2tzcGFjZUtleSwgZXZlbnQpXG5cblx0XHRcdCMgSWYgc3BhY2Uga2V5IGlzIHByZXNzZWRcblx0XHRcdGlmIGUud2hpY2ggaXMgMzJcblx0XHRcdFx0QGVtaXQoRXZlbnRzLlNwYWNlS2V5LCBldmVudClcblxuXHRcdFx0IyBJZiBjYXBzIGxvY2sga2V5IGlzIHByZXNzZWQgdXBcblx0XHRcdGlmIGUud2hpY2ggaXMgMjBcblx0XHRcdFx0QGVtaXQoRXZlbnRzLkNhcHNMb2NrS2V5LCBldmVudClcblxuXHRfc2V0UGxhY2Vob2xkZXI6ICh0ZXh0KSA9PlxuXHRcdEBfaW5wdXRFbGVtZW50LnBsYWNlaG9sZGVyID0gdGV4dFxuXG5cdF9zZXRQbGFjZWhvbGRlckNvbG9yOiAoaWQsIGNvbG9yKSAtPlxuXHRcdGRvY3VtZW50LnN0eWxlU2hlZXRzWzBdLmFkZFJ1bGUoXCIuaW5wdXQje2lkfTo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlclwiLCBcImNvbG9yOiAje2NvbG9yfVwiKVxuXG5cdF9jaGVja0RldmljZVBpeGVsUmF0aW86IC0+XG5cdFx0cmF0aW8gPSAoU2NyZWVuLndpZHRoIC8gRnJhbWVyLkRldmljZS5zY3JlZW4ud2lkdGgpXG5cdFx0aWYgVXRpbHMuaXNEZXNrdG9wKClcblx0XHRcdCMgQDN4XG5cdFx0XHRpZiByYXRpbyA8IDAuNSBhbmQgcmF0aW8gPiAwLjI1XG5cdFx0XHRcdGRwciA9IDEgLSByYXRpb1xuXHRcdFx0IyBANHhcblx0XHRcdGVsc2UgaWYgcmF0aW8gaXMgMC4yNVxuXHRcdFx0XHRkcHIgPSAxIC0gKHJhdGlvICogMilcblx0XHRcdCMgQDF4LCBAMnhcblx0XHRcdGVsc2Vcblx0XHRcdFx0ZHByID0gVXRpbHMuZGV2aWNlUGl4ZWxSYXRpbygpXG5cdFx0XHRpZiBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgaXMgXCJmdWxsc2NyZWVuXCJcblx0XHRcdFx0ZHByID0gMlxuXHRcdGVsc2Vcblx0XHRcdCMgQDN4XG5cdFx0XHRpZiByYXRpbyA8IDAuNSBhbmQgcmF0aW8gPiAwLjI1XG5cdFx0XHRcdGRwciA9IDEgLSByYXRpb1xuXHRcdFx0IyBANHhcblx0XHRcdGVsc2UgaWYgcmF0aW8gaXMgMC4yNVxuXHRcdFx0XHRkcHIgPSAxIC0gKHJhdGlvICogMilcblx0XHRcdCMgQDF4LCBAMnhcblx0XHRcdGVsc2UgaWYgcmF0aW8gaXMgMC41XG5cdFx0XHRcdGRwciA9IDFcblxuXHRcdHJldHVybiBkcHJcblxuXHRfc2V0VGV4dFByb3BlcnRpZXM6IChsYXllcikgPT5cblxuXHRcdGRwciA9IEBfY2hlY2tEZXZpY2VQaXhlbFJhdGlvKClcblxuXHRcdGlmIG5vdCBAX2lzRGVzaWduTGF5ZXJcblx0XHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLmZvbnRGYW1pbHkgPSBsYXllci5mb250RmFtaWx5XG5cdFx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwiI3tsYXllci5mb250U2l6ZSAvIGRwcn1weFwiXG5cdFx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gbGF5ZXIuZm9udFdlaWdodCA/IFwibm9ybWFsXCJcblx0XHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLnBhZGRpbmdUb3AgPSBcIiN7bGF5ZXIucGFkZGluZy50b3AgKiAyIC8gZHByfXB4XCJcblx0XHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLnBhZGRpbmdSaWdodCA9IFwiI3tsYXllci5wYWRkaW5nLmJvdHRvbSAqIDIgLyBkcHJ9cHhcIlxuXHRcdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IFwiI3tsYXllci5wYWRkaW5nLnJpZ2h0ICogMiAvIGRwcn1weFwiXG5cdFx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9IFwiI3tsYXllci5wYWRkaW5nLmxlZnQgKiAyIC8gZHByfXB4XCJcblxuXHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLndpZHRoID0gXCIjeygobGF5ZXIud2lkdGggLSBsYXllci5wYWRkaW5nLmxlZnQgKiAyKSAqIDIgLyBkcHIpfXB4XCJcblx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIiN7bGF5ZXIuaGVpZ2h0ICogMiAvIGRwcn1weFwiXG5cdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUub3V0bGluZSA9IFwibm9uZVwiXG5cdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS53ZWJraXRBcHBlYXJhbmNlID0gXCJub25lXCJcblx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS5yZXNpemUgPSBcIm5vbmVcIlxuXHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIlxuXHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLndlYmtpdEZvbnRTbW9vdGhpbmcgPSBcImFudGlhbGlhc2VkXCJcblxuXHRhZGRCYWNrZ3JvdW5kTGF5ZXI6IChsYXllcikgLT5cblx0XHRAX2JhY2tncm91bmQgPSBsYXllclxuXHRcdEBfYmFja2dyb3VuZC5wYXJlbnQgPSBAXG5cdFx0QF9iYWNrZ3JvdW5kLm5hbWUgPSBcImJhY2tncm91bmRcIlxuXHRcdEBfYmFja2dyb3VuZC54ID0gQF9iYWNrZ3JvdW5kLnkgPSAwXG5cdFx0QF9iYWNrZ3JvdW5kLl9lbGVtZW50LmFwcGVuZENoaWxkKEBfaW5wdXRFbGVtZW50KVxuXG5cdFx0cmV0dXJuIEBfYmFja2dyb3VuZFxuXG5cdGFkZFBsYWNlSG9sZGVyTGF5ZXI6IChsYXllcikgLT5cblxuXHRcdEBfaXNEZXNpZ25MYXllciA9IHRydWVcblx0XHRAX2lucHV0RWxlbWVudC5jbGFzc05hbWUgPSBcImlucHV0XCIgKyBsYXllci5pZFxuXHRcdEBwYWRkaW5nID0gbGVmdDogMCwgdG9wOiAwXG5cblx0XHRAX3NldFBsYWNlaG9sZGVyKGxheWVyLnRleHQpXG5cdFx0QF9zZXRUZXh0UHJvcGVydGllcyhsYXllcilcblx0XHRAX3NldFBsYWNlaG9sZGVyQ29sb3IobGF5ZXIuaWQsIGxheWVyLmNvbG9yKVxuXG5cdFx0QG9uIFwiY2hhbmdlOmNvbG9yXCIsID0+XG5cdFx0XHRAX3NldFBsYWNlaG9sZGVyQ29sb3IobGF5ZXIuaWQsIEBjb2xvcilcblxuXHRcdCMgUmVtb3ZlIG9yaWdpbmFsIGxheWVyXG5cdFx0bGF5ZXIudmlzaWJsZSA9IGZhbHNlXG5cdFx0QF9lbGVtZW50SFRNTC5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9IFwiXCJcblxuXHRcdCMgQ29udmVydCBwb3NpdGlvbiB0byBwYWRkaW5nXG5cdFx0ZHByID0gQF9jaGVja0RldmljZVBpeGVsUmF0aW8oKVxuXHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCIje2xheWVyLmZvbnRTaXplICogMiAvIGRwcn1weFwiXG5cdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUucGFkZGluZ1RvcCA9IFwiI3tsYXllci55ICogMiAvIGRwcn1weFwiXG5cdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUucGFkZGluZ0xlZnQgPSBcIiN7bGF5ZXIueCAqIDIgLyBkcHJ9cHhcIlxuXHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLndpZHRoID0gXCIjeyhAX2JhY2tncm91bmQud2lkdGggLSBsYXllci54ICogMikgKiAyIC8gZHByfXB4XCJcblxuXHRcdGlmIEBtdWx0aUxpbmVcblx0XHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiI3tAX2JhY2tncm91bmQuaGVpZ2h0ICogMiAvIGRwcn1weFwiXG5cblx0XHRAb24gXCJjaGFuZ2U6cGFkZGluZ1wiLCA9PlxuXHRcdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUucGFkZGluZ1RvcCA9IFwiI3tAcGFkZGluZy50b3AgKiAyIC8gZHByfXB4XCJcblx0XHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLnBhZGRpbmdMZWZ0ID0gXCIje0BwYWRkaW5nLmxlZnQgKiAyIC8gZHByfXB4XCJcblxuXHRcdHJldHVybiBAX3BsYWNlaG9sZGVyXG5cblx0Zm9jdXM6IC0+XG5cdFx0QF9pbnB1dEVsZW1lbnQuZm9jdXMoKVxuXG5cdEBkZWZpbmUgXCJ2YWx1ZVwiLFxuXHRcdGdldDogLT4gQF9pbnB1dEVsZW1lbnQudmFsdWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfaW5wdXRFbGVtZW50LnZhbHVlID0gdmFsdWVcblxuXHRAZGVmaW5lIFwiZm9jdXNDb2xvclwiLFxuXHRcdGdldDogLT5cblx0XHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLmNvbG9yXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS5jb2xvciA9IHZhbHVlXG5cblx0QGRlZmluZSBcIm11bHRpTGluZVwiLCBAc2ltcGxlUHJvcGVydHkoXCJtdWx0aUxpbmVcIiwgZmFsc2UpXG5cblx0IyBOZXcgQ29uc3RydWN0b3Jcblx0QHdyYXAgPSAoYmFja2dyb3VuZCwgcGxhY2Vob2xkZXIsIG9wdGlvbnMpIC0+XG5cdFx0cmV0dXJuIHdyYXBJbnB1dChuZXcgQChvcHRpb25zKSwgYmFja2dyb3VuZCwgcGxhY2Vob2xkZXIsIG9wdGlvbnMpXG5cblx0b25FbnRlcktleTogKGNiKSAtPiBAb24oRXZlbnRzLkVudGVyS2V5LCBjYilcblx0b25TcGFjZUtleTogKGNiKSAtPiBAb24oRXZlbnRzLlNwYWNlS2V5LCBjYilcblx0b25CYWNrc3BhY2VLZXk6IChjYikgLT4gQG9uKEV2ZW50cy5CYWNrc3BhY2VLZXksIGNiKVxuXHRvbkNhcHNMb2NrS2V5OiAoY2IpIC0+IEBvbihFdmVudHMuQ2Fwc0xvY2tLZXksIGNiKVxuXHRvblNoaWZ0S2V5OiAoY2IpIC0+IEBvbihFdmVudHMuU2hpZnRLZXksIGNiKVxuXHRvblZhbHVlQ2hhbmdlOiAoY2IpIC0+IEBvbihFdmVudHMuVmFsdWVDaGFuZ2UsIGNiKVxuXHRvbklucHV0Rm9jdXM6IChjYikgLT4gQG9uKEV2ZW50cy5JbnB1dEZvY3VzLCBjYilcblx0b25JbnB1dEJsdXI6IChjYikgLT4gQG9uKEV2ZW50cy5JbnB1dEJsdXIsIGNiKVxuXG53cmFwSW5wdXQgPSAoaW5zdGFuY2UsIGJhY2tncm91bmQsIHBsYWNlaG9sZGVyKSAtPlxuXHRpZiBub3QgKGJhY2tncm91bmQgaW5zdGFuY2VvZiBMYXllcilcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnB1dExheWVyIGV4cGVjdHMgYSBiYWNrZ3JvdW5kIGxheWVyLlwiKVxuXG5cdGlmIG5vdCAocGxhY2Vob2xkZXIgaW5zdGFuY2VvZiBUZXh0TGF5ZXIpXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW5wdXRMYXllciBleHBlY3RzIGEgdGV4dCBsYXllci5cIilcblxuXHRpbnB1dCA9IGluc3RhbmNlXG5cblx0aW5wdXQuX19mcmFtZXJJbnN0YW5jZUluZm8gPz0ge31cblx0aW5wdXQuX19mcmFtZXJJbnN0YW5jZUluZm8/Lm5hbWUgPSBpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lXG5cblx0aW5wdXQuZnJhbWUgPSBiYWNrZ3JvdW5kLmZyYW1lXG5cdGlucHV0LnBhcmVudCA9IGJhY2tncm91bmQucGFyZW50XG5cdGlucHV0LmluZGV4ID0gYmFja2dyb3VuZC5pbmRleFxuXG5cdGlucHV0LmFkZEJhY2tncm91bmRMYXllcihiYWNrZ3JvdW5kKVxuXHRpbnB1dC5hZGRQbGFjZUhvbGRlckxheWVyKHBsYWNlaG9sZGVyKVxuXG5cdHJldHVybiBpbnB1dCIsIiMjIyMjIyMjIyMjIEhvbWVTZWFyY2ggIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuSG9tZVNlYXJjaCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdFxuXHRcdCMgQ29tcG9uZW50IGZyYW1lIGZyb20gRGVzaWduIE1vZGVcblx0XHRjb21wX2ZyYW1lID0gaG9tZV9zZWFyY2hcblx0XHRcblx0XHRAaG9tZVNlYXJjaCA9IGNvbXBfZnJhbWUuY29weSgpXG5cdFx0QGhvbWVTZWFyY2gucHJvcHMgPSBcblx0XHRcdHg6IDAsIHk6IDBcblx0XHRcdFxuXHRcdCMgSW5pdGlhbGlzZSB0aGUgY2xhc3Ncblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHRoZWlnaHQ6IGNvbXBfZnJhbWUuaGVpZ2h0XG5cdFx0XHR3aWR0aDogY29tcF9mcmFtZS53aWR0aFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0IyBTdGFnaW5nIGZyYW1lc1xuXHRcdEBob21lU2VhcmNoLnBhcmVudCA9IEAiLCIjIyMjIyMjIyMjIyMjIyBIRUFERVIgIyMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuSGVhZGVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0IyBGcmFtZSBmcm9tIERlc2lnbiBNb2RlXG5cdFx0ZnJhbWUgPSBoZWFkZXJcblxuXHRcdCMgT3RoZXIgZnJhbWVzIGZyb20gRGVzaWduIE1vZGVcblx0XHRAc3ViVGl0bGVfZnJhbWUgPSBoZWFkZXJfZXh0cmEuc2VsZWN0Q2hpbGQoXCJzdWJ0aXRsZVwiKS5jb3B5KClcblx0XHRAc3ViVGl0bGVfZnJhbWUuYXV0b0hlaWdodCA9IHRydWVcblx0XG5cdFx0c3dpdGNoIFxuXHRcdFx0IyBOb3JtYWwgdGl0bGVcblx0XHRcdHdoZW4gQG9wdC50aXRsZSBpc250IFwibG9nb1wiIGFuZCBAb3B0LnN1YlRpdGxlIGlzIHVuZGVmaW5lZCBcblx0XHRcdFx0QHRpdGxlX2ZyYW1lID0gaGVhZGVyLnNlbGVjdENoaWxkKFwidGl0bGVcIikuY29weSgpXG5cdFx0XHRcdEB0aXRsZV9mcmFtZS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXHRcdFx0IyBMb2dvXG5cdFx0XHR3aGVuICBAb3B0LnRpdGxlIGlzIFwibG9nb1wiIFxuXHRcdFx0XHRAdGl0bGVfZnJhbWUgPSBoZWFkZXJfbG9nby5zZWxlY3RDaGlsZChcImxvZ29cIikuY29weSgpXG5cdFx0XHQjIHdpdGggc3ViVGl0bGVcblx0XHRcdHdoZW4gQG9wdC5zdWJUaXRsZSBpc250IHVuZGVmaW5lZCBcblx0XHRcdFx0QHRpdGxlX2ZyYW1lID0gaGVhZGVyX2V4dHJhLnNlbGVjdENoaWxkKFwidGl0bGVcIikuY29weSgpXG5cdFx0XHRcdEB0aXRsZV9mcmFtZS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXG5cdFx0QGljb25MZWZ0X2xheWVyID0gbmV3IExheWVyIFxuXHRcdEBpY29uTGVmdF9sYXllci5wcm9wcyA9ICBoZWFkZXIuc2VsZWN0Q2hpbGQoXCJpY25fbGVmdFwiKS5wcm9wc1xuXG5cdFx0QGljb25SaWdodF9sYXllciA9IG5ldyBMYXllciBcblx0XHRAaWNvblJpZ2h0X2xheWVyLnByb3BzID0gIGhlYWRlci5zZWxlY3RDaGlsZChcImljbl9yaWdodFwiKS5wcm9wc1xuXG5cdFx0QGxpbmtMZWZ0X2ZyYW1lID0gaGVhZGVyX2xpbmtzLnNlbGVjdENoaWxkKFwibGVmdF9saW5rXCIpLmNvcHkoKVxuXHRcdEBsaW5rTGVmdF9mcmFtZS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXG5cdFx0QGxpbmtSaWdodF9mcmFtZSA9IGhlYWRlcl9saW5rcy5zZWxlY3RDaGlsZChcInJpZ2h0X2xpbmtcIikuY29weSgpXG5cdFx0QGxpbmtSaWdodF9mcmFtZS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXG5cdFx0QGJhZ19mcmFtZSA9IGhlYWRlcl9leHRyYS5zZWxlY3RDaGlsZChcImJhZ1wiKS5jb3B5KClcblxuXHRcdEBzZWFyY2hfZnJhbWUgPSBoZWFkZXIuc2VsZWN0Q2hpbGQoXCJpY25fc2VhcmNoXCIpLmNvcHkoKVxuXG5cdFx0IyBJbml0aWFsaXNlIHRoZSBjbGFzc1xuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdGhlaWdodDogZnJhbWUuaGVpZ2h0XG5cdFx0XHR3aWR0aDogZnJhbWUud2lkdGhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZnJhbWUuYmFja2dyb3VuZENvbG9yXG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBALCBAb3B0LnkpXG5cdFx0XHRcblx0XHQjIFN0YWdpbmcgZnJhbWVzXG5cdFx0aWYgQG9wdC5zdWJUaXRsZSBpc250IHVuZGVmaW5lZCB0aGVuIEBzdWJUaXRsZV9mcmFtZS5wYXJlbnQgPSBAIGVsc2UgQHN1YlRpdGxlX2ZyYW1lLmRlc3Ryb3koKVxuXHRcdGlmIEBvcHQudGl0bGUgaXNudCB1bmRlZmluZWQgdGhlbiBAdGl0bGVfZnJhbWUucGFyZW50ID0gQCBlbHNlIEB0aXRsZV9mcmFtZS5kZXN0cm95KClcblx0XHRpZiBAb3B0Lmljb25MZWZ0IGlzbnQgdW5kZWZpbmVkIHRoZW4gQGljb25MZWZ0X2xheWVyLnBhcmVudCA9IEAgZWxzZSBAaWNvbkxlZnRfbGF5ZXIuZGVzdHJveSgpXG5cdFx0aWYgQG9wdC5pY29uUmlnaHQgaXNudCB1bmRlZmluZWQgdGhlbiBAaWNvblJpZ2h0X2xheWVyLnBhcmVudCA9IEAgZWxzZSBAaWNvblJpZ2h0X2xheWVyLmRlc3Ryb3koKVxuXHRcdGlmIEBvcHQubGlua0xlZnQgaXNudCB1bmRlZmluZWQgdGhlbiBAbGlua0xlZnRfZnJhbWUucGFyZW50ID0gQCBlbHNlIEBsaW5rTGVmdF9mcmFtZS5kZXN0cm95KClcblx0XHRpZiBAb3B0LmxpbmtSaWdodCBpc250IHVuZGVmaW5lZCB0aGVuIEBsaW5rUmlnaHRfZnJhbWUucGFyZW50ID0gQCBlbHNlIEBsaW5rUmlnaHRfZnJhbWUuZGVzdHJveSgpXG5cdFx0aWYgQG9wdC5iYWcgaXNudCB1bmRlZmluZWQgdGhlbiBAYmFnX2ZyYW1lLnBhcmVudCA9IEAgZWxzZSBAYmFnX2ZyYW1lLmRlc3Ryb3koKVxuXHRcdGlmIEBvcHQuc2VhcmNoIGlzbnQgdW5kZWZpbmVkIHRoZW4gQHNlYXJjaF9mcmFtZS5wYXJlbnQgPSBAIGVsc2UgQHNlYXJjaF9mcmFtZS5kZXN0cm95KClcblxuXHQjIyMjIyMjIyMjIyMjIyBHRVQsIFNFVCBBVFJJQlVURVMgIyMjIyMjIyMjIyMjIyMjXG5cblx0QGRlZmluZSBcInN1YlRpdGxlXCIsIFxuXHRcdGdldDogLT4gQG9wdC5zdWJUaXRsZSxcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHQuc3ViVGl0bGUgPSB2YWx1ZVxuXHRcdFx0QHN1YlRpdGxlX2ZyYW1lLnRleHQgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJ0aXRsZVwiLCBcblx0XHRnZXQ6IC0+IEBvcHQudGl0bGUsXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0LnRpdGxlID0gdmFsdWVcblx0XHRcdEB0aXRsZV9mcmFtZS50ZXh0ID0gdmFsdWVcblxuXG5cdEBkZWZpbmUgXCJpY29uTGVmdFwiLCBcblx0XHRnZXQ6IC0+IEBvcHQuaWNvbkxlZnQsXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QG9wdC5pY29uTGVmdCA9IHZhbHVlXG5cdFx0XHRAaWNvbkxlZnRfbGF5ZXIuaW1hZ2UgPSBcIm1vZHVsZXMvRkZLaXQvYXNzZXRzL2ljb25zLyN7dmFsdWV9LnN2Z1wiXG5cblx0QGRlZmluZSBcImxpbmtMZWZ0XCIsIFxuXHRcdGdldDogLT4gQG9wdC5saW5rTGVmdCxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAb3B0LmxpbmtMZWZ0ID0gdmFsdWVcblx0XHRcdEBsaW5rTGVmdF9mcmFtZS50ZXh0ID0gdmFsdWVcblxuXHRAZGVmaW5lIFwiaWNvblJpZ2h0XCIsXG5cdFx0Z2V0OiAtPiBAb3B0Lmljb25SaWdodCxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAb3B0Lmljb25SaWdodCA9IHZhbHVlXG5cdFx0XHRAaWNvblJpZ2h0X2xheWVyLmltYWdlID0gXCJtb2R1bGVzL0ZGS2l0L2Fzc2V0cy9pY29ucy8je3ZhbHVlfS5zdmdcIlxuXG5cblx0QGRlZmluZSBcImxpbmtSaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBvcHQubGlua1JpZ2h0LFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBvcHQubGlua1JpZ2h0ID0gdmFsdWVcblx0XHRcdEBsaW5rUmlnaHRfZnJhbWUudGV4dCA9IHZhbHVlXG5cblx0QGRlZmluZSBcImJhZ1wiLCBcblx0XHRnZXQ6IC0+IEBvcHQuYmFnLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdCMgSGFyZGNvZGVkIGJhZyBpY29uIHdpdGggY291bnRlclxuXHRcdFx0QG9wdC5iYWcgPSB2YWx1ZVxuXHRcdFx0QGJhZ19mcmFtZS5zZWxlY3RDaGlsZChcImJhZ19udW1iZXJcIikudGV4dCA9IHZhbHVlXG5cdFx0XHRAc2VhcmNoX2ZyYW1lLm1heFggPSBAYmFnX2ZyYW1lLnggLSAxOFxuXG5cdEBkZWZpbmUgXCJzZWFyY2hcIiwgXG5cdFx0Z2V0OiAtPiBAb3B0LnNlYXJjaCxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHQjIEhhcmRjb2RlZCBzZWFyY2ggaWNvblxuXHRcdFx0IyBEb2VzIG5vdCBoYXZlIHZhbHVlZCB0byBtb2RpZnlcblxuXHRAZGVmaW5lIFwibm9iZ1wiLCBcblx0XHRnZXQ6IC0+IEBvcHQubm9iZyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMDApXCIiLCIjIyMjIyMjIyMjIyMjIyBTVEFUVVMgQkFSICMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuRkZTY3JvbGxDb21wb25lbnQgZXh0ZW5kcyBTY3JvbGxDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChAb3B0PXt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcbiIsIiMjIyMjIyMjIyMjIyMjIFVzYWdlIGV4YW1wbGUgIyMjIyMjIyMjIyMjIyMjXG4jIGlucHV0ID0gbmV3IEZGSW5wdXRcbiMgXHRsYWJlbFRleHQ6IFwiRmlyc3QgbmFtZVwiXG4jIFx0cGxhY2Vob2xkZXJUZXh0OiBcIlBsYWNlaG9sZGVyIHRlc3RcIlxuIyBcdGhlbHBlclRleHQ6IFwiVGhpcyBpcyBoZWxwZXIgdGV4dFwiXG4jIFx0dmFsdWU6IFwiSW5wdXQgdmFsdWVcIlxuXG4jIyMjIyMjIyMjIyMjIyBGRiBpbnB1dCAjIyMjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5GRklucHV0IGV4dGVuZHMgTGF5ZXJcblx0Y21wX2ZyYW1lID0gZmZfaW5wdXRcblx0aW5pdGlhbElucHV0UHJvcHMgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJpbnB1dFwiKS5wcm9wc1xuXHRpbml0aWFsSW5wdXRUZXh0UHJvcHMgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJwbGFjZWhvbGRlclwiKS5wcm9wc1xuXHRfaU9TRGV2aWNlID0gISFuYXZpZ2F0b3IucGxhdGZvcm0ubWF0Y2goL2lQaG9uZXxpUG9kfGlQYWQvKVxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0PXt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHdpZHRoOiBjbXBfZnJhbWUud2lkdGhcblx0XHRcdGhlaWdodDogY21wX2ZyYW1lLmhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBjbXBfZnJhbWUuYmFja2dyb3VuZENvbG9yXG5cdFx0XG5cdFx0IyBMYWJlbCB0ZXh0XG5cdFx0aWYgQG9wdC5sYWJlbFRleHRcblx0XHRcdEBsYWJlbFRleHQgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJpbnB1dF9sYWJlbFwiKS5jb3B5KClcblx0XHRcdEBsYWJlbFRleHQucHJvcHMgPVxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0dGV4dDogQG9wdC5sYWJlbFRleHRcblx0XHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXHRcdFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0XHRcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBAKVxuXG5cdFx0IyBJbnB1dCBmcmFtZVxuXHRcdEBpbnB1dCA9IG5ldyBJbnB1dFxuXHRcdFx0bmFtZTogXCJGRiBpbnB1dFwiXG5cdFx0XHR2YWx1ZTogQG9wdC52YWx1ZVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBpbml0aWFsSW5wdXRQcm9wcy54LCB5OiBpZiBAb3B0LmxhYmVsVGV4dCB0aGVuIGluaXRpYWxJbnB1dFByb3BzLnkgZWxzZSAwXG5cdFx0XHR3aWR0aDogQHdpZHRoIC0gTV9zcGFjZXIqMiwgaGVpZ2h0OiBpbml0aWFsSW5wdXRQcm9wcy5oZWlnaHRcblx0XHRcdHRleHQ6IEBvcHQucGxhY2Vob2xkZXJUZXh0XG5cdFx0XHRib3JkZXJSYWRpdXM6IGluaXRpYWxJbnB1dFByb3BzLmJvcmRlclJhZGl1c1xuXHRcdFx0Ym9yZGVyV2lkdGg6IGluaXRpYWxJbnB1dFByb3BzLmJvcmRlcldpZHRoXG5cdFx0XHRib3JkZXJDb2xvcjogaW5pdGlhbElucHV0UHJvcHMuYm9yZGVyQ29sb3Jcblx0XHRcdGNvbG9yOiBpZiBAb3B0LnBsYWNlaG9sZGVyVGV4dCB0aGVuIGluaXRpYWxJbnB1dFRleHRQcm9wcy5jb2xvciBlbHNlIFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0cGFkZGluZzpcblx0XHRcdFx0bGVmdDogaW5pdGlhbElucHV0VGV4dFByb3BzLnhcblxuXHRcdEBpbnB1dC5faW5wdXRFbGVtZW50LnN0eWxlLmZvbnRGYW1pbHkgPSBpbml0aWFsSW5wdXRUZXh0UHJvcHMuZm9udEZhbWlseVxuXHRcdEBpbnB1dC5faW5wdXRFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXG5cdFx0XHRpZiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyBpcyAyIGFuZCBfaU9TRGV2aWNlIGlzIHRydWVcblx0XHRcdFx0XCIje2luaXRpYWxJbnB1dFRleHRQcm9wcy5mb250U2l6ZSoyfXB4XCJcblx0XHRcdGVsc2UgaWYgd2luZG93LmRldmljZVBpeGVsUmF0aW8gaXMgMVxuXHRcdFx0XHRcIiN7aW5pdGlhbElucHV0VGV4dFByb3BzLmZvbnRTaXplKjJ9cHhcIlxuXHRcdFx0ZWxzZSBpZiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyBpcyAzIGFuZCBfaU9TRGV2aWNlIGlzIHRydWVcblx0XHRcdFx0XCIje2luaXRpYWxJbnB1dFRleHRQcm9wcy5mb250U2l6ZSozfXB4XCJcblx0XHRcdGVsc2UgaWYgRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlIGlzIFwiYXBwbGUtaXBob25lLXgtc3BhY2UtZ3JheVwiIG9yIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSBpcyBcImFwcGxlLWlwaG9uZS14LXNpbHZlclwiXG5cdFx0XHRcdFwiI3tpbml0aWFsSW5wdXRUZXh0UHJvcHMuZm9udFNpemUqM31weFwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdFwiI3tpbml0aWFsSW5wdXRUZXh0UHJvcHMuZm9udFNpemV9cHhcIlxuXG5cdFx0QGlucHV0Ll9pbnB1dEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gKHBhcnNlSW50KEBpbnB1dC5faW5wdXRFbGVtZW50LnN0eWxlLmhlaWdodCktNCkgKyBcInB4XCJcblxuXHRcdCMgSGVscGVyIHRleHRcblx0XHRpZiBAb3B0LmhlbHBlclRleHRcblx0XHRcdEBoZWxwZXJUZXh0ID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiaGVscGVyX3RleHRcIikuY29weSgpXG5cdFx0XHRAaGVscGVyVGV4dC5wcm9wcyA9XG5cdFx0XHRcdHk6IEBpbnB1dC5tYXhZICsgKGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcImhlbHBlcl90ZXh0XCIpLnkgLSAoaW5pdGlhbElucHV0UHJvcHMueSArIGluaXRpYWxJbnB1dFByb3BzLmhlaWdodCkpXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR0ZXh0OiBAb3B0LmhlbHBlclRleHRcblx0XHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXHRcdFxuXHRcdEBoZWlnaHQgPSBpZiBAb3B0LmhlbHBlclRleHRcblx0XHRcdFx0QGhlbHBlclRleHQubWF4WSArIChjbXBfZnJhbWUuaGVpZ2h0IC0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiaGVscGVyX3RleHRcIikubWF4WSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y21wX2ZyYW1lLmhlaWdodCAtIGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcImhlbHBlcl90ZXh0XCIpLmhlaWdodFxuXHRcdFxuXHQjIE1ldGhvZHMgKClcblx0Zm9jdXM6ID0+XG5cdFx0QGlucHV0LmZvY3VzKCkiLCIjIyMjIyMjIyMjIyMjIyBBREQgVE8gQkFHIEJVVFRPTiAjIyMjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5CdXR0b25GaXhlZCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdGNtcF9mcmFtZSA9IGJ1dHRvbl9maXhlZFxuXG5cdFx0QGZpeGVkX2J0biA9IG5ldyBCdXR0b25cblx0XHRcdG5hbWU6IFwiYnV0dG9uXCJcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiY3RhXCIpLnlcblx0XHRcdHdpZHRoOiBjbXBfZnJhbWUud2lkdGggLSBMX3NwYWNlclxuXHRcdFx0dGV4dDogY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiYnV0dG9uX3RleHRcIikudGV4dFxuXHRcdGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcImN0YVwiKS5kZXN0cm95KClcblxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IGNtcF9mcmFtZS53aWR0aFxuXHRcdFx0aGVpZ2h0OiBpZiBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgaXMgXCJhcHBsZS1pcGhvbmUteC1zcGFjZS1ncmF5XCIgdGhlbiA5MCBlbHNlIGNtcF9mcmFtZS5oZWlnaHRcblx0XHRcdHk6IEFsaWduLmJvdHRvbSgpXG5cdFx0XHRpbWFnZTogY21wX2ZyYW1lLmltYWdlIFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblxuXG5cdFx0QGZpeGVkX2J0bi5wYXJlbnQgPSBAXG5cblxuXHQjIyMjIyMjIyMjIyMjIyBHRVQsIFNFVCBBVFJJQlVURVMgIyMjIyMjIyMjIyMjIyMjXG5cblx0QGRlZmluZSBcInRleHRcIixcblx0XHRnZXQ6IC0+IEBvcHQudGV4dFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdC50ZXh0ID0gdmFsdWVcblx0XHRcdEBmaXhlZF9idG4udGV4dCA9IHZhbHVlXG4iLCIjIyMjIyMjIyMjIyMjIyBCVVRUT05TICMjIyMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LkJ1dHRvbiBleHRlbmRzIExheWVyXG5cblx0dGFnQnV0dG9uSWNvbiA9IHRhZ19idXR0b25faWNvbl9sYXlvdXQuc2VsZWN0Q2hpbGQoXCJidXR0b25faWNvblwiKVxuXHRidXR0b25JY29uID0gYnV0dG9uX2ljb25fbGF5b3V0LnNlbGVjdENoaWxkKFwiYnV0dG9uX2ljb25cIilcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHQ9e30pIC0+XG5cdFx0IyBTd2l0Y2ggYnV0dG9ucyB0eXBlIGFuZCBwcm9wZXJ0aWVzIGZvciB0aGVtIFxuXHRcdF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHN3aXRjaCBAb3B0LnR5cGVcblx0XHRcdFx0d2hlbiBcInByaW1hcnlcIiwgdW5kZWZpbmVkXG5cdFx0XHRcdFx0QHJlZmVyZW5jZUJ0biA9IHByaW1hcnlfYnV0dG9uXG5cdFx0XHRcdFx0dGV4dDogQHJlZmVyZW5jZUJ0bi5zZWxlY3RDaGlsZChcImJ1dHRvbl90ZXh0XCIpLnRleHRcblx0XHRcdFx0XHRpY29uSW52ZXJ0VmFsdWU6IDFcblx0XHRcdFx0d2hlbiBcInNlY29uZGFyeVwiXG5cdFx0XHRcdFx0QHJlZmVyZW5jZUJ0biA9IHNlY29uZGFyeV9idXR0b25cblx0XHRcdFx0XHR0ZXh0OiBAcmVmZXJlbmNlQnRuLnNlbGVjdENoaWxkKFwiYnV0dG9uX3RleHRcIikudGV4dFxuXHRcdFx0XHR3aGVuIFwidGVydGlhcnlcIlxuXHRcdFx0XHRcdEByZWZlcmVuY2VCdG4gPSB0ZXJ0aWFyeV9idXR0b25cblx0XHRcdFx0XHR0ZXh0OiBAcmVmZXJlbmNlQnRuLnNlbGVjdENoaWxkKFwiYnV0dG9uX3RleHRcIikudGV4dFxuXHRcdFx0XHR3aGVuIFwiZmxhdFwiXG5cdFx0XHRcdFx0QHJlZmVyZW5jZUJ0biA9IGZsYXRfYnV0dG9uXG5cdFx0XHRcdFx0dGV4dDogQHJlZmVyZW5jZUJ0bi5zZWxlY3RDaGlsZChcImJ1dHRvbl90ZXh0XCIpLnRleHRcblx0XHRcdFx0d2hlbiBcInRhZ1wiXG5cdFx0XHRcdFx0QHJlZmVyZW5jZUJ0biA9IHRhZ19idXR0b25cblx0XHRcdFx0XHR0ZXh0OiBAcmVmZXJlbmNlQnRuLnNlbGVjdENoaWxkKFwiYnV0dG9uX3RleHRcIikudGV4dFxuXHRcdFx0XHRcdHNpZGVQYWRkaW5nczogU19zcGFjZXJcblx0XHRcdFx0XHRpY29uTWFyZ2luOiBYU19zcGFjZXJcblxuXHRcdCMgY29weSBhbGwgcGFyYW1ldHJzIGFuZCByZXNldCBmb250LWZhbWlseSBhbmQgZm9udC1zaXplIHRvIGRlZmF1bHQgZm9udHNcblx0XHRAYnRuVGV4dCA9IEByZWZlcmVuY2VCdG4uc2VsZWN0Q2hpbGQoXCJidXR0b25fdGV4dFwiKS5jb3B5KClcblx0XHRAYnRuVGV4dC5wcm9wcyA9XG5cdFx0XHRuYW1lOiBcInRleHRfYnRuXCJcblx0XHRcdHRleHQ6IEBvcHQudGV4dFxuXHRcdFx0d2hpdGVTcGFjZTogXCJub3dyYXBcIlxuXG5cdFx0dGFnQnRuSWNvblJpZ2h0TWFyZ2luID0gdGFnX2J1dHRvbl9pY29uX2xheW91dC53aWR0aCAtIHRhZ0J1dHRvbkljb24ubWF4WFxuXG5cdFx0IyBJbmNsdWRlIG90aGVyIHByb3BlcnRpZXNcblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHR3aWR0aDogc3dpdGNoXG5cdFx0XHRcdHdoZW4gQG9wdC50eXBlIGlzIFwidGFnXCIgYW5kIEBvcHQuaWNvbiBpcyB1bmRlZmluZWRcblx0XHRcdFx0XHRAYnRuVGV4dC53aWR0aCArIEBvcHQuc2lkZVBhZGRpbmdzKjJcblx0XHRcdFx0d2hlbiBAb3B0LnR5cGUgaXMgXCJ0YWdcIiBhbmQgQG9wdC5pY29uIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRcdFx0QGJ0blRleHQud2lkdGggKyBAb3B0LnNpZGVQYWRkaW5ncyArIHRhZ0J0bkljb25SaWdodE1hcmdpbiArIHRhZ0J1dHRvbkljb24ud2lkdGggKyBAb3B0Lmljb25NYXJnaW5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdEByZWZlcmVuY2VCdG4ud2lkdGhcblx0XHRcdGhlaWdodDogQHJlZmVyZW5jZUJ0bi5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQHJlZmVyZW5jZUJ0bi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdGJvcmRlclJhZGl1czogQHJlZmVyZW5jZUJ0bi5ib3JkZXJSYWRpdXNcblx0XHRcdGJvcmRlcldpZHRoOiBAcmVmZXJlbmNlQnRuLmJvcmRlcldpZHRoXG5cdFx0XHRib3JkZXJDb2xvcjogQHJlZmVyZW5jZUJ0bi5ib3JkZXJDb2xvclxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0QGJ0blRleHQucGFyZW50ID0gQFxuXHRcdEBidG5UZXh0LmF1dG9XaWR0aCA9IHRydWVcblxuXHRcdEBidG5UZXh0LnggPSBzd2l0Y2hcblx0XHRcdHdoZW4gQG9wdC50eXBlIGlzIFwidGFnXCIgYW5kIEBvcHQuaWNvbkFsaWduIGlzIFwibGVmdFwiXG5cdFx0XHRcdEFsaWduLmxlZnQodGFnQnRuSWNvblJpZ2h0TWFyZ2luICsgdGFnQnV0dG9uSWNvbi53aWR0aCArIEBvcHQuaWNvbk1hcmdpbilcblx0XHRcdHdoZW4gQG9wdC50eXBlIGlzIFwidGFnXCIgYW5kIEBvcHQuaWNvbiBpc250IHVuZGVmaW5lZCBcblx0XHRcdFx0QWxpZ24ubGVmdChAb3B0LnNpZGVQYWRkaW5ncylcblx0XHRcdGVsc2Vcblx0XHRcdFx0QWxpZ24uY2VudGVyKClcblxuXHRcdCMgQ3JlYXRlIGljb25cdFxuXHRcdGlmIEBvcHQuaWNvbiBpc250IHVuZGVmaW5lZFxuXHRcdFx0QGljb24gPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdG5hbWU6IFwiaWNvbl9idG5cIlxuXHRcdFx0XHR3aWR0aDogYnV0dG9uSWNvbi53aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IGJ1dHRvbkljb24uaGVpZ2h0XG5cdFx0XHRcdHk6IEFsaWduLmNlbnRlcigpXHRcblx0XHRcdFx0eDogc3dpdGNoXG5cdFx0XHRcdFx0d2hlbiBAb3B0LnR5cGUgaXMgXCJ0YWdcIiBhbmQgQG9wdC5pY29uQWxpZ24gaXMgXCJsZWZ0XCJcblx0XHRcdFx0XHRcdEBidG5UZXh0LnggLSB0YWdCdXR0b25JY29uLndpZHRoIC0gQG9wdC5pY29uTWFyZ2luXG5cdFx0XHRcdFx0d2hlbiBAb3B0LnR5cGUgaXMgXCJ0YWdcIlxuXHRcdFx0XHRcdFx0QWxpZ24ucmlnaHQoLSh0YWdfYnV0dG9uX2ljb25fbGF5b3V0LndpZHRoIC0gdGFnX2J1dHRvbl9pY29uX2xheW91dC5zZWxlY3RDaGlsZChcImJ1dHRvbl9pY29uXCIpLm1heFgpKVxuXHRcdFx0XHRcdHdoZW4gQG9wdC5pY29uQWxpZ24gaXMgXCJsZWZ0XCJcblx0XHRcdFx0XHRcdEFsaWduLmxlZnQoQHJlZmVyZW5jZUJ0bi53aWR0aCAtIGJ1dHRvbkljb24ubWF4WClcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRBbGlnbi5yaWdodCgtKEByZWZlcmVuY2VCdG4ud2lkdGggLSBidXR0b25JY29uLm1heFgpKVxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjIpXCJcblx0XHRcdEBpY29uLnN0eWxlID1cblx0XHRcdFwiZmlsdGVyXCI6IFwiaW52ZXJ0KCN7QG9wdC5pY29uSW52ZXJ0VmFsdWV9KVwiXG5cdFx0XHRpZiBfLmlzU3RyaW5nKEBvcHQuaWNvbilcblx0XHRcdFx0QGljb24ucHJvcHMgPVxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XHRcdCMgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC4yKVwiICMgQ29tZW50ZWQgbGluZSB0byBzZWUgdGhlIGNvbnRhaW5lclxuXHRcdFx0XHRcdGltYWdlOiBcIm1vZHVsZXMvRkZLaXQvYXNzZXRzL2ljb25zLyN7QG9wdC5pY29ufS5zdmdcIlxuXG5cdFx0IyBXYXRjaCBmb3Igd2lkdGggY2hhbmdlcyBhbmQgc2V0IHVwIG5ldyBwcm9wZXJ0aWVzIGZvciBjaGlsZHJlblxuXHRcdEAub24gXCJjaGFuZ2U6d2lkdGhcIiwgLT5cblx0XHRcdEBidG5UZXh0LnggPSBBbGlnbi5jZW50ZXIoKVxuXHRcdFx0aWYgQG9wdC50eXBlIGlzIFwidGFnXCIgYW5kIEBvcHQuaWNvbiBpc250IHVuZGVmaW5lZFxuXHRcdFx0XHRAYnRuVGV4dC54ID0gQWxpZ24uY2VudGVyKC10YWdCdXR0b25JY29uLndpZHRoLzIpXG5cdFx0XHRcdEBpY29uLnggPSBAYnRuVGV4dC5tYXhYICsgQG9wdC5pY29uTWFyZ2luXG5cdFx0XHRlbHNlIGlmIEBvcHQuaWNvbiBpc250IHVuZGVmaW5lZFxuXHRcdFx0XHRAaWNvbi54ID0gc3dpdGNoXG5cdFx0XHRcdFx0d2hlbiBAb3B0Lmljb25BbGlnbiBpcyBcImxlZnRcIlxuXHRcdFx0XHRcdFx0QWxpZ24ubGVmdChAcmVmZXJlbmNlQnRuLndpZHRoIC0gYnV0dG9uSWNvbi5tYXhYKVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdEFsaWduLnJpZ2h0KC0oQHJlZmVyZW5jZUJ0bi53aWR0aCAtIGJ1dHRvbkljb24ubWF4WCkpXG5cblx0QGRlZmluZSBcInRleHRcIixcblx0XHRnZXQ6IC0+IFxuXHRcdFx0QGJ0blRleHQudGV4dFxuXHRcdHNldDogKHZhbCkgLT5cblx0XHRcdEBidG5UZXh0LnRleHQgPSB2YWxcblx0XHRcdEBidG5UZXh0LnggPSBBbGlnbi5jZW50ZXIoKVxuXHRcdFx0c3dpdGNoXG5cdFx0XHRcdHdoZW4gQG9wdC50eXBlIGlzIFwidGFnXCIgYW5kIEBpY29uIGlzbnQgdW5kZWZpbmVkIGFuZCBAb3B0Lmljb25BbGlnbiBpcyBcImxlZnRcIlxuXHRcdFx0XHRcdEB3aWR0aCA9IEBidG5UZXh0LndpZHRoICsgQG9wdC5zaWRlUGFkZGluZ3MqMiArIGJ1dHRvbkljb24ud2lkdGggKyBAb3B0Lmljb25NYXJnaW5cblx0XHRcdFx0XHRAYnRuVGV4dC54ID0gQWxpZ24uY2VudGVyKChidXR0b25JY29uLndpZHRoICsgQG9wdC5pY29uTWFyZ2luKS8yKVxuXHRcdFx0XHRcdEBpY29uLnggPSBAYnRuVGV4dC54IC0gYnV0dG9uSWNvbi53aWR0aCAtIEBvcHQuaWNvbk1hcmdpblxuXHRcdFx0XHR3aGVuIEBvcHQudHlwZSBpcyBcInRhZ1wiIGFuZCBAaWNvbiBpc250IHVuZGVmaW5lZFxuXHRcdFx0XHRcdEBpY29uLnggPSBAYnRuVGV4dC5tYXhYICsgQG9wdC5pY29uTWFyZ2luXG5cdFx0XHRcdFx0QHdpZHRoID0gQGJ0blRleHQud2lkdGggKyBAb3B0LnNpZGVQYWRkaW5ncyoyICsgYnV0dG9uSWNvbi53aWR0aCArIEBvcHQuaWNvbk1hcmdpblxuXHRcdFx0XHR3aGVuIEBvcHQudHlwZSBpcyBcInRhZ1wiIGFuZCBAb3B0Lmljb24gaXMgdW5kZWZpbmVkXG5cdFx0XHRcdFx0QHdpZHRoID0gQGJ0blRleHQud2lkdGggKyBAb3B0LnNpZGVQYWRkaW5ncyoyXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRAYnRuVGV4dC54ID0gQWxpZ24uY2VudGVyKClcblxuIiwiIyMjIyMjIyMjIyMgVXNhZ2UgZXhhbXBsZSAjIyMjIyMjIyMjI1xuIyBidG5BID0gbmV3IEJ1dHRvblxuIyBcdHRleHQ6IFwiU2hvdyBhY3Rpb24gc2hlZXRcIlxuIyBcdHk6IDEwMCwgeDogQWxpZ24uY2VudGVyXG5cbiMgYWN0aW9uU2hlZXQgPSBuZXcgQWN0aW9uU2hlZXRcbiMgXHRjb250ZW50OiBteV9hY3Rpb25zaGVldF9jb250ZW50XG4jIFx0YnV0dG9uOlxuIyBcdFx0dGV4dDogXCJQdXJjaGFzZVwiXG4jIFx0XHR3aWR0aDogMTE2XG4jIFx0XHR2aXNpYmxlOiBmYWxzZVxuIyBcdHRpdGxlOlxuIyBcdFx0dmlzaWJsZTogdHJ1ZVxuIyBcdFx0dGV4dDogXCJIZWxsbyFcIlxuXG4jIGJ0bkEub25UYXAgLT5cbiMgXHRhY3Rpb25TaGVldC5zaG93KClcblxuIyMjIyMjIyMjIyMgSG9tZVNlYXJjaCAjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5BY3Rpb25TaGVldCBleHRlbmRzIExheWVyXG5cdGNtcF9mcmFtZSA9IGFjdGlvbnNoZWV0X2NvbnRhaW5lclxuXHRhY3Rpb25TaGVldF9mcmFtZSA9IGFjdGlvbnNoZWV0X2NvbnRhaW5lci5zZWxlY3RDaGlsZChcImFjdGlvbnNoZWV0X2NtcFwiKVxuXHRjb250ZW50X2ZyYW1lID0gYWN0aW9uc2hlZXRfY29udGFpbmVyLnNlbGVjdENoaWxkKFwiY29udGVudFwiKVxuXHRhZGRpdGlvbmFsSGVpZ2h0ID0gNDBcblx0XG5cdGJ1dHRvblByb3BzID1cblx0XHR0ZXh0OiBhY3Rpb25zaGVldF9jb250YWluZXIuc2VsZWN0Q2hpbGQoXCJjdGFfdGV4dFwiKS50ZXh0XG5cdFx0d2lkdGg6IGFjdGlvbnNoZWV0X2NvbnRhaW5lci5zZWxlY3RDaGlsZChcImhlYWRlcl9jdGFcIikud2lkdGhcblx0XHR2aXNpYmxlOiB0cnVlXG5cdFxuXHR0aXRsZVByb3BzID1cblx0XHR0ZXh0OiBhY3Rpb25zaGVldF9jb250YWluZXIuc2VsZWN0Q2hpbGQoXCJoZWFkZXJfdGl0bGVcIikudGV4dFxuXHRcdHZpc2libGU6IGZhbHNlXG5cblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0Y29udGVudDogY29udGVudF9mcmFtZVxuXHRcdFx0YnV0dG9uOiB7fVxuXHRcdFx0dGl0bGU6IHt9XG5cdFx0XG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXG5cdFx0IyBDbG9zZSBvbiB0YXAgYXJlYVxuXHRcdEBjbG9zZWFyZWFfZnJhbWUgPSBhY3Rpb25zaGVldF9jb250YWluZXIuc2VsZWN0Q2hpbGQoXCJjbG9zZV9hcmVhXCIpLmNvcHkoKVxuXHRcdEBjbG9zZWFyZWFfZnJhbWUucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiAwLCB5OiAwXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHQsIHdpZHRoOiBAd2lkdGhcblx0XG5cdFx0IyBBY3Rpb25TaGVldCBjb21wb25lbnQgXG5cdFx0QGFjdGlvbnNoZWV0ID0gYWN0aW9uc2hlZXRfY29udGFpbmVyLnNlbGVjdENoaWxkKFwiYWN0aW9uc2hlZXRfY21wXCIpLmNvcHkoKVxuXHRcdEBhY3Rpb25zaGVldC5wcm9wcyA9XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IDBcblx0XHRcblx0XHQjIENyZWF0ZSBjb250ZW50IHRhcmdldFxuXHRcdEBjb250ZW50ID0gQG9wdC5jb250ZW50XG5cdFx0QGNvbnRlbnQucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAYWN0aW9uc2hlZXRcblx0XHRcdHg6IDAsIHk6IGNvbnRlbnRfZnJhbWUueVxuXHRcdFxuXHRcdEBhY3Rpb25zaGVldC5zZWxlY3RDaGlsZChcImNvbnRlbnRcIikuZGVzdHJveSgpXG5cdFx0XG5cdFx0QGFjdGlvbnNoZWV0LmhlaWdodCA9IEBjb250ZW50Lm1heFkgKyBhZGRpdGlvbmFsSGVpZ2h0XG5cdFx0QGFjdGlvbnNoZWV0LnkgPSBBbGlnbi5ib3R0b20oQGFjdGlvbnNoZWV0LmhlaWdodClcblx0XHRcblx0XHQjIEFjdGlvblNoZWV0IGJ1dHRvblxuXHRcdEBoZWFkZXJCdXR0b24gPSBuZXcgQnV0dG9uXG5cdFx0XHRuYW1lOiBcIkNUQSBidXR0b25cIlxuXHRcdFx0cGFyZW50OiBAYWN0aW9uc2hlZXQuc2VsZWN0Q2hpbGQoXCJoZWFkZXJcIilcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0oYWN0aW9uU2hlZXRfZnJhbWUud2lkdGggLSBAYWN0aW9uc2hlZXQuc2VsZWN0Q2hpbGQoXCJoZWFkZXJfY3RhXCIpLm1heFgpKSwgeTogQGFjdGlvbnNoZWV0LnNlbGVjdENoaWxkKFwiaGVhZGVyX2N0YVwiKS55XG5cdFx0XHR3aWR0aDogaWYgQG9wdC5idXR0b24ud2lkdGggaXMgdW5kZWZpbmVkIHRoZW4gYnV0dG9uUHJvcHMud2lkdGggZWxzZSBAb3B0LmJ1dHRvbi53aWR0aFxuXHRcdFx0dGV4dDogaWYgQG9wdC5idXR0b24udGV4dCBpcyB1bmRlZmluZWQgdGhlbiBidXR0b25Qcm9wcy50ZXh0IGVsc2UgQG9wdC5idXR0b24udGV4dFxuXHRcdFx0dmlzaWJsZTogQG9wdC5idXR0b24udmlzaWJsZVxuXHRcdFxuXHRcdEBhY3Rpb25zaGVldC5zZWxlY3RDaGlsZChcImhlYWRlcl9jdGFcIikuZGVzdHJveSgpXG5cdFx0XG5cdFx0IyBBY3Rpb25TaGVldCB0aXRsZVxuXHRcdEBoZWFkZXJUaXRsZSA9IEBhY3Rpb25zaGVldC5zZWxlY3RDaGlsZChcImhlYWRlcl90aXRsZVwiKVxuXHRcdEBoZWFkZXJUaXRsZS5wcm9wcyA9XG5cdFx0XHR2aXNpYmxlOiBpZiBAb3B0LnRpdGxlLnZpc2libGUgaXMgdW5kZWZpbmVkIHRoZW4gdGl0bGVQcm9wcy52aXNpYmxlIGVsc2UgQG9wdC50aXRsZS52aXNpYmxlXG5cdFx0XHRhdXRvSGVpZ2h0OiB0cnVlXG5cdFx0XHR0ZXh0OiBpZiBAb3B0LnRpdGxlLnRleHQgaXMgdW5kZWZpbmVkIHRoZW4gdGl0bGVQcm9wcy50ZXh0IGVsc2UgQG9wdC50aXRsZS50ZXh0XG5cdFx0XHRcblx0XHQjIFN0YXRlc1xuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0c2hvdzpcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0aGlkZTpcblx0XHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdGRlbGF5OiAwLjFcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFx0XHRjdXJ2ZTogXCJlYXNlLW91dFwiXG5cdFx0XG5cdFx0QGFjdGlvbnNoZWV0LnN0YXRlcyA9XG5cdFx0XHRzaG93OlxuXHRcdFx0XHR5OiBBbGlnbi5ib3R0b20oYWRkaXRpb25hbEhlaWdodClcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRjdXJ2ZTogU3ByaW5nKHRlbnNpb246IDM4MCwgZnJpY3Rpb246IDMwKVxuXHRcdFx0aGlkZTpcblx0XHRcdFx0eTogQWxpZ24uYm90dG9tKEBhY3Rpb25zaGVldC5oZWlnaHQpXG5cdFx0XHRcdG9wdGlvbnM6IFxuXHRcdFx0XHRcdHRpbWU6IDAuMVxuXHRcdFxuXHRcdCMgQWN0aW9uc1xuXHRcdEBjbG9zZWFyZWFfZnJhbWUub25UYXAgPT5cblx0XHRcdEBhY3Rpb25zaGVldC5hbmltYXRlKFwiaGlkZVwiKVxuXHRcdFx0QGFuaW1hdGUoXCJoaWRlXCIpXG5cdFx0XHRVdGlscy5kZWxheSAwLjMsID0+XG5cdFx0XHRcdEB2aXNpYmxlID0gZmFsc2Vcblx0XHRcblx0XHRAYWN0aW9uc2hlZXQuc2VsZWN0Q2hpbGQoXCJoZWFkZXJfY2xvc2VcIikub25UYXAgPT5cblx0XHRcdEBhY3Rpb25zaGVldC5hbmltYXRlKFwiaGlkZVwiKVxuXHRcdFx0QGFuaW1hdGUoXCJoaWRlXCIpXG5cdFx0XHRVdGlscy5kZWxheSAwLjMsID0+XG5cdFx0XHRcdEB2aXNpYmxlID0gZmFsc2Vcblx0XHRcblx0XHRAYWN0aW9uc2hlZXQub25UYXAgLT5cblx0XHRcdHJldHVybiB0cnVlXG5cdFx0XG5cdCMgTWV0aG9kcyAoKVx0XG5cdHNob3c6IC0+XG5cdFx0QHZpc2libGUgPSB0cnVlXG5cdFx0QGFuaW1hdGUoXCJzaG93XCIpXG5cdFx0QGFjdGlvbnNoZWV0LmFuaW1hdGUoXCJzaG93XCIpIiwiIyMjIyBIb3cgdG8gdXNlICMjIyNcbiMgYWNjTGlzdCA9IG5ldyBBY2NvcmRpb25Hcm91cFxuIyBcdGNoaWxkcmVuOiBbYWNjb3Jpb25BLCBhY2NvcmlvbkIsIGFjY29yaW9uQ10gIyBBZGQgYWNjb3JkaW9ucyBoZXJlXG5cbiMjIyMjIyMjIyMjIEFjY29yZGlvbiBncm91cCBjb21wb25lbnQgIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuQWNjb3JkaW9uR3JvdXAgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGNoaWxkcmVuOiB1bmRlZmluZWRcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXG5cdFx0IyBJZiBhcnJheSBoYXMgbW9ycmUgdGhlbiAyIGl0ZW1zXG5cdFx0aWYgQG9wdC5jaGlsZHJlbi5sZW5ndGggPCAyXG5cdFx0XHRAcHJvcHMgPVxuXHRcdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMCwwLDAuNylcIiwgaHRtbDogXCI8cCBzdHlsZT0nbGluZS1oZWlnaHQ6IDEuMjsgdGV4dC1hbGlnbjogY2VudGVyOyBwYWRkaW5nOiA2MHB4IDQwcHg7IGZvbnQtc2l6ZTogMjJweCc+UGxlYXNlIGluY2x1ZGUgYWNjcm9yaW9uIGl0ZW1zIGFzIGFuIGFycmF5PC9wPlwiXG5cdFx0XHRwcmludCBcIlBsZWFzZSBpbmNsdWRlIGFjY3JvcmlvbiBpdGVtcyBhcyBhbiBhcnJheVwiXG5cdFx0ZWxzZVxuXHRcdFx0IyBBZGQgYWxsIGNoaWxkcmVuXG5cdFx0XHRhZGRDaGlsZHJlbiBALCBAb3B0LmNoaWxkcmVuXG5cdFx0XHRcblx0XHRcdCMgTWFrZSBhIGNvcnJlY3QgWSBwb3NpdGlvblxuXHRcdFx0Zm9yIGNoaWxkLCBpIGluIEBjaGlsZHJlblxuXHRcdFx0XHRjaGlsZC55ID0gMFxuXHRcdFx0XHRjaGlsZC55ID0gbmV4dFBvc1lcblx0XHRcdFx0bmV4dFBvc1kgPSBjaGlsZC5tYXhZXG5cdFx0XHRcdFxuXHRcdFx0XHQjIGNoaWxkLmV4cGFuZGVkID0gZmFsc2Vcblx0XHRcdFx0Y2hpbGQub25UYXAgLT5cblx0XHRcdFx0XHR0b2dnbGVFeHBhbmQoQCwgQGNvbnRlbnQuaW5pdGlhbEhlaWdodClcblx0XHRcdFx0IyBTZXQgdHRoZSBmbGFnXG5cdFx0XHRcdGNoaWxkLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0XHRcdEBoZWlnaHQgPSBAb3B0LmNoaWxkcmVuW0BvcHQuY2hpbGRyZW4ubGVuZ3RoIC0gMV0ubWF4WVxuXG5cdFx0XHRcdFx0aWYgQC5wYXJlbnQgYW5kIEAucGFyZW50Lm5hbWUgaXMgXCJjb250ZW50XCJcblx0XHRcdFx0XHRcdGlmIEAucGFyZW50LnBhcmVudC5jb25zdHJ1Y3Rvci5uYW1lIGlzIFwiU2Nyb2xsQ29tcG9uZW50XCJcblx0XHRcdFx0XHRcdFx0QC5wYXJlbnQucGFyZW50LnVwZGF0ZUNvbnRlbnQoKVxuXHRcdFx0XG5cdFx0XHQjIFNldCBuZXcgcGFyZXJudCBoZWlnaHRcblx0XHRcdEBwcm9wcyA9XG5cdFx0XHRcdHdpZHRoOiBAb3B0LmNoaWxkcmVuWzBdLndpZHRoXG5cdFx0XHRcdGhlaWdodDogQG9wdC5jaGlsZHJlbltAb3B0LmNoaWxkcmVuLmxlbmd0aCAtIDFdLm1heFlcblx0XG5cdCMgVG9vZ2xlIGV4cGFuZCBmdW5jdGlvblxuXHR0b2dnbGVFeHBhbmQgPSAobGF5ZXIsIGRpc3RhbmNlKSAtPlxuXHRcdGRpc3RhbmNlID0gaWYgbGF5ZXIuZXhwYW5kZWQgaXMgZmFsc2UgdGhlbiBkaXN0YW5jZSBlbHNlIC1kaXN0YW5jZVxuXHRcdFxuXHRcdGZvciBzaWIgaW4gbGF5ZXIuc2libGluZ3Ncblx0XHRcdGlmIHNpYi55ID4gbGF5ZXIueVxuXHRcdFx0XHRzaWIuYW5pbWF0ZVxuXHRcdFx0XHRcdHk6IHNpYi55ICsgZGlzdGFuY2Vcblx0XHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdFx0dGltZTogMC4yXG5cdFx0XG5cdFx0bGF5ZXIuZXhwYW5kZWQgPSAhbGF5ZXIuZXhwYW5kZWRcbiIsIiMjIyMgSG93IHRvIHVzZSAjIyMjXG4jIGFjY29yaW9uQSA9IG5ldyBBY2NvcmRpb25cbiMgXHRsYWJlbFRleHQ6IFwiWW91ciB0ZXh0XCJcbiNcdGV4cGFuZGVkOiB0cnVlXG4jIFx0Y29udGVudDogYWNjX2NvbnRfMDEgI1RhcmdldCBmcmFtZSBpbiBEZXNpZ24gbW9kZS4gV29yayB3aXRoIGFueSBsYXllcnNcblxuIyMjIyMjIyMjIyMgQWNjb3JkaW9uIGNvbXBvbmVudCAjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5BY2NvcmRpb24gZXh0ZW5kcyBMYXllclxuXHRjb21wX2ZyYW1lID0gYWNjb3JkaW9uX2NvbXBcblx0Y29tcF9mcmFtZV9pdGVtID0gY29tcF9mcmFtZS5zZWxlY3RDaGlsZChcImFjY29yZGlvbl9pdGVtXCIpXG5cblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IGNvbXBfZnJhbWUud2lkdGhcblx0XHRcdGhlaWdodDogY29tcF9mcmFtZV9pdGVtLmhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRcdGxhYmVsVGV4dDogXCJsYWJlbFwiXG5cdFx0XHRjb250ZW50OiBjb21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiYWNjb3JkaW9uX2NvbnRlbnRcIilcblx0XHRcdGV4cGFuZGVkOiBmYWxzZVxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0QGl0ZW0gPSBjb21wX2ZyYW1lX2l0ZW0uY29weSgpXG5cdFx0QGl0ZW0uc2VsZWN0Q2hpbGQoXCJsYWJlbF90ZXh0XCIpLnRleHQgPSBAb3B0LmxhYmVsVGV4dFxuXHRcdEBpdGVtLnNlbGVjdENoaWxkKFwibGFiZWxfdGV4dFwiKS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXHRcdEBpdGVtSWNvbiA9IEBpdGVtLnNlbGVjdENoaWxkKFwiaWNvblwiKVxuXG5cdFx0QGNvbnRlbnQgPSBAb3B0LmNvbnRlbnQuY29weSgpXG5cdFx0QGNvbnRlbnQuaW5pdGlhbEhlaWdodCA9IEBjb250ZW50LmhlaWdodFxuXHRcdEBjb250ZW50LnByb3BzID0gXG5cdFx0XHR4OiAwLCB5OiBAaXRlbS5tYXhZXG5cdFx0XHRjbGlwOiB0cnVlXG5cblx0XHQjIFJlc2V0XG5cdFx0aWYgQG9wdC5leHBhbmRlZCBpcyBmYWxzZVxuXHRcdFx0QGl0ZW1JY29uLnJvdGF0aW9uID0gMFxuXHRcdFx0QGNvbnRlbnQuaGVpZ2h0ID0gMFxuXHRcdGVsc2Vcblx0XHRcdEBoZWlnaHQgPSBALmhlaWdodCArIEBjb250ZW50LmhlaWdodFxuXHRcdFxuXHRcdGFkZENoaWxkcmVuKEAsIFtAaXRlbSwgQGNvbnRlbnRdKVxuXHRcblx0XHQjIEludGVyYWN0aW9uXG5cdFx0QGl0ZW0ub25UYXAgPT5cblx0XHRcdGlmIEBpdGVtSWNvbi5yb3RhdGlvbiBpcyAwXG5cdFx0XHRcdEBpdGVtSWNvbi5hbmltYXRlXG5cdFx0XHRcdFx0cm90YXRpb246IDE4MFxuXHRcdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcdFx0QGNvbnRlbnQuYW5pbWF0ZVxuXHRcdFx0XHRcdGhlaWdodDogQGNvbnRlbnQuaW5pdGlhbEhlaWdodFxuXHRcdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcdFx0QGFuaW1hdGVcblx0XHRcdFx0XHRoZWlnaHQ6IEBoZWlnaHQgKyBAY29udGVudC5pbml0aWFsSGVpZ2h0XG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAaXRlbUljb24uYW5pbWF0ZVxuXHRcdFx0XHRcdHJvdGF0aW9uOiAwXG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFx0XHRAY29udGVudC5hbmltYXRlXG5cdFx0XHRcdFx0aGVpZ2h0OiAwXG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFx0XHRAYW5pbWF0ZVxuXHRcdFx0XHRcdGhlaWdodDogY29tcF9mcmFtZV9pdGVtLmhlaWdodFxuXHRcdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0XHR0aW1lOiAwLjJcblxuXHRAZGVmaW5lIFwiZXhwYW5kZWRcIixcblx0XHRnZXQ6IC0+IEBvcHQuZXhwYW5kZWRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHQuZXhwYW5kZWQgPSB2YWx1ZSIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBMkdBQTtBRE9BLElBQUE7OztBQUFNLE1BQU0sQ0FBQztBQUNaLE1BQUE7Ozs7RUFBQSxVQUFBLEdBQWE7O0VBQ2IsZUFBQSxHQUFrQixVQUFVLENBQUMsV0FBWCxDQUF1QixnQkFBdkI7O0VBRUwsbUJBQUMsR0FBRDtJQUFDLElBQUMsQ0FBQSxvQkFBRCxNQUFPO0lBQ3BCLDJDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLEdBQVosRUFDTDtNQUFBLEtBQUEsRUFBTyxVQUFVLENBQUMsS0FBbEI7TUFDQSxNQUFBLEVBQVEsZUFBZSxDQUFDLE1BRHhCO01BRUEsZUFBQSxFQUFpQixPQUZqQjtNQUdBLFNBQUEsRUFBVyxPQUhYO01BSUEsT0FBQSxFQUFTLFVBQVUsQ0FBQyxXQUFYLENBQXVCLG1CQUF2QixDQUpUO01BS0EsUUFBQSxFQUFVLEtBTFY7S0FESyxDQUFOO0lBUUEsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsS0FBaUIsTUFBcEI7TUFDQyxnQkFBQSxDQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQXRCLEVBQThCLElBQTlCLEVBREQ7O0lBR0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsS0FBZ0IsTUFBbkI7TUFDQyxhQUFBLENBQWMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFuQixFQUEwQixJQUExQixFQUE2QixJQUFDLENBQUEsR0FBRyxDQUFDLENBQWxDLEVBREQ7O0lBR0EsSUFBQyxDQUFBLElBQUQsR0FBUSxlQUFlLENBQUMsSUFBaEIsQ0FBQTtJQUNSLElBQUMsQ0FBQSxJQUFJLENBQUMsV0FBTixDQUFrQixZQUFsQixDQUErQixDQUFDLElBQWhDLEdBQXVDLElBQUMsQ0FBQSxHQUFHLENBQUM7SUFDNUMsSUFBQyxDQUFBLElBQUksQ0FBQyxXQUFOLENBQWtCLFlBQWxCLENBQStCLENBQUMsVUFBaEMsR0FBNkM7SUFDN0MsSUFBQyxDQUFBLFFBQUQsR0FBWSxJQUFDLENBQUEsSUFBSSxDQUFDLFdBQU4sQ0FBa0IsTUFBbEI7SUFFWixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQWIsQ0FBQTtJQUNYLElBQUMsQ0FBQSxPQUFPLENBQUMsYUFBVCxHQUF5QixJQUFDLENBQUEsT0FBTyxDQUFDO0lBQ2xDLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUNDO01BQUEsQ0FBQSxFQUFHLENBQUg7TUFBTSxDQUFBLEVBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFmO01BQ0EsSUFBQSxFQUFNLElBRE47O0lBSUQsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsS0FBaUIsS0FBcEI7TUFDQyxJQUFDLENBQUEsUUFBUSxDQUFDLFFBQVYsR0FBcUI7TUFDckIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULEdBQWtCLEVBRm5CO0tBQUEsTUFBQTtNQUlDLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFDLE1BQUYsR0FBVyxJQUFDLENBQUEsT0FBTyxDQUFDLE9BSi9COztJQU1BLFdBQUEsQ0FBWSxJQUFaLEVBQWUsQ0FBQyxJQUFDLENBQUEsSUFBRixFQUFRLElBQUMsQ0FBQSxPQUFULENBQWY7SUFHQSxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQU4sQ0FBWSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDWCxJQUFHLEtBQUMsQ0FBQSxRQUFRLENBQUMsUUFBVixLQUFzQixDQUF6QjtVQUNDLEtBQUMsQ0FBQSxRQUFRLENBQUMsT0FBVixDQUNDO1lBQUEsUUFBQSxFQUFVLEdBQVY7WUFDQSxPQUFBLEVBQ0M7Y0FBQSxJQUFBLEVBQU0sR0FBTjthQUZEO1dBREQ7VUFJQSxLQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsQ0FDQztZQUFBLE1BQUEsRUFBUSxLQUFDLENBQUEsT0FBTyxDQUFDLGFBQWpCO1lBQ0EsT0FBQSxFQUNDO2NBQUEsSUFBQSxFQUFNLEdBQU47YUFGRDtXQUREO2lCQUlBLEtBQUMsQ0FBQSxPQUFELENBQ0M7WUFBQSxNQUFBLEVBQVEsS0FBQyxDQUFBLE1BQUQsR0FBVSxLQUFDLENBQUEsT0FBTyxDQUFDLGFBQTNCO1lBQ0EsT0FBQSxFQUNDO2NBQUEsSUFBQSxFQUFNLEdBQU47YUFGRDtXQURELEVBVEQ7U0FBQSxNQUFBO1VBY0MsS0FBQyxDQUFBLFFBQVEsQ0FBQyxPQUFWLENBQ0M7WUFBQSxRQUFBLEVBQVUsQ0FBVjtZQUNBLE9BQUEsRUFDQztjQUFBLElBQUEsRUFBTSxHQUFOO2FBRkQ7V0FERDtVQUlBLEtBQUMsQ0FBQSxPQUFPLENBQUMsT0FBVCxDQUNDO1lBQUEsTUFBQSxFQUFRLENBQVI7WUFDQSxPQUFBLEVBQ0M7Y0FBQSxJQUFBLEVBQU0sR0FBTjthQUZEO1dBREQ7aUJBSUEsS0FBQyxDQUFBLE9BQUQsQ0FDQztZQUFBLE1BQUEsRUFBUSxlQUFlLENBQUMsTUFBeEI7WUFDQSxPQUFBLEVBQ0M7Y0FBQSxJQUFBLEVBQU0sR0FBTjthQUZEO1dBREQsRUF0QkQ7O01BRFc7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVo7RUFwQ1k7O0VBZ0ViLFNBQUMsQ0FBQSxNQUFELENBQVEsVUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDO0lBQVIsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFDSixJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsR0FBZ0I7SUFEWixDQURMO0dBREQ7Ozs7R0FwRThCOzs7O0FERi9CLElBQUE7OztBQUFNLE1BQU0sQ0FBQztBQUNaLE1BQUE7Ozs7RUFBYSx3QkFBQyxHQUFEO0FBQ1osUUFBQTtJQURhLElBQUMsQ0FBQSxvQkFBRCxNQUFPO0lBQ3BCLGdEQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLEdBQVosRUFDTDtNQUFBLGVBQUEsRUFBaUIsSUFBakI7TUFDQSxRQUFBLEVBQVUsTUFEVjtLQURLLENBQU47SUFJQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxLQUFpQixNQUFwQjtNQUNDLGdCQUFBLENBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBdEIsRUFBOEIsSUFBOUIsRUFERDs7SUFHQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxLQUFnQixNQUFuQjtNQUNDLGFBQUEsQ0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQW5CLEVBQTBCLElBQTFCLEVBQTZCLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBbEMsRUFERDs7SUFLQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQWQsR0FBdUIsQ0FBMUI7TUFDQyxJQUFDLENBQUEsS0FBRCxHQUNDO1FBQUEsS0FBQSxFQUFPLE1BQU0sQ0FBQyxLQUFkO1FBQXFCLGVBQUEsRUFBaUIsbUJBQXRDO1FBQTJELElBQUEsRUFBTSxxSUFBakU7O01BQ0QsS0FBQSxDQUFNLDRDQUFOLEVBSEQ7S0FBQSxNQUFBO01BTUMsV0FBQSxDQUFZLElBQVosRUFBZSxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQXBCO0FBR0E7QUFBQSxXQUFBLDZDQUFBOztRQUNDLEtBQUssQ0FBQyxDQUFOLEdBQVU7UUFDVixLQUFLLENBQUMsQ0FBTixHQUFVO1FBQ1YsUUFBQSxHQUFXLEtBQUssQ0FBQztRQUdqQixLQUFLLENBQUMsS0FBTixDQUFZLFNBQUE7aUJBQ1gsWUFBQSxDQUFhLElBQWIsRUFBZ0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxhQUF6QjtRQURXLENBQVo7UUFHQSxLQUFLLENBQUMsRUFBTixDQUFTLGVBQVQsRUFBMEIsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQTtZQUN6QixLQUFDLENBQUEsTUFBRCxHQUFVLEtBQUMsQ0FBQSxHQUFHLENBQUMsUUFBUyxDQUFBLEtBQUMsQ0FBQSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQWQsR0FBdUIsQ0FBdkIsQ0FBeUIsQ0FBQztZQUVsRCxJQUFHLEtBQUMsQ0FBQyxNQUFGLElBQWEsS0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFULEtBQWlCLFNBQWpDO2NBQ0MsSUFBRyxLQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBNUIsS0FBb0MsaUJBQXZDO3VCQUNDLEtBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWhCLENBQUEsRUFERDtlQUREOztVQUh5QjtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBMUI7QUFURDtNQWlCQSxJQUFDLENBQUEsS0FBRCxHQUNDO1FBQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBQXhCO1FBQ0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBUyxDQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQWQsR0FBdUIsQ0FBdkIsQ0FBeUIsQ0FBQyxJQURoRDtRQTNCRjs7RUFiWTs7RUE0Q2IsWUFBQSxHQUFlLFNBQUMsS0FBRCxFQUFRLFFBQVI7QUFDZCxRQUFBO0lBQUEsUUFBQSxHQUFjLEtBQUssQ0FBQyxRQUFOLEtBQWtCLEtBQXJCLEdBQWdDLFFBQWhDLEdBQThDLENBQUM7QUFFMUQ7QUFBQSxTQUFBLHFDQUFBOztNQUNDLElBQUcsR0FBRyxDQUFDLENBQUosR0FBUSxLQUFLLENBQUMsQ0FBakI7UUFDQyxHQUFHLENBQUMsT0FBSixDQUNDO1VBQUEsQ0FBQSxFQUFHLEdBQUcsQ0FBQyxDQUFKLEdBQVEsUUFBWDtVQUNBLE9BQUEsRUFDQztZQUFBLElBQUEsRUFBTSxHQUFOO1dBRkQ7U0FERCxFQUREOztBQUREO1dBT0EsS0FBSyxDQUFDLFFBQU4sR0FBaUIsQ0FBQyxLQUFLLENBQUM7RUFWVjs7OztHQTdDb0I7Ozs7QURjcEMsSUFBQTs7O0FBQU0sTUFBTSxDQUFDO0FBQ1osTUFBQTs7OztFQUFBLFNBQUEsR0FBWTs7RUFDWixpQkFBQSxHQUFvQixxQkFBcUIsQ0FBQyxXQUF0QixDQUFrQyxpQkFBbEM7O0VBQ3BCLGFBQUEsR0FBZ0IscUJBQXFCLENBQUMsV0FBdEIsQ0FBa0MsU0FBbEM7O0VBQ2hCLGdCQUFBLEdBQW1COztFQUVuQixXQUFBLEdBQ0M7SUFBQSxJQUFBLEVBQU0scUJBQXFCLENBQUMsV0FBdEIsQ0FBa0MsVUFBbEMsQ0FBNkMsQ0FBQyxJQUFwRDtJQUNBLEtBQUEsRUFBTyxxQkFBcUIsQ0FBQyxXQUF0QixDQUFrQyxZQUFsQyxDQUErQyxDQUFDLEtBRHZEO0lBRUEsT0FBQSxFQUFTLElBRlQ7OztFQUlELFVBQUEsR0FDQztJQUFBLElBQUEsRUFBTSxxQkFBcUIsQ0FBQyxXQUF0QixDQUFrQyxjQUFsQyxDQUFpRCxDQUFDLElBQXhEO0lBQ0EsT0FBQSxFQUFTLEtBRFQ7OztFQUdZLHFCQUFDLEdBQUQ7SUFBQyxJQUFDLENBQUEsb0JBQUQsTUFBTztJQUNwQiw2Q0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxHQUFaLEVBQ0w7TUFBQSxLQUFBLEVBQU8sTUFBTSxDQUFDLEtBQWQ7TUFDQSxNQUFBLEVBQVEsTUFBTSxDQUFDLE1BRGY7TUFFQSxPQUFBLEVBQVMsS0FGVDtNQUdBLE9BQUEsRUFBUyxhQUhUO01BSUEsTUFBQSxFQUFRLEVBSlI7TUFLQSxLQUFBLEVBQU8sRUFMUDtLQURLLENBQU47SUFTQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxLQUFpQixNQUFwQjtNQUNDLGdCQUFBLENBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBdEIsRUFBOEIsSUFBOUIsRUFERDs7SUFJQSxJQUFDLENBQUEsZUFBRCxHQUFtQixxQkFBcUIsQ0FBQyxXQUF0QixDQUFrQyxZQUFsQyxDQUErQyxDQUFDLElBQWhELENBQUE7SUFDbkIsSUFBQyxDQUFBLGVBQWUsQ0FBQyxLQUFqQixHQUNDO01BQUEsTUFBQSxFQUFRLElBQVI7TUFDQSxDQUFBLEVBQUcsQ0FESDtNQUNNLENBQUEsRUFBRyxDQURUO01BRUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUZUO01BRWlCLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FGekI7O0lBS0QsSUFBQyxDQUFBLFdBQUQsR0FBZSxxQkFBcUIsQ0FBQyxXQUF0QixDQUFrQyxpQkFBbEMsQ0FBb0QsQ0FBQyxJQUFyRCxDQUFBO0lBQ2YsSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFiLEdBQ0M7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUNBLENBQUEsRUFBRyxDQURIOztJQUlELElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUNoQixJQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsR0FDQztNQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsV0FBVDtNQUNBLENBQUEsRUFBRyxDQURIO01BQ00sQ0FBQSxFQUFHLGFBQWEsQ0FBQyxDQUR2Qjs7SUFHRCxJQUFDLENBQUEsV0FBVyxDQUFDLFdBQWIsQ0FBeUIsU0FBekIsQ0FBbUMsQ0FBQyxPQUFwQyxDQUFBO0lBRUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxNQUFiLEdBQXNCLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQjtJQUN0QyxJQUFDLENBQUEsV0FBVyxDQUFDLENBQWIsR0FBaUIsS0FBSyxDQUFDLE1BQU4sQ0FBYSxJQUFDLENBQUEsV0FBVyxDQUFDLE1BQTFCO0lBR2pCLElBQUMsQ0FBQSxZQUFELEdBQW9CLElBQUEsTUFBQSxDQUNuQjtNQUFBLElBQUEsRUFBTSxZQUFOO01BQ0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxXQUFXLENBQUMsV0FBYixDQUF5QixRQUF6QixDQURSO01BRUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEtBQWxCLEdBQTBCLElBQUMsQ0FBQSxXQUFXLENBQUMsV0FBYixDQUF5QixZQUF6QixDQUFzQyxDQUFDLElBQWxFLENBQWIsQ0FGSDtNQUUwRixDQUFBLEVBQUcsSUFBQyxDQUFBLFdBQVcsQ0FBQyxXQUFiLENBQXlCLFlBQXpCLENBQXNDLENBQUMsQ0FGcEk7TUFHQSxLQUFBLEVBQVUsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBWixLQUFxQixNQUF4QixHQUF1QyxXQUFXLENBQUMsS0FBbkQsR0FBOEQsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FIakY7TUFJQSxJQUFBLEVBQVMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBWixLQUFvQixNQUF2QixHQUFzQyxXQUFXLENBQUMsSUFBbEQsR0FBNEQsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFKOUU7TUFLQSxPQUFBLEVBQVMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FMckI7S0FEbUI7SUFRcEIsSUFBQyxDQUFBLFdBQVcsQ0FBQyxXQUFiLENBQXlCLFlBQXpCLENBQXNDLENBQUMsT0FBdkMsQ0FBQTtJQUdBLElBQUMsQ0FBQSxXQUFELEdBQWUsSUFBQyxDQUFBLFdBQVcsQ0FBQyxXQUFiLENBQXlCLGNBQXpCO0lBQ2YsSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFiLEdBQ0M7TUFBQSxPQUFBLEVBQVksSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBWCxLQUFzQixNQUF6QixHQUF3QyxVQUFVLENBQUMsT0FBbkQsR0FBZ0UsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBcEY7TUFDQSxVQUFBLEVBQVksSUFEWjtNQUVBLElBQUEsRUFBUyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFYLEtBQW1CLE1BQXRCLEdBQXFDLFVBQVUsQ0FBQyxJQUFoRCxHQUEwRCxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUYzRTs7SUFLRCxJQUFDLENBQUEsTUFBRCxHQUNDO01BQUEsSUFBQSxFQUNDO1FBQUEsT0FBQSxFQUFTLENBQVQ7T0FERDtNQUVBLElBQUEsRUFDQztRQUFBLE9BQUEsRUFBUyxDQUFUO1FBQ0EsT0FBQSxFQUNDO1VBQUEsS0FBQSxFQUFPLEdBQVA7U0FGRDtPQUhEO01BTUEsZ0JBQUEsRUFDQztRQUFBLElBQUEsRUFBTSxHQUFOO1FBQ0EsS0FBQSxFQUFPLFVBRFA7T0FQRDs7SUFVRCxJQUFDLENBQUEsV0FBVyxDQUFDLE1BQWIsR0FDQztNQUFBLElBQUEsRUFDQztRQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLGdCQUFiLENBQUg7UUFDQSxPQUFBLEVBQ0M7VUFBQSxLQUFBLEVBQU8sTUFBQSxDQUFPO1lBQUEsT0FBQSxFQUFTLEdBQVQ7WUFBYyxRQUFBLEVBQVUsRUFBeEI7V0FBUCxDQUFQO1NBRkQ7T0FERDtNQUlBLElBQUEsRUFDQztRQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLElBQUMsQ0FBQSxXQUFXLENBQUMsTUFBMUIsQ0FBSDtRQUNBLE9BQUEsRUFDQztVQUFBLElBQUEsRUFBTSxHQUFOO1NBRkQ7T0FMRDs7SUFVRCxJQUFDLENBQUEsZUFBZSxDQUFDLEtBQWpCLENBQXVCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUN0QixLQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBcUIsTUFBckI7UUFDQSxLQUFDLENBQUEsT0FBRCxDQUFTLE1BQVQ7ZUFDQSxLQUFLLENBQUMsS0FBTixDQUFZLEdBQVosRUFBaUIsU0FBQTtpQkFDaEIsS0FBQyxDQUFBLE9BQUQsR0FBVztRQURLLENBQWpCO01BSHNCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2QjtJQU1BLElBQUMsQ0FBQSxXQUFXLENBQUMsV0FBYixDQUF5QixjQUF6QixDQUF3QyxDQUFDLEtBQXpDLENBQStDLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUM5QyxLQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBcUIsTUFBckI7UUFDQSxLQUFDLENBQUEsT0FBRCxDQUFTLE1BQVQ7ZUFDQSxLQUFLLENBQUMsS0FBTixDQUFZLEdBQVosRUFBaUIsU0FBQTtpQkFDaEIsS0FBQyxDQUFBLE9BQUQsR0FBVztRQURLLENBQWpCO01BSDhDO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEvQztJQU1BLElBQUMsQ0FBQSxXQUFXLENBQUMsS0FBYixDQUFtQixTQUFBO0FBQ2xCLGFBQU87SUFEVyxDQUFuQjtFQTFGWTs7d0JBOEZiLElBQUEsR0FBTSxTQUFBO0lBQ0wsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxPQUFELENBQVMsTUFBVDtXQUNBLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFxQixNQUFyQjtFQUhLOzs7O0dBN0cwQjs7OztBRGxCakMsSUFBQTs7O0FBQU0sTUFBTSxDQUFDO0FBRVosTUFBQTs7OztFQUFBLGFBQUEsR0FBZ0Isc0JBQXNCLENBQUMsV0FBdkIsQ0FBbUMsYUFBbkM7O0VBQ2hCLFVBQUEsR0FBYSxrQkFBa0IsQ0FBQyxXQUFuQixDQUErQixhQUEvQjs7RUFFQSxnQkFBQyxHQUFEO0FBRVosUUFBQTtJQUZhLElBQUMsQ0FBQSxvQkFBRCxNQUFLO0lBRWxCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLEdBQVo7QUFDQyxjQUFPLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBWjtBQUFBLGFBQ00sU0FETjtBQUFBLGFBQ2lCLE1BRGpCO1VBRUUsSUFBQyxDQUFBLFlBQUQsR0FBZ0I7aUJBQ2hCO1lBQUEsSUFBQSxFQUFNLElBQUMsQ0FBQSxZQUFZLENBQUMsV0FBZCxDQUEwQixhQUExQixDQUF3QyxDQUFDLElBQS9DO1lBQ0EsZUFBQSxFQUFpQixDQURqQjs7QUFIRixhQUtNLFdBTE47VUFNRSxJQUFDLENBQUEsWUFBRCxHQUFnQjtpQkFDaEI7WUFBQSxJQUFBLEVBQU0sSUFBQyxDQUFBLFlBQVksQ0FBQyxXQUFkLENBQTBCLGFBQTFCLENBQXdDLENBQUMsSUFBL0M7O0FBUEYsYUFRTSxVQVJOO1VBU0UsSUFBQyxDQUFBLFlBQUQsR0FBZ0I7aUJBQ2hCO1lBQUEsSUFBQSxFQUFNLElBQUMsQ0FBQSxZQUFZLENBQUMsV0FBZCxDQUEwQixhQUExQixDQUF3QyxDQUFDLElBQS9DOztBQVZGLGFBV00sTUFYTjtVQVlFLElBQUMsQ0FBQSxZQUFELEdBQWdCO2lCQUNoQjtZQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsWUFBWSxDQUFDLFdBQWQsQ0FBMEIsYUFBMUIsQ0FBd0MsQ0FBQyxJQUEvQzs7QUFiRixhQWNNLEtBZE47VUFlRSxJQUFDLENBQUEsWUFBRCxHQUFnQjtpQkFDaEI7WUFBQSxJQUFBLEVBQU0sSUFBQyxDQUFBLFlBQVksQ0FBQyxXQUFkLENBQTBCLGFBQTFCLENBQXdDLENBQUMsSUFBL0M7WUFDQSxZQUFBLEVBQWMsUUFEZDtZQUVBLFVBQUEsRUFBWSxTQUZaOztBQWhCRjtpQkFERDtJQXNCQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxZQUFZLENBQUMsV0FBZCxDQUEwQixhQUExQixDQUF3QyxDQUFDLElBQXpDLENBQUE7SUFDWCxJQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsR0FDQztNQUFBLElBQUEsRUFBTSxVQUFOO01BQ0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFEWDtNQUVBLFVBQUEsRUFBWSxRQUZaOztJQUlELHFCQUFBLEdBQXdCLHNCQUFzQixDQUFDLEtBQXZCLEdBQStCLGFBQWEsQ0FBQztJQUdyRSx3Q0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxHQUFaLEVBQ0w7TUFBQSxLQUFBO0FBQU8sZ0JBQUEsS0FBQTtBQUFBLGlCQUNELElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxLQUFhLEtBQWIsSUFBdUIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLEtBQWEsT0FEbkM7bUJBRUwsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsWUFBTCxHQUFrQjtBQUY5QixpQkFHRCxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsS0FBYSxLQUFiLElBQXVCLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxLQUFlLE9BSHJDO21CQUlMLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLFlBQXRCLEdBQXFDLHFCQUFyQyxHQUE2RCxhQUFhLENBQUMsS0FBM0UsR0FBbUYsSUFBQyxDQUFBLEdBQUcsQ0FBQztBQUpuRjttQkFNTCxJQUFDLENBQUEsWUFBWSxDQUFDO0FBTlQ7bUJBQVA7TUFPQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFlBQVksQ0FBQyxNQVB0QjtNQVFBLGVBQUEsRUFBaUIsSUFBQyxDQUFBLFlBQVksQ0FBQyxlQVIvQjtNQVNBLFlBQUEsRUFBYyxJQUFDLENBQUEsWUFBWSxDQUFDLFlBVDVCO01BVUEsV0FBQSxFQUFhLElBQUMsQ0FBQSxZQUFZLENBQUMsV0FWM0I7TUFXQSxXQUFBLEVBQWEsSUFBQyxDQUFBLFlBQVksQ0FBQyxXQVgzQjtLQURLLENBQU47SUFjQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxLQUFpQixNQUFwQjtNQUNDLGdCQUFBLENBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBdEIsRUFBOEIsSUFBOUIsRUFERDs7SUFHQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxLQUFnQixNQUFuQjtNQUNDLGFBQUEsQ0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQW5CLEVBQTBCLElBQTFCLEVBQTZCLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBbEMsRUFERDs7SUFHQSxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsR0FBa0I7SUFDbEIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULEdBQXFCO0lBRXJCLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBVDtBQUFhLGNBQUEsS0FBQTtBQUFBLGVBQ1AsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLEtBQWEsS0FBYixJQUF1QixJQUFDLENBQUEsR0FBRyxDQUFDLFNBQUwsS0FBa0IsT0FEbEM7aUJBRVgsS0FBSyxDQUFDLElBQU4sQ0FBVyxxQkFBQSxHQUF3QixhQUFhLENBQUMsS0FBdEMsR0FBOEMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxVQUE5RDtBQUZXLGVBR1AsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLEtBQWEsS0FBYixJQUF1QixJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsS0FBZSxPQUgvQjtpQkFJWCxLQUFLLENBQUMsSUFBTixDQUFXLElBQUMsQ0FBQSxHQUFHLENBQUMsWUFBaEI7QUFKVztpQkFNWCxLQUFLLENBQUMsTUFBTixDQUFBO0FBTlc7O0lBU2IsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsS0FBZSxNQUFsQjtNQUNDLElBQUMsQ0FBQSxJQUFELEdBQVksSUFBQSxLQUFBLENBQ1g7UUFBQSxNQUFBLEVBQVEsSUFBUjtRQUNBLElBQUEsRUFBTSxVQUROO1FBRUEsS0FBQSxFQUFPLFVBQVUsQ0FBQyxLQUZsQjtRQUdBLE1BQUEsRUFBUSxVQUFVLENBQUMsTUFIbkI7UUFJQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBQSxDQUpIO1FBS0EsQ0FBQTtBQUFHLGtCQUFBLEtBQUE7QUFBQSxtQkFDRyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsS0FBYSxLQUFiLElBQXVCLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBTCxLQUFrQixPQUQ1QztxQkFFRCxJQUFDLENBQUEsT0FBTyxDQUFDLENBQVQsR0FBYSxhQUFhLENBQUMsS0FBM0IsR0FBbUMsSUFBQyxDQUFBLEdBQUcsQ0FBQztBQUZ2QyxpQkFHRyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsS0FBYSxLQUhoQjtxQkFJRCxLQUFLLENBQUMsS0FBTixDQUFZLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxLQUF2QixHQUErQixzQkFBc0IsQ0FBQyxXQUF2QixDQUFtQyxhQUFuQyxDQUFpRCxDQUFDLElBQWxGLENBQWI7QUFKQyxpQkFLRyxJQUFDLENBQUEsR0FBRyxDQUFDLFNBQUwsS0FBa0IsTUFMckI7cUJBTUQsS0FBSyxDQUFDLElBQU4sQ0FBVyxJQUFDLENBQUEsWUFBWSxDQUFDLEtBQWQsR0FBc0IsVUFBVSxDQUFDLElBQTVDO0FBTkM7cUJBUUQsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFDLENBQUMsSUFBQyxDQUFBLFlBQVksQ0FBQyxLQUFkLEdBQXNCLFVBQVUsQ0FBQyxJQUFsQyxDQUFiO0FBUkM7cUJBTEg7UUFjQSxlQUFBLEVBQWlCLGlCQWRqQjtPQURXO01BZ0JaLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBTixHQUNBO1FBQUEsUUFBQSxFQUFVLFNBQUEsR0FBVSxJQUFDLENBQUEsR0FBRyxDQUFDLGVBQWYsR0FBK0IsR0FBekM7O01BQ0EsSUFBRyxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBaEIsQ0FBSDtRQUNDLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBTixHQUNDO1VBQUEsZUFBQSxFQUFpQixJQUFqQjtVQUVBLEtBQUEsRUFBTyw2QkFBQSxHQUE4QixJQUFDLENBQUEsR0FBRyxDQUFDLElBQW5DLEdBQXdDLE1BRi9DO1VBRkY7T0FuQkQ7O0lBMEJBLElBQUMsQ0FBQyxFQUFGLENBQUssY0FBTCxFQUFxQixTQUFBO01BQ3BCLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBVCxHQUFhLEtBQUssQ0FBQyxNQUFOLENBQUE7TUFDYixJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxLQUFhLEtBQWIsSUFBdUIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLEtBQWUsTUFBekM7UUFDQyxJQUFDLENBQUEsT0FBTyxDQUFDLENBQVQsR0FBYSxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsYUFBYSxDQUFDLEtBQWYsR0FBcUIsQ0FBbEM7ZUFDYixJQUFDLENBQUEsSUFBSSxDQUFDLENBQU4sR0FBVSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsR0FBZ0IsSUFBQyxDQUFBLEdBQUcsQ0FBQyxXQUZoQztPQUFBLE1BR0ssSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsS0FBZSxNQUFsQjtlQUNKLElBQUMsQ0FBQSxJQUFJLENBQUMsQ0FBTjtBQUFVLGtCQUFBLEtBQUE7QUFBQSxpQkFDSixJQUFDLENBQUEsR0FBRyxDQUFDLFNBQUwsS0FBa0IsTUFEZDtxQkFFUixLQUFLLENBQUMsSUFBTixDQUFXLElBQUMsQ0FBQSxZQUFZLENBQUMsS0FBZCxHQUFzQixVQUFVLENBQUMsSUFBNUM7QUFGUTtxQkFJUixLQUFLLENBQUMsS0FBTixDQUFZLENBQUMsQ0FBQyxJQUFDLENBQUEsWUFBWSxDQUFDLEtBQWQsR0FBc0IsVUFBVSxDQUFDLElBQWxDLENBQWI7QUFKUTtzQkFETjs7SUFMZSxDQUFyQjtFQTNGWTs7RUF1R2IsTUFBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUNKLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFETCxDQUFMO0lBRUEsR0FBQSxFQUFLLFNBQUMsR0FBRDtNQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQjtNQUNoQixJQUFDLENBQUEsT0FBTyxDQUFDLENBQVQsR0FBYSxLQUFLLENBQUMsTUFBTixDQUFBO0FBQ2IsY0FBQSxLQUFBO0FBQUEsZUFDTSxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsS0FBYSxLQUFiLElBQXVCLElBQUMsQ0FBQSxJQUFELEtBQVcsTUFBbEMsSUFBZ0QsSUFBQyxDQUFBLEdBQUcsQ0FBQyxTQUFMLEtBQWtCLE9BRHhFO1VBRUUsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsR0FBaUIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxZQUFMLEdBQWtCLENBQW5DLEdBQXVDLFVBQVUsQ0FBQyxLQUFsRCxHQUEwRCxJQUFDLENBQUEsR0FBRyxDQUFDO1VBQ3hFLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBVCxHQUFhLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBQyxVQUFVLENBQUMsS0FBWCxHQUFtQixJQUFDLENBQUEsR0FBRyxDQUFDLFVBQXpCLENBQUEsR0FBcUMsQ0FBbEQ7aUJBQ2IsSUFBQyxDQUFBLElBQUksQ0FBQyxDQUFOLEdBQVUsSUFBQyxDQUFBLE9BQU8sQ0FBQyxDQUFULEdBQWEsVUFBVSxDQUFDLEtBQXhCLEdBQWdDLElBQUMsQ0FBQSxHQUFHLENBQUM7QUFKakQsZUFLTSxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsS0FBYSxLQUFiLElBQXVCLElBQUMsQ0FBQSxJQUFELEtBQVcsT0FMeEM7VUFNRSxJQUFDLENBQUEsSUFBSSxDQUFDLENBQU4sR0FBVSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsR0FBZ0IsSUFBQyxDQUFBLEdBQUcsQ0FBQztpQkFDL0IsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsR0FBaUIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxZQUFMLEdBQWtCLENBQW5DLEdBQXVDLFVBQVUsQ0FBQyxLQUFsRCxHQUEwRCxJQUFDLENBQUEsR0FBRyxDQUFDO0FBUDFFLGVBUU0sSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLEtBQWEsS0FBYixJQUF1QixJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsS0FBYSxPQVIxQztpQkFTRSxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLFlBQUwsR0FBa0I7QUFUOUM7aUJBV0UsSUFBQyxDQUFBLE9BQU8sQ0FBQyxDQUFULEdBQWEsS0FBSyxDQUFDLE1BQU4sQ0FBQTtBQVhmO0lBSEksQ0FGTDtHQUREOzs7O0dBNUcyQjs7OztBREE1QixJQUFBOzs7QUFBTSxNQUFNLENBQUM7OztFQUNDLHFCQUFDLEdBQUQ7QUFDWixRQUFBO0lBRGEsSUFBQyxDQUFBLG9CQUFELE1BQU87SUFDcEIsU0FBQSxHQUFZO0lBRVosSUFBQyxDQUFBLFNBQUQsR0FBaUIsSUFBQSxNQUFBLENBQ2hCO01BQUEsSUFBQSxFQUFNLFFBQU47TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRFQ7TUFDaUIsQ0FBQSxFQUFHLFNBQVMsQ0FBQyxXQUFWLENBQXNCLEtBQXRCLENBQTRCLENBQUMsQ0FEakQ7TUFFQSxLQUFBLEVBQU8sU0FBUyxDQUFDLEtBQVYsR0FBa0IsUUFGekI7TUFHQSxJQUFBLEVBQU0sU0FBUyxDQUFDLFdBQVYsQ0FBc0IsYUFBdEIsQ0FBb0MsQ0FBQyxJQUgzQztLQURnQjtJQUtqQixTQUFTLENBQUMsV0FBVixDQUFzQixLQUF0QixDQUE0QixDQUFDLE9BQTdCLENBQUE7SUFHQSw2Q0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxHQUFaLEVBQ0w7TUFBQSxLQUFBLEVBQU8sU0FBUyxDQUFDLEtBQWpCO01BQ0EsTUFBQSxFQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBZCxLQUE0QiwyQkFBL0IsR0FBZ0UsRUFBaEUsR0FBd0UsU0FBUyxDQUFDLE1BRDFGO01BRUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFOLENBQUEsQ0FGSDtNQUdBLEtBQUEsRUFBTyxTQUFTLENBQUMsS0FIakI7S0FESyxDQUFOO0lBTUEsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsS0FBaUIsTUFBcEI7TUFDQyxnQkFBQSxDQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQXRCLEVBQThCLElBQTlCLEVBREQ7O0lBR0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsS0FBZ0IsTUFBbkI7TUFDQyxhQUFBLENBQWMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFuQixFQUEwQixJQUExQixFQUE2QixJQUFDLENBQUEsR0FBRyxDQUFDLENBQWxDLEVBREQ7O0lBSUEsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsS0FBaUIsTUFBcEI7TUFDQyxnQkFBQSxDQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQXRCLEVBQThCLElBQTlCLEVBREQ7O0lBSUEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLEdBQW9CO0VBNUJSOztFQWlDYixXQUFDLENBQUEsTUFBRCxDQUFRLE1BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUFSLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLEdBQVk7YUFDWixJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsR0FBa0I7SUFGZCxDQURMO0dBREQ7Ozs7R0FsQ2dDOzs7O0FET2pDLElBQUE7Ozs7QUFBTSxNQUFNLENBQUM7QUFDWixNQUFBOzs7O0VBQUEsU0FBQSxHQUFZOztFQUNaLGlCQUFBLEdBQW9CLFNBQVMsQ0FBQyxXQUFWLENBQXNCLE9BQXRCLENBQThCLENBQUM7O0VBQ25ELHFCQUFBLEdBQXdCLFNBQVMsQ0FBQyxXQUFWLENBQXNCLGFBQXRCLENBQW9DLENBQUM7O0VBQzdELFVBQUEsR0FBYSxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFuQixDQUF5QixrQkFBekI7O0VBRUYsaUJBQUMsR0FBRDtJQUFDLElBQUMsQ0FBQSxvQkFBRCxNQUFLOztJQUNsQix5Q0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxHQUFaLEVBQ0w7TUFBQSxLQUFBLEVBQU8sU0FBUyxDQUFDLEtBQWpCO01BQ0EsTUFBQSxFQUFRLFNBQVMsQ0FBQyxNQURsQjtNQUVBLGVBQUEsRUFBaUIsU0FBUyxDQUFDLGVBRjNCO0tBREssQ0FBTjtJQU1BLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxTQUFSO01BQ0MsSUFBQyxDQUFBLFNBQUQsR0FBYSxTQUFTLENBQUMsV0FBVixDQUFzQixhQUF0QixDQUFvQyxDQUFDLElBQXJDLENBQUE7TUFDYixJQUFDLENBQUEsU0FBUyxDQUFDLEtBQVgsR0FDQztRQUFBLE1BQUEsRUFBUSxJQUFSO1FBQ0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FEWDtRQUVBLFVBQUEsRUFBWSxJQUZaO1FBSEY7O0lBUUEsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsS0FBaUIsTUFBcEI7TUFDQyxnQkFBQSxDQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQXRCLEVBQThCLElBQTlCLEVBREQ7O0lBSUEsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsS0FBZ0IsTUFBbkI7TUFDQyxhQUFBLENBQWMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFuQixFQUEwQixJQUExQixFQUREOztJQUlBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxLQUFBLENBQ1o7TUFBQSxJQUFBLEVBQU0sVUFBTjtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBRFo7TUFFQSxNQUFBLEVBQVEsSUFGUjtNQUdBLENBQUEsRUFBRyxpQkFBaUIsQ0FBQyxDQUhyQjtNQUd3QixDQUFBLEVBQU0sSUFBQyxDQUFBLEdBQUcsQ0FBQyxTQUFSLEdBQXVCLGlCQUFpQixDQUFDLENBQXpDLEdBQWdELENBSDNFO01BSUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFELEdBQVMsUUFBQSxHQUFTLENBSnpCO01BSTRCLE1BQUEsRUFBUSxpQkFBaUIsQ0FBQyxNQUp0RDtNQUtBLElBQUEsRUFBTSxJQUFDLENBQUEsR0FBRyxDQUFDLGVBTFg7TUFNQSxZQUFBLEVBQWMsaUJBQWlCLENBQUMsWUFOaEM7TUFPQSxXQUFBLEVBQWEsaUJBQWlCLENBQUMsV0FQL0I7TUFRQSxXQUFBLEVBQWEsaUJBQWlCLENBQUMsV0FSL0I7TUFTQSxLQUFBLEVBQVUsSUFBQyxDQUFBLEdBQUcsQ0FBQyxlQUFSLEdBQTZCLHFCQUFxQixDQUFDLEtBQW5ELEdBQThELGFBVHJFO01BVUEsT0FBQSxFQUNDO1FBQUEsSUFBQSxFQUFNLHFCQUFxQixDQUFDLENBQTVCO09BWEQ7S0FEWTtJQWNiLElBQUMsQ0FBQSxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUEzQixHQUF3QyxxQkFBcUIsQ0FBQztJQUM5RCxJQUFDLENBQUEsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBM0IsR0FDSSxNQUFNLENBQUMsZ0JBQVAsS0FBMkIsQ0FBM0IsSUFBaUMsVUFBQSxLQUFjLElBQWxELEdBQ0csQ0FBQyxxQkFBcUIsQ0FBQyxRQUF0QixHQUErQixDQUFoQyxDQUFBLEdBQWtDLElBRHJDLEdBRVEsTUFBTSxDQUFDLGdCQUFQLEtBQTJCLENBQTlCLEdBQ0YsQ0FBQyxxQkFBcUIsQ0FBQyxRQUF0QixHQUErQixDQUFoQyxDQUFBLEdBQWtDLElBRGhDLEdBRUcsTUFBTSxDQUFDLGdCQUFQLEtBQTJCLENBQTNCLElBQWlDLFVBQUEsS0FBYyxJQUFsRCxHQUNGLENBQUMscUJBQXFCLENBQUMsUUFBdEIsR0FBK0IsQ0FBaEMsQ0FBQSxHQUFrQyxJQURoQyxHQUVHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBZCxLQUE0QiwyQkFBNUIsSUFBMkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFkLEtBQTRCLHVCQUExRixHQUNGLENBQUMscUJBQXFCLENBQUMsUUFBdEIsR0FBK0IsQ0FBaEMsQ0FBQSxHQUFrQyxJQURoQyxHQUdELHFCQUFxQixDQUFDLFFBQXZCLEdBQWdDO0lBRXBDLElBQUMsQ0FBQSxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUEzQixHQUFvQyxDQUFDLFFBQUEsQ0FBUyxJQUFDLENBQUEsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBcEMsQ0FBQSxHQUE0QyxDQUE3QyxDQUFBLEdBQWtEO0lBR3RGLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxVQUFSO01BQ0MsSUFBQyxDQUFBLFVBQUQsR0FBYyxTQUFTLENBQUMsV0FBVixDQUFzQixhQUF0QixDQUFvQyxDQUFDLElBQXJDLENBQUE7TUFDZCxJQUFDLENBQUEsVUFBVSxDQUFDLEtBQVosR0FDQztRQUFBLENBQUEsRUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsR0FBYyxDQUFDLFNBQVMsQ0FBQyxXQUFWLENBQXNCLGFBQXRCLENBQW9DLENBQUMsQ0FBckMsR0FBeUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFsQixHQUFzQixpQkFBaUIsQ0FBQyxNQUF6QyxDQUExQyxDQUFqQjtRQUNBLE1BQUEsRUFBUSxJQURSO1FBRUEsSUFBQSxFQUFNLElBQUMsQ0FBQSxHQUFHLENBQUMsVUFGWDtRQUdBLFVBQUEsRUFBWSxJQUhaO1FBSEY7O0lBUUEsSUFBQyxDQUFBLE1BQUQsR0FBYSxJQUFDLENBQUEsR0FBRyxDQUFDLFVBQVIsR0FDUixJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosR0FBbUIsQ0FBQyxTQUFTLENBQUMsTUFBVixHQUFtQixTQUFTLENBQUMsV0FBVixDQUFzQixhQUF0QixDQUFvQyxDQUFDLElBQXpELENBRFgsR0FHUixTQUFTLENBQUMsTUFBVixHQUFtQixTQUFTLENBQUMsV0FBVixDQUFzQixhQUF0QixDQUFvQyxDQUFDO0VBaEU5Qzs7b0JBbUViLEtBQUEsR0FBTyxTQUFBO1dBQ04sSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFQLENBQUE7RUFETTs7OztHQXpFcUI7Ozs7QURQN0IsSUFBQTs7O0FBQU0sTUFBTSxDQUFDOzs7RUFDQywyQkFBQyxHQUFEO0lBQUMsSUFBQyxDQUFBLG9CQUFELE1BQUs7SUFDbEIsbURBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsR0FBWixFQUVILElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxLQUFpQixNQUFwQixHQUNDLGdCQUFBLENBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBdEIsRUFBOEIsSUFBOUIsQ0FERCxHQUFBLE1BRk0sQ0FBTjtJQUtBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEtBQWdCLE1BQW5CO01BQ0MsYUFBQSxDQUFjLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBbkIsRUFBMEIsSUFBMUIsRUFBNkIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUFsQyxFQUREOztFQU5ZOzs7O0dBRHlCOzs7O0FEQXZDLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O0VBQ0MsZ0JBQUMsR0FBRDtBQUVaLFFBQUE7SUFGYSxJQUFDLENBQUEsb0JBQUQsTUFBTztJQUVwQixLQUFBLEdBQVE7SUFHUixJQUFDLENBQUEsY0FBRCxHQUFrQixZQUFZLENBQUMsV0FBYixDQUF5QixVQUF6QixDQUFvQyxDQUFDLElBQXJDLENBQUE7SUFDbEIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxVQUFoQixHQUE2QjtBQUU3QixZQUFBLEtBQUE7QUFBQSxhQUVNLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxLQUFnQixNQUFoQixJQUEyQixJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsS0FBaUIsT0FGbEQ7UUFHRSxJQUFDLENBQUEsV0FBRCxHQUFlLE1BQU0sQ0FBQyxXQUFQLENBQW1CLE9BQW5CLENBQTJCLENBQUMsSUFBNUIsQ0FBQTtRQUNmLElBQUMsQ0FBQSxXQUFXLENBQUMsVUFBYixHQUEwQjs7QUFKNUIsV0FNTyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsS0FBYyxNQU5yQjtRQU9FLElBQUMsQ0FBQSxXQUFELEdBQWUsV0FBVyxDQUFDLFdBQVosQ0FBd0IsTUFBeEIsQ0FBK0IsQ0FBQyxJQUFoQyxDQUFBO0FBRFY7QUFOUCxXQVNNLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxLQUFtQixNQVR6QjtRQVVFLElBQUMsQ0FBQSxXQUFELEdBQWUsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsT0FBekIsQ0FBaUMsQ0FBQyxJQUFsQyxDQUFBO1FBQ2YsSUFBQyxDQUFBLFdBQVcsQ0FBQyxVQUFiLEdBQTBCO0FBWDVCO0lBYUEsSUFBQyxDQUFBLGNBQUQsR0FBa0IsSUFBSTtJQUN0QixJQUFDLENBQUEsY0FBYyxDQUFDLEtBQWhCLEdBQXlCLE1BQU0sQ0FBQyxXQUFQLENBQW1CLFVBQW5CLENBQThCLENBQUM7SUFFeEQsSUFBQyxDQUFBLGVBQUQsR0FBbUIsSUFBSTtJQUN2QixJQUFDLENBQUEsZUFBZSxDQUFDLEtBQWpCLEdBQTBCLE1BQU0sQ0FBQyxXQUFQLENBQW1CLFdBQW5CLENBQStCLENBQUM7SUFFMUQsSUFBQyxDQUFBLGNBQUQsR0FBa0IsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsV0FBekIsQ0FBcUMsQ0FBQyxJQUF0QyxDQUFBO0lBQ2xCLElBQUMsQ0FBQSxjQUFjLENBQUMsVUFBaEIsR0FBNkI7SUFFN0IsSUFBQyxDQUFBLGVBQUQsR0FBbUIsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsWUFBekIsQ0FBc0MsQ0FBQyxJQUF2QyxDQUFBO0lBQ25CLElBQUMsQ0FBQSxlQUFlLENBQUMsVUFBakIsR0FBOEI7SUFFOUIsSUFBQyxDQUFBLFNBQUQsR0FBYSxZQUFZLENBQUMsV0FBYixDQUF5QixLQUF6QixDQUErQixDQUFDLElBQWhDLENBQUE7SUFFYixJQUFDLENBQUEsWUFBRCxHQUFnQixNQUFNLENBQUMsV0FBUCxDQUFtQixZQUFuQixDQUFnQyxDQUFDLElBQWpDLENBQUE7SUFHaEIsd0NBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsR0FBWixFQUNMO01BQUEsTUFBQSxFQUFRLEtBQUssQ0FBQyxNQUFkO01BQ0EsS0FBQSxFQUFPLEtBQUssQ0FBQyxLQURiO01BRUEsZUFBQSxFQUFpQixLQUFLLENBQUMsZUFGdkI7S0FESyxDQUFOO0lBS0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsS0FBaUIsTUFBcEI7TUFDQyxnQkFBQSxDQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQXRCLEVBQThCLElBQTlCLEVBREQ7O0lBR0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsS0FBZ0IsTUFBbkI7TUFDQyxhQUFBLENBQWMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFuQixFQUEwQixJQUExQixFQUE2QixJQUFDLENBQUEsR0FBRyxDQUFDLENBQWxDLEVBREQ7O0lBSUEsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsS0FBbUIsTUFBdEI7TUFBcUMsSUFBQyxDQUFBLGNBQWMsQ0FBQyxNQUFoQixHQUF5QixLQUE5RDtLQUFBLE1BQUE7TUFBcUUsSUFBQyxDQUFBLGNBQWMsQ0FBQyxPQUFoQixDQUFBLEVBQXJFOztJQUNBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEtBQWdCLE1BQW5CO01BQWtDLElBQUMsQ0FBQSxXQUFXLENBQUMsTUFBYixHQUFzQixLQUF4RDtLQUFBLE1BQUE7TUFBK0QsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUFiLENBQUEsRUFBL0Q7O0lBQ0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsS0FBbUIsTUFBdEI7TUFBcUMsSUFBQyxDQUFBLGNBQWMsQ0FBQyxNQUFoQixHQUF5QixLQUE5RDtLQUFBLE1BQUE7TUFBcUUsSUFBQyxDQUFBLGNBQWMsQ0FBQyxPQUFoQixDQUFBLEVBQXJFOztJQUNBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxTQUFMLEtBQW9CLE1BQXZCO01BQXNDLElBQUMsQ0FBQSxlQUFlLENBQUMsTUFBakIsR0FBMEIsS0FBaEU7S0FBQSxNQUFBO01BQXVFLElBQUMsQ0FBQSxlQUFlLENBQUMsT0FBakIsQ0FBQSxFQUF2RTs7SUFDQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxLQUFtQixNQUF0QjtNQUFxQyxJQUFDLENBQUEsY0FBYyxDQUFDLE1BQWhCLEdBQXlCLEtBQTlEO0tBQUEsTUFBQTtNQUFxRSxJQUFDLENBQUEsY0FBYyxDQUFDLE9BQWhCLENBQUEsRUFBckU7O0lBQ0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLFNBQUwsS0FBb0IsTUFBdkI7TUFBc0MsSUFBQyxDQUFBLGVBQWUsQ0FBQyxNQUFqQixHQUEwQixLQUFoRTtLQUFBLE1BQUE7TUFBdUUsSUFBQyxDQUFBLGVBQWUsQ0FBQyxPQUFqQixDQUFBLEVBQXZFOztJQUNBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxHQUFMLEtBQWMsTUFBakI7TUFBZ0MsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLEdBQW9CLEtBQXBEO0tBQUEsTUFBQTtNQUEyRCxJQUFDLENBQUEsU0FBUyxDQUFDLE9BQVgsQ0FBQSxFQUEzRDs7SUFDQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxLQUFpQixNQUFwQjtNQUFtQyxJQUFDLENBQUEsWUFBWSxDQUFDLE1BQWQsR0FBdUIsS0FBMUQ7S0FBQSxNQUFBO01BQWlFLElBQUMsQ0FBQSxZQUFZLENBQUMsT0FBZCxDQUFBLEVBQWpFOztFQXpEWTs7RUE2RGIsTUFBQyxDQUFBLE1BQUQsQ0FBUSxVQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxHQUFHLENBQUM7SUFBUixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxHQUFnQjthQUNoQixJQUFDLENBQUEsY0FBYyxDQUFDLElBQWhCLEdBQXVCO0lBRm5CLENBREw7R0FERDs7RUFNQSxNQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUFSLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEdBQWE7YUFDYixJQUFDLENBQUEsV0FBVyxDQUFDLElBQWIsR0FBb0I7SUFGaEIsQ0FETDtHQUREOztFQU9BLE1BQUMsQ0FBQSxNQUFELENBQVEsVUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDO0lBQVIsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7TUFDSixJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsR0FBZ0I7YUFDaEIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxLQUFoQixHQUF3Qiw2QkFBQSxHQUE4QixLQUE5QixHQUFvQztJQUZ4RCxDQURMO0dBREQ7O0VBTUEsTUFBQyxDQUFBLE1BQUQsQ0FBUSxVQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxHQUFHLENBQUM7SUFBUixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxHQUFnQjthQUNoQixJQUFDLENBQUEsY0FBYyxDQUFDLElBQWhCLEdBQXVCO0lBRm5CLENBREw7R0FERDs7RUFNQSxNQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUFSLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLEdBQUcsQ0FBQyxTQUFMLEdBQWlCO2FBQ2pCLElBQUMsQ0FBQSxlQUFlLENBQUMsS0FBakIsR0FBeUIsNkJBQUEsR0FBOEIsS0FBOUIsR0FBb0M7SUFGekQsQ0FETDtHQUREOztFQU9BLE1BQUMsQ0FBQSxNQUFELENBQVEsV0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDO0lBQVIsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7TUFDSixJQUFDLENBQUEsR0FBRyxDQUFDLFNBQUwsR0FBaUI7YUFDakIsSUFBQyxDQUFBLGVBQWUsQ0FBQyxJQUFqQixHQUF3QjtJQUZwQixDQURMO0dBREQ7O0VBTUEsTUFBQyxDQUFBLE1BQUQsQ0FBUSxLQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxHQUFHLENBQUM7SUFBUixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUVKLElBQUMsQ0FBQSxHQUFHLENBQUMsR0FBTCxHQUFXO01BQ1gsSUFBQyxDQUFBLFNBQVMsQ0FBQyxXQUFYLENBQXVCLFlBQXZCLENBQW9DLENBQUMsSUFBckMsR0FBNEM7YUFDNUMsSUFBQyxDQUFBLFlBQVksQ0FBQyxJQUFkLEdBQXFCLElBQUMsQ0FBQSxTQUFTLENBQUMsQ0FBWCxHQUFlO0lBSmhDLENBREw7R0FERDs7RUFRQSxNQUFDLENBQUEsTUFBRCxDQUFRLFFBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUFSLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFELEdBQUEsQ0FETDtHQUREOztFQU1BLE1BQUMsQ0FBQSxNQUFELENBQVEsTUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDO0lBQVIsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFDSixJQUFDLENBQUEsZUFBRCxHQUFtQjtJQURmLENBREw7R0FERDs7OztHQWxIMkI7Ozs7QURBNUIsSUFBQTs7O0FBQU0sTUFBTSxDQUFDOzs7RUFDQyxvQkFBQyxHQUFEO0FBR1osUUFBQTtJQUhhLElBQUMsQ0FBQSxvQkFBRCxNQUFPO0lBR3BCLFVBQUEsR0FBYTtJQUViLElBQUMsQ0FBQSxVQUFELEdBQWMsVUFBVSxDQUFDLElBQVgsQ0FBQTtJQUNkLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixHQUNDO01BQUEsQ0FBQSxFQUFHLENBQUg7TUFBTSxDQUFBLEVBQUcsQ0FBVDs7SUFHRCw0Q0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxHQUFaLEVBQ0w7TUFBQSxNQUFBLEVBQVEsVUFBVSxDQUFDLE1BQW5CO01BQ0EsS0FBQSxFQUFPLFVBQVUsQ0FBQyxLQURsQjtLQURLLENBQU47SUFJQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxLQUFpQixNQUFwQjtNQUNDLGdCQUFBLENBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBdEIsRUFBOEIsSUFBOUIsRUFERDs7SUFHQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxLQUFnQixNQUFuQjtNQUNDLGFBQUEsQ0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQW5CLEVBQTBCLElBQTFCLEVBQTZCLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBbEMsRUFERDs7SUFJQSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBcUI7RUFyQlQ7Ozs7R0FEa0I7Ozs7QUREaEMsSUFBQSxTQUFBO0VBQUE7Ozs7QUFBQSxNQUFNLENBQUMsUUFBUCxHQUFrQjs7QUFDbEIsTUFBTSxDQUFDLFFBQVAsR0FBa0I7O0FBQ2xCLE1BQU0sQ0FBQyxZQUFQLEdBQXNCOztBQUN0QixNQUFNLENBQUMsV0FBUCxHQUFxQjs7QUFDckIsTUFBTSxDQUFDLFFBQVAsR0FBa0I7O0FBQ2xCLE1BQU0sQ0FBQyxXQUFQLEdBQXFCOztBQUNyQixNQUFNLENBQUMsVUFBUCxHQUFvQjs7QUFDcEIsTUFBTSxDQUFDLFNBQVAsR0FBbUI7O0FBRWIsTUFBTSxDQUFDOzs7RUFDQyxlQUFDLE9BQUQ7QUFDWixRQUFBOztNQURhLFVBQVE7Ozs7SUFDckIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLE1BQWpCO01BQ0EsS0FBQSxFQUFPLEdBRFA7TUFFQSxNQUFBLEVBQVEsRUFGUjtNQUdBLE9BQUEsRUFDQztRQUFBLElBQUEsRUFBTSxFQUFOO09BSkQ7TUFLQSxJQUFBLEVBQU0sbUJBTE47TUFNQSxRQUFBLEVBQVUsRUFOVjtNQU9BLFVBQUEsRUFBWSxHQVBaO0tBREQ7SUFVQSxJQUFHLE9BQU8sQ0FBQyxTQUFYOztZQUNnQixDQUFDLE1BQU87T0FEeEI7O0lBR0EsSUFBQyxDQUFBLGFBQUQsR0FBaUIsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkI7SUFDakIsSUFBQyxDQUFBLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBckIsR0FBZ0M7SUFFaEMsdUNBQU0sT0FBTjtJQUdBLElBQUMsQ0FBQSxXQUFELEdBQWU7SUFDZixJQUFDLENBQUEsWUFBRCxHQUFnQjtJQUNoQixJQUFDLENBQUEsY0FBRCxHQUFrQjtJQUdsQixJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsS0FBQSxDQUNaO01BQUEsZUFBQSxFQUFpQixhQUFqQjtNQUNBLElBQUEsRUFBTSxPQUROO01BRUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUZSO01BR0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUhUO01BSUEsTUFBQSxFQUFRLElBSlI7S0FEWTtJQVFiLElBQUcsSUFBQyxDQUFBLFNBQUo7TUFDQyxJQUFDLENBQUEsYUFBRCxHQUFpQixRQUFRLENBQUMsYUFBVCxDQUF1QixVQUF2QixFQURsQjs7SUFJQSxJQUFDLENBQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFoQixDQUE0QixJQUFDLENBQUEsYUFBN0I7SUFHQSxJQUFDLENBQUEsa0JBQUQsQ0FBb0IsSUFBcEI7SUFHQSxJQUFDLENBQUEsYUFBYSxDQUFDLFlBQWYsR0FBOEI7SUFDOUIsSUFBQyxDQUFBLGFBQWEsQ0FBQyxXQUFmLEdBQTZCO0lBQzdCLElBQUMsQ0FBQSxhQUFhLENBQUMsVUFBZixHQUE0QjtJQUk1QixJQUFDLENBQUEsYUFBYSxDQUFDLFNBQWYsR0FBMkIsT0FBQSxHQUFVLElBQUMsQ0FBQTtJQUd0QyxjQUFBLEdBQ0M7TUFBRSxNQUFELElBQUMsQ0FBQSxJQUFGO01BQVMsWUFBRCxJQUFDLENBQUEsVUFBVDtNQUFzQixVQUFELElBQUMsQ0FBQSxRQUF0QjtNQUFpQyxZQUFELElBQUMsQ0FBQSxVQUFqQztNQUE4QyxZQUFELElBQUMsQ0FBQSxVQUE5QztNQUEyRCxPQUFELElBQUMsQ0FBQSxLQUEzRDtNQUFtRSxpQkFBRCxJQUFDLENBQUEsZUFBbkU7TUFBcUYsT0FBRCxJQUFDLENBQUEsS0FBckY7TUFBNkYsUUFBRCxJQUFDLENBQUEsTUFBN0Y7TUFBc0csU0FBRCxJQUFDLENBQUEsT0FBdEc7TUFBZ0gsUUFBRCxJQUFDLENBQUEsTUFBaEg7O0FBRUQsU0FBQSwwQkFBQTs7TUFFQyxJQUFDLENBQUEsRUFBRCxDQUFJLFNBQUEsR0FBVSxRQUFkLEVBQTBCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxLQUFEO1VBRXpCLEtBQUMsQ0FBQSxZQUFZLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDLFdBQTFCLEdBQXdDO1VBRXhDLElBQVUsS0FBQyxDQUFBLGNBQVg7QUFBQSxtQkFBQTs7VUFDQSxLQUFDLENBQUEsa0JBQUQsQ0FBb0IsS0FBcEI7aUJBQ0EsS0FBQyxDQUFBLG9CQUFELENBQXNCLEtBQUMsQ0FBQSxHQUF2QixFQUE0QixLQUFDLENBQUEsS0FBN0I7UUFOeUI7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTFCO0FBRkQ7SUFZQSxJQUFDLENBQUEsZUFBRCxDQUFpQixJQUFDLENBQUEsSUFBbEI7SUFDQSxJQUFDLENBQUEsb0JBQUQsQ0FBc0IsSUFBQyxDQUFBLEdBQXZCLEVBQTRCLElBQUMsQ0FBQSxLQUE3QjtJQUdBLElBQUMsQ0FBQSxZQUFZLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDLFdBQTFCLEdBQXdDO0lBR3hDLElBQUMsQ0FBQSxVQUFELEdBQWM7SUFHZCxJQUFDLENBQUEsYUFBYSxDQUFDLE9BQWYsR0FBeUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLENBQUQ7O1VBRXhCLEtBQUMsQ0FBQSxhQUFjOztRQUdmLEtBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLFVBQWIsRUFBeUIsS0FBekI7ZUFFQSxLQUFDLENBQUEsVUFBRCxHQUFjO01BUFU7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBO0lBVXpCLElBQUMsQ0FBQSxhQUFhLENBQUMsTUFBZixHQUF3QixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsQ0FBRDtRQUN2QixLQUFDLENBQUEsSUFBRCxDQUFNLE1BQU0sQ0FBQyxTQUFiLEVBQXdCLEtBQXhCO2VBRUEsS0FBQyxDQUFBLFVBQUQsR0FBYztNQUhTO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtJQU14QixZQUFBLEdBQWU7SUFHZixJQUFDLENBQUEsYUFBYSxDQUFDLFNBQWYsR0FBMkIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLENBQUQ7UUFDMUIsWUFBQSxHQUFlLEtBQUMsQ0FBQTtRQUdoQixJQUFHLENBQUMsQ0FBQyxLQUFGLEtBQVcsRUFBZDtVQUNDLEtBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLFdBQWIsRUFBMEIsS0FBMUIsRUFERDs7UUFJQSxJQUFHLENBQUMsQ0FBQyxLQUFGLEtBQVcsRUFBZDtpQkFDQyxLQUFDLENBQUEsSUFBRCxDQUFNLE1BQU0sQ0FBQyxRQUFiLEVBQXVCLEtBQXZCLEVBREQ7O01BUjBCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtJQVczQixJQUFDLENBQUEsYUFBYSxDQUFDLE9BQWYsR0FBeUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLENBQUQ7UUFFeEIsSUFBRyxZQUFBLEtBQWtCLEtBQUMsQ0FBQSxLQUF0QjtVQUNDLEtBQUMsQ0FBQSxJQUFELENBQU0sY0FBTixFQUFzQixLQUFDLENBQUEsS0FBdkI7VUFDQSxLQUFDLENBQUEsSUFBRCxDQUFNLE1BQU0sQ0FBQyxXQUFiLEVBQTBCLEtBQUMsQ0FBQSxLQUEzQixFQUZEOztRQUtBLElBQUcsQ0FBQyxDQUFDLEtBQUYsS0FBVyxFQUFkO1VBQ0MsS0FBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsUUFBYixFQUF1QixLQUF2QixFQUREOztRQUlBLElBQUcsQ0FBQyxDQUFDLEtBQUYsS0FBVyxDQUFkO1VBQ0MsS0FBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsWUFBYixFQUEyQixLQUEzQixFQUREOztRQUlBLElBQUcsQ0FBQyxDQUFDLEtBQUYsS0FBVyxFQUFkO1VBQ0MsS0FBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsUUFBYixFQUF1QixLQUF2QixFQUREOztRQUlBLElBQUcsQ0FBQyxDQUFDLEtBQUYsS0FBVyxFQUFkO2lCQUNDLEtBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLFdBQWIsRUFBMEIsS0FBMUIsRUFERDs7TUFuQndCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtFQTNHYjs7a0JBaUliLGVBQUEsR0FBaUIsU0FBQyxJQUFEO1dBQ2hCLElBQUMsQ0FBQSxhQUFhLENBQUMsV0FBZixHQUE2QjtFQURiOztrQkFHakIsb0JBQUEsR0FBc0IsU0FBQyxFQUFELEVBQUssS0FBTDtXQUNyQixRQUFRLENBQUMsV0FBWSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQXhCLENBQWdDLFFBQUEsR0FBUyxFQUFULEdBQVksNkJBQTVDLEVBQTBFLFNBQUEsR0FBVSxLQUFwRjtFQURxQjs7a0JBR3RCLHNCQUFBLEdBQXdCLFNBQUE7QUFDdkIsUUFBQTtJQUFBLEtBQUEsR0FBUyxNQUFNLENBQUMsS0FBUCxHQUFlLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzdDLElBQUcsS0FBSyxDQUFDLFNBQU4sQ0FBQSxDQUFIO01BRUMsSUFBRyxLQUFBLEdBQVEsR0FBUixJQUFnQixLQUFBLEdBQVEsSUFBM0I7UUFDQyxHQUFBLEdBQU0sQ0FBQSxHQUFJLE1BRFg7T0FBQSxNQUdLLElBQUcsS0FBQSxLQUFTLElBQVo7UUFDSixHQUFBLEdBQU0sQ0FBQSxHQUFJLENBQUMsS0FBQSxHQUFRLENBQVQsRUFETjtPQUFBLE1BQUE7UUFJSixHQUFBLEdBQU0sS0FBSyxDQUFDLGdCQUFOLENBQUEsRUFKRjs7TUFLTCxJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBZCxLQUE0QixZQUEvQjtRQUNDLEdBQUEsR0FBTSxFQURQO09BVkQ7S0FBQSxNQUFBO01BY0MsSUFBRyxLQUFBLEdBQVEsR0FBUixJQUFnQixLQUFBLEdBQVEsSUFBM0I7UUFDQyxHQUFBLEdBQU0sQ0FBQSxHQUFJLE1BRFg7T0FBQSxNQUdLLElBQUcsS0FBQSxLQUFTLElBQVo7UUFDSixHQUFBLEdBQU0sQ0FBQSxHQUFJLENBQUMsS0FBQSxHQUFRLENBQVQsRUFETjtPQUFBLE1BR0EsSUFBRyxLQUFBLEtBQVMsR0FBWjtRQUNKLEdBQUEsR0FBTSxFQURGO09BcEJOOztBQXVCQSxXQUFPO0VBekJnQjs7a0JBMkJ4QixrQkFBQSxHQUFvQixTQUFDLEtBQUQ7QUFFbkIsUUFBQTtJQUFBLEdBQUEsR0FBTSxJQUFDLENBQUEsc0JBQUQsQ0FBQTtJQUVOLElBQUcsQ0FBSSxJQUFDLENBQUEsY0FBUjtNQUNDLElBQUMsQ0FBQSxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQXJCLEdBQWtDLEtBQUssQ0FBQztNQUN4QyxJQUFDLENBQUEsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFyQixHQUFrQyxDQUFDLEtBQUssQ0FBQyxRQUFOLEdBQWlCLEdBQWxCLENBQUEsR0FBc0I7TUFDeEQsSUFBQyxDQUFBLGFBQWEsQ0FBQyxLQUFLLENBQUMsVUFBckIsNENBQXFEO01BQ3JELElBQUMsQ0FBQSxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQXJCLEdBQW9DLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFkLEdBQW9CLENBQXBCLEdBQXdCLEdBQXpCLENBQUEsR0FBNkI7TUFDakUsSUFBQyxDQUFBLGFBQWEsQ0FBQyxLQUFLLENBQUMsWUFBckIsR0FBc0MsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQWQsR0FBdUIsQ0FBdkIsR0FBMkIsR0FBNUIsQ0FBQSxHQUFnQztNQUN0RSxJQUFDLENBQUEsYUFBYSxDQUFDLEtBQUssQ0FBQyxhQUFyQixHQUF1QyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBZCxHQUFzQixDQUF0QixHQUEwQixHQUEzQixDQUFBLEdBQStCO01BQ3RFLElBQUMsQ0FBQSxhQUFhLENBQUMsS0FBSyxDQUFDLFdBQXJCLEdBQXFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFkLEdBQXFCLENBQXJCLEdBQXlCLEdBQTFCLENBQUEsR0FBOEIsS0FQcEU7O0lBU0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBckIsR0FBZ0MsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFOLEdBQWMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFkLEdBQXFCLENBQXBDLENBQUEsR0FBeUMsQ0FBekMsR0FBNkMsR0FBOUMsQ0FBRCxHQUFvRDtJQUNuRixJQUFDLENBQUEsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFyQixHQUFnQyxDQUFDLEtBQUssQ0FBQyxNQUFOLEdBQWUsQ0FBZixHQUFtQixHQUFwQixDQUFBLEdBQXdCO0lBQ3hELElBQUMsQ0FBQSxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQXJCLEdBQStCO0lBQy9CLElBQUMsQ0FBQSxhQUFhLENBQUMsS0FBSyxDQUFDLGVBQXJCLEdBQXVDO0lBQ3ZDLElBQUMsQ0FBQSxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQXJCLEdBQThCO0lBQzlCLElBQUMsQ0FBQSxhQUFhLENBQUMsS0FBSyxDQUFDLGdCQUFyQixHQUF3QztJQUN4QyxJQUFDLENBQUEsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFyQixHQUE4QjtJQUM5QixJQUFDLENBQUEsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFyQixHQUFnQztXQUNoQyxJQUFDLENBQUEsYUFBYSxDQUFDLEtBQUssQ0FBQyxtQkFBckIsR0FBMkM7RUFyQnhCOztrQkF1QnBCLGtCQUFBLEdBQW9CLFNBQUMsS0FBRDtJQUNuQixJQUFDLENBQUEsV0FBRCxHQUFlO0lBQ2YsSUFBQyxDQUFBLFdBQVcsQ0FBQyxNQUFiLEdBQXNCO0lBQ3RCLElBQUMsQ0FBQSxXQUFXLENBQUMsSUFBYixHQUFvQjtJQUNwQixJQUFDLENBQUEsV0FBVyxDQUFDLENBQWIsR0FBaUIsSUFBQyxDQUFBLFdBQVcsQ0FBQyxDQUFiLEdBQWlCO0lBQ2xDLElBQUMsQ0FBQSxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQXRCLENBQWtDLElBQUMsQ0FBQSxhQUFuQztBQUVBLFdBQU8sSUFBQyxDQUFBO0VBUFc7O2tCQVNwQixtQkFBQSxHQUFxQixTQUFDLEtBQUQ7QUFFcEIsUUFBQTtJQUFBLElBQUMsQ0FBQSxjQUFELEdBQWtCO0lBQ2xCLElBQUMsQ0FBQSxhQUFhLENBQUMsU0FBZixHQUEyQixPQUFBLEdBQVUsS0FBSyxDQUFDO0lBQzNDLElBQUMsQ0FBQSxPQUFELEdBQVc7TUFBQSxJQUFBLEVBQU0sQ0FBTjtNQUFTLEdBQUEsRUFBSyxDQUFkOztJQUVYLElBQUMsQ0FBQSxlQUFELENBQWlCLEtBQUssQ0FBQyxJQUF2QjtJQUNBLElBQUMsQ0FBQSxrQkFBRCxDQUFvQixLQUFwQjtJQUNBLElBQUMsQ0FBQSxvQkFBRCxDQUFzQixLQUFLLENBQUMsRUFBNUIsRUFBZ0MsS0FBSyxDQUFDLEtBQXRDO0lBRUEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxjQUFKLEVBQW9CLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUNuQixLQUFDLENBQUEsb0JBQUQsQ0FBc0IsS0FBSyxDQUFDLEVBQTVCLEVBQWdDLEtBQUMsQ0FBQSxLQUFqQztNQURtQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBcEI7SUFJQSxLQUFLLENBQUMsT0FBTixHQUFnQjtJQUNoQixJQUFDLENBQUEsWUFBWSxDQUFDLFFBQVMsQ0FBQSxDQUFBLENBQUUsQ0FBQyxXQUExQixHQUF3QztJQUd4QyxHQUFBLEdBQU0sSUFBQyxDQUFBLHNCQUFELENBQUE7SUFDTixJQUFDLENBQUEsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFyQixHQUFrQyxDQUFDLEtBQUssQ0FBQyxRQUFOLEdBQWlCLENBQWpCLEdBQXFCLEdBQXRCLENBQUEsR0FBMEI7SUFDNUQsSUFBQyxDQUFBLGFBQWEsQ0FBQyxLQUFLLENBQUMsVUFBckIsR0FBb0MsQ0FBQyxLQUFLLENBQUMsQ0FBTixHQUFVLENBQVYsR0FBYyxHQUFmLENBQUEsR0FBbUI7SUFDdkQsSUFBQyxDQUFBLGFBQWEsQ0FBQyxLQUFLLENBQUMsV0FBckIsR0FBcUMsQ0FBQyxLQUFLLENBQUMsQ0FBTixHQUFVLENBQVYsR0FBYyxHQUFmLENBQUEsR0FBbUI7SUFDeEQsSUFBQyxDQUFBLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBckIsR0FBK0IsQ0FBQyxDQUFDLElBQUMsQ0FBQSxXQUFXLENBQUMsS0FBYixHQUFxQixLQUFLLENBQUMsQ0FBTixHQUFVLENBQWhDLENBQUEsR0FBcUMsQ0FBckMsR0FBeUMsR0FBMUMsQ0FBQSxHQUE4QztJQUU3RSxJQUFHLElBQUMsQ0FBQSxTQUFKO01BQ0MsSUFBQyxDQUFBLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBckIsR0FBZ0MsQ0FBQyxJQUFDLENBQUEsV0FBVyxDQUFDLE1BQWIsR0FBc0IsQ0FBdEIsR0FBMEIsR0FBM0IsQ0FBQSxHQUErQixLQURoRTs7SUFHQSxJQUFDLENBQUEsRUFBRCxDQUFJLGdCQUFKLEVBQXNCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUNyQixLQUFDLENBQUEsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFyQixHQUFvQyxDQUFDLEtBQUMsQ0FBQSxPQUFPLENBQUMsR0FBVCxHQUFlLENBQWYsR0FBbUIsR0FBcEIsQ0FBQSxHQUF3QjtlQUM1RCxLQUFDLENBQUEsYUFBYSxDQUFDLEtBQUssQ0FBQyxXQUFyQixHQUFxQyxDQUFDLEtBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQixDQUFoQixHQUFvQixHQUFyQixDQUFBLEdBQXlCO01BRnpDO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0QjtBQUlBLFdBQU8sSUFBQyxDQUFBO0VBL0JZOztrQkFpQ3JCLEtBQUEsR0FBTyxTQUFBO1dBQ04sSUFBQyxDQUFBLGFBQWEsQ0FBQyxLQUFmLENBQUE7RUFETTs7RUFHUCxLQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLGFBQWEsQ0FBQztJQUFsQixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUNKLElBQUMsQ0FBQSxhQUFhLENBQUMsS0FBZixHQUF1QjtJQURuQixDQURMO0dBREQ7O0VBS0EsS0FBQyxDQUFBLE1BQUQsQ0FBUSxZQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUNKLElBQUMsQ0FBQSxhQUFhLENBQUMsS0FBSyxDQUFDO0lBRGpCLENBQUw7SUFFQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQ0osSUFBQyxDQUFBLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBckIsR0FBNkI7SUFEekIsQ0FGTDtHQUREOztFQU1BLEtBQUMsQ0FBQSxNQUFELENBQVEsV0FBUixFQUFxQixLQUFDLENBQUEsY0FBRCxDQUFnQixXQUFoQixFQUE2QixLQUE3QixDQUFyQjs7RUFHQSxLQUFDLENBQUEsSUFBRCxHQUFRLFNBQUMsVUFBRCxFQUFhLFdBQWIsRUFBMEIsT0FBMUI7QUFDUCxXQUFPLFNBQUEsQ0FBYyxJQUFBLElBQUEsQ0FBRSxPQUFGLENBQWQsRUFBMEIsVUFBMUIsRUFBc0MsV0FBdEMsRUFBbUQsT0FBbkQ7RUFEQTs7a0JBR1IsVUFBQSxHQUFZLFNBQUMsRUFBRDtXQUFRLElBQUMsQ0FBQSxFQUFELENBQUksTUFBTSxDQUFDLFFBQVgsRUFBcUIsRUFBckI7RUFBUjs7a0JBQ1osVUFBQSxHQUFZLFNBQUMsRUFBRDtXQUFRLElBQUMsQ0FBQSxFQUFELENBQUksTUFBTSxDQUFDLFFBQVgsRUFBcUIsRUFBckI7RUFBUjs7a0JBQ1osY0FBQSxHQUFnQixTQUFDLEVBQUQ7V0FBUSxJQUFDLENBQUEsRUFBRCxDQUFJLE1BQU0sQ0FBQyxZQUFYLEVBQXlCLEVBQXpCO0VBQVI7O2tCQUNoQixhQUFBLEdBQWUsU0FBQyxFQUFEO1dBQVEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxNQUFNLENBQUMsV0FBWCxFQUF3QixFQUF4QjtFQUFSOztrQkFDZixVQUFBLEdBQVksU0FBQyxFQUFEO1dBQVEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxNQUFNLENBQUMsUUFBWCxFQUFxQixFQUFyQjtFQUFSOztrQkFDWixhQUFBLEdBQWUsU0FBQyxFQUFEO1dBQVEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxNQUFNLENBQUMsV0FBWCxFQUF3QixFQUF4QjtFQUFSOztrQkFDZixZQUFBLEdBQWMsU0FBQyxFQUFEO1dBQVEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxNQUFNLENBQUMsVUFBWCxFQUF1QixFQUF2QjtFQUFSOztrQkFDZCxXQUFBLEdBQWEsU0FBQyxFQUFEO1dBQVEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxNQUFNLENBQUMsU0FBWCxFQUFzQixFQUF0QjtFQUFSOzs7O0dBL1BhOztBQWlRM0IsU0FBQSxHQUFZLFNBQUMsUUFBRCxFQUFXLFVBQVgsRUFBdUIsV0FBdkI7QUFDWCxNQUFBO0VBQUEsSUFBRyxDQUFJLENBQUMsVUFBQSxZQUFzQixLQUF2QixDQUFQO0FBQ0MsVUFBVSxJQUFBLEtBQUEsQ0FBTSx3Q0FBTixFQURYOztFQUdBLElBQUcsQ0FBSSxDQUFDLFdBQUEsWUFBdUIsU0FBeEIsQ0FBUDtBQUNDLFVBQVUsSUFBQSxLQUFBLENBQU0sa0NBQU4sRUFEWDs7RUFHQSxLQUFBLEdBQVE7O0lBRVIsS0FBSyxDQUFDLHVCQUF3Qjs7O09BQ0osQ0FBRSxJQUE1QixHQUFtQyxRQUFRLENBQUMsV0FBVyxDQUFDOztFQUV4RCxLQUFLLENBQUMsS0FBTixHQUFjLFVBQVUsQ0FBQztFQUN6QixLQUFLLENBQUMsTUFBTixHQUFlLFVBQVUsQ0FBQztFQUMxQixLQUFLLENBQUMsS0FBTixHQUFjLFVBQVUsQ0FBQztFQUV6QixLQUFLLENBQUMsa0JBQU4sQ0FBeUIsVUFBekI7RUFDQSxLQUFLLENBQUMsbUJBQU4sQ0FBMEIsV0FBMUI7QUFFQSxTQUFPO0FBbkJJOzs7O0FEMVFaLElBQUE7OztBQUFNLE1BQU0sQ0FBQztBQUVaLE1BQUE7Ozs7RUFBQSxPQUFBLEdBQVU7O0VBRUcsaUJBQUMsSUFBRDtBQUNaLFFBQUE7SUFEYSxJQUFDLENBQUEscUJBQUQsT0FBSztJQUNsQixHQUFBLEdBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsR0FBWixFQUNMO01BQUEsS0FBQSxFQUFPLE9BQU8sQ0FBQyxLQUFmO01BQ0EsTUFBQSxFQUFRLE9BQU8sQ0FBQyxNQURoQjtNQUVBLGVBQUEsRUFBaUIsT0FBTyxDQUFDLGVBRnpCO0tBREs7SUFJTix5Q0FBTSxHQUFOO0lBRUEsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsS0FBaUIsTUFBcEI7TUFDQyxnQkFBQSxDQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQXRCLEVBQThCLElBQTlCLEVBREQ7O0lBR0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsS0FBZ0IsTUFBbkI7TUFDQyxhQUFBLENBQWMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFuQixFQUEwQixJQUExQixFQUE2QixJQUFDLENBQUEsR0FBRyxDQUFDLENBQWxDLEVBREQ7O0VBVlk7Ozs7R0FKZTs7OztBRFc3QixJQUFBOzs7QUFBTSxNQUFNLENBQUM7OztFQUNDLGtCQUFDLEdBQUQ7QUFFWixRQUFBO0lBRmEsSUFBQyxDQUFBLG9CQUFELE1BQU87SUFFcEIsVUFBQSxHQUFhO0lBQ2IsZUFBQSxHQUFrQjtJQUdsQixJQUFDLENBQUEsVUFBRCxHQUFjLFVBQVUsQ0FBQyxXQUFYLENBQXVCLE1BQXZCLENBQThCLENBQUMsSUFBL0IsQ0FBQTtJQUNkLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixHQUNDO01BQUEsVUFBQSxFQUFZLElBQVo7O0lBRUQsSUFBQyxDQUFBLFVBQUQsR0FBYyxVQUFVLENBQUMsV0FBWCxDQUF1QixNQUF2QixDQUE4QixDQUFDLElBQS9CLENBQUE7SUFFZCxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUk7SUFDbEIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLEdBQW9CLGNBQWMsQ0FBQyxXQUFmLENBQTJCLE1BQTNCLENBQWtDLENBQUM7QUFFdkQsWUFBQSxLQUFBO0FBQUEsV0FFTSxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsS0FBZ0IsUUFGdEI7UUFHRSxJQUFDLENBQUEsV0FBRCxHQUFlLElBQUk7UUFDbkIsSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFiLEdBQXFCLFVBQVUsQ0FBQyxXQUFYLENBQXVCLE1BQXZCLENBQThCLENBQUM7QUFGaEQ7QUFGTixXQU1PLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxLQUFjLFFBTnJCO1FBT0UsSUFBQyxDQUFBLFdBQUQsR0FBbUIsSUFBQSxTQUFBLENBQ2xCO1VBQUEsSUFBQSxFQUFNLElBQU47VUFDQSxDQUFBLEVBQUcsZ0JBQWdCLENBQUMsV0FBakIsQ0FBNkIsUUFBN0IsQ0FBc0MsQ0FBQyxDQUQxQztVQUVBLENBQUEsRUFBRyxnQkFBZ0IsQ0FBQyxXQUFqQixDQUE2QixRQUE3QixDQUFzQyxDQUFDLENBRjFDO1NBRGtCO0FBUHJCO0FBWUEsWUFBQSxLQUFBO0FBQUEsV0FFTSxJQUFDLENBQUEsR0FBRyxDQUFDLE9BQUwsS0FBa0IsTUFGeEI7UUFHRSxJQUFDLENBQUEsYUFBRCxHQUFpQixVQUFVLENBQUMsV0FBWCxDQUF1QixNQUF2QixDQUE4QixDQUFDLElBQS9CLENBQUE7UUFDakIsSUFBQyxDQUFBLGFBQWEsQ0FBQyxDQUFmLEdBQW1CO0FBSnJCO0lBT0EsMENBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsR0FBWixFQUNMO01BQUEsTUFBQSxFQUFRLFVBQVUsQ0FBQyxNQUFuQjtNQUNBLEtBQUEsRUFBTyxVQUFVLENBQUMsS0FEbEI7TUFFQSxlQUFBLEVBQWlCLFVBQVUsQ0FBQyxlQUY1QjtLQURLLENBQU47SUFNQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxLQUFpQixNQUFwQjtNQUNDLGdCQUFBLENBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBdEIsRUFBOEIsSUFBOUIsRUFERDs7SUFHQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxLQUFnQixNQUFuQjtNQUNDLGFBQUEsQ0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQW5CLEVBQTBCLElBQTFCLEVBQTZCLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBbEMsRUFERDs7SUFNQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxLQUFlLEtBQWxCO01BQTZCLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixHQUFxQixLQUFsRDtLQUFBLE1BQUE7TUFBeUQsSUFBQyxDQUFBLFVBQVUsQ0FBQyxPQUFaLENBQUEsRUFBekQ7O0lBQ0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsS0FBZ0IsTUFBaEIsSUFBOEIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEtBQWdCLEtBQWpEO01BQTRELElBQUMsQ0FBQSxXQUFXLENBQUMsTUFBYixHQUFzQixLQUFsRjtLQUFBLE1BQUE7TUFBeUYsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUFiLENBQUEsRUFBekY7O0lBQ0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsS0FBZSxNQUFsQjtNQUFpQyxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBcUIsS0FBdEQ7S0FBQSxNQUFBO01BQTZELElBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixDQUFBLEVBQTdEOztJQUNBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxPQUFMLEtBQWtCLE1BQXJCO01BQW9DLElBQUMsQ0FBQSxhQUFhLENBQUMsTUFBZixHQUF3QixLQUE1RDs7SUFFQSxXQUFBLENBQVksSUFBWixFQUFlLENBQUMsSUFBQyxDQUFBLFVBQUYsQ0FBZjtBQUdBLFlBQU8sSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFaO0FBQUEsV0FDTSxNQUROO1FBRUUsSUFBQyxDQUFBLE1BQUQsR0FBVTtRQUVWLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixHQUNDO1VBQUEsVUFBQSxFQUFZLGVBQWUsQ0FBQyxXQUFoQixDQUE0QixNQUE1QixDQUFtQyxDQUFDLFVBQWhEO1VBQ0EsUUFBQSxFQUFVLGVBQWUsQ0FBQyxXQUFoQixDQUE0QixNQUE1QixDQUFtQyxDQUFDLFFBRDlDO1VBRUEsQ0FBQSxFQUFHLGVBQWUsQ0FBQyxXQUFoQixDQUE0QixNQUE1QixDQUFtQyxDQUFDLENBRnZDOztRQUlELElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixHQUNDO1VBQUEsQ0FBQSxFQUFHLGVBQWUsQ0FBQyxXQUFoQixDQUE0QixNQUE1QixDQUFtQyxDQUFDLENBQXZDOztRQUVELElBQUMsQ0FBQSxVQUFVLENBQUMsQ0FBWixHQUFnQixLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsQ0FBZDtRQUNoQixJQUFDLENBQUEsV0FBVyxDQUFDLENBQWIsR0FBaUIsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLENBQWQ7QUFaYjtBQUROO1FBZUUsSUFBQyxDQUFBLE1BQUQsR0FBVSxVQUFVLENBQUM7QUFmdkI7RUF6RFk7O0VBNkViLFFBQUMsQ0FBQSxNQUFELENBQVEsTUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDO0lBQVIsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7TUFDSixJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsR0FBWTthQUNaLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixHQUFtQjtJQUZmLENBREw7R0FERDs7RUFNQSxRQUFDLENBQUEsTUFBRCxDQUFRLE1BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUFSLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBRyxLQUFBLEdBQVEsV0FBWDtRQUNDLElBQUMsQ0FBQSxVQUFVLENBQUMsQ0FBWixHQUFnQjtlQUNoQixJQUFDLENBQUEsVUFBVSxDQUFDLEtBQVosR0FBb0IsTUFBTSxDQUFDLE1BRjVCOztJQURJLENBREw7R0FERDs7RUFPQSxRQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUFSLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBRyxLQUFBLEtBQVMsV0FBWjtRQUNDLElBQUMsQ0FBQSxhQUFhLENBQUMsQ0FBZixHQUFtQjtlQUNuQixJQUFDLENBQUEsYUFBYSxDQUFDLEtBQWYsR0FBdUIsTUFBTSxDQUFDLE1BRi9COztJQURJLENBREw7R0FERDs7RUFPQSxRQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUFSLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEdBQWE7YUFDYixJQUFDLENBQUEsV0FBVyxDQUFDLEtBQWIsR0FBcUIsNkJBQUEsR0FBOEIsS0FBOUIsR0FBb0M7SUFGckQsQ0FETDtHQUREOztFQU1BLFFBQUMsQ0FBQSxNQUFELENBQVEsTUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDO0lBQVIsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7TUFDSixJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsR0FBWTtNQUNaLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixHQUFvQiw2QkFBQSxHQUE4QixLQUE5QixHQUFvQzthQUN4RCxJQUFDLENBQUEsVUFBVSxDQUFDLENBQVosR0FBZ0IsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLEdBQW1CO0lBSC9CLENBREw7R0FERDs7OztHQXhHNkI7Ozs7QURWOUIsSUFBQTs7O0FBQU0sTUFBTSxDQUFDO0FBRVosTUFBQTs7OztFQUFBLFNBQUEsR0FBWTs7RUFFWixxQkFBQSxHQUF3QixTQUFTLENBQUMsV0FBVixDQUFzQixPQUF0QixDQUE4QixDQUFDLENBQS9CLEdBQW1DLGlCQUFpQixDQUFDLFdBQWxCLENBQThCLGFBQTlCLENBQTRDLENBQUM7O0VBQ3hHLGdCQUFBLEdBQW1CLFNBQVMsQ0FBQyxNQUFWLEdBQW1CLFNBQVMsQ0FBQyxXQUFWLENBQXNCLE9BQXRCLENBQThCLENBQUM7O0VBRXhELHlCQUFDLEdBQUQ7QUFHWixRQUFBO0lBSGEsSUFBQyxDQUFBLG9CQUFELE1BQU87SUFHcEIsSUFBQyxDQUFBLFdBQUQsR0FBZSxTQUFTLENBQUMsV0FBVixDQUFzQixPQUF0QixDQUE4QixDQUFDLElBQS9CLENBQUE7SUFDZixJQUFDLENBQUEsV0FBVyxDQUFDLEtBQWIsR0FDQztNQUFBLFVBQUEsRUFBWSxJQUFaOztJQUdELElBQUMsQ0FBQSxZQUFELEdBQWdCLFNBQVMsQ0FBQyxXQUFWLENBQXNCLFFBQXRCLENBQStCLENBQUMsSUFBaEMsQ0FBQTtJQUNoQixJQUFDLENBQUEsWUFBWSxDQUFDLEtBQWQsR0FDQztNQUFBLFVBQUEsRUFBWSxJQUFaOztJQUdELElBQUMsQ0FBQSxXQUFELEdBQWUsU0FBUyxDQUFDLFdBQVYsQ0FBc0IsT0FBdEIsQ0FBOEIsQ0FBQyxJQUEvQixDQUFBO0lBQ2YsSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFiLEdBRUM7TUFBQSxhQUFBLEVBQWUsV0FBZjtNQUNBLFVBQUEsRUFBWSxnREFEWjtNQUVBLFVBQUEsRUFBWSxJQUZaOztJQUdELFNBQUEsR0FBWSxJQUFDLENBQUEsV0FBVyxDQUFDO0lBR3pCLElBQUMsQ0FBQSxpQkFBRCxHQUFxQixTQUFTLENBQUMsV0FBVixDQUFzQixhQUF0QixDQUFvQyxDQUFDLElBQXJDLENBQUE7SUFDckIsSUFBQyxDQUFBLGlCQUFpQixDQUFDLEtBQW5CLEdBQ0M7TUFBQSxVQUFBLEVBQVksSUFBWjtNQUVBLENBQUEsRUFBRyxJQUFDLENBQUEsV0FBVyxDQUFDLElBRmhCO01BR0EsVUFBQSxFQUFZLFNBSFo7O0lBTUQsSUFBQyxDQUFBLFdBQUQsR0FBZSxTQUFTLENBQUMsV0FBVixDQUFzQixPQUF0QixDQUE4QixDQUFDLElBQS9CLENBQUE7SUFDZixJQUFDLENBQUEsV0FBVyxDQUFDLEtBQWIsR0FDQztNQUFBLFVBQUEsRUFBWSxJQUFaO01BQ0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxJQUFuQixHQUEwQixxQkFEN0I7O0lBSUQsSUFBQyxDQUFBLFVBQUQsR0FBYyxTQUFTLENBQUMsV0FBVixDQUFzQixNQUF0QixDQUE2QixDQUFDLElBQTlCLENBQUE7SUFDZCxJQUFDLENBQUEsVUFBVSxDQUFDLFdBQVosQ0FBd0IsY0FBeEIsQ0FBdUMsQ0FBQyxPQUF4QyxDQUFBO0lBQ0EsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLEdBQ0M7TUFBQSxLQUFBLEVBQU8seUNBQVA7TUFDQSxPQUFBLEVBQVMsR0FEVDs7SUFHRCxlQUFBLENBQWdCLElBQUMsQ0FBQSxVQUFqQjtJQUdBLGlEQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLEdBQVosRUFDTDtNQUFBLEtBQUEsRUFBTyxTQUFTLENBQUMsS0FBakI7TUFDQSxNQUFBLEVBQVEsU0FBUyxDQUFDLE1BRGxCO01BRUEsZUFBQSxFQUFpQixTQUFTLENBQUMsZUFGM0I7S0FESyxDQUFOO0lBTUEsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsS0FBaUIsTUFBcEI7TUFDQyxnQkFBQSxDQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQXRCLEVBQThCLElBQTlCLEVBREQ7O0lBR0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsS0FBZ0IsTUFBbkI7TUFDQyxhQUFBLENBQWMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFuQixFQUEwQixJQUExQixFQUE2QixJQUFDLENBQUEsR0FBRyxDQUFDLENBQWxDLEVBREQ7O0lBSUEsV0FBQSxDQUFZLElBQVosRUFBZSxDQUFDLElBQUMsQ0FBQSxXQUFGLEVBQWUsSUFBQyxDQUFBLFlBQWhCLEVBQThCLElBQUMsQ0FBQSxXQUEvQixFQUE0QyxJQUFDLENBQUEsaUJBQTdDLEVBQWdFLElBQUMsQ0FBQSxXQUFqRSxFQUE4RSxJQUFDLENBQUEsVUFBL0UsQ0FBZjtFQTFEWTs7RUE4RGIsZUFBQSxHQUFrQixTQUFDLEtBQUQ7V0FDakIsS0FBSyxDQUFDLEtBQU4sQ0FBWSxTQUFBO01BQ1gsSUFBRyxJQUFDLENBQUEsT0FBRCxHQUFXLENBQWQ7ZUFDQyxJQUFDLENBQUEsT0FBRCxDQUNDO1VBQUEsT0FBQSxFQUFTLENBQVQ7VUFDQSxPQUFBLEVBQVM7WUFBQSxJQUFBLEVBQU0sR0FBTjtXQURUO1NBREQsRUFERDtPQUFBLE1BQUE7ZUFLQyxJQUFDLENBQUEsT0FBRCxDQUNDO1VBQUEsT0FBQSxFQUFTLEdBQVQ7VUFDQSxPQUFBLEVBQVM7WUFBQSxJQUFBLEVBQU0sR0FBTjtXQURUO1NBREQsRUFMRDs7SUFEVyxDQUFaO0VBRGlCOztFQVlsQixlQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUFSLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEdBQWE7YUFDYixJQUFDLENBQUEsV0FBVyxDQUFDLEtBQWIsR0FBcUI7SUFGakIsQ0FETDtHQUREOztFQU1BLGVBQUMsQ0FBQSxNQUFELENBQVEsUUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDO0lBQVIsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7TUFDSixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsR0FBYzthQUNkLElBQUMsQ0FBQSxZQUFZLENBQUMsSUFBZCxHQUFxQjtJQUZqQixDQURMO0dBREQ7O0VBTUEsZUFBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxHQUFHLENBQUM7SUFBUixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxHQUFhO01BQ2IsSUFBQyxDQUFBLFdBQVcsQ0FBQyxJQUFiLEdBQW9CO01BRXBCLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxDQUFuQixHQUF1QixJQUFDLENBQUEsV0FBVyxDQUFDO2FBQ3BDLElBQUMsQ0FBQSxXQUFXLENBQUMsQ0FBYixHQUFpQixJQUFDLENBQUEsaUJBQWlCLENBQUMsSUFBbkIsR0FBMEI7SUFMdkMsQ0FETDtHQUREOztFQVNBLGVBQUMsQ0FBQSxNQUFELENBQVEsYUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDO0lBQVIsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7TUFDSixJQUFHLEtBQUEsS0FBUyxLQUFULElBQWtCLEVBQXJCO1FBQ0MsSUFBQyxDQUFBLGlCQUFpQixDQUFDLE1BQW5CLEdBQTRCO2VBQzVCLElBQUMsQ0FBQSxXQUFXLENBQUMsQ0FBYixHQUFpQixJQUFDLENBQUEsaUJBQWlCLENBQUMsSUFBbkIsR0FBMEIsc0JBRjVDO09BQUEsTUFBQTtRQUlDLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxHQUFtQjtRQUNuQixJQUFDLENBQUEsaUJBQWlCLENBQUMsSUFBbkIsR0FBMEI7ZUFFMUIsSUFBQyxDQUFBLFdBQVcsQ0FBQyxDQUFiLEdBQWlCLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxJQUFuQixHQUEwQixzQkFQNUM7O0lBREksQ0FETDtHQUREOztFQVlBLGVBQUMsQ0FBQSxNQUFELENBQVEsT0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDO0lBQVIsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7TUFDSixJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsR0FBYTthQUNiLElBQUMsQ0FBQSxXQUFXLENBQUMsSUFBYixHQUFvQjtJQUZoQixDQURMO0dBREQ7O0VBTUEsZUFBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxHQUFHLENBQUM7SUFBUixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxHQUFZLDZCQUFBLEdBQThCLEtBQTlCLEdBQW9DO01BQ2hELElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixHQUFvQiw2QkFBQSxHQUE4QixLQUE5QixHQUFvQzthQUN4RCxlQUFBLENBQWdCLElBQUMsQ0FBQSxVQUFqQjtJQUhJLENBREw7R0FERDs7OztHQXhIb0M7Ozs7O0FERHJDOzs7Ozs7OztBQUFBLElBQUE7OztBQVVNLE1BQU0sQ0FBQzs7O0VBQ0MseUJBQUMsSUFBRDtBQUNaLFFBQUE7SUFEYSxJQUFDLENBQUEscUJBQUQsT0FBTztJQUNwQixHQUFBLEdBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsR0FBWixFQUNOLGtEQUFBLFNBQUEsQ0FETTtJQUdOLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEtBQWlCLE1BQXBCO01BQ0MsZ0JBQUEsQ0FBaUIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUF0QixFQUE4QixJQUE5QixFQUREOztJQUdBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEtBQWdCLE1BQW5CO01BQ0MsYUFBQSxDQUFjLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBbkIsRUFBMEIsSUFBMUIsRUFBNkIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUFsQyxFQUREOztJQUdBLElBQUMsQ0FBQSxJQUFELEdBQVksSUFBQSxLQUFBLENBQ1g7TUFBQSxlQUFBLEVBQXFCLElBQUEsS0FBQSxDQUFNLGFBQU4sQ0FBckI7TUFDQSxJQUFBLEVBQU0saUJBRE47S0FEVztJQUlaLElBQUMsQ0FBQSxTQUFELEdBQWE7QUFFYixTQUFTLG9HQUFUO01BQ0MsSUFBQyxDQUFBLFFBQUQsR0FBZ0IsSUFBQSxRQUFBLENBQ2Y7UUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLElBQVQ7UUFDQSxJQUFBLEVBQU0sSUFBQyxDQUFBLEdBQUcsQ0FBQyxXQUFZLENBQUEsQ0FBQSxDQUFFLENBQUMsSUFEMUI7UUFFQSxLQUFBLEVBQU8sV0FGUDtPQURlO01BSWhCLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQWpCLEdBQ0M7UUFBQSxLQUFBLEVBQU8sVUFBUDs7TUFDRCxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFqQixHQUNDO1FBQUEsS0FBQSxFQUFPLFdBQVA7O01BQ0QsSUFBQyxDQUFBLFFBQVEsQ0FBQyxDQUFWLEdBQWMsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFWLEdBQW1CO01BQ2pDLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxXQUFZLENBQUEsQ0FBQSxDQUFFLENBQUMsRUFBcEIsS0FBMEIsSUFBN0I7UUFDQyxJQUFDLENBQUEsUUFBUSxDQUFDLFdBQVYsQ0FBc0IsSUFBdEIsRUFERDs7TUFHQSxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsQ0FBZ0IsSUFBQyxDQUFBLFFBQWpCO01BRUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxLQUFWLENBQWdCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxLQUFELEVBQVEsS0FBUjtBQUNmLGNBQUE7QUFBQSxlQUFTLG9HQUFUO1lBQ0MsS0FBQyxDQUFBLFNBQVUsQ0FBQSxDQUFBLENBQUUsQ0FBQyxXQUFkLENBQTBCLEtBQTFCO0FBREQ7aUJBRUEsS0FBSyxDQUFDLFdBQU4sQ0FBa0IsSUFBbEI7UUFIZTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEI7QUFmRDtJQW1CQSxJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sR0FBZSxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQVgsR0FBb0IsSUFBQyxDQUFBLFFBQVEsQ0FBQztJQUU3QyxJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sR0FBZTtJQUNmLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLElBQUksQ0FBQztFQXRDSjs7OztHQUR1Qjs7OztBRFRyQyxJQUFBOzs7QUFBTSxNQUFNLENBQUM7OztFQUNDLG1CQUFDLEdBQUQ7QUFHWixRQUFBO0lBSGEsSUFBQyxDQUFBLG9CQUFELE1BQU87SUFHcEIsVUFBQSxHQUFhO0lBRWIsSUFBQyxDQUFBLFVBQUQsR0FBYyxVQUFVLENBQUMsV0FBWCxDQUF1QixNQUF2QixDQUE4QixDQUFDLElBQS9CLENBQUE7SUFHZCwyQ0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxHQUFaLEVBQ0w7TUFBQSxNQUFBLEVBQVEsVUFBVSxDQUFDLE1BQW5CO01BQ0EsS0FBQSxFQUFPLFVBQVUsQ0FBQyxLQURsQjtNQUVBLGVBQUEsRUFBaUIsVUFBVSxDQUFDLGVBRjVCO0tBREssQ0FBTjtJQUtBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEtBQWlCLE1BQXBCO01BQ0MsZ0JBQUEsQ0FBaUIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUF0QixFQUE4QixJQUE5QixFQUREOztJQUdBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEtBQWdCLE1BQW5CO01BQ0MsYUFBQSxDQUFjLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBbkIsRUFBMEIsSUFBMUIsRUFBNkIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUFsQyxFQUREOztJQUlBLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixHQUFxQjtFQXBCVDs7RUF3QmIsU0FBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxHQUFHLENBQUM7SUFBUixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxHQUFZO2FBQ1osSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLEdBQW1CO0lBRmYsQ0FETDtHQUREOzs7O0dBekI4Qjs7OztBREEvQixJQUFBOzs7QUFBTSxNQUFNLENBQUM7OztFQUNDLHFCQUFDLEdBQUQ7QUFHWixRQUFBO0lBSGEsSUFBQyxDQUFBLG9CQUFELE1BQU87SUFHcEIsZUFBQSxHQUFrQjtJQUVsQixJQUFDLENBQUEsZUFBRCxHQUFtQixlQUFlLENBQUMsSUFBaEIsQ0FBQTtJQUNuQixJQUFDLENBQUEsZUFBZSxDQUFDLEtBQWpCLEdBQ0M7TUFBQSxDQUFBLEVBQUcsQ0FBSDtNQUFNLENBQUEsRUFBRyxDQUFUOztJQUdELDZDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLEdBQVosRUFDTDtNQUFBLE1BQUEsRUFBUSxlQUFlLENBQUMsTUFBeEI7TUFDQSxLQUFBLEVBQU8sZUFBZSxDQUFDLEtBRHZCO0tBREssQ0FBTjtJQUlBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEtBQWlCLE1BQXBCO01BQ0MsZ0JBQUEsQ0FBaUIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUF0QixFQUE4QixJQUE5QixFQUREOztJQUdBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEtBQWdCLE1BQW5CO01BQ0MsYUFBQSxDQUFjLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBbkIsRUFBMEIsSUFBMUIsRUFBNkIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUFsQyxFQUREOztJQUlBLElBQUMsQ0FBQSxlQUFlLENBQUMsTUFBakIsR0FBMEI7RUFyQmQ7Ozs7R0FEbUI7Ozs7QURBakMsSUFBQTs7O0FBQU0sTUFBTSxDQUFDOzs7RUFDQyxrQkFBQyxHQUFEO0FBR1osUUFBQTtJQUhhLElBQUMsQ0FBQSxvQkFBRCxNQUFPO0lBR3BCLFVBQUEsR0FBYTtJQUViLElBQUMsQ0FBQSxjQUFELEdBQWtCLFVBQVUsQ0FBQyxJQUFYLENBQUE7SUFDbEIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxLQUFoQixHQUNDO01BQUEsQ0FBQSxFQUFHLENBQUg7TUFBTSxDQUFBLEVBQUcsQ0FBVDs7SUFHRCwwQ0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxHQUFaLEVBQ0w7TUFBQSxNQUFBLEVBQVEsVUFBVSxDQUFDLE1BQW5CO01BQ0EsS0FBQSxFQUFPLFVBQVUsQ0FBQyxLQURsQjtLQURLLENBQU47SUFJQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxLQUFpQixNQUFwQjtNQUNDLGdCQUFBLENBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBdEIsRUFBOEIsSUFBOUIsRUFERDs7SUFHQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxLQUFnQixNQUFuQjtNQUNDLGFBQUEsQ0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQW5CLEVBQTBCLElBQTFCLEVBQTZCLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBbEMsRUFERDs7SUFJQSxJQUFDLENBQUEsY0FBYyxDQUFDLE1BQWhCLEdBQXlCO0VBckJiOzs7O0dBRGdCOzs7O0FEQTlCLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O0VBQ0MsbUJBQUMsR0FBRDtBQUdaLFFBQUE7SUFIYSxJQUFDLENBQUEsb0JBQUQsTUFBTztJQUdwQixVQUFBLEdBQWE7SUFFYixJQUFDLENBQUEsVUFBRCxHQUFjLFVBQVUsQ0FBQyxXQUFYLENBQXVCLE1BQXZCLENBQThCLENBQUMsSUFBL0IsQ0FBQTtJQUdkLDJDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLEdBQVosRUFDTDtNQUFBLE1BQUEsRUFBUSxVQUFVLENBQUMsTUFBbkI7TUFDQSxLQUFBLEVBQU8sVUFBVSxDQUFDLEtBRGxCO01BRUEsZUFBQSxFQUFpQixVQUFVLENBQUMsZUFGNUI7S0FESyxDQUFOO0lBS0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsS0FBaUIsTUFBcEI7TUFDQyxnQkFBQSxDQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQXRCLEVBQThCLElBQTlCLEVBREQ7O0lBR0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsS0FBZ0IsTUFBbkI7TUFDQyxhQUFBLENBQWMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFuQixFQUEwQixJQUExQixFQUE2QixJQUFDLENBQUEsR0FBRyxDQUFDLENBQWxDLEVBREQ7O0lBSUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLEdBQXFCO0VBcEJUOztFQXdCYixTQUFDLENBQUEsTUFBRCxDQUFRLE1BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUFSLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLEdBQVk7YUFDWixJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosR0FBbUI7SUFGZixDQURMO0dBREQ7Ozs7R0F6QjhCOzs7O0FEQS9CLElBQUE7OztBQUFNLE1BQU0sQ0FBQztBQUVaLE1BQUE7Ozs7RUFBQSxXQUFBLEdBQWM7O0VBQ2QsU0FBQSxHQUFZLFdBQVcsQ0FBQyxXQUFaLENBQXdCLE9BQXhCOztFQUNaLGVBQUEsR0FBa0IsV0FBVyxDQUFDLFdBQVosQ0FBd0IsbUJBQXhCOztFQUNsQixTQUFBLEdBQVksV0FBVyxDQUFDLFdBQVosQ0FBd0IsT0FBeEI7O0VBRVoscUJBQUEsR0FBd0IsZUFBZSxDQUFDLENBQWhCLEdBQW9CLFNBQVMsQ0FBQzs7RUFDdEQscUJBQUEsR0FBd0IsU0FBUyxDQUFDLENBQVYsR0FBYyxlQUFlLENBQUM7O0VBRXpDLHFCQUFDLElBQUQ7QUFDWixRQUFBO0lBRGEsSUFBQyxDQUFBLHFCQUFELE9BQU87SUFDcEIsR0FBQSxHQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLEdBQVosRUFDTDtNQUFBLEtBQUEsRUFBTyxXQUFXLENBQUMsS0FBbkI7TUFDQSxNQUFBLEVBQVEsV0FBVyxDQUFDLE1BRHBCO01BRUEsZUFBQSxFQUFpQixPQUZqQjtNQUdBLEtBQUEsRUFBTyxxREFIUDtNQUlBLFNBQUEsRUFBVyxTQUFTLENBQUMsSUFKckI7TUFLQSxlQUFBLEVBQWlCLGVBQWUsQ0FBQyxJQUxqQztNQU1BLFNBQUEsRUFBVyxTQUFTLENBQUMsSUFOckI7S0FESztJQVFOLDZDQUFNLEdBQU47SUFFQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxLQUFpQixNQUFwQjtNQUNDLGdCQUFBLENBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBdEIsRUFBOEIsSUFBOUIsRUFERDs7SUFHQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxLQUFnQixNQUFuQjtNQUNDLGFBQUEsQ0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQW5CLEVBQTBCLElBQTFCLEVBQTZCLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBbEMsRUFERDs7SUFJQSxJQUFDLENBQUEsYUFBRCxHQUFpQixXQUFXLENBQUMsV0FBWixDQUF3QixpQkFBeEIsQ0FBMEMsQ0FBQyxJQUEzQyxDQUFBO0lBQ2pCLElBQUMsQ0FBQSxhQUFhLENBQUMsS0FBZixHQUNDO01BQUEsTUFBQSxFQUFRLElBQVI7O0lBRUQsSUFBQyxDQUFBLGFBQWEsQ0FBQyxXQUFmLENBQTJCLE9BQTNCLENBQW1DLENBQUMsS0FBcEMsR0FDQztNQUFBLEtBQUEsRUFDQztRQUFBLGdCQUFBLEVBQWtCLFVBQWxCO09BREQ7TUFFQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUZaOztJQUtELElBQUMsQ0FBQSxRQUFELEdBQVksV0FBVyxDQUFDLFdBQVosQ0FBd0IsY0FBeEIsQ0FBdUMsQ0FBQyxJQUF4QyxDQUFBO0lBQ1osSUFBQyxDQUFBLFFBQVEsQ0FBQyxLQUFWLEdBQ0M7TUFBQSxNQUFBLEVBQVEsSUFBUjs7SUFHRCxJQUFDLENBQUEsS0FBRCxHQUFTLFNBQVMsQ0FBQyxJQUFWLENBQUE7SUFDVCxJQUFDLENBQUEsS0FBSyxDQUFDLEtBQVAsR0FDQztNQUFBLE1BQUEsRUFBUSxJQUFSO01BQ0EsVUFBQSxFQUFZLFNBQVMsQ0FBQyxVQUR0QjtNQUVBLFVBQUEsRUFBWSxTQUFTLENBQUMsVUFGdEI7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLEdBQUcsQ0FBQyxTQUhYO01BSUEsYUFBQSxFQUFlLFdBSmY7TUFLQSxLQUFBLEVBQU8sU0FBUyxDQUFDLEtBTGpCOztJQU9ELElBQUMsQ0FBQSxpQkFBRCxHQUFxQixlQUFlLENBQUMsSUFBaEIsQ0FBQTtJQUNyQixJQUFDLENBQUEsaUJBQWlCLENBQUMsS0FBbkIsR0FDQztNQUFBLFVBQUEsRUFBWSxJQUFaO01BQ0EsTUFBQSxFQUFRLElBRFI7TUFFQSxRQUFBLEVBQVUsZUFBZSxDQUFDLFFBQWhCLEdBQTJCLENBRnJDO01BR0EsVUFBQSxFQUFZLGVBQWUsQ0FBQyxVQUg1QjtNQUlBLFVBQUEsRUFBWSxlQUFlLENBQUMsVUFKNUI7TUFLQSxJQUFBLEVBQU0sSUFBQyxDQUFBLEdBQUcsQ0FBQyxlQUxYO01BTUEsQ0FBQSxFQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxHQUFjLHFCQU5qQjs7SUFRRCxJQUFDLENBQUEsS0FBRCxHQUFTLFNBQVMsQ0FBQyxJQUFWLENBQUE7SUFDVCxJQUFDLENBQUEsS0FBSyxDQUFDLEtBQVAsR0FDQztNQUFBLFVBQUEsRUFBWSxJQUFaO01BQ0EsTUFBQSxFQUFRLElBRFI7TUFFQSxVQUFBLEVBQVksU0FBUyxDQUFDLFVBRnRCO01BR0EsVUFBQSxFQUFZLFNBQVMsQ0FBQyxVQUh0QjtNQUlBLElBQUEsRUFBTSxJQUFDLENBQUEsR0FBRyxDQUFDLFNBSlg7TUFLQSxDQUFBLEVBQUcsSUFBQyxDQUFBLGlCQUFpQixDQUFDLElBQW5CLEdBQTBCLHFCQUw3Qjs7SUFRRCxJQUFDLENBQUEsaUJBQWlCLENBQUMsUUFBbkIsR0FBOEIsZUFBZSxDQUFDO0VBOURsQzs7RUFpRWIsV0FBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxHQUFHLENBQUM7SUFBUixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUcsQ0FBQyxDQUFDLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBZjtlQUNDLElBQUMsQ0FBQSxXQUFELENBQWEsT0FBYixDQUFxQixDQUFDLEtBQXRCLEdBQThCLE1BRC9COztJQURJLENBREw7R0FERDs7RUFNQSxXQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUFSLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBRyxDQUFDLENBQUMsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFmO1FBQ0MsSUFBQyxDQUFBLEdBQUcsQ0FBQyxTQUFMLEdBQWlCO2VBQ2pCLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxHQUFjLE1BRmY7O0lBREksQ0FETDtHQUREOztFQU9BLFdBQUMsQ0FBQSxNQUFELENBQVEsaUJBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUFSLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBRyxDQUFDLENBQUMsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFmO1FBQ0MsSUFBQyxDQUFBLEdBQUcsQ0FBQyxlQUFMLEdBQXVCO1FBQ3ZCLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxJQUFuQixHQUEwQjtlQUMxQixJQUFDLENBQUEsS0FBSyxDQUFDLENBQVAsR0FBVyxJQUFDLENBQUEsaUJBQWlCLENBQUMsSUFBbkIsR0FBMEIsc0JBSHRDOztJQURJLENBREw7R0FERDs7RUFRQSxXQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUFSLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBRyxDQUFDLENBQUMsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFmO1FBQ0MsSUFBQyxDQUFBLEdBQUcsQ0FBQyxTQUFMLEdBQWlCO2VBQ2pCLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxHQUFjLE1BRmY7O0lBREksQ0FETDtHQUREOzs7O0dBaEdnQzs7OztBRERqQyxJQUFBLFdBQUE7RUFBQTs7O0FBQUMsY0FBZSxPQUFBLENBQVEsbURBQVI7O0FBR1YsTUFBTSxDQUFDOzs7RUFDQyx1QkFBQyxHQUFEO0FBQ1osUUFBQTtJQURhLElBQUMsQ0FBQSxvQkFBRCxNQUFPO0lBQ3BCLCtDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLEdBQVosRUFDTDtNQUFBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FBZDtNQUNBLE1BQUEsRUFBUSxrQkFBa0IsQ0FBQyxNQUQzQjtNQUVBLGNBQUEsRUFBZ0IsS0FGaEI7TUFHQSxPQUFBLEVBQVMsR0FIVDtNQUlBLGFBQUEsRUFBZSxJQUpmO01BS0EsS0FBQSxFQUFPLEtBTFA7TUFNQSxXQUFBLEVBQWEsS0FOYjtLQURLLENBQU47SUFTQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxLQUFpQixNQUFwQjtNQUNDLGdCQUFBLENBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBdEIsRUFBOEIsSUFBOUIsRUFERDs7SUFHQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxLQUFnQixNQUFuQjtNQUNDLGFBQUEsQ0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQW5CLEVBQTBCLElBQTFCLEVBQTZCLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBbEMsRUFERDs7SUFHQSxJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLEtBQUEsQ0FDakI7TUFBQSxJQUFBLEVBQU0sWUFBTjtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsR0FBRyxDQUFDLFdBRFo7TUFFQSxlQUFBLEVBQWlCLElBRmpCO0tBRGlCO0lBSWxCLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBQyxDQUFBLFVBQVY7SUFFQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBUjtBQUNDLFdBQVMsOEZBQVQ7UUFFQyxRQUFBLEdBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUMsSUFBckIsR0FBNEI7UUFFdkMsSUFBQyxDQUFBLFFBQUQsR0FBZ0IsSUFBQSxXQUFBLENBQ2Y7VUFBQSxJQUFBLEVBQU0sY0FBTjtVQUNBLE1BQUEsRUFBUSxJQUFDLENBQUEsT0FEVDtVQUVBLENBQUEsRUFBRyxRQUZIO1VBR0EsU0FBQSxFQUFXLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBQUssQ0FBQyxJQUgvQjtVQUlBLGVBQUEsRUFBaUIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsZ0JBSi9CO1VBS0EsU0FBQSxFQUFXLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBTHpCO1VBTUEsS0FBQSxFQUFVLGlCQUFILEdBQTBCLE1BQU0sQ0FBQyxXQUFQLENBQW1CLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLE1BQWpDLENBQTFCLEdBQXdFLEtBQUssQ0FBQyxZQUFOLENBQW1CLGNBQW5CLENBTi9FO1NBRGU7UUFVaEIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxLQUFWLENBQWdCLFNBQUE7aUJBQ2YsS0FBQSxDQUFNLGFBQU47UUFEZSxDQUFoQjtBQWRELE9BREQ7S0FBQSxNQUFBO01Ba0JDLFFBQUEsR0FBZSxJQUFBLFdBQUEsQ0FDZDtRQUFBLE1BQUEsRUFBUSxJQUFDLENBQUMsT0FBVjtRQUNBLENBQUEsRUFBRyxRQUFBLEdBQVcsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUQxQjtPQURjO01BS2YsUUFBUSxDQUFDLEtBQVQsQ0FBZSxTQUFBO2VBQ2QsS0FBQSxDQUFNLGFBQU47TUFEYyxDQUFmLEVBdkJEOztJQTJCQSxJQUFDLENBQUEsWUFBRCxHQUFvQixJQUFBLEtBQUEsQ0FDbkI7TUFBQSxJQUFBLEVBQU0sY0FBTjtNQUNBLEtBQUEsRUFBTyxHQURQO01BRUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUZUO01BR0EsZUFBQSxFQUFpQixPQUhqQjtLQURtQjtJQU1wQixJQUFDLENBQUEsY0FBRCxHQUFzQixJQUFBLE1BQUEsQ0FDckI7TUFBQSxJQUFBLEVBQU0sZUFBTjtNQUNBLElBQUEsRUFBTSxXQUROO01BRUEsSUFBQSxFQUFNLE1BRk47TUFHQSxJQUFBLEVBQU0sYUFITjtNQUlBLFNBQUEsRUFBVyxPQUpYO01BS0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxZQUxUO01BTUEsS0FBQSxFQUFPLEdBTlA7TUFPQSxJQUFBLEVBQU0sSUFBQyxDQUFBLFlBQVksQ0FBQyxJQVBwQjtNQVFBLElBQUEsRUFBTSxJQUFDLENBQUEsWUFBWSxDQUFDLElBUnBCO0tBRHFCO0lBV3RCLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBQyxDQUFBLFlBQVY7RUFsRVk7Ozs7R0FEcUI7Ozs7QURGbkMsSUFBQTs7O0FBQU0sTUFBTSxDQUFDO0FBRVosTUFBQTs7OztFQUFBLGNBQUEsR0FBaUIsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsb0JBQTFCLENBQStDLENBQUMsS0FBaEQsR0FBd0Q7O0VBQ3pFLGlCQUFBLEdBQW9CLGFBQWEsQ0FBQyxXQUFkLENBQTBCLHNCQUExQixDQUFpRCxDQUFDLENBQWxELEdBQXNELGFBQWEsQ0FBQyxXQUFkLENBQTBCLG9CQUExQixDQUErQyxDQUFDOztFQUU3RyxzQkFBQyxHQUFEO0FBQ1osUUFBQTtJQURhLElBQUMsQ0FBQSxNQUFEO0lBQ2IsOENBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsR0FBWixFQUNMO01BQUEsTUFBQSxFQUFRLGFBQWEsQ0FBQyxNQUF0QjtNQUNBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FEZDtNQUVBLGVBQUEsRUFBaUIsYUFBYSxDQUFDLGVBRi9CO01BR0EsVUFBQSxFQUFZLENBQUMsU0FBRCxFQUFXLGNBQVgsRUFBMEIsU0FBMUIsRUFBb0MsU0FBcEMsRUFBK0MsU0FBL0MsQ0FIWjtLQURLLENBQU47SUFNQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxLQUFpQixNQUFwQjtNQUNDLGdCQUFBLENBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBdEIsRUFBOEIsSUFBOUIsRUFERDs7SUFHQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxLQUFnQixNQUFuQjtNQUNDLGFBQUEsQ0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQW5CLEVBQTBCLElBQTFCLEVBQTZCLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBbEMsRUFERDs7SUFHQSxZQUFBLGtCQUFlLE9BQU8sSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUMzQixJQUFDLENBQUEsU0FBRCxHQUFhLFNBQUEsR0FBWSxhQUFhLENBQUMsSUFBZCxDQUFBO0lBQ3pCLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxHQUNDO01BQUEsTUFBQSxFQUFRLElBQVI7O0lBRUQsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsU0FBUyxDQUFDLFdBQVgsQ0FBdUIsb0JBQXZCO0lBQ1gsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQ0M7TUFBQSxJQUFBO0FBQU0sZ0JBQU8sWUFBUDtBQUFBLGVBQ0EsSUFEQTtBQUFBLGVBQ00sTUFETjttQkFFSjtBQUZJO21CQUlKLFVBQUEsR0FBVyxZQUFYLEdBQXdCO0FBSnBCO1VBQU47TUFLQSxRQUFBLEVBQVUsSUFMVjtNQU1BLFVBQUEsRUFBWSxJQUFDLENBQUEsT0FBTyxDQUFDLFVBTnJCO01BT0EsU0FBQSxFQUFXLE1BUFg7O0lBU0QsY0FBQSxDQUFlLElBQWY7SUFHQSxJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLGVBQUEsQ0FDaEI7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUNBLENBQUEsRUFBRyxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsR0FBa0IsQ0FBQyxhQUFhLENBQUMsV0FBZCxDQUEwQixvQkFBMUIsQ0FBK0MsQ0FBQyxDQUFoRCxHQUFvRCxhQUFhLENBQUMsSUFBbkUsQ0FEckI7TUFFQSxNQUFBLEVBQVEsSUFBQyxDQUFDLE1BRlY7TUFHQSxLQUFBLEVBQU8sTUFBTSxDQUFDLEtBQVAsR0FBZSxDQUFDLGNBQUEsR0FBaUIsRUFBbEIsQ0FIdEI7TUFJQSxjQUFBLEVBQWdCLEtBSmhCO01BS0EsZ0JBQUEsRUFBa0IsS0FMbEI7TUFPQSxZQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8saUJBQVA7T0FSRDtLQURnQjtBQVlqQjtBQUFBLFNBQUEsNkNBQUE7O01BQ0MsSUFBQyxDQUFBLElBQUQsR0FBWSxJQUFBLE1BQUEsQ0FDWDtRQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsU0FBUyxDQUFDLE9BQW5CO1FBQ0EsSUFBQSxFQUFNLEVBQUEsR0FBRyxTQURUO1FBRUEsSUFBQSxFQUFNLEtBRk47UUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLEdBQUcsQ0FBQyxVQUFXLENBQUEsQ0FBQSxDQUh0QjtRQUlBLENBQUEsRUFBRyxhQUFhLENBQUMsV0FBZCxDQUEwQixvQkFBMUIsQ0FBK0MsQ0FBQyxDQUpuRDtRQUtBLENBQUEsRUFBRyxRQUxIO09BRFc7TUFRWixRQUFBLEdBQVcsSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFOLEdBQWE7QUFUekI7SUFXQSxjQUFBLEdBQWlCLElBQUMsQ0FBQSxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVMsQ0FBQSxJQUFDLENBQUEsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBNUIsR0FBcUMsQ0FBckM7SUFHN0MsSUFBRyxjQUFjLENBQUMsSUFBZixHQUFzQixNQUFNLENBQUMsS0FBaEM7TUFDQyxJQUFDLENBQUEsU0FBUyxDQUFDLGdCQUFYLEdBQThCLEtBRC9COztJQUdBLElBQUMsQ0FBQSxTQUFTLENBQUMsQ0FBWCxHQUFlLElBQUEsR0FBTyxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsR0FBa0IsQ0FBQyxhQUFhLENBQUMsV0FBZCxDQUEwQixvQkFBMUIsQ0FBK0MsQ0FBQyxDQUFoRCxHQUFvRCxhQUFhLENBQUMsSUFBbkU7SUFHeEMsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLEdBQ0M7TUFBQSxNQUFBLEVBQ0M7UUFBQSxDQUFBLEVBQUcsY0FBQSxHQUFpQixFQUFwQjtRQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsU0FBUyxDQUFDLEtBRGxCO09BREQ7TUFHQSxNQUFBLEVBQ0M7UUFBQSxDQUFBLEVBQUcsSUFBSDtPQUpEO01BS0EsZ0JBQUEsRUFDQztRQUFBLElBQUEsRUFBTSxHQUFOO09BTkQ7O0lBUUQsSUFBQyxDQUFBLFNBQVMsQ0FBQyxXQUFYLENBQXVCLG9CQUF2QixDQUE0QyxDQUFDLE1BQTdDLEdBQ0M7TUFBQSxNQUFBLEVBQ0M7UUFBQSxPQUFBLEVBQVMsQ0FBVDtPQUREO01BRUEsTUFBQSxFQUNDO1FBQUEsT0FBQSxFQUFTLENBQVQ7T0FIRDtNQUlBLGdCQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU0sR0FBTjtPQUxEOztJQU9ELElBQUMsQ0FBQSxTQUFTLENBQUMsTUFBWCxHQUNDO01BQUEsTUFBQSxFQUNDO1FBQUEsS0FBQSxFQUFPLGNBQVA7T0FERDtNQUVBLE1BQUEsRUFDQztRQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsU0FBUyxDQUFDLFdBQVgsQ0FBdUIsb0JBQXZCLENBQTRDLENBQUMsS0FBN0MsR0FBcUQsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsb0JBQTFCLENBQStDLENBQUMsS0FBckcsR0FBNkcsQ0FBQyxhQUFhLENBQUMsS0FBZCxHQUFzQixDQUFDLGFBQWEsQ0FBQyxXQUFkLENBQTBCLG9CQUExQixDQUErQyxDQUFDLEtBQWhELEdBQXdELGFBQWEsQ0FBQyxXQUFkLENBQTBCLG9CQUExQixDQUErQyxDQUFDLEtBQXpHLENBQXZCLENBQXBIO09BSEQ7TUFJQSxnQkFBQSxFQUNDO1FBQUEsSUFBQSxFQUFNLEdBQU47T0FMRDs7SUFPRCxJQUFDLENBQUEsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFuQixDQUFzQixVQUF0QixFQUFrQyxTQUFBO01BQ2pDLElBQUcsSUFBQyxDQUFBLENBQUQsR0FBSyxDQUFDLEVBQU4sSUFBYSxJQUFDLENBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBekIsQ0FBcUMsb0JBQXJDLENBQTBELENBQUMsT0FBM0QsS0FBc0UsQ0FBdEY7UUFDQyxJQUFDLENBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBekIsQ0FBcUMsb0JBQXJDLENBQTBELENBQUMsT0FBM0QsQ0FBbUUsUUFBbkU7UUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBekIsQ0FBaUMsUUFBakM7ZUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLE9BQVIsQ0FBZ0IsUUFBaEIsRUFIRDtPQUFBLE1BSUssSUFBRyxJQUFDLENBQUEsQ0FBRCxHQUFLLENBQUMsRUFBTixJQUFhLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUF2QixLQUErQixRQUEvQztRQUNKLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUF6QixDQUFxQyxvQkFBckMsQ0FBMEQsQ0FBQyxPQUEzRCxDQUFtRSxRQUFuRTtRQUNBLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUF6QixDQUFpQyxRQUFqQztlQUNBLElBQUMsQ0FBQSxNQUFNLENBQUMsT0FBUixDQUFnQixRQUFoQixFQUhJOztJQUw0QixDQUFsQztFQXpGWTs7RUFzR2IsY0FBQSxHQUFpQixTQUFDLE1BQUQ7QUFDaEIsUUFBQTtJQUFBLEdBQUEsR0FBTSxNQUFNLENBQUM7SUFDYixRQUFBLEdBQVcsR0FBRyxDQUFDLFdBQUosQ0FBZ0Isb0JBQWhCO0lBQ1gsT0FBQSxHQUFVLGFBQWEsQ0FBQyxXQUFkLENBQTBCLG9CQUExQjtJQUNWLE9BQUEsR0FBVSxhQUFhLENBQUMsV0FBZCxDQUEwQixvQkFBMUI7V0FDVixHQUFHLENBQUMsS0FBSixHQUFZLFFBQVEsQ0FBQyxLQUFULEdBQWlCLE9BQU8sQ0FBQyxLQUF6QixHQUFpQyxPQUFPLENBQUMsQ0FBekMsR0FBNkMsQ0FBQyxhQUFhLENBQUMsS0FBZCxHQUFzQixPQUFPLENBQUMsSUFBL0IsQ0FBN0MsR0FBb0YsQ0FBQyxPQUFPLENBQUMsQ0FBUixHQUFZLE9BQU8sQ0FBQyxJQUFyQjtFQUxoRjs7eUJBUWpCLFFBQUEsR0FBVSxTQUFDLEtBQUQ7QUFDVCxRQUFBO0lBQUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFUO0FBQWdCLGNBQU8sS0FBUDtBQUFBLGFBQ1YsSUFEVTtBQUFBLGFBQ0osTUFESTtBQUFBLGFBQ08sQ0FEUDtpQkFFZDtBQUZjO2lCQUlkLFVBQUEsR0FBVyxLQUFYLEdBQWlCO0FBSkg7O0lBS2hCLGNBQUEsQ0FBZSxJQUFmO0lBQ0EsUUFBQSxHQUFXLElBQUMsQ0FBQSxTQUFTLENBQUM7SUFDdEIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxDQUFYLEdBQWUsSUFBQSxHQUFPLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxHQUFrQixDQUFDLGFBQWEsQ0FBQyxXQUFkLENBQTBCLG9CQUExQixDQUErQyxDQUFDLENBQWhELEdBQW9ELGFBQWEsQ0FBQyxJQUFuRTtJQUd4QyxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQVgsR0FDQztNQUFBLE1BQUEsRUFDQztRQUFBLENBQUEsRUFBRyxjQUFBLEdBQWlCLEVBQXBCO1FBQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FEbEI7T0FERDtNQUdBLE1BQUEsRUFDQztRQUFBLENBQUEsRUFBRyxJQUFIO09BSkQ7TUFLQSxnQkFBQSxFQUNDO1FBQUEsSUFBQSxFQUFNLEdBQU47T0FORDs7SUFRRCxJQUFDLENBQUEsU0FBUyxDQUFDLFdBQVgsQ0FBdUIsb0JBQXZCLENBQTRDLENBQUMsTUFBN0MsR0FDQztNQUFBLE1BQUEsRUFDQztRQUFBLE9BQUEsRUFBUyxDQUFUO09BREQ7TUFFQSxNQUFBLEVBQ0M7UUFBQSxPQUFBLEVBQVMsQ0FBVDtPQUhEO01BSUEsZ0JBQUEsRUFDQztRQUFBLElBQUEsRUFBTSxHQUFOO09BTEQ7O0lBT0QsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLEdBQ0M7TUFBQSxNQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sY0FBUDtPQUREO01BRUEsTUFBQSxFQUNDO1FBQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxTQUFTLENBQUMsV0FBWCxDQUF1QixvQkFBdkIsQ0FBNEMsQ0FBQyxLQUE3QyxHQUFxRCxhQUFhLENBQUMsV0FBZCxDQUEwQixvQkFBMUIsQ0FBK0MsQ0FBQyxLQUFyRyxHQUE2RyxDQUFDLGFBQWEsQ0FBQyxLQUFkLEdBQXNCLENBQUMsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsb0JBQTFCLENBQStDLENBQUMsS0FBaEQsR0FBd0QsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsb0JBQTFCLENBQStDLENBQUMsS0FBekcsQ0FBdkIsQ0FBcEg7T0FIRDtNQUlBLGdCQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU0sR0FBTjtPQUxEOztXQU9ELElBQUMsQ0FBQSxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQW5CLENBQXNCLFVBQXRCLEVBQWtDLFNBQUE7TUFDakMsSUFBRyxJQUFDLENBQUEsQ0FBRCxHQUFLLENBQUMsRUFBTixJQUFhLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUF6QixDQUFxQyxvQkFBckMsQ0FBMEQsQ0FBQyxPQUEzRCxLQUFzRSxDQUF0RjtRQUNDLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUF6QixDQUFxQyxvQkFBckMsQ0FBMEQsQ0FBQyxPQUEzRCxDQUFtRSxRQUFuRTtRQUNBLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUF6QixDQUFpQyxRQUFqQztlQUNBLElBQUMsQ0FBQSxNQUFNLENBQUMsT0FBUixDQUFnQixRQUFoQixFQUhEO09BQUEsTUFJSyxJQUFHLElBQUMsQ0FBQSxDQUFELEdBQUssQ0FBQyxFQUFOLElBQWEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXZCLEtBQStCLFFBQS9DO1FBQ0osSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQXpCLENBQXFDLG9CQUFyQyxDQUEwRCxDQUFDLE9BQTNELENBQW1FLFFBQW5FO1FBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQXpCLENBQWlDLFFBQWpDO2VBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxPQUFSLENBQWdCLFFBQWhCLEVBSEk7O0lBTDRCLENBQWxDO0VBcENTOzs7O0dBbkh1Qjs7OztBREdsQyxJQUFBOzs7QUFBTSxNQUFNLENBQUM7QUFDWixNQUFBOzs7O0VBQUEsU0FBQSxHQUFZOztFQUVDLHFCQUFDLEdBQUQ7QUFDWixRQUFBO0lBRGEsSUFBQyxDQUFBLG9CQUFELE1BQU87SUFDcEIsNkNBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsR0FBWixFQUNMO01BQUEsS0FBQSxFQUFPLE1BQU0sQ0FBQyxLQUFkO01BQ0EsTUFBQSxFQUFRLFNBQVMsQ0FBQyxNQURsQjtNQUVBLGVBQUEsRUFBaUIsU0FBUyxDQUFDLGVBRjNCO01BR0EsV0FBQSxFQUFhLHNCQUhiO0tBREssQ0FBTjtJQU1BLGVBQUEsR0FBa0IsU0FBUyxDQUFDLEtBQVYsR0FBa0IsU0FBUyxDQUFDLFdBQVYsQ0FBc0IsT0FBdEIsQ0FBOEIsQ0FBQztJQUVuRSxJQUFDLENBQUEsU0FBRCxHQUFhLFNBQVMsQ0FBQyxXQUFWLENBQXNCLE9BQXRCLENBQThCLENBQUMsSUFBL0IsQ0FBQTtJQUNiLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxHQUNDO01BQUEsTUFBQSxFQUFRLElBQVI7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQUQsR0FBUyxlQURoQjs7SUFFRCxJQUFDLENBQUEsU0FBUyxDQUFDLFdBQVgsQ0FBdUIsb0JBQXZCLENBQTRDLENBQUMsVUFBN0MsR0FBMEQ7SUFHMUQsSUFBQyxDQUFBLFVBQUQsR0FBa0IsSUFBQSxLQUFBLENBQ2pCO01BQUEsSUFBQSxFQUFNLFlBQU47TUFDQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFNBRFQ7TUFFQSxDQUFBLEVBQUcsSUFBQyxDQUFBLFNBQVMsQ0FBQyxXQUFYLENBQXVCLG9CQUF2QixDQUE0QyxDQUFDLENBRmhEO01BR0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxTQUFTLENBQUMsV0FBWCxDQUF1QixvQkFBdkIsQ0FBNEMsQ0FBQyxDQUhoRDtNQUlBLGVBQUEsRUFBaUIsSUFKakI7TUFLQSxLQUFBLEVBQU8sSUFBQyxDQUFBLFNBQVMsQ0FBQyxXQUFYLENBQXVCLG9CQUF2QixDQUE0QyxDQUFDLEtBTHBEO01BTUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUFTLENBQUMsV0FBWCxDQUF1QixvQkFBdkIsQ0FBNEMsQ0FBQyxNQU5yRDtNQU9BLElBQUEsRUFBTSx1REFBQSxHQUVZLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FGakIsR0FFNkIsY0FUbkM7TUFXQSxLQUFBLEVBQ0M7UUFBQSxVQUFBLEVBQVksVUFBWjtPQVpEO0tBRGlCO0lBZWxCLEdBQUEsR0FBTSwrREFBQSxHQUlHLENBQUMsSUFBQyxDQUFBLFNBQVMsQ0FBQyxXQUFYLENBQXVCLG9CQUF2QixDQUE0QyxDQUFDLEtBQTlDLENBSkgsR0FJdUQsZ0JBSnZELEdBS0ksQ0FBQyxJQUFDLENBQUEsU0FBUyxDQUFDLFdBQVgsQ0FBdUIsb0JBQXZCLENBQTRDLENBQUMsTUFBOUMsQ0FMSixHQUt5RCxrUkFMekQsR0FjRyxDQUFDLElBQUMsQ0FBQSxTQUFTLENBQUMsV0FBWCxDQUF1QixvQkFBdkIsQ0FBNEMsQ0FBQyxLQUE5QyxDQWRILEdBY3VEO0lBTTdELEtBQUssQ0FBQyxTQUFOLENBQWdCLEdBQWhCO0lBRUEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxXQUFYLENBQXVCLG9CQUF2QixDQUE0QyxDQUFDLE9BQTdDLENBQUE7SUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBZCxDQUE0QixtQkFBNUI7RUF0REc7Ozs7R0FIbUI7Ozs7QURIakMsSUFBQTs7O0FBQU0sTUFBTSxDQUFDO0FBQ1osTUFBQTs7OztFQUFBLFNBQUEsR0FBWTs7RUFFQyxrQkFBQyxHQUFEO0lBQUMsSUFBQyxDQUFBLG9CQUFELE1BQU87SUFDcEIsMENBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsR0FBWixFQUNMO01BQUEsSUFBQSxFQUFNLFVBQU47TUFDQSxLQUFBLEVBQU8sU0FBUyxDQUFDLEtBRGpCO01BQ3dCLE1BQUEsRUFBUSxTQUFTLENBQUMsTUFEMUM7TUFFQSxlQUFBLEVBQWlCLFNBQVMsQ0FBQyxlQUYzQjtNQUdBLGVBQUEsRUFBaUIsYUFIakI7TUFJQSxLQUFBLEVBQU8sS0FKUDtLQURLLENBQU47SUFRQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxLQUFpQixNQUFwQjtNQUNDLGdCQUFBLENBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBdEIsRUFBOEIsSUFBOUIsRUFERDs7SUFHQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxLQUFnQixNQUFuQjtNQUNDLGFBQUEsQ0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQW5CLEVBQTBCLElBQTFCLEVBQTZCLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBbEMsRUFERDs7SUFHQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBUjtNQUNDLElBQUMsQ0FBQSxTQUFELEdBQWEsU0FBUyxDQUFDLFdBQVYsQ0FBc0IsZ0JBQXRCLENBQXVDLENBQUMsSUFBeEMsQ0FBQTtNQUNiLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxHQUNDO1FBQUEsTUFBQSxFQUFRLElBQVI7UUFDQSxJQUFBLEVBQU0sSUFBQyxDQUFBLEdBQUcsQ0FBQyxTQURYO1FBRUEsVUFBQSxFQUFZLElBRlo7UUFIRjs7SUFPQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsVUFBUjtNQUNDLElBQUMsQ0FBQSxVQUFELEdBQWMsU0FBUyxDQUFDLFdBQVYsQ0FBc0IsYUFBdEIsQ0FBb0MsQ0FBQyxJQUFyQyxDQUFBO01BQ2QsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLEdBQ0M7UUFBQSxNQUFBLEVBQVEsSUFBUjtRQUNBLElBQUEsRUFBTSxJQUFDLENBQUEsR0FBRyxDQUFDLFVBRFg7UUFFQSxVQUFBLEVBQVksSUFGWjtRQUhGOztJQU9BLElBQUMsQ0FBQSxjQUFELEdBQWtCLFNBQVMsQ0FBQyxXQUFWLENBQXNCLE9BQXRCLENBQThCLENBQUMsSUFBL0IsQ0FBQTtJQUNsQixJQUFDLENBQUEsY0FBYyxDQUFDLEtBQWhCLEdBQ0M7TUFBQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQUQsR0FBUyxRQUFBLEdBQVMsQ0FBekI7TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLENBQUEsRUFBTSxJQUFDLENBQUEsR0FBRyxDQUFDLFNBQVIsR0FBdUIsU0FBUyxDQUFDLFdBQVYsQ0FBc0IsT0FBdEIsQ0FBOEIsQ0FBQyxDQUF0RCxHQUE2RCxDQUZoRTs7SUFJRCxJQUFDLENBQUEsV0FBRCxDQUFhLGFBQWIsQ0FBMkIsQ0FBQyxVQUE1QixHQUF5QztJQUV6QyxJQUFDLENBQUEsY0FBYyxDQUFDLFdBQWhCLENBQTRCLGNBQTVCLENBQTJDLENBQUMsQ0FBNUMsR0FBZ0QsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaO0lBRWhELElBQUMsQ0FBQSxXQUFELENBQWEsYUFBYixDQUEyQixDQUFDLElBQTVCLEdBQW1DLElBQUMsQ0FBQSxHQUFHLENBQUM7SUFFeEMsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQVI7TUFDQyxJQUFDLENBQUEsV0FBRCxDQUFhLGFBQWIsQ0FBMkIsQ0FBQyxLQUE1QixHQUNDO1FBQUEsS0FBQSxFQUFPLFNBQVA7UUFDQSxJQUFBLEVBQU0sSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQURYO1FBRkY7O0lBS0EsSUFBQyxDQUFBLE1BQUQsR0FBYSxJQUFDLENBQUEsR0FBRyxDQUFDLFVBQVIsR0FBd0IsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLEdBQW1CLFFBQTNDLEdBQXlELElBQUMsQ0FBQSxjQUFjLENBQUMsSUFBaEIsR0FBdUI7RUE5QzlFOztFQWlEYixRQUFDLENBQUEsTUFBRCxDQUFRLGlCQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxHQUFHLENBQUM7SUFBUixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxHQUFHLENBQUMsZUFBTCxHQUF1QjtNQUN2QixJQUFHLENBQUMsQ0FBQyxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQWY7ZUFDQyxJQUFDLENBQUEsV0FBRCxDQUFhLGFBQWIsQ0FBMkIsQ0FBQyxJQUE1QixHQUFtQyxNQURwQzs7SUFGSSxDQURMO0dBREQ7O0VBT0EsUUFBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxHQUFHLENBQUM7SUFBUixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxHQUFhO01BQ2IsSUFBRyxDQUFDLENBQUMsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFmO2VBQ0MsSUFBQyxDQUFBLFdBQUQsQ0FBYSxhQUFiLENBQTJCLENBQUMsS0FBNUIsR0FDQztVQUFBLEtBQUEsRUFBTyxTQUFQO1VBQ0EsSUFBQSxFQUFNLEtBRE47VUFGRjs7SUFGSSxDQURMO0dBREQ7Ozs7R0EzRDZCOzs7O0FEQTlCLElBQUE7OztBQUFNLE1BQU0sQ0FBQztBQUNaLE1BQUE7Ozs7RUFBYSxtQkFBQyxHQUFEO0FBQ1osUUFBQTtJQURhLElBQUMsQ0FBQSxvQkFBRCxNQUFLO0lBQ2xCLDJDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLEdBQVosRUFDTDtNQUFBLENBQUEsRUFBRyxDQUFIO01BQU0sQ0FBQSxFQUFHLENBQVQ7TUFDQSxLQUFBLEVBQU8sTUFBTSxDQUFDLEtBRGQ7TUFFQSxNQUFBLEVBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFkLEtBQTRCLDJCQUEvQixHQUFnRSxFQUFoRSxHQUF3RSxFQUZoRjtNQUdBLGVBQUEsRUFBaUIsT0FIakI7TUFJQSxVQUFBLEVBQVksS0FKWjtNQUtBLFVBQUEsRUFBWSxRQUxaO01BTUEsUUFBQSxFQUFVLE1BTlY7TUFPQSxXQUFBLEVBQWEsU0FQYjtLQURLLEVBVUwsV0FBQSxHQUFrQixJQUFBLElBQUEsQ0FBQSxDQUFNLENBQUMsa0JBQVAsQ0FBMEIsRUFBMUIsRUFBOEI7TUFBQyxJQUFBLEVBQU0sU0FBUDtNQUFrQixNQUFBLEVBQU8sU0FBekI7S0FBOUIsQ0FWYixDQUFOO0lBWUEsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsS0FBaUIsTUFBcEI7TUFDQyxnQkFBQSxDQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQXRCLEVBQThCLElBQTlCLEVBREQ7O0lBR0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsS0FBZ0IsTUFBbkI7TUFDQyxhQUFBLENBQWMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFuQixFQUEwQixJQUExQixFQUE2QixJQUFDLENBQUEsR0FBRyxDQUFDLENBQWxDLEVBREQ7O0lBSUEsSUFBQyxDQUFBLEtBQUQsR0FDQztNQUFBLFFBQUEsRUFBVSxXQUFWO01BQ0EsVUFBQSxFQUFZLFVBRFo7TUFFQSxTQUFBLEVBQVcsS0FGWDs7SUFLRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBZCxLQUE0QiwyQkFBL0I7TUFDQyxJQUFDLENBQUEsSUFBRCxHQUFZLElBQUEsU0FBQSxDQUNYO1FBQUEsSUFBQSxFQUFNLE1BQU47UUFDQSxNQUFBLEVBQVEsSUFEUjtRQUVBLEtBQUEsRUFBTyxJQUFDLENBQUEsR0FBRyxDQUFDLFNBRlo7UUFHQSxJQUFBLEVBQU0sV0FITjtRQUlBLFVBQUEsRUFBWSxHQUpaO1FBS0EsUUFBQSxFQUFVLEVBTFY7UUFNQSxVQUFBLEVBQVksQ0FOWjtRQU9BLEtBQUEsRUFBTyxPQVBQO1FBUUEsQ0FBQSxFQUFHLEVBUkg7UUFRTyxDQUFBLEVBQUcsRUFSVjtRQVNBLFNBQUEsRUFBVyxRQVRYO09BRFc7TUFZWixJQUFDLENBQUEsTUFBRCxHQUFjLElBQUEsS0FBQSxDQUNiO1FBQUEsSUFBQSxFQUFNLFFBQU47UUFDQSxNQUFBLEVBQVEsSUFEUjtRQUVBLEtBQUEsRUFBTyxFQUZQO1FBRVcsTUFBQSxFQUFRLEVBRm5CO1FBR0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQyxFQUFiLENBSEg7UUFHcUIsQ0FBQSxFQUFHLEVBSHhCO1FBSUEsS0FBQSxFQUFPLDRDQUFBLEdBQTZDLElBQUMsQ0FBQSxHQUFHLENBQUMsVUFBbEQsR0FBNkQsTUFKcEU7T0FEYTtNQU9kLElBQUMsQ0FBQSxJQUFELEdBQVksSUFBQSxLQUFBLENBQ1g7UUFBQSxJQUFBLEVBQU0sTUFBTjtRQUNBLE1BQUEsRUFBUSxJQURSO1FBRUEsS0FBQSxFQUFPLEVBRlA7UUFFVyxNQUFBLEVBQVEsRUFGbkI7UUFHQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFDLEVBQWIsQ0FISDtRQUdxQixDQUFBLEVBQUcsRUFIeEI7UUFJQSxLQUFBLEVBQU8sNENBQUEsR0FBNkMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFsRCxHQUEyRCxNQUpsRTtPQURXO01BT1osSUFBQyxDQUFBLE9BQUQsR0FBZSxJQUFBLEtBQUEsQ0FDZDtRQUFBLElBQUEsRUFBTSxTQUFOO1FBQ0EsTUFBQSxFQUFRLElBRFI7UUFFQSxLQUFBLEVBQU8sRUFGUDtRQUVXLE1BQUEsRUFBUSxFQUZuQjtRQUdBLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBTixDQUFZLENBQUMsRUFBYixDQUhIO1FBR3FCLENBQUEsRUFBRyxFQUh4QjtRQUlBLEtBQUEsRUFBTyw0Q0FBQSxHQUE2QyxJQUFDLENBQUEsR0FBRyxDQUFDLFdBQWxELEdBQThELE1BSnJFO09BRGMsRUEzQmhCO0tBQUEsTUFBQTtNQWtDQyxJQUFDLENBQUEsTUFBRCxHQUFjLElBQUEsS0FBQSxDQUNiO1FBQUEsSUFBQSxFQUFNLFFBQU47UUFDQSxNQUFBLEVBQVEsSUFEUjtRQUVBLEtBQUEsRUFBTyxFQUZQO1FBRVcsTUFBQSxFQUFRLENBRm5CO1FBR0EsQ0FBQSxFQUFHLENBSEg7UUFHTSxDQUFBLEVBQUcsQ0FIVDtRQUlBLEtBQUEsRUFBTyw0Q0FBQSxHQUE2QyxJQUFDLENBQUEsR0FBRyxDQUFDLFVBQWxELEdBQTZELE1BSnBFO09BRGE7TUFPZCxJQUFDLENBQUEsSUFBRCxHQUFZLElBQUEsS0FBQSxDQUNYO1FBQUEsSUFBQSxFQUFNLE1BQU47UUFDQSxNQUFBLEVBQVEsSUFEUjtRQUVBLEtBQUEsRUFBTyxFQUZQO1FBRVcsTUFBQSxFQUFRLENBRm5CO1FBR0EsQ0FBQSxFQUFHLEVBSEg7UUFHTyxDQUFBLEVBQUcsQ0FIVjtRQUlBLEtBQUEsRUFBTyw0Q0FBQSxHQUE2QyxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQWxELEdBQTJELE1BSmxFO09BRFc7TUFPWixJQUFDLENBQUEsSUFBRCxHQUFZLElBQUEsU0FBQSxDQUNYO1FBQUEsSUFBQSxFQUFNLE1BQU47UUFDQSxNQUFBLEVBQVEsSUFEUjtRQUVBLEtBQUEsRUFBTyxJQUFDLENBQUEsR0FBRyxDQUFDLFNBRlo7UUFHQSxJQUFBLEVBQU0sV0FITjtRQUlBLFVBQUEsRUFBWSxHQUpaO1FBS0EsUUFBQSxFQUFVLEVBTFY7UUFNQSxVQUFBLEVBQVksQ0FOWjtRQU9BLEtBQUEsRUFBTyxPQVBQO1FBUUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQVJUO1FBUWlCLENBQUEsRUFBRyxDQVJwQjtRQVNBLFNBQUEsRUFBVyxRQVRYO09BRFc7TUFZWixJQUFDLENBQUEsT0FBRCxHQUFlLElBQUEsS0FBQSxDQUNkO1FBQUEsSUFBQSxFQUFNLFNBQU47UUFDQSxNQUFBLEVBQVEsSUFEUjtRQUVBLEtBQUEsRUFBTyxFQUZQO1FBRVcsTUFBQSxFQUFRLElBRm5CO1FBR0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQyxDQUFiLENBSEg7UUFHb0IsQ0FBQSxFQUFHLENBSHZCO1FBSUEsS0FBQSxFQUFPLDRDQUFBLEdBQTZDLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBbEQsR0FBOEQsTUFKckU7T0FEYztNQU9mLElBQUMsQ0FBQSxpQkFBRCxHQUF5QixJQUFBLFNBQUEsQ0FDeEI7UUFBQSxJQUFBLEVBQU0sTUFBTjtRQUNBLE1BQUEsRUFBUSxJQURSO1FBRUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FGWjtRQUdBLElBQUEsRUFBTSxNQUhOO1FBSUEsVUFBQSxFQUFZLEdBSlo7UUFLQSxRQUFBLEVBQVUsRUFMVjtRQU1BLFVBQUEsRUFBWSxDQU5aO1FBT0EsS0FBQSxFQUFPLE9BUFA7UUFRQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFDLEVBQWIsQ0FSSDtRQVFxQixDQUFBLEVBQUcsQ0FSeEI7UUFTQSxTQUFBLEVBQVcsUUFUWDtPQUR3QixFQW5FMUI7O0lBK0VBLGFBQUEsQ0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLFVBQW5CLEVBQStCLElBQUMsQ0FBQSxJQUFoQztFQXpHWTs7RUE0R2IsYUFBQSxHQUFnQixTQUFDLEdBQUQsRUFBTSxTQUFOO0lBQ2YsSUFBRyxHQUFIO2FBQ0MsS0FBSyxDQUFDLFFBQU4sQ0FBZSxDQUFmLEVBQWtCLFNBQUE7ZUFDakIsU0FBUyxDQUFDLElBQVYsR0FBcUIsSUFBQSxJQUFBLENBQUEsQ0FBTSxDQUFDLGtCQUFQLENBQTBCLEVBQTFCLEVBQThCO1VBQUMsSUFBQSxFQUFNLFNBQVA7VUFBa0IsTUFBQSxFQUFPLFNBQXpCO1NBQTlCO01BREosQ0FBbEIsRUFERDs7RUFEZTs7c0JBTWhCLFVBQUEsR0FBWSxTQUFDLElBQUQ7O01BQ1gsT0FBUTs7SUFDUixJQUFDLENBQUMsS0FBTSxDQUFBLFlBQUEsQ0FBUixHQUF3QixNQUFBLEdBQVMsSUFBVCxHQUFnQjtJQUN4QyxJQUFHLElBQUMsQ0FBQyxLQUFNLENBQUEsUUFBQSxDQUFSLEtBQXFCLFdBQXhCO2FBQ0MsSUFBQyxDQUFDLEtBQU0sQ0FBQSxRQUFBLENBQVIsR0FBb0IsWUFEckI7S0FBQSxNQUFBO2FBR0MsSUFBQyxDQUFDLEtBQU0sQ0FBQSxRQUFBLENBQVIsR0FBb0IsWUFIckI7O0VBSFc7Ozs7R0FuSGtCOzs7O0FEQS9CLElBQUE7OztBQUFNLE1BQU0sQ0FBQztBQUdaLE1BQUE7Ozs7RUFBQSxJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBZCxLQUE0QiwyQkFBL0I7SUFDQyxHQUFBLEdBQU0sVUFEUDtHQUFBLE1BQUE7SUFHQyxHQUFBLEdBQU0sUUFIUDs7O0VBS0EsY0FBQSxHQUFpQixHQUFHLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDOztFQUVwQixnQkFBQyxHQUFEO0FBRVosUUFBQTtJQUZhLElBQUMsQ0FBQSxvQkFBRCxNQUFPO0lBRXBCLElBQUMsQ0FBQSxXQUFELEdBQWUsR0FBRyxDQUFDLElBQUosQ0FBQTtJQUNmLElBQUMsQ0FBQSxXQUFXLENBQUMsS0FBYixHQUNDO01BQUEsQ0FBQSxFQUFHLENBQUg7TUFDQSxDQUFBLEVBQUcsQ0FESDs7SUFHRCx3Q0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxHQUFaLEVBQ0w7TUFBQSxNQUFBLEVBQVEsR0FBRyxDQUFDLE1BQVo7TUFDQSxLQUFBLEVBQU8sR0FBRyxDQUFDLEtBRFg7TUFFQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRlQ7S0FESyxDQUFOO0lBS0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsS0FBaUIsTUFBcEI7TUFDQyxnQkFBQSxDQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQXRCLEVBQThCLElBQTlCLEVBREQ7O0lBR0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsS0FBZ0IsTUFBbkI7TUFDQyxhQUFBLENBQWMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFuQixFQUEwQixJQUExQixFQUE2QixJQUFDLENBQUEsR0FBRyxDQUFDLENBQWxDLEVBREQ7O0lBR0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxNQUFiLEdBQXNCO0FBR3RCO0FBQUEsU0FBQSw2Q0FBQTs7TUFDQyxLQUFLLENBQUMsS0FBTixDQUFZLFNBQUE7QUFDWCxZQUFBO0FBQUE7QUFBQSxhQUFBLHdDQUFBOztVQUNDLENBQUMsQ0FBQyxPQUFGLEdBQVk7QUFEYjtlQUVBLElBQUMsQ0FBQSxPQUFELENBQ0M7VUFBQSxPQUFBLEVBQVMsQ0FBVDtVQUNBLE9BQUEsRUFDQztZQUFBLEtBQUEsRUFBTyxVQUFQO1lBQ0EsSUFBQSxFQUFNLEdBRE47V0FGRDtTQUREO01BSFcsQ0FBWjtBQUREO0VBckJZOztFQWdDYixNQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQztJQUFSLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO0FBQ0osVUFBQTtBQUFBO0FBQUEsV0FBQSw2Q0FBQTs7UUFDQyxLQUFLLENBQUMsT0FBTixHQUFnQixJQUFDLENBQUEsV0FBVyxDQUFDLFFBQVMsQ0FBQSxDQUFBLENBQUUsQ0FBQztBQUQxQztNQUVBLElBQUMsQ0FBQSxHQUFHLENBQUMsVUFBTCxHQUFrQjthQUNsQixJQUFDLENBQUEsV0FBVyxDQUFDLFdBQWIsQ0FBeUIsS0FBekIsQ0FBK0IsQ0FBQyxPQUFoQyxHQUEwQztJQUp0QyxDQURMO0dBREQ7Ozs7R0ExQzJCOzs7O0FEUzVCLElBQUE7OztBQUFNLE1BQU0sQ0FBQztBQUNaLE1BQUE7Ozs7RUFBQSxRQUFBLEdBQVc7O0VBQ1gsUUFBQSxHQUFXOztBQUVYO0FBQUEsT0FBQSw2Q0FBQTs7SUFDQyxRQUFRLENBQUMsSUFBVCxDQUFjLElBQUksQ0FBQyxJQUFuQjtBQUREOztFQUdhLGNBQUMsR0FBRDtBQUNaLFFBQUE7SUFEYSxJQUFDLENBQUEsb0JBQUQsTUFBTztJQUNwQixzQ0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxHQUFaLEVBQ0w7TUFBQSxLQUFBLEVBQU8sTUFBTSxDQUFDLEtBQWQ7TUFDQSxNQUFBLEVBQVEsUUFBUSxDQUFDLE1BRGpCO01BRUEsZUFBQSxFQUFpQixPQUZqQjtNQUdBLEtBQUEsRUFBTyxRQUhQO0tBREssQ0FBTjtJQU9BLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEtBQWlCLE1BQXBCO01BQ0MsZ0JBQUEsQ0FBaUIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUF0QixFQUE4QixJQUE5QixFQUREOztJQUlBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEtBQWdCLE1BQW5CO01BQ0MsYUFBQSxDQUFjLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBbkIsRUFBMEIsSUFBMUIsRUFERDs7SUFJQSxjQUFBLEdBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQzVCLE9BQUEsR0FBVTtJQUNWLElBQUMsQ0FBQSxTQUFELEdBQWEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsV0FBckIsQ0FBaUMsQ0FBQyxJQUFsQyxDQUFBO0lBQ2IsTUFBQSxHQUFTO0lBR1QsSUFBQyxDQUFBLFdBQUQsR0FBZTtBQUVmO0FBQUEsU0FBQSxnREFBQTs7TUFDQyxXQUFBLEdBQWMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFYLENBQWUsQ0FBQyxJQUFoQixDQUFxQixHQUFyQjtNQUNkLElBQUUsQ0FBQSxFQUFBLEdBQUcsV0FBSCxDQUFGLEdBQTBCLElBQUEsS0FBQSxDQUN6QjtRQUFBLElBQUEsRUFBTSxJQUFOO1FBQ0EsTUFBQSxFQUFRLElBRFI7UUFFQSxLQUFBLEVBQU8sUUFBUSxDQUFDLEtBQVQsR0FBZSxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUZqQztRQUdBLGVBQUEsRUFBaUIsSUFIakI7UUFJQSxDQUFBLEVBQUcsT0FKSDtRQUtBLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFMVDtPQUR5QjtNQVExQixJQUFFLENBQUEsRUFBQSxHQUFHLFdBQUgsQ0FBa0IsQ0FBQSxNQUFBLENBQXBCLEdBQWtDLElBQUEsU0FBQSxDQUNqQztRQUFBLE1BQUEsRUFBUSxJQUFFLENBQUEsRUFBQSxHQUFHLFdBQUgsQ0FBVjtPQURpQztNQUdsQyxJQUFFLENBQUEsRUFBQSxHQUFHLFdBQUgsQ0FBa0IsQ0FBQSxNQUFBLENBQU8sQ0FBQyxLQUE1QixHQUFvQyxRQUFRLENBQUMsV0FBVCxDQUFxQixPQUFyQixDQUE2QixDQUFDLFFBQVMsQ0FBQSxDQUFBLENBQUUsQ0FBQztNQUM5RSxJQUFFLENBQUEsRUFBQSxHQUFHLFdBQUgsQ0FBa0IsQ0FBQSxNQUFBLENBQU8sQ0FBQyxLQUE1QixHQUNDO1FBQUEsSUFBQSxFQUFNLE1BQU47UUFDQSxhQUFBLEVBQWUsV0FEZjtRQUVBLElBQUEsRUFBTSxJQUZOOztNQUdELElBQUUsQ0FBQSxFQUFBLEdBQUcsV0FBSCxDQUFrQixDQUFBLE1BQUEsQ0FBTyxDQUFDLENBQTVCLEdBQWdDLEtBQUssQ0FBQztNQUV0QyxPQUFBLEdBQVUsSUFBRSxDQUFBLEVBQUEsR0FBRyxXQUFILENBQWlCLENBQUM7TUFFOUIsSUFBQyxDQUFBLFdBQVcsQ0FBQyxJQUFiLENBQWtCLElBQUUsQ0FBQSxFQUFBLEdBQUcsV0FBSCxDQUFwQjtBQXRCRDtJQXlCQSxJQUFDLENBQUEsU0FBUyxDQUFDLEtBQVgsR0FDQztNQUFBLE1BQUEsRUFBUSxJQUFSO01BQ0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxXQUFZLENBQUEsQ0FBQSxDQUFFLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDLENBRC9CO01BRUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxXQUFZLENBQUEsQ0FBQSxDQUFFLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBRm5DOztJQUlELElBQUMsQ0FBQSxXQUFELEdBQWUsSUFBQyxDQUFBLFdBQVksQ0FBQSxDQUFBLENBQUUsQ0FBQyxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUM7QUFHM0M7QUFBQSxTQUFBLGdEQUFBOztNQUNDLElBQUMsQ0FBQSxXQUFZLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBaEIsQ0FBc0IsU0FBQTtRQUNyQixNQUFNLENBQUMsV0FBUCxHQUFxQixJQUFDLENBQUEsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDO2VBQ2xDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBakIsQ0FDQztVQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsSUFBUDtVQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBRHBCO1VBRUEsT0FBQSxFQUNDO1lBQUEsS0FBQSxFQUFPLE1BQUEsQ0FBTztjQUFBLE9BQUEsRUFBUyxHQUFUO2FBQVAsQ0FBUDtZQUNBLElBQUEsRUFBTSxHQUROO1dBSEQ7U0FERDtNQUZxQixDQUF0QjtBQUREO0VBekRZOzs7O0dBUFk7Ozs7QURSMUIsSUFBQTs7O0FBQUEsTUFBTSxDQUFDLGlCQUFQLEdBQTJCOztBQUNyQixNQUFNLENBQUM7QUFFWixNQUFBOzs7O0VBQUEsWUFBQSxHQUFlLGdCQUFnQixDQUFDLFdBQWpCLENBQTZCLFFBQTdCOztFQUVGLG1CQUFDLEdBQUQ7SUFBQyxJQUFDLENBQUEsb0JBQUQsTUFBSztJQUNsQixJQUFDLENBQUEsR0FBRCxHQUFPLENBQUMsQ0FBQyxRQUFGLENBQVcsRUFBWCxFQUFlLElBQUMsQ0FBQSxHQUFoQixFQUNOO01BQUEsS0FBQSxFQUFPLFlBQVksQ0FBQyxLQUFwQjtNQUNBLE1BQUEsRUFBUSxZQUFZLENBQUMsTUFEckI7TUFFQSxlQUFBLEVBQXFCLElBQUEsS0FBQSxDQUFNLGFBQU4sQ0FGckI7TUFHQSxJQUFBLEVBQU0sS0FITjtLQURNO0lBS1AsMkNBQU0sSUFBQyxDQUFBLEdBQVA7SUFFQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxLQUFpQixNQUFwQjtNQUNDLGdCQUFBLENBQWlCLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBdEIsRUFBOEIsSUFBOUIsRUFERDs7SUFHQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxLQUFnQixNQUFuQjtNQUNDLGFBQUEsQ0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQW5CLEVBQTBCLElBQTFCLEVBQTZCLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBbEMsRUFERDs7SUFHQSxJQUFDLENBQUEsSUFBRCxHQUFZLElBQUEsS0FBQSxDQUNYO01BQUEsSUFBQSxFQUFNLE9BQU47TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FGUjtNQUdBLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFIVDtNQUlBLGVBQUEsRUFBaUIsU0FKakI7TUFLQSxZQUFBLEVBQWMsRUFMZDtLQURXO0lBUVosSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBYixHQUNDO01BQUEsV0FBQSxFQUFhLENBQWI7TUFDQSxlQUFBLEVBQWlCLFNBRGpCOztJQUdELElBQUMsQ0FBQSxJQUFJLENBQUMsZ0JBQU4sR0FDQztNQUFBLElBQUEsRUFBTSxHQUFOO01BQ0EsS0FBQSxFQUFPLE1BQUEsQ0FBTztRQUFBLE9BQUEsRUFBUyxJQUFUO09BQVAsQ0FEUDs7SUFHRCxJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsS0FBQSxDQUNaO01BQUEsSUFBQSxFQUFNLFFBQU47TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLEtBQUEsRUFBTyxFQUZQO01BRVcsTUFBQSxFQUFRLEVBRm5CO01BR0EsWUFBQSxFQUFjLElBSGQ7TUFJQSxDQUFBLEVBQUcsQ0FKSDtNQUtBLENBQUEsRUFBRyxDQUxIO01BTUEsZUFBQSxFQUFpQixPQU5qQjtLQURZO0lBU2IsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBZCxHQUNDO01BQUEsQ0FBQSxFQUFHLEVBQUg7O0lBQ0QsSUFBQyxDQUFBLEtBQUssQ0FBQyxnQkFBUCxHQUNDO01BQUEsSUFBQSxFQUFNLEdBQU47TUFDQSxLQUFBLEVBQU8sTUFBQSxDQUFPO1FBQUEsT0FBQSxFQUFTLEdBQVQ7T0FBUCxDQURQOztJQUdELElBQUMsQ0FBQSxTQUFELEdBQWlCLElBQUEsS0FBQSxDQUNoQjtNQUFBLElBQUEsRUFBTSxXQUFOO01BQ0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxLQURUO01BRUEsQ0FBQSxFQUFHLEdBRkg7TUFHQSxDQUFBLEVBQUcsR0FISDtNQUlBLEtBQUEsRUFBTyxFQUpQO01BSVcsTUFBQSxFQUFRLEVBSm5CO01BS0EsWUFBQSxFQUFjLEVBTGQ7TUFNQSxlQUFBLEVBQWlCLElBQUMsQ0FBQSxjQU5sQjtNQU9BLE9BQUEsRUFDQztRQUFBLENBQUEsRUFBRyxDQUFIO1FBQ0EsSUFBQSxFQUFNLENBRE47UUFFQSxLQUFBLEVBQU8sa0JBRlA7T0FSRDtLQURnQjtJQXFCakIsSUFBRyxJQUFDLENBQUEsSUFBSjtNQUNDLElBQUMsQ0FBQSxJQUFJLENBQUMsV0FBTixDQUFrQixJQUFsQjtNQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsV0FBUCxDQUFtQixJQUFuQixFQUZEOztJQU1BLElBQUMsQ0FBQSxPQUFELENBQVMsU0FBQTthQUNSLElBQUMsQ0FBQSxLQUFELENBQU8sQ0FBQyxJQUFDLENBQUEsSUFBVCxFQUFlLElBQWY7SUFEUSxDQUFUO0VBeEVZOztFQTRFYixTQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBO0lBQUosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7TUFDSixJQUFDLENBQUEsVUFBRCxHQUFjO2FBQ2QsSUFBQyxDQUFBLGdCQUFELENBQUE7SUFGSSxDQURMO0dBREQ7O0VBS0EsU0FBQyxDQUFBLE1BQUQsQ0FBUSxnQkFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUE7SUFBSixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxlQUFELEdBQW1CO2FBQ25CLElBQUMsQ0FBQSxZQUFELENBQUE7SUFGSSxDQURMO0dBREQ7O0VBTUEsU0FBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQTtJQUFKLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQ0osSUFBQyxDQUFBLEtBQUQsR0FBUztJQURMLENBREw7R0FERDs7c0JBS0EsS0FBQSxHQUFPLFNBQUMsUUFBRCxFQUFXLFFBQVg7SUFDTixJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ1IsUUFBQSxzQkFBVyxXQUFXO0lBRXRCLElBQUcsSUFBQyxDQUFBLElBQUo7TUFDQyxJQUFHLFFBQUg7UUFDQyxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBYyxJQUFkO1FBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQWUsSUFBZixFQUZEO09BQUEsTUFBQTtRQUlDLElBQUMsQ0FBQSxJQUFJLENBQUMsV0FBTixDQUFrQixJQUFsQjtRQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsV0FBUCxDQUFtQixJQUFuQixFQUxEO09BREQ7S0FBQSxNQUFBO01BUUMsSUFBRyxRQUFIO1FBQ0MsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLENBQWMsU0FBZDtRQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUFlLFNBQWYsRUFGRDtPQUFBLE1BQUE7UUFJQyxJQUFDLENBQUEsSUFBSSxDQUFDLFdBQU4sQ0FBa0IsU0FBbEI7UUFDQSxJQUFDLENBQUEsS0FBSyxDQUFDLFdBQVAsQ0FBbUIsU0FBbkIsRUFMRDtPQVJEOztXQWVBLElBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLGlCQUFiLEVBQWdDLElBQUMsQ0FBQSxJQUFqQztFQW5CTTs7c0JBc0JQLGdCQUFBLEdBQWtCLFNBQUE7SUFDakIsSUFBRyxJQUFDLENBQUEsSUFBSjtNQUdDLElBQTBCLElBQUMsQ0FBQSxJQUEzQjtlQUFBLElBQUMsQ0FBQSxJQUFJLENBQUMsV0FBTixDQUFrQixJQUFsQixFQUFBO09BSEQ7O0VBRGlCOztzQkFTbEIsYUFBQSxHQUFlLFNBQUMsRUFBRDtXQUFRLElBQUMsQ0FBQSxFQUFELENBQUksTUFBTSxDQUFDLGlCQUFYLEVBQThCLEVBQTlCO0VBQVI7Ozs7R0EvSGU7Ozs7QURBL0IsTUFBTSxDQUFDLFdBQVAsR0FBcUIsU0FBQyxNQUFELEVBQVMsYUFBVDtBQUNwQixNQUFBO0FBQUE7T0FBQSx1REFBQTs7aUJBQ0MsUUFBUSxDQUFDLE1BQVQsR0FBa0I7QUFEbkI7O0FBRG9COzs7O0FERHJCLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLFNBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxNQUFmOztJQUFlLFNBQU87O0VBQzVDLEtBQUssQ0FBQyxNQUFOLEdBQWUsS0FBSyxDQUFDO1NBQ3JCLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLElBQU4sR0FBYTtBQUZEOzs7O0FESXZCLE9BQU8sQ0FBQyxZQUFSLEdBQXVCLFNBQUMsVUFBRCxFQUFhLEtBQWIsRUFBb0IsSUFBcEI7QUFHdEIsTUFBQTtFQUFBLGFBQUEsR0FBb0IsSUFBQSxLQUFBLENBQ25CO0lBQUEsSUFBQSxFQUFNLGVBQU47SUFDQSxLQUFBLEVBQU8sVUFBVSxDQUFDLEtBRGxCO0lBRUEsTUFBQSxFQUFRLENBRlI7SUFHQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BSFQ7SUFJQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLEVBQWQsQ0FKSDtJQUtBLGVBQUEsRUFBaUIsRUFMakI7SUFNQSxNQUFBLEVBQVEsVUFOUjtHQURtQjtFQVVwQixTQUFBLEdBQVk7QUFFWixPQUFVLHVGQUFWO0lBR0MsR0FBQSxHQUFVLElBQUEsS0FBQSxDQUNUO01BQUEsTUFBQSxFQUFRLGFBQVI7TUFDQSxJQUFBLEVBQU0sYUFBYSxDQUFDLE1BRHBCO01BRUEsWUFBQSxFQUFjLGFBQWEsQ0FBQyxNQUY1QjtNQUdBLENBQUEsRUFBRyxDQUFDLGFBQWEsQ0FBQyxNQUFkLEdBQXVCLEVBQXhCLENBQUEsR0FBOEIsRUFIakM7TUFJQSxJQUFBLEVBQU0sRUFKTjtLQURTO0lBT1YsU0FBQSxHQUNDO01BQUEsR0FBQSxFQUFLLEdBQUw7TUFDQSxNQUFBLEVBQVEsS0FBTSxDQUFBLEVBQUEsQ0FBRyxDQUFDLFVBRGxCOztJQUlELFNBQVMsQ0FBQyxJQUFWLENBQWUsU0FBZjtJQUVBLFdBQUEsR0FBYyxTQUFDLFVBQUQ7QUFDYixVQUFBO0FBQUE7V0FBQSwyQ0FBQTs7UUFDQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU4sR0FBZ0I7UUFDaEIsSUFBRyxVQUFBLEtBQWMsT0FBakI7dUJBQThCLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBTixHQUF3QixXQUF0RDtTQUFBLE1BQUE7dUJBQ0ssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFOLEdBQXdCLFdBRDdCOztBQUZEOztJQURhO0lBT2QsT0FBQSxHQUFVLFVBQVUsQ0FBQyxtQkFBWCxDQUErQixVQUFVLENBQUMsV0FBMUM7SUFFVixXQUFBLENBQVksU0FBVSxDQUFBLE9BQUEsQ0FBUSxDQUFDLE1BQS9CO0lBRUEsU0FBVSxDQUFBLE9BQUEsQ0FBUSxDQUFDLEdBQUcsQ0FBQyxPQUF2QixHQUFpQztBQTVCbEM7RUErQkEsYUFBYSxDQUFDLEtBQWQsR0FBc0IsU0FBUyxDQUFDLE1BQVYsR0FBbUIsQ0FBQyxhQUFhLENBQUMsTUFBZCxHQUF1QixFQUF4QjtFQUN6QyxhQUFhLENBQUMsSUFBZCxHQUFxQixNQUFNLENBQUM7U0FHNUIsVUFBVSxDQUFDLEVBQVgsQ0FBYyxvQkFBZCxFQUFvQyxTQUFDLEtBQUQsRUFBUSxLQUFSO0lBRW5DLE9BQUEsR0FBVSxLQUFLLENBQUMsbUJBQU4sQ0FBMEIsS0FBSyxDQUFDLFdBQWhDO0lBRVYsV0FBQSxDQUFZLFNBQVUsQ0FBQSxPQUFBLENBQVEsQ0FBQyxNQUEvQjtXQUVBLFNBQVUsQ0FBQSxPQUFBLENBQVEsQ0FBQyxHQUFHLENBQUMsT0FBdkIsR0FBaUM7RUFORSxDQUFwQztBQWxEc0I7Ozs7QURMdkIsT0FBTyxDQUFDLGVBQVIsR0FBMEIsU0FBQyxJQUFEO0VBRXpCLElBQUcsSUFBSSxDQUFDLE1BQUwsSUFBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFaLEtBQW9CLFNBQXZDO0lBQ0MsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBL0IsS0FBdUMsaUJBQTFDO2FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBbkIsQ0FBc0IsTUFBTSxDQUFDLElBQTdCLEVBQW1DLFNBQUMsS0FBRCxFQUFRLEtBQVI7QUFDbEMsWUFBQTtRQUFBLENBQUEsR0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQVosR0FBZ0IsSUFBSSxDQUFDO2VBQ3pCLElBQUksQ0FBQyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLENBQUMsQ0FBMUIsR0FBOEIsS0FBSyxDQUFDLFFBQU4sQ0FDN0IsQ0FENkIsRUFFN0IsQ0FBQyxDQUFELEVBQUksQ0FBQyxHQUFMLENBRjZCLEVBRzdCLENBQUMsQ0FBRCxFQUFJLEdBQUosQ0FINkI7TUFGSSxDQUFuQyxFQURGO0tBQUEsTUFRSyxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUEvQixLQUF1QyxlQUExQztNQUNKLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQTdCO1FBQ0MsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBcEQsS0FBNEQsaUJBQS9EO2lCQUNDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQXhDLENBQTJDLE1BQU0sQ0FBQyxJQUFsRCxFQUF3RCxTQUFDLEtBQUQsRUFBUSxLQUFSO0FBQ3ZELGdCQUFBO1lBQUEsQ0FBQSxHQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBakMsR0FBcUMsSUFBSSxDQUFDO21CQUM5QyxJQUFJLENBQUMsV0FBTCxDQUFpQixPQUFqQixDQUF5QixDQUFDLENBQTFCLEdBQThCLEtBQUssQ0FBQyxRQUFOLENBQzdCLENBRDZCLEVBRTdCLENBQUMsQ0FBRCxFQUFJLENBQUMsR0FBTCxDQUY2QixFQUc3QixDQUFDLENBQUQsRUFBSSxHQUFKLENBSDZCO1VBRnlCLENBQXhELEVBREQ7U0FERDtPQURJO0tBVE47O0FBRnlCOzs7O0FEQTFCLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLFNBQUMsS0FBRCxFQUFRLFVBQVI7QUFFcEIsTUFBQTs7SUFGNEIsYUFBYTs7RUFFekMsSUFBRyxLQUFLLENBQUMsTUFBTixLQUFnQixDQUFuQjtBQUNDLFdBQU8sR0FEUjs7RUFHQSxJQUFHLEtBQUssQ0FBQyxNQUFOLEdBQWUsQ0FBbEI7SUFDQyxjQUFBLEdBQWlCLEtBQUssQ0FBQyxNQUFOLENBQWEsU0FBQyxLQUFEO2FBQVcsS0FBSyxDQUFDLEtBQU4sS0FBZSxVQUFmLElBQTZCLEtBQUssQ0FBQyxJQUFOLEtBQWM7SUFBdEQsQ0FBYjtJQUVqQixJQUFHLGNBQWMsQ0FBQyxNQUFmLEdBQXdCLENBQTNCO01BQ0MsYUFBQSxHQUFnQixjQUFlLENBQUEsQ0FBQSxFQURoQztLQUFBLE1BQUE7TUFHQyxhQUFBLEdBQWdCLEtBQU0sQ0FBQSxDQUFBLEVBSHZCO0tBSEQ7R0FBQSxNQUFBO0lBUUMsYUFBQSxHQUFnQixLQUFNLENBQUEsQ0FBQSxFQVJ2Qjs7QUFVQSxTQUFPLGFBQWEsQ0FBQztBQWZEOzs7O0FEQ3JCLE1BQU0sQ0FBQyxnQkFBUCxHQUEwQixTQUFDLE1BQUQsRUFBUyxLQUFUO0VBR3pCLEtBQUssQ0FBQyxDQUFOLEdBQVUsTUFBTSxDQUFDO0VBQ2pCLEtBQUssQ0FBQyxDQUFOLEdBQVUsTUFBTSxDQUFDO0VBQ2pCLEtBQUssQ0FBQyxJQUFOLEdBQWEsTUFBTSxDQUFDO0VBQ3BCLEtBQUssQ0FBQyxNQUFOLEdBQWUsTUFBTSxDQUFDO1NBQ3RCLE1BQU0sQ0FBQyxPQUFQLENBQUE7QUFQeUI7Ozs7QUREMUIsSUFBQTs7O0FBQU0sTUFBTSxDQUFDO0FBRVosTUFBQTs7OztFQUFhLHdCQUFDLEdBQUQ7QUFDWixRQUFBO0lBRGEsSUFBQyxDQUFBLG9CQUFELE1BQU87SUFDcEIsZ0RBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsR0FBWixFQUNMO01BQUEsS0FBQSxFQUFPLE1BQU0sQ0FBQyxLQUFkO01BQ0EsTUFBQSxFQUFRLE1BQU0sQ0FBQyxNQURmO01BRUEsZUFBQSxFQUFpQixPQUZqQjtNQUdBLE9BQUEsRUFBUywrQ0FIVDtNQUlBLE9BQUEsRUFBUztRQUNSLE9BQUEsRUFBUyxTQUFBO2lCQUFHLEtBQUEsQ0FBTSxNQUFOO1FBQUgsQ0FERDtPQUpUO0tBREssQ0FBTjtJQVNBLElBQUMsQ0FBQSxNQUFELEdBQWMsSUFBQSxNQUFBLENBQ2I7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUNBLENBQUE7QUFBRyxnQkFBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQXJCO0FBQUEsZUFDRywyQkFESDtBQUFBLGVBQ2dDLHVCQURoQzttQkFDNkQ7QUFEN0Q7bUJBRUc7QUFGSDtVQURIO01BSUEsSUFBQSxFQUFNLG1CQUpOO01BS0EsS0FBQSxFQUFPLFlBTFA7TUFNQSxRQUFBLEVBQVUsV0FOVjtLQURhO0lBU2QsSUFBQyxDQUFBLElBQUQsR0FBWSxJQUFBLElBQUEsQ0FDWDtNQUFBLElBQUEsRUFBTSxNQUFOO01BQ0EsTUFBQSxFQUFRLElBRFI7TUFFQSxDQUFBLEVBQUcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLEdBQWUsUUFGbEI7S0FEVztJQUtaLElBQUMsQ0FBQSxjQUFELEdBQXNCLElBQUEsZUFBQSxDQUNyQjtNQUFBLElBQUEsRUFBTSxpQkFBTjtNQUNBLE1BQUEsRUFBUSxJQURSO01BRUEsQ0FBQSxFQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixHQUFhLFFBRmhCO01BR0EsZ0JBQUEsRUFBa0IsS0FIbEI7TUFJQSxLQUFBLEVBQU8sTUFBTSxDQUFDLEtBSmQ7TUFLQSxNQUFBLEVBQVEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsSUFBQyxDQUFBLElBQUksQ0FBQyxJQUF0QixHQUE2QixRQUxyQztLQURxQjtJQVF0QixhQUFBLEdBQWdCLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBSyxDQUFDLGVBQU4sQ0FBdUIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxPQUE1QixDQUFYO0lBRWhCLFNBQUEsQ0FBVSxJQUFWLEVBQWEsYUFBYSxDQUFDLEtBQTNCO0FBR0E7QUFBQSxTQUFBLHFDQUFBOztNQUNDLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO0FBQ1YsY0FBQTtBQUFBO0FBQUEsZUFBQSx3Q0FBQTs7WUFDQyxLQUFLLENBQUMsT0FBTixDQUFBO0FBREQ7QUFHQSxrQkFBTyxLQUFDLENBQUEsSUFBSSxDQUFDLFdBQWI7QUFBQSxpQkFDTSxPQUROO3FCQUVFLFNBQUEsQ0FBVSxLQUFWLEVBQWEsYUFBYSxDQUFDLEtBQTNCO0FBRkYsaUJBR00sS0FITjtxQkFJRSxTQUFBLENBQVUsS0FBVixFQUFhLGFBQWEsQ0FBQyxHQUEzQjtBQUpGLGlCQUtNLE1BTE47cUJBTUUsU0FBQSxDQUFVLEtBQVYsRUFBYSxhQUFhLENBQUMsSUFBM0I7QUFORjtRQUpVO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFYO0FBREQ7RUFyQ1k7O0VBbURiLFNBQUEsR0FBWSxTQUFDLE1BQUQsRUFBUyxVQUFUO0FBQ1gsUUFBQTtBQUFBO1NBQUEsNENBQUE7O01BQ0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFRLENBQUEsRUFBQSxHQUFHLEtBQUssQ0FBQyxFQUFULENBQTlCLEdBQW1ELElBQUEsUUFBQSxDQUNsRDtRQUFBLElBQUEsRUFBTSxLQUFLLENBQUMsRUFBWjtRQUNBLE1BQUEsRUFBUSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BRDlCO1FBRUEsSUFBQSxFQUFNLEtBQUssQ0FBQyxJQUZaO1FBR0EsS0FBQSxFQUFPLGFBSFA7T0FEa0Q7TUFNbkQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFRLENBQUEsRUFBQSxHQUFHLEtBQUssQ0FBQyxFQUFULENBQWMsQ0FBQyxDQUE3QyxHQUFpRDtNQUNqRCxRQUFBLEdBQVcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFRLENBQUEsRUFBQSxHQUFHLEtBQUssQ0FBQyxFQUFULENBQWMsQ0FBQzttQkFFeEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFRLENBQUEsRUFBQSxHQUFHLEtBQUssQ0FBQyxFQUFULENBQWMsQ0FBQyxLQUE3QyxDQUFtRCxTQUFBO1FBQ2xELElBQUcsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQVEsQ0FBQSxFQUFBLEdBQUcsSUFBQyxDQUFBLElBQUosQ0FBMUIsS0FBeUMsVUFBNUM7aUJBQ0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFRLENBQUEsRUFBQSxHQUFHLElBQUMsQ0FBQSxJQUFKLENBQW5CLENBQUEsRUFERDs7TUFEa0QsQ0FBbkQ7QUFWRDs7RUFEVzs7OztHQXJEdUI7Ozs7QURBcEMsSUFBQTs7O0FBQU0sTUFBTSxDQUFDOzs7RUFFQyx1QkFBQyxHQUFEO0FBQ1osUUFBQTtJQURhLElBQUMsQ0FBQSxvQkFBRCxNQUFPO0lBQ3BCLCtDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLEdBQVosRUFDTDtNQUFBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FBZDtNQUNBLE1BQUEsRUFBUSxNQUFNLENBQUMsTUFEZjtNQUVBLGVBQUEsRUFBaUIsT0FGakI7TUFHQSxPQUFBLEVBQVMsOENBSFQ7TUFJQSxPQUFBLEVBQVM7UUFDUixTQUFBLEVBQVcsU0FBQTtpQkFBRyxLQUFBLENBQU0sTUFBTjtRQUFILENBREg7UUFFUixRQUFBLEVBQVUsU0FBQTtpQkFBRyxLQUFBLENBQU0sa0JBQU47UUFBSCxDQUZGO09BSlQ7S0FESyxDQUFOO0lBVUEsVUFBQSxHQUFhLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBSyxDQUFDLGVBQU4sQ0FBc0IsSUFBQyxDQUFBLEdBQUcsQ0FBQyxPQUEzQixDQUFYO0lBQ2IsUUFBQSxHQUFXLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBakIsQ0FBd0IsVUFBVSxDQUFDLEdBQW5DLEVBQXdDLFVBQVUsQ0FBQyxJQUFuRDtJQUdYLFVBQUEsR0FBYTtBQUNiLFNBQUEsMENBQUE7O01BQ0MsSUFBRyxLQUFBLENBQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFYLENBQWtCLENBQWxCLENBQU4sQ0FBSDtRQUNDLFVBQVUsQ0FBQyxJQUFYLENBQWdCLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBWCxDQUFrQixDQUFsQixDQUFoQixFQUREOztBQUREO0lBSUEsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsU0FBQyxDQUFELEVBQUksQ0FBSjthQUNmLENBQUEsR0FBSTtJQURXLENBQWhCO0lBR0EsVUFBVSxDQUFDLEtBQVgsQ0FBQTtJQUNBLFVBQVUsQ0FBQyxJQUFYLENBQWdCLEdBQWhCO0lBQ0EsVUFBQSxHQUFhLENBQUMsQ0FBQyxJQUFGLENBQU8sVUFBUDtJQUdiLElBQUMsQ0FBQSxNQUFELEdBQWMsSUFBQSxNQUFBLENBQ2I7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUNBLENBQUE7QUFBRyxnQkFBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQXJCO0FBQUEsZUFDRywyQkFESDtBQUFBLGVBQ2dDLHVCQURoQzttQkFDNkQ7QUFEN0Q7bUJBRUc7QUFGSDtVQURIO01BSUEsSUFBQSxFQUFNLG1CQUpOO01BS0EsS0FBQSxFQUFPLFdBTFA7TUFNQSxRQUFBLEVBQVUsV0FOVjtLQURhO0lBU2QsSUFBQyxDQUFBLFVBQUQsR0FBa0IsSUFBQSxLQUFBLENBQ2pCO01BQUEsTUFBQSxFQUFRLElBQVI7TUFDQSxJQUFBLEVBQU0sYUFETjtNQUVBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FGUjtNQUdBLE1BQUEsRUFBUSxhQUFhLENBQUMsTUFIdEI7TUFJQSxDQUFBLEVBQUcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUpYO01BS0EsZUFBQSxFQUFpQixPQUxqQjtLQURpQjtJQVFsQixJQUFDLENBQUEsU0FBRCxHQUFhLGFBQWEsQ0FBQyxXQUFkLENBQTBCLGVBQTFCLENBQTBDLENBQUMsSUFBM0MsQ0FBQTtJQUNiLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxHQUNDO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxVQUFUO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFOLENBQUEsQ0FESDtNQUVBLENBQUEsRUFBRyxRQUZIOztJQUlELElBQUMsQ0FBQSxTQUFTLENBQUMsV0FBWCxDQUF1QixvQkFBdkIsQ0FBNEMsQ0FBQyxLQUE3QyxHQUFxRCxJQUFDLENBQUEsU0FBUyxDQUFDLFdBQVgsQ0FBdUIsb0JBQXZCLENBQTRDLENBQUMsS0FBN0MsR0FBcUQ7SUFFMUcsSUFBQyxDQUFBLFNBQUQsR0FBaUIsSUFBQSxlQUFBLENBQ2hCO01BQUEsTUFBQSxFQUFRLElBQVI7TUFDQSxJQUFBLEVBQU0sYUFETjtNQUVBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FGUjtNQUdBLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFIMUI7TUFJQSxDQUFBLEVBQUcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUpYO01BS0EsZ0JBQUEsRUFBa0IsS0FMbEI7TUFNQSxZQUFBLEVBQ0M7UUFBQSxHQUFBLEVBQUssSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLEdBQXFCLFNBQTFCO09BUEQ7S0FEZ0I7SUFVakIsSUFBQyxDQUFDLEVBQUYsQ0FBSyxjQUFMLEVBQXFCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUNwQixLQUFDLENBQUEsU0FBUyxDQUFDLFlBQVgsR0FDQztVQUFBLEdBQUEsRUFBSyxLQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBcUIsU0FBMUI7O2VBRUQsS0FBQyxDQUFBLFNBQVMsQ0FBQyxXQUFYLEdBQ0M7VUFBQSxDQUFBLEVBQUcsS0FBQyxDQUFBLFdBQVcsQ0FBQyxNQUFoQjs7TUFMbUI7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXJCO0lBT0EsSUFBQyxDQUFBLFdBQUQsR0FBbUIsSUFBQSxXQUFBLENBQ2xCO01BQUEsSUFBQSxFQUFNLGNBQU47TUFDQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxPQURuQjtNQUVBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FBUCxHQUFlLFFBRnRCO01BR0EsQ0FBQSxFQUFHLFNBSEg7TUFJQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBQSxDQUpIO01BS0EsV0FBQSxFQUFhLHVCQUxiO0tBRGtCO0lBUW5CLElBQUMsQ0FBQSxTQUFTLENBQUMsV0FBWCxHQUNDO01BQUEsQ0FBQSxFQUFHLElBQUMsQ0FBQSxXQUFXLENBQUMsTUFBaEI7O0lBRUQsSUFBQyxDQUFBLFVBQVUsQ0FBQyxZQUFaLENBQUE7SUFFQSxXQUFBLEdBQWM7QUFFZCxTQUFBLHNEQUFBOztNQUNDLElBQUUsQ0FBRyxJQUFELEdBQU0sUUFBUixDQUFGLEdBQXlCLElBQUEsS0FBQSxDQUN4QjtRQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsU0FBUyxDQUFDLE9BQW5CO1FBQ0EsSUFBQSxFQUFTLElBQUQsR0FBTSxRQURkO1FBRUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUZSO1FBR0EsTUFBQSxFQUFRLEVBSFI7UUFJQSxlQUFBLEVBQWlCLE9BSmpCO09BRHdCO01BT3pCLElBQUUsQ0FBRyxJQUFELEdBQU0sU0FBUixDQUFGLEdBQTBCLElBQUEsS0FBQSxDQUN6QjtRQUFBLElBQUEsRUFBUyxJQUFELEdBQU0sU0FBZDtRQUNBLE1BQUEsRUFBUSxJQUFDLENBQUEsU0FBUyxDQUFDLE9BRG5CO1FBRUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUZSO09BRHlCO01BSzFCLFdBQVcsQ0FBQyxJQUFaLENBQWlCLElBQUUsQ0FBRyxJQUFELEdBQU0sU0FBUixDQUFuQjtNQUVBLFlBQUEsR0FBbUIsSUFBQSxTQUFBLENBQ2xCO1FBQUEsQ0FBQSxFQUFHLFFBQUg7UUFBYSxDQUFBLEVBQUcsUUFBaEI7UUFDQSxNQUFBLEVBQVEsSUFBRSxDQUFHLElBQUQsR0FBTSxRQUFSLENBRFY7UUFFQSxJQUFBLEVBQU0sSUFGTjtRQUdBLGFBQUEsRUFBZSxXQUhmO1FBSUEsVUFBQSxFQUFZLGNBSlo7UUFLQSxLQUFBLEVBQU8sU0FMUDtRQU1BLFFBQUEsRUFBVSxFQU5WO09BRGtCO0FBZnBCO0lBd0JBLFVBQUEsR0FBYTtBQUViLFNBQUEsb0RBQUE7O0FBQ0MsV0FBQSw4Q0FBQTs7UUFDQyxJQUFHLENBQUEsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQVgsQ0FBa0IsQ0FBbEIsQ0FBUjtVQUNDLElBQUUsQ0FBQSxFQUFBLEdBQUcsS0FBSyxDQUFDLEVBQVQsQ0FBRixHQUF1QixJQUFBLFFBQUEsQ0FDdEI7WUFBQSxJQUFBLEVBQU0sRUFBQSxHQUFHLEtBQUssQ0FBQyxFQUFmO1lBQ0EsTUFBQSxFQUFRLElBQUUsQ0FBRyxDQUFELEdBQUcsU0FBTCxDQURWO1lBRUEsSUFBQSxFQUFNLEtBQUssQ0FBQyxJQUZaO1dBRHNCO1VBS3ZCLFVBQVUsQ0FBQyxJQUFYLENBQWdCLElBQUUsQ0FBQSxFQUFBLEdBQUcsS0FBSyxDQUFDLEVBQVQsQ0FBbEIsRUFORDs7QUFERDtNQVNBLElBQUcsQ0FBQyxLQUFBLENBQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFYLENBQWtCLENBQWxCLENBQU4sQ0FBSjtRQUNDLElBQUUsQ0FBQSxFQUFBLEdBQUcsS0FBSyxDQUFDLEVBQVQsQ0FBRixHQUF1QixJQUFBLFFBQUEsQ0FDdEI7VUFBQSxJQUFBLEVBQU0sRUFBQSxHQUFHLEtBQUssQ0FBQyxFQUFmO1VBQ0EsTUFBQSxFQUFRLElBQUUsQ0FBQSxVQUFBLENBRFY7VUFFQSxJQUFBLEVBQU0sS0FBSyxDQUFDLElBRlo7U0FEc0I7UUFLdkIsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsSUFBRSxDQUFBLEVBQUEsR0FBRyxLQUFLLENBQUMsRUFBVCxDQUFsQixFQU5EOztBQVZEO0lBa0JBLFVBQUEsR0FBYSxJQUFDLENBQUEsR0FBRyxDQUFDO0FBQ2xCLFNBQUEsc0RBQUE7O01BQ0MsS0FBSyxDQUFDLEtBQU4sQ0FBWSxTQUFBO1FBQ1gsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsSUFBYjtRQUNBLElBQUcsT0FBTyxVQUFXLENBQUEsRUFBQSxHQUFHLElBQUMsQ0FBQSxJQUFKLENBQWxCLEtBQWlDLFVBQXBDO2lCQUNDLFVBQVcsQ0FBQSxFQUFBLEdBQUcsSUFBQyxDQUFBLElBQUosQ0FBWCxDQUFBLEVBREQ7O01BRlcsQ0FBWjtBQUREO0FBTUEsU0FBQSx1REFBQTs7TUFDQyxNQUFBLEdBQVM7QUFDVDtBQUFBLFdBQUEsK0NBQUE7O1FBQ0MsQ0FBQyxDQUFDLENBQUYsR0FBTTtRQUNOLE1BQUEsR0FBUyxDQUFDLENBQUM7QUFGWjtNQUlBLElBQUksQ0FBQyxNQUFMLEdBQWMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFkLENBQW9CLENBQUMsQ0FBckIsQ0FBd0IsQ0FBQSxDQUFBLENBQUUsQ0FBQztBQU4xQztJQVFBLFdBQUEsR0FBYyxRQUFBLEdBQVc7QUFFekI7QUFBQSxTQUFBLGdEQUFBOztNQUNDLElBQUksQ0FBQyxDQUFMLEdBQVM7TUFDVCxPQUFBLEdBQVUsSUFBSSxDQUFDO0FBRmhCO0lBSUEsSUFBQyxDQUFBLFlBQUQsR0FBb0IsSUFBQSxTQUFBLENBQ25CO01BQUEsSUFBQSxFQUFNLGNBQU47TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBTixDQUFBLENBRkg7TUFHQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBQSxDQUhIO01BSUEsU0FBQSxFQUFXLFFBSlg7TUFLQSxJQUFBLEVBQU0sRUFBQSxHQUFFLENBQUMsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsR0FBaEIsQ0FBRCxDQUxSO01BTUEsUUFBQSxFQUFVLEVBTlY7TUFPQSxLQUFBLEVBQU8sRUFQUDtNQVFBLGFBQUEsRUFBZSxXQVJmO0tBRG1CO0lBWXBCLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsS0FBQSxDQUNqQjtNQUFBLE1BQUEsRUFBUSxJQUFSO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQURSO01BRUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUZUO01BR0EsZUFBQSxFQUFpQixPQUhqQjtLQURpQjtJQU1sQixJQUFDLENBQUEsVUFBVSxDQUFDLENBQVosR0FBZ0IsS0FBSyxDQUFDLE1BQU4sQ0FBYSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQXpCO0lBRWhCLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixHQUNDO01BQUEsTUFBQSxFQUNDO1FBQUEsQ0FBQSxFQUFHLENBQUg7T0FERDtNQUVBLGdCQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU0sR0FBTjtRQUNBLEtBQUEsRUFBTyxNQUFBLENBQU87VUFBQSxPQUFBLEVBQVMsR0FBVDtTQUFQLENBRFA7T0FIRDs7SUFNRCxJQUFDLENBQUEsZ0JBQUQsR0FBd0IsSUFBQSxNQUFBLENBQ3ZCO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxVQUFUO01BQ0EsUUFBQSxFQUFVLFdBRFY7TUFFQSxLQUFBLEVBQU8sUUFGUDtNQUdBLENBQUE7QUFBRyxnQkFBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQXJCO0FBQUEsZUFDRywyQkFESDtBQUFBLGVBQ2dDLHVCQURoQzttQkFDNkQ7QUFEN0Q7bUJBRUc7QUFGSDtVQUhIO0tBRHVCO0lBUXhCLElBQUMsQ0FBQSxZQUFELEdBQW9CLElBQUEsZUFBQSxDQUNuQjtNQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsVUFBVDtNQUNBLGdCQUFBLEVBQWtCLEtBRGxCO01BRUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUZSO01BR0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUFELEdBQVUsQ0FBQyxJQUFDLENBQUEsZ0JBQWdCLENBQUMsSUFBbEIsR0FBeUIsUUFBMUIsQ0FIbEI7TUFJQSxDQUFBLEVBQUcsSUFBQyxDQUFBLGdCQUFnQixDQUFDLElBQWxCLEdBQXlCLFFBSjVCO0tBRG1CO0lBT3BCLElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsU0FBQSxDQUNsQjtNQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsWUFBWSxDQUFDLE9BQXRCO01BQ0EsSUFBQSxFQUFNLFFBRE47S0FEa0I7SUFJbkIsSUFBQyxDQUFBLGlCQUFELEdBQXlCLElBQUEsZUFBQSxDQUN4QjtNQUFBLENBQUEsRUFBRyxJQUFDLENBQUEsV0FBVyxDQUFDLElBQWhCO01BQ0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxZQUFZLENBQUMsT0FEdEI7TUFFQSxXQUFBLEVBQWE7UUFDWjtVQUFDLElBQUEsRUFBTyxPQUFSO1VBQWlCLEVBQUEsRUFBSSxJQUFyQjtTQURZLEVBRVo7VUFBQyxJQUFBLEVBQU8sS0FBUjtTQUZZLEVBR1o7VUFBQyxJQUFBLEVBQU0sTUFBUDtTQUhZO09BRmI7S0FEd0I7SUFTekIsSUFBQyxDQUFBLGNBQUQsR0FBc0IsSUFBQSxTQUFBLENBQ3JCO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxZQUFZLENBQUMsT0FBdEI7TUFDQSxJQUFBLEVBQU0sV0FETjtNQUVBLENBQUEsRUFBRyxJQUFDLENBQUEsaUJBQWlCLENBQUMsSUFBbkIsR0FBMEIsUUFGN0I7S0FEcUI7SUFLdEIsSUFBQyxDQUFBLFdBQUQsR0FBbUIsSUFBQSxRQUFBLENBQ2xCO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxZQUFZLENBQUMsT0FBdEI7TUFDQSxDQUFBLEVBQUcsSUFBQyxDQUFBLGNBQWMsQ0FBQyxJQURuQjtNQUVBLEtBQUEsRUFBTyxZQUZQO01BR0EsSUFBQSxFQUFNLGdCQUhOO0tBRGtCO0lBTW5CLElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsUUFBQSxDQUNsQjtNQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsWUFBWSxDQUFDLE9BQXRCO01BQ0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxXQUFXLENBQUMsSUFEaEI7TUFFQSxJQUFBLEVBQU0sV0FGTjtLQURrQjtJQUtuQixJQUFDLENBQUEsV0FBRCxHQUFtQixJQUFBLFFBQUEsQ0FDbEI7TUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFlBQVksQ0FBQyxPQUF0QjtNQUNBLENBQUEsRUFBRyxJQUFDLENBQUEsV0FBVyxDQUFDLElBRGhCO01BRUEsSUFBQSxFQUFNLHFCQUZOO0tBRGtCO0lBS25CLElBQUMsQ0FBQSxRQUFELEdBQWdCLElBQUEsV0FBQSxDQUNmO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxVQUFUO01BQ0EsSUFBQSxFQUFNLGdCQUROO0tBRGU7SUFJaEIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBcEIsR0FBNEI7SUFDNUIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBcEIsR0FBd0IsS0FBSyxDQUFDLE1BQU4sQ0FBQTtJQUd4QixJQUFDLENBQUEsU0FBUyxDQUFDLEtBQVgsQ0FBaUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQ2hCLEtBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixDQUFvQixRQUFwQjtNQURnQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBakI7SUFHQSxJQUFDLENBQUEsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLEtBQWpDLENBQXVDLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUN0QyxLQUFDLENBQUEsVUFBVSxDQUFDLE9BQVosQ0FBb0IsU0FBcEI7TUFEc0M7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXZDO0VBN09ZOzs7O0dBRnFCOzs7Ozs7O0FEWW5DLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O0VBQ0MscUJBQUMsR0FBRDtBQUNaLFFBQUE7SUFEYSxJQUFDLENBQUEsb0JBQUQsTUFBSztJQUNsQixJQUFDLENBQUEsR0FBRCxHQUFPLENBQUMsQ0FBQyxRQUFGLENBQVcsRUFBWCxFQUFlLElBQUMsQ0FBQSxHQUFoQixFQUlOO01BQUEsS0FBQSxFQUFPLFNBQVA7S0FKTTtJQU9QLFNBQUEsR0FBWSxJQUFDLENBQUEsR0FBRyxDQUFDO0lBQ2pCLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBTCxHQUFpQjtJQUVqQiw2Q0FBTSxJQUFDLENBQUEsR0FBUDtJQUNBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEtBQWlCLE1BQXBCO01BQ0MsZ0JBQUEsQ0FBaUIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUF0QixFQUE4QixJQUE5QixFQUREOztJQUdBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEtBQWdCLE1BQW5CO01BQ0MsYUFBQSxDQUFjLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBbkIsRUFBMEIsSUFBMUIsRUFBNkIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUFsQyxFQUREOztJQUlBLElBQUMsQ0FBQSxTQUFELEdBQWE7RUFuQkQ7O0VBcUJiLFdBQUMsQ0FBQSxNQUFELENBQVEsV0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUE7SUFBSixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxVQUFELEdBQWM7YUFDZCxJQUFDLENBQUEsWUFBRCxDQUFBO0lBRkksQ0FETDtHQUREOzt3QkFNQSxZQUFBLEdBQWMsU0FBQTtBQUNiLFFBQUE7SUFBQSxNQUFBLEdBQ0M7TUFBQSxNQUFBLEVBQ0M7UUFBQSxRQUFBLEVBQVUsRUFBVjtRQUVBLFVBQUEsRUFBWSxHQUZaO1FBR0EsVUFBQSxFQUFZLFNBSFo7T0FERDtNQUtBLENBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxFQUFWO1FBRUEsVUFBQSxFQUFZLEdBRlo7UUFHQSxVQUFBLEVBQVksU0FIWjtPQU5EO01BVUEsS0FBQSxFQUNDO1FBQUEsUUFBQSxFQUFVLEVBQVY7UUFFQSxVQUFBLEVBQVksR0FGWjtRQUdBLFVBQUEsRUFBWSxTQUhaO09BWEQ7TUFlQSxDQUFBLEVBQ0M7UUFBQSxRQUFBLEVBQVUsRUFBVjtRQUVBLFVBQUEsRUFBWSxHQUZaO1FBR0EsVUFBQSxFQUFZLFNBSFo7T0FoQkQ7TUFvQkEsS0FBQSxFQUNDO1FBQUEsUUFBQSxFQUFVLEVBQVY7UUFFQSxVQUFBLEVBQVksR0FGWjtRQUdBLGFBQUEsRUFBZSxHQUhmO1FBSUEsVUFBQSxFQUFZLG1CQUpaO1FBS0EsYUFBQSxFQUFlLFdBTGY7T0FyQkQ7TUEyQkEsS0FBQSxFQUNDO1FBQUEsUUFBQSxFQUFVLEVBQVY7UUFFQSxVQUFBLEVBQVksR0FGWjtRQUdBLFVBQUEsRUFBWSxTQUhaO09BNUJEO01BZ0NBLEtBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxFQUFWO1FBRUEsVUFBQSxFQUFZLEdBRlo7UUFHQSxVQUFBLEVBQVksU0FIWjtPQWpDRDtNQXFDQSxDQUFBLEVBQ0M7UUFBQSxRQUFBLEVBQVUsRUFBVjtRQUVBLFVBQUEsRUFBWSxHQUZaO1FBR0EsVUFBQSxFQUFZLFNBSFo7T0F0Q0Q7TUEwQ0EsTUFBQSxFQUNDO1FBQUEsUUFBQSxFQUFVLEVBQVY7UUFFQSxVQUFBLEVBQVksR0FGWjtRQUdBLFVBQUEsRUFBWSxTQUhaO09BM0NEO01BK0NBLEVBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxFQUFWO1FBRUEsVUFBQSxFQUFZLEdBRlo7UUFHQSxVQUFBLEVBQVksU0FIWjtPQWhERDs7V0FxREQsSUFBQyxDQUFBLEtBQUQsR0FBUyxNQUFPLENBQUEsSUFBQyxDQUFBLFNBQUQ7RUF2REg7Ozs7R0E1QmtCOzs7O0FEWmpDLElBQUE7O0FBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBcEIsQ0FBQTs7QUFHQSxzQkFBQSxHQUF5QixTQUFBO0VBQ3hCLGdCQUFnQixDQUFDLE9BQWpCLENBQUE7RUFDQSxXQUFXLENBQUMsT0FBWixDQUFBO1NBQ0EsaUJBQWlCLENBQUMsT0FBbEIsQ0FBQTtBQUh3Qjs7QUFNekIsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsU0FBQTtTQUNmLHNCQUFBLENBQUE7QUFEZTs7QUFJaEIsTUFBTSxDQUFDLG1CQUFQLEdBQTZCOztBQUM3QixNQUFNLENBQUMsb0JBQVAsR0FBOEI7O0FBQzlCLE1BQU0sQ0FBQyxpQkFBUCxHQUEyQjs7QUFHM0IsTUFBTSxDQUFDLENBQVAsR0FBVzs7QUFHWCxPQUFBLENBQVEsb0NBQVI7O0FBQ0EsT0FBQSxDQUFRLHlDQUFSOztBQUNBLE9BQUEsQ0FBUSxzQ0FBUjs7QUFHQSxNQUFNLENBQUMsY0FBUCxHQUF3QixDQUN2QixxREFEdUIsRUFFdkIscURBRnVCLEVBR3ZCLHFEQUh1QixFQUl2QixxREFKdUIsRUFLdkIscURBTHVCLEVBTXZCLHFEQU51QixFQU92QixxREFQdUI7Ozs7QUQxQnhCLE1BQU0sQ0FBQyxRQUFQLEdBQWtCLGVBQWUsQ0FBQyxXQUFoQixDQUE0QixHQUE1QixDQUFnQyxDQUFDOztBQUNuRCxNQUFNLENBQUMsUUFBUCxHQUFrQixlQUFlLENBQUMsV0FBaEIsQ0FBNEIsR0FBNUIsQ0FBZ0MsQ0FBQzs7QUFDbkQsTUFBTSxDQUFDLFFBQVAsR0FBa0IsZUFBZSxDQUFDLFdBQWhCLENBQTRCLEdBQTVCLENBQWdDLENBQUM7O0FBQ25ELE1BQU0sQ0FBQyxTQUFQLEdBQW1CLGVBQWUsQ0FBQyxXQUFoQixDQUE0QixJQUE1QixDQUFpQyxDQUFDOztBQUNyRCxNQUFNLENBQUMsVUFBUCxHQUFvQixlQUFlLENBQUMsV0FBaEIsQ0FBNEIsS0FBNUIsQ0FBa0MsQ0FBQzs7QUFDdkQsTUFBTSxDQUFDLFdBQVAsR0FBcUIsZUFBZSxDQUFDLFdBQWhCLENBQTRCLE1BQTVCLENBQW1DLENBQUM7Ozs7QUROekQsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZF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
