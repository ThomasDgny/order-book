import { TimeFrameKey } from "../../../types/types";
import ChartComponent from "../chart/Chart";
import OrderForm from "../orderForm/OrderForm";

export default function ChartSection({
    selectedPair,
    switchTimeFrame,
  }: {
    selectedPair: string;
    switchTimeFrame: TimeFrameKey;
  }) {
    return (
      <div className="flex-1 w-full">
        <div className="flex flex-col gap-4 h-full">
          <div className="h-full w-full">
            <ChartComponent coin={selectedPair} time={switchTimeFrame} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Form</h2>
            <OrderForm />
          </div>
        </div>
      </div>
    );
  }
  