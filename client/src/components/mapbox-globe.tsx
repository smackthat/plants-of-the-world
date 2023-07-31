import { useContext, useCallback, useMemo, useRef } from 'react';
import geoJson2 from '../assets/regions2.json';
import Map, { Source, Layer, FillLayer, LineLayer } from 'react-map-gl';
import { IMainContext, MainContext } from '../context/maincontext';
import bbox from '@turf/bbox';

const REGIONS = 'regions';
const REGIONS_SOURCE = 'regions-source';
const REGIONS_FILL = 'regions-fill';
const SELECTED_REGION_FILL = 'selected-region-fill';
const NATIVE_REGIONS_FILL = 'native-regions-fill';

const regionsLayer: LineLayer = {
    id: REGIONS,
    source: REGIONS_SOURCE,
    type: 'line',
    paint: {
        'line-color': '#a1a0a0',
        'line-width': 1.5
    }
};

const regionFill: FillLayer = {
    id: REGIONS_FILL,
    source: REGIONS_SOURCE,
    type: 'fill',
    paint: {
        'fill-opacity': 0
    },
};

const selectedRegionFillLayer: FillLayer = {
    id: SELECTED_REGION_FILL,
    source: REGIONS_SOURCE,
    type: 'fill',
    paint: {
        'fill-color': 'teal',
        'fill-opacity': 0.5,
    }
};

const nativeRegionsFillLayer: FillLayer = {
    id: NATIVE_REGIONS_FILL,
    source: REGIONS_SOURCE,
    type: 'fill',
    paint: {
        'fill-color': 'yellow',
        'fill-opacity': 0.7,
    }
};

export default function MapboxGlobe() {

    const mapRef = useRef(null);
    const context: IMainContext = useContext(MainContext);

    /** Set the selected region and zoom into it */
    const onClick = useCallback((e) => {
        if (e.features?.length > 0) {

            // calculate the bounding box of the feature
            const [minLng, minLat, maxLng, maxLat] = bbox(e.features[0]);

            if (mapRef.current) {
                mapRef.current.fitBounds(
                    [
                        [minLng, minLat],
                        [maxLng, maxLat]
                    ],
                    {
                        padding: 40, duration: 1500
                    }
                );
            }


            context.onRegionChanged({ regionIdentifier: e.features[0].properties.LEVEL3_COD, regionName: e.features[0].properties.LEVEL3_NAM });
        }
    }, []);

    const selectedRegionFilter: ['in', string, string] = useMemo(() => {
        if (context.region?.regionIdentifier) {
            return ['in', 'LEVEL3_COD', context.region.regionIdentifier];
        }
        return ['in', 'LEVEL3_COD', ''];
    }, [context.region]);

    const nativeRegionsFilter: boolean | ['in', string, ...any] = useMemo(() => {
        if (context.regions && context.regions.size > 0) {
            return ['in', 'LEVEL3_COD', ...Array.from(context.regions.keys())];
        }
        return false;
    }, [context.regions]);

    return (
        <div>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                    zoom: 1.5,
                }}
                maxZoom={6}
                minZoom={1.5}
                ref={mapRef}
                style={{ width: 700, height: 700 }}
                interactiveLayerIds={[REGIONS_FILL]}
                onClick={onClick}
                mapStyle={'mapbox://styles/jomamist/clk8df6nl00n401qrbk9hgr0g'}>
                <Source id={REGIONS_SOURCE} type="geojson" data={geoJson2}>
                    <Layer {...regionsLayer} />
                    <Layer {...selectedRegionFillLayer} filter={selectedRegionFilter} />
                    <Layer {...nativeRegionsFillLayer} filter={nativeRegionsFilter} />
                    <Layer {...regionFill} />
                </Source>
            </Map>
        </div>
    );
}
