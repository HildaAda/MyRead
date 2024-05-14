import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { bookDetailsStyles } from './Styles';
import ShowBookInfo from './ShowBookInfo';

export default function BookDetails({ route }) {
    const { book } = route.params;
    const bookIndustryIdentifier = book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers.length > 0 ? book.volumeInfo.industryIdentifiers[0].identifier : null;
    const title = book.volumeInfo.title
    const authors = book.volumeInfo.authors && book.volumeInfo.authors.join(', ')
    const published = book.volumeInfo.publishedDate
    const description = book.volumeInfo.description

    return (
        <ScrollView>
            <View style={bookDetailsStyles.imageContainer}>
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail &&
                    <Image style={bookDetailsStyles.image} source={{ uri: book.volumeInfo.imageLinks.thumbnail }} />
                }
            </View>
            <View >
            <ShowBookInfo
                title={title}
                authors={authors}
                published={published}
                description={description}
                bookIndustryIdentifier={bookIndustryIdentifier}
            />
            </View>
        </ScrollView>
    );
}