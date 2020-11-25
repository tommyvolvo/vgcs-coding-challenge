import React from 'react';
import { getVehicleList } from '../lib/api/vehicle';
import useApi from '../lib/api/useApi';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ApiError from './ApiError';
import CircularProgress from '@material-ui/core/CircularProgress';

type vehicleRouteParams = {
  vehicleId: string
}

const VehiclesList = () => {
  const [vehicles, error, isLoading] = useApi(getVehicleList)

  return (
    <>
      { error && <ApiError open={error !== null} message={error.message} /> }
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
          isLoading
            ? <TableRow>
              <TableCell colSpan={3}>
                <CircularProgress style={{ marginLeft: '50%' }} />
              </TableCell>
            </TableRow>
            : vehicles && vehicles.map((vehicle) => {
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
