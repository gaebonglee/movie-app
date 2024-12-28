import { Components } from "../core/heropy";
import TextField from "../components/TextField";
import Message from "../components/Message";

export default class Home extends Components {
  render() {
    this.el.innerHTML = /* html */ `
        <h1>Home Page!</h1>
        `;
    this.el.append(
        new TextField().el, 
        new Message().el);
  }
}
