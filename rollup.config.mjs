import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

import * as loader from "./generateExports.js";
loader;

export default {
  input: "src/server.ts",
  preserveEntrySignatures: false,
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [
    resolve({ browser: false }),
    commonjs({
      dynamicRequireTargets: [
        "node_modules/logform/*.js",
        "./src/responses/citra.json",
        "./src/responses/yuzu.json",
      ],
      extensions: [".mjs", ".js", ".ts"],
      transformMixedEsModules: true,
      ignoreGlobal: true,
    }),
    json(),
    typescript(),
    terser(),
  ],
};
