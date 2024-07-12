import { useAppContext } from "../context/AppContext";
import OrderBook from "../components/home/orderBook/OrderBook";
import OrderForm from "../components/home/orderForm/OrderForm";
import OrderHistory from "../components/home/orderHistory/OrderHistory";
import { ProductIds } from "../constants/constants";

type ProductIdKey = keyof typeof ProductIds;

export default function Home() {
  const {
    orderHistory,
    cancelOrder,
    currentAsks,
    currentBids,
    loading,
    setPair,
    selectedPair,
    tickerData,
  } = useAppContext();

  const handlePairChange = (newPair: ProductIdKey) => {
    setPair(ProductIds[newPair]);
  };

  return (
    <div className="container flex flex-col gap-10">
      <div className="flex gap-4 mt-4">
        {Object.keys(ProductIds).map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-md ${
              selectedPair === ProductIds[key as ProductIdKey] ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePairChange(key as ProductIdKey)}
          >
            {key}
          </button>
        ))}
      </div>
      {selectedPair ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Details for {selectedPair}</h1>
          <p>{tickerData?.markPrice}</p>
          <div className="flex gap-10">
            <div>
              <OrderBook
                currentBids={currentBids}
                currentAsks={currentAsks}
                loading={loading}
              />
            </div>
            <div>
              <div>CHART</div>
              <OrderForm />
            </div>
          </div>

          <OrderHistory orderHistory={orderHistory} cancelOrder={cancelOrder} />
        </>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
}
