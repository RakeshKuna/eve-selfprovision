import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from 'containers/Login';
import Dashboard from 'containers/Dashboard';
import PrivateRoute from 'components/PrivateRoute';
import { BusinessUnit } from 'BusinessUnit';
import { AddProducts } from 'Products';
import { AddCampaigns } from 'Campaigns';

const routes = (
  <Switch>
    <Route path="/login" component={Login} />
    <PrivateRoute exact path="/home" component={Dashboard} />
    <PrivateRoute exact path="/" component={Dashboard} />
    <PrivateRoute exact path="/addBU" component={BusinessUnit} />
    <PrivateRoute exact path="/editBu/:id" component={BusinessUnit} />
    <PrivateRoute exact path="/businessUnit/:id/addProduct" component={AddProducts} />
    <PrivateRoute exact path="/:id/updateProduct/:productName" component={AddProducts} />
    <PrivateRoute exact path="/:id/addCampaign" component={AddCampaigns} />
    <PrivateRoute exact path="/:id/updateCampaign/:campaignName" component={AddCampaigns} />
  </Switch>
);

export default routes;
