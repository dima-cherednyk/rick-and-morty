import { InfoLocations } from '../types/InfoLocations';
import { client } from '../utils/fetchClient';

export const getLocations = (search: string) => {
  if (!search) {
    return client.get<InfoLocations>('/location/');
  }

  return client.get<InfoLocations>(`/location/${search}`);
};
