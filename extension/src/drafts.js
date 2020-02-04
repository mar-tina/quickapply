import { getAttachmentStub } from "./db.js";

const template = document.createElement("template");

template.innerHTML = `
    <div id="attachments"> Welcome to the Drafts Page </div>
`;

class DraftsPage extends HTMLElement {
  connectedCallback() {
    console.log("Im running");
  }

  constructor() {
    super();
    this._attachments = {};
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    //Get a ref to the attachments div
    this._attachmentEL = this._shadowRoot.getElementById("attachments");
    this._renderAttachments();
    //call to display the attachment stubs
  }

  async _renderAttachments() {
    this._attachments = await getAttachmentStub(5, 0);
    this._attachments.rows.forEach(attachment => {
      let attachEL = document.createElement("div");
      attachEL.classList.add("attachment");
      attachEL.innerHTML = `
            <div> ${attachment.key} </div>
        `;
      this._attachmentEL.insertAdjacentElement("beforeend", attachEL);
    });
    console.log("The attachments", this._attachments);
  }
}

customElements.define("drafts-page", DraftsPage);
