import { useOrderBook } from "../../../hooks/useOrderBook";

interface TickerRowItemProps {
  pair: string;
  productId: string;
}

export default function TickerRowItem({ pair, productId }: TickerRowItemProps) {
  const { tickerData } = useOrderBook(productId);

  return (
    <tr key={pair}>
      <td className="px-6 py-4 whitespace-nowrap">{pair}</td>
      <td className="px-6 py-4 whitespace-nowrap">{tickerData.markPrice}</td>
      <td className="px-6 py-4 whitespace-nowrap">{tickerData.volume}</td>
      <td className="px-6 py-4 whitespace-nowrap">{tickerData.high}</td>
      <td className="px-6 py-4 whitespace-nowrap">{tickerData.low}</td>
      <td className="px-6 py-4 whitespace-nowrap">{tickerData.change}</td>
    </tr>
  );
}
