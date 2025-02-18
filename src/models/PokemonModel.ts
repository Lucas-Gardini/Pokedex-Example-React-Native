export interface Pokemon {
  id: number;
  name: string;
  types: PokemonTypes[];
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  height: number;
  weight: number;
}

export interface PokemonTypes {
  slot: number;
  type: {
    name: string;
  };
}
