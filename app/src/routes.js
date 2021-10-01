import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import MainApp from './pages/MainApp'


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" component={MainApp}/>
            </Switch>
        </BrowserRouter>
    )
}