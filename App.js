import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Search from './components/Search';
import BookDetails from './components/BookDetails';
import UserBookDetails from './components/UserBookDetails';
import UsersBookList from './components/UsersBookList';
import AddComment from './components/AddComment';
import BookComments from './components/BookComments';
import SignIn from './components/SignIn';
import { auth } from './firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'UsersBookList') {
            return <AntDesign name="book" size={24} color="black" />
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }}/>
      <Tab.Screen name="UsersBookList" component={UsersBookList} options={{ title: 'Your Book List' }}/>
      <Tab.Screen name="Search" component={Search} options={{ title: 'Search' }}/>
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Main" options={{ headerShown: false }}>
            {() => <TabNavigator />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="SignIn" component={SignIn} />
        )}
        <Stack.Screen options={{ headerBackTitleVisible: false, title: "Books Info" }} name="BookDetails" component={BookDetails} />
        <Stack.Screen options={{ headerBackTitleVisible: false, title: "Books Info" }} name="UserBookDetails" component={UserBookDetails} />
        <Stack.Screen options={{ headerBackTitleVisible: false, title: "Add Comment" }} name="AddComment" component={AddComment} />
        <Stack.Screen options={{ headerBackTitleVisible: false, title: "Comments" }} name="BookComments" component={BookComments} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
