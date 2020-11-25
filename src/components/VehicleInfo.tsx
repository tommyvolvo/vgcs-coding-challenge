import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getVehicleInfo, getVehicleServices } from '../lib/api/vehicle';
import useApi from '../lib/api/useApi';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ApiError from './ApiError'

type VehicleInfoProps = {
  vehicleId: string
}

const VehicleInfo = ({ vehicleId }: VehicleInfoProps) => {
  const [vehicleInfo, vehicleInfoError, vehicleInfoLoading] = useApi(
    async () => getVehicleInfo(vehicleId)
  )
  const [serviceList, serviceListError, serviceListLoading] = useApi(
    async () => getVehicleServices(vehicleId)
  )
  const isLoading = vehicleInfoLoading || serviceListLoading
  
  return (
    <>
      {[vehicleInfoError, serviceListError].map((err, i) => {
        return (err && <ApiError key={i} open={err !== null} message={err.message} />)
      })}
      <Table>
        <TableBody>
          {
            isLoading
              ? <TableRow>
                  <TableCell>
                    <CircularProgress style={{ marginLeft: '50%' }} />
                  </TableCell>
                </TableRow>
              : <>
                {vehicleInfo && Object.keys(vehicleInfo).map((key) => {
                  return (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">{key}</TableCell>
                      <TableCell>{vehicleInfo[key]} </TableCell>
                    </TableRow>
                  )
                })}
                <TableRow>
                  <TableCell component="th" scope="row">Active services</TableCell>
                  <TableCell>
                    {
                      serviceList && serviceList.services && serviceList.services
                        .filter(({ status }) => status === 'ACTIVE')
                        .map(({ serviceName }) => {
                          return (<Chip label={serviceName} key={serviceName} />)
                        })
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <Link to={`/vehicle/services/${vehicleId}`}>
                      <Button color='primary' variant='contained'>
                        View Services
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              </>
          }
        </TableBody>
      </Table>
    </>
  )
}

export default VehicleInfo
