import { Episode } from './Episode';

export type InfoEpisodes = {
  info: {
    count: number,
    pages: number,
    next: string,
    prev: string | null,
  },
  results: Episode[],
};
