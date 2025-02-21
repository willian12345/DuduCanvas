import SimpleCss from './SimpleCss';
import type { TContext2d, TImage } from './types/index';
/**
 * Image 图片显示类
 * 继承自SimpleCss类，支持 borderRadius、border
 */
export default class Image extends SimpleCss {
    name: string;
    image: TImage;
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
        image: TImage;
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
    protected _draw(ctx: TContext2d): void;
    draw(ctx: TContext2d): void;
}
