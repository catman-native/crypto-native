import { Footer } from '@/components/Footer';
import { LeftSidebar } from '@/components/LeftSidebar';
import { MainContent } from '@/components/Maincontent';
import { RightSidebar } from '@/components/RightSidebar';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Asset, COINCAP_CONFIG } from '@/services/api';
import { setSelectedAssetId } from '@/store/crypto/cryptoSlice';
import { getAssets, loadWatchlist } from '@/store/crypto/cryptoThunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect, useMemo, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(false);
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { assets, status, error, watchlist, selectedAssetId } = useAppSelector(
    (state) => state.crypto
  );


  const websocketUrl = useMemo(() => {
    return `${COINCAP_CONFIG.WS_BASE_URL}/prices?assets=ALL&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`;
  }, []); 

  useWebSocket(websocketUrl);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAssets());
      dispatch(loadWatchlist());
    }
  }, [status, dispatch]);

  const handleAssetSelect = (asset: Asset) => {
    dispatch(setSelectedAssetId(asset.id));
    setIsLeftSidebarVisible(false);
  };

  const handleRetry = () => {
    dispatch(getAssets());
  };

  const handleToggleLeftSidebar = () => {
    if (!isRightSidebarVisible) setIsLeftSidebarVisible(!isLeftSidebarVisible);
  };
  
  const handleToggleRightSidebar = () => {
    if (!isLeftSidebarVisible) setIsRightSidebarVisible(!isLeftSidebarVisible);
  };

  const selectedAsset = assets.find(asset => asset.id === selectedAssetId);
  const areTogglesDisabled = status === 'loading' || status === 'failed';

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />
      <View className="flex-1">
        <MainContent 
          onToggleLeftSidebar={handleToggleLeftSidebar}
          onToggleRightSidebar={handleToggleRightSidebar}
          isLeftDisabled={areTogglesDisabled || isRightSidebarVisible}
          isRightDisabled={areTogglesDisabled || isLeftSidebarVisible}
          status={status}
          error={error}
          onRetry={handleRetry}
          selectedAsset={selectedAsset}
          watchlist={watchlist}
        />
        {isLeftSidebarVisible && (
          <LeftSidebar 
            onClose={handleToggleLeftSidebar} 
            assets={assets}
            onAssetPress={handleAssetSelect}
          />
        )}
        {isRightSidebarVisible && (
          <RightSidebar
            onClose={handleToggleRightSidebar}
            assets={assets}
            watchlist={watchlist}
          />
        )}
      </View>
      <Footer />
    </SafeAreaView>
  );
}