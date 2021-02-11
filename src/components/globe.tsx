import { useEffect, useMemo, useRef, useState } from "react";
import * as d3geo from 'd3-geo';
import * as d3transition from 'd3-transition';
import { interpolate as d3interpolate } from 'd3-interpolate';
import *  as d3drag from 'd3-drag';
import * as d3zoom from 'd3-zoom';
import { select as d3select } from 'd3-selection';

export default function Globe({ size, geoJson }) {

    const [{ x, y, z }, setRotate] = useState({ x: 0, y: 0, z: 0 });
    const [scale, setScale] = useState(300);

    const svgRef = useRef(null);
    const sens = useMemo(() => 0.40, []);

    const projection = d3geo.geoOrthographic()
        .scale(scale)
        .translate([size / 2, size / 2])
        .rotate([x, y, z])

    const drag = useMemo(() => {
        return d3drag.drag()
            .subject(() => {
                let r = projection.rotate();
                return { x: r[0] / sens, y: -r[1] / sens };
            })
            .on('drag', (event) => {
                let rotate = projection.rotate();
                setRotate({ x: event.x * sens, y: -event.y * sens, z: rotate[2] });
            });
    }, [projection, sens]);



    const zoom = useMemo(() => {
        return d3zoom.zoom()
            .scaleExtent([300, 900])
            .on('zoom', (e) => {
                setScale(e.transform.k)
            });
    }, []);


    useEffect(() => {
        const svg = d3select(svgRef.current);
        svg.call((drag as any));
        svg.call((zoom as any));
    });

    const handleClick = (e) => {

        let region = geoJson.features.filter(x => x.properties.Level4_cod === e.target.id)[0];
        let centroid = d3geo.geoCentroid(region);

        // Smooth rotate and zoom
        (function transition() {
            d3transition.transition()
                .duration(1000)
                .tween("rotate", () => {

                    var distance = d3interpolate(projection.rotate(), [-centroid[0], -centroid[1]]);
                    var z = d3interpolate(projection.scale(), 800)
                    return (t: number) => {
                        const a = distance(t);
                        const b = z(t);

                        setRotate({ x: a[0], y: a[1], z: 1 });
                        setScale(b);
                    };
                })
        })();
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
                <path className="water" d={d3geo.geoPath().projection(projection)({ type: 'Sphere' }) || undefined}>
                </path>
                {geoJson.features.map((d, i) =>
                    <path
                        onClick={(event) => handleClick(event)}
                        key={i + d.properties.Level4_cod}
                        id={d.properties.Level4_cod}
                        d={d3geo.geoPath().projection(projection)(d) || undefined}
                        className="region">
                        <title>{d.properties.Level_4_Na}</title>
                    </path>
                )}
            </g>
        </svg>
    );

}