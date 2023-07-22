import { useState, useContext, useCallback, useRef, useMemo } from 'react';
import geoJson2 from '../assets/regions2.json';
import Map, { Source, Layer, FillLayer, LineLayer } from 'react-map-gl';
import { IMainContext, MainContext } from '../context/maincontext';

const REGIONS_SOURCE = 'regions-source';
const SELECTED_REGION_FILL = 'selected-region-fill';

const regionsLayer: LineLayer = {
    id: 'regions',
    source: REGIONS_SOURCE,
    type: 'line',
    paint: {
        'line-color': '#a1a0a0',
        'line-width': 1.5
    }
};

const selectedRegionFillLayer: FillLayer = {
    id: SELECTED_REGION_FILL,
    source: REGIONS_SOURCE,
    type: 'fill'
};

export default function MapboxGlobe() {
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [zoom, setZoom] = useState(1.5);

    const mapRef = useRef(null);



    const context: IMainContext = useContext(MainContext);

    /** Set the selected region and zoom into it */
    const onClick = useCallback((e) => {
        console.log(e);
        if (e.features?.length > 0) {
            context.onRegionChanged({ regionIdentifier: e.features[0].properties.LEVEL3_COD, regionName: e.features[0].properties.LEVEL3_NAM });
        }
    }, []);

    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: zoom,
                }}
                maxZoom={6}
                minZoom={1.5}
                ref={mapRef}
                style={{ width: 600, height: 600 }}
                interactiveLayerIds={[SELECTED_REGION_FILL]}
                onClick={onClick}
                mapStyle={'mapbox://styles/jomamist/clk8df6nl00n401qrbk9hgr0g'}>
                <Source id={REGIONS_SOURCE} type="geojson" data={geoJson2}>
                    <Layer {...regionsLayer} />
                    <Layer {...selectedRegionFillLayer} />
                </Source>
            </Map>
        </div>
    );
}
