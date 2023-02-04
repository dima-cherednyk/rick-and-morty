import { Character } from './Character';

export interface Info {
  info: {
    count: number,
    pages: number,
    next: string,
    prev: string | null,
  },
  results: Character[],
}
