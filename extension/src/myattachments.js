"use strict";

import { pouchDBInstance } from "./init.js";

let template = `
    <div>
        <input type="file" />
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
    this.innerHTML = template;
    getPouchDBInstance();
    console.log("Connected");
  }
}

customElements.define("my-attachments", MyAttachments);
