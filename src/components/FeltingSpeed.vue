<template>
    <div class="universal-group">
        <!-- TITLE AND TOGGLE -->
        <h2 :class="{ disabled: mainStore.phase<2 }">Felting speed</h2>
        <div class="tabs">
            <button class="tab-left" @click="settingsStore.gradient=false" :class="{selected: !settingsStore.gradient && !(mainStore.phase<2)}" :disabled="mainStore.phase<2">single</button>
            <button class="tab-right" @click="settingsStore.gradient=true" :class="{selected: settingsStore.gradient && !(mainStore.phase<2)}" :disabled="mainStore.phase<2">gradient</button>
        </div>
        <!-- SINGLE SPEED -->
        <div v-if="!settingsStore.gradient" class="small-group" :class="{ disabled: mainStore.phase<2 }">
            <button class="minus" @click.stop="minus('mono')" :disabled="mainStore.phase<2">−</button>
            <div class="input" :class="{ disabled: mainStore.phase<2, focus: focusElement === 1 }">
                <input :size="inputWidthStart" @mousedown.stop @keyup="changeValue" @focus="focusElement = 1" @blur="focusElement = 0" v-model="settingsStore.speedStart" :disabled="mainStore.phase<2">
                <span class="unit">%</span>
            </div>
            <button class="plus" @click.stop="plus('mono')" :disabled="mainStore.phase<2">+</button>
        </div>
        <!-- GRADIENT SPEED -->
        <div v-if="settingsStore.gradient" class="small-group" :class="{ disabled: mainStore.phase<2 }">
            <span class="input-title">start</span>
            <button class="minus" @click.stop="minus('start')" :disabled="mainStore.phase<2">−</button>
            <div class="input" :class="{ disabled: mainStore.phase<2, focus: focusElement === 1 }">
                <input :size="inputWidthStart" @mousedown.stop @keyup="changeValue" @focus="focusElement = 1" @blur="focusElement = 0" v-model="settingsStore.speedStart" :disabled="mainStore.phase<2">
                <span class="unit">%</span>
            </div>
            <button class="plus" @click.stop="plus('start')" :disabled="mainStore.phase<2">+</button>
        </div>
        <div v-if="settingsStore.gradient" class="small-group" :class="{ disabled: mainStore.phase<2 }">
            <span class="input-title">end</span>
            <button class="minus" @click.stop="minus('end')" :disabled="mainStore.phase<2">−</button>
            <div class="input" :class="{ disabled: mainStore.phase<2, focus: focusElement === 2 }">
                <input :size="inputWidthEnd" @mousedown.stop @keyup="changeValue" @focus="focusElement = 2" @blur="focusElement = 0" v-model="settingsStore.speedEnd" :disabled="mainStore.phase<2">
                <span class="unit">%</span>
            </div>
            <button class="plus" @click.stop="plus('end')" :disabled="mainStore.phase<2">+</button>
        </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import { useMainStore } from '../stores/MainStore'
    import { useSettingsStore } from '../stores/SettingsStore'

    const mainStore = useMainStore();
    const settingsStore = useSettingsStore();

    const focusElement = ref(0);

    const inputWidthStart = ref(1);
    const inputWidthEnd = ref(1);

    function minus(loc) {
        if (loc === 'start') {
            settingsStore.speedStart--;
        } else if (loc === 'end') {
            settingsStore.speedEnd--;
        } else {
            settingsStore.speedStart--;
            settingsStore.speedEnd--;
        }
        settingsStore.change++;

        changeValue();
    }

    function plus(loc) {
        if (loc === 'start') {
            settingsStore.speedStart++;
        } else if (loc === 'end') {
            settingsStore.speedEnd++;
        } else {
            settingsStore.speedStart++;
            settingsStore.speedEnd++;
        }
        settingsStore.change++;

        changeValue();
    }

    function changeValue() {
        // if notning is selected - change speed for all paths
        if (mainStore.selectedPaths.length === 0) {
            for (let i = 0; i < settingsStore.pathSettings.length; i++) {

                // if gradient - speedStart = speedStart, speedEnd = speedEnd
                if (settingsStore.gradient) {
                    settingsStore.pathSettings[i].speedStart = settingsStore.speedStart;
                    settingsStore.pathSettings[i].speedEnd = settingsStore.speedEnd;

                // if not gradient - speedStart = speedStart, speedEnd = speedStart
                } else {
                    settingsStore.pathSettings[i].speedStart = settingsStore.speedStart;
                    settingsStore.pathSettings[i].speedEnd = settingsStore.speedStart;
                }
            }
            
        // the same just for selected paths
        } else {
            for (let i = 0; i < mainStore.selectedPaths.length; i++) {
                if (settingsStore.gradient) {
                    settingsStore.pathSettings[mainStore.selectedPaths[i]].speedStart = settingsStore.speedStart;
                    settingsStore.pathSettings[mainStore.selectedPaths[i]].speedEnd = settingsStore.speedEnd;
                } else {
                    settingsStore.pathSettings[mainStore.selectedPaths[i]].speedStart = settingsStore.speedStart;
                    settingsStore.pathSettings[mainStore.selectedPaths[i]].speedEnd = settingsStore.speedStart;
                }
            }
        }
        settingsStore.change++;
    }
</script>


<style>
</style>