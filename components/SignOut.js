import React from 'react';
import { Button } from 'react-native';
import { signOutUser } from '../firebase';

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOutUser();
      AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Sign out error:', error.message);
    };
  };

  return (
    <Button title="Sign Out" onPress={handleSignOut} />
  );
};

export default SignOut;
