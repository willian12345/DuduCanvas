/**
 * 文本类
 */
import DisplayObject from './DisplayObject';
import { FillText } from './text/FillText';
import SetFillStyle from './text/SetFillStyle';
import SetTextAlign from './text/SetTextAlign';
import SetTextBaseline from './text/SetTextBaseline';
const defaultFontSize = 10;
// font: font-stretch font-variant font-style font-weight font-size font-family
// 
export default class Text extends DisplayObject {
    constructor(t) {
        super();
        this.name = 'Text';
        // 当前字体样式的属性。符合 CSS font 语法 的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif
        this.font = `${defaultFontSize}px sans-serif`;
        // 暂时只支持 px 为单位
        this._fontSize = 12;
        this._width = 0;
        this._height = 0;
        this._text = '';
        this._fontStretch = '';
        this._fontVariant = '';
        this._fontStyle = '';
        this._fontWeight = 400;
        this.test = [];
        this.textAlign = 'left';
        this.textBaseline = 'top';
        this.color = '#000';
        this._fontFamily = 'sans-serif';
        this._drawGraphics = super._drawGraphics;
        this.init(t !== null && t !== void 0 ? t : {});
        this.test.push('hellworld');
    }
    init(t) {
        var _a;
        let { text, font, color, fontWeight } = t;
        if (t.fontStretch) {
            this._fontStretch = t.fontStretch;
        }
        if (fontWeight) {
            this._fontWeight = fontWeight;
        }
        if (t.fontVariant) {
            this._fontVariant = t.fontVariant;
        }
        if (t.fontStyle) {
            this._fontStyle = t.fontStyle;
        }
        if (t.fontSize) {
            this._fontSize = t.fontSize;
            this._height = t.fontSize;
        }
        if (t.fontFamily) {
            this._fontFamily = t.fontFamily;
        }
        // 如果传入了简写的 font 则直接使用 font 
        if (font) {
            this.font = font;
            const _fontSize = (_a = font.match(/\d+/)) === null || _a === void 0 ? void 0 : _a[0];
            if (_fontSize) {
                this._fontSize = parseInt(_fontSize);
                this._height = this._fontSize;
            }
        }
        else {
            this.font = this.getComposedFont();
        }
        this._height = this.fontSize;
        if (!this.fontSize) {
            this.fontSize = defaultFontSize;
        }
        if (color) {
            this.color = color;
        }
        this.textAlign = 'left';
        this.textBaseline = 'top';
        // 初始化就设置文本
        if (text) {
            this.text = text;
            this._width = this.getWidth();
        }
    }
    getWidth() {
        const ctx = DisplayObject.getContext();
        // 测宽度前必须先设置字体大小
        ctx.font = this.font;
        let w = ctx.measureText(this._text).width;
        return w;
    }
    // 凑成 font 减写
    // font: font-stretch font-variant font-style font-weight font-size font-family
    getComposedFont() {
        return `${this._fontStretch} ${this._fontVariant} ${this._fontStyle} ${this._fontWeight} ${this._fontSize}px ${this._fontFamily}`.trim();
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    set height(v) {
        this._height = v;
    }
    get fontWeight() {
        var _a;
        return (_a = this._fontWeight) !== null && _a !== void 0 ? _a : 400;
    }
    set fontWeight(v) {
        this._fontWeight = v;
    }
    get text() {
        return this._text;
    }
    set text(t) {
        t = String(t);
        this._text = t;
        this._width = this.getWidth();
    }
    /**
     * 设置字体大小
     */
    get fontSize() {
        return this._fontSize;
    }
    set fontSize(v) {
        this._fontSize = v;
        this.font = this.getComposedFont();
        this._height = this._fontSize;
    }
    get fontFamily() {
        return this._fontFamily;
    }
    set fontFamily(v) {
        this._fontFamily = v;
        this.font = this.getComposedFont();
    }
    /**
     * 整理文本状态
     */
    collectStatus() {
        this._setTextAlign(this.textAlign);
        this._setTextBaseline(this.textBaseline);
        this._setFillStyle(this.color);
        this._fillText();
    }
    // 执行指令集
    _draw(ctx) {
        var _a;
        this.collectStatus();
        // 优先执行 graphics 指令
        this._drawGraphics(ctx);
        if (this.mask && this.mask.name === 'Shape') {
            this.mask.masked = this;
            (_a = this._mask) === null || _a === void 0 ? void 0 : _a._draw(ctx);
        }
    }
    /**
     * setFillStyle 设置文本颜色
     * @param {String} color [description]
     */
    _setFillStyle(color = 'black') {
        this.color = color;
        this._append(new SetFillStyle(color));
        return this;
    }
    /**
    * fillText 绘制文本
    * @param  {String} text
    * @param  {Number} x
    * @param  {Number} y
    */
    _fillText() {
        // 如果之前有fillText,则需要先清一下之前填文本的命令
        this._remove('FillText');
        this._append(new FillText(this._text, this.x, this.y));
        return this;
    }
    /**
     * setTextBaseline 设置文字垂直对齐方式，推荐 top 顶部对齐比较好算
     * @param { String } textBaseline top	顶部对齐	 bottom	底部对齐	middle	居中对齐	normal 默认（基线对齐）
     */
    _setTextBaseline(textBaseline) {
        this.textBaseline = textBaseline;
        this._append(new SetTextBaseline(textBaseline));
        return this;
    }
    /**
     * [setTextAlign 设置文本水平对齐方式]
     * @param { String } textAlign [left, center, right]
     */
    _setTextAlign(textAlign) {
        this.textAlign = textAlign;
        this._append(new SetTextAlign(textAlign));
        return this;
    }
}
