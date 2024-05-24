import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigation = useNavigation();  // Hook de navegación

    const API_BASE_URL = 'http://ipwifi6:8000';

    const handleLogin = async () => {
        try {
        const response = await axios.get(`${API_BASE_URL}/listausuarios`);

        const usuarios = response.data;

        const usuarioEncontrado = usuarios.find(usuario => usuario.nombre === username && usuario.clave === password);

        if (usuarioEncontrado) {
            // Usuario encontrado, inicio de sesión exitoso
            const { nombre_usuario, codigo_usuario, nivel_usuario } = usuarioEncontrado;
            console.log('Inicio de sesión exitoso');

            // Navegar a la pantalla "Acceder" con los datos del usuario
            navigation.navigate('Acceder', {
            userData: {
                nombre_usuario,
                codigo_usuario,
                nivel_usuario,
            },
            });
        } else {
            setError('Credenciales inválidas');
        }
        } catch (error) {
        setError('Error al iniciar sesión');
        console.error(error);
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
        />
        <View style={styles.passwordContainer}>
            <TextInput
            style={styles.inputPassword}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showPasswordText}>{showPassword ? '🙈' : '👁️'}</Text>
            </Pressable>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
    },
    inputPassword: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    showPasswordText: {
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
