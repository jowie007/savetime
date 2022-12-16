<script setup lang="ts">
</script>

<template>
    <div class="numbers">
        <div :id="`number-${index}`" class="number" v-for="(_, index) in 100000">
            {{ index }}
        </div>
    </div>
</template>

<style scoped>
numbers {
    grid-template-columns: auto auto auto auto;
    display: grid;
    align-items: center;
    justify-items: center;
}

number {
    display: inline-block;
    margin: 4px;
    border-radius: 4px;
    padding: 10px;
    width: 140px;
    background-color: var(--color-background-soft);
}
</style>
