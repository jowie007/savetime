<script setup lang="ts">
import { ref } from 'vue';
let text = ref("Waiting");
setTimeout(() => {
    text.value = "Loaded";
}, 5000);
</script>

<template>
    <div id="textAwaiterText">{{ text }}</div>
</template>

<style scoped>

</style>
