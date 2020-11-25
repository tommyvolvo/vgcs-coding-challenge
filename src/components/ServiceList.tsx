import React, { useEffect, useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Grid from '@material-ui/core/Grid';
import { vehicleServiceType, getVehicleServices } from '../lib/api/vehicle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'

type ServiceListProps = {
  vehicleId: string
}

type tabState = {
  state: {
    tabNumber: number
  }
}

const getUniqueServices = (services) => {
  // generate a list of unique service filters
  return services.reduce(
    (acc, { status }) => {
      return acc.includes(status) ? acc : [...acc, status];
    },
    []
  )
}

const ServiceList = ({ vehicleId }: ServiceListProps) => {
  const [services, setServices] = useState<vehicleServiceType>();
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilters, setStatusFilters] = React.useState(() => []);
  const filteredServices = services && services.services && services.services
    .filter(({ status }) => statusFilters.includes(status));
  // generate a list of services based on data structure to layout table
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

  const statuses = services && services.services && getUniqueServices(services.services)

  useEffect(
    () => {
      const loadServices = async () => {
        try {
          const services = await getVehicleServices(vehicleId);
          setServices(services);
          setStatusFilters(getUniqueServices(services.services))
          setIsLoading(false);
        } catch (e) {
          // TODO centralise error handling
          setIsLoading(false);
        }
      }

      loadServices();
    },
    [vehicleId]
  );

  const handleChangeStatusFilter = (event, statusFilters: string[]) => {
    if (statusFilters.includes('all')) {
      statusFilters = getUniqueServices(services.services)
    }
    setStatusFilters(statusFilters);
  };
  
  return (
    <>
      {
        isLoading
          ? <CircularProgress style={{ marginLeft: '50%' }} />
          : <>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <ToggleButtonGroup
                    value={statusFilters}
                    size='small'
                    onChange={handleChangeStatusFilter}
                    exclusive
                  >
                    <ToggleButton value='all'>
                      All
                    </ToggleButton>
                    {
                      statuses && statuses.map((status) => {
                        return (
                          <ToggleButton value={status} key={status}>
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
                        <TableRow key={service.serviceName}>
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
