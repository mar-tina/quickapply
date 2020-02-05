import { getAttachmentStub } from "./db.js";

async function needRes() {
  console.log("Instance", await getAttachmentStub(5, 0));
}

needRes();

function addElement() {
  console.log("creating new div");

  // create a new div element
  var newDiv = document.createElement("div");
  // and give it some content
  var newContent = document.createTextNode("Hi there and greetings!");
  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  newDiv.style.position = "fixed";
  newDiv.style.top = "0";
  newDiv.style.right = "0";
  newDiv.style.height = "100%";
  newDiv.style.width = "100px";
  newDiv.style.background = "yellow";
  newDiv.id = "myapp";

  const template = document.createElement("template");

  template.innerHTML = `<div> There is something here </div>`;
  var clon = template.content.cloneNode(true);
  newDiv.appendChild(clon);

  // add the newly created element and its content into the DOM
  // var currentDiv = document.getElementById("div1");
  document.body.append(newDiv);
}

addElement();

var thedoc = document.getElementById("myapp");
thedoc.style.display = "none";

var newdoc = document.getElementById("myapp:focus");
newdoc.style.display = "block";
