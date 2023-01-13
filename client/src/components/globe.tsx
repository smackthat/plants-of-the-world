import { Reducer, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import * as d3geo from 'd3-geo';
import * as d3transition from 'd3-transition';
import * as d3interpolate from 'd3-interpolate';
import *  as d3drag from 'd3-drag';
import * as d3zoom from 'd3-zoom';
import * as d3ease from 'd3-ease';
import geoJson2 from '../assets/regions2.json';
import { select as d3select } from 'd3-selection';
import { IMainContext, MainContext } from '../context/maincontext';

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

export default function Globe({ size }: Props) {

    const context: IMainContext = useContext(MainContext);

    const [state, setState] = useReducer<Reducer<IGlobeState, any>>(
        (state, newState) => ({ ...state, ...newState }),
        { x: 0, y: 0, z: 0, scale: 300 }
    );

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



    const zoom = useMemo(() => {
        return d3zoom.zoom()
            .scaleExtent([300, 1600])
            .on('zoom', (e) => {
                setState({ scale: e.transform.k });
            });
    }, []);


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
            await d3transition.transition()
                .ease(d3ease.easeCubicOut)
                .duration(1000)
                .tween('rotate', () => {

                    const distance = d3interpolate.interpolate(projection.rotate(), [-centroid[0], -centroid[1]]);
                    const z = d3interpolate.interpolate(projection.scale(), nextScale);

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

    return (
        <svg ref={svgRef} width={size} height={size}>
            <defs>
                <linearGradient id="waterGradient">
                    <stop offset="30%" stopColor="aqua" />
                    <stop offset="70%" stopColor="lightblue" />
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
        </svg>
    );

}