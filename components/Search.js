import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, FlatList, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { searchListStyles ,loadingStyle } from './Styles';
import { Button } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import addToBookList from './AddToBookList';
import { auth } from '../firebase';

export default function Search({ navigation }) {
  const [search, setSearch] = useState('')
  const [books, setBooks] = useState([])
  const [user, setUser] = useState(null);
  const [bookAdded, setBookAdded] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookList, setBookList] = useState([])

  const fetchUserUid = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
          setUser(currentUser.uid);
      } else {
          setUser(null);
        };
    } catch (error) {
      console.error('Error fetching user UID: ', error);
      };
  };

  useEffect(() => {
      fetchUserUid();
  }, []);

  const fetchBooks = () => {
      setLoading(true);
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${process.env.EXPO_PUBLIC_GOOGLEBOOKSAPIKEY}`+`&maxResults=20`)
      .then(response => {
          if(!response)
              throw new Error('Error in fetch: ' + response.statusText)
          return response.json();
      })
      .then(data => {
        if (!data.items || data.items.length === 0) {
          setLoading(false);
          setBooks([]);
          return;
        };

        const filteredBooks = data.items.filter(item => 
            item.volumeInfo.title &&
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.thumbnail &&
            item.volumeInfo.description &&
            item.volumeInfo.publishedDate &&
            item.volumeInfo.authors &&
            item.volumeInfo.authors.length > 0 &&
            item.volumeInfo.industryIdentifiers &&
            item.volumeInfo.industryIdentifiers.length > 0
        );
  
        setBooks(filteredBooks);
        setLoading(false);
      })
      .catch(err => {
          console.error(err)
          setLoading(false)
      });
  };


  const handleAddToBookList = async (book) => {
    await addToBookList(user, book);
    setBookAdded({...bookAdded, [book.id]: true});
    setBookList([...bookList, book]);
  };

  if (loading) {
    return(
      <View style={loadingStyle.loading}>
        <ActivityIndicator size='large'/>
      </View>
    )
  } else {
    return (
      <View style={searchListStyles.container}>
        <View style={searchListStyles.inputContainer}>
          <TextInput
            style={searchListStyles.input}
            placeholder='Type here...'
            value={search}
            onChangeText={text => setSearch(text)}
          />
          <Button title='Search' onPress={fetchBooks}/>
        </View>
        {books.length === 0 ? (
          <View style={searchListStyles.noBooksFound}>
            <Text>No books found.</Text>
          </View>
        ) : (
        <View style={searchListStyles.listView}>
          <FlatList
            data={books}
            renderItem={({ item }) =>
            <View style={searchListStyles.row}>
              <TouchableOpacity
                style={searchListStyles.rowContent}
                onPress={() => navigation.navigate('BookDetails', { book: item })}
              >
                {item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail &&
                  <Image
                    style={searchListStyles.image}
                    source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                  />
                }
                <View style={searchListStyles.buttonView}>
                  <Text style={searchListStyles.bookInfo}>{item.volumeInfo.title}</Text>
                  <Button 
                    type="clear"
                    style={searchListStyles.button}
                    icon={<MaterialCommunityIcons name={bookAdded[item.id] ? "book-check-outline" : "book-outline"} size={30} color="black" />}
                    onPress={() => handleAddToBookList(item)}
                    iconRight 
                    />
                </View>
              </TouchableOpacity>
              </View>
            }
          />
        </View>
        )}
        <StatusBar style="auto" />
      </View>
    );
  };
};