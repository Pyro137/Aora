import React from 'react';
import { View, Text } from 'react-native';

const Avatar = ({ creatorName }) => {
  // Get the first letter of the creator's username
  const firstLetter = creatorName ? creatorName.charAt(0).toUpperCase() : '';

  return (
    <View className='ml-2'>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
        {firstLetter} {/* Display the first letter of the username */}
      </Text>
    </View>
  );
};

export default Avatar;
