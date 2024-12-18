import { build, preview } from 'vite'
import buildConfig from '../build.config.js'
import { createConfig } from './createConfig.js'

const PORT = 8081
const HtmlPlugin = () => {
	return {
		name: 'html-transform',
		transformIndexHtml(html) {
			let ulTpl = '<ul>'
			buildConfig.forEach((com) => {
				const href = `http://localhost:${PORT}/${com.name}/index.js`
				ulTpl += `<li><span>${com.name}: </span> <a href="${href}">${href}</a></li>`
			})
			ulTpl += '</ul>'
			return html.replace(/<body>[^\<]*<\/body>/, `<body>${ulTpl}</body>`)
		},
	}
}

const previewServer = await preview({
	// 任何合法的用户配置选项，加上 `mode` 和 `configFile`
	preview: {
		port: PORT,
		open: false,
	},
})

const buildWatchHandler = (needsWatch) => {
	build({
		plugins: [HtmlPlugin()],
	})
	buildConfig.forEach((buildItem) => {
		const config = createConfig(buildItem, needsWatch)
		build({
			...config,
			build: {
				...config.build,
				minify: false,
			},
		})
	})
}

buildWatchHandler(true)
