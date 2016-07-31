'use strict';

function _initFirebase (self) {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCJ6hsMhbWViZ8ozlubxS2B7NstsQTcv8w",
    authDomain: "iotcounter.firebaseapp.com",
    databaseURL: "https://iotcounter.firebaseio.com",
    storageBucket: "iotcounter.appspot.com",
  };
  firebase.initializeApp(config);
  console.log("initialized firebase from container");
}

function _addStrips(self) {
  let stripRefNames = ['Phoenix Office', 'Raheja Office'];
  for(let i in stripRefNames) {
    var stripNode = document.createElement('iot-strip');
    stripNode.refName = stripRefNames[i];
    self.shadowRoot.querySelector('#strips').appendChild(stripNode);
  }
}

(function() {
  console.log("initializing container");
  var currentScriptElement = document._currentScript || document.currentScript;
  var importDoc = currentScriptElement.ownerDocument;
  var template = document.querySelector('#iot-container-template');
  var proto = Object.create(HTMLElement.prototype);
  proto.createdCallback = function() {
    _initFirebase(this);
    if (!template) {
      template = importDoc.querySelector('#iot-container-template');
    }
    var clone = document.importNode(template.content, true);
    this.createShadowRoot().appendChild(clone);
    _addStrips(this);
  }
  document.registerElement('iot-container', {prototype: proto});
}());