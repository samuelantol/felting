<template>
    <div class="universal-group">
        <div v-if="mainStore.phase<1">
            <div>
            <button disabled>save</button>
            </div>
            <div>
                <button disabled>export →</button>
            </div>
        </div>

        <div v-else>
            <div>
            <button>save</button>
            </div>
            <div>
                <button @click="exportFile" >export →</button>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { useMainStore } from '../stores/MainStore'
    import { useSettingsStore } from '../stores/SettingsStore';

    const mainStore = useMainStore()
    const settingsStore = useSettingsStore(); 

    let rescale = 0.3521/1000;
    let approach = 0.1;
    let postScaler = 1000;

    function exportFile() {

        var lines = "";
        let lineCount = 0;

        lines += ("def Print():\n");
        lines += ("  #set parameters\n");  
        lines += ("  global rapid_ms = 0.2\n");             // speed
        lines += ("  global speed_ms = 0.02\n");             // speed
        lines += ("  global accel_ms = 0.1\n");            // acceleration
        lines += ("  global blend_radius_m = 0.001\n");     // radius
        lines += ("  global feature = sprayplane\n");       // plane

        lines += ("  movel(pose_trans(feature, p[0,0,-0.1,0,0,0]), accel_ms, rapid_ms, 0, 0)\n"); // move home
        lines += ("  sleep(2)\n");

        lineCount += 8;

        // loop through paths
        for (let i = 0; i < mainStore.rawPaths.length; i++) {

            if (mainStore.rawPaths[i] != null) {

                let x = mainStore.rawPaths[i][0][0] * rescale;
                let y = mainStore.rawPaths[i][0][1] * rescale;

                // clamp to work area
                if (x < 0) x = 0;
                if (y < 0) y = 0;
                if (x > 1) x = 1.0;
                if (y > 1) y = 1.0;

                // move up to the first position
                lines += ("  movel(pose_trans(feature, p["+x+","+y+",-0.02,0,0,0]), accel_ms, rapid_ms, 0, 0)\n");
                // move down
                lines += ("  movel(pose_trans(feature, p["+x+","+y+",-0.01,0,0,0]),accel_ms, rapid_ms, 0, 0)\n");

                // set digital output 1 to HIGH
                lines += ("  set_standard_digital_out(1,True)\n");
                lines += ("  sleep(0.2)\n");

                x = mainStore.rawPaths[i][1][0] * rescale;
                y = mainStore.rawPaths[i][1][1] * rescale;

                // clamp to work area
                if (x < 0) x = 0;
                if (y < 0) y = 0;
                if (x > 1) x = 1.0;
                if (y > 1) y = 1.0;

                // move to second point
                lines += ("  movel(pose_trans(feature, p["+x+","+y+",-0.01,0,0,0]),accel_ms, speed_ms, 0, 0.001)\n");

                lineCount+=5;

                // loop through points
                for (let j = 2; j < mainStore.rawPaths[i].length-1; j++) { // .length-1 ?

                    x = mainStore.rawPaths[i][j][0] * rescale;
                    y = mainStore.rawPaths[i][j][1] * rescale;

                    if (x < 0) x = 0;
                    if (y < 0) y = 0;
                    if (x > 1) x = 1.0;
                    if (y > 1) y = 1.0;

                    //draw line down
                    //lines += ("  movel(pose_trans(feature, p["+x+","+y+",0,0,0,0]),accel_ms, speed_ms, 0, 0.01)\n");
                    lines += ("  movep(pose_trans(feature, p["+x+","+y+",-0.01,0,0,0]), accel_ms, speed_ms, 0.005)\n");
                    lineCount++;
                }

                x = mainStore.rawPaths[i][mainStore.rawPaths[i].length-1][0] * rescale;
                y = mainStore.rawPaths[i][mainStore.rawPaths[i].length-1][1] * rescale;
                lineCount+=2;

                if (x < 0) x = 0;
                if (y < 0) y = 0;
                if (x > 1) x = 1.0;
                if (y > 1) y = 1.0;
    
                // draw last position down
                lines += ("  movel(pose_trans(feature, p["+x+","+y+",-0.01,0,0,0]), accel_ms, speed_ms, 0, 0)\n");
                // set digital output 1 to HIGH
                lines += ("  set_standard_digital_out(1,False)\n");
                // move up
                lines += ("  movel(pose_trans(feature, p["+x+","+y+",-0.02,0,0,0]), accel_ms, rapid_ms, 0, 0)\n");
                lineCount+=3;
            }
        }

        // go above origin at the end of the file
        lines += ("  movel(pose_trans(feature, p[0,0,-0.1,0,0,0]), accel_ms, rapid_ms, 0, 0)\n");
        lines += ("end\n");
        lines += ("Print()");
        lineCount += 3;

        download("export.script", lines);
    }

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

</script>


<style>
</style>