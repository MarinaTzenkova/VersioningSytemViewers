const autoprefixer = require("autoprefixer");
const glob = require("glob");

const plugins = [require("postcss-import"), require("tailwindcss")];
if (process.env.NODE_ENV !== "development") {
  const purgecss = require("@fullhuman/postcss-purgecss");
  plugins.push(
    purgecss({
      content: [
        "./src/**/*.vue",
        "./src/**/*.pcss",
        "./src/**/*.css",
        "./src/**/*.sass",
        "./src/**/*.html",
        ...glob.sync("./src/**/*.js", {
          cwd: __dirname,
          ignore: []
        })
      ],
      whitelistPatterns: [/form.*/, /v-step.*/],
      whitelist: ["flex-shrink-0", "w-16", "h-16"],
      extractors: [
        {
          extractor: class TailwindExtractor {
            static extract(content) {
              return content.match(/[A-z0-9-:/]+/g) || [];
            }
          },
          extensions: ["vue", "pcss", "sass", "css", "html", "js"]
        }
      ]
    })
  );
}

plugins.push(autoprefixer);

module.exports = {
  plugins: plugins
};
