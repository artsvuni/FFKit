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


},{}],"FFKit/components/StatusBar2/StatusBar2":[function(require,module,exports){
var androidBatterySVG, androidSignalSVG, androidWifiSVG, getAllChildrenOfLayer, getMobileOperatingSystem, getMobileType, heightValue, iosBatterySVG, iosSignalSVG, iosWifiSVG,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

heightValue = 0;

getMobileOperatingSystem = function() {
  var userAgent;
  userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (Utils.isMobile()) {
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }
    if ((/android/i.test(userAgent)) || (Framer.Device.deviceType.search("google") >= 0)) {
      return "Android";
    }
    return "unknown";
  } else {
    if ((Framer.Device.deviceType.search("apple-iphone") >= 0) || (Framer.Device.deviceType.search("apple-ipad") >= 0)) {
      return "iOS";
    }
    if ((Framer.Device.deviceType.search("google") >= 0) || (Framer.Device.deviceType.search("htc") >= 0) || (Framer.Device.deviceType.search("samsung") >= 0)) {
      return "Android";
    }
    return "unknown";
  }
};

getMobileType = function() {
  switch (getMobileOperatingSystem()) {
    case "iOS":
      if (Framer.Device.orientationName = "portrait" && Screen.height === 812) {
        return "iphone-x";
      }
      if (Framer.Device.orientationName = "landscsape" && Screen.width === 812) {
        return "unknown";
      } else {
        return "classic-iphone";
      }
      break;
    case "Android":
      return "android";
    case "unknown":
      return "unknown";
  }
};

iosSignalSVG = "<svg><path d='M1,5.5 L2,5.5 C2.55228475,5.5 3,5.94771525 3,6.5 L3,9 C3,9.55228475 2.55228475,10 2,10 L1,10 C0.44771525,10 6.76353751e-17,9.55228475 0,9 L0,6.5 C-6.76353751e-17,5.94771525 0.44771525,5.5 1,5.5 Z M5.5,4 L6.5,4 C7.05228475,4 7.5,4.44771525 7.5,5 L7.5,9 C7.5,9.55228475 7.05228475,10 6.5,10 L5.5,10 C4.94771525,10 4.5,9.55228475 4.5,9 L4.5,5 C4.5,4.44771525 4.94771525,4 5.5,4 Z M10,2 L11,2 C11.5522847,2 12,2.44771525 12,3 L12,9 C12,9.55228475 11.5522847,10 11,10 L10,10 C9.44771525,10 9,9.55228475 9,9 L9,3 C9,2.44771525 9.44771525,2 10,2 Z M14.5,0 L15.5,0 C16.0522847,-1.01453063e-16 16.5,0.44771525 16.5,1 L16.5,9 C16.5,9.55228475 16.0522847,10 15.5,10 L14.5,10 C13.9477153,10 13.5,9.55228475 13.5,9 L13.5,1 C13.5,0.44771525 13.9477153,1.01453063e-16 14.5,0 Z'></path></svg>";

iosWifiSVG = "<svg><path d='M1.72225058e-11,2.82956276 C1.87663887,1.07441257 4.39785587,0 7.17000008,0 C9.94214428,0 12.4633613,1.07441257 14.3400002,2.82956276 L12.9248876,4.24476162 C11.4109979,2.85107918 9.38988303,2 7.17000008,2 C4.95011713,2 2.92900225,2.85107918 1.41511257,4.24476162 L0,2.82956276 Z M2.47681709,5.30653087 C3.71833306,4.18377399 5.36431945,3.5 7.17000008,3.5 C8.9756807,3.5 10.6216671,4.18377399 11.8631831,5.30653087 L10.4465387,6.72326155 C9.56905299,5.96124278 8.42338776,5.5 7.17000008,5.5 C5.91661239,5.5 4.77094717,5.96124278 3.8934614,6.72326155 L2.47681709,5.30653087 Z M4.95784379,7.78770884 C5.5607522,7.29532392 6.33088994,7 7.17000008,7 C8.00911021,7 8.77924795,7.29532392 9.38215636,7.78770884 L7.17000008,10 L4.95784379,7.78770884 Z'></path></svg>";

iosBatterySVG = "<svg><path d='M3.2048565,1 C2.33980043,1 2.04887034,1.05618119 1.75054173,1.21572908 C1.5174028,1.34041314 1.34041314,1.5174028 1.21572908,1.75054173 C1.05618119,2.04887034 1,2.33980043 1,3.2048565 L1,8.2951435 C1,9.16019957 1.05618119,9.45112966 1.21572908,9.74945827 C1.34041314,9.9825972 1.5174028,10.1595869 1.75054173,10.2842709 C2.04887034,10.4438188 2.33980043,10.5 3.2048565,10.5 L22.0738202,10.5 C22.5853352,10.5 23,10.0853352 23,9.57382015 L23,3.2048565 C23,2.33980043 22.9438188,2.04887034 22.7842709,1.75054173 C22.6595869,1.5174028 22.4825972,1.34041314 22.2494583,1.21572908 C21.9511297,1.05618119 21.6601996,1 20.7951435,1 L3.2048565,1 Z M3.2048565,-5.73569248e-16 L20.7951435,1.29480038e-16 C21.9095419,-7.52316311e-17 22.3136497,0.116032014 22.7210571,0.33391588 C23.1284645,0.551799746 23.4482003,0.871535463 23.6660841,1.27894287 C23.883968,1.68635028 24,2.09045808 24,3.2048565 L24,9.57382015 C24,10.6376199 23.1376199,11.5 22.0738202,11.5 L3.2048565,11.5 C2.09045808,11.5 1.68635028,11.383968 1.27894287,11.1660841 C0.871535463,10.9482003 0.551799746,10.6284645 0.33391588,10.2210571 C0.116032014,9.81364972 5.01544207e-17,9.40954192 -8.63200256e-17,8.2951435 L8.63200256e-17,3.2048565 C-5.01544207e-17,2.09045808 0.116032014,1.68635028 0.33391588,1.27894287 C0.551799746,0.871535463 0.871535463,0.551799746 1.27894287,0.33391588 C1.68635028,0.116032014 2.09045808,-3.68857579e-16 3.2048565,-5.73569248e-16 Z' fill-rule='nonzero' opacity='0.4'></path><path d='M25,4 C25.8626136,4.2220214 26.5,5.00507154 26.5,5.93699126 C26.5,6.86891097 25.8626136,7.65196112 25,7.87398251 L25,4 Z' opacity='0.4'></path><rect x='2' y='2' width='20' height='7.5' rx='0.5'></rect></svg>";

androidBatterySVG = "<svg><polygon points='6 0.875 6 3.77475828e-15 3 1.11022302e-16 3 0.875 0 0.875 0 14 9 14 9 0.875'></polygon></svg>";

androidSignalSVG = "<svg><polygon points='0 14 14 14 14 0'></polygon></svg>";

androidWifiSVG = "<svg><path d='M-4.02993194e-11,3.01593123 C2.510847,1.12256382 5.63564304,0 9.02262791,0 C12.4096128,0 15.5344088,1.12256382 18.0452558,3.01593123 L9.02262791,14 L-4.91695573e-11,3.01593123 Z'></path></svg>";

getAllChildrenOfLayer = function(layer, mem) {
  var allChildren, child, i, len, ref;
  if (mem == null) {
    mem = [];
  }
  allChildren = mem;
  ref = layer.children;
  for (i = 0, len = ref.length; i < len; i++) {
    child = ref[i];
    if (child.children.length === 0) {
      allChildren.push(child);
    } else {
      allChildren = allChildren.concat(child).concat(getAllChildrenOfLayer(child));
    }
  }
  return allChildren;
};

window.StatusBar2 = (function(superClass) {
  extend(StatusBar2, superClass);

  function StatusBar2(options) {
    var base, base1, base2, base3;
    this.options = options != null ? options : {};
    if ((base = this.options).backgroundColor == null) {
      base.backgroundColor = "transparent";
    }
    if ((base1 = this.options).height == null) {
      base1.height = 0;
    }
    if ((base2 = this.options).style == null) {
      base2.style = "dark";
    }
    if ((base3 = this.options).parent == null) {
      base3.parent = null;
    }
    StatusBar2.__super__.constructor.call(this, this.options);
    this.statusBarLayer = new Layer({
      name: "statusBarLayer",
      y: 0,
      midX: Screen.midX,
      width: Screen.width,
      backgroundColor: this.options.backgroundColor,
      parent: this
    });
    if (this.options.device) {
      this.changeStatusBar(this.options.device);
    } else {
      this.changeStatusBar(getMobileType());
    }
  }

  StatusBar2.prototype.changeStatusBar = function(phone) {
    switch (phone) {
      case "classic-iphone":
        this.iPhoneStatusBar();
        break;
      case "iphone-x":
        this.iPhoneXStatusbar();
        break;
      case "android":
        this.androidStatusbar();
        break;
      case "unknown":
        this.destroyStatusbar();
    }
    return this.height = heightValue;
  };

  StatusBar2.prototype.iPhoneStatusBar = function() {
    var battery, batteryIcon, batteryPercent, hour, signalIcon, statusIcons, wifiIcon;
    heightValue = 20;
    this.statusBarLayer.props = {
      height: heightValue
    };
    hour = new TextLayer({
      name: "hour",
      parent: this.statusBarLayer,
      text: "9:41 AM",
      fontSize: 12,
      textAlign: "center",
      fontWeight: 600,
      fontFamily: "'-apple-system', 'SF Pro Text', sans-serif",
      x: Align.center,
      y: Align.center
    });
    battery = new Layer({
      name: "battery",
      parent: this.statusBarLayer,
      x: Align.right,
      height: this.statusBarLayer.height,
      backgroundColor: null
    });
    batteryIcon = new SVGLayer({
      name: "batteryIcon",
      parent: battery,
      svg: iosBatterySVG,
      fill: "white",
      width: 27,
      height: 12,
      x: Align.right(-7),
      y: Align.center
    });
    batteryPercent = new TextLayer({
      name: "batteryPercent",
      parent: battery,
      text: "100%",
      fontSize: 12,
      textAlign: "center",
      fontWeight: 500,
      fontFamily: "'-apple-system', 'SF Pro Text', sans-serif",
      color: "white",
      x: Align.right(-batteryIcon.width - 10),
      y: Align.center
    });
    statusIcons = new Layer({
      name: "statusIcons",
      parent: this.statusBarLayer,
      x: Align.left,
      height: this.statusBarLayer.height,
      backgroundColor: null
    });
    signalIcon = new SVGLayer({
      name: "signalIcon",
      parent: statusIcons,
      svg: iosSignalSVG,
      fill: "white",
      width: 17,
      height: 10,
      y: Align.center,
      x: 7
    });
    wifiIcon = new SVGLayer({
      name: "wifiIcon",
      parent: statusIcons,
      svg: iosWifiSVG,
      fill: "white",
      width: 14,
      height: 10,
      y: Align.center,
      x: signalIcon.x + signalIcon.width + 3
    });
    if (this.options.style === "light") {
      hour.color = "white";
      batteryIcon.fill = "white";
      batteryPercent.color = "white";
      wifiIcon.fill = "white";
      return signalIcon.fill = "white";
    } else {
      hour.color = "black";
      batteryIcon.fill = "black";
      batteryPercent.color = "black";
      wifiIcon.fill = "black";
      return signalIcon.fill = "black";
    }
  };

  StatusBar2.prototype.iPhoneXStatusbar = function() {
    var batteryIcon, hour, hourFrame, signalIcon, statusIcons, wifiIcon;
    heightValue = 44;
    this.statusBarLayer.props = {
      y: 0,
      midX: Screen.midX,
      width: Screen.width,
      height: heightValue,
      parent: null
    };
    hourFrame = new Layer({
      name: "hourFrame",
      parent: this.statusBarLayer,
      height: 16,
      width: 54,
      x: Align.left(21),
      y: Align.center,
      backgroundColor: null
    });
    hour = new TextLayer({
      name: "hour",
      parent: hourFrame,
      text: "9:41",
      fontSize: 14,
      letterSpacing: -0.28,
      textAlign: "center",
      fontWeight: 600,
      fontFamily: "'-apple-system', 'SF Pro Text', sans-serif",
      color: "white",
      x: Align.center,
      y: Align.center
    });
    statusIcons = new Layer({
      name: "statusIcons",
      parent: this.statusBarLayer,
      x: Align.right,
      height: this.statusBarLayer.height,
      backgroundColor: null
    });
    batteryIcon = new SVGLayer({
      name: "batteryIcon",
      parent: statusIcons,
      svg: iosBatterySVG,
      fill: "white",
      width: 27,
      height: 12,
      x: Align.right(-12),
      y: Align.center
    });
    wifiIcon = new SVGLayer({
      name: "wifiIcon",
      parent: statusIcons,
      svg: iosWifiSVG,
      fill: "white",
      width: 15,
      height: 10,
      x: Align.right(-batteryIcon.width - 12 - 5),
      y: Align.center
    });
    signalIcon = new SVGLayer({
      name: "signalIcon",
      parent: statusIcons,
      svg: iosSignalSVG,
      fill: "white",
      width: 17,
      height: 10,
      x: Align.right(-batteryIcon.width - 12 - 5 - wifiIcon.width - 5),
      y: Align.center
    });
    if (this.options.style === "light") {
      hour.color = "white";
      batteryIcon.fill = "white";
      wifiIcon.fill = "white";
      return signalIcon.fill = "white";
    } else {
      hour.color = "black";
      batteryIcon.fill = "black";
      wifiIcon.fill = "black";
      return signalIcon.fill = "black";
    }
  };

  StatusBar2.prototype.androidStatusbar = function() {
    var batteryIcon, hour, signalIcon, wifiIcon;
    heightValue = 24;
    this.statusBarLayer.props = {
      y: 0,
      midX: Screen.midX,
      width: Screen.width,
      height: heightValue,
      parent: null
    };
    hour = new TextLayer({
      name: "hour",
      parent: this.statusBarLayer,
      text: "12:30",
      fontSize: 14,
      textAlign: "right",
      fontWeight: 500,
      fontFamily: "Roboto",
      color: "white",
      x: Align.right(-8),
      y: Align.center
    });
    batteryIcon = new SVGLayer({
      name: "batteryIcon",
      parent: this.statusBarLayer,
      svg: androidBatterySVG,
      fill: "white",
      width: 9,
      height: 14,
      x: Align.right(-hour.width - 8 - 7),
      y: Align.center
    });
    signalIcon = new SVGLayer({
      name: "signalIcon",
      parent: this.statusBarLayer,
      svg: androidSignalSVG,
      fill: "white",
      width: 14,
      height: 14,
      x: Align.right(-hour.width - 8 - batteryIcon.width - 7 - 9),
      y: Align.center
    });
    wifiIcon = new SVGLayer({
      name: "wifiIcon",
      parent: this.statusBarLayer,
      svg: androidWifiSVG,
      fill: "white",
      width: 18,
      height: 14,
      x: Align.right(-hour.width - 8 - batteryIcon.width - 7 - 9 - signalIcon.width - 2),
      y: Align.center
    });
    if (this.options.style === "light") {
      hour.color = "white";
      batteryIcon.fill = "white";
      wifiIcon.fill = "white";
      return signalIcon.fill = "white";
    } else {
      hour.color = "black";
      batteryIcon.fill = "black";
      wifiIcon.fill = "black";
      return signalIcon.fill = "black";
    }
  };

  StatusBar2.prototype.hide = function() {
    return this.statusBarLayer.animate({
      y: -this.statusBarLayer.height,
      options: {
        time: .4,
        curve: Bezier.ease
      }
    });
  };

  StatusBar2.prototype.show = function() {
    return this.statusBarLayer.animate({
      y: 0,
      options: {
        time: .4,
        curve: Bezier.ease
      }
    });
  };

  StatusBar2.prototype.destroyLayersInStatusBar = function() {
    var child, i, len, ref, results;
    ref = getAllChildrenOfLayer(this.statusBarLayer);
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      child = ref[i];
      results.push(child.destroy());
    }
    return results;
  };

  StatusBar2.prototype.destroyStatusbar = function() {
    this.destroyLayersInStatusBar();
    return this.statusBarLayer.destroy();
  };

  return StatusBar2;

})(Layer);


},{}],"FFKit/components/StatusBar2/example":[function(require,module,exports){
var statusbar;

statusbar = new StatusBar({
  style: "light",
  backgroundColor: "rgba(0,0,0,.5)",
  device: "classic-iphone"
});


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

require_component("StatusBar2");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3VuaXRzL1dpc2hsaXN0VW5pdC9XaXNobGlzdFVuaXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvdW5pdHMvU2VhcmNoVW5pdC9TZWFyY2hVbml0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3VuaXRzL1JlY29tbWVuZGVkTGlzdFVuaXQvUmVjb21tZW5kZWRMaXN0VW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC91bml0cy9Qcm9kdWN0VW5pdC9Qcm9kdWN0VW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC91bml0cy9Qcm9kdWN0U2V0L1Byb2R1Y3RTZXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvdW5pdHMvUHJvZHVjdExpc3RpbmdVbml0L1Byb2R1Y3RMaXN0aW5nVW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC91bml0cy9Qcm9kdWN0SGVyby9Qcm9kdWN0SGVyby5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC91bml0cy9QRFBIZXJvVW5pdC9QRFBIZXJvVW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC91bml0cy9PcmRlclRyYWtlci9PcmRlclRyYWtlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC91bml0cy9IZXJvVW5pdC9kYXRhL2RhdGEuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvdW5pdHMvSGVyb1VuaXQvSGVyb1VuaXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvdW5pdHMvR2VuZGVyU3dpdGNoL0dlbmRlclN3aXRjaC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC91bml0cy9GZWF0dXJlVW5pdC9GZWF0dXJlVW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9XaXNobGlzdFVuaXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvVW5pdHMvUmVjb21tZW5kZWRMaXN0VW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9Qcm9kdWN0VW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9Qcm9kdWN0VW5pdCAoRXh0ZXJuYWwgSlNPTikuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvVW5pdHMvUHJvZHVjdFVuaXQgKEFycmF5KS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9Qcm9kdWN0U2V0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1VuaXRzL1Byb2R1Y3RMaXN0aW5nVW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9Qcm9kdWN0SGVyby5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9QRFBIZXJvVW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9PcmRlclRyYWtlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9PcmRlclRyYWtlciAoU2xpZGVyKS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9IZXJvVW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9IZXJvVW5pdCAoU2xpZGVyKS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Vbml0cy9HZW5kZXJTd2l0Y2guY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvVW5pdHMvRmVhdHVyZVVuaXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvVW5pdHMvRmVhdHVyZVVuaXQgKFByb2R1Y3QpLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1RleHRMYXllcnMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvU2Nyb2xsL1Njcm9sbCDigJQgRW1wdHkuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvU2Nyb2xsL1Njcm9sbCDigJQgQWxsIEhvbWUgVW5pdHMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvUGFnZXMvV2lzaGxpc3QgcGFnZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9QYWdlcy9TZWFyY2ggUGFnZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9QYWdlcy9SZWZpbmUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvUGFnZXMvUExQLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1BhZ2VzL1BEUC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9QYWdlcy9NZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9QYWdlcy9Ib21lLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL1BhZ2VzL0Rlc2lnbmVyc1BhZ2UuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvUGFnZXMvQ2F0ZWdvcmllc1BhZ2UuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvRmxvd3MvU3RhdHVzYmFyIGFuZCBUYWJiYXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvRmxvd3MvSG9tZSA+IFBMUC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL2lPU1N3aXRjaC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL1dpc2hsaXN0VW5pdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL1RhYnMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9UYWJiYXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9TdGF0dXNCYXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9TZWxlY3Rvci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL1NlYXJjaElucHV0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL0NvbXBvbmVudHMvUmVmaW5lRmlsdGVyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL0NvbXBvbmVudHMvUHJvZHVjdFNsaWRlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL1Byb2R1Y3RDYXJkLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL0NvbXBvbmVudHMvUG9zQmFubmVyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL0NvbXBvbmVudHMvUERQSGVyb1VuaXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9MaXN0VGl0bGUsIExpc3RJdGVtcy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL0xpc3RSYWRpb1NlbGVjdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL0xpc3RQcm9kdWN0Q2FyZC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL0xpc3RJdGVtIChhbGwgYXRyaWJ1dGVzKS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL0tleWxpbmUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9Ib21lU2VhcmNoLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L3NuaXBwZXRzL0ZGS2l0IHNuaXBwZXRzL0NvbXBvbmVudHMvSGVhZGVycy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL0hlYWRlciAoYWxsIGF0cmlidXRlcykuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9GRklucHV0cy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL0J1dHRvbnMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9CdXR0b24gRml4ZWQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvc25pcHBldHMvRkZLaXQgc25pcHBldHMvQ29tcG9uZW50cy9BY3Rpb25TaGVldC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zbmlwcGV0cy9GRktpdCBzbmlwcGV0cy9Db21wb25lbnRzL0FjY29yZGlvbi5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zZXR1cC9zaXplcy9zaXplcy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zZXR1cC9zZXR1cC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9zZXR1cC9GRlRleHRMYXllci9GRlRleHRMYXllci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9wYWdlcy9EZXNpZ25lcnNQYWdlL0Rlc2lnbmVyc1BhZ2UuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvcGFnZXMvQ2F0ZWdvcmllc1BhZ2UvQ2F0ZWdvcmllc1BhZ2UuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvaGVscGVyLWZ1bmN0aW9ucy90YXJnZXREZXNpZ25Nb2RlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2hlbHBlci1mdW5jdGlvbnMvcHJpdmF0ZS9zZWxlY3RJbWFnZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9oZWxwZXItZnVuY3Rpb25zL3ByaXZhdGUvcGFyYWxheE9uU2Nyb2xsLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2hlbHBlci1mdW5jdGlvbnMvcHJpdmF0ZS9nZW5lcmF0ZURvdHMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvaGVscGVyLWZ1bmN0aW9ucy9wb3NpdGlvbkFmdGVyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2hlbHBlci1mdW5jdGlvbnMvYWRkQ2hpbGRyZW4uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9pT1NTd2l0Y2gvaU9TU3dpdGNoLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvVGFicy9UYWJzLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvVGFiYmFyL1RhYmJhci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL1N0YXR1c0JhcjIvZXhhbXBsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL1N0YXR1c0JhcjIvU3RhdHVzQmFyMi5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL1N0YXR1c0Jhci9TdGF0dXNCYXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9TZWxlY3Rvci9TZWxlY3Rvci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL1NlYXJjaElucHV0L1NlYXJjaElucHV0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvUmVmaW5lRmlsdGVyL1JlZmluZUZpbHRlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL1Byb2R1Y3RTbGlkZXIvUHJvZHVjdFNsaWRlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL1Byb2R1Y3RDYXJkL1Byb2R1Y3RDYXJkLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvUG9zQmFubmVyL1Bvc0Jhbm5lci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL01lU2lnbkluL01lU2lnbkluLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvTWVDb250YWN0VXMvTWVDb250YWN0VXMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9MaXN0VGl0bGUvTGlzdFRpdGxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvTGlzdFJhZGlvU2VsZWN0L0xpc3RSYWRpb1NlbGVjdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL0xpc3RQcm9kdWN0Q2FyZC9MaXN0UHJvZHVjdENhcmQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9MaXN0SXRlbS9MaXN0SXRlbS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL0tleWxpbmUvS2V5bGluZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL0lucHV0L0lucHV0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvSG9tZVNlYXJjaC9Ib21lU2VhcmNoLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL0ZGU2Nyb2xsQ29tcG9uZW50L0ZGU2Nyb2xsQ29tcG9uZW50LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvRkZJbnB1dC9GRklucHV0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvQnV0dG9uRml4ZWQvQnV0dG9uRml4ZWQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NhcmQvUHJvamVjdHNfbG9jYWwvX2Rldi9hcnRzdnVuaS5naXRodWIg4oCUIEZGS2l0L0ZGS2l0LmZyYW1lci9tb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvQWN0aW9uU2hlZXQvQWN0aW9uU2hlZXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2FyZC9Qcm9qZWN0c19sb2NhbC9fZGV2L2FydHN2dW5pLmdpdGh1YiDigJQgRkZLaXQvRkZLaXQuZnJhbWVyL21vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9BY2NvcmRpb25Hcm91cC9BY2NvcmRpb25Hcm91cC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXJkL1Byb2plY3RzX2xvY2FsL19kZXYvYXJ0c3Z1bmkuZ2l0aHViIOKAlCBGRktpdC9GRktpdC5mcmFtZXIvbW9kdWxlcy9GRktpdC9jb21wb25lbnRzL0FjY29yZGlvbi9BY2NvcmRpb24uY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEZyYW1lciDigJQgRmFyZmV0Y2ggTW9iaWxlIEtpdFxuIyBCeSBGYXJmZXRjaFxuIyBDb250ZW50czogUGFyc2UgSlNPTiBjb25maWd1cmF0aW9uLCB3aGl0Y2ggbW9kdWxlcyBzaG91bGQgYmUgaW5jbHVkZXMgaW4gdGhlIEtpdFxuIyBBdXRvcnM6IEFsZXhhbmRlciBBcnRzdnVuaSwgU29waGllIFJhaGllcnMsIFBhdmVsIExhcHRldlxuIyBXZWJzaXRlOiBodHRwczovL3d3dy5mYXJmZXRjaC5jb21cbiMgS2l0IHZlcnNpb246IDEuMC4yXG5cbiMgRnVuY3Rpb25zIG1ha2VzIHBhdGggc2hvcnRlclxuZ2xvYmFsLnJlcXVpcmVfc2V0dXAgPSAobmFtZSkgLT5cblx0cmV0dXJuIHJlcXVpcmUoXCJGRktpdC9zZXR1cC8je25hbWV9LyN7bmFtZX1cIilcblxuIyBGdW5jdGlvbiBtYWtlcyBwYXRoIHRvIGEgY29tcG9uZW50IHNob3J0ZXJcbmdsb2JhbC5yZXF1aXJlX2NvbXBvbmVudCA9IChuYW1lKSAtPlxuXHRyZXR1cm4gcmVxdWlyZShcIkZGS2l0L2NvbXBvbmVudHMvI3tuYW1lfS8je25hbWV9XCIpXG5cbiMgRnVuY3Rpb24gbWFrZXMgcGF0aCB0byBhIHVuaXQgc2hvcnRlclxuZ2xvYmFsLnJlcXVpcmVfdW5pdCA9IChuYW1lKSAtPlxuXHRyZXR1cm4gcmVxdWlyZShcIkZGS2l0L3VuaXRzLyN7bmFtZX0vI3tuYW1lfVwiKVxuXG4jIEZ1bmN0aW9uIG1ha2VzIHBhdGggdG8gYSBwYWdlcyBzaG9ydGVyXG5nbG9iYWwucmVxdWlyZV9wYWdlID0gKG5hbWUpIC0+XG5cdHJldHVybiByZXF1aXJlKFwiRkZLaXQvcGFnZXMvI3tuYW1lfS8je25hbWV9XCIpXG5cblxuIyBDT05GSUdVUkFUSU9OXG4jIEluaXRpYWwgc2V0dXBcbntzZXR1cH0gPSByZXF1aXJlIFwiRkZLaXQvc2V0dXAvc2V0dXBcIlxuZXhwb3J0cy5zZXR1cCA9IHNldHVwXG4jXG5yZXF1aXJlX3NldHVwIFwic2l6ZXNcIlxucmVxdWlyZV9zZXR1cCBcIkZGVGV4dExheWVyXCJcblxuIyBDb21wb25lbnRzXG4jIEJhc2ljXG5yZXF1aXJlX2NvbXBvbmVudCBcIlN0YXR1c0JhclwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIlN0YXR1c0JhcjJcIlxucmVxdWlyZV9jb21wb25lbnQgXCJCdXR0b25cIlxucmVxdWlyZV9jb21wb25lbnQgXCJIZWFkZXJcIlxucmVxdWlyZV9jb21wb25lbnQgXCJLZXlsaW5lXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiVGFiYmFyXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiUmVmaW5lRmlsdGVyXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiUHJvZHVjdENhcmRcIlxucmVxdWlyZV9jb21wb25lbnQgXCJMaXN0UHJvZHVjdENhcmRcIlxucmVxdWlyZV9jb21wb25lbnQgXCJQcm9kdWN0U2xpZGVyXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiUG9zQmFubmVyXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiTGlzdFRpdGxlXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiTGlzdEl0ZW1cIlxucmVxdWlyZV9jb21wb25lbnQgXCJTZWxlY3RvclwiXG5yZXF1aXJlX2NvbXBvbmVudCBcImlPU1N3aXRjaFwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIkxpc3RSYWRpb1NlbGVjdFwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIkFjY29yZGlvblwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIkFjY29yZGlvbkdyb3VwXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiQWN0aW9uU2hlZXRcIlxucmVxdWlyZV9jb21wb25lbnQgXCJCdXR0b25GaXhlZFwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIk1lU2lnbkluXCJcbnJlcXVpcmVfY29tcG9uZW50IFwiSG9tZVNlYXJjaFwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIlNlYXJjaElucHV0XCJcbnJlcXVpcmVfY29tcG9uZW50IFwiTWVDb250YWN0VXNcIlxucmVxdWlyZV9jb21wb25lbnQgXCJJbnB1dFwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIkZGSW5wdXRcIlxucmVxdWlyZV9jb21wb25lbnQgXCJGRlNjcm9sbENvbXBvbmVudFwiXG5yZXF1aXJlX2NvbXBvbmVudCBcIlRhYnNcIlxuXG4jIFVuaXRzXG5yZXF1aXJlX3VuaXQgXCJIZXJvVW5pdFwiXG5yZXF1aXJlX3VuaXQgXCJQcm9kdWN0VW5pdFwiXG5yZXF1aXJlX3VuaXQgXCJGZWF0dXJlVW5pdFwiXG5yZXF1aXJlX3VuaXQgXCJQcm9kdWN0U2V0XCJcbnJlcXVpcmVfdW5pdCBcIlByb2R1Y3RIZXJvXCJcbnJlcXVpcmVfdW5pdCBcIlByb2R1Y3RMaXN0aW5nVW5pdFwiXG5yZXF1aXJlX3VuaXQgXCJQRFBIZXJvVW5pdFwiXG5yZXF1aXJlX3VuaXQgXCJSZWNvbW1lbmRlZExpc3RVbml0XCJcbnJlcXVpcmVfdW5pdCBcIk9yZGVyVHJha2VyXCJcbnJlcXVpcmVfdW5pdCBcIlNlYXJjaFVuaXRcIlxucmVxdWlyZV91bml0IFwiV2lzaGxpc3RVbml0XCJcbnJlcXVpcmVfdW5pdCBcIkdlbmRlclN3aXRjaFwiXG5cbiMgUGFnZXNcbnJlcXVpcmVfcGFnZSBcIkNhdGVnb3JpZXNQYWdlXCJcbnJlcXVpcmVfcGFnZSBcIkRlc2lnbmVyc1BhZ2VcIiIsIiMjIyMjIyMjIyMjIExpc3QgVGl0bGUgIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuV2lzaGxpc3RVbml0IGV4dGVuZHMgU2Nyb2xsQ29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGFycmF5OiBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyBcIm1vZHVsZXMvRkZLaXQvdW5pdHMvUHJvZHVjdExpc3RpbmdVbml0L2RhdGEvcHJvZHVjdHMuanNvblwiXG5cdFx0XHRpY29uOiB0cnVlXG5cdFx0XHRib3JkZXI6IHRydWVcblx0XHRcdGRlc2NyaXB0aW9uOiB0cnVlXG5cdFx0XG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHRcdFxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEApXG5cdFx0XHRcblx0XHQjIEluaXRpYWwgdmFyaWFibGVzXG5cdFx0Y29sdW1uQ291bnQgPSAyXG5cdFx0dGlsZUNvdW50ID0gQG9wdC5hcnJheS5sZW5ndGhcblx0XHRjb21iaW5lZFRpbGVXaWR0aCA9IFNjcmVlbi53aWR0aFxuXHRcdHRpbGVXaWR0aCA9IGNvbWJpbmVkVGlsZVdpZHRoIC8gY29sdW1uQ291bnRcblx0XHRcblx0XHQjIENyZWF0ZSBncmlkXG5cdFx0Zm9yIGkgaW4gWzAuLi50aWxlQ291bnRdXG5cdFx0XHQjIFJhdGlvbiB2YXJpYmxlcyB0byBtYWtlIGEgZ3JpZFxuXHRcdFx0Y29sdW1uSW5kZXggPSBpICUgY29sdW1uQ291bnRcblx0XHRcdHJvd0luZGV4ID0gTWF0aC5mbG9vcihpIC8gY29sdW1uQ291bnQpXG5cdFx0XHRcblx0XHRcdCMgQ3JlYXRlIGNhcmRzXG5cdFx0XHRAW1wibGlzdGNhcmRfI3tpKzF9XCJdID0gbmV3IExpc3RQcm9kdWN0Q2FyZFxuXHRcdFx0XHRuYW1lOiBcImxpc3RjYXJkXyN7aSsxfVwiXG5cdFx0XHRcdGljb246IFwiYmlnLWNyb3NzXCJcblx0XHRcdFx0cGFyZW50OiBAY29udGVudFxuXHRcdFx0XHR4OiBjb2x1bW5JbmRleCAqIHRpbGVXaWR0aFxuXHRcdFx0XHRzZWFzb246IEBvcHQuYXJyYXlbaV0uc2Vhc29uXG5cdFx0XHRcdGNvdmVyOiBAb3B0LmFycmF5W2ldLmltYWdlXG5cdFx0XHRcdGJyYW5kOiBAb3B0LmFycmF5W2ldLmJyYW5kXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBpZiBAb3B0LmRlc2NyaXB0aW9uIHRoZW4gQG9wdC5hcnJheVtpXS5zaG9ydERlc2NyaXB0aW9uIGVsc2UgZmFsc2Vcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IGlmIEBvcHQuYm9yZGVyIHRoZW4gMC41XG5cdFx0XHRcdGJvcmRlckNvbG9yOiBpZiBAb3B0LmJvcmRlciB0aGVuIFwicmdiYSgwLDAsMCwwLjEpXCJcblx0XHRcdFxuXHRcdFx0QFtcImxpc3RjYXJkXyN7aSsxfVwiXS55ID0gcm93SW5kZXggKiBAW1wibGlzdGNhcmRfI3tpKzF9XCJdLm1heFlcblx0XHRcdFxuXHRcdFx0IyBPbiBUYXBcblx0XHRcdEBbXCJsaXN0Y2FyZF8je2krMX1cIl0uaWNvbl9mcmFtZS5vblRhcCAtPlxuXHRcdFx0XHRjYXJkID0gQHBhcmVudFxuXHRcdFx0XHRzY3JvbGxDb250ZW50ID0gQHBhcmVudC5wYXJlbnQuY2hpbGRyZW5cblx0XHRcdFx0XG5cdFx0XHRcdEBwYXJlbnQuYW5pbWF0ZVxuXHRcdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdFx0dGltZTogMC4yXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0VXRpbHMuZGVsYXkgMC4yLCA9PlxuXHRcdFx0XHRcdGNhcmQuZGVzdHJveSgpXG5cdFx0XHRcdFx0VXRpbHMuZGVsYXkgMC4xLCA9PlxuXHRcdFx0XHRcdFx0QHBhcmVudC5wYXJlbnQucGFyZW50LnVwZGF0ZUNvbnRlbnQoKVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRjdXJyZW50UG9zID0ge1xuXHRcdFx0XHRcdHg6IGNhcmQueFxuXHRcdFx0XHRcdHk6IGNhcmQueVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHQjIElmIHRoaXMgaXMgbm90IGEgbGFzdCBjYXJkXG5cdFx0XHRcdGlmIEBwYXJlbnQuaWQgaXNudCBzY3JvbGxDb250ZW50W3Njcm9sbENvbnRlbnQubGVuZ3RoLTFdLmlkXG5cdFx0XHRcdFx0c2Nyb2xsQ29udGVudFtzY3JvbGxDb250ZW50LmluZGV4T2YoQHBhcmVudCkrMV0uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0eDogY3VycmVudFBvcy54XG5cdFx0XHRcdFx0XHR5OiBjdXJyZW50UG9zLnlcblx0XHRcdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMC45KVxuXHRcdFx0XHRcdFx0XHR0aW1lOiAwLjRcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQjIEdldCBhbGwgZWxlbWVudHMgYWZ0ZXIgY3VycmVudCBpdGVtXG5cdFx0XHRcdFx0cHJldkl0ZW1zQXJyYXkgPSBzY3JvbGxDb250ZW50LnNsaWNlKHNjcm9sbENvbnRlbnQuaW5kZXhPZihAcGFyZW50KSsxKVxuXHRcdFx0XHRcdCMgR2V0IGFsbCBlbGVtZW50cyBhZnRlciBmaXJzdCBpdGVtIGluIHByZXZJdGVtc0FycmF5XG5cdFx0XHRcdFx0bmV4dEl0ZW1zQXJyYXkgPSBwcmV2SXRlbXNBcnJheS5zbGljZSgxKVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZvciBjaGlsZCwgaSBpbiBuZXh0SXRlbXNBcnJheVxuXHRcdFx0XHRcdFx0Y2hpbGQuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHR4OiBwcmV2SXRlbXNBcnJheVtpXS54XG5cdFx0XHRcdFx0XHRcdHk6IHByZXZJdGVtc0FycmF5W2ldLnlcblx0XHRcdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDAuOSlcblx0XHRcdFx0XHRcdFx0XHR0aW1lOiAwLjVcblx0XHRcdFxuXHRcdFx0aWYgQG9wdC5pY29uIGlzIGZhbHNlXG5cdFx0XHRcdGxpc3RDYXJkLmNhcmRfZnJhbWUuZGVzdHJveSgpXG5cdFx0XG5cdFx0QHVwZGF0ZUNvbnRlbnQoKSIsIiMjIyMjIyMjIyMjIyMjIFNFQVJDSCBVTklUICMjIyMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LlNlYXJjaFVuaXQgZXh0ZW5kcyBMYXllclxuXHQjIEluaXRpYWwgZnJhbWUgY29uc3RydWN0b3Jcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNGNUY1RjVcIlxuXHRcdFx0aGVpZ2h0OiBzd2l0Y2ggRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXG5cdFx0XHRcdHdoZW4gXCJhcHBsZS1pcGhvbmUteC1zaWx2ZXJcIiwgXCJhcHBsZS1pcGhvbmUteC1zcGFjZS1ncmF5XCJcblx0XHRcdFx0XHRzZWFyY2hfZnJhbWUuaGVpZ2h0ICsgNDRcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHNlYXJjaF9mcmFtZS5oZWlnaHQgKyAyMFxuXHRcdFx0dGl0bGU6IHNlYXJjaF9mcmFtZS5zZWxlY3RDaGlsZChcInNlYXJjaF90aXRsZVwiKS50ZXh0XG5cdFx0XHRkZXNpZ25lcnM6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvZGVzaWduZXJzLmpzb25cIlxuXHRcdFx0Y2F0ZWdvcmllczogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9jYXRlZ29yaWVzLmpzb25cIlxuXHRcdFx0YWN0aW9uczoge1xuXHRcdFx0XHRcIjI2ODIwODJcIjogLT4gcHJpbnQgXCJUYXAhXCJcblx0XHRcdH1cblx0XHRcdFxuXHRcdCMjIyMgTUFJTiBWQVJTICMjIyNcblx0XHRAc2VhcmNoX2NvbXAgPSBzZWFyY2hfZnJhbWVcblx0XHRAaGVhZGVyID0gQHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoX2hlYWRlclwiKVxuXHRcdEBub3RoaW5nRm91bmQgPSBAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJub3RoaW5nX2ZvdW5kXCIpXG5cdFx0QGlucHV0ID0gQHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoX2lucHV0XCIpXG5cdFx0QGxlZnRJY29uID0gQHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoX2lucHV0X2wtaWNvblwiKVxuXHRcdEByaWdodEljb24gPSBAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJzZWFyY2hfaW5wdXRfci1pY29uXCIpXG5cdFx0QGNsZWFyQnRuID0gQHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwiY2xlYXJfYnRuXCIpXG5cdFx0QGNsb3NlQnRuID0gQHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwiY3Jvc3MtaWNvXCIpXG5cdFx0cGFyZW50ID0gQFxuXHRcdFxuXHRcdCMjIyMgQ1JFQVRFIFNVQiBFTEVNRU5UUyAjIyMjXG5cdFx0QGJja0xheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImJhY2sgbGF5ZXJcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFxuXHRcdEBzZWFyY2hfY29tcC5wcm9wcyA9XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IDAsIHk6IEFsaWduLmJvdHRvbSgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHQjIENyZWF0ZSBIVE1MIGlucHV0XG5cdFx0QGlucHV0V3JhcCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJpbnB1dCB3cmFwXCJcblx0XHRcdHBhcmVudDogQGlucHV0XG5cdFx0XHR5OiBAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJzZWFyY2hfcGxhY2Vob2xkZXJcIikueVxuXHRcdFx0eDogQHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLnhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcInNlYXJjaF9wbGFjZWhvbGRlclwiKS53aWR0aFxuXHRcdFx0aGVpZ2h0OiBAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJzZWFyY2hfcGxhY2Vob2xkZXJcIikuaGVpZ2h0XG5cdFx0XHRodG1sOiBcIlwiXCI8aW5wdXRcblx0XHRcdFx0Y2xhc3MgPSAnc2VhcmNoLWlucHV0J1xuXHRcdFx0XHRwbGFjZWhvbGRlciA9ICcje0BzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcInNlYXJjaF9wbGFjZWhvbGRlclwiKS50ZXh0fSc+XG5cdFx0XHQ8L2lucHV0PlwiXCJcIlxuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiXG5cdFx0XG5cdFx0QGlucHV0V3JhcC5wbGFjZUJlaGluZChAbGVmdEljb24pXG5cdFx0XG5cdFx0Y3NzID0gXCJcIlwiXG5cdFx0LnNlYXJjaC1pbnB1dCB7XG5cdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHR0b3A6IDFweDtcblx0XHRcdHdpZHRoOiAje0BzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcInNlYXJjaF9wbGFjZWhvbGRlclwiKS53aWR0aH1weDtcblx0XHRcdGhlaWdodDogI3tAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJzZWFyY2hfcGxhY2Vob2xkZXJcIikuaGVpZ2h0fXB4O1xuXHRcdFx0Zm9udC1zaXplOiAxNXB4O1xuXHRcdFx0bGluZS1oZWlnaHQ6IDEuNTtcblx0XHRcdGZvbnQtZmFtaWx5OiBcIlBvbGFyaXMtQm9va1wiLCBcIlBvbGFyaXNcIiwgc2Fucy1zZXJpZic7XG5cdFx0XHR0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xuXHRcdFx0LXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG5cdFx0fVxuXHRcdC5zZWFyY2gtaW5wdXQ6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuXHRcdFx0Y29sb3I6ICN7QHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLmNvbG9yfTtcblx0XHR9XG5cdFx0OmZvY3VzIHtcblx0XHQgIG91dGxpbmU6IG5vbmU7XG5cdFx0fVxuXHRcdFwiXCJcIlxuXHRcdFV0aWxzLmluc2VydENTUyhjc3MpXG5cdFx0XG5cdFx0IyBEZXN0cm95IGNvcHkgZG9ub3Jcblx0XHRAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJzZWFyY2hfcGxhY2Vob2xkZXJcIikuZGVzdHJveSgpXG5cdFx0XG5cdFx0aW5wdXRGcmFtZSA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignLnNlYXJjaC1pbnB1dCcpXG5cdFx0XG5cdFx0QHRhYnMgPSBuZXcgVGFic1xuXHRcdFx0bmFtZTogXCJ0YWJzXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcdHk6IEFsaWduLnRvcChAaW5wdXQuaGVpZ2h0KzUwKVxuXHRcdFxuXHRcdEBub3RoaW5nRm91bmQucHJvcHMgPSBcblx0XHRcdHBhcmVudDogQGJja0xheWVyXG5cdFx0XHR5OiBAdGFicy5tYXhZKzcwXG5cdFx0XG5cdFx0QHJlc3VsdHNTY3JvbGxDbXAgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwic2Nyb2xsXCJcblx0XHRcdHk6IEB0YWJzLm1heFlcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodCAtIEB0YWJzLm1heFlcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0Y29udGVudEluc2V0OlxuXHRcdFx0XHR0b3A6IDEwXG5cblx0XHRAcmVzdWx0c1Njcm9sbENtcC5jb250ZW50LmJhY2tncm91bmRDb2xvciA9IG51bGxcblx0XHRcblx0XHQjIyMjIFNUQVRFUyAjIyMjXG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRzdGF0ZUE6XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcblx0XHRAaGVhZGVyLnN0YXRlcyA9XG5cdFx0XHRzdGF0ZUE6XG5cdFx0XHRcdHk6IEFsaWduLnRvcCgtQGhlYWRlci5oZWlnaHQtNDApXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAwLjNcblx0XHRcblx0XHRAaW5wdXQuc3RhdGVzID1cblx0XHRcdHN0YXRlQTpcblx0XHRcdFx0eTogQWxpZ24udG9wKDE2KVxuXHRcdFx0XHRib3JkZXJXaWR0aDogMFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4yXG5cdFx0XHRcdFxuXHRcdEBiY2tMYXllci5zdGF0ZXMgPVxuXHRcdFx0c3RhdGVBOlxuXHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcblx0XHRAdGFicy5zdGF0ZXMgPVxuXHRcdFx0c3RhdGVBOlxuXHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcblx0XHRAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJjbGVhcl9idG5cIikuc3RhdGVzID1cblx0XHRcdHN0YXRlQTpcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4yXG5cdFx0XG5cdFx0QHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoX2lucHV0X2wtaWNvblwiKS5zdGF0ZXMgPVxuXHRcdFx0c3RhdGVBOlxuXHRcdFx0XHR4OiAtNlxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4yXG5cdFx0XG5cdFx0QHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoX2lucHV0X3ItaWNvblwiKS5zdGF0ZXMgPVxuXHRcdFx0c3RhdGVBOlxuXHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcblx0XHQjIFNDUklQVFNcblx0XHRzZXRTZWNvbmRTdGF0ZSA9ID0+XG5cdFx0XHRAYnJpbmdUb0Zyb250KClcblx0XHRcdGJsb2NrUGFyZW50U2Nyb2xsKEAsIHRydWUpXG5cdFx0XHQjIEFuaW1hdGUgc3RhdGVzXG5cdFx0XHRAYW5pbWF0ZShcInN0YXRlQVwiKVxuXHRcdFx0QGhlYWRlci5hbmltYXRlKFwic3RhdGVBXCIpXG5cdFx0XHRAaW5wdXQuYW5pbWF0ZShcInN0YXRlQVwiKVxuXHRcdFx0QGxlZnRJY29uLmFuaW1hdGUoXCJzdGF0ZUFcIilcblx0XHRcdEByaWdodEljb24uYW5pbWF0ZShcInN0YXRlQVwiKVxuXHRcdFx0QGJja0xheWVyLmFuaW1hdGUoXCJzdGF0ZUFcIilcblx0XHRcdCMgVmlzYWJpbGl0eVxuXHRcdFx0QGJja0xheWVyLnZpc2libGUgPSB0cnVlXG5cdFx0XHRAdGFicy52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0QHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwic2VhcmNoLWljb1wiKS52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcImNyb3NzLWljb1wiKS52aXNpYmxlID0gdHJ1ZVxuXHRcdFxuXHRcdHNldERlZmF1bHRTdGF0ZSA9ID0+XG5cdFx0XHRibG9ja1BhcmVudFNjcm9sbChALCBmYWxzZSlcblx0XHRcdCMgQW5pbWF0ZSBzdGF0ZXNcblx0XHRcdEBhbmltYXRlKFwiZGVmYXVsdFwiKVxuXHRcdFx0QGhlYWRlci5hbmltYXRlKFwiZGVmYXVsdFwiKVxuXHRcdFx0QGlucHV0LmFuaW1hdGUoXCJkZWZhdWx0XCIpXG5cdFx0XHRAbGVmdEljb24uYW5pbWF0ZShcImRlZmF1bHRcIilcblx0XHRcdEByaWdodEljb24uYW5pbWF0ZShcImRlZmF1bHRcIilcblx0XHRcdEBiY2tMYXllci5hbmltYXRlKFwiZGVmYXVsdFwiKVxuXHRcdFx0IyBWaXNhYmlsaXR5XG5cdFx0XHRAYmNrTGF5ZXIudmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJzZWFyY2gtaWNvXCIpLnZpc2libGUgPSB0cnVlXG5cdFx0XHRAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJjcm9zcy1pY29cIikudmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAY2xlYXJCdG4udmlzaWJsZSA9IGZhbHNlXG5cdFx0XHQjIFRhYnNcblx0XHRcdEB0YWJzLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0QHRhYnMuc3RhdGVTd2l0Y2goXCJkZWZhdWx0XCIpXG5cdFx0XHQjIENsZWFyIGlucHV0XG5cdFx0XHRpbnB1dEZyYW1lLnZhbHVlID0gXCJcIlxuXHRcdFxuXHRcdCMjIyMjIyMjIEVWRU5UUyAjIyMjIyMjI1xuXHRcdGlucHV0RnJhbWUuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHNldFNlY29uZFN0YXRlKVxuXHRcdGlucHV0RnJhbWUub25pbnB1dCA9ID0+XG5cdFx0XHRpZiBpbnB1dEZyYW1lLnZhbHVlLmxlbmd0aCA+IDBcblx0XHRcdFx0QHNlYXJjaF9jb21wLnNlbGVjdENoaWxkKFwiY2xlYXJfYnRuXCIpLnZpc2libGUgPSB0cnVlXG5cdFx0XHRcdEByZXN1bHRzU2Nyb2xsQ21wLnZpc2libGUgPSB0cnVlXG5cdFx0XHRcdEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcImNsZWFyX2J0blwiKS5hbmltYXRlKFwic3RhdGVBXCIpXG5cdFx0XHRcblx0XHRcdFx0ZmluZEluR2VuZGVyKEAsIEB0YWJzLmN1cnJlbnRJdGVtLCBpbnB1dEZyYW1lLnZhbHVlKVxuXHRcdFx0XHRAcmVzdWx0c1Njcm9sbENtcC51cGRhdGVDb250ZW50KClcblx0XHRcdGVsc2UgaWYgaW5wdXRGcmFtZS52YWx1ZS5sZW5ndGggaXMgMFxuXHRcdFx0XHRlcmFzZUFycmF5KHBhcmVudC5yZXN1bHRzU2Nyb2xsQ21wLmNvbnRlbnQuY2hpbGRyZW4pXG5cdFx0XHRcdEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcImNsZWFyX2J0blwiKS5hbmltYXRlKFwiZGVmYXVsdFwiKVxuXHRcdFx0XHRAdGFicy52aXNpYmxlID0gZmFsc2Vcblx0XHRcdFx0QHRhYnMuYW5pbWF0ZShcImRlZmF1bHRcIilcblxuXHRcdFx0aWYgQHJlc3VsdHNTY3JvbGxDbXAuY29udGVudC5jaGlsZHJlbi5sZW5ndGggaXMgMCBhbmQgaW5wdXRGcmFtZS52YWx1ZS5sZW5ndGggPiAwXG5cdFx0XHRcdEByZXN1bHRzU2Nyb2xsQ21wLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0XHRAbm90aGluZ0ZvdW5kLnZpc2libGUgPSB0cnVlXG5cdFx0XHRcdEBub3RoaW5nRm91bmQudGVtcGxhdGUgPVxuXHRcdFx0XHRcdG5vdGhpbmc6IGlucHV0RnJhbWUudmFsdWVcblx0XHRcdGVsc2UgaWYgQHJlc3VsdHNTY3JvbGxDbXAuY29udGVudC5jaGlsZHJlbi5sZW5ndGggPiAwXG5cdFx0XHRcdEBub3RoaW5nRm91bmQudmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRcdFxuXHRcdCMjIyMjIyMjIEFDVElPTlMgIyMjIyMjIyNcblx0XHQjIyMjIENsZWFyIGJ1dHRvbiAjIyMjXG5cdFx0QGNsZWFyQnRuLm9uVGFwID0+XG5cdFx0XHRpbnB1dEZyYW1lLnZhbHVlID0gXCJcIlxuXHRcdFx0aW5wdXRGcmFtZS5mb2N1cygpXG5cdFx0XHRlcmFzZUFycmF5KEByZXN1bHRzU2Nyb2xsQ21wLmNvbnRlbnQuY2hpbGRyZW4pXG5cdFx0XHRAc2VhcmNoX2NvbXAuc2VsZWN0Q2hpbGQoXCJjbGVhcl9idG5cIikuYW5pbWF0ZShcImRlZmF1bHRcIilcblx0XHRcdEBzZWFyY2hfY29tcC5zZWxlY3RDaGlsZChcImNsZWFyX2J0blwiKS52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEB0YWJzLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0QG5vdGhpbmdGb3VuZC52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEB0YWJzLnN0YXRlU3dpdGNoKFwiZGVmYXVsdFwiKVxuXHRcdFxuXHRcdCMjIyMgQ2xvc2UgYnV0dG9uICMjIyNcblx0XHRAY2xvc2VCdG4ub25UYXAgPT5cblx0XHRcdEByZXN1bHRzU2Nyb2xsQ21wLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0ZXJhc2VBcnJheShAcmVzdWx0c1Njcm9sbENtcC5jb250ZW50LmNoaWxkcmVuKVxuXHRcdFx0aW5wdXRGcmFtZS5ibHVyKClcblx0XHRcdHNldERlZmF1bHRTdGF0ZSgpXG5cdFx0XHRAbm90aGluZ0ZvdW5kLnZpc2libGUgPSBmYWxzZVxuXHRcdFxuXHRcdCMjIyMgVGFwIG9uIEdlbmRlciBzZWxlY3Rpb24gIyMjI1xuXHRcdGZvciBpdGVtIGluIEB0YWJzLm5ld0l0ZW1zQXJyXG5cdFx0XHRpdGVtLm9uVGFwID0+XG5cdFx0XHRcdGZpbmRJbkdlbmRlcihALCBAdGFicy5jdXJyZW50SXRlbSwgaW5wdXRGcmFtZS52YWx1ZSlcblx0XG5cdCMjIyMjIyMjIyMjIyBQUklWQVRFIE1FVEhPRFMgKCkgIyMjIyMjIyMjIyMjXG5cdCMjIyMgYmxvY2sgcGFyZW50IHNjcm9sbCBpZiBzZWFyY2ggY29tcCBpcyBhY3RpdmUgIyMjI1xuXHRibG9ja1BhcmVudFNjcm9sbCA9ICh1bml0LCB0b2dnbGUpIC0+XG5cdFx0aWYgdW5pdC5wYXJlbnQgYW5kIHVuaXQucGFyZW50Lm5hbWUgaXMgXCJjb250ZW50XCJcblx0XHRcdGlmIHVuaXQucGFyZW50LnBhcmVudC5jb25zdHJ1Y3Rvci5uYW1lIGlzIFwiU2Nyb2xsQ29tcG9uZW50XCJcblx0XHRcdFx0aWYgdG9nZ2xlXG5cdFx0XHRcdFx0dW5pdC5wYXJlbnQucGFyZW50LnNjcm9sbFZlcnRpY2FsID0gZmFsc2Vcblx0XHRcdFx0XHR1bml0LnBhcmVudC55ID0gMFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dW5pdC5wYXJlbnQucGFyZW50LnNjcm9sbFZlcnRpY2FsID0gdHJ1ZVxuXG5cdCMjIyMgRXJhc2UgQXJyYXkgbWV0aG9kICMjIyNcblx0ZXJhc2VBcnJheSA9IChhcnJheSkgLT5cblx0XHRmb3IgY2hpbGQgaW4gYXJyYXlcblx0XHRcdGNoaWxkLmRlc3Ryb3koKVxuXHRcdFx0XG5cdCMjIyMgQ3JlYXRlIHNlYXJjaCBsaXN0IGl0ZW1zICMjIyNcblx0Y3JlYXRlTGF5ZXJzID0gKHBhcmVudCwgbmFtZSwgdHlwZSwgaWQpID0+XG5cdFx0bWF0Y2hlZEl0dGVtID0gc2VhcmNoX2ZyYW1lLnNlbGVjdENoaWxkKFwic2VhcmNoX2xpc3RfaXRlbVwiKS5jb3B5KClcblx0XHRtYXRjaGVkSXR0ZW0uc2VsZWN0Q2hpbGQoXCJuYW1lX2xhYmVsXCIpLnByb3BzID1cblx0XHRcdGF1dG9IZWlnaHQ6IHRydWVcblx0XHRcdHRleHRPdmVyZmxvdzogXCJlbGVwc2lzXCJcblx0XHRcdHdoaXRlU3BhY2U6IFwibm93cmFwXCJcblx0XHRcdG92ZXJmbG93OiBcImhpZGRlblwiXG5cdFx0XHRcblx0XHRtYXRjaGVkSXR0ZW0udmlzaWJsZSA9IHRydWVcblx0XHRtYXRjaGVkSXR0ZW0uc2VsZWN0Q2hpbGQoXCJuYW1lX2xhYmVsXCIpLnRlbXBsYXRlID1cblx0XHRcdG5hbWU6IG5hbWVcblx0XHRcdHR5cGU6IHR5cGVcblxuXHRcdG1hdGNoZWRJdHRlbS5wcm9wcyA9XG5cdFx0XHRwYXJlbnQ6IHBhcmVudC5yZXN1bHRzU2Nyb2xsQ21wLmNvbnRlbnRcblx0XHRcdHg6IDAsIHk6IDBcblxuXHRcdG1hdGNoZWRJdHRlbS5vblRhcCAtPlxuXHRcdFx0aWYgdHlwZW9mIHBhcmVudC5vcHQuYWN0aW9uc1tcIiN7aWR9XCJdIGlzIFwiZnVuY3Rpb25cIlxuXHRcdFx0XHRwYXJlbnQub3B0LmFjdGlvbnNbXCIje2lkfVwiXSgpXG5cblx0IyMjIyBGaW5kIGFuZCBjb21wYXJlIHZhbHVlcyBpbiBKU09OcyAjIyMjXG5cdGZpbmRWYWwgPSAocGFyZW50LCBkZXNpZ25lcnNBcnJheSwgY2F0ZWdvcmllc0FycmF5LCB2YWwpIC0+XG5cdFx0ZXJhc2VBcnJheShwYXJlbnQucmVzdWx0c1Njcm9sbENtcC5jb250ZW50LmNoaWxkcmVuKVxuXHRcdFxuXHRcdCMgQ3JlYXRlIGVtcHR5IHN0b3JhZ2UgZm9yIG1hdGNoZWQgaXRlbXMgXG5cdFx0dW5pb25NYXRjaGVkQXJyYXkgPSBbXVxuXHRcdFxuXHRcdCMgQ2hlY2sgRGVzaWduZXJzIGFycmF5XG5cdFx0Zm9yIGNoaWxkIGluIGRlc2lnbmVyc0FycmF5XG5cdFx0XHRpZiBfLmluY2x1ZGVzKGNoaWxkLm5hbWUsIHZhbC50b1VwcGVyQ2FzZSgpKSBvciBfLmluY2x1ZGVzKGNoaWxkLm5hbWUsIHZhbC50b0xvd2VyQ2FzZSgpKSBvciBfLmluY2x1ZGVzKGNoaWxkLm5hbWUsIHZhbClcblx0XHRcdFx0dW5pb25NYXRjaGVkQXJyYXkucHVzaCh7XG5cdFx0XHRcdFx0bmFtZTogY2hpbGQubmFtZVxuXHRcdFx0XHRcdHR5cGU6IGNoaWxkLnR5cGVcblx0XHRcdFx0XHRpZDogY2hpbGQuaWRcblx0XHRcdFx0fSlcblx0XHRcdFx0XG5cdFx0IyBDaGVjayBDYXRlZ29yaWVzIGFycmF5XG5cdFx0Zm9yIGNoaWxkIGluIGNhdGVnb3JpZXNBcnJheVxuXHRcdFx0aWYgXy5pbmNsdWRlcyhjaGlsZC5uYW1lLCB2YWwudG9VcHBlckNhc2UoKSkgb3IgXy5pbmNsdWRlcyhjaGlsZC5uYW1lLCB2YWwudG9Mb3dlckNhc2UoKSkgb3IgXy5pbmNsdWRlcyhjaGlsZC5uYW1lLCB2YWwpXG5cdFx0XHRcdHVuaW9uTWF0Y2hlZEFycmF5LnB1c2goe1xuXHRcdFx0XHRcdG5hbWU6IGNoaWxkLm5hbWVcblx0XHRcdFx0XHR0eXBlOiBjaGlsZC50eXBlXG5cdFx0XHRcdFx0aWQ6IGNoaWxkLmlkXG5cdFx0XHRcdH0pXG5cdCBcblx0XHQjIENyZWF0ZSBsYXllcnMgYmFzZWQgb24gdW5pb25NYXRjaGVkQXJyYXlcblx0XHRmb3IgY2hpbGQgaW4gdW5pb25NYXRjaGVkQXJyYXlcblx0XHRcdGNyZWF0ZUxheWVycyhwYXJlbnQsIGNoaWxkLm5hbWUsIGNoaWxkLnR5cGUsIGNoaWxkLmlkKVxuXHRcdFx0cGFyZW50LnRhYnMudmlzaWJsZSA9IHRydWVcblx0XHRcdHBhcmVudC50YWJzLmFuaW1hdGUoXCJzdGF0ZUFcIilcblx0XHRcblx0XHQjIFNldCBwb3NpdGlvbmluZ1xuXHRcdGZvciBjaGlsZCBpbiBwYXJlbnQucmVzdWx0c1Njcm9sbENtcC5jb250ZW50LmNoaWxkcmVuXG5cdFx0XHRjaGlsZC55ID0gbmV4dFBvc1lcblx0XHRcdG5leHRQb3NZID0gY2hpbGQubWF4WVxuXG5cdCMjIyMgU3dpdGNoIGdlbmRlciB0YWJzICMjIyNcblx0ZmluZEluR2VuZGVyID0gKHBhcmVudCwgdGFicywgdmFsKSAtPlxuXHRcdGRlc2lnbmVyc0FycmF5ID0gSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgKHBhcmVudC5vcHQuZGVzaWduZXJzKVxuXHRcdGNhdGVnb3JpZXNBcnJheSA9IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIChwYXJlbnQub3B0LmNhdGVnb3JpZXMpXG5cdFx0XG5cdFx0c3dpdGNoIHRhYnNcblx0XHRcdHdoZW4gXCJ3b21lblwiXG5cdFx0XHRcdGZpbmRWYWwocGFyZW50LCBkZXNpZ25lcnNBcnJheS53b21lbiwgY2F0ZWdvcmllc0FycmF5LndvbWVuLCB2YWwpXG5cdFx0XHR3aGVuIFwibWVuXCJcblx0XHRcdFx0ZmluZFZhbChwYXJlbnQsIGRlc2lnbmVyc0FycmF5Lm1lbiwgY2F0ZWdvcmllc0FycmF5Lm1lbiwgdmFsKVxuXHRcdFx0d2hlbiBcImtpZHNcIlxuXHRcdFx0XHRmaW5kVmFsKHBhcmVudCwgZGVzaWduZXJzQXJyYXkua2lkcywgY2F0ZWdvcmllc0FycmF5LmtpZHMsIHZhbCkiLCIjIyMjIyMjIyMjIyMgUFJPUEVSVElFUyAjIyMjIyMjIyMjXG4jIHJlY29tZW5kZWRMaXN0ID0gbmV3IFJlY29tbWVuZGVkTGlzdFVuaXRcbiMgXHRzaG9wQWxsQnRuOiBmYWxzZVxuIyBcdGljb246IGZhbHNlXG4jIFx0Ym9yZGVyOiBmYWxzZVxuIyBcdGRlc2NyaXB0aW9uOiBmYWxzZVxuXG4jIyMjIyMjIyMjIyMjIyBMSVNUIFBST0RVQ1QgQ0FSRCAjIyMjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5SZWNvbW1lbmRlZExpc3RVbml0IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0QHVuaXRfZnJhbWUgPSByZWNvbWVuZGVkX2xpc3RfdW5pdC5jb3B5KClcblx0XHRcblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHR3aWR0aDogQHVuaXRfZnJhbWUud2lkdGhcblx0XHRcdGhlaWdodDogQHVuaXRfZnJhbWUuaGVpZ2h0XG5cdFx0XHRhcnJheTogSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgXCJtb2R1bGVzL0ZGS2l0L3VuaXRzL1Byb2R1Y3RMaXN0aW5nVW5pdC9kYXRhL3Byb2R1Y3RzLmpzb25cIlxuXHRcdFx0c2hvcEFsbEJ0bjogdHJ1ZVxuXHRcdFx0aWNvbjogZmFsc2Vcblx0XHRcdGJvcmRlcjogZmFsc2Vcblx0XHRcdGRlc2NyaXB0aW9uOiBmYWxzZVxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdGxpbWl0ZWRBcnIgPSBAb3B0LmFycmF5LnNsaWNlKDAsNClcblx0XHRcblx0XHRAdW5pdF9mcmFtZS5wYXJlbnQgPSBAXG5cdFx0QHVuaXRfZnJhbWUucHJvcHMgPVxuXHRcdFx0eDogMCwgeTogMFxuXHRcdFxuXHRcdEBsaXN0ID0gbmV3IFByb2R1Y3RMaXN0aW5nVW5pdFxuXHRcdFx0cGFyZW50OiBAdW5pdF9mcmFtZVxuXHRcdFx0eTogQHVuaXRfZnJhbWUuc2VsZWN0Q2hpbGQoXCJjYXJkc1wiKS55XG5cdFx0XHRpY29uOiBAb3B0Lmljb25cblx0XHRcdGJvcmRlcjogQG9wdC5ib3JkZXJcblx0XHRcdGRlc2NyaXB0aW9uOiBAb3B0LmRlc2NyaXB0aW9uXG5cdFx0XHRhcnJheTogbGltaXRlZEFyclxuXHRcdFx0XG5cdFx0QHVuaXRfZnJhbWUuc2VsZWN0Q2hpbGQoXCJjYXJkc1wiKS5kZXN0cm95KClcblx0XHRcblx0XHRpZiBAb3B0LnNob3BBbGxCdG4gaXMgdHJ1ZVxuXHRcdFx0QHVuaXRfZnJhbWUuc2VsZWN0Q2hpbGQoXCJjdGFcIikueSA9IEBsaXN0Lm1heFkgKyBNX3NwYWNlclxuXHRcdFx0QGhlaWdodCA9IEB1bml0X2ZyYW1lLmhlaWdodCA9IEB1bml0X2ZyYW1lLnNlbGVjdENoaWxkKFwiY3RhXCIpLm1heFlcblx0XHRlbHNlXG5cdFx0XHRAdW5pdF9mcmFtZS5zZWxlY3RDaGlsZChcImN0YVwiKS5kZXN0cm95KClcblx0XHRcdEBoZWlnaHQgPSBAbGlzdC5tYXhZXG5cdFx0XG5cbiIsIiMjIyMjIyMjIyMjIyMjIFBST0RVQ1QgVU5JVCAjIyMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LlByb2R1Y3RVbml0IGV4dGVuZHMgTGF5ZXJcblx0IyBGcmFtZSBmcm9tIERlc2lnbiBNb2RlXG5cdGZyYW1lID0gcHJvZHVjdF91bml0XG5cdFxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHQjIENsb25pbmcgbGF5ZXJzIGZyb20gJ0Rlc2lnbiBtb2RlJ1xuXHRcdEB1bml0ID0gZnJhbWUuY29weSgpXG5cdFx0QHVuaXQucHJvcHMgPSAjIGNsb25lZCB1bml0IHNldHRpbmdzXG5cdFx0XHR4OjAsIHk6MFxuXG5cdFx0IyBJbml0aWFsaXNlIHRoZSBVbml0XG5cdFx0c3VwZXIgQG9wdCBcblx0XHRAaGVpZ2h0ID0gZnJhbWUuaGVpZ2h0XG5cdFx0QHdpZHRoID0gZnJhbWUud2lkdGhcblx0XHRAdW5pdC5wYXJlbnQgPSBAXG5cdFx0QHVuaXQuc2VsZWN0Q2hpbGQoXCJwYWdlXCIpLmJhY2tncm91bmRDb2xvciA9IG51bGxcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXHRcdCMgR2VuZXJhdGUgUHJvZHVjdCBTbGlkZXJcblx0XHRwcm9kdWN0U2xpZGVyID0gbmV3IFByb2R1Y3RTbGlkZXJcblx0XHRcdHBhcmVudDogQHVuaXQuc2VsZWN0Q2hpbGQoXCJwYWdlXCIpXG5cdFx0XHRhcnJheTogQG9wdC5wcm9kdWN0c0FycmF5XG5cblx0XHQjIEZyYW1lIGluIERlc2lnbiBNb2RlXG5cdFx0Y3RhX2ZyYW1lID0gQHVuaXQuc2VsZWN0Q2hpbGQoXCJjdGFcIilcblxuXHRcdCMgQ3JlYXRlIENUQVxuXHRcdEBjdGEgPSBuZXcgQnV0dG9uXG5cdFx0XHR4OiBjdGFfZnJhbWUueCwgeTogY3RhX2ZyYW1lLnksIHBhcmVudDogY3RhX2ZyYW1lLnBhcmVudCwgIyBjb3B5IGZyYW1lIHByb3BzXG5cdFx0XHR0ZXh0OiBcIlNob3Agbm93XCJcblx0XHQjXHRuYW1lOiBcImN0YVwiXG5cdFx0Y3RhX2ZyYW1lLmRlc3Ryb3koKSAjIHJlbW92ZSBsYXllclxuXG5cblx0IyMjIyMjIyMjIyMjIyMjIPCfkr4gR0VUVElORyBBTkQgU0VUVElORyBDTEFTUyBEQVRBICMjIyMjIyMjIyMjIyMjI1xuXHRcdFx0XG5cdEBkZWZpbmUgJ3RpdGxlJywgXG5cdFx0Z2V0OiAtPiBAb3B0LnRpdGxlLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEB1bml0LnNlbGVjdENoaWxkKFwidGl0bGVcIikudGV4dCA9IHZhbHVlICMgdXBkYXRlIHRoZSB2YWx1ZVxuXHRcdFx0QHVuaXQuc2VsZWN0Q2hpbGQoJ3RpdGxlJykuYXV0b0hlaWdodCA9IHRydWUgIyBsYXlvdXQgLyBwb3NpdGlvbmluZ1xuXHRcdFxuXHRAZGVmaW5lICdkZXNjcmlwdGlvbicsIFxuXHRcdGdldDogLT4gQG9wdC5kZXNjcmlwdGlvbixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAdW5pdC5zZWxlY3RDaGlsZChcImRlc2NyaXB0aW9uXCIpLnRleHQgPSB2YWx1ZSAjIHVwZGF0ZSB0aGUgdmFsdWVcblxuXHRcdFx0IyBsYXlvdXQgLyBwb3NpdGlvbmluZ1xuXHRcdFx0QHVuaXQuc2VsZWN0Q2hpbGQoJ2Rlc2NyaXB0aW9uJykuYXV0b0hlaWdodCA9IHRydWUgXG5cdFx0XHRAdW5pdC5zZWxlY3RDaGlsZCgnZGVzY3JpcHRpb24nKS55ID0gQHVuaXQuc2VsZWN0Q2hpbGQoJ3RpdGxlJykubWF4WSArIDEwXG5cdFx0XHRAdW5pdC5zZWxlY3RDaGlsZCgncGFnZScpLnkgPSBAdW5pdC5zZWxlY3RDaGlsZCgnZGVzY3JpcHRpb24nKS5tYXhZICsgMjVcbiIsIntwYXJhbGF4T25TY3JvbGx9ID0gcmVxdWlyZSgnLi4vLi4vaGVscGVyLWZ1bmN0aW9ucy9wcml2YXRlL3BhcmFsYXhPblNjcm9sbC5jb2ZmZWUnKVxuXG4jIyMjIyMjIyMjIyMjIyBQUk9EVUNUIFNFVCAjIyMjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5Qcm9kdWN0U2V0IGV4dGVuZHMgTGF5ZXJcblx0IyBGcmFtZSBmcm9tIERlc2lnbiBNb2RlXG5cdGZyYW1lID0gcHJvZHVjdF9zZXRcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHQjIENsb25pbmcgbGF5ZXJzIGZyb20gJ0Rlc2lnbiBtb2RlJ1xuXHRcdEB1bml0ID0gZnJhbWUuY29weSgpXG5cdFx0QHVuaXQucHJvcHMgPSAjIGNsb25lZCB1bml0IHNldHRpbmdzXG5cdFx0XHR4OjAsIHk6MFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0cGFyYWxheDogdHJ1ZVxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0QGhlaWdodCA9IGZyYW1lLmhlaWdodFxuXHRcdEB3aWR0aCA9IGZyYW1lLndpZHRoXG5cdFx0QHVuaXQucGFyZW50ID0gQFxuXHRcdEB1bml0LnNlbGVjdENoaWxkKFwicGFnZVwiKS5iYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cdFx0QHVuaXQuc2VsZWN0Q2hpbGQoJ3RpdGxlJykuYXV0b0hlaWdodCA9IHRydWVcblx0XHRAdW5pdC5zZWxlY3RDaGlsZChcInN1Yl90aXRsZVwiKS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXG5cdFx0IyBDcmVhdGUgQ1RBXG5cdFx0QHNob3BOb3dCdG4gPSBuZXcgQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdGZyYW1lOiBAdW5pdC5zZWxlY3RDaGlsZChcImN0YVwiKS5mcmFtZVxuXHRcdFx0eDogQHVuaXQuc2VsZWN0Q2hpbGQoXCJjdGFcIikueCwgeTpAdW5pdC5zZWxlY3RDaGlsZChcImN0YVwiKS55XG5cdFx0XHR0ZXh0OiBAdW5pdC5zZWxlY3RDaGlsZChcImN0YVwiKS5zZWxlY3RDaGlsZChcImJ1dHRvbl90ZXh0XCIpLnRleHRcblxuXHRcdEB1bml0LnNlbGVjdENoaWxkKFwiY3RhXCIpLmRlc3Ryb3koKSAjIHJlbW92ZSBsYXllclxuXG5cblx0XHQjIEVuYWJsZSBwYXJhbGF4XG5cdFx0aWYgQG9wdC5wYXJhbGF4IGlzIHRydWVcblx0XHRcdHBhcmFsYXhPblNjcm9sbChAKVxuXG5cdFx0IyBHZW5lcmF0ZSBQcm9kdWN0IFNsaWRlclxuXHRcdHByb2R1Y3RTbGlkZXIgPSBuZXcgUHJvZHVjdFNsaWRlclxuXHRcdFx0cGFyZW50OiBAdW5pdC5zZWxlY3RDaGlsZChcInBhZ2VcIilcblx0XHRcdGFycmF5OiBAb3B0LnByb2R1Y3RzQXJyYXlcblxuXHQjIyMjIyMjIyMjIyMjIyMg8J+SviBHRVRUSU5HIEFORCBTRVRUSU5HIENMQVNTIERBVEEgIyMjIyMjIyMjIyMjIyMjXG5cdFx0XHRcblx0QGRlZmluZSAndGl0bGUnLCBcblx0XHRnZXQ6IC0+IEBvcHQudGl0bGUsXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QHVuaXQuc2VsZWN0Q2hpbGQoJ3RpdGxlJykuYXV0b0hlaWdodCA9IHRydWVcblx0XHRcdEB1bml0LnNlbGVjdENoaWxkKFwidGl0bGVcIikudGV4dCA9IHZhbHVlICMgdXBkYXRlIHRoZSB2YWx1ZVxuXHRcdFxuXHRAZGVmaW5lICdzdWJUaXRsZScsIFxuXHRcdGdldDogLT4gQG9wdC5zdWJUaXRsZSxcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEB1bml0LnNlbGVjdENoaWxkKCd0aXRsZScpLmF1dG9IZWlnaHQgPSB0cnVlXG5cdFx0XHRAdW5pdC5zZWxlY3RDaGlsZChcInN1Yl90aXRsZVwiKS50ZXh0ID0gdmFsdWUgIyB1cGRhdGUgdGhlIHZhbHVlXG5cdFx0XHRAdW5pdC5zZWxlY3RDaGlsZCgnc3ViX3RpdGxlJykueSA9IEB1bml0LnNlbGVjdENoaWxkKCd0aXRsZScpLm1heFkgKyAxMFxuXG5cdEBkZWZpbmUgJ2NvdmVyJywgXG5cdFx0Z2V0OiAtPiBAb3B0LmNvdmVyLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEB1bml0LnNlbGVjdENoaWxkKFwiaW1hZ2VcIikuaW1hZ2UgPSB2YWx1ZSAjIHVwZGF0ZSB0aGUgdmFsdWVcblxuXHQjIFRPLURPIGxhdGVzdCB2ZXJzc2lvbiBvZiBVSSBkb2VzIG5vdCB1c2UgdGhpcy4gUmVtb3ZlIG9uIHNvbWUgcG9pbnQgZnJvbSBoZXJlIGFuZCBEZXNpZ24gbW9kZS5cblx0QGRlZmluZSAnZGVzY3JpcHRpb24nLCBcblx0XHRnZXQ6IC0+IEBvcHQuZGVzY3JpcHRpb24sXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QHVuaXQuc2VsZWN0Q2hpbGQoXCJkZXNjcmlwdGlvblwiKS50ZXh0ID0gdmFsdWUgIyB1cGRhdGUgdGhlIHZhbHVlXG4jIFx0XHRcdCMgQWxpZ25pbmcgdGhlIGFycm93XG4jIFx0XHRcdHVuaXQuc2VsZWN0Q2hpbGQoJ2Fycm93JykueSA9IHVuaXQuc2VsZWN0Q2hpbGQoJ2Rlc2NyaXB0aW9uJykueSArIDgiLCIjIyMjIyMjIyMjIyMgUFJPUEVSVElFUyAjIyMjIyMjIyMjXG4jIFx0YXJyYXk6IFthcnJheV1cbiMgXHRpY29uOiBmYWxzZVxuIyBcdGJvcmRlcjogZmFsc2VcbiNcdGRlc2NyaXB0aW9uOiBmYWxzZVxuXG4jIyMjIyMjIyMjIyMjIyBMSVNUIFBST0RVQ1QgQ0FSRCAjIyMjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5Qcm9kdWN0TGlzdGluZ1VuaXQgZXh0ZW5kcyBMYXllclxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0bmFtZTogXCJQcm9kdWN0TGlzdGluZ1VuaXRcIlxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0YXJyYXk6IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIFwibW9kdWxlcy9GRktpdC91bml0cy9Qcm9kdWN0TGlzdGluZ1VuaXQvZGF0YS9wcm9kdWN0cy5qc29uXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0aWNvbjogdHJ1ZVxuXHRcdFx0Ym9yZGVyOiB0cnVlXG5cdFx0XHRkZXNjcmlwdGlvbjogdHJ1ZVxuXG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBALCBAb3B0LnkpXG5cblx0XHQjIEluaXRpYWwgdmFyaWFibGVzXG5cdFx0Y29sdW1uQ291bnQgPSAyXG5cdFx0dGlsZUNvdW50ID0gQG9wdC5hcnJheS5sZW5ndGhcblx0XHRjb21iaW5lZFRpbGVXaWR0aCA9IFNjcmVlbi53aWR0aFxuXHRcdHRpbGVXaWR0aCA9IGNvbWJpbmVkVGlsZVdpZHRoIC8gY29sdW1uQ291bnRcblxuXHRcdCMgQ3JlYXRlIGdyaWRcblx0XHRmb3IgaSBpbiBbMC4uLnRpbGVDb3VudF1cblx0XHRcdCMgUmF0aW9uIHZhcmlibGVzIHRvIG1ha2UgYSBncmlkXG5cdFx0XHRjb2x1bW5JbmRleCA9IGkgJSBjb2x1bW5Db3VudFxuXHRcdFx0cm93SW5kZXggPSBNYXRoLmZsb29yKGkgLyBjb2x1bW5Db3VudClcblx0XHRcdFxuXHRcdFx0IyBDcmVhdGUgY2FyZHNcblx0XHRcdEBbXCJsaXN0Y2FyZF8je2krMX1cIl0gPSBuZXcgTGlzdFByb2R1Y3RDYXJkXG5cdFx0XHRcdG5hbWU6IFwibGlzdGNhcmRfI3tpKzF9XCJcblx0XHRcdFx0eDogY29sdW1uSW5kZXggKiB0aWxlV2lkdGhcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHNlYXNvbjogQG9wdC5hcnJheVtpXS5zZWFzb25cblx0XHRcdFx0Y292ZXI6IEBvcHQuYXJyYXlbaV0uaW1hZ2Vcblx0XHRcdFx0YnJhbmQ6IEBvcHQuYXJyYXlbaV0uYnJhbmRcblx0XHRcdFx0ZGVzY3JpcHRpb246IGlmIEBvcHQuZGVzY3JpcHRpb24gdGhlbiBAb3B0LmFycmF5W2ldLnNob3J0RGVzY3JpcHRpb24gZWxzZSBmYWxzZVxuXHRcdFx0XHRib3JkZXJXaWR0aDogaWYgQG9wdC5ib3JkZXIgdGhlbiAwLjVcblx0XHRcdFx0Ym9yZGVyQ29sb3I6IGlmIEBvcHQuYm9yZGVyIHRoZW4gXCJyZ2JhKDAsMCwwLDAuMSlcIlxuXHRcdFx0XG5cdFx0XHRAW1wibGlzdGNhcmRfI3tpKzF9XCJdLnkgPSByb3dJbmRleCAqIEBbXCJsaXN0Y2FyZF8je2krMX1cIl0ubWF4WVxuXHRcdFx0XG5cdFx0XHRpZiBAb3B0Lmljb24gaXMgZmFsc2Vcblx0XHRcdFx0QFtcImxpc3RjYXJkXyN7aSsxfVwiXS5pY29uX2ZyYW1lLmRlc3Ryb3koKVxuXHRcdFxuXHRcdEBoZWlnaHQgPSBAY2hpbGRyZW5bdGlsZUNvdW50LTFdLm1heFlcblx0XHRcdFx0XG5cbiIsIntwYXJhbGF4T25TY3JvbGx9ID0gcmVxdWlyZSgnLi4vLi4vaGVscGVyLWZ1bmN0aW9ucy9wcml2YXRlL3BhcmFsYXhPblNjcm9sbC5jb2ZmZWUnKVxuXG4jIyMjIyMjIyMjIyMjIyBQUk9EVUNUIEhFUk8gIyMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuUHJvZHVjdEhlcm8gZXh0ZW5kcyBMYXllclxuXHQjIFZhcmlhYmxlcyBmcm9tIERlc2lnbiBNb2RlXG5cdHJlZkZyYW1lID0gcHJvZHVjdF9oZXJvXG5cblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0b3B0ID0gXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0dGl0bGU6IHJlZkZyYW1lLnNlbGVjdENoaWxkKFwidGl0bGVcIikudGV4dFxuXHRcdFx0c3ViVGl0bGU6IHJlZkZyYW1lLnNlbGVjdENoaWxkKFwic3ViX3RpdGxlXCIpLnRleHRcblx0XHRcdGRlc2NyaXB0aW9uOiByZWZGcmFtZS5zZWxlY3RDaGlsZChcImRlc2NyaXB0aW9uXCIpLnRleHRcblx0XHRcdGNvdmVyOiByZWZGcmFtZS5zZWxlY3RDaGlsZChcImltYWdlXCIpLmltYWdlXG5cdFx0XHR3aWR0aDogcmVmRnJhbWUud2lkdGgsIGhlaWdodDogcmVmRnJhbWUuaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwxKVwiXG5cdFx0XHRjbGlwOiB0cnVlXG5cdFx0XHRwYWRkaW5nTGVmdDogU2NyZWVuLndpZHRoIC0gNDBcblx0XHRcdHBhcmFsYXg6IHRydWVcblx0XHRzdXBlciBvcHRcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXHRcdCMgQ3JlYXRlIGltYWdlXG5cdFx0QGJhY2tncm91bmRJbWFnZSA9IHJlZkZyYW1lLnNlbGVjdENoaWxkKFwiaW1hZ2VcIikuY29weSgpXG5cdFx0QGJhY2tncm91bmRJbWFnZS5wcm9wcyA9XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdGltYWdlOiBAb3B0LmNvdmVyXG5cblxuXHRcdCMgQ3JlYXRlIGZhZGUgRnJhbWVcblx0XHRAZmFkZUZyYW1lID0gZmFkZUZyYW1lID0gcmVmRnJhbWUuc2VsZWN0Q2hpbGQoXCJmYWRlX2ZyYW1lXCIpLmNvcHkoKVxuXHRcdEBmYWRlRnJhbWUucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHQjIENyZWF0ZSB0aXRsZVxuXHRcdEB0aXRsZSA9IHJlZkZyYW1lLnNlbGVjdENoaWxkKFwidGl0bGVcIikuY29weSgpXG5cdFx0QHRpdGxlLnByb3BzID1cblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogQG9wdC50aXRsZVxuXHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXG5cdFx0IyBDcmVhdGUgc3ViVGl0bGVcblx0XHRAc3ViVGl0bGUgPSByZWZGcmFtZS5zZWxlY3RDaGlsZChcInN1Yl90aXRsZVwiKS5jb3B5KClcblx0XHRAc3ViVGl0bGUucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR0ZXh0OiBAb3B0LnN1YlRpdGxlXG5cdFx0XHRhdXRvSGVpZ2h0OiB0cnVlXG5cblx0XHQjIENyZWF0ZSBkZXNjcmlwdGlvbiB0ZXh0XG5cdFx0QGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24gPSByZWZGcmFtZS5zZWxlY3RDaGlsZChcImRlc2NyaXB0aW9uXCIpLmNvcHkoKVxuXHRcdEBkZXNjcmlwdGlvbi5wcm9wcyA9XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHRleHQ6IEBvcHQuZGVzY3JpcHRpb25cblxuXHRcdCMgQ3JlYXRlIHRhcCBhcmVhXG5cdFx0QHRhcEFyZWEgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmcmFtZTogcmVmRnJhbWUuc2VsZWN0Q2hpbGQoJ3RhcF9hcmVhJykuZnJhbWVcblxuXHRcdCMgQ3JlYXRlIFByb2R1Y3Qgc2xpZGVyXG5cdFx0QHByb2R1Y3RTbGlkZXIgPSBwcm9kdWN0U2xpZGVyID0gbmV3IFByb2R1Y3RTbGlkZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0cGFkZGluZ0xlZnQ6IEBvcHQucGFkZGluZ0xlZnRcblx0XHRcdGFycmF5OiBAb3B0LnByb2R1Y3RzQXJyYXlcblx0XHRAcHJvZHVjdFNsaWRlci5jb250ZW50LmNsaXAgPSBmYWxzZVxuXHRcdEBwcm9kdWN0U2xpZGVyLmZyYW1lID0gcmVmRnJhbWUuc2VsZWN0Q2hpbGQoXCJwYWdlXCIpLmZyYW1lXG5cdFx0XG5cdFx0QHByb2R1Y3RTbGlkZXIuc2hvd01vcmVDYXJkLnByb3BzID1cblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRcdFx0d2lkdGg6IEBwcm9kdWN0U2xpZGVyLnNob3dNb3JlQ2FyZC53aWR0aCoyLjVcblx0XHRAcHJvZHVjdFNsaWRlci5idXR0b25TaG93TW9yZS5zdHlsZVtcImZpbHRlclwiXSA9IFwiaW52ZXJ0KDEpXCJcblxuXHRcdCMgQ3JlYXRlIENUQSBidXR0b25cblx0XHRAY3RhQnV0dG9uID0gbmV3IEJ1dHRvblxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR0ZXh0OiByZWZGcmFtZS5zZWxlY3RDaGlsZChcImN0YVwiKS5zZWxlY3RDaGlsZChcImJ1dHRvbl90ZXh0XCIpLnRleHRcblx0XHRAY3RhQnV0dG9uLmZyYW1lID0gcmVmRnJhbWUuc2VsZWN0Q2hpbGQoXCJjdGFcIikuZnJhbWVcblxuXHRcdGlmIEBvcHQucGFyYWxheCBpcyB0cnVlXG5cdFx0XHRwYXJhbGF4T25TY3JvbGwoQClcblxuXHRcdCMgRml4YXRpbmcgdmFyaWFibGVzXG5cdFx0c2Nyb2xsTW9kdWxhdGVGbGFnID0gdHJ1ZVxuXHRcdGxheWVyWSA9IEB5XG5cdFx0Y3VycmVudERlc2NyaXB0aW9uT3BhY2l0eSA9IGRlc2NyaXB0aW9uLm9wYWNpdHlcblxuXHRcdCMgQ2hlY2sgaWYgcGFyZW50IGlzIFNjcm9sbENvbXBvbmVudFxuXHRcdGlmIEBwYXJlbnQgYW5kIEBwYXJlbnQubmFtZSBpcyBcImNvbnRlbnRcIlxuXHRcdFx0aWYgQHBhcmVudC5wYXJlbnQuY29uc3RydWN0b3IubmFtZSBpcyBcIlNjcm9sbENvbXBvbmVudFwiXG5cdFx0XHRcdCMgTW9kdWxhdGUgb24gc2Nyb2xsXG5cdFx0XHRcdEBwYXJlbnQub25Nb3ZlIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHRcdFx0IyBpZiBzbGlkZXIuY29udGVudC54IDwgMFxuXHRcdFx0XHRcdGlmIHNjcm9sbE1vZHVsYXRlRmxhZyBpcyB0cnVlXG5cdFx0XHRcdFx0XHRjdXJyZW50RGVzY3JpcHRpb25PcGFjaXR5ID0gZGVzY3JpcHRpb24ub3BhY2l0eVxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb24ub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKFxuXHRcdFx0XHRcdFx0XHQobGF5ZXJZIC0gQHBhcmVudC5zY3JvbGxQb2ludC55KSAtIChAcGFyZW50LmhlaWdodC8yKVxuXHRcdFx0XHRcdFx0XHRbMCwgLUBwYXJlbnQuaGVpZ2h0LzZdXG5cdFx0XHRcdFx0XHRcdFswLCAxXVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0ZmFkZUZyYW1lLm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdFx0XHRcdFx0KGxheWVyWSAtIEBwYXJlbnQuc2Nyb2xsUG9pbnQueSkgLSAoQHBhcmVudC5oZWlnaHQvMilcblx0XHRcdFx0XHRcdFx0WzAsIC1AcGFyZW50LmhlaWdodC82XVxuXHRcdFx0XHRcdFx0XHRbMCwgMV1cblx0XHRcdFx0XHRcdClcblxuXHRcdEBwcm9kdWN0U2xpZGVyLm9uTW92ZSAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0IyBNb2R1bGF0ZSBpZiBmYWRlRnJhbWUub3BhY2l0eSBtb3JlIHRoZW4gMCBhbmQgcHJvZHVjdFNsaWRlci54IG1vcmUgdGhlbiAwXG5cdFx0XHRpZiBmYWRlRnJhbWUub3BhY2l0eSA+IDAgYW5kIEB4IDwgMFxuXHRcdFx0XHRkZXNjcmlwdGlvbi5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHRcdFx0QC54XG5cdFx0XHRcdFx0WzAsIC1AcGFyZW50LndpZHRoLzRdXG5cdFx0XHRcdFx0W2N1cnJlbnREZXNjcmlwdGlvbk9wYWNpdHksIDBdXG5cdFx0XHRcdClcblx0XHRcdCMgU3dpdGNoIHZhcmlhYmxlIHRvIGZhbHNlIGlmIHByb2R1Y3RTbGlkZXIueCBsZXNzIHRoZW4gMFxuXHRcdFx0aWYgQHggPCAtNDBcblx0XHRcdFx0c2Nyb2xsTW9kdWxhdGVGbGFnID0gZmFsc2Vcblx0XHRcdCMgU3dpdGNoIHZhcmlhYmxlIHRvIHRydWUgaWYgcHJvZHVjdFNsaWRlci54IG1vcmUgb3IgZXF1ZWwgMCBcblx0XHRcdCMgYW5kIGxlc3MgdGhlbiBoYWxmIG9mIHRoZSBlbXB0eSBsYXllciBpbiBwcm9kdWN0U2xpZGVyXG5cdFx0XHRlbHNlIGlmIEB4ID4gLTQwXG5cdFx0XHRcdHNjcm9sbE1vZHVsYXRlRmxhZyA9IHRydWVcbiIsIntnZW5lcmF0ZURvdHN9ID0gcmVxdWlyZSgnLi4vLi4vaGVscGVyLWZ1bmN0aW9ucy9wcml2YXRlL2dlbmVyYXRlRG90cy5jb2ZmZWUnKVxuXG4jIyMjIyMjIyMjIyMjIyBQUk9EVUNUIEhFUk8gIyMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuUERQSGVyb1VuaXQgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHR1bml0X2ZyYW1lID0gcGRwX2hlcm9cblx0XHRkZWZhdWx0QXJyYXkgPSBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyBcIm1vZHVsZXMvRkZLaXQvdW5pdHMvUERQSGVyb1VuaXQvZGF0YS9wcm9kdWN0SW1hZ2VzLmpzb25cIlxuXHRcdHVuaXRfZnJhbWUuc2VsZWN0Q2hpbGQoXCJkb3RzXCIpLmRlc3Ryb3koKVxuXHRcdCMgU2xpZGVyXG5cdFx0QGltYWdlU2xpZGVyID0gbmV3IFBhZ2VDb21wb25lbnRcblx0XHRcdG5hbWU6IFwiaW1hZ2VTbGlkZXJcIlxuXHRcdFx0d2lkdGg6IHVuaXRfZnJhbWUud2lkdGgsIGhlaWdodDogdW5pdF9mcmFtZS5zZWxlY3RDaGlsZChcImltYWdlXCIpLmhlaWdodFxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IGZhbHNlXG5cdFx0XHRvcmlnaW5YIDogMC41XG5cdFx0XHRkaXJlY3Rpb25Mb2NrOiB0cnVlICMgYXZvaWRzIHN3aXBlIHdoZW5cblx0XHRcdGNsaXA6IHRydWVcblx0XHRcblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHRuYW1lOiBcInBkcEhlcm9cIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRcdHdpZHRoOiB1bml0X2ZyYW1lLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHVuaXRfZnJhbWUuaGVpZ2h0XG5cdFx0XHRhcnJheTogZGVmYXVsdEFycmF5XG5cdFx0XHRicmFuZDogdW5pdF9mcmFtZS5zZWxlY3RDaGlsZChcImJyYW5kXCIpLnRleHRcblx0XHRcdGRlc2NyaXB0aW9uOiB1bml0X2ZyYW1lLnNlbGVjdENoaWxkKFwiZGVzY3JpcHRpb25cIikudGV4dFxuXHRcdFx0cHJpY2U6IHVuaXRfZnJhbWUuc2VsZWN0Q2hpbGQoXCJwcmljZVwiKS50ZXh0XG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBALCBAb3B0LnkpXG5cblx0XHRmb3IgY2hpbGQsIGkgaW4gQG9wdC5hcnJheVxuXHRcdFx0Y292ZXJfZnJhbWUgPSB1bml0X2ZyYW1lLnNlbGVjdENoaWxkKFwiaW1hZ2VcIikuY29weSgpXG5cdFx0XHRjb3Zlcl9mcmFtZS5wcm9wcyA9XG5cdFx0XHRcdGltYWdlOiBkZWZhdWx0QXJyYXlbaV0uaW1hZ2Vcblx0XHRcdFxuXHRcdFx0QGltYWdlU2xpZGVyLmFkZFBhZ2UoY292ZXJfZnJhbWUpXG5cdFx0XG5cdFx0Z2VuZXJhdGVEb3RzKEBpbWFnZVNsaWRlciwgQG9wdC5hcnJheSlcblx0XHRAaW1hZ2VTbGlkZXIucGFyZW50ID0gQFxuXHRcdEBpY29uID0gdW5pdF9mcmFtZS5zZWxlY3RDaGlsZChcIndpc2hsaXN0LWljb1wiKS5jb3B5KClcblx0XHRAaWNvbi55ID0gaWYgRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlIGlzIFwiYXBwbGUtaXBob25lLXgtc3BhY2UtZ3JheVwiIHRoZW4gQGljb24ueSsyMCBlbHNlIEBpY29uLnlcblx0XHRAaWNvbi5wYXJlbnQgPSBAXG5cblx0XHQjIENvcHkgZGVzY3JpcHRpb24gdGV4dFxuXHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUgPSB1bml0X2ZyYW1lLnNlbGVjdENoaWxkKFwiYmFzZV9kZXNjcmlwdGlvbl9mcmFtZVwiKS5jb3B5KClcblx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnByb3BzID1cblx0XHRcdHg6IDAsIHk6IHVuaXRfZnJhbWUuc2VsZWN0Q2hpbGQoXCJpbWFnZVwiKS5tYXhZXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdCMgU2V0IHZhbHVlcyBmcm9tIEBvcHRcblx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwidGl0bGVcIikudGV4dCA9IEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJicmFuZFwiKS50ZXh0ID0gQG9wdC5icmFuZFxuXHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJkZXNjcmlwdGlvblwiKS50ZXh0ID0gQG9wdC5kZXNjcmlwdGlvblxuXHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJwcmljZVwiKS50ZXh0ID0gQG9wdC5wcmljZVxuXG5cdFx0IyBWYXJpYWJibGVzIGZvciBzY3JvbGxcblx0XHRjdXJyZW50QmFzZURlc2NycmlwdGlvblkgPSBAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnlcblx0XHRjdXJyZW50QmFzZURlc2NycmlwdGlvblByaWNlWSA9IEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJwcmljZVwiKS55XG5cdFx0Y3VycmVudEltYWdlU2xpZGVySGVpZ2h0ID0gQGltYWdlU2xpZGVyLmhlaWdodFxuXG5cdFx0IyBpZiBwYXJlbnQgaXMgc2Nyb2xsXG5cdFx0aWYgQC5wYXJlbnQgYW5kIEAucGFyZW50LnBhcmVudC5jb250ZW50IGFuZCBALnBhcmVudC5wYXJlbnQuY29udGVudC5uYW1lIGlzIFwiY29udGVudFwiXG5cdFx0XHRpZiBALnBhcmVudC5wYXJlbnQuY29uc3RydWN0b3IubmFtZSBpcyBcIlNjcm9sbENvbXBvbmVudFwiXG5cdFx0XHRcdEAucGFyZW50Lm9uIFwiY2hhbmdlOnlcIiwgKG9mZnNldCkgPT5cblx0XHRcdFx0XHQjIEltYWdlIG9mZnNldGluZ1xuXHRcdFx0XHRcdEBpbWFnZVNsaWRlci55ID0gVXRpbHMubW9kdWxhdGUoQC5wYXJlbnQucGFyZW50LnNjcm9sbFksIFswLCAyNTBdLCBbMCwgMTAwXSlcblx0XHRcdFx0XHRAaW1hZ2VTbGlkZXIuaGVpZ2h0ID0gVXRpbHMubW9kdWxhdGUoQC5wYXJlbnQucGFyZW50LnNjcm9sbFksIFswLCAxMDBdLCBbY3VycmVudEltYWdlU2xpZGVySGVpZ2h0LCBjdXJyZW50SW1hZ2VTbGlkZXJIZWlnaHQtMzBdKVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdCMgU3RpY2sgdGhlIGJhc2UgZGVzY3JpcHRpb24gYmxvY2tcblx0XHRcdFx0XHRpZiBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgaXMgXCJhcHBsZS1pcGhvbmUteC1zcGFjZS1ncmF5XCJcblx0XHRcdFx0XHRcdGlmIEAucGFyZW50LnkgPCAtNTMwXG5cdFx0XHRcdFx0XHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUueSA9IC1ALnBhcmVudC5wYXJlbnQuY29udGVudC55IC0gNDBcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS55ID0gY3VycmVudEJhc2VEZXNjcnJpcHRpb25ZXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0aWYgQC5wYXJlbnQueSA8IC01NTBcblx0XHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS55ID0gLUAucGFyZW50LnBhcmVudC5jb250ZW50LnkgLSA2NlxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnkgPSBjdXJyZW50QmFzZURlc2NycmlwdGlvbllcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQjIEVsZW1lbnRzIGFuaW1hdGlvblxuXHRcdFx0XHRcdGlmIEAucGFyZW50LnkgPCAtNDQwIGFuZCBAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwiYnJhbmRcIikub3BhY2l0eSA+PSAwXG5cdFx0XHRcdFx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwiYnJhbmRcIikub3BhY2l0eSAtPSAwLjE0XG5cdFx0XHRcdFx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwiZGVzY3JpcHRpb25cIikub3BhY2l0eSAtPSAwLjE0XG5cdFx0XHRcdFx0ZWxzZSBpZiBALnBhcmVudC55ID4gLTQ0MCBhbmQgQGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcImJyYW5kXCIpLm9wYWNpdHkgPD0gMVxuXHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcImJyYW5kXCIpLm9wYWNpdHkgKz0gMC4xNFxuXHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcImRlc2NyaXB0aW9uXCIpLm9wYWNpdHkgKz0gMC4xNFxuXG5cdFx0XHRcdFx0aWYgQC5wYXJlbnQueSA8IC00OTAgYW5kIEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJwcmljZVwiKS5mb250U2l6ZSA+PSAxMlxuXHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcInByaWNlXCIpLnkgKz0gNFxuXHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcInByaWNlXCIpLmZvbnRTaXplIC09IDAuM1xuXHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcInByaWNlXCIpLnN0eWxlLmZpbHRlciA9IFwiYnJpZ2h0bmVzcygwKVwiXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdEBiYXNlRGVzY3JpcHRpb25fZnJhbWUuc2VsZWN0Q2hpbGQoXCJ0aXRsZVwiKS5vcGFjaXR5ICs9IDAuMVxuXHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcInRpdGxlXCIpLnkgKz0gOC4yXG5cdFx0XHRcdFx0ZWxzZSBpZiBALnBhcmVudC55ID4gLTQ5MCBhbmQgQGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcInByaWNlXCIpLmZvbnRTaXplIDw9IDE1XG5cdFx0XHRcdFx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwicHJpY2VcIikuZm9udFNpemUgKz0gMC4zXG5cdFx0XHRcdFx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwicHJpY2VcIikueSAtPSA0XG5cdFx0XHRcdFx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwicHJpY2VcIikuc3R5bGUuZmlsdGVyID0gXCJicmlnaHRuZXNzKDEpXCJcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0QGJhc2VEZXNjcmlwdGlvbl9mcmFtZS5zZWxlY3RDaGlsZChcInRpdGxlXCIpLm9wYWNpdHkgLT0gMC4xXG5cdFx0XHRcdFx0XHRAYmFzZURlc2NyaXB0aW9uX2ZyYW1lLnNlbGVjdENoaWxkKFwidGl0bGVcIikueSAtPSA4LjIiLCIjIyMjIyMjIyMjIyBMaXN0IFRpdGxlICMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93Lk9yZGVyVHJha2VyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0XG5cdFx0IyBDb21wb25lbnQgZnJhbWUgZnJvbSBEZXNpZ24gTW9kZVxuXHRcdGNvbXBfZnJhbWUgPSBvcmRlcl90cmFrZXJcblxuXHRcdCMjIyMjIyMjIyMjIyMjIyBTSU5HTEUgVU5JVCAjIyMjIyMjIyMjIyMjIyNcblx0XHRpZiBAb3B0LnNsaWRlckFycmF5IGlzIHVuZGVmaW5lZFxuXHRcdFx0XG5cdFx0XHQjIENvcHlpbmcgc3ViIGZyYW1lc1xuXHRcdFx0QGNhcmRfZnJhbWUgPSBjb21wX2ZyYW1lLnNlbGVjdENoaWxkKFwib3JkZXJfdHJha2VyX2NhcmRcIikuY29weSgpXG5cdFx0XHRcblx0XHRcdEBwcm9ncmVzc19mcmFtZSA9IEBjYXJkX2ZyYW1lLnNlbGVjdENoaWxkKFwicHJvZ3Jlc3NcIilcblx0XHRcdEBwcm9ncmVzc19mcmFtZS53aWR0aCA9IDAgI2RlZmF1bHQgc3RhdHVzXG5cdFx0XG5cdFx0IyMjIyMjIyMjIyMjIyMjIE1VTFRJUExFIFVOSVRTICMjIyMjIyMjIyMjIyMjI1xuXHRcdGVsc2Vcblx0XHRcdCMgU2xpZGVyXG5cdFx0XHRAc2xpZGVyX2ZyYW1lID0gbmV3IFBhZ2VDb21wb25lbnRcblx0XHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiBjb21wX2ZyYW1lLmhlaWdodFxuXHRcdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2Vcblx0XHRcdFx0b3JpZ2luWCA6IDAuNVxuXHRcdFx0XHRkaXJlY3Rpb25Mb2NrOiB0cnVlICMgYXZvaWRzIHN3aXBlIHdoZW5cblx0XHRcdFx0Y29udGVudEluc2V0OiBcblx0XHRcdFx0XHRsZWZ0OiAxMlxuXHRcdFx0XHRcdHJpZ2h0OiAxMlxuXHRcdFx0XG5cdFx0XHRAc2xpZGVzID0gW10gICMgc3RvcmFnZVxuXHRcdFx0Y2FyZFdpZHRoID0gMjk4XG5cblx0XHRcdGZvciBpIGluIFswLi4uQG9wdC5zbGlkZXJBcnJheS5sZW5ndGhdXG5cdFx0XHRcdFxuXHRcdFx0XHRAc2xpZGUgPSBjb21wX2ZyYW1lLnNlbGVjdENoaWxkKFwib3JkZXJfdHJha2VyX2NhcmRcIikuY29weSgpXG5cdFx0XHRcdEBzbGlkZS53aWR0aCA9IGNhcmRXaWR0aFxuXHRcdFx0XHRAc2xpZGUuc2VsZWN0Q2hpbGQoXCJwcm9ncmVzc19iZ1wiKS53aWR0aCA9IGNhcmRXaWR0aFxuXG5cdFx0XHRcdCMgSWYgcHJvZ1N0YXJ0IGlzIG5vdCBkZWZpbmVkXG5cdFx0XHRcdGlmIEBvcHQuc2xpZGVyQXJyYXlbaV0ucHJvZ1N0YXJ0IGlzIHVuZGVmaW5lZCB0aGVuIEBvcHQuc2xpZGVyQXJyYXlbaV0ucHJvZ1N0YXJ0ID0gMFxuXHRcdFx0XHQjIFNldCB0aGUgJ3Byb2dyZXNzYmFyJyB0byByZXF1ZXJlZCBkZWZhdWx0IHdpZHRoXG5cdFx0XHRcdHN0YXJ0V2lkdGggPSAoQG9wdC5zbGlkZXJBcnJheVtpXS5wcm9nU3RhcnQgKiBjYXJkV2lkdGgpLzEwMCAjIGNhbGN1bGF0aW5nIHBlcmNlbnRhZ2Vcblx0XHRcdFx0QHNsaWRlLnNlbGVjdENoaWxkKFwicHJvZ3Jlc3NcIikud2lkdGggPSBzdGFydFdpZHRoICNkZWZhdWx0IHN0YXR1c1xuXG5cdFx0XHRcdCMgU2V0IG5ldyBwcm9kQ2FyZCBYIHBvc2l0aW9uXG5cdFx0XHRcdGN1cnJlbnRYID0gKGNhcmRXaWR0aCArIDEyKSppXG5cdFx0XHRcdFxuXHRcdFx0XHRAc2xpZGUucHJvcHMgPVxuXHRcdFx0XHRcdHk6IDEyXG5cdFx0XHRcdFx0eDogY3VycmVudFhcblx0XHRcdFx0XHRwYXJlbnQ6IEBzbGlkZXJfZnJhbWUuY29udGVudFxuXHRcdFx0XHRcblx0XHRcdFx0IyBBZGQgdGhlIGNhcmQgdG8gUGFnZSBDb21wb25lbnRcblx0XHRcdFx0QHNsaWRlcy5wdXNoKEBzbGlkZSkgIyBzdG9yZVxuXG5cblxuXG5cdFx0IyBJbml0aWFsaXNlIHRoZSBjbGFzc1xuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdGhlaWdodDogY29tcF9mcmFtZS5oZWlnaHRcblx0XHRcdHdpZHRoOiBjb21wX2ZyYW1lLndpZHRoXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbXBfZnJhbWUuYmFja2dyb3VuZENvbG9yXG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBALCBAb3B0LnkpXG5cblxuXHRcdCMjIyMjIyMjIyMjIyMjIyBTSU5HTEUgVU5JVCAjIyMjIyMjIyMjIyMjIyNcblx0XHRpZiBAb3B0LnNsaWRlckFycmF5IGlzIHVuZGVmaW5lZFx0XHRcdFxuXHRcdCMgU3RhZ2luZyBzdWIgZnJhbWVzXG5cdFx0XHRhZGRDaGlsZHJlbihALCBbQGNhcmRfZnJhbWVdKVxuXHRcdFxuXG5cdFx0IyMjIyMjIyMjIyMjIyMjIE1VTFRJUExFIFVOSVRTICMjIyMjIyMjIyMjIyMjI1xuXHRcdGVsc2UgXG5cdFx0XHRhZGRDaGlsZHJlbihALCBbQHNsaWRlcl9mcmFtZV0pXG5cblx0XHRcdCMjIyMjIyMjIyMjIyMjIyBBbmltYXRlIGZpcnN0IHNsaWRlciBvbiBsb2FkXG5cdFx0XHRjdXJyZW50ID0gQHNsaWRlcl9mcmFtZS5ob3Jpem9udGFsUGFnZUluZGV4KEBzbGlkZXJfZnJhbWUuY3VycmVudFBhZ2UpXG5cblx0XHRcdHN0YXJ0V2lkdGggPSAoQHByb2dTdGFydFZhbHVlc1tjdXJyZW50XSAqIGNhcmRXaWR0aCkvMTAwICMgY2FsY3VsYXRpbmcgcGVyY2VudGFnZVx0XHRcdFxuXHRcdFx0QHNsaWRlc1tjdXJyZW50XS5zZWxlY3RDaGlsZChcInByb2dyZXNzXCIpLndpZHRoID0gc3RhcnRXaWR0aCAjIFNldCBzdGFydCB3aWR0aFxuXG5cdFx0XHR2YWx1ZSA9IEBvcHQuc2xpZGVyQXJyYXlbY3VycmVudF0ucHJvZ3Jlc3Ncblx0XHRcdEBzbGlkZXNbY3VycmVudF0uc2VsZWN0Q2hpbGQoXCJwcm9ncmVzc1wiKS5hbmltYXRlIFxuXHRcdFx0XHR3aWR0aDogKHZhbHVlICogQHNsaWRlc1tjdXJyZW50XS5zZWxlY3RDaGlsZChcInByb2dyZXNzX2JnXCIpLndpZHRoKS8xMDBcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDAuNSlcblx0XHRcdFx0XHR0aW1lOiAwLjVcblx0XHRcdFx0XHRkZWxheTogMC40XG5cdFx0XHQjIFByZXZlbnQgZnJvbSAncmUtYW55bWF0aW5nJ1xuXHRcdFx0QHByb2dTdGFydFZhbHVlc1tjdXJyZW50XSA9IEBvcHQuc2xpZGVyQXJyYXlbY3VycmVudF0ucHJvZ3Jlc3NcblxuXHRcdFx0IyMjIyMjIyMjIyMjIyMjIEludGVyYWN0aW9uczogQW5pbWF0ZSBvdGhlciBjYXJkc1xuXHRcdFx0QHNsaWRlcl9mcmFtZS5vbiBcImNoYW5nZTpjdXJyZW50UGFnZVwiLCAoZXZlbnQsIGxheWVyKSA9PlxuXHRcdFx0XHQjIFNlbGVjdCBjdXJyZW50XG5cdFx0XHRcdGN1cnJlbnQgPSBsYXllci5ob3Jpem9udGFsUGFnZUluZGV4KGxheWVyLmN1cnJlbnRQYWdlKVxuXG5cdFx0XHRcdCMgQ3VycmVudCBzbGlkZSDigJQgQHNsaWRlc1tjdXJyZW50XVxuXHRcdFx0XHQjIEN1cnJlbnQgcHJvZ3Jlc3MgVmFsdWUg4oCUIEBwcm9nVmFsdWVzW2N1cnJlbnRdXG5cdFx0XHRcdCMgQ3VycmVudCBwcm9nU3RhcnQgVmFsdWUg4oCUIEBwcm9nU3RhcnRWYWx1ZXNbY3VycmVudF1cblxuXHRcdFx0XHQjIFNldCBwcm9nU3RhcnRcblx0XHRcdFx0c3RhcnRXaWR0aCA9IChAcHJvZ1N0YXJ0VmFsdWVzW2N1cnJlbnRdICogY2FyZFdpZHRoKS8xMDAgIyBjYWxjdWxhdGluZyBwZXJjZW50YWdlXHRcdFx0XG5cdFx0XHRcdEBzbGlkZXNbY3VycmVudF0uc2VsZWN0Q2hpbGQoXCJwcm9ncmVzc1wiKS53aWR0aCA9IHN0YXJ0V2lkdGggIyBTZXQgc3RhcnQgd2lkdGhcblxuXHRcdFx0XHQjIEFuaW1hdGUgdG8gUHJvZ3Jlc3Ncblx0XHRcdFx0bmV3V2lkdGggPSAoQHByb2dWYWx1ZXNbY3VycmVudF0gKiBAc2xpZGVzW2N1cnJlbnRdLnNlbGVjdENoaWxkKFwicHJvZ3Jlc3NfYmdcIikud2lkdGgpLzEwMFxuXHRcdFx0XHRAc2xpZGVzW2N1cnJlbnRdLnNlbGVjdENoaWxkKFwicHJvZ3Jlc3NcIikuYW5pbWF0ZSBcblx0XHRcdFx0XHR3aWR0aDogbmV3V2lkdGhcblx0XHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdFx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAwLjUpXG5cdFx0XHRcdFx0XHR0aW1lOiAwLjVcblx0XHRcdFx0XHRcdGRlbGF5OiAwLjRcblx0XHRcdFx0XG5cdFx0XHRcdCMgUHJldmVudCBmcm9tICdyZS1hbnltYXRpbmcnXG5cdFx0XHRcdEBwcm9nU3RhcnRWYWx1ZXNbY3VycmVudF0gPSBAcHJvZ1ZhbHVlc1tjdXJyZW50XVxuXG5cblxuXG5cdCMjIyMjIyMjIyMjIyMjIEdFVCwgU0VUIEFUUklCVVRFUyAjIyMjIyMjIyMjIyMjIyNcblxuXHRAZGVmaW5lIFwidGl0bGVcIixcblx0XHRnZXQ6IC0+IEBvcHQudGl0bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdGlmIEBvcHQuc2xpZGVyQXJyYXkgaXMgdW5kZWZpbmVkXG5cdFx0XHRcdEBvcHQudGl0bGUgPSB2YWx1ZVxuXHRcdFx0XHRAY2FyZF9mcmFtZS5zZWxlY3RDaGlsZChcInRpdGxlXCIpLnRleHQgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJzdWJUaXRsZVwiLFxuXHRcdGdldDogLT4gQG9wdC5zdWJUaXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0aWYgQG9wdC5zbGlkZXJBcnJheSBpcyB1bmRlZmluZWRcblx0XHRcdFx0QG9wdC5zdWJUaXRsZSA9IHZhbHVlXG5cdFx0XHRcdEBjYXJkX2ZyYW1lLnNlbGVjdENoaWxkKFwic3ViX3RpdGxlXCIpLnRleHQgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJpbWFnZVwiLFxuXHRcdGdldDogLT4gQG9wdC5pbWFnZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0aWYgQG9wdC5zbGlkZXJBcnJheSBpcyB1bmRlZmluZWRcblx0XHRcdFx0QG9wdC5pbWFnZSA9IHZhbHVlXG5cdFx0XHRcdEBjYXJkX2ZyYW1lLnNlbGVjdENoaWxkKFwiaW1hZ2VcIikuaW1hZ2UgPSB2YWx1ZVxuXHRcdFx0XHRAY2FyZF9mcmFtZS5zZWxlY3RDaGlsZChcImltYWdlXCIpLnN0eWxlID0gXCJtaXgtYmxlbmQtbW9kZVwiOiBcIm11bHRpcGx5XCJcblxuXHRAZGVmaW5lIFwicHJvZ1N0YXJ0XCIsXG5cdFx0Z2V0OiAtPiBAb3B0LnByb2dTdGFydFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0aWYgQG9wdC5zbGlkZXJBcnJheSBpcyB1bmRlZmluZWRcblx0XHRcdFx0QG9wdC5wcm9nU3RhcnQgPSB2YWx1ZSAjIHRoaXMgd2lsbCBiZSB1c2VkIGluICAncHJvZ3Jlc3MnXG5cblx0QGRlZmluZSBcInByb2dyZXNzXCIsXG5cdFx0Z2V0OiAtPiBAb3B0LnByb2dyZXNzXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRpZiBAb3B0LnNsaWRlckFycmF5IGlzIHVuZGVmaW5lZFxuXHRcdFx0XHRAb3B0LnByb2dyZXNzID0gdmFsdWVcblxuXHRcdFx0XHQjIERlZmF1bHQgcHJvZ1N0YXJ0IHZhbHVlXG5cdFx0XHRcdGlmIEBvcHQucHJvZ1N0YXJ0IGlzIHVuZGVmaW5lZFxuXHRcdFx0XHRcdEBwcm9ncmVzc19mcmFtZS53aWR0aCA9IDBcblx0XHRcdFx0IyBVc2VyIGRlZmluZWQgcHJvZ1N0YXJ0IHZhbHVlXG5cdFx0XHRcdGVsc2UgXG5cdFx0XHRcdFx0cHJvZ1N0YXJ0VmFsdWUgPSAoQG9wdC5wcm9nU3RhcnQgKiBAY2FyZF9mcmFtZS53aWR0aCkvMTAwICMgY2FsY3VsYXRpbmcgcGVyY2VudGFnZVxuXHRcdFx0XHRcdEBwcm9ncmVzc19mcmFtZS53aWR0aCA9IHByb2dTdGFydFZhbHVlXG5cblx0XHRcdFx0IyBBbmltYXRpbmcgdGhlIHByb2dyZXNzXG5cdFx0XHRcdEBwcm9ncmVzc19mcmFtZS5hbmltYXRlXG5cdFx0XHRcdFx0d2lkdGg6ICh2YWx1ZSAqIEBjYXJkX2ZyYW1lLndpZHRoKS8xMDAgIyBjYWxjdWxhdGluZyBwZXJjZW50YWdlIG9mXG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMC41KVxuXHRcdFx0XHRcdFx0dGltZTogMC41XG5cdFx0XHRcdFx0XHRkZWxheTogMC40XG5cblx0IyBTbGlkZXIgZGF0YSBmcm9tIHRoZSBBcnJheVxuXHRAZGVmaW5lICdzbGlkZXJBcnJheScsIFxuXHRcdGdldDogLT4gQG9wdC5zbGlkZXJBcnJheSxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRpZiBAb3B0LnNsaWRlckFycmF5IGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRcdEBvcHQuc2xpZGVyQXJyYXkgPSB2YWx1ZVxuXG5cdFx0XHRcdEBwcm9nVmFsdWVzID0gW10gI3N0b3JhZ2UgZm9yIHZhbHVlcyBcblx0XHRcdFx0QHByb2dTdGFydFZhbHVlcyA9IFtdXG5cblx0XHRcdFx0Zm9yIGkgaW4gWzAuLi52YWx1ZS5sZW5ndGhdICMgcnVuIGxvb3AgYXMgbWFueSB0aW1lcyBhcyB0aGVyZSBhcmUgZW50aXJlc1xuXHRcdFx0XHRcdHVuaXQgPSBAc2xpZGVzW2ldICMgc2VsZWN0XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dW5pdC5zZWxlY3RDaGlsZChcInRpdGxlXCIpLnRleHQgPSB2YWx1ZVtpXS50aXRsZVxuXHRcdFx0XHRcdHVuaXQuc2VsZWN0Q2hpbGQoXCJzdWJfdGl0bGVcIikudGV4dCA9IHZhbHVlW2ldLnN1YlRpdGxlXG5cdFx0XHRcdFx0dW5pdC5zZWxlY3RDaGlsZChcImltYWdlXCIpLmltYWdlID0gdmFsdWVbaV0uaW1hZ2Vcblx0XHRcdFx0XHR1bml0LnNlbGVjdENoaWxkKFwiaW1hZ2VcIikuc3R5bGUgPSBcIm1peC1ibGVuZC1tb2RlXCI6IFwibXVsdGlwbHlcIlxuXG5cdFx0XHRcdFx0IyBBZGQgdGhlIGNhcmQgdG8gUGFnZSBDb21wb25lbnRcblx0XHRcdFx0XHRAcHJvZ1ZhbHVlcy5wdXNoKHZhbHVlW2ldLnByb2dyZXNzKSAjIHN0b3JlXG5cdFx0XHRcdFx0aWYgdmFsdWVbaV0ucHJvZ1N0YXJ0IGlzIHVuZGVmaW5lZCB0aGVuIHZhbHVlW2ldLnByb2dTdGFydCA9IDBcblx0XHRcdFx0XHRAcHJvZ1N0YXJ0VmFsdWVzLnB1c2godmFsdWVbaV0ucHJvZ1N0YXJ0KSAjIHN0b3JlXG4iLCIjIGRhdGEgYXJyYXlcblxuZXhwb3J0cy51c2VyQ2FtZW9OZXcgPSBbXG5cdHtcblx0XHR0eXBlOiBcIkhlcm9Vbml0XCIsXG5cdFx0dGl0bGU6IFwiQmVsbGEgd2VhcnMgdmludGFnZVwiXG5cdFx0c3ViVGl0bGU6IFwiU2hvcCBub3dcIlxuXHRcdGNvdmVyOiBcImltYWdlcy92Mi9jb3Zlci0wMGEuanBnXCJcblx0fVxuXSIsIntnZW5lcmF0ZURvdHN9ID0gcmVxdWlyZSgnLi4vLi4vaGVscGVyLWZ1bmN0aW9ucy9wcml2YXRlL2dlbmVyYXRlRG90cy5jb2ZmZWUnKVxue3BhcmFsYXhPblNjcm9sbH0gPSByZXF1aXJlKCcuLi8uLi9oZWxwZXItZnVuY3Rpb25zL3ByaXZhdGUvcGFyYWxheE9uU2Nyb2xsLmNvZmZlZScpXG5cbmNsYXNzIHdpbmRvdy5IZXJvVW5pdCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdCMjIyMjIyMjIyMjIyMjIyBTSU5HTEUgVU5JVCAjIyMjIyMjIyMjIyMjIyNcblx0XHRpZiBAb3B0LnNsaWRlckFycmF5IGlzIHVuZGVmaW5lZFxuXHRcdFx0IyBDbG9uaW5nIGxheWVycyBmcm9tICdEZXNpZ24gbW9kZSdcblx0XHRcdEB1bml0ID0gaGVyb191bml0LmNvcHkoKVxuXHRcdFx0QHVuaXQucHJvcHMgPSAjIGNsb25lZCB1bml0IHNldHRpbmdzXG5cdFx0XHRcdHg6MCwgeTowXG5cblx0XHQjIyMjIyMjIyMjIyMjIyMgU0xJREVSIFVOSVQgIyMjIyMjIyMjIyMjIyMjXG5cdFx0ZWxzZVxuXHRcdFx0IyBTbGlkZXJcblx0XHRcdEB1bml0ID0gbmV3IFBhZ2VDb21wb25lbnRcblx0XHRcdFx0d2lkdGg6IGhlcm9fdW5pdC53aWR0aCwgaGVpZ2h0OiBoZXJvX3VuaXQuaGVpZ2h0XG5cdFx0XHRcdHNjcm9sbFZlcnRpY2FsOiBmYWxzZVxuXHRcdFx0XHRvcmlnaW5YIDogMC41XG5cdFx0XHRcdGRpcmVjdGlvbkxvY2s6IHRydWUgIyBhdm9pZHMgc3dpcGUgd2hlblxuXHRcdFx0XG5cdFx0XHRAc2xpZGVzID0gW10gICMgc3RvcmFnZVxuXG5cdFx0XHRmb3IgaSBpbiBbMC4uLkBvcHQuc2xpZGVyQXJyYXkubGVuZ3RoXVxuXHRcdFx0XHQjIENsb25pbmcgUHJvZHVjdCBDYXJkIGZyb20gJ0Rlc2lnbiBtb2RlJ1xuXHRcdFx0XHRAc2xpZGUgPSBoZXJvX3VuaXQuY29weSgpXG5cdFx0XHRcdFxuXHRcdFx0XHQjIEFkZCB0aGUgY2FyZCB0byBQYWdlIENvbXBvbmVudFxuXHRcdFx0XHRAdW5pdC5hZGRQYWdlKEBzbGlkZSlcblx0XHRcdFx0QHNsaWRlcy5wdXNoKEBzbGlkZSkgIyBzdG9yZVxuXHRcdFx0XG5cdFx0XHQjIEdlbmVyYXRpbmcgU2xpZGVyIERvdHNcblx0XHRcdGdlbmVyYXRlRG90cyhAdW5pdCwgQG9wdC5zbGlkZXJBcnJheSlcblxuXG5cdFx0IyBJbml0aWFsaXNlIHRoZSBVbml0XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0cGFyYWxheDogdHJ1ZVxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXHRcdFx0XHRcdFx0XHRcblx0XHRAdW5pdC5wYXJlbnQgPSBAXG5cdFx0QGhlaWdodCA9IGhlcm9fdW5pdC5oZWlnaHRcblx0XHRAd2lkdGggPSBoZXJvX3VuaXQud2lkdGhcblxuXHRcdCMgRW5hYmxlIHBhcmFsYXhcblx0XHRpZiBAb3B0LnBhcmFsYXggaXMgdHJ1ZSBhbmQgQG9wdC5zbGlkZXJBcnJheSBpcyB1bmRlZmluZWRcblx0XHRcdHBhcmFsYXhPblNjcm9sbChAKVxuXG5cdFx0aWYgQG9wdC5wYXJhbGF4IGlzIHRydWUgYW5kIEBvcHQuc2xpZGVyQXJyYXkgaXNudCB1bmRlZmluZWRcdFxuXHRcdFx0Zm9yIGNoaWxkIGluIEBzbGlkZXNcblx0XHRcdFx0cGFyYWxheE9uU2Nyb2xsKGNoaWxkKVxuXG5cdCMjIyMjIyMjIyMjIyMjIyBERUZJTkUgUFJPUEVSVElFUyAjIyMjIyMjIyMjIyMjIyNcblx0QGRlZmluZSAndGl0bGUnLCBcblx0XHRnZXQ6IC0+IEBvcHQudGl0bGUsXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0aWYgQG9wdC5zbGlkZXJBcnJheSBpcyB1bmRlZmluZWRcblx0XHRcdFx0QHVuaXQuc2VsZWN0Q2hpbGQoXCJ0aXRsZVwiKS50ZXh0ID0gdmFsdWUgIyB1cGRhdGUgdGhlIHZhbHVlXG5cdFx0XHRcdEB1bml0LnNlbGVjdENoaWxkKCd0aXRsZScpLmF1dG9IZWlnaHQgPSB0cnVlICMgcG9zaXRpb25pbmcgXG5cdFx0XG5cdEBkZWZpbmUgJ3N1YlRpdGxlJywgXG5cdFx0Z2V0OiAtPiBAb3B0LnN1YlRpdGxlLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdGlmIEBvcHQuc2xpZGVyQXJyYXkgaXMgdW5kZWZpbmVkXG5cdFx0XHRcdEB1bml0LnNlbGVjdENoaWxkKFwic3ViX3RpdGxlXCIpLnRleHQgPSB2YWx1ZSAjIHVwZGF0ZSB0aGUgdmFsdWVcblx0XHRcdFx0QHVuaXQuc2VsZWN0Q2hpbGQoJ3N1Yl90aXRsZScpLnkgPSBAdW5pdC5zZWxlY3RDaGlsZCgndGl0bGUnKS5tYXhZXG5cdFx0XHRcblx0QGRlZmluZSAnY292ZXInLCBcblx0XHRnZXQ6IC0+IEBvcHQuY292ZXIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0aWYgQG9wdC5zbGlkZXJBcnJheSBpcyB1bmRlZmluZWRcblx0XHRcdFx0IyBAdW5pdC5zZWxlY3RDaGlsZChcImltYWdlXCIpLmltYWdlID0gXCJtb2R1bGVzL0ZGS2l0L3VuaXRzL0hlcm9Vbml0L2ltYWdlcy8je3ZhbHVlfVwiICMgdXBkYXRlIHRoZSB2YWx1ZVxuXHRcdFx0XHRAdW5pdC5zZWxlY3RDaGlsZChcImltYWdlXCIpLmltYWdlID0gdmFsdWUgIyB1cGRhdGUgdGhlIHZhbHVlXHRcdFx0XHRcblx0XG5cdCMgU2xpZGVyIGRhdGEgZnJvbSB0aGUgQXJyYXlcblx0QGRlZmluZSAnc2xpZGVyQXJyYXknLCBcblx0XHRnZXQ6IC0+IEBvcHQuc2xpZGVyQXJyYXksXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0Zm9yIGkgaW4gWzAuLi52YWx1ZS5sZW5ndGhdICMgcnVuIGxvb3AgYXMgbWFueSB0aW1lcyBhcyB0aGVyZSBhcmUgZW50aXJlc1xuXHRcdFx0XHRcblx0XHRcdFx0dW5pdCA9IEBzbGlkZXNbaV0gIyBzZWxlY3Rcblx0XHRcdFx0XG5cdFx0XHRcdHVuaXQuc2VsZWN0Q2hpbGQoXCJ0aXRsZVwiKS50ZXh0ID0gdmFsdWVbaV0udGl0bGVcblx0XHRcdFx0dW5pdC5zZWxlY3RDaGlsZChcInN1Yl90aXRsZVwiKS50ZXh0ID0gdmFsdWVbaV0uc3ViVGl0bGVcblx0XHRcdFx0IyB1bml0LnNlbGVjdENoaWxkKFwiaW1hZ2VcIikuaW1hZ2UgPSBcIm1vZHVsZXMvRkZLaXQvdW5pdHMvSGVyb1VuaXQvaW1hZ2VzLyN7dmFsdWVbaWldLmNvdmVyfVwiXG5cdFx0XHRcdHVuaXQuc2VsZWN0Q2hpbGQoXCJpbWFnZVwiKS5pbWFnZSA9IHZhbHVlW2ldLmNvdmVyXG5cblxuXHRcdFx0XHQjIExpbmUgYnJha2UgZml4IGZvciBUZXh0TGF5ZXJzXG5cdFx0XHRcdHVuaXQuc2VsZWN0Q2hpbGQoJ3RpdGxlJykuYXV0b0hlaWdodCA9IHRydWVcblx0XHRcdFx0dW5pdC5zZWxlY3RDaGlsZCgnc3ViX3RpdGxlJykueSA9IHVuaXQuc2VsZWN0Q2hpbGQoJ3RpdGxlJykubWF4WVxuXHRcdFx0XHQiLCJjbGFzcyB3aW5kb3cuR2VuZGVyU3dpdGNoIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0IyBNYWluIGZyYW1lIGZyb20gRGVzaWduIG1vZGVcblx0XHRjbXBfZnJhbWUgPSBnZW5kZXJfc3dpdGNoXG5cblx0XHQjIENUQVxuXHRcdEBjdGEgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJjdGFcIikuY29weSgpXG5cdFx0XG5cdFx0IyBHcmFkaWVudFxuXHRcdEBncmFkaWVudF8gPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJzaGFwZVwiKS5jb3B5KClcblx0XHRcblx0XHQjIEJhbm5lclxuXHRcdEBiYW5uZXJfID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiYmFubmVyXCIpLmNvcHkoKVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0c2l6ZTogY21wX2ZyYW1lLnNpemVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogY21wX2ZyYW1lLmJhY2tncm91bmRDb2xvclxuXHRcdFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0QGJhbm5lcl8ucGFyZW50ID0gQFxuXHRcdEBncmFkaWVudF8ucGFyZW50ID0gQFxuXHRcdEBjdGEucGFyZW50ID0gQFxuXG5cblxuXHRAZGVmaW5lIFwidGV4dFwiLFxuXHRcdGdldDogLT4gQG9wdC50ZXh0XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0LnRleHQgPSB2YWx1ZVxuXHRcdFx0QGN0YS5zZWxlY3RDaGlsZChcImJ1dHRvbl90ZXh0XCIpLnRleHQgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJ0eXBlXCIsXG5cdFx0Z2V0OiAtPiBAb3B0LnR5cGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHQudHlwZSA9IHZhbHVlXG5cdFx0XHRpZiBAb3B0LnR5cGUgaXMgXCJ3b21lblwiXG5cdFx0XHRcdEBiYW5uZXJfLmltYWdlID0gJCtcImRlZmF1bHQvZ2VuZGVyU3dpdGNoLTAwLmpwZ1wiXG5cdFx0XHRcblx0XHRcdGlmIEBvcHQudHlwZSBpcyBcIm1lblwiXG5cdFx0XHRcdEBiYW5uZXJfLmltYWdlID0gJCtcImRlZmF1bHQvZ2VuZGVyU3dpdGNoLTAxLmpwZ1wiXG5cblx0QGRlZmluZSBcImJhbm5lclwiLFxuXHRcdGdldDogLT4gQG9wdC5iYW5uZXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHQuYmFubmVyID0gdmFsdWVcblx0XHRcdEBiYW5uZXJfLmltYWdlID0gdmFsdWVcblxuXHRAZGVmaW5lIFwiZ3JhZGllbnRcIixcblx0XHRnZXQ6IC0+IEBvcHQuZ3JhZGllbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHQuZ3JhZGllbnQgPSB2YWx1ZVxuXHRcdFx0aWYgQG9wdC5ncmFkaWVudCBpcyB5ZXNcblx0XHRcdFx0QGdyYWRpZW50Xy52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0XG5cdFx0XHRpZiBAb3B0LmdyYWRpZW50IGlzIG5vXG5cdFx0XHRcdEBncmFkaWVudF8udmlzaWJsZSA9IGZhbHNlIiwiY2xhc3Mgd2luZG93LkZlYXR1cmVVbml0IGV4dGVuZHMgTGF5ZXJcblx0IyBGcmFtZSBmcm9tIERlc2lnbiBNb2RlXG5cdGZyYW1lID0gZmVhdHVyZV91bml0XG5cdGN0YUZyYW1lID0gZnJhbWUuc2VsZWN0Q2hpbGQoXCJjdGFcIilcblx0dGl0bGVUZXh0ID0gZnJhbWUuc2VsZWN0Q2hpbGQoXCJ0aXRsZVwiKVxuXHRkZXNjcmlwdGlvblRleHQgPSBmcmFtZS5zZWxlY3RDaGlsZChcImRlc2NyaXB0aW9uXCIpXG5cdGN0YUJ1dHRvbiA9IGZyYW1lLnNlbGVjdENoaWxkKFwiY3RhXCIpXG5cdCMgU3BhY2VzXG5cdHRpdGxlRGVzY3JpcHRpb25TcGFzZSA9IGRlc2NyaXB0aW9uVGV4dC55IC0gdGl0bGVUZXh0Lm1heFlcblx0ZGVzY3JpcHRpb25CdXR0b25TcGFzZSA9IGN0YUJ1dHRvbi55IC0gZGVzY3JpcHRpb25UZXh0Lm1heFlcblx0QnV0dG9uRnJhbWVTcGFzZSA9IGZyYW1lLmhlaWdodCAtIGN0YUJ1dHRvbi5tYXhZXG5cblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0b3B0ID0gXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IGZyYW1lLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGZyYW1lLmhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBmcmFtZS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdGNvdmVyOiBmcmFtZS5zZWxlY3RDaGlsZChcImltYWdlXCIpLmltYWdlXG5cdFx0XHR0aXRsZTogdGl0bGVUZXh0LnRleHRcblx0XHRcdGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvblRleHQudGV4dFxuXHRcdFx0IyBib3JkZXJXaWR0aDogMSAjIERlYnVnIGZyYW1lIHNpemVcblx0XHRcdG5vcGFkZGluZzogZmFsc2Vcblx0XHRzdXBlciBvcHRcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXHRcdCMgQ292ZXIgaW1hZ2Vcblx0XHRAcHJvZEJhY2tncm91ZCA9IGZyYW1lLnNlbGVjdENoaWxkKFwicHJvZF9iYWNrZ3JvdW5kXCIpLmNvcHkoKVxuXHRcdEBwcm9kQmFja2dyb3VkLnByb3BzID1cblx0XHRcdHBhcmVudDogQFxuXG5cdFx0QHByb2RCYWNrZ3JvdWQuc2VsZWN0Q2hpbGQoXCJpbWFnZVwiKS5wcm9wcyA9XG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0XCJtaXgtYmxlbmQtbW9kZVwiOiBcIm11bHRpcGx5XCJcblx0XHRcdGltYWdlOiBAb3B0LmNvdmVyXG5cblx0XHQjIFRleHRcblx0XHRAdGl0bGVUZXh0ID0gdGl0bGVUZXh0LmNvcHkoKVxuXHRcdEB0aXRsZVRleHQucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRmb250RmFtaWx5OiBcIlBvbGFyaXNcIlxuXHRcdFx0Zm9udFdlaWdodDogODAwXG5cdFx0XHR0ZXh0OiBAb3B0LnRpdGxlXG5cdFx0XHRmcmFtZTogdGl0bGVUZXh0LmZyYW1lXG5cblx0XHRAZGVzY3JpcHRpb25UZXh0ID0gZGVzY3JpcHRpb25UZXh0LmNvcHkoKVxuXHRcdEBkZXNjcmlwdGlvblRleHQucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRmb250RmFtaWx5OiBcIlBvbGFyaXNcIlxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHR0ZXh0OiBAb3B0LmRlc2NyaXB0aW9uXG5cdFx0XHRhdXRvSGVpZ2h0OiB0cnVlXG5cdFx0XHR5OiBAdGl0bGVUZXh0Lm1heFkgKyB0aXRsZURlc2NyaXB0aW9uU3Bhc2VcblxuXG5cdFx0IyBDcmVhdGUgQ1RBXG5cdFx0QHNob3BOb3dCdG4gPSBuZXcgQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdGZyYW1lOiBjdGFCdXR0b24uZnJhbWVcblx0XHRcdHg6IGN0YUJ1dHRvbi54LCB5OiBAZGVzY3JpcHRpb25UZXh0Lm1heFkgKyBkZXNjcmlwdGlvbkJ1dHRvblNwYXNlXG5cdFx0XHR0ZXh0OiBjdGFCdXR0b24uc2VsZWN0Q2hpbGQoXCJidXR0b25fdGV4dFwiKS50ZXh0XG5cblx0XHQjIFVwZGF0ZSBzaXplXG5cdFx0c3dpdGNoIEBvcHQuZGVzY3JpcHRpb25cblx0XHRcdHdoZW4gbnVsbCwgXCJub25lXCIsIFwiXCJcblx0XHRcdFx0QGRlc2NyaXB0aW9uVGV4dC5kZXN0cm95KClcblx0XHRcdFx0QHNob3BOb3dCdG4ueSA9IEB0aXRsZVRleHQubWF4WSArIGRlc2NyaXB0aW9uQnV0dG9uU3Bhc2Vcblx0XHRcdFx0QGhlaWdodCA9IEBzaG9wTm93QnRuLm1heFkgKyBCdXR0b25GcmFtZVNwYXNlXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBoZWlnaHQgPSBAc2hvcE5vd0J0bi5tYXhZICsgQnV0dG9uRnJhbWVTcGFzZVxuXG5cdFx0aWYgQG9wdC5ub3BhZGRpbmcgdGhlbiByZXNpemVJbWFnZShAcHJvZEJhY2tncm91ZClcblxuXHRyZXNpemVJbWFnZSA9IChsYXllcikgLT5cblx0XHRsYXllci5zZWxlY3RDaGlsZChcImltYWdlXCIpLmhlaWdodCA9IGxheWVyLmhlaWdodFxuXHRcdGxheWVyLnNlbGVjdENoaWxkKFwiaW1hZ2VcIikud2lkdGggPSBsYXllci53aWR0aFxuXHRcdGxheWVyLnNlbGVjdENoaWxkKFwiaW1hZ2VcIikubWlkWCA9IGxheWVyLndpZHRoIC8gMiAjIGNlbnRlcmluZ1xuXHRcdGxheWVyLnNlbGVjdENoaWxkKFwiaW1hZ2VcIikueSA9IDBcblxuXHQjIyMjIyMjIyMjIyMjIyMg8J+SviBHRVRUSU5HIEFORCBTRVRUSU5HIENMQVNTIERBVEEgIyMjIyMjIyMjIyMjIyMjXG5cdEBkZWZpbmUgJ2NvdmVyJywgXG5cdFx0Z2V0OiAtPiBAb3B0LmNvdmVyXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRpZiAhIUBjaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0QHNlbGVjdENoaWxkKFwiaW1hZ2VcIikuaW1hZ2UgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ3RpdGxlJywgXG5cdFx0Z2V0OiAtPiBAb3B0LnRpdGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRpZiAhIUBjaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0QHRpdGxlVGV4dC50ZXh0ID0gdmFsdWVcblxuXHRAZGVmaW5lICdkZXNjcmlwdGlvbicsIFxuXHRcdGdldDogLT4gQG9wdC5kZXNjcmlwdGlvblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0aWYgISFAY2hpbGRyZW4ubGVuZ3RoXG5cdFx0XHRcdEBkZXNjcmlwdGlvblRleHQudGV4dCA9IHZhbHVlXG5cdFx0XHRcdEBzaG9wTm93QnRuLnkgPSBAZGVzY3JpcHRpb25UZXh0Lm1heFkgKyBkZXNjcmlwdGlvbkJ1dHRvblNwYXNlXG5cdFx0XHRcdEBoZWlnaHQgPSBAc2hvcE5vd0J0bi5tYXhZICsgQnV0dG9uRnJhbWVTcGFzZVxuXG5cdEBkZWZpbmUgJ25vcGFkZGluZycsIFxuXHRcdGdldDogLT4gQG9wdC5ub3BhZGRpbmdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRpZiAhIUBjaGlsZHJlbi5sZW5ndGggYW5kIHZhbHVlXG5cdFx0XHRcdHJlc2l6ZUltYWdlKEBwcm9kQmFja2dyb3VkKSIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxud2lzaGxpc3RVbml0ID0gbmV3IFdpc2hsaXN0VW5pdFxuXHRhcnJheTogW1xuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiTmV3IFNlYXNvblwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwic3dpbmcgZGVuaW0gamFja2V0XCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDEuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiQkFMRU5DSUFHQVwiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjMSwyNTlcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJzZWFzb25cIjogXCJOZXcgU2Vhc29uXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJHdWNjaSBsb2dvIFQtc2hpcnQgd2l0aCBzaG9vdGluZyBzdGFyc1wiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzAyLmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkdVQ0NJXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqMxLDUwMFwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIlwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwic2xlZXZlbGVzcyBWLW5lY2sgc3RhbXAgcHJpbnQgZHJlc3NcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wMy5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJHVUNDUEVURVIgUElMT1RUT0lcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozczOVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIk5ldyBTZWFzb25cIixcblx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcImZyaW5nZWQgbmV0dGVkIG1pZGkgZHJlc3NcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wNS5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJDQUxWSU4gS0xFSU4gMjA1VzM5TllDXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqMxLDU3NVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIlwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwiTmV3IFN3aW5nIHNoaXJ0XCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDYuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiQkFMRU5DSUFHQVwiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjMSwwNTBcIlxuXHRcdH1cblx0XVxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuIyBSZWNvbWVuZGVkIExpc3RcbnNjcm9sbCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0c2l6ZTogU2NyZWVuLnNpemVcblx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0Y29udGVudEluc2V0OiBcblx0XHRib3R0b206IE1fc3BhY2VyXG5cbnJlY29tZW5kZWRMaXN0ID0gbmV3IFJlY29tbWVuZGVkTGlzdFVuaXRcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHRpY29uOiB0cnVlXG5cdGJvcmRlcjogdHJ1ZVxuXHRkZXNjcmlwdGlvbjogdHJ1ZVxuXG5zY3JvbGwudXBkYXRlQ29udGVudCgpICMgVXBkYXRlIHNjcm9sbFxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuIyBDcmVhdGUgcHJvZHVjdCB1bml0XG5wcm9kdWN0VW5pdCA9IG5ldyBQcm9kdWN0VW5pdFxuICAgIHRpdGxlOiBcIkhlbGxvIFdvcmtkXCJcbiAgICBkZXNjcmlwdGlvbjogXCJTZWxlY3Rpb24gb2YgbmV3IGl0ZW1zIGhhcyBqdXN0IGFycml2ZWQgdG8gb3VyIGJvdXRpcXVlcy5cIlxuICAgIHByb2R1Y3RzQXJyYXk6IFtcbiAgICAgICAgeyAjIFByb2R1Y3QgMSBcbiAgICAgICAgXCJzaG9ydERlc2NyaXB0aW9uXCI6IFwieWVsbG93IHplYnJhIGJhZyBcIlxuICAgICAgICBcImltYWdlc1wiOiBbXCJ1cmxcIjogJCtcImRlZmF1bHQvcHJvZHVjdHMvMDEuanBnXCJdXG4gICAgICAgIFwiYnJhbmRcIjoge1wibmFtZVwiOiBcIlByYWRhXCJ9LFxuICAgICAgICBcInByaWNlXCI6IDEzNS4wXG4gICAgICAgIH1cbiAgICBdXG5cdFxuXHRcIlwiXCIiLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbiMgQ3JlYXRlIHByb2R1Y3QgdW5pdFxucHJvZHVjdFVuaXQgPSBuZXcgUHJvZHVjdFVuaXRcblx0dGl0bGU6IFwiSGVsbG8gV29ybGRcIlxuXHRkZXNjcmlwdGlvbjogXCJTZWxlY3Rpb24gb2YgbmV3IGl0ZW1zIGhhcyBqdXN0IGFycml2ZWQgdG8gb3VyIGJvdXRpcXVlcy5cIlxuXHRwcm9kdWN0c0FycmF5OiBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyAkK1wiZGVmYXVsdC9wcm9kdWN0cy5qc29uXCJcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyBEYXRhIGFycmF5XG5hcnJheSA9IFxuW1xuXHR7XG5cdHRpdGxlOiBcIkhlbGxvIFdvcmxkXCIsIFxuXHRkZXNjcmlwdGlvbjogXCJQbGVhc2Ugc2VlIG91ciByZWNjb21lbmRhdGlvbnMsIGJhc2VkIG9uIGRlc2lnbmVycyB5b3UgbG92ZS5cIiwgXG5cdHByb2R1Y3RzQXJyYXk6IFtcblx0XHRcdHsgIyBQcm9kdWN0IDFcblx0XHRcdFx0XCJicmFuZFwiOiB7IFwibmFtZVwiOiBcIkdVQ0NJXCIgfSwgXG5cdFx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcIlRpZ2VyIGVtYnJvaWRlZCBob29kZWQgc3dlYXRzaGlydFwiLCBcblx0XHRcdFx0XCJwcmljZVwiOiBcIsKjMjQyMFwiLCBcblx0XHRcdFx0XCJpbWFnZXNcIjogW3sgXCJpc0xvY2FsXCI6IHRydWUsIFwidXJsXCI6ICQrXCJkZWZhdWx0L3Byb2R1Y3RzLzAxLmpwZ1wifV1cblx0XHRcdH0gXG5cdF19XG5dXG5cbiMgQ3JlYXRlIHByb2R1Y3QgdW5pdFxudW5pdCA9IG5ldyBQcm9kdWN0VW5pdFxuXHR0aXRsZTogYXJyYXlbMF0udGl0bGVcblx0ZGVzY3JpcHRpb246IGFycmF5WzBdLmRlc2NyaXB0aW9uXG5cdHByb2R1Y3RzQXJyYXk6IGFycmF5WzBdLnByb2R1Y3RzQXJyYXlcblxuXHRcIlwiXCIiLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbiMgQ3JlYXRlIHByb2R1Y3Qgc2V0XG5wcm9kdWN0U2V0ID0gbmV3IFByb2R1Y3RTZXRcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIlNob3AgTm93XCJcblx0Y292ZXI6ICQrXCJkZWZhdWx0L2hlcm8tMDEuanBnXCIsIFxuXHRwcm9kdWN0c0FycmF5OiBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyAkK1wiZGVmYXVsdC9wcm9kdWN0cy5qc29uXCJcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cbiMgQ3JlYXRlIGRlZmF1bHQgU2Nyb2xsQ29tcG9uZW50XG5zY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdHNpemU6IFNjcmVlbi5zaXplXG5cdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFxuIyBDcmVhdGUgUHJvZHVjdCBMaXN0aW5nIFVuaXRcbmxpc3RVbml0ID0gbmV3IFByb2R1Y3RMaXN0aW5nVW5pdFxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdGFycmF5OiBbXG5cdFx0e1xuXHRcdFx0XCJzZWFzb25cIjogXCJOZXcgU2Vhc29uXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJzd2luZyBkZW5pbSBqYWNrZXRcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wMS5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJCQUxFTkNJQUdBXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqMxLDI1OVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIk5ldyBTZWFzb25cIixcblx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcIkd1Y2NpIGxvZ28gVC1zaGlydCB3aXRoIHNob290aW5nIHN0YXJzXCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDIuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiR1VDQ0lcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozEsNTAwXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJzbGVldmVsZXNzIFYtbmVjayBzdGFtcCBwcmludCBkcmVzc1wiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzAzLmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkdVQ0NQRVRFUiBQSUxPVFRPSVwiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjNzM5XCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiTmV3IFNlYXNvblwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwiZnJpbmdlZCBuZXR0ZWQgbWlkaSBkcmVzc1wiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzA1LmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkNBTFZJTiBLTEVJTiAyMDVXMzlOWUNcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozEsNTc1XCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJOZXcgU3dpbmcgc2hpcnRcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wNi5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJCQUxFTkNJQUdBXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqMxLDA1MFwiXG5cdFx0fVxuXHRdXG5cbiMgVXBkYXRlIHNjcm9sbFxuc2Nyb2xsLnVwZGF0ZUNvbnRlbnQoKVxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cbiMgQ3JlYXRpbmcgcHJvZHVjdCBoZXJvXG5wcm9kdWN0SGVybyA9IG5ldyBQcm9kdWN0SGVyb1xuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIlBsZWFzZSBzZWUgb3VyIHJlY2NvbWVuZGF0aW9ucywgYmFzZWQgb24gZGVzaWduZXJzIHlvdSBsb3ZlLlwiXG5cdGRlc2NyaXB0aW9uOiBcIlRoZXJlIHdhcyBhIHNoaWZ0IGluIHNwb3J0c3dlYXIgdGhpcyBzZWFzb24uIFN1cmUsIGV4cGVjdGVkIGluamVjdGlvbnMgb2YgbmluZXRpZXMgeW91dGggY3VsdHVyZSBjb3VydGVzeSBvZiBHb3NoYSBhbmQgdGhlIGdhbmcgd2VyZSBzdGlsbCBwcmVzZW50LCBidXQgdGhlIGdlbmVyYWwgbW9vZCBwbGF5ZWQgdG8gdGhlIG1vcmUgZGlzdGFudCBwYXN0IG9mIHNldmVudGllcyBhbmQgZWlnaHRpZXMgYXRobGV0aWMgd2Vhci5cIlxuXHRjb3ZlcjogJCtcImRlZmF1bHQvcHJvZHVjdC1oZXJvLTAxLmpwZ1wiXG5cdHByb2R1Y3RzQXJyYXk6IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jICQrXCJkZWZhdWx0L3Byb2R1Y3RzLmpzb25cIlxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuIyBQRFAgSGVyb1xubXlBcnJheSA9IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIFwibW9kdWxlcy9GRktpdC91bml0cy9QRFBIZXJvVW5pdC9kYXRhL3Byb2R1Y3RJbWFnZXMuanNvblwiXG5cbnBkcEhlcm9Vbml0ID0gbmV3IFBEUEhlcm9Vbml0XG4gICAgcGFyZW50OiBzY3JvbGwuY29udGVudFxuICAgIGFycmF5OiBteUFycmF5XG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbiMgT3JkZXIgdHJha2VyIHVuaXRcbm9yZGVyX3RyYWtlciA9IG5ldyBPcmRlclRyYWtlclxuXHR0aXRsZTogXCJXZSd2ZSBzaGlwcGVkIHlvdXIgb3JkZXJcIlxuXHRzdWJUaXRsZTogXCJFeHBlY3RlZDogNuKAieKAk+KAiTggSnVsXCJcblx0aW1hZ2U6ICQrXCJkZWZhdWx0L3Byb2R1Y3QtMDEuanBnXCJcblx0cHJvZ3Jlc3M6IDUwXG5cdHByb2dTdGFydDogMjVcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyBPcmRlciB0cmFrZXIgc2xpZGVyXG5vcmRlcl90cmFrZXJfc2xpZGVyID0gbmV3IE9yZGVyVHJha2VyXG5cdHNsaWRlckFycmF5OiBbXG5cdFx0e3RpdGxlIDogXCJUaXRsZSAxXCIgLCBzdWJUaXRsZTogXCJkYXRlMVwiLCBpbWFnZTogJCtcImRlZmF1bHQvcHJvZHVjdC0wMS5qcGdcIiwgcHJvZ3Jlc3M6IDc1LH1cblx0XHR7dGl0bGUgOiBcIlRpdGxlIDJcIiAsIHN1YlRpdGxlOiBcImRhdGUyXCIsIGltYWdlOiAkK1wiZGVmYXVsdC9oZXJvLTAxLmpwZ1wiLCBwcm9ncmVzczogNTAsIHByb2dTdGFydDoyNX1cblx0XHR7dGl0bGUgOiBcIlRpdGxlIDJcIiAsIHN1YlRpdGxlOiBcImRhdGUzXCIsIGltYWdlOiAkK1wiZGVmYXVsdC9oZXJvLTAxLmpwZ1wiLCBwcm9ncmVzczogNzUsfVxuXHRcdHt0aXRsZSA6IFwiVGl0bGUgMlwiICwgc3ViVGl0bGU6IFwiZGF0ZTRcIiwgaW1hZ2U6ICQrXCJkZWZhdWx0L2hlcm8tMDEuanBnXCIsIHByb2dyZXNzOiAxMDAsIHByb2dTdGFydDo1MH1cblx0XVxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIENyZWF0ZSBoZXJvIHVuaXRcbmhlcm9Vbml0ID0gbmV3IEhlcm9Vbml0XG5cdHRpdGxlOiBcIkhlbGxvIFdvcmxkXCJcblx0c3ViVGl0bGU6IFwiU2hvcCBub3dcIlxuXHRjb3ZlcjogJCtcImRlZmF1bHQvaGVyby0wMS5qcGdcIlxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIENyZWF0ZSBIZXJvIHVuaXQgd2l0aCBtdWx0aXBsZSBzbGlkZXNcbmhlcm9TbGlkZXIgPSBuZXcgSGVyb1VuaXRcblx0c2xpZGVyQXJyYXk6IFtcblx0XHR7dGl0bGUgOiBcIlRpdGxlIDFcIiAsIHN1YlRpdGxlOiBcIlNob3AgTm93XCIsIGNvdmVyOiAkK1wiZGVmYXVsdC9oZXJvLTAwLmpwZ1wifVxuXHRcdHt0aXRsZSA6IFwiVGl0bGUgMlwiICwgc3ViVGl0bGU6IFwiU2hvcCBOb3dcIiwgY292ZXI6ICQrXCJkZWZhdWx0L2hlcm8tMDEuanBnXCJ9XG5cdF1cblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyBDcmVhdGUgZ2VuZGVyIHN3aXRjaCBiYW5uZXJcbmdlbmRlclN3aXRjaCA9IG5ldyBHZW5kZXJTd2l0Y2hcblx0dGV4dDogXCJTaG9wIE1lblwiXG5cdHR5cGU6IFwibWVuXCJcblx0Z3JhZGllbnQ6IHllc1xuIyBcdGJhbm5lcjogJCtcImRlZmF1bHQvZmVhdHVyZS0wMC5qcGdcIlxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIENyZWF0ZSBmZWF0dXJlIHVuaXRcbmZlYXR1cmVVbml0ID0gbmV3IEZlYXR1cmVVbml0XG5cdHRpdGxlOiBcIkhlbGxvIFdvcmxkXCJcblx0c3ViVGl0bGU6IFwiU2hvcCBub3dcIlxuXHRkZXNjcmlwdGlvbjogXCJTZWxlY3Rpb24gb2YgbmV3IGl0ZW1zIGhhcyBqdXN0IGFycml2ZWQgdG8gb3VyIGJvdXRpcXVlcy5cIlxuXHRjb3ZlcjogJCtcImRlZmF1bHQvZmVhdHVyZS0wMS5qcGdcIlxuXHRub3BhZGRpbmc6IHllc1xuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIENyZWF0ZSBmZWF0dXJlIHVuaXQgd2l0aCBwcm9kdWN0IGltYWdlXG5mZWF0dXJlVW5pdCA9IG5ldyBGZWF0dXJlVW5pdFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIlNob3Agbm93XCJcblx0ZGVzY3JpcHRpb246IFwiU2VsZWN0aW9uIG9mIG5ldyBpdGVtcyBoYXMganVzdCBhcnJpdmVkIHRvIG91ciBib3V0aXF1ZXMuXCJcblx0Y292ZXI6ICQrXCJkZWZhdWx0L3Byb2R1Y3QtMDEuanBnXCJcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxudGV4dDEgPSBuZXcgRkZUZXh0TGF5ZXJcblx0dGV4dFN0eWxlOiBcIlhMQm9sZFwiXG5cdHRleHQ6IFwiWExhcmdlIOKAlCAyNiBCb2xkXCJcblx0eTogMTAwXG5cdHg6IE1fc3BhY2VyXG5cdFxudGV4dDIgPSBuZXcgRkZUZXh0TGF5ZXJcblx0dGV4dFN0eWxlOiBcIkxCb2xkXCJcblx0dGV4dDogXCJMYXJnZSDigJQgMTggQm9sZFwiXG5cdHk6IHRleHQxLm1heFkgKyBNX3NwYWNlclxuXHR4OiBNX3NwYWNlclxuXHRcbnRleHQzID0gbmV3IEZGVGV4dExheWVyXG5cdHRleHRTdHlsZTogXCJMXCJcblx0dGV4dDogXCJMYXJnZSDigJQgMTggQm9va1wiXG5cdHk6IHRleHQyLm1heFkgKyBNX3NwYWNlclxuXHR4OiBNX3NwYWNlclxuXG50ZXh0NCA9IG5ldyBGRlRleHRMYXllclxuXHR0ZXh0U3R5bGU6IFwiTUNvbmRcIlxuXHR0ZXh0OiBcIk1lZGl1bSDigJQgMTQgQ29uZGVuY2VkXCJcblx0eTogdGV4dDMubWF4WSArIE1fc3BhY2VyXG5cdHg6IE1fc3BhY2VyXG5cbnRleHQ1ID0gbmV3IEZGVGV4dExheWVyXG5cdHRleHRTdHlsZTogXCJNQm9sZFwiXG5cdHRleHQ6IFwiTWVkaXVtIOKAlCAxNSBCb2xkXCJcblx0eTogdGV4dDQubWF4WSArIE1fc3BhY2VyXG5cdHg6IE1fc3BhY2VyXG5cbnRleHQ2ID0gbmV3IEZGVGV4dExheWVyXG5cdHRleHRTdHlsZTogXCJNXCJcblx0dGV4dDogXCJNZWRpdW0g4oCUIDE1IEJvb2tcIlxuXHR5OiB0ZXh0NS5tYXhZICsgTV9zcGFjZXJcblx0eDogTV9zcGFjZXJcblxudGV4dDcgPSBuZXcgRkZUZXh0TGF5ZXJcblx0dGV4dFN0eWxlOiBcIlNCb2xkXCJcblx0dGV4dDogXCJTbWFsbCDigJQgMTIgQm9sZFwiXG5cdHk6IHRleHQ2Lm1heFkgKyBNX3NwYWNlclxuXHR4OiBNX3NwYWNlclxuXG5cblx0XCJcIlwiIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIENyZWF0ZSBkZWZhdWx0IFNjcm9sbENvbXBvbmVudFxuc2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXG4jIHVuaXQgMVxuIyB1bml0ID0gbmV3IHVuaXRDbGFzc1xuIyBcdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblxuIyB1bml0IDJcbiMgdW5pdCA9IG5ldyB1bml0Q2xhc3NcbiMgXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cbiMgdW5pdCAzXG4jIHVuaXQgPSBuZXcgdW5pdENsYXNzXG4jIFx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXG5cbnNjcm9sbC51cGRhdGVDb250ZW50KCkgIyBVcGRhdGUgc2Nyb2xsXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbiMgQ3JlYXRlIGRlZmF1bHQgU2Nyb2xsQ29tcG9uZW50XG5zY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdHNpemU6IFNjcmVlbi5zaXplXG5cdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cbiMgQ3JlYXRlIGhlcm8gdW5pdFxudW5pdDEgPSBuZXcgSGVyb1VuaXRcblx0dGl0bGU6IFwiSGVsbG8gV29ybGRcIlxuXHRzdWJUaXRsZTogXCJTaG9wIG5vd1wiXG5cdGNvdmVyOiAkK1wiZGVmYXVsdC9oZXJvLTAxLmpwZ1wiXG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblxuIyBDcmVhdGUgcHJvZHVjdCB1bml0XG51bml0MiA9IG5ldyBQcm9kdWN0VW5pdFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdGRlc2NyaXB0aW9uOiBcIlNlbGVjdGlvbiBvZiBuZXcgaXRlbXMgaGFzIGp1c3QgYXJyaXZlZCB0byBvdXIgYm91dGlxdWVzLlwiXG5cdHByb2R1Y3RzQXJyYXk6IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jICQrXCJkZWZhdWx0L3Byb2R1Y3RzLmpzb25cIlxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdHk6IHVuaXQxLm1heFlcblxuIyBDcmVhdGUgcHJvZHVjdCBzZXRcbnVuaXQzID0gbmV3IFByb2R1Y3RTZXRcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIlNob3AgTm93XCJcblx0Y292ZXI6ICAkK1wiZGVmYXVsdC9oZXJvLTAxLmpwZ1wiLCBcblx0cHJvZHVjdHNBcnJheTogSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgJCtcImRlZmF1bHQvcHJvZHVjdHMuanNvblwiXG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblx0eTogdW5pdDIubWF4WVxuXG4jIERpdmlkZXIgbGluZVxubGluZSA9IG5ldyBLZXlsaW5lXG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblx0eTogdW5pdDMubWF4WVxuXG4jIENyZWF0ZSBmZWF0dXJlIHVuaXQgd2l0aCBwcm9kdWN0IGltYWdlXG51bml0NCA9IG5ldyBGZWF0dXJlVW5pdFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIlNob3Agbm93XCJcblx0ZGVzY3JpcHRpb246IFwiU2VsZWN0aW9uIG9mIG5ldyBpdGVtcyBoYXMganVzdCBhcnJpdmVkIHRvIG91ciBib3V0aXF1ZXMuXCJcblx0Y292ZXI6ICQrXCJkZWZhdWx0L3Byb2R1Y3QtMDEuanBnXCJcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHR5OiBsaW5lLm1heFlcblxuIyBDcmVhdGluZyBwcm9kdWN0IGhlcm9cbnVuaXQ1ID0gbmV3IFByb2R1Y3RIZXJvXG5cdHRpdGxlOiBcIkhlbGxvIFdvcmxkXCJcblx0c3ViVGl0bGU6IFwiUGxlYXNlIHNlZSBvdXIgcmVjY29tZW5kYXRpb25zLCBiYXNlZCBvbiBkZXNpZ25lcnMgeW91IGxvdmUuXCJcblx0ZGVzY3JpcHRpb246IFwiVGhlcmUgd2FzIGEgc2hpZnQgaW4gc3BvcnRzd2VhciB0aGlzIHNlYXNvbi4gU3VyZSwgZXhwZWN0ZWQgaW5qZWN0aW9ucyBvZiBuaW5ldGllcyB5b3V0aCBjdWx0dXJlIGNvdXJ0ZXN5IG9mIEdvc2hhIGFuZCB0aGUgZ2FuZyB3ZXJlIHN0aWxsIHByZXNlbnQsIGJ1dCB0aGUgZ2VuZXJhbCBtb29kIHBsYXllZCB0byB0aGUgbW9yZSBkaXN0YW50IHBhc3Qgb2Ygc2V2ZW50aWVzIGFuZCBlaWdodGllcyBhdGhsZXRpYyB3ZWFyLlwiXG5cdGNvdmVyOiAkK1wiZGVmYXVsdC9wcm9kdWN0LWhlcm8tMDEuanBnXCJcblx0cHJvZHVjdHNBcnJheTogSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgJCtcImRlZmF1bHQvcHJvZHVjdHMuanNvblwiXG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblx0eTogdW5pdDQubWF4WVxuXG5zY3JvbGwudXBkYXRlQ29udGVudCgpICMgVXBkYXRlIHNjcm9sbFxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIyMjIyMjIyMjIFdpc2hsaXN0IFBhZ2UgIyMjIyMjIyMjIyNcbnN0YXR1c0JhciA9IG5ldyBTdGF0dXNCYXJcblxud2lzaExpc3RQYWdlID0gbmV3IExheWVyXG5cdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cbndpc2hsaXN0SGVhZGVyID0gbmV3IEhlYWRlclxuXHRwYXJlbnQ6IHdpc2hMaXN0UGFnZVxuXHRhZnRlcjogc3RhdHVzQmFyXG5cdHRpdGxlOiBcIldpc2hsaXN0XCJcblx0aWNvblJpZ2h0OiBcImJhZ1wiXG5cdHNlYXJjaDogdHJ1ZVxuXG53aXNobGlzdFRhYnMgPSBuZXcgVGFic1xuXHRwYXJlbnQ6IHdpc2hMaXN0UGFnZVxuXHRhZnRlcjogd2lzaGxpc3RIZWFkZXJcblx0aXRlbXM6IFtcImFsbFwiLCBcIm9uIHNhbGVcIl1cblxud2lzaGxpc3RUYWJzLm9uX3NhbGUudGV4dC5jb2xvciA9IFwicmVkXCJcblxud2lzaGxpc3RVbml0ID0gbmV3IFdpc2hsaXN0VW5pdFxuXHRwYXJlbnQ6IHdpc2hMaXN0UGFnZVxuXHRhZnRlcjogd2lzaGxpc3RUYWJzXG5cdGhlaWdodDogU2NyZWVuLmhlaWdodCAtIHdpc2hsaXN0VGFicy5tYXhZXG5cdGFycmF5OiBbXG5cdFx0e1xuXHRcdFx0XCJzZWFzb25cIjogXCJOZXcgU2Vhc29uXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJzd2luZyBkZW5pbSBqYWNrZXRcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wMS5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJCQUxFTkNJQUdBXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqMxLDI1OVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIk5ldyBTZWFzb25cIixcblx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcIkd1Y2NpIGxvZ28gVC1zaGlydCB3aXRoIHNob290aW5nIHN0YXJzXCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDIuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiR1VDQ0lcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozEsNTAwXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJzbGVldmVsZXNzIFYtbmVjayBzdGFtcCBwcmludCBkcmVzc1wiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzAzLmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkdVQ0NQRVRFUiBQSUxPVFRPSVwiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjNzM5XCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiTmV3IFNlYXNvblwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwiZnJpbmdlZCBuZXR0ZWQgbWlkaSBkcmVzc1wiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzA1LmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkNBTFZJTiBLTEVJTiAyMDVXMzlOWUNcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozEsNTc1XCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJOZXcgU3dpbmcgc2hpcnRcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wNi5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJCQUxFTkNJQUdBXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqMxLDA1MFwiXG5cdFx0fVxuXHRdXG5cbndpc2hsaXN0SGVhZGVyLnRpdGxlID0gXCJXaXNobGlzdCAoXCIgKyB3aXNobGlzdFVuaXQuY29udGVudC5jaGlsZHJlbi5sZW5ndGggKyBcIilcIlxuXHRcbndpc2hsaXN0VW5pdC5saXN0Y2FyZF8xLm9uVGFwIC0+XG5cdHByaW50IFwiVGFwIVwiXG5cbndpc2hsaXN0VW5pdC5zdGF0ZXMgPVxuXHRoaWRlOlxuXHRcdHg6IC1TY3JlZW4ud2lkdGhcblx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHR0aW1lOiAwLjJcblxuIyBPbiBTYWxlXG53aXNobGlzdFVuaXRTYWxlID0gbmV3IFdpc2hsaXN0VW5pdFxuXHRwYXJlbnQ6IHdpc2hMaXN0UGFnZVxuXHR4OiBTY3JlZW4ud2lkdGhcblx0YWZ0ZXI6IHdpc2hsaXN0VGFic1xuXHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgLSB3aXNobGlzdFRhYnMubWF4WVxuXHRhcnJheTogW1xuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiTmV3IFNlYXNvblwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwic3dpbmcgZGVuaW0gamFja2V0XCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDEuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiQkFMRU5DSUFHQVwiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjMSwyNTlcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJzZWFzb25cIjogXCJOZXcgU2Vhc29uXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJHdWNjaSBsb2dvIFQtc2hpcnQgd2l0aCBzaG9vdGluZyBzdGFyc1wiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzAyLmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkdVQ0NJXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqMxLDUwMFwiXG5cdFx0fVxuXHRdXG5cbndpc2hsaXN0VW5pdFNhbGUuc3RhdGVzID1cblx0c2hvdzpcblx0XHR4OiAwXG5cdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0dGltZTogMC40XG5cdFx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAwLjkpXG5cbiMgT24gdGFiIGFuaW1hdGlvblxud2lzaGxpc3RUYWJzLm9uX3NhbGUub25UYXAgLT5cblx0d2lzaGxpc3RVbml0LmFuaW1hdGUoXCJoaWRlXCIpXG5cdHdpc2hsaXN0VW5pdFNhbGUuYW5pbWF0ZShcInNob3dcIilcblxud2lzaGxpc3RUYWJzLmFsbC5vblRhcCAtPlxuXHR3aXNobGlzdFVuaXQuYW5pbWF0ZShcImRlZmF1bHRcIilcblx0d2lzaGxpc3RVbml0U2FsZS5hbmltYXRlKFwiZGVmYXVsdFwiKVxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIyMjIyMjIyMgU25pcHBldCBTZWFyY2ggUGFnZSAjIyMjIyMjIyNcbnN0YXR1c0JhciA9IG5ldyBTdGF0dXNCYXJcblx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cbmZsb3cgPSBuZXcgRmxvd0NvbXBvbmVudFxuXHRcdFxuY2F0ZWdvcmllc1BhZ2UgPSBuZXcgQ2F0ZWdvcmllc1BhZ2Vcblx0eDogU2NyZWVuLndpZHRoXG5cdGFjdGlvbnM6IHtcblx0XHRcIml0ZW0xXCI6IC0+IHByaW50IFwiVGFwIVwiLFxuXHRcdFwiaXRlbTJcIjogLT4gcHJpbnQgXCJBbmQgYW5vdGhlciBUYXAhXCJcblx0fVxuXG5jYXRlZ29yaWVzUGFnZS5oZWFkZXIuaWNvbkxlZnRfbGF5ZXIub25UYXAgLT5cblx0Zmxvdy5zaG93UHJldmlvdXMoKVxuXG5kZXNpZ25lcnNQYWdlID0gbmV3IERlc2lnbmVyc1BhZ2Vcblx0eDogU2NyZWVuLndpZHRoXG5cdGFjdGlvbnM6IHtcblx0XHRcIjI2ODIwODJcIjogLT4gcHJpbnQgXCJZbyFcIlxuXHR9XG5cdFxuZGVzaWduZXJzUGFnZS5oZWFkZXIuaWNvbkxlZnRfbGF5ZXIub25UYXAgLT5cblx0Zmxvdy5zaG93UHJldmlvdXMoKVxuXG5zZWFyY2hQYWdlID0gbmV3IExheWVyXG5cdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFxuc2VhcmNoQ21wID0gbmV3IFNlYXJjaFVuaXRcblx0cGFyZW50OiBzZWFyY2hQYWdlXG5cdGFjdGlvbnM6IHtcblx0XHRcIjI2ODIwODJcIjogLT4gcHJpbnQgXCJJdCdzIG15IFRhcCFcIlxuXHR9XG5cbmRlc2lnbmVyc0xpc3RJdGVtID0gbmV3IExpc3RJdGVtXG5cdHR5cGU6IFwid2lkZVwiXG5cdHJpZ2h0OiBcImFycm93LXJpZ2h0XCJcblx0dGV4dDogXCJEZXNpZ25lcnNcIlxuXHRhZnRlcjogc2VhcmNoQ21wXG5cbmRlc2lnbmVyc0xpc3RJdGVtLm9uVGFwIC0+XG5cdGZsb3cuc2hvd05leHQoZGVzaWduZXJzUGFnZSlcblxuY2F0ZWdvcmllc0xpc3RJdGVtID0gbmV3IExpc3RJdGVtXG5cdHR5cGU6IFwid2lkZVwiXG5cdHJpZ2h0OiBcImFycm93LXJpZ2h0XCJcblx0dGV4dDogXCJDYXRlZ29yaWVzXCJcblx0YWZ0ZXI6IGRlc2lnbmVyc0xpc3RJdGVtXG5cbmNhdGVnb3JpZXNMaXN0SXRlbS5vblRhcCAtPlxuXHRmbG93LnNob3dOZXh0KGNhdGVnb3JpZXNQYWdlKVxuXG5mbG93LnNob3dOZXh0KHNlYXJjaFBhZ2UpXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG4jIFJlZmluZSBGaWx0ZXJzXG5zdGF0dXNfYmFyID0gbmV3IFN0YXR1c0JhclxuXG5oZWFkZXJfcmVmaW5lID0gbmV3IEhlYWRlclxuXHRhZnRlcjogc3RhdHVzX2JhclxuXHR0aXRsZTogXCJSZWZpbmVcIlxuXHRpY29uTGVmdDogXCJiaWctY3Jvc3NcIlxuXG4jIENyZWF0ZSBTY3JvbGxDb21wb25lbnRcbnNjcm9sbCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0eTogaGVhZGVyX3JlZmluZS5tYXhZXG5cdGhlaWdodDogU2NyZWVuLmhlaWdodCAtIHN0YXR1c19iYXIuaGVpZ2h0IC0gaGVhZGVyX3JlZmluZS5oZWlnaHRcblx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZmZmZlwiXG5cdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5zY3JvbGwuY29udGVudC5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNmZmZmZmZcIlxuXG5cbnRpdGxlMSA9IG5ldyBMaXN0VGl0bGVcblx0dGV4dDogXCJTb3J0IGJ5XCJcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHR5OiBNX3NwYWNlclxuXG5zb3J0QnlMaXN0ID0gbmV3IExpc3RSYWRpb1NlbGVjdFxuXHRzZWxlY3RBcnJheTogW1xuXHRcdHt0ZXh0IDogXCJPdXIgUGlja3NcIiwgb24gOiB0cnVlfSwgXG5cdFx0e3RleHQgOiBcIk5ldyBJdGVtc1wifVxuXHRcdHt0ZXh0IDogXCJQcmljZSAoaGlnaCBmaXJzdClcIn1cblx0XHR7dGV4dCA6IFwiUHJpY2UgKGxvdyBmaXJzdClcIn1cblx0XHRdXG5cdGFmdGVyOiB0aXRsZTFcblxudGl0bGUyID0gbmV3IExpc3RUaXRsZVxuXHR0ZXh0OiBcIkZpbHRlciBieVwiXG5cdHk6IE1fc3BhY2VyXG5cdGFmdGVyOiBzb3J0QnlMaXN0XG5cbmxpc3RJdGVtMSA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIkRlc2lnbmVyc1wiXG5cdGxlZnQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRhZnRlcjogdGl0bGUyXG5cbmxpc3RJdGVtMiA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIkNvbG91cnNcIlxuXHRsZWZ0OiBcImFycm93LXJpZ2h0XCJcblx0YWZ0ZXI6IGxpc3RJdGVtMVxuXG5saXN0SXRlbTMgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJQcmljZSBSYW5nZVwiXG5cdGxlZnQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRhZnRlcjogbGlzdEl0ZW0yXG5cbmxpc3RJdGVtNCA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIkY5MCBEZWxpdmVyeVwiXG5cdGxlZnQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRhZnRlcjogbGlzdEl0ZW0zXG5cbmxpc3RJdGVtNSA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIlNhbWUgRGF5IERlbGl2ZXJ5XCJcblx0bGVmdDogXCJhcnJvdy1yaWdodFwiXG5cdGFmdGVyOiBsaXN0SXRlbTRcblxubGlzdEl0ZW02ID0gbmV3IExpc3RJdGVtXG5cdHRleHQ6IFwiU2FsZSBEaXNjb3VudFwiXG5cdGxlZnQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRhZnRlcjogbGlzdEl0ZW01XG5cblxuc2Nyb2xsLnVwZGF0ZUNvbnRlbnQoKSAjIFVwZGF0ZSBzY3JvbGxcblxuXG5zaG93UmVzdWx0c0J1dG9uID0gbmV3IEJ1dHRvbkZpeGVkXG5cdHRleHQ6IFwiU2hvdyAxMjUwIHJlc3VsdHNcIlxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIFBMUCBTY3JlZW4gY29udGFpbmVyIHRoYXQgY2FuIGJlIHVzZWQgYnkgRmxvdyBDb21wb25lbnRcbnBscFNjcmVlbiA9IG5ldyBMYXllclxuXHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdGhlaWdodDogU2NyZWVuLmhlaWdodCAjIE1pbmQgdG8gcmVtb3ZlIHN0YXR1c2JhciAmIHRhYmJhciBoZWlnaHQgbGF0ZXIuXG5cdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cbnBscEhlYWRlciA9IG5ldyBIZWFkZXJcblx0dGl0bGU6IFwiU3VtbWVyXCJcblx0c3ViVGl0bGU6IFwiNyBpdGVtc1wiXG5cdGljb25MZWZ0OiBcImJpZy1hcnJvd1wiXG5cdGljb25SaWdodDogXCJiYWdcIlxuXHRzZWFyY2g6IHRydWVcblx0cGFyZW50OiBwbHBTY3JlZW5cblxuIyBDcmVhdGUgZGVmYXVsdCBTY3JvbGxDb21wb25lbnRcbnBscFNjcm9sbCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgLSAocGxwSGVhZGVyLmhlaWdodClcblx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0eTogcGxwSGVhZGVyLm1heFlcblx0cGFyZW50OiBwbHBTY3JlZW5cblxuIyBQcm9kdWN0IGxpc3QgYXJyYXlcblBMUGxpc3RBcnIgPSBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyAkK1wiZGVmYXVsdC9wbHAuanNvblwiXG5cbiMgUmVmaW5lIEZpbHRlcidzIGFycmF5XG5yZWZpbmVGaWx0ZXJzQXJyYXkgPSBbXVxuZm9yIGkgaW4gWzAuLi5QTFBsaXN0QXJyLmxlbmd0aF1cblx0cmVmaW5lRmlsdGVyc0FycmF5LnB1c2ggUExQbGlzdEFycltpXS5icmFuZC5jaGFyQXQoMCkgKyBQTFBsaXN0QXJyW2ldLmJyYW5kLnNsaWNlKDEpLnRvTG93ZXJDYXNlKClcblx0XG4jIFJlZmluZSBmaWx0ZXJcbnJlZmluZUZpbHRlciA9IG5ldyBSZWZpbmVGaWx0ZXJcblx0YWZ0ZXI6IHBscEhlYWRlclxuXHRpdGVtc0FycmF5OiByZWZpbmVGaWx0ZXJzQXJyYXlcblxuIyBSZWZpbmUgZmlsdGVyIGFuaW1hdGlvbiBvbiBzcm9sbFxuaGlkZVJlZmluZSA9IG5ldyBBbmltYXRpb24gcmVmaW5lRmlsdGVyLFxuXHR5OiAtcmVmaW5lRmlsdGVyLmhlaWdodFxuXHRvcHRpb25zOlxuXHRcdHRpbWU6IDAuMlxuc2hvd1JlZmluZSA9IGhpZGVSZWZpbmUucmV2ZXJzZSgpXG5cbnBscFNjcm9sbC5vblNjcm9sbCAoZXZlbnQpIC0+XG5cdGlmIGV2ZW50LmRlbHRhWSA8IDIgYW5kIHBscFNjcm9sbC5jb250ZW50LnkgPCAtNjhcblx0XHRoaWRlUmVmaW5lLnN0YXJ0KClcblx0ZWxzZSBpZiBldmVudC5kZWx0YVkgPiAyXG5cdFx0c2hvd1JlZmluZS5zdGFydCgpXG5cbiMgR2VuZXJhdGUgcHJvZHVjdCBsaXN0aW5nIGNhcmRzXG5wcm9kdWN0Q2FyZHMgPSBuZXcgUHJvZHVjdExpc3RpbmdVbml0XG5cdHBhcmVudDogcGxwU2Nyb2xsLmNvbnRlbnRcblx0eTogcmVmaW5lRmlsdGVyLmhlaWdodFxuXG5wbHBIZWFkZXIuYnJpbmdUb0Zyb250KCkgIyBCcmluZyBoZWFkZXIgdG8gZnJvbnRcbnBscFNjcm9sbC51cGRhdGVDb250ZW50KCkgIyBVcGRhdGUgc2Nyb2xsXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbiMgUERQIFNjcmVlbiBjb250YWluZXIgdGhhdCBjYW4gYmUgdXNlZCBieSBGbG93IENvbXBvbmVudFxucGRwU2NyZWVuID0gbmV3IExheWVyXG5cdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0ICMgTWluZCB0byByZW1vdmUgc3RhdHVzYmFyIGhlaWdodCBsYXRlci5cblx0YmFja2dyb3VuZENvbG9yOiBcInB1cnBsZVwiXG5cbnBkcEhlYWRlciA9IG5ldyBIZWFkZXJcblx0bmFtZTogXCJoZWFkZXJcIlxuXHRpY29uTGVmdDogXCJiaWctYXJyb3dcIlxuXHRpY29uUmlnaHQ6IFwiYmFnXCJcblx0c2VhcmNoOiB0cnVlXG5cdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG4jIENyZWF0ZSBkZWZhdWx0IFNjcm9sbENvbXBvbmVudFxucGRwU2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRkaXJlY3Rpb25Mb2NrOiB0cnVlICMgYXZvaWRzIHNjcm9sbCB3aGVuIHByb2R1Y3Qgc3dpcGluZ1xuXHRjb250ZW50SW5zZXQ6IFxuXHRcdGJvdHRvbTogMTIwXG5cdHBhcmVudDogcGRwU2NyZWVuXG5cbnBkcEhlcm9Vbml0ID0gbmV3IFBEUEhlcm9Vbml0XG5cdHBhcmVudDogcGRwU2Nyb2xsLmNvbnRlbnRcblxuc2VsZWN0b3IgPSBuZXcgU2VsZWN0b3Jcblx0cGxhY2Vob2xkZXI6IFwiU2VsZWN0IHNkZiB5b3VyIHNpemVcIlxuXHRhZnRlcjogcGRwSGVyb1VuaXRcblx0XG5kZXNjcmlwdGlvbiA9IG5ldyBBY2NvcmRpb25cblx0ZXhwYW5kZWQ6IHRydWVcblx0bGFiZWxUZXh0OiBcIkRlc2NyaXB0aW9uXCJcblx0Y29udGVudDogYWNjX2Rlc2NyaXB0aW9uX2NvbmV0ZW50XG5cdGFmdGVyOiBzZWxlY3RvclxuXHRcbnNpemVBbmRGZWV0ID0gbmV3IEFjY29yZGlvblxuXHRhZnRlcjogZGVzY3JpcHRpb25cblx0bGFiZWxUZXh0OiBcIlNpemUgJiBGaXRcIlxuXHRjb250ZW50OiBhY2Nfc2l6ZV9jb250ZW50XG5cdFxuY2FyZUNvbnRlbnQgPSBuZXcgQWNjb3JkaW9uXG5cdGNvbnRlbnQ6IGFjY19jYXJlX2NvbnRlbnRcblx0bGFiZWxUZXh0OiBcIkNvbXBvc2l0aW9uICYgQ2FyZVwiXG5cdGFmdGVyOiBzaXplQW5kRmVldFxuXG5hY2NMaXN0ID0gbmV3IEFjY29yZGlvbkdyb3VwXG5cdGFmdGVyOiBzZWxlY3RvclxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdGNoaWxkcmVuOiBbZGVzY3JpcHRpb24sIHNpemVBbmRGZWV0LCBjYXJlQ29udGVudF1cblxuY29udGFjdFVzID0gbmV3IE1lQ29udGFjdFVzXG5cdGFmdGVyOiBhY2NMaXN0XG5cdFxucmVjb21lbmRlZExpc3QgPSBuZXcgUmVjb21tZW5kZWRMaXN0VW5pdFxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdHNob3BBbGxCdG46IGZhbHNlXG5cdGFmdGVyOiBjb250YWN0VXNcblx0eTogTF9zcGFjZXJcblxuIyBVcGRhdGUgWSBwb3Mgb2YgY29tcG9uZW50cyBiZWxvd1xuYWNjTGlzdC5vbiBcImNoYW5nZTpoZWlnaHRcIiwgLT5cblx0Y29udGFjdFVzLnkgPSBhY2NMaXN0Lm1heFlcblx0cmVjb21lbmRlZExpc3QueSA9IGNvbnRhY3RVcy5tYXhZICsgTF9zcGFjZXJcblxucGRwU2Nyb2xsLnVwZGF0ZUNvbnRlbnQoKSAjIFVwZGF0ZSBzY3JvbGxcbnBkcEhlcm9Vbml0LmJyaW5nVG9Gcm9udCgpXG5cbmFkZFRvQmFnID0gbmV3IEJ1dHRvbkZpeGVkXG5cdHRleHQ6IFwiQWRkIHRvIGJhZ1wiXG5cdHBhcmVudDogcGRwU2NyZWVuXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbiMgTWUgU2NyZWVuIGNvbnRhaW5lciB0aGF0IGNhbiBiZSB1c2VkIGJ5IEZsb3cgQ29tcG9uZW50XG5tZVNjcmVlbiA9IG5ldyBMYXllclxuXHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdGhlaWdodDogU2NyZWVuLmhlaWdodCAgIyBNaW5kIHRvIHJlbW92ZSBzdGF0dXNiYXIgJiB0YWJiYXIgaGVpZ2h0IGxhdGVyLlxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwiZ3JlZW5cIlxuXG5tZUhlYWRlciA9IG5ldyBIZWFkZXJcblx0cGFyZW50OiBtZVNjcmVlblxuXHR0aXRsZTogXCJNZVwiXG5cdGljb25SaWdodDogXCJiYWdcIlxuXHRzZWFyY2g6IHRydWVcblxuIyBTY3JvbGxDb21wb25lbnRcbm1lU2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRwYXJlbnQ6IG1lU2NyZWVuXG5cdHk6IG1lSGVhZGVyLm1heFlcblx0aGVpZ2h0OiBtZVNjcmVlbi5oZWlnaHQgLSBtZUhlYWRlci5oZWlnaHRcblx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZmZmZlwiXG5cdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5tZVNjcm9sbC5jb250ZW50LmJhY2tncm91bmRDb2xvciA9IFwiI2ZmZmZmZlwiXG5cbnNpZ25JbiA9IG5ldyBNZVNpZ25JblxuXHRwYXJlbnQ6IG1lU2Nyb2xsLmNvbnRlbnRcblxubXlMb2NhdGlvbiA9IG5ldyBMaXN0VGl0bGVcblx0dGV4dDogXCJNeSBMb2NhdGlvblwiXG5cdGFmdGVyOiBzaWduSW5cblx0eTogTV9zcGFjZXJcblxuY291bnRyeSA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIlVuaXRlZCBLaW5nZG9tIChHQlApXCJcblx0bGVmdDogXCJhcnJvdy1yaWdodFwiXG5cdGZsYWc6IFwidWtcIlxuXHRhZnRlcjogbXlMb2NhdGlvblxuXG5jb3VudHJ5Q29tbWVudCA9IG5ldyBGRlRleHRMYXllclxuXHR0ZXh0OiBcIllvdXIgY2hvc2VuIGxvY2F0aW9uIGRlZmluZXMgeW91ciBsYW5ndWFnZSBhbmQgc2hvcHBpbmcgY3VycmVuY3kuXCJcblx0dGV4dFN0eWxlOiBcIlNcIlxuXHRhZnRlcjogY291bnRyeVxuXHR5OiBTX3NwYWNlclxuXHR4OiBNX3NwYWNlclxuXHR3aWR0aDogU2NyZWVuLndpZHRoIC0gTV9zcGFjZXIgLSBNX3NwYWNlclxuXHRcbm15TGFuZyA9IG5ldyBMaXN0VGl0bGVcblx0dGV4dDogXCJNeSBMYW5ndWFnZVwiXG5cdGFmdGVyOiBjb3VudHJ5Q29tbWVudFxuXHR5OiBNX3NwYWNlclxuXG5sYW5nID0gbmV3IExpc3RJdGVtXG5cdHRleHQ6IFwiRW5nbGlzaCAoVUspXCJcblx0bGVmdDogXCJhcnJvdy1yaWdodFwiXG5cdGFmdGVyOiBteUxhbmdcblxubXlTaG9wUHJlZiA9IG5ldyBMaXN0VGl0bGVcblx0dGV4dDogXCJNeSBTaG9wIFByZWZlcmVuY2VcIlxuXHRhZnRlcjogbGFuZ1xuXHR5OiBNX3NwYWNlclxuXG5zaG9wUHJlZiA9IG5ldyBMaXN0UmFkaW9TZWxlY3Rcblx0c2VsZWN0QXJyYXk6IFtcblx0XHR7dGV4dCA6IFwiV29tZW5cIiwgb24gOiB0cnVlfSwgXG5cdFx0e3RleHQgOiBcIk1lblwifVxuXHRcdF1cblx0YWZ0ZXI6IG15U2hvcFByZWZcblx0XG5zaG9wUHJlZkNvbW1lbnQgPSBuZXcgRkZUZXh0TGF5ZXJcblx0dGV4dDogXCJUaGlzIHdpbGwgdGFpbG9yIHlvdXIgYXBwIGV4cGVyaWVuY2UsIHNob3dpbmcgeW91IHRoZSB0eXBlIG9mIHByb2R1Y3RzIG1vc3Qgc3VpdGVkIHRvIHlvdS5cIlxuXHR0ZXh0U3R5bGU6IFwiU1wiXG5cdGFmdGVyOiBzaG9wUHJlZlxuXHR4OiBNX3NwYWNlclxuXHR5OiBTX3NwYWNlclxuXHR3aWR0aDogU2NyZWVuLndpZHRoIC0gTV9zcGFjZXIgLSBNX3NwYWNlclxuXG5teVNldHRpbmdzID0gbmV3IExpc3RUaXRsZVxuXHR0ZXh0OiBcIk15IFNldHRpbmdzXCJcblx0YWZ0ZXI6IHNob3BQcmVmQ29tbWVudFxuXHR5OiBNX3NwYWNlclxuXG5wdXNoTm90aWZpY2F0aW9ucyA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIlB1c2ggTm90aWZpY2F0aW9uc1wiXG5cdGxlZnQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRhZnRlcjogbXlTZXR0aW5nc1xuXG5sb2NhdGlvblNlcnZpY2VzID0gbmV3IExpc3RJdGVtXG5cdHRleHQ6IFwiTG9jYXRpb24gU2VydmljZXNcIlxuXHRsZWZ0OiBcImFycm93LXJpZ2h0XCJcblx0YWZ0ZXI6IHB1c2hOb3RpZmljYXRpb25zXG5cbnRvdWNoSWQgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJBcHBsZSBUb3VjaCBJRFwiXG5cdGxlZnQ6IFwidG9nZ2xlXCJcblx0YWZ0ZXI6IGxvY2F0aW9uU2VydmljZXNcblxuc3VwcG9ydCA9IG5ldyBMaXN0VGl0bGVcblx0dGV4dDogXCJTdXBwb3J0XCJcblx0YWZ0ZXI6IHRvdWNoSWRcblx0eTogTV9zcGFjZXJcblxuYWJvdXQgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJBYm91dCBGYXJmZXRjaFwiXG5cdGxlZnQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRhZnRlcjogc3VwcG9ydFxuXG50ZXJtcyA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIlRlcm1zICYgQ29uZGl0aW9uc1wiXG5cdGxlZnQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRhZnRlcjogYWJvdXRcblxucHJpdmFjeSA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIlByaXZhY3kgcG9saWN5XCJcblx0bGVmdDogXCJhcnJvdy1yaWdodFwiXG5cdGFmdGVyOiB0ZXJtc1xuXG5mYXEgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJGQVEgJiBHdWlkZXNcIlxuXHRsZWZ0OiBcImFycm93LXJpZ2h0XCJcblx0YWZ0ZXI6IHByaXZhY3lcblxucGFydG5lcnMgPSBuZXcgTGlzdEl0ZW1cblx0dGV4dDogXCJCb3V0aXF1ZSBwYXJ0bmVyc1wiXG5cdGxlZnQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRhZnRlcjogZmFxXG5cbmNvbnRhY3RfdXMgPSBuZXcgTWVDb250YWN0VXNcblx0YWZ0ZXI6IHBhcnRuZXJzXG5cdHk6IE1fc3BhY2VyXG5cdGJhY2tncm91bmRDb2xvcjogXCIjZmZmZmZmXCJcblx0aGVpZ2h0OiAzMDBcblxubWVTY3JvbGwudXBkYXRlQ29udGVudCgpICMgVXBkYXRlIHNjcm9sbFxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIEhvbWUgU2NyZWVuIGNvbnRhaW5lciB0aGF0IGNhbiBiZSB1c2VkIGJ5IEZsb3cgQ29tcG9uZW50XG5ob21lU2NyZWVuID0gbmV3IExheWVyXG5cdHdpZHRoOiBTY3JlZW4ud2lkdGggXG5cdGhlaWdodDogU2NyZWVuLmhlaWdodCAjIE1pbmQgdG8gcmVtb3ZlIHN0YXR1c2JhciAmIHRhYmJhciBoZWlnaHQgbGF0ZXIuXG5cdGJhY2tncm91bmRDb2xvcjogXCJibHVlXCJcblxuaG9tZUhlYWRlciA9IG5ldyBIZWFkZXJcblx0cGFyZW50OiBob21lU2NyZWVuXG5cdHRpdGxlOiBcImxvZ29cIlxuXHRpY29uUmlnaHQ6IFwiYmFnXCJcblx0XG5ob21lU2VhcmNoID0gbmV3IEhvbWVTZWFyY2hcblx0YWZ0ZXI6ICBob21lSGVhZGVyXG5cbiMgU2Nyb2xsQ29tcG9uZW50XG5ob21lU2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHR5OiBob21lU2VhcmNoLm1heFkgIyBjYW4ndCB1c2UgJ2FmdGVyJyBhcyB0aGlzIGlzIEZyYW1lcidzIENsYXNzXG5cdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdGRpcmVjdGlvbkxvY2s6IHRydWUgIyBhdm9pZHMgc2Nyb2xsIHdoZW4gcHJvZHVjdCBzd2lwaW5nXG5cdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0cGFyZW50OiBob21lU2NyZWVuXG5ob21lU2Nyb2xsLmhlaWdodCA9IGhvbWVTY3JlZW4uaGVpZ2h0IC0gaG9tZUhlYWRlci5oZWlnaHQgLSBob21lU2VhcmNoLmhlaWdodFxuXG5wb3MgPSBuZXcgUG9zQmFubmVyXG5cdHRleHQ6IFwiUHJpdmF0ZSBTYWxlXCJcblx0cGFyZW50OiBob21lU2Nyb2xsLmNvbnRlbnRcblxuIyBDcmVhdGUgaGVybyB1bml0XG51bml0MSA9IG5ldyBIZXJvVW5pdFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIlNob3Agbm93XCJcblx0Y292ZXI6ICQrXCJkZWZhdWx0L2hlcm8tMDEuanBnXCJcblx0YWZ0ZXI6IHBvc1xuXG4jIENyZWF0ZSBwcm9kdWN0IHVuaXRcbnVuaXQyID0gbmV3IFByb2R1Y3RVbml0XG5cdHRpdGxlOiBcIkhlbGxvIFdvcmxkXCJcblx0ZGVzY3JpcHRpb246IFwiU2VsZWN0aW9uIG9mIG5ldyBpdGVtcyBoYXMganVzdCBhcnJpdmVkIHRvIG91ciBib3V0aXF1ZXMuXCJcblx0cHJvZHVjdHNBcnJheTogSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgJCtcImRlZmF1bHQvcHJvZHVjdHMuanNvblwiXG5cdGFmdGVyOiB1bml0MVxuXG4jIENyZWF0ZSBwcm9kdWN0IHNldFxudW5pdDMgPSBuZXcgUHJvZHVjdFNldFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIlNob3AgTm93XCJcblx0Y292ZXI6ICAkK1wiZGVmYXVsdC9oZXJvLTAxLmpwZ1wiLCBcblx0cHJvZHVjdHNBcnJheTogSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgJCtcImRlZmF1bHQvcHJvZHVjdHMuanNvblwiXG5cdGFmdGVyOiB1bml0MlxuXG4jIERpdmlkZXIgbGluZVxubGluZSA9IG5ldyBLZXlsaW5lXG5cdGFmdGVyOiB1bml0M1xuXG4jIENyZWF0ZSBmZWF0dXJlIHVuaXQgd2l0aCBwcm9kdWN0IGltYWdlXG51bml0NCA9IG5ldyBGZWF0dXJlVW5pdFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIlNob3Agbm93XCJcblx0ZGVzY3JpcHRpb246IFwiU2VsZWN0aW9uIG9mIG5ldyBpdGVtcyBoYXMganVzdCBhcnJpdmVkIHRvIG91ciBib3V0aXF1ZXMuXCJcblx0Y292ZXI6ICQrXCJkZWZhdWx0L3Byb2R1Y3QtMDEuanBnXCJcblx0YWZ0ZXI6IGxpbmVcblxuIyBDcmVhdGluZyBwcm9kdWN0IGhlcm9cbnVuaXQ1ID0gbmV3IFByb2R1Y3RIZXJvXG5cdHRpdGxlOiBcIkhlbGxvIFdvcmxkXCJcblx0c3ViVGl0bGU6IFwiUGxlYXNlIHNlZSBvdXIgcmVjY29tZW5kYXRpb25zLCBiYXNlZCBvbiBkZXNpZ25lcnMgeW91IGxvdmUuXCJcblx0ZGVzY3JpcHRpb246IFwiVGhlcmUgd2FzIGEgc2hpZnQgaW4gc3BvcnRzd2VhciB0aGlzIHNlYXNvbi4gU3VyZSwgZXhwZWN0ZWQgaW5qZWN0aW9ucyBvZiBuaW5ldGllcyB5b3V0aCBjdWx0dXJlIGNvdXJ0ZXN5IG9mIEdvc2hhIGFuZCB0aGUgZ2FuZyB3ZXJlIHN0aWxsIHByZXNlbnQsIGJ1dCB0aGUgZ2VuZXJhbCBtb29kIHBsYXllZCB0byB0aGUgbW9yZSBkaXN0YW50IHBhc3Qgb2Ygc2V2ZW50aWVzIGFuZCBlaWdodGllcyBhdGhsZXRpYyB3ZWFyLlwiXG5cdGNvdmVyOiAkK1wiZGVmYXVsdC9wcm9kdWN0LWhlcm8tMDEuanBnXCJcblx0cHJvZHVjdHNBcnJheTogSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgJCtcImRlZmF1bHQvcHJvZHVjdHMuanNvblwiXG5cdGFmdGVyOiB1bml0NFxuXG5ob21lU2Nyb2xsLnVwZGF0ZUNvbnRlbnQoKSAjIFVwZGF0ZSBzY3JvbGxcblxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuZGVzaWduZXJzUGFnZSA9IG5ldyBEZXNpZ25lcnNQYWdlXG5cdGFjdGlvbnM6IHtcblx0XHRcIjI2ODIwODJcIjogLT4gcHJpbnQgXCJZbyFcIlxuXHR9XG5cdFxuZGVzaWduZXJzUGFnZS5oZWFkZXIuaWNvbkxlZnRfbGF5ZXIub25UYXAgLT5cblx0cHJpbnQgXCJiYWNrXCJcbiAgICBcblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbmNhdGVnb3JpZXNQYWdlID0gbmV3IENhdGVnb3JpZXNQYWdlXG5cdGFjdGlvbnM6IHtcblx0XHRcIml0ZW0xXCI6IC0+IHByaW50IFwiVGFwIVwiLFxuXHRcdFwiaXRlbTJcIjogLT4gcHJpbnQgXCJBbmQgYW5vdGhlciBUYXAhXCJcblx0fVxuXG5jYXRlZ29yaWVzUGFnZS5oZWFkZXIuaWNvbkxlZnRfbGF5ZXIub25UYXAgLT5cblx0cHJpbnQgXCJiYWNrXCJcbiAgICBcblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbiMgU3RhdHVzIGJhclxuc3RhdHVzX2JhciA9IG5ldyBTdGF0dXNCYXJcblxuIyBUYWJiYXIgZXhhbXBsZVxudGFiYmFyID0gbmV3IFRhYmJhclxuXHRhY3RpdmVJdGVtOiBcImhvbWVcIlxuXG4jIyBTY3JlZW5zXG5cbiMgSG9tZSBTY3JlZW5cbmhvbWVTY3JlZW4gPSBuZXcgTGF5ZXJcblx0d2lkdGg6IFNjcmVlbi53aWR0aCBcblx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0IC0gc3RhdHVzX2Jhci5oZWlnaHQgLSB0YWJiYXIuaGVpZ2h0XG5cdGJhY2tncm91bmRDb2xvcjogXCJibHVlXCJcblxuIyBNZSBTY3JlZW5cbm1lU2NyZWVuID0gbmV3IExheWVyXG5cdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0IC0gc3RhdHVzX2Jhci5oZWlnaHQgLSB0YWJiYXIuaGVpZ2h0XG5cdGJhY2tncm91bmRDb2xvcjogXCJncmVlblwiXG5cblxuIyBTZXQgdXAgRmxvd0NvbXBvbmVudFxuZmxvdyA9IG5ldyBGbG93Q29tcG9uZW50XG5cdGhlaWdodDogU2NyZWVuLmhlaWdodCAtIHN0YXR1c19iYXIuaGVpZ2h0IC0gdGFiYmFyLmhlaWdodFxuXHR5OiBzdGF0dXNfYmFyLm1heFlcblx0XG4jIEZpcnN0IHNjcmVlblxuZmxvdy5zaG93TmV4dChob21lU2NyZWVuKVxuXG5cbiMgVGFiYmFyIGxvZ2ljXG50YWJiYXIuc2VsZWN0Q2hpbGQoXCJob21lXCIpLm9uQ2xpY2sgKGV2ZW50LCBsYXllcikgLT5cblx0Zmxvdy5zaG93TmV4dChob21lU2NyZWVuLCBhbmltYXRlOiBmYWxzZSlcblxudGFiYmFyLnNlbGVjdENoaWxkKFwibWVcIikub25DbGljayAoZXZlbnQsIGxheWVyKSAtPlxuXHRmbG93LnNob3dOZXh0KG1lU2NyZWVuLCBhbmltYXRlOiBmYWxzZSlcblx0XG50YWJiYXIuYnJpbmdUb0Zyb250KClcblxuXHRcIlwiXCIiLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cblxuIyBTdGF0dXMgYmFyXG5zdGF0dXNfYmFyID0gbmV3IFN0YXR1c0JhclxuXG4jIFRhYmJhciBleGFtcGxlXG50YWJiYXIgPSBuZXcgVGFiYmFyXG5cdGFjdGl2ZUl0ZW06IFwiaG9tZVwiXG5cblxuXG4jIyBIb21lIFNjcmVlblxuXG5ob21lU2NyZWVuID0gbmV3IExheWVyXG5cdHdpZHRoOiBTY3JlZW4ud2lkdGggXG5cdGhlaWdodDogU2NyZWVuLmhlaWdodCAtIHN0YXR1c19iYXIuaGVpZ2h0IC0gdGFiYmFyLmhlaWdodFxuXG5ob21lSGVhZGVyID0gbmV3IEhlYWRlclxuXHRwYXJlbnQ6IGhvbWVTY3JlZW5cblx0dGl0bGU6IFwibG9nb1wiXG5cdGljb25SaWdodDogXCJiYWdcIlxuXHRcbmhvbWVTZWFyY2ggPSBuZXcgSG9tZVNlYXJjaFxuXHRhZnRlcjogIGhvbWVIZWFkZXJcblxuIyBTY3JvbGxDb21wb25lbnRcbmhvbWVTY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdHk6IGhvbWVTZWFyY2gubWF4WSAjIGNhbid0IHVzZSAnYWZ0ZXInIGFzIHRoaXMgaXMgRnJhbWVyJ3MgQ2xhc3Ncblx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0ZGlyZWN0aW9uTG9jazogdHJ1ZSAjIGF2b2lkcyBzY3JvbGwgd2hlbiBwcm9kdWN0IHN3aXBpbmdcblx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRwYXJlbnQ6IGhvbWVTY3JlZW5cbmhvbWVTY3JvbGwuaGVpZ2h0ID0gaG9tZVNjcmVlbi5oZWlnaHQgLSBob21lSGVhZGVyLmhlaWdodCAtIGhvbWVTZWFyY2guaGVpZ2h0XG5cbnBvcyA9IG5ldyBQb3NCYW5uZXJcblx0dGV4dDogXCJQcml2YXRlIFNhbGVcIlxuXHRwYXJlbnQ6IGhvbWVTY3JvbGwuY29udGVudFxuXG4jIENyZWF0ZSBoZXJvIHVuaXRcbnVuaXQxID0gbmV3IEhlcm9Vbml0XG5cdHRpdGxlOiBcIkhlbGxvIFdvcmxkXCJcblx0c3ViVGl0bGU6IFwiU2hvcCBub3dcIlxuXHRjb3ZlcjogJCtcImRlZmF1bHQvaGVyby0wMS5qcGdcIlxuXHRhZnRlcjogcG9zXG5cbiMgQ3JlYXRlIHByb2R1Y3QgdW5pdFxudW5pdDIgPSBuZXcgUHJvZHVjdFVuaXRcblx0dGl0bGU6IFwiSGVsbG8gV29ybGRcIlxuXHRkZXNjcmlwdGlvbjogXCJTZWxlY3Rpb24gb2YgbmV3IGl0ZW1zIGhhcyBqdXN0IGFycml2ZWQgdG8gb3VyIGJvdXRpcXVlcy5cIlxuXHRwcm9kdWN0c0FycmF5OiBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyAkK1wiZGVmYXVsdC9wcm9kdWN0cy5qc29uXCJcblx0YWZ0ZXI6IHVuaXQxXG5cbmhvbWVTY3JvbGwudXBkYXRlQ29udGVudCgpICMgVXBkYXRlIHNjcm9sbFxuXG5cblxuXG4jIyBQTFAgU2NyZWVuXG5cbnBscFNjcmVlbiA9IG5ldyBMYXllclxuXHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdGhlaWdodDogU2NyZWVuLmhlaWdodCAtIHN0YXR1c19iYXIuaGVpZ2h0IC0gdGFiYmFyLmhlaWdodFxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXG5wbHBIZWFkZXIgPSBuZXcgSGVhZGVyXG5cdHRpdGxlOiBcIlN1bW1lclwiXG5cdHN1YlRpdGxlOiBcIjcgaXRlbXNcIlxuXHRpY29uTGVmdDogXCJiaWctYXJyb3dcIlxuXHRpY29uUmlnaHQ6IFwiYmFnXCJcblx0c2VhcmNoOiB0cnVlXG5cdHBhcmVudDogcGxwU2NyZWVuXG5cbiMgQ3JlYXRlIGRlZmF1bHQgU2Nyb2xsQ29tcG9uZW50XG5wbHBTY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0IC0gKHBscEhlYWRlci5oZWlnaHQpXG5cdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdHk6IHBscEhlYWRlci5tYXhZXG5cdHBhcmVudDogcGxwU2NyZWVuXG5cbiMgUHJvZHVjdCBsaXN0IGFycmF5XG5QTFBsaXN0QXJyID0gSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgJCtcImRlZmF1bHQvcGxwLmpzb25cIlxuXG4jIFJlZmluZSBGaWx0ZXIncyBhcnJheVxucmVmaW5lRmlsdGVyc0FycmF5ID0gW11cbmZvciBpIGluIFswLi4uUExQbGlzdEFyci5sZW5ndGhdXG5cdHJlZmluZUZpbHRlcnNBcnJheS5wdXNoIFBMUGxpc3RBcnJbaV0uYnJhbmQuY2hhckF0KDApICsgUExQbGlzdEFycltpXS5icmFuZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpXG5cdFxuIyBSZWZpbmUgZmlsdGVyXG5yZWZpbmVGaWx0ZXIgPSBuZXcgUmVmaW5lRmlsdGVyXG5cdGFmdGVyOiBwbHBIZWFkZXJcblx0aXRlbXNBcnJheTogcmVmaW5lRmlsdGVyc0FycmF5XG5cdHk6IDBcblxuIyBSZWZpbmUgZmlsdGVyIGFuaW1hdGlvbiBvbiBzcm9sbFxuaGlkZVJlZmluZSA9IG5ldyBBbmltYXRpb24gcmVmaW5lRmlsdGVyLFxuXHR5OiAtcmVmaW5lRmlsdGVyLmhlaWdodFxuXHRvcHRpb25zOlxuXHRcdHRpbWU6IDAuMlxuI3Nob3dSZWZpbmUgPSBoaWRlUmVmaW5lLnJldmVyc2UoKVxuc2hvd1JlZmluZSA9IG5ldyBBbmltYXRpb24gcmVmaW5lRmlsdGVyLFxuXHR5OiAxMFxuXHRvcHRpb25zOlxuXHRcdHRpbWU6IDAuMlxuXHRcblx0XG5wbHBTY3JvbGwub25TY3JvbGwgKGV2ZW50KSAtPlxuXHRpZiBldmVudC5kZWx0YVkgPCAyIGFuZCBwbHBTY3JvbGwuY29udGVudC55IDwgLSA2OFxuXHRcdGhpZGVSZWZpbmUuc3RhcnQoKVxuXHRlbHNlIGlmIGV2ZW50LmRlbHRhWSA+IDJcblx0XHRzaG93UmVmaW5lLnN0YXJ0KClcblxuIyBHZW5lcmF0ZSBwcm9kdWN0IGxpc3RpbmcgY2FyZHNcbnByb2R1Y3RDYXJkcyA9IG5ldyBQcm9kdWN0TGlzdGluZ1VuaXRcblx0cGFyZW50OiBwbHBTY3JvbGwuY29udGVudFxuXHR5OiByZWZpbmVGaWx0ZXIuaGVpZ2h0XG5cbnBscEhlYWRlci5icmluZ1RvRnJvbnQoKSAjIEJyaW5nIGhlYWRlciB0byBmcm9udFxuIyBwbHBTY3JvbGwuY29udGVudEluc2V0ID1cbiMgXHR0b3A6IDY4XG5wbHBTY3JvbGwudXBkYXRlQ29udGVudCgpICMgVXBkYXRlIHNjcm9sbFxuXG5cblxuIyMgRmxvdyBDb21wb25lbnRcblxuZmxvdyA9IG5ldyBGbG93Q29tcG9uZW50XG5cdGhlaWdodDogU2NyZWVuLmhlaWdodCAtIHN0YXR1c19iYXIuaGVpZ2h0IC0gdGFiYmFyLmhlaWdodFxuXHR5OiBzdGF0dXNfYmFyLm1heFlcblx0XG4jIEZpcnN0IHNjcmVlblxuZmxvdy5zaG93TmV4dChob21lU2NyZWVuKVxuXG5cblxuIyMgTG9naWMgYW5kIEludGVyYWN0aW9uc1xuXG5cbiMgVGFiYmFyXG50YWJiYXIuc2VsZWN0Q2hpbGQoXCJob21lXCIpLm9uQ2xpY2sgKGV2ZW50LCBsYXllcikgLT5cblx0Zmxvdy5zaG93TmV4dChob21lU2NyZWVuLCBhbmltYXRlOiBmYWxzZSlcblx0XG50YWJiYXIuYnJpbmdUb0Zyb250KClcblxuIyBUYXBzIHRvIFBEUFxudW5pdDEub25DbGljayAoZXZlbnQsIGxheWVyKSAtPlxuXHRmbG93LnNob3dOZXh0KHBscFNjcmVlbilcblx0XG51bml0Mi5jdGEub25DbGljayAoZXZlbnQsIGxheWVyKSAtPlxuXHRmbG93LnNob3dOZXh0KHBscFNjcmVlbilcblxucGxwSGVhZGVyLnNlbGVjdENoaWxkKFwiaWNuX2xlZnRcIikub25DbGljayAoZXZlbnQsIGxheWVyKSAtPlxuXHRmbG93LnNob3dQcmV2aW91cygpIFxuXG5cdFwiXCJcIiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxudG9nZ2xlID0gbmV3IGlPU1N3aXRjaFxuXHR5OiBBbGlnbi5jZW50ZXJcblx0aXNPbjogdHJ1ZVxuXG50b2dnbGUub25WYWx1ZUNoYW5nZSAodmFsdWUpIC0+XG5cdHByaW50IHZhbHVlXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbndpc2hsaXN0VW5pdCA9IG5ldyBXaXNobGlzdFVuaXRcblx0YXJyYXk6IFtcblx0XHR7XG5cdFx0XHRcInNlYXNvblwiOiBcIk5ldyBTZWFzb25cIixcblx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcInN3aW5nIGRlbmltIGphY2tldFwiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzAxLmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkJBTEVOQ0lBR0FcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozEsMjU5XCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwic2Vhc29uXCI6IFwiTmV3IFNlYXNvblwiLFxuXHRcdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwiR3VjY2kgbG9nbyBULXNoaXJ0IHdpdGggc2hvb3Rpbmcgc3RhcnNcIixcblx0XHRcdFwiaW1hZ2VcIjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wMi5qcGdcIixcblx0XHRcdFwiYnJhbmRcIjogXCJHVUNDSVwiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjMSw1MDBcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJzZWFzb25cIjogXCJcIixcblx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcInNsZWV2ZWxlc3MgVi1uZWNrIHN0YW1wIHByaW50IGRyZXNzXCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDMuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiR1VDQ1BFVEVSIFBJTE9UVE9JXCIsXG5cdFx0XHRcInByaWNlXCI6IFwiwqM3MzlcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJzZWFzb25cIjogXCJOZXcgU2Vhc29uXCIsXG5cdFx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJmcmluZ2VkIG5ldHRlZCBtaWRpIGRyZXNzXCIsXG5cdFx0XHRcImltYWdlXCI6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDUuanBnXCIsXG5cdFx0XHRcImJyYW5kXCI6IFwiQ0FMVklOIEtMRUlOIDIwNVczOU5ZQ1wiLFxuXHRcdFx0XCJwcmljZVwiOiBcIsKjMSw1NzVcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJzZWFzb25cIjogXCJcIixcblx0XHRcdFwic2hvcnREZXNjcmlwdGlvblwiOiBcIk5ldyBTd2luZyBzaGlydFwiLFxuXHRcdFx0XCJpbWFnZVwiOiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L3Byb2R1Y3RzL3dvbWVuLzA2LmpwZ1wiLFxuXHRcdFx0XCJicmFuZFwiOiBcIkJBTEVOQ0lBR0FcIixcblx0XHRcdFwicHJpY2VcIjogXCLCozEsMDUwXCJcblx0XHR9XG5cdF1cblx0XG53aXNobGlzdFVuaXQubGlzdGNhcmRfMS5vblRhcCAtPlxuXHRwcmludCBcIlRhcCFcIlxuXG5cdFwiXCJcIiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxudGFicyA9IG5ldyBUYWJzXG4gICAgaXRlbXM6IFtcIm9uZVwiLCBcInR3b1wiLCBcInRocmVlXCIsIFwiZm91clwiXVxuXG50YWJzLm9uZS5vblRhcCAtPlxuICAgIHByaW50ICdzZGYnXG4gICAgXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuIyBUYWJiYXIgZXhhbXBsZVxudGFiYmFyID0gbmV3IFRhYmJhclxuXHRhY3RpdmVJdGVtOiBcImhvbWVcIlxuXG4jIENoYW5nZSBhY3RpdmUgaXRlbVxudGFiYmFyLmFjdGl2ZUl0ZW0gPSBcIm1lXCJcblxuIyBBZGQgZXZlbnRzXG50YWJiYXIuc2VsZWN0Q2hpbGQoXCJob21lXCIpLm9uIEV2ZW50cy5DbGljaywgKGV2ZW50LCBsYXllcikgLT5cblx0cHJpbnQgXCJDbGlja2VkIEhvbWVcIiwgbGF5ZXIubmFtZVxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuc3RhdHVzX2JhciA9IG5ldyBTdGF0dXNCYXJcblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG4jIFNlbGVjdG9yXG5zZWxlY3RvciA9IG5ldyBTZWxlY3RvclxuXHRwbGFjZWhvbGRlclRleHQ6IFwiU2VsZWN0IHNkZiB5b3VyIHNpemVcIlxuXHRsYWJlbFRleHQ6IFwiQ291bnRyeS9SZWdpb25cIlxuXHRoZWxwZXJUZXh0OiBcIlRoaXMgaXMgaGVscGVyIHRleHRcIlxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuc2VhcmNoSW5wdXR0ID0gbmV3IFNlYXJjaElucHV0XG4gICAgcGxhY2Vob2xkZXI6IFwiWW91ciB0ZXh0XCJcbiAgICBcblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG4jIFJlZmluZSBmaWx0ZXJcbnJlZmluZSA9IG5ldyBSZWZpbmVGaWx0ZXJcblx0eDogQWxpZ24uY2VudGVyKClcblx0eTogc3RhdHVzX2Jhci5tYXhZXG5cdGl0ZW1zQXJyYXk6IFtcIml0ZW0gIzFcIixcImxvbmcgaXRlbSAjMlwiLFwiaXRlbSAjM1wiLFwiaXRlbSAjNFwiLCBcIml0ZW0gIzVcIl1cblxuIyBVcGRhdGUgc2VsZWN0ZWQgaXRlbXNcbnJlZmluZS5zZWxlY3RlZCg2KVxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cbnByb2R1Y3RDYXJkQSA9IG5ldyBQcm9kdWN0U2xpZGVyXG5cdGFycmF5OiBbXG5cdFx0eyAjIFByb2R1Y3QgMSBcblx0XHRcInNob3J0RGVzY3JpcHRpb25cIjogXCJJIGhlYXJ0IFByYWRhIGJhZyBjaGFybVwiXG5cdFx0XCJpbWFnZXNcIjogW1widXJsXCI6IFwiaHR0cHM6Ly9jZG4taW1hZ2VzLmZhcmZldGNoLWNvbnRlbnRzLmNvbS8xMi82NS83NC85MS8xMjY1NzQ5MV8xMjMzOTgyNV8zMDAuanBnXCJdXG5cdFx0XCJicmFuZFwiOiB7XCJuYW1lXCI6IFwiUHJhZGFcIn0sXG5cdFx0XCJwcmljZVwiOiBcIsKjIDEzNVwiXG5cdFx0fVxuXHRcdHsgIyBQcm9kdWN0IDEgXG5cdFx0XCJzaG9ydERlc2NyaXB0aW9uXCI6IFwiSSBoZWFydCBQcmFkYSBiYWcgY2hhcm1cIlxuXHRcdFwiaW1hZ2VzXCI6IFtcInVybFwiOiBcImh0dHBzOi8vY2RuLWltYWdlcy5mYXJmZXRjaC1jb250ZW50cy5jb20vMTIvNjUvNzQvOTEvMTI2NTc0OTFfMTIzMzk4MjVfMzAwLmpwZ1wiXVxuXHRcdFwiYnJhbmRcIjoge1wibmFtZVwiOiBcIlByYWRhXCJ9LFxuXHRcdFwicHJpY2VcIjogXCLCoyAxMzVcIlxuXHRcdH1cblx0XVxuXHRcIlwiXCJcbiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cbiMgUHJvZHVjdCBjYXJkIGV4YW1wbGVcbnByb2R1Y3RDYXJkQSA9IG5ldyBQcm9kdWN0Q2FyZFxuXHRjb3ZlcjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wMi5qcGdcIlxuXHRicmFuZFRleHQ6IFwiQyZDXCJcblx0ZGVzY3JpcHRpb25UZXh0OiBcIkVtYmVsbGlzaGVkIGxvZ28gZGVuaW0gamFja2V0XCJcblx0cHJpY2VUZXh0OiBcIsKjMTI1NlwiXG5cdFwiXCJcIiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxucG9zID0gbmV3IFBvc0Jhbm5lclxuXHR0ZXh0OiBcIlByaXZhdGUgU2FsZVwiXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG4jIFBEUCBoZXJvXG5wZHBIZXJvVW5pdCA9IG5ldyBQRFBIZXJvVW5pdFxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG5saXN0VGl0bGUgPSBuZXcgTGlzdFRpdGxlXG5cdHRleHQ6IFwiSGVsbG8gV29yZFwiXG5cdHk6IDUwXG5cdFxubGlzdEl0ZW0xID0gbmV3IExpc3RJdGVtXG5cdHRleHQ6IFwiSGVsbG8gV29ybGRcIlxuXHRyaWdodDogXCJhcnJvdy1yaWdodFwiXG5cdHk6IGxpc3RUaXRsZS5tYXhZXG5cdHR5cGU6IFwid2lkZVwiXG5cbmxpc3RJdGVtMiA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIkhlbGxvIFdvcmxkXCJcblx0eTogbGlzdEl0ZW0xLm1heFlcblxubGlzdEl0ZW0zID0gbmV3IExpc3RJdGVtXG5cdHRleHQ6IFwiSGVsbG8gV29ybGRcIlxuXHRyaWdodDogXCJhcnJvdy1yaWdodFwiXG5cdGZsYWc6IFwidWtcIlxuXHR5OiBsaXN0SXRlbTIubWF4WVxuXHR0eXBlOiBcIndpZGVcIlxuXHRcbmxpc3RJdGVtNCA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIkhlbGxvIFdvcmxkXCJcblx0cmlnaHQ6IFwidG9nZ2xlXCJcblx0eTogbGlzdEl0ZW0zLm1heFlcblx0dHlwZTogXCJ3aWRlXCJcblxubGlzdEl0ZW01ID0gbmV3IExpc3RJdGVtXG5cdHRleHQ6IFwiSGVsbG8gV29ybGRcIlxuXHRsaW5lOiBcImZ1bGx3aWR0aFwiXG5cdGxpbmVUb3A6IHRydWVcblx0eTogbGlzdEl0ZW00Lm1heFlcblx0XG5cdFxubGlzdEl0ZW02ID0gbmV3IExpc3RJdGVtXG5cdHRleHQ6IFwiSGVsbG8gV29ybGRcIlxuXHRsaW5lOiBmYWxzZVxuXHRsaW5lVG9wOiBcImZ1bGx3aWR0aFwiXG5cdHk6IGxpc3RJdGVtNS5tYXhZXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbnJhZGlvU2VsZWN0ID0gbmV3IExpc3RSYWRpb1NlbGVjdFxuXHRzZWxlY3RBcnJheTogW1xuXHRcdHt0ZXh0IDogXCJMaXN0IEl0ZW0gMVwifSwgXG5cdFx0e3RleHQgOiBcIkxpc3QgSXRlbSAyXCIsIG9uIDogdHJ1ZX1cblx0XHR7dGV4dDogXCJMaXN0IEl0ZW0gM1wifVxuXHRcdF1cblx0XHRcblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG4jIExpc3QgUHJvZHVjdCBDYXJkXG5saXN0Q2FyZCA9IG5ldyBMaXN0UHJvZHVjdENhcmRcblx0eTogNDBcblx0Y292ZXI6ICQrXCJkZWZhdWx0L2xpc3QtcHJvZHVjdC1jYXJkLTAxLnBuZ1wiXG5cdHNlYXNvbjogXCJcIlxuXHRicmFuZDogXCJEdmYgRGlhbmUgVm9uIEZ1cnN0ZW5iZXJnXCJcblx0aWNvbjogXCJ3aXNobGlzdFwiXG5cdGRlc2NyaXB0aW9uOiBcIlRoZSBMYXJnZSBSdWNrc2FjayBpbiBUZWNobmljYWwgTnlsb24gYW5kIExlYXRoZXJcIlxuXHRwcmljZTogXCLCozIzOVwiXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG5saXN0SXRlbSA9IG5ldyBMaXN0SXRlbVxuXHR0ZXh0OiBcIkhlbGxvIFdvcmxkXCJcblx0cmlnaHQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRmbGFnOiBcInVrXCJcblx0bGluZTogXCJmdWxsd2lkdGhcIlxuXHRsaW5lVG9wOiB0cnVlXG5cdHk6IDIwMFxuXHR0eXBlOiBcIndpZGVcIlxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG5saW5lID0gbmV3IEtleWxpbmVcblx0eTogMTAwICMgcG9zaXRpb24gdGhlIGxpbmUgXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbnNlYXJjaCA9IG5ldyBIb21lU2VhcmNoXG5cblx0XCJcIlwiXG4iLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbiMgRGlmZmVyZW50IGV4YW1wbGVzIG9mIGhlYWRlcnNcblxuaGVhZGVyMSA9IG5ldyBIZWFkZXJcblx0eTogMTUwXG5cdHRpdGxlOiBcImxvZ29cIlxuXHRpY29uUmlnaHQ6IFwiYmFnXCJcblxuaGVhZGVyMiA9IG5ldyBIZWFkZXJcblx0eTogMjUwXG5cdHRpdGxlOiBcIkhlbGxvIFdvcmxkXCJcblx0aWNvbkxlZnQ6IFwiYmlnLWFycm93XCJcblx0aWNvblJpZ2h0OiBcImJhZ1wiXG5cdHNlYXJjaDogdHJ1ZVxuXG5oZWFkZXIzID0gbmV3IEhlYWRlclxuXHR5OiAzNTBcblx0dGl0bGU6IFwiQWxleGFuZGVyIE1xUXVlZW5cIlxuXHRzdWJUaXRsZTogXCIxNTAwIGl0ZW1zXCJcblx0aWNvbkxlZnQ6IFwiYmlnLWFycm93XCJcblx0aWNvblJpZ2h0OiBcImJhZ1wiXG5cdGJhZzogMlxuXHRzZWFyY2g6IHRydWVcblxuaGVhZGVyNCA9IG5ldyBIZWFkZXJcblx0eTogNDUwXG5cdHRpdGxlOiBcIlJlZmluZVwiXG5cdGljb25MZWZ0OiBcImNyb3NzXCJcblx0bGlua1JpZ2h0OiBcIkNsZWFyIEFsbFwiXG5cbmhlYWRlcjQgPSBuZXcgSGVhZGVyXG5cdHk6IDU1MFxuXHRpY29uTGVmdDogXCJiaWctYXJyb3dcIlxuXHRpY29uUmlnaHQ6IFwiYmFnXCJcblx0c2VhcmNoOiB0cnVlXG5cdG5vYmc6IHRydWUgXG5cbmhlYWRlcjYgPSBuZXcgSGVhZGVyXG5cdHk6IDY1MFxuXHR0aXRsZTogXCJIZWxsbyBXb3JkXCJcblx0aWNvblJpZ2h0OiBcImNyb3NzXCJcblxuXHRcIlwiXCIiLCJwbHVnaW4ucnVuID0gKGNvbnRlbnRzLCBvcHRpb25zKSAtPlxuXHRcIlwiXCJcbiN7Y29udGVudHN9XG5cbiMgSGVhZGVyIHdpdGggYWxsIHBvc3NpYmxlIGF0cmlidXRlcyAjIyMjI1xuaGVhZGVyID0gbmV3IEhlYWRlclxuXHR5OiA0NFxuXHR0aXRsZTogXCJIZWxsbyBXb3JsZFwiXG5cdHN1YlRpdGxlOiBcIjE1MDAgaXRlbXNcIlxuXHRpY29uTGVmdDogXCJiaWctYXJyb3dcIlxuXHRpY29uUmlnaHQ6IFwiYmFnXCJcblx0bGlua0xlZnQ6IFwiTGVmdFwiXG5cdGxpbmtSaWdodDogXCJSaWdodFwiXG5cdGJhZzogMlxuXHRzZWFyY2g6IHRydWVcblx0bm9iZzogdHJ1ZSBcblxuXG5cdFwiXCJcIiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cbiMgSW5wdXRzIGxpc3RcbiMgQ3JlYXRlIGRlZmF1bHQgU2Nyb2xsQ29tcG9uZW50XG5zY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdHk6IHN0YXR1c2Jhci5tYXhZXG5cdHNpemU6IFNjcmVlbi5zaXplXG5cdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdGNvbnRlbnRJbnNldDpcblx0XHRib3R0b206IDQwXG5cdFxuZk5hbWUgPSBuZXcgRkZJbnB1dFxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdGxhYmVsVGV4dDogXCJGaXJzdCBuYW1lXCJcblx0cGxhY2Vob2xkZXJUZXh0OiBcIlBsYWNlaG9sZGVyIHRlc3RcIlxuXG5sTmFtZSA9IG5ldyBGRklucHV0XG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblx0bGFiZWxUZXh0OiBcIkxhc3QgbmFtZVwiXG5cdGFmdGVyOiBmTmFtZVxuXG5jb3VudHJ5ID0gbmV3IFNlbGVjdG9yXG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblx0YWZ0ZXI6IGxOYW1lXG5cdGxhYmVsVGV4dDogXCJDb3VudHJ5L1JlZ2lvblwiXG5cdFxuYWRkcmVzczEgPSBuZXcgRkZJbnB1dFxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdGxhYmVsVGV4dDogXCJBZGRyZXNzIExpbmUgMVwiXG5cdGFmdGVyOiBjb3VudHJ5XG5cbmFkZHJlc3MyID0gbmV3IEZGSW5wdXRcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHRsYWJlbFRleHQ6IFwiQWRkcmVzcyBMaW5lIDJcIlxuXHRoZWxwZXJUZXh0OiBcIisgQWRkIGFub3RoZXIgbGluZVwiIFxuXHRhZnRlcjogYWRkcmVzczFcblxuYWRkcmVzczIuaGVscGVyVGV4dC5wcm9wcyA9XG5cdGNvbG9yOiBcIiM4YzhjOGNcIlxuXHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuXG5jaXR5ID0gbmV3IEZGSW5wdXRcblx0cGFyZW50OiBzY3JvbGwuY29udGVudFxuXHRsYWJlbFRleHQ6IFwiQ2l0eVwiXG5cdGFmdGVyOiBhZGRyZXNzMlxuXG5zdGF0ZSA9IG5ldyBGRklucHV0XG5cdHBhcmVudDogc2Nyb2xsLmNvbnRlbnRcblx0bGFiZWxUZXh0OiBcIlN0YXRlIChvcHRpb25hbClcIlxuXHRhZnRlcjogY2l0eVxuXHRcbnBvc3RhbENvZGUgPSBuZXcgRkZJbnB1dFxuXHRwYXJlbnQ6IHNjcm9sbC5jb250ZW50XG5cdGxhYmVsVGV4dDogXCJQb3N0YWwgQ29kZVwiXG5cdGFmdGVyOiBzdGF0ZVxuXG5zY3JvbGwudXBkYXRlQ29udGVudCgpICMgVXBkYXRlIHNjcm9sbFxuXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuXG4jIyMjIyBEaWZmZXJlbnQgZXhhbXBsZXMgb2YgYnV0dG9ucyAjIyMjI1xuXG5idG4gPSBuZXcgQnV0dG9uXG5cdHR5cGU6IFwicHJpbWFyeVwiXG5cdHRleHQ6IFwiSGVsbG8hXCJcblx0eDogQWxpZ24uY2VudGVyKClcblx0eTogMTAwXG5cbmJ0bjIgPSBuZXcgQnV0dG9uXG5cdHR5cGU6IFwic2Vjb25kYXJ5XCJcblx0dGV4dDogXCJZbyFcIlxuXHRpY29uOiBcImFycm93LXJpZ2h0XCJcblx0eDogQWxpZ24uY2VudGVyKClcblx0eTogYnRuLm1heFkgKyBNX3NwYWNlciAjIFZhcmlhYmxlc1xuXG5idG4zID0gbmV3IEJ1dHRvblxuXHR0eXBlOiBcInRhZ1wiXG5cdHRleHQ6IFwiVGhpcyBpcyBhd2Vzb21lXCJcblx0eDogQWxpZ24uY2VudGVyKClcblx0eTogYnRuMi5tYXhZICsgTV9zcGFjZXJcblxuYnRuNCA9IG5ldyBCdXR0b25cblx0dHlwZTogXCJ0YWdcIlxuXHR0ZXh0OiBcIlRoaXMgaXMgYXdlc29tZVwiXG5cdGljb246IFwiY3Jvc3NcIlxuXHRpY29uQWxpZ246IFwibGVmdFwiXG5cdHg6IEFsaWduLmNlbnRlcigpXG5cdHk6IGJ0bjMubWF4WSArIE1fc3BhY2VyXG5cdFxuYnRuNSA9IG5ldyBCdXR0b25cblx0dHlwZTogXCJwcmltYXJ5XCJcblx0dGV4dDogXCJIZWxsbyFcIlxuXHR4OiBBbGlnbi5jZW50ZXIoKVxuXHRpY29uOiBcImFycm93LWxlZnRcIlxuXHRpY29uQWxpZ246IFwibGVmdFwiXG5cdHk6IGJ0bjQubWF4WSArIE1fc3BhY2VyXG5cbmJ0bjYgPSBuZXcgQnV0dG9uXG5cdHR5cGU6IFwidGFnXCJcblx0dGV4dDogXCJUaGlzIGlzIGF3ZXNvbWVcIlxuXHRpY29uOiBcImNyb3NzXCJcblx0eDogQWxpZ24uY2VudGVyKClcblx0c2lkZVBhZGRpbmdzOiAxMlxuXHR5OiBidG41Lm1heFkgKyBNX3NwYWNlclxuXG5idG43ID0gbmV3IEJ1dHRvblxuXHR0eXBlOiBcInRlcnRpYXJ5XCJcblx0dGV4dDogXCJUaGlzIGlzIGF3ZXNvbWVcIlxuXHR4OiBBbGlnbi5jZW50ZXIoKVxuXHR5OiBidG42Lm1heFkgKyBNX3NwYWNlclxuXG5cdFwiXCJcIiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cblxuIyBGaXhlZCBidXR0b25cbmJ1dHRvbkZpeGVkID0gbmV3IEJ1dHRvbkZpeGVkXG5cdHRleHQ6IFwiQWRkIHRvIGJhc2tldFwiXG5cdFwiXCJcIiIsInBsdWdpbi5ydW4gPSAoY29udGVudHMsIG9wdGlvbnMpIC0+XG5cdFwiXCJcIlxuI3tjb250ZW50c31cbiMgU2ltcGxlIGFjdGlvbiBzaGVldCBleGFtcGxlXG5idG5BID0gbmV3IEJ1dHRvblxuXHR0ZXh0OiBcIlNob3cgYWN0aW9uIHNoZWV0XCJcblx0eTogMTAwLCB4OiBBbGlnbi5jZW50ZXJcblxuYWN0aW9uU2hlZXQgPSBuZXcgQWN0aW9uU2hlZXRcblx0Y29udGVudDogbXlfYWN0aW9uc2hlZXRfY29udGVudFxuXHRidXR0b246XG5cdFx0dGV4dDogXCJQdXJjaGFzZVwiXG5cdFx0d2lkdGg6IDExNlxuXHRcdHZpc2libGU6IGZhbHNlXG5cdHRpdGxlOlxuXHRcdHZpc2libGU6IHRydWVcblx0XHR0ZXh0OiBcIkhlbGxvIVwiXG5cbmJ0bkEub25UYXAgLT5cblx0YWN0aW9uU2hlZXQuc2hvdygpXG5cdFwiXCJcIlxuIiwicGx1Z2luLnJ1biA9IChjb250ZW50cywgb3B0aW9ucykgLT5cblx0XCJcIlwiXG4je2NvbnRlbnRzfVxuIyBBY2NvcmRpb24gZXhhbXBsZVxuYWNjb3JkaW9uQSA9IG5ldyBBY2NvcmRpb25cblx0ZXhwYW5kZWQ6IHRydWVcblx0bGFiZWxUZXh0OiBcIkRlc2NyaXB0aW9uXCJcblxuIyBBY2NvcmRpb24gd2l0aCB5b3VyIGNvbnRlbnQgXG4jIChwYXN0ZSB0ZXJnZXRlZCBmcmFtZSBmcm9tIGRlc2lnbiBtb2RlKVxuYWNjb3JkaW9uQiA9IG5ldyBBY2NvcmRpb25cblx0eTogYWNjb3JkaW9uQS5tYXhZXG5cdGV4cGFuZGVkOiB0cnVlXG5cdGxhYmVsVGV4dDogXCJEZXNjcmlwdGlvblwiXG5cdGNvbnRlbnQ6IGFjY19kZXNjcmlwdGlvbl9jb25ldGVudFxuXG5cdFwiXCJcIlxuIiwiIyBTaXplIHZhcmlhYmxlcyBmcm9tIERlc2lnbiBtb2RlXG53aW5kb3cuTF9zcGFjZXIgPSBzaXplc192YXJpYWJsZXMuc2VsZWN0Q2hpbGQoXCJMXCIpLndpZHRoXG53aW5kb3cuTV9zcGFjZXIgPSBzaXplc192YXJpYWJsZXMuc2VsZWN0Q2hpbGQoXCJNXCIpLndpZHRoXG53aW5kb3cuU19zcGFjZXIgPSBzaXplc192YXJpYWJsZXMuc2VsZWN0Q2hpbGQoXCJTXCIpLndpZHRoXG53aW5kb3cuWFNfc3BhY2VyID0gc2l6ZXNfdmFyaWFibGVzLnNlbGVjdENoaWxkKFwiWFNcIikud2lkdGhcbndpbmRvdy5YWFNfc3BhY2VyID0gc2l6ZXNfdmFyaWFibGVzLnNlbGVjdENoaWxkKFwiWFhTXCIpLndpZHRoXG53aW5kb3cuWFhYU19zcGFjZXIgPSBzaXplc192YXJpYWJsZXMuc2VsZWN0Q2hpbGQoXCJYWFhTXCIpLndpZHRoIiwiIyBIaWRlIGhpbnRzXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG4jIEZ1bmN0aW9uIGRlc3RvcnkgYWxsIHNlbGVjdGVkIGxheWVycyBmcm9tIGluc3BlY3RvciBmcm9tIERlc2lnbiBtb2RlXG5kZXN0cm95SW5zcGVjdG9yTGF5ZXJzID0gLT5cblx0RkZLaXRfY29tcG9uZW50cy5kZXN0cm95KClcblx0RkZLaXRfdW5pdHMuZGVzdHJveSgpXG5cdEZGS2l0X3R5cGVfc3R5bGVzLmRlc3Ryb3koKVxuXG4jIENvbWJpbmVkIHNldHVwIGZ1bmN0aW9ucyBcbmV4cG9ydHMuc2V0dXAgPSAtPlxuXHRkZXN0cm95SW5zcGVjdG9yTGF5ZXJzKClcblxuIyBDb25maWcgZm9yIHNlbGVjdEltYWdlKClcbndpbmRvdy5kZWZhdWx0QVBJSW1hZ2VTaXplID0gXCIzMDBcIlxud2luZG93LmRlZmF1bHRBUElJbWFnZU9yZGVyID0gMVxud2luZG93LnVzZUV4dGVybmFsSW1hZ2VzID0gZmFsc2UgIyB0cnVlLCBmYWxzZSBcblxuIyBEZWZpbmluZyB2YXIgJyQnIHRoYXQgcmVwcmVzZW5ndHMgcGF0aCB0byBjb250ZW50IGZvbGRlciBcbndpbmRvdy4kID0gXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvXCJcblxuIyBMb2FkIGdsb2JhbCBoZWxwZXIgZnVuY3Rpb25zXG5yZXF1aXJlIFwiRkZLaXQvaGVscGVyLWZ1bmN0aW9ucy9hZGRDaGlsZHJlblwiIFxucmVxdWlyZSBcIkZGS2l0L2hlbHBlci1mdW5jdGlvbnMvdGFyZ2V0RGVzaWduTW9kZVwiXG5yZXF1aXJlIFwiRkZLaXQvaGVscGVyLWZ1bmN0aW9ucy9wb3NpdGlvbkFmdGVyXCJcblxuIyBBcnJheSAxXG53aW5kb3cud29tZW5Qb3JvZHVjdHMgPSBbXG5cdFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDEuanBnXCIsXG5cdFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDIuanBnXCIsXG5cdFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDMuanBnXCIsXG5cdFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDQuanBnXCIsXG5cdFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDUuanBnXCIsXG5cdFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDYuanBnXCIsXG5cdFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvcHJvZHVjdHMvd29tZW4vMDcuanBnXCIsXG5cdF0iLCIjIHdpbmRvdy5GRlRleHQgPVxuIyBcdFhMQm9sZDogXCJib2xkVGl0bGVcIlxuIyBcdEw6IFwibGFyZ2VUaXRsZVwiXG4jIFx0TEJvbGQ6IFwidGl0bGUxXCJcbiMgXHRNOiBcInRpdGxlMVwiXG4jIFx0TUNvbmRlbnNlZDogXCJ0aXRsZTJcIlxuIyBcdE1Cb2xkOiBcInRpdGxlM1wiXG4jIFx0U0JvbGQ6IFwiaGVhZGxpbmVcIlxuIyBcdFM6IFwiYm9keVwiXG4jIFx0WFNCb2xkOiBcImNhbGxvdXRcIlxuIyBcdFhTOiBcInN1YmhlYWRcIlxuXG5cbmNsYXNzIHdpbmRvdy5GRlRleHRMYXllciBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHQ9e30pIC0+XG5cdFx0QG9wdCA9IF8uZGVmYXVsdHMge30sIEBvcHQsXG4jXHRcdFx0dGV4dFN0eWxlOiBQb2xhcmlzXG4jXHRcdFx0Zm9udFNpemU6IDE3XG4jXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRjb2xvcjogXCIjMjIyMjIyXCJcblxuXHRcdCMgVGV4dExheWVyIGlnbm9yZXMgYW55IGZvbnQgY2hhbmdlcyBkdXJpbmcgY29uc3RydWN0aW9uLCBzbyBkZWxheSBzZXR0aW5nIHRoZSBzdHlsZSB1bnRpbCBhZnRlciBzdXBlclxuXHRcdHRleHRTdHlsZSA9IEBvcHQudGV4dFN0eWxlXG5cdFx0QG9wdC50ZXh0U3R5bGUgPSBudWxsXG5cblx0XHRzdXBlciBAb3B0XG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXG5cdFx0QHRleHRTdHlsZSA9IHRleHRTdHlsZVxuXG5cdEBkZWZpbmUgXCJ0ZXh0U3R5bGVcIixcblx0XHRnZXQ6IC0+IEBfdGV4dFN0eWxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAX3RleHRTdHlsZSA9IHZhbHVlXG5cdFx0XHRAX3VwZGF0ZVN0eWxlKClcblxuXHRfdXBkYXRlU3R5bGU6IC0+XG5cdFx0c3R5bGVzID1cblx0XHRcdFhMQm9sZDpcblx0XHRcdFx0Zm9udFNpemU6IDI2XG4jXHRcdFx0XHRsaW5lSGVpZ2h0OiAzMlxuXHRcdFx0XHRmb250V2VpZ2h0OiA4MDBcblx0XHRcdFx0Zm9udEZhbWlseTogXCJQb2xhcmlzXCJcblx0XHRcdEw6XG5cdFx0XHRcdGZvbnRTaXplOiAxOFxuI1x0XHRcdFx0bGluZUhlaWdodDogMjhcblx0XHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiUG9sYXJpc1wiXG5cdFx0XHRMQm9sZDpcblx0XHRcdFx0Zm9udFNpemU6IDE4XG4jXHRcdFx0XHRsaW5lSGVpZ2h0OiAyOFxuXHRcdFx0XHRmb250V2VpZ2h0OiA4MDBcblx0XHRcdFx0Zm9udEZhbWlseTogXCJQb2xhcmlzXCJcblx0XHRcdE06XG5cdFx0XHRcdGZvbnRTaXplOiAxNVxuI1x0XHRcdFx0bGluZUhlaWdodDogMjJcblx0XHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiUG9sYXJpc1wiXG5cdFx0XHRNQ29uZDpcblx0XHRcdFx0Zm9udFNpemU6IDE0XG4jXHRcdFx0XHRsaW5lSGVpZ2h0OiAyM1xuXHRcdFx0XHRmb250V2VpZ2h0OiA3MDBcblx0XHRcdFx0bGV0dGVyU3BhY2luZzogMS42XG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiUG9sYXJpcyBDb25kZW5zZWRcIlxuXHRcdFx0XHR0ZXh0VHJhbnNmb3JtOiBcInVwcGVyY2FzZVwiXG5cdFx0XHRNQm9sZDpcblx0XHRcdFx0Zm9udFNpemU6IDE1XG4jXHRcdFx0XHRsaW5lSGVpZ2h0OiAyMlxuXHRcdFx0XHRmb250V2VpZ2h0OiA4MDBcblx0XHRcdFx0Zm9udEZhbWlseTogXCJQb2xhcmlzXCJcblx0XHRcdFNCb2xkOlxuXHRcdFx0XHRmb250U2l6ZTogMTJcbiNcdFx0XHRcdGxpbmVIZWlnaHQ6IDE4XG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDgwMFx0XHRcblx0XHRcdFx0Zm9udEZhbWlseTogXCJQb2xhcmlzXCJcblx0XHRcdFM6XG5cdFx0XHRcdGZvbnRTaXplOiAxMlxuI1x0XHRcdFx0bGluZUhlaWdodDogMThcblx0XHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiUG9sYXJpc1wiXG5cdFx0XHRYU0JvbGQ6XG5cdFx0XHRcdGZvbnRTaXplOiAxMFxuI1x0XHRcdFx0bGluZUhlaWdodDogMTZcblx0XHRcdFx0Zm9udFdlaWdodDogODAwXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiUG9sYXJpc1wiXHRcblx0XHRcdFhTOlxuXHRcdFx0XHRmb250U2l6ZTogMTBcbiNcdFx0XHRcdGxpbmVIZWlnaHQ6IDE2XG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0XHRmb250RmFtaWx5OiBcIlBvbGFyaXNcIlxuXG5cdFx0QHByb3BzID0gc3R5bGVzW0B0ZXh0U3R5bGVdXG4iLCIjIyMjIyMjIyMjIyMjIyBDYXRlZ29yaWVzIFBhZ2UgIyMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuRGVzaWduZXJzUGFnZSBleHRlbmRzIExheWVyXG4jIyMjIEluaXRpYWwgZnJhbWUgY29uc3RydWN0b3IgIyMjI1xuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRjb250ZW50OiBcIm1vZHVsZXMvRkZLaXQvY29udGVudC9kZWZhdWx0L2Rlc2lnbmVycy5qc29uXCJcblx0XHRcdGFjdGlvbnM6IHtcblx0XHRcdFx0XCIyNjgyMDgyXCI6IC0+IHByaW50IFwiVGFwIVwiXG5cdFx0XHRcdFwiMTg1NjYzXCI6IC0+IHByaW50IFwiQW5kIGFub3RoZXIgdGFwIVwiXG5cdFx0XHR9XG5cdFx0XG5cdFx0Y29udGVudEFyciA9IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIEBvcHQuY29udGVudFxuXHRcdHVuaW9uQXJyID0gY29udGVudEFyci53b21lbi5jb25jYXQoY29udGVudEFyci5tZW4sIGNvbnRlbnRBcnIua2lkcylcblx0XHRcblx0XHQjIyMjIyMgQ3JlYXRlIGxldHRlcnMgYXJyYXkgIyMjIyMjI1xuXHRcdGxldHRlcnNBcnIgPSBbXVxuXHRcdGZvciBjaGlsZCBpbiB1bmlvbkFyclxuXHRcdFx0aWYgaXNOYU4gY2hpbGQubmFtZS5jaGFyQXQoMClcblx0XHRcdFx0bGV0dGVyc0Fyci5wdXNoIGNoaWxkLm5hbWUuY2hhckF0KDApXG5cdFx0XG5cdFx0bGV0dGVyc0Fyci5zb3J0IChhLCBiKSAtPlxuXHRcdFx0YSA+IGJcblx0XHRcdFxuXHRcdGxldHRlcnNBcnIuc2hpZnQoKVxuXHRcdGxldHRlcnNBcnIucHVzaChcIiNcIilcblx0XHRsZXR0ZXJzQXJyID0gXy51bmlxIGxldHRlcnNBcnJcblxuXHRcdCMjIyMjIyBjcnJlYXRlIGxheWVycyAjIyMjIyNcblx0XHRAaGVhZGVyID0gbmV3IEhlYWRlclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR5OiBzd2l0Y2ggRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXG5cdFx0XHRcdHdoZW4gXCJhcHBsZS1pcGhvbmUteC1zcGFjZS1ncmF5XCIsIFwiYXBwbGUtaXBob25lLXgtc2lsdmVyXCIgdGhlbiA0NCBcblx0XHRcdFx0ZWxzZSAyMFxuXHRcdFx0bmFtZTogXCJjYXRlZ29yaWVzIGhlYWRlclwiXG5cdFx0XHR0aXRsZTogXCJEZXNpZ25lcnNcIlxuXHRcdFx0aWNvbkxlZnQ6IFwiYmlnLWFycm93XCJcblx0XHRcblx0XHRAcmVmaW5lV3JhcCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRuYW1lOiBcInJlZmluZSB3cmFwXCJcblx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdGhlaWdodDogcmVmaW5lX2ZpbHRlci5oZWlnaHRcblx0XHRcdHk6IEBoZWFkZXIubWF4WVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRcblx0XHRAcmVmaW5lQnRuID0gcmVmaW5lX2ZpbHRlci5zZWxlY3RDaGlsZChcInJlZmluZV9idXR0b25cIikuY29weSgpXG5cdFx0QHJlZmluZUJ0bi5wcm9wcyA9IFxuXHRcdFx0cGFyZW50OiBAcmVmaW5lV3JhcFxuXHRcdFx0eTogQWxpZ24uY2VudGVyKClcblx0XHRcdHg6IE1fc3BhY2VyXG5cdFx0XG5cdFx0QHJlZmluZUJ0bi5zZWxlY3RDaGlsZChcInJlZmluZV9idXR0b25fdGV4dFwiKS53aWR0aCA9IEByZWZpbmVCdG4uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIikud2lkdGggKyAyXG5cdFx0XG5cdFx0QHNjcm9sbENtcCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0bmFtZTogXCJzY3JvbGwgY29tcFwiXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHQgLSBAaGVhZGVyLm1heFlcblx0XHRcdHk6IEBoZWFkZXIubWF4WVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGNvbnRlbnRJbnNldDpcblx0XHRcdFx0dG9wOiBAcmVmaW5lV3JhcC5oZWlnaHQgKyBYU19zcGFjZXJcblx0XHRcblx0XHRALm9uIFwiY2hhbmdlOmZyYW1lXCIsID0+XG5cdFx0XHRAc2Nyb2xsQ21wLmNvbnRlbnRJbnNldCA9XG5cdFx0XHRcdHRvcDogQHJlZmluZVdyYXAuaGVpZ2h0ICsgWFNfc3BhY2VyXG5cdFx0XHRcblx0XHRcdEBzY3JvbGxDbXAuc2Nyb2xsUG9pbnQgPVxuXHRcdFx0XHR5OiBAc2VhcmNoSW5wdXQuaGVpZ2h0XG5cdFx0XHRcdFx0XG5cdFx0QHNlYXJjaElucHV0ID0gbmV3IFNlYXJjaElucHV0XG5cdFx0XHRuYW1lOiBcInNlYXJjaCBpbnB1dFwiXG5cdFx0XHRwYXJlbnQ6IEBzY3JvbGxDbXAuY29udGVudFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCAtIE1fc3BhY2VyXG5cdFx0XHR5OiBYU19zcGFjZXJcblx0XHRcdHg6IEFsaWduLmNlbnRlcigpXG5cdFx0XHRwbGFjZWhvbGRlcjogXCJTZWFyY2ggZm9yIGEgZGVzaWduZXJcIlxuXHRcdFxuXHRcdEBzY3JvbGxDbXAuc2Nyb2xsUG9pbnQgPVxuXHRcdFx0eTogQHNlYXJjaElucHV0LmhlaWdodFxuXHRcdFx0XG5cdFx0QHJlZmluZVdyYXAuYnJpbmdUb0Zyb250KClcblx0XHRcblx0XHRzZWN0aW9uc0FyciA9IFtdXG5cdFx0XG5cdFx0Zm9yIGl0ZW0sIGkgaW4gbGV0dGVyc0FyclxuXHRcdFx0QFtcIiN7aXRlbX1IZWFkZXJcIl0gPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAc2Nyb2xsQ21wLmNvbnRlbnRcblx0XHRcdFx0bmFtZTogXCIje2l0ZW19SGVhZGVyXCJcblx0XHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IDY0XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRcdFxuXHRcdFx0QFtcIiN7aXRlbX1TZWN0aW9uXCJdID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6IFwiI3tpdGVtfVNlY3Rpb25cIlxuXHRcdFx0XHRwYXJlbnQ6IEBzY3JvbGxDbXAuY29udGVudFxuXHRcdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRcblx0XHRcdHNlY3Rpb25zQXJyLnB1c2goQFtcIiN7aXRlbX1TZWN0aW9uXCJdKVxuXHRcdFx0XG5cdFx0XHRoZWFkZXJMZXR0ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdHg6IE1fc3BhY2VyLCB5OiBNX3NwYWNlclxuXHRcdFx0XHRwYXJlbnQ6IEBbXCIje2l0ZW19SGVhZGVyXCJdXG5cdFx0XHRcdHRleHQ6IGl0ZW1cblx0XHRcdFx0dGV4dFRyYW5zZm9ybTogXCJ1cHBlcmNhc2VcIlxuXHRcdFx0XHRmb250RmFtaWx5OiBcIlBvbGFyaXMtQm9sZFwiXG5cdFx0XHRcdGNvbG9yOiBcIiMyMjIyMjJcIlxuXHRcdFx0XHRmb250U2l6ZTogMThcblx0XHRcblx0XHRpdGVtc0FycmF5ID0gW11cblx0XHRcblx0XHRmb3IgY2hpbGQsIGkgaW4gdW5pb25BcnJcblx0XHRcdGZvciBpIGluIGxldHRlcnNBcnJcblx0XHRcdFx0aWYgaSBpcyBjaGlsZC5uYW1lLmNoYXJBdCgwKVxuXHRcdFx0XHRcdEBbXCIje2NoaWxkLmlkfVwiXSA9IG5ldyBMaXN0SXRlbVxuXHRcdFx0XHRcdFx0bmFtZTogXCIje2NoaWxkLmlkfVwiXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IEBbXCIje2l9U2VjdGlvblwiXVxuXHRcdFx0XHRcdFx0dGV4dDogY2hpbGQubmFtZVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGl0ZW1zQXJyYXkucHVzaChAW1wiI3tjaGlsZC5pZH1cIl0pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRpZiAhaXNOYU4gY2hpbGQubmFtZS5jaGFyQXQoMClcblx0XHRcdFx0QFtcIiN7Y2hpbGQuaWR9XCJdID0gbmV3IExpc3RJdGVtXG5cdFx0XHRcdFx0bmFtZTogXCIje2NoaWxkLmlkfVwiXG5cdFx0XHRcdFx0cGFyZW50OiBAW1wiI1NlY3Rpb25cIl1cblx0XHRcdFx0XHR0ZXh0OiBjaGlsZC5uYW1lXG5cdFx0XHRcdFxuXHRcdFx0XHRpdGVtc0FycmF5LnB1c2goQFtcIiN7Y2hpbGQuaWR9XCJdKVxuXHRcdFx0XG5cdFx0YWN0aW9uc0FyciA9IEBvcHQuYWN0aW9uc1xuXHRcdGZvciBjaGlsZCwgaSBpbiBpdGVtc0FycmF5XG5cdFx0XHRjaGlsZC5vblRhcCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyhAbmFtZSlcblx0XHRcdFx0aWYgdHlwZW9mIGFjdGlvbnNBcnJbXCIje0BuYW1lfVwiXSBpcyBcImZ1bmN0aW9uXCJcblx0XHRcdFx0XHRhY3Rpb25zQXJyW1wiI3tAbmFtZX1cIl0oKVxuXHRcdFxuXHRcdGZvciBpdGVtLCBpIGluIHNlY3Rpb25zQXJyXG5cdFx0XHRuZXdQb3MgPSAwXG5cdFx0XHRmb3IgaSwgaiBpbiBpdGVtLmNoaWxkcmVuXG5cdFx0XHRcdGkueSA9IG5ld1Bvc1xuXHRcdFx0XHRuZXdQb3MgPSBpLm1heFlcblx0XHRcdFx0XG5cdFx0XHRpdGVtLmhlaWdodCA9IGl0ZW0uY2hpbGRyZW4uc2xpY2UoLTEpWzBdLm1heFlcblx0XHRcblx0XHRzZWN0aW9uc0FyciA9IHVuaW9uQXJyID0gW11cblx0XHRcblx0XHRmb3IgaXRlbSwgaSBpbiBAc2Nyb2xsQ21wLmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdGl0ZW0ueSA9IG5ld1lwb3Ncblx0XHRcdG5ld1lwb3MgPSBpdGVtLm1heFlcblx0XHRcblx0XHRAc2lkZUFscGhhYmV0ID0gbmV3IFRleHRMYXllclxuXHRcdFx0bmFtZTogXCJzaWRlQWxwaGFiZXRcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgpXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXIoKVxuXHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHR0ZXh0OiBcIiN7bGV0dGVyc0Fyci5qb2luKFwiIFwiKX1cIlxuXHRcdFx0Zm9udFNpemU6IDEyXG5cdFx0XHR3aWR0aDogMTJcblx0XHRcdHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCJcblx0XHRcblx0XHQjIyMjIFJlZmluZSBQYWdlICMjIyNcblx0XHRAcmVmaW5lUGFnZSA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XG5cdFx0QHJlZmluZVBhZ2UueSA9IEFsaWduLmJvdHRvbShAcmVmaW5lUGFnZS5oZWlnaHQpXG5cdFx0XG5cdFx0QHJlZmluZVBhZ2Uuc3RhdGVzID1cblx0XHRcdHN0YXRlQTpcblx0XHRcdFx0eTogMFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC40XG5cdFx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMC45KVxuXHRcdFxuXHRcdEByZWZpbmVQYWdlSGVhZGVyID0gbmV3IEhlYWRlclxuXHRcdFx0cGFyZW50OiBAcmVmaW5lUGFnZVxuXHRcdFx0aWNvbkxlZnQ6IFwiYmlnLWNyb3NzXCJcblx0XHRcdHRpdGxlOiBcIlJlZmluZVwiXG5cdFx0XHR5OiBzd2l0Y2ggRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXG5cdFx0XHRcdHdoZW4gXCJhcHBsZS1pcGhvbmUteC1zcGFjZS1ncmF5XCIsIFwiYXBwbGUtaXBob25lLXgtc2lsdmVyXCIgdGhlbiA0NCBcblx0XHRcdFx0ZWxzZSAyMFxuXHRcdFxuXHRcdEByZWZpbmVTY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHRwYXJlbnQ6IEByZWZpbmVQYWdlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0aGVpZ2h0OiBAaGVpZ2h0IC0gKEByZWZpbmVQYWdlSGVhZGVyLm1heFkgKyBTX3NwYWNlcilcblx0XHRcdHk6IEByZWZpbmVQYWdlSGVhZGVyLm1heFkgKyBTX3NwYWNlclxuXHRcdFxuXHRcdEBnZW5kZXJUaXRsZSA9IG5ldyBMaXN0VGl0bGVcblx0XHRcdHBhcmVudDogQHJlZmluZVNjcm9sbC5jb250ZW50XG5cdFx0XHR0ZXh0OiBcIkdlbmRlclwiXG5cdFx0XG5cdFx0QGdlbmRlclJhZGlvU2VsZWN0ID0gbmV3IExpc3RSYWRpb1NlbGVjdFxuXHRcdFx0eTogQGdlbmRlclRpdGxlLm1heFlcblx0XHRcdHBhcmVudDogQHJlZmluZVNjcm9sbC5jb250ZW50XG5cdFx0XHRzZWxlY3RBcnJheTogW1xuXHRcdFx0XHR7dGV4dCA6IFwiV29tZW5cIiwgb246IHRydWV9LCBcblx0XHRcdFx0e3RleHQgOiBcIk1lblwifVxuXHRcdFx0XHR7dGV4dDogXCJLaWRzXCJ9XG5cdFx0XHRdXG5cdFx0XG5cdFx0QGZpbHRlckJ5VHRpdGxlID0gbmV3IExpc3RUaXRsZVxuXHRcdFx0cGFyZW50OiBAcmVmaW5lU2Nyb2xsLmNvbnRlbnRcblx0XHRcdHRleHQ6IFwiRmlsdGVyIEJ5XCJcblx0XHRcdHk6IEBnZW5kZXJSYWRpb1NlbGVjdC5tYXhZICsgTV9zcGFjZXJcblx0XHRcblx0XHRAZmlsdGVySXRlbUEgPSBuZXcgTGlzdEl0ZW1cblx0XHRcdHBhcmVudDogQHJlZmluZVNjcm9sbC5jb250ZW50XG5cdFx0XHR5OiBAZmlsdGVyQnlUdGl0bGUubWF4WVxuXHRcdFx0cmlnaHQ6IFwic21hbGwtdGlja1wiXG5cdFx0XHR0ZXh0OiBcIkN1cnJlbnQgc2Vhc29uXCJcblx0XHRcblx0XHRAZmlsdGVySXRlbUIgPSBuZXcgTGlzdEl0ZW1cblx0XHRcdHBhcmVudDogQHJlZmluZVNjcm9sbC5jb250ZW50XG5cdFx0XHR5OiBAZmlsdGVySXRlbUEubWF4WVxuXHRcdFx0dGV4dDogXCJTYWxlIG9ubHlcIlxuXHRcdFxuXHRcdEBmaWx0ZXJJdGVtQyA9IG5ldyBMaXN0SXRlbVxuXHRcdFx0cGFyZW50OiBAcmVmaW5lU2Nyb2xsLmNvbnRlbnRcblx0XHRcdHk6IEBmaWx0ZXJJdGVtQi5tYXhZXG5cdFx0XHR0ZXh0OiBcIkZhdm91cml0ZSBkZXNpZ25lcnNcIlx0XG5cdFx0XG5cdFx0QGZpeGVkQnRuID0gbmV3IEJ1dHRvbkZpeGVkXG5cdFx0XHRwYXJlbnQ6IEByZWZpbmVQYWdlXG5cdFx0XHR0ZXh0OiBcIlNob3cgZGVzaWduZXJzXCJcblx0XHRcblx0XHRAZml4ZWRCdG4uZml4ZWRfYnRuLndpZHRoID0gMjIwXG5cdFx0QGZpeGVkQnRuLmZpeGVkX2J0bi54ID0gQWxpZ24uY2VudGVyKClcblx0XHRcblx0XHQjIEFjdGlvbnNcblx0XHRAcmVmaW5lQnRuLm9uVGFwID0+XG5cdFx0XHRAcmVmaW5lUGFnZS5hbmltYXRlKFwic3RhdGVBXCIpXG5cdFx0XG5cdFx0QHJlZmluZVBhZ2VIZWFkZXIuaWNvbkxlZnRfbGF5ZXIub25UYXAgPT5cblx0XHRcdEByZWZpbmVQYWdlLmFuaW1hdGUoXCJkZWZhdWx0XCIpIiwiIyMjIyMjIyMjIyMjIyMgQ2F0ZWdvcmllcyBQYWdlICMjIyMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LkNhdGVnb3JpZXNQYWdlIGV4dGVuZHMgTGF5ZXJcblx0IyBJbml0aWFsIGZyYW1lIGNvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRcdGNvbnRlbnQ6IFwibW9kdWxlcy9GRktpdC9jb250ZW50L2RlZmF1bHQvY2F0ZWdvcmllcy5qc29uXCJcblx0XHRcdGFjdGlvbnM6IHtcblx0XHRcdFx0XCJpdGVtMVwiOiAtPiBwcmludCBcIlRhcCFcIlxuXHRcdFx0fVxuXHRcdFxuXHRcdEBoZWFkZXIgPSBuZXcgSGVhZGVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHk6IHN3aXRjaCBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVcblx0XHRcdFx0d2hlbiBcImFwcGxlLWlwaG9uZS14LXNwYWNlLWdyYXlcIiwgXCJhcHBsZS1pcGhvbmUteC1zaWx2ZXJcIiB0aGVuIDQ0IFxuXHRcdFx0XHRlbHNlIDIwXG5cdFx0XHRuYW1lOiBcImNhdGVnb3JpZXMgaGVhZGVyXCJcblx0XHRcdHRpdGxlOiBcIkNhdGVnb3JpZXNcIlxuXHRcdFx0aWNvbkxlZnQ6IFwiYmlnLWFycm93XCJcblxuXHRcdEB0YWJzID0gbmV3IFRhYnNcblx0XHRcdG5hbWU6IFwidGFic1wiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHk6IEBoZWFkZXIubWF4WSArIFNfc3BhY2VyXG5cdFx0XG5cdFx0QGNhdGVnb3JpZXNMaXN0ID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0bmFtZTogXCJjYXRlZ29yaWVzIGxpc3RcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR5OiBAdGFicy5tYXhZICsgU19zcGFjZXJcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgLSBAdGFicy5tYXhZIC0gU19zcGFjZXJcblx0XHRcblx0XHRuZXdDb250ZW50QXJyID0gSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgKEBvcHQuY29udGVudClcblxuXHRcdHNob3dJdGVtcyhALCBuZXdDb250ZW50QXJyLndvbWVuKVxuXHRcdFxuXHRcdCMjIyMgVGFwIG9uIEdlbmRlciBzZWxlY3Rpb24gIyMjI1xuXHRcdGZvciBpdGVtIGluIEB0YWJzLm5ld0l0ZW1zQXJyXG5cdFx0XHRpdGVtLm9uVGFwID0+XG5cdFx0XHRcdGZvciBjaGlsZCBpbiBAY2F0ZWdvcmllc0xpc3QuY29udGVudC5jaGlsZHJlblxuXHRcdFx0XHRcdGNoaWxkLmRlc3Ryb3koKVxuXHRcdFx0XHRcblx0XHRcdFx0c3dpdGNoIEB0YWJzLmN1cnJlbnRJdGVtXG5cdFx0XHRcdFx0d2hlbiBcIndvbWVuXCJcblx0XHRcdFx0XHRcdHNob3dJdGVtcyhALCBuZXdDb250ZW50QXJyLndvbWVuKVxuXHRcdFx0XHRcdHdoZW4gXCJtZW5cIlxuXHRcdFx0XHRcdFx0c2hvd0l0ZW1zKEAsIG5ld0NvbnRlbnRBcnIubWVuKVxuXHRcdFx0XHRcdHdoZW4gXCJraWRzXCJcblx0XHRcdFx0XHRcdHNob3dJdGVtcyhALCBuZXdDb250ZW50QXJyLmtpZHMpXG5cdFx0XG5cdCMjIyMgTWV0aG9kcyAjIyMjXHRcblx0c2hvd0l0ZW1zID0gKHBhcmVudCwgY29udGVudEFycikgLT5cblx0XHRmb3IgY2hpbGQgaW4gY29udGVudEFyclxuXHRcdFx0cGFyZW50LmNhdGVnb3JpZXNMaXN0LmNvbnRlbnRbXCIje2NoaWxkLmlkfVwiXSA9IG5ldyBMaXN0SXRlbVxuXHRcdFx0XHRuYW1lOiBjaGlsZC5pZFxuXHRcdFx0XHRwYXJlbnQ6IHBhcmVudC5jYXRlZ29yaWVzTGlzdC5jb250ZW50XG5cdFx0XHRcdHRleHQ6IGNoaWxkLm5hbWVcblx0XHRcdFx0cmlnaHQ6IFwiYXJyb3ctcmlnaHRcIlxuXHRcdFx0XG5cdFx0XHRwYXJlbnQuY2F0ZWdvcmllc0xpc3QuY29udGVudFtcIiN7Y2hpbGQuaWR9XCJdLnkgPSBuZXh0UG9zWVxuXHRcdFx0bmV4dFBvc1kgPSBwYXJlbnQuY2F0ZWdvcmllc0xpc3QuY29udGVudFtcIiN7Y2hpbGQuaWR9XCJdLm1heFlcblx0XHRcdFx0XG5cdFx0XHRwYXJlbnQuY2F0ZWdvcmllc0xpc3QuY29udGVudFtcIiN7Y2hpbGQuaWR9XCJdLm9uVGFwIC0+XG5cdFx0XHRcdGlmIHR5cGVvZiBwYXJlbnQub3B0LmFjdGlvbnNbXCIje0BuYW1lfVwiXSBpcyBcImZ1bmN0aW9uXCJcblx0XHRcdFx0XHRwYXJlbnQub3B0LmFjdGlvbnNbXCIje0BuYW1lfVwiXSgpIiwiI/CfmqbimpnvuI8gIEhlbHBlciBGdW5jdGlvbiAtIHRhcmdldERlc2lnbk1vZGVcblxud2luZG93LnRhcmdldERlc2lnbk1vZGUgPSAodGFyZ2V0LCBmcmFtZSkgLT5cblx0IyBmb3IgY2hpbGRyZW4sIGkgaW4gY2hpbGRyZW5BcnJheVxuXHQjIFx0Y2hpbGRyZW4ucGFyZW50ID0gcGFyZW50XG5cdGZyYW1lLnggPSB0YXJnZXQueFxuXHRmcmFtZS55ID0gdGFyZ2V0Lnlcblx0ZnJhbWUuc2l6ZSA9IHRhcmdldC5zaXplXG5cdGZyYW1lLnBhcmVudCA9IHRhcmdldC5wYXJlbnRcblx0dGFyZ2V0LmRlc3Ryb3koKVxuIiwiIyDwn5qm4pqZ77iPIEhlbHBlciBGdW5jdGlvbnMg4oCUIHNlbGVjdEltYWdlLCBzZWxlY3RSYW5kb21JbWFnZVxud2luZG93LnNlbGVjdEltYWdlID0gKGFycmF5LCBpbWFnZU9yZGVyID0gZGVmYXVsdEFQSUltYWdlT3JkZXIpIC0+XG5cdFxuXHRpZiBhcnJheS5sZW5ndGggPT0gMFxuXHRcdHJldHVybiBcIlwiXG5cdFxuXHRpZiBhcnJheS5sZW5ndGggPiAxXG5cdFx0ZmlsdGVyZWRJbWFnZXMgPSBhcnJheS5maWx0ZXIgKGltYWdlKSAtPiBpbWFnZS5vcmRlciA9PSBpbWFnZU9yZGVyICYmIGltYWdlLnNpemUgPT0gZGVmYXVsdEFQSUltYWdlU2l6ZVxuXHRcdFxuXHRcdGlmIGZpbHRlcmVkSW1hZ2VzLmxlbmd0aCA+IDBcblx0XHRcdHNlbGVjdGVkSW1hZ2UgPSBmaWx0ZXJlZEltYWdlc1swXVxuXHRcdGVsc2Vcblx0XHRcdHNlbGVjdGVkSW1hZ2UgPSBhcnJheVswXVxuXHRlbHNlXG5cdFx0c2VsZWN0ZWRJbWFnZSA9IGFycmF5WzBdXG5cdFx0XG5cdHJldHVybiBzZWxlY3RlZEltYWdlLnVybCIsIiMgSGVscGVyIEZ1bmN0aW9uIC0gcGFyYWxheE9uU2Nyb2xsXG5leHBvcnRzLnBhcmFsYXhPblNjcm9sbCA9ICh1bml0KSAtPlxuXHQjIENoZWNrIGlmIHBhcmVudCBvZiB0aGUgdW5pdCBpcyBTY3JvbGxDb21wb25lbnRcblx0aWYgdW5pdC5wYXJlbnQgYW5kIHVuaXQucGFyZW50Lm5hbWUgaXMgXCJjb250ZW50XCJcblx0XHRpZiB1bml0LnBhcmVudC5wYXJlbnQuY29uc3RydWN0b3IubmFtZSBpcyBcIlNjcm9sbENvbXBvbmVudFwiXG5cdFx0XHRcdHVuaXQucGFyZW50LnBhcmVudC5vbiBFdmVudHMuTW92ZSwgKGV2ZW50LCBsYXllcikgLT5cblx0XHRcdFx0XHR5ID0gdW5pdC5wYXJlbnQueSArIHVuaXQueVxuXHRcdFx0XHRcdHVuaXQuc2VsZWN0Q2hpbGQoJ2ltYWdlJykueSA9IFV0aWxzLm1vZHVsYXRlKFxuXHRcdFx0XHRcdFx0eSwgXHRcdCAgICMgQSB2YXJpYWJsZSwgcmVwcmVzZW50aW5nIHRoZSBpbnB1dC5cblx0XHRcdFx0XHRcdFswLCAtMzYwXSwgIyBUaGUgcmFuZ2UsIHJlcHJlc2VudGluZyB3aGVuIHRvIG1vZHVsZS4uLiAjVE9ETzogQXR0YWNoZWQgdG8gdGhlIFNjcmVlbiBTaXplXG5cdFx0XHRcdFx0XHRbMCwgMTAwXSAgICMgSG93IG11Y2ggdG8gbW9kdWxhdGUuXG5cdFx0XHRcdFx0KVxuXHRcdGVsc2UgaWYgdW5pdC5wYXJlbnQucGFyZW50LmNvbnN0cnVjdG9yLm5hbWUgaXMgXCJQYWdlQ29tcG9uZW50XCJcblx0XHRcdGlmIHVuaXQucGFyZW50LnBhcmVudC5wYXJlbnQucGFyZW50XG5cdFx0XHRcdGlmIHVuaXQucGFyZW50LnBhcmVudC5wYXJlbnQucGFyZW50LnBhcmVudC5jb25zdHJ1Y3Rvci5uYW1lIGlzIFwiU2Nyb2xsQ29tcG9uZW50XCJcblx0XHRcdFx0XHR1bml0LnBhcmVudC5wYXJlbnQucGFyZW50LnBhcmVudC5wYXJlbnQub24gRXZlbnRzLk1vdmUsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHRcdFx0XHR5ID0gdW5pdC5wYXJlbnQucGFyZW50LnBhcmVudC5wYXJlbnQueSArIHVuaXQueVxuXHRcdFx0XHRcdFx0dW5pdC5zZWxlY3RDaGlsZCgnaW1hZ2UnKS55ID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHRcdFx0XHRcdHksIFx0XHQgICAjIEEgdmFyaWFibGUsIHJlcHJlc2VudGluZyB0aGUgaW5wdXQuXG5cdFx0XHRcdFx0XHRcdFswLCAtMzYwXSwgIyBUaGUgcmFuZ2UsIHJlcHJlc2VudGluZyB3aGVuIHRvIG1vZHVsZS4uLiAjVE9ETzogQXR0YWNoZWQgdG8gdGhlIFNjcmVlbiBTaXplXG5cdFx0XHRcdFx0XHRcdFswLCAxMDBdICAgIyBIb3cgbXVjaCB0byBtb2R1bGF0ZS5cblx0XHRcdFx0XHRcdCkiLCIj8J+apuKame+4jyAgSGVscGVyIEZ1bmN0aW9uIC0gZ2VuZXJhdGVEb3RzXG4jIEF0cmlidXRlczpcbiMgc2xpZGVyIFVuaXQgLSBuZWVkcyB0byBiZSBhIHBhZ2VDb21wb25lbnRcbiMgbnVtYmVyT2ZTbGlkZXMgLSBudW1iZXIsIG9yIHVzdWFsbHkgKGFycmF5Lmxlbmd0aClcbiMgY29sb3Vyc0FycmF5IC0gYXJyYXkgaW5kaWNhdGluZyB3aGF0IGNvbG91ciBpcyBlYWNoIHNsaWRlXG5cbmV4cG9ydHMuZ2VuZXJhdGVEb3RzID0gKHNsaWRlclVuaXQsIGFycmF5LCB5UG9zKSAtPlxuXG5cdCMgY3JlYXRpbmcgY29udGFpbmVyIGZvciB0aGUgZG90c1xuXHRkb3RzQ29udGFpbmVyID0gbmV3IExheWVyXG5cdFx0bmFtZTogXCJkb3RzQ29udGFpbmVyXCJcblx0XHR3aWR0aDogc2xpZGVyVW5pdC53aWR0aFxuXHRcdGhlaWdodDogNlxuXHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdHk6IEFsaWduLmJvdHRvbSgtMjApXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0cGFyZW50OiBzbGlkZXJVbml0XG5cdFx0XG5cdCNjcmVhdGluZyBhbiBhcnJheSBmb3IgdGhlIGluZGljYXRvcnNcblx0ZG90c0FycmF5ID0gW11cblxuXHRmb3IgaWkgaW4gWzAuLi5hcnJheS5sZW5ndGhdXG5cdFx0XG5cdFx0IyBjcmVhdGluZyBlYWNoIGRvdFxuXHRcdGRvdCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBkb3RzQ29udGFpbmVyXG5cdFx0XHRzaXplOiBkb3RzQ29udGFpbmVyLmhlaWdodFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBkb3RzQ29udGFpbmVyLmhlaWdodFxuXHRcdFx0eDogKGRvdHNDb250YWluZXIuaGVpZ2h0ICsgMTApICogaWlcblx0XHRcdG5hbWU6IGlpXG5cdFx0XG5cdFx0ZG90VmFsdWVzID0gXG5cdFx0XHRkb3Q6IGRvdFxuXHRcdFx0Y29sb3VyOiBhcnJheVtpaV0uZG90c0NvbG91clxuXHRcdFx0XG5cdFx0IyBQdXNoaW5nIGRvdHMgaW50byBhcnJheVxuXHRcdGRvdHNBcnJheS5wdXNoKGRvdFZhbHVlcylcblx0XHRcblx0XHRkZWZhdWx0RG90cyA9IChzbGlkZUNvbG9yKSAtPlxuXHRcdFx0Zm9yIGkgaW4gZG90c0FycmF5XG5cdFx0XHRcdGkuZG90Lm9wYWNpdHkgPSAwLjJcblx0XHRcdFx0aWYgc2xpZGVDb2xvciA9PSBcIndoaXRlXCIgdGhlbiBpLmRvdC5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNmZmZmZmZcIlxuXHRcdFx0XHRlbHNlIGkuZG90LmJhY2tncm91bmRDb2xvciA9IFwiIzAwMDAwMFwiXG5cdFx0XG5cdFx0IyBTZWxlY3QgY3VycmVudCBkb3Rcblx0XHRjdXJyZW50ID0gc2xpZGVyVW5pdC5ob3Jpem9udGFsUGFnZUluZGV4KHNsaWRlclVuaXQuY3VycmVudFBhZ2UpXG5cdFx0IyBTdHlsZSBkb3RzXG5cdFx0ZGVmYXVsdERvdHMoZG90c0FycmF5W2N1cnJlbnRdLmNvbG91cilcblx0XHQjIEhpZ2hsaWdodCBjdXJyZW50IGRvdFxuXHRcdGRvdHNBcnJheVtjdXJyZW50XS5kb3Qub3BhY2l0eSA9IDFcblx0XHRcblx0IyBjZW50ZXJpbmcgdGhlIGRvdHNcblx0ZG90c0NvbnRhaW5lci53aWR0aCA9IGRvdHNBcnJheS5sZW5ndGggKiAoZG90c0NvbnRhaW5lci5oZWlnaHQgKyAxMCkgXG5cdGRvdHNDb250YWluZXIubWlkWCA9IFNjcmVlbi5taWRYXG5cdFxuXHQjIEludGVyYWN0aW9uc1xuXHRzbGlkZXJVbml0Lm9uIFwiY2hhbmdlOmN1cnJlbnRQYWdlXCIsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0IyBTZWxlY3QgY3VycmVudCBkb3Rcblx0XHRjdXJyZW50ID0gbGF5ZXIuaG9yaXpvbnRhbFBhZ2VJbmRleChsYXllci5jdXJyZW50UGFnZSlcblx0XHQjIFN0eWxlIGRvdHNcblx0XHRkZWZhdWx0RG90cyhkb3RzQXJyYXlbY3VycmVudF0uY29sb3VyKVxuXHRcdCMgSGlnaGxpZ2h0IGN1cnJlbnQgZG90XG5cdFx0ZG90c0FycmF5W2N1cnJlbnRdLmRvdC5vcGFjaXR5ID0gMSIsIiPwn5qm4pqZ77iPICBIZWxwZXIgRnVuY3Rpb24gLSBwb3NpdGlvbkFmdGVyXG5cbndpbmRvdy5wb3NpdGlvbkFmdGVyID0gKGFmdGVyLCBmcmFtZSwgb2Zmc2V0PTApIC0+XG5cdGZyYW1lLnBhcmVudCA9IGFmdGVyLnBhcmVudFxuXHRmcmFtZS55ID0gYWZ0ZXIubWF4WSArIG9mZnNldFxuXG5cblxuIiwiI/CfmqbimpnvuI8gIEhlbHBlciBGdW5jdGlvbiAtIGFkZENoaWxkcmVuXG4jIEZ1bmN0aW9uIGhlbHBzIHRvIGFkZCBtdWx0aXBsZSBsYXllcnMgdG8gdGhlIG9uZSBwYXJlbnRcblxud2luZG93LmFkZENoaWxkcmVuID0gKHBhcmVudCwgY2hpbGRyZW5BcnJheSkgLT5cblx0Zm9yIGNoaWxkcmVuLCBpIGluIGNoaWxkcmVuQXJyYXlcblx0XHRjaGlsZHJlbi5wYXJlbnQgPSBwYXJlbnQiLCIjIEJhc2VkIG9uIGlPU1N3aXRjaCBieSBGYWNlYm9va1xuXG5FdmVudHMuU3dpdGNoVmFsdWVDaGFuZ2UgPSBcInN3aXRjaFZhbHVlQ2hhbmdlXCJcbmNsYXNzIHdpbmRvdy5pT1NTd2l0Y2ggZXh0ZW5kcyBMYXllclxuXHQjIEZyYW1lXG5cdHRvZ2dsZV9mcmFtZSA9IGxpc3RfaXRlbV90b2dnbGUuc2VsZWN0Q2hpbGQoXCJ0b2dnbGVcIilcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHQ9e30pIC0+XG5cdFx0QG9wdCA9IF8uZGVmYXVsdHMge30sIEBvcHQsXHRcdFx0XG5cdFx0XHR3aWR0aDogdG9nZ2xlX2ZyYW1lLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHRvZ2dsZV9mcmFtZS5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKFwidHJhbnNwYXJlbnRcIilcblx0XHRcdGlzT246IGZhbHNlXG5cdFx0c3VwZXIgQG9wdFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0QGJhc2UgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmJhc2VcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjZTZlNmU2XCIgIyBEaXNhYmxlZCBTdGF0ZVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxNlxuXG5cdFx0QGJhc2Uuc3RhdGVzLm9uID1cblx0XHRcdGJvcmRlcldpZHRoOiAwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiIzIyMjIyMlwiICMgRW5hYmxlZCBTdGF0ZVxuXG5cdFx0QGJhc2UuYW5pbWF0aW9uT3B0aW9ucyA9XG5cdFx0XHR0aW1lOiAwLjZcblx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMC43NSlcblxuXHRcdEB0aHVtYiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIudGh1bWJcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogMjcsIGhlaWdodDogMjdcblx0XHRcdGJvcmRlclJhZGl1czogMTQuNVxuXHRcdFx0eDogMlxuXHRcdFx0eTogMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblxuXHRcdEB0aHVtYi5zdGF0ZXMub24gPVxuXHRcdFx0eDogMjNcblx0XHRAdGh1bWIuYW5pbWF0aW9uT3B0aW9ucyA9XG5cdFx0XHR0aW1lOiAwLjZcblx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMC44KVxuXG5cdFx0QHRodW1iRmlsbCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJ0aHVtYkZpbGxcIlxuXHRcdFx0cGFyZW50OiBAdGh1bWJcblx0XHRcdHg6IDAuNVxuXHRcdFx0eTogMC41XG5cdFx0XHR3aWR0aDogMjcsIGhlaWdodDogMjdcblx0XHRcdGJvcmRlclJhZGl1czogMTRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQHRodW1iVGludENvbG9yXG5cdFx0XHRzaGFkb3cxOlxuXHRcdFx0XHR5OiAzXG5cdFx0XHRcdGJsdXI6IDhcblx0XHRcdFx0Y29sb3I6IFwicmdiYSgwLDAsMCwwLjE1KVwiXG5cdFx0XHQjIHNoYWRvdzI6XG5cdFx0XHQjIFx0eTogMVxuXHRcdFx0IyBcdGJsdXI6IDFcblx0XHRcdCMgXHRjb2xvcjogXCJyZ2JhKDAsMCwwLDAuMTYpXCJcblx0XHRcdCMgc2hhZG93Mzpcblx0XHRcdCMgXHR5OiAzXG5cdFx0XHQjIFx0Ymx1cjogMVxuXHRcdFx0IyBcdGNvbG9yOiBcInJnYmEoMCwwLDAsMC4xMClcIlxuXG5cdFx0aWYgQGlzT25cblx0XHRcdEBiYXNlLnN0YXRlU3dpdGNoIFwib25cIlxuXHRcdFx0QHRodW1iLnN0YXRlU3dpdGNoIFwib25cIlxuXG5cblxuXHRcdEBvbkNsaWNrIC0+XG5cdFx0XHRAc2V0T24gIUBpc09uLCB0cnVlXG5cblxuXHRAZGVmaW5lIFwidGludENvbG9yXCIsXG5cdFx0Z2V0OiAtPiBAX3RpbnRDb2xvclxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF90aW50Q29sb3IgPSB2YWx1ZVxuXHRcdFx0QF91cGRhdGVUaW50Q29sb3IoKVxuXHRAZGVmaW5lIFwidGh1bWJUaW50Q29sb3JcIixcblx0XHRnZXQ6IC0+IEBfdGh1bWJUaW50Q29sb3Jcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfdGh1bWJUaW50Q29sb3IgPSB2YWx1ZVxuXHRcdFx0QF91cGRhdGVUaHVtYigpXG5cblx0QGRlZmluZSBcImlzT25cIixcblx0XHRnZXQ6IC0+IEBfaXNPblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF9pc09uID0gdmFsdWVcblxuXHRzZXRPbjogKHN3aXRjaE9uLCBhbmltYXRlZCkgLT5cblx0XHRAaXNPbiA9IHN3aXRjaE9uXG5cdFx0YW5pbWF0ZWQgPSBhbmltYXRlZCA/IHRydWVcblxuXHRcdGlmIEBpc09uXG5cdFx0XHRpZiBhbmltYXRlZFxuXHRcdFx0XHRAYmFzZS5hbmltYXRlIFwib25cIlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSBcIm9uXCJcblx0XHRcdGVsc2Vcblx0XHRcdFx0QGJhc2Uuc3RhdGVTd2l0Y2ggXCJvblwiXG5cdFx0XHRcdEB0aHVtYi5zdGF0ZVN3aXRjaCBcIm9uXCJcblx0XHRlbHNlXG5cdFx0XHRpZiBhbmltYXRlZFxuXHRcdFx0XHRAYmFzZS5hbmltYXRlIFwiZGVmYXVsdFwiXG5cdFx0XHRcdEB0aHVtYi5hbmltYXRlIFwiZGVmYXVsdFwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBiYXNlLnN0YXRlU3dpdGNoIFwiZGVmYXVsdFwiXG5cdFx0XHRcdEB0aHVtYi5zdGF0ZVN3aXRjaCBcImRlZmF1bHRcIlxuXG5cdFx0QGVtaXQgRXZlbnRzLlN3aXRjaFZhbHVlQ2hhbmdlLCBAaXNPblxuXG5cblx0X3VwZGF0ZVRpbnRDb2xvcjogLT5cblx0XHRpZiBAYmFzZVxuI1x0XHRcdEBiYXNlLnN0YXRlcy5vbi5zaGFkb3dDb2xvciA9IEB0aW50Q29sb3JcbiNcdFx0XHRAYmFzZS5zdGF0ZXMub24uc2hhZG93Q29sb3IgPSBAdGludENvbG9yXG5cdFx0XHRAYmFzZS5zdGF0ZVN3aXRjaCBcIm9uXCIgaWYgQGlzT25cblxuXHQjIF91cGRhdGVUaHVtYjogLT5cblx0IyBcdGlmIEB0aHVtYkZpbGwgdGhlbiBAdGh1bWJGaWxsLmJhY2tncm91bmRDb2xvciA9IEB0aHVtYlRpbnRDb2xvclxuXG5cdG9uVmFsdWVDaGFuZ2U6IChjYikgLT4gQG9uKEV2ZW50cy5Td2l0Y2hWYWx1ZUNoYW5nZSwgY2IpIiwiIyMjIyMjIyMjIyMjIyMgVVNBR0UgIyMjIyMjIyMjIyMjIyNcbiMgdGFicyA9IG5ldyBUYWJzXG4jIFx0YWZ0ZXI6IHN0YXR1c0JhclxuIyBcdGl0ZW1zOiBbXCJvbmVcIiwgXCJ0d29cIiwgXCJ0aHJlZVwiLCBcImZvdXJcIl1cblxuIyB0YWJzLm9uZS5vblRhcCAtPlxuIyBcdHByaW50ICdzZGYnXG5cblxuIyMjIyMjIyMjIyMjIyMgVEFCUyAjIyMjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5UYWJzIGV4dGVuZHMgTGF5ZXJcblx0Y21wX2NvbXAgPSB0YWJzX2ZyYW1lXG5cdGl0ZW1zQXJyID0gW11cblx0XG5cdGZvciBpdGVtLCBpIGluIGNtcF9jb21wLnNlbGVjdENoaWxkKFwiaXRlbXNcIikuY2hpbGRyZW5cblx0XHRpdGVtc0Fyci5wdXNoKGl0ZW0ubmFtZSlcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGNtcF9jb21wLmhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRcdGl0ZW1zOiBpdGVtc0FyclxuXG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHRcdFxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEApXG5cdFx0XG5cdFx0IyBWYXJzXG5cdFx0Y2hpbGRyZW5MZW5ndGggPSBAb3B0Lml0ZW1zLmxlbmd0aFxuXHRcdGJ0bnNBcnIgPSBbXVxuXHRcdEB1bmRlcmxpbmUgPSBjbXBfY29tcC5zZWxlY3RDaGlsZChcInVuZGVybGluZVwiKS5jb3B5KClcblx0XHRwYXJlbnQgPSBAXG5cdFx0XG5cdFx0IyBDcmVhdGUgYnV0dG9uc1xuXHRcdEBuZXdJdGVtc0FyciA9IFtdXG5cdFx0XG5cdFx0Zm9yIGl0ZW0sIGkgaW4gQG9wdC5pdGVtc1xuXHRcdFx0bmV3SXRlbU5hbWUgPSBpdGVtLnNwbGl0KCcgJykuam9pbignXycpXG5cdFx0XHRAW1wiI3tuZXdJdGVtTmFtZX1cIl0gPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogaXRlbVxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0d2lkdGg6IGNtcF9jb21wLndpZHRoL0BvcHQuaXRlbXMubGVuZ3RoXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XHR4OiBuZXdYcG9zXG5cdFx0XHRcdGhlaWdodDogQGhlaWdodFxuXHRcdFx0XG5cdFx0XHRAW1wiI3tuZXdJdGVtTmFtZX1cIl1bXCJ0ZXh0XCJdID0gbmV3IFRleHRMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEBbXCIje25ld0l0ZW1OYW1lfVwiXVxuXG5cdFx0XHRAW1wiI3tuZXdJdGVtTmFtZX1cIl1bXCJ0ZXh0XCJdLnByb3BzID0gY21wX2NvbXAuc2VsZWN0Q2hpbGQoXCJpdGVtc1wiKS5jaGlsZHJlblswXS5wcm9wc1xuXHRcdFx0QFtcIiN7bmV3SXRlbU5hbWV9XCJdW1widGV4dFwiXS5wcm9wcyA9IFxuXHRcdFx0XHRuYW1lOiBcInRleHRcIlxuXHRcdFx0XHR0ZXh0VHJhbnNmb3JtOiBcInVwcGVyY2FzZVwiXG5cdFx0XHRcdHRleHQ6IGl0ZW1cblx0XHRcdEBbXCIje25ld0l0ZW1OYW1lfVwiXVtcInRleHRcIl0ueCA9IEFsaWduLmNlbnRlclxuXHRcdFx0XG5cdFx0XHRuZXdYcG9zID0gQFtcIiN7bmV3SXRlbU5hbWV9XCJdLm1heFhcblx0XHRcdFxuXHRcdFx0QG5ld0l0ZW1zQXJyLnB1c2goQFtcIiN7bmV3SXRlbU5hbWV9XCJdKVxuXHRcdFx0XG5cdFx0IyBVbmRlcmxpbmUgaW5pdGlhbCBzdGF0ZVxuXHRcdEB1bmRlcmxpbmUucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBAbmV3SXRlbXNBcnJbMF0uY2hpbGRyZW5bMF0ueFxuXHRcdFx0d2lkdGg6IEBuZXdJdGVtc0FyclswXS5jaGlsZHJlblswXS53aWR0aFxuXHRcdFxuXHRcdEBjdXJyZW50SXRlbSA9IEBuZXdJdGVtc0FyclswXS5jaGlsZHJlblswXS50ZXh0XG5cblx0XHQjIGNyZWF0ZSB1bmRlcmxpbmUgYW5pbWF0aW9uXG5cdFx0Zm9yIGl0ZW0sIGkgaW4gQG5ld0l0ZW1zQXJyXG5cdFx0XHRAbmV3SXRlbXNBcnJbaV0ub25UYXAgLT5cblx0XHRcdFx0cGFyZW50LmN1cnJlbnRJdGVtID0gQGNoaWxkcmVuWzBdLnRleHRcblx0XHRcdFx0cGFyZW50LnVuZGVybGluZS5hbmltYXRlXG5cdFx0XHRcdFx0bWlkWDogQG1pZFhcblx0XHRcdFx0XHR3aWR0aDogQGNoaWxkcmVuWzBdLndpZHRoXG5cdFx0XHRcdFx0b3B0aW9uczogXG5cdFx0XHRcdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDAuOClcblx0XHRcdFx0XHRcdHRpbWU6IDAuNFxuIiwiIyMjIyMjIyMjIyMgVEFCIEJBUiAjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5UYWJiYXIgZXh0ZW5kcyBMYXllclxuXG5cdCMgQ2hlY2sgaWYgaVBob25lWCBtb2RlIGlzIG9uIFxuXHRpZiBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgaXMgXCJhcHBsZS1pcGhvbmUteC1zcGFjZS1ncmF5XCJcblx0XHRjbXAgPSB0YWJfYmFyX3hcblx0ZWxzZVxuXHRcdGNtcCA9IHRhYl9iYXJcblxuXHRkZWZhdWx0T3BhY2l0eSA9IGNtcC5jaGlsZHJlblsyXS5vcGFjaXR5XG5cblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cblx0XHRAdGFiYmFyX2l0ZW0gPSBjbXAuY29weSgpXG5cdFx0QHRhYmJhcl9pdGVtLnByb3BzID1cblx0XHRcdHg6IDBcblx0XHRcdHk6IDBcblx0XHRcblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHRoZWlnaHQ6IGNtcC5oZWlnaHRcblx0XHRcdHdpZHRoOiBjbXAud2lkdGhcblx0XHRcdHk6IEFsaWduLmJvdHRvbVxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0QHRhYmJhcl9pdGVtLnBhcmVudCA9IEBcblxuXHRcdCMgSW50ZXJhY3Rpb25cblx0XHRmb3IgY2hpbGQsIGkgaW4gQHRhYmJhcl9pdGVtLmNoaWxkcmVuXG5cdFx0XHRjaGlsZC5vblRhcCAtPlxuXHRcdFx0XHRmb3IgaiBpbiBAcGFyZW50LmNoaWxkcmVuXG5cdFx0XHRcdFx0ai5vcGFjaXR5ID0gZGVmYXVsdE9wYWNpdHlcblx0XHRcdFx0QGFuaW1hdGVcblx0XHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdGN1cnZlOiBcImVhc2Utb3V0XCJcblx0XHRcdFx0XHRcdHRpbWU6IDAuMlxuXG5cdFxuXHRAZGVmaW5lIFwiYWN0aXZlSXRlbVwiLFxuXHRcdGdldDogLT4gQG9wdC5hY3RpdmVJdGVtXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRmb3IgY2hpbGQsIGkgaW4gQHRhYmJhcl9pdGVtLmNoaWxkcmVuXG5cdFx0XHRcdGNoaWxkLm9wYWNpdHkgPSBAdGFiYmFyX2l0ZW0uY2hpbGRyZW5bMl0ub3BhY2l0eVxuXHRcdFx0QG9wdC5hY3RpdmVJdGVtID0gdmFsdWVcblx0XHRcdEB0YWJiYXJfaXRlbS5zZWxlY3RDaGlsZCh2YWx1ZSkub3BhY2l0eSA9IDEiLCJzdGF0dXNiYXIgPSBuZXcgU3RhdHVzQmFyXG5cbiAgI0RlZmluZSBzdGF0dXNiYXIgc3R5bGVcbiAgIyBcImxpZ2h0XCIgLyBcImRhcmtcIlxuICBzdHlsZTogXCJsaWdodFwiXG5cbiAgI1NlbGVjdCBiYWNrZ3JvdW5kIGNvbG9yLiBEZWZhdWx0IGlzIHRyYW5zcGFyZW50LlxuICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwuNSlcIlxuXG4gICNGb3JjZSBkZXZpY2Ugc3RhdHVzYmFyXG4gICMgXCJjbGFzc2ljLWlwaG9uZVwiIC8gXCJpcGhvbmUteFwiIFwiYW5kcm9pZFwiXG4gIGRldmljZTogXCJjbGFzc2ljLWlwaG9uZVwiXG4iLCIjIERldmljZSBkZXRlY3Rpb25cblxuaGVpZ2h0VmFsdWUgPSAwXG5cbmdldE1vYmlsZU9wZXJhdGluZ1N5c3RlbSA9ICgpIC0+XG5cdHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmFcblx0aWYgVXRpbHMuaXNNb2JpbGUoKVxuXHRcdGlmICgvaVBhZHxpUGhvbmV8aVBvZC8udGVzdCh1c2VyQWdlbnQpICYmICF3aW5kb3cuTVNTdHJlYW0pXG5cdFx0XHRyZXR1cm4gXCJpT1NcIlxuXHRcdGlmICgvYW5kcm9pZC9pLnRlc3QodXNlckFnZW50KSkgfHwgKEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZS5zZWFyY2goXCJnb29nbGVcIikgPj0gMClcblx0XHRcdHJldHVybiBcIkFuZHJvaWRcIlxuXHRcdHJldHVybiBcInVua25vd25cIlxuXHRlbHNlXG5cdFx0aWYgKEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZS5zZWFyY2goXCJhcHBsZS1pcGhvbmVcIikgPj0gMCkgfHwgKEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZS5zZWFyY2goXCJhcHBsZS1pcGFkXCIpID49IDApXG5cdFx0XHRyZXR1cm4gXCJpT1NcIlxuXHRcdGlmIChGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUuc2VhcmNoKFwiZ29vZ2xlXCIpID49IDApIHx8IChGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUuc2VhcmNoKFwiaHRjXCIpID49IDApIHx8IChGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUuc2VhcmNoKFwic2Ftc3VuZ1wiKSA+PSAwKVxuXHRcdFx0cmV0dXJuIFwiQW5kcm9pZFwiXG5cdFx0cmV0dXJuIFwidW5rbm93blwiXG5cblxuXG5nZXRNb2JpbGVUeXBlID0gKCkgLT5cblx0c3dpdGNoIGdldE1vYmlsZU9wZXJhdGluZ1N5c3RlbSgpXG5cdFx0d2hlbiBcImlPU1wiXG5cdFx0XHRpZiBGcmFtZXIuRGV2aWNlLm9yaWVudGF0aW9uTmFtZSA9IFwicG9ydHJhaXRcIiAmJiBTY3JlZW4uaGVpZ2h0ID09IDgxMlxuXHRcdFx0XHRyZXR1cm4gXCJpcGhvbmUteFwiXG5cdFx0XHRpZiBGcmFtZXIuRGV2aWNlLm9yaWVudGF0aW9uTmFtZSA9IFwibGFuZHNjc2FwZVwiICYmIFNjcmVlbi53aWR0aCA9PSA4MTJcblx0XHRcdFx0cmV0dXJuIFwidW5rbm93blwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiBcImNsYXNzaWMtaXBob25lXCJcblx0XHR3aGVuIFwiQW5kcm9pZFwiIHRoZW4gcmV0dXJuIFwiYW5kcm9pZFwiXG5cdFx0d2hlbiBcInVua25vd25cIiB0aGVuIHJldHVybiBcInVua25vd25cIlxuXG4jU1ZHIHNoaXRcbmlvc1NpZ25hbFNWRyA9IFwiPHN2Zz48cGF0aCBkPSdNMSw1LjUgTDIsNS41IEMyLjU1MjI4NDc1LDUuNSAzLDUuOTQ3NzE1MjUgMyw2LjUgTDMsOSBDMyw5LjU1MjI4NDc1IDIuNTUyMjg0NzUsMTAgMiwxMCBMMSwxMCBDMC40NDc3MTUyNSwxMCA2Ljc2MzUzNzUxZS0xNyw5LjU1MjI4NDc1IDAsOSBMMCw2LjUgQy02Ljc2MzUzNzUxZS0xNyw1Ljk0NzcxNTI1IDAuNDQ3NzE1MjUsNS41IDEsNS41IFogTTUuNSw0IEw2LjUsNCBDNy4wNTIyODQ3NSw0IDcuNSw0LjQ0NzcxNTI1IDcuNSw1IEw3LjUsOSBDNy41LDkuNTUyMjg0NzUgNy4wNTIyODQ3NSwxMCA2LjUsMTAgTDUuNSwxMCBDNC45NDc3MTUyNSwxMCA0LjUsOS41NTIyODQ3NSA0LjUsOSBMNC41LDUgQzQuNSw0LjQ0NzcxNTI1IDQuOTQ3NzE1MjUsNCA1LjUsNCBaIE0xMCwyIEwxMSwyIEMxMS41NTIyODQ3LDIgMTIsMi40NDc3MTUyNSAxMiwzIEwxMiw5IEMxMiw5LjU1MjI4NDc1IDExLjU1MjI4NDcsMTAgMTEsMTAgTDEwLDEwIEM5LjQ0NzcxNTI1LDEwIDksOS41NTIyODQ3NSA5LDkgTDksMyBDOSwyLjQ0NzcxNTI1IDkuNDQ3NzE1MjUsMiAxMCwyIFogTTE0LjUsMCBMMTUuNSwwIEMxNi4wNTIyODQ3LC0xLjAxNDUzMDYzZS0xNiAxNi41LDAuNDQ3NzE1MjUgMTYuNSwxIEwxNi41LDkgQzE2LjUsOS41NTIyODQ3NSAxNi4wNTIyODQ3LDEwIDE1LjUsMTAgTDE0LjUsMTAgQzEzLjk0NzcxNTMsMTAgMTMuNSw5LjU1MjI4NDc1IDEzLjUsOSBMMTMuNSwxIEMxMy41LDAuNDQ3NzE1MjUgMTMuOTQ3NzE1MywxLjAxNDUzMDYzZS0xNiAxNC41LDAgWic+PC9wYXRoPjwvc3ZnPlwiXG5cbmlvc1dpZmlTVkcgPSBcIjxzdmc+PHBhdGggZD0nTTEuNzIyMjUwNThlLTExLDIuODI5NTYyNzYgQzEuODc2NjM4ODcsMS4wNzQ0MTI1NyA0LjM5Nzg1NTg3LDAgNy4xNzAwMDAwOCwwIEM5Ljk0MjE0NDI4LDAgMTIuNDYzMzYxMywxLjA3NDQxMjU3IDE0LjM0MDAwMDIsMi44Mjk1NjI3NiBMMTIuOTI0ODg3Niw0LjI0NDc2MTYyIEMxMS40MTA5OTc5LDIuODUxMDc5MTggOS4zODk4ODMwMywyIDcuMTcwMDAwMDgsMiBDNC45NTAxMTcxMywyIDIuOTI5MDAyMjUsMi44NTEwNzkxOCAxLjQxNTExMjU3LDQuMjQ0NzYxNjIgTDAsMi44Mjk1NjI3NiBaIE0yLjQ3NjgxNzA5LDUuMzA2NTMwODcgQzMuNzE4MzMzMDYsNC4xODM3NzM5OSA1LjM2NDMxOTQ1LDMuNSA3LjE3MDAwMDA4LDMuNSBDOC45NzU2ODA3LDMuNSAxMC42MjE2NjcxLDQuMTgzNzczOTkgMTEuODYzMTgzMSw1LjMwNjUzMDg3IEwxMC40NDY1Mzg3LDYuNzIzMjYxNTUgQzkuNTY5MDUyOTksNS45NjEyNDI3OCA4LjQyMzM4Nzc2LDUuNSA3LjE3MDAwMDA4LDUuNSBDNS45MTY2MTIzOSw1LjUgNC43NzA5NDcxNyw1Ljk2MTI0Mjc4IDMuODkzNDYxNCw2LjcyMzI2MTU1IEwyLjQ3NjgxNzA5LDUuMzA2NTMwODcgWiBNNC45NTc4NDM3OSw3Ljc4NzcwODg0IEM1LjU2MDc1MjIsNy4yOTUzMjM5MiA2LjMzMDg4OTk0LDcgNy4xNzAwMDAwOCw3IEM4LjAwOTExMDIxLDcgOC43NzkyNDc5NSw3LjI5NTMyMzkyIDkuMzgyMTU2MzYsNy43ODc3MDg4NCBMNy4xNzAwMDAwOCwxMCBMNC45NTc4NDM3OSw3Ljc4NzcwODg0IFonPjwvcGF0aD48L3N2Zz5cIlxuXG5pb3NCYXR0ZXJ5U1ZHID0gXCI8c3ZnPjxwYXRoIGQ9J00zLjIwNDg1NjUsMSBDMi4zMzk4MDA0MywxIDIuMDQ4ODcwMzQsMS4wNTYxODExOSAxLjc1MDU0MTczLDEuMjE1NzI5MDggQzEuNTE3NDAyOCwxLjM0MDQxMzE0IDEuMzQwNDEzMTQsMS41MTc0MDI4IDEuMjE1NzI5MDgsMS43NTA1NDE3MyBDMS4wNTYxODExOSwyLjA0ODg3MDM0IDEsMi4zMzk4MDA0MyAxLDMuMjA0ODU2NSBMMSw4LjI5NTE0MzUgQzEsOS4xNjAxOTk1NyAxLjA1NjE4MTE5LDkuNDUxMTI5NjYgMS4yMTU3MjkwOCw5Ljc0OTQ1ODI3IEMxLjM0MDQxMzE0LDkuOTgyNTk3MiAxLjUxNzQwMjgsMTAuMTU5NTg2OSAxLjc1MDU0MTczLDEwLjI4NDI3MDkgQzIuMDQ4ODcwMzQsMTAuNDQzODE4OCAyLjMzOTgwMDQzLDEwLjUgMy4yMDQ4NTY1LDEwLjUgTDIyLjA3MzgyMDIsMTAuNSBDMjIuNTg1MzM1MiwxMC41IDIzLDEwLjA4NTMzNTIgMjMsOS41NzM4MjAxNSBMMjMsMy4yMDQ4NTY1IEMyMywyLjMzOTgwMDQzIDIyLjk0MzgxODgsMi4wNDg4NzAzNCAyMi43ODQyNzA5LDEuNzUwNTQxNzMgQzIyLjY1OTU4NjksMS41MTc0MDI4IDIyLjQ4MjU5NzIsMS4zNDA0MTMxNCAyMi4yNDk0NTgzLDEuMjE1NzI5MDggQzIxLjk1MTEyOTcsMS4wNTYxODExOSAyMS42NjAxOTk2LDEgMjAuNzk1MTQzNSwxIEwzLjIwNDg1NjUsMSBaIE0zLjIwNDg1NjUsLTUuNzM1NjkyNDhlLTE2IEwyMC43OTUxNDM1LDEuMjk0ODAwMzhlLTE2IEMyMS45MDk1NDE5LC03LjUyMzE2MzExZS0xNyAyMi4zMTM2NDk3LDAuMTE2MDMyMDE0IDIyLjcyMTA1NzEsMC4zMzM5MTU4OCBDMjMuMTI4NDY0NSwwLjU1MTc5OTc0NiAyMy40NDgyMDAzLDAuODcxNTM1NDYzIDIzLjY2NjA4NDEsMS4yNzg5NDI4NyBDMjMuODgzOTY4LDEuNjg2MzUwMjggMjQsMi4wOTA0NTgwOCAyNCwzLjIwNDg1NjUgTDI0LDkuNTczODIwMTUgQzI0LDEwLjYzNzYxOTkgMjMuMTM3NjE5OSwxMS41IDIyLjA3MzgyMDIsMTEuNSBMMy4yMDQ4NTY1LDExLjUgQzIuMDkwNDU4MDgsMTEuNSAxLjY4NjM1MDI4LDExLjM4Mzk2OCAxLjI3ODk0Mjg3LDExLjE2NjA4NDEgQzAuODcxNTM1NDYzLDEwLjk0ODIwMDMgMC41NTE3OTk3NDYsMTAuNjI4NDY0NSAwLjMzMzkxNTg4LDEwLjIyMTA1NzEgQzAuMTE2MDMyMDE0LDkuODEzNjQ5NzIgNS4wMTU0NDIwN2UtMTcsOS40MDk1NDE5MiAtOC42MzIwMDI1NmUtMTcsOC4yOTUxNDM1IEw4LjYzMjAwMjU2ZS0xNywzLjIwNDg1NjUgQy01LjAxNTQ0MjA3ZS0xNywyLjA5MDQ1ODA4IDAuMTE2MDMyMDE0LDEuNjg2MzUwMjggMC4zMzM5MTU4OCwxLjI3ODk0Mjg3IEMwLjU1MTc5OTc0NiwwLjg3MTUzNTQ2MyAwLjg3MTUzNTQ2MywwLjU1MTc5OTc0NiAxLjI3ODk0Mjg3LDAuMzMzOTE1ODggQzEuNjg2MzUwMjgsMC4xMTYwMzIwMTQgMi4wOTA0NTgwOCwtMy42ODg1NzU3OWUtMTYgMy4yMDQ4NTY1LC01LjczNTY5MjQ4ZS0xNiBaJyBmaWxsLXJ1bGU9J25vbnplcm8nIG9wYWNpdHk9JzAuNCc+PC9wYXRoPjxwYXRoIGQ9J00yNSw0IEMyNS44NjI2MTM2LDQuMjIyMDIxNCAyNi41LDUuMDA1MDcxNTQgMjYuNSw1LjkzNjk5MTI2IEMyNi41LDYuODY4OTEwOTcgMjUuODYyNjEzNiw3LjY1MTk2MTEyIDI1LDcuODczOTgyNTEgTDI1LDQgWicgb3BhY2l0eT0nMC40Jz48L3BhdGg+PHJlY3QgeD0nMicgeT0nMicgd2lkdGg9JzIwJyBoZWlnaHQ9JzcuNScgcng9JzAuNSc+PC9yZWN0Pjwvc3ZnPlwiXG5cbmFuZHJvaWRCYXR0ZXJ5U1ZHID0gXCI8c3ZnPjxwb2x5Z29uIHBvaW50cz0nNiAwLjg3NSA2IDMuNzc0NzU4MjhlLTE1IDMgMS4xMTAyMjMwMmUtMTYgMyAwLjg3NSAwIDAuODc1IDAgMTQgOSAxNCA5IDAuODc1Jz48L3BvbHlnb24+PC9zdmc+XCJcblxuYW5kcm9pZFNpZ25hbFNWRyA9IFwiPHN2Zz48cG9seWdvbiBwb2ludHM9JzAgMTQgMTQgMTQgMTQgMCc+PC9wb2x5Z29uPjwvc3ZnPlwiXG5cbmFuZHJvaWRXaWZpU1ZHID0gXCI8c3ZnPjxwYXRoIGQ9J00tNC4wMjk5MzE5NGUtMTEsMy4wMTU5MzEyMyBDMi41MTA4NDcsMS4xMjI1NjM4MiA1LjYzNTY0MzA0LDAgOS4wMjI2Mjc5MSwwIEMxMi40MDk2MTI4LDAgMTUuNTM0NDA4OCwxLjEyMjU2MzgyIDE4LjA0NTI1NTgsMy4wMTU5MzEyMyBMOS4wMjI2Mjc5MSwxNCBMLTQuOTE2OTU1NzNlLTExLDMuMDE1OTMxMjMgWic+PC9wYXRoPjwvc3ZnPlwiXG5cblxuZ2V0QWxsQ2hpbGRyZW5PZkxheWVyID0gKGxheWVyLCBtZW0gPSBbXSkgLT5cblx0YWxsQ2hpbGRyZW4gPSBtZW1cblx0Zm9yIGNoaWxkIGluIGxheWVyLmNoaWxkcmVuXG5cdFx0aWYoY2hpbGQuY2hpbGRyZW4ubGVuZ3RoID09IDApXG5cdFx0XHRhbGxDaGlsZHJlbi5wdXNoKGNoaWxkKVxuXHRcdGVsc2Vcblx0XHRcdGFsbENoaWxkcmVuID0gYWxsQ2hpbGRyZW4uY29uY2F0KGNoaWxkKS5jb25jYXQoZ2V0QWxsQ2hpbGRyZW5PZkxheWVyKGNoaWxkKSlcblx0cmV0dXJuIGFsbENoaWxkcmVuXG5cbiNTdGF0dXMgQmFyIENsYXNzXG5jbGFzcyB3aW5kb3cuU3RhdHVzQmFyMiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yIDogKEBvcHRpb25zID0ge30pIC0+XG5cdFx0QG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IFwidHJhbnNwYXJlbnRcIlxuXHRcdEBvcHRpb25zLmhlaWdodCA/PSAwXG5cdFx0QG9wdGlvbnMuc3R5bGUgPz0gXCJkYXJrXCJcblx0XHRAb3B0aW9ucy5wYXJlbnQgPz0gbnVsbFxuXHRcdHN1cGVyKEBvcHRpb25zKVxuXHRcdCNMYXllcnNcblx0XHRAc3RhdHVzQmFyTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwic3RhdHVzQmFyTGF5ZXJcIlxuXHRcdFx0eTogMFxuXHRcdFx0bWlkWDogU2NyZWVuLm1pZFhcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQG9wdGlvbnMuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRwYXJlbnQ6IHRoaXNcblx0XHQjVXBkYXRlIGF0IGNyZWF0aW9uXG5cdFx0aWYgQG9wdGlvbnMuZGV2aWNlXG5cdFx0XHRAY2hhbmdlU3RhdHVzQmFyKEBvcHRpb25zLmRldmljZSlcblx0XHRlbHNlXG5cdFx0XHRAY2hhbmdlU3RhdHVzQmFyKGdldE1vYmlsZVR5cGUoKSlcblxuXHRjaGFuZ2VTdGF0dXNCYXIgOiAocGhvbmUpIC0+XG5cdFx0c3dpdGNoIHBob25lXG5cdFx0XHR3aGVuIFwiY2xhc3NpYy1pcGhvbmVcIiB0aGVuIHRoaXMuaVBob25lU3RhdHVzQmFyKClcblx0XHRcdHdoZW4gXCJpcGhvbmUteFwiIHRoZW4gdGhpcy5pUGhvbmVYU3RhdHVzYmFyKClcblx0XHRcdHdoZW4gXCJhbmRyb2lkXCIgdGhlbiB0aGlzLmFuZHJvaWRTdGF0dXNiYXIoKVxuXHRcdFx0d2hlbiBcInVua25vd25cIiB0aGVuIHRoaXMuZGVzdHJveVN0YXR1c2JhcigpXG5cdFx0cmV0dXJuIEBoZWlnaHQgPSBoZWlnaHRWYWx1ZVxuXG5cdGlQaG9uZVN0YXR1c0JhciA6ICgpIC0+XG5cdFx0aGVpZ2h0VmFsdWUgPSAyMFxuXHRcdEBzdGF0dXNCYXJMYXllci5wcm9wcyA9XG5cdFx0XHRoZWlnaHQgOiBoZWlnaHRWYWx1ZVxuXHRcdGhvdXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRuYW1lOiBcImhvdXJcIlxuXHRcdFx0cGFyZW50IDogQHN0YXR1c0JhckxheWVyXG5cdFx0XHR0ZXh0OiBcIjk6NDEgQU1cIlxuXHRcdFx0Zm9udFNpemU6IDEyXG5cdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdGZvbnRXZWlnaHQ6IDYwMFxuXHRcdFx0Zm9udEZhbWlseTogXCInLWFwcGxlLXN5c3RlbScsICdTRiBQcm8gVGV4dCcsIHNhbnMtc2VyaWZcIlxuXHRcdFx0eDogQWxpZ24uY2VudGVyXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblxuXHRcdGJhdHRlcnkgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWUgOiBcImJhdHRlcnlcIlxuXHRcdFx0cGFyZW50OiBAc3RhdHVzQmFyTGF5ZXJcblx0XHRcdHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRoZWlnaHQ6IEBzdGF0dXNCYXJMYXllci5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdGJhdHRlcnlJY29uID0gbmV3IFNWR0xheWVyXG5cdFx0XHRuYW1lIDogXCJiYXR0ZXJ5SWNvblwiXG5cdFx0XHRwYXJlbnQ6IGJhdHRlcnlcblx0XHRcdHN2ZzogaW9zQmF0dGVyeVNWR1xuXHRcdFx0ZmlsbDogXCJ3aGl0ZVwiXG5cdFx0XHR3aWR0aDogMjdcblx0XHRcdGhlaWdodDogMTJcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC03KVxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cblx0XHRiYXR0ZXJ5UGVyY2VudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6IFwiYmF0dGVyeVBlcmNlbnRcIlxuXHRcdFx0cGFyZW50IDogYmF0dGVyeVxuXHRcdFx0dGV4dDogXCIxMDAlXCJcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGZvbnRGYW1pbHk6IFwiJy1hcHBsZS1zeXN0ZW0nLCAnU0YgUHJvIFRleHQnLCBzYW5zLXNlcmlmXCJcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC1iYXR0ZXJ5SWNvbi53aWR0aCAtIDEwKVxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cblx0XHRzdGF0dXNJY29ucyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJzdGF0dXNJY29uc1wiXG5cdFx0XHRwYXJlbnQ6IEBzdGF0dXNCYXJMYXllclxuXHRcdFx0eDogQWxpZ24ubGVmdFxuXHRcdFx0aGVpZ2h0OiBAc3RhdHVzQmFyTGF5ZXIuaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdHNpZ25hbEljb24gPSBuZXcgU1ZHTGF5ZXJcblx0XHRcdG5hbWU6IFwic2lnbmFsSWNvblwiXG5cdFx0XHRwYXJlbnQ6IHN0YXR1c0ljb25zXG5cdFx0XHRzdmc6IGlvc1NpZ25hbFNWR1xuXHRcdFx0ZmlsbDogXCJ3aGl0ZVwiXG5cdFx0XHR3aWR0aDogMTdcblx0XHRcdGhlaWdodDogMTBcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0eDogN1xuXG5cdFx0d2lmaUljb24gPSBuZXcgU1ZHTGF5ZXJcblx0XHRcdG5hbWU6IFwid2lmaUljb25cIlxuXHRcdFx0cGFyZW50OiBzdGF0dXNJY29uc1xuXHRcdFx0c3ZnOiBpb3NXaWZpU1ZHXG5cdFx0XHRmaWxsOiBcIndoaXRlXCJcblx0XHRcdHdpZHRoOiAxNFxuXHRcdFx0aGVpZ2h0OiAxMFxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHR4OiBzaWduYWxJY29uLnggKyBzaWduYWxJY29uLndpZHRoICsgM1xuXG5cdFx0aWYgQG9wdGlvbnMuc3R5bGUgPT0gXCJsaWdodFwiXG5cdFx0XHRob3VyLmNvbG9yID0gXCJ3aGl0ZVwiXG5cdFx0XHRiYXR0ZXJ5SWNvbi5maWxsID0gXCJ3aGl0ZVwiXG5cdFx0XHRiYXR0ZXJ5UGVyY2VudC5jb2xvciA9IFwid2hpdGVcIlxuXHRcdFx0d2lmaUljb24uZmlsbCA9IFwid2hpdGVcIlxuXHRcdFx0c2lnbmFsSWNvbi5maWxsID0gXCJ3aGl0ZVwiXG5cdFx0ZWxzZVxuXHRcdFx0aG91ci5jb2xvciA9IFwiYmxhY2tcIlxuXHRcdFx0YmF0dGVyeUljb24uZmlsbCA9IFwiYmxhY2tcIlxuXHRcdFx0YmF0dGVyeVBlcmNlbnQuY29sb3IgPSBcImJsYWNrXCJcblx0XHRcdHdpZmlJY29uLmZpbGwgPSBcImJsYWNrXCJcblx0XHRcdHNpZ25hbEljb24uZmlsbCA9IFwiYmxhY2tcIlxuXG5cdGlQaG9uZVhTdGF0dXNiYXIgOiAoKSAtPlxuXHRcdGhlaWdodFZhbHVlID0gNDRcblxuXHRcdEBzdGF0dXNCYXJMYXllci5wcm9wcyA9XG5cdFx0XHR5OiAwXG5cdFx0XHRtaWRYOiBTY3JlZW4ubWlkWFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0aGVpZ2h0OiBoZWlnaHRWYWx1ZVxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0aG91ckZyYW1lID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImhvdXJGcmFtZVwiXG5cdFx0XHRwYXJlbnQ6IEBzdGF0dXNCYXJMYXllclxuXHRcdFx0aGVpZ2h0OiAxNlxuXHRcdFx0d2lkdGg6IDU0XG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDIxKVxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdGhvdXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRuYW1lOiBcImhvdXJcIlxuXHRcdFx0cGFyZW50IDogaG91ckZyYW1lXG5cdFx0XHR0ZXh0OiBcIjk6NDFcIlxuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAtMC4yOFxuXHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRmb250V2VpZ2h0OiA2MDBcblx0XHRcdGZvbnRGYW1pbHk6IFwiJy1hcHBsZS1zeXN0ZW0nLCAnU0YgUHJvIFRleHQnLCBzYW5zLXNlcmlmXCJcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cblx0XHRzdGF0dXNJY29ucyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJzdGF0dXNJY29uc1wiXG5cdFx0XHRwYXJlbnQ6IEBzdGF0dXNCYXJMYXllclxuXHRcdFx0eDogQWxpZ24ucmlnaHRcblx0XHRcdGhlaWdodDogQHN0YXR1c0JhckxheWVyLmhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRiYXR0ZXJ5SWNvbiA9IG5ldyBTVkdMYXllclxuXHRcdFx0bmFtZTogXCJiYXR0ZXJ5SWNvblwiXG5cdFx0XHRwYXJlbnQ6IHN0YXR1c0ljb25zXG5cdFx0XHRzdmc6IGlvc0JhdHRlcnlTVkdcblx0XHRcdGZpbGw6IFwid2hpdGVcIlxuXHRcdFx0d2lkdGg6IDI3XG5cdFx0XHRoZWlnaHQ6IDEyXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMTIpXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblxuXHRcdHdpZmlJY29uID0gbmV3IFNWR0xheWVyXG5cdFx0XHRuYW1lOiBcIndpZmlJY29uXCJcblx0XHRcdHBhcmVudDogc3RhdHVzSWNvbnNcblx0XHRcdHN2ZzogaW9zV2lmaVNWR1xuXHRcdFx0ZmlsbDogXCJ3aGl0ZVwiXG5cdFx0XHR3aWR0aDogMTVcblx0XHRcdGhlaWdodDogMTBcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC1iYXR0ZXJ5SWNvbi53aWR0aCAtIDEyIC0gNSlcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXG5cdFx0c2lnbmFsSWNvbiA9IG5ldyBTVkdMYXllclxuXHRcdFx0bmFtZTogXCJzaWduYWxJY29uXCJcblx0XHRcdHBhcmVudDogc3RhdHVzSWNvbnNcblx0XHRcdHN2ZzogaW9zU2lnbmFsU1ZHXG5cdFx0XHRmaWxsOiBcIndoaXRlXCJcblx0XHRcdHdpZHRoOiAxN1xuXHRcdFx0aGVpZ2h0OiAxMFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLWJhdHRlcnlJY29uLndpZHRoIC0gMTIgLSA1IC0gd2lmaUljb24ud2lkdGggLSA1KVxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cblx0XHRpZiBAb3B0aW9ucy5zdHlsZSA9PSBcImxpZ2h0XCJcblx0XHRcdGhvdXIuY29sb3IgPSBcIndoaXRlXCJcblx0XHRcdGJhdHRlcnlJY29uLmZpbGwgPSBcIndoaXRlXCJcblx0XHRcdHdpZmlJY29uLmZpbGwgPSBcIndoaXRlXCJcblx0XHRcdHNpZ25hbEljb24uZmlsbCA9IFwid2hpdGVcIlxuXHRcdGVsc2Vcblx0XHRcdGhvdXIuY29sb3IgPSBcImJsYWNrXCJcblx0XHRcdGJhdHRlcnlJY29uLmZpbGwgPSBcImJsYWNrXCJcblx0XHRcdHdpZmlJY29uLmZpbGwgPSBcImJsYWNrXCJcblx0XHRcdHNpZ25hbEljb24uZmlsbCA9IFwiYmxhY2tcIlxuXG5cdGFuZHJvaWRTdGF0dXNiYXIgOiAoKSAtPlxuXHRcdGhlaWdodFZhbHVlID0gMjRcblx0XHRAc3RhdHVzQmFyTGF5ZXIucHJvcHMgPVxuXHRcdFx0eTogMFxuXHRcdFx0bWlkWDogU2NyZWVuLm1pZFhcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogaGVpZ2h0VmFsdWVcblx0XHRcdHBhcmVudDogbnVsbFxuXG5cdFx0aG91ciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6IFwiaG91clwiXG5cdFx0XHRwYXJlbnQgOiBAc3RhdHVzQmFyTGF5ZXJcblx0XHRcdHRleHQ6IFwiMTI6MzBcIlxuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRmb250RmFtaWx5OiBcIlJvYm90b1wiXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtOClcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXG5cdFx0YmF0dGVyeUljb24gPSBuZXcgU1ZHTGF5ZXJcblx0XHRcdG5hbWU6IFwiYmF0dGVyeUljb25cIlxuXHRcdFx0cGFyZW50OiBAc3RhdHVzQmFyTGF5ZXJcblx0XHRcdHN2ZzogYW5kcm9pZEJhdHRlcnlTVkdcblx0XHRcdGZpbGw6IFwid2hpdGVcIlxuXHRcdFx0d2lkdGg6IDlcblx0XHRcdGhlaWdodDogMTRcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC1ob3VyLndpZHRoIC0gOCAtIDcpXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblxuXHRcdHNpZ25hbEljb24gPSBuZXcgU1ZHTGF5ZXJcblx0XHRcdG5hbWU6IFwic2lnbmFsSWNvblwiXG5cdFx0XHRwYXJlbnQ6IEBzdGF0dXNCYXJMYXllclxuXHRcdFx0c3ZnOiBhbmRyb2lkU2lnbmFsU1ZHXG5cdFx0XHRmaWxsOiBcIndoaXRlXCJcblx0XHRcdHdpZHRoOiAxNFxuXHRcdFx0aGVpZ2h0OiAxNFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLWhvdXIud2lkdGggLSA4IC0gYmF0dGVyeUljb24ud2lkdGggLSA3IC0gOSlcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXG5cdFx0d2lmaUljb24gPSBuZXcgU1ZHTGF5ZXJcblx0XHRcdG5hbWU6IFwid2lmaUljb25cIlxuXHRcdFx0cGFyZW50OiBAc3RhdHVzQmFyTGF5ZXJcblx0XHRcdHN2ZzogYW5kcm9pZFdpZmlTVkdcblx0XHRcdGZpbGw6IFwid2hpdGVcIlxuXHRcdFx0d2lkdGg6IDE4XG5cdFx0XHRoZWlnaHQ6IDE0XG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtaG91ci53aWR0aCAtIDggLSBiYXR0ZXJ5SWNvbi53aWR0aCAtIDcgLSA5IC0gc2lnbmFsSWNvbi53aWR0aCAtIDIpXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblxuXHRcdGlmIEBvcHRpb25zLnN0eWxlID09IFwibGlnaHRcIlxuXHRcdFx0aG91ci5jb2xvciA9IFwid2hpdGVcIlxuXHRcdFx0YmF0dGVyeUljb24uZmlsbCA9IFwid2hpdGVcIlxuXHRcdFx0d2lmaUljb24uZmlsbCA9IFwid2hpdGVcIlxuXHRcdFx0c2lnbmFsSWNvbi5maWxsID0gXCJ3aGl0ZVwiXG5cdFx0ZWxzZVxuXHRcdFx0aG91ci5jb2xvciA9IFwiYmxhY2tcIlxuXHRcdFx0YmF0dGVyeUljb24uZmlsbCA9IFwiYmxhY2tcIlxuXHRcdFx0d2lmaUljb24uZmlsbCA9IFwiYmxhY2tcIlxuXHRcdFx0c2lnbmFsSWNvbi5maWxsID0gXCJibGFja1wiXG5cblx0aGlkZSA6ICgpIC0+XG5cdFx0QHN0YXR1c0JhckxheWVyLmFuaW1hdGVcblx0XHRcdHk6IC1Ac3RhdHVzQmFyTGF5ZXIuaGVpZ2h0XG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuNFxuXHRcdFx0XHRjdXJ2ZTogQmV6aWVyLmVhc2Vcblx0c2hvdyA6ICgpIC0+XG5cdFx0QHN0YXR1c0JhckxheWVyLmFuaW1hdGVcblx0XHRcdHk6IDBcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC40XG5cdFx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZVxuXG5cdGRlc3Ryb3lMYXllcnNJblN0YXR1c0JhciA6ICgpIC0+XG5cdFx0Zm9yIGNoaWxkIGluIGdldEFsbENoaWxkcmVuT2ZMYXllcihAc3RhdHVzQmFyTGF5ZXIpXG5cdFx0XHRjaGlsZC5kZXN0cm95KClcblx0ZGVzdHJveVN0YXR1c2JhciA6ICgpIC0+XG5cdFx0QGRlc3Ryb3lMYXllcnNJblN0YXR1c0JhcigpXG5cdFx0QHN0YXR1c0JhckxheWVyLmRlc3Ryb3koKVxuIiwiIyMjIyMjIyMjIyMjIyMgU1RBVFVTIEJBUiAjIyMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LlN0YXR1c0JhciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdD17fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHR4OiAwLCB5OiAwXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGlmIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSBpcyBcImFwcGxlLWlwaG9uZS14LXNwYWNlLWdyYXlcIiB0aGVuIDQ0IGVsc2UgMjBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHR1cGRhdGVUaW1lOiBmYWxzZVxuXHRcdFx0c2lnbmFsSWNvbjogXCJzaWduYWxcIlxuXHRcdFx0d2lmaUljb246IFwid2lmaVwiXG5cdFx0XHRiYXR0ZXJ5SWNvbjogXCJiYXR0ZXJ5XCJcblx0XHRcdCMgQ2FwdHVyZSBjdXJyZW50IHRpbWUgaW50byB2YXJpYWJsZVxuXHRcdFx0Y3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0J30pXG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBALCBAb3B0LnkpXG5cblx0XHQjIFByZXBhcmUgc3R5bGVzXG5cdFx0QHN0eWxlID0gXG5cdFx0XHRcImZpbHRlclwiOiBcImludmVydCgwKVwiXG5cdFx0XHRcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcblx0XHRcdFwiei1pbmRleFwiOiA5OTk5OVxuXHRcdFxuXHRcdCMgQ2hlY2sgaWYgaVBob25lWCBtb2RlIGlzIG9uIFxuXHRcdGlmIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSBpcyBcImFwcGxlLWlwaG9uZS14LXNwYWNlLWdyYXlcIlxuXHRcdFx0QHRpbWUgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdG5hbWU6IFwidGltZVwiXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHRjb2xvcjogQG9wdC50aW1lQ29sb3Jcblx0XHRcdFx0dGV4dDogY3VycmVudFRpbWVcblx0XHRcdFx0Zm9udFdlaWdodDogNzAwXG5cdFx0XHRcdGZvbnRTaXplOiAxNVxuXHRcdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHRcdGNvbG9yOiBcImJsYWNrXCJcblx0XHRcdFx0eDogMjgsIHk6IDE2XG5cdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXG5cdFx0XHRAc2lnbmFsID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6IFwic2lnbmFsXCJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHdpZHRoOiAxNywgaGVpZ2h0OiAxMlxuXHRcdFx0XHR4OiBBbGlnbi5yaWdodCgtNjQpLCB5OiAxOFxuXHRcdFx0XHRpbWFnZTogXCJtb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvU3RhdHVzQmFyL2Fzc2V0cy8je0BvcHQuc2lnbmFsSWNvbn0uc3ZnXCJcblxuXHRcdFx0QHdpZmkgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogXCJ3aWZpXCJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHdpZHRoOiAxNSwgaGVpZ2h0OiAxMlxuXHRcdFx0XHR4OiBBbGlnbi5yaWdodCgtNDQpLCB5OiAxOFxuXHRcdFx0XHRpbWFnZTogXCJtb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvU3RhdHVzQmFyL2Fzc2V0cy8je0BvcHQud2lmaUljb259LnN2Z1wiXG5cblx0XHRcdEBiYXR0ZXJ5ID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6IFwiYmF0dGVyeVwiXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR3aWR0aDogMjUsIGhlaWdodDogMTJcblx0XHRcdFx0eDogQWxpZ24ucmlnaHQoLTE0KSwgeTogMThcblx0XHRcdFx0aW1hZ2U6IFwibW9kdWxlcy9GRktpdC9jb21wb25lbnRzL1N0YXR1c0Jhci9hc3NldHMvI3tAb3B0LmJhdHRlcnlJY29ufS5zdmdcIlxuXHRcdGVsc2Vcblx0XHRcdEBzaWduYWwgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogXCJzaWduYWxcIlxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0d2lkdGg6IDE1LCBoZWlnaHQ6IDlcblx0XHRcdFx0eDogNywgeTogNVxuXHRcdFx0XHRpbWFnZTogXCJtb2R1bGVzL0ZGS2l0L2NvbXBvbmVudHMvU3RhdHVzQmFyL2Fzc2V0cy8je0BvcHQuc2lnbmFsSWNvbn0uc3ZnXCJcblxuXHRcdFx0QHdpZmkgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogXCJ3aWZpXCJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHdpZHRoOiAxMywgaGVpZ2h0OiA5XG5cdFx0XHRcdHg6IDI4LCB5OiA1XG5cdFx0XHRcdGltYWdlOiBcIm1vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9TdGF0dXNCYXIvYXNzZXRzLyN7QG9wdC53aWZpSWNvbn0uc3ZnXCJcblxuXHRcdFx0QHRpbWUgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdG5hbWU6IFwidGltZVwiXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHRjb2xvcjogQG9wdC50aW1lQ29sb3Jcblx0XHRcdFx0dGV4dDogY3VycmVudFRpbWVcblx0XHRcdFx0Zm9udFdlaWdodDogNzAwXG5cdFx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHRcdGNvbG9yOiBcImJsYWNrXCJcblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiA0XG5cdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXG5cdFx0XHRAYmF0dGVyeSA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiBcImJhdHRlcnlcIlxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0d2lkdGg6IDI0LCBoZWlnaHQ6IDEwLjVcblx0XHRcdFx0eDogQWxpZ24ucmlnaHQoLTQpLCB5OiA1XG5cdFx0XHRcdGltYWdlOiBcIm1vZHVsZXMvRkZLaXQvY29tcG9uZW50cy9TdGF0dXNCYXIvYXNzZXRzLyN7QG9wdC5iYXR0ZXJ5SWNvbn0uc3ZnXCJcblx0XHRcdFx0XG5cdFx0XHRAYmF0dGVyeVBlcmNlbnRhZ2UgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdG5hbWU6IFwidGltZVwiXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHRjb2xvcjogQG9wdC50aW1lQ29sb3Jcblx0XHRcdFx0dGV4dDogXCIxMDAlXCJcblx0XHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0XHRsaW5lSGVpZ2h0OiAxXG5cdFx0XHRcdGNvbG9yOiBcImJsYWNrXCJcblx0XHRcdFx0eDogQWxpZ24ucmlnaHQoLTMyKSwgeTogNFxuXHRcdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdFxuXHRcdHVwZGF0ZVRpbWVGb28oQG9wdC51cGRhdGVUaW1lLCBAdGltZSlcblxuXHQjIFByaXZhdGUgbWV0aG9kIHdoaWNoIHdlIGNhbGwgYmFzZWQgb24gQG9wdC51cGRhdGVUaW1lIHByb3BlcnR5XG5cdHVwZGF0ZVRpbWVGb28gPSAodmFsLCB0aW1lTGF5ZXIpIC0+XG5cdFx0aWYgdmFsXG5cdFx0XHRVdGlscy5pbnRlcnZhbCAxLCAtPlxuXHRcdFx0XHR0aW1lTGF5ZXIudGV4dCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnfSlcblx0XG5cdCMgUHVibGljIG1ldGhvZCB0byBzd2l0Y2ggbW9kZXMgYnkgQ1NTIGZpbHRlcnNcblx0c3dpdGNoTW9kZTogKHRpbWUpIC0+XG5cdFx0dGltZSA/PSAwLjJcblx0XHRALnN0eWxlW1widHJhbnNpdGlvblwiXSA9IFwiYWxsIFwiICsgdGltZSArIFwic1wiXG5cdFx0aWYgQC5zdHlsZVtcImZpbHRlclwiXSBpcyBcImludmVydCgwKVwiXG5cdFx0XHRALnN0eWxlW1wiZmlsdGVyXCJdID0gXCJpbnZlcnQoMSlcIlxuXHRcdGVsc2Vcblx0XHRcdEAuc3R5bGVbXCJmaWx0ZXJcIl0gPSBcImludmVydCgwKVwiIiwiIyMjIyMjIyMjIyMjIyMgU0VMRUNUT1IgIyMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuU2VsZWN0b3IgZXh0ZW5kcyBMYXllclxuXHRjbXBfZnJhbWUgPSBzZWxlY3RvclxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdG5hbWU6IFwiU2VsZWN0b3JcIlxuXHRcdFx0d2lkdGg6IGNtcF9mcmFtZS53aWR0aCwgaGVpZ2h0OiBjbXBfZnJhbWUuaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNtcF9mcmFtZS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHBsYWNlaG9sZGVyVGV4dDogXCJQbGFjZWhvbGRlclwiXG5cdFx0XHR2YWx1ZTogZmFsc2VcblxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXHRcdFx0XHRcdFx0XG5cdFx0aWYgQG9wdC5sYWJlbFRleHRcblx0XHRcdEBsYWJlbFRleHQgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJzZWxlY3Rvcl9sYWJlbFwiKS5jb3B5KClcblx0XHRcdEBsYWJlbFRleHQucHJvcHMgPSBcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHRleHQ6IEBvcHQubGFiZWxUZXh0XG5cdFx0XHRcdGF1dG9IZWlnaHQ6IHRydWVcblxuXHRcdGlmIEBvcHQuaGVscGVyVGV4dFxuXHRcdFx0QGhlbHBlclRleHQgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJoZWxwZXJfdGV4dFwiKS5jb3B5KClcblx0XHRcdEBoZWxwZXJUZXh0LnByb3BzID0gXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR0ZXh0OiBAb3B0LmhlbHBlclRleHRcblx0XHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXG5cdFx0QHNlbGVjdG9yX2ZyYW1lID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiaW5wdXRcIikuY29weSgpXG5cdFx0QHNlbGVjdG9yX2ZyYW1lLnByb3BzID0gXG5cdFx0XHR3aWR0aDogQHdpZHRoIC0gTV9zcGFjZXIqMlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR5OiBpZiBAb3B0LmxhYmVsVGV4dCB0aGVuIGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcImlucHV0XCIpLnkgZWxzZSAwXG5cblx0XHRAc2VsZWN0Q2hpbGQoXCJwbGFjZWhvbGRlclwiKS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXG5cdFx0QHNlbGVjdG9yX2ZyYW1lLnNlbGVjdENoaWxkKFwiZHJvcGRhd25fYnRuXCIpLnggPSBBbGlnbi5yaWdodCgyKVxuXG5cdFx0QHNlbGVjdENoaWxkKFwicGxhY2Vob2xkZXJcIikudGV4dCA9IEBvcHQucGxhY2Vob2xkZXJUZXh0XG5cblx0XHRpZiBAb3B0LnZhbHVlXG5cdFx0XHRAc2VsZWN0Q2hpbGQoXCJwbGFjZWhvbGRlclwiKS5wcm9wcyA9XG5cdFx0XHRcdGNvbG9yOiBcIiMyMjIyMjJcIlxuXHRcdFx0XHR0ZXh0OiBAb3B0LnZhbHVlXG5cblx0XHRAaGVpZ2h0ID0gaWYgQG9wdC5oZWxwZXJUZXh0IHRoZW4gQGhlbHBlclRleHQubWF4WSArIE1fc3BhY2VyIGVsc2UgQHNlbGVjdG9yX2ZyYW1lLm1heFkgKyBNX3NwYWNlclxuXG5cblx0QGRlZmluZSBcInBsYWNlaG9sZGVyVGV4dFwiLFxuXHRcdGdldDogLT4gQG9wdC5wbGFjZWhvbGRlclRleHRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHQucGxhY2Vob2xkZXJUZXh0ID0gdmFsdWVcblx0XHRcdGlmICEhQGNoaWxkcmVuLmxlbmd0aFxuXHRcdFx0XHRAc2VsZWN0Q2hpbGQoXCJwbGFjZWhvbGRlclwiKS50ZXh0ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgXCJ2YWx1ZVwiLFxuXHRcdGdldDogLT4gQG9wdC52YWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdC52YWx1ZSA9IHZhbHVlXG5cdFx0XHRpZiAhIUBjaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0QHNlbGVjdENoaWxkKFwicGxhY2Vob2xkZXJcIikucHJvcHMgPVxuXHRcdFx0XHRcdGNvbG9yOiBcIiMyMjIyMjJcIlxuXHRcdFx0XHRcdHRleHQ6IHZhbHVlIiwiIyMjIyMjIyMjIyMjIyBQcm9wZXJ0aWVzICMjIyMjIyMjIyMjIyMjXG4jIHBsYWNlaG9sZGVyOiBcIllvdXIgdGV4dFwiXG5cbiMjIyMjIyMjIyMjIyMjIFNlYXJjaCBpbnB1dCAjIyMjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5TZWFyY2hJbnB1dCBleHRlbmRzIExheWVyXG5cdGNtcF9mcmFtZSA9IHNlYXJjaF9pbnB1dF9mcmFtZVxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogY21wX2ZyYW1lLmhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBjbXBfZnJhbWUuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRwbGFjZWhvbGRlcjogXCJTZWFyY2ggZm9yIHNvbWV0aGluZ1wiXG5cblx0XHRjbXBTaWRlUGFkZGluZ3MgPSBjbXBfZnJhbWUud2lkdGggLSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJpbnB1dFwiKS53aWR0aFxuXHRcblx0XHRAaW5wdXRXcmFwID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiaW5wdXRcIikuY29weSgpXG5cdFx0QGlucHV0V3JhcC5wcm9wcyA9XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBAd2lkdGggLSBjbXBTaWRlUGFkZGluZ3Ncblx0XHRAaW5wdXRXcmFwLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLmF1dG9IZWlnaHQgPSB0cnVlXG5cdFx0XG5cdFx0IyBDcmVhdGUgSFRNTCBpbnB1dFxuXHRcdEBpbnB1dEZyYW1lID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImlucHV0IHdyYXBcIlxuXHRcdFx0cGFyZW50OiBAaW5wdXRXcmFwXG5cdFx0XHR5OiBAaW5wdXRXcmFwLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLnlcblx0XHRcdHg6IEBpbnB1dFdyYXAuc2VsZWN0Q2hpbGQoXCJzZWFyY2hfcGxhY2Vob2xkZXJcIikueFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogQGlucHV0V3JhcC5zZWxlY3RDaGlsZChcInNlYXJjaF9wbGFjZWhvbGRlclwiKS53aWR0aFxuXHRcdFx0aGVpZ2h0OiBAaW5wdXRXcmFwLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLmhlaWdodFxuXHRcdFx0aHRtbDogXCJcIlwiPGlucHV0XG5cdFx0XHRcdGNsYXNzID0gJ3NlYXJjaC1pbnB1dC1jbXAnXG5cdFx0XHRcdHBsYWNlaG9sZGVyID0gJyN7QG9wdC5wbGFjZWhvbGRlcn0nPlxuXHRcdFx0PC9pbnB1dD5cIlwiXCJcblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRcInBvc2l0aW9uXCI6IFwicmVsYXRpdmVcIlxuXHRcdFxuXHRcdGNzcyA9IFwiXCJcIlxuXHRcdC5zZWFyY2gtaW5wdXQtY21wIHtcblx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdHRvcDogMDtcblx0XHRcdHdpZHRoOiAje0BpbnB1dFdyYXAuc2VsZWN0Q2hpbGQoXCJzZWFyY2hfcGxhY2Vob2xkZXJcIikud2lkdGh9cHg7XG5cdFx0XHRoZWlnaHQ6ICN7QGlucHV0V3JhcC5zZWxlY3RDaGlsZChcInNlYXJjaF9wbGFjZWhvbGRlclwiKS5oZWlnaHR9cHg7XG5cdFx0XHRmb250LXNpemU6IDE1cHg7XG5cdFx0XHRsaW5lLWhlaWdodDogMS41O1xuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdFx0XHRmb250LWZhbWlseTogXCJQb2xhcmlzLUJvb2tcIiwgXCJQb2xhcmlzXCIsIHNhbnMtc2VyaWYnO1xuXHRcdFx0dGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcblx0XHRcdC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuXHRcdH1cblx0XHQuc2VhcmNoLWlucHV0LWNtcDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XG5cdFx0XHRjb2xvcjogI3tAaW5wdXRXcmFwLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLmNvbG9yfTtcblx0XHR9XG5cdFx0OmZvY3VzIHtcblx0XHQgIG91dGxpbmU6IG5vbmU7XG5cdFx0fVxuXHRcdFwiXCJcIlxuXHRcdFV0aWxzLmluc2VydENTUyhjc3MpXG5cdFx0XHRcblx0XHRAaW5wdXRXcmFwLnNlbGVjdENoaWxkKFwic2VhcmNoX3BsYWNlaG9sZGVyXCIpLmRlc3Ryb3koKVxuXHRcdEBpbnB1dCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignI3NlYXJjaC1pbnB1dC1jbXAnKSIsIiMjIyMjIyMjIyMjIFJFRklORSBGSUxURVIgIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuUmVmaW5lRmlsdGVyIGV4dGVuZHMgTGF5ZXJcblxuXHRmb2xkZWRCdG5XaWR0aCA9IHJlZmluZV9idXR0b24uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX2ljb25cIikud2lkdGggKyAxNlx0XG5cdHNwYWNlQmV0d2Vlbml0ZW1zID0gcmVmaW5lX2ZpbHRlci5zZWxlY3RDaGlsZChcInJlZmluZV9maWx0ZXJfaXRlbV8yXCIpLnggLSByZWZpbmVfZmlsdGVyLnNlbGVjdENoaWxkKFwicmVmaW5lX2ZpbHRlcl9pdGVtXCIpLm1heFhcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHQpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0aGVpZ2h0OiByZWZpbmVfZmlsdGVyLmhlaWdodFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiByZWZpbmVfZmlsdGVyLmJhY2tncm91bmRDb2xvclxuXHRcdFx0aXRlbXNBcnJheTogW1wiaXRlbSAjMVwiLFwibG9uZyBpdGVtICMyXCIsXCJpdGVtICMzXCIsXCJpdGVtICM0XCIsIFwiaXRlbSAjNVwiXVxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVx0XG5cblx0XHRyZWZpbmVBbW91bnQgPSBudWxsID8gQG9wdC5yZWZpbmVBbW91bnRcblx0XHRAcmVmaW5lQnRuID0gcmVmaW5lQnRuID0gcmVmaW5lX2J1dHRvbi5jb3B5KClcblx0XHRAcmVmaW5lQnRuLnByb3BzID1cblx0XHRcdHBhcmVudDogQFxuXG5cdFx0QGJ0blRleHQgPSBAcmVmaW5lQnRuLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpXG5cdFx0QGJ0blRleHQucHJvcHMgPSBcblx0XHRcdHRleHQ6IHN3aXRjaCByZWZpbmVBbW91bnRcblx0XHRcdFx0d2hlbiBudWxsLCB1bmRlZmluZWRcblx0XHRcdFx0XHRcIlJlZmluZVwiIFxuXHRcdFx0XHRlbHNlIFxuXHRcdFx0XHRcdFwiUmVmaW5lICgje3JlZmluZUFtb3VudH0pXCJcblx0XHRcdGF1dG9TaXplOiB0cnVlXG5cdFx0XHRmb250RmFtaWx5OiBAYnRuVGV4dC5mb250RmFtaWx5XG5cdFx0XHR0ZXh0QWxpZ246IFwibGVmdFwiXG5cblx0XHR1cGRhdGVCdG5XaWR0aChAKVxuXHRcdFxuXHRcdCMgQ3JlYXRlIHNjcm9sbCBjb21wb25lbnRcblx0XHRAc2Nyb2xsQ21wID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBAcmVmaW5lQnRuLm1heFggKyAocmVmaW5lX2ZpbHRlci5zZWxlY3RDaGlsZChcInJlZmluZV9maWx0ZXJfaXRlbVwiKS54IC0gcmVmaW5lX2J1dHRvbi5tYXhYKVxuXHRcdFx0aGVpZ2h0OiBALmhlaWdodFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCAtIChmb2xkZWRCdG5XaWR0aCArIDIwKVxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IGZhbHNlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjIpXCJcblx0XHRcdGNvbnRlbnRJbnNldDpcblx0XHRcdFx0cmlnaHQ6IHNwYWNlQmV0d2Vlbml0ZW1zXG5cblx0XHQjIENyZWF0ZSBpdGVtcyBpbnNpZGUgU2Nyb2xsQ29tcG9uZW50XG5cdFx0Zm9yIGl0ZW1BcnJheSwgaSBpbiBAb3B0Lml0ZW1zQXJyYXlcblx0XHRcdEBpdGVtID0gbmV3IEJ1dHRvblxuXHRcdFx0XHRwYXJlbnQ6IEBzY3JvbGxDbXAuY29udGVudFxuXHRcdFx0XHRuYW1lOiBcIiN7aXRlbUFycmF5fVwiXG5cdFx0XHRcdHR5cGU6IFwidGFnXCJcblx0XHRcdFx0dGV4dDogQG9wdC5pdGVtc0FycmF5W2ldXG5cdFx0XHRcdHk6IHJlZmluZV9maWx0ZXIuc2VsZWN0Q2hpbGQoXCJyZWZpbmVfZmlsdGVyX2l0ZW1cIikueVxuXHRcdFx0XHR4OiBjdXJyZW50WFxuXHRcdFx0XG5cdFx0XHRjdXJyZW50WCA9IEBpdGVtLm1heFggKyBzcGFjZUJldHdlZW5pdGVtc1xuXHRcdFxuXHRcdGxhc3RBcnJheUNoaWxkID0gQHNjcm9sbENtcC5jb250ZW50LmNoaWxkcmVuW0BzY3JvbGxDbXAuY29udGVudC5jaGlsZHJlbi5sZW5ndGggLSAxXVxuXG5cdFx0IyBDaGVjayBpZiBsYXN0IGl0ZW0gaXMgb3V0IG9mIFNjcmVlblxuXHRcdGlmIGxhc3RBcnJheUNoaWxkLm1heFggPiBTY3JlZW4ud2lkdGhcblx0XHRcdEBzY3JvbGxDbXAuc2Nyb2xsSG9yaXpvbnRhbCA9IHRydWVcblxuXHRcdEBzY3JvbGxDbXAueCA9IG5ld1ggPSBAcmVmaW5lQnRuLm1heFggKyAocmVmaW5lX2ZpbHRlci5zZWxlY3RDaGlsZChcInJlZmluZV9maWx0ZXJfaXRlbVwiKS54IC0gcmVmaW5lX2J1dHRvbi5tYXhYKVxuXG5cdFx0IyBBbmltYXRpb24gb24gc2Nyb2xsXG5cdFx0QHNjcm9sbENtcC5zdGF0ZXMgPVxuXHRcdFx0c3RhdGVBOlxuXHRcdFx0XHR4OiBmb2xkZWRCdG5XaWR0aCArIDIwXG5cdFx0XHRcdHdpZHRoOiBAc2Nyb2xsQ21wLndpZHRoXG5cdFx0XHRzdGF0ZUI6XG5cdFx0XHRcdHg6IG5ld1hcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFxuXHRcdEByZWZpbmVCdG4uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIikuc3RhdGVzID1cblx0XHRcdHN0YXRlQTpcblx0XHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0c3RhdGVCOlxuXHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcblx0XHRAcmVmaW5lQnRuLnN0YXRlcyA9XG5cdFx0XHRzdGF0ZUE6XG5cdFx0XHRcdHdpZHRoOiBmb2xkZWRCdG5XaWR0aFxuXHRcdFx0c3RhdGVCOiBcblx0XHRcdFx0d2lkdGg6IEByZWZpbmVCdG4uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIikud2lkdGggKyByZWZpbmVfYnV0dG9uLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl9pY29uXCIpLndpZHRoICsgKHJlZmluZV9idXR0b24ud2lkdGggLSAocmVmaW5lX2J1dHRvbi5zZWxlY3RDaGlsZChcInJlZmluZV9idXR0b25faWNvblwiKS53aWR0aCArIHJlZmluZV9idXR0b24uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIikud2lkdGgpKVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4yXG5cblx0XHRAc2Nyb2xsQ21wLmNvbnRlbnQub24gXCJjaGFuZ2U6eFwiLCAtPlxuXHRcdFx0aWYgQHggPCAtMTAgYW5kIEBwYXJlbnQucGFyZW50LnJlZmluZUJ0bi5zZWxlY3RDaGlsZChcInJlZmluZV9idXR0b25fdGV4dFwiKS5vcGFjaXR5IGlzIDFcblx0XHRcdFx0QHBhcmVudC5wYXJlbnQucmVmaW5lQnRuLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpLmFuaW1hdGUoXCJzdGF0ZUFcIilcblx0XHRcdFx0QHBhcmVudC5wYXJlbnQucmVmaW5lQnRuLmFuaW1hdGUoXCJzdGF0ZUFcIilcblx0XHRcdFx0QHBhcmVudC5hbmltYXRlKFwic3RhdGVBXCIpXG5cdFx0XHRlbHNlIGlmIEB4ID4gLTEwIGFuZCBAcGFyZW50LnN0YXRlcy5jdXJyZW50Lm5hbWUgaXMgXCJzdGF0ZUFcIlxuXHRcdFx0XHRAcGFyZW50LnBhcmVudC5yZWZpbmVCdG4uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIikuYW5pbWF0ZShcInN0YXRlQlwiKVxuXHRcdFx0XHRAcGFyZW50LnBhcmVudC5yZWZpbmVCdG4uYW5pbWF0ZShcInN0YXRlQlwiKVxuXHRcdFx0XHRAcGFyZW50LmFuaW1hdGUoXCJzdGF0ZUJcIilcblxuXG5cdCMjIyMjIyMjIyMjIyMjIyMgTUVUSE9EUyAoKSAjIyMjIyMjIyMjIyMjIyNcblx0IyBQcml2YXRlIG1ldGhvZCB0byBnZXQgYSBuZXcgcmVmaW5lIGJ1dHRvbiB3aWR0aFxuXHR1cGRhdGVCdG5XaWR0aCA9IChwYXJlbnQpIC0+XG5cdFx0YnRuID0gcGFyZW50LnJlZmluZUJ0blxuXHRcdHRoaXNUZXh0ID0gYnRuLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpXG5cdFx0cmVmVGV4dCA9IHJlZmluZV9idXR0b24uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIilcblx0XHRyZWZJY29uID0gcmVmaW5lX2J1dHRvbi5zZWxlY3RDaGlsZChcInJlZmluZV9idXR0b25faWNvblwiKVxuXHRcdGJ0bi53aWR0aCA9IHRoaXNUZXh0LndpZHRoICsgcmVmSWNvbi53aWR0aCArIHJlZkljb24ueCArIChyZWZpbmVfYnV0dG9uLndpZHRoIC0gcmVmVGV4dC5tYXhYKSArIChyZWZUZXh0LnggLSByZWZJY29uLm1heFgpXG5cblx0IyBQdWJsaWMgbWV0aG9kIHRvIHVwZGF0ZSByZWZpbmUgYW1vdW50IFxuXHRzZWxlY3RlZDogKHZhbHVlKSAtPlxuXHRcdEBidG5UZXh0LnRleHQgPSBzd2l0Y2ggdmFsdWVcblx0XHRcdHdoZW4gbnVsbCwgdW5kZWZpbmVkLCAwXG5cdFx0XHRcdFwiUmVmaW5lXCJcblx0XHRcdGVsc2Vcblx0XHRcdFx0XCJSZWZpbmUgKCN7dmFsdWV9KVwiXG5cdFx0dXBkYXRlQnRuV2lkdGgoQClcblx0XHRuZXdXaWR0aCA9IEByZWZpbmVCdG4ud2lkdGhcblx0XHRAc2Nyb2xsQ21wLnggPSBuZXdYID0gQHJlZmluZUJ0bi5tYXhYICsgKHJlZmluZV9maWx0ZXIuc2VsZWN0Q2hpbGQoXCJyZWZpbmVfZmlsdGVyX2l0ZW1cIikueCAtIHJlZmluZV9idXR0b24ubWF4WClcblxuXHRcdCMgQW5pbWF0aW9uIG9uIHNjcm9sbFxuXHRcdEBzY3JvbGxDbXAuc3RhdGVzID1cblx0XHRcdHN0YXRlQTpcblx0XHRcdFx0eDogZm9sZGVkQnRuV2lkdGggKyAyMFxuXHRcdFx0XHR3aWR0aDogQHNjcm9sbENtcC53aWR0aFxuXHRcdFx0c3RhdGVCOlxuXHRcdFx0XHR4OiBuZXdYXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcblx0XHRAcmVmaW5lQnRuLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpLnN0YXRlcyA9XG5cdFx0XHRzdGF0ZUE6XG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHN0YXRlQjpcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4yXG5cdFx0XG5cdFx0QHJlZmluZUJ0bi5zdGF0ZXMgPVxuXHRcdFx0c3RhdGVBOlxuXHRcdFx0XHR3aWR0aDogZm9sZGVkQnRuV2lkdGhcblx0XHRcdHN0YXRlQjogXG5cdFx0XHRcdHdpZHRoOiBAcmVmaW5lQnRuLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpLndpZHRoICsgcmVmaW5lX2J1dHRvbi5zZWxlY3RDaGlsZChcInJlZmluZV9idXR0b25faWNvblwiKS53aWR0aCArIChyZWZpbmVfYnV0dG9uLndpZHRoIC0gKHJlZmluZV9idXR0b24uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX2ljb25cIikud2lkdGggKyByZWZpbmVfYnV0dG9uLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpLndpZHRoKSlcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IDAuMlxuXG5cdFx0QHNjcm9sbENtcC5jb250ZW50Lm9uIFwiY2hhbmdlOnhcIiwgLT5cblx0XHRcdGlmIEB4IDwgLTEwIGFuZCBAcGFyZW50LnBhcmVudC5yZWZpbmVCdG4uc2VsZWN0Q2hpbGQoXCJyZWZpbmVfYnV0dG9uX3RleHRcIikub3BhY2l0eSBpcyAxXG5cdFx0XHRcdEBwYXJlbnQucGFyZW50LnJlZmluZUJ0bi5zZWxlY3RDaGlsZChcInJlZmluZV9idXR0b25fdGV4dFwiKS5hbmltYXRlKFwic3RhdGVBXCIpXG5cdFx0XHRcdEBwYXJlbnQucGFyZW50LnJlZmluZUJ0bi5hbmltYXRlKFwic3RhdGVBXCIpXG5cdFx0XHRcdEBwYXJlbnQuYW5pbWF0ZShcInN0YXRlQVwiKVxuXHRcdFx0ZWxzZSBpZiBAeCA+IC0xMCBhbmQgQHBhcmVudC5zdGF0ZXMuY3VycmVudC5uYW1lIGlzIFwic3RhdGVBXCJcblx0XHRcdFx0QHBhcmVudC5wYXJlbnQucmVmaW5lQnRuLnNlbGVjdENoaWxkKFwicmVmaW5lX2J1dHRvbl90ZXh0XCIpLmFuaW1hdGUoXCJzdGF0ZUJcIilcblx0XHRcdFx0QHBhcmVudC5wYXJlbnQucmVmaW5lQnRuLmFuaW1hdGUoXCJzdGF0ZUJcIilcblx0XHRcdFx0QHBhcmVudC5hbmltYXRlKFwic3RhdGVCXCIpXG5cbiIsIntzZWxlY3RJbWFnZX0gPSByZXF1aXJlKCcuLi8uLi9oZWxwZXItZnVuY3Rpb25zL3ByaXZhdGUvc2VsZWN0SW1hZ2UuY29mZmVlJylcblxuIyMjIyMjIyMjIyMjIyMgUFJPRFVDVCBTTElERVIgQ09NUE9ORU5UICMjIyMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LlByb2R1Y3RTbGlkZXIgZXh0ZW5kcyBQYWdlQ29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogc3dpcGVfcHJvZHVjdF9jYXJkLmhlaWdodFxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IGZhbHNlXG5cdFx0XHRvcmlnaW5YOiAwLjVcblx0XHRcdGRpcmVjdGlvbkxvY2s6IHRydWUgIyBhdm9pZHMgc3dpcGUgd2hlblxuXHRcdFx0YXJyYXk6IGZhbHNlXG5cdFx0XHRwYWRkaW5nTGVmdDogZmFsc2Vcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXHRcdEBlbXB0eVNwYWNlID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImVtcHR5U3BhY2VcIlxuXHRcdFx0d2lkdGg6IEBvcHQucGFkZGluZ0xlZnRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdEBhZGRQYWdlKEBlbXB0eVNwYWNlKVxuXHRcdFxuXHRcdGlmIEBvcHQuYXJyYXlcblx0XHRcdGZvciBpIGluIFswLi4uQG9wdC5hcnJheS5sZW5ndGhdXG5cdFx0XHRcdCMgU2V0IG5ldyBwcm9kQ2FyZCBYIHBvc2l0aW9uXG5cdFx0XHRcdGN1cnJlbnRYID0gQGNvbnRlbnQuY2hpbGRyZW5baV0ubWF4WCArIFNfc3BhY2VyXG5cdFx0XHRcdCMgQ3JlYXRlIGNhcmRcblx0XHRcdFx0QHByb2RDYXJkID0gbmV3IFByb2R1Y3RDYXJkXG5cdFx0XHRcdFx0bmFtZTogXCJwcm9kdWN0IGNhcmRcIlxuXHRcdFx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcdFx0XHR4OiBjdXJyZW50WFxuXHRcdFx0XHRcdGJyYW5kVGV4dDogQG9wdC5hcnJheVtpXS5icmFuZC5uYW1lXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb25UZXh0OiBAb3B0LmFycmF5W2ldLnNob3J0RGVzY3JpcHRpb25cblx0XHRcdFx0XHRwcmljZVRleHQ6IEBvcHQuYXJyYXlbaV0ucHJpY2Vcblx0XHRcdFx0XHRjb3ZlcjogaWYgdXNlRXh0ZXJuYWxJbWFnZXMgdGhlbiB3aW5kb3cuc2VsZWN0SW1hZ2UoQG9wdC5hcnJheVtpXS5pbWFnZXMpIGVsc2UgVXRpbHMucmFuZG9tQ2hvaWNlKHdvbWVuUG9yb2R1Y3RzKVxuXHRcdFx0XHRcblx0XHRcdFx0IyBJbnRlcmFjdGlvblxuXHRcdFx0XHRAcHJvZENhcmQub25UYXAgLT5cblx0XHRcdFx0XHRwcmludCBcIlByb2R1Y3QgdGFwXCJcblx0XHRlbHNlXG5cdFx0XHRwcm9kQ2FyZCA9IG5ldyBQcm9kdWN0Q2FyZFxuXHRcdFx0XHRwYXJlbnQ6IEAuY29udGVudFxuXHRcdFx0XHR4OiBTX3NwYWNlciArIEBlbXB0eVNwYWNlLm1heFhcblx0XG5cdFx0XHQjIEludGVyYWN0aW9uXG5cdFx0XHRwcm9kQ2FyZC5vblRhcCAtPlxuXHRcdFx0XHRwcmludCBcIlByb2R1Y3QgdGFwXCJcblx0XHRcblx0XHQjIFNob3cgTW9yZSBjYXJkIC8gYnV0dG9uXG5cdFx0QHNob3dNb3JlQ2FyZCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJTaG93TW9yZdChYXJkXCJcblx0XHRcdHdpZHRoOiAxOThcblx0XHRcdGhlaWdodDogQGhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XG5cdFx0QGJ1dHRvblNob3dNb3JlID0gbmV3IEJ1dHRvblxuXHRcdFx0bmFtZTogXCJTaG93IG1vcmUgYnRuXCJcblx0XHRcdHRleHQ6IFwiU2hvdyBtb3JlXCJcblx0XHRcdHR5cGU6IFwiZmxhdFwiXG5cdFx0XHRpY29uOiBcImFycm93LXJpZ2h0XCJcblx0XHRcdGljb25BbGlnbjogXCJyaWdodFwiXG5cdFx0XHRwYXJlbnQ6IEBzaG93TW9yZUNhcmRcblx0XHRcdHdpZHRoOiAxMzRcblx0XHRcdG1pZFg6IEBzaG93TW9yZUNhcmQubWlkWFxuXHRcdFx0bWlkWTogQHNob3dNb3JlQ2FyZC5taWRZXG5cdFx0XG5cdFx0QGFkZFBhZ2UoQHNob3dNb3JlQ2FyZCkiLCIjIyMjIyMjIyMjIyBSRUZJTkUgRklMVEVSICMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LlByb2R1Y3RDYXJkIGV4dGVuZHMgTGF5ZXJcblx0IyBSZWZlcmVuY2VzIGZyb20gRGRlc2lnbiBtb2RlXG5cdHByb2R1Y3RDYXJkID0gc3dpcGVfcHJvZHVjdF9jYXJkXG5cdGJyYW5kVGV4dCA9IHByb2R1Y3RDYXJkLnNlbGVjdENoaWxkKFwiYnJhbmRcIilcblx0ZGVzY3JpcHRpb25UZXh0ID0gcHJvZHVjdENhcmQuc2VsZWN0Q2hpbGQoXCJzaG9ydF9kZXNjcmlwdGlvblwiKVxuXHRwcmljZVRleHQgPSBwcm9kdWN0Q2FyZC5zZWxlY3RDaGlsZChcInByaWNlXCIpXG5cdCMgU3BhY2VzXG5cdEJyYW5kRGVzY3JpcHRpb25TcGFzZSA9IGRlc2NyaXB0aW9uVGV4dC55IC0gYnJhbmRUZXh0Lm1heFlcblx0RGVzY3JpcHRpb25QcmljZVNwYXNlID0gcHJpY2VUZXh0LnkgLSBkZXNjcmlwdGlvblRleHQubWF4WVxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdG9wdCA9IF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHdpZHRoOiBwcm9kdWN0Q2FyZC53aWR0aFxuXHRcdFx0aGVpZ2h0OiBwcm9kdWN0Q2FyZC5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRjb3ZlcjogXCJtb2R1bGVzL0ZGS2l0L2NvbnRlbnQvZGVmYXVsdC9wcm9kdWN0cy93b21lbi8wMS5qcGdcIlxuXHRcdFx0YnJhbmRUZXh0OiBicmFuZFRleHQudGV4dFxuXHRcdFx0ZGVzY3JpcHRpb25UZXh0OiBkZXNjcmlwdGlvblRleHQudGV4dFxuXHRcdFx0cHJpY2VUZXh0OiBwcmljZVRleHQudGV4dFxuXHRcdHN1cGVyIG9wdFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXHRcdFx0XG5cdFx0IyBDb3ZlciBpbWFnZVxuXHRcdEBwcm9kQmFja2dyb3VkID0gcHJvZHVjdENhcmQuc2VsZWN0Q2hpbGQoXCJwcm9kX2JhY2tncm91bmRcIikuY29weSgpXG5cdFx0QHByb2RCYWNrZ3JvdWQucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRAcHJvZEJhY2tncm91ZC5zZWxlY3RDaGlsZChcImltYWdlXCIpLnByb3BzID1cblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRcIm1peC1ibGVuZC1tb2RlXCI6IFwibXVsdGlwbHlcIlxuXHRcdFx0aW1hZ2U6IEBvcHQuY292ZXJcblx0XHRcblx0XHQjIFdpc2hsaXN0IGljb25cblx0XHRAd2lzaGxpc3QgPSBwcm9kdWN0Q2FyZC5zZWxlY3RDaGlsZChcIndpc2hsaXN0LWljb1wiKS5jb3B5KClcblx0XHRAd2lzaGxpc3QucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XG5cdFx0IyBUZXh0XG5cdFx0QGJyYW5kID0gYnJhbmRUZXh0LmNvcHkoKVxuXHRcdEBicmFuZC5wcm9wcyA9XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdGZvbnRGYW1pbHk6IGJyYW5kVGV4dC5mb250RmFtaWx5XG5cdFx0XHRmb250V2VpZ2h0OiBicmFuZFRleHQuZm9udFdlaWdodFxuXHRcdFx0dGV4dDogQG9wdC5icmFuZFRleHRcblx0XHRcdHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCJcblx0XHRcdGZyYW1lOiBicmFuZFRleHQuZnJhbWVcblx0XHRcblx0XHRAc2hvcnRfZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblRleHQuY29weSgpXG5cdFx0QHNob3J0X2Rlc2NyaXB0aW9uLnByb3BzID1cblx0XHRcdGF1dG9IZWlnaHQ6IHRydWVcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0Zm9udFNpemU6IGRlc2NyaXB0aW9uVGV4dC5mb250U2l6ZSArIDFcblx0XHRcdGZvbnRGYW1pbHk6IGRlc2NyaXB0aW9uVGV4dC5mb250RmFtaWx5XG5cdFx0XHRmb250V2VpZ2h0OiBkZXNjcmlwdGlvblRleHQuZm9udFdlaWdodFxuXHRcdFx0dGV4dDogQG9wdC5kZXNjcmlwdGlvblRleHRcblx0XHRcdHk6IEBicmFuZC5tYXhZICsgQnJhbmREZXNjcmlwdGlvblNwYXNlXG5cdFx0XG5cdFx0QHByaWNlID0gcHJpY2VUZXh0LmNvcHkoKVxuXHRcdEBwcmljZS5wcm9wcyA9XG5cdFx0XHRhdXRvSGVpZ2h0OiB0cnVlXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdGZvbnRGYW1pbHk6IHByaWNlVGV4dC5mb250RmFtaWx5XG5cdFx0XHRmb250V2VpZ2h0OiBwcmljZVRleHQuZm9udFdlaWdodFxuXHRcdFx0dGV4dDogQG9wdC5wcmljZVRleHRcblx0XHRcdHk6IEBzaG9ydF9kZXNjcmlwdGlvbi5tYXhZICsgRGVzY3JpcHRpb25QcmljZVNwYXNlXG5cblx0XHQjIFJlc2V0IGZvbnQgc2l6ZVxuXHRcdEBzaG9ydF9kZXNjcmlwdGlvbi5mb250U2l6ZSA9IGRlc2NyaXB0aW9uVGV4dC5mb250U2l6ZVxuXG5cdCMjIyMjIyMjIyMjIyMjIyMg8J+SviBHRVRUSU5HIEFORCBTRVRUSU5HIENMQVNTIERBVEEgIyMjIyMjIyMjIyMjIyMjXG5cdEBkZWZpbmUgJ2NvdmVyJywgXG5cdFx0Z2V0OiAtPiBAb3B0LmNvdmVyXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRpZiAhIUBjaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0QHNlbGVjdENoaWxkKFwiaW1hZ2VcIikuaW1hZ2UgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ2JyYW5kVGV4dCcsIFxuXHRcdGdldDogLT4gQG9wdC5icmFuZFRleHRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdGlmICEhQGNoaWxkcmVuLmxlbmd0aFxuXHRcdFx0XHRAb3B0LmJyYW5kVGV4dCA9IHZhbHVlXG5cdFx0XHRcdEBicmFuZC50ZXh0ID0gdmFsdWVcblxuXHRAZGVmaW5lICdkZXNjcmlwdGlvblRleHQnLCBcblx0XHRnZXQ6IC0+IEBvcHQuZGVzY3JpcHRpb25UZXh0XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRpZiAhIUBjaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0QG9wdC5kZXNjcmlwdGlvblRleHQgPSB2YWx1ZVxuXHRcdFx0XHRAc2hvcnRfZGVzY3JpcHRpb24udGV4dCA9IHZhbHVlXG5cdFx0XHRcdEBwcmljZS55ID0gQHNob3J0X2Rlc2NyaXB0aW9uLm1heFkgKyBEZXNjcmlwdGlvblByaWNlU3Bhc2VcblxuXHRAZGVmaW5lICdwcmljZVRleHQnLCBcblx0XHRnZXQ6IC0+IEBvcHQucHJpY2VUZXh0XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRpZiAhIUBjaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0QG9wdC5wcmljZVRleHQgPSB2YWx1ZVxuXHRcdFx0XHRAcHJpY2UudGV4dCA9IHZhbHVlIiwiIyMjIyMjIyMjIyMgUE9TIEJBTk5FUiAjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5Qb3NCYW5uZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHRcblx0XHQjIENvbXBvbmVudCBmcmFtZSBmcm9tIERlc2lnbiBNb2RlXG5cdFx0Y29tcF9mcmFtZSA9IHBvc19iYW5uZXJcblx0XHRcblx0XHRAdGV4dF9mcmFtZSA9IGNvbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJ0ZXh0XCIpLmNvcHkoKVxuXG5cdFx0IyBJbml0aWFsaXNlIHRoZSBjbGFzc1xuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdGhlaWdodDogY29tcF9mcmFtZS5oZWlnaHRcblx0XHRcdHdpZHRoOiBjb21wX2ZyYW1lLndpZHRoXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbXBfZnJhbWUuYmFja2dyb3VuZENvbG9yXG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBALCBAb3B0LnkpXG5cdFx0XHRcblx0XHQjIFN0YWdpbmcgZnJhbWVzXG5cdFx0QHRleHRfZnJhbWUucGFyZW50ID0gQFxuXG5cdCMjIyMjIyMjIyMjIyMjIEdFVCwgU0VUIEFUUklCVVRFUyAjIyMjIyMjIyMjIyMjIyNcblxuXHRAZGVmaW5lIFwidGV4dFwiLFxuXHRcdGdldDogLT4gQG9wdC50ZXh0XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0LnRleHQgPSB2YWx1ZVxuXHRcdFx0QHRleHRfZnJhbWUudGV4dCA9IHZhbHVlIiwiIyMjIyMjIyMjIyMgTUUgLSBTSUdOIElOICMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93Lk1lU2lnbkluIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0XG5cdFx0IyBDb21wb25lbnQgZnJhbWUgZnJvbSBEZXNpZ24gTW9kZVxuXHRcdGNvbXBfZnJhbWUgPSBtZV9zaWduX2luXG5cdFx0XG5cdFx0QG1lU2lnbkluX2ZyYW1lID0gY29tcF9mcmFtZS5jb3B5KClcblx0XHRAbWVTaWduSW5fZnJhbWUucHJvcHMgPSBcblx0XHRcdHg6IDAsIHk6IDBcblx0XHRcdFxuXHRcdCMgSW5pdGlhbGlzZSB0aGUgY2xhc3Ncblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHRoZWlnaHQ6IGNvbXBfZnJhbWUuaGVpZ2h0XG5cdFx0XHR3aWR0aDogY29tcF9mcmFtZS53aWR0aFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXHRcdFx0XG5cdFx0IyBTdGFnaW5nIGZyYW1lc1xuXHRcdEBtZVNpZ25Jbl9mcmFtZS5wYXJlbnQgPSBAIiwiIyMjIyMjIyMjIyMgTUUgLSBTSUdOIElOICMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93Lk1lQ29udGFjdFVzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0XG5cdFx0IyBDb21wb25lbnQgZnJhbWUgZnJvbSBEZXNpZ24gTW9kZVxuXHRcdGNvbnRhY3RVc19mcmFtZSA9IGNvbnRhY3RfdXNcblx0XHRcblx0XHRAY29udGFjdFVzX2ZyYW1lID0gY29udGFjdFVzX2ZyYW1lLmNvcHkoKVxuXHRcdEBjb250YWN0VXNfZnJhbWUucHJvcHMgPSBcblx0XHRcdHg6IDAsIHk6IDBcblx0XHRcdFxuXHRcdCMgSW5pdGlhbGlzZSB0aGUgY2xhc3Ncblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHRoZWlnaHQ6IGNvbnRhY3RVc19mcmFtZS5oZWlnaHRcblx0XHRcdHdpZHRoOiBjb250YWN0VXNfZnJhbWUud2lkdGhcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXHRcdCMgU3RhZ2luZyBmcmFtZXNcblx0XHRAY29udGFjdFVzX2ZyYW1lLnBhcmVudCA9IEAiLCIjIyMjIyMjIyMjIyBMaXN0IFRpdGxlICMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93Lkxpc3RUaXRsZSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdFxuXHRcdCMgQ29tcG9uZW50IGZyYW1lIGZyb20gRGVzaWduIE1vZGVcblx0XHRjb21wX2ZyYW1lID0gbGlzdF90aXRsZVxuXHRcdFxuXHRcdEB0ZXh0X2ZyYW1lID0gY29tcF9mcmFtZS5zZWxlY3RDaGlsZChcInRleHRcIikuY29weSgpXG5cblx0XHQjIEluaXRpYWxpc2UgdGhlIGNsYXNzXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0aGVpZ2h0OiBjb21wX2ZyYW1lLmhlaWdodFxuXHRcdFx0d2lkdGg6IGNvbXBfZnJhbWUud2lkdGhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogY29tcF9mcmFtZS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblx0XHRcdFxuXHRcdCMgU3RhZ2luZyBmcmFtZXNcblx0XHRAdGV4dF9mcmFtZS5wYXJlbnQgPSBAXG5cblx0IyMjIyMjIyMjIyMjIyMgR0VULCBTRVQgQVRSSUJVVEVTICMjIyMjIyMjIyMjIyMjI1xuXG5cdEBkZWZpbmUgXCJ0ZXh0XCIsXG5cdFx0Z2V0OiAtPiBAb3B0LnRleHRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHQudGV4dCA9IHZhbHVlXG5cdFx0XHRAdGV4dF9mcmFtZS50ZXh0ID0gdmFsdWUiLCIjIyNcbnJhZGlvU2VsZWN0ID0gbmV3IExpc3RSYWRpb1NlbGVjdFxuXHRzZWxlY3RBcnJheTogW1xuXHRcdHt0ZXh0IDogXCJMaXN0IEl0ZW0gMVwifSwgXG5cdFx0e3RleHQgOiBcIkxpc3QgSXRlbSAyXCIsIG9uIDogdHJ1ZX1cblx0XHR7dGV4dDogXCJMaXN0IEl0ZW0gM1wifVxuXHRcdF1cbiMjI1xuXG4jIyMjIyMjIyMjIyBMaXN0IFNlbGVjdCBSYWRpbyAjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5MaXN0UmFkaW9TZWxlY3QgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHRvcHQgPSBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0c3VwZXJcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXHRcdEBsaXN0ID0gbmV3IExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcihcInRyYW5zcGFyZW50XCIpXG5cdFx0XHRuYW1lOiBcIkxpc3RSYWRpb1NlbGVjdFwiXG5cdFx0XG5cdFx0QGxpc3RBcnJheSA9IFtdICMgU3RvcmFnZSBmb3IgdGhlIGxpc3Rcblx0XHRcblx0XHRmb3IgaSBpbiBbMC4uLkBvcHQuc2VsZWN0QXJyYXkubGVuZ3RoXVxuXHRcdFx0QGxpc3RJdGVtID0gbmV3IExpc3RJdGVtXG5cdFx0XHRcdHBhcmVudDogQGxpc3Rcblx0XHRcdFx0dGV4dDogQG9wdC5zZWxlY3RBcnJheVtpXS50ZXh0XG5cdFx0XHRcdHJpZ2h0OiBcInJhZGlvLW9mZlwiXG5cdFx0XHRAbGlzdEl0ZW0uc3RhdGVzLm9uID1cblx0XHRcdFx0cmlnaHQ6IFwicmFkaW8tb25cIlxuXHRcdFx0QGxpc3RJdGVtLnN0YXRlcy5vZmYgPVxuXHRcdFx0XHRyaWdodDogXCJyYWRpby1vZmZcIlxuXHRcdFx0QGxpc3RJdGVtLnkgPSBAbGlzdEl0ZW0uaGVpZ2h0ICogaVx0XHRcdFxuXHRcdFx0aWYgQG9wdC5zZWxlY3RBcnJheVtpXS5vbiA9PSB0cnVlXG5cdFx0XHRcdEBsaXN0SXRlbS5zdGF0ZVN3aXRjaChcIm9uXCIpXG5cblx0XHRcdEBsaXN0QXJyYXkucHVzaChAbGlzdEl0ZW0pICMgU3RvcmUgTGlzdFxuXHRcdFx0XG5cdFx0XHRAbGlzdEl0ZW0ub25UYXAgKGV2ZW50LCBsYXllcikgPT5cblx0XHRcdFx0Zm9yIGkgaW4gWzAuLi5AbGlzdEFycmF5Lmxlbmd0aF1cblx0XHRcdFx0XHRAbGlzdEFycmF5W2ldLnN0YXRlU3dpdGNoKFwib2ZmXCIpXG5cdFx0XHRcdGxheWVyLnN0YXRlU3dpdGNoKFwib25cIilcblx0XHRAbGlzdC5oZWlnaHQgPSBAbGlzdEFycmF5Lmxlbmd0aCAqIEBsaXN0SXRlbS5oZWlnaHRcblxuXHRcdEBsaXN0LnBhcmVudCA9IEBcblx0XHRAaGVpZ2h0ID0gQGxpc3QuaGVpZ2h0ICMgaGVscCB0byBhbGlnblxuIiwiIyMjIyMjIyMjIyMjIyMgTElTVCBQUk9EVUNUIENBUkQgIyMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuTGlzdFByb2R1Y3RDYXJkIGV4dGVuZHMgTGF5ZXJcblx0IyBWYXJpYWJsZXNcblx0Y21wX2ZyYW1lID0gbGlzdF9wcm9kdWN0X2NhcmRcblx0IyBTcGFjZXNcblx0ZGVzY3JpcHRpb25QcmljZVNwYWNlID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwicHJpY2VcIikueSAtIGxpc3RfcHJvZHVjdF9jYXJkLnNlbGVjdENoaWxkKFwiZGVzY3JpcHRpb25cIikubWF4WVxuXHRwcmljZVBhcmVudFNwYWNlID0gY21wX2ZyYW1lLmhlaWdodCAtIGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcInByaWNlXCIpLm1heFlcblx0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdFxuXHRcdCMgQ292ZXIgaW1hZ2Vcblx0XHRAY292ZXJfZnJhbWUgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJpbWFnZVwiKS5jb3B5KClcblx0XHRAY292ZXJfZnJhbWUucHJvcHMgPVxuXHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXHRcdFxuXHRcdCMgU2Vhc29uIGxhYmVsXG5cdFx0QHNlYXNvbl9mcmFtZSA9IGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcInNlYXNvblwiKS5jb3B5KClcblx0XHRAc2Vhc29uX2ZyYW1lLnByb3BzID1cblx0XHRcdGF1dG9IZWlnaHQ6IHRydWVcblx0XHRcblx0XHQjIEJyYW5kIHRleHRcblx0XHRAYnJhbmRfZnJhbWUgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJicmFuZFwiKS5jb3B5KClcblx0XHRAYnJhbmRfZnJhbWUucHJvcHMgPVxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjIpXCIgIyBEZWJ1ZyBsYXllclxuXHRcdFx0dGV4dFRyYW5zZm9ybTogXCJ1cHBlcmNhc2VcIlxuXHRcdFx0Zm9udEZhbWlseTogXCJQb2xhcmlzIENvbmRlbnNlZCwgQXZlbmlyTmV4dENvbmRlbnNlZC1SZWd1bGFyXCJcblx0XHRcdGF1dG9IZWlnaHQ6IHRydWVcblx0XHRuZXdIZWlnaHQgPSBAYnJhbmRfZnJhbWUuaGVpZ2h0XG5cdFx0XG5cdFx0IyBEZXNjcmlwdGlvbiB0ZXh0XG5cdFx0QGRlc2NyaXB0aW9uX2ZyYW1lID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiZGVzY3JpcHRpb25cIikuY29weSgpXG5cdFx0QGRlc2NyaXB0aW9uX2ZyYW1lLnByb3BzID1cblx0XHRcdGF1dG9IZWlnaHQ6IHRydWVcblx0XHRcdCMgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC40KVwiICMgRGVidWcgbGF5ZXJcblx0XHRcdHk6IEBicmFuZF9mcmFtZS5tYXhZXG5cdFx0XHRmb250RmFtaWx5OiBcIlBvbGFyaXNcIlxuXHRcdFxuXHRcdCMgUHJpY2UgdGV4dFxuXHRcdEBwcmljZV9mcmFtZSA9IGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcInByaWNlXCIpLmNvcHkoKVxuXHRcdEBwcmljZV9mcmFtZS5wcm9wcyA9XG5cdFx0XHRhdXRvSGVpZ2h0OiB0cnVlXG5cdFx0XHR5OiBAZGVzY3JpcHRpb25fZnJhbWUubWF4WSArIGRlc2NyaXB0aW9uUHJpY2VTcGFjZVxuXHRcdFx0XG5cdFx0IyBUb3AtcmlnaHQgaWNvblxuXHRcdEBpY29uX2ZyYW1lID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiaWNvblwiKS5jb3B5KClcblx0XHRAaWNvbl9mcmFtZS5zZWxlY3RDaGlsZChcIndpc2hsaXN0LnN2Z1wiKS5kZXN0cm95KClcblx0XHRAaWNvbl9mcmFtZS5wcm9wcyA9XG5cdFx0XHRpbWFnZTogXCJtb2R1bGVzL0ZGS2l0L2Fzc2V0cy9pY29ucy93aXNobGlzdC5zdmdcIlxuXHRcdFx0b3BhY2l0eTogMC4zXG5cdFx0IyBBZGQgYW5pbWF0aW9uIG9uIHRhcFxuXHRcdGljb25DaGFuZ2VTdGF0ZShAaWNvbl9mcmFtZSlcblx0XHRcblx0XHQjIFN0b3JlIGRlZmF1bHQgcHJvcHMgZm9yIHRoZSBwYXJlbnQgY29udGFpbmVyXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IGNtcF9mcmFtZS53aWR0aFxuXHRcdFx0aGVpZ2h0OiBjbXBfZnJhbWUuaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNtcF9mcmFtZS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0IyBBZGQgYWxsIGNoaWxkcmVuIHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXG5cdFx0YWRkQ2hpbGRyZW4oQCwgW0Bjb3Zlcl9mcmFtZSwgQHNlYXNvbl9mcmFtZSwgQGJyYW5kX2ZyYW1lLCBAZGVzY3JpcHRpb25fZnJhbWUsIEBwcmljZV9mcmFtZSwgQGljb25fZnJhbWVdKVxuXG5cdCMjIyMjIyMjIyMjIyMjIyMgUFJJVkFURSBNRVRIT0QgKCkgIyMjIyMjIyMjIyMjIyMjI1xuXHQjIFN0YXRlIGFuaW1hdGlvbiBmb3IgdGhlIGljb25cblx0aWNvbkNoYW5nZVN0YXRlID0gKGxheWVyKSAtPlxuXHRcdGxheWVyLm9uVGFwIC0+XG5cdFx0XHRpZiBAb3BhY2l0eSA8IDFcblx0XHRcdFx0QGFuaW1hdGVcblx0XHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRcdFx0b3B0aW9uczogdGltZTogMC4yXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBhbmltYXRlXG5cdFx0XHRcdFx0b3BhY2l0eTogMC4zXG5cdFx0XHRcdFx0b3B0aW9uczogdGltZTogMC4yXG5cblx0IyMjIyMjIyMjIyMjIyMjIyDwn5K+IEdFVFRJTkcgQU5EIFNFVFRJTkcgQ0xBU1MgREFUQSAjIyMjIyMjIyMjIyMjIyNcblx0QGRlZmluZSBcImNvdmVyXCIsXG5cdFx0Z2V0OiAtPiBAb3B0LmNvdmVyXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0LmNvdmVyID0gdmFsdWVcblx0XHRcdEBjb3Zlcl9mcmFtZS5pbWFnZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lIFwic2Vhc29uXCIsXG5cdFx0Z2V0OiAtPiBAb3B0LnNlYXNvblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdC5zZWFzb24gPSB2YWx1ZVxuXHRcdFx0QHNlYXNvbl9mcmFtZS50ZXh0ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgXCJicmFuZFwiLFxuXHRcdGdldDogLT4gQG9wdC5icmFuZFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdC5icmFuZCA9IHZhbHVlXG5cdFx0XHRAYnJhbmRfZnJhbWUudGV4dCA9IHZhbHVlXG5cdFx0XHQjIEZpeCB0aGUgZGlzdGFuY2Vcblx0XHRcdEBkZXNjcmlwdGlvbl9mcmFtZS55ID0gQGJyYW5kX2ZyYW1lLm1heFlcblx0XHRcdEBwcmljZV9mcmFtZS55ID0gQGRlc2NyaXB0aW9uX2ZyYW1lLm1heFkgKyBkZXNjcmlwdGlvblByaWNlU3BhY2Vcblx0XG5cdEBkZWZpbmUgXCJkZXNjcmlwdGlvblwiLFxuXHRcdGdldDogLT4gQG9wdC5kZXNjcmlwdGlvblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0aWYgdmFsdWUgaXMgZmFsc2Ugb3IgXCJcIlxuXHRcdFx0XHRAZGVzY3JpcHRpb25fZnJhbWUuaGVpZ2h0ID0gMVxuXHRcdFx0XHRAcHJpY2VfZnJhbWUueSA9IEBkZXNjcmlwdGlvbl9mcmFtZS5tYXhZICsgZGVzY3JpcHRpb25QcmljZVNwYWNlXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBvcHQuZGVzY3JpcHRpb24gPSB2YWx1ZVxuXHRcdFx0XHRAZGVzY3JpcHRpb25fZnJhbWUudGV4dCA9IHZhbHVlXG5cdFx0XHRcdCMgRml4IHRoZSBkaXN0YW5jZVxuXHRcdFx0XHRAcHJpY2VfZnJhbWUueSA9IEBkZXNjcmlwdGlvbl9mcmFtZS5tYXhZICsgZGVzY3JpcHRpb25QcmljZVNwYWNlXG5cdFxuXHRAZGVmaW5lIFwicHJpY2VcIixcblx0XHRnZXQ6IC0+IEBvcHQucHJpY2Vcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHQucHJpY2UgPSB2YWx1ZVxuXHRcdFx0QHByaWNlX2ZyYW1lLnRleHQgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSBcImljb25cIixcblx0XHRnZXQ6IC0+IEBvcHQuaWNvblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdC5pY29uID0gXCJtb2R1bGVzL0ZGS2l0L2Fzc2V0cy9pY29ucy8je3ZhbHVlfS5zdmdcIlxuXHRcdFx0QGljb25fZnJhbWUuaW1hZ2UgPSBcIm1vZHVsZXMvRkZLaXQvYXNzZXRzL2ljb25zLyN7dmFsdWV9LnN2Z1wiXG5cdFx0XHRpY29uQ2hhbmdlU3RhdGUoQGljb25fZnJhbWUpXG5cbiIsIiMjIyMjIyMjIyMjIE1vZGVsICMjIyMjIyMjIyMjXG4jIGxpc3RJdGVtID0gbmV3IExpc3RJdGVtXG4jIFx0dGV4dDogXCJIZWxsbyBXb3JsZFwiXG4jIFx0cmlnaHQ6IFwiYXJyb3ctcmlnaHRcIlxuIyBcdGZsYWc6IFwidWtcIlxuIyBcdGxpbmU6IGZhbHNlLCBcImZ1bGx3aWR0aFwiXG4jIFx0bGluZVRvcDogdHJ1ZSwgXCJmdWxsd2lkdGhcIlxuI1x0dHlwZTogXCJ3aWRlXCJcblxuXG4jIyMjIyMjIyMjIyBMaXN0IEl0ZW0gIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuTGlzdEl0ZW0gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHQjIENvbXBvbmVudCBmcmFtZSBmcm9tIERlc2lnbiBNb2RlXG5cdFx0Y29tcF9mcmFtZSA9IGxpc3RfaXRlbVxuXHRcdHdpZGVfdHlwZV9mcmFtZSA9IHdpZGVfbGlzdF9pdGVtXG5cblx0XHQjIENyZWF0ZSBzdWJseWVyc1xuXHRcdEB0ZXh0X2ZyYW1lID0gY29tcF9mcmFtZS5zZWxlY3RDaGlsZChcInRleHRcIikuY29weSgpXG5cdFx0QHRleHRfZnJhbWUucHJvcHMgPVxuXHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXG5cdFx0QGxpbmVfZnJhbWUgPSBjb21wX2ZyYW1lLnNlbGVjdENoaWxkKFwibGluZVwiKS5jb3B5KClcblxuXHRcdEBmbGFnX2ZyYW1lID0gbmV3IExheWVyXG5cdFx0QGZsYWdfZnJhbWUucHJvcHMgPSBsaXN0X2l0ZW1fZmxhZy5zZWxlY3RDaGlsZChcImZsYWdcIikucHJvcHNcblxuXHRcdHN3aXRjaCBcblx0XHRcdCMgTm9ybWFsIGxpc3QgaXRlbSB3aXRoID4gaWNvblxuXHRcdFx0d2hlbiBAb3B0LnJpZ2h0IGlzbnQgXCJ0b2dnbGVcIiMgYW5kIEBvcHQucmlnaHQgaXNudCBmYWxzZSBcblx0XHRcdFx0QHJpZ2h0X2ZyYW1lID0gbmV3IExheWVyIFxuXHRcdFx0XHRAcmlnaHRfZnJhbWUucHJvcHMgPSBjb21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiaWNvblwiKS5wcm9wc1xuXHRcdFx0IyBUb2dnbGVcblx0XHRcdHdoZW4gIEBvcHQucmlnaHQgaXMgXCJ0b2dnbGVcIiBcblx0XHRcdFx0QHJpZ2h0X2ZyYW1lID0gbmV3IGlPU1N3aXRjaCAjIFVzaW5nIGlPU1N3aXRjaCBjb21wb25lbnRcblx0XHRcdFx0XHRpc09uOiB0cnVlXG5cdFx0XHRcdFx0eDogbGlzdF9pdGVtX3RvZ2dsZS5zZWxlY3RDaGlsZChcInRvZ2dsZVwiKS54XG5cdFx0XHRcdFx0eTogbGlzdF9pdGVtX3RvZ2dsZS5zZWxlY3RDaGlsZChcInRvZ2dsZVwiKS55XG5cblx0XHRzd2l0Y2hcblx0XHRcdCMgVG9wIGxpbmVcblx0XHRcdHdoZW4gQG9wdC5saW5lVG9wIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRcdEBsaW5lVG9wX2ZyYW1lID0gY29tcF9mcmFtZS5zZWxlY3RDaGlsZChcImxpbmVcIikuY29weSgpXG5cdFx0XHRcdEBsaW5lVG9wX2ZyYW1lLnkgPSAwXG5cblx0XHQjIEluaXRpYWxpc2UgdGhlIGNsYXNzXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0aGVpZ2h0OiBjb21wX2ZyYW1lLmhlaWdodFxuXHRcdFx0d2lkdGg6IGNvbXBfZnJhbWUud2lkdGhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogY29tcF9mcmFtZS5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cblx0XHQjIFN0YWdpbmcgZnJhbWVzXG5cdFx0IyBjb25kaXRpb25hbCBjaGlsZHJlblxuXHRcdGlmIEBvcHQubGluZSBpc250IGZhbHNlIHRoZW4gQGxpbmVfZnJhbWUucGFyZW50ID0gQCBlbHNlIEBsaW5lX2ZyYW1lLmRlc3Ryb3koKVxuXHRcdGlmIEBvcHQucmlnaHQgaXNudCB1bmRlZmluZWQgYW5kIEBvcHQucmlnaHQgaXNudCBmYWxzZSB0aGVuIEByaWdodF9mcmFtZS5wYXJlbnQgPSBAIGVsc2UgQHJpZ2h0X2ZyYW1lLmRlc3Ryb3koKVxuXHRcdGlmIEBvcHQuZmxhZyBpc250IHVuZGVmaW5lZCB0aGVuIEBmbGFnX2ZyYW1lLnBhcmVudCA9IEAgZWxzZSBAZmxhZ19mcmFtZS5kZXN0cm95KClcblx0XHRpZiBAb3B0LmxpbmVUb3AgaXNudCB1bmRlZmluZWQgdGhlbiBAbGluZVRvcF9mcmFtZS5wYXJlbnQgPSBAXG5cblx0XHRhZGRDaGlsZHJlbihALCBbQHRleHRfZnJhbWVdKVxuXG5cdFx0IyBpZiB0eXBlIGlzIFwid2lkZVwiIFxuXHRcdHN3aXRjaCBAb3B0LnR5cGVcblx0XHRcdHdoZW4gXCJ3aWRlXCJcblx0XHRcdFx0QGhlaWdodCA9IDc3XG5cblx0XHRcdFx0QHRleHRfZnJhbWUucHJvcHMgPVxuXHRcdFx0XHRcdGZvbnRGYW1pbHk6IHdpZGVfdHlwZV9mcmFtZS5zZWxlY3RDaGlsZChcInRleHRcIikuZm9udEZhbWlseVxuXHRcdFx0XHRcdGZvbnRTaXplOiB3aWRlX3R5cGVfZnJhbWUuc2VsZWN0Q2hpbGQoXCJ0ZXh0XCIpLmZvbnRTaXplXG5cdFx0XHRcdFx0eTogd2lkZV90eXBlX2ZyYW1lLnNlbGVjdENoaWxkKFwidGV4dFwiKS55XG5cdFx0XHRcdFxuXHRcdFx0XHRAbGluZV9mcmFtZS5wcm9wcyA9XG5cdFx0XHRcdFx0eTogd2lkZV90eXBlX2ZyYW1lLnNlbGVjdENoaWxkKFwibGluZVwiKS55XG5cdFx0XHRcdFxuXHRcdFx0XHRAZmxhZ19mcmFtZS55ID0gQWxpZ24uY2VudGVyKC00KVxuXHRcdFx0XHRAcmlnaHRfZnJhbWUueSA9IEFsaWduLmNlbnRlcigtMilcblx0XHRcdGVsc2Vcblx0XHRcdFx0QGhlaWdodCA9IGNvbXBfZnJhbWUuaGVpZ2h0XG5cblxuXHQjIyMjIyMjIyMjIyMjIyBHRVQsIFNFVCBBVFJJQlVURVMgIyMjIyMjIyMjIyMjIyMjXG5cblx0QGRlZmluZSBcInRleHRcIixcblx0XHRnZXQ6IC0+IEBvcHQudGV4dFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdC50ZXh0ID0gdmFsdWVcblx0XHRcdEB0ZXh0X2ZyYW1lLnRleHQgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJsaW5lXCIsXG5cdFx0Z2V0OiAtPiBAb3B0LmxpbmVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdGlmIHZhbHVlID0gXCJmdWxsd2lkdGhcIlxuXHRcdFx0XHRAbGluZV9mcmFtZS54ID0gMFxuXHRcdFx0XHRAbGluZV9mcmFtZS53aWR0aCA9IFNjcmVlbi53aWR0aFxuXG5cdEBkZWZpbmUgXCJsaW5lVG9wXCIsXG5cdFx0Z2V0OiAtPiBAb3B0LmxpbmVUb3Bcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdGlmIHZhbHVlID09IFwiZnVsbHdpZHRoXCJcblx0XHRcdFx0QGxpbmVUb3BfZnJhbWUueCA9IDBcblx0XHRcdFx0QGxpbmVUb3BfZnJhbWUud2lkdGggPSBTY3JlZW4ud2lkdGhcblxuXHRAZGVmaW5lIFwicmlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAb3B0LnJpZ2h0LFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBvcHQucmlnaHQgPSB2YWx1ZVxuXHRcdFx0QHJpZ2h0X2ZyYW1lLmltYWdlID0gXCJtb2R1bGVzL0ZGS2l0L2Fzc2V0cy9pY29ucy8je3ZhbHVlfS5zdmdcIlxuXG5cdEBkZWZpbmUgXCJmbGFnXCIsIFxuXHRcdGdldDogLT4gQG9wdC5mYWxnLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBvcHQuZmxhZyA9IHZhbHVlXG5cdFx0XHRAZmxhZ19mcmFtZS5pbWFnZSA9IFwibW9kdWxlcy9GRktpdC9hc3NldHMvZmxhZ3MvI3t2YWx1ZX0ucG5nXCJcblx0XHRcdEB0ZXh0X2ZyYW1lLnggPSBAZmxhZ19mcmFtZS5tYXhYICsgU19zcGFjZXIiLCJjbGFzcyB3aW5kb3cuS2V5bGluZSBleHRlbmRzIExheWVyXG5cdCMgUmVmZXJlbmNlcyBmcm9tIERkZXNpZ24gbW9kZVxuXHRrZXlsaW5lID0ga2V5X2xpbmVcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHQ9e30pIC0+XG5cdFx0b3B0ID0gXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IGtleWxpbmUud2lkdGhcblx0XHRcdGhlaWdodDoga2V5bGluZS5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjoga2V5bGluZS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRzdXBlciBvcHRcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSkiLCJFdmVudHMuRW50ZXJLZXkgPSBcIkVudGVyS2V5XCJcbkV2ZW50cy5TcGFjZUtleSA9IFwiU3BhY2VLZXlcIlxuRXZlbnRzLkJhY2tzcGFjZUtleSA9IFwiQmFja3NwYWNlS2V5XCJcbkV2ZW50cy5DYXBzTG9ja0tleSA9IFwiQ2Fwc0xvY2tLZXlcIlxuRXZlbnRzLlNoaWZ0S2V5ID0gXCJTaGlmdEtleVwiXG5FdmVudHMuVmFsdWVDaGFuZ2UgPSBcIlZhbHVlQ2hhbmdlXCJcbkV2ZW50cy5JbnB1dEZvY3VzID0gXCJJbnB1dEZvY3VzXCJcbkV2ZW50cy5JbnB1dEJsdXIgPSBcIklucHV0Qmx1clwiXG5cbmNsYXNzIHdpbmRvdy5JbnB1dCBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNGRkZcIlxuXHRcdFx0d2lkdGg6IDM3NVxuXHRcdFx0aGVpZ2h0OiA2MFxuXHRcdFx0cGFkZGluZzpcblx0XHRcdFx0bGVmdDogMjBcblx0XHRcdHRleHQ6IFwiVHlwZSBzb21ldGhpbmcuLi5cIlxuXHRcdFx0Zm9udFNpemU6IDQwXG5cdFx0XHRmb250V2VpZ2h0OiAzMDBcblxuXHRcdGlmIG9wdGlvbnMubXVsdGlMaW5lXG5cdFx0XHRvcHRpb25zLnBhZGRpbmcudG9wID89IDIwXG5cblx0XHRAX2lucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuXHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHQjIEdsb2JhbHNcblx0XHRAX2JhY2tncm91bmQgPSB1bmRlZmluZWRcblx0XHRAX3BsYWNlaG9sZGVyID0gdW5kZWZpbmVkXG5cdFx0QF9pc0Rlc2lnbkxheWVyID0gZmFsc2VcblxuXHRcdCMgTGF5ZXIgY29udGFpbmluZyBpbnB1dCBlbGVtZW50XG5cdFx0QGlucHV0ID0gbmV3IExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0bmFtZTogXCJpbnB1dFwiXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0IyBUZXh0IGFyZWFcblx0XHRpZiBAbXVsdGlMaW5lXG5cdFx0XHRAX2lucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKVxuXG5cdFx0IyBBcHBlbmQgZWxlbWVudFxuXHRcdEBpbnB1dC5fZWxlbWVudC5hcHBlbmRDaGlsZChAX2lucHV0RWxlbWVudClcblxuXHRcdCMgTWF0Y2ggVGV4dExheWVyIGRlZmF1bHRzIGFuZCB0eXBlIHByb3BlcnRpZXNcblx0XHRAX3NldFRleHRQcm9wZXJ0aWVzKEApXG5cblx0XHQjIFNldCBhdHRyaWJ1dGVzXG5cdFx0QF9pbnB1dEVsZW1lbnQuYXV0b2NvbXBsZXRlID0gXCJvZmZcIlxuXHRcdEBfaW5wdXRFbGVtZW50LmF1dG9jb3JyZWN0ID0gXCJvZmZcIlxuXHRcdEBfaW5wdXRFbGVtZW50LnNwZWxsY2hlY2sgPSBmYWxzZVxuXG5cdFx0IyBUaGUgaWQgc2VydmVzIHRvIGRpZmZlcmVudGlhdGUgbXVsdGlwbGUgaW5wdXQgZWxlbWVudHMgZnJvbSBvbmUgYW5vdGhlci5cblx0XHQjIFRvIGFsbG93IHN0eWxpbmcgdGhlIHBsYWNlaG9sZGVyIGNvbG9ycyBvZiBzZXBlcmF0ZSBlbGVtZW50cy5cblx0XHRAX2lucHV0RWxlbWVudC5jbGFzc05hbWUgPSBcImlucHV0XCIgKyBAaWRcblxuXHRcdCMgQWxsIGluaGVyaXRlZCBwcm9wZXJ0aWVzXG5cdFx0dGV4dFByb3BlcnRpZXMgPVxuXHRcdFx0e0B0ZXh0LCBAZm9udEZhbWlseSwgQGZvbnRTaXplLCBAbGluZUhlaWdodCwgQGZvbnRXZWlnaHQsIEBjb2xvciwgQGJhY2tncm91bmRDb2xvciwgQHdpZHRoLCBAaGVpZ2h0LCBAcGFkZGluZywgQHBhcmVudH1cblxuXHRcdGZvciBwcm9wZXJ0eSwgdmFsdWUgb2YgdGV4dFByb3BlcnRpZXNcblxuXHRcdFx0QG9uIFwiY2hhbmdlOiN7cHJvcGVydHl9XCIsICh2YWx1ZSkgPT5cblx0XHRcdFx0IyBSZXNldCB0ZXh0TGF5ZXIgY29udGVudHNcblx0XHRcdFx0QF9lbGVtZW50SFRNTC5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9IFwiXCJcblxuXHRcdFx0XHRyZXR1cm4gaWYgQF9pc0Rlc2lnbkxheWVyXG5cdFx0XHRcdEBfc2V0VGV4dFByb3BlcnRpZXMoQClcblx0XHRcdFx0QF9zZXRQbGFjZWhvbGRlckNvbG9yKEBfaWQsIEBjb2xvcilcblxuXG5cdFx0IyBTZXQgZGVmYXVsdCBwbGFjZWhvbGRlclxuXHRcdEBfc2V0UGxhY2Vob2xkZXIoQHRleHQpXG5cdFx0QF9zZXRQbGFjZWhvbGRlckNvbG9yKEBfaWQsIEBjb2xvcilcblxuXHRcdCMgUmVzZXQgdGV4dExheWVyIGNvbnRlbnRzXG5cdFx0QF9lbGVtZW50SFRNTC5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9IFwiXCJcblxuXHRcdCMgQ2hlY2sgaWYgaW4gZm9jdXNcblx0XHRAX2lzRm9jdXNlZCA9IGZhbHNlXG5cblx0XHQjIERlZmF1bHQgZm9jdXMgaW50ZXJhY3Rpb25cblx0XHRAX2lucHV0RWxlbWVudC5vbmZvY3VzID0gKGUpID0+XG5cblx0XHRcdEBmb2N1c0NvbG9yID89IFwiIzAwMFwiXG5cblx0XHRcdCMgRW1pdCBmb2N1cyBldmVudFxuXHRcdFx0QGVtaXQoRXZlbnRzLklucHV0Rm9jdXMsIGV2ZW50KVxuXG5cdFx0XHRAX2lzRm9jdXNlZCA9IHRydWVcblxuXHRcdCMgRW1pdCBibHVyIGV2ZW50XG5cdFx0QF9pbnB1dEVsZW1lbnQub25ibHVyID0gKGUpID0+XG5cdFx0XHRAZW1pdChFdmVudHMuSW5wdXRCbHVyLCBldmVudClcblxuXHRcdFx0QF9pc0ZvY3VzZWQgPSBmYWxzZVxuXG5cdFx0IyBUbyBmaWx0ZXIgaWYgdmFsdWUgY2hhbmdlZCBsYXRlclxuXHRcdGN1cnJlbnRWYWx1ZSA9IHVuZGVmaW5lZFxuXG5cdFx0IyBTdG9yZSBjdXJyZW50IHZhbHVlXG5cdFx0QF9pbnB1dEVsZW1lbnQub25rZXlkb3duID0gKGUpID0+XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBAdmFsdWVcblxuXHRcdFx0IyBJZiBjYXBzIGxvY2sga2V5IGlzIHByZXNzZWQgZG93blxuXHRcdFx0aWYgZS53aGljaCBpcyAyMFxuXHRcdFx0XHRAZW1pdChFdmVudHMuQ2Fwc0xvY2tLZXksIGV2ZW50KVxuXG5cdFx0XHQjIElmIHNoaWZ0IGtleSBpcyBwcmVzc2VkXG5cdFx0XHRpZiBlLndoaWNoIGlzIDE2XG5cdFx0XHRcdEBlbWl0KEV2ZW50cy5TaGlmdEtleSwgZXZlbnQpXG5cblx0XHRAX2lucHV0RWxlbWVudC5vbmtleXVwID0gKGUpID0+XG5cblx0XHRcdGlmIGN1cnJlbnRWYWx1ZSBpc250IEB2YWx1ZVxuXHRcdFx0XHRAZW1pdChcImNoYW5nZTp2YWx1ZVwiLCBAdmFsdWUpXG5cdFx0XHRcdEBlbWl0KEV2ZW50cy5WYWx1ZUNoYW5nZSwgQHZhbHVlKVxuXG5cdFx0XHQjIElmIGVudGVyIGtleSBpcyBwcmVzc2VkXG5cdFx0XHRpZiBlLndoaWNoIGlzIDEzXG5cdFx0XHRcdEBlbWl0KEV2ZW50cy5FbnRlcktleSwgZXZlbnQpXG5cblx0XHRcdCMgSWYgYmFja3NwYWNlIGtleSBpcyBwcmVzc2VkXG5cdFx0XHRpZiBlLndoaWNoIGlzIDhcblx0XHRcdFx0QGVtaXQoRXZlbnRzLkJhY2tzcGFjZUtleSwgZXZlbnQpXG5cblx0XHRcdCMgSWYgc3BhY2Uga2V5IGlzIHByZXNzZWRcblx0XHRcdGlmIGUud2hpY2ggaXMgMzJcblx0XHRcdFx0QGVtaXQoRXZlbnRzLlNwYWNlS2V5LCBldmVudClcblxuXHRcdFx0IyBJZiBjYXBzIGxvY2sga2V5IGlzIHByZXNzZWQgdXBcblx0XHRcdGlmIGUud2hpY2ggaXMgMjBcblx0XHRcdFx0QGVtaXQoRXZlbnRzLkNhcHNMb2NrS2V5LCBldmVudClcblxuXHRfc2V0UGxhY2Vob2xkZXI6ICh0ZXh0KSA9PlxuXHRcdEBfaW5wdXRFbGVtZW50LnBsYWNlaG9sZGVyID0gdGV4dFxuXG5cdF9zZXRQbGFjZWhvbGRlckNvbG9yOiAoaWQsIGNvbG9yKSAtPlxuXHRcdGRvY3VtZW50LnN0eWxlU2hlZXRzWzBdLmFkZFJ1bGUoXCIuaW5wdXQje2lkfTo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlclwiLCBcImNvbG9yOiAje2NvbG9yfVwiKVxuXG5cdF9jaGVja0RldmljZVBpeGVsUmF0aW86IC0+XG5cdFx0cmF0aW8gPSAoU2NyZWVuLndpZHRoIC8gRnJhbWVyLkRldmljZS5zY3JlZW4ud2lkdGgpXG5cdFx0aWYgVXRpbHMuaXNEZXNrdG9wKClcblx0XHRcdCMgQDN4XG5cdFx0XHRpZiByYXRpbyA8IDAuNSBhbmQgcmF0aW8gPiAwLjI1XG5cdFx0XHRcdGRwciA9IDEgLSByYXRpb1xuXHRcdFx0IyBANHhcblx0XHRcdGVsc2UgaWYgcmF0aW8gaXMgMC4yNVxuXHRcdFx0XHRkcHIgPSAxIC0gKHJhdGlvICogMilcblx0XHRcdCMgQDF4LCBAMnhcblx0XHRcdGVsc2Vcblx0XHRcdFx0ZHByID0gVXRpbHMuZGV2aWNlUGl4ZWxSYXRpbygpXG5cdFx0XHRpZiBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgaXMgXCJmdWxsc2NyZWVuXCJcblx0XHRcdFx0ZHByID0gMlxuXHRcdGVsc2Vcblx0XHRcdCMgQDN4XG5cdFx0XHRpZiByYXRpbyA8IDAuNSBhbmQgcmF0aW8gPiAwLjI1XG5cdFx0XHRcdGRwciA9IDEgLSByYXRpb1xuXHRcdFx0IyBANHhcblx0XHRcdGVsc2UgaWYgcmF0aW8gaXMgMC4yNVxuXHRcdFx0XHRkcHIgPSAxIC0gKHJhdGlvICogMilcblx0XHRcdCMgQDF4LCBAMnhcblx0XHRcdGVsc2UgaWYgcmF0aW8gaXMgMC41XG5cdFx0XHRcdGRwciA9IDFcblxuXHRcdHJldHVybiBkcHJcblxuXHRfc2V0VGV4dFByb3BlcnRpZXM6IChsYXllcikgPT5cblxuXHRcdGRwciA9IEBfY2hlY2tEZXZpY2VQaXhlbFJhdGlvKClcblxuXHRcdGlmIG5vdCBAX2lzRGVzaWduTGF5ZXJcblx0XHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLmZvbnRGYW1pbHkgPSBsYXllci5mb250RmFtaWx5XG5cdFx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwiI3tsYXllci5mb250U2l6ZSAvIGRwcn1weFwiXG5cdFx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gbGF5ZXIuZm9udFdlaWdodCA/IFwibm9ybWFsXCJcblx0XHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLnBhZGRpbmdUb3AgPSBcIiN7bGF5ZXIucGFkZGluZy50b3AgKiAyIC8gZHByfXB4XCJcblx0XHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLnBhZGRpbmdSaWdodCA9IFwiI3tsYXllci5wYWRkaW5nLmJvdHRvbSAqIDIgLyBkcHJ9cHhcIlxuXHRcdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IFwiI3tsYXllci5wYWRkaW5nLnJpZ2h0ICogMiAvIGRwcn1weFwiXG5cdFx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9IFwiI3tsYXllci5wYWRkaW5nLmxlZnQgKiAyIC8gZHByfXB4XCJcblxuXHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLndpZHRoID0gXCIjeygobGF5ZXIud2lkdGggLSBsYXllci5wYWRkaW5nLmxlZnQgKiAyKSAqIDIgLyBkcHIpfXB4XCJcblx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIiN7bGF5ZXIuaGVpZ2h0ICogMiAvIGRwcn1weFwiXG5cdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUub3V0bGluZSA9IFwibm9uZVwiXG5cdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS53ZWJraXRBcHBlYXJhbmNlID0gXCJub25lXCJcblx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS5yZXNpemUgPSBcIm5vbmVcIlxuXHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIlxuXHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLndlYmtpdEZvbnRTbW9vdGhpbmcgPSBcImFudGlhbGlhc2VkXCJcblxuXHRhZGRCYWNrZ3JvdW5kTGF5ZXI6IChsYXllcikgLT5cblx0XHRAX2JhY2tncm91bmQgPSBsYXllclxuXHRcdEBfYmFja2dyb3VuZC5wYXJlbnQgPSBAXG5cdFx0QF9iYWNrZ3JvdW5kLm5hbWUgPSBcImJhY2tncm91bmRcIlxuXHRcdEBfYmFja2dyb3VuZC54ID0gQF9iYWNrZ3JvdW5kLnkgPSAwXG5cdFx0QF9iYWNrZ3JvdW5kLl9lbGVtZW50LmFwcGVuZENoaWxkKEBfaW5wdXRFbGVtZW50KVxuXG5cdFx0cmV0dXJuIEBfYmFja2dyb3VuZFxuXG5cdGFkZFBsYWNlSG9sZGVyTGF5ZXI6IChsYXllcikgLT5cblxuXHRcdEBfaXNEZXNpZ25MYXllciA9IHRydWVcblx0XHRAX2lucHV0RWxlbWVudC5jbGFzc05hbWUgPSBcImlucHV0XCIgKyBsYXllci5pZFxuXHRcdEBwYWRkaW5nID0gbGVmdDogMCwgdG9wOiAwXG5cblx0XHRAX3NldFBsYWNlaG9sZGVyKGxheWVyLnRleHQpXG5cdFx0QF9zZXRUZXh0UHJvcGVydGllcyhsYXllcilcblx0XHRAX3NldFBsYWNlaG9sZGVyQ29sb3IobGF5ZXIuaWQsIGxheWVyLmNvbG9yKVxuXG5cdFx0QG9uIFwiY2hhbmdlOmNvbG9yXCIsID0+XG5cdFx0XHRAX3NldFBsYWNlaG9sZGVyQ29sb3IobGF5ZXIuaWQsIEBjb2xvcilcblxuXHRcdCMgUmVtb3ZlIG9yaWdpbmFsIGxheWVyXG5cdFx0bGF5ZXIudmlzaWJsZSA9IGZhbHNlXG5cdFx0QF9lbGVtZW50SFRNTC5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9IFwiXCJcblxuXHRcdCMgQ29udmVydCBwb3NpdGlvbiB0byBwYWRkaW5nXG5cdFx0ZHByID0gQF9jaGVja0RldmljZVBpeGVsUmF0aW8oKVxuXHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCIje2xheWVyLmZvbnRTaXplICogMiAvIGRwcn1weFwiXG5cdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUucGFkZGluZ1RvcCA9IFwiI3tsYXllci55ICogMiAvIGRwcn1weFwiXG5cdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUucGFkZGluZ0xlZnQgPSBcIiN7bGF5ZXIueCAqIDIgLyBkcHJ9cHhcIlxuXHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLndpZHRoID0gXCIjeyhAX2JhY2tncm91bmQud2lkdGggLSBsYXllci54ICogMikgKiAyIC8gZHByfXB4XCJcblxuXHRcdGlmIEBtdWx0aUxpbmVcblx0XHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiI3tAX2JhY2tncm91bmQuaGVpZ2h0ICogMiAvIGRwcn1weFwiXG5cblx0XHRAb24gXCJjaGFuZ2U6cGFkZGluZ1wiLCA9PlxuXHRcdFx0QF9pbnB1dEVsZW1lbnQuc3R5bGUucGFkZGluZ1RvcCA9IFwiI3tAcGFkZGluZy50b3AgKiAyIC8gZHByfXB4XCJcblx0XHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLnBhZGRpbmdMZWZ0ID0gXCIje0BwYWRkaW5nLmxlZnQgKiAyIC8gZHByfXB4XCJcblxuXHRcdHJldHVybiBAX3BsYWNlaG9sZGVyXG5cblx0Zm9jdXM6IC0+XG5cdFx0QF9pbnB1dEVsZW1lbnQuZm9jdXMoKVxuXG5cdEBkZWZpbmUgXCJ2YWx1ZVwiLFxuXHRcdGdldDogLT4gQF9pbnB1dEVsZW1lbnQudmFsdWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfaW5wdXRFbGVtZW50LnZhbHVlID0gdmFsdWVcblxuXHRAZGVmaW5lIFwiZm9jdXNDb2xvclwiLFxuXHRcdGdldDogLT5cblx0XHRcdEBfaW5wdXRFbGVtZW50LnN0eWxlLmNvbG9yXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAX2lucHV0RWxlbWVudC5zdHlsZS5jb2xvciA9IHZhbHVlXG5cblx0QGRlZmluZSBcIm11bHRpTGluZVwiLCBAc2ltcGxlUHJvcGVydHkoXCJtdWx0aUxpbmVcIiwgZmFsc2UpXG5cblx0IyBOZXcgQ29uc3RydWN0b3Jcblx0QHdyYXAgPSAoYmFja2dyb3VuZCwgcGxhY2Vob2xkZXIsIG9wdGlvbnMpIC0+XG5cdFx0cmV0dXJuIHdyYXBJbnB1dChuZXcgQChvcHRpb25zKSwgYmFja2dyb3VuZCwgcGxhY2Vob2xkZXIsIG9wdGlvbnMpXG5cblx0b25FbnRlcktleTogKGNiKSAtPiBAb24oRXZlbnRzLkVudGVyS2V5LCBjYilcblx0b25TcGFjZUtleTogKGNiKSAtPiBAb24oRXZlbnRzLlNwYWNlS2V5LCBjYilcblx0b25CYWNrc3BhY2VLZXk6IChjYikgLT4gQG9uKEV2ZW50cy5CYWNrc3BhY2VLZXksIGNiKVxuXHRvbkNhcHNMb2NrS2V5OiAoY2IpIC0+IEBvbihFdmVudHMuQ2Fwc0xvY2tLZXksIGNiKVxuXHRvblNoaWZ0S2V5OiAoY2IpIC0+IEBvbihFdmVudHMuU2hpZnRLZXksIGNiKVxuXHRvblZhbHVlQ2hhbmdlOiAoY2IpIC0+IEBvbihFdmVudHMuVmFsdWVDaGFuZ2UsIGNiKVxuXHRvbklucHV0Rm9jdXM6IChjYikgLT4gQG9uKEV2ZW50cy5JbnB1dEZvY3VzLCBjYilcblx0b25JbnB1dEJsdXI6IChjYikgLT4gQG9uKEV2ZW50cy5JbnB1dEJsdXIsIGNiKVxuXG53cmFwSW5wdXQgPSAoaW5zdGFuY2UsIGJhY2tncm91bmQsIHBsYWNlaG9sZGVyKSAtPlxuXHRpZiBub3QgKGJhY2tncm91bmQgaW5zdGFuY2VvZiBMYXllcilcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnB1dExheWVyIGV4cGVjdHMgYSBiYWNrZ3JvdW5kIGxheWVyLlwiKVxuXG5cdGlmIG5vdCAocGxhY2Vob2xkZXIgaW5zdGFuY2VvZiBUZXh0TGF5ZXIpXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW5wdXRMYXllciBleHBlY3RzIGEgdGV4dCBsYXllci5cIilcblxuXHRpbnB1dCA9IGluc3RhbmNlXG5cblx0aW5wdXQuX19mcmFtZXJJbnN0YW5jZUluZm8gPz0ge31cblx0aW5wdXQuX19mcmFtZXJJbnN0YW5jZUluZm8/Lm5hbWUgPSBpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lXG5cblx0aW5wdXQuZnJhbWUgPSBiYWNrZ3JvdW5kLmZyYW1lXG5cdGlucHV0LnBhcmVudCA9IGJhY2tncm91bmQucGFyZW50XG5cdGlucHV0LmluZGV4ID0gYmFja2dyb3VuZC5pbmRleFxuXG5cdGlucHV0LmFkZEJhY2tncm91bmRMYXllcihiYWNrZ3JvdW5kKVxuXHRpbnB1dC5hZGRQbGFjZUhvbGRlckxheWVyKHBsYWNlaG9sZGVyKVxuXG5cdHJldHVybiBpbnB1dCIsIiMjIyMjIyMjIyMjIEhvbWVTZWFyY2ggIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuSG9tZVNlYXJjaCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdFxuXHRcdCMgQ29tcG9uZW50IGZyYW1lIGZyb20gRGVzaWduIE1vZGVcblx0XHRjb21wX2ZyYW1lID0gaG9tZV9zZWFyY2hcblx0XHRcblx0XHRAaG9tZVNlYXJjaCA9IGNvbXBfZnJhbWUuY29weSgpXG5cdFx0QGhvbWVTZWFyY2gucHJvcHMgPSBcblx0XHRcdHg6IDAsIHk6IDBcblx0XHRcdFxuXHRcdCMgSW5pdGlhbGlzZSB0aGUgY2xhc3Ncblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHRoZWlnaHQ6IGNvbXBfZnJhbWUuaGVpZ2h0XG5cdFx0XHR3aWR0aDogY29tcF9mcmFtZS53aWR0aFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0IyBTdGFnaW5nIGZyYW1lc1xuXHRcdEBob21lU2VhcmNoLnBhcmVudCA9IEAiLCIjIyMjIyMjIyMjIyMjIyBIRUFERVIgIyMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuSGVhZGVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0IyBGcmFtZSBmcm9tIERlc2lnbiBNb2RlXG5cdFx0ZnJhbWUgPSBoZWFkZXJcblxuXHRcdCMgT3RoZXIgZnJhbWVzIGZyb20gRGVzaWduIE1vZGVcblx0XHRAc3ViVGl0bGVfZnJhbWUgPSBoZWFkZXJfZXh0cmEuc2VsZWN0Q2hpbGQoXCJzdWJ0aXRsZVwiKS5jb3B5KClcblx0XHRAc3ViVGl0bGVfZnJhbWUuYXV0b0hlaWdodCA9IHRydWVcblx0XG5cdFx0c3dpdGNoIFxuXHRcdFx0IyBOb3JtYWwgdGl0bGVcblx0XHRcdHdoZW4gQG9wdC50aXRsZSBpc250IFwibG9nb1wiIGFuZCBAb3B0LnN1YlRpdGxlIGlzIHVuZGVmaW5lZCBcblx0XHRcdFx0QHRpdGxlX2ZyYW1lID0gaGVhZGVyLnNlbGVjdENoaWxkKFwidGl0bGVcIikuY29weSgpXG5cdFx0XHRcdEB0aXRsZV9mcmFtZS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXHRcdFx0IyBMb2dvXG5cdFx0XHR3aGVuICBAb3B0LnRpdGxlIGlzIFwibG9nb1wiIFxuXHRcdFx0XHRAdGl0bGVfZnJhbWUgPSBoZWFkZXJfbG9nby5zZWxlY3RDaGlsZChcImxvZ29cIikuY29weSgpXG5cdFx0XHQjIHdpdGggc3ViVGl0bGVcblx0XHRcdHdoZW4gQG9wdC5zdWJUaXRsZSBpc250IHVuZGVmaW5lZCBcblx0XHRcdFx0QHRpdGxlX2ZyYW1lID0gaGVhZGVyX2V4dHJhLnNlbGVjdENoaWxkKFwidGl0bGVcIikuY29weSgpXG5cdFx0XHRcdEB0aXRsZV9mcmFtZS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXG5cdFx0QGljb25MZWZ0X2xheWVyID0gbmV3IExheWVyIFxuXHRcdEBpY29uTGVmdF9sYXllci5wcm9wcyA9ICBoZWFkZXIuc2VsZWN0Q2hpbGQoXCJpY25fbGVmdFwiKS5wcm9wc1xuXG5cdFx0QGljb25SaWdodF9sYXllciA9IG5ldyBMYXllciBcblx0XHRAaWNvblJpZ2h0X2xheWVyLnByb3BzID0gIGhlYWRlci5zZWxlY3RDaGlsZChcImljbl9yaWdodFwiKS5wcm9wc1xuXG5cdFx0QGxpbmtMZWZ0X2ZyYW1lID0gaGVhZGVyX2xpbmtzLnNlbGVjdENoaWxkKFwibGVmdF9saW5rXCIpLmNvcHkoKVxuXHRcdEBsaW5rTGVmdF9mcmFtZS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXG5cdFx0QGxpbmtSaWdodF9mcmFtZSA9IGhlYWRlcl9saW5rcy5zZWxlY3RDaGlsZChcInJpZ2h0X2xpbmtcIikuY29weSgpXG5cdFx0QGxpbmtSaWdodF9mcmFtZS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXG5cdFx0QGJhZ19mcmFtZSA9IGhlYWRlcl9leHRyYS5zZWxlY3RDaGlsZChcImJhZ1wiKS5jb3B5KClcblxuXHRcdEBzZWFyY2hfZnJhbWUgPSBoZWFkZXIuc2VsZWN0Q2hpbGQoXCJpY25fc2VhcmNoXCIpLmNvcHkoKVxuXG5cdFx0IyBJbml0aWFsaXNlIHRoZSBjbGFzc1xuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdGhlaWdodDogZnJhbWUuaGVpZ2h0XG5cdFx0XHR3aWR0aDogZnJhbWUud2lkdGhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZnJhbWUuYmFja2dyb3VuZENvbG9yXG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBALCBAb3B0LnkpXG5cdFx0XHRcblx0XHQjIFN0YWdpbmcgZnJhbWVzXG5cdFx0aWYgQG9wdC5zdWJUaXRsZSBpc250IHVuZGVmaW5lZCB0aGVuIEBzdWJUaXRsZV9mcmFtZS5wYXJlbnQgPSBAIGVsc2UgQHN1YlRpdGxlX2ZyYW1lLmRlc3Ryb3koKVxuXHRcdGlmIEBvcHQudGl0bGUgaXNudCB1bmRlZmluZWQgdGhlbiBAdGl0bGVfZnJhbWUucGFyZW50ID0gQCBlbHNlIEB0aXRsZV9mcmFtZS5kZXN0cm95KClcblx0XHRpZiBAb3B0Lmljb25MZWZ0IGlzbnQgdW5kZWZpbmVkIHRoZW4gQGljb25MZWZ0X2xheWVyLnBhcmVudCA9IEAgZWxzZSBAaWNvbkxlZnRfbGF5ZXIuZGVzdHJveSgpXG5cdFx0aWYgQG9wdC5pY29uUmlnaHQgaXNudCB1bmRlZmluZWQgdGhlbiBAaWNvblJpZ2h0X2xheWVyLnBhcmVudCA9IEAgZWxzZSBAaWNvblJpZ2h0X2xheWVyLmRlc3Ryb3koKVxuXHRcdGlmIEBvcHQubGlua0xlZnQgaXNudCB1bmRlZmluZWQgdGhlbiBAbGlua0xlZnRfZnJhbWUucGFyZW50ID0gQCBlbHNlIEBsaW5rTGVmdF9mcmFtZS5kZXN0cm95KClcblx0XHRpZiBAb3B0LmxpbmtSaWdodCBpc250IHVuZGVmaW5lZCB0aGVuIEBsaW5rUmlnaHRfZnJhbWUucGFyZW50ID0gQCBlbHNlIEBsaW5rUmlnaHRfZnJhbWUuZGVzdHJveSgpXG5cdFx0aWYgQG9wdC5iYWcgaXNudCB1bmRlZmluZWQgdGhlbiBAYmFnX2ZyYW1lLnBhcmVudCA9IEAgZWxzZSBAYmFnX2ZyYW1lLmRlc3Ryb3koKVxuXHRcdGlmIEBvcHQuc2VhcmNoIGlzbnQgdW5kZWZpbmVkIHRoZW4gQHNlYXJjaF9mcmFtZS5wYXJlbnQgPSBAIGVsc2UgQHNlYXJjaF9mcmFtZS5kZXN0cm95KClcblxuXHQjIyMjIyMjIyMjIyMjIyBHRVQsIFNFVCBBVFJJQlVURVMgIyMjIyMjIyMjIyMjIyMjXG5cblx0QGRlZmluZSBcInN1YlRpdGxlXCIsIFxuXHRcdGdldDogLT4gQG9wdC5zdWJUaXRsZSxcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHQuc3ViVGl0bGUgPSB2YWx1ZVxuXHRcdFx0QHN1YlRpdGxlX2ZyYW1lLnRleHQgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJ0aXRsZVwiLCBcblx0XHRnZXQ6IC0+IEBvcHQudGl0bGUsXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0LnRpdGxlID0gdmFsdWVcblx0XHRcdEB0aXRsZV9mcmFtZS50ZXh0ID0gdmFsdWVcblxuXG5cdEBkZWZpbmUgXCJpY29uTGVmdFwiLCBcblx0XHRnZXQ6IC0+IEBvcHQuaWNvbkxlZnQsXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QG9wdC5pY29uTGVmdCA9IHZhbHVlXG5cdFx0XHRAaWNvbkxlZnRfbGF5ZXIuaW1hZ2UgPSBcIm1vZHVsZXMvRkZLaXQvYXNzZXRzL2ljb25zLyN7dmFsdWV9LnN2Z1wiXG5cblx0QGRlZmluZSBcImxpbmtMZWZ0XCIsIFxuXHRcdGdldDogLT4gQG9wdC5saW5rTGVmdCxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAb3B0LmxpbmtMZWZ0ID0gdmFsdWVcblx0XHRcdEBsaW5rTGVmdF9mcmFtZS50ZXh0ID0gdmFsdWVcblxuXHRAZGVmaW5lIFwiaWNvblJpZ2h0XCIsXG5cdFx0Z2V0OiAtPiBAb3B0Lmljb25SaWdodCxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAb3B0Lmljb25SaWdodCA9IHZhbHVlXG5cdFx0XHRAaWNvblJpZ2h0X2xheWVyLmltYWdlID0gXCJtb2R1bGVzL0ZGS2l0L2Fzc2V0cy9pY29ucy8je3ZhbHVlfS5zdmdcIlxuXG5cblx0QGRlZmluZSBcImxpbmtSaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBvcHQubGlua1JpZ2h0LFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBvcHQubGlua1JpZ2h0ID0gdmFsdWVcblx0XHRcdEBsaW5rUmlnaHRfZnJhbWUudGV4dCA9IHZhbHVlXG5cblx0QGRlZmluZSBcImJhZ1wiLCBcblx0XHRnZXQ6IC0+IEBvcHQuYmFnLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdCMgSGFyZGNvZGVkIGJhZyBpY29uIHdpdGggY291bnRlclxuXHRcdFx0QG9wdC5iYWcgPSB2YWx1ZVxuXHRcdFx0QGJhZ19mcmFtZS5zZWxlY3RDaGlsZChcImJhZ19udW1iZXJcIikudGV4dCA9IHZhbHVlXG5cdFx0XHRAc2VhcmNoX2ZyYW1lLm1heFggPSBAYmFnX2ZyYW1lLnggLSAxOFxuXG5cdEBkZWZpbmUgXCJzZWFyY2hcIiwgXG5cdFx0Z2V0OiAtPiBAb3B0LnNlYXJjaCxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHQjIEhhcmRjb2RlZCBzZWFyY2ggaWNvblxuXHRcdFx0IyBEb2VzIG5vdCBoYXZlIHZhbHVlZCB0byBtb2RpZnlcblxuXHRAZGVmaW5lIFwibm9iZ1wiLCBcblx0XHRnZXQ6IC0+IEBvcHQubm9iZyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMDApXCIiLCIjIyMjIyMjIyMjIyMjIyBTVEFUVVMgQkFSICMjIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuRkZTY3JvbGxDb21wb25lbnQgZXh0ZW5kcyBTY3JvbGxDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChAb3B0PXt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcbiIsIiMjIyMjIyMjIyMjIyMjIFVzYWdlIGV4YW1wbGUgIyMjIyMjIyMjIyMjIyMjXG4jIGlucHV0ID0gbmV3IEZGSW5wdXRcbiMgXHRsYWJlbFRleHQ6IFwiRmlyc3QgbmFtZVwiXG4jIFx0cGxhY2Vob2xkZXJUZXh0OiBcIlBsYWNlaG9sZGVyIHRlc3RcIlxuIyBcdGhlbHBlclRleHQ6IFwiVGhpcyBpcyBoZWxwZXIgdGV4dFwiXG4jIFx0dmFsdWU6IFwiSW5wdXQgdmFsdWVcIlxuXG4jIyMjIyMjIyMjIyMjIyBGRiBpbnB1dCAjIyMjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5GRklucHV0IGV4dGVuZHMgTGF5ZXJcblx0Y21wX2ZyYW1lID0gZmZfaW5wdXRcblx0aW5pdGlhbElucHV0UHJvcHMgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJpbnB1dFwiKS5wcm9wc1xuXHRpbml0aWFsSW5wdXRUZXh0UHJvcHMgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJwbGFjZWhvbGRlclwiKS5wcm9wc1xuXHRfaU9TRGV2aWNlID0gISFuYXZpZ2F0b3IucGxhdGZvcm0ubWF0Y2goL2lQaG9uZXxpUG9kfGlQYWQvKVxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0PXt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHdpZHRoOiBjbXBfZnJhbWUud2lkdGhcblx0XHRcdGhlaWdodDogY21wX2ZyYW1lLmhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBjbXBfZnJhbWUuYmFja2dyb3VuZENvbG9yXG5cdFx0XG5cdFx0IyBMYWJlbCB0ZXh0XG5cdFx0aWYgQG9wdC5sYWJlbFRleHRcblx0XHRcdEBsYWJlbFRleHQgPSBjbXBfZnJhbWUuc2VsZWN0Q2hpbGQoXCJpbnB1dF9sYWJlbFwiKS5jb3B5KClcblx0XHRcdEBsYWJlbFRleHQucHJvcHMgPVxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0dGV4dDogQG9wdC5sYWJlbFRleHRcblx0XHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXHRcdFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0XHRcblx0XHQjIFBvc2l0aW9uIGFmdGVyIGFub3RoZXIgbGF5ZXIvb2JqZWN0XG5cdFx0aWYgQG9wdC5hZnRlciBpc250IHVuZGVmaW5lZFxuXHRcdFx0cG9zaXRpb25BZnRlcihAb3B0LmFmdGVyLCBAKVxuXG5cdFx0IyBJbnB1dCBmcmFtZVxuXHRcdEBpbnB1dCA9IG5ldyBJbnB1dFxuXHRcdFx0bmFtZTogXCJGRiBpbnB1dFwiXG5cdFx0XHR2YWx1ZTogQG9wdC52YWx1ZVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBpbml0aWFsSW5wdXRQcm9wcy54LCB5OiBpZiBAb3B0LmxhYmVsVGV4dCB0aGVuIGluaXRpYWxJbnB1dFByb3BzLnkgZWxzZSAwXG5cdFx0XHR3aWR0aDogQHdpZHRoIC0gTV9zcGFjZXIqMiwgaGVpZ2h0OiBpbml0aWFsSW5wdXRQcm9wcy5oZWlnaHRcblx0XHRcdHRleHQ6IEBvcHQucGxhY2Vob2xkZXJUZXh0XG5cdFx0XHRib3JkZXJSYWRpdXM6IGluaXRpYWxJbnB1dFByb3BzLmJvcmRlclJhZGl1c1xuXHRcdFx0Ym9yZGVyV2lkdGg6IGluaXRpYWxJbnB1dFByb3BzLmJvcmRlcldpZHRoXG5cdFx0XHRib3JkZXJDb2xvcjogaW5pdGlhbElucHV0UHJvcHMuYm9yZGVyQ29sb3Jcblx0XHRcdGNvbG9yOiBpZiBAb3B0LnBsYWNlaG9sZGVyVGV4dCB0aGVuIGluaXRpYWxJbnB1dFRleHRQcm9wcy5jb2xvciBlbHNlIFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0cGFkZGluZzpcblx0XHRcdFx0bGVmdDogaW5pdGlhbElucHV0VGV4dFByb3BzLnhcblxuXHRcdEBpbnB1dC5faW5wdXRFbGVtZW50LnN0eWxlLmZvbnRGYW1pbHkgPSBpbml0aWFsSW5wdXRUZXh0UHJvcHMuZm9udEZhbWlseVxuXHRcdEBpbnB1dC5faW5wdXRFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXG5cdFx0XHRpZiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyBpcyAyIGFuZCBfaU9TRGV2aWNlIGlzIHRydWVcblx0XHRcdFx0XCIje2luaXRpYWxJbnB1dFRleHRQcm9wcy5mb250U2l6ZSoyfXB4XCJcblx0XHRcdGVsc2UgaWYgd2luZG93LmRldmljZVBpeGVsUmF0aW8gaXMgMVxuXHRcdFx0XHRcIiN7aW5pdGlhbElucHV0VGV4dFByb3BzLmZvbnRTaXplKjJ9cHhcIlxuXHRcdFx0ZWxzZSBpZiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyBpcyAzIGFuZCBfaU9TRGV2aWNlIGlzIHRydWVcblx0XHRcdFx0XCIje2luaXRpYWxJbnB1dFRleHRQcm9wcy5mb250U2l6ZSozfXB4XCJcblx0XHRcdGVsc2UgaWYgRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlIGlzIFwiYXBwbGUtaXBob25lLXgtc3BhY2UtZ3JheVwiIG9yIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSBpcyBcImFwcGxlLWlwaG9uZS14LXNpbHZlclwiXG5cdFx0XHRcdFwiI3tpbml0aWFsSW5wdXRUZXh0UHJvcHMuZm9udFNpemUqM31weFwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdFwiI3tpbml0aWFsSW5wdXRUZXh0UHJvcHMuZm9udFNpemV9cHhcIlxuXG5cdFx0QGlucHV0Ll9pbnB1dEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gKHBhcnNlSW50KEBpbnB1dC5faW5wdXRFbGVtZW50LnN0eWxlLmhlaWdodCktNCkgKyBcInB4XCJcblxuXHRcdCMgSGVscGVyIHRleHRcblx0XHRpZiBAb3B0LmhlbHBlclRleHRcblx0XHRcdEBoZWxwZXJUZXh0ID0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiaGVscGVyX3RleHRcIikuY29weSgpXG5cdFx0XHRAaGVscGVyVGV4dC5wcm9wcyA9XG5cdFx0XHRcdHk6IEBpbnB1dC5tYXhZICsgKGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcImhlbHBlcl90ZXh0XCIpLnkgLSAoaW5pdGlhbElucHV0UHJvcHMueSArIGluaXRpYWxJbnB1dFByb3BzLmhlaWdodCkpXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR0ZXh0OiBAb3B0LmhlbHBlclRleHRcblx0XHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXHRcdFxuXHRcdEBoZWlnaHQgPSBpZiBAb3B0LmhlbHBlclRleHRcblx0XHRcdFx0QGhlbHBlclRleHQubWF4WSArIChjbXBfZnJhbWUuaGVpZ2h0IC0gY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiaGVscGVyX3RleHRcIikubWF4WSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y21wX2ZyYW1lLmhlaWdodCAtIGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcImhlbHBlcl90ZXh0XCIpLmhlaWdodFxuXHRcdFxuXHQjIE1ldGhvZHMgKClcblx0Zm9jdXM6ID0+XG5cdFx0QGlucHV0LmZvY3VzKCkiLCIjIyMjIyMjIyMjIyMjIyBBREQgVE8gQkFHIEJVVFRPTiAjIyMjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5CdXR0b25GaXhlZCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdCA9IHt9KSAtPlxuXHRcdGNtcF9mcmFtZSA9IGJ1dHRvbl9maXhlZFxuXG5cdFx0QGZpeGVkX2J0biA9IG5ldyBCdXR0b25cblx0XHRcdG5hbWU6IFwiYnV0dG9uXCJcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiY3RhXCIpLnlcblx0XHRcdHdpZHRoOiBjbXBfZnJhbWUud2lkdGggLSBMX3NwYWNlclxuXHRcdFx0dGV4dDogY21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiYnV0dG9uX3RleHRcIikudGV4dFxuXHRcdGNtcF9mcmFtZS5zZWxlY3RDaGlsZChcImN0YVwiKS5kZXN0cm95KClcblxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IGNtcF9mcmFtZS53aWR0aFxuXHRcdFx0aGVpZ2h0OiBpZiBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgaXMgXCJhcHBsZS1pcGhvbmUteC1zcGFjZS1ncmF5XCIgdGhlbiA5MCBlbHNlIGNtcF9mcmFtZS5oZWlnaHRcblx0XHRcdHk6IEFsaWduLmJvdHRvbSgpXG5cdFx0XHRpbWFnZTogY21wX2ZyYW1lLmltYWdlIFxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuIFxuXHRcdGlmIEBvcHQudGFyZ2V0IGlzbnQgdW5kZWZpbmVkIFxuXHRcdFx0dGFyZ2V0RGVzaWduTW9kZShAb3B0LnRhcmdldCwgQClcblxuXG5cdFx0QGZpeGVkX2J0bi5wYXJlbnQgPSBAXG5cblxuXHQjIyMjIyMjIyMjIyMjIyBHRVQsIFNFVCBBVFJJQlVURVMgIyMjIyMjIyMjIyMjIyMjXG5cblx0QGRlZmluZSBcInRleHRcIixcblx0XHRnZXQ6IC0+IEBvcHQudGV4dFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdC50ZXh0ID0gdmFsdWVcblx0XHRcdEBmaXhlZF9idG4udGV4dCA9IHZhbHVlXG4iLCIjIyMjIyMjIyMjIyMjIyBCVVRUT05TICMjIyMjIyMjIyMjIyMjI1xuY2xhc3Mgd2luZG93LkJ1dHRvbiBleHRlbmRzIExheWVyXG5cblx0dGFnQnV0dG9uSWNvbiA9IHRhZ19idXR0b25faWNvbl9sYXlvdXQuc2VsZWN0Q2hpbGQoXCJidXR0b25faWNvblwiKVxuXHRidXR0b25JY29uID0gYnV0dG9uX2ljb25fbGF5b3V0LnNlbGVjdENoaWxkKFwiYnV0dG9uX2ljb25cIilcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHQ9e30pIC0+XG5cdFx0IyBTd2l0Y2ggYnV0dG9ucyB0eXBlIGFuZCBwcm9wZXJ0aWVzIGZvciB0aGVtIFxuXHRcdF8uZGVmYXVsdHMgQG9wdCxcblx0XHRcdHN3aXRjaCBAb3B0LnR5cGVcblx0XHRcdFx0d2hlbiBcInByaW1hcnlcIiwgdW5kZWZpbmVkXG5cdFx0XHRcdFx0QHJlZmVyZW5jZUJ0biA9IHByaW1hcnlfYnV0dG9uXG5cdFx0XHRcdFx0dGV4dDogQHJlZmVyZW5jZUJ0bi5zZWxlY3RDaGlsZChcImJ1dHRvbl90ZXh0XCIpLnRleHRcblx0XHRcdFx0XHRpY29uSW52ZXJ0VmFsdWU6IDFcblx0XHRcdFx0d2hlbiBcInNlY29uZGFyeVwiXG5cdFx0XHRcdFx0QHJlZmVyZW5jZUJ0biA9IHNlY29uZGFyeV9idXR0b25cblx0XHRcdFx0XHR0ZXh0OiBAcmVmZXJlbmNlQnRuLnNlbGVjdENoaWxkKFwiYnV0dG9uX3RleHRcIikudGV4dFxuXHRcdFx0XHR3aGVuIFwidGVydGlhcnlcIlxuXHRcdFx0XHRcdEByZWZlcmVuY2VCdG4gPSB0ZXJ0aWFyeV9idXR0b25cblx0XHRcdFx0XHR0ZXh0OiBAcmVmZXJlbmNlQnRuLnNlbGVjdENoaWxkKFwiYnV0dG9uX3RleHRcIikudGV4dFxuXHRcdFx0XHR3aGVuIFwiZmxhdFwiXG5cdFx0XHRcdFx0QHJlZmVyZW5jZUJ0biA9IGZsYXRfYnV0dG9uXG5cdFx0XHRcdFx0dGV4dDogQHJlZmVyZW5jZUJ0bi5zZWxlY3RDaGlsZChcImJ1dHRvbl90ZXh0XCIpLnRleHRcblx0XHRcdFx0d2hlbiBcInRhZ1wiXG5cdFx0XHRcdFx0QHJlZmVyZW5jZUJ0biA9IHRhZ19idXR0b25cblx0XHRcdFx0XHR0ZXh0OiBAcmVmZXJlbmNlQnRuLnNlbGVjdENoaWxkKFwiYnV0dG9uX3RleHRcIikudGV4dFxuXHRcdFx0XHRcdHNpZGVQYWRkaW5nczogU19zcGFjZXJcblx0XHRcdFx0XHRpY29uTWFyZ2luOiBYU19zcGFjZXJcblxuXHRcdCMgY29weSBhbGwgcGFyYW1ldHJzIGFuZCByZXNldCBmb250LWZhbWlseSBhbmQgZm9udC1zaXplIHRvIGRlZmF1bHQgZm9udHNcblx0XHRAYnRuVGV4dCA9IEByZWZlcmVuY2VCdG4uc2VsZWN0Q2hpbGQoXCJidXR0b25fdGV4dFwiKS5jb3B5KClcblx0XHRAYnRuVGV4dC5wcm9wcyA9XG5cdFx0XHRuYW1lOiBcInRleHRfYnRuXCJcblx0XHRcdHRleHQ6IEBvcHQudGV4dFxuXHRcdFx0d2hpdGVTcGFjZTogXCJub3dyYXBcIlxuXG5cdFx0dGFnQnRuSWNvblJpZ2h0TWFyZ2luID0gdGFnX2J1dHRvbl9pY29uX2xheW91dC53aWR0aCAtIHRhZ0J1dHRvbkljb24ubWF4WFxuXG5cdFx0IyBJbmNsdWRlIG90aGVyIHByb3BlcnRpZXNcblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHR3aWR0aDogc3dpdGNoXG5cdFx0XHRcdHdoZW4gQG9wdC50eXBlIGlzIFwidGFnXCIgYW5kIEBvcHQuaWNvbiBpcyB1bmRlZmluZWRcblx0XHRcdFx0XHRAYnRuVGV4dC53aWR0aCArIEBvcHQuc2lkZVBhZGRpbmdzKjJcblx0XHRcdFx0d2hlbiBAb3B0LnR5cGUgaXMgXCJ0YWdcIiBhbmQgQG9wdC5pY29uIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRcdFx0QGJ0blRleHQud2lkdGggKyBAb3B0LnNpZGVQYWRkaW5ncyArIHRhZ0J0bkljb25SaWdodE1hcmdpbiArIHRhZ0J1dHRvbkljb24ud2lkdGggKyBAb3B0Lmljb25NYXJnaW5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdEByZWZlcmVuY2VCdG4ud2lkdGhcblx0XHRcdGhlaWdodDogQHJlZmVyZW5jZUJ0bi5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQHJlZmVyZW5jZUJ0bi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdGJvcmRlclJhZGl1czogQHJlZmVyZW5jZUJ0bi5ib3JkZXJSYWRpdXNcblx0XHRcdGJvcmRlcldpZHRoOiBAcmVmZXJlbmNlQnRuLmJvcmRlcldpZHRoXG5cdFx0XHRib3JkZXJDb2xvcjogQHJlZmVyZW5jZUJ0bi5ib3JkZXJDb2xvclxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0QGJ0blRleHQucGFyZW50ID0gQFxuXHRcdEBidG5UZXh0LmF1dG9XaWR0aCA9IHRydWVcblxuXHRcdEBidG5UZXh0LnggPSBzd2l0Y2hcblx0XHRcdHdoZW4gQG9wdC50eXBlIGlzIFwidGFnXCIgYW5kIEBvcHQuaWNvbkFsaWduIGlzIFwibGVmdFwiXG5cdFx0XHRcdEFsaWduLmxlZnQodGFnQnRuSWNvblJpZ2h0TWFyZ2luICsgdGFnQnV0dG9uSWNvbi53aWR0aCArIEBvcHQuaWNvbk1hcmdpbilcblx0XHRcdHdoZW4gQG9wdC50eXBlIGlzIFwidGFnXCIgYW5kIEBvcHQuaWNvbiBpc250IHVuZGVmaW5lZCBcblx0XHRcdFx0QWxpZ24ubGVmdChAb3B0LnNpZGVQYWRkaW5ncylcblx0XHRcdGVsc2Vcblx0XHRcdFx0QWxpZ24uY2VudGVyKClcblxuXHRcdCMgQ3JlYXRlIGljb25cdFxuXHRcdGlmIEBvcHQuaWNvbiBpc250IHVuZGVmaW5lZFxuXHRcdFx0QGljb24gPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdG5hbWU6IFwiaWNvbl9idG5cIlxuXHRcdFx0XHR3aWR0aDogYnV0dG9uSWNvbi53aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IGJ1dHRvbkljb24uaGVpZ2h0XG5cdFx0XHRcdHk6IEFsaWduLmNlbnRlcigpXHRcblx0XHRcdFx0eDogc3dpdGNoXG5cdFx0XHRcdFx0d2hlbiBAb3B0LnR5cGUgaXMgXCJ0YWdcIiBhbmQgQG9wdC5pY29uQWxpZ24gaXMgXCJsZWZ0XCJcblx0XHRcdFx0XHRcdEBidG5UZXh0LnggLSB0YWdCdXR0b25JY29uLndpZHRoIC0gQG9wdC5pY29uTWFyZ2luXG5cdFx0XHRcdFx0d2hlbiBAb3B0LnR5cGUgaXMgXCJ0YWdcIlxuXHRcdFx0XHRcdFx0QWxpZ24ucmlnaHQoLSh0YWdfYnV0dG9uX2ljb25fbGF5b3V0LndpZHRoIC0gdGFnX2J1dHRvbl9pY29uX2xheW91dC5zZWxlY3RDaGlsZChcImJ1dHRvbl9pY29uXCIpLm1heFgpKVxuXHRcdFx0XHRcdHdoZW4gQG9wdC5pY29uQWxpZ24gaXMgXCJsZWZ0XCJcblx0XHRcdFx0XHRcdEFsaWduLmxlZnQoQHJlZmVyZW5jZUJ0bi53aWR0aCAtIGJ1dHRvbkljb24ubWF4WClcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRBbGlnbi5yaWdodCgtKEByZWZlcmVuY2VCdG4ud2lkdGggLSBidXR0b25JY29uLm1heFgpKVxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjIpXCJcblx0XHRcdEBpY29uLnN0eWxlID1cblx0XHRcdFwiZmlsdGVyXCI6IFwiaW52ZXJ0KCN7QG9wdC5pY29uSW52ZXJ0VmFsdWV9KVwiXG5cdFx0XHRpZiBfLmlzU3RyaW5nKEBvcHQuaWNvbilcblx0XHRcdFx0QGljb24ucHJvcHMgPVxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XHRcdCMgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC4yKVwiICMgQ29tZW50ZWQgbGluZSB0byBzZWUgdGhlIGNvbnRhaW5lclxuXHRcdFx0XHRcdGltYWdlOiBcIm1vZHVsZXMvRkZLaXQvYXNzZXRzL2ljb25zLyN7QG9wdC5pY29ufS5zdmdcIlxuXG5cdFx0IyBXYXRjaCBmb3Igd2lkdGggY2hhbmdlcyBhbmQgc2V0IHVwIG5ldyBwcm9wZXJ0aWVzIGZvciBjaGlsZHJlblxuXHRcdEAub24gXCJjaGFuZ2U6d2lkdGhcIiwgLT5cblx0XHRcdEBidG5UZXh0LnggPSBBbGlnbi5jZW50ZXIoKVxuXHRcdFx0aWYgQG9wdC50eXBlIGlzIFwidGFnXCIgYW5kIEBvcHQuaWNvbiBpc250IHVuZGVmaW5lZFxuXHRcdFx0XHRAYnRuVGV4dC54ID0gQWxpZ24uY2VudGVyKC10YWdCdXR0b25JY29uLndpZHRoLzIpXG5cdFx0XHRcdEBpY29uLnggPSBAYnRuVGV4dC5tYXhYICsgQG9wdC5pY29uTWFyZ2luXG5cdFx0XHRlbHNlIGlmIEBvcHQuaWNvbiBpc250IHVuZGVmaW5lZFxuXHRcdFx0XHRAaWNvbi54ID0gc3dpdGNoXG5cdFx0XHRcdFx0d2hlbiBAb3B0Lmljb25BbGlnbiBpcyBcImxlZnRcIlxuXHRcdFx0XHRcdFx0QWxpZ24ubGVmdChAcmVmZXJlbmNlQnRuLndpZHRoIC0gYnV0dG9uSWNvbi5tYXhYKVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdEFsaWduLnJpZ2h0KC0oQHJlZmVyZW5jZUJ0bi53aWR0aCAtIGJ1dHRvbkljb24ubWF4WCkpXG5cblx0QGRlZmluZSBcInRleHRcIixcblx0XHRnZXQ6IC0+IFxuXHRcdFx0QGJ0blRleHQudGV4dFxuXHRcdHNldDogKHZhbCkgLT5cblx0XHRcdEBidG5UZXh0LnRleHQgPSB2YWxcblx0XHRcdEBidG5UZXh0LnggPSBBbGlnbi5jZW50ZXIoKVxuXHRcdFx0c3dpdGNoXG5cdFx0XHRcdHdoZW4gQG9wdC50eXBlIGlzIFwidGFnXCIgYW5kIEBpY29uIGlzbnQgdW5kZWZpbmVkIGFuZCBAb3B0Lmljb25BbGlnbiBpcyBcImxlZnRcIlxuXHRcdFx0XHRcdEB3aWR0aCA9IEBidG5UZXh0LndpZHRoICsgQG9wdC5zaWRlUGFkZGluZ3MqMiArIGJ1dHRvbkljb24ud2lkdGggKyBAb3B0Lmljb25NYXJnaW5cblx0XHRcdFx0XHRAYnRuVGV4dC54ID0gQWxpZ24uY2VudGVyKChidXR0b25JY29uLndpZHRoICsgQG9wdC5pY29uTWFyZ2luKS8yKVxuXHRcdFx0XHRcdEBpY29uLnggPSBAYnRuVGV4dC54IC0gYnV0dG9uSWNvbi53aWR0aCAtIEBvcHQuaWNvbk1hcmdpblxuXHRcdFx0XHR3aGVuIEBvcHQudHlwZSBpcyBcInRhZ1wiIGFuZCBAaWNvbiBpc250IHVuZGVmaW5lZFxuXHRcdFx0XHRcdEBpY29uLnggPSBAYnRuVGV4dC5tYXhYICsgQG9wdC5pY29uTWFyZ2luXG5cdFx0XHRcdFx0QHdpZHRoID0gQGJ0blRleHQud2lkdGggKyBAb3B0LnNpZGVQYWRkaW5ncyoyICsgYnV0dG9uSWNvbi53aWR0aCArIEBvcHQuaWNvbk1hcmdpblxuXHRcdFx0XHR3aGVuIEBvcHQudHlwZSBpcyBcInRhZ1wiIGFuZCBAb3B0Lmljb24gaXMgdW5kZWZpbmVkXG5cdFx0XHRcdFx0QHdpZHRoID0gQGJ0blRleHQud2lkdGggKyBAb3B0LnNpZGVQYWRkaW5ncyoyXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRAYnRuVGV4dC54ID0gQWxpZ24uY2VudGVyKClcblxuIiwiIyMjIyMjIyMjIyMgVXNhZ2UgZXhhbXBsZSAjIyMjIyMjIyMjI1xuIyBidG5BID0gbmV3IEJ1dHRvblxuIyBcdHRleHQ6IFwiU2hvdyBhY3Rpb24gc2hlZXRcIlxuIyBcdHk6IDEwMCwgeDogQWxpZ24uY2VudGVyXG5cbiMgYWN0aW9uU2hlZXQgPSBuZXcgQWN0aW9uU2hlZXRcbiMgXHRjb250ZW50OiBteV9hY3Rpb25zaGVldF9jb250ZW50XG4jIFx0YnV0dG9uOlxuIyBcdFx0dGV4dDogXCJQdXJjaGFzZVwiXG4jIFx0XHR3aWR0aDogMTE2XG4jIFx0XHR2aXNpYmxlOiBmYWxzZVxuIyBcdHRpdGxlOlxuIyBcdFx0dmlzaWJsZTogdHJ1ZVxuIyBcdFx0dGV4dDogXCJIZWxsbyFcIlxuXG4jIGJ0bkEub25UYXAgLT5cbiMgXHRhY3Rpb25TaGVldC5zaG93KClcblxuIyMjIyMjIyMjIyMgSG9tZVNlYXJjaCAjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5BY3Rpb25TaGVldCBleHRlbmRzIExheWVyXG5cdGNtcF9mcmFtZSA9IGFjdGlvbnNoZWV0X2NvbnRhaW5lclxuXHRhY3Rpb25TaGVldF9mcmFtZSA9IGFjdGlvbnNoZWV0X2NvbnRhaW5lci5zZWxlY3RDaGlsZChcImFjdGlvbnNoZWV0X2NtcFwiKVxuXHRjb250ZW50X2ZyYW1lID0gYWN0aW9uc2hlZXRfY29udGFpbmVyLnNlbGVjdENoaWxkKFwiY29udGVudFwiKVxuXHRhZGRpdGlvbmFsSGVpZ2h0ID0gNDBcblx0XG5cdGJ1dHRvblByb3BzID1cblx0XHR0ZXh0OiBhY3Rpb25zaGVldF9jb250YWluZXIuc2VsZWN0Q2hpbGQoXCJjdGFfdGV4dFwiKS50ZXh0XG5cdFx0d2lkdGg6IGFjdGlvbnNoZWV0X2NvbnRhaW5lci5zZWxlY3RDaGlsZChcImhlYWRlcl9jdGFcIikud2lkdGhcblx0XHR2aXNpYmxlOiB0cnVlXG5cdFxuXHR0aXRsZVByb3BzID1cblx0XHR0ZXh0OiBhY3Rpb25zaGVldF9jb250YWluZXIuc2VsZWN0Q2hpbGQoXCJoZWFkZXJfdGl0bGVcIikudGV4dFxuXHRcdHZpc2libGU6IGZhbHNlXG5cblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0Y29udGVudDogY29udGVudF9mcmFtZVxuXHRcdFx0YnV0dG9uOiB7fVxuXHRcdFx0dGl0bGU6IHt9XG5cdFx0XG5cdFx0IyBSZXBsYWNlIGEgJ3RhcmdldCcgZnJvbSBkZXNpZ25lIG1vZGUuXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXG5cdFx0IyBDbG9zZSBvbiB0YXAgYXJlYVxuXHRcdEBjbG9zZWFyZWFfZnJhbWUgPSBhY3Rpb25zaGVldF9jb250YWluZXIuc2VsZWN0Q2hpbGQoXCJjbG9zZV9hcmVhXCIpLmNvcHkoKVxuXHRcdEBjbG9zZWFyZWFfZnJhbWUucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiAwLCB5OiAwXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHQsIHdpZHRoOiBAd2lkdGhcblx0XG5cdFx0IyBBY3Rpb25TaGVldCBjb21wb25lbnQgXG5cdFx0QGFjdGlvbnNoZWV0ID0gYWN0aW9uc2hlZXRfY29udGFpbmVyLnNlbGVjdENoaWxkKFwiYWN0aW9uc2hlZXRfY21wXCIpLmNvcHkoKVxuXHRcdEBhY3Rpb25zaGVldC5wcm9wcyA9XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IDBcblx0XHRcblx0XHQjIENyZWF0ZSBjb250ZW50IHRhcmdldFxuXHRcdEBjb250ZW50ID0gQG9wdC5jb250ZW50XG5cdFx0QGNvbnRlbnQucHJvcHMgPVxuXHRcdFx0cGFyZW50OiBAYWN0aW9uc2hlZXRcblx0XHRcdHg6IDAsIHk6IGNvbnRlbnRfZnJhbWUueVxuXHRcdFxuXHRcdEBhY3Rpb25zaGVldC5zZWxlY3RDaGlsZChcImNvbnRlbnRcIikuZGVzdHJveSgpXG5cdFx0XG5cdFx0QGFjdGlvbnNoZWV0LmhlaWdodCA9IEBjb250ZW50Lm1heFkgKyBhZGRpdGlvbmFsSGVpZ2h0XG5cdFx0QGFjdGlvbnNoZWV0LnkgPSBBbGlnbi5ib3R0b20oQGFjdGlvbnNoZWV0LmhlaWdodClcblx0XHRcblx0XHQjIEFjdGlvblNoZWV0IGJ1dHRvblxuXHRcdEBoZWFkZXJCdXR0b24gPSBuZXcgQnV0dG9uXG5cdFx0XHRuYW1lOiBcIkNUQSBidXR0b25cIlxuXHRcdFx0cGFyZW50OiBAYWN0aW9uc2hlZXQuc2VsZWN0Q2hpbGQoXCJoZWFkZXJcIilcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0oYWN0aW9uU2hlZXRfZnJhbWUud2lkdGggLSBAYWN0aW9uc2hlZXQuc2VsZWN0Q2hpbGQoXCJoZWFkZXJfY3RhXCIpLm1heFgpKSwgeTogQGFjdGlvbnNoZWV0LnNlbGVjdENoaWxkKFwiaGVhZGVyX2N0YVwiKS55XG5cdFx0XHR3aWR0aDogaWYgQG9wdC5idXR0b24ud2lkdGggaXMgdW5kZWZpbmVkIHRoZW4gYnV0dG9uUHJvcHMud2lkdGggZWxzZSBAb3B0LmJ1dHRvbi53aWR0aFxuXHRcdFx0dGV4dDogaWYgQG9wdC5idXR0b24udGV4dCBpcyB1bmRlZmluZWQgdGhlbiBidXR0b25Qcm9wcy50ZXh0IGVsc2UgQG9wdC5idXR0b24udGV4dFxuXHRcdFx0dmlzaWJsZTogQG9wdC5idXR0b24udmlzaWJsZVxuXHRcdFxuXHRcdEBhY3Rpb25zaGVldC5zZWxlY3RDaGlsZChcImhlYWRlcl9jdGFcIikuZGVzdHJveSgpXG5cdFx0XG5cdFx0IyBBY3Rpb25TaGVldCB0aXRsZVxuXHRcdEBoZWFkZXJUaXRsZSA9IEBhY3Rpb25zaGVldC5zZWxlY3RDaGlsZChcImhlYWRlcl90aXRsZVwiKVxuXHRcdEBoZWFkZXJUaXRsZS5wcm9wcyA9XG5cdFx0XHR2aXNpYmxlOiBpZiBAb3B0LnRpdGxlLnZpc2libGUgaXMgdW5kZWZpbmVkIHRoZW4gdGl0bGVQcm9wcy52aXNpYmxlIGVsc2UgQG9wdC50aXRsZS52aXNpYmxlXG5cdFx0XHRhdXRvSGVpZ2h0OiB0cnVlXG5cdFx0XHR0ZXh0OiBpZiBAb3B0LnRpdGxlLnRleHQgaXMgdW5kZWZpbmVkIHRoZW4gdGl0bGVQcm9wcy50ZXh0IGVsc2UgQG9wdC50aXRsZS50ZXh0XG5cdFx0XHRcblx0XHQjIFN0YXRlc1xuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0c2hvdzpcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0aGlkZTpcblx0XHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdGRlbGF5OiAwLjFcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFx0XHRjdXJ2ZTogXCJlYXNlLW91dFwiXG5cdFx0XG5cdFx0QGFjdGlvbnNoZWV0LnN0YXRlcyA9XG5cdFx0XHRzaG93OlxuXHRcdFx0XHR5OiBBbGlnbi5ib3R0b20oYWRkaXRpb25hbEhlaWdodClcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRjdXJ2ZTogU3ByaW5nKHRlbnNpb246IDM4MCwgZnJpY3Rpb246IDMwKVxuXHRcdFx0aGlkZTpcblx0XHRcdFx0eTogQWxpZ24uYm90dG9tKEBhY3Rpb25zaGVldC5oZWlnaHQpXG5cdFx0XHRcdG9wdGlvbnM6IFxuXHRcdFx0XHRcdHRpbWU6IDAuMVxuXHRcdFxuXHRcdCMgQWN0aW9uc1xuXHRcdEBjbG9zZWFyZWFfZnJhbWUub25UYXAgPT5cblx0XHRcdEBhY3Rpb25zaGVldC5hbmltYXRlKFwiaGlkZVwiKVxuXHRcdFx0QGFuaW1hdGUoXCJoaWRlXCIpXG5cdFx0XHRVdGlscy5kZWxheSAwLjMsID0+XG5cdFx0XHRcdEB2aXNpYmxlID0gZmFsc2Vcblx0XHRcblx0XHRAYWN0aW9uc2hlZXQuc2VsZWN0Q2hpbGQoXCJoZWFkZXJfY2xvc2VcIikub25UYXAgPT5cblx0XHRcdEBhY3Rpb25zaGVldC5hbmltYXRlKFwiaGlkZVwiKVxuXHRcdFx0QGFuaW1hdGUoXCJoaWRlXCIpXG5cdFx0XHRVdGlscy5kZWxheSAwLjMsID0+XG5cdFx0XHRcdEB2aXNpYmxlID0gZmFsc2Vcblx0XHRcblx0XHRAYWN0aW9uc2hlZXQub25UYXAgLT5cblx0XHRcdHJldHVybiB0cnVlXG5cdFx0XG5cdCMgTWV0aG9kcyAoKVx0XG5cdHNob3c6IC0+XG5cdFx0QHZpc2libGUgPSB0cnVlXG5cdFx0QGFuaW1hdGUoXCJzaG93XCIpXG5cdFx0QGFjdGlvbnNoZWV0LmFuaW1hdGUoXCJzaG93XCIpIiwiIyMjIyBIb3cgdG8gdXNlICMjIyNcbiMgYWNjTGlzdCA9IG5ldyBBY2NvcmRpb25Hcm91cFxuIyBcdGNoaWxkcmVuOiBbYWNjb3Jpb25BLCBhY2NvcmlvbkIsIGFjY29yaW9uQ10gIyBBZGQgYWNjb3JkaW9ucyBoZXJlXG5cbiMjIyMjIyMjIyMjIEFjY29yZGlvbiBncm91cCBjb21wb25lbnQgIyMjIyMjIyMjIyMjXG5jbGFzcyB3aW5kb3cuQWNjb3JkaW9uR3JvdXAgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHQgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIEBvcHQsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGNoaWxkcmVuOiB1bmRlZmluZWRcblx0XHQjIFJlcGxhY2UgYSAndGFyZ2V0JyBmcm9tIGRlc2lnbmUgbW9kZS4gXG5cdFx0aWYgQG9wdC50YXJnZXQgaXNudCB1bmRlZmluZWQgXG5cdFx0XHR0YXJnZXREZXNpZ25Nb2RlKEBvcHQudGFyZ2V0LCBAKVxuXHRcdCMgUG9zaXRpb24gYWZ0ZXIgYW5vdGhlciBsYXllci9vYmplY3Rcblx0XHRpZiBAb3B0LmFmdGVyIGlzbnQgdW5kZWZpbmVkXG5cdFx0XHRwb3NpdGlvbkFmdGVyKEBvcHQuYWZ0ZXIsIEAsIEBvcHQueSlcblxuXG5cdFx0IyBJZiBhcnJheSBoYXMgbW9ycmUgdGhlbiAyIGl0ZW1zXG5cdFx0aWYgQG9wdC5jaGlsZHJlbi5sZW5ndGggPCAyXG5cdFx0XHRAcHJvcHMgPVxuXHRcdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMCwwLDAuNylcIiwgaHRtbDogXCI8cCBzdHlsZT0nbGluZS1oZWlnaHQ6IDEuMjsgdGV4dC1hbGlnbjogY2VudGVyOyBwYWRkaW5nOiA2MHB4IDQwcHg7IGZvbnQtc2l6ZTogMjJweCc+UGxlYXNlIGluY2x1ZGUgYWNjcm9yaW9uIGl0ZW1zIGFzIGFuIGFycmF5PC9wPlwiXG5cdFx0XHRwcmludCBcIlBsZWFzZSBpbmNsdWRlIGFjY3JvcmlvbiBpdGVtcyBhcyBhbiBhcnJheVwiXG5cdFx0ZWxzZVxuXHRcdFx0IyBBZGQgYWxsIGNoaWxkcmVuXG5cdFx0XHRhZGRDaGlsZHJlbiBALCBAb3B0LmNoaWxkcmVuXG5cdFx0XHRcblx0XHRcdCMgTWFrZSBhIGNvcnJlY3QgWSBwb3NpdGlvblxuXHRcdFx0Zm9yIGNoaWxkLCBpIGluIEBjaGlsZHJlblxuXHRcdFx0XHRjaGlsZC55ID0gMFxuXHRcdFx0XHRjaGlsZC55ID0gbmV4dFBvc1lcblx0XHRcdFx0bmV4dFBvc1kgPSBjaGlsZC5tYXhZXG5cdFx0XHRcdFxuXHRcdFx0XHQjIGNoaWxkLmV4cGFuZGVkID0gZmFsc2Vcblx0XHRcdFx0Y2hpbGQub25UYXAgLT5cblx0XHRcdFx0XHR0b2dnbGVFeHBhbmQoQCwgQGNvbnRlbnQuaW5pdGlhbEhlaWdodClcblx0XHRcdFx0IyBTZXQgdHRoZSBmbGFnXG5cdFx0XHRcdGNoaWxkLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0XHRcdEBoZWlnaHQgPSBAb3B0LmNoaWxkcmVuW0BvcHQuY2hpbGRyZW4ubGVuZ3RoIC0gMV0ubWF4WVxuXG5cdFx0XHRcdFx0aWYgQC5wYXJlbnQgYW5kIEAucGFyZW50Lm5hbWUgaXMgXCJjb250ZW50XCJcblx0XHRcdFx0XHRcdGlmIEAucGFyZW50LnBhcmVudC5jb25zdHJ1Y3Rvci5uYW1lIGlzIFwiU2Nyb2xsQ29tcG9uZW50XCJcblx0XHRcdFx0XHRcdFx0QC5wYXJlbnQucGFyZW50LnVwZGF0ZUNvbnRlbnQoKVxuXHRcdFx0XG5cdFx0XHQjIFNldCBuZXcgcGFyZXJudCBoZWlnaHRcblx0XHRcdEBwcm9wcyA9XG5cdFx0XHRcdHdpZHRoOiBAb3B0LmNoaWxkcmVuWzBdLndpZHRoXG5cdFx0XHRcdGhlaWdodDogQG9wdC5jaGlsZHJlbltAb3B0LmNoaWxkcmVuLmxlbmd0aCAtIDFdLm1heFlcblx0XG5cdCMgVG9vZ2xlIGV4cGFuZCBmdW5jdGlvblxuXHR0b2dnbGVFeHBhbmQgPSAobGF5ZXIsIGRpc3RhbmNlKSAtPlxuXHRcdGRpc3RhbmNlID0gaWYgbGF5ZXIuZXhwYW5kZWQgaXMgZmFsc2UgdGhlbiBkaXN0YW5jZSBlbHNlIC1kaXN0YW5jZVxuXHRcdFxuXHRcdGZvciBzaWIgaW4gbGF5ZXIuc2libGluZ3Ncblx0XHRcdGlmIHNpYi55ID4gbGF5ZXIueVxuXHRcdFx0XHRzaWIuYW5pbWF0ZVxuXHRcdFx0XHRcdHk6IHNpYi55ICsgZGlzdGFuY2Vcblx0XHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdFx0dGltZTogMC4yXG5cdFx0XG5cdFx0bGF5ZXIuZXhwYW5kZWQgPSAhbGF5ZXIuZXhwYW5kZWRcbiIsIiMjIyMgSG93IHRvIHVzZSAjIyMjXG4jIGFjY29yaW9uQSA9IG5ldyBBY2NvcmRpb25cbiMgXHRsYWJlbFRleHQ6IFwiWW91ciB0ZXh0XCJcbiNcdGV4cGFuZGVkOiB0cnVlXG4jIFx0Y29udGVudDogYWNjX2NvbnRfMDEgI1RhcmdldCBmcmFtZSBpbiBEZXNpZ24gbW9kZS4gV29yayB3aXRoIGFueSBsYXllcnNcblxuIyMjIyMjIyMjIyMgQWNjb3JkaW9uIGNvbXBvbmVudCAjIyMjIyMjIyMjIyNcbmNsYXNzIHdpbmRvdy5BY2NvcmRpb24gZXh0ZW5kcyBMYXllclxuXHRjb21wX2ZyYW1lID0gYWNjb3JkaW9uX2NvbXBcblx0Y29tcF9mcmFtZV9pdGVtID0gY29tcF9mcmFtZS5zZWxlY3RDaGlsZChcImFjY29yZGlvbl9pdGVtXCIpXG5cblx0Y29uc3RydWN0b3I6IChAb3B0ID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBAb3B0LFxuXHRcdFx0d2lkdGg6IGNvbXBfZnJhbWUud2lkdGhcblx0XHRcdGhlaWdodDogY29tcF9mcmFtZV9pdGVtLmhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRcdGxhYmVsVGV4dDogXCJsYWJlbFwiXG5cdFx0XHRjb250ZW50OiBjb21wX2ZyYW1lLnNlbGVjdENoaWxkKFwiYWNjb3JkaW9uX2NvbnRlbnRcIilcblx0XHRcdGV4cGFuZGVkOiBmYWxzZVxuXHRcdCMgUmVwbGFjZSBhICd0YXJnZXQnIGZyb20gZGVzaWduZSBtb2RlLiBcblx0XHRpZiBAb3B0LnRhcmdldCBpc250IHVuZGVmaW5lZCBcblx0XHRcdHRhcmdldERlc2lnbk1vZGUoQG9wdC50YXJnZXQsIEApXG5cdFx0IyBQb3NpdGlvbiBhZnRlciBhbm90aGVyIGxheWVyL29iamVjdFxuXHRcdGlmIEBvcHQuYWZ0ZXIgaXNudCB1bmRlZmluZWRcblx0XHRcdHBvc2l0aW9uQWZ0ZXIoQG9wdC5hZnRlciwgQCwgQG9wdC55KVxuXG5cdFx0QGl0ZW0gPSBjb21wX2ZyYW1lX2l0ZW0uY29weSgpXG5cdFx0QGl0ZW0uc2VsZWN0Q2hpbGQoXCJsYWJlbF90ZXh0XCIpLnRleHQgPSBAb3B0LmxhYmVsVGV4dFxuXHRcdEBpdGVtLnNlbGVjdENoaWxkKFwibGFiZWxfdGV4dFwiKS5hdXRvSGVpZ2h0ID0gdHJ1ZVxuXHRcdEBpdGVtSWNvbiA9IEBpdGVtLnNlbGVjdENoaWxkKFwiaWNvblwiKVxuXG5cdFx0QGNvbnRlbnQgPSBAb3B0LmNvbnRlbnQuY29weSgpXG5cdFx0QGNvbnRlbnQuaW5pdGlhbEhlaWdodCA9IEBjb250ZW50LmhlaWdodFxuXHRcdEBjb250ZW50LnByb3BzID0gXG5cdFx0XHR4OiAwLCB5OiBAaXRlbS5tYXhZXG5cdFx0XHRjbGlwOiB0cnVlXG5cblx0XHQjIFJlc2V0XG5cdFx0aWYgQG9wdC5leHBhbmRlZCBpcyBmYWxzZVxuXHRcdFx0QGl0ZW1JY29uLnJvdGF0aW9uID0gMFxuXHRcdFx0QGNvbnRlbnQuaGVpZ2h0ID0gMFxuXHRcdGVsc2Vcblx0XHRcdEBoZWlnaHQgPSBALmhlaWdodCArIEBjb250ZW50LmhlaWdodFxuXHRcdFxuXHRcdGFkZENoaWxkcmVuKEAsIFtAaXRlbSwgQGNvbnRlbnRdKVxuXHRcblx0XHQjIEludGVyYWN0aW9uXG5cdFx0QGl0ZW0ub25UYXAgPT5cblx0XHRcdGlmIEBpdGVtSWNvbi5yb3RhdGlvbiBpcyAwXG5cdFx0XHRcdEBpdGVtSWNvbi5hbmltYXRlXG5cdFx0XHRcdFx0cm90YXRpb246IDE4MFxuXHRcdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcdFx0QGNvbnRlbnQuYW5pbWF0ZVxuXHRcdFx0XHRcdGhlaWdodDogQGNvbnRlbnQuaW5pdGlhbEhlaWdodFxuXHRcdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcdFx0QGFuaW1hdGVcblx0XHRcdFx0XHRoZWlnaHQ6IEBoZWlnaHQgKyBAY29udGVudC5pbml0aWFsSGVpZ2h0XG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAaXRlbUljb24uYW5pbWF0ZVxuXHRcdFx0XHRcdHJvdGF0aW9uOiAwXG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFx0XHRAY29udGVudC5hbmltYXRlXG5cdFx0XHRcdFx0aGVpZ2h0OiAwXG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFx0XHRAYW5pbWF0ZVxuXHRcdFx0XHRcdGhlaWdodDogY29tcF9mcmFtZV9pdGVtLmhlaWdodFxuXHRcdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0XHR0aW1lOiAwLjJcblxuXHRAZGVmaW5lIFwiZXhwYW5kZWRcIixcblx0XHRnZXQ6IC0+IEBvcHQuZXhwYW5kZWRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHQuZXhwYW5kZWQgPSB2YWx1ZSIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBNkdBQTtBRE9BLElBQUE7OztBQUFNLE1BQU0sQ0FBQztBQUNaLE1BQUE7Ozs7RUFBQSxVQUFBLEdBQWE7O0VBQ2IsZUFBQSxHQUFrQixVQUFVLENBQUMsV0FBWCxDQUF1QixnQkFBdkI7O0VBRUwsbUJBQUMsR0FBRDtJQUFDLElBQUMsQ0FBQSxvQkFBRCxNQUFPO0lBQ3BCLDJDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLEdBQVosRUFDTDtNQUFBLEtBQUEs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LEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFELEVBQVcsT0FBWDtTQUVYLFFBQUQsR0FBVTtBQUZFOzs7O0FEQWIsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLFFBQUQsRUFBVyxPQUFYO1NBRVgsUUFBRCxHQUFVO0FBRkU7Ozs7QURBYixNQUFNLENBQUMsR0FBUCxHQUFhLFNBQUMsUUFBRCxFQUFXLE9BQVg7U0FFWCxRQUFELEdBQVU7QUFGRTs7OztBREFiLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBQyxRQUFE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
