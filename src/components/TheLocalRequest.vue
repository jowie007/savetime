<script setup lang="ts">
import { ref } from 'vue';
let text = ref("Waiting");

fetch(`http://192.168.178.66:8083/api/song/12`)
    .then((response) => response.json())
    .then((json) => {
        text.value = json.artist;
    });
</script>

<template>
    <div>{{ text }}</div>
</template>

<style scoped>
</style>
