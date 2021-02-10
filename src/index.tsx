import ReactDOM from 'react-dom';
import './index.css';
import Globe from './hooks/globe';
import level4 from './assets/level4.js'

// d3fetch.json('./assets/level3.json').then((json) => {

  // console.log(json);
  console.log(level4);
  // BUG with the geoJson: have to take out Tuamotu and Krasnoyarks since their coordinates are faulty and cause them to leak all over the globe... 
  level4.features = level4.features.filter(x => x.properties.Level4_cod !== 'KRA-OO' && x.properties.Level4_cod !== 'TUA-OO');

  ReactDOM.render(
    <Globe
      size={800}
      geoJson={level4}
    ></Globe>,
    document.getElementById('root')
  );
// });


