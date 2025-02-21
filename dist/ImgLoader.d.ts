import type { TCanvas, TImage } from './types/index';
/**
 * 预加载图片
 *
 */
export type ImageTexture = {
    path: string;
    width: number;
    height: number;
    image: TImage;
};
export type TImageMap = Map<string, ImageTexture>;
export type TImgArr = {
    id: string;
    src: string;
}[];
export default class ImgLoader {
    canvas: TCanvas;
    private _total;
    private _loaded;
    private _imageMap;
    private imgArr;
    constructor(canvas: TCanvas, imgArr: TImgArr);
    load(loadProgressCallback?: (progress: number) => {}): Promise<unknown>;
    get(id: string): ImageTexture;
}
