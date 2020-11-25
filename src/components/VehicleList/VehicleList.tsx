import React, { useEffect, useState } from 'react';
import { getVehicleList, vehicleListItem } from '../../lib/api/vehicle';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import VehicleInfo from '../VehicleInfo';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

type vehicleRouteParams = {
  vehicleId: string
}

const VehiclesList = () => {
  const location = useRouteMatch('/details/:vehicleId');
  const params = location && location.params as vehicleRouteParams;
  const [vehicles, setVehicles] = useState<vehicleListItem[]>([])

  useEffect(
    () => {
      const loadVehicles = async () => {
        setVehicles(await getVehicleList())
      }

      loadVehicles()
    },
    []
  )

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={6}>
        {
          vehicles.map((vehicle) => {
            const isOpen: boolean = params && (params.vehicleId === vehicle.id)

            return (
              <Accordion key={vehicle.id} expanded={isOpen}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    <Link
                      to={`/details/${vehicle.id}`}
                      component={RouterLink}
                      color="inherit"
                    >
                      {vehicle.name || vehicle.id}
                    </Link>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <VehicleInfo vehicleId={vehicle.id} loadData={isOpen} />
                </AccordionDetails>
              </Accordion>
            )
          })
        }
      </Grid>
    </Grid>
  )
}

export default VehiclesList
