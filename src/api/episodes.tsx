import { InfoEpisodes } from '../types/InfoEpisodes';
import { client } from '../utils/fetchClient';

export const getEpisodes = (search: string) => {
  if (!search) {
    return client.get<InfoEpisodes>('/episode/');
  }

  return client.get<InfoEpisodes>(`/episode/${search}`);
};
