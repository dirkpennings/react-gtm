'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTags = exports.getDataLayer = undefined;

var _warn = require('./utils/warn');

var _warn2 = _interopRequireDefault(_warn);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://developers.google.com/tag-manager/quickstart

var getDataLayer = exports.getDataLayer = function getDataLayer() {
  var dataLayerName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.DEFAULT_DL_NAME;
  var dataLayer = arguments[1];

  return '\n    window.' + dataLayerName + ' = window.' + dataLayerName + ' || [];\n    window.' + dataLayerName + '.push(' + JSON.stringify(dataLayer) + ')\n  ';
};

var getTags = exports.getTags = function getTags(_ref) {
  var id = _ref.id,
      _ref$dataLayerName = _ref.dataLayerName,
      dataLayerName = _ref$dataLayerName === undefined ? _constants.DEFAULT_DL_NAME : _ref$dataLayerName,
      _ref$dataLayer = _ref.dataLayer,
      dataLayer = _ref$dataLayer === undefined ? null : _ref$dataLayer,
      _ref$auth = _ref.auth,
      auth = _ref$auth === undefined ? '' : _ref$auth,
      _ref$preview = _ref.preview,
      preview = _ref$preview === undefined ? '' : _ref$preview,
      _ref$events = _ref.events,
      events = _ref$events === undefined ? {} : _ref$events,
      _ref$protocol = _ref.protocol,
      protocol = _ref$protocol === undefined ? 'https' : _ref$protocol;

  if (!id) {
    (0, _warn2.default)('GTM Id is required');
  }

  var gtm_auth = auth ? '&gtm_auth=' + auth : '';
  var gtm_preview = auth ? '&gtm_preview=' + preview : '';

  var iframeTag = '\n    <iframe \n      src="' + protocol + '//www.googletagmanager.com/ns.html?id=' + id + gtm_auth + gtm_preview + '"\n      height="0" \n      width="0" \n      style="display:none;visibility:hidden" \n      id="tag-manager"\n    ></iframe>\n  ';

  var scriptTag = '\n    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':\n      new Date().getTime(),event:\'gtm.js\',' + JSON.stringify(events).slice(1, -1) + '});\n      var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';\n      j.async=true;j.src=\'' + protocol + '://www.googletagmanager.com/gtm.js?id=\'+i+dl+\'' + gtm_auth + gtm_preview + '&gtm_cookies_win=x\';\n      f.parentNode.insertBefore(j,f);\n    })(window,document,\'script\',\'' + dataLayerName + '\',\'' + id + '\');';

  // const scriptOld = `
  //   (function(w,d,s,l,i){w[l]=w[l]||[];
  //     w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', ${JSON.stringify(events).slice(1, -1)}});
  //     var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
  //     j.async=true;j.src='https://googletagmanager.com/gtm.js?id='+i+dl;
  //     f.parentNode.insertBefore(j,f);
  //   })(window,document,'script','${dataLayerName}','${id}');`;

  var dataLayerTag = getDataLayer(dataLayerName, dataLayer);

  return {
    iframeTag: iframeTag,
    scriptTag: scriptTag,
    dataLayerTag: dataLayerTag
  };
};

exports.default = {
  getDataLayer: getDataLayer,
  getTags: getTags
};