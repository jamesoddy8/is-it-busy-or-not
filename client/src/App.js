 // document for react-geo: https://terrestris.github.io/react-geo-ws/map-integration/nominatim-search.html

import React, { useState } from 'react';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOsm from 'ol/source/OSM';

import { Drawer } from 'antd';

import {
  SimpleButton,
  MapComponent,
  NominatimSearch,
} from '@terrestris/react-geo';

import './App.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import './react-geo.css';
import {fromLonLat} from 'ol/proj';

const layer = new OlLayerTile({
  source: new OlSourceOsm()
});
const london = [ -0.126286, 51.508623 ];
const londonWebMercator = fromLonLat(london);

const map = new OlMap({
  view: new OlView({
    center: londonWebMercator,
    zoom: 14,
  }),
  layers: [layer]
});

function App() {
  const [visible, setVisible] = useState(false);

  const toggleDrawer = () => {
  setVisible(!visible);
}
  return (
    <div className="App">
      <MapComponent
        map={map}
        />
     <SimpleButton
       style={{position: 'fixed', top: '30px', right: '30px'}}
       onClick={toggleDrawer}
       icon="bars"
     />
     <Drawer
       title="isitbusyornot?"
       placement="right"
       onClose={toggleDrawer}
       visible={visible}
       mask={false}
     >
     {/*need to get search value from input & send to twitter api - source code: https://github.com/terrestris/react-geo/blob/master/src/Field/NominatimSearch/NominatimSearch.tsx  - somehow pass "searchTerm" state on line 178 (inside link) and pass it on*/}

       <NominatimSearch
         countrycodes="gb"
         placeholder="isitbusyornot...?"
         key="search"
         map={map}
         format="json"
       />
      </Drawer>
    </div>
  );
}

export default App;
