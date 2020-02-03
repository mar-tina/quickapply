import "../pouchdb-7.1.1.min.js";

export class PouchInstance {
  constructor() {
    this.pouch = null;
  }

  //Fix for maximum call-stack-size-exceeded added the "'_'" infront of the class properties
  //https://stackoverflow.com/questions/34144430/es6-class-maximum-call-stack-size-exceeded
  get pouch() {
    return this._pouch;
  }

  set pouch(newpouch) {
    this._pouch = newpouch;
  }

  initPouchDB() {
    this.pouch = new PouchDB("quickapply");

    if (this.pouch === null) {
      document.write("Failed to init pouch DB");
    }
  }
}
