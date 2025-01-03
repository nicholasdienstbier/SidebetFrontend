import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import api from '../api/api';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { email, password });
            console.log(response.data); // Use token or navigate to Home
            navigation.navigate('Home');
        } catch (err) {
            if (err.response) {
                // Server responded with a status other than 2xx
                console.log("Error Response Data:", err.response.data);
                console.log("Error Response Status:", err.response.status);
            } else if (err.request) {
                // No response was received
                console.log("Error Request:", err.request);
            } else {
                // Something went wrong in setting up the request
                console.log("Error Message:", err.message);
            }
            setError('Invalid credentials');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center' },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 },
    error: { color: 'red', marginBottom: 8 },
});

export default LoginScreen;
