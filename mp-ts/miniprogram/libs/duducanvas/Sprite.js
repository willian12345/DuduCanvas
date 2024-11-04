import Group from './Group.js';
import Image from './Image.js';
export default class Sprite extends Group {
    get sliceBounds() {
        return this._sliceBounds;
    }
    set sliceBounds(bounds) {
        // const { left, top, right, bottom } = bounds
        this._setSlice(bounds);
        this._sliceBounds = bounds;
    }
    /**
     *
     * @param {*} imageTexture Image 对象
     * @param {*} sliceBound 九宫格图 {left: 0, top: 0, right: 0, bottom: 0}
     */
    constructor(imageTexture, sliceBound) {
        super();
        this.name = 'Sprite';
        this.sliced = false;
        this._sliceBounds = { left: 0, top: 0, right: 0, bottom: 0 };
        this._left = 0;
        this._top = 0;
        this._right = 0;
        this._bottom = 0;
        this.wRatio = 1;
        this.hRatio = 1;
        // 伸缩后的宽、高
        this.enableWidth = 0;
        this.enableHeight = 0;
        if (imageTexture) {
            this.imageTexture = imageTexture;
        }
        //@ts-ignore
        this.parentDraw = super._draw;
        if (sliceBound) {
            this._setSlice(sliceBound);
        }
    }
    _draw(ctx) {
        const [x, y] = this.getPosition();
        this.wRatio = this.width / this.imageTexture.width;
        this.hRatio = this.height / this.imageTexture.height;
        // 伸缩后的宽、高
        this.enableWidth = (this.width - this._left - this._right) * this.scaleX;
        this.enableHeight = (this.height - this._top - this._bottom) * this.scaleY;
        // 执行所有命令
        this._instructions.forEach((instruction) => {
            instruction.exec(ctx, this);
        });
        if (this.sliced) {
            // sprite 九宫格不允许使用 boxShadow
            this._drawSliced(ctx, x, y, this._getAlpha());
        }
        else {
            this._drawImage(ctx, x, y);
        }
        // 绘制子元素
        this.childs.forEach(v => {
            v.updateContext(ctx);
            v.draw(ctx);
        });
    }
    _drawImage(ctx, x, y) {
        const yoyo = this.imageTexture.image;
        const img = new Image({
            image: yoyo,
            dx: x,
            dy: y,
            dWidth: this.width,
            dHeight: this.height
        });
        img.draw(ctx);
    }
    // 绘制九宫格图像
    _drawSliced(ctx, x, y, alpha) {
        // 计算九宫格每块位置信息
        // 上左
        const ltParams = {
            image: this.imageTexture.image,
            sx: 0,
            sy: 0,
            sWidth: this._left,
            sHeight: this._top,
            dWidth: this._left * this.scaleX,
            dHeight: this._top * this.scaleY,
            dx: 0,
            dy: 0,
        };
        // 上中
        const tParams = {
            image: this.imageTexture.image,
            sx: this._left,
            sy: 0,
            sWidth: this.imageTexture.width - this._right - this._left,
            sHeight: this._top,
            dWidth: this.enableWidth,
            dHeight: this._top * this.scaleY,
            dx: ((this._left * this.scaleX)),
            dy: 0,
        };
        // 上右
        const rtParams = {
            image: this.imageTexture.image,
            sx: this.imageTexture.width - this._right,
            sy: 0,
            sWidth: this._right,
            sHeight: this._top,
            dWidth: this._right * this.scaleX,
            dHeight: this._top * this.scaleY,
            dx: (this._left * this.scaleX) + tParams.dWidth,
            dy: 0,
        };
        // 右中
        const rParams = {
            image: this.imageTexture.image,
            sx: this.imageTexture.width - this._right,
            sy: this._top,
            sWidth: this._right,
            sHeight: this.imageTexture.height - this._bottom - this._top,
            dWidth: this._right * this.scaleX,
            dHeight: this.enableHeight,
            dx: rtParams.dx,
            dy: rtParams.dy + (this._top * this.scaleY),
        };
        // 右下
        const rbParams = {
            image: this.imageTexture.image,
            sx: this.imageTexture.width - this._right,
            sy: this.imageTexture.height - this._bottom,
            sWidth: this._right,
            sHeight: this._bottom,
            dWidth: this._right * this.scaleX,
            dHeight: this._bottom * this.scaleY,
            dx: rtParams.dx - .3,
            dy: rParams.dy + rParams.dHeight,
        };
        // 下中
        const bParams = {
            image: this.imageTexture.image,
            sx: this._left,
            sy: this.imageTexture.height - this._bottom,
            sWidth: this.imageTexture.width - this._left - this._right,
            sHeight: this._bottom,
            dWidth: this.enableWidth,
            dHeight: this._bottom * this.scaleY,
            dx: tParams.dx,
            dy: rParams.dy + rParams.dHeight,
        };
        // 左下
        const lbParams = {
            image: this.imageTexture.image,
            sx: 0,
            sy: this.imageTexture.height - this._bottom,
            sWidth: this._left,
            sHeight: this._bottom,
            dWidth: this._left * this.scaleX,
            dHeight: this._bottom * this.scaleX,
            dx: ltParams.dx,
            dy: rParams.dy + rParams.dHeight,
        };
        // 左中
        const lParams = {
            image: this.imageTexture.image,
            sx: 0,
            sy: this._top,
            sWidth: this._left,
            sHeight: this.imageTexture.height - this._top - this._bottom,
            dWidth: this._left * this.scaleX,
            dHeight: this.enableHeight,
            dx: ltParams.dx,
            dy: rParams.dy,
        };
        // 中间 
        const cParams = {
            image: this.imageTexture.image,
            sx: ltParams.sWidth,
            sy: ltParams.sHeight,
            sWidth: tParams.sWidth,
            sHeight: lParams.sHeight,
            dWidth: this.enableWidth,
            dHeight: this.enableHeight,
            dx: ltParams.dx + ltParams.dWidth,
            dy: ltParams.dy + ltParams.dHeight,
        };
        const peices = [ltParams, tParams, rtParams, rParams, rbParams, bParams, lbParams, lParams, cParams];
        // 用离屏渲染成整张图再绘制到主canvas中解决接触缝隙问题以及性能问题
        // const offScreen = wx.createOffscreenCanvas(375, 375)
        // var offScreenCtx = offScreen.getContext("2d")		
        if (this.rotation != 0) {
            console.error('Sprite 因为旋转后会出现拼接缝隙，在九宫格状态下暂时无法旋转, 待小程序完全支持离屏渲染后修复');
        }
        peices.forEach(v => {
            const i = new Image(v);
            i.alpha = alpha;
            i.draw(ctx);
        });
        return this;
    }
    /**
     * 供内部调用的九宫格边界
     * @param {*} sliceBound: {left: 0, top: 0, right: 0, bottom: 0}
     */
    _setSlice(sliceBound) {
        this.sliced = true;
        this._left = sliceBound.left;
        this._top = sliceBound.top;
        this._right = sliceBound.right;
        this._bottom = sliceBound.bottom;
        return this;
    }
}
