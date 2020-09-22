/**
 * getPosAfterRotation
 * 获取旋转后的坐标
 * @param {*} rotation 旋转角度
 * @param {*} x 
 * @param {*} y 
 */
export function getPosAfterRotation(rotation, x, y) {
	const angle = rotation * (Math.PI / 180)
	const _x = Math.cos(angle) * x  - Math.sin(angle) * y
	const _y = Math.cos(angle) * y + Math.sin(angle) * x
	return {x: _x , y: _y}
}
/**
 * getMaxValue
 * 获取数组对象中最小x,最大x,最小y，最大y
 * @param {*} arr : [{x:1, y: 1}, {x: 100, y, 100}]
 */
export function getMaxValue(arr){
	let minX = arr[0].x
	let maxX = arr[0].x
	let minY = arr[0].y
	let maxY = arr[0].y

	// 计算最小最大的 x,y 值
	for(var i=1, l = arr.length; i < l; i++){
		if(minX > arr[i].x){
			minX = arr[i].x
		}
		if(arr[i].x > maxX){
			maxX = arr[i].x
		}

		if(minY > arr[i].y){
			minY = arr[i].y
		}
		if(arr[i].y > maxY){
			maxY = arr[i].y
		}
	}
	return [minX, minY, maxX, maxY]
}