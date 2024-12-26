import DisplayObject from "../DisplayObject";
export default class CreateRadialGradient {
    name: string;
    colorStops: [number, string][];
    /**
     * x0 开始圆形的 x 轴坐标。
     * y0 开始圆形的 y 轴坐标。
     * r0 开始圆形的半径。
     * x1 结束圆形的 x 轴坐标。
     * y1 结束圆形的 y 轴坐标。
     * r1 结束圆形的半径。
     */
    x0: number;
    y0: number;
    r0: number;
    x1: number;
    y1: number;
    r1: number;
    constructor(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number);
    create(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): WechatMiniprogram.CanvasRenderingContext.CanvasGradient;
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject): WechatMiniprogram.CanvasRenderingContext.CanvasGradient;
    addColorStop(percent: number, color: string): void;
}
