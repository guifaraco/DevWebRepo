<script setup>
import { ref, onMounted } from "vue";
import { findMovieGenres } from "../assets/js/genresSearch";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});


const genres = ref([]);

onMounted(async () => {
    genres.value = await findMovieGenres(props.movie);
})
</script>

<template>
  <div class="bg-slate-800 border border-white rounded-lg p-4 shadow-lg">
    <h3 class="text-xl font-bold text-white mb-2">{{ movie.title }}</h3>
    <div class="text-sm text-gray-400 mb-2">
      <span v-for="(genre, index) in genres" :key="index" class="mr-2">
        {{ genre }}
      </span>
    </div>
    <p class="text-gray-300 text-md mb-4">{{ movie.overview }}</p>
    <p class="text-gray-400 text-sm">Lançamento: {{ movie.release_date }}</p>
  </div>
</template>