import { useEffect, useRef, useState } from "react";
import * as d3geo from 'd3-geo';
import *  as d3drag from 'd3-drag';
import * as d3zoom from 'd3-zoom';
import { select as d3select } from 'd3-selection';

export default function Globe({ size, geoJson }) {

    const [{ x, y, z }, setRotate] = useState({ x: 0, y: 0, z: 0 });
    const [scale, setScale] = useState(200);

    const svgRef = useRef(null);
    const sens = 0.40;

    let projection = d3geo.geoOrthographic()
        .scale(scale)
        .translate([size / 2, size / 2])
        .rotate([x, y, z])

    let drag = d3drag.drag()
        .subject(() => {
            let r = projection.rotate();
            return { x: r[0] / sens, y: -r[1] / sens };
        })
        .on('drag', (event) => {
            let rotate = projection.rotate();
            setRotate({ x: event.x * sens, y: -event.y * sens, z: rotate[2] });
        });

    let zoom = d3zoom.zoom()
        .scaleExtent([200, 800])
        .on('zoom', (e) => {
            setScale(e.transform.k)
        })

    useEffect(() => {
        const svg = d3select(svgRef.current);
        svg.call(drag);
        svg.call(zoom);
    }, [drag, zoom])

    const handleClick = (e) => {
        console.log('Klik! ', e.target.id);
        // TODO: zoom to selected region and open info panel
    };

    return (
        <svg ref={svgRef} width={size} height={size}>
            <defs>
                <linearGradient id="waterGradient">
                    <stop offset="30%" stopColor="aqua" />
                    <stop offset="70%" stopColor="lightblue" />
                </linearGradient>
            </defs>
            <g className="regions">
                <path className="water" d={d3geo.geoPath().projection(projection)({ type: 'Sphere' })}>
                </path>
                {geoJson.features.map((d, i) =>
                    <path
                        onClick={(event) => handleClick(event)}
                        key={i + d.properties.Level4_cod}
                        id={d.properties.Level4_cod}
                        d={d3geo.geoPath().projection(projection)(d)}
                        className="region">
                        <title>{d.properties.Level_4_Na}</title>
                    </path>
                )}
            </g>
        </svg>
    );

}