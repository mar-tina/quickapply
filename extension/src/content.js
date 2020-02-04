let links = document.getElementsByTagName("a");
console.log("The links", links);

let mails = [];
let i;
let j;

for (i = 0; i < links.length; i++) {
  if (links[i].href.includes("mailto")) {
    mails.push(links[i]);
    links[i].style.background = "yellow";
  } else {
    console.log("There are no emails on this site");
  }
}

for (j = 0; j < mails.length; j++) {
  mails[i].draggable = true;
}
