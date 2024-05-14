import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const getBookComments = async (bookIndustryIdentifier) => {
  try {
    const bookDocRef = doc(db, 'books', bookIndustryIdentifier);
    const bookDocSnap = await getDoc(bookDocRef);

    if (bookDocSnap.exists()) {
      const bookData = bookDocSnap.data();
      const bookCommentList = bookData.comments || [];

      return bookCommentList;
    } else {
      console.log('Document does not exist');
      return [];
    }
  } catch (error) {
    console.error('Error getting book comments:', error);
    throw error;
  }
};

export default getBookComments;
