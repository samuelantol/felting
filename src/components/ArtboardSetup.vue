<template>
    <div class="setup">
        <div class="universal-group">
            <h2>Canvas size</h2>
            <div class="setup-group">
                <span class="input-title">width</span>
                <div class="input" :class="{ focus: focusElement === 1 }">
                    <input @focus="focusElement = 1" @blur="focusElement = 0" v-model="mainStore.canvasSize.x">
                    <span>cm</span>
                </div>
            </div>
            <div class="setup-group">
                <span class="input-title">height</span>
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
    .setup-group{
        display: flex;
        flex-direction: row;
        text-align: right;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 4px;
    }
    .size-group{
        margin-bottom: 4px;
    }
</style>