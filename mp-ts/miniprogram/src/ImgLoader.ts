/**
 * 预加载图片
 * 
 */
export type TImageMap = Map<string, {
  path: string,
  width: number,
  height: number,
  image: WechatMiniprogram.CanvasRenderingContext.CanvasImageSource,
}>
export type TImgArr = {id: string, src: string}[];
export default class ImgLoader {
  canvas: WechatMiniprogram.Canvas
  private _total = 0;
  private _loaded = 0;
  private _imageMap: TImageMap
  private imgArr:  TImgArr
	constructor(canvas: WechatMiniprogram.Canvas, imgArr:  TImgArr){
    this.canvas = canvas;
		this._total = imgArr.length
    this._loaded = 0
    this._imageMap = new Map() as TImageMap;
    this.imgArr = imgArr;
  }
  load(loadProgressCallback?: (progress: number)=>{}){
    return new Promise((resolve) => {
      this.imgArr.forEach( v => {
        const image = this.canvas.createImage();
        image.onload = () => {
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
