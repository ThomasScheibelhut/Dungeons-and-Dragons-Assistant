import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDataAPI } from './components/useDataAPI';


export const Character = () => {

    const [{ data, isLoading, isError}]

    return (
        <div>
            <h1>What CR level would you like this encounter to have?</h1>
            <TextField id="CR Level" label="CR Level" />
            <Button variant="contained">Generate Encounter</Button>
        </div>
    )
}
