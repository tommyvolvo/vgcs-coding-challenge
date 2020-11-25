import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ServiceListPage, VehicleListPage, VehicleInfoPage } from './components/pages'

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <VehicleListPage />
      </Route>
      <Route exact path="/vehicle/:vehicleId">
        <VehicleInfoPage />
      </Route>
      <Route exact path="/vehicle/services/:vehicleId">
        <ServiceListPage />
      </Route>
    </Switch>
  </Router>
)

export default Routes
