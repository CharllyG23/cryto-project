<template>
	<div class="tableContent">
		<div class="tableContent--items">
			<div class="date">
				<span>{{ formatDate.local }}</span>
			</div>
			<span class="buy">{{ formatValueToShow(data.price) }}</span>
			<div class="coin w-32">
				<img v-if="coin.icon" :src="coin.icon" alt="Cryptocurrency" width="40" height="40" />
				<p>{{ coin.name }}</p><strong class="text-slate-500">{{ coin.key }}</strong>
			</div>
			<div class="tid">
				<p class="counter" ># {{ data.tid }}</p>
			</div>
			<div :class="data.type" class="status">
				<span> {{data.type}}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { parseFromUnix } from '../../support/utils/date-formats.js'
import { formatValueToShow } from '../../support/utils/currency-conversion'

const props = defineProps({
  data: { type: Object, default: {}},
  coin: { type: Object, default: {}},
});

const formatDate = computed(() => {
	if (!props.data || !props.data.date) {
		return ''
	}
	const { date } = props.data

  const dateUnix = parseFromUnix(date)
  const local = dateUnix.toLocaleTimeString("default")
	return { local }
})
</script>
<style lang="scss" scoped>
@import './CryptoTableItem-style.scss';
</style>