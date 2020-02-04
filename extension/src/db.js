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

export function getAttachmentStub(limit, skip) {
  pouchDBInstance.pouch
    .allDocs({
      include_docs: true,
      limit: limit,
      skip: skip
    })
    .then(function(result) {
      // handle result
      console.log("The result", result);
    })
    .catch(function(err) {
      console.log(err);
    });
}
