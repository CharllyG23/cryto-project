<template>
  <div class="crytoItem">
    <h1>{{ coin.name }}</h1>
    <div class="crytoItem-info">
      <h2>Valor: {{ data.amount }}</h2>
      <h2>Seu fuso horário: ({{ formatDate.localTZ }}): {{formatDate.local}}</h2>
      <h2>Data (UTC): {{ formatDate.utc }}</h2>
      <h2>Preço: {{ data.price }}</h2>
      <h2>Tid: {{ data.tid }}</h2>
      <div class="crytoItem-info-badge">
        <p>Tipo: {{ data.type }}</p>
      </div>
    </div>
</div>
</template>
<script setup>
import { computed } from 'vue'
import { parseFromUnix, toLocaleUTCDateString } from '../../support/utils/date-formats.js'
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
  const local = dateUnix.toLocaleString('pt')
  const utc = toLocaleUTCDateString(dateUnix, 'pt')
  const localTZ = dateUnix.toString().match(/([A-Z]+[\+-][0-9]+)/)[1]
	return { local, utc, localTZ }
})

</script>
<style lang="scss" scoped>
@import './CrytoItem-style.scss';
</style>