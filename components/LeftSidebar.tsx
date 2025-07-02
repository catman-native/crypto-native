import { Asset } from '@/services/api';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

interface LeftSidebarProps {
  onClose: () => void;
  assets: Asset[];
  onAssetPress: (asset: Asset) => void;
}

export const LeftSidebar = ({ onClose, assets, onAssetPress }: LeftSidebarProps) => {
  return (
    <View className="absolute top-0 left-0 h-full w-3/A bg-dark-200 p-4 z-10 border-r border-dark-100">
      <TouchableOpacity onPress={onClose} className="mb-6">
        <Text className="text-light-100 text-xl">← Close</Text>
      </TouchableOpacity>
      <Text className="text-white font-bold text-xl mb-4">Crypto Assets</Text>

      <FlatList
        data={assets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => onAssetPress(item)} 
            className="py-3 border-b border-dark-100"
          >
            <Text className="text-light-200 text-base">{item.name}</Text>
            <Text className="text-light-300 text-sm">{item.symbol}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text className="text-light-300 text-center mt-10">No assets found.</Text>}
      />
    </View>
  );
};