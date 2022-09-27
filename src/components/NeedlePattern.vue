<template>
    <div class="universal-group">
        <h2 :class="{ disabled: mainStore.phase<2 }">Needle pattern</h2>
        <div v-if="!active">
            <button @click.stop="open" :disabled="mainStore.phase<2">{{settingsStore.needlePatternP5[selected].text}} ↓</button>
        </div>
        <div v-else>
            <div v-for="option in settingsStore.needlePatternP5" :key="option.id">
                <button @click="select(option.id)" :class="{selected: option.id === selected}">{{option.text}}</button>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import { useMainStore } from '../stores/MainStore'
    import { useSettingsStore } from '../stores/SettingsStore'

    const mainStore = useMainStore();
    const settingsStore = useSettingsStore();

    const active = ref(false);
    const selected = ref(settingsStore.layerSettings.needlePattern);

    // THIS FUNCTION CONVERTS CM TO PX IN 72 DPI
    function cmToPx(cm) {
        let px = (72 * cm) / 2.54
        return px;
    }

    function open() {
        active.value = true;
    }

    function close() {
        active.value = false;
    }

    function select(selectedId) {
        selected.value = selectedId;
        settingsStore.layerSettings.needlePattern = selectedId;
        // for (let i = 0; i < mainStore.paperPaths.length; i++) {
        //     mainStore.paperPaths[i].strokeWidth = cmToPx( settingsStore.needlePattern[settingsStore.layerSettings.needlePattern].width) * mainStore.scaleView;
        //     mainStore.paperPaths[i].strokeCap = settingsStore.needlePattern[settingsStore.layerSettings.needlePattern].cap;
        //     mainStore.paperPaths[i].strokeJoin = settingsStore.needlePattern[settingsStore.layerSettings.needlePattern].join;
        // }
        settingsStore.change++;
        active.value = false;
    }

    onBeforeUnmount(() => {
      document.removeEventListener('click', close)
    })

    onMounted(() => {
      document.addEventListener('click', close)
    })

</script>


<style>
    
</style>