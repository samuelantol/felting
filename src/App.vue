<script setup>
    import { ref } from 'vue'

    import FeltingSpeed from './components/FeltingSpeed.vue'
    import NeedleHeight from './components/NeedleHeight.vue'
    import NeedlePattern from './components/NeedlePattern.vue'
    import WoolSettings from './components/WoolSettings.vue'
    import MotorSpeed from './components/MotorSpeed.vue'

    import Layers from './components/Layers.vue'
    import Export from './components/ExportABB.vue'

    import Artboard from './components/Artboard.vue'
    import ArtboardSetup from './components/ArtboardSetup.vue'

    import { useMainStore } from './stores/MainStore';
    
    const mainStore = useMainStore()

    const title = ref("Robotic felting")
</script>

<template>

    <div v-if="mainStore.phase === 0">
        <ArtboardSetup />
    </div>
    <div v-else>
        <Artboard />
    </div>

    <div class="layers">
        <div class="universal-group">
            <h1>{{title}} <br> {{mainStore.canvasSize.x}} cm x {{mainStore.canvasSize.y}} cm</h1>
        </div>
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
    body { background-color: rgb(230, 230, 230, 1); }
    @font-face {
        font-family: 'Handjet';
        src: url('./assets/fonts/Handjet-VF.ttf');
    }

    @font-face {
        font-family: 'Jakarta';
        src: url('./assets/fonts/PlusJakartaSans-VariableFont_wght.ttf');
    }

    h1 {
        /* position: absolute; */
        width: 100%;
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 40;
        font-weight: normal;
        text-align: left;
        padding: 0;
        margin: 0;
        left: 0;
    }

    /* GROUPS OF ELEMENTS */

    .small-group {
        display: flex;
        flex-direction: row;
        text-align: right;
        margin-left: auto;
        margin-bottom: 4px;
    }
    .universal-group {
        display: flex;
        flex-direction: column;
        width: 270px;
        background: rgb(220, 220, 220, 1);
        padding: 16px 16px 12px 16px;
        margin-bottom: 8px;
        border-radius: 8px;
    }
    .layers {
        position: absolute;
        text-align: left;
        margin-top: 32px;
        margin-left: 32px;
    }
    .layersGroup {
        margin-bottom: 32px;
    }
    .settings {
        text-align: right;
        margin-top: 32px;
        margin-right: 32px;

        position: absolute;
        text-align: right;
        top: 0%;
        right: 0%;
    }
    .settingsGroup {
        margin-bottom: 32px;
    }

    /* ELEMENTS */

    h2 {
        font-family: Handjet;
        font-size: 36px;
        font-variation-settings: 'wdth' 900, 'wght' 40;
        font-weight: normal;
        padding: 0;
        margin: 0px 0px 8px 0px;
    }

    span {
        font-family: Jakarta;
        font-size: 18px;
        font-variation-settings: 'wght' 420;
        margin: 0px;
        padding: 4px;
    }
    .gradient-start-end {
        margin-right: 12px;
    }

    input {
        font-family: Jakarta;
        font-size: 18px;
        font-variation-settings: 'wght' 420;
        text-align: right;
        width: 60px;
        background: none;
        border: none;
        margin: 0px;
        padding: 0px;
    }
    input:focus {
        outline: none;
    }
    input:hover {
        outline: none;
    }
    .input {
        font-family: Jakarta;
        font-size: 18px;
        font-variation-settings: 'wght' 420;

        background: rgb(255, 255, 255, 0.5);
        border: 2px solid  rgb(255, 255, 255, 0);
        border-radius: 8px;

        padding: 4px 4px 4px 12px;
    }
    .input:hover {
        outline: none;
        border: 2px solid rgb(255, 255, 255, 1);
        border-radius: 8px;
        padding-left: 12px;
    }
    .focus {
        outline: none;
        background-color: white;
        border: 2px solid #FFFFFF;
        border-radius: 8px;
        padding-left: 12px;
    }

    button {
        font-family: Jakarta;
        font-size: 18px;
        font-variation-settings: 'wght' 420;
        background: rgb(255, 255, 255, 0.5);
	    border: 2px solid  rgb(255, 255, 255, 0);
        border-radius: 8px;
	    padding: 4px 10px;
        margin: 0px 0px 4px 0px;
	    cursor: pointer;
	    outline: inherit;
    }
    button:hover {
        border: 2px solid rgb(255, 255, 255, 1);
    }
    button:active {
        background: white;
    }
    .button-paths {
        margin-left: 27px;
        font-family: Jakarta;
        font-size: 18px;
        font-variation-settings: 'wght' 120;
    }
    .button-paths:hover {
        margin-left: 27px;
    }
    .selected {
        background: white;
    }

    .plus{
        padding: 2px 10px 6px 10px;
        margin-left: 12px;
        margin-bottom: 0px;
    }
    .minus{
        padding: 2px 10px 6px 10px;
        margin-right: 12px;
        margin-bottom: 0px;
    }
    .tab-left {
        border-radius: 8px 0px 0px 8px ;
        margin: 0px 0px 8px 0px;
    }
    .tab-right {
        border-radius: 0px 8px 8px 0px ;
        margin: 0px 0px 8px 0px;
    }

    /* DISABLED STATE */

    :disabled {
        color: rgb(200, 200, 200, 1) !important;
        pointer-events: none;
        background-color: rgb(235, 235, 235, 1);
        border-color: none;
    }
    :disabled:hover {
        cursor: default;
        background-color: none;
        pointer-events: none;
    }
    .disabled {
        color: rgb(200, 200, 200, 1);
        pointer-events: none;
        background-color: none;
        border-color: none;
    }
</style>