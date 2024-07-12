import { Link } from "react-router-dom";
import { useOrderBook } from "../../../hooks/useOrderBook";

interface TickerRowItemProps {
  pair: string;
  productId: string;
}

export default function TickerRowItem({ pair, productId }: TickerRowItemProps) {
  const { tickerData } = useOrderBook(productId);

  return (
    <tr key={pair}>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link
          to={`/details/${productId}`}
          className="text-blue-500 hover:underline"
        >
          {pair}
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{tickerData.markPrice}</td>
      <td className="px-6 py-4 whitespace-nowrap">{tickerData.volume}</td>
      <td className="px-6 py-4 whitespace-nowrap">{tickerData.high}</td>
      <td className="px-6 py-4 whitespace-nowrap">{tickerData.low}</td>
      <td className="px-6 py-4 whitespace-nowrap">{tickerData.change}</td>
    </tr>
  );
}
