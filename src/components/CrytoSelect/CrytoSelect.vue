<template>
    <div class="crytoSelect" v-click-away="onClickAway">
        <div class="crytoSelect__control"> 
            <button
                class="btn"
                @click="open = !open"
            >   
                {{ selected.name }}
                <SvgAngle
                    class="crytoSelect__icon"
                    :class="{ 'crytoSelect__icon--rotate-180': open }"
                />    
            </button>
        </div>      
        <div class="crytoSelect__content" :class="{ selectHide: !open }">
            <div
                v-for="(option, i) in  options"
                :key="i"
                class="crytoSelect__content--options"
                @click="isSelected(option)"
            >
            {{ option.name }}
            </div>
        </div>  
    </div>
</template>
  
<script >
import { ref } from 'vue'
import { directive } from 'vue3-click-away'
import SvgAngle from './SvgAngle.vue'

export default {
	name: 'cryto-select',

    emits: ['on-selected'],

	directives: {
		ClickAway: directive,
	},

    components:{
        SvgAngle,
    },

    props: {
        options: {
            type: Array,
            default: []
        },
        label: {
            type: String,
            required: false
        },
        valueSelected: {
            type: Object,
            default: {}
        }
    },

    setup(props, {emit}) {

      const open = ref(false)
      const selected = ref(props.valueSelected)

      const isSelected = (option) =>{
          selected.value = option
          emit('on-selected', option) 
          open.value = false   
      }

        const onClickAway = () => {
            open.value = false
        }
  
      return {
        onClickAway,
        isSelected,
        open,
        selected
      }
    }
}
</script>
<style lang="scss" scoped>
@import './CrytoSelect-style.scss';
</style>