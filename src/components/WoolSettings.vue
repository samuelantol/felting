<template>
    <div class="universal-group">
        <h2 :class="{ disabled: mainStore.phase<2 }">Wool</h2>
        <div v-if="!active">
            <button @click.stop="open" :disabled="mainStore.phase<2">{{options[selected].text}} ↓</button>
        </div>
        <div v-else>
            <div v-for="option in options" :key="option.id">
                <button @click="select(option.id)" :class="{selected: option.id === selected}">{{option.text}}</button>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import { useMainStore } from '../stores/MainStore'

    const mainStore = useMainStore()

    const active = ref(false)
    const selected = ref(1)

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