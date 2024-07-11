import OrderBook from "../components/home/orderBook/OrderBook";
import OrderForm from "../components/home/orderForm/OrderComponent";
import OrderHistory from "../components/home/orderHistory/OrderHistory";
import { ProductIds } from "../constants/constants";
import { useOrderBook } from "../hooks/useOrderBook";

export default function Home() {
  const { currentIndex } = useOrderBook(ProductIds.XBTUSD);
  return (
    <div>
      <div>{currentIndex}</div>
      <div className="container flex w-full gap-10">
        <div>
          <OrderBook />
        </div>
        <div>
          {/* Charts from TRADING VIEW */}
          <OrderForm />
        </div>
        <div>
          <OrderHistory />
        </div>
      </div>
    </div>
  );
}
