<template>
    <canvas id="paper-canvas" :style="{ width: mainStore.artboardSize.x + 'px', height: mainStore.artboardSize.y + 'px' }"></canvas>
</template>


<script setup>
    import { fabric } from 'fabric'
    import { paper } from 'paper'
    import { useMainStore } from '../stores/MainStore'
    import { useSettingsStore } from '../stores/SettingsStore'
    
    import { onMounted } from 'vue'

    const mainStore = useMainStore();
    const settingsStore = useSettingsStore();

    var point0 = new paper.Point(0,0);
    var idPath = 0;

    // scale = size of virtual artboard / real canvas size in px
    mainStore.scaleView = mainStore.artboardSize.x / cmToPx(mainStore.canvasSize.x);

    // size of one side of polygon
    const STEP = 10;

    // THIS FUNCTION CREATES AND RETURNS NEW PAPER PATH (WITH CUSTOM SETTINGS)
    function makeNewPaperPath(id, points) {
        return new paper.Path({
                segments: points,
                strokeColor: new paper.Color(settingsStore.pathSettings[id].speedStart / 100),
                strokeWidth: cmToPx( settingsStore.needlePattern[settingsStore.layerSettings.needlePattern].width) * mainStore.scaleView,
                strokeCap: settingsStore.needlePattern[settingsStore.layerSettings.needlePattern].cap,
                strokeJoin: settingsStore.needlePattern[settingsStore.layerSettings.needlePattern].join,
                blendMode: 'multiply',
                selected: false,
                selectedColor: 'orangered'
        });
    }

    // THIS FUNCTION TRANSFORMS DIFFERENT SVG SHAPES TO POLYGONS (ARRAY OF POINTS)
    function makePolygons(obj) {
        mainStore.pathNames.push({id: idPath, type: obj.type});
        settingsStore.pathSettings.push({ id: idPath, speedStart: 3, speedEnd: 3, needleHeight: 200 });

        if (obj.type === "path") {
            let points = polygonSampledFromPath(obj.d);
            mainStore.rawPaths.push(points);
            mainStore.paperPaths.push( makeNewPaperPath(idPath, points) );
        }
        else if (obj.type === "line") {
            let points = [ [obj.x1, obj.y1], [obj.x2, obj.y2] ]; // without steps
            // let samples = polygonLength([[obj.x1, obj.y1], [obj.x2, obj.y2]]) / STEP;
            // let points = sampledLine([obj.x1, obj.y1], [obj.x2, obj.y2], samples) // with steps
            mainStore.rawPaths.push(points);
            mainStore.paperPaths.push( makeNewPaperPath(idPath, points) );
        }
        else if (obj.type === "polyline") {
            let points = [];
            for (let i = 0; i < obj.points.length; i++) {
                points.push([obj.points[i].x, obj.points[i].y]);
            }
            mainStore.rawPaths.push(points);
            mainStore.paperPaths.push( makeNewPaperPath(idPath, points) );
        }
        else if (obj.type === "polygon") {
            let points = [];
            for (let i = 0; i < obj.points.length; i++) {
                points.push([obj.points[i].x, obj.points[i].y]);
            }
            points.push([obj.points[0].x, obj.points[0].y]); // closing the shape (difference between polygon and polyline)
            mainStore.rawPaths.push(points);
            mainStore.paperPaths.push( makeNewPaperPath(idPath, points) );
        }
        else if (obj.type === "circle") {
            // needed to redefine top left corner as point 00 and CENTER point of circle
            const center = [obj.group.viewBoxWidth/2 + obj.left + obj.radius, obj.group.viewBoxHeight/2 + obj.top + obj.radius];
            let points = [];
            var newStep = adjustStep(STEP, 2*Math.PI*obj.radius);
            var samples = 2*Math.PI*obj.radius / newStep;
            var circleStep = 2*Math.PI / samples;
            for (var i = 0; i <= 2*Math.PI; i += circleStep) {
                let x = obj.radius * Math.sin(i) + center[0];
                let y = obj.radius * Math.cos(i) + center[1];
                points.push([x, y]);
            }
            points.push(points[0]);
            mainStore.rawPaths.push(points);
            mainStore.paperPaths.push( makeNewPaperPath(idPath, points) );
        }
        else if (obj.type === "ellipse") {
            // needed to redefine top left corner as point 00 and CENTER point of circle
            const center = [obj.group.viewBoxWidth/2 + obj.left + obj.rx, obj.group.viewBoxHeight/2 + obj.top + obj.ry];
            let points = [];
            var radius = Math.min(obj.rx, obj.ry);
            var newStep = adjustStep(STEP, 2*Math.PI*radius);
            var samples = 2*Math.PI*radius / newStep;
            var circleStep = 2*Math.PI / samples;
            for (var i = 0; i <= 2*Math.PI; i += circleStep) {
                let x = obj.rx * Math.sin(i) + center[0];
                let y = obj.ry * Math.cos(i) + center[1];
                points.push([x, y]);
            }
            points.push(points[0]);
            mainStore.rawPaths.push(points);
            mainStore.paperPaths.push( makeNewPaperPath(idPath, points) );
        }
        else if (obj.type === "rect") {
            // needed to redefine top left corner as point 00
            const a = [obj.viewBoxWidth/2 + obj.lineCoords.tl.x, obj.viewBoxHeight/2 + obj.lineCoords.tl.y];
            const b = [obj.viewBoxWidth/2 + obj.lineCoords.tr.x, obj.viewBoxHeight/2 + obj.lineCoords.tr.y];
            const c = [obj.viewBoxWidth/2 + obj.lineCoords.br.x, obj.viewBoxHeight/2 + obj.lineCoords.br.y];
            const d = [obj.viewBoxWidth/2 + obj.lineCoords.bl.x, obj.viewBoxHeight/2 + obj.lineCoords.bl.y];
            let points = [a,b,c,d,a];
            mainStore.rawPaths.push(points);
            mainStore.paperPaths.push( makeNewPaperPath(idPath, points) );
        }
        idPath++
    }

    // THIS FUNCTION SAMPLES PATH TO POLYGON
    function polygonSampledFromPath(path) {

        //create SVG element PATH
        var svgpath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgpath.setAttribute('d', path);

        var points = [];
        var len  = svgpath.getTotalLength();
        var newStep = adjustStep(STEP, len);
        for (var i = 0; i <= len+1; i += newStep) {
            var p = svgpath.getPointAtLength(i);
            points.push([p.x, p.y]);
        }
        return points;
    }

    function sampledLine(a,b,samples){
        var distance = polygonLength([a,b]);
        //var step = distance/samples;
        var stepX = adjustStep((b[0] - a[0]) / samples, b[0] - a[0]);       //not working! :()
        var stepY = adjustStep((b[1] - a[1]) / samples, b[1] - a[1]);
        var points = [];
        for (var i = 0; i < samples; i ++) {
            points.push([a[0]+stepX*i, a[1]+stepY*i]);
        }
        return points;
    }

    function polygonLength(points) {
        let len = 0;
        for (var i = 0; i < points.length-1; i++) {
            var a = points[i+1][0] - points[i][0];
            var b = points[i+1][1] - points[i][1];
            len += Math.sqrt( a*a + b*b );
        }
        return len;
    }

    // ADJISTING STEP TO COVER COMPLETE LENGTH OF THE PATH
    function adjustStep(step, size) {
        let samples = Math.round(size / step);
        let newStep = size / samples;
        console.log(newStep, step, size)
        return newStep;
    }

    // THIS FUNCTION CONVERTS CM TO PX IN 72 DPI
    function cmToPx(cm) {
        let px = (72 * cm) / 2.54
        return px;
    }

    //MAIN = LOADING SVG + PROCESSING
    onMounted(() => {
        paper.setup(document.getElementById('paper-canvas'));
        const project = paper.project;

        mainStore.rawPaths = [];
        mainStore.paperPaths = [];
        mainStore.pathNames = [];

        // USE FABRIC.JS TO GET ALL SHAPES FROM SVG
        // limitation: sometimes it's difficult to work with svg data outside this function (IDK WHY)
        fabric.loadSVGFromURL(mainStore.svgLink, function(objects, options) {
            var image = fabric.util.groupSVGElements(objects, options);

            if (image.type == 'group'){
                image.forEachObject(function(obj) {
                    makePolygons(obj);
                });
                for (let i = 0; i < mainStore.paperPaths.length; i++) {
                    mainStore.paperPaths[i].scale(mainStore.scaleView, point0);
                }
            } else {
                makePolygons(image);

                mainStore.paperPaths[0].scale(mainStore.scaleView, point0);
            }

            var text = "";

            for (let i = 0; i < mainStore.rawPaths.length; i++) {
                text += '[';
                for (let j = 0; j < mainStore.rawPaths[i].length; j++) {
                    let point = '[' + Math.round(mainStore.rawPaths[i][j][0]*10)/10 + ',' + Math.round(mainStore.rawPaths[i][j][1]*10)/10 + '],';
                    text += point;
                }
                text += '],'
            }
            console.log(mainStore.rawPaths);
            console.log(text);

        });
    })
</script>


<style>
</style>