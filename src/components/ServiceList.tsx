import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Grid from '@material-ui/core/Grid';
import { getVehicleServices } from '../lib/api/vehicle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow';
import useApi from '../lib/api/useApi';
import ApiError from './ApiError';
import Typography from '@material-ui/core/Typography';

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
  const [services, error, isLoading] = useApi(
    async () => {
      const services = await getVehicleServices(vehicleId);
      if (services.services) {
        setStatusFilters(getUniqueServices(services.services));
      }
      return services
    }
  )
  
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

  const handleChangeStatusFilter = (event: React.MouseEvent, statusFilters: string[]) => {
    if (statusFilters.includes('all')) {
      statusFilters = getUniqueServices(services.services)
    }
    setStatusFilters(statusFilters);
  };
  
  return (
    <>
      { error && <ApiError open={error !== null} message={error.message} />}
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
                    <ToggleButton value='all'>All</ToggleButton>
                    {
                      statuses && statuses.map((status: string) => {
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
                  // generate table based on data returned from API
                  // this could be logged up from translation tables to generate a more human readable name
                  // eg. maybe something like i18n(`service.titles.${field}`)
                  serviceFields && serviceFields.map((field: string) => (
                    <TableCell key={field}>
                      {field}
                    </TableCell>
                  ))
                }
                {
                    !serviceFields && <TableCell>
                      <Typography align='center'>No services returned</Typography>
                    </TableCell>
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
