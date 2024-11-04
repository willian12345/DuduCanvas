import DisplayObjectContainer from './DisplayObjectContainer.js';
import Shape from './Shape.js';
/**
 * 解构圆角矩形值生成:  number[]
 * @param {*} value
 */
function getChangedBorderRadiusValue(value) {
    return String(value).split(' ').map(v => parseFloat(v));
}
// 仅支持二种风格的边框
const BORDER_STYLES = ['solid', 'dashed'];
/**
 * SimpleCss
 * 样式类
 */
export default class SimpleCss extends DisplayObjectContainer {
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
    get borderRadius() {
        //@ts-ignore
        return this.borderRadiusValue;
    }
    set borderRadius(value) {
        if (!value)
            return;
        if (value != '100%') {
            this.borderRadiusValue = getChangedBorderRadiusValue(value);
        }
        else {
            this.borderRadiusValue = value;
        }
    }
    constructor() {
        super();
        this.backgroundColor = '';
        this.border = '';
        this.borderTop = '';
        this.borderRight = '';
        this.borderBottom = '';
        this.borderLeft = '';
        /**
         * 左边显示成半圆
         */
        this.borderLeftRound = false;
        /**
         * 右边显示成半圆
         */
        this.borderRightRound = false;
        this.borderRadiusValue = '';
    }
    updateContext(context) {
        // 如果设置了 borderRadius 值则需要使用遮罩实现圆角
        if (this.borderRadiusValue || this.borderLeftRound || this.borderRightRound) {
            this.initBorderRadiusMask();
        }
        // 绘制背景
        if (this.backgroundColor) {
            this.initBackgroundColor();
        }
        // 绘制边框
        if (this.border || this.borderTop || this.borderRight || this.borderBottom || this.borderLeft) {
            this.initBorder();
        }
        // 遮罩，主要用于显示圆角及圆
        if (this.mask) {
            if (this.mask.name === 'Shape') {
                // 遮罩层不参与显示所以也没有父级元素
                this.mask.masked = this;
            }
        }
        super.updateContext(context);
    }
    /**
     * 绘制接口
     * @param {*} ctx
     */
    // protected _draw(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D) {
    //     // 如果设置了 borderRadius 值则需要使用遮罩实现圆角
    //     // if (this.borderRadiusValue || this.borderLeftRound || this.borderRightRound) {
    //     //     this.initBorderRadiusMask()
    //     // }
    //     // // 绘制背景
    //     // if (this.backgroundColor) {
    //     //     this.initBackgroundColor()
    //     // }
    //     // // 绘制边框
    //     // if (this.border || this.borderTop || this.borderRight || this.borderBottom || this.borderLeft) {
    //     //     this.initBorder()
    //     // }
    //     // 重载 DisplayObject draw 
    //     // 调用 显示对象绘制方法
    //     super._draw(ctx)
    // }
    /**
     * 解构边框线值字符串
     * @param {*} border
     */
    getBorderAttr(border) {
        let [borderWidth, borderStyle, borderColor] = border.split(' ');
        const _borderWidth = parseFloat(borderWidth);
        if (BORDER_STYLES.indexOf(borderStyle) < 0) {
            console.warn('不支持的边框样式');
        }
        return [_borderWidth, borderStyle, borderColor];
    }
    /**
     * 设置边框样宽，样式，颜色
     * @param {*} borderWidth
     * @param {*} borderStyle
     * @param {*} borderColor
     */
    setBorderStyles(borderWidth, borderStyle, borderColor) {
        this.graphics.beginPath();
        if (borderStyle === 'dashed') {
            this.graphics.setLineDash([borderWidth, borderWidth]);
        }
        // 边框都是向内画
        this.graphics.lineWidth(borderWidth)
            .strokeStyle(borderColor);
    }
    /**
     * 初始化边框线
     */
    initBorder() {
        // 四边都有边框
        if (this.border) {
            const [borderWidth, borderStyle, borderColor] = this.getBorderAttr(this.border);
            this.setBorderStyles(borderWidth, borderStyle, borderColor);
            const halfBorderWidth = borderWidth * .5;
            // 如果有圆角属性，则需要画圆角边框
            if (this.borderRadius) {
                //@ts-ignore
                const _borderRadius = parseFloat(this.borderRadius);
                let s;
                // 值为100%或值等于宽高值，且宽高相等时 表示显示想要显示成圆形
                if ((this.borderRadius === '100%' || _borderRadius === this.width) && (this.width === this.height)) {
                    s = new Shape();
                    const radius = this.width * .5;
                    s.graphics.strokeCircle(radius, radius, radius);
                }
                else {
                    s = new Shape();
                    s.graphics.strokeRoundRect(0, 0, this.width, this.height, _borderRadius);
                }
                this.addChild(s);
            }
            else {
                this.graphics.strokeRect(halfBorderWidth, halfBorderWidth, this.width - borderWidth, this.height - borderWidth);
            }
        }
        else {
            // 单独单边设置
            if (this.borderTop) {
                this.setBorderStyles(...this.getBorderAttr(this.borderTop));
                this.graphics.moveTo(0, 0)
                    .lineTo(this.width, 0)
                    .stroke();
            }
            if (this.borderRight) {
                this.setBorderStyles(...this.getBorderAttr(this.borderRight));
                // 如果是右边半圆，则线也要显示成半圆
                if (this.borderRightRound) {
                    const radius = this.height * .5;
                    this.graphics.arc(this.width - radius, radius, radius, Math.PI * 1.5, Math.PI * 2.5);
                }
                else {
                    this.graphics.moveTo(this.width, 0)
                        .lineTo(this.width, this.height);
                }
                this.graphics.stroke();
            }
            if (this.borderBottom) {
                this.setBorderStyles(...this.getBorderAttr(this.borderBottom));
                this.graphics.moveTo(0, this.height)
                    .lineTo(this.width, this.height)
                    .stroke();
            }
            if (this.borderLeft) {
                this.setBorderStyles(...this.getBorderAttr(this.borderLeft));
                // 如果是左边半圆，则线也要显示成半圆
                if (this.borderLeftRound) {
                    const radius = this.height * .5;
                    this.graphics.arc(radius, radius, radius, Math.PI * .5, Math.PI * 1.5);
                }
                else {
                    this.graphics.moveTo(0, 0)
                        .lineTo(0, this.height);
                }
                this.graphics.stroke();
            }
        }
    }
    /**
     * 初始化圆角
     * 为图像元素添加遮罩以实现 borderRadius 圆角
    */
    initBorderRadiusMask() {
        let s;
        // 正圆形
        if ((this.borderRadiusValue === '100%' || this.borderRadiusValue === this.width) && (this.width === this.height)) {
            const radius = this.width * .5;
            s = new Shape();
            s.graphics.fillCircle(radius, radius, radius);
        }
        else {
            s = new Shape();
            if (typeof this.borderRadiusValue !== 'string') {
                s.graphics.fillRoundRect(0, 0, this.width, this.height, this.borderRadiusValue);
            }
        }
        this.mask = s;
    }
    /**
     * 初始化背景颜色
     */
    initBackgroundColor() {
        this.graphics.beginPath()
            .fillStyle(this.backgroundColor)
            .fillRect(0, 0, this.width, this.height);
    }
}
