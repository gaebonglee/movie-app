import { Components } from "./core/heropy";
import TheHeader from "./components/TheHeader";

export default class App extends Components {
  render() {
    const routerView = document.createElement("router-view");
    this.el.append(new TheHeader().el, routerView);
  }
}
