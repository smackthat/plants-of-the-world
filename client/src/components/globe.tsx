import { Reducer, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import * as d3geo from 'd3-geo';
import { transition as d3transition } from 'd3-transition';
import { interpolate as d3interpolate } from 'd3-interpolate';
import *  as d3drag from 'd3-drag';
import * as d3zoom from 'd3-zoom';
import * as d3ease from 'd3-ease';
import { tile as d3tile } from 'd3-tile';
import { buffer as d3buffer } from 'd3-fetch';
import geoJson2 from '../assets/regions2.json';
import { select as d3select } from 'd3-selection';
import { IMainContext, MainContext } from '../context/maincontext';
import Pbf from 'pbf';
import { VectorTile } from '@mapbox/vector-tile';
import CircularProgress from '@mui/material/CircularProgress';

interface IGlobeState {
    x: number;
    y: number;
    z: number;
    scale: number;
}

interface Props {
    size: number;
}

/** Drag event sensitivity factor. */
const sens = 0.60;

function geojson([x, y, z], layer) {
    if (!layer) return;
    const features = [];

    for (let i = 0; i < layer.length; ++i) {
        const f = layer.feature(i).toGeoJSON(x, y, z);
        features.push(f);
    }

    console.log('FEATURES?', features);
    return { type: 'FeatureCollection', features };
}

export default function Globe({ size }: Props) {

    const context: IMainContext = useContext(MainContext);

    const [state, setState] = useReducer<Reducer<IGlobeState, any>>(
        (state, newState) => ({ ...state, ...newState }),
        { x: 0, y: 0, z: 0, scale: 300 }
    );

    const [tiles, setTiles] = useState(null);

    const svgRef = useRef(null);

    // const projection = useMemo(() => {
    //     return d3geo.geoOrthographic()
    //         .scale(state.scale)
    //         .translate([size / 2, size / 2])
    //         .rotate([state.x, state.y, state.z]);
    // }, [state.scale, state.x, state.y, state.z, size]);

    const projection = d3geo.geoOrthographic()
        .scale(state.scale)
        .translate([size / 2, size / 2])
        .rotate([state.x, state.y, state.z]);

    const drag = useMemo(() => {
        return d3drag.drag()
            .subject(() => {
                const r = projection.rotate();
                return { x: r[0] / sens, y: -r[1] / sens };
            })
            .on('drag', (event) => {
                const rotate = projection.rotate();
                setState({ x: event.x * sens, y: -event.y * sens, z: rotate[2] });
            });
    }, [projection]);

    const tile = useMemo(() => {
        return d3tile()
            .size([size, size])
            .scale(state.scale)
            .clampX(true)
            .translate(projection([0, 0]));
    }, [size, state.scale]);


    console.log('SCALE? ', state.scale);
    console.log('TILE? ', tile());



    const zoom = useMemo(() => {
        return d3zoom.zoom()
            .scaleExtent([300, 1600])
            .on('zoom', (e) => {
                setState({ scale: e.transform.k });
            });
    }, []);

    console.log('TILESSSS: ', tiles);

    useEffect(() => {
        (async () => {
            const t = await Promise.all(tile().map(async d => {
                d.layers = new VectorTile(new Pbf(await d3buffer('https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/' + d[2] + '/' + d[0] + '/' + d[1] + '.mvt?access_token=' + process.env.REACT_APP_MAPBOX_ACCESS_TOKEN))).layers;
                if (d) {
                    return d;
                }
            }));

            console.log('ASETETAAN TILES: ', t);
            setTiles(t);
        })();

    }, [tile]);


    useEffect(() => {
        const svg = d3select(svgRef.current);
        svg.call((drag as any));
        svg.call((zoom as any));
    });

    const handleClick = useCallback((e) => {

        const region = geoJson2.features.filter(x => x.properties.LEVEL3_COD === e.target.id)[0];
        const centroid = d3geo.geoCentroid(region as any);
        const bounds = d3geo.geoPath().projection(projection).bounds(region as any);

        const nextScale = projection.scale() * 1 / Math.max((bounds[1][0] - bounds[0][0]) / (size / 4), (bounds[1][1] - bounds[0][1]) / (size / 4));

        // Smooth rotate and zoom
        (async function transition() {
            await d3transition()
                .ease(d3ease.easeCubicOut)
                .duration(1000)
                .tween('rotate', () => {

                    const distance = d3interpolate(projection.rotate(), [-centroid[0], -centroid[1]]);
                    const z = d3interpolate(projection.scale(), nextScale);

                    return (t: number) => {

                        const a = distance(t);
                        const b = z(t);

                        console.log(a);

                        setState({ x: a[0], y: a[1], z: 0, scale: b });
                    };
                })
                .end();

            context.onRegionChanged({ regionIdentifier: region.properties.LEVEL3_COD, regionName: region.properties.LEVEL3_NAM });
        })();
    }, [context, geoJson2.features, projection, size]);

    if (!tiles) {
        return (
            <CircularProgress />
        );
    }

    return (
        <svg ref={svgRef} width={size} height={size}>
            <defs>
                <linearGradient id="waterGradient">
                    <stop offset="30%" stopColor="#97DEE7" />
                    <stop offset="70%" stopColor="#78C5DC" />
                </linearGradient>
            </defs>
            <g className="regions">
                <path className="water" d={d3geo.geoPath().projection(projection)({ type: 'Sphere' }) || undefined}>
                </path>
                {geoJson2.features.map((d, i) =>
                    <path
                        onClick={(event) => handleClick(event)}
                        key={i + d.properties.LEVEL3_COD}
                        id={d.properties.LEVEL3_COD}
                        d={d3geo.geoPath().projection(projection)(d as any) || undefined}
                        className={context.regions && context.regions.has(d.properties.LEVEL3_COD.toLowerCase()) ? 'region selected' : 'region'}>
                        <title>{d.properties.LEVEL3_NAM}</title>
                    </path>
                )}
            </g>
            <g>
                {(tiles as any).map((d, i) =>

                    <>

                        <path
                            key={i + '_figaro'}
                            d={d3geo.geoPath().projection(projection)(geojson(d, d.layers.landcover) as any)}
                            className="pilsner"
                        >

                        </path>


                    </>

                )}

            </g>
        </svg >
    );

}