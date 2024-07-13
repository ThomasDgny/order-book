# Crypto Trading Platform

## Overview

This project is a web-based crypto trading platform that allows users to place market and limit orders for various cryptocurrency pairs. The platform provides real-time order book data, ticker information, and allows users to manage their balance and order history.

## Features

- **Real-Time Order Book Data**: Fetches and displays the current bids and asks for the selected cryptocurrency pair.
- **Ticker Information**: Shows the current market price and other relevant details for the selected pair.
- **Market and Limit Orders**: Users can place both market and limit buy/sell orders.
- **Order Management**: Users can view their order history, including pending, filled, and canceled orders.
- **Balance Management**: Users can manage their balance, which gets updated based on their trading activity.
- **Context API**: Uses React Context API for state management across the application.
- **Modular Code Structure**: Clean and modular code with reusable components and helper functions.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type-safe JavaScript.
- **Context API**: For managing global state.
- **Custom Hooks**: For fetching order book and ticker data.

## Project Structure
```
src
├── components
│   ├── home
│   │   └── _components
│   │       ├── ChartSection.tsx
│   │       ├── InfoCard.tsx
│   │       ├── OrderHistorySection.tsx
│   │       ├── ProductSelector.tsx
│   │       ├── TickerInfo.tsx
│   │       ├── TimeFrameSelector.tsx
│   │       └── WalletSection.tsx
│   ├── chart
│   │   └── Chart.tsx
│   ├── orderBook
│   │   ├── OrderBook.tsx
│   │   └── OrderBookList.tsx
│   ├── orderForm
│   │   ├── _components
│   │   │   ├── limitOrder
│   │   │   │   ├── LimitOrder.tsx
│   │   │   │   └── LimitOrderForm.tsx
│   │   │   └── marketOrder
│   │   │       ├── MarketOrder.tsx
│   │   │       └── MarketOrderForm.tsx
│   │   └── OrderForm.tsx
│   ├── orderHistory
│   │   └── OrderHistory.tsx
├── constants
│   └── constants.ts
├── context
│   └── AppContext.tsx
├── helper
│   └── orderHelper.ts
├── hooks
│   ├── useOrderBook.tsx
│   └── useTicker.tsx
├── lib
│   └── utils.ts
├── mock
│   ├── candlesMock.ts
│   └── MockPrice.ts
├── pages
│   └── Home.tsx
└── types
    └── types.ts
```
## Usage

1. **Select a Cryptocurrency Pair**: Use the pair selector to choose the cryptocurrency pair you want to trade.
2. **Place Orders**: Use the order form to place market or limit orders.
3. **Manage Orders**: View and manage your order history, including canceling pending orders.
4. **Monitor Balance**: Keep track of your available balance and update based on trading activity.

## Context API

The project uses React Context API for state management. The context is defined in `AppContext.tsx` and provides the following functionalities:

- `createOrder`: Function to create a new order.
- `cancelOrder`: Function to cancel an existing order.
- `setPair`: Function to set the selected trading pair.
- `setBalance`: Function to update the user's balance.

## Helper Functions

Helper functions are defined in `orderHelpers.ts` to keep the context provider clean and modular. These include:

- `createOrder`: Handles the logic for creating a new order.
- `completeOrder`: Handles the logic for marking an order as completed.
- `cancelOrder`: Handles the logic for canceling an order.
- `checkOrderMatches`: Checks if any pending orders match the current market conditions and completes them if they do.
- `calculateRunningTotal(entries: OrderBookEntry[]): OrderBookEntry[]`: Calculates the running total for each entry in the order book.
- `manageArraySize(prevArray: OrderBookEntry[], newArray: OrderBookEntry[], maxSize: number = 15): OrderBookEntry[]`: Manages the size of an array by combining and sorting new and previous entries, then truncating it to a specified maximum size.

## Custom Hooks

Custom hooks are used to fetch real-time data:

- `useOrderBook`: Fetches the current order book data (bids and asks) for the selected pair.
- `useTicker`: Fetches the current market ticker data for the selected pair.
