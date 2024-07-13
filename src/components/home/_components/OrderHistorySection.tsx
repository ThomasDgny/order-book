import OrderHistory from '../orderHistory/OrderHistory';

export default function OrderHistorySection({
    orderHistory,
    cancelOrder,
  }: {
    orderHistory: any;
    cancelOrder: any;
  }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Order History</h2>
        <OrderHistory orderHistory={orderHistory} cancelOrder={cancelOrder} />
      </div>
    );
  }
