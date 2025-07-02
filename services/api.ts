export const COINCAP_CONFIG = {
  // The new v3 base URL for REST API calls
  BASE_URL: "https://rest.coincap.io/v3/",
  
  // The new v3 base URL for WebSocket connections (for later use)
  WS_BASE_URL: "wss://ws.coincap.io/v3",

  // API v3 requires an authorization header with a bearer token.
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
  },
};


export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

interface AssetsApiResponse {
  data: Asset[];
  timestamp: number;
}

export interface AssetHistory {
  priceUsd: string;
  time: number;
}

interface AssetHistoryApiResponse {
  data: AssetHistory[];
  timestamp: number;
}


export const fetchAssets = async (limit: number = 50): Promise<Asset[]> => {
  const endpoint = `${COINCAP_CONFIG.BASE_URL}/assets?limit=${limit}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: COINCAP_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch assets: ${response.status} ${response.statusText}`);
    }

    const data: AssetsApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
};

export const fetchAssetHistory = async (
  assetId: string,
  interval: 'd1' | 'h12' | 'h6' | 'h2' | 'h1' = 'd1'
): Promise<AssetHistory[]> => {
  const endpoint = `${COINCAP_CONFIG.BASE_URL}/assets/${assetId}/history?interval=${interval}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: COINCAP_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch asset history: ${response.status} ${response.statusText}`);
    }

    const data: AssetHistoryApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching history for ${assetId}:`, error);
    throw error;
  }
};