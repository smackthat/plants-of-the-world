import ReactDOM from 'react-dom';
import './index.scss';
import Globe from './components/globe';
import regions from './assets/regions';
import { Grid } from '@material-ui/core';
import Information from './components/information';
import MainContextProvider from './context/maincontext';

console.log(regions);
// BUG with the geoJson: have to take out Tuamotu and Krasnoyarks since their coordinates are faulty and cause them to leak all over the globe... 
regions.features = regions.features.filter(x => x.properties.Level4_cod !== 'KRA-OO' && x.properties.Level4_cod !== 'TUA-OO');

ReactDOM.render(
  <MainContextProvider>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Globe
          size={800}
          geoJson={regions}
        ></Globe>
      </Grid>
      <Grid item xs={4}>
        <Information></Information>
      </Grid>
      <Grid item xs={12}>
        <div className="footer">
          <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
      </Grid>
    </Grid>
  </MainContextProvider>,
  document.getElementById('root')
);

