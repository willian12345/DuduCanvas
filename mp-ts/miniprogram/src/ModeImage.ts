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
    // this.backgroundColor = 'white';
    const img = this.createImgWithMode()
    this.addChild(img)
	}

  private createImgWithMode (){
    const texture = this.texture
    const mode = this.mode
    
    // 保持缩放比，只保证长边能完全显示 居中显示
    if(mode === 'aspectFit'){
      let w = 0
      let h = 0
      let offsetX = 0
      let offsetY = 0
      if(texture.width < texture.height){
        w = (this.height / texture.height) * texture.width
        h = this.height
        offsetX = (this.width - w) * .5
      }else{
        w = this.width
        h = (this.width / texture.width) * texture.height
        offsetY = (this.height - h) * .5
      }
      return new Image({
        image: texture.image,
        sx: 0,
        sy: 0,
        sWidth: texture.width,
        sHeight: texture.height,
        dx: this.x + offsetX,
        dy: this.y + offsetY,
        dWidth: w,
        dHeight: h
      })
    }
    // 保证短边能完全显示，长边可能发生截取, 截取轴居中显示
    if(mode === 'aspectFill'){
      let w = 0
      let h = 0
      let offsetX = 0
      let offsetY = 0
      if(texture.width < texture.height){
        w = this.width
        h = (this.width / texture.width) * texture.height
        offsetY = (this.height - h) * .5
      }else{
        w = (this.height / texture.height) * texture.width
        h = this.height
        offsetX = (this.width - w) * .5
      }
      return new Image({
        image: texture.image,
        sx: 0,
        sy: 0,
        sWidth: texture.width,
        sHeight: texture.height,
        dx: this.x + offsetX,
        dy: this.y + offsetY,
        dWidth: w,
        dHeight: h
      })
    }
    return new Image({
      image: texture.image,
      dx: this.x,
      dy: this.y,
      dWidth: this.width,
      dHeight: this.height
    })
  }
}

 