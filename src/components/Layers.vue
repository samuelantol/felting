<template>
    <div v-if="mainStore.phase<1">
        <div class="universal-group">
            <h2 class="disabled">File</h2>
            <label class="disabled">
                upload svg
            </label>
        </div>
    </div>

    <div v-else-if="!loaded">
        <div class="universal-group">
            <h2>File</h2>
            <label class="file-reader">
                upload svg
                <input type="file" @change="loadFile" />
            </label>
        </div>
    </div>

    <div v-else>
        <div class="universal-group">
            <h2>File</h2>
            <div v-if="!active">
                <div v-for="layer in layers" :key="layer.id">
                    <button @click="toggle">↓ {{file.name}}</button>
                </div>
            </div>
            <div v-else>
                <div v-for="layer in layers" :key="layer.id">
                    <button @click="toggle">↑ {{file.name}}</button>
                    <div v-for="path in mainStore.pathNames" :key="path.id">
                        <button class="button-paths" :class="{ selected: mainStore.paperPaths[path.id].selected }" @mousedown.stop="select(path.id)">{{path.type}}</button>
                    </div>
                </div>
            </div>
        </div>
        <label class="file-reader">
            replace svg
            <input type="file" @change="reload" />
        </label>
    </div>
</template>


<script setup>
    import { ref, onBeforeUnmount, onMounted } from 'vue'
    import { useMainStore } from '../stores/MainStore'
    import { useSettingsStore } from '../stores/SettingsStore'

    const mainStore = useMainStore();
    const settingsStore = useSettingsStore();

    const loaded = ref(false);
    const active = ref(false);
    const file = ref(null);

    let idLayer = 0;
    const layers = ref([ // NOT WORKING
        {id: idLayer++, text: 'layer.svg', paths: mainStore.paths}
    ])

    function toggle() {
        active.value = !active.value
    }

    function loadFile(ev) {
        file.value = ev.target.files[0]
        const reader = new FileReader()

        if (file.value.name.includes(".svg")) {
            let link = "";

            reader.readAsText(file.value);

            mainStore.svgLink = URL.createObjectURL(file.value);        //save URL to store
            mainStore.phase = 2;

            loaded.value = true;
        }
    }

    function reload(ev) {
        loadFile(ev);

        mainStore.reload ++;
    }

    function select(id) {
        if (!mainStore.paperPaths[id].selected) {
            mainStore.paperPaths[id].selected = true;
            mainStore.selectedPaths.push(id);
            settingsStore.speedStart = settingsStore.pathSettings[id].speedStart;
            settingsStore.speedEnd = settingsStore.pathSettings[id].speedEnd;
            console.log(settingsStore.pathSettings);
        } else {
            mainStore.paperPaths[id].selected = false;
            let helpArray = [];
            for (let i = 0; i < mainStore.selectedPaths.length; i++) {
                if (mainStore.selectedPaths[mainStore.selectedPaths.length-1] === id) {
                    mainStore.selectedPaths.pop();
                } else {
                    helpArray.push(mainStore.selectedPaths.pop());
                }
            }
            mainStore.selectedPaths.concat(helpArray);
        }

    }

    function deselect() {
        for (let i = 0; i < mainStore.paperPaths.length; i++) {
            if (mainStore.paperPaths[i].selected) {
                mainStore.paperPaths[i].selected = false;
            }
        }
        mainStore.selectedPaths = [];
    }

    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', deselect);
    })

    onMounted(() => {
      document.addEventListener('mousedown', deselect);
    })
</script>


<style>
    .file-reader {
        position: relative;
        overflow: hidden;
        display: inline-block;
        cursor: pointer;
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 90;
    }
    .file-reader:hover {
        font-variation-settings: 'wdth' 900, 'wght' 120;
    }
    .file-reader input {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        opacity: 0;
    }
</style>