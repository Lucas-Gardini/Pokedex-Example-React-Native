import { AxiosResponse } from "axios";
import { Pokemon, PokemonTypes } from "../models/PokemonModel";

export function convertPokemon(index: number, response: AxiosResponse<any, any>): Pokemon {
	return {
		id: index,
		name: response.data.name,
		types: response.data.types.map((type: PokemonTypes) => ({
			slot: type.slot,
			type: {
				name: type.type.name,
			},
		})),
		sprites: {
			front_default: response.data.sprites.front_default,
			front_shiny: response.data.sprites.front_shiny,
		},
		height: response.data.height,
		weight: response.data.weight,
	};
}
