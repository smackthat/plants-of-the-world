import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as d3geo from 'd3-geo';
import * as d3fetch from 'd3-fetch';

//#region Main thang

class Globe extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      geographies: this.props.geoJson.features
    };
  }

  render() {

    let projection = d3geo.geoOrthographic()
      .rotate([0, 0])
      .clipAngle(90)
      .fitSize([this.props.size, this.props.size], this.props.geoJson);

    console.log(projection);

    // let geoGenerator = d3geo.geoPath()
    //   .projection(projection);

    // let pathString = geoGenerator(this.props.geoJson);

    return <svg width={this.props.size} height={this.props.size}>
      {/* <path d={pathString}></path>
      <path className="water" d={pathString}></path> */}
      <g className="regions">
        {this.state.geographies.map((d, i) =>
          <path
            key={d.properties.LEVEL3_COD}
            id={d.properties.LEVEL3_COD}
            d={d3geo.geoPath().projection(projection)(d)}
            className="region"
          >
          </path>
        )}
      </g>
    </svg>
  }
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

  ReactDOM.render(
    <Globe
      size={600}
      geoJson={json}
    >
    </Globe>,
    document.getElementById('root')
  );
});


