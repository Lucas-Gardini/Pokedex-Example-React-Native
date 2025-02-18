import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./HomeStyles";
import { Header } from "../../components/Header/Header";
import { api } from "../../lib/axios";
import { CardPokemon } from "../../components/CardPokemon/CardPokemon";
import { Pokemon, PokemonTypes } from "../../models/PokemonModel";

export function Home() {
  const navigation = useNavigation<any>();

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setPokemonList([]);
      setIsLoading(true);

      for (let i = 1; i <= 151; i++) {
        try {
          const response = await api.get(`${i}`);
          const pokemon: Pokemon = {
            id: i,
            name: response.data.name,
            types: response.data.types.map((type: PokemonTypes) => ({
              slot: type.slot,
              type: {
                name: type.type.name,
              }
            })),
            sprites: {
              front_default: response.data.sprites.front_default,
              front_shiny: response.data.sprites.front_shiny,
            },
            height: response.data.height,
            weight: response.data.weight,
          };
          setPokemonList((prevState) => [...prevState, pokemon]);
        } catch (err) {
          console.error("Error:", err);
        }
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <ScrollView>
        <View style={styles.pokemonList}>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            pokemonList.map((pokemon, index) => (
              <Pressable key={index} onPress={() => navigation.navigate("PokemonPage", { pokemon })}>
                <CardPokemon name={pokemon.name} sprites={pokemon.sprites} />
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
