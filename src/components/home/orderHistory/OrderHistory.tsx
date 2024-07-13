import React from "react";
import { Order } from "../../../types/types";
import { format } from "date-fns";

interface OrderHistoryProps {
  orderHistory: Order[];
  cancelOrder: (orderId: string) => void;
}

export default function OrderHistory({
  orderHistory,
  cancelOrder,
}: OrderHistoryProps) {
  const formatDateTime = (dateTime: Date) => {
    return format(dateTime, "yyyy-MM-dd HH:mm:ss");
  };

  const getStatusBackgroundColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Filled":
        return "bg-green-100 text-green-800";
      case "Canceled":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const tableHeaders = [
    { key: "orderId", label: "Order ID" },
    { key: "orderType", label: "Order Type" },
    { key: "pair", label: "Pair" },
    { key: "price", label: "Price" },
    { key: "quantity", label: "Quantity" },
    { key: "total", label: "Total" },
    { key: "creationDate", label: "Creation Date" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((item, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orderHistory.map((order) => (
              <tr key={order.orderId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.orderType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.pair}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDateTime(order.creationDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBackgroundColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.status === "Pending" && (
                    <button
                      onClick={() => cancelOrder(order.orderId)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Cancel
                    </button>
                  )}
                  {order.status === "Filled" && (
                    <span className="text-gray-400">Order Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
