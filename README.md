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

The project utilizes React's Context API for state management. The context is defined in `AppContext.tsx` and provides the following functionalities:

- **useAppContext**: Custom hook to access the application context within components. Ensures that components can access and update shared state.
  
- **AppContextProvider**: Component that wraps the entire application with the context provider. It manages the application's state and provides it to all components that need access.

### State Management

- **Selected Pair**: Tracks the currently selected cryptocurrency pair for trading.
  
- **Balance**: Maintains the user's current balance, initialized to 1,000,000.
  
- **Order History**: Stores a list of all orders placed by the user.

### Hooks and Helpers

- **useOrderBook**: Custom hook used to fetch real-time order book data (bids and asks) for the selected pair.
  
- **useTicker**: Custom hook to fetch real-time market ticker data for the selected pair.

### Functions

- **setPair**: Function to update the selected cryptocurrency pair.
  
- **createOrder**: Function to create a new order. Utilizes a helper function (`createOrderHelper`) for handling the order creation logic.
  
- **completeOrder**: Function to mark an order as completed. Utilizes a helper function (`completeOrderHelper`) for updating the order status.
  
- **cancelOrder**: Function to cancel an order. Utilizes a helper function (`cancelOrderHelper`) for handling the cancellation logic.
  
- **checkOrderMatches**: Function to check if any pending orders match the current market conditions and completes them if they do. Utilizes a helper function (`checkOrderMatchesHelper`) for this purpose.

### Dependencies

- **Coins**: Defines cryptocurrency pairs available for trading.
  
- **Constants**: Includes constants such as `INITIAL_BALANCE` and `ORDERBOOK_LEVELS` for maintaining application-wide configurations.

This setup ensures efficient state management and modular functionality throughout the application.


## Helper Functions

Helper functions are defined in `orderHelpers.ts` to keep the context provider clean and modular. These include:

- `createOrder`: Handles the logic for creating a new order.
- `completeOrder`: Handles the logic for marking an order as completed.
- `cancelOrder`: Handles the logic for canceling an order.
- `checkOrderMatches`: Checks if any pending orders match the current market conditions and completes them if they do.
- `calculateRunningTotal`: Calculates the running total for each entry in the order book.
- `manageArraySize(prevArray`: Manages the size of an array by combining and sorting new and previous entries, then truncating it to a specified maximum size.

## Custom Hooks

Custom hooks are used to fetch real-time data:

- `useOrderBook`: Fetches the current order book data (bids and asks) for the selected pair.
- `useTicker`: Fetches the current market ticker data for the selected pair.

## Constants

In the project, several constants are defined to maintain consistency and ease of use. These constants are located in the `constants.ts` file and include:

- `ORDERBOOK_LEVELS`: Defines the number of levels shown in the order book, set to 15.
- `INITIAL_BALANCE`: Specifies the initial balance amount, set to 1000000.
- `BINANCE_WS_URL`: WebSocket URL for connecting to the Binance stream, set to "wss://stream.binance.com:9443/ws".
- `Coins`: Object containing various cryptocurrency pairs

## Conclusion

Thank you for exploring this project! If you have any feedback, questions, or suggestions, please feel free to reach out. Your insights are valuable and will help in further improving this application.

### Links

- **Live Demo**: [View Live Demo](https://order-book-two.vercel.app/)
- **GitHub Repository**: [Visit GitHub](https://github.com/ThomasDgny/order-book)

### Contact

For any inquiries or discussions regarding this project or potential opportunities, you can reach me via:

- LinkedIn: [Connect on LinkedIn](https://www.linkedin.com/in/thomas-doganay/)

Your interest and time are greatly appreciated!
