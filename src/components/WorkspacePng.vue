<template>
    <!-- <div  id="p5Canvas"></div> -->
</template>
  
  
<script setup>
    import p5 from "p5";
    import { useMainStore } from '../stores/MainStore'
    import { useSettingsStore } from '../stores/SettingsStore'
    import { onMounted } from 'vue'

    const mainStore = useMainStore()
    const settingsStore = useSettingsStore();

    // scale = size of virtual artboard / real canvas size in px
    mainStore.scaleView = mainStore.artboardSize.x / cmToPx(mainStore.canvasSize.x);

    onMounted(() => {
        const script = function (p5) {   

            mainStore.rawPaths = [];
            settingsStore.pathSettings = [];
            mainStore.pathNames = [];

            let img;

            //resolution of felted image
            let sizeX = 20;
            let sizeY = 20;

            // size of pixel = length of line: width of needle pattern should be the same as length of line (square)
            let pixelSize = cmToPx( 3 ); //cm

            // PRELOAD
            p5.preload = _ => {
                img = p5.loadImage(mainStore.pngLink);
            }
            
            // SET UP
            p5.setup = _ => {
                p5.noStroke();
                
                // round down steps
                let stepX = Math.floor(img.width / sizeX);
                let stepY = Math.floor(img.height / sizeY);

                console.log(stepX, stepY);

                let brights = [];

                //goes through every pixel, check color and saves brightness
                for (let i = 0; i < sizeX; i++) {
                    for (let j = 0; j < sizeY; j++) {

                        let c = img.get(i*stepX, j*stepY);
                        let b = p5.brightness(c)/2 + 5; // brightness maximum is 100 -> felting speed maximum can be 55(=100/2+5), minimum 5(=0+5)
                        brights.push(b);
                    }
                }

                let idPath = 0;

                for (let i = 0; i < sizeX; i++) {
                    for (let j = 0; j < sizeY; j++) {

                        // the brighest are not felted
                        if (brights[i*sizeX + j] < 50) {
                            p5.fill(brights[i*sizeX + j]);
                            p5.noStroke();

                            mainStore.rawPaths.push( [[ i*pixelSize + pixelSize/2, j*pixelSize ], [ i*pixelSize + pixelSize/2, j*pixelSize + pixelSize/4 ], [ i*pixelSize + pixelSize/2, j*pixelSize + pixelSize/2 ], [ i*pixelSize + pixelSize/2, j*pixelSize + pixelSize*3/4 ], [ i*pixelSize + pixelSize/2, j*pixelSize + pixelSize ]] );
                            settingsStore.pathSettings.push({ id: idPath, speedStart: brights[i*sizeX + j], speedEnd: brights[i*sizeX + j], needleHeight: 200 });
                            mainStore.pathNames.push({id: idPath, type: 'pixel'});

                            settingsStore.layerSettings.needlePattern = 4;

                            idPath++;
                        }
                    }
                }
            }     

            // DRAW
            p5.draw = _ => {
            }
        }

        new p5(script);
    })

    function cmToPx(cm) {
        let px = (72 * cm) / 2.54
        return px;
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    #p5Canvas {
        display: block;
        margin: 0 auto;
        padding: 0;
        overflow: hidden;
    }
</style>
  