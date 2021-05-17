// script.js

import { router } from "./router.js"; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}
// Make sure you register your service worker here too
//added
let setting = document.getElementsByTagName("img")[0];
let main = document.querySelector("main");
let title = document.querySelector("h1");
let body = document.querySelector("body");
let count = 1;
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://cse110lab6.herokuapp.com/entries")
    .then((response) => response.json())
    .then((entries) => {
      entries.forEach((entry) => {
        let newPost = document.createElement("journal-entry");
        newPost.entry = entry;
        newPost.number = count;

        newPost.addEventListener("click", () => {
          router.setState(
            newPost.entry,
            "Entry " + newPost.number,
            "#" + newPost.number
          );
          main.style.display = "none";

          //changing the title
          title.innerText = "Entry " + newPost.number;

          //delete the old entry page
          let entry_page = document.querySelector("entry-page");
          if (entry_page) {
            entry_page.remove();
          }

          //create the new entry page
          let new_entry = document.createElement("entry-page");
          new_entry.entry = newPost.entry;
          new_entry.style.display = "block";

          let position = document.querySelector("body");
          position.appendChild(new_entry);
        });

        count++;
        document.querySelector("main").appendChild(newPost);
      });
    });

  setting.addEventListener("click", () => {
    router.setState({ index: "setting" }, "Setting ", "#settings");
    main.style.display = "none";
    title.innerText = "Settings";
    body.classList.add("settings");
    //delete the old entry page
    let entry_page = document.querySelector("entry-page");
    if (entry_page) {
      entry_page.remove();
    }
  });

  title.addEventListener("click", () => {
    router.setState({ index: "home" }, "Home Page ", "/");
    main.style.display = "block";
    body.classList.remove("settings");
    title.innerText = "Journal Entries";
  });
});
