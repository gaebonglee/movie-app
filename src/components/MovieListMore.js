import { Component } from "../core/heropy";
import movieStore, { searchMovies } from "../store/movie";

export default class MovieListMore extends Component {
  constructor() {
    super({
      tagName: "button",
    });
    movieStore.subscribe("pageMax", () => {
      const { page, pageMax, movies } = movieStore.state;

      if (pageMax > page && movies.length > 0) {
        this.el.classList.remove("hide");
      } else {
        this.el.classList.add("hide");
      }
    });
    movieStore.subscribe("loading", () => {
      this.el.disabled = movieStore.state.loading;
    });
  }
  render() {
    this.el.classList.add("btn", "view-more", "hide");
    this.el.textContent = "View More";
    this.el.addEventListener("click", async () => {
      await searchMovies(movieStore.state.page + 1);
    });
  }
}
