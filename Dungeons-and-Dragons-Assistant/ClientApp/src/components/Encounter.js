import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDataApi } from './useDataAPI';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Route, Link } from "react-router-dom";

export const Encounter = () => {
    const [{ data, isLoading, isError }, doFetch] = useDataApi('', []);

    const [monster, setMonster] = useState([]);
    const [difficulty, setDifficulty] = useState(1);
    const [monsterNumb, setMonsterNumb] = useState(1);
    const [playerNumb, setPlayerNumb] = useState(1);
    const [characterLvl, setCharacterLvl] = useState(1);
    const [isAbilityVisible, setIsAbilityVisible] = useState(1000000);

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

    async function generateEncounter() {
        setMonster([]);
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

        var monsterList = await fetch('https://www.dnd5eapi.co/api/monsters/?challenge_rating=' + monsterCR).then(res => res.json());

        let chosenMonsters = []
        for (var i = 0; i < monsterNumb; i++) {
            var url = monsterList.results[Math.floor(Math.random() * monsterList.results.length)].url;

            chosenMonsters.push(await fetch('https://www.dnd5eapi.co' + url).then(res => res.json()));
        }
        setMonster(chosenMonsters);
    }

    return (
        <React.Fragment>
                <Paper elevation={3}>
                    <Grid container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                        style={{ backgroundColor: "wheat", border: "solid", borderColor: "goldenrod"}}
                    >
                        <Grid item >
                        <h1>Dungeons and Dragons Assistant</h1>
                        </Grid>
                        <Grid item>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Button>
                                    Home
                                </Button>
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/Character" style={{ textDecoration: 'none' }}>
                            <Button>
                                Random Character
                            </Button>
                        </Link>
                        </Grid>
                    </Grid>
                </Paper>
                <br />
                <Grid container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >
                <Grid item>
                <TableContainer component={Paper}  style={{ border:"solid", borderColor:"darkgray" }}>
                    <Table>
                        <TableBody >
                            <TableRow>
                                <TableCell component="th">
                                    How many characters?
                                </TableCell>
                                <TableCell align="left">
                                    <TextField
                                        style={{ width: "30%" }}
                                        id="Number of Characters"
                                        type="number"
                                        value={playerNumb}
                                        onChange={e => (e.target.value > 0 || e.target.value == "") && setPlayerNumb(e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th">
                                    Level of Characters?
                                </TableCell>
                                <TableCell align="left">
                                    <TextField
                                        style={{ width: "30%" }} 
                                        id="Level of Characters"
                                        type="number"
                                        value={characterLvl}
                                        onChange={e => ((e.target.value <= 20 && e.target.value > 0) || e.target.value == "") && setCharacterLvl(e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th">
                                    How many Monsters?
                                </TableCell>
                                <TableCell align="left">
                                    <TextField
                                        style={{ width: "30%" }}
                                        id="Number of Monsters"
                                        type="number"
                                        value={monsterNumb}
                                        onChange={e => (e.target.value > 0 || e.target.value == "") && setMonsterNumb(e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" style={{ borderBottom: "none" }}>
                                    Difficulty
                                </TableCell>
                                <TableCell align="left" style={{ borderBottom: "none" }}>
                                    <Select
                                        value={difficulty}
                                        onChange={e => setDifficulty(e.target.value)}
                                    >
                                        <MenuItem value={0}>Easy</MenuItem>
                                        <MenuItem value={1}>Medium</MenuItem>
                                        <MenuItem value={2}>Difficult</MenuItem>
                                        <MenuItem value={3}>Deadly</MenuItem>
                                    </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">
                                    <Button
                                        variant="contained"
                                        onClick={() => generateEncounter()}
                                    >
                                        Generate Encounter
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                        </TableContainer>
                </Grid>
                <br/>
                <Grid item>
                {monster.length > 0 && monster.map((m, index) => (
                    <Paper elevation={6} style={{ border: "solid", borderColor: "darkgray" }}>
                        <br />
                        <h3>&nbsp;&nbsp; {m.name}</h3>
                        <br/>
                        <TextField
                            style={{ width: "65px" }}
                            variant="outlined"
                            label="Health"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            value={m.hit_points}
                        />
                        <TextField
                            style={{ width: "65px"}}
                            variant="outlined"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            label="Armor Class"
                            value={m.armor_class}
                        />
                        <TextField
                            style={{ width: "75px" }}
                            variant="outlined"
                            inputProps={{ min: 0, style: { textAlign: 'center', color: "black" } }}
                            label="Strength"
                            value={m.strength + " (" + Math.floor((m.strength - 10) / 2) + ")"}
                        />
                        <TextField
                            style={{ width: "75px" }}
                            variant="outlined"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            label="Dexterity"
                            value={m.dexterity + " (" + Math.floor((m.dexterity - 10) / 2) + ")"}
                        />
                        <TextField
                            style={{ width: "90px" }}
                            variant="outlined"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            label="Constitution"
                            value={m.constitution + " (" + Math.floor((m.constitution - 10) / 2) + ")"}
                        />
                        <TextField
                            style={{ width: "85px" }}
                            variant="outlined"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            label="Intelligence"
                            value={m.intelligence + " (" + Math.floor((m.intelligence - 10) / 2) + ")"}
                        />
                        <TextField
                            style={{ width: "75px" }}
                            variant="outlined"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            label="Wisdom"
                            value={m.wisdom + " (" + Math.floor((m.wisdom - 10) / 2) + ")"}
                        />
                        <TextField
                            style={{ width: "75px" }}
                            variant="outlined"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            label="Charisma"
                            value={m.charisma + " (" + Math.floor((m.charisma - 10) / 2) + ")"}
                        />
                        {isAbilityVisible != index && <Button
                            variant="contained"
                            onClick={() => setIsAbilityVisible(index)}
                            style={{ color: "green" }}
                        >
                            Show Abilities
                        </Button>}
                        {isAbilityVisible == index &&
                            <React.Fragment>
                            <Button
                                variant="contained"
                                onClick={() => setIsAbilityVisible(100000)}
                                style={{ color: "red" }}
                            >
                                Hide Abilities
                        </Button> 
                            <TableContainer style={{ width: "50vw" }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><h5>Abilities</h5></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {m.actions && m.actions.map((row) => (
                                            <TableRow>
                                                <TableCell component="th">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left">{row.desc}</TableCell>
                                            </TableRow>
                                        ))}
                                        {m.special_abilities && m.special_abilities.map((row) => (
                                            <TableRow>
                                                <TableCell component="th">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left" >{row.desc}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            </React.Fragment>
                        }
                    </Paper>
                ))}
                <Grid item>
                    <br/>
                </Grid>
            </Grid>
        </Grid>
        </React.Fragment >
    )
}
