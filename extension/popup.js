function runonload() {
  console.log("I am being initialized");
}

class MyComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Hello world</h1>`;
  }
}

customElements.define("my-component", MyComponent);
