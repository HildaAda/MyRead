import React from 'react';
import { StatusBar, Button, Text, View } from 'react-native';
import { signOutUser } from '../firebase';
import { homeStyles } from './Styles';

const Home = () => {

  return (
    <View style={homeStyles.container}>
      <Text style={{ fontSize: 18 }}>Welcome to MyRead!</Text>
      <Button title="Sign Out" onPress={signOutUser} />
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;