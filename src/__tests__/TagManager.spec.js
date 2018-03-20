import React from 'react';

import { initialize } from '../TagManager';
import { DEFAULT_DL_NAME, KEY_DOM_DATA_LAYER_NAME } from './../constants';

describe('TagManager - with default data layer name', () => {
  beforeAll(() => {
    console.log('window.dataLayer before', window.dataLayer)
  });
  afterAll(() => {
    console.log('window.dataLayer after', window.dataLayer)
  });

  it('should render tagmanager', () => {
    initialize({ id: 'GTM-000000' });
    expect(window.dataLayer).toHaveLength(1);
  });

  it('should create the correct custom key in the DOM "window"', () => {
    const gtmArgs = {
      id: 'GTM-000000',
      dataLayer: {
        userInfo: 'userInfo'
      }
    };
    initialize(gtmArgs);
    expect(window[KEY_DOM_DATA_LAYER_NAME]).toEqual(DEFAULT_DL_NAME);
  });

  // TODO not working if using .only
  it.only('should render datalayer', () => {
    const gtmArgs = {
      id: 'GTM-000000',
      dataLayer: {
        userInfo: 'userInfo'
      }
    };
    initialize(gtmArgs);
    expect(window.dataLayer).toHaveLength(1);
  });

  it('should render datalayer and return newly created dataLayer', () => {
    const gtmArgs = {
      id: 'GTM-000000',
      dataLayer: {
        userInfo: 'userInfo'
      }
    };
    const createdDataLayer = initialize(gtmArgs);
    expect(window.dataLayer).toEqual(createdDataLayer)
  });
});

describe('TagManager - with custom data layer name', () => {
  const dataLayerName = 'myDataLayer';

  beforeAll(() => {
    console.log('window.dataLayer before', window.dataLayer)
    console.log('window.myDataLayer before', window.myDataLayer)
  });
  afterAll(() => {
    console.log('window.dataLayer after', window.dataLayer)
    console.log('window.myDataLayer after', window.myDataLayer)
  });

  it('should create the correct custom key in the DOM "window"', () => {
    const gtmArgs = {
      id: 'GTM-000000',
      dataLayerName,
      dataLayer: {
        userInfo: 'userInfo'
      }
    };
    initialize(gtmArgs);
    expect(window[KEY_DOM_DATA_LAYER_NAME]).toEqual(dataLayerName);
  });

  // TODO Not working
  it('should render datalayer', () => {
    const gtmArgs = {
      id: 'GTM-000000',
      dataLayerName,
      dataLayer: {
        userInfo: 'userInfo'
      }
    };
    initialize(gtmArgs);
    expect(window[dataLayerName]).toHaveLength(1);
  });

  it('should render datalayer and return newly created dataLayer', () => {
    const gtmArgs = {
      id: 'GTM-000000',
      dataLayerName,
      dataLayer: {
        userInfo: 'userInfo'
      }
    };
    const createdDataLayer = initialize(gtmArgs);
    console.log(createdDataLayer)
    expect(window[dataLayerName]).toEqual(createdDataLayer)
  });
});


