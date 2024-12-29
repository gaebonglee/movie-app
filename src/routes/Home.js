import { Component } from "../core/heropy";
// import TextField from "../components/TextField";
// import Message from "../components/Message";
// import Title from "../components/Title";
import Headline from "../components/Headline";
export default class Home extends Component {
  render() {
    const headline = new Headline().el;
    this.el.classList.add("container");
    this.el.append(headline);
    // this.el.append(new TextField().el, new Message().el, new Title().el);
  }
}
