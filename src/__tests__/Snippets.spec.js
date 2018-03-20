import { getDataLayer, getTags } from '../Snippets';

let props;
let snippets;

describe('Snippets', () => {
  beforeEach(() => {
    props = { id: 'GTM-abc123', dataLayerName: 'dataLayer', events: {} };
    snippets = getTags(props);
  });

  it('should use the `id` for the iframe', () => {
    expect(snippets.iframeTag).toContain('id=GTM-abc123', 1);
  });

  it('should use the `dataLayer` for the script', () => {
    props = { dataLayer: { name: 'test' } };
    const dataLayerName = 'dataLayer';
    snippets = getDataLayer(dataLayerName, props);
    console.log(snippets);
    expect(snippets).toContain('{"name":"test"}');
  });

  it('no id provided should log a warn', () => {
    console.warn = jest.fn();
    const badProps = {};
    getTags(badProps);
    expect(console.warn).toBeCalled();
  });
});