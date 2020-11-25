import React, { useEffect, useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Grid from '@material-ui/core/Grid';
import { vehicleService, getVehicleServices } from '../lib/api/vehicle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow';

type ServiceListProps = {
  loadData: boolean,
  vehicleId: string
}

type tabState = {
  state: {
    tabNumber: number
  }
}

const ServiceList = ({ vehicleId, loadData }: ServiceListProps) => {
  const [services, setServices] = useState<vehicleService>();
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilters, setStatusFilters] = React.useState(() => ['ACTIVE']);
  const filteredServices = services && services.services && services.services
    .filter(({ status }) => statusFilters.includes(status));
  const serviceFields = filteredServices && filteredServices
    .reduce(
      (acc, service) => {
        return [
          ...acc,
          ...Object.keys(service).filter((key) => !acc.includes(key))
        ];
      },
      []
    )
  const statuses = services && services.services && services.services.reduce(
    (acc, { status }) => {
      return acc.includes(status) ? acc : [...acc, status];
    },
    []
  )
  

  useEffect(
    () => {
      if (loadData) {
        const loadServices = async () => {
          try {
            const services = await getVehicleServices(vehicleId);
            setServices(services);
            setIsLoading(false);
          } catch (e) {
            // TODO centralise error handling
            setIsLoading(false);
          }
        }

        loadServices();
      }
    },
    [loadData, vehicleId]
  );

  const handleChangeStatusFilter = (event, statusFilters: string[]) => {
    setStatusFilters(statusFilters);
  };
  
  return (
    <>
      {
        isLoading
          ? <CircularProgress style={{ marginLeft: '50%' }} />
          : <>
              <Grid container  direction="column" alignItems="center">
                <Grid item>
                  <ToggleButtonGroup value={statusFilters} size='small' onChange={handleChangeStatusFilter}>
                    {
                      statuses && statuses.map((status) => {
                        return (
                          <ToggleButton value={status}>
                            {status}
                          </ToggleButton>
                        )
                      })
                    }
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
              <Table>
              <TableHead>
                <TableRow>
                {
                  serviceFields && serviceFields.map((field) => (
                    <TableCell key={field}>
                      {field}
                    </TableCell>
                  ))
                }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  filteredServices && filteredServices
                    .map((service) => {
                      return (
                        <TableRow>
                          {
                            serviceFields.map((field) => (
                              <TableCell key={field}>
                                {service[field]}
                              </TableCell>
                            ))
                          }
                        </TableRow>
                      )
                    })
                }
              </TableBody>
            </Table>
          </>
      }
    </>
  )
}

export default ServiceList
