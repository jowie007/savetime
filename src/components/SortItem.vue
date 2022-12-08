<template>
    <div :id="`list-item-${trackId}`" class="list-item">
        <!-- <div>{{ props.trackId }}</div> -->
        <div class="list-item__artists">{{ props.artists }}</div>
        <div class="list-item__name">{{ props.name }}</div>
    </div>
</template>
  
<script setup lang="ts">
const props = defineProps({
    trackId: {
        type: String,
        required: true,
    },
    artists: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});
</script>
  
<style scoped>
.list-item {
    display: inline-block;
    margin: 4px;
    border-radius: 4px;
    padding: 10px;
    width: 140px;
    background-color: var(--color-background-soft);
}

.list-item__artists {
    color: var(--color-heading);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.list-item__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
  