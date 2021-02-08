import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as d3geo from 'd3-geo';
import * as d3fetch from 'd3-fetch';
import *  as d3drag from 'd3-drag';
import * as d3zoom from 'd3-zoom';
import { select as d3select } from 'd3-selection';

//#region Main thang

// const Context = React.createContext(null);

// export function Stage({ size, children }) {
//   const svgRef = useRef(null);
//   const [svg, setSvg] = useState(null);

//   useEffect(() => setSvg(svgRef.current), []);

//   return (
//     <svg ref={svgRef} width={size} height={size}>
//       <Context.Provider value={svg}>{children}</Context.Provider>
//     </svg>
//   )
// }

// export function useSvg() {
//   return React.useContext(Context)
// }

// export function Container({ projection, children }) {

//   const svgElement = useSvg();
//   const [{ x, y, k }, setTransform] = useState({ x: 120, y: 40, k: 1 });
//   const [{ rx, ry }, setRotate] = useState({ rx: 0, ry: 0 });

//   useEffect(() => {
//     if (!svgElement) return;
//     const selection = d3select(svgElement);

//     const zoom = d3zoom.zoom().on("zoom", function (e) {
//       console.log('Kutsutaan! ', e);
//       setTransform(e.transform)
//     });

//     const drag = d3drag.drag()
//       .on('drag', (event) => {
//         let rotate = projection.rotate();

//         console.log(event);
//         projection.rotate(event.x, -event.y, rotate[2])

//         setRotate({ rx: event.x, ry: -event.y });
//         // setGeographies(geoJson.features.filter(x => x.properties.LEVEL3_COD !== 'TUA' && x.properties.LEVEL3_COD !== 'KRA'));
//       });

//     selection.call(zoom);
//     selection.call(drag);
//     return () => {
//       selection.on("zoom", null);
//       selection.on("drag", null);
//     }
//   }, [svgElement, projection])

//   return <g className="regions" transform={`translate(${x}, ${y}) scale(${k}) rotate(${rx}, ${ry}, ${ry})`}>{children}</g>
// }



export function Globe({ size, geoJson }) {

  const [geographies, setGeographies] = useState(geoJson.features.filter(x => x.properties.LEVEL3_COD !== 'TUA' && x.properties.LEVEL3_COD !== 'KRA'));
  const [{ x, y, z }, setRotate] = useState({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState(1);
  const [{ tx, ty, s }, setTranslate] = useState({ tx: 0, ty: 0, s: 100 });

  const svgRef = useRef(null);
  const sens = 0.25;

  // console.log(x);
  // console.log(y);

  console.log('S on nyt: ', s);

  let projection = d3geo.geoOrthographic()
    // .clipAngle(90)
    .scale(s)
    .translate([size/2, size/2])
    .rotate([x, y, z])
    // .fitSize([size, size], geoJson);

  // console.log(projection);

  // window.requestAnimationFrame(() => {
  //   setRotate({ x: x + 0.1, y: y });
  // })

  let drag = d3drag.drag()
    .subject(() => {
      var r = projection.rotate();
      // console.log('ROO? ', r);
      return { x: r[0] / 0.25, y: -r[1] / 0.25 };
    })
    .on('drag', (event) => {
      let rotate = projection.rotate();

      // console.log(rotate);
      // console.log(event);
      // projection.rotate(event.x, -event.y, rotate[2])

      setRotate({ x: event.x * 0.25, y: -event.y * 0.25, z: rotate[2] });
      // setGeographies(geoJson.features.filter(x => x.properties.LEVEL3_COD !== 'TUA' && x.properties.LEVEL3_COD !== 'KRA'));
    });

  let zoom = d3zoom.zoom()
    .scaleExtent([100, 700])
    .on('zoom', (e) => {
      console.log(e);
      setTranslate({ tx: e.transform.x, ty: e.transform.y, s: e.transform.k })
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
        {geographies.map((d, i) =>
          <path
            key={d.properties.LEVEL3_COD}
            id={i + d.properties.LEVEL3_COD}
            d={d3geo.geoPath().projection(projection)(d)}
            className="region">
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
  // console.log('ERR: ', err);

  // let projection = d3geo.geoOrthographic()
  // .clipAngle(90)
  // .rotate([0, 0])
  // .fitSize([600, 600], json);

  ReactDOM.render(
    <Globe
      size={600}
      geoJson={json}
    >
    </Globe>,
    // <Stage size={600}>
    //   <Container projection={projection}>
    //   <path className="water" d={d3geo.geoPath().projection(projection)({ type: 'Sphere' })}></path>
    //   {json.features.filter(x => x.properties.LEVEL3_COD !== 'TUA' && x.properties.LEVEL3_COD !== 'KRA').map((d, i) =>
    //       <path
    //         key={d.properties.LEVEL3_COD}
    //         id={i + d.properties.LEVEL3_COD}
    //         d={d3geo.geoPath().projection(projection)(d)}
    //         className="region"
    //       >
    //       </path>
    //     )}
    //   </Container>
    // </Stage>,
    document.getElementById('root')
  );
});


