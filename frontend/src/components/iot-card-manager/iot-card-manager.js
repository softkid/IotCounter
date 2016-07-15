export default window.IotCardManager = (function() {
  var currentScriptElement = document._currentScript || document.currentScript;
  var importDoc = currentScriptElement.ownerDocument;

  class IotCardManager extends HTMLElement {
    createdCallback() {
      var root = this.createShadowRoot();
      var template = document.querySelector('#iot-card-manager-template');
      var clone = null;
      if (!template) {
        template = importDoc.querySelector('#iot-card-manager-template');
      }

      clone = document.importNode(template.content, true);
      let cards = ['badminton-count', 'gym', 'car-parking'];
      for(c in cards) {
        var iotCardNode = document.createElement('iot-card');
        iotCardNode.dataset.cardFor = cards[c];
        iotCardNode.name = cards[c];
        self.shadowRoot.querySelector('card-holder').appendChild(iotCardNode);
      }
      if (window.CustomShadowDOMPolyfill) {
        this.distributeNode(clone);
      }
      root.appendChild(clone);
      this._data = {};
    }
  }
  const IotCardManagerElement = document.registerElement('iot-card-manager', IotCardManager);
  Object.freeze(IotCardManager.prototype);
  Object.freeze(IotCardManager);
  return IotCardManagerElement;
})();
