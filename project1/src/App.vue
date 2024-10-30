<script setup>
import { computed, ref } from "vue";
import Header from "./components/PagesHeader.vue";
import Modal from './components/Modal.vue';
import MovieCard from "./components/MovieCard.vue";


const movies = ref([]);
const modalVisible = ref(false);


const showModal = () => {
  modalVisible.value = true;
};

const addMovie = (movie) => {
  movies.value.push(movie);
};

const showModalComputed = computed(() => modalVisible.value)
</script>

<template>
  <div class="bg-black min-h-screen w-screen p-16">
    <Header />
    <main class="bg-black w-full min-h-full p-16 overflow-y-auto">
      <div class="border border-white rounded-lg p-16">
        <div class="flex justify-between mb-16">
          <h2 class="text-3xl font-bold text-white">Meus Filmes</h2>
          <button
            class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            @click="showModal"
          >
            Adicionar Filme
          </button>
        </div>
        <div v-if="movies.length > 0" class="grid grid-cols-3 gap-4 overflow-y-auto">
          <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>
        <p v-else class="text-white text-5xl text-center">
          Sua lista de filmes está vazia.
          <span class="text-orange-400 font-extrabold"
            >Adicione algum filme para que possa ser visualizada.</span
          >
        </p>
      </div>
    </main>
    <Modal v-if="showModalComputed" @close="modalVisible = false" :addMovie="addMovie"/>
  </div>
</template>
