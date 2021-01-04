export interface PokemonsResponse {
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
  id: string ;
  isInCart: boolean;
}


