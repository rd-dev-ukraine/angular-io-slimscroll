interface SlimScrollOptions {
    // width in pixels of the visible scroll area
    width: string;

    // height in pixels of the visible scroll area
    height: string;

    // width in pixels of the scrollbar and rail
    size: string;

    // scrollbar color, accepts any hex/color value
    color: string;

    // scrollbar position - left/right
    position: string;

    // distance in pixels between the side edge and the scrollbar
    distance: string;

    // default scroll position on load - top / bottom
    start: string;

    // sets scrollbar opacity
    opacity: number;

    // set transition for opacity
    transition: number;

    // enables always-on mode for the scrollbar
    alwaysVisible: boolean;

    // check if we should hide the scrollbar when user is hovering over
    disableFadeOut: boolean;

    // sets visibility of the rail
    railVisible: boolean;

    // sets rail color
    railColor: string;

    // sets rail opacity
    railOpacity: number;

    // defautlt CSS class of the slimscroll rail
    railClass: string;

    // defautlt CSS class of the slimscroll bar
    barClass: string;

    // defautlt CSS class of the slimscroll wrapper
    wrapperClass: string;

    // check if mousewheel should scroll the window if we reach top/bottom
    allowPageScroll: boolean;

    // scroll amount applied to each mouse wheel step
    wheelStep: number;

    // scroll amount applied when user is using gestures
    touchScrollStep: number;

    // sets border radius
    borderRadius: string;

    // sets border radius of the rail
    railBorderRadius: string;

    // set default point from which to start scrolling
    scrollTo: number;

    // auto scroll to bottom when content was added
    autoScrollToBottom: boolean;
}