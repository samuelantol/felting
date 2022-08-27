import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application

export const useMainStore = defineStore('MainStore', {
    state: () => {
        return {
            phase: 0,
            reload: 0,

            svgLink: null,

            canvasSize: { x: 100, y: 100 },
            artboardSize: { x: 500, y: 500 },
            scaleView: 1,

            pathNames: [],
            rawPaths: [],
            paperPaths: [],
            selectedPaths: []
        };
    }
    // actions
    // getter ...
})
