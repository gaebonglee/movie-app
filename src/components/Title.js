import { Components } from "../core/heropy";
import messageStore from "../store/message";

export default class Title extends Components {
  constructor() {
    super({
      tagName: "h1",
    });
    messageStore.subscribe("message", () => {
      this.render();
    });
  }
  render() {
    this.el.textContent = `Title : ${messageStore.state.message}`;
  }
}
