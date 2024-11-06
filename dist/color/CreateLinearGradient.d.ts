/// <reference types="types" />
import DisplayObject from "../DisplayObject";
export default class CreateLinearGradient {
    name: string;
    colorStops: [number, string][];
    /**
     * x0	渐变开始点的 x 坐标
     * y0	渐变开始点的 y 坐标
     * x1	渐变结束点的 x 坐标
     * y1	渐变结束点的 y 坐标
     */
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    constructor(x0: number, y0: number, x1: number, y1: number);
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject): WechatMiniprogram.CanvasRenderingContext.CanvasGradient;
    addColorStop(percent: number, color: string): void;
}
