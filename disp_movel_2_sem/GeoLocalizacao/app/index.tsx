import React, { useState } from 'react';
import { Text, View, Button } from "react-native";
import { router } from "expo-router"

export default function Index() {
    const Maps = () => {
        router.replace({
            pathname: "/maps"
        })
    }

    return (
        <View>
            <Text>Acesse o mapa para ver sua localização</Text>
            <Button title='Entrar' onPress={Maps}></Button>
        </View>
    );
}