import { Component } from "../core/heropy";
import messageStore from "../store/movie";

export default class Message extends Component {
  constructor() {
    super();
    messageStore.subscribe("message", () => {
      this.render();
    });
  }
  render() {
    this.el.innerHTML = /*html*/ `
        <h2>${messageStore.state.message}</h2>
        `;
  }
}
