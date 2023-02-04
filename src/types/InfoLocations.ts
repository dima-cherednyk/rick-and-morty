import { Location } from './Location';

export interface InfoLocations {
  info: {
    count: number,
    pages: number,
    next: string,
    prev: string | null,
  },
  results: Location[],
}
