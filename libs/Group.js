import DisplayObject from './DisplayObject.js'
const _width = Symbol('width')
const _height = Symbol('height')
export default class Group extends DisplayObject{
	name = 'Group'
	constructor(context){
		super()
	}
	set width(v){
		this[_width] = v
	}
	get width(){
		return this[_width]
	}
	set height(v){
		this[_height] = v
	}
	get height(){
		return this[_height]
	}
}

 