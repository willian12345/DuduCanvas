/// <reference types="types" />
import Group from './Group';
import type { ImageTexture } from './ImgLoader';
/**
 * Sprite 雪碧类
 * 用于显示九宫格类型的图片
 */
export declare type TBound = {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
export default class Sprite extends Group {
    name: string;
    imageTexture: ImageTexture;
    sliced: boolean;
    _sliceBounds: TBound;
    _left: number;
    _top: number;
    _right: number;
    _bottom: number;
    wRatio: number;
    hRatio: number;
    enableWidth: number;
    enableHeight: number;
    get sliceBounds(): TBound;
    set sliceBounds(bounds: TBound);
    /**
     *
     * @param {*} imageTexture Image 对象
     * @param {*} sliceBound 九宫格图 {left: 0, top: 0, right: 0, bottom: 0}
     */
    constructor(imageTexture: ImageTexture, sliceBound?: TBound);
    protected _draw(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D): void;
    private _drawImage;
    private _drawSliced;
    /**
     * 供内部调用的九宫格边界
     * @param {*} sliceBound: {left: 0, top: 0, right: 0, bottom: 0}
     */
    private _setSlice;
}
