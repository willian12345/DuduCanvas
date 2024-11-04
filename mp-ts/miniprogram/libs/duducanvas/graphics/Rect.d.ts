import DisplayObject from "../DisplayObject";
export default class Rect {
    x: number;
    y: number;
    w: number;
    h: number;
    isStroke: boolean;
    constructor(x: number, y: number, w: number, h: number, isStroke?: boolean);
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject): void;
}
