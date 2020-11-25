import React, { useEffect, useState } from 'react';
import { getVehicleList, vehicleListItemType } from '../lib/api/vehicle';
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

type vehicleRouteParams = {
  vehicleId: string
}

const VehiclesList = () => {
  const [vehicles, setVehicles] = useState<vehicleListItemType[]>([])

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
    <>
      <Typography>Vehicle list</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            vehicles.map((vehicle) => {
              return (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.name}</TableCell>
                  <TableCell>{vehicle.id}</TableCell>
                  <TableCell>
                    <Link to={`/vehicle/${vehicle.id}`}>
                      <Button color='primary' variant='contained'>
                        View details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </>
  )
}

export default VehiclesList
