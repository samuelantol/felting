<template>
    <div class="canvas" :style="{ width: mainStore.artboardSize.x + 'px', height: mainStore.artboardSize.y + 'px' }">
        <div v-if="mainStore.rawPaths.length!=0">
            <P5Canvas />
        </div>
        <div v-if="mainStore.svgLink!=null">  
            <WorkspaceSvg :key="mainStore.reload"/> 
        </div>
        <div v-if="mainStore.pngLink!=null">  
            <WorkspacePng :key="mainStore.reload"/> 
        </div>
    </div>
</template>


<script setup>
    import { onMounted } from 'vue'
    import { useMainStore } from '../stores/MainStore'
    import WorkspaceSvg from './WorkspaceSvg.vue'
    import WorkspacePng from './WorkspacePng.vue'
    import P5Canvas from './P5Canvas.vue'

    const mainStore = useMainStore();

    onMounted(() => {
        const artboardWidth = window.innerWidth * 0.45;

        if (mainStore.canvasSize.x > mainStore.canvasSize.y ) {
            let helpSize = artboardWidth*1.1 / mainStore.canvasSize.x;
            mainStore.artboardSize.x = artboardWidth*1.1;
            mainStore.artboardSize.y = mainStore.canvasSize.y * helpSize;
        } else {
            let helpSize = artboardWidth / mainStore.canvasSize.y;
            mainStore.artboardSize.y = artboardWidth;
            mainStore.artboardSize.x = mainStore.canvasSize.x * helpSize;
        }
    })
</script>


<style>
    .canvas {
        background-color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 8px;
    }
    .svgfile {
        fill: none;
        stroke: black;
        stroke-width: 10px;
    }
    .st0 {
        fill: none;
        stroke: black;
        stroke-width: 50px;
    }
</style>