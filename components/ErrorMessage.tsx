import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <View className="flex-1 justify-center items-center p-4 bg-red-900/50 rounded-lg">
      <Text className="text-red-300 text-center mb-4">Error: {message}</Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} className="bg-accent p-2 rounded-md">
          <Text className="text-white">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};