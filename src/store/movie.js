import { Store } from "../core/heropy";

const store = new Store({
  searchText: "",
  page: 1,
  pageMax: 1,
  movies: [],
  loading: false,
});

export default store;
export const searchMovies = async (page) => {
  store.state.loading = true;
  store.state.page = page;
  if (page === 1) {
    store.state.movies = [];
  }

  try {
    const res = await fetch(
      `https://omdbapi.com/?apikey=cbd92b7d&s=${store.state.searchText}&page=${page}`
    );
    const data = await res.json();
    const { Search = [], totalResults = "0" } = data;
    store.state.movies = [...store.state.movies, ...Search];
    store.state.pageMax = Math.ceil(Number(totalResults) / 10);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  } finally {
    store.state.loading = false;
  }
};
