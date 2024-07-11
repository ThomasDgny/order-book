interface Order {
  price: number;
  quantity: number;
}

interface OrderBook {
  asks: Order[];
  bids: Order[];
}

function calculateMidpointPrice(orderBook: OrderBook): number {
  const bestAsk = orderBook.asks[0]?.price || 0;
  const bestBid = orderBook.bids[0]?.price || 0;
  return (bestAsk + bestBid) / 2;
}

export default function calculateCurrencyIndex(
  orderBooks: OrderBook[]
): number {
  let totalMidpoint = 0;
  let count = 0;

  for (const orderBook of orderBooks) {
    const midpointPrice = calculateMidpointPrice(orderBook);
    if (midpointPrice > 0) {
      totalMidpoint += midpointPrice;
      count++;
    }
  }

  return count > 0 ? totalMidpoint / count : 0;
}
