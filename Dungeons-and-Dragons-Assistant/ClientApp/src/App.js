import React, { Component } from 'react';
import { Home } from './components/Home';
import { Character } from './components/Character';
import { Encounter } from './components/Encounter';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export const App = () => {

    return (
        <div>
            <ButtonGroup size="large" variant="text" color="primary" aria-label="text primary button group">
                <Link to="/">
                    <Button>
                        Home
                    </Button>
                </Link>
                <Link to="/Character">
                    <Button>
                        Character
                    </Button>
                </Link>
                <Link to="/Encounter">
                    <Button>
                        Encounter
                    </Button>
                </Link>
                <Switch>
                    <Route path="/Character">
                        <Character />
                    </Route>
                    <Route path="/Encounter">
                        <Encounter />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </ButtonGroup>
        </div>
    )
}
