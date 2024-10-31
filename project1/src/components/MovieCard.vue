<script setup>
import { ref, onMounted } from "vue";
import { findMovieGenres } from "../assets/js/genresSearch";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["remove"]);
const genres = ref([]);

function emitRemoveMovie() {
  emit("remove", props.movie);
}

onMounted(async () => {
    genres.value = await findMovieGenres(props.movie);
})
</script>

<template>
  <div class="relative bg-slate-800 border border-white rounded-lg p-4 shadow-lg">
    <button @click="emitRemoveMovie" class="absolute top-2 right-2 text-gray-400 hover:text-gray-200 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
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