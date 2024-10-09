import {
  DefaultValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-6R7LQZQ6.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  isPlatformServer
} from "./chunk-NSDOMCKK.js";
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injectable,
  Input,
  InputFlags,
  NgModule,
  NgZone,
  Optional,
  Output,
  PLATFORM_ID,
  Pipe,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation$1,
  forwardRef,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-JSLE2MLR.js";
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  tap
} from "./chunk-OBCKPMKI.js";
import {
  __commonJS,
  __toESM
} from "./chunk-ASLTLD6L.js";

// node_modules/@tweenjs/tween.js/src/Tween.js
var require_Tween = __commonJS({
  "node_modules/@tweenjs/tween.js/src/Tween.js"(exports, module) {
    var _Group = function() {
      this._tweens = {};
      this._tweensAddedDuringUpdate = {};
    };
    _Group.prototype = {
      getAll: function() {
        return Object.keys(this._tweens).map(function(tweenId) {
          return this._tweens[tweenId];
        }.bind(this));
      },
      removeAll: function() {
        this._tweens = {};
      },
      add: function(tween2) {
        this._tweens[tween2.getId()] = tween2;
        this._tweensAddedDuringUpdate[tween2.getId()] = tween2;
      },
      remove: function(tween2) {
        delete this._tweens[tween2.getId()];
        delete this._tweensAddedDuringUpdate[tween2.getId()];
      },
      update: function(time, preserve) {
        var tweenIds = Object.keys(this._tweens);
        if (tweenIds.length === 0) {
          return false;
        }
        time = time !== void 0 ? time : TWEEN.now();
        while (tweenIds.length > 0) {
          this._tweensAddedDuringUpdate = {};
          for (var i = 0; i < tweenIds.length; i++) {
            var tween2 = this._tweens[tweenIds[i]];
            if (tween2 && tween2.update(time) === false) {
              tween2._isPlaying = false;
              if (!preserve) {
                delete this._tweens[tweenIds[i]];
              }
            }
          }
          tweenIds = Object.keys(this._tweensAddedDuringUpdate);
        }
        return true;
      }
    };
    var TWEEN = new _Group();
    TWEEN.Group = _Group;
    TWEEN._nextId = 0;
    TWEEN.nextId = function() {
      return TWEEN._nextId++;
    };
    if (typeof self === "undefined" && typeof process !== "undefined" && process.hrtime) {
      TWEEN.now = function() {
        var time = process.hrtime();
        return time[0] * 1e3 + time[1] / 1e6;
      };
    } else if (typeof self !== "undefined" && self.performance !== void 0 && self.performance.now !== void 0) {
      TWEEN.now = self.performance.now.bind(self.performance);
    } else if (Date.now !== void 0) {
      TWEEN.now = Date.now;
    } else {
      TWEEN.now = function() {
        return (/* @__PURE__ */ new Date()).getTime();
      };
    }
    TWEEN.Tween = function(object, group) {
      this._object = object;
      this._valuesStart = {};
      this._valuesEnd = {};
      this._valuesStartRepeat = {};
      this._duration = 1e3;
      this._repeat = 0;
      this._repeatDelayTime = void 0;
      this._yoyo = false;
      this._isPlaying = false;
      this._reversed = false;
      this._delayTime = 0;
      this._startTime = null;
      this._easingFunction = TWEEN.Easing.Linear.None;
      this._interpolationFunction = TWEEN.Interpolation.Linear;
      this._chainedTweens = [];
      this._onStartCallback = null;
      this._onStartCallbackFired = false;
      this._onUpdateCallback = null;
      this._onRepeatCallback = null;
      this._onCompleteCallback = null;
      this._onStopCallback = null;
      this._group = group || TWEEN;
      this._id = TWEEN.nextId();
    };
    TWEEN.Tween.prototype = {
      getId: function() {
        return this._id;
      },
      isPlaying: function() {
        return this._isPlaying;
      },
      to: function(properties, duration) {
        this._valuesEnd = properties;
        if (duration !== void 0) {
          this._duration = duration;
        }
        return this;
      },
      duration: function duration(d) {
        this._duration = d;
        return this;
      },
      start: function(time) {
        this._group.add(this);
        this._isPlaying = true;
        this._onStartCallbackFired = false;
        this._startTime = time !== void 0 ? typeof time === "string" ? TWEEN.now() + parseFloat(time) : time : TWEEN.now();
        this._startTime += this._delayTime;
        for (var property in this._valuesEnd) {
          if (this._valuesEnd[property] instanceof Array) {
            if (this._valuesEnd[property].length === 0) {
              continue;
            }
            this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);
          }
          if (this._object[property] === void 0) {
            continue;
          }
          this._valuesStart[property] = this._object[property];
          if (this._valuesStart[property] instanceof Array === false) {
            this._valuesStart[property] *= 1;
          }
          this._valuesStartRepeat[property] = this._valuesStart[property] || 0;
        }
        return this;
      },
      stop: function() {
        if (!this._isPlaying) {
          return this;
        }
        this._group.remove(this);
        this._isPlaying = false;
        if (this._onStopCallback !== null) {
          this._onStopCallback(this._object);
        }
        this.stopChainedTweens();
        return this;
      },
      end: function() {
        this.update(Infinity);
        return this;
      },
      stopChainedTweens: function() {
        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
          this._chainedTweens[i].stop();
        }
      },
      group: function(group) {
        this._group = group;
        return this;
      },
      delay: function(amount) {
        this._delayTime = amount;
        return this;
      },
      repeat: function(times) {
        this._repeat = times;
        return this;
      },
      repeatDelay: function(amount) {
        this._repeatDelayTime = amount;
        return this;
      },
      yoyo: function(yoyo) {
        this._yoyo = yoyo;
        return this;
      },
      easing: function(easingFunction) {
        this._easingFunction = easingFunction;
        return this;
      },
      interpolation: function(interpolationFunction) {
        this._interpolationFunction = interpolationFunction;
        return this;
      },
      chain: function() {
        this._chainedTweens = arguments;
        return this;
      },
      onStart: function(callback) {
        this._onStartCallback = callback;
        return this;
      },
      onUpdate: function(callback) {
        this._onUpdateCallback = callback;
        return this;
      },
      onRepeat: function onRepeat(callback) {
        this._onRepeatCallback = callback;
        return this;
      },
      onComplete: function(callback) {
        this._onCompleteCallback = callback;
        return this;
      },
      onStop: function(callback) {
        this._onStopCallback = callback;
        return this;
      },
      update: function(time) {
        var property;
        var elapsed;
        var value;
        if (time < this._startTime) {
          return true;
        }
        if (this._onStartCallbackFired === false) {
          if (this._onStartCallback !== null) {
            this._onStartCallback(this._object);
          }
          this._onStartCallbackFired = true;
        }
        elapsed = (time - this._startTime) / this._duration;
        elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
        value = this._easingFunction(elapsed);
        for (property in this._valuesEnd) {
          if (this._valuesStart[property] === void 0) {
            continue;
          }
          var start = this._valuesStart[property] || 0;
          var end = this._valuesEnd[property];
          if (end instanceof Array) {
            this._object[property] = this._interpolationFunction(end, value);
          } else {
            if (typeof end === "string") {
              if (end.charAt(0) === "+" || end.charAt(0) === "-") {
                end = start + parseFloat(end);
              } else {
                end = parseFloat(end);
              }
            }
            if (typeof end === "number") {
              this._object[property] = start + (end - start) * value;
            }
          }
        }
        if (this._onUpdateCallback !== null) {
          this._onUpdateCallback(this._object, elapsed);
        }
        if (elapsed === 1) {
          if (this._repeat > 0) {
            if (isFinite(this._repeat)) {
              this._repeat--;
            }
            for (property in this._valuesStartRepeat) {
              if (typeof this._valuesEnd[property] === "string") {
                this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
              }
              if (this._yoyo) {
                var tmp = this._valuesStartRepeat[property];
                this._valuesStartRepeat[property] = this._valuesEnd[property];
                this._valuesEnd[property] = tmp;
              }
              this._valuesStart[property] = this._valuesStartRepeat[property];
            }
            if (this._yoyo) {
              this._reversed = !this._reversed;
            }
            if (this._repeatDelayTime !== void 0) {
              this._startTime = time + this._repeatDelayTime;
            } else {
              this._startTime = time + this._delayTime;
            }
            if (this._onRepeatCallback !== null) {
              this._onRepeatCallback(this._object);
            }
            return true;
          } else {
            if (this._onCompleteCallback !== null) {
              this._onCompleteCallback(this._object);
            }
            for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
              this._chainedTweens[i].start(this._startTime + this._duration);
            }
            return false;
          }
        }
        return true;
      }
    };
    TWEEN.Easing = {
      Linear: {
        None: function(k) {
          return k;
        }
      },
      Quadratic: {
        In: function(k) {
          return k * k;
        },
        Out: function(k) {
          return k * (2 - k);
        },
        InOut: function(k) {
          if ((k *= 2) < 1) {
            return 0.5 * k * k;
          }
          return -0.5 * (--k * (k - 2) - 1);
        }
      },
      Cubic: {
        In: function(k) {
          return k * k * k;
        },
        Out: function(k) {
          return --k * k * k + 1;
        },
        InOut: function(k) {
          if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
          }
          return 0.5 * ((k -= 2) * k * k + 2);
        }
      },
      Quartic: {
        In: function(k) {
          return k * k * k * k;
        },
        Out: function(k) {
          return 1 - --k * k * k * k;
        },
        InOut: function(k) {
          if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k;
          }
          return -0.5 * ((k -= 2) * k * k * k - 2);
        }
      },
      Quintic: {
        In: function(k) {
          return k * k * k * k * k;
        },
        Out: function(k) {
          return --k * k * k * k * k + 1;
        },
        InOut: function(k) {
          if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k * k;
          }
          return 0.5 * ((k -= 2) * k * k * k * k + 2);
        }
      },
      Sinusoidal: {
        In: function(k) {
          return 1 - Math.cos(k * Math.PI / 2);
        },
        Out: function(k) {
          return Math.sin(k * Math.PI / 2);
        },
        InOut: function(k) {
          return 0.5 * (1 - Math.cos(Math.PI * k));
        }
      },
      Exponential: {
        In: function(k) {
          return k === 0 ? 0 : Math.pow(1024, k - 1);
        },
        Out: function(k) {
          return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        },
        InOut: function(k) {
          if (k === 0) {
            return 0;
          }
          if (k === 1) {
            return 1;
          }
          if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1);
          }
          return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
        }
      },
      Circular: {
        In: function(k) {
          return 1 - Math.sqrt(1 - k * k);
        },
        Out: function(k) {
          return Math.sqrt(1 - --k * k);
        },
        InOut: function(k) {
          if ((k *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - k * k) - 1);
          }
          return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
        }
      },
      Elastic: {
        In: function(k) {
          if (k === 0) {
            return 0;
          }
          if (k === 1) {
            return 1;
          }
          return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
        },
        Out: function(k) {
          if (k === 0) {
            return 0;
          }
          if (k === 1) {
            return 1;
          }
          return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
        },
        InOut: function(k) {
          if (k === 0) {
            return 0;
          }
          if (k === 1) {
            return 1;
          }
          k *= 2;
          if (k < 1) {
            return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
          }
          return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
        }
      },
      Back: {
        In: function(k) {
          var s = 1.70158;
          return k * k * ((s + 1) * k - s);
        },
        Out: function(k) {
          var s = 1.70158;
          return --k * k * ((s + 1) * k + s) + 1;
        },
        InOut: function(k) {
          var s = 1.70158 * 1.525;
          if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s));
          }
          return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
        }
      },
      Bounce: {
        In: function(k) {
          return 1 - TWEEN.Easing.Bounce.Out(1 - k);
        },
        Out: function(k) {
          if (k < 1 / 2.75) {
            return 7.5625 * k * k;
          } else if (k < 2 / 2.75) {
            return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
          } else if (k < 2.5 / 2.75) {
            return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
          } else {
            return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
          }
        },
        InOut: function(k) {
          if (k < 0.5) {
            return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
          }
          return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
        }
      }
    };
    TWEEN.Interpolation = {
      Linear: function(v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = TWEEN.Interpolation.Utils.Linear;
        if (k < 0) {
          return fn(v[0], v[1], f);
        }
        if (k > 1) {
          return fn(v[m], v[m - 1], m - f);
        }
        return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
      },
      Bezier: function(v, k) {
        var b = 0;
        var n = v.length - 1;
        var pw = Math.pow;
        var bn = TWEEN.Interpolation.Utils.Bernstein;
        for (var i = 0; i <= n; i++) {
          b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
        }
        return b;
      },
      CatmullRom: function(v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = TWEEN.Interpolation.Utils.CatmullRom;
        if (v[0] === v[m]) {
          if (k < 0) {
            i = Math.floor(f = m * (1 + k));
          }
          return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        } else {
          if (k < 0) {
            return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
          }
          if (k > 1) {
            return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
          }
          return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        }
      },
      Utils: {
        Linear: function(p0, p1, t) {
          return (p1 - p0) * t + p0;
        },
        Bernstein: function(n, i) {
          var fc = TWEEN.Interpolation.Utils.Factorial;
          return fc(n) / fc(i) / fc(n - i);
        },
        Factorial: /* @__PURE__ */ function() {
          var a = [1];
          return function(n) {
            var s = 1;
            if (a[n]) {
              return a[n];
            }
            for (var i = n; i > 1; i--) {
              s *= i;
            }
            a[n] = s;
            return s;
          };
        }(),
        CatmullRom: function(p0, p1, p2, p3, t) {
          var v0 = (p2 - p0) * 0.5;
          var v1 = (p3 - p1) * 0.5;
          var t2 = t * t;
          var t3 = t * t2;
          return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        }
      }
    };
    (function(root) {
      if (typeof define === "function" && define.amd) {
        define([], function() {
          return TWEEN;
        });
      } else if (typeof module !== "undefined" && typeof exports === "object") {
        module.exports = TWEEN;
      } else if (root !== void 0) {
        root.TWEEN = TWEEN;
      }
    })(exports);
  }
});

// node_modules/angular2-multiselect-dropdown/fesm2022/angular2-multiselect-dropdown.mjs
var tween = __toESM(require_Tween(), 1);
function CIcon__svg_svg_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 4)(1, "g");
    ɵɵelement(2, "path", 5);
    ɵɵelementEnd()();
  }
}
function CIcon__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 6)(1, "g")(2, "g", 7)(3, "g");
    ɵɵelement(4, "path", 8);
    ɵɵelementEnd()()()();
  }
}
function CIcon__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 6)(1, "g")(2, "g", 9)(3, "g");
    ɵɵelement(4, "path", 10);
    ɵɵelementEnd()()()();
  }
}
function CIcon__svg_svg_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 11)(1, "g")(2, "g")(3, "g", 12)(4, "g");
    ɵɵelement(5, "path", 13);
    ɵɵelementEnd()()()()();
  }
}
function CIcon__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 14)(1, "g");
    ɵɵelement(2, "path", 15);
    ɵɵelementEnd()();
  }
}
var _c0 = ["header"];
var _c1 = ["container"];
var _c2 = ["content"];
var _c3 = ["invisiblePadding"];
var _c4 = ["*"];
var _c5 = ["searchInput"];
var _c6 = ["selectedList"];
var _c7 = ["dropdownList"];
var _c8 = ["cuppaDropdown"];
var _c9 = (a0) => ({
  "disabled": a0
});
var _c10 = (a0) => ({
  "tagToBody": a0
});
var _c11 = (a0, a1) => ({
  "arrow-up": a0,
  "arrow-down": a1
});
var _c12 = (a0) => ({
  "single-select-mode": a0
});
var _c13 = (a0) => ({
  "selected-item": a0
});
var _c14 = (a0) => ({
  "height": a0
});
var _c15 = (a0, a1) => ({
  "grp-title": a0,
  "grp-item": a1
});
var _c16 = (a0, a1, a2) => ({
  "grp-title": a0,
  "grp-item": a1,
  "selected-item": a2
});
var _c17 = (a0, a1, a2) => ({
  "selected-item": a0,
  "grp-title": a1,
  "grp-item": a2
});
function AngularMultiSelect_span_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.settings.text);
  }
}
function AngularMultiSelect_span_6_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", item_r3[ctx_r1.settings.labelKey], " ");
  }
}
function AngularMultiSelect_span_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtemplate(1, AngularMultiSelect_span_6_span_1_Template, 2, 1, "span", 27);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.selectedItems)("ngForTrackBy", ctx_r1.trackByFn.bind(ctx_r1));
  }
}
function AngularMultiSelect_span_7_div_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 34);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r5 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(item_r5[ctx_r1.settings.labelKey]);
  }
}
function AngularMultiSelect_span_7_div_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 34);
    ɵɵelement(1, "c-templateRenderer", 35);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r5 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("data", ctx_r1.badgeTempl)("item", item_r5);
  }
}
function AngularMultiSelect_span_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 30);
    ɵɵtemplate(1, AngularMultiSelect_span_7_div_1_span_1_Template, 2, 1, "span", 31)(2, AngularMultiSelect_span_7_div_1_span_2_Template, 2, 2, "span", 31);
    ɵɵelementStart(3, "span", 32);
    ɵɵlistener("click", function AngularMultiSelect_span_7_div_1_Template_span_click_3_listener($event) {
      const ctx_r5 = ɵɵrestoreView(_r4);
      const item_r5 = ctx_r5.$implicit;
      const k_r7 = ctx_r5.index;
      const ctx_r1 = ɵɵnextContext(2);
      ctx_r1.onItemClick(item_r5, k_r7, $event);
      return ɵɵresetView($event.stopPropagation());
    });
    ɵɵelement(4, "c-icon", 33);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.badgeTempl);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.badgeTempl);
    ɵɵadvance(2);
    ɵɵproperty("name", "remove");
  }
}
function AngularMultiSelect_span_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 28);
    ɵɵtemplate(1, AngularMultiSelect_span_7_div_1_Template, 5, 3, "div", 29);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.selectedItems)("ngForTrackBy", ctx_r1.trackByFn.bind(ctx_r1));
  }
}
function AngularMultiSelect_div_8_div_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 34);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r9 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(item_r9[ctx_r1.settings.labelKey]);
  }
}
function AngularMultiSelect_div_8_div_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 34);
    ɵɵelement(1, "c-templateRenderer", 35);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r9 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("data", ctx_r1.badgeTempl)("item", item_r9);
  }
}
function AngularMultiSelect_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 37);
    ɵɵtemplate(1, AngularMultiSelect_div_8_div_1_span_1_Template, 2, 1, "span", 31)(2, AngularMultiSelect_div_8_div_1_span_2_Template, 2, 2, "span", 31);
    ɵɵelementStart(3, "span", 32);
    ɵɵlistener("click", function AngularMultiSelect_div_8_div_1_Template_span_click_3_listener($event) {
      const ctx_r9 = ɵɵrestoreView(_r8);
      const item_r9 = ctx_r9.$implicit;
      const k_r11 = ctx_r9.index;
      const ctx_r1 = ɵɵnextContext(2);
      ctx_r1.onItemClick(item_r9, k_r11, $event);
      return ɵɵresetView($event.stopPropagation());
    });
    ɵɵelement(4, "c-icon", 33);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const k_r11 = ctx.index;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("hidden", k_r11 > ctx_r1.settings.badgeShowLimit - 1);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.badgeTempl);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.badgeTempl);
    ɵɵadvance(2);
    ɵɵproperty("name", "remove");
  }
}
function AngularMultiSelect_div_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 28);
    ɵɵtemplate(1, AngularMultiSelect_div_8_div_1_Template, 5, 4, "div", 36);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.selectedItems)("ngForTrackBy", ctx_r1.trackByFn.bind(ctx_r1));
  }
}
function AngularMultiSelect_span_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 38);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate1("+", (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length) - ctx_r1.settings.badgeShowLimit, "");
  }
}
function AngularMultiSelect_span_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 39);
    ɵɵlistener("click", function AngularMultiSelect_span_10_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r12);
      const ctx_r1 = ɵɵnextContext();
      ctx_r1.clearSelection($event);
      return ɵɵresetView($event.stopPropagation());
    });
    ɵɵelement(1, "c-icon", 33);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵadvance();
    ɵɵproperty("name", "remove");
  }
}
function AngularMultiSelect_span_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 40);
    ɵɵelement(1, "c-icon", 33);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵadvance();
    ɵɵproperty("name", "angle-down");
  }
}
function AngularMultiSelect_span_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 41);
    ɵɵelement(1, "c-icon", 33);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵadvance();
    ɵɵproperty("name", "angle-up");
  }
}
function AngularMultiSelect_div_18_input_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 46);
    ɵɵlistener("change", function AngularMultiSelect_div_18_input_1_Template_input_change_0_listener($event) {
      ɵɵrestoreView(_r13);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.toggleSelectAll($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("checked", ctx_r1.isSelectAll)("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length))("id", ctx_r1.id);
  }
}
function AngularMultiSelect_div_18_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 42);
    ɵɵtemplate(1, AngularMultiSelect_div_18_input_1_Template, 1, 3, "input", 43);
    ɵɵelementStart(2, "label", 44)(3, "span", 45);
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "span", 45);
    ɵɵtext(6);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.showCheckbox);
    ɵɵadvance();
    ɵɵproperty("for", ctx_r1.id);
    ɵɵadvance();
    ɵɵproperty("hidden", ctx_r1.isSelectAll);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.settings.selectAllText);
    ɵɵadvance();
    ɵɵproperty("hidden", !ctx_r1.isSelectAll);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.settings.unSelectAllText);
  }
}
function AngularMultiSelect_img_19_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "img", 47);
  }
}
function AngularMultiSelect_div_20_span_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 53);
    ɵɵlistener("click", function AngularMultiSelect_div_20_span_3_Template_span_click_0_listener() {
      ɵɵrestoreView(_r14);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.clearSearch());
    });
    ɵɵelement(1, "c-icon", 33);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("hidden", ctx_r1.filter == void 0 || (ctx_r1.filter == null ? null : ctx_r1.filter.length) == 0);
    ɵɵadvance();
    ɵɵproperty("name", "clear");
  }
}
function AngularMultiSelect_div_20_span_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 53);
    ɵɵlistener("click", function AngularMultiSelect_div_20_span_4_Template_span_click_0_listener() {
      ɵɵrestoreView(_r15);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.resetInfiniteSearch());
    });
    ɵɵelement(1, "c-icon", 33);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("hidden", ctx_r1.filter == void 0 || (ctx_r1.filter == null ? null : ctx_r1.filter.length) == 0);
    ɵɵadvance();
    ɵɵproperty("name", "clear");
  }
}
function AngularMultiSelect_div_20_input_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 54, 3);
    ɵɵtwoWayListener("ngModelChange", function AngularMultiSelect_div_20_input_5_Template_input_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r16);
      const ctx_r1 = ɵɵnextContext(2);
      ɵɵtwoWayBindingSet(ctx_r1.filter, $event) || (ctx_r1.filter = $event);
      return ɵɵresetView($event);
    });
    ɵɵlistener("keyup", function AngularMultiSelect_div_20_input_5_Template_input_keyup_0_listener() {
      ɵɵrestoreView(_r16);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.filterGroupedList());
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("placeholder", ctx_r1.settings.searchPlaceholderText);
    ɵɵtwoWayProperty("ngModel", ctx_r1.filter);
  }
}
function AngularMultiSelect_div_20_input_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 54, 3);
    ɵɵtwoWayListener("ngModelChange", function AngularMultiSelect_div_20_input_6_Template_input_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r17);
      const ctx_r1 = ɵɵnextContext(2);
      ɵɵtwoWayBindingSet(ctx_r1.filter, $event) || (ctx_r1.filter = $event);
      return ɵɵresetView($event);
    });
    ɵɵlistener("keyup", function AngularMultiSelect_div_20_input_6_Template_input_keyup_0_listener($event) {
      ɵɵrestoreView(_r17);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.filteritems($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("placeholder", ctx_r1.settings.searchPlaceholderText);
    ɵɵtwoWayProperty("ngModel", ctx_r1.filter);
  }
}
function AngularMultiSelect_div_20_input_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 54, 3);
    ɵɵtwoWayListener("ngModelChange", function AngularMultiSelect_div_20_input_7_Template_input_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r18);
      const ctx_r1 = ɵɵnextContext(2);
      ɵɵtwoWayBindingSet(ctx_r1.filter, $event) || (ctx_r1.filter = $event);
      return ɵɵresetView($event);
    });
    ɵɵlistener("keyup", function AngularMultiSelect_div_20_input_7_Template_input_keyup_0_listener($event) {
      ɵɵrestoreView(_r18);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onKeyUp($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("placeholder", ctx_r1.settings.searchPlaceholderText);
    ɵɵtwoWayProperty("ngModel", ctx_r1.filter);
  }
}
function AngularMultiSelect_div_20_c_templateRenderer_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "c-templateRenderer", 35);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("data", ctx_r1.searchTempl)("item", ctx_r1.item);
  }
}
function AngularMultiSelect_div_20_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 48)(1, "span", 49);
    ɵɵelement(2, "c-icon", 33);
    ɵɵelementEnd();
    ɵɵtemplate(3, AngularMultiSelect_div_20_span_3_Template, 2, 2, "span", 50)(4, AngularMultiSelect_div_20_span_4_Template, 2, 2, "span", 50)(5, AngularMultiSelect_div_20_input_5_Template, 2, 2, "input", 51)(6, AngularMultiSelect_div_20_input_6_Template, 2, 2, "input", 51)(7, AngularMultiSelect_div_20_input_7_Template, 2, 2, "input", 51)(8, AngularMultiSelect_div_20_c_templateRenderer_8_Template, 1, 2, "c-templateRenderer", 52);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("name", "search");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.settings.lazyLoading);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.lazyLoading);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.groupBy && !ctx_r1.settings.lazyLoading && !ctx_r1.searchTempl);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.settings.groupBy && !ctx_r1.settings.lazyLoading && !ctx_r1.searchTempl);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.lazyLoading && !ctx_r1.searchTempl);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.searchTempl);
  }
}
function AngularMultiSelect_div_21_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 57);
    ɵɵlistener("click", function AngularMultiSelect_div_21_div_1_Template_div_click_0_listener() {
      ɵɵrestoreView(_r19);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.toggleFilterSelectAll());
    });
    ɵɵelement(1, "input", 58);
    ɵɵelementStart(2, "label")(3, "span", 45);
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "span", 45);
    ɵɵtext(6);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("checked", ctx_r1.isFilterSelectAll)("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length));
    ɵɵadvance(2);
    ɵɵproperty("hidden", ctx_r1.isFilterSelectAll);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.settings.filterSelectAllText);
    ɵɵadvance();
    ɵɵproperty("hidden", !ctx_r1.isFilterSelectAll);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.settings.filterUnSelectAllText);
  }
}
function AngularMultiSelect_div_21_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 57);
    ɵɵlistener("click", function AngularMultiSelect_div_21_div_2_Template_div_click_0_listener() {
      ɵɵrestoreView(_r20);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.toggleFilterSelectAll());
    });
    ɵɵelement(1, "input", 59);
    ɵɵelementStart(2, "label")(3, "span", 45);
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "span", 45);
    ɵɵtext(6);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("checked", ctx_r1.isFilterSelectAll && (ctx_r1.filter == null ? null : ctx_r1.filter.length) > 0)("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length));
    ɵɵadvance(2);
    ɵɵproperty("hidden", ctx_r1.isFilterSelectAll);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.settings.filterSelectAllText);
    ɵɵadvance();
    ɵɵproperty("hidden", !ctx_r1.isFilterSelectAll);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.settings.filterUnSelectAllText);
  }
}
function AngularMultiSelect_div_21_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 55);
    ɵɵtemplate(1, AngularMultiSelect_div_21_div_1_Template, 7, 6, "div", 56)(2, AngularMultiSelect_div_21_div_2_Template, 7, 6, "div", 56);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.settings.groupBy && (ctx_r1.filter == null ? null : ctx_r1.filter.length) > 0 && ctx_r1.filterLength > 0 && !ctx_r1.settings.singleSelection);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.groupBy && (ctx_r1.filter == null ? null : ctx_r1.filter.length) > 0 && (ctx_r1.groupedData == null ? null : ctx_r1.groupedData.length) > 0 && !ctx_r1.settings.singleSelection);
  }
}
function AngularMultiSelect_div_22_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 57);
    ɵɵlistener("click", function AngularMultiSelect_div_22_div_1_Template_div_click_0_listener() {
      ɵɵrestoreView(_r21);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.toggleInfiniteFilterSelectAll());
    });
    ɵɵelement(1, "input", 59);
    ɵɵelementStart(2, "label")(3, "span", 45);
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "span", 45);
    ɵɵtext(6);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("checked", ctx_r1.isInfiniteFilterSelectAll)("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length));
    ɵɵadvance(2);
    ɵɵproperty("hidden", ctx_r1.isInfiniteFilterSelectAll);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.settings.filterSelectAllText);
    ɵɵadvance();
    ɵɵproperty("hidden", !ctx_r1.isInfiniteFilterSelectAll);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.settings.filterUnSelectAllText);
  }
}
function AngularMultiSelect_div_22_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 55);
    ɵɵtemplate(1, AngularMultiSelect_div_22_div_1_Template, 7, 6, "div", 56);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", (ctx_r1.filter == null ? null : ctx_r1.filter.length) > 0 && ctx_r1.infiniteFilterLength > 0);
  }
}
function AngularMultiSelect_div_23_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 61)(1, "button", 62);
    ɵɵlistener("click", function AngularMultiSelect_div_23_div_1_Template_button_click_1_listener() {
      ɵɵrestoreView(_r22);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.addFilterNewItem());
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.settings.addNewButtonText);
  }
}
function AngularMultiSelect_div_23_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 55);
    ɵɵtemplate(1, AngularMultiSelect_div_23_div_1_Template, 3, 1, "div", 60);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.addNewItemOnFilter);
  }
}
function AngularMultiSelect_div_24_li_2_input_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 59);
  }
  if (rf & 2) {
    const item_r25 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("checked", ctx_r1.isSelected(item_r25))("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length) && !ctx_r1.isSelected(item_r25) || item_r25.disabled);
  }
}
function AngularMultiSelect_div_24_li_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 66);
    ɵɵlistener("click", function AngularMultiSelect_div_24_li_2_Template_li_click_0_listener($event) {
      const ctx_r23 = ɵɵrestoreView(_r23);
      const item_r25 = ctx_r23.$implicit;
      const i_r26 = ctx_r23.index;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onItemClick(item_r25, i_r26, $event));
    });
    ɵɵtemplate(1, AngularMultiSelect_div_24_li_2_input_1_Template, 1, 2, "input", 67);
    ɵɵelementStart(2, "label");
    ɵɵtext(3);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const item_r25 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(3, _c13, ctx_r1.isSelected(item_r25) == true));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.showCheckbox);
    ɵɵadvance(2);
    ɵɵtextInterpolate(item_r25[ctx_r1.settings.labelKey]);
  }
}
function AngularMultiSelect_div_24_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 63)(1, "ul", 64);
    ɵɵtemplate(2, AngularMultiSelect_div_24_li_2_Template, 4, 5, "li", 65);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("max-height", ctx_r1.settings.maxHeight + "px");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r1.data);
  }
}
function AngularMultiSelect_div_25_li_3_input_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 70);
  }
  if (rf & 2) {
    const item_r30 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("checked", ctx_r1.isSelected(item_r30))("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length) && !ctx_r1.isSelected(item_r30) || item_r30.disabled);
  }
}
function AngularMultiSelect_div_25_li_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 66);
    ɵɵlistener("click", function AngularMultiSelect_div_25_li_3_Template_li_click_0_listener($event) {
      const ctx_r28 = ɵɵrestoreView(_r28);
      const item_r30 = ctx_r28.$implicit;
      const i_r31 = ctx_r28.index;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onItemClick(item_r30, i_r31, $event));
    });
    ɵɵtemplate(1, AngularMultiSelect_div_25_li_3_input_1_Template, 1, 2, "input", 69);
    ɵɵelementStart(2, "label");
    ɵɵtext(3);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const item_r30 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(3, _c13, ctx_r1.isSelected(item_r30) == true));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.showCheckbox);
    ɵɵadvance(2);
    ɵɵtextInterpolate(item_r30[ctx_r1.settings.labelKey]);
  }
}
function AngularMultiSelect_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 63)(1, "ul", 68, 4);
    ɵɵlistener("vsStart", function AngularMultiSelect_div_25_Template_ul_vsStart_1_listener($event) {
      ɵɵrestoreView(_r27);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onScrollEnd($event));
    })("vsEnd", function AngularMultiSelect_div_25_Template_ul_vsEnd_1_listener($event) {
      ɵɵrestoreView(_r27);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onScrollEnd($event));
    });
    ɵɵtemplate(3, AngularMultiSelect_div_25_li_3_Template, 4, 5, "li", 65);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const scroll_r32 = ɵɵreference(2);
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("max-height", ctx_r1.settings.maxHeight + "px");
    ɵɵadvance();
    ɵɵproperty("enableUnequalChildrenSizes", ctx_r1.randomSize)("items", ctx_r1.virtualdata)("ngStyle", ɵɵpureFunction1(6, _c14, ctx_r1.settings.maxHeight + "px"));
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", scroll_r32.viewPortItems);
  }
}
function AngularMultiSelect_div_26_li_2_input_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 70);
  }
  if (rf & 2) {
    const item_r35 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("checked", ctx_r1.isSelected(item_r35))("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length) && !ctx_r1.isSelected(item_r35) || item_r35.disabled);
  }
}
function AngularMultiSelect_div_26_li_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 66);
    ɵɵlistener("click", function AngularMultiSelect_div_26_li_2_Template_li_click_0_listener($event) {
      const ctx_r33 = ɵɵrestoreView(_r33);
      const item_r35 = ctx_r33.$implicit;
      const i_r36 = ctx_r33.index;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onItemClick(item_r35, i_r36, $event));
    });
    ɵɵtemplate(1, AngularMultiSelect_div_26_li_2_input_1_Template, 1, 2, "input", 69);
    ɵɵelement(2, "label")(3, "c-templateRenderer", 35);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r35 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c13, ctx_r1.isSelected(item_r35) == true));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.showCheckbox);
    ɵɵadvance(2);
    ɵɵproperty("data", ctx_r1.itemTempl)("item", item_r35);
  }
}
function AngularMultiSelect_div_26_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 63)(1, "ul", 64);
    ɵɵtemplate(2, AngularMultiSelect_div_26_li_2_Template, 4, 6, "li", 65);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("max-height", ctx_r1.settings.maxHeight + "px");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r1.data);
  }
}
function AngularMultiSelect_div_27_li_3_input_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 70);
  }
  if (rf & 2) {
    const item_r40 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("checked", ctx_r1.isSelected(item_r40))("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length) && !ctx_r1.isSelected(item_r40) || item_r40.disabled);
  }
}
function AngularMultiSelect_div_27_li_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 66);
    ɵɵlistener("click", function AngularMultiSelect_div_27_li_3_Template_li_click_0_listener($event) {
      const ctx_r38 = ɵɵrestoreView(_r38);
      const item_r40 = ctx_r38.$implicit;
      const i_r41 = ctx_r38.index;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onItemClick(item_r40, i_r41, $event));
    });
    ɵɵtemplate(1, AngularMultiSelect_div_27_li_3_input_1_Template, 1, 2, "input", 69);
    ɵɵelement(2, "label")(3, "c-templateRenderer", 35);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r40 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c13, ctx_r1.isSelected(item_r40) == true));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.showCheckbox);
    ɵɵadvance(2);
    ɵɵproperty("data", ctx_r1.itemTempl)("item", item_r40);
  }
}
function AngularMultiSelect_div_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 63)(1, "ul", 68, 5);
    ɵɵlistener("vsStart", function AngularMultiSelect_div_27_Template_ul_vsStart_1_listener($event) {
      ɵɵrestoreView(_r37);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onScrollEnd($event));
    })("vsEnd", function AngularMultiSelect_div_27_Template_ul_vsEnd_1_listener($event) {
      ɵɵrestoreView(_r37);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onScrollEnd($event));
    });
    ɵɵtemplate(3, AngularMultiSelect_div_27_li_3_Template, 4, 6, "li", 65);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const scroll2_r42 = ɵɵreference(2);
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("max-height", ctx_r1.settings.maxHeight + "px");
    ɵɵadvance();
    ɵɵproperty("enableUnequalChildrenSizes", ctx_r1.randomSize)("items", ctx_r1.virtualdata)("ngStyle", ɵɵpureFunction1(6, _c14, ctx_r1.settings.maxHeight + "px"));
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", scroll2_r42.viewPortItems);
  }
}
function AngularMultiSelect_div_28_span_3_li_1_input_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 70);
  }
  if (rf & 2) {
    const item_r46 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("checked", ctx_r1.isSelected(item_r46))("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length) && !ctx_r1.isSelected(item_r46) || item_r46.disabled);
  }
}
function AngularMultiSelect_div_28_span_3_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 66);
    ɵɵlistener("click", function AngularMultiSelect_div_28_span_3_li_1_Template_li_click_0_listener($event) {
      ɵɵrestoreView(_r44);
      const ctx_r44 = ɵɵnextContext();
      const item_r46 = ctx_r44.$implicit;
      const i_r47 = ctx_r44.index;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onItemClick(item_r46, i_r47, $event));
    });
    ɵɵtemplate(1, AngularMultiSelect_div_28_span_3_li_1_input_1_Template, 1, 2, "input", 69);
    ɵɵelement(2, "label")(3, "c-templateRenderer", 35);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r46 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction2(4, _c15, item_r46.grpTitle, !item_r46.grpTitle && !ctx_r1.settings.singleSelection));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.showCheckbox && !ctx_r1.settings.singleSelection);
    ɵɵadvance(2);
    ɵɵproperty("data", ctx_r1.itemTempl)("item", item_r46);
  }
}
function AngularMultiSelect_div_28_span_3_li_2_input_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 70);
  }
  if (rf & 2) {
    const item_r46 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("checked", ctx_r1.isSelected(item_r46))("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length) && !ctx_r1.isSelected(item_r46) || item_r46.disabled);
  }
}
function AngularMultiSelect_div_28_span_3_li_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 74);
    ɵɵtemplate(1, AngularMultiSelect_div_28_span_3_li_2_input_1_Template, 1, 2, "input", 69);
    ɵɵelement(2, "label")(3, "c-templateRenderer", 35);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r46 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction2(4, _c15, item_r46.grpTitle, !item_r46.grpTitle && !ctx_r1.settings.singleSelection));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.showCheckbox);
    ɵɵadvance(2);
    ɵɵproperty("data", ctx_r1.itemTempl)("item", item_r46);
  }
}
function AngularMultiSelect_div_28_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtemplate(1, AngularMultiSelect_div_28_span_3_li_1_Template, 4, 7, "li", 72)(2, AngularMultiSelect_div_28_span_3_li_2_Template, 4, 7, "li", 73);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r46 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("ngIf", !item_r46.grpTitle);
    ɵɵadvance();
    ɵɵproperty("ngIf", item_r46.grpTitle);
  }
}
function AngularMultiSelect_div_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 63)(1, "ul", 68, 6);
    ɵɵlistener("vsStart", function AngularMultiSelect_div_28_Template_ul_vsStart_1_listener($event) {
      ɵɵrestoreView(_r43);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onScrollEnd($event));
    })("vsEnd", function AngularMultiSelect_div_28_Template_ul_vsEnd_1_listener($event) {
      ɵɵrestoreView(_r43);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onScrollEnd($event));
    });
    ɵɵtemplate(3, AngularMultiSelect_div_28_span_3_Template, 3, 2, "span", 71);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const scroll3_r48 = ɵɵreference(2);
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("max-height", ctx_r1.settings.maxHeight + "px");
    ɵɵadvance();
    ɵɵproperty("enableUnequalChildrenSizes", ctx_r1.randomSize)("items", ctx_r1.virtualdata)("ngStyle", ɵɵpureFunction1(6, _c14, ctx_r1.settings.maxHeight + "px"));
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", scroll3_r48.viewPortItems);
  }
}
function AngularMultiSelect_div_29_span_2_input_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 70);
  }
  if (rf & 2) {
    const item_r50 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("checked", item_r50.selected)("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length) && !ctx_r1.isSelected(item_r50) || item_r50.disabled);
  }
}
function AngularMultiSelect_div_29_span_2_span_6_input_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 70);
  }
  if (rf & 2) {
    const val_r53 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("checked", ctx_r1.isSelected(val_r53))("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length) && !ctx_r1.isSelected(val_r53) || val_r53.disabled);
  }
}
function AngularMultiSelect_div_29_span_2_span_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span")(1, "li", 66);
    ɵɵlistener("click", function AngularMultiSelect_div_29_span_2_span_6_Template_li_click_1_listener($event) {
      const ctx_r51 = ɵɵrestoreView(_r51);
      const val_r53 = ctx_r51.$implicit;
      const j_r54 = ctx_r51.index;
      const ctx_r1 = ɵɵnextContext(3);
      ctx_r1.onItemClick(val_r53, j_r54, $event);
      return ɵɵresetView($event.stopPropagation());
    });
    ɵɵtemplate(2, AngularMultiSelect_div_29_span_2_span_6_input_2_Template, 1, 2, "input", 69);
    ɵɵelement(3, "label")(4, "c-templateRenderer", 35);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const val_r53 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction2(4, _c15, val_r53.grpTitle, !val_r53.grpTitle && !ctx_r1.settings.singleSelection));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.showCheckbox);
    ɵɵadvance(2);
    ɵɵproperty("data", ctx_r1.itemTempl)("item", val_r53);
  }
}
function AngularMultiSelect_div_29_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span")(1, "li", 66);
    ɵɵlistener("click", function AngularMultiSelect_div_29_span_2_Template_li_click_1_listener() {
      const item_r50 = ɵɵrestoreView(_r49).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.selectGroup(item_r50));
    });
    ɵɵtemplate(2, AngularMultiSelect_div_29_span_2_input_2_Template, 1, 2, "input", 69);
    ɵɵelementStart(3, "label");
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "ul", 64);
    ɵɵtemplate(6, AngularMultiSelect_div_29_span_2_span_6_Template, 5, 7, "span", 71);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const item_r50 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction2(4, _c15, item_r50.grpTitle, !item_r50.grpTitle && !ctx_r1.settings.singleSelection));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.showCheckbox && !ctx_r1.settings.singleSelection);
    ɵɵadvance(2);
    ɵɵtextInterpolate(item_r50[ctx_r1.settings.labelKey]);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", item_r50.list);
  }
}
function AngularMultiSelect_div_29_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 63)(1, "ul", 64);
    ɵɵtemplate(2, AngularMultiSelect_div_29_span_2_Template, 7, 7, "span", 71);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("max-height", ctx_r1.settings.maxHeight + "px");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r1.groupedData);
  }
}
function AngularMultiSelect_div_30_span_4_li_1_input_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 70);
  }
  if (rf & 2) {
    const item_r56 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("checked", ctx_r1.isSelected(item_r56))("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length) && !ctx_r1.isSelected(item_r56) || item_r56.disabled);
  }
}
function AngularMultiSelect_div_30_span_4_li_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 74);
    ɵɵtemplate(1, AngularMultiSelect_div_30_span_4_li_1_input_1_Template, 1, 2, "input", 69);
    ɵɵelementStart(2, "label");
    ɵɵtext(3);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const item_r56 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction3(3, _c16, item_r56.grpTitle, !item_r56.grpTitle && !ctx_r1.settings.singleSelection, ctx_r1.isSelected(item_r56) == true));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.showCheckbox && !item_r56.grpTitle && !ctx_r1.settings.singleSelection);
    ɵɵadvance(2);
    ɵɵtextInterpolate(item_r56[ctx_r1.settings.labelKey]);
  }
}
function AngularMultiSelect_div_30_span_4_li_2_input_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 70);
  }
  if (rf & 2) {
    const item_r56 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("checked", ctx_r1.isSelected(item_r56))("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length) && !ctx_r1.isSelected(item_r56) || item_r56.disabled);
  }
}
function AngularMultiSelect_div_30_span_4_li_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r57 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 66);
    ɵɵlistener("click", function AngularMultiSelect_div_30_span_4_li_2_Template_li_click_0_listener($event) {
      ɵɵrestoreView(_r57);
      const ctx_r57 = ɵɵnextContext();
      const item_r56 = ctx_r57.$implicit;
      const i_r59 = ctx_r57.index;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onItemClick(item_r56, i_r59, $event));
    });
    ɵɵtemplate(1, AngularMultiSelect_div_30_span_4_li_2_input_1_Template, 1, 2, "input", 69);
    ɵɵelementStart(2, "label");
    ɵɵtext(3);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const item_r56 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction3(3, _c16, item_r56.grpTitle, !item_r56.grpTitle && !ctx_r1.settings.singleSelection, ctx_r1.isSelected(item_r56) == true));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.showCheckbox && !item_r56.grpTitle);
    ɵɵadvance(2);
    ɵɵtextInterpolate(item_r56[ctx_r1.settings.labelKey]);
  }
}
function AngularMultiSelect_div_30_span_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtemplate(1, AngularMultiSelect_div_30_span_4_li_1_Template, 4, 7, "li", 73)(2, AngularMultiSelect_div_30_span_4_li_2_Template, 4, 7, "li", 72);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r56 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("ngIf", item_r56.grpTitle);
    ɵɵadvance();
    ɵɵproperty("ngIf", !item_r56.grpTitle);
  }
}
function AngularMultiSelect_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 63)(1, "virtual-scroller", 75);
    ɵɵlistener("vsUpdate", function AngularMultiSelect_div_30_Template_virtual_scroller_vsUpdate_1_listener($event) {
      ɵɵrestoreView(_r55);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.viewPortItems = $event);
    })("vsEnd", function AngularMultiSelect_div_30_Template_virtual_scroller_vsEnd_1_listener($event) {
      ɵɵrestoreView(_r55);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onScrollEnd($event));
    });
    ɵɵelementStart(2, "ul", 68, 7);
    ɵɵlistener("vsStart", function AngularMultiSelect_div_30_Template_ul_vsStart_2_listener($event) {
      ɵɵrestoreView(_r55);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onScrollEnd($event));
    })("vsEnd", function AngularMultiSelect_div_30_Template_ul_vsEnd_2_listener($event) {
      ɵɵrestoreView(_r55);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onScrollEnd($event));
    });
    ɵɵtemplate(4, AngularMultiSelect_div_30_span_4_Template, 3, 2, "span", 71);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const scroll4_r60 = ɵɵreference(3);
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("max-height", ctx_r1.settings.maxHeight + "px");
    ɵɵadvance();
    ɵɵproperty("items", ctx_r1.groupedData)("ngStyle", ɵɵpureFunction1(8, _c14, ctx_r1.settings.maxHeight + "px"));
    ɵɵadvance();
    ɵɵproperty("enableUnequalChildrenSizes", ctx_r1.randomSize)("items", ctx_r1.virtualdata)("ngStyle", ɵɵpureFunction1(10, _c14, ctx_r1.settings.maxHeight + "px"));
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", scroll4_r60.viewPortItems);
  }
}
function AngularMultiSelect_div_31_span_2_input_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 70);
  }
  if (rf & 2) {
    const item_r62 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("checked", item_r62.selected)("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length) && !ctx_r1.isSelected(item_r62) || item_r62.disabled);
  }
}
function AngularMultiSelect_div_31_span_2_span_6_input_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 70);
  }
  if (rf & 2) {
    const val_r65 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("checked", ctx_r1.isSelected(val_r65))("disabled", ctx_r1.settings.limitSelection == (ctx_r1.selectedItems == null ? null : ctx_r1.selectedItems.length) && !ctx_r1.isSelected(val_r65) || val_r65.disabled);
  }
}
function AngularMultiSelect_div_31_span_2_span_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span")(1, "li", 66);
    ɵɵlistener("click", function AngularMultiSelect_div_31_span_2_span_6_Template_li_click_1_listener($event) {
      const ctx_r63 = ɵɵrestoreView(_r63);
      const val_r65 = ctx_r63.$implicit;
      const j_r66 = ctx_r63.index;
      const ctx_r1 = ɵɵnextContext(3);
      ctx_r1.onItemClick(val_r65, j_r66, $event);
      return ɵɵresetView($event.stopPropagation());
    });
    ɵɵtemplate(2, AngularMultiSelect_div_31_span_2_span_6_input_2_Template, 1, 2, "input", 69);
    ɵɵelementStart(3, "label");
    ɵɵtext(4);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const val_r65 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction3(3, _c17, ctx_r1.isSelected(val_r65) == true, val_r65.grpTitle, !val_r65.grpTitle && !ctx_r1.settings.singleSelection));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.showCheckbox);
    ɵɵadvance(2);
    ɵɵtextInterpolate(val_r65[ctx_r1.settings.labelKey]);
  }
}
function AngularMultiSelect_div_31_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r61 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span")(1, "li", 66);
    ɵɵlistener("click", function AngularMultiSelect_div_31_span_2_Template_li_click_1_listener() {
      const item_r62 = ɵɵrestoreView(_r61).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.selectGroup(item_r62));
    });
    ɵɵtemplate(2, AngularMultiSelect_div_31_span_2_input_2_Template, 1, 2, "input", 69);
    ɵɵelementStart(3, "label");
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "ul", 64);
    ɵɵtemplate(6, AngularMultiSelect_div_31_span_2_span_6_Template, 5, 7, "span", 71);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const item_r62 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction2(4, _c15, item_r62.grpTitle, !item_r62.grpTitle && !ctx_r1.settings.singleSelection));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.settings.showCheckbox && !ctx_r1.settings.singleSelection);
    ɵɵadvance(2);
    ɵɵtextInterpolate(item_r62[ctx_r1.settings.labelKey]);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", item_r62.list);
  }
}
function AngularMultiSelect_div_31_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 63)(1, "ul", 64);
    ɵɵtemplate(2, AngularMultiSelect_div_31_span_2_Template, 7, 7, "span", 71);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("max-height", ctx_r1.settings.maxHeight + "px");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r1.groupedData);
  }
}
function AngularMultiSelect_h5_32_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "h5", 76);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.settings.noDataLabel);
  }
}
var MyException = class {
  status;
  body;
  constructor(status, body) {
    this.status = status;
    this.body = body;
  }
};
var ClickOutsideDirective = class _ClickOutsideDirective {
  _elementRef;
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
  clickOutside = new EventEmitter();
  onClick(event, targetElement) {
    if (!targetElement) {
      return;
    }
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
  static ɵfac = function ClickOutsideDirective_Factory(t) {
    return new (t || _ClickOutsideDirective)(ɵɵdirectiveInject(ElementRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _ClickOutsideDirective,
    selectors: [["", "clickOutside", ""]],
    hostBindings: function ClickOutsideDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("pointerdown", function ClickOutsideDirective_pointerdown_HostBindingHandler($event) {
          return ctx.onClick($event, $event.target);
        }, false, ɵɵresolveDocument)("touchstart", function ClickOutsideDirective_touchstart_HostBindingHandler($event) {
          return ctx.onClick($event, $event.target);
        }, false, ɵɵresolveDocument);
      }
    },
    outputs: {
      clickOutside: "clickOutside"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClickOutsideDirective, [{
    type: Directive,
    args: [{
      selector: "[clickOutside]"
    }]
  }], () => [{
    type: ElementRef
  }], {
    clickOutside: [{
      type: Output
    }],
    onClick: [{
      type: HostListener,
      args: ["document:pointerdown", ["$event", "$event.target"]]
    }, {
      type: HostListener,
      args: ["document:touchstart", ["$event", "$event.target"]]
    }]
  });
})();
var ScrollDirective = class _ScrollDirective {
  _elementRef;
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
  scroll = new EventEmitter();
  onClick(event, targetElement) {
    this.scroll.emit(event);
  }
  static ɵfac = function ScrollDirective_Factory(t) {
    return new (t || _ScrollDirective)(ɵɵdirectiveInject(ElementRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _ScrollDirective,
    selectors: [["", "scroll", ""]],
    hostBindings: function ScrollDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("scroll", function ScrollDirective_scroll_HostBindingHandler($event) {
          return ctx.onClick($event);
        });
      }
    },
    outputs: {
      scroll: "scroll"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollDirective, [{
    type: Directive,
    args: [{
      selector: "[scroll]"
    }]
  }], () => [{
    type: ElementRef
  }], {
    scroll: [{
      type: Output
    }],
    onClick: [{
      type: HostListener,
      args: ["scroll", ["$event"]]
    }]
  });
})();
var styleDirective = class _styleDirective {
  el;
  constructor(el) {
    this.el = el;
  }
  styleVal;
  ngOnInit() {
    this.el.nativeElement.style.top = this.styleVal;
  }
  ngOnChanges() {
    this.el.nativeElement.style.top = this.styleVal;
  }
  static ɵfac = function styleDirective_Factory(t) {
    return new (t || _styleDirective)(ɵɵdirectiveInject(ElementRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _styleDirective,
    selectors: [["", "styleProp", ""]],
    inputs: {
      styleVal: [InputFlags.None, "styleProp", "styleVal"]
    },
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(styleDirective, [{
    type: Directive,
    args: [{
      selector: "[styleProp]"
    }]
  }], () => [{
    type: ElementRef
  }], {
    styleVal: [{
      type: Input,
      args: ["styleProp"]
    }]
  });
})();
var setPosition = class _setPosition {
  el;
  height;
  constructor(el) {
    this.el = el;
  }
  ngOnInit() {
    if (this.height) {
      this.el.nativeElement.style.bottom = parseInt(this.height + 15 + "") + "px";
    }
  }
  ngOnChanges() {
    if (this.height) {
      this.el.nativeElement.style.bottom = parseInt(this.height + 15 + "") + "px";
    }
  }
  static ɵfac = function setPosition_Factory(t) {
    return new (t || _setPosition)(ɵɵdirectiveInject(ElementRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _setPosition,
    selectors: [["", "setPosition", ""]],
    inputs: {
      height: [InputFlags.None, "setPosition", "height"]
    },
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(setPosition, [{
    type: Directive,
    args: [{
      selector: "[setPosition]"
    }]
  }], () => [{
    type: ElementRef
  }], {
    height: [{
      type: Input,
      args: ["setPosition"]
    }]
  });
})();
var DataService = class _DataService {
  filteredData = [];
  subject = new Subject();
  setData(data) {
    this.filteredData = data;
    this.subject.next(data);
  }
  getData() {
    return this.subject.asObservable();
  }
  getFilteredData() {
    if (this.filteredData && this.filteredData.length > 0) {
      return this.filteredData;
    } else {
      return [];
    }
  }
  static ɵfac = function DataService_Factory(t) {
    return new (t || _DataService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _DataService,
    factory: _DataService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataService, [{
    type: Injectable
  }], null, null);
})();
var ListFilterPipe = class _ListFilterPipe {
  ds;
  filteredList = [];
  constructor(ds) {
    this.ds = ds;
  }
  transform(items, filter, searchBy) {
    if (!items || !filter || filter == "") {
      return items;
    }
    this.filteredList = items.filter((item) => this.applyFilter(item, filter, searchBy));
    return this.filteredList;
  }
  applyFilter(item, filter, searchBy) {
    let found = false;
    if (searchBy.length > 0) {
      if (item.grpTitle) {
        found = true;
      } else {
        for (var t = 0; t < searchBy.length; t++) {
          if (filter && item[searchBy[t]] && item[searchBy[t]] != "") {
            if (item[searchBy[t]].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
              found = true;
            }
          }
        }
      }
    } else {
      if (item.grpTitle) {
        found = true;
      } else {
        for (var prop in item) {
          if (filter && item[prop]) {
            if (item[prop].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
              found = true;
            }
          }
        }
      }
    }
    return found;
  }
  static ɵfac = function ListFilterPipe_Factory(t) {
    return new (t || _ListFilterPipe)(ɵɵdirectiveInject(DataService, 16));
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "listFilter",
    type: _ListFilterPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListFilterPipe, [{
    type: Pipe,
    args: [{
      name: "listFilter",
      pure: true
    }]
  }], () => [{
    type: DataService
  }], null);
})();
var Item = class _Item {
  template;
  constructor() {
  }
  static ɵfac = function Item_Factory(t) {
    return new (t || _Item)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Item,
    selectors: [["c-item"]],
    contentQueries: function Item_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, TemplateRef, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
      }
    },
    decls: 0,
    vars: 0,
    template: function Item_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Item, [{
    type: Component,
    args: [{
      selector: "c-item",
      template: ``
    }]
  }], () => [], {
    template: [{
      type: ContentChild,
      args: [TemplateRef, {
        static: true
      }]
    }]
  });
})();
var Badge = class _Badge {
  template;
  constructor() {
  }
  static ɵfac = function Badge_Factory(t) {
    return new (t || _Badge)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Badge,
    selectors: [["c-badge"]],
    contentQueries: function Badge_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, TemplateRef, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
      }
    },
    decls: 0,
    vars: 0,
    template: function Badge_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Badge, [{
    type: Component,
    args: [{
      selector: "c-badge",
      template: ``
    }]
  }], () => [], {
    template: [{
      type: ContentChild,
      args: [TemplateRef, {
        static: true
      }]
    }]
  });
})();
var Search = class _Search {
  template;
  constructor() {
  }
  static ɵfac = function Search_Factory(t) {
    return new (t || _Search)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Search,
    selectors: [["c-search"]],
    contentQueries: function Search_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, TemplateRef, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
      }
    },
    decls: 0,
    vars: 0,
    template: function Search_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Search, [{
    type: Component,
    args: [{
      selector: "c-search",
      template: ``
    }]
  }], () => [], {
    template: [{
      type: ContentChild,
      args: [TemplateRef, {
        static: true
      }]
    }]
  });
})();
var TemplateRenderer = class _TemplateRenderer {
  viewContainer;
  data;
  item;
  view;
  constructor(viewContainer) {
    this.viewContainer = viewContainer;
  }
  ngOnInit() {
    this.view = this.viewContainer.createEmbeddedView(this.data.template, {
      "$implicit": this.data,
      "item": this.item
    });
  }
  ngOnDestroy() {
    this.view.destroy();
  }
  static ɵfac = function TemplateRenderer_Factory(t) {
    return new (t || _TemplateRenderer)(ɵɵdirectiveInject(ViewContainerRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _TemplateRenderer,
    selectors: [["c-templateRenderer"]],
    inputs: {
      data: "data",
      item: "item"
    },
    decls: 0,
    vars: 0,
    template: function TemplateRenderer_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TemplateRenderer, [{
    type: Component,
    args: [{
      selector: "c-templateRenderer",
      template: ``
    }]
  }], () => [{
    type: ViewContainerRef
  }], {
    data: [{
      type: Input
    }],
    item: [{
      type: Input
    }]
  });
})();
var CIcon = class _CIcon {
  name;
  static ɵfac = function CIcon_Factory(t) {
    return new (t || _CIcon)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _CIcon,
    selectors: [["c-icon"]],
    inputs: {
      name: "name"
    },
    decls: 5,
    vars: 5,
    consts: [["width", "100%", "height", "100%", "version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 47.971 47.971", "style", "enable-background:new 0 0 47.971 47.971;", 0, "xml", "space", "preserve", 4, "ngIf"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "width", "100%", "height", "100%", "viewBox", "0 0 612 612", "style", "enable-background:new 0 0 612 612;", 0, "xml", "space", "preserve", 4, "ngIf"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "width", "100%", "height", "100%", "viewBox", "0 0 615.52 615.52", "style", "enable-background:new 0 0 615.52 615.52;", 0, "xml", "space", "preserve", 4, "ngIf"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 51.976 51.976", "style", "enable-background:new 0 0 51.976 51.976;", 0, "xml", "space", "preserve", 4, "ngIf"], ["width", "100%", "height", "100%", "version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 47.971 47.971", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 47.971 47.971"], ["d", "M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88\n                                c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242\n                                C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879\n                                s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "width", "100%", "height", "100%", "viewBox", "0 0 612 612", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 612 612"], ["id", "_x31_0_34_"], ["d", "M604.501,134.782c-9.999-10.05-26.222-10.05-36.221,0L306.014,422.558L43.721,134.782\n				c-9.999-10.05-26.223-10.05-36.222,0s-9.999,26.35,0,36.399l279.103,306.241c5.331,5.357,12.422,7.652,19.386,7.296\n				c6.988,0.356,14.055-1.939,19.386-7.296l279.128-306.268C614.5,161.106,614.5,144.832,604.501,134.782z"], ["id", "_x39__30_"], ["d", "M604.501,440.509L325.398,134.956c-5.331-5.357-12.423-7.627-19.386-7.27c-6.989-0.357-14.056,1.913-19.387,7.27\n				L7.499,440.509c-9.999,10.024-9.999,26.298,0,36.323s26.223,10.024,36.222,0l262.293-287.164L568.28,476.832\n				c9.999,10.024,26.222,10.024,36.221,0C614.5,466.809,614.5,450.534,604.501,440.509z"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "width", "100%", "height", "100%", "viewBox", "0 0 615.52 615.52", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 615.52 615.52"], ["id", "Search__x28_and_thou_shall_find_x29_"], ["d", "M602.531,549.736l-184.31-185.368c26.679-37.72,42.528-83.729,42.528-133.548C460.75,103.35,357.997,0,231.258,0\n					C104.518,0,1.765,103.35,1.765,230.82c0,127.47,102.753,230.82,229.493,230.82c49.53,0,95.271-15.944,132.78-42.777\n					l184.31,185.366c7.482,7.521,17.292,11.291,27.102,11.291c9.812,0,19.62-3.77,27.083-11.291\n					C617.496,589.188,617.496,564.777,602.531,549.736z M355.9,319.763l-15.042,21.273L319.7,356.174\n					c-26.083,18.658-56.667,28.526-88.442,28.526c-84.365,0-152.995-69.035-152.995-153.88c0-84.846,68.63-153.88,152.995-153.88\n					s152.996,69.034,152.996,153.88C384.271,262.769,374.462,293.526,355.9,319.763z"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 51.976 51.976", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 51.976 51.976"], ["d", "M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0\n		C54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778\n		c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828\n		c0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828\n		l-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z"]],
    template: function CIcon_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, CIcon__svg_svg_0_Template, 3, 0, "svg", 0)(1, CIcon__svg_svg_1_Template, 5, 0, "svg", 1)(2, CIcon__svg_svg_2_Template, 5, 0, "svg", 1)(3, CIcon__svg_svg_3_Template, 6, 0, "svg", 2)(4, CIcon__svg_svg_4_Template, 3, 0, "svg", 3);
      }
      if (rf & 2) {
        ɵɵproperty("ngIf", ctx.name == "remove");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.name == "angle-down");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.name == "angle-up");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.name == "search");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.name == "clear");
      }
    },
    dependencies: [NgIf],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CIcon, [{
    type: Component,
    args: [{
      selector: "c-icon",
      template: `<svg *ngIf="name == 'remove'" width="100%" height="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 47.971 47.971" style="enable-background:new 0 0 47.971 47.971;" xml:space="preserve">
                        <g>
                            <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
                                c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
                                C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
                                s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
                        </g>
                    </svg>
            <svg *ngIf="name == 'angle-down'" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="100%" height="100%" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve">
<g>
	<g id="_x31_0_34_">
		<g>
			<path d="M604.501,134.782c-9.999-10.05-26.222-10.05-36.221,0L306.014,422.558L43.721,134.782
				c-9.999-10.05-26.223-10.05-36.222,0s-9.999,26.35,0,36.399l279.103,306.241c5.331,5.357,12.422,7.652,19.386,7.296
				c6.988,0.356,14.055-1.939,19.386-7.296l279.128-306.268C614.5,161.106,614.5,144.832,604.501,134.782z"/>
		</g>
	</g>
</g>
</svg>
<svg *ngIf="name == 'angle-up'" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="100%" height="100%" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve">
<g>
	<g id="_x39__30_">
		<g>
			<path d="M604.501,440.509L325.398,134.956c-5.331-5.357-12.423-7.627-19.386-7.27c-6.989-0.357-14.056,1.913-19.387,7.27
				L7.499,440.509c-9.999,10.024-9.999,26.298,0,36.323s26.223,10.024,36.222,0l262.293-287.164L568.28,476.832
				c9.999,10.024,26.222,10.024,36.221,0C614.5,466.809,614.5,450.534,604.501,440.509z"/>
		</g>
	</g>
</g>

</svg>
<svg *ngIf="name == 'search'" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="100%" height="100%" viewBox="0 0 615.52 615.52" style="enable-background:new 0 0 615.52 615.52;"
	 xml:space="preserve">
<g>
	<g>
		<g id="Search__x28_and_thou_shall_find_x29_">
			<g>
				<path d="M602.531,549.736l-184.31-185.368c26.679-37.72,42.528-83.729,42.528-133.548C460.75,103.35,357.997,0,231.258,0
					C104.518,0,1.765,103.35,1.765,230.82c0,127.47,102.753,230.82,229.493,230.82c49.53,0,95.271-15.944,132.78-42.777
					l184.31,185.366c7.482,7.521,17.292,11.291,27.102,11.291c9.812,0,19.62-3.77,27.083-11.291
					C617.496,589.188,617.496,564.777,602.531,549.736z M355.9,319.763l-15.042,21.273L319.7,356.174
					c-26.083,18.658-56.667,28.526-88.442,28.526c-84.365,0-152.995-69.035-152.995-153.88c0-84.846,68.63-153.88,152.995-153.88
					s152.996,69.034,152.996,153.88C384.271,262.769,374.462,293.526,355.9,319.763z"/>
			</g>
		</g>
	</g>
</g>

</svg>
<svg *ngIf="name == 'clear'" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 51.976 51.976" style="enable-background:new 0 0 51.976 51.976;" xml:space="preserve">
<g>
	<path d="M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0
		C54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778
		c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828
		c0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828
		l-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z"/>
</g>
</svg>`,
      encapsulation: ViewEncapsulation$1.None
    }]
  }], null, {
    name: [{
      type: Input
    }]
  });
})();
function VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY() {
  return {
    scrollThrottlingTime: 0,
    scrollDebounceTime: 0,
    scrollAnimationTime: 750,
    checkResizeInterval: 1e3,
    resizeBypassRefreshThreshold: 5,
    modifyOverflowStyleOfParentScroll: true,
    stripedTable: false
  };
}
var VirtualScrollerComponent = class _VirtualScrollerComponent {
  element;
  renderer;
  zone;
  changeDetectorRef;
  viewPortItems;
  window = window;
  get viewPortInfo() {
    let pageInfo = this.previousViewPort || {};
    return {
      startIndex: pageInfo.startIndex || 0,
      endIndex: pageInfo.endIndex || 0,
      scrollStartPosition: pageInfo.scrollStartPosition || 0,
      scrollEndPosition: pageInfo.scrollEndPosition || 0,
      maxScrollPosition: pageInfo.maxScrollPosition || 0,
      startIndexWithBuffer: pageInfo.startIndexWithBuffer || 0,
      endIndexWithBuffer: pageInfo.endIndexWithBuffer || 0
    };
  }
  executeRefreshOutsideAngularZone = false;
  _enableUnequalChildrenSizes = false;
  get enableUnequalChildrenSizes() {
    return this._enableUnequalChildrenSizes;
  }
  set enableUnequalChildrenSizes(value) {
    if (this._enableUnequalChildrenSizes === value) {
      return;
    }
    this._enableUnequalChildrenSizes = value;
    this.minMeasuredChildWidth = void 0;
    this.minMeasuredChildHeight = void 0;
  }
  useMarginInsteadOfTranslate = false;
  modifyOverflowStyleOfParentScroll;
  stripedTable;
  scrollbarWidth;
  scrollbarHeight;
  childWidth;
  childHeight;
  ssrChildWidth;
  ssrChildHeight;
  ssrViewportWidth = 1920;
  ssrViewportHeight = 1080;
  _bufferAmount = 0;
  get bufferAmount() {
    if (typeof this._bufferAmount === "number" && this._bufferAmount >= 0) {
      return this._bufferAmount;
    } else {
      return this.enableUnequalChildrenSizes ? 5 : 0;
    }
  }
  set bufferAmount(value) {
    this._bufferAmount = value;
  }
  scrollAnimationTime;
  resizeBypassRefreshThreshold;
  _scrollThrottlingTime;
  get scrollThrottlingTime() {
    return this._scrollThrottlingTime;
  }
  set scrollThrottlingTime(value) {
    this._scrollThrottlingTime = value;
    this.updateOnScrollFunction();
  }
  _scrollDebounceTime;
  get scrollDebounceTime() {
    return this._scrollDebounceTime;
  }
  set scrollDebounceTime(value) {
    this._scrollDebounceTime = value;
    this.updateOnScrollFunction();
  }
  onScroll;
  updateOnScrollFunction() {
    if (this.scrollDebounceTime) {
      this.onScroll = this.debounce(() => {
        this.refresh_internal(false);
      }, this.scrollDebounceTime);
    } else if (this.scrollThrottlingTime) {
      this.onScroll = this.throttleTrailing(() => {
        this.refresh_internal(false);
      }, this.scrollThrottlingTime);
    } else {
      this.onScroll = () => {
        this.refresh_internal(false);
      };
    }
  }
  checkScrollElementResizedTimer;
  _checkResizeInterval;
  get checkResizeInterval() {
    return this._checkResizeInterval;
  }
  set checkResizeInterval(value) {
    if (this._checkResizeInterval === value) {
      return;
    }
    this._checkResizeInterval = value;
    this.addScrollEventHandlers();
  }
  _items = [];
  get items() {
    return this._items;
  }
  set items(value) {
    if (value === this._items) {
      return;
    }
    this._items = value || [];
    this.refresh_internal(true);
  }
  compareItems = (item1, item2) => item1 === item2;
  _horizontal;
  get horizontal() {
    return this._horizontal;
  }
  set horizontal(value) {
    this._horizontal = value;
    this.updateDirection();
  }
  revertParentOverscroll() {
    const scrollElement = this.getScrollElement();
    if (scrollElement && this.oldParentScrollOverflow) {
      scrollElement.style["overflow-y"] = this.oldParentScrollOverflow.y;
      scrollElement.style["overflow-x"] = this.oldParentScrollOverflow.x;
    }
    this.oldParentScrollOverflow = void 0;
  }
  oldParentScrollOverflow;
  _parentScroll;
  get parentScroll() {
    return this._parentScroll;
  }
  set parentScroll(value) {
    if (this._parentScroll === value) {
      return;
    }
    this.revertParentOverscroll();
    this._parentScroll = value;
    this.addScrollEventHandlers();
    const scrollElement = this.getScrollElement();
    if (this.modifyOverflowStyleOfParentScroll && scrollElement !== this.element.nativeElement) {
      this.oldParentScrollOverflow = {
        x: scrollElement.style["overflow-x"],
        y: scrollElement.style["overflow-y"]
      };
      scrollElement.style["overflow-y"] = this.horizontal ? "visible" : "auto";
      scrollElement.style["overflow-x"] = this.horizontal ? "auto" : "visible";
    }
  }
  vsUpdate = new EventEmitter();
  vsChange = new EventEmitter();
  vsStart = new EventEmitter();
  vsEnd = new EventEmitter();
  contentElementRef;
  invisiblePaddingElementRef;
  headerElementRef;
  containerElementRef;
  ngOnInit() {
    this.addScrollEventHandlers();
  }
  ngOnDestroy() {
    this.removeScrollEventHandlers();
    this.revertParentOverscroll();
  }
  ngOnChanges(changes) {
    let indexLengthChanged = this.cachedItemsLength !== this.items.length;
    this.cachedItemsLength = this.items.length;
    const firstRun = !changes.items || !changes.items.previousValue || changes.items.previousValue.length === 0;
    this.refresh_internal(indexLengthChanged || firstRun);
  }
  ngDoCheck() {
    if (this.cachedItemsLength !== this.items.length) {
      this.cachedItemsLength = this.items.length;
      this.refresh_internal(true);
      return;
    }
    if (this.previousViewPort && this.viewPortItems && this.viewPortItems.length > 0) {
      let itemsArrayChanged = false;
      for (let i = 0; i < this.viewPortItems.length; ++i) {
        if (!this.compareItems(this.items[this.previousViewPort.startIndexWithBuffer + i], this.viewPortItems[i])) {
          itemsArrayChanged = true;
          break;
        }
      }
      if (itemsArrayChanged) {
        this.refresh_internal(true);
      }
    }
  }
  refresh() {
    this.refresh_internal(true);
  }
  invalidateAllCachedMeasurements() {
    this.wrapGroupDimensions = {
      maxChildSizePerWrapGroup: [],
      numberOfKnownWrapGroupChildSizes: 0,
      sumOfKnownWrapGroupChildWidths: 0,
      sumOfKnownWrapGroupChildHeights: 0
    };
    this.minMeasuredChildWidth = void 0;
    this.minMeasuredChildHeight = void 0;
    this.refresh_internal(false);
  }
  invalidateCachedMeasurementForItem(item) {
    if (this.enableUnequalChildrenSizes) {
      let index = this.items && this.items.indexOf(item);
      if (index >= 0) {
        this.invalidateCachedMeasurementAtIndex(index);
      }
    } else {
      this.minMeasuredChildWidth = void 0;
      this.minMeasuredChildHeight = void 0;
    }
    this.refresh_internal(false);
  }
  invalidateCachedMeasurementAtIndex(index) {
    if (this.enableUnequalChildrenSizes) {
      let cachedMeasurement = this.wrapGroupDimensions.maxChildSizePerWrapGroup[index];
      if (cachedMeasurement) {
        this.wrapGroupDimensions.maxChildSizePerWrapGroup[index] = void 0;
        --this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
        this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths -= cachedMeasurement.childWidth || 0;
        this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights -= cachedMeasurement.childHeight || 0;
      }
    } else {
      this.minMeasuredChildWidth = void 0;
      this.minMeasuredChildHeight = void 0;
    }
    this.refresh_internal(false);
  }
  scrollInto(item, alignToBeginning = true, additionalOffset = 0, animationMilliseconds = void 0, animationCompletedCallback = void 0) {
    let index = this.items.indexOf(item);
    if (index === -1) {
      return;
    }
    this.scrollToIndex(index, alignToBeginning, additionalOffset, animationMilliseconds, animationCompletedCallback);
  }
  scrollToIndex(index, alignToBeginning = true, additionalOffset = 0, animationMilliseconds = void 0, animationCompletedCallback = void 0) {
    let maxRetries = 5;
    let retryIfNeeded = () => {
      --maxRetries;
      if (maxRetries <= 0) {
        if (animationCompletedCallback) {
          animationCompletedCallback();
        }
        return;
      }
      let dimensions = this.calculateDimensions();
      let desiredStartIndex = Math.min(Math.max(index, 0), dimensions.itemCount - 1);
      if (this.previousViewPort.startIndex === desiredStartIndex) {
        if (animationCompletedCallback) {
          animationCompletedCallback();
        }
        return;
      }
      this.scrollToIndex_internal(index, alignToBeginning, additionalOffset, 0, retryIfNeeded);
    };
    this.scrollToIndex_internal(index, alignToBeginning, additionalOffset, animationMilliseconds, retryIfNeeded);
  }
  scrollToIndex_internal(index, alignToBeginning = true, additionalOffset = 0, animationMilliseconds = void 0, animationCompletedCallback = void 0) {
    animationMilliseconds = animationMilliseconds === void 0 ? this.scrollAnimationTime : animationMilliseconds;
    let dimensions = this.calculateDimensions();
    let scroll = this.calculatePadding(index, dimensions) + additionalOffset;
    if (!alignToBeginning) {
      scroll -= dimensions.wrapGroupsPerPage * dimensions[this._childScrollDim];
    }
    this.scrollToPosition(scroll, animationMilliseconds, animationCompletedCallback);
  }
  scrollToPosition(scrollPosition, animationMilliseconds = void 0, animationCompletedCallback = void 0) {
    scrollPosition += this.getElementsOffset();
    animationMilliseconds = animationMilliseconds === void 0 ? this.scrollAnimationTime : animationMilliseconds;
    let scrollElement = this.getScrollElement();
    let animationRequest;
    if (this.currentTween) {
      this.currentTween.stop();
      this.currentTween = void 0;
    }
    if (!animationMilliseconds) {
      this.renderer.setProperty(scrollElement, this._scrollType, scrollPosition);
      this.refresh_internal(false, animationCompletedCallback);
      return;
    }
    const tweenConfigObj = {
      scrollPosition: scrollElement[this._scrollType]
    };
    let newTween = new tween.Tween(tweenConfigObj).to({
      scrollPosition
    }, animationMilliseconds).easing(tween.Easing.Quadratic.Out).onUpdate((data) => {
      if (isNaN(data.scrollPosition)) {
        return;
      }
      this.renderer.setProperty(scrollElement, this._scrollType, data.scrollPosition);
      this.refresh_internal(false);
    }).onStop(() => {
      cancelAnimationFrame(animationRequest);
    }).start();
    const animate = (time) => {
      if (!newTween["isPlaying"]()) {
        return;
      }
      newTween.update(time);
      if (tweenConfigObj.scrollPosition === scrollPosition) {
        this.refresh_internal(false, animationCompletedCallback);
        return;
      }
      this.zone.runOutsideAngular(() => {
        animationRequest = requestAnimationFrame(animate);
      });
    };
    animate();
    this.currentTween = newTween;
  }
  isAngularUniversalSSR;
  constructor(element, renderer, zone, changeDetectorRef, platformId, options) {
    this.element = element;
    this.renderer = renderer;
    this.zone = zone;
    this.changeDetectorRef = changeDetectorRef;
    this.isAngularUniversalSSR = isPlatformServer(platformId);
    this.scrollThrottlingTime = options.scrollThrottlingTime;
    this.scrollDebounceTime = options.scrollDebounceTime;
    this.scrollAnimationTime = options.scrollAnimationTime;
    this.scrollbarWidth = options.scrollbarWidth;
    this.scrollbarHeight = options.scrollbarHeight;
    this.checkResizeInterval = options.checkResizeInterval;
    this.resizeBypassRefreshThreshold = options.resizeBypassRefreshThreshold;
    this.modifyOverflowStyleOfParentScroll = options.modifyOverflowStyleOfParentScroll;
    this.stripedTable = options.stripedTable;
    this.horizontal = false;
    this.resetWrapGroupDimensions();
  }
  getElementSize(element) {
    let result = element.getBoundingClientRect();
    let styles = getComputedStyle(element);
    let marginTop = parseInt(styles["margin-top"], 10) || 0;
    let marginBottom = parseInt(styles["margin-bottom"], 10) || 0;
    let marginLeft = parseInt(styles["margin-left"], 10) || 0;
    let marginRight = parseInt(styles["margin-right"], 10) || 0;
    return {
      top: result.top + marginTop,
      bottom: result.bottom + marginBottom,
      left: result.left + marginLeft,
      right: result.right + marginRight,
      width: result.width + marginLeft + marginRight,
      height: result.height + marginTop + marginBottom,
      y: result.top + marginTop,
      x: result.left + marginLeft,
      toJSON() {
        result.toJSON();
      }
    };
  }
  previousScrollBoundingRect;
  checkScrollElementResized() {
    let boundingRect = this.getElementSize(this.getScrollElement());
    let sizeChanged;
    if (!this.previousScrollBoundingRect) {
      sizeChanged = true;
    } else {
      let widthChange = Math.abs(boundingRect.width - this.previousScrollBoundingRect.width);
      let heightChange = Math.abs(boundingRect.height - this.previousScrollBoundingRect.height);
      sizeChanged = widthChange > this.resizeBypassRefreshThreshold || heightChange > this.resizeBypassRefreshThreshold;
    }
    if (sizeChanged) {
      this.previousScrollBoundingRect = boundingRect;
      if (boundingRect.width > 0 && boundingRect.height > 0) {
        this.refresh_internal(false);
      }
    }
  }
  _invisiblePaddingProperty;
  _offsetType;
  _scrollType;
  _pageOffsetType;
  _childScrollDim;
  _translateDir;
  _marginDir;
  updateDirection() {
    if (this.horizontal) {
      this._invisiblePaddingProperty = "width";
      this._offsetType = "offsetLeft";
      this._pageOffsetType = "pageXOffset";
      this._childScrollDim = "childWidth";
      this._marginDir = "margin-left";
      this._translateDir = "translateX";
      this._scrollType = "scrollLeft";
    } else {
      this._invisiblePaddingProperty = "height";
      this._offsetType = "offsetTop";
      this._pageOffsetType = "pageYOffset";
      this._childScrollDim = "childHeight";
      this._marginDir = "margin-top";
      this._translateDir = "translateY";
      this._scrollType = "scrollTop";
    }
  }
  debounce(func, wait) {
    const throttled = this.throttleTrailing(func, wait);
    const result = function() {
      throttled["cancel"]();
      throttled.apply(this, arguments);
    };
    result["cancel"] = function() {
      throttled["cancel"]();
    };
    return result;
  }
  throttleTrailing(func, wait) {
    let timeout = void 0;
    let _arguments = arguments;
    const result = function() {
      const _this = this;
      _arguments = arguments;
      if (timeout) {
        return;
      }
      if (wait <= 0) {
        func.apply(_this, _arguments);
      } else {
        timeout = setTimeout(function() {
          timeout = void 0;
          func.apply(_this, _arguments);
        }, wait);
      }
    };
    result["cancel"] = function() {
      if (timeout) {
        clearTimeout(timeout);
        timeout = void 0;
      }
    };
    return result;
  }
  calculatedScrollbarWidth = 0;
  calculatedScrollbarHeight = 0;
  padding = 0;
  previousViewPort = {};
  currentTween;
  cachedItemsLength;
  disposeScrollHandler;
  disposeResizeHandler;
  refresh_internal(itemsArrayModified, refreshCompletedCallback = void 0, maxRunTimes = 2) {
    if (itemsArrayModified && this.previousViewPort && this.previousViewPort.scrollStartPosition > 0) {
      let oldViewPort = this.previousViewPort;
      let oldViewPortItems = this.viewPortItems;
      let oldRefreshCompletedCallback = refreshCompletedCallback;
      refreshCompletedCallback = () => {
        let scrollLengthDelta = this.previousViewPort.scrollLength - oldViewPort.scrollLength;
        if (scrollLengthDelta > 0 && this.viewPortItems) {
          let oldStartItem = oldViewPortItems[0];
          let oldStartItemIndex = this.items.findIndex((x) => this.compareItems(oldStartItem, x));
          if (oldStartItemIndex > this.previousViewPort.startIndexWithBuffer) {
            let itemOrderChanged = false;
            for (let i = 1; i < this.viewPortItems.length; ++i) {
              if (!this.compareItems(this.items[oldStartItemIndex + i], oldViewPortItems[i])) {
                itemOrderChanged = true;
                break;
              }
            }
            if (!itemOrderChanged) {
              this.scrollToPosition(this.previousViewPort.scrollStartPosition + scrollLengthDelta, 0, oldRefreshCompletedCallback);
              return;
            }
          }
        }
        if (oldRefreshCompletedCallback) {
          oldRefreshCompletedCallback();
        }
      };
    }
    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        if (itemsArrayModified) {
          this.resetWrapGroupDimensions();
        }
        let viewport = this.calculateViewport();
        let startChanged = itemsArrayModified || viewport.startIndex !== this.previousViewPort.startIndex;
        let endChanged = itemsArrayModified || viewport.endIndex !== this.previousViewPort.endIndex;
        let scrollLengthChanged = viewport.scrollLength !== this.previousViewPort.scrollLength;
        let paddingChanged = viewport.padding !== this.previousViewPort.padding;
        let scrollPositionChanged = viewport.scrollStartPosition !== this.previousViewPort.scrollStartPosition || viewport.scrollEndPosition !== this.previousViewPort.scrollEndPosition || viewport.maxScrollPosition !== this.previousViewPort.maxScrollPosition;
        this.previousViewPort = viewport;
        if (scrollLengthChanged) {
          this.renderer.setStyle(this.invisiblePaddingElementRef.nativeElement, this._invisiblePaddingProperty, `${viewport.scrollLength}px`);
        }
        if (paddingChanged) {
          if (this.useMarginInsteadOfTranslate) {
            this.renderer.setStyle(this.contentElementRef.nativeElement, this._marginDir, `${viewport.padding}px`);
          } else {
            this.renderer.setStyle(this.contentElementRef.nativeElement, "transform", `${this._translateDir}(${viewport.padding}px)`);
            this.renderer.setStyle(this.contentElementRef.nativeElement, "webkitTransform", `${this._translateDir}(${viewport.padding}px)`);
          }
        }
        if (this.headerElementRef) {
          let scrollPosition = this.getScrollElement()[this._scrollType];
          let containerOffset = this.getElementsOffset();
          let offset = Math.max(scrollPosition - viewport.padding - containerOffset + this.headerElementRef.nativeElement.clientHeight, 0);
          this.renderer.setStyle(this.headerElementRef.nativeElement, "transform", `${this._translateDir}(${offset}px)`);
          this.renderer.setStyle(this.headerElementRef.nativeElement, "webkitTransform", `${this._translateDir}(${offset}px)`);
        }
        const changeEventArg = startChanged || endChanged ? {
          startIndex: viewport.startIndex,
          endIndex: viewport.endIndex,
          scrollStartPosition: viewport.scrollStartPosition,
          scrollEndPosition: viewport.scrollEndPosition,
          startIndexWithBuffer: viewport.startIndexWithBuffer,
          endIndexWithBuffer: viewport.endIndexWithBuffer,
          maxScrollPosition: viewport.maxScrollPosition
        } : void 0;
        if (startChanged || endChanged || scrollPositionChanged) {
          const handleChanged = () => {
            this.viewPortItems = viewport.startIndexWithBuffer >= 0 && viewport.endIndexWithBuffer >= 0 ? this.items.slice(viewport.startIndexWithBuffer, viewport.endIndexWithBuffer + 1) : [];
            this.vsUpdate.emit(this.viewPortItems);
            if (startChanged) {
              this.vsStart.emit(changeEventArg);
            }
            if (endChanged) {
              this.vsEnd.emit(changeEventArg);
            }
            if (startChanged || endChanged) {
              this.changeDetectorRef.markForCheck();
              this.vsChange.emit(changeEventArg);
            }
            if (maxRunTimes > 0) {
              this.refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1);
              return;
            }
            if (refreshCompletedCallback) {
              refreshCompletedCallback();
            }
          };
          if (this.executeRefreshOutsideAngularZone) {
            handleChanged();
          } else {
            this.zone.run(handleChanged);
          }
        } else {
          if (maxRunTimes > 0 && (scrollLengthChanged || paddingChanged)) {
            this.refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1);
            return;
          }
          if (refreshCompletedCallback) {
            refreshCompletedCallback();
          }
        }
      });
    });
  }
  getScrollElement() {
    return this.parentScroll instanceof Window ? document.scrollingElement || document.documentElement || document.body : this.parentScroll || this.element.nativeElement;
  }
  addScrollEventHandlers() {
    if (this.isAngularUniversalSSR) {
      return;
    }
    let scrollElement = this.getScrollElement();
    this.removeScrollEventHandlers();
    this.zone.runOutsideAngular(() => {
      if (this.parentScroll instanceof Window) {
        this.disposeScrollHandler = this.renderer.listen("window", "scroll", this.onScroll);
        this.disposeResizeHandler = this.renderer.listen("window", "resize", this.onScroll);
      } else {
        this.disposeScrollHandler = this.renderer.listen(scrollElement, "scroll", this.onScroll);
        if (this._checkResizeInterval > 0) {
          this.checkScrollElementResizedTimer = setInterval(() => {
            this.checkScrollElementResized();
          }, this._checkResizeInterval);
        }
      }
    });
  }
  removeScrollEventHandlers() {
    if (this.checkScrollElementResizedTimer) {
      clearInterval(this.checkScrollElementResizedTimer);
    }
    if (this.disposeScrollHandler) {
      this.disposeScrollHandler();
      this.disposeScrollHandler = void 0;
    }
    if (this.disposeResizeHandler) {
      this.disposeResizeHandler();
      this.disposeResizeHandler = void 0;
    }
  }
  getElementsOffset() {
    if (this.isAngularUniversalSSR) {
      return 0;
    }
    let offset = 0;
    if (this.containerElementRef && this.containerElementRef.nativeElement) {
      offset += this.containerElementRef.nativeElement[this._offsetType];
    }
    if (this.parentScroll) {
      let scrollElement = this.getScrollElement();
      let elementClientRect = this.getElementSize(this.element.nativeElement);
      let scrollClientRect = this.getElementSize(scrollElement);
      if (this.horizontal) {
        offset += elementClientRect.left - scrollClientRect.left;
      } else {
        offset += elementClientRect.top - scrollClientRect.top;
      }
      if (!(this.parentScroll instanceof Window)) {
        offset += scrollElement[this._scrollType];
      }
    }
    return offset;
  }
  countItemsPerWrapGroup() {
    if (this.isAngularUniversalSSR) {
      return Math.round(this.horizontal ? this.ssrViewportHeight / this.ssrChildHeight : this.ssrViewportWidth / this.ssrChildWidth);
    }
    let propertyName = this.horizontal ? "offsetLeft" : "offsetTop";
    let children = (this.containerElementRef && this.containerElementRef.nativeElement || this.contentElementRef.nativeElement).children;
    let childrenLength = children ? children.length : 0;
    if (childrenLength === 0) {
      return 1;
    }
    let firstOffset = children[0][propertyName];
    let result = 1;
    while (result < childrenLength && firstOffset === children[result][propertyName]) {
      ++result;
    }
    return result;
  }
  getScrollStartPosition() {
    let windowScrollValue = void 0;
    if (this.parentScroll instanceof Window) {
      windowScrollValue = window[this._pageOffsetType];
    }
    return windowScrollValue || this.getScrollElement()[this._scrollType] || 0;
  }
  minMeasuredChildWidth;
  minMeasuredChildHeight;
  wrapGroupDimensions;
  resetWrapGroupDimensions() {
    const oldWrapGroupDimensions = this.wrapGroupDimensions;
    this.invalidateAllCachedMeasurements();
    if (!this.enableUnequalChildrenSizes || !oldWrapGroupDimensions || oldWrapGroupDimensions.numberOfKnownWrapGroupChildSizes === 0) {
      return;
    }
    const itemsPerWrapGroup = this.countItemsPerWrapGroup();
    for (let wrapGroupIndex = 0; wrapGroupIndex < oldWrapGroupDimensions.maxChildSizePerWrapGroup.length; ++wrapGroupIndex) {
      const oldWrapGroupDimension = oldWrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex];
      if (!oldWrapGroupDimension || !oldWrapGroupDimension.items || !oldWrapGroupDimension.items.length) {
        continue;
      }
      if (oldWrapGroupDimension.items.length !== itemsPerWrapGroup) {
        return;
      }
      let itemsChanged = false;
      let arrayStartIndex = itemsPerWrapGroup * wrapGroupIndex;
      for (let i = 0; i < itemsPerWrapGroup; ++i) {
        if (!this.compareItems(oldWrapGroupDimension.items[i], this.items[arrayStartIndex + i])) {
          itemsChanged = true;
          break;
        }
      }
      if (!itemsChanged) {
        ++this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
        this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths += oldWrapGroupDimension.childWidth || 0;
        this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights += oldWrapGroupDimension.childHeight || 0;
        this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex] = oldWrapGroupDimension;
      }
    }
  }
  calculateDimensions() {
    let scrollElement = this.getScrollElement();
    const maxCalculatedScrollBarSize = 25;
    this.calculatedScrollbarHeight = Math.max(Math.min(scrollElement.offsetHeight - scrollElement.clientHeight, maxCalculatedScrollBarSize), this.calculatedScrollbarHeight);
    this.calculatedScrollbarWidth = Math.max(Math.min(scrollElement.offsetWidth - scrollElement.clientWidth, maxCalculatedScrollBarSize), this.calculatedScrollbarWidth);
    let viewportWidth = scrollElement.offsetWidth - (this.scrollbarWidth || this.calculatedScrollbarWidth || (this.horizontal ? 0 : maxCalculatedScrollBarSize));
    let viewportHeight = scrollElement.offsetHeight - (this.scrollbarHeight || this.calculatedScrollbarHeight || (this.horizontal ? maxCalculatedScrollBarSize : 0));
    let content = this.containerElementRef && this.containerElementRef.nativeElement || this.contentElementRef.nativeElement;
    let itemsPerWrapGroup = this.countItemsPerWrapGroup();
    let wrapGroupsPerPage;
    let defaultChildWidth;
    let defaultChildHeight;
    if (this.isAngularUniversalSSR) {
      viewportWidth = this.ssrViewportWidth;
      viewportHeight = this.ssrViewportHeight;
      defaultChildWidth = this.ssrChildWidth;
      defaultChildHeight = this.ssrChildHeight;
      let itemsPerRow = Math.max(Math.ceil(viewportWidth / defaultChildWidth), 1);
      let itemsPerCol = Math.max(Math.ceil(viewportHeight / defaultChildHeight), 1);
      wrapGroupsPerPage = this.horizontal ? itemsPerRow : itemsPerCol;
    } else if (!this.enableUnequalChildrenSizes) {
      if (content.children.length > 0) {
        if (!this.childWidth || !this.childHeight) {
          if (!this.minMeasuredChildWidth && viewportWidth > 0) {
            this.minMeasuredChildWidth = viewportWidth;
          }
          if (!this.minMeasuredChildHeight && viewportHeight > 0) {
            this.minMeasuredChildHeight = viewportHeight;
          }
        }
        let child = content.children[0];
        let clientRect = this.getElementSize(child);
        this.minMeasuredChildWidth = Math.min(this.minMeasuredChildWidth, clientRect.width);
        this.minMeasuredChildHeight = Math.min(this.minMeasuredChildHeight, clientRect.height);
      }
      defaultChildWidth = this.childWidth || this.minMeasuredChildWidth || viewportWidth;
      defaultChildHeight = this.childHeight || this.minMeasuredChildHeight || viewportHeight;
      let itemsPerRow = Math.max(Math.ceil(viewportWidth / defaultChildWidth), 1);
      let itemsPerCol = Math.max(Math.ceil(viewportHeight / defaultChildHeight), 1);
      wrapGroupsPerPage = this.horizontal ? itemsPerRow : itemsPerCol;
    } else {
      let scrollOffset = scrollElement[this._scrollType] - (this.previousViewPort ? this.previousViewPort.padding : 0);
      let arrayStartIndex = this.previousViewPort.startIndexWithBuffer || 0;
      let wrapGroupIndex = Math.ceil(arrayStartIndex / itemsPerWrapGroup);
      let maxWidthForWrapGroup = 0;
      let maxHeightForWrapGroup = 0;
      let sumOfVisibleMaxWidths = 0;
      let sumOfVisibleMaxHeights = 0;
      wrapGroupsPerPage = 0;
      for (let i = 0; i < content.children.length; ++i) {
        ++arrayStartIndex;
        let child = content.children[i];
        let clientRect = this.getElementSize(child);
        maxWidthForWrapGroup = Math.max(maxWidthForWrapGroup, clientRect.width);
        maxHeightForWrapGroup = Math.max(maxHeightForWrapGroup, clientRect.height);
        if (arrayStartIndex % itemsPerWrapGroup === 0) {
          let oldValue = this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex];
          if (oldValue) {
            --this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
            this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths -= oldValue.childWidth || 0;
            this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights -= oldValue.childHeight || 0;
          }
          ++this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
          const items = this.items.slice(arrayStartIndex - itemsPerWrapGroup, arrayStartIndex);
          this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex] = {
            childWidth: maxWidthForWrapGroup,
            childHeight: maxHeightForWrapGroup,
            items
          };
          this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths += maxWidthForWrapGroup;
          this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights += maxHeightForWrapGroup;
          if (this.horizontal) {
            let maxVisibleWidthForWrapGroup = Math.min(maxWidthForWrapGroup, Math.max(viewportWidth - sumOfVisibleMaxWidths, 0));
            if (scrollOffset > 0) {
              let scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleWidthForWrapGroup);
              maxVisibleWidthForWrapGroup -= scrollOffsetToRemove;
              scrollOffset -= scrollOffsetToRemove;
            }
            sumOfVisibleMaxWidths += maxVisibleWidthForWrapGroup;
            if (maxVisibleWidthForWrapGroup > 0 && viewportWidth >= sumOfVisibleMaxWidths) {
              ++wrapGroupsPerPage;
            }
          } else {
            let maxVisibleHeightForWrapGroup = Math.min(maxHeightForWrapGroup, Math.max(viewportHeight - sumOfVisibleMaxHeights, 0));
            if (scrollOffset > 0) {
              let scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleHeightForWrapGroup);
              maxVisibleHeightForWrapGroup -= scrollOffsetToRemove;
              scrollOffset -= scrollOffsetToRemove;
            }
            sumOfVisibleMaxHeights += maxVisibleHeightForWrapGroup;
            if (maxVisibleHeightForWrapGroup > 0 && viewportHeight >= sumOfVisibleMaxHeights) {
              ++wrapGroupsPerPage;
            }
          }
          ++wrapGroupIndex;
          maxWidthForWrapGroup = 0;
          maxHeightForWrapGroup = 0;
        }
      }
      let averageChildWidth = this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths / this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
      let averageChildHeight = this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights / this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
      defaultChildWidth = this.childWidth || averageChildWidth || viewportWidth;
      defaultChildHeight = this.childHeight || averageChildHeight || viewportHeight;
      if (this.horizontal) {
        if (viewportWidth > sumOfVisibleMaxWidths) {
          wrapGroupsPerPage += Math.ceil((viewportWidth - sumOfVisibleMaxWidths) / defaultChildWidth);
        }
      } else {
        if (viewportHeight > sumOfVisibleMaxHeights) {
          wrapGroupsPerPage += Math.ceil((viewportHeight - sumOfVisibleMaxHeights) / defaultChildHeight);
        }
      }
    }
    let itemCount = this.items.length;
    let itemsPerPage = itemsPerWrapGroup * wrapGroupsPerPage;
    let pageCount_fractional = itemCount / itemsPerPage;
    let numberOfWrapGroups = Math.ceil(itemCount / itemsPerWrapGroup);
    let scrollLength = 0;
    let defaultScrollLengthPerWrapGroup = this.horizontal ? defaultChildWidth : defaultChildHeight;
    if (this.enableUnequalChildrenSizes) {
      let numUnknownChildSizes = 0;
      for (let i = 0; i < numberOfWrapGroups; ++i) {
        let childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
        if (childSize) {
          scrollLength += childSize;
        } else {
          ++numUnknownChildSizes;
        }
      }
      scrollLength += Math.round(numUnknownChildSizes * defaultScrollLengthPerWrapGroup);
    } else {
      scrollLength = numberOfWrapGroups * defaultScrollLengthPerWrapGroup;
    }
    if (this.headerElementRef) {
      scrollLength += this.headerElementRef.nativeElement.clientHeight;
    }
    let viewportLength = this.horizontal ? viewportWidth : viewportHeight;
    let maxScrollPosition = Math.max(scrollLength - viewportLength, 0);
    return {
      itemCount,
      itemsPerWrapGroup,
      wrapGroupsPerPage,
      itemsPerPage,
      pageCount_fractional,
      childWidth: defaultChildWidth,
      childHeight: defaultChildHeight,
      scrollLength,
      viewportLength,
      maxScrollPosition
    };
  }
  cachedPageSize = 0;
  previousScrollNumberElements = 0;
  calculatePadding(arrayStartIndexWithBuffer, dimensions) {
    if (dimensions.itemCount === 0) {
      return 0;
    }
    let defaultScrollLengthPerWrapGroup = dimensions[this._childScrollDim];
    let startingWrapGroupIndex = Math.floor(arrayStartIndexWithBuffer / dimensions.itemsPerWrapGroup) || 0;
    if (!this.enableUnequalChildrenSizes) {
      return defaultScrollLengthPerWrapGroup * startingWrapGroupIndex;
    }
    let numUnknownChildSizes = 0;
    let result = 0;
    for (let i = 0; i < startingWrapGroupIndex; ++i) {
      let childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
      if (childSize) {
        result += childSize;
      } else {
        ++numUnknownChildSizes;
      }
    }
    result += Math.round(numUnknownChildSizes * defaultScrollLengthPerWrapGroup);
    return result;
  }
  calculatePageInfo(scrollPosition, dimensions) {
    let scrollPercentage = 0;
    if (this.enableUnequalChildrenSizes) {
      const numberOfWrapGroups = Math.ceil(dimensions.itemCount / dimensions.itemsPerWrapGroup);
      let totalScrolledLength = 0;
      let defaultScrollLengthPerWrapGroup = dimensions[this._childScrollDim];
      for (let i = 0; i < numberOfWrapGroups; ++i) {
        let childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
        if (childSize) {
          totalScrolledLength += childSize;
        } else {
          totalScrolledLength += defaultScrollLengthPerWrapGroup;
        }
        if (scrollPosition < totalScrolledLength) {
          scrollPercentage = i / numberOfWrapGroups;
          break;
        }
      }
    } else {
      scrollPercentage = scrollPosition / dimensions.scrollLength;
    }
    let startingArrayIndex_fractional = Math.min(Math.max(scrollPercentage * dimensions.pageCount_fractional, 0), dimensions.pageCount_fractional) * dimensions.itemsPerPage;
    let maxStart = dimensions.itemCount - dimensions.itemsPerPage - 1;
    let arrayStartIndex = Math.min(Math.floor(startingArrayIndex_fractional), maxStart);
    arrayStartIndex -= arrayStartIndex % dimensions.itemsPerWrapGroup;
    if (this.stripedTable) {
      let bufferBoundary = 2 * dimensions.itemsPerWrapGroup;
      if (arrayStartIndex % bufferBoundary !== 0) {
        arrayStartIndex = Math.max(arrayStartIndex - arrayStartIndex % bufferBoundary, 0);
      }
    }
    let arrayEndIndex = Math.ceil(startingArrayIndex_fractional) + dimensions.itemsPerPage - 1;
    let endIndexWithinWrapGroup = (arrayEndIndex + 1) % dimensions.itemsPerWrapGroup;
    if (endIndexWithinWrapGroup > 0) {
      arrayEndIndex += dimensions.itemsPerWrapGroup - endIndexWithinWrapGroup;
    }
    if (isNaN(arrayStartIndex)) {
      arrayStartIndex = 0;
    }
    if (isNaN(arrayEndIndex)) {
      arrayEndIndex = 0;
    }
    arrayStartIndex = Math.min(Math.max(arrayStartIndex, 0), dimensions.itemCount - 1);
    arrayEndIndex = Math.min(Math.max(arrayEndIndex, 0), dimensions.itemCount - 1);
    let bufferSize = this.bufferAmount * dimensions.itemsPerWrapGroup;
    let startIndexWithBuffer = Math.min(Math.max(arrayStartIndex - bufferSize, 0), dimensions.itemCount - 1);
    let endIndexWithBuffer = Math.min(Math.max(arrayEndIndex + bufferSize, 0), dimensions.itemCount - 1);
    return {
      startIndex: arrayStartIndex,
      endIndex: arrayEndIndex,
      startIndexWithBuffer,
      endIndexWithBuffer,
      scrollStartPosition: scrollPosition,
      scrollEndPosition: scrollPosition + dimensions.viewportLength,
      maxScrollPosition: dimensions.maxScrollPosition
    };
  }
  calculateViewport() {
    let dimensions = this.calculateDimensions();
    let offset = this.getElementsOffset();
    let scrollStartPosition = this.getScrollStartPosition();
    if (scrollStartPosition > dimensions.scrollLength + offset && !(this.parentScroll instanceof Window)) {
      scrollStartPosition = dimensions.scrollLength;
    } else {
      scrollStartPosition -= offset;
    }
    scrollStartPosition = Math.max(0, scrollStartPosition);
    let pageInfo = this.calculatePageInfo(scrollStartPosition, dimensions);
    let newPadding = this.calculatePadding(pageInfo.startIndexWithBuffer, dimensions);
    let newScrollLength = dimensions.scrollLength;
    return {
      startIndex: pageInfo.startIndex,
      endIndex: pageInfo.endIndex,
      startIndexWithBuffer: pageInfo.startIndexWithBuffer,
      endIndexWithBuffer: pageInfo.endIndexWithBuffer,
      padding: Math.round(newPadding),
      scrollLength: Math.round(newScrollLength),
      scrollStartPosition: pageInfo.scrollStartPosition,
      scrollEndPosition: pageInfo.scrollEndPosition,
      maxScrollPosition: pageInfo.maxScrollPosition
    };
  }
  static ɵfac = function VirtualScrollerComponent_Factory(t) {
    return new (t || _VirtualScrollerComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(PLATFORM_ID), ɵɵdirectiveInject("virtual-scroller-default-options", 8));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _VirtualScrollerComponent,
    selectors: [["virtual-scroller"], ["", "virtualScroller", ""]],
    contentQueries: function VirtualScrollerComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 5, ElementRef);
        ɵɵcontentQuery(dirIndex, _c1, 5, ElementRef);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerElementRef = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.containerElementRef = _t.first);
      }
    },
    viewQuery: function VirtualScrollerComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c2, 5, ElementRef);
        ɵɵviewQuery(_c3, 5, ElementRef);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentElementRef = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.invisiblePaddingElementRef = _t.first);
      }
    },
    hostVars: 6,
    hostBindings: function VirtualScrollerComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("horizontal", ctx.horizontal)("vertical", !ctx.horizontal)("selfScroll", !ctx.parentScroll);
      }
    },
    inputs: {
      executeRefreshOutsideAngularZone: "executeRefreshOutsideAngularZone",
      enableUnequalChildrenSizes: "enableUnequalChildrenSizes",
      useMarginInsteadOfTranslate: "useMarginInsteadOfTranslate",
      modifyOverflowStyleOfParentScroll: "modifyOverflowStyleOfParentScroll",
      stripedTable: "stripedTable",
      scrollbarWidth: "scrollbarWidth",
      scrollbarHeight: "scrollbarHeight",
      childWidth: "childWidth",
      childHeight: "childHeight",
      ssrChildWidth: "ssrChildWidth",
      ssrChildHeight: "ssrChildHeight",
      ssrViewportWidth: "ssrViewportWidth",
      ssrViewportHeight: "ssrViewportHeight",
      bufferAmount: "bufferAmount",
      scrollAnimationTime: "scrollAnimationTime",
      resizeBypassRefreshThreshold: "resizeBypassRefreshThreshold",
      scrollThrottlingTime: "scrollThrottlingTime",
      scrollDebounceTime: "scrollDebounceTime",
      checkResizeInterval: "checkResizeInterval",
      items: "items",
      compareItems: "compareItems",
      horizontal: "horizontal",
      parentScroll: "parentScroll"
    },
    outputs: {
      vsUpdate: "vsUpdate",
      vsChange: "vsChange",
      vsStart: "vsStart",
      vsEnd: "vsEnd"
    },
    exportAs: ["virtualScroller"],
    features: [ɵɵNgOnChangesFeature],
    ngContentSelectors: _c4,
    decls: 5,
    vars: 0,
    consts: [["invisiblePadding", ""], ["content", ""], [1, "total-padding"], [1, "scrollable-content"]],
    template: function VirtualScrollerComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelement(0, "div", 2, 0);
        ɵɵelementStart(2, "div", 3, 1);
        ɵɵprojection(4);
        ɵɵelementEnd();
      }
    },
    styles: ["[_nghost-%COMP%]{position:relative;display:block;-webkit-overflow-scrolling:touch}.horizontal.selfScroll[_nghost-%COMP%]{overflow-y:visible;overflow-x:auto}.vertical.selfScroll[_nghost-%COMP%]{overflow-y:auto;overflow-x:visible}.scrollable-content[_ngcontent-%COMP%]{top:0;left:0;width:100%;height:100%;max-width:100vw;max-height:100vh;position:absolute}.scrollable-content[_ngcontent-%COMP%]    >*{box-sizing:border-box}.horizontal[_nghost-%COMP%]{white-space:nowrap}.horizontal[_nghost-%COMP%]   .scrollable-content[_ngcontent-%COMP%]{display:flex}.horizontal[_nghost-%COMP%]   .scrollable-content[_ngcontent-%COMP%]    >*{flex-shrink:0;flex-grow:0;white-space:initial}.total-padding[_ngcontent-%COMP%]{width:1px;opacity:0}.horizontal[_nghost-%COMP%]   .total-padding[_ngcontent-%COMP%]{height:100%}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VirtualScrollerComponent, [{
    type: Component,
    args: [{
      selector: "virtual-scroller,[virtualScroller]",
      exportAs: "virtualScroller",
      template: `
    <div class="total-padding" #invisiblePadding></div>
    <div class="scrollable-content" #content>
      <ng-content></ng-content>
    </div>
  `,
      host: {
        "[class.horizontal]": "horizontal",
        "[class.vertical]": "!horizontal",
        "[class.selfScroll]": "!parentScroll"
      },
      styles: [":host{position:relative;display:block;-webkit-overflow-scrolling:touch}:host.horizontal.selfScroll{overflow-y:visible;overflow-x:auto}:host.vertical.selfScroll{overflow-y:auto;overflow-x:visible}.scrollable-content{top:0;left:0;width:100%;height:100%;max-width:100vw;max-height:100vh;position:absolute}.scrollable-content ::ng-deep>*{box-sizing:border-box}:host.horizontal{white-space:nowrap}:host.horizontal .scrollable-content{display:flex}:host.horizontal .scrollable-content ::ng-deep>*{flex-shrink:0;flex-grow:0;white-space:initial}.total-padding{width:1px;opacity:0}:host.horizontal .total-padding{height:100%}\n"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: NgZone
  }, {
    type: ChangeDetectorRef
  }, {
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: ["virtual-scroller-default-options"]
    }]
  }], {
    executeRefreshOutsideAngularZone: [{
      type: Input
    }],
    enableUnequalChildrenSizes: [{
      type: Input
    }],
    useMarginInsteadOfTranslate: [{
      type: Input
    }],
    modifyOverflowStyleOfParentScroll: [{
      type: Input
    }],
    stripedTable: [{
      type: Input
    }],
    scrollbarWidth: [{
      type: Input
    }],
    scrollbarHeight: [{
      type: Input
    }],
    childWidth: [{
      type: Input
    }],
    childHeight: [{
      type: Input
    }],
    ssrChildWidth: [{
      type: Input
    }],
    ssrChildHeight: [{
      type: Input
    }],
    ssrViewportWidth: [{
      type: Input
    }],
    ssrViewportHeight: [{
      type: Input
    }],
    bufferAmount: [{
      type: Input
    }],
    scrollAnimationTime: [{
      type: Input
    }],
    resizeBypassRefreshThreshold: [{
      type: Input
    }],
    scrollThrottlingTime: [{
      type: Input
    }],
    scrollDebounceTime: [{
      type: Input
    }],
    checkResizeInterval: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    compareItems: [{
      type: Input
    }],
    horizontal: [{
      type: Input
    }],
    parentScroll: [{
      type: Input
    }],
    vsUpdate: [{
      type: Output
    }],
    vsChange: [{
      type: Output
    }],
    vsStart: [{
      type: Output
    }],
    vsEnd: [{
      type: Output
    }],
    contentElementRef: [{
      type: ViewChild,
      args: ["content", {
        read: ElementRef,
        static: false
      }]
    }],
    invisiblePaddingElementRef: [{
      type: ViewChild,
      args: ["invisiblePadding", {
        read: ElementRef,
        static: false
      }]
    }],
    headerElementRef: [{
      type: ContentChild,
      args: ["header", {
        read: ElementRef,
        static: false
      }]
    }],
    containerElementRef: [{
      type: ContentChild,
      args: ["container", {
        read: ElementRef,
        static: false
      }]
    }]
  });
})();
var VirtualScrollerModule = class _VirtualScrollerModule {
  static ɵfac = function VirtualScrollerModule_Factory(t) {
    return new (t || _VirtualScrollerModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _VirtualScrollerModule,
    declarations: [VirtualScrollerComponent],
    imports: [CommonModule],
    exports: [VirtualScrollerComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [{
      provide: "virtual-scroller-default-options",
      useFactory: VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY
    }],
    imports: [CommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VirtualScrollerModule, [{
    type: NgModule,
    args: [{
      exports: [VirtualScrollerComponent],
      declarations: [VirtualScrollerComponent],
      imports: [CommonModule],
      providers: [{
        provide: "virtual-scroller-default-options",
        useFactory: VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY
      }]
    }]
  }], null, null);
})();
var DROPDOWN_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AngularMultiSelect),
  multi: true
};
var DROPDOWN_CONTROL_VALIDATION = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => AngularMultiSelect),
  multi: true
};
var noop = () => {
};
var AngularMultiSelect = class _AngularMultiSelect {
  _elementRef;
  cdr;
  filterPipe;
  data;
  settings;
  loading;
  onSelect = new EventEmitter();
  onDeSelect = new EventEmitter();
  onSelectAll = new EventEmitter();
  onDeSelectAll = new EventEmitter();
  onOpen = new EventEmitter();
  onClose = new EventEmitter();
  onScrollToEnd = new EventEmitter();
  onFilterSelectAll = new EventEmitter();
  onFilterDeSelectAll = new EventEmitter();
  onAddFilterNewItem = new EventEmitter();
  onGroupSelect = new EventEmitter();
  onGroupDeSelect = new EventEmitter();
  itemTempl;
  badgeTempl;
  searchTempl;
  searchInput;
  selectedListElem;
  dropdownListElem;
  cuppaDropdown;
  onEscapeDown(event) {
    if (this.settings.escapeToClose) {
      this.closeDropdown();
    }
  }
  onScroll(event) {
    if (this.isActive && this.settings.tagToBody) {
      this.closeDropdown();
    }
  }
  virtualdata = [];
  searchTerm$ = new Subject();
  selectedItems;
  isActive = false;
  isSelectAll = false;
  isFilterSelectAll = false;
  isInfiniteFilterSelectAll = false;
  groupedData;
  filter;
  chunkArray;
  scrollTop;
  chunkIndex = [];
  cachedItems = [];
  groupCachedItems = [];
  totalRows;
  itemHeight = 41.6;
  screenItemsLen;
  cachedItemsLen;
  totalHeight;
  scroller;
  maxBuffer;
  lastScrolled;
  lastRepaintY;
  selectedListHeight;
  filterLength = 0;
  infiniteFilterLength = 0;
  viewPortItems;
  item;
  dropdownListYOffset = 0;
  subscription;
  dropDownWidth = 0;
  dropDownTop = "";
  dropDownBottom = "unset";
  dropDownLeft = 0;
  id = Math.random().toString(36).substring(2);
  defaultSettings = {
    singleSelection: false,
    text: "Select",
    enableCheckAll: true,
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    filterSelectAllText: "Select all filtered results",
    filterUnSelectAllText: "UnSelect all filtered results",
    enableSearchFilter: false,
    searchBy: [],
    maxHeight: 300,
    badgeShowLimit: 999999999999,
    classes: "",
    disabled: false,
    searchPlaceholderText: "Search",
    showCheckbox: true,
    noDataLabel: "No Data Available",
    searchAutofocus: true,
    lazyLoading: false,
    labelKey: "itemName",
    primaryKey: "id",
    position: "bottom",
    autoPosition: true,
    enableFilterSelectAll: true,
    selectGroup: false,
    addNewItemOnFilter: false,
    addNewButtonText: "Add",
    escapeToClose: true,
    clearAll: true,
    tagToBody: true
  };
  randomSize = true;
  parseError;
  filteredList = [];
  virtualScroollInit = false;
  virtualScroller;
  isDisabledItemPresent = false;
  constructor(_elementRef, cdr, filterPipe) {
    this._elementRef = _elementRef;
    this.cdr = cdr;
    this.filterPipe = filterPipe;
    this.searchTerm$.asObservable().pipe(debounceTime(1e3), distinctUntilChanged(), tap((term) => term)).subscribe((val) => {
      this.filterInfiniteList(val);
    });
  }
  ngOnInit() {
    this.settings = Object.assign(this.defaultSettings, this.settings);
    this.cachedItems = this.cloneArray(this.data);
    if (this.settings.position == "top") {
      setTimeout(() => {
        this.selectedListHeight = {
          val: 0
        };
        this.selectedListHeight.val = this.selectedListElem.nativeElement.clientHeight;
      });
    }
    setTimeout(() => {
      this.calculateDropdownDirection();
    });
    this.virtualScroollInit = false;
  }
  onKeyUp(evt) {
    this.searchTerm$.next(evt.target.value);
  }
  ngOnChanges(changes) {
    if (changes.data && !changes.data.firstChange) {
      if (this.settings.groupBy) {
        this.groupedData = this.transformData(this.data, this.settings.groupBy);
        if (this.data.length == 0) {
          this.selectedItems = [];
        }
        this.groupCachedItems = this.cloneArray(this.groupedData);
      }
      this.cachedItems = this.cloneArray(this.data);
    }
    if (changes.settings && !changes.settings.firstChange) {
      this.settings = Object.assign(this.defaultSettings, this.settings);
    }
    if (changes.loading) {
    }
    if (this.settings.lazyLoading && this.virtualScroollInit && changes.data) {
      this.virtualdata = changes.data.currentValue;
    }
  }
  ngDoCheck() {
    if (this.selectedItems) {
      if (this.selectedItems.length == 0 || this.data.length == 0 || this.selectedItems.length < this.data.length) {
        this.isSelectAll = false;
      }
    }
  }
  ngAfterViewInit() {
    if (this.settings.lazyLoading) {
    }
  }
  ngAfterViewChecked() {
    if (this.selectedListElem.nativeElement.clientHeight && this.settings.position == "top" && this.selectedListHeight) {
      this.selectedListHeight.val = this.selectedListElem.nativeElement.clientHeight;
      this.cdr.detectChanges();
    }
  }
  onItemClick(item, index, evt) {
    if (item.disabled) {
      return;
    }
    if (this.settings.disabled) {
      return;
    }
    let found = this.isSelected(item);
    let limit = this.selectedItems.length < this.settings.limitSelection ? true : false;
    if (!found) {
      if (this.settings.limitSelection) {
        if (limit) {
          this.addSelected(item);
          this.onSelect.emit(item);
        }
      } else {
        this.addSelected(item);
        this.onSelect.emit(item);
      }
    } else {
      this.removeSelected(item);
      this.onDeSelect.emit(item);
    }
    if (this.isSelectAll || this.data.length > this.selectedItems.length) {
      this.isSelectAll = false;
    }
    if (this.data.length == this.selectedItems.length) {
      this.isSelectAll = true;
    }
    if (this.settings.groupBy) {
      this.updateGroupInfo(item);
    }
  }
  validate(c) {
    return null;
  }
  onTouchedCallback = noop;
  onChangeCallback = noop;
  writeValue(value) {
    if (value !== void 0 && value !== null && value !== "") {
      if (this.settings.singleSelection) {
        if (this.settings.groupBy) {
          this.groupedData = this.transformData(this.data, this.settings.groupBy);
          this.groupCachedItems = this.cloneArray(this.groupedData);
          this.selectedItems = [value[0]];
        } else {
          try {
            if (value.length > 1) {
              this.selectedItems = [value[0]];
              throw new MyException(404, {
                "msg": "Single Selection Mode, Selected Items cannot have more than one item."
              });
            } else {
              this.selectedItems = value;
            }
          } catch (e) {
            console.error(e.body.msg);
          }
        }
      } else {
        if (this.settings.limitSelection) {
          this.selectedItems = value.slice(0, this.settings.limitSelection);
        } else {
          this.selectedItems = value;
        }
        if (this.selectedItems != null && this.selectedItems.length === this.data.length && this.data.length > 0) {
          this.isSelectAll = true;
        }
        if (this.settings.groupBy) {
          this.groupedData = this.transformData(this.data, this.settings.groupBy);
          this.groupCachedItems = this.cloneArray(this.groupedData);
        }
      }
    } else {
      this.selectedItems = [];
    }
  }
  //From ControlValueAccessor interface
  registerOnChange(fn) {
    this.onChangeCallback = fn;
  }
  //From ControlValueAccessor interface
  registerOnTouched(fn) {
    this.onTouchedCallback = fn;
  }
  trackByFn(index, item) {
    return item[this.settings.primaryKey];
  }
  isSelected(clickedItem) {
    if (clickedItem.disabled) {
      return false;
    }
    let found = false;
    this.selectedItems && this.selectedItems.forEach((item) => {
      if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
        found = true;
      }
    });
    return found;
  }
  addSelected(item) {
    if (item.disabled) {
      return;
    }
    if (this.settings.singleSelection) {
      this.selectedItems = [];
      this.selectedItems.push(item);
      this.closeDropdown();
    } else
      this.selectedItems = [...this.selectedItems, item];
    this.onChangeCallback(this.selectedItems);
    this.onTouchedCallback(this.selectedItems);
  }
  removeSelected(clickedItem) {
    this.selectedItems && this.selectedItems.forEach((item) => {
      if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
      }
    });
    this.onChangeCallback(this.selectedItems);
    this.onTouchedCallback(this.selectedItems);
  }
  toggleDropdown(evt) {
    if (this.settings.disabled) {
      return;
    }
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
    if (this.settings.lazyLoading) {
      this.virtualdata = this.data;
      this.virtualScroollInit = true;
    }
    evt.preventDefault();
  }
  openDropdown() {
    if (this.settings.disabled) {
      return;
    }
    this.isActive = true;
    this.calculateDropdownDirection();
    if (this.settings.searchAutofocus && this.searchInput && this.settings.enableSearchFilter && !this.searchTempl) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 0);
    }
    this.onOpen.emit(true);
  }
  closeDropdown() {
    if (this.searchInput && this.settings.lazyLoading) {
      this.searchInput.nativeElement.value = "";
    }
    if (this.searchInput) {
      this.searchInput.nativeElement.value = "";
    }
    this.filter = "";
    this.isActive = false;
    this.searchTerm$.next("");
    this.onClose.emit(false);
  }
  closeDropdownOnClickOut() {
    if (this.isActive) {
      if (this.searchInput && this.settings.lazyLoading) {
        this.searchInput.nativeElement.value = "";
      }
      if (this.searchInput) {
        this.searchInput.nativeElement.value = "";
      }
      this.filter = "";
      this.isActive = false;
      this.clearSearch();
      this.searchTerm$.next("");
      this.onClose.emit(false);
    }
  }
  toggleSelectAll(event) {
    if (!this.isSelectAll) {
      this.selectedItems = [];
      if (this.settings.groupBy) {
        this.groupedData.forEach((obj) => {
          obj.selected = !obj.disabled;
        });
        this.groupCachedItems.forEach((obj) => {
          obj.selected = !obj.disabled;
        });
      }
      this.selectedItems = this.data.filter((individualData) => !individualData.disabled);
      this.isSelectAll = true;
      this.onChangeCallback(this.selectedItems);
      this.onTouchedCallback(this.selectedItems);
      this.onSelectAll.emit(this.selectedItems);
    } else {
      if (this.settings.groupBy) {
        this.groupedData.forEach((obj) => {
          obj.selected = false;
        });
        this.groupCachedItems.forEach((obj) => {
          obj.selected = false;
        });
      }
      this.selectedItems = [];
      this.isSelectAll = false;
      this.onChangeCallback(this.selectedItems);
      this.onTouchedCallback(this.selectedItems);
      this.onDeSelectAll.emit(this.selectedItems);
    }
    setTimeout(() => {
      this.calculateDropdownDirection();
    });
    event.stopPropagation();
  }
  filterGroupedList() {
    if (this.filter == "" || this.filter == null) {
      this.clearSearch();
      return;
    }
    this.groupedData = this.cloneArray(this.groupCachedItems);
    this.groupedData = this.groupedData.filter((obj) => {
      let arr = [];
      if (obj[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1) {
        arr = obj.list;
      } else {
        arr = obj.list.filter((t) => {
          return t[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
        });
      }
      obj.list = arr;
      if (obj[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1) {
        return arr;
      } else {
        return arr.some((cat) => {
          return cat[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
        });
      }
    });
  }
  toggleFilterSelectAll() {
    if (!this.isFilterSelectAll) {
      let added = [];
      if (this.settings.groupBy) {
        this.groupedData.forEach((item) => {
          item.sele;
          if (item.list) {
            item.list.forEach((el) => {
              if (!this.isSelected(el)) {
                this.addSelected(el);
                added.push(el);
              }
            });
          }
          this.updateGroupInfo(item);
        });
        this.filteredList.forEach((el) => {
          if (!this.isSelected(el) && !el.hasOwnProperty("grpTitle")) {
            this.addSelected(el);
            added.push(el);
          }
        });
      } else {
        this.filteredList.forEach((item) => {
          if (!this.isSelected(item)) {
            this.addSelected(item);
            added.push(item);
          }
        });
      }
      this.isFilterSelectAll = true;
      this.onFilterSelectAll.emit(added);
    } else {
      let removed = [];
      if (this.settings.groupBy) {
        this.groupedData.forEach((item) => {
          if (item.list) {
            item.list.forEach((el) => {
              if (this.isSelected(el)) {
                this.removeSelected(el);
                removed.push(el);
              }
            });
          }
          this.updateGroupInfo(item);
        });
        this.filteredList.forEach((el) => {
          if (this.isSelected(el)) {
            this.removeSelected(el);
            removed.push(el);
          }
        });
      } else {
        this.filteredList.forEach((item) => {
          if (this.isSelected(item)) {
            this.removeSelected(item);
            removed.push(item);
          }
        });
      }
      this.isFilterSelectAll = false;
      this.onFilterDeSelectAll.emit(removed);
    }
  }
  toggleInfiniteFilterSelectAll() {
    if (!this.isInfiniteFilterSelectAll) {
      this.virtualdata.forEach((item) => {
        if (!this.isSelected(item)) {
          this.addSelected(item);
        }
      });
      this.isInfiniteFilterSelectAll = true;
    } else {
      this.virtualdata.forEach((item) => {
        if (this.isSelected(item)) {
          this.removeSelected(item);
        }
      });
      this.isInfiniteFilterSelectAll = false;
    }
  }
  clearSearch() {
    if (this.settings.groupBy) {
      this.groupedData = [];
      this.groupedData = this.cloneArray(this.groupCachedItems);
    }
    this.filter = "";
    this.isFilterSelectAll = false;
    this.searchTerm$.next("");
    this.data = this.cachedItems;
  }
  onFilterChange(data) {
    if (this.filter && this.filter == "" || data.length == 0) {
      this.isFilterSelectAll = false;
      this.data = this.cachedItems.slice();
    }
    let cnt = 0;
    data.forEach((item) => {
      if (!item.hasOwnProperty("grpTitle") && this.isSelected(item)) {
        cnt++;
      }
    });
    if (cnt > 0 && this.filterLength == cnt) {
      this.isFilterSelectAll = true;
    } else if (cnt > 0 && this.filterLength != cnt) {
      this.isFilterSelectAll = false;
    }
    this.data = data;
  }
  cloneArray(arr) {
    let i, copy;
    if (Array.isArray(arr)) {
      return JSON.parse(JSON.stringify(arr));
    } else if (typeof arr === "object") {
      throw "Cannot clone array containing an object!";
    } else {
      return arr;
    }
  }
  updateGroupInfo(item) {
    if (item.disabled) {
      return;
    }
    let key = this.settings.groupBy;
    this.groupedData.forEach((obj) => {
      let cnt = 0;
      if (obj.grpTitle && item[key] == obj[key]) {
        if (obj.list) {
          obj.list.forEach((el) => {
            if (this.isSelected(el)) {
              cnt++;
            }
          });
        }
      }
      if (obj.list && cnt === obj.list.length && item[key] == obj[key]) {
        obj.selected = true;
      } else if (obj.list && cnt != obj.list.length && item[key] == obj[key]) {
        obj.selected = false;
      }
    });
    this.groupCachedItems.forEach((obj) => {
      let cnt = 0;
      if (obj.grpTitle && item[key] == obj[key]) {
        if (obj.list) {
          obj.list.forEach((el) => {
            if (this.isSelected(el)) {
              cnt++;
            }
          });
        }
      }
      if (obj.list && cnt === obj.list.length && item[key] == obj[key]) {
        obj.selected = true;
      } else if (obj.list && cnt != obj.list.length && item[key] == obj[key]) {
        obj.selected = false;
      }
    });
  }
  transformData(arr, field) {
    const groupedObj = arr.reduce((prev, cur) => {
      if (!prev[cur[field]]) {
        prev[cur[field]] = [cur];
      } else {
        prev[cur[field]].push(cur);
      }
      return prev;
    }, {});
    const tempArr = [];
    Object.keys(groupedObj).map((x) => {
      let obj = {};
      let disabledChildrens = [];
      obj["grpTitle"] = true;
      obj[this.settings.labelKey] = x;
      obj[this.settings.groupBy] = x;
      obj["selected"] = false;
      obj["list"] = [];
      let cnt = 0;
      groupedObj[x].forEach((item) => {
        item["list"] = [];
        if (item.disabled) {
          this.isDisabledItemPresent = true;
          disabledChildrens.push(item);
        }
        obj.list.push(item);
        if (this.isSelected(item)) {
          cnt++;
        }
      });
      if (cnt == obj.list.length) {
        obj.selected = true;
      } else {
        obj.selected = false;
      }
      obj["disabled"] = disabledChildrens.length === groupedObj[x].length;
      tempArr.push(obj);
    });
    return tempArr;
  }
  filterInfiniteList(evt) {
    let filteredElems = [];
    if (this.settings.groupBy) {
      this.groupedData = this.groupCachedItems.slice();
    } else {
      this.data = this.cachedItems.slice();
      this.virtualdata = this.cachedItems.slice();
    }
    if ((evt != null || evt != "") && !this.settings.groupBy) {
      if (this.settings.searchBy.length > 0) {
        for (let t = 0; t < this.settings.searchBy.length; t++) {
          this.virtualdata.filter((el) => {
            if (el[this.settings.searchBy[t].toString()].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
              filteredElems.push(el);
            }
          });
        }
      } else {
        this.virtualdata.filter(function(el) {
          for (let prop in el) {
            if (el[prop].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
              filteredElems.push(el);
              break;
            }
          }
        });
      }
      this.virtualdata = [];
      this.virtualdata = filteredElems;
      this.infiniteFilterLength = this.virtualdata.length;
    }
    if (evt.toString() != "" && this.settings.groupBy) {
      this.groupedData.filter(function(el) {
        if (el.hasOwnProperty("grpTitle")) {
          filteredElems.push(el);
        } else {
          for (let prop in el) {
            if (el[prop].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
              filteredElems.push(el);
              break;
            }
          }
        }
      });
      this.groupedData = [];
      this.groupedData = filteredElems;
      this.infiniteFilterLength = this.groupedData.length;
    } else if (evt.toString() == "" && this.cachedItems.length > 0) {
      this.virtualdata = [];
      this.virtualdata = this.cachedItems;
      this.infiniteFilterLength = 0;
    }
    if (this.virtualScroller) {
      this.virtualScroller.refresh();
    }
  }
  resetInfiniteSearch() {
    this.filter = "";
    this.isInfiniteFilterSelectAll = false;
    this.virtualdata = [];
    this.virtualdata = this.cachedItems;
    this.groupedData = this.groupCachedItems;
    this.searchTerm$.next("");
    this.infiniteFilterLength = 0;
  }
  onScrollEnd(e) {
    if (e.endIndex === this.data.length - 1 || e.startIndex === 0) {
    }
    this.onScrollToEnd.emit(e);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  selectGroup(item) {
    if (item.disabled) {
      return;
    }
    if (item.selected) {
      item.selected = false;
      item.list.forEach((obj) => {
        this.removeSelected(obj);
      });
      this.onGroupDeSelect.emit(item);
      this.updateGroupInfo(item);
    } else {
      item.selected = true;
      item.list.forEach((obj) => {
        if (!this.isSelected(obj)) {
          this.addSelected(obj);
        }
      });
      this.onGroupSelect.emit(item);
      this.updateGroupInfo(item);
    }
  }
  addFilterNewItem() {
    this.onAddFilterNewItem.emit(this.filter);
    this.filterPipe.transform(this.data, this.filter, this.settings.searchBy);
  }
  calculateDropdownDirection() {
    let shouldOpenTowardsTop = this.settings.position == "top";
    const elem = this.cuppaDropdown.nativeElement;
    const dropdownWidth = elem.clientWidth;
    this.dropDownWidth = dropdownWidth;
    this.dropDownLeft = this.settings.tagToBody ? elem.getBoundingClientRect().x : "unset";
    if (this.settings.position == "top" && !this.settings.autoPosition) {
      this.openTowardsTop(true);
    } else if (this.settings.position == "bottom" && !this.settings.autoPosition) {
      this.openTowardsTop(false);
    }
    if (this.settings.autoPosition) {
      const dropdownHeight = this.defaultSettings.maxHeight;
      const viewportHeight = document.documentElement.clientHeight;
      const selectedListBounds = this.selectedListElem.nativeElement.getBoundingClientRect();
      const spaceOnTop = selectedListBounds.top;
      const spaceOnBottom = viewportHeight - selectedListBounds.top;
      if (spaceOnBottom < spaceOnTop && dropdownHeight < spaceOnTop) {
        this.openTowardsTop(true);
      } else {
        this.openTowardsTop(false);
      }
    }
  }
  openTowardsTop(value) {
    const elem = this.cuppaDropdown.nativeElement;
    if (value && this.selectedListElem.nativeElement.clientHeight) {
      this.dropdownListYOffset = 15 - this.selectedListElem.nativeElement.clientHeight;
      if (this.settings.tagToBody) {
        this.dropDownTop = elem.getBoundingClientRect().y - this.selectedListElem.nativeElement.clientHeight * 2 - 15 - this.defaultSettings.maxHeight + "px";
      } else {
        this.dropDownBottom = this.selectedListElem.nativeElement.clientHeight + 15 + "px";
      }
      this.settings.position = "top";
    } else {
      if (this.settings.tagToBody) {
        this.dropDownTop = elem.getBoundingClientRect().y + elem.clientHeight + 1 + "px";
      } else {
        this.dropDownTop = "unset";
        this.dropDownBottom = "unset";
      }
      this.dropdownListYOffset = 0;
      this.settings.position = "bottom";
    }
  }
  clearSelection(e) {
    if (this.settings.groupBy) {
      this.groupCachedItems.forEach((obj) => {
        obj.selected = false;
      });
    }
    this.clearSearch();
    this.selectedItems = [];
    this.isSelectAll = false;
    this.onChangeCallback(this.selectedItems);
    this.onTouchedCallback(this.selectedItems);
    this.onDeSelectAll.emit(this.selectedItems);
  }
  filteritems(evt) {
    this.filteredList = this.filterPipe.transform(this.cachedItems, evt.target.value, this.settings.searchBy);
    if (this.filteredList) {
      let len = 0;
      this.filteredList.forEach((obj, i) => {
        if (obj.disabled) {
          this.isDisabledItemPresent = true;
        }
        if (!obj.hasOwnProperty("grpTitle")) {
          len++;
        }
      });
      this.filterLength = len;
    }
    this.onFilterChange(this.filteredList);
  }
  static ɵfac = function AngularMultiSelect_Factory(t) {
    return new (t || _AngularMultiSelect)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ListFilterPipe));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _AngularMultiSelect,
    selectors: [["angular2-multiselect"]],
    contentQueries: function AngularMultiSelect_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, Item, 5);
        ɵɵcontentQuery(dirIndex, Badge, 5);
        ɵɵcontentQuery(dirIndex, Search, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTempl = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.badgeTempl = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.searchTempl = _t.first);
      }
    },
    viewQuery: function AngularMultiSelect_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c5, 5);
        ɵɵviewQuery(_c6, 5);
        ɵɵviewQuery(_c7, 5);
        ɵɵviewQuery(_c8, 5);
        ɵɵviewQuery(VirtualScrollerComponent, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.searchInput = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.selectedListElem = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.dropdownListElem = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.cuppaDropdown = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.virtualScroller = _t.first);
      }
    },
    hostVars: 2,
    hostBindings: function AngularMultiSelect_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("keyup.escape", function AngularMultiSelect_keyup_escape_HostBindingHandler($event) {
          return ctx.onEscapeDown($event);
        }, false, ɵɵresolveDocument)("scroll", function AngularMultiSelect_scroll_HostBindingHandler($event) {
          return ctx.onScroll($event);
        }, false, ɵɵresolveWindow);
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.defaultSettings.classes);
      }
    },
    inputs: {
      data: "data",
      settings: "settings",
      loading: "loading"
    },
    outputs: {
      onSelect: "onSelect",
      onDeSelect: "onDeSelect",
      onSelectAll: "onSelectAll",
      onDeSelectAll: "onDeSelectAll",
      onOpen: "onOpen",
      onClose: "onClose",
      onScrollToEnd: "onScrollToEnd",
      onFilterSelectAll: "onFilterSelectAll",
      onFilterDeSelectAll: "onFilterDeSelectAll",
      onAddFilterNewItem: "onAddFilterNewItem",
      onGroupSelect: "onGroupSelect",
      onGroupDeSelect: "onGroupDeSelect"
    },
    features: [ɵɵProvidersFeature([DROPDOWN_CONTROL_VALUE_ACCESSOR, DROPDOWN_CONTROL_VALIDATION]), ɵɵNgOnChangesFeature],
    decls: 33,
    vars: 50,
    consts: [["cuppaDropdown", ""], ["selectedList", ""], ["dropdownList", ""], ["searchInput", ""], ["scroll", ""], ["scroll2", ""], ["scroll3", ""], ["scroll4", ""], [1, "cuppa-dropdown", 3, "clickOutside"], [1, "selected-list"], [1, "c-btn", 3, "click", "ngClass"], [4, "ngIf"], ["class", "c-list", 4, "ngIf"], ["class", "countplaceholder", 4, "ngIf"], ["class", "c-remove clear-all", 3, "click", 4, "ngIf"], ["class", "c-angle-down", 4, "ngIf"], ["class", "c-angle-up", 4, "ngIf"], [1, "dropdown-list", "animated", "fadeIn", 3, "ngClass", "hidden"], [1, "arrow-2", 3, "ngClass"], [3, "ngClass"], [1, "list-area", 3, "ngClass"], ["class", "pure-checkbox select-all", 4, "ngIf"], ["class", "loading-icon", "src", "assets/img/loading.gif", 4, "ngIf"], ["class", "list-filter", 4, "ngIf"], ["class", "filter-select-all", 4, "ngIf"], ["style", "overflow: auto;", 3, "maxHeight", 4, "ngIf"], ["class", "list-message", 4, "ngIf"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "c-list"], ["class", "c-token", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "c-token"], ["class", "c-label", 4, "ngIf"], [1, "c-remove", 3, "click"], [3, "name"], [1, "c-label"], [3, "data", "item"], ["class", "c-token", 3, "hidden", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "c-token", 3, "hidden"], [1, "countplaceholder"], [1, "c-remove", "clear-all", 3, "click"], [1, "c-angle-down"], [1, "c-angle-up"], [1, "pure-checkbox", "select-all"], ["type", "checkbox", 3, "checked", "disabled", "id", "change", 4, "ngIf"], [3, "for"], [3, "hidden"], ["type", "checkbox", 3, "change", "checked", "disabled", "id"], ["src", "assets/img/loading.gif", 1, "loading-icon"], [1, "list-filter"], ["id", "searchIcon", 1, "c-search"], ["class", "c-clear", 3, "hidden", "click", 4, "ngIf"], ["class", "c-input", "type", "text", "aria-labelledby", "searchIcon", 3, "placeholder", "ngModel", "ngModelChange", "keyup", 4, "ngIf"], [3, "data", "item", 4, "ngIf"], [1, "c-clear", 3, "click", "hidden"], ["type", "text", "aria-labelledby", "searchIcon", 1, "c-input", 3, "ngModelChange", "keyup", "placeholder", "ngModel"], [1, "filter-select-all"], ["class", "pure-checkbox select-all", 3, "click", 4, "ngIf"], [1, "pure-checkbox", "select-all", 3, "click"], ["type", "checkbox", "aria-labelledby", "optionName", "aria-label", "option", 3, "checked", "disabled"], ["type", "checkbox", "aria-labelledby", "option", 3, "checked", "disabled"], ["class", "btn-container", 4, "ngIf"], [1, "btn-container"], [1, "c-btn", "btn-iceblue", 3, "click"], [2, "overflow", "auto"], [1, "lazyContainer"], ["class", "pure-checkbox", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "pure-checkbox", 3, "click", "ngClass"], ["type", "checkbox", "aria-labelledby", "option", 3, "checked", "disabled", 4, "ngIf"], ["virtualScroller", "", 1, "lazyContainer", 3, "vsStart", "vsEnd", "enableUnequalChildrenSizes", "items", "ngStyle"], ["type", "checkbox", 3, "checked", "disabled", 4, "ngIf"], ["type", "checkbox", 3, "checked", "disabled"], [4, "ngFor", "ngForOf"], ["class", "pure-checkbox", 3, "ngClass", "click", 4, "ngIf"], ["class", "pure-checkbox", 3, "ngClass", 4, "ngIf"], [1, "pure-checkbox", 3, "ngClass"], [3, "vsUpdate", "vsEnd", "items", "ngStyle"], [1, "list-message"]],
    template: function AngularMultiSelect_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵelementStart(0, "div", 8, 0);
        ɵɵlistener("clickOutside", function AngularMultiSelect_Template_div_clickOutside_0_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.closeDropdownOnClickOut());
        });
        ɵɵelementStart(2, "div", 9, 1)(4, "div", 10);
        ɵɵlistener("click", function AngularMultiSelect_Template_div_click_4_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.toggleDropdown($event));
        });
        ɵɵtemplate(5, AngularMultiSelect_span_5_Template, 2, 1, "span", 11)(6, AngularMultiSelect_span_6_Template, 2, 2, "span", 11)(7, AngularMultiSelect_span_7_Template, 2, 2, "span", 12)(8, AngularMultiSelect_div_8_Template, 2, 2, "div", 12)(9, AngularMultiSelect_span_9_Template, 2, 1, "span", 13)(10, AngularMultiSelect_span_10_Template, 2, 1, "span", 14)(11, AngularMultiSelect_span_11_Template, 2, 1, "span", 15)(12, AngularMultiSelect_span_12_Template, 2, 1, "span", 16);
        ɵɵelementEnd()();
        ɵɵelementStart(13, "div", 17, 2);
        ɵɵelement(15, "div", 18)(16, "div", 19);
        ɵɵelementStart(17, "div", 20);
        ɵɵtemplate(18, AngularMultiSelect_div_18_Template, 7, 6, "div", 21)(19, AngularMultiSelect_img_19_Template, 1, 0, "img", 22)(20, AngularMultiSelect_div_20_Template, 9, 7, "div", 23)(21, AngularMultiSelect_div_21_Template, 3, 2, "div", 24)(22, AngularMultiSelect_div_22_Template, 2, 1, "div", 24)(23, AngularMultiSelect_div_23_Template, 2, 1, "div", 24)(24, AngularMultiSelect_div_24_Template, 3, 3, "div", 25)(25, AngularMultiSelect_div_25_Template, 4, 8, "div", 25)(26, AngularMultiSelect_div_26_Template, 3, 3, "div", 25)(27, AngularMultiSelect_div_27_Template, 4, 8, "div", 25)(28, AngularMultiSelect_div_28_Template, 4, 8, "div", 25)(29, AngularMultiSelect_div_29_Template, 3, 3, "div", 25)(30, AngularMultiSelect_div_30_Template, 5, 12, "div", 25)(31, AngularMultiSelect_div_31_Template, 3, 3, "div", 25)(32, AngularMultiSelect_h5_32_Template, 2, 1, "h5", 26);
        ɵɵelementEnd()()();
      }
      if (rf & 2) {
        ɵɵadvance(4);
        ɵɵproperty("ngClass", ɵɵpureFunction1(38, _c9, ctx.settings.disabled));
        ɵɵattribute("tabindex", 0);
        ɵɵadvance();
        ɵɵproperty("ngIf", (ctx.selectedItems == null ? null : ctx.selectedItems.length) == 0);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.settings.singleSelection && !ctx.badgeTempl);
        ɵɵadvance();
        ɵɵproperty("ngIf", (ctx.selectedItems == null ? null : ctx.selectedItems.length) > 0 && ctx.settings.singleSelection && ctx.badgeTempl);
        ɵɵadvance();
        ɵɵproperty("ngIf", (ctx.selectedItems == null ? null : ctx.selectedItems.length) > 0 && !ctx.settings.singleSelection);
        ɵɵadvance();
        ɵɵproperty("ngIf", (ctx.selectedItems == null ? null : ctx.selectedItems.length) > ctx.settings.badgeShowLimit);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.settings.clearAll && (ctx.selectedItems == null ? null : ctx.selectedItems.length) > 0 && !ctx.settings.disabled);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.isActive);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.isActive);
        ɵɵadvance();
        ɵɵstyleProp("width", ctx.dropDownWidth, "px")("top", ctx.dropDownTop)("bottom", ctx.dropDownBottom)("left", ctx.dropDownLeft, "px");
        ɵɵproperty("ngClass", ɵɵpureFunction1(40, _c10, ctx.settings.tagToBody))("hidden", !ctx.isActive);
        ɵɵadvance(2);
        ɵɵproperty("ngClass", ɵɵpureFunction2(42, _c11, ctx.settings.position == "bottom", ctx.settings.position == "top"));
        ɵɵadvance();
        ɵɵproperty("ngClass", ɵɵpureFunction2(45, _c11, ctx.settings.position == "bottom", ctx.settings.position == "top"));
        ɵɵadvance();
        ɵɵproperty("ngClass", ɵɵpureFunction1(48, _c12, ctx.settings.singleSelection));
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.settings.enableCheckAll && !ctx.settings.singleSelection && !ctx.settings.limitSelection && (ctx.data == null ? null : ctx.data.length) > 0 && !ctx.isDisabledItemPresent);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.loading);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.settings.enableSearchFilter);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.settings.lazyLoading && ctx.settings.enableFilterSelectAll && !ctx.isDisabledItemPresent);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.settings.lazyLoading && ctx.settings.enableFilterSelectAll && !ctx.isDisabledItemPresent && !ctx.settings.singleSelection);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.filter == null ? null : ctx.filter.length);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.settings.groupBy && !ctx.settings.lazyLoading && ctx.itemTempl == void 0);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.settings.groupBy && ctx.settings.lazyLoading && ctx.itemTempl == void 0);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.settings.groupBy && !ctx.settings.lazyLoading && ctx.itemTempl != void 0);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.settings.groupBy && ctx.settings.lazyLoading && ctx.itemTempl != void 0);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.settings.groupBy && ctx.settings.lazyLoading && ctx.itemTempl != void 0);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.settings.groupBy && !ctx.settings.lazyLoading && ctx.itemTempl != void 0);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.settings.groupBy && ctx.settings.lazyLoading && ctx.itemTempl == void 0);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.settings.groupBy && !ctx.settings.lazyLoading && ctx.itemTempl == void 0);
        ɵɵadvance();
        ɵɵproperty("ngIf", (ctx.data == null ? null : ctx.data.length) == 0);
      }
    },
    dependencies: () => [NgClass, NgForOf, NgIf, NgStyle, DefaultValueAccessor, NgControlStatus, NgModel, VirtualScrollerComponent, ClickOutsideDirective, TemplateRenderer, CIcon],
    styles: ['virtual-scroll{display:block;width:100%}.cuppa-dropdown{position:relative}.c-btn{display:inline-block;border-width:1px;line-height:1.25;border-radius:3px;font-size:.85rem;padding:5px 10px;cursor:pointer;align-items:center;min-height:38px}.c-btn.disabled{background:#ccc}.selected-list .c-list{float:left;padding:0;margin:0;width:calc(100% - 20px)}.selected-list .c-list .c-token{list-style:none;padding:4px 22px 4px 8px;border-radius:2px;margin-right:4px;margin-top:2px;float:left;position:relative}.selected-list .c-list .c-token .c-label{display:block;float:left}.selected-list .c-list .c-token .c-remove{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:8px}.selected-list .c-list .c-token .c-remove svg{fill:#fff}.selected-list .fa-angle-down,.selected-list .fa-angle-up{font-size:15pt;position:absolute;right:10px;top:50%;transform:translateY(-50%)}.selected-list .c-angle-down,.selected-list .c-angle-up{width:12px;height:12px;position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}.selected-list .c-angle-down svg,.selected-list .c-angle-up svg{fill:#333}.selected-list .countplaceholder{position:absolute;right:45px;top:50%;transform:translateY(-50%)}.selected-list .c-btn{width:100%;padding:5px 10px;cursor:pointer;display:flex;position:relative}.selected-list .c-btn .c-icon{position:absolute;right:5px;top:50%;transform:translateY(-50%)}.dropdown-list.tagToBody{position:fixed}.dropdown-list{position:absolute;padding-top:14px;width:100%;z-index:99999}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list ul li{padding:10px;cursor:pointer;text-align:left}.dropdown-list ul li:first-child{padding-top:10px}.dropdown-list ul li:last-child{padding-bottom:10px}.dropdown-list ::-webkit-scrollbar{width:8px}.dropdown-list ::-webkit-scrollbar-thumb{background:#ccc;border-radius:5px}.dropdown-list ::-webkit-scrollbar-track{background:#f2f2f2}.arrow-up,.arrow-down{width:0;height:0;border-left:13px solid transparent;border-right:13px solid transparent;border-bottom:15px solid #fff;margin-left:15px;position:absolute;top:0}.arrow-down{bottom:-14px;top:unset;transform:rotate(180deg)}.arrow-2{border-bottom:15px solid #ccc;top:-1px}.arrow-down.arrow-2{top:unset;bottom:-16px}.list-area{border:1px solid #ccc;border-radius:3px;background:#fff;margin:0}.select-all{padding:10px;border-bottom:1px solid #ccc;text-align:left}.list-filter{border-bottom:1px solid #ccc;position:relative;padding-left:35px;height:35px}.list-filter input{border:0px;width:100%;height:100%;padding:0}.list-filter input:focus{outline:none}.list-filter .c-search{position:absolute;top:4px;left:10px;width:15px;height:15px}.list-filter .c-search svg{fill:#888}.list-filter .c-clear{position:absolute;top:4px;right:10px;width:15px;height:15px}.list-filter .c-clear svg{fill:#888}.pure-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.pure-checkbox input[type=checkbox]:focus+label:before,.pure-checkbox input[type=checkbox]:hover+label:before{background-color:none}.pure-checkbox input[type=checkbox]:active+label:before{transition-duration:0s}.pure-checkbox input[type=checkbox]:disabled+label{color:#ccc}.pure-checkbox input[type=checkbox]+label{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;user-select:none;cursor:pointer;margin:0;font-weight:300}.pure-checkbox input[type=checkbox]+label:before{box-sizing:content-box;content:"";position:absolute;top:50%;left:0;width:15px;height:15px;margin-top:-9px;text-align:center;transition:all .4s ease;border-radius:3px}.pure-checkbox input[type=checkbox]+label:after{box-sizing:content-box;content:"";position:absolute;top:50%;left:0;width:15px;height:15px;margin-top:-9px;transform:scale(0);transform-origin:50%;transition:transform .2s ease-out}.pure-checkbox input[type=checkbox]:disabled+label:before{border-color:#ccc}.pure-checkbox input[type=checkbox]:disabled:focus+label:before .pure-checkbox input[type=checkbox]:disabled:hover+label:before{background-color:inherit}.pure-checkbox input[type=checkbox]:disabled:checked+label:before{background-color:#ccc}.pure-checkbox input[type=checkbox]+label:after{background-color:transparent;top:50%;left:3px;width:9px;height:4px;margin-top:-5px;border-style:solid;border-width:0 0 2px 2px;border-image:none;transform:rotate(-45deg) scale(0)}.pure-checkbox input[type=checkbox]:checked+label:after{content:"";transform:rotate(-45deg) scale(1);transition:transform .2s ease-out}.pure-checkbox input[type=radio]:checked+label:before{background-color:#fff}.pure-checkbox input[type=radio]:checked+label:after{transform:scale(1)}.pure-checkbox input[type=radio]+label:before{border-radius:50%}.pure-checkbox input[type=checkbox]:checked+label:after{transform:rotate(-45deg) scale(1)}.list-message{text-align:center;margin:0;padding:15px 0;font-size:initial}.list-grp{padding:0 15px!important}.list-grp h4{text-transform:capitalize;margin:15px 0 0;font-size:14px;font-weight:700}.list-grp>li{padding-left:15px!important}.grp-item{padding-left:30px!important}.grp-title{padding-bottom:0!important}.grp-title label{margin-bottom:0!important;font-weight:800;text-transform:capitalize}.grp-title:hover{background:none!important}.loading-icon{width:20px;position:absolute;right:10px;top:23px;z-index:1}.nodata-label{width:100%;text-align:center;padding:10px 0 0}.btn-container{text-align:center;padding:5px}.clear-all{width:8px;position:absolute;top:50%;right:30px;transform:translateY(-50%)}\n'],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularMultiSelect, [{
    type: Component,
    args: [{
      selector: "angular2-multiselect",
      host: {
        "[class]": "defaultSettings.classes"
      },
      providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR, DROPDOWN_CONTROL_VALIDATION],
      encapsulation: ViewEncapsulation$1.None,
      template: `<div class="cuppa-dropdown" (clickOutside)="closeDropdownOnClickOut()" #cuppaDropdown>
    <div class="selected-list" #selectedList>
        <div class="c-btn" (click)="toggleDropdown($event)" [ngClass]="{'disabled': settings.disabled}" [attr.tabindex]="0">

            <span *ngIf="selectedItems?.length == 0">{{settings.text}}</span>
            <span *ngIf="settings.singleSelection && !badgeTempl">
                <span *ngFor="let item of selectedItems;trackBy: trackByFn.bind(this);let k = index">
                    {{item[settings.labelKey]}}
                </span>
            </span>
            <span class="c-list" *ngIf="selectedItems?.length > 0 && settings.singleSelection && badgeTempl ">
                <div class="c-token" *ngFor="let item of selectedItems;trackBy: trackByFn.bind(this);let k = index">
                    <span *ngIf="!badgeTempl" class="c-label">{{item[settings.labelKey]}}</span>

                    <span *ngIf="badgeTempl" class="c-label">
                        <c-templateRenderer [data]="badgeTempl" [item]="item"></c-templateRenderer>
                    </span>
                    <span class="c-remove" (click)="onItemClick(item,k,$event);$event.stopPropagation()">
                        <c-icon [name]="'remove'"></c-icon>
                    </span>
                </div>
            </span>
            <div class="c-list" *ngIf="selectedItems?.length > 0 && !settings.singleSelection">
                <div class="c-token" *ngFor="let item of selectedItems;trackBy: trackByFn.bind(this);let k = index" [hidden]="k > settings.badgeShowLimit-1">
                    <span *ngIf="!badgeTempl" class="c-label">{{item[settings.labelKey]}}</span>
                    <span *ngIf="badgeTempl" class="c-label">
                        <c-templateRenderer [data]="badgeTempl" [item]="item"></c-templateRenderer>
                    </span>
                    <span class="c-remove" (click)="onItemClick(item,k,$event);$event.stopPropagation()">
                        <c-icon [name]="'remove'"></c-icon>
                    </span>
                </div>
            </div>
            <span class="countplaceholder" *ngIf="selectedItems?.length > settings.badgeShowLimit">+{{selectedItems?.length - settings.badgeShowLimit }}</span>
            <span class="c-remove clear-all" *ngIf="settings.clearAll && selectedItems?.length > 0 && !settings.disabled" (click)="clearSelection($event);$event.stopPropagation()">
                <c-icon [name]="'remove'"></c-icon>
            </span>
            <span *ngIf="!isActive" class="c-angle-down">
                <c-icon [name]="'angle-down'"></c-icon>
            </span>
            <span *ngIf="isActive" class="c-angle-up">
                <c-icon [name]="'angle-up'"></c-icon>

            </span>
        </div>
    </div>
    <div #dropdownList class="dropdown-list animated fadeIn" 
    [ngClass]="{'tagToBody': settings.tagToBody}"
    [style.width.px]="dropDownWidth" 
    [style.top]="dropDownTop" 
    [style.bottom]="dropDownBottom"
    [style.left.px]="dropDownLeft" 
        [hidden]="!isActive">
        <div [ngClass]="{'arrow-up': settings.position == 'bottom', 'arrow-down': settings.position == 'top'}" class="arrow-2"></div>
        <div [ngClass]="{'arrow-up': settings.position == 'bottom', 'arrow-down': settings.position == 'top'}"></div>
        <div class="list-area" [ngClass]="{'single-select-mode': settings.singleSelection }">
            <div class="pure-checkbox select-all" *ngIf="settings.enableCheckAll && !settings.singleSelection && !settings.limitSelection && data?.length > 0 && !isDisabledItemPresent"
                >
                <input *ngIf="settings.showCheckbox" type="checkbox" [checked]="isSelectAll" [disabled]="settings.limitSelection == selectedItems?.length"
                [id]="id" (change)="toggleSelectAll($event)"/>
                <label [for]="id">
                    <span [hidden]="isSelectAll">{{settings.selectAllText}}</span>
                    <span [hidden]="!isSelectAll">{{settings.unSelectAllText}}</span>
                </label>
            </div>
            <img class="loading-icon" *ngIf="loading" src="assets/img/loading.gif" />
            <div class="list-filter" *ngIf="settings.enableSearchFilter">
                <span class="c-search" id="searchIcon">
                    <c-icon [name]="'search'"></c-icon>
                </span>
                <span *ngIf="!settings.lazyLoading" [hidden]="filter == undefined || filter?.length == 0" class="c-clear" (click)="clearSearch()">
                    <c-icon [name]="'clear'"></c-icon>
                </span>
                <span *ngIf="settings.lazyLoading" [hidden]="filter == undefined || filter?.length == 0" class="c-clear" (click)="resetInfiniteSearch()">
                    <c-icon [name]="'clear'"></c-icon>
                </span>

                <input class="c-input" *ngIf="settings.groupBy && !settings.lazyLoading && !searchTempl" #searchInput type="text" [placeholder]="settings.searchPlaceholderText"
                    [(ngModel)]="filter" (keyup)="filterGroupedList()" aria-labelledby="searchIcon">
                <input class="c-input" *ngIf="!settings.groupBy && !settings.lazyLoading && !searchTempl" #searchInput type="text" [placeholder]="settings.searchPlaceholderText"
                    [(ngModel)]="filter" (keyup)="filteritems($event)" aria-labelledby="searchIcon">
                <input class="c-input" *ngIf="settings.lazyLoading && !searchTempl" #searchInput type="text" [placeholder]="settings.searchPlaceholderText"
                    [(ngModel)]="filter" (keyup)="onKeyUp($event)" aria-labelledby="searchIcon">
                <!--            <input class="c-input" *ngIf="!settings.lazyLoading && !searchTempl && settings.groupBy" #searchInput type="text" [placeholder]="settings.searchPlaceholderText"
                [(ngModel)]="filter" (keyup)="filterGroupList($event)">-->
                <c-templateRenderer *ngIf="searchTempl" [data]="searchTempl" [item]="item"></c-templateRenderer>
            </div>
            <div class="filter-select-all" *ngIf="!settings.lazyLoading && settings.enableFilterSelectAll && !isDisabledItemPresent">
                <div class="pure-checkbox select-all" *ngIf="!settings.groupBy && filter?.length > 0 && filterLength > 0  && !settings.singleSelection" (click)="toggleFilterSelectAll()">
                    <input type="checkbox" [checked]="isFilterSelectAll" [disabled]="settings.limitSelection == selectedItems?.length" aria-labelledby="optionName"
                    aria-label="option"/>
                    <label>
                        <span [hidden]="isFilterSelectAll">{{settings.filterSelectAllText}}</span>
                        <span [hidden]="!isFilterSelectAll">{{settings.filterUnSelectAllText}}</span>
                    </label>
                </div>
                <div class="pure-checkbox select-all" *ngIf="settings.groupBy && filter?.length > 0 && groupedData?.length > 0  && !settings.singleSelection" (click)="toggleFilterSelectAll()">
                    <input type="checkbox" [checked]="isFilterSelectAll && filter?.length > 0" [disabled]="settings.limitSelection == selectedItems?.length"
                    aria-labelledby="option"/>
                    <label>
                        <span [hidden]="isFilterSelectAll">{{settings.filterSelectAllText}}</span>
                        <span [hidden]="!isFilterSelectAll">{{settings.filterUnSelectAllText}}</span>
                    </label>
                </div>
            </div>
            <div class="filter-select-all" *ngIf="settings.lazyLoading && settings.enableFilterSelectAll && !isDisabledItemPresent && !settings.singleSelection">
                <div class="pure-checkbox select-all" *ngIf="filter?.length > 0 && infiniteFilterLength > 0" (click)="toggleInfiniteFilterSelectAll()">
                    <input type="checkbox" [checked]="isInfiniteFilterSelectAll" [disabled]="settings.limitSelection == selectedItems?.length"
                    aria-labelledby="option"/>
                    <label>
                        <span [hidden]="isInfiniteFilterSelectAll">{{settings.filterSelectAllText}}</span>
                        <span [hidden]="!isInfiniteFilterSelectAll">{{settings.filterUnSelectAllText}}</span>
                    </label>
                </div>
            </div>
            <div class="filter-select-all" *ngIf="filter?.length">
                <div class="btn-container" *ngIf="settings.addNewItemOnFilter">
                    <button class="c-btn btn-iceblue" (click)="addFilterNewItem()">{{settings.addNewButtonText}}</button>
                </div>
            </div>

            <div *ngIf="!settings.groupBy && !settings.lazyLoading && itemTempl == undefined" [style.maxHeight]="settings.maxHeight+'px'"
                style="overflow: auto;">
                <ul class="lazyContainer">
                    <li *ngFor="let item of data; let i = index;" (click)="onItemClick(item,i,$event)"
                        class="pure-checkbox" [ngClass]="{'selected-item': isSelected(item) == true }">
                        <input *ngIf="settings.showCheckbox" type="checkbox" [checked]="isSelected(item)" [disabled]="(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled"
                        aria-labelledby="option"/>
                        <label>{{item[settings.labelKey]}}</label>
                    </li>
                </ul>
            </div>
            <!-- lazy loading -->
            <div *ngIf="!settings.groupBy && settings.lazyLoading && itemTempl == undefined" [style.maxHeight]="settings.maxHeight+'px'"
                style="overflow: auto;">
                <ul virtualScroller #scroll [enableUnequalChildrenSizes]="randomSize" [items]="virtualdata" (vsStart)="onScrollEnd($event)"
                    (vsEnd)="onScrollEnd($event)" [ngStyle]="{'height': settings.maxHeight+'px'}" class="lazyContainer">
                    <li *ngFor="let item of scroll.viewPortItems; let i = index;" (click)="onItemClick(item,i,$event)" class="pure-checkbox"
                        [ngClass]="{'selected-item': isSelected(item) == true }">
                        <input *ngIf="settings.showCheckbox" type="checkbox" [checked]="isSelected(item)" [disabled]="(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled"
                        />
                        <label>{{item[settings.labelKey]}}</label>
                    </li>
                </ul>
            </div>
            <!-- custom template -->
            <div *ngIf="!settings.groupBy && !settings.lazyLoading && itemTempl != undefined" [style.maxHeight]="settings.maxHeight+'px'"
                style="overflow: auto;">
                <ul class="lazyContainer">
                    <li *ngFor="let item of data; let i = index;" (click)="onItemClick(item,i,$event)"
                        class="pure-checkbox" [ngClass]="{'selected-item': isSelected(item) == true }">
                        <input *ngIf="settings.showCheckbox" type="checkbox" [checked]="isSelected(item)" [disabled]="(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled"
                        />
                        <label></label>
                        <c-templateRenderer [data]="itemTempl" [item]="item"></c-templateRenderer>
                    </li>
                </ul>
            </div>
            <!-- lazy loading and custom template -->
            <div *ngIf="!settings.groupBy && settings.lazyLoading && itemTempl != undefined" [style.maxHeight]="settings.maxHeight+'px'"
                style="overflow: auto;">
                <ul virtualScroller #scroll2 [enableUnequalChildrenSizes]="randomSize" [items]="virtualdata" (vsStart)="onScrollEnd($event)"
                    (vsEnd)="onScrollEnd($event)" class="lazyContainer" [ngStyle]="{'height': settings.maxHeight+'px'}">
                    <li *ngFor="let item of scroll2.viewPortItems; let i = index;" (click)="onItemClick(item,i,$event)" class="pure-checkbox"
                        [ngClass]="{'selected-item': isSelected(item) == true }">
                        <input *ngIf="settings.showCheckbox" type="checkbox" [checked]="isSelected(item)" [disabled]="(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled"
                        />
                        <label></label>
                        <c-templateRenderer [data]="itemTempl" [item]="item"></c-templateRenderer>
                    </li>
                </ul>
            </div>
            <!-- lazy loading, group By and custom template -->
            <div *ngIf="settings.groupBy && settings.lazyLoading && itemTempl != undefined" [style.maxHeight]="settings.maxHeight+'px'"
                style="overflow: auto;">
                <ul virtualScroller #scroll3 [enableUnequalChildrenSizes]="randomSize" [items]="virtualdata" (vsStart)="onScrollEnd($event)"
                    (vsEnd)="onScrollEnd($event)" [ngStyle]="{'height': settings.maxHeight+'px'}" class="lazyContainer">
                    <span *ngFor="let item of scroll3.viewPortItems; let i = index;">
                        <li (click)="onItemClick(item,i,$event)" *ngIf="!item.grpTitle" [ngClass]="{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}"
                            class="pure-checkbox">
                            <input *ngIf="settings.showCheckbox && !settings.singleSelection" type="checkbox" [checked]="isSelected(item)" [disabled]="(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled"
                            />
                            <label></label>
                            <c-templateRenderer [data]="itemTempl" [item]="item"></c-templateRenderer>
                        </li>
                        <li *ngIf="item.grpTitle" [ngClass]="{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}"
                            class="pure-checkbox">
                            <input *ngIf="settings.showCheckbox" type="checkbox" [checked]="isSelected(item)" [disabled]="(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled"
                            />
                            <label></label>
                            <c-templateRenderer [data]="itemTempl" [item]="item"></c-templateRenderer>
                        </li>
                    </span>
                </ul>
            </div>
            <!-- group By and custom template -->
            <div *ngIf="settings.groupBy && !settings.lazyLoading && itemTempl != undefined" [style.maxHeight]="settings.maxHeight+'px'"
                style="overflow: auto;">
                <ul class="lazyContainer">
                    <span *ngFor="let item of groupedData; let i = index;">
                        <li (click)="selectGroup(item)" [ngClass]="{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}"
                            class="pure-checkbox">
                            <input *ngIf="settings.showCheckbox && !settings.singleSelection" type="checkbox" [checked]="item.selected" [disabled]="(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled"
                            />
                            <label>{{item[settings.labelKey]}}</label>
                            <ul class="lazyContainer">
                                <span *ngFor="let val of item.list ; let j = index;">
                                    <li (click)="onItemClick(val,j,$event); $event.stopPropagation()" [ngClass]="{'grp-title': val.grpTitle,'grp-item': !val.grpTitle && !settings.singleSelection}"
                                        class="pure-checkbox">
                                        <input *ngIf="settings.showCheckbox" type="checkbox" [checked]="isSelected(val)" [disabled]="(settings.limitSelection == selectedItems?.length && !isSelected(val)) || val.disabled"
                                        />
                                        <label></label>
                                        <c-templateRenderer [data]="itemTempl" [item]="val"></c-templateRenderer>
                                    </li>
                                </span>
                            </ul>

                        </li>
                    </span>
                </ul>
            </div>
            <!-- lazy loading, group By -->
            <div *ngIf="settings.groupBy && settings.lazyLoading && itemTempl == undefined" [style.maxHeight]="settings.maxHeight+'px'"
                style="overflow: auto;">
                <virtual-scroller [items]="groupedData" (vsUpdate)="viewPortItems = $event" (vsEnd)="onScrollEnd($event)" [ngStyle]="{'height': settings.maxHeight+'px'}">
                    <ul virtualScroller #scroll4 [enableUnequalChildrenSizes]="randomSize" [items]="virtualdata" (vsStart)="onScrollEnd($event)"
                        (vsEnd)="onScrollEnd($event)" [ngStyle]="{'height': settings.maxHeight+'px'}" class="lazyContainer">
                        <span *ngFor="let item of scroll4.viewPortItems; let i = index;">
                            <li *ngIf="item.grpTitle" [ngClass]="{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection, 'selected-item': isSelected(item) == true }"
                                class="pure-checkbox">
                                <input *ngIf="settings.showCheckbox && !item.grpTitle && !settings.singleSelection" type="checkbox" [checked]="isSelected(item)"
                                    [disabled]="(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled"
                                />
                                <label>{{item[settings.labelKey]}}</label>
                            </li>
                            <li (click)="onItemClick(item,i,$event)" *ngIf="!item.grpTitle" [ngClass]="{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection, 'selected-item': isSelected(item) == true }"
                                class="pure-checkbox">
                                <input *ngIf="settings.showCheckbox && !item.grpTitle" type="checkbox" [checked]="isSelected(item)" [disabled]="(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled"
                                />
                                <label>{{item[settings.labelKey]}}</label>
                            </li>
                        </span>
                    </ul>
                </virtual-scroller>
            </div>
            <!-- group By -->
            <div *ngIf="settings.groupBy && !settings.lazyLoading && itemTempl == undefined" [style.maxHeight]="settings.maxHeight+'px'"
                style="overflow: auto;">
                <ul class="lazyContainer">
                    <span *ngFor="let item of groupedData ; let i = index;">
                        <li (click)="selectGroup(item)" [ngClass]="{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}"
                            class="pure-checkbox">
                            <input *ngIf="settings.showCheckbox && !settings.singleSelection" type="checkbox" [checked]="item.selected" [disabled]="(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled"
                            />
                            <label>{{item[settings.labelKey]}}</label>
                            <ul class="lazyContainer">
                                <span *ngFor="let val of item.list ; let j = index;">
                                    <li (click)="onItemClick(val,j,$event); $event.stopPropagation()" [ngClass]="{'selected-item': isSelected(val) == true,'grp-title': val.grpTitle,'grp-item': !val.grpTitle && !settings.singleSelection}"
                                        class="pure-checkbox">
                                        <input *ngIf="settings.showCheckbox" type="checkbox" [checked]="isSelected(val)" [disabled]="(settings.limitSelection == selectedItems?.length && !isSelected(val)) || val.disabled"
                                        />
                                        <label>{{val[settings.labelKey]}}</label>
                                    </li>
                                </span>
                            </ul>
                        </li>
                    </span>
                    <!-- <span *ngFor="let item of groupedData ; let i = index;">
                    <li (click)="onItemClick(item,i,$event)" *ngIf="!item.grpTitle" [ngClass]="{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}" class="pure-checkbox">
                    <input *ngIf="settings.showCheckbox && !item.grpTitle" type="checkbox" [checked]="isSelected(item)" [disabled]="settings.limitSelection == selectedItems?.length && !isSelected(item)"
                    />
                    <label>{{item[settings.labelKey]}}</label>
                </li>
                <li *ngIf="item.grpTitle && !settings.selectGroup" [ngClass]="{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}" class="pure-checkbox">
                    <input *ngIf="settings.showCheckbox && settings.selectGroup" type="checkbox" [checked]="isSelected(item)" [disabled]="settings.limitSelection == selectedItems?.length && !isSelected(item)"
                    />
                    <label>{{item[settings.labelKey]}}</label>
                </li>
                 <li  (click)="selectGroup(item)" *ngIf="item.grpTitle && settings.selectGroup" [ngClass]="{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}" class="pure-checkbox">
                    <input *ngIf="settings.showCheckbox && settings.selectGroup" type="checkbox" [checked]="item.selected" [disabled]="settings.limitSelection == selectedItems?.length && !isSelected(item)"
                    />
                    <label>{{item[settings.labelKey]}}</label>
                </li>
                </span> -->
                </ul>
            </div>
            <h5 class="list-message" *ngIf="data?.length == 0">{{settings.noDataLabel}}</h5>
        </div>
    </div>
</div>`,
      styles: ['virtual-scroll{display:block;width:100%}.cuppa-dropdown{position:relative}.c-btn{display:inline-block;border-width:1px;line-height:1.25;border-radius:3px;font-size:.85rem;padding:5px 10px;cursor:pointer;align-items:center;min-height:38px}.c-btn.disabled{background:#ccc}.selected-list .c-list{float:left;padding:0;margin:0;width:calc(100% - 20px)}.selected-list .c-list .c-token{list-style:none;padding:4px 22px 4px 8px;border-radius:2px;margin-right:4px;margin-top:2px;float:left;position:relative}.selected-list .c-list .c-token .c-label{display:block;float:left}.selected-list .c-list .c-token .c-remove{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:8px}.selected-list .c-list .c-token .c-remove svg{fill:#fff}.selected-list .fa-angle-down,.selected-list .fa-angle-up{font-size:15pt;position:absolute;right:10px;top:50%;transform:translateY(-50%)}.selected-list .c-angle-down,.selected-list .c-angle-up{width:12px;height:12px;position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}.selected-list .c-angle-down svg,.selected-list .c-angle-up svg{fill:#333}.selected-list .countplaceholder{position:absolute;right:45px;top:50%;transform:translateY(-50%)}.selected-list .c-btn{width:100%;padding:5px 10px;cursor:pointer;display:flex;position:relative}.selected-list .c-btn .c-icon{position:absolute;right:5px;top:50%;transform:translateY(-50%)}.dropdown-list.tagToBody{position:fixed}.dropdown-list{position:absolute;padding-top:14px;width:100%;z-index:99999}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list ul li{padding:10px;cursor:pointer;text-align:left}.dropdown-list ul li:first-child{padding-top:10px}.dropdown-list ul li:last-child{padding-bottom:10px}.dropdown-list ::-webkit-scrollbar{width:8px}.dropdown-list ::-webkit-scrollbar-thumb{background:#ccc;border-radius:5px}.dropdown-list ::-webkit-scrollbar-track{background:#f2f2f2}.arrow-up,.arrow-down{width:0;height:0;border-left:13px solid transparent;border-right:13px solid transparent;border-bottom:15px solid #fff;margin-left:15px;position:absolute;top:0}.arrow-down{bottom:-14px;top:unset;transform:rotate(180deg)}.arrow-2{border-bottom:15px solid #ccc;top:-1px}.arrow-down.arrow-2{top:unset;bottom:-16px}.list-area{border:1px solid #ccc;border-radius:3px;background:#fff;margin:0}.select-all{padding:10px;border-bottom:1px solid #ccc;text-align:left}.list-filter{border-bottom:1px solid #ccc;position:relative;padding-left:35px;height:35px}.list-filter input{border:0px;width:100%;height:100%;padding:0}.list-filter input:focus{outline:none}.list-filter .c-search{position:absolute;top:4px;left:10px;width:15px;height:15px}.list-filter .c-search svg{fill:#888}.list-filter .c-clear{position:absolute;top:4px;right:10px;width:15px;height:15px}.list-filter .c-clear svg{fill:#888}.pure-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.pure-checkbox input[type=checkbox]:focus+label:before,.pure-checkbox input[type=checkbox]:hover+label:before{background-color:none}.pure-checkbox input[type=checkbox]:active+label:before{transition-duration:0s}.pure-checkbox input[type=checkbox]:disabled+label{color:#ccc}.pure-checkbox input[type=checkbox]+label{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;user-select:none;cursor:pointer;margin:0;font-weight:300}.pure-checkbox input[type=checkbox]+label:before{box-sizing:content-box;content:"";position:absolute;top:50%;left:0;width:15px;height:15px;margin-top:-9px;text-align:center;transition:all .4s ease;border-radius:3px}.pure-checkbox input[type=checkbox]+label:after{box-sizing:content-box;content:"";position:absolute;top:50%;left:0;width:15px;height:15px;margin-top:-9px;transform:scale(0);transform-origin:50%;transition:transform .2s ease-out}.pure-checkbox input[type=checkbox]:disabled+label:before{border-color:#ccc}.pure-checkbox input[type=checkbox]:disabled:focus+label:before .pure-checkbox input[type=checkbox]:disabled:hover+label:before{background-color:inherit}.pure-checkbox input[type=checkbox]:disabled:checked+label:before{background-color:#ccc}.pure-checkbox input[type=checkbox]+label:after{background-color:transparent;top:50%;left:3px;width:9px;height:4px;margin-top:-5px;border-style:solid;border-width:0 0 2px 2px;border-image:none;transform:rotate(-45deg) scale(0)}.pure-checkbox input[type=checkbox]:checked+label:after{content:"";transform:rotate(-45deg) scale(1);transition:transform .2s ease-out}.pure-checkbox input[type=radio]:checked+label:before{background-color:#fff}.pure-checkbox input[type=radio]:checked+label:after{transform:scale(1)}.pure-checkbox input[type=radio]+label:before{border-radius:50%}.pure-checkbox input[type=checkbox]:checked+label:after{transform:rotate(-45deg) scale(1)}.list-message{text-align:center;margin:0;padding:15px 0;font-size:initial}.list-grp{padding:0 15px!important}.list-grp h4{text-transform:capitalize;margin:15px 0 0;font-size:14px;font-weight:700}.list-grp>li{padding-left:15px!important}.grp-item{padding-left:30px!important}.grp-title{padding-bottom:0!important}.grp-title label{margin-bottom:0!important;font-weight:800;text-transform:capitalize}.grp-title:hover{background:none!important}.loading-icon{width:20px;position:absolute;right:10px;top:23px;z-index:1}.nodata-label{width:100%;text-align:center;padding:10px 0 0}.btn-container{text-align:center;padding:5px}.clear-all{width:8px;position:absolute;top:50%;right:30px;transform:translateY(-50%)}\n']
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }, {
    type: ListFilterPipe
  }], {
    data: [{
      type: Input
    }],
    settings: [{
      type: Input
    }],
    loading: [{
      type: Input
    }],
    onSelect: [{
      type: Output,
      args: ["onSelect"]
    }],
    onDeSelect: [{
      type: Output,
      args: ["onDeSelect"]
    }],
    onSelectAll: [{
      type: Output,
      args: ["onSelectAll"]
    }],
    onDeSelectAll: [{
      type: Output,
      args: ["onDeSelectAll"]
    }],
    onOpen: [{
      type: Output,
      args: ["onOpen"]
    }],
    onClose: [{
      type: Output,
      args: ["onClose"]
    }],
    onScrollToEnd: [{
      type: Output,
      args: ["onScrollToEnd"]
    }],
    onFilterSelectAll: [{
      type: Output,
      args: ["onFilterSelectAll"]
    }],
    onFilterDeSelectAll: [{
      type: Output,
      args: ["onFilterDeSelectAll"]
    }],
    onAddFilterNewItem: [{
      type: Output,
      args: ["onAddFilterNewItem"]
    }],
    onGroupSelect: [{
      type: Output,
      args: ["onGroupSelect"]
    }],
    onGroupDeSelect: [{
      type: Output,
      args: ["onGroupDeSelect"]
    }],
    itemTempl: [{
      type: ContentChild,
      args: [Item, {
        static: false
      }]
    }],
    badgeTempl: [{
      type: ContentChild,
      args: [Badge, {
        static: false
      }]
    }],
    searchTempl: [{
      type: ContentChild,
      args: [Search, {
        static: false
      }]
    }],
    searchInput: [{
      type: ViewChild,
      args: ["searchInput", {
        static: false
      }]
    }],
    selectedListElem: [{
      type: ViewChild,
      args: ["selectedList", {
        static: false
      }]
    }],
    dropdownListElem: [{
      type: ViewChild,
      args: ["dropdownList", {
        static: false
      }]
    }],
    cuppaDropdown: [{
      type: ViewChild,
      args: ["cuppaDropdown", {
        static: false
      }]
    }],
    onEscapeDown: [{
      type: HostListener,
      args: ["document:keyup.escape", ["$event"]]
    }],
    onScroll: [{
      type: HostListener,
      args: ["window:scroll", ["$event"]]
    }],
    virtualScroller: [{
      type: ViewChild,
      args: [VirtualScrollerComponent, {
        static: false
      }]
    }]
  });
})();
var AngularMultiSelectModule = class _AngularMultiSelectModule {
  static ɵfac = function AngularMultiSelectModule_Factory(t) {
    return new (t || _AngularMultiSelectModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AngularMultiSelectModule,
    declarations: [AngularMultiSelect, ClickOutsideDirective, ScrollDirective, styleDirective, ListFilterPipe, Item, TemplateRenderer, Badge, Search, setPosition, CIcon],
    imports: [CommonModule, FormsModule, VirtualScrollerModule],
    exports: [AngularMultiSelect, ClickOutsideDirective, ScrollDirective, styleDirective, ListFilterPipe, Item, TemplateRenderer, Badge, Search, setPosition, CIcon]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [DataService, ListFilterPipe],
    imports: [CommonModule, FormsModule, VirtualScrollerModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularMultiSelectModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, FormsModule, VirtualScrollerModule],
      declarations: [AngularMultiSelect, ClickOutsideDirective, ScrollDirective, styleDirective, ListFilterPipe, Item, TemplateRenderer, Badge, Search, setPosition, CIcon],
      exports: [AngularMultiSelect, ClickOutsideDirective, ScrollDirective, styleDirective, ListFilterPipe, Item, TemplateRenderer, Badge, Search, setPosition, CIcon],
      providers: [DataService, ListFilterPipe]
    }]
  }], null, null);
})();
export {
  AngularMultiSelect,
  AngularMultiSelectModule,
  Badge,
  CIcon,
  ClickOutsideDirective,
  Item,
  ListFilterPipe,
  ScrollDirective,
  Search,
  TemplateRenderer,
  setPosition,
  styleDirective
};
//# sourceMappingURL=angular2-multiselect-dropdown.js.map
