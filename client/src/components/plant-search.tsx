import { useContext } from 'react';
import { IMainContext, MainContext } from '../context/maincontext';
import debounce from 'lodash.debounce';
import TextField from '@mui/material/TextField';
import { DrawerViewContext } from './main';

export default function PlantSearch() {

    const a: IMainContext = useContext(MainContext);
    const { toggleDrawer } = useContext(DrawerViewContext);

    const onChange = (e) => {
        a.onPlantsSearch(e.target.value);
    };

    return (

        <TextField
            fullWidth={true}
            size="medium"
            variant="outlined"
            autoFocus={true}
            onFocus={() => toggleDrawer(true)}
            onChange={debounce((e) => onChange(e), 500)}
        >
        </TextField>
    );

}