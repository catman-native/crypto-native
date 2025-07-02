Generated markdown
# Crypto Dashboard - React Native Developer Test

This is a React Native application built to satisfy the requirements of a developer test. The app serves as a real-time cryptocurrency dashboard, fetching market data from the CoinCap API, allowing users to manage a watchlist, and displaying live price updates via WebSockets.

## Table of Contents

1.  [Core Features](#core-features)
2.  [Tech Stack & Architecture](#tech-stack--architecture)
3.  [Setup and Run Instructions](#setup-and-run-instructions)
4.  [Project Structure](#project-structure)
5.  [Architectural Decisions & Trade-offs](#architectural-decisions--trade-offs)

## Core Features

*   **Real-time Data:** Fetches the top 50 cryptocurrencies from the CoinCap API v3.
*   **Live Price Updates:** Utilizes a WebSocket connection to stream live price changes directly to the UI without needing to refresh.
*   **Collapsible Sidebars:** A responsive layout featuring a left sidebar for the main asset list and a right sidebar for the user's personal watchlist.
*   **Asset Detail View:** Users can select an asset from the list to view its detailed information, such as current price, 24-hour percentage change, and market cap, in the main content area.
*   **Persistent Watchlist:** Users can add or remove assets from their watchlist. This list is saved to the device's local storage and persists between app sessions.
*   **Robust State Management:** Centralized state management is handled by Redux Toolkit, ensuring a predictable and scalable data flow.
*   **Graceful Loading & Error Handling:** The UI provides clear feedback to the user when data is loading or if an API call fails, with an option to retry.

## Tech Stack & Architecture

*   **Framework:** React Native (with Expo)
*   **Language:** TypeScript
*   **State Management:** Redux Toolkit
*   **Styling:** NativeWind (Tailwind CSS for React Native)
*   **Data Fetching:** Native `fetch` API for REST calls, native `WebSocket` API for real-time updates.
*   **Persistence:** `@react-native-async-storage/async-storage`
*   **Linting/Formatting:** ESLint & Prettier

## Setup and Run Instructions

### Prerequisites

*   Node.js (LTS version recommended)
*   Yarn or npm
*   Expo Go app on your iOS or Android device, or a configured Android/iOS simulator.
*   A CoinCap API Key (free from [coincap.io/api-key](https://coincap.io/api-key))

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd crypto-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env` in the root of the project and add your CoinCap API key:
    ```
    EXPO_PUBLIC_API_KEY=your-coincap-api-key-goes-here
    ```

### Running the Application

1.  **Start the Metro bundler:**
    ```bash
    npm start
    ```

2.  **Run on a device or simulator:**
    *   Scan the QR code with the Expo Go app on your physical device.
    *   Alternatively, press `i` in the terminal to run on an iOS Simulator or `a` to run on an Android Emulator.

## Project Structure

The project follows a feature-based or "ducks" pattern for clarity and scalability.

## Architectural Decisions & Trade-offs

*   **State Management (Redux Toolkit):** While a simpler solution like `useState` or Zustand was considered for managing sidebar visibility, Redux Toolkit was chosen to handle the more complex application data state (asset list, loading/error status, selected asset, watchlist). A hybrid approach was used where local UI state (`useState`) manages sidebar visibility, while Redux manages all asynchronous data.

*   **Async Logic (Redux Thunks):** Thunks were separated from the slice/reducer logic (`cryptoThunks.ts` and `cryptoSlice.ts`). This improves readability and maintains a clear separation between asynchronous side effects and pure state update logic.

*   **WebSockets (Custom Hook):** A custom `useWebSocket` hook was implemented to encapsulate all WebSocket connection logic. This is a clean, reusable, and modern React pattern that isolates the side effect from the component's rendering logic. An alternative, a Redux middleware, was considered but deemed overly complex for this application's scope.

*   **Watchlist Persistence (Manual AsyncStorage):** The watchlist is persisted using direct calls to `AsyncStorage` within the Redux reducers. While a library like `redux-persist` offers a more automated "enterprise" solution, the manual approach was chosen to demonstrate a direct understanding of React Native's persistence mechanisms and to avoid adding another major dependency within the time constraints.

*   **Styling (NativeWind):** NativeWind was chosen for its utility-first approach, which allows for rapid development and easy maintenance of a consistent design system, leveraging the power of Tailwind CSS in a React Native environment.