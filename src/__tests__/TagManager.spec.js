import React from 'react';
import { initialize } from '../TagManager';

describe('TagManager', () => {
  it('should render tagmanager', () => {
    initialize({ id: 'GTM-000000' });
    expect(window.dataLayer).toHaveLength(1);
  });

  it('should render datalayer', () => {
    const gtmArgs = {
      id: 'GTM-000000',
      dataLayer: {
        userInfo: 'userInfo'
      }
    };
    initialize(gtmArgs);
    expect(window.dataLayer).toHaveLength(1);
  });
});