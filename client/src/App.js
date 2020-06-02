 // document for react-geo: https://terrestris.github.io/react-geo-ws/map-integration/nominatim-search.html

import React, { useState, useEffect } from 'react';
import Twitter from 'Twitter';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOsm from 'ol/source/OSM';
import * as _proj from "ol/proj";

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
  const [currentLonLat, setCurrentLonLat] = useState({ lon: "0", lat: "0" });

  const toggleDrawer = () => {
  setVisible(!visible);
  };
  return (
    <>
      <div>
        {currentLonLat.lon} {currentLonLat.lat}
      </div>
      <div className="App">
        <MapComponent
          map={map}
          />
        <Twitter
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

      <NominatimSearch
        countrycodes="gb"
        placeholder="isitbusyornot...?"
        key="search"
        map={map}
        onSelect={({ lon, lat, ...selected }, olMap) => {
          if (selected && selected.boundingbox) {
            var olView = olMap.getView();
            var extent = [
              selected.boundingbox[2],
              selected.boundingbox[0],
              selected.boundingbox[3],
              selected.boundingbox[1],
            ];
            extent = extent.map(function (coord) {
              return parseFloat(coord);
            });
            extent = (0, _proj.transformExtent)(
              extent,
              "EPSG:4326",
              olView.getProjection().getCode()
            );
            olView.fit(extent, {
              duration: 500,
            });
          }

          setCurrentLonLat({ lon, lat });
        }}
      />

      </Drawer>
      </div>
    </>
  );
}
export default App;
