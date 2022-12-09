<template>
	<div class="crytoInput">
		<div class="crytoInput-content">
			<div v-if="label" class="header">
				<label :for="name" class="title">{{ label }}</label>
			</div>
			<div class="relative">
				<input
					:name="name"
					:style="style"
					@input="update"
					class="custom-input"
					:readonly="readonly"
					:type="type"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { toRef } from 'vue'

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
	name: { type: String },
	modelValue: { type: Date },

	height: {
		type: Number,
		default: 59,
	},

	label: {
		required: false,
	},

	type: {
		type: String,
		default: 'text',
	},

	readonly: {
		type: Boolean,
		default: false,
	},
})

const name = toRef(props, 'name')

const update = (el) => {
	const r = el.target.value === '' ? null : new Date(el.target.value)
	emits('update:modelValue', r)
}

const style = {
	height: `${props.height}px`,
}

</script>

<style lang="scss" scoped>
@import './CryptoInput-style.scss';
</style>
