const apiToken = import.meta.env.VITE_API_TOKEN;

let cachedGenres = null;

export async function findMovieGenres(movie) {
  if (!cachedGenres) {
    cachedGenres = await fetchGenres();
  }

  return movie.genre_ids
    .map((id) => cachedGenres.find((genre) => genre.id === id)?.name)
    .filter(Boolean);
}

async function fetchGenres() {
  const urlGenres = "https://api.themoviedb.org/3/genre/movie/list?language=pt-BR";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: apiToken,
    },
  };
  
  const response = await fetch(urlGenres, options);
  const data = await response.json();
  return data.genres;
}


