"use strict";

import { pouchDBInstance } from "./init.js";

const template = document.createElement("template");

template.innerHTML = `
  <div>

  </div>
  
`;

function getPouchDBInstance() {
  let db = pouchDBInstance.pouch;

  db.info().then(function(info) {
    console.log(info);
  });
}

class MyAttachments extends HTMLElement {
  connectedCallback() {
    getPouchDBInstance();
    console.log("Connected");
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

}

customElements.define("my-attachments", MyAttachments);
