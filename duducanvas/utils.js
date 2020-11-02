/**
 * getPosAfterRotation
 * 获取旋转后的坐标
 * @param {*} rotation 旋转角度
 * @param {*} x 
 * @param {*} y
 * 旋转公式转自 Foundation Actionscript3.0 Animation
 * 第十章“坐标旋转及角度反弹”及第十八章“矩阵数学”
 * 可认为是绕虚拟z轴旋转矩阵 
 * [cos  sin   0]
 * [-sin cos   0]
 * [ 0    0    1]
 * 计算 x 与 y 
 * x = (x * cos + y * -sin)
 * y = (x * sin + y * cos)
 * 得
 * x = Math.cos(angle) * x - Math.sin(angle) * y
 * y =  Math.cos(angle) * y + Math.sin(angle) * x
 *
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

export function findNodes(node){
	const l = node.childs.length
	const arr = []
	if(l){
		for(let i=0; i<l; i++){
			if(node.childs[i].childs && node.childs[i].childs.length){
				const nodes = findNodes(node.childs[i])
				arr.push(node.childs[i])
				return arr.concat(nodes)
			}else{
				arr.push(node.childs[i])
			}
		}	
	}else{
		arr.push(node)
	}
	return arr
}

/**
 * 计算二次贝赛尔曲线
 * https://stackoverflow.com/questions/18141190/how-to-calculate-width-height-and-position-of-bezier-curve
 * @param {*} ax 
 * @param {*} ay 
 * @param {*} bx 
 * @param {*} by 
 * @param {*} cx 
 * @param {*} cy 
 * @param {*} dx 
 * @param {*} dy 
 */
export function getCurveBoundary(ax, ay, bx, by, cx, cy, dx, dy) {
  var tobx = bx - ax;
  var toby = by - ay;
  var tocx = cx - bx;
  var tocy = cy - by;
  var todx = dx - cx;
  var tody = dy - cy;
  var step = 1 / 40;    // precission
  var d, px, py, qx, qy, rx, ry, tx, ty, sx, sy, x, y, i, minx, miny, maxx, maxy;
  function min(num1, num2) {
      if (num1 > num2)
          return num2;
      if (num1 < num2)
          return num1;
      return num1;
  }
  function max(num1, num2) {
      if (num1 > num2)
          return num1;
      if (num1 < num2)
          return num2;
      return num1;
  }
  for (var i = 0; i < 41; i++)
  {
      d = i * step;
      px = ax + d * tobx;
      py = ay + d * toby;
      qx = bx + d * tocx;
      qy = by + d * tocy;
      rx = cx + d * todx;
      ry = cy + d * tody;
      const toqx = qx - px;
      const toqy = qy - py;
      const torx = rx - qx;
      const tory = ry - qy;

      sx = px + d * toqx;
      sy = py + d * toqy;
      tx = qx + d * torx;
      ty = qy + d * tory;
      const totx = tx - sx;
      const toty = ty - sy;

      x = sx + d * totx;
      y = sy + d * toty;
      if (i == 0)
      {
          minx = x;
          miny = y;
          maxx = x;
          maxy = y;
      }
      else
      {
          minx = min(minx, x);
          miny = min(miny, y);
          maxx = max(maxx, x);
          maxy = max(maxy, y);
      }
  }
  return {x: Math.round(minx), y: Math.round(miny), width: Math.round(maxx - minx), height: Math.round(maxy - miny)};
}