<template>
    <div class="setup">
        <div class="universal-group">
            <h2>Canvas size</h2>
            <div class="small-group">
                <span>width</span>
                <span class="x">→</span>
                <div class="input" :class="{ focus: focusElement === 1 }">
                    <input @focus="focusElement = 1" @blur="focusElement = 0" v-model="mainStore.canvasSize.x">
                    <span>cm</span>
                </div>
            </div>
            <div class="small-group">
                <span>height</span>
                <span class="x">→</span>
                <div class="input" :class="{ focus: focusElement === 2 }">
                    <input @focus="focusElement = 2" @blur="focusElement = 0" v-model="mainStore.canvasSize.y">
                    <span>cm</span>
                </div>
            </div>
        </div>
        <button @click="createArtboard">create</button>
    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import { useMainStore } from '../stores/MainStore'
    
    const mainStore = useMainStore()

    const focusElement = ref(0);

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
        margin-left: 10px;
        margin-right: 10px;
    }
    .size-group{
        margin-bottom: 4px;
    }
</style>