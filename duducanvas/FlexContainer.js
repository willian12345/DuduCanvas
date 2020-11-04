import DisplayObject from './DisplayObject.js'
import { draw } from './config'
const _width = Symbol('width')
const _height = Symbol('height')
const _display = Symbol('_display')
const _alignItems = Symbol('_alignItems')
const _justifyContent = Symbol('_justifyContent')
const _direction = Symbol('_direction')
export default class FlexContainer extends DisplayObject{
	name = 'FlexContainer'
	constructor(context){
		super()
		this.drawSelf = super[draw]
		this.direction = 'row'
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
	get direction(){
		return this[_direction]
	}
	set direction(v){
		this[_direction] = v
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
	setRow(){
		const childs = this.childs
		for (let index = 0; index < childs.length; index++) {
			const child = childs[index];
			if(index > 0){
				child.x += childs[index-1].width
			}
		}
	}
	setRowReverse(){
		const childs = this.childs
		let offsetX = this.x + this.width
		for (let index = 0, l = childs.length; index < l; index++) {
			const child = childs[index];
			if(index > 0){
				child.x += offsetX - childs[index-1].width - child.width
			}else{
				child.x += offsetX - childs[index].width
			}
		}
	}
	setAlignItems(){
		const childs = this.childs
		const parentHeight = this.height
		const parentY = this.y
		for (let index = 0, l = childs.length; index < l; index++) {
			const child = childs[index];
			child.y += parentY + parentHeight * .5 - (child.height * .5)
		}
	}
	setColumn(){
		for (let index = 0; index < childs.length; index++) {
			const child = childs[index];
			if(index > 0){
				child.x += childs[index-1].width
			}
		}
	}
	[draw](){
		if(this.direction === 'row'){
			this.setRow()
		}else if(this.direction === 'row-reverse'){
			this.setRowReverse()
		}else if(this.direction === 'column'){
			this.setColumn()
		}

		if(this.alignItems === 'center'){
			this.setAlignItems()
		}

		this.drawSelf()
	}
}

 