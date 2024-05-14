import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, TextInput, Button, ActivityIndicator } from 'react-native';
import { auth, db} from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { signInStyles, loadingStyle } from './Styles';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User signed up successfully
                const user = userCredential.user;
                console.log('User signed up:');
                setLoading(false)
                createUsersInformation(user);
            })
            .catch((error) => {
                // Handle errors here
                setError(error.message);
                console.error('Error signing up:', error);
                setLoading(false)
            });
    };

    const handleSignIn = () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed in:');
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message);
                console.error('Error signing in:', error);
                setLoading(false)
            });
    };

    const createUsersInformation = async (user) => {
        try {
            const usersInformationRef = doc(db, 'users', user.uid);

            await setDoc(usersInformationRef, { usersInformation: [] });
            
            console.log('Document created for new user');
        } catch (error) {
            console.error('Error creating document:', error);
        };
    };

    if (loading) {
        return(
          <View style={loadingStyle.loading}>
            <ActivityIndicator size='large'/>
          </View>
        )
    } else {
        return (
            <View style={signInStyles.container}>
            <View style={signInStyles.signInContainer}>
                <TextInput
                style={signInStyles.input}
                placeholder='email'
                value={email}
                onChangeText={text => setEmail(text)}
                required
                />
                <TextInput
                style={signInStyles.input}
                placeholder='password'
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true} 
                required
                />
                <View style={signInStyles.buttonContainer}>
                    <Button title='Register' onPress={handleSignUp}/>
                <Button title='Sign In' onPress={handleSignIn}/>
                </View>
            </View>
            <StatusBar style="auto" />
            </View>
        );
    };
};

export default SignIn