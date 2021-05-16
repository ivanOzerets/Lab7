// router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(state, mainURL, settingsURL) {
  /**
   * - There are three states that your SPA app will have
   *    1. The home page
   *    2. The entry page (showing one individual entry)
   *    3. The settings page (currently blank, no actual settings here, just a placeholder where a real settings page would go)
   * 
   * - If you look at the CSS, we have 2 classes you can add to the body element to help change states, "settings" and "single-entry"
   * - Changing states will require more than just changing these classes, for example the settings page requires you to change the title to "Settings"
   * - And each individual entry the title changes to "Entry #" based on it's number in the entry order
   *
   * - When changing states, make sure the back and forward buttons work. You can use hash URLs (e.g. https://someurl.com/#settings) when changing states
   *   to make things easier.
   * - Similarly, when viewing an individual entry, a hashed URL might look like https://someurl.com/#entry3
   * 
   * - Some tips:
   *    1. Push a new state object to the history object using history.pushState() 
   *    2. look up the documentation for how to use pushState() when you try it
   *    3. look up the documentation for the "popstate" event listener (fires only on back button), useful in your script.js file
   *    4. For each <journal-entry> element, you can grab the JSON version of its info with .entry (e.g. someJournalEntryElement.entry)
   *       a. This is useful when viewing a single entry. You may notice an <entry-page> element in the HTML, this is the element that is displayed when the
   *          .single-entry class is applied to the body. You can populate this element by using .entry similarly. So if I wanted to grab a specific <journal-entry>
   *          and populate it's info into the <entry-page>, I would simply use an assignment of entryPageElement.entry = journalEntryElement.entry
   *       b. Clearing the <entry-page> element of its previous data can be a bit tricky, it might be useful to just delete it and insert a new blank one 
   *          in the same spot each time. Just a thought.
   *
   * - Answers to some questions you may have:
   *    1. You may add as many helper functions in this file as you like
   *    2. You may modify the parameters of setState() as much as you like
   */


   console.log("We're in setState");
   console.log("Before, you have " + history.length + " pages in the history.");
   console.log("history.state is " + history.state);

   var body = document.body;
   var header = document.getElementsByTagName('h1')[0];

  //console.log("history.state is " + history.state);

  var entry_page = document.getElementsByTagName('entry-page')[0];
  entry_page.parentElement.removeChild(entry_page);
 
  var blank_entry_page = document.createElement('entry-page');
  body.appendChild(blank_entry_page);
 

 
  console.log("the state we are in now is: " + state);
 
  state = state.split(' ');
  
 
  if (state[0] == "settings") {
    body.classList.remove("single-entry");
 
    header.innerText = "Settings";
    body.classList.add("settings");
 
    //location.hash = "#settings";
  
    //console.log("THE TRUE history.state is " + history.state);
    //history.pushState(state, '', '');
    //console.log("THE TRUE UPDATED history.state is " + history.state);
 
  } else if (state[0] == "main") {
    body.classList.remove("settings");
    body.classList.remove("single-entry");
    
    document.getElementsByTagName('h1')[0].innerText = "Journal Entries";

    //history.replaceState(null, null, ' ');
    
    
    //location.hash = '';

    //console.log("THE TRUE CURRENT STATE IN header thing currentState is " + state);
    //console.log("THE TRUE history.state is " + history.state);
    //console.log("Before, you have " + history.length + " pages in the history.");
    //history.pushState(state, '', ' ');
    //console.log("After, you have " + history.length + " pages in the history.");
    //console.log("THE TRUE UPDATED history.state is " + history.state);

    //history.replaceState("main", document.title, mainURL);
    //history.replaceState("main", document.title, mainURL);
    //history.replaceState(null, null, ' ');
 
 
  } else if (state[0] == "entry") {
    let entryID = parseInt(state[1]);
    console.log("EntryID = " + entryID);
    let entry = document.getElementsByTagName('journal-entry')[entryID];
    if (entry){
      body.classList.remove("settings");
      console.log("Hi, it's working");
      body.classList.add("single-entry");
 
      //Get entry id
      
      
      document.getElementsByTagName('entry-page')[0].entry = entry.entry;
 

      

      document.getElementsByTagName('h1')[0].innerText = "Entry " + (entryID + 1);
 
      let entryURL = mainURL + "#Entry" + (entryID + 1);
      
      //location.hash = "#Entry" + (entryID + 1);
 
      
    }
  }
 
  console.log("After, you have " + history.length + " pages in the history.");
  console.log("THIS WILL SHOW THE TRUTH history.state= " + history.state);
  return state;
}

// window.onpopstate = function(event) {
//   //console.log("we're in popstate");
//   //console.log("currentState is " + currentState);
//   //console.log("Event.state is " + event.state);
//   console.log("WHY IN THE WORLD WOULD THIS CHANGE? history.state is " +  history.state);

//   //let temp = setState(history.state, mainURL, settingsURL, history.state);
//   //currentState = temp;
//   //history.pushState(currentState, '');
// }