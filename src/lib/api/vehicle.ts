import axios from 'axios';
import config from '../../config/config.json';

export type vehicleListItem = {
  id: string,
  name: string
}

export type vehicleInfo = {
  msidn: string,
  engineStatus: string,
  fleet: string,
  brand: string,
  countryOfOperation: string,
  chassisNumber: string,
  cassisSeries: string
}

export type vehicleService = {
  communicationStatus: string,
  services: {
    serviceName: string,
    status: string,
    lastUpdate: string
  }[]
}

export const getVehicleServices = async (vehicleId: string):Promise<vehicleService> => {
  const url = `${config.api.url}/vehicle/services`
  const response = await axios.get(url, { params: { id: vehicleId } })

  return response.data
}

export const getVehicleInfo = async (vehicleId: string): Promise<vehicleInfo> => {
  const url = `${config.api.url}/vehicle/info`
  const response = await axios.get(url, { params: { id: vehicleId } })

  return response.data
}

export const getVehicleList = async (): Promise<vehicleListItem[]> => {
  const url = `${config.api.url}/vehicle/list`
  const response = await axios.get(url)

  return response.data.vehicles
}
