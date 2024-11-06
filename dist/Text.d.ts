/// <reference types="types" />
/**
 * 文本类
 */
import DisplayObject, { TContext2d } from './DisplayObject';
/**
 * Text 文本类
 * 显示普通文本
 * 单字宽高直接使用 fontSize 所以非中文字体会有问题
 */
export declare type TTextParams = {
    text?: string;
    font?: string;
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    fontStretch?: string;
    fontVariant?: string;
    fontStyle?: string;
    fontWeight?: number;
};
export default class Text extends DisplayObject {
    name: string;
    font: string;
    protected _fontSize: number;
    protected _width: number;
    protected _height: number;
    protected _text: string;
    protected _fontStretch?: string;
    protected _fontVariant?: string;
    protected _fontStyle?: string;
    protected _fontWeight?: number;
    test: string[];
    textAlign: WechatMiniprogram.CanvasRenderingContext.CanvasTextAlign;
    textBaseline: WechatMiniprogram.CanvasRenderingContext.CanvasTextBaseline;
    color: string;
    protected _fontFamily: string;
    constructor(t?: TTextParams);
    init(t: TTextParams): void;
    protected getWidth(): number;
    protected getComposedFont(): string;
    get width(): number;
    get height(): number;
    set height(v: number);
    get fontWeight(): number;
    set fontWeight(v: number);
    get text(): string;
    set text(t: string);
    /**
     * 设置字体大小
     */
    get fontSize(): number;
    set fontSize(v: number);
    get fontFamily(): string;
    set fontFamily(v: string);
    /**
     * 整理文本状态
     */
    collectStatus(): void;
    _draw(ctx: TContext2d): void;
    /**
     * setFillStyle 设置文本颜色
     * @param {String} color [description]
     */
    protected _setFillStyle(color?: string): this;
    /**
    * fillText 绘制文本
    * @param  {String} text
    * @param  {Number} x
    * @param  {Number} y
    */
    protected _fillText(): this;
    /**
     * setTextBaseline 设置文字垂直对齐方式，推荐 top 顶部对齐比较好算
     * @param { String } textBaseline top	顶部对齐	 bottom	底部对齐	middle	居中对齐	normal 默认（基线对齐）
     */
    protected _setTextBaseline(textBaseline: WechatMiniprogram.CanvasRenderingContext.CanvasTextBaseline): this;
    /**
     * [setTextAlign 设置文本水平对齐方式]
     * @param { String } textAlign [left, center, right]
     */
    protected _setTextAlign(textAlign: WechatMiniprogram.CanvasRenderingContext.CanvasTextAlign): this;
}
