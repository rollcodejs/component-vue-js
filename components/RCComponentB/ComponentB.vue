<template>
	<div>
		<p>这是ComponentB组件！</p>
		<button @click="clickHandler">点击按钮测试</button>
	</div>
</template>
<script setup>
	const clickHandler = () => {
		alert('点击了按钮！')
	}
</script>
