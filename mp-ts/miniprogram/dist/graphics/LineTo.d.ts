import DisplayObject from "../DisplayObject";
export default class LineTo {
    x: number;
    y: number;
    constructor(x: number, y: number);
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject): void;
}
