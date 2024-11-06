/// <reference types="types" />
import SimpleCss from './SimpleCss';
/**
 * Image 图片显示类
 * 继承自SimpleCss类，支持 borderRadius、border
 */
export default class Image extends SimpleCss {
    name: string;
    image: WechatMiniprogram.CanvasRenderingContext.CanvasImageSource;
    path: any;
    sx?: number;
    sy?: number;
    sWidth: number;
    sHeight: number;
    dx: number;
    dy: number;
    dWidth: number;
    dHeight: number;
    constructor(args: {
        image: WechatMiniprogram.CanvasRenderingContext.CanvasImageSource;
        width?: number;
        height?: number;
        sWidth?: number;
        sHeight?: number;
        sx?: number;
        sy?: number;
        dx?: number;
        dy?: number;
        dWidth?: number;
        dHeight?: number;
    });
    private _drawImage;
    protected _draw(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D): void;
    draw(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D): void;
}
