import { db } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const removeRating = async ({ bookIndustryIdentifier, currentUserUid, setRating }) => {
    const bookRef = doc(db, 'books', bookIndustryIdentifier);

    try {
        const bookSnapshot = await getDoc(bookRef);
        if (!bookSnapshot.exists()) {
            console.error("Book document does not exist.");
            return;
        }

        const bookData = bookSnapshot.data();
        if (!bookData.ratings || !bookData.ratings.some(ratings => ratings.userId === currentUserUid)) {
            console.error("Ratings not found on this book.");
            return;
        }

        const updatedRatings = bookData.ratings.filter(ratings => ratings.userId!== currentUserUid);

        await updateDoc(bookRef, {
            ratings: updatedRatings
        });

        console.log('Rating removed.');

        setRating(updatedRatings);
    } catch (error) {
        console.error('Error removing rating:', error);
    }
}