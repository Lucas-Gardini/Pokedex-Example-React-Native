import React, { useEffect, useState } from "react";
import { View, FlatList, Pressable, RefreshControl, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./HomeStyles";

import { Header } from "../../components/Header/Header";
import { CardPokemon } from "../../components/CardPokemon/CardPokemon";

import { api } from "../../lib/axios";

import { Pokemon } from "../../models/PokemonModel";

import { convertPokemon } from "../../utils/convertPokemon";

const MAX_POKEMONS = 151;
const POKEMONS_PER_PAGE = 15;

export function Home() {
	const navigation = useNavigation<any>();

	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getNextPage(currentPage);
	}, []);

	const getNextPage = async (page: number) => {
		setIsLoading(true);

		try {
			const pokemonsToAdd: Pokemon[] = [];
			for (let i = currentPage * POKEMONS_PER_PAGE + 1; i <= currentPage * POKEMONS_PER_PAGE + POKEMONS_PER_PAGE; i++) {
				if (i > MAX_POKEMONS) break;

				const response = await api.get(`${i}`);
				const pokemon: Pokemon = convertPokemon(i, response);

				pokemonsToAdd.push(pokemon);
			}

			setPokemonList((prevState) => [...prevState, ...pokemonsToAdd]);
		} catch (err: any) {
			Alert.alert("Ocorreu um erro ao buscar os pokemons", err?.message ?? "");
		} finally {
			setCurrentPage(page + 1);
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header />
			</View>

			<FlatList
				data={pokemonList}
				numColumns={3}
				horizontal={false}
				contentContainerStyle={styles.pokemonList}
				refreshControl={
					<RefreshControl
						refreshing={isLoading}
						onRefresh={() => {
							setCurrentPage(1);
						}}
					/>
				}
				refreshing={isLoading}
				renderItem={({ item }) => (
					<Pressable key={item.id} onPress={() => navigation.navigate("PokemonPage", { pokemon: item })}>
						<CardPokemon name={item.name} sprites={item.sprites} />
					</Pressable>
				)}
				onEndReachedThreshold={0.1}
				onEndReached={() => {
					if (!isLoading) getNextPage(currentPage);
				}}
			/>
		</View>
	);
}
