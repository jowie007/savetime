<script setup lang="ts">
import { ref } from 'vue';
let text = ref("Waiting");

const myHeaders = new Headers();
myHeaders.append("Accept", "application/xml");

const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=6121cf598e22ddccef3fdd805f543efe&artist=bicep&track=apricots&format=json", requestOptions)
    .then(response => response.json())
    .then((json) => text.value = json.track.name)
    .catch(error => console.log('error', error));
</script>

<template>
    <div id="internetRequestText">{{ text }}</div>
</template>

<style scoped>

</style>
