import { Asset } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAssets, loadWatchlist } from './cryptoThunk';

const WATCHLIST_STORAGE_KEY = 'crypto_watchlist';
type PriceUpdatePayload = Record<string, string>;

interface CryptoState {
    assets: Asset[];
    selectedAssetId: string | null;
    watchlist: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


const initialState: CryptoState = {
    assets: [],
    selectedAssetId: null,
    watchlist: ['bitcoin', 'ethereum', 'solana'],
    status: 'idle',
    error: null,
};



const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        setSelectedAssetId: (state, action: PayloadAction<string | null>) => {
            state.selectedAssetId = action.payload;
        },
        addToWatchlist: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (!state.watchlist.includes(id)) {
                state.watchlist.push(id);
                AsyncStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(state.watchlist));
            }
        },
        removeFromWatchlist: (state, action: PayloadAction<string>) => {
            state.watchlist = state.watchlist.filter(id => id !== action.payload);
            AsyncStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(state.watchlist));
        },
        updateAssetPrices: (state, action: PayloadAction<PriceUpdatePayload>) => {
            const priceUpdates = action.payload;
            state.assets = state.assets.map(asset => {
                if (priceUpdates[asset.id]) {
                    return { ...asset, priceUsd: priceUpdates[asset.id] };
                }
                return asset;
            });
        },
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(getAssets.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAssets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.assets = action.payload;
            })
            .addCase(getAssets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
        builder.addCase(loadWatchlist.fulfilled, (state, action) => {
            state.watchlist = action.payload;
        });
    },
});

export const { setSelectedAssetId, addToWatchlist, removeFromWatchlist, updateAssetPrices } = cryptoSlice.actions;

export default cryptoSlice.reducer;