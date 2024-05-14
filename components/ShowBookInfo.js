import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation} from 'react-native';
import { bookDetailsStyles } from './Styles';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

export default function ShowBookInfo({ bookIndustryIdentifier, title, authors, published, description }) {

    const [descriptionVisible, setDescriptionVisible] = useState(false);
    const navigation = useNavigation();
    const currentUser = auth.currentUser.uid;

    const goToCommets = () => {
        navigation.navigate('BookComments', { currentUser, bookIndustryIdentifier, title });
    };

    const toggleDescription = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setDescriptionVisible(!descriptionVisible);
    };

    return (
        <View>
            <View style={bookDetailsStyles.textContainer}>
                <Text style={bookDetailsStyles.text}>Title: {title}</Text>
                <Text style={bookDetailsStyles.text}>Author: {authors}</Text>
                <Text style={bookDetailsStyles.text}>Published: {published}</Text>
                <TouchableOpacity onPress={toggleDescription}>
                    <Text style={[bookDetailsStyles.text, { textDecorationLine: 'underline' }]}>
                        {descriptionVisible ? 'Hide Description' : 'Show Description'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToCommets}>
                    <Text style={[bookDetailsStyles.text, { textDecorationLine: 'underline' }]}>
                        View comments
                    </Text>
                </TouchableOpacity>
            </View>
            {descriptionVisible && (
                <View style={bookDetailsStyles.descriptionContainer}>
                    <Text style={bookDetailsStyles.descriptionText}>Description: {description}</Text>
                </View>
            )}
        </View>
    );
};