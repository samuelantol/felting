<template>
    <div class="universal-group">
        <div v-if="mainStore.phase<5">
            <h2 class="disabled">Wool</h2>
            <button @click.stop="open" disabled>{{options[selected].text}} ↓</button>
        </div>

        <div v-else>
            <h2>Wool</h2>
            <div v-if="!active">
                <button @click.stop="open">{{options[selected].text}} ↓</button>
            </div>
            <div v-else>
                <div v-for="option in options" :key="option.id">
                    <button v-if="option.id === selected" @click="select(option.id)">{{option.text}} ←</button>
                    <button v-else @click="select(option.id)">{{option.text}}</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import { useMainStore } from '../stores/MainStore'

    const mainStore = useMainStore()

    const active = ref(false)
    const selected = ref(0)

    let id = 0
    const options = ref([
        { id: id++, text: 'white 600 g/m2' },
        { id: id++, text: 'white 300 g/m2' },
        { id: id++, text: 'black+white 600 g/m2' }
    ])

    function open() {
        active.value = true;
    }

    function close() {
        active.value = false
    }

    function select(selectedId) {
        selected.value = selectedId
        active.value = false
    }

    onBeforeUnmount(() => {
      document.removeEventListener('click', close)
    })

    onMounted(() => {
      document.addEventListener('click', close)
    })

</script>


<style>
</style>