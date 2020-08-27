import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDataApi } from './useDataAPI';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


export const Character = () => {

    const [{ data, isLoading, isError }, doFetch] = useDataApi('', []);

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

        var raceList = await fetch('https://www.dnd5eapi.co/api/races').then(res => res.json());
        setRandomRace(await fetch('https://www.dnd5eapi.co' + raceList.results[Math.floor(Math.random() * raceList.count)].url).then(res => res.json()));

        var classList = await fetch('https://www.dnd5eapi.co/api/classes').then(res => res.json());
        var classinfo = classList.results[Math.floor(Math.random() * classList.count)];
        setRandomClass(await fetch('https://www.dnd5eapi.co' + classinfo.url).then(res => res.json()));
        setLevel(await fetch('https://www.dnd5eapi.co/api/classes/' + classinfo.index + '/levels/1').then(res => res.json()));

        var weaponList = await fetch('https://www.dnd5eapi.co/api/equipment-categories/weapon').then(res => res.json());
        setRandomWeapon(await fetch('https://www.dnd5eapi.co' + weaponList.equipment[Math.floor(Math.random() * 37)].url).then(res => res.json()),
        await fetch('https://www.dnd5eapi.co' + weaponList.equipment[Math.floor(Math.random() * 37)].url).then(res => res.json()));

        var armorList = await fetch('https://www.dnd5eapi.co/api/equipment-categories/armor').then(res => res.json());
        setRandomArmor(await fetch('https://www.dnd5eapi.co' + armorList.equipment[Math.floor(Math.random() * 13)].url).then(res => res.json()));

        var itemList = await fetch('https://www.dnd5eapi.co/api/equipment-categories/adventuring-gear').then(res => res.json());
        setRandomItems(await fetch('https://www.dnd5eapi.co' + itemList.equipment[Math.floor(Math.random() * 105)].url).then(res => res.json()),
        await fetch('https://www.dnd5eapi.co' + itemList.equipment[Math.floor(Math.random() * 105)].url).then(res => res.json()),
        await fetch('https://www.dnd5eapi.co' + itemList.equipment[Math.floor(Math.random() * 105)].url).then(res => res.json()));
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

        if (randomRace.starting_proficiencies && randomClass.proficiencie) {
            var proficiencyList = [
                randomRace.starting_proficiencies.map(x => x.name),
                randomClass.proficiencies.map(x => x.name),
            ]
        }


        setCharacter({
            Race: randomRace.name,
            Class: randomClass.name,
            size: randomRace.size,
            speed: randomRace.speed,
            languages: randomRace.languages,
            traits: randomRace.traits,
            features: level.features,
            hit_die: randomClass.hit_die,
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
                Armor: randomArmor,
                Other: randomItems
            }
        })
    }, [randomClass])

    useEffect(() => {
        setIsCharacterVisible(true)
    }, [character])

    return (
        <div>
            <h1>Character Builder</h1>
            <Button
                variant="contained"
                onClick={() => generateCharacter()}
            >
                Generate Character
            </Button>

            {isCharacterVisible && character.languages && <List>
                <ListItem>
                    <ListItemText secondary="Speed" primary={character.speed} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText secondary="Size" primary={character.size} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText secondary="Languages" primary={character.languages.map(txt => txt.name + "\n" )} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText secondary="health" primary={character.hit_die} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText secondary="Saving Throws" primary={character.saving_throws.map(txt => txt.name + "\n")} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText secondary="Strength" primary={character.stats.STR.modifier} />
                </ListItem>
                <Divider />
            </List>}
        </div>
    )
}
