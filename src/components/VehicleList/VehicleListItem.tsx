import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { vehicleListItem } from '../../lib/api/vehicle'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link, useRouteMatch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import VehicleInfo from '../VehicleInfo'

type VehicleListItemProps = {
  vehicle: vehicleListItem
}
type vehicleState = {
  state: {
    vehicleId: string
  }
}

type vehicleRouteParams = {
  vehicleId: string
}

const VehicleListItem = ({ vehicle }: VehicleListItemProps) => {
  const location = useRouteMatch('/details/:vehicleId');
  const params = location && location.params as vehicleRouteParams;
  const isOpen: boolean = params && (params.vehicleId === vehicle.id)
  
  return (
    <>
      <TableRow>
        <TableCell>
          {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </TableCell>
        <TableCell>{vehicle.id}</TableCell>
        <TableCell>{vehicle.name}</TableCell>
        <TableCell>
          <Link to={`/details/${vehicle.id}`}>
            <Button color='primary' variant='contained'>Details</Button>
          </Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <VehicleInfo vehicleId={vehicle.id} loadData={isOpen} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default VehicleListItem
