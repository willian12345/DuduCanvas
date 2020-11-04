import DisplayObject from './DisplayObject.js'
const _width = Symbol('width')
const _height = Symbol('height')
const _display = Symbol('_display')
const _alignItems = Symbol('_alignItems')
const _justifyContent = Symbol('_justifyContent')
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
	get display(){
		return this[_display]
	}
	set display(v){
		this[_display] = v
	}
	get alignItems(){
		return this[_alignItems]
	}
	set alignItems(v){
		this[_alignItems] = v
	}
	get justifyContent(){
		return this[_justifyContent]
	}
	set justifyContent(v){
		this[_justifyContent] = v
	}
}

 