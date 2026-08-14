import {v as _, y as j} from "./C6yt-oCC.js";
function S(l) {
    return typeof l == "symbol" ? !1 : !isNaN(l)
}
function M(l, e) {
    let r = l - l % e;
    return l % e != 0 && (r += e),
    r
}
function O(l) {
    let e = 0;
    for (const {align: r=1, size: n} of Object.values(l))
        e = M(e, r) + n;
    return e = M(e, L(l)),
    e
}
function L(l) {
    return Math.max(...Object.values(l).map(e => e.align ?? 1))
}
function x(l, e, {byteOffset: r=0, length: n=0, align: a=L(e)}={}) {
    const f = new DataView(l,r);
    let u = 0;
    const t = {
        ...e
    };
    for (const [i,s] of Object.entries(t))
        t[i] = {
            ...s,
            offset: M(u, s.align ?? 1)
        },
        u = t[i].offset + s.size;
    return u = M(u, a),
    n || (n = Math.floor((l.byteLength - r) / u)),
    new Proxy(new Array(n),{
        has(i, s) {
            return S(s) ? s < n : s === "buffer" ? !0 : s in i
        },
        get(i, s, w) {
            if (s === "buffer")
                return l;
            if (!S(s)) {
                let g = i[s];
                return typeof g == "function" && (g = g.bind(w)),
                g
            }
            const d = parseInt(s)
              , y = d * u;
            if (!(d >= i.length)) {
                if (!i[d]) {
                    i[d] = {};
                    for (const [g,b] of Object.entries(t))
                        "get"in b && Object.defineProperty(i[d], g, {
                            enumerable: !0,
                            get() {
                                return b.get(f, y + b.offset)
                            },
                            set(o) {
                                return b.set(f, y + b.offset, o)
                            }
                        });
                    Object.freeze(i[d])
                }
                return i[d]
            }
        }
    })
}
function k(l, e, {byteOffset: r=0, align: n=1}={}) {
    return x(l, e, {
        byteOffset: r,
        align: n
    })[0]
}
function E({endianness: l="little", align: e=4}={}) {
    if (l !== "big" && l !== "little")
        throw Error("Endianness needs to be either 'big' or 'little'");
    const r = l === "little";
    return {
        align: e,
        size: Float32Array.BYTES_PER_ELEMENT,
        get: (n, a) => n.getFloat32(a, r),
        set: (n, a, f) => n.setFloat32(a, f, r)
    }
}
function U() {
    return {
        align: 1,
        size: 1,
        get: (l, e) => l.getUint8(e),
        set: (l, e, r) => l.setUint8(e, r)
    }
}
function Y(l) {
    const e = O(l);
    return {
        align: L(l),
        size: e,
        get: (r, n) => x(r.buffer, l, {
            byteOffset: r.byteOffset + n,
            length: 1
        })[0],
        set: (r, n, a) => {
            throw Error("Can’t set an entire struct")
        }
    }
}
var v = {}, B;
function z() {
    return B || (B = 1,
    function(l) {
        (function() {
            var e;
            e = l !== null ? l : this,
            e.Lethargy = function() {
                function r(n, a, f, u) {
                    this.stability = n != null ? Math.abs(n) : 8,
                    this.sensitivity = a != null ? 1 + Math.abs(a) : 100,
                    this.tolerance = f != null ? 1 + Math.abs(f) : 1.1,
                    this.delay = u ?? 150,
                    this.lastUpDeltas = function() {
                        var t, i, s;
                        for (s = [],
                        t = 1,
                        i = this.stability * 2; 1 <= i ? t <= i : t >= i; 1 <= i ? t++ : t--)
                            s.push(null);
                        return s
                    }
                    .call(this),
                    this.lastDownDeltas = function() {
                        var t, i, s;
                        for (s = [],
                        t = 1,
                        i = this.stability * 2; 1 <= i ? t <= i : t >= i; 1 <= i ? t++ : t--)
                            s.push(null);
                        return s
                    }
                    .call(this),
                    this.deltasTimestamp = function() {
                        var t, i, s;
                        for (s = [],
                        t = 1,
                        i = this.stability * 2; 1 <= i ? t <= i : t >= i; 1 <= i ? t++ : t--)
                            s.push(null);
                        return s
                    }
                    .call(this)
                }
                return r.prototype.check = function(n) {
                    var a;
                    return n = n.originalEvent || n,
                    n.wheelDelta != null ? a = n.wheelDelta : n.deltaY != null ? a = n.deltaY * -40 : (n.detail != null || n.detail === 0) && (a = n.detail * -40),
                    this.deltasTimestamp.push(Date.now()),
                    this.deltasTimestamp.shift(),
                    a > 0 ? (this.lastUpDeltas.push(a),
                    this.lastUpDeltas.shift(),
                    this.isInertia(1)) : (this.lastDownDeltas.push(a),
                    this.lastDownDeltas.shift(),
                    this.isInertia(-1))
                }
                ,
                r.prototype.isInertia = function(n) {
                    var a, f, u, t, i, s, w;
                    return a = n === -1 ? this.lastDownDeltas : this.lastUpDeltas,
                    a[0] === null ? n : this.deltasTimestamp[this.stability * 2 - 2] + this.delay > Date.now() && a[0] === a[this.stability * 2 - 1] ? !1 : (u = a.slice(0, this.stability),
                    f = a.slice(this.stability, this.stability * 2),
                    w = u.reduce(function(d, y) {
                        return d + y
                    }),
                    i = f.reduce(function(d, y) {
                        return d + y
                    }),
                    s = w / u.length,
                    t = i / f.length,
                    Math.abs(s) < Math.abs(t * this.tolerance) && this.sensitivity < Math.abs(t) ? n : !1)
                }
                ,
                r.prototype.showLastUpDeltas = function() {
                    return this.lastUpDeltas
                }
                ,
                r.prototype.showLastDownDeltas = function() {
                    return this.lastDownDeltas
                }
                ,
                r
            }()
        }
        ).call(v)
    }(v)),
    v
}
var I = z();
const A = {
    x: E(),
    y: E(),
    down: U()
}
  , T = {
    y: E(),
    dampY: E()
}
  , D = {
    mouse: Y(A),
    wheel: Y(T)
}
  , P = l => {
    let e = 0, r = 0, n = .1, a;
    window.SharedArrayBuffer ? a = new SharedArrayBuffer(O(D)) : a = new ArrayBuffer(O(D));
    let f = k(a, D)
      , u = 0
      , t = l.keyframes.map(o => (o -= .5,
    o *= 1e3,
    o))
      , i = 4.25 * 1e3
      , s = !window.location.search.includes("nohelp")
      , w = [t[3], t[4]]
      , d = new I.Lethargy;
    window.addEventListener("wheel", o => {
        if (l.canScroll.value)
            return;
        let c = 1;
        e < w[0] || e > w[1] || (c = 20),
        e >= t[0] && e <= t[1] - 550 && (c = .1),
        !(c <= 1 && d.check(o) === !1) && (e = Math.min(Math.max(0, e + o.deltaY * (n * c)), i),
        u = Math.sign(o.deltaY))
    }
    ),
    window.addEventListener("touchstart", o => {
        l.canScroll.value || (r = o.touches[0].clientY,
        performance.now())
    }
    ),
    window.addEventListener("touchmove", o => {
        if (l.canScroll.value)
            return;
        let c = o.touches[0].clientY
          , h = c - r
          , m = e;
        u = -Math.sign(h);
        let p = 1;
        e < w[0] || e > w[1] || (p = 20),
        e >= t[0] && e <= t[1] - 550 && (p = .1),
        e = Math.min(Math.max(0, m - h * 2 * (n * p)), i),
        f.wheel.y = e,
        f.mouse.x = o.touches[0].clientX,
        f.mouse.y = o.touches[0].clientY,
        r = c
    }
    ),
    window.addEventListener("mousemove", o => {
        f.mouse.x = o.clientX,
        f.mouse.y = o.clientY
    }
    ),
    window.addEventListener("mousedown", o => {
        f.mouse.down = !0
    }
    ),
    window.addEventListener("mouseup", o => {
        f.mouse.down = !1
    }
    );
    let y = _(0)
      , g = !0;
    return $on("openDverso", () => {
        g = !1,
        setTimeout( () => {
            g = !0,
            y.value = e - .1
        }
        , 3e3)
    }
    ),
    $on("scrollto", o => {
        e = t[o]
    }
    ),
    {
        updateRef: o => {
            if (!g)
                return;
            let c = e;
            if (u !== 0)
                if (u == 1)
                    for (let h = 0; h < t.length; h++) {
                        let m = t[h];
                        if (c <= m) {
                            c = t[h];
                            break
                        }
                    }
                else
                    for (let h = t.length - 1; h >= 0; h--) {
                        let m = t[h];
                        if (c >= m) {
                            c = t[h];
                            break
                        }
                    }
            if (s && (e < w[0] || e > w[1])) {
                let h = 50
                  , m = 3;
                u == -1 && (m = 2,
                h = 80),
                e >= t[0] && e <= t[1] - 550 && u == 1 && (m = 1,
                h = 120),
                e >= t[4] && e <= t[5] && (u == -1 ? (m = 10,
                h = 10) : (m = 5,
                h = 50)),
                e >= t[5] && e <= t[6] && u == -1 && (m = 6,
                h = 30);
                let p = e - c;
                p /= h,
                e -= Math.sign(p) * Math.max(m, Math.abs(p)),
                u == 1 ? e = Math.min(e, c) : e = Math.max(e, c)
            }
            j(y, "value", e, .2, o / 1e3),
            f.wheel.dampY = y.value
        }
        ,
        wheelRef: y,
        bboView: f,
        sharedBuffer: a
    }
}
  , N = Object.freeze(Object.defineProperty({
    __proto__: null,
    getCoordinatedScrolling: P,
    mouseAndWheelBBO: D,
    mouseBBO: A,
    wheelBBO: T
}, Symbol.toStringTag, {
    value: "Module"
}));
export {k as T, D as m, N as t};











import {u as e} from "./C6yt-oCC.js";
const r = {
    __name: "index",
    setup(t) {
        return e({
            title: "dverso studio - Web Design & Development",
            link: [{
                rel: "canonical",
                href: "https://dversostudio.io/"
            }],
            meta: [{
                property: "og:site_name",
                content: "dverso studio - Web Design & Development"
            }, {
                property: "og:url",
                content: "https://dversostudio.io/"
            }]
        }),
        (o, s) => null
    }
};
export {r as default};








const __vite__mapDeps = (i, m=__vite__mapDeps, d=(m.f || (m.f = ["./fC1lwDTD.js", "./_id_.CAMG7ZA6.css", "./CkHkKnIE.js", "./_id_.BfHDFb6X.css", "./Cc3m6KU0.js", "./BCdXsNjA.js", "./msUcURIN.js", "./error-404.DjTVVrW_.css", "./BCxKoa5J.js", "./error-500.cpus-O3q.css"]))) => i.map(i => d[i]);
(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
        o(i);
    new MutationObserver(i => {
        for (const s of i)
            if (s.type === "childList")
                for (const c of s.addedNodes)
                    c.tagName === "LINK" && c.rel === "modulepreload" && o(c)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function r(i) {
        const s = {};
        return i.integrity && (s.integrity = i.integrity),
        i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy),
        i.crossOrigin === "use-credentials" ? s.credentials = "include" : i.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin",
        s
    }
    function o(i) {
        if (i.ep)
            return;
        i.ep = !0;
        const s = r(i);
        fetch(i.href, s)
    }
}
)();
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
function If(e) {
    const t = Object.create(null);
    for (const r of e.split(","))
        t[r] = 1;
    return r => r in t
}
const Ze = {}
  , Mo = []
  , Pr = () => {}
  , O6 = () => !1
  , qi = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97)
  , jf = e => e.startsWith("onUpdate:")
  , Tt = Object.assign
  , Hf = (e, t) => {
    const r = e.indexOf(t);
    r > -1 && e.splice(r, 1)
}
  , R6 = Object.prototype.hasOwnProperty
  , Be = (e, t) => R6.call(e, t)
  , be = Array.isArray
  , Io = e => Ki(e) === "[object Map]"
  , Q0 = e => Ki(e) === "[object Set]"
  , M6 = e => Ki(e) === "[object RegExp]"
  , Te = e => typeof e == "function"
  , ot = e => typeof e == "string"
  , hn = e => typeof e == "symbol"
  , Qe = e => e !== null && typeof e == "object"
  , eg = e => (Qe(e) || Te(e)) && Te(e.then) && Te(e.catch)
  , tg = Object.prototype.toString
  , Ki = e => tg.call(e)
  , I6 = e => Ki(e).slice(8, -1)
  , rg = e => Ki(e) === "[object Object]"
  , Df = e => ot(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
  , jo = If(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
  , Ha = e => {
    const t = Object.create(null);
    return r => t[r] || (t[r] = e(r))
}
  , j6 = /-(\w)/g
  , fr = Ha(e => e.replace(j6, (t, r) => r ? r.toUpperCase() : ""))
  , H6 = /\B([A-Z])/g
  , ro = Ha(e => e.replace(H6, "-$1").toLowerCase())
  , Da = Ha(e => e.charAt(0).toUpperCase() + e.slice(1))
  , gu = Ha(e => e ? `on${Da(e)}` : "")
  , dn = (e, t) => !Object.is(e, t)
  , xi = (e, ...t) => {
    for (let r = 0; r < e.length; r++)
        e[r](...t)
}
  , ng = (e, t, r, o=!1) => {
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        writable: o,
        value: r
    })
}
  , D6 = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t
}
  , og = e => {
    const t = ot(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t
}
;
let lh;
const La = () => lh || (lh = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function rt(e) {
    if (be(e)) {
        const t = {};
        for (let r = 0; r < e.length; r++) {
            const o = e[r]
              , i = ot(o) ? F6(o) : rt(o);
            if (i)
                for (const s in i)
                    t[s] = i[s]
        }
        return t
    } else if (ot(e) || Qe(e))
        return e
}
const L6 = /;(?![^(]*\))/g
  , B6 = /:([^]+)/
  , N6 = /\/\*[^]*?\*\//g;
function F6(e) {
    const t = {};
    return e.replace(N6, "").split(L6).forEach(r => {
        if (r) {
            const o = r.split(B6);
            o.length > 1 && (t[o[0].trim()] = o[1].trim())
        }
    }
    ),
    t
}
function gr(e) {
    let t = "";
    if (ot(e))
        t = e;
    else if (be(e))
        for (let r = 0; r < e.length; r++) {
            const o = gr(e[r]);
            o && (t += o + " ")
        }
    else if (Qe(e))
        for (const r in e)
            e[r] && (t += r + " ");
    return t.trim()
}
function V6(e) {
    if (!e)
        return null;
    let {class: t, style: r} = e;
    return t && !ot(t) && (e.class = gr(t)),
    r && (e.style = rt(r)),
    e
}
const $6 = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  , z6 = If($6);
function ig(e) {
    return !!e || e === ""
}
const sg = e => !!(e && e.__v_isRef === !0)
  , wi = e => ot(e) ? e : e == null ? "" : be(e) || Qe(e) && (e.toString === tg || !Te(e.toString)) ? sg(e) ? wi(e.value) : JSON.stringify(e, ag, 2) : String(e)
  , ag = (e, t) => sg(t) ? ag(e, t.value) : Io(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce( (r, [o,i], s) => (r[_u(o, s) + " =>"] = i,
    r), {})
} : Q0(t) ? {
    [`Set(${t.size})`]: [...t.values()].map(r => _u(r))
} : hn(t) ? _u(t) : Qe(t) && !be(t) && !rg(t) ? String(t) : t
  , _u = (e, t="") => {
    var r;
    return hn(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e
}
;
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Bt;
class lg {
    constructor(t=!1) {
        this.detached = t,
        this._active = !0,
        this.effects = [],
        this.cleanups = [],
        this._isPaused = !1,
        this.parent = Bt,
        !t && Bt && (this.index = (Bt.scopes || (Bt.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    pause() {
        if (this._active) {
            this._isPaused = !0;
            let t, r;
            if (this.scopes)
                for (t = 0,
                r = this.scopes.length; t < r; t++)
                    this.scopes[t].pause();
            for (t = 0,
            r = this.effects.length; t < r; t++)
                this.effects[t].pause()
        }
    }
    resume() {
        if (this._active && this._isPaused) {
            this._isPaused = !1;
            let t, r;
            if (this.scopes)
                for (t = 0,
                r = this.scopes.length; t < r; t++)
                    this.scopes[t].resume();
            for (t = 0,
            r = this.effects.length; t < r; t++)
                this.effects[t].resume()
        }
    }
    run(t) {
        if (this._active) {
            const r = Bt;
            try {
                return Bt = this,
                t()
            } finally {
                Bt = r
            }
        }
    }
    on() {
        Bt = this
    }
    off() {
        Bt = this.parent
    }
    stop(t) {
        if (this._active) {
            this._active = !1;
            let r, o;
            for (r = 0,
            o = this.effects.length; r < o; r++)
                this.effects[r].stop();
            for (this.effects.length = 0,
            r = 0,
            o = this.cleanups.length; r < o; r++)
                this.cleanups[r]();
            if (this.cleanups.length = 0,
            this.scopes) {
                for (r = 0,
                o = this.scopes.length; r < o; r++)
                    this.scopes[r].stop(!0);
                this.scopes.length = 0
            }
            if (!this.detached && this.parent && !t) {
                const i = this.parent.scopes.pop();
                i && i !== this && (this.parent.scopes[this.index] = i,
                i.index = this.index)
            }
            this.parent = void 0
        }
    }
}
function U6(e) {
    return new lg(e)
}
function Lf() {
    return Bt
}
function ch(e, t=!1) {
    Bt && Bt.cleanups.push(e)
}
let Ye;
const mu = new WeakSet;
class cg {
    constructor(t) {
        this.fn = t,
        this.deps = void 0,
        this.depsTail = void 0,
        this.flags = 5,
        this.next = void 0,
        this.cleanup = void 0,
        this.scheduler = void 0,
        Bt && Bt.active && Bt.effects.push(this)
    }
    pause() {
        this.flags |= 64
    }
    resume() {
        this.flags & 64 && (this.flags &= -65,
        mu.has(this) && (mu.delete(this),
        this.trigger()))
    }
    notify() {
        this.flags & 2 && !(this.flags & 32) || this.flags & 8 || fg(this)
    }
    run() {
        if (!(this.flags & 1))
            return this.fn();
        this.flags |= 2,
        uh(this),
        dg(this);
        const t = Ye
          , r = _r;
        Ye = this,
        _r = !0;
        try {
            return this.fn()
        } finally {
            pg(this),
            Ye = t,
            _r = r,
            this.flags &= -3
        }
    }
    stop() {
        if (this.flags & 1) {
            for (let t = this.deps; t; t = t.nextDep)
                Ff(t);
            this.deps = this.depsTail = void 0,
            uh(this),
            this.onStop && this.onStop(),
            this.flags &= -2
        }
    }
    trigger() {
        this.flags & 64 ? mu.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty()
    }
    runIfDirty() {
        Ku(this) && this.run()
    }
    get dirty() {
        return Ku(this)
    }
}
let ug = 0, ki, Ei;
function fg(e, t=!1) {
    if (e.flags |= 8,
    t) {
        e.next = Ei,
        Ei = e;
        return
    }
    e.next = ki,
    ki = e
}
function Bf() {
    ug++
}
function Nf() {
    if (--ug > 0)
        return;
    if (Ei) {
        let t = Ei;
        for (Ei = void 0; t; ) {
            const r = t.next;
            t.next = void 0,
            t.flags &= -9,
            t = r
        }
    }
    let e;
    for (; ki; ) {
        let t = ki;
        for (ki = void 0; t; ) {
            const r = t.next;
            if (t.next = void 0,
            t.flags &= -9,
            t.flags & 1)
                try {
                    t.trigger()
                } catch (o) {
                    e || (e = o)
                }
            t = r
        }
    }
    if (e)
        throw e
}
function dg(e) {
    for (let t = e.deps; t; t = t.nextDep)
        t.version = -1,
        t.prevActiveLink = t.dep.activeLink,
        t.dep.activeLink = t
}
function pg(e) {
    let t, r = e.depsTail, o = r;
    for (; o; ) {
        const i = o.prevDep;
        o.version === -1 ? (o === r && (r = i),
        Ff(o),
        q6(o)) : t = o,
        o.dep.activeLink = o.prevActiveLink,
        o.prevActiveLink = void 0,
        o = i
    }
    e.deps = t,
    e.depsTail = r
}
function Ku(e) {
    for (let t = e.deps; t; t = t.nextDep)
        if (t.dep.version !== t.version || t.dep.computed && (hg(t.dep.computed) || t.dep.version !== t.version))
            return !0;
    return !!e._dirty
}
function hg(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17,
    e.globalVersion === Di))
        return;
    e.globalVersion = Di;
    const t = e.dep;
    if (e.flags |= 2,
    t.version > 0 && !e.isSSR && e.deps && !Ku(e)) {
        e.flags &= -3;
        return
    }
    const r = Ye
      , o = _r;
    Ye = e,
    _r = !0;
    try {
        dg(e);
        const i = e.fn(e._value);
        (t.version === 0 || dn(i, e._value)) && (e._value = i,
        t.version++)
    } catch (i) {
        throw t.version++,
        i
    } finally {
        Ye = r,
        _r = o,
        pg(e),
        e.flags &= -3
    }
}
function Ff(e, t=!1) {
    const {dep: r, prevSub: o, nextSub: i} = e;
    if (o && (o.nextSub = i,
    e.prevSub = void 0),
    i && (i.prevSub = o,
    e.nextSub = void 0),
    r.subs === e && (r.subs = o,
    !o && r.computed)) {
        r.computed.flags &= -5;
        for (let s = r.computed.deps; s; s = s.nextDep)
            Ff(s, !0)
    }
    !t && !--r.sc && r.map && r.map.delete(r.key)
}
function q6(e) {
    const {prevDep: t, nextDep: r} = e;
    t && (t.nextDep = r,
    e.prevDep = void 0),
    r && (r.prevDep = t,
    e.nextDep = void 0)
}
let _r = !0;
const gg = [];
function gn() {
    gg.push(_r),
    _r = !1
}
function _n() {
    const e = gg.pop();
    _r = e === void 0 ? !0 : e
}
function uh(e) {
    const {cleanup: t} = e;
    if (e.cleanup = void 0,
    t) {
        const r = Ye;
        Ye = void 0;
        try {
            t()
        } finally {
            Ye = r
        }
    }
}
let Di = 0;
class K6 {
    constructor(t, r) {
        this.sub = t,
        this.dep = r,
        this.version = r.version,
        this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0
    }
}
class Vf {
    constructor(t) {
        this.computed = t,
        this.version = 0,
        this.activeLink = void 0,
        this.subs = void 0,
        this.map = void 0,
        this.key = void 0,
        this.sc = 0
    }
    track(t) {
        if (!Ye || !_r || Ye === this.computed)
            return;
        let r = this.activeLink;
        if (r === void 0 || r.sub !== Ye)
            r = this.activeLink = new K6(Ye,this),
            Ye.deps ? (r.prevDep = Ye.depsTail,
            Ye.depsTail.nextDep = r,
            Ye.depsTail = r) : Ye.deps = Ye.depsTail = r,
            _g(r);
        else if (r.version === -1 && (r.version = this.version,
        r.nextDep)) {
            const o = r.nextDep;
            o.prevDep = r.prevDep,
            r.prevDep && (r.prevDep.nextDep = o),
            r.prevDep = Ye.depsTail,
            r.nextDep = void 0,
            Ye.depsTail.nextDep = r,
            Ye.depsTail = r,
            Ye.deps === r && (Ye.deps = o)
        }
        return r
    }
    trigger(t) {
        this.version++,
        Di++,
        this.notify(t)
    }
    notify(t) {
        Bf();
        try {
            for (let r = this.subs; r; r = r.prevSub)
                r.sub.notify() && r.sub.dep.notify()
        } finally {
            Nf()
        }
    }
}
function _g(e) {
    if (e.dep.sc++,
    e.sub.flags & 4) {
        const t = e.dep.computed;
        if (t && !e.dep.subs) {
            t.flags |= 20;
            for (let o = t.deps; o; o = o.nextDep)
                _g(o)
        }
        const r = e.dep.subs;
        r !== e && (e.prevSub = r,
        r && (r.nextSub = e)),
        e.dep.subs = e
    }
}
const pa = new WeakMap
  , Xn = Symbol("")
  , Wu = Symbol("")
  , Li = Symbol("");
function Mt(e, t, r) {
    if (_r && Ye) {
        let o = pa.get(e);
        o || pa.set(e, o = new Map);
        let i = o.get(r);
        i || (o.set(r, i = new Vf),
        i.map = o,
        i.key = r),
        i.track()
    }
}
function Vr(e, t, r, o, i, s) {
    const c = pa.get(e);
    if (!c) {
        Di++;
        return
    }
    const d = h => {
        h && h.trigger()
    }
    ;
    if (Bf(),
    t === "clear")
        c.forEach(d);
    else {
        const h = be(e)
          , _ = h && Df(r);
        if (h && r === "length") {
            const g = Number(o);
            c.forEach( (l, f) => {
                (f === "length" || f === Li || !hn(f) && f >= g) && d(l)
            }
            )
        } else
            switch ((r !== void 0 || c.has(void 0)) && d(c.get(r)),
            _ && d(c.get(Li)),
            t) {
            case "add":
                h ? _ && d(c.get("length")) : (d(c.get(Xn)),
                Io(e) && d(c.get(Wu)));
                break;
            case "delete":
                h || (d(c.get(Xn)),
                Io(e) && d(c.get(Wu)));
                break;
            case "set":
                Io(e) && d(c.get(Xn));
                break
            }
    }
    Nf()
}
function W6(e, t) {
    const r = pa.get(e);
    return r && r.get(t)
}
function To(e) {
    const t = je(e);
    return t === e ? t : (Mt(t, "iterate", Li),
    ur(e) ? t : t.map(It))
}
function Ba(e) {
    return Mt(e = je(e), "iterate", Li),
    e
}
const G6 = {
    __proto__: null,
    [Symbol.iterator]() {
        return vu(this, Symbol.iterator, It)
    },
    concat(...e) {
        return To(this).concat(...e.map(t => be(t) ? To(t) : t))
    },
    entries() {
        return vu(this, "entries", e => (e[1] = It(e[1]),
        e))
    },
    every(e, t) {
        return Lr(this, "every", e, t, void 0, arguments)
    },
    filter(e, t) {
        return Lr(this, "filter", e, t, r => r.map(It), arguments)
    },
    find(e, t) {
        return Lr(this, "find", e, t, It, arguments)
    },
    findIndex(e, t) {
        return Lr(this, "findIndex", e, t, void 0, arguments)
    },
    findLast(e, t) {
        return Lr(this, "findLast", e, t, It, arguments)
    },
    findLastIndex(e, t) {
        return Lr(this, "findLastIndex", e, t, void 0, arguments)
    },
    forEach(e, t) {
        return Lr(this, "forEach", e, t, void 0, arguments)
    },
    includes(...e) {
        return yu(this, "includes", e)
    },
    indexOf(...e) {
        return yu(this, "indexOf", e)
    },
    join(e) {
        return To(this).join(e)
    },
    lastIndexOf(...e) {
        return yu(this, "lastIndexOf", e)
    },
    map(e, t) {
        return Lr(this, "map", e, t, void 0, arguments)
    },
    pop() {
        return _i(this, "pop")
    },
    push(...e) {
        return _i(this, "push", e)
    },
    reduce(e, ...t) {
        return fh(this, "reduce", e, t)
    },
    reduceRight(e, ...t) {
        return fh(this, "reduceRight", e, t)
    },
    shift() {
        return _i(this, "shift")
    },
    some(e, t) {
        return Lr(this, "some", e, t, void 0, arguments)
    },
    splice(...e) {
        return _i(this, "splice", e)
    },
    toReversed() {
        return To(this).toReversed()
    },
    toSorted(e) {
        return To(this).toSorted(e)
    },
    toSpliced(...e) {
        return To(this).toSpliced(...e)
    },
    unshift(...e) {
        return _i(this, "unshift", e)
    },
    values() {
        return vu(this, "values", It)
    }
};
function vu(e, t, r) {
    const o = Ba(e)
      , i = o[t]();
    return o !== e && !ur(e) && (i._next = i.next,
    i.next = () => {
        const s = i._next();
        return s.value && (s.value = r(s.value)),
        s
    }
    ),
    i
}
const X6 = Array.prototype;
function Lr(e, t, r, o, i, s) {
    const c = Ba(e)
      , d = c !== e && !ur(e)
      , h = c[t];
    if (h !== X6[t]) {
        const l = h.apply(e, s);
        return d ? It(l) : l
    }
    let _ = r;
    c !== e && (d ? _ = function(l, f) {
        return r.call(this, It(l), f, e)
    }
    : r.length > 2 && (_ = function(l, f) {
        return r.call(this, l, f, e)
    }
    ));
    const g = h.call(c, _, o);
    return d && i ? i(g) : g
}
function fh(e, t, r, o) {
    const i = Ba(e);
    let s = r;
    return i !== e && (ur(e) ? r.length > 3 && (s = function(c, d, h) {
        return r.call(this, c, d, h, e)
    }
    ) : s = function(c, d, h) {
        return r.call(this, c, It(d), h, e)
    }
    ),
    i[t](s, ...o)
}
function yu(e, t, r) {
    const o = je(e);
    Mt(o, "iterate", Li);
    const i = o[t](...r);
    return (i === -1 || i === !1) && Uf(r[0]) ? (r[0] = je(r[0]),
    o[t](...r)) : i
}
function _i(e, t, r=[]) {
    gn(),
    Bf();
    const o = je(e)[t].apply(e, r);
    return Nf(),
    _n(),
    o
}
const J6 = If("__proto__,__v_isRef,__isVue")
  , mg = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(hn));
function Y6(e) {
    hn(e) || (e = String(e));
    const t = je(this);
    return Mt(t, "has", e),
    t.hasOwnProperty(e)
}
class vg {
    constructor(t=!1, r=!1) {
        this._isReadonly = t,
        this._isShallow = r
    }
    get(t, r, o) {
        if (r === "__v_skip")
            return t.__v_skip;
        const i = this._isReadonly
          , s = this._isShallow;
        if (r === "__v_isReactive")
            return !i;
        if (r === "__v_isReadonly")
            return i;
        if (r === "__v_isShallow")
            return s;
        if (r === "__v_raw")
            return o === (i ? s ? a4 : Tg : s ? wg : bg).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
        const c = be(t);
        if (!i) {
            let h;
            if (c && (h = G6[r]))
                return h;
            if (r === "hasOwnProperty")
                return Y6
        }
        const d = Reflect.get(t, r, ut(t) ? t : o);
        return (hn(r) ? mg.has(r) : J6(r)) || (i || Mt(t, "get", r),
        s) ? d : ut(d) ? c && Df(r) ? d : d.value : Qe(d) ? i ? Sg(d) : Ar(d) : d
    }
}
class yg extends vg {
    constructor(t=!1) {
        super(!1, t)
    }
    set(t, r, o, i) {
        let s = t[r];
        if (!this._isShallow) {
            const h = pn(s);
            if (!ur(o) && !pn(o) && (s = je(s),
            o = je(o)),
            !be(t) && ut(s) && !ut(o))
                return h ? !1 : (s.value = o,
                !0)
        }
        const c = be(t) && Df(r) ? Number(r) < t.length : Be(t, r)
          , d = Reflect.set(t, r, o, ut(t) ? t : i);
        return t === je(i) && (c ? dn(o, s) && Vr(t, "set", r, o) : Vr(t, "add", r, o)),
        d
    }
    deleteProperty(t, r) {
        const o = Be(t, r);
        t[r];
        const i = Reflect.deleteProperty(t, r);
        return i && o && Vr(t, "delete", r, void 0),
        i
    }
    has(t, r) {
        const o = Reflect.has(t, r);
        return (!hn(r) || !mg.has(r)) && Mt(t, "has", r),
        o
    }
    ownKeys(t) {
        return Mt(t, "iterate", be(t) ? "length" : Xn),
        Reflect.ownKeys(t)
    }
}
class Z6 extends vg {
    constructor(t=!1) {
        super(!0, t)
    }
    set(t, r) {
        return !0
    }
    deleteProperty(t, r) {
        return !0
    }
}
const Q6 = new yg
  , e4 = new Z6
  , t4 = new yg(!0);
const Gu = e => e
  , qs = e => Reflect.getPrototypeOf(e);
function r4(e, t, r) {
    return function(...o) {
        const i = this.__v_raw
          , s = je(i)
          , c = Io(s)
          , d = e === "entries" || e === Symbol.iterator && c
          , h = e === "keys" && c
          , _ = i[e](...o)
          , g = r ? Gu : t ? Xu : It;
        return !t && Mt(s, "iterate", h ? Wu : Xn),
        {
            next() {
                const {value: l, done: f} = _.next();
                return f ? {
                    value: l,
                    done: f
                } : {
                    value: d ? [g(l[0]), g(l[1])] : g(l),
                    done: f
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function Ks(e) {
    return function(...t) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this
    }
}
function n4(e, t) {
    const r = {
        get(i) {
            const s = this.__v_raw
              , c = je(s)
              , d = je(i);
            e || (dn(i, d) && Mt(c, "get", i),
            Mt(c, "get", d));
            const {has: h} = qs(c)
              , _ = t ? Gu : e ? Xu : It;
            if (h.call(c, i))
                return _(s.get(i));
            if (h.call(c, d))
                return _(s.get(d));
            s !== c && s.get(i)
        },
        get size() {
            const i = this.__v_raw;
            return !e && Mt(je(i), "iterate", Xn),
            Reflect.get(i, "size", i)
        },
        has(i) {
            const s = this.__v_raw
              , c = je(s)
              , d = je(i);
            return e || (dn(i, d) && Mt(c, "has", i),
            Mt(c, "has", d)),
            i === d ? s.has(i) : s.has(i) || s.has(d)
        },
        forEach(i, s) {
            const c = this
              , d = c.__v_raw
              , h = je(d)
              , _ = t ? Gu : e ? Xu : It;
            return !e && Mt(h, "iterate", Xn),
            d.forEach( (g, l) => i.call(s, _(g), _(l), c))
        }
    };
    return Tt(r, e ? {
        add: Ks("add"),
        set: Ks("set"),
        delete: Ks("delete"),
        clear: Ks("clear")
    } : {
        add(i) {
            !t && !ur(i) && !pn(i) && (i = je(i));
            const s = je(this);
            return qs(s).has.call(s, i) || (s.add(i),
            Vr(s, "add", i, i)),
            this
        },
        set(i, s) {
            !t && !ur(s) && !pn(s) && (s = je(s));
            const c = je(this)
              , {has: d, get: h} = qs(c);
            let _ = d.call(c, i);
            _ || (i = je(i),
            _ = d.call(c, i));
            const g = h.call(c, i);
            return c.set(i, s),
            _ ? dn(s, g) && Vr(c, "set", i, s) : Vr(c, "add", i, s),
            this
        },
        delete(i) {
            const s = je(this)
              , {has: c, get: d} = qs(s);
            let h = c.call(s, i);
            h || (i = je(i),
            h = c.call(s, i)),
            d && d.call(s, i);
            const _ = s.delete(i);
            return h && Vr(s, "delete", i, void 0),
            _
        },
        clear() {
            const i = je(this)
              , s = i.size !== 0
              , c = i.clear();
            return s && Vr(i, "clear", void 0, void 0),
            c
        }
    }),
    ["keys", "values", "entries", Symbol.iterator].forEach(i => {
        r[i] = r4(i, e, t)
    }
    ),
    r
}
function $f(e, t) {
    const r = n4(e, t);
    return (o, i, s) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? o : Reflect.get(Be(r, i) && i in o ? r : o, i, s)
}
const o4 = {
    get: $f(!1, !1)
}
  , i4 = {
    get: $f(!1, !0)
}
  , s4 = {
    get: $f(!0, !1)
};
const bg = new WeakMap
  , wg = new WeakMap
  , Tg = new WeakMap
  , a4 = new WeakMap;
function l4(e) {
    switch (e) {
    case "Object":
    case "Array":
        return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2;
    default:
        return 0
    }
}
function c4(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : l4(I6(e))
}
function Ar(e) {
    return pn(e) ? e : zf(e, !1, Q6, o4, bg)
}
function zr(e) {
    return zf(e, !1, t4, i4, wg)
}
function Sg(e) {
    return zf(e, !0, e4, s4, Tg)
}
function zf(e, t, r, o, i) {
    if (!Qe(e) || e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const s = i.get(e);
    if (s)
        return s;
    const c = c4(e);
    if (c === 0)
        return e;
    const d = new Proxy(e,c === 2 ? o : r);
    return i.set(e, d),
    d
}
function Jn(e) {
    return pn(e) ? Jn(e.__v_raw) : !!(e && e.__v_isReactive)
}
function pn(e) {
    return !!(e && e.__v_isReadonly)
}
function ur(e) {
    return !!(e && e.__v_isShallow)
}
function Uf(e) {
    return e ? !!e.__v_raw : !1
}
function je(e) {
    const t = e && e.__v_raw;
    return t ? je(t) : e
}
function u4(e) {
    return !Be(e, "__v_skip") && Object.isExtensible(e) && ng(e, "__v_skip", !0),
    e
}
const It = e => Qe(e) ? Ar(e) : e
  , Xu = e => Qe(e) ? Sg(e) : e;
function ut(e) {
    return e ? e.__v_isRef === !0 : !1
}
function _t(e) {
    return Cg(e, !1)
}
function Bo(e) {
    return Cg(e, !0)
}
function Cg(e, t) {
    return ut(e) ? e : new f4(e,t)
}
class f4 {
    constructor(t, r) {
        this.dep = new Vf,
        this.__v_isRef = !0,
        this.__v_isShallow = !1,
        this._rawValue = r ? t : je(t),
        this._value = r ? t : It(t),
        this.__v_isShallow = r
    }
    get value() {
        return this.dep.track(),
        this._value
    }
    set value(t) {
        const r = this._rawValue
          , o = this.__v_isShallow || ur(t) || pn(t);
        t = o ? t : je(t),
        dn(t, r) && (this._rawValue = t,
        this._value = o ? t : It(t),
        this.dep.trigger())
    }
}
function ze(e) {
    return ut(e) ? e.value : e
}
function $r(e) {
    return Te(e) ? e() : ze(e)
}
const d4 = {
    get: (e, t, r) => t === "__v_raw" ? e : ze(Reflect.get(e, t, r)),
    set: (e, t, r, o) => {
        const i = e[t];
        return ut(i) && !ut(r) ? (i.value = r,
        !0) : Reflect.set(e, t, r, o)
    }
};
function Pg(e) {
    return Jn(e) ? e : new Proxy(e,d4)
}
class p4 {
    constructor(t, r, o) {
        this._object = t,
        this._key = r,
        this._defaultValue = o,
        this.__v_isRef = !0,
        this._value = void 0
    }
    get value() {
        const t = this._object[this._key];
        return this._value = t === void 0 ? this._defaultValue : t
    }
    set value(t) {
        this._object[this._key] = t
    }
    get dep() {
        return W6(je(this._object), this._key)
    }
}
class h4 {
    constructor(t) {
        this._getter = t,
        this.__v_isRef = !0,
        this.__v_isReadonly = !0,
        this._value = void 0
    }
    get value() {
        return this._value = this._getter()
    }
}
function qf(e, t, r) {
    return ut(e) ? e : Te(e) ? new h4(e) : Qe(e) && arguments.length > 1 ? g4(e, t, r) : _t(e)
}
function g4(e, t, r) {
    const o = e[t];
    return ut(o) ? o : new p4(e,t,r)
}
class _4 {
    constructor(t, r, o) {
        this.fn = t,
        this.setter = r,
        this._value = void 0,
        this.dep = new Vf(this),
        this.__v_isRef = !0,
        this.deps = void 0,
        this.depsTail = void 0,
        this.flags = 16,
        this.globalVersion = Di - 1,
        this.next = void 0,
        this.effect = this,
        this.__v_isReadonly = !r,
        this.isSSR = o
    }
    notify() {
        if (this.flags |= 16,
        !(this.flags & 8) && Ye !== this)
            return fg(this, !0),
            !0
    }
    get value() {
        const t = this.dep.track();
        return hg(this),
        t && (t.version = this.dep.version),
        this._value
    }
    set value(t) {
        this.setter && this.setter(t)
    }
}
function m4(e, t, r=!1) {
    let o, i;
    return Te(e) ? o = e : (o = e.get,
    i = e.set),
    new _4(o,i,r)
}
const Ws = {}
  , ha = new WeakMap;
let Wn;
function v4(e, t=!1, r=Wn) {
    if (r) {
        let o = ha.get(r);
        o || ha.set(r, o = []),
        o.push(e)
    }
}
function y4(e, t, r=Ze) {
    const {immediate: o, deep: i, once: s, scheduler: c, augmentJob: d, call: h} = r
      , _ = S => i ? S : ur(S) || i === !1 || i === 0 ? fn(S, 1) : fn(S);
    let g, l, f, p, y = !1, w = !1;
    if (ut(e) ? (l = () => e.value,
    y = ur(e)) : Jn(e) ? (l = () => _(e),
    y = !0) : be(e) ? (w = !0,
    y = e.some(S => Jn(S) || ur(S)),
    l = () => e.map(S => {
        if (ut(S))
            return S.value;
        if (Jn(S))
            return _(S);
        if (Te(S))
            return h ? h(S, 2) : S()
    }
    )) : Te(e) ? t ? l = h ? () => h(e, 2) : e : l = () => {
        if (f) {
            gn();
            try {
                f()
            } finally {
                _n()
            }
        }
        const S = Wn;
        Wn = g;
        try {
            return h ? h(e, 3, [p]) : e(p)
        } finally {
            Wn = S
        }
    }
    : l = Pr,
    t && i) {
        const S = l
          , M = i === !0 ? 1 / 0 : i;
        l = () => fn(S(), M)
    }
    const x = Lf()
      , P = () => {
        g.stop(),
        x && x.active && Hf(x.effects, g)
    }
    ;
    if (s && t) {
        const S = t;
        t = (...M) => {
            S(...M),
            P()
        }
    }
    let E = w ? new Array(e.length).fill(Ws) : Ws;
    const C = S => {
        if (!(!(g.flags & 1) || !g.dirty && !S))
            if (t) {
                const M = g.run();
                if (i || y || (w ? M.some( (F, W) => dn(F, E[W])) : dn(M, E))) {
                    f && f();
                    const F = Wn;
                    Wn = g;
                    try {
                        const W = [M, E === Ws ? void 0 : w && E[0] === Ws ? [] : E, p];
                        h ? h(t, 3, W) : t(...W),
                        E = M
                    } finally {
                        Wn = F
                    }
                }
            } else
                g.run()
    }
    ;
    return d && d(C),
    g = new cg(l),
    g.scheduler = c ? () => c(C, !1) : C,
    p = S => v4(S, !1, g),
    f = g.onStop = () => {
        const S = ha.get(g);
        if (S) {
            if (h)
                h(S, 4);
            else
                for (const M of S)
                    M();
            ha.delete(g)
        }
    }
    ,
    t ? o ? C(!0) : E = g.run() : c ? c(C.bind(null, !0), !0) : g.run(),
    P.pause = g.pause.bind(g),
    P.resume = g.resume.bind(g),
    P.stop = P,
    P
}
function fn(e, t=1 / 0, r) {
    if (t <= 0 || !Qe(e) || e.__v_skip || (r = r || new Set,
    r.has(e)))
        return e;
    if (r.add(e),
    t--,
    ut(e))
        fn(e.value, t, r);
    else if (be(e))
        for (let o = 0; o < e.length; o++)
            fn(e[o], t, r);
    else if (Q0(e) || Io(e))
        e.forEach(o => {
            fn(o, t, r)
        }
        );
    else if (rg(e)) {
        for (const o in e)
            fn(e[o], t, r);
        for (const o of Object.getOwnPropertySymbols(e))
            Object.prototype.propertyIsEnumerable.call(e, o) && fn(e[o], t, r)
    }
    return e
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Wi(e, t, r, o) {
    try {
        return o ? e(...o) : e()
    } catch (i) {
        Ko(i, t, r)
    }
}
function mr(e, t, r, o) {
    if (Te(e)) {
        const i = Wi(e, t, r, o);
        return i && eg(i) && i.catch(s => {
            Ko(s, t, r)
        }
        ),
        i
    }
    if (be(e)) {
        const i = [];
        for (let s = 0; s < e.length; s++)
            i.push(mr(e[s], t, r, o));
        return i
    }
}
function Ko(e, t, r, o=!0) {
    const i = t ? t.vnode : null
      , {errorHandler: s, throwUnhandledErrorInProduction: c} = t && t.appContext.config || Ze;
    if (t) {
        let d = t.parent;
        const h = t.proxy
          , _ = `https://vuejs.org/error-reference/#runtime-${r}`;
        for (; d; ) {
            const g = d.ec;
            if (g) {
                for (let l = 0; l < g.length; l++)
                    if (g[l](e, h, _) === !1)
                        return
            }
            d = d.parent
        }
        if (s) {
            gn(),
            Wi(s, null, 10, [e, h, _]),
            _n();
            return
        }
    }
    b4(e, r, i, o, c)
}
function b4(e, t, r, o=!0, i=!1) {
    if (i)
        throw e
}
const Nt = [];
let Tr = -1;
const Ho = [];
let sn = null
  , Po = 0;
const Ag = Promise.resolve();
let ga = null;
function Na(e) {
    const t = ga || Ag;
    return e ? t.then(this ? e.bind(this) : e) : t
}
function w4(e) {
    let t = Tr + 1
      , r = Nt.length;
    for (; t < r; ) {
        const o = t + r >>> 1
          , i = Nt[o]
          , s = Bi(i);
        s < e || s === e && i.flags & 2 ? t = o + 1 : r = o
    }
    return t
}
function Kf(e) {
    if (!(e.flags & 1)) {
        const t = Bi(e)
          , r = Nt[Nt.length - 1];
        !r || !(e.flags & 2) && t >= Bi(r) ? Nt.push(e) : Nt.splice(w4(t), 0, e),
        e.flags |= 1,
        xg()
    }
}
function xg() {
    ga || (ga = Ag.then(kg))
}
function Ju(e) {
    be(e) ? Ho.push(...e) : sn && e.id === -1 ? sn.splice(Po + 1, 0, e) : e.flags & 1 || (Ho.push(e),
    e.flags |= 1),
    xg()
}
function dh(e, t, r=Tr + 1) {
    for (; r < Nt.length; r++) {
        const o = Nt[r];
        if (o && o.flags & 2) {
            if (e && o.id !== e.uid)
                continue;
            Nt.splice(r, 1),
            r--,
            o.flags & 4 && (o.flags &= -2),
            o(),
            o.flags & 4 || (o.flags &= -2)
        }
    }
}
function _a(e) {
    if (Ho.length) {
        const t = [...new Set(Ho)].sort( (r, o) => Bi(r) - Bi(o));
        if (Ho.length = 0,
        sn) {
            sn.push(...t);
            return
        }
        for (sn = t,
        Po = 0; Po < sn.length; Po++) {
            const r = sn[Po];
            r.flags & 4 && (r.flags &= -2),
            r.flags & 8 || r(),
            r.flags &= -2
        }
        sn = null,
        Po = 0
    }
}
const Bi = e => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function kg(e) {
    try {
        for (Tr = 0; Tr < Nt.length; Tr++) {
            const t = Nt[Tr];
            t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2),
            Wi(t, t.i, t.i ? 15 : 14),
            t.flags & 4 || (t.flags &= -2))
        }
    } finally {
        for (; Tr < Nt.length; Tr++) {
            const t = Nt[Tr];
            t && (t.flags &= -2)
        }
        Tr = -1,
        Nt.length = 0,
        _a(),
        ga = null,
        (Nt.length || Ho.length) && kg()
    }
}
let or = null
  , Eg = null;
function ma(e) {
    const t = or;
    return or = e,
    Eg = e && e.type.__scopeId || null,
    t
}
function nr(e, t=or, r) {
    if (!t || e._n)
        return e;
    const o = (...i) => {
        o._d && Ah(-1);
        const s = ma(t);
        let c;
        try {
            c = e(...i)
        } finally {
            ma(s),
            o._d && Ah(1)
        }
        return c
    }
    ;
    return o._n = !0,
    o._c = !0,
    o._d = !0,
    o
}
function Cr(e, t, r, o) {
    const i = e.dirs
      , s = t && t.dirs;
    for (let c = 0; c < i.length; c++) {
        const d = i[c];
        s && (d.oldValue = s[c].value);
        let h = d.dir[o];
        h && (gn(),
        mr(h, r, 8, [e.el, d, e, t]),
        _n())
    }
}
const T4 = Symbol("_vte")
  , Og = e => e.__isTeleport
  , an = Symbol("_leaveCb")
  , Gs = Symbol("_enterCb");
function S4() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map
    };
    return Xi( () => {
        e.isMounted = !0
    }
    ),
    Ji( () => {
        e.isUnmounting = !0
    }
    ),
    e
}
const lr = [Function, Array]
  , Rg = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: lr,
    onEnter: lr,
    onAfterEnter: lr,
    onEnterCancelled: lr,
    onBeforeLeave: lr,
    onLeave: lr,
    onAfterLeave: lr,
    onLeaveCancelled: lr,
    onBeforeAppear: lr,
    onAppear: lr,
    onAfterAppear: lr,
    onAppearCancelled: lr
}
  , Mg = e => {
    const t = e.subTree;
    return t.component ? Mg(t.component) : t
}
  , C4 = {
    name: "BaseTransition",
    props: Rg,
    setup(e, {slots: t}) {
        const r = Zi()
          , o = S4();
        return () => {
            const i = t.default && Hg(t.default(), !0);
            if (!i || !i.length)
                return;
            const s = Ig(i)
              , c = je(e)
              , {mode: d} = c;
            if (o.isLeaving)
                return bu(s);
            const h = ph(s);
            if (!h)
                return bu(s);
            let _ = Yu(h, c, o, r, l => _ = l);
            h.type !== wt && No(h, _);
            let g = r.subTree && ph(r.subTree);
            if (g && g.type !== wt && !hr(h, g) && Mg(r).type !== wt) {
                let l = Yu(g, c, o, r);
                if (No(g, l),
                d === "out-in" && h.type !== wt)
                    return o.isLeaving = !0,
                    l.afterLeave = () => {
                        o.isLeaving = !1,
                        r.job.flags & 8 || r.update(),
                        delete l.afterLeave,
                        g = void 0
                    }
                    ,
                    bu(s);
                d === "in-out" && h.type !== wt ? l.delayLeave = (f, p, y) => {
                    const w = jg(o, g);
                    w[String(g.key)] = g,
                    f[an] = () => {
                        p(),
                        f[an] = void 0,
                        delete _.delayedLeave,
                        g = void 0
                    }
                    ,
                    _.delayedLeave = () => {
                        y(),
                        delete _.delayedLeave,
                        g = void 0
                    }
                }
                : g = void 0
            } else
                g && (g = void 0);
            return s
        }
    }
};
function Ig(e) {
    let t = e[0];
    if (e.length > 1) {
        for (const r of e)
            if (r.type !== wt) {
                t = r;
                break
            }
    }
    return t
}
const P4 = C4;
function jg(e, t) {
    const {leavingVNodes: r} = e;
    let o = r.get(t.type);
    return o || (o = Object.create(null),
    r.set(t.type, o)),
    o
}
function Yu(e, t, r, o, i) {
    const {appear: s, mode: c, persisted: d=!1, onBeforeEnter: h, onEnter: _, onAfterEnter: g, onEnterCancelled: l, onBeforeLeave: f, onLeave: p, onAfterLeave: y, onLeaveCancelled: w, onBeforeAppear: x, onAppear: P, onAfterAppear: E, onAppearCancelled: C} = t
      , S = String(e.key)
      , M = jg(r, e)
      , F = ($, G) => {
        $ && mr($, o, 9, G)
    }
      , W = ($, G) => {
        const ae = G[1];
        F($, G),
        be($) ? $.every(U => U.length <= 1) && ae() : $.length <= 1 && ae()
    }
      , Q = {
        mode: c,
        persisted: d,
        beforeEnter($) {
            let G = h;
            if (!r.isMounted)
                if (s)
                    G = x || h;
                else
                    return;
            $[an] && $[an](!0);
            const ae = M[S];
            ae && hr(e, ae) && ae.el[an] && ae.el[an](),
            F(G, [$])
        },
        enter($) {
            let G = _
              , ae = g
              , U = l;
            if (!r.isMounted)
                if (s)
                    G = P || _,
                    ae = E || g,
                    U = C || l;
                else
                    return;
            let ce = !1;
            const ve = $[Gs] = Pe => {
                ce || (ce = !0,
                Pe ? F(U, [$]) : F(ae, [$]),
                Q.delayedLeave && Q.delayedLeave(),
                $[Gs] = void 0)
            }
            ;
            G ? W(G, [$, ve]) : ve()
        },
        leave($, G) {
            const ae = String(e.key);
            if ($[Gs] && $[Gs](!0),
            r.isUnmounting)
                return G();
            F(f, [$]);
            let U = !1;
            const ce = $[an] = ve => {
                U || (U = !0,
                G(),
                ve ? F(w, [$]) : F(y, [$]),
                $[an] = void 0,
                M[ae] === e && delete M[ae])
            }
            ;
            M[ae] = e,
            p ? W(p, [$, ce]) : ce()
        },
        clone($) {
            const G = Yu($, t, r, o, i);
            return i && i(G),
            G
        }
    };
    return Q
}
function bu(e) {
    if (Gi(e))
        return e = Wr(e),
        e.children = null,
        e
}
function ph(e) {
    if (!Gi(e))
        return Og(e.type) && e.children ? Ig(e.children) : e;
    const {shapeFlag: t, children: r} = e;
    if (r) {
        if (t & 16)
            return r[0];
        if (t & 32 && Te(r.default))
            return r.default()
    }
}
function No(e, t) {
    e.shapeFlag & 6 && e.component ? (e.transition = t,
    No(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent),
    e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}
function Hg(e, t=!1, r) {
    let o = []
      , i = 0;
    for (let s = 0; s < e.length; s++) {
        let c = e[s];
        const d = r == null ? c.key : String(r) + String(c.key != null ? c.key : s);
        c.type === lt ? (c.patchFlag & 128 && i++,
        o = o.concat(Hg(c.children, t, d))) : (t || c.type !== wt) && o.push(d != null ? Wr(c, {
            key: d
        }) : c)
    }
    if (i > 1)
        for (let s = 0; s < o.length; s++)
            o[s].patchFlag = -2;
    return o
}
/*! #__NO_SIDE_EFFECTS__ */
function no(e, t) {
    return Te(e) ? Tt({
        name: e.name
    }, t, {
        setup: e
    }) : e
}
function Wf(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0]
}
function Ni(e, t, r, o, i=!1) {
    if (be(e)) {
        e.forEach( (y, w) => Ni(y, t && (be(t) ? t[w] : t), r, o, i));
        return
    }
    if (Yn(o) && !i) {
        o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && Ni(e, t, r, o.component.subTree);
        return
    }
    const s = o.shapeFlag & 4 ? Zf(o.component) : o.el
      , c = i ? null : s
      , {i: d, r: h} = e
      , _ = t && t.r
      , g = d.refs === Ze ? d.refs = {} : d.refs
      , l = d.setupState
      , f = je(l)
      , p = l === Ze ? () => !1 : y => Be(f, y);
    if (_ != null && _ !== h && (ot(_) ? (g[_] = null,
    p(_) && (l[_] = null)) : ut(_) && (_.value = null)),
    Te(h))
        Wi(h, d, 12, [c, g]);
    else {
        const y = ot(h)
          , w = ut(h);
        if (y || w) {
            const x = () => {
                if (e.f) {
                    const P = y ? p(h) ? l[h] : g[h] : h.value;
                    i ? be(P) && Hf(P, s) : be(P) ? P.includes(s) || P.push(s) : y ? (g[h] = [s],
                    p(h) && (l[h] = g[h])) : (h.value = [s],
                    e.k && (g[e.k] = h.value))
                } else
                    y ? (g[h] = c,
                    p(h) && (l[h] = c)) : w && (h.value = c,
                    e.k && (g[e.k] = c))
            }
            ;
            c ? (x.id = -1,
            xt(x, r)) : x()
        }
    }
}
let hh = !1;
const So = () => {
    hh || (hh = !0)
}
  , A4 = e => e.namespaceURI.includes("svg") && e.tagName !== "foreignObject"
  , x4 = e => e.namespaceURI.includes("MathML")
  , Xs = e => {
    if (e.nodeType === 1) {
        if (A4(e))
            return "svg";
        if (x4(e))
            return "mathml"
    }
}
  , Eo = e => e.nodeType === 8;
function k4(e) {
    const {mt: t, p: r, o: {patchProp: o, createText: i, nextSibling: s, parentNode: c, remove: d, insert: h, createComment: _}} = e
      , g = (C, S) => {
        if (!S.hasChildNodes()) {
            r(null, C, S),
            _a(),
            S._vnode = C;
            return
        }
        l(S.firstChild, C, null, null, null),
        _a(),
        S._vnode = C
    }
      , l = (C, S, M, F, W, Q=!1) => {
        Q = Q || !!S.dynamicChildren;
        const $ = Eo(C) && C.data === "["
          , G = () => w(C, S, M, F, W, $)
          , {type: ae, ref: U, shapeFlag: ce, patchFlag: ve} = S;
        let Pe = C.nodeType;
        S.el = C,
        ve === -2 && (Q = !1,
        S.dynamicChildren = null);
        let Y = null;
        switch (ae) {
        case eo:
            Pe !== 3 ? S.children === "" ? (h(S.el = i(""), c(C), C),
            Y = C) : Y = G() : (C.data !== S.children && (So(),
            C.data = S.children),
            Y = s(C));
            break;
        case wt:
            E(C) ? (Y = s(C),
            P(S.el = C.content.firstChild, C, M)) : Pe !== 8 || $ ? Y = G() : Y = s(C);
            break;
        case Ri:
            if ($ && (C = s(C),
            Pe = C.nodeType),
            Pe === 1 || Pe === 3) {
                Y = C;
                const he = !S.children.length;
                for (let le = 0; le < S.staticCount; le++)
                    he && (S.children += Y.nodeType === 1 ? Y.outerHTML : Y.data),
                    le === S.staticCount - 1 && (S.anchor = Y),
                    Y = s(Y);
                return $ ? s(Y) : Y
            } else
                G();
            break;
        case lt:
            $ ? Y = y(C, S, M, F, W, Q) : Y = G();
            break;
        default:
            if (ce & 1)
                (Pe !== 1 || S.type.toLowerCase() !== C.tagName.toLowerCase()) && !E(C) ? Y = G() : Y = f(C, S, M, F, W, Q);
            else if (ce & 6) {
                S.slotScopeIds = W;
                const he = c(C);
                if ($ ? Y = x(C) : Eo(C) && C.data === "teleport start" ? Y = x(C, C.data, "teleport end") : Y = s(C),
                t(S, he, null, M, F, Xs(he), Q),
                Yn(S) && !S.type.__asyncResolved) {
                    let le;
                    $ ? (le = we(lt),
                    le.anchor = Y ? Y.previousSibling : he.lastChild) : le = C.nodeType === 3 ? ht("") : we("div"),
                    le.el = C,
                    S.component.subTree = le
                }
            } else
                ce & 64 ? Pe !== 8 ? Y = G() : Y = S.type.hydrate(C, S, M, F, W, Q, e, p) : ce & 128 && (Y = S.type.hydrate(C, S, M, F, Xs(c(C)), W, Q, e, l))
        }
        return U != null && Ni(U, null, F, S),
        Y
    }
      , f = (C, S, M, F, W, Q) => {
        Q = Q || !!S.dynamicChildren;
        const {type: $, props: G, patchFlag: ae, shapeFlag: U, dirs: ce, transition: ve} = S
          , Pe = $ === "input" || $ === "option";
        if (Pe || ae !== -1) {
            ce && Cr(S, null, M, "created");
            let Y = !1;
            if (E(C)) {
                Y = i_(null, ve) && M && M.vnode.props && M.vnode.props.appear;
                const le = C.content.firstChild;
                Y && ve.beforeEnter(le),
                P(le, C, M),
                S.el = C = le
            }
            if (U & 16 && !(G && (G.innerHTML || G.textContent))) {
                let le = p(C.firstChild, S, C, M, F, W, Q);
                for (; le; ) {
                    Js(C, 1) || So();
                    const Fe = le;
                    le = le.nextSibling,
                    d(Fe)
                }
            } else if (U & 8) {
                let le = S.children;
                le[0] === `
` && (C.tagName === "PRE" || C.tagName === "TEXTAREA") && (le = le.slice(1)),
                C.textContent !== le && (Js(C, 0) || So(),
                C.textContent = S.children)
            }
            if (G) {
                if (Pe || !Q || ae & 48) {
                    const le = C.tagName.includes("-");
                    for (const Fe in G)
                        (Pe && (Fe.endsWith("value") || Fe === "indeterminate") || qi(Fe) && !jo(Fe) || Fe[0] === "." || le) && o(C, Fe, null, G[Fe], void 0, M)
                } else if (G.onClick)
                    o(C, "onClick", null, G.onClick, void 0, M);
                else if (ae & 4 && Jn(G.style))
                    for (const le in G.style)
                        G.style[le]
            }
            let he;
            (he = G && G.onVnodeBeforeMount) && Kt(he, M, S),
            ce && Cr(S, null, M, "beforeMount"),
            ((he = G && G.onVnodeMounted) || ce || Y) && p_( () => {
                he && Kt(he, M, S),
                Y && ve.enter(C),
                ce && Cr(S, null, M, "mounted")
            }
            , F)
        }
        return C.nextSibling
    }
      , p = (C, S, M, F, W, Q, $) => {
        $ = $ || !!S.dynamicChildren;
        const G = S.children
          , ae = G.length;
        for (let U = 0; U < ae; U++) {
            const ce = $ ? G[U] : G[U] = rr(G[U])
              , ve = ce.type === eo;
            C ? (ve && !$ && U + 1 < ae && rr(G[U + 1]).type === eo && (h(i(C.data.slice(ce.children.length)), M, s(C)),
            C.data = ce.children),
            C = l(C, ce, F, W, Q, $)) : ve && !ce.children ? h(ce.el = i(""), M) : (Js(M, 1) || So(),
            r(null, ce, M, null, F, W, Xs(M), Q))
        }
        return C
    }
      , y = (C, S, M, F, W, Q) => {
        const {slotScopeIds: $} = S;
        $ && (W = W ? W.concat($) : $);
        const G = c(C)
          , ae = p(s(C), S, G, M, F, W, Q);
        return ae && Eo(ae) && ae.data === "]" ? s(S.anchor = ae) : (So(),
        h(S.anchor = _("]"), G, ae),
        ae)
    }
      , w = (C, S, M, F, W, Q) => {
        if (Js(C.parentElement, 1) || So(),
        S.el = null,
        Q) {
            const ae = x(C);
            for (; ; ) {
                const U = s(C);
                if (U && U !== ae)
                    d(U);
                else
                    break
            }
        }
        const $ = s(C)
          , G = c(C);
        return d(C),
        r(null, S, G, $, M, F, Xs(G), W),
        M && (M.vnode.el = S.el,
        za(M, S.el)),
        $
    }
      , x = (C, S="[", M="]") => {
        let F = 0;
        for (; C; )
            if (C = s(C),
            C && Eo(C) && (C.data === S && F++,
            C.data === M)) {
                if (F === 0)
                    return s(C);
                F--
            }
        return C
    }
      , P = (C, S, M) => {
        const F = S.parentNode;
        F && F.replaceChild(C, S);
        let W = M;
        for (; W; )
            W.vnode.el === S && (W.vnode.el = W.subTree.el = C),
            W = W.parent
    }
      , E = C => C.nodeType === 1 && C.tagName === "TEMPLATE";
    return [g, l]
}
const gh = "data-allow-mismatch"
  , E4 = {
    0: "text",
    1: "children",
    2: "class",
    3: "style",
    4: "attribute"
};
function Js(e, t) {
    if (t === 0 || t === 1)
        for (; e && !e.hasAttribute(gh); )
            e = e.parentElement;
    const r = e && e.getAttribute(gh);
    if (r == null)
        return !1;
    if (r === "")
        return !0;
    {
        const o = r.split(",");
        return t === 0 && o.includes("children") ? !0 : r.split(",").includes(E4[t])
    }
}
La().requestIdleCallback;
La().cancelIdleCallback;
function O4(e, t) {
    if (Eo(e) && e.data === "[") {
        let r = 1
          , o = e.nextSibling;
        for (; o; ) {
            if (o.nodeType === 1) {
                if (t(o) === !1)
                    break
            } else if (Eo(o))
                if (o.data === "]") {
                    if (--r === 0)
                        break
                } else
                    o.data === "[" && r++;
            o = o.nextSibling
        }
    } else
        t(e)
}
const Yn = e => !!e.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */
function _h(e) {
    Te(e) && (e = {
        loader: e
    });
    const {loader: t, loadingComponent: r, errorComponent: o, delay: i=200, hydrate: s, timeout: c, suspensible: d=!0, onError: h} = e;
    let _ = null, g, l = 0;
    const f = () => (l++,
    _ = null,
    p())
      , p = () => {
        let y;
        return _ || (y = _ = t().catch(w => {
            if (w = w instanceof Error ? w : new Error(String(w)),
            h)
                return new Promise( (x, P) => {
                    h(w, () => x(f()), () => P(w), l + 1)
                }
                );
            throw w
        }
        ).then(w => y !== _ && _ ? _ : (w && (w.__esModule || w[Symbol.toStringTag] === "Module") && (w = w.default),
        g = w,
        w)))
    }
    ;
    return no({
        name: "AsyncComponentWrapper",
        __asyncLoader: p,
        __asyncHydrate(y, w, x) {
            const P = s ? () => {
                const E = s(x, C => O4(y, C));
                E && (w.bum || (w.bum = [])).push(E)
            }
            : x;
            g ? P() : p().then( () => !w.isUnmounted && P())
        },
        get __asyncResolved() {
            return g
        },
        setup() {
            const y = gt;
            if (Wf(y),
            g)
                return () => wu(g, y);
            const w = C => {
                _ = null,
                Ko(C, y, 13, !o)
            }
            ;
            if (d && y.suspense || $o)
                return p().then(C => () => wu(C, y)).catch(C => (w(C),
                () => o ? we(o, {
                    error: C
                }) : null));
            const x = _t(!1)
              , P = _t()
              , E = _t(!!i);
            return i && setTimeout( () => {
                E.value = !1
            }
            , i),
            c != null && setTimeout( () => {
                if (!x.value && !P.value) {
                    const C = new Error(`Async component timed out after ${c}ms.`);
                    w(C),
                    P.value = C
                }
            }
            , c),
            p().then( () => {
                x.value = !0,
                y.parent && Gi(y.parent.vnode) && y.parent.update()
            }
            ).catch(C => {
                w(C),
                P.value = C
            }
            ),
            () => {
                if (x.value && g)
                    return wu(g, y);
                if (P.value && o)
                    return we(o, {
                        error: P.value
                    });
                if (r && !E.value)
                    return we(r)
            }
        }
    })
}
function wu(e, t) {
    const {ref: r, props: o, children: i, ce: s} = t.vnode
      , c = we(e, o, i);
    return c.ref = r,
    c.ce = s,
    delete t.vnode.ce,
    c
}
const Gi = e => e.type.__isKeepAlive
  , R4 = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
        include: [String, RegExp, Array],
        exclude: [String, RegExp, Array],
        max: [String, Number]
    },
    setup(e, {slots: t}) {
        const r = Zi()
          , o = r.ctx;
        if (!o.renderer)
            return () => {
                const E = t.default && t.default();
                return E && E.length === 1 ? E[0] : E
            }
            ;
        const i = new Map
          , s = new Set;
        let c = null;
        const d = r.suspense
          , {renderer: {p: h, m: _, um: g, o: {createElement: l}}} = o
          , f = l("div");
        o.activate = (E, C, S, M, F) => {
            const W = E.component;
            _(E, C, S, 0, d),
            h(W.vnode, E, C, S, W, d, M, E.slotScopeIds, F),
            xt( () => {
                W.isDeactivated = !1,
                W.a && xi(W.a);
                const Q = E.props && E.props.onVnodeMounted;
                Q && Kt(Q, W.parent, E)
            }
            , d)
        }
        ,
        o.deactivate = E => {
            const C = E.component;
            ba(C.m),
            ba(C.a),
            _(E, f, null, 1, d),
            xt( () => {
                C.da && xi(C.da);
                const S = E.props && E.props.onVnodeUnmounted;
                S && Kt(S, C.parent, E),
                C.isDeactivated = !0
            }
            , d)
        }
        ;
        function p(E) {
            Tu(E),
            g(E, r, d, !0)
        }
        function y(E) {
            i.forEach( (C, S) => {
                const M = sf(C.type);
                M && !E(M) && w(S)
            }
            )
        }
        function w(E) {
            const C = i.get(E);
            C && (!c || !hr(C, c)) ? p(C) : c && Tu(c),
            i.delete(E),
            s.delete(E)
        }
        Kr( () => [e.include, e.exclude], ([E,C]) => {
            E && y(S => Ti(E, S)),
            C && y(S => !Ti(C, S))
        }
        , {
            flush: "post",
            deep: !0
        });
        let x = null;
        const P = () => {
            x != null && (wa(r.subTree.type) ? xt( () => {
                i.set(x, Ys(r.subTree))
            }
            , r.subTree.suspense) : i.set(x, Ys(r.subTree)))
        }
        ;
        return Xi(P),
        Vg(P),
        Ji( () => {
            i.forEach(E => {
                const {subTree: C, suspense: S} = r
                  , M = Ys(C);
                if (E.type === M.type && E.key === M.key) {
                    Tu(M);
                    const F = M.component.da;
                    F && xt(F, S);
                    return
                }
                p(E)
            }
            )
        }
        ),
        () => {
            if (x = null,
            !t.default)
                return c = null;
            const E = t.default()
              , C = E[0];
            if (E.length > 1)
                return c = null,
                E;
            if (!Vo(C) || !(C.shapeFlag & 4) && !(C.shapeFlag & 128))
                return c = null,
                C;
            let S = Ys(C);
            if (S.type === wt)
                return c = null,
                S;
            const M = S.type
              , F = sf(Yn(S) ? S.type.__asyncResolved || {} : M)
              , {include: W, exclude: Q, max: $} = e;
            if (W && (!F || !Ti(W, F)) || Q && F && Ti(Q, F))
                return S.shapeFlag &= -257,
                c = S,
                C;
            const G = S.key == null ? M : S.key
              , ae = i.get(G);
            return S.el && (S = Wr(S),
            C.shapeFlag & 128 && (C.ssContent = S)),
            x = G,
            ae ? (S.el = ae.el,
            S.component = ae.component,
            S.transition && No(S, S.transition),
            S.shapeFlag |= 512,
            s.delete(G),
            s.add(G)) : (s.add(G),
            $ && s.size > parseInt($, 10) && w(s.values().next().value)),
            S.shapeFlag |= 256,
            c = S,
            wa(C.type) ? C : S
        }
    }
}
  , Dg = R4;
function Ti(e, t) {
    return be(e) ? e.some(r => Ti(r, t)) : ot(e) ? e.split(",").includes(t) : M6(e) ? (e.lastIndex = 0,
    e.test(t)) : !1
}
function Lg(e, t) {
    Ng(e, "a", t)
}
function Bg(e, t) {
    Ng(e, "da", t)
}
function Ng(e, t, r=gt) {
    const o = e.__wdc || (e.__wdc = () => {
        let i = r;
        for (; i; ) {
            if (i.isDeactivated)
                return;
            i = i.parent
        }
        return e()
    }
    );
    if (Fa(t, o, r),
    r) {
        let i = r.parent;
        for (; i && i.parent; )
            Gi(i.parent.vnode) && M4(o, t, r, i),
            i = i.parent
    }
}
function M4(e, t, r, o) {
    const i = Fa(t, e, o, !0);
    Gf( () => {
        Hf(o[t], i)
    }
    , r)
}
function Tu(e) {
    e.shapeFlag &= -257,
    e.shapeFlag &= -513
}
function Ys(e) {
    return e.shapeFlag & 128 ? e.ssContent : e
}
function Fa(e, t, r=gt, o=!1) {
    if (r) {
        const i = r[e] || (r[e] = [])
          , s = t.__weh || (t.__weh = (...c) => {
            gn();
            const d = Qi(r)
              , h = mr(t, r, e, c);
            return d(),
            _n(),
            h
        }
        );
        return o ? i.unshift(s) : i.push(s),
        s
    }
}
const Gr = e => (t, r=gt) => {
    (!$o || e === "sp") && Fa(e, (...o) => t(...o), r)
}
  , Fg = Gr("bm")
  , Xi = Gr("m")
  , I4 = Gr("bu")
  , Vg = Gr("u")
  , Ji = Gr("bum")
  , Gf = Gr("um")
  , j4 = Gr("sp")
  , H4 = Gr("rtg")
  , D4 = Gr("rtc");
function $g(e, t=gt) {
    Fa("ec", e, t)
}
const zg = "components";
function mh(e, t) {
    return qg(zg, e, !0, t) || e
}
const Ug = Symbol.for("v-ndc");
function L4(e) {
    return ot(e) ? qg(zg, e, !1) || e : e || Ug
}
function qg(e, t, r=!0, o=!1) {
    const i = or || gt;
    if (i) {
        const s = i.type;
        {
            const d = sf(s, !1);
            if (d && (d === t || d === fr(t) || d === Da(fr(t))))
                return s
        }
        const c = vh(i[e] || s[e], t) || vh(i.appContext[e], t);
        return !c && o ? s : c
    }
}
function vh(e, t) {
    return e && (e[t] || e[fr(t)] || e[Da(fr(t))])
}
function va(e, t, r, o) {
    let i;
    const s = r
      , c = be(e);
    if (c || ot(e)) {
        const d = c && Jn(e);
        let h = !1;
        d && (h = !ur(e),
        e = Ba(e)),
        i = new Array(e.length);
        for (let _ = 0, g = e.length; _ < g; _++)
            i[_] = t(h ? It(e[_]) : e[_], _, void 0, s)
    } else if (typeof e == "number") {
        i = new Array(e);
        for (let d = 0; d < e; d++)
            i[d] = t(d + 1, d, void 0, s)
    } else if (Qe(e))
        if (e[Symbol.iterator])
            i = Array.from(e, (d, h) => t(d, h, void 0, s));
        else {
            const d = Object.keys(e);
            i = new Array(d.length);
            for (let h = 0, _ = d.length; h < _; h++) {
                const g = d[h];
                i[h] = t(e[g], g, h, s)
            }
        }
    else
        i = [];
    return i
}
const Zu = e => e ? v_(e) ? Zf(e) : Zu(e.parent) : null
  , Oi = Tt(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => Zu(e.parent),
    $root: e => Zu(e.root),
    $host: e => e.ce,
    $emit: e => e.emit,
    $options: e => Wg(e),
    $forceUpdate: e => e.f || (e.f = () => {
        Kf(e.update)
    }
    ),
    $nextTick: e => e.n || (e.n = Na.bind(e.proxy)),
    $watch: e => n3.bind(e)
})
  , Su = (e, t) => e !== Ze && !e.__isScriptSetup && Be(e, t)
  , B4 = {
    get({_: e}, t) {
        if (t === "__v_skip")
            return !0;
        const {ctx: r, setupState: o, data: i, props: s, accessCache: c, type: d, appContext: h} = e;
        let _;
        if (t[0] !== "$") {
            const p = c[t];
            if (p !== void 0)
                switch (p) {
                case 1:
                    return o[t];
                case 2:
                    return i[t];
                case 4:
                    return r[t];
                case 3:
                    return s[t]
                }
            else {
                if (Su(o, t))
                    return c[t] = 1,
                    o[t];
                if (i !== Ze && Be(i, t))
                    return c[t] = 2,
                    i[t];
                if ((_ = e.propsOptions[0]) && Be(_, t))
                    return c[t] = 3,
                    s[t];
                if (r !== Ze && Be(r, t))
                    return c[t] = 4,
                    r[t];
                Qu && (c[t] = 0)
            }
        }
        const g = Oi[t];
        let l, f;
        if (g)
            return t === "$attrs" && Mt(e.attrs, "get", ""),
            g(e);
        if ((l = d.__cssModules) && (l = l[t]))
            return l;
        if (r !== Ze && Be(r, t))
            return c[t] = 4,
            r[t];
        if (f = h.config.globalProperties,
        Be(f, t))
            return f[t]
    },
    set({_: e}, t, r) {
        const {data: o, setupState: i, ctx: s} = e;
        return Su(i, t) ? (i[t] = r,
        !0) : o !== Ze && Be(o, t) ? (o[t] = r,
        !0) : Be(e.props, t) || t[0] === "$" && t.slice(1)in e ? !1 : (s[t] = r,
        !0)
    },
    has({_: {data: e, setupState: t, accessCache: r, ctx: o, appContext: i, propsOptions: s}}, c) {
        let d;
        return !!r[c] || e !== Ze && Be(e, c) || Su(t, c) || (d = s[0]) && Be(d, c) || Be(o, c) || Be(Oi, c) || Be(i.config.globalProperties, c)
    },
    defineProperty(e, t, r) {
        return r.get != null ? e._.accessCache[t] = 0 : Be(r, "value") && this.set(e, t, r.value, null),
        Reflect.defineProperty(e, t, r)
    }
};
function yh(e) {
    return be(e) ? e.reduce( (t, r) => (t[r] = null,
    t), {}) : e
}
let Qu = !0;
function N4(e) {
    const t = Wg(e)
      , r = e.proxy
      , o = e.ctx;
    Qu = !1,
    t.beforeCreate && bh(t.beforeCreate, e, "bc");
    const {data: i, computed: s, methods: c, watch: d, provide: h, inject: _, created: g, beforeMount: l, mounted: f, beforeUpdate: p, updated: y, activated: w, deactivated: x, beforeDestroy: P, beforeUnmount: E, destroyed: C, unmounted: S, render: M, renderTracked: F, renderTriggered: W, errorCaptured: Q, serverPrefetch: $, expose: G, inheritAttrs: ae, components: U, directives: ce, filters: ve} = t;
    if (_ && F4(_, o, null),
    c)
        for (const he in c) {
            const le = c[he];
            Te(le) && (o[he] = le.bind(r))
        }
    if (i) {
        const he = i.call(r, r);
        Qe(he) && (e.data = Ar(he))
    }
    if (Qu = !0,
    s)
        for (const he in s) {
            const le = s[he]
              , Fe = Te(le) ? le.bind(r, r) : Te(le.get) ? le.get.bind(r, r) : Pr
              , it = !Te(le) && Te(le.set) ? le.set.bind(r) : Pr
              , St = nt({
                get: Fe,
                set: it
            });
            Object.defineProperty(o, he, {
                enumerable: !0,
                configurable: !0,
                get: () => St.value,
                set: at => St.value = at
            })
        }
    if (d)
        for (const he in d)
            Kg(d[he], o, r, he);
    if (h) {
        const he = Te(h) ? h.call(r) : h;
        Reflect.ownKeys(he).forEach(le => {
            Qn(le, he[le])
        }
        )
    }
    g && bh(g, e, "c");
    function Y(he, le) {
        be(le) ? le.forEach(Fe => he(Fe.bind(r))) : le && he(le.bind(r))
    }
    if (Y(Fg, l),
    Y(Xi, f),
    Y(I4, p),
    Y(Vg, y),
    Y(Lg, w),
    Y(Bg, x),
    Y($g, Q),
    Y(D4, F),
    Y(H4, W),
    Y(Ji, E),
    Y(Gf, S),
    Y(j4, $),
    be(G))
        if (G.length) {
            const he = e.exposed || (e.exposed = {});
            G.forEach(le => {
                Object.defineProperty(he, le, {
                    get: () => r[le],
                    set: Fe => r[le] = Fe
                })
            }
            )
        } else
            e.exposed || (e.exposed = {});
    M && e.render === Pr && (e.render = M),
    ae != null && (e.inheritAttrs = ae),
    U && (e.components = U),
    ce && (e.directives = ce),
    $ && Wf(e)
}
function F4(e, t, r=Pr) {
    be(e) && (e = ef(e));
    for (const o in e) {
        const i = e[o];
        let s;
        Qe(i) ? "default"in i ? s = Xt(i.from || o, i.default, !0) : s = Xt(i.from || o) : s = Xt(i),
        ut(s) ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => s.value,
            set: c => s.value = c
        }) : t[o] = s
    }
}
function bh(e, t, r) {
    mr(be(e) ? e.map(o => o.bind(t.proxy)) : e.bind(t.proxy), t, r)
}
function Kg(e, t, r, o) {
    let i = o.includes(".") ? c_(r, o) : () => r[o];
    if (ot(e)) {
        const s = t[e];
        Te(s) && Kr(i, s)
    } else if (Te(e))
        Kr(i, e.bind(r));
    else if (Qe(e))
        if (be(e))
            e.forEach(s => Kg(s, t, r, o));
        else {
            const s = Te(e.handler) ? e.handler.bind(r) : t[e.handler];
            Te(s) && Kr(i, s, e)
        }
}
function Wg(e) {
    const t = e.type
      , {mixins: r, extends: o} = t
      , {mixins: i, optionsCache: s, config: {optionMergeStrategies: c}} = e.appContext
      , d = s.get(t);
    let h;
    return d ? h = d : !i.length && !r && !o ? h = t : (h = {},
    i.length && i.forEach(_ => ya(h, _, c, !0)),
    ya(h, t, c)),
    Qe(t) && s.set(t, h),
    h
}
function ya(e, t, r, o=!1) {
    const {mixins: i, extends: s} = t;
    s && ya(e, s, r, !0),
    i && i.forEach(c => ya(e, c, r, !0));
    for (const c in t)
        if (!(o && c === "expose")) {
            const d = V4[c] || r && r[c];
            e[c] = d ? d(e[c], t[c]) : t[c]
        }
    return e
}
const V4 = {
    data: wh,
    props: Th,
    emits: Th,
    methods: Si,
    computed: Si,
    beforeCreate: Lt,
    created: Lt,
    beforeMount: Lt,
    mounted: Lt,
    beforeUpdate: Lt,
    updated: Lt,
    beforeDestroy: Lt,
    beforeUnmount: Lt,
    destroyed: Lt,
    unmounted: Lt,
    activated: Lt,
    deactivated: Lt,
    errorCaptured: Lt,
    serverPrefetch: Lt,
    components: Si,
    directives: Si,
    watch: z4,
    provide: wh,
    inject: $4
};
function wh(e, t) {
    return t ? e ? function() {
        return Tt(Te(e) ? e.call(this, this) : e, Te(t) ? t.call(this, this) : t)
    }
    : t : e
}
function $4(e, t) {
    return Si(ef(e), ef(t))
}
function ef(e) {
    if (be(e)) {
        const t = {};
        for (let r = 0; r < e.length; r++)
            t[e[r]] = e[r];
        return t
    }
    return e
}
function Lt(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function Si(e, t) {
    return e ? Tt(Object.create(null), e, t) : t
}
function Th(e, t) {
    return e ? be(e) && be(t) ? [...new Set([...e, ...t])] : Tt(Object.create(null), yh(e), yh(t ?? {})) : t
}
function z4(e, t) {
    if (!e)
        return t;
    if (!t)
        return e;
    const r = Tt(Object.create(null), e);
    for (const o in t)
        r[o] = Lt(e[o], t[o]);
    return r
}
function Gg() {
    return {
        app: null,
        config: {
            isNativeTag: O6,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let U4 = 0;
function q4(e, t) {
    return function(o, i=null) {
        Te(o) || (o = Tt({}, o)),
        i != null && !Qe(i) && (i = null);
        const s = Gg()
          , c = new WeakSet
          , d = [];
        let h = !1;
        const _ = s.app = {
            _uid: U4++,
            _component: o,
            _props: i,
            _container: null,
            _context: s,
            _instance: null,
            version: A3,
            get config() {
                return s.config
            },
            set config(g) {},
            use(g, ...l) {
                return c.has(g) || (g && Te(g.install) ? (c.add(g),
                g.install(_, ...l)) : Te(g) && (c.add(g),
                g(_, ...l))),
                _
            },
            mixin(g) {
                return s.mixins.includes(g) || s.mixins.push(g),
                _
            },
            component(g, l) {
                return l ? (s.components[g] = l,
                _) : s.components[g]
            },
            directive(g, l) {
                return l ? (s.directives[g] = l,
                _) : s.directives[g]
            },
            mount(g, l, f) {
                if (!h) {
                    const p = _._ceVNode || we(o, i);
                    return p.appContext = s,
                    f === !0 ? f = "svg" : f === !1 && (f = void 0),
                    l && t ? t(p, g) : e(p, g, f),
                    h = !0,
                    _._container = g,
                    g.__vue_app__ = _,
                    Zf(p.component)
                }
            },
            onUnmount(g) {
                d.push(g)
            },
            unmount() {
                h && (mr(d, _._instance, 16),
                e(null, _._container),
                delete _._container.__vue_app__)
            },
            provide(g, l) {
                return s.provides[g] = l,
                _
            },
            runWithContext(g) {
                const l = Zn;
                Zn = _;
                try {
                    return g()
                } finally {
                    Zn = l
                }
            }
        };
        return _
    }
}
let Zn = null;
function Qn(e, t) {
    if (gt) {
        let r = gt.provides;
        const o = gt.parent && gt.parent.provides;
        o === r && (r = gt.provides = Object.create(o)),
        r[e] = t
    }
}
function Xt(e, t, r=!1) {
    const o = gt || or;
    if (o || Zn) {
        const i = Zn ? Zn._context.provides : o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
        if (i && e in i)
            return i[e];
        if (arguments.length > 1)
            return r && Te(t) ? t.call(o && o.proxy) : t
    }
}
function Va() {
    return !!(gt || or || Zn)
}
const Xg = {}
  , Jg = () => Object.create(Xg)
  , Yg = e => Object.getPrototypeOf(e) === Xg;
function K4(e, t, r, o=!1) {
    const i = {}
      , s = Jg();
    e.propsDefaults = Object.create(null),
    Zg(e, t, i, s);
    for (const c in e.propsOptions[0])
        c in i || (i[c] = void 0);
    r ? e.props = o ? i : zr(i) : e.type.props ? e.props = i : e.props = s,
    e.attrs = s
}
function W4(e, t, r, o) {
    const {props: i, attrs: s, vnode: {patchFlag: c}} = e
      , d = je(i)
      , [h] = e.propsOptions;
    let _ = !1;
    if ((o || c > 0) && !(c & 16)) {
        if (c & 8) {
            const g = e.vnode.dynamicProps;
            for (let l = 0; l < g.length; l++) {
                let f = g[l];
                if ($a(e.emitsOptions, f))
                    continue;
                const p = t[f];
                if (h)
                    if (Be(s, f))
                        p !== s[f] && (s[f] = p,
                        _ = !0);
                    else {
                        const y = fr(f);
                        i[y] = tf(h, d, y, p, e, !1)
                    }
                else
                    p !== s[f] && (s[f] = p,
                    _ = !0)
            }
        }
    } else {
        Zg(e, t, i, s) && (_ = !0);
        let g;
        for (const l in d)
            (!t || !Be(t, l) && ((g = ro(l)) === l || !Be(t, g))) && (h ? r && (r[l] !== void 0 || r[g] !== void 0) && (i[l] = tf(h, d, l, void 0, e, !0)) : delete i[l]);
        if (s !== d)
            for (const l in s)
                (!t || !Be(t, l)) && (delete s[l],
                _ = !0)
    }
    _ && Vr(e.attrs, "set", "")
}
function Zg(e, t, r, o) {
    const [i,s] = e.propsOptions;
    let c = !1, d;
    if (t)
        for (let h in t) {
            if (jo(h))
                continue;
            const _ = t[h];
            let g;
            i && Be(i, g = fr(h)) ? !s || !s.includes(g) ? r[g] = _ : (d || (d = {}))[g] = _ : $a(e.emitsOptions, h) || (!(h in o) || _ !== o[h]) && (o[h] = _,
            c = !0)
        }
    if (s) {
        const h = je(r)
          , _ = d || Ze;
        for (let g = 0; g < s.length; g++) {
            const l = s[g];
            r[l] = tf(i, h, l, _[l], e, !Be(_, l))
        }
    }
    return c
}
function tf(e, t, r, o, i, s) {
    const c = e[r];
    if (c != null) {
        const d = Be(c, "default");
        if (d && o === void 0) {
            const h = c.default;
            if (c.type !== Function && !c.skipFactory && Te(h)) {
                const {propsDefaults: _} = i;
                if (r in _)
                    o = _[r];
                else {
                    const g = Qi(i);
                    o = _[r] = h.call(null, t),
                    g()
                }
            } else
                o = h;
            i.ce && i.ce._setProp(r, o)
        }
        c[0] && (s && !d ? o = !1 : c[1] && (o === "" || o === ro(r)) && (o = !0))
    }
    return o
}
const G4 = new WeakMap;
function Qg(e, t, r=!1) {
    const o = r ? G4 : t.propsCache
      , i = o.get(e);
    if (i)
        return i;
    const s = e.props
      , c = {}
      , d = [];
    let h = !1;
    if (!Te(e)) {
        const g = l => {
            h = !0;
            const [f,p] = Qg(l, t, !0);
            Tt(c, f),
            p && d.push(...p)
        }
        ;
        !r && t.mixins.length && t.mixins.forEach(g),
        e.extends && g(e.extends),
        e.mixins && e.mixins.forEach(g)
    }
    if (!s && !h)
        return Qe(e) && o.set(e, Mo),
        Mo;
    if (be(s))
        for (let g = 0; g < s.length; g++) {
            const l = fr(s[g]);
            Sh(l) && (c[l] = Ze)
        }
    else if (s)
        for (const g in s) {
            const l = fr(g);
            if (Sh(l)) {
                const f = s[g]
                  , p = c[l] = be(f) || Te(f) ? {
                    type: f
                } : Tt({}, f)
                  , y = p.type;
                let w = !1
                  , x = !0;
                if (be(y))
                    for (let P = 0; P < y.length; ++P) {
                        const E = y[P]
                          , C = Te(E) && E.name;
                        if (C === "Boolean") {
                            w = !0;
                            break
                        } else
                            C === "String" && (x = !1)
                    }
                else
                    w = Te(y) && y.name === "Boolean";
                p[0] = w,
                p[1] = x,
                (w || Be(p, "default")) && d.push(l)
            }
        }
    const _ = [c, d];
    return Qe(e) && o.set(e, _),
    _
}
function Sh(e) {
    return e[0] !== "$" && !jo(e)
}
const e_ = e => e[0] === "_" || e === "$stable"
  , Xf = e => be(e) ? e.map(rr) : [rr(e)]
  , X4 = (e, t, r) => {
    if (t._n)
        return t;
    const o = nr( (...i) => Xf(t(...i)), r);
    return o._c = !1,
    o
}
  , t_ = (e, t, r) => {
    const o = e._ctx;
    for (const i in e) {
        if (e_(i))
            continue;
        const s = e[i];
        if (Te(s))
            t[i] = X4(i, s, o);
        else if (s != null) {
            const c = Xf(s);
            t[i] = () => c
        }
    }
}
  , r_ = (e, t) => {
    const r = Xf(t);
    e.slots.default = () => r
}
  , n_ = (e, t, r) => {
    for (const o in t)
        (r || o !== "_") && (e[o] = t[o])
}
  , J4 = (e, t, r) => {
    const o = e.slots = Jg();
    if (e.vnode.shapeFlag & 32) {
        const i = t._;
        i ? (n_(o, t, r),
        r && ng(o, "_", i, !0)) : t_(t, o)
    } else
        t && r_(e, t)
}
  , Y4 = (e, t, r) => {
    const {vnode: o, slots: i} = e;
    let s = !0
      , c = Ze;
    if (o.shapeFlag & 32) {
        const d = t._;
        d ? r && d === 1 ? s = !1 : n_(i, t, r) : (s = !t.$stable,
        t_(t, i)),
        c = t
    } else
        t && (r_(e, t),
        c = {
            default: 1
        });
    if (s)
        for (const d in i)
            !e_(d) && c[d] == null && delete i[d]
}
  , xt = p_;
function Z4(e) {
    return o_(e)
}
function Q4(e) {
    return o_(e, k4)
}
function o_(e, t) {
    const r = La();
    r.__VUE__ = !0;
    const {insert: o, remove: i, patchProp: s, createElement: c, createText: d, createComment: h, setText: _, setElementText: g, parentNode: l, nextSibling: f, setScopeId: p=Pr, insertStaticContent: y} = e
      , w = (k, O, L, q=null, z=null, X=null, ne=void 0, te=null, ee=!!O.dynamicChildren) => {
        if (k === O)
            return;
        k && !hr(k, O) && (q = V(k),
        at(k, z, X, !0),
        k = null),
        O.patchFlag === -2 && (ee = !1,
        O.dynamicChildren = null);
        const {type: K, ref: ge, shapeFlag: re} = O;
        switch (K) {
        case eo:
            x(k, O, L, q);
            break;
        case wt:
            P(k, O, L, q);
            break;
        case Ri:
            k == null && E(O, L, q, ne);
            break;
        case lt:
            U(k, O, L, q, z, X, ne, te, ee);
            break;
        default:
            re & 1 ? M(k, O, L, q, z, X, ne, te, ee) : re & 6 ? ce(k, O, L, q, z, X, ne, te, ee) : (re & 64 || re & 128) && K.process(k, O, L, q, z, X, ne, te, ee, ue)
        }
        ge != null && z && Ni(ge, k && k.ref, X, O || k, !O)
    }
      , x = (k, O, L, q) => {
        if (k == null)
            o(O.el = d(O.children), L, q);
        else {
            const z = O.el = k.el;
            O.children !== k.children && _(z, O.children)
        }
    }
      , P = (k, O, L, q) => {
        k == null ? o(O.el = h(O.children || ""), L, q) : O.el = k.el
    }
      , E = (k, O, L, q) => {
        [k.el,k.anchor] = y(k.children, O, L, q, k.el, k.anchor)
    }
      , C = ({el: k, anchor: O}, L, q) => {
        let z;
        for (; k && k !== O; )
            z = f(k),
            o(k, L, q),
            k = z;
        o(O, L, q)
    }
      , S = ({el: k, anchor: O}) => {
        let L;
        for (; k && k !== O; )
            L = f(k),
            i(k),
            k = L;
        i(O)
    }
      , M = (k, O, L, q, z, X, ne, te, ee) => {
        O.type === "svg" ? ne = "svg" : O.type === "math" && (ne = "mathml"),
        k == null ? F(O, L, q, z, X, ne, te, ee) : $(k, O, z, X, ne, te, ee)
    }
      , F = (k, O, L, q, z, X, ne, te) => {
        let ee, K;
        const {props: ge, shapeFlag: re, transition: de, dirs: ye} = k;
        if (ee = k.el = c(k.type, X, ge && ge.is, ge),
        re & 8 ? g(ee, k.children) : re & 16 && Q(k.children, ee, null, q, z, Cu(k, X), ne, te),
        ye && Cr(k, null, q, "created"),
        W(ee, k, k.scopeId, ne, q),
        ge) {
            for (const De in ge)
                De !== "value" && !jo(De) && s(ee, De, null, ge[De], X, q);
            "value"in ge && s(ee, "value", null, ge.value, X),
            (K = ge.onVnodeBeforeMount) && Kt(K, q, k)
        }
        ye && Cr(k, null, q, "beforeMount");
        const Ae = i_(z, de);
        Ae && de.beforeEnter(ee),
        o(ee, O, L),
        ((K = ge && ge.onVnodeMounted) || Ae || ye) && xt( () => {
            K && Kt(K, q, k),
            Ae && de.enter(ee),
            ye && Cr(k, null, q, "mounted")
        }
        , z)
    }
      , W = (k, O, L, q, z) => {
        if (L && p(k, L),
        q)
            for (let X = 0; X < q.length; X++)
                p(k, q[X]);
        if (z) {
            let X = z.subTree;
            if (O === X || wa(X.type) && (X.ssContent === O || X.ssFallback === O)) {
                const ne = z.vnode;
                W(k, ne, ne.scopeId, ne.slotScopeIds, z.parent)
            }
        }
    }
      , Q = (k, O, L, q, z, X, ne, te, ee=0) => {
        for (let K = ee; K < k.length; K++) {
            const ge = k[K] = te ? ln(k[K]) : rr(k[K]);
            w(null, ge, O, L, q, z, X, ne, te)
        }
    }
      , $ = (k, O, L, q, z, X, ne) => {
        const te = O.el = k.el;
        let {patchFlag: ee, dynamicChildren: K, dirs: ge} = O;
        ee |= k.patchFlag & 16;
        const re = k.props || Ze
          , de = O.props || Ze;
        let ye;
        if (L && $n(L, !1),
        (ye = de.onVnodeBeforeUpdate) && Kt(ye, L, O, k),
        ge && Cr(O, k, L, "beforeUpdate"),
        L && $n(L, !0),
        (re.innerHTML && de.innerHTML == null || re.textContent && de.textContent == null) && g(te, ""),
        K ? G(k.dynamicChildren, K, te, L, q, Cu(O, z), X) : ne || le(k, O, te, null, L, q, Cu(O, z), X, !1),
        ee > 0) {
            if (ee & 16)
                ae(te, re, de, L, z);
            else if (ee & 2 && re.class !== de.class && s(te, "class", null, de.class, z),
            ee & 4 && s(te, "style", re.style, de.style, z),
            ee & 8) {
                const Ae = O.dynamicProps;
                for (let De = 0; De < Ae.length; De++) {
                    const Me = Ae[De]
                      , Ct = re[Me]
                      , st = de[Me];
                    (st !== Ct || Me === "value") && s(te, Me, Ct, st, z, L)
                }
            }
            ee & 1 && k.children !== O.children && g(te, O.children)
        } else
            !ne && K == null && ae(te, re, de, L, z);
        ((ye = de.onVnodeUpdated) || ge) && xt( () => {
            ye && Kt(ye, L, O, k),
            ge && Cr(O, k, L, "updated")
        }
        , q)
    }
      , G = (k, O, L, q, z, X, ne) => {
        for (let te = 0; te < O.length; te++) {
            const ee = k[te]
              , K = O[te]
              , ge = ee.el && (ee.type === lt || !hr(ee, K) || ee.shapeFlag & 70) ? l(ee.el) : L;
            w(ee, K, ge, null, q, z, X, ne, !0)
        }
    }
      , ae = (k, O, L, q, z) => {
        if (O !== L) {
            if (O !== Ze)
                for (const X in O)
                    !jo(X) && !(X in L) && s(k, X, O[X], null, z, q);
            for (const X in L) {
                if (jo(X))
                    continue;
                const ne = L[X]
                  , te = O[X];
                ne !== te && X !== "value" && s(k, X, te, ne, z, q)
            }
            "value"in L && s(k, "value", O.value, L.value, z)
        }
    }
      , U = (k, O, L, q, z, X, ne, te, ee) => {
        const K = O.el = k ? k.el : d("")
          , ge = O.anchor = k ? k.anchor : d("");
        let {patchFlag: re, dynamicChildren: de, slotScopeIds: ye} = O;
        ye && (te = te ? te.concat(ye) : ye),
        k == null ? (o(K, L, q),
        o(ge, L, q),
        Q(O.children || [], L, ge, z, X, ne, te, ee)) : re > 0 && re & 64 && de && k.dynamicChildren ? (G(k.dynamicChildren, de, L, z, X, ne, te),
        (O.key != null || z && O === z.subTree) && s_(k, O, !0)) : le(k, O, L, ge, z, X, ne, te, ee)
    }
      , ce = (k, O, L, q, z, X, ne, te, ee) => {
        O.slotScopeIds = te,
        k == null ? O.shapeFlag & 512 ? z.ctx.activate(O, L, q, ne, ee) : ve(O, L, q, z, X, ne, ee) : Pe(k, O, ee)
    }
      , ve = (k, O, L, q, z, X, ne) => {
        const te = k.component = b3(k, q, z);
        if (Gi(k) && (te.ctx.renderer = ue),
        w3(te, !1, ne),
        te.asyncDep) {
            if (z && z.registerDep(te, Y, ne),
            !k.el) {
                const ee = te.subTree = we(wt);
                P(null, ee, O, L)
            }
        } else
            Y(te, k, O, L, z, X, ne)
    }
      , Pe = (k, O, L) => {
        const q = O.component = k.component;
        if (c3(k, O, L))
            if (q.asyncDep && !q.asyncResolved) {
                he(q, O, L);
                return
            } else
                q.next = O,
                q.update();
        else
            O.el = k.el,
            q.vnode = O
    }
      , Y = (k, O, L, q, z, X, ne) => {
        const te = () => {
            if (k.isMounted) {
                let {next: re, bu: de, u: ye, parent: Ae, vnode: De} = k;
                {
                    const Ue = a_(k);
                    if (Ue) {
                        re && (re.el = De.el,
                        he(k, re, ne)),
                        Ue.asyncDep.then( () => {
                            k.isUnmounted || te()
                        }
                        );
                        return
                    }
                }
                let Me = re, Ct;
                $n(k, !1),
                re ? (re.el = De.el,
                he(k, re, ne)) : re = De,
                de && xi(de),
                (Ct = re.props && re.props.onVnodeBeforeUpdate) && Kt(Ct, Ae, re, De),
                $n(k, !0);
                const st = Pu(k)
                  , Ht = k.subTree;
                k.subTree = st,
                w(Ht, st, l(Ht.el), V(Ht), k, z, X),
                re.el = st.el,
                Me === null && za(k, st.el),
                ye && xt(ye, z),
                (Ct = re.props && re.props.onVnodeUpdated) && xt( () => Kt(Ct, Ae, re, De), z)
            } else {
                let re;
                const {el: de, props: ye} = O
                  , {bm: Ae, m: De, parent: Me, root: Ct, type: st} = k
                  , Ht = Yn(O);
                if ($n(k, !1),
                Ae && xi(Ae),
                !Ht && (re = ye && ye.onVnodeBeforeMount) && Kt(re, Me, O),
                $n(k, !0),
                de && $e) {
                    const Ue = () => {
                        k.subTree = Pu(k),
                        $e(de, k.subTree, k, z, null)
                    }
                    ;
                    Ht && st.__asyncHydrate ? st.__asyncHydrate(de, k, Ue) : Ue()
                } else {
                    Ct.ce && Ct.ce._injectChildStyle(st);
                    const Ue = k.subTree = Pu(k);
                    w(null, Ue, L, q, k, z, X),
                    O.el = Ue.el
                }
                if (De && xt(De, z),
                !Ht && (re = ye && ye.onVnodeMounted)) {
                    const Ue = O;
                    xt( () => Kt(re, Me, Ue), z)
                }
                (O.shapeFlag & 256 || Me && Yn(Me.vnode) && Me.vnode.shapeFlag & 256) && k.a && xt(k.a, z),
                k.isMounted = !0,
                O = L = q = null
            }
        }
        ;
        k.scope.on();
        const ee = k.effect = new cg(te);
        k.scope.off();
        const K = k.update = ee.run.bind(ee)
          , ge = k.job = ee.runIfDirty.bind(ee);
        ge.i = k,
        ge.id = k.uid,
        ee.scheduler = () => Kf(ge),
        $n(k, !0),
        K()
    }
      , he = (k, O, L) => {
        O.component = k;
        const q = k.vnode.props;
        k.vnode = O,
        k.next = null,
        W4(k, O.props, q, L),
        Y4(k, O.children, L),
        gn(),
        dh(k),
        _n()
    }
      , le = (k, O, L, q, z, X, ne, te, ee=!1) => {
        const K = k && k.children
          , ge = k ? k.shapeFlag : 0
          , re = O.children
          , {patchFlag: de, shapeFlag: ye} = O;
        if (de > 0) {
            if (de & 128) {
                it(K, re, L, q, z, X, ne, te, ee);
                return
            } else if (de & 256) {
                Fe(K, re, L, q, z, X, ne, te, ee);
                return
            }
        }
        ye & 8 ? (ge & 16 && mt(K, z, X),
        re !== K && g(L, re)) : ge & 16 ? ye & 16 ? it(K, re, L, q, z, X, ne, te, ee) : mt(K, z, X, !0) : (ge & 8 && g(L, ""),
        ye & 16 && Q(re, L, q, z, X, ne, te, ee))
    }
      , Fe = (k, O, L, q, z, X, ne, te, ee) => {
        k = k || Mo,
        O = O || Mo;
        const K = k.length
          , ge = O.length
          , re = Math.min(K, ge);
        let de;
        for (de = 0; de < re; de++) {
            const ye = O[de] = ee ? ln(O[de]) : rr(O[de]);
            w(k[de], ye, L, null, z, X, ne, te, ee)
        }
        K > ge ? mt(k, z, X, !0, !1, re) : Q(O, L, q, z, X, ne, te, ee, re)
    }
      , it = (k, O, L, q, z, X, ne, te, ee) => {
        let K = 0;
        const ge = O.length;
        let re = k.length - 1
          , de = ge - 1;
        for (; K <= re && K <= de; ) {
            const ye = k[K]
              , Ae = O[K] = ee ? ln(O[K]) : rr(O[K]);
            if (hr(ye, Ae))
                w(ye, Ae, L, null, z, X, ne, te, ee);
            else
                break;
            K++
        }
        for (; K <= re && K <= de; ) {
            const ye = k[re]
              , Ae = O[de] = ee ? ln(O[de]) : rr(O[de]);
            if (hr(ye, Ae))
                w(ye, Ae, L, null, z, X, ne, te, ee);
            else
                break;
            re--,
            de--
        }
        if (K > re) {
            if (K <= de) {
                const ye = de + 1
                  , Ae = ye < ge ? O[ye].el : q;
                for (; K <= de; )
                    w(null, O[K] = ee ? ln(O[K]) : rr(O[K]), L, Ae, z, X, ne, te, ee),
                    K++
            }
        } else if (K > de)
            for (; K <= re; )
                at(k[K], z, X, !0),
                K++;
        else {
            const ye = K
              , Ae = K
              , De = new Map;
            for (K = Ae; K <= de; K++) {
                const Pt = O[K] = ee ? ln(O[K]) : rr(O[K]);
                Pt.key != null && De.set(Pt.key, K)
            }
            let Me, Ct = 0;
            const st = de - Ae + 1;
            let Ht = !1
              , Ue = 0;
            const xr = new Array(st);
            for (K = 0; K < st; K++)
                xr[K] = 0;
            for (K = ye; K <= re; K++) {
                const Pt = k[K];
                if (Ct >= st) {
                    at(Pt, z, X, !0);
                    continue
                }
                let zt;
                if (Pt.key != null)
                    zt = De.get(Pt.key);
                else
                    for (Me = Ae; Me <= de; Me++)
                        if (xr[Me - Ae] === 0 && hr(Pt, O[Me])) {
                            zt = Me;
                            break
                        }
                zt === void 0 ? at(Pt, z, X, !0) : (xr[zt - Ae] = K + 1,
                zt >= Ue ? Ue = zt : Ht = !0,
                w(Pt, O[zt], L, null, z, X, ne, te, ee),
                Ct++)
            }
            const io = Ht ? e3(xr) : Mo;
            for (Me = io.length - 1,
            K = st - 1; K >= 0; K--) {
                const Pt = Ae + K
                  , zt = O[Pt]
                  , vn = Pt + 1 < ge ? O[Pt + 1].el : q;
                xr[K] === 0 ? w(null, zt, L, vn, z, X, ne, te, ee) : Ht && (Me < 0 || K !== io[Me] ? St(zt, L, vn, 2) : Me--)
            }
        }
    }
      , St = (k, O, L, q, z=null) => {
        const {el: X, type: ne, transition: te, children: ee, shapeFlag: K} = k;
        if (K & 6) {
            St(k.component.subTree, O, L, q);
            return
        }
        if (K & 128) {
            k.suspense.move(O, L, q);
            return
        }
        if (K & 64) {
            ne.move(k, O, L, ue);
            return
        }
        if (ne === lt) {
            o(X, O, L);
            for (let re = 0; re < ee.length; re++)
                St(ee[re], O, L, q);
            o(k.anchor, O, L);
            return
        }
        if (ne === Ri) {
            C(k, O, L);
            return
        }
        if (q !== 2 && K & 1 && te)
            if (q === 0)
                te.beforeEnter(X),
                o(X, O, L),
                xt( () => te.enter(X), z);
            else {
                const {leave: re, delayLeave: de, afterLeave: ye} = te
                  , Ae = () => o(X, O, L)
                  , De = () => {
                    re(X, () => {
                        Ae(),
                        ye && ye()
                    }
                    )
                }
                ;
                de ? de(X, Ae, De) : De()
            }
        else
            o(X, O, L)
    }
      , at = (k, O, L, q=!1, z=!1) => {
        const {type: X, props: ne, ref: te, children: ee, dynamicChildren: K, shapeFlag: ge, patchFlag: re, dirs: de, cacheIndex: ye} = k;
        if (re === -2 && (z = !1),
        te != null && Ni(te, null, L, k, !0),
        ye != null && (O.renderCache[ye] = void 0),
        ge & 256) {
            O.ctx.deactivate(k);
            return
        }
        const Ae = ge & 1 && de
          , De = !Yn(k);
        let Me;
        if (De && (Me = ne && ne.onVnodeBeforeUnmount) && Kt(Me, O, k),
        ge & 6)
            Ve(k.component, L, q);
        else {
            if (ge & 128) {
                k.suspense.unmount(L, q);
                return
            }
            Ae && Cr(k, null, O, "beforeUnmount"),
            ge & 64 ? k.type.remove(k, O, L, ue, q) : K && !K.hasOnce && (X !== lt || re > 0 && re & 64) ? mt(K, O, L, !1, !0) : (X === lt && re & 384 || !z && ge & 16) && mt(ee, O, L),
            q && Re(k)
        }
        (De && (Me = ne && ne.onVnodeUnmounted) || Ae) && xt( () => {
            Me && Kt(Me, O, k),
            Ae && Cr(k, null, O, "unmounted")
        }
        , L)
    }
      , Re = k => {
        const {type: O, el: L, anchor: q, transition: z} = k;
        if (O === lt) {
            et(L, q);
            return
        }
        if (O === Ri) {
            S(k);
            return
        }
        const X = () => {
            i(L),
            z && !z.persisted && z.afterLeave && z.afterLeave()
        }
        ;
        if (k.shapeFlag & 1 && z && !z.persisted) {
            const {leave: ne, delayLeave: te} = z
              , ee = () => ne(L, X);
            te ? te(k.el, X, ee) : ee()
        } else
            X()
    }
      , et = (k, O) => {
        let L;
        for (; k !== O; )
            L = f(k),
            i(k),
            k = L;
        i(O)
    }
      , Ve = (k, O, L) => {
        const {bum: q, scope: z, job: X, subTree: ne, um: te, m: ee, a: K} = k;
        ba(ee),
        ba(K),
        q && xi(q),
        z.stop(),
        X && (X.flags |= 8,
        at(ne, k, O, L)),
        te && xt(te, O),
        xt( () => {
            k.isUnmounted = !0
        }
        , O),
        O && O.pendingBranch && !O.isUnmounted && k.asyncDep && !k.asyncResolved && k.suspenseId === O.pendingId && (O.deps--,
        O.deps === 0 && O.resolve())
    }
      , mt = (k, O, L, q=!1, z=!1, X=0) => {
        for (let ne = X; ne < k.length; ne++)
            at(k[ne], O, L, q, z)
    }
      , V = k => {
        if (k.shapeFlag & 6)
            return V(k.component.subTree);
        if (k.shapeFlag & 128)
            return k.suspense.next();
        const O = f(k.anchor || k.el)
          , L = O && O[T4];
        return L ? f(L) : O
    }
    ;
    let se = !1;
    const oe = (k, O, L) => {
        k == null ? O._vnode && at(O._vnode, null, null, !0) : w(O._vnode || null, k, O, null, null, null, L),
        O._vnode = k,
        se || (se = !0,
        dh(),
        _a(),
        se = !1)
    }
      , ue = {
        p: w,
        um: at,
        m: St,
        r: Re,
        mt: ve,
        mc: Q,
        pc: le,
        pbc: G,
        n: V,
        o: e
    };
    let xe, $e;
    return t && ([xe,$e] = t(ue)),
    {
        render: oe,
        hydrate: xe,
        createApp: q4(oe, xe)
    }
}
function Cu({type: e, props: t}, r) {
    return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r
}
function $n({effect: e, job: t}, r) {
    r ? (e.flags |= 32,
    t.flags |= 4) : (e.flags &= -33,
    t.flags &= -5)
}
function i_(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted
}
function s_(e, t, r=!1) {
    const o = e.children
      , i = t.children;
    if (be(o) && be(i))
        for (let s = 0; s < o.length; s++) {
            const c = o[s];
            let d = i[s];
            d.shapeFlag & 1 && !d.dynamicChildren && ((d.patchFlag <= 0 || d.patchFlag === 32) && (d = i[s] = ln(i[s]),
            d.el = c.el),
            !r && d.patchFlag !== -2 && s_(c, d)),
            d.type === eo && (d.el = c.el)
        }
}
function e3(e) {
    const t = e.slice()
      , r = [0];
    let o, i, s, c, d;
    const h = e.length;
    for (o = 0; o < h; o++) {
        const _ = e[o];
        if (_ !== 0) {
            if (i = r[r.length - 1],
            e[i] < _) {
                t[o] = i,
                r.push(o);
                continue
            }
            for (s = 0,
            c = r.length - 1; s < c; )
                d = s + c >> 1,
                e[r[d]] < _ ? s = d + 1 : c = d;
            _ < e[r[s]] && (s > 0 && (t[o] = r[s - 1]),
            r[s] = o)
        }
    }
    for (s = r.length,
    c = r[s - 1]; s-- > 0; )
        r[s] = c,
        c = t[c];
    return r
}
function a_(e) {
    const t = e.subTree.component;
    if (t)
        return t.asyncDep && !t.asyncResolved ? t : a_(t)
}
function ba(e) {
    if (e)
        for (let t = 0; t < e.length; t++)
            e[t].flags |= 8
}
const t3 = Symbol.for("v-scx")
  , r3 = () => Xt(t3);
function l_(e, t) {
    return Jf(e, null, t)
}
function Kr(e, t, r) {
    return Jf(e, t, r)
}
function Jf(e, t, r=Ze) {
    const {immediate: o, deep: i, flush: s, once: c} = r
      , d = Tt({}, r)
      , h = t && o || !t && s !== "post";
    let _;
    if ($o) {
        if (s === "sync") {
            const p = r3();
            _ = p.__watcherHandles || (p.__watcherHandles = [])
        } else if (!h) {
            const p = () => {}
            ;
            return p.stop = Pr,
            p.resume = Pr,
            p.pause = Pr,
            p
        }
    }
    const g = gt;
    d.call = (p, y, w) => mr(p, g, y, w);
    let l = !1;
    s === "post" ? d.scheduler = p => {
        xt(p, g && g.suspense)
    }
    : s !== "sync" && (l = !0,
    d.scheduler = (p, y) => {
        y ? p() : Kf(p)
    }
    ),
    d.augmentJob = p => {
        t && (p.flags |= 4),
        l && (p.flags |= 2,
        g && (p.id = g.uid,
        p.i = g))
    }
    ;
    const f = y4(e, t, d);
    return $o && (_ ? _.push(f) : h && f()),
    f
}
function n3(e, t, r) {
    const o = this.proxy
      , i = ot(e) ? e.includes(".") ? c_(o, e) : () => o[e] : e.bind(o, o);
    let s;
    Te(t) ? s = t : (s = t.handler,
    r = t);
    const c = Qi(this)
      , d = Jf(i, s.bind(o), r);
    return c(),
    d
}
function c_(e, t) {
    const r = t.split(".");
    return () => {
        let o = e;
        for (let i = 0; i < r.length && o; i++)
            o = o[r[i]];
        return o
    }
}
const o3 = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${fr(t)}Modifiers`] || e[`${ro(t)}Modifiers`];
function i3(e, t, ...r) {
    if (e.isUnmounted)
        return;
    const o = e.vnode.props || Ze;
    let i = r;
    const s = t.startsWith("update:")
      , c = s && o3(o, t.slice(7));
    c && (c.trim && (i = r.map(g => ot(g) ? g.trim() : g)),
    c.number && (i = r.map(D6)));
    let d, h = o[d = gu(t)] || o[d = gu(fr(t))];
    !h && s && (h = o[d = gu(ro(t))]),
    h && mr(h, e, 6, i);
    const _ = o[d + "Once"];
    if (_) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[d])
            return;
        e.emitted[d] = !0,
        mr(_, e, 6, i)
    }
}
function u_(e, t, r=!1) {
    const o = t.emitsCache
      , i = o.get(e);
    if (i !== void 0)
        return i;
    const s = e.emits;
    let c = {}
      , d = !1;
    if (!Te(e)) {
        const h = _ => {
            const g = u_(_, t, !0);
            g && (d = !0,
            Tt(c, g))
        }
        ;
        !r && t.mixins.length && t.mixins.forEach(h),
        e.extends && h(e.extends),
        e.mixins && e.mixins.forEach(h)
    }
    return !s && !d ? (Qe(e) && o.set(e, null),
    null) : (be(s) ? s.forEach(h => c[h] = null) : Tt(c, s),
    Qe(e) && o.set(e, c),
    c)
}
function $a(e, t) {
    return !e || !qi(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""),
    Be(e, t[0].toLowerCase() + t.slice(1)) || Be(e, ro(t)) || Be(e, t))
}
function Pu(e) {
    const {type: t, vnode: r, proxy: o, withProxy: i, propsOptions: [s], slots: c, attrs: d, emit: h, render: _, renderCache: g, props: l, data: f, setupState: p, ctx: y, inheritAttrs: w} = e
      , x = ma(e);
    let P, E;
    try {
        if (r.shapeFlag & 4) {
            const S = i || o
              , M = S;
            P = rr(_.call(M, S, g, l, p, f, y)),
            E = d
        } else {
            const S = t;
            P = rr(S.length > 1 ? S(l, {
                attrs: d,
                slots: c,
                emit: h
            }) : S(l, null)),
            E = t.props ? d : a3(d)
        }
    } catch (S) {
        Mi.length = 0,
        Ko(S, e, 1),
        P = we(wt)
    }
    let C = P;
    if (E && w !== !1) {
        const S = Object.keys(E)
          , {shapeFlag: M} = C;
        S.length && M & 7 && (s && S.some(jf) && (E = l3(E, s)),
        C = Wr(C, E, !1, !0))
    }
    return r.dirs && (C = Wr(C, null, !1, !0),
    C.dirs = C.dirs ? C.dirs.concat(r.dirs) : r.dirs),
    r.transition && No(C, r.transition),
    P = C,
    ma(x),
    P
}
function s3(e, t=!0) {
    let r;
    for (let o = 0; o < e.length; o++) {
        const i = e[o];
        if (Vo(i)) {
            if (i.type !== wt || i.children === "v-if") {
                if (r)
                    return;
                r = i
            }
        } else
            return
    }
    return r
}
const a3 = e => {
    let t;
    for (const r in e)
        (r === "class" || r === "style" || qi(r)) && ((t || (t = {}))[r] = e[r]);
    return t
}
  , l3 = (e, t) => {
    const r = {};
    for (const o in e)
        (!jf(o) || !(o.slice(9)in t)) && (r[o] = e[o]);
    return r
}
;
function c3(e, t, r) {
    const {props: o, children: i, component: s} = e
      , {props: c, children: d, patchFlag: h} = t
      , _ = s.emitsOptions;
    if (t.dirs || t.transition)
        return !0;
    if (r && h >= 0) {
        if (h & 1024)
            return !0;
        if (h & 16)
            return o ? Ch(o, c, _) : !!c;
        if (h & 8) {
            const g = t.dynamicProps;
            for (let l = 0; l < g.length; l++) {
                const f = g[l];
                if (c[f] !== o[f] && !$a(_, f))
                    return !0
            }
        }
    } else
        return (i || d) && (!d || !d.$stable) ? !0 : o === c ? !1 : o ? c ? Ch(o, c, _) : !0 : !!c;
    return !1
}
function Ch(e, t, r) {
    const o = Object.keys(t);
    if (o.length !== Object.keys(e).length)
        return !0;
    for (let i = 0; i < o.length; i++) {
        const s = o[i];
        if (t[s] !== e[s] && !$a(r, s))
            return !0
    }
    return !1
}
function za({vnode: e, parent: t}, r) {
    for (; t; ) {
        const o = t.subTree;
        if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el),
        o === e)
            (e = t.vnode).el = r,
            t = t.parent;
        else
            break
    }
}
const wa = e => e.__isSuspense;
let rf = 0;
const u3 = {
    name: "Suspense",
    __isSuspense: !0,
    process(e, t, r, o, i, s, c, d, h, _) {
        if (e == null)
            f3(t, r, o, i, s, c, d, h, _);
        else {
            if (s && s.deps > 0 && !e.suspense.isInFallback) {
                t.suspense = e.suspense,
                t.suspense.vnode = t,
                t.el = e.el;
                return
            }
            d3(e, t, r, o, i, c, d, h, _)
        }
    },
    hydrate: p3,
    normalize: h3
}
  , f_ = u3;
function Fi(e, t) {
    const r = e.props && e.props[t];
    Te(r) && r()
}
function f3(e, t, r, o, i, s, c, d, h) {
    const {p: _, o: {createElement: g}} = h
      , l = g("div")
      , f = e.suspense = d_(e, i, o, t, l, r, s, c, d, h);
    _(null, f.pendingBranch = e.ssContent, l, null, o, f, s, c),
    f.deps > 0 ? (Fi(e, "onPending"),
    Fi(e, "onFallback"),
    _(null, e.ssFallback, t, r, o, null, s, c),
    Do(f, e.ssFallback)) : f.resolve(!1, !0)
}
function d3(e, t, r, o, i, s, c, d, {p: h, um: _, o: {createElement: g}}) {
    const l = t.suspense = e.suspense;
    l.vnode = t,
    t.el = e.el;
    const f = t.ssContent
      , p = t.ssFallback
      , {activeBranch: y, pendingBranch: w, isInFallback: x, isHydrating: P} = l;
    if (w)
        l.pendingBranch = f,
        hr(f, w) ? (h(w, f, l.hiddenContainer, null, i, l, s, c, d),
        l.deps <= 0 ? l.resolve() : x && (P || (h(y, p, r, o, i, null, s, c, d),
        Do(l, p)))) : (l.pendingId = rf++,
        P ? (l.isHydrating = !1,
        l.activeBranch = w) : _(w, i, l),
        l.deps = 0,
        l.effects.length = 0,
        l.hiddenContainer = g("div"),
        x ? (h(null, f, l.hiddenContainer, null, i, l, s, c, d),
        l.deps <= 0 ? l.resolve() : (h(y, p, r, o, i, null, s, c, d),
        Do(l, p))) : y && hr(f, y) ? (h(y, f, r, o, i, l, s, c, d),
        l.resolve(!0)) : (h(null, f, l.hiddenContainer, null, i, l, s, c, d),
        l.deps <= 0 && l.resolve()));
    else if (y && hr(f, y))
        h(y, f, r, o, i, l, s, c, d),
        Do(l, f);
    else if (Fi(t, "onPending"),
    l.pendingBranch = f,
    f.shapeFlag & 512 ? l.pendingId = f.component.suspenseId : l.pendingId = rf++,
    h(null, f, l.hiddenContainer, null, i, l, s, c, d),
    l.deps <= 0)
        l.resolve();
    else {
        const {timeout: E, pendingId: C} = l;
        E > 0 ? setTimeout( () => {
            l.pendingId === C && l.fallback(p)
        }
        , E) : E === 0 && l.fallback(p)
    }
}
function d_(e, t, r, o, i, s, c, d, h, _, g=!1) {
    const {p: l, m: f, um: p, n: y, o: {parentNode: w, remove: x}} = _;
    let P;
    const E = g3(e);
    E && t && t.pendingBranch && (P = t.pendingId,
    t.deps++);
    const C = e.props ? og(e.props.timeout) : void 0
      , S = s
      , M = {
        vnode: e,
        parent: t,
        parentComponent: r,
        namespace: c,
        container: o,
        hiddenContainer: i,
        deps: 0,
        pendingId: rf++,
        timeout: typeof C == "number" ? C : -1,
        activeBranch: null,
        pendingBranch: null,
        isInFallback: !g,
        isHydrating: g,
        isUnmounted: !1,
        effects: [],
        resolve(F=!1, W=!1) {
            const {vnode: Q, activeBranch: $, pendingBranch: G, pendingId: ae, effects: U, parentComponent: ce, container: ve} = M;
            let Pe = !1;
            M.isHydrating ? M.isHydrating = !1 : F || (Pe = $ && G.transition && G.transition.mode === "out-in",
            Pe && ($.transition.afterLeave = () => {
                ae === M.pendingId && (f(G, ve, s === S ? y($) : s, 0),
                Ju(U))
            }
            ),
            $ && (w($.el) === ve && (s = y($)),
            p($, ce, M, !0)),
            Pe || f(G, ve, s, 0)),
            Do(M, G),
            M.pendingBranch = null,
            M.isInFallback = !1;
            let Y = M.parent
              , he = !1;
            for (; Y; ) {
                if (Y.pendingBranch) {
                    Y.effects.push(...U),
                    he = !0;
                    break
                }
                Y = Y.parent
            }
            !he && !Pe && Ju(U),
            M.effects = [],
            E && t && t.pendingBranch && P === t.pendingId && (t.deps--,
            t.deps === 0 && !W && t.resolve()),
            Fi(Q, "onResolve")
        },
        fallback(F) {
            if (!M.pendingBranch)
                return;
            const {vnode: W, activeBranch: Q, parentComponent: $, container: G, namespace: ae} = M;
            Fi(W, "onFallback");
            const U = y(Q)
              , ce = () => {
                M.isInFallback && (l(null, F, G, U, $, null, ae, d, h),
                Do(M, F))
            }
              , ve = F.transition && F.transition.mode === "out-in";
            ve && (Q.transition.afterLeave = ce),
            M.isInFallback = !0,
            p(Q, $, null, !0),
            ve || ce()
        },
        move(F, W, Q) {
            M.activeBranch && f(M.activeBranch, F, W, Q),
            M.container = F
        },
        next() {
            return M.activeBranch && y(M.activeBranch)
        },
        registerDep(F, W, Q) {
            const $ = !!M.pendingBranch;
            $ && M.deps++;
            const G = F.vnode.el;
            F.asyncDep.catch(ae => {
                Ko(ae, F, 0)
            }
            ).then(ae => {
                if (F.isUnmounted || M.isUnmounted || M.pendingId !== F.suspenseId)
                    return;
                F.asyncResolved = !0;
                const {vnode: U} = F;
                of(F, ae),
                G && (U.el = G);
                const ce = !G && F.subTree.el;
                W(F, U, w(G || F.subTree.el), G ? null : y(F.subTree), M, c, Q),
                ce && x(ce),
                za(F, U.el),
                $ && --M.deps === 0 && M.resolve()
            }
            )
        },
        unmount(F, W) {
            M.isUnmounted = !0,
            M.activeBranch && p(M.activeBranch, r, F, W),
            M.pendingBranch && p(M.pendingBranch, r, F, W)
        }
    };
    return M
}
function p3(e, t, r, o, i, s, c, d, h) {
    const _ = t.suspense = d_(t, o, r, e.parentNode, document.createElement("div"), null, i, s, c, d, !0)
      , g = h(e, _.pendingBranch = t.ssContent, r, _, s, c);
    return _.deps === 0 && _.resolve(!1, !0),
    g
}
function h3(e) {
    const {shapeFlag: t, children: r} = e
      , o = t & 32;
    e.ssContent = Ph(o ? r.default : r),
    e.ssFallback = o ? Ph(r.fallback) : we(wt)
}
function Ph(e) {
    let t;
    if (Te(e)) {
        const r = Fo && e._c;
        r && (e._d = !1,
        _e()),
        e = e(),
        r && (e._d = !0,
        t = Wt,
        h_())
    }
    return be(e) && (e = s3(e)),
    e = rr(e),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter(r => r !== e)),
    e
}
function p_(e, t) {
    t && t.pendingBranch ? be(e) ? t.effects.push(...e) : t.effects.push(e) : Ju(e)
}
function Do(e, t) {
    e.activeBranch = t;
    const {vnode: r, parentComponent: o} = e;
    let i = t.el;
    for (; !i && t.component; )
        t = t.component.subTree,
        i = t.el;
    r.el = i,
    o && o.subTree === r && (o.vnode.el = i,
    za(o, i))
}
function g3(e) {
    const t = e.props && e.props.suspensible;
    return t != null && t !== !1
}
const lt = Symbol.for("v-fgt")
  , eo = Symbol.for("v-txt")
  , wt = Symbol.for("v-cmt")
  , Ri = Symbol.for("v-stc")
  , Mi = [];
let Wt = null;
function _e(e=!1) {
    Mi.push(Wt = e ? null : [])
}
function h_() {
    Mi.pop(),
    Wt = Mi[Mi.length - 1] || null
}
let Fo = 1;
function Ah(e, t=!1) {
    Fo += e,
    e < 0 && Wt && t && (Wt.hasOnce = !0)
}
function g_(e) {
    return e.dynamicChildren = Fo > 0 ? Wt || Mo : null,
    h_(),
    Fo > 0 && Wt && Wt.push(e),
    e
}
function Oe(e, t, r, o, i, s) {
    return g_(D(e, t, r, o, i, s, !0))
}
function Vt(e, t, r, o, i) {
    return g_(we(e, t, r, o, i, !0))
}
function Vo(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function hr(e, t) {
    return e.type === t.type && e.key === t.key
}
const __ = ({key: e}) => e ?? null
  , la = ({ref: e, ref_key: t, ref_for: r}) => (typeof e == "number" && (e = "" + e),
e != null ? ot(e) || ut(e) || Te(e) ? {
    i: or,
    r: e,
    k: t,
    f: !!r
} : e : null);
function D(e, t=null, r=null, o=0, i=null, s=e === lt ? 0 : 1, c=!1, d=!1) {
    const h = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && __(t),
        ref: t && la(t),
        scopeId: Eg,
        slotScopeIds: null,
        children: r,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetStart: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: s,
        patchFlag: o,
        dynamicProps: i,
        dynamicChildren: null,
        appContext: null,
        ctx: or
    };
    return d ? (Yf(h, r),
    s & 128 && e.normalize(h)) : r && (h.shapeFlag |= ot(r) ? 8 : 16),
    Fo > 0 && !c && Wt && (h.patchFlag > 0 || s & 6) && h.patchFlag !== 32 && Wt.push(h),
    h
}
const we = _3;
function _3(e, t=null, r=null, o=0, i=null, s=!1) {
    if ((!e || e === Ug) && (e = wt),
    Vo(e)) {
        const d = Wr(e, t, !0);
        return r && Yf(d, r),
        Fo > 0 && !s && Wt && (d.shapeFlag & 6 ? Wt[Wt.indexOf(e)] = d : Wt.push(d)),
        d.patchFlag = -2,
        d
    }
    if (P3(e) && (e = e.__vccOpts),
    t) {
        t = m_(t);
        let {class: d, style: h} = t;
        d && !ot(d) && (t.class = gr(d)),
        Qe(h) && (Uf(h) && !be(h) && (h = Tt({}, h)),
        t.style = rt(h))
    }
    const c = ot(e) ? 1 : wa(e) ? 128 : Og(e) ? 64 : Qe(e) ? 4 : Te(e) ? 2 : 0;
    return D(e, t, r, o, i, c, s, !0)
}
function m_(e) {
    return e ? Uf(e) || Yg(e) ? Tt({}, e) : e : null
}
function Wr(e, t, r=!1, o=!1) {
    const {props: i, ref: s, patchFlag: c, children: d, transition: h} = e
      , _ = t ? m3(i || {}, t) : i
      , g = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: _,
        key: _ && __(_),
        ref: t && t.ref ? r && s ? be(s) ? s.concat(la(t)) : [s, la(t)] : la(t) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: d,
        target: e.target,
        targetStart: e.targetStart,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== lt ? c === -1 ? 16 : c | 16 : c,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: h,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Wr(e.ssContent),
        ssFallback: e.ssFallback && Wr(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    };
    return h && o && No(g, h.clone(g)),
    g
}
function ht(e=" ", t=0) {
    return we(eo, null, e, t)
}
function Yi(e, t) {
    const r = we(Ri, null, e);
    return r.staticCount = t,
    r
}
function jt(e="", t=!1) {
    return t ? (_e(),
    Vt(wt, null, e)) : we(wt, null, e)
}
function rr(e) {
    return e == null || typeof e == "boolean" ? we(wt) : be(e) ? we(lt, null, e.slice()) : Vo(e) ? ln(e) : we(eo, null, String(e))
}
function ln(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Wr(e)
}
function Yf(e, t) {
    let r = 0;
    const {shapeFlag: o} = e;
    if (t == null)
        t = null;
    else if (be(t))
        r = 16;
    else if (typeof t == "object")
        if (o & 65) {
            const i = t.default;
            i && (i._c && (i._d = !1),
            Yf(e, i()),
            i._c && (i._d = !0));
            return
        } else {
            r = 32;
            const i = t._;
            !i && !Yg(t) ? t._ctx = or : i === 3 && or && (or.slots._ === 1 ? t._ = 1 : (t._ = 2,
            e.patchFlag |= 1024))
        }
    else
        Te(t) ? (t = {
            default: t,
            _ctx: or
        },
        r = 32) : (t = String(t),
        o & 64 ? (r = 16,
        t = [ht(t)]) : r = 8);
    e.children = t,
    e.shapeFlag |= r
}
function m3(...e) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
        const o = e[r];
        for (const i in o)
            if (i === "class")
                t.class !== o.class && (t.class = gr([t.class, o.class]));
            else if (i === "style")
                t.style = rt([t.style, o.style]);
            else if (qi(i)) {
                const s = t[i]
                  , c = o[i];
                c && s !== c && !(be(s) && s.includes(c)) && (t[i] = s ? [].concat(s, c) : c)
            } else
                i !== "" && (t[i] = o[i])
    }
    return t
}
function Kt(e, t, r, o=null) {
    mr(e, t, 7, [r, o])
}
const v3 = Gg();
let y3 = 0;
function b3(e, t, r) {
    const o = e.type
      , i = (t ? t.appContext : e.appContext) || v3
      , s = {
        uid: y3++,
        vnode: e,
        type: o,
        parent: t,
        appContext: i,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        job: null,
        scope: new lg(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(i.provides),
        ids: t ? t.ids : ["", 0, 0],
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: Qg(o, i),
        emitsOptions: u_(o, i),
        emit: null,
        emitted: null,
        propsDefaults: Ze,
        inheritAttrs: o.inheritAttrs,
        ctx: Ze,
        data: Ze,
        props: Ze,
        attrs: Ze,
        slots: Ze,
        refs: Ze,
        setupState: Ze,
        setupContext: null,
        suspense: r,
        suspenseId: r ? r.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return s.ctx = {
        _: s
    },
    s.root = t ? t.root : s,
    s.emit = i3.bind(null, s),
    e.ce && e.ce(s),
    s
}
let gt = null;
const Zi = () => gt || or;
let Ta, nf;
{
    const e = La()
      , t = (r, o) => {
        let i;
        return (i = e[r]) || (i = e[r] = []),
        i.push(o),
        s => {
            i.length > 1 ? i.forEach(c => c(s)) : i[0](s)
        }
    }
    ;
    Ta = t("__VUE_INSTANCE_SETTERS__", r => gt = r),
    nf = t("__VUE_SSR_SETTERS__", r => $o = r)
}
const Qi = e => {
    const t = gt;
    return Ta(e),
    e.scope.on(),
    () => {
        e.scope.off(),
        Ta(t)
    }
}
  , xh = () => {
    gt && gt.scope.off(),
    Ta(null)
}
;
function v_(e) {
    return e.vnode.shapeFlag & 4
}
let $o = !1;
function w3(e, t=!1, r=!1) {
    t && nf(t);
    const {props: o, children: i} = e.vnode
      , s = v_(e);
    K4(e, o, s, t),
    J4(e, i, r);
    const c = s ? T3(e, t) : void 0;
    return t && nf(!1),
    c
}
function T3(e, t) {
    const r = e.type;
    e.accessCache = Object.create(null),
    e.proxy = new Proxy(e.ctx,B4);
    const {setup: o} = r;
    if (o) {
        gn();
        const i = e.setupContext = o.length > 1 ? C3(e) : null
          , s = Qi(e)
          , c = Wi(o, e, 0, [e.props, i])
          , d = eg(c);
        if (_n(),
        s(),
        (d || e.sp) && !Yn(e) && Wf(e),
        d) {
            if (c.then(xh, xh),
            t)
                return c.then(h => {
                    of(e, h)
                }
                ).catch(h => {
                    Ko(h, e, 0)
                }
                );
            e.asyncDep = c
        } else
            of(e, c)
    } else
        y_(e)
}
function of(e, t, r) {
    Te(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Qe(t) && (e.setupState = Pg(t)),
    y_(e)
}
function y_(e, t, r) {
    const o = e.type;
    e.render || (e.render = o.render || Pr);
    {
        const i = Qi(e);
        gn();
        try {
            N4(e)
        } finally {
            _n(),
            i()
        }
    }
}
const S3 = {
    get(e, t) {
        return Mt(e, "get", ""),
        e[t]
    }
};
function C3(e) {
    const t = r => {
        e.exposed = r || {}
    }
    ;
    return {
        attrs: new Proxy(e.attrs,S3),
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}
function Zf(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Pg(u4(e.exposed)),{
        get(t, r) {
            if (r in t)
                return t[r];
            if (r in Oi)
                return Oi[r](e)
        },
        has(t, r) {
            return r in t || r in Oi
        }
    })) : e.proxy
}
function sf(e, t=!0) {
    return Te(e) ? e.displayName || e.name : e.name || t && e.__name
}
function P3(e) {
    return Te(e) && "__vccOpts"in e
}
const nt = (e, t) => m4(e, t, $o);
function Gt(e, t, r) {
    const o = arguments.length;
    return o === 2 ? Qe(t) && !be(t) ? Vo(t) ? we(e, null, [t]) : we(e, t) : we(e, null, t) : (o > 3 ? r = Array.prototype.slice.call(arguments, 2) : o === 3 && Vo(r) && (r = [r]),
    we(e, t, r))
}
const A3 = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let af;
const kh = typeof window < "u" && window.trustedTypes;
if (kh)
    try {
        af = kh.createPolicy("vue", {
            createHTML: e => e
        })
    } catch {}
const b_ = af ? e => af.createHTML(e) : e => e
  , x3 = "http://www.w3.org/2000/svg"
  , k3 = "http://www.w3.org/1998/Math/MathML"
  , Fr = typeof document < "u" ? document : null
  , Eh = Fr && Fr.createElement("template")
  , E3 = {
    insert: (e, t, r) => {
        t.insertBefore(e, r || null)
    }
    ,
    remove: e => {
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e, t, r, o) => {
        const i = t === "svg" ? Fr.createElementNS(x3, e) : t === "mathml" ? Fr.createElementNS(k3, e) : r ? Fr.createElement(e, {
            is: r
        }) : Fr.createElement(e);
        return e === "select" && o && o.multiple != null && i.setAttribute("multiple", o.multiple),
        i
    }
    ,
    createText: e => Fr.createTextNode(e),
    createComment: e => Fr.createComment(e),
    setText: (e, t) => {
        e.nodeValue = t
    }
    ,
    setElementText: (e, t) => {
        e.textContent = t
    }
    ,
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => Fr.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    insertStaticContent(e, t, r, o, i, s) {
        const c = r ? r.previousSibling : t.lastChild;
        if (i && (i === s || i.nextSibling))
            for (; t.insertBefore(i.cloneNode(!0), r),
            !(i === s || !(i = i.nextSibling)); )
                ;
        else {
            Eh.innerHTML = b_(o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e);
            const d = Eh.content;
            if (o === "svg" || o === "mathml") {
                const h = d.firstChild;
                for (; h.firstChild; )
                    d.appendChild(h.firstChild);
                d.removeChild(h)
            }
            t.insertBefore(d, r)
        }
        return [c ? c.nextSibling : t.firstChild, r ? r.previousSibling : t.lastChild]
    }
}
  , on = "transition"
  , mi = "animation"
  , Vi = Symbol("_vtc")
  , w_ = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: !0
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
}
  , O3 = Tt({}, Rg, w_)
  , R3 = e => (e.displayName = "Transition",
e.props = O3,
e)
  , to = R3( (e, {slots: t}) => Gt(P4, M3(e), t))
  , zn = (e, t=[]) => {
    be(e) ? e.forEach(r => r(...t)) : e && e(...t)
}
  , Oh = e => e ? be(e) ? e.some(t => t.length > 1) : e.length > 1 : !1;
function M3(e) {
    const t = {};
    for (const U in e)
        U in w_ || (t[U] = e[U]);
    if (e.css === !1)
        return t;
    const {name: r="v", type: o, duration: i, enterFromClass: s=`${r}-enter-from`, enterActiveClass: c=`${r}-enter-active`, enterToClass: d=`${r}-enter-to`, appearFromClass: h=s, appearActiveClass: _=c, appearToClass: g=d, leaveFromClass: l=`${r}-leave-from`, leaveActiveClass: f=`${r}-leave-active`, leaveToClass: p=`${r}-leave-to`} = e
      , y = I3(i)
      , w = y && y[0]
      , x = y && y[1]
      , {onBeforeEnter: P, onEnter: E, onEnterCancelled: C, onLeave: S, onLeaveCancelled: M, onBeforeAppear: F=P, onAppear: W=E, onAppearCancelled: Q=C} = t
      , $ = (U, ce, ve, Pe) => {
        U._enterCancelled = Pe,
        Un(U, ce ? g : d),
        Un(U, ce ? _ : c),
        ve && ve()
    }
      , G = (U, ce) => {
        U._isLeaving = !1,
        Un(U, l),
        Un(U, p),
        Un(U, f),
        ce && ce()
    }
      , ae = U => (ce, ve) => {
        const Pe = U ? W : E
          , Y = () => $(ce, U, ve);
        zn(Pe, [ce, Y]),
        Rh( () => {
            Un(ce, U ? h : s),
            Br(ce, U ? g : d),
            Oh(Pe) || Mh(ce, o, w, Y)
        }
        )
    }
    ;
    return Tt(t, {
        onBeforeEnter(U) {
            zn(P, [U]),
            Br(U, s),
            Br(U, c)
        },
        onBeforeAppear(U) {
            zn(F, [U]),
            Br(U, h),
            Br(U, _)
        },
        onEnter: ae(!1),
        onAppear: ae(!0),
        onLeave(U, ce) {
            U._isLeaving = !0;
            const ve = () => G(U, ce);
            Br(U, l),
            U._enterCancelled ? (Br(U, f),
            Hh()) : (Hh(),
            Br(U, f)),
            Rh( () => {
                U._isLeaving && (Un(U, l),
                Br(U, p),
                Oh(S) || Mh(U, o, x, ve))
            }
            ),
            zn(S, [U, ve])
        },
        onEnterCancelled(U) {
            $(U, !1, void 0, !0),
            zn(C, [U])
        },
        onAppearCancelled(U) {
            $(U, !0, void 0, !0),
            zn(Q, [U])
        },
        onLeaveCancelled(U) {
            G(U),
            zn(M, [U])
        }
    })
}
function I3(e) {
    if (e == null)
        return null;
    if (Qe(e))
        return [Au(e.enter), Au(e.leave)];
    {
        const t = Au(e);
        return [t, t]
    }
}
function Au(e) {
    return og(e)
}
function Br(e, t) {
    t.split(/\s+/).forEach(r => r && e.classList.add(r)),
    (e[Vi] || (e[Vi] = new Set)).add(t)
}
function Un(e, t) {
    t.split(/\s+/).forEach(o => o && e.classList.remove(o));
    const r = e[Vi];
    r && (r.delete(t),
    r.size || (e[Vi] = void 0))
}
function Rh(e) {
    requestAnimationFrame( () => {
        requestAnimationFrame(e)
    }
    )
}
let j3 = 0;
function Mh(e, t, r, o) {
    const i = e._endId = ++j3
      , s = () => {
        i === e._endId && o()
    }
    ;
    if (r != null)
        return setTimeout(s, r);
    const {type: c, timeout: d, propCount: h} = H3(e, t);
    if (!c)
        return o();
    const _ = c + "end";
    let g = 0;
    const l = () => {
        e.removeEventListener(_, f),
        s()
    }
      , f = p => {
        p.target === e && ++g >= h && l()
    }
    ;
    setTimeout( () => {
        g < h && l()
    }
    , d + 1),
    e.addEventListener(_, f)
}
function H3(e, t) {
    const r = window.getComputedStyle(e)
      , o = y => (r[y] || "").split(", ")
      , i = o(`${on}Delay`)
      , s = o(`${on}Duration`)
      , c = Ih(i, s)
      , d = o(`${mi}Delay`)
      , h = o(`${mi}Duration`)
      , _ = Ih(d, h);
    let g = null
      , l = 0
      , f = 0;
    t === on ? c > 0 && (g = on,
    l = c,
    f = s.length) : t === mi ? _ > 0 && (g = mi,
    l = _,
    f = h.length) : (l = Math.max(c, _),
    g = l > 0 ? c > _ ? on : mi : null,
    f = g ? g === on ? s.length : h.length : 0);
    const p = g === on && /\b(transform|all)(,|$)/.test(o(`${on}Property`).toString());
    return {
        type: g,
        timeout: l,
        propCount: f,
        hasTransform: p
    }
}
function Ih(e, t) {
    for (; e.length < t.length; )
        e = e.concat(e);
    return Math.max(...t.map( (r, o) => jh(r) + jh(e[o])))
}
function jh(e) {
    return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3
}
function Hh() {
    return document.body.offsetHeight
}
function D3(e, t, r) {
    const o = e[Vi];
    o && (t = (t ? [t, ...o] : [...o]).join(" ")),
    t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t
}
const Dh = Symbol("_vod")
  , L3 = Symbol("_vsh")
  , B3 = Symbol("")
  , N3 = /(^|;)\s*display\s*:/;
function F3(e, t, r) {
    const o = e.style
      , i = ot(r);
    let s = !1;
    if (r && !i) {
        if (t)
            if (ot(t))
                for (const c of t.split(";")) {
                    const d = c.slice(0, c.indexOf(":")).trim();
                    r[d] == null && ca(o, d, "")
                }
            else
                for (const c in t)
                    r[c] == null && ca(o, c, "");
        for (const c in r)
            c === "display" && (s = !0),
            ca(o, c, r[c])
    } else if (i) {
        if (t !== r) {
            const c = o[B3];
            c && (r += ";" + c),
            o.cssText = r,
            s = N3.test(r)
        }
    } else
        t && e.removeAttribute("style");
    Dh in e && (e[Dh] = s ? o.display : "",
    e[L3] && (o.display = "none"))
}
const Lh = /\s*!important$/;
function ca(e, t, r) {
    if (be(r))
        r.forEach(o => ca(e, t, o));
    else if (r == null && (r = ""),
    t.startsWith("--"))
        e.setProperty(t, r);
    else {
        const o = V3(e, t);
        Lh.test(r) ? e.setProperty(ro(o), r.replace(Lh, ""), "important") : e[o] = r
    }
}
const Bh = ["Webkit", "Moz", "ms"]
  , xu = {};
function V3(e, t) {
    const r = xu[t];
    if (r)
        return r;
    let o = fr(t);
    if (o !== "filter" && o in e)
        return xu[t] = o;
    o = Da(o);
    for (let i = 0; i < Bh.length; i++) {
        const s = Bh[i] + o;
        if (s in e)
            return xu[t] = s
    }
    return t
}
const Nh = "http://www.w3.org/1999/xlink";
function Fh(e, t, r, o, i, s=z6(t)) {
    o && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(Nh, t.slice(6, t.length)) : e.setAttributeNS(Nh, t, r) : r == null || s && !ig(r) ? e.removeAttribute(t) : e.setAttribute(t, s ? "" : hn(r) ? String(r) : r)
}
function Vh(e, t, r, o, i) {
    if (t === "innerHTML" || t === "textContent") {
        r != null && (e[t] = t === "innerHTML" ? b_(r) : r);
        return
    }
    const s = e.tagName;
    if (t === "value" && s !== "PROGRESS" && !s.includes("-")) {
        const d = s === "OPTION" ? e.getAttribute("value") || "" : e.value
          , h = r == null ? e.type === "checkbox" ? "on" : "" : String(r);
        (d !== h || !("_value"in e)) && (e.value = h),
        r == null && e.removeAttribute(t),
        e._value = r;
        return
    }
    let c = !1;
    if (r === "" || r == null) {
        const d = typeof e[t];
        d === "boolean" ? r = ig(r) : r == null && d === "string" ? (r = "",
        c = !0) : d === "number" && (r = 0,
        c = !0)
    }
    try {
        e[t] = r
    } catch {}
    c && e.removeAttribute(i || t)
}
function $3(e, t, r, o) {
    e.addEventListener(t, r, o)
}
function z3(e, t, r, o) {
    e.removeEventListener(t, r, o)
}
const $h = Symbol("_vei");
function U3(e, t, r, o, i=null) {
    const s = e[$h] || (e[$h] = {})
      , c = s[t];
    if (o && c)
        c.value = o;
    else {
        const [d,h] = q3(t);
        if (o) {
            const _ = s[t] = G3(o, i);
            $3(e, d, _, h)
        } else
            c && (z3(e, d, c, h),
            s[t] = void 0)
    }
}
const zh = /(?:Once|Passive|Capture)$/;
function q3(e) {
    let t;
    if (zh.test(e)) {
        t = {};
        let o;
        for (; o = e.match(zh); )
            e = e.slice(0, e.length - o[0].length),
            t[o[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : ro(e.slice(2)), t]
}
let ku = 0;
const K3 = Promise.resolve()
  , W3 = () => ku || (K3.then( () => ku = 0),
ku = Date.now());
function G3(e, t) {
    const r = o => {
        if (!o._vts)
            o._vts = Date.now();
        else if (o._vts <= r.attached)
            return;
        mr(X3(o, r.value), t, 5, [o])
    }
    ;
    return r.value = e,
    r.attached = W3(),
    r
}
function X3(e, t) {
    if (be(t)) {
        const r = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            r.call(e),
            e._stopped = !0
        }
        ,
        t.map(o => i => !i._stopped && o && o(i))
    } else
        return t
}
const Uh = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123
  , J3 = (e, t, r, o, i, s) => {
    const c = i === "svg";
    t === "class" ? D3(e, o, c) : t === "style" ? F3(e, r, o) : qi(t) ? jf(t) || U3(e, t, r, o, s) : (t[0] === "." ? (t = t.slice(1),
    !0) : t[0] === "^" ? (t = t.slice(1),
    !1) : Y3(e, t, o, c)) ? (Vh(e, t, o),
    !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Fh(e, t, o, c, s, t !== "value")) : e._isVueCE && (/[A-Z]/.test(t) || !ot(o)) ? Vh(e, fr(t), o, s, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o),
    Fh(e, t, o, c))
}
;
function Y3(e, t, r, o) {
    if (o)
        return !!(t === "innerHTML" || t === "textContent" || t in e && Uh(t) && Te(r));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
        return !1;
    if (t === "width" || t === "height") {
        const i = e.tagName;
        if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
            return !1
    }
    return Uh(t) && ot(r) ? !1 : t in e
}
const Z3 = ["ctrl", "shift", "alt", "meta"]
  , Q3 = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => "button"in e && e.button !== 0,
    middle: e => "button"in e && e.button !== 1,
    right: e => "button"in e && e.button !== 2,
    exact: (e, t) => Z3.some(r => e[`${r}Key`] && !t.includes(r))
}
  , Ci = (e, t) => {
    const r = e._withMods || (e._withMods = {})
      , o = t.join(".");
    return r[o] || (r[o] = (i, ...s) => {
        for (let c = 0; c < t.length; c++) {
            const d = Q3[t[c]];
            if (d && d(i, t))
                return
        }
        return e(i, ...s)
    }
    )
}
  , T_ = Tt({
    patchProp: J3
}, E3);
let Ii, qh = !1;
function eT() {
    return Ii || (Ii = Z4(T_))
}
function tT() {
    return Ii = qh ? Ii : Q4(T_),
    qh = !0,
    Ii
}
const rT = (...e) => {
    const t = eT().createApp(...e)
      , {mount: r} = t;
    return t.mount = o => {
        const i = C_(o);
        if (!i)
            return;
        const s = t._component;
        !Te(s) && !s.render && !s.template && (s.template = i.innerHTML),
        i.nodeType === 1 && (i.textContent = "");
        const c = r(i, !1, S_(i));
        return i instanceof Element && (i.removeAttribute("v-cloak"),
        i.setAttribute("data-v-app", "")),
        c
    }
    ,
    t
}
  , nT = (...e) => {
    const t = tT().createApp(...e)
      , {mount: r} = t;
    return t.mount = o => {
        const i = C_(o);
        if (i)
            return r(i, !0, S_(i))
    }
    ,
    t
}
;
function S_(e) {
    if (e instanceof SVGElement)
        return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement)
        return "mathml"
}
function C_(e) {
    return ot(e) ? document.querySelector(e) : e
}
const oT = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/
  , iT = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/
  , sT = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function aT(e, t) {
    if (e === "__proto__" || e === "constructor" && t && typeof t == "object" && "prototype"in t) {
        lT(e);
        return
    }
    return t
}
function lT(e) {
    `${e}`
}
function Sa(e, t={}) {
    if (typeof e != "string")
        return e;
    const r = e.trim();
    if (e[0] === '"' && e.endsWith('"') && !e.includes("\\"))
        return r.slice(1, -1);
    if (r.length <= 9) {
        const o = r.toLowerCase();
        if (o === "true")
            return !0;
        if (o === "false")
            return !1;
        if (o === "undefined")
            return;
        if (o === "null")
            return null;
        if (o === "nan")
            return Number.NaN;
        if (o === "infinity")
            return Number.POSITIVE_INFINITY;
        if (o === "-infinity")
            return Number.NEGATIVE_INFINITY
    }
    if (!sT.test(e)) {
        if (t.strict)
            throw new SyntaxError("[destr] Invalid JSON");
        return e
    }
    try {
        if (oT.test(e) || iT.test(e)) {
            if (t.strict)
                throw new Error("[destr] Possible prototype pollution");
            return JSON.parse(e, aT)
        }
        return JSON.parse(e)
    } catch (o) {
        if (t.strict)
            throw o;
        return e
    }
}
const cT = /#/g
  , uT = /&/g
  , fT = /\//g
  , dT = /=/g
  , Qf = /\+/g
  , pT = /%5e/gi
  , hT = /%60/gi
  , gT = /%7c/gi
  , _T = /%20/gi;
function mT(e) {
    return encodeURI("" + e).replace(gT, "|")
}
function lf(e) {
    return mT(typeof e == "string" ? e : JSON.stringify(e)).replace(Qf, "%2B").replace(_T, "+").replace(cT, "%23").replace(uT, "%26").replace(hT, "`").replace(pT, "^").replace(fT, "%2F")
}
function Eu(e) {
    return lf(e).replace(dT, "%3D")
}
function P_(e="") {
    try {
        return decodeURIComponent("" + e)
    } catch {
        return "" + e
    }
}
function vT(e) {
    return P_(e.replace(Qf, " "))
}
function yT(e) {
    return P_(e.replace(Qf, " "))
}
function bT(e="") {
    const t = Object.create(null);
    e[0] === "?" && (e = e.slice(1));
    for (const r of e.split("&")) {
        const o = r.match(/([^=]+)=?(.*)/) || [];
        if (o.length < 2)
            continue;
        const i = vT(o[1]);
        if (i === "__proto__" || i === "constructor")
            continue;
        const s = yT(o[2] || "");
        t[i] === void 0 ? t[i] = s : Array.isArray(t[i]) ? t[i].push(s) : t[i] = [t[i], s]
    }
    return t
}
function wT(e, t) {
    return (typeof t == "number" || typeof t == "boolean") && (t = String(t)),
    t ? Array.isArray(t) ? t.map(r => `${Eu(e)}=${lf(r)}`).join("&") : `${Eu(e)}=${lf(t)}` : Eu(e)
}
function A_(e) {
    return Object.keys(e).filter(t => e[t] !== void 0).map(t => wT(t, e[t])).filter(Boolean).join("&")
}
const TT = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/
  , x_ = /^[\s\w\0+.-]{2,}:([/\\]{2})?/
  , ST = /^([/\\]\s*){2,}[^/\\]/
  , CT = /^\.?\//;
function Ua(e, t={}) {
    return typeof t == "boolean" && (t = {
        acceptRelative: t
    }),
    t.strict ? TT.test(e) : x_.test(e) || (t.acceptRelative ? ST.test(e) : !1)
}
function PT(e="", t) {
    return e.endsWith("/")
}
function qa(e="", t) {
    return (PT(e) ? e.slice(0, -1) : e) || "/"
}
function ed(e="", t) {
    return e.endsWith("/") ? e : e + "/"
}
function AT(e="") {
    return e.startsWith("/")
}
function xT(e="") {
    return AT(e) ? e : "/" + e
}
function cf(e, t) {
    if (ET(t) || Ua(e))
        return e;
    const r = qa(t);
    return e.startsWith(r) ? e : RT(r, e)
}
function kT(e, t) {
    const r = td(e)
      , o = {
        ...bT(r.search),
        ...t
    };
    return r.search = A_(o),
    jT(r)
}
function ET(e) {
    return !e || e === "/"
}
function OT(e) {
    return e && e !== "/"
}
function RT(e, ...t) {
    let r = e || "";
    for (const o of t.filter(i => OT(i)))
        if (r) {
            const i = o.replace(CT, "");
            r = ed(r) + i
        } else
            r = o;
    return r
}
function MT(e) {
    return IT(e, "https://")
}
function IT(e, t) {
    let r = e.match(x_);
    return r || (r = e.match(/^\/{2,}/)),
    r ? t + e.slice(r[0].length) : t + e
}
const k_ = Symbol.for("ufo:protocolRelative");
function td(e="", t) {
    const r = e.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
    if (r) {
        const [,l,f=""] = r;
        return {
            protocol: l.toLowerCase(),
            pathname: f,
            href: l + f,
            auth: "",
            host: "",
            search: "",
            hash: ""
        }
    }
    if (!Ua(e, {
        acceptRelative: !0
    }))
        return Kh(e);
    const [,o="",i,s=""] = e.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
    let[,c="",d=""] = s.match(/([^#/?]*)(.*)?/) || [];
    o === "file:" && (d = d.replace(/\/(?=[A-Za-z]:)/, ""));
    const {pathname: h, search: _, hash: g} = Kh(d);
    return {
        protocol: o.toLowerCase(),
        auth: i ? i.slice(0, Math.max(0, i.length - 1)) : "",
        host: c,
        pathname: h,
        search: _,
        hash: g,
        [k_]: !o
    }
}
function Kh(e="") {
    const [t="",r="",o=""] = (e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
    return {
        pathname: t,
        search: r,
        hash: o
    }
}
function jT(e) {
    const t = e.pathname || ""
      , r = e.search ? (e.search.startsWith("?") ? "" : "?") + e.search : ""
      , o = e.hash || ""
      , i = e.auth ? e.auth + "@" : ""
      , s = e.host || "";
    return (e.protocol || e[k_] ? (e.protocol || "") + "//" : "") + i + s + t + r + o
}
class HT extends Error {
    constructor(t, r) {
        super(t, r),
        this.name = "FetchError",
        r?.cause && !this.cause && (this.cause = r.cause)
    }
}
function DT(e) {
    const t = e.error?.message || e.error?.toString() || ""
      , r = e.request?.method || e.options?.method || "GET"
      , o = e.request?.url || String(e.request) || "/"
      , i = `[${r}] ${JSON.stringify(o)}`
      , s = e.response ? `${e.response.status} ${e.response.statusText}` : "<no response>"
      , c = `${i}: ${s}${t ? ` ${t}` : ""}`
      , d = new HT(c,e.error ? {
        cause: e.error
    } : void 0);
    for (const h of ["request", "options", "response"])
        Object.defineProperty(d, h, {
            get() {
                return e[h]
            }
        });
    for (const [h,_] of [["data", "_data"], ["status", "status"], ["statusCode", "status"], ["statusText", "statusText"], ["statusMessage", "statusText"]])
        Object.defineProperty(d, h, {
            get() {
                return e.response && e.response[_]
            }
        });
    return d
}
const LT = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function Wh(e="GET") {
    return LT.has(e.toUpperCase())
}
function BT(e) {
    if (e === void 0)
        return !1;
    const t = typeof e;
    return t === "string" || t === "number" || t === "boolean" || t === null ? !0 : t !== "object" ? !1 : Array.isArray(e) ? !0 : e.buffer ? !1 : e.constructor && e.constructor.name === "Object" || typeof e.toJSON == "function"
}
const NT = new Set(["image/svg", "application/xml", "application/xhtml", "application/html"])
  , FT = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function VT(e="") {
    if (!e)
        return "json";
    const t = e.split(";").shift() || "";
    return FT.test(t) ? "json" : NT.has(t) || t.startsWith("text/") ? "text" : "blob"
}
function $T(e, t, r, o) {
    const i = zT(t?.headers ?? e?.headers, r?.headers, o);
    let s;
    return (r?.query || r?.params || t?.params || t?.query) && (s = {
        ...r?.params,
        ...r?.query,
        ...t?.params,
        ...t?.query
    }),
    {
        ...r,
        ...t,
        query: s,
        params: s,
        headers: i
    }
}
function zT(e, t, r) {
    if (!t)
        return new r(e);
    const o = new r(t);
    if (e)
        for (const [i,s] of Symbol.iterator in e || Array.isArray(e) ? e : new r(e))
            o.set(i, s);
    return o
}
async function Zs(e, t) {
    if (t)
        if (Array.isArray(t))
            for (const r of t)
                await r(e);
        else
            await t(e)
}
const UT = new Set([408, 409, 425, 429, 500, 502, 503, 504])
  , qT = new Set([101, 204, 205, 304]);
function E_(e={}) {
    const {fetch: t=globalThis.fetch, Headers: r=globalThis.Headers, AbortController: o=globalThis.AbortController} = e;
    async function i(d) {
        const h = d.error && d.error.name === "AbortError" && !d.options.timeout || !1;
        if (d.options.retry !== !1 && !h) {
            let g;
            typeof d.options.retry == "number" ? g = d.options.retry : g = Wh(d.options.method) ? 0 : 1;
            const l = d.response && d.response.status || 500;
            if (g > 0 && (Array.isArray(d.options.retryStatusCodes) ? d.options.retryStatusCodes.includes(l) : UT.has(l))) {
                const f = typeof d.options.retryDelay == "function" ? d.options.retryDelay(d) : d.options.retryDelay || 0;
                return f > 0 && await new Promise(p => setTimeout(p, f)),
                s(d.request, {
                    ...d.options,
                    retry: g - 1
                })
            }
        }
        const _ = DT(d);
        throw Error.captureStackTrace && Error.captureStackTrace(_, s),
        _
    }
    const s = async function(h, _={}) {
        const g = {
            request: h,
            options: $T(h, _, e.defaults, r),
            response: void 0,
            error: void 0
        };
        g.options.method && (g.options.method = g.options.method.toUpperCase()),
        g.options.onRequest && await Zs(g, g.options.onRequest),
        typeof g.request == "string" && (g.options.baseURL && (g.request = cf(g.request, g.options.baseURL)),
        g.options.query && (g.request = kT(g.request, g.options.query),
        delete g.options.query),
        "query"in g.options && delete g.options.query,
        "params"in g.options && delete g.options.params),
        g.options.body && Wh(g.options.method) && (BT(g.options.body) ? (g.options.body = typeof g.options.body == "string" ? g.options.body : JSON.stringify(g.options.body),
        g.options.headers = new r(g.options.headers || {}),
        g.options.headers.has("content-type") || g.options.headers.set("content-type", "application/json"),
        g.options.headers.has("accept") || g.options.headers.set("accept", "application/json")) : ("pipeTo"in g.options.body && typeof g.options.body.pipeTo == "function" || typeof g.options.body.pipe == "function") && ("duplex"in g.options || (g.options.duplex = "half")));
        let l;
        if (!g.options.signal && g.options.timeout) {
            const p = new o;
            l = setTimeout( () => {
                const y = new Error("[TimeoutError]: The operation was aborted due to timeout");
                y.name = "TimeoutError",
                y.code = 23,
                p.abort(y)
            }
            , g.options.timeout),
            g.options.signal = p.signal
        }
        try {
            g.response = await t(g.request, g.options)
        } catch (p) {
            return g.error = p,
            g.options.onRequestError && await Zs(g, g.options.onRequestError),
            await i(g)
        } finally {
            l && clearTimeout(l)
        }
        if ((g.response.body || g.response._bodyInit) && !qT.has(g.response.status) && g.options.method !== "HEAD") {
            const p = (g.options.parseResponse ? "json" : g.options.responseType) || VT(g.response.headers.get("content-type") || "");
            switch (p) {
            case "json":
                {
                    const y = await g.response.text()
                      , w = g.options.parseResponse || Sa;
                    g.response._data = w(y);
                    break
                }
            case "stream":
                {
                    g.response._data = g.response.body || g.response._bodyInit;
                    break
                }
            default:
                g.response._data = await g.response[p]()
            }
        }
        return g.options.onResponse && await Zs(g, g.options.onResponse),
        !g.options.ignoreResponseError && g.response.status >= 400 && g.response.status < 600 ? (g.options.onResponseError && await Zs(g, g.options.onResponseError),
        await i(g)) : g.response
    }
      , c = async function(h, _) {
        return (await s(h, _))._data
    };
    return c.raw = s,
    c.native = (...d) => t(...d),
    c.create = (d={}, h={}) => E_({
        ...e,
        ...h,
        defaults: {
            ...e.defaults,
            ...h.defaults,
            ...d
        }
    }),
    c
}
const Ca = function() {
    if (typeof globalThis < "u")
        return globalThis;
    if (typeof self < "u")
        return self;
    if (typeof window < "u")
        return window;
    if (typeof global < "u")
        return global;
    throw new Error("unable to locate global object")
}()
  , KT = Ca.fetch ? (...e) => Ca.fetch(...e) : () => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))
  , WT = Ca.Headers
  , GT = Ca.AbortController
  , XT = E_({
    fetch: KT,
    Headers: WT,
    AbortController: GT
})
  , JT = XT
  , YT = /#/g
  , ZT = /&/g
  , QT = /\//g
  , eS = /=/g
  , rd = /\+/g
  , tS = /%5e/gi
  , rS = /%60/gi
  , nS = /%7c/gi
  , oS = /%20/gi;
function iS(e) {
    return encodeURI("" + e).replace(nS, "|")
}
function uf(e) {
    return iS(typeof e == "string" ? e : JSON.stringify(e)).replace(rd, "%2B").replace(oS, "+").replace(YT, "%23").replace(ZT, "%26").replace(rS, "`").replace(tS, "^").replace(QT, "%2F")
}
function Ou(e) {
    return uf(e).replace(eS, "%3D")
}
function Pa(e="") {
    try {
        return decodeURIComponent("" + e)
    } catch {
        return "" + e
    }
}
function sS(e) {
    return Pa(e.replace(rd, " "))
}
function aS(e) {
    return Pa(e.replace(rd, " "))
}
function nd(e="") {
    const t = {};
    e[0] === "?" && (e = e.slice(1));
    for (const r of e.split("&")) {
        const o = r.match(/([^=]+)=?(.*)/) || [];
        if (o.length < 2)
            continue;
        const i = sS(o[1]);
        if (i === "__proto__" || i === "constructor")
            continue;
        const s = aS(o[2] || "");
        t[i] === void 0 ? t[i] = s : Array.isArray(t[i]) ? t[i].push(s) : t[i] = [t[i], s]
    }
    return t
}
function lS(e, t) {
    return (typeof t == "number" || typeof t == "boolean") && (t = String(t)),
    t ? Array.isArray(t) ? t.map(r => `${Ou(e)}=${uf(r)}`).join("&") : `${Ou(e)}=${uf(t)}` : Ou(e)
}
function cS(e) {
    return Object.keys(e).filter(t => e[t] !== void 0).map(t => lS(t, e[t])).filter(Boolean).join("&")
}
const uS = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/
  , fS = /^[\s\w\0+.-]{2,}:([/\\]{2})?/
  , dS = /^([/\\]\s*){2,}[^/\\]/
  , pS = /^[\s\0]*(blob|data|javascript|vbscript):$/i
  , hS = /\/$|\/\?|\/#/
  , gS = /^\.?\//;
function mn(e, t={}) {
    return typeof t == "boolean" && (t = {
        acceptRelative: t
    }),
    t.strict ? uS.test(e) : fS.test(e) || (t.acceptRelative ? dS.test(e) : !1)
}
function _S(e) {
    return !!e && pS.test(e)
}
function ff(e="", t) {
    return t ? hS.test(e) : e.endsWith("/")
}
function od(e="", t) {
    if (!t)
        return (ff(e) ? e.slice(0, -1) : e) || "/";
    if (!ff(e, !0))
        return e || "/";
    let r = e
      , o = "";
    const i = e.indexOf("#");
    i >= 0 && (r = e.slice(0, i),
    o = e.slice(i));
    const [s,...c] = r.split("?");
    return ((s.endsWith("/") ? s.slice(0, -1) : s) || "/") + (c.length > 0 ? `?${c.join("?")}` : "") + o
}
function Aa(e="", t) {
    if (!t)
        return e.endsWith("/") ? e : e + "/";
    if (ff(e, !0))
        return e || "/";
    let r = e
      , o = "";
    const i = e.indexOf("#");
    if (i >= 0 && (r = e.slice(0, i),
    o = e.slice(i),
    !r))
        return o;
    const [s,...c] = r.split("?");
    return s + "/" + (c.length > 0 ? `?${c.join("?")}` : "") + o
}
function mS(e="") {
    return e.startsWith("/")
}
function Gh(e="") {
    return mS(e) ? e : "/" + e
}
function Xh(e, t) {
    if (yS(t))
        return e;
    const r = od(t);
    if (!e.startsWith(r))
        return e;
    const o = e.slice(r.length);
    return o[0] === "/" ? o : "/" + o
}
function vS(e, t) {
    const r = sd(e)
      , o = {
        ...nd(r.search),
        ...t
    };
    return r.search = cS(o),
    TS(r)
}
function yS(e) {
    return !e || e === "/"
}
function bS(e) {
    return e && e !== "/"
}
function id(e, ...t) {
    let r = e || "";
    for (const o of t.filter(i => bS(i)))
        if (r) {
            const i = o.replace(gS, "");
            r = Aa(r) + i
        } else
            r = o;
    return r
}
function O_(...e) {
    const t = /\/(?!\/)/
      , r = e.filter(Boolean)
      , o = [];
    let i = 0;
    for (const c of r)
        if (!(!c || c === "/")) {
            for (const [d,h] of c.split(t).entries())
                if (!(!h || h === ".")) {
                    if (h === "..") {
                        if (o.length === 1 && mn(o[0]))
                            continue;
                        o.pop(),
                        i--;
                        continue
                    }
                    if (d === 1 && o[o.length - 1]?.endsWith(":/")) {
                        o[o.length - 1] += "/" + h;
                        continue
                    }
                    o.push(h),
                    i++
                }
        }
    let s = o.join("/");
    return i >= 0 ? r[0]?.startsWith("/") && !s.startsWith("/") ? s = "/" + s : r[0]?.startsWith("./") && !s.startsWith("./") && (s = "./" + s) : s = "../".repeat(-1 * i) + s,
    r[r.length - 1]?.endsWith("/") && !s.endsWith("/") && (s += "/"),
    s
}
function wS(e, t, r={}) {
    return r.trailingSlash || (e = Aa(e),
    t = Aa(t)),
    r.leadingSlash || (e = Gh(e),
    t = Gh(t)),
    r.encoding || (e = Pa(e),
    t = Pa(t)),
    e === t
}
const R_ = Symbol.for("ufo:protocolRelative");
function sd(e="", t) {
    const r = e.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
    if (r) {
        const [,l,f=""] = r;
        return {
            protocol: l.toLowerCase(),
            pathname: f,
            href: l + f,
            auth: "",
            host: "",
            search: "",
            hash: ""
        }
    }
    if (!mn(e, {
        acceptRelative: !0
    }))
        return t ? sd(t + e) : Jh(e);
    const [,o="",i,s=""] = e.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
    let[,c="",d=""] = s.match(/([^#/?]*)(.*)?/) || [];
    o === "file:" && (d = d.replace(/\/(?=[A-Za-z]:)/, ""));
    const {pathname: h, search: _, hash: g} = Jh(d);
    return {
        protocol: o.toLowerCase(),
        auth: i ? i.slice(0, Math.max(0, i.length - 1)) : "",
        host: c,
        pathname: h,
        search: _,
        hash: g,
        [R_]: !o
    }
}
function Jh(e="") {
    const [t="",r="",o=""] = (e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
    return {
        pathname: t,
        search: r,
        hash: o
    }
}
function TS(e) {
    const t = e.pathname || ""
      , r = e.search ? (e.search.startsWith("?") ? "" : "?") + e.search : ""
      , o = e.hash || ""
      , i = e.auth ? e.auth + "@" : ""
      , s = e.host || "";
    return (e.protocol || e[R_] ? (e.protocol || "") + "//" : "") + i + s + t + r + o
}
const SS = () => window?.__NUXT__?.config || {}
  , xa = SS().app
  , CS = () => xa.baseURL
  , PS = () => xa.buildAssetsDir
  , ad = (...e) => O_(M_(), PS(), ...e)
  , M_ = (...e) => {
    const t = xa.cdnURL || xa.baseURL;
    return e.length ? O_(t, ...e) : t
}
;
globalThis.__buildAssetsURL = ad,
globalThis.__publicAssetsURL = M_;
globalThis.$fetch || (globalThis.$fetch = JT.create({
    baseURL: CS()
}));
function df(e, t={}, r) {
    for (const o in e) {
        const i = e[o]
          , s = r ? `${r}:${o}` : o;
        typeof i == "object" && i !== null ? df(i, t, s) : typeof i == "function" && (t[s] = i)
    }
    return t
}
const AS = {
    run: e => e()
}
  , xS = () => AS
  , I_ = typeof console.createTask < "u" ? console.createTask : xS;
function kS(e, t) {
    const r = t.shift()
      , o = I_(r);
    return e.reduce( (i, s) => i.then( () => o.run( () => s(...t))), Promise.resolve())
}
function ES(e, t) {
    const r = t.shift()
      , o = I_(r);
    return Promise.all(e.map(i => o.run( () => i(...t))))
}
function Ru(e, t) {
    for (const r of [...e])
        r(t)
}
class OS {
    constructor() {
        this._hooks = {},
        this._before = void 0,
        this._after = void 0,
        this._deprecatedMessages = void 0,
        this._deprecatedHooks = {},
        this.hook = this.hook.bind(this),
        this.callHook = this.callHook.bind(this),
        this.callHookWith = this.callHookWith.bind(this)
    }
    hook(t, r, o={}) {
        if (!t || typeof r != "function")
            return () => {}
            ;
        const i = t;
        let s;
        for (; this._deprecatedHooks[t]; )
            s = this._deprecatedHooks[t],
            t = s.to;
        if (s && !o.allowDeprecated) {
            let c = s.message;
            c || (c = `${i} hook has been deprecated` + (s.to ? `, please use ${s.to}` : "")),
            this._deprecatedMessages || (this._deprecatedMessages = new Set),
            this._deprecatedMessages.has(c) || this._deprecatedMessages.add(c)
        }
        if (!r.name)
            try {
                Object.defineProperty(r, "name", {
                    get: () => "_" + t.replace(/\W+/g, "_") + "_hook_cb",
                    configurable: !0
                })
            } catch {}
        return this._hooks[t] = this._hooks[t] || [],
        this._hooks[t].push(r),
        () => {
            r && (this.removeHook(t, r),
            r = void 0)
        }
    }
    hookOnce(t, r) {
        let o, i = (...s) => (typeof o == "function" && o(),
        o = void 0,
        i = void 0,
        r(...s));
        return o = this.hook(t, i),
        o
    }
    removeHook(t, r) {
        if (this._hooks[t]) {
            const o = this._hooks[t].indexOf(r);
            o !== -1 && this._hooks[t].splice(o, 1),
            this._hooks[t].length === 0 && delete this._hooks[t]
        }
    }
    deprecateHook(t, r) {
        this._deprecatedHooks[t] = typeof r == "string" ? {
            to: r
        } : r;
        const o = this._hooks[t] || [];
        delete this._hooks[t];
        for (const i of o)
            this.hook(t, i)
    }
    deprecateHooks(t) {
        Object.assign(this._deprecatedHooks, t);
        for (const r in t)
            this.deprecateHook(r, t[r])
    }
    addHooks(t) {
        const r = df(t)
          , o = Object.keys(r).map(i => this.hook(i, r[i]));
        return () => {
            for (const i of o.splice(0, o.length))
                i()
        }
    }
    removeHooks(t) {
        const r = df(t);
        for (const o in r)
            this.removeHook(o, r[o])
    }
    removeAllHooks() {
        for (const t in this._hooks)
            delete this._hooks[t]
    }
    callHook(t, ...r) {
        return r.unshift(t),
        this.callHookWith(kS, t, ...r)
    }
    callHookParallel(t, ...r) {
        return r.unshift(t),
        this.callHookWith(ES, t, ...r)
    }
    callHookWith(t, r, ...o) {
        const i = this._before || this._after ? {
            name: r,
            args: o,
            context: {}
        } : void 0;
        this._before && Ru(this._before, i);
        const s = t(r in this._hooks ? [...this._hooks[r]] : [], o);
        return s instanceof Promise ? s.finally( () => {
            this._after && i && Ru(this._after, i)
        }
        ) : (this._after && i && Ru(this._after, i),
        s)
    }
    beforeEach(t) {
        return this._before = this._before || [],
        this._before.push(t),
        () => {
            if (this._before !== void 0) {
                const r = this._before.indexOf(t);
                r !== -1 && this._before.splice(r, 1)
            }
        }
    }
    afterEach(t) {
        return this._after = this._after || [],
        this._after.push(t),
        () => {
            if (this._after !== void 0) {
                const r = this._after.indexOf(t);
                r !== -1 && this._after.splice(r, 1)
            }
        }
    }
}
function j_() {
    return new OS
}
function RS(e={}) {
    let t, r = !1;
    const o = c => {
        if (t && t !== c)
            throw new Error("Context conflict")
    }
    ;
    let i;
    if (e.asyncContext) {
        const c = e.AsyncLocalStorage || globalThis.AsyncLocalStorage;
        c && (i = new c)
    }
    const s = () => {
        if (i) {
            const c = i.getStore();
            if (c !== void 0)
                return c
        }
        return t
    }
    ;
    return {
        use: () => {
            const c = s();
            if (c === void 0)
                throw new Error("Context is not available");
            return c
        }
        ,
        tryUse: () => s(),
        set: (c, d) => {
            d || o(c),
            t = c,
            r = !0
        }
        ,
        unset: () => {
            t = void 0,
            r = !1
        }
        ,
        call: (c, d) => {
            o(c),
            t = c;
            try {
                return i ? i.run(c, d) : d()
            } finally {
                r || (t = void 0)
            }
        }
        ,
        async callAsync(c, d) {
            t = c;
            const h = () => {
                t = c
            }
              , _ = () => t === c ? h : void 0;
            pf.add(_);
            try {
                const g = i ? i.run(c, d) : d();
                return r || (t = void 0),
                await g
            } finally {
                pf.delete(_)
            }
        }
    }
}
function MS(e={}) {
    const t = {};
    return {
        get(r, o={}) {
            return t[r] || (t[r] = RS({
                ...e,
                ...o
            })),
            t[r]
        }
    }
}
const ka = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof global < "u" ? global : typeof window < "u" ? window : {}
  , Yh = "__unctx__"
  , IS = ka[Yh] || (ka[Yh] = MS())
  , jS = (e, t={}) => IS.get(e, t)
  , Zh = "__unctx_async_handlers__"
  , pf = ka[Zh] || (ka[Zh] = new Set);
function Lo(e) {
    const t = [];
    for (const i of pf) {
        const s = i();
        s && t.push(s)
    }
    const r = () => {
        for (const i of t)
            i()
    }
    ;
    let o = e();
    return o && typeof o == "object" && "catch"in o && (o = o.catch(i => {
        throw r(),
        i
    }
    )),
    [o, r]
}
const hf = !1
  , HS = !1
  , DS = {
    componentName: "NuxtLink",
    prefetch: !0,
    prefetchOn: {
        visibility: !0
    }
}
  , Oo = {
    value: null,
    errorValue: null,
    deep: !0
}
  , LS = null
  , BS = {}
  , NS = "#__nuxt"
  , H_ = "dverso studio - Web Design & Development"
  , Qh = 36e5
  , FS = "vite:preloadError";
function D_(e=H_) {
    return jS(e, {
        asyncContext: !1
    })
}
const VS = "__nuxt_plugin";
function $S(e) {
    let t = 0;
    const r = {
        _id: e.id || H_ || "nuxt-app",
        _scope: U6(),
        provide: void 0,
        globalName: "nuxt",
        versions: {
            get nuxt() {
                return "3.16.0"
            },
            get vue() {
                return r.vueApp.version
            }
        },
        payload: zr({
            ...e.ssrContext?.payload || {},
            data: zr({}),
            state: Ar({}),
            once: new Set,
            _errors: zr({})
        }),
        static: {
            data: {}
        },
        runWithContext(i) {
            return r._scope.active && !Lf() ? r._scope.run( () => e0(r, i)) : e0(r, i)
        },
        isHydrating: !0,
        deferHydration() {
            if (!r.isHydrating)
                return () => {}
                ;
            t++;
            let i = !1;
            return () => {
                if (!i && (i = !0,
                t--,
                t === 0))
                    return r.isHydrating = !1,
                    r.callHook("app:suspense:resolve")
            }
        },
        _asyncDataPromises: {},
        _asyncData: zr({}),
        _payloadRevivers: {},
        ...e
    };
    {
        const i = window.__NUXT__;
        if (i)
            for (const s in i)
                switch (s) {
                case "data":
                case "state":
                case "_errors":
                    Object.assign(r.payload[s], i[s]);
                    break;
                default:
                    r.payload[s] = i[s]
                }
    }
    r.hooks = j_(),
    r.hook = r.hooks.hook,
    r.callHook = r.hooks.callHook,
    r.provide = (i, s) => {
        const c = "$" + i;
        Qs(r, c, s),
        Qs(r.vueApp.config.globalProperties, c, s)
    }
    ,
    Qs(r.vueApp, "$nuxt", r),
    Qs(r.vueApp.config.globalProperties, "$nuxt", r);
    {
        window.addEventListener(FS, s => {
            r.callHook("app:chunkError", {
                error: s.payload
            }),
            (r.isHydrating || s.payload.message.includes("Unable to preload CSS")) && s.preventDefault()
        }
        ),
        window.useNuxtApp ||= Ke;
        const i = r.hook("app:error", (...s) => {
            [...s]
        }
        );
        r.hook("app:mounted", i)
    }
    const o = r.payload.config;
    return r.provide("config", o),
    r
}
function zS(e, t) {
    t.hooks && e.hooks.addHooks(t.hooks)
}
async function US(e, t) {
    if (typeof t == "function") {
        const {provide: r} = await e.runWithContext( () => t(e)) || {};
        if (r && typeof r == "object")
            for (const o in r)
                e.provide(o, r[o])
    }
}
async function qS(e, t) {
    const r = []
      , o = []
      , i = []
      , s = [];
    let c = 0;
    async function d(h) {
        const _ = h.dependsOn?.filter(g => t.some(l => l._name === g) && !r.includes(g)) ?? [];
        if (_.length > 0)
            o.push([new Set(_), h]);
        else {
            const g = US(e, h).then(async () => {
                h._name && (r.push(h._name),
                await Promise.all(o.map(async ([l,f]) => {
                    l.has(h._name) && (l.delete(h._name),
                    l.size === 0 && (c++,
                    await d(f)))
                }
                )))
            }
            );
            h.parallel ? i.push(g.catch(l => s.push(l))) : await g
        }
    }
    for (const h of t)
        zS(e, h);
    for (const h of t)
        await d(h);
    if (await Promise.all(i),
    c)
        for (let h = 0; h < c; h++)
            await Promise.all(i);
    if (s.length)
        throw s[0]
}
function $t(e) {
    if (typeof e == "function")
        return e;
    const t = e._name || e.name;
    return delete e.name,
    Object.assign(e.setup || ( () => {}
    ), e, {
        [VS]: !0,
        _name: t
    })
}
function e0(e, t, r) {
    const o = () => t();
    return D_(e._id).set(e),
    e.vueApp.runWithContext(o)
}
function L_(e) {
    let t;
    return Va() && (t = Zi()?.appContext.app.$nuxt),
    t ||= D_(e).tryUse(),
    t || null
}
function Ke(e) {
    const t = L_(e);
    if (!t)
        throw new Error("[nuxt] instance unavailable");
    return t
}
function oo(e) {
    return Ke().$config
}
function Qs(e, t, r) {
    Object.defineProperty(e, t, {
        get: () => r
    })
}
function KS(e, t) {
    return {
        ctx: {
            table: e
        },
        matchAll: r => N_(r, e)
    }
}
function B_(e) {
    const t = {};
    for (const r in e)
        t[r] = r === "dynamic" ? new Map(Object.entries(e[r]).map( ([o,i]) => [o, B_(i)])) : new Map(Object.entries(e[r]));
    return t
}
function WS(e) {
    return KS(B_(e))
}
function N_(e, t, r) {
    e.endsWith("/") && (e = e.slice(0, -1) || "/");
    const o = [];
    for (const [s,c] of t0(t.wildcard))
        (e === s || e.startsWith(s + "/")) && o.push(c);
    for (const [s,c] of t0(t.dynamic))
        if (e.startsWith(s + "/")) {
            const d = "/" + e.slice(s.length).split("/").splice(2).join("/");
            o.push(...N_(d, c))
        }
    const i = t.static.get(e);
    return i && o.push(i),
    o.filter(Boolean)
}
function t0(e) {
    return [...e.entries()].sort( (t, r) => t[0].length - r[0].length)
}
function Mu(e) {
    if (e === null || typeof e != "object")
        return !1;
    const t = Object.getPrototypeOf(e);
    return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0
}
function gf(e, t, r=".", o) {
    if (!Mu(t))
        return gf(e, {}, r, o);
    const i = Object.assign({}, t);
    for (const s in e) {
        if (s === "__proto__" || s === "constructor")
            continue;
        const c = e[s];
        c != null && (o && o(i, s, c, r) || (Array.isArray(c) && Array.isArray(i[s]) ? i[s] = [...c, ...i[s]] : Mu(c) && Mu(i[s]) ? i[s] = gf(c, i[s], (r ? `${r}.` : "") + s.toString(), o) : i[s] = c))
    }
    return i
}
function GS(e) {
    return (...t) => t.reduce( (r, o) => gf(r, o, "", e), {})
}
const ld = GS();
function XS(e, t) {
    try {
        return t in e
    } catch {
        return !1
    }
}
class r0 extends Error {
    static __h3_error__ = !0;
    statusCode = 500;
    fatal = !1;
    unhandled = !1;
    statusMessage;
    data;
    cause;
    constructor(t, r={}) {
        super(t, r),
        r.cause && !this.cause && (this.cause = r.cause)
    }
    toJSON() {
        const t = {
            message: this.message,
            statusCode: mf(this.statusCode, 500)
        };
        return this.statusMessage && (t.statusMessage = F_(this.statusMessage)),
        this.data !== void 0 && (t.data = this.data),
        t
    }
}
function _f(e) {
    if (typeof e == "string")
        return new r0(e);
    if (JS(e))
        return e;
    const t = new r0(e.message ?? e.statusMessage ?? "",{
        cause: e.cause || e
    });
    if (XS(e, "stack"))
        try {
            Object.defineProperty(t, "stack", {
                get() {
                    return e.stack
                }
            })
        } catch {
            try {
                t.stack = e.stack
            } catch {}
        }
    if (e.data && (t.data = e.data),
    e.statusCode ? t.statusCode = mf(e.statusCode, t.statusCode) : e.status && (t.statusCode = mf(e.status, t.statusCode)),
    e.statusMessage ? t.statusMessage = e.statusMessage : e.statusText && (t.statusMessage = e.statusText),
    t.statusMessage) {
        const r = t.statusMessage
          , o = F_(t.statusMessage)
    }
    return e.fatal !== void 0 && (t.fatal = e.fatal),
    e.unhandled !== void 0 && (t.unhandled = e.unhandled),
    t
}
function JS(e) {
    return e?.constructor?.__h3_error__ === !0
}
const YS = /[^\u0009\u0020-\u007E]/g;
function F_(e="") {
    return e.replace(YS, "")
}
function mf(e, t=200) {
    return !e || (typeof e == "string" && (e = Number.parseInt(e, 10)),
    e < 100 || e > 999) ? t : e
}
const ZS = Symbol("layout-meta")
  , Wo = Symbol("route")
  , Jt = () => Ke()?.$router
  , Ka = () => Va() ? Xt(Wo, Ke()._route) : Ke()._route;
const QS = () => {
    try {
        if (Ke()._processingMiddleware)
            return !0
    } catch {
        return !1
    }
    return !1
}
  , eC = (e, t) => {
    e ||= "/";
    const r = typeof e == "string" ? e : "path"in e ? vf(e) : Jt().resolve(e).href;
    if (t?.open) {
        const {target: h="_blank", windowFeatures: _={}} = t.open
          , g = Object.entries(_).filter( ([l,f]) => f !== void 0).map( ([l,f]) => `${l.toLowerCase()}=${f}`).join(", ");
        return open(r, h, g),
        Promise.resolve()
    }
    const o = mn(r, {
        acceptRelative: !0
    })
      , i = t?.external || o;
    if (i) {
        if (!t?.external)
            throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
        const {protocol: h} = new URL(r,window.location.href);
        if (h && _S(h))
            throw new Error(`Cannot navigate to a URL with '${h}' protocol.`)
    }
    const s = QS();
    if (!i && s) {
        if (t?.replace) {
            if (typeof e == "string") {
                const {pathname: h, search: _, hash: g} = sd(e);
                return {
                    path: h,
                    ..._ && {
                        query: nd(_)
                    },
                    ...g && {
                        hash: g
                    },
                    replace: !0
                }
            }
            return {
                ...e,
                replace: !0
            }
        }
        return e
    }
    const c = Jt()
      , d = Ke();
    return i ? (d._scope.stop(),
    t?.replace ? location.replace(r) : location.href = r,
    s ? d.isHydrating ? new Promise( () => {}
    ) : !1 : Promise.resolve()) : t?.replace ? c.replace(e) : c.push(e)
}
;
function vf(e) {
    return vS(e.path || "", e.query || {}) + (e.hash || "")
}
const V_ = "__nuxt_error"
  , Go = () => qf(Ke().payload, "error")
  , Ro = e => {
    const t = es(e);
    try {
        const r = Ke()
          , o = Go();
        r.hooks.callHook("app:error", t),
        o.value ||= t
    } catch {
        throw t
    }
    return t
}
  , tC = async (e={}) => {
    const t = Ke()
      , r = Go();
    t.callHook("app:error:cleared", e),
    e.redirect && await Jt().replace(e.redirect),
    r.value = LS
}
  , rC = e => !!e && typeof e == "object" && V_ in e
  , es = e => {
    const t = _f(e);
    return Object.defineProperty(t, V_, {
        value: !0,
        configurable: !1,
        writable: !1
    }),
    t
}
;
function n0(e) {
    const t = oC(e)
      , r = new ArrayBuffer(t.length)
      , o = new DataView(r);
    for (let i = 0; i < r.byteLength; i++)
        o.setUint8(i, t.charCodeAt(i));
    return r
}
const nC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function oC(e) {
    e.length % 4 === 0 && (e = e.replace(/==?$/, ""));
    let t = ""
      , r = 0
      , o = 0;
    for (let i = 0; i < e.length; i++)
        r <<= 6,
        r |= nC.indexOf(e[i]),
        o += 6,
        o === 24 && (t += String.fromCharCode((r & 16711680) >> 16),
        t += String.fromCharCode((r & 65280) >> 8),
        t += String.fromCharCode(r & 255),
        r = o = 0);
    return o === 12 ? (r >>= 4,
    t += String.fromCharCode(r)) : o === 18 && (r >>= 2,
    t += String.fromCharCode((r & 65280) >> 8),
    t += String.fromCharCode(r & 255)),
    t
}
const iC = -1
  , sC = -2
  , aC = -3
  , lC = -4
  , cC = -5
  , uC = -6;
function fC(e, t) {
    return dC(JSON.parse(e), t)
}
function dC(e, t) {
    if (typeof e == "number")
        return i(e, !0);
    if (!Array.isArray(e) || e.length === 0)
        throw new Error("Invalid input");
    const r = e
      , o = Array(r.length);
    function i(s, c=!1) {
        if (s === iC)
            return;
        if (s === aC)
            return NaN;
        if (s === lC)
            return 1 / 0;
        if (s === cC)
            return -1 / 0;
        if (s === uC)
            return -0;
        if (c)
            throw new Error("Invalid input");
        if (s in o)
            return o[s];
        const d = r[s];
        if (!d || typeof d != "object")
            o[s] = d;
        else if (Array.isArray(d))
            if (typeof d[0] == "string") {
                const h = d[0]
                  , _ = t?.[h];
                if (_)
                    return o[s] = _(i(d[1]));
                switch (h) {
                case "Date":
                    o[s] = new Date(d[1]);
                    break;
                case "Set":
                    const g = new Set;
                    o[s] = g;
                    for (let p = 1; p < d.length; p += 1)
                        g.add(i(d[p]));
                    break;
                case "Map":
                    const l = new Map;
                    o[s] = l;
                    for (let p = 1; p < d.length; p += 2)
                        l.set(i(d[p]), i(d[p + 1]));
                    break;
                case "RegExp":
                    o[s] = new RegExp(d[1],d[2]);
                    break;
                case "Object":
                    o[s] = Object(d[1]);
                    break;
                case "BigInt":
                    o[s] = BigInt(d[1]);
                    break;
                case "null":
                    const f = Object.create(null);
                    o[s] = f;
                    for (let p = 1; p < d.length; p += 2)
                        f[d[p]] = i(d[p + 1]);
                    break;
                case "Int8Array":
                case "Uint8Array":
                case "Uint8ClampedArray":
                case "Int16Array":
                case "Uint16Array":
                case "Int32Array":
                case "Uint32Array":
                case "Float32Array":
                case "Float64Array":
                case "BigInt64Array":
                case "BigUint64Array":
                    {
                        const p = globalThis[h]
                          , y = d[1]
                          , w = n0(y)
                          , x = new p(w);
                        o[s] = x;
                        break
                    }
                case "ArrayBuffer":
                    {
                        const p = d[1]
                          , y = n0(p);
                        o[s] = y;
                        break
                    }
                default:
                    throw new Error(`Unknown type ${h}`)
                }
            } else {
                const h = new Array(d.length);
                o[s] = h;
                for (let _ = 0; _ < d.length; _ += 1) {
                    const g = d[_];
                    g !== sC && (h[_] = i(g))
                }
            }
        else {
            const h = {};
            o[s] = h;
            for (const _ in d) {
                const g = d[_];
                h[_] = i(g)
            }
        }
        return o[s]
    }
    return i(0)
}
const pC = new Set(["link", "style", "script", "noscript"])
  , hC = new Set(["title", "titleTemplate", "script", "style", "noscript"])
  , o0 = new Set(["base", "meta", "link", "style", "script", "noscript"])
  , gC = new Set(["title", "base", "htmlAttrs", "bodyAttrs", "meta", "link", "style", "script", "noscript"])
  , _C = new Set(["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"])
  , mC = new Set(["key", "tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent", "processTemplateParams"])
  , vC = new Set(["templateParams", "htmlAttrs", "bodyAttrs"])
  , cd = new Set(["theme-color", "google-site-verification", "og", "article", "book", "profile", "twitter", "author"])
  , $i = {
    META: new Set(["twitter"]),
    OG: new Set(["og", "book", "article", "profile", "fb"]),
    MEDIA: new Set(["ogImage", "ogVideo", "ogAudio", "twitterImage"]),
    HTTP_EQUIV: new Set(["contentType", "defaultStyle", "xUaCompatible"])
}
  , yC = {
    articleExpirationTime: "article:expiration_time",
    articleModifiedTime: "article:modified_time",
    articlePublishedTime: "article:published_time",
    bookReleaseDate: "book:release_date",
    fbAppId: "fb:app_id",
    ogAudioSecureUrl: "og:audio:secure_url",
    ogAudioUrl: "og:audio",
    ogImageSecureUrl: "og:image:secure_url",
    ogImageUrl: "og:image",
    ogSiteName: "og:site_name",
    ogVideoSecureUrl: "og:video:secure_url",
    ogVideoUrl: "og:video",
    profileFirstName: "profile:first_name",
    profileLastName: "profile:last_name",
    profileUsername: "profile:username",
    msapplicationConfig: "msapplication-Config",
    msapplicationTileColor: "msapplication-TileColor",
    msapplicationTileImage: "msapplication-TileImage"
}
  , $_ = {
    appleItunesApp: {
        unpack: {
            entrySeparator: ", ",
            resolve: ({key: e, value: t}) => `${Ur(e)}=${t}`
        }
    },
    refresh: {
        metaKey: "http-equiv",
        unpack: {
            entrySeparator: ";",
            resolve: ({key: e, value: t}) => e === "seconds" ? `${t}` : void 0
        }
    },
    robots: {
        unpack: {
            entrySeparator: ", ",
            resolve: ({key: e, value: t}) => typeof t == "boolean" ? Ur(e) : `${Ur(e)}:${t}`
        }
    },
    contentSecurityPolicy: {
        metaKey: "http-equiv",
        unpack: {
            entrySeparator: "; ",
            resolve: ({key: e, value: t}) => `${Ur(e)} ${t}`
        }
    },
    charset: {}
};
function Ur(e) {
    const t = e.replace(/([A-Z])/g, "-$1").toLowerCase()
      , r = t.indexOf("-");
    return r === -1 ? t : $i.META.has(t.slice(0, r)) || $i.OG.has(t.slice(0, r)) ? e.replace(/([A-Z])/g, ":$1").toLowerCase() : t
}
function z_(e) {
    return Object.fromEntries(Object.entries(e).filter( ([t,r]) => String(r) !== "false" && t))
}
function yf(e) {
    return Array.isArray(e) ? e.map(yf) : !e || typeof e != "object" ? e : Object.fromEntries(Object.entries(e).map( ([t,r]) => [Ur(t), yf(r)]))
}
function U_(e, t={}) {
    const {entrySeparator: r="", keyValueSeparator: o="", wrapValue: i, resolve: s} = t;
    return Object.entries(e).map( ([c,d]) => {
        if (s) {
            const _ = s({
                key: c,
                value: d
            });
            if (_ !== void 0)
                return _
        }
        const h = typeof d == "object" ? U_(d, t) : typeof d == "number" ? d.toString() : typeof d == "string" && i ? `${i}${d.replace(new RegExp(i,"g"), `\\${i}`)}${i}` : d;
        return `${c}${o}${h}`
    }
    ).join(r)
}
function i0(e, t) {
    const r = z_(t)
      , o = Ur(e)
      , i = q_(o);
    if (!cd.has(o))
        return [{
            [i]: o,
            ...r
        }];
    const s = Object.fromEntries(Object.entries(r).map( ([c,d]) => [`${e}${c === "url" ? "" : `${c[0].toUpperCase()}${c.slice(1)}`}`, d]));
    return Ea(s || {}).sort( (c, d) => (c[i]?.length || 0) - (d[i]?.length || 0))
}
function q_(e) {
    if ($_[e]?.metaKey === "http-equiv" || $i.HTTP_EQUIV.has(e))
        return "http-equiv";
    const t = Ur(e)
      , r = t.indexOf(":");
    return r === -1 ? "name" : $i.OG.has(t.slice(0, r)) ? "property" : "name"
}
function bC(e) {
    return yC[e] || Ur(e)
}
function wC(e, t) {
    return t === "refresh" ? `${e.seconds};url=${e.url}` : U_(yf(e), {
        keyValueSeparator: "=",
        entrySeparator: ", ",
        resolve: ({value: r, key: o}) => r === null ? "" : typeof r == "boolean" ? o : void 0,
        ...$_[t]?.unpack
    })
}
function Ea(e) {
    const t = []
      , r = {};
    for (const [i,s] of Object.entries(e)) {
        if (Array.isArray(s)) {
            if (i === "themeColor") {
                s.forEach(c => {
                    typeof c == "object" && c !== null && t.push({
                        name: "theme-color",
                        ...c
                    })
                }
                );
                continue
            }
            for (const c of s)
                if (typeof c == "object" && c !== null) {
                    const d = []
                      , h = [];
                    for (const [_,g] of Object.entries(c)) {
                        const l = `${i}${_ === "url" ? "" : `:${_}`}`
                          , f = Ea({
                            [l]: g
                        });
                        (_ === "url" ? d : h).push(...f)
                    }
                    t.push(...d, ...h)
                } else
                    t.push(...typeof c == "string" ? Ea({
                        [i]: c
                    }) : i0(i, c));
            continue
        }
        if (typeof s == "object" && s)
            if ($i.MEDIA.has(i)) {
                const c = i.startsWith("twitter") ? "twitter" : "og"
                  , d = i.replace(/^(og|twitter)/, "").toLowerCase()
                  , h = c === "twitter" ? "name" : "property";
                s.url && t.push({
                    [h]: `${c}:${d}`,
                    content: s.url
                }),
                s.secureUrl && t.push({
                    [h]: `${c}:${d}:secure_url`,
                    content: s.secureUrl
                });
                for (const [_,g] of Object.entries(s))
                    _ !== "url" && _ !== "secureUrl" && t.push({
                        [h]: `${c}:${d}:${_}`,
                        content: g
                    })
            } else
                cd.has(Ur(i)) ? t.push(...i0(i, s)) : r[i] = z_(s);
        else
            r[i] = s
    }
    const o = Object.entries(r).map( ([i,s]) => {
        if (i === "charset")
            return {
                charset: s === null ? "_null" : s
            };
        const c = q_(i)
          , d = bC(i)
          , h = s === null ? "_null" : typeof s == "object" ? wC(s, i) : typeof s == "number" ? s.toString() : s;
        return c === "http-equiv" ? {
            "http-equiv": d,
            content: h
        } : {
            [c]: d,
            content: h
        }
    }
    );
    return [...t, ...o].map(i => "content"in i && i.content === "_null" ? {
        ...i,
        content: null
    } : i)
}
const TC = {
    key: "flatMeta",
    hooks: {
        "entries:normalize": e => {
            const t = [];
            e.tags = e.tags.map(r => r.tag !== "_flatMeta" ? r : (t.push(Ea(r.props).map(o => ({
                ...r,
                tag: "meta",
                props: o
            }))),
            !1)).filter(Boolean).concat(...t)
        }
    }
}
  , SC = ["name", "property", "http-equiv"];
function K_(e) {
    const t = e.split(":")[1];
    return cd.has(t)
}
function bf(e) {
    const {props: t, tag: r} = e;
    if (_C.has(r))
        return r;
    if (r === "link" && t.rel === "canonical")
        return "canonical";
    if (t.charset)
        return "charset";
    if (e.tag === "meta") {
        for (const o of SC)
            if (t[o] !== void 0)
                return `${r}:${t[o]}`
    }
    if (e.key)
        return `${r}:key:${e.key}`;
    if (t.id)
        return `${r}:id:${t.id}`;
    if (hC.has(r)) {
        const o = e.textContent || e.innerHTML;
        if (o)
            return `${r}:content:${o}`
    }
}
function s0(e) {
    const t = e._h || e._d;
    if (t)
        return t;
    const r = e.textContent || e.innerHTML;
    return r || `${e.tag}:${Object.entries(e.props).map( ([o,i]) => `${o}:${String(i)}`).join(",")}`
}
function Oa(e, t, r) {
    typeof e === "function" && (!r || r !== "titleTemplate" && !(r[0] === "o" && r[1] === "n")) && (e = e());
    let i;
    if (t && (i = t(r, e)),
    Array.isArray(i))
        return i.map(s => Oa(s, t));
    if (i?.constructor === Object) {
        const s = {};
        for (const c of Object.keys(i))
            s[c] = Oa(i[c], t, c);
        return s
    }
    return i
}
function CC(e, t) {
    const r = e === "style" ? new Map : new Set;
    function o(i) {
        const s = i.trim();
        if (s)
            if (e === "style") {
                const [c,...d] = s.split(":").map(h => h.trim());
                c && d.length && r.set(c, d.join(":"))
            } else
                s.split(" ").filter(Boolean).forEach(c => r.add(c))
    }
    return typeof t == "string" ? e === "style" ? t.split(";").forEach(o) : o(t) : Array.isArray(t) ? t.forEach(i => o(i)) : t && typeof t == "object" && Object.entries(t).forEach( ([i,s]) => {
        s && s !== "false" && (e === "style" ? r.set(i.trim(), s) : o(i))
    }
    ),
    r
}
function W_(e, t) {
    return e.props = e.props || {},
    t && Object.entries(t).forEach( ([r,o]) => {
        if (o === null) {
            e.props[r] = null;
            return
        }
        if (r === "class" || r === "style") {
            e.props[r] = CC(r, o);
            return
        }
        if (mC.has(r)) {
            if (["textContent", "innerHTML"].includes(r) && typeof o == "object") {
                let c = t.type;
                if (t.type || (c = "application/json"),
                !c?.endsWith("json") && c !== "speculationrules")
                    return;
                t.type = c,
                e.props.type = c,
                e[r] = JSON.stringify(o)
            } else
                e[r] = o;
            return
        }
        const i = String(o)
          , s = r.startsWith("data-");
        i === "true" || i === "" ? e.props[r] = s ? i : !0 : !o && s && i === "false" ? e.props[r] = "false" : o !== void 0 && (e.props[r] = o)
    }
    ),
    e
}
function PC(e, t) {
    const r = typeof t == "object" && typeof t != "function" ? t : {
        [e === "script" || e === "noscript" || e === "style" ? "innerHTML" : "textContent"]: t
    }
      , o = W_({
        tag: e,
        props: {}
    }, r);
    return o.key && pC.has(o.tag) && (o.props["data-hid"] = o._h = o.key),
    o.tag === "script" && typeof o.innerHTML == "object" && (o.innerHTML = JSON.stringify(o.innerHTML),
    o.props.type = o.props.type || "application/json"),
    Array.isArray(o.props.content) ? o.props.content.map(i => ({
        ...o,
        props: {
            ...o.props,
            content: i
        }
    })) : o
}
function AC(e, t) {
    if (!e)
        return [];
    typeof e == "function" && (e = e());
    const r = (i, s) => {
        for (let c = 0; c < t.length; c++)
            s = t[c](i, s);
        return s
    }
    ;
    e = r(void 0, e);
    const o = [];
    return e = Oa(e, r),
    Object.entries(e || {}).forEach( ([i,s]) => {
        if (s !== void 0)
            for (const c of Array.isArray(s) ? s : [s])
                o.push(PC(i, c))
    }
    ),
    o.flat()
}
const wf = (e, t) => e._w === t._w ? e._p - t._p : e._w - t._w
  , a0 = {
    base: -10,
    title: 10
}
  , xC = {
    critical: -8,
    high: -1,
    low: 2
}
  , l0 = {
    meta: {
        "content-security-policy": -30,
        charset: -20,
        viewport: -15
    },
    link: {
        preconnect: 20,
        stylesheet: 60,
        preload: 70,
        modulepreload: 70,
        prefetch: 90,
        "dns-prefetch": 90,
        prerender: 90
    },
    script: {
        async: 30,
        defer: 80,
        sync: 50
    },
    style: {
        imported: 40,
        sync: 60
    }
}
  , kC = /@import/
  , vi = e => e === "" || e === !0;
function EC(e, t) {
    if (typeof t.tagPriority == "number")
        return t.tagPriority;
    let r = 100;
    const o = xC[t.tagPriority] || 0
      , i = e.resolvedOptions.disableCapoSorting ? {
        link: {},
        script: {},
        style: {}
    } : l0;
    if (t.tag in a0)
        r = a0[t.tag];
    else if (t.tag === "meta") {
        const s = t.props["http-equiv"] === "content-security-policy" ? "content-security-policy" : t.props.charset ? "charset" : t.props.name === "viewport" ? "viewport" : null;
        s && (r = l0.meta[s])
    } else
        t.tag === "link" && t.props.rel ? r = i.link[t.props.rel] : t.tag === "script" ? vi(t.props.async) ? r = i.script.async : t.props.src && !vi(t.props.defer) && !vi(t.props.async) && t.props.type !== "module" && !t.props.type?.endsWith("json") ? r = i.script.sync : vi(t.props.defer) && t.props.src && !vi(t.props.async) && (r = i.script.defer) : t.tag === "style" && (r = t.innerHTML && kC.test(t.innerHTML) ? i.style.imported : i.style.sync);
    return (r || 100) + o
}
function c0(e, t) {
    const r = typeof t == "function" ? t(e) : t
      , o = r.key || String(e.plugins.size + 1);
    e.plugins.get(o) || (e.plugins.set(o, r),
    e.hooks.addHooks(r.hooks || {}))
}
function OC(e={}) {
    const t = j_();
    t.addHooks(e.hooks || {});
    const r = !e.document
      , o = new Map
      , i = new Map
      , s = []
      , c = {
        _entryCount: 1,
        plugins: i,
        dirty: !1,
        resolvedOptions: e,
        hooks: t,
        ssr: r,
        entries: o,
        headEntries() {
            return [...o.values()]
        },
        use: d => c0(c, d),
        push(d, h) {
            const _ = {
                ...h || {}
            };
            delete _.head;
            const g = _._index ?? c._entryCount++
              , l = {
                _i: g,
                input: d,
                options: _
            }
              , f = {
                _poll(p=!1) {
                    c.dirty = !0,
                    !p && s.push(g),
                    t.callHook("entries:updated", c)
                },
                dispose() {
                    o.delete(g) && f._poll(!0)
                },
                patch(p) {
                    (!_.mode || _.mode === "server" && r || _.mode === "client" && !r) && (l.input = p,
                    o.set(g, l),
                    f._poll())
                }
            };
            return f.patch(d),
            f
        },
        async resolveTags() {
            const d = {
                tagMap: new Map,
                tags: [],
                entries: [...c.entries.values()]
            };
            for (await t.callHook("entries:resolve", d); s.length; ) {
                const f = s.shift()
                  , p = o.get(f);
                if (p) {
                    const y = {
                        tags: AC(p.input, e.propResolvers || []).map(w => Object.assign(w, p.options)),
                        entry: p
                    };
                    await t.callHook("entries:normalize", y),
                    p._tags = y.tags.map( (w, x) => (w._w = EC(c, w),
                    w._p = (p._i << 10) + x,
                    w._d = bf(w),
                    w))
                }
            }
            let h = !1;
            d.entries.flatMap(f => (f._tags || []).map(p => ({
                ...p,
                props: {
                    ...p.props
                }
            }))).sort(wf).reduce( (f, p) => {
                const y = String(p._d || p._p);
                if (!f.has(y))
                    return f.set(y, p);
                const w = f.get(y);
                if ((p?.tagDuplicateStrategy || (vC.has(p.tag) ? "merge" : null) || (p.key && p.key === w.key ? "merge" : null)) === "merge") {
                    const P = {
                        ...w.props
                    };
                    Object.entries(p.props).forEach( ([E,C]) => P[E] = E === "style" ? new Map([...w.props.style || new Map, ...C]) : E === "class" ? new Set([...w.props.class || new Set, ...C]) : C),
                    f.set(y, {
                        ...p,
                        props: P
                    })
                } else
                    p._p >> 10 === w._p >> 10 && K_(p._d) ? (f.set(y, Object.assign([...Array.isArray(w) ? w : [w], p], p)),
                    h = !0) : (p._w === w._w ? p._p > w._p : p?._w < w?._w) && f.set(y, p);
                return f
            }
            , d.tagMap);
            const _ = d.tagMap.get("title")
              , g = d.tagMap.get("titleTemplate");
            if (c._title = _?.textContent,
            g) {
                const f = g?.textContent;
                if (c._titleTemplate = f,
                f) {
                    let p = typeof f == "function" ? f(_?.textContent) : f;
                    typeof p == "string" && !c.plugins.has("template-params") && (p = p.replace("%s", _?.textContent || "")),
                    _ ? p === null ? d.tagMap.delete("title") : d.tagMap.set("title", {
                        ..._,
                        textContent: p
                    }) : (g.tag = "title",
                    g.textContent = p)
                }
            }
            d.tags = Array.from(d.tagMap.values()),
            h && (d.tags = d.tags.flat().sort(wf)),
            await t.callHook("tags:beforeResolve", d),
            await t.callHook("tags:resolve", d),
            await t.callHook("tags:afterResolve", d);
            const l = [];
            for (const f of d.tags) {
                const {innerHTML: p, tag: y, props: w} = f;
                if (gC.has(y) && !(Object.keys(w).length === 0 && !f.innerHTML && !f.textContent) && !(y === "meta" && !w.content && !w["http-equiv"] && !w.charset)) {
                    if (y === "script" && p) {
                        if (w.type?.endsWith("json")) {
                            const x = typeof p == "string" ? p : JSON.stringify(p);
                            f.innerHTML = x.replace(/</g, "\\u003C")
                        } else
                            typeof p == "string" && (f.innerHTML = p.replace(new RegExp(`</${y}`,"g"), `<\\/${y}`));
                        f._d = bf(f)
                    }
                    l.push(f)
                }
            }
            return l
        }
    };
    return (e?.plugins || []).forEach(d => c0(c, d)),
    c.hooks.callHook("init", c),
    e.init?.forEach(d => d && c.push(d)),
    c
}
const cn = "%separator"
  , RC = new RegExp(`${cn}(?:\\s*${cn})*`,"g");
function MC(e, t, r=!1) {
    let o;
    if (t === "s" || t === "pageTitle")
        o = e.pageTitle;
    else if (t.includes(".")) {
        const i = t.indexOf(".");
        o = e[t.substring(0, i)]?.[t.substring(i + 1)]
    } else
        o = e[t];
    if (o !== void 0)
        return r ? (o || "").replace(/\\/g, "\\\\").replace(/</g, "\\u003C").replace(/"/g, '\\"') : o || ""
}
function ea(e, t, r, o=!1) {
    if (typeof e != "string" || !e.includes("%"))
        return e;
    let i = e;
    try {
        i = decodeURI(e)
    } catch {}
    const s = i.match(/%\w+(?:\.\w+)?/g);
    if (!s)
        return e;
    const c = e.includes(cn);
    return e = e.replace(/%\w+(?:\.\w+)?/g, d => {
        if (d === cn || !s.includes(d))
            return d;
        const h = MC(t, d.slice(1), o);
        return h !== void 0 ? h : d
    }
    ).trim(),
    c && (e.endsWith(cn) && (e = e.slice(0, -cn.length)),
    e.startsWith(cn) && (e = e.slice(cn.length)),
    e = e.replace(RC, r || "").trim()),
    e
}
const u0 = e => e.includes(":key") ? e : e.split(":").join(":key:")
  , IC = {
    key: "aliasSorting",
    hooks: {
        "tags:resolve": e => {
            let t = !1;
            for (const r of e.tags) {
                const o = r.tagPriority;
                if (!o)
                    continue;
                const i = String(o);
                if (i.startsWith("before:")) {
                    const s = u0(i.slice(7))
                      , c = e.tagMap.get(s);
                    c && (typeof c.tagPriority == "number" && (r.tagPriority = c.tagPriority),
                    r._p = c._p - 1,
                    t = !0)
                } else if (i.startsWith("after:")) {
                    const s = u0(i.slice(6))
                      , c = e.tagMap.get(s);
                    c && (typeof c.tagPriority == "number" && (r.tagPriority = c.tagPriority),
                    r._p = c._p + 1,
                    t = !0)
                }
            }
            t && (e.tags = e.tags.sort(wf))
        }
    }
}
  , jC = {
    key: "deprecations",
    hooks: {
        "entries:normalize": ({tags: e}) => {
            for (const t of e)
                t.props.children && (t.innerHTML = t.props.children,
                delete t.props.children),
                t.props.hid && (t.key = t.props.hid,
                delete t.props.hid),
                t.props.vmid && (t.key = t.props.vmid,
                delete t.props.vmid),
                t.props.body && (t.tagPosition = "bodyClose",
                delete t.props.body)
        }
    }
};
async function Tf(e) {
    if (typeof e === "function")
        return e;
    if (e instanceof Promise)
        return await e;
    if (Array.isArray(e))
        return await Promise.all(e.map(r => Tf(r)));
    if (e?.constructor === Object) {
        const r = {};
        for (const o of Object.keys(e))
            r[o] = await Tf(e[o]);
        return r
    }
    return e
}
const HC = {
    key: "promises",
    hooks: {
        "entries:resolve": async e => {
            const t = [];
            for (const r in e.entries)
                e.entries[r]._promisesProcessed || t.push(Tf(e.entries[r].input).then(o => {
                    e.entries[r].input = o,
                    e.entries[r]._promisesProcessed = !0
                }
                ));
            await Promise.all(t)
        }
    }
}
  , DC = {
    meta: "content",
    link: "href",
    htmlAttrs: "lang"
}
  , LC = ["innerHTML", "textContent"]
  , BC = e => ({
    key: "template-params",
    hooks: {
        "entries:normalize": t => {
            const r = t.tags.filter(o => o.tag === "templateParams" && o.mode === "server")?.[0]?.props || {};
            Object.keys(r).length && (e._ssrPayload = {
                templateParams: {
                    ...e._ssrPayload?.templateParams || {},
                    ...r
                }
            })
        }
        ,
        "tags:resolve": ({tagMap: t, tags: r}) => {
            const o = t.get("templateParams")?.props || {}
              , i = o.separator || "|";
            delete o.separator,
            o.pageTitle = ea(o.pageTitle || e._title || "", o, i);
            for (const s of r) {
                if (s.processTemplateParams === !1)
                    continue;
                const c = DC[s.tag];
                if (c && typeof s.props[c] == "string")
                    s.props[c] = ea(s.props[c], o, i);
                else if (s.processTemplateParams || s.tag === "titleTemplate" || s.tag === "title")
                    for (const d of LC)
                        typeof s[d] == "string" && (s[d] = ea(s[d], o, i, s.tag === "script" && s.props.type.endsWith("json")))
            }
            e._templateParams = o,
            e._separator = i
        }
        ,
        "tags:afterResolve": ({tagMap: t}) => {
            const r = t.get("title");
            r?.textContent && r.processTemplateParams !== !1 && (r.textContent = ea(r.textContent, e._templateParams, e._separator))
        }
    }
});
function NC(e={}) {
    return t => (t.push({
        meta: [{
            name: "twitter:card",
            content: e.twitterCard || "summary_large_image",
            tagPriority: "low"
        }, {
            property: "og:title",
            tagPriority: "low",
            "data-infer": ""
        }, {
            property: "og:description",
            tagPriority: "low",
            "data-infer": ""
        }]
    }),
    {
        key: "infer-seo-meta",
        hooks: {
            "tags:beforeResolve": ({tagMap: r}) => {
                let o = t._titleTemplate || t._title;
                const i = r.get("meta:og:title");
                typeof i?.props["data-infer"] < "u" && (typeof o == "function" && (o = o(t._title)),
                i.props.content = e.ogTitle ? e.ogTitle(o) : o || "",
                i.processTemplateParams = !0);
                const s = r.get("meta:description")?.props?.content
                  , c = r.get("meta:og:description");
                typeof c?.props["data-infer"] < "u" && (c.props.content = e.ogDescription ? e.ogDescription(s) : s || "",
                c.processTemplateParams = !0)
            }
        }
    })
}
const FC = (e, t) => ut(t) ? $r(t) : t
  , ud = "usehead";
function VC(e) {
    return {
        install(r) {
            r.config.globalProperties.$unhead = e,
            r.config.globalProperties.$head = e,
            r.provide(ud, e)
        }
    }.install
}
function G_() {
    if (Va()) {
        const e = Xt(ud);
        if (!e)
            throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
        return e
    }
    throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.")
}
function X_(e, t={}) {
    const r = t.head || G_();
    return r.ssr ? r.push(e || {}, t) : $C(r, e, t)
}
function $C(e, t, r={}) {
    const o = _t(!1);
    let i;
    return l_( () => {
        const c = o.value ? {} : Oa(t, FC);
        i ? i.patch(c) : i = e.push(c, r)
    }
    ),
    Zi() && (Ji( () => {
        i.dispose()
    }
    ),
    Bg( () => {
        o.value = !0
    }
    ),
    Lg( () => {
        o.value = !1
    }
    )),
    i
}
function zC(e={}, t={}) {
    (t.head || G_()).use(TC);
    const {title: o, titleTemplate: i, ...s} = e;
    return X_({
        title: o,
        titleTemplate: i,
        _flatMeta: s
    }, t)
}
function Wa(e) {
    const t = e || L_();
    return t?.ssrContext?.head || t?.runWithContext( () => {
        if (Va())
            return Xt(ud)
    }
    )
}
function Sf(e, t={}) {
    const r = Wa(t.nuxt);
    if (r)
        return X_(e, {
            head: r,
            ...t
        })
}
function UC(e, t={}) {
    const r = Wa(t.nuxt);
    if (r)
        return zC(e, {
            head: r,
            ...t
        })
}
const qC = "modulepreload"
  , KC = function(e, t) {
    return new URL(e,t).href
}
  , f0 = {}
  , qr = function(t, r, o) {
    let i = Promise.resolve();
    if (r && r.length > 0) {
        const c = document.getElementsByTagName("link")
          , d = document.querySelector("meta[property=csp-nonce]")
          , h = d?.nonce || d?.getAttribute("nonce");
        i = Promise.allSettled(r.map(_ => {
            if (_ = KC(_, o),
            _ in f0)
                return;
            f0[_] = !0;
            const g = _.endsWith(".css")
              , l = g ? '[rel="stylesheet"]' : "";
            if (!!o)
                for (let y = c.length - 1; y >= 0; y--) {
                    const w = c[y];
                    if (w.href === _ && (!g || w.rel === "stylesheet"))
                        return
                }
            else if (document.querySelector(`link[href="${_}"]${l}`))
                return;
            const p = document.createElement("link");
            if (p.rel = g ? "stylesheet" : qC,
            g || (p.as = "script"),
            p.crossOrigin = "",
            p.href = _,
            h && p.setAttribute("nonce", h),
            document.head.appendChild(p),
            g)
                return new Promise( (y, w) => {
                    p.addEventListener("load", y),
                    p.addEventListener("error", () => w(new Error(`Unable to preload CSS for ${_}`)))
                }
                )
        }
        ))
    }
    function s(c) {
        const d = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (d.payload = c,
        window.dispatchEvent(d),
        !d.defaultPrevented)
            throw c
    }
    return i.then(c => {
        for (const d of c || [])
            d.status === "rejected" && s(d.reason);
        return t().catch(s)
    }
    )
};
let ua, fa;
function WC() {
    return ua = $fetch(ad(`builds/meta/${oo().app.buildId}.json`), {
        responseType: "json"
    }),
    ua.then(e => {
        fa = WS(e.matcher)
    }
    ).catch(e => {}
    ),
    ua
}
function Ga() {
    return ua || WC()
}
async function fd(e) {
    const t = typeof e == "string" ? e : e.path;
    if (await Ga(),
    !fa)
        return {};
    try {
        return ld({}, ...fa.matchAll(t).reverse())
    } catch (r) {
        return {}
    }
}
async function d0(e, t={}) {
    const r = await XC(e, t)
      , o = Ke()
      , i = o._payloadCache ||= {};
    return r in i ? i[r] || null : (i[r] = Y_(e).then(s => s ? J_(r).then(c => c || (delete i[r],
    null)) : (i[r] = null,
    null)),
    i[r])
}
const GC = "_payload.json";
async function XC(e, t={}) {
    const r = new URL(e,"http://localhost");
    if (r.host !== "localhost" || mn(r.pathname, {
        acceptRelative: !0
    }))
        throw new Error("Payload URL must not include hostname: " + e);
    const o = oo()
      , i = t.hash || (t.fresh ? Date.now() : o.app.buildId)
      , s = o.app.cdnURL
      , c = s && await Y_(e) ? s : o.app.baseURL;
    return id(c, r.pathname, GC + (i ? `?${i}` : ""))
}
async function J_(e) {
    const t = fetch(e).then(r => r.text().then(Z_));
    try {
        return await t
    } catch (r) {}
    return null
}
async function Y_(e=Ka().path) {
    const t = Ke();
    return e = od(e),
    (await Ga()).prerendered.includes(e) ? !0 : t.runWithContext(async () => {
        const o = await fd({
            path: e
        });
        return !!o.prerender && !o.redirect
    }
    )
}
let qn = null;
async function JC() {
    if (qn)
        return qn;
    const e = document.getElementById("__NUXT_DATA__");
    if (!e)
        return {};
    const t = await Z_(e.textContent || "")
      , r = e.dataset.src ? await J_(e.dataset.src) : void 0;
    return qn = {
        ...t,
        ...r,
        ...window.__NUXT__
    },
    qn.config?.public && (qn.config.public = Ar(qn.config.public)),
    qn
}
async function Z_(e) {
    return await fC(e, Ke()._payloadRevivers)
}
function YC(e, t) {
    Ke()._payloadRevivers[e] = t
}
const Q_ = [["NuxtError", e => es(e)], ["EmptyShallowRef", e => Bo(e === "_" ? void 0 : e === "0n" ? BigInt(0) : Sa(e))], ["EmptyRef", e => _t(e === "_" ? void 0 : e === "0n" ? BigInt(0) : Sa(e))], ["ShallowRef", e => Bo(e)], ["ShallowReactive", e => zr(e)], ["Ref", e => _t(e)], ["Reactive", e => Ar(e)]];
Q_.push(["Island", ({key: e, params: t, result: r}) => {
    const o = Ke();
    return o.isHydrating || (o.payload.data[e] ||= $fetch(`/__nuxt_island/${e}.json`, {
        responseType: "json",
        ...t ? {
            params: t
        } : {}
    }).then(i => (o.payload.data[e] = i,
    i))),
    {
        html: "",
        ...r
    }
}
]);
const ZC = $t({
    name: "nuxt:revive-payload:client",
    order: -30,
    async setup(e) {
        let t, r;
        for (const [o,i] of Q_)
            YC(o, i);
        Object.assign(e.payload, ([t,r] = Lo( () => e.runWithContext(JC)),
        t = await t,
        r(),
        t)),
        window.__NUXT__ = e.payload
    }
});
async function dd(e, t={}) {
    const r = t.document || e.resolvedOptions.document;
    if (!r || !e.dirty)
        return;
    const o = {
        shouldRender: !0,
        tags: []
    };
    if (await e.hooks.callHook("dom:beforeRender", o),
    !!o.shouldRender)
        return e._domUpdatePromise || (e._domUpdatePromise = new Promise(async i => {
            const s = new Map
              , c = new Promise(p => {
                e.resolveTags().then(y => {
                    p(y.map(w => {
                        const x = s.get(w._d) || 0
                          , P = {
                            tag: w,
                            id: (x ? `${w._d}:${x}` : w._d) || s0(w),
                            shouldRender: !0
                        };
                        return w._d && K_(w._d) && s.set(w._d, x + 1),
                        P
                    }
                    ))
                }
                )
            }
            );
            let d = e._dom;
            if (!d) {
                d = {
                    title: r.title,
                    elMap: new Map().set("htmlAttrs", r.documentElement).set("bodyAttrs", r.body)
                };
                for (const p of ["body", "head"]) {
                    const y = r[p]?.children;
                    for (const w of y) {
                        const x = w.tagName.toLowerCase();
                        if (!o0.has(x))
                            continue;
                        const P = W_({
                            tag: x,
                            props: {}
                        }, {
                            innerHTML: w.innerHTML,
                            ...w.getAttributeNames().reduce( (E, C) => (E[C] = w.getAttribute(C),
                            E), {}) || {}
                        });
                        if (P.key = w.getAttribute("data-hid") || void 0,
                        P._d = bf(P) || s0(P),
                        d.elMap.has(P._d)) {
                            let E = 1
                              , C = P._d;
                            for (; d.elMap.has(C); )
                                C = `${P._d}:${E++}`;
                            d.elMap.set(C, w)
                        } else
                            d.elMap.set(P._d, w)
                    }
                }
            }
            d.pendingSideEffects = {
                ...d.sideEffects
            },
            d.sideEffects = {};
            function h(p, y, w) {
                const x = `${p}:${y}`;
                d.sideEffects[x] = w,
                delete d.pendingSideEffects[x]
            }
            function _({id: p, $el: y, tag: w}) {
                const x = w.tag.endsWith("Attrs");
                d.elMap.set(p, y),
                x || (w.textContent && w.textContent !== y.textContent && (y.textContent = w.textContent),
                w.innerHTML && w.innerHTML !== y.innerHTML && (y.innerHTML = w.innerHTML),
                h(p, "el", () => {
                    y?.remove(),
                    d.elMap.delete(p)
                }
                ));
                for (const P in w.props) {
                    if (!Object.prototype.hasOwnProperty.call(w.props, P))
                        continue;
                    const E = w.props[P];
                    if (P.startsWith("on") && typeof E == "function") {
                        const S = y?.dataset;
                        if (S && S[`${P}fired`]) {
                            const M = P.slice(0, -5);
                            E.call(y, new Event(M.substring(2)))
                        }
                        y.getAttribute(`data-${P}`) !== "" && ((w.tag === "bodyAttrs" ? r.defaultView : y).addEventListener(P.substring(2), E.bind(y)),
                        y.setAttribute(`data-${P}`, ""));
                        continue
                    }
                    const C = `attr:${P}`;
                    if (P === "class") {
                        if (!E)
                            continue;
                        for (const S of E)
                            x && h(p, `${C}:${S}`, () => y.classList.remove(S)),
                            !y.classList.contains(S) && y.classList.add(S)
                    } else if (P === "style") {
                        if (!E)
                            continue;
                        for (const [S,M] of E)
                            h(p, `${C}:${S}`, () => {
                                y.style.removeProperty(S)
                            }
                            ),
                            y.style.setProperty(S, M)
                    } else
                        E !== !1 && E !== null && (y.getAttribute(P) !== E && y.setAttribute(P, E === !0 ? "" : String(E)),
                        x && h(p, C, () => y.removeAttribute(P)))
                }
            }
            const g = []
              , l = {
                bodyClose: void 0,
                bodyOpen: void 0,
                head: void 0
            }
              , f = await c;
            for (const p of f) {
                const {tag: y, shouldRender: w, id: x} = p;
                if (w) {
                    if (y.tag === "title") {
                        r.title = y.textContent,
                        h("title", "", () => r.title = d.title);
                        continue
                    }
                    p.$el = p.$el || d.elMap.get(x),
                    p.$el ? _(p) : o0.has(y.tag) && g.push(p)
                }
            }
            for (const p of g) {
                const y = p.tag.tagPosition || "head";
                p.$el = r.createElement(p.tag.tag),
                _(p),
                l[y] = l[y] || r.createDocumentFragment(),
                l[y].appendChild(p.$el)
            }
            for (const p of f)
                await e.hooks.callHook("dom:renderTag", p, r, h);
            l.head && r.head.appendChild(l.head),
            l.bodyOpen && r.body.insertBefore(l.bodyOpen, r.body.firstChild),
            l.bodyClose && r.body.appendChild(l.bodyClose);
            for (const p in d.pendingSideEffects)
                d.pendingSideEffects[p]();
            e._dom = d,
            await e.hooks.callHook("dom:rendered", {
                renders: f
            }),
            i()
        }
        ).finally( () => {
            e._domUpdatePromise = void 0,
            e.dirty = !1
        }
        )),
        e._domUpdatePromise
}
function QC(e={}) {
    const t = e.domOptions?.render || dd;
    e.document = e.document || (typeof window < "u" ? document : void 0);
    const r = e.document?.head.querySelector('script[id="unhead:payload"]')?.innerHTML || !1;
    return OC({
        ...e,
        plugins: [...e.plugins || [], {
            key: "client",
            hooks: {
                "entries:updated": t
            }
        }],
        init: [r ? JSON.parse(r) : !1, ...e.init || []]
    })
}
function e8(e, t) {
    let r = 0;
    return () => {
        const o = ++r;
        t( () => {
            r === o && e()
        }
        )
    }
}
function t8(e={}) {
    const t = QC({
        domOptions: {
            render: e8( () => dd(t), r => setTimeout(r, 0))
        },
        ...e
    });
    return t.install = VC(t),
    t
}
const r8 = {
    disableDefaults: !0,
    disableCapoSorting: !1,
    plugins: [jC, HC, BC, IC]
}
  , n8 = $t({
    name: "nuxt:head",
    enforce: "pre",
    setup(e) {
        const t = t8(r8);
        e.vueApp.use(t);
        {
            let r = !0;
            const o = async () => {
                r = !1,
                await dd(t)
            }
            ;
            t.hooks.hook("dom:beforeRender", i => {
                i.shouldRender = !r
            }
            ),
            e.hooks.hook("page:start", () => {
                r = !0
            }
            ),
            e.hooks.hook("page:finish", () => {
                e.isHydrating || o()
            }
            ),
            e.hooks.hook("app:error", o),
            e.hooks.hook("app:suspense:resolve", o)
        }
    }
});
/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const Ao = typeof document < "u";
function em(e) {
    return typeof e == "object" || "displayName"in e || "props"in e || "__vccOpts"in e
}
function o8(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && em(e.default)
}
const Le = Object.assign;
function Iu(e, t) {
    const r = {};
    for (const o in t) {
        const i = t[o];
        r[o] = vr(i) ? i.map(e) : e(i)
    }
    return r
}
const ji = () => {}
  , vr = Array.isArray
  , tm = /#/g
  , i8 = /&/g
  , s8 = /\//g
  , a8 = /=/g
  , l8 = /\?/g
  , rm = /\+/g
  , c8 = /%5B/g
  , u8 = /%5D/g
  , nm = /%5E/g
  , f8 = /%60/g
  , om = /%7B/g
  , d8 = /%7C/g
  , im = /%7D/g
  , p8 = /%20/g;
function pd(e) {
    return encodeURI("" + e).replace(d8, "|").replace(c8, "[").replace(u8, "]")
}
function h8(e) {
    return pd(e).replace(om, "{").replace(im, "}").replace(nm, "^")
}
function Cf(e) {
    return pd(e).replace(rm, "%2B").replace(p8, "+").replace(tm, "%23").replace(i8, "%26").replace(f8, "`").replace(om, "{").replace(im, "}").replace(nm, "^")
}
function g8(e) {
    return Cf(e).replace(a8, "%3D")
}
function _8(e) {
    return pd(e).replace(tm, "%23").replace(l8, "%3F")
}
function m8(e) {
    return e == null ? "" : _8(e).replace(s8, "%2F")
}
function zi(e) {
    try {
        return decodeURIComponent("" + e)
    } catch {}
    return "" + e
}
const v8 = /\/$/
  , y8 = e => e.replace(v8, "");
function ju(e, t, r="/") {
    let o, i = {}, s = "", c = "";
    const d = t.indexOf("#");
    let h = t.indexOf("?");
    return d < h && d >= 0 && (h = -1),
    h > -1 && (o = t.slice(0, h),
    s = t.slice(h + 1, d > -1 ? d : t.length),
    i = e(s)),
    d > -1 && (o = o || t.slice(0, d),
    c = t.slice(d, t.length)),
    o = S8(o ?? t, r),
    {
        fullPath: o + (s && "?") + s + c,
        path: o,
        query: i,
        hash: zi(c)
    }
}
function b8(e, t) {
    const r = t.query ? e(t.query) : "";
    return t.path + (r && "?") + r + (t.hash || "")
}
function p0(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}
function w8(e, t, r) {
    const o = t.matched.length - 1
      , i = r.matched.length - 1;
    return o > -1 && o === i && zo(t.matched[o], r.matched[i]) && sm(t.params, r.params) && e(t.query) === e(r.query) && t.hash === r.hash
}
function zo(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}
function sm(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
        return !1;
    for (const r in e)
        if (!T8(e[r], t[r]))
            return !1;
    return !0
}
function T8(e, t) {
    return vr(e) ? h0(e, t) : vr(t) ? h0(t, e) : e === t
}
function h0(e, t) {
    return vr(t) ? e.length === t.length && e.every( (r, o) => r === t[o]) : e.length === 1 && e[0] === t
}
function S8(e, t) {
    if (e.startsWith("/"))
        return e;
    if (!e)
        return t;
    const r = t.split("/")
      , o = e.split("/")
      , i = o[o.length - 1];
    (i === ".." || i === ".") && o.push("");
    let s = r.length - 1, c, d;
    for (c = 0; c < o.length; c++)
        if (d = o[c],
        d !== ".")
            if (d === "..")
                s > 1 && s--;
            else
                break;
    return r.slice(0, s).join("/") + "/" + o.slice(c).join("/")
}
const pr = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
};
var Ui;
(function(e) {
    e.pop = "pop",
    e.push = "push"
}
)(Ui || (Ui = {}));
var Hi;
(function(e) {
    e.back = "back",
    e.forward = "forward",
    e.unknown = ""
}
)(Hi || (Hi = {}));
function C8(e) {
    if (!e)
        if (Ao) {
            const t = document.querySelector("base");
            e = t && t.getAttribute("href") || "/",
            e = e.replace(/^\w+:\/\/[^\/]+/, "")
        } else
            e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e),
    y8(e)
}
const P8 = /^[^#]+#/;
function A8(e, t) {
    return e.replace(P8, "#") + t
}
function x8(e, t) {
    const r = document.documentElement.getBoundingClientRect()
      , o = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: o.left - r.left - (t.left || 0),
        top: o.top - r.top - (t.top || 0)
    }
}
const Xa = () => ({
    left: window.scrollX,
    top: window.scrollY
});
function k8(e) {
    let t;
    if ("el"in e) {
        const r = e.el
          , o = typeof r == "string" && r.startsWith("#")
          , i = typeof r == "string" ? o ? document.getElementById(r.slice(1)) : document.querySelector(r) : r;
        if (!i)
            return;
        t = x8(i, e)
    } else
        t = e;
    "scrollBehavior"in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY)
}
function g0(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}
const Pf = new Map;
function E8(e, t) {
    Pf.set(e, t)
}
function O8(e) {
    const t = Pf.get(e);
    return Pf.delete(e),
    t
}
let R8 = () => location.protocol + "//" + location.host;
function am(e, t) {
    const {pathname: r, search: o, hash: i} = t
      , s = e.indexOf("#");
    if (s > -1) {
        let d = i.includes(e.slice(s)) ? e.slice(s).length : 1
          , h = i.slice(d);
        return h[0] !== "/" && (h = "/" + h),
        p0(h, "")
    }
    return p0(r, e) + o + i
}
function M8(e, t, r, o) {
    let i = []
      , s = []
      , c = null;
    const d = ({state: f}) => {
        const p = am(e, location)
          , y = r.value
          , w = t.value;
        let x = 0;
        if (f) {
            if (r.value = p,
            t.value = f,
            c && c === y) {
                c = null;
                return
            }
            x = w ? f.position - w.position : 0
        } else
            o(p);
        i.forEach(P => {
            P(r.value, y, {
                delta: x,
                type: Ui.pop,
                direction: x ? x > 0 ? Hi.forward : Hi.back : Hi.unknown
            })
        }
        )
    }
    ;
    function h() {
        c = r.value
    }
    function _(f) {
        i.push(f);
        const p = () => {
            const y = i.indexOf(f);
            y > -1 && i.splice(y, 1)
        }
        ;
        return s.push(p),
        p
    }
    function g() {
        const {history: f} = window;
        f.state && f.replaceState(Le({}, f.state, {
            scroll: Xa()
        }), "")
    }
    function l() {
        for (const f of s)
            f();
        s = [],
        window.removeEventListener("popstate", d),
        window.removeEventListener("beforeunload", g)
    }
    return window.addEventListener("popstate", d),
    window.addEventListener("beforeunload", g, {
        passive: !0
    }),
    {
        pauseListeners: h,
        listen: _,
        destroy: l
    }
}
function _0(e, t, r, o=!1, i=!1) {
    return {
        back: e,
        current: t,
        forward: r,
        replaced: o,
        position: window.history.length,
        scroll: i ? Xa() : null
    }
}
function I8(e) {
    const {history: t, location: r} = window
      , o = {
        value: am(e, r)
    }
      , i = {
        value: t.state
    };
    i.value || s(o.value, {
        back: null,
        current: o.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
    }, !0);
    function s(h, _, g) {
        const l = e.indexOf("#")
          , f = l > -1 ? (r.host && document.querySelector("base") ? e : e.slice(l)) + h : R8() + e + h;
        try {
            t[g ? "replaceState" : "pushState"](_, "", f),
            i.value = _
        } catch (p) {
            r[g ? "replace" : "assign"](f)
        }
    }
    function c(h, _) {
        const g = Le({}, t.state, _0(i.value.back, h, i.value.forward, !0), _, {
            position: i.value.position
        });
        s(h, g, !0),
        o.value = h
    }
    function d(h, _) {
        const g = Le({}, i.value, t.state, {
            forward: h,
            scroll: Xa()
        });
        s(g.current, g, !0);
        const l = Le({}, _0(o.value, h, null), {
            position: g.position + 1
        }, _);
        s(h, l, !1),
        o.value = h
    }
    return {
        location: o,
        state: i,
        push: d,
        replace: c
    }
}
function j8(e) {
    e = C8(e);
    const t = I8(e)
      , r = M8(e, t.state, t.location, t.replace);
    function o(s, c=!0) {
        c || r.pauseListeners(),
        history.go(s)
    }
    const i = Le({
        location: "",
        base: e,
        go: o,
        createHref: A8.bind(null, e)
    }, t, r);
    return Object.defineProperty(i, "location", {
        enumerable: !0,
        get: () => t.location.value
    }),
    Object.defineProperty(i, "state", {
        enumerable: !0,
        get: () => t.state.value
    }),
    i
}
function H8(e) {
    return typeof e == "string" || e && typeof e == "object"
}
function lm(e) {
    return typeof e == "string" || typeof e == "symbol"
}
const cm = Symbol("");
var m0;
(function(e) {
    e[e.aborted = 4] = "aborted",
    e[e.cancelled = 8] = "cancelled",
    e[e.duplicated = 16] = "duplicated"
}
)(m0 || (m0 = {}));
function Uo(e, t) {
    return Le(new Error, {
        type: e,
        [cm]: !0
    }, t)
}
function Nr(e, t) {
    return e instanceof Error && cm in e && (t == null || !!(e.type & t))
}
const v0 = "[^/]+?"
  , D8 = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
}
  , L8 = /[.+*?^${}()[\]/\\]/g;
function B8(e, t) {
    const r = Le({}, D8, t)
      , o = [];
    let i = r.start ? "^" : "";
    const s = [];
    for (const _ of e) {
        const g = _.length ? [] : [90];
        r.strict && !_.length && (i += "/");
        for (let l = 0; l < _.length; l++) {
            const f = _[l];
            let p = 40 + (r.sensitive ? .25 : 0);
            if (f.type === 0)
                l || (i += "/"),
                i += f.value.replace(L8, "\\$&"),
                p += 40;
            else if (f.type === 1) {
                const {value: y, repeatable: w, optional: x, regexp: P} = f;
                s.push({
                    name: y,
                    repeatable: w,
                    optional: x
                });
                const E = P || v0;
                if (E !== v0) {
                    p += 10;
                    try {
                        new RegExp(`(${E})`)
                    } catch (S) {
                        throw new Error(`Invalid custom RegExp for param "${y}" (${E}): ` + S.message)
                    }
                }
                let C = w ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
                l || (C = x && _.length < 2 ? `(?:/${C})` : "/" + C),
                x && (C += "?"),
                i += C,
                p += 20,
                x && (p += -8),
                w && (p += -20),
                E === ".*" && (p += -50)
            }
            g.push(p)
        }
        o.push(g)
    }
    if (r.strict && r.end) {
        const _ = o.length - 1;
        o[_][o[_].length - 1] += .7000000000000001
    }
    r.strict || (i += "/?"),
    r.end ? i += "$" : r.strict && !i.endsWith("/") && (i += "(?:/|$)");
    const c = new RegExp(i,r.sensitive ? "" : "i");
    function d(_) {
        const g = _.match(c)
          , l = {};
        if (!g)
            return null;
        for (let f = 1; f < g.length; f++) {
            const p = g[f] || ""
              , y = s[f - 1];
            l[y.name] = p && y.repeatable ? p.split("/") : p
        }
        return l
    }
    function h(_) {
        let g = ""
          , l = !1;
        for (const f of e) {
            (!l || !g.endsWith("/")) && (g += "/"),
            l = !1;
            for (const p of f)
                if (p.type === 0)
                    g += p.value;
                else if (p.type === 1) {
                    const {value: y, repeatable: w, optional: x} = p
                      , P = y in _ ? _[y] : "";
                    if (vr(P) && !w)
                        throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
                    const E = vr(P) ? P.join("/") : P;
                    if (!E)
                        if (x)
                            f.length < 2 && (g.endsWith("/") ? g = g.slice(0, -1) : l = !0);
                        else
                            throw new Error(`Missing required param "${y}"`);
                    g += E
                }
        }
        return g || "/"
    }
    return {
        re: c,
        score: o,
        keys: s,
        parse: d,
        stringify: h
    }
}
function N8(e, t) {
    let r = 0;
    for (; r < e.length && r < t.length; ) {
        const o = t[r] - e[r];
        if (o)
            return o;
        r++
    }
    return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0
}
function um(e, t) {
    let r = 0;
    const o = e.score
      , i = t.score;
    for (; r < o.length && r < i.length; ) {
        const s = N8(o[r], i[r]);
        if (s)
            return s;
        r++
    }
    if (Math.abs(i.length - o.length) === 1) {
        if (y0(o))
            return 1;
        if (y0(i))
            return -1
    }
    return i.length - o.length
}
function y0(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0
}
const F8 = {
    type: 0,
    value: ""
}
  , V8 = /[a-zA-Z0-9_]/;
function $8(e) {
    if (!e)
        return [[]];
    if (e === "/")
        return [[F8]];
    if (!e.startsWith("/"))
        throw new Error(`Invalid path "${e}"`);
    function t(p) {
        throw new Error(`ERR (${r})/"${_}": ${p}`)
    }
    let r = 0
      , o = r;
    const i = [];
    let s;
    function c() {
        s && i.push(s),
        s = []
    }
    let d = 0, h, _ = "", g = "";
    function l() {
        _ && (r === 0 ? s.push({
            type: 0,
            value: _
        }) : r === 1 || r === 2 || r === 3 ? (s.length > 1 && (h === "*" || h === "+") && t(`A repeatable param (${_}) must be alone in its segment. eg: '/:ids+.`),
        s.push({
            type: 1,
            value: _,
            regexp: g,
            repeatable: h === "*" || h === "+",
            optional: h === "*" || h === "?"
        })) : t("Invalid state to consume buffer"),
        _ = "")
    }
    function f() {
        _ += h
    }
    for (; d < e.length; ) {
        if (h = e[d++],
        h === "\\" && r !== 2) {
            o = r,
            r = 4;
            continue
        }
        switch (r) {
        case 0:
            h === "/" ? (_ && l(),
            c()) : h === ":" ? (l(),
            r = 1) : f();
            break;
        case 4:
            f(),
            r = o;
            break;
        case 1:
            h === "(" ? r = 2 : V8.test(h) ? f() : (l(),
            r = 0,
            h !== "*" && h !== "?" && h !== "+" && d--);
            break;
        case 2:
            h === ")" ? g[g.length - 1] == "\\" ? g = g.slice(0, -1) + h : r = 3 : g += h;
            break;
        case 3:
            l(),
            r = 0,
            h !== "*" && h !== "?" && h !== "+" && d--,
            g = "";
            break;
        default:
            t("Unknown state");
            break
        }
    }
    return r === 2 && t(`Unfinished custom RegExp for param "${_}"`),
    l(),
    c(),
    i
}
function z8(e, t, r) {
    const o = B8($8(e.path), r)
      , i = Le(o, {
        record: e,
        parent: t,
        children: [],
        alias: []
    });
    return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i),
    i
}
function U8(e, t) {
    const r = []
      , o = new Map;
    t = S0({
        strict: !1,
        end: !0,
        sensitive: !1
    }, t);
    function i(l) {
        return o.get(l)
    }
    function s(l, f, p) {
        const y = !p
          , w = w0(l);
        w.aliasOf = p && p.record;
        const x = S0(t, l)
          , P = [w];
        if ("alias"in l) {
            const S = typeof l.alias == "string" ? [l.alias] : l.alias;
            for (const M of S)
                P.push(w0(Le({}, w, {
                    components: p ? p.record.components : w.components,
                    path: M,
                    aliasOf: p ? p.record : w
                })))
        }
        let E, C;
        for (const S of P) {
            const {path: M} = S;
            if (f && M[0] !== "/") {
                const F = f.record.path
                  , W = F[F.length - 1] === "/" ? "" : "/";
                S.path = f.record.path + (M && W + M)
            }
            if (E = z8(S, f, x),
            p ? p.alias.push(E) : (C = C || E,
            C !== E && C.alias.push(E),
            y && l.name && !T0(E) && c(l.name)),
            fm(E) && h(E),
            w.children) {
                const F = w.children;
                for (let W = 0; W < F.length; W++)
                    s(F[W], E, p && p.children[W])
            }
            p = p || E
        }
        return C ? () => {
            c(C)
        }
        : ji
    }
    function c(l) {
        if (lm(l)) {
            const f = o.get(l);
            f && (o.delete(l),
            r.splice(r.indexOf(f), 1),
            f.children.forEach(c),
            f.alias.forEach(c))
        } else {
            const f = r.indexOf(l);
            f > -1 && (r.splice(f, 1),
            l.record.name && o.delete(l.record.name),
            l.children.forEach(c),
            l.alias.forEach(c))
        }
    }
    function d() {
        return r
    }
    function h(l) {
        const f = W8(l, r);
        r.splice(f, 0, l),
        l.record.name && !T0(l) && o.set(l.record.name, l)
    }
    function _(l, f) {
        let p, y = {}, w, x;
        if ("name"in l && l.name) {
            if (p = o.get(l.name),
            !p)
                throw Uo(1, {
                    location: l
                });
            x = p.record.name,
            y = Le(b0(f.params, p.keys.filter(C => !C.optional).concat(p.parent ? p.parent.keys.filter(C => C.optional) : []).map(C => C.name)), l.params && b0(l.params, p.keys.map(C => C.name))),
            w = p.stringify(y)
        } else if (l.path != null)
            w = l.path,
            p = r.find(C => C.re.test(w)),
            p && (y = p.parse(w),
            x = p.record.name);
        else {
            if (p = f.name ? o.get(f.name) : r.find(C => C.re.test(f.path)),
            !p)
                throw Uo(1, {
                    location: l,
                    currentLocation: f
                });
            x = p.record.name,
            y = Le({}, f.params, l.params),
            w = p.stringify(y)
        }
        const P = [];
        let E = p;
        for (; E; )
            P.unshift(E.record),
            E = E.parent;
        return {
            name: x,
            path: w,
            params: y,
            matched: P,
            meta: K8(P)
        }
    }
    e.forEach(l => s(l));
    function g() {
        r.length = 0,
        o.clear()
    }
    return {
        addRoute: s,
        resolve: _,
        removeRoute: c,
        clearRoutes: g,
        getRoutes: d,
        getRecordMatcher: i
    }
}
function b0(e, t) {
    const r = {};
    for (const o of t)
        o in e && (r[o] = e[o]);
    return r
}
function w0(e) {
    const t = {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: e.aliasOf,
        beforeEnter: e.beforeEnter,
        props: q8(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components"in e ? e.components || null : e.component && {
            default: e.component
        }
    };
    return Object.defineProperty(t, "mods", {
        value: {}
    }),
    t
}
function q8(e) {
    const t = {}
      , r = e.props || !1;
    if ("component"in e)
        t.default = r;
    else
        for (const o in e.components)
            t[o] = typeof r == "object" ? r[o] : r;
    return t
}
function T0(e) {
    for (; e; ) {
        if (e.record.aliasOf)
            return !0;
        e = e.parent
    }
    return !1
}
function K8(e) {
    return e.reduce( (t, r) => Le(t, r.meta), {})
}
function S0(e, t) {
    const r = {};
    for (const o in e)
        r[o] = o in t ? t[o] : e[o];
    return r
}
function W8(e, t) {
    let r = 0
      , o = t.length;
    for (; r !== o; ) {
        const s = r + o >> 1;
        um(e, t[s]) < 0 ? o = s : r = s + 1
    }
    const i = G8(e);
    return i && (o = t.lastIndexOf(i, o - 1)),
    o
}
function G8(e) {
    let t = e;
    for (; t = t.parent; )
        if (fm(t) && um(e, t) === 0)
            return t
}
function fm({record: e}) {
    return !!(e.name || e.components && Object.keys(e.components).length || e.redirect)
}
function X8(e) {
    const t = {};
    if (e === "" || e === "?")
        return t;
    const o = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let i = 0; i < o.length; ++i) {
        const s = o[i].replace(rm, " ")
          , c = s.indexOf("=")
          , d = zi(c < 0 ? s : s.slice(0, c))
          , h = c < 0 ? null : zi(s.slice(c + 1));
        if (d in t) {
            let _ = t[d];
            vr(_) || (_ = t[d] = [_]),
            _.push(h)
        } else
            t[d] = h
    }
    return t
}
function C0(e) {
    let t = "";
    for (let r in e) {
        const o = e[r];
        if (r = g8(r),
        o == null) {
            o !== void 0 && (t += (t.length ? "&" : "") + r);
            continue
        }
        (vr(o) ? o.map(s => s && Cf(s)) : [o && Cf(o)]).forEach(s => {
            s !== void 0 && (t += (t.length ? "&" : "") + r,
            s != null && (t += "=" + s))
        }
        )
    }
    return t
}
function J8(e) {
    const t = {};
    for (const r in e) {
        const o = e[r];
        o !== void 0 && (t[r] = vr(o) ? o.map(i => i == null ? null : "" + i) : o == null ? o : "" + o)
    }
    return t
}
const Y8 = Symbol("")
  , P0 = Symbol("")
  , hd = Symbol("")
  , dm = Symbol("")
  , Af = Symbol("");
function yi() {
    let e = [];
    function t(o) {
        return e.push(o),
        () => {
            const i = e.indexOf(o);
            i > -1 && e.splice(i, 1)
        }
    }
    function r() {
        e = []
    }
    return {
        add: t,
        list: () => e.slice(),
        reset: r
    }
}
function un(e, t, r, o, i, s=c => c()) {
    const c = o && (o.enterCallbacks[i] = o.enterCallbacks[i] || []);
    return () => new Promise( (d, h) => {
        const _ = f => {
            f === !1 ? h(Uo(4, {
                from: r,
                to: t
            })) : f instanceof Error ? h(f) : H8(f) ? h(Uo(2, {
                from: t,
                to: f
            })) : (c && o.enterCallbacks[i] === c && typeof f == "function" && c.push(f),
            d())
        }
          , g = s( () => e.call(o && o.instances[i], t, r, _));
        let l = Promise.resolve(g);
        e.length < 3 && (l = l.then(_)),
        l.catch(f => h(f))
    }
    )
}
function Hu(e, t, r, o, i=s => s()) {
    const s = [];
    for (const c of e)
        for (const d in c.components) {
            let h = c.components[d];
            if (!(t !== "beforeRouteEnter" && !c.instances[d]))
                if (em(h)) {
                    const g = (h.__vccOpts || h)[t];
                    g && s.push(un(g, r, o, c, d, i))
                } else {
                    let _ = h();
                    s.push( () => _.then(g => {
                        if (!g)
                            throw new Error(`Couldn't resolve component "${d}" at "${c.path}"`);
                        const l = o8(g) ? g.default : g;
                        c.mods[d] = g,
                        c.components[d] = l;
                        const p = (l.__vccOpts || l)[t];
                        return p && un(p, r, o, c, d, i)()
                    }
                    ))
                }
        }
    return s
}
function A0(e) {
    const t = Xt(hd)
      , r = Xt(dm)
      , o = nt( () => {
        const h = ze(e.to);
        return t.resolve(h)
    }
    )
      , i = nt( () => {
        const {matched: h} = o.value
          , {length: _} = h
          , g = h[_ - 1]
          , l = r.matched;
        if (!g || !l.length)
            return -1;
        const f = l.findIndex(zo.bind(null, g));
        if (f > -1)
            return f;
        const p = x0(h[_ - 2]);
        return _ > 1 && x0(g) === p && l[l.length - 1].path !== p ? l.findIndex(zo.bind(null, h[_ - 2])) : f
    }
    )
      , s = nt( () => i.value > -1 && rP(r.params, o.value.params))
      , c = nt( () => i.value > -1 && i.value === r.matched.length - 1 && sm(r.params, o.value.params));
    function d(h={}) {
        if (tP(h)) {
            const _ = t[ze(e.replace) ? "replace" : "push"](ze(e.to)).catch(ji);
            return e.viewTransition && typeof document < "u" && "startViewTransition"in document && document.startViewTransition( () => _),
            _
        }
        return Promise.resolve()
    }
    return {
        route: o,
        href: nt( () => o.value.href),
        isActive: s,
        isExactActive: c,
        navigate: d
    }
}
function Z8(e) {
    return e.length === 1 ? e[0] : e
}
const Q8 = no({
    name: "RouterLink",
    compatConfig: {
        MODE: 3
    },
    props: {
        to: {
            type: [String, Object],
            required: !0
        },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {
            type: String,
            default: "page"
        }
    },
    useLink: A0,
    setup(e, {slots: t}) {
        const r = Ar(A0(e))
          , {options: o} = Xt(hd)
          , i = nt( () => ({
            [k0(e.activeClass, o.linkActiveClass, "router-link-active")]: r.isActive,
            [k0(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: r.isExactActive
        }));
        return () => {
            const s = t.default && Z8(t.default(r));
            return e.custom ? s : Gt("a", {
                "aria-current": r.isExactActive ? e.ariaCurrentValue : null,
                href: r.href,
                onClick: r.navigate,
                class: i.value
            }, s)
        }
    }
})
  , eP = Q8;
function tP(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t))
                return
        }
        return e.preventDefault && e.preventDefault(),
        !0
    }
}
function rP(e, t) {
    for (const r in t) {
        const o = t[r]
          , i = e[r];
        if (typeof o == "string") {
            if (o !== i)
                return !1
        } else if (!vr(i) || i.length !== o.length || o.some( (s, c) => s !== i[c]))
            return !1
    }
    return !0
}
function x0(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const k0 = (e, t, r) => e ?? t ?? r
  , nP = no({
    name: "RouterView",
    inheritAttrs: !1,
    props: {
        name: {
            type: String,
            default: "default"
        },
        route: Object
    },
    compatConfig: {
        MODE: 3
    },
    setup(e, {attrs: t, slots: r}) {
        const o = Xt(Af)
          , i = nt( () => e.route || o.value)
          , s = Xt(P0, 0)
          , c = nt( () => {
            let _ = ze(s);
            const {matched: g} = i.value;
            let l;
            for (; (l = g[_]) && !l.components; )
                _++;
            return _
        }
        )
          , d = nt( () => i.value.matched[c.value]);
        Qn(P0, nt( () => c.value + 1)),
        Qn(Y8, d),
        Qn(Af, i);
        const h = _t();
        return Kr( () => [h.value, d.value, e.name], ([_,g,l], [f,p,y]) => {
            g && (g.instances[l] = _,
            p && p !== g && _ && _ === f && (g.leaveGuards.size || (g.leaveGuards = p.leaveGuards),
            g.updateGuards.size || (g.updateGuards = p.updateGuards))),
            _ && g && (!p || !zo(g, p) || !f) && (g.enterCallbacks[l] || []).forEach(w => w(_))
        }
        , {
            flush: "post"
        }),
        () => {
            const _ = i.value
              , g = e.name
              , l = d.value
              , f = l && l.components[g];
            if (!f)
                return E0(r.default, {
                    Component: f,
                    route: _
                });
            const p = l.props[g]
              , y = p ? p === !0 ? _.params : typeof p == "function" ? p(_) : p : null
              , x = Gt(f, Le({}, y, t, {
                onVnodeUnmounted: P => {
                    P.component.isUnmounted && (l.instances[g] = null)
                }
                ,
                ref: h
            }));
            return E0(r.default, {
                Component: x,
                route: _
            }) || x
        }
    }
});
function E0(e, t) {
    if (!e)
        return null;
    const r = e(t);
    return r.length === 1 ? r[0] : r
}
const pm = nP;
function oP(e) {
    const t = U8(e.routes, e)
      , r = e.parseQuery || X8
      , o = e.stringifyQuery || C0
      , i = e.history
      , s = yi()
      , c = yi()
      , d = yi()
      , h = Bo(pr);
    let _ = pr;
    Ao && e.scrollBehavior && "scrollRestoration"in history && (history.scrollRestoration = "manual");
    const g = Iu.bind(null, V => "" + V)
      , l = Iu.bind(null, m8)
      , f = Iu.bind(null, zi);
    function p(V, se) {
        let oe, ue;
        return lm(V) ? (oe = t.getRecordMatcher(V),
        ue = se) : ue = V,
        t.addRoute(ue, oe)
    }
    function y(V) {
        const se = t.getRecordMatcher(V);
        se && t.removeRoute(se)
    }
    function w() {
        return t.getRoutes().map(V => V.record)
    }
    function x(V) {
        return !!t.getRecordMatcher(V)
    }
    function P(V, se) {
        if (se = Le({}, se || h.value),
        typeof V == "string") {
            const O = ju(r, V, se.path)
              , L = t.resolve({
                path: O.path
            }, se)
              , q = i.createHref(O.fullPath);
            return Le(O, L, {
                params: f(L.params),
                hash: zi(O.hash),
                redirectedFrom: void 0,
                href: q
            })
        }
        let oe;
        if (V.path != null)
            oe = Le({}, V, {
                path: ju(r, V.path, se.path).path
            });
        else {
            const O = Le({}, V.params);
            for (const L in O)
                O[L] == null && delete O[L];
            oe = Le({}, V, {
                params: l(O)
            }),
            se.params = l(se.params)
        }
        const ue = t.resolve(oe, se)
          , xe = V.hash || "";
        ue.params = g(f(ue.params));
        const $e = b8(o, Le({}, V, {
            hash: h8(xe),
            path: ue.path
        }))
          , k = i.createHref($e);
        return Le({
            fullPath: $e,
            hash: xe,
            query: o === C0 ? J8(V.query) : V.query || {}
        }, ue, {
            redirectedFrom: void 0,
            href: k
        })
    }
    function E(V) {
        return typeof V == "string" ? ju(r, V, h.value.path) : Le({}, V)
    }
    function C(V, se) {
        if (_ !== V)
            return Uo(8, {
                from: se,
                to: V
            })
    }
    function S(V) {
        return W(V)
    }
    function M(V) {
        return S(Le(E(V), {
            replace: !0
        }))
    }
    function F(V) {
        const se = V.matched[V.matched.length - 1];
        if (se && se.redirect) {
            const {redirect: oe} = se;
            let ue = typeof oe == "function" ? oe(V) : oe;
            return typeof ue == "string" && (ue = ue.includes("?") || ue.includes("#") ? ue = E(ue) : {
                path: ue
            },
            ue.params = {}),
            Le({
                query: V.query,
                hash: V.hash,
                params: ue.path != null ? {} : V.params
            }, ue)
        }
    }
    function W(V, se) {
        const oe = _ = P(V)
          , ue = h.value
          , xe = V.state
          , $e = V.force
          , k = V.replace === !0
          , O = F(oe);
        if (O)
            return W(Le(E(O), {
                state: typeof O == "object" ? Le({}, xe, O.state) : xe,
                force: $e,
                replace: k
            }), se || oe);
        const L = oe;
        L.redirectedFrom = se;
        let q;
        return !$e && w8(o, ue, oe) && (q = Uo(16, {
            to: L,
            from: ue
        }),
        St(ue, ue, !0, !1)),
        (q ? Promise.resolve(q) : G(L, ue)).catch(z => Nr(z) ? Nr(z, 2) ? z : it(z) : le(z, L, ue)).then(z => {
            if (z) {
                if (Nr(z, 2))
                    return W(Le({
                        replace: k
                    }, E(z.to), {
                        state: typeof z.to == "object" ? Le({}, xe, z.to.state) : xe,
                        force: $e
                    }), se || L)
            } else
                z = U(L, ue, !0, k, xe);
            return ae(L, ue, z),
            z
        }
        )
    }
    function Q(V, se) {
        const oe = C(V, se);
        return oe ? Promise.reject(oe) : Promise.resolve()
    }
    function $(V) {
        const se = et.values().next().value;
        return se && typeof se.runWithContext == "function" ? se.runWithContext(V) : V()
    }
    function G(V, se) {
        let oe;
        const [ue,xe,$e] = iP(V, se);
        oe = Hu(ue.reverse(), "beforeRouteLeave", V, se);
        for (const O of ue)
            O.leaveGuards.forEach(L => {
                oe.push(un(L, V, se))
            }
            );
        const k = Q.bind(null, V, se);
        return oe.push(k),
        mt(oe).then( () => {
            oe = [];
            for (const O of s.list())
                oe.push(un(O, V, se));
            return oe.push(k),
            mt(oe)
        }
        ).then( () => {
            oe = Hu(xe, "beforeRouteUpdate", V, se);
            for (const O of xe)
                O.updateGuards.forEach(L => {
                    oe.push(un(L, V, se))
                }
                );
            return oe.push(k),
            mt(oe)
        }
        ).then( () => {
            oe = [];
            for (const O of $e)
                if (O.beforeEnter)
                    if (vr(O.beforeEnter))
                        for (const L of O.beforeEnter)
                            oe.push(un(L, V, se));
                    else
                        oe.push(un(O.beforeEnter, V, se));
            return oe.push(k),
            mt(oe)
        }
        ).then( () => (V.matched.forEach(O => O.enterCallbacks = {}),
        oe = Hu($e, "beforeRouteEnter", V, se, $),
        oe.push(k),
        mt(oe))).then( () => {
            oe = [];
            for (const O of c.list())
                oe.push(un(O, V, se));
            return oe.push(k),
            mt(oe)
        }
        ).catch(O => Nr(O, 8) ? O : Promise.reject(O))
    }
    function ae(V, se, oe) {
        d.list().forEach(ue => $( () => ue(V, se, oe)))
    }
    function U(V, se, oe, ue, xe) {
        const $e = C(V, se);
        if ($e)
            return $e;
        const k = se === pr
          , O = Ao ? history.state : {};
        oe && (ue || k ? i.replace(V.fullPath, Le({
            scroll: k && O && O.scroll
        }, xe)) : i.push(V.fullPath, xe)),
        h.value = V,
        St(V, se, oe, k),
        it()
    }
    let ce;
    function ve() {
        ce || (ce = i.listen( (V, se, oe) => {
            if (!Ve.listening)
                return;
            const ue = P(V)
              , xe = F(ue);
            if (xe) {
                W(Le(xe, {
                    replace: !0,
                    force: !0
                }), ue).catch(ji);
                return
            }
            _ = ue;
            const $e = h.value;
            Ao && E8(g0($e.fullPath, oe.delta), Xa()),
            G(ue, $e).catch(k => Nr(k, 12) ? k : Nr(k, 2) ? (W(Le(E(k.to), {
                force: !0
            }), ue).then(O => {
                Nr(O, 20) && !oe.delta && oe.type === Ui.pop && i.go(-1, !1)
            }
            ).catch(ji),
            Promise.reject()) : (oe.delta && i.go(-oe.delta, !1),
            le(k, ue, $e))).then(k => {
                k = k || U(ue, $e, !1),
                k && (oe.delta && !Nr(k, 8) ? i.go(-oe.delta, !1) : oe.type === Ui.pop && Nr(k, 20) && i.go(-1, !1)),
                ae(ue, $e, k)
            }
            ).catch(ji)
        }
        ))
    }
    let Pe = yi(), Y = yi(), he;
    function le(V, se, oe) {
        it(V);
        const ue = Y.list();
        return ue.length && ue.forEach(xe => xe(V, se, oe)),
        Promise.reject(V)
    }
    function Fe() {
        return he && h.value !== pr ? Promise.resolve() : new Promise( (V, se) => {
            Pe.add([V, se])
        }
        )
    }
    function it(V) {
        return he || (he = !V,
        ve(),
        Pe.list().forEach( ([se,oe]) => V ? oe(V) : se()),
        Pe.reset()),
        V
    }
    function St(V, se, oe, ue) {
        const {scrollBehavior: xe} = e;
        if (!Ao || !xe)
            return Promise.resolve();
        const $e = !oe && O8(g0(V.fullPath, 0)) || (ue || !oe) && history.state && history.state.scroll || null;
        return Na().then( () => xe(V, se, $e)).then(k => k && k8(k)).catch(k => le(k, V, se))
    }
    const at = V => i.go(V);
    let Re;
    const et = new Set
      , Ve = {
        currentRoute: h,
        listening: !0,
        addRoute: p,
        removeRoute: y,
        clearRoutes: t.clearRoutes,
        hasRoute: x,
        getRoutes: w,
        resolve: P,
        options: e,
        push: S,
        replace: M,
        go: at,
        back: () => at(-1),
        forward: () => at(1),
        beforeEach: s.add,
        beforeResolve: c.add,
        afterEach: d.add,
        onError: Y.add,
        isReady: Fe,
        install(V) {
            const se = this;
            V.component("RouterLink", eP),
            V.component("RouterView", pm),
            V.config.globalProperties.$router = se,
            Object.defineProperty(V.config.globalProperties, "$route", {
                enumerable: !0,
                get: () => ze(h)
            }),
            Ao && !Re && h.value === pr && (Re = !0,
            S(i.location).catch(xe => {}
            ));
            const oe = {};
            for (const xe in pr)
                Object.defineProperty(oe, xe, {
                    get: () => h.value[xe],
                    enumerable: !0
                });
            V.provide(hd, se),
            V.provide(dm, zr(oe)),
            V.provide(Af, h);
            const ue = V.unmount;
            et.add(V),
            V.unmount = function() {
                et.delete(V),
                et.size < 1 && (_ = pr,
                ce && ce(),
                ce = null,
                h.value = pr,
                Re = !1,
                he = !1),
                ue()
            }
        }
    };
    function mt(V) {
        return V.reduce( (se, oe) => se.then( () => $(oe)), Promise.resolve())
    }
    return Ve
}
function iP(e, t) {
    const r = []
      , o = []
      , i = []
      , s = Math.max(t.matched.length, e.matched.length);
    for (let c = 0; c < s; c++) {
        const d = t.matched[c];
        d && (e.matched.find(_ => zo(_, d)) ? o.push(d) : r.push(d));
        const h = e.matched[c];
        h && (t.matched.find(_ => zo(_, h)) || i.push(h))
    }
    return [r, o, i]
}
const sP = /(:\w+)\([^)]+\)/g
  , aP = /(:\w+)[?+*]/g
  , lP = /:\w+/g
  , cP = (e, t) => t.path.replace(sP, "$1").replace(aP, "$1").replace(lP, r => e.params[r.slice(1)]?.toString() || "")
  , xf = (e, t) => {
    const r = e.route.matched.find(i => i.components?.default === e.Component.type)
      , o = t ?? r?.meta.key ?? (r && cP(e.route, r));
    return typeof o == "function" ? o(e.route) : o
}
  , uP = (e, t) => ({
    default: () => e ? Gt(Dg, e === !0 ? {} : e, t) : t
});
function gd(e) {
    return Array.isArray(e) ? e : [e]
}
const Du = [{
    name: "id",
    path: "/:id()",
    component: () => qr( () => import("./fC1lwDTD.js"), __vite__mapDeps([0, 1]), import.meta.url)
}, {
    name: "index",
    path: "/",
    component: () => qr( () => import("./BRqRLMpX.js"), [], import.meta.url)
}, {
    name: "metaverse",
    path: "/metaverse",
    component: () => qr( () => import("./CRj5VNwn.js"), [], import.meta.url)
}, {
    name: "slides-id",
    path: "/slides/:id()",
    component: () => qr( () => import("./CkHkKnIE.js"), __vite__mapDeps([2, 3]), import.meta.url)
}]
  , fP = (e, t) => ({
    default: () => e ? Gt(to, e === !0 ? {} : e, t) : t.default?.()
})
  , dP = /(:\w+)\([^)]+\)/g
  , pP = /(:\w+)[?+*]/g
  , hP = /:\w+/g;
function O0(e) {
    const t = e?.meta.key ?? e.path.replace(dP, "$1").replace(pP, "$1").replace(hP, r => e.params[r.slice(1)]?.toString() || "");
    return typeof t == "function" ? t(e) : t
}
function gP(e, t) {
    return e === t || t === pr ? !1 : O0(e) !== O0(t) ? !0 : !e.matched.every( (o, i) => o.components && o.components.default === t.matched[i]?.components?.default)
}
const _P = {
    scrollBehavior(e, t, r) {
        const o = Ke()
          , i = Jt().options?.scrollBehaviorType ?? "auto";
        let s = r || void 0;
        const c = typeof e.meta.scrollToTop == "function" ? e.meta.scrollToTop(e, t) : e.meta.scrollToTop;
        if (!s && t && e && c !== !1 && gP(e, t) && (s = {
            left: 0,
            top: 0
        }),
        e.path === t.path)
            return t.hash && !e.hash ? {
                left: 0,
                top: 0
            } : e.hash ? {
                el: e.hash,
                top: R0(e.hash),
                behavior: i
            } : !1;
        const d = _ => !!(_.meta.pageTransition ?? hf)
          , h = d(t) && d(e) ? "page:transition:finish" : "page:finish";
        return new Promise(_ => {
            o.hooks.hookOnce(h, async () => {
                await new Promise(g => setTimeout(g, 0)),
                e.hash && (s = {
                    el: e.hash,
                    top: R0(e.hash),
                    behavior: i
                }),
                _(s)
            }
            )
        }
        )
    }
};
function R0(e) {
    try {
        const t = document.querySelector(e);
        if (t)
            return (Number.parseFloat(getComputedStyle(t).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0)
    } catch {}
    return 0
}
const mP = {
    hashMode: !1,
    scrollBehaviorType: "auto"
}
  , br = {
    ...mP,
    ..._P
}
  , vP = async e => {
    let t, r;
    if (!e.meta?.validate)
        return;
    const o = Ke()
      , i = Jt()
      , s = ([t,r] = Lo( () => Promise.resolve(e.meta.validate(e))),
    t = await t,
    r(),
    t);
    if (s === !0)
        return;
    const c = es({
        statusCode: s && s.statusCode || 404,
        statusMessage: s && s.statusMessage || `Page Not Found: ${e.fullPath}`,
        data: {
            path: e.fullPath
        }
    })
      , d = i.beforeResolve(h => {
        if (d(),
        h === e) {
            const _ = i.afterEach(async () => {
                _(),
                await o.runWithContext( () => Ro(c)),
                window?.history.pushState({}, "", e.fullPath)
            }
            );
            return !1
        }
    }
    )
}
  , yP = async e => {
    let t, r;
    const o = ([t,r] = Lo( () => fd({
        path: e.path
    })),
    t = await t,
    r(),
    t);
    if (o.redirect)
        return mn(o.redirect, {
            acceptRelative: !0
        }) ? (window.location.href = o.redirect,
        !1) : o.redirect
}
  , bP = [vP, yP]
  , kf = {};
function wP(e, t, r) {
    const {pathname: o, search: i, hash: s} = t
      , c = e.indexOf("#");
    if (c > -1) {
        const _ = s.includes(e.slice(c)) ? e.slice(c).length : 1;
        let g = s.slice(_);
        return g[0] !== "/" && (g = "/" + g),
        Xh(g, "")
    }
    const d = Xh(o, e)
      , h = !r || wS(d, r, {
        trailingSlash: !0
    }) ? d : r;
    return h + (h.includes("?") ? "" : i) + s
}
const TP = $t({
    name: "nuxt:router",
    enforce: "pre",
    async setup(e) {
        let t, r, o = oo().app.baseURL;
        const i = br.history?.(o) ?? j8(o)
          , s = br.routes ? ([t,r] = Lo( () => br.routes(Du)),
        t = await t,
        r(),
        t ?? Du) : Du;
        let c;
        const d = oP({
            ...br,
            scrollBehavior: (x, P, E) => {
                if (P === pr) {
                    c = E;
                    return
                }
                if (br.scrollBehavior) {
                    if (d.options.scrollBehavior = br.scrollBehavior,
                    "scrollRestoration"in window.history) {
                        const C = d.beforeEach( () => {
                            C(),
                            window.history.scrollRestoration = "manual"
                        }
                        )
                    }
                    return br.scrollBehavior(x, pr, c || E)
                }
            }
            ,
            history: i,
            routes: s
        });
        br.routes && br.routes,
        "scrollRestoration"in window.history && (window.history.scrollRestoration = "auto"),
        e.vueApp.use(d);
        const h = Bo(d.currentRoute.value);
        d.afterEach( (x, P) => {
            h.value = P
        }
        ),
        Object.defineProperty(e.vueApp.config.globalProperties, "previousRoute", {
            get: () => h.value
        });
        const _ = wP(o, window.location, e.payload.path)
          , g = Bo(d.currentRoute.value)
          , l = () => {
            g.value = d.currentRoute.value
        }
        ;
        e.hook("page:finish", l),
        d.afterEach( (x, P) => {
            x.matched[0]?.components?.default === P.matched[0]?.components?.default && l()
        }
        );
        const f = {};
        for (const x in g.value)
            Object.defineProperty(f, x, {
                get: () => g.value[x],
                enumerable: !0
            });
        e._route = zr(f),
        e._middleware ||= {
            global: [],
            named: {}
        };
        const p = Go();
        d.afterEach(async (x, P, E) => {
            delete e._processingMiddleware,
            !e.isHydrating && p.value && await e.runWithContext(tC),
            E && await e.callHook("page:loading:end")
        }
        );
        try {
            [t,r] = Lo( () => d.isReady()),
            await t,
            r()
        } catch (x) {
            [t,r] = Lo( () => e.runWithContext( () => Ro(x))),
            await t,
            r()
        }
        const y = _ !== d.currentRoute.value.fullPath ? d.resolve(_) : d.currentRoute.value;
        l();
        const w = e.payload.state._layout;
        return d.beforeEach(async (x, P) => {
            await e.callHook("page:loading:start"),
            x.meta = Ar(x.meta),
            e.isHydrating && w && !pn(x.meta.layout) && (x.meta.layout = w),
            e._processingMiddleware = !0;
            {
                const E = new Set([...bP, ...e._middleware.global]);
                for (const C of x.matched) {
                    const S = C.meta.middleware;
                    if (S)
                        for (const M of gd(S))
                            E.add(M)
                }
                {
                    const C = await e.runWithContext( () => fd({
                        path: x.path
                    }));
                    if (C.appMiddleware)
                        for (const S in C.appMiddleware)
                            C.appMiddleware[S] ? E.add(S) : E.delete(S)
                }
                for (const C of E) {
                    const S = typeof C == "string" ? e._middleware.named[C] || await kf[C]?.().then(F => F.default || F) : C;
                    if (!S)
                        throw new Error(`Unknown route middleware: '${C}'.`);
                    const M = await e.runWithContext( () => S(x, P));
                    if (!e.payload.serverRendered && e.isHydrating && (M === !1 || M instanceof Error)) {
                        const F = M || _f({
                            statusCode: 404,
                            statusMessage: `Page Not Found: ${_}`
                        });
                        return await e.runWithContext( () => Ro(F)),
                        !1
                    }
                    if (M !== !0 && (M || M === !1))
                        return M
                }
            }
        }
        ),
        d.onError(async () => {
            delete e._processingMiddleware,
            await e.callHook("page:loading:end")
        }
        ),
        d.afterEach(async (x, P) => {
            x.matched.length === 0 && await e.runWithContext( () => Ro(_f({
                statusCode: 404,
                fatal: !1,
                statusMessage: `Page not found: ${x.fullPath}`,
                data: {
                    path: x.fullPath
                }
            })))
        }
        ),
        e.hooks.hookOnce("app:created", async () => {
            try {
                "name"in y && (y.name = void 0),
                await d.replace({
                    ...y,
                    force: !0
                }),
                d.options.scrollBehavior = br.scrollBehavior
            } catch (x) {
                await e.runWithContext( () => Ro(x))
            }
        }
        ),
        {
            provide: {
                router: d
            }
        }
    }
});
function SP(e) {
    return typeof e == "string" ? `'${e}'` : new CP().serialize(e)
}
const CP = function() {
    class e {
        #e = new Map;
        compare(r, o) {
            const i = typeof r
              , s = typeof o;
            return i === "string" && s === "string" ? r.localeCompare(o) : i === "number" && s === "number" ? r - o : String.prototype.localeCompare.call(this.serialize(r, !0), this.serialize(o, !0))
        }
        serialize(r, o) {
            if (r === null)
                return "null";
            switch (typeof r) {
            case "string":
                return o ? r : `'${r}'`;
            case "bigint":
                return `${r}n`;
            case "object":
                return this.$object(r);
            case "function":
                return this.$function(r)
            }
            return String(r)
        }
        serializeObject(r) {
            const o = Object.prototype.toString.call(r);
            if (o !== "[object Object]")
                return this.serializeBuiltInType(o.length < 10 ? `unknown:${o}` : o.slice(8, -1), r);
            const i = r.constructor
              , s = i === Object || i === void 0 ? "" : i.name;
            if (s !== "" && globalThis[s] === i)
                return this.serializeBuiltInType(s, r);
            if (typeof r.toJSON == "function") {
                const c = r.toJSON();
                return s + (c !== null && typeof c == "object" ? this.$object(c) : `(${this.serialize(c)})`)
            }
            return this.serializeObjectEntries(s, Object.entries(r))
        }
        serializeBuiltInType(r, o) {
            const i = this["$" + r];
            if (i)
                return i.call(this, o);
            if (typeof o?.entries == "function")
                return this.serializeObjectEntries(r, o.entries());
            throw new Error(`Cannot serialize ${r}`)
        }
        serializeObjectEntries(r, o) {
            const i = Array.from(o).sort( (c, d) => this.compare(c[0], d[0]));
            let s = `${r}{`;
            for (let c = 0; c < i.length; c++) {
                const [d,h] = i[c];
                s += `${this.serialize(d, !0)}:${this.serialize(h)}`,
                c < i.length - 1 && (s += ",")
            }
            return s + "}"
        }
        $object(r) {
            let o = this.#e.get(r);
            return o === void 0 && (this.#e.set(r, `#${this.#e.size}`),
            o = this.serializeObject(r),
            this.#e.set(r, o)),
            o
        }
        $function(r) {
            const o = Function.prototype.toString.call(r);
            return o.slice(-15) === "[native code] }" ? `${r.name || ""}()[native]` : `${r.name}(${r.length})${o.replace(/\s*\n\s*/g, "")}`
        }
        $Array(r) {
            let o = "[";
            for (let i = 0; i < r.length; i++)
                o += this.serialize(r[i]),
                i < r.length - 1 && (o += ",");
            return o + "]"
        }
        $Date(r) {
            try {
                return `Date(${r.toISOString()})`
            } catch {
                return "Date(null)"
            }
        }
        $ArrayBuffer(r) {
            return `ArrayBuffer[${new Uint8Array(r).join(",")}]`
        }
        $Set(r) {
            return `Set${this.$Array(Array.from(r).sort( (o, i) => this.compare(o, i)))}`
        }
        $Map(r) {
            return this.serializeObjectEntries("Map", r.entries())
        }
    }
    for (const t of ["Error", "RegExp", "URL"])
        e.prototype["$" + t] = function(r) {
            return `${t}(${r})`
        }
        ;
    for (const t of ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"])
        e.prototype["$" + t] = function(r) {
            return `${t}[${r.join(",")}]`
        }
        ;
    for (const t of ["BigInt64Array", "BigUint64Array"])
        e.prototype["$" + t] = function(r) {
            return `${t}[${r.join("n,")}${r.length > 0 ? "n" : ""}]`
        }
        ;
    return e
}()
  , PP = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225]
  , AP = [1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998]
  , xP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
  , Kn = [];
class kP {
    _data = new ta;
    _hash = new ta([...PP]);
    _nDataBytes = 0;
    _minBufferSize = 0;
    finalize(t) {
        t && this._append(t);
        const r = this._nDataBytes * 8
          , o = this._data.sigBytes * 8;
        return this._data.words[o >>> 5] |= 128 << 24 - o % 32,
        this._data.words[(o + 64 >>> 9 << 4) + 14] = Math.floor(r / 4294967296),
        this._data.words[(o + 64 >>> 9 << 4) + 15] = r,
        this._data.sigBytes = this._data.words.length * 4,
        this._process(),
        this._hash
    }
    _doProcessBlock(t, r) {
        const o = this._hash.words;
        let i = o[0]
          , s = o[1]
          , c = o[2]
          , d = o[3]
          , h = o[4]
          , _ = o[5]
          , g = o[6]
          , l = o[7];
        for (let f = 0; f < 64; f++) {
            if (f < 16)
                Kn[f] = t[r + f] | 0;
            else {
                const C = Kn[f - 15]
                  , S = (C << 25 | C >>> 7) ^ (C << 14 | C >>> 18) ^ C >>> 3
                  , M = Kn[f - 2]
                  , F = (M << 15 | M >>> 17) ^ (M << 13 | M >>> 19) ^ M >>> 10;
                Kn[f] = S + Kn[f - 7] + F + Kn[f - 16]
            }
            const p = h & _ ^ ~h & g
              , y = i & s ^ i & c ^ s & c
              , w = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22)
              , x = (h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25)
              , P = l + x + p + AP[f] + Kn[f]
              , E = w + y;
            l = g,
            g = _,
            _ = h,
            h = d + P | 0,
            d = c,
            c = s,
            s = i,
            i = P + E | 0
        }
        o[0] = o[0] + i | 0,
        o[1] = o[1] + s | 0,
        o[2] = o[2] + c | 0,
        o[3] = o[3] + d | 0,
        o[4] = o[4] + h | 0,
        o[5] = o[5] + _ | 0,
        o[6] = o[6] + g | 0,
        o[7] = o[7] + l | 0
    }
    _append(t) {
        typeof t == "string" && (t = ta.fromUtf8(t)),
        this._data.concat(t),
        this._nDataBytes += t.sigBytes
    }
    _process(t) {
        let r, o = this._data.sigBytes / 64;
        t ? o = Math.ceil(o) : o = Math.max((o | 0) - this._minBufferSize, 0);
        const i = o * 16
          , s = Math.min(i * 4, this._data.sigBytes);
        if (i) {
            for (let c = 0; c < i; c += 16)
                this._doProcessBlock(this._data.words, c);
            r = this._data.words.splice(0, i),
            this._data.sigBytes -= s
        }
        return new ta(r,s)
    }
}
let ta = class hm {
    words;
    sigBytes;
    constructor(t, r) {
        t = this.words = t || [],
        this.sigBytes = r === void 0 ? t.length * 4 : r
    }
    static fromUtf8(t) {
        const r = unescape(encodeURIComponent(t))
          , o = r.length
          , i = [];
        for (let s = 0; s < o; s++)
            i[s >>> 2] |= (r.charCodeAt(s) & 255) << 24 - s % 4 * 8;
        return new hm(i,o)
    }
    toBase64() {
        const t = [];
        for (let r = 0; r < this.sigBytes; r += 3) {
            const o = this.words[r >>> 2] >>> 24 - r % 4 * 8 & 255
              , i = this.words[r + 1 >>> 2] >>> 24 - (r + 1) % 4 * 8 & 255
              , s = this.words[r + 2 >>> 2] >>> 24 - (r + 2) % 4 * 8 & 255
              , c = o << 16 | i << 8 | s;
            for (let d = 0; d < 4 && r * 8 + d * 6 < this.sigBytes * 8; d++)
                t.push(xP.charAt(c >>> 6 * (3 - d) & 63))
        }
        return t.join("")
    }
    concat(t) {
        if (this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8,
        this.words.length = Math.ceil(this.sigBytes / 4),
        this.sigBytes % 4)
            for (let r = 0; r < t.sigBytes; r++) {
                const o = t.words[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                this.words[this.sigBytes + r >>> 2] |= o << 24 - (this.sigBytes + r) % 4 * 8
            }
        else
            for (let r = 0; r < t.sigBytes; r += 4)
                this.words[this.sigBytes + r >>> 2] = t.words[r >>> 2];
        this.sigBytes += t.sigBytes
    }
}
;
function EP(e) {
    return new kP().finalize(e).toBase64()
}
function OP(e) {
    return EP(SP(e))
}
const Ef = globalThis.requestIdleCallback || (e => {
    const t = Date.now()
      , r = {
        didTimeout: !1,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - t))
    };
    return setTimeout( () => {
        e(r)
    }
    , 1)
}
)
  , RP = globalThis.cancelIdleCallback || (e => {
    clearTimeout(e)
}
)
  , Ja = e => {
    const t = Ke();
    t.isHydrating ? t.hooks.hookOnce("app:suspense:resolve", () => {
        Ef( () => e())
    }
    ) : Ef( () => e())
}
  , MP = e => e === "defer" || e === !1;
function IP(...e) {
    const t = typeof e[e.length - 1] == "string" ? e.pop() : void 0;
    typeof e[0] != "string" && e.unshift(t);
    let[r,o,i={}] = e;
    if (typeof r != "string")
        throw new TypeError("[nuxt] [asyncData] key must be a string.");
    if (typeof o != "function")
        throw new TypeError("[nuxt] [asyncData] handler must be a function.");
    const s = Ke()
      , c = o
      , d = () => Oo.value
      , h = () => s.isHydrating ? s.payload.data[r] : s.static.data[r];
    i.server ??= !0,
    i.default ??= d,
    i.getCachedData ??= h,
    i.lazy ??= !1,
    i.immediate ??= !0,
    i.deep ??= Oo.deep,
    i.dedupe ??= "cancel";
    const _ = i.getCachedData(r, s)
      , g = _ != null;
    if (!s._asyncData[r] || !i.immediate) {
        s.payload._errors[r] ??= Oo.errorValue;
        const w = i.deep ? _t : Bo;
        s._asyncData[r] = {
            data: w(g ? _ : i.default()),
            pending: _t(!g),
            error: qf(s.payload._errors, r),
            status: _t("idle"),
            _default: i.default
        }
    }
    const l = {
        ...s._asyncData[r]
    };
    delete l._default,
    l.refresh = l.execute = (w={}) => {
        if (s._asyncDataPromises[r]) {
            if (MP(w.dedupe ?? i.dedupe))
                return s._asyncDataPromises[r];
            s._asyncDataPromises[r].cancelled = !0
        }
        if (w._initial || s.isHydrating && w._initial !== !1) {
            const P = w._initial ? _ : i.getCachedData(r, s);
            if (P != null)
                return Promise.resolve(P)
        }
        l.pending.value = !0,
        l.status.value = "pending";
        const x = new Promise( (P, E) => {
            try {
                P(c(s))
            } catch (C) {
                E(C)
            }
        }
        ).then(async P => {
            if (x.cancelled)
                return s._asyncDataPromises[r];
            let E = P;
            i.transform && (E = await i.transform(P)),
            i.pick && (E = HP(E, i.pick)),
            s.payload.data[r] = E,
            l.data.value = E,
            l.error.value = Oo.errorValue,
            l.status.value = "success"
        }
        ).catch(P => {
            if (x.cancelled)
                return s._asyncDataPromises[r];
            l.error.value = es(P),
            l.data.value = ze(i.default()),
            l.status.value = "error"
        }
        ).finally( () => {
            x.cancelled || (l.pending.value = !1,
            delete s._asyncDataPromises[r])
        }
        );
        return s._asyncDataPromises[r] = x,
        s._asyncDataPromises[r]
    }
    ,
    l.clear = () => jP(s, r);
    const f = () => l.refresh({
        _initial: !0
    })
      , p = i.server !== !1 && s.payload.serverRendered;
    {
        const w = Zi();
        if (w && p && i.immediate && !w.sp && (w.sp = []),
        w && !w._nuxtOnBeforeMountCbs) {
            w._nuxtOnBeforeMountCbs = [];
            const E = w._nuxtOnBeforeMountCbs;
            Fg( () => {
                E.forEach(C => {
                    C()
                }
                ),
                E.splice(0, E.length)
            }
            ),
            Gf( () => E.splice(0, E.length))
        }
        p && s.isHydrating && (l.error.value || _ != null) ? (l.pending.value = !1,
        l.status.value = l.error.value ? "error" : "success") : w && (s.payload.serverRendered && s.isHydrating || i.lazy) && i.immediate ? w._nuxtOnBeforeMountCbs.push(f) : i.immediate && f();
        const x = Lf();
        if (i.watch) {
            const E = Kr(i.watch, () => l.refresh());
            x && ch(E)
        }
        const P = s.hook("app:data:refresh", async E => {
            (!E || E.includes(r)) && await l.refresh()
        }
        );
        x && ch(P)
    }
    const y = Promise.resolve(s._asyncDataPromises[r]).then( () => l);
    return Object.assign(y, l),
    y
}
function jP(e, t) {
    t in e.payload.data && (e.payload.data[t] = void 0),
    t in e.payload._errors && (e.payload._errors[t] = Oo.errorValue),
    e._asyncData[t] && (e._asyncData[t].data.value = void 0,
    e._asyncData[t].error.value = Oo.errorValue,
    e._asyncData[t].pending.value = !1,
    e._asyncData[t].status.value = "idle"),
    t in e._asyncDataPromises && (e._asyncDataPromises[t] && (e._asyncDataPromises[t].cancelled = !0),
    e._asyncDataPromises[t] = void 0)
}
function HP(e, t) {
    const r = {};
    for (const o of t)
        r[o] = e[o];
    return r
}
const DP = "$s";
function LP(...e) {
    const t = typeof e[e.length - 1] == "string" ? e.pop() : void 0;
    typeof e[0] != "string" && e.unshift(t);
    const [r,o] = e;
    if (!r || typeof r != "string")
        throw new TypeError("[nuxt] [useState] key must be a string: " + r);
    if (o !== void 0 && typeof o != "function")
        throw new Error("[nuxt] [useState] init must be a function: " + o);
    const i = DP + r
      , s = Ke()
      , c = qf(s.payload.state, i);
    if (c.value === void 0 && o) {
        const d = o();
        if (ut(d))
            return s.payload.state[i] = d,
            d;
        c.value = d
    }
    return c
}
function BP(e, t, r) {
    const [o={},i] = typeof t == "string" ? [{}, t] : [t, r]
      , s = nt( () => $r(e))
      , c = o.key || OP([i, typeof s.value == "string" ? s.value : "", ...NP(o)]);
    if (!c || typeof c != "string")
        throw new TypeError("[nuxt] [useFetch] key must be a string: " + c);
    if (!e)
        throw new Error("[nuxt] [useFetch] request is missing.");
    const d = c === i ? "$f" + c : c;
    if (!o.baseURL && typeof s.value == "string" && s.value[0] === "/" && s.value[1] === "/")
        throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
    const {server: h, lazy: _, default: g, transform: l, pick: f, watch: p, immediate: y, getCachedData: w, deep: x, dedupe: P, ...E} = o
      , C = Ar({
        ...BS,
        ...E,
        cache: typeof o.cache == "boolean" ? void 0 : o.cache
    })
      , S = {
        server: h,
        lazy: _,
        default: g,
        transform: l,
        pick: f,
        immediate: y,
        getCachedData: w,
        deep: x,
        dedupe: P,
        watch: p === !1 ? [] : [C, s, ...p || []]
    };
    let M;
    return IP(d, () => {
        M?.abort?.(new DOMException("Request aborted as another request to the same endpoint was initiated.","AbortError")),
        M = typeof AbortController < "u" ? new AbortController : {};
        const W = $r(o.timeout);
        let Q;
        return W && (Q = setTimeout( () => M.abort(new DOMException("Request aborted due to timeout.","AbortError")), W),
        M.signal.onabort = () => clearTimeout(Q)),
        (o.$fetch || globalThis.$fetch)(s.value, {
            signal: M.signal,
            ...C
        }).finally( () => {
            clearTimeout(Q)
        }
        )
    }
    , S)
}
function NP(e) {
    const t = [$r(e.method)?.toUpperCase() || "GET", $r(e.baseURL)];
    for (const r of [e.params || e.query]) {
        const o = $r(r);
        if (!o)
            continue;
        const i = {};
        for (const [s,c] of Object.entries(o))
            i[$r(s)] = $r(c);
        t.push(i)
    }
    return t
}
async function gm(e, t=Jt()) {
    const {path: r, matched: o} = t.resolve(e);
    if (!o.length || (t._routePreloaded ||= new Set,
    t._routePreloaded.has(r)))
        return;
    const i = t._preloadPromises ||= [];
    if (i.length > 4)
        return Promise.all(i).then( () => gm(e, t));
    t._routePreloaded.add(r);
    const s = o.map(c => c.components?.default).filter(c => typeof c == "function");
    for (const c of s) {
        const d = Promise.resolve(c()).catch( () => {}
        ).finally( () => i.splice(i.indexOf(d)));
        i.push(d)
    }
    await Promise.all(i)
}
function FP(e={}) {
    const t = e.path || window.location.pathname;
    let r = {};
    try {
        r = Sa(sessionStorage.getItem("nuxt:reload") || "{}")
    } catch {}
    if (e.force || r?.path !== t || r?.expires < Date.now()) {
        try {
            sessionStorage.setItem("nuxt:reload", JSON.stringify({
                path: t,
                expires: Date.now() + (e.ttl ?? 1e4)
            }))
        } catch {}
        if (e.persistState)
            try {
                sessionStorage.setItem("nuxt:reload:state", JSON.stringify({
                    state: Ke().payload.state
                }))
            } catch {}
        window.location.pathname !== t ? window.location.href = t : window.location.reload()
    }
}
const VP = (...e) => e.find(t => t !== void 0);
function $P(e) {
    const t = e.componentName || "NuxtLink";
    function r(s) {
        return typeof s == "string" && s.startsWith("#")
    }
    function o(s, c) {
        if (!s || e.trailingSlash !== "append" && e.trailingSlash !== "remove")
            return s;
        if (typeof s == "string")
            return M0(s, e.trailingSlash);
        const d = "path"in s && s.path !== void 0 ? s.path : c(s).path;
        return {
            ...s,
            name: void 0,
            path: M0(d, e.trailingSlash)
        }
    }
    function i(s) {
        const c = Jt()
          , d = oo()
          , h = nt( () => !!s.target && s.target !== "_self")
          , _ = nt( () => {
            const x = s.to || s.href || "";
            return typeof x == "string" && mn(x, {
                acceptRelative: !0
            })
        }
        )
          , g = mh("RouterLink")
          , l = typeof g != "string" ? g.useLink : void 0
          , f = nt( () => {
            if (s.external)
                return !0;
            const x = s.to || s.href || "";
            return typeof x == "object" ? !1 : x === "" || _.value
        }
        )
          , p = nt( () => {
            const x = s.to || s.href || "";
            return f.value ? x : o(x, c.resolve)
        }
        )
          , y = f.value ? void 0 : l?.({
            ...s,
            to: p
        })
          , w = nt( () => {
            if (!p.value || _.value || r(p.value))
                return p.value;
            if (f.value) {
                const x = typeof p.value == "object" && "path"in p.value ? vf(p.value) : p.value
                  , P = typeof x == "object" ? c.resolve(x).href : x;
                return o(P, c.resolve)
            }
            return typeof p.value == "object" ? c.resolve(p.value)?.href ?? null : o(id(d.app.baseURL, p.value), c.resolve)
        }
        );
        return {
            to: p,
            hasTarget: h,
            isAbsoluteUrl: _,
            isExternal: f,
            href: w,
            isActive: y?.isActive ?? nt( () => p.value === c.currentRoute.value.path),
            isExactActive: y?.isExactActive ?? nt( () => p.value === c.currentRoute.value.path),
            route: y?.route ?? nt( () => c.resolve(p.value)),
            async navigate(x) {
                await eC(w.value, {
                    replace: s.replace,
                    external: f.value || h.value
                })
            }
        }
    }
    return no({
        name: t,
        props: {
            to: {
                type: [String, Object],
                default: void 0,
                required: !1
            },
            href: {
                type: [String, Object],
                default: void 0,
                required: !1
            },
            target: {
                type: String,
                default: void 0,
                required: !1
            },
            rel: {
                type: String,
                default: void 0,
                required: !1
            },
            noRel: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            prefetch: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            prefetchOn: {
                type: [String, Object],
                default: void 0,
                required: !1
            },
            noPrefetch: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            activeClass: {
                type: String,
                default: void 0,
                required: !1
            },
            exactActiveClass: {
                type: String,
                default: void 0,
                required: !1
            },
            prefetchedClass: {
                type: String,
                default: void 0,
                required: !1
            },
            replace: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            ariaCurrentValue: {
                type: String,
                default: void 0,
                required: !1
            },
            external: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            custom: {
                type: Boolean,
                default: void 0,
                required: !1
            }
        },
        useLink: i,
        setup(s, {slots: c}) {
            const d = Jt()
              , {to: h, href: _, navigate: g, isExternal: l, hasTarget: f, isAbsoluteUrl: p} = i(s)
              , y = _t(!1)
              , w = _t(null)
              , x = C => {
                w.value = s.custom ? C?.$el?.nextElementSibling : C?.$el
            }
            ;
            function P(C) {
                return !y.value && (typeof s.prefetchOn == "string" ? s.prefetchOn === C : s.prefetchOn?.[C] ?? e.prefetchOn?.[C]) && (s.prefetch ?? e.prefetch) !== !1 && s.noPrefetch !== !0 && s.target !== "_blank" && !KP()
            }
            async function E(C=Ke()) {
                if (y.value)
                    return;
                y.value = !0;
                const S = typeof h.value == "string" ? h.value : l.value ? vf(h.value) : d.resolve(h.value).fullPath
                  , M = l.value ? new URL(S,window.location.href).href : S;
                await Promise.all([C.hooks.callHook("link:prefetch", M).catch( () => {}
                ), !l.value && !f.value && gm(h.value, d).catch( () => {}
                )])
            }
            if (P("visibility")) {
                const C = Ke();
                let S, M = null;
                Xi( () => {
                    const F = UP();
                    Ja( () => {
                        S = Ef( () => {
                            w?.value?.tagName && (M = F.observe(w.value, async () => {
                                M?.(),
                                M = null,
                                await E(C)
                            }
                            ))
                        }
                        )
                    }
                    )
                }
                ),
                Ji( () => {
                    S && RP(S),
                    M?.(),
                    M = null
                }
                )
            }
            return () => {
                if (!l.value && !f.value && !r(h.value)) {
                    const M = {
                        ref: x,
                        to: h.value,
                        activeClass: s.activeClass || e.activeClass,
                        exactActiveClass: s.exactActiveClass || e.exactActiveClass,
                        replace: s.replace,
                        ariaCurrentValue: s.ariaCurrentValue,
                        custom: s.custom
                    };
                    return s.custom || (P("interaction") && (M.onPointerenter = E.bind(null, void 0),
                    M.onFocus = E.bind(null, void 0)),
                    y.value && (M.class = s.prefetchedClass || e.prefetchedClass),
                    M.rel = s.rel || void 0),
                    Gt(mh("RouterLink"), M, c.default)
                }
                const C = s.target || null
                  , S = VP(s.noRel ? "" : s.rel, e.externalRelAttribute, p.value || f.value ? "noopener noreferrer" : "") || null;
                return s.custom ? c.default ? c.default({
                    href: _.value,
                    navigate: g,
                    prefetch: E,
                    get route() {
                        if (!_.value)
                            return;
                        const M = new URL(_.value,window.location.href);
                        return {
                            path: M.pathname,
                            fullPath: M.pathname,
                            get query() {
                                return nd(M.search)
                            },
                            hash: M.hash,
                            params: {},
                            name: void 0,
                            matched: [],
                            redirectedFrom: void 0,
                            meta: {},
                            href: _.value
                        }
                    },
                    rel: S,
                    target: C,
                    isExternal: l.value || f.value,
                    isActive: !1,
                    isExactActive: !1
                }) : null : Gt("a", {
                    ref: w,
                    href: _.value || null,
                    rel: S,
                    target: C
                }, c.default?.())
            }
        }
    })
}
const zP = $P(DS);
function M0(e, t) {
    const r = t === "append" ? Aa : od;
    return mn(e) && !e.startsWith("http") ? e : r(e, !0)
}
function UP() {
    const e = Ke();
    if (e._observer)
        return e._observer;
    let t = null;
    const r = new Map
      , o = (s, c) => (t ||= new IntersectionObserver(d => {
        for (const h of d) {
            const _ = r.get(h.target);
            (h.isIntersecting || h.intersectionRatio > 0) && _ && _()
        }
    }
    ),
    r.set(s, c),
    t.observe(s),
    () => {
        r.delete(s),
        t?.unobserve(s),
        r.size === 0 && (t?.disconnect(),
        t = null)
    }
    );
    return e._observer = {
        observe: o
    }
}
const qP = /2g/;
function KP() {
    const e = navigator.connection;
    return !!(e && (e.saveData || qP.test(e.effectiveType)))
}
function WP(e) {
    typeof e.indexable < "u" && (e.indexable = String(e.indexable) !== "false"),
    typeof e.trailingSlash < "u" && !e.trailingSlash && (e.trailingSlash = String(e.trailingSlash) !== "false"),
    e.url && !Ua(String(e.url), {
        acceptRelative: !0,
        strict: !1
    }) && (e.url = MT(String(e.url)));
    const t = Object.keys(e).sort( (o, i) => o.localeCompare(i))
      , r = {};
    for (const o of t)
        r[o] = e[o];
    return r
}
function GP(e) {
    const r = [];
    function o(s) {
        if (!s || typeof s != "object" || Object.keys(s).length === 0)
            return () => {}
            ;
        s._context;
        const c = {};
        for (const h in s) {
            const _ = s[h];
            typeof _ < "u" && _ !== "" && (c[h] = _)
        }
        let d;
        return Object.keys(c).filter(h => !h.startsWith("_")).length > 0 && (d = r.push(c)),
        () => {
            typeof d < "u" && r.splice(d - 1, 1)
        }
    }
    function i(s) {
        const c = {};
        s?.debug && (c._context = {}),
        c._priority = {};
        for (const d in r.sort( (h, _) => (h._priority || 0) - (_._priority || 0)))
            for (const h in r[d]) {
                const _ = h
                  , g = s?.resolveRefs ? $r(r[d][h]) : r[d][h];
                !h.startsWith("_") && typeof g < "u" && g !== "" && (c[h] = g,
                typeof r[d]._priority < "u" && r[d]._priority !== -1 && (c._priority[_] = r[d]._priority),
                s?.debug && (c._context[_] = r[d]._context?.[_] || r[d]._context || "anonymous"))
            }
        return s?.skipNormalize ? c : WP(c)
    }
    return {
        stack: r,
        push: o,
        get: i
    }
}
const XP = $t({
    name: "nuxt-site-config:init",
    enforce: "pre",
    async setup(e) {
        const t = GP()
          , r = LP("site-config");
        {
            const o = r.value || window.__NUXT_SITE_CONFIG__ || {};
            for (const i in o)
                i[0] !== "_" && t.push({
                    [i]: o[i],
                    _priority: o._priority?.[i] || -1
                })
        }
        return {
            provide: {
                nuxtSiteConfig: t
            }
        }
    }
})
  , JP = $t({
    name: "nuxt:payload",
    setup(e) {
        Jt().beforeResolve(async (t, r) => {
            if (t.path === r.path)
                return;
            const o = await d0(t.path);
            o && Object.assign(e.static.data, o.data)
        }
        ),
        Ja( () => {
            e.hooks.hook("link:prefetch", async t => {
                const {hostname: r} = new URL(t,window.location.href);
                r === window.location.hostname && await d0(t)
            }
            ),
            navigator.connection?.effectiveType !== "slow-2g" && setTimeout(Ga, 1e3)
        }
        )
    }
})
  , YP = $t( () => {
    const e = Jt();
    Ja( () => {
        e.beforeResolve(async () => {
            await new Promise(t => {
                setTimeout(t, 100),
                requestAnimationFrame( () => {
                    setTimeout(t, 0)
                }
                )
            }
            )
        }
        )
    }
    )
}
)
  , ZP = $t(e => {
    let t;
    async function r() {
        const o = await Ga();
        t && clearTimeout(t),
        t = setTimeout(r, Qh);
        try {
            const i = await $fetch(ad("builds/latest.json") + `?${Date.now()}`);
            i.id !== o.id && e.hooks.callHook("app:manifest:update", i)
        } catch {}
    }
    Ja( () => {
        t = setTimeout(r, Qh)
    }
    )
}
)
  , QP = $t({
    name: "nuxt:chunk-reload",
    setup(e) {
        const t = Jt()
          , r = oo()
          , o = new Set;
        t.beforeEach( () => {
            o.clear()
        }
        ),
        e.hook("app:chunkError", ({error: s}) => {
            o.add(s)
        }
        );
        function i(s) {
            const d = "href"in s && s.href[0] === "#" ? r.app.baseURL + s.href : id(r.app.baseURL, s.fullPath);
            FP({
                path: d,
                persistState: !0
            })
        }
        e.hook("app:manifest:update", () => {
            t.beforeResolve(i)
        }
        ),
        t.onError( (s, c) => {
            o.has(s) && i(c)
        }
        )
    }
})
  , e9 = $t({
    name: "nuxt:global-components"
})
  , ra = {}
  , t9 = $t({
    name: "nuxt:prefetch",
    setup(e) {
        const t = Jt();
        e.hooks.hook("app:mounted", () => {
            t.beforeEach(async r => {
                const o = r?.meta?.layout;
                o && typeof ra[o] == "function" && await ra[o]()
            }
            )
        }
        ),
        e.hooks.hook("link:prefetch", r => {
            if (mn(r))
                return;
            const o = t.resolve(r);
            if (!o)
                return;
            const i = o.meta.layout;
            let s = gd(o.meta.middleware);
            s = s.filter(c => typeof c == "string");
            for (const c of s)
                typeof kf[c] == "function" && kf[c]();
            i && typeof ra[i] == "function" && ra[i]()
        }
        )
    }
});
function Ya(e) {
    const t = Ar({});
    return l_( () => {
        const r = Ke().$nuxtSiteConfig.get(ld({
            resolveRefs: !0
        }, e));
        Object.assign(t, r)
    }
    ),
    delete t._priority,
    t
}
const r9 = $t( () => {
    const e = Wa();
    if (!e)
        return;
    const t = Ya()
      , r = {
        meta: [],
        templateParams: {
            site: t,
            siteUrl: t.url,
            siteName: t.name
        }
    };
    t.separator && (r.templateParams.separator = t.separator),
    t.titleSeparator && (r.templateParams.titleSeparator = t.titleSeparator),
    t.description && (r.templateParams.siteDescription = t.description,
    r.meta.push({
        name: "description",
        content: "%site.description",
        tagPriority: "low"
    })),
    e.push(r)
}
)
  , n9 = $t( () => {
    const e = Wa();
    e && e.use(NC())
}
)
  , o9 = /\d/
  , i9 = ["-", "_", "/", "."];
function s9(e="") {
    if (!o9.test(e))
        return e !== e.toLowerCase()
}
function a9(e, t) {
    const r = i9
      , o = [];
    if (!e || typeof e != "string")
        return o;
    let i = "", s, c;
    for (const d of e) {
        const h = r.includes(d);
        if (h === !0) {
            o.push(i),
            i = "",
            s = void 0;
            continue
        }
        const _ = s9(d);
        if (c === !1) {
            if (s === !1 && _ === !0) {
                o.push(i),
                i = d,
                s = _;
                continue
            }
            if (s === !0 && _ === !1 && i.length > 1) {
                const g = i.at(-1);
                o.push(i.slice(0, Math.max(0, i.length - 1))),
                i = g + d,
                s = _;
                continue
            }
        }
        i += d,
        s = _,
        c = h
    }
    return o.push(i),
    o
}
function l9(e) {
    return e ? e[0].toUpperCase() + e.slice(1) : ""
}
const c9 = /^(a|an|and|as|at|but|by|for|if|in|is|nor|of|on|or|the|to|with)$/i;
function u9(e, t) {
    return (Array.isArray(e) ? e : a9(e)).filter(Boolean).map(r => c9.test(r) ? r.toLowerCase() : l9(r)).join(" ")
}
const f9 = $t({
    name: "nuxt-seo:fallback-titles",
    env: {
        islands: !1
    },
    setup() {
        const e = Ka()
          , t = Go()
          , r = nt( () => {
            if ([404, 500].includes(t.value?.statusCode))
                return `${t.value.statusCode} - ${t.value.message}`;
            if (typeof e.meta?.title == "string")
                return e.meta?.title;
            const s = qa(e.path || "/").split("/").pop();
            return s ? u9(s) : null
        }
        );
        Sf({
            title: () => r.value
        }, {
            tagPriority: 101
        })
    }
});
function d9(e) {
    return {
        all: e = e || new Map,
        on: function(t, r) {
            var o = e.get(t);
            o ? o.push(r) : e.set(t, [r])
        },
        off: function(t, r) {
            var o = e.get(t);
            o && (r ? o.splice(o.indexOf(r) >>> 0, 1) : e.set(t, []))
        },
        emit: function(t, r) {
            var o = e.get(t);
            o && o.slice().map(function(i) {
                i(r)
            }),
            (o = e.get("*")) && o.slice().map(function(i) {
                i(t, r)
            })
        }
    }
}
const _m = d9();
window.$on = _m.on;
window.$emit = _m.emit;
const p9 = $t( () => ({}));
function h9(e, t) {
    let r = e;
    Ua(e, {
        strict: !1,
        acceptRelative: !0
    }) && (r = td(e).pathname);
    const o = xT(t.base || "/");
    o !== "/" && r.startsWith(o) && (r = r.slice(o.length));
    let i = qa(t.absolute ? t.siteUrl : "");
    o !== "/" && i.endsWith(o) && (i = i.slice(0, i.indexOf(o)));
    const s = t.withBase ? cf(o, i || "/") : i
      , c = cf(r, s);
    return r === "/" && !t.withBase ? ed(c) : m9(t.trailingSlash, c)
}
const g9 = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "ico", "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "md", "markdown", "zip", "rar", "7z", "tar", "gz", "mp3", "wav", "flac", "ogg", "opus", "m4a", "aac", "midi", "mid", "mp4", "avi", "mkv", "mov", "wmv", "flv", "webm", "html", "css", "js", "json", "xml", "tsx", "jsx", "ts", "vue", "svelte", "xsl", "rss", "atom", "php", "py", "rb", "java", "c", "cpp", "h", "go", "csv", "tsv", "sql", "yaml", "yml", "woff", "woff2", "ttf", "otf", "eot", "exe", "msi", "apk", "ipa", "dmg", "iso", "bin", "bat", "cmd", "sh", "env", "htaccess", "conf", "toml", "ini", "deb", "rpm", "jar", "war", "epub", "mobi", "log", "tmp", "bak", "old", "sav"];
function _9(e) {
    const r = (e.split("/").pop() || e).match(/\.[0-9a-z]+$/i)?.[0];
    return r && g9.includes(r.replace(".", ""))
}
function m9(e, t) {
    const r = td(t);
    if (_9(r.pathname))
        return t;
    const o = e ? ed(r.pathname) : qa(r.pathname);
    return `${r.protocol ? `${r.protocol}//` : ""}${r.host || ""}${o}${r.search || ""}${r.hash || ""}`
}
function v9(e) {
    return window.location.origin
}
function y9(e={}) {
    const t = Ya()
      , r = v9()
      , o = oo().app.baseURL || "/";
    return i => nt( () => h9(ze(i), {
        absolute: ze(e.absolute),
        withBase: ze(e.withBase),
        siteUrl: ze(e.canonical) !== !1 ? t.url : r,
        trailingSlash: t.trailingSlash,
        base: o
    }))
}
function b9(e) {
    const {canonicalQueryWhitelist: t, canonicalLowercase: r} = oo().public["seo-utils"]
      , o = Ya()
      , i = Ka()
      , s = y9({
        withBase: !0,
        absolute: !0
    })
      , c = Go()
      , d = nt( () => {
        if (c.value)
            return null;
        const {query: l} = i;
        let f = s(i.path || "/").value || i.path;
        r && (f = f.toLocaleLowerCase(o.currentLocale));
        const p = Object.fromEntries(Object.entries(l).filter( ([y]) => t.includes(y)).sort( ([y], [w]) => y.localeCompare(w)));
        return Object.keys(p).length ? `${f}?${A_(p)}` : f
    }
    )
      , h = _t({
        site: o,
        siteName: o.name
    });
    Kr(o, l => {
        h.value = {
            site: l,
            siteName: l.name || ""
        }
    }
    , {
        deep: !0
    }),
    Sf({
        templateParams: h
    });
    const _ = {
        tagPriority: 101
    };
    Sf({
        htmlAttrs: {
            lang: e.locale
        },
        templateParams: h,
        titleTemplate: "%s %separator %siteName",
        link: [{
            rel: "canonical",
            href: () => d.value
        }]
    }, _);
    const g = {
        ogType: "website",
        ogUrl: () => d.value,
        ogLocale: () => e.locale.value,
        ogSiteName: o.name
    };
    if (o.description && (g.description = o.description),
    o.twitter) {
        const l = o.twitter.startsWith("@") ? o.twitter : `@${o.twitter}`;
        g.twitterCreator = l,
        g.twitterSite = l
    }
    UC(g, _)
}
const w9 = $t({
    name: "nuxt-seo:defaults",
    order: 999,
    env: {
        islands: !1
    },
    setup() {
        const e = Ya()
          , t = _t(e.currentLocale || e.defaultLocale);
        b9({
            locale: t
        })
    }
})
  , T9 = [ZC, n8, TP, XP, JP, YP, ZP, QP, e9, t9, r9, n9, f9, p9, w9]
  , mm = (e="RouteProvider") => no({
    name: e,
    props: {
        vnode: {
            type: Object,
            required: !0
        },
        route: {
            type: Object,
            required: !0
        },
        vnodeRef: Object,
        renderKey: String,
        trackRootNodes: Boolean
    },
    setup(t) {
        const r = t.renderKey
          , o = t.route
          , i = {};
        for (const s in t.route)
            Object.defineProperty(i, s, {
                get: () => r === t.renderKey ? t.route[s] : o[s],
                enumerable: !0
            });
        return Qn(Wo, zr(i)),
        () => Gt(t.vnode, {
            ref: t.vnodeRef
        })
    }
})
  , S9 = mm()
  , C9 = no({
    name: "NuxtPage",
    inheritAttrs: !1,
    props: {
        name: {
            type: String
        },
        transition: {
            type: [Boolean, Object],
            default: void 0
        },
        keepalive: {
            type: [Boolean, Object],
            default: void 0
        },
        route: {
            type: Object
        },
        pageKey: {
            type: [Function, String],
            default: null
        }
    },
    setup(e, {attrs: t, slots: r, expose: o}) {
        const i = Ke()
          , s = _t()
          , c = Xt(Wo, null);
        let d;
        o({
            pageRef: s
        });
        const h = Xt(ZS, null);
        let _;
        const g = i.deferHydration();
        if (i.isHydrating) {
            const p = i.hooks.hookOnce("app:error", g);
            Jt().beforeEach(p)
        }
        e.pageKey && Kr( () => e.pageKey, (p, y) => {
            p !== y && i.callHook("page:loading:start")
        }
        );
        let l = !1;
        const f = new WeakMap;
        return () => Gt(pm, {
            name: e.name,
            route: e.route,
            ...t
        }, {
            default: p => {
                const y = A9(c, p.route, p.Component)
                  , w = c && c.matched.length === p.route.matched.length;
                if (!p.Component) {
                    if (_ && !w)
                        return _;
                    g();
                    return
                }
                if (_ && h && !h.isCurrent(p.route))
                    return _;
                if (y && c && (!h || h?.isCurrent(c)))
                    return w ? _ : null;
                const x = xf(p, e.pageKey);
                !i.isHydrating && !x9(c, p.route, p.Component) && d === x && (i.callHook("page:loading:end"),
                l = !0),
                d = x;
                const P = !!(e.transition ?? p.route.meta.pageTransition ?? hf)
                  , E = P && P9([e.transition, p.route.meta.pageTransition, hf, {
                    onAfterLeave: () => {
                        i.callHook("page:transition:finish", p.Component)
                    }
                }].filter(Boolean))
                  , C = e.keepalive ?? p.route.meta.keepalive ?? HS;
                return _ = fP(P && E, uP(C, Gt(f_, {
                    suspensible: !0,
                    onPending: () => i.callHook("page:start", p.Component),
                    onResolve: () => {
                        Na( () => i.callHook("page:finish", p.Component).then( () => {
                            if (!l)
                                return i.callHook("page:loading:end");
                            l = !1
                        }
                        ).finally(g))
                    }
                }, {
                    default: () => {
                        const S = {
                            key: x || void 0,
                            vnode: r.default ? k9(r.default, p) : p.Component,
                            route: p.route,
                            renderKey: x || void 0,
                            trackRootNodes: P,
                            vnodeRef: s
                        };
                        if (!C)
                            return Gt(S9, S);
                        const M = p.Component.type;
                        let F = f.get(M);
                        return F || (F = mm(M.name || M.__name),
                        f.set(M, F)),
                        Gt(F, S)
                    }
                }))).default(),
                _
            }
        })
    }
});
function P9(e) {
    const t = e.map(r => ({
        ...r,
        onAfterLeave: r.onAfterLeave ? gd(r.onAfterLeave) : void 0
    }));
    return ld(...t)
}
function A9(e, t, r) {
    if (!e)
        return !1;
    const o = t.matched.findIndex(i => i.components?.default === r?.type);
    return !o || o === -1 ? !1 : t.matched.slice(0, o).some( (i, s) => i.components?.default !== e.matched[s]?.components?.default) || r && xf({
        route: t,
        Component: r
    }) !== xf({
        route: e,
        Component: r
    })
}
function x9(e, t, r) {
    return e ? t.matched.findIndex(i => i.components?.default === r?.type) < t.matched.length - 1 : !1
}
function k9(e, t) {
    const r = e(t);
    return r.length === 1 ? Gt(r[0]) : Gt(lt, void 0, r)
}
const ir = (e, t) => {
    const r = e.__vccOpts || e;
    for (const [o,i] of t)
        r[o] = i;
    return r
}
  , E9 = {
    props: {
        text: {
            required: !0
        },
        inline: {
            default: !1
        },
        manualalign: {
            default: !1
        },
        speed: {
            default: .3
        },
        delay: {
            default: .01
        },
        kerning: {
            default: "4px"
        }
    },
    data() {
        return {
            phrase: [],
            counter: 0,
            manualNewLine: !1,
            showAnimation: !0
        }
    },
    methods: {
        processText() {
            let e = []
              , t = -1;
            return this.text.split ? this.text.split(" ").forEach(r => {
                e.push(r.split("").map(o => (t++,
                {
                    letter: o,
                    index: t
                })))
            }
            ) : (this.manualNewLine = !0,
            this.text.forEach(r => {
                e.push(r.split("").map(o => (t++,
                {
                    letter: o,
                    index: t
                })))
            }
            )),
            e
        },
        valCounter() {
            return this.counter++,
            "id" + this.counter
        }
    }
}
  , O9 = ["data-letter"];
function R9(e, t, r, o, i, s) {
    return _e(),
    Oe("div", {
        class: gr(["anim", {
            inline: r.inline,
            animated: i.showAnimation
        }]),
        style: rt({
            "--kerning": r.kerning,
            "--speed": r.speed + "s",
            "--delay": r.delay + "s"
        })
    }, [(_e(!0),
    Oe(lt, null, va(s.processText(), (c, d) => (_e(),
    Oe("span", {
        class: gr(["word", {
            manualNewLine: i.manualNewLine,
            ["manualalign_" + r.manualalign]: r.manualalign,
            br: c[0] && c[0].letter == "<br>"
        }]),
        key: d
    }, [(_e(!0),
    Oe(lt, null, va(c, h => (_e(),
    Oe("span", {
        class: gr("id_" + h.index),
        "data-letter": h.letter,
        key: h.index
    }, null, 10, O9))), 128))], 2))), 128))], 6)
}
const ts = ir(E9, [["render", R9], ["__scopeId", "data-v-ee302b30"]])
  , M9 = {
    name: "ContentTop",
    inject: ["sheet", "time"],
    data() {
        return {
            overbosk: !1,
            overnaive: !1,
            mouse: [],
            width: typeof window < "u" ? window.innerWidth : 0
        }
    },
    computed: {
        length() {
            let e = Math.floor(this.width * .8 / 82)
              , t = e * 10;
            return e % 2 === 1 && t++,
            t
        }
    },
    methods: {
        mouseenter(e) {
            $emit("content", e)
        },
        mouseleave() {
            $emit("content", "")
        }
    },
    created() {
        typeof window < "u" && (window.addEventListener("resize", () => {
            this.width = window.innerWidth,
            this.mouse = []
        }
        ),
        window.addEventListener("mousemove", e => {
            let t = (innerWidth <= 1260,
            50)
              , r = innerHeight > 1300 ? 4 : 3
              , o = Math.max(t * 2, Math.min(e.clientX, innerWidth - t * 3))
              , i = Math.max(t * r, Math.min(e.clientY, innerHeight - t * 3))
              , s = o - o % t
              , c = i - i % t
              , d = this.mouse[this.mouse.length - 1];
            d == null ? this.mouse.push([s, c]) : ((s != d[0] || c != d[1]) && this.mouse.push([s, c]),
            this.mouse.length > 20 && this.mouse.shift())
        }
        ),
        this.width = window.innerWidth)
    }
}
  , I9 = {
    key: 0,
    class: "dverso_section"
}
  , j9 = {
    class: "dverso_claim"
}
  , H9 = {
    class: "dverso_contacts"
};
function D9(e, t, r, o, i, s) {
    const c = ts;
    return s.time < 1 ? (_e(),
    Oe("div", I9, [t[8] || (t[8] = Yi('<div class="dverso_occluder _1" data-v-049c37b3></div><div class="dverso_occluder _2" data-v-049c37b3></div><div class="dverso_occluder _3" data-v-049c37b3></div><div class="dverso_occluder _4" data-v-049c37b3></div><div class="dverso_occluder _5" data-v-049c37b3></div><div class="dverso_occluder _6" data-v-049c37b3></div><div class="dverso_occluder _7" data-v-049c37b3></div><div class="dverso_occluder _8" data-v-049c37b3></div><div class="dverso_occluder _9" data-v-049c37b3></div><div class="dverso_occluder _10" data-v-049c37b3></div><div class="dverso_occluder _11" data-v-049c37b3></div>', 11)), (_e(!0),
    Oe(lt, null, va(i.mouse, (d, h) => (_e(),
    Oe("div", {
        class: "dverso_mouse hideonmobile",
        key: h,
        style: rt({
            transform: `translate(${d[0]}px, ${d[1]}px)`,
            opacity: (h + 1) / i.mouse.length
        })
    }, null, 4))), 128)), D("div", {
        onMouseover: t[0] || (t[0] = d => i.overbosk = !0),
        onMouseleave: t[1] || (t[1] = d => i.overbosk = !1),
        class: "dverso_bosk_occluder hideonmobile"
    }, [D("p", null, [i.overbosk ? (_e(),
    Vt(c, {
        key: 0,
        manualalign: "right",
        kerning: "0.1vw",
        text: ["Bogdan Skutkiewicz", "aka. BOSK", "Creative Director & Designer", "t(-_-t)"]
    })) : jt("", !0)])], 32), D("div", {
        onMouseover: t[2] || (t[2] = d => i.overnaive = !0),
        onMouseleave: t[3] || (t[3] = d => i.overnaive = !1),
        class: "dverso_naive_occluder hideonmobile"
    }, [D("p", null, [i.overnaive ? (_e(),
    Vt(c, {
        key: 0,
        kerning: "0.1vw",
        text: ["Danilo Flemma", "aka. Naive17", "Creative Developer ", "(∩ '-')⊃━☆ﾟ.*･｡ﾟ"]
    })) : jt("", !0)])], 32), D("div", j9, [t[7] || (t[7] = D("h1", null, [ht("creative "), D("span", null, [D("div", {
        class: "accent"
    }, "*"), ht("studio")]), D("br"), ht(" specialized in immersive"), D("br"), ht(" web design & development")], -1)), D("div", H9, [D("a", {
        href: "mailto:info@dverso.io",
        onClick: t[4] || (t[4] = (...d) => e.copyEmail && e.copyEmail(...d))
    }, "INFO@DVERSO.IO"), t[6] || (t[6] = D("div", {
        class: "spacer"
    }, null, -1)), D("a", {
        href: "tel:+393921765722",
        onClick: t[5] || (t[5] = (...d) => e.copyPhone && e.copyPhone(...d))
    }, "+393921765722")])])])) : jt("", !0)
}
const L9 = ir(M9, [["render", D9], ["__scopeId", "data-v-049c37b3"]])
  , B9 = Symbol.for("nuxt:client-only")
  , Ra = no({
    name: "ClientOnly",
    inheritAttrs: !1,
    props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
    setup(e, {slots: t, attrs: r}) {
        const o = _t(!1);
        return Xi( () => {
            o.value = !0
        }
        ),
        Qn(B9, !0),
        i => {
            if (o.value)
                return t.default?.();
            const s = t.fallback || t.placeholder;
            if (s)
                return s();
            const c = i.fallback || i.placeholder || ""
              , d = i.fallbackTag || i.placeholderTag || "span";
            return Oe(d, r, c)
        }
    }
});
var Ft = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Pi = {
    exports: {}
}, Lu = {}, I0;
function pt() {
    return I0 || (I0 = 1,
    function(e) {
        var t = Object.defineProperty
          , r = Object.defineProperties
          , o = Object.getOwnPropertyDescriptors
          , i = Object.getOwnPropertySymbols
          , s = Object.prototype.hasOwnProperty
          , c = Object.prototype.propertyIsEnumerable
          , d = (v, A, I) => A in v ? t(v, A, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: I
        }) : v[A] = I
          , h = (v, A) => {
            for (var I in A || (A = {}))
                s.call(A, I) && d(v, I, A[I]);
            if (i)
                for (var I of i(A))
                    c.call(A, I) && d(v, I, A[I]);
            return v
        }
          , _ = (v, A) => r(v, o(A))
          , g = v => t(v, "__esModule", {
            value: !0
        })
          , l = (v, A) => {
            g(v);
            for (var I in A)
                t(v, I, {
                    get: A[I],
                    enumerable: !0
                })
        }
        ;
        l(e, {
            Atom: () => Cs,
            PointerProxy: () => Cc,
            Ticker: () => As,
            getPointerParts: () => Cn,
            isPointer: () => Or,
            isPrism: () => ho,
            iterateAndCountTicks: () => wc,
            iterateOver: () => Sc,
            pointer: () => Qo,
            pointerToPrism: () => _o,
            prism: () => kn,
            val: () => ii
        });
        var f = Array.isArray
          , p = f
          , y = typeof Ft == "object" && Ft && Ft.Object === Object && Ft
          , w = y
          , x = typeof self == "object" && self && self.Object === Object && self
          , P = w || x || Function("return this")()
          , E = P
          , C = E.Symbol
          , S = C
          , M = Object.prototype
          , F = M.hasOwnProperty
          , W = M.toString
          , Q = S ? S.toStringTag : void 0;
        function $(v) {
            var A = F.call(v, Q)
              , I = v[Q];
            try {
                v[Q] = void 0;
                var B = !0
            } catch {}
            var me = W.call(v);
            return B && (A ? v[Q] = I : delete v[Q]),
            me
        }
        var G = $
          , ae = Object.prototype
          , U = ae.toString;
        function ce(v) {
            return U.call(v)
        }
        var ve = ce
          , Pe = "[object Null]"
          , Y = "[object Undefined]"
          , he = S ? S.toStringTag : void 0;
        function le(v) {
            return v == null ? v === void 0 ? Y : Pe : he && he in Object(v) ? G(v) : ve(v)
        }
        var Fe = le;
        function it(v) {
            return v != null && typeof v == "object"
        }
        var St = it
          , at = "[object Symbol]";
        function Re(v) {
            return typeof v == "symbol" || St(v) && Fe(v) == at
        }
        var et = Re
          , Ve = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
          , mt = /^\w*$/;
        function V(v, A) {
            if (p(v))
                return !1;
            var I = typeof v;
            return I == "number" || I == "symbol" || I == "boolean" || v == null || et(v) ? !0 : mt.test(v) || !Ve.test(v) || A != null && v in Object(A)
        }
        var se = V;
        function oe(v) {
            var A = typeof v;
            return v != null && (A == "object" || A == "function")
        }
        var ue = oe
          , xe = "[object AsyncFunction]"
          , $e = "[object Function]"
          , k = "[object GeneratorFunction]"
          , O = "[object Proxy]";
        function L(v) {
            if (!ue(v))
                return !1;
            var A = Fe(v);
            return A == $e || A == k || A == xe || A == O
        }
        var q = L
          , z = E["__core-js_shared__"]
          , X = z
          , ne = function() {
            var v = /[^.]+$/.exec(X && X.keys && X.keys.IE_PROTO || "");
            return v ? "Symbol(src)_1." + v : ""
        }();
        function te(v) {
            return !!ne && ne in v
        }
        var ee = te
          , K = Function.prototype
          , ge = K.toString;
        function re(v) {
            if (v != null) {
                try {
                    return ge.call(v)
                } catch {}
                try {
                    return v + ""
                } catch {}
            }
            return ""
        }
        var de = re
          , ye = /[\\^$.*+?()[\]{}|]/g
          , Ae = /^\[object .+?Constructor\]$/
          , De = Function.prototype
          , Me = Object.prototype
          , Ct = De.toString
          , st = Me.hasOwnProperty
          , Ht = RegExp("^" + Ct.call(st).replace(ye, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        function Ue(v) {
            if (!ue(v) || ee(v))
                return !1;
            var A = q(v) ? Ht : Ae;
            return A.test(de(v))
        }
        var xr = Ue;
        function io(v, A) {
            return v?.[A]
        }
        var Pt = io;
        function zt(v, A) {
            var I = Pt(v, A);
            return xr(I) ? I : void 0
        }
        var vn = zt
          , rs = vn(Object, "create")
          , yn = rs;
        function Xo() {
            this.__data__ = yn ? yn(null) : {},
            this.size = 0
        }
        var ns = Xo;
        function Za(v) {
            var A = this.has(v) && delete this.__data__[v];
            return this.size -= A ? 1 : 0,
            A
        }
        var Qa = Za
          , el = "__lodash_hash_undefined__"
          , tl = Object.prototype
          , rl = tl.hasOwnProperty;
        function kr(v) {
            var A = this.__data__;
            if (yn) {
                var I = A[v];
                return I === el ? void 0 : I
            }
            return rl.call(A, v) ? A[v] : void 0
        }
        var nl = kr
          , ol = Object.prototype
          , il = ol.hasOwnProperty;
        function sl(v) {
            var A = this.__data__;
            return yn ? A[v] !== void 0 : il.call(A, v)
        }
        var al = sl
          , ll = "__lodash_hash_undefined__";
        function cl(v, A) {
            var I = this.__data__;
            return this.size += this.has(v) ? 0 : 1,
            I[v] = yn && A === void 0 ? ll : A,
            this
        }
        var ul = cl;
        function Xr(v) {
            var A = -1
              , I = v == null ? 0 : v.length;
            for (this.clear(); ++A < I; ) {
                var B = v[A];
                this.set(B[0], B[1])
            }
        }
        Xr.prototype.clear = ns,
        Xr.prototype.delete = Qa,
        Xr.prototype.get = nl,
        Xr.prototype.has = al,
        Xr.prototype.set = ul;
        var os = Xr;
        function fl() {
            this.__data__ = [],
            this.size = 0
        }
        var dl = fl;
        function Er(v, A) {
            return v === A || v !== v && A !== A
        }
        var pl = Er;
        function bn(v, A) {
            for (var I = v.length; I--; )
                if (pl(v[I][0], A))
                    return I;
            return -1
        }
        var so = bn
          , hl = Array.prototype
          , gl = hl.splice;
        function _l(v) {
            var A = this.__data__
              , I = so(A, v);
            if (I < 0)
                return !1;
            var B = A.length - 1;
            return I == B ? A.pop() : gl.call(A, I, 1),
            --this.size,
            !0
        }
        var ml = _l;
        function vl(v) {
            var A = this.__data__
              , I = so(A, v);
            return I < 0 ? void 0 : A[I][1]
        }
        var yl = vl;
        function bl(v) {
            return so(this.__data__, v) > -1
        }
        var wl = bl;
        function Tl(v, A) {
            var I = this.__data__
              , B = so(I, v);
            return B < 0 ? (++this.size,
            I.push([v, A])) : I[B][1] = A,
            this
        }
        var Sl = Tl;
        function Jr(v) {
            var A = -1
              , I = v == null ? 0 : v.length;
            for (this.clear(); ++A < I; ) {
                var B = v[A];
                this.set(B[0], B[1])
            }
        }
        Jr.prototype.clear = dl,
        Jr.prototype.delete = ml,
        Jr.prototype.get = yl,
        Jr.prototype.has = wl,
        Jr.prototype.set = Sl;
        var Cl = Jr
          , Pl = vn(E, "Map")
          , Al = Pl;
        function xl() {
            this.size = 0,
            this.__data__ = {
                hash: new os,
                map: new (Al || Cl),
                string: new os
            }
        }
        var Yr = xl;
        function is(v) {
            var A = typeof v;
            return A == "string" || A == "number" || A == "symbol" || A == "boolean" ? v !== "__proto__" : v === null
        }
        var kl = is;
        function El(v, A) {
            var I = v.__data__;
            return kl(A) ? I[typeof A == "string" ? "string" : "hash"] : I.map
        }
        var ao = El;
        function Jo(v) {
            var A = ao(this, v).delete(v);
            return this.size -= A ? 1 : 0,
            A
        }
        var Ol = Jo;
        function lo(v) {
            return ao(this, v).get(v)
        }
        var Rl = lo;
        function Ml(v) {
            return ao(this, v).has(v)
        }
        var Il = Ml;
        function jl(v, A) {
            var I = ao(this, v)
              , B = I.size;
            return I.set(v, A),
            this.size += I.size == B ? 0 : 1,
            this
        }
        var Hl = jl;
        function Zr(v) {
            var A = -1
              , I = v == null ? 0 : v.length;
            for (this.clear(); ++A < I; ) {
                var B = v[A];
                this.set(B[0], B[1])
            }
        }
        Zr.prototype.clear = Yr,
        Zr.prototype.delete = Ol,
        Zr.prototype.get = Rl,
        Zr.prototype.has = Il,
        Zr.prototype.set = Hl;
        var ss = Zr
          , Dl = "Expected a function";
        function Yo(v, A) {
            if (typeof v != "function" || A != null && typeof A != "function")
                throw new TypeError(Dl);
            var I = function() {
                var B = arguments
                  , me = A ? A.apply(this, B) : B[0]
                  , Ie = I.cache;
                if (Ie.has(me))
                    return Ie.get(me);
                var At = v.apply(this, B);
                return I.cache = Ie.set(me, At) || Ie,
                At
            };
            return I.cache = new (Yo.Cache || ss),
            I
        }
        Yo.Cache = ss;
        var Ll = Yo
          , Qr = 500;
        function co(v) {
            var A = Ll(v, function(B) {
                return I.size === Qr && I.clear(),
                B
            })
              , I = A.cache;
            return A
        }
        var Bl = co
          , wn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
          , Nl = /\\(\\)?/g
          , Fl = Bl(function(v) {
            var A = [];
            return v.charCodeAt(0) === 46 && A.push(""),
            v.replace(wn, function(I, B, me, Ie) {
                A.push(me ? Ie.replace(Nl, "$1") : B || I)
            }),
            A
        })
          , Vl = Fl;
        function $l(v, A) {
            for (var I = -1, B = v == null ? 0 : v.length, me = Array(B); ++I < B; )
                me[I] = A(v[I], I, v);
            return me
        }
        var zl = $l
          , Tn = S ? S.prototype : void 0
          , as = Tn ? Tn.toString : void 0;
        function ls(v) {
            if (typeof v == "string")
                return v;
            if (p(v))
                return zl(v, ls) + "";
            if (et(v))
                return as ? as.call(v) : "";
            var A = v + "";
            return A == "0" && 1 / v == -1 / 0 ? "-0" : A
        }
        var Ul = ls;
        function ql(v) {
            return v == null ? "" : Ul(v)
        }
        var Kl = ql;
        function Wl(v, A) {
            return p(v) ? v : se(v, A) ? [v] : Vl(Kl(v))
        }
        var Gl = Wl;
        function Xl(v) {
            if (typeof v == "string" || et(v))
                return v;
            var A = v + "";
            return A == "0" && 1 / v == -1 / 0 ? "-0" : A
        }
        var en = Xl;
        function uo(v, A) {
            A = Gl(A, v);
            for (var I = 0, B = A.length; v != null && I < B; )
                v = v[en(A[I++])];
            return I && I == B ? v : void 0
        }
        var Jl = uo;
        function Zo(v, A, I) {
            var B = v == null ? void 0 : Jl(v, A);
            return B === void 0 ? I : B
        }
        var Yl = Zo;
        function Zl(v, A) {
            return function(I) {
                return v(A(I))
            }
        }
        var Ql = Zl
          , ec = Ql(Object.getPrototypeOf, Object)
          , tc = ec
          , rc = "[object Object]"
          , nc = Function.prototype
          , oc = Object.prototype
          , cs = nc.toString
          , ic = oc.hasOwnProperty
          , us = cs.call(Object);
        function fs(v) {
            if (!St(v) || Fe(v) != rc)
                return !1;
            var A = tc(v);
            if (A === null)
                return !0;
            var I = ic.call(A, "constructor") && A.constructor;
            return typeof I == "function" && I instanceof I && cs.call(I) == us
        }
        var ds = fs;
        function ps(v) {
            var A = v == null ? 0 : v.length;
            return A ? v[A - 1] : void 0
        }
        var sc = ps
          , fo = new WeakMap
          , hs = new WeakMap
          , Sn = Symbol("pointerMeta")
          , ac = {
            get(v, A) {
                if (A === Sn)
                    return fo.get(v);
                let I = hs.get(v);
                I || (I = new Map,
                hs.set(v, I));
                const B = I.get(A);
                if (B !== void 0)
                    return B;
                const me = fo.get(v)
                  , Ie = po({
                    root: me.root,
                    path: [...me.path, A]
                });
                return I.set(A, Ie),
                Ie
            }
        }
          , dr = v => v[Sn]
          , Cn = v => {
            const {root: A, path: I} = dr(v);
            return {
                root: A,
                path: I
            }
        }
        ;
        function po(v) {
            var A;
            const I = {
                root: v.root,
                path: (A = v.path) != null ? A : []
            }
              , B = {};
            return fo.set(B, I),
            new Proxy(B,ac)
        }
        var Qo = po
          , Or = v => v && !!dr(v);
        function gs(v, A, I) {
            return A.length === 0 ? I(v) : tn(v, A, I)
        }
        var tn = (v, A, I) => {
            if (A.length === 0)
                return I(v);
            if (Array.isArray(v)) {
                let[B,...me] = A;
                B = parseInt(String(B), 10),
                isNaN(B) && (B = 0);
                const Ie = v[B]
                  , At = tn(Ie, me, I);
                if (Ie === At)
                    return v;
                const sr = [...v];
                return sr.splice(B, 1, At),
                sr
            } else if (typeof v == "object" && v !== null) {
                const [B,...me] = A
                  , Ie = v[B]
                  , At = tn(Ie, me, I);
                return Ie === At ? v : _(h({}, v), {
                    [B]: At
                })
            } else {
                const [B,...me] = A;
                return {
                    [B]: tn(void 0, me, I)
                }
            }
        }
          , ft = class {
            constructor() {
                this._head = void 0
            }
            peek() {
                return this._head && this._head.data
            }
            pop() {
                const v = this._head;
                if (v)
                    return this._head = v.next,
                    v.data
            }
            push(v) {
                const A = {
                    next: this._head,
                    data: v
                };
                this._head = A
            }
        }
        ;
        function ho(v) {
            return !!(v && v.isPrism && v.isPrism === !0)
        }
        function ei() {
            const v = () => {}
              , A = new ft
              , I = v;
            return {
                type: "Dataverse_discoveryMechanism",
                startIgnoringDependencies: () => {
                    A.push(I)
                }
                ,
                stopIgnoringDependencies: () => {
                    A.peek() !== I || A.pop()
                }
                ,
                reportResolutionStart: rn => {
                    const En = A.peek();
                    En && En(rn),
                    A.push(I)
                }
                ,
                reportResolutionEnd: rn => {
                    A.pop()
                }
                ,
                pushCollector: rn => {
                    A.push(rn)
                }
                ,
                popCollector: rn => {
                    if (A.peek() !== rn)
                        throw new Error("Popped collector is not on top of the stack");
                    A.pop()
                }
            }
        }
        function lc() {
            const v = "__dataverse_discoveryMechanism_sharedStack"
              , A = typeof window < "u" ? window : typeof Ft < "u" ? Ft : {};
            if (A) {
                const I = A[v];
                if (I && typeof I == "object" && I.type === "Dataverse_discoveryMechanism")
                    return I;
                {
                    const B = ei();
                    return A[v] = B,
                    B
                }
            } else
                return ei()
        }
        var {startIgnoringDependencies: Rr, stopIgnoringDependencies: Pn, reportResolutionEnd: cc, reportResolutionStart: uc, pushCollector: ti, popCollector: fc} = lc()
          , _s = () => {}
          , dc = class {
            constructor(v, A) {
                this._fn = v,
                this._prismInstance = A,
                this._didMarkDependentsAsStale = !1,
                this._isFresh = !1,
                this._cacheOfDendencyValues = new Map,
                this._dependents = new Set,
                this._dependencies = new Set,
                this._possiblyStaleDeps = new Set,
                this._scope = new ms(this),
                this._lastValue = void 0,
                this._forciblySetToStale = !1,
                this._reactToDependencyGoingStale = I => {
                    this._possiblyStaleDeps.add(I),
                    this._markAsStale()
                }
                ;
                for (const I of this._dependencies)
                    I._addDependent(this._reactToDependencyGoingStale);
                Rr(),
                this.getValue(),
                Pn()
            }
            get hasDependents() {
                return this._dependents.size > 0
            }
            removeDependent(v) {
                this._dependents.delete(v)
            }
            addDependent(v) {
                this._dependents.add(v)
            }
            destroy() {
                for (const v of this._dependencies)
                    v._removeDependent(this._reactToDependencyGoingStale);
                vs(this._scope)
            }
            getValue() {
                if (!this._isFresh) {
                    const v = this._recalculate();
                    this._lastValue = v,
                    this._isFresh = !0,
                    this._didMarkDependentsAsStale = !1,
                    this._forciblySetToStale = !1
                }
                return this._lastValue
            }
            _recalculate() {
                let v;
                if (!this._forciblySetToStale && this._possiblyStaleDeps.size > 0) {
                    let B = !1;
                    Rr();
                    for (const me of this._possiblyStaleDeps)
                        if (this._cacheOfDendencyValues.get(me) !== me.getValue()) {
                            B = !0;
                            break
                        }
                    if (Pn(),
                    this._possiblyStaleDeps.clear(),
                    !B)
                        return this._lastValue
                }
                const A = new Set;
                this._cacheOfDendencyValues.clear();
                const I = B => {
                    A.add(B),
                    this._addDependency(B)
                }
                ;
                ti(I),
                vt.push(this._scope);
                try {
                    v = this._fn()
                } catch (B) {} finally {
                    const B = vt.pop();
                    this._scope
                }
                fc(I);
                for (const B of this._dependencies)
                    A.has(B) || this._removeDependency(B);
                this._dependencies = A,
                Rr();
                for (const B of A)
                    this._cacheOfDendencyValues.set(B, B.getValue());
                return Pn(),
                v
            }
            forceStale() {
                this._forciblySetToStale = !0,
                this._markAsStale()
            }
            _markAsStale() {
                if (!this._didMarkDependentsAsStale) {
                    this._didMarkDependentsAsStale = !0,
                    this._isFresh = !1;
                    for (const v of this._dependents)
                        v(this._prismInstance)
                }
            }
            _addDependency(v) {
                this._dependencies.has(v) || (this._dependencies.add(v),
                v._addDependent(this._reactToDependencyGoingStale))
            }
            _removeDependency(v) {
                this._dependencies.has(v) && (this._dependencies.delete(v),
                v._removeDependent(this._reactToDependencyGoingStale))
            }
        }
          , ri = {}
          , pc = class {
            constructor(v) {
                this._fn = v,
                this.isPrism = !0,
                this._state = {
                    hot: !1,
                    handle: void 0
                }
            }
            get isHot() {
                return this._state.hot
            }
            onChange(v, A, I=!1) {
                const B = () => {
                    v.onThisOrNextTick(Ie)
                }
                ;
                let me = ri;
                const Ie = () => {
                    const sr = this.getValue();
                    sr !== me && (me = sr,
                    A(sr))
                }
                ;
                return this._addDependent(B),
                I && (me = this.getValue(),
                A(me)),
                () => {
                    this._removeDependent(B),
                    v.offThisOrNextTick(Ie),
                    v.offNextTick(Ie)
                }
            }
            onStale(v) {
                const A = () => {
                    this._removeDependent(I)
                }
                  , I = () => v();
                return this._addDependent(I),
                A
            }
            keepHot() {
                return this.onStale( () => {}
                )
            }
            _addDependent(v) {
                this._state.hot || this._goHot(),
                this._state.handle.addDependent(v)
            }
            _goHot() {
                const v = new dc(this._fn,this);
                this._state = {
                    hot: !0,
                    handle: v
                }
            }
            _removeDependent(v) {
                const A = this._state;
                if (!A.hot)
                    return;
                const I = A.handle;
                I.removeDependent(v),
                I.hasDependents || (this._state = {
                    hot: !1,
                    handle: void 0
                },
                I.destroy())
            }
            getValue() {
                uc(this);
                const v = this._state;
                let A;
                return v.hot ? A = v.handle.getValue() : A = xn(this._fn),
                cc(this),
                A
            }
        }
          , ms = class {
            constructor(v) {
                this._hotHandle = v,
                this._refs = new Map,
                this.isPrismScope = !0,
                this.subs = {},
                this.effects = new Map,
                this.memos = new Map
            }
            ref(v, A) {
                let I = this._refs.get(v);
                if (I !== void 0)
                    return I;
                {
                    const B = {
                        current: A
                    };
                    return this._refs.set(v, B),
                    B
                }
            }
            effect(v, A, I) {
                let B = this.effects.get(v);
                B === void 0 && (B = {
                    cleanup: _s,
                    deps: void 0
                },
                this.effects.set(v, B)),
                ys(B.deps, I) && (B.cleanup(),
                Rr(),
                B.cleanup = go(A, _s).value,
                Pn(),
                B.deps = I)
            }
            memo(v, A, I) {
                let B = this.memos.get(v);
                return B === void 0 && (B = {
                    cachedValue: null,
                    deps: void 0
                },
                this.memos.set(v, B)),
                ys(B.deps, I) && (Rr(),
                B.cachedValue = go(A, void 0).value,
                Pn(),
                B.deps = I),
                B.cachedValue
            }
            state(v, A) {
                const {value: I, setValue: B} = this.memo("state/" + v, () => {
                    const me = {
                        current: A
                    };
                    return {
                        value: me,
                        setValue: At => {
                            me.current = At,
                            this._hotHandle.forceStale()
                        }
                    }
                }
                , []);
                return [I.current, B]
            }
            sub(v) {
                return this.subs[v] || (this.subs[v] = new ms(this._hotHandle)),
                this.subs[v]
            }
            cleanupEffects() {
                for (const v of this.effects.values())
                    go(v.cleanup, void 0);
                this.effects.clear()
            }
            source(v, A) {
                return this.effect("$$source/blah", () => v( () => {
                    this._hotHandle.forceStale()
                }
                ), [v]),
                A()
            }
        }
        ;
        function vs(v) {
            for (const A of Object.values(v.subs))
                vs(A);
            v.cleanupEffects()
        }
        function go(v, A) {
            try {
                return {
                    value: v(),
                    ok: !0
                }
            } catch (I) {
                return setTimeout(function() {
                    throw I
                }),
                {
                    value: A,
                    ok: !1
                }
            }
        }
        var vt = new ft;
        function hc(v, A) {
            const I = vt.peek();
            if (!I)
                throw new Error("prism.ref() is called outside of a prism() call.");
            return I.ref(v, A)
        }
        function ni(v, A, I) {
            const B = vt.peek();
            if (!B)
                throw new Error("prism.effect() is called outside of a prism() call.");
            return B.effect(v, A, I)
        }
        function ys(v, A) {
            if (v === void 0 || A === void 0)
                return !0;
            const I = v.length;
            if (I !== A.length)
                return !0;
            for (let B = 0; B < I; B++)
                if (v[B] !== A[B])
                    return !0;
            return !1
        }
        function bs(v, A, I) {
            const B = vt.peek();
            if (!B)
                throw new Error("prism.memo() is called outside of a prism() call.");
            return B.memo(v, A, I)
        }
        function Dt(v, A) {
            const I = vt.peek();
            if (!I)
                throw new Error("prism.state() is called outside of a prism() call.");
            return I.state(v, A)
        }
        function gc() {
            if (!vt.peek())
                throw new Error("The parent function is called outside of a prism() call.")
        }
        function _c(v, A) {
            const I = vt.peek();
            if (!I)
                throw new Error("prism.scope() is called outside of a prism() call.");
            const B = I.sub(v);
            vt.push(B);
            const me = go(A, void 0).value;
            return vt.pop(),
            me
        }
        function mc(v, A, I) {
            return bs(v, () => dt(A), I).getValue()
        }
        function ws() {
            return !!vt.peek()
        }
        function vc(v, A) {
            const I = vt.peek();
            if (!I)
                throw new Error("prism.source() is called outside of a prism() call.");
            return I.source(v, A)
        }
        var dt = v => new pc(v)
          , An = class {
            effect(v, A, I) {}
            memo(v, A, I) {
                return A()
            }
            state(v, A) {
                return [A, () => {}
                ]
            }
            ref(v, A) {
                return {
                    current: A
                }
            }
            sub(v) {
                return new An
            }
            source(v, A) {
                return A()
            }
        }
        ;
        function xn(v) {
            const A = new An;
            vt.push(A);
            let I;
            try {
                I = v()
            } catch (B) {} finally {
                const B = vt.pop()
            }
            return I
        }
        dt.ref = hc,
        dt.effect = ni,
        dt.memo = bs,
        dt.ensurePrism = gc,
        dt.state = Dt,
        dt.scope = _c,
        dt.sub = mc,
        dt.inPrism = ws,
        dt.source = vc;
        var kn = dt, Ts;
        (function(v) {
            v[v.Dict = 0] = "Dict",
            v[v.Array = 1] = "Array",
            v[v.Other = 2] = "Other"
        }
        )(Ts || (Ts = {}));
        var Ne = v => Array.isArray(v) ? 1 : ds(v) ? 0 : 2
          , oi = (v, A, I=Ne(v)) => I === 0 && typeof A == "string" || I === 1 && yc(A) ? v[A] : void 0
          , yc = v => {
            const A = typeof v == "number" ? v : parseInt(v, 10);
            return !isNaN(A) && A >= 0 && A < 1 / 0 && (A | 0) === A
        }
          , Ss = class {
            constructor(v, A) {
                this._parent = v,
                this._path = A,
                this.children = new Map,
                this.identityChangeListeners = new Set
            }
            addIdentityChangeListener(v) {
                this.identityChangeListeners.add(v)
            }
            removeIdentityChangeListener(v) {
                this.identityChangeListeners.delete(v),
                this._checkForGC()
            }
            removeChild(v) {
                this.children.delete(v),
                this._checkForGC()
            }
            getChild(v) {
                return this.children.get(v)
            }
            getOrCreateChild(v) {
                let A = this.children.get(v);
                return A || (A = A = new Ss(this,this._path.concat([v])),
                this.children.set(v, A)),
                A
            }
            _checkForGC() {
                this.identityChangeListeners.size > 0 || this.children.size > 0 || this._parent && this._parent.removeChild(sc(this._path))
            }
        }
          , Cs = class {
            constructor(v) {
                this.$$isPointerToPrismProvider = !0,
                this.pointer = Qo({
                    root: this,
                    path: []
                }),
                this.prism = this.pointerToPrism(this.pointer),
                this._onPointerValueChange = (A, I) => {
                    const {path: B} = Cn(A)
                      , me = this._getOrCreateScopeForPath(B);
                    return me.identityChangeListeners.add(I),
                    () => {
                        me.identityChangeListeners.delete(I)
                    }
                }
                ,
                this._currentState = v,
                this._rootScope = new Ss(void 0,[])
            }
            set(v) {
                const A = this._currentState;
                this._currentState = v,
                this._checkUpdates(this._rootScope, A, v)
            }
            get() {
                return this._currentState
            }
            getByPointer(v) {
                const A = Or(v) ? v : v(this.pointer)
                  , I = Cn(A).path;
                return this._getIn(I)
            }
            _getIn(v) {
                return v.length === 0 ? this.get() : Yl(this.get(), v)
            }
            reduce(v) {
                this.set(v(this.get()))
            }
            reduceByPointer(v, A) {
                const I = Or(v) ? v : v(this.pointer)
                  , B = Cn(I).path
                  , me = gs(this.get(), B, A);
                this.set(me)
            }
            setByPointer(v, A) {
                this.reduceByPointer(v, () => A)
            }
            _checkUpdates(v, A, I) {
                if (A === I)
                    return;
                for (const Ie of v.identityChangeListeners)
                    Ie(I);
                if (v.children.size === 0)
                    return;
                const B = Ne(A)
                  , me = Ne(I);
                if (!(B === 2 && B === me))
                    for (const [Ie,At] of v.children) {
                        const sr = oi(A, Ie, B)
                          , xs = oi(I, Ie, me);
                        this._checkUpdates(At, sr, xs)
                    }
            }
            _getOrCreateScopeForPath(v) {
                let A = this._rootScope;
                for (const I of v)
                    A = A.getOrCreateChild(I);
                return A
            }
            pointerToPrism(v) {
                const {path: A} = Cn(v)
                  , I = me => this._onPointerValueChange(v, me)
                  , B = () => this._getIn(A);
                return kn( () => kn.source(I, B))
            }
        }
          , Ps = new WeakMap;
        function bc(v) {
            return typeof v == "object" && v !== null && v.$$isPointerToPrismProvider === !0
        }
        var _o = v => {
            const A = dr(v);
            let I = Ps.get(A);
            if (!I) {
                const B = A.root;
                if (!bc(B))
                    throw new Error("Cannot run pointerToPrism() on a pointer whose root is not an PointerToPrismProvider");
                I = B.pointerToPrism(v),
                Ps.set(A, I)
            }
            return I
        }
          , ii = v => Or(v) ? _o(v).getValue() : ho(v) ? v.getValue() : v;
        function *wc(v) {
            let A;
            if (Or(v))
                A = _o(v);
            else if (ho(v))
                A = v;
            else
                throw new Error("Only pointers and prisms are supported");
            let I = 0;
            const B = A.onStale( () => {
                I++
            }
            );
            try {
                for (; ; ) {
                    const me = I;
                    I = 0,
                    yield{
                        value: A.getValue(),
                        ticks: me
                    }
                }
            } finally {
                B()
            }
        }
        var Tc = 60 * 3
          , As = class {
            constructor(v) {
                this._conf = v,
                this._ticking = !1,
                this._dormant = !0,
                this._numberOfDormantTicks = 0,
                this.__ticks = 0,
                this._scheduledForThisOrNextTick = new Set,
                this._scheduledForNextTick = new Set,
                this._timeAtCurrentTick = 0
            }
            get dormant() {
                return this._dormant
            }
            onThisOrNextTick(v) {
                this._scheduledForThisOrNextTick.add(v),
                this._dormant && this._goActive()
            }
            onNextTick(v) {
                this._scheduledForNextTick.add(v),
                this._dormant && this._goActive()
            }
            offThisOrNextTick(v) {
                this._scheduledForThisOrNextTick.delete(v)
            }
            offNextTick(v) {
                this._scheduledForNextTick.delete(v)
            }
            get time() {
                return this._ticking ? this._timeAtCurrentTick : performance.now()
            }
            _goActive() {
                var v, A;
                this._dormant && (this._dormant = !1,
                (A = (v = this._conf) == null ? void 0 : v.onActive) == null || A.call(v))
            }
            _goDormant() {
                var v, A;
                this._dormant || (this._dormant = !0,
                this._numberOfDormantTicks = 0,
                (A = (v = this._conf) == null ? void 0 : v.onDormant) == null || A.call(v))
            }
            tick(v=performance.now()) {
                if (this.__ticks++,
                !this._dormant && this._scheduledForNextTick.size === 0 && this._scheduledForThisOrNextTick.size === 0 && (this._numberOfDormantTicks++,
                this._numberOfDormantTicks >= Tc)) {
                    this._goDormant();
                    return
                }
                this._ticking = !0,
                this._timeAtCurrentTick = v;
                for (const A of this._scheduledForNextTick)
                    this._scheduledForThisOrNextTick.add(A);
                this._scheduledForNextTick.clear(),
                this._tick(0),
                this._ticking = !1
            }
            _tick(v) {
                const A = this.time;
                if (v > 10,
                v > 100)
                    throw new Error("Maximum recursion limit for _tick()");
                const I = this._scheduledForThisOrNextTick;
                this._scheduledForThisOrNextTick = new Set;
                for (const B of I)
                    B(A);
                if (this._scheduledForThisOrNextTick.size > 0)
                    return this._tick(v + 1)
            }
        }
        ;
        function *Sc(v) {
            let A;
            if (Or(v))
                A = _o(v);
            else if (ho(v))
                A = v;
            else
                throw new Error("Only pointers and prisms are supported");
            const I = new As
              , B = A.onChange(I, me => {}
            );
            try {
                for (; ; )
                    I.tick(),
                    yield A.getValue()
            } finally {
                B()
            }
        }
        var Cc = class {
            constructor(v) {
                this.$$isPointerToPrismProvider = !0,
                this._currentPointerBox = new Cs(v),
                this.pointer = Qo({
                    root: this,
                    path: []
                })
            }
            setPointer(v) {
                this._currentPointerBox.set(v)
            }
            pointerToPrism(v) {
                const {path: A} = dr(v);
                return kn( () => {
                    const I = this._currentPointerBox.prism.getValue()
                      , B = A.reduce( (me, Ie) => me[Ie], I);
                    return ii(B)
                }
                )
            }
        }
    }(Lu)),
    Lu
}
Pi.exports;
var j0;
function N9() {
    return j0 || (j0 = 1,
    function(e, t) {
        var r = Object.create
          , o = Object.defineProperty
          , i = Object.defineProperties
          , s = Object.getOwnPropertyDescriptor
          , c = Object.getOwnPropertyDescriptors
          , d = Object.getOwnPropertyNames
          , h = Object.getOwnPropertySymbols
          , _ = Object.getPrototypeOf
          , g = Object.prototype.hasOwnProperty
          , l = Object.prototype.propertyIsEnumerable
          , f = (n, a, u) => a in n ? o(n, a, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: u
        }) : n[a] = u
          , p = (n, a) => {
            for (var u in a || (a = {}))
                g.call(a, u) && f(n, u, a[u]);
            if (h)
                for (var u of h(a))
                    l.call(a, u) && f(n, u, a[u]);
            return n
        }
          , y = (n, a) => i(n, c(a))
          , w = (n, a) => function() {
            return a || (0,
            n[d(n)[0]])((a = {
                exports: {}
            }).exports, a),
            a.exports
        }
          , x = (n, a) => {
            for (var u in a)
                o(n, u, {
                    get: a[u],
                    enumerable: !0
                })
        }
          , P = (n, a, u, m) => {
            if (a && typeof a == "object" || typeof a == "function")
                for (let b of d(a))
                    !g.call(n, b) && b !== u && o(n, b, {
                        get: () => a[b],
                        enumerable: !(m = s(a, b)) || m.enumerable
                    });
            return n
        }
          , E = (n, a, u) => (u = n != null ? r(_(n)) : {},
        P(!n || !n.__esModule ? o(u, "default", {
            value: n,
            enumerable: !0
        }) : u, n))
          , C = n => P(o({}, "__esModule", {
            value: !0
        }), n)
          , S = (n, a, u) => (f(n, typeof a != "symbol" ? a + "" : a, u),
        u)
          , M = w({
            "../node_modules/timing-function/lib/UnitBezier.js"(n, a) {
                a.exports = function() {
                    function u(m, b, T, R) {
                        this.set(m, b, T, R)
                    }
                    return u.prototype.set = function(m, b, T, R) {
                        this._cx = 3 * m,
                        this._bx = 3 * (T - m) - this._cx,
                        this._ax = 1 - this._cx - this._bx,
                        this._cy = 3 * b,
                        this._by = 3 * (R - b) - this._cy,
                        this._ay = 1 - this._cy - this._by
                    }
                    ,
                    u.epsilon = 1e-6,
                    u.prototype._sampleCurveX = function(m) {
                        return ((this._ax * m + this._bx) * m + this._cx) * m
                    }
                    ,
                    u.prototype._sampleCurveY = function(m) {
                        return ((this._ay * m + this._by) * m + this._cy) * m
                    }
                    ,
                    u.prototype._sampleCurveDerivativeX = function(m) {
                        return (3 * this._ax * m + 2 * this._bx) * m + this._cx
                    }
                    ,
                    u.prototype._solveCurveX = function(m, b) {
                        var T, R, j, H, N, J;
                        for (j = void 0,
                        H = void 0,
                        N = void 0,
                        J = void 0,
                        T = void 0,
                        R = void 0,
                        N = m,
                        R = 0; R < 8; ) {
                            if (J = this._sampleCurveX(N) - m,
                            Math.abs(J) < b)
                                return N;
                            if (T = this._sampleCurveDerivativeX(N),
                            Math.abs(T) < b)
                                break;
                            N = N - J / T,
                            R++
                        }
                        if (j = 0,
                        H = 1,
                        N = m,
                        N < j)
                            return j;
                        if (N > H)
                            return H;
                        for (; j < H; ) {
                            if (J = this._sampleCurveX(N),
                            Math.abs(J - m) < b)
                                return N;
                            m > J ? j = N : H = N,
                            N = (H - j) * .5 + j
                        }
                        return N
                    }
                    ,
                    u.prototype.solve = function(m, b) {
                        return this._sampleCurveY(this._solveCurveX(m, b))
                    }
                    ,
                    u.prototype.solveSimple = function(m) {
                        return this._sampleCurveY(this._solveCurveX(m, 1e-6))
                    }
                    ,
                    u
                }()
            }
        })
          , F = w({
            "../node_modules/levenshtein-edit-distance/index.js"(n, a) {
                var u, m;
                u = [],
                m = [];
                function b(T, R, j) {
                    var H, N, J, Z, ie, pe, fe, Ce;
                    if (T === R)
                        return 0;
                    if (H = T.length,
                    N = R.length,
                    H === 0)
                        return N;
                    if (N === 0)
                        return H;
                    for (j && (T = T.toLowerCase(),
                    R = R.toLowerCase()),
                    fe = 0; fe < H; )
                        m[fe] = T.charCodeAt(fe),
                        u[fe] = ++fe;
                    for (Ce = 0; Ce < N; )
                        for (J = R.charCodeAt(Ce),
                        Z = ie = Ce++,
                        fe = -1; ++fe < H; )
                            pe = J === m[fe] ? ie : ie + 1,
                            ie = u[fe],
                            u[fe] = Z = ie > Z ? pe > Z ? Z + 1 : pe : pe > ie ? ie + 1 : pe;
                    return Z
                }
                a.exports = b
            }
        })
          , W = w({
            "../node_modules/propose/propose.js"(n, a) {
                var u = F();
                function m() {
                    var b, T, R, j, H, N = 0, J = arguments[0], Z = arguments[1], ie = Z.length, pe = arguments[2];
                    pe && (j = pe.threshold,
                    H = pe.ignoreCase),
                    j === void 0 && (j = 0);
                    for (var fe = 0; fe < ie; ++fe)
                        H ? T = u(J, Z[fe], !0) : T = u(J, Z[fe]),
                        T > J.length ? b = 1 - T / Z[fe].length : b = 1 - T / J.length,
                        b > N && (N = b,
                        R = Z[fe]);
                    return N >= j ? R : null
                }
                a.exports = m
            }
        })
          , Q = w({
            "../node_modules/fast-deep-equal/index.js"(n, a) {
                a.exports = function u(m, b) {
                    if (m === b)
                        return !0;
                    if (m && b && typeof m == "object" && typeof b == "object") {
                        if (m.constructor !== b.constructor)
                            return !1;
                        var T, R, j;
                        if (Array.isArray(m)) {
                            if (T = m.length,
                            T != b.length)
                                return !1;
                            for (R = T; R-- !== 0; )
                                if (!u(m[R], b[R]))
                                    return !1;
                            return !0
                        }
                        if (m.constructor === RegExp)
                            return m.source === b.source && m.flags === b.flags;
                        if (m.valueOf !== Object.prototype.valueOf)
                            return m.valueOf() === b.valueOf();
                        if (m.toString !== Object.prototype.toString)
                            return m.toString() === b.toString();
                        if (j = Object.keys(m),
                        T = j.length,
                        T !== Object.keys(b).length)
                            return !1;
                        for (R = T; R-- !== 0; )
                            if (!Object.prototype.hasOwnProperty.call(b, j[R]))
                                return !1;
                        for (R = T; R-- !== 0; ) {
                            var H = j[R];
                            if (!u(m[H], b[H]))
                                return !1
                        }
                        return !0
                    }
                    return m !== m && b !== b
                }
            }
        })
          , $ = {};
        x($, {
            createRafDriver: () => Kc,
            getProject: () => sh,
            notify: () => yo,
            onChange: () => hu,
            types: () => Wc,
            val: () => ah
        }),
        e.exports = C($);
        var G = {};
        x(G, {
            createRafDriver: () => Kc,
            getProject: () => sh,
            notify: () => yo,
            onChange: () => hu,
            types: () => Wc,
            val: () => ah
        });
        var ae = pt()
          , U = class {
            constructor() {
                S(this, "atom", new ae.Atom({
                    projects: {}
                }))
            }
            add(n, a) {
                this.atom.setByPointer(u => u.projects[n], a)
            }
            get(n) {
                return this.atom.get().projects[n]
            }
            has(n) {
                return !!this.get(n)
            }
        }
          , ce = new U
          , ve = ce
          , Pe = new WeakMap;
        function Y(n) {
            return Pe.get(n)
        }
        function he(n, a) {
            Pe.set(n, a)
        }
        var le = []
          , Fe = Array.isArray
          , it = Fe
          , St = typeof Ft == "object" && Ft && Ft.Object === Object && Ft
          , at = St
          , Re = typeof self == "object" && self && self.Object === Object && self
          , et = at || Re || Function("return this")()
          , Ve = et
          , mt = Ve.Symbol
          , V = mt
          , se = Object.prototype
          , oe = se.hasOwnProperty
          , ue = se.toString
          , xe = V ? V.toStringTag : void 0;
        function $e(n) {
            var a = oe.call(n, xe)
              , u = n[xe];
            try {
                n[xe] = void 0;
                var m = !0
            } catch {}
            var b = ue.call(n);
            return m && (a ? n[xe] = u : delete n[xe]),
            b
        }
        var k = $e
          , O = Object.prototype
          , L = O.toString;
        function q(n) {
            return L.call(n)
        }
        var z = q
          , X = "[object Null]"
          , ne = "[object Undefined]"
          , te = V ? V.toStringTag : void 0;
        function ee(n) {
            return n == null ? n === void 0 ? ne : X : te && te in Object(n) ? k(n) : z(n)
        }
        var K = ee;
        function ge(n) {
            return n != null && typeof n == "object"
        }
        var re = ge
          , de = "[object Symbol]";
        function ye(n) {
            return typeof n == "symbol" || re(n) && K(n) == de
        }
        var Ae = ye
          , De = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
          , Me = /^\w*$/;
        function Ct(n, a) {
            if (it(n))
                return !1;
            var u = typeof n;
            return u == "number" || u == "symbol" || u == "boolean" || n == null || Ae(n) ? !0 : Me.test(n) || !De.test(n) || a != null && n in Object(a)
        }
        var st = Ct;
        function Ht(n) {
            var a = typeof n;
            return n != null && (a == "object" || a == "function")
        }
        var Ue = Ht
          , xr = "[object AsyncFunction]"
          , io = "[object Function]"
          , Pt = "[object GeneratorFunction]"
          , zt = "[object Proxy]";
        function vn(n) {
            if (!Ue(n))
                return !1;
            var a = K(n);
            return a == io || a == Pt || a == xr || a == zt
        }
        var rs = vn
          , yn = Ve["__core-js_shared__"]
          , Xo = yn
          , ns = function() {
            var n = /[^.]+$/.exec(Xo && Xo.keys && Xo.keys.IE_PROTO || "");
            return n ? "Symbol(src)_1." + n : ""
        }();
        function Za(n) {
            return !!ns && ns in n
        }
        var Qa = Za
          , el = Function.prototype
          , tl = el.toString;
        function rl(n) {
            if (n != null) {
                try {
                    return tl.call(n)
                } catch {}
                try {
                    return n + ""
                } catch {}
            }
            return ""
        }
        var kr = rl
          , nl = /[\\^$.*+?()[\]{}|]/g
          , ol = /^\[object .+?Constructor\]$/
          , il = Function.prototype
          , sl = Object.prototype
          , al = il.toString
          , ll = sl.hasOwnProperty
          , cl = RegExp("^" + al.call(ll).replace(nl, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        function ul(n) {
            if (!Ue(n) || Qa(n))
                return !1;
            var a = rs(n) ? cl : ol;
            return a.test(kr(n))
        }
        var Xr = ul;
        function os(n, a) {
            return n?.[a]
        }
        var fl = os;
        function dl(n, a) {
            var u = fl(n, a);
            return Xr(u) ? u : void 0
        }
        var Er = dl
          , pl = Er(Object, "create")
          , bn = pl;
        function so() {
            this.__data__ = bn ? bn(null) : {},
            this.size = 0
        }
        var hl = so;
        function gl(n) {
            var a = this.has(n) && delete this.__data__[n];
            return this.size -= a ? 1 : 0,
            a
        }
        var _l = gl
          , ml = "__lodash_hash_undefined__"
          , vl = Object.prototype
          , yl = vl.hasOwnProperty;
        function bl(n) {
            var a = this.__data__;
            if (bn) {
                var u = a[n];
                return u === ml ? void 0 : u
            }
            return yl.call(a, n) ? a[n] : void 0
        }
        var wl = bl
          , Tl = Object.prototype
          , Sl = Tl.hasOwnProperty;
        function Jr(n) {
            var a = this.__data__;
            return bn ? a[n] !== void 0 : Sl.call(a, n)
        }
        var Cl = Jr
          , Pl = "__lodash_hash_undefined__";
        function Al(n, a) {
            var u = this.__data__;
            return this.size += this.has(n) ? 0 : 1,
            u[n] = bn && a === void 0 ? Pl : a,
            this
        }
        var xl = Al;
        function Yr(n) {
            var a = -1
              , u = n == null ? 0 : n.length;
            for (this.clear(); ++a < u; ) {
                var m = n[a];
                this.set(m[0], m[1])
            }
        }
        Yr.prototype.clear = hl,
        Yr.prototype.delete = _l,
        Yr.prototype.get = wl,
        Yr.prototype.has = Cl,
        Yr.prototype.set = xl;
        var is = Yr;
        function kl() {
            this.__data__ = [],
            this.size = 0
        }
        var El = kl;
        function ao(n, a) {
            return n === a || n !== n && a !== a
        }
        var Jo = ao;
        function Ol(n, a) {
            for (var u = n.length; u--; )
                if (Jo(n[u][0], a))
                    return u;
            return -1
        }
        var lo = Ol
          , Rl = Array.prototype
          , Ml = Rl.splice;
        function Il(n) {
            var a = this.__data__
              , u = lo(a, n);
            if (u < 0)
                return !1;
            var m = a.length - 1;
            return u == m ? a.pop() : Ml.call(a, u, 1),
            --this.size,
            !0
        }
        var jl = Il;
        function Hl(n) {
            var a = this.__data__
              , u = lo(a, n);
            return u < 0 ? void 0 : a[u][1]
        }
        var Zr = Hl;
        function ss(n) {
            return lo(this.__data__, n) > -1
        }
        var Dl = ss;
        function Yo(n, a) {
            var u = this.__data__
              , m = lo(u, n);
            return m < 0 ? (++this.size,
            u.push([n, a])) : u[m][1] = a,
            this
        }
        var Ll = Yo;
        function Qr(n) {
            var a = -1
              , u = n == null ? 0 : n.length;
            for (this.clear(); ++a < u; ) {
                var m = n[a];
                this.set(m[0], m[1])
            }
        }
        Qr.prototype.clear = El,
        Qr.prototype.delete = jl,
        Qr.prototype.get = Zr,
        Qr.prototype.has = Dl,
        Qr.prototype.set = Ll;
        var co = Qr
          , Bl = Er(Ve, "Map")
          , wn = Bl;
        function Nl() {
            this.size = 0,
            this.__data__ = {
                hash: new is,
                map: new (wn || co),
                string: new is
            }
        }
        var Fl = Nl;
        function Vl(n) {
            var a = typeof n;
            return a == "string" || a == "number" || a == "symbol" || a == "boolean" ? n !== "__proto__" : n === null
        }
        var $l = Vl;
        function zl(n, a) {
            var u = n.__data__;
            return $l(a) ? u[typeof a == "string" ? "string" : "hash"] : u.map
        }
        var Tn = zl;
        function as(n) {
            var a = Tn(this, n).delete(n);
            return this.size -= a ? 1 : 0,
            a
        }
        var ls = as;
        function Ul(n) {
            return Tn(this, n).get(n)
        }
        var ql = Ul;
        function Kl(n) {
            return Tn(this, n).has(n)
        }
        var Wl = Kl;
        function Gl(n, a) {
            var u = Tn(this, n)
              , m = u.size;
            return u.set(n, a),
            this.size += u.size == m ? 0 : 1,
            this
        }
        var Xl = Gl;
        function en(n) {
            var a = -1
              , u = n == null ? 0 : n.length;
            for (this.clear(); ++a < u; ) {
                var m = n[a];
                this.set(m[0], m[1])
            }
        }
        en.prototype.clear = Fl,
        en.prototype.delete = ls,
        en.prototype.get = ql,
        en.prototype.has = Wl,
        en.prototype.set = Xl;
        var uo = en
          , Jl = "Expected a function";
        function Zo(n, a) {
            if (typeof n != "function" || a != null && typeof a != "function")
                throw new TypeError(Jl);
            var u = function() {
                var m = arguments
                  , b = a ? a.apply(this, m) : m[0]
                  , T = u.cache;
                if (T.has(b))
                    return T.get(b);
                var R = n.apply(this, m);
                return u.cache = T.set(b, R) || T,
                R
            };
            return u.cache = new (Zo.Cache || uo),
            u
        }
        Zo.Cache = uo;
        var Yl = Zo
          , Zl = 500;
        function Ql(n) {
            var a = Yl(n, function(m) {
                return u.size === Zl && u.clear(),
                m
            })
              , u = a.cache;
            return a
        }
        var ec = Ql
          , tc = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
          , rc = /\\(\\)?/g
          , nc = ec(function(n) {
            var a = [];
            return n.charCodeAt(0) === 46 && a.push(""),
            n.replace(tc, function(u, m, b, T) {
                a.push(b ? T.replace(rc, "$1") : m || u)
            }),
            a
        })
          , oc = nc;
        function cs(n, a) {
            for (var u = -1, m = n == null ? 0 : n.length, b = Array(m); ++u < m; )
                b[u] = a(n[u], u, n);
            return b
        }
        var ic = cs
          , us = V ? V.prototype : void 0
          , fs = us ? us.toString : void 0;
        function ds(n) {
            if (typeof n == "string")
                return n;
            if (it(n))
                return ic(n, ds) + "";
            if (Ae(n))
                return fs ? fs.call(n) : "";
            var a = n + "";
            return a == "0" && 1 / n == -1 / 0 ? "-0" : a
        }
        var ps = ds;
        function sc(n) {
            return n == null ? "" : ps(n)
        }
        var fo = sc;
        function hs(n, a) {
            return it(n) ? n : st(n, a) ? [n] : oc(fo(n))
        }
        var Sn = hs;
        function ac(n) {
            if (typeof n == "string" || Ae(n))
                return n;
            var a = n + "";
            return a == "0" && 1 / n == -1 / 0 ? "-0" : a
        }
        var dr = ac;
        function Cn(n, a) {
            a = Sn(a, n);
            for (var u = 0, m = a.length; n != null && u < m; )
                n = n[dr(a[u++])];
            return u && u == m ? n : void 0
        }
        var po = Cn;
        function Qo(n, a, u) {
            var m = n == null ? void 0 : po(n, a);
            return m === void 0 ? u : m
        }
        var Or = Qo;
        function gs(n, a) {
            return a.length === 0 ? n : Or(n, a)
        }
        var tn = class {
            constructor() {
                S(this, "_values", {})
            }
            get(n, a) {
                if (this.has(n))
                    return this._values[n];
                {
                    const u = a();
                    return this._values[n] = u,
                    u
                }
            }
            has(n) {
                return this._values.hasOwnProperty(n)
            }
        }
          , ft = pt()
          , ho = function() {
            try {
                var n = Er(Object, "defineProperty");
                return n({}, "", {}),
                n
            } catch {}
        }()
          , ei = ho;
        function lc(n, a, u) {
            a == "__proto__" && ei ? ei(n, a, {
                configurable: !0,
                enumerable: !0,
                value: u,
                writable: !0
            }) : n[a] = u
        }
        var Rr = lc
          , Pn = Object.prototype
          , cc = Pn.hasOwnProperty;
        function uc(n, a, u) {
            var m = n[a];
            (!(cc.call(n, a) && Jo(m, u)) || u === void 0 && !(a in n)) && Rr(n, a, u)
        }
        var ti = uc
          , fc = 9007199254740991
          , _s = /^(?:0|[1-9]\d*)$/;
        function dc(n, a) {
            var u = typeof n;
            return a = a ?? fc,
            !!a && (u == "number" || u != "symbol" && _s.test(n)) && n > -1 && n % 1 == 0 && n < a
        }
        var ri = dc;
        function pc(n, a, u, m) {
            if (!Ue(n))
                return n;
            a = Sn(a, n);
            for (var b = -1, T = a.length, R = T - 1, j = n; j != null && ++b < T; ) {
                var H = dr(a[b])
                  , N = u;
                if (H === "__proto__" || H === "constructor" || H === "prototype")
                    return n;
                if (b != R) {
                    var J = j[H];
                    N = m ? m(J, H, j) : void 0,
                    N === void 0 && (N = Ue(J) ? J : ri(a[b + 1]) ? [] : {})
                }
                ti(j, H, N),
                j = j[H]
            }
            return n
        }
        var ms = pc;
        function vs(n, a, u) {
            return n == null ? n : ms(n, a, u)
        }
        var go = vs
          , vt = new WeakMap;
        function hc(n) {
            return ni(n)
        }
        function ni(n) {
            if (vt.has(n))
                return vt.get(n);
            const a = n.type === "compound" ? bs(n) : n.type === "enum" ? ys(n) : n.default;
            return vt.set(n, a),
            a
        }
        function ys(n) {
            const a = {
                $case: n.defaultCase
            };
            for (const [u,m] of Object.entries(n.cases))
                a[u] = ni(m);
            return a
        }
        function bs(n) {
            const a = {};
            for (const [u,m] of Object.entries(n.props))
                a[u] = ni(m);
            return a
        }
        var Dt = pt()
          , gc = E(M());
        function _c(n, a, u) {
            return (0,
            Dt.prism)( () => {
                const m = (0,
                Dt.val)(a);
                return Dt.prism.memo("driver", () => m ? m.type === "BasicKeyframedTrack" ? mc(n, m, u) : (n.logger.error("Track type not yet supported."),
                (0,
                Dt.prism)( () => {}
                )) : (0,
                Dt.prism)( () => {}
                ), [m]).getValue()
            }
            )
        }
        function mc(n, a, u) {
            return (0,
            Dt.prism)( () => {
                let m = Dt.prism.ref("state", {
                    started: !1
                })
                  , b = m.current;
                const T = u.getValue();
                return (!b.started || T < b.validFrom || b.validTo <= T) && (m.current = b = vc(n, u, a)),
                b.der.getValue()
            }
            )
        }
        var ws = (0,
        Dt.prism)( () => {}
        );
        function vc(n, a, u) {
            const m = a.getValue();
            if (u.keyframes.length === 0)
                return {
                    started: !0,
                    validFrom: -1 / 0,
                    validTo: 1 / 0,
                    der: ws
                };
            let b = 0;
            for (; ; ) {
                const T = u.keyframes[b];
                if (!T)
                    return dt.error;
                const R = b === u.keyframes.length - 1;
                if (m < T.position)
                    return b === 0 ? dt.beforeFirstKeyframe(T) : dt.error;
                if (T.position === m)
                    return R ? dt.lastKeyframe(T) : dt.between(T, u.keyframes[b + 1], a);
                if (b === u.keyframes.length - 1)
                    return dt.lastKeyframe(T);
                {
                    const j = b + 1;
                    if (u.keyframes[j].position <= m) {
                        b = j;
                        continue
                    } else
                        return dt.between(T, u.keyframes[b + 1], a)
                }
            }
        }
        var dt = {
            beforeFirstKeyframe(n) {
                return {
                    started: !0,
                    validFrom: -1 / 0,
                    validTo: n.position,
                    der: (0,
                    Dt.prism)( () => ({
                        left: n.value,
                        progression: 0
                    }))
                }
            },
            lastKeyframe(n) {
                return {
                    started: !0,
                    validFrom: n.position,
                    validTo: 1 / 0,
                    der: (0,
                    Dt.prism)( () => ({
                        left: n.value,
                        progression: 0
                    }))
                }
            },
            between(n, a, u) {
                if (!n.connectedRight)
                    return {
                        started: !0,
                        validFrom: n.position,
                        validTo: a.position,
                        der: (0,
                        Dt.prism)( () => ({
                            left: n.value,
                            progression: 0
                        }))
                    };
                const m = T => (T - n.position) / (a.position - n.position);
                if (!n.type || n.type === "bezier") {
                    const T = new gc.default(n.handles[2],n.handles[3],a.handles[0],a.handles[1])
                      , R = (0,
                    Dt.prism)( () => {
                        const j = m(u.getValue())
                          , H = T.solveSimple(j);
                        return {
                            left: n.value,
                            right: a.value,
                            progression: H
                        }
                    }
                    );
                    return {
                        started: !0,
                        validFrom: n.position,
                        validTo: a.position,
                        der: R
                    }
                }
                const b = (0,
                Dt.prism)( () => {
                    const T = m(u.getValue())
                      , R = Math.floor(T);
                    return {
                        left: n.value,
                        right: a.value,
                        progression: R
                    }
                }
                );
                return {
                    started: !0,
                    validFrom: n.position,
                    validTo: a.position,
                    der: b
                }
            },
            error: {
                started: !0,
                validFrom: -1 / 0,
                validTo: 1 / 0,
                der: ws
            }
        };
        function An(n, a, u) {
            const b = u.get(n);
            if (b && b.override === a)
                return b.merged;
            const T = p({}, n);
            for (const R of Object.keys(a)) {
                const j = a[R]
                  , H = n[R];
                T[R] = typeof j == "object" && typeof H == "object" ? An(H, j, u) : j === void 0 ? H : j
            }
            return u.set(n, {
                override: a,
                merged: T
            }),
            T
        }
        function xn(n, a) {
            let u = n;
            for (const m of a)
                u = u[m];
            return u
        }
        var kn = pt()
          , Ts = (n, a) => {
            const u = kn.prism.memo(n, () => new kn.Atom(a), []);
            return u.set(a),
            u
        }
          , Ne = pt()
          , oi = pt()
          , yc = /\s/;
        function Ss(n) {
            for (var a = n.length; a-- && yc.test(n.charAt(a)); )
                ;
            return a
        }
        var Cs = Ss
          , Ps = /^\s+/;
        function bc(n) {
            return n && n.slice(0, Cs(n) + 1).replace(Ps, "")
        }
        var _o = bc
          , ii = NaN
          , wc = /^[-+]0x[0-9a-f]+$/i
          , Tc = /^0b[01]+$/i
          , As = /^0o[0-7]+$/i
          , Sc = parseInt;
        function Cc(n) {
            if (typeof n == "number")
                return n;
            if (Ae(n))
                return ii;
            if (Ue(n)) {
                var a = typeof n.valueOf == "function" ? n.valueOf() : n;
                n = Ue(a) ? a + "" : a
            }
            if (typeof n != "string")
                return n === 0 ? n : +n;
            n = _o(n);
            var u = Tc.test(n);
            return u || As.test(n) ? Sc(n.slice(2), u ? 2 : 8) : wc.test(n) ? ii : +n
        }
        var v = Cc
          , A = 1 / 0
          , I = 17976931348623157e292;
        function B(n) {
            if (!n)
                return n === 0 ? n : 0;
            if (n = v(n),
            n === A || n === -1 / 0) {
                var a = n < 0 ? -1 : 1;
                return a * I
            }
            return n === n ? n : 0
        }
        var me = B;
        function Ie(n) {
            var a = me(n)
              , u = a % 1;
            return a === a ? u ? a - u : a : 0
        }
        var At = Ie;
        function sr(n) {
            return n
        }
        var xs = sr
          , rn = Er(Ve, "WeakMap")
          , En = rn
          , md = Object.create
          , Om = function() {
            function n() {}
            return function(a) {
                if (!Ue(a))
                    return {};
                if (md)
                    return md(a);
                n.prototype = a;
                var u = new n;
                return n.prototype = void 0,
                u
            }
        }()
          , Rm = Om;
        function Mm(n, a) {
            var u = -1
              , m = n.length;
            for (a || (a = Array(m)); ++u < m; )
                a[u] = n[u];
            return a
        }
        var Im = Mm;
        function jm(n, a) {
            for (var u = -1, m = n == null ? 0 : n.length; ++u < m && a(n[u], u, n) !== !1; )
                ;
            return n
        }
        var Hm = jm;
        function Dm(n, a, u, m) {
            var b = !u;
            u || (u = {});
            for (var T = -1, R = a.length; ++T < R; ) {
                var j = a[T]
                  , H = m ? m(u[j], n[j], j, u, n) : void 0;
                H === void 0 && (H = n[j]),
                b ? Rr(u, j, H) : ti(u, j, H)
            }
            return u
        }
        var ks = Dm
          , Lm = 9007199254740991;
        function Bm(n) {
            return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Lm
        }
        var Pc = Bm;
        function Nm(n) {
            return n != null && Pc(n.length) && !rs(n)
        }
        var vd = Nm
          , Fm = Object.prototype;
        function Vm(n) {
            var a = n && n.constructor
              , u = typeof a == "function" && a.prototype || Fm;
            return n === u
        }
        var Ac = Vm;
        function $m(n, a) {
            for (var u = -1, m = Array(n); ++u < n; )
                m[u] = a(u);
            return m
        }
        var zm = $m
          , Um = "[object Arguments]";
        function qm(n) {
            return re(n) && K(n) == Um
        }
        var yd = qm
          , bd = Object.prototype
          , Km = bd.hasOwnProperty
          , Wm = bd.propertyIsEnumerable
          , Gm = yd(function() {
            return arguments
        }()) ? yd : function(n) {
            return re(n) && Km.call(n, "callee") && !Wm.call(n, "callee")
        }
          , wd = Gm;
        function Xm() {
            return !1
        }
        var Jm = Xm
          , Td = t && !t.nodeType && t
          , Sd = Td && !0 && e && !e.nodeType && e
          , Ym = Sd && Sd.exports === Td
          , Cd = Ym ? Ve.Buffer : void 0
          , Zm = Cd ? Cd.isBuffer : void 0
          , Qm = Zm || Jm
          , Es = Qm
          , ev = "[object Arguments]"
          , tv = "[object Array]"
          , rv = "[object Boolean]"
          , nv = "[object Date]"
          , ov = "[object Error]"
          , iv = "[object Function]"
          , sv = "[object Map]"
          , av = "[object Number]"
          , lv = "[object Object]"
          , cv = "[object RegExp]"
          , uv = "[object Set]"
          , fv = "[object String]"
          , dv = "[object WeakMap]"
          , pv = "[object ArrayBuffer]"
          , hv = "[object DataView]"
          , gv = "[object Float32Array]"
          , _v = "[object Float64Array]"
          , mv = "[object Int8Array]"
          , vv = "[object Int16Array]"
          , yv = "[object Int32Array]"
          , bv = "[object Uint8Array]"
          , wv = "[object Uint8ClampedArray]"
          , Tv = "[object Uint16Array]"
          , Sv = "[object Uint32Array]"
          , tt = {};
        tt[gv] = tt[_v] = tt[mv] = tt[vv] = tt[yv] = tt[bv] = tt[wv] = tt[Tv] = tt[Sv] = !0,
        tt[ev] = tt[tv] = tt[pv] = tt[rv] = tt[hv] = tt[nv] = tt[ov] = tt[iv] = tt[sv] = tt[av] = tt[lv] = tt[cv] = tt[uv] = tt[fv] = tt[dv] = !1;
        function Cv(n) {
            return re(n) && Pc(n.length) && !!tt[K(n)]
        }
        var Pv = Cv;
        function Av(n) {
            return function(a) {
                return n(a)
            }
        }
        var xc = Av
          , Pd = t && !t.nodeType && t
          , si = Pd && !0 && e && !e.nodeType && e
          , xv = si && si.exports === Pd
          , kc = xv && at.process
          , kv = function() {
            try {
                var n = si && si.require && si.require("util").types;
                return n || kc && kc.binding && kc.binding("util")
            } catch {}
        }()
          , mo = kv
          , Ad = mo && mo.isTypedArray
          , Ev = Ad ? xc(Ad) : Pv
          , xd = Ev
          , Ov = Object.prototype
          , Rv = Ov.hasOwnProperty;
        function Mv(n, a) {
            var u = it(n)
              , m = !u && wd(n)
              , b = !u && !m && Es(n)
              , T = !u && !m && !b && xd(n)
              , R = u || m || b || T
              , j = R ? zm(n.length, String) : []
              , H = j.length;
            for (var N in n)
                (a || Rv.call(n, N)) && !(R && (N == "length" || b && (N == "offset" || N == "parent") || T && (N == "buffer" || N == "byteLength" || N == "byteOffset") || ri(N, H))) && j.push(N);
            return j
        }
        var kd = Mv;
        function Iv(n, a) {
            return function(u) {
                return n(a(u))
            }
        }
        var Ed = Iv
          , jv = Ed(Object.keys, Object)
          , Hv = jv
          , Dv = Object.prototype
          , Lv = Dv.hasOwnProperty;
        function Bv(n) {
            if (!Ac(n))
                return Hv(n);
            var a = [];
            for (var u in Object(n))
                Lv.call(n, u) && u != "constructor" && a.push(u);
            return a
        }
        var Nv = Bv;
        function Fv(n) {
            return vd(n) ? kd(n) : Nv(n)
        }
        var ai = Fv;
        function Vv(n) {
            var a = [];
            if (n != null)
                for (var u in Object(n))
                    a.push(u);
            return a
        }
        var $v = Vv
          , zv = Object.prototype
          , Uv = zv.hasOwnProperty;
        function qv(n) {
            if (!Ue(n))
                return $v(n);
            var a = Ac(n)
              , u = [];
            for (var m in n)
                m == "constructor" && (a || !Uv.call(n, m)) || u.push(m);
            return u
        }
        var Kv = qv;
        function Wv(n) {
            return vd(n) ? kd(n, !0) : Kv(n)
        }
        var Ec = Wv;
        function Gv(n, a) {
            for (var u = -1, m = a.length, b = n.length; ++u < m; )
                n[b + u] = a[u];
            return n
        }
        var Od = Gv
          , Xv = Ed(Object.getPrototypeOf, Object)
          , Oc = Xv
          , Jv = "[object Object]"
          , Yv = Function.prototype
          , Zv = Object.prototype
          , Rd = Yv.toString
          , Qv = Zv.hasOwnProperty
          , e1 = Rd.call(Object);
        function t1(n) {
            if (!re(n) || K(n) != Jv)
                return !1;
            var a = Oc(n);
            if (a === null)
                return !0;
            var u = Qv.call(a, "constructor") && a.constructor;
            return typeof u == "function" && u instanceof u && Rd.call(u) == e1
        }
        var r1 = t1;
        function n1(n, a, u) {
            var m = -1
              , b = n.length;
            a < 0 && (a = -a > b ? 0 : b + a),
            u = u > b ? b : u,
            u < 0 && (u += b),
            b = a > u ? 0 : u - a >>> 0,
            a >>>= 0;
            for (var T = Array(b); ++m < b; )
                T[m] = n[m + a];
            return T
        }
        var Md = n1;
        function o1(n, a, u) {
            var m = n.length;
            return u = u === void 0 ? m : u,
            !a && u >= m ? n : Md(n, a, u)
        }
        var i1 = o1
          , s1 = "\\ud800-\\udfff"
          , a1 = "\\u0300-\\u036f"
          , l1 = "\\ufe20-\\ufe2f"
          , c1 = "\\u20d0-\\u20ff"
          , u1 = a1 + l1 + c1
          , f1 = "\\ufe0e\\ufe0f"
          , d1 = "\\u200d"
          , p1 = RegExp("[" + d1 + s1 + u1 + f1 + "]");
        function h1(n) {
            return p1.test(n)
        }
        var Rc = h1;
        function g1(n) {
            return n.split("")
        }
        var _1 = g1
          , Id = "\\ud800-\\udfff"
          , m1 = "\\u0300-\\u036f"
          , v1 = "\\ufe20-\\ufe2f"
          , y1 = "\\u20d0-\\u20ff"
          , b1 = m1 + v1 + y1
          , w1 = "\\ufe0e\\ufe0f"
          , T1 = "[" + Id + "]"
          , Mc = "[" + b1 + "]"
          , Ic = "\\ud83c[\\udffb-\\udfff]"
          , S1 = "(?:" + Mc + "|" + Ic + ")"
          , jd = "[^" + Id + "]"
          , Hd = "(?:\\ud83c[\\udde6-\\uddff]){2}"
          , Dd = "[\\ud800-\\udbff][\\udc00-\\udfff]"
          , C1 = "\\u200d"
          , Ld = S1 + "?"
          , Bd = "[" + w1 + "]?"
          , P1 = "(?:" + C1 + "(?:" + [jd, Hd, Dd].join("|") + ")" + Bd + Ld + ")*"
          , A1 = Bd + Ld + P1
          , x1 = "(?:" + [jd + Mc + "?", Mc, Hd, Dd, T1].join("|") + ")"
          , k1 = RegExp(Ic + "(?=" + Ic + ")|" + x1 + A1, "g");
        function E1(n) {
            return n.match(k1) || []
        }
        var O1 = E1;
        function R1(n) {
            return Rc(n) ? O1(n) : _1(n)
        }
        var M1 = R1;
        function I1(n, a, u) {
            return n === n && (u !== void 0 && (n = n <= u ? n : u),
            a !== void 0 && (n = n >= a ? n : a)),
            n
        }
        var j1 = I1;
        function H1(n, a, u) {
            return u === void 0 && (u = a,
            a = void 0),
            u !== void 0 && (u = v(u),
            u = u === u ? u : 0),
            a !== void 0 && (a = v(a),
            a = a === a ? a : 0),
            j1(v(n), a, u)
        }
        var Nd = H1;
        function D1() {
            this.__data__ = new co,
            this.size = 0
        }
        var L1 = D1;
        function B1(n) {
            var a = this.__data__
              , u = a.delete(n);
            return this.size = a.size,
            u
        }
        var N1 = B1;
        function F1(n) {
            return this.__data__.get(n)
        }
        var V1 = F1;
        function $1(n) {
            return this.__data__.has(n)
        }
        var z1 = $1
          , U1 = 200;
        function q1(n, a) {
            var u = this.__data__;
            if (u instanceof co) {
                var m = u.__data__;
                if (!wn || m.length < U1 - 1)
                    return m.push([n, a]),
                    this.size = ++u.size,
                    this;
                u = this.__data__ = new uo(m)
            }
            return u.set(n, a),
            this.size = u.size,
            this
        }
        var K1 = q1;
        function vo(n) {
            var a = this.__data__ = new co(n);
            this.size = a.size
        }
        vo.prototype.clear = L1,
        vo.prototype.delete = N1,
        vo.prototype.get = V1,
        vo.prototype.has = z1,
        vo.prototype.set = K1;
        var li = vo;
        function W1(n, a) {
            return n && ks(a, ai(a), n)
        }
        var G1 = W1;
        function X1(n, a) {
            return n && ks(a, Ec(a), n)
        }
        var J1 = X1
          , Fd = t && !t.nodeType && t
          , Vd = Fd && !0 && e && !e.nodeType && e
          , Y1 = Vd && Vd.exports === Fd
          , $d = Y1 ? Ve.Buffer : void 0
          , zd = $d ? $d.allocUnsafe : void 0;
        function Z1(n, a) {
            if (a)
                return n.slice();
            var u = n.length
              , m = zd ? zd(u) : new n.constructor(u);
            return n.copy(m),
            m
        }
        var Q1 = Z1;
        function ey(n, a) {
            for (var u = -1, m = n == null ? 0 : n.length, b = 0, T = []; ++u < m; ) {
                var R = n[u];
                a(R, u, n) && (T[b++] = R)
            }
            return T
        }
        var ty = ey;
        function ry() {
            return []
        }
        var Ud = ry
          , ny = Object.prototype
          , oy = ny.propertyIsEnumerable
          , qd = Object.getOwnPropertySymbols
          , iy = qd ? function(n) {
            return n == null ? [] : (n = Object(n),
            ty(qd(n), function(a) {
                return oy.call(n, a)
            }))
        }
        : Ud
          , jc = iy;
        function sy(n, a) {
            return ks(n, jc(n), a)
        }
        var ay = sy
          , ly = Object.getOwnPropertySymbols
          , cy = ly ? function(n) {
            for (var a = []; n; )
                Od(a, jc(n)),
                n = Oc(n);
            return a
        }
        : Ud
          , Kd = cy;
        function uy(n, a) {
            return ks(n, Kd(n), a)
        }
        var fy = uy;
        function dy(n, a, u) {
            var m = a(n);
            return it(n) ? m : Od(m, u(n))
        }
        var Wd = dy;
        function py(n) {
            return Wd(n, ai, jc)
        }
        var Hc = py;
        function hy(n) {
            return Wd(n, Ec, Kd)
        }
        var gy = hy
          , _y = Er(Ve, "DataView")
          , Dc = _y
          , my = Er(Ve, "Promise")
          , Lc = my
          , vy = Er(Ve, "Set")
          , Bc = vy
          , Gd = "[object Map]"
          , yy = "[object Object]"
          , Xd = "[object Promise]"
          , Jd = "[object Set]"
          , Yd = "[object WeakMap]"
          , Zd = "[object DataView]"
          , by = kr(Dc)
          , wy = kr(wn)
          , Ty = kr(Lc)
          , Sy = kr(Bc)
          , Cy = kr(En)
          , On = K;
        (Dc && On(new Dc(new ArrayBuffer(1))) != Zd || wn && On(new wn) != Gd || Lc && On(Lc.resolve()) != Xd || Bc && On(new Bc) != Jd || En && On(new En) != Yd) && (On = function(n) {
            var a = K(n)
              , u = a == yy ? n.constructor : void 0
              , m = u ? kr(u) : "";
            if (m)
                switch (m) {
                case by:
                    return Zd;
                case wy:
                    return Gd;
                case Ty:
                    return Xd;
                case Sy:
                    return Jd;
                case Cy:
                    return Yd
                }
            return a
        }
        );
        var ci = On
          , Py = Object.prototype
          , Ay = Py.hasOwnProperty;
        function xy(n) {
            var a = n.length
              , u = new n.constructor(a);
            return a && typeof n[0] == "string" && Ay.call(n, "index") && (u.index = n.index,
            u.input = n.input),
            u
        }
        var ky = xy
          , Ey = Ve.Uint8Array
          , Os = Ey;
        function Oy(n) {
            var a = new n.constructor(n.byteLength);
            return new Os(a).set(new Os(n)),
            a
        }
        var Nc = Oy;
        function Ry(n, a) {
            var u = a ? Nc(n.buffer) : n.buffer;
            return new n.constructor(u,n.byteOffset,n.byteLength)
        }
        var My = Ry
          , Iy = /\w*$/;
        function jy(n) {
            var a = new n.constructor(n.source,Iy.exec(n));
            return a.lastIndex = n.lastIndex,
            a
        }
        var Hy = jy
          , Qd = V ? V.prototype : void 0
          , ep = Qd ? Qd.valueOf : void 0;
        function Dy(n) {
            return ep ? Object(ep.call(n)) : {}
        }
        var Ly = Dy;
        function By(n, a) {
            var u = a ? Nc(n.buffer) : n.buffer;
            return new n.constructor(u,n.byteOffset,n.length)
        }
        var Ny = By
          , Fy = "[object Boolean]"
          , Vy = "[object Date]"
          , $y = "[object Map]"
          , zy = "[object Number]"
          , Uy = "[object RegExp]"
          , qy = "[object Set]"
          , Ky = "[object String]"
          , Wy = "[object Symbol]"
          , Gy = "[object ArrayBuffer]"
          , Xy = "[object DataView]"
          , Jy = "[object Float32Array]"
          , Yy = "[object Float64Array]"
          , Zy = "[object Int8Array]"
          , Qy = "[object Int16Array]"
          , eb = "[object Int32Array]"
          , tb = "[object Uint8Array]"
          , rb = "[object Uint8ClampedArray]"
          , nb = "[object Uint16Array]"
          , ob = "[object Uint32Array]";
        function ib(n, a, u) {
            var m = n.constructor;
            switch (a) {
            case Gy:
                return Nc(n);
            case Fy:
            case Vy:
                return new m(+n);
            case Xy:
                return My(n, u);
            case Jy:
            case Yy:
            case Zy:
            case Qy:
            case eb:
            case tb:
            case rb:
            case nb:
            case ob:
                return Ny(n, u);
            case $y:
                return new m;
            case zy:
            case Ky:
                return new m(n);
            case Uy:
                return Hy(n);
            case qy:
                return new m;
            case Wy:
                return Ly(n)
            }
        }
        var sb = ib;
        function ab(n) {
            return typeof n.constructor == "function" && !Ac(n) ? Rm(Oc(n)) : {}
        }
        var lb = ab
          , cb = "[object Map]";
        function ub(n) {
            return re(n) && ci(n) == cb
        }
        var fb = ub
          , tp = mo && mo.isMap
          , db = tp ? xc(tp) : fb
          , pb = db
          , hb = "[object Set]";
        function gb(n) {
            return re(n) && ci(n) == hb
        }
        var _b = gb
          , rp = mo && mo.isSet
          , mb = rp ? xc(rp) : _b
          , vb = mb
          , yb = 1
          , bb = 2
          , wb = 4
          , np = "[object Arguments]"
          , Tb = "[object Array]"
          , Sb = "[object Boolean]"
          , Cb = "[object Date]"
          , Pb = "[object Error]"
          , op = "[object Function]"
          , Ab = "[object GeneratorFunction]"
          , xb = "[object Map]"
          , kb = "[object Number]"
          , ip = "[object Object]"
          , Eb = "[object RegExp]"
          , Ob = "[object Set]"
          , Rb = "[object String]"
          , Mb = "[object Symbol]"
          , Ib = "[object WeakMap]"
          , jb = "[object ArrayBuffer]"
          , Hb = "[object DataView]"
          , Db = "[object Float32Array]"
          , Lb = "[object Float64Array]"
          , Bb = "[object Int8Array]"
          , Nb = "[object Int16Array]"
          , Fb = "[object Int32Array]"
          , Vb = "[object Uint8Array]"
          , $b = "[object Uint8ClampedArray]"
          , zb = "[object Uint16Array]"
          , Ub = "[object Uint32Array]"
          , We = {};
        We[np] = We[Tb] = We[jb] = We[Hb] = We[Sb] = We[Cb] = We[Db] = We[Lb] = We[Bb] = We[Nb] = We[Fb] = We[xb] = We[kb] = We[ip] = We[Eb] = We[Ob] = We[Rb] = We[Mb] = We[Vb] = We[$b] = We[zb] = We[Ub] = !0,
        We[Pb] = We[op] = We[Ib] = !1;
        function Rs(n, a, u, m, b, T) {
            var R, j = a & yb, H = a & bb, N = a & wb;
            if (u && (R = b ? u(n, m, b, T) : u(n)),
            R !== void 0)
                return R;
            if (!Ue(n))
                return n;
            var J = it(n);
            if (J) {
                if (R = ky(n),
                !j)
                    return Im(n, R)
            } else {
                var Z = ci(n)
                  , ie = Z == op || Z == Ab;
                if (Es(n))
                    return Q1(n, j);
                if (Z == ip || Z == np || ie && !b) {
                    if (R = H || ie ? {} : lb(n),
                    !j)
                        return H ? fy(n, J1(R, n)) : ay(n, G1(R, n))
                } else {
                    if (!We[Z])
                        return b ? n : {};
                    R = sb(n, Z, j)
                }
            }
            T || (T = new li);
            var pe = T.get(n);
            if (pe)
                return pe;
            T.set(n, R),
            vb(n) ? n.forEach(function(ke) {
                R.add(Rs(ke, a, u, ke, n, T))
            }) : pb(n) && n.forEach(function(ke, Se) {
                R.set(Se, Rs(ke, a, u, Se, n, T))
            });
            var fe = N ? H ? gy : Hc : H ? Ec : ai
              , Ce = J ? void 0 : fe(n);
            return Hm(Ce || n, function(ke, Se) {
                Ce && (Se = ke,
                ke = n[Se]),
                ti(R, Se, Rs(ke, a, u, Se, n, T))
            }),
            R
        }
        var qb = Rs
          , Kb = 1
          , Wb = 4;
        function Gb(n) {
            return qb(n, Kb | Wb)
        }
        var Xb = Gb
          , Jb = "__lodash_hash_undefined__";
        function Yb(n) {
            return this.__data__.set(n, Jb),
            this
        }
        var Zb = Yb;
        function Qb(n) {
            return this.__data__.has(n)
        }
        var ew = Qb;
        function Ms(n) {
            var a = -1
              , u = n == null ? 0 : n.length;
            for (this.__data__ = new uo; ++a < u; )
                this.add(n[a])
        }
        Ms.prototype.add = Ms.prototype.push = Zb,
        Ms.prototype.has = ew;
        var tw = Ms;
        function rw(n, a) {
            for (var u = -1, m = n == null ? 0 : n.length; ++u < m; )
                if (a(n[u], u, n))
                    return !0;
            return !1
        }
        var nw = rw;
        function ow(n, a) {
            return n.has(a)
        }
        var iw = ow
          , sw = 1
          , aw = 2;
        function lw(n, a, u, m, b, T) {
            var R = u & sw
              , j = n.length
              , H = a.length;
            if (j != H && !(R && H > j))
                return !1;
            var N = T.get(n)
              , J = T.get(a);
            if (N && J)
                return N == a && J == n;
            var Z = -1
              , ie = !0
              , pe = u & aw ? new tw : void 0;
            for (T.set(n, a),
            T.set(a, n); ++Z < j; ) {
                var fe = n[Z]
                  , Ce = a[Z];
                if (m)
                    var ke = R ? m(Ce, fe, Z, a, n, T) : m(fe, Ce, Z, n, a, T);
                if (ke !== void 0) {
                    if (ke)
                        continue;
                    ie = !1;
                    break
                }
                if (pe) {
                    if (!nw(a, function(Se, He) {
                        if (!iw(pe, He) && (fe === Se || b(fe, Se, u, m, T)))
                            return pe.push(He)
                    })) {
                        ie = !1;
                        break
                    }
                } else if (!(fe === Ce || b(fe, Ce, u, m, T))) {
                    ie = !1;
                    break
                }
            }
            return T.delete(n),
            T.delete(a),
            ie
        }
        var sp = lw;
        function cw(n) {
            var a = -1
              , u = Array(n.size);
            return n.forEach(function(m, b) {
                u[++a] = [b, m]
            }),
            u
        }
        var uw = cw;
        function fw(n) {
            var a = -1
              , u = Array(n.size);
            return n.forEach(function(m) {
                u[++a] = m
            }),
            u
        }
        var dw = fw
          , pw = 1
          , hw = 2
          , gw = "[object Boolean]"
          , _w = "[object Date]"
          , mw = "[object Error]"
          , vw = "[object Map]"
          , yw = "[object Number]"
          , bw = "[object RegExp]"
          , ww = "[object Set]"
          , Tw = "[object String]"
          , Sw = "[object Symbol]"
          , Cw = "[object ArrayBuffer]"
          , Pw = "[object DataView]"
          , ap = V ? V.prototype : void 0
          , Fc = ap ? ap.valueOf : void 0;
        function Aw(n, a, u, m, b, T, R) {
            switch (u) {
            case Pw:
                if (n.byteLength != a.byteLength || n.byteOffset != a.byteOffset)
                    return !1;
                n = n.buffer,
                a = a.buffer;
            case Cw:
                return !(n.byteLength != a.byteLength || !T(new Os(n), new Os(a)));
            case gw:
            case _w:
            case yw:
                return Jo(+n, +a);
            case mw:
                return n.name == a.name && n.message == a.message;
            case bw:
            case Tw:
                return n == a + "";
            case vw:
                var j = uw;
            case ww:
                var H = m & pw;
                if (j || (j = dw),
                n.size != a.size && !H)
                    return !1;
                var N = R.get(n);
                if (N)
                    return N == a;
                m |= hw,
                R.set(n, a);
                var J = sp(j(n), j(a), m, b, T, R);
                return R.delete(n),
                J;
            case Sw:
                if (Fc)
                    return Fc.call(n) == Fc.call(a)
            }
            return !1
        }
        var xw = Aw
          , kw = 1
          , Ew = Object.prototype
          , Ow = Ew.hasOwnProperty;
        function Rw(n, a, u, m, b, T) {
            var R = u & kw
              , j = Hc(n)
              , H = j.length
              , N = Hc(a)
              , J = N.length;
            if (H != J && !R)
                return !1;
            for (var Z = H; Z--; ) {
                var ie = j[Z];
                if (!(R ? ie in a : Ow.call(a, ie)))
                    return !1
            }
            var pe = T.get(n)
              , fe = T.get(a);
            if (pe && fe)
                return pe == a && fe == n;
            var Ce = !0;
            T.set(n, a),
            T.set(a, n);
            for (var ke = R; ++Z < H; ) {
                ie = j[Z];
                var Se = n[ie]
                  , He = a[ie];
                if (m)
                    var kt = R ? m(He, Se, ie, a, n, T) : m(Se, He, ie, n, a, T);
                if (!(kt === void 0 ? Se === He || b(Se, He, u, m, T) : kt)) {
                    Ce = !1;
                    break
                }
                ke || (ke = ie == "constructor")
            }
            if (Ce && !ke) {
                var qt = n.constructor
                  , Et = a.constructor;
                qt != Et && "constructor"in n && "constructor"in a && !(typeof qt == "function" && qt instanceof qt && typeof Et == "function" && Et instanceof Et) && (Ce = !1)
            }
            return T.delete(n),
            T.delete(a),
            Ce
        }
        var Mw = Rw
          , Iw = 1
          , lp = "[object Arguments]"
          , cp = "[object Array]"
          , Is = "[object Object]"
          , jw = Object.prototype
          , up = jw.hasOwnProperty;
        function Hw(n, a, u, m, b, T) {
            var R = it(n)
              , j = it(a)
              , H = R ? cp : ci(n)
              , N = j ? cp : ci(a);
            H = H == lp ? Is : H,
            N = N == lp ? Is : N;
            var J = H == Is
              , Z = N == Is
              , ie = H == N;
            if (ie && Es(n)) {
                if (!Es(a))
                    return !1;
                R = !0,
                J = !1
            }
            if (ie && !J)
                return T || (T = new li),
                R || xd(n) ? sp(n, a, u, m, b, T) : xw(n, a, H, u, m, b, T);
            if (!(u & Iw)) {
                var pe = J && up.call(n, "__wrapped__")
                  , fe = Z && up.call(a, "__wrapped__");
                if (pe || fe) {
                    var Ce = pe ? n.value() : n
                      , ke = fe ? a.value() : a;
                    return T || (T = new li),
                    b(Ce, ke, u, m, T)
                }
            }
            return ie ? (T || (T = new li),
            Mw(n, a, u, m, b, T)) : !1
        }
        var Dw = Hw;
        function fp(n, a, u, m, b) {
            return n === a ? !0 : n == null || a == null || !re(n) && !re(a) ? n !== n && a !== a : Dw(n, a, u, m, fp, b)
        }
        var dp = fp
          , Lw = 1
          , Bw = 2;
        function Nw(n, a, u, m) {
            var b = u.length
              , T = b
              , R = !m;
            if (n == null)
                return !T;
            for (n = Object(n); b--; ) {
                var j = u[b];
                if (R && j[2] ? j[1] !== n[j[0]] : !(j[0]in n))
                    return !1
            }
            for (; ++b < T; ) {
                j = u[b];
                var H = j[0]
                  , N = n[H]
                  , J = j[1];
                if (R && j[2]) {
                    if (N === void 0 && !(H in n))
                        return !1
                } else {
                    var Z = new li;
                    if (m)
                        var ie = m(N, J, H, n, a, Z);
                    if (!(ie === void 0 ? dp(J, N, Lw | Bw, m, Z) : ie))
                        return !1
                }
            }
            return !0
        }
        var Fw = Nw;
        function Vw(n) {
            return n === n && !Ue(n)
        }
        var pp = Vw;
        function $w(n) {
            for (var a = ai(n), u = a.length; u--; ) {
                var m = a[u]
                  , b = n[m];
                a[u] = [m, b, pp(b)]
            }
            return a
        }
        var zw = $w;
        function Uw(n, a) {
            return function(u) {
                return u == null ? !1 : u[n] === a && (a !== void 0 || n in Object(u))
            }
        }
        var hp = Uw;
        function qw(n) {
            var a = zw(n);
            return a.length == 1 && a[0][2] ? hp(a[0][0], a[0][1]) : function(u) {
                return u === n || Fw(u, n, a)
            }
        }
        var Kw = qw;
        function Ww(n, a) {
            return n != null && a in Object(n)
        }
        var Gw = Ww;
        function Xw(n, a, u) {
            a = Sn(a, n);
            for (var m = -1, b = a.length, T = !1; ++m < b; ) {
                var R = dr(a[m]);
                if (!(T = n != null && u(n, R)))
                    break;
                n = n[R]
            }
            return T || ++m != b ? T : (b = n == null ? 0 : n.length,
            !!b && Pc(b) && ri(R, b) && (it(n) || wd(n)))
        }
        var Jw = Xw;
        function Yw(n, a) {
            return n != null && Jw(n, a, Gw)
        }
        var Zw = Yw
          , Qw = 1
          , e5 = 2;
        function t5(n, a) {
            return st(n) && pp(a) ? hp(dr(n), a) : function(u) {
                var m = Or(u, n);
                return m === void 0 && m === a ? Zw(u, n) : dp(a, m, Qw | e5)
            }
        }
        var r5 = t5;
        function n5(n) {
            return function(a) {
                return a?.[n]
            }
        }
        var gp = n5;
        function o5(n) {
            return function(a) {
                return po(a, n)
            }
        }
        var i5 = o5;
        function s5(n) {
            return st(n) ? gp(dr(n)) : i5(n)
        }
        var a5 = s5;
        function l5(n) {
            return typeof n == "function" ? n : n == null ? xs : typeof n == "object" ? it(n) ? r5(n[0], n[1]) : Kw(n) : a5(n)
        }
        var c5 = l5;
        function u5(n) {
            return function(a, u, m) {
                for (var b = -1, T = Object(a), R = m(a), j = R.length; j--; ) {
                    var H = R[n ? j : ++b];
                    if (u(T[H], H, T) === !1)
                        break
                }
                return a
            }
        }
        var f5 = u5
          , d5 = f5()
          , p5 = d5;
        function h5(n, a) {
            return n && p5(n, a, ai)
        }
        var g5 = h5
          , _5 = function() {
            return Ve.Date.now()
        }
          , Vc = _5
          , m5 = "Expected a function"
          , v5 = Math.max
          , y5 = Math.min;
        function b5(n, a, u) {
            var m, b, T, R, j, H, N = 0, J = !1, Z = !1, ie = !0;
            if (typeof n != "function")
                throw new TypeError(m5);
            a = v(a) || 0,
            Ue(u) && (J = !!u.leading,
            Z = "maxWait"in u,
            T = Z ? v5(v(u.maxWait) || 0, a) : T,
            ie = "trailing"in u ? !!u.trailing : ie);
            function pe(qe) {
                var Ot = m
                  , er = b;
                return m = b = void 0,
                N = qe,
                R = n.apply(er, Ot),
                R
            }
            function fe(qe) {
                return N = qe,
                j = setTimeout(Se, a),
                J ? pe(qe) : R
            }
            function Ce(qe) {
                var Ot = qe - H
                  , er = qe - N
                  , yr = a - Ot;
                return Z ? y5(yr, T - er) : yr
            }
            function ke(qe) {
                var Ot = qe - H
                  , er = qe - N;
                return H === void 0 || Ot >= a || Ot < 0 || Z && er >= T
            }
            function Se() {
                var qe = Vc();
                if (ke(qe))
                    return He(qe);
                j = setTimeout(Se, Ce(qe))
            }
            function He(qe) {
                return j = void 0,
                ie && m ? pe(qe) : (m = b = void 0,
                R)
            }
            function kt() {
                j !== void 0 && clearTimeout(j),
                N = 0,
                m = H = b = j = void 0
            }
            function qt() {
                return j === void 0 ? R : He(Vc())
            }
            function Et() {
                var qe = Vc()
                  , Ot = ke(qe);
                if (m = arguments,
                b = this,
                H = qe,
                Ot) {
                    if (j === void 0)
                        return fe(H);
                    if (Z)
                        return clearTimeout(j),
                        j = setTimeout(Se, a),
                        pe(H)
                }
                return j === void 0 && (j = setTimeout(Se, a)),
                R
            }
            return Et.cancel = kt,
            Et.flush = qt,
            Et
        }
        var w5 = b5;
        function T5(n) {
            var a = n == null ? 0 : n.length;
            return a ? n[a - 1] : void 0
        }
        var S5 = T5;
        function C5(n, a) {
            return a.length < 2 ? n : po(n, Md(a, 0, -1))
        }
        var P5 = C5;
        function A5(n) {
            return typeof n == "number" && n == At(n)
        }
        var x5 = A5;
        function k5(n, a) {
            var u = {};
            return a = c5(a),
            g5(n, function(m, b, T) {
                Rr(u, b, a(m, b, T))
            }),
            u
        }
        var E5 = k5;
        function O5(n, a) {
            return a = Sn(a, n),
            n = P5(n, a),
            n == null || delete n[dr(S5(a))]
        }
        var R5 = O5
          , M5 = 9007199254740991
          , I5 = Math.floor;
        function j5(n, a) {
            var u = "";
            if (!n || a < 1 || a > M5)
                return u;
            do
                a % 2 && (u += n),
                a = I5(a / 2),
                a && (n += n);
            while (a);
            return u
        }
        var _p = j5
          , H5 = gp("length")
          , D5 = H5
          , mp = "\\ud800-\\udfff"
          , L5 = "\\u0300-\\u036f"
          , B5 = "\\ufe20-\\ufe2f"
          , N5 = "\\u20d0-\\u20ff"
          , F5 = L5 + B5 + N5
          , V5 = "\\ufe0e\\ufe0f"
          , $5 = "[" + mp + "]"
          , $c = "[" + F5 + "]"
          , zc = "\\ud83c[\\udffb-\\udfff]"
          , z5 = "(?:" + $c + "|" + zc + ")"
          , vp = "[^" + mp + "]"
          , yp = "(?:\\ud83c[\\udde6-\\uddff]){2}"
          , bp = "[\\ud800-\\udbff][\\udc00-\\udfff]"
          , U5 = "\\u200d"
          , wp = z5 + "?"
          , Tp = "[" + V5 + "]?"
          , q5 = "(?:" + U5 + "(?:" + [vp, yp, bp].join("|") + ")" + Tp + wp + ")*"
          , K5 = Tp + wp + q5
          , W5 = "(?:" + [vp + $c + "?", $c, yp, bp, $5].join("|") + ")"
          , Sp = RegExp(zc + "(?=" + zc + ")|" + W5 + K5, "g");
        function G5(n) {
            for (var a = Sp.lastIndex = 0; Sp.test(n); )
                ++a;
            return a
        }
        var X5 = G5;
        function J5(n) {
            return Rc(n) ? X5(n) : D5(n)
        }
        var Cp = J5
          , Y5 = Math.ceil;
        function Z5(n, a) {
            a = a === void 0 ? " " : ps(a);
            var u = a.length;
            if (u < 2)
                return u ? _p(a, n) : a;
            var m = _p(a, Y5(n / Cp(a)));
            return Rc(a) ? i1(M1(m), 0, n).join("") : m.slice(0, n)
        }
        var Q5 = Z5;
        function e2(n, a, u) {
            n = fo(n),
            a = At(a);
            var m = a ? Cp(n) : 0;
            return a && m < a ? Q5(a - m, u) + n : n
        }
        var ui = e2;
        function t2(n, a) {
            return n == null ? !0 : R5(n, a)
        }
        var Pp = t2
          , r2 = 5 * 1e3
          , n2 = class {
            constructor(n) {
                S(this, "_cache", new tn),
                S(this, "_keepHotUntapDebounce"),
                he(this, n)
            }
            get type() {
                return "Theatre_SheetObject_PublicAPI"
            }
            get props() {
                return Y(this).propsP
            }
            get sheet() {
                return Y(this).sheet.publicApi
            }
            get project() {
                return Y(this).sheet.project.publicApi
            }
            get address() {
                return p({}, Y(this).address)
            }
            _valuesPrism() {
                return this._cache.get("_valuesPrism", () => {
                    const n = Y(this);
                    return (0,
                    oi.prism)( () => (0,
                    oi.val)(n.getValues().getValue()))
                }
                )
            }
            onValuesChange(n, a) {
                return hu(this._valuesPrism(), n, a)
            }
            get value() {
                const n = this._valuesPrism();
                {
                    if (!n.isHot) {
                        this._keepHotUntapDebounce != null && this._keepHotUntapDebounce.flush();
                        const a = n.keepHot();
                        this._keepHotUntapDebounce = w5( () => {
                            a(),
                            this._keepHotUntapDebounce = void 0
                        }
                        , r2)
                    }
                    this._keepHotUntapDebounce && this._keepHotUntapDebounce()
                }
                return n.getValue()
            }
            set initialValue(n) {
                Y(this).setInitialValue(n)
            }
        }
        ;
        function o2(n) {
            const a = new WeakMap;
            return u => (a.has(u) || a.set(u, n(u)),
            a.get(u))
        }
        function js(n) {
            return n.type === "compound" || n.type === "enum"
        }
        function Uc(n, a) {
            if (!n)
                return;
            const [u,...m] = a;
            if (u === void 0)
                return n;
            if (!js(n))
                return;
            const b = n.type === "enum" ? n.cases[u] : n.props[u];
            return Uc(b, m)
        }
        function i2(n) {
            return !js(n)
        }
        var s2 = class {
            constructor(n, a, u) {
                this.sheet = n,
                this.template = a,
                this.nativeObject = u,
                S(this, "$$isPointerToPrismProvider", !0),
                S(this, "address"),
                S(this, "publicApi"),
                S(this, "_initialValue", new Ne.Atom({})),
                S(this, "_cache", new tn),
                S(this, "_logger"),
                S(this, "_internalUtilCtx"),
                this._logger = n._logger.named("SheetObject", a.address.objectKey),
                this._logger._trace("creating object"),
                this._internalUtilCtx = {
                    logger: this._logger.utilFor.internal()
                },
                this.address = y(p({}, a.address), {
                    sheetInstanceId: n.address.sheetInstanceId
                }),
                this.publicApi = new n2(this)
            }
            get type() {
                return "Theatre_SheetObject"
            }
            getValues() {
                return this._cache.get("getValues()", () => (0,
                Ne.prism)( () => {
                    const n = (0,
                    Ne.val)(this.template.getDefaultValues())
                      , a = (0,
                    Ne.val)(this._initialValue.pointer)
                      , u = Ne.prism.memo("withInitialCache", () => new WeakMap, [])
                      , m = An(n, a, u)
                      , b = (0,
                    Ne.val)(this.template.getStaticValues())
                      , T = Ne.prism.memo("withStatics", () => new WeakMap, []);
                    let j = An(m, b, T), H;
                    {
                        const J = Ne.prism.memo("seq", () => this.getSequencedValues(), [])
                          , Z = Ne.prism.memo("withSeqsCache", () => new WeakMap, []);
                        H = (0,
                        Ne.val)((0,
                        Ne.val)(J)),
                        j = An(j, H, Z)
                    }
                    return Ts("finalAtom", j).pointer
                }
                ))
            }
            getValueByPointer(n) {
                const a = (0,
                Ne.val)(this.getValues())
                  , {path: u} = (0,
                Ne.getPointerParts)(n);
                return (0,
                Ne.val)(xn(a, u))
            }
            pointerToPrism(n) {
                const {path: a} = (0,
                Ne.getPointerParts)(n);
                return (0,
                Ne.prism)( () => {
                    const u = (0,
                    Ne.val)(this.getValues());
                    return (0,
                    Ne.val)(xn(u, a))
                }
                )
            }
            getSequencedValues() {
                return (0,
                Ne.prism)( () => {
                    const n = Ne.prism.memo("tracksToProcess", () => this.template.getArrayOfValidSequenceTracks(), [])
                      , a = (0,
                    Ne.val)(n)
                      , u = new Ne.Atom({})
                      , m = (0,
                    Ne.val)(this.template.configPointer);
                    return Ne.prism.effect("processTracks", () => {
                        const b = [];
                        for (const {trackId: T, pathToProp: R} of a) {
                            const j = this._trackIdToPrism(T)
                              , H = Uc(m, R)
                              , N = H.deserializeAndSanitize
                              , J = H.interpolate
                              , Z = () => {
                                const pe = j.getValue();
                                if (!pe)
                                    return u.setByPointer(He => xn(He, R), void 0);
                                const fe = N(pe.left)
                                  , Ce = fe === void 0 ? H.default : fe;
                                if (pe.right === void 0)
                                    return u.setByPointer(He => xn(He, R), Ce);
                                const ke = N(pe.right)
                                  , Se = ke === void 0 ? H.default : ke;
                                return u.setByPointer(He => xn(He, R), J(Ce, Se, pe.progression))
                            }
                              , ie = j.onStale(Z);
                            Z(),
                            b.push(ie)
                        }
                        return () => {
                            for (const T of b)
                                T()
                        }
                    }
                    , [m, ...a]),
                    u.pointer
                }
                )
            }
            _trackIdToPrism(n) {
                const a = this.template.project.pointers.historic.sheetsById[this.address.sheetId].sequence.tracksByObject[this.address.objectKey].trackData[n]
                  , u = this.sheet.getSequence().positionPrism;
                return _c(this._internalUtilCtx, a, u)
            }
            get propsP() {
                return this._cache.get("propsP", () => (0,
                Ne.pointer)({
                    root: this,
                    path: []
                }))
            }
            validateValue(n, a) {}
            setInitialValue(n) {
                this.validateValue(this.propsP, n),
                this._initialValue.set(n)
            }
        }
        ;
        function Ge(n) {
            return function(u, m) {
                return n(u, m())
            }
        }
        var Yt = {
            _hmm: Zt(524),
            _todo: Zt(522),
            _error: Zt(521),
            errorDev: Zt(529),
            errorPublic: Zt(545),
            _kapow: Zt(268),
            _warn: Zt(265),
            warnDev: Zt(273),
            warnPublic: Zt(289),
            _debug: Zt(137),
            debugDev: Zt(145),
            _trace: Zt(73),
            traceDev: Zt(81)
        };
        function Zt(n) {
            return Object.freeze({
                audience: Rn(n, 8) ? "internal" : Rn(n, 16) ? "dev" : "public",
                category: Rn(n, 4) ? "troubleshooting" : Rn(n, 2) ? "todo" : "general",
                level: Rn(n, 512) ? 512 : Rn(n, 256) ? 256 : Rn(n, 128) ? 128 : 64
            })
        }
        function Rn(n, a) {
            return (n & a) === a
        }
        function Xe(n, a) {
            return ((a & 32) === 32 ? !0 : (a & 16) === 16 ? n.dev : (a & 8) === 8 ? n.internal : !1) && n.min <= a
        }
        var Mr = {
            loggingConsoleStyle: !0,
            loggerConsoleStyle: !0,
            includes: Object.freeze({
                internal: !1,
                dev: !1,
                min: 256
            }),
            filtered: function() {},
            include: function() {
                return {}
            },
            create: null,
            creatExt: null,
            named(n, a, u) {
                return this.create({
                    names: [...n.names, {
                        name: a,
                        key: u
                    }]
                })
            },
            style: {
                bold: void 0,
                italic: void 0,
                cssMemo: new Map([["", ""]]),
                collapseOnRE: /[a-z- ]+/g,
                color: void 0,
                collapsed(n) {
                    if (n.length < 5)
                        return n;
                    const a = n.replace(this.collapseOnRE, "");
                    return this.cssMemo.has(a) || this.cssMemo.set(a, this.css(n)),
                    a
                },
                css(n) {
                    var a, u, m, b;
                    const T = this.cssMemo.get(n);
                    if (T)
                        return T;
                    let R = "color:".concat((u = (a = this.color) == null ? void 0 : a.call(this, n)) != null ? u : "hsl(".concat((n.charCodeAt(0) + n.charCodeAt(n.length - 1)) % 360, ", 100%, 60%)"));
                    return (m = this.bold) != null && m.test(n) && (R += ";font-weight:600"),
                    (b = this.italic) != null && b.test(n) && (R += ";font-style:italic"),
                    this.cssMemo.set(n, R),
                    R
                }
            }
        };
        function Ap(n=console, a={}) {
            const u = y(p({}, Mr), {
                includes: p({}, Mr.includes)
            })
              , m = {
                styled: c2.bind(u, n),
                noStyle: f2.bind(u, n)
            }
              , b = l2.bind(u);
            function T() {
                return u.loggingConsoleStyle && u.loggerConsoleStyle ? m.styled : m.noStyle
            }
            return u.create = T(),
            {
                configureLogger(R) {
                    var j;
                    R === "console" ? (u.loggerConsoleStyle = Mr.loggerConsoleStyle,
                    u.create = T()) : R.type === "console" ? (u.loggerConsoleStyle = (j = R.style) != null ? j : Mr.loggerConsoleStyle,
                    u.create = T()) : R.type === "keyed" ? (u.creatExt = H => R.keyed(H.names),
                    u.create = b) : R.type === "named" && (u.creatExt = a2.bind(null, R.named),
                    u.create = b)
                },
                configureLogging(R) {
                    var j, H, N, J, Z;
                    u.includes.dev = (j = R.dev) != null ? j : Mr.includes.dev,
                    u.includes.internal = (H = R.internal) != null ? H : Mr.includes.internal,
                    u.includes.min = (N = R.min) != null ? N : Mr.includes.min,
                    u.include = (J = R.include) != null ? J : Mr.include,
                    u.loggingConsoleStyle = (Z = R.consoleStyle) != null ? Z : Mr.loggingConsoleStyle,
                    u.create = T()
                },
                getLogger() {
                    return u.create({
                        names: []
                    })
                }
            }
        }
        function a2(n, a) {
            const u = [];
            for (let {name: m, key: b} of a.names)
                u.push(b == null ? m : "".concat(m, " (").concat(b, ")"));
            return n(u)
        }
        function l2(n) {
            const a = p(p({}, this.includes), this.include(n))
              , u = this.filtered
              , m = this.named.bind(this, n)
              , b = this.creatExt(n)
              , T = Xe(a, 524)
              , R = Xe(a, 522)
              , j = Xe(a, 521)
              , H = Xe(a, 529)
              , N = Xe(a, 545)
              , J = Xe(a, 265)
              , Z = Xe(a, 268)
              , ie = Xe(a, 273)
              , pe = Xe(a, 289)
              , fe = Xe(a, 137)
              , Ce = Xe(a, 145)
              , ke = Xe(a, 73)
              , Se = Xe(a, 81)
              , He = T ? b.error.bind(b, Yt._hmm) : u.bind(n, 524)
              , kt = R ? b.error.bind(b, Yt._todo) : u.bind(n, 522)
              , qt = j ? b.error.bind(b, Yt._error) : u.bind(n, 521)
              , Et = H ? b.error.bind(b, Yt.errorDev) : u.bind(n, 529)
              , qe = N ? b.error.bind(b, Yt.errorPublic) : u.bind(n, 545)
              , Ot = Z ? b.warn.bind(b, Yt._kapow) : u.bind(n, 268)
              , er = J ? b.warn.bind(b, Yt._warn) : u.bind(n, 265)
              , yr = ie ? b.warn.bind(b, Yt.warnDev) : u.bind(n, 273)
              , Ln = pe ? b.warn.bind(b, Yt.warnPublic) : u.bind(n, 273)
              , Bn = fe ? b.debug.bind(b, Yt._debug) : u.bind(n, 137)
              , Nn = Ce ? b.debug.bind(b, Yt.debugDev) : u.bind(n, 145)
              , Fn = ke ? b.trace.bind(b, Yt._trace) : u.bind(n, 73)
              , Vn = Se ? b.trace.bind(b, Yt.traceDev) : u.bind(n, 81)
              , ct = {
                _hmm: He,
                _todo: kt,
                _error: qt,
                errorDev: Et,
                errorPublic: qe,
                _kapow: Ot,
                _warn: er,
                warnDev: yr,
                warnPublic: Ln,
                _debug: Bn,
                debugDev: Nn,
                _trace: Fn,
                traceDev: Vn,
                lazy: {
                    _hmm: T ? Ge(He) : He,
                    _todo: R ? Ge(kt) : kt,
                    _error: j ? Ge(qt) : qt,
                    errorDev: H ? Ge(Et) : Et,
                    errorPublic: N ? Ge(qe) : qe,
                    _kapow: Z ? Ge(Ot) : Ot,
                    _warn: J ? Ge(er) : er,
                    warnDev: ie ? Ge(yr) : yr,
                    warnPublic: pe ? Ge(Ln) : Ln,
                    _debug: fe ? Ge(Bn) : Bn,
                    debugDev: Ce ? Ge(Nn) : Nn,
                    _trace: ke ? Ge(Fn) : Fn,
                    traceDev: Se ? Ge(Vn) : Vn
                },
                named: m,
                utilFor: {
                    internal() {
                        return {
                            debug: ct._debug,
                            error: ct._error,
                            warn: ct._warn,
                            trace: ct._trace,
                            named(tr, Je) {
                                return ct.named(tr, Je).utilFor.internal()
                            }
                        }
                    },
                    dev() {
                        return {
                            debug: ct.debugDev,
                            error: ct.errorDev,
                            warn: ct.warnDev,
                            trace: ct.traceDev,
                            named(tr, Je) {
                                return ct.named(tr, Je).utilFor.dev()
                            }
                        }
                    },
                    public() {
                        return {
                            error: ct.errorPublic,
                            warn: ct.warnPublic,
                            debug(tr, Je) {
                                ct._warn('(public "debug" filtered out) '.concat(tr), Je)
                            },
                            trace(tr, Je) {
                                ct._warn('(public "trace" filtered out) '.concat(tr), Je)
                            },
                            named(tr, Je) {
                                return ct.named(tr, Je).utilFor.public()
                            }
                        }
                    }
                }
            };
            return ct
        }
        function c2(n, a) {
            const u = p(p({}, this.includes), this.include(a))
              , m = [];
            let b = "";
            for (let H = 0; H < a.names.length; H++) {
                const {name: N, key: J} = a.names[H];
                if (b += " %c".concat(N),
                m.push(this.style.css(N)),
                J != null) {
                    const Z = "%c#".concat(J);
                    b += Z,
                    m.push(this.style.css(Z))
                }
            }
            const T = this.filtered
              , R = this.named.bind(this, a)
              , j = [b, ...m];
            return xp(T, a, u, n, j, u2(j), R)
        }
        function u2(n) {
            const a = n.slice(0);
            for (let u = 1; u < a.length; u++)
                a[u] += ";background-color:#e0005a;padding:2px;color:white";
            return a
        }
        function f2(n, a) {
            const u = p(p({}, this.includes), this.include(a));
            let m = "";
            for (let j = 0; j < a.names.length; j++) {
                const {name: H, key: N} = a.names[j];
                m += " ".concat(H),
                N != null && (m += "#".concat(N))
            }
            const b = this.filtered
              , T = this.named.bind(this, a)
              , R = [m];
            return xp(b, a, u, n, R, R, T)
        }
        function xp(n, a, u, m, b, T, R) {
            const j = Xe(u, 524)
              , H = Xe(u, 522)
              , N = Xe(u, 521)
              , J = Xe(u, 529)
              , Z = Xe(u, 545)
              , ie = Xe(u, 265)
              , pe = Xe(u, 268)
              , fe = Xe(u, 273)
              , Ce = Xe(u, 289)
              , ke = Xe(u, 137)
              , Se = Xe(u, 145)
              , He = Xe(u, 73)
              , kt = Xe(u, 81)
              , qt = j ? m.error.bind(m, ...b) : n.bind(a, 524)
              , Et = H ? m.error.bind(m, ...b) : n.bind(a, 522)
              , qe = N ? m.error.bind(m, ...b) : n.bind(a, 521)
              , Ot = J ? m.error.bind(m, ...b) : n.bind(a, 529)
              , er = Z ? m.error.bind(m, ...b) : n.bind(a, 545)
              , yr = pe ? m.warn.bind(m, ...T) : n.bind(a, 268)
              , Ln = ie ? m.warn.bind(m, ...b) : n.bind(a, 265)
              , Bn = fe ? m.warn.bind(m, ...b) : n.bind(a, 273)
              , Nn = Ce ? m.warn.bind(m, ...b) : n.bind(a, 273)
              , Fn = ke ? m.info.bind(m, ...b) : n.bind(a, 137)
              , Vn = Se ? m.info.bind(m, ...b) : n.bind(a, 145)
              , ct = He ? m.debug.bind(m, ...b) : n.bind(a, 73)
              , tr = kt ? m.debug.bind(m, ...b) : n.bind(a, 81)
              , Je = {
                _hmm: qt,
                _todo: Et,
                _error: qe,
                errorDev: Ot,
                errorPublic: er,
                _kapow: yr,
                _warn: Ln,
                warnDev: Bn,
                warnPublic: Nn,
                _debug: Fn,
                debugDev: Vn,
                _trace: ct,
                traceDev: tr,
                lazy: {
                    _hmm: j ? Ge(qt) : qt,
                    _todo: H ? Ge(Et) : Et,
                    _error: N ? Ge(qe) : qe,
                    errorDev: J ? Ge(Ot) : Ot,
                    errorPublic: Z ? Ge(er) : er,
                    _kapow: pe ? Ge(yr) : yr,
                    _warn: ie ? Ge(Ln) : Ln,
                    warnDev: fe ? Ge(Bn) : Bn,
                    warnPublic: Ce ? Ge(Nn) : Nn,
                    _debug: ke ? Ge(Fn) : Fn,
                    debugDev: Se ? Ge(Vn) : Vn,
                    _trace: He ? Ge(ct) : ct,
                    traceDev: kt ? Ge(tr) : tr
                },
                named: R,
                utilFor: {
                    internal() {
                        return {
                            debug: Je._debug,
                            error: Je._error,
                            warn: Je._warn,
                            trace: Je._trace,
                            named(Hr, Dr) {
                                return Je.named(Hr, Dr).utilFor.internal()
                            }
                        }
                    },
                    dev() {
                        return {
                            debug: Je.debugDev,
                            error: Je.errorDev,
                            warn: Je.warnDev,
                            trace: Je.traceDev,
                            named(Hr, Dr) {
                                return Je.named(Hr, Dr).utilFor.dev()
                            }
                        }
                    },
                    public() {
                        return {
                            error: Je.errorPublic,
                            warn: Je.warnPublic,
                            debug(Hr, Dr) {
                                Je._warn('(public "debug" filtered out) '.concat(Hr), Dr)
                            },
                            trace(Hr, Dr) {
                                Je._warn('(public "trace" filtered out) '.concat(Hr), Dr)
                            },
                            named(Hr, Dr) {
                                return Je.named(Hr, Dr).utilFor.public()
                            }
                        }
                    }
                }
            };
            return Je
        }
        var kp = Ap(console, {});
        kp.configureLogging({
            dev: !0,
            min: 64
        });
        var Hs = kp.getLogger().named("Theatre.js (default logger)").utilFor.dev()
          , Ep = new WeakMap;
        function d2(n) {
            const a = Ep.get(n);
            if (a)
                return a;
            const u = new Map;
            return Ep.set(n, u),
            Op([], n, u),
            u
        }
        function Op(n, a, u) {
            for (const [m,b] of Object.entries(a.props))
                if (!js(b)) {
                    const T = [...n, m];
                    u.set(JSON.stringify(T), u.size),
                    Rp(T, b, u)
                }
            for (const [m,b] of Object.entries(a.props))
                if (js(b)) {
                    const T = [...n, m];
                    u.set(JSON.stringify(T), u.size),
                    Rp(T, b, u)
                }
        }
        function Rp(n, a, u) {
            if (a.type === "compound")
                Op(n, a, u);
            else {
                if (a.type === "enum")
                    throw new Error("Enums aren't supported yet");
                u.set(JSON.stringify(n), u.size)
            }
        }
        function Mp(n) {
            return typeof n == "object" && n !== null && Object.keys(n).length === 0
        }
        var p2 = class {
            constructor(n, a, u, m, b) {
                this.sheetTemplate = n,
                S(this, "address"),
                S(this, "type", "Theatre_SheetObjectTemplate"),
                S(this, "_config"),
                S(this, "_temp_actions_atom"),
                S(this, "_cache", new tn),
                S(this, "project"),
                S(this, "pointerToSheetState"),
                S(this, "pointerToStaticOverrides"),
                this.address = y(p({}, n.address), {
                    objectKey: a
                }),
                this._config = new ft.Atom(m),
                this._temp_actions_atom = new ft.Atom(b),
                this.project = n.project,
                this.pointerToSheetState = this.sheetTemplate.project.pointers.historic.sheetsById[this.address.sheetId],
                this.pointerToStaticOverrides = this.pointerToSheetState.staticOverrides.byObject[this.address.objectKey]
            }
            get staticConfig() {
                return this._config.get()
            }
            get configPointer() {
                return this._config.pointer
            }
            get _temp_actions() {
                return this._temp_actions_atom.get()
            }
            get _temp_actionsPointer() {
                return this._temp_actions_atom.pointer
            }
            createInstance(n, a, u) {
                return this._config.set(u),
                new s2(n,this,a)
            }
            reconfigure(n) {
                this._config.set(n)
            }
            _temp_setActions(n) {
                this._temp_actions_atom.set(n)
            }
            getDefaultValues() {
                return this._cache.get("getDefaultValues()", () => (0,
                ft.prism)( () => {
                    const n = (0,
                    ft.val)(this.configPointer);
                    return hc(n)
                }
                ))
            }
            getStaticValues() {
                return this._cache.get("getStaticValues", () => (0,
                ft.prism)( () => {
                    var n;
                    const a = (n = (0,
                    ft.val)(this.pointerToStaticOverrides)) != null ? n : {};
                    return (0,
                    ft.val)(this.configPointer).deserializeAndSanitize(a) || {}
                }
                ))
            }
            getArrayOfValidSequenceTracks() {
                return this._cache.get("getArrayOfValidSequenceTracks", () => (0,
                ft.prism)( () => {
                    const n = this.project.pointers.historic.sheetsById[this.address.sheetId]
                      , a = (0,
                    ft.val)(n.sequence.tracksByObject[this.address.objectKey].trackIdByPropPath);
                    if (!a)
                        return le;
                    const u = [];
                    if (!a)
                        return le;
                    const m = (0,
                    ft.val)(this.configPointer)
                      , b = Object.entries(a);
                    for (const [R,j] of b) {
                        const H = h2(R);
                        if (!H)
                            continue;
                        const N = Uc(m, H);
                        N && i2(N) && u.push({
                            pathToProp: H,
                            trackId: j
                        })
                    }
                    const T = d2(m);
                    return u.sort( (R, j) => {
                        const H = R.pathToProp
                          , N = j.pathToProp
                          , J = T.get(JSON.stringify(H))
                          , Z = T.get(JSON.stringify(N));
                        return J > Z ? 1 : -1
                    }
                    ),
                    u.length === 0 ? le : u
                }
                ))
            }
            getMapOfValidSequenceTracks_forStudio() {
                return this._cache.get("getMapOfValidSequenceTracks_forStudio", () => (0,
                ft.prism)( () => {
                    const n = (0,
                    ft.val)(this.getArrayOfValidSequenceTracks());
                    let a = {};
                    for (const {pathToProp: u, trackId: m} of n)
                        go(a, u, m);
                    return a
                }
                ))
            }
            getStaticButNotSequencedOverrides() {
                return this._cache.get("getStaticButNotSequencedOverrides", () => (0,
                ft.prism)( () => {
                    const n = (0,
                    ft.val)(this.getStaticValues())
                      , a = (0,
                    ft.val)(this.getArrayOfValidSequenceTracks())
                      , u = Xb(n);
                    for (const {pathToProp: m} of a) {
                        Pp(u, m);
                        let b = m.slice(0, -1);
                        for (; b.length > 0; ) {
                            const T = gs(u, b);
                            if (!Mp(T))
                                break;
                            Pp(u, b),
                            b = b.slice(0, -1)
                        }
                    }
                    if (!Mp(u))
                        return u
                }
                ))
            }
            getDefaultsAtPointer(n) {
                const {path: a} = (0,
                ft.getPointerParts)(n)
                  , u = this.getDefaultValues().getValue();
                return gs(u, a)
            }
        }
        ;
        function h2(n) {
            try {
                return JSON.parse(n)
            } catch {
                Hs.warn("property ".concat(JSON.stringify(n), " cannot be parsed. Skipping."));
                return
            }
        }
        var Ip = pt()
          , g2 = o2(n => JSON.stringify(n));
        E(W());
        var _2 = class extends Error {
        }
          , fi = class extends _2 {
        }
          , jp = pt()
          , m2 = pt()
          , v2 = pt()
          , yt = pt();
        function nn() {
            let n, a;
            const u = new Promise( (b, T) => {
                n = R => {
                    b(R),
                    m.status = "resolved"
                }
                ,
                a = R => {
                    T(R),
                    m.status = "rejected"
                }
            }
            )
              , m = {
                resolve: n,
                reject: a,
                promise: u,
                status: "pending"
            };
            return m
        }
        var y2 = () => {}
          , Ds = y2
          , b2 = pt()
          , w2 = class {
            constructor() {
                S(this, "_stopPlayCallback", Ds),
                S(this, "_state", new b2.Atom({
                    position: 0,
                    playing: !1
                })),
                S(this, "statePointer"),
                this.statePointer = this._state.pointer
            }
            destroy() {}
            pause() {
                this._stopPlayCallback(),
                this.playing = !1,
                this._stopPlayCallback = Ds
            }
            gotoPosition(n) {
                this._updatePositionInState(n)
            }
            _updatePositionInState(n) {
                this._state.setByPointer(a => a.position, n)
            }
            getCurrentPosition() {
                return this._state.get().position
            }
            get playing() {
                return this._state.get().playing
            }
            set playing(n) {
                this._state.setByPointer(a => a.playing, n)
            }
            play(n, a, u, m, b) {
                this.playing && this.pause(),
                this.playing = !0;
                const T = a[1] - a[0];
                {
                    const ie = this.getCurrentPosition();
                    ie < a[0] || ie > a[1] ? m === "normal" || m === "alternate" ? this._updatePositionInState(a[0]) : (m === "reverse" || m === "alternateReverse") && this._updatePositionInState(a[1]) : m === "normal" || m === "alternate" ? ie === a[1] && this._updatePositionInState(a[0]) : ie === a[0] && this._updatePositionInState(a[1])
                }
                const R = nn()
                  , j = b.time
                  , H = T * n;
                let N = this.getCurrentPosition() - a[0];
                (m === "reverse" || m === "alternateReverse") && (N = a[1] - this.getCurrentPosition());
                const J = ie => {
                    const fe = Math.max(ie - j, 0) / 1e3
                      , Ce = Math.min(fe * u + N, H);
                    if (Ce !== H) {
                        const ke = Math.floor(Ce / T);
                        let Se = Ce / T % 1 * T;
                        if (m !== "normal")
                            if (m === "reverse")
                                Se = T - Se;
                            else {
                                const He = ke % 2 === 0;
                                m === "alternate" ? He || (Se = T - Se) : He && (Se = T - Se)
                            }
                        this._updatePositionInState(Se + a[0]),
                        Z()
                    } else {
                        if (m === "normal")
                            this._updatePositionInState(a[1]);
                        else if (m === "reverse")
                            this._updatePositionInState(a[0]);
                        else {
                            const ke = (n - 1) % 2 === 0;
                            m === "alternate" ? ke ? this._updatePositionInState(a[1]) : this._updatePositionInState(a[0]) : ke ? this._updatePositionInState(a[0]) : this._updatePositionInState(a[1])
                        }
                        this.playing = !1,
                        R.resolve(!0)
                    }
                }
                ;
                this._stopPlayCallback = () => {
                    b.offThisOrNextTick(J),
                    b.offNextTick(J),
                    this.playing && R.resolve(!1)
                }
                ;
                const Z = () => b.onNextTick(J);
                return b.onThisOrNextTick(J),
                R.promise
            }
            playDynamicRange(n, a) {
                this.playing && this.pause(),
                this.playing = !0;
                const u = nn()
                  , m = n.keepHot();
                u.promise.then(m, m);
                let b = a.time;
                const T = j => {
                    const H = Math.max(j - b, 0);
                    b = j;
                    const N = H / 1e3
                      , J = this.getCurrentPosition()
                      , Z = n.getValue();
                    if (J < Z[0] || J > Z[1])
                        this.gotoPosition(Z[0]);
                    else {
                        let ie = J + N;
                        ie > Z[1] && (ie = Z[0] + (ie - Z[1])),
                        this.gotoPosition(ie)
                    }
                    R()
                }
                ;
                this._stopPlayCallback = () => {
                    a.offThisOrNextTick(T),
                    a.offNextTick(T),
                    u.resolve(!1)
                }
                ;
                const R = () => a.onNextTick(T);
                return a.onThisOrNextTick(T),
                u.promise
            }
        }
          , T2 = pt()
          , S2 = "__TheatreJS_StudioBundle"
          , qc = "__TheatreJS_CoreBundle"
          , C2 = "__TheatreJS_Notifications"
          , Ls = n => (...a) => {
            var u;
            switch (n) {
            case "success":
                {
                    Hs.debug(a.slice(0, 2).join(`
`));
                    break
                }
            case "info":
                {
                    Hs.debug(a.slice(0, 2).join(`
`));
                    break
                }
            case "warning":
                {
                    Hs.warn(a.slice(0, 2).join(`
`));
                    break
                }
            }
            return typeof window < "u" ? (u = window[C2]) == null ? void 0 : u.notify[n](...a) : void 0
        }
          , yo = {
            warning: Ls("warning"),
            success: Ls("success"),
            info: Ls("info"),
            error: Ls("error")
        };
        typeof window < "u" && (window.addEventListener("error", n => {
            yo.error("An error occurred", "<pre>".concat(n.message, `</pre>

See **console** for details.`))
        }
        ),
        window.addEventListener("unhandledrejection", n => {
            yo.error("An error occurred", "<pre>".concat(n.reason, `</pre>

See **console** for details.`))
        }
        ));
        var P2 = class {
            constructor(n, a, u) {
                this._decodedBuffer = n,
                this._audioContext = a,
                this._nodeDestination = u,
                S(this, "_mainGain"),
                S(this, "_state", new T2.Atom({
                    position: 0,
                    playing: !1
                })),
                S(this, "statePointer"),
                S(this, "_stopPlayCallback", Ds),
                this.statePointer = this._state.pointer,
                this._mainGain = this._audioContext.createGain(),
                this._mainGain.connect(this._nodeDestination)
            }
            playDynamicRange(n, a) {
                const u = nn();
                this._playing && this.pause(),
                this._playing = !0;
                let m;
                const b = () => {
                    m?.(),
                    m = this._loopInRange(n.getValue(), a).stop
                }
                  , T = n.onStale(b);
                return b(),
                this._stopPlayCallback = () => {
                    m?.(),
                    T(),
                    u.resolve(!1)
                }
                ,
                u.promise
            }
            _loopInRange(n, a) {
                let m = this.getCurrentPosition();
                const b = n[1] - n[0];
                m < n[0] || m > n[1] ? this._updatePositionInState(n[0]) : m === n[1] && this._updatePositionInState(n[0]),
                m = this.getCurrentPosition();
                const T = this._audioContext.createBufferSource();
                T.buffer = this._decodedBuffer,
                T.connect(this._mainGain),
                T.playbackRate.value = 1,
                T.loop = !0,
                T.loopStart = n[0],
                T.loopEnd = n[1];
                const R = a.time;
                let j = m - n[0];
                T.start(0, m);
                const H = Z => {
                    let Ce = (Math.max(Z - R, 0) / 1e3 * 1 + j) / b % 1 * b;
                    this._updatePositionInState(Ce + n[0]),
                    N()
                }
                  , N = () => a.onNextTick(H);
                return a.onThisOrNextTick(H),
                {
                    stop: () => {
                        T.stop(),
                        T.disconnect(),
                        a.offThisOrNextTick(H),
                        a.offNextTick(H)
                    }
                }
            }
            get _playing() {
                return this._state.get().playing
            }
            set _playing(n) {
                this._state.setByPointer(a => a.playing, n)
            }
            destroy() {}
            pause() {
                this._stopPlayCallback(),
                this._playing = !1,
                this._stopPlayCallback = Ds
            }
            gotoPosition(n) {
                this._updatePositionInState(n)
            }
            _updatePositionInState(n) {
                this._state.reduce(a => y(p({}, a), {
                    position: n
                }))
            }
            getCurrentPosition() {
                return this._state.get().position
            }
            play(n, a, u, m, b) {
                this._playing && this.pause(),
                this._playing = !0;
                let T = this.getCurrentPosition();
                const R = a[1] - a[0];
                if (m !== "normal")
                    throw new fi('Audio-controlled sequences can only be played in the "normal" direction. ' + "'".concat(m, "' given."));
                T < a[0] || T > a[1] ? this._updatePositionInState(a[0]) : T === a[1] && this._updatePositionInState(a[0]),
                T = this.getCurrentPosition();
                const j = nn()
                  , H = this._audioContext.createBufferSource();
                H.buffer = this._decodedBuffer,
                H.connect(this._mainGain),
                H.playbackRate.value = u,
                n > 1e3 && (yo.warning("Can't play sequences with audio more than 1000 times", "The sequence will still play, but only 1000 times. The `iterationCount: ".concat(n, "` provided to `sequence.play()`\nis too high for a sequence with audio.\n\nTo fix this, either set `iterationCount` to a lower value, or remove the audio from the sequence."), [{
                    url: "https://www.theatrejs.com/docs/latest/manual/audio",
                    title: "Using Audio"
                }, {
                    url: "https://www.theatrejs.com/docs/latest/api/core#sequence.attachaudio",
                    title: "Audio API"
                }]),
                n = 1e3),
                n > 1 && (H.loop = !0,
                H.loopStart = a[0],
                H.loopEnd = a[1]);
                const N = b.time;
                let J = T - a[0];
                const Z = R * n;
                H.start(0, T, Z - J);
                const ie = Ce => {
                    const Se = Math.max(Ce - N, 0) / 1e3
                      , He = Math.min(Se * u + J, Z);
                    if (He !== Z) {
                        let kt = He / R % 1 * R;
                        this._updatePositionInState(kt + a[0]),
                        fe()
                    } else
                        this._updatePositionInState(a[1]),
                        this._playing = !1,
                        pe(),
                        j.resolve(!0)
                }
                  , pe = () => {
                    H.stop(),
                    H.disconnect()
                }
                ;
                this._stopPlayCallback = () => {
                    pe(),
                    b.offThisOrNextTick(ie),
                    b.offNextTick(ie),
                    this._playing && j.resolve(!1)
                }
                ;
                const fe = () => b.onNextTick(ie);
                return b.onThisOrNextTick(ie),
                j.promise
            }
        }
          , A2 = pt()
          , Hp = 0;
        function Kc(n) {
            var a;
            const u = R => {
                m.tick(R)
            }
              , m = new A2.Ticker({
                onActive() {
                    var R;
                    (R = n?.start) == null || R.call(n)
                },
                onDormant() {
                    var R;
                    (R = n?.stop) == null || R.call(n)
                }
            })
              , b = {
                tick: u,
                id: Hp++,
                name: (a = n?.name) != null ? a : "CustomRafDriver-".concat(Hp),
                type: "Theatre_RafDriver_PublicAPI"
            }
              , T = {
                type: "Theatre_RafDriver_PrivateAPI",
                publicApi: b,
                ticker: m,
                start: n?.start,
                stop: n?.stop
            };
            return he(b, T),
            b
        }
        function x2() {
            let n = null;
            const m = Kc({
                name: "DefaultCoreRafDriver",
                start: () => {
                    if (typeof window < "u") {
                        const b = T => {
                            m.tick(T),
                            n = window.requestAnimationFrame(b)
                        }
                        ;
                        n = window.requestAnimationFrame(b)
                    } else
                        m.tick(0),
                        setTimeout( () => m.tick(1), 0)
                }
                ,
                stop: () => {
                    typeof window < "u" && n !== null && window.cancelAnimationFrame(n)
                }
            });
            return m
        }
        var Bs;
        function Dp() {
            return Bs || k2(x2()),
            Bs
        }
        function Lp() {
            return Dp().ticker
        }
        function k2(n) {
            if (Bs)
                throw new Error("`setCoreRafDriver()` is already called.");
            Bs = Y(n)
        }
        var E2 = class {
            get type() {
                return "Theatre_Sequence_PublicAPI"
            }
            constructor(n) {
                he(this, n)
            }
            play(n) {
                const a = Y(this);
                if (a._project.isReady()) {
                    const u = n?.rafDriver ? Y(n.rafDriver).ticker : Lp();
                    return a.play(n ?? {}, u)
                } else {
                    const u = nn();
                    return u.resolve(!0),
                    u.promise
                }
            }
            pause() {
                Y(this).pause()
            }
            get position() {
                return Y(this).position
            }
            set position(n) {
                Y(this).position = n
            }
            __experimental_getKeyframes(n) {
                return Y(this).getKeyframesOfSimpleProp(n)
            }
            async attachAudio(n) {
                const {audioContext: a, destinationNode: u, decodedBuffer: m, gainNode: b} = await O2(n)
                  , T = new P2(m,a,b);
                return Y(this).replacePlaybackController(T),
                {
                    audioContext: a,
                    destinationNode: u,
                    decodedBuffer: m,
                    gainNode: b
                }
            }
            get pointer() {
                return Y(this).pointer
            }
        }
        ;
        async function O2(n) {
            function a() {
                if (n.audioContext)
                    return Promise.resolve(n.audioContext);
                const N = new AudioContext;
                return N.state === "running" || typeof window > "u" ? Promise.resolve(N) : new Promise(J => {
                    const Z = () => {
                        N.resume().catch(fe => {}
                        )
                    }
                      , ie = ["mousedown", "keydown", "touchstart"]
                      , pe = {
                        capture: !0,
                        passive: !1
                    };
                    ie.forEach(fe => {
                        window.addEventListener(fe, Z, pe)
                    }
                    ),
                    N.addEventListener("statechange", () => {
                        N.state === "running" && (ie.forEach(fe => {
                            window.removeEventListener(fe, Z, pe)
                        }
                        ),
                        J(N))
                    }
                    )
                }
                )
            }
            async function u() {
                if (n.source instanceof AudioBuffer)
                    return n.source;
                const N = nn();
                if (typeof n.source != "string")
                    throw new Error("Error validating arguments to sequence.attachAudio(). args.source must either be a string or an instance of AudioBuffer.");
                let J;
                try {
                    J = await fetch(n.source)
                } catch (fe) {
                    throw new Error("Could not fetch '".concat(n.source, "'. Network error logged above."))
                }
                let Z;
                try {
                    Z = await J.arrayBuffer()
                } catch (fe) {
                    throw new Error("Could not read '".concat(n.source, "' as an arrayBuffer."))
                }
                (await m).decodeAudioData(Z, N.resolve, N.reject);
                let pe;
                try {
                    pe = await N.promise
                } catch (fe) {
                    throw new Error("Could not decode ".concat(n.source, " as an audio file."))
                }
                return pe
            }
            const m = a()
              , b = u()
              , [T,R] = await Promise.all([m, b])
              , j = n.destinationNode || T.destination
              , H = T.createGain();
            return H.connect(j),
            {
                audioContext: T,
                decodedBuffer: R,
                gainNode: H,
                destinationNode: j
            }
        }
        var R2 = M2("Theatre_SheetObject");
        function M2(n) {
            return a => typeof a == "object" && !!a && a.type === n
        }
        var I2 = class {
            constructor(n, a, u, m, b) {
                this._project = n,
                this._sheet = a,
                this._lengthD = u,
                this._subUnitsPerUnitD = m,
                S(this, "address"),
                S(this, "publicApi"),
                S(this, "_playbackControllerBox"),
                S(this, "_prismOfStatePointer"),
                S(this, "_positionD"),
                S(this, "_positionFormatterD"),
                S(this, "_playableRangeD"),
                S(this, "pointer", (0,
                v2.pointer)({
                    root: this,
                    path: []
                })),
                S(this, "$$isPointerToPrismProvider", !0),
                S(this, "_logger"),
                S(this, "closestGridPosition", T => {
                    const j = 1 / this.subUnitsPerUnit;
                    return parseFloat((Math.round(T / j) * j).toFixed(3))
                }
                ),
                this._logger = n._logger.named("Sheet", a.address.sheetId).named("Instance", a.address.sheetInstanceId),
                this.address = y(p({}, this._sheet.address), {
                    sequenceName: "default"
                }),
                this.publicApi = new E2(this),
                this._playbackControllerBox = new m2.Atom(b ?? new w2),
                this._prismOfStatePointer = (0,
                yt.prism)( () => this._playbackControllerBox.prism.getValue().statePointer),
                this._positionD = (0,
                yt.prism)( () => {
                    const T = this._prismOfStatePointer.getValue();
                    return (0,
                    yt.val)(T.position)
                }
                ),
                this._positionFormatterD = (0,
                yt.prism)( () => {
                    const T = (0,
                    yt.val)(this._subUnitsPerUnitD);
                    return new j2(T)
                }
                )
            }
            get type() {
                return "Theatre_Sequence"
            }
            pointerToPrism(n) {
                const {path: a} = (0,
                jp.getPointerParts)(n);
                if (a.length === 0)
                    return (0,
                    yt.prism)( () => ({
                        length: (0,
                        yt.val)(this.pointer.length),
                        playing: (0,
                        yt.val)(this.pointer.playing),
                        position: (0,
                        yt.val)(this.pointer.position),
                        subUnitsPerUnit: (0,
                        yt.val)(this.pointer.subUnitsPerUnit)
                    }));
                if (a.length > 1)
                    return (0,
                    yt.prism)( () => {}
                    );
                const [u] = a;
                return u === "length" ? this._lengthD : u === "subUnitsPerUnit" ? this._subUnitsPerUnitD : u === "position" ? this._positionD : u === "playing" ? (0,
                yt.prism)( () => (0,
                yt.val)(this._prismOfStatePointer.getValue().playing)) : (0,
                yt.prism)( () => {}
                )
            }
            getKeyframesOfSimpleProp(n) {
                const {path: a, root: u} = (0,
                jp.getPointerParts)(n);
                if (!R2(u))
                    throw new fi("Argument prop must be a pointer to a SheetObject property");
                const m = (0,
                yt.val)(this._project.pointers.historic.sheetsById[this._sheet.address.sheetId].sequence.tracksByObject[u.address.objectKey]);
                if (!m)
                    return [];
                const {trackData: b, trackIdByPropPath: T} = m
                  , R = g2(a)
                  , j = T[R];
                if (!j)
                    return [];
                const H = b[j];
                return H ? H.keyframes : []
            }
            get positionFormatter() {
                return this._positionFormatterD.getValue()
            }
            get prismOfStatePointer() {
                return this._prismOfStatePointer
            }
            get length() {
                return this._lengthD.getValue()
            }
            get positionPrism() {
                return this._positionD
            }
            get position() {
                return this._playbackControllerBox.get().getCurrentPosition()
            }
            get subUnitsPerUnit() {
                return this._subUnitsPerUnitD.getValue()
            }
            get positionSnappedToGrid() {
                return this.closestGridPosition(this.position)
            }
            set position(n) {
                let a = n;
                this.pause(),
                a > this.length && (a = this.length);
                const u = this.length;
                this._playbackControllerBox.get().gotoPosition(a > u ? u : a)
            }
            getDurationCold() {
                return this._lengthD.getValue()
            }
            get playing() {
                return (0,
                yt.val)(this._playbackControllerBox.get().statePointer.playing)
            }
            _makeRangeFromSequenceTemplate() {
                return (0,
                yt.prism)( () => [0, (0,
                yt.val)(this._lengthD)])
            }
            playDynamicRange(n, a) {
                return this._playbackControllerBox.get().playDynamicRange(n, a)
            }
            async play(n, a) {
                const u = this.length
                  , m = n && n.range ? n.range : [0, u]
                  , b = n && typeof n.iterationCount == "number" ? n.iterationCount : 1
                  , T = n && typeof n.rate < "u" ? n.rate : 1
                  , R = n && n.direction ? n.direction : "normal";
                return await this._play(b, [m[0], m[1]], T, R, a)
            }
            _play(n, a, u, m, b) {
                return this._playbackControllerBox.get().play(n, a, u, m, b)
            }
            pause() {
                this._playbackControllerBox.get().pause()
            }
            replacePlaybackController(n) {
                this.pause();
                const a = this._playbackControllerBox.get();
                this._playbackControllerBox.set(n);
                const u = a.getCurrentPosition();
                a.destroy(),
                n.gotoPosition(u)
            }
        }
          , j2 = class {
            constructor(n) {
                this._fps = n
            }
            formatSubUnitForGrid(n) {
                const a = n % 1
                  , u = 1 / this._fps;
                return Math.round(a / u) + "f"
            }
            formatFullUnitForGrid(n) {
                let a = n
                  , u = "";
                if (a >= bo) {
                    const b = Math.floor(a / bo);
                    u += b + "h",
                    a = a % bo
                }
                if (a >= In) {
                    const b = Math.floor(a / In);
                    u += b + "m",
                    a = a % In
                }
                if (a >= Mn) {
                    const b = Math.floor(a / Mn);
                    u += b + "s",
                    a = a % Mn
                }
                const m = 1 / this._fps;
                if (a >= m) {
                    const b = Math.floor(a / m);
                    u += b + "f",
                    a = a % m
                }
                return u.length === 0 ? "0s" : u
            }
            formatForPlayhead(n) {
                let a = n
                  , u = "";
                if (a >= bo) {
                    const b = Math.floor(a / bo);
                    u += ui(b.toString(), 2, "0") + "h",
                    a = a % bo
                }
                if (a >= In) {
                    const b = Math.floor(a / In);
                    u += ui(b.toString(), 2, "0") + "m",
                    a = a % In
                } else
                    u.length > 0 && (u += "00m");
                if (a >= Mn) {
                    const b = Math.floor(a / Mn);
                    u += ui(b.toString(), 2, "0") + "s",
                    a = a % Mn
                } else
                    u += "00s";
                const m = 1 / this._fps;
                if (a >= m) {
                    const b = Math.round(a / m);
                    u += ui(b.toString(), 2, "0") + "f",
                    a = a % m
                } else
                    a / m > .98 ? (u += ui("1", 2, "0") + "f",
                    a = a % m) : u += "00f";
                return u.length === 0 ? "00s00f" : u
            }
            formatBasic(n) {
                return n.toFixed(2) + "s"
            }
        }
          , Mn = 1
          , In = Mn * 60
          , bo = In * 60
          , Wc = {};
        x(Wc, {
            boolean: () => Up,
            compound: () => Xc,
            file: () => $2,
            image: () => U2,
            number: () => zp,
            rgba: () => X2,
            string: () => qp,
            stringLiteral: () => e6
        });
        function Bp(n, a) {
            return n.length <= a ? n : n.substr(0, a - 3) + "..."
        }
        var H2 = n => typeof n == "string" ? 'string("'.concat(Bp(n, 10), '")') : typeof n == "number" ? "number(".concat(Bp(String(n), 10), ")") : n === null ? "null" : n === void 0 ? "undefined" : typeof n == "boolean" ? String(n) : Array.isArray(n) ? "array" : typeof n == "object" ? "object" : "unknown"
          , Np = H2;
        function D2(n, {removeAlphaIfOpaque: a=!1}={}) {
            const u = (n.a * 255 | 256).toString(16).slice(1)
              , m = (n.r * 255 | 256).toString(16).slice(1) + (n.g * 255 | 256).toString(16).slice(1) + (n.b * 255 | 256).toString(16).slice(1) + (a && u === "ff" ? "" : u);
            return "#".concat(m)
        }
        function Gc(n) {
            return y(p({}, n), {
                toString() {
                    return D2(this, {
                        removeAlphaIfOpaque: !0
                    })
                }
            })
        }
        function L2(n) {
            return Object.fromEntries(Object.entries(n).map( ([a,u]) => [a, Nd(u, 0, 1)]))
        }
        function B2(n) {
            function a(u) {
                return u >= .0031308 ? 1.055 * u ** (1 / 2.4) - .055 : 12.92 * u
            }
            return L2({
                r: a(n.r),
                g: a(n.g),
                b: a(n.b),
                a: n.a
            })
        }
        function Fp(n) {
            function a(u) {
                return u >= .04045 ? ((u + .055) / (1 + .055)) ** 2.4 : u / 12.92
            }
            return {
                r: a(n.r),
                g: a(n.g),
                b: a(n.b),
                a: n.a
            }
        }
        function Vp(n) {
            let a = .4122214708 * n.r + .5363325363 * n.g + .0514459929 * n.b
              , u = .2119034982 * n.r + .6806995451 * n.g + .1073969566 * n.b
              , m = .0883024619 * n.r + .2817188376 * n.g + .6299787005 * n.b
              , b = Math.cbrt(a)
              , T = Math.cbrt(u)
              , R = Math.cbrt(m);
            return {
                L: .2104542553 * b + .793617785 * T - .0040720468 * R,
                a: 1.9779984951 * b - 2.428592205 * T + .4505937099 * R,
                b: .0259040371 * b + .7827717662 * T - .808675766 * R,
                alpha: n.a
            }
        }
        function N2(n) {
            let a = n.L + .3963377774 * n.a + .2158037573 * n.b
              , u = n.L - .1055613458 * n.a - .0638541728 * n.b
              , m = n.L - .0894841775 * n.a - 1.291485548 * n.b
              , b = a * a * a
              , T = u * u * u
              , R = m * m * m;
            return {
                r: 4.0767416621 * b - 3.3077115913 * T + .2309699292 * R,
                g: -1.2684380046 * b + 2.6097574011 * T - .3413193965 * R,
                b: -.0041960863 * b - .7034186147 * T + 1.707614701 * R,
                a: n.alpha
            }
        }
        var Ir = Symbol("TheatrePropType_Basic");
        function $p(n) {
            return typeof n == "object" && !!n && n[Ir] === "TheatrePropType"
        }
        function F2(n) {
            if (typeof n == "number")
                return zp(n);
            if (typeof n == "boolean")
                return Up(n);
            if (typeof n == "string")
                return qp(n);
            if (typeof n == "object" && n) {
                if ($p(n))
                    return n;
                if (r1(n))
                    return Xc(n);
                throw new fi("This value is not a valid prop type: ".concat(Np(n)))
            } else
                throw new fi("This value is not a valid prop type: ".concat(Np(n)))
        }
        function V2(n) {
            const a = {};
            for (const u of Object.keys(n)) {
                const m = n[u];
                $p(m) ? a[u] = m : a[u] = F2(m)
            }
            return a
        }
        var Xc = (n, a={}) => {
            const u = V2(n)
              , m = new WeakMap;
            return {
                type: "compound",
                props: u,
                valueType: null,
                [Ir]: "TheatrePropType",
                label: a.label,
                default: E5(u, T => T.default),
                deserializeAndSanitize: T => {
                    if (typeof T != "object" || !T)
                        return;
                    if (m.has(T))
                        return m.get(T);
                    const R = {};
                    let j = !1;
                    for (const [H,N] of Object.entries(u))
                        if (Object.prototype.hasOwnProperty.call(T, H)) {
                            const J = N.deserializeAndSanitize(T[H]);
                            J != null && (j = !0,
                            R[H] = J)
                        }
                    if (m.set(T, R),
                    j)
                        return R
                }
            }
        }
          , $2 = (n, a={}) => {
            const u = (m, b, T) => {
                var R;
                return {
                    type: "file",
                    id: ((R = a.interpolate) != null ? R : di)(m.id, b.id, T)
                }
            }
            ;
            return {
                type: "file",
                default: {
                    type: "file",
                    id: n
                },
                valueType: null,
                [Ir]: "TheatrePropType",
                label: a.label,
                interpolate: u,
                deserializeAndSanitize: z2
            }
        }
          , z2 = n => {
            if (!n)
                return;
            let a = !0;
            if (typeof n.id != "string" && ![null, void 0].includes(n.id) && (a = !1),
            n.type !== "file" && (a = !1),
            !!a)
                return n
        }
          , U2 = (n, a={}) => {
            const u = (m, b, T) => {
                var R;
                return {
                    type: "image",
                    id: ((R = a.interpolate) != null ? R : di)(m.id, b.id, T)
                }
            }
            ;
            return {
                type: "image",
                default: {
                    type: "image",
                    id: n
                },
                valueType: null,
                [Ir]: "TheatrePropType",
                label: a.label,
                interpolate: u,
                deserializeAndSanitize: q2
            }
        }
          , q2 = n => {
            if (!n)
                return;
            let a = !0;
            if (typeof n.id != "string" && ![null, void 0].includes(n.id) && (a = !1),
            n.type !== "image" && (a = !1),
            !!a)
                return n
        }
          , zp = (n, a={}) => {
            var u;
            return y(p({
                type: "number",
                valueType: 0,
                default: n,
                [Ir]: "TheatrePropType"
            }, a || {}), {
                label: a.label,
                nudgeFn: (u = a.nudgeFn) != null ? u : t6,
                nudgeMultiplier: typeof a.nudgeMultiplier == "number" ? a.nudgeMultiplier : void 0,
                interpolate: G2,
                deserializeAndSanitize: K2(a.range)
            })
        }
          , K2 = n => n ? a => {
            if (typeof a == "number" && isFinite(a))
                return Nd(a, n[0], n[1])
        }
        : W2
          , W2 = n => typeof n == "number" && isFinite(n) ? n : void 0
          , G2 = (n, a, u) => n + u * (a - n)
          , X2 = (n={
            r: 0,
            g: 0,
            b: 0,
            a: 1
        }, a={}) => {
            const u = {};
            for (const m of ["r", "g", "b", "a"])
                u[m] = Math.min(Math.max(n[m], 0), 1);
            return {
                type: "rgba",
                valueType: null,
                default: Gc(u),
                [Ir]: "TheatrePropType",
                label: a.label,
                interpolate: Y2,
                deserializeAndSanitize: J2
            }
        }
          , J2 = n => {
            if (!n)
                return;
            let a = !0;
            for (const m of ["r", "g", "b", "a"])
                (!Object.prototype.hasOwnProperty.call(n, m) || typeof n[m] != "number") && (a = !1);
            if (!a)
                return;
            const u = {};
            for (const m of ["r", "g", "b", "a"])
                u[m] = Math.min(Math.max(n[m], 0), 1);
            return Gc(u)
        }
          , Y2 = (n, a, u) => {
            const m = Vp(Fp(n))
              , b = Vp(Fp(a))
              , T = {
                L: (1 - u) * m.L + u * b.L,
                a: (1 - u) * m.a + u * b.a,
                b: (1 - u) * m.b + u * b.b,
                alpha: (1 - u) * m.alpha + u * b.alpha
            }
              , R = B2(N2(T));
            return Gc(R)
        }
          , Up = (n, a={}) => {
            var u;
            return {
                type: "boolean",
                default: n,
                valueType: null,
                [Ir]: "TheatrePropType",
                label: a.label,
                interpolate: (u = a.interpolate) != null ? u : di,
                deserializeAndSanitize: Z2
            }
        }
          , Z2 = n => typeof n == "boolean" ? n : void 0;
        function di(n) {
            return n
        }
        var qp = (n, a={}) => {
            var u;
            return {
                type: "string",
                default: n,
                valueType: null,
                [Ir]: "TheatrePropType",
                label: a.label,
                interpolate: (u = a.interpolate) != null ? u : di,
                deserializeAndSanitize: Q2
            }
        }
        ;
        function Q2(n) {
            return typeof n == "string" ? n : void 0
        }
        function e6(n, a, u={}) {
            var m, b;
            return {
                type: "stringLiteral",
                default: n,
                valuesAndLabels: p({}, a),
                [Ir]: "TheatrePropType",
                valueType: null,
                as: (m = u.as) != null ? m : "menu",
                label: u.label,
                interpolate: (b = u.interpolate) != null ? b : di,
                deserializeAndSanitize(T) {
                    if (typeof T == "string" && Object.prototype.hasOwnProperty.call(a, T))
                        return T
                }
            }
        }
        var t6 = ({config: n, deltaX: a, deltaFraction: u, magnitude: m}) => {
            var b;
            const {range: T} = n;
            return !n.nudgeMultiplier && T && !T.includes(1 / 0) && !T.includes(-1 / 0) ? u * (T[1] - T[0]) * m : a * m * ((b = n.nudgeMultiplier) != null ? b : 1)
        }
          , r6 = n => n.replace(/^[\s\/]*/, "").replace(/[\s\/]*$/, "").replace(/\s*\/\s*/g, " / ");
        function Ns(n, a) {
            return r6(n)
        }
        E(Q());
        var n6 = class {
            get type() {
                return "Theatre_Sheet_PublicAPI"
            }
            constructor(n) {
                he(this, n)
            }
            object(n, a, u) {
                const m = Y(this)
                  , b = Ns(n)
                  , T = m.getObject(b)
                  , R = null
                  , j = u?.__actions__THIS_API_IS_UNSTABLE_AND_WILL_CHANGE_IN_THE_NEXT_VERSION;
                if (T)
                    return j && T.template._temp_setActions(j),
                    T.publicApi;
                {
                    const H = Xc(a);
                    return m.createObject(b, R, H, j).publicApi
                }
            }
            __experimental_getExistingObject(n) {
                const a = Y(this)
                  , u = Ns(n)
                  , m = a.getObject(u);
                return m?.publicApi
            }
            get sequence() {
                return Y(this).getSequence().publicApi
            }
            get project() {
                return Y(this).project.publicApi
            }
            get address() {
                return p({}, Y(this).address)
            }
            detachObject(n) {
                const a = Y(this)
                  , u = Ns(n);
                if (!a.getObject(u)) {
                    yo.warning(`Couldn't delete object "`.concat(u, '"'), 'There is no object with key "'.concat(u, `".

To fix this, make sure you are calling \`sheet.deleteObject("`).concat(u, '")` with the correct key.')),
                    'Object key "'.concat(u, '" does not exist.');
                    return
                }
                a.deleteObject(u)
            }
        }
          , pi = pt()
          , o6 = class {
            constructor(n, a) {
                this.template = n,
                this.instanceId = a,
                S(this, "_objects", new pi.Atom({})),
                S(this, "_sequence"),
                S(this, "address"),
                S(this, "publicApi"),
                S(this, "project"),
                S(this, "objectsP", this._objects.pointer),
                S(this, "type", "Theatre_Sheet"),
                S(this, "_logger"),
                this._logger = n.project._logger.named("Sheet", a),
                this._logger._trace("creating sheet"),
                this.project = n.project,
                this.address = y(p({}, n.address), {
                    sheetInstanceId: this.instanceId
                }),
                this.publicApi = new n6(this)
            }
            createObject(n, a, u, m={}) {
                const T = this.template.getObjectTemplate(n, a, u, m).createInstance(this, a, u);
                return this._objects.setByPointer(R => R[n], T),
                T
            }
            getObject(n) {
                return this._objects.get()[n]
            }
            deleteObject(n) {
                this._objects.reduce(a => {
                    const u = p({}, a);
                    return delete u[n],
                    u
                }
                )
            }
            getSequence() {
                if (!this._sequence) {
                    const n = (0,
                    pi.prism)( () => {
                        const u = (0,
                        pi.val)(this.project.pointers.historic.sheetsById[this.address.sheetId].sequence.length);
                        return i6(u)
                    }
                    )
                      , a = (0,
                    pi.prism)( () => {
                        const u = (0,
                        pi.val)(this.project.pointers.historic.sheetsById[this.address.sheetId].sequence.subUnitsPerUnit);
                        return s6(u)
                    }
                    );
                    this._sequence = new I2(this.template.project,this,n,a)
                }
                return this._sequence
            }
        }
          , i6 = n => typeof n == "number" && isFinite(n) && n > 0 ? n : 10
          , s6 = n => typeof n == "number" && x5(n) && n >= 1 && n <= 1e3 ? n : 30
          , a6 = class {
            constructor(n, a) {
                this.project = n,
                S(this, "type", "Theatre_SheetTemplate"),
                S(this, "address"),
                S(this, "_instances", new Ip.Atom({})),
                S(this, "instancesP", this._instances.pointer),
                S(this, "_objectTemplates", new Ip.Atom({})),
                S(this, "objectTemplatesP", this._objectTemplates.pointer),
                this.address = y(p({}, n.address), {
                    sheetId: a
                })
            }
            getInstance(n) {
                let a = this._instances.get()[n];
                return a || (a = new o6(this,n),
                this._instances.setByPointer(u => u[n], a)),
                a
            }
            getObjectTemplate(n, a, u, m) {
                let b = this._objectTemplates.get()[n];
                return b || (b = new p2(this,n,a,u,m),
                this._objectTemplates.setByPointer(T => T[n], b)),
                b
            }
        }
          , Jc = pt()
          , Kp = pt()
          , l6 = n => new Promise(a => setTimeout(a, n))
          , c6 = l6;
        function ar(n) {
            for (var a = arguments.length, u = Array(a > 1 ? a - 1 : 0), m = 1; m < a; m++)
                u[m - 1] = arguments[m];
            throw Error("[Immer] minified error nr: " + n + (u.length ? " " + u.map(function(b) {
                return "'" + b + "'"
            }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf")
        }
        function jn(n) {
            return !!n && !!n[Ut]
        }
        function Hn(n) {
            return !!n && (function(a) {
                if (!a || typeof a != "object")
                    return !1;
                var u = Object.getPrototypeOf(a);
                if (u === null)
                    return !0;
                var m = Object.hasOwnProperty.call(u, "constructor") && u.constructor;
                return m === Object || typeof m == "function" && Function.toString.call(m) === v6
            }(n) || Array.isArray(n) || !!n[rh] || !!n.constructor[rh] || Zc(n) || Qc(n))
        }
        function u6(n) {
            return jn(n) || ar(23, n),
            n[Ut].t
        }
        function hi(n, a, u) {
            u === void 0 && (u = !1),
            wo(n) === 0 ? (u ? Object.keys : fu)(n).forEach(function(m) {
                u && typeof m == "symbol" || a(m, n[m], n)
            }) : n.forEach(function(m, b) {
                return a(b, m, n)
            })
        }
        function wo(n) {
            var a = n[Ut];
            return a ? a.i > 3 ? a.i - 4 : a.i : Array.isArray(n) ? 1 : Zc(n) ? 2 : Qc(n) ? 3 : 0
        }
        function Yc(n, a) {
            return wo(n) === 2 ? n.has(a) : Object.prototype.hasOwnProperty.call(n, a)
        }
        function f6(n, a) {
            return wo(n) === 2 ? n.get(a) : n[a]
        }
        function Wp(n, a, u) {
            var m = wo(n);
            m === 2 ? n.set(a, u) : m === 3 ? (n.delete(a),
            n.add(u)) : n[a] = u
        }
        function d6(n, a) {
            return n === a ? n !== 0 || 1 / n == 1 / a : n != n && a != a
        }
        function Zc(n) {
            return _6 && n instanceof Map
        }
        function Qc(n) {
            return m6 && n instanceof Set
        }
        function Dn(n) {
            return n.o || n.t
        }
        function eu(n) {
            if (Array.isArray(n))
                return Array.prototype.slice.call(n);
            var a = y6(n);
            delete a[Ut];
            for (var u = fu(a), m = 0; m < u.length; m++) {
                var b = u[m]
                  , T = a[b];
                T.writable === !1 && (T.writable = !0,
                T.configurable = !0),
                (T.get || T.set) && (a[b] = {
                    configurable: !0,
                    writable: !0,
                    enumerable: T.enumerable,
                    value: n[b]
                })
            }
            return Object.create(Object.getPrototypeOf(n), a)
        }
        function tu(n, a) {
            return a === void 0 && (a = !1),
            ru(n) || jn(n) || !Hn(n) || (wo(n) > 1 && (n.set = n.add = n.clear = n.delete = p6),
            Object.freeze(n),
            a && hi(n, function(u, m) {
                return tu(m, !0)
            }, !0)),
            n
        }
        function p6() {
            ar(2)
        }
        function ru(n) {
            return n == null || typeof n != "object" || Object.isFrozen(n)
        }
        function jr(n) {
            var a = b6[n];
            return a || ar(18, n),
            a
        }
        function Gp() {
            return gi
        }
        function nu(n, a) {
            a && (jr("Patches"),
            n.u = [],
            n.s = [],
            n.v = a)
        }
        function Fs(n) {
            ou(n),
            n.p.forEach(h6),
            n.p = null
        }
        function ou(n) {
            n === gi && (gi = n.l)
        }
        function Xp(n) {
            return gi = {
                p: [],
                l: gi,
                h: n,
                m: !0,
                _: 0
            }
        }
        function h6(n) {
            var a = n[Ut];
            a.i === 0 || a.i === 1 ? a.j() : a.O = !0
        }
        function iu(n, a) {
            a._ = a.p.length;
            var u = a.p[0]
              , m = n !== void 0 && n !== u;
            return a.h.g || jr("ES5").S(a, n, m),
            m ? (u[Ut].P && (Fs(a),
            ar(4)),
            Hn(n) && (n = Vs(a, n),
            a.l || $s(a, n)),
            a.u && jr("Patches").M(u[Ut], n, a.u, a.s)) : n = Vs(a, u, []),
            Fs(a),
            a.u && a.v(a.u, a.s),
            n !== th ? n : void 0
        }
        function Vs(n, a, u) {
            if (ru(a))
                return a;
            var m = a[Ut];
            if (!m)
                return hi(a, function(T, R) {
                    return Jp(n, m, a, T, R, u)
                }, !0),
                a;
            if (m.A !== n)
                return a;
            if (!m.P)
                return $s(n, m.t, !0),
                m.t;
            if (!m.I) {
                m.I = !0,
                m.A._--;
                var b = m.i === 4 || m.i === 5 ? m.o = eu(m.k) : m.o;
                hi(m.i === 3 ? new Set(b) : b, function(T, R) {
                    return Jp(n, m, b, T, R, u)
                }),
                $s(n, b, !1),
                u && n.u && jr("Patches").R(m, u, n.u, n.s)
            }
            return m.o
        }
        function Jp(n, a, u, m, b, T) {
            if (jn(b)) {
                var R = Vs(n, b, T && a && a.i !== 3 && !Yc(a.D, m) ? T.concat(m) : void 0);
                if (Wp(u, m, R),
                !jn(R))
                    return;
                n.m = !1
            }
            if (Hn(b) && !ru(b)) {
                if (!n.h.F && n._ < 1)
                    return;
                Vs(n, b),
                a && a.A.l || $s(n, b)
            }
        }
        function $s(n, a, u) {
            u === void 0 && (u = !1),
            n.h.F && n.m && tu(a, u)
        }
        function su(n, a) {
            var u = n[Ut];
            return (u ? Dn(u) : n)[a]
        }
        function Yp(n, a) {
            if (a in n)
                for (var u = Object.getPrototypeOf(n); u; ) {
                    var m = Object.getOwnPropertyDescriptor(u, a);
                    if (m)
                        return m;
                    u = Object.getPrototypeOf(u)
                }
        }
        function au(n) {
            n.P || (n.P = !0,
            n.l && au(n.l))
        }
        function lu(n) {
            n.o || (n.o = eu(n.t))
        }
        function cu(n, a, u) {
            var m = Zc(a) ? jr("MapSet").N(a, u) : Qc(a) ? jr("MapSet").T(a, u) : n.g ? function(b, T) {
                var R = Array.isArray(b)
                  , j = {
                    i: R ? 1 : 0,
                    A: T ? T.A : Gp(),
                    P: !1,
                    I: !1,
                    D: {},
                    l: T,
                    t: b,
                    k: null,
                    o: null,
                    j: null,
                    C: !1
                }
                  , H = j
                  , N = zs;
                R && (H = [j],
                N = Us);
                var J = Proxy.revocable(H, N)
                  , Z = J.revoke
                  , ie = J.proxy;
                return j.k = ie,
                j.j = Z,
                ie
            }(a, u) : jr("ES5").J(a, u);
            return (u ? u.A : Gp()).p.push(m),
            m
        }
        function g6(n) {
            return jn(n) || ar(22, n),
            function a(u) {
                if (!Hn(u))
                    return u;
                var m, b = u[Ut], T = wo(u);
                if (b) {
                    if (!b.P && (b.i < 4 || !jr("ES5").K(b)))
                        return b.t;
                    b.I = !0,
                    m = Zp(u, T),
                    b.I = !1
                } else
                    m = Zp(u, T);
                return hi(m, function(R, j) {
                    b && f6(b.t, R) === j || Wp(m, R, a(j))
                }),
                T === 3 ? new Set(m) : m
            }(n)
        }
        function Zp(n, a) {
            switch (a) {
            case 2:
                return new Map(n);
            case 3:
                return Array.from(n)
            }
            return eu(n)
        }
        var Qp, gi, uu = typeof Symbol < "u" && typeof Symbol("x") == "symbol", _6 = typeof Map < "u", m6 = typeof Set < "u", eh = typeof Proxy < "u" && Proxy.revocable !== void 0 && typeof Reflect < "u", th = uu ? Symbol.for("immer-nothing") : ((Qp = {})["immer-nothing"] = !0,
        Qp), rh = uu ? Symbol.for("immer-draftable") : "__$immer_draftable", Ut = uu ? Symbol.for("immer-state") : "__$immer_state", v6 = "" + Object.prototype.constructor, fu = typeof Reflect < "u" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(n) {
            return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))
        }
        : Object.getOwnPropertyNames, y6 = Object.getOwnPropertyDescriptors || function(n) {
            var a = {};
            return fu(n).forEach(function(u) {
                a[u] = Object.getOwnPropertyDescriptor(n, u)
            }),
            a
        }
        , b6 = {}, zs = {
            get: function(n, a) {
                if (a === Ut)
                    return n;
                var u = Dn(n);
                if (!Yc(u, a))
                    return function(b, T, R) {
                        var j, H = Yp(T, R);
                        return H ? "value"in H ? H.value : (j = H.get) === null || j === void 0 ? void 0 : j.call(b.k) : void 0
                    }(n, u, a);
                var m = u[a];
                return n.I || !Hn(m) ? m : m === su(n.t, a) ? (lu(n),
                n.o[a] = cu(n.A.h, m, n)) : m
            },
            has: function(n, a) {
                return a in Dn(n)
            },
            ownKeys: function(n) {
                return Reflect.ownKeys(Dn(n))
            },
            set: function(n, a, u) {
                var m = Yp(Dn(n), a);
                if (m?.set)
                    return m.set.call(n.k, u),
                    !0;
                if (!n.P) {
                    var b = su(Dn(n), a)
                      , T = b?.[Ut];
                    if (T && T.t === u)
                        return n.o[a] = u,
                        n.D[a] = !1,
                        !0;
                    if (d6(u, b) && (u !== void 0 || Yc(n.t, a)))
                        return !0;
                    lu(n),
                    au(n)
                }
                return n.o[a] === u && typeof u != "number" && (u !== void 0 || a in n.o) || (n.o[a] = u,
                n.D[a] = !0,
                !0)
            },
            deleteProperty: function(n, a) {
                return su(n.t, a) !== void 0 || a in n.t ? (n.D[a] = !1,
                lu(n),
                au(n)) : delete n.D[a],
                n.o && delete n.o[a],
                !0
            },
            getOwnPropertyDescriptor: function(n, a) {
                var u = Dn(n)
                  , m = Reflect.getOwnPropertyDescriptor(u, a);
                return m && {
                    writable: !0,
                    configurable: n.i !== 1 || a !== "length",
                    enumerable: m.enumerable,
                    value: u[a]
                }
            },
            defineProperty: function() {
                ar(11)
            },
            getPrototypeOf: function(n) {
                return Object.getPrototypeOf(n.t)
            },
            setPrototypeOf: function() {
                ar(12)
            }
        }, Us = {};
        hi(zs, function(n, a) {
            Us[n] = function() {
                return arguments[0] = arguments[0][0],
                a.apply(this, arguments)
            }
        }),
        Us.deleteProperty = function(n, a) {
            return zs.deleteProperty.call(this, n[0], a)
        }
        ,
        Us.set = function(n, a, u) {
            return zs.set.call(this, n[0], a, u, n[0])
        }
        ;
        var w6 = function() {
            function n(u) {
                var m = this;
                this.g = eh,
                this.F = !0,
                this.produce = function(b, T, R) {
                    if (typeof b == "function" && typeof T != "function") {
                        var j = T;
                        T = b;
                        var H = m;
                        return function(pe) {
                            var fe = this;
                            pe === void 0 && (pe = j);
                            for (var Ce = arguments.length, ke = Array(Ce > 1 ? Ce - 1 : 0), Se = 1; Se < Ce; Se++)
                                ke[Se - 1] = arguments[Se];
                            return H.produce(pe, function(He) {
                                var kt;
                                return (kt = T).call.apply(kt, [fe, He].concat(ke))
                            })
                        }
                    }
                    var N;
                    if (typeof T != "function" && ar(6),
                    R !== void 0 && typeof R != "function" && ar(7),
                    Hn(b)) {
                        var J = Xp(m)
                          , Z = cu(m, b, void 0)
                          , ie = !0;
                        try {
                            N = T(Z),
                            ie = !1
                        } finally {
                            ie ? Fs(J) : ou(J)
                        }
                        return typeof Promise < "u" && N instanceof Promise ? N.then(function(pe) {
                            return nu(J, R),
                            iu(pe, J)
                        }, function(pe) {
                            throw Fs(J),
                            pe
                        }) : (nu(J, R),
                        iu(N, J))
                    }
                    if (!b || typeof b != "object")
                        return (N = T(b)) === th ? void 0 : (N === void 0 && (N = b),
                        m.F && tu(N, !0),
                        N);
                    ar(21, b)
                }
                ,
                this.produceWithPatches = function(b, T) {
                    return typeof b == "function" ? function(H) {
                        for (var N = arguments.length, J = Array(N > 1 ? N - 1 : 0), Z = 1; Z < N; Z++)
                            J[Z - 1] = arguments[Z];
                        return m.produceWithPatches(H, function(ie) {
                            return b.apply(void 0, [ie].concat(J))
                        })
                    }
                    : [m.produce(b, T, function(H, N) {
                        R = H,
                        j = N
                    }), R, j];
                    var R, j
                }
                ,
                typeof u?.useProxies == "boolean" && this.setUseProxies(u.useProxies),
                typeof u?.autoFreeze == "boolean" && this.setAutoFreeze(u.autoFreeze)
            }
            var a = n.prototype;
            return a.createDraft = function(u) {
                Hn(u) || ar(8),
                jn(u) && (u = g6(u));
                var m = Xp(this)
                  , b = cu(this, u, void 0);
                return b[Ut].C = !0,
                ou(m),
                b
            }
            ,
            a.finishDraft = function(u, m) {
                var b = u && u[Ut]
                  , T = b.A;
                return nu(T, m),
                iu(void 0, T)
            }
            ,
            a.setAutoFreeze = function(u) {
                this.F = u
            }
            ,
            a.setUseProxies = function(u) {
                u && !eh && ar(20),
                this.g = u
            }
            ,
            a.applyPatches = function(u, m) {
                var b;
                for (b = m.length - 1; b >= 0; b--) {
                    var T = m[b];
                    if (T.path.length === 0 && T.op === "replace") {
                        u = T.value;
                        break
                    }
                }
                var R = jr("Patches").$;
                return jn(u) ? R(u, m) : this.produce(u, function(j) {
                    return R(j, m.slice(b + 1))
                })
            }
            ,
            n
        }()
          , Qt = new w6;
        Qt.produce,
        Qt.produceWithPatches.bind(Qt),
        Qt.setAutoFreeze.bind(Qt),
        Qt.setUseProxies.bind(Qt),
        Qt.applyPatches.bind(Qt),
        Qt.createDraft.bind(Qt),
        Qt.finishDraft.bind(Qt);
        var T6 = {
            currentProjectStateDefinitionVersion: "0.4.0"
        }
          , du = T6;
        async function S6(n, a, u) {
            await c6(0),
            n.transaction( ({drafts: m}) => {
                var b;
                const T = a.address.projectId;
                m.ephemeral.coreByProject[T] = {
                    lastExportedObject: null,
                    loadingState: {
                        type: "loading"
                    }
                },
                m.ahistoric.coreByProject[T] = {
                    ahistoricStuff: ""
                };
                function R() {
                    m.ephemeral.coreByProject[T].loadingState = {
                        type: "loaded"
                    },
                    m.historic.coreByProject[T] = {
                        sheetsById: {},
                        definitionVersion: du.currentProjectStateDefinitionVersion,
                        revisionHistory: []
                    }
                }
                function j(Z) {
                    m.ephemeral.coreByProject[T].loadingState = {
                        type: "loaded"
                    },
                    m.historic.coreByProject[T] = Z
                }
                function H() {
                    m.ephemeral.coreByProject[T].loadingState = {
                        type: "loaded"
                    }
                }
                function N(Z) {
                    m.ephemeral.coreByProject[T].loadingState = {
                        type: "browserStateIsNotBasedOnDiskState",
                        onDiskState: Z
                    }
                }
                const J = (b = u6(m.historic)) == null ? void 0 : b.coreByProject[a.address.projectId];
                J ? u && J.revisionHistory.indexOf(u.revisionHistory[0]) == -1 ? N(u) : H() : u ? j(u) : R()
            }
            )
        }
        function nh() {}
        function oh(n) {
            var a, u;
            const m = (a = n?.logging) != null && a.internal ? (u = n.logging.min) != null ? u : 256 : 1 / 0
              , b = m <= 128
              , T = m <= 512
              , R = Ap(void 0, {
                _debug: b ? console.debug.bind(console, "_coreLogger(TheatreInternalLogger) debug") : nh,
                _error: T ? console.error.bind(console, "_coreLogger(TheatreInternalLogger) error") : nh
            });
            if (n) {
                const {logger: j, logging: H} = n;
                j && R.configureLogger(j),
                H ? R.configureLogging(H) : R.configureLogging({
                    dev: !1
                })
            }
            return R.getLogger().named("Theatre")
        }
        var C6 = class {
            constructor(n, a={}, u) {
                this.config = a,
                this.publicApi = u,
                S(this, "pointers"),
                S(this, "_pointerProxies"),
                S(this, "address"),
                S(this, "_studioReadyDeferred"),
                S(this, "_assetStorageReadyDeferred"),
                S(this, "_readyPromise"),
                S(this, "_sheetTemplates", new Kp.Atom({})),
                S(this, "sheetTemplatesP", this._sheetTemplates.pointer),
                S(this, "_studio"),
                S(this, "assetStorage"),
                S(this, "type", "Theatre_Project"),
                S(this, "_logger");
                var m;
                this._logger = oh({
                    logging: {
                        dev: !0
                    }
                }).named("Project", n),
                this._logger.traceDev("creating project"),
                this.address = {
                    projectId: n
                };
                const b = new Kp.Atom({
                    ahistoric: {
                        ahistoricStuff: ""
                    },
                    historic: (m = a.state) != null ? m : {
                        sheetsById: {},
                        definitionVersion: du.currentProjectStateDefinitionVersion,
                        revisionHistory: []
                    },
                    ephemeral: {
                        loadingState: {
                            type: "loaded"
                        },
                        lastExportedObject: null
                    }
                });
                this._assetStorageReadyDeferred = nn(),
                this.assetStorage = {
                    getAssetUrl: T => {
                        var R;
                        return "".concat((R = a.assets) == null ? void 0 : R.baseUrl, "/").concat(T)
                    }
                    ,
                    createAsset: () => {
                        throw new Error("Please wait for Project.ready to use assets.")
                    }
                },
                this._pointerProxies = {
                    historic: new Jc.PointerProxy(b.pointer.historic),
                    ahistoric: new Jc.PointerProxy(b.pointer.ahistoric),
                    ephemeral: new Jc.PointerProxy(b.pointer.ephemeral)
                },
                this.pointers = {
                    historic: this._pointerProxies.historic.pointer,
                    ahistoric: this._pointerProxies.ahistoric.pointer,
                    ephemeral: this._pointerProxies.ephemeral.pointer
                },
                ve.add(n, this),
                this._studioReadyDeferred = nn(),
                this._readyPromise = Promise.all([this._studioReadyDeferred.promise, this._assetStorageReadyDeferred.promise]).then( () => {}
                ),
                a.state ? setTimeout( () => {
                    this._studio || (this._studioReadyDeferred.resolve(void 0),
                    this._assetStorageReadyDeferred.resolve(void 0),
                    this._logger._trace("ready deferred resolved with no state"))
                }
                , 0) : typeof window > "u" ? 'Argument config.state in Theatre.getProject("'.concat(n, '", config) is empty. ') + "" : setTimeout( () => {
                    if (!this._studio)
                        throw new Error('Argument config.state in Theatre.getProject("'.concat(n, '", config) is empty. This is fine ') + "while you are using @theatre/core along with @theatre/studio. But since @theatre/studio " + 'is not loaded, the state of project "'.concat(n, `" will be empty.

`) + `To fix this, you need to add @theatre/studio into the bundle and export the project's state. Learn how to do that at https://www.theatrejs.com/docs/latest/manual/projects#state
`)
                }
                , 1e3)
            }
            attachToStudio(n) {
                if (this._studio) {
                    if (this._studio !== n)
                        throw new Error("Project ".concat(this.address.projectId, " is already attached to studio ").concat(this._studio.address.studioId));
                    "Project ".concat(this.address.projectId, " is already attached to studio ").concat(this._studio.address.studioId);
                    return
                }
                this._studio = n,
                n.initialized.then(async () => {
                    var a;
                    await S6(n, this, this.config.state),
                    this._pointerProxies.historic.setPointer(n.atomP.historic.coreByProject[this.address.projectId]),
                    this._pointerProxies.ahistoric.setPointer(n.atomP.ahistoric.coreByProject[this.address.projectId]),
                    this._pointerProxies.ephemeral.setPointer(n.atomP.ephemeral.coreByProject[this.address.projectId]),
                    await n.createAssetStorage(this, (a = this.config.assets) == null ? void 0 : a.baseUrl).then(u => {
                        this.assetStorage = u,
                        this._assetStorageReadyDeferred.resolve(void 0)
                    }
                    ),
                    this._studioReadyDeferred.resolve(void 0)
                }
                ).catch(a => {
                    throw a
                }
                )
            }
            get isAttachedToStudio() {
                return !!this._studio
            }
            get ready() {
                return this._readyPromise
            }
            isReady() {
                return this._studioReadyDeferred.status === "resolved" && this._assetStorageReadyDeferred.status === "resolved"
            }
            getOrCreateSheet(n, a="default") {
                let u = this._sheetTemplates.get()[n];
                return u || (u = new a6(this,n),
                this._sheetTemplates.reduce(m => y(p({}, m), {
                    [n]: u
                }))),
                u.getInstance(a)
            }
        }
          , P6 = class {
            get type() {
                return "Theatre_Project_PublicAPI"
            }
            constructor(n, a={}) {
                he(this, new C6(n,a,this))
            }
            get ready() {
                return Y(this).ready
            }
            get isReady() {
                return Y(this).isReady()
            }
            get address() {
                return p({}, Y(this).address)
            }
            getAssetUrl(n) {
                if (this.isReady)
                    return n.id ? Y(this).assetStorage.getAssetUrl(n.id) : void 0
            }
            sheet(n, a="default") {
                const u = Ns(n);
                return Y(this).getOrCreateSheet(u, a).publicApi
            }
        }
        ;
        E(Q());
        var ih = pt()
          , pu = pt();
        function sh(n, a={}) {
            const u = ve.get(n);
            if (u)
                return u.publicApi;
            const b = oh().named("Project", n);
            return a.state ? (x6(n, a.state),
            b._debug("deep validated config.state on disk")) : b._debug("no config.state"),
            new P6(n,a)
        }
        var A6 = (n, a) => {
            if (Array.isArray(a) || a == null || a.definitionVersion !== du.currentProjectStateDefinitionVersion)
                throw new fi("Error validating conf.state in Theatre.getProject(".concat(JSON.stringify(n), ", conf). The state seems to be formatted in a way that is unreadable to Theatre.js. Read more at https://www.theatrejs.com/docs/latest/manual/projects#state"))
        }
          , x6 = (n, a) => {
            A6(n, a)
        }
        ;
        function hu(n, a, u) {
            const m = u ? Y(u).ticker : Lp();
            if ((0,
            ih.isPointer)(n))
                return (0,
                pu.pointerToPrism)(n).onChange(m, a, !0);
            if ((0,
            pu.isPrism)(n))
                return n.onChange(m, a, !0);
            throw new Error("Called onChange(p) where p is neither a pointer nor a prism.")
        }
        function ah(n) {
            if ((0,
            ih.isPointer)(n))
                return (0,
                pu.pointerToPrism)(n).getValue();
            throw new Error("Called val(p) where p is not a pointer.")
        }
        var k6 = class {
            constructor() {
                S(this, "_studio")
            }
            get type() {
                return "Theatre_CoreBundle"
            }
            get version() {
                return "0.7.2"
            }
            getBitsForStudio(n, a) {
                if (this._studio)
                    throw new Error("@theatre/core is already attached to @theatre/studio");
                this._studio = n;
                const u = {
                    projectsP: ve.atom.pointer.projects,
                    privateAPI: Y,
                    coreExports: G,
                    getCoreRafDriver: Dp
                };
                a(u)
            }
        }
        ;
        E6();
        function E6() {
            if (typeof window > "u")
                return;
            const n = window[qc];
            if (typeof n < "u")
                throw typeof n == "object" && n && typeof n.version == "string" ? new Error(`It seems that the module '@theatre/core' is loaded more than once. This could have two possible causes:
1. You might have two separate versions of Theatre.js in node_modules.
2. Or this might be a bundling misconfiguration, in case you're using a bundler like Webpack/ESBuild/Rollup.

Note that it **is okay** to import '@theatre/core' multiple times. But those imports should point to the same module.`) : new Error("The variable window.".concat(qc, " seems to be already set by a module other than @theatre/core."));
            const a = new k6;
            window[qc] = a;
            const u = window[S2];
            u && u !== null && u.type === "Theatre_StudioBundle" && u.registerCoreBundle(a)
        }
        /*! Bundled license information:

		lodash-es/lodash.js:
		  (**
		   * @license
		   * Lodash (Custom Build) <https://lodash.com/>
		   * Build: `lodash modularize exports="es" -o ./`
		   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
		   * Released under MIT license <https://lodash.com/license>
		   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
		   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
		   *)
		*/
    }(Pi, Pi.exports)),
    Pi.exports
}
var Ee = N9();
const F9 = {
    inject: ["sheet", "time", "raf"],
    data() {
        return {
            opacity: 0,
            backOpacity: 0,
            textOpacity: 0,
            backgroundColor: "#006FFF",
            backBackgroundColor: "#006FFF",
            transform: 0,
            cardLeft: {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0
            },
            cardRight: {
                x: 1,
                y: 0,
                rotateX: 0,
                rotateY: 0
            }
        }
    },
    methods: {
        toHex(e) {
            const t = r => Math.round(r * 255).toString(16).padStart(2, "0");
            return "#" + t(e.r) + t(e.g) + t(e.b) + t(e.a)
        }
    },
    mounted() {
        this.sheet().object("Cubes Impostor", {
            opacity: Ee.types.number(0, {
                range: [0, 1]
            }),
            backgroundColor: Ee.types.rgba({
                r: 0,
                g: 0,
                b: 0,
                a: 1
            }),
            backBackgroundColor: Ee.types.rgba({
                r: 0,
                g: 0,
                b: 0,
                a: 1
            }),
            backOpacity: Ee.types.number(0, {
                range: [0, 1]
            }),
            textOpacity: Ee.types.number(0, {
                range: [0, 1]
            }),
            transform: Ee.types.number(0, {
                range: [-1, 1]
            }),
            cardLeft: Ee.types.compound({
                x: Ee.types.number(0, {
                    range: [-200, 200]
                }),
                y: Ee.types.number(0, {
                    range: [-300, 300]
                }),
                rotateX: Ee.types.number(0, {
                    range: [-360, 360]
                }),
                rotateY: Ee.types.number(0, {
                    range: [-360, 360]
                }),
                rotateZ: Ee.types.number(0, {
                    range: [-360, 360]
                })
            }),
            cardRight: Ee.types.compound({
                x: Ee.types.number(0, {
                    range: [-200, 200]
                }),
                y: Ee.types.number(0, {
                    range: [-300, 300]
                }),
                rotateX: Ee.types.number(0, {
                    range: [-360, 360]
                }),
                rotateY: Ee.types.number(0, {
                    range: [-360, 360]
                }),
                rotateZ: Ee.types.number(0, {
                    range: [-360, 360]
                })
            })
        }).onValuesChange(r => {
            this.backgroundColor = this.toHex(r.backgroundColor),
            this.backBackgroundColor = this.toHex(r.backBackgroundColor),
            this.backOpacity = r.backOpacity,
            this.opacity = r.opacity,
            this.textOpacity = r.textOpacity,
            this.transform = r.transform,
            this.cardLeft = r.cardLeft,
            this.cardRight = r.cardRight
        }
        , this.raf())
    }
}
  , V9 = {
    class: "dverso_card_wrap"
};
function $9(e, t, r, o, i, s) {
    const c = ts;
    return _e(),
    Oe(lt, null, [D("div", {
        class: "bg_impostor",
        style: rt({
            opacity: i.opacity,
            backgroundColor: i.backgroundColor,
            pointerEvents: i.opacity > 0 ? "auto" : "none"
        })
    }, null, 4), D("div", {
        class: "bg_impostor_back",
        style: rt({
            opacity: i.backOpacity,
            backgroundColor: i.backBackgroundColor,
            pointerEvents: "none"
        })
    }, null, 4), D("h1", {
        class: "cubes",
        style: rt({
            transform: `translateY(calc(-50% + ${i.transform * 100}px))`,
            pointerEvents: Math.abs(i.textOpacity < 1) ? "none" : "auto",
            opacity: i.textOpacity
        })
    }, [i.textOpacity > 0 ? (_e(),
    Vt(c, {
        key: 0,
        text: "creative studio specialized in immersive web design & development"
    })) : jt("", !0)], 4), D("div", V9, [D("div", {
        class: "dverso_card",
        style: rt({
            opacity: Math.abs(i.cardLeft.y) >= 200 ? 0 : 1,
            transform: `
            translate3d(${i.cardLeft.x}%,${i.cardLeft.y}%,0px) rotateZ(${i.cardLeft.rotateZ}deg) rotateX(${i.cardLeft.rotateX}deg) rotateY(${i.cardLeft.rotateY}deg)
            `
        })
    }, t[0] || (t[0] = [D("h1", null, "DEVELOPMENT", -1), D("div", {
        class: "we_know_how_to_do_these_things"
    }, [D("p", null, "Creative Coding"), D("p", null, "Web development"), D("p", null, [ht("THREEjs lovers"), D("sup", null, "TM")]), D("p", null, "E-commerce integrations"), D("p", null, "SEO optimizations"), D("p", null, "3D Asset Optimization")], -1)]), 4), D("div", {
        style: rt({
            opacity: Math.abs(i.cardLeft.y) >= 200 ? 0 : 1,
            transform: `
            translate3d(${i.cardRight.x}%,${i.cardRight.y}%,0px) rotateZ(${i.cardRight.rotateZ}deg)  rotateX(${i.cardRight.rotateX}deg) rotateY(${i.cardRight.rotateY}deg)
            `
        }),
        class: "dverso_card right"
    }, t[1] || (t[1] = [D("h1", null, "DESIGN", -1), D("div", {
        class: "we_know_how_to_do_these_things"
    }, [D("p", null, "Creative Direction"), D("p", null, "Brand Identity Design"), D("p", null, "Art Direction"), D("p", null, "UI/UX Design"), D("p", null, "3D Asset Creation")], -1)]), 4)])], 64)
}
const z9 = ir(F9, [["render", $9], ["__scopeId", "data-v-36b87c16"]])
  , vm = e => 1 / (1 + e + .48 * e * e + .235 * e * e * e);
function qo(e, t, r, o=.25, i=.01, s=1 / 0, c=vm, d=.001) {
    const h = "velocity_" + t;
    if (e.__damp === void 0 && (e.__damp = {}),
    e.__damp[h] === void 0 && (e.__damp[h] = 0),
    Math.abs(e[t] - r) <= d)
        return e[t] = r,
        !1;
    o = Math.max(1e-4, o);
    const _ = 2 / o
      , g = c(_ * i);
    let l = e[t] - r;
    const f = r
      , p = s * o;
    l = Math.min(Math.max(l, -p), p),
    r = e[t] - l;
    const y = (e.__damp[h] + _ * l) * i;
    e.__damp[h] = (e.__damp[h] - _ * y) * g;
    let w = r + (l + y) * g;
    return f - e[t] > 0 == w > f && (w = f,
    e.__damp[h] = (w - f) / i),
    e[t] = w,
    !0
}
function U9(e, t, r=.25, o=.01, i=1 / 0, s=vm, c=.001) {
    qo(e, "x", t.x, r, o, i, s, c),
    qo(e, "y", t.y, r, o, i, s, c)
}
let H0 = {
    rand_vect: function() {
        let e = Math.random() * 2 * Math.PI;
        return {
            x: Math.cos(e),
            y: Math.sin(e)
        }
    },
    dot_prod_grid: function(e, t, r, o) {
        let i, s = {
            x: e - r,
            y: t - o
        };
        return this.gradients[[r, o]] ? i = this.gradients[[r, o]] : (i = this.rand_vect(),
        this.gradients[[r, o]] = i),
        s.x * i.x + s.y * i.y
    },
    smootherstep: function(e) {
        return 6 * e ** 5 - 15 * e ** 4 + 10 * e ** 3
    },
    interp: function(e, t, r) {
        return t + this.smootherstep(e) * (r - t)
    },
    seed: function() {
        this.gradients = {},
        this.memory = {}
    },
    get: function(e, t) {
        if (this.memory.hasOwnProperty([e, t]))
            return this.memory[[e, t]];
        let r = Math.floor(e)
          , o = Math.floor(t)
          , i = this.dot_prod_grid(e, t, r, o)
          , s = this.dot_prod_grid(e, t, r + 1, o)
          , c = this.dot_prod_grid(e, t, r, o + 1)
          , d = this.dot_prod_grid(e, t, r + 1, o + 1)
          , h = this.interp(e - r, i, s)
          , _ = this.interp(e - r, c, d)
          , g = this.interp(t - o, h, _);
        return this.memory[[e, t]] = g,
        g
    }
}, xo, Of, wr, Rf = [], bt = 64, D0 = 2;
function q9(e) {
    if (H0.seed(),
    xo == null) {
        xo = e,
        Of = xo.getContext("2d"),
        wr = Of.createImageData(bt, bt),
        xo.width = bt,
        xo.height = bt;
        for (let t = 0; t < bt; t++) {
            Rf[t] = [];
            for (let r = 0; r < bt; r++)
                Rf[t][r] = H0.get(t / bt * D0, r / bt * D0)
        }
    }
}
function ym(e) {
    if (xo != null) {
        for (let t = 0; t < bt; t++)
            for (let r = 0; r < bt; r++)
                Rf[t][r] < e ? (wr.data[(r * bt + t) * 4] = 0,
                wr.data[(r * bt + t) * 4 + 1] = 0,
                wr.data[(r * bt + t) * 4 + 2] = 0,
                wr.data[(r * bt + t) * 4 + 3] = 255) : (wr.data[(r * bt + t) * 4] = 0,
                wr.data[(r * bt + t) * 4 + 1] = 0,
                wr.data[(r * bt + t) * 4 + 2] = 0,
                wr.data[(r * bt + t) * 4 + 3] = 0);
        Of.putImageData(wr, 0, 0)
    }
}
const K9 = {
    inject: ["sheet", "time", "raf", "projects"],
    data() {
        return {
            _time: 0,
            opacity: 0,
            pprojectEntrace: !1,
            pixelizationThreshold: -1,
            pixelatedMask: "",
            projectsScrollerTransform: 0,
            textOpacity: 0,
            pproject: null,
            transform: 0,
            maxWidth: 0
        }
    },
    methods: {
        mouseenter_(e) {
            $emit("content", e)
        },
        mouseleave_() {
            $emit("content", "")
        },
        mouseenter(e) {
            $emit("imageContent", "https://r2.dversostudio.io/dversostudio.io" + e.preview_gallery[0].path)
        },
        mouseleave() {
            $emit("imageContent", "")
        },
        pick(e) {
            e == null ? (this.pproject = e,
            this.mouseleave_()) : (this.pproject = e,
            this.$router.push("/" + e.slug + "/"))
        },
        open() {
            window.open(this.pproject.link)
        }
    },
    mounted() {
        document && (this.maxWidth = Math.max(window.innerWidth, window.innerHeight),
        window.addEventListener("resize", () => {
            this.maxWidth = Math.max(window.innerWidth, window.innerHeight)
        }
        ),
        $on("tick", r => {
            qo(this, "pixelizationThreshold", this.pprojectEntrace ? 1 : -1, .4, r / 1e3)
        }
        )),
        this.sheet().object("Projects", {
            textOpacity: Ee.types.number(0, {
                range: [0, 1]
            }),
            transform: Ee.types.number(0, {
                range: [-1, 1]
            }),
            projectsScrollerTransform: Ee.types.number(0, {
                range: [0, 100]
            })
        }).onValuesChange(r => {
            this.opacity = r.opacity,
            this.textOpacity = r.textOpacity,
            this.transform = r.transform,
            this.projectsScrollerTransform = r.projectsScrollerTransform
        }
        , this.raf())
    },
    watch: {
        "$route.path": {
            deep: !0,
            handler(e) {
                e == "/" ? (this.pprojectEntrace = !1,
                this.mouseleave_()) : (this.mouseleave_(),
                this.pprojectEntrace = !0)
            }
        },
        pixelizationThreshold(e) {
            ym(e)
        }
    }
}
  , W9 = {
    key: 1,
    class: "hideonmobile",
    width: "54",
    height: "54",
    viewBox: "0 0 54 54",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
}
  , G9 = {
    class: "projects"
}
  , X9 = ["onClick", "onMouseenter"]
  , J9 = {
    class: "hideonmobile"
}
  , Y9 = {
    class: "hideonmobile"
};
function Z9(e, t, r, o, i, s) {
    const c = ts
      , d = zP;
    return _e(),
    Oe("div", {
        style: rt({
            pointerEvents: Math.abs(i.textOpacity < 1) ? "none" : "auto",
            opacity: i.textOpacity,
            transform: `translateY(calc(-50% + ${i.transform * 100}px))`
        }),
        class: "wrap"
    }, [D("h1", null, [i.textOpacity > 0 && i.pixelizationThreshold < 0 ? (_e(),
    Vt(c, {
        key: 0,
        text: "LATEST PROJECTS"
    })) : jt("", !0), i.textOpacity > 0 && i.pixelizationThreshold < 0 ? (_e(),
    Oe("svg", W9, t[1] || (t[1] = [Yi('<rect y="36" width="9" height="9" fill="white" data-v-42d89c9c></rect><rect y="45" width="9" height="9" fill="white" data-v-42d89c9c></rect><rect x="9" y="45" width="9" height="9" fill="white" data-v-42d89c9c></rect><rect x="18" y="45" width="9" height="9" fill="white" data-v-42d89c9c></rect><rect y="27" width="9" height="9" fill="white" data-v-42d89c9c></rect><rect x="9" y="36" width="9" height="9" fill="white" data-v-42d89c9c></rect><rect x="18" y="27" width="9" height="9" fill="white" data-v-42d89c9c></rect><rect x="27" y="18" width="9" height="9" fill="white" data-v-42d89c9c></rect><rect x="36" y="9" width="9" height="9" fill="white" data-v-42d89c9c></rect><rect x="45" width="9" height="9" fill="white" data-v-42d89c9c></rect>', 10)]))) : jt("", !0)]), D("div", G9, [D("div", {
        class: "projects-scroller",
        style: rt({
            transform: `translateY(${-i.projectsScrollerTransform}%)`
        })
    }, [t[3] || (t[3] = D("br", null, null, -1)), t[4] || (t[4] = D("br", null, null, -1)), t[5] || (t[5] = D("br", null, null, -1)), t[6] || (t[6] = D("br", null, null, -1)), t[7] || (t[7] = D("br", null, null, -1)), t[8] || (t[8] = D("br", null, null, -1)), (_e(!0),
    Oe(lt, null, va(s.projects, h => (_e(),
    Oe("div", {
        class: "project",
        onClick: _ => s.pick(h),
        onMouseenter: _ => s.mouseenter(h),
        onMouseleave: t[0] || (t[0] = _ => s.mouseleave()),
        key: h.id
    }, [D("span", null, wi(h.name), 1), D("span", null, wi(h.kind), 1), D("span", J9, wi(h.year), 1), D("span", Y9, wi(h.link), 1), t[2] || (t[2] = D("span", {
        class: "hideonmobile"
    }, null, -1)), we(d, {
        class: "hideonmobile",
        href: "/" + h.slug + "/",
        "aria-label": h.name
    }, null, 8, ["href", "aria-label"])], 40, X9))), 128))], 4)])], 4)
}
const Q9 = ir(K9, [["render", Z9], ["__scopeId", "data-v-42d89c9c"]])
  , eA = {
    inject: ["sheet", "time", "raf"],
    data() {
        return {
            scale: 1,
            opacity: 0,
            textOpacity: 0,
            pixelizationThreshold: 0,
            perlinMask: "",
            transform: 0,
            maxWidth: 0,
            backgroundColor: "#000000"
        }
    },
    methods: {
        toHex(e) {
            const t = r => Math.round(r * 255).toString(16).padStart(2, "0");
            return "#" + t(e.r) + t(e.g) + t(e.b) + t(e.a)
        },
        openDverso() {
            this.scale = 4,
            setTimeout( () => {
                this.scale = 1
            }
            , 3e3),
            $emit("openDverso")
        },
        mouseenter(e) {
            $emit("content", e)
        },
        mouseleave() {
            $emit("content", "")
        },
        mouseenter_() {
            $emit("imageContent", "/video_landing.mp4")
        },
        mouseleave_() {
            $emit("imageContent", "")
        }
    },
    mounted() {
        document && (q9(this.$refs.canvas),
        this.maxWidth = Math.max(window.innerWidth, window.innerHeight),
        window.addEventListener("resize", () => {
            this.maxWidth = Math.max(window.innerWidth, window.innerHeight)
        }
        )),
        this.sheet().object("Metaverse section", {
            pixelizationThreshold: Ee.types.number(.5, {
                range: [-10, 5]
            }),
            backgroundColor: Ee.types.rgba({
                r: 0,
                g: 0,
                b: 0,
                a: 1
            }),
            opacity: Ee.types.number(0, {
                range: [0, 1]
            }),
            textOpacity: Ee.types.number(0, {
                range: [0, 1]
            }),
            transform: Ee.types.number(0, {
                range: [-1, 1]
            })
        }).onValuesChange(r => {
            this.backgroundColor = r.backgroundColor,
            this.opacity = r.opacity,
            this.textOpacity = r.textOpacity,
            this.transform = r.transform,
            this.pixelizationThreshold = r.pixelizationThreshold
        }
        , this.raf())
    },
    watch: {
        pixelizationThreshold(e) {
            this.perlinMask = ym(e)
        }
    }
}
  , tA = {
    class: "dverso_pixelization_impostor"
}
  , rA = {
    ref: "canvas",
    width: 64,
    height: 64
};
function nA(e, t, r, o, i, s) {
    return _e(),
    Oe(lt, null, [D("div", {
        class: "dverso_section",
        style: rt({
            opacity: i.textOpacity,
            pointerEvents: Math.abs(i.textOpacity) < .5 ? "none" : "auto",
            transform: `scale(${i.scale})`
        })
    }, [D("h1", {
        style: rt({
            transform: `translateY(calc(${i.transform * 100}px))`
        })
    }, t[5] || (t[5] = [ht(" CREATE & EXPLORE "), D("h2", null, [ht(" Create and explore"), D("br"), ht(" in our web-based"), D("br"), ht(" metaverse engine ")], -1)]), 4), D("div", {
        class: "dverso_portal_impostor",
        onMouseenter: t[0] || (t[0] = c => s.mouseenter_()),
        onMouseleave: t[1] || (t[1] = c => s.mouseleave_())
    }, null, 32)], 4), i.textOpacity ? (_e(),
    Oe("button", {
        key: 0,
        style: rt({
            opacity: i.textOpacity
        }),
        onMouseleave: t[2] || (t[2] = (...c) => s.mouseleave && s.mouseleave(...c)),
        onClick: t[3] || (t[3] = (...c) => s.openDverso && s.openDverso(...c)),
        onMouseenter: t[4] || (t[4] = c => s.mouseenter("Visit dverso.io, our metaverse")),
        class: "dverso_btn outline"
    }, "JOIN OUR METAVERSE", 36)) : jt("", !0), D("div", tA, [D("canvas", rA, null, 512)])], 64)
}
const oA = ir(eA, [["render", nA], ["__scopeId", "data-v-d778d23d"]])
  , iA = {};
function sA(e, t, r, o, i, s) {
    const c = L9
      , d = Ra
      , h = z9
      , _ = Q9
      , g = oA;
    return _e(),
    Oe(lt, null, [we(d, null, {
        default: nr( () => [we(c)]),
        _: 1
    }), we(h), we(_), we(g)], 64)
}
const aA = ir(iA, [["render", sA]])
  , lA = {
    props: ["enabled"],
    data() {
        return {
            active: !0
        }
    },
    mounted() {
        const e = this.$refs.canvas
          , t = e.getContext("2d");
        let r = 6
          , o = {
            amplitude: 0
        };
        e.width = 50,
        e.height = 50,
        t.strokeStyle = "#FCF6E7",
        t.lineWidth = 3;
        let i = s => {
            let c = s / 800
              , d = this.enabled ? r : 0;
            qo(o, "amplitude", d, .1),
            t.clearRect(0, 0, e.width, e.height),
            t.beginPath(),
            t.moveTo(0, e.height / 2);
            for (let h = 0; h < e.width; h++) {
                let _ = Math.sin((h / e.width * 2 + c) * Math.PI * 2) * o.amplitude + e.height / 2;
                t.lineTo(h, _)
            }
            t.stroke(),
            this.active && requestAnimationFrame(i)
        }
        ;
        requestAnimationFrame(i)
    },
    beforeUnmount() {
        this.active = !1
    }
}
  , cA = {
    ref: "canvas",
    height: "50",
    width: "50"
};
function uA(e, t, r, o, i, s) {
    return _e(),
    Oe("canvas", cA, null, 512)
}
const fA = ir(lA, [["render", uA]])
  , dA = {
    emits: ["close"],
    mounted() {
        window.REQUIRED_CODE_ERROR_MESSAGE = "Scegli un prefisso paese",
        window.LOCALE = "it",
        window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "Seems like something is wrong",
        window.REQUIRED_ERROR_MESSAGE = "Required field ",
        window.GENERIC_INVALID_MESSAGE = "Seems like something is wrong";
        let e = "https://www.google.com/recaptcha/api.js?render=6LcjMYcqAAAAACIjoEPUVIgcw7okklvwmRzGUU-X&hl=it"
          , t = document.createElement("script");
        t.src = e,
        document.body.appendChild(t),
        window.translation = {
            common: {
                selectedList: "{quantity} lista selezionata",
                selectedLists: "{quantity} liste selezionate"
            }
        },
        window.AUTOHIDE = !1;
        let r = document.createElement("script");
        r.src = "/sibforms.js",
        r.async = !0,
        document.body.appendChild(r)
    }
}
  , pA = {
    id: "sib-form-container",
    class: "sib-form-container"
}
  , hA = {
    id: "success-message",
    class: "sib-form-message-panel",
    style: {
        "font-size": "16px",
        "text-align": "left",
        color: "#085229",
        "background-color": "#e7faf0",
        "border-radius": "3px",
        "border-color": "#13ce66"
    }
}
  , gA = {
    class: "sib-form-message-panel__text sib-form-message-panel__text--center"
}
  , _A = {
    style: {
        display: "flex",
        "justify-content": "space-between",
        width: "100%"
    },
    class: "sib-form-message-panel__inner-text"
}
  , mA = {
    class: "sib-form-message-panel",
    style: {
        "font-size": "16px",
        display: "block !important",
        "text-align": "left",
        color: "black",
        "margin-top": "20px",
        "background-color": "#ffffff",
        "border-radius": "3px",
        "border-color": "#13ce66"
    }
}
  , vA = {
    class: "sib-form-message-panel__text sib-form-message-panel__text--center"
}
  , yA = {
    class: "sib-form-message-panel__inner-text"
};
function bA(e, t, r, o, i, s) {
    return _e(),
    Oe("div", {
        class: "dverso_contact_us",
        onWheel: t[4] || (t[4] = Ci( () => {}
        , ["stop"])),
        onMousedown: t[5] || (t[5] = Ci( () => {}
        , ["stop"])),
        onClick: t[6] || (t[6] = Ci(c => e.$emit("close"), ["stop"]))
    }, [D("div", {
        class: "sib-form",
        onClick: t[3] || (t[3] = Ci( () => {}
        , ["stop"])),
        style: {
            "text-align": "center"
        }
    }, [D("div", pA, [t[15] || (t[15] = Yi('<div id="error-message" class="sib-form-message-panel" style="font-size:16px;text-align:left;color:#661d1d;background-color:#ffeded;border-radius:3px;border-color:#ff4949;"><div class="sib-form-message-panel__text sib-form-message-panel__text--center"><svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon"><path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"></path></svg><span class="sib-form-message-panel__inner-text"> There&#39;s an error </span></div></div><div></div>', 2)), D("div", hA, [D("div", gA, [t[8] || (t[8] = D("svg", {
        viewBox: "0 0 512 512",
        class: "sib-icon sib-notification__icon"
    }, [D("path", {
        d: "M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"
    })], -1)), D("span", _A, [t[7] || (t[7] = ht(" Thank you, we will reach back soon <3 ")), D("a", {
        onClick: t[0] || (t[0] = c => e.$emit("close"))
    }, "[Close]")])])]), t[16] || (t[16] = D("div", null, null, -1)), t[17] || (t[17] = D("div", {
        id: "sib-container",
        class: "sib-container--large sib-container--vertical",
        style: {
            "text-align": "center",
            "background-color": "rgba(255,255,255,1)",
            "border-radius": "3px",
            "border-width": "1px",
            "border-color": "#C0CCD9",
            "border-style": "solid",
            direction: "ltr"
        }
    }, [D("form", {
        id: "sib-form",
        method: "POST",
        action: "https://05d079c2.sibforms.com/serve/MUIFAPUWuU72It7vAbht8WdHS7ulz1OsDQhk86Yc33pxoyqmREERK0X3p4hGjeX6qV5OsJShmHTH7ca8ksNduw9MZLBYa1BW5rfNobRTdcF-F-8eWYfJJz01ubwQ99I1jiP5ymD69-igcHjQDnKkmi2Sqi72pbj9IX90gkfe9zMle0o8p85nVgD460dO8O9wfQ0eljhBIoFyuSoQ",
        "data-type": "subscription"
    }, [D("div", {
        style: {
            padding: "8px 0"
        }
    }, [D("div", {
        class: "sib-form-block"
    }, [D("h2", null, "GET IN TOUCH")])]), D("div", {
        style: {
            padding: "8px 0"
        }
    }, [D("div", {
        class: "sib-input sib-form-block"
    }, [D("div", {
        class: "form__entry entry_block"
    }, [D("div", {
        class: "form__label-row"
    }, [D("div", {
        class: "entry__field"
    }, [D("input", {
        class: "input",
        maxlength: "200",
        type: "text",
        id: "NOME",
        name: "NOME",
        autocomplete: "off",
        placeholder: "Name",
        "data-required": "true",
        required: ""
    })])]), D("label", {
        class: "entry__error entry__error--primary",
        style: {
            "font-size": "16px",
            "text-align": "left",
            color: "#661d1d",
            "background-color": "#ffeded",
            "border-radius": "3px",
            "border-color": "#ff4949"
        }
    })])])]), D("div", {
        style: {
            padding: "8px 0"
        }
    }, [D("div", {
        class: "sib-input sib-form-block"
    }, [D("div", {
        class: "form__entry entry_block"
    }, [D("div", {
        class: "form__label-row"
    }, [D("div", {
        class: "entry__field"
    }, [D("input", {
        class: "input",
        type: "text",
        id: "EMAIL",
        name: "EMAIL",
        autocomplete: "off",
        placeholder: "Email",
        "data-required": "true",
        required: ""
    })])]), D("label", {
        class: "entry__error entry__error--primary",
        style: {
            "font-size": "16px",
            "text-align": "left",
            color: "#661d1d",
            "background-color": "#ffeded",
            "border-radius": "3px",
            "border-color": "#ff4949"
        }
    })])])]), D("div", {
        style: {
            padding: "8px 0"
        }
    }, [D("div", {
        class: "sib-input sib-form-block"
    }, [D("div", {
        class: "form__entry entry_block"
    }, [D("div", {
        class: "form__label-row"
    }, [D("div", {
        class: "entry__field"
    }, [D("textarea", {
        rows: "2",
        class: "input",
        maxlength: "500",
        id: "CONTACT_MESSAGE",
        name: "CONTACT_MESSAGE",
        autocomplete: "off",
        placeholder: "Message",
        "data-required": "true",
        required: ""
    })])]), D("label", {
        class: "entry__error entry__error--primary",
        style: {
            "font-size": "16px",
            "text-align": "left",
            color: "#661d1d",
            "background-color": "#ffeded",
            "border-radius": "3px",
            "border-color": "#ff4949"
        }
    })])])]), D("div", {
        style: {
            padding: "8px 0"
        }
    }, [D("div", {
        class: "g-recaptcha-v3",
        "data-sitekey": "6LcjMYcqAAAAACIjoEPUVIgcw7okklvwmRzGUU-X",
        style: {
            display: "none"
        }
    })]), D("div", {
        style: {
            padding: "8px 0"
        }
    }, [D("div", {
        class: "sib-form-block",
        style: {
            "text-align": "left"
        }
    }, [D("button", {
        class: "dverso_btn",
        style: {
            width: "100%"
        },
        form: "sib-form",
        type: "submit"
    }, [D("svg", {
        class: "icon clickable__icon progress-indicator__icon sib-hide-loader-icon",
        viewBox: "0 0 512 512"
    }, [D("path", {
        d: "M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"
    })]), ht(" Submit ")])])]), D("input", {
        type: "text",
        name: "email_address_check",
        value: "",
        class: "input--hidden"
    }), D("input", {
        type: "hidden",
        name: "locale",
        value: "it"
    })])], -1)), D("div", mA, [D("div", vA, [D("div", yA, [t[9] || (t[9] = D("label", null, "Email", -1)), t[10] || (t[10] = D("br", null, null, -1)), D("a", {
        href: "mailto:info@dverso.io",
        onClick: t[1] || (t[1] = (...c) => e.copyEmail && e.copyEmail(...c))
    }, "INFO@DVERSO.IO"), t[11] || (t[11] = D("br", null, null, -1)), t[12] || (t[12] = D("br", null, null, -1)), t[13] || (t[13] = D("label", null, "Phone", -1)), t[14] || (t[14] = D("br", null, null, -1)), D("a", {
        href: "tel:+393921765722",
        onClick: t[2] || (t[2] = (...c) => e.copyPhone && e.copyPhone(...c))
    }, "+393921765722")])])])])])], 32)
}
const wA = ir(dA, [["render", bA]]);
var Bu = {};
/*!
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
var L0;
function TA() {
    return L0 || (L0 = 1,
    function(e) {
        (function() {
            var t = function() {
                this.init()
            };
            t.prototype = {
                init: function() {
                    var l = this || r;
                    return l._counter = 1e3,
                    l._html5AudioPool = [],
                    l.html5PoolSize = 10,
                    l._codecs = {},
                    l._howls = [],
                    l._muted = !1,
                    l._volume = 1,
                    l._canPlayEvent = "canplaythrough",
                    l._navigator = typeof window < "u" && window.navigator ? window.navigator : null,
                    l.masterGain = null,
                    l.noAudio = !1,
                    l.usingWebAudio = !0,
                    l.autoSuspend = !0,
                    l.ctx = null,
                    l.autoUnlock = !0,
                    l._setup(),
                    l
                },
                volume: function(l) {
                    var f = this || r;
                    if (l = parseFloat(l),
                    f.ctx || g(),
                    typeof l < "u" && l >= 0 && l <= 1) {
                        if (f._volume = l,
                        f._muted)
                            return f;
                        f.usingWebAudio && f.masterGain.gain.setValueAtTime(l, r.ctx.currentTime);
                        for (var p = 0; p < f._howls.length; p++)
                            if (!f._howls[p]._webAudio)
                                for (var y = f._howls[p]._getSoundIds(), w = 0; w < y.length; w++) {
                                    var x = f._howls[p]._soundById(y[w]);
                                    x && x._node && (x._node.volume = x._volume * l)
                                }
                        return f
                    }
                    return f._volume
                },
                mute: function(l) {
                    var f = this || r;
                    f.ctx || g(),
                    f._muted = l,
                    f.usingWebAudio && f.masterGain.gain.setValueAtTime(l ? 0 : f._volume, r.ctx.currentTime);
                    for (var p = 0; p < f._howls.length; p++)
                        if (!f._howls[p]._webAudio)
                            for (var y = f._howls[p]._getSoundIds(), w = 0; w < y.length; w++) {
                                var x = f._howls[p]._soundById(y[w]);
                                x && x._node && (x._node.muted = l ? !0 : x._muted)
                            }
                    return f
                },
                stop: function() {
                    for (var l = this || r, f = 0; f < l._howls.length; f++)
                        l._howls[f].stop();
                    return l
                },
                unload: function() {
                    for (var l = this || r, f = l._howls.length - 1; f >= 0; f--)
                        l._howls[f].unload();
                    return l.usingWebAudio && l.ctx && typeof l.ctx.close < "u" && (l.ctx.close(),
                    l.ctx = null,
                    g()),
                    l
                },
                codecs: function(l) {
                    return (this || r)._codecs[l.replace(/^x-/, "")]
                },
                _setup: function() {
                    var l = this || r;
                    if (l.state = l.ctx && l.ctx.state || "suspended",
                    l._autoSuspend(),
                    !l.usingWebAudio)
                        if (typeof Audio < "u")
                            try {
                                var f = new Audio;
                                typeof f.oncanplaythrough > "u" && (l._canPlayEvent = "canplay")
                            } catch {
                                l.noAudio = !0
                            }
                        else
                            l.noAudio = !0;
                    try {
                        var f = new Audio;
                        f.muted && (l.noAudio = !0)
                    } catch {}
                    return l.noAudio || l._setupCodecs(),
                    l
                },
                _setupCodecs: function() {
                    var l = this || r
                      , f = null;
                    try {
                        f = typeof Audio < "u" ? new Audio : null
                    } catch {
                        return l
                    }
                    if (!f || typeof f.canPlayType != "function")
                        return l;
                    var p = f.canPlayType("audio/mpeg;").replace(/^no$/, "")
                      , y = l._navigator ? l._navigator.userAgent : ""
                      , w = y.match(/OPR\/(\d+)/g)
                      , x = w && parseInt(w[0].split("/")[1], 10) < 33
                      , P = y.indexOf("Safari") !== -1 && y.indexOf("Chrome") === -1
                      , E = y.match(/Version\/(.*?) /)
                      , C = P && E && parseInt(E[1], 10) < 15;
                    return l._codecs = {
                        mp3: !!(!x && (p || f.canPlayType("audio/mp3;").replace(/^no$/, ""))),
                        mpeg: !!p,
                        opus: !!f.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                        ogg: !!f.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        oga: !!f.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        wav: !!(f.canPlayType('audio/wav; codecs="1"') || f.canPlayType("audio/wav")).replace(/^no$/, ""),
                        aac: !!f.canPlayType("audio/aac;").replace(/^no$/, ""),
                        caf: !!f.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                        m4a: !!(f.canPlayType("audio/x-m4a;") || f.canPlayType("audio/m4a;") || f.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        m4b: !!(f.canPlayType("audio/x-m4b;") || f.canPlayType("audio/m4b;") || f.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        mp4: !!(f.canPlayType("audio/x-mp4;") || f.canPlayType("audio/mp4;") || f.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        weba: !!(!C && f.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                        webm: !!(!C && f.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                        dolby: !!f.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                        flac: !!(f.canPlayType("audio/x-flac;") || f.canPlayType("audio/flac;")).replace(/^no$/, "")
                    },
                    l
                },
                _unlockAudio: function() {
                    var l = this || r;
                    if (!(l._audioUnlocked || !l.ctx)) {
                        l._audioUnlocked = !1,
                        l.autoUnlock = !1,
                        !l._mobileUnloaded && l.ctx.sampleRate !== 44100 && (l._mobileUnloaded = !0,
                        l.unload()),
                        l._scratchBuffer = l.ctx.createBuffer(1, 1, 22050);
                        var f = function(p) {
                            for (; l._html5AudioPool.length < l.html5PoolSize; )
                                try {
                                    var y = new Audio;
                                    y._unlocked = !0,
                                    l._releaseHtml5Audio(y)
                                } catch {
                                    l.noAudio = !0;
                                    break
                                }
                            for (var w = 0; w < l._howls.length; w++)
                                if (!l._howls[w]._webAudio)
                                    for (var x = l._howls[w]._getSoundIds(), P = 0; P < x.length; P++) {
                                        var E = l._howls[w]._soundById(x[P]);
                                        E && E._node && !E._node._unlocked && (E._node._unlocked = !0,
                                        E._node.load())
                                    }
                            l._autoResume();
                            var C = l.ctx.createBufferSource();
                            C.buffer = l._scratchBuffer,
                            C.connect(l.ctx.destination),
                            typeof C.start > "u" ? C.noteOn(0) : C.start(0),
                            typeof l.ctx.resume == "function" && l.ctx.resume(),
                            C.onended = function() {
                                C.disconnect(0),
                                l._audioUnlocked = !0,
                                document.removeEventListener("touchstart", f, !0),
                                document.removeEventListener("touchend", f, !0),
                                document.removeEventListener("click", f, !0),
                                document.removeEventListener("keydown", f, !0);
                                for (var S = 0; S < l._howls.length; S++)
                                    l._howls[S]._emit("unlock")
                            }
                        };
                        return document.addEventListener("touchstart", f, !0),
                        document.addEventListener("touchend", f, !0),
                        document.addEventListener("click", f, !0),
                        document.addEventListener("keydown", f, !0),
                        l
                    }
                },
                _obtainHtml5Audio: function() {
                    var l = this || r;
                    if (l._html5AudioPool.length)
                        return l._html5AudioPool.pop();
                    var f = new Audio().play();
                    return f && typeof Promise < "u" && (f instanceof Promise || typeof f.then == "function") && f.catch(function() {}),
                    new Audio
                },
                _releaseHtml5Audio: function(l) {
                    var f = this || r;
                    return l._unlocked && f._html5AudioPool.push(l),
                    f
                },
                _autoSuspend: function() {
                    var l = this;
                    if (!(!l.autoSuspend || !l.ctx || typeof l.ctx.suspend > "u" || !r.usingWebAudio)) {
                        for (var f = 0; f < l._howls.length; f++)
                            if (l._howls[f]._webAudio) {
                                for (var p = 0; p < l._howls[f]._sounds.length; p++)
                                    if (!l._howls[f]._sounds[p]._paused)
                                        return l
                            }
                        return l._suspendTimer && clearTimeout(l._suspendTimer),
                        l._suspendTimer = setTimeout(function() {
                            if (l.autoSuspend) {
                                l._suspendTimer = null,
                                l.state = "suspending";
                                var y = function() {
                                    l.state = "suspended",
                                    l._resumeAfterSuspend && (delete l._resumeAfterSuspend,
                                    l._autoResume())
                                };
                                l.ctx.suspend().then(y, y)
                            }
                        }, 3e4),
                        l
                    }
                },
                _autoResume: function() {
                    var l = this;
                    if (!(!l.ctx || typeof l.ctx.resume > "u" || !r.usingWebAudio))
                        return l.state === "running" && l.ctx.state !== "interrupted" && l._suspendTimer ? (clearTimeout(l._suspendTimer),
                        l._suspendTimer = null) : l.state === "suspended" || l.state === "running" && l.ctx.state === "interrupted" ? (l.ctx.resume().then(function() {
                            l.state = "running";
                            for (var f = 0; f < l._howls.length; f++)
                                l._howls[f]._emit("resume")
                        }),
                        l._suspendTimer && (clearTimeout(l._suspendTimer),
                        l._suspendTimer = null)) : l.state === "suspending" && (l._resumeAfterSuspend = !0),
                        l
                }
            };
            var r = new t
              , o = function(l) {
                var f = this;
                !l.src || l.src.length === 0 || f.init(l)
            };
            o.prototype = {
                init: function(l) {
                    var f = this;
                    return r.ctx || g(),
                    f._autoplay = l.autoplay || !1,
                    f._format = typeof l.format != "string" ? l.format : [l.format],
                    f._html5 = l.html5 || !1,
                    f._muted = l.mute || !1,
                    f._loop = l.loop || !1,
                    f._pool = l.pool || 5,
                    f._preload = typeof l.preload == "boolean" || l.preload === "metadata" ? l.preload : !0,
                    f._rate = l.rate || 1,
                    f._sprite = l.sprite || {},
                    f._src = typeof l.src != "string" ? l.src : [l.src],
                    f._volume = l.volume !== void 0 ? l.volume : 1,
                    f._xhr = {
                        method: l.xhr && l.xhr.method ? l.xhr.method : "GET",
                        headers: l.xhr && l.xhr.headers ? l.xhr.headers : null,
                        withCredentials: l.xhr && l.xhr.withCredentials ? l.xhr.withCredentials : !1
                    },
                    f._duration = 0,
                    f._state = "unloaded",
                    f._sounds = [],
                    f._endTimers = {},
                    f._queue = [],
                    f._playLock = !1,
                    f._onend = l.onend ? [{
                        fn: l.onend
                    }] : [],
                    f._onfade = l.onfade ? [{
                        fn: l.onfade
                    }] : [],
                    f._onload = l.onload ? [{
                        fn: l.onload
                    }] : [],
                    f._onloaderror = l.onloaderror ? [{
                        fn: l.onloaderror
                    }] : [],
                    f._onplayerror = l.onplayerror ? [{
                        fn: l.onplayerror
                    }] : [],
                    f._onpause = l.onpause ? [{
                        fn: l.onpause
                    }] : [],
                    f._onplay = l.onplay ? [{
                        fn: l.onplay
                    }] : [],
                    f._onstop = l.onstop ? [{
                        fn: l.onstop
                    }] : [],
                    f._onmute = l.onmute ? [{
                        fn: l.onmute
                    }] : [],
                    f._onvolume = l.onvolume ? [{
                        fn: l.onvolume
                    }] : [],
                    f._onrate = l.onrate ? [{
                        fn: l.onrate
                    }] : [],
                    f._onseek = l.onseek ? [{
                        fn: l.onseek
                    }] : [],
                    f._onunlock = l.onunlock ? [{
                        fn: l.onunlock
                    }] : [],
                    f._onresume = [],
                    f._webAudio = r.usingWebAudio && !f._html5,
                    typeof r.ctx < "u" && r.ctx && r.autoUnlock && r._unlockAudio(),
                    r._howls.push(f),
                    f._autoplay && f._queue.push({
                        event: "play",
                        action: function() {
                            f.play()
                        }
                    }),
                    f._preload && f._preload !== "none" && f.load(),
                    f
                },
                load: function() {
                    var l = this
                      , f = null;
                    if (r.noAudio) {
                        l._emit("loaderror", null, "No audio support.");
                        return
                    }
                    typeof l._src == "string" && (l._src = [l._src]);
                    for (var p = 0; p < l._src.length; p++) {
                        var y, w;
                        if (l._format && l._format[p])
                            y = l._format[p];
                        else {
                            if (w = l._src[p],
                            typeof w != "string") {
                                l._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                                continue
                            }
                            y = /^data:audio\/([^;,]+);/i.exec(w),
                            y || (y = /\.([^.]+)$/.exec(w.split("?", 1)[0])),
                            y && (y = y[1].toLowerCase())
                        }
                        if (y && r.codecs(y)) {
                            f = l._src[p];
                            break
                        }
                    }
                    if (!f) {
                        l._emit("loaderror", null, "No codec support for selected audio sources.");
                        return
                    }
                    return l._src = f,
                    l._state = "loading",
                    window.location.protocol === "https:" && f.slice(0, 5) === "http:" && (l._html5 = !0,
                    l._webAudio = !1),
                    new i(l),
                    l._webAudio && c(l),
                    l
                },
                play: function(l, f) {
                    var p = this
                      , y = null;
                    if (typeof l == "number")
                        y = l,
                        l = null;
                    else {
                        if (typeof l == "string" && p._state === "loaded" && !p._sprite[l])
                            return null;
                        if (typeof l > "u" && (l = "__default",
                        !p._playLock)) {
                            for (var w = 0, x = 0; x < p._sounds.length; x++)
                                p._sounds[x]._paused && !p._sounds[x]._ended && (w++,
                                y = p._sounds[x]._id);
                            w === 1 ? l = null : y = null
                        }
                    }
                    var P = y ? p._soundById(y) : p._inactiveSound();
                    if (!P)
                        return null;
                    if (y && !l && (l = P._sprite || "__default"),
                    p._state !== "loaded") {
                        P._sprite = l,
                        P._ended = !1;
                        var E = P._id;
                        return p._queue.push({
                            event: "play",
                            action: function() {
                                p.play(E)
                            }
                        }),
                        E
                    }
                    if (y && !P._paused)
                        return f || p._loadQueue("play"),
                        P._id;
                    p._webAudio && r._autoResume();
                    var C = Math.max(0, P._seek > 0 ? P._seek : p._sprite[l][0] / 1e3)
                      , S = Math.max(0, (p._sprite[l][0] + p._sprite[l][1]) / 1e3 - C)
                      , M = S * 1e3 / Math.abs(P._rate)
                      , F = p._sprite[l][0] / 1e3
                      , W = (p._sprite[l][0] + p._sprite[l][1]) / 1e3;
                    P._sprite = l,
                    P._ended = !1;
                    var Q = function() {
                        P._paused = !1,
                        P._seek = C,
                        P._start = F,
                        P._stop = W,
                        P._loop = !!(P._loop || p._sprite[l][2])
                    };
                    if (C >= W) {
                        p._ended(P);
                        return
                    }
                    var $ = P._node;
                    if (p._webAudio) {
                        var G = function() {
                            p._playLock = !1,
                            Q(),
                            p._refreshBuffer(P);
                            var ve = P._muted || p._muted ? 0 : P._volume;
                            $.gain.setValueAtTime(ve, r.ctx.currentTime),
                            P._playStart = r.ctx.currentTime,
                            typeof $.bufferSource.start > "u" ? P._loop ? $.bufferSource.noteGrainOn(0, C, 86400) : $.bufferSource.noteGrainOn(0, C, S) : P._loop ? $.bufferSource.start(0, C, 86400) : $.bufferSource.start(0, C, S),
                            M !== 1 / 0 && (p._endTimers[P._id] = setTimeout(p._ended.bind(p, P), M)),
                            f || setTimeout(function() {
                                p._emit("play", P._id),
                                p._loadQueue()
                            }, 0)
                        };
                        r.state === "running" && r.ctx.state !== "interrupted" ? G() : (p._playLock = !0,
                        p.once("resume", G),
                        p._clearTimer(P._id))
                    } else {
                        var ae = function() {
                            $.currentTime = C,
                            $.muted = P._muted || p._muted || r._muted || $.muted,
                            $.volume = P._volume * r.volume(),
                            $.playbackRate = P._rate;
                            try {
                                var ve = $.play();
                                if (ve && typeof Promise < "u" && (ve instanceof Promise || typeof ve.then == "function") ? (p._playLock = !0,
                                Q(),
                                ve.then(function() {
                                    p._playLock = !1,
                                    $._unlocked = !0,
                                    f ? p._loadQueue() : p._emit("play", P._id)
                                }).catch(function() {
                                    p._playLock = !1,
                                    p._emit("playerror", P._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),
                                    P._ended = !0,
                                    P._paused = !0
                                })) : f || (p._playLock = !1,
                                Q(),
                                p._emit("play", P._id)),
                                $.playbackRate = P._rate,
                                $.paused) {
                                    p._emit("playerror", P._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                    return
                                }
                                l !== "__default" || P._loop ? p._endTimers[P._id] = setTimeout(p._ended.bind(p, P), M) : (p._endTimers[P._id] = function() {
                                    p._ended(P),
                                    $.removeEventListener("ended", p._endTimers[P._id], !1)
                                }
                                ,
                                $.addEventListener("ended", p._endTimers[P._id], !1))
                            } catch (Pe) {
                                p._emit("playerror", P._id, Pe)
                            }
                        };
                        $.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && ($.src = p._src,
                        $.load());
                        var U = window && window.ejecta || !$.readyState && r._navigator.isCocoonJS;
                        if ($.readyState >= 3 || U)
                            ae();
                        else {
                            p._playLock = !0,
                            p._state = "loading";
                            var ce = function() {
                                p._state = "loaded",
                                ae(),
                                $.removeEventListener(r._canPlayEvent, ce, !1)
                            };
                            $.addEventListener(r._canPlayEvent, ce, !1),
                            p._clearTimer(P._id)
                        }
                    }
                    return P._id
                },
                pause: function(l) {
                    var f = this;
                    if (f._state !== "loaded" || f._playLock)
                        return f._queue.push({
                            event: "pause",
                            action: function() {
                                f.pause(l)
                            }
                        }),
                        f;
                    for (var p = f._getSoundIds(l), y = 0; y < p.length; y++) {
                        f._clearTimer(p[y]);
                        var w = f._soundById(p[y]);
                        if (w && !w._paused && (w._seek = f.seek(p[y]),
                        w._rateSeek = 0,
                        w._paused = !0,
                        f._stopFade(p[y]),
                        w._node))
                            if (f._webAudio) {
                                if (!w._node.bufferSource)
                                    continue;
                                typeof w._node.bufferSource.stop > "u" ? w._node.bufferSource.noteOff(0) : w._node.bufferSource.stop(0),
                                f._cleanBuffer(w._node)
                            } else
                                (!isNaN(w._node.duration) || w._node.duration === 1 / 0) && w._node.pause();
                        arguments[1] || f._emit("pause", w ? w._id : null)
                    }
                    return f
                },
                stop: function(l, f) {
                    var p = this;
                    if (p._state !== "loaded" || p._playLock)
                        return p._queue.push({
                            event: "stop",
                            action: function() {
                                p.stop(l)
                            }
                        }),
                        p;
                    for (var y = p._getSoundIds(l), w = 0; w < y.length; w++) {
                        p._clearTimer(y[w]);
                        var x = p._soundById(y[w]);
                        x && (x._seek = x._start || 0,
                        x._rateSeek = 0,
                        x._paused = !0,
                        x._ended = !0,
                        p._stopFade(y[w]),
                        x._node && (p._webAudio ? x._node.bufferSource && (typeof x._node.bufferSource.stop > "u" ? x._node.bufferSource.noteOff(0) : x._node.bufferSource.stop(0),
                        p._cleanBuffer(x._node)) : (!isNaN(x._node.duration) || x._node.duration === 1 / 0) && (x._node.currentTime = x._start || 0,
                        x._node.pause(),
                        x._node.duration === 1 / 0 && p._clearSound(x._node))),
                        f || p._emit("stop", x._id))
                    }
                    return p
                },
                mute: function(l, f) {
                    var p = this;
                    if (p._state !== "loaded" || p._playLock)
                        return p._queue.push({
                            event: "mute",
                            action: function() {
                                p.mute(l, f)
                            }
                        }),
                        p;
                    if (typeof f > "u")
                        if (typeof l == "boolean")
                            p._muted = l;
                        else
                            return p._muted;
                    for (var y = p._getSoundIds(f), w = 0; w < y.length; w++) {
                        var x = p._soundById(y[w]);
                        x && (x._muted = l,
                        x._interval && p._stopFade(x._id),
                        p._webAudio && x._node ? x._node.gain.setValueAtTime(l ? 0 : x._volume, r.ctx.currentTime) : x._node && (x._node.muted = r._muted ? !0 : l),
                        p._emit("mute", x._id))
                    }
                    return p
                },
                volume: function() {
                    var l = this, f = arguments, p, y;
                    if (f.length === 0)
                        return l._volume;
                    if (f.length === 1 || f.length === 2 && typeof f[1] > "u") {
                        var w = l._getSoundIds()
                          , x = w.indexOf(f[0]);
                        x >= 0 ? y = parseInt(f[0], 10) : p = parseFloat(f[0])
                    } else
                        f.length >= 2 && (p = parseFloat(f[0]),
                        y = parseInt(f[1], 10));
                    var P;
                    if (typeof p < "u" && p >= 0 && p <= 1) {
                        if (l._state !== "loaded" || l._playLock)
                            return l._queue.push({
                                event: "volume",
                                action: function() {
                                    l.volume.apply(l, f)
                                }
                            }),
                            l;
                        typeof y > "u" && (l._volume = p),
                        y = l._getSoundIds(y);
                        for (var E = 0; E < y.length; E++)
                            P = l._soundById(y[E]),
                            P && (P._volume = p,
                            f[2] || l._stopFade(y[E]),
                            l._webAudio && P._node && !P._muted ? P._node.gain.setValueAtTime(p, r.ctx.currentTime) : P._node && !P._muted && (P._node.volume = p * r.volume()),
                            l._emit("volume", P._id))
                    } else
                        return P = y ? l._soundById(y) : l._sounds[0],
                        P ? P._volume : 0;
                    return l
                },
                fade: function(l, f, p, y) {
                    var w = this;
                    if (w._state !== "loaded" || w._playLock)
                        return w._queue.push({
                            event: "fade",
                            action: function() {
                                w.fade(l, f, p, y)
                            }
                        }),
                        w;
                    l = Math.min(Math.max(0, parseFloat(l)), 1),
                    f = Math.min(Math.max(0, parseFloat(f)), 1),
                    p = parseFloat(p),
                    w.volume(l, y);
                    for (var x = w._getSoundIds(y), P = 0; P < x.length; P++) {
                        var E = w._soundById(x[P]);
                        if (E) {
                            if (y || w._stopFade(x[P]),
                            w._webAudio && !E._muted) {
                                var C = r.ctx.currentTime
                                  , S = C + p / 1e3;
                                E._volume = l,
                                E._node.gain.setValueAtTime(l, C),
                                E._node.gain.linearRampToValueAtTime(f, S)
                            }
                            w._startFadeInterval(E, l, f, p, x[P], typeof y > "u")
                        }
                    }
                    return w
                },
                _startFadeInterval: function(l, f, p, y, w, x) {
                    var P = this
                      , E = f
                      , C = p - f
                      , S = Math.abs(C / .01)
                      , M = Math.max(4, S > 0 ? y / S : y)
                      , F = Date.now();
                    l._fadeTo = p,
                    l._interval = setInterval(function() {
                        var W = (Date.now() - F) / y;
                        F = Date.now(),
                        E += C * W,
                        E = Math.round(E * 100) / 100,
                        C < 0 ? E = Math.max(p, E) : E = Math.min(p, E),
                        P._webAudio ? l._volume = E : P.volume(E, l._id, !0),
                        x && (P._volume = E),
                        (p < f && E <= p || p > f && E >= p) && (clearInterval(l._interval),
                        l._interval = null,
                        l._fadeTo = null,
                        P.volume(p, l._id),
                        P._emit("fade", l._id))
                    }, M)
                },
                _stopFade: function(l) {
                    var f = this
                      , p = f._soundById(l);
                    return p && p._interval && (f._webAudio && p._node.gain.cancelScheduledValues(r.ctx.currentTime),
                    clearInterval(p._interval),
                    p._interval = null,
                    f.volume(p._fadeTo, l),
                    p._fadeTo = null,
                    f._emit("fade", l)),
                    f
                },
                loop: function() {
                    var l = this, f = arguments, p, y, w;
                    if (f.length === 0)
                        return l._loop;
                    if (f.length === 1)
                        if (typeof f[0] == "boolean")
                            p = f[0],
                            l._loop = p;
                        else
                            return w = l._soundById(parseInt(f[0], 10)),
                            w ? w._loop : !1;
                    else
                        f.length === 2 && (p = f[0],
                        y = parseInt(f[1], 10));
                    for (var x = l._getSoundIds(y), P = 0; P < x.length; P++)
                        w = l._soundById(x[P]),
                        w && (w._loop = p,
                        l._webAudio && w._node && w._node.bufferSource && (w._node.bufferSource.loop = p,
                        p && (w._node.bufferSource.loopStart = w._start || 0,
                        w._node.bufferSource.loopEnd = w._stop,
                        l.playing(x[P]) && (l.pause(x[P], !0),
                        l.play(x[P], !0)))));
                    return l
                },
                rate: function() {
                    var l = this, f = arguments, p, y;
                    if (f.length === 0)
                        y = l._sounds[0]._id;
                    else if (f.length === 1) {
                        var w = l._getSoundIds()
                          , x = w.indexOf(f[0]);
                        x >= 0 ? y = parseInt(f[0], 10) : p = parseFloat(f[0])
                    } else
                        f.length === 2 && (p = parseFloat(f[0]),
                        y = parseInt(f[1], 10));
                    var P;
                    if (typeof p == "number") {
                        if (l._state !== "loaded" || l._playLock)
                            return l._queue.push({
                                event: "rate",
                                action: function() {
                                    l.rate.apply(l, f)
                                }
                            }),
                            l;
                        typeof y > "u" && (l._rate = p),
                        y = l._getSoundIds(y);
                        for (var E = 0; E < y.length; E++)
                            if (P = l._soundById(y[E]),
                            P) {
                                l.playing(y[E]) && (P._rateSeek = l.seek(y[E]),
                                P._playStart = l._webAudio ? r.ctx.currentTime : P._playStart),
                                P._rate = p,
                                l._webAudio && P._node && P._node.bufferSource ? P._node.bufferSource.playbackRate.setValueAtTime(p, r.ctx.currentTime) : P._node && (P._node.playbackRate = p);
                                var C = l.seek(y[E])
                                  , S = (l._sprite[P._sprite][0] + l._sprite[P._sprite][1]) / 1e3 - C
                                  , M = S * 1e3 / Math.abs(P._rate);
                                (l._endTimers[y[E]] || !P._paused) && (l._clearTimer(y[E]),
                                l._endTimers[y[E]] = setTimeout(l._ended.bind(l, P), M)),
                                l._emit("rate", P._id)
                            }
                    } else
                        return P = l._soundById(y),
                        P ? P._rate : l._rate;
                    return l
                },
                seek: function() {
                    var l = this, f = arguments, p, y;
                    if (f.length === 0)
                        l._sounds.length && (y = l._sounds[0]._id);
                    else if (f.length === 1) {
                        var w = l._getSoundIds()
                          , x = w.indexOf(f[0]);
                        x >= 0 ? y = parseInt(f[0], 10) : l._sounds.length && (y = l._sounds[0]._id,
                        p = parseFloat(f[0]))
                    } else
                        f.length === 2 && (p = parseFloat(f[0]),
                        y = parseInt(f[1], 10));
                    if (typeof y > "u")
                        return 0;
                    if (typeof p == "number" && (l._state !== "loaded" || l._playLock))
                        return l._queue.push({
                            event: "seek",
                            action: function() {
                                l.seek.apply(l, f)
                            }
                        }),
                        l;
                    var P = l._soundById(y);
                    if (P)
                        if (typeof p == "number" && p >= 0) {
                            var E = l.playing(y);
                            E && l.pause(y, !0),
                            P._seek = p,
                            P._ended = !1,
                            l._clearTimer(y),
                            !l._webAudio && P._node && !isNaN(P._node.duration) && (P._node.currentTime = p);
                            var C = function() {
                                E && l.play(y, !0),
                                l._emit("seek", y)
                            };
                            if (E && !l._webAudio) {
                                var S = function() {
                                    l._playLock ? setTimeout(S, 0) : C()
                                };
                                setTimeout(S, 0)
                            } else
                                C()
                        } else if (l._webAudio) {
                            var M = l.playing(y) ? r.ctx.currentTime - P._playStart : 0
                              , F = P._rateSeek ? P._rateSeek - P._seek : 0;
                            return P._seek + (F + M * Math.abs(P._rate))
                        } else
                            return P._node.currentTime;
                    return l
                },
                playing: function(l) {
                    var f = this;
                    if (typeof l == "number") {
                        var p = f._soundById(l);
                        return p ? !p._paused : !1
                    }
                    for (var y = 0; y < f._sounds.length; y++)
                        if (!f._sounds[y]._paused)
                            return !0;
                    return !1
                },
                duration: function(l) {
                    var f = this
                      , p = f._duration
                      , y = f._soundById(l);
                    return y && (p = f._sprite[y._sprite][1] / 1e3),
                    p
                },
                state: function() {
                    return this._state
                },
                unload: function() {
                    for (var l = this, f = l._sounds, p = 0; p < f.length; p++)
                        f[p]._paused || l.stop(f[p]._id),
                        l._webAudio || (l._clearSound(f[p]._node),
                        f[p]._node.removeEventListener("error", f[p]._errorFn, !1),
                        f[p]._node.removeEventListener(r._canPlayEvent, f[p]._loadFn, !1),
                        f[p]._node.removeEventListener("ended", f[p]._endFn, !1),
                        r._releaseHtml5Audio(f[p]._node)),
                        delete f[p]._node,
                        l._clearTimer(f[p]._id);
                    var y = r._howls.indexOf(l);
                    y >= 0 && r._howls.splice(y, 1);
                    var w = !0;
                    for (p = 0; p < r._howls.length; p++)
                        if (r._howls[p]._src === l._src || l._src.indexOf(r._howls[p]._src) >= 0) {
                            w = !1;
                            break
                        }
                    return s && w && delete s[l._src],
                    r.noAudio = !1,
                    l._state = "unloaded",
                    l._sounds = [],
                    l = null,
                    null
                },
                on: function(l, f, p, y) {
                    var w = this
                      , x = w["_on" + l];
                    return typeof f == "function" && x.push(y ? {
                        id: p,
                        fn: f,
                        once: y
                    } : {
                        id: p,
                        fn: f
                    }),
                    w
                },
                off: function(l, f, p) {
                    var y = this
                      , w = y["_on" + l]
                      , x = 0;
                    if (typeof f == "number" && (p = f,
                    f = null),
                    f || p)
                        for (x = 0; x < w.length; x++) {
                            var P = p === w[x].id;
                            if (f === w[x].fn && P || !f && P) {
                                w.splice(x, 1);
                                break
                            }
                        }
                    else if (l)
                        y["_on" + l] = [];
                    else {
                        var E = Object.keys(y);
                        for (x = 0; x < E.length; x++)
                            E[x].indexOf("_on") === 0 && Array.isArray(y[E[x]]) && (y[E[x]] = [])
                    }
                    return y
                },
                once: function(l, f, p) {
                    var y = this;
                    return y.on(l, f, p, 1),
                    y
                },
                _emit: function(l, f, p) {
                    for (var y = this, w = y["_on" + l], x = w.length - 1; x >= 0; x--)
                        (!w[x].id || w[x].id === f || l === "load") && (setTimeout(function(P) {
                            P.call(this, f, p)
                        }
                        .bind(y, w[x].fn), 0),
                        w[x].once && y.off(l, w[x].fn, w[x].id));
                    return y._loadQueue(l),
                    y
                },
                _loadQueue: function(l) {
                    var f = this;
                    if (f._queue.length > 0) {
                        var p = f._queue[0];
                        p.event === l && (f._queue.shift(),
                        f._loadQueue()),
                        l || p.action()
                    }
                    return f
                },
                _ended: function(l) {
                    var f = this
                      , p = l._sprite;
                    if (!f._webAudio && l._node && !l._node.paused && !l._node.ended && l._node.currentTime < l._stop)
                        return setTimeout(f._ended.bind(f, l), 100),
                        f;
                    var y = !!(l._loop || f._sprite[p][2]);
                    if (f._emit("end", l._id),
                    !f._webAudio && y && f.stop(l._id, !0).play(l._id),
                    f._webAudio && y) {
                        f._emit("play", l._id),
                        l._seek = l._start || 0,
                        l._rateSeek = 0,
                        l._playStart = r.ctx.currentTime;
                        var w = (l._stop - l._start) * 1e3 / Math.abs(l._rate);
                        f._endTimers[l._id] = setTimeout(f._ended.bind(f, l), w)
                    }
                    return f._webAudio && !y && (l._paused = !0,
                    l._ended = !0,
                    l._seek = l._start || 0,
                    l._rateSeek = 0,
                    f._clearTimer(l._id),
                    f._cleanBuffer(l._node),
                    r._autoSuspend()),
                    !f._webAudio && !y && f.stop(l._id, !0),
                    f
                },
                _clearTimer: function(l) {
                    var f = this;
                    if (f._endTimers[l]) {
                        if (typeof f._endTimers[l] != "function")
                            clearTimeout(f._endTimers[l]);
                        else {
                            var p = f._soundById(l);
                            p && p._node && p._node.removeEventListener("ended", f._endTimers[l], !1)
                        }
                        delete f._endTimers[l]
                    }
                    return f
                },
                _soundById: function(l) {
                    for (var f = this, p = 0; p < f._sounds.length; p++)
                        if (l === f._sounds[p]._id)
                            return f._sounds[p];
                    return null
                },
                _inactiveSound: function() {
                    var l = this;
                    l._drain();
                    for (var f = 0; f < l._sounds.length; f++)
                        if (l._sounds[f]._ended)
                            return l._sounds[f].reset();
                    return new i(l)
                },
                _drain: function() {
                    var l = this
                      , f = l._pool
                      , p = 0
                      , y = 0;
                    if (!(l._sounds.length < f)) {
                        for (y = 0; y < l._sounds.length; y++)
                            l._sounds[y]._ended && p++;
                        for (y = l._sounds.length - 1; y >= 0; y--) {
                            if (p <= f)
                                return;
                            l._sounds[y]._ended && (l._webAudio && l._sounds[y]._node && l._sounds[y]._node.disconnect(0),
                            l._sounds.splice(y, 1),
                            p--)
                        }
                    }
                },
                _getSoundIds: function(l) {
                    var f = this;
                    if (typeof l > "u") {
                        for (var p = [], y = 0; y < f._sounds.length; y++)
                            p.push(f._sounds[y]._id);
                        return p
                    } else
                        return [l]
                },
                _refreshBuffer: function(l) {
                    var f = this;
                    return l._node.bufferSource = r.ctx.createBufferSource(),
                    l._node.bufferSource.buffer = s[f._src],
                    l._panner ? l._node.bufferSource.connect(l._panner) : l._node.bufferSource.connect(l._node),
                    l._node.bufferSource.loop = l._loop,
                    l._loop && (l._node.bufferSource.loopStart = l._start || 0,
                    l._node.bufferSource.loopEnd = l._stop || 0),
                    l._node.bufferSource.playbackRate.setValueAtTime(l._rate, r.ctx.currentTime),
                    f
                },
                _cleanBuffer: function(l) {
                    var f = this
                      , p = r._navigator && r._navigator.vendor.indexOf("Apple") >= 0;
                    if (!l.bufferSource)
                        return f;
                    if (r._scratchBuffer && l.bufferSource && (l.bufferSource.onended = null,
                    l.bufferSource.disconnect(0),
                    p))
                        try {
                            l.bufferSource.buffer = r._scratchBuffer
                        } catch {}
                    return l.bufferSource = null,
                    f
                },
                _clearSound: function(l) {
                    var f = /MSIE |Trident\//.test(r._navigator && r._navigator.userAgent);
                    f || (l.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")
                }
            };
            var i = function(l) {
                this._parent = l,
                this.init()
            };
            i.prototype = {
                init: function() {
                    var l = this
                      , f = l._parent;
                    return l._muted = f._muted,
                    l._loop = f._loop,
                    l._volume = f._volume,
                    l._rate = f._rate,
                    l._seek = 0,
                    l._paused = !0,
                    l._ended = !0,
                    l._sprite = "__default",
                    l._id = ++r._counter,
                    f._sounds.push(l),
                    l.create(),
                    l
                },
                create: function() {
                    var l = this
                      , f = l._parent
                      , p = r._muted || l._muted || l._parent._muted ? 0 : l._volume;
                    return f._webAudio ? (l._node = typeof r.ctx.createGain > "u" ? r.ctx.createGainNode() : r.ctx.createGain(),
                    l._node.gain.setValueAtTime(p, r.ctx.currentTime),
                    l._node.paused = !0,
                    l._node.connect(r.masterGain)) : r.noAudio || (l._node = r._obtainHtml5Audio(),
                    l._errorFn = l._errorListener.bind(l),
                    l._node.addEventListener("error", l._errorFn, !1),
                    l._loadFn = l._loadListener.bind(l),
                    l._node.addEventListener(r._canPlayEvent, l._loadFn, !1),
                    l._endFn = l._endListener.bind(l),
                    l._node.addEventListener("ended", l._endFn, !1),
                    l._node.src = f._src,
                    l._node.preload = f._preload === !0 ? "auto" : f._preload,
                    l._node.volume = p * r.volume(),
                    l._node.load()),
                    l
                },
                reset: function() {
                    var l = this
                      , f = l._parent;
                    return l._muted = f._muted,
                    l._loop = f._loop,
                    l._volume = f._volume,
                    l._rate = f._rate,
                    l._seek = 0,
                    l._rateSeek = 0,
                    l._paused = !0,
                    l._ended = !0,
                    l._sprite = "__default",
                    l._id = ++r._counter,
                    l
                },
                _errorListener: function() {
                    var l = this;
                    l._parent._emit("loaderror", l._id, l._node.error ? l._node.error.code : 0),
                    l._node.removeEventListener("error", l._errorFn, !1)
                },
                _loadListener: function() {
                    var l = this
                      , f = l._parent;
                    f._duration = Math.ceil(l._node.duration * 10) / 10,
                    Object.keys(f._sprite).length === 0 && (f._sprite = {
                        __default: [0, f._duration * 1e3]
                    }),
                    f._state !== "loaded" && (f._state = "loaded",
                    f._emit("load"),
                    f._loadQueue()),
                    l._node.removeEventListener(r._canPlayEvent, l._loadFn, !1)
                },
                _endListener: function() {
                    var l = this
                      , f = l._parent;
                    f._duration === 1 / 0 && (f._duration = Math.ceil(l._node.duration * 10) / 10,
                    f._sprite.__default[1] === 1 / 0 && (f._sprite.__default[1] = f._duration * 1e3),
                    f._ended(l)),
                    l._node.removeEventListener("ended", l._endFn, !1)
                }
            };
            var s = {}
              , c = function(l) {
                var f = l._src;
                if (s[f]) {
                    l._duration = s[f].duration,
                    _(l);
                    return
                }
                if (/^data:[^;]+;base64,/.test(f)) {
                    for (var p = atob(f.split(",")[1]), y = new Uint8Array(p.length), w = 0; w < p.length; ++w)
                        y[w] = p.charCodeAt(w);
                    h(y.buffer, l)
                } else {
                    var x = new XMLHttpRequest;
                    x.open(l._xhr.method, f, !0),
                    x.withCredentials = l._xhr.withCredentials,
                    x.responseType = "arraybuffer",
                    l._xhr.headers && Object.keys(l._xhr.headers).forEach(function(P) {
                        x.setRequestHeader(P, l._xhr.headers[P])
                    }),
                    x.onload = function() {
                        var P = (x.status + "")[0];
                        if (P !== "0" && P !== "2" && P !== "3") {
                            l._emit("loaderror", null, "Failed loading audio file with status: " + x.status + ".");
                            return
                        }
                        h(x.response, l)
                    }
                    ,
                    x.onerror = function() {
                        l._webAudio && (l._html5 = !0,
                        l._webAudio = !1,
                        l._sounds = [],
                        delete s[f],
                        l.load())
                    }
                    ,
                    d(x)
                }
            }
              , d = function(l) {
                try {
                    l.send()
                } catch {
                    l.onerror()
                }
            }
              , h = function(l, f) {
                var p = function() {
                    f._emit("loaderror", null, "Decoding audio data failed.")
                }
                  , y = function(w) {
                    w && f._sounds.length > 0 ? (s[f._src] = w,
                    _(f, w)) : p()
                };
                typeof Promise < "u" && r.ctx.decodeAudioData.length === 1 ? r.ctx.decodeAudioData(l).then(y).catch(p) : r.ctx.decodeAudioData(l, y, p)
            }
              , _ = function(l, f) {
                f && !l._duration && (l._duration = f.duration),
                Object.keys(l._sprite).length === 0 && (l._sprite = {
                    __default: [0, l._duration * 1e3]
                }),
                l._state !== "loaded" && (l._state = "loaded",
                l._emit("load"),
                l._loadQueue())
            }
              , g = function() {
                if (r.usingWebAudio) {
                    try {
                        typeof AudioContext < "u" ? r.ctx = new AudioContext : typeof webkitAudioContext < "u" ? r.ctx = new webkitAudioContext : r.usingWebAudio = !1
                    } catch {
                        r.usingWebAudio = !1
                    }
                    r.ctx || (r.usingWebAudio = !1);
                    var l = /iP(hone|od|ad)/.test(r._navigator && r._navigator.platform)
                      , f = r._navigator && r._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
                      , p = f ? parseInt(f[1], 10) : null;
                    if (l && p && p < 9) {
                        var y = /safari/.test(r._navigator && r._navigator.userAgent.toLowerCase());
                        r._navigator && !y && (r.usingWebAudio = !1)
                    }
                    r.usingWebAudio && (r.masterGain = typeof r.ctx.createGain > "u" ? r.ctx.createGainNode() : r.ctx.createGain(),
                    r.masterGain.gain.setValueAtTime(r._muted ? 0 : r._volume, r.ctx.currentTime),
                    r.masterGain.connect(r.ctx.destination)),
                    r._setup()
                }
            };
            e.Howler = r,
            e.Howl = o,
            typeof Ft < "u" ? (Ft.HowlerGlobal = t,
            Ft.Howler = r,
            Ft.Howl = o,
            Ft.Sound = i) : typeof window < "u" && (window.HowlerGlobal = t,
            window.Howler = r,
            window.Howl = o,
            window.Sound = i)
        }
        )();
        /*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
        (function() {
            HowlerGlobal.prototype._pos = [0, 0, 0],
            HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0],
            HowlerGlobal.prototype.stereo = function(r) {
                var o = this;
                if (!o.ctx || !o.ctx.listener)
                    return o;
                for (var i = o._howls.length - 1; i >= 0; i--)
                    o._howls[i].stereo(r);
                return o
            }
            ,
            HowlerGlobal.prototype.pos = function(r, o, i) {
                var s = this;
                if (!s.ctx || !s.ctx.listener)
                    return s;
                if (o = typeof o != "number" ? s._pos[1] : o,
                i = typeof i != "number" ? s._pos[2] : i,
                typeof r == "number")
                    s._pos = [r, o, i],
                    typeof s.ctx.listener.positionX < "u" ? (s.ctx.listener.positionX.setTargetAtTime(s._pos[0], Howler.ctx.currentTime, .1),
                    s.ctx.listener.positionY.setTargetAtTime(s._pos[1], Howler.ctx.currentTime, .1),
                    s.ctx.listener.positionZ.setTargetAtTime(s._pos[2], Howler.ctx.currentTime, .1)) : s.ctx.listener.setPosition(s._pos[0], s._pos[1], s._pos[2]);
                else
                    return s._pos;
                return s
            }
            ,
            HowlerGlobal.prototype.orientation = function(r, o, i, s, c, d) {
                var h = this;
                if (!h.ctx || !h.ctx.listener)
                    return h;
                var _ = h._orientation;
                if (o = typeof o != "number" ? _[1] : o,
                i = typeof i != "number" ? _[2] : i,
                s = typeof s != "number" ? _[3] : s,
                c = typeof c != "number" ? _[4] : c,
                d = typeof d != "number" ? _[5] : d,
                typeof r == "number")
                    h._orientation = [r, o, i, s, c, d],
                    typeof h.ctx.listener.forwardX < "u" ? (h.ctx.listener.forwardX.setTargetAtTime(r, Howler.ctx.currentTime, .1),
                    h.ctx.listener.forwardY.setTargetAtTime(o, Howler.ctx.currentTime, .1),
                    h.ctx.listener.forwardZ.setTargetAtTime(i, Howler.ctx.currentTime, .1),
                    h.ctx.listener.upX.setTargetAtTime(s, Howler.ctx.currentTime, .1),
                    h.ctx.listener.upY.setTargetAtTime(c, Howler.ctx.currentTime, .1),
                    h.ctx.listener.upZ.setTargetAtTime(d, Howler.ctx.currentTime, .1)) : h.ctx.listener.setOrientation(r, o, i, s, c, d);
                else
                    return _;
                return h
            }
            ,
            Howl.prototype.init = function(r) {
                return function(o) {
                    var i = this;
                    return i._orientation = o.orientation || [1, 0, 0],
                    i._stereo = o.stereo || null,
                    i._pos = o.pos || null,
                    i._pannerAttr = {
                        coneInnerAngle: typeof o.coneInnerAngle < "u" ? o.coneInnerAngle : 360,
                        coneOuterAngle: typeof o.coneOuterAngle < "u" ? o.coneOuterAngle : 360,
                        coneOuterGain: typeof o.coneOuterGain < "u" ? o.coneOuterGain : 0,
                        distanceModel: typeof o.distanceModel < "u" ? o.distanceModel : "inverse",
                        maxDistance: typeof o.maxDistance < "u" ? o.maxDistance : 1e4,
                        panningModel: typeof o.panningModel < "u" ? o.panningModel : "HRTF",
                        refDistance: typeof o.refDistance < "u" ? o.refDistance : 1,
                        rolloffFactor: typeof o.rolloffFactor < "u" ? o.rolloffFactor : 1
                    },
                    i._onstereo = o.onstereo ? [{
                        fn: o.onstereo
                    }] : [],
                    i._onpos = o.onpos ? [{
                        fn: o.onpos
                    }] : [],
                    i._onorientation = o.onorientation ? [{
                        fn: o.onorientation
                    }] : [],
                    r.call(this, o)
                }
            }(Howl.prototype.init),
            Howl.prototype.stereo = function(r, o) {
                var i = this;
                if (!i._webAudio)
                    return i;
                if (i._state !== "loaded")
                    return i._queue.push({
                        event: "stereo",
                        action: function() {
                            i.stereo(r, o)
                        }
                    }),
                    i;
                var s = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
                if (typeof o > "u")
                    if (typeof r == "number")
                        i._stereo = r,
                        i._pos = [r, 0, 0];
                    else
                        return i._stereo;
                for (var c = i._getSoundIds(o), d = 0; d < c.length; d++) {
                    var h = i._soundById(c[d]);
                    if (h)
                        if (typeof r == "number")
                            h._stereo = r,
                            h._pos = [r, 0, 0],
                            h._node && (h._pannerAttr.panningModel = "equalpower",
                            (!h._panner || !h._panner.pan) && t(h, s),
                            s === "spatial" ? typeof h._panner.positionX < "u" ? (h._panner.positionX.setValueAtTime(r, Howler.ctx.currentTime),
                            h._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime),
                            h._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : h._panner.setPosition(r, 0, 0) : h._panner.pan.setValueAtTime(r, Howler.ctx.currentTime)),
                            i._emit("stereo", h._id);
                        else
                            return h._stereo
                }
                return i
            }
            ,
            Howl.prototype.pos = function(r, o, i, s) {
                var c = this;
                if (!c._webAudio)
                    return c;
                if (c._state !== "loaded")
                    return c._queue.push({
                        event: "pos",
                        action: function() {
                            c.pos(r, o, i, s)
                        }
                    }),
                    c;
                if (o = typeof o != "number" ? 0 : o,
                i = typeof i != "number" ? -.5 : i,
                typeof s > "u")
                    if (typeof r == "number")
                        c._pos = [r, o, i];
                    else
                        return c._pos;
                for (var d = c._getSoundIds(s), h = 0; h < d.length; h++) {
                    var _ = c._soundById(d[h]);
                    if (_)
                        if (typeof r == "number")
                            _._pos = [r, o, i],
                            _._node && ((!_._panner || _._panner.pan) && t(_, "spatial"),
                            typeof _._panner.positionX < "u" ? (_._panner.positionX.setValueAtTime(r, Howler.ctx.currentTime),
                            _._panner.positionY.setValueAtTime(o, Howler.ctx.currentTime),
                            _._panner.positionZ.setValueAtTime(i, Howler.ctx.currentTime)) : _._panner.setPosition(r, o, i)),
                            c._emit("pos", _._id);
                        else
                            return _._pos
                }
                return c
            }
            ,
            Howl.prototype.orientation = function(r, o, i, s) {
                var c = this;
                if (!c._webAudio)
                    return c;
                if (c._state !== "loaded")
                    return c._queue.push({
                        event: "orientation",
                        action: function() {
                            c.orientation(r, o, i, s)
                        }
                    }),
                    c;
                if (o = typeof o != "number" ? c._orientation[1] : o,
                i = typeof i != "number" ? c._orientation[2] : i,
                typeof s > "u")
                    if (typeof r == "number")
                        c._orientation = [r, o, i];
                    else
                        return c._orientation;
                for (var d = c._getSoundIds(s), h = 0; h < d.length; h++) {
                    var _ = c._soundById(d[h]);
                    if (_)
                        if (typeof r == "number")
                            _._orientation = [r, o, i],
                            _._node && (_._panner || (_._pos || (_._pos = c._pos || [0, 0, -.5]),
                            t(_, "spatial")),
                            typeof _._panner.orientationX < "u" ? (_._panner.orientationX.setValueAtTime(r, Howler.ctx.currentTime),
                            _._panner.orientationY.setValueAtTime(o, Howler.ctx.currentTime),
                            _._panner.orientationZ.setValueAtTime(i, Howler.ctx.currentTime)) : _._panner.setOrientation(r, o, i)),
                            c._emit("orientation", _._id);
                        else
                            return _._orientation
                }
                return c
            }
            ,
            Howl.prototype.pannerAttr = function() {
                var r = this, o = arguments, i, s, c;
                if (!r._webAudio)
                    return r;
                if (o.length === 0)
                    return r._pannerAttr;
                if (o.length === 1)
                    if (typeof o[0] == "object")
                        i = o[0],
                        typeof s > "u" && (i.pannerAttr || (i.pannerAttr = {
                            coneInnerAngle: i.coneInnerAngle,
                            coneOuterAngle: i.coneOuterAngle,
                            coneOuterGain: i.coneOuterGain,
                            distanceModel: i.distanceModel,
                            maxDistance: i.maxDistance,
                            refDistance: i.refDistance,
                            rolloffFactor: i.rolloffFactor,
                            panningModel: i.panningModel
                        }),
                        r._pannerAttr = {
                            coneInnerAngle: typeof i.pannerAttr.coneInnerAngle < "u" ? i.pannerAttr.coneInnerAngle : r._coneInnerAngle,
                            coneOuterAngle: typeof i.pannerAttr.coneOuterAngle < "u" ? i.pannerAttr.coneOuterAngle : r._coneOuterAngle,
                            coneOuterGain: typeof i.pannerAttr.coneOuterGain < "u" ? i.pannerAttr.coneOuterGain : r._coneOuterGain,
                            distanceModel: typeof i.pannerAttr.distanceModel < "u" ? i.pannerAttr.distanceModel : r._distanceModel,
                            maxDistance: typeof i.pannerAttr.maxDistance < "u" ? i.pannerAttr.maxDistance : r._maxDistance,
                            refDistance: typeof i.pannerAttr.refDistance < "u" ? i.pannerAttr.refDistance : r._refDistance,
                            rolloffFactor: typeof i.pannerAttr.rolloffFactor < "u" ? i.pannerAttr.rolloffFactor : r._rolloffFactor,
                            panningModel: typeof i.pannerAttr.panningModel < "u" ? i.pannerAttr.panningModel : r._panningModel
                        });
                    else
                        return c = r._soundById(parseInt(o[0], 10)),
                        c ? c._pannerAttr : r._pannerAttr;
                else
                    o.length === 2 && (i = o[0],
                    s = parseInt(o[1], 10));
                for (var d = r._getSoundIds(s), h = 0; h < d.length; h++)
                    if (c = r._soundById(d[h]),
                    c) {
                        var _ = c._pannerAttr;
                        _ = {
                            coneInnerAngle: typeof i.coneInnerAngle < "u" ? i.coneInnerAngle : _.coneInnerAngle,
                            coneOuterAngle: typeof i.coneOuterAngle < "u" ? i.coneOuterAngle : _.coneOuterAngle,
                            coneOuterGain: typeof i.coneOuterGain < "u" ? i.coneOuterGain : _.coneOuterGain,
                            distanceModel: typeof i.distanceModel < "u" ? i.distanceModel : _.distanceModel,
                            maxDistance: typeof i.maxDistance < "u" ? i.maxDistance : _.maxDistance,
                            refDistance: typeof i.refDistance < "u" ? i.refDistance : _.refDistance,
                            rolloffFactor: typeof i.rolloffFactor < "u" ? i.rolloffFactor : _.rolloffFactor,
                            panningModel: typeof i.panningModel < "u" ? i.panningModel : _.panningModel
                        };
                        var g = c._panner;
                        g || (c._pos || (c._pos = r._pos || [0, 0, -.5]),
                        t(c, "spatial"),
                        g = c._panner),
                        g.coneInnerAngle = _.coneInnerAngle,
                        g.coneOuterAngle = _.coneOuterAngle,
                        g.coneOuterGain = _.coneOuterGain,
                        g.distanceModel = _.distanceModel,
                        g.maxDistance = _.maxDistance,
                        g.refDistance = _.refDistance,
                        g.rolloffFactor = _.rolloffFactor,
                        g.panningModel = _.panningModel
                    }
                return r
            }
            ,
            Sound.prototype.init = function(r) {
                return function() {
                    var o = this
                      , i = o._parent;
                    o._orientation = i._orientation,
                    o._stereo = i._stereo,
                    o._pos = i._pos,
                    o._pannerAttr = i._pannerAttr,
                    r.call(this),
                    o._stereo ? i.stereo(o._stereo) : o._pos && i.pos(o._pos[0], o._pos[1], o._pos[2], o._id)
                }
            }(Sound.prototype.init),
            Sound.prototype.reset = function(r) {
                return function() {
                    var o = this
                      , i = o._parent;
                    return o._orientation = i._orientation,
                    o._stereo = i._stereo,
                    o._pos = i._pos,
                    o._pannerAttr = i._pannerAttr,
                    o._stereo ? i.stereo(o._stereo) : o._pos ? i.pos(o._pos[0], o._pos[1], o._pos[2], o._id) : o._panner && (o._panner.disconnect(0),
                    o._panner = void 0,
                    i._refreshBuffer(o)),
                    r.call(this)
                }
            }(Sound.prototype.reset);
            var t = function(r, o) {
                o = o || "spatial",
                o === "spatial" ? (r._panner = Howler.ctx.createPanner(),
                r._panner.coneInnerAngle = r._pannerAttr.coneInnerAngle,
                r._panner.coneOuterAngle = r._pannerAttr.coneOuterAngle,
                r._panner.coneOuterGain = r._pannerAttr.coneOuterGain,
                r._panner.distanceModel = r._pannerAttr.distanceModel,
                r._panner.maxDistance = r._pannerAttr.maxDistance,
                r._panner.refDistance = r._pannerAttr.refDistance,
                r._panner.rolloffFactor = r._pannerAttr.rolloffFactor,
                r._panner.panningModel = r._pannerAttr.panningModel,
                typeof r._panner.positionX < "u" ? (r._panner.positionX.setValueAtTime(r._pos[0], Howler.ctx.currentTime),
                r._panner.positionY.setValueAtTime(r._pos[1], Howler.ctx.currentTime),
                r._panner.positionZ.setValueAtTime(r._pos[2], Howler.ctx.currentTime)) : r._panner.setPosition(r._pos[0], r._pos[1], r._pos[2]),
                typeof r._panner.orientationX < "u" ? (r._panner.orientationX.setValueAtTime(r._orientation[0], Howler.ctx.currentTime),
                r._panner.orientationY.setValueAtTime(r._orientation[1], Howler.ctx.currentTime),
                r._panner.orientationZ.setValueAtTime(r._orientation[2], Howler.ctx.currentTime)) : r._panner.setOrientation(r._orientation[0], r._orientation[1], r._orientation[2])) : (r._panner = Howler.ctx.createStereoPanner(),
                r._panner.pan.setValueAtTime(r._stereo, Howler.ctx.currentTime)),
                r._panner.connect(r._node),
                r._paused || r._parent.pause(r._id, !0).play(r._id, !0)
            }
        }
        )()
    }(Bu)),
    Bu
}
var cr = TA();
const SA = {
    name: "ContentTop",
    inject: ["sheet", "raf"],
    data() {
        return {
            menu: !1,
            showContact: !1,
            strokeDashOffset: 0,
            strokeDasharray: 500,
            reached_end: !1,
            volume: !0,
            color: "#000000",
            fillColor: "#00000000",
            headerColor: "#000000",
            textColor: "#000000",
            localTime: void 0,
            reposition: !1
        }
    },
    mounted() {
        if (typeof window < "u") {
            localStorage.getItem("dverso_volume") && (this.volume = localStorage.getItem("dverso_volume") == "true"),
            cr.Howler.mute(!this.volume);
            let e = this.sheet();
            this.localTime = this.timeNowInMilan(),
            e.object("svg_logo", {
                strokeDasharray: Ee.types.number(0),
                strokeDashoffset: Ee.types.number(0),
                headerColor: Ee.types.rgba({
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 1
                }),
                textColor: Ee.types.rgba({
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 1
                }),
                color: Ee.types.rgba({
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 1
                }),
                fillColor: Ee.types.rgba({
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0
                }),
                reached_end: Ee.types.boolean(!1),
                reposition: Ee.types.boolean(!1)
            }).onValuesChange(r => {
                this.strokeDashOffset = r.strokeDashoffset,
                this.reached_end = r.reached_end,
                this.strokeDasharray = r.strokeDasharray,
                this.color = this.toHex(r.color),
                this.fillColor = this.toHex(r.fillColor),
                this.headerColor = this.toHex(r.headerColor),
                this.textColor = this.toHex(r.textColor),
                this.reposition = r.reposition
            }
            , this.raf()),
            setInterval( () => {
                this.localTime = this.timeNowInMilan()
            }
            , 5e3),
            $on("openContactus", () => {
                this.showContact = !0
            }
            )
        }
    },
    methods: {
        toggleVolume() {
            cr.Howler.mute(!this.volume),
            document && window.localStorage.setItem("dverso_volume", String(this.volume))
        },
        scrollTo(e) {
            (this._.provides[Wo] || this.$route).path != "/" && this.$router.push({
                path: "/"
            }),
            $emit("scrollto", e),
            this.menu = !1
        },
        mouseenter(e) {
            $emit("content", e)
        },
        mouseleave() {
            $emit("content", "")
        },
        timeNowInMilan() {
            return new Date().toLocaleTimeString("en-GB", {
                timeZone: "Europe/Rome",
                hour12: !1,
                hour: "2-digit",
                minute: "2-digit"
            }).replace(":", '<div class="caret">:</div>')
        },
        toHex(e) {
            const t = r => Math.round(r * 255).toString(16).padStart(2, "0");
            return "#" + t(e.r) + t(e.g) + t(e.b) + t(e.a)
        }
    },
    watch: {
        volume(e) {
            this.mouseenter(e ? "Disable audio (ง'̀-'́)ง" : "Enable audio ヾ(´〇`)ﾉ♪♪♪")
        }
    }
}
  , CA = {
    class: "dverso_header_content"
}
  , PA = ["innerHTML"]
  , AA = {
    class: "dverso_header_buttons"
}
  , xA = {
    class: "dverso_footer_content"
}
  , kA = {
    class: "dverso_header_content"
}
  , EA = {
    class: "dverso_header_buttons"
};
function OA(e, t, r, o, i, s) {
    const c = fA
      , d = Ra
      , h = ts
      , _ = wA;
    return _e(),
    Oe(lt, null, [D("div", {
        class: "dverso_header",
        style: rt({
            "z-index": i.reposition ? 5 : 0,
            "--stroke-dash-array": `${i.strokeDasharray}`,
            "--stroke-dash-offset": `${i.strokeDashOffset}`,
            "--color": `${i.color}`,
            "--fill-color": `${i.fillColor}`,
            "--header-color": `${i.headerColor}`
        })
    }, [(_e(),
    Oe("svg", {
        onClick: t[0] || (t[0] = g => s.scrollTo(0)),
        onMouseenter: t[1] || (t[1] = g => s.mouseenter("Back to top ʕᵔᴥᵔʔ")),
        onMouseleave: t[2] || (t[2] = g => s.mouseleave()),
        class: gr({
            reposition: i.reposition
        }),
        viewBox: "0 0 1280 290",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, t[33] || (t[33] = [Yi('<path d="M1144.91 57.5642H1125.84C1070.84 57.5642 1044.05 71.2576 1030.74 86.8915C1029.47 88.413 1027.05 87.7294 1026.59 85.789C1022.85 69.5597 1004.4 57.5642 945.086 57.5642H927.404C874.777 57.5642 851.135 64.3558 841.459 78.6887C840.447 80.1661 838.27 80.122 837.39 78.5564C831.034 67.2665 818.323 58.2478 794.132 58.2478H791.339C766.334 58.2478 749.598 70.53 740.515 79.7691C738.866 81.445 736.051 79.9897 736.446 77.6744L736.512 77.2554C737.942 68.788 731.41 61.0703 722.855 61.0703H668.491C661.673 61.0703 655.867 66.0316 654.812 72.8012L652.063 90.2432C651.711 92.5364 648.588 93.0436 647.554 90.9708C638.494 72.7571 614.28 57.5642 555.473 57.5642H545.467C507.97 57.5642 483.911 64.2014 468.406 73.5729C466.339 74.8298 463.942 72.5586 465.042 70.3977C467.241 66.1198 464.162 61.0482 459.368 61.0482H392.754C386.904 61.0482 381.648 64.5763 379.404 69.9787L355.257 128.347C354.333 130.596 351.013 130.199 350.661 127.773L342.612 73.3965C341.556 66.2963 335.486 61.0482 328.317 61.0482H265.969C264.496 61.0482 263.374 59.7252 263.594 58.2698L268.212 29.0308C269.554 20.6075 263.066 13 254.555 13H199.949C193.153 13 187.369 17.9393 186.292 24.6648L181.321 55.8222C179.848 65.0173 170.281 70.3977 161.616 67.0239C152.182 63.3415 138.943 60.1 120.931 60.1H116.049C68.3698 60.1 46.5097 85.9874 41.3855 114.918C40.4618 120.276 40 126.803 40 132.183C40 161.092 57.2198 187.464 100.94 187.464H104.899C133.686 187.464 150.137 179.283 158.648 173.462C160.385 172.271 162.716 173.727 162.386 175.799C161.506 181.444 165.861 186.516 171.557 186.516H230.98C238.083 186.516 244.131 181.334 245.252 174.3L257.37 97.7624C257.788 95.1825 261.439 95.0061 262.076 97.5419L281.759 175.623C283.365 182.018 289.105 186.494 295.702 186.494H396.602C401.902 186.494 406.741 183.539 409.182 178.82L434.89 128.942C436.056 126.693 439.421 127.531 439.421 130.044C439.421 155.226 451.517 189.978 536.406 189.978H546.632C597.258 189.978 622.571 179.482 635.547 167.156C637.218 165.568 639.967 166.957 639.593 169.25L639.417 170.419C638.098 178.842 644.585 186.472 653.096 186.472H707.615C714.432 186.472 720.238 181.511 721.294 174.741L728.749 127.465C731.3 110.905 737.128 105.304 747.135 105.304C758.307 105.304 761.561 113.926 759.934 122.569C758.834 129.427 764.112 135.623 771.04 135.623H829.231C834.751 135.623 839.436 131.61 840.337 126.164L840.909 122.635C841.217 120.695 843.592 119.923 844.955 121.312C852.939 129.493 867.08 135.381 890.655 136.792L922.06 138.666C934.156 139.372 936.707 142.393 936.707 147.288C936.707 151.72 933.21 155.689 923.226 155.689H922.764C916.342 155.689 912.779 153.264 910.932 150.155C908.601 146.186 904.554 143.561 899.958 143.561H839.941C831.167 143.561 825.031 152.492 828.351 160.629C834.421 175.403 854.06 189.978 909.238 189.978H927.624C994.612 189.978 1014.36 177.387 1021.02 160.188C1021.73 158.379 1024.15 158.137 1025.25 159.747C1036.29 175.91 1060.65 190 1112.29 190H1130.68C1226.28 190 1236.28 149.89 1239.08 127.972C1239.78 122.371 1240 117.718 1240 114.675C1240 91.8088 1227.66 57.5422 1144.86 57.5422L1144.91 57.5642ZM170.765 125.899C168.896 135.006 162.848 147.597 144.243 147.597H143.319C129.596 147.597 124.472 137.806 124.472 127.31C124.472 114.256 130.058 99.0855 149.367 99.0855H150.29C166.345 99.0855 171.447 109.118 171.447 118.446C171.447 121.004 171.205 123.584 170.743 125.899H170.765ZM549.909 91.6103C565.458 91.6103 570.494 96.3512 572.011 102.658C572.363 104.157 571.22 105.612 569.658 105.612H527.257C525.476 105.612 524.332 103.738 525.102 102.128C527.829 96.3512 534.163 91.6103 549.909 91.6103ZM642.408 138.49H576.08C571.857 138.49 567.943 140.474 565.172 143.672C562.027 147.31 555.627 151.323 542.696 151.323C524.508 151.323 519.406 141.489 519.494 133.22C519.494 131.897 520.572 130.794 521.891 130.794H642.87C644.343 130.794 645.465 132.117 645.245 133.573L644.783 136.461C644.607 137.63 643.596 138.49 642.408 138.49ZM1017.68 118.203C1017.59 118.622 1017.53 119.041 1017.46 119.482C1009.21 110.64 992.699 105.392 963.251 103.518L932.308 101.886C920.455 100.96 918.343 98.3798 918.343 94.8958C918.343 92.0954 919.267 87.9058 932.308 87.9058H932.77C939.983 87.9058 943.414 89.6919 945.064 91.897C947.483 95.1825 951.199 97.2332 955.268 97.2332H1020.1C1021.84 97.2332 1022.98 99.0193 1022.3 100.607C1019.57 106.98 1018.36 113.088 1017.7 118.225L1017.68 118.203ZM1125.84 150.618H1125.38C1106.07 150.618 1101.19 138.247 1101.19 127.994C1101.19 117.74 1105.36 96.7481 1130.72 96.7481H1131.18C1150.71 96.7481 1156.08 107.707 1156.08 117.74C1156.08 127.773 1151.9 150.618 1125.84 150.618Z" fill="#FCF6E7" stroke="black"></path><path d="M113.84 276.008V268.448H106.196V259.964H114.68V267.608H136.688V253.16H113.84V245.6H106.196V229.64H113.84V221.996H137.528V229.64H145.256V238.04H136.688V230.48H114.68V244.844H137.528V252.32H145.256V268.448H137.528V276.008H113.84Z" fill="#FCF6E7"></path><path d="M320.178 276.008V230.48H313.458V238.04H304.974V229.64H312.618V221.996H336.306V229.64H344.034V238.04H335.466V230.48H328.746V276.008H320.178Z" fill="#FCF6E7"></path><path d="M510.494 276.008V268.448H502.85V221.996H511.334V267.608H533.342V221.996H541.91V268.448H534.182V276.008H510.494Z" fill="#FCF6E7"></path><path d="M703.269 276.008V221.996H727.041V229.64H734.601V237.2H742.329V260.804H734.601V268.448H727.041V276.008H703.269ZM711.753 267.608H726.201V259.964H733.761V238.04H726.201V230.48H711.753V267.608Z" fill="#FCF6E7"></path><path d="M899.504 276.008V267.608H907.148V230.48H899.504V221.996H923.276V230.48H915.548V267.608H923.276V276.008H899.504Z" fill="#FCF6E7"></path><path d="M1092.31 276.008V268.448H1084.67V229.64H1092.31V221.996H1116V229.64H1123.73V268.448H1116V276.008H1092.31ZM1093.15 267.608H1115.16V230.48H1093.15V267.608Z" fill="#FCF6E7"></path><path d="M113.84 276.008V268.448H106.196V259.964H114.68V267.608H136.688V253.16H113.84V245.6H106.196V229.64H113.84V221.996H137.528V229.64H145.256V238.04H136.688V230.48H114.68V244.844H137.528V252.32H145.256V268.448H137.528V276.008H113.84Z" stroke="black"></path><path d="M320.178 276.008V230.48H313.458V238.04H304.974V229.64H312.618V221.996H336.306V229.64H344.034V238.04H335.466V230.48H328.746V276.008H320.178Z" stroke="black"></path><path d="M510.494 276.008V268.448H502.85V221.996H511.334V267.608H533.342V221.996H541.91V268.448H534.182V276.008H510.494Z" stroke="black"></path><path d="M703.269 276.008V221.996H727.041V229.64H734.601V237.2H742.329V260.804H734.601V268.448H727.041V276.008H703.269ZM711.753 267.608H726.201V259.964H733.761V238.04H726.201V230.48H711.753V267.608Z" stroke="black"></path><path d="M899.504 276.008V267.608H907.148V230.48H899.504V221.996H923.276V230.48H915.548V267.608H923.276V276.008H899.504Z" stroke="black"></path><path d="M1092.31 276.008V268.448H1084.67V229.64H1092.31V221.996H1116V229.64H1123.73V268.448H1116V276.008H1092.31ZM1093.15 267.608H1115.16V230.48H1093.15V267.608Z" stroke="black"></path>', 13)]), 34))], 4), D("div", CA, [D("a", {
        class: gr({
            hideonreposition: i.reposition
        }),
        onMouseenter: t[3] || (t[3] = g => s.mouseenter(["Our local time", "if you mind (っ▀¯▀)つ"])),
        onMouseleave: t[4] || (t[4] = g => s.mouseleave()),
        style: rt({
            color: i.reposition ? i.textColor : "black"
        })
    }, [t[34] || (t[34] = ht(" DVERSO STUDIO ")), t[35] || (t[35] = D("br", null, null, -1)), D("span", {
        innerHTML: i.localTime
    }, null, 8, PA), t[36] || (t[36] = ht(", CET - MILAN "))], 38), D("div", AA, [D("button", {
        class: "hideonmobile dverso_btn small",
        onMouseenter: t[5] || (t[5] = g => s.mouseenter(i.volume ? "Disable audio (ง'̀-'́)" : "Enable audio ヾ(´〇`)ﾉ♪♪♪")),
        onMouseleave: t[6] || (t[6] = g => s.mouseleave()),
        onClick: t[7] || (t[7] = g => {
            i.volume = !i.volume,
            s.toggleVolume()
        }
        )
    }, [we(d, null, {
        default: nr( () => [we(c, {
            enabled: i.volume
        }, null, 8, ["enabled"])]),
        _: 1
    })], 32), D("button", {
        onClick: t[8] || (t[8] = g => i.showContact = !0),
        onMouseenter: t[9] || (t[9] = g => s.mouseenter("Lets talk!")),
        onMouseleave: t[10] || (t[10] = g => s.mouseleave()),
        class: "dverso_btn"
    }, "GET IN TOUCH", 32), D("button", {
        onClick: t[11] || (t[11] = g => i.menu = !0),
        onMouseenter: t[12] || (t[12] = g => s.mouseenter("Open menu")),
        onMouseleave: t[13] || (t[13] = g => s.mouseleave()),
        style: rt({
            color: i.reposition ? i.textColor : "black"
        }),
        class: "dverso_btn transparent hideonmobile"
    }, "MENU", 36)])]), D("div", xA, [D("div", {
        style: rt({
            color: i.reposition ? i.textColor : "black"
        }),
        class: "dverso_est"
    }, t[37] || (t[37] = [ht(" BASED IN MILAN, ITALY"), D("br", null, null, -1), D("div", null, "EST. 2022", -1)]), 4), we(to, {
        mode: "out-in"
    }, {
        default: nr( () => [i.reached_end ? (_e(),
        Oe("div", {
            key: 1,
            style: rt([{
                color: i.reposition ? i.textColor : "black"
            }, {
                transform: "translateY(-6px)"
            }]),
            class: "dverso_scroll"
        }, t[39] || (t[39] = [ht(" VAT IT12425550964"), D("br", null, null, -1), D("div", {
            class: "dverso_scroll_row"
        }, " DVERSO STUDIO SRL", -1)]), 4)) : (_e(),
        Oe("div", {
            key: 0,
            onMouseenter: t[14] || (t[14] = g => s.mouseenter("Come on scroll!")),
            onMouseleave: t[15] || (t[15] = g => s.mouseleave()),
            style: rt({
                color: i.reposition ? i.textColor : "black"
            }),
            class: "dverso_scroll"
        }, t[38] || (t[38] = [ht(" SCROLL DOWN "), D("br", null, null, -1), D("div", {
            class: "dverso_scroll_row"
        }, [ht(" TO DISCOVER "), D("div", {
            class: "accent"
        }, [D("svg", {
            width: "9",
            height: "6",
            viewBox: "0 0 9 6",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
        }, [D("path", {
            d: "M0.970459 0.686401L4.65687 4.37281C4.65687 4.37281 8.11287 0.916802 8.34327 0.686401",
            stroke: "black"
        })])])], -1)]), 36))]),
        _: 1
    })]), we(to, {
        name: "menu"
    }, {
        default: nr( () => [i.menu ? (_e(),
        Oe("div", {
            key: 0,
            onWheelCapture: t[31] || (t[31] = Ci( () => {}
            , ["stop"])),
            class: "dverso_menu_content"
        }, [D("div", kA, [t[40] || (t[40] = D("div", null, null, -1)), D("div", EA, [D("button", {
            onClick: t[16] || (t[16] = g => i.menu = !1),
            onMouseenter: t[17] || (t[17] = g => s.mouseenter("Close menu")),
            onMouseleave: t[18] || (t[18] = g => s.mouseleave()),
            style: {
                color: "black"
            },
            class: "dverso_btn transparent hideonmobile"
        }, "CLOSE MENU", 32)])]), D("h1", {
            onClick: t[19] || (t[19] = g => s.scrollTo(0)),
            onMouseenter: t[20] || (t[20] = g => s.mouseenter("Open")),
            onMouseleave: t[21] || (t[21] = g => s.mouseleave())
        }, [we(h, {
            text: "HOME"
        })], 32), D("h1", {
            onClick: t[22] || (t[22] = g => s.scrollTo(1)),
            onMouseenter: t[23] || (t[23] = g => s.mouseenter("Open")),
            onMouseleave: t[24] || (t[24] = g => s.mouseleave())
        }, [we(h, {
            text: "ABOUT US"
        })], 32), D("h1", {
            onClick: t[25] || (t[25] = g => s.scrollTo(3)),
            onMouseenter: t[26] || (t[26] = g => s.mouseenter("Open")),
            onMouseleave: t[27] || (t[27] = g => s.mouseleave())
        }, [we(h, {
            text: "PORTFOLIO"
        })], 32), D("h1", {
            onClick: t[28] || (t[28] = g => s.scrollTo(6)),
            onMouseenter: t[29] || (t[29] = g => s.mouseenter("Open")),
            onMouseleave: t[30] || (t[30] = g => s.mouseleave())
        }, [we(h, {
            text: "GET IN TOUCH"
        })], 32)], 32)) : jt("", !0)]),
        _: 1
    }), we(d, null, {
        default: nr( () => [we(to, null, {
            default: nr( () => [(_e(),
            Vt(Dg, null, [i.showContact ? (_e(),
            Vt(_, {
                key: 0,
                onClose: t[32] || (t[32] = g => i.showContact = !1)
            })) : jt("", !0)], 1024))]),
            _: 1
        })]),
        _: 1
    })], 64)
}
const RA = ir(SA, [["render", OA]]);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const bm = Symbol("Comlink.proxy")
  , MA = Symbol("Comlink.endpoint")
  , IA = Symbol("Comlink.releaseProxy")
  , Nu = Symbol("Comlink.finalizer")
  , da = Symbol("Comlink.thrown")
  , wm = e => typeof e == "object" && e !== null || typeof e == "function"
  , jA = {
    canHandle: e => wm(e) && e[bm],
    serialize(e) {
        const {port1: t, port2: r} = new MessageChannel;
        return Sm(e, t),
        [r, [r]]
    },
    deserialize(e) {
        return e.start(),
        Pm(e)
    }
}
  , HA = {
    canHandle: e => wm(e) && da in e,
    serialize({value: e}) {
        let t;
        return e instanceof Error ? t = {
            isError: !0,
            value: {
                message: e.message,
                name: e.name,
                stack: e.stack
            }
        } : t = {
            isError: !1,
            value: e
        },
        [t, []]
    },
    deserialize(e) {
        throw e.isError ? Object.assign(new Error(e.value.message), e.value) : e.value
    }
}
  , Tm = new Map([["proxy", jA], ["throw", HA]]);
function DA(e, t) {
    for (const r of e)
        if (t === r || r === "*" || r instanceof RegExp && r.test(t))
            return !0;
    return !1
}
function Sm(e, t=globalThis, r=["*"]) {
    t.addEventListener("message", function o(i) {
        if (!i || !i.data)
            return;
        if (!DA(r, i.origin)) {
            `${i.origin}`;
            return
        }
        const {id: s, type: c, path: d} = Object.assign({
            path: []
        }, i.data)
          , h = (i.data.argumentList || []).map(Gn);
        let _;
        try {
            const g = d.slice(0, -1).reduce( (f, p) => f[p], e)
              , l = d.reduce( (f, p) => f[p], e);
            switch (c) {
            case "GET":
                _ = l;
                break;
            case "SET":
                g[d.slice(-1)[0]] = Gn(i.data.value),
                _ = !0;
                break;
            case "APPLY":
                _ = l.apply(g, h);
                break;
            case "CONSTRUCT":
                {
                    const f = new l(...h);
                    _ = Ai(f)
                }
                break;
            case "ENDPOINT":
                {
                    const {port1: f, port2: p} = new MessageChannel;
                    Sm(e, p),
                    _ = km(f, [f])
                }
                break;
            case "RELEASE":
                _ = void 0;
                break;
            default:
                return
            }
        } catch (g) {
            _ = {
                value: g,
                [da]: 0
            }
        }
        Promise.resolve(_).catch(g => ({
            value: g,
            [da]: 0
        })).then(g => {
            const [l,f] = ja(g);
            t.postMessage(Object.assign(Object.assign({}, l), {
                id: s
            }), f),
            c === "RELEASE" && (t.removeEventListener("message", o),
            Cm(t),
            Nu in e && typeof e[Nu] == "function" && e[Nu]())
        }
        ).catch(g => {
            const [l,f] = ja({
                value: new TypeError("Unserializable return value"),
                [da]: 0
            });
            t.postMessage(Object.assign(Object.assign({}, l), {
                id: s
            }), f)
        }
        )
    }),
    t.start && t.start()
}
function LA(e) {
    return e.constructor.name === "MessagePort"
}
function Cm(e) {
    LA(e) && e.close()
}
function Pm(e, t) {
    return Mf(e, [], t)
}
function na(e) {
    if (e)
        throw new Error("Proxy has been released and is not useable")
}
function Am(e) {
    return ko(e, {
        type: "RELEASE"
    }).then( () => {
        Cm(e)
    }
    )
}
const Ma = new WeakMap
  , Ia = "FinalizationRegistry"in globalThis && new FinalizationRegistry(e => {
    const t = (Ma.get(e) || 0) - 1;
    Ma.set(e, t),
    t === 0 && Am(e)
}
);
function BA(e, t) {
    const r = (Ma.get(t) || 0) + 1;
    Ma.set(t, r),
    Ia && Ia.register(e, t, e)
}
function NA(e) {
    Ia && Ia.unregister(e)
}
function Mf(e, t=[], r=function() {}
) {
    let o = !1;
    const i = new Proxy(r,{
        get(s, c) {
            if (na(o),
            c === IA)
                return () => {
                    NA(i),
                    Am(e),
                    o = !0
                }
                ;
            if (c === "then") {
                if (t.length === 0)
                    return {
                        then: () => i
                    };
                const d = ko(e, {
                    type: "GET",
                    path: t.map(h => h.toString())
                }).then(Gn);
                return d.then.bind(d)
            }
            return Mf(e, [...t, c])
        },
        set(s, c, d) {
            na(o);
            const [h,_] = ja(d);
            return ko(e, {
                type: "SET",
                path: [...t, c].map(g => g.toString()),
                value: h
            }, _).then(Gn)
        },
        apply(s, c, d) {
            na(o);
            const h = t[t.length - 1];
            if (h === MA)
                return ko(e, {
                    type: "ENDPOINT"
                }).then(Gn);
            if (h === "bind")
                return Mf(e, t.slice(0, -1));
            const [_,g] = B0(d);
            return ko(e, {
                type: "APPLY",
                path: t.map(l => l.toString()),
                argumentList: _
            }, g).then(Gn)
        },
        construct(s, c) {
            na(o);
            const [d,h] = B0(c);
            return ko(e, {
                type: "CONSTRUCT",
                path: t.map(_ => _.toString()),
                argumentList: d
            }, h).then(Gn)
        }
    });
    return BA(i, e),
    i
}
function FA(e) {
    return Array.prototype.concat.apply([], e)
}
function B0(e) {
    const t = e.map(ja);
    return [t.map(r => r[0]), FA(t.map(r => r[1]))]
}
const xm = new WeakMap;
function km(e, t) {
    return xm.set(e, t),
    e
}
function Ai(e) {
    return Object.assign(e, {
        [bm]: !0
    })
}
function ja(e) {
    for (const [t,r] of Tm)
        if (r.canHandle(e)) {
            const [o,i] = r.serialize(e);
            return [{
                type: "HANDLER",
                name: t,
                value: o
            }, i]
        }
    return [{
        type: "RAW",
        value: e
    }, xm.get(e) || []]
}
function Gn(e) {
    switch (e.type) {
    case "HANDLER":
        return Tm.get(e.name).deserialize(e.value);
    case "RAW":
        return e.value
    }
}
function ko(e, t, r) {
    return new Promise(o => {
        const i = VA();
        e.addEventListener("message", function s(c) {
            !c.data || !c.data.id || c.data.id !== i || (e.removeEventListener("message", s),
            o(c.data))
        }),
        e.start && e.start(),
        e.postMessage(Object.assign({
            id: i
        }, t), r)
    }
    )
}
function VA() {
    return new Array(4).fill(0).map( () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-")
}
function Fu(e, t, r, o) {
    return new (r || (r = Promise))(function(i, s) {
        function c(_) {
            try {
                h(o.next(_))
            } catch (g) {
                s(g)
            }
        }
        function d(_) {
            try {
                h(o.throw(_))
            } catch (g) {
                s(g)
            }
        }
        function h(_) {
            var g;
            _.done ? i(_.value) : (g = _.value,
            g instanceof r ? g : new r(function(l) {
                l(g)
            }
            )).then(c, d)
        }
        h((o = o.apply(e, [])).next())
    }
    )
}
const $A = ["geforce 320m", "geforce 8600", "geforce 8600m gt", "geforce 8800 gs", "geforce 8800 gt", "geforce 9400", "geforce 9400m g", "geforce 9400m", "geforce 9600m gt", "geforce 9600m", "geforce fx go5200", "geforce gt 120", "geforce gt 130", "geforce gt 330m", "geforce gtx 285", "google swiftshader", "intel g41", "intel g45", "intel gma 4500mhd", "intel gma x3100", "intel hd 3000", "intel q45", "legacy", "mali-2", "mali-3", "mali-4", "quadro fx 1500", "quadro fx 4", "quadro fx 5", "radeon hd 2400", "radeon hd 2600", "radeon hd 4670", "radeon hd 4850", "radeon hd 4870", "radeon hd 5670", "radeon hd 5750", "radeon hd 6290", "radeon hd 6300", "radeon hd 6310", "radeon hd 6320", "radeon hd 6490m", "radeon hd 6630m", "radeon hd 6750m", "radeon hd 6770m", "radeon hd 6970m", "sgx 543", "sgx543"];
function N0(e) {
    return e = e.toLowerCase().replace(/.*angle ?\((.+)\)(?: on vulkan [0-9.]+)?$/i, "$1").replace(/\s(\d{1,2}gb|direct3d.+$)|\(r\)| \([^)]+\)$/g, "").replace(/(?:vulkan|opengl) \d+\.\d+(?:\.\d+)?(?: \((.*)\))?/, "$1")
}
const Em = typeof window > "u"
  , Sr = ( () => {
    if (Em)
        return;
    const {userAgent: e, platform: t, maxTouchPoints: r} = window.navigator
      , o = /(iphone|ipod|ipad)/i.test(e)
      , i = t === "iPad" || t === "MacIntel" && r > 0 && !window.MSStream;
    return {
        isIpad: i,
        isMobile: /android/i.test(e) || o || i,
        isSafari12: /Version\/12.+Safari/.test(e),
        isFirefox: /Firefox/.test(e)
    }
}
)();
function zA(e, t, r) {
    if (!r)
        return [t];
    const o = function(_) {
        const g = `
    precision highp float;
    attribute vec3 aPosition;
    varying float vvv;
    void main() {
      vvv = 0.31622776601683794;
      gl_Position = vec4(aPosition, 1.0);
    }
  `
          , l = `
    precision highp float;
    varying float vvv;
    void main() {
      vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * vvv;
      enc = fract(enc);
      enc -= enc.yzww * vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);
      gl_FragColor = enc;
    }
  `
          , f = _.createShader(35633)
          , p = _.createShader(35632)
          , y = _.createProgram();
        if (!(p && f && y))
            return;
        _.shaderSource(f, g),
        _.shaderSource(p, l),
        _.compileShader(f),
        _.compileShader(p),
        _.attachShader(y, f),
        _.attachShader(y, p),
        _.linkProgram(y),
        _.detachShader(y, f),
        _.detachShader(y, p),
        _.deleteShader(f),
        _.deleteShader(p),
        _.useProgram(y);
        const w = _.createBuffer();
        _.bindBuffer(34962, w),
        _.bufferData(34962, new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 35044);
        const x = _.getAttribLocation(y, "aPosition");
        _.vertexAttribPointer(x, 3, 5126, !1, 0, 0),
        _.enableVertexAttribArray(x),
        _.clearColor(1, 1, 1, 1),
        _.clear(16384),
        _.viewport(0, 0, 1, 1),
        _.drawArrays(4, 0, 3);
        const P = new Uint8Array(4);
        return _.readPixels(0, 0, 1, 1, 6408, 5121, P),
        _.deleteProgram(y),
        _.deleteBuffer(w),
        P.join("")
    }(e)
      , i = "801621810"
      , s = "8016218135"
      , c = "80162181161"
      , d = Sr?.isIpad ? [["a7", c, 12], ["a8", s, 15], ["a8x", s, 15], ["a9", s, 15], ["a9x", s, 15], ["a10", s, 15], ["a10x", s, 15], ["a12", i, 15], ["a12x", i, 15], ["a12z", i, 15], ["a14", i, 15], ["a15", i, 15], ["m1", i, 15], ["m2", i, 15]] : [["a7", c, 12], ["a8", s, 12], ["a9", s, 15], ["a10", s, 15], ["a11", i, 15], ["a12", i, 15], ["a13", i, 15], ["a14", i, 15], ["a15", i, 15], ["a16", i, 15], ["a17", i, 15]];
    let h;
    return o === "80162181255" ? h = d.filter( ([,,_]) => _ >= 14) : (h = d.filter( ([,_]) => _ === o),
    h.length || (h = d)),
    h.map( ([_]) => `apple ${_} gpu`)
}
class F0 extends Error {
    constructor(t) {
        super(t),
        Object.setPrototypeOf(this, new.target.prototype)
    }
}
const Vu = []
  , V0 = [];
function UA(e, t) {
    if (e === t)
        return 0;
    const r = e;
    e.length > t.length && (e = t,
    t = r);
    let o = e.length
      , i = t.length;
    for (; o > 0 && e.charCodeAt(~-o) === t.charCodeAt(~-i); )
        o--,
        i--;
    let s, c = 0;
    for (; c < o && e.charCodeAt(c) === t.charCodeAt(c); )
        c++;
    if (o -= c,
    i -= c,
    o === 0)
        return i;
    let d, h, _ = 0, g = 0, l = 0;
    for (; g < o; )
        V0[g] = e.charCodeAt(c + g),
        Vu[g] = ++g;
    for (; l < i; )
        for (s = t.charCodeAt(c + l),
        d = l++,
        _ = l,
        g = 0; g < o; g++)
            h = s === V0[g] ? d : d + 1,
            d = Vu[g],
            _ = Vu[g] = d > _ ? h > _ ? _ + 1 : h : h > d ? d + 1 : h;
    return _
}
function qA(e) {
    return e != null
}
const KA = ({mobileTiers: e=[0, 15, 30, 60], desktopTiers: t=[0, 15, 30, 60], override: r={}, glContext: o, failIfMajorPerformanceCaveat: i=!1, benchmarksURL: s="https://unpkg.com/detect-gpu@5.0.47/dist/benchmarks"}={}) => Fu(void 0, void 0, void 0, function*() {
    const c = {};
    if (Em)
        return {
            tier: 0,
            type: "SSR"
        };
    const {isIpad: d=!!Sr?.isIpad, isMobile: h=!!Sr?.isMobile, screenSize: _=window.screen, loadBenchmarks: g=M => Fu(void 0, void 0, void 0, function*() {
        const F = yield fetch(`${s}/${M}`).then(W => W.json());
        if (parseInt(F.shift().split(".")[0], 10) < 4)
            throw new F0("Detect GPU benchmark data is out of date. Please update to version 4x");
        return F
    })} = r;
    let {renderer: l} = r;
    const f = (M, F, W, Q, $) => ({
        device: $,
        fps: Q,
        gpu: W,
        isMobile: h,
        tier: M,
        type: F
    });
    let p, y = "";
    if (l)
        l = N0(l),
        p = [l];
    else {
        const M = o || function(W, Q=!1) {
            const $ = {
                alpha: !1,
                antialias: !1,
                depth: !1,
                failIfMajorPerformanceCaveat: Q,
                powerPreference: "high-performance",
                stencil: !1
            };
            W && delete $.powerPreference;
            const G = window.document.createElement("canvas")
              , ae = G.getContext("webgl", $) || G.getContext("experimental-webgl", $);
            return ae ?? void 0
        }(Sr?.isSafari12, i);
        if (!M)
            return f(0, "WEBGL_UNSUPPORTED");
        const F = Sr?.isFirefox ? null : M.getExtension("WEBGL_debug_renderer_info");
        if (l = F ? M.getParameter(F.UNMASKED_RENDERER_WEBGL) : M.getParameter(M.RENDERER),
        !l)
            return f(1, "FALLBACK");
        y = l,
        l = N0(l),
        p = function(W, Q, $) {
            return Q === "apple gpu" ? zA(W, Q, $) : [Q]
        }(M, l, h)
    }
    const w = (yield Promise.all(p.map(function(M) {
        var F;
        return Fu(this, void 0, void 0, function*() {
            const W = (Re => {
                const et = h ? ["adreno", "apple", "mali-t", "mali", "nvidia", "powervr", "samsung"] : ["intel", "apple", "amd", "radeon", "nvidia", "geforce", "adreno"];
                for (const Ve of et)
                    if (Re.includes(Ve))
                        return Ve
            }
            )(M);
            if (!W)
                return;
            const Q = `${h ? "m" : "d"}-${W}${d ? "-ipad" : ""}.json`
              , $ = c[Q] = (F = c[Q]) !== null && F !== void 0 ? F : g(Q);
            let G;
            try {
                G = yield $
            } catch (Re) {
                if (Re instanceof F0)
                    throw Re;
                return
            }
            const ae = function(Re) {
                var et;
                const Ve = (Re = Re.replace(/\([^)]+\)/, "")).match(/\d+/) || Re.match(/(\W|^)([A-Za-z]{1,3})(\W|$)/g);
                return (et = Ve?.join("").replace(/\W|amd/g, "")) !== null && et !== void 0 ? et : ""
            }(M);
            let U = G.filter( ([,Re]) => Re === ae);
            U.length || (U = G.filter( ([Re]) => Re.includes(M)));
            const ce = U.length;
            if (ce === 0)
                return;
            const ve = M.split(/[.,()\[\]/\s]/g).sort().filter( (Re, et, Ve) => et === 0 || Re !== Ve[et - 1]).join(" ");
            let Pe, [Y,,,,he] = ce > 1 ? U.map(Re => [Re, UA(ve, Re[2])]).sort( ([,Re], [,et]) => Re - et)[0][0] : U[0], le = Number.MAX_VALUE;
            const {devicePixelRatio: Fe} = window
              , it = _.width * Fe * _.height * Fe;
            for (const Re of he) {
                const [et,Ve] = Re
                  , mt = et * Ve
                  , V = Math.abs(it - mt);
                V < le && (le = V,
                Pe = Re)
            }
            if (!Pe)
                return;
            const [,,St,at] = Pe;
            return [le, St, Y, at]
        })
    }))).filter(qA).sort( ([M=Number.MAX_VALUE,F], [W=Number.MAX_VALUE,Q]) => M === W ? F - Q : M - W);
    if (!w.length) {
        const M = $A.find(F => l.includes(F));
        return M ? f(0, "BLOCKLISTED", M) : f(1, "FALLBACK", `${l} (${y})`)
    }
    const [,x,P,E] = w[0];
    if (x === -1)
        return f(0, "BLOCKLISTED", P, x, E);
    const C = h ? e : t;
    let S = 0;
    for (let M = 0; M < C.length; M++)
        x >= C[M] && (S = M);
    return f(S, "BENCHMARK", P, x, E)
});
let $0, z0, U0, q0, K0, Rt, $u = .3;
const WA = {
    inject: ["cs"],
    props: ["productIndex", "cb", "loaderCb", "ui"],
    data() {
        return {
            useWorker: !0,
            showLoader: !0
        }
    },
    async mounted() {
        let e = this.cs();
        window.started && window.location.reload();
        let t;
        if (window.location.search.includes("no-load"))
            return;
        let r = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
          , o = e.sharedBuffer
          , i = e.bboView;
        q0 = new cr.Howl({
            loop: !0,
            src: ["/backgroundnoise.ogg"],
            volume: 1
        }),
        q0.play(),
        K0 = new cr.Howl({
            loop: !1,
            src: ["/keystrokes.ogg"],
            sprite: {
                1: [41, 548],
                2: [521, 468],
                3: [1441, 1180],
                4: [3041, 980],
                5: [4609, 951],
                6: [6111, 1169]
            },
            volume: .6
        }),
        $0 = new cr.Howl({
            loop: !1,
            src: ["/keyboard.ogg"],
            sprite: {
                down1: [200, 100],
                up1: [900, 100],
                down2: [1900, 100],
                up2: [2700, 100],
                down3: [3600, 100],
                up3: [4300, 100],
                down4: [5100, 100],
                up4: [5700, 100],
                down5: [6400, 100],
                up5: [7200, 100]
            }
        }),
        U0 = new cr.Howl({
            loop: !1,
            src: ["/quack.ogg"],
            volume: .5
        }),
        z0 = new cr.Howl({
            loop: !1,
            src: ["/keyboard.ogg"],
            sprite: {
                hover1: [900, 100],
                hover2: [2700, 100],
                hover3: [4300, 100],
                hover4: [5700, 100],
                hover5: [7200, 100]
            },
            volume: .2
        });
        const s = await KA({
            override: {
                loadBenchmarks: () => []
            }
        })
          , c = window.innerWidth > 1024 && window.innerHeight > 768 || window.innerHeight > 1024;
        s.isMobile && c && (s.tier = 1),
        s.isMobile && (s.tier = 0),
        s.fps < 60 && (s.tier = 1),
        s.gpu?.toLowerCase().includes("swiftshader") && (s.tier = 0),
        s.gpu?.includes("intel") && (s.tier = 1),
        s.gpu?.includes("apple") && !s.gpu?.includes("pro") && (s.tier = 1),
        s.gpu?.includes("apple a1") && (s.tier = 1),
        s.gpu?.includes("firepro d500") && (s.tier = 1),
        innerWidth <= 1680 && s.gpu?.includes("apple") && navigator.hardwareConcurrency <= 8 && (s.tier = 1),
        s.gpu?.includes("mobile") && !s.gpu?.includes("rtx") && (s.tier = 1),
        s.gpu?.includes("iris") && (s.tier = 1);
        let d = !window.location.search.includes("no-worker") || window.location.search.includes("force-worker")
          , h = this.$refs.canvas;
        this.$refs.canvas.width = window.innerWidth,
        this.$refs.canvas.height = window.innerHeight,
        typeof h.transferControlToOffscreen != "function" && (d = !1),
        d ? (t = await qr( () => import("./PqaGRdXq.js"), [], import.meta.url),
        h = this.$refs.canvas.transferControlToOffscreen()) : t = await qr( () => import("./Cc3m6KU0.js"), __vite__mapDeps([4, 5]), import.meta.url);
        const _ = t.default;
        window.started = !0,
        s.isMobile,
        s.tier,
        s.fps;
        const g = new _;
        g instanceof Worker ? Rt = Pm(g) : Rt = g,
        Rt.setSize(window.innerWidth, window.innerHeight),
        window.addEventListener("resize", () => {
            Rt.setSize(window.innerWidth, window.innerHeight),
            Rt.dispatchEvent("resize")
        }
        );
        let l;
        cr.Howler.fadeIn = function() {
            let w = this.volume();
            l && clearInterval(l),
            l = setInterval( () => {
                w += .01,
                this.volume(w),
                w >= $u && (this.volume($u),
                clearInterval(l))
            }
            , 10)
        }
        ,
        cr.Howler.fadeOut = function() {
            let w = this.volume();
            l && clearInterval(l),
            l = setInterval( () => {
                w -= .01,
                this.volume(w),
                w <= 0 && (this.volume(0),
                clearInterval(l))
            }
            , 10)
        }
        ,
        window.addEventListener("blur", () => {
            cr.Howler.fadeOut()
        }
        ),
        window.addEventListener("focus", () => {
            cr.Howler.fadeIn(),
            Rt.dispatchEvent("focus")
        }
        ),
        window.addEventListener("touchstart", w => {
            Rt.dispatchEvent("touchstart", {
                touches: [{
                    clientY: w.touches[0].clientY,
                    clientX: w.touches[0].clientX
                }]
            })
        }
        ),
        window.addEventListener("touchend", w => {
            Rt.dispatchEvent("touchend", {
                touches: []
            })
        }
        ),
        window.addEventListener("mousedown", w => {
            s.isMobile || Rt.dispatchEvent("mousedown", {
                clientX: w.clientX,
                clientY: w.clientY
            }),
            p("down")
        }
        ),
        window.addEventListener("mousemove", w => {
            Rt.dispatchEvent("mousemove", {
                clientX: w.clientX,
                clientY: w.clientY
            })
        }
        ),
        window.addEventListener("mouseup", () => {
            s.isMobile || Rt.dispatchEvent("mouseup")
        }
        ),
        i.mouse.x = innerWidth / 2,
        i.mouse.y = innerHeight / 2;
        let f = [1, 2, 3, 4, 5, 6]
          , p = w => {
            let x = Math.floor(Math.random() * 5) + 1;
            if (w == "hover")
                z0.play(w + x);
            else if (w == "up" || w == "down")
                $0.play(w + x);
            else if (w == "duck")
                this.duckTimeout && clearTimeout(this.duckTimeout),
                U0.play(),
                this.duck = !0,
                this.duckTimeout = setTimeout( () => {
                    this.duck = !1
                }
                , 1e3);
            else if (w == "hover_cursor")
                document.body.style.cursor = "pointer";
            else if (w == "hover_nocursor")
                document.body.style.cursor = "default";
            else if (w != "phrase") {
                if (w == "keystroke") {
                    f.length == 0 && (f = [1, 2, 3, 4, 5, 6]);
                    let P = f[Math.floor(Math.random() * f.length)];
                    f = f.filter(E => E != P),
                    K0.play(String(P))
                }
            }
        }
        ;
        $on("content", w => {
            w != "" && p("hover")
        }
        ),
        $on("imageContent", w => {
            w != "" && p("hover")
        }
        ),
        $on("openDverso", () => {
            Rt.dispatchEvent("openDverso"),
            setTimeout( () => {
                window.location.href = "https://dverso.io/map/home"
            }
            , 700)
        }
        ),
        await Rt.render(d ? km(h, [h]) : h, 1, Ai( () => {
            $emit("loaded_env"),
            this.loaderCb()
        }
        ), r, s.tier, s.isMobile, o, Ai(w => {
            p(w)
        }
        ), Ai(w => {
            location.href = w
        }
        ), Ai(w => {
            $emit(w)
        }
        )),
        Rt.setSize(window.innerWidth, window.innerHeight),
        Rt.dispatchEvent("resize");
        let y = "";
        o instanceof ArrayBuffer && $on("tick", () => {
            let w = JSON.stringify(i);
            w != y && (y = w,
            Rt.patchSab(w))
        }
        ),
        cr.Howler.volume($u)
    }
}
  , GA = {
    ref: "canvas"
};
function XA(e, t, r, o, i, s) {
    return _e(),
    Oe("div", null, [D("canvas", GA, null, 512)])
}
const JA = ir(WA, [["render", XA]]);
let W0;
const YA = {
    mounted() {
        if (typeof window < "u") {
            let s = function() {
                t += (o - t) / 20,
                r += (i - r) / 20,
                e.style.transform = `translate(${Math.round(t)}px, ${Math.round(r)}px)`,
                requestAnimationFrame( () => {
                    s()
                }
                )
            };
            const e = document.querySelector(".interactive");
            let t = 0
              , r = 0
              , o = 0
              , i = 0;
            window.addEventListener("mousemove", W0 = c => {
                o = c.clientX,
                i = c.clientY
            }
            ),
            s()
        }
    },
    beforeDestroy() {
        typeof window < "u" && window.removeEventListener("mousemove", W0)
    }
}
  , ZA = {
    class: "gradient-bg"
};
function QA(e, t, r, o, i, s) {
    return _e(),
    Oe("div", ZA, t[0] || (t[0] = [Yi('<svg xmlns="http://www.w3.org/2000/svg" data-v-b72e4647><defs data-v-b72e4647><filter id="goo" data-v-b72e4647><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" data-v-b72e4647></feGaussianBlur><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" data-v-b72e4647></feColorMatrix><feBlend in="SourceGraphic" in2="goo" data-v-b72e4647></feBlend></filter></defs></svg><div class="gradients-container" data-v-b72e4647><div class="g1" data-v-b72e4647></div><div class="g2" data-v-b72e4647></div><div class="g3" data-v-b72e4647></div><div class="g4" data-v-b72e4647></div><div class="g5" data-v-b72e4647></div><div class="interactive" data-v-b72e4647></div></div>', 2)]))
}
const e7 = ir(YA, [["render", QA], ["__scopeId", "data-v-b72e4647"]]);
let G0, X0;
class _d {
    x = 0;
    y = 0;
    constructor(t=0, r=0) {
        this.x = t,
        this.y = r
    }
    set(t, r) {
        this.x = t,
        this.y = r
    }
}
let oa = new _d
  , bi = new _d
  , ia = new _d
  , zu = !1;
const t7 = {
    inject: ["sheet", "raf"],
    data() {
        return {
            moved: !1,
            _isTouch: "ontouchstart"in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
            isIpad: navigator.platform === "iPad" || navigator.platform === "MacIntel" && window.maxTouchPoints > 0 && !window.MSStream,
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            mouseCursor: "",
            height: 0,
            content: "",
            imageContent: "",
            cool: "#000000",
            transform: {
                pointerMultiplier: 0,
                pm: 0,
                x: 0,
                y: 0,
                angle: 0,
                squeeze: 1
            }
        }
    },
    computed: {
        isTouch() {
            return this.isIpad || this.isMobile || this._isTouch
        }
    },
    mounted() {
        let t = this.sheet().object("Mouse", {
            color: Ee.types.rgba({
                r: 0,
                g: 0,
                b: 0,
                a: 1
            })
        });
        $on("imageContent", c => {
            this.imageContent = c
        }
        ),
        $on("content", c => {
            this.content = c
        }
        ),
        t.onValuesChange(c => {
            this.color = this.toHex(c.color)
        }
        , this.raf()),
        window.addEventListener("mousemove", G0 = c => {
            oa.x = c.clientX,
            oa.y = c.clientY,
            this.height = window.innerHeight,
            this.moved == !1 && (this.moved = !0,
            requestAnimationFrame(s))
        }
        );
        function r(c, d) {
            return Math.atan2(d, c) * 180 / Math.PI
        }
        function o(c, d) {
            const h = Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2));
            return Math.min(h / 1500, .15)
        }
        document.addEventListener("mouseover", X0 = c => {
            var d = getComputedStyle(c.target).cursor;
            this.mouseCursor = d,
            this.mouseCursor === "pointer" ? this.transform.pointerMultiplier = 0 : this.transform.pointerMultiplier = 1
        }
        );
        let i = performance.now()
          , s = c => {
            if (!zu)
                return;
            let d = c - i;
            i = c,
            requestAnimationFrame(s),
            ia.set(oa.x, oa.y),
            U9(bi, ia, .3, d / 350),
            this.transform.x = bi.x,
            this.transform.y = bi.y;
            const h = Math.round(ia.x - bi.x)
              , _ = Math.round(ia.y - bi.y);
            this.transform.angle = r(h, _) * Math.PI / 180,
            this.transform.squeeze = o(h, _),
            qo(this.transform, "pm", this.transform.pointerMultiplier, .3, d / 350)
        }
        ;
        zu = !0
    },
    methods: {
        toHex(e) {
            const t = r => Math.round(r * 255).toString(16).padStart(2, "0");
            return "#" + t(e.r) + t(e.g) + t(e.b) + t(e.a)
        }
    },
    beforeUnmount() {
        zu = !1,
        window.removeEventListener("mousemove", G0),
        document.removeEventListener("mouseover", X0)
    }
}
  , r7 = ["src"]
  , n7 = ["src"];
function o7(e, t, r, o, i, s) {
    const c = ts;
    return _e(),
    Oe("div", null, [we(to, null, {
        default: nr( () => [!s.isTouch && i.moved ? (_e(),
        Oe("div", {
            key: 0,
            class: "cursor",
            style: rt({
                "--background": e.color,
                transform: "translate3d(" + i.transform.x + "px," + i.transform.y + "px,0px) rotate(" + i.transform.angle + "rad) scale(" + (1 + i.transform.pm + i.transform.squeeze) + ", " + (1 + i.transform.pm - i.transform.squeeze) + ")"
            })
        }, null, 4)) : jt("", !0)]),
        _: 1
    }), we(to, null, {
        default: nr( () => [!s.isTouch && (i.content != "" || i.imageContent != "") ? (_e(),
        Oe("div", {
            key: i.content + "_" + i.imageContent,
            class: "cursor_content",
            style: rt({
                "--background": e.color,
                transform: "translate3d(" + i.transform.x + "px ," + (i.transform.y + 10) + "px,0px)"
            })
        }, [i.content != "" ? (_e(),
        Oe("span", {
            key: 0,
            class: gr({
                upside: i.transform.y > i.height / 1.5
            })
        }, [we(c, {
            inline: !0,
            text: i.content
        }, null, 8, ["text"])], 2)) : jt("", !0), i.imageContent != "" && i.imageContent.endsWith(".mp4") ? (_e(),
        Oe("video", {
            key: 1,
            playsinline: "true",
            autoplay: "",
            muted: "",
            controls: !1,
            loop: "",
            crossorigin: "anonymous",
            src: i.imageContent,
            alt: "Image"
        }, null, 8, r7)) : i.imageContent != "" ? (_e(),
        Oe("img", {
            key: 2,
            crossorigin: "anonymous",
            src: i.imageContent,
            alt: "Image"
        }, null, 8, n7)) : jt("", !0)], 4)) : jt("", !0)]),
        _: 1
    })])
}
const i7 = ir(t7, [["render", o7], ["__scopeId", "data-v-b452f100"]])
  , s7 = JSON.parse('{"Scene":{"staticOverrides":{"byObject":{"Camera":{"position":{"y":0.9,"z":3.34},"fov":25},"Chromatic Aberration":{"modulationOffset":0.27088607594936703,"radialModulation":false},"Tonemapping":{"mode":"5"},"Vignette":{"eskil":true,"darkness":0.1518987341772153,"offset":0},"PCSS":{"size":12.759493670886075,"samples":8.911392405063298,"focus":6.468354430379748},"Directional Light":{"intensity":5.5},"N8AO":{"aoSamples":16,"intensity":6.556962025316452,"distanceFalloff":0.18037974683544297},"Naive Animation":{"timeScale":1},"Camera Animation":{"time":0},"Scene Control":{"smartphoneOpacity":1,"skinnedMeshesVisibility":true,"impostorVisible":false},"svg_logo":{"strokeDashoffset":1000,"fillColor":{"r":0,"g":0,"b":0,"a":0},"color":{"r":0,"g":0,"b":0,"a":1}},"Metaverse section":{"pixelizationThreshold":-4.968354430379734},"Perlin Alpha":{"perlinAlpha":1}}},"sequence":{"subUnitsPerUnit":30,"length":10,"type":"PositionalSequence","tracksByObject":{"Tonemapping":{"trackData":{"7CImCbgyJy":{"type":"BasicKeyframedTrack","__debugName":"Tonemapping:[\\"adaptationRate\\"]","keyframes":[]}},"trackIdByPropPath":{"[\\"adaptationRate\\"]":"7CImCbgyJy"}},"Bosk Animation":{"trackData":{"qToETWO9CX":{"type":"BasicKeyframedTrack","__debugName":"Bosk Animation:[\\"animation_bosk_animation_time\\"]","keyframes":[{"id":"_sxAvVWaxB","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"h6Ld8T3S26","position":1,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1.6033754891987089}]},"XnYhK7LyFS":{"type":"BasicKeyframedTrack","__debugName":"Bosk Animation:[\\"time\\"]","keyframes":[{"id":"59QMUdSUx0","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"121QzZ5MHx","position":0.867,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1.5}]}},"trackIdByPropPath":{"[\\"animation_bosk_animation_time\\"]":"qToETWO9CX","[\\"time\\"]":"XnYhK7LyFS"}},"Naive Animation":{"trackData":{"uKIGu1MLiF":{"type":"BasicKeyframedTrack","__debugName":"Naive Animation:[\\"animation_naive_animation_strenght\\"]","keyframes":[{"id":"M0Vqxf0Z9_","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"jdNDZFnoHo","position":1,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]}},"trackIdByPropPath":{"[\\"animation_naive_animation_strenght\\"]":"uKIGu1MLiF"}},"Camera Animation":{"trackData":{"4wybioJddt":{"type":"BasicKeyframedTrack","__debugName":"Camera Animation:[\\"time\\"]","keyframes":[{"id":"56MSTeKZiu","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"hvUNJlLsVs","position":0.867,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1.5}]}},"trackIdByPropPath":{"[\\"time\\"]":"4wybioJddt"}},"Camera":{"trackData":{"BWu9cDJ9Ue":{"type":"BasicKeyframedTrack","__debugName":"Camera:[\\"fov\\"]","keyframes":[{"id":"YeICTX4ODV","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":25},{"id":"8nWNlrQ7Ji","position":0.4,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":25},{"id":"szeWaEyByQ","position":0.867,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":6}]}},"trackIdByPropPath":{"[\\"fov\\"]":"BWu9cDJ9Ue"}},"Scene Control":{"trackData":{"mhLkQK_4o0":{"type":"BasicKeyframedTrack","__debugName":"Scene Control:[\\"sceneVisibility\\"]","keyframes":[{"id":"EYcoF2XdwW","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":true},{"id":"EjUmUK8jvV","position":1.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":true},{"id":"FuTWndemWT","position":2,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":false}]},"XteWWGgpl5":{"type":"BasicKeyframedTrack","__debugName":"Scene Control:[\\"skinnedMeshesVisibility\\"]","keyframes":[{"id":"Uh9uq92Ry0","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":true},{"id":"s-tcZcv21E","position":0.833,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":false}]},"7ST4qb8ENy":{"type":"BasicKeyframedTrack","__debugName":"Scene Control:[\\"smartphoneOpacity\\"]","keyframes":[{"id":"PoLBLo8HDL","position":0.833,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"Ct6JqU7za4","position":1.267,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"hr7t_fXXGH":{"type":"BasicKeyframedTrack","__debugName":"Scene Control:[\\"impostorVisible\\"]","keyframes":[{"id":"et-PeXTCnR","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":false},{"id":"TL3jU8of2E","position":0.833,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":true}]}},"trackIdByPropPath":{"[\\"sceneVisibility\\"]":"mhLkQK_4o0","[\\"skinnedMeshesVisibility\\"]":"XteWWGgpl5","[\\"smartphoneOpacity\\"]":"7ST4qb8ENy","[\\"impostorVisible\\"]":"hr7t_fXXGH"}},"svg_logo":{"trackData":{"k0qD4UGA9w":{"type":"BasicKeyframedTrack","__debugName":"svg_logo:[\\"strokeDasharray\\"]","keyframes":[{"id":"mHd3OTnFEr","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":10000},{"id":"KqJIVYU6hy","position":0.667,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":10000},{"id":"yb0hTFB7mP","position":0.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":10000},{"id":"00nlaGWpag","position":1.4,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":10000}]},"h2fh9KMCgT":{"type":"BasicKeyframedTrack","__debugName":"svg_logo:[\\"strokeDashoffset\\"]","keyframes":[{"id":"RFqPnNb80J","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"eLc9U_s4rZ","position":0.5,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"Ua7kKabmdi","position":0.667,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1000},{"id":"0xOPbZZaYL","position":0.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":10000},{"id":"_iIeHcg5dB","position":1.4,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"gdVRwTEPb7":{"type":"BasicKeyframedTrack","__debugName":"svg_logo:[\\"reposition\\"]","keyframes":[{"id":"nnpSxevhRa","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":false},{"id":"pzhse0yVj_","position":0.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":true}]},"ls-T_J3b9G":{"type":"BasicKeyframedTrack","__debugName":"svg_logo:[\\"fillColor\\"]","keyframes":[{"id":"i74qWZAMWw","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0.9882352941176471,"g":0.9647058823529412,"b":0.9058823529411765,"a":1}},{"id":"ocWPdbrjST","position":0.5,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0.9882352941176471,"g":0.9647058823529412,"b":0.9058823529411765,"a":1}},{"id":"WeU1QJHf62","position":0.667,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0,"b":0,"a":1}},{"id":"1AkFk5U6Wo","position":0.867,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0.9882352941176471,"g":0.9647058823529412,"b":0.9058823529411765,"a":1}},{"id":"McL0qpjb-V","position":0.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":0}},{"id":"6cYJpLeVcF","position":1.167,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":0}},{"id":"jDRgc1WNaj","position":1.4,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":1}},{"id":"4JAoQg2Lqp","position":3.533,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":1}},{"id":"fPiZfRslC-","position":3.733,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0,"b":0,"a":1}},{"id":"Dmnsy9Aa8r","position":3.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0,"b":0,"a":1}},{"id":"lvfBqPV5Vj","position":4.767,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":1}}]},"gbDSyhrU_h":{"type":"BasicKeyframedTrack","__debugName":"svg_logo:[\\"color\\"]","keyframes":[{"id":"6AdmAV8UTI","position":0.867,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":7.29086770317312e-10,"g":7.290866795869652e-10,"b":7.290864339967155e-10,"a":0.9996164350741348}},{"id":"67t4QFL_Gz","position":0.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":1}},{"id":"OIxniK1hdx","position":1.2,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":1}},{"id":"B3Db2eqwSZ","position":1.4,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":0}},{"id":"J--tEf0tyf","position":3.533,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":0}},{"id":"CRBJqBLJ8a","position":3.733,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0,"b":0,"a":0}},{"id":"Yauiju0dkC","position":3.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0,"b":0,"a":0}}]},"mXiF1kchsl":{"type":"BasicKeyframedTrack","__debugName":"svg_logo:[\\"headerColor\\"]","keyframes":[{"id":"PNajRPcCJp","position":0.867,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0,"b":0,"a":1}},{"id":"fo59_oCZz7","position":0.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":1}}]},"SJ5MR9gTHT":{"type":"BasicKeyframedTrack","__debugName":"svg_logo:[\\"textColor\\"]","keyframes":[{"id":"uqyz2Siee-","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0,"b":0,"a":1}},{"id":"YC9FSCf5Uu","position":0.667,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":1}},{"id":"dbTRBJPL-A","position":3.733,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":1}},{"id":"RpCLqjdXDX","position":3.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0,"b":0,"a":1}},{"id":"-itO20bbLz","position":4.067,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0,"b":0,"a":1}},{"id":"a4chuPH0j8","position":4.333,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":1}}]},"CN_wFjZezU":{"type":"BasicKeyframedTrack","__debugName":"svg_logo:[\\"reached_end\\"]","keyframes":[{"id":"yKj7yHdpI9","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":false},{"id":"O2JY3HGGMb","position":4.1,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":true}]}},"trackIdByPropPath":{"[\\"strokeDasharray\\"]":"k0qD4UGA9w","[\\"strokeDashoffset\\"]":"h2fh9KMCgT","[\\"reposition\\"]":"gdVRwTEPb7","[\\"fillColor\\"]":"ls-T_J3b9G","[\\"color\\"]":"gbDSyhrU_h","[\\"headerColor\\"]":"mXiF1kchsl","[\\"textColor\\"]":"SJ5MR9gTHT","[\\"reached_end\\"]":"CN_wFjZezU"}},"Cubes Impostor":{"trackData":{"3AYZVaD7kS":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"opacity\\"]","keyframes":[{"id":"Lk_kRE8RQd","position":0.5,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"Bgcx1th5Ck","position":0.933,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"iDpmo9Aidx","position":1.033,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"IFCjFlXtP6","position":1.133,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"7_tmtMSE-A","position":4.133,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"7OWiEL3C2p","position":4.267,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"8Di6okeNQS","position":4.3,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.9949516209852439},{"id":"-YeV8SC8q3","position":4.433,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"Geu9VGKOLf":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"textOpacity\\"]","keyframes":[{"id":"mBNk3o-Fvk","position":1.067,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"tv1jfJleSq","position":1.2,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"aTKtCpCY4O","position":1.533,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"1aD7X54vF6","position":1.667,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"UL5qqZNxQa":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"transform\\"]","keyframes":[{"id":"k5axauc-Hw","position":1.067,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"K4iIKkayk6","position":1.667,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-1}]},"Jt2jgDM5i6":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"cardLeft\\",\\"x\\"]","keyframes":[{"id":"RPQ6BRhwfw","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"dVtb8JZlq8","position":2.067,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":4}]},"sNBFr_DaO1":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"cardLeft\\",\\"y\\"]","keyframes":[{"id":"iukBKs-QPP","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":200},{"id":"2o2lql6Gwc","position":2.1,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-40.506329113924},{"id":"Cw-zTBGqI5","position":2.567,"connectedRight":true,"handles":[0.955,0.132,0.5,0],"type":"bezier","value":-300}]},"YenVL6I9RD":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"cardLeft\\",\\"rotateX\\"]","keyframes":[{"id":"DwaQW6gzNF","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":22.78481012658228},{"id":"ag5fPMEBCt","position":2.033,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"0qaIyv6WsN":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"cardLeft\\",\\"rotateY\\"]","keyframes":[{"id":"Y3Hfmwst3D","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":54.68354430379748},{"id":"1vynhHkpYt","position":2.033,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"Pkmibu47DO":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"cardRight\\",\\"x\\"]","keyframes":[{"id":"gYTmVW4owU","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"lBs-h3z-vn","position":2.067,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-8}]},"GDzm07BNsz":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"cardRight\\",\\"y\\"]","keyframes":[{"id":"w8xrO4_VFG","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":200},{"id":"F6WPEmrlwW","position":2.1,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-25.316455696202475},{"id":"6FGpGJdlKR","position":2.567,"connectedRight":true,"handles":[0.913,-0.023,0.5,0],"type":"bezier","value":-300}]},"Q06qHOubgX":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"cardRight\\",\\"rotateX\\"]","keyframes":[{"id":"ZXkYn4TA2W","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":59.24050632911394},{"id":"Moie7XZIfh","position":2.033,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":5.329070518200751e-15}]},"SFuluzwyzz":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"cardRight\\",\\"rotateY\\"]","keyframes":[{"id":"ZRfwh1U122","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-109.36708860759492},{"id":"nESlACJ2s5","position":2.033,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"BoWXrxqk9l":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"cardLeft\\",\\"rotateZ\\"]","keyframes":[{"id":"UwXk9BwRzc","position":1.567,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":10},{"id":"Ox4PjCrwxc","position":2.1,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":3}]},"v8Wa1iZ8lN":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"cardRight\\",\\"rotateZ\\"]","keyframes":[{"id":"3bXoUvt1Rm","position":1.567,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-10},{"id":"RyexeDktnm","position":2.1,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-3}]},"qX0lCFKe7h":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"backOpacity\\"]","keyframes":[{"id":"GyvIMIF4Xj","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"7KAh15VK3u","position":0.667,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"WlySQIMzNn","position":0.9,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"vVvl6uVNes","position":3.567,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"4G3GdmsnkS","position":3.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"RpG7MPX60c":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"backgroundColor\\"]","keyframes":[{"id":"oc0SBSxe0L","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0.43529411764705883,"b":1,"a":1}},{"id":"BnHa965Q_T","position":3.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0.00392156862745098,"g":0.00392156862745098,"b":0.00392156862745098,"a":1}},{"id":"zDCYIENz8e","position":4.133,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0.9882352941176471,"g":0.9647058823529412,"b":0.9058823529411765,"a":1}}]},"v2JapYJ6gB":{"type":"BasicKeyframedTrack","__debugName":"Cubes Impostor:[\\"backBackgroundColor\\"]","keyframes":[{"id":"cZXHRJ40fz","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0.43529411764705883,"b":1,"a":1}},{"id":"4ccCrtA8N4","position":3.467,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0.43529411764705883,"b":1,"a":1}}]}},"trackIdByPropPath":{"[\\"opacity\\"]":"3AYZVaD7kS","[\\"textOpacity\\"]":"Geu9VGKOLf","[\\"transform\\"]":"UL5qqZNxQa","[\\"cardLeft\\",\\"x\\"]":"Jt2jgDM5i6","[\\"cardLeft\\",\\"y\\"]":"sNBFr_DaO1","[\\"cardLeft\\",\\"rotateX\\"]":"YenVL6I9RD","[\\"cardLeft\\",\\"rotateY\\"]":"0qaIyv6WsN","[\\"cardRight\\",\\"x\\"]":"Pkmibu47DO","[\\"cardRight\\",\\"y\\"]":"GDzm07BNsz","[\\"cardRight\\",\\"rotateX\\"]":"Q06qHOubgX","[\\"cardRight\\",\\"rotateY\\"]":"SFuluzwyzz","[\\"cardLeft\\",\\"rotateZ\\"]":"BoWXrxqk9l","[\\"cardRight\\",\\"rotateZ\\"]":"v8Wa1iZ8lN","[\\"backOpacity\\"]":"qX0lCFKe7h","[\\"backgroundColor\\"]":"RpG7MPX60c","[\\"backBackgroundColor\\"]":"v2JapYJ6gB"}},"Projects":{"trackData":{"ICo48AbJgp":{"type":"BasicKeyframedTrack","__debugName":"Projects:[\\"textOpacity\\"]","keyframes":[{"id":"vOLQ9FzaMO","position":2.533,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"JtkVJUkjze","position":2.667,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"GLtA3eMHCP","position":3.5,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"NujIsr0hFu","position":3.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"xaFsTQ_J1m":{"type":"BasicKeyframedTrack","__debugName":"Projects:[\\"transform\\"]","keyframes":[{"id":"UXy5MTr8xY","position":2.533,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"L6CjU7TcX6","position":2.667,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"LD9O-mbIun","position":3.5,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"vr2ojttwWr","position":3.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-1}]},"_vQyql1JLz":{"type":"BasicKeyframedTrack","__debugName":"Projects:[\\"projectsScrollerTransform\\"]","keyframes":[{"id":"sadul8NPyf","position":2.567,"connectedRight":true,"handles":[0.5,1,0.5,0.5],"type":"bezier","value":0},{"id":"0a_czZSWtW","position":4.067,"connectedRight":true,"handles":[0.5,0.5,0.5,0],"type":"bezier","value":100}]}},"trackIdByPropPath":{"[\\"textOpacity\\"]":"ICo48AbJgp","[\\"transform\\"]":"xaFsTQ_J1m","[\\"projectsScrollerTransform\\"]":"_vQyql1JLz"}},"Metaverse section":{"trackData":{"oKE2pOFauK":{"type":"BasicKeyframedTrack","__debugName":"Metaverse section:[\\"opacity\\"]","keyframes":[{"id":"npqCFZk89a","position":3.633,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"GUWSUL3JMB","position":3.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"hrGJdxuc5z","position":4.4,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.1712470037295134},{"id":"oI4u6Vm_SZ","position":4.433,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"6z6UPNdbhK":{"type":"BasicKeyframedTrack","__debugName":"Metaverse section:[\\"textOpacity\\"]","keyframes":[{"id":"NJ_BkjONPi","position":3.633,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"hCNEuDuBQ3","position":3.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"05WwGg34c-","position":4.4,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.13005936346662117},{"id":"fa2otHXpba","position":4.433,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"I45P0hiuHg":{"type":"BasicKeyframedTrack","__debugName":"Metaverse section:[\\"transform\\"]","keyframes":[{"id":"2_F0n9MRvr","position":3.4,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"GunFRNfsdr","position":3.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"PX90a7JM5t","position":4.233,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-1}]},"dySAYzi6gu":{"type":"BasicKeyframedTrack","__debugName":"Metaverse section:[\\"pixelizationThreshold\\"]","keyframes":[{"id":"DEm6QPUMfe","position":4.033,"connectedRight":true,"handles":[0.5,1,0.25,0.46],"type":"bezier","value":-1},{"id":"DtqmD40LF6","position":4.4,"connectedRight":true,"handles":[0.45,0.94,0.455,0.03],"type":"bezier","value":1},{"id":"ET1Y_dnDWZ","position":4.767,"connectedRight":true,"handles":[0.515,0.955,0.5,0],"type":"bezier","value":-1}]},"UFwH2AN13R":{"type":"BasicKeyframedTrack","__debugName":"Metaverse section:[\\"backgroundColor\\"]","keyframes":[{"id":"ckEfshvQyg","position":4.2,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0.17254901960784313,"g":0.17254901960784313,"b":0.17254901960784313,"a":1}},{"id":"lrBJgF0oSE","position":4.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0,"b":0,"a":1}}]}},"trackIdByPropPath":{"[\\"opacity\\"]":"oKE2pOFauK","[\\"textOpacity\\"]":"6z6UPNdbhK","[\\"transform\\"]":"I45P0hiuHg","[\\"pixelizationThreshold\\"]":"dySAYzi6gu","[\\"backgroundColor\\"]":"UFwH2AN13R"}},"Keyframes":{"trackData":{"mNNj-IDT9C":{"type":"BasicKeyframedTrack","__debugName":"Keyframes:[\\"keyframes\\"]","keyframes":[{"id":"FalpwPkW73","position":0.5,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":true},{"id":"8uWu9T2oye","position":1.367,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":true},{"id":"ipRevXe8y9","position":2.1,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":true},{"id":"QJc1ULQ_4o","position":2.767,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":false},{"id":"RrZjrHQZJ_","position":3.367,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":false},{"id":"lkYRwkiBB9","position":3.967,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":true},{"id":"Ok78bfH-4V","position":4.767,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":true}]}},"trackIdByPropPath":{"[\\"keyframes\\"]":"mNNj-IDT9C"}},"Mouse":{"trackData":{"lWAP3GY2LS":{"type":"BasicKeyframedTrack","__debugName":"Mouse:[\\"color\\"]","keyframes":[{"id":"QAatec3OKI","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0,"b":0,"a":1}},{"id":"lr6VHkY3T5","position":0.7,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0,"b":0,"a":1}},{"id":"MHApVUBuyv","position":0.933,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":1}},{"id":"uNtvrFlclt","position":3.367,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":1,"g":1,"b":1,"a":1}},{"id":"z0UHsuZvdO","position":3.767,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":{"r":0,"g":0,"b":0,"a":1}}]}},"trackIdByPropPath":{"[\\"color\\"]":"lWAP3GY2LS"}}}}}}')
  , a7 = "0.4.0"
  , l7 = ["yO2sgEKU3igJ6ggK", "dpD1pNUP1oiE-ykg", "sl5mkW_BEsKvphmt", "CC5WDIijwwCs_MT0", "GV6JUKfJEVxWxM9Z", "9LjRz7Yf_J7y3tVy", "KaFPNB3YHFbi0DJE", "roiDYhPF5INLjItW", "IQzCBmBuN1tvQV5d", "YgfvTf7-1barYu5k", "259srwg8EYKXJZEQ", "HHG421ff641vZoCd", "omlxXMm6UgkQlvbz", "TOrUiAFcIS78mlxq", "PG-n7mMg-QIUgnkc", "5sMwlehUM_gl2b4A", "OMXweCxjYsK1we_b", "2A98GZb-KhLdm2ll", "etEXZgsNQBNixjlK", "W69qx9MXJNG1eyf2", "749Lp81wBDrfAeOq", "zJxrbdrNO1O6uEcI", "EP6LfO3eQ7XnbPzu", "in1d_iJfPxFE9lBy", "O_prtQSEh9rm4n0X", "sW0JGy9Q9RyF9UlP", "EoPAKoqZ8oRywNE9", "-syoNNTwxfjERARU", "BIz6dosQo8sMwbwt", "-xyZnMX193iz0nbB", "8MGJyGnpqTSOeqCz", "pm4MXPcCx00G7TjX", "9zlMDJGPQ_hqpKx0", "AteyR_03KghaQuX-", "kXLvUs_HqaGRjo4f"]
  , J0 = {
    sheetsById: s7,
    definitionVersion: a7,
    revisionHistory: l7
};
let Co, Uu, sa, aa, qu = _t(0);
const c7 = {
    async setup() {
        return {
            projects: (await BP("/api/projects", "$O5ue-YpHCB")).data
        }
    },
    provide() {
        return {
            time: nt( () => qu.value),
            sheet: () => Co,
            projects: this.projects,
            raf: () => Uu,
            cs: () => aa
        }
    },
    data() {
        return {
            completion: 0,
            completionDamp: 0,
            showLoader: !0,
            showLoaderFix: !0,
            initCs: !1
        }
    },
    created() {
        typeof window < "u" && sa == null && (Uu = Ee.createRafDriver({
            name: "custom_driver_raf"
        }),
        sa = Ee.getProject("dverso - ui", {
            state: J0
        }),
        Co = sa.sheet("Scene"),
        Co.object("Keyframes", {
            keyframes: Ee.types.boolean(!0)
        }),
        qu = _t(0))
    },
    async mounted() {
        if (typeof window < "u") {
            let e = J0.sheetsById.Scene.sequence.tracksByObject.Keyframes
              , t = e.trackData[e.trackIdByPropPath['["keyframes"]']].keyframes.map(s => s.position);
            aa = (await qr( () => import("./BCdXsNjA.js").then(s => s.t), [], import.meta.url)).getCoordinatedScrolling({
                keyframes: t,
                canScroll: this.showLoaderFix
            }),
            this.initCs = !0,
            Kr(aa.wheelRef, s => {
                Co.sequence.position = .5 + Math.max(0, s * .001)
            }
            ),
            sa.ready.then(async () => {
                setTimeout( () => {
                    Co.sequence.play({
                        range: [0, .5],
                        rate: .2
                    })
                }
                , 600)
            }
            );
            let o = 0
              , i = s => {
                let c = s - o;
                o = s,
                this.completion < 80 && (this.completion += .4),
                Uu.tick(s),
                aa.updateRef(c),
                qo(this, "completionDamp", this.completion, .1),
                qu.value = Co.sequence.position,
                $emit("tick", c),
                requestAnimationFrame(i)
            }
            ;
            i()
        }
    },
    methods: {
        loaderCb() {
            this.completion = 100,
            setTimeout( () => {
                this.showLoader = !1,
                setTimeout( () => {
                    this.showLoaderFix = !1
                }
                , 600)
            }
            , 250)
        }
    }
}
  , u7 = {
    key: 0
}
  , f7 = {
    key: 1
};
function d7(e, t, r, o, i, s) {
    const c = C9
      , d = aA
      , h = RA
      , _ = JA
      , g = Ra
      , l = e7
      , f = i7
      , p = Ra;
    return (e._.provides[Wo] || e.$route).path.startsWith("/slides") ? (_e(),
    Oe("div", u7, [we(c)])) : (_e(),
    Oe("div", f7, [D("div", null, [we(d), we(h), we(g, null, {
        default: nr( () => [i.initCs ? (_e(),
        Vt(_, {
            key: 0,
            loaderCb: s.loaderCb
        }, null, 8, ["loaderCb"])) : jt("", !0)]),
        _: 1
    }), we(to, {
        name: "slide"
    }, {
        default: nr( () => [i.showLoaderFix ? (_e(),
        Oe("div", {
            key: 0,
            class: gr(["loader", {
                show: i.showLoader
            }])
        }, [we(l), D("div", {
            class: "loadingBar",
            style: rt({
                "--completion": i.completionDamp + "%"
            })
        }, t[0] || (t[0] = [D("p", null, " LOADING ", -1)]), 4), t[1] || (t[1] = D("svg", {
            width: "300",
            viewBox: "0 0 140 30",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
        }, [D("path", {
            d: "M128.906 5.24269H126.681C120.264 5.24269 117.139 6.85362 115.587 8.69284C115.438 8.87184 115.156 8.79142 115.102 8.56314C114.666 6.65388 112.513 5.24269 105.593 5.24269H103.53C97.3906 5.24269 94.6325 6.04167 93.5035 7.72784C93.3855 7.90164 93.1315 7.89646 93.0289 7.71227C92.2874 6.38409 90.8044 5.3231 87.982 5.3231H87.6562C84.7389 5.3231 82.7864 6.76802 81.7267 7.85495C81.5343 8.0521 81.2059 7.88089 81.2521 7.60851L81.2598 7.55922C81.4266 6.56308 80.6645 5.65515 79.6664 5.65515H73.3239C72.5285 5.65515 71.8512 6.23882 71.728 7.03521L71.4073 9.08715C71.3663 9.35693 71.0019 9.4166 70.8813 9.17275C69.8242 7.03002 66.9994 5.24269 60.1385 5.24269H58.9711C54.5965 5.24269 51.7896 6.02351 49.9808 7.12601C49.7396 7.27387 49.4599 7.00668 49.5882 6.75245C49.8448 6.2492 49.4856 5.65255 48.9262 5.65255H41.1546C40.4721 5.65255 39.8589 6.06761 39.5972 6.70317L36.78 13.5698C36.6722 13.8344 36.2848 13.7877 36.2437 13.5023L35.3047 7.10525C35.1815 6.26995 34.4734 5.65255 33.6369 5.65255H26.3631C26.1911 5.65255 26.0603 5.49691 26.086 5.3257L26.6248 1.88591C26.7813 0.894966 26.0244 0 25.0314 0H18.6607C17.8679 0 17.1931 0.58108 17.0673 1.37228L16.4875 5.03775C16.3156 6.11949 15.1995 6.75245 14.1886 6.35556C13.0879 5.92234 11.5433 5.54101 9.44195 5.54101H8.87235C3.30981 5.54101 0.759462 8.58649 0.161643 11.99C0.0538819 12.6203 0 13.3882 0 14.0211C0 17.422 2.00898 20.5246 7.10968 20.5246H7.57152C10.9301 20.5246 12.8493 19.5621 13.8422 18.8773C14.0449 18.7372 14.3169 18.9084 14.2784 19.1523C14.1758 19.8164 14.6838 20.413 15.3483 20.413H22.2809C23.1097 20.413 23.8153 19.8034 23.9461 18.9759L25.3598 9.97174C25.4086 9.66823 25.8345 9.64748 25.9089 9.9458L28.2053 19.1315C28.3926 19.8838 29.0622 20.4104 29.8319 20.4104H41.6036C42.2219 20.4104 42.7864 20.0628 43.0712 19.5077L46.0706 13.6398C46.2065 13.3752 46.5991 13.4738 46.5991 13.7695C46.5991 16.732 48.0103 20.8203 57.914 20.8203H59.1071C65.0135 20.8203 67.9666 19.5855 69.4804 18.1354C69.6754 17.9486 69.9961 18.112 69.9525 18.3818L69.932 18.5193C69.7781 19.5103 70.535 20.4078 71.5279 20.4078H77.8884C78.6838 20.4078 79.3611 19.8241 79.4843 19.0278L80.3541 13.466C80.6517 11.5178 81.3316 10.8589 82.499 10.8589C83.8024 10.8589 84.1822 11.8732 83.9923 12.8901C83.864 13.6969 84.4798 14.4258 85.288 14.4258H92.077C92.721 14.4258 93.2675 13.9537 93.3727 13.3129L93.4394 12.8979C93.4753 12.6696 93.7524 12.5788 93.9115 12.7422C94.8428 13.7047 96.4926 14.3973 99.2431 14.5633L102.907 14.7838C104.318 14.8668 104.616 15.2222 104.616 15.7981C104.616 16.3195 104.208 16.7864 103.043 16.7864H102.989C102.24 16.7864 101.824 16.5011 101.609 16.1353C101.337 15.6684 100.865 15.3597 100.328 15.3597H93.3265C92.3028 15.3597 91.5869 16.4103 91.9743 17.3675C92.6825 19.1056 94.9737 20.8203 101.411 20.8203H103.556C111.371 20.8203 113.675 19.339 114.453 17.3156C114.535 17.1029 114.817 17.0744 114.945 17.2638C116.233 19.1652 119.076 20.8229 125.101 20.8229H127.246C138.399 20.8229 139.566 16.1042 139.892 13.5257C139.974 12.8668 140 12.3194 140 11.9614C140 9.27133 138.561 5.24009 128.901 5.24009L128.906 5.24269ZM15.2559 13.2818C15.0378 14.3532 14.3323 15.8344 12.1616 15.8344H12.0539C10.4529 15.8344 9.85504 14.6826 9.85504 13.4478C9.85504 11.9121 10.5067 10.1274 12.7595 10.1274H12.8672C14.7402 10.1274 15.3355 11.3077 15.3355 12.405C15.3355 12.7059 15.3073 13.0094 15.2534 13.2818H15.2559ZM59.4894 9.24798C61.3034 9.24798 61.891 9.80572 62.068 10.5476C62.109 10.724 61.9756 10.8952 61.7934 10.8952H56.8467C56.6389 10.8952 56.5054 10.6747 56.5952 10.4854C56.9134 9.80571 57.6523 9.24798 59.4894 9.24798ZM70.281 14.763H62.5427C62.05 14.763 61.5933 14.9965 61.27 15.3727C60.9031 15.8007 60.1565 16.2728 58.6478 16.2728C56.526 16.2728 55.9307 15.1158 55.941 14.1431C55.941 13.9874 56.0667 13.8577 56.2206 13.8577H70.3348C70.5067 13.8577 70.6376 14.0134 70.6119 14.1846L70.558 14.5244C70.5375 14.6619 70.4195 14.763 70.281 14.763ZM114.063 12.3765C114.053 12.4258 114.045 12.475 114.037 12.5269C113.075 11.4867 111.148 10.8693 107.713 10.6488L104.103 10.4568C102.72 10.3479 102.473 10.0444 102.473 9.6345C102.473 9.30505 102.581 8.81217 104.103 8.81217H104.157C104.998 8.81217 105.398 9.02229 105.591 9.2817C105.873 9.66823 106.307 9.90948 106.781 9.90948H114.345C114.548 9.90948 114.681 10.1196 114.602 10.3064C114.284 11.0561 114.142 11.7746 114.065 12.3791L114.063 12.3765ZM126.681 16.1898H126.627C124.375 16.1898 123.805 14.7345 123.805 13.5283C123.805 12.322 124.292 9.85241 127.251 9.85241H127.305C129.583 9.85241 130.209 11.1417 130.209 12.322C130.209 13.5023 129.722 16.1898 126.681 16.1898Z",
            fill: "white"
        }), D("path", {
            d: "M10.948 30V29.1106H10.0562V28.1125H11.046V29.0118H13.6136V27.3121H10.948V26.4227H10.0562V24.5451H10.948V23.6458H13.7116V24.5451H14.6132V25.5333H13.6136V24.6439H11.046V26.3338H13.7116V27.2133H14.6132V29.1106H13.7116V30H10.948Z",
            fill: "white"
        }), D("path", {
            d: "M35.0208 30V24.6439H34.2368V25.5333H33.247V24.5451H34.1388V23.6458H36.9024V24.5451H37.804V25.5333H36.8044V24.6439H36.0204V30H35.0208Z",
            fill: "white"
        }), D("path", {
            d: "M57.2243 30V29.1106H56.3325V23.6458H57.3223V29.0118H59.8899V23.6458H60.8895V29.1106H59.9879V30H57.2243Z",
            fill: "white"
        }), D("path", {
            d: "M79.7147 30V23.6458H82.4881V24.5451H83.3701V25.4345H84.2717V28.2114H83.3701V29.1106H82.4881V30H79.7147ZM80.7045 29.0118H82.3901V28.1125H83.2721V25.5333H82.3901V24.6439H80.7045V29.0118Z",
            fill: "white"
        }), D("path", {
            d: "M102.609 30V29.0118H103.501V24.6439H102.609V23.6458H105.382V24.6439H104.481V29.0118H105.382V30H102.609Z",
            fill: "white"
        }), D("path", {
            d: "M125.103 30V29.1106H124.211V24.5451H125.103V23.6458H127.866V24.5451H128.768V29.1106H127.866V30H125.103ZM125.201 29.0118H127.768V24.6439H125.201V29.0118Z",
            fill: "white"
        })], -1))], 2)) : jt("", !0)]),
        _: 1
    }), we(p, null, {
        default: nr( () => [we(f)]),
        _: 1
    })]), o.projects ? (_e(),
    Vt(c, {
        key: 0
    })) : jt("", !0)]))
}
const p7 = ir(c7, [["render", d7]])
  , h7 = {
    __name: "nuxt-error-page",
    props: {
        error: Object
    },
    setup(e) {
        const r = e.error;
        r.stack && r.stack.split(`
`).splice(1).map(l => ({
            text: l.replace("webpack:/", "").replace(".vue", ".js").trim(),
            internal: l.includes("node_modules") && !l.includes(".cache") || l.includes("internal") || l.includes("new Promise")
        })).map(l => `<span class="stack${l.internal ? " internal" : ""}">${l.text}</span>`).join(`
`);
        const o = Number(r.statusCode || 500)
          , i = o === 404
          , s = r.statusMessage ?? (i ? "Page Not Found" : "Internal Server Error")
          , c = r.message || r.toString()
          , d = void 0
          , g = i ? _h( () => qr( () => import("./msUcURIN.js"), __vite__mapDeps([6, 7]), import.meta.url)) : _h( () => qr( () => import("./BCxKoa5J.js"), __vite__mapDeps([8, 9]), import.meta.url));
        return (l, f) => (_e(),
        Vt(ze(g), V6(m_({
            statusCode: ze(o),
            statusMessage: ze(s),
            description: ze(c),
            stack: ze(d)
        })), null, 16))
    }
}
  , g7 = {
    key: 0
}
  , Y0 = {
    __name: "nuxt-root",
    setup(e) {
        const t = () => null
          , r = Ke()
          , o = r.deferHydration();
        if (r.isHydrating) {
            const h = r.hooks.hookOnce("app:error", o);
            Jt().beforeEach(h)
        }
        const i = !1;
        Qn(Wo, Ka()),
        r.hooks.callHookWith(h => h.map(_ => _()), "vue:setup");
        const s = Go()
          , c = !1;
        $g( (h, _, g) => {
            if (r.hooks.callHook("vue:error", h, _, g).catch(l => console.error("[nuxt] Error in `vue:error` hook", l)),
            rC(h) && (h.fatal || h.unhandled))
                return r.runWithContext( () => Ro(h)),
                !1
        }
        );
        const d = !1;
        return (h, _) => (_e(),
        Vt(f_, {
            onResolve: ze(o)
        }, {
            default: nr( () => [ze(c) ? (_e(),
            Oe("div", g7)) : ze(s) ? (_e(),
            Vt(ze(h7), {
                key: 1,
                error: ze(s)
            }, null, 8, ["error"])) : ze(d) ? (_e(),
            Vt(ze(t), {
                key: 2,
                context: ze(d)
            }, null, 8, ["context"])) : ze(i) ? (_e(),
            Vt(L4(ze(i)), {
                key: 3
            })) : (_e(),
            Vt(ze(p7), {
                key: 4
            }))]),
            _: 1
        }, 8, ["onResolve"]))
    }
};
let Z0;
{
    let e;
    Z0 = async function() {
        if (e)
            return e;
        const o = !!(window.__NUXT__?.serverRendered ?? document.getElementById("__NUXT_DATA__")?.dataset.ssr === "true") ? nT(Y0) : rT(Y0)
          , i = $S({
            vueApp: o
        });
        async function s(c) {
            await i.callHook("app:error", c),
            i.payload.error ||= es(c)
        }
        o.config.errorHandler = s,
        i.hook("app:suspense:resolve", () => {
            o.config.errorHandler === s && (o.config.errorHandler = void 0)
        }
        );
        try {
            await qS(i, T9)
        } catch (c) {
            s(c)
        }
        try {
            await i.hooks.callHook("app:created", o),
            await i.hooks.callHook("app:beforeMount", o),
            o.mount(NS),
            await i.hooks.callHook("app:mounted", o),
            await Na()
        } catch (c) {
            s(c)
        }
        return o
    }
    ,
    e = Z0().catch(t => {
        throw t
    }
    )
}
export {lt as F, Wo as P, to as T, ir as _, D as a, we as b, Oe as c, ht as d, zP as e, Vt as f, Ka as g, jt as h, Xt as i, Ci as j, ts as k, rt as l, ym as m, gr as n, _e as o, BP as p, Ee as q, va as r, Sm as s, wi as t, Sf as u, _t as v, nr as w, Kr as x, qo as y};















function r(e) {
    return new Worker("" + new URL("render-D5sWvUAz.js",import.meta.url).href,{
        name: e?.name
    })
}
export {r as default};















import {_ as y, f as h, w as k, T as f, P as j, g as w, i as _, u as M, o as r, c as i, h as m, j as v, a as o, b as x, k as T, t as d, F as C, r as H, n as a, l as c, m as L} from "./C6yt-oCC.js";
const S = {
    inject: ["sheet", "time", "raf", "projects"],
    setup() {
        let s = w()
          , e = _("projects").find(u => u.slug == s.params.id)
          , p = e.layout.find(u => u.component == "description").data.description;
        p = p.replaceAll("</p>", "<p>").replaceAll("<p>", "").replaceAll("<br>", "").replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, "$2"),
        M({
            title: e.name,
            link: [{
                rel: "canonical",
                href: "https://dversostudio.io/" + s.params.id + "/"
            }],
            meta: [{
                property: "og:description",
                content: p
            }, {
                property: "twitter:description",
                content: p
            }, {
                hid: "description",
                name: "description",
                content: p
            }, {
                property: "og:url",
                content: "https://dversostudio.io/" + s.params.id + "/"
            }]
        })
    },
    data() {
        return {
            _time: 0,
            opacity: 0,
            pproject: !1,
            pprojectEntrace: !1,
            pixelizationThreshold: -1,
            pixelatedMask: "",
            projectsScrollerTransform: 0,
            textOpacity: 0,
            transform: 0,
            maxWidth: 0
        }
    },
    methods: {
        mouseenter_(s) {
            $emit("content", s)
        },
        mouseleave_() {
            $emit("content", "")
        },
        mouseenter(s) {
            $emit("imageContent", "https://r2.dversostudio.io/dversostudio.io" + s.preview_gallery[0].path)
        },
        mouseleave() {
            $emit("imageContent", "")
        },
        pick() {
            this.pproject = null,
            setTimeout( () => {
                this.$router.push("/")
            }
            , 400)
        },
        open() {
            window.open(this.pproject.link)
        }
    },
    mounted() {
        document && (setTimeout( () => {
            this.pproject = this.projects.find(s => s.slug == (this._.provides[j] || this.$route).params.id)
        }
        , 400),
        this.maxWidth = Math.max(window.innerWidth, window.innerHeight),
        window.addEventListener("resize", () => {
            this.maxWidth = Math.max(window.innerWidth, window.innerHeight)
        }
        ))
    },
    watch: {
        pixelizationThreshold(s) {
            L(s)
        }
    }
}
  , W = {
    class: "dverso_layout"
}
  , b = ["innerHTML"]
  , z = {
    class: "services"
}
  , E = ["innerHTML"]
  , A = ["innerHTML"]
  , B = ["src"]
  , F = ["src"]
  , V = ["src"]
  , N = ["src"]
  , R = {
    class: "project_footer"
};
function I(s, e, p, u, l, n) {
    const g = T;
    return r(),
    h(f, null, {
        default: k( () => [l.pproject ? (r(),
        i("div", {
            key: 0,
            onTouchmove: e[12] || (e[12] = v( () => {}
            , ["stop"])),
            onTouchstart: e[13] || (e[13] = v( () => {}
            , ["stop"])),
            onTouchend: e[14] || (e[14] = v( () => {}
            , ["stop"])),
            onWheel: e[15] || (e[15] = v( () => {}
            , ["stop"])),
            class: "project-page"
        }, [o("div", {
            onMouseenter: e[0] || (e[0] = t => n.mouseenter_("Close")),
            onMouseleave: e[1] || (e[1] = t => n.mouseleave_()),
            onClick: e[2] || (e[2] = t => n.pick(null)),
            class: "title_container"
        }, [o("h1", null, [x(g, {
            text: l.pproject.name
        }, null, 8, ["text"])]), e[16] || (e[16] = o("p", null, "[close]", -1))], 32), o("div", {
            onMouseenter: e[6] || (e[6] = t => n.mouseenter_("Close")),
            onMouseleave: e[7] || (e[7] = t => n.mouseleave_()),
            onClick: e[8] || (e[8] = t => n.pick(null)),
            class: "project"
        }, [o("span", null, d(l.pproject.name), 1), o("span", null, d(l.pproject.kind), 1), o("span", null, d(l.pproject.year), 1), o("span", {
            onMouseenter: e[3] || (e[3] = t => n.mouseenter_("Follow link")),
            onClick: e[4] || (e[4] = (...t) => n.open && n.open(...t)),
            onMouseleave: e[5] || (e[5] = t => n.mouseleave_("Close"))
        }, d(l.pproject.link), 33), e[17] || (e[17] = o("span", null, null, -1))], 32), (r(!0),
        i(C, null, H(l.pproject.layout, t => (r(),
        i("div", W, [t.component == "description" ? (r(),
        i("div", {
            key: 0,
            class: a(t.component)
        }, [o("p", {
            innerHTML: t.data.description
        }, null, 8, b), o("div", z, [e[18] || (e[18] = o("h2", null, "SERVICES", -1)), o("p", {
            innerHTML: t.data.services
        }, null, 8, E)])], 2)) : m("", !0), t.component == "richtext" ? (r(),
        i("div", {
            key: 1,
            class: a(t.component)
        }, [o("p", {
            innerHTML: t.data.html
        }, null, 8, A)], 2)) : t.component == "full_bleed_image" ? (r(),
        i("div", {
            key: 2,
            class: a(t.component)
        }, [o("img", {
            crossorigin: "anonymous",
            style: c({
                "aspect-ratio": t.data.image.width / t.data.image.height
            }),
            src: "https://r2.dversostudio.io/dversostudio.io" + t.data.image.path
        }, null, 12, B)], 2)) : t.component == "image" ? (r(),
        i("div", {
            key: 3,
            class: a(t.component)
        }, [o("img", {
            crossorigin: "anonymous",
            style: c({
                "aspect-ratio": t.data.image.width / t.data.image.height
            }),
            src: "https://r2.dversostudio.io/dversostudio.io" + t.data.image.path
        }, null, 12, F)], 2)) : t.component == "full_bleed_video" ? (r(),
        i("div", {
            key: 4,
            class: a(t.component)
        }, [t.data.video ? (r(),
        i("video", {
            key: 0,
            playsinline: "true",
            autoplay: !0,
            loop: "",
            controls: !1,
            muted: !0,
            crossorigin: "anonymous",
            src: "https://r2.dversostudio.io/dversostudio.io" + t.data.video.path
        }, null, 8, V)) : m("", !0)], 2)) : t.component == "video" ? (r(),
        i("div", {
            key: 5,
            class: a(t.component)
        }, [t.data.video ? (r(),
        i("video", {
            key: 0,
            playsinline: "true",
            autoplay: !0,
            loop: "",
            controls: !1,
            muted: !0,
            crossorigin: "anonymous",
            src: "https://r2.dversostudio.io/dversostudio.io" + t.data.video.path
        }, null, 8, N)) : m("", !0)], 2)) : (r(),
        i("div", {
            key: 6,
            class: a(t.component)
        }, null, 2))]))), 256)), o("div", R, [o("span", {
            onMouseenter: e[9] || (e[9] = t => n.mouseenter_("Follow link")),
            onClick: e[10] || (e[10] = (...t) => n.open && n.open(...t)),
            onMouseleave: e[11] || (e[11] = t => n.mouseleave_("Close"))
        }, d(l.pproject.link), 33)])], 32)) : m("", !0)]),
        _: 1
    })
}
const D = y(S, [["render", I], ["__scopeId", "data-v-03105fc6"]]);
export {D as default};
