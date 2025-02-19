import React from "react";
import { Image } from "react-native";

import { styles } from "./HeaderStyles";

export function Header() {
	return <Image style={styles.logo} source={require("../../../assets/logo-pokemon.png")} height={300} />;
}
