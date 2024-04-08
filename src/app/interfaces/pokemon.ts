export interface Pokemon {
  name: string,
  url?: string;
  image?: string;
  id: string;
  type: Array<any>;
}

export interface PokemonResults {
  count: number;
  next: string;
  previus?: string;
  results: Pokemon[]
}
