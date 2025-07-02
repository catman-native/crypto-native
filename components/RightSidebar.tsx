import { Asset } from "@/services/api";
import { removeFromWatchlist } from "@/store/crypto/cryptoSlice";
import { useAppDispatch } from "@/store/hooks";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface RightSidebarProps {
  onClose: () => void;
  assets: Asset[];
  watchlist: string[];
  onAssetPress: (asset: Asset) => void;
}

export const RightSidebar = ({
  onClose,
  assets,
  watchlist,
  onAssetPress,
}: RightSidebarProps) => {
  const dispatch = useAppDispatch();

  const watchlistAssets = assets.filter((asset) =>
    watchlist.includes(asset.id)
  );

  return (
    <View className="absolute top-0 right-0 h-full w-3/4 bg-dark-200 p-4 z-10 border-l border-dark-100">
      <TouchableOpacity onPress={onClose} className="mb-6 self-end">
        <Text className="text-light-100 text-xl">Close →</Text>
      </TouchableOpacity>
      <Text className="text-white font-bold text-xl mb-4">My Watchlist</Text>

      {watchlistAssets.length > 0 ? (
        <FlatList
          data={watchlistAssets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onAssetPress(item)}
              className="flex-row justify-between items-center py-3 border-b border-dark-100"
            >
              <View>
                <Text className="text-light-200 text-base">{item.name}</Text>
                <Text className="text-light-300 text-sm">{item.symbol}</Text>
              </View>

              <TouchableOpacity
                onPress={() => dispatch(removeFromWatchlist(item.id))}
                className="py-1 px-2"
              >
                <Text className="text-red-500 font-semibold">Remove</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text className="text-light-300 text-center mt-10">
          Your watchlist is empty. Add assets from the main view.
        </Text>
      )}
    </View>
  );
};
