// $ rollup -c rollup.config.js   
import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import '@babel/polyfill'
import { uglify } from "rollup-plugin-uglify";
export default {
    input: 'mp/src/index.js',
    output: [
        {
            file: 'dist/duducanvas.js',
            format: 'es'
        },
        {
            file: 'mp/dist/duducanvas.js',
            format: 'es'
        },
        {
            file: 'uniapp/duducanvas/duducanvas.js',
            format: 'es'
        }
    ],
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**',
            presets: [
                [
                  "@babel/env",
                ]
            ]
        }),
        uglify(),
    ],
}