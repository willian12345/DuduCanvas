/**
 * 私有方法名
 * 使用 Symbol 对象作为私有方法名
 */
const draw = Symbol('draw');
const drawImage$1 = Symbol('drawImage');
const getAlpha = Symbol('getAlpha');
const append = Symbol('append');
const remove = Symbol('remove');
const instructions = Symbol('instructions');
const drawGraphics = Symbol('drawGraphics');




/**
 * 兼容各小程序平台
 */
function getPrefix(){
  let prefix = '';
  if(typeof uni !== 'undefined'){
    // uniapp
    prefix = uni;
  }else if(typeof wx  !== 'undefined'){
    // 微信小程序
    prefix = wx;
  }else if(typeof my  !== 'undefined'){
    // 支付宝小程序
    prefix = my;
  }else if(typeof tt  !== 'undefined'){
    // 字节跳动
    prefix = tt;
  }
  return prefix
}


const prefix = getPrefix();

/**
 * 获取图片信息
 * 如果要获取网络图片的信息，需要预先在开发者平台配置 download 的域名白名单
 * https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.getImageInfo.html
 */
prefix['getImageInfo'];

const createSelectorQuery = prefix['createSelectorQuery'];

prefix['createCanvasContext'];

// getImageInfo, 如果要获取网络图片的信息，需要预先在开发者平台配置 download 的域名白名单

const total  = Symbol('total');
const loaded  = Symbol('loaded');
const load  = Symbol('load');
const loadProgressCallback  = Symbol('loadProgressCallback');
const imageMap = Symbol('imageMap');

/**
 * 预加载图片
 * 
 */
class ImgLoader {
	constructor(canvas, imgArr, loadProgressCallback){
    this.canvas = canvas;
		this[total] = imgArr.length;
		this[loaded] = 0;
		this[loadProgressCallback] = loadProgressCallback;
		this[imageMap] = new Map();
		
		// 直接返回一个 Promise
		return new Promise((resolve) => {
			this[load](imgArr, resolve);
		})
	}
	get(id){
		return this[imageMap].get(id)
	}
	[load](imgArr, resolve){
		imgArr.forEach( v => {
      const image = this.canvas.createImage();
      image.onload = () => {
        this[imageMap].set(v.id, {
          path: v.src,
          width: image.width,
          height: image.height,
          image
        });
        this[loaded]++;
					if(this[loadProgressCallback]){
						this[loadProgressCallback](p);
					}
          if((this[loaded] / this[total]) >= 1){
						resolve(this);
          }
      };
      image.src = v.src;
			// getImageInfo({
      //   src: v.src,
      //   success: res => {
			// 		// 为本地图片地址最前主动加上 '/' , 以符合绘图接口的路径规则
      //     if(!PATH_REG.test(v.src)){
      //     	res.path = '/' + res.path
      //     }
      //     this[imageMap].set(v.id, {
      //     	path: res.path,
      //     	width: res.width,
      //     	height: res.height,

      //     })
			// 		this[loaded]++
			// 		if(this[loadProgressCallback]){
			// 			this[loadProgressCallback](p)
			// 		}
      //     if((this[loaded] / this[total]) >= 1){
			// 			resolve(this)
      //     }
      //   }
      // })
		});
		return this
	}
}

/**
 * getPosAfterRotation
 * 获取旋转后的坐标
 * @param {*} rotation 旋转角度
 * @param {*} x 
 * @param {*} y
 * 旋转公式转自 Foundation Actionscript3.0 Animation
 * 第十章“坐标旋转及角度反弹”及第十八章“矩阵数学”
 * 可认为是绕虚拟z轴旋转矩阵 
 * [cos  sin   0]
 * [-sin cos   0]
 * [ 0    0    1]
 * 计算 x 与 y 
 * x = (x * cos + y * -sin)
 * y = (x * sin + y * cos)
 * 得
 * x = Math.cos(angle) * x - Math.sin(angle) * y
 * y =  Math.cos(angle) * y + Math.sin(angle) * x
 *
 */
function getPosAfterRotation(rotation, x, y) {
	const angle = rotation * (Math.PI / 180);
	const _x = Math.cos(angle) * x  - Math.sin(angle) * y;
	const _y = Math.cos(angle) * y + Math.sin(angle) * x;
	return {x: _x , y: _y}
}
/**
 * getMaxValue
 * 获取数组对象中最小x,最大x,最小y，最大y
 * @param {*} arr : [{x:1, y: 1}, {x: 100, y, 100}]
 */
function getMaxValue(arr){
	let minX = arr[0].x;
	let maxX = arr[0].x;
	let minY = arr[0].y;
	let maxY = arr[0].y;

	// 计算最小最大的 x,y 值
	for(var i=1, l = arr.length; i < l; i++){
		if(minX > arr[i].x){
			minX = arr[i].x;
		}
		if(arr[i].x > maxX){
			maxX = arr[i].x;
		}

		if(minY > arr[i].y){
			minY = arr[i].y;
		}
		if(arr[i].y > maxY){
			maxY = arr[i].y;
		}
	}
	return [minX, minY, maxX, maxY]
}

// 递归找到所有子元素深度优先
function findNodes(node, arr = []){
	const l = node.childs.length;
	if(l){
		for(let i=0; i<l; i++){
			if(node.childs[i].childs && node.childs[i].childs.length){
				const nodes = findNodes(node.childs[i]);
				arr.push(node.childs[i]);
				return arr.concat(nodes)
			}else {
				arr.push(node.childs[i]);
			}
		}	
	}else {
		arr.push(node);
	}
	return arr
}

class BeginPath {
	constructor(){}
	exec(ctx) {
		ctx.beginPath();
	}
}

class MoveTo {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition();
		ctx.moveTo(this.x + _x, this.y + _y);	
	}
}

class LineTo {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	exec(ctx, instance){
		let [_x, _y] = instance.getPosition();
		ctx.lineTo(this.x + _x, this.y + _y);	
	}
}

class Arc {
	name = 'Arc'
	constructor(x, y, radius, startAngle, endAngle, anticlockwise){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.startAngle = startAngle;
		this.endAngle = endAngle;
		this.anticlockwise = anticlockwise;
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition();
		ctx.arc(this.x + _x, this.y + _y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
	}
}

class ArcTo {
	name="ArcTo"
	constructor(x1, y1, x2, y2, radius){
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.radius = radius;
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition();
		ctx.arcTo(this.x1 + _x, this.y1 + _y, this.x2 + _x, this.y2 + _y, this.radius);
	}
}

class Stroke {
	exec(ctx){
		ctx.stroke();
	}
}

class Fill {
	exec(ctx){
		ctx.fill();
	}
}

/**
 * 设置样式类
 * 样式可以是 颜色 或 Pattern
 */
class SetFillStyle$1{
	/**
	 * @param {*} style 颜色值，或 Pattern
	 */
	constructor(style){
		this.style = style;
	}
	exec(ctx, instance){
		if(this.style.name === 'CreateLinearGradient' || this.style.name === 'CreateRadialGradient'){
			ctx.fillStyle = this.style.exec(ctx, instance);
		}else {
			ctx.fillStyle = this.style;
		}
	}
}

class SetStrokeStyle{
	constructor(style){
		this.style = style;
	}
	exec(ctx){
		ctx.strokeStyle = this.style;
	}
}

class Clip{
	exec(ctx){
		ctx.clip();
	}
}

/**
 * 二次贝塞尔曲线
 * 提示：二次贝塞尔曲线需要两个点。第一个点是用于二次贝塞尔计算中的控制点，第二个点是曲线的结束点。
 * 曲线的开始点是当前路径中最后一个点。如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点
 */
class QuadraticCurveTo {
  constructor(cpx, cpy, x, y){
    this.cpx = cpx;
		this.cpy = cpy;
		this.x = x;
		this.y = y;
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition();
    ctx.quadraticCurveTo(this.cpx + _x, this.cpy + _y, this.x + _x, this.y + _y);
	}
}

class BezierCurveTo {
  constructor(cp1x, cp1y, cp2x, cp2y, x, y){
    this.cp1x = cp1x;
		this.cp1y = cp1y;
    this.cp2x = cp2x;
		this.cp2y = cp2y;
		this.x = x;
		this.y = y;
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition();
    ctx.bezierCurveTo(this.cp1x + _x, this.cp1y + _y, this.cp2x + _x, this.cp2y + _y, this.x + _x, this.y + _y);
	}
}

class DrawCircle {
	constructor(x, y, radius, fill = false){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.fill = fill;
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition();
		// 要先 beginPath 重新开始 path 以防之前就有开始的路径影响
		ctx.beginPath();
		ctx.arc(this.x + _x, this.y + _y, this.radius, 0, 2 * Math.PI);
		if(instance.isMask){
			ctx.clip();
		}else {
			if(this.fill){
				ctx.fill();
			}
		}
	}
}

class Rect{
	constructor(x, y, w, h, isStroke=false){
		this.x = x;
		this.y = y;
		this.w = w;
    this.h = h;
    this.isStroke = isStroke;
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition();
		const dx = this.x + _x;
		const dy = this.y + _y;
		// 要先 beginPath 重新开始 path 以防之前就有开始的路径影响
		ctx.beginPath();
		if(instance.isMask){
			ctx.rect(dx, dy, this.w, this.h);
			ctx.clip();
		}else {
      if(this.isStroke){
        ctx.strokeRect(dx, dy, this.w, this.h);
      }else {
        ctx.fillRect(dx, dy, this.w, this.h);
      }
		}
	}
}

class RoundRect{
	constructor(x, y, width, height, radius, fill, stroke){
		
		if (typeof stroke === 'undefined') {
			this.stroke = true;
		}else {
			this.stroke = stroke;
		}
		if (typeof radius === 'undefined') {
			radius = 5;
		}
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.fill = fill;
		
		if (typeof radius === 'number') {
			radius = {tl: radius, tr: radius, br: radius, bl: radius};

		}

		const defaultRadius = radius;
		this.radius = {};
		for (let side in defaultRadius) {
			this.radius[side] = this.radius[side] || defaultRadius[side];
		}
		
	}
	exec(ctx, instance){
		// 如果是作为遮罩，则需要获取并参照定位于被遮罩物的坐标
		const [_x, _y] = instance.getPosition();
		let x = _x + this.x,
				y = _y + this.y,
				radius = this.radius,
				width = this.width,
				height = this.height;
		let fill, stroke;
		if(instance.masked){ // instance.isMask
			fill = false;
			stroke = false;
		}else {
			fill = this.fill;
			stroke = this.stroke;
		}
		// 该方法来自 stackoverflow
		ctx.beginPath();
		// ctx.fillStyle = '#ff0000'
		ctx.moveTo(x + radius.tl, y);
		ctx.lineTo(x + width - radius.tr, y);
		// quadraticCurveTo(控制点: cpx, cpy, 终点: x, y)
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
		ctx.lineTo(x + width, y + height - radius.br);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
		ctx.lineTo(x + radius.bl, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
		ctx.lineTo(x, y + radius.tl);
		ctx.quadraticCurveTo(x, y, x + radius.tl, y);
		ctx.closePath();
		if(instance.isMask){
			ctx.clip();
		}else {
			if (fill) {
				ctx.fill();
			}
			if (stroke) {
				ctx.stroke();
			}
		}
	}
}

class ClearRect{
	constructor(x, y, w, h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition();
		ctx.clearRect(this.x + _x, this.y + _y, this.w, this.h);
	}
}

/**
 * lineCap = butt | round | square
 * butt	默认。向线条的每个末端添加平直的边缘。
 * round	向线条的每个末端添加圆形线帽。
 * square	向线条的每个末端添加正方形线帽。
 */
class LineCap {
  constructor(style = 'butt'){
    this.lineCap = style;
  }
  exec(ctx, instance){
		ctx.lineCap = this.lineCap;
	}
}

/**
 * lineJoin = "bevel|round|miter"
 * bevel	创建斜角。
 * round	创建圆角。
 * miter	默认。创建尖角。
 */
class LineJoin {
  constructor(style = 'bevel', miterLimit=10){
    this.lineJoin = style;
    this.miterLimit = miterLimit;
  }
  exec(ctx){
    // miter 与 miterLimit 关系 具体可查看 https://www.w3school.com.cn/tags/canvas_miterlimit.asp
    if(this.miterLimit != 10 && this.style === 'bevel'){
      ctx.miterLimit = this.miterLimit;
    }
    ctx.lineJoin = this.lineJoin;
	}
}

class LineWidth {
  constructor(width = 1){
    this.lineWidth = width;
  }
  exec(ctx, instance){
		ctx.lineWidth = this.lineWidth;
	}
}

class SetLineDash {
  constructor(dash = []){
    this.lineDash = dash;
  }
  exec(ctx, instance){
		ctx.setLineDash(this.lineDash);
	}
}

/**
 * Graphics 绘制类
 * 绘制命令，添加绘制命令集，最终在 draw 方法内集中绘制
 */
class Graphics{
  name = 'Graphics'
  constructor(){
    this[instructions] = [];
  }  	
  // 添加至指令至指令集
	[append](instructionsObject){
		this[instructions].push(instructionsObject);
  }
  // 移除指令
  [remove](instructionName){
    this[instructions] = this[instructions].filter( v => {
      return v.name !== instructionName
    });
  }
  // 绘制时执行所有当前文本
  [drawGraphics](ctx){
    this[instructions].forEach((instruction) => {
			instruction.exec(ctx, this);
		});
  }
  /**
   * 命令方法名与 w3c 一致
   */
  graphics = {
    beginPath: () => {
      this[append](new BeginPath());
      return this.graphics
    },
    moveTo: (x, y) => {
      this[append](new MoveTo(x, y));
      return this.graphics
    },
    setLineDash: (dash) => {
      this[append](new SetLineDash(dash));
      return this.graphics
    },
    lineWidth: (width) => {
      this[append](new LineWidth(width));
      return this.graphics
    },
    lineCap: (style)=> {
      this[append](new LineCap(style));
      return this.graphics
    },
    lineJoin: (style)=> {
      this[append](new LineJoin(style));
      return this.graphics
    },
    lineTo: (x, y)=> {
      this[append](new LineTo(x, y));
      return this.graphics
    },
    quadraticCurveTo: (cpx, cpy, x, y)=> {
      this[append](new QuadraticCurveTo(cpx, cpy, x, y));
      return this.graphics
    },
    bezierCurveTo: (cp1x, cp1y, cp2x, cp2y, x, y)=> {
      this[append](new BezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y));
      return this.graphics
    },
    /**
     画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
     从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
     */
    arc: (x, y, radius, startAngle, endAngle, anticlockwise = false)=> {
			this[remove]('Arc');
      this[append](new Arc(x, y, radius, startAngle, endAngle, anticlockwise));
      return this.graphics
    },
    /**
     根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点
     */
    arcTo: (x1, y1, x2, y2, radius)=> {
			this[remove]('ArcTo');
      this[append](new ArcTo(x1, y1, x2, y2, radius));
      return this.graphics
    },
    stroke: ()=> {
      this[append](new Stroke());
      return this.graphics
    },
    fill: ()=> {
      this[append](new Fill());
      return this.graphics
    },
    fillStyle: (style)=> {
      this[append](new SetFillStyle$1(style));
      return this.graphics
    },
    strokeStyle: (style)=> {
      this[append](new SetStrokeStyle(style));
      return this.graphics
    },
    fillCircle: (x = 0, y = 0, radius = 20)=> {
      this[append](new DrawCircle(x, y, radius, true));
      return this.graphics
    },
    strokeCircle: (x = 0, y = 0, radius = 20)=> {
      this[append](new DrawCircle(x, y, radius));
      this[append](new Stroke());
      return this.graphics
    },
    fillRect: (x = 0, y = 0, w = 10, h = 20)=> {
      this[append](new Rect(x, y, w, h));
      return this.graphics
    },
    /**
     * 画一个矩形(非填充)。 用 strokeStyle 设置矩形线条的颜色，如果没设置默认是黑色
     */
    strokeRect: (x = 0, y = 0, w = 10, h = 20)=> {
      this[append](new Rect(x,y,w,h, true));
      this[append](new Stroke());
      return this.graphics
    },
    fillRoundRect: (x = 0, y = 0, w = 10, h = 10, radius = 8, fill, stroke)=> {
      this[append](new RoundRect(x, y, w, h, radius, fill, stroke));
      return this.graphics
    },
    strokeRoundRect: (x, y, w, h, radius) => {
      this[append](new RoundRect(x, y, w, h, radius, false, true));
      this[append](new Stroke());
      return this.graphics
    },
    /**
     * 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容的方
     */
    clearRect: (x, y, w, h)=> {
      this[append](new ClearRect(x, y, w, h));
      return this.graphics
    },
    clip: () => {
      this[append](new Clip());
      return this.graphics
    }
  }
}

let context = null;
let displayObjectId = 0;
const id = Symbol('id');
const scale = Symbol('scale');
const mask = Symbol('mask');


const setShadow = Symbol('setShadow');


/**
 * 显示对象类
 */

class DisplayObject  extends Graphics{
	name = 'DisplayObject'
	x = 0
	y = 0
	width = 0
	height = 0
	alpha = 1
	regX = 0
	regY = 0
	scaleX = 1
	scaleY = 1
	rotation = 0
	parent = null
	childs = []
	shadow = ''
	constructor(){
		super();
		this[drawGraphics] = super[drawGraphics];
		this[scale] = 1;
		this[id] = displayObjectId++;
	}
	get mask(){
		return this[mask]
	}
	set mask(s){
		if(s.name !== 'Shape'){
			throw new Error('遮罩必须是 Shape 对象')
		}
		s.isMask = true;
		this[mask] = s;
	}
	get scale(){
		return this[scale]
	}
	set scale(s) {
		this.scaleX = s;
		this.scaleY = s;
		this[scale] = s;
	}
	
	/**
	 * 保存 Stage 时传入 canvas context
	 */
	static setContext(ctx){
		context = ctx;
	}
	static getContext(){
		return context
	}
	// 添加子元素
	addChild(...args){
		// 指定父级
		const childs = args.map((v, index) => {
			if(v[id] === this[id]){
				throw new Error(`不能自己添加自己为 child :${v.name}`)
			}else if(v.isMask){
				throw new Error(`已被设置成 mask 遮罩 不能 addChild 到其它父级内:${v.name}`)
			}
			// 如果添加的对象有 mask 遮罩则 mask 也指定父级，以对应对象的坐标
			if(v.mask){
				v.mask.parent = this;
			}
			v.parent = this;
			v.zIndex = index;
			return v
		});
		
		this.childs = this.childs.concat(childs);
	}
	// 删除子元素
	removeChild(child){
		this.childs = this.childs.filter( v =>  v[id] != child[id]);
	}
	// 绘制
	[draw](){
		// 执行绘制 graphics 指令
		this[drawGraphics](context);
		
		this.childs.forEach((v)=>{
			// 绘制前压栈
			context.save();
			// canvas 上下文 context 先 transform 
			this.transform(v, context);
			

			// 设置投影
			if(v.shadow.length){
				this[setShadow](v);
			}

			// 设置 alpha 透明度
			context.globalAlpha = this[getAlpha]();
			context.rotate(0);
			// 递归绘制
			v[draw](context);
			// 绘制完后弹栈
			context.restore();

			// context.setTransform(1, 0, 0, 1, 0, 0) 重置上下文向量坐标
			// 调试显示可视对象边界线用于调试
			
			// if(!v.sliced){
			// 	const b = v.getBounds()
			// 	context.beginPath();
			// 	context.strokeStyle = 'blue'
			// 	context.strokeRect(b.left,b.top,b.width,b.height);
			// }
		});
	}
	/**
	 * setShadow
	 * 添加阴影效果， 遮罩(clip)过的对象不支持 shadow 效果
	 * @param {*} shadow "10 10 10 black"
	 */
	[setShadow](el){
		const valueArr = el.shadow.split(' ');
		if(el.name === 'Sprite' || el.name === 'Group'){
			throw new Error('Sprite 或 Group 组件对象不允许设置 shadow')
		}
		if(valueArr.length < 4){
			throw new Error('shadow 需要 4 个值 eg: "10 10 10 black"')
		}
		context.shadowOffsetX = valueArr[0];
		context.shadowOffsetY = valueArr[1];
		context.shadowBlur = valueArr[2];
		context.shadowColor = valueArr[3];
	}
	/**
	 * 获取元素透明度
	 */
	[getAlpha](){
		let parent = this.parent;
		let alpha = this.alpha;
		while(parent && parent.name != 'Stage'){
			alpha *= parent.alpha;
			parent = parent.parent;
		}
		return alpha
	}
	/**
	 * getPosition 获取实例距画布左上角原点(0,0)的绝对位置
	 * @return {[x, y]} 返回数组
	 */
	getPosition(){
		let parent;
		// 如果自身是 mask 则坐标取被遮罩的对象为父级
		if(this.masked){
			parent = this.masked;
		}else {
			parent = this.parent;
		}
		let x = this.x - this.regX, y = this.y - this.regY;
		// console.log(x)
		while(parent && parent.name != 'Stage'){
			x += parent.x - parent.regX;
			y += parent.y - parent.regY;
			parent = parent.parent;
		}
		return [x, y]
	}
	/**
	 * 获取旋转角度
	 */
	getRotation(){
		// 角度不需要根据父级计算叠加
		// let parent = this.parent
		let rotation = this.rotation;
		// while(parent && parent.name != 'Stage'){
		// 	rotation = parent.rotation
		// 	parent = parent.parent
		// }
		return rotation
	}
	/**
	 * 获取缩放程度
	 */
	getScale(){
		let parent = this.parent;
		let scaleX = this.scaleX;
		let scaleY = this.scaleY;
		while(parent && parent.name != 'Stage'){
			scaleX += parent.scaleX;
			scaleY += parent.scaleY;
			parent = parent.parent;
		}
		return [scaleX, scaleY]
	}
	/**
	 * 先形变后再绘制
	 * 移动、缩放、旋转 canvas
	 */
	transform(v, context){
		if(v.name === 'Stage') return
		const ctx = context;
		const [_x, _y] = v.getPosition();
		const rotation = v.getRotation();
		let [scaleX, scaleY] = [v.scaleX, v.scaleY];
		const regPointerX = _x + v.regX;
		const regPointerY = _y + v.regY;
		// 变形过程顺序必须为先移动位置，再放大缩小或旋转
		// 再移动回原来的位置
		ctx.translate(regPointerX, regPointerY);
		ctx.scale(scaleX, scaleY);
		ctx.rotate(rotation * Math.PI / 180);
		ctx.translate(-regPointerX, -regPointerY);	
		// return [_x, _y, rotation, regPointerX, regPointerY, scaleX, scaleY]
		return this
	}

	getRectangleRotatedPosition(rotation, w, h, regX, regY){
		// 获取左上、右上、右下，左下绕自身注册点旋转后的坐标
		// left top
		let lt = getPosAfterRotation(rotation, -regX,  -regY);
		// right top
		let rt = getPosAfterRotation(rotation, w - regX,  -regY);
		// right bottom
		let rb = getPosAfterRotation(rotation, w - regX, h - regY);
		// left bottom
		let lb = getPosAfterRotation(rotation, -regX, h - regY);
		
		return [lt, rt, rb, lb]
	}
	/**
	 * 获取对象形变后的相较于舞台的绝对位置与宽度
	 * scale 形变不在 getBounds 计算之内
	 * scale 形变后宽高可请自行乘上相应的 scale 倍数
	 */
	_getBounds(){
		let [x, y] = this.getPosition();
		let w = this.width;
		let h = this.height;
		let regX = this.regX;
		let regY = this.regY;
		
		if(this.rotation !== 0){
			const arr = this.getRectangleRotatedPosition(this.rotation, w, h, regX, regY);
			// 相对坐标+原本的 x y 值成为绝对坐标
			arr.map( v =>{
				return {...v, x: v.x + x + regX, y: v.y + y + regY}
			});
			
			// 获取最左，最右，最上最下 坐标
			let [minX, minY, maxX, maxY] = getMaxValue(arr);
			w = maxX - minX;
			h = maxY - minY;
			x = minX;
			y = minY;
		}else {
			// 如果对象没有旋转，则简单获取对象的 x y
			x = x;
			y = y;
		}

		return {left: x, top: y, right: x + w, bottom: y + h, width: w, height: h}
	}
	// 寻找所有子元素的 bounds 边界宽高并存入数组
	findNodesBounds(node){
		return findNodes(node).map( v => {
			return v._getBounds()
		})
	}
	// 获取元素的绝对宽度
	getBounds(){
		// 如果没有子元素，则直接返回自身的宽度
		if(this.childs.length === 0){
			return this._getBounds()
		}else {
			if(this.childs){
				let bounds = this.findNodesBounds(this);
				
				const l = [];
				const r = [];
				const t = [];
				const b = [];
				bounds.forEach((v)=>{
					l.push(v.left);
					r.push(v.right);
					t.push(v.top);
					b.push(v.bottom);
				});
			
				const left = Math.min(...l);
				const right = Math.max(...r);
				const top = Math.min(...t);
				const bottom = Math.max(...b);
				
				if(this.name === 'Group'){
					// 计算子元素合并宽高后，再继续计算整体旋转后的大小位置
					const rect = new DisplayObject();
					rect.width = right - left;
					rect.height = bottom - top;
					rect.x = this.x;
					rect.y = this.y;
					rect.regX = this.regX;
					rect.regY = this.regY;
					rect.rotation = this.rotation;
					return this._getBounds.call(rect)
				}else {
					return {left, top, right, bottom, width: right - left, height: bottom - top}
				}
			}
		}
	}
}

const _width$2 = Symbol('width');
const _height$2 = Symbol('height');
const _display = Symbol('_display');
const _alignItems$1 = Symbol('_alignItems');
const _justifyContent$1 = Symbol('_justifyContent');
/**
 * Group 组
 * 可添加多个显示对象进 Group 内，变成一个显示组，可集中对 Group 组操作
 */
class Group extends DisplayObject{
	name = 'Group'
	constructor(context){
		super();
	}
	set width(v){
		this[_width$2] = v;
	}
	get width(){
		return this[_width$2]
	}
	set height(v){
		this[_height$2] = v;
	}
	get height(){
		return this[_height$2]
	}
	get display(){
		return this[_display]
	}
	set display(v){
		this[_display] = v;
	}
	get alignItems(){
		return this[_alignItems$1]
	}
	set alignItems(v){
		this[_alignItems$1] = v;
	}
	get justifyContent(){
		return this[_justifyContent$1]
	}
	set justifyContent(v){
		this[_justifyContent$1] = v;
	}
}

const render = Symbol('render');
/**
 * Stage
 * 舞台对象
 * 所有显示对象都在舞台对象下，舞台通过渲染函数 
 * Stage 的 render 发起所有子元素的 draw 方法调用
 * 子元素自身再递归调用子元素 draw 方法
 */
class Stage extends DisplayObject {
	/**
	 * 
	 * @param {*} id canvas id
	 * @param {*} callback 初始化舞台后的回调
	 * @param {*} componentInstance 如果是在自定义组件内，则需要将组件实例 this 传进来
	 */
	constructor(id, {width, height}, componentInstance) {
	  super();
    return new Promise((resolve) => {
      const query = componentInstance ? createSelectorQuery().in(componentInstance) : createSelectorQuery();
			
      query.select(id) 
      .node(async ({node}) => {
        const canvas = node;
          const context = canvas.getContext('2d');
          const canvasWidth = width;
          const canvasHeight = height;
          context.canvas.width = canvasWidth;
          context.canvas.height = canvasHeight;
          this.width = canvasWidth;
          this.height = canvasHeight;
          this.context = context;
          this.canvas = canvas;
          DisplayObject.setContext(this.context);	
          // await callback(this, canvas, this.context)
          // // 自动调用一次渲染
          // this[render]()
          resolve(this);
      })
      .exec();
    })
	}
	name = 'Stage'
	canvas = null
	/**
	 * 获取 canvas 上下文
	 */
	getContext(){
		return this.context
	}
	/**
	 * 重新渲染舞台
	 */
	update(){
		this[render]();
	}
	[render](){
		this.context.clearRect(0, 0, this.width, this.height);
		// 调用 canvas draw 方法渲染图像
		this[draw]();
	}
}

// 旋转 90 弧度 直接得出常数 (90 * Math.PI / 180) 免于实时计算
const ROTATE_90DEG = 1.5707963267948966;
// 需要旋转的 Unicode 码范围, 如中、日、韩文字
const NO_ROTATION_RANGE = [
  [0x2E80, 0x2FEF],
  [0x3040, 0x9FFF],
  [0xAC00, 0xD7FF],
  [0xF900, 0xFAFF],
  [0x1D300, 0x1D35F],
  [0x20000, 0x2FA1F]
];

function needRotation (char) {
  let codePoint = char.codePointAt(0);
  for (let [lowerBound, upperBound] of NO_ROTATION_RANGE) {
    if (lowerBound <= codePoint && codePoint <= upperBound) {
      return false
    }
  }
  return true
}
/**
 *  文本绘制命令
 */
class FillText {
	instance = null
	name = 'FillText'
	constructor (text, x, y) {
		this.text = text;
		this.x  = x;
		this.y = y;
	}
	exec(ctx, instance){
		this.instance = instance;
		const [x, y] = instance.getPosition();
		
		ctx.font = instance.font;
		if(instance.writeMode === 'vertical-rl' || instance.writeMode === 'vertical-lr' ){
			// 文字竖排从右向左
			this.vertical(ctx, x, y);
		}else if(instance.wrapWidth > -1){
			// 如果设置了文本框宽度，则需要判断是否显示成多行
			let textArr = this.getTextArr(ctx, instance, this.text);
			let h = 0;
			for(let i=0,l=textArr.length; i<l; i++){
				h = y + (i * (instance.fontSize + instance.lineGap));
				ctx.fillText(textArr[i], x, h);
			}
		}else {
			ctx.fillText(this.text, x, y);
		}
	}
	/**
	 * getTextArr 多行时计算每行显示多少个字符
	 */
	getTextArr(ctx, instance, text){
		const wrapWidth = instance.wrapWidth;

		let i = 0, j= 0, t = null, lineWidth = 0;
		let arr = [];
		while(t=text[i]){
			// 根据每个单字计算字符宽度
			lineWidth += ctx.measureText(t).width;
			if(lineWidth <= wrapWidth){
				arr[j] ? arr[j] += text[i] : arr[j] = text[i];
			}else {
				lineWidth = 0;
				j++;
			}
			i++;
		}
		return arr
	}
	// 文本竖排
	vertical(ctx, x, y){
		const textArr = this.text.split('');
		const verticalLineWidth = this.instance.fontSize + this.instance.lineGap;
		const lineWidth = this.instance.writeMode === 'vertical-rl' ? -verticalLineWidth : verticalLineWidth;
		const fontSize = this.instance.fontSize;
		const fontSizeHalf = fontSize * .5;
		let offsetY = 0;
		let offsetX = 0;
		const wrapHeight = this.instance.wrapHeight;
		
		textArr.map( (t) => {
			if(needRotation(t)){	
				// 如果竖直文本大于限制高度，x 轴则向左或向右移一行
				if(wrapHeight > -1 && offsetY + y + fontSizeHalf > wrapHeight + y){
					offsetX += lineWidth;
					offsetY = 0;
				}
				
				const left = x + offsetX + fontSizeHalf;
				const top = y + offsetY + fontSizeHalf;
				ctx.save();
				ctx.translate(left , top);
				ctx.rotate(ROTATE_90DEG);
				ctx.translate(-left, -top);	
				// x 和 y 此处要和正常没旋转时的文本一样对待
				ctx.fillText(t, x + offsetX,  y + offsetY);
				offsetY += fontSizeHalf;
				ctx.restore();
			}else {
				// 如果竖直文本大于限制高度，x 轴则向左移一行
				if(wrapHeight > -1 && offsetY + y + fontSize > wrapHeight + y){
					offsetX += lineWidth;
					offsetY = 0;
				}
				ctx.fillText(t, x + offsetX, y + offsetY);
				offsetY += fontSize;
			}
		});
	}
}

class SetFillStyle {
  constructor(style){
    this.style = style;
  }
  exec(ctx){
    ctx.fillStyle = this.style;
  }
}

class SetTextAlign {
  constructor(textAlign){
    this.textAlign = textAlign;
  }
  exec(ctx){
    ctx.textAlign = this.textAlign;
  }
}

class SetTextBaseline {
  constructor(textBaseline){
    this.textBaseline = textBaseline;
  }
  exec(ctx){
    ctx.textBaseline = this.textBaseline;
  }
}

/**
 * 文本类
 */

const _text = Symbol('_text');
const _width$1 = Symbol('_width');
const _height$1 = Symbol('_height');
const _fontSize = Symbol('_fontSize');
const _wrapWidth = Symbol('_wrapWidth');
const _wrapHeight = Symbol('_wrapHeight');
const _writeMode = Symbol('_writeMode');

const defaultFontSize = 10;

/**
 * Text 文本类
 * 显示文本，支持横、竖排文字，换行
 */
class Text extends DisplayObject {
	name = 'Text'
	// 多行文本时的行距
	lineGap = 0
	// 当前字体样式的属性。符合 CSS font 语法 的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif
	font = `${defaultFontSize}px sans-serif`
	constructor(t){
		super();
		this[drawGraphics] = super[drawGraphics];
		this.init(t);
	}
	init(t = {}){
		let { text, font, color, fontSize } = t;
		this[_writeMode] = '';
		if(font){
			this.font = font;
			let fontSize = font.match(/\d+/)?.[0];
			if(fontSize){
				this.fontSize = parseInt(fontSize);
				this[_height$1] = this.fontSize + this.lineGap;
			}
		}
		if(fontSize){
			this.font = `${fontSize}px sans-serif`;
			this.fontSize = parseInt(fontSize);
			this[_height$1] = fontSize  + this.lineGap;
		}
		if(!this.fontSize){
			this.fontSize = defaultFontSize;
		}
		if(color){
			this.color = color;
		}
		this.textAlign = 'left';
		this.textBaseline = 'top';
		this[_text] = '';
		// 初始化就设置文本
		if(text){
			this.text = text;
		}
	}
	get text(){
		return this[_text]
	}
	set text(t){
		t = String(t);
		this[_text] = t;
		this[_width$1] = this.measureWidth(t, this.fontSize);
		this[_height$1] = this.fontSize;
	}
	get width(){
		console.log(this[_width$1], 6666);
		return this[_width$1]
	}
	set width(w){
		this[_width$1] = w;
	}
	get height(){
		return this[_height$1]
	}
	set height(h){
		this[_height$1] = h;
	}
	/**
	 * 限制文本框高度
	 * 超过设置的高度则文本换行
	 */
	get wrapHeight(){
		return this[_wrapHeight]
	}
	set wrapHeight(v){
		this[_wrapHeight] = v;
		this[_height$1] = v;
		this.initVerticalSize();
	}
	/**
	 * 限制文本框宽度
	 * 超过设置的宽度则文本换行
	 */
	get wrapWidth(){
		return this[_wrapWidth]
	}
	set wrapWidth(v){
		this[_wrapWidth] = v;
		this[_width$1] = v;
		this[_height$1] = this.getHeightByWrapWidth();
	}
	/**
	 * 设置字体大小
	 */
	get fontSize(){
		return this[_fontSize]
	}
	set fontSize(v){
		this[_fontSize] = v;
		this.font = `${this[_fontSize]}px sans-serif`;
		this[_width$1] = this.measureWidth(this.text, v);
		this[_height$1] = v  + this.lineGap;
		console.log(44444, this.font, this[_width$1]);
	}
	/**
	 * 文本横排与竖排模式
	 */
	get writeMode(){
		return this[_writeMode]
	}
	set writeMode(v){
		this[_writeMode] = v;
		if(v.length > 0){
			this.initVerticalSize();
		}
	}
	/**
	 * 整理文本状态
	 */
	collectStatus(){
		if(this.fontSize){
			this.font = `${this.fontSize}px sans-serif`;
			this[_height$1] = this.fontSize  + this.lineGap;
		}
		this.setTextAlign(this.textAlign);
		this.setTextBaseline(this.textBaseline);
		this.setFillStyle(this.color);
		this.fillText(this[_text]);
	}
	// 执行指令集
	[draw](ctx){
		this.collectStatus();
		// 优先执行 graphics 指令
		this[drawGraphics](ctx);
		if(this.mask && this.mask.name === 'Shape'){
			this.mask.masked = this;
			this.mask[draw](ctx, true);
		}
	}
	/**
	 * setFillStyle 设置文本颜色
	 * @param {String} color [description]
	 */
	setFillStyle(color='black'){
		this.color = color;
		this[append](new SetFillStyle(color));
		return this
	}
	fillStyle(color){
		return this.setFillStyle(color)
	}
	/**
	 * fillText 绘制文本
	 * @param  {String} text 
	 * @param  {Number} x    
	 * @param  {Number} y    
	 */
	fillText(text, x = 0, y = 0) {
		this[_text] = text;
		this.x += x;
		this.y += y;
		this[_width$1] = this.measureWidth(this[_text], this.fontSize);
		// 如果之前有fillText,则需要先清一下之前填文本的命令
		this[remove]('FillText');
		// !! 注意 fillText 方法不能放在 setTimeout 或 setInterval 内
		// !! 因为会错过画布更新
		this[append](new FillText(text, this.x, this.y));	
		return this
	}
	/**
	 * setFont 设置字体样式
	 * @param { String } font 填单独某一项无效，必须填字号与字体family
	 * eg1: 'italic 12px sans-serif'
	 * eg2: '12px sans-serif'
	 */
	setFont(font){
		this.font = font;
		return this
	}
	/**
	 * setFontSize 设置字体大小
	 * @param {Number} size 不带单位，全部按 px 算
	 */
	setFontSize(size) {
		this.fontSize = size;
		this.font = this.font.replace(/\d+/, size);
		if(this.fontSize){
			this.font = `${this.fontSize}px sans-serif`;
			this[_height$1] = this.fontSize  + this.lineGap;
		}
		return this
	}
	/**
	 * setTextBaseline 设置文字垂直对齐方式，推荐 top 顶部对齐比较好算
	 * @param { String } textBaseline top	顶部对齐	 bottom	底部对齐	middle	居中对齐	normal 默认（基线对齐）
	 */
	setTextBaseline(textBaseline) {
		this.textBaseline = textBaseline;
		this[append](new SetTextBaseline(textBaseline));
		return this
	}
	/**
	 * [setTextAlign 设置文本水平对齐方式]
	 * @param { String } textAlign [left, center, right]
	 */
	setTextAlign(textAlign) {
		this.textAlign = textAlign;
		this[append](new SetTextAlign(textAlign));
		return this
	}
	/**
	 * setlineGap 设置多文本时文本行垂直间距
	 * @param { Number } h 相比使用行距，直接使用间距设置比较方便计算
	 */
	setlineGap(h){
		this.lineGap = h;
		return this
	}
	/**
	 * 设置文本框宽度
	 * @param {*} w 
	 */
	setWrapWidth(w){
		this.wrapWidth = w;
		this[_width$1] = w;
		return this
	}
	/**
	 * 设置文本框高度
	 * @param {*} h 
	 */
	setWrapHeight(h){
		this.wrapHeight = h;
		return this
	}
	/**
	 * 计算文本宽度
	 * @param {*} text 
	 * @param {*} fontSize 
	 */
	measureWidth(text, fontSize){
		let w;
		if(!text){
			return 0
		}
		text.length;
		if(this.writeMode.length){
			w = fontSize;
		}else {
			const ctx = DisplayObject.getContext();
			// 测宽度前必须先设置字体大小
			ctx.font = this.font;
			w = ctx.measureText(text).width;
		}
		return w
	}
	// 初始化竖排文本时的整体宽与高属性
	initVerticalSize(){
		if(this.text.length){
			const { width,  height} = this.getVerticalSize();
			this[_width$1] = width;
			this[_height$1] = height;
		}
	}	
	// 计算竖排文本时的整体文本宽,高
	getVerticalSize(){
		const fontSize = this.fontSize; 
		const lineGap = this.lineGap;
		const wrapHeight = this.wrapHeight;
		const halfFont = fontSize * .5;
		let h = 0;
		let height = 0;
		let width = 0;
		let offset = 0;
		// 二维数组存放每个字文本与文本高度信息
		let arr = [];
		// 二维数组游标，可代表当前指向哪一行
		let arrIndex = 0;
		
		// 计算每个字高度
		this.text.split('').map((v)=>{
			let charHeight = 0;
			if(needRotation(v)){
				charHeight = halfFont + lineGap;
			}else {	
				charHeight = fontSize + lineGap;
			}
			h += charHeight;
			offset += charHeight;
			if(offset > (wrapHeight)){
				arrIndex++;
				offset = 0;
			}
			arr[arrIndex] = arr[arrIndex] || [];
			arr[arrIndex].push({text: v, height: charHeight});
		});
		if(wrapHeight){
			height = wrapHeight;
			width = arr.length * fontSize + (arr.length * lineGap - lineGap);
		}else {
			width = fontSize;
			height = h;
		}
		// 可优化点，此处计算出的文本单字可以直接用于 fillText 类内
		return {width, height}
	}
	// 获取受限宽度下的文本整体高度，因为有可能会换行
	getHeightByWrapWidth(){
		const ctx = DisplayObject.getContext();
		const wrapWidth = this.wrapWidth;
		const fontSize = this.fontSize; 
		const text = this.text;
		let i = 0, j= 0, t = null, lineWidth = 0;
		let arr = [];
		
		while(t=text[i]){
			// 根据每个单字计算字符宽度 !! 需要优化
			lineWidth += ctx.measureText(t).width * (fontSize / defaultFontSize);
			if(lineWidth <= wrapWidth){
				arr[j] ? arr[j] += text[i] : arr[j] = text[i];
			}else {
				lineWidth = 0;
				j++;
			}
			i++;
		}
		// todo: 可优化点，此处计算出的文本单字可以直接用于 fillText 类内
		// 高度 = 文本行数 * 字体大小 + 行间距
		return this.height = arr.length * fontSize + (arr.length * this.lineGap - this.lineGap)
	}
	addChild(){
		throw new Error('不能给 Text 类添加子元素')
	}
}

/**
 * Shape 图形类
 * 1、包含了各类绘制 api
 * 2、Shape 对象内 通过 graphics 对象可以绘制无限个图形
 * 3、所有绘制 api 命令都存在于 graphics 对象内， graphics 绘制在 Shape 对象内不参与 z 轴排序
 * 
 */

class Shape extends DisplayObject{
	name = 'Shape'
	isMask = false
	width = 0
	height = 0
	constructor(){
		super();
		this[drawGraphics] = super[drawGraphics];
		
		// 新建一个shape对象时先执行beginPath命令，以重新开始 path 上下文
		this.graphics.beginPath();
	}
	[draw](ctx, isMask){
		// shape 是否为遮罩
		this.isMask = !!isMask;

		// 设置透明度
		ctx.globalAlpha = this[getAlpha]();

		// 执行所有命令
		this[drawGraphics](ctx);
	}
	getBounds(){
		console.error('Shape 不提供getBounds方法');
		return null
	}
}

const extendsClassDraw$2 = Symbol('extendsClassDraw');

/**
 * 解构圆角矩形值生成:  { tl: 0, tr: 0, br: 0, bl: 0 }
 * @param {*} value 
 */
function getChangedBorderRadiusValue(value){
	let borderRadiusValue;
  const roundCorner = { tl: 0, tr: 0, br: 0, bl: 0 };
	value = String(value).split(' ').map(v => parseFloat(v));
	const valueLength = value.length;
	if(valueLength === 1){
		borderRadiusValue = value[0];
	}else if(valueLength === 2){
		roundCorner.tl = roundCorner.br = value[0];
		roundCorner.tr = roundCorner.bl = value[1];
		borderRadiusValue = roundCorner;
	}else if(valueLength === 3){
		roundCorner.tl = value[0];
		roundCorner.br = value[2];
		roundCorner.tr = roundCorner.bl = value[1];
		borderRadiusValue = roundCorner;
	}else if(valueLength === 4){
		roundCorner.tl = value[0];
		roundCorner.tr = value[1];
		roundCorner.br = value[2];
		roundCorner.bl = value[3];
		borderRadiusValue = roundCorner;
	}
	return borderRadiusValue
}

// 仅支持二种风格的边框
const BORDER_STYLES = ['solid', 'dashed'];

/**
 * SimpleCss 
 * 样式类
 */
class SimpleCss extends DisplayObject {
	backgroundColor = ''
	border = ''
	borderTop = ''
	borderRight = ''
	borderBottom = ''
	borderLeft = ''
	/**
	 * 左边显示成半圆
	 */
	borderLeftRound = false
	/**
	 * 右边显示成半圆
	 */
	borderRightRound = false

  borderRadiusValue = ''
	/**
	 * 1、borderRadius 值设置请参与 css3 的 border-radius 属性;
	 * eg1: 10
	 * eg2: '10 20'
	 * eg3: '10 20 10'
	 * eg4: '10, 20, 30, 40'
	 * 
	 * 2、borderRadius设置为 '100%'，则认为是圆形遮罩
	 * eg: '100%'
	 */
	get borderRadius(){
		return this.borderRadiusValue
	}
	set borderRadius(value){
		if(!value) return
		if(value != '100%'){
			this.borderRadiusValue = getChangedBorderRadiusValue(value);
		}else {
			this.borderRadiusValue = value;
		}
	}
  constructor () {
    super();
    this[extendsClassDraw$2] = super[draw];
	}
	/**
	 * 绘制接口
	 * @param {*} ctx 
	 */
  [draw](ctx){
		
    // 如果设置了 borderRadius 值则需要使用遮罩实现圆角
		if(this.borderRadiusValue || this.borderLeftRound || this.borderRightRound){
			this.initBorderRadiusMask();
    }
		
		// 绘制背景
    if(this.backgroundColor){
      this.initBackgroundColor();
		}

		// 绘制边框
		if(this.border || this.borderTop || this.borderRight || this.borderBottom || this.borderLeft){
			this.initBorder();
		}

		// 遮罩，主要用于显示圆角及圆
		if(this.mask){
			if(this.mask.name === 'Shape'){
				// 遮罩层不参与显示所以也没有父级元素
        this.mask.masked = this;
        this.mask[draw](ctx, true);
			}
    }
		// 重载 DisplayObject draw 
		// 调用 显示对象绘制方法
    this[extendsClassDraw$2](ctx);
	}
	/**
	 * 解构边框线值字符串
	 * @param {*} border 
	 */
	getBorderAttr(border){
		let [ borderWidth, borderStyle, borderColor] = border.split(' ');
		borderWidth = parseFloat(borderWidth);
		if(BORDER_STYLES.indexOf(borderStyle) < 0){
			console.warn('不支持的边框样式');
		}
		
		return [ borderWidth, borderStyle, borderColor ]
	}
	/**
	 * 设置边框样宽，样式，颜色
	 * @param {*} borderWidth 
	 * @param {*} borderStyle 
	 * @param {*} borderColor 
	 */
	setBorderStyles(borderWidth, borderStyle, borderColor){
		this.graphics.beginPath();
		if(borderStyle === 'dashed'){
			this.graphics.setLineDash([borderWidth,borderWidth]);
		}
		// 边框都是向内画
		this.graphics.lineWidth(borderWidth)
		.strokeStyle(borderColor);
	}
	/**
	 * 生成水平半圆角矩形路径
	 * 当 borderRadius 值超过元素高度 height 时，表示左右显示成半圆
	 * @param {*} width 
	 * @param {*} height 
	 */
	getHorizontalRoundRectPath(width, height){
		const s = new Shape();
		const radius = height * .5;
		s.graphics.beginPath()
		.fillStyle('#ff00ff')
		.arc(radius, radius, radius, Math.PI * .5, Math.PI * 1.5)
		.lineTo(width - radius, 0)
		.arc(width - radius, radius, radius, Math.PI * 1.5, Math.PI * 2.5)
		.lineTo(radius, height);
		return s
	}
	getLeftRoundRectPath(width, height){
		const s = new Shape();
		const radius = height * .5;
		s.graphics.beginPath()
		// .fillStyle('#ff00ff')
		.arc(radius, radius, radius, Math.PI * .5, Math.PI * 1.5)
		.lineTo(width, 0)
		.lineTo(width, height)
		.lineTo(radius, height);
		return s
	}
	getRightRoundRectPath(width, height){
		const s = new Shape();
		const radius = height * .5;
		s.graphics.beginPath()
		// .fillStyle('#ff00ff')
		.moveTo(0, 0)
		.lineTo(width - radius, 0)
		.arc(width - radius, radius, radius, Math.PI * 1.5, Math.PI * 2.5)
		.lineTo(0, height);
		return s
	}
	/**
	 * 生成垂直半圆角矩形路径
	 * 当 borderRadius 值超过元素宽度 width 时，表示上高显示成半圆
	 * @param {*} width 
	 * @param {*} height 
	 */
	getVerticalRoundRectPath(width, height){
		const s = new Shape();
		const radius = width * .5;
		s.graphics.beginPath()
		.arc(radius, radius, radius, Math.PI, Math.PI * 2)
		.lineTo(width, height - radius)
		.arc(radius, height - radius, radius, 0, Math.PI)
		.lineTo(0, radius);
		return s
	}
	/**
	 * 初始化边框线
	 */
	initBorder(){
		// 四边都有边框
		if(this.border){
			const [ borderWidth, borderStyle, borderColor ] = this.getBorderAttr(this.border);
			this.setBorderStyles(borderWidth, borderStyle, borderColor);
			const halfBorderWidth = borderWidth * .5;
			// 如果有圆角属性，则需要画圆角边框
			if(this.borderRadius){
				let s;
				// 值为100%或值等于宽高值，且宽高相等时 表示显示想要显示成圆形
				if((this.borderRadius === '100%' || this.borderRadius === this.width) && (this.width === this.height)){
					s = new Shape();
					const radius = this.width * .5;
					s.graphics.strokeCircle(radius, radius, radius);
				}else if(this.borderRadius >= this.height){
					// 提交简易方法生成左右两边半圆角路径
					s = this.getHorizontalRoundRectPath(this.width, this.height);
					s.graphics.stroke();
				}else if(this.borderRadius >= this.width){
					// 提交简易方法生成上下两边半圆角路径
					s = this.getVerticalRoundRectPath(this.width, this.height);
					s.graphics.stroke();
				}else {
					s = new Shape();
					s.graphics.strokeRoundRect(0, 0, this.width, this.height, this.borderRadius);
				}
				this.addChild(s);
			}else {
				this.graphics.strokeRect(halfBorderWidth, halfBorderWidth, this.width - borderWidth, this.height - borderWidth);
			}
		} else {
			// 单独单边设置
			if(this.borderTop){
				this.setBorderStyles(...this.getBorderAttr(this.borderTop));
				this.graphics.moveTo(0, 0)
				.lineTo(this.width, 0)
				.stroke();
			}
			if(this.borderRight){
				this.setBorderStyles(...this.getBorderAttr(this.borderRight));
				// 如果是右边半圆，则线也要显示成半圆
				if(this.borderRightRound){
					const radius = this.height * .5;
					this.graphics.arc(this.width - radius, radius, radius, Math.PI * 1.5, Math.PI * 2.5);
				}else {
					this.graphics.moveTo(this.width, 0)
					.lineTo(this.width, this.height);
				}
				this.graphics.stroke();
			}
			if(this.borderBottom){
				this.setBorderStyles(...this.getBorderAttr(this.borderBottom));
				this.graphics.moveTo(0, this.height)
				.lineTo(this.width, this.height)
				.stroke();
			}
			if(this.borderLeft){
				this.setBorderStyles(...this.getBorderAttr(this.borderLeft));
				// 如果是左边半圆，则线也要显示成半圆
				if(this.borderLeftRound){
					const radius = this.height * .5;
					this.graphics.arc(radius, radius, radius, Math.PI * .5, Math.PI * 1.5);
				}else {
					this.graphics.moveTo(0, 0)
					.lineTo(0, this.height);
				}
				this.graphics.stroke();
			}
		}
	}
	/**
	 * 初始化圆角
	 * 为图像元素添加遮罩以实现 borderRadius 圆角
	*/
	initBorderRadiusMask(){
		let s;
		// 正圆形
		if((this.borderRadiusValue === '100%' || this.borderRadiusValue === this.width) && (this.width === this.height)){
			const radius = this.width * .5;
			s = new Shape();
			s.graphics.fillCircle(radius,  radius, radius);
		}else if(this.borderRadiusValue >= this.height || (this.borderRightRadius && this.borderLeftRadius)){
			// 两边半圆
			s = this.getHorizontalRoundRectPath(this.width, this.height);
			s.graphics.clip()
			.fill();
		}else if(this.borderRadiusValue >= this.width){
			// 上下半圆
			s = this.getVerticalRoundRectPath(this.width, this.height);
			s.graphics.clip()
			.fill();
		}else if(this.borderLeftRound){
			s = this.getLeftRoundRectPath(this.width, this.height);
			s.graphics.clip()
			.fill();
		}else if(this.borderRightRound){
			s = this.getRightRoundRectPath(this.width, this.height);
			s.graphics.clip()
			.fill();
		}else {
			console.log(this.borderRadiusValue, 333);
			s = new Shape();
			s.graphics.fillRoundRect(0, 0, this.width, this.height, this.borderRadiusValue);
		}
		this.mask = s;
	}
	/**
	 * 初始化背景颜色
	 */
  initBackgroundColor(){
    this.graphics.beginPath()
    .fillStyle(this.backgroundColor)
    .fillRect(0, 0, this.width, this.height);
  }
}

const extendsClassDraw$1 = Symbol('extendsClassDraw');

/**
 * Image 图片显示类
 * 继承自SimpleCss类，支持 borderRadius、border
 */
class Image extends SimpleCss {	
	name = 'Image'
	image = null
	path = ''
	sx = undefined
	sy = undefined
	sWidth = undefined
	sHeight = undefined
	dx = 0
	dy = 0
	dWidth = undefined
	dHeight = undefined
	
	constructor(args){
		super();
    this[extendsClassDraw$1] = super[draw];
		for(let v in args){
			this[v] = args[v];
		}
		// 图片地址路径 远程/本地
		this.path = this.image;
		// 如果设置了 width 则认 width 参数作为渲染宽度， 否则就将 dWidth 参数作为渲染宽度
		if(!this.width){
			this.width = this.dWidth;
		}else {
			this.dWidth = this.width;
		}
		// 如果设置了 height 则认 height 参数作为渲染宽度， 否则就将 dWidth 参数作为渲染宽度
		if(!this.height){
			this.height = this.dHeight;
		}else {
			this.dHeight = this.height;
		}
	}
	
	[drawImage$1](ctx, x, y){
		/**
		 * !! 注意参数变化,可省略的原始图像位置尺寸信息是排在前面的
		 * drawImage(img, dx, dy);
		 * drawImage(img, dx, dy, dWidth, dHeight);
		 * drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		 */
		
		 ctx.globalAlpha = this[getAlpha]();
    
		if(this.sx != undefined){
			// 如果传了原始图起点，则说明要填完整所有参数
			ctx.drawImage(this.path, this.sx, this.sy, this.sWidth, this.sHeight, x, y, this.dWidth, this.dHeight);
		}else if(this.dWidth != undefined){
			// 如果传了绘制目标宽，则认为不管原图，只管绘制目标位置与宽高
      ctx.drawImage(this.path, x, y, this.dWidth, this.dHeight);
		}else {
			// 只管绘制目标位置，会绘制原始图大小
			ctx.drawImage(this.path, x, y);
		}
	}
	[draw](ctx){
    let [x, y] = this.getPosition();
		x = this.dx + x;
		y = this.dy + y;
		// 调用 extends class 的 draw 方法，因为有可能需要设置样式
		this[extendsClassDraw$1](ctx);

		// 绘制图片
		this[drawImage$1](ctx, x, y);

		// 此处的子元素一般只用于样式绘制，不推荐添加其它类型的子元素
		this.childs.forEach(v=>{
			v[draw](ctx);
		});
	}
}

const drawImage = Symbol('drawImage');
const drawSliced = Symbol('drawSliced');
const left = Symbol('left');
const top = Symbol('top');
const right = Symbol('right');
const bottom = Symbol('bottom');
const setSlice = Symbol('setSlice');
const _sliceBounds = Symbol('_sliceBounds');
/**
 * Sprite 雪碧类
 * 用于显示九宫格类型的图片
 */
class Sprite extends Group{	
	name = 'Sprite'
	img = null
	sliced = false
	get sliceBounds(){
		return this[_sliceBounds]
	}
	set sliceBounds(bounds){
		// const { left, top, right, bottom } = bounds
		this._setSlice(bounds);
		this[_sliceBounds] = bounds;
	}
	/**
	 * 
	 * @param {*} img Image 对象
	 * @param {*} sliceBound 九宫格图 {left: 0, top: 0, right: 0, bottom: 0}
	 */
	constructor(img, sliceBound){
		super();
		if(img){
			this.img = img;	
		}
		this.parentDraw = super[draw];
		if(sliceBound){
			this[setSlice](sliceBound);
		}
	}
	// get rotation(){
	// 	return this[rotation]
	// }
	// set rotation(r){
	// 	if(this.sliced){
	// 		throw new Error('Sprite 因为旋转后会出现拼接缝隙，在九宫格状态下暂时无法旋转, 待小程序完全支持离屏渲染后修复')
	// 	}else{
	// 		this[rotation] = r
	// 	}
	// }
	[draw](ctx){
		const [x, y] = this.getPosition();
		
		this.wRatio = this.width / this.img.width;
		this.hRatio = this.height / this.img.height;

		// 伸缩后的宽、高
		this.enableWidth = (this.width - this[left] - this[right]) * this.scaleX;
		this.enableHeight = (this.height - this[top] - this[bottom]) * this.scaleY;

		// 执行所有命令
		this[instructions].forEach((instruction) => {
			instruction.exec(ctx, this);
		});

		if(this.sliced){
			// sprite 九宫格不允许使用 boxShadow
			this[drawSliced](ctx, x, y, this[getAlpha]());
		}else {
			this[drawImage](ctx, x, y);
		}
		
		// 绘制子元素
		this.childs.forEach( v =>{
			v[draw](ctx);
		});
		
	}
	[drawImage](ctx, x, y){
		const img = new Image({
			image: this.img,
			dx: x,
			dy: y,
			dWidth: this.width,
			dHeight: this.height
		});
		img[draw](ctx);
	}
	// 绘制九宫格图像
	[drawSliced](ctx, x, y, alpha){
		// 计算九宫格每块位置信息
		// 上左
		const ltParams = {
			image: this.img,
			sx: 0,
			sy: 0,
			sWidth: this[left],
			sHeight: this[top],
			dWidth: this[left] * this.scaleX,
			dHeight: this[top] * this.scaleY,
			dx: x,
			dy: y,
		};
		
		// 上中
		const tParams = {
			image: this.img,
			sx: this[left],
			sy: 0,
			sWidth: this.img.width - this[right] - this[left],
			sHeight: this[top],
			dWidth: this.enableWidth,
			dHeight: this[top] * this.scaleY,
			dx: ((this[left] * this.scaleX) + x),
			dy: y,
		};

		// 上右
		const rtParams = {
			image: this.img,
			sx: this.img.width - this[right],
			sy: 0,
			sWidth: this[right],
			sHeight: this[top],
			dWidth: this[right] * this.scaleX,
			dHeight: this[top] * this.scaleY,
			dx: (this[left] * this.scaleX) + tParams.dWidth + x,
			dy: y,
		};

		// 右中
		const rParams = {
			image: this.img,
			sx: this.img.width - this[right],
			sy: this[top],
			sWidth: this[right],
			sHeight: this.img.height - this[bottom] - this[top],
			dWidth: this[right] * this.scaleX,
			dHeight: this.enableHeight,
			dx: rtParams.dx,
			dy: rtParams.dy + (this[top] * this.scaleY),
		};


		// 右下
		const rbParams = {
			image: this.img,
			sx: this.img.width - this[right],
			sy: this.img.height - this[bottom],
			sWidth: this[right],
			sHeight: this[bottom],
			dWidth: this[right] * this.scaleX,
			dHeight: this[bottom]  * this.scaleY,
			dx: rtParams.dx - .3,
			dy: rParams.dy + rParams.dHeight,
		};

		// 下中
		const bParams = {
			image: this.img,
			sx: this[left],
			sy: this.img.height - this[bottom],
			sWidth: this.img.width - this[left] - this[right],
			sHeight: this[bottom],
			dWidth: this.enableWidth,
			dHeight: this[bottom] * this.scaleY,
			dx: tParams.dx,
			dy: rParams.dy + rParams.dHeight,
		};

		// 左下
		const lbParams = {
			image: this.img,
			sx: 0,
			sy: this.img.height - this[bottom],
			sWidth: this[left],
			sHeight: this[bottom],
			dWidth: this[left] * this.scaleX,
			dHeight: this[bottom]  * this.scaleX,
			dx: ltParams.dx,
			dy: rParams.dy + rParams.dHeight,
		};
		// 左中
		const lParams = {
			image: this.img,
			sx: 0,
			sy: this[top],
			sWidth: this[left],
			sHeight: this.img.height - this[top] - this[bottom],
			dWidth: this[left] * this.scaleX,
			dHeight: this.enableHeight,
			dx: ltParams.dx,
			dy: rParams.dy,
		};

		// 中间 
		const cParams = {
			image: this.img,
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
		if(this.rotation != 0){
			console.error('Sprite 因为旋转后会出现拼接缝隙，在九宫格状态下暂时无法旋转, 待小程序完全支持离屏渲染后修复');
		}
		peices.forEach( v => {
			const i = new Image(v);
			i.alpha = alpha;
			i[draw](ctx);
		});

		return this
	}
	/**
	 * 供内部调用的九宫格边界
	 * @param {*} sliceBound: {left: 0, top: 0, right: 0, bottom: 0}
	 */
	_setSlice(sliceBound){
		this.sliced = true;
		this[left] = sliceBound.left;
		this[top] = sliceBound.top;
		this[right] = sliceBound.right;
		this[bottom] = sliceBound.bottom;
		return this
	}
	/**
	 * 九宫格边界
	 * @param {*} sliceBound: {left: 0, top: 0, right: 0, bottom: 0}
	 */
	setSlice(sliceBound){
		return this._setSlice(sliceBound)
	}
}

const _width = Symbol('width');
const _height = Symbol('height');
const _alignItems = Symbol('_alignItems');
const _justifyContent = Symbol('_justifyContent');
const _direction = Symbol('_direction');
const _flex = Symbol('_flex');
const extendsClassDraw = Symbol('extendsClassDraw');

/**
 * Container 
 * 拥有 Flex 布局功能的容器，可往容器内添加子元素
 * flex 相关实例属性
 * direction 子元素排列方向，可使用的值: [row, row-reverse, column, column-reverse]
 * jusifyContent 子元素水平对齐方式，可使用的值: [flex-start, center, flex-end, space-between, space-around]
 * alignItems 子元素垂直对齐方式，可使用的值: [flex-start, center, flex-end]
 * 
 * *注意*
 * Container 需要主动设置 width、height，默认为都为 0
 */
class Container extends SimpleCss{
	name = 'Container'
	constructor(context){
		super();
		this[extendsClassDraw] = super[draw];
		this.direction = 'row';
		this.justifyContent = 'center';
		this.alignItems = 'center';
	}
	set width(v){
		this[_width] = v;
	}
	get width(){
		return this[_width]
	}
	set height(v){
		this[_height] = v;
	}
	get height(){
		return this[_height]
	}
	get flex(){
		return this[_flex]
	}
	set flex(v){
		this[_flex] = v;
	}
	// 排列方向
	get direction(){
		return this[_direction]
	}
	set direction(v){
		this[_direction] = v;
	}
	// 垂直对齐
	get alignItems(){
		return this[_alignItems]
	}
	set alignItems(v){
		this[_alignItems] = v;
	}
	// 水平对齐
	get justifyContent(){
		return this[_justifyContent]
	}
	set justifyContent(v){
		this[_justifyContent] = v;
	}
	/**
	 * 获取所有子元素宽度
	 */
	getChildsWidth(){
		let childsWidth = 0;
		this.childs.forEach((v) => childsWidth += v.width);
		return childsWidth
	}
	/**
	 * 获取所有子元素高度
	 */
	getChildsHeight(){
		let childsHeight = 0;
		this.childs.forEach((v) => childsHeight += v.height);
		return childsHeight
	}
	/**
	 * 获取所有子元素在 between 模式下间隙宽度
	 */
	getBetweenGapWidth(parentWidth){
		const childsWidth = this.getChildsWidth();
		return (parentWidth - childsWidth) / (this.childs.length - 1)
	}
	/**
	 * 获取所有子元素在 between 模式下间隙高度
	 */
	getBetweenGapHeight(parentHeight){
		const childsHeight = this.getChildsHeight();
		return (parentHeight - childsHeight) / (this.childs.length - 1)
	}
	/**
	 * 获取所有子元素在 around 模式下间隙宽度
	 */
	getAroundGapWidth(parentWidth){
		const childsWidth = this.getChildsWidth();
		return (parentWidth - childsWidth) / (this.childs.length)
	}
	/**
	 * 获取所有子元素在 around 模式下间隙高度
	 */
	getAroundGapHeight(parentHeight){
		const childsHeight = this.getChildsHeight();
		return (parentHeight - childsHeight) / (this.childs.length)
	}
	/**
	 * row 样式
	 */
	setRow(){
		this.setJustifyContent();
		this.setAlignItems();
	}
	/**
	 * row 样式翻转
	 */
	setRowReverse(){
		// 
		this.setJustifyContent(true);
		this.setAlignItems();
	}
	/**
	 * 垂直对齐
	 */
	setAlignItems(){
		const childs = this.childs;
		const parentHeight = this.height;
		if(this.alignItems === 'center'){
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				child.y += parentHeight * .5 - (child.height * .5);
			}
		}else if(this.alignItems === 'flex-start'){
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				child.y = 0;
			}
		}else if(this.alignItems === 'flex-end'){
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				child.y += parentHeight - child.height;
			}
		}
		// align-self
		childs.forEach((v) => {
			if(v.alignSelf === 'flex-start'){
				v.y = 0;
			}else if(v.alignSelf === 'center'){
				v.y = parentHeight * .5 - (v.height * .5);
			}else if(v.alignSelf === 'flex-end'){
				v.y = parentHeight - v.height;
			}
		});
	}
	/**
	 * 水平对齐
	 */
	setJustifyContent(isReverse){
		const parentWidth = this.width;
		let childs = this.childs;
		let justifyContent = this.justifyContent;
		if(isReverse){
			childs = this.childs.reverse();
			if(justifyContent === 'flex-start'){
				justifyContent = 'flex-end';
			}else if(justifyContent === 'flex-end'){
				justifyContent = 'flex-start';
			}
		}

		if(justifyContent === 'flex-start'){
			for (let index = 0; index < childs.length; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width;
				}else {
					child.x = 0;
				}
			}
		}else if(justifyContent === 'flex-end'){
			const childsWidth = this.getChildsWidth();
			for (let index = 0; index < childs.length; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width;
				}else {
					// x 轴起点是总宽度-子元素总宽度
					child.x += parentWidth - childsWidth;
				}
			}
		}else if(justifyContent === 'center'){
			const childsWidth = this.getChildsWidth();
			for (let index = 0; index < childs.length; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width;
				}else {
					// x 轴起点是总宽度-子元素总宽度的一半
					child.x += ((parentWidth - childsWidth) * .5);
				}
			}
		}else if(justifyContent === 'space-between'){
			// 水平中间间隔相等，两端无间隔
			const betweenGapWidth = this.getBetweenGapWidth(parentWidth);
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width + betweenGapWidth;
				}else {
					child.x += 0;
				}
			}
		}else if(justifyContent === 'space-around'){
			// 水平中间间隔相等，两端间隔是中间间隔的一半
			const aroundGapWidth = this.getAroundGapWidth(parentWidth);
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width + aroundGapWidth;
				}else {
					// x 轴起点是单个间隔的一半
					child.x += aroundGapWidth * .5;
				}
			}
		}
	}
	/**
	 * column 模式(水平转垂直) 下的水平对齐，即垂直对齐
	 */
	setJustifyContentForColumn(isReverse){
		const parentHeight = this.height;
		let childs = this.childs;
		let justifyContent = this.justifyContent;
		if(isReverse){
			childs = this.childs.reverse();
			if(justifyContent === 'flex-start'){
				justifyContent = 'flex-end';
			}else if(justifyContent === 'flex-end'){
				justifyContent = 'flex-start';
			}
		}

		if(justifyContent === 'flex-start'){
			for (let index = 0; index < childs.length; index++) {
				const child = childs[index];
				if(index > 0){
					child.y += childs[index-1].y + childs[index-1].height;
				}else {
					child.y += 0;
				}
			}
		}else if(justifyContent === 'flex-end'){
			const childsHeight = this.getChildsHeight();
			for (let index = 0; index < childs.length; index++) {
				const child = childs[index];
				if(index > 0){
					child.y += childs[index-1].y + childs[index-1].height;
				}else {
					// y 轴起点是总宽度-子元素总宽度
					child.y += parentHeight - childsHeight;
				}
			}
		}else if(justifyContent === 'center'){
			const childsHeight = this.getChildsHeight();
			for (let index = 0; index < childs.length; index++) {
				const child = childs[index];
				if(index > 0){
					child.y += childs[index-1].y + childs[index-1].height;
				}else {
					// y 轴起点是总宽度-子元素总宽度的一半
					child.y = ((parentHeight - childsHeight) * .5);
				}
			}
		}else if(justifyContent === 'space-between'){
			// 水平中间间隔相等，两端无间隔
			const betweenGapHeight = this.getBetweenGapHeight(parentHeight);
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				if(index > 0){
					child.y += childs[index-1].y + childs[index-1].height + betweenGapHeight;
				}else {
					child.y += 0;
				}
			}
		}else if(justifyContent === 'space-around'){
			// 水平中间间隔相等，两端间隔是中间间隔的一半
			const aroundGapHeight = this.getAroundGapHeight(parentHeight);
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				if(index > 0){
					child.y += childs[index-1].y + childs[index-1].height + aroundGapHeight;
				}else {
					// x 轴起点是单个间隔的一半
					child.y += aroundGapHeight * .5;
				}
			}
		}
	}
	/**
	 * column 模式(垂直转水平) 下的垂直对齐，即水平对齐
	 */
	setAlignItemsByColumn(){
		const childs = this.childs;
		const parentWidth = this.width;
		if(this.alignItems === 'center'){
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				child.x += parentWidth * .5 - (child.width * .5);
			}
		}else if(this.alignItems === 'flex-start'){
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				child.x = 0;
			}
		}else if(this.alignItems === 'flex-end'){
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				child.x += parentWidth - child.width;
			}
		}
		// align-self
		childs.forEach((v)=>{
			if(v.alignSelf === 'flex-start'){
				v.x = 0;
			}else if(v.alignSelf === 'center'){
				v.x = parentWidth * .5 - (v.width * .5);
			}else if(v.alignSelf === 'flex-end'){
				v.x = parentWidth - v.width;
			}
		});
	}
	setColumn(){
		this.setJustifyContentForColumn();
		this.setAlignItemsByColumn();
	}
	setColumnReverse(){
		this.setJustifyContentForColumn(true);
		this.setAlignItemsByColumn();
	}
	[draw](ctx){
		const direction = this.direction;
		if(direction === 'row'){
			this.setRow();
		}else if(direction === 'row-reverse'){
			this.setRowReverse();
		}else if(direction === 'column'){
			this.setColumn();
		}else if(direction === 'column-reverse'){
			this.setColumnReverse();
		}
		// 所有位置计算完后再调用 extends class 的 draw 绘制
		// 因为 Container 本身不需要绘制渲染
		this[extendsClassDraw](ctx);
	}
}

class CreateLinearGradient {
  name = 'CreateLinearGradient'
  colorStops = []
  /**
   * x0	渐变开始点的 x 坐标
   * y0	渐变开始点的 y 坐标
   * x1	渐变结束点的 x 坐标
   * y1	渐变结束点的 y 坐标
   */
  constructor(x0, y0, x1, y1){
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }
  exec(ctx, instance){
    const [_x, _y] = instance.getPosition();
    const gradient = ctx.createLinearGradient(this.x0 + _x, this.y0 + _y, this.x1 + _x, this.y1 + _y);
    this.colorStops.map( v => gradient.addColorStop(v[0], v[1]));
    return gradient
  }
  addColorStop(percent, color){
    this.colorStops.push([percent, color]);
  }
}

class CreateRadialGradient {
  name = 'CreateRadialGradient'
  colorStops = []
  /**
   * x0 开始圆形的 x 轴坐标。
   * y0 开始圆形的 y 轴坐标。
   * r0 开始圆形的半径。
   * x1 结束圆形的 x 轴坐标。
   * y1 结束圆形的 y 轴坐标。
   * r1 结束圆形的半径。
   */
  constructor(x0, y0, r0, x1, y1, r1){
    this.x0 = x0;
    this.y0 = y0;
    this.r0 = r0;
    this.x1 = x1;
    this.y1 = y1;
    this.r1 = r1;
  }
  create(ctx, x0, y0, r0, x1, y1, r1){
    console.log(x0, y0, r0, x1, y1, r1);
    return ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)
  }
  exec(ctx, instance){
    const [_x, _y] = instance.getPosition();
    const gradient = this.create(ctx, this.x0 + _x, this.y0 + _y, this.r0, this.x1 + _x, this.y1 + _y, this.r1);
    this.colorStops.map( v => gradient.addColorStop(v[0], v[1]));
    return gradient
  }
  addColorStop(percent, color){
    this.colorStops.push([percent, color]);
  }
}

/**
 * 一次引入全部开放类至 DuduCanvas 对象内，方便使用
 * eg:
 * const t1 = DuduCanvas.Text({text: '你好世界'})
 * 
 */


var DuduCanvas = {
	load: (canvas, imgArr) => {
		return new ImgLoader(canvas, imgArr)
	},
	Stage: (id, params, page) => {
		return new Stage(id, 	params, page)
	},
	Shape: () => {
		return new Shape()
	},
	Group: () => {
		return new Group()
	},
	Text: t => {
		return new Text(t)
	},
	Image: args => {
		return new Image(args)
	},
	Sprite: (...args) => {
		return new Sprite(...args)
	},
	color: {
		createLinearGradient (...args) {
			return new CreateLinearGradient(...args)
		},
		createRadialGradient (...args) {
			return new CreateRadialGradient(...args)
		}
	}
};

export { Container, CreateLinearGradient, CreateRadialGradient, DuduCanvas, Group, Image, ImgLoader, Shape, Sprite, Stage, Text };
