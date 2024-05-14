import { db } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

export const addToBookList = async (userUid, book) => {
    const userBookListRef = doc(db, 'users', userUid);

    try {
        const snapshot = await getDoc(userBookListRef);
        if (!snapshot.exists()) {
            console.error("Document does not exist.");
            return;
        };

        const bookData = {
            title: book.volumeInfo.title,
            thumbnail: book.volumeInfo.imageLinks.thumbnail,
            description: book.volumeInfo.description,
            publishedDate: book.volumeInfo.publishedDate,
            authors: book.volumeInfo.authors,
            industryIdentifiers: book.volumeInfo.industryIdentifiers
        };

        await updateDoc(userBookListRef, {
            userbooklist: arrayUnion(bookData)
        });

        console.log('Book added to user book list.');
    } catch (error) {
        console.error('Error adding book to user book list:', error);
    };
}

export default addToBookList;