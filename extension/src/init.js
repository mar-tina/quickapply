import { PouchInstance } from "./index.js";

export let pouchDBInstance = new PouchInstance();

function initDB() {
  console.log("Instantiating pouch DB");
  pouchDBInstance.initPouchDB();
}

initDB();
