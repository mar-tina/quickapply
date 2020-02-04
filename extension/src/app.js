"use strict";

import { pouchDBInstance } from "./init.js";
import "./attach-holder.js";

const template = document.createElement("template");

template.innerHTML = `

  <style>
    .tablinks {
      border: none;
      padding: 20px;
      font-family: var(--main-font-family);
      font-weight: 600;
      font-size: 15px;
    }

    .tablinks:hover {
      cursor: pointer;
    }
  </style>

  <div class="tabs">
    <button id="importlink" class="tablinks"> Import </button>
    <button id="draftslink" class="tablinks"> Drafts </button>
  </div>

  <div id="import" class="tabcontent">
    <attach-holder></attach-holder>
  </div>

  <div id="drafts" class="tabcontent">
    <p> Drafts page </p>
  </div>
  
`;

function getPouchDBInstance() {
  let db = pouchDBInstance.pouch;

  db.info().then(function(info) {
    console.log(info);
  });
}

class MyApp extends HTMLElement {
  connectedCallback() {
    getPouchDBInstance();
    console.log("Connected");
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    // Get reference to the tabs
    this._importTab = this._shadowRoot.getElementById("importlink");
    this._draftsTab = this._shadowRoot.getElementById("draftslink");

    //Get reference to all divs that are tab contents
    this._tabcontent = this._shadowRoot.querySelectorAll(".tabcontent");

    //Add on click listeners to the tabs and pass the id
    this._importTab.addEventListener("click", e =>
      this._handleTabSwitch(e, "import")
    );
    this._draftsTab.addEventListener("click", e =>
      this._handleTabSwitch(e, "drafts")
    );
  }

  _handleTabSwitch(e, id) {
    e.preventDefault();
    let i;

    for (i = 0; i < this._tabcontent.length; i++) {
      this._tabcontent[i].style.display = "none";
    }

    this._shadowRoot.getElementById(id).style.display = "grid";
    console.log("This is the tab content and id", this._tabcontent, id);
  }
}

customElements.define("my-app", MyApp);
