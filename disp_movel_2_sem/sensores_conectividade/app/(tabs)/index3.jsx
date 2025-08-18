import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const { width, height } = Dimensions.get('window');

export default function App() {
    const [position, setPosition] = useState({ x: width / 2 - 25, y: height / 2 - 25 });
    const [position2, setPosition2] = useState({ x: width / 0, y: height / 0 });

    useEffect(() => {
        Accelerometer.setUpdateInterval(50);

        const subscription = Accelerometer.addListener(({ x, y }) => {
            const newX = position.x - x * 20;
            const newY = position.y + y * 20;

            setPosition({
                x: Math.min(Math.max(newX, 0), width - 100),
                y: Math.min(Math.max(newY, 0), height - 100),
            });
            setPosition2({
                x: Math.min(Math.max(newX, 0), width - 100),
                y: Math.min(Math.max(newY, 0), height - 100),
            });
        });

        return () => subscription.remove();
    }, [position]);

    const backgroundColor = position.y === 0 ? 'red' : position.y >= height - 100 ? 'yellow' : position.x === 0 ? 'blue' : position.x >= width - 100 ? 'green' : '#eee';

    return (
        <>
            <View style={[styles.container, { backgroundColor }]}>
                <View style={[styles.box, { left: position2.x, top: position2.y }]}/>
                <View style={[styles.box, { left: position.x, top: position.y }]}>
                    <Text>cord X: {position.x}</Text>
                    <Text>cord Y: {position.y}</Text>
                </View>
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    box: {
        position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: '#128C7E',
        borderRadius: 8,
    },
});
