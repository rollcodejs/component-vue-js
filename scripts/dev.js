import { build, preview } from "vite";
import buildConfig from "../build.config.js";
import { createConfig } from "./createConfig.js";

const PORT = 5173;
const HtmlPlugin = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      let ulTpl = '<ul class="ul-list">';
      buildConfig.forEach((com) => {
        const href = `http://localhost:${PORT}/${com.name}/${com.name}.js`;
        ulTpl += `<li><span>${com.name}: </span> <a target="_blank" href="${href}">${href}</a></li>`;
      });
      ulTpl += "</ul>";
	  return html.replace(/<div id="content">[\s\S]*<\/div>/, `<div id="content">${ulTpl}</div>`);
    },
  };
};

const previewServer = await preview({
  // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
  preview: {
    port: PORT,
    open: false,
  },
  server: {
    host: "0.0.0.0",
  },
});

const buildWatchHandler = (needsWatch) => {
  build({
    build: { watch: true },
    plugins: [HtmlPlugin()],
  });
  buildConfig.forEach((buildItem) => {
    const config = createConfig(buildItem, needsWatch);
    build({
      ...config,
      build: {
        ...config.build,
        minify: false,
      },
    });
  });
};

buildWatchHandler(true);
