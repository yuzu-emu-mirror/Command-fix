import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
    input: 'src/server.ts',
    external: ['discord.js'],
    output: {
        dir: 'dist',
        format: 'cjs',
    },
    plugins: [
        resolve({
            browser: false
        }),
        commonjs({ dynamicRequireTargets: [
            'node_modules/logform/*.js',
            './src/responses/citra.json',
            './src/responses/yuzu.json',
        ], extensions: ['.mjs', '.js', '.ts'], transformMixedEsModules: true }),
        json(),
        typescript()
    ]
};
