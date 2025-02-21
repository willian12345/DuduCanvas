import type {TCanvas, TImage} from './types/index'
import { isWeb } from './utils';
/**
 * 预加载图片
 * 
 */
export type ImageTexture = {
  path: string,
  width: number,
  height: number,
  image: TImage,
}
export type TImageMap = Map<string, ImageTexture>
export type TImgArr = {id: string, src: string}[];
export default class ImgLoader {
  canvas: TCanvas
  private _total = 0;
  private _loaded = 0;
  private _imageMap: TImageMap
  private imgArr:  TImgArr
	constructor(canvas: TCanvas, imgArr:  TImgArr){
    this.canvas = canvas;
		this._total = imgArr.length
    this._loaded = 0
    this._imageMap = new Map() as TImageMap;
    this.imgArr = imgArr;
  }
  load(loadProgressCallback?: (progress: number)=>{}){
    return new Promise((resolve) => {
      this.imgArr.forEach( v => {
        let image:TImage
        if(isWeb()){
          image = new Image()
        }else{
          image = (this.canvas as WechatMiniprogram.Canvas).createImage();
        }
        
        image.onload = () => {
          console.log('loaded',image)
          this._imageMap.set(v.id, {
            path: v.src,
            width: image.width,
            height: image.height,
            image
          })
          this._loaded++
            if(loadProgressCallback){
              loadProgressCallback(this._loaded/this._total)
            }
            if((this._loaded / this._total) >= 1){
              resolve(this)
            }
        }
        image.src = v.src;
      })
		})
  }
	get(id: string){
		return this._imageMap.get(id)
	}
}
