<template>
    <div class="universal-group">
        <div v-if="mainStore.phase<5">
            <h2 class="disabled">Height of needles</h2>
            <button class="minus" @click="minus" disabled>−</button>
            <input :size="inputWidth" @keyup="resize" v-model="number" disabled>
            <span class="disabled">mm</span>
            <button class="plus" @click="plus" disabled>+</button>
        </div>

        <div v-else>
            <h2>Height of needles</h2>
            <button class="minus" @click="minus">−</button>
            <input :size="inputWidth" @keyup="resize" v-model="number">
            <span>mm</span>
            <button class="plus" @click="plus">+</button>
        </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import { useMainStore } from '../stores/MainStore'

    const mainStore = useMainStore()

    const number = ref(200)
    const inputWidth = ref(2)

    function minus() {
        number.value--
        resize()
    }

    function plus() {
        number.value++
        resize()
    }

    function resize() {
        if (number.value < 100) {
            inputWidth.value = 1
        } else if (number.value < 1000) {
            inputWidth.value = 2
        } else if (number.value < 10000) {
            inputWidth.value = 3
        } else {
            inputWidth.value = 4
        }
    }
</script>


<style>
</style>