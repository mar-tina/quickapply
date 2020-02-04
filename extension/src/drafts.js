import { getAttachmentStub } from "./db.js";

const template = document.createElement("template");

template.innerHTML = `
    <style>
        #attachments {
            display: flex;
            flex-wrap: wrap;
        }

        [draggable=true] {
            cursor: move;
        }

        .attachment {
            overflow: scroll;
            resize: both;
            margin: 5px;
            box-shadow: 5px 10px #888888;
            padding: 10px;
        }
    </style>
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

    //call to display the attachment stubs
    this._renderAttachments();
  }

  async _renderAttachments() {
    this._attachments = await getAttachmentStub(5, 0);
    this._attachments.rows.forEach(attachment => {
      let attachEL = document.createElement("div");
      attachEL.classList.add("attachment");
      attachEL.draggable = true;
      attachEL.innerHTML = `
            <div> ${attachment.key} </div>
        `;
      this._attachmentEL.insertAdjacentElement("beforeend", attachEL);
    });
    console.log("The attachments", this._attachments);
  }
}

customElements.define("drafts-page", DraftsPage);
