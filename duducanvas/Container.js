import DisplayObject from './DisplayObject.js'
import { draw } from './config'

const _width = Symbol('width')
const _height = Symbol('height')
const _alignItems = Symbol('_alignItems')
const _justifyContent = Symbol('_justifyContent')
const _direction = Symbol('_direction')
const _flex = Symbol('_flex')
const _draw = Symbol('_draw')

export default class Container extends DisplayObject{
	name = 'Container'
	constructor(context){
		super()
		this[_draw] = super[draw]
		this.direction = 'row'
		this.justifyContent = 'center'
		this.alignItems = 'center'
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
	get flex(){
		return this[_flex]
	}
	set flex(v){
		this[_flex] = v
	}
	// 排列方向
	get direction(){
		return this[_direction]
	}
	set direction(v){
		this[_direction] = v
	}
	// 垂直对齐
	get alignItems(){
		return this[_alignItems]
	}
	set alignItems(v){
		this[_alignItems] = v
	}
	// 水平对齐
	get justifyContent(){
		return this[_justifyContent]
	}
	set justifyContent(v){
		this[_justifyContent] = v
	}
	getChildsWidth(){
		let childsWidth = 0
		this.childs.map((v) => childsWidth += v.width)
		return childsWidth
	}
	getBetweenGapWidth(){
		const childsWidth = this.getChildsWidth()
		return (parentWidth - childsWidth) / (this.childs.length - 1)
	}
	setRow(){
		this.setJustifyContent()
		this.setAlignItems()
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
		console.log(3333)
		// this.setAlignItems()
	}
	setAlignItems(){
		const childs = this.childs
		const parentHeight = this.height
		const parentY = this.y
		if(this.alignItems === 'center'){
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				child.y += parentHeight * .5 - (child.height * .5)
			}
		}else if(this.alignItems === 'flex-start'){
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				child.y = 0
			}
		}else if(this.alignItems === 'flex-end'){
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				child.y += parentHeight - child.height
			}
		}
	}
	setJustifyContent(){
		const childs = this.childs
		const parentWidth = this.width
		if(this.justifyContent === 'flex-start'){
			for (let index = 0; index < childs.length; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width
				}else{
					child.x = 0
				}
			}
		}else if(this.justifyContent === 'flex-end'){
			const childsWidth = this.getChildsWidth()
			for (let index = 0; index < childs.length; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width
				}else{
					child.x = parentWidth - childsWidth
				}
			}
		}else if(this.justifyContent === 'center'){
			const childsWidth = this.getChildsWidth()

			for (let index = 0; index < childs.length; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width
				}else{
					child.x = ((parentWidth - childsWidth) * .5)
				}
			}
		}else if(this.justifyContent === 'space-between'){
			const betweenGapWidth = this.getBetweenGapWidth()
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width + betweenGapWidth
					console.log(child.x)
				}else{
					child.x += 0
				}
			}
		}
	}
	setAlignItemsByColumn(){
		const childs = this.childs
		const parentWidth = this.width
		if(this.alignItems === 'center'){
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				child.x += parentWidth * .5 - (child.width * .5)
			}
		}else if(this.alignItems === 'flex-start'){
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				child.x = 0
			}
		}else if(this.alignItems === 'flex-end'){
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				child.x += parentWidth - child.width
			}
		}
	}
	setColumn(){
		const childs = this.childs
		for (let index = 0; index < childs.length; index++) {
			const child = childs[index];
			if(index > 0){
				child.y += childs[index-1].y + childs[index-1].height
			}else{
				child.y = 0
			}
		}
		this.setAlignItemsByColumn()
	}
	setColumnReverse(){
		const childs = this.childs
		for (let index = 0, l = childs.length; index < l; index++) {
			const child = childs[index];
			if(index > 0){
				child.y += this.height - childs[index-1].height - child.height
			}else{
				child.y += this.height - childs[index].height
			}
		}
		this.setAlignItemsByColumn()
	}
	[draw](){
		if(this.direction === 'row'){
			this.setRow()
		}else if(this.direction === 'row-reverse'){
			this.setRowReverse()
		}else if(this.direction === 'column'){
			this.setColumn()
		}else if(this.direction === 'column-reverse'){
			this.setColumnReverse()
		}
		// 所有位置计算完后再调用 绘制
		this[_draw]()
	}
}

 