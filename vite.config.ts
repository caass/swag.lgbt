import { defineConfig, type ConfigEnv, type CSSOptions } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";

import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import postcssPrefixEnv from "postcss-preset-env";
import postcssScss from "postcss-scss";
import atImport from "postcss-import";

const defineCssConfig = ({ command }: ConfigEnv): CSSOptions => {
  const postcssPlugins = [
    atImport(),
    autoprefixer(),
    postcssPrefixEnv({ stage: 3, features: { "nesting-rules": true } }),
  ];

  // only minimize in prod
  if (command === "build") {
    postcssPlugins.push(cssnanoPlugin({ preset: "default" }));
  }

  return {
    postcss: {
      parser: postcssScss.parse,
      plugins: postcssPlugins,
    },
  };
};

export default defineConfig((env) => {
  const css = defineCssConfig(env);

  return {
    css,
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
