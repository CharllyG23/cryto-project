<template>
	<span class="cryptoSpinner" :class="{ 'full-width': fullWidth }">
		<svg viewBox="0 0 50 50" :class="`text-${color}`">
			<circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
		</svg>
	</span>
</template>
<script setup>

const props =  defineProps({
    size: {
        type: [Number, String],
        default: 24,
    },

    color: {
        type: String,
        default: 'white',
    },

    fullWidth: {
        type: Boolean,
        default: false,
    },
})

const styles = {
    size: 'inherit',
}

if (!props.fullWidth) {
    if (typeof props.size === typeof 1) {
        styles.size = `${props.size}px`
    } else {
        styles.size = props.size
    }
}
</script>
<style lang="scss" scoped>
@import './CryptoSpinner-style.scss';
.cryptoSpinner {
	width: v-bind('styles.size');
	height: v-bind('styles.size');
}
</style>