/**
 * 文本类
 */
import DisplayObject from './DisplayObject';
import Text from './Text';
export default class RichText extends Text {
    get width() {
        this._computeSize();
        return this._width;
    }
    get height() {
        this._computeSize();
        return this._height;
    }
    set height(v) {
        this._height = v;
    }
    constructor(t) {
        var _a;
        //@ts-ignore
        super(t);
        this.name = 'RichText';
        this._wrapHeight = -1;
        this._wrapWidth = -1;
        this._writeMode = '';
        this._lineGap = 0;
        this._letterSpace = 0;
        this.lineClamp = -1;
        this.rows = [];
        this.color = '#000';
        this.lineClamp = (_a = t === null || t === void 0 ? void 0 : t.lineClamp) !== null && _a !== void 0 ? _a : -1;
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
    get text() {
        return this._text;
    }
    set text(t) {
        t = String(t);
        this._text = t;
        this._width = this.getWidth();
        // console.log(this._width)
    }
    get lineGap() {
        return this._lineGap;
    }
    set lineGap(h) {
        this._lineGap = h;
    }
    get letterSpace() {
        return this._letterSpace;
    }
    set letterSpace(v) {
        this._letterSpace = v;
    }
    /**
     * 限制文本框高度
     * 超过设置的高度则文本换行
     */
    get wrapHeight() {
        return this._wrapHeight;
    }
    set wrapHeight(v) {
        this._wrapHeight = v;
        this.height = v;
    }
    /**
     * 限制文本框宽度
     * 超过设置的宽度则文本换行
     */
    get wrapWidth() {
        return this._wrapWidth;
    }
    set wrapWidth(v) {
        this._wrapWidth = v;
        this._width = v;
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
     * 文本横排与竖排模式
     */
    get writeMode() {
        return this._writeMode;
    }
    set writeMode(v) {
        this._writeMode = v;
        // 设置竖排模式后需要重新计算尺寸
        if (v.length > 0) {
            // this._computeSize();
        }
    }
    _computeSize() {
        this.computeRows(DisplayObject.getContext());
        let renderHeight = 0;
        let renderWidth = 0;
        this.rows.forEach((row) => {
            renderHeight += row.height;
            renderWidth = Math.max(renderWidth, row.width);
        });
        this._height = renderHeight;
        this._width = renderWidth;
    }
    // 计算行渲染数据
    computeRows(ctx) {
        this.rows = [];
        // 实际内容可用宽度
        let contentWidth = this._wrapWidth === -1 ? 10000 : this._wrapWidth;
        // 行数据
        this.rows.push({
            width: 0,
            height: 0,
            originHeight: 0,
            elementList: [],
        });
        const arr = Array.from(this.text);
        for (let i = 0; i < arr.length; i++) {
            const value = arr[i];
            ctx.font = this.font;
            let { width, actualBoundingBoxAscent, actualBoundingBoxDescent } = ctx.measureText(value);
            // 某些浏览器环境 actualBoundingBoxAscent actualBoundingBoxDescent 还不支持
            // 如果没有这两个属性则其值直接取字号一半
            if (!actualBoundingBoxAscent) {
                actualBoundingBoxAscent = this.fontSize * .5;
                actualBoundingBoxDescent = actualBoundingBoxAscent;
            }
            // 尺寸信息
            let style = {
                width,
                height: actualBoundingBoxAscent + actualBoundingBoxDescent,
                ascent: actualBoundingBoxAscent,
                descent: actualBoundingBoxDescent
            };
            // 完整数据
            let element = {
                value,
                style,
            };
            // 判断当前行是否能容纳
            let curRow = this.rows[this.rows.length - 1];
            const enoughWidth = (curRow.width + style.width <= contentWidth);
            const notNewLine = value !== '\n';
            // 在当前行追加
            if (enoughWidth && notNewLine) {
                curRow.elementList.push(element);
                curRow.width += style.width;
                // 保存加上 lineGap 后的高度
                curRow.height = Math.max(curRow.height, style.height + this._lineGap);
                // 保存原始最高的文本高度
                curRow.originHeight = Math.max(curRow.originHeight, style.height);
                continue;
            }
            // 如果 lineClamp 超过后是否要显示 "..."
            const needClamp = (this.lineClamp > -1 && this.rows.length >= this.lineClamp);
            if (needClamp) {
                const lastChar = curRow.elementList[curRow.elementList.length - 1];
                lastChar.value = '...';
                break;
            }
            // 另起一行
            this.rows.push({
                width: style.width,
                height: style.height + this._lineGap,
                originHeight: style.height,
                elementList: [element]
            });
        }
    }
    renderRows(ctx) {
        let renderHeight = 0;
        this.rows.forEach((row) => {
            let renderWidth = 0;
            //   ctx.beginPath()
            //   // 辅助线
            //   ctx.moveTo(this.x, renderHeight + row.height)
            //   ctx.lineTo(400, renderHeight + row.height)
            //   ctx.stroke()
            row.elementList.forEach((item, index) => {
                // 跳过换行符
                if (item.value === '\n') {
                    return;
                }
                // ctx.transform(1, 0,0, 1, 0, 0);
                ctx.save();
                // // 渲染文字
                ctx.font = this.font;
                ctx.fillText(item.value, renderWidth, renderHeight + (row.height - row.originHeight) / 2);
                // 更新当前行绘制到的宽度
                renderWidth += item.style.width;
                ctx.restore();
            });
            //   ctx.closePath();
            renderHeight += row.height;
        });
    }
    /**
     * 整理文本状态
     */
    collectStatus() {
        this._setTextAlign(this.textAlign);
        this._setTextBaseline(this.textBaseline);
        this._setFillStyle(this.color);
    }
    // 执行指令集
    _draw(ctx) {
        var _a;
        this.collectStatus();
        // 如果需要排版则需要进行文本组装
        this._drawGraphics(ctx);
        this.computeRows(ctx);
        this.renderRows(ctx);
        if (this.mask && this.mask.name === 'Shape') {
            this.mask.masked = this;
            (_a = this._mask) === null || _a === void 0 ? void 0 : _a._draw(ctx);
        }
    }
}
