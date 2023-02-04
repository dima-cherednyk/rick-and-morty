import { Character } from './Character';

export interface InfoCharacters {
  info: {
    count: number,
    pages: number,
    next: string,
    prev: string | null,
  },
  results: Character[],
}
