import { Asset } from "@/services/api";
import {
    addToWatchlist,
    removeFromWatchlist,
} from "@/store/crypto/cryptoSlice";
import { useAppDispatch } from "@/store/hooks";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingIndicator } from "./LoadingIndicator";

interface MainContentProps {
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
  isLeftDisabled: boolean;
  isRightDisabled: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  onRetry: () => void;
  selectedAsset: Asset | undefined;
  watchlist: string[];
}

export const MainContent = ({
  onToggleLeftSidebar,
  onToggleRightSidebar,
  isLeftDisabled,
  isRightDisabled,
  status,
  error,
  onRetry,
  selectedAsset,
  watchlist,
}: MainContentProps) => {
  const dispatch = useAppDispatch();

  const formatPrice = (price: string) => {
    return `$${parseFloat(price).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatChange = (change: string) => {
    const changeNum = parseFloat(change);
    const prefix = changeNum >= 0 ? "+" : "";
    const color = changeNum >= 0 ? "text-green-500" : "text-red-500";
    return {
      text: `${prefix}${changeNum.toFixed(2)}%`,
      color: color,
    };
  };

  const renderCentralContent = () => {
    if (status === "loading" || status === "idle") {
      return <LoadingIndicator />;
    }

    if (status === "failed" && error) {
      return <ErrorMessage message={error} onRetry={onRetry} />;
    }

    if (status === "succeeded" && selectedAsset) {
      const changeInfo = formatChange(selectedAsset.changePercent24Hr);

      const isInWatchlist = watchlist.includes(selectedAsset.id);

      const handleWatchlistToggle = () => {
        if (isInWatchlist) {
          dispatch(removeFromWatchlist(selectedAsset.id));
        } else {
          dispatch(addToWatchlist(selectedAsset.id));
        }
      };
      return (
        <View className="items-center p-4">
          <Text className="text-white text-3xl font-bold text-center">
            {selectedAsset.name} ({selectedAsset.symbol})
          </Text>
          <Text className="text-light-100 text-4xl font-light my-4">
            {formatPrice(selectedAsset.priceUsd)}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-light-300 text-lg mr-2">24h Change:</Text>
            <Text className={`text-xl font-bold ${changeInfo.color}`}>
              {changeInfo.text}
            </Text>
          </View>
          <Text className="text-light-300 text-base mt-4 text-center">
            Market Cap: {formatPrice(selectedAsset.marketCapUsd)}
          </Text>
          <TouchableOpacity
            onPress={handleWatchlistToggle}
            className={`mt-6 py-3 px-6 rounded-lg ${
              isInWatchlist ? "bg-red-600" : "bg-accent"
            }`}
          >
            <Text className="text-white font-bold text-base">
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (status === "succeeded" && !selectedAsset) {
      return (
        <>
          <Text className="text-light-300 text-lg">Select an Asset</Text>
          <Text className="text-light-200 text-center mt-2">
            Choose a cryptocurrency from the 'Assets' sidebar to view its
            details here.
          </Text>
        </>
      );
    }

    return null;
  };

  return (
    <View className="flex-1 p-4">
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={onToggleLeftSidebar}
          disabled={isLeftDisabled}
        >
          <Text
            className={`text-lg ${
              isLeftDisabled ? "text-gray-500" : "text-light-200"
            }`}
          >
            Assets
          </Text>
        </TouchableOpacity>
        <Text className="text-accent text-xl font-bold">Dashboard</Text>
        <TouchableOpacity
          onPress={onToggleRightSidebar}
          disabled={isRightDisabled}
        >
          <Text
            className={`text-lg ${
              isRightDisabled ? "text-gray-500" : "text-light-200"
            }`}
          >
            Watchlist
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center bg-dark-200 rounded-lg p-4">
        {renderCentralContent()}
      </View>
    </View>
  );
};
