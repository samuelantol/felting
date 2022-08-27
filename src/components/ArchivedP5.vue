<template>
  <div class="workspace" >
    <div id="p5Canvas" > </div>
  </div>
</template>


<script setup>
    import p5 from "p5";
    import { useMainStore } from '../stores/MainStore'

    const mainStore = useMainStore()

    const s = ( sketch ) => {

        let x = 0;
        let y = 100;

        sketch.setup = () => {
            //sketch.createCanvas(500,500);
            var canvas = sketch.createCanvas(700, 700)    // needs to be somehow dynamic!
            canvas.parent("p5Canvas")
        };

        sketch.draw = () => {
            sketch.background(255)
            
        };
    };

    let myp5 = new p5(s)

    // :style="{ width: mainStore.artboardSize.x + 'vh', height: mainStore.artboardSize.y + 'vh' }"
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    #p5Canvas {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .workspace{
        background-color: aqua;
    }

</style>
