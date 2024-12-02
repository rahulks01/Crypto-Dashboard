# Cryptocurrency Dashboard
A responsive and feature-rich cryptocurrency dashboard built using React and the CoinGecko API. This application provides real-time cryptocurrency data, dynamic visualizations, and user-friendly interactions for monitoring and analyzing cryptocurrency trends.

## Features
### 1. Homepage
- Displays a list of cryptocurrencies fetched from the CoinGecko API's /coins/markets endpoint.
- Key details for each cryptocurrency:
  <ul>
    <li>Name</li>
    <li>Symbol</li>
    <li>Current price</li>
    <li>24-hour percentage change (green for positive, red for negative).</li>
  </ul>
- Includes:
  <ul>
    <li>Search functionality for filtering cryptocurrencies by name.</li>
    <li>Sorting options (e.g., by price, market cap, or percentage change).</li>
    <li>Pagination for efficient navigation through large datasets.</li>
  </ul>

### 2. Favorites Functionality
- Users can favorite cryptocurrencies by clicking the heart icon on each card.
- Favorites are saved in localStorage, ensuring persistence across sessions.
- A dedicated Favorites Page lists all the user's favorite cryptocurrencies.

### 3. Cryptocurrency Details Page
- Clicking on a cryptocurrency card navigates to a dynamic details page.
- Detailed information includes:
  <ul>
    <li>Name</li>
    <li>Symbol</li>
    <li>Market cap</li>
    <li>Historical price data (7-day and 30-day trends).</li>
    <li>Historical price data visualized using a line chart powered by Chart.js.</li>
  </ul>
  
### 4. Exchange List
- Lists cryptocurrency exchanges fetched from the /exchanges endpoint.
- Each exchange card shows:
  <ul>
    <li>Exchange name</li>
    <li>Trading volume</li>
    <li>Number of cryptocurrencies traded</li>
    <li>Number of cryptocurrencies traded</li>
  </ul>
- Features search and filtering for easy navigation.
  
### 5. Currency Converter
- Users can select a currency (e.g., USD, EUR, GBP) to view cryptocurrency prices in their preferred format.
  
### 6. Light/Dark Mode
- A toggle switch enables users to switch between light and dark modes.
- Preferences are saved in localStorage for a personalized experience.
  
### 7. State Management
- Global state management using Recoil:
  <ul>
    <li>Handles cryptocurrency data and user favorites efficiently.</li>
  </ul>
  
### 8. Deployment
- The application is deployed on Vercel for live access.

## Installation
- Prerequisites
  > Node.js (v14 or higher)
  
  > npm (v6 or higher)

- Steps
1. Clone the repository:
  ```bash
  git clone https://github.com/rahulks01/Crypto-Dashboard.git
  ```  
  ```
  cd cryptocurrency-dashboard  
  ```
2. Install dependencies:
  ```bash
  npm install 
  ``` 
3. Start the development server:
  ```bash
  npm start 
  ```
4. Open your browser and navigate to:
  ```
  http://localhost:3000  
  ```

## API Endpoints
This project uses the [CoinGecko API](https://www.coingecko.com/en/api/documentation). No API key is required.
  > /coins/markets
  - Fetches the list of cryptocurrencies with their market data.
    
  > /coins/{id}/market_chart
  - Fetches historical price data for a specific cryptocurrency.
    
  > /exchanges
  - Fetches a list of cryptocurrency exchanges and related data.

## Technologies Used
- Frontend: React, Recoil, Chart.js
- Styling: Tailwind CSS, ShadCN
- Data Fetching: CoinGecko API
- Deployment: Vercel
