import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getRandomName } from './names';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Route, Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';


export const Character = () => {

    const [isCharacterVisible, setIsCharacterVisible] = useState(false);

    const [randomRace, setRandomRace] = useState('');
    const [randomClass, setRandomClass] = useState(''); 
    const [randomWeapon, setRandomWeapon] = useState('');
    const [randomArmor, setRandomArmor] = useState('');
    const [randomItems, setRandomItems] = useState('');
    const [level, setLevel] = useState('');

    const [character, setCharacter] = useState('');

    async function generateCharacter () {
        setIsCharacterVisible(false);

        var classList = await fetch('https://www.dnd5eapi.co/api/classes').then(res => res.json());
        var classinfo = classList.results[Math.floor(Math.random() * classList.count)];
        setRandomClass(await fetch('https://www.dnd5eapi.co' + classinfo.url).then(res => res.json()));
        setLevel(await fetch('https://www.dnd5eapi.co/api/classes/' + classinfo.index + '/levels/1').then(res => res.json()));

        let chosenWeapons = []
        var weaponList = await fetch('https://www.dnd5eapi.co/api/equipment-categories/weapon').then(res => res.json());
        chosenWeapons.push(await fetch('https://www.dnd5eapi.co' + weaponList.equipment[Math.floor(Math.random() * 37)].url).then(res => res.json()));
        chosenWeapons.push(await fetch('https://www.dnd5eapi.co' + weaponList.equipment[Math.floor(Math.random() * 37)].url).then(res => res.json()));
        setRandomWeapon(chosenWeapons);

        let chosenItems = []
        var itemList = await fetch('https://www.dnd5eapi.co/api/equipment-categories/adventuring-gear').then(res => res.json());
        chosenItems.push(await fetch('https://www.dnd5eapi.co' + itemList.equipment[Math.floor(Math.random() * 105)].url).then(res => res.json()));
        chosenItems.push(await fetch('https://www.dnd5eapi.co' + itemList.equipment[Math.floor(Math.random() * 105)].url).then(res => res.json()));
        chosenItems.push(await fetch('https://www.dnd5eapi.co' + itemList.equipment[Math.floor(Math.random() * 105)].url).then(res => res.json()));
        setRandomItems(chosenItems);

        var armorList = await fetch('https://www.dnd5eapi.co/api/equipment-categories/armor').then(res => res.json());
        setRandomArmor(await fetch('https://www.dnd5eapi.co' + armorList.equipment[Math.floor(Math.random() * 13)].url).then(res => res.json()));

        var raceList = await fetch('https://www.dnd5eapi.co/api/races').then(res => res.json());
        setRandomRace(await fetch('https://www.dnd5eapi.co' + raceList.results[Math.floor(Math.random() * raceList.count)].url).then(res => res.json()));

        var classList = await fetch('https://www.dnd5eapi.co/api/classes').then(res => res.json());
        var classinfo = classList.results[Math.floor(Math.random() * classList.count)];
        setRandomClass(await fetch('https://www.dnd5eapi.co' + classinfo.url).then(res => res.json()));
        setLevel(await fetch('https://www.dnd5eapi.co/api/classes/' + classinfo.index + '/levels/1').then(res => res.json()));
    }

    useEffect(() => { 
        if (randomRace.ability_bonuses) {
            let randomStats = [15, 14, 13, 12, 10, 8];
            randomStats.sort(() => Math.random() - 0.5);

            var str_number = randomStats[0] + (randomRace.ability_bonuses.filter(y => y.name == "STR").length > 0 ? randomRace.ability_bonuses.filter(y => y.name == "STR")[0].bonus : 0);
            var dex_number = randomStats[1] + (randomRace.ability_bonuses.filter(y => y.name == "DEX").length > 0 ? randomRace.ability_bonuses.filter(y => y.name == "DEX")[0].bonus : 0);
            var wis_number = randomStats[2] + (randomRace.ability_bonuses.filter(y => y.name == "WIS").length > 0 ? randomRace.ability_bonuses.filter(y => y.name == "WIS")[0].bonus : 0);
            var cha_number = randomStats[3] + (randomRace.ability_bonuses.filter(y => y.name == "CHA").length > 0 ? randomRace.ability_bonuses.filter(y => y.name == "CHA")[0].bonus : 0);
            var int_number = randomStats[4] + (randomRace.ability_bonuses.filter(y => y.name == "INT").length > 0 ? randomRace.ability_bonuses.filter(y => y.name == "INT")[0].bonus : 0);
            var con_number = randomStats[5] + (randomRace.ability_bonuses.filter(y => y.name == "CON").length > 0 ? randomRace.ability_bonuses.filter(y => y.name == "CON")[0].bonus : 0);
        }

            var proficiencyList = []
            proficiencyList = proficiencyList.concat(randomRace.starting_proficiencies);
            proficiencyList = proficiencyList.concat(randomClass.proficiencies);

        setCharacter({
            name: getRandomName(),
            race: randomRace.name,
            class: randomClass.name,
            size: randomRace.size,
            speed: randomRace.speed,
            languages: randomRace.languages,
            traits: randomRace.traits,
            features: level.features,
            health: randomClass.hit_die + Math.floor((con_number - 10) / 2),
            saving_throws: randomClass.saving_throws,
            proficiency_bonus: level.prof_bonus,
            proficiencies: proficiencyList,
            stats: {
                STR:
                {
                    number: str_number,
                    modifier: Math.floor((str_number - 10) / 2)
                },
                DEX:
                {
                    number: dex_number,
                    modifier: Math.floor((dex_number - 10) / 2)
                },
                WIS:
                {
                    number: wis_number,
                    modifier: Math.floor((wis_number - 10) / 2)
                },
                CHA:
                {
                    number: cha_number,
                    modifier: Math.floor((cha_number - 10) / 2)
                },
                INT:
                {
                    number: int_number,
                    modifier: Math.floor((int_number - 10) / 2)
                },
                CON:
                {
                    number: con_number,
                    modifier: Math.floor((con_number - 10) / 2)
                }
            },
            equipment: {
                weapons: randomWeapon,
                armor: randomArmor,
                other: randomItems
            }
        })
    }, [randomClass])

    useEffect(() => {
        setIsCharacterVisible(true)
    }, [randomItems])

    useEffect(() => {
        generateCharacter();
    }, []);

    return (
        <div>
            <Grid container
                direction="column"
            >
                <Paper elevation={10} style={{ backgroundColor: "wheat", border: "solid", borderColor: "goldenrod" }}>
                    <Grid item >
                        <Grid container
                            direction="row"
                            justify="space-around"
                            alignItems="center"
                        >
                            <Grid item  >
                                <h1>Dungeons and Dragons Assistant</h1>
                            </Grid>
                            <Grid item>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <Button>
                                        Home
                                        </Button>

                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Link to="/Encounter" style={{ textDecoration: 'none' }}>
                                    <Button>
                                        Encounter Builder
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    </Paper>
                    <Grid item style={{ backgroundColor: "whitesmoke" }} component={Paper}>
                        <br />
                    <h3 style={{ textAlign: 'center' }}>Random Character Generator</h3>
                        <p style={{ textAlign: 'center' }}>
                            This page produces a random character for you to start playing the game.<br/>
                            It is also usefule for quickly creating an NPC to interact with Don't like the 
                            character you've been given? <br />Just hit the button and get another!&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button
                                variant="contained"
                                onClick={() => generateCharacter()}
                            style={{ backgroundColor: 'wheat' }}
                            >
                                Roll a New Character
                            </Button>
                        </p>
                    </Grid>
            </Grid>
            <br />
            {isCharacterVisible && character.languages &&  
                <Grid container
                justify="center"
                alignItems="center"
            >
                <Grid container
                component={Paper}
                    style={{ border: "solid", borderColor: "darkgray", width: "90%"  }}
                >
                <Grid container
                    direction="row"
                    justify="center"
                >
                    <Grid item>
                        <br/>
                    <h1 style={{
                        backgroundImage: 'url(scroll.jpg)',
                        display: "block",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        alignSelf: 'stretch',
                        backgroundRepeat: 'noRepeat',
                        width: '500px',
                        height: '165px',
                        textAlign: 'center',
                        fontSize: "75px"
                    }}>
                        {character.name}
                        </h1>
                        <Grid container
                            direction="row"
                            justify="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item>
                        <h5>Race: {character.race}</h5>
                                <h5>Class: {character.class}</h5>
                                </Grid>
                                <Grid item>
                        <TextField
                            style={{ width: "65px" }}
                            variant="outlined"
                            label="Health"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            value={character.health}
                                    />
                                    <TextField
                                        style={{ width: "65px" }}
                                        variant="outlined"
                                        inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                        label="Armor Class"
                                        value={character.equipment.armor.armor_class.base}
                                    />
                        <TextField
                            style={{ width: "65px" }}
                            variant="outlined"
                            label="Speed"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            value={character.speed}
                        />
                            </Grid>
                            </Grid>
                            <br />
                        <TextField
                            style={{ width: "75px" }}
                            variant="outlined"
                            inputProps={{ min: 0, style: { textAlign: 'center', color: "black" } }}
                            label="Strength"
                            value={character.stats.STR.number + " (" + character.stats.STR.modifier + ")"}
                        />
                        <TextField
                            style={{ width: "75px" }}
                            variant="outlined"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            label="Dexterity"
                            value={character.stats.DEX.number + " (" + character.stats.DEX.modifier + ")"}
                        />
                        <TextField
                            style={{ width: "90px" }}
                            variant="outlined"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            label="Constitution"
                            value={character.stats.CON.number + " (" + character.stats.CON.modifier + ")"}
                        />
                        <TextField
                            style={{ width: "85px" }}
                            variant="outlined"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            label="Intelligence"
                            value={character.stats.INT.number + " (" + character.stats.INT.modifier + ")"}
                        />
                        <TextField
                            style={{ width: "75px" }}
                            variant="outlined"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            label="Wisdom"
                            value={character.stats.WIS.number + " (" + character.stats.WIS.modifier + ")"}
                        />
                        <TextField
                            style={{ width: "75px" }}
                            variant="outlined"
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            label="Charisma"
                            value={character.stats.CHA.number + " (" + character.stats.CHA.modifier + ")"}
                        />
                    </Grid>
                        <Grid item style={{ width: "40%", height: "100%" }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={character.class + ".jpg"} style={{ width: "20vw", height: "100%" }} />
                        </Grid>
                        
                    </Grid>
                    <Grid container
                        direction="row"
                        justify="center"
                        style={{ width: "100%" }}
                    >
                        <Grid item style={{ border: "solid", borderColor: "darkgray" }}>
                    <TableContainer >
                        <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><h2>Abilities</h2></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {character.traits && character.traits.map((row) => (
                                        <TableRow>
                                            <TableCell component="th">
                                                {row.name}
                                            </TableCell><TableCell></TableCell>
                                        </TableRow>
                                    ))}
                                    {character.features && character.features.map((row) => (
                                        <TableRow>
                                            <TableCell component="th">
                                                {row.name}
                                            </TableCell><TableCell></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                            </Grid>
                        <Grid item style={{ border: "solid", borderColor: "darkgray" }}>
                    <TableContainer>
                        <Table>
                                <TableHead>
                                    <TableRow>
                                    <TableCell><h2>Proficiencies</h2></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {character.proficiencies && character.proficiencies.map((row) => (
                                        <TableRow>
                                            <TableCell component="th">
                                                {row.name}
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    ))}
                                    {character.languages && character.languages.map((row) => (
                                        <TableRow>
                                            <TableCell component="th">
                                                {row.name} (Language)
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                            </Grid>
                        <Grid item style={{ width:"40vw", border: "solid", borderColor: "darkgray" }}>
                    <TableContainer >
                        <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><h2>Items</h2></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                        <TableBody>
                                            {character.equipment && character.equipment.weapons.map((row) => (
                                                <TableRow>
                                                    <TableCell component="th">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.name == "Net" ? row.special : row.damage.damage_dice}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow>
                                                <TableCell>
                                                    {character.equipment.armor.name} (Armor)
                                                 </TableCell>
                                                <TableCell>
                                                    AC {character.equipment.armor.armor_class.base}
                                                </TableCell>
                                            </TableRow>
                                {character.equipment && character.equipment.other.map((row) => (
                                            <TableRow>
                                            <TableCell component="th">
                                                {row.name}
                                            </TableCell>
                                        <TableCell>
                                                {row.desc ? row.desc : <p style={{textAlign: 'center' }}>(No Descrption)</p> }
                                            </TableCell>
                                            </TableRow>
                                        
                                    ))}
                            </TableBody>
                            </Table>
                            </TableContainer>
                    </Grid>
                    </Grid>
                </Grid>
                <br/>
                </Grid>}
        </div>
    )
}
