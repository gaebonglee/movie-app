import { Store } from "../core/core";

const store = new Store({
  searchText: "",
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {},
  loading: false,
  message: "Search for the movie title!",
});
export default store;

export const searchMovies = async (page) => {
  store.state.loading = true;
  store.state.page = page;
  if (page === 1) {
    store.state.movies = [];
    store.state.message = "";
  }
  try {
    console.log("🔹 영화 검색 요청:", store.state.searchText, page);
    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({
        title: store.state.searchText,
        page: page,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // ✅ 응답이 JSON인지 확인 후 변환
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("🔹 API 응답 데이터:", data);

    const { Response, Search, totalResults } = data; 

    if (Response === "True") {
      store.state.movies = [...store.state.movies, ...Search];
      store.state.pageMax = Math.ceil(Number(totalResults) / 10);
    } else {
      store.state.message = Error;
      store.state.pageMax = 1;
    }
  } catch (error) {
    console.error("🔴 searchMovies error:", error);
  } finally {
    store.state.loading = false;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json(); // ✅ JSON 변환은 한 번만 실행

    console.log("🔹 영화 상세 데이터:", data);
    store.state.movie = data; // ✅ JSON 데이터를 제대로 저장
  } catch (error) {
    console.log("🔴 getMovieDetails error:", error);
  }
};