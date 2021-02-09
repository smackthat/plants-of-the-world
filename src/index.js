import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as d3geo from 'd3-geo';
import * as d3fetch from 'd3-fetch';
import *  as d3drag from 'd3-drag';
import * as d3zoom from 'd3-zoom';
import { select as d3select } from 'd3-selection';

//#region Main thang

export function Globe({ size, geoJson }) {

  const [{ x, y, z }, setRotate] = useState({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState(200);

  const svgRef = useRef(null);
  const sens = 0.20;

  let projection = d3geo.geoOrthographic()
    .scale(scale)
    .translate([size/2, size/2])
    .rotate([x, y, z])

  let drag = d3drag.drag()
    .subject(() => {
      var r = projection.rotate();
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
            key={d.properties.LEVEL3_COD}
            id={i + d.properties.LEVEL3_COD}
            d={d3geo.geoPath().projection(projection)(d)}
            className="region">
              <title>{d.properties.LEVEL3_NAM}</title>
          </path>
        )}
      </g>
    </svg>
  );

}

//#endregion Main thang


//#region Sample methods
// class Square extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       value: null
//     };
//   }

//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

// class Board extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       squares: Array(9).fill(null)
//     }
//   }

//   handleClick(i) {
//     const squares = this.state.squares.slice();
//     squares[i] = 'X';
//     this.setState({ squares: squares });
//   }

//   renderSquare(i) {
//     return <Square
//       value={this.state.squares[i]}
//       onClick={() => this.handleClick(i)}

//     />;
//   }

//   render() {
//     const status = 'Next player: X';

//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   render() {
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board />
//         </div>
//         <div className="game-info">
//           <div>{/* status */}</div>
//           <ol>{/* TODO */}</ol>
//         </div>
//       </div>
//     );
//   }
// }

//#endregion Sample methods

// ========================================

d3fetch.json('./assets/level3.json').then((json) => {

  console.log(json);
  // BUG with the geoJson: have to take out Tuamotu and Krasnoyarks since their coordinates are faulty and cause them to leak all over the globe... 
  json.features = json.features.filter(x => x.properties.LEVEL3_COD !== 'KRA' && x.properties.LEVEL3_COD !== 'TUA');

  ReactDOM.render(
    <Globe
      size={800}
      geoJson={json}
    >
    </Globe>,
    document.getElementById('root')
  );
});


