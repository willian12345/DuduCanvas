/// <reference types="types" />
import DisplayObject from "../DisplayObject";
export default class DrawCircle {
    x: number;
    y: number;
    radius: number;
    fill: boolean;
    constructor(x: number, y: number, radius: number, fill?: boolean);
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject): void;
}
