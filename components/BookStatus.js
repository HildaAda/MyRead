import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadBookStatuses = async (setBookAdded) => {
    try {
        const storedBookStatuses = await AsyncStorage.getItem('bookStatuses');
        if (storedBookStatuses !== null) {
            setBookAdded(JSON.parse(storedBookStatuses));
        }
    } catch (error) {
        console.error('Error loading book statuses: ', error);
    }
};

export const saveBookStatuses = async (bookAdded) => {
    try {
        await AsyncStorage.setItem('bookStatuses', JSON.stringify(bookAdded));
    } catch (error) {
        console.error('Error saving book statuses: ', error);
    }
};