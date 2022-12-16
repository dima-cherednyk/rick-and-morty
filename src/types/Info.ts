import { Character } from './Character';

export type Info = {
  info: {
    count: number,
    pages: number,
    next: string,
    prev: string | null,
  },
  results: Character[],
};
