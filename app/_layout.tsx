import { store } from '@/store/store';
import { Slot } from "expo-router";
import { Provider } from 'react-redux';

import "./globals.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
