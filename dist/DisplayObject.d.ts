import Graphics from './graphics/index';
import Shape from './Shape';
type Context2d = WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D;
/**
 * 显示对象类
 */
export default class DisplayObject extends Graphics {
    protected _id: number;
    protected _mask: Shape | null;
    name: string;
    x: number;
    y: number;
    protected _width: number;
    protected _height: number;
    alpha: number;
    regX: number;
    regY: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
    parent: DisplayObject | null;
    childs: DisplayObject[];
    shadow: string;
    isMask: boolean;
    masked: DisplayObject | null;
    protected _scale: number;
    zIndex: number;
    constructor();
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get mask(): Shape | null;
    set mask(s: Shape | null);
    get scale(): number;
    set scale(s: number);
    /**
     * 保存 Stage 时传入 canvas context
     */
    static setContext(ctx: Context2d): void;
    static getContext(): WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D;
    static setDebug(_debug: boolean): void;
    addChild(...args: DisplayObject[]): void;
    removeChild(child: DisplayObject): void;
    protected _draw(context: Context2d): void;
    /**
     * setShadow
     * 添加阴影效果， 遮罩(clip)过的对象不支持 shadow 效果
     * @param {*} shadow "10 10 10 black"
     */
    protected _setShadow(el: DisplayObject): void;
    /**
     * 获取元素透明度
     */
    protected _getAlpha(): number;
    /**
     * getPosition 获取实例距画布左上角原点(0,0)的绝对位置
     * @return {[x, y]} 返回数组
     */
    getPosition(): [number, number];
    /**
     * 获取旋转角度
     */
    getRotation(): number;
    /**
     * 获取缩放程度
     */
    getScale(): number[];
    /**
     * 先形变后再绘制
     * 移动、缩放、旋转 canvas
     */
    transform(v: DisplayObject, context: Context2d): this;
    getRectangleRotatedPosition(rotation: number, w: number, h: number, regX: number, regY: number): {
        x: number;
        y: number;
    }[];
    /**
     * 获取对象形变后的相较于舞台的绝对位置与宽度
     * scale 形变不在 getBounds 计算之内
     * scale 形变后宽高可请自行乘上相应的 scale 倍数
     */
    _getBounds(): {
        left: number;
        top: number;
        right: number;
        bottom: number;
        width: number;
        height: number;
    };
    findNodesBounds(node: DisplayObject): {
        left: number;
        top: number;
        right: number;
        bottom: number;
        width: number;
        height: number;
    }[];
    protected getBounds(): {
        left: number;
        top: number;
        right: number;
        bottom: number;
        width: number;
        height: number;
    } | null;
}
export {};
