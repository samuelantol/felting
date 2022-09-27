<template>
    <div  id="p5Canvas"></div>
</template>
  
  
<script setup>
    import p5 from "p5";
    import { useMainStore } from '../stores/MainStore'
    import { useSettingsStore } from '../stores/SettingsStore'
    import { onMounted } from 'vue'

    const mainStore = useMainStore()
    const settingsStore = useSettingsStore();

    var pattern = settingsStore.needlePatternP5[settingsStore.layerSettings.needlePattern].pattern;
    let width = cmToPx( settingsStore.needlePatternP5[settingsStore.layerSettings.needlePattern].width) * mainStore.scaleView;
    var change = settingsStore.change;

    onMounted(() => {
        const script = function (p5) {   
            
            // SET UP 
            p5.setup = _ => {      
                var canvas = p5.createCanvas(mainStore.artboardSize.x, mainStore.artboardSize.y);
                canvas.parent("p5Canvas");

                p5.background(255);

                showPaths();
            }     

            // DRAW
            p5.draw = _ => {
                if (change != settingsStore.change) {
                    change = settingsStore.change;
                
                    pattern = settingsStore.needlePatternP5[settingsStore.layerSettings.needlePattern].pattern;
                    width = cmToPx( settingsStore.needlePatternP5[settingsStore.layerSettings.needlePattern].width) * mainStore.scaleView;
                    
                    p5.blendMode(p5.BLEND);
                    p5.background(255);
                    
                    showPaths();
                }
            }

            function showPaths() {
                // DRAW PATHS in color and needle pattern
                for (let i = 0; i < mainStore.rawPaths.length; i++) {
                    var color = parseInt(settingsStore.pathSettings[i].speedStart);
                    var colorStep = (settingsStore.pathSettings[i].speedEnd - settingsStore.pathSettings[i].speedStart) / mainStore.rawPaths[i].length;

                    for (let j = 0; j < mainStore.rawPaths[i].length; j++) {
                        let x  = mainStore.rawPaths[i][j][0] * mainStore.scaleView;
                        let y  = mainStore.rawPaths[i][j][1] * mainStore.scaleView;

                        p5.blendMode(p5.DARKEST);
                        p5.fill(color*5);
                        p5.noStroke();

                        if (pattern === 0) {
                            p5.ellipse(x, y, width, width);
                        } else if (pattern === 1) {
                            p5.rect(x-width/2, y-width/8, width, width/4, width/8)
                        }

                        color += colorStep;
                    }
                }
                // DRAW SELECTION
                for (let i = 0; i < mainStore.selectedPaths.length; i++) {
                    for (let j = 0; j < mainStore.rawPaths[ mainStore.selectedPaths[i] ].length; j++) {
                        let x  = mainStore.rawPaths[mainStore.selectedPaths[i]][j][0] * mainStore.scaleView;
                        let y  = mainStore.rawPaths[mainStore.selectedPaths[i]][j][1] * mainStore.scaleView;
                        
                        p5.blendMode(p5.BLEND);
                        p5.fill(255, 0, 0);
                        p5.noStroke();
                        p5.ellipse(x, y, 3, 3);
                    }
                    // draw starting point
                    let x  = mainStore.rawPaths[mainStore.selectedPaths[i]][0][0] * mainStore.scaleView;
                    let y  = mainStore.rawPaths[mainStore.selectedPaths[i]][0][1] * mainStore.scaleView;

                    let color = parseInt(settingsStore.pathSettings[mainStore.selectedPaths[i]].speedStart);
                    p5.blendMode(p5.BLEND);
                    p5.stroke(255, 0, 0);
                    p5.strokeWeight(3)
                    p5.fill(color*5);
                    p5.ellipse(x, y, 7.5, 7.5);
                }
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
  