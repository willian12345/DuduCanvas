function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/**
 * 私有方法名
 * 使用 Symbol 对象作为私有方法名
 */
var draw = Symbol('draw');
var drawImage$1 = Symbol('drawImage');
var getAlpha = Symbol('getAlpha');
var append = Symbol('append');
var instructions = Symbol('instructions');
var drawGraphics = Symbol('drawGraphics');
/**
 * 兼容各小程序平台
 */

function getPrefix() {
  var prefix = '';

  if (typeof uni !== 'undefined') {
    // uniapp
    prefix = uni;
  } else if (typeof wx !== 'undefined') {
    // 微信小程序
    prefix = wx;
  } else if (typeof my !== 'undefined') {
    // 支付宝小程序
    prefix = my;
  } else if (typeof tt !== 'undefined') {
    // 字节跳动
    prefix = tt;
  }

  return prefix;
}

var prefix = getPrefix();
/**
 * 获取图片信息
 * 如果要获取网络图片的信息，需要预先在开发者平台配置 download 的域名白名单
 * https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.getImageInfo.html
 */

var getImageInfo = prefix['getImageInfo'];
var createSelectorQuery = prefix['createSelectorQuery'];
var createCanvasContext = prefix['createCanvasContext'];

var total = Symbol('total');
var loaded = Symbol('loaded');
var load = Symbol('load');
var loadProgressCallback = Symbol('loadProgressCallback');
var imageMap = Symbol('imageMap');
var PATH_REG = /^http*/;
/**
 * 预加载图片
 * 
 */

var ImgLoader = /*#__PURE__*/function () {
  function ImgLoader(imgArr, loadProgressCallback) {
    var _this = this;

    _classCallCheck(this, ImgLoader);

    this[total] = imgArr.length;
    this[loaded] = 0;
    this[loadProgressCallback] = loadProgressCallback;
    this[imageMap] = new Map(); // 直接返回一个 Promise

    return new Promise(function (resolve) {
      _this[load](imgArr, resolve);
    });
  }

  _createClass(ImgLoader, [{
    key: "get",
    value: function get(id) {
      return this[imageMap].get(id);
    }
  }, {
    key: load,
    value: function value(imgArr, resolve) {
      var _this2 = this;

      imgArr.forEach(function (v) {
        getImageInfo({
          src: v.src,
          success: function success(res) {
            // 为本地图片地址最前主动加上 '/' , 以符合绘图接口的路径规则
            if (!PATH_REG.test(v.src)) {
              res.path = '/' + res.path;
            }

            _this2[imageMap].set(v.id, {
              path: res.path,
              width: res.width,
              height: res.height
            });

            _this2[loaded]++;

            if (_this2[loadProgressCallback]) {
              _this2[loadProgressCallback](p);
            }

            if (_this2[loaded] / _this2[total] >= 1) {
              resolve(_this2);
            }
          }
        });
      });
      return this;
    }
  }]);

  return ImgLoader;
}();

/**
 * getPosAfterRotation
 * 获取旋转后的坐标
 * @param {*} rotation 旋转角度
 * @param {*} x 
 * @param {*} y
 * 旋转公式转自 Foundation Actionscript3.0 Animation
 * 第十章“坐标旋转及角度反弹”及第十八章“矩阵数学”
 * 可认为是绕虚拟z轴旋转矩阵 
 * [cos  sin   0]
 * [-sin cos   0]
 * [ 0    0    1]
 * 计算 x 与 y 
 * x = (x * cos + y * -sin)
 * y = (x * sin + y * cos)
 * 得
 * x = Math.cos(angle) * x - Math.sin(angle) * y
 * y =  Math.cos(angle) * y + Math.sin(angle) * x
 *
 */
function getPosAfterRotation(rotation, x, y) {
  var angle = rotation * (Math.PI / 180);

  var _x = Math.cos(angle) * x - Math.sin(angle) * y;

  var _y = Math.cos(angle) * y + Math.sin(angle) * x;

  return {
    x: _x,
    y: _y
  };
}
/**
 * getMaxValue
 * 获取数组对象中最小x,最大x,最小y，最大y
 * @param {*} arr : [{x:1, y: 1}, {x: 100, y, 100}]
 */

function getMaxValue(arr) {
  var minX = arr[0].x;
  var maxX = arr[0].x;
  var minY = arr[0].y;
  var maxY = arr[0].y; // 计算最小最大的 x,y 值

  for (var i = 1, l = arr.length; i < l; i++) {
    if (minX > arr[i].x) {
      minX = arr[i].x;
    }

    if (arr[i].x > maxX) {
      maxX = arr[i].x;
    }

    if (minY > arr[i].y) {
      minY = arr[i].y;
    }

    if (arr[i].y > maxY) {
      maxY = arr[i].y;
    }
  }

  return [minX, minY, maxX, maxY];
} // 递归找到所有子元素深度优先

function findNodes(node) {
  var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var l = node.childs.length;

  if (l) {
    for (var i = 0; i < l; i++) {
      if (node.childs[i].childs && node.childs[i].childs.length) {
        var nodes = findNodes(node.childs[i]);
        arr.push(node.childs[i]);
        return arr.concat(nodes);
      } else {
        arr.push(node.childs[i]);
      }
    }
  } else {
    arr.push(node);
  }

  return arr;
}

var BeginPath = /*#__PURE__*/function () {
  function BeginPath() {
    _classCallCheck(this, BeginPath);
  }

  _createClass(BeginPath, [{
    key: "exec",
    value: function exec(ctx) {
      ctx.beginPath();
    }
  }]);

  return BeginPath;
}();

var MoveTo = /*#__PURE__*/function () {
  function MoveTo(x, y) {
    _classCallCheck(this, MoveTo);

    this.x = x;
    this.y = y;
  }

  _createClass(MoveTo, [{
    key: "exec",
    value: function exec(ctx, instance) {
      var _instance$getPosition = instance.getPosition(),
          _instance$getPosition2 = _slicedToArray(_instance$getPosition, 2),
          _x = _instance$getPosition2[0],
          _y = _instance$getPosition2[1];

      ctx.moveTo(this.x + _x, this.y + _y);
    }
  }]);

  return MoveTo;
}();

var LineTo = /*#__PURE__*/function () {
  function LineTo(x, y) {
    _classCallCheck(this, LineTo);

    this.x = x;
    this.y = y;
  }

  _createClass(LineTo, [{
    key: "exec",
    value: function exec(ctx, instance) {
      var _instance$getPosition = instance.getPosition(),
          _instance$getPosition2 = _slicedToArray(_instance$getPosition, 2),
          _x = _instance$getPosition2[0],
          _y = _instance$getPosition2[1];

      ctx.lineTo(this.x + _x, this.y + _y);
    }
  }]);

  return LineTo;
}();

var Arc = /*#__PURE__*/function () {
  function Arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    _classCallCheck(this, Arc);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.anticlockwise = anticlockwise;
  }

  _createClass(Arc, [{
    key: "exec",
    value: function exec(ctx, instance) {
      var _instance$getPosition = instance.getPosition(),
          _instance$getPosition2 = _slicedToArray(_instance$getPosition, 2),
          _x = _instance$getPosition2[0],
          _y = _instance$getPosition2[1];

      ctx.arc(this.x + _x, this.y + _y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
    }
  }]);

  return Arc;
}();

var ArcTo = /*#__PURE__*/function () {
  function ArcTo(x1, y1, x2, y2, radius) {
    _classCallCheck(this, ArcTo);

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.radius = radius;
  }

  _createClass(ArcTo, [{
    key: "exec",
    value: function exec(ctx, instance) {
      var _instance$getPosition = instance.getPosition(),
          _instance$getPosition2 = _slicedToArray(_instance$getPosition, 2),
          _x = _instance$getPosition2[0],
          _y = _instance$getPosition2[1];

      ctx.arcTo(this.x1 + _x, this.y1 + _y, this.x2 + _x, this.y2 + _y, this.radius);
    }
  }]);

  return ArcTo;
}();

var Stroke = /*#__PURE__*/function () {
  function Stroke() {
    _classCallCheck(this, Stroke);
  }

  _createClass(Stroke, [{
    key: "exec",
    value: function exec(ctx) {
      ctx.stroke();
    }
  }]);

  return Stroke;
}();

var Fill = /*#__PURE__*/function () {
  function Fill() {
    _classCallCheck(this, Fill);
  }

  _createClass(Fill, [{
    key: "exec",
    value: function exec(ctx) {
      ctx.fill();
    }
  }]);

  return Fill;
}();

/**
 * 设置样式类
 * 样式可以是 颜色 或 Pattern
 */
var SetFillStyle$1 = /*#__PURE__*/function () {
  /**
   * @param {*} style 颜色值，或 Pattern
   */
  function SetFillStyle(style) {
    _classCallCheck(this, SetFillStyle);

    this.style = style;
  }

  _createClass(SetFillStyle, [{
    key: "exec",
    value: function exec(ctx, instance) {
      if (this.style.name === 'CreateLinearGradient' || this.style.name === 'CreateRadialGradient') {
        ctx.fillStyle = this.style.exec(ctx, instance);
      } else {
        ctx.fillStyle = this.style;
      }
    }
  }]);

  return SetFillStyle;
}();

var SetStrokeStyle = /*#__PURE__*/function () {
  function SetStrokeStyle(style) {
    _classCallCheck(this, SetStrokeStyle);

    this.style = style;
  }

  _createClass(SetStrokeStyle, [{
    key: "exec",
    value: function exec(ctx) {
      ctx.strokeStyle = this.style;
    }
  }]);

  return SetStrokeStyle;
}();

var Clip = /*#__PURE__*/function () {
  function Clip() {
    _classCallCheck(this, Clip);
  }

  _createClass(Clip, [{
    key: "exec",
    value: function exec(ctx) {
      ctx.clip();
    }
  }]);

  return Clip;
}();

/**
 * 二次贝塞尔曲线
 * 提示：二次贝塞尔曲线需要两个点。第一个点是用于二次贝塞尔计算中的控制点，第二个点是曲线的结束点。
 * 曲线的开始点是当前路径中最后一个点。如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点
 */
var QuadraticCurveTo = /*#__PURE__*/function () {
  function QuadraticCurveTo(cpx, cpy, x, y) {
    _classCallCheck(this, QuadraticCurveTo);

    this.cpx = cpx;
    this.cpy = cpy;
    this.x = x;
    this.y = y;
  }

  _createClass(QuadraticCurveTo, [{
    key: "exec",
    value: function exec(ctx, instance) {
      var _instance$getPosition = instance.getPosition(),
          _instance$getPosition2 = _slicedToArray(_instance$getPosition, 2),
          _x = _instance$getPosition2[0],
          _y = _instance$getPosition2[1];

      ctx.quadraticCurveTo(this.cpx + _x, this.cpy + _y, this.x + _x, this.y + _y);
    }
  }]);

  return QuadraticCurveTo;
}();

var BezierCurveTo = /*#__PURE__*/function () {
  function BezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    _classCallCheck(this, BezierCurveTo);

    this.cp1x = cp1x;
    this.cp1y = cp1y;
    this.cp2x = cp2x;
    this.cp2y = cp2y;
    this.x = x;
    this.y = y;
  }

  _createClass(BezierCurveTo, [{
    key: "exec",
    value: function exec(ctx, instance) {
      var _instance$getPosition = instance.getPosition(),
          _instance$getPosition2 = _slicedToArray(_instance$getPosition, 2),
          _x = _instance$getPosition2[0],
          _y = _instance$getPosition2[1];

      ctx.bezierCurveTo(this.cp1x + _x, this.cp1y + _y, this.cp2x + _x, this.cp2y + _y, this.x + _x, this.y + _y);
    }
  }]);

  return BezierCurveTo;
}();

var DrawCircle = /*#__PURE__*/function () {
  function DrawCircle(x, y, radius) {
    var fill = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, DrawCircle);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fill = fill;
  }

  _createClass(DrawCircle, [{
    key: "exec",
    value: function exec(ctx, instance) {
      var _instance$getPosition = instance.getPosition(),
          _instance$getPosition2 = _slicedToArray(_instance$getPosition, 2),
          _x = _instance$getPosition2[0],
          _y = _instance$getPosition2[1]; // 要先 beginPath 重新开始 path 以防之前就有开始的路径影响


      ctx.beginPath();
      ctx.arc(this.x + _x, this.y + _y, this.radius, 0, 2 * Math.PI);

      if (instance.isMask) {
        ctx.clip();
      } else {
        if (this.fill) {
          ctx.fill();
        }
      }
    }
  }]);

  return DrawCircle;
}();

var Rect = /*#__PURE__*/function () {
  function Rect(x, y, w, h) {
    var isStroke = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    _classCallCheck(this, Rect);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isStroke = isStroke;
  }

  _createClass(Rect, [{
    key: "exec",
    value: function exec(ctx, instance) {
      var _instance$getPosition = instance.getPosition(),
          _instance$getPosition2 = _slicedToArray(_instance$getPosition, 2),
          _x = _instance$getPosition2[0],
          _y = _instance$getPosition2[1];

      var dx = this.x + _x;
      var dy = this.y + _y; // 要先 beginPath 重新开始 path 以防之前就有开始的路径影响

      ctx.beginPath();

      if (instance.isMask) {
        ctx.rect(dx, dy, this.w, this.h);
        ctx.clip();
      } else {
        if (this.isStroke) {
          ctx.strokeRect(dx, dy, this.w, this.h);
        } else {
          ctx.fillRect(dx, dy, this.w, this.h);
        }
      }
    }
  }]);

  return Rect;
}();

var RoundRect = /*#__PURE__*/function () {
  function RoundRect(x, y, width, height, radius, fill, stroke) {
    _classCallCheck(this, RoundRect);

    if (typeof stroke === 'undefined') {
      this.stroke = true;
    } else {
      this.stroke = stroke;
    }

    if (typeof radius === 'undefined') {
      radius = 5;
    }

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;

    if (typeof radius === 'number') {
      radius = {
        tl: radius,
        tr: radius,
        br: radius,
        bl: radius
      };
    }

    var defaultRadius = radius;
    this.radius = {};

    for (var side in defaultRadius) {
      this.radius[side] = this.radius[side] || defaultRadius[side];
    }
  }

  _createClass(RoundRect, [{
    key: "exec",
    value: function exec(ctx, instance) {
      // 如果是作为遮罩，则需要获取并参照定位于被遮罩物的坐标
      var _instance$getPosition = instance.getPosition(),
          _instance$getPosition2 = _slicedToArray(_instance$getPosition, 2),
          _x = _instance$getPosition2[0],
          _y = _instance$getPosition2[1];

      var x = _x + this.x,
          y = _y + this.y,
          radius = this.radius,
          width = this.width,
          height = this.height;
      var fill, stroke;

      if (instance.masked) {
        // instance.isMask
        fill = false;
        stroke = false;
      } else {
        fill = this.fill;
        stroke = this.stroke;
      } // 该方法来自 stackoverflow


      ctx.beginPath(); // ctx.fillStyle = '#ff0000'

      ctx.moveTo(x + radius.tl, y);
      ctx.lineTo(x + width - radius.tr, y); // quadraticCurveTo(控制点: cpx, cpy, 终点: x, y)

      ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
      ctx.lineTo(x + width, y + height - radius.br);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
      ctx.lineTo(x + radius.bl, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
      ctx.lineTo(x, y + radius.tl);
      ctx.quadraticCurveTo(x, y, x + radius.tl, y);
      ctx.closePath();

      if (instance.isMask) {
        ctx.clip();
      } else {
        if (fill) {
          ctx.fill();
        }

        if (stroke) {
          ctx.stroke();
        }
      }
    }
  }]);

  return RoundRect;
}();

var ClearRect = /*#__PURE__*/function () {
  function ClearRect(x, y, w, h) {
    _classCallCheck(this, ClearRect);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  _createClass(ClearRect, [{
    key: "exec",
    value: function exec(ctx, instance) {
      var _instance$getPosition = instance.getPosition(),
          _instance$getPosition2 = _slicedToArray(_instance$getPosition, 2),
          _x = _instance$getPosition2[0],
          _y = _instance$getPosition2[1];

      ctx.clearRect(this.x + _x, this.y + _y, this.w, this.h);
    }
  }]);

  return ClearRect;
}();

/**
 * lineCap = butt | round | square
 * butt	默认。向线条的每个末端添加平直的边缘。
 * round	向线条的每个末端添加圆形线帽。
 * square	向线条的每个末端添加正方形线帽。
 */
var LineCap = /*#__PURE__*/function () {
  function LineCap() {
    var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'butt';

    _classCallCheck(this, LineCap);

    this.lineCap = style;
  }

  _createClass(LineCap, [{
    key: "exec",
    value: function exec(ctx, instance) {
      ctx.lineCap = this.lineCap;
    }
  }]);

  return LineCap;
}();

/**
 * lineJoin = "bevel|round|miter"
 * bevel	创建斜角。
 * round	创建圆角。
 * miter	默认。创建尖角。
 */
var LineJoin = /*#__PURE__*/function () {
  function LineJoin() {
    var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bevel';
    var miterLimit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    _classCallCheck(this, LineJoin);

    this.lineJoin = style;
    this.miterLimit = miterLimit;
  }

  _createClass(LineJoin, [{
    key: "exec",
    value: function exec(ctx) {
      // miter 与 miterLimit 关系 具体可查看 https://www.w3school.com.cn/tags/canvas_miterlimit.asp
      if (this.miterLimit != 10 && this.style === 'bevel') {
        ctx.miterLimit = this.miterLimit;
      }

      ctx.lineJoin = this.lineJoin;
    }
  }]);

  return LineJoin;
}();

var LineWidth = /*#__PURE__*/function () {
  function LineWidth() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    _classCallCheck(this, LineWidth);

    this.lineWidth = width;
  }

  _createClass(LineWidth, [{
    key: "exec",
    value: function exec(ctx, instance) {
      ctx.lineWidth = this.lineWidth;
    }
  }]);

  return LineWidth;
}();

var SetLineDash = /*#__PURE__*/function () {
  function SetLineDash() {
    var dash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, SetLineDash);

    this.lineDash = dash;
  }

  _createClass(SetLineDash, [{
    key: "exec",
    value: function exec(ctx, instance) {
      ctx.setLineDash(this.lineDash);
    }
  }]);

  return SetLineDash;
}();

/**
 * Graphics 绘制类
 * 绘制命令，添加绘制命令集，最终在 draw 方法内集中绘制
 */

var Graphics = /*#__PURE__*/function () {
  function Graphics() {
    var _this = this;

    _classCallCheck(this, Graphics);

    _defineProperty(this, "name", 'Graphics');

    _defineProperty(this, "graphics", {
      beginPath: function beginPath() {
        _this[append](new BeginPath());

        return _this.graphics;
      },
      moveTo: function moveTo(x, y) {
        _this[append](new MoveTo(x, y));

        return _this.graphics;
      },
      setLineDash: function setLineDash(dash) {
        _this[append](new SetLineDash(dash));

        return _this.graphics;
      },
      lineWidth: function lineWidth(width) {
        _this[append](new LineWidth(width));

        return _this.graphics;
      },
      lineCap: function lineCap(style) {
        _this[append](new LineCap(style));

        return _this.graphics;
      },
      lineJoin: function lineJoin(style) {
        _this[append](new LineJoin(style));

        return _this.graphics;
      },
      lineTo: function lineTo(x, y) {
        _this[append](new LineTo(x, y));

        return _this.graphics;
      },
      quadraticCurveTo: function quadraticCurveTo(cpx, cpy, x, y) {
        _this[append](new QuadraticCurveTo(cpx, cpy, x, y));

        return _this.graphics;
      },
      bezierCurveTo: function bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        _this[append](new BezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y));

        return _this.graphics;
      },

      /**
       画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
       从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
       */
      arc: function arc(x, y, radius, startAngle, endAngle) {
        var anticlockwise = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

        _this[append](new Arc(x, y, radius, startAngle, endAngle, anticlockwise));

        return _this.graphics;
      },

      /**
       根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点
       */
      arcTo: function arcTo(x1, y1, x2, y2, radius) {
        _this[append](new ArcTo(x1, y1, x2, y2, radius));

        return _this.graphics;
      },
      stroke: function stroke() {
        _this[append](new Stroke());

        return _this.graphics;
      },
      fill: function fill() {
        _this[append](new Fill());

        return _this.graphics;
      },
      fillStyle: function fillStyle(style) {
        _this[append](new SetFillStyle$1(style));

        return _this.graphics;
      },
      strokeStyle: function strokeStyle(style) {
        _this[append](new SetStrokeStyle(style));

        return _this.graphics;
      },
      fillCircle: function fillCircle() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

        _this[append](new DrawCircle(x, y, radius, true));

        return _this.graphics;
      },
      strokeCircle: function strokeCircle() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

        _this[append](new DrawCircle(x, y, radius));

        _this[append](new Stroke());

        return _this.graphics;
      },
      fillRect: function fillRect() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
        var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;

        _this[append](new Rect(x, y, w, h));

        return _this.graphics;
      },

      /**
       * 画一个矩形(非填充)。 用 strokeStyle 设置矩形线条的颜色，如果没设置默认是黑色
       */
      strokeRect: function strokeRect() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
        var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;

        _this[append](new Rect(x, y, w, h, true));

        _this[append](new Stroke());

        return _this.graphics;
      },
      fillRoundRect: function fillRoundRect() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
        var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
        var radius = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 8;
        var fill = arguments.length > 5 ? arguments[5] : undefined;
        var stroke = arguments.length > 6 ? arguments[6] : undefined;

        _this[append](new RoundRect(x, y, w, h, radius, fill, stroke));

        return _this.graphics;
      },
      strokeRoundRect: function strokeRoundRect(x, y, w, h, radius) {
        _this[append](new RoundRect(x, y, w, h, radius, false, true));

        _this[append](new Stroke());

        return _this.graphics;
      },

      /**
       * 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容的方
       */
      clearRect: function clearRect(x, y, w, h) {
        _this[append](new ClearRect(x, y, w, h));

        return _this.graphics;
      },
      clip: function clip() {
        _this[append](new Clip());

        return _this.graphics;
      }
    });

    this[instructions] = [];
  } // 添加至指令集


  _createClass(Graphics, [{
    key: append,
    value: function value(instructionsObject) {
      this[instructions].push(instructionsObject);
    }
  }, {
    key: drawGraphics,
    value: function value(ctx) {
      var _this2 = this;

      this[instructions].forEach(function (instruction) {
        instruction.exec(ctx, _this2);
      });
    }
    /**
     * 命令方法名与 w3c 一致
     */

  }]);

  return Graphics;
}();

var context = null;
var displayObjectId = 0;
var id = Symbol('id');
var scale = Symbol('scale');
var mask = Symbol('mask');
var setShadow = Symbol('setShadow');
/**
 * 显示对象类
 */

var DisplayObject = /*#__PURE__*/function (_Graphics) {
  _inherits(DisplayObject, _Graphics);

  var _super = _createSuper(DisplayObject);

  function DisplayObject() {
    var _thisSuper, _this;

    _classCallCheck(this, DisplayObject);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "name", 'DisplayObject');

    _defineProperty(_assertThisInitialized(_this), "x", 0);

    _defineProperty(_assertThisInitialized(_this), "y", 0);

    _defineProperty(_assertThisInitialized(_this), "width", 0);

    _defineProperty(_assertThisInitialized(_this), "height", 0);

    _defineProperty(_assertThisInitialized(_this), "alpha", 1);

    _defineProperty(_assertThisInitialized(_this), "regX", 0);

    _defineProperty(_assertThisInitialized(_this), "regY", 0);

    _defineProperty(_assertThisInitialized(_this), "scaleX", 1);

    _defineProperty(_assertThisInitialized(_this), "scaleY", 1);

    _defineProperty(_assertThisInitialized(_this), "rotation", 0);

    _defineProperty(_assertThisInitialized(_this), "parent", null);

    _defineProperty(_assertThisInitialized(_this), "childs", []);

    _defineProperty(_assertThisInitialized(_this), "shadow", '');

    _this[drawGraphics] = _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(DisplayObject.prototype)), drawGraphics, _thisSuper);
    _this[scale] = 1;
    _this[id] = displayObjectId++;
    return _this;
  }

  _createClass(DisplayObject, [{
    key: "mask",
    get: function get() {
      return this[mask];
    },
    set: function set(s) {
      if (s.name !== 'Shape') {
        throw new Error('遮罩必须是 Shape 对象');
      }

      s.isMask = true;
      this[mask] = s;
    }
  }, {
    key: "scale",
    get: function get() {
      return this[scale];
    },
    set: function set(s) {
      this.scaleX = s;
      this.scaleY = s;
      this[scale] = s;
    }
    /**
     * 保存 Stage 时传入 canvas context
     */

  }, {
    key: "addChild",
    value: // 添加子元素
    function addChild() {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // 指定父级
      var childs = args.map(function (v, index) {
        if (v[id] === _this2[id]) {
          throw new Error("\u4E0D\u80FD\u81EA\u5DF1\u6DFB\u52A0\u81EA\u5DF1\u4E3A child :".concat(v.name));
        } else if (v.isMask) {
          throw new Error("\u5DF2\u88AB\u8BBE\u7F6E\u6210 mask \u906E\u7F69 \u4E0D\u80FD addChild \u5230\u5176\u5B83\u7236\u7EA7\u5185:".concat(v.name));
        } // 如果添加的对象有 mask 遮罩则 mask 也指定父级，以对应对象的坐标


        if (v.mask) {
          v.mask.parent = _this2;
        }

        v.parent = _this2;
        v.zIndex = index;
        return v;
      });
      this.childs = this.childs.concat(childs);
    } // 删除子元素

  }, {
    key: "removeChild",
    value: function removeChild(child) {
      this.childs = this.childs.filter(function (v) {
        return v[id] != child[id];
      });
    } // 绘制

  }, {
    key: draw,
    value: function value() {
      var _this3 = this;

      // 执行绘制 graphics 指令
      this[drawGraphics](context);
      this.childs.forEach(function (v) {
        // 绘制前压栈
        context.save(); // canvas 上下文 context 先 transform 

        _this3.transform(v, context); // 设置投影


        if (v.shadow.length) {
          _this3[setShadow](v);
        } // 设置 alpha 透明度


        context.globalAlpha = _this3[getAlpha]();
        context.rotate(0); // 递归绘制

        v[draw](context); // 绘制完后弹栈

        context.restore(); // context.setTransform(1, 0, 0, 1, 0, 0) 重置上下文向量坐标
        // 调试显示可视对象边界线用于调试
        // if(!v.sliced){
        // 	const b = v.getBounds()
        // 	context.beginPath();
        // 	context.strokeStyle = 'blue'
        // 	context.strokeRect(b.left,b.top,b.width,b.height);
        // }
      });
    }
    /**
     * setShadow
     * 添加阴影效果， 遮罩(clip)过的对象不支持 shadow 效果
     * @param {*} shadow "10 10 10 black"
     */

  }, {
    key: setShadow,
    value: function value(el) {
      var valueArr = el.shadow.split(' ');

      if (el.name === 'Sprite' || el.name === 'Group') {
        throw new Error('Sprite 或 Group 组件对象不允许设置 shadow');
      }

      if (valueArr.length < 4) {
        throw new Error('shadow 需要 4 个值 eg: "10 10 10 black"');
      }

      context.shadowOffsetX = valueArr[0];
      context.shadowOffsetY = valueArr[1];
      context.shadowBlur = valueArr[2];
      context.shadowColor = valueArr[3];
    }
    /**
     * 获取元素透明度
     */

  }, {
    key: getAlpha,
    value: function value() {
      var parent = this.parent;
      var alpha = this.alpha;

      while (parent && parent.name != 'Stage') {
        alpha *= parent.alpha;
        parent = parent.parent;
      }

      return alpha;
    }
    /**
     * getPosition 获取实例距画布左上角原点(0,0)的绝对位置
     * @return {[x, y]} 返回数组
     */

  }, {
    key: "getPosition",
    value: function getPosition() {
      var parent; // 如果自身是 mask 则坐标取被遮罩的对象为父级

      if (this.masked) {
        parent = this.masked;
      } else {
        parent = this.parent;
      }

      var x = this.x - this.regX,
          y = this.y - this.regY; // console.log(x)

      while (parent && parent.name != 'Stage') {
        x += parent.x - parent.regX;
        y += parent.y - parent.regY;
        parent = parent.parent;
      }

      return [x, y];
    }
    /**
     * 获取旋转角度
     */

  }, {
    key: "getRotation",
    value: function getRotation() {
      // 角度不需要根据父级计算叠加
      // let parent = this.parent
      var rotation = this.rotation; // while(parent && parent.name != 'Stage'){
      // 	rotation = parent.rotation
      // 	parent = parent.parent
      // }

      return rotation;
    }
    /**
     * 获取缩放程度
     */

  }, {
    key: "getScale",
    value: function getScale() {
      var parent = this.parent;
      var scaleX = this.scaleX;
      var scaleY = this.scaleY;

      while (parent && parent.name != 'Stage') {
        scaleX += parent.scaleX;
        scaleY += parent.scaleY;
        parent = parent.parent;
      }

      return [scaleX, scaleY];
    }
    /**
     * 先形变后再绘制
     * 移动、缩放、旋转 canvas
     */

  }, {
    key: "transform",
    value: function transform(v, context) {
      if (v.name === 'Stage') return;
      var ctx = context;

      var _v$getPosition = v.getPosition(),
          _v$getPosition2 = _slicedToArray(_v$getPosition, 2),
          _x = _v$getPosition2[0],
          _y = _v$getPosition2[1];

      var rotation = v.getRotation();
      var _ref = [v.scaleX, v.scaleY],
          scaleX = _ref[0],
          scaleY = _ref[1];
      var regPointerX = _x + v.regX;
      var regPointerY = _y + v.regY; // 变形过程顺序必须为先移动位置，再放大缩小或旋转
      // 再移动回原来的位置

      ctx.translate(regPointerX, regPointerY);
      ctx.scale(scaleX, scaleY);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.translate(-regPointerX, -regPointerY); // return [_x, _y, rotation, regPointerX, regPointerY, scaleX, scaleY]

      return this;
    }
  }, {
    key: "getRectangleRotatedPosition",
    value: function getRectangleRotatedPosition(rotation, w, h, regX, regY) {
      // 获取左上、右上、右下，左下绕自身注册点旋转后的坐标
      // left top
      var lt = getPosAfterRotation(rotation, -regX, -regY); // right top

      var rt = getPosAfterRotation(rotation, w - regX, -regY); // right bottom

      var rb = getPosAfterRotation(rotation, w - regX, h - regY); // left bottom

      var lb = getPosAfterRotation(rotation, -regX, h - regY);
      return [lt, rt, rb, lb];
    }
    /**
     * 获取对象形变后的相较于舞台的绝对位置与宽度
     * scale 形变不在 getBounds 计算之内
     * scale 形变后宽高可请自行乘上相应的 scale 倍数
     */

  }, {
    key: "_getBounds",
    value: function _getBounds() {
      var _this$getPosition = this.getPosition(),
          _this$getPosition2 = _slicedToArray(_this$getPosition, 2),
          x = _this$getPosition2[0],
          y = _this$getPosition2[1];

      var w = this.width;
      var h = this.height;
      var regX = this.regX;
      var regY = this.regY;

      if (this.rotation !== 0) {
        var arr = this.getRectangleRotatedPosition(this.rotation, w, h, regX, regY); // 相对坐标+原本的 x y 值成为绝对坐标

        arr.map(function (v) {
          return _objectSpread2(_objectSpread2({}, v), {}, {
            x: v.x + x + regX,
            y: v.y + y + regY
          });
        }); // 获取最左，最右，最上最下 坐标

        var _getMaxValue = getMaxValue(arr),
            _getMaxValue2 = _slicedToArray(_getMaxValue, 4),
            minX = _getMaxValue2[0],
            minY = _getMaxValue2[1],
            maxX = _getMaxValue2[2],
            maxY = _getMaxValue2[3];

        w = maxX - minX;
        h = maxY - minY;
        x = minX;
        y = minY;
      } else {
        // 如果对象没有旋转，则简单获取对象的 x y
        x = x;
        y = y;
      }

      return {
        left: x,
        top: y,
        right: x + w,
        bottom: y + h,
        width: w,
        height: h
      };
    } // 寻找所有子元素的 bounds 边界宽高并存入数组

  }, {
    key: "findNodesBounds",
    value: function findNodesBounds(node) {
      return findNodes(node).map(function (v) {
        return v._getBounds();
      });
    } // 获取元素的绝对宽度

  }, {
    key: "getBounds",
    value: function getBounds() {
      // 如果没有子元素，则直接返回自身的宽度
      if (this.childs.length === 0) {
        return this._getBounds();
      } else {
        if (this.childs) {
          var bounds = this.findNodesBounds(this);
          var l = [];
          var r = [];
          var t = [];
          var b = [];
          bounds.forEach(function (v) {
            l.push(v.left);
            r.push(v.right);
            t.push(v.top);
            b.push(v.bottom);
          });
          var left = Math.min.apply(Math, l);
          var right = Math.max.apply(Math, r);
          var top = Math.min.apply(Math, t);
          var bottom = Math.max.apply(Math, b);

          if (this.name === 'Group') {
            // 计算子元素合并宽高后，再继续计算整体旋转后的大小位置
            var rect = new DisplayObject();
            rect.width = right - left;
            rect.height = bottom - top;
            rect.x = this.x;
            rect.y = this.y;
            rect.regX = this.regX;
            rect.regY = this.regY;
            rect.rotation = this.rotation;
            return this._getBounds.call(rect);
          } else {
            return {
              left: left,
              top: top,
              right: right,
              bottom: bottom,
              width: right - left,
              height: bottom - top
            };
          }
        }
      }
    }
  }], [{
    key: "setContext",
    value: function setContext(ctx) {
      context = ctx;
    }
  }, {
    key: "getContext",
    value: function getContext() {
      return context;
    }
  }]);

  return DisplayObject;
}(Graphics);

var _width$2 = Symbol('width');

var _height$2 = Symbol('height');

var _display = Symbol('_display');

var _alignItems$1 = Symbol('_alignItems');

var _justifyContent$1 = Symbol('_justifyContent');
/**
 * Group 组
 * 可添加多个显示对象进 Group 内，变成一个显示组，可集中对 Group 组操作
 */


var Group = /*#__PURE__*/function (_DisplayObject) {
  _inherits(Group, _DisplayObject);

  var _super = _createSuper(Group);

  function Group(context) {
    var _this;

    _classCallCheck(this, Group);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "name", 'Group');

    return _this;
  }

  _createClass(Group, [{
    key: "width",
    get: function get() {
      return this[_width$2];
    },
    set: function set(v) {
      this[_width$2] = v;
    }
  }, {
    key: "height",
    get: function get() {
      return this[_height$2];
    },
    set: function set(v) {
      this[_height$2] = v;
    }
  }, {
    key: "display",
    get: function get() {
      return this[_display];
    },
    set: function set(v) {
      this[_display] = v;
    }
  }, {
    key: "alignItems",
    get: function get() {
      return this[_alignItems$1];
    },
    set: function set(v) {
      this[_alignItems$1] = v;
    }
  }, {
    key: "justifyContent",
    get: function get() {
      return this[_justifyContent$1];
    },
    set: function set(v) {
      this[_justifyContent$1] = v;
    }
  }]);

  return Group;
}(DisplayObject);

var render = Symbol('render');
/**
 * Stage
 * 舞台对象
 * 所有显示对象都在舞台对象下，舞台通过渲染函数 
 * Stage 的 render 发起所有子元素的 draw 方法调用
 * 子元素自身再递归调用子元素 draw 方法
 */

var Stage = /*#__PURE__*/function (_DisplayObject) {
  _inherits(Stage, _DisplayObject);

  var _super = _createSuper(Stage);

  /**
   * 
   * @param {*} id canvas id
   * @param {*} callback 初始化舞台后的回调
   * @param {*} componentInstance 如果是在自定义组件内，则需要将组件实例 this 传进来
   */
  function Stage(id, callback, componentInstance) {
    var _this;

    _classCallCheck(this, Stage);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "name", 'Stage');

    _defineProperty(_assertThisInitialized(_this), "canvas", null);

    var query = componentInstance ? createSelectorQuery()["in"](componentInstance) : createSelectorQuery();
    query.select(id).fields({
      node: true,
      size: true
    }).exec(function (res) {
      var data = res[0];

      if (data) {
        _this.width = data.width;
        _this.height = data.height;

        if (data.node) {
          var canvas = data.node; // canvas 新接口, 还处于公测阶段

          _this._context = canvas.getContext('2d');
        } else {
          // 旧接口
          _this._context = createCanvasContext(id.slice(1), componentInstance);
        }

        DisplayObject.setContext(_this._context);
        callback(_assertThisInitialized(_this), _this._context); // 自动调用一次渲染

        _this[render]();
      } else {
        throw new Error('无法找到 canvas ');
      }
    });
    return _this;
  }

  _createClass(Stage, [{
    key: "getContext",
    value:
    /**
     * 获取 canvas 上下文
     */
    function getContext() {
      return this._context;
    }
    /**
     * 重新渲染舞台
     */

  }, {
    key: "update",
    value: function update() {
      this[render]();
    }
  }, {
    key: render,
    value: function value() {
      this._context.clearRect(0, 0, this.width, this.height); // 调用 draw 方法绘制自身级子级


      this[draw](); // 调用 canvas draw 方法渲染图像

      this._context.draw(false);
    }
  }]);

  return Stage;
}(DisplayObject);

// 旋转 90 弧度 直接得出常数 (90 * Math.PI / 180) 免于实时计算
var ROTATE_90DEG = 1.5707963267948966; // 需要旋转的 Unicode 码范围, 如中、日、韩文字

var NO_ROTATION_RANGE = [[0x2E80, 0x2FEF], [0x3040, 0x9FFF], [0xAC00, 0xD7FF], [0xF900, 0xFAFF], [0x1D300, 0x1D35F], [0x20000, 0x2FA1F]];
function needRotation(_char) {
  var codePoint = _char.codePointAt(0);

  var _iterator = _createForOfIteratorHelper(NO_ROTATION_RANGE),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          lowerBound = _step$value[0],
          upperBound = _step$value[1];

      if (lowerBound <= codePoint && codePoint <= upperBound) {
        return false;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
}
/**
 *  文本绘制命令
 */

var FillText = /*#__PURE__*/function () {
  function FillText(text, x, y) {
    _classCallCheck(this, FillText);

    _defineProperty(this, "instance", null);

    this.text = text;
    this.x = x;
    this.y = y;
  }

  _createClass(FillText, [{
    key: "exec",
    value: function exec(ctx, instance) {
      this.instance = instance;

      var _instance$getPosition = instance.getPosition(),
          _instance$getPosition2 = _slicedToArray(_instance$getPosition, 2),
          x = _instance$getPosition2[0],
          y = _instance$getPosition2[1];

      ctx.font = instance.font;

      if (instance.writeMode === 'vertical-rl' || instance.writeMode === 'vertical-lr') {
        // 文字竖排从右向左
        this.vertical(ctx, x, y);
      } else if (instance.wrapWidth > -1) {
        // 如果设置了文本框宽度，则需要判断是否显示成多行
        var textArr = this.getTextArr(ctx, instance, this.text);
        var h = 0;

        for (var i = 0, l = textArr.length; i < l; i++) {
          h = y + i * (instance.fontSize + instance.lineGap);
          ctx.fillText(textArr[i], x, h);
        }
      } else {
        ctx.fillText(this.text, x, y);
      }
    }
    /**
     * getTextArr 多行时计算每行显示多少个字符
     */

  }, {
    key: "getTextArr",
    value: function getTextArr(ctx, instance, text) {
      var wrapWidth = instance.wrapWidth;
      var i = 0,
          j = 0,
          t = null,
          lineWidth = 0;
      var arr = [];

      while (t = text[i]) {
        // 根据每个单字计算字符宽度
        lineWidth += ctx.measureText(t).width;

        if (lineWidth <= wrapWidth) {
          arr[j] ? arr[j] += text[i] : arr[j] = text[i];
        } else {
          lineWidth = 0;
          j++;
        }

        i++;
      }

      return arr;
    } // 文本竖排

  }, {
    key: "vertical",
    value: function vertical(ctx, x, y) {
      var textArr = this.text.split('');
      var verticalLineWidth = this.instance.fontSize + this.instance.lineGap;
      var lineWidth = this.instance.writeMode === 'vertical-rl' ? -verticalLineWidth : verticalLineWidth;
      var fontSize = this.instance.fontSize;
      var fontSizeHalf = fontSize * .5;
      var offsetY = 0;
      var offsetX = 0;
      var wrapHeight = this.instance.wrapHeight;
      textArr.map(function (t) {
        if (needRotation(t)) {
          // 如果竖直文本大于限制高度，x 轴则向左或向右移一行
          if (wrapHeight > -1 && offsetY + y + fontSizeHalf > wrapHeight + y) {
            offsetX += lineWidth;
            offsetY = 0;
          }

          var left = x + offsetX + fontSizeHalf;
          var top = y + offsetY + fontSizeHalf;
          ctx.save();
          ctx.translate(left, top);
          ctx.rotate(ROTATE_90DEG);
          ctx.translate(-left, -top); // x 和 y 此处要和正常没旋转时的文本一样对待

          ctx.fillText(t, x + offsetX, y + offsetY);
          offsetY += fontSizeHalf;
          ctx.restore();
        } else {
          // 如果竖直文本大于限制高度，x 轴则向左移一行
          if (wrapHeight > -1 && offsetY + y + fontSize > wrapHeight + y) {
            offsetX += lineWidth;
            offsetY = 0;
          }

          ctx.fillText(t, x + offsetX, y + offsetY);
          offsetY += fontSize;
        }
      });
    }
  }]);

  return FillText;
}();

var SetFillStyle = /*#__PURE__*/function () {
  function SetFillStyle(style) {
    _classCallCheck(this, SetFillStyle);

    this.style = style;
  }

  _createClass(SetFillStyle, [{
    key: "exec",
    value: function exec(ctx) {
      ctx.fillStyle = this.style;
    }
  }]);

  return SetFillStyle;
}();

var SetTextAlign = /*#__PURE__*/function () {
  function SetTextAlign(textAlign) {
    _classCallCheck(this, SetTextAlign);

    this.textAlign = textAlign;
  }

  _createClass(SetTextAlign, [{
    key: "exec",
    value: function exec(ctx) {
      ctx.textAlign = this.textAlign;
    }
  }]);

  return SetTextAlign;
}();

var SetTextBaseline = /*#__PURE__*/function () {
  function SetTextBaseline(textBaseline) {
    _classCallCheck(this, SetTextBaseline);

    this.textBaseline = textBaseline;
  }

  _createClass(SetTextBaseline, [{
    key: "exec",
    value: function exec(ctx) {
      ctx.textBaseline = this.textBaseline;
    }
  }]);

  return SetTextBaseline;
}();

var _text = Symbol('_text');

var _width$1 = Symbol('_width');

var _height$1 = Symbol('_height');

var _fontSize = Symbol('_fontSize');

var _wrapWidth = Symbol('_wrapWidth');

var _wrapHeight = Symbol('_wrapHeight');

var _writeMode = Symbol('_writeMode');

var defaultFontSize = 10;
/**
 * Text 文本类
 * 显示文本，支持横、竖排文字，换行
 */

var Text = /*#__PURE__*/function (_DisplayObject) {
  _inherits(Text, _DisplayObject);

  var _super = _createSuper(Text);

  // 多行文本时的行距
  // 当前字体样式的属性。符合 CSS font 语法 的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif
  function Text(t) {
    var _thisSuper, _this;

    _classCallCheck(this, Text);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "name", 'Text');

    _defineProperty(_assertThisInitialized(_this), "lineGap", 0);

    _defineProperty(_assertThisInitialized(_this), "font", "".concat(defaultFontSize, "px sans-serif"));

    _this[drawGraphics] = _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(Text.prototype)), drawGraphics, _thisSuper);

    _this.init(t);

    return _this;
  }

  _createClass(Text, [{
    key: "init",
    value: function init() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var text = t.text,
          font = t.font,
          color = t.color,
          fontSize = t.fontSize;
      this[_writeMode] = '';

      if (font) {
        this.font = font;
        var _fontSize2 = font.match(/\d+/)[0];

        if (_fontSize2) {
          this.fontSize = parseInt(_fontSize2);
          this[_height$1] = this.fontSize + this.lineGap;
        }
      }

      if (fontSize) {
        this.font = "".concat(fontSize, "px sans-serif");
        this.fontSize = parseInt(fontSize);
        this[_height$1] = fontSize + this.lineGap;
      }

      if (!this.fontSize) {
        this.fontSize = defaultFontSize;
      }

      if (color) {
        this.color = color;
      }

      this.textAlign = 'left';
      this.textBaseline = 'top';
      this[_text] = ''; // console.log(text)
      // 初始化就设置文本

      if (text) {
        this.text = text;
      }
    }
  }, {
    key: "text",
    get: function get() {
      return this[_text];
    },
    set: function set(t) {
      t = String(t);
      this[_text] = t;
      this.width = this.measureWidth(t, this.fontSize);
      this.height = this.fontSize;
    }
  }, {
    key: "width",
    get: function get() {
      return this[_width$1];
    },
    set: function set(w) {
      this[_width$1] = w;
    }
  }, {
    key: "height",
    get: function get() {
      return this[_height$1];
    },
    set: function set(h) {
      this[_height$1] = h;
    }
    /**
     * 限制文本框高度
     * 超过设置的高度则文本换行
     */

  }, {
    key: "wrapHeight",
    get: function get() {
      return this[_wrapHeight];
    },
    set: function set(v) {
      this[_wrapHeight] = v;
      this[_height$1] = v;
      this.initVerticalSize();
    }
    /**
     * 限制文本框宽度
     * 超过设置的宽度则文本换行
     */

  }, {
    key: "wrapWidth",
    get: function get() {
      return this[_wrapWidth];
    },
    set: function set(v) {
      this[_wrapWidth] = v;
      this[_width$1] = v;
      this[_height$1] = this.getHeightByWrapWidth();
    }
    /**
     * 设置字体大小
     */

  }, {
    key: "fontSize",
    get: function get() {
      return this[_fontSize];
    },
    set: function set(v) {
      this[_fontSize] = v;
      this[_width$1] = this.measureWidth(this.text, v);
      this[_height$1] = v + this.lineGap;
    }
    /**
     * 文本横排与竖排模式
     */

  }, {
    key: "writeMode",
    get: function get() {
      return this[_writeMode];
    },
    set: function set(v) {
      this[_writeMode] = v;

      if (v.length > 0) {
        this.initVerticalSize();
      }
    }
    /**
     * 整理文本状态
     */

  }, {
    key: "collectStatus",
    value: function collectStatus() {
      if (this.fontSize) {
        this.font = "".concat(this.fontSize, "px sans-serif");
        this[_height$1] = this.fontSize + this.lineGap;
      }

      this.setTextAlign(this.textAlign);
      this.setTextBaseline(this.textBaseline);
      this.setFillStyle(this.color);
      this.fillText(this[_text]);
    } // 执行指令集

  }, {
    key: draw,
    value: function value(ctx) {
      this.collectStatus(); // 优先执行 graphics 指令

      this[drawGraphics](ctx);

      if (this.mask && this.mask.name === 'Shape') {
        this.mask.masked = this;
        this.mask[draw](ctx, true);
      }
    }
    /**
     * setFillStyle 设置文本颜色
     * @param {String} color [description]
     */

  }, {
    key: "setFillStyle",
    value: function setFillStyle() {
      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'black';
      this.color = color;
      this[append](new SetFillStyle(color));
      return this;
    }
  }, {
    key: "fillStyle",
    value: function fillStyle(color) {
      return this.setFillStyle(color);
    }
    /**
     * fillText 绘制文本
     * @param  {String} text 
     * @param  {Number} x    
     * @param  {Number} y    
     */

  }, {
    key: "fillText",
    value: function fillText(text) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      this[_text] = text;
      this.x += x;
      this.y += y;
      this.width = this.measureWidth(this[_text], this.fontSize); // !! 注意 fillText 方法不能放在 setTimeout 或 setInterval 内
      // !! 因为会错过画布更新

      this[append](new FillText(text, this.x, this.y));
      return this;
    }
    /**
     * setFont 设置字体样式
     * @param { String } font 填单独某一项无效，必须填字号与字体family
     * eg1: 'italic 12px sans-serif'
     * eg2: '12px sans-serif'
     */

  }, {
    key: "setFont",
    value: function setFont(font) {
      this.font = font;
      return this;
    }
    /**
     * setFontSize 设置字体大小
     * @param {Number} size 不带单位，全部按 px 算
     */

  }, {
    key: "setFontSize",
    value: function setFontSize(size) {
      this.fontSize = size;
      this.font = this.font.replace(/\d+/, size);
      return this;
    }
    /**
     * setTextBaseline 设置文字垂直对齐方式，推荐 top 顶部对齐比较好算
     * @param { String } textBaseline top	顶部对齐	 bottom	底部对齐	middle	居中对齐	normal 默认（基线对齐）
     */

  }, {
    key: "setTextBaseline",
    value: function setTextBaseline(textBaseline) {
      this.textBaseline = textBaseline;
      this[append](new SetTextBaseline(textBaseline));
      return this;
    }
    /**
     * [setTextAlign 设置文本水平对齐方式]
     * @param { String } textAlign [left, center, right]
     */

  }, {
    key: "setTextAlign",
    value: function setTextAlign(textAlign) {
      this.textAlign = textAlign;
      this[append](new SetTextAlign(textAlign));
      return this;
    }
    /**
     * setlineGap 设置多文本时文本行垂直间距
     * @param { Number } h 相比使用行距，直接使用间距设置比较方便计算
     */

  }, {
    key: "setlineGap",
    value: function setlineGap(h) {
      this.lineGap = h;
      return this;
    }
    /**
     * 设置文本框宽度
     * @param {*} w 
     */

  }, {
    key: "setWrapWidth",
    value: function setWrapWidth(w) {
      this.wrapWidth = w;
      this.width = w;
      return this;
    }
    /**
     * 设置文本框高度
     * @param {*} h 
     */

  }, {
    key: "setWrapHeight",
    value: function setWrapHeight(h) {
      this.wrapHeight = h;
      return this;
    }
    /**
     * 计算文本宽度
     * @param {*} text 
     * @param {*} fontSize 
     */

  }, {
    key: "measureWidth",
    value: function measureWidth(text, fontSize) {
      var w;

      if (this.writeMode.length) {
        w = fontSize;
      } else {
        var ctx = DisplayObject.getContext();
        w = ctx.measureText(text).width * (fontSize / defaultFontSize);
      }

      return w;
    } // 初始化竖排文本时的整体宽与高属性

  }, {
    key: "initVerticalSize",
    value: function initVerticalSize() {
      if (this.text.length) {
        var _this$getVerticalSize = this.getVerticalSize(),
            width = _this$getVerticalSize.width,
            height = _this$getVerticalSize.height;

        this[_width$1] = width;
        this[_height$1] = height;
      }
    } // 计算竖排文本时的整体文本宽,高

  }, {
    key: "getVerticalSize",
    value: function getVerticalSize() {
      var fontSize = this.fontSize;
      var lineGap = this.lineGap;
      var wrapHeight = this.wrapHeight;
      var halfFont = fontSize * .5;
      var h = 0;
      var height = 0;
      var width = 0;
      var offset = 0; // 二维数组存放每个字文本与文本高度信息

      var arr = []; // 二维数组游标，可代表当前指向哪一行

      var arrIndex = 0; // 计算每个字高度

      this.text.split('').map(function (v) {
        var charHeight = 0;

        if (needRotation(v)) {
          charHeight = halfFont + lineGap;
        } else {
          charHeight = fontSize + lineGap;
        }

        h += charHeight;
        offset += charHeight;

        if (offset > wrapHeight) {
          arrIndex++;
          offset = 0;
        }

        arr[arrIndex] = arr[arrIndex] || [];
        arr[arrIndex].push({
          text: v,
          height: charHeight
        });
      });

      if (wrapHeight) {
        height = wrapHeight;
        width = arr.length * fontSize + (arr.length * lineGap - lineGap);
      } else {
        width = fontSize;
        height = h;
      } // 可优化点，此处计算出的文本单字可以直接用于 fillText 类内


      return {
        width: width,
        height: height
      };
    } // 获取受限宽度下的文本整体高度，因为有可能会换行

  }, {
    key: "getHeightByWrapWidth",
    value: function getHeightByWrapWidth() {
      var ctx = DisplayObject.getContext();
      var wrapWidth = this.wrapWidth;
      var fontSize = this.fontSize;
      var text = this.text;
      var i = 0,
          j = 0,
          t = null,
          lineWidth = 0;
      var arr = [];

      while (t = text[i]) {
        // 根据每个单字计算字符宽度
        lineWidth += ctx.measureText(t).width * (fontSize / defaultFontSize);

        if (lineWidth <= wrapWidth) {
          arr[j] ? arr[j] += text[i] : arr[j] = text[i];
        } else {
          lineWidth = 0;
          j++;
        }

        i++;
      } // todo: 可优化点，此处计算出的文本单字可以直接用于 fillText 类内
      // 高度 = 文本行数 * 字体大小 + 行间距


      return this.height = arr.length * fontSize + (arr.length * this.lineGap - this.lineGap);
    }
  }, {
    key: "addChild",
    value: function addChild() {
      throw new Error('不能给 Text 类添加子元素');
    }
  }]);

  return Text;
}(DisplayObject);

var Shape = /*#__PURE__*/function (_DisplayObject) {
  _inherits(Shape, _DisplayObject);

  var _super = _createSuper(Shape);

  function Shape() {
    var _thisSuper, _this;

    _classCallCheck(this, Shape);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "name", 'Shape');

    _defineProperty(_assertThisInitialized(_this), "isMask", false);

    _defineProperty(_assertThisInitialized(_this), "width", 0);

    _defineProperty(_assertThisInitialized(_this), "height", 0);

    _this[drawGraphics] = _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(Shape.prototype)), drawGraphics, _thisSuper); // 新建一个shape对象时先执行beginPath命令，以重新开始 path 上下文

    _this.graphics.beginPath();

    return _this;
  }

  _createClass(Shape, [{
    key: draw,
    value: function value(ctx, isMask) {
      // shape 是否为遮罩
      this.isMask = !!isMask; // 设置透明度

      ctx.globalAlpha = this[getAlpha](); // 执行所有命令

      this[drawGraphics](ctx);
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      console.error('Shape 不提供getBounds方法');
      return null;
    }
  }]);

  return Shape;
}(DisplayObject);

var extendsClassDraw$2 = Symbol('extendsClassDraw');
/**
 * 解构圆角矩形值生成:  { tl: 0, tr: 0, br: 0, bl: 0 }
 * @param {*} value 
 */

function getChangedBorderRadiusValue(value) {
  var borderRadiusValue;
  var roundCorner = {
    tl: 0,
    tr: 0,
    br: 0,
    bl: 0
  };
  value = String(value).split(' ').map(function (v) {
    return parseFloat(v);
  });
  var valueLength = value.length;

  if (valueLength === 1) {
    borderRadiusValue = value[0];
  } else if (valueLength === 2) {
    roundCorner.tl = roundCorner.br = value[0];
    roundCorner.tr = roundCorner.bl = value[1];
    borderRadiusValue = roundCorner;
  } else if (valueLength === 3) {
    roundCorner.tl = value[0];
    roundCorner.br = value[2];
    roundCorner.tr = roundCorner.bl = value[1];
    borderRadiusValue = roundCorner;
  } else if (valueLength === 4) {
    roundCorner.tl = value[0];
    roundCorner.tr = value[1];
    roundCorner.br = value[2];
    roundCorner.bl = value[3];
    borderRadiusValue = roundCorner;
  }

  return borderRadiusValue;
} // 仅支持二种风格的边框


var BORDER_STYLES = ['solid', 'dashed'];
/**
 * SimpleCss 
 * 样式类
 */

var SimpleCss = /*#__PURE__*/function (_DisplayObject) {
  _inherits(SimpleCss, _DisplayObject);

  var _super = _createSuper(SimpleCss);

  function SimpleCss() {
    var _thisSuper, _this;

    _classCallCheck(this, SimpleCss);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "backgroundColor", '');

    _defineProperty(_assertThisInitialized(_this), "border", '');

    _defineProperty(_assertThisInitialized(_this), "borderTop", '');

    _defineProperty(_assertThisInitialized(_this), "borderRight", '');

    _defineProperty(_assertThisInitialized(_this), "borderBottom", '');

    _defineProperty(_assertThisInitialized(_this), "borderLeft", '');

    _defineProperty(_assertThisInitialized(_this), "borderLeftRound", false);

    _defineProperty(_assertThisInitialized(_this), "borderRightRound", false);

    _defineProperty(_assertThisInitialized(_this), "borderRadiusValue", '');

    _this[extendsClassDraw$2] = _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(SimpleCss.prototype)), draw, _thisSuper);
    return _this;
  }
  /**
   * 绘制接口
   * @param {*} ctx 
   */


  _createClass(SimpleCss, [{
    key: "borderRadius",
    get:
    /**
     * 左边显示成半圆
     */

    /**
     * 右边显示成半圆
     */

    /**
     * 1、borderRadius 值设置请参与 css3 的 border-radius 属性;
     * eg1: 10
     * eg2: '10 20'
     * eg3: '10 20 10'
     * eg4: '10, 20, 30, 40'
     * 
     * 2、borderRadius设置为 '100%'，则认为是圆形遮罩
     * eg: '100%'
     */
    function get() {
      return this.borderRadiusValue;
    },
    set: function set(value) {
      if (!value) return;

      if (value != '100%') {
        this.borderRadiusValue = getChangedBorderRadiusValue(value);
      } else {
        this.borderRadiusValue = value;
      }
    }
  }, {
    key: draw,
    value: function value(ctx) {
      // 如果设置了 borderRadius 值则需要使用遮罩实现圆角
      if (this.borderRadiusValue || this.borderLeftRound || this.borderRightRound) {
        this.initBorderRadiusMask();
      } // 绘制背景


      if (this.backgroundColor) {
        this.initBackgroundColor();
      } // 绘制边框


      if (this.border || this.borderTop || this.borderRight || this.borderBottom || this.borderLeft) {
        this.initBorder();
      } // 遮罩，主要用于显示圆角及圆


      if (this.mask) {
        if (this.mask.name === 'Shape') {
          // 遮罩层不参与显示所以也没有父级元素
          this.mask.masked = this;
          this.mask[draw](ctx, true);
        }
      } // 重载 DisplayObject draw 
      // 调用 显示对象绘制方法


      this[extendsClassDraw$2](ctx);
    }
    /**
     * 解构边框线值字符串
     * @param {*} border 
     */

  }, {
    key: "getBorderAttr",
    value: function getBorderAttr(border) {
      var _border$split = border.split(' '),
          _border$split2 = _slicedToArray(_border$split, 3),
          borderWidth = _border$split2[0],
          borderStyle = _border$split2[1],
          borderColor = _border$split2[2];

      borderWidth = parseFloat(borderWidth);

      if (BORDER_STYLES.indexOf(borderStyle) < 0) {
        console.warn('不支持的边框样式');
      }

      return [borderWidth, borderStyle, borderColor];
    }
    /**
     * 设置边框样宽，样式，颜色
     * @param {*} borderWidth 
     * @param {*} borderStyle 
     * @param {*} borderColor 
     */

  }, {
    key: "setBorderStyles",
    value: function setBorderStyles(borderWidth, borderStyle, borderColor) {
      this.graphics.beginPath();

      if (borderStyle === 'dashed') {
        this.graphics.setLineDash([borderWidth, borderWidth]);
      } // 边框都是向内画


      this.graphics.lineWidth(borderWidth).strokeStyle(borderColor);
    }
    /**
     * 生成水平半圆角矩形路径
     * 当 borderRadius 值超过元素高度 height 时，表示左右显示成半圆
     * @param {*} width 
     * @param {*} height 
     */

  }, {
    key: "getHorizontalRoundRectPath",
    value: function getHorizontalRoundRectPath(width, height) {
      var s = new Shape();
      var radius = height * .5;
      s.graphics.beginPath().fillStyle('#ff00ff').arc(radius, radius, radius, Math.PI * .5, Math.PI * 1.5).lineTo(width - radius, 0).arc(width - radius, radius, radius, Math.PI * 1.5, Math.PI * 2.5).lineTo(radius, height);
      return s;
    }
  }, {
    key: "getLeftRoundRectPath",
    value: function getLeftRoundRectPath(width, height) {
      var s = new Shape();
      var radius = height * .5;
      s.graphics.beginPath() // .fillStyle('#ff00ff')
      .arc(radius, radius, radius, Math.PI * .5, Math.PI * 1.5).lineTo(width, 0).lineTo(width, height).lineTo(radius, height);
      return s;
    }
  }, {
    key: "getRightRoundRectPath",
    value: function getRightRoundRectPath(width, height) {
      var s = new Shape();
      var radius = height * .5;
      s.graphics.beginPath() // .fillStyle('#ff00ff')
      .moveTo(0, 0).lineTo(width - radius, 0).arc(width - radius, radius, radius, Math.PI * 1.5, Math.PI * 2.5).lineTo(0, height);
      return s;
    }
    /**
     * 生成垂直半圆角矩形路径
     * 当 borderRadius 值超过元素宽度 width 时，表示上高显示成半圆
     * @param {*} width 
     * @param {*} height 
     */

  }, {
    key: "getVerticalRoundRectPath",
    value: function getVerticalRoundRectPath(width, height) {
      var s = new Shape();
      var radius = width * .5;
      s.graphics.beginPath().arc(radius, radius, radius, Math.PI, Math.PI * 2).lineTo(width, height - radius).arc(radius, height - radius, radius, 0, Math.PI).lineTo(0, radius);
      return s;
    }
    /**
     * 初始化边框线
     */

  }, {
    key: "initBorder",
    value: function initBorder() {
      // 四边都有边框
      if (this.border) {
        var _this$getBorderAttr = this.getBorderAttr(this.border),
            _this$getBorderAttr2 = _slicedToArray(_this$getBorderAttr, 3),
            borderWidth = _this$getBorderAttr2[0],
            borderStyle = _this$getBorderAttr2[1],
            borderColor = _this$getBorderAttr2[2];

        this.setBorderStyles(borderWidth, borderStyle, borderColor);
        var halfBorderWidth = borderWidth * .5; // 如果有圆角属性，则需要画圆角边框

        if (this.borderRadius) {
          var s; // 值为100%或值等于宽高值，且宽高相等时 表示显示想要显示成圆形

          if ((this.borderRadius === '100%' || this.borderRadius === this.width) && this.width === this.height) {
            s = new Shape();
            var radius = this.width * .5;
            s.graphics.strokeCircle(radius, radius, radius);
          } else if (this.borderRadius >= this.height) {
            // 提交简易方法生成左右两边半圆角路径
            s = this.getHorizontalRoundRectPath(this.width, this.height);
            s.graphics.stroke();
          } else if (this.borderRadius >= this.width) {
            // 提交简易方法生成上下两边半圆角路径
            s = this.getVerticalRoundRectPath(this.width, this.height);
            s.graphics.stroke();
          } else {
            s = new Shape();
            s.graphics.strokeRoundRect(0, 0, this.width, this.height, this.borderRadius);
          }

          this.addChild(s);
        } else {
          this.graphics.strokeRect(halfBorderWidth, halfBorderWidth, this.width - borderWidth, this.height - borderWidth);
        }
      } else {
        // 单独单边设置
        if (this.borderTop) {
          this.setBorderStyles.apply(this, _toConsumableArray(this.getBorderAttr(this.borderTop)));
          this.graphics.moveTo(0, 0).lineTo(this.width, 0).stroke();
        }

        if (this.borderRight) {
          this.setBorderStyles.apply(this, _toConsumableArray(this.getBorderAttr(this.borderRight))); // 如果是右边半圆，则线也要显示成半圆

          if (this.borderRightRound) {
            var _radius = this.height * .5;

            this.graphics.arc(this.width - _radius, _radius, _radius, Math.PI * 1.5, Math.PI * 2.5);
          } else {
            this.graphics.moveTo(this.width, 0).lineTo(this.width, this.height);
          }

          this.graphics.stroke();
        }

        if (this.borderBottom) {
          this.setBorderStyles.apply(this, _toConsumableArray(this.getBorderAttr(this.borderBottom)));
          this.graphics.moveTo(0, this.height).lineTo(this.width, this.height).stroke();
        }

        if (this.borderLeft) {
          this.setBorderStyles.apply(this, _toConsumableArray(this.getBorderAttr(this.borderLeft))); // 如果是左边半圆，则线也要显示成半圆

          if (this.borderLeftRound) {
            var _radius2 = this.height * .5;

            this.graphics.arc(_radius2, _radius2, _radius2, Math.PI * .5, Math.PI * 1.5);
          } else {
            this.graphics.moveTo(0, 0).lineTo(0, this.height);
          }

          this.graphics.stroke();
        }
      }
    }
    /**
     * 初始化圆角
     * 为图像元素添加遮罩以实现 borderRadius 圆角
    */

  }, {
    key: "initBorderRadiusMask",
    value: function initBorderRadiusMask() {
      var s; // 正圆形

      if ((this.borderRadiusValue === '100%' || this.borderRadiusValue === this.width) && this.width === this.height) {
        var radius = this.width * .5;
        s = new Shape();
        s.graphics.fillCircle(radius, radius, radius);
      } else if (this.borderRadiusValue >= this.height || this.borderRightRadius && this.borderLeftRadius) {
        // 两边半圆
        s = this.getHorizontalRoundRectPath(this.width, this.height);
        s.graphics.clip().fill();
      } else if (this.borderRadiusValue >= this.width) {
        // 上下半圆
        s = this.getVerticalRoundRectPath(this.width, this.height);
        s.graphics.clip().fill();
      } else if (this.borderLeftRound) {
        s = this.getLeftRoundRectPath(this.width, this.height);
        s.graphics.clip().fill();
      } else if (this.borderRightRound) {
        s = this.getRightRoundRectPath(this.width, this.height);
        s.graphics.clip().fill();
      } else {
        console.log(this.borderRadiusValue, 333);
        s = new Shape();
        s.graphics.fillRoundRect(0, 0, this.width, this.height, this.borderRadiusValue);
      }

      this.mask = s;
    }
    /**
     * 初始化背景颜色
     */

  }, {
    key: "initBackgroundColor",
    value: function initBackgroundColor() {
      this.graphics.beginPath().fillStyle(this.backgroundColor).fillRect(0, 0, this.width, this.height);
    }
  }]);

  return SimpleCss;
}(DisplayObject);

var extendsClassDraw$1 = Symbol('extendsClassDraw');
/**
 * Image 图片显示类
 * 继承自SimpleCss类，支持 borderRadius、border
 */

var Image = /*#__PURE__*/function (_SimpleCss) {
  _inherits(Image, _SimpleCss);

  var _super = _createSuper(Image);

  function Image(args) {
    var _thisSuper, _this;

    _classCallCheck(this, Image);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "name", 'Image');

    _defineProperty(_assertThisInitialized(_this), "image", null);

    _defineProperty(_assertThisInitialized(_this), "path", '');

    _defineProperty(_assertThisInitialized(_this), "sx", undefined);

    _defineProperty(_assertThisInitialized(_this), "sy", undefined);

    _defineProperty(_assertThisInitialized(_this), "sWidth", undefined);

    _defineProperty(_assertThisInitialized(_this), "sHeight", undefined);

    _defineProperty(_assertThisInitialized(_this), "dx", 0);

    _defineProperty(_assertThisInitialized(_this), "dy", 0);

    _defineProperty(_assertThisInitialized(_this), "dWidth", undefined);

    _defineProperty(_assertThisInitialized(_this), "dHeight", undefined);

    _this[extendsClassDraw$1] = _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(Image.prototype)), draw, _thisSuper);

    for (var v in args) {
      _this[v] = args[v];
    } // 图片地址路径 远程/本地


    _this.path = _this.image.path; // 如果设置了 width 则认 width 参数作为渲染宽度， 否则就将 dWidth 参数作为渲染宽度

    if (!_this.width) {
      _this.width = _this.dWidth;
    } else {
      _this.dWidth = _this.width;
    } // 如果设置了 height 则认 height 参数作为渲染宽度， 否则就将 dWidth 参数作为渲染宽度


    if (!_this.height) {
      _this.height = _this.dHeight;
    } else {
      _this.dHeight = _this.height;
    }

    return _this;
  }

  _createClass(Image, [{
    key: drawImage$1,
    value: function value(ctx, x, y) {
      /**
       * !! 注意参数变化,可省略的原始图像位置尺寸信息是排在前面的
       * drawImage(img, dx, dy);
       * drawImage(img, dx, dy, dWidth, dHeight);
       * drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
       */
      ctx.globalAlpha = this[getAlpha]();

      if (this.sx != undefined) {
        // 如果传了原始图起点，则说明要填完整所有参数
        ctx.drawImage(this.path, this.sx, this.sy, this.sWidth, this.sHeight, x, y, this.dWidth, this.dHeight);
      } else if (this.dWidth != undefined) {
        // 如果传了绘制目标宽，则认为不管原图，只管绘制目标位置与宽高
        ctx.drawImage(this.path, x, y, this.dWidth, this.dHeight);
      } else {
        // 只管绘制目标位置，会绘制原始图大小
        ctx.drawImage(this.path, x, y);
      }
    }
  }, {
    key: draw,
    value: function value(ctx) {
      var _this$getPosition = this.getPosition(),
          _this$getPosition2 = _slicedToArray(_this$getPosition, 2),
          x = _this$getPosition2[0],
          y = _this$getPosition2[1];

      x = this.dx + x;
      y = this.dy + y; // 调用 extends class 的 draw 方法，因为有可能需要设置样式

      this[extendsClassDraw$1](ctx); // 绘制图片

      this[drawImage$1](ctx, x, y); // 此处的子元素一般只用于样式绘制，不推荐添加其它类型的子元素

      this.childs.forEach(function (v) {
        v[draw](ctx);
      });
    }
  }]);

  return Image;
}(SimpleCss);

var drawImage = Symbol('drawImage');
var drawSliced = Symbol('drawSliced');
var left = Symbol('left');
var top = Symbol('top');
var right = Symbol('right');
var bottom = Symbol('bottom');
var setSlice = Symbol('setSlice');

var _sliceBounds = Symbol('_sliceBounds');
/**
 * Sprite 雪碧类
 * 用于显示九宫格类型的图片
 */

var Sprite = /*#__PURE__*/function (_Group) {
  _inherits(Sprite, _Group);

  var _super = _createSuper(Sprite);

  /**
   * 
   * @param {*} img Image 对象
   * @param {*} sliceBound 九宫格图 {left: 0, top: 0, right: 0, bottom: 0}
   */
  function Sprite(img, sliceBound) {
    var _thisSuper, _this;

    _classCallCheck(this, Sprite);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "name", 'Sprite');

    _defineProperty(_assertThisInitialized(_this), "img", null);

    _defineProperty(_assertThisInitialized(_this), "sliced", false);

    if (img) {
      _this.img = img;
    }

    _this.parentDraw = _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(Sprite.prototype)), draw, _thisSuper);

    if (sliceBound) {
      _this[setSlice](sliceBound);
    }

    return _this;
  } // get rotation(){
  // 	return this[rotation]
  // }
  // set rotation(r){
  // 	if(this.sliced){
  // 		throw new Error('Sprite 因为旋转后会出现拼接缝隙，在九宫格状态下暂时无法旋转, 待小程序完全支持离屏渲染后修复')
  // 	}else{
  // 		this[rotation] = r
  // 	}
  // }


  _createClass(Sprite, [{
    key: "sliceBounds",
    get: function get() {
      return this[_sliceBounds];
    },
    set: function set(bounds) {
      // const { left, top, right, bottom } = bounds
      this._setSlice(bounds);

      this[_sliceBounds] = bounds;
    }
  }, {
    key: draw,
    value: function value(ctx) {
      var _this2 = this;

      var _this$getPosition = this.getPosition(),
          _this$getPosition2 = _slicedToArray(_this$getPosition, 2),
          x = _this$getPosition2[0],
          y = _this$getPosition2[1];

      this.wRatio = this.width / this.img.width;
      this.hRatio = this.height / this.img.height; // 伸缩后的宽、高

      this.enableWidth = (this.width - this[left] - this[right]) * this.scaleX;
      this.enableHeight = (this.height - this[top] - this[bottom]) * this.scaleY; // 执行所有命令

      this[instructions].forEach(function (instruction) {
        instruction.exec(ctx, _this2);
      });

      if (this.sliced) {
        // sprite 九宫格不允许使用 boxShadow
        this[drawSliced](ctx, x, y, this[getAlpha]());
      } else {
        this[drawImage](ctx, x, y);
      } // 绘制子元素


      this.childs.forEach(function (v) {
        v[draw](ctx);
      });
    }
  }, {
    key: drawImage,
    value: function value(ctx, x, y) {
      var img = new Image({
        image: this.img,
        dx: x,
        dy: y,
        dWidth: this.width,
        dHeight: this.height
      });
      img[draw](ctx);
    } // 绘制九宫格图像

  }, {
    key: drawSliced,
    value: function value(ctx, x, y, alpha) {
      // 计算九宫格每块位置信息
      // 上左
      var ltParams = {
        image: this.img,
        sx: 0,
        sy: 0,
        sWidth: this[left],
        sHeight: this[top],
        dWidth: this[left] * this.scaleX,
        dHeight: this[top] * this.scaleY,
        dx: x,
        dy: y
      }; // 上中

      var tParams = {
        image: this.img,
        sx: this[left],
        sy: 0,
        sWidth: this.img.width - this[right] - this[left],
        sHeight: this[top],
        dWidth: this.enableWidth,
        dHeight: this[top] * this.scaleY,
        dx: this[left] * this.scaleX + x,
        dy: y
      }; // 上右

      var rtParams = {
        image: this.img,
        sx: this.img.width - this[right],
        sy: 0,
        sWidth: this[right],
        sHeight: this[top],
        dWidth: this[right] * this.scaleX,
        dHeight: this[top] * this.scaleY,
        dx: this[left] * this.scaleX + tParams.dWidth + x,
        dy: y
      }; // 右中

      var rParams = {
        image: this.img,
        sx: this.img.width - this[right],
        sy: this[top],
        sWidth: this[right],
        sHeight: this.img.height - this[bottom] - this[top],
        dWidth: this[right] * this.scaleX,
        dHeight: this.enableHeight,
        dx: rtParams.dx,
        dy: rtParams.dy + this[top] * this.scaleY
      }; // 右下

      var rbParams = {
        image: this.img,
        sx: this.img.width - this[right],
        sy: this.img.height - this[bottom],
        sWidth: this[right],
        sHeight: this[bottom],
        dWidth: this[right] * this.scaleX,
        dHeight: this[bottom] * this.scaleY,
        dx: rtParams.dx - .3,
        dy: rParams.dy + rParams.dHeight
      }; // 下中

      var bParams = {
        image: this.img,
        sx: this[left],
        sy: this.img.height - this[bottom],
        sWidth: this.img.width - this[left] - this[right],
        sHeight: this[bottom],
        dWidth: this.enableWidth,
        dHeight: this[bottom] * this.scaleY,
        dx: tParams.dx,
        dy: rParams.dy + rParams.dHeight
      }; // 左下

      var lbParams = {
        image: this.img,
        sx: 0,
        sy: this.img.height - this[bottom],
        sWidth: this[left],
        sHeight: this[bottom],
        dWidth: this[left] * this.scaleX,
        dHeight: this[bottom] * this.scaleX,
        dx: ltParams.dx,
        dy: rParams.dy + rParams.dHeight
      }; // 左中

      var lParams = {
        image: this.img,
        sx: 0,
        sy: this[top],
        sWidth: this[left],
        sHeight: this.img.height - this[top] - this[bottom],
        dWidth: this[left] * this.scaleX,
        dHeight: this.enableHeight,
        dx: ltParams.dx,
        dy: rParams.dy
      }; // 中间 

      var cParams = {
        image: this.img,
        sx: ltParams.sWidth,
        sy: ltParams.sHeight,
        sWidth: tParams.sWidth,
        sHeight: lParams.sHeight,
        dWidth: this.enableWidth,
        dHeight: this.enableHeight,
        dx: ltParams.dx + ltParams.dWidth,
        dy: ltParams.dy + ltParams.dHeight
      };
      var peices = [ltParams, tParams, rtParams, rParams, rbParams, bParams, lbParams, lParams, cParams]; // 用离屏渲染成整张图再绘制到主canvas中解决接触缝隙问题以及性能问题
      // const offScreen = wx.createOffscreenCanvas(375, 375)
      // var offScreenCtx = offScreen.getContext("2d")		

      if (this.rotation != 0) {
        console.error('Sprite 因为旋转后会出现拼接缝隙，在九宫格状态下暂时无法旋转, 待小程序完全支持离屏渲染后修复');
      }

      peices.forEach(function (v) {
        var i = new Image(v);
        i.alpha = alpha;
        i[draw](ctx);
      });
      return this;
    }
    /**
     * 供内部调用的九宫格边界
     * @param {*} sliceBound: {left: 0, top: 0, right: 0, bottom: 0}
     */

  }, {
    key: "_setSlice",
    value: function _setSlice(sliceBound) {
      this.sliced = true;
      this[left] = sliceBound.left;
      this[top] = sliceBound.top;
      this[right] = sliceBound.right;
      this[bottom] = sliceBound.bottom;
      return this;
    }
    /**
     * 九宫格边界
     * @param {*} sliceBound: {left: 0, top: 0, right: 0, bottom: 0}
     */

  }, {
    key: "setSlice",
    value: function setSlice(sliceBound) {
      return this._setSlice(sliceBound);
    }
  }]);

  return Sprite;
}(Group);

var _width = Symbol('width');

var _height = Symbol('height');

var _alignItems = Symbol('_alignItems');

var _justifyContent = Symbol('_justifyContent');

var _direction = Symbol('_direction');

var _flex = Symbol('_flex');

var extendsClassDraw = Symbol('extendsClassDraw');
/**
 * Container 
 * 拥有 Flex 布局功能的容器，可往容器内添加子元素
 * flex 相关实例属性
 * direction 子元素排列方向，可使用的值: [row, row-reverse, column, column-reverse]
 * jusifyContent 子元素水平对齐方式，可使用的值: [flex-start, center, flex-end, space-between, space-around]
 * alignItems 子元素垂直对齐方式，可使用的值: [flex-start, center, flex-end]
 * 
 * *注意*
 * Container 需要主动设置 width、height，默认为都为 0
 */

var Container = /*#__PURE__*/function (_SimpleCss) {
  _inherits(Container, _SimpleCss);

  var _super = _createSuper(Container);

  function Container(context) {
    var _thisSuper, _this;

    _classCallCheck(this, Container);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "name", 'Container');

    _this[extendsClassDraw] = _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(Container.prototype)), draw, _thisSuper);
    _this.direction = 'row';
    _this.justifyContent = 'center';
    _this.alignItems = 'center';
    return _this;
  }

  _createClass(Container, [{
    key: "width",
    get: function get() {
      return this[_width];
    },
    set: function set(v) {
      this[_width] = v;
    }
  }, {
    key: "height",
    get: function get() {
      return this[_height];
    },
    set: function set(v) {
      this[_height] = v;
    }
  }, {
    key: "flex",
    get: function get() {
      return this[_flex];
    },
    set: function set(v) {
      this[_flex] = v;
    } // 排列方向

  }, {
    key: "direction",
    get: function get() {
      return this[_direction];
    },
    set: function set(v) {
      this[_direction] = v;
    } // 垂直对齐

  }, {
    key: "alignItems",
    get: function get() {
      return this[_alignItems];
    },
    set: function set(v) {
      this[_alignItems] = v;
    } // 水平对齐

  }, {
    key: "justifyContent",
    get: function get() {
      return this[_justifyContent];
    },
    set: function set(v) {
      this[_justifyContent] = v;
    }
    /**
     * 获取所有子元素宽度
     */

  }, {
    key: "getChildsWidth",
    value: function getChildsWidth() {
      var childsWidth = 0;
      this.childs.forEach(function (v) {
        return childsWidth += v.width;
      });
      return childsWidth;
    }
    /**
     * 获取所有子元素高度
     */

  }, {
    key: "getChildsHeight",
    value: function getChildsHeight() {
      var childsHeight = 0;
      this.childs.forEach(function (v) {
        return childsHeight += v.height;
      });
      return childsHeight;
    }
    /**
     * 获取所有子元素在 between 模式下间隙宽度
     */

  }, {
    key: "getBetweenGapWidth",
    value: function getBetweenGapWidth(parentWidth) {
      var childsWidth = this.getChildsWidth();
      return (parentWidth - childsWidth) / (this.childs.length - 1);
    }
    /**
     * 获取所有子元素在 between 模式下间隙高度
     */

  }, {
    key: "getBetweenGapHeight",
    value: function getBetweenGapHeight(parentHeight) {
      var childsHeight = this.getChildsHeight();
      return (parentHeight - childsHeight) / (this.childs.length - 1);
    }
    /**
     * 获取所有子元素在 around 模式下间隙宽度
     */

  }, {
    key: "getAroundGapWidth",
    value: function getAroundGapWidth(parentWidth) {
      var childsWidth = this.getChildsWidth();
      return (parentWidth - childsWidth) / this.childs.length;
    }
    /**
     * 获取所有子元素在 around 模式下间隙高度
     */

  }, {
    key: "getAroundGapHeight",
    value: function getAroundGapHeight(parentHeight) {
      var childsHeight = this.getChildsHeight();
      return (parentHeight - childsHeight) / this.childs.length;
    }
    /**
     * row 样式
     */

  }, {
    key: "setRow",
    value: function setRow() {
      this.setJustifyContent();
      this.setAlignItems();
    }
    /**
     * row 样式翻转
     */

  }, {
    key: "setRowReverse",
    value: function setRowReverse() {
      // 
      this.setJustifyContent(true);
      this.setAlignItems();
    }
    /**
     * 垂直对齐
     */

  }, {
    key: "setAlignItems",
    value: function setAlignItems() {
      var childs = this.childs;
      var parentHeight = this.height;

      if (this.alignItems === 'center') {
        for (var index = 0, l = childs.length; index < l; index++) {
          var child = childs[index];
          child.y += parentHeight * .5 - child.height * .5;
        }
      } else if (this.alignItems === 'flex-start') {
        for (var _index = 0, _l = childs.length; _index < _l; _index++) {
          var _child = childs[_index];
          _child.y = 0;
        }
      } else if (this.alignItems === 'flex-end') {
        for (var _index2 = 0, _l2 = childs.length; _index2 < _l2; _index2++) {
          var _child2 = childs[_index2];
          _child2.y += parentHeight - _child2.height;
        }
      } // align-self


      childs.forEach(function (v) {
        if (v.alignSelf === 'flex-start') {
          v.y = 0;
        } else if (v.alignSelf === 'center') {
          v.y = parentHeight * .5 - v.height * .5;
        } else if (v.alignSelf === 'flex-end') {
          v.y = parentHeight - v.height;
        }
      });
    }
    /**
     * 水平对齐
     */

  }, {
    key: "setJustifyContent",
    value: function setJustifyContent(isReverse) {
      var parentWidth = this.width;
      var childs = this.childs;
      var justifyContent = this.justifyContent;

      if (isReverse) {
        childs = this.childs.reverse();

        if (justifyContent === 'flex-start') {
          justifyContent = 'flex-end';
        } else if (justifyContent === 'flex-end') {
          justifyContent = 'flex-start';
        }
      }

      if (justifyContent === 'flex-start') {
        for (var index = 0; index < childs.length; index++) {
          var child = childs[index];

          if (index > 0) {
            child.x += childs[index - 1].x + childs[index - 1].width;
          } else {
            child.x = 0;
          }
        }
      } else if (justifyContent === 'flex-end') {
        var childsWidth = this.getChildsWidth();

        for (var _index3 = 0; _index3 < childs.length; _index3++) {
          var _child3 = childs[_index3];

          if (_index3 > 0) {
            _child3.x += childs[_index3 - 1].x + childs[_index3 - 1].width;
          } else {
            // x 轴起点是总宽度-子元素总宽度
            _child3.x += parentWidth - childsWidth;
          }
        }
      } else if (justifyContent === 'center') {
        var _childsWidth = this.getChildsWidth();

        for (var _index4 = 0; _index4 < childs.length; _index4++) {
          var _child4 = childs[_index4];

          if (_index4 > 0) {
            _child4.x += childs[_index4 - 1].x + childs[_index4 - 1].width;
          } else {
            // x 轴起点是总宽度-子元素总宽度的一半
            _child4.x += (parentWidth - _childsWidth) * .5;
          }
        }
      } else if (justifyContent === 'space-between') {
        // 水平中间间隔相等，两端无间隔
        var betweenGapWidth = this.getBetweenGapWidth(parentWidth);

        for (var _index5 = 0, l = childs.length; _index5 < l; _index5++) {
          var _child5 = childs[_index5];

          if (_index5 > 0) {
            _child5.x += childs[_index5 - 1].x + childs[_index5 - 1].width + betweenGapWidth;
          } else {
            _child5.x += 0;
          }
        }
      } else if (justifyContent === 'space-around') {
        // 水平中间间隔相等，两端间隔是中间间隔的一半
        var aroundGapWidth = this.getAroundGapWidth(parentWidth);

        for (var _index6 = 0, _l3 = childs.length; _index6 < _l3; _index6++) {
          var _child6 = childs[_index6];

          if (_index6 > 0) {
            _child6.x += childs[_index6 - 1].x + childs[_index6 - 1].width + aroundGapWidth;
          } else {
            // x 轴起点是单个间隔的一半
            _child6.x += aroundGapWidth * .5;
          }
        }
      }
    }
    /**
     * column 模式(水平转垂直) 下的水平对齐，即垂直对齐
     */

  }, {
    key: "setJustifyContentForColumn",
    value: function setJustifyContentForColumn(isReverse) {
      var parentHeight = this.height;
      var childs = this.childs;
      var justifyContent = this.justifyContent;

      if (isReverse) {
        childs = this.childs.reverse();

        if (justifyContent === 'flex-start') {
          justifyContent = 'flex-end';
        } else if (justifyContent === 'flex-end') {
          justifyContent = 'flex-start';
        }
      }

      if (justifyContent === 'flex-start') {
        for (var index = 0; index < childs.length; index++) {
          var child = childs[index];

          if (index > 0) {
            child.y += childs[index - 1].y + childs[index - 1].height;
          } else {
            child.y += 0;
          }
        }
      } else if (justifyContent === 'flex-end') {
        var childsHeight = this.getChildsHeight();

        for (var _index7 = 0; _index7 < childs.length; _index7++) {
          var _child7 = childs[_index7];

          if (_index7 > 0) {
            _child7.y += childs[_index7 - 1].y + childs[_index7 - 1].height;
          } else {
            // y 轴起点是总宽度-子元素总宽度
            _child7.y += parentHeight - childsHeight;
          }
        }
      } else if (justifyContent === 'center') {
        var _childsHeight = this.getChildsHeight();

        for (var _index8 = 0; _index8 < childs.length; _index8++) {
          var _child8 = childs[_index8];

          if (_index8 > 0) {
            _child8.y += childs[_index8 - 1].y + childs[_index8 - 1].height;
          } else {
            // y 轴起点是总宽度-子元素总宽度的一半
            _child8.y = (parentHeight - _childsHeight) * .5;
          }
        }
      } else if (justifyContent === 'space-between') {
        // 水平中间间隔相等，两端无间隔
        var betweenGapHeight = this.getBetweenGapHeight(parentHeight);

        for (var _index9 = 0, l = childs.length; _index9 < l; _index9++) {
          var _child9 = childs[_index9];

          if (_index9 > 0) {
            _child9.y += childs[_index9 - 1].y + childs[_index9 - 1].height + betweenGapHeight;
          } else {
            _child9.y += 0;
          }
        }
      } else if (justifyContent === 'space-around') {
        // 水平中间间隔相等，两端间隔是中间间隔的一半
        var aroundGapHeight = this.getAroundGapHeight(parentHeight);

        for (var _index10 = 0, _l4 = childs.length; _index10 < _l4; _index10++) {
          var _child10 = childs[_index10];

          if (_index10 > 0) {
            _child10.y += childs[_index10 - 1].y + childs[_index10 - 1].height + aroundGapHeight;
          } else {
            // x 轴起点是单个间隔的一半
            _child10.y += aroundGapHeight * .5;
          }
        }
      }
    }
    /**
     * column 模式(垂直转水平) 下的垂直对齐，即水平对齐
     */

  }, {
    key: "setAlignItemsByColumn",
    value: function setAlignItemsByColumn() {
      var childs = this.childs;
      var parentWidth = this.width;

      if (this.alignItems === 'center') {
        for (var index = 0, l = childs.length; index < l; index++) {
          var child = childs[index];
          child.x += parentWidth * .5 - child.width * .5;
        }
      } else if (this.alignItems === 'flex-start') {
        for (var _index11 = 0, _l5 = childs.length; _index11 < _l5; _index11++) {
          var _child11 = childs[_index11];
          _child11.x = 0;
        }
      } else if (this.alignItems === 'flex-end') {
        for (var _index12 = 0, _l6 = childs.length; _index12 < _l6; _index12++) {
          var _child12 = childs[_index12];
          _child12.x += parentWidth - _child12.width;
        }
      } // align-self


      childs.forEach(function (v) {
        if (v.alignSelf === 'flex-start') {
          v.x = 0;
        } else if (v.alignSelf === 'center') {
          v.x = parentWidth * .5 - v.width * .5;
        } else if (v.alignSelf === 'flex-end') {
          v.x = parentWidth - v.width;
        }
      });
    }
  }, {
    key: "setColumn",
    value: function setColumn() {
      this.setJustifyContentForColumn();
      this.setAlignItemsByColumn();
    }
  }, {
    key: "setColumnReverse",
    value: function setColumnReverse() {
      this.setJustifyContentForColumn(true);
      this.setAlignItemsByColumn();
    }
  }, {
    key: draw,
    value: function value(ctx) {
      var direction = this.direction;

      if (direction === 'row') {
        this.setRow();
      } else if (direction === 'row-reverse') {
        this.setRowReverse();
      } else if (direction === 'column') {
        this.setColumn();
      } else if (direction === 'column-reverse') {
        this.setColumnReverse();
      } // 所有位置计算完后再调用 extends class 的 draw 绘制
      // 因为 Container 本身不需要绘制渲染


      this[extendsClassDraw](ctx);
    }
  }]);

  return Container;
}(SimpleCss);

var CreateLinearGradient = /*#__PURE__*/function () {
  /**
   * x0	渐变开始点的 x 坐标
   * y0	渐变开始点的 y 坐标
   * x1	渐变结束点的 x 坐标
   * y1	渐变结束点的 y 坐标
   */
  function CreateLinearGradient(x0, y0, x1, y1) {
    _classCallCheck(this, CreateLinearGradient);

    _defineProperty(this, "name", 'CreateLinearGradient');

    _defineProperty(this, "colorStops", []);

    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }

  _createClass(CreateLinearGradient, [{
    key: "exec",
    value: function exec(ctx, instance) {
      var _instance$getPosition = instance.getPosition(),
          _instance$getPosition2 = _slicedToArray(_instance$getPosition, 2),
          _x = _instance$getPosition2[0],
          _y = _instance$getPosition2[1];

      var gradient = ctx.createLinearGradient(this.x0 + _x, this.y0 + _y, this.x1 + _x, this.y1 + _y);
      this.colorStops.map(function (v) {
        return gradient.addColorStop(v[0], v[1]);
      });
      return gradient;
    }
  }, {
    key: "addColorStop",
    value: function addColorStop(percent, color) {
      this.colorStops.push([percent, color]);
    }
  }]);

  return CreateLinearGradient;
}();

var CreateRadialGradient = /*#__PURE__*/function () {
  /**
   * x0	渐变的开始圆的 x 坐标
   * y0	渐变的开始圆的 y 坐标
   * r0	开始圆的半径
   * 注意：小程序不支持后面这三个参数
   * x1	渐变的结束圆的 x 坐标
   * y1	渐变的结束圆的 y 坐标
   * r1	结束圆的半径
   */
  function CreateRadialGradient(x0, y0, r0, x1, y1, r1) {
    _classCallCheck(this, CreateRadialGradient);

    _defineProperty(this, "name", 'CreateRadialGradient');

    _defineProperty(this, "colorStops", []);

    this.x0 = x0;
    this.y0 = y0;
    this.r0 = r0;
    this.x1 = x1;
    this.y1 = y1;
    this.r1 = r1;
  }

  _createClass(CreateRadialGradient, [{
    key: "create",
    value: function create(ctx) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (ctx.createRadialGradient) {
        return ctx.createRadialGradient.apply(this, args);
      } else {
        console.warn('小程序不支持传6个参数，请查阅: createCircularGradient 对应文档');
        return ctx.createCircularGradient.apply(this, args);
      }
    }
  }, {
    key: "exec",
    value: function exec(ctx, instance) {
      var _instance$getPosition = instance.getPosition(),
          _instance$getPosition2 = _slicedToArray(_instance$getPosition, 2),
          _x = _instance$getPosition2[0],
          _y = _instance$getPosition2[1];

      var gradient = this.create(ctx, this.x0 + _x, this.y0 + _y, this.r0, this.x1 + _x, this.y1 + _y, this.r1);
      this.colorStops.map(function (v) {
        return gradient.addColorStop(v[0], v[1]);
      });
      return gradient;
    }
  }, {
    key: "addColorStop",
    value: function addColorStop(percent, color) {
      this.colorStops.push([percent, color]);
    }
  }]);

  return CreateRadialGradient;
}();

var DuduCanvas = {
  load: function load(imgArr) {
    return new ImgLoader(imgArr);
  },
  Stage: function Stage$1(id, callback, page) {
    return new Stage(id, function () {
      callback.apply(void 0, arguments);
    }, page);
  },
  Shape: function Shape$1() {
    return new Shape();
  },
  Group: function Group$1() {
    return new Group();
  },
  Text: function Text$1(t) {
    return new Text(t);
  },
  Image: function Image$1(args) {
    return new Image(args);
  },
  Sprite: function Sprite$1() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _construct(Sprite, args);
  },
  color: {
    createLinearGradient: function createLinearGradient() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _construct(CreateLinearGradient, args);
    },
    createRadialGradient: function createRadialGradient() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _construct(CreateRadialGradient, args);
    }
  }
};

export { Container, CreateLinearGradient, CreateRadialGradient, DuduCanvas, Group, Image, ImgLoader, Shape, Sprite, Stage, Text };
