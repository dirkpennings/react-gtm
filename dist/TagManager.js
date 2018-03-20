'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExistingDataLayer = exports.getExistingDataLayerName = exports.sendEvent = exports.initialize = exports.getScripts = exports.getDataScript = undefined;

var _Snippets = require('./Snippets');

var _constants = require('./constants');

var getDataScript = exports.getDataScript = function getDataScript(dataLayer) {
  var script = document.createElement('script');
  script.innerHTML = dataLayer;
  return script;
};

var getScripts = exports.getScripts = function getScripts(props) {
  var _getTags = (0, _Snippets.getTags)(props),
      iframeTag = _getTags.iframeTag,
      scriptTag = _getTags.scriptTag,
      dataLayerTag = _getTags.dataLayerTag;
  // console.log('scriptTag', scriptTag)

  var noScript = function noScript() {
    var noscript = document.createElement('noscript');
    noscript.innerHTML = iframeTag;
    return noscript;
  };

  var script = function script() {
    var script = document.createElement('script');
    script.innerHTML = scriptTag;
    return script;
  };

  var dataScript = getDataScript(dataLayerTag);

  return {
    noScript: noScript,
    script: script,
    dataScript: dataScript
  };
};

var initialize = exports.initialize = function initialize(_ref) {
  var id = _ref.id,
      _ref$dataLayer = _ref.dataLayer,
      dataLayer = _ref$dataLayer === undefined ? null : _ref$dataLayer,
      _ref$dataLayerName = _ref.dataLayerName,
      dataLayerName = _ref$dataLayerName === undefined ? _constants.DEFAULT_DL_NAME : _ref$dataLayerName,
      auth = _ref.auth,
      preview = _ref.preview,
      _ref$events = _ref.events,
      events = _ref$events === undefined ? {} : _ref$events;

  var gtm = getScripts({
    id: id,
    events: events,
    dataLayer: dataLayer,
    dataLayerName: dataLayerName,
    auth: auth,
    preview: preview
  });

  if (dataLayer) {
    document.head.appendChild(gtm.dataScript);
  }
  // console.log('gtm.script()', gtm.script())

  document.head.appendChild(gtm.script());
  document.body.appendChild(gtm.noScript());

  window[_constants.KEY_DOM_DATA_LAYER_NAME] = dataLayerName;
};

var sendEvent = exports.sendEvent = function sendEvent(event) {
  var dataLayer = getExistingDataLayer();

  return dataLayer.push(event);
};

var getExistingDataLayerName = exports.getExistingDataLayerName = function getExistingDataLayerName() {
  return window[_constants.KEY_DOM_DATA_LAYER_NAME];
};

var getExistingDataLayer = exports.getExistingDataLayer = function getExistingDataLayer() {
  var currentDataLayerName = getExistingDataLayerName();
  return window[currentDataLayerName];
};

exports.default = {
  initialize: initialize,
  sendEvent: sendEvent,
  getExistingDataLayer: getExistingDataLayer
};