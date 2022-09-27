<template>
    <div class="universal-group">
        <h2 :class="{ disabled: mainStore.phase<5}">Motor speed</h2>
        <div class="small-group" :class="{ disabled: mainStore.phase<5}">
            <button class="minus" @click.stop="minus" :disabled="mainStore.phase<5">−</button>
            <div class="input" :class="{ disabled: mainStore.phase<5, focus: focusElement === true }">
                <input :size="inputWidth" @mousedown.stop @focus="focusElement = true" @blur="focusElement = false" v-model="number" :disabled="mainStore.phase<5">
                <span class="unit">turns/sec</span>
            </div>
            <button class="plus" @click.stop="plus" :disabled="mainStore.phase<5">+</button>
        </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import { useMainStore } from '../stores/MainStore'
    
    const mainStore = useMainStore()

    const number = ref(12.5)
    const inputWidth = ref(2)

    function minus() {
        number.value--
    }

    function plus() {
        number.value++
    }
</script>


<style>
</style>