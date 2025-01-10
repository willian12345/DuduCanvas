/// <reference types="types" />
export default class LineWidth {
    lineWidth: number;
    constructor(width?: number);
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D): void;
}
