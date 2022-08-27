<template>
    <div class="universal-group">
        <div v-if="mainStore.phase<2">
            <h2 class="disabled">Felting speed</h2>
            <div>
                <button class="minus" @click.stop="minus('start')" disabled>−</button>
                <input :size="inputWidthStart" v-model="settingsStore.speedStart" disabled>
                <span class="unit disabled">%</span>
                <button class="plus" @click.stop="plus('start')" disabled>+</button>
            </div>
            <div>
                <button class="minus" @click.stop="minus('end')" disabled>−</button>
                <input :size="inputWidthEnd" v-model="settingsStore.speedEnd" disabled>
                <span class="unit disabled">%</span>
                <button class="plus" @click.stop="plus('end')" disabled>+</button>
            </div>
        </div>

        <div v-else>
            <h2>Felting speed</h2>
            <div>
                <button class="minus" @click.stop="minus('start')">−</button>
                <input :size="inputWidthStart" @mousedown.stop @keyup="resize('start')" v-model="settingsStore.speedStart">
                <span class="unit">%</span>
                <button class="plus" @click.stop="plus('start')">+</button>
            </div>
            <div>
                <button class="minus" @click.stop="minus('end')">−</button>
                <input :size="inputWidthEnd" @mousedown.stop @keyup="resize('end')" v-model="settingsStore.speedEnd">
                <span class="unit">%</span>
                <button class="plus" @click.stop="plus('end')">+</button>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import { paper } from 'paper'
    import { useMainStore } from '../stores/MainStore'
    import { useSettingsStore } from '../stores/SettingsStore'

    const mainStore = useMainStore();
    const settingsStore = useSettingsStore();

    const inputWidthStart = ref(1);
    const inputWidthEnd = ref(1);

    function minus(loc) {
        if (loc === 'start') {
            settingsStore.speedStart--;
        } else {
            settingsStore.speedEnd--;
        }

        resize(loc);
    }

    function plus(loc) {
        if (loc === 'start') {
            settingsStore.speedStart++;
        } else {
            settingsStore.speedEnd++;
        }

        resize(loc);
    }

    function resize(loc) {
        changeValue(loc);

        if (loc === 'start') {
            if (settingsStore.speedStart < 100) {
                inputWidthStart.value = 1;
            } else if (settingsStore.speedStart < 1000) {
                inputWidthStart.value = 2;
            } else if (settingsStore.feltingSpeed < 10000) {
                inputWidthStart.value = 3;
            } else {
                inputWidthStart.value = 4;
            }
        } else {
            if (settingsStore.speedEnd < 100) {
                inputWidthEnd.value = 1;
            } else if (settingsStore.speedEnd < 1000) {
                inputWidthEnd.value = 2;
            } else if (settingsStore.feltingEnd < 10000) {
                inputWidthEnd.value = 3;
            } else {
                inputWidtEnd.value = 4;
            }
        }
    }

    function changeValue() {
        for (let i = 0; i < mainStore.paperPaths.length; i++) {
            if (mainStore.paperPaths[i].selected || mainStore.selectedPaths.length === 0) {
                settingsStore.pathSettings[i].speedStart = settingsStore.speedStart;
                settingsStore.pathSettings[i].speedEnd = settingsStore.speedEnd;
                mainStore.paperPaths[i].strokeColor = new paper.Color(settingsStore.pathSettings[i].speedStart / 100);
            }
        }
        console.log(settingsStore.pathSettings);
    }
</script>


<style>
</style>