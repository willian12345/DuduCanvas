import SimpleCss from './SimpleCss'
import Image from './Image'
import type {TContext2d, TImageTexture} from './types/index'

/**
 * ModeImage 图片显示类
 * 继承自SimpleCss类，支持 borderRadius、border
 */

export type TMode  = 
  /** 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素 */
  "scaleToFill" |
  /** 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。 */
  "aspectFit" |
  /** 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 */
  "aspectFill" |
  /** 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变 */
  "widthFix" |
  /** 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变 */
  "heightFix"
  /** 裁剪模式，不缩放图片，只显示图片的顶部区域 */
  // "top" |
  // /** 裁剪模式，不缩放图片，只显示图片的底部区域 */
  // "bottom" |
  // /** 裁剪模式，不缩放图片，只显示图片的中间区域 */
  // "center" |
  // /** 裁剪模式，不缩放图片，只显示图片的左边区域 */
  // "left" |
  // /** 裁剪模式，不缩放图片，只显示图片的右边区域 */
  // "right" |
  // /** 裁剪模式，不缩放图片，只显示图片的左上边区域 */
  // 'top left' |
  // /** 裁剪模式，不缩放图片，只显示图片的右上边区域 */
  // 'top right' |
  // /** 裁剪模式，不缩放图片，只显示图片的左下边区域 */
  // 'bottom left' |
  // /** 裁剪模式，不缩放图片，只显示图片的右下边区域 */
  // 'bottom right'

export default class ModeImage extends SimpleCss {	
	name = 'ModeImage'
	texture!: TImageTexture
  mode: TMode = 'scaleToFill'
	constructor(args: {
    texture: TImageTexture
    width?: number, 
    height?: number,
    mode?: TMode
  }){
    super()
    if(args.width !== undefined){
      this.width = args.width;
    }
    
    if(args.height){
      this.height = args.height;
    }

	
    this.texture = args.texture
    if(args.mode){
      this.mode = args.mode
    }
    this.overflowHidden = true;
    this.border = '1px solid red'
    const img = this.createImg()
    img && this.addChild(img)
	}

  private createImg (){
    const texture = this.texture
    if(this.mode === 'scaleToFill'){
      return new Image({
        image: texture.image,
        dx: this.x,
        dy: this.y,
        dWidth: this.width,
        dHeight: this.height
      })
    }else if(this.mode === 'aspectFit'){
      let w = this.width
      let h = (this.width / texture.width) * texture.height
      if(texture.width < texture.height){
        w = (this.height / texture.height) * texture.width
        h = this.height
      }
      return new Image({
        image: texture.image,
        sx: 0,
        sy: 0,
        sWidth: texture.width,
        sHeight: texture.height,
        dx: this.x,
        dy: this.y,
        dWidth: w,
        dHeight: h
      })
    }
    return undefined
  }
}

 