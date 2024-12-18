export { default } from './ComponentA.vue'

export const meta = {
	name: 'RCComponentA',
	author: 'testUser',
	// 这个还是保留吧，前端可以自己识别
	label: '组件1',
	setters: {
		text: {
			type: 'SimpleText',
			default: {
				content: '文本',
				label: '文本输入',
			},
		},
	},
	actions: {
		latestActive: 'none',
		startDraw: 'json',
	},
}
