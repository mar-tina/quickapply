import { getAttachmentStub } from "./db.js";

const template = document.createElement("template");

template.innerHTML = `
    <style>
        #attachments {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 10px;
            margin-bottom: 20px;
        }

        #draft_zone {
            display: grid;
            padding: 20px;
            border: 4px solid #67809f;
            height: 130px;
            justify-content: center;
            align-items: center;
            border-radius: 3%;
            margin-bottom: 20px;
            margin-left: 10px;
            margin-right: 10px;
        }

        .subject {
            height: 30px;
            display: flex;
            align-items: center;
            padding: 10px;
        }

        .recipient {
            height: 30px;
            display: flex;
            align-items: center;
            padding: 10px;
        }

        .sub-icon {
            margin-left: 10px;
        }

        [draggable=true] {
            cursor: move;
        }

        .attachment {
            resize: both;
            margin: 5px;
            box-shadow: 5px 10px #888888;
            padding: 10px;
        }

        .vl {
            border-left: 3px solid coral;
            height: 25px;
            padding-right: 10px;
        }

        .sub-zone {
            padding: 10px;
            border: none;
            font-family: var(--main-font-family);
            font-weight: 600;
            font-size: 15px;
        }

        .sub-zone:focus {
            outline: none;
        }

    </style>
    <div id="attachments"> Here are your saved Docs: </div>

    <div class="subject"> 
        <div class="vl"></div>
        <img id="subj-img" src="images/subject.svg" />
        <input class="sub-zone" placeholder="subject"/>
    </div> 
    <div class="recipient"> 
        <div class="vl"></div>
        <img id="subj-img" src="images/subject.svg" />
        <input class="sub-zone" placeholder="subject"/>
    </div> 
    <div id="draft_zone">
        <div>
            <img id="drop-img" src="images/dnd.svg" />
        </div>
        <p> Drag Attachments Here ! </p>
    </div>

    

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

    this._subjectEL = this._shadowRoot.querySelector(".subject");
    this._subjectEL.addEventListener("drop", e => this._hanldeSubjectDrop(e));
    this._subjectEL.addEventListener("dragover", e =>
      this._hanldeSubjectDragover(e)
    );

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
