<template>
    <div class="setup">
        <div class="universal-group">
            <h2>Canvas size</h2>
            <div>
                <span>width</span>
                <span class="x">→</span>
                <input :size="inputWidth.x" @keyup="resizeX" v-model="mainStore.canvasSize.x">
                <span>cm</span>
            </div>
            <div>
                <span>height</span>
                <span class="x">→</span>
                <input :size="inputWidth.y" @keyup="resizeY" v-model="mainStore.canvasSize.y">
                <span>cm</span>
            </div>
        </div>
        <button @click="createArtboard">create</button>
    </div>
</template>


<script setup>
    import { reactive } from 'vue'
    import { useMainStore } from '../stores/MainStore'
    
    const mainStore = useMainStore()

    const inputWidth = reactive({ x:2, y:2 })

    function resizeX() {
        if (mainStore.canvasSize.x < 100) {
            inputWidth.x = 1
        } else if (mainStore.canvasSize.x < 1000) {
            inputWidth.x = 2
        } else if (mainStore.canvasSize.x < 10000) {
            inputWidth.x = 3
        } else {
            inputWidth.x = 4
        }
    }

    function resizeY() {
        if (mainStore.canvasSize.y < 100) {
            inputWidth.y = 1
        } else if (mainStore.canvasSize.y < 1000) {
            inputWidth.y = 2
        } else if (mainStore.canvasSize.y < 10000) {
            inputWidth.y = 3
        } else {
            inputWidth.y = 4
        }
    }

    function createArtboard() {
        mainStore.phase = 1
    }
</script>


<style>
    .setup {
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .x {
        margin-left: 14px;
        margin-right: 14px;
    }
</style>