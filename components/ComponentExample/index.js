import ComponentExample from './ComponentExample.vue';
// RollCode组件元数据规范
export const meta = {
  setters: {
    text: {
      // 所有类型均可在Props文章中查看
      type: 'Text',
      label: '测试文本属性',
      default: '这是我测试值'
    }
  },
  actions: [
    {
      label: '仅展示的A行为',
      name: 'exposeName',
    }
  ],
};
export default ComponentExample;