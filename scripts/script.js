



// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
var mainURL = location;
var settingsURL = location + "#settings";


history.pushState("main",document.title, '#');
setState("main",mainURL,settingsURL);
//console.log(mainURL);

// Service Worker

//Register
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err); 
    });
  });
}



/*
'/scripts/script.js',
  '/scripts/router.js',
  '/components/entry-page.js',
  '/commponents/journal-entry.js'
  */


//var setMain = setState("main", mainURL, settingsURL);
//setInterval(setMain, 100);

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});


  
var settingsButton = document.querySelector('img[alt="settings"]');
var header = document.getElementsByTagName('h1')[0];
  

settingsButton.onclick = function() {
  
  history.pushState("settings",'', '#settings');
  setState("settings", mainURL, settingsURL);
}

header.addEventListener("click", function() {
  history.pushState("main",'', '#');
  setState("main", mainURL, settingsURL);
});

window.onpopstate = function(event) {
  console.log("THIS WILL SHOW THE TRUTH INSIDE ONPOPSTATE history.state= " + history.state);

  console.log(history);
  
  //  if (history.length <= 2) {
  //    return;
  //  }

  //console.log("we're in popstate");
  //console.log("currentState is " + currentState);
  //console.log("Event.state is " + event.state);
  console.log("WHAT EVEN IS THIS? event.state is " +  event.state.view);
  console.log("WHY IN THE WORLD WOULD THIS CHANGE? history.state is " +  history.state);

  
  setState(event.state, mainURL, settingsURL);
  
  // console.log("HUH ? history.state is " +  history.state);
  // history.replaceState(currentState,'', '');
  // console.log("HUH x2? history.state is " +  history.state);
  
  
  //history.pushState(currentState, '');
}

var journal_entries = document.getElementsByTagName('journal-entry');


setTimeout(makeEntryButtons, 100);

function makeEntryButtons() {
  for (var i = 0; i < document.getElementsByTagName('journal-entry').length; i++) {
    journal_entries[i].addEventListener('click', function() {

      let entries = Array.prototype.slice.call( document.getElementsByTagName('journal-entry') );
      let entryID = entries.indexOf(this);
      let entryState = "entry " + (entryID);

      history.pushState(entryState, '', '#Entry' + (entryID+1));
      setState(entryState, mainURL, settingsURL);
    });
  }
}







// history.pushState = function(event) {
//   body.classList.remove("settings");

//   document.getElementsByTagName('h1')[0].innerText = "Settings";
//   body.classList.add("settings");
//   location.assign(settingsURL);
// }

//https://developer.mozilla.org/en-US/docs/Web/API/History/pushState