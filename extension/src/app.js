"use strict";

import { pouchDBInstance } from "./init.js";
import "./attach-holder.js";
import "./drafts.js";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    .tablinks {
      border: none;
      padding-top: 20px;
      padding-bottom: 10px;
      font-family: var(--main-font-family);
      font-weight: 600;
      font-size: 15px;
    }

    .tablinks.active {
      color: var(--main-active-item)
    }

    .tablinks:hover {
      cursor: pointer;
    }

    .tablinks:focus {
      outline: none;
    }
  </style>

  <div class="tabs">
    <button id="importlink" class="tablinks active"> Import </button>
    <button id="draftslink" class="tablinks"> Drafts </button>
  </div>

  <div id="import" class="tabcontent">
    <attach-holder></attach-holder>
  </div>

  <div id="drafts" class="tabcontent">
    <drafts-page></drafts-page>
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
    //on load . Ensure the drafts page is not shown.
    this._shadowRoot.getElementById("drafts").style.display = "none";
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
    this._tablinks = this._shadowRoot.querySelectorAll(".tablinks");

    //Add on click listeners to the tabs and pass the id
    this._importTab.addEventListener("click", e =>
      this._handleTabSwitch(e, "import")
    );
    this._draftsTab.addEventListener("click", e =>
      this._handleTabSwitch(e, "drafts")
    );
  }

  //Foundation for this feature was built on :
  //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_tabs
  _handleTabSwitch(e, id) {
    e.preventDefault();
    let i, j;

    //Loop is not executing for some reason. Decided to Handle the classname change manually by acessing
    //the tablinks using their indices. Will come back and investigate
    // for (j = 0; j < this._tablinks; j++) {
    //   this._tablinks[j].className = this._tablinks[j].className.replace(
    //     " active",
    //     ""
    //   );
    //   console.log("The current tab", this._tablinks[j].className);
    // }

    for (i = 0; i < this._tabcontent.length; i++) {
      this._tabcontent[i].style.display = "none";
    }

    this._tablinks[0].className = this._tablinks[0].className.replace(
      " active",
      ""
    );
    this._tablinks[1].className = this._tablinks[1].className.replace(
      " active",
      ""
    );

    this._shadowRoot.getElementById(id).style.display = "grid";
    e.currentTarget.className += " active";
  }
}

customElements.define("my-app", MyApp);
