import DisplayObject from './DisplayObject.js'
export default class Sprite extends DisplayObject{	
	name = 'Sprite'
	constructor(args){
		super()
		for(let v in args){
			this[v] = args[v]
		}
	}
	_draw(ctx){
		let [x, y] = this.getPosition()
	}
}

 