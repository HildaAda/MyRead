import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const getUsersBookList = async (user) => {
  try {
    const userDocRef = doc(db, 'users', user);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const userBookList = userData.userbooklist || [];

      return userBookList;
    } else {
      console.log('User document does not exist');
      return [];
    };
  } catch (error) {
    console.error('Error getting user book list:', error);
    throw error;
  };
};

export default getUsersBookList;
