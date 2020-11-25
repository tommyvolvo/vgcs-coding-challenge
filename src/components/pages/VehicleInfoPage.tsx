import React from 'react';
import VehicleInfo from '../VehicleInfo';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography'

type VehicleInfoPageParams = {
  vehicleId: string
}

const VehicleInfoPage = () => {
  const vehicleId = useParams<VehicleInfoPageParams>();

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to='/' component={RouterLink}>Vehicle List</Link>
        <Typography color="textPrimary">Vehicle Info</Typography>
      </Breadcrumbs>
      <VehicleInfo vehicleId={vehicleId.vehicleId} />
    </>
  );
}

export default VehicleInfoPage;
