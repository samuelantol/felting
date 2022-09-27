<template>
    <div class="universal-group">
        <h2 :class="{ disabled: mainStore.phase<5 }">Height of needles</h2>
        <div class="small-group" :class="{ disabled: mainStore.phase<5}">
            <button class="minus" @click.stop="minus" :disabled="mainStore.phase<5">−</button>
            <div class="input" :class="{ disabled: mainStore.phase<5, focus: focusElement === true }">
                <input :size="inputWidth" @mousedown.stop @focus="focusElement = true" @blur="focusElement = false" v-model="number" :disabled="mainStore.phase<5">
                <span class="unit">cm</span>
            </div>
            <button class="plus" @click.stop="plus" :disabled="mainStore.phase<5">+</button>
        </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import { useMainStore } from '../stores/MainStore'

    const mainStore = useMainStore()

    const number = ref(0)
    const focusElement = ref(false)

    function minus() {
        number.value--
    }

    function plus() {
        number.value++
    }
</script>


<style>
</style>