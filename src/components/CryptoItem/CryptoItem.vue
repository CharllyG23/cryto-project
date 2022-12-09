<template>
  <div class="crytoItem">
    <h1>{{ coin.name }}</h1>
    <div class="crytoItem-info">
      <h2>Quantidade: {{ data.amount }}</h2>
      <h2>Horário Hoje: {{formatDate.local}}</h2>
      <h2>Preço: {{ formatValueToShow(data.price) }}</h2>
      <div class="crytoItem-info-badge">
        <p>Tipo: {{ data.type }}</p>
      </div>
    </div>
</div>
</template>
<script setup>
import { computed } from 'vue'
import { parseFromUnix, toLocaleUTCDateString } from '../../support/utils/date-formats.js'
import { formatValueToShow } from '../../support/utils/currency-conversion'

const props = defineProps({
  data: { type: Object, default: {}},
  coin: { type: Object, default: {}}
});

const formatDate = computed(() => {
	if (!props.data || !props.data.date) {
		return ''
	}
	const { date } = props.data

  const dateUnix = parseFromUnix(date)
  const local = dateUnix.toLocaleTimeString("default")
  const utc = toLocaleUTCDateString(dateUnix, 'pt')
	return { local, utc }
})

</script>
<style lang="scss" scoped>
@import './CryptoItem-style.scss';
</style>