import { db } from '../firebase';
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";

const removeFromBookList = async (userUid, book, setBookList) => {
    const userBookListRef = doc(db, 'users', userUid);
    const industryIdentifier = book.industryIdentifiers[0].identifier;

    try {
        const snapshot = await getDoc(userBookListRef);
        if (!snapshot.exists()) {
            console.error("Document does not exist.");
            return;
        }

        const userData = snapshot.data();
        const updatedBookList = userData.userbooklist.filter(item => {
            if (item.industryIdentifiers[0].identifier === industryIdentifier) {
                return false;
            }
            return true;
        });

        await updateDoc(userBookListRef, {
            userbooklist: updatedBookList
        });

        console.log('Book removed from user book list.');

        setBookList(updatedBookList);
    } catch (error) {
        console.error('Error removing book from user book list:', error);
    }
}

export default removeFromBookList;