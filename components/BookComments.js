import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator} from 'react-native';
import { bookDetailsStyles, loadingStyle } from './Styles';
import { AntDesign } from '@expo/vector-icons';
import { deleteComment } from './DeleteComment';
import { useNavigation } from '@react-navigation/native';
import getBookComments from './GetBookComments';

export default function BookComments({ route }){

    const { currentUser, bookIndustryIdentifier, title } = route.params;
    const navigation = useNavigation();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchComments = async () => {
            try {
                if (bookIndustryIdentifier) {
                    const bookComments = await getBookComments(bookIndustryIdentifier);
                    setComments(bookComments);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
                setLoading(false);
            }
        };

        fetchComments();
    }, [bookIndustryIdentifier]);

    const handleAddCommentPress = () => {
        if (bookIndustryIdentifier) {
            navigation.navigate('AddComment', { bookIndustryIdentifier, title});
        } else {
            console.error('Book industry identifier not found.');
        }
    };

    if (loading) {
        return(
          <View style={loadingStyle.loading}>
            <ActivityIndicator size='large'/>
          </View>
        );
    } else {
        return(
            <View>
                <Text style={{fontSize: 15, margin: 10}}>Comments for book: {title}</Text>
                <Button title="Add Comment" onPress={handleAddCommentPress} />
                <FlatList
                    style={bookDetailsStyles.commentsContainer}
                    data={comments}
                    renderItem={({ item }) => (
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {item.userId === currentUser ? (
                                    <AntDesign name="staro" size={20} color="black" />
                                ) : (
                                    <View style={{ width: 24, marginRight: 5 }} />
                                )}
                                <Text style={bookDetailsStyles.commentText}>{item.text}</Text>
                            </View>
                            {item.userId === currentUser && (
                                <Button 
                                    title="Delete" 
                                    onPress={() => {
                                        deleteComment({ bookIndustryIdentifier, commentId: item.commentId, setComments });
                                    }}  
                                />
                            )}
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}