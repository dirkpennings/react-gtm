# react-gtm

### React Google Tag Manager

This is a Javascript module to [React](https://facebook.github.io/react/) based apps that implement Google Tag Manager. 
It is designed to use [GTM](https://developers.google.com/tag-manager/quickstart) snnipets.

You can easily use custom dataLayer, multiple dataLayers and additional events, as well as environments.

## Fork

This is a fork from https://github.com/alinemorelli/react-gtm with the following improvements (from https://github.com/alinemorelli/react-gtm/commit/d075e27a84970e5f7b6a0ecf38119331fbdfc877)

- Environments (recent GTM feature)
- Use of HTTPS by default (instead of HTTP)
- Different way of using events (followed the official documentation), which doesn't recreate a new <script> tag at every call (see https://github.com/alinemorelli/react-gtm/issues/3)
- Renamed the package from react-gtm-module to react-gtm
- Added more tests

## Installation

[npm](https://www.npmjs.com/):

```bash
npm install Vadorequest/react-gtm#2.0.0 --save
```

## Staging environment

GTM has released **Environments** quite recently, and they're very useful to test your setup in a particular environment.

If you have a staging/preprod environment and would like to know more about it, see https://www.simoahava.com/analytics/better-qa-with-google-tag-manager-environments/

Otherwise, just ignore everything related to `staging` in the documentation, it's optional anyway.

## Usage

### Properties

|Value|Type|Required|Notes|
|------|-----|-----|-----|
|id| `String`| Yes | GTM id, must be something like `GTM-000000`.|
|auth| `String`| No | When using a staging environment|
|preview| `String`| No | When using a staging environment|
|dataLayer| `Object`| No | Object that contains all of the information that you want to pass to Google Tag Manager.|
|dataLayerName| `String`| No | Custom name for dataLayer object.|
|events| `Object`| No | Additional events such as 'gtm.start': new Date().getTime(),event:'gtm.js'.|


### Initializing GTM Module:

```jsx harmony
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm'

const tagManagerArgs = {
    id: 'GTM-000000',
    auth: 'KDJ8JDhbskdshzjz73kals', // Optional, see GTM => Admin => Environments, useful when using staging environment
    preview: 'env-2' // Optional
}

TagManager.initialize(tagManagerArgs)
...

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)

```

## DataLayer

### Custom dataLayer example:

```jsx harmony
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm'

const tagManagerArgs = {
    id: 'GTM-000000',
    dataLayer: {
        userId: '001',
        userProject: 'project'
    }
}

TagManager.initialize(tagManagerArgs)
...

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)

```


### Multiple dataLayer example:

If you need send multiple custom dataLayer you can initialize GTM Module on different components sending different dataLayers

You can initialize it normally:

```jsx harmony
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm'

const tagManagerArgs = {
    id: 'GTM-000000',
    dataLayerName: 'PageDataLayer'
}

TagManager.initialize(tagManagerArgs)
...

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)

```

And send your data in each page you want

```jsx harmony
import React from 'react'

...
import TagManager from 'react-gtm'

const tagManagerArgs = {
    dataLayer: {
        userId: '001',
        userProject: 'project',
        page: 'home'
    },
    dataLayerName: 'PageDataLayer'
}
...

const Home = () => {
    ...
    TagManager.dataLayer(tagManagerArgs)
    ...

    return (
        <div className='home'>
            //your component code
        </div>
    )
}

export default Home

```


## Pre-defined Events

### Example:

```jsx harmony
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm'

const tagManagerArgs = {
    id: 'GTM-000000',
    events: {
        sendUserInfo: 'userInfo'
    }
}

TagManager.initialize(tagManagerArgs)
...

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)
```

## Dynamic events

See official documentation for proper usage: https://developers.google.com/tag-manager/devguide#events


```jsx harmony
import React from 'react'

import TagManager from 'react-gtm'

const tagManagerArgs = {
    id: 'GTM-000000'
}

TagManager.initialize(tagManagerArgs)

// Later, in the same file or another file, you can use TagManager.sendEvent or just import sendEvent
import {sendEvent} from 'react-gtm'

<button onclick={() => sendEvent({'event': 'button1-click'})} />

<button onclick={() => sendEvent({
  'event': 'customizeCar',
  'color': 'red',
  'conversionValue': 50
})} />
```

### Get the DataLayer from DOM

Once you have initialized the GTM in your page, you can get the `dataLayer` from `TagManager.getExistingDataLayer` or `import { getExistingDataLayer } from 'react-gtm'`

During the initialize, a global variable is created, storing the key used to store the dataLayer, which allows to retrieve it later on.

You can also just use `window.dataLayer` if you're not using a custom 'dataLayerName'. (which is the default behavior)

# Know issues

- When using a custom `dataLayerName`, the test kinda fail (they've been deactivated for this particular use case)
    I do not know if it's an issue with the tests itself (seems likely), or with the feature.
    Nevertheless, if you use a custom `dataLayerName`, be aware of that and make sure it works properly.

# Notes:

- Disabling javascript in the browser can prevent the correct operation of this library if React is only being rendered on the client side.