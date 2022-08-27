<script setup>
    import { ref } from 'vue'

    import FeltingSpeed from './components/FeltingSpeed.vue'
    import NeedleHeight from './components/NeedleHeight.vue'
    import NeedlePattern from './components/NeedlePattern.vue'
    import WoolSettings from './components/WoolSettings.vue'
    import MotorSpeed from './components/MotorSpeed.vue'

    import Layers from './components/Layers.vue'
    import Export from './components/ExportUR.vue'

    import Artboard from './components/Artboard.vue'
    import ArtboardSetup from './components/ArtboardSetup.vue'

    import { useMainStore } from './stores/MainStore';
    
    const mainStore = useMainStore()

    const title = ref("Robotic felting")
</script>

<template>
    <h1>{{title}} → {{mainStore.canvasSize.x}} cm x {{mainStore.canvasSize.y}} cm</h1>

    <div v-if="mainStore.phase === 0">
        <ArtboardSetup />
    </div>
    <div v-else>
        <Artboard />
    </div>

    <div class="layers">
        <div class="layersGroup">
            <Layers />
        </div>
        <div class="layersGroup">
            <Export />
        </div>
    </div>

    <div class="settings">
        <div class="settingsGroup">
            <FeltingSpeed />
            <NeedleHeight />
        </div>
        <div class="settingsGroup">
            <NeedlePattern />
            <WoolSettings />
            <MotorSpeed />
        </div>
    </div>
</template>

<style>
    body { background-color: rgb(238, 238, 238, 1); }
    @font-face {
        font-family: 'Handjet';
        src: url('./assets/fonts/Handjet-VF.ttf');
    }

    h1 {
        position: absolute;
        width: 100%;
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 40;
        font-weight: normal;
        text-align: center;
        padding: 0;
        margin: 0;
        left: 0;
    }

    /* GROUPS OF ELEMENTS */

    .universal-group {
        margin-bottom: 10px;
    }
    .layers {
        position: absolute;
        text-align: left;
        margin-left: 40px;
    }
    .layersGroup {
        margin-bottom: 40px;
    }
    .settings {
        text-align: right;
        margin-top: 40px;
        margin-right: 40px;
    }
    .settingsGroup {
        margin-bottom: 40px;
    }

    /* ELEMENTS */

    h2 {
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 40;
        font-weight: normal;
        padding: 0;
        margin: 0;
    }

    span {
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 90;
    }

    input {
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 90;
        background: none;
        border: none;
        margin: 0;
        padding: 0;
    }
    input:focus {
        border: none;
        outline: none;
        background-color: white;
        border-radius: 6px;
        padding-left: 14px;
        margin-left: -14px;
    }
    input:hover {
        border: none;
        outline: none;
        background-color: white;
        border-radius: 6px;
        padding-left: 14px;
        margin-left: -14px;
    }

    button {
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 90;
        background: none;
	    border: none;
	    padding: 0;
        margin: 0;
	    cursor: pointer;
	    outline: inherit;
    }
    button:hover {
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 120;
        background: none;
        border: none;
    }
    .button-paths {
        margin-left: 27px;
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 40;
    }
    .button-paths:hover {
        margin-left: 27px;
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 90;
    }
    .selected {
        color: red;
    }

    .plus{
        padding-left: 14px;
    }
    .minus{
        padding-right: 14px;
    }

    /* DISABLED STATE */

    :disabled {
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 10;
        pointer-events: none;
    }
    :disabled:hover {
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 10;
        cursor: default;
        background-color: none;
        pointer-events: none;
    }
    .disabled {
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 10;
        pointer-events: none;
    }
</style>