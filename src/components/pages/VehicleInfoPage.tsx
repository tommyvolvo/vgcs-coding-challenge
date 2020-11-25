import React from 'react';
import VehicleInfo from '../VehicleInfo';
import { useParams } from 'react-router-dom';

type VehicleInfoPageParams = {
  vehicleId: string
}

const VehicleInfoPage = () => {
  const vehicleId = useParams<VehicleInfoPageParams>();

  return (<VehicleInfo vehicleId={vehicleId.vehicleId} />);
}

export default VehicleInfoPage;
