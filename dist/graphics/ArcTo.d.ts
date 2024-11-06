/// <reference types="types" />
export default class ArcTo {
    name: string;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    radius: number;
    constructor(x1: number, y1: number, x2: number, y2: number, radius: number);
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: any): void;
}
