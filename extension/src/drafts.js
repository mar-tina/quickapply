import { getAttachmentStub } from "./db.js";

const template = document.createElement("template");

template.innerHTML = `
    <div> Welcome to the Drafts Page </div>
`;

class DraftsPage extends HTMLElement {
  connectedCallback() {
    getAttachmentStub(5, 0);
  }

  constructor() {
    super();
    this._attachments = [];
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("drafts-page", DraftsPage);
