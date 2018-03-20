import warn from './utils/warn';
import { DEFAULT_DL_NAME } from './constants';

// https://developers.google.com/tag-manager/quickstart

export const getDataLayer = (dataLayerName = DEFAULT_DL_NAME, dataLayer) => {
  return `
    window.${dataLayerName} = window.${dataLayerName} || [];
    window.${dataLayerName}.push(${JSON.stringify(dataLayer)})
  `
};

export const getTags = ({ id, dataLayerName = DEFAULT_DL_NAME, dataLayer = null, auth = '', preview = '', events = {}, protocol = 'https' }) => {
  if (!id) {
    warn('GTM Id is required');
  }

  const gtm_auth = auth ? `&gtm_auth=${auth}`: '';
  const gtm_preview = auth ? `&gtm_preview=${preview}`: '';

  const iframeTag = `
    <iframe 
      src="${protocol}//www.googletagmanager.com/ns.html?id=${id}${gtm_auth}${gtm_preview}"
      height="0" 
      width="0" 
      style="display:none;visibility:hidden" 
      id="tag-manager"
    ></iframe>
  `;

  const scriptTag = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js',${JSON.stringify(events).slice(1, -1)}});
      var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;j.src='${protocol}://www.googletagmanager.com/gtm.js?id='+i+dl+'${gtm_auth}${gtm_preview}&gtm_cookies_win=x';
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','${dataLayerName}','${id}');`;

  // const scriptOld = `
  //   (function(w,d,s,l,i){w[l]=w[l]||[];
  //     w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', ${JSON.stringify(events).slice(1, -1)}});
  //     var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
  //     j.async=true;j.src='https://googletagmanager.com/gtm.js?id='+i+dl;
  //     f.parentNode.insertBefore(j,f);
  //   })(window,document,'script','${dataLayerName}','${id}');`;

  const dataLayerTag = getDataLayer(dataLayerName, dataLayer);

  return {
    iframeTag,
    scriptTag,
    dataLayerTag
  }
};

export default {
  getDataLayer,
  getTags,
};