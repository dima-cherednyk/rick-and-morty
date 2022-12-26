import { Character } from './Character';

export type InfoCharacters = {
  info: {
    count: number,
    pages: number,
    next: string,
    prev: string | null,
  },
  results: Character[],
};
