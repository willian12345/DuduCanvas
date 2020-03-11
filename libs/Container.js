import DisplayObject from './DisplayObject.js'
export default class Container extends DisplayObject{
	constructor(context){
		super()
	}
	name = 'Container'
	// draw(){
	// 	console.log(this.x, this.y)
	// 	this._childs.forEach((v)=>{
	// 		v.draw(this.context)
	// 	})
	// }
}

 