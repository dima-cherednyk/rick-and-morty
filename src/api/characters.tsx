import { InfoCharacters } from '../types/InfoCharacters';
import { client } from '../utils/fetchClient';

export const getCharacters = (search: string) => {
  if (!search) {
    return client.get<InfoCharacters>('/character/');
  }

  return client.get<InfoCharacters>(`/character/${search}`);
};
