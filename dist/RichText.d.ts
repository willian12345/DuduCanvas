/**
 * 文本类
 */
import { TContext2d } from './DisplayObject';
import Text from './Text';
/**
 * RichText 文本类
 * 显示文本，支持横、竖排文字，换行
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
    fontWeight?: string | number;
    letterSpace?: number;
    lineClamp?: number;
};
export declare type TElementListItem = {
    value: string;
    style: {
        width: number;
        height: number;
        ascent: number;
        descent: number;
    };
};
export declare type TRow = {
    width: number;
    height: number;
    originHeight: number;
    elementList: TElementListItem[];
};
export default class RichText extends Text {
    name: string;
    protected _wrapHeight: number;
    protected _wrapWidth: number;
    protected _writeMode: 'vertical-lr' | 'vertical-rl' | '';
    protected _lineGap: number;
    protected _letterSpace: number;
    lineClamp: number;
    rows: TRow[];
    color: string;
    get width(): number;
    get height(): number;
    set height(v: number);
    constructor(t?: TTextParams);
    getWidth(): number;
    getComposedFont(): string;
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
    private _computeSize;
    computeRows(ctx: TContext2d): void;
    renderRows(ctx: TContext2d): void;
    /**
     * 整理文本状态
     */
    collectStatus(): void;
    _draw(ctx: TContext2d): void;
}
