(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.RCComponentA = {}, global.window.Vue2222));
})(this, (function (exports, vue) { 'use strict';

  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };

  const _sfc_main = {
    __name: 'ComponentA',
    props: {
  		text: Object,
  	},
    setup(__props, { expose: __expose }) {
    __expose();

  	vue.onMounted(() => {
  		console.log(123123);
  	});
  	const props = __props;
  	const clickHandler = () => {
  		alert('点击了按钮！');
  	};

  const __returned__ = { props, clickHandler, onMounted: vue.onMounted };
  Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
  return __returned__
  }

  };

  const _hoisted_1 = /*#__PURE__*/vue.createElementVNode("p", null, "这是ComponentA组件！!!", -1 /* HOISTED */);

  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", null, [
      _hoisted_1,
      vue.createElementVNode("p", null, "测试文本属性：" + vue.toDisplayString($setup.props.text.content), 1 /* TEXT */),
      vue.createElementVNode("button", { onClick: $setup.clickHandler }, "点击按钮测试")
    ]))
  }
  var ComponentA = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__file',"/Users/xuzhenzhao/repo/rollcodejs-plugins-template/components/RCComponentA/ComponentA.vue"]]);

  const meta = {
  	name: 'RCComponentA',
  	author: 'testUser',
  	label: 'RCComponentA',
  	setters: {
  		text: {
  			type: 'SimpleText',
  			default: {
  				content: '文本',
  				label: '文本输入',
  			},
  		},
  	},
  };

  exports.default = ComponentA;
  exports.meta = meta;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
