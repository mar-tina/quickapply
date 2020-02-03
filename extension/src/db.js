import { pouchDBInstance } from "./init.js";

export function importFiles(doc, files) {
  files.map(file => {
    pouchDBInstance.pouch
      .put({
        _id: doc,
        _attachments: {
          filename: {
            type: file.type,
            data: file,
            content_type: file.type
          }
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  });
}
