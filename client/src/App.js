import React, { useState } from 'react';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOsm from 'ol/source/OSM';

import { Drawer } from 'antd';

import './App.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import './react-geo.css';
import {fromLonLat} from 'ol/proj';

import {
  SimpleButton,
  MapComponent,
  NominatimSearch,
  MapProvider,
  mappify
} from '@terrestris/react-geo';

const MappifiedNominatimSearch = mappify(NominatimSearch);
const Map = mappify(MapComponent);


const layer = new OlLayerTile({
  source: new OlSourceOsm()
});
const london = [ -0.126286, 51.508623 ];
const londonWebMercator = fromLonLat(london);
// const center = [ 788453.4890155146, 6573085.729161344 ];

const map = new OlMap({
  view: new OlView({
    center: londonWebMercator,
    zoom: 15,
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
      <MapProvider map={map}>
     <Map />
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
       <MappifiedNominatimSearch
         countrycodes="gb"
         placeholder="isitbusyornot...?"
         key="search"
         map={map}
         format="json"
       />
        </Drawer>
      </MapProvider>
    </div>
  );
}

export default App;
