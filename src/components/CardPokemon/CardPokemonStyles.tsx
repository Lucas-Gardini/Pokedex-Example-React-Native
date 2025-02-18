import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pokemonCard: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'yellow',
    backgroundColor: '#2e67b2',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  pokemonName: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    color: '#ffffff',
    textTransform: 'uppercase'
  },
  pokemonImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});