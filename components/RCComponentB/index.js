export { default } from './ComponentB.vue';
import snapshot from './demo.png';

export const meta = {
  name: 'RCComponentB',
  author: 'testUser',
  snapshot,
  // 这个还是保留吧，前端可以自己识别
  label: '组件1',
  setters: {
    text: {
      type: 'SimpleText',
      default: {
        content: '文本',
        label: '文本输入'
      }
    }
  },
  actions: {
    latestActive: 'none',
    startDraw: 'json'
  }
};
