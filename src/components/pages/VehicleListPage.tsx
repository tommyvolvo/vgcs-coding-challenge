import React from 'react'
import VehicleList from '../VehicleList'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography'

const VehicleListPage = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary">Vehicle List</Typography>
      </Breadcrumbs>
      <VehicleList />
    </>
  )
}

export default VehicleListPage
