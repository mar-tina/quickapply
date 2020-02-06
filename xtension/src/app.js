const template = document.createElement("template");

template.innerHTML = `
    <div> Hello world </div>
`;

class MyApp extends HTMLElement {
  constructor() {
    super();
    this._shadowroot = this.attachShadow({ mode: "open" });
    this._shadowroot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("my-app", MyApp);
