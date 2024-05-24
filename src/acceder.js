import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Acceder = ({ route }) => {
  const { userData } = route.params;
  return (
    <View style={styles.container}>
      <Text>Bienvenido, {userData.nombre_usuario}</Text>
      {/* Aquí puedes renderizar más detalles del usuario */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default Acceder;
