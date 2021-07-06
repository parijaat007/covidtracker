import React from 'react';
import './Map.css';
import { Map as LeafletMap, TileLayer} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Leaflet from 'leaflet';
import { showMapData } from "./Util";

function Map({countries,casesType,center,zoom}) {
    // To prevent map from overflowing we have to set the 
    //bounds and then set the viscosity to max so it is 
    //not able to go beyond the set boundaries
    const corner1 = Leaflet.latLng(-90, -200)
    const corner2 = Leaflet.latLng(90, 200)
    const bounds = Leaflet.latLngBounds(corner1, corner2)
    return (
        <div className="map">
            {/* <h1>Map to be implemented.</h1> */}
            <LeafletMap 
                center={center} 
                zoom={zoom}
                minZoom={1.5}
                maxZoom={5}
                maxBoundsViscosity={1.0}
                maxBounds={bounds}
                >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showMapData(countries,casesType)}
            </LeafletMap>
            {/* <LeafletMap
                className="markercluster-map"
                center={center}
                zoom={zoom}
                maxZoom={18}
                >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                </LeafletMap> */}
        </div>
    );
}

export default Map