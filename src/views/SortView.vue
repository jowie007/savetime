<template>
    <div class="sort">
        <TheSortList></TheSortList>
    </div>
</template>
  
<style>
@media (min-width: 1024px) {
    .sort {
        min-height: 100vh;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
}
</style>

<script setup lang="ts">
import TheSortList from "@/components/TheSortList.vue";
</script>
  