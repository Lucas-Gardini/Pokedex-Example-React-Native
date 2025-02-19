import React, { useState } from "react";
import { View, Text, Image, Button } from "react-native";

import { styles } from "./PokemonPageStyles";
import { Pokemon } from "../../models/PokemonModel";
import { RouteProp } from "@react-navigation/native";
import { Header } from "../../components/Header/Header";
import PokemonTypeColors from "../../utils/colors";

// Tipando os parâmetros da rota
type RootStackParamList = {
	PokemonPage: { pokemon: Pokemon };
};

type PokemonPageRouteProp = RouteProp<RootStackParamList, "PokemonPage">;

interface Props {
	route: PokemonPageRouteProp;
}

export function PokemonPage({ route }: Props) {
	const [showShiny, setShowShiny] = useState(false);

	const pokemonProps = route.params.pokemon;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header />
			</View>
			{pokemonProps.id && (
				<>
					<Text style={styles.pokemonName}>
						{pokemonProps.id} - {pokemonProps.name}
					</Text>
					<Image
						source={{ uri: showShiny ? pokemonProps.sprites.front_shiny : pokemonProps.sprites.front_default }}
						height={300}
						width={300}
						resizeMode="contain"
					/>
					<Button
						title={showShiny ? "Ver versão normal" : "Ver versão Shiny ✨"}
						onPress={() => {
							setShowShiny(!showShiny);
						}}
					/>
					<Text style={styles.pokemonHeight}>Altura: {pokemonProps.height} metros</Text>
					<Text style={styles.pokemonWeight}>Peso: {pokemonProps.weight} kilogramas</Text>
					<View style={styles.pokemonTypes}>
						{pokemonProps.types &&
							pokemonProps.types.map((type, index) => (
								<Text key={index} style={[styles.pokemonType, { backgroundColor: PokemonTypeColors[type.type.name] || "#777" }]}>
									{type.type.name}
								</Text>
							))}
					</View>
				</>
			)}
		</View>
	);
}
