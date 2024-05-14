import React from 'react';
import { View, ScrollView } from 'react-native';
import { Rating } from '@rneui/themed';

const Ratings = () => {
  const ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating);
  };

  return (
    <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
          <Rating
            showRating
            imageSize={40}
            onFinishRating={ratingCompleted}
            style={{ paddingVertical: 10 }}
          />
        </View>
    </View>
  );
};

export default Ratings;