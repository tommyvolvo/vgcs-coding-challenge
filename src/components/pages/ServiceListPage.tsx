import React from 'react';
import ServiceList from '../ServiceList';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography'

type ServiceListPageParams = {
  vehicleId: string
}

const ServiceListPage = () => {
  const vehicleId = useParams<ServiceListPageParams>();

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to='/' component={RouterLink}>Vehicle List</Link>
        <Link to={`/vehicle/${vehicleId.vehicleId}`} component={RouterLink}>
          Vehicle Info
        </Link>
        <Typography color="textPrimary">Services</Typography>
      </Breadcrumbs>
      <ServiceList vehicleId={vehicleId.vehicleId} />
    </>
  );
}

export default ServiceListPage;
