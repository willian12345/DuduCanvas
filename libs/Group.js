import DisplayObject from './DisplayObject.js'
const _width = Symbol('width')
export default class Group extends DisplayObject{
	name = 'Group'
	constructor(context){
		super()
	}
	set width(w){
		this[_width] = w
	}
	get width(){
		return this[_width]
	}
}

 