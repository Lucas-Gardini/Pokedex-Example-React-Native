import React from "react";
import { View, Text, Image } from "react-native";

import { styles } from "./CardPokemonStyles";

interface CardPokemonProps {
	name: string;
	sprites: {
		front_default: string;
	};
}

export function CardPokemon({ name, sprites }: CardPokemonProps) {
	return (
		<View style={styles.pokemonCard}>
			<Text style={styles.pokemonName}>{name} </Text>
			<Image source={{ uri: sprites.front_default }} style={styles.pokemonImage} />
		</View>
	);
}
