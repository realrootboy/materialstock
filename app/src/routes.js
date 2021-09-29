import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import materialRegister from './pages/materialRegister'


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={materialRegister}/>
            </Switch>
        </BrowserRouter>
    )
}