/// <reference types="types" />
/**
 * lineCap = butt | round | square
 * butt	默认。向线条的每个末端添加平直的边缘。
 * round	向线条的每个末端添加圆形线帽。
 * square	向线条的每个末端添加正方形线帽。
 */
export default class LineCap {
    lineCap: WechatMiniprogram.CanvasRenderingContext.CanvasLineCap;
    constructor(style?: WechatMiniprogram.CanvasRenderingContext.CanvasLineCap);
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D): void;
}
