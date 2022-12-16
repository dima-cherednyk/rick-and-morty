import { Location } from './Location';

export type InfoLocations = {
  info: {
    count: number,
    pages: number,
    next: string,
    prev: string | null,
  },
  results: Location[],
};
