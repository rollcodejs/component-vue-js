export { default } from './ComponentA.vue'

export const meta = {
	// name: 'RCComponentA',
	author: 'testUser',
	// label: 'RCComponentA',
	setters: {
		text: {
			type: 'SimpleText',
			default: {
				content: '文本',
				label: '文本输入',
			},
		},
	},
}
