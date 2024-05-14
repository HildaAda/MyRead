import React, { useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Rating } from 'react-native-ratings';
import { removeRating } from './RemoveRating';
import { addRatingStyles } from './Styles';

export default function AddRating({ bookIndustryIdentifier }) {
    const [rating, setRating] = useState(0);
    const [isRated, setIsRated] = useState(false); 
    const currentUser = auth.currentUser;

    useEffect(() => {
        async function fetchUserRating() {
            try {
                const bookRef = doc(db, 'books', bookIndustryIdentifier);
                const docSnapshot = await getDoc(bookRef);
                const existingData = docSnapshot.data();
    
                if (docSnapshot.exists()) {
                    const bookRatings = existingData.ratings || [];
                    const foundRating = bookRatings.find(rating => rating.userId === currentUser.uid);
                    if (foundRating) {
                        setRating(foundRating.rating);
                        setIsRated(true)
                    }
                }
            } catch (error) {
                console.error('Error fetching user rating:', error);
            }
        }

        fetchUserRating();
    }, [bookIndustryIdentifier, currentUser.uid]);

    const ratingCompleted = (rating) => {
        console.log('Rating is: ' + rating);
        setRating(rating)
      };

      const handleAddRating = async () => {
        try {
            const bookRef = doc(db, 'books', bookIndustryIdentifier);
            const docSnapshot = await getDoc(bookRef);
            const existingData = docSnapshot.data();
    
            let updatedRatings = [];
            if (docSnapshot.exists()) {
                updatedRatings = existingData.ratings || [];
            };
    
            const ratingData = {
                ratingId: Math.random().toString(36).substring(7),
                rating: rating,
                userId: currentUser.uid
            };
    
    
            updatedRatings.push(ratingData);
    
            const updatedBookData = {
                ...existingData,
                ratings: updatedRatings
            };
    
            await setDoc(bookRef, updatedBookData);
    
            console.log('Rating added successfully.');
    
        } catch (error) {
            console.error('Error adding rating:', error);
        };
    };

    return (
        <View style={addRatingStyles.container}>
            <Text>Your rating:</Text>
            <Rating
                showRating
                imageSize={30}
                startingValue={rating}
                onFinishRating={(rating) => ratingCompleted(rating)}
                style={{ paddingVertical: 10 }}
            />
            {!isRated ? (
                <Button title="Add rating" style={addRatingStyles.button} onPress={handleAddRating} />
            ) : (
                <Button title="Remove rating" style={addRatingStyles.button} onPress={() => removeRating({ bookIndustryIdentifier, currentUserUid: currentUser.uid, setRating })} />
            )}
        </View>
    );
}