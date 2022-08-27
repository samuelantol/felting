<template>
    <div class="universal-group">
        <div v-if="mainStore.phase < 2">
            <h2 class="disabled">Needle Pattern</h2>
            <div>
                <button @click.stop="open" disabled>{{settingsStore.needlePattern[selected].text}} ↓</button>
            </div>
        </div>

        <div v-else>
            <h2>Needle Pattern</h2>
            <div v-if="!active">
                <button @click.stop="open">{{settingsStore.needlePattern[selected].text}} ↓</button>
            </div>
            <div v-else>
                <div v-for="option in settingsStore.needlePattern" :key="option.id">
                    <button v-if="option.id === selected" @click="select(option.id)">{{option.text}} ←</button>
                    <button v-else @click="select(option.id)">{{option.text}}</button>
                </div>
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
    const selected = ref(0);

    // let id = 0;
    // const options = ref([
    //     { id: id++, text: 'circular – 1 cm' },
    //     { id: id++, text: 'circular – 3 cm' },
    //     { id: id++, text: 'circular – 5 cm' },
    //     { id: id++, text: 'line – 3 cm' },
    //     { id: id++, text: 'line – 5 cm' },
    //     { id: id++, text: '3 needles in a row' },
    //     { id: id++, text: '1 needle' }
    // ]);

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
        for (let i = 0; i < mainStore.paperPaths.length; i++) {
            mainStore.paperPaths[i].strokeWidth = cmToPx( settingsStore.needlePattern[settingsStore.layerSettings.needlePattern].width) * mainStore.scaleView;
            mainStore.paperPaths[i].strokeCap = settingsStore.needlePattern[settingsStore.layerSettings.needlePattern].cap;
            mainStore.paperPaths[i].strokeJoin = settingsStore.needlePattern[settingsStore.layerSettings.needlePattern].join;
        }
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