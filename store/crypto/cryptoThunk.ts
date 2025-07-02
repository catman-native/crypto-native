import { fetchAssets } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

const WATCHLIST_STORAGE_KEY = 'crypto_watchlist';

/**
 * An async thunk for fetching the list of top 50 crypto assets.
 * It will automatically dispatch 'pending', 'fulfilled', or 'rejected' actions.
 */
export const getAssets = createAsyncThunk(
  'crypto/getAssets', 
  async (_, { rejectWithValue }) => {
    try {
      const assets = await fetchAssets(50);
      return assets;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch assets');
    }
  }
);


export const loadWatchlist = createAsyncThunk(
  'crypto/loadWatchlist',
  async (_, { rejectWithValue }) => {
    try {
      const savedWatchlistJSON = await AsyncStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (savedWatchlistJSON !== null) {
        return JSON.parse(savedWatchlistJSON) as string[];
      }
      return []; 
    } catch (error: any) {
      return rejectWithValue('Failed to load watchlist');
    }
  }
);