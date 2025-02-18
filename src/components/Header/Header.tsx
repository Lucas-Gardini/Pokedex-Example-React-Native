import React from 'react';
import { View, Text, Image } from 'react-native';

import { styles } from './HeaderStyles';

export function Header() {
  return (
    <Image style={styles.logo} source={require('../../../assets/logo-pokemon.png')} />
  );
}