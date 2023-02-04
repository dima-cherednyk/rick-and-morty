import { Episode } from './Episode';

export interface InfoEpisodes {
  info: {
    count: number,
    pages: number,
    next: string,
    prev: string | null,
  },
  results: Episode[],
}
