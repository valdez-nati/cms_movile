import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button, FlatList } from "react-native";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ListaPost = () => {
    const navigation = useNavigation();

    const [listaNoticias, setListaNoticias] = React.useState([]);
    const [sinConexion, setSinConexion] = React.useState(0);

    const API_BASE_URL = 'http://ipwifi:8000';

    React.useEffect(() => {
        axios.get(`${API_BASE_URL}/listanoticias`)
        .then((response) => {
            setListaNoticias(response.data);
            console.log("Datos de usuarios recibidos:", response.data);
        })
        .catch((error) => {
            setSinConexion(1);
            console.log(error);
        });
    }, []);

    const handleLoginNavigation = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <View style={styles.container}>
            <Button 
                title="Iniciar Sesión" 
                onPress={handleLoginNavigation} // Navegar a LoginScreen
            />
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={listaNoticias}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            style={styles.imagen}
                            source={{
                                uri: `${API_BASE_URL}/media/imagenes/${item.imagen}`,
                            }}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.titulo}>{item.titudo}</Text>
                            <Text style={styles.cuerpo}>{item.cuerpo}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default ListaPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 20,
        overflow: 'hidden',
    },
    imagen: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 10,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cuerpo: {
        fontSize: 16,
        color: '#333',
    },
});
