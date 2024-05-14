import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Button } from '@rneui/themed';
import getUsersBookList from './GetUsersBookList';
import { loadingStyle } from './Styles';
import { auth } from '../firebase';
import removeFromBookList from './RemoveFromBookList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { userBookListStyles } from './Styles';

export default function UsersBookList({ navigation }) {
  const [bookList, setBookList] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserBookList = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser.uid);
        const userBookList = await getUsersBookList(currentUser.uid);
        setBookList(userBookList);
        setLoading(false);
      } else {
        setUser(null);
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    };
  };

  useEffect(() => {
    setLoading(true);
    fetchUserBookList();
  }, []);

  useEffect(() => {
    fetchUserBookList();
  }, [bookList]);

  if (loading) {
    return(
      <View style={loadingStyle.loading}>
        <ActivityIndicator size='large'/>
      </View>
    )
  } else {
    return (
      <View style={userBookListStyles.listView}>
        <FlatList
          data={bookList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={userBookListStyles.row}>
              <TouchableOpacity
                  style={userBookListStyles.rowContent}
                  onPress={() => navigation.navigate('UserBookDetails', { book: item })}
                >
              {item.thumbnail && <Image style={userBookListStyles.image} source={{ uri: item.thumbnail }} />}
              <View style={userBookListStyles.buttonView}>
                <Text style={userBookListStyles.bookInfo}>{item.title}</Text>
                <Button
                    type="clear"
                    style={{ paddingLeft: 10 }}
                    icon={<MaterialCommunityIcons name="book-remove-outline" size={30} color="black" />}
                    onPress={() => removeFromBookList(user, item, setBookList)}
                  />
              </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  };
};