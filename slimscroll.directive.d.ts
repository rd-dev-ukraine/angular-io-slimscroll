import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: "[slimScroll]",
})
export declare class SlimScroll implements OnInit, OnDestroy {
    private _renderer;
    private _me;
    private _bar;
    private _rail;
    private _isOverPanel;
    private _isOverBar;
    private _isDragg;
    private _touchDif;
    private _barHeight;
    private _percentScroll;
    private _lastScroll;
    private _minBarHeight;
    private _releaseScroll;
    private _options;
    private _previousHeight;
    private _queueHide;
    private _changesTracker;
    constructor(_renderer: Renderer2, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onResize(): void;
    @Input() width: string;
    @Input() height: string;
    @Input() size: string;
    @Input() color: string;
    @Input() position: string;
    @Input() distance: string;
    @Input() start: string;
    @Input() opacity: number;
    @Input() transition: number;
    @Input() alwaysVisible: boolean;
    @Input() disableFadeOut: boolean;
    @Input() railVisible: boolean;
    @Input() railColor: string;
    @Input() railOpacity: number;
    @Input() railClass: string;
    @Input() barClass: string;
    @Input() wrapperClass: string;
    @Input() allowPageScroll: boolean;
    @Input() wheelStep: number;
    @Input() touchScrollStep: number;
    @Input() borderRadius: string;
    @Input() railBorderRadius: string;
    @Input() scrollTo: number;
    @Input() autoScrollToBottom: boolean;
    private init();
    private trackPanelHeightChanged();
    private hasParentClass(e, className);
    private onWheel(e);
    private attachWheel(target);
    private showBar();
    private hideBar();
    private scrollContent(y, isWheel, isJump?);
    private getBarHeight();
    private refresh();
    private setup();
}
