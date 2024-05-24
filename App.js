import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ListaPost from './src/lista_post'; // Ajusta la ruta según tu estructura de archivos
import LoginScreen from './src/login'; // Ajusta la ruta según tu estructura de archivos
import Acceder from './src/acceder'; // Ajusta la ruta según tu estructura de archivos

const Stack = createStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListaPost">
          <Stack.Screen name="ListaPost" component={ListaPost} options={{ title: 'Bienvenidos a ByteAlert' }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
          <Stack.Screen name="Acceder" component={Acceder} options={{ title: 'Acceder' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
