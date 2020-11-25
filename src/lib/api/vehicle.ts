import axios from 'axios';
import config from '../../config/config.json';

export type vehicleListItemType = {
  id: string,
  name: string
}

export type vehicleInfoType = {
  msidn: string,
  engineStatus: string,
  fleet: string,
  brand: string,
  countryOfOperation: string,
  chassisNumber: string,
  cassisSeries: string
}

export type vehicleServiceType = {
  communicationStatus: string,
  services: {
    serviceName: string,
    status: string,
    lastUpdate: string
  }[]
}

export const getVehicleServices = async (vehicleId: string):Promise<vehicleServiceType> => {
  const url = `${config.api.url}/vehicle/services`
  const response = await axios.get(url, { params: { id: vehicleId } })

  return response.data
}

export const getVehicleInfo = async (vehicleId: string): Promise<vehicleInfoType> => {
  const url = `${config.api.url}/vehicle/info`
  const response = await axios.get(url, { params: { id: vehicleId } })

  return response.data
}

export const getVehicleList = async (): Promise<vehicleListItemType[]> => {
  const url = `${config.api.url}/vehicle/list`
  const response = await axios.get(url)

  return response.data.vehicles
}
