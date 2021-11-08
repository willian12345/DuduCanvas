(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/SpeedChart/SpeedChart"],{

/***/ 30:
/*!********************************************************************************************!*\
  !*** /Users/wangxiaodong/Documents/DuduCanvas/uniapp/components/SpeedChart/SpeedChart.vue ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SpeedChart_vue_vue_type_template_id_e2a15938___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpeedChart.vue?vue&type=template&id=e2a15938& */ 31);
/* harmony import */ var _SpeedChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpeedChart.vue?vue&type=script&lang=js& */ 33);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _SpeedChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _SpeedChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 7);

var renderjs




/* normalize component */

var component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SpeedChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SpeedChart_vue_vue_type_template_id_e2a15938___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SpeedChart_vue_vue_type_template_id_e2a15938___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _SpeedChart_vue_vue_type_template_id_e2a15938___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/SpeedChart/SpeedChart.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 31:
/*!***************************************************************************************************************************!*\
  !*** /Users/wangxiaodong/Documents/DuduCanvas/uniapp/components/SpeedChart/SpeedChart.vue?vue&type=template&id=e2a15938& ***!
  \***************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SpeedChart_vue_vue_type_template_id_e2a15938___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./SpeedChart.vue?vue&type=template&id=e2a15938& */ 32);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SpeedChart_vue_vue_type_template_id_e2a15938___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SpeedChart_vue_vue_type_template_id_e2a15938___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SpeedChart_vue_vue_type_template_id_e2a15938___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SpeedChart_vue_vue_type_template_id_e2a15938___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 32:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/wangxiaodong/Documents/DuduCanvas/uniapp/components/SpeedChart/SpeedChart.vue?vue&type=template&id=e2a15938& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 33:
/*!*********************************************************************************************************************!*\
  !*** /Users/wangxiaodong/Documents/DuduCanvas/uniapp/components/SpeedChart/SpeedChart.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SpeedChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./SpeedChart.vue?vue&type=script&lang=js& */ 34);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SpeedChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SpeedChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SpeedChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SpeedChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SpeedChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 34:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/wangxiaodong/Documents/DuduCanvas/uniapp/components/SpeedChart/SpeedChart.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;




var _vue = __webpack_require__(/*! vue */ 8);
var _uniApp = __webpack_require__(/*! @dcloudio/uni-app */ 35);
var _duducanvas = __webpack_require__(/*! ../../duducanvas/duducanvas.js */ 19); //
//
//
//
var START_DEGREE = 135; // 起始角度（左下角）
var END_DEGREE = 405; // 终点角度（右下角）
var DEGREE_RANGE = END_DEGREE - START_DEGREE; // 角度区间
var LINE_COUNT = 100; // 刻度分成 100 份
var _default = { name: "SpeedChart", props: {
    // 屏宽比 ratio = 实际屏幕宽度/375
    ratio: {
      type: Number,
      default: 1 },

    // 圆半径
    radius: {
      type: Number,
      default: 96 },

    // 整个画面宽度
    width: {
      type: Number,
      default: 300 },

    // 整个画面高度
    height: {
      type: Number,
      default: 300 },

    // 分值(中间显示)
    score: {
      type: Number,
      default: 0 } },


  setup: function setup(props) {
    var animationTimer;
    // 清除动画
    (0, _vue.onUnmounted)(function () {
      if (animationTimer) {
        clearTimeout(animationTimer);
      }
    });

    (0, _vue.onMounted)(function () {var _getCurrentInstance =
      (0, _vue.getCurrentInstance)(),ctx = _getCurrentInstance.ctx;
      new _duducanvas.Stage('#myCanvas', function (stage, ctx) {
        var centerX = stage.width / 2; // x 坐标值
        var centerY = stage.height / 2; // y 坐标值
        var step = DEGREE_RANGE * Math.PI / 180 / LINE_COUNT; // 弧度间隔，每根线间隔多少弧度
        var startAngle = START_DEGREE * Math.PI / 180; // 起始弧度（左下角）
        var endAngle = END_DEGREE * Math.PI / 180; // 终点弧度（右下角）
        var angle = startAngle;
        var radius = props.radius; // 圆半径

        // 生成刻度
        for (var i = 0; i < 101; i++) {
          var path = new _duducanvas.Shape();
          path.graphics.beginPath();

          var gutter = i % 5 === 0 ? 10 : 0; // 间隔 5 线就长一点
          // 小圆旋转点
          var moveX = centerX + Math.cos(angle) * (radius - gutter);
          var moveY = centerY + Math.sin(angle) * (radius - gutter);
          // 大圆旋转点
          var endX = centerX + Math.cos(angle) * (radius + 10);
          var endY = centerY + Math.sin(angle) * (radius + 10);
          angle = angle + step;
          // 圆由内向外绘制
          path.graphics.moveTo(moveX, moveY).
          lineTo(endX, endY).
          lineWidth(1).
          strokeStyle('rgba(255,255,255, .5)').
          stroke();
          stage.addChild(path);
        }

        // 圆线顺时钟进度线背景
        var outCircleRadius = radius + 16; // 外圆半径
        var arcLineBg = new _duducanvas.Shape();
        arcLineBg.graphics.beginPath().
        lineWidth(3).
        strokeStyle('rgba(255,255,255, .5)').
        arc(centerX, centerY, outCircleRadius, startAngle, endAngle, false).
        stroke();
        stage.addChild(arcLineBg);
        // 指示圆点
        var pointerCircle = new _duducanvas.Shape();
        var pointerCircleDegree = props.score / 100 * DEGREE_RANGE + START_DEGREE; // 根据百分制得出得分比算出指示圆位置角度
        var pointerCircleAngle = pointerCircleDegree * Math.PI / 180; // 算出对应孤度
        var startX = centerX + Math.cos(startAngle) * outCircleRadius;
        var startY = centerY + Math.sin(startAngle) * outCircleRadius;
        pointerCircle.graphics.
        beginPath().
        fillStyle('white').
        fillCircle(0, 0, 8);
        pointerCircle.x = startX;
        pointerCircle.y = startY;

        // 得分圆弧 圆线顺时钟进度
        var arcLine = new _duducanvas.Shape();
        arcLine.graphics.
        lineWidth(3).
        strokeStyle('white');
        stage.addChild(arcLine, pointerCircle);

        // 文本显示
        // 左下角显示字符 0
        var startPointX = centerX + Math.cos(startAngle) * outCircleRadius;
        var startPointY = centerY + Math.sin(startAngle) * outCircleRadius;
        var text0 = new _duducanvas.Text({
          text: '0',
          fontSize: 16,
          color: 'rgba(255,255,255, .5)' });

        text0.x = startPointX - 20;
        text0.y = startPointY;
        // 右下角显示字符 100
        var endPointX = centerX + Math.cos(endAngle) * outCircleRadius;
        var endPointY = centerY + Math.sin(endAngle) * outCircleRadius;
        var text100 = new _duducanvas.Text({
          fontSize: 16,
          text: '100',
          color: 'rgba(255,255,255, .5)' });

        text100.x = endPointX + 6;
        text100.y = endPointY;

        // 得分
        var textScoreFontSize = 56 * props.ratio;
        var textScore = new _duducanvas.Text({
          font: "normal bold ".concat(textScoreFontSize, "px PingFang-SC"),
          color: 'white' });

        textScore.text = '0';
        stage.addChild(textScore);
        textScore.x = centerX - textScore.width * .5;
        textScore.y = centerY - textScore.height * .5;
        // 综合得分
        var textTips = new _duducanvas.Text({
          font: "normal bold ".concat(16 * props.ratio, "px PingFang-SC"),
          text: '综合得分',
          color: 'white' });

        textTips.x = centerX - 30;
        textTips.y = centerY + 76;
        //将4个文本添加至舞台
        stage.addChild(text0, text100, textScore, textTips);

        // 动画显示分值
        var animateChart = function animateChart() {
          var endScore = props.score;
          var currentScore = 0;
          var currentAngle = startAngle;
          // 0 - 目标分数之间的每一格弧度距离
          var perAngle = (pointerCircleAngle - currentAngle) / endScore;
          var tick = function tick() {
            if (currentScore < endScore) {
              animationTimer = setTimeout(function () {
                currentScore += 1;
                textScore.text = currentScore;
                var textScoreWidth = textScoreFontSize;

                // 判断分数位数以x轴上做负向偏
                if (currentScore / 10 >= 10) {
                  // 3位数
                  textScoreWidth = textScoreFontSize * 1.5;
                  textScore.x = centerX - textScoreWidth * .5;
                } else if (currentScore / 10 >= 1) {
                  // 2位数
                  textScoreWidth = textScoreFontSize * 1;
                  textScore.x = centerX - textScoreWidth * .5;
                }


                // 指示圆点的当前弧度
                currentAngle += perAngle;
                if (currentAngle < pointerCircleAngle) {
                  var _endX = centerX + Math.cos(currentAngle) * outCircleRadius;
                  var _endY = centerY + Math.sin(currentAngle) * outCircleRadius;
                  pointerCircle.x = _endX;
                  pointerCircle.y = _endY;
                }
                // 得分圆弧进度
                arcLine.graphics.
                beginPath().
                arc(centerX, centerY, outCircleRadius, startAngle, currentAngle, false).
                stroke();

                // 更新画布舞台
                stage.update();
                // 循环调用
                tick();
              }, 16.7);
            }
          };
          tick();
        };

        animateChart();

      }, ctx);
    });
  } };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/SpeedChart/SpeedChart.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/SpeedChart/SpeedChart-create-component',
    {
        'components/SpeedChart/SpeedChart-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('12')['createComponent'](__webpack_require__(30))
        })
    },
    [['components/SpeedChart/SpeedChart-create-component']]
]);
