import { useParams } from "react-router-dom";
import OrderBook from "../components/home/orderBook/OrderBook";
import OrderHistory from "../components/home/orderHistory/OrderHistory";
import OrderForm from "../components/home/orderForm/OrderForm";

export default function Details() {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div className="container flex flex-col gap-10">
      <h1 className="text-2xl font-bold mb-4">Details for {productId}</h1>
      <div className="flex gap-10">
        <div>
          <OrderBook />
        </div>
        <div>
          <div>CHART</div>
          <OrderForm />
        </div>
      </div>
      <OrderHistory />
    </div>
  );
}
