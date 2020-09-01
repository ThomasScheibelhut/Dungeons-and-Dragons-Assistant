import React from 'react';
import { Home } from './components/Home';
import { Character } from './components/Character';
import { Encounter } from './components/Encounter';
import { Switch, Route} from "react-router-dom";


export const App = () => {

    return (
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
    )
}
