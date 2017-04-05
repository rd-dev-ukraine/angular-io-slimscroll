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
var SlimScroll = (function () {
    function SlimScroll(_renderer, elementRef) {
        this._renderer = _renderer;
        this._minBarHeight = 30;
        this._releaseScroll = false;
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
    SlimScroll.prototype.trackPanelHeightChanged = function () {
        var _this = this;
        this._previousHeight = this._me.scrollHeight;
        this._changesTracker = window.setInterval(function () {
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
    SlimScroll.prototype.hasParentClass = function (e, className) {
        if (!e) {
            return false;
        }
        if (e.classList.contains(this._options.wrapperClass)) {
            return true;
        }
        return this.hasParentClass(e.parentElement, className);
    };
    SlimScroll.prototype.onWheel = function (e) {
        // use mouse wheel only when mouse is over
        if (!this._isOverPanel) {
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
        if (this.hasParentClass(target, this._options.wrapperClass)) {
            // scroll content
            this.scrollContent(delta, true);
        }
        // stop window scroll
        if (e.preventDefault && !this._releaseScroll) {
            e.preventDefault();
        }
        if (!this._releaseScroll) {
            e.returnValue = false;
        }
    };
    SlimScroll.prototype.attachWheel = function (target) {
        var _this = this;
        if (window.addEventListener) {
            target.addEventListener("DOMMouseScroll", function (e) { return _this.onWheel(e); }, false);
            target.addEventListener("mousewheel", function (e) { return _this.onWheel(e); }, false);
        }
        else {
            document.addEventListener("mousewheel", function (e) { return _this.onWheel(e); }, false);
        }
    };
    SlimScroll.prototype.showBar = function () {
        // recalculate bar height
        this.getBarHeight();
        clearTimeout(this._queueHide);
        // when bar reached top or bottom
        if (this._percentScroll === ~~this._percentScroll) {
            // release wheel
            this._releaseScroll = this._options.allowPageScroll;
        }
        else {
            this._releaseScroll = false;
        }
        this._lastScroll = this._percentScroll;
        // show only when required
        if (this._barHeight >= this._me.offsetHeight) {
            // allow window scroll
            this._releaseScroll = true;
            return;
        }
        this._renderer.setStyle(this._bar, "opacity", this._options.opacity.toString());
        this._renderer.setStyle(this._rail, "opacity", this._options.railOpacity.toString());
    };
    SlimScroll.prototype.hideBar = function () {
        var _this = this;
        // only hide when options allow it
        if (!this._options.alwaysVisible) {
            this._queueHide = window.setTimeout(function () {
                if (!(_this._options.disableFadeOut && _this._isOverPanel) && !_this._isOverBar && !_this._isDragg) {
                    _this._renderer.setStyle(_this._bar, "opacity", "0");
                    _this._renderer.setStyle(_this._rail, "opacity", "0");
                }
            }, 1000);
        }
    };
    SlimScroll.prototype.scrollContent = function (y, isWheel, isJump) {
        if (isJump === void 0) { isJump = false; }
        this._releaseScroll = false;
        var delta = y;
        var maxTop = this._me.offsetHeight - this._bar.offsetHeight;
        if (isWheel) {
            // move bar with mouse wheel
            delta = parseInt(this._bar.style.top, 10) + y * this._options.wheelStep / 100 * this._bar.offsetHeight;
            // move bar, make sure it doesn"t go out
            delta = Math.min(Math.max(delta, 0), maxTop);
            // if scrolling down, make sure a fractional change to the
            // scroll position isn"t rounded away when the scrollbar"s CSS is set
            // this flooring of delta would happened automatically when
            // bar.css is set below, but we floor here for clarity
            delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
            // scroll the scrollbar
            this._renderer.setStyle(this._bar, "top", delta + "px");
        }
        // calculate actual scroll amount
        this._percentScroll = parseInt(this._bar.style.top, 10) / (this._me.offsetHeight - this._bar.offsetHeight);
        delta = this._percentScroll * (this._me.scrollHeight - this._me.offsetHeight);
        if (isJump) {
            delta = y;
            var offsetTop = delta / this._me.scrollHeight * this._me.offsetHeight;
            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
            this._renderer.setStyle(this._bar, "top", offsetTop + "px");
        }
        // scroll content
        this._me.scrollTop = delta;
        // ensure bar is visible
        this.showBar();
        // trigger hide when scroll is stopped
        this.hideBar();
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
    SlimScroll.prototype.setup = function () {
        var _this = this;
        // wrap content
        var wrapper = document.createElement("div");
        this._renderer.addClass(wrapper, this._options.wrapperClass);
        this._renderer.setStyle(wrapper, "position", "relative");
        this._renderer.setStyle(wrapper, "overflow", "hidden");
        this._renderer.setStyle(wrapper, "width", this._options.width);
        this._renderer.setStyle(wrapper, "height", this._options.height);
        // update style for the div
        this._renderer.setStyle(this._me, "overflow", "hidden");
        this._renderer.setStyle(this._me, "width", this._options.width);
        this._renderer.setStyle(this._me, "height", this._options.height);
        // create scrollbar rail
        this._rail = document.createElement("div");
        this._renderer.addClass(this._rail, this._options.railClass);
        this._renderer.setStyle(this._rail, "width", this._options.size);
        this._renderer.setStyle(this._rail, "height", "100%");
        this._renderer.setStyle(this._rail, "position", "absolute");
        this._renderer.setStyle(this._rail, "top", "0");
        this._renderer.setStyle(this._rail, "display", this._options.railVisible ? "block" : "none");
        this._renderer.setStyle(this._rail, "border-radius", this._options.railBorderRadius);
        this._renderer.setStyle(this._rail, "background", this._options.railColor);
        this._renderer.setStyle(this._rail, "opacity", this._options.railOpacity.toString());
        this._renderer.setStyle(this._rail, "transition", "opacity " + this._options.transition + "s");
        this._renderer.setStyle(this._rail, "z-index", "90");
        // create scrollbar
        this._bar = document.createElement("div");
        this._renderer.addClass(this._bar, this._options.barClass);
        this._renderer.setStyle(this._bar, "background", this._options.color);
        this._renderer.setStyle(this._bar, "width", this._options.size);
        this._renderer.setStyle(this._bar, "position", "absolute");
        this._renderer.setStyle(this._bar, "top", "0");
        this._renderer.setStyle(this._bar, "opacity", this._options.opacity.toString());
        this._renderer.setStyle(this._bar, "transition", "opacity " + this._options.transition + "s");
        this._renderer.setStyle(this._bar, "display", this._options.alwaysVisible ? "block" : "none");
        this._renderer.setStyle(this._bar, "border-radius", this._options.borderRadius);
        this._renderer.setStyle(this._bar, "webkit-border-radius", this._options.borderRadius);
        this._renderer.setStyle(this._bar, "moz-border-radius", this._options.borderRadius);
        this._renderer.setStyle(this._bar, "z-index", "99");
        // set position
        if (this._options.position === "right") {
            this._renderer.setStyle(this._rail, "right", this._options.distance);
            this._renderer.setStyle(this._bar, "right", this._options.distance);
        }
        else {
            this._renderer.setStyle(this._rail, "left", this._options.distance);
            this._renderer.setStyle(this._bar, "left", this._options.distance);
        }
        // wrap it
        this._me.parentElement.insertBefore(wrapper, this._me);
        wrapper.appendChild(this._me);
        if (this._options.scrollTo > 0) {
            // jump to a static point
            var offset = this._options.scrollTo;
            // scroll content by the given offset
            this.scrollContent(offset, false, true);
        }
        // append to parent div
        this._me.parentElement.appendChild(this._bar);
        this._me.parentElement.appendChild(this._rail);
        this._bar.addEventListener("mousedown", function (e) {
            _this._isDragg = true;
            // disable text selection
            _this._renderer.setStyle(document.querySelector("body"), "-webkit-user-select", "none");
            _this._renderer.setStyle(document.querySelector("body"), "-moz-user-select", "none");
            _this._renderer.setStyle(document.querySelector("body"), "-ms-user-select", "none");
            _this._renderer.setStyle(document.querySelector("body"), "user-select", "none");
            var t = parseFloat(_this._bar.style.top);
            var pageY = e.pageY;
            var mousemoveEvent = function (event) {
                var currTop = t + event.pageY - pageY;
                _this._renderer.setStyle(_this._bar, "top", (currTop >= 0 ? currTop : 0) + "px");
                var position = _this._bar.getClientRects()[0];
                if (position) {
                    _this.scrollContent(0, position.top > 0);
                }
            };
            var mouseupEvent = function () {
                _this._isDragg = false;
                // return normal text selection
                _this._renderer.setStyle(document.querySelector("body"), "-webkit-user-select", "initial");
                _this._renderer.setStyle(document.querySelector("body"), "-moz-user-select", "initial");
                _this._renderer.setStyle(document.querySelector("body"), "-ms-user-select", "initial");
                _this._renderer.setStyle(document.querySelector("body"), "user-select", "initial");
                _this.hideBar();
                document.removeEventListener("mousemove", mousemoveEvent, false);
                document.removeEventListener("mouseup", mouseupEvent, false);
            };
            document.addEventListener("mousemove", mousemoveEvent, false);
            document.addEventListener("mouseup", mouseupEvent, false);
            return false;
        }, false);
        // on rail over
        this._rail.addEventListener("mouseenter", function () { return _this.showBar(); }, false);
        this._rail.addEventListener("mouseleave", function () { return _this.hideBar(); }, false);
        // on bar over
        this._bar.addEventListener("mouseenter", function () { return _this._isOverBar = true; }, false);
        this._bar.addEventListener("mouseleave", function () { return _this._isOverBar = false; }, false);
        // show on parent mouseover
        this._me.addEventListener("mouseenter", function () {
            _this._isOverPanel = true;
            _this.showBar();
            _this.hideBar();
        }, false);
        this._me.addEventListener("mouseleave", function () {
            _this._isOverPanel = false;
            _this.hideBar();
        }, false);
        // support for mobile
        this._me.addEventListener("touchstart", function (e) {
            if (e.touches.length) {
                // record where touch started
                _this._touchDif = e.touches[0].pageY;
            }
        }, false);
        this._me.addEventListener("touchmove", function (e) {
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
        this.getBarHeight();
        // hide bar on init if alwaysVisible equal false
        this.hideBar();
        // check start position
        if (this._options.start === "bottom") {
            // scroll content to bottom
            this._renderer.setStyle(this._bar, "top", this._me.offsetHeight - this._bar.offsetHeight + "px");
            this.scrollContent(0, true);
        }
        // attach scroll events
        this.attachWheel(window);
        // check whether it changes in content
        this.trackPanelHeightChanged();
    };
    return SlimScroll;
}());
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
exports.SlimScroll = SlimScroll;
//# sourceMappingURL=slimscroll.directive.js.map