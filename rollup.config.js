// $ rollup -c rollup.config.js   
import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import '@babel/polyfill'
import { uglify } from "rollup-plugin-uglify";
export default {
    input: 'src/index.js',
    output: {
        file: 'dist/duducanvas.js',
        format: 'es'
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**',
            presets: [
                [
                  "@babel/env",
                  // {
                  //   "modules": false,
                  //   "targets": {
                  //     "edge": "17",
                  //     "firefox": "60",
                  //     "chrome": "67",
                  //     "safari": "11.1"
                  //   },
                  //   "useBuiltIns": "usage",
                  //   "corejs": "3.6.5"
                  // }
                ]
            ]
        }),
        uglify(),
    ],
}