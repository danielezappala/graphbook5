import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageNotFound } from '../errors/pageNotFound';
import HomePage from '../pages/homePage'
import SeasonsPage from '../pages/seasonsPage';
import SeasonAdd from '../season/seasonAdd'

export const Routes = () => (
    <Switch>
        <Route path="/homepage" component={HomePage} exact={true}/>
        <Route path="/seasons" component={SeasonsPage} exact={true}/>
        <Route path="/addSeason" component={SeasonAdd} exact={true}/>   
        <Route path="/" component={HomePage} exact={true}/>      
        <Route path="/*" component={PageNotFound}/>
    </Switch>
);
