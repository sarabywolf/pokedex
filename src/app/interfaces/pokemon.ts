import { ColorType } from '../../common/types';

export interface Pokemon {
  name: string;
  url?: string;
  image?: string;
  id: string;
  types: Array<Type>;
}

export interface Type {
  slot: number;
  type: {
    name: ColorType;
    url: string;
  };
}

export interface PokemonResults {
  count: number;
  next: string;
  previus?: string;
  results: Pokemon[];
}
