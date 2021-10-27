// $ rollup -c rollup.config.js   
import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import '@babel/polyfill'
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
                [ "@babel/preset-env" ]
            ]
        }),
    ],
}