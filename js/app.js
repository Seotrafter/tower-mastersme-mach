(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
    };
    function addTouchClass() {
        if (isMobile.any()) document.documentElement.classList.add("touch");
    }
    function addLoadedClass() {
        if (!document.documentElement.classList.contains("loading")) window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("_fokypl");
            }), 0);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("_keeudh")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("_keeudh");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("_keeudh");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("_bccumm");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767.98";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint / 16}em),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === "first") {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if (this.type === "min") arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    /*!
 * GSAP 3.12.5
 * https://gsap.com
 */
    const gsap_gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    function t(t, e, i) {
        return Math.max(t, Math.min(e, i));
    }
    class Animate {
        advance(e) {
            if (!this.isRunning) return;
            let i = !1;
            if (this.lerp) this.value = (s = this.value, o = this.to, n = 60 * this.lerp, r = e, 
            function(t, e, i) {
                return (1 - i) * t + i * e;
            }(s, o, 1 - Math.exp(-n * r))), Math.round(this.value) === this.to && (this.value = this.to, 
            i = !0); else {
                this.currentTime += e;
                const s = t(0, this.currentTime / this.duration, 1);
                i = s >= 1;
                const o = i ? 1 : this.easing(s);
                this.value = this.from + (this.to - this.from) * o;
            }
            var s, o, n, r;
            this.onUpdate?.(this.value, i), i && this.stop();
        }
        stop() {
            this.isRunning = !1;
        }
        fromTo(t, e, {lerp: i = .1, duration: s = 1, easing: o = t => t, onStart: n, onUpdate: r}) {
            this.from = this.value = t, this.to = e, this.lerp = i, this.duration = s, this.easing = o, 
            this.currentTime = 0, this.isRunning = !0, n?.(), this.onUpdate = r;
        }
    }
    class Dimensions {
        constructor({wrapper: t, content: e, autoResize: i = !0, debounce: s = 250} = {}) {
            this.wrapper = t, this.content = e, i && (this.debouncedResize = function(t, e) {
                let i;
                return function() {
                    let s = arguments, o = this;
                    clearTimeout(i), i = setTimeout((function() {
                        t.apply(o, s);
                    }), e);
                };
            }(this.resize, s), this.wrapper === window ? window.addEventListener("resize", this.debouncedResize, !1) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), 
            this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), 
            this.contentResizeObserver.observe(this.content)), this.resize();
        }
        destroy() {
            this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), 
            window.removeEventListener("resize", this.debouncedResize, !1);
        }
        resize=() => {
            this.onWrapperResize(), this.onContentResize();
        };
        onWrapperResize=() => {
            this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, 
            this.height = this.wrapper.clientHeight);
        };
        onContentResize=() => {
            this.wrapper === window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, 
            this.scrollWidth = this.wrapper.scrollWidth);
        };
        get limit() {
            return {
                x: this.scrollWidth - this.width,
                y: this.scrollHeight - this.height
            };
        }
    }
    class Emitter {
        constructor() {
            this.events = {};
        }
        emit(t, ...e) {
            let i = this.events[t] || [];
            for (let t = 0, s = i.length; t < s; t++) i[t](...e);
        }
        on(t, e) {
            return this.events[t]?.push(e) || (this.events[t] = [ e ]), () => {
                this.events[t] = this.events[t]?.filter((t => e !== t));
            };
        }
        off(t, e) {
            this.events[t] = this.events[t]?.filter((t => e !== t));
        }
        destroy() {
            this.events = {};
        }
    }
    const e = 100 / 6;
    class VirtualScroll {
        constructor(t, {wheelMultiplier: e = 1, touchMultiplier: i = 1}) {
            this.element = t, this.wheelMultiplier = e, this.touchMultiplier = i, this.touchStart = {
                x: null,
                y: null
            }, this.emitter = new Emitter, window.addEventListener("resize", this.onWindowResize, !1), 
            this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, {
                passive: !1
            }), this.element.addEventListener("touchstart", this.onTouchStart, {
                passive: !1
            }), this.element.addEventListener("touchmove", this.onTouchMove, {
                passive: !1
            }), this.element.addEventListener("touchend", this.onTouchEnd, {
                passive: !1
            });
        }
        on(t, e) {
            return this.emitter.on(t, e);
        }
        destroy() {
            this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, !1), 
            this.element.removeEventListener("wheel", this.onWheel, {
                passive: !1
            }), this.element.removeEventListener("touchstart", this.onTouchStart, {
                passive: !1
            }), this.element.removeEventListener("touchmove", this.onTouchMove, {
                passive: !1
            }), this.element.removeEventListener("touchend", this.onTouchEnd, {
                passive: !1
            });
        }
        onTouchStart=t => {
            const {clientX: e, clientY: i} = t.targetTouches ? t.targetTouches[0] : t;
            this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
                x: 0,
                y: 0
            }, this.emitter.emit("scroll", {
                deltaX: 0,
                deltaY: 0,
                event: t
            });
        };
        onTouchMove=t => {
            const {clientX: e, clientY: i} = t.targetTouches ? t.targetTouches[0] : t, s = -(e - this.touchStart.x) * this.touchMultiplier, o = -(i - this.touchStart.y) * this.touchMultiplier;
            this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
                x: s,
                y: o
            }, this.emitter.emit("scroll", {
                deltaX: s,
                deltaY: o,
                event: t
            });
        };
        onTouchEnd=t => {
            this.emitter.emit("scroll", {
                deltaX: this.lastDelta.x,
                deltaY: this.lastDelta.y,
                event: t
            });
        };
        onWheel=t => {
            let {deltaX: i, deltaY: s, deltaMode: o} = t;
            i *= 1 === o ? e : 2 === o ? this.windowWidth : 1, s *= 1 === o ? e : 2 === o ? this.windowHeight : 1, 
            i *= this.wheelMultiplier, s *= this.wheelMultiplier, this.emitter.emit("scroll", {
                deltaX: i,
                deltaY: s,
                event: t
            });
        };
        onWindowResize=() => {
            this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight;
        };
    }
    class Lenis {
        constructor({wrapper: t = window, content: e = document.documentElement, wheelEventsTarget: i = t, eventsTarget: s = i, smoothWheel: o = !0, syncTouch: n = !1, syncTouchLerp: r = .075, touchInertiaMultiplier: l = 35, duration: h, easing: a = t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), lerp: c = !h && .1, infinite: d = !1, orientation: p = "vertical", gestureOrientation: u = "vertical", touchMultiplier: m = 1, wheelMultiplier: v = 1, autoResize: g = !0, __experimental__naiveDimensions: S = !1} = {}) {
            this.__isSmooth = !1, this.__isScrolling = !1, this.__isStopped = !1, this.__isLocked = !1, 
            this.onVirtualScroll = ({deltaX: t, deltaY: e, event: i}) => {
                if (i.ctrlKey) return;
                const s = i.type.includes("touch"), o = i.type.includes("wheel");
                if (this.options.syncTouch && s && "touchstart" === i.type && !this.isStopped && !this.isLocked) return void this.reset();
                const n = 0 === t && 0 === e, r = "vertical" === this.options.gestureOrientation && 0 === e || "horizontal" === this.options.gestureOrientation && 0 === t;
                if (n || r) return;
                let l = i.composedPath();
                if (l = l.slice(0, l.indexOf(this.rootElement)), l.find((t => {
                    var e, i, n, r, l;
                    return (null === (e = t.hasAttribute) || void 0 === e ? void 0 : e.call(t, "data-lenis-prevent")) || s && (null === (i = t.hasAttribute) || void 0 === i ? void 0 : i.call(t, "data-lenis-prevent-touch")) || o && (null === (n = t.hasAttribute) || void 0 === n ? void 0 : n.call(t, "data-lenis-prevent-wheel")) || (null === (r = t.classList) || void 0 === r ? void 0 : r.contains("lenis")) && !(null === (l = t.classList) || void 0 === l ? void 0 : l.contains("lenis-stopped"));
                }))) return;
                if (this.isStopped || this.isLocked) return void i.preventDefault();
                if (this.isSmooth = this.options.syncTouch && s || this.options.smoothWheel && o, 
                !this.isSmooth) return this.isScrolling = !1, void this.animate.stop();
                i.preventDefault();
                let h = e;
                "both" === this.options.gestureOrientation ? h = Math.abs(e) > Math.abs(t) ? e : t : "horizontal" === this.options.gestureOrientation && (h = t);
                const a = s && this.options.syncTouch, c = s && "touchend" === i.type && Math.abs(h) > 5;
                c && (h = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + h, Object.assign({
                    programmatic: !1
                }, a ? {
                    lerp: c ? this.options.syncTouchLerp : 1
                } : {
                    lerp: this.options.lerp,
                    duration: this.options.duration,
                    easing: this.options.easing
                }));
            }, this.onNativeScroll = () => {
                if (!this.__preventNextScrollEvent && !this.isScrolling) {
                    const t = this.animatedScroll;
                    this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, 
                    this.direction = Math.sign(this.animatedScroll - t), this.emit();
                }
            }, window.lenisVersion = "1.0.42", t !== document.documentElement && t !== document.body || (t = window), 
            this.options = {
                wrapper: t,
                content: e,
                wheelEventsTarget: i,
                eventsTarget: s,
                smoothWheel: o,
                syncTouch: n,
                syncTouchLerp: r,
                touchInertiaMultiplier: l,
                duration: h,
                easing: a,
                lerp: c,
                infinite: d,
                gestureOrientation: u,
                orientation: p,
                touchMultiplier: m,
                wheelMultiplier: v,
                autoResize: g,
                __experimental__naiveDimensions: S
            }, this.animate = new Animate, this.emitter = new Emitter, this.dimensions = new Dimensions({
                wrapper: t,
                content: e,
                autoResize: g
            }), this.toggleClassName("lenis", !0), this.velocity = 0, this.isLocked = !1, this.isStopped = !1, 
            this.isSmooth = n || o, this.isScrolling = !1, this.targetScroll = this.animatedScroll = this.actualScroll, 
            this.options.wrapper.addEventListener("scroll", this.onNativeScroll, !1), this.virtualScroll = new VirtualScroll(s, {
                touchMultiplier: m,
                wheelMultiplier: v
            }), this.virtualScroll.on("scroll", this.onVirtualScroll);
        }
        destroy() {
            this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, !1), 
            this.virtualScroll.destroy(), this.dimensions.destroy(), this.toggleClassName("lenis", !1), 
            this.toggleClassName("lenis-smooth", !1), this.toggleClassName("lenis-scrolling", !1), 
            this.toggleClassName("lenis-stopped", !1), this.toggleClassName("lenis-locked", !1);
        }
        on(t, e) {
            return this.emitter.on(t, e);
        }
        off(t, e) {
            return this.emitter.off(t, e);
        }
        setScroll(t) {
            this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t;
        }
        resize() {
            this.dimensions.resize();
        }
        emit() {
            this.emitter.emit("scroll", this);
        }
        reset() {
            this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, 
            this.velocity = 0, this.animate.stop();
        }
        start() {
            this.isStopped && (this.isStopped = !1, this.reset());
        }
        stop() {
            this.isStopped || (this.isStopped = !0, this.animate.stop(), this.reset());
        }
        raf(t) {
            const e = t - (this.time || t);
            this.time = t, this.animate.advance(.001 * e);
        }
        scrollTo(e, {offset: i = 0, immediate: s = !1, lock: o = !1, duration: n = this.options.duration, easing: r = this.options.easing, lerp: l = !n && this.options.lerp, onComplete: h, force: a = !1, programmatic: c = !0} = {}) {
            if (!this.isStopped && !this.isLocked || a) {
                if ([ "top", "left", "start" ].includes(e)) e = 0; else if ([ "bottom", "right", "end" ].includes(e)) e = this.limit; else {
                    let t;
                    if ("string" == typeof e ? t = document.querySelector(e) : (null == e ? void 0 : e.nodeType) && (t = e), 
                    t) {
                        if (this.options.wrapper !== window) {
                            const t = this.options.wrapper.getBoundingClientRect();
                            i -= this.isHorizontal ? t.left : t.top;
                        }
                        const s = t.getBoundingClientRect();
                        e = (this.isHorizontal ? s.left : s.top) + this.animatedScroll;
                    }
                }
                if ("number" == typeof e) {
                    if (e += i, e = Math.round(e), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : e = t(0, e, this.limit), 
                    s) return this.animatedScroll = this.targetScroll = e, this.setScroll(this.scroll), 
                    this.reset(), void (null == h || h(this));
                    if (!c) {
                        if (e === this.targetScroll) return;
                        this.targetScroll = e;
                    }
                    this.animate.fromTo(this.animatedScroll, e, {
                        duration: n,
                        easing: r,
                        lerp: l,
                        onStart: () => {
                            o && (this.isLocked = !0), this.isScrolling = !0;
                        },
                        onUpdate: (t, e) => {
                            this.isScrolling = !0, this.velocity = t - this.animatedScroll, this.direction = Math.sign(this.velocity), 
                            this.animatedScroll = t, this.setScroll(this.scroll), c && (this.targetScroll = t), 
                            e || this.emit(), e && (this.reset(), this.emit(), null == h || h(this), this.__preventNextScrollEvent = !0, 
                            requestAnimationFrame((() => {
                                delete this.__preventNextScrollEvent;
                            })));
                        }
                    });
                }
            }
        }
        get rootElement() {
            return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
        }
        get limit() {
            return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
        }
        get isHorizontal() {
            return "horizontal" === this.options.orientation;
        }
        get actualScroll() {
            return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
        }
        get scroll() {
            return this.options.infinite ? (t = this.animatedScroll, e = this.limit, (t % e + e) % e) : this.animatedScroll;
            var t, e;
        }
        get progress() {
            return 0 === this.limit ? 1 : this.scroll / this.limit;
        }
        get isSmooth() {
            return this.__isSmooth;
        }
        set isSmooth(t) {
            this.__isSmooth !== t && (this.__isSmooth = t, this.toggleClassName("lenis-smooth", t));
        }
        get isScrolling() {
            return this.__isScrolling;
        }
        set isScrolling(t) {
            this.__isScrolling !== t && (this.__isScrolling = t, this.toggleClassName("lenis-scrolling", t));
        }
        get isStopped() {
            return this.__isStopped;
        }
        set isStopped(t) {
            this.__isStopped !== t && (this.__isStopped = t, this.toggleClassName("lenis-stopped", t));
        }
        get isLocked() {
            return this.__isLocked;
        }
        set isLocked(t) {
            this.__isLocked !== t && (this.__isLocked = t, this.toggleClassName("lenis-locked", t));
        }
        get className() {
            let t = "lenis";
            return this.isStopped && (t += " lenis-stopped"), this.isLocked && (t += " lenis-locked"), 
            this.isScrolling && (t += " lenis-scrolling"), this.isSmooth && (t += " lenis-smooth"), 
            t;
        }
        toggleClassName(t, e) {
            this.rootElement.classList.toggle(t, e), this.emitter.emit("className change", this);
        }
    }
    const initSmoothScroll = () => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap_gsap.ticker.add((time => {
            lenis.raf(time * 1e3);
        }));
        gsap_gsap.ticker.lagSmoothing(0);
        const handleAnchorClick = (e, targetId) => {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            lenis.scrollTo(targetElement, {
                offset: 0,
                immediate: false
            });
        };
        document.querySelectorAll('a[href*="#"]').forEach((anchor => {
            anchor.addEventListener("click", (e => {
                const href = anchor.getAttribute("href");
                if (href.startsWith("#")) handleAnchorClick(e, href); else {
                    const url = new URL(href, window.location.origin);
                    if (url.pathname === window.location.pathname) handleAnchorClick(e, url.hash);
                }
            }));
        }));
        window.addEventListener("load", (() => {
            const hash = window.location.hash;
            if (hash) setTimeout((() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) lenis.scrollTo(targetElement, {
                    offset: 0,
                    immediate: false
                });
            }), 100);
        }));
        return lenis;
    };
    initSmoothScroll();
    document.addEventListener("DOMContentLoaded", (() => {
        const popup = document.querySelector("[data-video-popup]");
        const container = document.querySelector("[data-video-container]");
        const openButtons = document.querySelectorAll("[data-video-open]");
        const closeButton = document.querySelector("[data-video-close]");
        function openPopup(videoUrl) {
            const iframe = document.createElement("iframe");
            iframe.src = videoUrl;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            container.innerHTML = "";
            container.appendChild(iframe);
            popup.classList.add("active");
            document.body.style.overflow = "hidden";
        }
        function closePopup() {
            popup.classList.remove("active");
            container.innerHTML = "";
            document.body.style.overflow = "";
        }
        openButtons.forEach((button => {
            button.addEventListener("click", (() => {
                const videoUrl = button.getAttribute("data-video-open");
                openPopup(videoUrl);
            }));
        }));
        closeButton.addEventListener("click", closePopup);
        popup.addEventListener("click", (e => {
            if (e.target === popup) closePopup();
        }));
        document.addEventListener("keydown", (e => {
            if (e.key === "Escape" && popup.classList.contains("active")) closePopup();
        }));
    }));
    window["FLS"] = true;
    isWebp();
    addTouchClass();
    addLoadedClass();
    menuInit();
})();