import SimpleCss from './SimpleCss';
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
export default class Container extends SimpleCss {
    name: string;
    _flex: string;
    _direction: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    _alignItems: 'flex-start' | 'center' | 'flex-end';
    _justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between';
    _gap: number;
    constructor();
    set width(v: number);
    get width(): number;
    set height(v: number);
    set gap(v: number);
    get gap(): number;
    get height(): number;
    get flex(): string;
    set flex(v: string);
    get direction(): "row" | "column" | "row-reverse" | "column-reverse";
    set direction(v: "row" | "column" | "row-reverse" | "column-reverse");
    get alignItems(): "flex-start" | "center" | "flex-end";
    set alignItems(v: "flex-start" | "center" | "flex-end");
    get justifyContent(): "flex-start" | "center" | "flex-end" | "space-around" | "space-between";
    set justifyContent(v: "flex-start" | "center" | "flex-end" | "space-around" | "space-between");
    /**
     * 获取所有子元素宽度
     */
    getChildsWidth(): number;
    /**
     * 获取所有子元素高度
     */
    getChildsHeight(): number;
    /**
     * 获取所有子元素在 between 模式下间隙宽度
     */
    getBetweenGapWidth(parentWidth: number): number;
    /**
     * 获取所有子元素在 between 模式下间隙高度
     */
    getBetweenGapHeight(parentHeight: number): number;
    /**
     * 获取所有子元素在 around 模式下间隙宽度
     */
    getAroundGapWidth(parentWidth: number): number;
    /**
     * 获取所有子元素在 around 模式下间隙高度
     */
    getAroundGapHeight(parentHeight: number): number;
    /**
     * row 样式
     */
    setRow(): void;
    /**
     * row 样式翻转
     */
    setRowReverse(): void;
    /**
     * 垂直对齐
     */
    setAlignItems(): void;
    /**
     * 水平对齐
     */
    setJustifyContent(isReverse?: boolean): void;
    /**
     * column 模式(水平转垂直) 下的水平对齐，即垂直对齐
     */
    setJustifyContentForColumn(isReverse?: boolean): void;
    /**
     * column 模式(垂直转水平) 下的垂直对齐，即水平对齐
     */
    setAlignItemsByColumn(): void;
    setColumn(): void;
    setColumnReverse(): void;
    _draw(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D): void;
}
