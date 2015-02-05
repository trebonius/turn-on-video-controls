// ==UserScript==
// @name         Turn On All HTML5 Video Controls
// @namespace    http://bentobin.com/videocontrols
// @version      0.1
// @description  Turns on all HTML5 video controls
// @author       Ben Tobin
// @match        http://*/*
// @match		 https://*/*
// @grant        none
// ==/UserScript==

var DEBUG = false;

// Setup a new observer to get notified of changes
var observer = new MutationObserver(function (mutations) {
    
    mutations.forEach(function (mutation) {
      
      var entry = {
        mutation: mutation,
        el: mutation.target,
        value: mutation.target.textContent,
        oldValue: mutation.oldValue
      };
      if (DEBUG) console.log('Recording mutation:', entry);
      if (mutation.type == "childList") {
          for (var x = 0; x < mutation.addedNodes.length; x++)
          {
              var newNode = mutation.addedNodes[x];
              if (DEBUG) console.log("AddedNode: ", newNode);
              // Video added directly
              if (newNode.tagName == "VIDEO") {
                  if (DEBUG) console.log("Found a video!: ", video);
                  turnOnControls(newNode);
              // Some nodes (text) don't let me call this, so don't try.
              // TODO: Figure out if we might be missing video tags because of this
              } else if (newNode.getElementsByTagName) {
                  // Video added as child
                  var videos = newNode.getElementsByTagName("VIDEO");
                  for (var y = 0; y < videos.length; y++) {
                      var video = videos[y];
                      if (DEBUG) console.log("Found a video!: ", video);
                      turnOnControls(video);
                  }
              }
          }
      }
    });
});

// What we're all here for
function turnOnControls(video) {
	video.setAttribute("controls","controls");
}

var options = {
  subtree: true,
  childList: true,
  attributes: false
};

// Observe a specific DOM node / subtree
observer.observe(document, options);

// Do all the videos that are part of the original document
var videos = document.getElementsByTagName("VIDEO");
for (var y = 0; y < videos.length; y++) {
    var video = videos[y];
    if (DEBUG) console.log("Found a video!: ", video);
    turnOnControls(video);

// TODO: Handle pages that later turn off the controls in JS.
}
