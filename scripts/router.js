// router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function (entry, title, number) {
  /**
   * - There are three states that your SPA app will have
   *    1. The home page
	@@ -35,4 +35,8 @@ router.setState = function() {
   *    1. You may add as many helper functions in this file as you like
   *    2. You may modify the parameters of setState() as much as you like
   */

  //1.push state
  window.history.pushState(entry, title, number);
};
window.addEventListener("popstate", (event) => {
  //home page
  if (event.state.index == "home") {
    main.style.display = "block";
    body.classList.remove("settings");
    title.innerText = "Journal Entries";

    //delete the old entry page
    let entry_page = document.querySelector("entry-page");
    if (entry_page) {
      entry_page.remove();
    }
  }
  //setting page
  else if (event.state.index == "setting") {
    main.style.display = "none";
    title.innerText = "Settings";
    body.classList.add("settings");
    //delete the old entry page
    let entry_page = document.querySelector("entry-page");
    if (entry_page) {
      entry_page.remove();
    }
  } else {
    main.style.display = "none";

    //changing the title
    let entry_title = window.location.hash.substr(6);
    title.innerText = "Entry " + entry_title;

    body.classList.remove("settings");

    //delete the old entry page
    let entry_page = document.querySelector("entry-page");
    if (entry_page) {
      entry_page.remove();
    }

    //create the new entry page
    let new_entry = document.createElement("entry-page");
    new_entry.entry = event.state;
    new_entry.style.display = "block";

    document.querySelector("body").appendChild(new_entry);
  }
});
