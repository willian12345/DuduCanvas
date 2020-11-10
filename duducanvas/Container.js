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
	getBetweenGapWidth(parentWidth){
		const childsWidth = this.getChildsWidth()
		return (parentWidth - childsWidth) / (this.childs.length - 1)
	}
	getAroundGapWidth(parentWidth){
		const childsWidth = this.getChildsWidth()
		return (parentWidth - childsWidth) / (this.childs.length)
	}
	setRow(){
		this.setJustifyContent()
		this.setAlignItems()
	}
	setRowReverse(){
		// 水平翻转
		this.setJustifyContent(true)
		this.setAlignItems()
	}
	setAlignItems(){
		const childs = this.childs
		const parentHeight = this.height
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
	setJustifyContent(isReverse){
		const parentWidth = this.width
		let childs = this.childs
		let justifyContent = this.justifyContent
		if(isReverse){
			childs = this.childs.reverse()
			if(justifyContent === 'flex-start'){
				justifyContent = 'flex-end'
			}else if(justifyContent === 'flex-end'){
				justifyContent = 'flex-start'
			}
		}

		if(justifyContent === 'flex-start'){
			for (let index = 0; index < childs.length; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width
				}else{
					child.x = 0
				}
			}
		}else if(justifyContent === 'flex-end'){
			const childsWidth = this.getChildsWidth()
			for (let index = 0; index < childs.length; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width
				}else{
					child.x = parentWidth - childsWidth
				}
			}
		}else if(justifyContent === 'center'){
			const childsWidth = this.getChildsWidth()
			for (let index = 0; index < childs.length; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width
				}else{
					child.x = ((parentWidth - childsWidth) * .5)
				}
			}
		}else if(justifyContent === 'space-between'){
			// 水平中间间隔相等，两端无间隔
			const betweenGapWidth = this.getBetweenGapWidth(parentWidth)
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width + betweenGapWidth
				}else{
					child.x += 0
				}
			}
		}else if(justifyContent === 'space-around'){
			// 水平中间间隔相等，两端间隔是中间间隔的一半
			const aroundGapWidth = this.getAroundGapWidth(parentWidth)
			for (let index = 0, l = childs.length; index < l; index++) {
				const child = childs[index];
				if(index > 0){
					child.x += childs[index-1].x + childs[index-1].width + aroundGapWidth
				}else{
					child.x += aroundGapWidth * .5
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

 