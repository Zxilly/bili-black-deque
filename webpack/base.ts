import { Configuration, BannerPlugin } from "webpack";
import { generateHeader } from "../plugins/userscript.plugin";

const config: Configuration = {
    entry: "./src/index.ts",
    target: "web",
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.m?ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        axios: "axios",
    },
    plugins: [
        new BannerPlugin({
            banner: generateHeader,
            raw: true,
        })
    ]
};

export default config;