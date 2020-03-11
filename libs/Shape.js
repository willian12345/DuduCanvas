import DisplayObject from './DisplayObject.js'

const cmds = ['arc', 'fillRect', 'strokeRect', 'moveTo', 'lineTo']
export default class Shape extends DisplayObject{
	constructor(){
		super()
	}
	_draw(context){
		const l = this._actions.length
		let parent = this.parent
		let x = 0, y = 0
		while(parent && parent.name != 'Stage'){
			x = this.x + parent.x
			y = this.y + parent.y
			parent = parent.parent
		}

		console.log(this.x, this.y)

		if(l){
			for(let i=0; i<l; i++){
				let action = this._actions[i]
				let f = action[0]
				let args = action.length > 1 ? action.slice(1) : null;
				
				if(typeof(context[f]) == "function") {
					if(cmds.includes(f)){
						args[0] = x + args[0]
						args[1] = y + args[1]
					}
					context[f].apply(context, args);
				}
			}
		}
	}
	_actions = []
	graphics = {
		beginPath: () => {
			this._actions.push(['beginPath'])
			return this.graphics
		},
		moveTo: (x, y) => {
			this._actions.push(['moveTo', x, y])
			return this.graphics
		},
		lineTo: (x, y) => {
			this._actions.push(['lineTo', x, y])
			return this.graphics
		},
		/**
		 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
		 从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
		 */
		arc: (x, y, radius, startAngle, endAngle, anticlockwise = false) => {
			console.log(...arguments)
			this._actions.push(['arc', x, y, radius, startAngle, endAngle, anticlockwise])
			return this.graphics
		},
		/**
		 根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点
		 */
		arcTo: (x1, y1, x2, y2, radius) => {
			this._actions.push(['arcTo', x1, y1, x2, y2, radius])
			return this.graphics
		},
		stroke: () => {
			this._actions.push(['stroke'])
			return this.graphics
		},
		fill: () => {
			this._actions.push(['fill'])
			return this.graphics
		},
		fillStyle: color => {
			this._actions.push(['setFillStyle', color])
			return this.graphics
		},
		strokeStyle: color => {
			this._actions.push(['setStrokeStyle', color])
			return this.graphics
		},
		fillCircle: (x=0, y=0, radius=20) => {
			this._actions.push(['save'])
			this._actions.push(['beginPath'])
			this._actions.push(['arc', x, y, radius, 0, 2 * Math.PI])
			this._actions.push(['fill'])
			this._actions.push(['restore'])
			return this.graphics
		},
		fillRect: (x=0, y=0, w=10, h=20) => {
			this._actions.push(['fillRect', x, y, w, h])
			return this.graphics
		},
		/**
		 * 画一个矩形(非填充)。 用 strokeStyle 设置矩形线条的颜色，如果没设置默认是黑色
		 */
		strokeRect: (x=0, y=0, w=10, h=20) => {
			this._actions.push(['strokeRect', x, y, w, h])
			return this.graphics
		},
		/**
		 * 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容的方
		 */
		clearRect: (x, y, width, height) => {
			this._actions.push(['clearRect',x, y, width, height])
			return this.graphics
		}
	}
}

 