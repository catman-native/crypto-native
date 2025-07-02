import React from 'react';
import { Text, View } from 'react-native';

export const Footer = () => {
  return (
    <View className="bg-secondary p-3 border-t border-dark-100">
      <Text className="text-center text-light-100 text-xs">
        Crypto Dashboard | @johnth Developer Test
      </Text>
    </View>
  );
};