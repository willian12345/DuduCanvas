/// <reference types="types" />
/**
 * 预加载图片
 *
 */
export declare type ImageTexture = {
    path: string;
    width: number;
    height: number;
    image: WechatMiniprogram.CanvasRenderingContext.CanvasImageSource;
};
export declare type TImageMap = Map<string, ImageTexture>;
export declare type TImgArr = {
    id: string;
    src: string;
}[];
export default class ImgLoader {
    canvas: WechatMiniprogram.Canvas;
    private _total;
    private _loaded;
    private _imageMap;
    private imgArr;
    constructor(canvas: WechatMiniprogram.Canvas, imgArr: TImgArr);
    load(loadProgressCallback?: (progress: number) => {}): Promise<unknown>;
    get(id: string): ImageTexture;
}
