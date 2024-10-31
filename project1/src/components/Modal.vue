<script setup>
import { ref, watch } from "vue";
import { findMovieGenres } from "../assets/js/genresSearch";
const apiToken = import.meta.env.VITE_API_TOKEN;

const props = defineProps({
  addMovie: {
    type: Function,
    required: true,
  },
});

const query = ref("");
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: apiToken,
  },
};

const movie = ref(null);
const genres = ref([]);
const error = ref("");

const addMovie = () => {
  props.addMovie(movie.value);
};

const updateMovieAndGenresValues = async (data) => {
  if (data.results.length > 0) {
    movie.value = data.results[0];
    genres.value = await findMovieGenres(movie.value);
  }
};

const searchMovie = async () => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query.value}&include_adult=true&language=pt-BR&page=1`;
  const response = await fetch(url, options);
  const data = await response.json();
  try {
    await updateMovieAndGenresValues(data);
  } catch (errorValue) {
    error.value = "Não foi possivel contato com a API";
  }
};

watch(error, (newError) => {
  error.value = newError;
});
</script>
<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-black p-4 rounded-lg shadow-lg w-1/2 border border-white">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold text-center text-white">
          Pesquisar filme
        </h2>
        <button
          class="text-white hover:text-gray-900 transition duration-300 ease-in-out"
          @click="$emit('close')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="w-6 h-6"
          >
            <path d="M6 18L18 6M6 6L18 18" />
          </svg>
        </button>
      </div>
      <form @submit.prevent="searchMovie" class="flex items-center">
        <div class="relative w-full">
          <img
            src="../assets/lupa.png"
            alt="Lupa"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
          <input
            type="text"
            placeholder="Informe o nome do filme"
            class="w-full p-2 pl-10 text-sm font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            v-model="query"
          />
        </div>
        <button
          class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg ml-2 flex items-center justify-center"
        >
          <img src="../assets/lupawhite.png" alt="Lupa" class="w-5 h-5" />
        </button>
      </form>
      <div class="mt-4" v-if="error != ''">
        <p class="text-red-600 text-center">{{ error }}</p>
      </div>
      <div v-if="movie" class="mt-4">
        <h3 class="text-white text-lg font-bold">{{ movie.title }}</h3>
        <div class="flex flex-wrap mb-4">
          <span class="mr-2 text-white" v-for="genre in genres" :key="genre">{{
            genre
          }}</span>
        </div>
        <hr />
        <p class="text-white py-4">{{ movie.overview }}</p>
        <hr />
        <p class="text-white py-4">
          Data de lançamento: {{ movie.release_date }}
        </p>
        <button
          class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg w-full mt-4"
          @click="addMovie"
        >
          Adicionar à lista
        </button>
      </div>
    </div>
  </div>
</template>
