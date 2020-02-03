const template = document.createElement("template");

template.innerHTML = `
    <style>
        #drop_zone {
        display: grid;
        padding: 20px;
        border: 1px solid lightblue;
        height: 100px;
        }
    </style>
    
    <div id="drop_zone">
        Drag and drop files over here
    </div>

`;

class AttachHolder extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._dropZone = this._shadowRoot.getElementById("drop_zone");
    console.log("The drop zone", this._dropZone);
    this._dropZone.addEventListener("drop", e => this._handleDropZone(e));
    this._dropZone.addEventListener("dragover", e => this._dragOverHandler(e));
  }

  //https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
  _handleDropZone(ev) {
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === "file") {
          var file = ev.dataTransfer.items[i].getAsFile();
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
  }

  _dragOverHandler(ev) {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  disconnectedCallback() {
    console.log("disconnected!");
    this.$_shadowRoot.removeEventListener("ondrop");
  }
}

customElements.define("attach-holder", AttachHolder);
