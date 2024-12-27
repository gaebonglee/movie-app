import { Components } from "./core/heropy";
import FruitItem from "./components/FruitItem.js";
 
export default class App extends Components {
  constructor() {
    super({
      state: {
        fruits: [
          {
            name: "apple",
            price: 1000,
          },
          {
            name: "banana",
            price: 2000,
          },
          {
            name: "orange",
            price: 3000,
          },
        ],
      },
    });
  }
  render() {
    console.log(this.state.fruits);
    this.el.innerHTML = /* html */ `
    <h1>Fruits</h1>
    <ul></ul>`;

    const ulEl = this.el.querySelector("ul");
    ulEl.append(
      ...this.state.fruits
       
        .map(
          (fruit) =>
            new FruitItem({
              props: {
                name: fruit.name,
                price: fruit.price,
              },
            }).el
        )
    );
  }
}
