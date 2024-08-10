/**
 * 文本类
 */
import DisplayObject from './DisplayObject';
/**
 * Text 文本类
 * 显示文本，支持横、竖排文字，换行
 * 单字宽高直接使用 fontSize 所以非中文字体会有问题
 */
export type TTextParams = {
    text?: string;
    font?: string;
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    fontStretch?: string;
    fontVariant?: string;
    fontStyle?: string;
    fontWeight?: string | number;
    letterSpace?: number;
};
export type TTextBlock = {
    rowNum: number;
    colomnNum: number;
    text: string;
    width: number;
    height: number;
    lineGap: number;
    letterSpace: number;
};
export default class Text extends DisplayObject {
    name: string;
    font: string;
    protected _fontSize: number;
    protected _width: number;
    protected _height: number;
    protected _wrapHeight: number;
    protected _wrapWidth: number;
    protected _writeMode: 'vertical-lr' | 'vertical-rl' | '';
    protected _text: string;
    protected _fontStretch?: string;
    protected _fontVariant?: string;
    protected _fontStyle?: string;
    protected _fontWeight?: string | number;
    protected _lineGap: number;
    protected _letterSpace: number;
    textBlocks: TTextBlock[][];
    textAlign: WechatMiniprogram.CanvasRenderingContext.CanvasTextAlign;
    textBaseline: WechatMiniprogram.CanvasRenderingContext.CanvasTextBaseline;
    color: string;
    private _fontFamily;
    get width(): number;
    get height(): number;
    set height(v: number);
    constructor(t?: TTextParams);
    init(t: TTextParams): void;
    private getWidth;
    private getComposedFont;
    get text(): string;
    set text(t: string);
    get lineGap(): number;
    set lineGap(h: number);
    get letterSpace(): number;
    set letterSpace(v: number);
    /**
     * 限制文本框高度
     * 超过设置的高度则文本换行
     */
    get wrapHeight(): number;
    set wrapHeight(v: number);
    /**
     * 限制文本框宽度
     * 超过设置的宽度则文本换行
     */
    get wrapWidth(): number;
    set wrapWidth(v: number);
    /**
     * 设置字体大小
     */
    get fontSize(): number;
    set fontSize(v: number);
    get fontFamily(): string;
    set fontFamily(v: string);
    /**
     * 文本横排与竖排模式
     */
    get writeMode(): "" | "vertical-lr" | "vertical-rl";
    set writeMode(v: "" | "vertical-lr" | "vertical-rl");
    assembleOneLine(textArr: string[]): void;
    assembleMultiLine(textArr: string[]): void;
    assembleMultiLineVertical(textArr: string[]): void;
    assembleRowText(): void;
    assembleOneLineVertical(textArr: string[]): void;
    assembleVerticalText(): void;
    /**
     * 整理文本状态
     */
    collectStatus(): void;
    private _needComposeText;
    _assembleText(): void;
    _draw(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D): void;
    /**
     * setFillStyle 设置文本颜色
     * @param {String} color [description]
     */
    private _setFillStyle;
    /**
    * fillText 绘制文本
    * @param  {String} text
    * @param  {Number} x
    * @param  {Number} y
    */
    private _fillText;
    private _composeText;
    /**
     * setTextBaseline 设置文字垂直对齐方式，推荐 top 顶部对齐比较好算
     * @param { String } textBaseline top	顶部对齐	 bottom	底部对齐	middle	居中对齐	normal 默认（基线对齐）
     */
    private _setTextBaseline;
    /**
     * [setTextAlign 设置文本水平对齐方式]
     * @param { String } textAlign [left, center, right]
     */
    private _setTextAlign;
    addChild(): void;
}
