import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import '@babel/polyfill'
export default {
    input: 'duducanvas/index.js',
    output: {
        file: 'bundle.js',
        format: 'es'
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**',
            presets: [
                [ "@babel/preset-env" ]
            ]
        }),
    ],
}