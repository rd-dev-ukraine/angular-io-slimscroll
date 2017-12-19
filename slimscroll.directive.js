"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var defaults = {
    width: "auto",
    height: "250px",
    size: "7px",
    color: "#000",
    position: "right",
    distance: "1px",
    start: "top",
    opacity: .4,
    transition: .3,
    alwaysVisible: false,
    disableFadeOut: false,
    railVisible: false,
    railColor: "#333",
    railOpacity: .2,
    railClass: "slimScrollRail",
    barClass: "slimScrollBar",
    wrapperClass: "slimScrollDiv",
    allowPageScroll: false,
    wheelStep: 20,
    touchScrollStep: 200,
    borderRadius: "7px",
    railBorderRadius: "7px",
    scrollTo: 0,
    autoScrollToBottom: false
};
var SlimScroll = /** @class */ (function () {
    function SlimScroll(_renderer, elementRef) {
        var _this = this;
        this._renderer = _renderer;
        this._minBarHeight = 30;
        this._releaseScroll = false;
        this.trackPanelHeightChanged = function () {
            _this._previousHeight = _this._me.scrollHeight;
            _this._changesTracker = window.setInterval(function () {
                if (_this._previousHeight !== _this._me.scrollHeight) {
                    _this._previousHeight = _this._me.scrollHeight;
                    _this.init();
                    if (_this._options.autoScrollToBottom) {
                        _this._renderer.setStyle(_this._bar, "top", _this._me.offsetHeight - _this._bar.offsetHeight + "px");
                        _this.scrollContent(0, true);
                    }
                }
            }, 1000);
        };
        this.hasParentClass = function (e, className) {
            if (!e) {
                return false;
            }
            if (e.classList.contains(_this._options.wrapperClass)) {
                return true;
            }
            return _this.hasParentClass(e.parentElement, className);
        };
        this.onWheel = function (e) {
            // use mouse wheel only when mouse is over
            if (!_this._isOverPanel) {
                return;
            }
            var delta = 0;
            if (e.wheelDelta) {
                delta = -e.wheelDelta / 120;
            }
            if (e.detail) {
                delta = e.detail / 3;
            }
            var target = (e.target || e.currentTarget || e.relatedTarget);
            if (_this.hasParentClass(target, _this._options.wrapperClass)) {
                // scroll content
                _this.scrollContent(delta, true);
            }
            // stop window scroll
            if (e.preventDefault && !_this._releaseScroll) {
                e.preventDefault();
            }
            if (!_this._releaseScroll) {
                e.returnValue = false;
            }
        };
        this.attachWheel = function (target) {
            if (window.addEventListener) {
                target.addEventListener("DOMMouseScroll", _this.onWheel, false);
                target.addEventListener("mousewheel", _this.onWheel, false);
            }
            else {
                document.addEventListener("mousewheel", _this.onWheel, false);
            }
        };
        this.showBar = function () {
            // recalculate bar height
            _this.getBarHeight();
            clearTimeout(_this._queueHide || 0);
            // when bar reached top or bottom
            if (_this._percentScroll === ~~_this._percentScroll) {
                // release wheel
                _this._releaseScroll = _this._options.allowPageScroll;
            }
            else {
                _this._releaseScroll = false;
            }
            _this._lastScroll = _this._percentScroll;
            // show only when required
            if (_this._barHeight >= _this._me.offsetHeight) {
                // allow window scroll
                _this._releaseScroll = true;
                return;
            }
            _this._renderer.setStyle(_this._bar, "opacity", _this._options.opacity.toString());
            _this._renderer.setStyle(_this._rail, "opacity", _this._options.railOpacity.toString());
        };
        this.hideBar = function () {
            // only hide when options allow it
            if (!_this._options.alwaysVisible
                && !(_this._options.disableFadeOut && _this._isOverPanel)
                && !_this._isOverBar
                && !_this._isDragg) {
                _this._queueHide = window.setTimeout(function () {
                    _this._renderer.setStyle(_this._bar, "opacity", "0");
                    _this._renderer.setStyle(_this._rail, "opacity", "0");
                }, 1000);
            }
        };
        this.scrollContent = function (y, isWheel, isJump) {
            if (isJump === void 0) { isJump = false; }
            _this._releaseScroll = false;
            var delta = y;
            var maxTop = _this._me.offsetHeight - _this._bar.offsetHeight;
            if (isWheel) {
                // move bar with mouse wheel
                delta = parseInt(_this._bar.style.top, 10) + y * _this._options.wheelStep / 100 * _this._bar.offsetHeight;
                // move bar, make sure it doesn"t go out
                delta = Math.min(Math.max(delta, 0), maxTop);
                // if scrolling down, make sure a fractional change to the
                // scroll position isn"t rounded away when the scrollbar"s CSS is set
                // this flooring of delta would happened automatically when
                // bar.css is set below, but we floor here for clarity
                delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
                // scroll the scrollbar
                _this._renderer.setStyle(_this._bar, "top", delta + "px");
            }
            // calculate actual scroll amount
            _this._percentScroll = parseInt(_this._bar.style.top, 10) / (_this._me.offsetHeight - _this._bar.offsetHeight);
            delta = _this._percentScroll * (_this._me.scrollHeight - _this._me.offsetHeight);
            if (isJump) {
                delta = y;
                var offsetTop = delta / _this._me.scrollHeight * _this._me.offsetHeight;
                offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
                _this._renderer.setStyle(_this._bar, "top", offsetTop + "px");
            }
            // scroll content
            _this._me.scrollTop = delta;
            // ensure bar is visible
            _this.showBar();
            // trigger hide when scroll is stopped
            _this.hideBar();
        };
        this.railMouseDown = function (event) {
            var clientRects = _this._rail.getBoundingClientRect();
            var elementOffsetTop = clientRects.top + window.scrollY;
            var moveTo = event.pageY - elementOffsetTop - (_this._barHeight / 2);
            var scrollTo = _this._me.scrollHeight * (moveTo / clientRects.height);
            _this._renderer.setStyle(_this._bar, "top", (moveTo >= 0 ? moveTo : 0) + "px");
            _this.scrollContent(scrollTo, false, true);
        };
        this.barMouseMove = function (event) {
            var currTop = _this._startBarTop + event.pageY - _this._barMouseDownPageY;
            _this._renderer.setStyle(_this._bar, "top", (currTop >= 0 ? currTop : 0) + "px");
            var position = _this._bar.getClientRects()[0];
            if (position) {
                _this.scrollContent(0, position.top > 0);
            }
        };
        this.barMouseUp = function () {
            _this._isDragg = false;
            // return normal text selection
            var body = document.body;
            _this._renderer.setStyle(body, "-webkit-user-select", "initial");
            _this._renderer.setStyle(body, "-moz-user-select", "initial");
            _this._renderer.setStyle(body, "-ms-user-select", "initial");
            _this._renderer.setStyle(body, "user-select", "initial");
            _this.hideBar();
            document.removeEventListener("mousemove", _this.barMouseMove, false);
            document.removeEventListener("mouseup", _this.barMouseUp, false);
        };
        this.barMouseDown = function (e) {
            _this._isDragg = true;
            // disable text selection
            var body = document.body;
            _this._renderer.setStyle(body, "-webkit-user-select", "none");
            _this._renderer.setStyle(body, "-moz-user-select", "none");
            _this._renderer.setStyle(body, "-ms-user-select", "none");
            _this._renderer.setStyle(body, "user-select", "none");
            _this._barMouseDownPageY = e.pageY;
            _this._startBarTop = parseFloat(_this._bar.style.top);
            document.addEventListener("mousemove", _this.barMouseMove, false);
            document.addEventListener("mouseup", _this.barMouseUp, false);
            return false;
        };
        this.setup = function () {
            // wrap content
            var wrapper = document.createElement("div");
            _this._renderer.addClass(wrapper, _this._options.wrapperClass);
            _this._renderer.setStyle(wrapper, "position", "relative");
            _this._renderer.setStyle(wrapper, "overflow", "hidden");
            _this._renderer.setStyle(wrapper, "width", _this._options.width);
            _this._renderer.setStyle(wrapper, "height", _this._options.height);
            // update style for the div
            _this._renderer.setStyle(_this._me, "overflow", "hidden");
            _this._renderer.setStyle(_this._me, "width", _this._options.width);
            _this._renderer.setStyle(_this._me, "height", _this._options.height);
            // create scrollbar rail
            _this._rail = document.createElement("div");
            _this._renderer.addClass(_this._rail, _this._options.railClass);
            _this._renderer.setStyle(_this._rail, "width", _this._options.size);
            _this._renderer.setStyle(_this._rail, "height", "100%");
            _this._renderer.setStyle(_this._rail, "position", "absolute");
            _this._renderer.setStyle(_this._rail, "top", "0");
            _this._renderer.setStyle(_this._rail, "display", _this._options.railVisible ? "block" : "none");
            _this._renderer.setStyle(_this._rail, "border-radius", _this._options.railBorderRadius);
            _this._renderer.setStyle(_this._rail, "background", _this._options.railColor);
            _this._renderer.setStyle(_this._rail, "opacity", _this._options.railOpacity.toString());
            _this._renderer.setStyle(_this._rail, "transition", "opacity " + _this._options.transition + "s");
            _this._renderer.setStyle(_this._rail, "z-index", "90");
            // create scrollbar
            _this._bar = document.createElement("div");
            _this._renderer.addClass(_this._bar, _this._options.barClass);
            _this._renderer.setStyle(_this._bar, "background", _this._options.color);
            _this._renderer.setStyle(_this._bar, "width", _this._options.size);
            _this._renderer.setStyle(_this._bar, "position", "absolute");
            _this._renderer.setStyle(_this._bar, "top", "0");
            _this._renderer.setStyle(_this._bar, "opacity", _this._options.opacity.toString());
            _this._renderer.setStyle(_this._bar, "transition", "opacity " + _this._options.transition + "s");
            _this._renderer.setStyle(_this._bar, "display", _this._options.alwaysVisible ? "block" : "none");
            _this._renderer.setStyle(_this._bar, "border-radius", _this._options.borderRadius);
            _this._renderer.setStyle(_this._bar, "webkit-border-radius", _this._options.borderRadius);
            _this._renderer.setStyle(_this._bar, "moz-border-radius", _this._options.borderRadius);
            _this._renderer.setStyle(_this._bar, "z-index", "99");
            // set position
            if (_this._options.position === "right") {
                _this._renderer.setStyle(_this._rail, "right", _this._options.distance);
                _this._renderer.setStyle(_this._bar, "right", _this._options.distance);
            }
            else {
                _this._renderer.setStyle(_this._rail, "left", _this._options.distance);
                _this._renderer.setStyle(_this._bar, "left", _this._options.distance);
            }
            // wrap it
            _this._me.parentElement.insertBefore(wrapper, _this._me);
            wrapper.appendChild(_this._me);
            if (_this._options.scrollTo > 0) {
                // jump to a static point
                _this.scrollContent(_this._options.scrollTo, false, true);
            }
            // append to parent div
            _this._me.parentElement.appendChild(_this._bar);
            _this._me.parentElement.appendChild(_this._rail);
            _this._bar.addEventListener("mousedown", _this.barMouseDown, false);
            // on rail over
            _this._rail.addEventListener("mouseenter", _this.showBar, false);
            _this._rail.addEventListener("mouseleave", _this.hideBar, false);
            _this._rail.addEventListener("mousedown", _this.railMouseDown, false);
            // on bar over
            _this._bar.addEventListener("mouseenter", function () { return _this._isOverBar = true; }, false);
            _this._bar.addEventListener("mouseleave", function () { return _this._isOverBar = false; }, false);
            // show on parent mouseover
            _this._me.addEventListener("mouseenter", function () {
                _this._isOverPanel = true;
                _this.showBar();
                _this.hideBar();
            }, false);
            _this._me.addEventListener("mouseleave", function () {
                _this._isOverPanel = false;
                _this.hideBar();
            }, false);
            // support for mobile
            _this._me.addEventListener("touchstart", function (e) {
                if (e.touches.length) {
                    // record where touch started
                    _this._touchDif = e.touches[0].pageY;
                }
            }, false);
            _this._me.addEventListener("touchmove", function (e) {
                // prevent scrolling the page if necessary
                if (!_this._releaseScroll) {
                    e.preventDefault();
                }
                if (e.touches.length) {
                    // see how far user swiped
                    var diff = (_this._touchDif - e.touches[0].pageY) / _this._options.touchScrollStep;
                    // scroll content
                    _this.scrollContent(diff, true);
                    _this._touchDif = e.touches[0].pageY;
                }
            }, false);
            // set up initial height
            _this.getBarHeight();
            // hide bar on init if alwaysVisible equal false
            _this.hideBar();
            // check start position
            if (_this._options.start === "bottom") {
                // scroll content to bottom
                _this._renderer.setStyle(_this._bar, "top", _this._me.offsetHeight - _this._bar.offsetHeight + "px");
                _this.scrollContent(0, true);
            }
            // attach scroll events
            _this.attachWheel(window);
            // check whether it changes in content
            _this.trackPanelHeightChanged();
        };
        this._me = elementRef.nativeElement;
        this._options = __assign({}, defaults);
    }
    SlimScroll.prototype.ngOnInit = function () {
        this.init();
    };
    SlimScroll.prototype.ngOnDestroy = function () {
        if (this._changesTracker) {
            clearInterval(this._changesTracker);
        }
        if (window.removeEventListener) {
            window.removeEventListener("DOMMouseScroll", this.onWheel);
            window.removeEventListener("mousewheel", this.onWheel);
        }
        else {
            document.removeEventListener("mousewheel", this.onWheel);
        }
        document.removeEventListener("mousemove", this.barMouseMove, false);
        document.removeEventListener("mouseup", this.barMouseUp, false);
    };
    SlimScroll.prototype.onResize = function () {
        this.init();
    };
    Object.defineProperty(SlimScroll.prototype, "width", {
        set: function (value) {
            this._options.width = value || defaults.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "height", {
        set: function (value) {
            this._options.height = value || defaults.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "size", {
        set: function (value) {
            this._options.size = value || defaults.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "color", {
        set: function (value) {
            this._options.color = value || defaults.color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "position", {
        set: function (value) {
            this._options.position = value || defaults.position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "distance", {
        set: function (value) {
            this._options.distance = value || defaults.distance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "start", {
        set: function (value) {
            this._options.start = value || defaults.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "opacity", {
        set: function (value) {
            this._options.opacity = value || defaults.opacity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "transition", {
        set: function (value) {
            this._options.transition = value || defaults.transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "alwaysVisible", {
        set: function (value) {
            this._options.alwaysVisible = value || defaults.alwaysVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "disableFadeOut", {
        set: function (value) {
            this._options.disableFadeOut = value || defaults.disableFadeOut;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "railVisible", {
        set: function (value) {
            this._options.railVisible = value || defaults.railVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "railColor", {
        set: function (value) {
            this._options.railColor = value || defaults.railColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "railOpacity", {
        set: function (value) {
            this._options.railOpacity = value || defaults.railOpacity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "railClass", {
        set: function (value) {
            this._options.railClass = value || defaults.railClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "barClass", {
        set: function (value) {
            this._options.barClass = value || defaults.barClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "wrapperClass", {
        set: function (value) {
            this._options.wrapperClass = value || defaults.wrapperClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "allowPageScroll", {
        set: function (value) {
            this._options.allowPageScroll = value || defaults.allowPageScroll;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "wheelStep", {
        set: function (value) {
            this._options.wheelStep = value || defaults.wheelStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "touchScrollStep", {
        set: function (value) {
            this._options.touchScrollStep = value || defaults.touchScrollStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "borderRadius", {
        set: function (value) {
            this._options.borderRadius = value || defaults.borderRadius;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "railBorderRadius", {
        set: function (value) {
            this._options.railBorderRadius = value || defaults.railBorderRadius;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "scrollTo", {
        set: function (value) {
            this._options.scrollTo = value || defaults.scrollTo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimScroll.prototype, "autoScrollToBottom", {
        set: function (value) {
            this._options.autoScrollToBottom = value || defaults.autoScrollToBottom;
        },
        enumerable: true,
        configurable: true
    });
    SlimScroll.prototype.init = function () {
        // ensure we are not binding it again
        if (this._bar && this._rail) {
            this.refresh();
        }
        else {
            this.setup();
        }
    };
    SlimScroll.prototype.getBarHeight = function () {
        // calculate scrollbar height and make sure it is not too small
        this._barHeight = Math.max(this._me.offsetHeight / (this._me.scrollHeight === 0 ? 1 : this._me.scrollHeight) * this._me.offsetHeight, this._minBarHeight);
        this._renderer.setStyle(this._bar, "height", this._barHeight + "px");
        // hide scrollbar if content is not long enough
        var display = this._barHeight === this._me.offsetHeight ? "none" : "block";
        this._renderer.setStyle(this._bar, "display", display);
    };
    SlimScroll.prototype.refresh = function () {
        this.getBarHeight();
        // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
        if ("height" in this._options && this._options.height === "auto") {
            this._renderer.setStyle(this._me.parentElement, "height", "auto");
            this._renderer.setStyle(this._me, "height", "auto");
            var height = this._me.parentElement.clientHeight;
            this._renderer.setStyle(this._me.parentElement, "height", height + "px");
            this._renderer.setStyle(this._me, "height", height + "px");
        }
        else if ("height" in this._options) {
            var h = this._options.height;
            this._renderer.setStyle(this._me.parentElement, "height", h);
            this._renderer.setStyle(this._me, "height", h);
        }
    };
    __decorate([
        core_1.HostListener("window:resize", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SlimScroll.prototype, "onResize", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SlimScroll.prototype, "width", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SlimScroll.prototype, "height", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SlimScroll.prototype, "size", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SlimScroll.prototype, "color", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SlimScroll.prototype, "position", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SlimScroll.prototype, "distance", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SlimScroll.prototype, "start", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SlimScroll.prototype, "opacity", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SlimScroll.prototype, "transition", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SlimScroll.prototype, "alwaysVisible", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SlimScroll.prototype, "disableFadeOut", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SlimScroll.prototype, "railVisible", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SlimScroll.prototype, "railColor", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SlimScroll.prototype, "railOpacity", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SlimScroll.prototype, "railClass", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SlimScroll.prototype, "barClass", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SlimScroll.prototype, "wrapperClass", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SlimScroll.prototype, "allowPageScroll", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SlimScroll.prototype, "wheelStep", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SlimScroll.prototype, "touchScrollStep", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SlimScroll.prototype, "borderRadius", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SlimScroll.prototype, "railBorderRadius", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SlimScroll.prototype, "scrollTo", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SlimScroll.prototype, "autoScrollToBottom", null);
    SlimScroll = __decorate([
        core_1.Directive({
            selector: "[slimScroll]"
        }),
        __metadata("design:paramtypes", [core_1.Renderer2,
            core_1.ElementRef])
    ], SlimScroll);
    return SlimScroll;
}());
exports.SlimScroll = SlimScroll;
//# sourceMappingURL=slimscroll.directive.js.map