import React, { useState, useEffect } from 'react';
import { View, Image, Button, ScrollView } from 'react-native';
import { bookDetailsStyles } from './Styles';
import ShowBookInfo from './ShowBookInfo';
import AddRating from './AddRating';

export default function UserBookDetails({ route }) {
    const { book } = route.params;
    const bookIndustryIdentifier = book.industryIdentifiers && book.industryIdentifiers.length > 0 ? book.industryIdentifiers[0].identifier : null;
    const title = book.title
    const authors = book.authors && book.authors.join(', ')
    const published = book.publishedDate
    const description = book.description

    return (
        <ScrollView>
            <View style={bookDetailsStyles.imageContainer}>
                {book.thumbnail && <Image style={bookDetailsStyles.image} source={{ uri: book.thumbnail }} />}
            </View>
            <AddRating
                style = {bookDetailsStyles.star}
                bookIndustryIdentifier={bookIndustryIdentifier}
            />
            <ShowBookInfo
                title={title}
                authors={authors}
                published={published}
                description={description}
                bookIndustryIdentifier={bookIndustryIdentifier}
            />
        </ScrollView>
    );
}
