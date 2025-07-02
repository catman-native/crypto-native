// src/hooks/useWebSocket.ts
import { updateAssetPrices } from '@/store/crypto/cryptoSlice';
import { useAppDispatch } from '@/store/hooks';
import { useEffect, useRef } from 'react';

export const useWebSocket = (url: string) => {
  const dispatch = useAppDispatch();
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!url) return;

    console.log('Attempting to connect to WebSocket...');
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connected successfully.');
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected.');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // This is where the magic happens
    ws.current.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        dispatch(updateAssetPrices(messageData));
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    };

  
    return () => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        console.log('Closing WebSocket connection...');
        ws.current.close();
      }
    };
  }, [url, dispatch]);
};