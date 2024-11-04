import DisplayObject from "../DisplayObject";
export default class BezierCurveTo {
    cp1x: number;
    cp1y: number;
    cp2x: number;
    cp2y: number;
    x: number;
    y: number;
    constructor(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number);
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject): void;
}
