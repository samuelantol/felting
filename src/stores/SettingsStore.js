import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application

export const useSettingsStore = defineStore('SettingsStore', {
    state: () => {
        return {
            pathSettings: [],
            layerSettings: { needlePattern: 0, wool: 0, motorSpeed: 12.5 }, 
            change: 0,

            gradient: false,
            speedStart: 3,
            speedEnd: 3,
            
            needlePatternP5: [
                { id: 0,    text: "circular – 0.7 cm",      width: 0.7,   pattern: 0}, // pattern: 0 = circle, 1 = line
                { id: 1,    text: "circular – 3 cm",      width: 3,   pattern: 0}, 
                { id: 2,    text: "circular – 5 cm",      width: 4,   pattern: 0},
                { id: 3,    text: "line – 3 cm",          width: 3,   pattern: 1},
                { id: 4,    text: "line – 5 cm",          width: 5,   pattern: 1},
                { id: 5,    text: "3 needles in a row",   width: 1,   pattern: 1},
                { id: 6,    text: "1 needle",             width: 0.1,    pattern: 0},
            ],
            wool: [
                "white – 600 g/m2",
                "white – 300 g/m2",
                "black+white 600 g/m2"
            ]
        };
    }
    // actions
    // getter ...
})
