/**
 * 集中各类并提供输出引用
 * 单独引入并输出需要使用的类，以便编译器实现树摇减小体积
 */
export { default as ImgLoader } from './ImgLoader.js'
export { default as Group } from './Group.js';
export { default as Stage } from './Stage.js';
export { default as Text } from './Text.js';
export { default as Image } from './Image.js';
export { default as Shape } from './Shape.js';
export { default as Sprite } from './Sprite.js';
export { default as base64src } from './base64src.js'
export { default as CreateLinearGradient } from './color/CreateLinearGradient'
export { default as CreateRadialGradient } from './color/CreateRadialGradient'
