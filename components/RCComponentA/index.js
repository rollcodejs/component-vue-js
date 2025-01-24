export { default } from './ComponentA.vue';
import snapshot from './demo.png';

export const meta = {
  name: 'RCComponentA',
  author: 'testUser',
  snapshot,
  // 这个还是保留吧，前端可以自己识别
  label: '组件1',
  setters: {
    text: {
      type: 'Text',
      label: '测试文本属性',
      default: '这是我测试值'
    }
  },
  actions: [
    {
      label: '仅展示的A行为',
      cate: '自定义行为',
      type: 'custom'
    }
  ]
};
