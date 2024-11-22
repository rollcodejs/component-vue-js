import vue from '@vitejs/plugin-vue'
export default {
	input: './components/RCComponentA/index.js',
	output: {
		file: 'bundle.js',
		format: 'umd',
    name: 'RCComponentA',
		globals: {
			vue: 'window.Vue2222',
		},
	},
	external: ['vue'],
	plugins: [vue()],
}
