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
                <div style={{
                    backgroundColor: "grey",
                    position: "relative",
                    bottom: "0",
                    left: "0",
                    width: "100%"
                }}>
                </div>
            </Route>
            <Route path="/">
                    <Home />
            </Route>
            </Switch>
    )
}
