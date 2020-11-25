import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  getVehicleInfo,
  getVehicleServices,
  vehicleInfoType,
  vehicleServiceType
} from '../lib/api/vehicle';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

type VehicleInfoProps = {
  vehicleId: string
}

const VehicleInfo = ({ vehicleId }: VehicleInfoProps) => {
  const [vehicleInfo, setVehicleInfo] = useState<vehicleInfoType>()
  const [serviceList, setServiceList] = useState<vehicleServiceType>()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(
    () => {
      const loadInfo = async () => {
        try {
          const vehicleInfoPromise = getVehicleInfo(vehicleId)
          const serviceListPromise = getVehicleServices(vehicleId)

          setVehicleInfo(await vehicleInfoPromise)
          setServiceList(await serviceListPromise)
          setIsLoading(false)
        } catch (e) {
          // TODO centralise error handling
          setIsLoading(false)
        }
      }

      loadInfo()
    },
    [vehicleId]
  )
  
  return (
    <>
      <Typography>Vehicle details</Typography>
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
