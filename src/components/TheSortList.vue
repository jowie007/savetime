<template>
  <div class="sort-wrapper">
    <div class="sort__buttons">
      <button id="sort__buttons__sort" v-on:click="tracks = insertionsort(tracks, 'name')">
        Sort
      </button>
      <!-- <button id="sort__buttons__insertionSort" v-on:click="tracks = insertionsort(tracks, 'name')">
        Insertionsort
      </button>
      <button id="sort__buttons__bubbleSort" v-on:click="tracks = bubblesort(tracks, 'name')">Bubblesort</button>
      <button id="sort__buttons__mergeSort" v-on:click="tracks = mergesort(tracks, 'name')">Mergesort</button> -->
      <button class="sort__buttons__reset" v-on:click="(tracks = [...backupTracks])">Reset</button>
    </div>
    <div class="sort__items">
      <SortItem :id="`sort__item-${index}`" v-for="(track, index) in tracks" :trackId="track.id"
        :artists="track.artists" :name="track.name">
      </SortItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { bubblesort, insertionsort, mergesort } from "@/services/sort";
import SortItem from "./SortItem.vue";

const tracks = ref([
  {
    id: "5emjjrtnPEsldZy1nDkBut",
    artists: "Bicep, Midland",
    name: "D-MIL",
  },
  {
    id: "3C2mj1542iORlkqVz0rEvw",
    artists: "Bicep, Midland",
    name: "D-MIL - Dub",
  },
  {
    id: "4vyiySWMZNSQtBqx6KBOM4",
    artists: "Bicep, Hammer",
    name: "I Believe",
  },
  {
    id: "1rHobaqSvH4w5yucqRIHsM",
    artists: "Bicep, Hammer",
    name: "Day 3",
  },
  {
    id: "7GSpybILpyfssKMTRHwKhz",
    artists: "Bicep",
    name: "Satisfy - Brassica Remix",
  },
  {
    id: "39dU8j8PicJcp2eo7xdEti",
    artists: "Bicep",
    name: "Satisfy - John Talabot Rain Mix",
  },
  {
    id: "2YWCoYKdRUjwmqp0VKEkA7",
    artists: "Bicep",
    name: "Satisfy - John Talabot Alt Mix",
  },
  { id: "2j7LRxhHJ2pzmyMvGbW7NV", artists: "Bicep", name: "Circles" },
  { id: "3tbVpJNYQ7HFjitWBR4MhO", artists: "Bicep", name: "NRG106" },
  { id: "7xZhhVBIcsgZdz0PO2bbqh", artists: "Bicep", name: "Nova" },
  {
    id: "26BDNLEXDgLXwVxyd9DIoL",
    artists: "Simian Mobile Disco, Bicep",
    name: "Sacrifice - Beatless Version",
  },
  {
    id: "7t6pyHMooWQL4EbzZ3PCnZ",
    artists: "Simian Mobile Disco, Bicep",
    name: "Sacrifice - Beatless Version 2",
  },
  {
    id: "3duB1izeYukwncJ6Zcz3vd",
    artists: "Bicep, Carl Craig",
    name: "Vision Of Love (c2 Edit) - Edit by Carl Craig",
  },
  {
    id: "1i8T313f1D5MnGTQxrYsoc",
    artists: "Bicep, Carl Craig",
    name: "Vision Of Love (c2 Bonus Edit) - Edit by Carl Craig",
  },
  { id: "4d399GbcmmXg5XUB2tNuID", artists: "Bicep", name: "Stash" },
  {
    id: "0e5pqeSxdbPR9RwexFyd3s",
    artists: "Bicep",
    name: "Courtside Drama",
  },
  { id: "3uWQUcmLWKffNs42JQhUFl", artists: "Bicep", name: "Rise" },
  { id: "6bkoVfX95nG5WEETrxbVpU", artists: "Bicep", name: "The Game" },
  { id: "5Xvr9UWdZR7oJ2Sc9SRHu1", artists: "Bicep", name: "Satisfy" },
  { id: "38IgOQBazjCCV6QUu0EH7b", artists: "Bicep", name: "Snackbar" },
  {
    id: "69AjS0OisS2gMQsucrc6tt",
    artists: "Bicep",
    name: "The Final Trip",
  },
  {
    id: "3DGm6t2kTVSl49FzgJ3TAJ",
    artists: "Bicep, Omar Odyssey",
    name: "Don't",
  },
  {
    id: "0kJ7ke2odWCMQKVyTSZcFw",
    artists: "Bicep, Ejeca, Steffi",
    name: "You - Steffi Remix",
  },
  {
    id: "2CuWBouyKJhh3KXQtEazk1",
    artists: "Bicep",
    name: "Vision Of Love",
  },
  { id: "0xowns7nojRhugispTuXjk", artists: "Bicep", name: "Keep Keep" },
  { id: "6fAANBKzilrj6hikHNjW03", artists: "Bicep", name: "Getcha Boi" },
  {
    id: "3J8NdwlqqKiC0Hv9HuM6o7",
    artists: "Bicep",
    name: "Silk - Original Mix",
  },
  {
    id: "5cQ89nJGwQpZO5nrdBhO8x",
    artists: "Bicep",
    name: "Purple Sweat - Original Mix",
  },
  {
    id: "5P1SG5duNSwRP2Rp5gtYZ1",
    artists: "Cosmic Kids",
    name: "Reginald's Groove - Bicep Remix",
  },
  {
    id: "1bvY6HWShSsAvdDYSbTfNQ",
    artists: "Bicep",
    name: "Choux - Original Mix",
  },
  {
    id: "6ZDJebLStcZikCqT7tlWId",
    artists: "Bicep",
    name: "Silk - Mark Verbos Remix",
  },
  {
    id: "4K5qjoyN5BxvfRXsr1rQUk",
    artists: "Bicep",
    name: "Darwin - Original Mix",
  },
  {
    id: "7Chd7aVbKZMpiPvSu4ZioP",
    artists: "Bicep",
    name: "Drippin - Original Mix",
  },
  {
    id: "2l3MRWf6yYsLLc72q6RskH",
    artists: "Bicep",
    name: "Darwin - Retro/ Grade Edit",
  },
  { id: "2cIICUNtb1nD0A81PwpNJR", artists: "Bicep", name: "313" },
  { id: "1baijIqoFiZLP80EgGGNbi", artists: "Bicep", name: "Winter" },
  {
    id: "6DpJveP0uQfJ7wEaXhoFRy",
    artists: "Ian Pooley, Bicep",
    name: "Cold Wait - Bicep Dub",
  },
  { id: "3LCcAEIwjsjhm29zK95mhp", artists: "Bicep", name: "Fir" },
  {
    id: "0OFpGgxNaga7wddHxbRtpw",
    artists: "Sisterhood",
    name: "Tunnels - Bicep Remix",
  },
  {
    id: "1LGKBU1sGrGabC5c8gzBuj",
    artists: "Dyone",
    name: "Only Love Can Set U-Free - Bicep Remix",
  },
  {
    id: "5JTSY2ijvgLehC1IUijT83",
    artists: "Aster",
    name: "Aster - Bicep Remix 2",
  },
  {
    id: "0K3Hr39HOk69e4lpNkkQdh",
    artists: "Blondes",
    name: "Water - Bicep Remix",
  },
  {
    id: "0uiQB7YA1CV5sKxi7ON8yB",
    artists: "Toby Tobias",
    name: "Tomorrow's Bringing - Bicep NY Remix",
  },
  {
    id: "67JlSv2HNuD7JK5GQu2kXM",
    artists: "Blood Orange",
    name: "Sutphin Boulevard - Bicep remix",
  },
  {
    id: "1fG3hkGyfYTEp7Ymf6aagt",
    artists: "Tal M. Klein",
    name: "House On The Left - Bicep Remix",
  },
  {
    id: "2wrB2jRPTd1wujQlWWnJ0r",
    artists: "Provinz",
    name: "Diese Nacht",
  },
  {
    id: "1Tb272NQuHyWVAlYZEcJDt",
    artists: "Provinz, Danger Dan",
    name: "Unsere Bank (feat. Danger Dan)",
  },
  {
    id: "56QRDlK9v5JG463sL3oRxU",
    artists: "Provinz",
    name: "Zwei Menschen",
  },
  {
    id: "0UJUoXIawV7KpPu4dRKUUh",
    artists: "Provinz",
    name: "17 für immer",
  },
  { id: "0a1nFiRZ533UDvdEkWRTYA", artists: "Provinz", name: "Spring" },
  {
    id: "3AgF2HDVpiqbfAOXhzt6iv",
    artists: "Provinz",
    name: "Verrate deine Freunde",
  },
  {
    id: "5X7f988E9FUrvjVfm9KK00",
    artists: "Provinz",
    name: "Alles gut keine Angst",
  },
  {
    id: "5AQtpIq1f5EapyCivfUDMr",
    artists: "Provinz",
    name: "Robin Skit",
  },
  {
    id: "3X7QJAwfcpTu5Or0x5tGef",
    artists: "Provinz",
    name: "Verschwendung",
  },
  { id: "7hs6iADm4iiFDA5CU2G9he", artists: "Provinz", name: "Sara" },
  { id: "7b4hdJqgZWVbPxRCku4vJA", artists: "Provinz", name: "Weit weg" },
  {
    id: "6FY3KXKhpH5hF5AO7FJT4Z",
    artists: "Provinz, Casper",
    name: "Betäub mich (feat. Casper)",
  },
  { id: "527S2oHfhTCHrbGeryqjVn", artists: "Provinz", name: "Aylin" },
  { id: "2qym3X0qnbUfuJVLKRcL4Y", artists: "Provinz", name: "Intro" },
  { id: "190WjFY2x74JEa1jL8BTSU", artists: "Provinz", name: "Tinnitus" },
  {
    id: "2wFSzqRuZ6PhLlwuxHUvCA",
    artists: "Provinz, Nina Chuba",
    name: "Zorn & Liebe (feat. Nina Chuba)",
  },
  {
    id: "1CeL9v59rZeFX63hYI4eAO",
    artists: "Provinz, MAJAN, JEREMIAS",
    name: "Liebe zu dritt",
  },
  {
    id: "1imBbINhKJE5BQDkjsaXox",
    artists: "Provinz",
    name: "Hymne gegen euch",
  },
  { id: "1DMqi5u54embkRDMgqBW4o", artists: "Provinz", name: "Großstadt" },
  { id: "05jxlV1d75GkrMEZCP9qHQ", artists: "Provinz", name: "Zimmer" },
  { id: "2XbeHu0WGHipc8BtrkLMy3", artists: "Provinz", name: "22 Jahre" },
  {
    id: "13J5FpNFQEFMy3GfLdrSnV",
    artists: "Provinz",
    name: "Ich will dich wiedersehen",
  },
  {
    id: "0yEOVrNYYjK1l4gXgMJ3Yk",
    artists: "Provinz",
    name: "Mach Platz!",
  },
  {
    id: "6tW9IfjsF6D1YdJkIE7AQl",
    artists: "Provinz",
    name: "Tanz für mich",
  },
  {
    id: "4AKX4MsoqMnhrJ2qDh3tCJ",
    artists: "Provinz",
    name: "Augen sind rot",
  },
  {
    id: "0vOGbYyA5ktPzHQwZL8Ig7",
    artists: "Provinz",
    name: "Diego Maradona",
  },
  {
    id: "51RSndA9jLYtIhkHjseiMU",
    artists: "Provinz",
    name: "Du wirst schon sehen",
  },
  {
    id: "0Q19PSB883tZVcvr6KdFT6",
    artists: "Provinz",
    name: "Verlier Dich",
  },
  { id: "1gLDJRnEIfzLAGUuELwHc7", artists: "Provinz", name: "Chaos" },
  {
    id: "5ttt3HxKyYr8Ni9TuH4Rdd",
    artists: "Provinz",
    name: "Wenn die Party vorbei ist",
  },
  {
    id: "5FcyBJt1QiI9Jrzivdi5Dr",
    artists: "Provinz",
    name: "Nur bei Dir",
  },
  {
    id: "3FfoxHaMsxbGyq7NkSGQj9",
    artists: "Provinz",
    name: "Nur Freunde",
  },
  {
    id: "4f4oGGZ9lVgWowAQrDJ0tz",
    artists: "Provinz",
    name: "Ich baute Dir Amerika",
  },
  { id: "0ut9ziaR7eLbg2K3Zabrx4", artists: "Provinz", name: "Neonlicht" },
  {
    id: "7nrjWF8qnqT59lIFLLh1Di",
    artists: "Provinz",
    name: "Was uns high macht",
  },
  { id: "2UCMIT2tKqnH4M1u4zjZPs", artists: "Provinz", name: "Zu jung" },
  {
    id: "1jEqr0IHvfksy2ql51rhDm",
    artists: "Provinz",
    name: "Reicht dir das",
  },
  {
    id: "2cGJrMY1TxKn66h6d76wc0",
    artists: "Casper, Provinz, Lena",
    name: "LASS ES ROSEN FÜR MICH REGNEN (feat. Provinz & Lena)",
  },
  {
    id: "1WNzPckO5pdIdn2e0rOLcH",
    artists: "Von Wegen Lisbeth",
    name: "EZ Aquarii",
  },
  {
    id: "7HOWjZIpjBXa8ABxlBhJPv",
    artists: "Von Wegen Lisbeth",
    name: "Auf Eis",
  },
  {
    id: "5EES0yXJmZklqO48WTxivO",
    artists: "Von Wegen Lisbeth",
    name: "Alles Ok",
  },
  {
    id: "5wO582bRa43N0vijHNEttQ",
    artists: "Von Wegen Lisbeth",
    name: "Captcha",
  },
  {
    id: "0OslwUMhrGhgJW4eLM58lp",
    artists: "Von Wegen Lisbeth",
    name: "Portugal (Autoteile auf der Fahrbahn)",
  },
  {
    id: "0NmAcUvoYBVZDdMAX20eXd",
    artists: "Von Wegen Lisbeth",
    name: "Meerschwein",
  },
  {
    id: "63L3bmFJ9tLLfLYyGg3R8q",
    artists: "Von Wegen Lisbeth",
    name: "Augen I",
  },
  {
    id: "1Zw8n5a9GDb3V0HkhmiknB",
    artists: "Von Wegen Lisbeth",
    name: "Augen II",
  },
  {
    id: "5JmAKddrtyG4ArqQsF9dEP",
    artists: "Von Wegen Lisbeth, Longus Mongus",
    name: "Fundbüro (feat. Longus Mongus)",
  },
  {
    id: "7K5qgj47CXV8eaFWsIU7Uv",
    artists: "Von Wegen Lisbeth",
    name: "L.OST",
  },
  {
    id: "5nvy1CFXRbVvJkwUwuRqnh",
    artists: "Von Wegen Lisbeth",
    name: "Sternensystem",
  },
  {
    id: "6m9SS6QVXq5152B7OZCFjf",
    artists: "Von Wegen Lisbeth",
    name: "Hochdruckgebiet",
  },
  {
    id: "7lgJgGpv4jEX70NjgJsCVk",
    artists: "Von Wegen Lisbeth",
    name: "Elon",
  },
  {
    id: "7x67flSLm2r7f4qCt1dwAZ",
    artists: "Von Wegen Lisbeth",
    name: "Augen I - Single Edit",
  },
  {
    id: "1zJjZhM9v5MuoX35y1D5nG",
    artists: "Von Wegen Lisbeth",
    name: "Opti",
  },
  {
    id: "1YV8nBs8rUiSqeNz1DUUl6",
    artists: "Von Wegen Lisbeth",
    name: "Momo",
  },
  {
    id: "2D1o2C2nvGH7LonIVKPKCQ",
    artists: "Von Wegen Lisbeth",
    name: "Portugal (Autoteile auf der Fahrbahn)",
  },
  {
    id: "49wdHjuKd5RrBmt8AN3rUk",
    artists: "Von Wegen Lisbeth",
    name: "L.OST",
  },
  {
    id: "4nZ4fU4F9dd29wJjpO487d",
    artists: "Von Wegen Lisbeth",
    name: "Podcast",
  },
  {
    id: "0S699PONkXUYffJx5qfFiA",
    artists: "Von Wegen Lisbeth",
    name: "Wieso",
  },
  {
    id: "5xmiBjGBbQyAtTvgH0fByG",
    artists: "Von Wegen Lisbeth",
    name: "Lieferandomann",
  },
  {
    id: "56VwY79h8kyYfSEHyCecFd",
    artists: "Von Wegen Lisbeth",
    name: "Alexa gib mir mein Geld zurück!",
  },
  {
    id: "0FSDp2jCZR5IUwFBbOKryC",
    artists: "Von Wegen Lisbeth",
    name: "Staub und Schutt",
  },
  {
    id: "0ylpC9ZtfrgEpATNBtz7qF",
    artists: "Von Wegen Lisbeth",
    name: "Jede Ratte der U8",
  },
  {
    id: "18qATEmzOQNZo3zzKlFMGF",
    artists: "Von Wegen Lisbeth",
    name: "30 Segways, ein Ferrari",
  },
  {
    id: "02LceEbP4iJLQNkDSyrW6a",
    artists: "Von Wegen Lisbeth",
    name: "Sweet Lilly",
  },
  {
    id: "3uCAZ7WcpYCeEqBXqfi8Uu",
    artists: "Von Wegen Lisbeth",
    name: "Westkreuz",
  },
  {
    id: "44hXjrVjBoaPEl5FJxYsQR",
    artists: "Von Wegen Lisbeth",
    name: "Alles was ich gerne hätte",
  },
  {
    id: "1ykrnK2a98ycL7qNbcdtcY",
    artists: "Von Wegen Lisbeth",
    name: "Am wenigsten zu sagen",
  },
  {
    id: "2Ye62BBZ3wasbEq6pqVqwl",
    artists: "Von Wegen Lisbeth",
    name: "Gefährder",
  },
  {
    id: "7s60IXP3MsFikB9fomadkL",
    artists: "Von Wegen Lisbeth",
    name: "Alle 11 Minuten",
  },
  {
    id: "4EbnG4nFzcUf2kR7S42w4W",
    artists: "Von Wegen Lisbeth",
    name: "Irgendwas über Delfine",
  },
  {
    id: "5NBCRuSpMGY5ckTP6TfWDQ",
    artists: "Von Wegen Lisbeth",
    name: "Meine Kneipe",
  },
  {
    id: "13FlxJxlFrtgphJb94sFAM",
    artists: "Von Wegen Lisbeth",
    name: "Chérie",
  },
  {
    id: "5zu9rnfThQpAMNRpOlA5R4",
    artists: "Von Wegen Lisbeth",
    name: "Komm mal rüber bitte",
  },
  {
    id: "4jCMZnEih7avF93RufztfJ",
    artists: "Von Wegen Lisbeth",
    name: "Drüben bei Penny",
  },
  {
    id: "0EOCkfEn4axSeo5N2GhMas",
    artists: "Von Wegen Lisbeth",
    name: "Bitch",
  },
  {
    id: "0G7vexduCvboPyIGjJXQIC",
    artists: "Von Wegen Lisbeth",
    name: "Wenn du tanzt",
  },
  {
    id: "6Yg5Tb3q7U7Y8nOpPmsI2O",
    artists: "Von Wegen Lisbeth",
    name: "Der Untergang des Abendlandes",
  },
  {
    id: "2XsbdCHvpifPWQ5LPTnFBU",
    artists: "Von Wegen Lisbeth",
    name: "Lisa",
  },
  {
    id: "7mnl4Lj12hllf83OAtyJpv",
    artists: "Von Wegen Lisbeth",
    name: "Sushi",
  },
  {
    id: "1p7RBGtYyGHKT4PHvHMO58",
    artists: "Von Wegen Lisbeth",
    name: "Bärwaldpark",
  },
  {
    id: "08GIdQOOcBgheFbz0866nE",
    artists: "Von Wegen Lisbeth",
    name: "Milchschaum",
  },
  {
    id: "5o1J7MQq3CZxPFxh5EWTJi",
    artists: "Von Wegen Lisbeth",
    name: "Becks Ice",
  },
  {
    id: "3EDunst1YzE2Pm2CrnC41S",
    artists: "Von Wegen Lisbeth",
    name: "Unterm Schrank",
  },
  {
    id: "4MpgLFvEbfasWNtIII04oH",
    artists: "Von Wegen Lisbeth",
    name: "Freigetränke",
  },
  {
    id: "2IuZnGuv5vyX4t1CsSXvEi",
    artists: "Von Wegen Lisbeth",
    name: "Sushi",
  },
  {
    id: "4xUrSSZLJ1M08rOGUx76iN",
    artists: "Von Wegen Lisbeth",
    name: "Lang lebe die Störung im Betriebsablauf",
  },
  {
    id: "7cAbMhbJsPNpWzyelFDWer",
    artists: "Von Wegen Lisbeth",
    name: "US-Studie",
  },
  {
    id: "0N7EC97vIw11YGl5angXld",
    artists: "Von Wegen Lisbeth",
    name: "Schwester",
  },
  {
    id: "6szJqokWhqTH518B2jbzna",
    artists: "Von Wegen Lisbeth",
    name: "Das Zimmer",
  },
  {
    id: "46pdQJeVrvV5ONXnalZMQO",
    artists: "Bilderbuch",
    name: "Golden Retriever",
  },
  { id: "5KbanzjMoM73gfwlOJWVt4", artists: "Bilderbuch", name: "Dates" },
  {
    id: "2rLREY4Gt4U1SOE4qscZsk",
    artists: "Bilderbuch",
    name: "I'm Not Gonna Lie",
  },
  {
    id: "2IA7D5pVuhRvSXPkWnkEV6",
    artists: "Bilderbuch",
    name: "Zwischen deiner und meiner Welt",
  },
  {
    id: "3ZVGQgi8nqg4weUwlpWMzp",
    artists: "Bilderbuch",
    name: "For Rent",
  },
  {
    id: "1P0FyJiLsbsqxdI7lNM5xO",
    artists: "Bilderbuch",
    name: "Gelb ist das Feld",
  },
  {
    id: "1s4MvxbKrFZ5po6g2ig9w2",
    artists: "Bilderbuch",
    name: "Nahuel Huapi",
  },
  {
    id: "2Wf3zK6dwKuPbREM6Cngzu",
    artists: "Bilderbuch",
    name: "Schwarzes Karma",
  },
  {
    id: "0sNdbJh5GQzRJFAVQJAod0",
    artists: "Bilderbuch",
    name: "Bergauf",
  },
  {
    id: "2vmL2iz3DSm7rjVzpahQsH",
    artists: "Bilderbuch",
    name: "Baby, dass du es weißt",
  },
  {
    id: "4bzi9el9nvAsRhHj5CuESI",
    artists: "Bilderbuch",
    name: "Ab und Auf",
  },
  {
    id: "1VI6aN3Tsa9VerSZBRrPgl",
    artists: "Bilderbuch",
    name: "La Pampa",
  },
  {
    id: "6wExaXJ7XwA6955KYMBMus",
    artists: "Bilderbuch",
    name: "Blütenstaub",
  },
  { id: "1nGClXBggdBxlyhDPf7zny", artists: "Bilderbuch", name: "Klima" },
  {
    id: "5xT7xGvsFUxO9HpqOg7Is9",
    artists: "Bilderbuch",
    name: "Daydrinking",
  },
  {
    id: "6ICPQARHre4MjKSPaKCmII",
    artists: "Bilderbuch",
    name: "Checkpoint (Nie Game Over)",
  },
  { id: "0VRHOm8gTSmoLdfwklt3RL", artists: "Bilderbuch", name: "Kitsch" },
  {
    id: "76QT6aZtqoqT2AociOMJQz",
    artists: "Bilderbuch",
    name: "Mr. Refrigerator",
  },
  { id: "5vmOGrDJWzVH5zOTwYkr7P", artists: "Bilderbuch", name: "LED go" },
  { id: "3pxO0W8lBHphoSPsOyCeCt", artists: "Bilderbuch", name: "Spliff" },
  {
    id: "7aQwnmjSKpOAHed0ZxeLPV",
    artists: "Bilderbuch",
    name: "Sandwishes",
  },
  {
    id: "4pdHFzz0Yeo777w3dm9tJn",
    artists: "Bilderbuch",
    name: "Frisbeee",
  },
  {
    id: "0RA7iEqzBiCgxplP7Y6Ack",
    artists: "Bilderbuch",
    name: "Bungalow",
  },
  {
    id: "5IdwM8zLcb5VzoN6T5iRmV",
    artists: "Bilderbuch",
    name: "eine nacht in manila",
  },
  {
    id: "6mtHZi4AktvxxA8FYL7X96",
    artists: "Bilderbuch",
    name: "Memory Card",
  },
  {
    id: "5ffSbQLSnxHwX4U2weYvDz",
    artists: "Bilderbuch",
    name: "Maschin",
  },
  {
    id: "6jOjHOqQr8qpCOoKI1mENl",
    artists: "Bilderbuch",
    name: "Mr. Supercool",
  },
  {
    id: "2ybHMVPoxIPFx2GsgCbDDV",
    artists: "Bilderbuch",
    name: "Europa 22",
  },
  {
    id: "1iCe1N87LzZFKEynWA4aB0",
    artists: "Bilderbuch",
    name: "Ich Hab Gefühle",
  },
  {
    id: "4InQneGYeB0SymC35qFsJD",
    artists: "Bilderbuch",
    name: "sneakers4free",
  },
  {
    id: "00x8VOBjgQhP4vxWpevjVG",
    artists: "Bilderbuch",
    name: "Plansch",
  },
  { id: "3CUsYy61rwbmpi6bHDnuD4", artists: "Bilderbuch", name: "Baba" },
  { id: "29jS52KXfKejRmd8NodLbd", artists: "Bilderbuch", name: "OM" },
  {
    id: "4eTgSFKKE547mUCG9wnCzh",
    artists: "Bilderbuch",
    name: "Lounge 2.0",
  },
  {
    id: "3w9LodADItzDC1HJAbVJyg",
    artists: "Bilderbuch",
    name: "Softdrink",
  },
  {
    id: "7HoreCjmuylgYT24273czg",
    artists: "Bilderbuch",
    name: "Mein Herz Bricht",
  },
  {
    id: "47Zl57xZWhaORSnkTGfefy",
    artists: "Bilderbuch",
    name: "Megaplex",
  },
  {
    id: "5MjviO4tSKAXpwcCcelRnp",
    artists: "Bilderbuch",
    name: "Schick Schock",
  },
  {
    id: "7s0xV4DZ7g4y3kd0FtSfIz",
    artists: "Bilderbuch",
    name: "Willkommen im Dschungel",
  },
  {
    id: "15iLdoYlEqbJn9am1b6GLn",
    artists: "Bilderbuch",
    name: "Babylon",
  },
  {
    id: "6DlFmpD1qB3VegNHcvg1Zl",
    artists: "Bilderbuch",
    name: "Erzähl Deinen Mädels Ich Bin Wieder In Der Stadt",
  },
  {
    id: "0TAg0EKs5vgbqEdLBEyetV",
    artists: "Bilderbuch",
    name: "I <3 Stress",
  },
  {
    id: "67TmAijBpxtWJZ6CIfmS28",
    artists: "Bilderbuch",
    name: "Bitte, Herr Märtyrer",
  },
  {
    id: "6WLEIwVF223Y1iL7KZoDyC",
    artists: "Bilderbuch",
    name: "Sweetlove",
  },
  {
    id: "3su7XF5lyh0EbPMCI1Y6YA",
    artists: "Bilderbuch",
    name: "Joghurt auf der Bluse",
  },
  {
    id: "3RgOmqExNHHCDFNg8Fg6uJ",
    artists: "Bilderbuch",
    name: "Ein Boot für uns",
  },
  {
    id: "4Cji1BXFMPEPsi0XqgsH6n",
    artists: "Bilderbuch",
    name: "Kopf ab",
  },
  {
    id: "5DTwPcLbS20KDtLsBiImSi",
    artists: "Bilderbuch",
    name: "Karibische Träume",
  },
  {
    id: "1suM5gBStrUH99y5sQ8NYm",
    artists: "Bilderbuch",
    name: "Calypso",
  },
  { id: "0zE2eJSF7A7DF247uXVe7v", artists: "ÄTNA", name: "Blossom" },
  {
    id: "3chmBbubsSWVeCNAp0wjOr",
    artists: "ÄTNA, Fuchy",
    name: "Brother - Fuchy Remix",
  },
  {
    id: "3UDBkno949oVPXjbwuPzEM",
    artists: "Martin Kohlstedt, ÄTNA",
    name: "KSYCHA (ÄTNA Who Are You Rework)",
  },
  { id: "3O8b9Cwl3WMeOdQFUzkVEA", artists: "ÄTNA", name: "Flow" },
  { id: "5kCUyARHlkOpDvSttThOro", artists: "ÄTNA", name: "Sister" },
  {
    id: "48VG3hlnmbL1YA79YsiLsP",
    artists: "ÄTNA",
    name: "La La La La La",
  },
  {
    id: "2vjpKwwyeGT8LtWMQ98Ywz",
    artists: "Solomun, ÄTNA",
    name: "Prospect (feat. ÄTNA)",
  },
  {
    id: "7HUj949kSi8oKtx5gKwxhp",
    artists: "Komfortrauschen, Inéz Schaefer, ÄTNA",
    name: "Astray",
  },
  { id: "0ICPu4UQRmkejCttlXInFh", artists: "ÄTNA", name: "Grinding" },
  { id: "0lAn9vOikuCzKJ1HnClS57", artists: "ÄTNA", name: "Walls" },
  {
    id: "6mCZjiGhGDhoXsBsLd0L26",
    artists: "ÄTNA",
    name: "In Their Eyes",
  },
  { id: "2eX6o1ewHlbOTbmVjO85or", artists: "ÄTNA", name: "Remission" },
  {
    id: "7KlF67KngHwnwVSMWNwmMy",
    artists: "ÄTNA",
    name: "Shut Your Mouth",
  },
  { id: "2mroze7N9GVR7yWAWs7wP7", artists: "ÄTNA", name: "Hearts" },
  { id: "7mlKOsocgtm6qvSTevzIin", artists: "ÄTNA", name: "Brother" },
  { id: "0qk5pYRb1m5jr0zSOw4Oro", artists: "ÄTNA", name: "Bond" },
  { id: "7ygNByMVa4UF9KdBrVKZ82", artists: "ÄTNA", name: "Won't Stop" },
  {
    id: "7E7D6Db8wfIEeNryNiDXtr",
    artists: "Parcels",
    name: "Somethinggreater - Single Version",
  },
  {
    id: "6qm8sNL2PXZHVT97gp3Y0J",
    artists: "Parcels",
    name: "Famous - Single Version",
  },
  {
    id: "5gw6D0cBSEBGlv68liOrne",
    artists: "Parcels",
    name: "Comingback - Single Version",
  },
  {
    id: "66tkDkPsznE5zIHNt4QkXB",
    artists: "Parcels",
    name: "Tieduprightnow",
  },
  {
    id: "6kPsTBAGRoAeCCbzYoAZIm",
    artists: "Parcels",
    name: "Free - Single Version",
  },
  { id: "0hhXziDUO0wNYPsstDQWN6", artists: "Parcels", name: "Overnight" },
  {
    id: "2zcqL8jheETC85OYOgaBl8",
    artists: "Parcels",
    name: "Theworstthing",
  },
  {
    id: "2gXYLIrLrHVViRCnbh8kCQ",
    artists: "Parcels",
    name: "NowIcaresomemore",
  },
  { id: "1qtiESAzfGMw3YqJvI97ki", artists: "Parcels", name: "Lightenup" },
  { id: "7dEFIvrudJoPhrzWSYgCJX", artists: "Parcels", name: "LordHenry" },
  {
    id: "3R1DPDoWdFdPeBj4aLwqBo",
    artists: "Parcels",
    name: "Bemyself - from Hansa Studios, Berlin",
  },
  {
    id: "0rdWkO7ncrh1lrJGDmLq9L",
    artists: "Parcels",
    name: "Gamesofluck",
  },
  {
    id: "4M3MUIXtQLN2qRPcwcpHzW",
    artists: "Parcels",
    name: "IknowhowIfeel - from Hansa Studios, Berlin",
  },
  { id: "633Oe7gtfWB8lq1Vxyiahm", artists: "Parcels", name: "Once" },
  { id: "2uyfIMxzUIUeO8vKf7s9LD", artists: "Parcels", name: "Outside" },
  {
    id: "0oEUagxKUH6rKFYlqNC7rz",
    artists: "Parcels",
    name: "Myenemy - from Hansa Studios, Berlin",
  },
  {
    id: "1Avnd5xLg7HmaNofmYk7RQ",
    artists: "Parcels",
    name: "Withorwithout",
  },
  {
    id: "1Uxti0PEEdieT526B8dAxZ",
    artists: "Parcels",
    name: "Somethinggreater",
  },
  {
    id: "2IFaUS63AIAr9P46W1lEwt",
    artists: "Parcels",
    name: "IknowhowIfeel",
  },
  { id: "3RZauEkvORMeP06npyaIYa", artists: "Parcels", name: "Famous" },
  {
    id: "6W1CYXq9pGEnNNCCW62xu8",
    artists: "Parcels",
    name: "Comingback",
  },
  { id: "6kAOOamDflxqkrAWI6wZRR", artists: "Parcels", name: "Free" },
  {
    id: "0EvZksFiDpboeG4UVaIvJa",
    artists: "Parcels",
    name: "Theworstthing",
  },
  {
    id: "0ax2Np3bXCUXCcYmcX5x1x",
    artists: "Parcels",
    name: "Overnight - from Hansa Studios, Berlin",
  },
  {
    id: "0JSG8Hu6aMidPm1QRqboQD",
    artists: "Parcels",
    name: "Inthecity (Interlude)",
  },
  { id: "7umYeP4UtIrOrupomdhVPL", artists: "Parcels", name: "Daywalk" },
  { id: "14tNhGhMYj6W5pPfdQoBmN", artists: "Parcels", name: "LIGHT" },
  { id: "3tIkgwEuDBY2xfYsaWZfo9", artists: "Parcels", name: "SHADOW" },
  {
    id: "017Zy32lho0ex9FOxSajEx",
    artists: "Parcels",
    name: "Neverloved",
  },
  {
    id: "2SteMjckIBYamiiHEtEt11",
    artists: "Parcels",
    name: "Icallthishome",
  },
  { id: "3CC8GnChqlFoM49XBDAZ0w", artists: "Parcels", name: "Thefear" },
  { id: "50yh4CvMEX4eAxtMeYFLWz", artists: "Parcels", name: "Nightwalk" },
  { id: "1u7fLNwWhqMpgpakKhfpXp", artists: "Parcels", name: "Reflex" },
  { id: "3TsZbQfgWNERW39f2Wz5Wn", artists: "Parcels", name: "Inside" },
  { id: "0i03wGCBt7FuCCGY4Myt9u", artists: "Parcels", name: "SHADOW" },
  { id: "27CgDxfu01fKsQCzn2UFVR", artists: "Parcels", name: "Older" },
  { id: "4H78HR8fBjJRWRueFVKo79", artists: "Parcels", name: "Comedown" },
  { id: "2eC43PWHMbUnwqCRZcbGfo", artists: "Parcels", name: "Exotica" },
  { id: "7z5R6cbZpB4njz080aA6u2", artists: "Parcels", name: "Hideout" },
  {
    id: "1rIPNuXlthhSUphhva5d5y",
    artists: "Parcels, Alex Metric",
    name: "Lightenup - Alex Metric Remix",
  },
  {
    id: "7mgxJci0i2wKTTC7n1zxoE",
    artists: "Parcels, Roisto",
    name: "Herefore - Roisto Remix",
  },
  { id: "5233fZGEk0FY0AzdgLaWch", artists: "Parcels", name: "Everyroad" },
  { id: "1UgFc4ln6Knfupr88jfQdP", artists: "Parcels", name: "Myenemy" },
  {
    id: "55ePH4TKRkvSBmg5kI8K1m",
    artists: "Parcels",
    name: "Enter - from Hansa Studios, Berlin",
  },
  {
    id: "2PHMNg5e3xMGR0oTLmdj0U",
    artists: "Parcels",
    name: "Anotherclock",
  },
  {
    id: "0QugsGHunz3peiUxRg51WE",
    artists: "Parcels",
    name: "Redline - from Hansa Studios, Berlin",
  },
  {
    id: "04YsaTosW9B6i4yaTp766U",
    artists: "Parcels",
    name: "Elude - from Hansa Studios, Berlin",
  },
  {
    id: "46Yk35nGRNyvoAhBOIF8n6",
    artists: "L'Impératrice, Parcels",
    name: "Séquences - Parcels Remix",
  },
  {
    id: "0ZcOprrr9ubO9ORfjbHjsx",
    artists: "Parcels",
    name: "Lightenup - from Hansa Studios, Berlin",
  },
  {
    id: "53ElE1J1DwuwVxpINXYJpb",
    artists: "Parcels",
    name: "Gamesofluck - from Hansa Studios, Berlin",
  },
  { id: "0spju7D9COKViYQAqqGlyM", artists: "Parcels", name: "Allaround" },
  {
    id: "0M2Mt7RzKZb9LNRFbNulKO",
    artists: "Parcels, Breakbot",
    name: "Lightenup - Breakbot Remix",
  },
  {
    id: "7AjIaClCYWHsmdnoZIJ7Qb",
    artists: "Parcels",
    name: "Clockscared - liveatspotifylondon",
  },
  {
    id: "16TOXB89SudGos8sJjkJpe",
    artists: "Parcels, Disco Despair",
    name: "Hideout - Disco Despair Remix",
  },
  { id: "31MVNm9lcrEH0B3z5Rc64j", artists: "Parcels", name: "Herefore" },
  { id: "2aE8uSjiWN0k4Nkvp0bUwB", artists: "Parcels", name: "Bemyself" },
  {
    id: "2TeGrk8lm2DhSnAx63KAqv",
    artists: "Parcels",
    name: "Yourfault - from Hansa Studios, Berlin",
  },
  { id: "1hRQ0Kzy8gZXEikgrsOT9O", artists: "Parcels", name: "Tape" },
  {
    id: "6GGXja13qA0BYNNAqgXQxS",
    artists: "Parcels",
    name: "Withorwithout - from Hansa Studios, Berlin",
  },
  {
    id: "6ynpjKUatAPVLmfgzTXvOG",
    artists: "Parcels",
    name: "Closetowhy",
  },
  { id: "6jhdjIaErMtj2ymt0PufjG", artists: "Parcels", name: "Yourfault" },
  {
    id: "6gtFpBTeBiPAVQIoI4u3az",
    artists: "Parcels, Dean Dawson",
    name: "Credits (feat. Dean Dawson)",
  },
  {
    id: "6GQEhwaBBC1E2pzlRlGity",
    artists: "Parcels",
    name: "Comedown - from Hansa Studios, Berlin",
  },
  {
    id: "4l9uFziLnJgpdBoBqUtoum",
    artists: "Parcels",
    name: "Intrude - from Hansa Studios, Berlin",
  },
  {
    id: "7qnPkAQCXIP7ORlgPE8Ubo",
    artists: "Parcels",
    name: "Overnight - liveatspotifylondon",
  },
  {
    id: "2s7nxagCl9fnFUoNIQxjnp",
    artists: "Parcels",
    name: "Everyroad - from Hansa Studios, Berlin",
  },
  {
    id: "4cyygA6kLAF2H6QqwmACHd",
    artists: "Parcels",
    name: "Tieduprightnow - from Hansa Studios, Berlin",
  },
  {
    id: "4Y668YELGKHZ36nfTE3eBu",
    artists: "Parcels",
    name: "Closetowhy - from Hansa Studios, Berlin",
  },
  {
    id: "35kZ2D9sADNOZ53zWOljkQ",
    artists: "Parcels",
    name: "Retuned - from Hansa Studios, Berlin",
  },
  {
    id: "6VQDFodEZkjmfAqCCcVLOm",
    artists: "Parcels",
    name: "Untried - from Hansa Studios, Berlin",
  },
  {
    id: "0O7eVZ2NnZKA7WDX4vQbCy",
    artists: "Sofi Tukker",
    name: "Drinkee",
  },
  {
    id: "4tllh6DmZXgUTMjI0oN6c5",
    artists: "Sofi Tukker, Betta Lemme",
    name: "Awoo (feat. Betta Lemme)",
  },
  {
    id: "2AtleKEZy5KkmlAj0krALx",
    artists: "Sofi Tukker",
    name: "Matadora",
  },
  {
    id: "708tfEeWMOyBbu5VngF5JS",
    artists: "Sofi Tukker",
    name: "Hey Lion",
  },
  {
    id: "0KM6nqZWWbxleQ5hoCBFA8",
    artists: "Sofi Tukker",
    name: "Moon Tattoo",
  },
  {
    id: "5YYOeHBnyT11JyiKJLRWc5",
    artists: "Sofi Tukker",
    name: "Déjà vu Affair",
  },
  {
    id: "2Uo0BweqJT5TYWMxBGt5R6",
    artists: "Sofi Tukker",
    name: "Fuck They",
  },
  {
    id: "2Vkta6KBzwPtFwCpuguGeu",
    artists: "Sofi Tukker",
    name: "Energia",
  },
  {
    id: "2uwnrZTb2VIbMCSIyNNxD1",
    artists: "Sofi Tukker",
    name: "Benadryl",
  },
  {
    id: "07wiTRlnyYjxGkYvORTdiV",
    artists: "Sofi Tukker",
    name: "Batshit",
  },
  {
    id: "1kdL29tfKlxVKxLiXy8WuS",
    artists: "Sofi Tukker, Charlie Barker",
    name: "Good Time Girl",
  },
  { id: "6fRDIjQ6OVi6Z8rrCSr6BG", artists: "Sofi Tukker", name: "Johny" },
  {
    id: "1MrEoAzYzNds4jk0Capx1p",
    artists: "Sofi Tukker",
    name: "My Body Hurts",
  },
  {
    id: "1O1oFG46iGVUsnK8yCuppO",
    artists: "Sofi Tukker",
    name: "The Dare",
  },
  {
    id: "6NNP27VopCg9igRuWCRt6P",
    artists: "Sofi Tukker",
    name: "Baby I'm A Queen",
  },
  {
    id: "1zEhH5BmSpKi1mRSIfBDOq",
    artists: "Sofi Tukker, NERVO, The Knocks, ALISA UENO",
    name: "Best Friend",
  },
  { id: "1tvTr5mUHAzoNuTkYLep1F", artists: "Sofi Tukker", name: "Kakee" },
  {
    id: "6a5AULmLVw7BHqDsX2OsuX",
    artists: "Sofi Tukker",
    name: "Original Sin",
  },
  {
    id: "5kyJ6sznnWACqHbw65p34Q",
    artists: "Sofi Tukker",
    name: "Summer In New York",
  },
  {
    id: "5T6dWZIl0ePMxWUzKQbhji",
    artists: "Sofi Tukker, Mahmut Orhan",
    name: "Forgive Me",
  },
  {
    id: "5Sw2EtNVnhiR4nVAD5tsNw",
    artists: "Sofi Tukker",
    name: "Wet Tennis",
  },
  {
    id: "5DFt1BNBUNOKuzzJRSdSnf",
    artists: "Sofi Tukker",
    name: "Interlude",
  },
  {
    id: "4OssNR8i2CZHzIBJDxRh2e",
    artists: "Sofi Tukker, John Summit",
    name: "Sun Came Up",
  },
  {
    id: "7ncRHWKa9bZS2RlTWVVjQM",
    artists: "Sofi Tukker, Tuck's Dad",
    name: "Larry Bird (feat. Tuck's Dad)",
  },
  {
    id: "1O4jgAGdN643klU6yzFFzq",
    artists: "Sofi Tukker, BOII",
    name: "Hold",
  },
  {
    id: "1OXlJgwK5GCoxPLZ8c4r5T",
    artists: "Sofi Tukker, Amadou & Mariam",
    name: "Mon Cheri",
  },
  { id: "1B7AQGTmO8jfcCqUGlHo5V", artists: "Sofi Tukker", name: "Freak" },
  {
    id: "4AsCoWKZ7i1c5WY5xWkhz9",
    artists: "Sofi Tukker",
    name: "What A Wonderful World",
  },
  { id: "1gfx7QgIZDUJGtlovLlHaq", artists: "Sofi Tukker", name: "Swing" },
  {
    id: "6uf2JllfR00Dnq2JeKBXzs",
    artists: "Sofi Tukker, Bomba Estéreo",
    name: "Playa Grande",
  },
  {
    id: "6quMK3dI87wWd4jpPOQrI5",
    artists: "Leoniden",
    name: "Disappointing Life",
  },
  { id: "4MaK3ys8w39IMjjmGflTCo", artists: "Leoniden", name: "Applause" },
  { id: "3xTEfAJhko5642zyTTgOfR", artists: "Leoniden", name: "Kids" },
  { id: "2VBoZEUDsdOqbHLUxNEg9p", artists: "Leoniden", name: "Alone" },
  { id: "7oTtukHlYKJluNc0jbpAxf", artists: "Leoniden", name: "1990" },
  { id: "0Gz4YvexeA2oMBp2KQiQtx", artists: "Leoniden", name: "Why" },
  { id: "37vL4xUQeI29plzW9AOa8r", artists: "Leoniden", name: "River" },
  {
    id: "7jbCCSAOkwUrlIBVBdvO9r",
    artists: "Leoniden",
    name: "Down The Line",
  },
  { id: "3D11CmHetxApVv2iNWcEg3", artists: "Leoniden", name: "People" },
  {
    id: "6EBn40MU1VLPoXy88wM39P",
    artists: "Leoniden",
    name: "Colorless",
  },
  {
    id: "6FyEosDN0xJkji0RxzOOW6",
    artists: "Leoniden",
    name: "One Hundred Twenty-Three",
  },
  {
    id: "4BduXwyDFMXlsgSmrX8C1t",
    artists: "Leoniden",
    name: "Not Enough",
  },
  { id: "0kLGabbJx013ilG5Z9vnqn", artists: "Leoniden", name: "Slow" },
  {
    id: "28j1hqVIQ58bfTUuSBHsUx",
    artists: "Leoniden",
    name: "Nevermind",
  },
  {
    id: "1ZHNFsfxWoWvB05CjpZfa0",
    artists: "Leoniden",
    name: "The Tired",
  },
  {
    id: "0TGq1LnZjzUiTIxkjWXyFW",
    artists: "Leoniden",
    name: "Iron Tusk",
  },
  { id: "1000NHkwAQw4rpmjT5y4v9", artists: "Leoniden", name: "Doves" },
  { id: "0KhnEIxmUoeIZKtgFK2HWc", artists: "Leoniden", name: "Remote" },
  { id: "7zrXS0Mp9h3KynGEx50TP4", artists: "Leoniden", name: "Sisters" },
  { id: "2MZGLmHbpG1Xs9uIZbkEY8", artists: "Leoniden", name: "Storm" },
  { id: "51GM9QNEgGNDuINiNEs6oE", artists: "Leoniden", name: "North" },
  { id: "1Tl52yhkxLCkYjbuMZ9PO6", artists: "Leoniden", name: "City" },
  {
    id: "7EikKRlfzydnqu5vwhhopj",
    artists: "Leoniden",
    name: "Two Peace Signs",
  },
  {
    id: "2ob1yagO5ie2a7TniryhLb",
    artists: "Leoniden",
    name: "Eleven Hands",
  },
  {
    id: "3miMZ2IlJiaeSWo1DohXlN",
    artists: "Milky Chance",
    name: "Stolen Dance",
  },
  {
    id: "6Ql7rNuoP90aIdgwQkPYBP",
    artists: "Milky Chance",
    name: "Synchronize",
  },
  {
    id: "0ZYok0WAPtc97pzHuDwW1f",
    artists: "Milky Chance",
    name: "As It Was",
  },
  {
    id: "2rka4zjHzif5Y3yBBFgBU3",
    artists: "Milky Chance",
    name: "Down By The River - Acoustic Version",
  },
  {
    id: "0eZmBWVC1HYayrP2fqQ7nu",
    artists: "Milky Chance",
    name: "Colorado",
  },
  {
    id: "0GM071OWnLj7XbblrwSlo0",
    artists: "Milky Chance",
    name: "Troubled Man",
  },
  {
    id: "2zR85boqjMOKPygjdDbGbC",
    artists: "Milky Chance, Paulina Eisenberg",
    name: "Unknown Song",
  },
  {
    id: "2dPhaqqNSBsmlxVknA2M6F",
    artists: "The Kooks, Milky Chance",
    name: "Beautiful World",
  },
  {
    id: "6XWsIlOw94W4lT5Xu0MdRf",
    artists: "Milky Chance",
    name: "Table for Two",
  },
  {
    id: "1wAPbQ5XjbZqPl0WDl5mHH",
    artists: "Milky Chance",
    name: "Tainted Love",
  },
  {
    id: "3PIs1vosCm2jxHX3E7Q1M0",
    artists: "Milky Chance",
    name: "Synchronize - Acoustic Version",
  },
  {
    id: "36fHADliwp4ColP0Gypg5W",
    artists: "Milky Chance, Jack Johnson",
    name: "Don't Let Me Down",
  },
  {
    id: "12Bo1GD9HWrc73vvK8WHOk",
    artists: "Milky Chance",
    name: "Flashed Junk Mind",
  },
  {
    id: "1iRoX1aGWT6C48LIdbTWr8",
    artists: "Milky Chance",
    name: "Colorado - Acoustic Version",
  },
  {
    id: "7KTaMCLF5mtqWOsIs5jo3u",
    artists: "Milky Chance, Paulina Eisenberg, Christian Löffler",
    name: "Unknown Song - Christian Löffler Remix",
  },
  {
    id: "3XV2fbbs1I5Qy1qniUjbQM",
    artists: "Milky Chance",
    name: "Oh Mama",
  },
  {
    id: "5lzAbBXh1KwoEYVu0zke67",
    artists: "Milky Chance",
    name: "It Is What It Is",
  },
  {
    id: "3DUhxfgyzNi0cCmZWDWfnS",
    artists: "Milky Chance",
    name: "Stolen Dance - Acoustic Version",
  },
  {
    id: "0K7CNVLDJbYY3x2yBqNGTa",
    artists: "Milky Chance",
    name: "Cold Summer Breeze",
  },
  { id: "5MX4VZkiJafcUk5gCZ0cil", artists: "Milky Chance", name: "Fado" },
  {
    id: "0L87MffumRNWrY2SNUFcvs",
    artists: "Milky Chance",
    name: "Cocoon",
  },
  {
    id: "3XjNIRMZhz8dzM1XkD2VS0",
    artists: "Milky Chance",
    name: "Flashed Junk Mind - Acoustic Version",
  },
  {
    id: "54eed36O0lRORfHHEilKCs",
    artists: "Milky Chance, RAC",
    name: "Synchronize - RAC Mix",
  },
  {
    id: "7sSY4sRuqCbfPWXqdJCmeW",
    artists: "Milky Chance",
    name: "Down By The River",
  },
  {
    id: "5ti4MjhnxmSYstOAQ1JxU0",
    artists: "Milky Chance",
    name: "Love Again",
  },
  {
    id: "7hA7ImyAWuT0YPY5k6B0my",
    artists: "Milky Chance",
    name: "Do You Really Want To Hurt Me?",
  },
  {
    id: "5q28j6DBCKaNyHVBN38lPm",
    artists: "Milky Chance",
    name: "Blossom - Single Version",
  },
  {
    id: "3SsjacM1asTccK0MGDA0gr",
    artists: "Milky Chance, Icarus",
    name: "Colorado - Icarus Remix",
  },
  {
    id: "6GwJ9j9lAtlPSyxOhocwF6",
    artists: "Milky Chance",
    name: "Lost In Yesterday",
  },
  {
    id: "1u2mQ0E0zbVDVoCnvGAd0Z",
    artists: "Milky Chance",
    name: "Feathery - Slow Version",
  },
  {
    id: "2NSKLbBh3PN1fTlMvuqP3Z",
    artists: "Milky Chance",
    name: "Sweet Sun - Acoustic Version",
  },
  {
    id: "05B0oTmBb6xdUJ9VyxsaE0",
    artists: "Milky Chance",
    name: "Glass of Wine",
  },
  {
    id: "6lfJR4TfASNGNyg0oUyDVH",
    artists: "Milky Chance",
    name: "Don't Let Me Down - Acoustic Version",
  },
  {
    id: "34eGAGPZsfuYf3EiNnWS7E",
    artists: "Milky Chance",
    name: "Doing Good",
  },
  {
    id: "6eqWA6blXyJWkt2BjZdX8d",
    artists: "Milky Chance",
    name: "Levitating",
  },
  {
    id: "5OjJHlx3t3eqrjamHk23rl",
    artists: "Milky Chance",
    name: "Running - Acoustic Version",
  },
  {
    id: "3cLkQHJcSAOUsn0RYHDapZ",
    artists: "Milky Chance",
    name: "Becoming - Acoustic Version",
  },
  {
    id: "3YuXIIgbfThb5RtNVKagaS",
    artists: "Milky Chance, Tash Sultana",
    name: "Daydreaming",
  },
  {
    id: "776XbFOvr4AwQZIOEq4Fcc",
    artists: "Milky Chance",
    name: "Butterfly_Demo",
  },
  {
    id: "7jYcqOZTwCefmIPTyRelsX",
    artists: "Milky Chance",
    name: "The Game",
  },
  {
    id: "726ciyvrGs455s80C2ZvHp",
    artists: "Milky Chance",
    name: "Fabulous_Demo",
  },
  {
    id: "1YfGIiie5pnprac7cRoAWp",
    artists: "Milky Chance",
    name: "Long Run",
  },
  {
    id: "5nB6fornCoHFMEHRdPY5Aw",
    artists: "Milky Chance",
    name: "La Noche De Anoche",
  },
  {
    id: "072gJidO70ft5SB1ZNtC82",
    artists: "Milky Chance",
    name: "Ego - Acoustic Version",
  },
  {
    id: "34mEgQ8lubKSiASCZwEHiX",
    artists: "Milky Chance",
    name: "We Didn't Make It To The Moon",
  },
  {
    id: "4GXEMLeWTHBpYLQQFIyBNe",
    artists: "Milky Chance",
    name: "Window - Acoustic Version",
  },
  {
    id: "74nPMKhOnrBnFhYNfq3gDI",
    artists: "Milky Chance, Ladysmith Black Mambazo",
    name: "Eden's House",
  },
  {
    id: "0571NjuRlSv3lni7Md9Ivx",
    artists: "Milky Chance",
    name: "I Am Lost_Demo",
  },
  {
    id: "1X6Kmaa2Yq70vF0cIQ6V0f",
    artists: "Milky Chance",
    name: "Save Your Tears",
  },
  {
    id: "41UBTzyPAbtkge6aWVr7Uy",
    artists: "Milky Chance",
    name: "Scarlet Paintings",
  },
  {
    id: "0p8PhJtNjycGLW2tVUJCU2",
    artists: "Milky Chance",
    name: "Loveland - Acoustic Version",
  },
  {
    id: "3xmqSkckvATnhvkFyNoZOg",
    artists: "Milky Chance",
    name: "Right From Here",
  },
  {
    id: "5JgMSRZPJ5Yi5Yu8tHfnoR",
    artists: "Milky Chance",
    name: "Fallen",
  },
  {
    id: "2hTRnvigUsQiXH851R6l4n",
    artists: "Milky Chance",
    name: "Peripeteia",
  },
  {
    id: "0EswG84RRuhu44ekkHUxXJ",
    artists: "Milky Chance",
    name: "Window",
  },
  {
    id: "2zJ0u78baAFxX9SoSpeyoi",
    artists: "Milky Chance",
    name: "We Didn’t Make It To The Moon - Acoustic Version",
  },
  {
    id: "7hYlE1arzCRD4nj0UCorX5",
    artists: "Milky Chance",
    name: "Firebird - Acoustic Version",
  },
  { id: "7JgYCXSih0sY1EnNImzwdH", artists: "Milky Chance", name: "Ego" },
  {
    id: "2O2Bjnnfnf8NJzNS3fEiLf",
    artists: "Milky Chance, Témé Tan",
    name: "Rush",
  },
  {
    id: "1qEgjYcmAyPqe7xQuRMpdN",
    artists: "Milky Chance",
    name: "Piano Song",
  },
  {
    id: "4glC5E7ujMRjdaEK8xWXOO",
    artists: "Milky Chance",
    name: "Fairytale - Acoustic Version",
  },
  {
    id: "3nN7uDTvd4B2qZuX8CCLIy",
    artists: "Milky Chance",
    name: "Sadnecessary",
  },
  {
    id: "0UjhFrd7zuys6fqh439ufX",
    artists: "Milky Chance",
    name: "Cold Blue Rain",
  },
  {
    id: "1FguYCzxg0wOigoUo7S6ab",
    artists: "Milky Chance",
    name: "Heartless",
  },
  {
    id: "0IuTdfzNpHNBoLyMotxuFi",
    artists: "Milky Chance",
    name: "Lights Out_Demo",
  },
  { id: "4DOBL3qNNGfsycWg4jlW0a", artists: "Milky Chance", name: "Stay" },
  {
    id: "3ryeWcVpVuweKdOZILENPW",
    artists: "Milky Chance, Izzy Bizu",
    name: "Bad Things",
  },
  {
    id: "1uNTs42rqMDyyVjCjARTur",
    artists: "Milky Chance",
    name: "Losing You",
  },
  {
    id: "7oXEkw9sXGNFOQaL19mDym",
    artists: "Milky Chance",
    name: "Lately_Demo",
  },
  {
    id: "1azJHLB5XFG4dibJuSOF7L",
    artists: "Milky Chance",
    name: "Alive",
  },
  {
    id: "0DtY5J5GFyB7gI8xQAFdhS",
    artists: "Milky Chance",
    name: "Stunner",
  },
  {
    id: "38LCZS7orgXJah1kLTtVmG",
    artists: "Milky Chance",
    name: "Becoming",
  },
  {
    id: "7HFJ3tFuZcewzkQglQOtTZ",
    artists: "Milky Chance",
    name: "Firebird",
  },
  {
    id: "7lUBllqE6zVY6RPnSLB50u",
    artists: "Milky Chance",
    name: "Running",
  },
  {
    id: "4WIpEgkpmeVPTBAO4pm5zy",
    artists: "Milky Chance",
    name: "Clouds",
  },
  {
    id: "1aIyNvbozuD9FgIu2u5cJE",
    artists: "Milky Chance",
    name: "Indigo",
  },
  {
    id: "22H6YebocENyxfsb0BfQZU",
    artists: "Sofi Tukker",
    name: "Ringless",
  },
  {
    id: "4QVWoXs0dGVqZAZT6MPNVl",
    artists: "Sofi Tukker",
    name: "Purple Hat",
  },
  {
    id: "3Ox6PyCPPUOux6ObeXWyPn",
    artists: "Sofi Tukker",
    name: "Fantasy",
  },
  {
    id: "3gdpVF8GaDlxxWgzXtcFU5",
    artists: "Sofi Tukker",
    name: "Like This",
  },
  {
    id: "5KodOrv9iFso1iYp82eVhF",
    artists: "Icona Pop, Sofi Tukker",
    name: "Spa",
  },
  {
    id: "0cnFCOB8DxHmRLPjmgtptA",
    artists: "Alok, Sofi Tukker, INNA",
    name: "It Don’t Matter",
  },
  {
    id: "2bOEI6xZhYDIHcE5QgRSoD",
    artists: "Sofi Tukker, Holzbläser",
    name: "Caröl Von Holz",
  },
  {
    id: "0gAJSP0uKDQmCYIsXvhrCd",
    artists: "Sofi Tukker, Novak, YAX.X",
    name: "Emergency",
  },
  {
    id: "5QYKmxfPsl69GgeZKDAVSx",
    artists: "Sofi Tukker, Gorgon City",
    name: "House Arrest",
  },
  {
    id: "5r2XxAso8w45S9ircIjRKR",
    artists: "Sofi Tukker, Pabllo Vittar",
    name: "Energia - Parte 2",
  },
  {
    id: "18qVzPsxKJYqHaDfO15YBY",
    artists: "Benny Benassi, Sofi Tukker",
    name: "Everybody Needs A Kiss",
  },
  { id: "5l3x45nDN7PQNjKbzPnWHV", artists: "Sofi Tukker", name: "Greed" },
  {
    id: "3DEXQeVLM3BacRdrirHRXx",
    artists: "Sofi Tukker",
    name: "Feeling Good",
  },
  {
    id: "4x1ABk4Bd0PVO6QnLKv4Np",
    artists: "Sofi Tukker, ZHU",
    name: "Mi Rumba",
  },
  {
    id: "5iX7aAVoO3dzUOZ1eAvg6f",
    artists: "The Knocks, Sofi Tukker",
    name: "Brazilian Soul (feat. Sofi Tukker) - Acoustic Bossa Version",
  },
  {
    id: "1WL8mPxXzTfb4BPrPApONP",
    artists: "Sofi Tukker, Dux n Bass",
    name: "Purple Hat - Dux n Bass Remix",
  },
  { id: "6k1MpDIcgfQNgTi3vogQV0", artists: "Blond", name: "Ocean" },
  {
    id: "09ACQUS15YeLY0zgMrXAOV",
    artists: "Blond",
    name: "Madame Alone",
  },
  { id: "6GXfCiOqsgaotVvtxUiBcU", artists: "Blond", name: "Siren" },
  { id: "15TSfLNqN9PAHkHSPSmKJx", artists: "Blond", name: "Outro" },
  { id: "5bfo8wEgFKBEUzmznpAoJj", artists: "Blond", name: "Bluegrey" },
  { id: "3Zbp11bGFCG5U8UjjoaSIG", artists: "Blond", name: "Book" },
  { id: "6DHGTK2I9chZwEb7tUgBqO", artists: "Blond", name: "It-Girl" },
  { id: "3czIh2YwBVUwI3A49QZFSI", artists: "Blond", name: "Schmusi" },
  { id: "1vgKMQq1F0Dh7jImW3Uue0", artists: "Blond", name: "Spinaci" },
  {
    id: "7nMtGreW6ednLSPReBptTD",
    artists: "Blond",
    name: "Don't Bug Me",
  },
  {
    id: "6VLO7nfmbEUl8oednYTQ62",
    artists: "Blond",
    name: "Not Cool Enough",
  },
  { id: "0AfXWHLeaaw157PuekRQw5", artists: "Blond", name: "Intro" },
  { id: "7fNnsKLtyzkwQ291QnZWQC", artists: "Blond", name: "Autogen" },
  { id: "7BPKBjSgNDKfOFASMP5e1j", artists: "Blond", name: "Nah bei dir" },
  {
    id: "5jCHwn7U1lXj1RSwX9CSLs",
    artists: "Blond",
    name: "Es könnte grad nicht schöner sein",
  },
  {
    id: "0YrVdOsNuzKVwuKW0C5a1n",
    artists: "Blond",
    name: "Las Vegas Glamour",
  },
  { id: "77W5z1Ga9h4m9L1pW9rZxT", artists: "Blond", name: "Thorsten" },
  { id: "4GnMTpqR1LVDdE18XWZ2lR", artists: "Blond", name: "Match" },
  { id: "6pG2leYevs76opn1tek9oB", artists: "Blond", name: "Sie" },
  { id: "3NDACq2P3OokqBEYhTl5xw", artists: "Blond", name: "Kälberregen" },
  { id: "0Udnu8K7V4oOpZdHfyRLJk", artists: "Blond", name: "Hit" },
  {
    id: "0mjBbZRgmfhvokwwfl7OVP",
    artists: "Blond",
    name: "Sanifair Millionär",
  },
  { id: "4erCNyobZsqLhUwNiN4nkF", artists: "Blond", name: "Outro" },
  {
    id: "718KcGGi2rzXSv8WdRd3W6",
    artists:
      "Blond, Drangsal, Leoniden, Cashmiri, Zugezogen Maskulin, FIBEL, Shelter Boy, The toten Crackhuren im Kofferraum (The TCHIK), Von Wegen Lisbeth, Mia Morgan, KUMMER, Swutscher, CHILDREN, Fatoni, Steiner, Madlaina, Rikas, Lance Butters",
    name: "Sanifair Millionär CYPHER",
  },
  {
    id: "0gzrGHte6kjgbbKBg9ljmN",
    artists: "Blond",
    name: "Superspreader und die Kosmonauten",
  },
  { id: "10AnIv6fUvybolzbPAxmiA", artists: "Blond", name: "Du und Ich" },
  {
    id: "2tcVImYPYebNXf3lm6Uwka",
    artists:
      "The toten Crackhuren im Kofferraum (The TCHIK), Taby Pilgrim, Blond",
    name: "Bau mir nen Schrank",
  },
  { id: "4dwUjtKsw1DBolN0Z0T0VO", artists: "Blond", name: "mein boy" },
  {
    id: "0hZNgg87OsQ5HPwRubvTGU",
    artists: "Blond",
    name: "Ich bin ihr Boy",
  },
  {
    id: "4OEbwMo5k9pZhEwIDbM950",
    artists: "Kraftklub, Blond",
    name: "So schön (feat. Blond)",
  },
  {
    id: "6dQPQikamiuTl8WoUWJ7vi",
    artists: "Blond, addeN",
    name: "Männer",
  },
  {
    id: "09cgbbadzZSKFd1hGN23p5",
    artists: "Bicep, Clara La San",
    name: "Water",
  },
  { id: "2aJDlirz6v2a4HREki98cP", artists: "Bicep", name: "Glue" },
  { id: "0u29aq3WAdLlPtIyH7igv8", artists: "Bicep", name: "Waterfall" },
  { id: "6nGhGBz7uaE1RngnIFRKep", artists: "Bicep", name: "Meli (II)" },
  {
    id: "04Z4gQvoaggI4cQ6jDLbOe",
    artists: "Bicep, Clara La San",
    name: "Siena",
  },
  { id: "2sLPNpaKUwfnxZIr2MtQ8L", artists: "Bicep", name: "Meli (I)" },
  { id: "3bGC6jB6jWGa5hzSZzhHzs", artists: "Bicep", name: "Light" },
  { id: "73X9X7kDgsm4YeHpc8prf6", artists: "Bicep", name: "Apricots" },
  { id: "05FzWxV5hv2Idl8dNXj8w9", artists: "Bicep", name: "Sundial" },
  {
    id: "2h8OnhWZCRGNjptZ9IurZw",
    artists: "Bicep, Clara La San",
    name: "Saku",
  },
  { id: "664jBL8NgKFYdiMK9bnCcz", artists: "Bicep", name: "Atlas" },
  { id: "3NNEScXTDw9VyBsFDwVqTD", artists: "Bicep", name: "Cazenove" },
  { id: "0HZtVLVL6oLU9WobKQxqGu", artists: "Bicep", name: "Lido" },
  {
    id: "0pORLCI6Ep1eyqHJXbUPKG",
    artists: "Bicep, Clara La San",
    name: "X",
  },
  {
    id: "6clsKQRcqbewqlucoqQNXi",
    artists: "Bicep, Julia Kent",
    name: "Rever",
  },
  {
    id: "2FVKaO3yQBbqE9vNxcYxmR",
    artists: "Bicep, machìna",
    name: "Hawk",
  },
  {
    id: "3VtTuQ6lypMoOBcm6VMzdh",
    artists: "Bicep, Four Tet",
    name: "Opal - Four Tet Remix",
  },
  { id: "2WuzAwiZzest2eONspeXMA", artists: "Bicep", name: "Just" },
  {
    id: "5zrqK6mwlGKWixTDE3Wfi0",
    artists: "Brassica",
    name: "Tears I Can Afford - Bicep Remix",
  },
  { id: "1YRmwmoN3oBezY2ND8jhyH", artists: "Bicep", name: "Aura" },
  { id: "5b8yttQjXgh03MjFQDxO1c", artists: "Bicep", name: "Opal" },
  { id: "1uhGW4jUw12CdZCnXBKanD", artists: "Bicep", name: "Rain" },
  { id: "3gA3UvnTI1r7p37pCWQrLM", artists: "Bicep", name: "Orca" },
  { id: "0JaSJnsoU9DT1nA9J46LJQ", artists: "Bicep", name: "Celeste" },
  {
    id: "6DxKG8EHEqkWdKrFQSvm32",
    artists: "808 State, Bicep",
    name: "In Yer Face - Bicep Remix",
  },
  { id: "2TpPnvQPkXRaY1q7kVbeJ4", artists: "Bicep", name: "Vale" },
  { id: "25L371GlKBBBnIJhtlYRVI", artists: "Bicep", name: "Ayaya" },
  { id: "5xvHKh0QAbzYUUiazFGnAD", artists: "Bicep", name: "Drift" },
  { id: "7drMbzUHSJwsjdenHMDMrK", artists: "Bicep", name: "Vespa" },
  { id: "5oCMn6EWKsPOgOLnBYLGcU", artists: "Bicep", name: "Spring" },
  {
    id: "4FtjMbx5rC3fUqcBJXhu1G",
    artists: "Isaac Tichauer, Bicep",
    name: "Higher Level - Bicep Remix",
  },
  { id: "3AaQOH2QUB0oKm5sbHjpQo", artists: "Bicep", name: "Ayr" },
  { id: "3pXd2A4Qu4pTf3B70EJkAj", artists: "Bicep, Ejeca", name: "You" },
  {
    id: "4fxNiF06LCFO3FKd3wsHcY",
    artists: "Bicep",
    name: "Vision Of Love",
  },
  {
    id: "2I2R8mOUvH355Fs3QWZyYt",
    artists: "Bicep",
    name: "Poly Pineapple",
  },
  { id: "2iInQB9D17iZT1oFoixurT", artists: "Bicep", name: "Metro" },
  { id: "43hVkOebuR6X8YwwsYCt9y", artists: "Bicep", name: "DLR" },
  { id: "6JwjGna6Xl463INNMr4anO", artists: "Bicep", name: "Kites" },
  { id: "3i6qmDVRuV8dzENGl2MuAg", artists: "Bicep", name: "Helix" },
  {
    id: "0mzzs1GvOLj7r2v8Paieav",
    artists: "Bicep",
    name: "Aura - 12” Mix",
  },
  { id: "4kkI1fGaUfH0W9pKceKxgi", artists: "Bicep", name: "Malima" },
  {
    id: "4n5wWTTgnLtb8nVwPWVzgx",
    artists: "Bicep, Hammer",
    name: "Dahlia",
  },
  {
    id: "1xy8LCvNIee47jb0we0Z61",
    artists: "Blaze, Bicep",
    name: "Lovelee Dae - Bicep Remix",
  },
  {
    id: "7tqe3SKeJiNY6h4hh0FIXO",
    artists: "Simian Mobile Disco, Bicep",
    name: "Sacrifice - Original Mix",
  },
  { id: "2XzL86HI5ghHENNSA3Oimx", artists: "Bicep", name: "Back 2 U" },
  { id: "3ea5lFsq8LYNOFFdm9mqGQ", artists: "Bicep", name: "Seagulls" },
  { id: "1LVKWm2sixcBd1sqqrvNNU", artists: "Bicep", name: "Rays" },
  {
    id: "0rMU0SBui8uSs25EGOCBEz",
    artists: "Bicep, Hammer",
    name: "Go - Flanger Mix",
  },
  {
    id: "3PFZkhoTc3cX8QJ8dn4sUz",
    artists: "Bicep, Hammer",
    name: "Go - Bicep's Liquid Mix",
  },
  {
    id: "26lFqitDN8bGz9WiZK8mpl",
    artists: "Bicep",
    name: "Closing Sequence",
  },
  { id: "6XfesYPpODbxsXoFffTb43", artists: "Bicep", name: "Lyk Lyk" },
  {
    id: "4wPM9pPNr7tXO7CGCVwYoq",
    artists: "Bicep, Hammer",
    name: "Icebowl",
  },
  {
    id: "3eqrIehJCrcIPn010WWFt5",
    artists: "Bicep",
    name: "Back 2 U - Instrumental",
  },
  {
    id: "3hseyiyLXGPpkZrHf6l6jT",
    artists: "ÄTNA",
    name: "Touch My Fantasy",
  },
  { id: "2z0IvBi4B2HOV1PEhiiowj", artists: "ÄTNA", name: "Come To Me" },
  {
    id: "31W4E2ZPUbUun3OajgzzUh",
    artists: "ÄTNA",
    name: "Ruining My Brain",
  },
  {
    id: "31dVOOab6MB4rCoYQzKcLA",
    artists: "ÄTNA",
    name: "Made By Desire",
  },
  { id: "64tGc4FJt1AumDWwYjhVNA", artists: "ÄTNA", name: "Try" },
  {
    id: "6uuz39WAJoZZOtGI1K38p5",
    artists: "ÄTNA",
    name: "If You Were Gone",
  },
  {
    id: "0gX6dyl8THdA3AvF0CsC7a",
    artists: "ÄTNA",
    name: "Like That Game",
  },
  { id: "0LswWdkIQaIPdL6WjhPRKb", artists: "ÄTNA", name: "As Fast As I" },
  {
    id: "6IEPS3UmtASWPMqpHa2XKY",
    artists: "Marteria, ÄTNA, Yasha",
    name: "Love, Peace & Happiness",
  },
  {
    id: "0vvR7ogspsWehDhpZPNhZF",
    artists: "Solomun, ÄTNA",
    name: "Tuk Tuk (feat. ÄTNA)",
  },
  {
    id: "7j6L7bpPjjSLXhGYYStIJ0",
    artists: "ÄTNA, MEUTE",
    name: "Weirdo",
  },
  { id: "46Y7LEJBSBDIWPLvHTn4rq", artists: "ÄTNA", name: "Smile" },
  {
    id: "1RjEEBbM9Lf4G4sRYFMeXE",
    artists: "ÄTNA",
    name: "Trick By Trick",
  },
  { id: "41k9LvMt9xspB5nueIUsfU", artists: "ÄTNA", name: "Anymore" },
  { id: "44qdoLCf0Mcok8cTdOVoQj", artists: "ÄTNA", name: "Lonely" },
  { id: "3YorZ67MQdOdIV1g9DFyPV", artists: "ÄTNA", name: "Aye Aye" },
  { id: "0OUKgnOS2Xj64K8x4Unutp", artists: "ÄTNA", name: "I See Love" },
  { id: "4iCKVsaLcbWXiwQjPDvXsQ", artists: "ÄTNA", name: "Autobahn" },
  { id: "1ybGx6ZuI0MrsVGusKh95N", artists: "ÄTNA", name: "Goodbye" },
  {
    id: "63B2YBX69c9GaQ2Svk25Il",
    artists: "ÄTNA, Solomun",
    name: "Smile (Solomun Remix) - Radio Edit",
  },
  {
    id: "5MRZtv3Y05zBNbsnoaAi1f",
    artists: "ÄTNA, orbit",
    name: "Flow - orbit Remix",
  },
  {
    id: "4wa9uHVUpTyrxfeq9iATsZ",
    artists: "Kraftklub, BLVTH",
    name: "Ein Song reicht - BLVTH Version",
  },
  {
    id: "58up6yfV93UQeLdPbjFBWe",
    artists: "PaulWetz, BLVTH",
    name: "CALL MY NAME",
  },
  { id: "7y1ASEdmy2SuP2bZwKWp3z", artists: "BLVTH", name: "MOON" },
  {
    id: "7FojZdbGhhmg9x01VLwrJt",
    artists: "BLVTH, Aaron Taos",
    name: "SHIT TO SAY",
  },
  {
    id: "0Dl4bN17bbGm7QL5AHLPkv",
    artists: "Sumera",
    name: "Wolf - BLVTH Edit",
  },
  {
    id: "0lXJc2LV53mIZs9vux3v5z",
    artists: "BLVTH",
    name: "I HATE MYSELF",
  },
  { id: "6KXMEPifLBwjiUWhhCrwPf", artists: "BLVTH", name: "STRANGER" },
  { id: "4RDhXhWNvoY7Nn5amgyRLU", artists: "BLVTH", name: "ARIGATO" },
  { id: "0pjMNOPkvVFJWu7ujaAMRr", artists: "BLVTH", name: "BUTTERFLY" },
  { id: "6t1ghigyG7ebdHjtw4JCQd", artists: "BLVTH", name: "HAHA" },
  { id: "1EjzrxUSia3fOGt6lUzECM", artists: "BLVTH", name: "KAPUTT" },
  { id: "5qkkkKqWsni4nvpQ9k9NpR", artists: "BLVTH", name: "BAIL OUT" },
  { id: "43VtegQF0x1YFSAkI1PU95", artists: "BLVTH", name: "POW POW" },
  { id: "0uaQyyKj0qS76CvT4g3PWF", artists: "BLVTH", name: "CINNAMON" },
  {
    id: "5wCDMaOJY3VQtTW4IPuuLg",
    artists: "BLVTH",
    name: "TWI$$$TIN AND TURNIN",
  },
  {
    id: "1cIlcqL2wPxRZZPreUpKuL",
    artists: "BLVTH",
    name: "I LOVE MYSELF",
  },
  { id: "1wHFRhKS14IXGr7AfVbRTU", artists: "BLVTH", name: "BUTTERFLY" },
  {
    id: "2IiRRrgxmfVOKoU7w1DTsb",
    artists: "BLVTH, MAJAN",
    name: "No Friend",
  },
  {
    id: "6nrsGwF2VeTUwQcgirPRFL",
    artists: "NVDES, BLVTH",
    name: "Lightning Flow",
  },
  { id: "0sqLyvijbFWfigxXkBw1uW", artists: "BLVTH", name: "In The End" },
  {
    id: "42Zt5yUL5egUyFtkV1md7t",
    artists: "BLVTH, bülow",
    name: "I Don't Wanna Be",
  },
  {
    id: "2lBXZzKFxekLas2kVGmMBU",
    artists: "BLVTH, Kareem Kalokoh",
    name: "GORILLAS",
  },
  {
    id: "4tzQaT2OelgD8Nf12F2Nog",
    artists: "BLVTH, Woodie Smalls",
    name: "Seeking Closure",
  },
  { id: "4uyfRFzwGAMQGIFIjUs0ne", artists: "BLVTH", name: "Pusher" },
  { id: "1ryzMCxQcxv0bYtGLVIfBY", artists: "BLVTH", name: "Spaghetti" },
  {
    id: "2ZmLCvTyhKzXu7JbSaHs1M",
    artists: "BLVTH, Kareem Kalokoh",
    name: "GORILLAS",
  },
  { id: "4EBx7KShF1QJuwevyqwsRT", artists: "BLVTH", name: "The Void" },
  { id: "5ZnMin6YidlClHSy1ptUz9", artists: "BLVTH", name: "No Shame" },
  {
    id: "5bSd1eKddHFVKXihLjSlNZ",
    artists: "BLVTH",
    name: "I Don't Know If I'm Happy",
  },
  {
    id: "6qRtJPiMJYuRFM5MqHcxi0",
    artists: "BLVTH, Woodie Smalls",
    name: "Seeking Closure",
  },
  { id: "4sg5EJNAmIw4fHDVr52h8d", artists: "BLVTH", name: "Domino" },
  { id: "6fQtimf2BqdNhJh2vi6cMP", artists: "BLVTH", name: "Let Me Down" },
  { id: "7gJi71Yq9nvXzVsiKfX83S", artists: "BLVTH", name: "2211" },
  { id: "6av5Bd82u3URa8Bksa8wFe", artists: "BLVTH", name: "Cool Song" },
  {
    id: "4zPKNOMrGGdbyc77xBrjhO",
    artists: "BLVTH, Slug † Christ, Fences",
    name: "Blissless",
  },
  { id: "3GzrZ8ndvYNBmUaz1S2MNY", artists: "BLVTH", name: "ME$$ AROUND" },
  { id: "66BdKN3W3e63vBQU98Ckvp", artists: "BLVTH", name: "Disarray" },
  { id: "0hcOBWNSOFdkhfEGrfuV4B", artists: "BLVTH", name: "0-0" },
  { id: "4Kj84yHMms1pj74nxDrtdF", artists: "BLVTH", name: "Seven" },
  { id: "4etkdBRX0MglqFcCOMxsPe", artists: "BLVTH", name: "Rigid" },
  { id: "2iboXDlecSyBOxuJg4U1Ww", artists: "BLVTH", name: "Champagne" },
  { id: "5WcrjGxDwph6wiTUSGJBlP", artists: "BLVTH", name: "Disney" },
  { id: "44qOb5TPQut7nqVpx3RJxK", artists: "BLVTH", name: "Mars" },
  {
    id: "3tgaBVMmSRzg02VSEGHxBn",
    artists: "BLVTH, TAIIME",
    name: "Tokyo Run (Prod. TAIIME)",
  },
  {
    id: "0Uce2g5XmNxP3LOlbNeXPd",
    artists: "BLVTH, TAIIME",
    name: "Police (Prod. TAIIME)",
  },
  {
    id: "2YT0klYyOnkeafZKNzLWwD",
    artists: "BLVTH, TAIIME",
    name: "Really?! (Prod. TAIIME)",
  },
  {
    id: "3147GVqZCMJyx536NNszEl",
    artists: "BLVTH, TAIIME",
    name: "Temptation (Prod. TAIIME)",
  },
  {
    id: "3fe5jxPxMsjCMhmPKZYJ8M",
    artists: "BLVTH, TAIIME",
    name: "Follow Link for Download (Prod. TAIIME)",
  },
  {
    id: "2yaN2OT3VtZOg20cp5rzkY",
    artists: "BLVTH",
    name: "Snow on Blue",
  },
  {
    id: "4YQuarLyp8sSbIlVuJV0z8",
    artists: "BLVTH",
    name: "Cut to the Feeling",
  },
  {
    id: "76eyg2zIWJNyutLiRSr61N",
    artists: "BLVTH, Soiceytrap",
    name: "Pusher",
  },
  {
    id: "5AerFmSPk6HcRai4oCHutZ",
    artists: "BLVTH, SOVT",
    name: "I Don’t Love You",
  },
  { id: "1Up1m4YsnUegGK7m6NhARb", artists: "BLVTH", name: "Gargoyle" },
  {
    id: "1NRmyN8qg4VUHrZuX2iKdW",
    artists: "BLVTH",
    name: "Find U - [B-Side]",
  },
  { id: "1QUCMDpCjMuTEeHYB5MFjb", artists: "BLVTH", name: "7IGER" },
  {
    id: "4RjdAtdkoISFwm2OhPMVeg",
    artists: "BLVTH, Novaa",
    name: "Ocean",
  },
  { id: "4idYRhthZyXto7MAcCmsMf", artists: "BLVTH", name: "Water" },
  {
    id: "7MbLG7a7rL84pk64fRWRE0",
    artists: "BLVTH, Cliftun",
    name: "Lost in LA",
  },
  { id: "3ZdYSXezvMxzDA9CBCioHU", artists: "BLVTH", name: "G4NRYU" },
  { id: "2pxQTg8ecN1k3CXnEmpa8t", artists: "Leoniden", name: "Smile" },
  {
    id: "1EEhO9Gn9usXagV2JaMi8e",
    artists: "Leoniden",
    name: "Intro (Stuck On Repeat)",
  },
  { id: "0HMqKvy71TIbFMZP573ggQ", artists: "Leoniden", name: "Paranoid" },
  { id: "2Vr9neYPIWshdbTG059i3A", artists: "Leoniden", name: "L.O.V.E." },
  { id: "49G2az1eYCmZ6MoYhMFwGF", artists: "Leoniden", name: "Funeral" },
  { id: "5hMIBsn64hajBIKbFJAsf6", artists: "Leoniden", name: "New 68" },
  {
    id: "3OQKLKNqk22fnIKWUIUJP9",
    artists: "Leoniden",
    name: "Complex Happenings - Pt. 1",
  },
  { id: "4M2NZxERIz8QSyRf8zFVeo", artists: "Leoniden", name: "Home" },
  {
    id: "4b7fVPwn8NOJ98IBaVofAb",
    artists: "Leoniden",
    name: "Where Are You",
  },
  {
    id: "434rDjGcR2BsbVn8Jvd5Xt",
    artists: "Leoniden, Drangsal",
    name: "Boring Ideas",
  },
  {
    id: "6ZUVENpo7awohFP2M3Csby",
    artists: "Leoniden",
    name: "Complex Happenings - Pt. 2",
  },
  { id: "0ZAvn9unJORsZ3vLqQaqzL", artists: "Leoniden", name: "Dice" },
  {
    id: "3HxDkdX49jHKjNv2YpNjrH",
    artists: "Leoniden",
    name: "Blue Hour",
  },
  { id: "2wN6jOThxasdenkt1T2gsk", artists: "Leoniden", name: "Medicine" },
  {
    id: "7z38LeAfhS1bpqJcZpPOaA",
    artists: "Leoniden, Pabst",
    name: "Freaks (feat. Pabst)",
  },
  {
    id: "63U4Lu2uGAT0lGxK6h2530",
    artists: "Leoniden",
    name: "Complex Happenings - Pt. 3",
  },
  {
    id: "3OhKKedbo9k5pBtXrJzDaE",
    artists: "Leoniden, Ilgen-Nur",
    name: "Deny",
  },
  {
    id: "5OwEpCoLx789UlGvTRzBnp",
    artists: "Leoniden",
    name: "Complex Happenings - Pt. 4",
  },
  {
    id: "1cvSB5XVqp75z1mJ9tKzTT",
    artists: "Leoniden",
    name: "Broken Pieces",
  },
  {
    id: "4tTANM95dnRvDJm33G92ff",
    artists: "Leoniden",
    name: "Complex Happenings - Pt. 5",
  },
  { id: "61sSJHLos9i5TPwaqGNxCz", artists: "Phoenix", name: "Fences" },
  { id: "1jIvxe4pkZDvsyP9lfcwYX", artists: "Phoenix", name: "Rome" },
  { id: "2hPkQGNZ6yHmeQVHkxVfi6", artists: "Phoenix", name: "Don't" },
  {
    id: "08vv5NAEpKf5CYQEvPP8Oz",
    artists: "Phoenix",
    name: "S.O.S In Bel Air",
  },
  {
    id: "69b9bN4DGak436dHislaFu",
    artists: "Phoenix",
    name: "Napoleon Says",
  },
  { id: "6ayQqGsXx1jxDiEku4V9Gg", artists: "Phoenix", name: "On Fire" },
  {
    id: "6MviN7j5zpF14j6DXMWZOp",
    artists: "Phoenix",
    name: "I'm an Actor - Live One-Take Version",
  },
  {
    id: "7j3F83W8dkm10ujNwC0wRJ",
    artists: "The Simps, Eyedress, zzzahara",
    name: "Hold Me Down",
  },
  {
    id: "2FNDyU7qtE3U4UGZTO1NCo",
    artists: "Eyedress",
    name: "STILL IN LOVE",
  },
  {
    id: "6Z3E0E1hxX6o3pn36RhtyP",
    artists: "zzzahara",
    name: "they don't know",
  },
  {
    id: "5pJsvdpvCOH4VUjKVthzG6",
    artists: "Eyedress",
    name: "HOUSE OF CARDS",
  },
  {
    id: "0mebQInrEv7IIf57IoY0om",
    artists: "The Simps, Eyedress, zzzahara",
    name: "Rainbow After Rain",
  },
  {
    id: "0N5AyKOTiKUDMNKidsGK5w",
    artists: "The Simps, Eyedress, zzzahara",
    name: "Tesla",
  },
  {
    id: "2kjZSE6DNlNIBr05cD2Pxo",
    artists: "The Simps, Eyedress, zzzahara",
    name: "On Fye",
  },
  {
    id: "0kFFvTvmSgJeNkVKPFaplu",
    artists: "Eyedress, Dent May",
    name: "Something About You",
  },
  {
    id: "72YtJ5eUj6pbsAdX8byAIF",
    artists: "zzzahara",
    name: "I do ok alone",
  },
  { id: "5KbTBSGUvgDg75gIVhUaAW", artists: "Eyedress", name: "Jealous" },
  {
    id: "5a4GnLmXIjtuRQbA8DHucE",
    artists: "The Simps, Eyedress, zzzahara",
    name: "On Fye",
  },
  {
    id: "0ccQoYWy198kjztG8FEluD",
    artists: "zzzahara",
    name: "On a Grave Day",
  },
  {
    id: "074BRqdn0pTyghFohpmdHb",
    artists: "Eyedress",
    name: "Can I See You Tonight?",
  },
  {
    id: "7JvznMWFQ9iQqV3pfVlirE",
    artists: "Eyedress",
    name: "Brain Dead",
  },
  {
    id: "44pBlSEASFjEdU3qEHhbFs",
    artists: "Eyedress",
    name: "Romantic Lover",
  },
  { id: "34kEI1gsmX5d7VdoX8ILOx", artists: "zzzahara", name: "Xxxstasy" },
  {
    id: "64aLJ6xU2013ngl0DGZyKN",
    artists: "zzzahara",
    name: "Straight Crushes",
  },
  {
    id: "2Gbt1I2cyf2Njj0xCd2drK",
    artists: "Eyedress",
    name: "Manila Ice",
  },
  {
    id: "3aMMJv0FVfiDOorrsOE98z",
    artists: "zzzahara",
    name: "Sugar Gay",
  },
  {
    id: "0N5AyKOTiKUDMNKidsGK5w",
    artists: "The Simps, Eyedress, zzzahara",
    name: "Tesla",
  },
  { id: "63lBX0ZTj22TGOoP4xoX1R", artists: "Eyedress", name: "Trauma" },
  {
    id: "5qUf6I5DOBCNsFhRy2iORq",
    artists: "zzzahara",
    name: "Starry Eyed",
  },
  {
    id: "728dEJCwVKPiw4P7TvevER",
    artists: "Eyedress",
    name: "Last Time I’m Falling in Love",
  },
  {
    id: "6M1Yp3KrONx7FFN3dKd8Xh",
    artists: "Alison Wonderland",
    name: "Forever",
  },
  {
    id: "0VvdakcSvAfDqkMdHua1H0",
    artists: "Alison Wonderland",
    name: "Safe Life",
  },
  {
    id: "2h1uvDHYv9Cll7DWOPtYa4",
    artists: "Alison Wonderland",
    name: "Fuck U Love U",
  },
  {
    id: "1ExDfyXQeaimYRwm7xt6TL",
    artists: "Alison Wonderland",
    name: "New Day",
  },
  {
    id: "3FgbqE9DtzN5HAUXMW4ERX",
    artists: "Alison Wonderland",
    name: "I’m Doing Great Now Thanks (Interlude)",
  },
  {
    id: "0uJ9ERKbkX6IcTLTgbIZYC",
    artists: "Alison Wonderland",
    name: "Down The Line",
  },
  {
    id: "1Z0N9hxlzZRPAKI5Q33jsq",
    artists: "Alison Wonderland",
    name: "Something Real",
  },
  {
    id: "7f2bmtaXxqwoOeWHrWBSZ7",
    artists: "Alison Wonderland",
    name: "Eyes Closed",
  },
  {
    id: "4cn5L4fQyVWwYOObxfrVkW",
    artists: "Alison Wonderland",
    name: "Bad Things",
  },
  {
    id: "7wlSlhOwegHVFeIDzmRW80",
    artists: "Alison Wonderland",
    name: "Thirst",
  },
  {
    id: "6ViyIrVx3ee1YTPEcnwRwz",
    artists: "Alison Wonderland",
    name: "Cocaine",
  },
  {
    id: "5THNs2gICe4iPHi7lzTIpa",
    artists: "Alison Wonderland",
    name: "Fear Of Dying",
  },
  {
    id: "3KMbvTOIx2oc1Bhknl4G2Y",
    artists: "Alison Wonderland",
    name: "Loner",
  },
  {
    id: "5uDZdW4e9QwMSIWbzY7oD2",
    artists: "Alison Wonderland",
    name: "Run",
  },
  {
    id: "0VKZDoQ7vOW6VW61nIvmxq",
    artists: "Alison Wonderland, Wayne Coyne",
    name: "U Don’t Know",
  },
  {
    id: "1xKAX82ulfphGaeZRlwmJN",
    artists: "Alison Wonderland, SAFIA",
    name: "Take It To Reality",
  },
  {
    id: "3TxZp44el2BT1LdgrRMTDs",
    artists: "Alison Wonderland, SLUMBERJACK",
    name: "Naked (Alison Wonderland X Slumberjack)",
  },
  {
    id: "0RVuovI26wYm5CIAMotQEw",
    artists: "Alison Wonderland, Johnny Nelson, GANZ",
    name: "Carry On",
  },
  {
    id: "6wb61u8ayuanWSHZzle5od",
    artists: "Alison Wonderland",
    name: "I Want U",
  },
  {
    id: "4WqbHB4JbvdnMHRonuKthy",
    artists: "Alison Wonderland",
    name: "Games",
  },
  {
    id: "20Il1CLO9feUtD9e51ft08",
    artists: "Alison Wonderland",
    name: "One More Hit",
  },
  {
    id: "6ArbQdNmyp4t5aLXmRfO90",
    artists: "Alison Wonderland",
    name: "Ignore",
  },
  {
    id: "33yo7vrJgnnxfMDwqbmRjz",
    artists: "Alison Wonderland, AWE",
    name: "Back It Up (Alison Wonderland X AWE)",
  },
  {
    id: "7ryZn74jZ5D3FJyj9hC3Oi",
    artists: "Alison Wonderland",
    name: "Cold",
  },
  {
    id: "7nhAyS8iFU6njtpXH3slTE",
    artists: "Alison Wonderland, Brave, Lido",
    name: "Already Gone",
  },
  {
    id: "1imPiGCRV9jQKShxESv3Tt",
    artists: "Alison Wonderland",
    name: "Good Enough",
  },
  {
    id: "4HrI0DIPyvRF1cxUUAGQJc",
    artists: "Alison Wonderland",
    name: "No",
  },
  {
    id: "4fdo8V4TLA1aonfI4NxFjE",
    artists: "Alison Wonderland",
    name: "Okay",
  },
  {
    id: "27xk5s3fAAwfvptEshbM3J",
    artists: "Alison Wonderland",
    name: "Easy",
  },
  {
    id: "5qdPqyF6mc5rJBmQW5ppgA",
    artists: "Alison Wonderland, Trippie Redd",
    name: "High",
  },
  {
    id: "1UoTyVpNXRMIcO35M14lRB",
    artists: "Alison Wonderland, BLESSUS",
    name: "Here 4 U - Alison Wonderland x BLESSUS",
  },
  {
    id: "6Apozxrk03AIyQwyswUjbt",
    artists: "Alison Wonderland",
    name: "Church",
  },
  {
    id: "0CqGCpNdOktUrsTUEkWozV",
    artists: "Alison Wonderland, Buddy",
    name: "Cry",
  },
  {
    id: "0Kd7GHTM4093wuWwWCs3e7",
    artists: "Alison Wonderland",
    name: "Happy Place",
  },
  {
    id: "3pap35nZotIOQJBYZbtYeM",
    artists: "Alison Wonderland",
    name: "Good Girls Bad Boys",
  },
  {
    id: "7qEsrWCvoL31GYdzLkBQzm",
    artists: "Alison Wonderland, Chief Keef",
    name: "Dreamy Dragon",
  },
  {
    id: "1Cnb8dDwWgvodEpD97S97O",
    artists: "Alison Wonderland",
    name: "Hope - Interlude",
  },
  {
    id: "0USj9HRTlVVvi8pCspwSRE",
    artists: "Alison Wonderland, SLUMBERJACK",
    name: "Sometimes Love - Alison Wonderland x SLUMBERJACK",
  },
  {
    id: "67ooRicNWzjRLBw3ddW9iy",
    artists: "Alison Wonderland",
    name: "Awake",
  },
  { id: "7g6zG8DhkZoqhbTk5j0lbB", artists: "Moderat", name: "FAST LAND" },
  { id: "6WqO9gLZu212VEJcVFAYdo", artists: "Moderat", name: "EASY PREY" },
  { id: "31fp5cW4mJyBXLSHSVG78w", artists: "Moderat", name: "DRUM GLOW" },
  { id: "70RUV1xGPnjeV8YwjchW9f", artists: "Moderat", name: "SOFT EDIT" },
  { id: "6fpXIOk3rerDntO048I5ed", artists: "Moderat", name: "UNDO REDO" },
  { id: "5qhytiPIn0IXQKs9XE98YN", artists: "Moderat", name: "NEON RATS" },
  { id: "64rYiYzQNM4uRx6m03Uv9J", artists: "Moderat", name: "MORE LOVE" },
  { id: "6CL3GXy6asPvLbwMYC5zYH", artists: "Moderat", name: "NUMB BELL" },
  { id: "5imLtAtvD8FnYFqDh60QxQ", artists: "Moderat", name: "DOOM HYPE" },
  { id: "1dKwVBkd4MFnhDaOTcdr8R", artists: "Moderat", name: "COPY COPY" },
  {
    id: "6hgHUioGkZn9ReU4TTGnRp",
    artists: "Moderat",
    name: "Eating Hooks",
  },
  { id: "23SQS9r0w4FNJrWE5Xj7tM", artists: "Moderat", name: "Running" },
  { id: "50fTdbLvBvsG2MxfCto3xL", artists: "Moderat", name: "Finder" },
  {
    id: "6mPQ6702iHdsPocYuYtJIN",
    artists: "Moderat",
    name: "Ghostmother",
  },
  { id: "2DP2UCTKZpI2YTgUTm2ESs", artists: "Moderat", name: "Reminder" },
  { id: "3qadzDCaO7fPtSIG86a5L5", artists: "Moderat", name: "The Fool" },
  { id: "1N2KByLW7Qx3ZI7VjIISWp", artists: "Moderat", name: "Intruder" },
  {
    id: "5YHSXiZkThFJpMlApKU0xC",
    artists: "Moderat",
    name: "Animal Trails",
  },
  { id: "3yrgrbcQkpoyEWJFx6kg8V", artists: "Moderat", name: "Ethereal" },
  {
    id: "4uMQysOxLpRThndu0jky8M",
    artists: "Moderat",
    name: "Fondle - Bonus Track",
  },
  {
    id: "1K7LHs1QzZ1SchTt2o4Ayv",
    artists: "Moderat, Special Request",
    name: "Reminder - Special Request Remix [Bonus Track]",
  },
  {
    id: "46qjd4dKYlLQyQ50kJ6Frk",
    artists: "Moderat, Answer Code Request",
    name: "Reminder - Answer Code Request [Bonus Track]",
  },
  {
    id: "6kNYZ2Hf2QCpQhIuPxffkp",
    artists: "Black Country, New Road",
    name: "Chaos Space Marine",
  },
  { id: "6CjwjsGzDVn2hwREI6BKoY", artists: "Dilla", name: "Avenue" },
  {
    id: "0vAedWjA8jpGSkgLEm185p",
    artists: "Golf",
    name: "Zeit zu Zweit",
  },
  {
    id: "2QjOHCTQ1Jl3zawyYOpxh6",
    artists: "The Neighbourhood",
    name: "Sweater Weather",
  },
  { id: "2SBoDgAZCdAflh0CkB3YFU", artists: "Dilla", name: "Mit dir" },
  {
    id: "3660k2kZKOFOFS8Cv6DkJy",
    artists: "KC Lights, Leo Stannard",
    name: "Daydreamer",
  },
  {
    id: "10tZNLmzH71tA1uMhrLHMD",
    artists: "Mule & Man, Kid Simius, Bonaparte",
    name: "10k Types of Torture",
  },
  { id: "5zu0uft9JKy31FHxOqHKdR", artists: "Maeckes", name: "1234" },
  {
    id: "00VxlBCTky2MEXU0o5f0R3",
    artists: "OK KID",
    name: "Kaffee warm",
  },
  {
    id: "4aV5hIe9rB6Zb6XXrAqxFP",
    artists: "Milky Chance",
    name: "Addicted_Demo",
  },
  {
    id: "4v3b4QcDTKqF8sbRdtmWsI",
    artists: "Milky Chance",
    name: "Scarlet Paintings - Acoustic Version",
  },
  {
    id: "6IkvHQg7Z4uPq8oxuEit3m",
    artists: "Milky Chance",
    name: "Sweet Sun",
  },
  {
    id: "2BRiUhKwHdKYbHvsmlfqoP",
    artists: "Milky Chance",
    name: "Fairytale",
  },
  {
    id: "0cchE5QJa9teCVqe4N9VuZ",
    artists: "Milky Chance, Jack Johnson, Poolside",
    name: "Don't Let Me Down - Poolside Remix",
  },
  {
    id: "1mnTM4iKIvI0dj91lQa3wQ",
    artists: "Milky Chance",
    name: "Loveland - Studio Version",
  },
  {
    id: "0U3tWyrxzGtuivbfw46TlZ",
    artists: "Milky Chance",
    name: "Eden's House - Acoustic Version",
  },
  {
    id: "1gQitNg0GqMh8NrHk4T2iD",
    artists: "Milky Chance",
    name: "Sadnecessary - Acoustic Version",
  },
  {
    id: "314J5QSFfddZFfUpFGjfeQ",
    artists: "Milky Chance",
    name: "Cold Blue Rain - Acoustic Version",
  },
  {
    id: "0kGnpWmlN4zlxReMPrXDwE",
    artists: "Milky Chance",
    name: "Alive - Acoustic Version",
  },
  {
    id: "38PiBTHVatKwgu51L0ozhr",
    artists: "Milky Chance",
    name: "Cocoon - Acoustic Version",
  },
  {
    id: "0NYUCPsdzxgsOvAxba9ysl",
    artists: "Milky Chance",
    name: "Peripeteia - Acoustic Version",
  },
  {
    id: "5ypjKxU6huk4axJ6ltz7Hq",
    artists: "Milky Chance",
    name: "Feathery - Bonus track",
  },
  {
    id: "3VE3FyZ65ILbGfBIUPx2uB",
    artists: "Milky Chance",
    name: "Loveland - Bonus track",
  },
  {
    id: "6fyKPP5hJRrBkc3dpOnabO",
    artists: "Milky Chance",
    name: "Stunner - Acoustic Version",
  },
  {
    id: "0uzXkr7VvpPMG5MzRgXQM0",
    artists: "Milky Chance",
    name: "Feathery - Acoustic Version",
  },
  {
    id: "6chIuYEKToP0M1vg0fXN95",
    artists: "Metronomy, Katy J Pearson",
    name: "Love Factory",
  },
  {
    id: "4ia6ACdtbVvoBgfixtaXFP",
    artists: "Metronomy",
    name: "It's good to be back",
  },
  {
    id: "1fiXkZcXb2k5NzqnRtxeGM",
    artists: "Metronomy, Biig Piig",
    name: "405 - Metronomy x Biig Piig",
  },
  {
    id: "6zfczP87XO2SxWlQtnjFNa",
    artists: "Metronomy",
    name: "The Look",
  },
  {
    id: "13QZb2ua0JY2VJU9wG4PmQ",
    artists: "Metronomy",
    name: "Salted Caramel Ice Cream",
  },
  {
    id: "5fDVGTBnAnB8K0Kcn3Lmf6",
    artists: "Metronomy",
    name: "Things will be fine",
  },
  {
    id: "2zZW0SmKlZEoiDJwssNZqA",
    artists: "Metronomy",
    name: "Reservoir",
  },
  {
    id: "1fUQKI5LT9hyFktJLO5U09",
    artists: "Metronomy, spill tab",
    name: "Uneasy - Metronomy x spill tab",
  },
  { id: "2akjLHnHjDGsgqxuf48VYs", artists: "Metronomy", name: "The Bay" },
  {
    id: "6JJ3UK1YfxO26iEiMWUHHj",
    artists: "Metronomy",
    name: "Right on time",
  },
  {
    id: "2Ws7l5qxaTsrc5qHLgUQBo",
    artists: "Metronomy, Pinty",
    name: "Half an Inch - Metronomy x Pinty",
  },
  { id: "4h33lJL2YU05kEMaSkao47", artists: "Metronomy", name: "Lately" },
  {
    id: "6bW7mUdEV4jWxmdxcj8X3k",
    artists: "Metronomy",
    name: "Love Letters",
  },
  {
    id: "4AtIhiUFAKl50d9Ul78RLR",
    artists: "Metronomy",
    name: "Love Factory",
  },
  {
    id: "0EW8KGP0wdUYKi7Y4tIqWq",
    artists: "Metronomy, NZCA LINES",
    name: "We Broke Free - NZCA LINES La Riviera Inglesa Remix",
  },
  {
    id: "69BXRWOiOV2amvipIT9g29",
    artists: "Metronomy",
    name: "Radio Ladio",
  },
  {
    id: "3uge0EpDZWUEQwJk4jW5rI",
    artists: "Metronomy, Brian Nasty, Folly Group",
    name: "Monday - Metronomy x Brian Nasty x Folly Group",
  },
  {
    id: "6YIo6PDX5BgXaQ3jb6XffJ",
    artists: "Metronomy",
    name: "Friends - Outtake",
  },
  {
    id: "7fH8L6c4bcZYaj5gMUpd3j",
    artists: "Metronomy, MGMT",
    name: "The Look - MGMT Remix",
  },
  {
    id: "73yYzvKQM3cXUKyWO5Ynwr",
    artists: "Metronomy",
    name: "Loneliness on the run",
  },
  {
    id: "1ai59icXJ1K1QeVJxzi03h",
    artists: "Metronomy",
    name: "The Bay - Instrumental",
  },
  { id: "6guXQ9rHmOofkqp8uHYO8r", artists: "Metronomy", name: "Corinne" },
  {
    id: "4z1OI4m9nnSQ9n3WA07wWl",
    artists: "Metronomy, Olugbenga",
    name: "Trouble - Olugbenga Remix",
  },
  {
    id: "6rYKDvUwlLXDkb3hUIYGpv",
    artists: "Metronomy",
    name: "The Look - Instrumental",
  },
  {
    id: "7swF6Vw5bC3yvZ6mYn8JWD",
    artists: "Metronomy, Oscar Cash",
    name: "She Wants - Oscar Cash Remix",
  },
  {
    id: "67wcAJeaNwGm0fcB4HzzYm",
    artists: "Metronomy",
    name: "Everything Goes My Way",
  },
  {
    id: "64R2n9O7Aif7YP3ivkOWYS",
    artists: "Metronomy",
    name: "The Light",
  },
  {
    id: "6Py6JdF2Xd5ui4eMGXuI8f",
    artists: "Metronomy",
    name: "Corinne - Instrumental",
  },
  {
    id: "7CIhsMiYuZ8N3VT1asvNqW",
    artists: "Metronomy",
    name: "Sex Emoji",
  },
  {
    id: "68MV6N8V2oGuJ46uzD8Ydm",
    artists: "Metronomy",
    name: "Picking Up for You - Outtake",
  },
  {
    id: "3MqNmLeDEdrHeNUAtujA0g",
    artists: "Metronomy",
    name: "Whitsand Bay",
  },
  {
    id: "6SN2BDBPcvKg5VdBltYJba",
    artists: "Metronomy",
    name: "Insecurity",
  },
  {
    id: "3yEN31fZv3uWUMluwCbYcf",
    artists: "Metronomy",
    name: "Heartbreaker",
  },
  {
    id: "4XXeZ75Fb1olj58drECutq",
    artists: "Metronomy",
    name: "Walking In The Dark",
  },
  {
    id: "5vvgAiyEHZ2DeHH9slFiAt",
    artists: "Metronomy",
    name: "A Thing For Me",
  },
  {
    id: "6eKt37hsddMUisZhtklhu3",
    artists: "Metronomy, Porridge Radio",
    name: "Hold me tonight (feat. Porridge Radio)",
  },
  {
    id: "0yzwILUW3AraQe4YBA4VFw",
    artists: "Metronomy",
    name: "Love Song For Dog",
  },
  {
    id: "6qOBFuoFiay0tRAs5en6nB",
    artists: "Metronomy",
    name: "Night Owl",
  },
  {
    id: "5ilPFUzcvwj2wWYeqPN2XW",
    artists: "Metronomy",
    name: "Aquarius - Outtake",
  },
  {
    id: "3xEJ59GyjCjcJ69RQc2ej6",
    artists: "Metronomy",
    name: "I'm Aquarius",
  },
  {
    id: "0hdE9hvqa9RMehDnTPBo3S",
    artists: "Metronomy, Mix Master Mike",
    name: "Old Skool",
  },
  {
    id: "5NbjdufdooePwXEZvmXZRz",
    artists: "Metronomy",
    name: "The Upsetter",
  },
  { id: "0tdmZr8NLTCney1fW5scXO", artists: "Metronomy", name: "Holiday" },
  {
    id: "3l8vqlpmTEAIwP8WCezmqN",
    artists: "Metronomy",
    name: "Boy Racers",
  },
  {
    id: "2gZ004qCMK82mKtOyJsdCC",
    artists: "Metronomy, Robyn",
    name: "Hang Me Out To Dry (With Robyn)",
  },
  {
    id: "1UKOgSwVAFcnDEsYYOlyV1",
    artists: "Metronomy",
    name: "You Could Easily Have Me",
  },
  {
    id: "3fWun95RJhrcBrUfTaf5gJ",
    artists: "Metronomy",
    name: "On Dancefloors",
  },
  {
    id: "05JoM14sa6tnksLBDB472L",
    artists: "Metronomy",
    name: "Summer Jam",
  },
  {
    id: "25P7sBSswuS5d3QcnpBTiH",
    artists: "JEREMIAS",
    name: "FIN (prod. by Roosevelt)",
  },
  { id: "5Lssg4sAhKIEpsLQRhl1Fs", artists: "JEREMIAS", name: "paris" },
  {
    id: "045Qp5DqFXTqUuMMBR81iS",
    artists: "JEREMIAS",
    name: "Blaue Augen",
  },
  {
    id: "6H9Ubeuvqe1unaFhBAfkz5",
    artists: "JEREMIAS",
    name: "schon okay",
  },
  { id: "0E3d9sHyPV6wACYP1U4UlF", artists: "JEREMIAS", name: "hdl" },
  { id: "5v41kP2xGYclmWX6bMhKzj", artists: "JEREMIAS", name: "ich mags" },
  {
    id: "4lptrKbbydmqa74YS0a1rt",
    artists: "JEREMIAS",
    name: "Grüne Augen lügen nicht",
  },
  {
    id: "7EDBiMVQ421vGrYME4z0D4",
    artists: "JEREMIAS",
    name: "einfach v2",
  },
  {
    id: "1gQ48MeeacumwEAEwhYG74",
    artists: "JEREMIAS",
    name: "sorry - live",
  },
  {
    id: "699iWHyifDYCZArKR16fgB",
    artists: "JEREMIAS",
    name: "golden hour",
  },
  {
    id: "5Ps3GWKdJuoecpBkA0167N",
    artists: "JEREMIAS",
    name: "nie ankommen",
  },
  { id: "5wWlpqlr6ymmrKDAsopN3D", artists: "JEREMIAS", name: "mio" },
  { id: "0eGbpPRObQnMhTpPAImyml", artists: "JEREMIAS", name: "sorry" },
  { id: "1byTAZgpNLFDtdLNFMqp9u", artists: "JEREMIAS", name: "einfach" },
  { id: "1JMV4WbC3m6ZnsgM9vve1J", artists: "JEREMIAS", name: "weniger" },
  { id: "4QWj8up5FDq9xDvpoteuYA", artists: "JEREMIAS", name: "2" },
  { id: "08PPDW6oq355ieQ38djUny", artists: "JEREMIAS", name: "xx" },
  {
    id: "0NwjdmYzsjX4FsDB8T0LiR",
    artists: "JEREMIAS",
    name: "keine liebe",
  },
  { id: "1d9cvySdTvb9adMmpVesxz", artists: "JEREMIAS", name: "mit mir" },
  {
    id: "4yLT9jWwxlbTyOUd3Ku75E",
    artists: "JEREMIAS",
    name: "lass dich",
  },
  {
    id: "1EqxmqGcDIlmDGEzf0qiw2",
    artists: "JEREMIAS",
    name: "est. 2018",
  },
  {
    id: "3FMyh04gzgDWp8RuwuWdOt",
    artists: "JEREMIAS",
    name: "bésame mucho",
  },
  {
    id: "01EarvP5TaP2tiNlbqOIoS",
    artists: "JEREMIAS",
    name: "Wenn Blätter fallen",
  },
  { id: "24PyiQng93CZLi9I5541z9", artists: "JEREMIAS", name: "Sommer" },
  {
    id: "3HxPzPZJSTjPU2VYugEeCV",
    artists: "JEREMIAS",
    name: "Du musst an den Frühling glauben",
  },
  { id: "2XIwSHToFOVUHAhpWZH04M", artists: "JEREMIAS", name: "Diffus" },
  { id: "1zzMUsel2gHWansOAGKOJp", artists: "JEREMIAS", name: "Alles" },
  {
    id: "2Yo6UsXEc15jOL2uUWlBqO",
    artists: "JEREMIAS",
    name: "weniger - live",
  },
  {
    id: "7fYrNMgODWzlFAa18kYWtY",
    artists: "LP Giobbi, Monogem",
    name: "Body Breathe",
  },
  {
    id: "5X3pRJnPw56cEVedjBj81m",
    artists: "Carlita, LP Giobbi",
    name: "The Way You Say - LP Giobbi Remix",
  },
  {
    id: "5ozhK7GvUKSNSr1LrclYM2",
    artists: "LP Giobbi, Caroline Byrne, Diplo",
    name: "Forever And A Day - Diplo Remix",
  },
  {
    id: "3SG8Ozw6YOgR8WJtr8lzFM",
    artists: "LP Giobbi, DJ Tennis, Joseph Ashworth, Logic1000",
    name: "All In A Dream - Logic1000 Remix",
  },
  {
    id: "5o1mS67lEoLCeFobGIaNb2",
    artists: "LP Giobbi, Caroline Byrne",
    name: "Forever And A Day",
  },
  {
    id: "2d9QifQVnptlGl2xCkrGXH",
    artists: "LP Giobbi, Caroline Byrne",
    name: "Forever And A Day - Extended Mix",
  },
  {
    id: "3jfJzoHj1FDUZIOlVkDaJH",
    artists: "Diplo, TSHA, Kareen Lomax, LP Giobbi",
    name: "Let You Go - LP Giobbi Remix",
  },
  {
    id: "061RkW1qOnKY04hRiMGbi2",
    artists: "Kx5, deadmau5, Kaskade, LP Giobbi, Hayla",
    name: "Escape - LP Giobbi Remix",
  },
  {
    id: "1qv57tJ4VWlwBHJtkIEhVp",
    artists: "Purple Disco Machine",
    name: "In My Arms",
  },
  {
    id: "5ZIBlwNh4VDWZQlIOxpleI",
    artists: "Purple Disco Machine, Sophie and the Giants, Loods",
    name: "Hypnotized - Loods Remix",
  },
  {
    id: "4AwOOnvliHcPbjFMYDYupK",
    artists: "Elton John, Taron Egerton, Purple Disco Machine",
    name: '(I\'m Gonna) Love Me Again - From "Rocketman" / Purple Disco Machine Remix',
  },
  {
    id: "75pgu40nx9uQcEJjwZ6Cvp",
    artists: "Dua Lipa, Purple Disco Machine",
    name: "Don't Start Now - Purple Disco Machine Remix",
  },
  {
    id: "2Wy7mZKOwNuxEzBahrocvP",
    artists: "Monolink, Purple Disco Machine",
    name: "Take Me Home - Purple Disco Machine Remix",
  },
  {
    id: "1lrxKnhETdtGBk5BecESRD",
    artists: "Mark Ronson, Yebba, Purple Disco Machine",
    name: "Don't Leave Me Lonely (feat. Yebba) - Purple Disco Machine Remix",
  },
  {
    id: "5Eo2aKJbdkUIZPyuZIqB3c",
    artists: "Roberto Surace, Purple Disco Machine",
    name: "Joys - Purple Disco Machine Remix",
  },
  {
    id: "4N79k6RD0LVpOVI5FZWk4p",
    artists: "Purple Disco Machine",
    name: "Emotion",
  },
  {
    id: "5fWpiAAxEWZGU1XtNCMDpG",
    artists: "Purple Disco Machine, Lorenz Rhode",
    name: "Up & Down",
  },
  {
    id: "0ygYbs41jpPpQUh8PAgTiC",
    artists: "Foals, Purple Disco Machine",
    name: "In Degrees - Purple Disco Machine Remix",
  },
  {
    id: "31pk62WZx3KXFxEpMrdaNM",
    artists: "Purple Disco Machine",
    name: "Body Funk - Extended Mix",
  },
  {
    id: "6LCrqs85q61pfZCXYvW63B",
    artists: "Fatboy Slim, Purple Disco Machine",
    name: "Praise You (Purple Disco Machine Remix) - Radio Edit",
  },
  {
    id: "5BXjoLBmRSivBNCK2jmx8r",
    artists: "Calvin Harris, Rag'n'Bone Man, Purple Disco Machine",
    name: "Giant (with Rag'n'Bone Man) - Purple Disco Machine Remix",
  },
  {
    id: "09k2AILtAhprlB7VZmw5n3",
    artists: "Purple Disco Machine",
    name: "Dished (Male Stripper)",
  },
  {
    id: "0EWL8tQEY36NjLWMbztlTt",
    artists: "Jax Jones, Years & Years, Purple Disco Machine",
    name: "Play - Purple Disco Machine Remix",
  },
  {
    id: "3RiRFyvasDtAv8n0AQUKFG",
    artists: "WEISS, Purple Disco Machine",
    name: "Feel My Needs - Purple Disco Machine Remix",
  },
  {
    id: "0wenUIAGpfXH4Fu9xLcWHe",
    artists: "Purple Disco Machine, Joe Killington, Duane Harden",
    name: "Devil in Me (feat. Joe Killington & Duane Harden)",
  },
  {
    id: "4tTpmg8AGcChIUnuio4CtR",
    artists: "Shakedown, Purple Disco Machine",
    name: "At Night - Purple Disco Machine Remix",
  },
  {
    id: "6MLvUL2dYphJTwgiBvuJ1J",
    artists: "RÜFÜS DU SOL, Purple Disco Machine",
    name: "Treat You Better - Purple Disco Machine Remix",
  },
  {
    id: "4QUPwuTbZXYRX5jHau0QeM",
    artists: "Purple Disco Machine, Boris Dlugosch, Karen Harding",
    name: "Love for Days (feat. Karen Harding)",
  },
  {
    id: "2UZDxipn040WC3vk0YpRH6",
    artists: "Jamiroquai, Purple Disco Machine",
    name: "Cloud 9 - Purple Disco Machine Remix",
  },
  {
    id: "2LczIiNTOfbD4yxohajgjB",
    artists: "Gorillaz, DRAM, Purple Disco Machine",
    name: "Andromeda (feat. DRAM) - Purple Disco Machine Remix",
  },
  {
    id: "2ZoBlbo3x9s0LBMp9Aw5gp",
    artists: "Purple Disco Machine",
    name: "My House",
  },
  {
    id: "0m902KgphfY1cKdWmxNGPX",
    artists: "Two Door Cinema Club, Purple Disco Machine",
    name: "Bad Decisions - Purple Disco Machine Remix",
  },
  {
    id: "7C0n8aOl56Vnc9VFkRjqnA",
    artists: "Hercules & Love Affair, Purple Disco Machine",
    name: "Do You Feel The Same? - Purple Disco Machine Remix",
  },
  {
    id: "6rUFa7VeCtIb4GkA4VqRTl",
    artists: "Purple Disco Machine",
    name: "Street Life - Original Mix",
  },
  {
    id: "4jFt8ztVSyGt2NFGQdd5pQ",
    artists: "Purple Disco Machine, Boris Dlugosch",
    name: "L.O.V.E.",
  },
  {
    id: "7KbZRM0vLJykKgmQHAINR9",
    artists: "Purple Disco Machine, Hannah Williams",
    name: "Mistress (feat. Hannah Williams)",
  },
  {
    id: "3bm57xVJTT5Sqp1zhuvyTi",
    artists: "Purple Disco Machine",
    name: "Drumatic - Original Mix",
  },
  {
    id: "4SWTE38RT4U9nAsMWztDOX",
    artists: "Julien Jabre, Purple Disco Machine",
    name: "Swimming Places - Purple Disco Machine Re-Work",
  },
  {
    id: "2rHj3uf6L70JX4sdQZqmj1",
    artists: "Aeroplane, Purple Disco Machine",
    name: "Sambal",
  },
  {
    id: "6QJkHcgUdMMlyixNIbDg37",
    artists: "The Shapeshifters, River",
    name: "It's You (feat. River) - Purple Disco Machine Remix Edit",
  },
  {
    id: "7nb3HGhzA4j3JOVNU9hfBC",
    artists: "Purple Disco Machine, Faithless",
    name: "Let the Music Play",
  },
  {
    id: "7nKUFFPmnHGpfDMeykAe7v",
    artists: "Purple Disco Machine, Alex Mills",
    name: "Where We Belong - Original",
  },
  {
    id: "22MpHZBjPbQtNTV26awyIi",
    artists: "New Order, Purple Disco Machine",
    name: "People on the High Line - Purple Disco Machine Remix",
  },
  {
    id: "1GxoAiDQZV4eN6xfZqnyQw",
    artists: "Purple Disco Machine, Kool Keith",
    name: "Memphis Jam (feat. Kool Keith)",
  },
  {
    id: "29Rm3w1bSHyfP3JgE6ZRJK",
    artists: "Purple Disco Machine",
    name: "Soulmatic",
  },
  {
    id: "26d3pFK05qFaFHqTiMZEkm",
    artists: "Aeroplane, Purple Disco Machine, Aloe Blacc",
    name: "Counting On Me (feat. Aloe Blacc) - Radio Edit",
  },
  {
    id: "7IW5gQAYa9Y2lfqqk4A7Hr",
    artists: "Purple Disco Machine, Baxter, Yuksek",
    name: "Encore (feat. Baxter) - Yuksek Remix",
  },
  {
    id: "6xK5FmBSUNRyxkDwAZOqLi",
    artists: "Purple Disco Machine, Boris Dlugosch, Karen Harding, Motez",
    name: "Love for Days (feat. Karen Harding) - Motez Remix",
  },
  {
    id: "35IZMcAUjmh2VzGd4wZczC",
    artists: "Purple Disco Machine",
    name: "Song for O - Original Mix",
  },
  {
    id: "1WDtuoricpzxXBifSuWx0y",
    artists: "Purple Disco Machine, Crush Club",
    name: "Take It Easy (feat. Crush Club)",
  },
  {
    id: "46kfmckaKRp7TBka29VStv",
    artists: "Purple Disco Machine",
    name: "Play",
  },
  {
    id: "35YoC46OKyiYEZl9F1GV54",
    artists: "Boris Dlugosch, Purple Disco Maschine",
    name: "Keep Pushin' - Purple Disco Maschine Vox Mix",
  },
  {
    id: "7kbTgC6h96UOBLhVZng6gO",
    artists: "Purple Disco Machine",
    name: "Move Or Not - Original Mix",
  },
  {
    id: "4G0SIs2Wup5E73QjBo9cU5",
    artists: "Purple Disco Machine",
    name: "Walls - Original Mix",
  },
  {
    id: "77KDGD19ibBEWmPi87vzBV",
    artists: "Purple Disco Machine",
    name: "Musique",
  },
  {
    id: "7mJ8wKA9aexlL8ZLxqwPEO",
    artists: "Anabel Englund, Purple Disco Machine",
    name: "London Headache - Purple Disco Machine Remix",
  },
  {
    id: "4TVq5Q6TesqlwUZwuhpYFL",
    artists: "Purple Disco Machine, Baxter",
    name: "Encore (feat. Baxter)",
  },
  {
    id: "2exsc3rWNYYrYU0JCTXNKX",
    artists: "The Knocks, Foster The People, Purple Disco Machine",
    name: "Ride or Die (feat. Foster the People) - Purple Disco Machine Remix",
  },
  {
    id: "3PsNbaR7XZJSmPMXGEV52j",
    artists: "Purple Disco Machine",
    name: "Playbox",
  },
  {
    id: "6MXNqOPoNxwD54PsNcqRce",
    artists: "Purple Disco Machine, CeeLo Green",
    name: "Pray For Me (feat. CeeLo Green)",
  },
  {
    id: "7cAhWVCg7J5r33ySUHHyaB",
    artists: "Purple Disco Machine, Natalie Conway",
    name: "Soul So Sweet - Original Mix",
  },
  {
    id: "6vqdNL9wEue7DD9pLmeFno",
    artists: "Purple Disco Machine, Lorenz Rhode",
    name: "Music In You (feat. Lorenz Rhode)",
  },
  {
    id: "5F4fJNt61R9vSKy4e4aZFo",
    artists: "Purple Disco Machine",
    name: "Yo - Original Mix",
  },
  {
    id: "7e0X6kjAc9ZCqxkmnqaSNV",
    artists: "Purple Disco Machine",
    name: "Magic",
  },
  {
    id: "261lG8mG0KnqzlxGVw2RMX",
    artists: "Robosonic, Purple Disco Machine",
    name: "Viel Fein - Original Mix",
  },
  {
    id: "1pMWJoIpGDFRYLbxbENzDu",
    artists: "Chromeo",
    name: "Juice - Purple Disco Machine Remix",
  },
  {
    id: "4TZhYrtj4ZF5klptFg8MXN",
    artists: "Purple Disco Machine",
    name: "No Lips - Original Mix",
  },
  {
    id: "0BHQ1dK1NgV4bChxaq4xFx",
    artists: "Purple Disco Machine, Oli Rose",
    name: "Let The Rain Pour",
  },
  {
    id: "6VFe2irDStctucZoo6oftk",
    artists: "Sirens Of Lesbos, Purple Disco Machine",
    name: "Ecstasy (Purple Disco Machine Remix)",
  },
  {
    id: "5GzQJyBlWxG7OYvVDlWXzO",
    artists: "Fallout, Purple Disco Machine",
    name: "The Morning After - Purple Disco Machine Re-Work",
  },
  {
    id: "2bpaTLNs3BCzh5ESxJS9Ld",
    artists: "Purple Disco Machine, Boris Dlugosch",
    name: "Set It Out",
  },
  {
    id: "1jEY32CA2Mf2QgjPXrEfaZ",
    artists: "Tom Odell, Purple Disco Machine",
    name: "Wrong Crowd - Purple Disco Machine Remix",
  },
  {
    id: "6Q7yOsoTlZi5Qa9uW6dm9u",
    artists: "The Juan Maclean, Purple Disco Machine",
    name: "A Simple Design - Purple Disco Machine Remix",
  },
  {
    id: "4lN9C3LAta9jAonpdERD9k",
    artists: "Faithless",
    name: "Miss U Less, See U More 2.0 (Purple Disco Machine Remix)",
  },
  {
    id: "28hLyZHTc9O40TH9Gbf1h6",
    artists: "Purple Disco Machine, Lorenz Rhode",
    name: "Birds",
  },
  {
    id: "4UTWxsWUur9odP3z8IMh3N",
    artists: "Robosonic, Purple Disco Machine",
    name: "Geht Ab - Original Mix",
  },
  {
    id: "1GmaCQ1XIQJObRXveePCIc",
    artists: "Purple Disco Machine, Baxter, Mousse T.",
    name: "Encore (feat. Baxter) - Mousse T. Remix",
  },
  {
    id: "4avFzqrfnYbE5PSQQ4SbGc",
    artists: "Seeb, Neev, Purple Disco Machine",
    name: "Breathe - Purple Disco Machine Remix",
  },
  {
    id: "0POmGfSJoUIF1ibvyjM3JO",
    artists: "Chemise",
    name: "She Can't Love You - Purple Disco Machine Edit",
  },
  {
    id: "3Y0SA1vOKOXdywTYUqeIA8",
    artists: "Phoenix",
    name: "Winter Solstice",
  },
  {
    id: "4JvFNFTjEtZyEzh8w0YzHF",
    artists: "Phoenix, Ezra Koenig",
    name: "Tonight (feat. Ezra Koenig)",
  },
  {
    id: "1QgegXUzfvRJxNRHM9sP3F",
    artists: "Phoenix",
    name: "Alpha Zulu",
  },
  {
    id: "4tZwZVNhVCeBQYQtgQN5vW",
    artists: "Phoenix",
    name: 'Identical - From The Motion Picture "On The Rocks"',
  },
  { id: "0uzKfuty82lTHvfGaOLCdV", artists: "Phoenix", name: "J-Boy" },
  { id: "5kyNWfQebrqMlkhrAMAiYC", artists: "Phoenix", name: "Ti Amo" },
  {
    id: "3yQHSVSouvfPHM2v3wjoHT",
    artists: "Phoenix",
    name: "Goodbye Soleil",
  },
  {
    id: "3AA8xNhDC0MpqwkGX3EP5V",
    artists: "Phoenix",
    name: "If I Ever Feel Better",
  },
  {
    id: "3pzJXZ1PW3l3B69PoTx5lC",
    artists: "Phoenix",
    name: "Everything Is Everything",
  },
  {
    id: "6ZrlXT6mUMEgomN128iekU",
    artists: "Phoenix",
    name: "Lisztomania",
  },
  {
    id: "2OxcH2hvo4SrVGO3gd7RJO",
    artists: "Phoenix",
    name: "Run Run Run",
  },
  {
    id: "0djnjvuq3Lg71aZ3UK61D3",
    artists: "Phoenix",
    name: "Trying To Be Cool",
  },
  {
    id: "53hUao16f8xG9BwzxsGhZR",
    artists: "Phoenix",
    name: "Drakkar Noir",
  },
  { id: "5JtPGzRgrWxkXX9LoROq3d", artists: "Phoenix", name: "1901" },
  { id: "2THkQauDWMvJgXFGPY4iKB", artists: "Phoenix", name: "Too Young" },
  {
    id: "3XNXnjEct81xIRjtGPP3NJ",
    artists: "Phoenix",
    name: "Girlfriend",
  },
  { id: "7GUVaGNiu11HXN2aqF6Rir", artists: "Phoenix", name: "Lasso" },
  { id: "2BW8xmYgAXFOzULQRNxiNh", artists: "Phoenix", name: "Armistice" },
  {
    id: "4VJW5Aj2hBZx95JVi6AzNN",
    artists: "Phoenix",
    name: "Chloroform",
  },
  {
    id: "7dGubYmPavaI9YNansq9TW",
    artists: "Phoenix",
    name: "Long Distance Call",
  },
  {
    id: "1kVa8X5Ifr6XVmn8XvC1iu",
    artists: "Phoenix",
    name: "(You Can't Blame It On) Anybody",
  },
  {
    id: "5yakRZmZ20eaZ1J4nDgQhN",
    artists: "Phoenix",
    name: "Consolation Prizes",
  },
  { id: "2n21r18BendiM8hynbe7XJ", artists: "Phoenix", name: "Rally" },
  {
    id: "3m8mYGOLHtnHN0oktqW5o4",
    artists: "Phoenix",
    name: "I'm an Actor",
  },
  {
    id: "14htesVyDv7fNIrW4McQ0X",
    artists: "Phoenix",
    name: "Love Like a Sunset Part I",
  },
  {
    id: "474O0qw2zPc4k51oZc72iX",
    artists: "Phoenix",
    name: "Love Like a Sunset Part II",
  },
  {
    id: "3Yrk1Ytp3Vg1IRshQud90x",
    artists: "Phoenix",
    name: "Love for Granted",
  },
  { id: "6Nhw01s7PmqAqCl0ca8Fwg", artists: "Phoenix", name: "Countdown" },
  {
    id: "1g50RH5iSvlFwhHsRRNP9D",
    artists: "Phoenix",
    name: "Summer Days",
  },
  {
    id: "11SEKnYpFCFRXnUap3Cso2",
    artists: "LP Giobbi, DJ Tennis, Joseph Ashworth",
    name: "All In A Dream",
  },
  {
    id: "1IkPg6cCScDHqSbbq61IXA",
    artists: "LP Giobbi, DJ Tennis, Joseph Ashworth",
    name: "All In A Dream - Extended Mix",
  },
  {
    id: "5Zcioq2PxJK9bErsW3ym1f",
    artists: "Portugal. The Man, LP Giobbi",
    name: "What, Me Worry? - LP Giobbi Femme House Remix",
  },
  {
    id: "4zCXNYDjrxixWzFCOXo2c5",
    artists: "J. Worra, Leo Stannard, LP Giobbi",
    name: "Check Out - LP Giobbi Remix",
  },
  {
    id: "3YwsjD1ckhneoesIqaHYZi",
    artists: "Portugal. The Man, LP Giobbi",
    name: "What, Me Worry? - LP Giobbi Remix",
  },
  {
    id: "3LqnR4dZYdZoaVivSIidKH",
    artists: "LP Giobbi, Bklava",
    name: "Sinner",
  },
  {
    id: "7keTmM7ztouZFvyCzCja7S",
    artists: "LP Giobbi, Bklava",
    name: "Sinner - Extended Mix",
  },
  {
    id: "6in1DzqAL34ZhshZN426vi",
    artists: "San Holo, LP Giobbi",
    name: "bb u ok? - LP Giobbi Remix",
  },
  {
    id: "4aXij4j5BNOKKNrxgA6wc6",
    artists: "LP Giobbi, hermixalot",
    name: "Togetherness",
  },
  {
    id: "3EKYWF56Ipai4QkRQiZ6eG",
    artists: "Ferreck Dawn, Jem Cooke, LP Giobbi",
    name: "Back Tomorrow - LP Giobbi Remix",
  },
  {
    id: "5CLntwva0zoWDarzHuEF8e",
    artists: "Ferreck Dawn, Jem Cooke, LP Giobbi",
    name: "Back Tomorrow - LP Giobbi Extended Remix",
  },
  {
    id: "2AwFU2BnJRlEpjDtu04e6S",
    artists: "Chris Lorenzo, LP Giobbi, High Jinx",
    name: "California Dreamin' (feat. High Jinx) (LP Giobbi Remix)",
  },
  {
    id: "6VKpDRWz9HAUOEpElNvjSi",
    artists: "Ben Kim, LP Giobbi",
    name: "Somebody To Love",
  },
  {
    id: "2bSWlC6PsilJMSKYfKpMQW",
    artists: "DJ Rae, David Morales, LP Giobbi",
    name: "Something I'm Going Through (LP Giobbi Remix)",
  },
  {
    id: "0jqEMGyEfG9ddpsRdvyNxx",
    artists: "Billy Porter, LP Giobbi",
    name: "Children - LP Giobbi Remix",
  },
  {
    id: "1pvvg93oaSTKKCUzeEWYwo",
    artists: "LP Giobbi, Born Dirty",
    name: "24",
  },
  {
    id: "5dYZ382ddDN8xBdJLx7d9e",
    artists: "LP Giobbi, Amazonian Rockstar",
    name: "Say A Little Prayer",
  },
  {
    id: "5HPjAlKIchUN9BLtWwnUea",
    artists: "Tycho, Benjamin Gibbard, LP Giobbi",
    name: "Only Love - LP Giobbi Remix",
  },
  {
    id: "79sYqK4oxisNZsxArYdktd",
    artists: "Tycho, Benjamin Gibbard, LP Giobbi",
    name: "Only Love (LP Giobbi Remix) - Femme House Edit",
  },
  {
    id: "5HE47kIIYLqPQ6wueARnQo",
    artists: "Nico de Andrea, LP Giobbi, Darla Jade",
    name: "Let Me Love You",
  },
  {
    id: "132fXaozCi3EKmNgTnWmiW",
    artists: "LP Giobbi, Crush Club",
    name: "O Retha",
  },
  {
    id: "4j1uff7vbmK3h8hG6g3mAx",
    artists: "LP Giobbi, Crush Club",
    name: "O Retha - Extended Mix",
  },
  {
    id: "56yI7cIwLwHsJi8dADmDCB",
    artists: "LP Giobbi, Kaleena Zanders",
    name: "Carry Us",
  },
  {
    id: "1lwnReHQImLBYHNrvdTJaW",
    artists: "LP Giobbi, Kaleena Zanders, Bexxie",
    name: "Carry Us - Bexxie Remix",
  },
  {
    id: "5elzNkrs8iyzATGHSeMMrK",
    artists: "LP Giobbi, Kaleena Zanders, t e s t p r e s s",
    name: "Carry Us - t e s t p r e s s Remix",
  },
  {
    id: "5SJjk8IoNwNBQtfhg2Unpy",
    artists: "LP Giobbi",
    name: "Take My Hand",
  },
  {
    id: "6XF48DnOZae2M4V1ixqNHt",
    artists: "LP Giobbi, Walker & Royce",
    name: "Take My Hand (Walker & Royce Remix)",
  },
  {
    id: "1aW7N1nZiCxWd7zuJ1Hkf8",
    artists: "LP Giobbi, Tom & Collins",
    name: "Take My Hand (Tom & Collins Remix)",
  },
  {
    id: "0IeKvbdCP6gzVZvFPLXbDF",
    artists: "LP Giobbi, Mary Droppinz",
    name: "Take My Hand (Mary Droppinz Remix)",
  },
  {
    id: "1BiWBZrvcUh7cDCqHsjb2u",
    artists: "LP Giobbi, HANA",
    name: "Close Your Eyes - Spotify Singles",
  },
  {
    id: "0bT8TPKyfeQBBckcBwHKWi",
    artists: "Sofi Tukker, Amadou & Mariam, LP Giobbi",
    name: "Mon Cheri (LP Giobbi Remix) (Extended)",
  },
  {
    id: "35iWp4gjhDm0zNmnx2YViL",
    artists: "ASHA, LP Giobbi",
    name: "Ball & Chain (JJ Tribute) - LP Giobbi Remix",
  },
  {
    id: "07hshWQUFnyTqP7VmEVYe6",
    artists: "MK, LP Giobbi",
    name: "Chemical - LP Giobbi Remix",
  },
  {
    id: "0e6CPJzNGe0v2jvWnyoYso",
    artists: "Sofi Tukker, Amadou & Mariam, LP Giobbi",
    name: "Mon Cheri - LP Giobbi Remix",
  },
  {
    id: "5yqNlBL5P9rkTJSCtstfkk",
    artists: "Tensnake, Cara Melín, LP Giobbi",
    name: "Antibodies - LP Giobbi Remix",
  },
  {
    id: "5olb0HFMxxihDADpHIEiYQ",
    artists: "Junior Sanchez, Lee Wilson, LP Giobbi",
    name: "Music So Special (feat. Lee Wilson) - LP Giobbi Remix",
  },
  {
    id: "0EjVfH9vZo9BjVLK698Mxl",
    artists: "Dom Dolla, LP Giobbi",
    name: "Pump the Brakes - LP Giobbi Remix",
  },
  {
    id: "3WbzTkEaN1qt2ETW9ichVw",
    artists: "Hayden James, Gorgon City, Nat Dunn, LP Giobbi",
    name: "Foolproof - LP Giobbi Remix",
  },
  {
    id: "1Ckah0ICBG4AoAY0x6LbSF",
    artists: "LP Giobbi, hermixalot",
    name: "Believer",
  },
  {
    id: "4KFFv2gYbZyltjKZ5hthIs",
    artists: "LP Giobbi",
    name: "Take My Hand",
  },
  {
    id: "3EAwcVzkJyIp481tAtYeR0",
    artists: "LP Giobbi, hermixalot",
    name: "Move Your Body",
  },
  {
    id: "4Dosclv6nmoBWiuAqozPLC",
    artists: "LP Giobbi, hermixalot",
    name: "Emancipation",
  },
  {
    id: "644F2ztKKS7NJAJK1dKMc2",
    artists: "LP Giobbi, Little Boots, Benny Benassi, BB Team",
    name: "Meet Again (Benny Benassi & BB Team Remix)",
  },
  {
    id: "6ftW9BigUOyVwNbbLVugGd",
    artists: "LP Giobbi, Little Boots, BluePrint",
    name: "Meet Again (BluePrint Remix)",
  },
  {
    id: "3gGpxBdxvDrkgeGOphqLN8",
    artists: "LP Giobbi, hermixalot",
    name: "Take Me Higher",
  },
  {
    id: "0jEcG9tyrn0gL2IPTNTMKl",
    artists: "LP Giobbi, hermixalot",
    name: "Scuff Your Soul",
  },
  {
    id: "0RBabLLjDBWUResDuvf24V",
    artists: "LP Giobbi, Little Boots",
    name: "Meet Again",
  },
  {
    id: "1jhclVcqFpy4IGdWYzn9QS",
    artists: "LP Giobbi, hermixalot",
    name: "Gas Me Up",
  },
  {
    id: "4PZm6WCBYD46oxcr1eMcOa",
    artists: "Crush Club, LP Giobbi",
    name: "Angel",
  },
  {
    id: "2oAT0SSlDZjHdp4yWsVEUX",
    artists: "LP Giobbi, TT The Artist",
    name: "Jungle Queen",
  },
  {
    id: "6MKTYxOaqfal4bn1k3OOzI",
    artists: "LP Giobbi, Boom Dice",
    name: "Ready To Go",
  },
  {
    id: "61rCj8X7EOOpIZRcIXXKvb",
    artists: "LP Giobbi, hermixalot",
    name: "Slither In",
  },
  {
    id: "4hwmDrLutYtMJatpiw6DoE",
    artists: "LP Giobbi, WITHN",
    name: "Dejala Pasar",
  },
  {
    id: "795vHVAEN2tritAcTVgfDf",
    artists: "Hotel Garuda, LP Giobbi, Imad Royal, Kiah Victoria",
    name: "One Reason (feat. Imad Royal & Kiah Victoria) [LP Giobbi Remix]",
  },
  {
    id: "1w3N7HddkM87fhavSn6bFO",
    artists: "LP Giobbi, hermixalot, Computo",
    name: "Amber Rose (Acoustic)",
  },
  {
    id: "3IrnZXRDGPcLCvYR9xACYa",
    artists: "LP Giobbi, H3RY LÜCK",
    name: "Kupsa Kupsa",
  },
  {
    id: "4SI4j29JVcYiouWy9UUQ1U",
    artists: "LP Giobbi, hermixalot, Claire George",
    name: "Perfect Fire",
  },
  {
    id: "3nDmnZwcCOA5YBPjx5TF6A",
    artists: "LP Giobbi",
    name: "These Are Your Children",
  },
  {
    id: "495ZrrYaSAJri9Pg7pHIYy",
    artists: "LP Giobbi, hermixalot, Computo",
    name: "Amber Rose",
  },
  {
    id: "7LQ1T2nRljLrxt4GRQ60Na",
    artists: "Big Gigantic, LP Giobbi",
    name: "Got Me Like (LP Giobbi Remix)",
  },
  {
    id: "2BqIdDEwf8bHH0JuwS9j4O",
    artists: "Tensnake, Cara Melín, LP Giobbi",
    name: "Antibodies - LP Giobbi Remix",
  },
  {
    id: "6Esm09YZlCd58xR08xT021",
    artists: "Kito, Bea Miller, LP Giobbi",
    name: "Steal My Clothes (ft. Bea Miller) – LP Giobbi Remix",
  },
  {
    id: "2c2kf3p5rVmuHM3DQ8c1XK",
    artists: "Lastlings, LP Giobbi",
    name: "False Reactions - LP Giobbi Remix",
  },
  {
    id: "2nrhD4IcYbnJY3ixdgSJN4",
    artists: "Crush Club, LP Giobbi",
    name: "Trust (Lp Giobbi Remix)",
  },
  {
    id: "7q0vM8woumdTUt30GasolR",
    artists: "Cerrone, Purple Disco Machine",
    name: "Summer Lovin' - Edit",
  },
  {
    id: "7sMYJtxTHZKCDr48rAoA4J",
    artists: "Purple Disco Machine, Bosq, Kaleta",
    name: "Wake Up! (feat. Kaleta)",
  },
  {
    id: "6lHMg45o6S2ny3ZWAaNFZN",
    artists: "Purple Disco Machine, Sophie and the Giants",
    name: "In The Dark",
  },
  {
    id: "5JBtWpLoGO62gb5vax505b",
    artists: "Purple Disco Machine, Eyelar",
    name: "Dopamine (feat. Eyelar)",
  },
  {
    id: "5Iv4HuT9pKPi5WuE2ii3vs",
    artists: "Purple Disco Machine, Moss Kena, The Knocks",
    name: "Fireworks (feat. Moss Kena & The Knocks)",
  },
  {
    id: "1zsFr9rPcsMwRtqjDJJpnC",
    artists: "Purple Disco Machine, Sophie and the Giants",
    name: "Hypnotized",
  },
  {
    id: "3YgNxDXPnYkPOVh1dfZFEX",
    artists: "Purple Disco Machine, Sahara Beck",
    name: "Can't Get Enough (feat. Sahara Beck)",
  },
  {
    id: "1KaH1Dg1mJyf3ryvUUTA8n",
    artists: "Purple Disco Machine, Lorenz Rhode",
    name: "At The Disko",
  },
  {
    id: "6kNzxFAHyAJMD1N15bA2IP",
    artists: "Purple Disco Machine",
    name: "Don't Stop",
  },
  {
    id: "6in1bsdKMDWjSrWcPsTm4G",
    artists: "Purple Disco Machine, Elderbrook",
    name: "I Remember",
  },
  {
    id: "7pf7MA09UDMXmLdHFjMtUc",
    artists: "Purple Disco Machine, Bloom Twins",
    name: "Opposite of Crazy (feat. Bloom Twins)",
  },
  {
    id: "4pW9ulbaLjeq4BgNIB585p",
    artists: "Purple Disco Machine, Francesca Lombardo",
    name: "Loneliness (feat. Francesca Lombardo)",
  },
  {
    id: "12S6UtIBDKmSPI5MacyKVw",
    artists: "Purple Disco Machine, Fiorious, House Gospel Choir",
    name: "Hands to the Sky (feat. Fiorious & House Gospel Choir)",
  },
  {
    id: "6nFCFSL2wOXBM4iHOwpa1y",
    artists: "Purple Disco Machine, Pink Flamingo Rhythm Revue",
    name: "Money Money",
  },
  {
    id: "5Pc6PyIncHum3UybbwnHD9",
    artists: "Purple Disco Machine",
    name: "Playbox",
  },
  {
    id: "09cxinOTMgxytfDqATaHro",
    artists: "Purple Disco Machine, Mind Enterprises",
    name: "Exotica",
  },
  {
    id: "2mbtieEAhthHal4xOeUSlf",
    artists: "Purple Disco Machine, Ed Mac",
    name: "Wanna Feel Like A Lover (feat. Ed Mac)",
  },
  {
    id: "1eDW38uiHvC5b5G0yCvLIt",
    artists: "Patrick Cowley, Sylvester, Purple Disco Machine",
    name: "Menergy - Purple Disco Machine Remix",
  },
  {
    id: "0ikJw52P3gMANDDTgiVaxv",
    artists: "Purple Disco Machine, Alex Virgo",
    name: "Playbox - Alex Virgo Remix",
  },
  {
    id: "1kb5MBYPIwuOucLUzYqnxi",
    artists: "Boys Noize, Jake Shears, Purple Disco Machine",
    name: "All I Want (feat. Jake Shears) - Purple Disco Machine Remix",
  },
  {
    id: "1W02hcbdwd4do45YJqSlED",
    artists: "Milk & Sugar, Purple Disco Machine",
    name: "Let the Sun Shine - Purple Disco Machine Remix",
  },
  {
    id: "76bHtQnaaaxkDDcRI284HZ",
    artists: "Purple Disco Machine",
    name: "Playbox - Extended Mix",
  },
  {
    id: "2fUghTRDHSVIOUazEXwG1F",
    artists: "Purple Disco Machine, Moss Kena, The Knocks, Breakbot, Irfane",
    name: "Fireworks (feat. Moss Kena & The Knocks) - Breakbot & Irfane Remix",
  },
  {
    id: "7M8RlfP8SviqaH4kCkOkyE",
    artists: "Balthazar, Purple Disco Machine",
    name: "Losers - Purple Disco Machine Remix Edit",
  },
  {
    id: "1kTlT3phtU2yqTJYT1x6hb",
    artists: "Purple Disco Machine, Moss Kena, The Knocks",
    name: "Fireworks (feat. Moss Kena & The Knocks)",
  },
  {
    id: "5PbJIPs04N2nZlOkXtZyZK",
    artists: "Purple Disco Machine, Mind Enterprises",
    name: "Exotica - Edit",
  },
  {
    id: "7cpmk4IuNSWfg5XOrr2v8V",
    artists: "Royal Blood, Purple Disco Machine",
    name: "Trouble’s Coming - Purple Disco Machine Remix",
  },
  {
    id: "5zYHwLb3CIKlqEQ8hlUxvq",
    artists: "Kylie Minogue, Purple Disco Machine",
    name: "Magic - Purple Disco Machine Remix",
  },
  {
    id: "0dj5O3Nc6ONKWNd8mErvND",
    artists: "Lady Gaga, Ariana Grande, Purple Disco Machine",
    name: "Rain On Me - Purple Disco Machine Remix - Edit",
  },
  {
    id: "5guCcPcN7jafg9pLNjRLcU",
    artists: "Purple Disco Machine, Sophie and the Giants",
    name: "Hypnotized - Club Dub Mix",
  },
  {
    id: "3KJyg6smqSSzxdWh4LE8Pg",
    artists: "Duke Dumont, Purple Disco Machine",
    name: "Ocean Drive - Purple Disco Machine Remix",
  },
  {
    id: "1BbFFGUQHuuB2NaN64tQ5J",
    artists: "Claptone, Mylo, Purple Disco Machine",
    name: "Drop The Pressure - Purple Disco Machine Remix",
  },
  {
    id: "3PsNbaR7XZJSmPMXGEV52j",
    artists: "Purple Disco Machine",
    name: "Playbox",
  },
  {
    id: "3ruSBJtsa5dVwbIl7miXBw",
    artists: "Diplo, SIDEPIECE, Purple Disco Machine",
    name: "On My Mind - Purple Disco Machine Remix",
  },
  {
    id: "1v6uyDboVnwll25YCFOv2J",
    artists: "Purple Disco Machine, Sophie and the Giants, Roosevelt",
    name: "Hypnotized - Roosevelt Remix",
  },
  {
    id: "0gZ6jd4wSwpNxOIzZ9mdjG",
    artists: "Mind Enterprises, Purple Disco Machine",
    name: "Mont Blanc (Purple Disco Machine Remix) - Edit",
  },
]);

const backupTracks = ref([...tracks.value]);
</script>

<style scoped lang="scss">
button {
  background-color: hsla(160, 100%, 37%, 1);
  border: none;
  padding: 15px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  margin: 20px;
  border-radius: 4px;
}

.sort {
  &__buttons {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 0.1rem;

    &__reset {
      background-color: var(--color-text);
      outline-color: hsla(160, 100%, 37%, 1)
    }
  }

  &__items {
    grid-template-columns: auto auto auto auto;
    display: grid;
    align-items: center;
    justify-items: center;
  }
}

.sort-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
