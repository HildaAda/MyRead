import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { addCommentStyles } from './Styles';

export default function AddComment({ route }) {
    const { bookIndustryIdentifier, title } = route.params;
    const [comment, setComment] = useState('');
    const currentUser = auth.currentUser;

    const handleAddComment = async () => {
        try {
            const bookRef = doc(db, 'books', bookIndustryIdentifier);
            const docSnapshot = await getDoc(bookRef);
            const existingData = docSnapshot.data();

            let updatedComments = [];
            if (docSnapshot.exists()) {
                updatedComments = existingData.comments || [];
            };

            const commentData = {
                commentId: Math.random().toString(36).substring(7),
                text: comment,
                userId: currentUser.uid
            };

            updatedComments.push(commentData);

            const updatedBookData = {
                ...existingData,
                comments: updatedComments
            };
    
            await setDoc(bookRef, updatedBookData);

            setComment('');
            console.log('Comment added successfully.');

        } catch (error) {
            console.error('Error adding comment:', error);
        };
    };

    return (
        <View style={addCommentStyles.container}>
            <Text style={addCommentStyles.text}>Add a Comment for Book:</Text>
            <Text style={addCommentStyles.title}>{title}</Text>
            <TextInput
                placeholder="Add a comment"
                value={comment}
                onChangeText={setComment}
                multiline
                style={addCommentStyles.input}
            />
            <Button title="Add Comment" onPress={handleAddComment} />
        </View>
    );
};