import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDataApi } from './useDataAPI';


export const Character = () => {

    const [{ data, isLoading, isError }, doFetch] = useDataApi('', []);
    const [baseStats, setBaseStats] = useState(0);
    const [race, setRace] = useState(0);
    const [playerClass, setPlayerClass] = useState(0);

    const generateCharacter = () => {
        fetch('https://www.dnd5eapi.co/api/races').then(res => res.json())
            .then(response => {
                var raceList = response;

                var url = raceList.results[Math.floor(Math.random() * raceList.count)].url;

                setRace(doFetch('https://www.dnd5eapi.co' + url));
            })
            .catch(err => {
            })

        fetch('https://www.dnd5eapi.co/api/classes').then(res => res.json())
            .then(response => {
                var classList = response;

                var url = classList.results[Math.floor(Math.random() * classList.count)].url;

                var setPlayerClass = doFetch('https://www.dnd5eapi.co' + url);
            })
            .catch(err => {
            })
    }

    return (
        <div>
            <h1>Character Builder</h1>
            <TextField
                id="Difficulty"
                label="Difficulty"
                value={race}
                onChange={e => setRace(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={() => generateCharacter()}
            >
                Generate Encounter
            </Button>
        </div>
    )
}
