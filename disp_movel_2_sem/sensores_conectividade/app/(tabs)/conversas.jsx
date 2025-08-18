import React, { useEffect, useRef, useState } from 'react';
import { router, Link } from "expo-router"
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image
} from 'react-native';

const conversas = [
    {
        "id": 1,
        "image": require('../../assets/images/user.png'),
        "nome": "João",
        "mensagem": "Olá, como você está?",
        "status": "ontem",
        'mensagens': 1,
    },
    {
        "id": 1,
        "image": require('../../assets/images/user.png'),
        "nome": "Maria",
        "mensagem": "Roberto, cade a comida!",
        "status": "07:21",
        'mensagens': 0,
    },
]

export default function WhatsApp() {
    const renderItem = ({ item }) => (
        <Link href="/conversa" style={{marginLeft: 10,marginBottom: 20}}>
        <View style={styles.conversa}>
            <Image source={item.image} style={styles.userImage} />
            <View style={styles.nome}>
                <Text style={styles.nomeTexto}>{item.nome}</Text>
                <Text style={styles.texto}>{item.mensagem}</Text>
            </View>
            <View style={styles.status}>
                <View>
                    {item.mensagens == 0 ?
                        <Text style={styles.statusTexto}>{item.status}</Text>
                        :
                        <>
                            <Text style={[styles.statusTexto, { color: '#4cc06fff', fontWeight: 'bold' }]}>{item.status}</Text>
                            <Text style={styles.bola}>{item.mensagens}</Text>
                        </>
                    }
                </View>
            </View>
        </View>
        </Link>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 40}
            >
                <View>
                    <View style={styles.header}>
                        <Text style={styles.title}>WhatsApp</Text>
                        <View style={styles.headerRight}>
                            <Image source={require('../../assets/images/cam.png')} style={styles.headerRightImage} />
                            <Image source={require('../../assets/images/more.png')} style={styles.headerRightImage} />
                        </View>

                    </View>
                    <View style={styles.inputArea}>
                        <View style={styles.lupa}>
                            <Image source={require('../../assets/images/search.png')} style={styles.headerRightImage} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Pergunte à Meta AI ou pesquise"
                        />
                    </View>

                </View>
                <View style={styles.space} />
                <FlatList
                    data={conversas}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    style={styles.lista}
                    contentContainerStyle={{ paddingBottom: 10 }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    texto: { fontSize: 16 },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4cc06fff'
    },

    inputArea: {
        flexDirection: 'row',
        padding: 8,
        backgroundColor: '#fff',
    },
    input: {
        fontSize: 16,
        flex: 1,
        backgroundColor: '#efefefff',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 20,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        marginTop: 30,
        position: 'fixed',
        width: '100%',
    },
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 7,
    },
    headerRightImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginLeft: 20
    },
    lupa: {
        backgroundColor: '#efefefff',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    conversa: {
        marginRight: 10,
        flexDirection: 'row',
    },
    userImage: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(190, 190, 190, 1)',
        borderRadius: 30
    },
    space: {
        height: 30
    },
    nome: {
        paddingLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
    },
    nomeTexto: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    status: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 3,
        paddingRight: 10,
    },
    bola: {
        width: 20,
        height: 20,
        backgroundColor: '#4cc06fff',
        color: '#fff',
        borderRadius: 20,
        textAlign: 'center',
        margin: 'auto'
    }
});