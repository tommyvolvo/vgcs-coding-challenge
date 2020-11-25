import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import ServiceList from './ServiceList'
import { getVehicleInfo, vehicleInfo as vehicleInfoType } from '../lib/api/vehicle';

type VehicleInfoProps = {
  loadData: boolean,
  vehicleId: string
}

const VehicleInfo = ({ vehicleId, loadData }: VehicleInfoProps) => {
  const [vehicleInfo, setVehicleInfo] = useState<vehicleInfoType>()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(
    () => {
      if (loadData) {
        setIsLoading(true)
        const loadInfo = async () => {
          try {
            setVehicleInfo(await getVehicleInfo(vehicleId))
            setIsLoading(false)
          } catch (e) {
            // TODO centralise error handling
            setIsLoading(false)
          }
        }

        loadInfo()
      }
    },
    [loadData, vehicleId]
  )
  
  return (
    <>
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
              <TableRow>
                <TableCell component="th" scope="row">
                  MSIDN
                </TableCell>
                <TableCell>
                  {vehicleInfo && vehicleInfo.msidn}
                </TableCell>
                <TableCell component="th" scope="row">
                  Engine Status
                </TableCell>
                <TableCell>
                  {vehicleInfo && vehicleInfo.engineStatus}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Fleet
                </TableCell>
                <TableCell>
                  {vehicleInfo && vehicleInfo.fleet}
                </TableCell>
                <TableCell component="th" scope="row">
                  Brand
                </TableCell>
                <TableCell>
                  {vehicleInfo && vehicleInfo.brand}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Country Of Operation
                </TableCell>
                <TableCell>
                  {vehicleInfo && vehicleInfo.countryOfOperation}
                </TableCell>
                <TableCell component="th" scope="row">
                  Chassis Number
                </TableCell>
                <TableCell>
                  {vehicleInfo && vehicleInfo.chassisNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Cassis Series
                </TableCell>
                <TableCell colSpan={3}>
                  {vehicleInfo && vehicleInfo.cassisSeries}
                </TableCell>
              </TableRow>
            </>
        }
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4}>
              <ServiceList vehicleId={vehicleId} loadData={loadData} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default VehicleInfo
