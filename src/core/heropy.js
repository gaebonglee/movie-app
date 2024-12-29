///// Components //////
export class Component {
  constructor(payload = {}) {
    const { tagName = "div", state = {}, props = {} } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }
  render() {}
}

///// Router (페이지 구분) /////
function routerRender(routes) {
  if (!location.hash) {
    history.replaceState(null, " ", "/#/");
  }
  const routerView = document.querySelector("router-view");
  const [hash, queryString = ""] = location.hash.split("?");

  const query = queryString.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {});

  history.replaceState(query, "");

  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(hash)
  );
  routerView.innerHTML = "";
  routerView.append(new currentRoute.component().el);

  window.scrollTo(0, 0);
}
export function createRouter(routes) {
  return function () {
    window.addEventListener("popstate", () => {
      routerRender(routes);
    });
    routerRender(routes);
  };
}

////////// STORE (컴포넌트 통신, 상태관리 개념) ////////
export class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (val) => {
          state[key] = val;
          this.observers[key].forEach((observer) => observer(val));
        },
      });
    }
  }
  subscribe(key, cb) {
    // {message: [cb1, cb2, cb3, ...]}
    if (!Array.isArray(this.observers[key])) {
      this.observers[key] = []; // key가 없거나 배열이 아닌 경우 초기화
    }
    this.observers[key].push(cb);
  }
}
