import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application

export const useSettingsStore = defineStore('SettingsStore', {
    state: () => {
        return {
            pathSettings: [],
            layerSettings: { needlePattern: 0, wool: 0, motorSpeed: 200 },

            speedStart: 3,
            speedEnd: 3,
            needlePattern: [
                { id: 0,    text: "circular – 1 cm",      width: 1,   cap: "round",     join: "round"},
                { id: 1,    text: "circular – 3 cm",      width: 3,   cap: "round",     join: "round"},
                { id: 2,    text: "circular – 5 cm",      width: 4,   cap: "round",     join: "round"},
                { id: 3,    text: "line – 3 cm",          width: 3,   cap: "butt",      join: "bevel"},
                { id: 4,    text: "line – 5 cm",          width: 5,   cap: "butt",      join: "bevel"},
                { id: 5,    text: "3 needles in a row",   width: 1,   cap: "butt",      join: "bevel"},
                { id: 6,    text: "1 needle",             width: 0.1, cap: "square",    join: "mister"},
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
