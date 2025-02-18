import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { styles } from "./AppStyles";

import { Home } from "./src/screens/Home/Home";
import { PokemonPage } from "./src/screens/PokemonPage/PokemonPage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Pokemon } from "./src/models/PokemonModel";

// Definindo os parâmetros da navegação
type RootStackParamList = {
  Home: undefined;
  PokemonPage: { pokemon: Pokemon };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PokemonPage" component={PokemonPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
