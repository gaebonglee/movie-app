///// Components //////

export class Components {
  constructor(payload = {}) {
    const { tagName = "div", state = {} } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.render();
  }
  render() {}
}
