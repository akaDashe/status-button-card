import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const dev = process.env.ROLLUP_WATCH;

export default {
  input: "src/dashe-status-button-card.ts",
  output: {
    file: "dist/dashe-status-button-card.js",
    format: "es",
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    typescript(),
    !dev && terser({ format: { comments: false } }),
  ],
};
