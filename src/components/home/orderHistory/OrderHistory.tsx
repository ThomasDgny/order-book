import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import { Order } from '../../../types/types';

const OrderHistory: React.FC = () => {
  const { orderHistory, cancelOrder } = useAppContext();

  const formatDateTime = (dateTime: Date) => {
    return dateTime.toLocaleString(); 
  };

  return (
    <div>
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Type</th>
            <th>Pair</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Creation Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((order: Order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.orderType}</td>
              <td>{order.pair}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.total}</td>
              <td>{formatDateTime(order.creationDate)}</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'Pending' && (<button onClick={() => cancelOrder(order.orderId)}>Cancel</button>)}
                {order.status === 'Filled' && (<span>Order Completed</span>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
