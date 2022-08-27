<template>
    <div>
        <canvas resize id="paper-canvas" width="700"  height="700"></canvas>
    </div>
</template>


<script setup>
    import { paper } from 'paper'
    import { useMainStore } from '../stores/MainStore'
    import { onMounted } from 'vue'

    onMounted( () => {
        const mainStore = useMainStore();

        paper.setup(document.getElementById('paper-canvas'));
        const project = paper.project;


        var mysvg = project.importSVG(mainStore.svgLink, {
            expandShapes: true, // expand shapes to full Paperjs Path objects
            applyMatrix: true, // imported items have their transformation matrices applied to their contents
        });
        const paths = project.activeLayer.children;
        project.activeLayer.fillColor = 'red'

        console.log(project.activeLayer.children);
    })
</script>


<style scoped>
</style>