<template>
    <div v-if="!loaded">
        <div class="universal-group">
            <h2 :class="{ disabled: mainStore.phase<1 }">File</h2>
            <label class="file-reader" :class="{ disabled: mainStore.phase<1 }">
                upload svg
                <input type="file" @change="loadFile" />
            </label>
            <label class="file-reader" :class="{ disabled: mainStore.phase<1 }">
                upload png
                <input type="file" @change="loadFilePng" />
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
                        <button class="button-paths" :class="{ selected: isSelected(path.id) }" @click="select(path.id)">{{path.type}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="universal-group">
            <label class="file-reader">
                replace with svg
                <input type="file" @change="reload" />
            </label>
            <label class="file-reader">
                replace with png
                <input type="file" @change="reloadPng" />
            </label>
        </div>
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
    const layers = ref([ // NOT WORKING ... more imported SVGs, it's also implemented in <template>
        {id: idLayer++, text: 'layer.svg', paths: mainStore.paths}
    ])

    function toggle() {
        active.value = !active.value
    }

    function loadFile(ev) {
        file.value = ev.target.files[0]
        const reader = new FileReader()

        if (file.value.name.includes(".svg")) {
            reader.readAsText(file.value);

            mainStore.svgLink = URL.createObjectURL(file.value);        //save URL to store
            mainStore.phase = 2;

            loaded.value = true;
        }
    }

    function loadFilePng(ev) {
        file.value = ev.target.files[0]
        const reader = new FileReader()

        if (file.value.name.includes(".png")) {
            //reader.readAsText(file.value);

            mainStore.pngLink = URL.createObjectURL(file.value);        //save URL to store
            mainStore.phase = 3;

            loaded.value = true;
        }
    }

    function reload(ev) {
        mainStore.rawPaths = [];
        settingsStore.pathSettings = [];
        mainStore.pathNames = [];
        mainStore.svgLink = null;
        mainStore.pngLink = null;

        loadFile(ev);

        mainStore.reload ++;
    }

    function reloadPng(ev) {
        mainStore.rawPaths = [];
        settingsStore.pathSettings = [];
        mainStore.pathNames = [];
        mainStore.svgLink = null;
        mainStore.pngLink = null;

        loadFilePng(ev);

        mainStore.reload ++;
    }

    function isSelected(id) {
        var already = false;
        for (let i = 0; i < mainStore.selectedPaths.length; i++) {
            if (mainStore.selectedPaths[i] === id) {
                already = true;
            }
        }
        return already;
    }

    function select(id) {
        var already = isSelected(id);

        // only select one at a time
        if (mainStore.selectedPaths[0] === id) {
            mainStore.selectedPaths = [];
        } else {
            mainStore.selectedPaths = [];
            mainStore.selectedPaths.push(id);
            
            // update inputs
            settingsStore.speedStart = settingsStore.pathSettings[id].speedStart;
            settingsStore.speedEnd = settingsStore.pathSettings[id].speedEnd;
        }

        // MULTIPLE SELECTION NOT USED, but it's ready

        // if (!already) {
        //     mainStore.selectedPaths.push(id);
        //     settingsStore.speedStart = settingsStore.pathSettings[id].speedStart;
        //     settingsStore.speedEnd = settingsStore.pathSettings[id].speedEnd;
        // } else {
        //     let helpArray = [];
        //     // I THINK HERE IS SOME PROBLEM
        //     for (let i = 0; i < mainStore.selectedPaths.length; i++) {
        //         if (mainStore.selectedPaths[mainStore.selectedPaths.length-1] === id) {
        //             mainStore.selectedPaths.pop();
        //         } else {
        //             helpArray.push(mainStore.selectedPaths.pop());
        //         }
        //     }
        //     mainStore.selectedPaths.concat(helpArray);
        // }

        settingsStore.change++;
    }

    function deselect() {
        mainStore.selectedPaths = [];
        settingsStore.change++;
    }

    // deselect by clicking outside, not working very well

    // onBeforeUnmount(() => {
    //   document.removeEventListener('mousedown', deselect);
    // })

    // onMounted(() => {
    //   document.addEventListener('mousedown', deselect);
    // })
</script>


<style>
    .file-reader {
        position: relative;
        overflow: hidden;
        display: inline-block;
        cursor: pointer;
        font-family: Jakarta;
        font-size: 18px;
        font-variation-settings: 'wght' 420;
        background: rgb(255, 255, 255, 0.5);
	    border: 2px solid  rgb(255, 255, 255, 0);;
        border-radius: 8px;
	    padding: 4px 10px;
        margin: 4px 0px 0px 0px;
    }
    .file-reader:hover {
        border: 2px solid rgb(255, 255, 255, 1);
    }
    .file-reader input {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        opacity: 0;
    }
</style>