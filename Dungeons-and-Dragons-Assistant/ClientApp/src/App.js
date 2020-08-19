import React from 'react';
import { Home } from './components/Home';
import { Character } from './components/Character';
import { Encounter } from './components/Encounter';

import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export const App = () => {

    return (
        <div>
            <div>
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
            </div>
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
        </div>
    )
}
