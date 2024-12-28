import { Components } from "../core/heropy.js";

export default class TheHeader extends Components {
  constructor() {
    super({
      tagName: "header",
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
        <a href="#/">Main!</a>
        <a href="#/about">About!</a>
        `;
  }
}
