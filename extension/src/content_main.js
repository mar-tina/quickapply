import { getAttachmentStub } from "./db.js";
import { pouchDBInstance } from "./init.js";

console.log("In holder", pouchDBInstance);

async function needRes() {
  console.log("Instance", await getAttachmentStub(5, 0));
}

needRes();
