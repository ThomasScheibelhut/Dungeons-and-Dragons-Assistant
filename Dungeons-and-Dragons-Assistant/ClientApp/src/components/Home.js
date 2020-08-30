import React from 'react';
import { Character } from './Character';
import { Encounter } from './Encounter';
import Grid from '@material-ui/core/Grid';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

export const Home = () => {

    return (
        <div>
            <Grid container
                direction="column"
            >
                <Paper elevation={10} style={{ backgroundColor: "wheat", border: "solid", borderColor: "goldenrod" }}>
                <Grid item >
                    <h1 style={{ textAlign: 'center' }}>Dungeons and Dragons Assistant</h1>
                </Grid>
                </Paper>
                <Grid item style={{ backgroundColor: "whitesmoke" }} component={Paper}>
                    <br />
                        <p style={{textAlign: 'center' }}>
                            Need help keeping up with all the moving parts in a dungeons and dragons game?
                            Well you're in the right place!<br/> Whether player or GM this site will help
                            streamline a few common tasks like creating players on the fly or setting up
                            encounters to fight in. 
                        </p>
                        <h3 style={{ textAlign: 'center' }}>Pick a door and see for yourself!</h3>
                </Grid>
            </Grid>
            <br/>
            <Grid container
                direction="row"
                justify="space-around"
                alignItems="stretch"
            >
                <Link to="/Character" style={{ textDecoration: 'none' }}>
                <Paper elevation={24}>
                <Grid item style={{ width: '300px', border: "solid", borderColor: "darkgray"}}>
                    <Button type="button" style={{
                        backgroundImage: 'url(map.png)',
                        display: "block",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            alignSelf: 'stretch',
                            backgroundRepeat: 'noRepeat',
                            width: '100%',
                            height: '450px',
                        }} >
                                <h4> Generate <br /> a random <br /> character</h4>
                    </Button>
                    </Grid>
                    </Paper>
                </Link>
                <Link to="/Encounter" style={{ textDecoration: 'none' }}>
                <Paper elevation={24}>
                <Grid item style={{ width: '300px', border: "solid", borderColor: "darkgray" }}>
                <Button type="button" style={{
                    backgroundImage: 'url(map.png)',
                    display: "block",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'noRepeat',
                        alignSelf: 'stretch',
                        width: '100%',
                        height: '450px',
                    }} >
                                <h4> Create <br /> an <br /> Encounter</h4>
                    </Button>
                    </Grid>
                    </Paper>
                </Link>
            </Grid>
        </div>
    )
}
