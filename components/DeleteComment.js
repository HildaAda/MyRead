import { db } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const deleteComment = async ({ bookIndustryIdentifier, commentId, setComments }) => {
    const bookRef = doc(db, 'books', bookIndustryIdentifier);

    try {
        const bookSnapshot = await getDoc(bookRef);
        if (!bookSnapshot.exists()) {
            console.error("Book document does not exist.");
            return;
        };

        const bookData = bookSnapshot.data();
        if (!bookData.comments || !bookData.comments.some(comment => comment.commentId === commentId)) {
            console.error("Comment not found on this book.");
            return;
        };

        const updatedComments = bookData.comments.filter(comment => comment.commentId !== commentId);

        await updateDoc(bookRef, {
            comments: updatedComments
        });

        console.log('Comment deleted.');

        setComments(updatedComments);
    } catch (error) {
        console.error('Error deleting comment:', error);
    };
};

