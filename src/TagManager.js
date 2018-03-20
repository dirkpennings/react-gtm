import { getTags } from './Snippets'
import { DEFAULT_DL_NAME } from './constants';

export const getDataScript = (dataLayer) => {
  const script = document.createElement('script');
  script.innerHTML = dataLayer;
  return script
};

export const getScripts = (props) => {
  const { iframeTag, scriptTag, dataLayerTag } = getTags(props);

  const noScript = () => {
    const noscript = document.createElement('noscript');
    noscript.innerHTML = iframeTag;
    return noscript
  };

  const script = () => {
    const script = document.createElement('script');
    script.innerHTML = scriptTag;
    return script
  };

  const dataScript = getDataScript(dataLayerTag);

  return {
    noScript,
    script,
    dataScript
  }
};

export const initialize = (
  {
    id,
    dataLayer = null,
    dataLayerName = DEFAULT_DL_NAME,
    auth,
    preview,
    events = {}
  }
) => {
  const gtm = getScripts({
    id,
    events,
    dataLayer,
    dataLayerName,
    auth,
    preview,
  });

  if (dataLayer) {
    document.head.appendChild(gtm.dataScript);
  }

  document.head.appendChild(gtm.script());
  document.body.appendChild(gtm.noScript());
};