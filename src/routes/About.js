import { Component } from "../core/core";
import aboutStore from "../store/about";
import userImage from "../../public/images/me.png";

export default class About extends Component {
  render() {
    const { photo, name, email, github } = aboutStore.state;
    this.el.classList.add("container", "about");
    this.el.innerHTML = /*html*/ `
    <div class="photo"><img src="${userImage}"/></div>
      <p class="name">${name}</p>
      <p>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${email}" target="_blank">
          ${email}
        </a>
      </p>
      <p><a href="${github}" target="_blank">GitHub</a></p>
    `;
  }
}
