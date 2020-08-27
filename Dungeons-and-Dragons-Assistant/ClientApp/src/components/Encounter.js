import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDataApi } from './useDataAPI';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const Encounter = () => {

    const [{ data, isLoading, isError }, doFetch] = useDataApi('', []);

    const [difficulty, setDifficulty] = useState(1);
    const [monsterNumb, setMonsterNumb] = useState('');
    const [playerNumb, setPlayerNumb] = useState('');
    const [characterLvl, setCharacterLvl] = useState('');
    const [xp, setXp] = useState([
        [25, 50, 75, 100],
        [50, 100, 150, 200],
        [75, 150, 225, 400],
        [125, 250, 375, 500],
        [250, 500, 750, 1100],
        [300, 600, 900, 1400],
        [350, 750, 1100, 1700],
        [450, 900, 1400, 2100],
        [550, 1100, 1600, 2400],
        [600, 1200, 1900, 2800],
        [800, 1600, 2400, 3600],
        [1000, 2000, 3000, 4500],
        [1100, 2200, 3400, 5100],
        [1250, 2500, 3800, 5700],
        [1400, 2800, 4300, 6400],
        [1600, 3200, 4800, 7200],
        [2000, 3900, 5900, 8800],
        [2100, 4200, 6300, 9500],
        [2400, 4900, 7300, 10900],
        [2800, 5700, 8500, 12700]
    ]);
    const [xpGroup, setXpGroup] = useState([
        10, 25, 50, 100, 200, 450, 700, 1100, 1800, 2300,
        2900, 3900, 5000, 5900, 7200, 8400, 10000, 11500, 13000, 15000, 18000, 20000, 22000,
        25000, 33000, 41000, 50000, 62000, 75000, 90000, 105000, 120000, 135000, 155000
    ]);
    const [challengeRating, setChallengeRating] = useState([
        0, .125, .25, .5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26,27, 28 , 29, 30
    ]);

    const generateEncounter = () => {
        var monsterMultiplier = 1.0;

        switch (monsterNumb) {
            case '1':
                monsterMultiplier = 1.0;
                break;
            case '2':
                monsterMultiplier = 1.5;
                break;
            case '3':
            case '4':
            case '5':
            case '6':
                monsterMultiplier = 2;
                break;
            case '7':
            case '8':
            case '9':
            case '10':
                monsterMultiplier = 2.5;
                break;
            case '11':
            case '12':
            case '13':
            case '14':
                monsterMultiplier = 3;
                break;
            default:
                monsterMultiplier = 4;
        }

        var encounterXp = (xp[characterLvl-1][difficulty] * playerNumb) / (monsterNumb * monsterMultiplier);
        console.log('(' + xp[characterLvl - 1][difficulty] + '*' + playerNumb + ') / (' + monsterNumb + '*' + monsterMultiplier + ')');
        var monsterCR = challengeRating[xpGroup.indexOf(xpGroup.reduce(function (prev, curr) {
            return (Math.abs(curr - encounterXp) < Math.abs(prev - encounterXp) ? curr : prev);
        }))]; 
         
        fetch('https://www.dnd5eapi.co/api/monsters/?challenge_rating=' + monsterCR).then(res => res.json())
        .then(response => {
            var monsterList = response.results;

            for (var i = 0; i < monsterNumb; i++) {
                var url = monsterList[Math.floor(Math.random() * monsterList.length)].url;

                doFetch('https://www.dnd5eapi.co' + url);
                while (isLoading);
            }
        })
        .catch(err => {
        })
    }

    return (
        <div>
            <h1>Encounter Builder</h1>
            <Select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
            >
                <MenuItem value={0}>Easy</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>Difficult</MenuItem>
                <MenuItem value={3}>Deadly</MenuItem>
            </Select>
            <TextField
                id="Number of Monsters"
                label="Number of Monsters"
                type="number"
                value={monsterNumb}
                onChange={e => (e.target.value > 0 || e.target.value == "") && setMonsterNumb(e.target.value) }
            />
            <TextField
                id="Number of Characters"
                label="Number of Characters"
                type="number"
                value={playerNumb}
                onChange={e => (e.target.value > 0 || e.target.value == "") && setPlayerNumb(e.target.value)}
                isNumericString
            />
            <TextField
                id="Level of Characters"
                label="Level of Characters"
                type="number"
                value={characterLvl}
                onChange={e => (e.target.value > 0 || e.target.value == "") && setCharacterLvl(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={() => generateEncounter()}
            >
                Generate Encounter
            </Button>
        </div>
    )
}
