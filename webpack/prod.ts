import { merge } from 'webpack-merge';
import base from './base';
import path from 'node:path';
import TerserPlugin from "terser-webpack-plugin";

export default merge(base, {
    mode: 'production',
    cache: {
        type: 'filesystem',
        name: 'prod',
    },
    output: {
        path: path.resolve(".", "userscripts"),
        filename: "index.prod.user.js",
    },
    optimization: {
        minimize: false,
    },
    watchOptions: {
        ignored: /node_modules/,
    },
});