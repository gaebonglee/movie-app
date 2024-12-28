import { Components } from "../core/heropy";
import messageStore from "../store/message";

export default class Message extends Components {
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
