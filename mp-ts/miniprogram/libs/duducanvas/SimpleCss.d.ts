import DisplayObjectContainer from './DisplayObjectContainer';
/**
 * SimpleCss
 * 样式类
 */
export default class SimpleCss extends DisplayObjectContainer {
    backgroundColor: string;
    border: string;
    borderTop: string;
    borderRight: string;
    borderBottom: string;
    borderLeft: string;
    /**
     * 左边显示成半圆
     */
    borderLeftRound: boolean;
    /**
     * 右边显示成半圆
     */
    borderRightRound: boolean;
    borderRadiusValue: number | number[] | string;
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
    get borderRadius(): string | number;
    set borderRadius(value: string | number);
    constructor();
    updateContext(context: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D): void;
    /**
     * 绘制接口
     * @param {*} ctx
     */
    /**
     * 解构边框线值字符串
     * @param {*} border
     */
    getBorderAttr(border: string): [number, string, string];
    /**
     * 设置边框样宽，样式，颜色
     * @param {*} borderWidth
     * @param {*} borderStyle
     * @param {*} borderColor
     */
    setBorderStyles(borderWidth: number, borderStyle: string, borderColor: string): void;
    /**
     * 初始化边框线
     */
    initBorder(): void;
    /**
     * 初始化圆角
     * 为图像元素添加遮罩以实现 borderRadius 圆角
    */
    initBorderRadiusMask(): void;
    /**
     * 初始化背景颜色
     */
    initBackgroundColor(): void;
}
