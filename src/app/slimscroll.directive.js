var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Renderer, HostListener, Input, ElementRef } from "@angular/core";
const defaults = {
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
    scrollTo: 0
};
export let SlimScroll = class SlimScroll {
    constructor(renderer, elementRef) {
        this._minBarHeight = 30;
        this._releaseScroll = false;
        this._renderer = renderer;
        this._me = elementRef.nativeElement;
        this._options = Object.assign({}, defaults);
    }
    ngOnInit() {
        this.init();
    }
    ngOnDestroy() {
        if (this._changesTracker) {
            clearInterval(this._changesTracker);
        }
    }
    onResize() {
        this.init();
    }
    set width(value) {
        this._options.width = value || defaults.width;
    }
    set height(value) {
        this._options.height = value || defaults.height;
    }
    set size(value) {
        this._options.size = value || defaults.size;
    }
    set color(value) {
        this._options.color = value || defaults.color;
    }
    set position(value) {
        this._options.position = value || defaults.position;
    }
    set distance(value) {
        this._options.distance = value || defaults.distance;
    }
    set start(value) {
        this._options.start = value || defaults.start;
    }
    set opacity(value) {
        this._options.opacity = value || defaults.opacity;
    }
    set transition(value) {
        this._options.transition = value || defaults.transition;
    }
    set alwaysVisible(value) {
        this._options.alwaysVisible = value || defaults.alwaysVisible;
    }
    set disableFadeOut(value) {
        this._options.disableFadeOut = value || defaults.disableFadeOut;
    }
    set railVisible(value) {
        this._options.railVisible = value || defaults.railVisible;
    }
    set railColor(value) {
        this._options.railColor = value || defaults.railColor;
    }
    set railOpacity(value) {
        this._options.railOpacity = value || defaults.railOpacity;
    }
    set railClass(value) {
        this._options.railClass = value || defaults.railClass;
    }
    set barClass(value) {
        this._options.barClass = value || defaults.barClass;
    }
    set wrapperClass(value) {
        this._options.wrapperClass = value || defaults.wrapperClass;
    }
    set allowPageScroll(value) {
        this._options.allowPageScroll = value || defaults.allowPageScroll;
    }
    set wheelStep(value) {
        this._options.wheelStep = value || defaults.wheelStep;
    }
    set touchScrollStep(value) {
        this._options.touchScrollStep = value || defaults.touchScrollStep;
    }
    set borderRadius(value) {
        this._options.borderRadius = value || defaults.borderRadius;
    }
    set railBorderRadius(value) {
        this._options.railBorderRadius = value || defaults.railBorderRadius;
    }
    set scrollTo(value) {
        this._options.scrollTo = value || defaults.scrollTo;
    }
    trackPanelHeightChanged() {
        this._previousHeight = this._me.scrollHeight;
        this._changesTracker = setInterval(() => {
            if (this._previousHeight !== this._me.scrollHeight) {
                this._previousHeight = this._me.scrollHeight;
                this.init();
            }
        }, 1000);
    }
    hasParentClass(e, className) {
        if (!e) {
            return false;
        }
        if (e.classList.contains(this._options.wrapperClass)) {
            return true;
        }
        return this.hasParentClass(e.parentElement, className);
    }
    onWheel(e) {
        // use mouse wheel only when mouse is over
        if (!this._isOverPanel) {
            return;
        }
        let delta = 0;
        if (e.wheelDelta) {
            delta = -e.wheelDelta / 120;
        }
        if (e.detail) {
            delta = e.detail / 3;
        }
        let target = e.target || e.currentTarget || e.relatedTarget;
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
    }
    attachWheel(target) {
        if (window.addEventListener) {
            target.addEventListener("DOMMouseScroll", (e) => this.onWheel(e), false);
            target.addEventListener("mousewheel", (e) => this.onWheel(e), false);
        }
        else {
            document.addEventListener("mousewheel", (e) => this.onWheel(e), false);
        }
    }
    showBar() {
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
        this._renderer.setElementStyle(this._bar, "opacity", this._options.opacity.toString());
        this._renderer.setElementStyle(this._rail, "opacity", this._options.railOpacity.toString());
    }
    hideBar() {
        // only hide when options allow it
        if (!this._options.alwaysVisible) {
            this._queueHide = setTimeout(() => {
                if (!(this._options.disableFadeOut && this._isOverPanel) && !this._isOverBar && !this._isDragg) {
                    this._renderer.setElementStyle(this._bar, "opacity", "0");
                    this._renderer.setElementStyle(this._rail, "opacity", "0");
                }
            }, 1000);
        }
    }
    scrollContent(y, isWheel, isJump = false) {
        this._releaseScroll = false;
        let delta = y;
        let maxTop = this._me.offsetHeight - this._bar.offsetHeight;
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
            this._renderer.setElementStyle(this._bar, "top", delta + "px");
        }
        // calculate actual scroll amount
        this._percentScroll = parseInt(this._bar.style.top, 10) / (this._me.offsetHeight - this._bar.offsetHeight);
        delta = this._percentScroll * (this._me.scrollHeight - this._me.offsetHeight);
        if (isJump) {
            delta = y;
            let offsetTop = delta / this._me.scrollHeight * this._me.offsetHeight;
            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
            this._renderer.setElementStyle(this._bar, "top", offsetTop + "px");
        }
        // scroll content
        this._me.scrollTop = delta;
        // ensure bar is visible
        this.showBar();
        // trigger hide when scroll is stopped
        this.hideBar();
    }
    getBarHeight() {
        // calculate scrollbar height and make sure it is not too small
        this._barHeight = Math.max(this._me.offsetHeight / (this._me.scrollHeight === 0 ? 1 : this._me.scrollHeight) * this._me.offsetHeight, this._minBarHeight);
        this._renderer.setElementStyle(this._bar, "height", this._barHeight + "px");
        // hide scrollbar if content is not long enough
        let display = this._barHeight === this._me.offsetHeight ? "none" : "block";
        this._renderer.setElementStyle(this._bar, "display", display);
    }
    refresh() {
        this.getBarHeight();
        // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
        if ("height" in this._options && this._options.height === "auto") {
            this._renderer.setElementStyle(this._me.parentElement, "height", "auto");
            this._renderer.setElementStyle(this._me, "height", "auto");
            let height = this._me.parentElement.clientHeight;
            this._renderer.setElementStyle(this._me.parentElement, "height", height + "px");
            this._renderer.setElementStyle(this._me, "height", height + "px");
        }
        else if ("height" in this._options) {
            let h = this._options.height;
            this._renderer.setElementStyle(this._me.parentElement, "height", h);
            this._renderer.setElementStyle(this._me, "height", h);
        }
    }
    setup() {
        // wrap content
        let wrapper = document.createElement("div");
        this._renderer.setElementClass(wrapper, this._options.wrapperClass, true);
        this._renderer.setElementStyle(wrapper, "position", "relative");
        this._renderer.setElementStyle(wrapper, "overflow", "hidden");
        this._renderer.setElementStyle(wrapper, "width", this._options.width);
        this._renderer.setElementStyle(wrapper, "height", this._options.height);
        // update style for the div
        this._renderer.setElementStyle(this._me, "overflow", "hidden");
        this._renderer.setElementStyle(this._me, "width", this._options.width);
        this._renderer.setElementStyle(this._me, "height", this._options.height);
        // create scrollbar rail
        this._rail = document.createElement("div");
        this._renderer.setElementClass(this._rail, this._options.railClass, true);
        this._renderer.setElementStyle(this._rail, "width", this._options.size);
        this._renderer.setElementStyle(this._rail, "height", "100%");
        this._renderer.setElementStyle(this._rail, "position", "absolute");
        this._renderer.setElementStyle(this._rail, "top", "0");
        this._renderer.setElementStyle(this._rail, "display", this._options.railVisible ? "block" : "none");
        this._renderer.setElementStyle(this._rail, "border-radius", this._options.railBorderRadius);
        this._renderer.setElementStyle(this._rail, "background", this._options.railColor);
        this._renderer.setElementStyle(this._rail, "opacity", this._options.railOpacity.toString());
        this._renderer.setElementStyle(this._rail, "transition", `opacity ${this._options.transition}s`);
        this._renderer.setElementStyle(this._rail, "z-index", "90");
        // create scrollbar
        this._bar = document.createElement("div");
        this._renderer.setElementClass(this._bar, this._options.barClass, true);
        this._renderer.setElementStyle(this._bar, "background", this._options.color);
        this._renderer.setElementStyle(this._bar, "width", this._options.size);
        this._renderer.setElementStyle(this._bar, "position", "absolute");
        this._renderer.setElementStyle(this._bar, "top", "0");
        this._renderer.setElementStyle(this._bar, "opacity", this._options.opacity.toString());
        this._renderer.setElementStyle(this._bar, "transition", `opacity ${this._options.transition}s`);
        this._renderer.setElementStyle(this._bar, "display", this._options.alwaysVisible ? "block" : "none");
        this._renderer.setElementStyle(this._bar, "border-radius", this._options.borderRadius);
        this._renderer.setElementStyle(this._bar, "webkit-border-radius", this._options.borderRadius);
        this._renderer.setElementStyle(this._bar, "moz-border-radius", this._options.borderRadius);
        this._renderer.setElementStyle(this._bar, "z-index", "99");
        // set position
        if (this._options.position === "right") {
            this._renderer.setElementStyle(this._rail, "right", this._options.distance);
            this._renderer.setElementStyle(this._bar, "right", this._options.distance);
        }
        else {
            this._renderer.setElementStyle(this._rail, "left", this._options.distance);
            this._renderer.setElementStyle(this._bar, "left", this._options.distance);
        }
        // wrap it
        this._me.parentElement.insertBefore(wrapper, this._me);
        wrapper.appendChild(this._me);
        if (this._options.scrollTo > 0) {
            // jump to a static point
            let offset = this._options.scrollTo;
            // scroll content by the given offset
            this.scrollContent(offset, false, true);
        }
        // append to parent div
        this._me.parentElement.appendChild(this._bar);
        this._me.parentElement.appendChild(this._rail);
        this._bar.addEventListener("mousedown", e => {
            this._isDragg = true;
            // disable text selection
            this._renderer.setElementStyle(document.querySelector('body'), "-webkit-user-select", "none");
            this._renderer.setElementStyle(document.querySelector('body'), "-moz-user-select", "none");
            this._renderer.setElementStyle(document.querySelector('body'), "-ms-user-select", "none");
            this._renderer.setElementStyle(document.querySelector('body'), "user-select", "none");
            let t = parseFloat(this._bar.style.top);
            let pageY = e.pageY;
            let mousemoveEvent = (event) => {
                let currTop = t + event.pageY - pageY;
                this._renderer.setElementStyle(this._bar, "top", (currTop >= 0 ? currTop : 0) + "px");
                let position = this._bar.getClientRects()[0];
                if (position) {
                    this.scrollContent(0, position.top > 0);
                }
            };
            let mouseupEvent = () => {
                this._isDragg = false;
                // return normal text selection
                this._renderer.setElementStyle(document.querySelector('body'), "-webkit-user-select", "initial");
                this._renderer.setElementStyle(document.querySelector('body'), "-moz-user-select", "initial");
                this._renderer.setElementStyle(document.querySelector('body'), "-ms-user-select", "initial");
                this._renderer.setElementStyle(document.querySelector('body'), "user-select", "initial");
                this.hideBar();
                document.removeEventListener("mousemove", mousemoveEvent, false);
                document.removeEventListener("mouseup", mouseupEvent, false);
            };
            document.addEventListener("mousemove", mousemoveEvent, false);
            document.addEventListener("mouseup", mouseupEvent, false);
            return false;
        }, false);
        // on rail over
        this._rail.addEventListener("mouseenter", () => this.showBar(), false);
        this._rail.addEventListener("mouseleave", () => this.hideBar(), false);
        // on bar over
        this._bar.addEventListener("mouseenter", () => this._isOverBar = true, false);
        this._bar.addEventListener("mouseleave", () => this._isOverBar = false, false);
        // show on parent mouseover
        this._me.addEventListener("mouseenter", () => {
            this._isOverPanel = true;
            this.showBar();
            this.hideBar();
        }, false);
        this._me.addEventListener("mouseleave", () => {
            this._isOverPanel = false;
            this.hideBar();
        }, false);
        // support for mobile
        this._me.addEventListener("touchstart", e => {
            if (e.touches.length) {
                // record where touch started
                this._touchDif = e.touches[0].pageY;
            }
        }, false);
        this._me.addEventListener("touchmove", e => {
            // prevent scrolling the page if necessary
            if (!this._releaseScroll) {
                e.preventDefault();
            }
            if (e.touches.length) {
                // see how far user swiped
                let diff = (this._touchDif - e.touches[0].pageY) / this._options.touchScrollStep;
                // scroll content
                this.scrollContent(diff, true);
                this._touchDif = e.touches[0].pageY;
            }
        }, false);
        // set up initial height
        this.getBarHeight();
        // hide bar on init if alwaysVisible equal false
        this.hideBar();
        // check start position
        if (this._options.start === "bottom") {
            // scroll content to bottom
            this._renderer.setElementStyle(this._bar, "top", this._me.offsetHeight - this._bar.offsetHeight + "px");
            this.scrollContent(0, true);
        }
        // attach scroll events
        this.attachWheel(window);
        // check whether it changes in content 
        this.trackPanelHeightChanged();
    }
    init() {
        // ensure we are not binding it again
        if (this._bar && this._rail) {
            this.refresh();
        }
        else {
            this.setup();
        }
    }
};
__decorate([
    HostListener("window:resize", ["$event"]), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], SlimScroll.prototype, "onResize", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SlimScroll.prototype, "width", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SlimScroll.prototype, "height", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SlimScroll.prototype, "size", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SlimScroll.prototype, "color", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SlimScroll.prototype, "position", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SlimScroll.prototype, "distance", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SlimScroll.prototype, "start", null);
__decorate([
    Input(), 
    __metadata('design:type', Number), 
    __metadata('design:paramtypes', [Number])
], SlimScroll.prototype, "opacity", null);
__decorate([
    Input(), 
    __metadata('design:type', Number), 
    __metadata('design:paramtypes', [Number])
], SlimScroll.prototype, "transition", null);
__decorate([
    Input(), 
    __metadata('design:type', Boolean), 
    __metadata('design:paramtypes', [Boolean])
], SlimScroll.prototype, "alwaysVisible", null);
__decorate([
    Input(), 
    __metadata('design:type', Boolean), 
    __metadata('design:paramtypes', [Boolean])
], SlimScroll.prototype, "disableFadeOut", null);
__decorate([
    Input(), 
    __metadata('design:type', Boolean), 
    __metadata('design:paramtypes', [Boolean])
], SlimScroll.prototype, "railVisible", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SlimScroll.prototype, "railColor", null);
__decorate([
    Input(), 
    __metadata('design:type', Number), 
    __metadata('design:paramtypes', [Number])
], SlimScroll.prototype, "railOpacity", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SlimScroll.prototype, "railClass", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SlimScroll.prototype, "barClass", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SlimScroll.prototype, "wrapperClass", null);
__decorate([
    Input(), 
    __metadata('design:type', Boolean), 
    __metadata('design:paramtypes', [Boolean])
], SlimScroll.prototype, "allowPageScroll", null);
__decorate([
    Input(), 
    __metadata('design:type', Number), 
    __metadata('design:paramtypes', [Number])
], SlimScroll.prototype, "wheelStep", null);
__decorate([
    Input(), 
    __metadata('design:type', Number), 
    __metadata('design:paramtypes', [Number])
], SlimScroll.prototype, "touchScrollStep", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SlimScroll.prototype, "borderRadius", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SlimScroll.prototype, "railBorderRadius", null);
__decorate([
    Input(), 
    __metadata('design:type', Number), 
    __metadata('design:paramtypes', [Number])
], SlimScroll.prototype, "scrollTo", null);
SlimScroll = __decorate([
    Directive({
        selector: "[slimScroll]"
    }), 
    __metadata('design:paramtypes', [Renderer, ElementRef])
], SlimScroll);
//# sourceMappingURL=slimscroll.directive.js.map