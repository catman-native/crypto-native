import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export const LoadingIndicator = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#AB8BFF" /> 
      <Text className="text-light-200 mt-2">Loading Assets...</Text>
    </View>
  );
};