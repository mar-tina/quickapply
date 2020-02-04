import { importFiles } from "./db.js";

const template = document.createElement("template");

template.innerHTML = `
    <style>
        #drop_zone {
            display: grid;
            padding: 20px;
            border: 4px solid lightblue;
            height: 100px;
            justify-content: center;
            align-items: center;
            border-radius: 3%;
            margin-bottom: 20px;
        }

        input {
            margin: 20px;
        }

        button {
            padding: 20px;
            background: var(--main-active-item);
            color: white;
            border: none;
            font-size: 14px;
            font-family: var(--main-font-family);
        }

    </style>
    <label for="category">Category</label>
    <input id="category" type="text"/>
    <div id="drop_zone">
        <img id="drop-img" src="images/dnd.svg" />
    </div>

    <div>
        <button id="submit"> Complete Import </button>
    </div>

`;

export default class AttachHolder extends HTMLElement {
  constructor() {
    super();
    this._files = [];
    console.log("The files", this._files);

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._dropZone = this._shadowRoot.getElementById("drop_zone");
    this._categoryInput = this._shadowRoot.getElementById("category");
    this._submitButton = this._shadowRoot.getElementById("submit");
    this._dropImg = this._shadowRoot.getElementById("drop-img");

    // Handling DnD
    this._dropZone.addEventListener("drop", e => this._handleDropZone(e));
    this._dropZone.addEventListener("dragover", e => this._dragOverHandler(e));

    //Handling user input
    console.log("The input", this._categoryInput.value.length);

    //Handling submission of files to the db.
    this._submitButton.addEventListener("click", e => this._completeImport(e));

    //Adding src to the drag and drop image
    this._dropImg.src = chrome.runtime.getURL("images/dnd.svg");
  }

  //Implementation from MDN Docs https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
  _handleDropZone(ev) {
    console.log("File(s) dropped");
    console.log("Drop Enter", this._files);

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === "file") {
          var file = ev.dataTransfer.items[i].getAsFile();
          this._files.push(file);
          console.log("... file[" + i + "].name = " + file.name);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log(
          "... file[" + i + "].name = " + ev.dataTransfer.files[i].name
        );
      }
    }

    console.log("Drop Exit", this._files);
  }

  _dragOverHandler(ev) {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  _completeImport(e) {
    e.preventDefault();
    if (this._categoryInput.value.length > 0) {
      importFiles(this._categoryInput.value, this._files);
    } else {
      console.log("Input is empty");
    }
  }

  disconnectedCallback() {
    console.log("disconnected!");
    this._submitButton.removeEventListener("click", this._completeImport);
    this._dropZone.removeEventListener("drop", this._handleDropZone);
    this._dropZone.removeEventListener("dragover", this._dragOverHandler);
  }
}

customElements.define("attach-holder", AttachHolder);
