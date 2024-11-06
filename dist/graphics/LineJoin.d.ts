/// <reference types="types" />
/**
 * lineJoin = "bevel|round|miter"
 * bevel	创建斜角。
 * round	创建圆角。
 * miter	默认。创建尖角。
 */
export default class LineJoin {
    miterLimit: number;
    lineJoin: WechatMiniprogram.CanvasRenderingContext.CanvasLineJoin;
    constructor(style?: WechatMiniprogram.CanvasRenderingContext.CanvasLineJoin, miterLimit?: number);
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D): void;
}
