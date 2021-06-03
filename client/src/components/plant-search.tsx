import TextField from '@material-ui/core/TextField';
import { useContext } from 'react';
import { IMainContext, MainContext } from '../context/maincontext';
import debounce from 'lodash.debounce';

export default function PlantSearch() {

    const a: IMainContext = useContext(MainContext);

    const onChange = (e) => {
        a.onPlantsSearch(e.target.value);
    };

    return (

        <TextField
            fullWidth={true}
            size="medium"
            variant="outlined"
            autoFocus={true}
            onChange={debounce((e) => onChange(e), 500)}
        >
        </TextField>
    );

}