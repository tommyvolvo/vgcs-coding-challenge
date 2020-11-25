import React from 'react';
import ServiceList from '../ServiceList';
import { useParams } from 'react-router-dom';

type ServiceListPageParams = {
  vehicleId: string
}

const ServiceListPage = () => {
  const vehicleId = useParams<ServiceListPageParams>();

  return (<ServiceList vehicleId={vehicleId.vehicleId} />);
}

export default ServiceListPage;
